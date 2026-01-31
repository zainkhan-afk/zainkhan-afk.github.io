class Ray {
  constructor(pos, angle) {
    this.pos = pos.copy();
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(obs) {
    // Ray: P + tD
    // Circle: |X - C|² = r²
    const oc = p5.Vector.sub(this.pos, obs.pos);
    // console.log("oc", oc);

    const a = this.dir.dot(this.dir);
    const b = 2 * oc.dot(this.dir);
    const c = oc.dot(oc) - obs.size * obs.size;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null;

    const t = (-b - sqrt(discriminant)) / (2 * a);
    if (t < 0) return null;

    const hit = p5.Vector.add(
      this.pos,
      p5.Vector.mult(this.dir, t)
    );

    return {
      point: hit,
      dist: t
    };
  }

  show(len = 1000) {
    stroke(255, 100);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.dir.x * len,
      this.pos.y + this.dir.y * len
    );
  }
}
