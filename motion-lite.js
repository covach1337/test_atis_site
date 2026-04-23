/* motion-lite: a drop-in subset of framer-motion's motion/useScroll/useTransform
   using native WAAPI + IntersectionObserver + rAF scroll. Same JSX API,
   same `initial`/`animate`/`whileInView`/`variants`/`style` semantics
   used in this project. Not a full clone — only what the landing uses. */
(function () {
  const React = window.React;

  // ---- MotionValue (scroll-driven) ----
  class MotionValue {
    constructor(v) { this.v = v; this.listeners = new Set(); }
    get() { return this.v; }
    set(v) { if (v === this.v) return; this.v = v; this.listeners.forEach(f => f(v)); }
    on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  }
  const isMV = (x) => x instanceof MotionValue;

  function useMotionValue(initial) {
    const ref = React.useRef();
    if (!ref.current) ref.current = new MotionValue(initial);
    return ref.current;
  }

  // ---- Scroll tracking ----
  let scrollSubs = new Set();
  window.addEventListener('scroll', () => scrollSubs.forEach(f => f()), { passive: true });
  window.addEventListener('resize', () => scrollSubs.forEach(f => f()), { passive: true });

  function useScroll({ target, offset } = {}) {
    const scrollYProgress = useMotionValue(0);
    React.useEffect(() => {
      const el = target && target.current;
      const compute = () => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          // offset ["start start", "end end"] or ["start start","end start"]
          // default: element fully in view → 0..1 across its entire scroll
          const startOffset = rect.top;                 // how far top of el from top of viewport
          const total = rect.height;                    // scrollable range
          let p;
          if (offset && offset[1] === "end end") {
            // progress 0 when top hits top, 1 when bottom hits bottom
            p = (-rect.top) / (rect.height - vh);
          } else if (offset && offset[1] === "end start") {
            // progress 0 when top hits top, 1 when top has scrolled off (classic sticky stage)
            p = (-rect.top) / rect.height;
          } else {
            p = (-rect.top) / rect.height;
          }
          p = Math.max(0, Math.min(1, p));
          scrollYProgress.set(p);
        } else {
          const doc = document.documentElement;
          const p = doc.scrollTop / Math.max(1, doc.scrollHeight - window.innerHeight);
          scrollYProgress.set(p);
        }
      };
      compute();
      scrollSubs.add(compute);
      return () => scrollSubs.delete(compute);
    }, []);
    return { scrollYProgress };
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function parseNum(v) {
    if (typeof v === 'number') return { n: v, unit: '' };
    const m = String(v).match(/^(-?[\d.]+)(.*)$/);
    return m ? { n: parseFloat(m[1]), unit: m[2] } : { n: 0, unit: '' };
  }

  function interp(value, inRange, outRange) {
    // clamp & piecewise linear
    if (value <= inRange[0]) value = inRange[0];
    if (value >= inRange[inRange.length - 1]) value = inRange[inRange.length - 1];
    let i = 0;
    while (i < inRange.length - 1 && value > inRange[i + 1]) i++;
    const t = (value - inRange[i]) / (inRange[i + 1] - inRange[i] || 1);
    const a = outRange[i], b = outRange[i + 1];
    if (typeof a === 'number') return lerp(a, b, t);
    // string values with single number
    const pa = parseNum(a), pb = parseNum(b);
    return lerp(pa.n, pb.n, t) + pa.unit;
  }

  function useTransform(mv, inRange, outRange) {
    const out = useMotionValue(interp(mv.get(), inRange, outRange));
    React.useEffect(() => mv.on(v => out.set(interp(v, inRange, outRange))), []);
    return out;
  }

  // ---- motion component factory ----
  function resolveVariant(v, variants, custom) {
    if (typeof v === 'string') v = variants && variants[v];
    if (typeof v === 'function') v = v(custom);
    return v || {};
  }

  function splitStyle(target) {
    // separate transform-ish keys from regular styles
    const transforms = [];
    const plain = {};
    const order = ['x','y','z','translateX','translateY','translateZ','rotate','rotateX','rotateY','rotateZ','scale','scaleX','scaleY','skew'];
    order.forEach(k => {
      if (target[k] !== undefined) {
        const v = target[k];
        const unit = (k.startsWith('rotate') || k === 'skew') ? 'deg'
                  : (k === 'scale' || k.startsWith('scale')) ? ''
                  : 'px';
        let name = k;
        if (k === 'x') name = 'translateX';
        if (k === 'y') name = 'translateY';
        if (k === 'z') name = 'translateZ';
        transforms.push(`${name}(${v}${typeof v === 'number' ? unit : ''})`);
      }
    });
    Object.keys(target).forEach(k => {
      if (!order.includes(k) && k !== 'transition') plain[k] = target[k];
    });
    return { transforms, plain };
  }

  function styleObjectToCSS(target) {
    const { transforms, plain } = splitStyle(target);
    const out = { ...plain };
    if (transforms.length) out.transform = transforms.join(' ');
    return out;
  }

  function createMotion(tag) {
    return React.forwardRef(function M(props, fwdRef) {
      const {
        initial, animate, whileInView, whileHover,
        variants, custom, transition, viewport,
        style, children, ...rest
      } = props;
      const ref = React.useRef(null);
      React.useImperativeHandle(fwdRef, () => ref.current);

      // Resolve initial target
      const initTarget = resolveVariant(initial, variants, custom);
      const animTarget = animate !== undefined ? resolveVariant(animate, variants, custom) : null;
      const wivTarget = whileInView !== undefined ? resolveVariant(whileInView, variants, custom) : null;
      const hovTarget = whileHover !== undefined ? resolveVariant(whileHover, variants, custom) : null;

      // Initial inline style (for SSR paint before effect runs)
      const initStyle = styleObjectToCSS(initTarget);

      // Handle reactive style (MotionValues)
      const [, force] = React.useReducer(x => x + 1, 0);
      const mvStyle = {};
      const liveStyle = style || {};
      const mvKeys = [];
      for (const k in liveStyle) {
        if (isMV(liveStyle[k])) mvKeys.push(k);
      }
      React.useEffect(() => {
        const unsubs = mvKeys.map(k => liveStyle[k].on(() => {
          applyMVStyle();
        }));
        applyMVStyle();
        return () => unsubs.forEach(u => u());
      }, [mvKeys.length]);
      function applyMVStyle() {
        if (!ref.current) return;
        const target = {};
        for (const k in liveStyle) {
          target[k] = isMV(liveStyle[k]) ? liveStyle[k].get() : liveStyle[k];
        }
        const css = styleObjectToCSS(target);
        Object.assign(ref.current.style, css);
      }

      // Animate to target using WAAPI
      const didInit = React.useRef(false);
      const runAnim = (target, trans) => {
        if (!ref.current || !target) return;
        const from = {};
        const to = styleObjectToCSS(target);
        // read current computed
        for (const k in to) {
          from[k] = ref.current.style[k] || getComputedStyle(ref.current)[k];
        }
        const duration = ((trans && trans.duration) || (transition && transition.duration) || 0.7) * 1000;
        const delay = ((trans && trans.delay) || (transition && transition.delay) || 0) * 1000;
        const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
        try {
          const anim = ref.current.animate(
            [from, to],
            { duration, delay, easing, fill: 'forwards' }
          );
          anim.onfinish = () => {
            Object.assign(ref.current.style, to);
          };
        } catch (e) {
          Object.assign(ref.current.style, to);
        }
      };

      React.useEffect(() => {
        if (!ref.current) return;
        // apply initial
        Object.assign(ref.current.style, styleObjectToCSS(initTarget));
        didInit.current = true;
        if (animTarget) {
          runAnim(animTarget, transition);
        }
      }, []);

      // whileInView via IntersectionObserver
      React.useEffect(() => {
        if (!wivTarget || !ref.current) return;
        let fired = false;
        const amt = (viewport && viewport.amount) || 0.2;
        const once = !viewport || viewport.once !== false;
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio >= amt || entry.isIntersecting && amt === 0) {
              if (fired && once) return;
              fired = true;
              runAnim(wivTarget, transition);
            } else if (!once && fired) {
              runAnim(initTarget, transition);
              fired = false;
            }
          });
        }, { threshold: [0, amt, 0.5, 1] });
        io.observe(ref.current);
        return () => io.disconnect();
      }, []);

      const onMouseEnter = hovTarget ? () => runAnim(hovTarget, transition) : undefined;
      const onMouseLeave = hovTarget ? () => runAnim(animTarget || initTarget, transition) : undefined;

      // Merge non-MV style keys into initial inline style
      const staticStyle = {};
      for (const k in liveStyle) if (!isMV(liveStyle[k])) staticStyle[k] = liveStyle[k];
      const mergedStyle = { ...initStyle, ...staticStyle };

      return React.createElement(tag, {
        ref,
        style: mergedStyle,
        onMouseEnter: onMouseEnter || rest.onMouseEnter,
        onMouseLeave: onMouseLeave || rest.onMouseLeave,
        ...rest,
      }, children);
    });
  }

  const cache = {};
  const motion = new Proxy({}, {
    get(_, tag) {
      if (!cache[tag]) cache[tag] = createMotion(tag);
      return cache[tag];
    }
  });

  window.motion = motion;
  window.useScroll = useScroll;
  window.useTransform = useTransform;
  window.useMotionValue = useMotionValue;
  window.useSpring = (mv) => mv; // passthrough
})();
