/* Container3D — CSS-built block container that rotates in 3D, echoing storyboard frames 1-30 */

function Container3D({ rotateY = 25, rotateX = -10, scale = 1 }) {
  const { motion } = window;
  return (
    <div className="c3d-wrap">
      <motion.div
        className="c3d"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        }}
      >
        {/* top */}
        <div className="c3d-face top" />
        {/* bottom */}
        <div className="c3d-face bottom" />
        {/* left short side */}
        <div className="c3d-face side-short left">
          <div className="c3d-corner" style={{ left: 0, top: 0, bottom: 0 }} />
          <div className="c3d-corner" style={{ right: 0, top: 0, bottom: 0 }} />
        </div>
        {/* right short side */}
        <div className="c3d-face side-short right">
          <div className="c3d-corner" style={{ left: 0, top: 0, bottom: 0 }} />
          <div className="c3d-corner" style={{ right: 0, top: 0, bottom: 0 }} />
        </div>
        {/* back long */}
        <div className="c3d-face side-long-back" />
        {/* front long (visible face) */}
        <div className="c3d-face side-long">
          <div className="c3d-logo">ATIS</div>
          <div className="c3d-vent" />
          <div className="c3d-door" />
          <div className="c3d-corner" style={{ left: 0, top: 0, bottom: 0 }} />
          <div className="c3d-corner" style={{ right: 0, top: 0, bottom: 0 }} />
        </div>
      </motion.div>
    </div>
  );
}

window.Container3D = Container3D;
