// @__NO_SIDE_EFFECTS__
function Bs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ze = {}, rr = [], un = () => {
}, Rl = () => !1, Fi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ds = (e) => e.startsWith("onUpdate:"), st = Object.assign, Vs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Lu = Object.prototype.hasOwnProperty, qe = (e, t) => Lu.call(e, t), Ie = Array.isArray, ir = (e) => ji(e) === "[object Map]", Ll = (e) => ji(e) === "[object Set]", Oe = (e) => typeof e == "function", it = (e) => typeof e == "string", zn = (e) => typeof e == "symbol", tt = (e) => e !== null && typeof e == "object", Pl = (e) => (tt(e) || Oe(e)) && Oe(e.then) && Oe(e.catch), Il = Object.prototype.toString, ji = (e) => Il.call(e), Pu = (e) => ji(e).slice(8, -1), Bi = (e) => ji(e) === "[object Object]", Gs = (e) => it(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mr = /* @__PURE__ */ Bs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Di = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Iu = /-\w/g, Ht = Di(
  (e) => e.replace(Iu, (t) => t.slice(1).toUpperCase())
), Au = /\B([A-Z])/g, Wt = Di(
  (e) => e.replace(Au, "-$1").toLowerCase()
), Al = Di((e) => e.charAt(0).toUpperCase() + e.slice(1)), Hi = Di(
  (e) => e ? `on${Al(e)}` : ""
), On = (e, t) => !Object.is(e, t), es = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ol = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Ou = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, vo = (e) => {
  const t = it(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let _o;
const Vi = () => _o || (_o = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function qs(e) {
  if (Ie(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = it(r) ? ju(r) : qs(r);
      if (i)
        for (const a in i)
          t[a] = i[a];
    }
    return t;
  } else if (it(e) || tt(e))
    return e;
}
const $u = /;(?![^(]*\))/g, zu = /:([^]+)/, Fu = /\/\*[^]*?\*\//g;
function ju(e) {
  const t = {};
  return e.replace(Fu, "").split($u).forEach((n) => {
    if (n) {
      const r = n.split(zu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Us(e) {
  let t = "";
  if (it(e))
    t = e;
  else if (Ie(e))
    for (let n = 0; n < e.length; n++) {
      const r = Us(e[n]);
      r && (t += r + " ");
    }
  else if (tt(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Bu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Du = /* @__PURE__ */ Bs(Bu);
function $l(e) {
  return !!e || e === "";
}
const zl = (e) => !!(e && e.__v_isRef === !0), wn = (e) => it(e) ? e : e == null ? "" : Ie(e) || tt(e) && (e.toString === Il || !Oe(e.toString)) ? zl(e) ? wn(e.value) : JSON.stringify(e, Fl, 2) : String(e), Fl = (e, t) => zl(t) ? Fl(e, t.value) : ir(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, i], a) => (n[ts(r, a) + " =>"] = i, n),
    {}
  )
} : Ll(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ts(n))
} : zn(t) ? ts(t) : tt(t) && !Ie(t) && !Bi(t) ? String(t) : t, ts = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    zn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Pt;
class Vu {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Pt, !t && Pt && (this.index = (Pt.scopes || (Pt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Pt;
      try {
        return Pt = this, t();
      } finally {
        Pt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Pt, Pt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Pt = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Gu() {
  return Pt;
}
let et;
const ns = /* @__PURE__ */ new WeakSet();
class jl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pt && Pt.active && Pt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ns.has(this) && (ns.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Dl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, xo(this), Vl(this);
    const t = et, n = en;
    et = this, en = !0;
    try {
      return this.fn();
    } finally {
      Gl(this), et = t, en = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Xs(t);
      this.deps = this.depsTail = void 0, xo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ns.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ws(this) && this.run();
  }
  get dirty() {
    return ws(this);
  }
}
let Bl = 0, kr, Tr;
function Dl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tr, Tr = e;
    return;
  }
  e.next = kr, kr = e;
}
function Ws() {
  Bl++;
}
function Ks() {
  if (--Bl > 0)
    return;
  if (Tr) {
    let t = Tr;
    for (Tr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; kr; ) {
    let t = kr;
    for (kr = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Vl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Gl(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), Xs(r), qu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  e.deps = t, e.depsTail = n;
}
function ws(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ql(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ql(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ar) || (e.globalVersion = Ar, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ws(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = et, r = en;
  et = e, en = !0;
  try {
    Vl(e);
    const i = e.fn(e._value);
    (t.version === 0 || On(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    et = n, en = r, Gl(e), e.flags &= -3;
  }
}
function Xs(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: i } = e;
  if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let a = n.computed.deps; a; a = a.nextDep)
      Xs(a, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function qu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let en = !0;
const Ul = [];
function Sn() {
  Ul.push(en), en = !1;
}
function En() {
  const e = Ul.pop();
  en = e === void 0 ? !0 : e;
}
function xo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = et;
    et = void 0;
    try {
      t();
    } finally {
      et = n;
    }
  }
}
let Ar = 0;
class Uu {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ys {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!et || !en || et === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== et)
      n = this.activeLink = new Uu(et, this), et.deps ? (n.prevDep = et.depsTail, et.depsTail.nextDep = n, et.depsTail = n) : et.deps = et.depsTail = n, Wl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = et.depsTail, n.nextDep = void 0, et.depsTail.nextDep = n, et.depsTail = n, et.deps === n && (et.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ar++, this.notify(t);
  }
  notify(t) {
    Ws();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ks();
    }
  }
}
function Wl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Wl(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ys = /* @__PURE__ */ new WeakMap(), Kn = Symbol(
  ""
), bs = Symbol(
  ""
), Or = Symbol(
  ""
);
function gt(e, t, n) {
  if (en && et) {
    let r = ys.get(e);
    r || ys.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new Ys()), i.map = r, i.key = n), i.track();
  }
}
function bn(e, t, n, r, i, a) {
  const c = ys.get(e);
  if (!c) {
    Ar++;
    return;
  }
  const f = (d) => {
    d && d.trigger();
  };
  if (Ws(), t === "clear")
    c.forEach(f);
  else {
    const d = Ie(e), p = d && Gs(n);
    if (d && n === "length") {
      const m = Number(r);
      c.forEach((g, b) => {
        (b === "length" || b === Or || !zn(b) && b >= m) && f(g);
      });
    } else
      switch ((n !== void 0 || c.has(void 0)) && f(c.get(n)), p && f(c.get(Or)), t) {
        case "add":
          d ? p && f(c.get("length")) : (f(c.get(Kn)), ir(e) && f(c.get(bs)));
          break;
        case "delete":
          d || (f(c.get(Kn)), ir(e) && f(c.get(bs)));
          break;
        case "set":
          ir(e) && f(c.get(Kn));
          break;
      }
  }
  Ks();
}
function Zn(e) {
  const t = Ke(e);
  return t === e ? t : (gt(t, "iterate", Or), Xt(e) ? t : t.map(dt));
}
function Gi(e) {
  return gt(e = Ke(e), "iterate", Or), e;
}
const Wu = {
  __proto__: null,
  [Symbol.iterator]() {
    return rs(this, Symbol.iterator, dt);
  },
  concat(...e) {
    return Zn(this).concat(
      ...e.map((t) => Ie(t) ? Zn(t) : t)
    );
  },
  entries() {
    return rs(this, "entries", (e) => (e[1] = dt(e[1]), e));
  },
  every(e, t) {
    return gn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return gn(this, "filter", e, t, (n) => n.map(dt), arguments);
  },
  find(e, t) {
    return gn(this, "find", e, t, dt, arguments);
  },
  findIndex(e, t) {
    return gn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return gn(this, "findLast", e, t, dt, arguments);
  },
  findLastIndex(e, t) {
    return gn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return gn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return is(this, "includes", e);
  },
  indexOf(...e) {
    return is(this, "indexOf", e);
  },
  join(e) {
    return Zn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return is(this, "lastIndexOf", e);
  },
  map(e, t) {
    return gn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return mr(this, "pop");
  },
  push(...e) {
    return mr(this, "push", e);
  },
  reduce(e, ...t) {
    return So(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return So(this, "reduceRight", e, t);
  },
  shift() {
    return mr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return gn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return mr(this, "splice", e);
  },
  toReversed() {
    return Zn(this).toReversed();
  },
  toSorted(e) {
    return Zn(this).toSorted(e);
  },
  toSpliced(...e) {
    return Zn(this).toSpliced(...e);
  },
  unshift(...e) {
    return mr(this, "unshift", e);
  },
  values() {
    return rs(this, "values", dt);
  }
};
function rs(e, t, n) {
  const r = Gi(e), i = r[t]();
  return r !== e && !Xt(e) && (i._next = i.next, i.next = () => {
    const a = i._next();
    return a.done || (a.value = n(a.value)), a;
  }), i;
}
const Ku = Array.prototype;
function gn(e, t, n, r, i, a) {
  const c = Gi(e), f = c !== e && !Xt(e), d = c[t];
  if (d !== Ku[t]) {
    const g = d.apply(e, a);
    return f ? dt(g) : g;
  }
  let p = n;
  c !== e && (f ? p = function(g, b) {
    return n.call(this, dt(g), b, e);
  } : n.length > 2 && (p = function(g, b) {
    return n.call(this, g, b, e);
  }));
  const m = d.call(c, p, r);
  return f && i ? i(m) : m;
}
function So(e, t, n, r) {
  const i = Gi(e);
  let a = n;
  return i !== e && (Xt(e) ? n.length > 3 && (a = function(c, f, d) {
    return n.call(this, c, f, d, e);
  }) : a = function(c, f, d) {
    return n.call(this, c, dt(f), d, e);
  }), i[t](a, ...r);
}
function is(e, t, n) {
  const r = Ke(e);
  gt(r, "iterate", Or);
  const i = r[t](...n);
  return (i === -1 || i === !1) && Zs(n[0]) ? (n[0] = Ke(n[0]), r[t](...n)) : i;
}
function mr(e, t, n = []) {
  Sn(), Ws();
  const r = Ke(e)[t].apply(e, n);
  return Ks(), En(), r;
}
const Xu = /* @__PURE__ */ Bs("__proto__,__v_isRef,__isVue"), Kl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(zn)
);
function Yu(e) {
  zn(e) || (e = String(e));
  const t = Ke(this);
  return gt(t, "has", e), t.hasOwnProperty(e);
}
class Xl {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, a = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return a;
    if (n === "__v_raw")
      return r === (i ? a ? sc : Zl : a ? Jl : Ql).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const c = Ie(t);
    if (!i) {
      let d;
      if (c && (d = Wu[n]))
        return d;
      if (n === "hasOwnProperty")
        return Yu;
    }
    const f = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      mt(t) ? t : r
    );
    if ((zn(n) ? Kl.has(n) : Xu(n)) || (i || gt(t, "get", n), a))
      return f;
    if (mt(f)) {
      const d = c && Gs(n) ? f : f.value;
      return i && tt(d) ? _s(d) : d;
    }
    return tt(f) ? i ? _s(f) : qi(f) : f;
  }
}
class Yl extends Xl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, i) {
    let a = t[n];
    if (!this._isShallow) {
      const d = $n(a);
      if (!Xt(r) && !$n(r) && (a = Ke(a), r = Ke(r)), !Ie(t) && mt(a) && !mt(r))
        return d || (a.value = r), !0;
    }
    const c = Ie(t) && Gs(n) ? Number(n) < t.length : qe(t, n), f = Reflect.set(
      t,
      n,
      r,
      mt(t) ? t : i
    );
    return t === Ke(i) && (c ? On(r, a) && bn(t, "set", n, r) : bn(t, "add", n, r)), f;
  }
  deleteProperty(t, n) {
    const r = qe(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && bn(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!zn(n) || !Kl.has(n)) && gt(t, "has", n), r;
  }
  ownKeys(t) {
    return gt(
      t,
      "iterate",
      Ie(t) ? "length" : Kn
    ), Reflect.ownKeys(t);
  }
}
class Qu extends Xl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Ju = /* @__PURE__ */ new Yl(), Zu = /* @__PURE__ */ new Qu(), Hu = /* @__PURE__ */ new Yl(!0);
const vs = (e) => e, Zr = (e) => Reflect.getPrototypeOf(e);
function ec(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = Ke(i), c = ir(a), f = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, p = i[e](...r), m = n ? vs : t ? vi : dt;
    return !t && gt(
      a,
      "iterate",
      d ? bs : Kn
    ), {
      // iterator protocol
      next() {
        const { value: g, done: b } = p.next();
        return b ? { value: g, done: b } : {
          value: f ? [m(g[0]), m(g[1])] : m(g),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Hr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function tc(e, t) {
  const n = {
    get(i) {
      const a = this.__v_raw, c = Ke(a), f = Ke(i);
      e || (On(i, f) && gt(c, "get", i), gt(c, "get", f));
      const { has: d } = Zr(c), p = t ? vs : e ? vi : dt;
      if (d.call(c, i))
        return p(a.get(i));
      if (d.call(c, f))
        return p(a.get(f));
      a !== c && a.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && gt(Ke(i), "iterate", Kn), i.size;
    },
    has(i) {
      const a = this.__v_raw, c = Ke(a), f = Ke(i);
      return e || (On(i, f) && gt(c, "has", i), gt(c, "has", f)), i === f ? a.has(i) : a.has(i) || a.has(f);
    },
    forEach(i, a) {
      const c = this, f = c.__v_raw, d = Ke(f), p = t ? vs : e ? vi : dt;
      return !e && gt(d, "iterate", Kn), f.forEach((m, g) => i.call(a, p(m), p(g), c));
    }
  };
  return st(
    n,
    e ? {
      add: Hr("add"),
      set: Hr("set"),
      delete: Hr("delete"),
      clear: Hr("clear")
    } : {
      add(i) {
        !t && !Xt(i) && !$n(i) && (i = Ke(i));
        const a = Ke(this);
        return Zr(a).has.call(a, i) || (a.add(i), bn(a, "add", i, i)), this;
      },
      set(i, a) {
        !t && !Xt(a) && !$n(a) && (a = Ke(a));
        const c = Ke(this), { has: f, get: d } = Zr(c);
        let p = f.call(c, i);
        p || (i = Ke(i), p = f.call(c, i));
        const m = d.call(c, i);
        return c.set(i, a), p ? On(a, m) && bn(c, "set", i, a) : bn(c, "add", i, a), this;
      },
      delete(i) {
        const a = Ke(this), { has: c, get: f } = Zr(a);
        let d = c.call(a, i);
        d || (i = Ke(i), d = c.call(a, i)), f && f.call(a, i);
        const p = a.delete(i);
        return d && bn(a, "delete", i, void 0), p;
      },
      clear() {
        const i = Ke(this), a = i.size !== 0, c = i.clear();
        return a && bn(
          i,
          "clear",
          void 0,
          void 0
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = ec(i, e, t);
  }), n;
}
function Qs(e, t) {
  const n = tc(e, t);
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(
    qe(n, i) && i in r ? n : r,
    i,
    a
  );
}
const nc = {
  get: /* @__PURE__ */ Qs(!1, !1)
}, rc = {
  get: /* @__PURE__ */ Qs(!1, !0)
}, ic = {
  get: /* @__PURE__ */ Qs(!0, !1)
};
const Ql = /* @__PURE__ */ new WeakMap(), Jl = /* @__PURE__ */ new WeakMap(), Zl = /* @__PURE__ */ new WeakMap(), sc = /* @__PURE__ */ new WeakMap();
function oc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function lc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oc(Pu(e));
}
function qi(e) {
  return $n(e) ? e : Js(
    e,
    !1,
    Ju,
    nc,
    Ql
  );
}
function ac(e) {
  return Js(
    e,
    !1,
    Hu,
    rc,
    Jl
  );
}
function _s(e) {
  return Js(
    e,
    !0,
    Zu,
    ic,
    Zl
  );
}
function Js(e, t, n, r, i) {
  if (!tt(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = lc(e);
  if (a === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const f = new Proxy(
    e,
    a === 2 ? r : n
  );
  return i.set(e, f), f;
}
function sr(e) {
  return $n(e) ? sr(e.__v_raw) : !!(e && e.__v_isReactive);
}
function $n(e) {
  return !!(e && e.__v_isReadonly);
}
function Xt(e) {
  return !!(e && e.__v_isShallow);
}
function Zs(e) {
  return e ? !!e.__v_raw : !1;
}
function Ke(e) {
  const t = e && e.__v_raw;
  return t ? Ke(t) : e;
}
function uc(e) {
  return !qe(e, "__v_skip") && Object.isExtensible(e) && Ol(e, "__v_skip", !0), e;
}
const dt = (e) => tt(e) ? qi(e) : e, vi = (e) => tt(e) ? _s(e) : e;
function mt(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Eo(e) {
  return cc(e, !1);
}
function cc(e, t) {
  return mt(e) ? e : new fc(e, t);
}
class fc {
  constructor(t, n) {
    this.dep = new Ys(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Ke(t), this._value = n ? t : dt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || Xt(t) || $n(t);
    t = r ? t : Ke(t), On(t, n) && (this._rawValue = t, this._value = r ? t : dt(t), this.dep.trigger());
  }
}
function $r(e) {
  return mt(e) ? e.value : e;
}
const hc = {
  get: (e, t, n) => t === "__v_raw" ? e : $r(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return mt(i) && !mt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Hl(e) {
  return sr(e) ? e : new Proxy(e, hc);
}
class dc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ys(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ar - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    et !== this)
      return Dl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ql(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function pc(e, t, n = !1) {
  let r, i;
  return Oe(e) ? r = e : (r = e.get, i = e.set), new dc(r, i, n);
}
const ei = {}, _i = /* @__PURE__ */ new WeakMap();
let qn;
function gc(e, t = !1, n = qn) {
  if (n) {
    let r = _i.get(n);
    r || _i.set(n, r = []), r.push(e);
  }
}
function mc(e, t, n = Ze) {
  const { immediate: r, deep: i, once: a, scheduler: c, augmentJob: f, call: d } = n, p = (C) => i ? C : Xt(C) || i === !1 || i === 0 ? vn(C, 1) : vn(C);
  let m, g, b, T, L = !1, O = !1;
  if (mt(e) ? (g = () => e.value, L = Xt(e)) : sr(e) ? (g = () => p(e), L = !0) : Ie(e) ? (O = !0, L = e.some((C) => sr(C) || Xt(C)), g = () => e.map((C) => {
    if (mt(C))
      return C.value;
    if (sr(C))
      return p(C);
    if (Oe(C))
      return d ? d(C, 2) : C();
  })) : Oe(e) ? t ? g = d ? () => d(e, 2) : e : g = () => {
    if (b) {
      Sn();
      try {
        b();
      } finally {
        En();
      }
    }
    const C = qn;
    qn = m;
    try {
      return d ? d(e, 3, [T]) : e(T);
    } finally {
      qn = C;
    }
  } : g = un, t && i) {
    const C = g, V = i === !0 ? 1 / 0 : i;
    g = () => vn(C(), V);
  }
  const z = Gu(), S = () => {
    m.stop(), z && z.active && Vs(z.effects, m);
  };
  if (a && t) {
    const C = t;
    t = (...V) => {
      C(...V), S();
    };
  }
  let D = O ? new Array(e.length).fill(ei) : ei;
  const U = (C) => {
    if (!(!(m.flags & 1) || !m.dirty && !C))
      if (t) {
        const V = m.run();
        if (i || L || (O ? V.some((se, oe) => On(se, D[oe])) : On(V, D))) {
          b && b();
          const se = qn;
          qn = m;
          try {
            const oe = [
              V,
              // pass undefined as the old value when it's changed for the first time
              D === ei ? void 0 : O && D[0] === ei ? [] : D,
              T
            ];
            D = V, d ? d(t, 3, oe) : (
              // @ts-expect-error
              t(...oe)
            );
          } finally {
            qn = se;
          }
        }
      } else
        m.run();
  };
  return f && f(U), m = new jl(g), m.scheduler = c ? () => c(U, !1) : U, T = (C) => gc(C, !1, m), b = m.onStop = () => {
    const C = _i.get(m);
    if (C) {
      if (d)
        d(C, 4);
      else
        for (const V of C) V();
      _i.delete(m);
    }
  }, t ? r ? U(!0) : D = m.run() : c ? c(U.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function vn(e, t = 1 / 0, n) {
  if (t <= 0 || !tt(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, mt(e))
    vn(e.value, t, n);
  else if (Ie(e))
    for (let r = 0; r < e.length; r++)
      vn(e[r], t, n);
  else if (Ll(e) || ir(e))
    e.forEach((r) => {
      vn(r, t, n);
    });
  else if (Bi(e)) {
    for (const r in e)
      vn(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && vn(e[r], t, n);
  }
  return e;
}
function Kr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    Ui(i, t, n);
  }
}
function fn(e, t, n, r) {
  if (Oe(e)) {
    const i = Kr(e, t, n, r);
    return i && Pl(i) && i.catch((a) => {
      Ui(a, t, n);
    }), i;
  }
  if (Ie(e)) {
    const i = [];
    for (let a = 0; a < e.length; a++)
      i.push(fn(e[a], t, n, r));
    return i;
  }
}
function Ui(e, t, n, r = !0) {
  const i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Ze;
  if (t) {
    let f = t.parent;
    const d = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; f; ) {
      const m = f.ec;
      if (m) {
        for (let g = 0; g < m.length; g++)
          if (m[g](e, d, p) === !1)
            return;
      }
      f = f.parent;
    }
    if (a) {
      Sn(), Kr(a, null, 10, [
        e,
        d,
        p
      ]), En();
      return;
    }
  }
  wc(e, n, i, r, c);
}
function wc(e, t, n, r = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const _t = [];
let on = -1;
const or = [];
let Pn = null, Hn = 0;
const ea = /* @__PURE__ */ Promise.resolve();
let xi = null;
function ta(e) {
  const t = xi || ea;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yc(e) {
  let t = on + 1, n = _t.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = _t[r], a = zr(i);
    a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Hs(e) {
  if (!(e.flags & 1)) {
    const t = zr(e), n = _t[_t.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= zr(n) ? _t.push(e) : _t.splice(yc(t), 0, e), e.flags |= 1, na();
  }
}
function na() {
  xi || (xi = ea.then(ia));
}
function bc(e) {
  Ie(e) ? or.push(...e) : Pn && e.id === -1 ? Pn.splice(Hn + 1, 0, e) : e.flags & 1 || (or.push(e), e.flags |= 1), na();
}
function Mo(e, t, n = on + 1) {
  for (; n < _t.length; n++) {
    const r = _t[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      _t.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ra(e) {
  if (or.length) {
    const t = [...new Set(or)].sort(
      (n, r) => zr(n) - zr(r)
    );
    if (or.length = 0, Pn) {
      Pn.push(...t);
      return;
    }
    for (Pn = t, Hn = 0; Hn < Pn.length; Hn++) {
      const n = Pn[Hn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Pn = null, Hn = 0;
  }
}
const zr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ia(e) {
  try {
    for (on = 0; on < _t.length; on++) {
      const t = _t[on];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; on < _t.length; on++) {
      const t = _t[on];
      t && (t.flags &= -2);
    }
    on = -1, _t.length = 0, ra(), xi = null, (_t.length || or.length) && ia();
  }
}
let Kt = null, sa = null;
function Si(e) {
  const t = Kt;
  return Kt = e, sa = e && e.type.__scopeId || null, t;
}
function vc(e, t = Kt, n) {
  if (!t || e._n)
    return e;
  const r = (...i) => {
    r._d && $o(-1);
    const a = Si(t);
    let c;
    try {
      c = e(...i);
    } finally {
      Si(a), r._d && $o(1);
    }
    return c;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ai(e, t) {
  if (Kt === null)
    return e;
  const n = Yi(Kt), r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [a, c, f, d = Ze] = t[i];
    a && (Oe(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && vn(c), r.push({
      dir: a,
      instance: n,
      value: c,
      oldValue: void 0,
      arg: f,
      modifiers: d
    }));
  }
  return e;
}
function Bn(e, t, n, r) {
  const i = e.dirs, a = t && t.dirs;
  for (let c = 0; c < i.length; c++) {
    const f = i[c];
    a && (f.oldValue = a[c].value);
    let d = f.dir[r];
    d && (Sn(), fn(d, n, 8, [
      e.el,
      f,
      e,
      t
    ]), En());
  }
}
const _c = Symbol("_vte"), xc = (e) => e.__isTeleport, Sc = Symbol("_leaveCb");
function eo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, eo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function to(e, t) {
  return Oe(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    st({ name: e.name }, t, { setup: e })
  ) : e;
}
function oa(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Ei = /* @__PURE__ */ new WeakMap();
function Nr(e, t, n, r, i = !1) {
  if (Ie(e)) {
    e.forEach(
      (L, O) => Nr(
        L,
        t && (Ie(t) ? t[O] : t),
        n,
        r,
        i
      )
    );
    return;
  }
  if (Cr(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Nr(e, t, n, r.component.subTree);
    return;
  }
  const a = r.shapeFlag & 4 ? Yi(r.component) : r.el, c = i ? null : a, { i: f, r: d } = e, p = t && t.r, m = f.refs === Ze ? f.refs = {} : f.refs, g = f.setupState, b = Ke(g), T = g === Ze ? Rl : (L) => qe(b, L);
  if (p != null && p !== d) {
    if (ko(t), it(p))
      m[p] = null, T(p) && (g[p] = null);
    else if (mt(p)) {
      p.value = null;
      const L = t;
      L.k && (m[L.k] = null);
    }
  }
  if (Oe(d))
    Kr(d, f, 12, [c, m]);
  else {
    const L = it(d), O = mt(d);
    if (L || O) {
      const z = () => {
        if (e.f) {
          const S = L ? T(d) ? g[d] : m[d] : d.value;
          if (i)
            Ie(S) && Vs(S, a);
          else if (Ie(S))
            S.includes(a) || S.push(a);
          else if (L)
            m[d] = [a], T(d) && (g[d] = m[d]);
          else {
            const D = [a];
            d.value = D, e.k && (m[e.k] = D);
          }
        } else L ? (m[d] = c, T(d) && (g[d] = c)) : O && (d.value = c, e.k && (m[e.k] = c));
      };
      if (c) {
        const S = () => {
          z(), Ei.delete(e);
        };
        S.id = -1, Ei.set(e, S), zt(S, n);
      } else
        ko(e), z();
    }
  }
}
function ko(e) {
  const t = Ei.get(e);
  t && (t.flags |= 8, Ei.delete(e));
}
Vi().requestIdleCallback;
Vi().cancelIdleCallback;
const Cr = (e) => !!e.type.__asyncLoader, la = (e) => e.type.__isKeepAlive;
function Ec(e, t) {
  aa(e, "a", t);
}
function Mc(e, t) {
  aa(e, "da", t);
}
function aa(e, t, n = St) {
  const r = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Wi(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      la(i.parent.vnode) && kc(r, t, n, i), i = i.parent;
  }
}
function kc(e, t, n, r) {
  const i = Wi(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  no(() => {
    Vs(r[t], i);
  }, n);
}
function Wi(e, t, n = St, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...c) => {
      Sn();
      const f = Xr(n), d = fn(t, n, e, c);
      return f(), En(), d;
    });
    return r ? i.unshift(a) : i.push(a), a;
  }
}
const kn = (e) => (t, n = St) => {
  (!jr || e === "sp") && Wi(e, (...r) => t(...r), n);
}, Tc = kn("bm"), ua = kn("m"), Nc = kn(
  "bu"
), Cc = kn("u"), Rc = kn(
  "bum"
), no = kn("um"), Lc = kn(
  "sp"
), Pc = kn("rtg"), Ic = kn("rtc");
function Ac(e, t = St) {
  Wi("ec", e, t);
}
const Oc = Symbol.for("v-ndc");
function To(e, t, n, r) {
  let i;
  const a = n, c = Ie(e);
  if (c || it(e)) {
    const f = c && sr(e);
    let d = !1, p = !1;
    f && (d = !Xt(e), p = $n(e), e = Gi(e)), i = new Array(e.length);
    for (let m = 0, g = e.length; m < g; m++)
      i[m] = t(
        d ? p ? vi(dt(e[m])) : dt(e[m]) : e[m],
        m,
        void 0,
        a
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let f = 0; f < e; f++)
      i[f] = t(f + 1, f, void 0, a);
  } else if (tt(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (f, d) => t(f, d, void 0, a)
      );
    else {
      const f = Object.keys(e);
      i = new Array(f.length);
      for (let d = 0, p = f.length; d < p; d++) {
        const m = f[d];
        i[d] = t(e[m], m, d, a);
      }
    }
  else
    i = [];
  return i;
}
const xs = (e) => e ? Ca(e) ? Yi(e) : xs(e.parent) : null, Rr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ st(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xs(e.parent),
    $root: (e) => xs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Hs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ta.bind(e.proxy)),
    $watch: (e) => rf.bind(e)
  })
), ss = (e, t) => e !== Ze && !e.__isScriptSetup && qe(e, t), $c = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: i, props: a, accessCache: c, type: f, appContext: d } = e;
    let p;
    if (t[0] !== "$") {
      const T = c[t];
      if (T !== void 0)
        switch (T) {
          case 1:
            return r[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return a[t];
        }
      else {
        if (ss(r, t))
          return c[t] = 1, r[t];
        if (i !== Ze && qe(i, t))
          return c[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && qe(p, t)
        )
          return c[t] = 3, a[t];
        if (n !== Ze && qe(n, t))
          return c[t] = 4, n[t];
        Ss && (c[t] = 0);
      }
    }
    const m = Rr[t];
    let g, b;
    if (m)
      return t === "$attrs" && gt(e.attrs, "get", ""), m(e);
    if (
      // css module (injected by vue-loader)
      (g = f.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== Ze && qe(n, t))
      return c[t] = 4, n[t];
    if (
      // global properties
      b = d.config.globalProperties, qe(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: a } = e;
    return ss(i, t) ? (i[t] = n, !0) : r !== Ze && qe(r, t) ? (r[t] = n, !0) : qe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: a, type: c }
  }, f) {
    let d, p;
    return !!(n[f] || e !== Ze && f[0] !== "$" && qe(e, f) || ss(t, f) || (d = a[0]) && qe(d, f) || qe(r, f) || qe(Rr, f) || qe(i.config.globalProperties, f) || (p = c.__cssModules) && p[f]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : qe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function No(e) {
  return Ie(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ss = !0;
function zc(e) {
  const t = fa(e), n = e.proxy, r = e.ctx;
  Ss = !1, t.beforeCreate && Co(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: a,
    methods: c,
    watch: f,
    provide: d,
    inject: p,
    // lifecycle
    created: m,
    beforeMount: g,
    mounted: b,
    beforeUpdate: T,
    updated: L,
    activated: O,
    deactivated: z,
    beforeDestroy: S,
    beforeUnmount: D,
    destroyed: U,
    unmounted: C,
    render: V,
    renderTracked: se,
    renderTriggered: oe,
    errorCaptured: we,
    serverPrefetch: ke,
    // public API
    expose: ce,
    inheritAttrs: ve,
    // assets
    components: Ae,
    directives: de,
    filters: $
  } = t;
  if (p && Fc(p, r, null), c)
    for (const ne in c) {
      const re = c[ne];
      Oe(re) && (r[ne] = re.bind(n));
    }
  if (i) {
    const ne = i.call(n, n);
    tt(ne) && (e.data = qi(ne));
  }
  if (Ss = !0, a)
    for (const ne in a) {
      const re = a[ne], be = Oe(re) ? re.bind(n, n) : Oe(re.get) ? re.get.bind(n, n) : un, Me = !Oe(re) && Oe(re.set) ? re.set.bind(n) : un, Le = Ts({
        get: be,
        set: Me
      });
      Object.defineProperty(r, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Le.value,
        set: (fe) => Le.value = fe
      });
    }
  if (f)
    for (const ne in f)
      ca(f[ne], r, n, ne);
  if (d) {
    const ne = Oe(d) ? d.call(n) : d;
    Reflect.ownKeys(ne).forEach((re) => {
      qc(re, ne[re]);
    });
  }
  m && Co(m, e, "c");
  function X(ne, re) {
    Ie(re) ? re.forEach((be) => ne(be.bind(n))) : re && ne(re.bind(n));
  }
  if (X(Tc, g), X(ua, b), X(Nc, T), X(Cc, L), X(Ec, O), X(Mc, z), X(Ac, we), X(Ic, se), X(Pc, oe), X(Rc, D), X(no, C), X(Lc, ke), Ie(ce))
    if (ce.length) {
      const ne = e.exposed || (e.exposed = {});
      ce.forEach((re) => {
        Object.defineProperty(ne, re, {
          get: () => n[re],
          set: (be) => n[re] = be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  V && e.render === un && (e.render = V), ve != null && (e.inheritAttrs = ve), Ae && (e.components = Ae), de && (e.directives = de), ke && oa(e);
}
function Fc(e, t, n = un) {
  Ie(e) && (e = Es(e));
  for (const r in e) {
    const i = e[r];
    let a;
    tt(i) ? "default" in i ? a = ui(
      i.from || r,
      i.default,
      !0
    ) : a = ui(i.from || r) : a = ui(i), mt(a) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (c) => a.value = c
    }) : t[r] = a;
  }
}
function Co(e, t, n) {
  fn(
    Ie(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ca(e, t, n, r) {
  let i = r.includes(".") ? Ea(n, r) : () => n[r];
  if (it(e)) {
    const a = t[e];
    Oe(a) && ls(i, a);
  } else if (Oe(e))
    ls(i, e.bind(n));
  else if (tt(e))
    if (Ie(e))
      e.forEach((a) => ca(a, t, n, r));
    else {
      const a = Oe(e.handler) ? e.handler.bind(n) : t[e.handler];
      Oe(a) && ls(i, a, e);
    }
}
function fa(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: i,
    optionsCache: a,
    config: { optionMergeStrategies: c }
  } = e.appContext, f = a.get(t);
  let d;
  return f ? d = f : !i.length && !n && !r ? d = t : (d = {}, i.length && i.forEach(
    (p) => Mi(d, p, c, !0)
  ), Mi(d, t, c)), tt(t) && a.set(t, d), d;
}
function Mi(e, t, n, r = !1) {
  const { mixins: i, extends: a } = t;
  a && Mi(e, a, n, !0), i && i.forEach(
    (c) => Mi(e, c, n, !0)
  );
  for (const c in t)
    if (!(r && c === "expose")) {
      const f = jc[c] || n && n[c];
      e[c] = f ? f(e[c], t[c]) : t[c];
    }
  return e;
}
const jc = {
  data: Ro,
  props: Lo,
  emits: Lo,
  // objects
  methods: _r,
  computed: _r,
  // lifecycle
  beforeCreate: bt,
  created: bt,
  beforeMount: bt,
  mounted: bt,
  beforeUpdate: bt,
  updated: bt,
  beforeDestroy: bt,
  beforeUnmount: bt,
  destroyed: bt,
  unmounted: bt,
  activated: bt,
  deactivated: bt,
  errorCaptured: bt,
  serverPrefetch: bt,
  // assets
  components: _r,
  directives: _r,
  // watch
  watch: Dc,
  // provide / inject
  provide: Ro,
  inject: Bc
};
function Ro(e, t) {
  return t ? e ? function() {
    return st(
      Oe(e) ? e.call(this, this) : e,
      Oe(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Bc(e, t) {
  return _r(Es(e), Es(t));
}
function Es(e) {
  if (Ie(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function bt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function _r(e, t) {
  return e ? st(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Lo(e, t) {
  return e ? Ie(e) && Ie(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : st(
    /* @__PURE__ */ Object.create(null),
    No(e),
    No(t ?? {})
  ) : t;
}
function Dc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = st(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = bt(e[r], t[r]);
  return n;
}
function ha() {
  return {
    app: null,
    config: {
      isNativeTag: Rl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Vc = 0;
function Gc(e, t) {
  return function(r, i = null) {
    Oe(r) || (r = st({}, r)), i != null && !tt(i) && (i = null);
    const a = ha(), c = /* @__PURE__ */ new WeakSet(), f = [];
    let d = !1;
    const p = a.app = {
      _uid: Vc++,
      _component: r,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: Nf,
      get config() {
        return a.config;
      },
      set config(m) {
      },
      use(m, ...g) {
        return c.has(m) || (m && Oe(m.install) ? (c.add(m), m.install(p, ...g)) : Oe(m) && (c.add(m), m(p, ...g))), p;
      },
      mixin(m) {
        return a.mixins.includes(m) || a.mixins.push(m), p;
      },
      component(m, g) {
        return g ? (a.components[m] = g, p) : a.components[m];
      },
      directive(m, g) {
        return g ? (a.directives[m] = g, p) : a.directives[m];
      },
      mount(m, g, b) {
        if (!d) {
          const T = p._ceVNode || xn(r, i);
          return T.appContext = a, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(T, m, b), d = !0, p._container = m, m.__vue_app__ = p, Yi(T.component);
        }
      },
      onUnmount(m) {
        f.push(m);
      },
      unmount() {
        d && (fn(
          f,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(m, g) {
        return a.provides[m] = g, p;
      },
      runWithContext(m) {
        const g = lr;
        lr = p;
        try {
          return m();
        } finally {
          lr = g;
        }
      }
    };
    return p;
  };
}
let lr = null;
function qc(e, t) {
  if (St) {
    let n = St.provides;
    const r = St.parent && St.parent.provides;
    r === n && (n = St.provides = Object.create(r)), n[e] = t;
  }
}
function ui(e, t, n = !1) {
  const r = xf();
  if (r || lr) {
    let i = lr ? lr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && Oe(t) ? t.call(r && r.proxy) : t;
  }
}
const da = {}, pa = () => Object.create(da), ga = (e) => Object.getPrototypeOf(e) === da;
function Uc(e, t, n, r = !1) {
  const i = {}, a = pa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ma(e, t, i, a);
  for (const c in e.propsOptions[0])
    c in i || (i[c] = void 0);
  n ? e.props = r ? i : ac(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Wc(e, t, n, r) {
  const {
    props: i,
    attrs: a,
    vnode: { patchFlag: c }
  } = e, f = Ke(i), [d] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const m = e.vnode.dynamicProps;
      for (let g = 0; g < m.length; g++) {
        let b = m[g];
        if (Ki(e.emitsOptions, b))
          continue;
        const T = t[b];
        if (d)
          if (qe(a, b))
            T !== a[b] && (a[b] = T, p = !0);
          else {
            const L = Ht(b);
            i[L] = Ms(
              d,
              f,
              L,
              T,
              e,
              !1
            );
          }
        else
          T !== a[b] && (a[b] = T, p = !0);
      }
    }
  } else {
    ma(e, t, i, a) && (p = !0);
    let m;
    for (const g in f)
      (!t || // for camelCase
      !qe(t, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((m = Wt(g)) === g || !qe(t, m))) && (d ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[m] !== void 0) && (i[g] = Ms(
        d,
        f,
        g,
        void 0,
        e,
        !0
      )) : delete i[g]);
    if (a !== f)
      for (const g in a)
        (!t || !qe(t, g)) && (delete a[g], p = !0);
  }
  p && bn(e.attrs, "set", "");
}
function ma(e, t, n, r) {
  const [i, a] = e.propsOptions;
  let c = !1, f;
  if (t)
    for (let d in t) {
      if (Mr(d))
        continue;
      const p = t[d];
      let m;
      i && qe(i, m = Ht(d)) ? !a || !a.includes(m) ? n[m] = p : (f || (f = {}))[m] = p : Ki(e.emitsOptions, d) || (!(d in r) || p !== r[d]) && (r[d] = p, c = !0);
    }
  if (a) {
    const d = Ke(n), p = f || Ze;
    for (let m = 0; m < a.length; m++) {
      const g = a[m];
      n[g] = Ms(
        i,
        d,
        g,
        p[g],
        e,
        !qe(p, g)
      );
    }
  }
  return c;
}
function Ms(e, t, n, r, i, a) {
  const c = e[n];
  if (c != null) {
    const f = qe(c, "default");
    if (f && r === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && Oe(d)) {
        const { propsDefaults: p } = i;
        if (n in p)
          r = p[n];
        else {
          const m = Xr(i);
          r = p[n] = d.call(
            null,
            t
          ), m();
        }
      } else
        r = d;
      i.ce && i.ce._setProp(n, r);
    }
    c[
      0
      /* shouldCast */
    ] && (a && !f ? r = !1 : c[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Wt(n)) && (r = !0));
  }
  return r;
}
const Kc = /* @__PURE__ */ new WeakMap();
function wa(e, t, n = !1) {
  const r = n ? Kc : t.propsCache, i = r.get(e);
  if (i)
    return i;
  const a = e.props, c = {}, f = [];
  let d = !1;
  if (!Oe(e)) {
    const m = (g) => {
      d = !0;
      const [b, T] = wa(g, t, !0);
      st(c, b), T && f.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!a && !d)
    return tt(e) && r.set(e, rr), rr;
  if (Ie(a))
    for (let m = 0; m < a.length; m++) {
      const g = Ht(a[m]);
      Po(g) && (c[g] = Ze);
    }
  else if (a)
    for (const m in a) {
      const g = Ht(m);
      if (Po(g)) {
        const b = a[m], T = c[g] = Ie(b) || Oe(b) ? { type: b } : st({}, b), L = T.type;
        let O = !1, z = !0;
        if (Ie(L))
          for (let S = 0; S < L.length; ++S) {
            const D = L[S], U = Oe(D) && D.name;
            if (U === "Boolean") {
              O = !0;
              break;
            } else U === "String" && (z = !1);
          }
        else
          O = Oe(L) && L.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = O, T[
          1
          /* shouldCastTrue */
        ] = z, (O || qe(T, "default")) && f.push(g);
      }
    }
  const p = [c, f];
  return tt(e) && r.set(e, p), p;
}
function Po(e) {
  return e[0] !== "$" && !Mr(e);
}
const ro = (e) => e === "_" || e === "_ctx" || e === "$stable", io = (e) => Ie(e) ? e.map(ln) : [ln(e)], Xc = (e, t, n) => {
  if (t._n)
    return t;
  const r = vc((...i) => io(t(...i)), n);
  return r._c = !1, r;
}, ya = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if (ro(i)) continue;
    const a = e[i];
    if (Oe(a))
      t[i] = Xc(i, a, r);
    else if (a != null) {
      const c = io(a);
      t[i] = () => c;
    }
  }
}, ba = (e, t) => {
  const n = io(t);
  e.slots.default = () => n;
}, va = (e, t, n) => {
  for (const r in t)
    (n || !ro(r)) && (e[r] = t[r]);
}, Yc = (e, t, n) => {
  const r = e.slots = pa();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (va(r, t, n), n && Ol(r, "_", i, !0)) : ya(t, r);
  } else t && ba(e, t);
}, Qc = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let a = !0, c = Ze;
  if (r.shapeFlag & 32) {
    const f = t._;
    f ? n && f === 1 ? a = !1 : va(i, t, n) : (a = !t.$stable, ya(t, i)), c = t;
  } else t && (ba(e, t), c = { default: 1 });
  if (a)
    for (const f in i)
      !ro(f) && c[f] == null && delete i[f];
}, zt = hf;
function Jc(e) {
  return Zc(e);
}
function Zc(e, t) {
  const n = Vi();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: a,
    createElement: c,
    createText: f,
    createComment: d,
    setText: p,
    setElementText: m,
    parentNode: g,
    nextSibling: b,
    setScopeId: T = un,
    insertStaticContent: L
  } = e, O = (P, F, K, te = null, H = null, ee = null, pe = void 0, ie = null, he = !!F.dynamicChildren) => {
    if (P === F)
      return;
    P && !wr(P, F) && (te = We(P), fe(P, H, ee, !0), P = null), F.patchFlag === -2 && (he = !1, F.dynamicChildren = null);
    const { type: Q, ref: Ee, shapeFlag: me } = F;
    switch (Q) {
      case Xi:
        z(P, F, K, te);
        break;
      case cr:
        S(P, F, K, te);
        break;
      case as:
        P == null && D(F, K, te, pe);
        break;
      case Ut:
        Ae(
          P,
          F,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he
        );
        break;
      default:
        me & 1 ? V(
          P,
          F,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he
        ) : me & 6 ? de(
          P,
          F,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he
        ) : (me & 64 || me & 128) && Q.process(
          P,
          F,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he,
          wt
        );
    }
    Ee != null && H ? Nr(Ee, P && P.ref, ee, F || P, !F) : Ee == null && P && P.ref != null && Nr(P.ref, null, ee, P, !0);
  }, z = (P, F, K, te) => {
    if (P == null)
      r(
        F.el = f(F.children),
        K,
        te
      );
    else {
      const H = F.el = P.el;
      F.children !== P.children && p(H, F.children);
    }
  }, S = (P, F, K, te) => {
    P == null ? r(
      F.el = d(F.children || ""),
      K,
      te
    ) : F.el = P.el;
  }, D = (P, F, K, te) => {
    [P.el, P.anchor] = L(
      P.children,
      F,
      K,
      te,
      P.el,
      P.anchor
    );
  }, U = ({ el: P, anchor: F }, K, te) => {
    let H;
    for (; P && P !== F; )
      H = b(P), r(P, K, te), P = H;
    r(F, K, te);
  }, C = ({ el: P, anchor: F }) => {
    let K;
    for (; P && P !== F; )
      K = b(P), i(P), P = K;
    i(F);
  }, V = (P, F, K, te, H, ee, pe, ie, he) => {
    if (F.type === "svg" ? pe = "svg" : F.type === "math" && (pe = "mathml"), P == null)
      se(
        F,
        K,
        te,
        H,
        ee,
        pe,
        ie,
        he
      );
    else {
      const Q = P.el && P.el._isVueCE ? P.el : null;
      try {
        Q && Q._beginPatch(), ke(
          P,
          F,
          H,
          ee,
          pe,
          ie,
          he
        );
      } finally {
        Q && Q._endPatch();
      }
    }
  }, se = (P, F, K, te, H, ee, pe, ie) => {
    let he, Q;
    const { props: Ee, shapeFlag: me, transition: _e, dirs: Ne } = P;
    if (he = P.el = c(
      P.type,
      ee,
      Ee && Ee.is,
      Ee
    ), me & 8 ? m(he, P.children) : me & 16 && we(
      P.children,
      he,
      null,
      te,
      H,
      os(P, ee),
      pe,
      ie
    ), Ne && Bn(P, null, te, "created"), oe(he, P, P.scopeId, pe, te), Ee) {
      for (const Ve in Ee)
        Ve !== "value" && !Mr(Ve) && a(he, Ve, null, Ee[Ve], ee, te);
      "value" in Ee && a(he, "value", null, Ee.value, ee), (Q = Ee.onVnodeBeforeMount) && rn(Q, te, P);
    }
    Ne && Bn(P, null, te, "beforeMount");
    const $e = Hc(H, _e);
    $e && _e.beforeEnter(he), r(he, F, K), ((Q = Ee && Ee.onVnodeMounted) || $e || Ne) && zt(() => {
      Q && rn(Q, te, P), $e && _e.enter(he), Ne && Bn(P, null, te, "mounted");
    }, H);
  }, oe = (P, F, K, te, H) => {
    if (K && T(P, K), te)
      for (let ee = 0; ee < te.length; ee++)
        T(P, te[ee]);
    if (H) {
      let ee = H.subTree;
      if (F === ee || ka(ee.type) && (ee.ssContent === F || ee.ssFallback === F)) {
        const pe = H.vnode;
        oe(
          P,
          pe,
          pe.scopeId,
          pe.slotScopeIds,
          H.parent
        );
      }
    }
  }, we = (P, F, K, te, H, ee, pe, ie, he = 0) => {
    for (let Q = he; Q < P.length; Q++) {
      const Ee = P[Q] = ie ? In(P[Q]) : ln(P[Q]);
      O(
        null,
        Ee,
        F,
        K,
        te,
        H,
        ee,
        pe,
        ie
      );
    }
  }, ke = (P, F, K, te, H, ee, pe) => {
    const ie = F.el = P.el;
    let { patchFlag: he, dynamicChildren: Q, dirs: Ee } = F;
    he |= P.patchFlag & 16;
    const me = P.props || Ze, _e = F.props || Ze;
    let Ne;
    if (K && Dn(K, !1), (Ne = _e.onVnodeBeforeUpdate) && rn(Ne, K, F, P), Ee && Bn(F, P, K, "beforeUpdate"), K && Dn(K, !0), (me.innerHTML && _e.innerHTML == null || me.textContent && _e.textContent == null) && m(ie, ""), Q ? ce(
      P.dynamicChildren,
      Q,
      ie,
      K,
      te,
      os(F, H),
      ee
    ) : pe || re(
      P,
      F,
      ie,
      null,
      K,
      te,
      os(F, H),
      ee,
      !1
    ), he > 0) {
      if (he & 16)
        ve(ie, me, _e, K, H);
      else if (he & 2 && me.class !== _e.class && a(ie, "class", null, _e.class, H), he & 4 && a(ie, "style", me.style, _e.style, H), he & 8) {
        const $e = F.dynamicProps;
        for (let Ve = 0; Ve < $e.length; Ve++) {
          const Ce = $e[Ve], ut = me[Ce], ct = _e[Ce];
          (ct !== ut || Ce === "value") && a(ie, Ce, ut, ct, H, K);
        }
      }
      he & 1 && P.children !== F.children && m(ie, F.children);
    } else !pe && Q == null && ve(ie, me, _e, K, H);
    ((Ne = _e.onVnodeUpdated) || Ee) && zt(() => {
      Ne && rn(Ne, K, F, P), Ee && Bn(F, P, K, "updated");
    }, te);
  }, ce = (P, F, K, te, H, ee, pe) => {
    for (let ie = 0; ie < F.length; ie++) {
      const he = P[ie], Q = F[ie], Ee = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        he.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (he.type === Ut || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !wr(he, Q) || // - In the case of a component, it could contain anything.
        he.shapeFlag & 198) ? g(he.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          K
        )
      );
      O(
        he,
        Q,
        Ee,
        null,
        te,
        H,
        ee,
        pe,
        !0
      );
    }
  }, ve = (P, F, K, te, H) => {
    if (F !== K) {
      if (F !== Ze)
        for (const ee in F)
          !Mr(ee) && !(ee in K) && a(
            P,
            ee,
            F[ee],
            null,
            H,
            te
          );
      for (const ee in K) {
        if (Mr(ee)) continue;
        const pe = K[ee], ie = F[ee];
        pe !== ie && ee !== "value" && a(P, ee, ie, pe, H, te);
      }
      "value" in K && a(P, "value", F.value, K.value, H);
    }
  }, Ae = (P, F, K, te, H, ee, pe, ie, he) => {
    const Q = F.el = P ? P.el : f(""), Ee = F.anchor = P ? P.anchor : f("");
    let { patchFlag: me, dynamicChildren: _e, slotScopeIds: Ne } = F;
    Ne && (ie = ie ? ie.concat(Ne) : Ne), P == null ? (r(Q, K, te), r(Ee, K, te), we(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      F.children || [],
      K,
      Ee,
      H,
      ee,
      pe,
      ie,
      he
    )) : me > 0 && me & 64 && _e && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    P.dynamicChildren ? (ce(
      P.dynamicChildren,
      _e,
      K,
      H,
      ee,
      pe,
      ie
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (F.key != null || H && F === H.subTree) && _a(
      P,
      F,
      !0
      /* shallow */
    )) : re(
      P,
      F,
      K,
      Ee,
      H,
      ee,
      pe,
      ie,
      he
    );
  }, de = (P, F, K, te, H, ee, pe, ie, he) => {
    F.slotScopeIds = ie, P == null ? F.shapeFlag & 512 ? H.ctx.activate(
      F,
      K,
      te,
      pe,
      he
    ) : $(
      F,
      K,
      te,
      H,
      ee,
      pe,
      he
    ) : ae(P, F, he);
  }, $ = (P, F, K, te, H, ee, pe) => {
    const ie = P.component = _f(
      P,
      te,
      H
    );
    if (la(P) && (ie.ctx.renderer = wt), Sf(ie, !1, pe), ie.asyncDep) {
      if (H && H.registerDep(ie, X, pe), !P.el) {
        const he = ie.subTree = xn(cr);
        S(null, he, F, K), P.placeholder = he.el;
      }
    } else
      X(
        ie,
        P,
        F,
        K,
        H,
        ee,
        pe
      );
  }, ae = (P, F, K) => {
    const te = F.component = P.component;
    if (cf(P, F, K))
      if (te.asyncDep && !te.asyncResolved) {
        ne(te, F, K);
        return;
      } else
        te.next = F, te.update();
    else
      F.el = P.el, te.vnode = F;
  }, X = (P, F, K, te, H, ee, pe) => {
    const ie = () => {
      if (P.isMounted) {
        let { next: me, bu: _e, u: Ne, parent: $e, vnode: Ve } = P;
        {
          const Ct = xa(P);
          if (Ct) {
            me && (me.el = Ve.el, ne(P, me, pe)), Ct.asyncDep.then(() => {
              P.isUnmounted || ie();
            });
            return;
          }
        }
        let Ce = me, ut;
        Dn(P, !1), me ? (me.el = Ve.el, ne(P, me, pe)) : me = Ve, _e && es(_e), (ut = me.props && me.props.onVnodeBeforeUpdate) && rn(ut, $e, me, Ve), Dn(P, !0);
        const ct = Ao(P), yt = P.subTree;
        P.subTree = ct, O(
          yt,
          ct,
          // parent may have changed if it's in a teleport
          g(yt.el),
          // anchor may have changed if it's in a fragment
          We(yt),
          P,
          H,
          ee
        ), me.el = ct.el, Ce === null && ff(P, ct.el), Ne && zt(Ne, H), (ut = me.props && me.props.onVnodeUpdated) && zt(
          () => rn(ut, $e, me, Ve),
          H
        );
      } else {
        let me;
        const { el: _e, props: Ne } = F, { bm: $e, m: Ve, parent: Ce, root: ut, type: ct } = P, yt = Cr(F);
        Dn(P, !1), $e && es($e), !yt && (me = Ne && Ne.onVnodeBeforeMount) && rn(me, Ce, F), Dn(P, !0);
        {
          ut.ce && // @ts-expect-error _def is private
          ut.ce._def.shadowRoot !== !1 && ut.ce._injectChildStyle(ct);
          const Ct = P.subTree = Ao(P);
          O(
            null,
            Ct,
            K,
            te,
            P,
            H,
            ee
          ), F.el = Ct.el;
        }
        if (Ve && zt(Ve, H), !yt && (me = Ne && Ne.onVnodeMounted)) {
          const Ct = F;
          zt(
            () => rn(me, Ce, Ct),
            H
          );
        }
        (F.shapeFlag & 256 || Ce && Cr(Ce.vnode) && Ce.vnode.shapeFlag & 256) && P.a && zt(P.a, H), P.isMounted = !0, F = K = te = null;
      }
    };
    P.scope.on();
    const he = P.effect = new jl(ie);
    P.scope.off();
    const Q = P.update = he.run.bind(he), Ee = P.job = he.runIfDirty.bind(he);
    Ee.i = P, Ee.id = P.uid, he.scheduler = () => Hs(Ee), Dn(P, !0), Q();
  }, ne = (P, F, K) => {
    F.component = P;
    const te = P.vnode.props;
    P.vnode = F, P.next = null, Wc(P, F.props, te, K), Qc(P, F.children, K), Sn(), Mo(P), En();
  }, re = (P, F, K, te, H, ee, pe, ie, he = !1) => {
    const Q = P && P.children, Ee = P ? P.shapeFlag : 0, me = F.children, { patchFlag: _e, shapeFlag: Ne } = F;
    if (_e > 0) {
      if (_e & 128) {
        Me(
          Q,
          me,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he
        );
        return;
      } else if (_e & 256) {
        be(
          Q,
          me,
          K,
          te,
          H,
          ee,
          pe,
          ie,
          he
        );
        return;
      }
    }
    Ne & 8 ? (Ee & 16 && De(Q, H, ee), me !== Q && m(K, me)) : Ee & 16 ? Ne & 16 ? Me(
      Q,
      me,
      K,
      te,
      H,
      ee,
      pe,
      ie,
      he
    ) : De(Q, H, ee, !0) : (Ee & 8 && m(K, ""), Ne & 16 && we(
      me,
      K,
      te,
      H,
      ee,
      pe,
      ie,
      he
    ));
  }, be = (P, F, K, te, H, ee, pe, ie, he) => {
    P = P || rr, F = F || rr;
    const Q = P.length, Ee = F.length, me = Math.min(Q, Ee);
    let _e;
    for (_e = 0; _e < me; _e++) {
      const Ne = F[_e] = he ? In(F[_e]) : ln(F[_e]);
      O(
        P[_e],
        Ne,
        K,
        null,
        H,
        ee,
        pe,
        ie,
        he
      );
    }
    Q > Ee ? De(
      P,
      H,
      ee,
      !0,
      !1,
      me
    ) : we(
      F,
      K,
      te,
      H,
      ee,
      pe,
      ie,
      he,
      me
    );
  }, Me = (P, F, K, te, H, ee, pe, ie, he) => {
    let Q = 0;
    const Ee = F.length;
    let me = P.length - 1, _e = Ee - 1;
    for (; Q <= me && Q <= _e; ) {
      const Ne = P[Q], $e = F[Q] = he ? In(F[Q]) : ln(F[Q]);
      if (wr(Ne, $e))
        O(
          Ne,
          $e,
          K,
          null,
          H,
          ee,
          pe,
          ie,
          he
        );
      else
        break;
      Q++;
    }
    for (; Q <= me && Q <= _e; ) {
      const Ne = P[me], $e = F[_e] = he ? In(F[_e]) : ln(F[_e]);
      if (wr(Ne, $e))
        O(
          Ne,
          $e,
          K,
          null,
          H,
          ee,
          pe,
          ie,
          he
        );
      else
        break;
      me--, _e--;
    }
    if (Q > me) {
      if (Q <= _e) {
        const Ne = _e + 1, $e = Ne < Ee ? F[Ne].el : te;
        for (; Q <= _e; )
          O(
            null,
            F[Q] = he ? In(F[Q]) : ln(F[Q]),
            K,
            $e,
            H,
            ee,
            pe,
            ie,
            he
          ), Q++;
      }
    } else if (Q > _e)
      for (; Q <= me; )
        fe(P[Q], H, ee, !0), Q++;
    else {
      const Ne = Q, $e = Q, Ve = /* @__PURE__ */ new Map();
      for (Q = $e; Q <= _e; Q++) {
        const ft = F[Q] = he ? In(F[Q]) : ln(F[Q]);
        ft.key != null && Ve.set(ft.key, Q);
      }
      let Ce, ut = 0;
      const ct = _e - $e + 1;
      let yt = !1, Ct = 0;
      const dn = new Array(ct);
      for (Q = 0; Q < ct; Q++) dn[Q] = 0;
      for (Q = Ne; Q <= me; Q++) {
        const ft = P[Q];
        if (ut >= ct) {
          fe(ft, H, ee, !0);
          continue;
        }
        let Rt;
        if (ft.key != null)
          Rt = Ve.get(ft.key);
        else
          for (Ce = $e; Ce <= _e; Ce++)
            if (dn[Ce - $e] === 0 && wr(ft, F[Ce])) {
              Rt = Ce;
              break;
            }
        Rt === void 0 ? fe(ft, H, ee, !0) : (dn[Rt - $e] = Q + 1, Rt >= Ct ? Ct = Rt : yt = !0, O(
          ft,
          F[Rt],
          K,
          null,
          H,
          ee,
          pe,
          ie,
          he
        ), ut++);
      }
      const Tn = yt ? ef(dn) : rr;
      for (Ce = Tn.length - 1, Q = ct - 1; Q >= 0; Q--) {
        const ft = $e + Q, Rt = F[ft], Fn = F[ft + 1], Jn = ft + 1 < Ee ? (
          // #13559, fallback to el placeholder for unresolved async component
          Fn.el || Fn.placeholder
        ) : te;
        dn[Q] === 0 ? O(
          null,
          Rt,
          K,
          Jn,
          H,
          ee,
          pe,
          ie,
          he
        ) : yt && (Ce < 0 || Q !== Tn[Ce] ? Le(Rt, K, Jn, 2) : Ce--);
      }
    }
  }, Le = (P, F, K, te, H = null) => {
    const { el: ee, type: pe, transition: ie, children: he, shapeFlag: Q } = P;
    if (Q & 6) {
      Le(P.component.subTree, F, K, te);
      return;
    }
    if (Q & 128) {
      P.suspense.move(F, K, te);
      return;
    }
    if (Q & 64) {
      pe.move(P, F, K, wt);
      return;
    }
    if (pe === Ut) {
      r(ee, F, K);
      for (let me = 0; me < he.length; me++)
        Le(he[me], F, K, te);
      r(P.anchor, F, K);
      return;
    }
    if (pe === as) {
      U(P, F, K);
      return;
    }
    if (te !== 2 && Q & 1 && ie)
      if (te === 0)
        ie.beforeEnter(ee), r(ee, F, K), zt(() => ie.enter(ee), H);
      else {
        const { leave: me, delayLeave: _e, afterLeave: Ne } = ie, $e = () => {
          P.ctx.isUnmounted ? i(ee) : r(ee, F, K);
        }, Ve = () => {
          ee._isLeaving && ee[Sc](
            !0
            /* cancelled */
          ), me(ee, () => {
            $e(), Ne && Ne();
          });
        };
        _e ? _e(ee, $e, Ve) : Ve();
      }
    else
      r(ee, F, K);
  }, fe = (P, F, K, te = !1, H = !1) => {
    const {
      type: ee,
      props: pe,
      ref: ie,
      children: he,
      dynamicChildren: Q,
      shapeFlag: Ee,
      patchFlag: me,
      dirs: _e,
      cacheIndex: Ne
    } = P;
    if (me === -2 && (H = !1), ie != null && (Sn(), Nr(ie, null, K, P, !0), En()), Ne != null && (F.renderCache[Ne] = void 0), Ee & 256) {
      F.ctx.deactivate(P);
      return;
    }
    const $e = Ee & 1 && _e, Ve = !Cr(P);
    let Ce;
    if (Ve && (Ce = pe && pe.onVnodeBeforeUnmount) && rn(Ce, F, P), Ee & 6)
      Z(P.component, K, te);
    else {
      if (Ee & 128) {
        P.suspense.unmount(K, te);
        return;
      }
      $e && Bn(P, null, F, "beforeUnmount"), Ee & 64 ? P.type.remove(
        P,
        F,
        K,
        wt,
        te
      ) : Q && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !Q.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ee !== Ut || me > 0 && me & 64) ? De(
        Q,
        F,
        K,
        !1,
        !0
      ) : (ee === Ut && me & 384 || !H && Ee & 16) && De(he, F, K), te && Qe(P);
    }
    (Ve && (Ce = pe && pe.onVnodeUnmounted) || $e) && zt(() => {
      Ce && rn(Ce, F, P), $e && Bn(P, null, F, "unmounted");
    }, K);
  }, Qe = (P) => {
    const { type: F, el: K, anchor: te, transition: H } = P;
    if (F === Ut) {
      Ue(K, te);
      return;
    }
    if (F === as) {
      C(P);
      return;
    }
    const ee = () => {
      i(K), H && !H.persisted && H.afterLeave && H.afterLeave();
    };
    if (P.shapeFlag & 1 && H && !H.persisted) {
      const { leave: pe, delayLeave: ie } = H, he = () => pe(K, ee);
      ie ? ie(P.el, ee, he) : he();
    } else
      ee();
  }, Ue = (P, F) => {
    let K;
    for (; P !== F; )
      K = b(P), i(P), P = K;
    i(F);
  }, Z = (P, F, K) => {
    const { bum: te, scope: H, job: ee, subTree: pe, um: ie, m: he, a: Q } = P;
    Io(he), Io(Q), te && es(te), H.stop(), ee && (ee.flags |= 8, fe(pe, P, F, K)), ie && zt(ie, F), zt(() => {
      P.isUnmounted = !0;
    }, F);
  }, De = (P, F, K, te = !1, H = !1, ee = 0) => {
    for (let pe = ee; pe < P.length; pe++)
      fe(P[pe], F, K, te, H);
  }, We = (P) => {
    if (P.shapeFlag & 6)
      return We(P.component.subTree);
    if (P.shapeFlag & 128)
      return P.suspense.next();
    const F = b(P.anchor || P.el), K = F && F[_c];
    return K ? b(K) : F;
  };
  let Be = !1;
  const ot = (P, F, K) => {
    P == null ? F._vnode && fe(F._vnode, null, null, !0) : O(
      F._vnode || null,
      P,
      F,
      null,
      null,
      null,
      K
    ), F._vnode = P, Be || (Be = !0, Mo(), ra(), Be = !1);
  }, wt = {
    p: O,
    um: fe,
    m: Le,
    r: Qe,
    mt: $,
    mc: we,
    pc: re,
    pbc: ce,
    n: We,
    o: e
  };
  return {
    render: ot,
    hydrate: void 0,
    createApp: Gc(ot)
  };
}
function os({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Dn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _a(e, t, n = !1) {
  const r = e.children, i = t.children;
  if (Ie(r) && Ie(i))
    for (let a = 0; a < r.length; a++) {
      const c = r[a];
      let f = i[a];
      f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = i[a] = In(i[a]), f.el = c.el), !n && f.patchFlag !== -2 && _a(c, f)), f.type === Xi && // avoid cached text nodes retaining detached dom nodes
      f.patchFlag !== -1 && (f.el = c.el), f.type === cr && !f.el && (f.el = c.el);
    }
}
function ef(e) {
  const t = e.slice(), n = [0];
  let r, i, a, c, f;
  const d = e.length;
  for (r = 0; r < d; r++) {
    const p = e[r];
    if (p !== 0) {
      if (i = n[n.length - 1], e[i] < p) {
        t[r] = i, n.push(r);
        continue;
      }
      for (a = 0, c = n.length - 1; a < c; )
        f = a + c >> 1, e[n[f]] < p ? a = f + 1 : c = f;
      p < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
    }
  }
  for (a = n.length, c = n[a - 1]; a-- > 0; )
    n[a] = c, c = t[c];
  return n;
}
function xa(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xa(t);
}
function Io(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const tf = Symbol.for("v-scx"), nf = () => ui(tf);
function ls(e, t, n) {
  return Sa(e, t, n);
}
function Sa(e, t, n = Ze) {
  const { immediate: r, deep: i, flush: a, once: c } = n, f = st({}, n), d = t && r || !t && a !== "post";
  let p;
  if (jr) {
    if (a === "sync") {
      const T = nf();
      p = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!d) {
      const T = () => {
      };
      return T.stop = un, T.resume = un, T.pause = un, T;
    }
  }
  const m = St;
  f.call = (T, L, O) => fn(T, m, L, O);
  let g = !1;
  a === "post" ? f.scheduler = (T) => {
    zt(T, m && m.suspense);
  } : a !== "sync" && (g = !0, f.scheduler = (T, L) => {
    L ? T() : Hs(T);
  }), f.augmentJob = (T) => {
    t && (T.flags |= 4), g && (T.flags |= 2, m && (T.id = m.uid, T.i = m));
  };
  const b = mc(e, t, f);
  return jr && (p ? p.push(b) : d && b()), b;
}
function rf(e, t, n) {
  const r = this.proxy, i = it(e) ? e.includes(".") ? Ea(r, e) : () => r[e] : e.bind(r, r);
  let a;
  Oe(t) ? a = t : (a = t.handler, n = t);
  const c = Xr(this), f = Sa(i, a.bind(r), n);
  return c(), f;
}
function Ea(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
const sf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ht(t)}Modifiers`] || e[`${Wt(t)}Modifiers`];
function of(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Ze;
  let i = n;
  const a = t.startsWith("update:"), c = a && sf(r, t.slice(7));
  c && (c.trim && (i = n.map((m) => it(m) ? m.trim() : m)), c.number && (i = n.map(Ou)));
  let f, d = r[f = Hi(t)] || // also try camelCase event handler (#2249)
  r[f = Hi(Ht(t))];
  !d && a && (d = r[f = Hi(Wt(t))]), d && fn(
    d,
    e,
    6,
    i
  );
  const p = r[f + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[f])
      return;
    e.emitted[f] = !0, fn(
      p,
      e,
      6,
      i
    );
  }
}
const lf = /* @__PURE__ */ new WeakMap();
function Ma(e, t, n = !1) {
  const r = n ? lf : t.emitsCache, i = r.get(e);
  if (i !== void 0)
    return i;
  const a = e.emits;
  let c = {}, f = !1;
  if (!Oe(e)) {
    const d = (p) => {
      const m = Ma(p, t, !0);
      m && (f = !0, st(c, m));
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !a && !f ? (tt(e) && r.set(e, null), null) : (Ie(a) ? a.forEach((d) => c[d] = null) : st(c, a), tt(e) && r.set(e, c), c);
}
function Ki(e, t) {
  return !e || !Fi(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), qe(e, t[0].toLowerCase() + t.slice(1)) || qe(e, Wt(t)) || qe(e, t));
}
function Ao(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    propsOptions: [a],
    slots: c,
    attrs: f,
    emit: d,
    render: p,
    renderCache: m,
    props: g,
    data: b,
    setupState: T,
    ctx: L,
    inheritAttrs: O
  } = e, z = Si(e);
  let S, D;
  try {
    if (n.shapeFlag & 4) {
      const C = i || r, V = C;
      S = ln(
        p.call(
          V,
          C,
          m,
          g,
          T,
          b,
          L
        )
      ), D = f;
    } else {
      const C = t;
      S = ln(
        C.length > 1 ? C(
          g,
          { attrs: f, slots: c, emit: d }
        ) : C(
          g,
          null
        )
      ), D = t.props ? f : af(f);
    }
  } catch (C) {
    Lr.length = 0, Ui(C, e, 1), S = xn(cr);
  }
  let U = S;
  if (D && O !== !1) {
    const C = Object.keys(D), { shapeFlag: V } = U;
    C.length && V & 7 && (a && C.some(Ds) && (D = uf(
      D,
      a
    )), U = fr(U, D, !1, !0));
  }
  return n.dirs && (U = fr(U, null, !1, !0), U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs), n.transition && eo(U, n.transition), S = U, Si(z), S;
}
const af = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Fi(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, uf = (e, t) => {
  const n = {};
  for (const r in e)
    (!Ds(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function cf(e, t, n) {
  const { props: r, children: i, component: a } = e, { props: c, children: f, patchFlag: d } = t, p = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return r ? Oo(r, c, p) : !!c;
    if (d & 8) {
      const m = t.dynamicProps;
      for (let g = 0; g < m.length; g++) {
        const b = m[g];
        if (c[b] !== r[b] && !Ki(p, b))
          return !0;
      }
    }
  } else
    return (i || f) && (!f || !f.$stable) ? !0 : r === c ? !1 : r ? c ? Oo(r, c, p) : !0 : !!c;
  return !1;
}
function Oo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if (t[a] !== e[a] && !Ki(n, a))
      return !0;
  }
  return !1;
}
function ff({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ka = (e) => e.__isSuspense;
function hf(e, t) {
  t && t.pendingBranch ? Ie(e) ? t.effects.push(...e) : t.effects.push(e) : bc(e);
}
const Ut = Symbol.for("v-fgt"), Xi = Symbol.for("v-txt"), cr = Symbol.for("v-cmt"), as = Symbol.for("v-stc"), Lr = [];
let Dt = null;
function Nn(e = !1) {
  Lr.push(Dt = e ? null : []);
}
function df() {
  Lr.pop(), Dt = Lr[Lr.length - 1] || null;
}
let Fr = 1;
function $o(e, t = !1) {
  Fr += e, e < 0 && Dt && t && (Dt.hasOnce = !0);
}
function pf(e) {
  return e.dynamicChildren = Fr > 0 ? Dt || rr : null, df(), Fr > 0 && Dt && Dt.push(e), e;
}
function Cn(e, t, n, r, i, a) {
  return pf(
    jt(
      e,
      t,
      n,
      r,
      i,
      a,
      !0
    )
  );
}
function Ta(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function wr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Na = ({ key: e }) => e ?? null, ci = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? it(e) || mt(e) || Oe(e) ? { i: Kt, r: e, k: t, f: !!n } : e : null);
function jt(e, t = null, n = null, r = 0, i = null, a = e === Ut ? 0 : 1, c = !1, f = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Na(t),
    ref: t && ci(t),
    scopeId: sa,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Kt
  };
  return f ? (so(d, n), a & 128 && e.normalize(d)) : n && (d.shapeFlag |= it(n) ? 8 : 16), Fr > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  Dt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && Dt.push(d), d;
}
const xn = gf;
function gf(e, t = null, n = null, r = 0, i = null, a = !1) {
  if ((!e || e === Oc) && (e = cr), Ta(e)) {
    const f = fr(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && so(f, n), Fr > 0 && !a && Dt && (f.shapeFlag & 6 ? Dt[Dt.indexOf(e)] = f : Dt.push(f)), f.patchFlag = -2, f;
  }
  if (Tf(e) && (e = e.__vccOpts), t) {
    t = mf(t);
    let { class: f, style: d } = t;
    f && !it(f) && (t.class = Us(f)), tt(d) && (Zs(d) && !Ie(d) && (d = st({}, d)), t.style = qs(d));
  }
  const c = it(e) ? 1 : ka(e) ? 128 : xc(e) ? 64 : tt(e) ? 4 : Oe(e) ? 2 : 0;
  return jt(
    e,
    t,
    n,
    r,
    i,
    c,
    a,
    !0
  );
}
function mf(e) {
  return e ? Zs(e) || ga(e) ? st({}, e) : e : null;
}
function fr(e, t, n = !1, r = !1) {
  const { props: i, ref: a, patchFlag: c, children: f, transition: d } = e, p = t ? yf(i || {}, t) : i, m = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Na(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && a ? Ie(a) ? a.concat(ci(t)) : [a, ci(t)] : ci(t)
    ) : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: f,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ut ? c === -1 ? 16 : c | 16 : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && fr(e.ssContent),
    ssFallback: e.ssFallback && fr(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && r && eo(
    m,
    d.clone(m)
  ), m;
}
function wf(e = " ", t = 0) {
  return xn(Xi, null, e, t);
}
function ln(e) {
  return e == null || typeof e == "boolean" ? xn(cr) : Ie(e) ? xn(
    Ut,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ta(e) ? In(e) : xn(Xi, null, String(e));
}
function In(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : fr(e);
}
function so(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (Ie(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), so(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !ga(t) ? t._ctx = Kt : i === 3 && Kt && (Kt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Oe(t) ? (t = { default: t, _ctx: Kt }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [wf(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function yf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r)
      if (i === "class")
        t.class !== r.class && (t.class = Us([t.class, r.class]));
      else if (i === "style")
        t.style = qs([t.style, r.style]);
      else if (Fi(i)) {
        const a = t[i], c = r[i];
        c && a !== c && !(Ie(a) && a.includes(c)) && (t[i] = a ? [].concat(a, c) : c);
      } else i !== "" && (t[i] = r[i]);
  }
  return t;
}
function rn(e, t, n, r = null) {
  fn(e, t, 7, [
    n,
    r
  ]);
}
const bf = ha();
let vf = 0;
function _f(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || bf, a = {
    uid: vf++,
    vnode: e,
    type: r,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Vu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: wa(r, i),
    emitsOptions: Ma(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ze,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Ze,
    data: Ze,
    props: Ze,
    attrs: Ze,
    slots: Ze,
    refs: Ze,
    setupState: Ze,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = of.bind(null, a), e.ce && e.ce(a), a;
}
let St = null;
const xf = () => St || Kt;
let ki, ks;
{
  const e = Vi(), t = (n, r) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(r), (a) => {
      i.length > 1 ? i.forEach((c) => c(a)) : i[0](a);
    };
  };
  ki = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => St = n
  ), ks = t(
    "__VUE_SSR_SETTERS__",
    (n) => jr = n
  );
}
const Xr = (e) => {
  const t = St;
  return ki(e), e.scope.on(), () => {
    e.scope.off(), ki(t);
  };
}, zo = () => {
  St && St.scope.off(), ki(null);
};
function Ca(e) {
  return e.vnode.shapeFlag & 4;
}
let jr = !1;
function Sf(e, t = !1, n = !1) {
  t && ks(t);
  const { props: r, children: i } = e.vnode, a = Ca(e);
  Uc(e, r, a, t), Yc(e, i, n || t);
  const c = a ? Ef(e, t) : void 0;
  return t && ks(!1), c;
}
function Ef(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $c);
  const { setup: r } = n;
  if (r) {
    Sn();
    const i = e.setupContext = r.length > 1 ? kf(e) : null, a = Xr(e), c = Kr(
      r,
      e,
      0,
      [
        e.props,
        i
      ]
    ), f = Pl(c);
    if (En(), a(), (f || e.sp) && !Cr(e) && oa(e), f) {
      if (c.then(zo, zo), t)
        return c.then((d) => {
          Fo(e, d);
        }).catch((d) => {
          Ui(d, e, 0);
        });
      e.asyncDep = c;
    } else
      Fo(e, c);
  } else
    Ra(e);
}
function Fo(e, t, n) {
  Oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : tt(t) && (e.setupState = Hl(t)), Ra(e);
}
function Ra(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || un);
  {
    const i = Xr(e);
    Sn();
    try {
      zc(e);
    } finally {
      En(), i();
    }
  }
}
const Mf = {
  get(e, t) {
    return gt(e, "get", ""), e[t];
  }
};
function kf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Mf),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Yi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Hl(uc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Rr)
        return Rr[n](e);
    },
    has(t, n) {
      return n in t || n in Rr;
    }
  })) : e.proxy;
}
function Tf(e) {
  return Oe(e) && "__vccOpts" in e;
}
const Ts = (e, t) => pc(e, t, jr), Nf = "3.5.24";
let Ns;
const jo = typeof window < "u" && window.trustedTypes;
if (jo)
  try {
    Ns = /* @__PURE__ */ jo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const La = Ns ? (e) => Ns.createHTML(e) : (e) => e, Cf = "http://www.w3.org/2000/svg", Rf = "http://www.w3.org/1998/Math/MathML", yn = typeof document < "u" ? document : null, Bo = yn && /* @__PURE__ */ yn.createElement("template"), Lf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const i = t === "svg" ? yn.createElementNS(Cf, e) : t === "mathml" ? yn.createElementNS(Rf, e) : n ? yn.createElement(e, { is: n }) : yn.createElement(e);
    return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (e) => yn.createTextNode(e),
  createComment: (e) => yn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => yn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, i, a) {
    const c = n ? n.previousSibling : t.lastChild;
    if (i && (i === a || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)); )
        ;
    else {
      Bo.innerHTML = La(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const f = Bo.content;
      if (r === "svg" || r === "mathml") {
        const d = f.firstChild;
        for (; d.firstChild; )
          f.appendChild(d.firstChild);
        f.removeChild(d);
      }
      t.insertBefore(f, n);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Pf = Symbol("_vtc");
function If(e, t, n) {
  const r = e[Pf];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ti = Symbol("_vod"), Pa = Symbol("_vsh"), fi = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ti] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : yr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), yr(e, !0), r.enter(e)) : r.leave(e, () => {
      yr(e, !1);
    }) : yr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    yr(e, t);
  }
};
function yr(e, t) {
  e.style.display = t ? e[Ti] : "none", e[Pa] = !t;
}
const Af = Symbol(""), Of = /(?:^|;)\s*display\s*:/;
function $f(e, t, n) {
  const r = e.style, i = it(n);
  let a = !1;
  if (n && !i) {
    if (t)
      if (it(t))
        for (const c of t.split(";")) {
          const f = c.slice(0, c.indexOf(":")).trim();
          n[f] == null && hi(r, f, "");
        }
      else
        for (const c in t)
          n[c] == null && hi(r, c, "");
    for (const c in n)
      c === "display" && (a = !0), hi(r, c, n[c]);
  } else if (i) {
    if (t !== n) {
      const c = r[Af];
      c && (n += ";" + c), r.cssText = n, a = Of.test(n);
    }
  } else t && e.removeAttribute("style");
  Ti in e && (e[Ti] = a ? r.display : "", e[Pa] && (r.display = "none"));
}
const Do = /\s*!important$/;
function hi(e, t, n) {
  if (Ie(n))
    n.forEach((r) => hi(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = zf(e, t);
    Do.test(n) ? e.setProperty(
      Wt(r),
      n.replace(Do, ""),
      "important"
    ) : e[r] = n;
  }
}
const Vo = ["Webkit", "Moz", "ms"], us = {};
function zf(e, t) {
  const n = us[t];
  if (n)
    return n;
  let r = Ht(t);
  if (r !== "filter" && r in e)
    return us[t] = r;
  r = Al(r);
  for (let i = 0; i < Vo.length; i++) {
    const a = Vo[i] + r;
    if (a in e)
      return us[t] = a;
  }
  return t;
}
const Go = "http://www.w3.org/1999/xlink";
function qo(e, t, n, r, i, a = Du(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Go, t.slice(6, t.length)) : e.setAttributeNS(Go, t, n) : n == null || a && !$l(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    a ? "" : zn(n) ? String(n) : n
  );
}
function Uo(e, t, n, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? La(n) : n);
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    const f = a === "OPTION" ? e.getAttribute("value") || "" : e.value, d = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (f !== d || !("_value" in e)) && (e.value = d), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = $l(n) : n == null && f === "string" ? (n = "", c = !0) : f === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(i || t);
}
function Ff(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function jf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Wo = Symbol("_vei");
function Bf(e, t, n, r, i = null) {
  const a = e[Wo] || (e[Wo] = {}), c = a[t];
  if (r && c)
    c.value = r;
  else {
    const [f, d] = Df(t);
    if (r) {
      const p = a[t] = qf(
        r,
        i
      );
      Ff(e, f, p, d);
    } else c && (jf(e, f, c, d), a[t] = void 0);
  }
}
const Ko = /(?:Once|Passive|Capture)$/;
function Df(e) {
  let t;
  if (Ko.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Ko); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Wt(e.slice(2)), t];
}
let cs = 0;
const Vf = /* @__PURE__ */ Promise.resolve(), Gf = () => cs || (Vf.then(() => cs = 0), cs = Date.now());
function qf(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    fn(
      Uf(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = Gf(), n;
}
function Uf(e, t) {
  if (Ie(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (i) => !i._stopped && r && r(i)
    );
  } else
    return t;
}
const Xo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wf = (e, t, n, r, i, a) => {
  const c = i === "svg";
  t === "class" ? If(e, r, c) : t === "style" ? $f(e, n, r) : Fi(t) ? Ds(t) || Bf(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Kf(e, t, r, c)) ? (Uo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && qo(e, t, r, c, a, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !it(r)) ? Uo(e, Ht(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), qo(e, t, r, c));
};
function Kf(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Xo(t) && Oe(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Xo(t) && it(n) ? !1 : t in e;
}
const Yo = {};
// @__NO_SIDE_EFFECTS__
function Xf(e, t, n) {
  let r = /* @__PURE__ */ to(e, t);
  Bi(r) && (r = st({}, r, t));
  class i extends oo {
    constructor(c) {
      super(r, c, n);
    }
  }
  return i.def = r, i;
}
const Yf = typeof HTMLElement < "u" ? HTMLElement : class {
};
class oo extends Yf {
  constructor(t, n = {}, r = Jo) {
    super(), this._def = t, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== Jo ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      st({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof oo) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, ta(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const n of t)
      this._setAttr(n.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (r, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: a, styles: c } = r;
      let f;
      if (a && !Ie(a))
        for (const d in a) {
          const p = a[d];
          (p === Number || p && p.type === Number) && (d in this._props && (this._props[d] = vo(this._props[d])), (f || (f = /* @__PURE__ */ Object.create(null)))[Ht(d)] = !0);
        }
      this._numberProps = f, this._resolveProps(r), this.shadowRoot && this._applyStyles(c), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((r) => {
      r.configureApp = this._def.configureApp, t(this._def = r, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        qe(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => $r(n[r])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, r = Ie(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i]);
    for (const i of r.map(Ht))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(a) {
          this._setProp(i, a, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let r = n ? this.getAttribute(t) : Yo;
    const i = Ht(t);
    n && this._numberProps && this._numberProps[i] && (r = vo(r)), this._setProp(i, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, i = !1) {
    if (n !== this._props[t] && (this._dirty = !0, n === Yo ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), i && this._instance && this._update(), r)) {
      const a = this._ob;
      a && (this._processMutations(a.takeRecords()), a.disconnect()), n === !0 ? this.setAttribute(Wt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Wt(t), n + "") : n || this.removeAttribute(Wt(t)), a && a.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Jf(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = xn(this._def, st(t, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const i = (a, c) => {
        this.dispatchEvent(
          new CustomEvent(
            a,
            Bi(c[0]) ? st({ detail: c }, c[0]) : { detail: c }
          )
        );
      };
      r.emit = (a, ...c) => {
        i(a, c), Wt(a) !== a && i(Wt(a), c);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let i = t.length - 1; i >= 0; i--) {
      const a = document.createElement("style");
      r && a.setAttribute("nonce", r), a.textContent = t[i], this.shadowRoot.prepend(a);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[r] || (t[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), n = this._instance.type.__scopeId;
    for (let r = 0; r < t.length; r++) {
      const i = t[r], a = i.getAttribute("name") || "default", c = this._slots[a], f = i.parentNode;
      if (c)
        for (const d of c) {
          if (n && d.nodeType === 1) {
            const p = n + "-s", m = document.createTreeWalker(d, 1);
            d.setAttribute(p, "");
            let g;
            for (; g = m.nextNode(); )
              g.setAttribute(p, "");
          }
          f.insertBefore(d, i);
        }
      else
        for (; i.firstChild; ) f.insertBefore(i.firstChild, i);
      f.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    this._teleportTargets && t.push(...this._teleportTargets);
    const n = /* @__PURE__ */ new Set();
    for (const r of t) {
      const i = r.querySelectorAll("slot");
      for (let a = 0; a < i.length; a++)
        n.add(i[a]);
    }
    return Array.from(n);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const Qf = /* @__PURE__ */ st({ patchProp: Wf }, Lf);
let Qo;
function Ia() {
  return Qo || (Qo = Jc(Qf));
}
const Jf = ((...e) => {
  Ia().render(...e);
}), Jo = ((...e) => {
  const t = Ia().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const i = Hf(r);
    if (!i) return;
    const a = t._component;
    !Oe(a) && !a.render && !a.template && (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const c = n(i, !1, Zf(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), c;
  }, t;
});
function Zf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Hf(e) {
  return it(e) ? document.querySelector(e) : e;
}
const eh = { class: "graph-controller__controls-overview" }, th = { key: 0 }, nh = { key: 1 }, rh = { key: 0 }, ih = { key: 1 }, sh = /* @__PURE__ */ to({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean },
    platformType: {}
  },
  setup(e) {
    const t = e, n = [
      {
        action: "Create node",
        desktop: "Double-click",
        touch: "Double-tap"
      },
      {
        action: "Create link",
        desktop: "Right-click on node + hold + drag towards target",
        touch: "Hold + drag"
      },
      {
        action: "Delete node/link",
        desktop: "Right-click + hold",
        touch: "Touch + hold"
      },
      {
        action: "Move node",
        desktop: "Left-click + hold on node + drag",
        touch: "-"
      },
      {
        action: "Create/Update label",
        desktop: t.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        touch: t.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
      }
    ], r = [
      {
        action: "Pan",
        desktop: "Left-click on canvas + hold + drag",
        touch: "Multi-touch"
      },
      {
        action: "Zoom",
        desktop: "Mouse wheel",
        touch: "Multi-touch"
      }
    ], i = ["Action", "Controls"];
    let a = t.platformType === "mobile" || t.platformType === "tablet";
    return (c, f) => (Nn(), Cn("table", eh, [
      ai(jt("thead", null, [
        jt("tr", null, [
          jt("th", null, wn(i[0]), 1),
          jt("th", null, wn(i[1]), 1)
        ])
      ], 512), [
        [fi, t.showHeader]
      ]),
      jt("tbody", null, [
        (Nn(), Cn(Ut, null, To(n, (d) => ai(jt("tr", {
          key: d.action
        }, [
          jt("td", null, wn(d.action), 1),
          $r(a) ? (Nn(), Cn("td", th, wn(d.touch), 1)) : (Nn(), Cn("td", nh, wn(d.desktop), 1))
        ]), [
          [fi, t.showControlsGraph]
        ])), 64)),
        (Nn(), Cn(Ut, null, To(r, (d) => ai(jt("tr", {
          key: d.action
        }, [
          jt("td", null, wn(d.action), 1),
          $r(a) ? (Nn(), Cn("td", rh, wn(d.touch), 1)) : (Nn(), Cn("td", ih, wn(d.desktop), 1))
        ]), [
          [fi, t.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), oh = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, lh = /* @__PURE__ */ oh(sh, [["__scopeId", "data-v-8c3d818f"]]);
var ah = { value: () => {
} };
function Yr() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new di(n);
}
function di(e) {
  this._ = e;
}
function uh(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
di.prototype = Yr.prototype = {
  constructor: di,
  on: function(e, t) {
    var n = this._, r = uh(e + "", n), i, a = -1, c = r.length;
    if (arguments.length < 2) {
      for (; ++a < c; ) if ((i = (e = r[a]).type) && (i = ch(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < c; )
      if (i = (e = r[a]).type) n[i] = Zo(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = Zo(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new di(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
  }
};
function ch(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function Zo(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = ah, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Cs = "http://www.w3.org/1999/xhtml";
const Ho = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Cs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Qi(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Ho.hasOwnProperty(t) ? { space: Ho[t], local: e } : e;
}
function fh(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Cs && t.documentElement.namespaceURI === Cs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function hh(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Aa(e) {
  var t = Qi(e);
  return (t.local ? hh : fh)(t);
}
function dh() {
}
function lo(e) {
  return e == null ? dh : function() {
    return this.querySelector(e);
  };
}
function ph(e) {
  typeof e != "function" && (e = lo(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], c = a.length, f = r[i] = new Array(c), d, p, m = 0; m < c; ++m)
      (d = a[m]) && (p = e.call(d, d.__data__, m, a)) && ("__data__" in d && (p.__data__ = d.__data__), f[m] = p);
  return new Gt(r, this._parents);
}
function gh(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function mh() {
  return [];
}
function Oa(e) {
  return e == null ? mh : function() {
    return this.querySelectorAll(e);
  };
}
function wh(e) {
  return function() {
    return gh(e.apply(this, arguments));
  };
}
function yh(e) {
  typeof e == "function" ? e = wh(e) : e = Oa(e);
  for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
    for (var c = t[a], f = c.length, d, p = 0; p < f; ++p)
      (d = c[p]) && (r.push(e.call(d, d.__data__, p, c)), i.push(d));
  return new Gt(r, i);
}
function $a(e) {
  return function() {
    return this.matches(e);
  };
}
function za(e) {
  return function(t) {
    return t.matches(e);
  };
}
var bh = Array.prototype.find;
function vh(e) {
  return function() {
    return bh.call(this.children, e);
  };
}
function _h() {
  return this.firstElementChild;
}
function xh(e) {
  return this.select(e == null ? _h : vh(typeof e == "function" ? e : za(e)));
}
var Sh = Array.prototype.filter;
function Eh() {
  return Array.from(this.children);
}
function Mh(e) {
  return function() {
    return Sh.call(this.children, e);
  };
}
function kh(e) {
  return this.selectAll(e == null ? Eh : Mh(typeof e == "function" ? e : za(e)));
}
function Th(e) {
  typeof e != "function" && (e = $a(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], c = a.length, f = r[i] = [], d, p = 0; p < c; ++p)
      (d = a[p]) && e.call(d, d.__data__, p, a) && f.push(d);
  return new Gt(r, this._parents);
}
function Fa(e) {
  return new Array(e.length);
}
function Nh() {
  return new Gt(this._enter || this._groups.map(Fa), this._parents);
}
function Ni(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ni.prototype = {
  constructor: Ni,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Ch(e) {
  return function() {
    return e;
  };
}
function Rh(e, t, n, r, i, a) {
  for (var c = 0, f, d = t.length, p = a.length; c < p; ++c)
    (f = t[c]) ? (f.__data__ = a[c], r[c] = f) : n[c] = new Ni(e, a[c]);
  for (; c < d; ++c)
    (f = t[c]) && (i[c] = f);
}
function Lh(e, t, n, r, i, a, c) {
  var f, d, p = /* @__PURE__ */ new Map(), m = t.length, g = a.length, b = new Array(m), T;
  for (f = 0; f < m; ++f)
    (d = t[f]) && (b[f] = T = c.call(d, d.__data__, f, t) + "", p.has(T) ? i[f] = d : p.set(T, d));
  for (f = 0; f < g; ++f)
    T = c.call(e, a[f], f, a) + "", (d = p.get(T)) ? (r[f] = d, d.__data__ = a[f], p.delete(T)) : n[f] = new Ni(e, a[f]);
  for (f = 0; f < m; ++f)
    (d = t[f]) && p.get(b[f]) === d && (i[f] = d);
}
function Ph(e) {
  return e.__data__;
}
function Ih(e, t) {
  if (!arguments.length) return Array.from(this, Ph);
  var n = t ? Lh : Rh, r = this._parents, i = this._groups;
  typeof e != "function" && (e = Ch(e));
  for (var a = i.length, c = new Array(a), f = new Array(a), d = new Array(a), p = 0; p < a; ++p) {
    var m = r[p], g = i[p], b = g.length, T = Ah(e.call(m, m && m.__data__, p, r)), L = T.length, O = f[p] = new Array(L), z = c[p] = new Array(L), S = d[p] = new Array(b);
    n(m, g, O, z, S, T, t);
    for (var D = 0, U = 0, C, V; D < L; ++D)
      if (C = O[D]) {
        for (D >= U && (U = D + 1); !(V = z[U]) && ++U < L; ) ;
        C._next = V || null;
      }
  }
  return c = new Gt(c, r), c._enter = f, c._exit = d, c;
}
function Ah(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Oh() {
  return new Gt(this._exit || this._groups.map(Fa), this._parents);
}
function $h(e, t, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function zh(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, c = Math.min(i, a), f = new Array(i), d = 0; d < c; ++d)
    for (var p = n[d], m = r[d], g = p.length, b = f[d] = new Array(g), T, L = 0; L < g; ++L)
      (T = p[L] || m[L]) && (b[L] = T);
  for (; d < i; ++d)
    f[d] = n[d];
  return new Gt(f, this._parents);
}
function Fh() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, a = r[i], c; --i >= 0; )
      (c = r[i]) && (a && c.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(c, a), a = c);
  return this;
}
function jh(e) {
  e || (e = Bh);
  function t(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var c = n[a], f = c.length, d = i[a] = new Array(f), p, m = 0; m < f; ++m)
      (p = c[m]) && (d[m] = p);
    d.sort(t);
  }
  return new Gt(i, this._parents).order();
}
function Bh(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Dh() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Vh() {
  return Array.from(this);
}
function Gh() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
      var c = r[i];
      if (c) return c;
    }
  return null;
}
function qh() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Uh() {
  return !this.node();
}
function Wh(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], a = 0, c = i.length, f; a < c; ++a)
      (f = i[a]) && e.call(f, f.__data__, a, i);
  return this;
}
function Kh(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Xh(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yh(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Qh(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Jh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Zh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Hh(e, t) {
  var n = Qi(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Xh : Kh : typeof t == "function" ? n.local ? Zh : Jh : n.local ? Qh : Yh)(n, t));
}
function ja(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ed(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function td(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function nd(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function rd(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? ed : typeof t == "function" ? nd : td)(e, t, n ?? "")) : hr(this.node(), e);
}
function hr(e, t) {
  return e.style.getPropertyValue(t) || ja(e).getComputedStyle(e, null).getPropertyValue(t);
}
function id(e) {
  return function() {
    delete this[e];
  };
}
function sd(e, t) {
  return function() {
    this[e] = t;
  };
}
function od(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ld(e, t) {
  return arguments.length > 1 ? this.each((t == null ? id : typeof t == "function" ? od : sd)(e, t)) : this.node()[e];
}
function Ba(e) {
  return e.trim().split(/^|\s+/);
}
function ao(e) {
  return e.classList || new Da(e);
}
function Da(e) {
  this._node = e, this._names = Ba(e.getAttribute("class") || "");
}
Da.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Va(e, t) {
  for (var n = ao(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function Ga(e, t) {
  for (var n = ao(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function ad(e) {
  return function() {
    Va(this, e);
  };
}
function ud(e) {
  return function() {
    Ga(this, e);
  };
}
function cd(e, t) {
  return function() {
    (t.apply(this, arguments) ? Va : Ga)(this, e);
  };
}
function fd(e, t) {
  var n = Ba(e + "");
  if (arguments.length < 2) {
    for (var r = ao(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? cd : t ? ad : ud)(n, t));
}
function hd() {
  this.textContent = "";
}
function dd(e) {
  return function() {
    this.textContent = e;
  };
}
function pd(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function gd(e) {
  return arguments.length ? this.each(e == null ? hd : (typeof e == "function" ? pd : dd)(e)) : this.node().textContent;
}
function md() {
  this.innerHTML = "";
}
function wd(e) {
  return function() {
    this.innerHTML = e;
  };
}
function yd(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function bd(e) {
  return arguments.length ? this.each(e == null ? md : (typeof e == "function" ? yd : wd)(e)) : this.node().innerHTML;
}
function vd() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _d() {
  return this.each(vd);
}
function xd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sd() {
  return this.each(xd);
}
function Ed(e) {
  var t = typeof e == "function" ? e : Aa(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Md() {
  return null;
}
function kd(e, t) {
  var n = typeof e == "function" ? e : Aa(e), r = t == null ? Md : typeof t == "function" ? t : lo(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Td() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Nd() {
  return this.each(Td);
}
function Cd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Rd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ld(e) {
  return this.select(e ? Rd : Cd);
}
function Pd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Id(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ad(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function Od(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, a; n < i; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function $d(e, t, n) {
  return function() {
    var r = this.__on, i, a = Id(t);
    if (r) {
      for (var c = 0, f = r.length; c < f; ++c)
        if ((i = r[c]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), i = { type: e.type, name: e.name, value: t, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function zd(e, t, n) {
  var r = Ad(e + ""), i, a = r.length, c;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var d = 0, p = f.length, m; d < p; ++d)
        for (i = 0, m = f[d]; i < a; ++i)
          if ((c = r[i]).type === m.type && c.name === m.name)
            return m.value;
    }
    return;
  }
  for (f = t ? $d : Od, i = 0; i < a; ++i) this.each(f(r[i], t, n));
  return this;
}
function qa(e, t, n) {
  var r = ja(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Fd(e, t) {
  return function() {
    return qa(this, e, t);
  };
}
function jd(e, t) {
  return function() {
    return qa(this, e, t.apply(this, arguments));
  };
}
function Bd(e, t) {
  return this.each((typeof t == "function" ? jd : Fd)(e, t));
}
function* Dd() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length, c; i < a; ++i)
      (c = r[i]) && (yield c);
}
var Ua = [null];
function Gt(e, t) {
  this._groups = e, this._parents = t;
}
function Qr() {
  return new Gt([[document.documentElement]], Ua);
}
function Vd() {
  return this;
}
Gt.prototype = Qr.prototype = {
  constructor: Gt,
  select: ph,
  selectAll: yh,
  selectChild: xh,
  selectChildren: kh,
  filter: Th,
  data: Ih,
  enter: Nh,
  exit: Oh,
  join: $h,
  merge: zh,
  selection: Vd,
  order: Fh,
  sort: jh,
  call: Dh,
  nodes: Vh,
  node: Gh,
  size: qh,
  empty: Uh,
  each: Wh,
  attr: Hh,
  style: rd,
  property: ld,
  classed: fd,
  text: gd,
  html: bd,
  raise: _d,
  lower: Sd,
  append: Ed,
  insert: kd,
  remove: Nd,
  clone: Ld,
  datum: Pd,
  on: zd,
  dispatch: Bd,
  [Symbol.iterator]: Dd
};
function je(e) {
  return typeof e == "string" ? new Gt([[document.querySelector(e)]], [document.documentElement]) : new Gt([[e]], Ua);
}
function Wa(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function qt(e, t) {
  if (e = Wa(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
function Gd(e, t) {
  return e.target && (e = Wa(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => qt(n, t));
}
const qd = { passive: !1 }, Br = { capture: !0, passive: !1 };
function fs(e) {
  e.stopImmediatePropagation();
}
function ar(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ka(e) {
  var t = e.document.documentElement, n = je(e).on("dragstart.drag", ar, Br);
  "onselectstart" in t ? n.on("selectstart.drag", ar, Br) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Xa(e, t) {
  var n = e.document.documentElement, r = je(e).on("dragstart.drag", null);
  t && (r.on("click.drag", ar, Br), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ti = (e) => () => e;
function Rs(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: i,
  active: a,
  x: c,
  y: f,
  dx: d,
  dy: p,
  dispatch: m
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: a, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: f, enumerable: !0, configurable: !0 },
    dx: { value: d, enumerable: !0, configurable: !0 },
    dy: { value: p, enumerable: !0, configurable: !0 },
    _: { value: m }
  });
}
Rs.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Ud(e) {
  return !e.ctrlKey && !e.button;
}
function Wd() {
  return this.parentNode;
}
function Kd(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Xd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Yd() {
  var e = Ud, t = Wd, n = Kd, r = Xd, i = {}, a = Yr("start", "drag", "end"), c = 0, f, d, p, m, g = 0;
  function b(C) {
    C.on("mousedown.drag", T).filter(r).on("touchstart.drag", z).on("touchmove.drag", S, qd).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function T(C, V) {
    if (!(m || !e.call(this, C, V))) {
      var se = U(this, t.call(this, C, V), C, V, "mouse");
      se && (je(C.view).on("mousemove.drag", L, Br).on("mouseup.drag", O, Br), Ka(C.view), fs(C), p = !1, f = C.clientX, d = C.clientY, se("start", C));
    }
  }
  function L(C) {
    if (ar(C), !p) {
      var V = C.clientX - f, se = C.clientY - d;
      p = V * V + se * se > g;
    }
    i.mouse("drag", C);
  }
  function O(C) {
    je(C.view).on("mousemove.drag mouseup.drag", null), Xa(C.view, p), ar(C), i.mouse("end", C);
  }
  function z(C, V) {
    if (e.call(this, C, V)) {
      var se = C.changedTouches, oe = t.call(this, C, V), we = se.length, ke, ce;
      for (ke = 0; ke < we; ++ke)
        (ce = U(this, oe, C, V, se[ke].identifier, se[ke])) && (fs(C), ce("start", C, se[ke]));
    }
  }
  function S(C) {
    var V = C.changedTouches, se = V.length, oe, we;
    for (oe = 0; oe < se; ++oe)
      (we = i[V[oe].identifier]) && (ar(C), we("drag", C, V[oe]));
  }
  function D(C) {
    var V = C.changedTouches, se = V.length, oe, we;
    for (m && clearTimeout(m), m = setTimeout(function() {
      m = null;
    }, 500), oe = 0; oe < se; ++oe)
      (we = i[V[oe].identifier]) && (fs(C), we("end", C, V[oe]));
  }
  function U(C, V, se, oe, we, ke) {
    var ce = a.copy(), ve = qt(ke || se, V), Ae, de, $;
    if (($ = n.call(C, new Rs("beforestart", {
      sourceEvent: se,
      target: b,
      identifier: we,
      active: c,
      x: ve[0],
      y: ve[1],
      dx: 0,
      dy: 0,
      dispatch: ce
    }), oe)) != null)
      return Ae = $.x - ve[0] || 0, de = $.y - ve[1] || 0, function ae(X, ne, re) {
        var be = ve, Me;
        switch (X) {
          case "start":
            i[we] = ae, Me = c++;
            break;
          case "end":
            delete i[we], --c;
          // falls through
          case "drag":
            ve = qt(re || ne, V), Me = c;
            break;
        }
        ce.call(
          X,
          C,
          new Rs(X, {
            sourceEvent: ne,
            subject: $,
            target: b,
            identifier: we,
            active: Me,
            x: ve[0] + Ae,
            y: ve[1] + de,
            dx: ve[0] - be[0],
            dy: ve[1] - be[1],
            dispatch: ce
          }),
          oe
        );
      };
  }
  return b.filter = function(C) {
    return arguments.length ? (e = typeof C == "function" ? C : ti(!!C), b) : e;
  }, b.container = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : ti(C), b) : t;
  }, b.subject = function(C) {
    return arguments.length ? (n = typeof C == "function" ? C : ti(C), b) : n;
  }, b.touchable = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : ti(!!C), b) : r;
  }, b.on = function() {
    var C = a.on.apply(a, arguments);
    return C === a ? b : C;
  }, b.clickDistance = function(C) {
    return arguments.length ? (g = (C = +C) * C, b) : Math.sqrt(g);
  }, b;
}
function uo(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Ya(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function Jr() {
}
var Dr = 0.7, Ci = 1 / Dr, ur = "\\s*([+-]?\\d+)\\s*", Vr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", cn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Qd = /^#([0-9a-f]{3,8})$/, Jd = new RegExp(`^rgb\\(${ur},${ur},${ur}\\)$`), Zd = new RegExp(`^rgb\\(${cn},${cn},${cn}\\)$`), Hd = new RegExp(`^rgba\\(${ur},${ur},${ur},${Vr}\\)$`), ep = new RegExp(`^rgba\\(${cn},${cn},${cn},${Vr}\\)$`), tp = new RegExp(`^hsl\\(${Vr},${cn},${cn}\\)$`), np = new RegExp(`^hsla\\(${Vr},${cn},${cn},${Vr}\\)$`), el = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
uo(Jr, Yn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: tl,
  // Deprecated! Use color.formatHex.
  formatHex: tl,
  formatHex8: rp,
  formatHsl: ip,
  formatRgb: nl,
  toString: nl
});
function tl() {
  return this.rgb().formatHex();
}
function rp() {
  return this.rgb().formatHex8();
}
function ip() {
  return Qa(this).formatHsl();
}
function nl() {
  return this.rgb().formatRgb();
}
function Yn(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Qd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? rl(t) : n === 3 ? new At(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ni(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ni(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Jd.exec(e)) ? new At(t[1], t[2], t[3], 1) : (t = Zd.exec(e)) ? new At(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Hd.exec(e)) ? ni(t[1], t[2], t[3], t[4]) : (t = ep.exec(e)) ? ni(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = tp.exec(e)) ? ol(t[1], t[2] / 100, t[3] / 100, 1) : (t = np.exec(e)) ? ol(t[1], t[2] / 100, t[3] / 100, t[4]) : el.hasOwnProperty(e) ? rl(el[e]) : e === "transparent" ? new At(NaN, NaN, NaN, 0) : null;
}
function rl(e) {
  return new At(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ni(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new At(e, t, n, r);
}
function sp(e) {
  return e instanceof Jr || (e = Yn(e)), e ? (e = e.rgb(), new At(e.r, e.g, e.b, e.opacity)) : new At();
}
function Ls(e, t, n, r) {
  return arguments.length === 1 ? sp(e) : new At(e, t, n, r ?? 1);
}
function At(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
uo(At, Ls, Ya(Jr, {
  brighter(e) {
    return e = e == null ? Ci : Math.pow(Ci, e), new At(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Dr : Math.pow(Dr, e), new At(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new At(Xn(this.r), Xn(this.g), Xn(this.b), Ri(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: il,
  // Deprecated! Use color.formatHex.
  formatHex: il,
  formatHex8: op,
  formatRgb: sl,
  toString: sl
}));
function il() {
  return `#${Wn(this.r)}${Wn(this.g)}${Wn(this.b)}`;
}
function op() {
  return `#${Wn(this.r)}${Wn(this.g)}${Wn(this.b)}${Wn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function sl() {
  const e = Ri(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Xn(this.r)}, ${Xn(this.g)}, ${Xn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ri(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Xn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Wn(e) {
  return e = Xn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ol(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Zt(e, t, n, r);
}
function Qa(e) {
  if (e instanceof Zt) return new Zt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Jr || (e = Yn(e)), !e) return new Zt();
  if (e instanceof Zt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), c = NaN, f = a - i, d = (a + i) / 2;
  return f ? (t === a ? c = (n - r) / f + (n < r) * 6 : n === a ? c = (r - t) / f + 2 : c = (t - n) / f + 4, f /= d < 0.5 ? a + i : 2 - a - i, c *= 60) : f = d > 0 && d < 1 ? 0 : c, new Zt(c, f, d, e.opacity);
}
function lp(e, t, n, r) {
  return arguments.length === 1 ? Qa(e) : new Zt(e, t, n, r ?? 1);
}
function Zt(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
uo(Zt, lp, Ya(Jr, {
  brighter(e) {
    return e = e == null ? Ci : Math.pow(Ci, e), new Zt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Dr : Math.pow(Dr, e), new Zt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new At(
      hs(e >= 240 ? e - 240 : e + 120, i, r),
      hs(e, i, r),
      hs(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Zt(ll(this.h), ri(this.s), ri(this.l), Ri(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ri(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ll(this.h)}, ${ri(this.s) * 100}%, ${ri(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ll(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ri(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function hs(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const co = (e) => () => e;
function ap(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function up(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function cp(e) {
  return (e = +e) == 1 ? Ja : function(t, n) {
    return n - t ? up(t, n, e) : co(isNaN(t) ? n : t);
  };
}
function Ja(e, t) {
  var n = t - e;
  return n ? ap(e, n) : co(isNaN(e) ? t : e);
}
const Li = (function e(t) {
  var n = cp(t);
  function r(i, a) {
    var c = n((i = Ls(i)).r, (a = Ls(a)).r), f = n(i.g, a.g), d = n(i.b, a.b), p = Ja(i.opacity, a.opacity);
    return function(m) {
      return i.r = c(m), i.g = f(m), i.b = d(m), i.opacity = p(m), i + "";
    };
  }
  return r.gamma = e, r;
})(1);
function fp(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function hp(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dp(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = new Array(r), a = new Array(n), c;
  for (c = 0; c < r; ++c) i[c] = fo(e[c], t[c]);
  for (; c < n; ++c) a[c] = t[c];
  return function(f) {
    for (c = 0; c < r; ++c) a[c] = i[c](f);
    return a;
  };
}
function pp(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function an(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function gp(e, t) {
  var n = {}, r = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? n[i] = fo(e[i], t[i]) : r[i] = t[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var Ps = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ds = new RegExp(Ps.source, "g");
function mp(e) {
  return function() {
    return e;
  };
}
function wp(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Za(e, t) {
  var n = Ps.lastIndex = ds.lastIndex = 0, r, i, a, c = -1, f = [], d = [];
  for (e = e + "", t = t + ""; (r = Ps.exec(e)) && (i = ds.exec(t)); )
    (a = i.index) > n && (a = t.slice(n, a), f[c] ? f[c] += a : f[++c] = a), (r = r[0]) === (i = i[0]) ? f[c] ? f[c] += i : f[++c] = i : (f[++c] = null, d.push({ i: c, x: an(r, i) })), n = ds.lastIndex;
  return n < t.length && (a = t.slice(n), f[c] ? f[c] += a : f[++c] = a), f.length < 2 ? d[0] ? wp(d[0].x) : mp(t) : (t = d.length, function(p) {
    for (var m = 0, g; m < t; ++m) f[(g = d[m]).i] = g.x(p);
    return f.join("");
  });
}
function fo(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? co(t) : (n === "number" ? an : n === "string" ? (r = Yn(t)) ? (t = r, Li) : Za : t instanceof Yn ? Li : t instanceof Date ? pp : hp(t) ? fp : Array.isArray(t) ? dp : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? gp : an)(e, t);
}
var al = 180 / Math.PI, Is = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ha(e, t, n, r, i, a) {
  var c, f, d;
  return (c = Math.sqrt(e * e + t * t)) && (e /= c, t /= c), (d = e * n + t * r) && (n -= e * d, r -= t * d), (f = Math.sqrt(n * n + r * r)) && (n /= f, r /= f, d /= f), e * r < t * n && (e = -e, t = -t, d = -d, c = -c), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * al,
    skewX: Math.atan(d) * al,
    scaleX: c,
    scaleY: f
  };
}
var ii;
function yp(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Is : Ha(t.a, t.b, t.c, t.d, t.e, t.f);
}
function bp(e) {
  return e == null || (ii || (ii = document.createElementNS("http://www.w3.org/2000/svg", "g")), ii.setAttribute("transform", e), !(e = ii.transform.baseVal.consolidate())) ? Is : (e = e.matrix, Ha(e.a, e.b, e.c, e.d, e.e, e.f));
}
function eu(e, t, n, r) {
  function i(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, m, g, b, T, L) {
    if (p !== g || m !== b) {
      var O = T.push("translate(", null, t, null, n);
      L.push({ i: O - 4, x: an(p, g) }, { i: O - 2, x: an(m, b) });
    } else (g || b) && T.push("translate(" + g + t + b + n);
  }
  function c(p, m, g, b) {
    p !== m ? (p - m > 180 ? m += 360 : m - p > 180 && (p += 360), b.push({ i: g.push(i(g) + "rotate(", null, r) - 2, x: an(p, m) })) : m && g.push(i(g) + "rotate(" + m + r);
  }
  function f(p, m, g, b) {
    p !== m ? b.push({ i: g.push(i(g) + "skewX(", null, r) - 2, x: an(p, m) }) : m && g.push(i(g) + "skewX(" + m + r);
  }
  function d(p, m, g, b, T, L) {
    if (p !== g || m !== b) {
      var O = T.push(i(T) + "scale(", null, ",", null, ")");
      L.push({ i: O - 4, x: an(p, g) }, { i: O - 2, x: an(m, b) });
    } else (g !== 1 || b !== 1) && T.push(i(T) + "scale(" + g + "," + b + ")");
  }
  return function(p, m) {
    var g = [], b = [];
    return p = e(p), m = e(m), a(p.translateX, p.translateY, m.translateX, m.translateY, g, b), c(p.rotate, m.rotate, g, b), f(p.skewX, m.skewX, g, b), d(p.scaleX, p.scaleY, m.scaleX, m.scaleY, g, b), p = m = null, function(T) {
      for (var L = -1, O = b.length, z; ++L < O; ) g[(z = b[L]).i] = z.x(T);
      return g.join("");
    };
  };
}
var vp = eu(yp, "px, ", "px)", "deg)"), _p = eu(bp, ", ", ")", ")"), xp = 1e-12;
function ul(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Sp(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ep(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Mp = (function e(t, n, r) {
  function i(a, c) {
    var f = a[0], d = a[1], p = a[2], m = c[0], g = c[1], b = c[2], T = m - f, L = g - d, O = T * T + L * L, z, S;
    if (O < xp)
      S = Math.log(b / p) / t, z = function(oe) {
        return [
          f + oe * T,
          d + oe * L,
          p * Math.exp(t * oe * S)
        ];
      };
    else {
      var D = Math.sqrt(O), U = (b * b - p * p + r * O) / (2 * p * n * D), C = (b * b - p * p - r * O) / (2 * b * n * D), V = Math.log(Math.sqrt(U * U + 1) - U), se = Math.log(Math.sqrt(C * C + 1) - C);
      S = (se - V) / t, z = function(oe) {
        var we = oe * S, ke = ul(V), ce = p / (n * D) * (ke * Ep(t * we + V) - Sp(V));
        return [
          f + ce * T,
          d + ce * L,
          p * ke / ul(t * we + V)
        ];
      };
    }
    return z.duration = S * 1e3 * t / Math.SQRT2, z;
  }
  return i.rho = function(a) {
    var c = Math.max(1e-3, +a), f = c * c, d = f * f;
    return e(c, f, d);
  }, i;
})(Math.SQRT2, 2, 4);
var dr = 0, xr = 0, br = 0, tu = 1e3, Pi, Sr, Ii = 0, Qn = 0, Ji = 0, Gr = typeof performance == "object" && performance.now ? performance : Date, nu = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ho() {
  return Qn || (nu(kp), Qn = Gr.now() + Ji);
}
function kp() {
  Qn = 0;
}
function Ai() {
  this._call = this._time = this._next = null;
}
Ai.prototype = po.prototype = {
  constructor: Ai,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ho() : +n) + (t == null ? 0 : +t), !this._next && Sr !== this && (Sr ? Sr._next = this : Pi = this, Sr = this), this._call = e, this._time = n, As();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, As());
  }
};
function po(e, t, n) {
  var r = new Ai();
  return r.restart(e, t, n), r;
}
function Tp() {
  ho(), ++dr;
  for (var e = Pi, t; e; )
    (t = Qn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --dr;
}
function cl() {
  Qn = (Ii = Gr.now()) + Ji, dr = xr = 0;
  try {
    Tp();
  } finally {
    dr = 0, Cp(), Qn = 0;
  }
}
function Np() {
  var e = Gr.now(), t = e - Ii;
  t > tu && (Ji -= t, Ii = e);
}
function Cp() {
  for (var e, t = Pi, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Pi = n);
  Sr = e, As(r);
}
function As(e) {
  if (!dr) {
    xr && (xr = clearTimeout(xr));
    var t = e - Qn;
    t > 24 ? (e < 1 / 0 && (xr = setTimeout(cl, e - Gr.now() - Ji)), br && (br = clearInterval(br))) : (br || (Ii = Gr.now(), br = setInterval(Np, tu)), dr = 1, nu(cl));
  }
}
function fl(e, t, n) {
  var r = new Ai();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var Rp = Yr("start", "end", "cancel", "interrupt"), Lp = [], ru = 0, hl = 1, Os = 2, pi = 3, dl = 4, $s = 5, gi = 6;
function Zi(e, t, n, r, i, a) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (n in c) return;
  Pp(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Rp,
    tween: Lp,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ru
  });
}
function go(e, t) {
  var n = tn(e, t);
  if (n.state > ru) throw new Error("too late; already scheduled");
  return n;
}
function hn(e, t) {
  var n = tn(e, t);
  if (n.state > pi) throw new Error("too late; already running");
  return n;
}
function tn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Pp(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = po(a, 0, n.time);
  function a(p) {
    n.state = hl, n.timer.restart(c, n.delay, n.time), n.delay <= p && c(p - n.delay);
  }
  function c(p) {
    var m, g, b, T;
    if (n.state !== hl) return d();
    for (m in r)
      if (T = r[m], T.name === n.name) {
        if (T.state === pi) return fl(c);
        T.state === dl ? (T.state = gi, T.timer.stop(), T.on.call("interrupt", e, e.__data__, T.index, T.group), delete r[m]) : +m < t && (T.state = gi, T.timer.stop(), T.on.call("cancel", e, e.__data__, T.index, T.group), delete r[m]);
      }
    if (fl(function() {
      n.state === pi && (n.state = dl, n.timer.restart(f, n.delay, n.time), f(p));
    }), n.state = Os, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Os) {
      for (n.state = pi, i = new Array(b = n.tween.length), m = 0, g = -1; m < b; ++m)
        (T = n.tween[m].value.call(e, e.__data__, n.index, n.group)) && (i[++g] = T);
      i.length = g + 1;
    }
  }
  function f(p) {
    for (var m = p < n.duration ? n.ease.call(null, p / n.duration) : (n.timer.restart(d), n.state = $s, 1), g = -1, b = i.length; ++g < b; )
      i[g].call(e, m);
    n.state === $s && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = gi, n.timer.stop(), delete r[t];
    for (var p in r) return;
    delete e.__transition;
  }
}
function mi(e, t) {
  var n = e.__transition, r, i, a = !0, c;
  if (n) {
    t = t == null ? null : t + "";
    for (c in n) {
      if ((r = n[c]).name !== t) {
        a = !1;
        continue;
      }
      i = r.state > Os && r.state < $s, r.state = gi, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[c];
    }
    a && delete e.__transition;
  }
}
function Ip(e) {
  return this.each(function() {
    mi(this, e);
  });
}
function Ap(e, t) {
  var n, r;
  return function() {
    var i = hn(this, e), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var c = 0, f = r.length; c < f; ++c)
        if (r[c].name === t) {
          r = r.slice(), r.splice(c, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Op(e, t, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = hn(this, e), c = a.tween;
    if (c !== r) {
      i = (r = c).slice();
      for (var f = { name: t, value: n }, d = 0, p = i.length; d < p; ++d)
        if (i[d].name === t) {
          i[d] = f;
          break;
        }
      d === p && i.push(f);
    }
    a.tween = i;
  };
}
function $p(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = tn(this.node(), n).tween, i = 0, a = r.length, c; i < a; ++i)
      if ((c = r[i]).name === e)
        return c.value;
    return null;
  }
  return this.each((t == null ? Ap : Op)(n, e, t));
}
function mo(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = hn(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return tn(i, r).value[t];
  };
}
function iu(e, t) {
  var n;
  return (typeof t == "number" ? an : t instanceof Yn ? Li : (n = Yn(t)) ? (t = n, Li) : Za)(e, t);
}
function zp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Fp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function jp(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var c = this.getAttribute(e);
    return c === i ? null : c === r ? a : a = t(r = c, n);
  };
}
function Bp(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === i ? null : c === r ? a : a = t(r = c, n);
  };
}
function Dp(e, t, n) {
  var r, i, a;
  return function() {
    var c, f = n(this), d;
    return f == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), d = f + "", c === d ? null : c === r && d === i ? a : (i = d, a = t(r = c, f)));
  };
}
function Vp(e, t, n) {
  var r, i, a;
  return function() {
    var c, f = n(this), d;
    return f == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), d = f + "", c === d ? null : c === r && d === i ? a : (i = d, a = t(r = c, f)));
  };
}
function Gp(e, t) {
  var n = Qi(e), r = n === "transform" ? _p : iu;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Vp : Dp)(n, r, mo(this, "attr." + e, t)) : t == null ? (n.local ? Fp : zp)(n) : (n.local ? Bp : jp)(n, r, t));
}
function qp(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Up(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Wp(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && Up(e, a)), n;
  }
  return i._value = t, i;
}
function Kp(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && qp(e, a)), n;
  }
  return i._value = t, i;
}
function Xp(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Qi(e);
  return this.tween(n, (r.local ? Wp : Kp)(r, t));
}
function Yp(e, t) {
  return function() {
    go(this, e).delay = +t.apply(this, arguments);
  };
}
function Qp(e, t) {
  return t = +t, function() {
    go(this, e).delay = t;
  };
}
function Jp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Yp : Qp)(t, e)) : tn(this.node(), t).delay;
}
function Zp(e, t) {
  return function() {
    hn(this, e).duration = +t.apply(this, arguments);
  };
}
function Hp(e, t) {
  return t = +t, function() {
    hn(this, e).duration = t;
  };
}
function eg(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Zp : Hp)(t, e)) : tn(this.node(), t).duration;
}
function tg(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    hn(this, e).ease = t;
  };
}
function ng(e) {
  var t = this._id;
  return arguments.length ? this.each(tg(t, e)) : tn(this.node(), t).ease;
}
function rg(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    hn(this, e).ease = n;
  };
}
function ig(e) {
  if (typeof e != "function") throw new Error();
  return this.each(rg(this._id, e));
}
function sg(e) {
  typeof e != "function" && (e = $a(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], c = a.length, f = r[i] = [], d, p = 0; p < c; ++p)
      (d = a[p]) && e.call(d, d.__data__, p, a) && f.push(d);
  return new Mn(r, this._parents, this._name, this._id);
}
function og(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), c = new Array(r), f = 0; f < a; ++f)
    for (var d = t[f], p = n[f], m = d.length, g = c[f] = new Array(m), b, T = 0; T < m; ++T)
      (b = d[T] || p[T]) && (g[T] = b);
  for (; f < r; ++f)
    c[f] = t[f];
  return new Mn(c, this._parents, this._name, this._id);
}
function lg(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function ag(e, t, n) {
  var r, i, a = lg(t) ? go : hn;
  return function() {
    var c = a(this, e), f = c.on;
    f !== r && (i = (r = f).copy()).on(t, n), c.on = i;
  };
}
function ug(e, t) {
  var n = this._id;
  return arguments.length < 2 ? tn(this.node(), n).on.on(e) : this.each(ag(n, e, t));
}
function cg(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function fg() {
  return this.on("end.remove", cg(this._id));
}
function hg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = lo(e));
  for (var r = this._groups, i = r.length, a = new Array(i), c = 0; c < i; ++c)
    for (var f = r[c], d = f.length, p = a[c] = new Array(d), m, g, b = 0; b < d; ++b)
      (m = f[b]) && (g = e.call(m, m.__data__, b, f)) && ("__data__" in m && (g.__data__ = m.__data__), p[b] = g, Zi(p[b], t, n, b, p, tn(m, n)));
  return new Mn(a, this._parents, t, n);
}
function dg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Oa(e));
  for (var r = this._groups, i = r.length, a = [], c = [], f = 0; f < i; ++f)
    for (var d = r[f], p = d.length, m, g = 0; g < p; ++g)
      if (m = d[g]) {
        for (var b = e.call(m, m.__data__, g, d), T, L = tn(m, n), O = 0, z = b.length; O < z; ++O)
          (T = b[O]) && Zi(T, t, n, O, b, L);
        a.push(b), c.push(m);
      }
  return new Mn(a, c, t, n);
}
var pg = Qr.prototype.constructor;
function gg() {
  return new pg(this._groups, this._parents);
}
function mg(e, t) {
  var n, r, i;
  return function() {
    var a = hr(this, e), c = (this.style.removeProperty(e), hr(this, e));
    return a === c ? null : a === n && c === r ? i : i = t(n = a, r = c);
  };
}
function su(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function wg(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var c = hr(this, e);
    return c === i ? null : c === r ? a : a = t(r = c, n);
  };
}
function yg(e, t, n) {
  var r, i, a;
  return function() {
    var c = hr(this, e), f = n(this), d = f + "";
    return f == null && (d = f = (this.style.removeProperty(e), hr(this, e))), c === d ? null : c === r && d === i ? a : (i = d, a = t(r = c, f));
  };
}
function bg(e, t) {
  var n, r, i, a = "style." + t, c = "end." + a, f;
  return function() {
    var d = hn(this, e), p = d.on, m = d.value[a] == null ? f || (f = su(t)) : void 0;
    (p !== n || i !== m) && (r = (n = p).copy()).on(c, i = m), d.on = r;
  };
}
function vg(e, t, n) {
  var r = (e += "") == "transform" ? vp : iu;
  return t == null ? this.styleTween(e, mg(e, r)).on("end.style." + e, su(e)) : typeof t == "function" ? this.styleTween(e, yg(e, r, mo(this, "style." + e, t))).each(bg(this._id, e)) : this.styleTween(e, wg(e, r, t), n).on("end.style." + e, null);
}
function _g(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function xg(e, t, n) {
  var r, i;
  function a() {
    var c = t.apply(this, arguments);
    return c !== i && (r = (i = c) && _g(e, c, n)), r;
  }
  return a._value = t, a;
}
function Sg(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, xg(e, t, n ?? ""));
}
function Eg(e) {
  return function() {
    this.textContent = e;
  };
}
function Mg(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function kg(e) {
  return this.tween("text", typeof e == "function" ? Mg(mo(this, "text", e)) : Eg(e == null ? "" : e + ""));
}
function Tg(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ng(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && Tg(i)), t;
  }
  return r._value = e, r;
}
function Cg(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ng(e));
}
function Rg() {
  for (var e = this._name, t = this._id, n = ou(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var c = r[a], f = c.length, d, p = 0; p < f; ++p)
      if (d = c[p]) {
        var m = tn(d, t);
        Zi(d, e, n, p, c, {
          time: m.time + m.delay + m.duration,
          delay: 0,
          duration: m.duration,
          ease: m.ease
        });
      }
  return new Mn(r, this._parents, e, n);
}
function Lg() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(a, c) {
    var f = { value: c }, d = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var p = hn(this, r), m = p.on;
      m !== e && (t = (e = m).copy(), t._.cancel.push(f), t._.interrupt.push(f), t._.end.push(d)), p.on = t;
    }), i === 0 && a();
  });
}
var Pg = 0;
function Mn(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function ou() {
  return ++Pg;
}
var mn = Qr.prototype;
Mn.prototype = {
  constructor: Mn,
  select: hg,
  selectAll: dg,
  selectChild: mn.selectChild,
  selectChildren: mn.selectChildren,
  filter: sg,
  merge: og,
  selection: gg,
  transition: Rg,
  call: mn.call,
  nodes: mn.nodes,
  node: mn.node,
  size: mn.size,
  empty: mn.empty,
  each: mn.each,
  on: ug,
  attr: Gp,
  attrTween: Xp,
  style: vg,
  styleTween: Sg,
  text: kg,
  textTween: Cg,
  remove: fg,
  tween: $p,
  delay: Jp,
  duration: eg,
  ease: ng,
  easeVarying: ig,
  end: Lg,
  [Symbol.iterator]: mn[Symbol.iterator]
};
const pl = (e) => +e;
function Ig(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ag = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ig
};
function Og(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function $g(e) {
  var t, n;
  e instanceof Mn ? (t = e._id, e = e._name) : (t = ou(), (n = Ag).time = ho(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var c = r[a], f = c.length, d, p = 0; p < f; ++p)
      (d = c[p]) && Zi(d, e, t, p, c, n || Og(d, t));
  return new Mn(r, this._parents, e, t);
}
Qr.prototype.interrupt = Ip;
Qr.prototype.transition = $g;
const zs = Math.PI, Fs = 2 * zs, Un = 1e-6, zg = Fs - Un;
function lu(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Fg(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return lu;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class jg {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? lu : Fg(t);
  }
  moveTo(t, n) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${this._x1 = +t},${this._y1 = +n}`;
  }
  quadraticCurveTo(t, n, r, i) {
    this._append`Q${+t},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(t, n, r, i, a, c) {
    this._append`C${+t},${+n},${+r},${+i},${this._x1 = +a},${this._y1 = +c}`;
  }
  arcTo(t, n, r, i, a) {
    if (t = +t, n = +n, r = +r, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let c = this._x1, f = this._y1, d = r - t, p = i - n, m = c - t, g = f - n, b = m * m + g * g;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (b > Un) if (!(Math.abs(g * d - p * m) > Un) || !a)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let T = r - c, L = i - f, O = d * d + p * p, z = T * T + L * L, S = Math.sqrt(O), D = Math.sqrt(b), U = a * Math.tan((zs - Math.acos((O + b - z) / (2 * S * D))) / 2), C = U / D, V = U / S;
      Math.abs(C - 1) > Un && this._append`L${t + C * m},${n + C * g}`, this._append`A${a},${a},0,0,${+(g * T > m * L)},${this._x1 = t + V * d},${this._y1 = n + V * p}`;
    }
  }
  arc(t, n, r, i, a, c) {
    if (t = +t, n = +n, r = +r, c = !!c, r < 0) throw new Error(`negative radius: ${r}`);
    let f = r * Math.cos(i), d = r * Math.sin(i), p = t + f, m = n + d, g = 1 ^ c, b = c ? i - a : a - i;
    this._x1 === null ? this._append`M${p},${m}` : (Math.abs(this._x1 - p) > Un || Math.abs(this._y1 - m) > Un) && this._append`L${p},${m}`, r && (b < 0 && (b = b % Fs + Fs), b > zg ? this._append`A${r},${r},0,1,${g},${t - f},${n - d}A${r},${r},0,1,${g},${this._x1 = p},${this._y1 = m}` : b > Un && this._append`A${r},${r},0,${+(b >= zs)},${g},${this._x1 = t + r * Math.cos(a)},${this._y1 = n + r * Math.sin(a)}`);
  }
  rect(t, n, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Bg(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return au(this.cover(t, n), t, n, e);
}
function au(e, t, n, r) {
  if (isNaN(t) || isNaN(n)) return e;
  var i, a = e._root, c = { data: r }, f = e._x0, d = e._y0, p = e._x1, m = e._y1, g, b, T, L, O, z, S, D;
  if (!a) return e._root = c, e;
  for (; a.length; )
    if ((O = t >= (g = (f + p) / 2)) ? f = g : p = g, (z = n >= (b = (d + m) / 2)) ? d = b : m = b, i = a, !(a = a[S = z << 1 | O])) return i[S] = c, e;
  if (T = +e._x.call(null, a.data), L = +e._y.call(null, a.data), t === T && n === L) return c.next = a, i ? i[S] = c : e._root = c, e;
  do
    i = i ? i[S] = new Array(4) : e._root = new Array(4), (O = t >= (g = (f + p) / 2)) ? f = g : p = g, (z = n >= (b = (d + m) / 2)) ? d = b : m = b;
  while ((S = z << 1 | O) === (D = (L >= b) << 1 | T >= g));
  return i[D] = a, i[S] = c, e;
}
function Dg(e) {
  var t, n, r = e.length, i, a, c = new Array(r), f = new Array(r), d = 1 / 0, p = 1 / 0, m = -1 / 0, g = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(a = +this._y.call(null, t)) || (c[n] = i, f[n] = a, i < d && (d = i), i > m && (m = i), a < p && (p = a), a > g && (g = a));
  if (d > m || p > g) return this;
  for (this.cover(d, p).cover(m, g), n = 0; n < r; ++n)
    au(this, c[n], f[n], e[n]);
  return this;
}
function Vg(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, r = this._y0, i = this._x1, a = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(e)) + 1, a = (r = Math.floor(t)) + 1;
  else {
    for (var c = i - n || 1, f = this._root, d, p; n > e || e >= i || r > t || t >= a; )
      switch (p = (t < r) << 1 | e < n, d = new Array(4), d[p] = f, f = d, c *= 2, p) {
        case 0:
          i = n + c, a = r + c;
          break;
        case 1:
          n = i - c, a = r + c;
          break;
        case 2:
          i = n + c, r = a - c;
          break;
        case 3:
          n = i - c, r = a - c;
          break;
      }
    this._root && this._root.length && (this._root = f);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this;
}
function Gg() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function qg(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Et(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Ug(e, t, n) {
  var r, i = this._x0, a = this._y0, c, f, d, p, m = this._x1, g = this._y1, b = [], T = this._root, L, O;
  for (T && b.push(new Et(T, i, a, m, g)), n == null ? n = 1 / 0 : (i = e - n, a = t - n, m = e + n, g = t + n, n *= n); L = b.pop(); )
    if (!(!(T = L.node) || (c = L.x0) > m || (f = L.y0) > g || (d = L.x1) < i || (p = L.y1) < a))
      if (T.length) {
        var z = (c + d) / 2, S = (f + p) / 2;
        b.push(
          new Et(T[3], z, S, d, p),
          new Et(T[2], c, S, z, p),
          new Et(T[1], z, f, d, S),
          new Et(T[0], c, f, z, S)
        ), (O = (t >= S) << 1 | e >= z) && (L = b[b.length - 1], b[b.length - 1] = b[b.length - 1 - O], b[b.length - 1 - O] = L);
      } else {
        var D = e - +this._x.call(null, T.data), U = t - +this._y.call(null, T.data), C = D * D + U * U;
        if (C < n) {
          var V = Math.sqrt(n = C);
          i = e - V, a = t - V, m = e + V, g = t + V, r = T.data;
        }
      }
  return r;
}
function Wg(e) {
  if (isNaN(m = +this._x.call(null, e)) || isNaN(g = +this._y.call(null, e))) return this;
  var t, n = this._root, r, i, a, c = this._x0, f = this._y0, d = this._x1, p = this._y1, m, g, b, T, L, O, z, S;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((L = m >= (b = (c + d) / 2)) ? c = b : d = b, (O = g >= (T = (f + p) / 2)) ? f = T : p = T, t = n, !(n = n[z = O << 1 | L])) return this;
    if (!n.length) break;
    (t[z + 1 & 3] || t[z + 2 & 3] || t[z + 3 & 3]) && (r = t, S = z);
  }
  for (; n.data !== e; ) if (i = n, !(n = n.next)) return this;
  return (a = n.next) && delete n.next, i ? (a ? i.next = a : delete i.next, this) : t ? (a ? t[z] = a : delete t[z], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[S] = n : this._root = n), this) : (this._root = a, this);
}
function Kg(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Xg() {
  return this._root;
}
function Yg() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Qg(e) {
  var t = [], n, r = this._root, i, a, c, f, d;
  for (r && t.push(new Et(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, a = n.x0, c = n.y0, f = n.x1, d = n.y1) && r.length) {
      var p = (a + f) / 2, m = (c + d) / 2;
      (i = r[3]) && t.push(new Et(i, p, m, f, d)), (i = r[2]) && t.push(new Et(i, a, m, p, d)), (i = r[1]) && t.push(new Et(i, p, c, f, m)), (i = r[0]) && t.push(new Et(i, a, c, p, m));
    }
  return this;
}
function Jg(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Et(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var a, c = r.x0, f = r.y0, d = r.x1, p = r.y1, m = (c + d) / 2, g = (f + p) / 2;
      (a = i[0]) && t.push(new Et(a, c, f, m, g)), (a = i[1]) && t.push(new Et(a, m, f, d, g)), (a = i[2]) && t.push(new Et(a, c, g, m, p)), (a = i[3]) && t.push(new Et(a, m, g, d, p));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Zg(e) {
  return e[0];
}
function Hg(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function e0(e) {
  return e[1];
}
function t0(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function wo(e, t, n) {
  var r = new yo(t ?? Zg, n ?? e0, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function yo(e, t, n, r, i, a) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this._root = void 0;
}
function gl(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Tt = wo.prototype = yo.prototype;
Tt.copy = function() {
  var e = new yo(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t) return e;
  if (!t.length) return e._root = gl(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = gl(r));
  return e;
};
Tt.add = Bg;
Tt.addAll = Dg;
Tt.cover = Vg;
Tt.data = Gg;
Tt.extent = qg;
Tt.find = Ug;
Tt.remove = Wg;
Tt.removeAll = Kg;
Tt.root = Xg;
Tt.size = Yg;
Tt.visit = Qg;
Tt.visitAfter = Jg;
Tt.x = Hg;
Tt.y = t0;
function kt(e) {
  return function() {
    return e;
  };
}
function An(e) {
  return (e() - 0.5) * 1e-6;
}
function n0(e) {
  return e.x + e.vx;
}
function r0(e) {
  return e.y + e.vy;
}
function i0(e) {
  var t, n, r, i = 1, a = 1;
  typeof e != "function" && (e = kt(e == null ? 1 : +e));
  function c() {
    for (var p, m = t.length, g, b, T, L, O, z, S = 0; S < a; ++S)
      for (g = wo(t, n0, r0).visitAfter(f), p = 0; p < m; ++p)
        b = t[p], O = n[b.index], z = O * O, T = b.x + b.vx, L = b.y + b.vy, g.visit(D);
    function D(U, C, V, se, oe) {
      var we = U.data, ke = U.r, ce = O + ke;
      if (we) {
        if (we.index > b.index) {
          var ve = T - we.x - we.vx, Ae = L - we.y - we.vy, de = ve * ve + Ae * Ae;
          de < ce * ce && (ve === 0 && (ve = An(r), de += ve * ve), Ae === 0 && (Ae = An(r), de += Ae * Ae), de = (ce - (de = Math.sqrt(de))) / de * i, b.vx += (ve *= de) * (ce = (ke *= ke) / (z + ke)), b.vy += (Ae *= de) * ce, we.vx -= ve * (ce = 1 - ce), we.vy -= Ae * ce);
        }
        return;
      }
      return C > T + ce || se < T - ce || V > L + ce || oe < L - ce;
    }
  }
  function f(p) {
    if (p.data) return p.r = n[p.data.index];
    for (var m = p.r = 0; m < 4; ++m)
      p[m] && p[m].r > p.r && (p.r = p[m].r);
  }
  function d() {
    if (t) {
      var p, m = t.length, g;
      for (n = new Array(m), p = 0; p < m; ++p) g = t[p], n[g.index] = +e(g, p, t);
    }
  }
  return c.initialize = function(p, m) {
    t = p, r = m, d();
  }, c.iterations = function(p) {
    return arguments.length ? (a = +p, c) : a;
  }, c.strength = function(p) {
    return arguments.length ? (i = +p, c) : i;
  }, c.radius = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : kt(+p), d(), c) : e;
  }, c;
}
function s0(e) {
  return e.index;
}
function ml(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function o0(e) {
  var t = s0, n = g, r, i = kt(30), a, c, f, d, p, m = 1;
  e == null && (e = []);
  function g(z) {
    return 1 / Math.min(f[z.source.index], f[z.target.index]);
  }
  function b(z) {
    for (var S = 0, D = e.length; S < m; ++S)
      for (var U = 0, C, V, se, oe, we, ke, ce; U < D; ++U)
        C = e[U], V = C.source, se = C.target, oe = se.x + se.vx - V.x - V.vx || An(p), we = se.y + se.vy - V.y - V.vy || An(p), ke = Math.sqrt(oe * oe + we * we), ke = (ke - a[U]) / ke * z * r[U], oe *= ke, we *= ke, se.vx -= oe * (ce = d[U]), se.vy -= we * ce, V.vx += oe * (ce = 1 - ce), V.vy += we * ce;
  }
  function T() {
    if (c) {
      var z, S = c.length, D = e.length, U = new Map(c.map((V, se) => [t(V, se, c), V])), C;
      for (z = 0, f = new Array(S); z < D; ++z)
        C = e[z], C.index = z, typeof C.source != "object" && (C.source = ml(U, C.source)), typeof C.target != "object" && (C.target = ml(U, C.target)), f[C.source.index] = (f[C.source.index] || 0) + 1, f[C.target.index] = (f[C.target.index] || 0) + 1;
      for (z = 0, d = new Array(D); z < D; ++z)
        C = e[z], d[z] = f[C.source.index] / (f[C.source.index] + f[C.target.index]);
      r = new Array(D), L(), a = new Array(D), O();
    }
  }
  function L() {
    if (c)
      for (var z = 0, S = e.length; z < S; ++z)
        r[z] = +n(e[z], z, e);
  }
  function O() {
    if (c)
      for (var z = 0, S = e.length; z < S; ++z)
        a[z] = +i(e[z], z, e);
  }
  return b.initialize = function(z, S) {
    c = z, p = S, T();
  }, b.links = function(z) {
    return arguments.length ? (e = z, T(), b) : e;
  }, b.id = function(z) {
    return arguments.length ? (t = z, b) : t;
  }, b.iterations = function(z) {
    return arguments.length ? (m = +z, b) : m;
  }, b.strength = function(z) {
    return arguments.length ? (n = typeof z == "function" ? z : kt(+z), L(), b) : n;
  }, b.distance = function(z) {
    return arguments.length ? (i = typeof z == "function" ? z : kt(+z), O(), b) : i;
  }, b;
}
const l0 = 1664525, a0 = 1013904223, wl = 4294967296;
function u0() {
  let e = 1;
  return () => (e = (l0 * e + a0) % wl) / wl;
}
function c0(e) {
  return e.x;
}
function f0(e) {
  return e.y;
}
var h0 = 10, d0 = Math.PI * (3 - Math.sqrt(5));
function p0(e) {
  var t, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), a = 0, c = 0.6, f = /* @__PURE__ */ new Map(), d = po(g), p = Yr("tick", "end"), m = u0();
  e == null && (e = []);
  function g() {
    b(), p.call("tick", t), n < r && (d.stop(), p.call("end", t));
  }
  function b(O) {
    var z, S = e.length, D;
    O === void 0 && (O = 1);
    for (var U = 0; U < O; ++U)
      for (n += (a - n) * i, f.forEach(function(C) {
        C(n);
      }), z = 0; z < S; ++z)
        D = e[z], D.fx == null ? D.x += D.vx *= c : (D.x = D.fx, D.vx = 0), D.fy == null ? D.y += D.vy *= c : (D.y = D.fy, D.vy = 0);
    return t;
  }
  function T() {
    for (var O = 0, z = e.length, S; O < z; ++O) {
      if (S = e[O], S.index = O, S.fx != null && (S.x = S.fx), S.fy != null && (S.y = S.fy), isNaN(S.x) || isNaN(S.y)) {
        var D = h0 * Math.sqrt(0.5 + O), U = O * d0;
        S.x = D * Math.cos(U), S.y = D * Math.sin(U);
      }
      (isNaN(S.vx) || isNaN(S.vy)) && (S.vx = S.vy = 0);
    }
  }
  function L(O) {
    return O.initialize && O.initialize(e, m), O;
  }
  return T(), t = {
    tick: b,
    restart: function() {
      return d.restart(g), t;
    },
    stop: function() {
      return d.stop(), t;
    },
    nodes: function(O) {
      return arguments.length ? (e = O, T(), f.forEach(L), t) : e;
    },
    alpha: function(O) {
      return arguments.length ? (n = +O, t) : n;
    },
    alphaMin: function(O) {
      return arguments.length ? (r = +O, t) : r;
    },
    alphaDecay: function(O) {
      return arguments.length ? (i = +O, t) : +i;
    },
    alphaTarget: function(O) {
      return arguments.length ? (a = +O, t) : a;
    },
    velocityDecay: function(O) {
      return arguments.length ? (c = 1 - O, t) : 1 - c;
    },
    randomSource: function(O) {
      return arguments.length ? (m = O, f.forEach(L), t) : m;
    },
    force: function(O, z) {
      return arguments.length > 1 ? (z == null ? f.delete(O) : f.set(O, L(z)), t) : f.get(O);
    },
    find: function(O, z, S) {
      var D = 0, U = e.length, C, V, se, oe, we;
      for (S == null ? S = 1 / 0 : S *= S, D = 0; D < U; ++D)
        oe = e[D], C = O - oe.x, V = z - oe.y, se = C * C + V * V, se < S && (we = oe, S = se);
      return we;
    },
    on: function(O, z) {
      return arguments.length > 1 ? (p.on(O, z), t) : p.on(O);
    }
  };
}
function g0() {
  var e, t, n, r, i = kt(-30), a, c = 1, f = 1 / 0, d = 0.81;
  function p(T) {
    var L, O = e.length, z = wo(e, c0, f0).visitAfter(g);
    for (r = T, L = 0; L < O; ++L) t = e[L], z.visit(b);
  }
  function m() {
    if (e) {
      var T, L = e.length, O;
      for (a = new Array(L), T = 0; T < L; ++T) O = e[T], a[O.index] = +i(O, T, e);
    }
  }
  function g(T) {
    var L = 0, O, z, S = 0, D, U, C;
    if (T.length) {
      for (D = U = C = 0; C < 4; ++C)
        (O = T[C]) && (z = Math.abs(O.value)) && (L += O.value, S += z, D += z * O.x, U += z * O.y);
      T.x = D / S, T.y = U / S;
    } else {
      O = T, O.x = O.data.x, O.y = O.data.y;
      do
        L += a[O.data.index];
      while (O = O.next);
    }
    T.value = L;
  }
  function b(T, L, O, z) {
    if (!T.value) return !0;
    var S = T.x - t.x, D = T.y - t.y, U = z - L, C = S * S + D * D;
    if (U * U / d < C)
      return C < f && (S === 0 && (S = An(n), C += S * S), D === 0 && (D = An(n), C += D * D), C < c && (C = Math.sqrt(c * C)), t.vx += S * T.value * r / C, t.vy += D * T.value * r / C), !0;
    if (T.length || C >= f) return;
    (T.data !== t || T.next) && (S === 0 && (S = An(n), C += S * S), D === 0 && (D = An(n), C += D * D), C < c && (C = Math.sqrt(c * C)));
    do
      T.data !== t && (U = a[T.data.index] * r / C, t.vx += S * U, t.vy += D * U);
    while (T = T.next);
  }
  return p.initialize = function(T, L) {
    e = T, n = L, m();
  }, p.strength = function(T) {
    return arguments.length ? (i = typeof T == "function" ? T : kt(+T), m(), p) : i;
  }, p.distanceMin = function(T) {
    return arguments.length ? (c = T * T, p) : Math.sqrt(c);
  }, p.distanceMax = function(T) {
    return arguments.length ? (f = T * T, p) : Math.sqrt(f);
  }, p.theta = function(T) {
    return arguments.length ? (d = T * T, p) : Math.sqrt(d);
  }, p;
}
function m0(e) {
  var t = kt(0.1), n, r, i;
  typeof e != "function" && (e = kt(e == null ? 0 : +e));
  function a(f) {
    for (var d = 0, p = n.length, m; d < p; ++d)
      m = n[d], m.vx += (i[d] - m.x) * r[d] * f;
  }
  function c() {
    if (n) {
      var f, d = n.length;
      for (r = new Array(d), i = new Array(d), f = 0; f < d; ++f)
        r[f] = isNaN(i[f] = +e(n[f], f, n)) ? 0 : +t(n[f], f, n);
    }
  }
  return a.initialize = function(f) {
    n = f, c();
  }, a.strength = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : kt(+f), c(), a) : t;
  }, a.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : kt(+f), c(), a) : e;
  }, a;
}
function w0(e) {
  var t = kt(0.1), n, r, i;
  typeof e != "function" && (e = kt(e == null ? 0 : +e));
  function a(f) {
    for (var d = 0, p = n.length, m; d < p; ++d)
      m = n[d], m.vy += (i[d] - m.y) * r[d] * f;
  }
  function c() {
    if (n) {
      var f, d = n.length;
      for (r = new Array(d), i = new Array(d), f = 0; f < d; ++f)
        r[f] = isNaN(i[f] = +e(n[f], f, n)) ? 0 : +t(n[f], f, n);
    }
  }
  return a.initialize = function(f) {
    n = f, c();
  }, a.strength = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : kt(+f), c(), a) : t;
  }, a.y = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : kt(+f), c(), a) : e;
  }, a;
}
function It(e) {
  return function() {
    return e;
  };
}
const yl = Math.abs, pt = Math.atan2, Vn = Math.cos, y0 = Math.max, ps = Math.min, sn = Math.sin, er = Math.sqrt, Lt = 1e-12, qr = Math.PI, Oi = qr / 2, b0 = 2 * qr;
function v0(e) {
  return e > 1 ? 0 : e < -1 ? qr : Math.acos(e);
}
function bl(e) {
  return e >= 1 ? Oi : e <= -1 ? -Oi : Math.asin(e);
}
function uu(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = r;
    }
    return e;
  }, () => new jg(t);
}
function _0(e) {
  return e.innerRadius;
}
function x0(e) {
  return e.outerRadius;
}
function S0(e) {
  return e.startAngle;
}
function E0(e) {
  return e.endAngle;
}
function M0(e) {
  return e && e.padAngle;
}
function k0(e, t, n, r, i, a, c, f) {
  var d = n - e, p = r - t, m = c - i, g = f - a, b = g * d - m * p;
  if (!(b * b < Lt))
    return b = (m * (t - a) - g * (e - i)) / b, [e + b * d, t + b * p];
}
function si(e, t, n, r, i, a, c) {
  var f = e - n, d = t - r, p = (c ? a : -a) / er(f * f + d * d), m = p * d, g = -p * f, b = e + m, T = t + g, L = n + m, O = r + g, z = (b + L) / 2, S = (T + O) / 2, D = L - b, U = O - T, C = D * D + U * U, V = i - a, se = b * O - L * T, oe = (U < 0 ? -1 : 1) * er(y0(0, V * V * C - se * se)), we = (se * U - D * oe) / C, ke = (-se * D - U * oe) / C, ce = (se * U + D * oe) / C, ve = (-se * D + U * oe) / C, Ae = we - z, de = ke - S, $ = ce - z, ae = ve - S;
  return Ae * Ae + de * de > $ * $ + ae * ae && (we = ce, ke = ve), {
    cx: we,
    cy: ke,
    x01: -m,
    y01: -g,
    x11: we * (i / V - 1),
    y11: ke * (i / V - 1)
  };
}
function T0() {
  var e = _0, t = x0, n = It(0), r = null, i = S0, a = E0, c = M0, f = null, d = uu(p);
  function p() {
    var m, g, b = +e.apply(this, arguments), T = +t.apply(this, arguments), L = i.apply(this, arguments) - Oi, O = a.apply(this, arguments) - Oi, z = yl(O - L), S = O > L;
    if (f || (f = m = d()), T < b && (g = T, T = b, b = g), !(T > Lt)) f.moveTo(0, 0);
    else if (z > b0 - Lt)
      f.moveTo(T * Vn(L), T * sn(L)), f.arc(0, 0, T, L, O, !S), b > Lt && (f.moveTo(b * Vn(O), b * sn(O)), f.arc(0, 0, b, O, L, S));
    else {
      var D = L, U = O, C = L, V = O, se = z, oe = z, we = c.apply(this, arguments) / 2, ke = we > Lt && (r ? +r.apply(this, arguments) : er(b * b + T * T)), ce = ps(yl(T - b) / 2, +n.apply(this, arguments)), ve = ce, Ae = ce, de, $;
      if (ke > Lt) {
        var ae = bl(ke / b * sn(we)), X = bl(ke / T * sn(we));
        (se -= ae * 2) > Lt ? (ae *= S ? 1 : -1, C += ae, V -= ae) : (se = 0, C = V = (L + O) / 2), (oe -= X * 2) > Lt ? (X *= S ? 1 : -1, D += X, U -= X) : (oe = 0, D = U = (L + O) / 2);
      }
      var ne = T * Vn(D), re = T * sn(D), be = b * Vn(V), Me = b * sn(V);
      if (ce > Lt) {
        var Le = T * Vn(U), fe = T * sn(U), Qe = b * Vn(C), Ue = b * sn(C), Z;
        if (z < qr)
          if (Z = k0(ne, re, Qe, Ue, Le, fe, be, Me)) {
            var De = ne - Z[0], We = re - Z[1], Be = Le - Z[0], ot = fe - Z[1], wt = 1 / sn(v0((De * Be + We * ot) / (er(De * De + We * We) * er(Be * Be + ot * ot))) / 2), Yt = er(Z[0] * Z[0] + Z[1] * Z[1]);
            ve = ps(ce, (b - Yt) / (wt - 1)), Ae = ps(ce, (T - Yt) / (wt + 1));
          } else
            ve = Ae = 0;
      }
      oe > Lt ? Ae > Lt ? (de = si(Qe, Ue, ne, re, T, Ae, S), $ = si(Le, fe, be, Me, T, Ae, S), f.moveTo(de.cx + de.x01, de.cy + de.y01), Ae < ce ? f.arc(de.cx, de.cy, Ae, pt(de.y01, de.x01), pt($.y01, $.x01), !S) : (f.arc(de.cx, de.cy, Ae, pt(de.y01, de.x01), pt(de.y11, de.x11), !S), f.arc(0, 0, T, pt(de.cy + de.y11, de.cx + de.x11), pt($.cy + $.y11, $.cx + $.x11), !S), f.arc($.cx, $.cy, Ae, pt($.y11, $.x11), pt($.y01, $.x01), !S))) : (f.moveTo(ne, re), f.arc(0, 0, T, D, U, !S)) : f.moveTo(ne, re), !(b > Lt) || !(se > Lt) ? f.lineTo(be, Me) : ve > Lt ? (de = si(be, Me, Le, fe, b, -ve, S), $ = si(ne, re, Qe, Ue, b, -ve, S), f.lineTo(de.cx + de.x01, de.cy + de.y01), ve < ce ? f.arc(de.cx, de.cy, ve, pt(de.y01, de.x01), pt($.y01, $.x01), !S) : (f.arc(de.cx, de.cy, ve, pt(de.y01, de.x01), pt(de.y11, de.x11), !S), f.arc(0, 0, b, pt(de.cy + de.y11, de.cx + de.x11), pt($.cy + $.y11, $.cx + $.x11), S), f.arc($.cx, $.cy, ve, pt($.y11, $.x11), pt($.y01, $.x01), !S))) : f.arc(0, 0, b, V, C, S);
    }
    if (f.closePath(), m) return f = null, m + "" || null;
  }
  return p.centroid = function() {
    var m = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, g = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - qr / 2;
    return [Vn(g) * m, sn(g) * m];
  }, p.innerRadius = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : It(+m), p) : e;
  }, p.outerRadius = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : It(+m), p) : t;
  }, p.cornerRadius = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : It(+m), p) : n;
  }, p.padRadius = function(m) {
    return arguments.length ? (r = m == null ? null : typeof m == "function" ? m : It(+m), p) : r;
  }, p.startAngle = function(m) {
    return arguments.length ? (i = typeof m == "function" ? m : It(+m), p) : i;
  }, p.endAngle = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : It(+m), p) : a;
  }, p.padAngle = function(m) {
    return arguments.length ? (c = typeof m == "function" ? m : It(+m), p) : c;
  }, p.context = function(m) {
    return arguments.length ? (f = m ?? null, p) : f;
  }, p;
}
function N0(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function cu(e) {
  this._context = e;
}
cu.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function C0(e) {
  return new cu(e);
}
function R0(e) {
  return e[0];
}
function L0(e) {
  return e[1];
}
function P0(e, t) {
  var n = It(!0), r = null, i = C0, a = null, c = uu(f);
  e = typeof e == "function" ? e : e === void 0 ? R0 : It(e), t = typeof t == "function" ? t : t === void 0 ? L0 : It(t);
  function f(d) {
    var p, m = (d = N0(d)).length, g, b = !1, T;
    for (r == null && (a = i(T = c())), p = 0; p <= m; ++p)
      !(p < m && n(g = d[p], p, d)) === b && ((b = !b) ? a.lineStart() : a.lineEnd()), b && a.point(+e(g, p, d), +t(g, p, d));
    if (T) return a = null, T + "" || null;
  }
  return f.x = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : It(+d), f) : e;
  }, f.y = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : It(+d), f) : t;
  }, f.defined = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : It(!!d), f) : n;
  }, f.curve = function(d) {
    return arguments.length ? (i = d, r != null && (a = i(r)), f) : i;
  }, f.context = function(d) {
    return arguments.length ? (d == null ? r = a = null : a = i(r = d), f) : r;
  }, f;
}
const oi = (e) => () => e;
function I0(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function _n(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
_n.prototype = {
  constructor: _n,
  scale: function(e) {
    return e === 1 ? this : new _n(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new _n(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var fu = new _n(1, 0, 0);
_n.prototype;
function gs(e) {
  e.stopImmediatePropagation();
}
function vr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function A0(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function O0() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function vl() {
  return this.__zoom || fu;
}
function $0(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function z0() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function F0(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], c = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    c > a ? (a + c) / 2 : Math.min(0, a) || Math.max(0, c)
  );
}
function j0() {
  var e = A0, t = O0, n = F0, r = $0, i = z0, a = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], f = 250, d = Mp, p = Yr("start", "zoom", "end"), m, g, b, T = 500, L = 150, O = 0, z = 10;
  function S($) {
    $.property("__zoom", vl).on("wheel.zoom", we, { passive: !1 }).on("mousedown.zoom", ke).on("dblclick.zoom", ce).filter(i).on("touchstart.zoom", ve).on("touchmove.zoom", Ae).on("touchend.zoom touchcancel.zoom", de).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  S.transform = function($, ae, X, ne) {
    var re = $.selection ? $.selection() : $;
    re.property("__zoom", vl), $ !== re ? V($, ae, X, ne) : re.interrupt().each(function() {
      se(this, arguments).event(ne).start().zoom(null, typeof ae == "function" ? ae.apply(this, arguments) : ae).end();
    });
  }, S.scaleBy = function($, ae, X, ne) {
    S.scaleTo($, function() {
      var re = this.__zoom.k, be = typeof ae == "function" ? ae.apply(this, arguments) : ae;
      return re * be;
    }, X, ne);
  }, S.scaleTo = function($, ae, X, ne) {
    S.transform($, function() {
      var re = t.apply(this, arguments), be = this.__zoom, Me = X == null ? C(re) : typeof X == "function" ? X.apply(this, arguments) : X, Le = be.invert(Me), fe = typeof ae == "function" ? ae.apply(this, arguments) : ae;
      return n(U(D(be, fe), Me, Le), re, c);
    }, X, ne);
  }, S.translateBy = function($, ae, X, ne) {
    S.transform($, function() {
      return n(this.__zoom.translate(
        typeof ae == "function" ? ae.apply(this, arguments) : ae,
        typeof X == "function" ? X.apply(this, arguments) : X
      ), t.apply(this, arguments), c);
    }, null, ne);
  }, S.translateTo = function($, ae, X, ne, re) {
    S.transform($, function() {
      var be = t.apply(this, arguments), Me = this.__zoom, Le = ne == null ? C(be) : typeof ne == "function" ? ne.apply(this, arguments) : ne;
      return n(fu.translate(Le[0], Le[1]).scale(Me.k).translate(
        typeof ae == "function" ? -ae.apply(this, arguments) : -ae,
        typeof X == "function" ? -X.apply(this, arguments) : -X
      ), be, c);
    }, ne, re);
  };
  function D($, ae) {
    return ae = Math.max(a[0], Math.min(a[1], ae)), ae === $.k ? $ : new _n(ae, $.x, $.y);
  }
  function U($, ae, X) {
    var ne = ae[0] - X[0] * $.k, re = ae[1] - X[1] * $.k;
    return ne === $.x && re === $.y ? $ : new _n($.k, ne, re);
  }
  function C($) {
    return [(+$[0][0] + +$[1][0]) / 2, (+$[0][1] + +$[1][1]) / 2];
  }
  function V($, ae, X, ne) {
    $.on("start.zoom", function() {
      se(this, arguments).event(ne).start();
    }).on("interrupt.zoom end.zoom", function() {
      se(this, arguments).event(ne).end();
    }).tween("zoom", function() {
      var re = this, be = arguments, Me = se(re, be).event(ne), Le = t.apply(re, be), fe = X == null ? C(Le) : typeof X == "function" ? X.apply(re, be) : X, Qe = Math.max(Le[1][0] - Le[0][0], Le[1][1] - Le[0][1]), Ue = re.__zoom, Z = typeof ae == "function" ? ae.apply(re, be) : ae, De = d(Ue.invert(fe).concat(Qe / Ue.k), Z.invert(fe).concat(Qe / Z.k));
      return function(We) {
        if (We === 1) We = Z;
        else {
          var Be = De(We), ot = Qe / Be[2];
          We = new _n(ot, fe[0] - Be[0] * ot, fe[1] - Be[1] * ot);
        }
        Me.zoom(null, We);
      };
    });
  }
  function se($, ae, X) {
    return !X && $.__zooming || new oe($, ae);
  }
  function oe($, ae) {
    this.that = $, this.args = ae, this.active = 0, this.sourceEvent = null, this.extent = t.apply($, ae), this.taps = 0;
  }
  oe.prototype = {
    event: function($) {
      return $ && (this.sourceEvent = $), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function($, ae) {
      return this.mouse && $ !== "mouse" && (this.mouse[1] = ae.invert(this.mouse[0])), this.touch0 && $ !== "touch" && (this.touch0[1] = ae.invert(this.touch0[0])), this.touch1 && $ !== "touch" && (this.touch1[1] = ae.invert(this.touch1[0])), this.that.__zoom = ae, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function($) {
      var ae = je(this.that).datum();
      p.call(
        $,
        this.that,
        new I0($, {
          sourceEvent: this.sourceEvent,
          target: S,
          transform: this.that.__zoom,
          dispatch: p
        }),
        ae
      );
    }
  };
  function we($, ...ae) {
    if (!e.apply(this, arguments)) return;
    var X = se(this, ae).event($), ne = this.__zoom, re = Math.max(a[0], Math.min(a[1], ne.k * Math.pow(2, r.apply(this, arguments)))), be = qt($);
    if (X.wheel)
      (X.mouse[0][0] !== be[0] || X.mouse[0][1] !== be[1]) && (X.mouse[1] = ne.invert(X.mouse[0] = be)), clearTimeout(X.wheel);
    else {
      if (ne.k === re) return;
      X.mouse = [be, ne.invert(be)], mi(this), X.start();
    }
    vr($), X.wheel = setTimeout(Me, L), X.zoom("mouse", n(U(D(ne, re), X.mouse[0], X.mouse[1]), X.extent, c));
    function Me() {
      X.wheel = null, X.end();
    }
  }
  function ke($, ...ae) {
    if (b || !e.apply(this, arguments)) return;
    var X = $.currentTarget, ne = se(this, ae, !0).event($), re = je($.view).on("mousemove.zoom", fe, !0).on("mouseup.zoom", Qe, !0), be = qt($, X), Me = $.clientX, Le = $.clientY;
    Ka($.view), gs($), ne.mouse = [be, this.__zoom.invert(be)], mi(this), ne.start();
    function fe(Ue) {
      if (vr(Ue), !ne.moved) {
        var Z = Ue.clientX - Me, De = Ue.clientY - Le;
        ne.moved = Z * Z + De * De > O;
      }
      ne.event(Ue).zoom("mouse", n(U(ne.that.__zoom, ne.mouse[0] = qt(Ue, X), ne.mouse[1]), ne.extent, c));
    }
    function Qe(Ue) {
      re.on("mousemove.zoom mouseup.zoom", null), Xa(Ue.view, ne.moved), vr(Ue), ne.event(Ue).end();
    }
  }
  function ce($, ...ae) {
    if (e.apply(this, arguments)) {
      var X = this.__zoom, ne = qt($.changedTouches ? $.changedTouches[0] : $, this), re = X.invert(ne), be = X.k * ($.shiftKey ? 0.5 : 2), Me = n(U(D(X, be), ne, re), t.apply(this, ae), c);
      vr($), f > 0 ? je(this).transition().duration(f).call(V, Me, ne, $) : je(this).call(S.transform, Me, ne, $);
    }
  }
  function ve($, ...ae) {
    if (e.apply(this, arguments)) {
      var X = $.touches, ne = X.length, re = se(this, ae, $.changedTouches.length === ne).event($), be, Me, Le, fe;
      for (gs($), Me = 0; Me < ne; ++Me)
        Le = X[Me], fe = qt(Le, this), fe = [fe, this.__zoom.invert(fe), Le.identifier], re.touch0 ? !re.touch1 && re.touch0[2] !== fe[2] && (re.touch1 = fe, re.taps = 0) : (re.touch0 = fe, be = !0, re.taps = 1 + !!m);
      m && (m = clearTimeout(m)), be && (re.taps < 2 && (g = fe[0], m = setTimeout(function() {
        m = null;
      }, T)), mi(this), re.start());
    }
  }
  function Ae($, ...ae) {
    if (this.__zooming) {
      var X = se(this, ae).event($), ne = $.changedTouches, re = ne.length, be, Me, Le, fe;
      for (vr($), be = 0; be < re; ++be)
        Me = ne[be], Le = qt(Me, this), X.touch0 && X.touch0[2] === Me.identifier ? X.touch0[0] = Le : X.touch1 && X.touch1[2] === Me.identifier && (X.touch1[0] = Le);
      if (Me = X.that.__zoom, X.touch1) {
        var Qe = X.touch0[0], Ue = X.touch0[1], Z = X.touch1[0], De = X.touch1[1], We = (We = Z[0] - Qe[0]) * We + (We = Z[1] - Qe[1]) * We, Be = (Be = De[0] - Ue[0]) * Be + (Be = De[1] - Ue[1]) * Be;
        Me = D(Me, Math.sqrt(We / Be)), Le = [(Qe[0] + Z[0]) / 2, (Qe[1] + Z[1]) / 2], fe = [(Ue[0] + De[0]) / 2, (Ue[1] + De[1]) / 2];
      } else if (X.touch0) Le = X.touch0[0], fe = X.touch0[1];
      else return;
      X.zoom("touch", n(U(Me, Le, fe), X.extent, c));
    }
  }
  function de($, ...ae) {
    if (this.__zooming) {
      var X = se(this, ae).event($), ne = $.changedTouches, re = ne.length, be, Me;
      for (gs($), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, T), be = 0; be < re; ++be)
        Me = ne[be], X.touch0 && X.touch0[2] === Me.identifier ? delete X.touch0 : X.touch1 && X.touch1[2] === Me.identifier && delete X.touch1;
      if (X.touch1 && !X.touch0 && (X.touch0 = X.touch1, delete X.touch1), X.touch0) X.touch0[1] = this.__zoom.invert(X.touch0[0]);
      else if (X.end(), X.taps === 2 && (Me = qt(Me, this), Math.hypot(g[0] - Me[0], g[1] - Me[1]) < z)) {
        var Le = je(this).on("dblclick.zoom");
        Le && Le.apply(this, arguments);
      }
    }
  }
  return S.wheelDelta = function($) {
    return arguments.length ? (r = typeof $ == "function" ? $ : oi(+$), S) : r;
  }, S.filter = function($) {
    return arguments.length ? (e = typeof $ == "function" ? $ : oi(!!$), S) : e;
  }, S.touchable = function($) {
    return arguments.length ? (i = typeof $ == "function" ? $ : oi(!!$), S) : i;
  }, S.extent = function($) {
    return arguments.length ? (t = typeof $ == "function" ? $ : oi([[+$[0][0], +$[0][1]], [+$[1][0], +$[1][1]]]), S) : t;
  }, S.scaleExtent = function($) {
    return arguments.length ? (a[0] = +$[0], a[1] = +$[1], S) : [a[0], a[1]];
  }, S.translateExtent = function($) {
    return arguments.length ? (c[0][0] = +$[0][0], c[1][0] = +$[1][0], c[0][1] = +$[0][1], c[1][1] = +$[1][1], S) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, S.constrain = function($) {
    return arguments.length ? (n = $, S) : n;
  }, S.duration = function($) {
    return arguments.length ? (f = +$, S) : f;
  }, S.interpolate = function($) {
    return arguments.length ? (d = $, S) : d;
  }, S.on = function() {
    var $ = p.on.apply(p, arguments);
    return $ === p ? S : $;
  }, S.clickDistance = function($) {
    return arguments.length ? (O = ($ = +$) * $, S) : Math.sqrt(O);
  }, S.tapDistance = function($) {
    return arguments.length ? (z = +$, S) : z;
  }, S;
}
function B0(e, t) {
  let n = j0().filter((r) => r.button === 0 || r.touches?.length >= 2);
  return D0(n, e, t);
}
function D0(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (r) => t(r, !0)) : e.scaleExtent([1, 1]).on("zoom", (r) => t(r, !1));
}
function Ft(e) {
  e.preventDefault(), e.stopPropagation();
}
var Se = /* @__PURE__ */ ((e) => (e.CIRCLE = "circle", e.RECTANGLE = "rect", e))(Se || {}), Ge = /* @__PURE__ */ ((e) => (e.RIGHT = "RIGHT", e.BOTTOMRIGHT = "BOTTOMRIGHT", e.BOTTOM = "BOTTOM", e.BOTTOMLEFT = "BOTTOMLEFT", e.LEFT = "LEFT", e.TOPLEFT = "TOPLEFT", e.TOP = "TOP", e.TOPRIGHT = "TOPRIGHT", e))(Ge || {});
class V0 {
  // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
  _nodeProps = {
    shape: Se.RECTANGLE,
    width: 128,
    height: 48,
    cornerRadius: 4,
    reflexiveEdgeStart: "MOVABLE"
  };
  _nodeGUIEditability = {
    fixedPosition: { x: !1, y: !1 },
    deletable: !0,
    labelEditable: !0,
    allowIncomingLinks: !0,
    allowOutgoingLinks: !0
  };
  /**
   * If this is set to true, the nodes can grow dynamically to match the width and height
   * of the labels, provided they exceed the size set in the node props.
   * Words in the label will stay on a single line (no horizontal wrapping).
   *
   * If set to false, the nodes have a fixed size, and label words may wrap to the next line
   * or potentially overflow.
   */
  nodeAutoGrowToLabelSize = !0;
  showNodeLabels = !0;
  nodePhysicsEnabled = !1;
  _linkGUIEditability = {
    deletable: !0,
    labelEditable: !0
  };
  showLinkLabels = !0;
  fixedLinkDistanceEnabled = !1;
  allowNodeCreationViaGUI = !0;
  zoomEnabled = !1;
  markerBoxSize = 4;
  _markerPadding = 2 * this.markerBoxSize;
  set nodeSize(t) {
    this.nodeProps.shape === Se.CIRCLE ? typeof t == "number" ? this.nodeProps.radius = t : this.nodeProps.radius = t.radius ?? 24 : this.nodeProps.shape === Se.RECTANGLE && (typeof t == "number" ? (this.nodeProps.width = t, this.nodeProps.height = t) : (this.nodeProps.width = t.width ?? 48, this.nodeProps.height = t.height ?? 48));
  }
  get nodeSize() {
    let t, n, r;
    return this.nodeProps.shape === Se.CIRCLE ? (r = this.nodeProps.radius, t = 2 * r, n = 2 * r) : (t = this.nodeProps.width, n = this.nodeProps.height, r = t / 2), {
      width: t,
      height: n,
      radius: r
    };
  }
  set nodeProps(t) {
    t.shape = t.shape ?? this._nodeProps.shape, this._nodeProps = t, t.shape === Se.CIRCLE ? this.nodeSize = { radius: t.radius } : t.shape === Se.RECTANGLE && (this.nodeSize = { width: t.width, height: t.height }, t.cornerRadius === void 0 && (this._nodeProps.cornerRadius = 4), t.reflexiveEdgeStart === void 0 && (this._nodeProps.reflexiveEdgeStart = "MOVABLE"));
  }
  get nodeProps() {
    return this._nodeProps;
  }
  set nodeGUIEditability(t) {
    this._nodeGUIEditability = {
      ...this._nodeGUIEditability,
      ...t,
      fixedPosition: {
        ...this._nodeGUIEditability.fixedPosition,
        ...t.fixedPosition
      }
    };
  }
  get nodeGUIEditability() {
    return this._nodeGUIEditability;
  }
  set linkGUIEditability(t) {
    this._linkGUIEditability = {
      ...this._linkGUIEditability,
      ...t
    };
  }
  get linkGUIEditability() {
    return this._linkGUIEditability;
  }
  get markerPadding() {
    return this._markerPadding;
  }
  get markerRef() {
    return this.markerBoxSize / 2;
  }
  get arrowPoints() {
    return [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ];
  }
  get markerPath() {
    return [0, 0, this.markerBoxSize, this.markerBoxSize].join(",");
  }
  /**
   * The canvas is bound to the view if zoom is disabled.
   * When zoom (and panning) is enabled, we don't need bounds because the user can navigate to nodes outside the view.
   * When zoom is disabled, bounds are used to ensure all nodes accessible to the user.
   */
  get isCanvasBoundToView() {
    return !this.zoomEnabled;
  }
}
class $i {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param props - The properties (size, shape, ...) of the node
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The x coordinate of the node's center
   * @param y - The y coordinate of the node's center
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(t, n, r, i, a, c, f, d, p, m, g, b) {
    this.id = t, this.props = n, this.idImported = r, this.x = i, this.y = a, this.label = c, this.color = f, this.deletable = p, this.labelEditable = m, this.allowIncomingLinks = g, this.allowOutgoingLinks = b, this.fixedPosition = d, this._renderedSize = this.getSize();
  }
  fx;
  fy;
  _fixedPosition;
  /**
   * @param _renderedSize - The actual size used for rendering the node.
   * By default, this is equal to the size defined in `props`.
   * When nodes are allowed to grow to fit their label size *(`nodeAutoGrowToLabelSize` in `config`)*,
   * `renderedSize` may grow beyond the configured size in `props`.
   */
  _renderedSize;
  set fixedPosition(t) {
    this._fixedPosition = t, this.fx = this.fixedPosition?.x ? this.x : void 0, this.fy = this.fixedPosition?.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
  setShape(t, n) {
    if (t === Se.CIRCLE) {
      let r = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: Se.CIRCLE,
        radius: r
      };
    } else if (t === Se.RECTANGLE) {
      let r = n.nodeProps.width ?? 2 * this.props.radius, i = n.nodeProps.height ?? this.props.radius, a = n.nodeProps.cornerRadius ?? 4, c = n.nodeProps.reflexiveEdgeStart ?? "MOVABLE";
      this.props = {
        shape: Se.RECTANGLE,
        width: r,
        height: i,
        cornerRadius: a,
        reflexiveEdgeStart: c
      };
    }
  }
  setSize(t, n) {
    this.props.shape === Se.CIRCLE ? typeof t == "number" ? this.props.radius = t / 2 : this.props.radius = t.radius ?? n.nodeProps.radius : this.props.shape === Se.RECTANGLE && (typeof t == "number" ? (this.props.width = t, this.props.height = t) : (this.props.width = t.width ?? n.nodeProps.width, this.props.height = t.height ?? n.nodeProps.height));
  }
  /**
   * Returns the node's defined base size.
   *
   * If the node is not allowed to grow to fit its label size, this is identical to the
   * rendered size. Otherwise, the rendered size may be larger, and this value
   * represents the minimal size the node can shrink to.
   */
  getSize() {
    return this.props.shape === Se.CIRCLE ? { radius: this.props.radius } : { width: this.props.width, height: this.props.height };
  }
  /**
   * Sets the nodes rendered size so it is large enough to fit the given size,
   * but at least as large as the minimal size defined in the node properties.
   *
   * @param size - The required size
   */
  set renderedSize(t) {
    if (this.props.shape === Se.CIRCLE) {
      typeof t == "number" && (t = { radius: t / 2 });
      const n = t.radius > this.props.radius ? t.radius : this.props.radius;
      this._renderedSize.radius !== n && (this._renderedSize = { radius: n });
    } else if (this.props.shape === Se.RECTANGLE) {
      typeof t == "number" && (t = { width: t, height: t });
      const n = t.width > this.props.width ? t.width : this.props.width, r = t.height > this.props.height ? t.height : this.props.height;
      (this._renderedSize.width !== n || this._renderedSize.height !== r) && (this._renderedSize = { width: n, height: r });
    }
  }
  get renderedSize() {
    return this._renderedSize;
  }
}
function G0(e, t, n, r) {
  return Yd().filter(
    (i, a) => i.button === 0 && //left mouse click
    (a.fixedPosition?.x !== !0 || a.fixedPosition?.y !== !0)
  ).on("start", (i, a) => {
    Ft(i.sourceEvent), i.active === 0 && e.alphaTarget(0.5).restart(), a.fixedPosition?.x !== !0 && (a.fx = a.x), a.fixedPosition?.y !== !0 && (a.fy = a.y);
  }).on("drag", (i, a) => {
    a.fixedPosition?.x !== !0 && (r.isCanvasBoundToView ? a.props.shape === Se.CIRCLE ? a.fx = Math.max(
      a.renderedSize.radius,
      Math.min(t - a.renderedSize.radius, i.x)
    ) : a.props.shape === Se.RECTANGLE && (a.fx = Math.max(
      0.5 * a.renderedSize.width,
      Math.min(t - 0.5 * a.renderedSize.width, i.x)
    )) : a.fx = i.x), a.fixedPosition?.y !== !0 && (r.isCanvasBoundToView ? a.props.shape === Se.CIRCLE ? a.fy = Math.max(
      a.renderedSize.radius,
      Math.min(n - a.renderedSize.radius, i.y)
    ) : a.props.shape === Se.RECTANGLE && (a.fy = Math.max(
      0.5 * a.renderedSize.height,
      Math.min(n - 0.5 * a.renderedSize.height, i.y)
    )) : a.fy = i.y);
  }).on("end", (i, a) => {
    i.active === 0 && e.alphaTarget(0), a.fixedPosition?.x !== !0 && (a.fx = void 0), a.fixedPosition?.y !== !0 && (a.fy = void 0);
  });
}
function q0(e, t, n, r, i) {
  return e.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (c) => n(c)).on("pointerup", (c) => r(c)).on("contextmenu", (c) => Ft(c)).on("dblclick", (c) => i(c)).call(t).on("dblclick.zoom", null).append("g");
}
var Bt = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(Bt || {});
class U0 {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source - The links source node
   * @param target - The links target node
   * @param pathType - The path type is relevant for correct rendering in the view. It is set by and gets constantly updated during the simulation.
   * @param label - The link label
   * @param color The color of the node which was set (for default color this is empty)
   * @param deletable - If the link is deletable via GUI
   * @param labelEditable - If the link label is editable via GUI
   */
  constructor(t, n, r, i, a, c, f) {
    this.source = t, this.target = n, this.pathType = r, this.label = i, this.color = a, this.deletable = c, this.labelEditable = f, this.id = `${t.id}-${n.id}`;
  }
  id;
}
function W0(e) {
  return e.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function K0(e) {
  return e.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function Jt(e) {
  let t = [], n = [];
  if (!Array.isArray(e))
    typeof e == "number" ? t = [e] : n = [e];
  else {
    let r = e.map(String);
    n = r.filter((i) => i.includes("-")), t = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [t, n];
}
function li(e, t) {
  t !== void 0 && (typeof t == "boolean" ? t ? e.fixedPosition = { x: !0, y: !0 } : e.fixedPosition = { x: !1, y: !1 } : Rn(["x", "y"], Object.keys(t), !0) && (e.fixedPosition = t, Er(["x", "y"], Object.keys(t))));
}
function X0(e, t, n) {
  return `
    M ${-0.5 * e}, ${-0.5 * t + n}
    A ${n},${n} 0 0 1 ${-0.5 * e + n}, ${-0.5 * t}
    H ${0.5 * e - n}
    A ${n},${n} 0 0 1 ${0.5 * e}, ${-0.5 * t + n}
    V ${0.5 * t - n}
    A ${n},${n} 0 0 1 ${0.5 * e - n}, ${0.5 * t}
    H ${-0.5 * e + n}
    A ${n},${n} 0 0 1 ${-0.5 * e}, ${0.5 * t - n}
    Z
`;
}
function Ur(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function _l(e) {
  let t = e.target;
  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
}
function Y0(e, t, n = 2) {
  const r = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y);
  return r < n && i < n;
}
function Er(e, t, n) {
  let r = !0;
  return t.forEach((i) => {
    e.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, tr(
      `Option not valid: ${i}`,
      `Use the following: ${e.join(", ")}.`
    ));
  }), r;
}
function Rn(e, t, n) {
  let r = !0, i = e.filter((a) => !t.includes(a));
  return i.length > 0 && (r = !1, n && tr("Option missing", `Add: ${i}`)), r;
}
function tr(e, t) {
  console.error(e + `
` + t);
}
function Q0(e, t, n, r) {
  if (Pr(e, n, t + "-link-arrow", "graph-controller__arrow", !1), Pr(
    e,
    n,
    t + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), Pr(
    e,
    n,
    t + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      wi(e, t, n, i);
}
function wi(e, t, n, r) {
  e.select(`#${t}-link-arrow-` + Ur(r)).empty() && (Pr(
    e,
    n,
    t + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), Pr(
    e,
    n,
    t + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function ms(e, t, n) {
  e.select(`#${t}-link-arrow-` + Ur(n)).select(function() {
    return this.parentNode;
  }).remove(), e.select(`#${t}-link-arrow-reverse-` + Ur(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function Pr(e, t, n, r, i, a) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${P0()(t.arrowPoints)}`).style("fill", a || "");
}
function J0(e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class xl {
  nodeIdCounter = 0;
  nodes = [];
  links = [];
  createNode(t, n, r, i, a, c, f, d, p, m, g) {
    const b = new $i(
      this.nodeIdCounter++,
      t,
      i,
      n,
      r,
      a,
      c,
      f,
      d,
      p,
      m,
      g
    );
    return this.nodes.push(b), b;
  }
  createLink(t, n, r, i, a, c) {
    if (this.links.find(
      (g) => g.source.id === t && g.target.id === n
    ) !== void 0)
      return;
    const d = this.nodes.find((g) => g.id === t);
    if (d === void 0)
      return;
    const p = this.nodes.find((g) => g.id === n);
    if (p === void 0)
      return;
    const m = new U0(
      d,
      p,
      void 0,
      r,
      i,
      a,
      c
    );
    return this.links.push(m), m;
  }
  removeNode(t) {
    const n = this.nodes.findIndex((i) => i.id === t.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const r = this.links.filter(
      (i) => i.source.id === t.id || i.target.id === t.id
    );
    return r.forEach((i) => {
      const a = this.links.indexOf(i, 0);
      this.links.splice(a, 1);
    }), [t, r];
  }
  removeLink(t) {
    const n = this.links.findIndex(
      (r) => r.source.id === t.source.id && r.target.id === t.target.id
    );
    if (n !== -1)
      return this.links.splice(n, 1), t;
  }
  /**
   * Checks if a link in a given (not default) color exists.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(t, n = "") {
    return this.links.some((r) => r.color === t && r.id !== n);
  }
  /**
   * Get the existing non-default colors of links.
   * @returns An array of strings representing non-default colors, empty if none exist.
   */
  getNonDefaultLinkColors() {
    return this.links.map((t) => t.color).filter((t) => t !== void 0 && t !== "");
  }
  /**
   * Get the link ids of links with provided color.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude a link from this check via its ID
   * @returns An array of link IDs that have the provided color (without the excludedLinkId)
   */
  getLinkIdsWithNonDefaultLinkColors(t, n = "") {
    return this.links.filter((r) => r.color === t && r.id !== n).map((r) => r.id);
  }
  /**
   * Determine if a source and a target node have a bidirectional link connection.
   * @param source
   * @param target
   */
  hasBidirectionalConnection(t, n) {
    return t.id !== n.id && this.links.some((r) => r.target.id === t.id && r.source.id === n.id) && this.links.some((r) => r.target.id === n.id && r.source.id === t.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let r, i;
    return r = this.nodes.map((a) => {
      let c = `${a.id}`;
      return t && a.label !== void 0 && (c += ` ${a.label}`), c;
    }).join(`
`), i = this.links.map((a) => {
      let c = `${a.source.id} ${a.target.id}`;
      return n && a.label !== void 0 && (c += ` ${a.label}`), c;
    }).join(`
`), `${r}${i ? `
#
` : ""}${i}`;
  }
  /** Formats the graph in a json like graph format.
   * @param includeNodePosition if position should be included
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeProps if node props should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(t = !0, n = !0, r = !0, i = !0, a = !0, c = !0, f = !0, d = !0) {
    const p = this.nodes.map((g) => {
      const b = {
        id: g.id
      };
      return t && (g.x !== void 0 && (b.x = g.x), g.y !== void 0 && (b.y = g.y)), n && g.label !== void 0 && (b.label = g.label), i && g.props !== void 0 && (b.props = g.props), a && g.color !== void 0 && (b.color = g.color), f && (g.fixedPosition !== void 0 && (b.fixedPosition = g.fixedPosition), g.deletable !== void 0 && (b.deletable = g.deletable), g.labelEditable !== void 0 && (b.labelEditable = g.labelEditable), g.allowIncomingLinks !== void 0 && (b.allowIncomingLinks = g.allowIncomingLinks), g.allowOutgoingLinks !== void 0 && (b.allowOutgoingLinks = g.allowOutgoingLinks)), b;
    });
    let m = this.links.map((g) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(g)).filter(([b]) => b === "sourceId" || b === "targetId" || r && b === "label" || c && b === "color" || d && ["deletable", "labelEditable"].includes(b))
    ));
    return JSON.stringify({ nodes: p, links: m }, null, 4);
  }
  _convertToJSONLink(t) {
    let n = t.id.split("-");
    return {
      sourceId: Number(n[0]),
      targetId: Number(n[1]),
      label: t.label,
      color: t.color,
      deletable: t.deletable,
      labelEditable: t.labelEditable
    };
  }
}
function Z0(e) {
  var t = +this._x.call(null, e), n = +this._y.call(null, e);
  return hu(this.cover(t, n), t, n, e);
}
function hu(e, t, n, r) {
  if (isNaN(t) || isNaN(n)) return e;
  var i, a = e._root, c = { data: r }, f = e._x0, d = e._y0, p = e._x1, m = e._y1, g, b, T, L, O, z, S, D;
  if (!a) return e._root = c, e;
  for (; a.length; )
    if ((O = t >= (g = (f + p) / 2)) ? f = g : p = g, (z = n >= (b = (d + m) / 2)) ? d = b : m = b, i = a, !(a = a[S = z << 1 | O])) return i[S] = c, e;
  if (T = +e._x.call(null, a.data), L = +e._y.call(null, a.data), t === T && n === L) return c.next = a, i ? i[S] = c : e._root = c, e;
  do
    i = i ? i[S] = new Array(4) : e._root = new Array(4), (O = t >= (g = (f + p) / 2)) ? f = g : p = g, (z = n >= (b = (d + m) / 2)) ? d = b : m = b;
  while ((S = z << 1 | O) === (D = (L >= b) << 1 | T >= g));
  return i[D] = a, i[S] = c, e;
}
function H0(e) {
  var t, n, r = e.length, i, a, c = new Array(r), f = new Array(r), d = 1 / 0, p = 1 / 0, m = -1 / 0, g = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(a = +this._y.call(null, t)) || (c[n] = i, f[n] = a, i < d && (d = i), i > m && (m = i), a < p && (p = a), a > g && (g = a));
  for (m < d && (d = this._x0, m = this._x1), g < p && (p = this._y0, g = this._y1), this.cover(d, p).cover(m, g), n = 0; n < r; ++n)
    hu(this, c[n], f[n], e[n]);
  return this;
}
function em(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, r = this._y0, i = this._x1, a = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(e)) + 1, a = (r = Math.floor(t)) + 1;
  else if (n > e || e > i || r > t || t > a) {
    var c = i - n, f = this._root, d, p;
    switch (p = (t < (r + a) / 2) << 1 | e < (n + i) / 2) {
      case 0: {
        do
          d = new Array(4), d[p] = f, f = d;
        while (c *= 2, i = n + c, a = r + c, e > i || t > a);
        break;
      }
      case 1: {
        do
          d = new Array(4), d[p] = f, f = d;
        while (c *= 2, n = i - c, a = r + c, n > e || t > a);
        break;
      }
      case 2: {
        do
          d = new Array(4), d[p] = f, f = d;
        while (c *= 2, i = n + c, r = a - c, e > i || r > t);
        break;
      }
      case 3: {
        do
          d = new Array(4), d[p] = f, f = d;
        while (c *= 2, n = i - c, r = a - c, n > e || r > t);
        break;
      }
    }
    this._root && this._root.length && (this._root = f);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this;
}
function tm() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function nm(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Mt(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function rm(e, t, n) {
  var r, i = this._x0, a = this._y0, c, f, d, p, m = this._x1, g = this._y1, b = [], T = this._root, L, O;
  for (T && b.push(new Mt(T, i, a, m, g)), n == null ? n = 1 / 0 : (i = e - n, a = t - n, m = e + n, g = t + n, n *= n); L = b.pop(); )
    if (!(!(T = L.node) || (c = L.x0) > m || (f = L.y0) > g || (d = L.x1) < i || (p = L.y1) < a))
      if (T.length) {
        var z = (c + d) / 2, S = (f + p) / 2;
        b.push(
          new Mt(T[3], z, S, d, p),
          new Mt(T[2], c, S, z, p),
          new Mt(T[1], z, f, d, S),
          new Mt(T[0], c, f, z, S)
        ), (O = (t >= S) << 1 | e >= z) && (L = b[b.length - 1], b[b.length - 1] = b[b.length - 1 - O], b[b.length - 1 - O] = L);
      } else {
        var D = e - +this._x.call(null, T.data), U = t - +this._y.call(null, T.data), C = D * D + U * U;
        if (C < n) {
          var V = Math.sqrt(n = C);
          i = e - V, a = t - V, m = e + V, g = t + V, r = T.data;
        }
      }
  return r;
}
function im(e) {
  if (isNaN(m = +this._x.call(null, e)) || isNaN(g = +this._y.call(null, e))) return this;
  var t, n = this._root, r, i, a, c = this._x0, f = this._y0, d = this._x1, p = this._y1, m, g, b, T, L, O, z, S;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((L = m >= (b = (c + d) / 2)) ? c = b : d = b, (O = g >= (T = (f + p) / 2)) ? f = T : p = T, t = n, !(n = n[z = O << 1 | L])) return this;
    if (!n.length) break;
    (t[z + 1 & 3] || t[z + 2 & 3] || t[z + 3 & 3]) && (r = t, S = z);
  }
  for (; n.data !== e; ) if (i = n, !(n = n.next)) return this;
  return (a = n.next) && delete n.next, i ? (a ? i.next = a : delete i.next, this) : t ? (a ? t[z] = a : delete t[z], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[S] = n : this._root = n), this) : (this._root = a, this);
}
function sm(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function om() {
  return this._root;
}
function lm() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function am(e) {
  var t = [], n, r = this._root, i, a, c, f, d;
  for (r && t.push(new Mt(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, a = n.x0, c = n.y0, f = n.x1, d = n.y1) && r.length) {
      var p = (a + f) / 2, m = (c + d) / 2;
      (i = r[3]) && t.push(new Mt(i, p, m, f, d)), (i = r[2]) && t.push(new Mt(i, a, m, p, d)), (i = r[1]) && t.push(new Mt(i, p, c, f, m)), (i = r[0]) && t.push(new Mt(i, a, c, p, m));
    }
  return this;
}
function um(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Mt(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var a, c = r.x0, f = r.y0, d = r.x1, p = r.y1, m = (c + d) / 2, g = (f + p) / 2;
      (a = i[0]) && t.push(new Mt(a, c, f, m, g)), (a = i[1]) && t.push(new Mt(a, m, f, d, g)), (a = i[2]) && t.push(new Mt(a, c, g, m, p)), (a = i[3]) && t.push(new Mt(a, m, g, d, p));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function cm(e) {
  return e[0];
}
function fm(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function hm(e) {
  return e[1];
}
function dm(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function du(e, t, n) {
  var r = new bo(t ?? cm, n ?? hm, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function bo(e, t, n, r, i, a) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this._root = void 0;
}
function Sl(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Nt = du.prototype = bo.prototype;
Nt.copy = function() {
  var e = new bo(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t) return e;
  if (!t.length) return e._root = Sl(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = Sl(r));
  return e;
};
Nt.add = Z0;
Nt.addAll = H0;
Nt.cover = em;
Nt.data = tm;
Nt.extent = nm;
Nt.find = rm;
Nt.remove = im;
Nt.removeAll = sm;
Nt.root = om;
Nt.size = lm;
Nt.visit = am;
Nt.visitAfter = um;
Nt.x = fm;
Nt.y = dm;
function pm(e) {
  function t(g) {
    return g.x + g.vx;
  }
  function n(g) {
    return g.y + g.vy;
  }
  function r(g) {
    return function() {
      return g;
    };
  }
  var i, a, c = 1, f = 1;
  typeof e != "function" && (e = r(e === null ? [[0, 0][1]] : e));
  function d() {
    var g, b, T, L, O, z, S, D, U, C, V = [];
    i.forEach(function(ce, ve) {
      V.push({ node: ce, vx: ce.vx, vy: ce.vy, x: ce.x + (a[ve][1][0] + a[ve][0][0]) / 2, y: ce.y + (a[ve][0][1] + a[ve][1][1]) / 2 }), V.push({ node: ce, vx: ce.vx, vy: ce.vy, x: ce.x + a[ve][0][0], y: ce.y + a[ve][0][1] }), V.push({ node: ce, vx: ce.vx, vy: ce.vy, x: ce.x + a[ve][0][0], y: ce.y + a[ve][1][1] }), V.push({ node: ce, vx: ce.vx, vy: ce.vy, x: ce.x + a[ve][1][0], y: ce.y + a[ve][0][1] }), V.push({ node: ce, vx: ce.vx, vy: ce.vy, x: ce.x + a[ve][1][0], y: ce.y + a[ve][1][1] });
    });
    for (var se = V.length, oe = 0; oe < f; ++oe)
      for (b = du(V, t, n).visitAfter(p), g = 0; g < se; ++g) {
        var we = ~~(g / 5);
        T = i[we], z = a[we], L = T.x + T.vx, O = T.y + T.vy, S = L + z[0][0], D = O + z[0][1], U = L + z[1][0], C = O + z[1][1], b.visit(ke);
      }
    function ke(ce, ve, Ae, de, $) {
      var ae = ce.data;
      if (ae) {
        var X = m(z, 0), ne = m(z, 1);
        if (ae.node.index !== we) {
          var re = ae.node, be = a[re.index], Me = re.x + re.vx + be[0][0], Le = re.y + re.vy + be[0][1], fe = re.x + re.vx + be[1][0], Qe = re.y + re.vy + be[1][1], Ue = m(be, 0), Z = m(be, 1);
          if (S <= fe && Me <= U && D <= Qe && Le <= C) {
            var De = [Math.min.apply(null, [Me, fe, S, U]), Math.max.apply(null, [Me, fe, S, U])], We = [Math.min.apply(null, [Le, Qe, D, C]), Math.max.apply(null, [Le, Qe, D, C])], Be = X + Ue - (De[1] - De[0]), ot = ne + Z - (We[1] - We[0]), wt = Be * c * (ot / ne), Yt = ot * c * (Be / X), P = Be * c * (ot / Z), F = ot * c * (Be / Ue);
            (S + U) / 2 < (Me + fe) / 2 ? (T.vx -= wt, re.vx += P) : (T.vx += wt, re.vx -= P), (D + C) / 2 < (Le + Qe) / 2 ? (T.vy -= Yt, re.vy += F) : (T.vy += Yt, re.vy -= F);
          }
        }
        return;
      }
      return ve > U || de < S || Ae > C || $ < D;
    }
  }
  function p(g) {
    if (g.data)
      return g.bb = a[g.data.node.index];
    g.bb = [[0, 0], [0, 0]];
    for (var b = 0; b < 4; ++b)
      g[b] && g[b].bb[0][0] < g.bb[0][0] && (g.bb[0][0] = g[b].bb[0][0]), g[b] && g[b].bb[0][1] < g.bb[0][1] && (g.bb[0][1] = g[b].bb[0][1]), g[b] && g[b].bb[1][0] > g.bb[1][0] && (g.bb[1][0] = g[b].bb[1][0]), g[b] && g[b].bb[1][1] > g.bb[1][1] && (g.bb[1][1] = g[b].bb[1][1]);
  }
  function m(g, b) {
    return g[1][b] - g[0][b];
  }
  return d.initialize = function(g) {
    var b, T = (i = g).length;
    for (a = new Array(T), b = 0; b < T; ++b) a[b] = e(i[b], b, i);
  }, d.iterations = function(g) {
    return arguments.length ? (f = +g, d) : f;
  }, d.strength = function(g) {
    return arguments.length ? (c = +g, d) : c;
  }, d.bbox = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : r(+g), d) : e;
  }, d;
}
function gm(e, t, n, r, i) {
  let a = p0(e.nodes).on("tick", () => i());
  return a = yi(a, e, t), t.isCanvasBoundToView && (a = mm(a, e, n, r)), a = gu(a, e, t, t.fixedLinkDistanceEnabled), a = pu(a, t.nodePhysicsEnabled, n, r), a;
}
function yi(e, t, n) {
  return (!t.nodes || t.nodes.length === 0 ? n.nodeProps.shape === Se.CIRCLE : t.nodes.every((i) => i.props.shape === Se.CIRCLE)) ? e.force(
    "collideCircle",
    i0().radius((i) => i.renderedSize.radius)
  ).force("collideBox", null) : e.force(
    "collideBox",
    pm((i) => {
      if (i.props.shape === Se.CIRCLE)
        return [
          [
            -i.renderedSize.radius,
            -i.renderedSize.radius
          ],
          [
            i.renderedSize.radius,
            i.renderedSize.radius
          ]
        ];
      if (i.props.shape === Se.RECTANGLE)
        return [
          [
            -0.5 * i.renderedSize.width,
            -0.5 * i.renderedSize.height
          ],
          [
            0.5 * i.renderedSize.width,
            0.5 * i.renderedSize.height
          ]
        ];
    })
  ).force("collideCircle", null);
}
function mm(e, t, n, r) {
  return e.force("bounds", () => {
    for (const i of t.nodes)
      i.props.shape === Se.CIRCLE ? (i.x = Math.max(
        i.renderedSize.radius,
        Math.min(n - i.renderedSize.radius, i.x)
      ), i.y = Math.max(
        i.renderedSize.radius,
        Math.min(r - i.renderedSize.radius, i.y)
      )) : i.props.shape === Se.RECTANGLE && (i.x = Math.max(
        0.5 * i.renderedSize.width,
        Math.min(n - 0.5 * i.renderedSize.width, i.x)
      ), i.y = Math.max(
        0.5 * i.renderedSize.height,
        Math.min(r - 0.5 * i.renderedSize.height, i.y)
      ));
  });
}
function pu(e, t, n, r) {
  return t ? e.force("charge", g0().strength(-500)).force("x", m0(n / 2).strength(0.05)).force("y", w0(r / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function gu(e, t, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === Se.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === Se.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), e.force(
      "link",
      o0().links(t.links).id((a) => a.id).distance(i * 10)
    );
  } else
    return e.force("link", null);
}
function mu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function wu(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      var i = !1;
      try {
        i = this instanceof r;
      } catch {
      }
      return i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var ze = {};
const wm = Object.prototype.toString;
function Wr(e) {
  const t = wm.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
const ym = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAnyArray: Wr
}, Symbol.toStringTag, { value: "Module" })), bm = /* @__PURE__ */ wu(ym);
function vm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Wr(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, a = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (a <= r || a > e.length || !Number.isInteger(a))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var c = e[r], f = r + 1; f < a; f++)
    e[f] > c && (c = e[f]);
  return c;
}
function _m(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Wr(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, a = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (a <= r || a > e.length || !Number.isInteger(a))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var c = e[r], f = r + 1; f < a; f++)
    e[f] < c && (c = e[f]);
  return c;
}
function xm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Wr(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Wr(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var r = _m(e), i = vm(e);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var a = t.min, c = a === void 0 ? t.autoMinMax ? r : 0 : a, f = t.max, d = f === void 0 ? t.autoMinMax ? i : 1 : f;
  if (c >= d)
    throw new RangeError("min option must be smaller than max option");
  for (var p = (d - c) / (i - r), m = 0; m < e.length; m++)
    n[m] = (e[m] - r) * p + c;
  return n;
}
const Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xm
}, Symbol.toStringTag, { value: "Module" })), Em = /* @__PURE__ */ wu(Sm);
var El;
function Mm() {
  if (El) return ze;
  El = 1, Object.defineProperty(ze, "__esModule", { value: !0 });
  var e = bm, t = Em;
  const n = " ".repeat(2), r = " ".repeat(4);
  function i() {
    return a(this);
  }
  function a(w, o = {}) {
    const {
      maxRows: l = 15,
      maxColumns: s = 10,
      maxNumSize: u = 8,
      padMinus: h = "auto"
    } = o;
    return `${w.constructor.name} {
${n}[
${r}${c(w, l, s, u, h)}
${n}]
${n}rows: ${w.rows}
${n}columns: ${w.columns}
}`;
  }
  function c(w, o, l, s, u) {
    const { rows: h, columns: _ } = w, x = Math.min(h, o), M = Math.min(_, l), k = [];
    if (u === "auto") {
      u = !1;
      e: for (let j = 0; j < x; j++)
        for (let I = 0; I < M; I++)
          if (w.get(j, I) < 0) {
            u = !0;
            break e;
          }
    }
    for (let j = 0; j < x; j++) {
      let I = [];
      for (let W = 0; W < M; W++)
        I.push(f(w.get(j, W), s, u));
      k.push(`${I.join(" ")}`);
    }
    return M !== _ && (k[k.length - 1] += ` ... ${_ - l} more columns`), x !== h && k.push(`... ${h - o} more rows`), k.join(`
${r}`);
  }
  function f(w, o, l) {
    return (w >= 0 && l ? ` ${d(w, o - 1)}` : d(w, o)).padEnd(o);
  }
  function d(w, o) {
    let l = w.toString();
    if (l.length <= o) return l;
    let s = w.toFixed(o);
    if (s.length > o && (s = w.toFixed(Math.max(0, o - (s.length - o)))), s.length <= o && !s.startsWith("0.000") && !s.startsWith("-0.000"))
      return s;
    let u = w.toExponential(o);
    return u.length > o && (u = w.toExponential(Math.max(0, o - (u.length - o)))), u.slice(0);
  }
  function p(w, o) {
    w.prototype.add = function(s) {
      return typeof s == "number" ? this.addS(s) : this.addM(s);
    }, w.prototype.addS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) + s);
      return this;
    }, w.prototype.addM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) + s.get(u, h));
      return this;
    }, w.add = function(s, u) {
      return new o(s).add(u);
    }, w.prototype.sub = function(s) {
      return typeof s == "number" ? this.subS(s) : this.subM(s);
    }, w.prototype.subS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) - s);
      return this;
    }, w.prototype.subM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) - s.get(u, h));
      return this;
    }, w.sub = function(s, u) {
      return new o(s).sub(u);
    }, w.prototype.subtract = w.prototype.sub, w.prototype.subtractS = w.prototype.subS, w.prototype.subtractM = w.prototype.subM, w.subtract = w.sub, w.prototype.mul = function(s) {
      return typeof s == "number" ? this.mulS(s) : this.mulM(s);
    }, w.prototype.mulS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) * s);
      return this;
    }, w.prototype.mulM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) * s.get(u, h));
      return this;
    }, w.mul = function(s, u) {
      return new o(s).mul(u);
    }, w.prototype.multiply = w.prototype.mul, w.prototype.multiplyS = w.prototype.mulS, w.prototype.multiplyM = w.prototype.mulM, w.multiply = w.mul, w.prototype.div = function(s) {
      return typeof s == "number" ? this.divS(s) : this.divM(s);
    }, w.prototype.divS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) / s);
      return this;
    }, w.prototype.divM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) / s.get(u, h));
      return this;
    }, w.div = function(s, u) {
      return new o(s).div(u);
    }, w.prototype.divide = w.prototype.div, w.prototype.divideS = w.prototype.divS, w.prototype.divideM = w.prototype.divM, w.divide = w.div, w.prototype.mod = function(s) {
      return typeof s == "number" ? this.modS(s) : this.modM(s);
    }, w.prototype.modS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) % s);
      return this;
    }, w.prototype.modM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) % s.get(u, h));
      return this;
    }, w.mod = function(s, u) {
      return new o(s).mod(u);
    }, w.prototype.modulus = w.prototype.mod, w.prototype.modulusS = w.prototype.modS, w.prototype.modulusM = w.prototype.modM, w.modulus = w.mod, w.prototype.and = function(s) {
      return typeof s == "number" ? this.andS(s) : this.andM(s);
    }, w.prototype.andS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) & s);
      return this;
    }, w.prototype.andM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) & s.get(u, h));
      return this;
    }, w.and = function(s, u) {
      return new o(s).and(u);
    }, w.prototype.or = function(s) {
      return typeof s == "number" ? this.orS(s) : this.orM(s);
    }, w.prototype.orS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) | s);
      return this;
    }, w.prototype.orM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) | s.get(u, h));
      return this;
    }, w.or = function(s, u) {
      return new o(s).or(u);
    }, w.prototype.xor = function(s) {
      return typeof s == "number" ? this.xorS(s) : this.xorM(s);
    }, w.prototype.xorS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) ^ s);
      return this;
    }, w.prototype.xorM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) ^ s.get(u, h));
      return this;
    }, w.xor = function(s, u) {
      return new o(s).xor(u);
    }, w.prototype.leftShift = function(s) {
      return typeof s == "number" ? this.leftShiftS(s) : this.leftShiftM(s);
    }, w.prototype.leftShiftS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) << s);
      return this;
    }, w.prototype.leftShiftM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) << s.get(u, h));
      return this;
    }, w.leftShift = function(s, u) {
      return new o(s).leftShift(u);
    }, w.prototype.signPropagatingRightShift = function(s) {
      return typeof s == "number" ? this.signPropagatingRightShiftS(s) : this.signPropagatingRightShiftM(s);
    }, w.prototype.signPropagatingRightShiftS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) >> s);
      return this;
    }, w.prototype.signPropagatingRightShiftM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) >> s.get(u, h));
      return this;
    }, w.signPropagatingRightShift = function(s, u) {
      return new o(s).signPropagatingRightShift(u);
    }, w.prototype.rightShift = function(s) {
      return typeof s == "number" ? this.rightShiftS(s) : this.rightShiftM(s);
    }, w.prototype.rightShiftS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) >>> s);
      return this;
    }, w.prototype.rightShiftM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) >>> s.get(u, h));
      return this;
    }, w.rightShift = function(s, u) {
      return new o(s).rightShift(u);
    }, w.prototype.zeroFillRightShift = w.prototype.rightShift, w.prototype.zeroFillRightShiftS = w.prototype.rightShiftS, w.prototype.zeroFillRightShiftM = w.prototype.rightShiftM, w.zeroFillRightShift = w.rightShift, w.prototype.not = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, ~this.get(s, u));
      return this;
    }, w.not = function(s) {
      return new o(s).not();
    }, w.prototype.abs = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.abs(this.get(s, u)));
      return this;
    }, w.abs = function(s) {
      return new o(s).abs();
    }, w.prototype.acos = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.acos(this.get(s, u)));
      return this;
    }, w.acos = function(s) {
      return new o(s).acos();
    }, w.prototype.acosh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.acosh(this.get(s, u)));
      return this;
    }, w.acosh = function(s) {
      return new o(s).acosh();
    }, w.prototype.asin = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.asin(this.get(s, u)));
      return this;
    }, w.asin = function(s) {
      return new o(s).asin();
    }, w.prototype.asinh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.asinh(this.get(s, u)));
      return this;
    }, w.asinh = function(s) {
      return new o(s).asinh();
    }, w.prototype.atan = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.atan(this.get(s, u)));
      return this;
    }, w.atan = function(s) {
      return new o(s).atan();
    }, w.prototype.atanh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.atanh(this.get(s, u)));
      return this;
    }, w.atanh = function(s) {
      return new o(s).atanh();
    }, w.prototype.cbrt = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.cbrt(this.get(s, u)));
      return this;
    }, w.cbrt = function(s) {
      return new o(s).cbrt();
    }, w.prototype.ceil = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.ceil(this.get(s, u)));
      return this;
    }, w.ceil = function(s) {
      return new o(s).ceil();
    }, w.prototype.clz32 = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.clz32(this.get(s, u)));
      return this;
    }, w.clz32 = function(s) {
      return new o(s).clz32();
    }, w.prototype.cos = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.cos(this.get(s, u)));
      return this;
    }, w.cos = function(s) {
      return new o(s).cos();
    }, w.prototype.cosh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.cosh(this.get(s, u)));
      return this;
    }, w.cosh = function(s) {
      return new o(s).cosh();
    }, w.prototype.exp = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.exp(this.get(s, u)));
      return this;
    }, w.exp = function(s) {
      return new o(s).exp();
    }, w.prototype.expm1 = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.expm1(this.get(s, u)));
      return this;
    }, w.expm1 = function(s) {
      return new o(s).expm1();
    }, w.prototype.floor = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.floor(this.get(s, u)));
      return this;
    }, w.floor = function(s) {
      return new o(s).floor();
    }, w.prototype.fround = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.fround(this.get(s, u)));
      return this;
    }, w.fround = function(s) {
      return new o(s).fround();
    }, w.prototype.log = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.log(this.get(s, u)));
      return this;
    }, w.log = function(s) {
      return new o(s).log();
    }, w.prototype.log1p = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.log1p(this.get(s, u)));
      return this;
    }, w.log1p = function(s) {
      return new o(s).log1p();
    }, w.prototype.log10 = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.log10(this.get(s, u)));
      return this;
    }, w.log10 = function(s) {
      return new o(s).log10();
    }, w.prototype.log2 = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.log2(this.get(s, u)));
      return this;
    }, w.log2 = function(s) {
      return new o(s).log2();
    }, w.prototype.round = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.round(this.get(s, u)));
      return this;
    }, w.round = function(s) {
      return new o(s).round();
    }, w.prototype.sign = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.sign(this.get(s, u)));
      return this;
    }, w.sign = function(s) {
      return new o(s).sign();
    }, w.prototype.sin = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.sin(this.get(s, u)));
      return this;
    }, w.sin = function(s) {
      return new o(s).sin();
    }, w.prototype.sinh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.sinh(this.get(s, u)));
      return this;
    }, w.sinh = function(s) {
      return new o(s).sinh();
    }, w.prototype.sqrt = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.sqrt(this.get(s, u)));
      return this;
    }, w.sqrt = function(s) {
      return new o(s).sqrt();
    }, w.prototype.tan = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.tan(this.get(s, u)));
      return this;
    }, w.tan = function(s) {
      return new o(s).tan();
    }, w.prototype.tanh = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.tanh(this.get(s, u)));
      return this;
    }, w.tanh = function(s) {
      return new o(s).tanh();
    }, w.prototype.trunc = function() {
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.set(s, u, Math.trunc(this.get(s, u)));
      return this;
    }, w.trunc = function(s) {
      return new o(s).trunc();
    }, w.pow = function(s, u) {
      return new o(s).pow(u);
    }, w.prototype.pow = function(s) {
      return typeof s == "number" ? this.powS(s) : this.powM(s);
    }, w.prototype.powS = function(s) {
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) ** s);
      return this;
    }, w.prototype.powM = function(s) {
      if (s = o.checkMatrix(s), this.rows !== s.rows || this.columns !== s.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let u = 0; u < this.rows; u++)
        for (let h = 0; h < this.columns; h++)
          this.set(u, h, this.get(u, h) ** s.get(u, h));
      return this;
    };
  }
  function m(w, o, l) {
    let s = l ? w.rows : w.rows - 1;
    if (o < 0 || o > s)
      throw new RangeError("Row index out of range");
  }
  function g(w, o, l) {
    let s = l ? w.columns : w.columns - 1;
    if (o < 0 || o > s)
      throw new RangeError("Column index out of range");
  }
  function b(w, o) {
    if (o.to1DArray && (o = o.to1DArray()), o.length !== w.columns)
      throw new RangeError(
        "vector size must be the same as the number of columns"
      );
    return o;
  }
  function T(w, o) {
    if (o.to1DArray && (o = o.to1DArray()), o.length !== w.rows)
      throw new RangeError("vector size must be the same as the number of rows");
    return o;
  }
  function L(w, o) {
    if (!e.isAnyArray(o))
      throw new TypeError("row indices must be an array");
    for (let l = 0; l < o.length; l++)
      if (o[l] < 0 || o[l] >= w.rows)
        throw new RangeError("row indices are out of range");
  }
  function O(w, o) {
    if (!e.isAnyArray(o))
      throw new TypeError("column indices must be an array");
    for (let l = 0; l < o.length; l++)
      if (o[l] < 0 || o[l] >= w.columns)
        throw new RangeError("column indices are out of range");
  }
  function z(w, o, l, s, u) {
    if (arguments.length !== 5)
      throw new RangeError("expected 4 arguments");
    if (D("startRow", o), D("endRow", l), D("startColumn", s), D("endColumn", u), o > l || s > u || o < 0 || o >= w.rows || l < 0 || l >= w.rows || s < 0 || s >= w.columns || u < 0 || u >= w.columns)
      throw new RangeError("Submatrix indices are out of range");
  }
  function S(w, o = 0) {
    let l = [];
    for (let s = 0; s < w; s++)
      l.push(o);
    return l;
  }
  function D(w, o) {
    if (typeof o != "number")
      throw new TypeError(`${w} must be a number`);
  }
  function U(w) {
    if (w.isEmpty())
      throw new Error("Empty matrix has no elements to index");
  }
  function C(w) {
    let o = S(w.rows);
    for (let l = 0; l < w.rows; ++l)
      for (let s = 0; s < w.columns; ++s)
        o[l] += w.get(l, s);
    return o;
  }
  function V(w) {
    let o = S(w.columns);
    for (let l = 0; l < w.rows; ++l)
      for (let s = 0; s < w.columns; ++s)
        o[s] += w.get(l, s);
    return o;
  }
  function se(w) {
    let o = 0;
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        o += w.get(l, s);
    return o;
  }
  function oe(w) {
    let o = S(w.rows, 1);
    for (let l = 0; l < w.rows; ++l)
      for (let s = 0; s < w.columns; ++s)
        o[l] *= w.get(l, s);
    return o;
  }
  function we(w) {
    let o = S(w.columns, 1);
    for (let l = 0; l < w.rows; ++l)
      for (let s = 0; s < w.columns; ++s)
        o[s] *= w.get(l, s);
    return o;
  }
  function ke(w) {
    let o = 1;
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        o *= w.get(l, s);
    return o;
  }
  function ce(w, o, l) {
    const s = w.rows, u = w.columns, h = [];
    for (let _ = 0; _ < s; _++) {
      let x = 0, M = 0, k = 0;
      for (let j = 0; j < u; j++)
        k = w.get(_, j) - l[_], x += k, M += k * k;
      o ? h.push((M - x * x / u) / (u - 1)) : h.push((M - x * x / u) / u);
    }
    return h;
  }
  function ve(w, o, l) {
    const s = w.rows, u = w.columns, h = [];
    for (let _ = 0; _ < u; _++) {
      let x = 0, M = 0, k = 0;
      for (let j = 0; j < s; j++)
        k = w.get(j, _) - l[_], x += k, M += k * k;
      o ? h.push((M - x * x / s) / (s - 1)) : h.push((M - x * x / s) / s);
    }
    return h;
  }
  function Ae(w, o, l) {
    const s = w.rows, u = w.columns, h = s * u;
    let _ = 0, x = 0, M = 0;
    for (let k = 0; k < s; k++)
      for (let j = 0; j < u; j++)
        M = w.get(k, j) - l, _ += M, x += M * M;
    return o ? (x - _ * _ / h) / (h - 1) : (x - _ * _ / h) / h;
  }
  function de(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) - o[l]);
  }
  function $(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) - o[s]);
  }
  function ae(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) - o);
  }
  function X(w) {
    const o = [];
    for (let l = 0; l < w.rows; l++) {
      let s = 0;
      for (let u = 0; u < w.columns; u++)
        s += w.get(l, u) ** 2 / (w.columns - 1);
      o.push(Math.sqrt(s));
    }
    return o;
  }
  function ne(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) / o[l]);
  }
  function re(w) {
    const o = [];
    for (let l = 0; l < w.columns; l++) {
      let s = 0;
      for (let u = 0; u < w.rows; u++)
        s += w.get(u, l) ** 2 / (w.rows - 1);
      o.push(Math.sqrt(s));
    }
    return o;
  }
  function be(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) / o[s]);
  }
  function Me(w) {
    const o = w.size - 1;
    let l = 0;
    for (let s = 0; s < w.columns; s++)
      for (let u = 0; u < w.rows; u++)
        l += w.get(u, s) ** 2 / o;
    return Math.sqrt(l);
  }
  function Le(w, o) {
    for (let l = 0; l < w.rows; l++)
      for (let s = 0; s < w.columns; s++)
        w.set(l, s, w.get(l, s) / o);
  }
  class fe {
    static from1DArray(o, l, s) {
      if (o * l !== s.length)
        throw new RangeError("data length does not match given dimensions");
      let h = new Z(o, l);
      for (let _ = 0; _ < o; _++)
        for (let x = 0; x < l; x++)
          h.set(_, x, s[_ * l + x]);
      return h;
    }
    static rowVector(o) {
      let l = new Z(1, o.length);
      for (let s = 0; s < o.length; s++)
        l.set(0, s, o[s]);
      return l;
    }
    static columnVector(o) {
      let l = new Z(o.length, 1);
      for (let s = 0; s < o.length; s++)
        l.set(s, 0, o[s]);
      return l;
    }
    static zeros(o, l) {
      return new Z(o, l);
    }
    static ones(o, l) {
      return new Z(o, l).fill(1);
    }
    static rand(o, l, s = {}) {
      if (typeof s != "object")
        throw new TypeError("options must be an object");
      const { random: u = Math.random } = s;
      let h = new Z(o, l);
      for (let _ = 0; _ < o; _++)
        for (let x = 0; x < l; x++)
          h.set(_, x, u());
      return h;
    }
    static randInt(o, l, s = {}) {
      if (typeof s != "object")
        throw new TypeError("options must be an object");
      const { min: u = 0, max: h = 1e3, random: _ = Math.random } = s;
      if (!Number.isInteger(u)) throw new TypeError("min must be an integer");
      if (!Number.isInteger(h)) throw new TypeError("max must be an integer");
      if (u >= h) throw new RangeError("min must be smaller than max");
      let x = h - u, M = new Z(o, l);
      for (let k = 0; k < o; k++)
        for (let j = 0; j < l; j++) {
          let I = u + Math.round(_() * x);
          M.set(k, j, I);
        }
      return M;
    }
    static eye(o, l, s) {
      l === void 0 && (l = o), s === void 0 && (s = 1);
      let u = Math.min(o, l), h = this.zeros(o, l);
      for (let _ = 0; _ < u; _++)
        h.set(_, _, s);
      return h;
    }
    static diag(o, l, s) {
      let u = o.length;
      l === void 0 && (l = u), s === void 0 && (s = l);
      let h = Math.min(u, l, s), _ = this.zeros(l, s);
      for (let x = 0; x < h; x++)
        _.set(x, x, o[x]);
      return _;
    }
    static min(o, l) {
      o = this.checkMatrix(o), l = this.checkMatrix(l);
      let s = o.rows, u = o.columns, h = new Z(s, u);
      for (let _ = 0; _ < s; _++)
        for (let x = 0; x < u; x++)
          h.set(_, x, Math.min(o.get(_, x), l.get(_, x)));
      return h;
    }
    static max(o, l) {
      o = this.checkMatrix(o), l = this.checkMatrix(l);
      let s = o.rows, u = o.columns, h = new this(s, u);
      for (let _ = 0; _ < s; _++)
        for (let x = 0; x < u; x++)
          h.set(_, x, Math.max(o.get(_, x), l.get(_, x)));
      return h;
    }
    static checkMatrix(o) {
      return fe.isMatrix(o) ? o : new Z(o);
    }
    static isMatrix(o) {
      return o != null && o.klass === "Matrix";
    }
    get size() {
      return this.rows * this.columns;
    }
    apply(o) {
      if (typeof o != "function")
        throw new TypeError("callback must be a function");
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          o.call(this, l, s);
      return this;
    }
    to1DArray() {
      let o = [];
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          o.push(this.get(l, s));
      return o;
    }
    to2DArray() {
      let o = [];
      for (let l = 0; l < this.rows; l++) {
        o.push([]);
        for (let s = 0; s < this.columns; s++)
          o[l].push(this.get(l, s));
      }
      return o;
    }
    toJSON() {
      return this.to2DArray();
    }
    isRowVector() {
      return this.rows === 1;
    }
    isColumnVector() {
      return this.columns === 1;
    }
    isVector() {
      return this.rows === 1 || this.columns === 1;
    }
    isSquare() {
      return this.rows === this.columns;
    }
    isEmpty() {
      return this.rows === 0 || this.columns === 0;
    }
    isSymmetric() {
      if (this.isSquare()) {
        for (let o = 0; o < this.rows; o++)
          for (let l = 0; l <= o; l++)
            if (this.get(o, l) !== this.get(l, o))
              return !1;
        return !0;
      }
      return !1;
    }
    isDistance() {
      if (!this.isSymmetric()) return !1;
      for (let o = 0; o < this.rows; o++)
        if (this.get(o, o) !== 0) return !1;
      return !0;
    }
    isEchelonForm() {
      let o = 0, l = 0, s = -1, u = !0, h = !1;
      for (; o < this.rows && u; ) {
        for (l = 0, h = !1; l < this.columns && h === !1; )
          this.get(o, l) === 0 ? l++ : this.get(o, l) === 1 && l > s ? (h = !0, s = l) : (u = !1, h = !0);
        o++;
      }
      return u;
    }
    isReducedEchelonForm() {
      let o = 0, l = 0, s = -1, u = !0, h = !1;
      for (; o < this.rows && u; ) {
        for (l = 0, h = !1; l < this.columns && h === !1; )
          this.get(o, l) === 0 ? l++ : this.get(o, l) === 1 && l > s ? (h = !0, s = l) : (u = !1, h = !0);
        for (let _ = l + 1; _ < this.rows; _++)
          this.get(o, _) !== 0 && (u = !1);
        o++;
      }
      return u;
    }
    echelonForm() {
      let o = this.clone(), l = 0, s = 0;
      for (; l < o.rows && s < o.columns; ) {
        let u = l;
        for (let h = l; h < o.rows; h++)
          o.get(h, s) > o.get(u, s) && (u = h);
        if (o.get(u, s) === 0)
          s++;
        else {
          o.swapRows(l, u);
          let h = o.get(l, s);
          for (let _ = s; _ < o.columns; _++)
            o.set(l, _, o.get(l, _) / h);
          for (let _ = l + 1; _ < o.rows; _++) {
            let x = o.get(_, s) / o.get(l, s);
            o.set(_, s, 0);
            for (let M = s + 1; M < o.columns; M++)
              o.set(_, M, o.get(_, M) - o.get(l, M) * x);
          }
          l++, s++;
        }
      }
      return o;
    }
    reducedEchelonForm() {
      let o = this.echelonForm(), l = o.columns, s = o.rows, u = s - 1;
      for (; u >= 0; )
        if (o.maxRow(u) === 0)
          u--;
        else {
          let h = 0, _ = !1;
          for (; h < s && _ === !1; )
            o.get(u, h) === 1 ? _ = !0 : h++;
          for (let x = 0; x < u; x++) {
            let M = o.get(x, h);
            for (let k = h; k < l; k++) {
              let j = o.get(x, k) - M * o.get(u, k);
              o.set(x, k, j);
            }
          }
          u--;
        }
      return o;
    }
    set() {
      throw new Error("set method is unimplemented");
    }
    get() {
      throw new Error("get method is unimplemented");
    }
    repeat(o = {}) {
      if (typeof o != "object")
        throw new TypeError("options must be an object");
      const { rows: l = 1, columns: s = 1 } = o;
      if (!Number.isInteger(l) || l <= 0)
        throw new TypeError("rows must be a positive integer");
      if (!Number.isInteger(s) || s <= 0)
        throw new TypeError("columns must be a positive integer");
      let u = new Z(this.rows * l, this.columns * s);
      for (let h = 0; h < l; h++)
        for (let _ = 0; _ < s; _++)
          u.setSubMatrix(this, this.rows * h, this.columns * _);
      return u;
    }
    fill(o) {
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, o);
      return this;
    }
    neg() {
      return this.mulS(-1);
    }
    getRow(o) {
      m(this, o);
      let l = [];
      for (let s = 0; s < this.columns; s++)
        l.push(this.get(o, s));
      return l;
    }
    getRowVector(o) {
      return Z.rowVector(this.getRow(o));
    }
    setRow(o, l) {
      m(this, o), l = b(this, l);
      for (let s = 0; s < this.columns; s++)
        this.set(o, s, l[s]);
      return this;
    }
    swapRows(o, l) {
      m(this, o), m(this, l);
      for (let s = 0; s < this.columns; s++) {
        let u = this.get(o, s);
        this.set(o, s, this.get(l, s)), this.set(l, s, u);
      }
      return this;
    }
    getColumn(o) {
      g(this, o);
      let l = [];
      for (let s = 0; s < this.rows; s++)
        l.push(this.get(s, o));
      return l;
    }
    getColumnVector(o) {
      return Z.columnVector(this.getColumn(o));
    }
    setColumn(o, l) {
      g(this, o), l = T(this, l);
      for (let s = 0; s < this.rows; s++)
        this.set(s, o, l[s]);
      return this;
    }
    swapColumns(o, l) {
      g(this, o), g(this, l);
      for (let s = 0; s < this.rows; s++) {
        let u = this.get(s, o);
        this.set(s, o, this.get(s, l)), this.set(s, l, u);
      }
      return this;
    }
    addRowVector(o) {
      o = b(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) + o[s]);
      return this;
    }
    subRowVector(o) {
      o = b(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) - o[s]);
      return this;
    }
    mulRowVector(o) {
      o = b(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) * o[s]);
      return this;
    }
    divRowVector(o) {
      o = b(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) / o[s]);
      return this;
    }
    addColumnVector(o) {
      o = T(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) + o[l]);
      return this;
    }
    subColumnVector(o) {
      o = T(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) - o[l]);
      return this;
    }
    mulColumnVector(o) {
      o = T(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) * o[l]);
      return this;
    }
    divColumnVector(o) {
      o = T(this, o);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          this.set(l, s, this.get(l, s) / o[l]);
      return this;
    }
    mulRow(o, l) {
      m(this, o);
      for (let s = 0; s < this.columns; s++)
        this.set(o, s, this.get(o, s) * l);
      return this;
    }
    mulColumn(o, l) {
      g(this, o);
      for (let s = 0; s < this.rows; s++)
        this.set(s, o, this.get(s, o) * l);
      return this;
    }
    max(o) {
      if (this.isEmpty())
        return NaN;
      switch (o) {
        case "row": {
          const l = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) > l[s] && (l[s] = this.get(s, u));
          return l;
        }
        case "column": {
          const l = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) > l[u] && (l[u] = this.get(s, u));
          return l;
        }
        case void 0: {
          let l = this.get(0, 0);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) > l && (l = this.get(s, u));
          return l;
        }
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    maxIndex() {
      U(this);
      let o = this.get(0, 0), l = [0, 0];
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.get(s, u) > o && (o = this.get(s, u), l[0] = s, l[1] = u);
      return l;
    }
    min(o) {
      if (this.isEmpty())
        return NaN;
      switch (o) {
        case "row": {
          const l = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) < l[s] && (l[s] = this.get(s, u));
          return l;
        }
        case "column": {
          const l = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) < l[u] && (l[u] = this.get(s, u));
          return l;
        }
        case void 0: {
          let l = this.get(0, 0);
          for (let s = 0; s < this.rows; s++)
            for (let u = 0; u < this.columns; u++)
              this.get(s, u) < l && (l = this.get(s, u));
          return l;
        }
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    minIndex() {
      U(this);
      let o = this.get(0, 0), l = [0, 0];
      for (let s = 0; s < this.rows; s++)
        for (let u = 0; u < this.columns; u++)
          this.get(s, u) < o && (o = this.get(s, u), l[0] = s, l[1] = u);
      return l;
    }
    maxRow(o) {
      if (m(this, o), this.isEmpty())
        return NaN;
      let l = this.get(o, 0);
      for (let s = 1; s < this.columns; s++)
        this.get(o, s) > l && (l = this.get(o, s));
      return l;
    }
    maxRowIndex(o) {
      m(this, o), U(this);
      let l = this.get(o, 0), s = [o, 0];
      for (let u = 1; u < this.columns; u++)
        this.get(o, u) > l && (l = this.get(o, u), s[1] = u);
      return s;
    }
    minRow(o) {
      if (m(this, o), this.isEmpty())
        return NaN;
      let l = this.get(o, 0);
      for (let s = 1; s < this.columns; s++)
        this.get(o, s) < l && (l = this.get(o, s));
      return l;
    }
    minRowIndex(o) {
      m(this, o), U(this);
      let l = this.get(o, 0), s = [o, 0];
      for (let u = 1; u < this.columns; u++)
        this.get(o, u) < l && (l = this.get(o, u), s[1] = u);
      return s;
    }
    maxColumn(o) {
      if (g(this, o), this.isEmpty())
        return NaN;
      let l = this.get(0, o);
      for (let s = 1; s < this.rows; s++)
        this.get(s, o) > l && (l = this.get(s, o));
      return l;
    }
    maxColumnIndex(o) {
      g(this, o), U(this);
      let l = this.get(0, o), s = [0, o];
      for (let u = 1; u < this.rows; u++)
        this.get(u, o) > l && (l = this.get(u, o), s[0] = u);
      return s;
    }
    minColumn(o) {
      if (g(this, o), this.isEmpty())
        return NaN;
      let l = this.get(0, o);
      for (let s = 1; s < this.rows; s++)
        this.get(s, o) < l && (l = this.get(s, o));
      return l;
    }
    minColumnIndex(o) {
      g(this, o), U(this);
      let l = this.get(0, o), s = [0, o];
      for (let u = 1; u < this.rows; u++)
        this.get(u, o) < l && (l = this.get(u, o), s[0] = u);
      return s;
    }
    diag() {
      let o = Math.min(this.rows, this.columns), l = [];
      for (let s = 0; s < o; s++)
        l.push(this.get(s, s));
      return l;
    }
    norm(o = "frobenius") {
      switch (o) {
        case "max":
          return this.max();
        case "frobenius":
          return Math.sqrt(this.dot(this));
        default:
          throw new RangeError(`unknown norm type: ${o}`);
      }
    }
    cumulativeSum() {
      let o = 0;
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          o += this.get(l, s), this.set(l, s, o);
      return this;
    }
    dot(o) {
      fe.isMatrix(o) && (o = o.to1DArray());
      let l = this.to1DArray();
      if (l.length !== o.length)
        throw new RangeError("vectors do not have the same size");
      let s = 0;
      for (let u = 0; u < l.length; u++)
        s += l[u] * o[u];
      return s;
    }
    mmul(o) {
      o = Z.checkMatrix(o);
      let l = this.rows, s = this.columns, u = o.columns, h = new Z(l, u), _ = new Float64Array(s);
      for (let x = 0; x < u; x++) {
        for (let M = 0; M < s; M++)
          _[M] = o.get(M, x);
        for (let M = 0; M < l; M++) {
          let k = 0;
          for (let j = 0; j < s; j++)
            k += this.get(M, j) * _[j];
          h.set(M, x, k);
        }
      }
      return h;
    }
    mpow(o) {
      if (!this.isSquare())
        throw new RangeError("Matrix must be square");
      if (!Number.isInteger(o) || o < 0)
        throw new RangeError("Exponent must be a non-negative integer");
      let l = Z.eye(this.rows), s = this;
      for (let u = o; u >= 1; u /= 2)
        (u & 1) !== 0 && (l = l.mmul(s)), s = s.mmul(s);
      return l;
    }
    strassen2x2(o) {
      o = Z.checkMatrix(o);
      let l = new Z(2, 2);
      const s = this.get(0, 0), u = o.get(0, 0), h = this.get(0, 1), _ = o.get(0, 1), x = this.get(1, 0), M = o.get(1, 0), k = this.get(1, 1), j = o.get(1, 1), I = (s + k) * (u + j), W = (x + k) * u, ue = s * (_ - j), q = k * (M - u), Y = (s + h) * j, ge = (x - s) * (u + _), A = (h - k) * (M + j), le = I + q - Y + A, ye = ue + Y, Te = W + q, Pe = I - W + ue + ge;
      return l.set(0, 0, le), l.set(0, 1, ye), l.set(1, 0, Te), l.set(1, 1, Pe), l;
    }
    strassen3x3(o) {
      o = Z.checkMatrix(o);
      let l = new Z(3, 3);
      const s = this.get(0, 0), u = this.get(0, 1), h = this.get(0, 2), _ = this.get(1, 0), x = this.get(1, 1), M = this.get(1, 2), k = this.get(2, 0), j = this.get(2, 1), I = this.get(2, 2), W = o.get(0, 0), ue = o.get(0, 1), q = o.get(0, 2), Y = o.get(1, 0), ge = o.get(1, 1), A = o.get(1, 2), le = o.get(2, 0), ye = o.get(2, 1), Te = o.get(2, 2), Pe = (s + u + h - _ - x - j - I) * ge, Je = (s - _) * (-ue + ge), v = x * (-W + ue + Y - ge - A - le + Te), E = (-s + _ + x) * (W - ue + ge), R = (_ + x) * (-W + ue), y = s * W, N = (-s + k + j) * (W - q + A), B = (-s + k) * (q - A), G = (k + j) * (-W + q), Re = (s + u + h - x - M - k - j) * A, xe = j * (-W + q + Y - ge - A - le + ye), Xe = (-h + j + I) * (ge + le - ye), He = (h - I) * (ge - ye), nt = h * le, Qt = (j + I) * (-le + ye), lt = (-h + x + M) * (A + le - Te), nn = (h - M) * (A - Te), pn = (x + M) * (-le + Te), Fe = u * Y, ht = M * ye, Ot = _ * q, $t = k * ue, at = I * Te, xu = y + nt + Fe, Su = Pe + E + R + y + Xe + nt + Qt, Eu = y + N + G + Re + nt + lt + pn, Mu = Je + v + E + y + nt + lt + nn, ku = Je + E + R + y + ht, Tu = nt + lt + nn + pn + Ot, Nu = y + N + B + xe + Xe + He + nt, Cu = Xe + He + nt + Qt + $t, Ru = y + N + B + G + at;
      return l.set(0, 0, xu), l.set(0, 1, Su), l.set(0, 2, Eu), l.set(1, 0, Mu), l.set(1, 1, ku), l.set(1, 2, Tu), l.set(2, 0, Nu), l.set(2, 1, Cu), l.set(2, 2, Ru), l;
    }
    mmulStrassen(o) {
      o = Z.checkMatrix(o);
      let l = this.clone(), s = l.rows, u = l.columns, h = o.rows, _ = o.columns;
      u !== h && console.warn(
        `Multiplying ${s} x ${u} and ${h} x ${_} matrix: dimensions do not match.`
      );
      function x(I, W, ue) {
        let q = I.rows, Y = I.columns;
        if (q === W && Y === ue)
          return I;
        {
          let ge = fe.zeros(W, ue);
          return ge = ge.setSubMatrix(I, 0, 0), ge;
        }
      }
      let M = Math.max(s, h), k = Math.max(u, _);
      l = x(l, M, k), o = x(o, M, k);
      function j(I, W, ue, q) {
        if (ue <= 512 || q <= 512)
          return I.mmul(W);
        ue % 2 === 1 && q % 2 === 1 ? (I = x(I, ue + 1, q + 1), W = x(W, ue + 1, q + 1)) : ue % 2 === 1 ? (I = x(I, ue + 1, q), W = x(W, ue + 1, q)) : q % 2 === 1 && (I = x(I, ue, q + 1), W = x(W, ue, q + 1));
        let Y = parseInt(I.rows / 2, 10), ge = parseInt(I.columns / 2, 10), A = I.subMatrix(0, Y - 1, 0, ge - 1), le = W.subMatrix(0, Y - 1, 0, ge - 1), ye = I.subMatrix(0, Y - 1, ge, I.columns - 1), Te = W.subMatrix(0, Y - 1, ge, W.columns - 1), Pe = I.subMatrix(Y, I.rows - 1, 0, ge - 1), Je = W.subMatrix(Y, W.rows - 1, 0, ge - 1), v = I.subMatrix(Y, I.rows - 1, ge, I.columns - 1), E = W.subMatrix(Y, W.rows - 1, ge, W.columns - 1), R = j(
          fe.add(A, v),
          fe.add(le, E),
          Y,
          ge
        ), y = j(fe.add(Pe, v), le, Y, ge), N = j(A, fe.sub(Te, E), Y, ge), B = j(v, fe.sub(Je, le), Y, ge), G = j(fe.add(A, ye), E, Y, ge), Re = j(
          fe.sub(Pe, A),
          fe.add(le, Te),
          Y,
          ge
        ), xe = j(
          fe.sub(ye, v),
          fe.add(Je, E),
          Y,
          ge
        ), Xe = fe.add(R, B);
        Xe.sub(G), Xe.add(xe);
        let He = fe.add(N, G), nt = fe.add(y, B), Qt = fe.sub(R, y);
        Qt.add(N), Qt.add(Re);
        let lt = fe.zeros(2 * Xe.rows, 2 * Xe.columns);
        return lt = lt.setSubMatrix(Xe, 0, 0), lt = lt.setSubMatrix(He, Xe.rows, 0), lt = lt.setSubMatrix(nt, 0, Xe.columns), lt = lt.setSubMatrix(Qt, Xe.rows, Xe.columns), lt.subMatrix(0, ue - 1, 0, q - 1);
      }
      return j(l, o, M, k);
    }
    scaleRows(o = {}) {
      if (typeof o != "object")
        throw new TypeError("options must be an object");
      const { min: l = 0, max: s = 1 } = o;
      if (!Number.isFinite(l)) throw new TypeError("min must be a number");
      if (!Number.isFinite(s)) throw new TypeError("max must be a number");
      if (l >= s) throw new RangeError("min must be smaller than max");
      let u = new Z(this.rows, this.columns);
      for (let h = 0; h < this.rows; h++) {
        const _ = this.getRow(h);
        _.length > 0 && t(_, { min: l, max: s, output: _ }), u.setRow(h, _);
      }
      return u;
    }
    scaleColumns(o = {}) {
      if (typeof o != "object")
        throw new TypeError("options must be an object");
      const { min: l = 0, max: s = 1 } = o;
      if (!Number.isFinite(l)) throw new TypeError("min must be a number");
      if (!Number.isFinite(s)) throw new TypeError("max must be a number");
      if (l >= s) throw new RangeError("min must be smaller than max");
      let u = new Z(this.rows, this.columns);
      for (let h = 0; h < this.columns; h++) {
        const _ = this.getColumn(h);
        _.length && t(_, {
          min: l,
          max: s,
          output: _
        }), u.setColumn(h, _);
      }
      return u;
    }
    flipRows() {
      const o = Math.ceil(this.columns / 2);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < o; s++) {
          let u = this.get(l, s), h = this.get(l, this.columns - 1 - s);
          this.set(l, s, h), this.set(l, this.columns - 1 - s, u);
        }
      return this;
    }
    flipColumns() {
      const o = Math.ceil(this.rows / 2);
      for (let l = 0; l < this.columns; l++)
        for (let s = 0; s < o; s++) {
          let u = this.get(s, l), h = this.get(this.rows - 1 - s, l);
          this.set(s, l, h), this.set(this.rows - 1 - s, l, u);
        }
      return this;
    }
    kroneckerProduct(o) {
      o = Z.checkMatrix(o);
      let l = this.rows, s = this.columns, u = o.rows, h = o.columns, _ = new Z(l * u, s * h);
      for (let x = 0; x < l; x++)
        for (let M = 0; M < s; M++)
          for (let k = 0; k < u; k++)
            for (let j = 0; j < h; j++)
              _.set(u * x + k, h * M + j, this.get(x, M) * o.get(k, j));
      return _;
    }
    kroneckerSum(o) {
      if (o = Z.checkMatrix(o), !this.isSquare() || !o.isSquare())
        throw new Error("Kronecker Sum needs two Square Matrices");
      let l = this.rows, s = o.rows, u = this.kroneckerProduct(Z.eye(s, s)), h = Z.eye(l, l).kroneckerProduct(o);
      return u.add(h);
    }
    transpose() {
      let o = new Z(this.columns, this.rows);
      for (let l = 0; l < this.rows; l++)
        for (let s = 0; s < this.columns; s++)
          o.set(s, l, this.get(l, s));
      return o;
    }
    sortRows(o = Qe) {
      for (let l = 0; l < this.rows; l++)
        this.setRow(l, this.getRow(l).sort(o));
      return this;
    }
    sortColumns(o = Qe) {
      for (let l = 0; l < this.columns; l++)
        this.setColumn(l, this.getColumn(l).sort(o));
      return this;
    }
    subMatrix(o, l, s, u) {
      z(this, o, l, s, u);
      let h = new Z(
        l - o + 1,
        u - s + 1
      );
      for (let _ = o; _ <= l; _++)
        for (let x = s; x <= u; x++)
          h.set(_ - o, x - s, this.get(_, x));
      return h;
    }
    subMatrixRow(o, l, s) {
      if (l === void 0 && (l = 0), s === void 0 && (s = this.columns - 1), l > s || l < 0 || l >= this.columns || s < 0 || s >= this.columns)
        throw new RangeError("Argument out of range");
      let u = new Z(o.length, s - l + 1);
      for (let h = 0; h < o.length; h++)
        for (let _ = l; _ <= s; _++) {
          if (o[h] < 0 || o[h] >= this.rows)
            throw new RangeError(`Row index out of range: ${o[h]}`);
          u.set(h, _ - l, this.get(o[h], _));
        }
      return u;
    }
    subMatrixColumn(o, l, s) {
      if (l === void 0 && (l = 0), s === void 0 && (s = this.rows - 1), l > s || l < 0 || l >= this.rows || s < 0 || s >= this.rows)
        throw new RangeError("Argument out of range");
      let u = new Z(s - l + 1, o.length);
      for (let h = 0; h < o.length; h++)
        for (let _ = l; _ <= s; _++) {
          if (o[h] < 0 || o[h] >= this.columns)
            throw new RangeError(`Column index out of range: ${o[h]}`);
          u.set(_ - l, h, this.get(_, o[h]));
        }
      return u;
    }
    setSubMatrix(o, l, s) {
      if (o = Z.checkMatrix(o), o.isEmpty())
        return this;
      let u = l + o.rows - 1, h = s + o.columns - 1;
      z(this, l, u, s, h);
      for (let _ = 0; _ < o.rows; _++)
        for (let x = 0; x < o.columns; x++)
          this.set(l + _, s + x, o.get(_, x));
      return this;
    }
    selection(o, l) {
      L(this, o), O(this, l);
      let s = new Z(o.length, l.length);
      for (let u = 0; u < o.length; u++) {
        let h = o[u];
        for (let _ = 0; _ < l.length; _++) {
          let x = l[_];
          s.set(u, _, this.get(h, x));
        }
      }
      return s;
    }
    trace() {
      let o = Math.min(this.rows, this.columns), l = 0;
      for (let s = 0; s < o; s++)
        l += this.get(s, s);
      return l;
    }
    clone() {
      return this.constructor.copy(this, new Z(this.rows, this.columns));
    }
    /**
     * @template {AbstractMatrix} M
     * @param {AbstractMatrix} from
     * @param {M} to
     * @return {M}
     */
    static copy(o, l) {
      for (const [s, u, h] of o.entries())
        l.set(s, u, h);
      return l;
    }
    sum(o) {
      switch (o) {
        case "row":
          return C(this);
        case "column":
          return V(this);
        case void 0:
          return se(this);
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    product(o) {
      switch (o) {
        case "row":
          return oe(this);
        case "column":
          return we(this);
        case void 0:
          return ke(this);
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    mean(o) {
      const l = this.sum(o);
      switch (o) {
        case "row": {
          for (let s = 0; s < this.rows; s++)
            l[s] /= this.columns;
          return l;
        }
        case "column": {
          for (let s = 0; s < this.columns; s++)
            l[s] /= this.rows;
          return l;
        }
        case void 0:
          return l / this.size;
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    variance(o, l = {}) {
      if (typeof o == "object" && (l = o, o = void 0), typeof l != "object")
        throw new TypeError("options must be an object");
      const { unbiased: s = !0, mean: u = this.mean(o) } = l;
      if (typeof s != "boolean")
        throw new TypeError("unbiased must be a boolean");
      switch (o) {
        case "row": {
          if (!e.isAnyArray(u))
            throw new TypeError("mean must be an array");
          return ce(this, s, u);
        }
        case "column": {
          if (!e.isAnyArray(u))
            throw new TypeError("mean must be an array");
          return ve(this, s, u);
        }
        case void 0: {
          if (typeof u != "number")
            throw new TypeError("mean must be a number");
          return Ae(this, s, u);
        }
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    standardDeviation(o, l) {
      typeof o == "object" && (l = o, o = void 0);
      const s = this.variance(o, l);
      if (o === void 0)
        return Math.sqrt(s);
      for (let u = 0; u < s.length; u++)
        s[u] = Math.sqrt(s[u]);
      return s;
    }
    center(o, l = {}) {
      if (typeof o == "object" && (l = o, o = void 0), typeof l != "object")
        throw new TypeError("options must be an object");
      const { center: s = this.mean(o) } = l;
      switch (o) {
        case "row": {
          if (!e.isAnyArray(s))
            throw new TypeError("center must be an array");
          return de(this, s), this;
        }
        case "column": {
          if (!e.isAnyArray(s))
            throw new TypeError("center must be an array");
          return $(this, s), this;
        }
        case void 0: {
          if (typeof s != "number")
            throw new TypeError("center must be a number");
          return ae(this, s), this;
        }
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    scale(o, l = {}) {
      if (typeof o == "object" && (l = o, o = void 0), typeof l != "object")
        throw new TypeError("options must be an object");
      let s = l.scale;
      switch (o) {
        case "row": {
          if (s === void 0)
            s = X(this);
          else if (!e.isAnyArray(s))
            throw new TypeError("scale must be an array");
          return ne(this, s), this;
        }
        case "column": {
          if (s === void 0)
            s = re(this);
          else if (!e.isAnyArray(s))
            throw new TypeError("scale must be an array");
          return be(this, s), this;
        }
        case void 0: {
          if (s === void 0)
            s = Me(this);
          else if (typeof s != "number")
            throw new TypeError("scale must be a number");
          return Le(this, s), this;
        }
        default:
          throw new Error(`invalid option: ${o}`);
      }
    }
    toString(o) {
      return a(this, o);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    /**
     * iterator from left to right, from top to bottom
     * yield [row, column, value]
     * @returns {Generator<[number, number, number], void, void>}
     */
    *entries() {
      for (let o = 0; o < this.rows; o++)
        for (let l = 0; l < this.columns; l++)
          yield [o, l, this.get(o, l)];
    }
    /**
     * iterator from left to right, from top to bottom
     * yield value
     * @returns {Generator<number, void, void>}
     */
    *values() {
      for (let o = 0; o < this.rows; o++)
        for (let l = 0; l < this.columns; l++)
          yield this.get(o, l);
    }
  }
  fe.prototype.klass = "Matrix", typeof Symbol < "u" && (fe.prototype[Symbol.for("nodejs.util.inspect.custom")] = i);
  function Qe(w, o) {
    return w - o;
  }
  function Ue(w) {
    return w.every((o) => typeof o == "number");
  }
  fe.random = fe.rand, fe.randomInt = fe.randInt, fe.diagonal = fe.diag, fe.prototype.diagonal = fe.prototype.diag, fe.identity = fe.eye, fe.prototype.negate = fe.prototype.neg, fe.prototype.tensorProduct = fe.prototype.kroneckerProduct;
  class Z extends fe {
    /**
     * @type {Float64Array[]}
     */
    data;
    /**
     * Init an empty matrix
     * @param {number} nRows
     * @param {number} nColumns
     */
    #e(o, l) {
      if (this.data = [], Number.isInteger(l) && l >= 0)
        for (let s = 0; s < o; s++)
          this.data.push(new Float64Array(l));
      else
        throw new TypeError("nColumns must be a positive integer");
      this.rows = o, this.columns = l;
    }
    constructor(o, l) {
      if (super(), Z.isMatrix(o))
        this.#e(o.rows, o.columns), Z.copy(o, this);
      else if (Number.isInteger(o) && o >= 0)
        this.#e(o, l);
      else if (e.isAnyArray(o)) {
        const s = o;
        if (o = s.length, l = o ? s[0].length : 0, typeof l != "number")
          throw new TypeError(
            "Data must be a 2D array with at least one element"
          );
        this.data = [];
        for (let u = 0; u < o; u++) {
          if (s[u].length !== l)
            throw new RangeError("Inconsistent array dimensions");
          if (!Ue(s[u]))
            throw new TypeError("Input data contains non-numeric values");
          this.data.push(Float64Array.from(s[u]));
        }
        this.rows = o, this.columns = l;
      } else
        throw new TypeError(
          "First argument must be a positive number or an array"
        );
    }
    set(o, l, s) {
      return this.data[o][l] = s, this;
    }
    get(o, l) {
      return this.data[o][l];
    }
    removeRow(o) {
      return m(this, o), this.data.splice(o, 1), this.rows -= 1, this;
    }
    addRow(o, l) {
      return l === void 0 && (l = o, o = this.rows), m(this, o, !0), l = Float64Array.from(b(this, l)), this.data.splice(o, 0, l), this.rows += 1, this;
    }
    removeColumn(o) {
      g(this, o);
      for (let l = 0; l < this.rows; l++) {
        const s = new Float64Array(this.columns - 1);
        for (let u = 0; u < o; u++)
          s[u] = this.data[l][u];
        for (let u = o + 1; u < this.columns; u++)
          s[u - 1] = this.data[l][u];
        this.data[l] = s;
      }
      return this.columns -= 1, this;
    }
    addColumn(o, l) {
      typeof l > "u" && (l = o, o = this.columns), g(this, o, !0), l = T(this, l);
      for (let s = 0; s < this.rows; s++) {
        const u = new Float64Array(this.columns + 1);
        let h = 0;
        for (; h < o; h++)
          u[h] = this.data[s][h];
        for (u[h++] = l[s]; h < this.columns + 1; h++)
          u[h] = this.data[s][h - 1];
        this.data[s] = u;
      }
      return this.columns += 1, this;
    }
  }
  p(fe, Z);
  class De extends fe {
    /** @type {Matrix} */
    #e;
    get size() {
      return this.#e.size;
    }
    get rows() {
      return this.#e.rows;
    }
    get columns() {
      return this.#e.columns;
    }
    get diagonalSize() {
      return this.rows;
    }
    /**
     * not the same as matrix.isSymmetric()
     * Here is to check if it's instanceof SymmetricMatrix without bundling issues
     *
     * @param value
     * @returns {boolean}
     */
    static isSymmetricMatrix(o) {
      return Z.isMatrix(o) && o.klassType === "SymmetricMatrix";
    }
    /**
     * @param diagonalSize
     * @return {SymmetricMatrix}
     */
    static zeros(o) {
      return new this(o);
    }
    /**
     * @param diagonalSize
     * @return {SymmetricMatrix}
     */
    static ones(o) {
      return new this(o).fill(1);
    }
    /**
     * @param {number | AbstractMatrix | ArrayLike<ArrayLike<number>>} diagonalSize
     * @return {this}
     */
    constructor(o) {
      if (super(), Z.isMatrix(o)) {
        if (!o.isSymmetric())
          throw new TypeError("not symmetric data");
        this.#e = Z.copy(
          o,
          new Z(o.rows, o.rows)
        );
      } else if (Number.isInteger(o) && o >= 0)
        this.#e = new Z(o, o);
      else if (this.#e = new Z(o), !this.isSymmetric())
        throw new TypeError("not symmetric data");
    }
    clone() {
      const o = new De(this.diagonalSize);
      for (const [l, s, u] of this.upperRightEntries())
        o.set(l, s, u);
      return o;
    }
    toMatrix() {
      return new Z(this);
    }
    get(o, l) {
      return this.#e.get(o, l);
    }
    set(o, l, s) {
      return this.#e.set(o, l, s), this.#e.set(l, o, s), this;
    }
    removeCross(o) {
      return this.#e.removeRow(o), this.#e.removeColumn(o), this;
    }
    addCross(o, l) {
      l === void 0 && (l = o, o = this.diagonalSize);
      const s = l.slice();
      return s.splice(o, 1), this.#e.addRow(o, s), this.#e.addColumn(o, l), this;
    }
    /**
     * @param {Mask[]} mask
     */
    applyMask(o) {
      if (o.length !== this.diagonalSize)
        throw new RangeError("Mask size do not match with matrix size");
      const l = [];
      for (const [s, u] of o.entries())
        u || l.push(s);
      l.reverse();
      for (const s of l)
        this.removeCross(s);
      return this;
    }
    /**
     * Compact format upper-right corner of matrix
     * iterate from left to right, from top to bottom.
     *
     * ```
     *   A B C D
     * A 1 2 3 4
     * B 2 5 6 7
     * C 3 6 8 9
     * D 4 7 9 10
     * ```
     *
     * will return compact 1D array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
     *
     * length is S(i=0, n=sideSize) => 10 for a 4 sideSized matrix
     *
     * @returns {number[]}
     */
    toCompact() {
      const { diagonalSize: o } = this, l = new Array(o * (o + 1) / 2);
      for (let s = 0, u = 0, h = 0; h < l.length; h++)
        l[h] = this.get(u, s), ++s >= o && (s = ++u);
      return l;
    }
    /**
     * @param {number[]} compact
     * @return {SymmetricMatrix}
     */
    static fromCompact(o) {
      const l = o.length, s = (Math.sqrt(8 * l + 1) - 1) / 2;
      if (!Number.isInteger(s))
        throw new TypeError(
          `This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(
            o
          )}`
        );
      const u = new De(s);
      for (let h = 0, _ = 0, x = 0; x < l; x++)
        u.set(h, _, o[x]), ++h >= s && (h = ++_);
      return u;
    }
    /**
     * half iterator upper-right-corner from left to right, from top to bottom
     * yield [row, column, value]
     *
     * @returns {Generator<[number, number, number], void, void>}
     */
    *upperRightEntries() {
      for (let o = 0, l = 0; o < this.diagonalSize; void 0) {
        const s = this.get(o, l);
        yield [o, l, s], ++l >= this.diagonalSize && (l = ++o);
      }
    }
    /**
     * half iterator upper-right-corner from left to right, from top to bottom
     * yield value
     *
     * @returns {Generator<[number, number, number], void, void>}
     */
    *upperRightValues() {
      for (let o = 0, l = 0; o < this.diagonalSize; void 0)
        yield this.get(o, l), ++l >= this.diagonalSize && (l = ++o);
    }
  }
  De.prototype.klassType = "SymmetricMatrix";
  class We extends De {
    /**
     * not the same as matrix.isSymmetric()
     * Here is to check if it's instanceof SymmetricMatrix without bundling issues
     *
     * @param value
     * @returns {boolean}
     */
    static isDistanceMatrix(o) {
      return De.isSymmetricMatrix(o) && o.klassSubType === "DistanceMatrix";
    }
    constructor(o) {
      if (super(o), !this.isDistance())
        throw new TypeError("Provided arguments do no produce a distance matrix");
    }
    set(o, l, s) {
      return o === l && (s = 0), super.set(o, l, s);
    }
    addCross(o, l) {
      return l === void 0 && (l = o, o = this.diagonalSize), l = l.slice(), l[o] = 0, super.addCross(o, l);
    }
    toSymmetricMatrix() {
      return new De(this);
    }
    clone() {
      const o = new We(this.diagonalSize);
      for (const [l, s, u] of this.upperRightEntries())
        l !== s && o.set(l, s, u);
      return o;
    }
    /**
     * Compact format upper-right corner of matrix
     * no diagonal (only zeros)
     * iterable from left to right, from top to bottom.
     *
     * ```
     *   A B C D
     * A 0 1 2 3
     * B 1 0 4 5
     * C 2 4 0 6
     * D 3 5 6 0
     * ```
     *
     * will return compact 1D array `[1, 2, 3, 4, 5, 6]`
     *
     * length is S(i=0, n=sideSize-1) => 6 for a 4 side sized matrix
     *
     * @returns {number[]}
     */
    toCompact() {
      const { diagonalSize: o } = this, l = (o - 1) * o / 2, s = new Array(l);
      for (let u = 1, h = 0, _ = 0; _ < s.length; _++)
        s[_] = this.get(h, u), ++u >= o && (u = ++h + 1);
      return s;
    }
    /**
     * @param {number[]} compact
     */
    static fromCompact(o) {
      const l = o.length;
      if (l === 0)
        return new this(0);
      const s = (Math.sqrt(8 * l + 1) + 1) / 2;
      if (!Number.isInteger(s))
        throw new TypeError(
          `This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(
            o
          )}`
        );
      const u = new this(s);
      for (let h = 1, _ = 0, x = 0; x < l; x++)
        u.set(h, _, o[x]), ++h >= s && (h = ++_ + 1);
      return u;
    }
  }
  We.prototype.klassSubType = "DistanceMatrix";
  class Be extends fe {
    constructor(o, l, s) {
      super(), this.matrix = o, this.rows = l, this.columns = s;
    }
  }
  class ot extends Be {
    constructor(o, l) {
      g(o, l), super(o, o.rows, 1), this.column = l;
    }
    set(o, l, s) {
      return this.matrix.set(o, this.column, s), this;
    }
    get(o) {
      return this.matrix.get(o, this.column);
    }
  }
  class wt extends Be {
    constructor(o, l) {
      O(o, l), super(o, o.rows, l.length), this.columnIndices = l;
    }
    set(o, l, s) {
      return this.matrix.set(o, this.columnIndices[l], s), this;
    }
    get(o, l) {
      return this.matrix.get(o, this.columnIndices[l]);
    }
  }
  class Yt extends Be {
    constructor(o) {
      super(o, o.rows, o.columns);
    }
    set(o, l, s) {
      return this.matrix.set(o, this.columns - l - 1, s), this;
    }
    get(o, l) {
      return this.matrix.get(o, this.columns - l - 1);
    }
  }
  class P extends Be {
    constructor(o) {
      super(o, o.rows, o.columns);
    }
    set(o, l, s) {
      return this.matrix.set(this.rows - o - 1, l, s), this;
    }
    get(o, l) {
      return this.matrix.get(this.rows - o - 1, l);
    }
  }
  class F extends Be {
    constructor(o, l) {
      m(o, l), super(o, 1, o.columns), this.row = l;
    }
    set(o, l, s) {
      return this.matrix.set(this.row, l, s), this;
    }
    get(o, l) {
      return this.matrix.get(this.row, l);
    }
  }
  class K extends Be {
    constructor(o, l) {
      L(o, l), super(o, l.length, o.columns), this.rowIndices = l;
    }
    set(o, l, s) {
      return this.matrix.set(this.rowIndices[o], l, s), this;
    }
    get(o, l) {
      return this.matrix.get(this.rowIndices[o], l);
    }
  }
  class te extends Be {
    constructor(o, l, s) {
      L(o, l), O(o, s), super(o, l.length, s.length), this.rowIndices = l, this.columnIndices = s;
    }
    set(o, l, s) {
      return this.matrix.set(
        this.rowIndices[o],
        this.columnIndices[l],
        s
      ), this;
    }
    get(o, l) {
      return this.matrix.get(
        this.rowIndices[o],
        this.columnIndices[l]
      );
    }
  }
  class H extends Be {
    constructor(o, l, s, u, h) {
      z(o, l, s, u, h), super(o, s - l + 1, h - u + 1), this.startRow = l, this.startColumn = u;
    }
    set(o, l, s) {
      return this.matrix.set(
        this.startRow + o,
        this.startColumn + l,
        s
      ), this;
    }
    get(o, l) {
      return this.matrix.get(
        this.startRow + o,
        this.startColumn + l
      );
    }
  }
  class ee extends Be {
    constructor(o) {
      super(o, o.columns, o.rows);
    }
    set(o, l, s) {
      return this.matrix.set(l, o, s), this;
    }
    get(o, l) {
      return this.matrix.get(l, o);
    }
  }
  class pe extends fe {
    constructor(o, l = {}) {
      const { rows: s = 1 } = l;
      if (o.length % s !== 0)
        throw new Error("the data length is not divisible by the number of rows");
      super(), this.rows = s, this.columns = o.length / s, this.data = o;
    }
    set(o, l, s) {
      let u = this._calculateIndex(o, l);
      return this.data[u] = s, this;
    }
    get(o, l) {
      let s = this._calculateIndex(o, l);
      return this.data[s];
    }
    _calculateIndex(o, l) {
      return o * this.columns + l;
    }
  }
  class ie extends fe {
    constructor(o) {
      super(), this.data = o, this.rows = o.length, this.columns = o[0].length;
    }
    set(o, l, s) {
      return this.data[o][l] = s, this;
    }
    get(o, l) {
      return this.data[o][l];
    }
  }
  function he(w, o) {
    if (e.isAnyArray(w))
      return w[0] && e.isAnyArray(w[0]) ? new ie(w) : new pe(w, o);
    throw new Error("the argument is not an array");
  }
  class Q {
    constructor(o) {
      o = ie.checkMatrix(o);
      let l = o.clone(), s = l.rows, u = l.columns, h = new Float64Array(s), _ = 1, x, M, k, j, I, W, ue, q, Y;
      for (x = 0; x < s; x++)
        h[x] = x;
      for (q = new Float64Array(s), M = 0; M < u; M++) {
        for (x = 0; x < s; x++)
          q[x] = l.get(x, M);
        for (x = 0; x < s; x++) {
          for (Y = Math.min(x, M), I = 0, k = 0; k < Y; k++)
            I += l.get(x, k) * q[k];
          q[x] -= I, l.set(x, M, q[x]);
        }
        for (j = M, x = M + 1; x < s; x++)
          Math.abs(q[x]) > Math.abs(q[j]) && (j = x);
        if (j !== M) {
          for (k = 0; k < u; k++)
            W = l.get(j, k), l.set(j, k, l.get(M, k)), l.set(M, k, W);
          ue = h[j], h[j] = h[M], h[M] = ue, _ = -_;
        }
        if (M < s && l.get(M, M) !== 0)
          for (x = M + 1; x < s; x++)
            l.set(x, M, l.get(x, M) / l.get(M, M));
      }
      this.LU = l, this.pivotVector = h, this.pivotSign = _;
    }
    isSingular() {
      let o = this.LU, l = o.columns;
      for (let s = 0; s < l; s++)
        if (o.get(s, s) === 0)
          return !0;
      return !1;
    }
    solve(o) {
      o = Z.checkMatrix(o);
      let l = this.LU;
      if (l.rows !== o.rows)
        throw new Error("Invalid matrix dimensions");
      if (this.isSingular())
        throw new Error("LU matrix is singular");
      let u = o.columns, h = o.subMatrixRow(this.pivotVector, 0, u - 1), _ = l.columns, x, M, k;
      for (k = 0; k < _; k++)
        for (x = k + 1; x < _; x++)
          for (M = 0; M < u; M++)
            h.set(x, M, h.get(x, M) - h.get(k, M) * l.get(x, k));
      for (k = _ - 1; k >= 0; k--) {
        for (M = 0; M < u; M++)
          h.set(k, M, h.get(k, M) / l.get(k, k));
        for (x = 0; x < k; x++)
          for (M = 0; M < u; M++)
            h.set(x, M, h.get(x, M) - h.get(k, M) * l.get(x, k));
      }
      return h;
    }
    get determinant() {
      let o = this.LU;
      if (!o.isSquare())
        throw new Error("Matrix must be square");
      let l = this.pivotSign, s = o.columns;
      for (let u = 0; u < s; u++)
        l *= o.get(u, u);
      return l;
    }
    get lowerTriangularMatrix() {
      let o = this.LU, l = o.rows, s = o.columns, u = new Z(l, s);
      for (let h = 0; h < l; h++)
        for (let _ = 0; _ < s; _++)
          h > _ ? u.set(h, _, o.get(h, _)) : h === _ ? u.set(h, _, 1) : u.set(h, _, 0);
      return u;
    }
    get upperTriangularMatrix() {
      let o = this.LU, l = o.rows, s = o.columns, u = new Z(l, s);
      for (let h = 0; h < l; h++)
        for (let _ = 0; _ < s; _++)
          h <= _ ? u.set(h, _, o.get(h, _)) : u.set(h, _, 0);
      return u;
    }
    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }
  }
  function Ee(w, o) {
    let l = 0;
    return Math.abs(w) > Math.abs(o) ? (l = o / w, Math.abs(w) * Math.sqrt(1 + l * l)) : o !== 0 ? (l = w / o, Math.abs(o) * Math.sqrt(1 + l * l)) : 0;
  }
  class me {
    constructor(o) {
      o = ie.checkMatrix(o);
      let l = o.clone(), s = o.rows, u = o.columns, h = new Float64Array(u), _, x, M, k;
      for (M = 0; M < u; M++) {
        let j = 0;
        for (_ = M; _ < s; _++)
          j = Ee(j, l.get(_, M));
        if (j !== 0) {
          for (l.get(M, M) < 0 && (j = -j), _ = M; _ < s; _++)
            l.set(_, M, l.get(_, M) / j);
          for (l.set(M, M, l.get(M, M) + 1), x = M + 1; x < u; x++) {
            for (k = 0, _ = M; _ < s; _++)
              k += l.get(_, M) * l.get(_, x);
            for (k = -k / l.get(M, M), _ = M; _ < s; _++)
              l.set(_, x, l.get(_, x) + k * l.get(_, M));
          }
        }
        h[M] = -j;
      }
      this.QR = l, this.Rdiag = h;
    }
    solve(o) {
      o = Z.checkMatrix(o);
      let l = this.QR, s = l.rows;
      if (o.rows !== s)
        throw new Error("Matrix row dimensions must agree");
      if (!this.isFullRank())
        throw new Error("Matrix is rank deficient");
      let u = o.columns, h = o.clone(), _ = l.columns, x, M, k, j;
      for (k = 0; k < _; k++)
        for (M = 0; M < u; M++) {
          for (j = 0, x = k; x < s; x++)
            j += l.get(x, k) * h.get(x, M);
          for (j = -j / l.get(k, k), x = k; x < s; x++)
            h.set(x, M, h.get(x, M) + j * l.get(x, k));
        }
      for (k = _ - 1; k >= 0; k--) {
        for (M = 0; M < u; M++)
          h.set(k, M, h.get(k, M) / this.Rdiag[k]);
        for (x = 0; x < k; x++)
          for (M = 0; M < u; M++)
            h.set(x, M, h.get(x, M) - h.get(k, M) * l.get(x, k));
      }
      return h.subMatrix(0, _ - 1, 0, u - 1);
    }
    isFullRank() {
      let o = this.QR.columns;
      for (let l = 0; l < o; l++)
        if (this.Rdiag[l] === 0)
          return !1;
      return !0;
    }
    get upperTriangularMatrix() {
      let o = this.QR, l = o.columns, s = new Z(l, l), u, h;
      for (u = 0; u < l; u++)
        for (h = 0; h < l; h++)
          u < h ? s.set(u, h, o.get(u, h)) : u === h ? s.set(u, h, this.Rdiag[u]) : s.set(u, h, 0);
      return s;
    }
    get orthogonalMatrix() {
      let o = this.QR, l = o.rows, s = o.columns, u = new Z(l, s), h, _, x, M;
      for (x = s - 1; x >= 0; x--) {
        for (h = 0; h < l; h++)
          u.set(h, x, 0);
        for (u.set(x, x, 1), _ = x; _ < s; _++)
          if (o.get(x, x) !== 0) {
            for (M = 0, h = x; h < l; h++)
              M += o.get(h, x) * u.get(h, _);
            for (M = -M / o.get(x, x), h = x; h < l; h++)
              u.set(h, _, u.get(h, _) + M * o.get(h, x));
          }
      }
      return u;
    }
  }
  class _e {
    constructor(o, l = {}) {
      if (o = ie.checkMatrix(o), o.isEmpty())
        throw new Error("Matrix must be non-empty");
      let s = o.rows, u = o.columns;
      const {
        computeLeftSingularVectors: h = !0,
        computeRightSingularVectors: _ = !0,
        autoTranspose: x = !1
      } = l;
      let M = !!h, k = !!_, j = !1, I;
      if (s < u)
        if (!x)
          I = o.clone(), console.warn(
            "Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose"
          );
        else {
          I = o.transpose(), s = I.rows, u = I.columns, j = !0;
          let y = M;
          M = k, k = y;
        }
      else
        I = o.clone();
      let W = Math.min(s, u), ue = Math.min(s + 1, u), q = new Float64Array(ue), Y = new Z(s, W), ge = new Z(u, u), A = new Float64Array(u), le = new Float64Array(s), ye = new Float64Array(ue);
      for (let y = 0; y < ue; y++) ye[y] = y;
      let Te = Math.min(s - 1, u), Pe = Math.max(0, Math.min(u - 2, s)), Je = Math.max(Te, Pe);
      for (let y = 0; y < Je; y++) {
        if (y < Te) {
          q[y] = 0;
          for (let N = y; N < s; N++)
            q[y] = Ee(q[y], I.get(N, y));
          if (q[y] !== 0) {
            I.get(y, y) < 0 && (q[y] = -q[y]);
            for (let N = y; N < s; N++)
              I.set(N, y, I.get(N, y) / q[y]);
            I.set(y, y, I.get(y, y) + 1);
          }
          q[y] = -q[y];
        }
        for (let N = y + 1; N < u; N++) {
          if (y < Te && q[y] !== 0) {
            let B = 0;
            for (let G = y; G < s; G++)
              B += I.get(G, y) * I.get(G, N);
            B = -B / I.get(y, y);
            for (let G = y; G < s; G++)
              I.set(G, N, I.get(G, N) + B * I.get(G, y));
          }
          A[N] = I.get(y, N);
        }
        if (M && y < Te)
          for (let N = y; N < s; N++)
            Y.set(N, y, I.get(N, y));
        if (y < Pe) {
          A[y] = 0;
          for (let N = y + 1; N < u; N++)
            A[y] = Ee(A[y], A[N]);
          if (A[y] !== 0) {
            A[y + 1] < 0 && (A[y] = 0 - A[y]);
            for (let N = y + 1; N < u; N++)
              A[N] /= A[y];
            A[y + 1] += 1;
          }
          if (A[y] = -A[y], y + 1 < s && A[y] !== 0) {
            for (let N = y + 1; N < s; N++)
              le[N] = 0;
            for (let N = y + 1; N < s; N++)
              for (let B = y + 1; B < u; B++)
                le[N] += A[B] * I.get(N, B);
            for (let N = y + 1; N < u; N++) {
              let B = -A[N] / A[y + 1];
              for (let G = y + 1; G < s; G++)
                I.set(G, N, I.get(G, N) + B * le[G]);
            }
          }
          if (k)
            for (let N = y + 1; N < u; N++)
              ge.set(N, y, A[N]);
        }
      }
      let v = Math.min(u, s + 1);
      if (Te < u && (q[Te] = I.get(Te, Te)), s < v && (q[v - 1] = 0), Pe + 1 < v && (A[Pe] = I.get(Pe, v - 1)), A[v - 1] = 0, M) {
        for (let y = Te; y < W; y++) {
          for (let N = 0; N < s; N++)
            Y.set(N, y, 0);
          Y.set(y, y, 1);
        }
        for (let y = Te - 1; y >= 0; y--)
          if (q[y] !== 0) {
            for (let N = y + 1; N < W; N++) {
              let B = 0;
              for (let G = y; G < s; G++)
                B += Y.get(G, y) * Y.get(G, N);
              B = -B / Y.get(y, y);
              for (let G = y; G < s; G++)
                Y.set(G, N, Y.get(G, N) + B * Y.get(G, y));
            }
            for (let N = y; N < s; N++)
              Y.set(N, y, -Y.get(N, y));
            Y.set(y, y, 1 + Y.get(y, y));
            for (let N = 0; N < y - 1; N++)
              Y.set(N, y, 0);
          } else {
            for (let N = 0; N < s; N++)
              Y.set(N, y, 0);
            Y.set(y, y, 1);
          }
      }
      if (k)
        for (let y = u - 1; y >= 0; y--) {
          if (y < Pe && A[y] !== 0)
            for (let N = y + 1; N < u; N++) {
              let B = 0;
              for (let G = y + 1; G < u; G++)
                B += ge.get(G, y) * ge.get(G, N);
              B = -B / ge.get(y + 1, y);
              for (let G = y + 1; G < u; G++)
                ge.set(G, N, ge.get(G, N) + B * ge.get(G, y));
            }
          for (let N = 0; N < u; N++)
            ge.set(N, y, 0);
          ge.set(y, y, 1);
        }
      let E = v - 1, R = Number.EPSILON;
      for (; v > 0; ) {
        let y, N;
        for (y = v - 2; y >= -1 && y !== -1; y--) {
          const B = Number.MIN_VALUE + R * Math.abs(q[y] + Math.abs(q[y + 1]));
          if (Math.abs(A[y]) <= B || Number.isNaN(A[y])) {
            A[y] = 0;
            break;
          }
        }
        if (y === v - 2)
          N = 4;
        else {
          let B;
          for (B = v - 1; B >= y && B !== y; B--) {
            let G = (B !== v ? Math.abs(A[B]) : 0) + (B !== y + 1 ? Math.abs(A[B - 1]) : 0);
            if (Math.abs(q[B]) <= R * G) {
              q[B] = 0;
              break;
            }
          }
          B === y ? N = 3 : B === v - 1 ? N = 1 : (N = 2, y = B);
        }
        switch (y++, N) {
          case 1: {
            let B = A[v - 2];
            A[v - 2] = 0;
            for (let G = v - 2; G >= y; G--) {
              let Re = Ee(q[G], B), xe = q[G] / Re, Xe = B / Re;
              if (q[G] = Re, G !== y && (B = -Xe * A[G - 1], A[G - 1] = xe * A[G - 1]), k)
                for (let He = 0; He < u; He++)
                  Re = xe * ge.get(He, G) + Xe * ge.get(He, v - 1), ge.set(He, v - 1, -Xe * ge.get(He, G) + xe * ge.get(He, v - 1)), ge.set(He, G, Re);
            }
            break;
          }
          case 2: {
            let B = A[y - 1];
            A[y - 1] = 0;
            for (let G = y; G < v; G++) {
              let Re = Ee(q[G], B), xe = q[G] / Re, Xe = B / Re;
              if (q[G] = Re, B = -Xe * A[G], A[G] = xe * A[G], M)
                for (let He = 0; He < s; He++)
                  Re = xe * Y.get(He, G) + Xe * Y.get(He, y - 1), Y.set(He, y - 1, -Xe * Y.get(He, G) + xe * Y.get(He, y - 1)), Y.set(He, G, Re);
            }
            break;
          }
          case 3: {
            const B = Math.max(
              Math.abs(q[v - 1]),
              Math.abs(q[v - 2]),
              Math.abs(A[v - 2]),
              Math.abs(q[y]),
              Math.abs(A[y])
            ), G = q[v - 1] / B, Re = q[v - 2] / B, xe = A[v - 2] / B, Xe = q[y] / B, He = A[y] / B, nt = ((Re + G) * (Re - G) + xe * xe) / 2, Qt = G * xe * (G * xe);
            let lt = 0;
            (nt !== 0 || Qt !== 0) && (nt < 0 ? lt = 0 - Math.sqrt(nt * nt + Qt) : lt = Math.sqrt(nt * nt + Qt), lt = Qt / (nt + lt));
            let nn = (Xe + G) * (Xe - G) + lt, pn = Xe * He;
            for (let Fe = y; Fe < v - 1; Fe++) {
              let ht = Ee(nn, pn);
              ht === 0 && (ht = Number.MIN_VALUE);
              let Ot = nn / ht, $t = pn / ht;
              if (Fe !== y && (A[Fe - 1] = ht), nn = Ot * q[Fe] + $t * A[Fe], A[Fe] = Ot * A[Fe] - $t * q[Fe], pn = $t * q[Fe + 1], q[Fe + 1] = Ot * q[Fe + 1], k)
                for (let at = 0; at < u; at++)
                  ht = Ot * ge.get(at, Fe) + $t * ge.get(at, Fe + 1), ge.set(at, Fe + 1, -$t * ge.get(at, Fe) + Ot * ge.get(at, Fe + 1)), ge.set(at, Fe, ht);
              if (ht = Ee(nn, pn), ht === 0 && (ht = Number.MIN_VALUE), Ot = nn / ht, $t = pn / ht, q[Fe] = ht, nn = Ot * A[Fe] + $t * q[Fe + 1], q[Fe + 1] = -$t * A[Fe] + Ot * q[Fe + 1], pn = $t * A[Fe + 1], A[Fe + 1] = Ot * A[Fe + 1], M && Fe < s - 1)
                for (let at = 0; at < s; at++)
                  ht = Ot * Y.get(at, Fe) + $t * Y.get(at, Fe + 1), Y.set(at, Fe + 1, -$t * Y.get(at, Fe) + Ot * Y.get(at, Fe + 1)), Y.set(at, Fe, ht);
            }
            A[v - 2] = nn;
            break;
          }
          case 4: {
            if (q[y] <= 0 && (q[y] = q[y] < 0 ? -q[y] : 0, k))
              for (let B = 0; B <= E; B++)
                ge.set(B, y, -ge.get(B, y));
            for (; y < E && !(q[y] >= q[y + 1]); ) {
              let B = q[y];
              if (q[y] = q[y + 1], q[y + 1] = B, k && y < u - 1)
                for (let G = 0; G < u; G++)
                  B = ge.get(G, y + 1), ge.set(G, y + 1, ge.get(G, y)), ge.set(G, y, B);
              if (M && y < s - 1)
                for (let G = 0; G < s; G++)
                  B = Y.get(G, y + 1), Y.set(G, y + 1, Y.get(G, y)), Y.set(G, y, B);
              y++;
            }
            v--;
            break;
          }
        }
      }
      if (j) {
        let y = ge;
        ge = Y, Y = y;
      }
      this.m = s, this.n = u, this.s = q, this.U = Y, this.V = ge;
    }
    solve(o) {
      let l = o, s = this.threshold, u = this.s.length, h = Z.zeros(u, u);
      for (let W = 0; W < u; W++)
        Math.abs(this.s[W]) <= s ? h.set(W, W, 0) : h.set(W, W, 1 / this.s[W]);
      let _ = this.U, x = this.rightSingularVectors, M = x.mmul(h), k = x.rows, j = _.rows, I = Z.zeros(k, j);
      for (let W = 0; W < k; W++)
        for (let ue = 0; ue < j; ue++) {
          let q = 0;
          for (let Y = 0; Y < u; Y++)
            q += M.get(W, Y) * _.get(ue, Y);
          I.set(W, ue, q);
        }
      return I.mmul(l);
    }
    solveForDiagonal(o) {
      return this.solve(Z.diag(o));
    }
    inverse() {
      let o = this.V, l = this.threshold, s = o.rows, u = o.columns, h = new Z(s, this.s.length);
      for (let j = 0; j < s; j++)
        for (let I = 0; I < u; I++)
          Math.abs(this.s[I]) > l && h.set(j, I, o.get(j, I) / this.s[I]);
      let _ = this.U, x = _.rows, M = _.columns, k = new Z(s, x);
      for (let j = 0; j < s; j++)
        for (let I = 0; I < x; I++) {
          let W = 0;
          for (let ue = 0; ue < M; ue++)
            W += h.get(j, ue) * _.get(I, ue);
          k.set(j, I, W);
        }
      return k;
    }
    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }
    get norm2() {
      return this.s[0];
    }
    get rank() {
      let o = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON, l = 0, s = this.s;
      for (let u = 0, h = s.length; u < h; u++)
        s[u] > o && l++;
      return l;
    }
    get diagonal() {
      return Array.from(this.s);
    }
    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }
    get leftSingularVectors() {
      return this.U;
    }
    get rightSingularVectors() {
      return this.V;
    }
    get diagonalMatrix() {
      return Z.diag(this.s);
    }
  }
  function Ne(w, o = !1) {
    return w = ie.checkMatrix(w), o ? new _e(w).inverse() : $e(w, Z.eye(w.rows));
  }
  function $e(w, o, l = !1) {
    return w = ie.checkMatrix(w), o = ie.checkMatrix(o), l ? new _e(w).solve(o) : w.isSquare() ? new Q(w).solve(o) : new me(w).solve(o);
  }
  function Ve(w) {
    if (w = Z.checkMatrix(w), w.isSquare()) {
      if (w.columns === 0)
        return 1;
      let o, l, s, u;
      if (w.columns === 2)
        return o = w.get(0, 0), l = w.get(0, 1), s = w.get(1, 0), u = w.get(1, 1), o * u - l * s;
      if (w.columns === 3) {
        let h, _, x;
        return h = new te(w, [1, 2], [1, 2]), _ = new te(w, [1, 2], [0, 2]), x = new te(w, [1, 2], [0, 1]), o = w.get(0, 0), l = w.get(0, 1), s = w.get(0, 2), o * Ve(h) - l * Ve(_) + s * Ve(x);
      } else
        return new Q(w).determinant;
    } else
      throw Error("determinant can only be calculated for a square matrix");
  }
  function Ce(w, o) {
    let l = [];
    for (let s = 0; s < w; s++)
      s !== o && l.push(s);
    return l;
  }
  function ut(w, o, l, s = 1e-9, u = 1e-9) {
    if (w > u)
      return new Array(o.rows + 1).fill(0);
    {
      let h = o.addRow(l, [0]);
      for (let _ = 0; _ < h.rows; _++)
        Math.abs(h.get(_, 0)) < s && h.set(_, 0, 0);
      return h.to1DArray();
    }
  }
  function ct(w, o = {}) {
    const { thresholdValue: l = 1e-9, thresholdError: s = 1e-9 } = o;
    w = Z.checkMatrix(w);
    let u = w.rows, h = new Z(u, u);
    for (let _ = 0; _ < u; _++) {
      let x = Z.columnVector(w.getRow(_)), M = w.subMatrixRow(Ce(u, _)).transpose(), j = new _e(M).solve(x), I = Z.sub(x, M.mmul(j)).abs().max();
      h.setRow(
        _,
        ut(I, j, _, l, s)
      );
    }
    return h;
  }
  function yt(w, o = Number.EPSILON) {
    if (w = Z.checkMatrix(w), w.isEmpty())
      return w.transpose();
    let l = new _e(w, { autoTranspose: !0 }), s = l.leftSingularVectors, u = l.rightSingularVectors, h = l.diagonal;
    for (let _ = 0; _ < h.length; _++)
      Math.abs(h[_]) > o ? h[_] = 1 / h[_] : h[_] = 0;
    return u.mmul(Z.diag(h).mmul(s.transpose()));
  }
  function Ct(w, o = w, l = {}) {
    w = new Z(w);
    let s = !1;
    if (typeof o == "object" && !Z.isMatrix(o) && !e.isAnyArray(o) ? (l = o, o = w, s = !0) : o = new Z(o), w.rows !== o.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: u = !0 } = l;
    u && (w = w.center("column"), s || (o = o.center("column")));
    const h = w.transpose().mmul(o);
    for (let _ = 0; _ < h.rows; _++)
      for (let x = 0; x < h.columns; x++)
        h.set(_, x, h.get(_, x) * (1 / (w.rows - 1)));
    return h;
  }
  function dn(w, o = w, l = {}) {
    w = new Z(w);
    let s = !1;
    if (typeof o == "object" && !Z.isMatrix(o) && !e.isAnyArray(o) ? (l = o, o = w, s = !0) : o = new Z(o), w.rows !== o.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: u = !0, scale: h = !0 } = l;
    u && (w.center("column"), s || o.center("column")), h && (w.scale("column"), s || o.scale("column"));
    const _ = w.standardDeviation("column", { unbiased: !0 }), x = s ? _ : o.standardDeviation("column", { unbiased: !0 }), M = w.transpose().mmul(o);
    for (let k = 0; k < M.rows; k++)
      for (let j = 0; j < M.columns; j++)
        M.set(
          k,
          j,
          M.get(k, j) * (1 / (_[k] * x[j])) * (1 / (w.rows - 1))
        );
    return M;
  }
  class Tn {
    constructor(o, l = {}) {
      const { assumeSymmetric: s = !1 } = l;
      if (o = ie.checkMatrix(o), !o.isSquare())
        throw new Error("Matrix is not a square matrix");
      if (o.isEmpty())
        throw new Error("Matrix must be non-empty");
      let u = o.columns, h = new Z(u, u), _ = new Float64Array(u), x = new Float64Array(u), M = o, k, j, I = !1;
      if (s ? I = !0 : I = o.isSymmetric(), I) {
        for (k = 0; k < u; k++)
          for (j = 0; j < u; j++)
            h.set(k, j, M.get(k, j));
        ft(u, x, _, h), Rt(u, x, _, h);
      } else {
        let W = new Z(u, u), ue = new Float64Array(u);
        for (j = 0; j < u; j++)
          for (k = 0; k < u; k++)
            W.set(k, j, M.get(k, j));
        Fn(u, W, ue, h), Jn(u, x, _, h, W);
      }
      this.n = u, this.e = x, this.d = _, this.V = h;
    }
    get realEigenvalues() {
      return Array.from(this.d);
    }
    get imaginaryEigenvalues() {
      return Array.from(this.e);
    }
    get eigenvectorMatrix() {
      return this.V;
    }
    get diagonalMatrix() {
      let o = this.n, l = this.e, s = this.d, u = new Z(o, o), h, _;
      for (h = 0; h < o; h++) {
        for (_ = 0; _ < o; _++)
          u.set(h, _, 0);
        u.set(h, h, s[h]), l[h] > 0 ? u.set(h, h + 1, l[h]) : l[h] < 0 && u.set(h, h - 1, l[h]);
      }
      return u;
    }
  }
  function ft(w, o, l, s) {
    let u, h, _, x, M, k, j, I;
    for (M = 0; M < w; M++)
      l[M] = s.get(w - 1, M);
    for (x = w - 1; x > 0; x--) {
      for (I = 0, _ = 0, k = 0; k < x; k++)
        I = I + Math.abs(l[k]);
      if (I === 0)
        for (o[x] = l[x - 1], M = 0; M < x; M++)
          l[M] = s.get(x - 1, M), s.set(x, M, 0), s.set(M, x, 0);
      else {
        for (k = 0; k < x; k++)
          l[k] /= I, _ += l[k] * l[k];
        for (u = l[x - 1], h = Math.sqrt(_), u > 0 && (h = -h), o[x] = I * h, _ = _ - u * h, l[x - 1] = u - h, M = 0; M < x; M++)
          o[M] = 0;
        for (M = 0; M < x; M++) {
          for (u = l[M], s.set(M, x, u), h = o[M] + s.get(M, M) * u, k = M + 1; k <= x - 1; k++)
            h += s.get(k, M) * l[k], o[k] += s.get(k, M) * u;
          o[M] = h;
        }
        for (u = 0, M = 0; M < x; M++)
          o[M] /= _, u += o[M] * l[M];
        for (j = u / (_ + _), M = 0; M < x; M++)
          o[M] -= j * l[M];
        for (M = 0; M < x; M++) {
          for (u = l[M], h = o[M], k = M; k <= x - 1; k++)
            s.set(k, M, s.get(k, M) - (u * o[k] + h * l[k]));
          l[M] = s.get(x - 1, M), s.set(x, M, 0);
        }
      }
      l[x] = _;
    }
    for (x = 0; x < w - 1; x++) {
      if (s.set(w - 1, x, s.get(x, x)), s.set(x, x, 1), _ = l[x + 1], _ !== 0) {
        for (k = 0; k <= x; k++)
          l[k] = s.get(k, x + 1) / _;
        for (M = 0; M <= x; M++) {
          for (h = 0, k = 0; k <= x; k++)
            h += s.get(k, x + 1) * s.get(k, M);
          for (k = 0; k <= x; k++)
            s.set(k, M, s.get(k, M) - h * l[k]);
        }
      }
      for (k = 0; k <= x; k++)
        s.set(k, x + 1, 0);
    }
    for (M = 0; M < w; M++)
      l[M] = s.get(w - 1, M), s.set(w - 1, M, 0);
    s.set(w - 1, w - 1, 1), o[0] = 0;
  }
  function Rt(w, o, l, s) {
    let u, h, _, x, M, k, j, I, W, ue, q, Y, ge, A, le, ye;
    for (_ = 1; _ < w; _++)
      o[_ - 1] = o[_];
    o[w - 1] = 0;
    let Te = 0, Pe = 0, Je = Number.EPSILON;
    for (k = 0; k < w; k++) {
      for (Pe = Math.max(Pe, Math.abs(l[k]) + Math.abs(o[k])), j = k; j < w && !(Math.abs(o[j]) <= Je * Pe); )
        j++;
      if (j > k)
        do {
          for (u = l[k], I = (l[k + 1] - u) / (2 * o[k]), W = Ee(I, 1), I < 0 && (W = -W), l[k] = o[k] / (I + W), l[k + 1] = o[k] * (I + W), ue = l[k + 1], h = u - l[k], _ = k + 2; _ < w; _++)
            l[_] -= h;
          for (Te = Te + h, I = l[j], q = 1, Y = q, ge = q, A = o[k + 1], le = 0, ye = 0, _ = j - 1; _ >= k; _--)
            for (ge = Y, Y = q, ye = le, u = q * o[_], h = q * I, W = Ee(I, o[_]), o[_ + 1] = le * W, le = o[_] / W, q = I / W, I = q * l[_] - le * u, l[_ + 1] = h + le * (q * u + le * l[_]), M = 0; M < w; M++)
              h = s.get(M, _ + 1), s.set(M, _ + 1, le * s.get(M, _) + q * h), s.set(M, _, q * s.get(M, _) - le * h);
          I = -le * ye * ge * A * o[k] / ue, o[k] = le * I, l[k] = q * I;
        } while (Math.abs(o[k]) > Je * Pe);
      l[k] = l[k] + Te, o[k] = 0;
    }
    for (_ = 0; _ < w - 1; _++) {
      for (M = _, I = l[_], x = _ + 1; x < w; x++)
        l[x] < I && (M = x, I = l[x]);
      if (M !== _)
        for (l[M] = l[_], l[_] = I, x = 0; x < w; x++)
          I = s.get(x, _), s.set(x, _, s.get(x, M)), s.set(x, M, I);
    }
  }
  function Fn(w, o, l, s) {
    let u = 0, h = w - 1, _, x, M, k, j, I, W;
    for (I = u + 1; I <= h - 1; I++) {
      for (W = 0, k = I; k <= h; k++)
        W = W + Math.abs(o.get(k, I - 1));
      if (W !== 0) {
        for (M = 0, k = h; k >= I; k--)
          l[k] = o.get(k, I - 1) / W, M += l[k] * l[k];
        for (x = Math.sqrt(M), l[I] > 0 && (x = -x), M = M - l[I] * x, l[I] = l[I] - x, j = I; j < w; j++) {
          for (_ = 0, k = h; k >= I; k--)
            _ += l[k] * o.get(k, j);
          for (_ = _ / M, k = I; k <= h; k++)
            o.set(k, j, o.get(k, j) - _ * l[k]);
        }
        for (k = 0; k <= h; k++) {
          for (_ = 0, j = h; j >= I; j--)
            _ += l[j] * o.get(k, j);
          for (_ = _ / M, j = I; j <= h; j++)
            o.set(k, j, o.get(k, j) - _ * l[j]);
        }
        l[I] = W * l[I], o.set(I, I - 1, W * x);
      }
    }
    for (k = 0; k < w; k++)
      for (j = 0; j < w; j++)
        s.set(k, j, k === j ? 1 : 0);
    for (I = h - 1; I >= u + 1; I--)
      if (o.get(I, I - 1) !== 0) {
        for (k = I + 1; k <= h; k++)
          l[k] = o.get(k, I - 1);
        for (j = I; j <= h; j++) {
          for (x = 0, k = I; k <= h; k++)
            x += l[k] * s.get(k, j);
          for (x = x / l[I] / o.get(I, I - 1), k = I; k <= h; k++)
            s.set(k, j, s.get(k, j) + x * l[k]);
        }
      }
  }
  function Jn(w, o, l, s, u) {
    let h = w - 1, _ = 0, x = w - 1, M = Number.EPSILON, k = 0, j = 0, I = 0, W = 0, ue = 0, q = 0, Y = 0, ge = 0, A, le, ye, Te, Pe, Je, v, E, R, y, N, B, G, Re, xe;
    for (A = 0; A < w; A++)
      for ((A < _ || A > x) && (l[A] = u.get(A, A), o[A] = 0), le = Math.max(A - 1, 0); le < w; le++)
        j = j + Math.abs(u.get(A, le));
    for (; h >= _; ) {
      for (Te = h; Te > _ && (q = Math.abs(u.get(Te - 1, Te - 1)) + Math.abs(u.get(Te, Te)), q === 0 && (q = j), !(Math.abs(u.get(Te, Te - 1)) < M * q)); )
        Te--;
      if (Te === h)
        u.set(h, h, u.get(h, h) + k), l[h] = u.get(h, h), o[h] = 0, h--, ge = 0;
      else if (Te === h - 1) {
        if (v = u.get(h, h - 1) * u.get(h - 1, h), I = (u.get(h - 1, h - 1) - u.get(h, h)) / 2, W = I * I + v, Y = Math.sqrt(Math.abs(W)), u.set(h, h, u.get(h, h) + k), u.set(h - 1, h - 1, u.get(h - 1, h - 1) + k), E = u.get(h, h), W >= 0) {
          for (Y = I >= 0 ? I + Y : I - Y, l[h - 1] = E + Y, l[h] = l[h - 1], Y !== 0 && (l[h] = E - v / Y), o[h - 1] = 0, o[h] = 0, E = u.get(h, h - 1), q = Math.abs(E) + Math.abs(Y), I = E / q, W = Y / q, ue = Math.sqrt(I * I + W * W), I = I / ue, W = W / ue, le = h - 1; le < w; le++)
            Y = u.get(h - 1, le), u.set(h - 1, le, W * Y + I * u.get(h, le)), u.set(h, le, W * u.get(h, le) - I * Y);
          for (A = 0; A <= h; A++)
            Y = u.get(A, h - 1), u.set(A, h - 1, W * Y + I * u.get(A, h)), u.set(A, h, W * u.get(A, h) - I * Y);
          for (A = _; A <= x; A++)
            Y = s.get(A, h - 1), s.set(A, h - 1, W * Y + I * s.get(A, h)), s.set(A, h, W * s.get(A, h) - I * Y);
        } else
          l[h - 1] = E + I, l[h] = E + I, o[h - 1] = Y, o[h] = -Y;
        h = h - 2, ge = 0;
      } else {
        if (E = u.get(h, h), R = 0, v = 0, Te < h && (R = u.get(h - 1, h - 1), v = u.get(h, h - 1) * u.get(h - 1, h)), ge === 10) {
          for (k += E, A = _; A <= h; A++)
            u.set(A, A, u.get(A, A) - E);
          q = Math.abs(u.get(h, h - 1)) + Math.abs(u.get(h - 1, h - 2)), E = R = 0.75 * q, v = -0.4375 * q * q;
        }
        if (ge === 30 && (q = (R - E) / 2, q = q * q + v, q > 0)) {
          for (q = Math.sqrt(q), R < E && (q = -q), q = E - v / ((R - E) / 2 + q), A = _; A <= h; A++)
            u.set(A, A, u.get(A, A) - q);
          k += q, E = R = v = 0.964;
        }
        for (ge = ge + 1, Pe = h - 2; Pe >= Te && (Y = u.get(Pe, Pe), ue = E - Y, q = R - Y, I = (ue * q - v) / u.get(Pe + 1, Pe) + u.get(Pe, Pe + 1), W = u.get(Pe + 1, Pe + 1) - Y - ue - q, ue = u.get(Pe + 2, Pe + 1), q = Math.abs(I) + Math.abs(W) + Math.abs(ue), I = I / q, W = W / q, ue = ue / q, !(Pe === Te || Math.abs(u.get(Pe, Pe - 1)) * (Math.abs(W) + Math.abs(ue)) < M * (Math.abs(I) * (Math.abs(u.get(Pe - 1, Pe - 1)) + Math.abs(Y) + Math.abs(u.get(Pe + 1, Pe + 1)))))); )
          Pe--;
        for (A = Pe + 2; A <= h; A++)
          u.set(A, A - 2, 0), A > Pe + 2 && u.set(A, A - 3, 0);
        for (ye = Pe; ye <= h - 1 && (Re = ye !== h - 1, ye !== Pe && (I = u.get(ye, ye - 1), W = u.get(ye + 1, ye - 1), ue = Re ? u.get(ye + 2, ye - 1) : 0, E = Math.abs(I) + Math.abs(W) + Math.abs(ue), E !== 0 && (I = I / E, W = W / E, ue = ue / E)), E !== 0); ye++)
          if (q = Math.sqrt(I * I + W * W + ue * ue), I < 0 && (q = -q), q !== 0) {
            for (ye !== Pe ? u.set(ye, ye - 1, -q * E) : Te !== Pe && u.set(ye, ye - 1, -u.get(ye, ye - 1)), I = I + q, E = I / q, R = W / q, Y = ue / q, W = W / I, ue = ue / I, le = ye; le < w; le++)
              I = u.get(ye, le) + W * u.get(ye + 1, le), Re && (I = I + ue * u.get(ye + 2, le), u.set(ye + 2, le, u.get(ye + 2, le) - I * Y)), u.set(ye, le, u.get(ye, le) - I * E), u.set(ye + 1, le, u.get(ye + 1, le) - I * R);
            for (A = 0; A <= Math.min(h, ye + 3); A++)
              I = E * u.get(A, ye) + R * u.get(A, ye + 1), Re && (I = I + Y * u.get(A, ye + 2), u.set(A, ye + 2, u.get(A, ye + 2) - I * ue)), u.set(A, ye, u.get(A, ye) - I), u.set(A, ye + 1, u.get(A, ye + 1) - I * W);
            for (A = _; A <= x; A++)
              I = E * s.get(A, ye) + R * s.get(A, ye + 1), Re && (I = I + Y * s.get(A, ye + 2), s.set(A, ye + 2, s.get(A, ye + 2) - I * ue)), s.set(A, ye, s.get(A, ye) - I), s.set(A, ye + 1, s.get(A, ye + 1) - I * W);
          }
      }
    }
    if (j !== 0) {
      for (h = w - 1; h >= 0; h--)
        if (I = l[h], W = o[h], W === 0)
          for (Te = h, u.set(h, h, 1), A = h - 1; A >= 0; A--) {
            for (v = u.get(A, A) - I, ue = 0, le = Te; le <= h; le++)
              ue = ue + u.get(A, le) * u.get(le, h);
            if (o[A] < 0)
              Y = v, q = ue;
            else if (Te = A, o[A] === 0 ? u.set(A, h, v !== 0 ? -ue / v : -ue / (M * j)) : (E = u.get(A, A + 1), R = u.get(A + 1, A), W = (l[A] - I) * (l[A] - I) + o[A] * o[A], Je = (E * q - Y * ue) / W, u.set(A, h, Je), u.set(
              A + 1,
              h,
              Math.abs(E) > Math.abs(Y) ? (-ue - v * Je) / E : (-q - R * Je) / Y
            )), Je = Math.abs(u.get(A, h)), M * Je * Je > 1)
              for (le = A; le <= h; le++)
                u.set(le, h, u.get(le, h) / Je);
          }
        else if (W < 0)
          for (Te = h - 1, Math.abs(u.get(h, h - 1)) > Math.abs(u.get(h - 1, h)) ? (u.set(h - 1, h - 1, W / u.get(h, h - 1)), u.set(h - 1, h, -(u.get(h, h) - I) / u.get(h, h - 1))) : (xe = jn(0, -u.get(h - 1, h), u.get(h - 1, h - 1) - I, W), u.set(h - 1, h - 1, xe[0]), u.set(h - 1, h, xe[1])), u.set(h, h - 1, 0), u.set(h, h, 1), A = h - 2; A >= 0; A--) {
            for (y = 0, N = 0, le = Te; le <= h; le++)
              y = y + u.get(A, le) * u.get(le, h - 1), N = N + u.get(A, le) * u.get(le, h);
            if (v = u.get(A, A) - I, o[A] < 0)
              Y = v, ue = y, q = N;
            else if (Te = A, o[A] === 0 ? (xe = jn(-y, -N, v, W), u.set(A, h - 1, xe[0]), u.set(A, h, xe[1])) : (E = u.get(A, A + 1), R = u.get(A + 1, A), B = (l[A] - I) * (l[A] - I) + o[A] * o[A] - W * W, G = (l[A] - I) * 2 * W, B === 0 && G === 0 && (B = M * j * (Math.abs(v) + Math.abs(W) + Math.abs(E) + Math.abs(R) + Math.abs(Y))), xe = jn(
              E * ue - Y * y + W * N,
              E * q - Y * N - W * y,
              B,
              G
            ), u.set(A, h - 1, xe[0]), u.set(A, h, xe[1]), Math.abs(E) > Math.abs(Y) + Math.abs(W) ? (u.set(
              A + 1,
              h - 1,
              (-y - v * u.get(A, h - 1) + W * u.get(A, h)) / E
            ), u.set(
              A + 1,
              h,
              (-N - v * u.get(A, h) - W * u.get(A, h - 1)) / E
            )) : (xe = jn(
              -ue - R * u.get(A, h - 1),
              -q - R * u.get(A, h),
              Y,
              W
            ), u.set(A + 1, h - 1, xe[0]), u.set(A + 1, h, xe[1]))), Je = Math.max(Math.abs(u.get(A, h - 1)), Math.abs(u.get(A, h))), M * Je * Je > 1)
              for (le = A; le <= h; le++)
                u.set(le, h - 1, u.get(le, h - 1) / Je), u.set(le, h, u.get(le, h) / Je);
          }
      for (A = 0; A < w; A++)
        if (A < _ || A > x)
          for (le = A; le < w; le++)
            s.set(A, le, u.get(A, le));
      for (le = w - 1; le >= _; le--)
        for (A = _; A <= x; A++) {
          for (Y = 0, ye = _; ye <= Math.min(le, x); ye++)
            Y = Y + s.get(A, ye) * u.get(ye, le);
          s.set(A, le, Y);
        }
    }
  }
  function jn(w, o, l, s) {
    let u, h;
    return Math.abs(l) > Math.abs(s) ? (u = s / l, h = l + u * s, [(w + u * o) / h, (o - u * w) / h]) : (u = l / s, h = s + u * l, [(u * w + o) / h, (u * o - w) / h]);
  }
  class pr {
    constructor(o) {
      if (o = ie.checkMatrix(o), !o.isSymmetric())
        throw new Error("Matrix is not symmetric");
      let l = o, s = l.rows, u = new Z(s, s), h = !0, _, x, M;
      for (x = 0; x < s; x++) {
        let k = 0;
        for (M = 0; M < x; M++) {
          let j = 0;
          for (_ = 0; _ < M; _++)
            j += u.get(M, _) * u.get(x, _);
          j = (l.get(x, M) - j) / u.get(M, M), u.set(x, M, j), k = k + j * j;
        }
        for (k = l.get(x, x) - k, h &&= k > 0, u.set(x, x, Math.sqrt(Math.max(k, 0))), M = x + 1; M < s; M++)
          u.set(x, M, 0);
      }
      this.L = u, this.positiveDefinite = h;
    }
    isPositiveDefinite() {
      return this.positiveDefinite;
    }
    solve(o) {
      o = ie.checkMatrix(o);
      let l = this.L, s = l.rows;
      if (o.rows !== s)
        throw new Error("Matrix dimensions do not match");
      if (this.isPositiveDefinite() === !1)
        throw new Error("Matrix is not positive definite");
      let u = o.columns, h = o.clone(), _, x, M;
      for (M = 0; M < s; M++)
        for (x = 0; x < u; x++) {
          for (_ = 0; _ < M; _++)
            h.set(M, x, h.get(M, x) - h.get(_, x) * l.get(M, _));
          h.set(M, x, h.get(M, x) / l.get(M, M));
        }
      for (M = s - 1; M >= 0; M--)
        for (x = 0; x < u; x++) {
          for (_ = M + 1; _ < s; _++)
            h.set(M, x, h.get(M, x) - h.get(_, x) * l.get(_, M));
          h.set(M, x, h.get(M, x) / l.get(M, M));
        }
      return h;
    }
    get lowerTriangularMatrix() {
      return this.L;
    }
  }
  class gr {
    constructor(o, l = {}) {
      o = ie.checkMatrix(o);
      let { Y: s } = l;
      const {
        scaleScores: u = !1,
        maxIterations: h = 1e3,
        terminationCriteria: _ = 1e-10
      } = l;
      let x;
      if (s) {
        if (e.isAnyArray(s) && typeof s[0] == "number" ? s = Z.columnVector(s) : s = ie.checkMatrix(s), s.rows !== o.rows)
          throw new Error("Y should have the same number of rows as X");
        x = s.getColumnVector(0);
      } else
        x = o.getColumnVector(0);
      let M = 1, k, j, I, W;
      for (let ue = 0; ue < h && M > _; ue++)
        I = o.transpose().mmul(x).div(x.transpose().mmul(x).get(0, 0)), I = I.div(I.norm()), k = o.mmul(I).div(I.transpose().mmul(I).get(0, 0)), ue > 0 && (M = k.clone().sub(W).pow(2).sum()), W = k.clone(), s ? (j = s.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0)), j = j.div(j.norm()), x = s.mmul(j).div(j.transpose().mmul(j).get(0, 0))) : x = k;
      if (s) {
        let ue = o.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0));
        ue = ue.div(ue.norm());
        let q = o.clone().sub(k.clone().mmul(ue.transpose())), Y = x.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0)), ge = s.clone().sub(
          k.clone().mulS(Y.get(0, 0)).mmul(j.transpose())
        );
        this.t = k, this.p = ue.transpose(), this.w = I.transpose(), this.q = j, this.u = x, this.s = k.transpose().mmul(k), this.xResidual = q, this.yResidual = ge, this.betas = Y;
      } else
        this.w = I.transpose(), this.s = k.transpose().mmul(k).sqrt(), u ? this.t = k.clone().div(this.s.get(0, 0)) : this.t = k, this.xResidual = o.sub(k.mmul(I.transpose()));
    }
  }
  return ze.AbstractMatrix = fe, ze.CHO = pr, ze.CholeskyDecomposition = pr, ze.DistanceMatrix = We, ze.EVD = Tn, ze.EigenvalueDecomposition = Tn, ze.LU = Q, ze.LuDecomposition = Q, ze.Matrix = Z, ze.MatrixColumnSelectionView = wt, ze.MatrixColumnView = ot, ze.MatrixFlipColumnView = Yt, ze.MatrixFlipRowView = P, ze.MatrixRowSelectionView = K, ze.MatrixRowView = F, ze.MatrixSelectionView = te, ze.MatrixSubView = H, ze.MatrixTransposeView = ee, ze.NIPALS = gr, ze.Nipals = gr, ze.QR = me, ze.QrDecomposition = me, ze.SVD = _e, ze.SingularValueDecomposition = _e, ze.SymmetricMatrix = De, ze.WrapperMatrix1D = pe, ze.WrapperMatrix2D = ie, ze.correlation = dn, ze.covariance = Ct, ze.default = Z, ze.determinant = Ve, ze.inverse = Ne, ze.linearDependencies = ct, ze.pseudoInverse = yt, ze.solve = $e, ze.wrap = he, ze;
}
var yu = /* @__PURE__ */ Mm();
const Ml = /* @__PURE__ */ mu(yu), Vt = Ml.Matrix ? Ml.Matrix : yu.Matrix;
var bi = { exports: {} }, km = bi.exports, kl;
function Tm() {
  return kl || (kl = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(km, function() {
      function n(c) {
        c = c.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (X, ne, re, be) => ne + be.replaceAll(".", " ."));
        var f = c.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), d = f.length, p, m, g, b, T, L = [], O = [], z, S, D = 0, U = 0, C = 0, V = 0, se = 0, oe = 0, we = 0, ke = 0, ce = 0, ve = 0, Ae = 0, de = 0, $ = 0, ae = "";
        for (p = 1; p < d; p++) {
          if (m = f[p], g = m.substring(0, 1), b = g.toLowerCase(), L = m.replace(g, "").trim().split(" ").filter(function(X) {
            return X !== "";
          }), O = L, L = L.map(parseFloat), z = L.length, b === "m") {
            if (ae += "M ", g === "m" ? (C += L[0], V += L[1]) : (C = L[0], V = L[1]), D = C, U = V, ae += C + " " + V + " ", z > 2)
              for (S = 0; S < z; S += 2)
                g === "m" ? (C += L[S], V += L[S + 1]) : (C = L[S], V = L[S + 1]), ae += "L " + C + " " + V + " ";
          } else if (b === "l")
            for (S = 0; S < z; S += 2)
              g === "l" ? (C += L[S], V += L[S + 1]) : (C = L[S], V = L[S + 1]), ae += "L " + C + " " + V + " ";
          else if (b === "h")
            for (S = 0; S < z; S++)
              g === "h" ? C += L[S] : C = L[S], ae += "L " + C + " " + V + " ";
          else if (b === "v")
            for (S = 0; S < z; S++)
              g === "v" ? V += L[S] : V = L[S], ae += "L " + C + " " + V + " ";
          else if (b === "q")
            for (S = 0; S < z; S += 4)
              g === "q" ? (se = C + L[S], oe = V + L[S + 1], C += L[S + 2], V += L[S + 3]) : (se = L[S], oe = L[S + 1], C = L[S + 2], V = L[S + 3]), ae += "Q " + se + " " + oe + " " + C + " " + V + " ";
          else if (b === "t")
            for (S = 0; S < z; S += 2)
              ["t", "q"].indexOf(T) > -1 ? (se = C + (C - se), oe = V + (V - oe)) : (se = C, oe = V), g === "t" ? (C += L[S], V += L[S + 1]) : (C = L[S], V = L[S + 1]), ae += "Q " + se + " " + oe + " " + C + " " + V + " ", T = b;
          else if (b === "c")
            for (S = 0; S < z; S += 6)
              g === "c" ? (se = C + L[S], oe = V + L[S + 1], we = C + L[S + 2], ke = V + L[S + 3], C += L[S + 4], V += L[S + 5]) : (se = L[S], oe = L[S + 1], we = L[S + 2], ke = L[S + 3], C = L[S + 4], V = L[S + 5]), ae += "C " + se + " " + oe + " " + we + " " + ke + " " + C + " " + V + " ";
          else if (b === "s")
            for (S = 0; S < z; S += 4)
              se = C, oe = V, ["s", "c"].indexOf(T) > -1 && (se += C - we, oe += V - ke), g === "s" ? (we = C + L[S], ke = V + L[S + 1], C += L[S + 2], V += L[S + 3]) : (we = L[S], ke = L[S + 1], C = L[S + 2], V = L[S + 3]), ae += "C " + se + " " + oe + " " + we + " " + ke + " " + C + " " + V + " ";
          else if (b === "a")
            for (S = 0; S < z; S += 7) {
              ce = L[S], ve = L[S + 1], Ae = L[S + 2], de = O[S + 3];
              let X = !1;
              if (de.length > 1) {
                let ne = parseInt(de[0]), re = parseInt(de[1]), be;
                de.length > 2 && (be = parseFloat(de.substring(2))), L[S + 3] = ne, L.splice(S + 4, 0, re), O.splice(S + 4, 0, "+"), be !== void 0 && L.splice(S + 5, 0, be), X = !0;
              }
              de = L[S + 3], $ = X ? L[S + 4] : O[S + 4], !X && $.length > 1 && (L[S + 4] = parseInt($[0]), L.splice(S + 5, 0, parseFloat($.substring(1)))), $ = L[S + 4], g === "a" ? (C += L[S + 5], V += L[S + 6]) : (C = L[S + 5], V = L[S + 6]), ae += "A " + ce + " " + ve + " " + Ae + " " + de + " " + $ + " " + C + " " + V + " ";
            }
          else b === "z" && (ae += "Z ", C = D, V = U);
          T = b;
        }
        return ae.trim();
      }
      function r(c) {
        var f = c.trim().split(" "), d, p = f.length, m = p - 1, g, b = [], T, L, O, z, S, D = new RegExp("[QAZLCM]", ""), U = f.slice(-1)[0].toUpperCase() === "Z";
        for (g = 0; g < p; g++)
          if (d = f[g], D.test(d)) {
            if (d === "A") {
              b.push(f[g + 5] === "0" ? "1" : "0"), b.push(f[g + 4]), b.push(f[g + 3]), b.push(f[g + 2]), b.push(f[g + 1]), b.push(d), b.push(f[g + 7]), b.push(f[g + 6]), g += 7;
              continue;
            } else if (d === "C")
              z = 3, S = 2;
            else if (d === "Q")
              z = 2, S = 1;
            else if (d === "L")
              z = 1, S = 1;
            else if (d === "M")
              z = 1, S = 0;
            else
              continue;
            for (z === S && b.push(d), O = 0; O < z; O++)
              O === S && b.push(d), T = f[++g], L = f[++g], b.push(L), b.push(T);
          } else {
            var C = f.slice(Math.max(g - 3, 0), 3).join(" ");
            throw post = f.slice(g + 1, Math.min(g + 4, m)).join(" "), range = C + " [" + d + "] " + post, "Error while trying to reverse normalized SVG path, at position " + g + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
          }
        b.push("M");
        var V = "", se = b.length - 1, oe;
        for (oe = se; oe > 0; oe--)
          V += b[oe] + " ";
        return U && (V += "Z"), V = V.replace(/M M/g, "Z M"), V;
      }
      function i(d, f) {
        f = parseInt(f) == f ? f : !1;
        var d = n(d), p = d.replace(/M/g, "|M").split("|"), m;
        if (p.splice(0, 1), f !== !1 && f >= p.length)
          return d;
        if (f === !1)
          p = p.map(function(b) {
            return r(b.trim());
          });
        else {
          var g = p[f];
          g && (m = r(g.trim()), p[f] = m);
        }
        return p.reverse().join(" ").replace(/ +/g, " ").trim();
      }
      var a = {
        normalize: n,
        reverseNormalized: r,
        reverse: i
      };
      return a;
    });
  })(bi)), bi.exports;
}
var Nm = Tm();
const Tl = /* @__PURE__ */ mu(Nm);
function Cm(e, t, n, r) {
  switch (e.pathType) {
    case Bt.REFLEXIVE:
      return bu(e.source, [t / 2, n / 2], r);
    case Bt.ARC:
      return js(e.source, e.target, r);
    case Bt.ARCREVERSE:
      return Tl.reverse(js(e.source, e.target, r));
    case Bt.LINE:
      return Ir(e.source, e.target, r);
    case Bt.LINEREVERSE:
      return Tl.reverse(Ir(e.source, e.target, r));
    default:
      return "";
  }
}
function Rm(e, t, n) {
  return e.id === t.id ? Bt.REFLEXIVE : n.hasBidirectionalConnection(e, t) ? Nl(e, t) ? Bt.ARCREVERSE : Bt.ARC : Nl(e, t) ? Bt.LINEREVERSE : Bt.LINE;
}
function Ir(e, t, n) {
  const r = { x: t.x - e.x, y: t.y - e.y };
  let i = Math.sqrt(r.x * r.x + r.y * r.y);
  i === 0 && (i = Number.EPSILON);
  const a = r.x / i, c = r.y / i, f = Lm(e, t, n, a, c);
  return `M${f.start.x},${f.start.y}
          L${f.end.x},${f.end.y}`;
}
function Lm(e, t, n, r, i) {
  let a, c;
  return e.props.shape === Se.CIRCLE ? a = {
    x: e.x + (e.renderedSize.radius - 1) * r,
    y: e.y + (e.renderedSize.radius - 1) * i
  } : e.props.shape === Se.RECTANGLE && (a = zi(
    e.x,
    e.y,
    e.renderedSize.width,
    e.renderedSize.height,
    r,
    i,
    2
  )), t instanceof $i ? c = t.props.shape === Se.CIRCLE ? {
    x: t.x - (t.renderedSize.radius + n.markerPadding) * r,
    y: t.y - (t.renderedSize.radius + n.markerPadding) * i
  } : zi(
    t.x,
    t.y,
    t.renderedSize.width,
    t.renderedSize.height,
    -r,
    -i,
    -n.markerPadding + 1
  ) : c = {
    x: t.x,
    y: t.y
  }, { start: a, end: c };
}
function js(e, t, n) {
  const r = new Vt([[e.x, e.y]]), i = new Vt([[t.x, t.y]]), a = Vt.subtract(i, r), c = a.norm("frobenius"), f = a.divide(c);
  let d = e.props.shape === Se.CIRCLE ? nr(10) : nr(30), p = t.props.shape === Se.CIRCLE ? nr(10) : nr(30), m = 1.2 * c;
  const g = Pm(e, t, n, r, i, f, {
    start: d,
    end: p
  });
  return `M${g.start.get(0, 0)},${g.start.get(0, 1)}
          A${m},${m},0,0,1,${g.end.get(0, 0)},${g.end.get(0, 1)}`;
}
function Pm(e, t, n, r, i, a, c) {
  let f, d;
  if (e.props.shape === Se.CIRCLE)
    f = xt(a, -c.start).multiply(e.renderedSize.radius - 1).add(r);
  else if (e.props.shape === Se.RECTANGLE) {
    const p = zi(
      e.x,
      e.y,
      e.renderedSize.width,
      e.renderedSize.height,
      a.get(0, 0),
      a.get(0, 1),
      2
    );
    f = xt(a, -c.start).add([[p.x, p.y]]);
  }
  if (t.props.shape === Se.CIRCLE) {
    const p = Vt.multiply(a, -1);
    d = xt(p, c.end).multiply(t.renderedSize.radius).add(i).add(xt(p, c.end).multiply(2 * n.markerBoxSize));
  } else if (t.props.shape === Se.RECTANGLE) {
    const p = zi(
      t.x,
      t.y,
      t.renderedSize.width,
      t.renderedSize.height,
      -a.get(0, 0),
      -a.get(0, 1)
    ), m = Vt.multiply(a, -1);
    d = xt(m, c.end).add([[p.x, p.y]]).add(xt(m, c.end).multiply(2 * n.markerBoxSize));
  }
  return { start: f, end: d };
}
function bu(e, t, n) {
  const r = new Vt([t]);
  if (e.props.shape === Se.CIRCLE) {
    const i = new Vt([[e.x, e.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const a = Vt.subtract(i, r), c = a.divide(a.norm("frobenius")), f = nr(40), d = xt(c, f).multiply(e.renderedSize.radius - 1).add(i), p = xt(c, -f).multiply(e.renderedSize.radius).add(i).add(xt(c, -f).multiply(2 * n.markerBoxSize));
    return `M${d.get(0, 0)},${d.get(0, 1)}
              A${e.renderedSize.radius},${e.renderedSize.radius},0,1,0,${p.get(0, 0)},${p.get(0, 1)}`;
  } else return e.props.shape === Se.RECTANGLE ? e.props.reflexiveEdgeStart == "MOVABLE" ? Im(e, n, r) : Am(e, n) : "";
}
function Nl(e, t) {
  return e.x > t.x;
}
function Im(e, t, n) {
  if (e.props.shape === Se.RECTANGLE) {
    const r = new Vt([[e.x, e.y]]);
    r.get(0, 0) === n.get(0, 0) && r.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const i = Vt.subtract(r, n), a = i.divide(i.norm("frobenius")), c = nr(45);
    let f, d, p = 0.5 * e.renderedSize.width, m = 0.5 * e.renderedSize.height;
    const g = Om(
      i.get(0, 0),
      i.get(0, 1),
      30
    );
    if (g === Ge.BOTTOMLEFT || g === Ge.BOTTOMRIGHT || g === Ge.TOPLEFT || g === Ge.TOPRIGHT) {
      let b = vu(g, e, t);
      f = b.start, d = b.end, e.renderedSize.width > e.renderedSize.height ? (g === Ge.TOPLEFT || g === Ge.BOTTOMRIGHT) && (p = 0.25 * e.renderedSize.width) : e.renderedSize.height > e.renderedSize.width && (g === Ge.TOPRIGHT || g === Ge.BOTTOMLEFT) && (m = 0.25 * e.renderedSize.height);
    } else g === Ge.LEFT || g === Ge.RIGHT ? (f = xt(a, c).multiply(0.5 * e.renderedSize.width - 1).add(r), d = xt(a, -c).multiply(0.5 * e.renderedSize.height - 1).add(r).add(xt(a, -c).multiply(2 * t.markerBoxSize))) : (f = xt(a, c).multiply(0.5 * e.renderedSize.height - 1).add(r), d = xt(a, -c).multiply(0.5 * e.renderedSize.width - 1).add(r).add(xt(a, -c).multiply(2 * t.markerBoxSize)));
    return `M${f.get(0, 0)},${f.get(0, 1)} A${p},${m}, 0, 1, 0, ${d.get(0, 0)},${d.get(0, 1)}`;
  } else
    return "";
}
function Am(e, t) {
  if (e.props.shape === Se.RECTANGLE && e.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * e.renderedSize.width, a = 0.5 * e.renderedSize.height;
    e.renderedSize.width > e.renderedSize.height ? (e.props.reflexiveEdgeStart === Ge.TOPLEFT || e.props.reflexiveEdgeStart === Ge.BOTTOMRIGHT) && (i = e.renderedSize.width / e.renderedSize.height + e.renderedSize.height) : e.renderedSize.height > e.renderedSize.width && (e.props.reflexiveEdgeStart === Ge.TOPRIGHT || e.props.reflexiveEdgeStart === Ge.BOTTOMLEFT) && (a = e.renderedSize.height / e.renderedSize.width + e.renderedSize.width);
    let c = vu(
      e.props.reflexiveEdgeStart,
      e,
      t
    );
    return n = c.start, r = c.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${a}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function zi(e, t, n, r, i, a, c = 0) {
  const f = e - 0.5 * n, d = e + 0.5 * n, p = t - 0.5 * r, m = t + 0.5 * r;
  i === 0 && (i = Number.EPSILON), a === 0 && (a = Number.EPSILON);
  const g = i < 0 ? f : d, b = a < 0 ? p : m, T = (g - e) / i, L = (b - t) / a, O = Math.min(T, L);
  let z = e + O * i, S = t + O * a;
  if (c !== 0)
    if (T < L) {
      let D;
      g === f ? D = 1 : D = -1, z = z + c * D;
    } else {
      let D;
      b === p ? D = 1 : D = -1, S = S + c * D;
    }
  return { x: z, y: S };
}
function Om(e, t, n = 30) {
  let r = $m(Math.atan2(e, t));
  return r < 0 && (r += 360), Gn(r, 0, n) ? Ge.BOTTOMLEFT : Gn(r, [0, 90], -n) ? Ge.BOTTOM : Gn(r, 90, n) ? Ge.BOTTOMRIGHT : Gn(r, [90, 180], -n) ? Ge.RIGHT : Gn(r, 180, n) ? Ge.TOPRIGHT : Gn(r, [180, 270], -n) ? Ge.TOP : Gn(r, 270, n) ? Ge.TOPLEFT : Ge.LEFT;
}
function vu(e, t, n) {
  const r = t.x, i = t.y, a = 0.5 * t.renderedSize.width, c = 0.5 * t.renderedSize.height, f = n.markerBoxSize, d = {
    [Ge.BOTTOMLEFT]: {
      start: [r - a + 2, i + c - 1],
      end: [r + a - 2 * f, i + c + 2 * f]
    },
    [Ge.BOTTOM]: {
      start: [r, i + c - 1],
      end: [r + a + 2 * f, i]
    },
    [Ge.BOTTOMRIGHT]: {
      start: [r + a - 2, i + c - 1],
      end: [r + a + 2 * f, i - c + 2 * f]
    },
    [Ge.RIGHT]: {
      start: [r + a - 1, i],
      end: [r, i - c - 2 * f]
    },
    [Ge.TOPRIGHT]: {
      start: [r + a - 2, i - c + 1],
      end: [r - a + 2 * f, i - c - 2 * f]
    },
    [Ge.TOP]: {
      start: [r, i - c + 1],
      end: [r - a - 2 * f, i]
    },
    [Ge.TOPLEFT]: {
      start: [r - a + 2, i - c + 1],
      end: [r - a - 2 * f, i + c - 2 * f]
    },
    [Ge.LEFT]: {
      start: [r - a + 1, i],
      end: [r, i + c + 2 * f]
    }
  }, { start: p, end: m } = d[e];
  return {
    start: new Vt([p]),
    end: new Vt([m])
  };
}
function Gn(e, t, n = 0) {
  e = (e + 360) % 360;
  let r, i;
  return typeof t == "number" ? (r = (t - n + 360) % 360, i = (t + n) % 360) : (r = (t[0] - n + 360) % 360, i = (t[1] + n) % 360), r < i ? e >= r && e <= i : e >= r || e <= i;
}
function nr(e) {
  return e * (Math.PI / 180);
}
function $m(e) {
  return e * (180 / Math.PI);
}
function xt(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new Vt([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
function zm(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((f) => f.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, i = n !== -1 ? t.slice(n + 1) : [], a = [];
  if (r.length)
    for (const f of r) {
      let [, d, p] = (f.match(/(\w+) (.*)/) || f.match(/(\w+)/) || []).map(
        (m) => m.trim()
      );
      d && a.push({
        idImported: d,
        label: p
      });
    }
  const c = [];
  if (i.length)
    for (const f of i) {
      let [, d, p, m] = (f.match(/(\w+) (\w+) (.*)/) || f.match(/(\w+) (\w+)/) || []).map((g) => g.trim());
      d && p && c.push({
        sourceIdImported: d,
        targetIdImported: p,
        label: m
      });
    }
  return [a, c];
}
function Fm(e) {
  const t = [];
  for (let r of e.nodes)
    t.push({
      idImported: r.id,
      x: r.x,
      y: r.y,
      label: r.label,
      props: r.props,
      color: r.color,
      fixedPosition: r.fixedPosition,
      deletable: r.deletable,
      labelEditable: r.labelEditable,
      allowIncomingLinks: r.allowIncomingLinks,
      allowOutgoingLinks: r.allowOutgoingLinks
    });
  const n = [];
  for (let r of e.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label,
      color: r.color,
      deletable: r.deletable,
      labelEditable: r.labelEditable
    });
  return [t, n];
}
const jm = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  "Pale Moon": "pale_moon",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
}, _u = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  pale_moon: "Pale Moon",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
}, rt = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv",
  bot: "bot"
}, vt = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
}, Ln = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class J {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(t, n) {
    const r = n.match(t);
    return r && r.length > 0 && r[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(t, n) {
    const r = n.match(t);
    return r && r.length > 1 && r[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(t, n, r) {
    if (t.test(n))
      return r;
  }
  static getWindowsVersionName(t) {
    switch (t) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(t) {
    const n = t.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
    if (n.push(0), n[0] === 10)
      switch (n[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(t) {
    const n = t.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
    if (n.push(0), !(n[0] === 1 && n[1] < 5)) {
      if (n[0] === 1 && n[1] < 6) return "Cupcake";
      if (n[0] === 1 && n[1] >= 6) return "Donut";
      if (n[0] === 2 && n[1] < 2) return "Eclair";
      if (n[0] === 2 && n[1] === 2) return "Froyo";
      if (n[0] === 2 && n[1] > 2) return "Gingerbread";
      if (n[0] === 3) return "Honeycomb";
      if (n[0] === 4 && n[1] < 1) return "Ice Cream Sandwich";
      if (n[0] === 4 && n[1] < 4) return "Jelly Bean";
      if (n[0] === 4 && n[1] >= 4) return "KitKat";
      if (n[0] === 5) return "Lollipop";
      if (n[0] === 6) return "Marshmallow";
      if (n[0] === 7) return "Nougat";
      if (n[0] === 8) return "Oreo";
      if (n[0] === 9) return "Pie";
    }
  }
  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(t) {
    return t.split(".").length;
  }
  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(t, n, r = !1) {
    const i = J.getVersionPrecision(t), a = J.getVersionPrecision(n);
    let c = Math.max(i, a), f = 0;
    const d = J.map([t, n], (p) => {
      const m = c - J.getVersionPrecision(p), g = p + new Array(m + 1).join(".0");
      return J.map(g.split("."), (b) => new Array(20 - b.length).join("0") + b).reverse();
    });
    for (r && (f = c - Math.min(i, a)), c -= 1; c >= f; ) {
      if (d[0][c] > d[1][c])
        return 1;
      if (d[0][c] === d[1][c]) {
        if (c === f)
          return 0;
        c -= 1;
      } else if (d[0][c] < d[1][c])
        return -1;
    }
  }
  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(t, n) {
    const r = [];
    let i;
    if (Array.prototype.map)
      return Array.prototype.map.call(t, n);
    for (i = 0; i < t.length; i += 1)
      r.push(n(t[i]));
    return r;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(t, n) {
    let r, i;
    if (Array.prototype.find)
      return Array.prototype.find.call(t, n);
    for (r = 0, i = t.length; r < i; r += 1) {
      const a = t[r];
      if (n(a, r))
        return a;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(t, ...n) {
    const r = t;
    let i, a;
    if (Object.assign)
      return Object.assign(t, ...n);
    for (i = 0, a = n.length; i < a; i += 1) {
      const c = n[i];
      typeof c == "object" && c !== null && Object.keys(c).forEach((d) => {
        r[d] = c[d];
      });
    }
    return t;
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(t) {
    return jm[t];
  }
  /**
   * Get browser name for a short version/alias
   *
   * @example
   *   getBrowserTypeByAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(t) {
    return _u[t] || "";
  }
}
const Ye = /version\/(\d+(\.?_?\d+)+)/i, Bm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      }, n = J.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = J.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/PaleMoon/i],
    describe(e) {
      const t = {
        name: "Pale Moon"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      }, n = J.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      }, n = J.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      }, n = J.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      }, n = J.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      }, n = J.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      }, n = J.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      }, n = J.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
        name: "Internet Explorer"
      }, n = J.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = J.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = J.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
        name: "Vivaldi"
      }, n = J.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
        name: "SeaMonkey"
      }, n = J.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sailfish/i],
    describe(e) {
      const t = {
        name: "Sailfish"
      }, n = J.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/silk/i],
    describe(e) {
      const t = {
        name: "Amazon Silk"
      }, n = J.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/phantom/i],
    describe(e) {
      const t = {
        name: "PhantomJS"
      }, n = J.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
        name: "SlimerJS"
      }, n = J.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
        name: "BlackBerry"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      }, n = J.getFirstMatch(Ye, e) || J.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/bada/i],
    describe(e) {
      const t = {
        name: "Bada"
      }, n = J.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/tizen/i],
    describe(e) {
      const t = {
        name: "Tizen"
      }, n = J.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      }, n = J.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
        name: "Firefox"
      }, n = J.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/electron/i],
    describe(e) {
      const t = {
        name: "Electron"
      }, n = J.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
        name: "Miui"
      }, n = J.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chromium/i],
    describe(e) {
      const t = {
        name: "Chromium"
      }, n = J.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
        name: "Chrome"
      }, n = J.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/GSA/i],
    describe(e) {
      const t = {
        name: "Google Search"
      }, n = J.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Android Browser */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = {
        name: "Android Browser"
      }, n = J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      }, n = J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      }, n = J.getFirstMatch(Ye, e);
      return n && (t.version = n), t;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(e) {
      const t = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = e.search("\\(") !== -1 ? n : t;
      return {
        name: J.getFirstMatch(i, e),
        version: J.getSecondMatch(i, e)
      };
    }
  }
], Dm = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(e) {
      const t = J.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: vt.Roku,
        version: t
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(e) {
      const t = J.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: vt.WindowsPhone,
        version: t
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(e) {
      const t = J.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), n = J.getWindowsVersionName(t);
      return {
        name: vt.Windows,
        version: t,
        versionName: n
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
        name: vt.iOS
      }, n = J.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return n && (t.version = n), t;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(e) {
      const t = J.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), n = J.getMacOSVersionName(t), r = {
        name: vt.MacOS,
        version: t
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = J.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: vt.iOS,
        version: t
      };
    }
  },
  /* Android */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = J.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), n = J.getAndroidVersionName(t), r = {
        name: vt.Android,
        version: t
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = J.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), n = {
        name: vt.WebOS
      };
      return t && t.length && (n.version = t), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = J.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || J.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || J.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: vt.BlackBerry,
        version: t
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(e) {
      const t = J.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: vt.Bada,
        version: t
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(e) {
      const t = J.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: vt.Tizen,
        version: t
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: vt.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: vt.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(e) {
      const t = J.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: vt.PlayStation4,
        version: t
      };
    }
  }
], Vm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: rt.bot,
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(e) {
      const t = J.getFirstMatch(/(can-l01)/i, e) && "Nova", n = {
        type: rt.mobile,
        vendor: "Huawei"
      };
      return t && (n.model = t), n;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: rt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: rt.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: rt.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: rt.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: rt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: rt.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(e) {
      const t = e.test(/ipod|iphone/i), n = e.test(/like (ipod|iphone)/i);
      return t && !n;
    },
    describe(e) {
      const t = J.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: rt.mobile,
        vendor: "Apple",
        model: t
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: rt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Nokia */
  {
    test: [/Nokia/i],
    describe(e) {
      const t = J.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, e), n = {
        type: rt.mobile,
        vendor: "Nokia"
      };
      return t && (n.model = t), n;
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: rt.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(e) {
      return e.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: rt.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(e) {
      return e.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: rt.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(e) {
      return e.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: rt.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return e.getOSName(!0) === "android" && t >= 3;
    },
    describe() {
      return {
        type: rt.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(e) {
      return e.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: rt.mobile
      };
    }
  },
  /* desktop */
  {
    test(e) {
      return e.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: rt.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(e) {
      return e.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: rt.desktop
      };
    }
  },
  /* Linux */
  {
    test(e) {
      return e.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: rt.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(e) {
      return e.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: rt.tv
      };
    }
  },
  /* Roku */
  {
    test(e) {
      return e.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: rt.tv
      };
    }
  }
], Gm = [
  /* EdgeHTML */
  {
    test(e) {
      return e.getBrowserName(!0) === "microsoft edge";
    },
    describe(e) {
      if (/\sedg\//i.test(e))
        return {
          name: Ln.Blink
        };
      const n = J.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: Ln.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(e) {
      const t = {
        name: Ln.Trident
      }, n = J.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Presto */
  {
    test(e) {
      return e.test(/presto/i);
    },
    describe(e) {
      const t = {
        name: Ln.Presto
      }, n = J.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Gecko */
  {
    test(e) {
      const t = e.test(/gecko/i), n = e.test(/like gecko/i);
      return t && !n;
    },
    describe(e) {
      const t = {
        name: Ln.Gecko
      }, n = J.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Ln.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
        name: Ln.WebKit
      }, n = J.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  }
];
class Cl {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(t, n = !1) {
    if (t == null || t === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = t, this.parsedResult = {}, n !== !0 && this.parse();
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }
  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(t) {
    return t.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = J.find(Bm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
  }
  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(t) {
    return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};
    const t = J.find(Dm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(t) {
    const { name: n } = this.getOS();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(t = !1) {
    const { type: n } = this.getPlatform();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = J.find(Vm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
  }
  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(t) {
    return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const t = J.find(Gm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
  }
  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return J.assign({}, this.parsedResult);
  }
  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(t) {
    const n = {};
    let r = 0;
    const i = {};
    let a = 0;
    if (Object.keys(t).forEach((f) => {
      const d = t[f];
      typeof d == "string" ? (i[f] = d, a += 1) : typeof d == "object" && (n[f] = d, r += 1);
    }), r > 0) {
      const f = Object.keys(n), d = J.find(f, (m) => this.isOS(m));
      if (d) {
        const m = this.satisfies(n[d]);
        if (m !== void 0)
          return m;
      }
      const p = J.find(
        f,
        (m) => this.isPlatform(m)
      );
      if (p) {
        const m = this.satisfies(n[p]);
        if (m !== void 0)
          return m;
      }
    }
    if (a > 0) {
      const f = Object.keys(i), d = J.find(f, (p) => this.isBrowser(p, !0));
      if (d !== void 0)
        return this.compareVersion(i[d]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param {string} browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(t, n = !1) {
    const r = this.getBrowserName().toLowerCase();
    let i = t.toLowerCase();
    const a = J.getBrowserTypeByAlias(i);
    return n && a && (i = a.toLowerCase()), i === r;
  }
  compareVersion(t) {
    let n = [0], r = t, i = !1;
    const a = this.getBrowserVersion();
    if (typeof a == "string")
      return t[0] === ">" || t[0] === "<" ? (r = t.substr(1), t[1] === "=" ? (i = !0, r = t.substr(2)) : n = [], t[0] === ">" ? n.push(1) : n.push(-1)) : t[0] === "=" ? r = t.substr(1) : t[0] === "~" && (i = !0, r = t.substr(1)), n.indexOf(
        J.compareVersions(a, r, i)
      ) > -1;
  }
  /**
   * Check if the OS name equals the passed string
   * @param {string} osName The string to compare with the OS name
   * @returns {boolean}
   */
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase();
  }
  /**
   * Check if the platform type equals the passed string
   * @param {string} platformType The string to compare with the platform type
   * @returns {boolean}
   */
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase();
  }
  /**
   * Check if the engine name equals the passed string
   * @param {string} engineName The string to compare with the engine name
   * @returns {boolean}
   */
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(t, n = !1) {
    return this.isBrowser(t, n) || this.isOS(t) || this.isPlatform(t);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(t = []) {
    return t.some((n) => this.is(n));
  }
}
class qm {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(t, n = !1) {
    if (typeof t != "string")
      throw new Error("UserAgent should be a string");
    return new Cl(t, n);
  }
  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(t) {
    return new Cl(t).getResult();
  }
  static get BROWSER_MAP() {
    return _u;
  }
  static get ENGINE_MAP() {
    return Ln;
  }
  static get OS_MAP() {
    return vt;
  }
  static get PLATFORMS_MAP() {
    return rt;
  }
}
const Um = /* @__PURE__ */ to({
  __name: "GraphComponent",
  emits: ["nodeCreated", "nodeClicked", "nodeDeleted", "nodeRenderedSizeChange", "linkCreated", "linkClicked", "linkDeleted", "labelEdited"],
  setup(e, { expose: t, emit: n }) {
    const r = Ts(() => {
      const v = document.querySelectorAll("graph-component");
      let E;
      for (let R = 0; R < v.length; R++) {
        const y = v[R], N = je(y.shadowRoot);
        let B;
        if (N.empty() ? B = je(
          ".graph-controller__graph-host.uninitialised"
        ) : B = N.select(
          ".graph-controller__graph-host.uninitialised"
        ), !B.empty()) {
          B.classed("uninitialised", !1), E = B;
          break;
        }
      }
      return E === void 0 && (E = je(
        ".graph-controller__graph-host.uninitialised"
      ), E.classed("uninitialised", !1)), E;
    }), i = Ts(() => {
      let v = r.value.node().parentElement;
      v || (v = r.value.node().getRootNode().host);
      let E = v.getAttribute("id");
      return E || "gc";
    });
    ua(() => {
      pe(), window.addEventListener("resize", Pe);
    }), no(() => {
      window.removeEventListener("resize", Pe);
    });
    const c = qm.getParser(window.navigator.userAgent).getPlatformType(!0);
    let f = !1, d = { x: -1e5, y: -1e5 };
    const p = Eo(new xl()), m = Eo(!1), g = qi(new V0());
    let b, T = 400, L = 400, O, z, S, D, U, C, V, se, oe, we = 0, ke = 0, ce = 1, ve, Ae, de;
    const $ = n;
    t({
      setDefaults: ae,
      getDefaults: X,
      getGraph: ne,
      setGraph: re,
      printGraph: be,
      createNode: _e,
      createLink: me,
      deleteElement: Me,
      setLabel: Le,
      setColor: fe,
      setNodeSize: Qe,
      setNodeShape: Ue,
      setNodeProps: Z,
      setDeletable: De,
      setLabelEditable: We,
      setNodesLinkPermission: Be,
      setNodesFixedPosition: ot,
      setEditability: wt,
      toggleNodeLabels: K,
      toggleLinkLabels: F,
      toggleZoom: te,
      toggleNodePhysics: Yt,
      toggleFixedLinkDistance: P,
      toggleNodeCreationViaGUI: H,
      toggleNodeAutoGrow: ee,
      resetView: Te
    });
    function ae(v) {
      v.zoomEnabled !== void 0 && te(v.zoomEnabled), v.nodePhysicsEnabled !== void 0 && Yt(v.nodePhysicsEnabled), v.fixedLinkDistanceEnabled !== void 0 && P(v.fixedLinkDistanceEnabled), v.showNodeLabels !== void 0 && K(v.showNodeLabels), v.showLinkLabels !== void 0 && F(v.showLinkLabels), v.nodeAutoGrowToLabelSize !== void 0 && ee(v.nodeAutoGrowToLabelSize), v.allowNodeCreationViaGUI !== void 0 && H(v.allowNodeCreationViaGUI), g.nodeProps = v.nodeProps ?? g.nodeProps, g.nodeGUIEditability = v.nodeGUIEditability ?? g.nodeGUIEditability, g.linkGUIEditability = v.linkGUIEditability ?? g.linkGUIEditability, Ce();
    }
    function X() {
      return {
        zoomEnabled: g.zoomEnabled,
        nodePhysicsEnabled: g.nodePhysicsEnabled,
        fixedLinkDistanceEnabled: g.fixedLinkDistanceEnabled,
        showNodeLabels: g.showNodeLabels,
        showLinkLabels: g.showLinkLabels,
        allowNodeCreationViaGUI: g.allowNodeCreationViaGUI,
        nodeAutoGrowToLabelSize: g.nodeAutoGrowToLabelSize,
        nodeProps: g.nodeProps,
        nodeGUIEditability: g.nodeGUIEditability,
        linkGUIEditability: g.linkGUIEditability
      };
    }
    function ne(v = "json", E = !0, R = !0, y = !0, N = !0) {
      if (v.toLowerCase() === "json")
        return JSON.parse(
          p.value.toJSON(
            E,
            g.showNodeLabels,
            g.showLinkLabels,
            R,
            y,
            y,
            N,
            N
          )
        );
      if (v.toLowerCase() === "tgf")
        return p.value.toTGF(g.showNodeLabels, g.showLinkLabels);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function re(v) {
      typeof v == "object" || typeof v == "string" ? A(v) : Je();
    }
    function be(v = "json", E = !0, R = !0, y = !0, N = !0) {
      v.toLowerCase() === "json" ? console.log(
        p.value.toJSON(
          E,
          g.showNodeLabels,
          g.showLinkLabels,
          R,
          y,
          y,
          N,
          N
        )
      ) : console.log(p.value.toTGF(g.showNodeLabels, g.showLinkLabels));
    }
    function Me(v) {
      if (v !== void 0) {
        const [E, R] = Jt(v);
        for (const y of E)
          U.filter((N) => N.id === y).each(function(N) {
            let B = p.value.removeNode(N);
            if (B !== void 0) {
              let [G, Re] = B;
              $("nodeDeleted", {
                id: G.id,
                label: G.label,
                x: G.x,
                y: G.y
              }), Re.forEach((xe) => {
                $("linkDeleted", { id: xe.id, label: xe.label });
              });
            }
          });
        for (const y of R)
          D.filter((N) => N.id === y).each(function(N) {
            let B = p.value.removeLink(N);
            B !== void 0 && $("linkDeleted", { id: B.id, label: B.label });
          });
      } else
        U.each(function(E) {
          let R = p.value.removeNode(E);
          if (R !== void 0) {
            let [y, N] = R;
            $("nodeDeleted", {
              id: y.id,
              label: y.label,
              x: y.x,
              y: y.y
            }), N.forEach((B) => {
              $("linkDeleted", { id: B.id, label: B.label });
            });
          }
        }), D.each(function(E) {
          let R = p.value.removeLink(E);
          R !== void 0 && $("linkDeleted", { id: R.id, label: R.label });
        });
      m.value = p.value.nodes.length > 0, Ce();
    }
    function Le(v, E) {
      if (E !== void 0) {
        const [R, y] = Jt(E);
        for (const N of R)
          U.filter((B) => B.id === N).each((B) => {
            W(B, v);
          });
        for (const N of y)
          D.filter((B) => B.id === N).each((B) => {
            W(B, v);
          });
      } else
        U.each((R) => {
          W(R, v);
        }), D.each((R) => {
          W(R, v);
        });
    }
    function fe(v, E) {
      if (E !== void 0) {
        const [R, y] = Jt(E);
        ye(y);
        for (const N of R)
          U.selectAll(".graph-controller__node").filter((B) => B.id === N).each((B) => B.color = v).style("fill", v);
        for (const N of y)
          D.selectAll(".graph-controller__link").filter((B) => B.id === N).each((B) => B.color = v).style("stroke", v);
      } else
        U.selectAll(".graph-controller__node").each((R) => R.color = v).style("fill", v), ye(p.value.links.map((R) => R.id)), D.selectAll(".graph-controller__link").each((R) => R.color = v).style("stroke", v);
      wi(S, i.value, g, v), Ce();
    }
    function Qe(v, E) {
      if (E !== void 0) {
        const [R] = Jt(E);
        for (const y of R)
          U.filter((N) => N.id === y).each(function(N) {
            let B, G;
            g.nodeAutoGrowToLabelSize && (B = je(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof v == "number" ? (N.setSize(v, g), g.nodeAutoGrowToLabelSize && B ? G = B : G = { width: 0, height: 0 }, Q(N, G)) : N.props.shape === Se.CIRCLE && Rn(["radius"], Object.keys(v), !0) ? (N.setSize(v, g), g.nodeAutoGrowToLabelSize && B ? G = B : G = { width: 0, height: 0 }, Q(N, G)) : N.props.shape === Se.RECTANGLE && Rn(["width", "height"], Object.keys(v), !0) && (N.setSize(v, g), g.nodeAutoGrowToLabelSize && B ? G = B : G = { width: 0, height: 0 }, Q(N, G));
          });
      } else
        U.each(function(R) {
          let y, N;
          g.nodeAutoGrowToLabelSize && (y = je(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof v == "number" ? (R.setSize(v, g), g.nodeAutoGrowToLabelSize && y ? N = y : N = { width: 0, height: 0 }, Q(R, N)) : R.props.shape === Se.CIRCLE && Rn(["radius"], Object.keys(v), !1) ? (R.setSize(v, g), g.nodeAutoGrowToLabelSize && y ? N = y : N = { width: 0, height: 0 }, Q(R, N)) : R.props.shape === Se.RECTANGLE && Rn(["width", "height"], Object.keys(v), !1) && (R.setSize(v, g), g.nodeAutoGrowToLabelSize && y ? N = y : N = { width: 0, height: 0 }, Q(R, N));
        });
      Ce();
    }
    function Ue(v, E) {
      if (E !== void 0) {
        const [R] = Jt(E);
        for (const y of R)
          U.filter((N) => N.id === y).each(function(N) {
            if (N.props.shape !== v) {
              let B, G;
              g.nodeAutoGrowToLabelSize && (B = je(this).select("foreignObject").select("div").node(), G = B.getBoundingClientRect()), N.setShape(v, g), g.nodeAutoGrowToLabelSize && G && Q(N, G);
            }
          });
      } else
        U.each(function(R) {
          if (R.props.shape !== v) {
            let y, N;
            g.nodeAutoGrowToLabelSize && (y = je(this).select("foreignObject").select("div").node(), N = y.getBoundingClientRect()), R.setShape(v, g), g.nodeAutoGrowToLabelSize && N && Q(R, N);
          }
        });
      Ce();
    }
    function Z(v, E) {
      if (Rn(["shape"], Object.keys(v), !1)) {
        let R;
        if (E !== void 0 ? [R] = Jt(E) : R = void 0, v.shape === Se.CIRCLE) {
          const y = ["shape", "radius"];
          if (Rn(y, Object.keys(v), !0))
            if (R !== void 0)
              for (const N of R)
                U.filter((B) => B.id === N).each(function(B) {
                  B.props = v;
                  let G;
                  if (g.nodeAutoGrowToLabelSize) {
                    let Re, xe;
                    Re = je(this).select("foreignObject").select("div").node(), xe = Re.getBoundingClientRect(), G = xe;
                  } else
                    G = { width: 0, height: 0 };
                  Q(B, G);
                });
            else
              U.each(function(N) {
                N.props = v;
                let B;
                if (g.nodeAutoGrowToLabelSize) {
                  let G, Re;
                  G = je(this).select("foreignObject").select("div").node(), Re = G.getBoundingClientRect(), B = Re;
                } else
                  B = { width: 0, height: 0 };
                Q(N, B);
              });
          Er(y, Object.keys(v));
        } else if (v.shape === Se.RECTANGLE) {
          const y = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (Rn(y, Object.keys(v), !0)) {
            if (Object.values(Ge).includes(v.reflexiveEdgeStart) || v.reflexiveEdgeStart === "MOVABLE")
              if (R !== void 0)
                for (const N of R)
                  U.filter((B) => B.id === N).each(function(B) {
                    B.props = v;
                    let G;
                    if (g.nodeAutoGrowToLabelSize) {
                      let Re, xe;
                      Re = je(this).select("foreignObject").select("div").node(), xe = Re.getBoundingClientRect(), G = xe;
                    } else
                      G = { width: 0, height: 0 };
                    Q(B, G);
                  });
              else
                U.each(function(N) {
                  N.props = v;
                  let B;
                  if (g.nodeAutoGrowToLabelSize) {
                    let G, Re;
                    G = je(this).select("foreignObject").select("div").node(), Re = G.getBoundingClientRect(), B = Re;
                  } else
                    B = { width: 0, height: 0 };
                  Q(N, B);
                });
          } else
            tr(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          Er(y, Object.keys(v));
        }
        Ce();
      } else
        tr(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function De(v, E) {
      if (E !== void 0) {
        const [R, y] = Jt(E);
        for (const N of R)
          U.filter((B) => B.id === N).each((B) => {
            B.deletable = v;
          });
        for (const N of y)
          D.filter((B) => B.id === N).each((B) => {
            B.deletable = v;
          });
      } else
        U.each((R) => {
          R.deletable = v;
        }), D.each((R) => {
          R.deletable = v;
        });
    }
    function We(v, E) {
      if (E !== void 0) {
        const [R, y] = Jt(E);
        for (const N of R)
          U.filter((B) => B.id === N).each((B) => {
            B.labelEditable = v;
          });
        for (const N of y)
          D.filter((B) => B.id === N).each((B) => {
            B.labelEditable = v;
          });
      } else
        U.each((R) => {
          R.labelEditable = v;
        }), D.each((R) => {
          R.labelEditable = v;
        });
    }
    function Be(v, E, R) {
      if (R !== void 0) {
        const [y] = Jt(R);
        for (const N of y)
          U.filter((B) => B.id === N).each((B) => {
            B.allowIncomingLinks = v, B.allowOutgoingLinks = E;
          });
      } else
        U.each((y) => {
          y.allowIncomingLinks = v, y.allowOutgoingLinks = E;
        });
    }
    function ot(v, E) {
      if (E !== void 0) {
        const [R] = Jt(E);
        for (const y of R)
          U.filter((N) => N.id === y).each((N) => {
            li(N, v);
          });
      } else
        U.each((R) => {
          li(R, v);
        });
    }
    function wt(v, E) {
      const R = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], y = ["deletable", "labelEditable"];
      if (E !== void 0) {
        const [N, B] = Jt(E), G = N.length === 0;
        for (const Re of N)
          U.filter((xe) => xe.id === Re).each(function(xe) {
            xe.deletable = v.deletable ?? xe.deletable, xe.labelEditable = v.labelEditable ?? xe.labelEditable, "fixedPosition" in v && li(xe, v.fixedPosition), "allowIncomingLinks" in v && (xe.allowIncomingLinks = v.allowIncomingLinks ?? xe.allowIncomingLinks), "allowOutgoingLinks" in v && (xe.allowOutgoingLinks = v.allowOutgoingLinks ?? xe.allowOutgoingLinks);
          });
        for (const Re of B)
          D.selectAll(".graph-controller__link").filter((xe) => xe.id === Re).each(function(xe) {
            xe.deletable = v.deletable ?? xe.deletable, xe.labelEditable = v.labelEditable ?? xe.labelEditable;
          });
        Er(
          G ? y : R,
          Object.keys(v)
        );
      } else
        U.each(function(N) {
          N.deletable = v.deletable ?? N.deletable, N.labelEditable = v.labelEditable ?? N.labelEditable, "fixedPosition" in v && li(N, v.fixedPosition), "allowIncomingLinks" in v && (N.allowIncomingLinks = v.allowIncomingLinks ?? N.allowIncomingLinks), "allowOutgoingLinks" in v && (N.allowOutgoingLinks = v.allowOutgoingLinks ?? N.allowOutgoingLinks);
        }), D.selectAll(".graph-controller__link").each(function(N) {
          N.deletable = v.deletable ?? N.deletable, N.labelEditable = v.labelEditable ?? N.labelEditable;
        }), Er(R, Object.keys(v));
      Ce();
    }
    function Yt(v) {
      g.nodePhysicsEnabled = v, pu(b, v, T, L);
    }
    function P(v) {
      g.fixedLinkDistanceEnabled = v, gu(b, p.value, g, v);
    }
    function F(v) {
      g.showLinkLabels = v;
    }
    function K(v) {
      g.showNodeLabels = v;
    }
    function te(v) {
      g.zoomEnabled = v, Te();
    }
    function H(v) {
      g.allowNodeCreationViaGUI = v;
    }
    function ee(v) {
      g.nodeAutoGrowToLabelSize = v, v || (de.disconnect(), U.each(function(E) {
        Q(E, { width: 0, height: 0 });
      })), Ce();
    }
    function pe() {
      T = r.value.node().clientWidth, L = r.value.node().clientHeight, O = B0(
        (v) => Ee(v, g.zoomEnabled),
        g.zoomEnabled
      ), S = q0(
        r.value,
        O,
        (v) => g.allowNodeCreationViaGUI ? w(v) : null,
        (v) => g.allowNodeCreationViaGUI ? jn(v) : null,
        (v) => {
          g.allowNodeCreationViaGUI && _e(
            { ...g.nodeProps },
            qt(v, S.node())[0],
            qt(v, S.node())[1]
          );
        }
      ), Q0(S, i.value, g, p.value.getNonDefaultLinkColors()), C = J0(S), D = W0(S), U = K0(S), b = gm(p.value, g, T, L, () => Ne()), z = G0(b, T, L, g), de = ie(), Ce();
    }
    function ie() {
      return new ResizeObserver((v) => {
        let E = !1;
        for (let R of v) {
          const y = R;
          if (y && y.borderBoxSize[0] !== void 0) {
            const N = {
              width: y.borderBoxSize[0].inlineSize,
              height: y.borderBoxSize[0].blockSize
            }, G = je(y.target).datum();
            E = Q(G, N);
          }
        }
        E && Ce();
      });
    }
    function he() {
      r.value.node().querySelectorAll(
        ".graph-controller__node-label, .graph-controller__node-label-placeholder"
      ).forEach((E) => de.observe(E));
    }
    function Q(v, E) {
      let R = !1;
      const y = { ...v.renderedSize }, N = E.width > E.height ? E.width / 2 : E.height / 2, B = E.width, G = E.height;
      return v.renderedSize = { width: B, height: G, radius: N }, JSON.stringify(y) !== JSON.stringify(v.renderedSize) && (R = !0, $(
        "nodeRenderedSizeChange",
        { id: v.id, renderedSize: v.renderedSize, baseSize: v.getSize() },
        y
      )), R;
    }
    function Ee(v, E = !0) {
      E && (we = v.transform.x, ke = v.transform.y, ce = v.transform.k, S.attr("transform", `translate(${we},${ke})scale(${ce})`));
    }
    function me(v, E, R, y, N = g.linkGUIEditability.deletable, B = g.linkGUIEditability.labelEditable) {
      let G = p.value.createLink(
        v,
        E,
        R,
        y,
        N,
        B
      );
      if (G !== void 0)
        return G.color && wi(S, i.value, g, G.color), $("linkCreated", { id: G.id, label: G.label }), Ce(), G.id;
    }
    function _e(v = { ...g.nodeProps }, E, R, y, N, B, G = g.nodeGUIEditability.fixedPosition, Re = g.nodeGUIEditability.deletable, xe = g.nodeGUIEditability.labelEditable, Xe = g.nodeGUIEditability.allowIncomingLinks, He = g.nodeGUIEditability.allowOutgoingLinks) {
      let nt = p.value.createNode(
        v,
        E ?? T / 2,
        R ?? L / 2,
        y,
        N,
        B,
        G,
        Re,
        xe,
        Xe,
        He
      );
      return $("nodeCreated", { id: nt.id, label: nt.label, x: nt.x, y: nt.y }), yi(b, p.value, g), m.value = !0, Ce(), nt.id;
    }
    function Ne() {
      U.attr("transform", (v) => `translate(${v.x},${v.y})`), D.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (v) => ($e(v), Cm(v, T, L, g))), Tn();
    }
    function $e(v) {
      let E = v.pathType;
      v.pathType = Rm(v.source, v.target, p.value), E !== v.pathType && Ce();
    }
    function Ve() {
      const v = V, E = je(
        r.value.node().querySelector(`#${i.value + "-node-" + v.id}`)
      ).classed("on-deletion");
      if (v !== void 0 && !E) {
        const R = se;
        R !== void 0 ? C.attr("d", () => v.id === R.id ? bu(v, [T / 2, L / 2], g) : p.value.hasBidirectionalConnection(v, R) ? Ir(v, R, g) : js(v, R, g)) : oe !== void 0 && C.attr(
          "d",
          Ir(v, { x: oe[0], y: oe[1] }, g)
        );
      }
    }
    function Ce(v = 0.5) {
      D = D.data(p.value.links, (E) => E.id).join((E) => {
        const R = E.append("g").classed("graph-controller__link-container", !0);
        return R.append("path").classed("graph-controller__link", !0).style("stroke", (y) => y.color ? y.color : "").attr("id", (y) => i.value + "-link-" + y.id), R.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (y) => {
          Ft(y);
        }).on("pointerout", (y) => s(y)).on("pointerdown", (y, N) => {
          $("linkClicked", { id: N.id, label: N.label }, y.button), h(y, N);
        }).on("pointerup", (y, N) => {
          u(y, N);
        }), R.append("text").attr("class", (y) => `graph-controller__${y.pathType?.toLowerCase()}-path-text`).append("textPath").attr(
          "class",
          (y) => y.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (y) => `#${i.value + "-link-" + y.id}`).text((y) => y.label ? y.label : "add label").on("click", (y, N) => {
          j(y, N);
        }).on("dblclick", (y) => {
          Ft(y);
        }), R.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (y) => `<div class='${y.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (y, N) => {
          j(y, N);
        }).on("dblclick", (y) => {
          Ft(y);
        }), R;
      }), D.selectChild(".graph-controller__link").attr("marker-start", function(E) {
        if (E.pathType?.includes("REVERSE")) {
          let R = `url(#${i.value}-link-arrow-reverse`;
          return E.color && (R += "-" + Ur(E.color)), R += ")", R;
        } else
          return null;
      }).attr("marker-end", function(E) {
        if (E.pathType?.includes("REVERSE"))
          return null;
        {
          let R = `url(#${i.value}-link-arrow`;
          return E.color && (R += "-" + Ur(E.color)), R += ")", R;
        }
      }), D.selectChild("text").attr("class", (E) => `graph-controller__${E.pathType?.toLowerCase()}-path-text`).attr("dy", (E) => E.pathType === Bt.REFLEXIVE ? 15 : E.pathType == Bt.LINEREVERSE ? -10 : E.pathType?.includes("REVERSE") ? 20 : -10).selectChild("textPath").attr(
        "class",
        (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (E) => !g.showLinkLabels || !E.label && !E.labelEditable).classed("not-editable", (E) => !E.labelEditable).attr("startOffset", (E) => E.pathType?.includes("REVERSE") ? "46%" : "50%").text((E) => E.label ? E.label : "add label"), U = U.data(p.value.nodes, (E) => E.id).join(
        (E) => {
          const R = E.append("g").classed("graph-controller__node-container", !0).call(z).on("dblclick", (y) => {
            Ft(y);
          }).on("pointerenter", (y, N) => o(N)).on("pointerout", (y, N) => l(N)).on("pointerdown", (y, N) => {
            $(
              "nodeClicked",
              { id: N.id, label: N.label, x: N.x, y: N.y },
              y.button
            ), d = { x: y.x, y: y.y }, ft(y, N);
          }).on("pointerup", (y, N) => {
            jn(y, N);
          });
          return yt(R);
        },
        (E) => (E.each(function(R) {
          const y = je(this), N = y.selectChild(".graph-controller__node").node();
          ut(R, N) ? (ct(N, y), yi(b, p.value, g)) : Ct(y);
        }), E)
      ), U.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (E) => E.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("controls-node-size", g.nodeAutoGrowToLabelSize).classed("hidden", (E) => !g.showNodeLabels || !E.label && !E.labelEditable).classed("not-editable", (E) => !E.labelEditable).text((E) => E.label ? E.label : "add label"), window.MathJax?.version && window.MathJax.typesetPromise().then(() => {
        dn();
      }), g.nodeAutoGrowToLabelSize && he(), b.nodes(p.value.nodes), b.alpha(v).restart();
    }
    function ut(v, E) {
      return v.props.shape === Se.CIRCLE && E.tagName !== "circle" || v.props.shape === Se.RECTANGLE && E.tagName !== "rect";
    }
    function ct(v, E) {
      g.nodeAutoGrowToLabelSize && de.unobserve(
        E.select(
          ".graph-controller__node-label, .graph-controller__node-label-placeholder"
        ).node()
      ), v.remove(), E.selectChild(".graph-controller__node-label-container").remove(), yt(E);
    }
    function yt(v) {
      v.filter((R) => R.props.shape === Se.CIRCLE).append(Se.CIRCLE).classed("graph-controller__node", !0).attr("id", (R) => `${i.value + "-node-" + R.id}`).attr("r", (R) => R.renderedSize.radius).style("fill", (R) => R.color ? R.color : ""), v.filter((R) => R.props.shape === Se.RECTANGLE).append(Se.RECTANGLE).classed("graph-controller__node", !0).attr("id", (R) => `${i.value + "-node-" + R.id}`).attr("width", (R) => R.renderedSize.width).attr("height", (R) => R.renderedSize.height).attr("x", (R) => -0.5 * R.renderedSize.width).attr("y", (R) => -0.5 * R.renderedSize.height).attr("rx", (R) => R.props.cornerRadius).attr("ry", (R) => R.props.cornerRadius).style("fill", (R) => R.color ? R.color : "");
      const E = v.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return E.filter((R) => R.props.shape === Se.CIRCLE).attr("width", (R) => 2 * R.renderedSize.radius).attr("height", (R) => 2 * R.renderedSize.radius).attr("x", (R) => -R.renderedSize.radius).attr("y", (R) => -R.renderedSize.radius), E.filter((R) => R.props.shape === Se.RECTANGLE).attr("width", (R) => R.renderedSize.width).attr("height", (R) => R.renderedSize.height).attr("x", (R) => -0.5 * R.renderedSize.width).attr("y", (R) => -0.5 * R.renderedSize.height), E.append("xhtml:div").on("click", (R, y) => {
        k(R, y);
      }).on("dblclick", (R) => {
        Ft(R);
      }).on("pointerenter", (R, y) => o(y)).on("pointerout", (R, y) => l(y)), v;
    }
    function Ct(v) {
      v.selectChild(".graph-controller__node").filter((E) => E.props.shape === Se.CIRCLE).attr("r", (E) => E.renderedSize.radius), v.filter((E) => E.props.shape === Se.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (E) => 2 * E.renderedSize.radius).attr("height", (E) => 2 * E.renderedSize.radius).attr("x", (E) => -E.renderedSize.radius).attr("y", (E) => -E.renderedSize.radius), v.selectChild(".graph-controller__node").filter((E) => E.props.shape === Se.RECTANGLE).attr("width", (E) => E.renderedSize.width).attr("height", (E) => E.renderedSize.height).attr("x", (E) => -0.5 * E.renderedSize.width).attr("y", (E) => -0.5 * E.renderedSize.height).attr("rx", (E) => E.props?.cornerRadius).attr("ry", (E) => E.props?.cornerRadius), v.filter((E) => E.props.shape === Se.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (E) => E.renderedSize.width).attr("height", (E) => E.renderedSize.height).attr("x", (E) => -0.5 * E.renderedSize.width).attr("y", (E) => -0.5 * E.renderedSize.height);
    }
    function dn() {
      D.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(v) {
        const E = this, R = v, y = je(E.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !g.showLinkLabels || !R.label && !R.labelEditable
        ).node();
        y.replaceChild(E, y.childNodes[0]);
      }), D.selectChild("text").selectChild("textPath").each(function() {
        const v = this;
        let E = !1;
        v.childNodes.forEach((y) => {
          y?.nodeType === Node.TEXT_NODE && y?.textContent?.trim() !== "" && (E = !0);
        }), E || je(v).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), Tn();
    }
    function Tn() {
      D.selectChild("text").selectChild("textPath").each(function() {
        const v = this, [E, R] = Y(v);
        je(v.parentNode.parentNode).select("foreignObject").attr("x", E).attr("y", R);
      });
    }
    function ft(v, E) {
      (v.button === 2 || v.pointerType === "touch") && (_l(v), E.allowOutgoingLinks && Jn(E), E.deletable && (ve = setTimeout(() => {
        se = void 0, Rt(E);
      }, 250)));
    }
    function Rt(v) {
      let E = r.value.node().querySelector(`#${i.value + "-node-" + v.id}`);
      je(E).classed("on-deletion", !0);
      let R = je(E.parentElement);
      if (v.props.shape === Se.CIRCLE) {
        let y = T0().outerRadius(v.props.radius + 4).innerRadius(v.props.radius), N = [{ startAngle: 0, endAngle: 0 }];
        R.append("g").attr("class", "arc").selectAll("path.arc").data(N).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(pl).attrTween("d", function(G) {
          let Re = { startAngle: 0, endAngle: 2 * Math.PI }, xe = fo(G, Re);
          return function(Xe) {
            return y(xe(Xe));
          };
        }).on("end", () => Fn(v));
      } else if (v.props.shape === Se.RECTANGLE) {
        const y = X0(
          v.renderedSize.width,
          v.renderedSize.height,
          v.props.cornerRadius
        );
        let N = R.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", y), B = 2 * v.renderedSize.width + 2 * v.renderedSize.height;
        N.attr("stroke-dasharray", B).attr("stroke-dashoffset", B).transition().duration(750).ease(pl).attr("stroke-dashoffset", 0).on("end", () => Fn(v));
      }
    }
    function Fn(v) {
      let E = p.value.removeNode(v);
      if (E !== void 0) {
        let [R, y] = E;
        $("nodeDeleted", {
          id: R.id,
          label: R.label,
          x: R.x,
          y: R.y
        }), y.forEach((N) => {
          $("linkDeleted", { id: N.id, label: N.label });
        }), yi(b, p.value, g);
      }
      m.value = p.value.nodes.length > 0, ge(), Ce();
    }
    function Jn(v) {
      oe = [v.x, v.y], V = v, C.attr("marker-end", `url(#${i.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", Ir(v, { x: oe[0], y: oe[1] }, g));
    }
    function jn(v, E = void 0) {
      Ft(v), clearTimeout(ve), E && pr(E), v.pointerType === "mouse" || (v.pointerType === "touch" || v.pointerType === "pen") && !Y0(
        { x: d.x, y: d.y },
        { x: v.x, y: v.y }
      ) ? gr() : ge();
    }
    function pr(v) {
      let E = r.value.node().querySelector(`#${i.value + "-node-" + v.id}`), R = je(E), y = je(E.parentElement);
      v.props.shape === Se.CIRCLE ? (R.classed("on-deletion", !1), y.select("g.arc").select("path.arc").interrupt().remove(), y.select("g.arc").remove()) : v.props.shape === Se.RECTANGLE && (R.classed("on-deletion") && y.select("path").attr("stroke-dasharray", 2 * v.props.width + 2 * v.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * v.props.width + 2 * v.props.height).on("end", () => {
        y.select("path").remove();
      }), R.classed("on-deletion", !1));
    }
    function gr() {
      const v = V, E = se;
      ge(), !(v === void 0 || E === void 0) && me(v.id, E.id);
    }
    function w(v) {
      if (Ft(v), V !== void 0) {
        const E = Gd(v, r.value.node())[0];
        E !== void 0 && (oe = [(E[0] - we) / ce, (E[1] - ke) / ce], Ve());
      }
    }
    function o(v) {
      v.allowIncomingLinks && (se = v);
    }
    function l(v) {
      v && pr(v), se = void 0, clearTimeout(ve);
    }
    function s(v) {
      Ft(v), clearTimeout(Ae);
    }
    function u(v, E) {
      Ft(v), clearTimeout(Ae), (v.button === 2 || v.pointerType === "touch") && E.deletable && M(E);
    }
    function h(v, E) {
      (v.button === 2 || v.pointerType === "touch") && (_l(v), E.deletable && (Ae = setTimeout(() => {
        _(E);
      }, 250)));
    }
    function _(v) {
      let E = r.value.node().querySelector(`#${i.value + "-link-" + v.id}`);
      if (je(E).classed("on-deletion", !0), E instanceof SVGPathElement) {
        let R = je(E), y = E.getTotalLength(), N = E.parentElement.querySelector("text"), B = Array.from(N.classList).some(
          (xe) => xe.includes("reverse")
        ), G = 0, Re = B ? y : -y;
        R.attr("stroke-dasharray", y).attr("stroke-dashoffset", G).transition().duration(750).attr("stroke-dashoffset", Re).on("end", () => x(v));
      }
    }
    function x(v) {
      let E = v.color, R = p.value.removeLink(v);
      R !== void 0 && $("linkDeleted", { id: R.id, label: R.label }), E && (p.value.hasNonDefaultLinkColor(E) || ms(S, i.value, E)), Ce();
    }
    function M(v) {
      let E = r.value.node().querySelector(`#${i.value + "-link-" + v.id}`);
      if (je(E).classed("on-deletion") && E instanceof SVGPathElement) {
        let R = je(E), y = E.getTotalLength();
        R.attr("stroke-dasharray", y).attr("stroke-dashoffset", y).transition().attr("stroke-dashoffset", 0).on("end", () => {
          R.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      je(E).classed("on-deletion", !1);
    }
    function k(v, E) {
      Ft(v), E.labelEditable && I(E, [E.x, E.y]);
    }
    function j(v, E) {
      if (E.labelEditable) {
        let R = v.target, y;
        R.nodeName === "textPath" ? y = R : y = R.closest(".graph-controller__link-container").querySelector("textPath");
        let N = Y(y);
        I(E, N);
      }
    }
    function I(v, E) {
      let R = v instanceof $i ? "node" : "link";
      const y = document.createElement("input");
      y.setAttribute("class", "graph-controller__label-input"), y.setAttribute("id", `${R}-label-input-field`), v.label == null ? y.value = "" : y.value = v.label, y.placeholder = `Enter ${R} label`;
      const N = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      N.setAttribute("width", "100%"), N.setAttribute("height", "100%"), N.setAttribute("x", `${E[0] - 90}`), N.setAttribute("y", `${E[1] - 12}`), N.append(y), r.value.select("svg").select("g").node().append(N), y.focus(), c !== "desktop" && (f = !0), y.ondblclick = function(G) {
        Ft(G);
      };
      let B = !1;
      y.onkeyup = function(G) {
        G.key === "Enter" ? (B = !0, y.blur()) : G.key === "Escape" && (y.value = "", y.blur());
      }, y.onblur = function() {
        B && W(v, y.value.trim()), N.remove(), c !== "desktop" && (f = !1);
      };
    }
    function W(v, E) {
      $("labelEdited", { id: v.id }, E), v.label = E, Ce();
      let R = v instanceof $i ? "node" : "link";
      R === "link" ? ue(v) : R === "node" && E !== "" && q(v);
    }
    function ue(v) {
      const E = r.value.node().querySelector(
        `#${i.value + "-link-" + v.id}`
      ).parentElement;
      E.querySelector("mjx-container")?.remove(), E.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), Ce();
    }
    function q(v) {
      const E = r.value.node().querySelector(`#${i.value + "-node-" + v.id}`).parentElement;
      if (E) {
        const R = E.parentElement;
        E.remove(), R.append(E);
      }
    }
    function Y(v) {
      let E = r.value.select("svg").node().getBoundingClientRect(), R = v.getBoundingClientRect(), y = (R.x - E.x - we) / ce, N = (R.y - E.y - ke) / ce;
      return [y, N];
    }
    function ge() {
      C?.classed("hidden", !0).attr("marker-end", "null"), V = void 0, se = void 0, oe = void 0;
    }
    function A(v) {
      let E, R;
      try {
        if (typeof v == "string")
          [E, R] = zm(v);
        else if (typeof v == "object")
          [E, R] = Fm(v);
        else {
          tr("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (y) {
        tr("Error during parsing:", `Invalid data format:
` + y);
        return;
      }
      Je(), le(E, R);
    }
    function le(v, E) {
      for (let y of v)
        _e(
          y.props ?? g.nodeProps,
          y.x,
          y.y,
          y.idImported,
          y.label,
          y.color,
          y.fixedPosition,
          y.deletable,
          y.labelEditable,
          y.allowIncomingLinks,
          y.allowOutgoingLinks
        );
      const R = (y) => p.value.nodes.find((N) => N.idImported === y);
      for (let y of E) {
        let N = R(y.sourceIdImported), B = R(y.targetIdImported);
        N && B && (me(
          N.id,
          B.id,
          y.label,
          y.color,
          y.deletable,
          y.labelEditable
        ), y.color && wi(S, i.value, g, y.color));
      }
    }
    function ye(v) {
      for (let E of v) {
        const R = p.value.links.filter((y) => y.id === E).map((y) => y.color).shift();
        R && (p.value.hasNonDefaultLinkColor(R, E) ? p.value.getLinkIdsWithNonDefaultLinkColors(
          R,
          E
        ).every(
          (B) => v.includes(B)
        ) && ms(S, i.value, R) : ms(S, i.value, R));
      }
    }
    function Te() {
      b.stop(), r.value.selectChildren().remove(), O = void 0, we = 0, ke = 0, ce = 1, S = void 0, C = void 0, D = void 0, U = void 0, b = void 0, ge(), pe();
    }
    function Pe() {
      g.isCanvasBoundToView && (f || Te());
    }
    function Je() {
      p.value.links.forEach(
        (v) => $("linkDeleted", { id: v.id, label: v.label })
      ), p.value.nodes.forEach(
        (v) => $("nodeDeleted", {
          id: v.id,
          label: v.label,
          x: v.x,
          y: v.y
        })
      ), p.value = new xl(), m.value = !1, Te();
    }
    return (v, E) => (Nn(), Cn(Ut, null, [
      E[0] || (E[0] = jt("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      ai(jt("div", null, [
        xn(lh, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": $r(c)
        }, null, 8, ["platform-type"])
      ], 512), [
        [fi, !m.value]
      ])
    ], 64));
  }
});
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  /* @__PURE__ */ Xf(Um, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
