/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ds(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const xt = {}, Sn = [], Ce = () => {
}, ua = () => !1, ui = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ps = (t) => t.startsWith("onUpdate:"), It = Object.assign, gs = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, aa = Object.prototype.hasOwnProperty, gt = (t, e) => aa.call(t, e), lt = Array.isArray, Pn = (t) => ai(t) === "[object Map]", al = (t) => ai(t) === "[object Set]", at = (t) => typeof t == "function", Rt = (t) => typeof t == "string", en = (t) => typeof t == "symbol", Ct = (t) => t !== null && typeof t == "object", cl = (t) => (Ct(t) || at(t)) && at(t.then) && at(t.catch), fl = Object.prototype.toString, ai = (t) => fl.call(t), ca = (t) => ai(t).slice(8, -1), ci = (t) => ai(t) === "[object Object]", ms = (t) => Rt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Un = /* @__PURE__ */ ds(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), fi = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, fa = /-(\w)/g, ve = fi(
  (t) => t.replace(fa, (e, n) => n ? n.toUpperCase() : "")
), ha = /\B([A-Z])/g, de = fi(
  (t) => t.replace(ha, "-$1").toLowerCase()
), hl = fi((t) => t.charAt(0).toUpperCase() + t.slice(1)), Pi = fi(
  (t) => t ? `on${hl(t)}` : ""
), Ze = (t, e) => !Object.is(t, e), Mi = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Gi = (t, e, n, r = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, da = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Qs = (t) => {
  const e = Rt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Zs;
const hi = () => Zs || (Zs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ws(t) {
  if (lt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = Rt(r) ? wa(r) : ws(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (Rt(t) || Ct(t))
    return t;
}
const pa = /;(?![^(]*\))/g, ga = /:([^]+)/, ma = /\/\*[^]*?\*\//g;
function wa(t) {
  const e = {};
  return t.replace(ma, "").split(pa).forEach((n) => {
    if (n) {
      const r = n.split(ga);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function ys(t) {
  let e = "";
  if (Rt(t))
    e = t;
  else if (lt(t))
    for (let n = 0; n < t.length; n++) {
      const r = ys(t[n]);
      r && (e += r + " ");
    }
  else if (Ct(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const ya = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _a = /* @__PURE__ */ ds(ya);
function dl(t) {
  return !!t || t === "";
}
const pl = (t) => !!(t && t.__v_isRef === !0), $e = (t) => Rt(t) ? t : t == null ? "" : lt(t) || Ct(t) && (t.toString === fl || !at(t.toString)) ? pl(t) ? $e(t.value) : JSON.stringify(t, gl, 2) : String(t), gl = (t, e) => pl(e) ? gl(t, e.value) : Pn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[ki(r, s) + " =>"] = i, n),
    {}
  )
} : al(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => ki(n))
} : en(e) ? ki(e) : Ct(e) && !lt(e) && !ci(e) ? String(e) : e, ki = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    en(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Zt;
class va {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Zt, !e && Zt && (this.index = (Zt.scopes || (Zt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].pause();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].resume();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = Zt;
      try {
        return Zt = this, e();
      } finally {
        Zt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Zt, Zt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Zt = this.prevScope, this.prevScope = void 0);
  }
  stop(e) {
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
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ba() {
  return Zt;
}
let kt;
const Ti = /* @__PURE__ */ new WeakSet();
class ml {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Zt && Zt.active && Zt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ti.has(this) && (Ti.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || yl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, to(this), _l(this);
    const e = kt, n = be;
    kt = this, be = !0;
    try {
      return this.fn();
    } finally {
      vl(this), kt = e, be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        bs(e);
      this.deps = this.depsTail = void 0, to(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ti.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Hi(this) && this.run();
  }
  get dirty() {
    return Hi(this);
  }
}
let wl = 0, Wn, Kn;
function yl(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Kn, Kn = t;
    return;
  }
  t.next = Wn, Wn = t;
}
function _s() {
  wl++;
}
function vs() {
  if (--wl > 0)
    return;
  if (Kn) {
    let e = Kn;
    for (Kn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Wn; ) {
    let e = Wn;
    for (Wn = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function _l(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function vl(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), bs(r), xa(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  t.deps = e, t.depsTail = n;
}
function Hi(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (bl(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function bl(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === er) || (t.globalVersion = er, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Hi(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = kt, r = be;
  kt = t, be = !0;
  try {
    _l(t);
    const i = t.fn(t._value);
    (e.version === 0 || Ze(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    kt = n, be = r, vl(t), t.flags &= -3;
  }
}
function bs(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: i } = t;
  if (r && (r.nextSub = i, t.prevSub = void 0), i && (i.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      bs(s, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function xa(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let be = !0;
const xl = [];
function Ve() {
  xl.push(be), be = !1;
}
function ze() {
  const t = xl.pop();
  be = t === void 0 ? !0 : t;
}
function to(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = kt;
    kt = void 0;
    try {
      e();
    } finally {
      kt = n;
    }
  }
}
let er = 0;
class Ea {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!kt || !be || kt === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== kt)
      n = this.activeLink = new Ea(kt, this), kt.deps ? (n.prevDep = kt.depsTail, kt.depsTail.nextDep = n, kt.depsTail = n) : kt.deps = kt.depsTail = n, El(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = kt.depsTail, n.nextDep = void 0, kt.depsTail.nextDep = n, kt.depsTail = n, kt.deps === n && (kt.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, er++, this.notify(e);
  }
  notify(e) {
    _s();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      vs();
    }
  }
}
function El(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        El(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const qi = /* @__PURE__ */ new WeakMap(), dn = Symbol(
  ""
), Ui = Symbol(
  ""
), nr = Symbol(
  ""
);
function jt(t, e, n) {
  if (be && kt) {
    let r = qi.get(t);
    r || qi.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new xs()), i.map = r, i.key = n), i.track();
  }
}
function Fe(t, e, n, r, i, s) {
  const o = qi.get(t);
  if (!o) {
    er++;
    return;
  }
  const l = (u) => {
    u && u.trigger();
  };
  if (_s(), e === "clear")
    o.forEach(l);
  else {
    const u = lt(t), c = u && ms(n);
    if (u && n === "length") {
      const a = Number(r);
      o.forEach((f, h) => {
        (h === "length" || h === nr || !en(h) && h >= a) && l(f);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(nr)), e) {
        case "add":
          u ? c && l(o.get("length")) : (l(o.get(dn)), Pn(t) && l(o.get(Ui)));
          break;
        case "delete":
          u || (l(o.get(dn)), Pn(t) && l(o.get(Ui)));
          break;
        case "set":
          Pn(t) && l(o.get(dn));
          break;
      }
  }
  vs();
}
function wn(t) {
  const e = yt(t);
  return e === t ? e : (jt(e, "iterate", nr), ge(t) ? e : e.map($t));
}
function di(t) {
  return jt(t = yt(t), "iterate", nr), t;
}
const Sa = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ci(this, Symbol.iterator, $t);
  },
  concat(...t) {
    return wn(this).concat(
      ...t.map((e) => lt(e) ? wn(e) : e)
    );
  },
  entries() {
    return Ci(this, "entries", (t) => (t[1] = $t(t[1]), t));
  },
  every(t, e) {
    return Ie(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Ie(this, "filter", t, e, (n) => n.map($t), arguments);
  },
  find(t, e) {
    return Ie(this, "find", t, e, $t, arguments);
  },
  findIndex(t, e) {
    return Ie(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Ie(this, "findLast", t, e, $t, arguments);
  },
  findLastIndex(t, e) {
    return Ie(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Ie(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Ni(this, "includes", t);
  },
  indexOf(...t) {
    return Ni(this, "indexOf", t);
  },
  join(t) {
    return wn(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Ni(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Ie(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Fn(this, "pop");
  },
  push(...t) {
    return Fn(this, "push", t);
  },
  reduce(t, ...e) {
    return eo(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return eo(this, "reduceRight", t, e);
  },
  shift() {
    return Fn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Ie(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Fn(this, "splice", t);
  },
  toReversed() {
    return wn(this).toReversed();
  },
  toSorted(t) {
    return wn(this).toSorted(t);
  },
  toSpliced(...t) {
    return wn(this).toSpliced(...t);
  },
  unshift(...t) {
    return Fn(this, "unshift", t);
  },
  values() {
    return Ci(this, "values", $t);
  }
};
function Ci(t, e, n) {
  const r = di(t), i = r[e]();
  return r !== t && !ge(t) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = n(s.value)), s;
  }), i;
}
const Pa = Array.prototype;
function Ie(t, e, n, r, i, s) {
  const o = di(t), l = o !== t && !ge(t), u = o[e];
  if (u !== Pa[e]) {
    const f = u.apply(t, s);
    return l ? $t(f) : f;
  }
  let c = n;
  o !== t && (l ? c = function(f, h) {
    return n.call(this, $t(f), h, t);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, t);
  }));
  const a = u.call(o, c, r);
  return l && i ? i(a) : a;
}
function eo(t, e, n, r) {
  const i = di(t);
  let s = n;
  return i !== t && (ge(t) ? n.length > 3 && (s = function(o, l, u) {
    return n.call(this, o, l, u, t);
  }) : s = function(o, l, u) {
    return n.call(this, o, $t(l), u, t);
  }), i[e](s, ...r);
}
function Ni(t, e, n) {
  const r = yt(t);
  jt(r, "iterate", nr);
  const i = r[e](...n);
  return (i === -1 || i === !1) && Ps(n[0]) ? (n[0] = yt(n[0]), r[e](...n)) : i;
}
function Fn(t, e, n = []) {
  Ve(), _s();
  const r = yt(t)[e].apply(t, n);
  return vs(), ze(), r;
}
const Ma = /* @__PURE__ */ ds("__proto__,__v_isRef,__isVue"), Sl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(en)
);
function ka(t) {
  en(t) || (t = String(t));
  const e = yt(this);
  return jt(e, "has", t), e.hasOwnProperty(t);
}
class Pl {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? Fa : Cl : s ? Tl : kl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = lt(e);
    if (!i) {
      let u;
      if (o && (u = Sa[n]))
        return u;
      if (n === "hasOwnProperty")
        return ka;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Bt(e) ? e : r
    );
    return (en(n) ? Sl.has(n) : Ma(n)) || (i || jt(e, "get", n), s) ? l : Bt(l) ? o && ms(n) ? l : l.value : Ct(l) ? i ? Nl(l) : pi(l) : l;
  }
}
class Ml extends Pl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const u = tn(s);
      if (!ge(r) && !tn(r) && (s = yt(s), r = yt(r)), !lt(e) && Bt(s) && !Bt(r))
        return u ? !1 : (s.value = r, !0);
    }
    const o = lt(e) && ms(n) ? Number(n) < e.length : gt(e, n), l = Reflect.set(
      e,
      n,
      r,
      Bt(e) ? e : i
    );
    return e === yt(i) && (o ? Ze(r, s) && Fe(e, "set", n, r) : Fe(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = gt(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && Fe(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!en(n) || !Sl.has(n)) && jt(e, "has", n), r;
  }
  ownKeys(e) {
    return jt(
      e,
      "iterate",
      lt(e) ? "length" : dn
    ), Reflect.ownKeys(e);
  }
}
class Ta extends Pl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const Ca = /* @__PURE__ */ new Ml(), Na = /* @__PURE__ */ new Ta(), Ra = /* @__PURE__ */ new Ml(!0);
const Wi = (t) => t, br = (t) => Reflect.getPrototypeOf(t);
function La(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = yt(i), o = Pn(s), l = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, c = i[t](...r), a = n ? Wi : e ? Hr : $t;
    return !e && jt(
      s,
      "iterate",
      u ? Ui : dn
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = c.next();
        return h ? { value: f, done: h } : {
          value: l ? [a(f[0]), a(f[1])] : a(f),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function xr(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Ia(t, e) {
  const n = {
    get(i) {
      const s = this.__v_raw, o = yt(s), l = yt(i);
      t || (Ze(i, l) && jt(o, "get", i), jt(o, "get", l));
      const { has: u } = br(o), c = e ? Wi : t ? Hr : $t;
      if (u.call(o, i))
        return c(s.get(i));
      if (u.call(o, l))
        return c(s.get(l));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && jt(yt(i), "iterate", dn), Reflect.get(i, "size", i);
    },
    has(i) {
      const s = this.__v_raw, o = yt(s), l = yt(i);
      return t || (Ze(i, l) && jt(o, "has", i), jt(o, "has", l)), i === l ? s.has(i) : s.has(i) || s.has(l);
    },
    forEach(i, s) {
      const o = this, l = o.__v_raw, u = yt(l), c = e ? Wi : t ? Hr : $t;
      return !t && jt(u, "iterate", dn), l.forEach((a, f) => i.call(s, c(a), c(f), o));
    }
  };
  return It(
    n,
    t ? {
      add: xr("add"),
      set: xr("set"),
      delete: xr("delete"),
      clear: xr("clear")
    } : {
      add(i) {
        !e && !ge(i) && !tn(i) && (i = yt(i));
        const s = yt(this);
        return br(s).has.call(s, i) || (s.add(i), Fe(s, "add", i, i)), this;
      },
      set(i, s) {
        !e && !ge(s) && !tn(s) && (s = yt(s));
        const o = yt(this), { has: l, get: u } = br(o);
        let c = l.call(o, i);
        c || (i = yt(i), c = l.call(o, i));
        const a = u.call(o, i);
        return o.set(i, s), c ? Ze(s, a) && Fe(o, "set", i, s) : Fe(o, "add", i, s), this;
      },
      delete(i) {
        const s = yt(this), { has: o, get: l } = br(s);
        let u = o.call(s, i);
        u || (i = yt(i), u = o.call(s, i)), l && l.call(s, i);
        const c = s.delete(i);
        return u && Fe(s, "delete", i, void 0), c;
      },
      clear() {
        const i = yt(this), s = i.size !== 0, o = i.clear();
        return s && Fe(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = La(i, t, e);
  }), n;
}
function Es(t, e) {
  const n = Ia(t, e);
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    gt(n, i) && i in r ? n : r,
    i,
    s
  );
}
const Oa = {
  get: /* @__PURE__ */ Es(!1, !1)
}, $a = {
  get: /* @__PURE__ */ Es(!1, !0)
}, Aa = {
  get: /* @__PURE__ */ Es(!0, !1)
};
const kl = /* @__PURE__ */ new WeakMap(), Tl = /* @__PURE__ */ new WeakMap(), Cl = /* @__PURE__ */ new WeakMap(), Fa = /* @__PURE__ */ new WeakMap();
function ja(t) {
  switch (t) {
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
function Ba(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ja(ca(t));
}
function pi(t) {
  return tn(t) ? t : Ss(
    t,
    !1,
    Ca,
    Oa,
    kl
  );
}
function Da(t) {
  return Ss(
    t,
    !1,
    Ra,
    $a,
    Tl
  );
}
function Nl(t) {
  return Ss(
    t,
    !0,
    Na,
    Aa,
    Cl
  );
}
function Ss(t, e, n, r, i) {
  if (!Ct(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = Ba(t);
  if (s === 0)
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const l = new Proxy(
    t,
    s === 2 ? r : n
  );
  return i.set(t, l), l;
}
function Mn(t) {
  return tn(t) ? Mn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function tn(t) {
  return !!(t && t.__v_isReadonly);
}
function ge(t) {
  return !!(t && t.__v_isShallow);
}
function Ps(t) {
  return t ? !!t.__v_raw : !1;
}
function yt(t) {
  const e = t && t.__v_raw;
  return e ? yt(e) : t;
}
function Va(t) {
  return !gt(t, "__v_skip") && Object.isExtensible(t) && Gi(t, "__v_skip", !0), t;
}
const $t = (t) => Ct(t) ? pi(t) : t, Hr = (t) => Ct(t) ? Nl(t) : t;
function Bt(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function no(t) {
  return za(t, !1);
}
function za(t, e) {
  return Bt(t) ? t : new Ga(t, e);
}
class Ga {
  constructor(e, n) {
    this.dep = new xs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : yt(e), this._value = n ? e : $t(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || ge(e) || tn(e);
    e = r ? e : yt(e), Ze(e, n) && (this._rawValue = e, this._value = r ? e : $t(e), this.dep.trigger());
  }
}
function rr(t) {
  return Bt(t) ? t.value : t;
}
const Ha = {
  get: (t, e, n) => e === "__v_raw" ? t : rr(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Bt(i) && !Bt(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Rl(t) {
  return Mn(t) ? t : new Proxy(t, Ha);
}
class qa {
  constructor(e, n, r) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new xs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = er - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    kt !== this)
      return yl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return bl(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Ua(t, e, n = !1) {
  let r, i;
  return at(t) ? r = t : (r = t.get, i = t.set), new qa(r, i, n);
}
const Er = {}, qr = /* @__PURE__ */ new WeakMap();
let cn;
function Wa(t, e = !1, n = cn) {
  if (n) {
    let r = qr.get(n);
    r || qr.set(n, r = []), r.push(t);
  }
}
function Ka(t, e, n = xt) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: l, call: u } = n, c = (m) => i ? m : ge(m) || i === !1 || i === 0 ? je(m, 1) : je(m);
  let a, f, h, p, w = !1, v = !1;
  if (Bt(t) ? (f = () => t.value, w = ge(t)) : Mn(t) ? (f = () => c(t), w = !0) : lt(t) ? (v = !0, w = t.some((m) => Mn(m) || ge(m)), f = () => t.map((m) => {
    if (Bt(m))
      return m.value;
    if (Mn(m))
      return c(m);
    if (at(m))
      return u ? u(m, 2) : m();
  })) : at(t) ? e ? f = u ? () => u(t, 2) : t : f = () => {
    if (h) {
      Ve();
      try {
        h();
      } finally {
        ze();
      }
    }
    const m = cn;
    cn = a;
    try {
      return u ? u(t, 3, [p]) : t(p);
    } finally {
      cn = m;
    }
  } : f = Ce, e && i) {
    const m = f, P = i === !0 ? 1 / 0 : i;
    f = () => je(m(), P);
  }
  const y = ba(), d = () => {
    a.stop(), y && y.active && gs(y.effects, a);
  };
  if (s && e) {
    const m = e;
    e = (...P) => {
      m(...P), d();
    };
  }
  let S = v ? new Array(t.length).fill(Er) : Er;
  const N = (m) => {
    if (!(!(a.flags & 1) || !a.dirty && !m))
      if (e) {
        const P = a.run();
        if (i || w || (v ? P.some(($, B) => Ze($, S[B])) : Ze(P, S))) {
          h && h();
          const $ = cn;
          cn = a;
          try {
            const B = [
              P,
              // pass undefined as the old value when it's changed for the first time
              S === Er ? void 0 : v && S[0] === Er ? [] : S,
              p
            ];
            S = P, u ? u(e, 3, B) : (
              // @ts-expect-error
              e(...B)
            );
          } finally {
            cn = $;
          }
        }
      } else
        a.run();
  };
  return l && l(N), a = new ml(f), a.scheduler = o ? () => o(N, !1) : N, p = (m) => Wa(m, !1, a), h = a.onStop = () => {
    const m = qr.get(a);
    if (m) {
      if (u)
        u(m, 4);
      else
        for (const P of m) P();
      qr.delete(a);
    }
  }, e ? r ? N(!0) : S = a.run() : o ? o(N.bind(null, !0), !0) : a.run(), d.pause = a.pause.bind(a), d.resume = a.resume.bind(a), d.stop = d, d;
}
function je(t, e = 1 / 0, n) {
  if (e <= 0 || !Ct(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Bt(t))
    je(t.value, e, n);
  else if (lt(t))
    for (let r = 0; r < t.length; r++)
      je(t[r], e, n);
  else if (al(t) || Pn(t))
    t.forEach((r) => {
      je(r, e, n);
    });
  else if (ci(t)) {
    for (const r in t)
      je(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && je(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function dr(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    gi(i, e, n);
  }
}
function Re(t, e, n, r) {
  if (at(t)) {
    const i = dr(t, e, n, r);
    return i && cl(i) && i.catch((s) => {
      gi(s, e, n);
    }), i;
  }
  if (lt(t)) {
    const i = [];
    for (let s = 0; s < t.length; s++)
      i.push(Re(t[s], e, n, r));
    return i;
  }
}
function gi(t, e, n, r = !0) {
  const i = e ? e.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = e && e.appContext.config || xt;
  if (e) {
    let l = e.parent;
    const u = e.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let f = 0; f < a.length; f++)
          if (a[f](t, u, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Ve(), dr(s, null, 10, [
        t,
        u,
        c
      ]), ze();
      return;
    }
  }
  Xa(t, n, i, r, o);
}
function Xa(t, e, n, r = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const Ht = [];
let Me = -1;
const kn = [];
let Xe = null, _n = 0;
const Ll = /* @__PURE__ */ Promise.resolve();
let Ur = null;
function Il(t) {
  const e = Ur || Ll;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ya(t) {
  let e = Me + 1, n = Ht.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = Ht[r], s = ir(i);
    s < t || s === t && i.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
function Ms(t) {
  if (!(t.flags & 1)) {
    const e = ir(t), n = Ht[Ht.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= ir(n) ? Ht.push(t) : Ht.splice(Ya(e), 0, t), t.flags |= 1, Ol();
  }
}
function Ol() {
  Ur || (Ur = Ll.then(Al));
}
function Ja(t) {
  lt(t) ? kn.push(...t) : Xe && t.id === -1 ? Xe.splice(_n + 1, 0, t) : t.flags & 1 || (kn.push(t), t.flags |= 1), Ol();
}
function ro(t, e, n = Me + 1) {
  for (; n < Ht.length; n++) {
    const r = Ht[n];
    if (r && r.flags & 2) {
      if (t && r.id !== t.uid)
        continue;
      Ht.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function $l(t) {
  if (kn.length) {
    const e = [...new Set(kn)].sort(
      (n, r) => ir(n) - ir(r)
    );
    if (kn.length = 0, Xe) {
      Xe.push(...e);
      return;
    }
    for (Xe = e, _n = 0; _n < Xe.length; _n++) {
      const n = Xe[_n];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Xe = null, _n = 0;
  }
}
const ir = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function Al(t) {
  try {
    for (Me = 0; Me < Ht.length; Me++) {
      const e = Ht[Me];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), dr(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Me < Ht.length; Me++) {
      const e = Ht[Me];
      e && (e.flags &= -2);
    }
    Me = -1, Ht.length = 0, $l(), Ur = null, (Ht.length || kn.length) && Al();
  }
}
let pe = null, Fl = null;
function Wr(t) {
  const e = pe;
  return pe = t, Fl = t && t.type.__scopeId || null, e;
}
function Qa(t, e = pe, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && po(-1);
    const s = Wr(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Wr(s), r._d && po(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Or(t, e) {
  if (pe === null)
    return t;
  const n = _i(pe), r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, u = xt] = e[i];
    s && (at(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && je(o), r.push({
      dir: s,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: u
    }));
  }
  return t;
}
function sn(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let u = l.dir[r];
    u && (Ve(), Re(u, n, 8, [
      t.el,
      l,
      t,
      e
    ]), ze());
  }
}
const Za = Symbol("_vte"), tc = (t) => t.__isTeleport;
function ks(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, ks(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ts(t, e) {
  return at(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    It({ name: t.name }, e, { setup: t })
  ) : t;
}
function jl(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Xn(t, e, n, r, i = !1) {
  if (lt(t)) {
    t.forEach(
      (w, v) => Xn(
        w,
        e && (lt(e) ? e[v] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (Yn(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Xn(t, e, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? _i(r.component) : r.el, o = i ? null : s, { i: l, r: u } = t, c = e && e.r, a = l.refs === xt ? l.refs = {} : l.refs, f = l.setupState, h = yt(f), p = f === xt ? () => !1 : (w) => gt(h, w);
  if (c != null && c !== u && (Rt(c) ? (a[c] = null, p(c) && (f[c] = null)) : Bt(c) && (c.value = null)), at(u))
    dr(u, l, 12, [o, a]);
  else {
    const w = Rt(u), v = Bt(u);
    if (w || v) {
      const y = () => {
        if (t.f) {
          const d = w ? p(u) ? f[u] : a[u] : u.value;
          i ? lt(d) && gs(d, s) : lt(d) ? d.includes(s) || d.push(s) : w ? (a[u] = [s], p(u) && (f[u] = a[u])) : (u.value = [s], t.k && (a[t.k] = u.value));
        } else w ? (a[u] = o, p(u) && (f[u] = o)) : v && (u.value = o, t.k && (a[t.k] = o));
      };
      o ? (y.id = -1, se(y, n)) : y();
    }
  }
}
hi().requestIdleCallback;
hi().cancelIdleCallback;
const Yn = (t) => !!t.type.__asyncLoader, Bl = (t) => t.type.__isKeepAlive;
function ec(t, e) {
  Dl(t, "a", e);
}
function nc(t, e) {
  Dl(t, "da", e);
}
function Dl(t, e, n = Ut) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (mi(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Bl(i.parent.vnode) && rc(r, e, n, i), i = i.parent;
  }
}
function rc(t, e, n, r) {
  const i = mi(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  Cs(() => {
    gs(r[e], i);
  }, n);
}
function mi(t, e, n = Ut, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      Ve();
      const l = pr(n), u = Re(e, n, t, o);
      return l(), ze(), u;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const He = (t) => (e, n = Ut) => {
  (!or || t === "sp") && mi(t, (...r) => e(...r), n);
}, Vl = He("bm"), zl = He("m"), ic = He(
  "bu"
), sc = He("u"), oc = He(
  "bum"
), Cs = He("um"), lc = He(
  "sp"
), uc = He("rtg"), ac = He("rtc");
function cc(t, e = Ut) {
  mi("ec", t, e);
}
const fc = Symbol.for("v-ndc");
function io(t, e, n, r) {
  let i;
  const s = n, o = lt(t);
  if (o || Rt(t)) {
    const l = o && Mn(t);
    let u = !1, c = !1;
    l && (u = !ge(t), c = tn(t), t = di(t)), i = new Array(t.length);
    for (let a = 0, f = t.length; a < f; a++)
      i[a] = e(
        u ? c ? Hr($t(t[a])) : $t(t[a]) : t[a],
        a,
        void 0,
        s
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, s);
  } else if (Ct(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (l, u) => e(l, u, void 0, s)
      );
    else {
      const l = Object.keys(t);
      i = new Array(l.length);
      for (let u = 0, c = l.length; u < c; u++) {
        const a = l[u];
        i[u] = e(t[a], a, u, s);
      }
    }
  else
    i = [];
  return i;
}
const Ki = (t) => t ? uu(t) ? _i(t) : Ki(t.parent) : null, Jn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ It(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ki(t.parent),
    $root: (t) => Ki(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Hl(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Ms(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Il.bind(t.proxy)),
    $watch: (t) => Ic.bind(t)
  })
), Ri = (t, e) => t !== xt && !t.__isScriptSetup && gt(t, e), hc = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: u } = t;
    let c;
    if (e[0] !== "$") {
      const p = o[e];
      if (p !== void 0)
        switch (p) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return s[e];
        }
      else {
        if (Ri(r, e))
          return o[e] = 1, r[e];
        if (i !== xt && gt(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = t.propsOptions[0]) && gt(c, e)
        )
          return o[e] = 3, s[e];
        if (n !== xt && gt(n, e))
          return o[e] = 4, n[e];
        Xi && (o[e] = 0);
      }
    }
    const a = Jn[e];
    let f, h;
    if (a)
      return e === "$attrs" && jt(t.attrs, "get", ""), a(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== xt && gt(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      h = u.config.globalProperties, gt(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Ri(i, e) ? (i[e] = n, !0) : r !== xt && gt(r, e) ? (r[e] = n, !0) : gt(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s }
  }, o) {
    let l;
    return !!n[o] || t !== xt && gt(t, o) || Ri(e, o) || (l = s[0]) && gt(l, o) || gt(r, o) || gt(Jn, o) || gt(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : gt(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function so(t) {
  return lt(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Xi = !0;
function dc(t) {
  const e = Hl(t), n = t.proxy, r = t.ctx;
  Xi = !1, e.beforeCreate && oo(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: u,
    inject: c,
    // lifecycle
    created: a,
    beforeMount: f,
    mounted: h,
    beforeUpdate: p,
    updated: w,
    activated: v,
    deactivated: y,
    beforeDestroy: d,
    beforeUnmount: S,
    destroyed: N,
    unmounted: m,
    render: P,
    renderTracked: $,
    renderTriggered: B,
    errorCaptured: q,
    serverPrefetch: Z,
    // public API
    expose: j,
    inheritAttrs: Q,
    // assets
    components: ut,
    directives: U,
    filters: E
  } = e;
  if (c && pc(c, r, null), o)
    for (const O in o) {
      const L = o[O];
      at(L) && (r[O] = L.bind(n));
    }
  if (i) {
    const O = i.call(n, n);
    Ct(O) && (t.data = pi(O));
  }
  if (Xi = !0, s)
    for (const O in s) {
      const L = s[O], X = at(L) ? L.bind(n, n) : at(L.get) ? L.get.bind(n, n) : Ce, J = !at(L) && at(L.set) ? L.set.bind(n) : Ce, it = Zi({
        get: X,
        set: J
      });
      Object.defineProperty(r, O, {
        enumerable: !0,
        configurable: !0,
        get: () => it.value,
        set: (ot) => it.value = ot
      });
    }
  if (l)
    for (const O in l)
      Gl(l[O], r, n, O);
  if (u) {
    const O = at(u) ? u.call(n) : u;
    Reflect.ownKeys(O).forEach((L) => {
      vc(L, O[L]);
    });
  }
  a && oo(a, t, "c");
  function T(O, L) {
    lt(L) ? L.forEach((X) => O(X.bind(n))) : L && O(L.bind(n));
  }
  if (T(Vl, f), T(zl, h), T(ic, p), T(sc, w), T(ec, v), T(nc, y), T(cc, q), T(ac, $), T(uc, B), T(oc, S), T(Cs, m), T(lc, Z), lt(j))
    if (j.length) {
      const O = t.exposed || (t.exposed = {});
      j.forEach((L) => {
        Object.defineProperty(O, L, {
          get: () => n[L],
          set: (X) => n[L] = X
        });
      });
    } else t.exposed || (t.exposed = {});
  P && t.render === Ce && (t.render = P), Q != null && (t.inheritAttrs = Q), ut && (t.components = ut), U && (t.directives = U), Z && jl(t);
}
function pc(t, e, n = Ce) {
  lt(t) && (t = Yi(t));
  for (const r in t) {
    const i = t[r];
    let s;
    Ct(i) ? "default" in i ? s = $r(
      i.from || r,
      i.default,
      !0
    ) : s = $r(i.from || r) : s = $r(i), Bt(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s;
  }
}
function oo(t, e, n) {
  Re(
    lt(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Gl(t, e, n, r) {
  let i = r.includes(".") ? ru(n, r) : () => n[r];
  if (Rt(t)) {
    const s = e[t];
    at(s) && Ii(i, s);
  } else if (at(t))
    Ii(i, t.bind(n));
  else if (Ct(t))
    if (lt(t))
      t.forEach((s) => Gl(s, e, n, r));
    else {
      const s = at(t.handler) ? t.handler.bind(n) : e[t.handler];
      at(s) && Ii(i, s, t);
    }
}
function Hl(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let u;
  return l ? u = l : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach(
    (c) => Kr(u, c, o, !0)
  ), Kr(u, e, o)), Ct(e) && s.set(e, u), u;
}
function Kr(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Kr(t, s, n, !0), i && i.forEach(
    (o) => Kr(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = gc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const gc = {
  data: lo,
  props: uo,
  emits: uo,
  // objects
  methods: zn,
  computed: zn,
  // lifecycle
  beforeCreate: zt,
  created: zt,
  beforeMount: zt,
  mounted: zt,
  beforeUpdate: zt,
  updated: zt,
  beforeDestroy: zt,
  beforeUnmount: zt,
  destroyed: zt,
  unmounted: zt,
  activated: zt,
  deactivated: zt,
  errorCaptured: zt,
  serverPrefetch: zt,
  // assets
  components: zn,
  directives: zn,
  // watch
  watch: wc,
  // provide / inject
  provide: lo,
  inject: mc
};
function lo(t, e) {
  return e ? t ? function() {
    return It(
      at(t) ? t.call(this, this) : t,
      at(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function mc(t, e) {
  return zn(Yi(t), Yi(e));
}
function Yi(t) {
  if (lt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function zt(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function zn(t, e) {
  return t ? It(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function uo(t, e) {
  return t ? lt(t) && lt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : It(
    /* @__PURE__ */ Object.create(null),
    so(t),
    so(e ?? {})
  ) : e;
}
function wc(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = It(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = zt(t[r], e[r]);
  return n;
}
function ql() {
  return {
    app: null,
    config: {
      isNativeTag: ua,
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
let yc = 0;
function _c(t, e) {
  return function(r, i = null) {
    at(r) || (r = It({}, r)), i != null && !Ct(i) && (i = null);
    const s = ql(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const c = s.app = {
      _uid: yc++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: ef,
      get config() {
        return s.config;
      },
      set config(a) {
      },
      use(a, ...f) {
        return o.has(a) || (a && at(a.install) ? (o.add(a), a.install(c, ...f)) : at(a) && (o.add(a), a(c, ...f))), c;
      },
      mixin(a) {
        return s.mixins.includes(a) || s.mixins.push(a), c;
      },
      component(a, f) {
        return f ? (s.components[a] = f, c) : s.components[a];
      },
      directive(a, f) {
        return f ? (s.directives[a] = f, c) : s.directives[a];
      },
      mount(a, f, h) {
        if (!u) {
          const p = c._ceVNode || De(r, i);
          return p.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), t(p, a, h), u = !0, c._container = a, a.__vue_app__ = c, _i(p.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        u && (Re(
          l,
          c._instance,
          16
        ), t(null, c._container), delete c._container.__vue_app__);
      },
      provide(a, f) {
        return s.provides[a] = f, c;
      },
      runWithContext(a) {
        const f = Tn;
        Tn = c;
        try {
          return a();
        } finally {
          Tn = f;
        }
      }
    };
    return c;
  };
}
let Tn = null;
function vc(t, e) {
  if (Ut) {
    let n = Ut.provides;
    const r = Ut.parent && Ut.parent.provides;
    r === n && (n = Ut.provides = Object.create(r)), n[t] = e;
  }
}
function $r(t, e, n = !1) {
  const r = Ut || pe;
  if (r || Tn) {
    let i = Tn ? Tn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && at(e) ? e.call(r && r.proxy) : e;
  }
}
const Ul = {}, Wl = () => Object.create(Ul), Kl = (t) => Object.getPrototypeOf(t) === Ul;
function bc(t, e, n, r = !1) {
  const i = {}, s = Wl();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Xl(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : Da(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function xc(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = yt(i), [u] = t.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = t.vnode.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        let h = a[f];
        if (wi(t.emitsOptions, h))
          continue;
        const p = e[h];
        if (u)
          if (gt(s, h))
            p !== s[h] && (s[h] = p, c = !0);
          else {
            const w = ve(h);
            i[w] = Ji(
              u,
              l,
              w,
              p,
              t,
              !1
            );
          }
        else
          p !== s[h] && (s[h] = p, c = !0);
      }
    }
  } else {
    Xl(t, e, i, s) && (c = !0);
    let a;
    for (const f in l)
      (!e || // for camelCase
      !gt(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = de(f)) === f || !gt(e, a))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[f] = Ji(
        u,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !gt(e, f)) && (delete s[f], c = !0);
  }
  c && Fe(t.attrs, "set", "");
}
function Xl(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let u in e) {
      if (Un(u))
        continue;
      const c = e[u];
      let a;
      i && gt(i, a = ve(u)) ? !s || !s.includes(a) ? n[a] = c : (l || (l = {}))[a] = c : wi(t.emitsOptions, u) || (!(u in r) || c !== r[u]) && (r[u] = c, o = !0);
    }
  if (s) {
    const u = yt(n), c = l || xt;
    for (let a = 0; a < s.length; a++) {
      const f = s[a];
      n[f] = Ji(
        i,
        u,
        f,
        c[f],
        t,
        !gt(c, f)
      );
    }
  }
  return o;
}
function Ji(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = gt(o, "default");
    if (l && r === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && at(u)) {
        const { propsDefaults: c } = i;
        if (n in c)
          r = c[n];
        else {
          const a = pr(i);
          r = c[n] = u.call(
            null,
            e
          ), a();
        }
      } else
        r = u;
      i.ce && i.ce._setProp(n, r);
    }
    o[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === de(n)) && (r = !0));
  }
  return r;
}
const Ec = /* @__PURE__ */ new WeakMap();
function Yl(t, e, n = !1) {
  const r = n ? Ec : e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let u = !1;
  if (!at(t)) {
    const a = (f) => {
      u = !0;
      const [h, p] = Yl(f, e, !0);
      It(o, h), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!s && !u)
    return Ct(t) && r.set(t, Sn), Sn;
  if (lt(s))
    for (let a = 0; a < s.length; a++) {
      const f = ve(s[a]);
      ao(f) && (o[f] = xt);
    }
  else if (s)
    for (const a in s) {
      const f = ve(a);
      if (ao(f)) {
        const h = s[a], p = o[f] = lt(h) || at(h) ? { type: h } : It({}, h), w = p.type;
        let v = !1, y = !0;
        if (lt(w))
          for (let d = 0; d < w.length; ++d) {
            const S = w[d], N = at(S) && S.name;
            if (N === "Boolean") {
              v = !0;
              break;
            } else N === "String" && (y = !1);
          }
        else
          v = at(w) && w.name === "Boolean";
        p[
          0
          /* shouldCast */
        ] = v, p[
          1
          /* shouldCastTrue */
        ] = y, (v || gt(p, "default")) && l.push(f);
      }
    }
  const c = [o, l];
  return Ct(t) && r.set(t, c), c;
}
function ao(t) {
  return t[0] !== "$" && !Un(t);
}
const Ns = (t) => t[0] === "_" || t === "$stable", Rs = (t) => lt(t) ? t.map(ke) : [ke(t)], Sc = (t, e, n) => {
  if (e._n)
    return e;
  const r = Qa((...i) => Rs(e(...i)), n);
  return r._c = !1, r;
}, Jl = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Ns(i)) continue;
    const s = t[i];
    if (at(s))
      e[i] = Sc(i, s, r);
    else if (s != null) {
      const o = Rs(s);
      e[i] = () => o;
    }
  }
}, Ql = (t, e) => {
  const n = Rs(e);
  t.slots.default = () => n;
}, Zl = (t, e, n) => {
  for (const r in e)
    (n || !Ns(r)) && (t[r] = e[r]);
}, Pc = (t, e, n) => {
  const r = t.slots = Wl();
  if (t.vnode.shapeFlag & 32) {
    const i = e.__;
    i && Gi(r, "__", i, !0);
    const s = e._;
    s ? (Zl(r, e, n), n && Gi(r, "_", s, !0)) : Jl(e, r);
  } else e && Ql(t, e);
}, Mc = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = xt;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : Zl(i, e, n) : (s = !e.$stable, Jl(e, i)), o = e;
  } else e && (Ql(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !Ns(l) && o[l] == null && delete i[l];
}, se = Dc;
function kc(t) {
  return Tc(t);
}
function Tc(t, e) {
  const n = hi();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: l,
    createComment: u,
    setText: c,
    setElementText: a,
    parentNode: f,
    nextSibling: h,
    setScopeId: p = Ce,
    insertStaticContent: w
  } = t, v = (_, x, C, F = null, I = null, A = null, K = void 0, W = null, H = !!x.dynamicChildren) => {
    if (_ === x)
      return;
    _ && !jn(_, x) && (F = vt(_), ot(_, I, A, !0), _ = null), x.patchFlag === -2 && (H = !1, x.dynamicChildren = null);
    const { type: D, ref: tt, shapeFlag: Y } = x;
    switch (D) {
      case yi:
        y(_, x, C, F);
        break;
      case Ln:
        d(_, x, C, F);
        break;
      case Oi:
        _ == null && S(x, C, F, K);
        break;
      case he:
        ut(
          _,
          x,
          C,
          F,
          I,
          A,
          K,
          W,
          H
        );
        break;
      default:
        Y & 1 ? P(
          _,
          x,
          C,
          F,
          I,
          A,
          K,
          W,
          H
        ) : Y & 6 ? U(
          _,
          x,
          C,
          F,
          I,
          A,
          K,
          W,
          H
        ) : (Y & 64 || Y & 128) && D.process(
          _,
          x,
          C,
          F,
          I,
          A,
          K,
          W,
          H,
          Dt
        );
    }
    tt != null && I ? Xn(tt, _ && _.ref, A, x || _, !x) : tt == null && _ && _.ref != null && Xn(_.ref, null, A, _, !0);
  }, y = (_, x, C, F) => {
    if (_ == null)
      r(
        x.el = l(x.children),
        C,
        F
      );
    else {
      const I = x.el = _.el;
      x.children !== _.children && c(I, x.children);
    }
  }, d = (_, x, C, F) => {
    _ == null ? r(
      x.el = u(x.children || ""),
      C,
      F
    ) : x.el = _.el;
  }, S = (_, x, C, F) => {
    [_.el, _.anchor] = w(
      _.children,
      x,
      C,
      F,
      _.el,
      _.anchor
    );
  }, N = ({ el: _, anchor: x }, C, F) => {
    let I;
    for (; _ && _ !== x; )
      I = h(_), r(_, C, F), _ = I;
    r(x, C, F);
  }, m = ({ el: _, anchor: x }) => {
    let C;
    for (; _ && _ !== x; )
      C = h(_), i(_), _ = C;
    i(x);
  }, P = (_, x, C, F, I, A, K, W, H) => {
    x.type === "svg" ? K = "svg" : x.type === "math" && (K = "mathml"), _ == null ? $(
      x,
      C,
      F,
      I,
      A,
      K,
      W,
      H
    ) : Z(
      _,
      x,
      I,
      A,
      K,
      W,
      H
    );
  }, $ = (_, x, C, F, I, A, K, W) => {
    let H, D;
    const { props: tt, shapeFlag: Y, transition: et, dirs: st } = _;
    if (H = _.el = o(
      _.type,
      A,
      tt && tt.is,
      tt
    ), Y & 8 ? a(H, _.children) : Y & 16 && q(
      _.children,
      H,
      null,
      F,
      I,
      Li(_, A),
      K,
      W
    ), st && sn(_, null, F, "created"), B(H, _, _.scopeId, K, F), tt) {
      for (const _t in tt)
        _t !== "value" && !Un(_t) && s(H, _t, null, tt[_t], A, F);
      "value" in tt && s(H, "value", null, tt.value, A), (D = tt.onVnodeBeforeMount) && Se(D, F, _);
    }
    st && sn(_, null, F, "beforeMount");
    const ht = Cc(I, et);
    ht && et.beforeEnter(H), r(H, x, C), ((D = tt && tt.onVnodeMounted) || ht || st) && se(() => {
      D && Se(D, F, _), ht && et.enter(H), st && sn(_, null, F, "mounted");
    }, I);
  }, B = (_, x, C, F, I) => {
    if (C && p(_, C), F)
      for (let A = 0; A < F.length; A++)
        p(_, F[A]);
    if (I) {
      let A = I.subTree;
      if (x === A || su(A.type) && (A.ssContent === x || A.ssFallback === x)) {
        const K = I.vnode;
        B(
          _,
          K,
          K.scopeId,
          K.slotScopeIds,
          I.parent
        );
      }
    }
  }, q = (_, x, C, F, I, A, K, W, H = 0) => {
    for (let D = H; D < _.length; D++) {
      const tt = _[D] = W ? Ye(_[D]) : ke(_[D]);
      v(
        null,
        tt,
        x,
        C,
        F,
        I,
        A,
        K,
        W
      );
    }
  }, Z = (_, x, C, F, I, A, K) => {
    const W = x.el = _.el;
    let { patchFlag: H, dynamicChildren: D, dirs: tt } = x;
    H |= _.patchFlag & 16;
    const Y = _.props || xt, et = x.props || xt;
    let st;
    if (C && on(C, !1), (st = et.onVnodeBeforeUpdate) && Se(st, C, x, _), tt && sn(x, _, C, "beforeUpdate"), C && on(C, !0), (Y.innerHTML && et.innerHTML == null || Y.textContent && et.textContent == null) && a(W, ""), D ? j(
      _.dynamicChildren,
      D,
      W,
      C,
      F,
      Li(x, I),
      A
    ) : K || L(
      _,
      x,
      W,
      null,
      C,
      F,
      Li(x, I),
      A,
      !1
    ), H > 0) {
      if (H & 16)
        Q(W, Y, et, C, I);
      else if (H & 2 && Y.class !== et.class && s(W, "class", null, et.class, I), H & 4 && s(W, "style", Y.style, et.style, I), H & 8) {
        const ht = x.dynamicProps;
        for (let _t = 0; _t < ht.length; _t++) {
          const dt = ht[_t], Ot = Y[dt], At = et[dt];
          (At !== Ot || dt === "value") && s(W, dt, Ot, At, I, C);
        }
      }
      H & 1 && _.children !== x.children && a(W, x.children);
    } else !K && D == null && Q(W, Y, et, C, I);
    ((st = et.onVnodeUpdated) || tt) && se(() => {
      st && Se(st, C, x, _), tt && sn(x, _, C, "updated");
    }, F);
  }, j = (_, x, C, F, I, A, K) => {
    for (let W = 0; W < x.length; W++) {
      const H = _[W], D = x[W], tt = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        H.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (H.type === he || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !jn(H, D) || // - In the case of a component, it could contain anything.
        H.shapeFlag & 198) ? f(H.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      v(
        H,
        D,
        tt,
        null,
        F,
        I,
        A,
        K,
        !0
      );
    }
  }, Q = (_, x, C, F, I) => {
    if (x !== C) {
      if (x !== xt)
        for (const A in x)
          !Un(A) && !(A in C) && s(
            _,
            A,
            x[A],
            null,
            I,
            F
          );
      for (const A in C) {
        if (Un(A)) continue;
        const K = C[A], W = x[A];
        K !== W && A !== "value" && s(_, A, W, K, I, F);
      }
      "value" in C && s(_, "value", x.value, C.value, I);
    }
  }, ut = (_, x, C, F, I, A, K, W, H) => {
    const D = x.el = _ ? _.el : l(""), tt = x.anchor = _ ? _.anchor : l("");
    let { patchFlag: Y, dynamicChildren: et, slotScopeIds: st } = x;
    st && (W = W ? W.concat(st) : st), _ == null ? (r(D, C, F), r(tt, C, F), q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      x.children || [],
      C,
      tt,
      I,
      A,
      K,
      W,
      H
    )) : Y > 0 && Y & 64 && et && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren ? (j(
      _.dynamicChildren,
      et,
      C,
      I,
      A,
      K,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (x.key != null || I && x === I.subTree) && tu(
      _,
      x,
      !0
      /* shallow */
    )) : L(
      _,
      x,
      C,
      tt,
      I,
      A,
      K,
      W,
      H
    );
  }, U = (_, x, C, F, I, A, K, W, H) => {
    x.slotScopeIds = W, _ == null ? x.shapeFlag & 512 ? I.ctx.activate(
      x,
      C,
      F,
      K,
      H
    ) : E(
      x,
      C,
      F,
      I,
      A,
      K,
      H
    ) : z(_, x, H);
  }, E = (_, x, C, F, I, A, K) => {
    const W = _.component = Xc(
      _,
      F,
      I
    );
    if (Bl(_) && (W.ctx.renderer = Dt), Yc(W, !1, K), W.asyncDep) {
      if (I && I.registerDep(W, T, K), !_.el) {
        const H = W.subTree = De(Ln);
        d(null, H, x, C);
      }
    } else
      T(
        W,
        _,
        x,
        C,
        I,
        A,
        K
      );
  }, z = (_, x, C) => {
    const F = x.component = _.component;
    if (jc(_, x, C))
      if (F.asyncDep && !F.asyncResolved) {
        O(F, x, C);
        return;
      } else
        F.next = x, F.update();
    else
      x.el = _.el, F.vnode = x;
  }, T = (_, x, C, F, I, A, K) => {
    const W = () => {
      if (_.isMounted) {
        let { next: Y, bu: et, u: st, parent: ht, vnode: _t } = _;
        {
          const ie = eu(_);
          if (ie) {
            Y && (Y.el = _t.el, O(_, Y, K)), ie.asyncDep.then(() => {
              _.isUnmounted || W();
            });
            return;
          }
        }
        let dt = Y, Ot;
        on(_, !1), Y ? (Y.el = _t.el, O(_, Y, K)) : Y = _t, et && Mi(et), (Ot = Y.props && Y.props.onVnodeBeforeUpdate) && Se(Ot, ht, Y, _t), on(_, !0);
        const At = fo(_), re = _.subTree;
        _.subTree = At, v(
          re,
          At,
          // parent may have changed if it's in a teleport
          f(re.el),
          // anchor may have changed if it's in a fragment
          vt(re),
          _,
          I,
          A
        ), Y.el = At.el, dt === null && Bc(_, At.el), st && se(st, I), (Ot = Y.props && Y.props.onVnodeUpdated) && se(
          () => Se(Ot, ht, Y, _t),
          I
        );
      } else {
        let Y;
        const { el: et, props: st } = x, { bm: ht, m: _t, parent: dt, root: Ot, type: At } = _, re = Yn(x);
        on(_, !1), ht && Mi(ht), !re && (Y = st && st.onVnodeBeforeMount) && Se(Y, dt, x), on(_, !0);
        {
          Ot.ce && // @ts-expect-error _def is private
          Ot.ce._def.shadowRoot !== !1 && Ot.ce._injectChildStyle(At);
          const ie = _.subTree = fo(_);
          v(
            null,
            ie,
            C,
            F,
            _,
            I,
            A
          ), x.el = ie.el;
        }
        if (_t && se(_t, I), !re && (Y = st && st.onVnodeMounted)) {
          const ie = x;
          se(
            () => Se(Y, dt, ie),
            I
          );
        }
        (x.shapeFlag & 256 || dt && Yn(dt.vnode) && dt.vnode.shapeFlag & 256) && _.a && se(_.a, I), _.isMounted = !0, x = C = F = null;
      }
    };
    _.scope.on();
    const H = _.effect = new ml(W);
    _.scope.off();
    const D = _.update = H.run.bind(H), tt = _.job = H.runIfDirty.bind(H);
    tt.i = _, tt.id = _.uid, H.scheduler = () => Ms(tt), on(_, !0), D();
  }, O = (_, x, C) => {
    x.component = _;
    const F = _.vnode.props;
    _.vnode = x, _.next = null, xc(_, x.props, F, C), Mc(_, x.children, C), Ve(), ro(_), ze();
  }, L = (_, x, C, F, I, A, K, W, H = !1) => {
    const D = _ && _.children, tt = _ ? _.shapeFlag : 0, Y = x.children, { patchFlag: et, shapeFlag: st } = x;
    if (et > 0) {
      if (et & 128) {
        J(
          D,
          Y,
          C,
          F,
          I,
          A,
          K,
          W,
          H
        );
        return;
      } else if (et & 256) {
        X(
          D,
          Y,
          C,
          F,
          I,
          A,
          K,
          W,
          H
        );
        return;
      }
    }
    st & 8 ? (tt & 16 && St(D, I, A), Y !== D && a(C, Y)) : tt & 16 ? st & 16 ? J(
      D,
      Y,
      C,
      F,
      I,
      A,
      K,
      W,
      H
    ) : St(D, I, A, !0) : (tt & 8 && a(C, ""), st & 16 && q(
      Y,
      C,
      F,
      I,
      A,
      K,
      W,
      H
    ));
  }, X = (_, x, C, F, I, A, K, W, H) => {
    _ = _ || Sn, x = x || Sn;
    const D = _.length, tt = x.length, Y = Math.min(D, tt);
    let et;
    for (et = 0; et < Y; et++) {
      const st = x[et] = H ? Ye(x[et]) : ke(x[et]);
      v(
        _[et],
        st,
        C,
        null,
        I,
        A,
        K,
        W,
        H
      );
    }
    D > tt ? St(
      _,
      I,
      A,
      !0,
      !1,
      Y
    ) : q(
      x,
      C,
      F,
      I,
      A,
      K,
      W,
      H,
      Y
    );
  }, J = (_, x, C, F, I, A, K, W, H) => {
    let D = 0;
    const tt = x.length;
    let Y = _.length - 1, et = tt - 1;
    for (; D <= Y && D <= et; ) {
      const st = _[D], ht = x[D] = H ? Ye(x[D]) : ke(x[D]);
      if (jn(st, ht))
        v(
          st,
          ht,
          C,
          null,
          I,
          A,
          K,
          W,
          H
        );
      else
        break;
      D++;
    }
    for (; D <= Y && D <= et; ) {
      const st = _[Y], ht = x[et] = H ? Ye(x[et]) : ke(x[et]);
      if (jn(st, ht))
        v(
          st,
          ht,
          C,
          null,
          I,
          A,
          K,
          W,
          H
        );
      else
        break;
      Y--, et--;
    }
    if (D > Y) {
      if (D <= et) {
        const st = et + 1, ht = st < tt ? x[st].el : F;
        for (; D <= et; )
          v(
            null,
            x[D] = H ? Ye(x[D]) : ke(x[D]),
            C,
            ht,
            I,
            A,
            K,
            W,
            H
          ), D++;
      }
    } else if (D > et)
      for (; D <= Y; )
        ot(_[D], I, A, !0), D++;
    else {
      const st = D, ht = D, _t = /* @__PURE__ */ new Map();
      for (D = ht; D <= et; D++) {
        const Vt = x[D] = H ? Ye(x[D]) : ke(x[D]);
        Vt.key != null && _t.set(Vt.key, D);
      }
      let dt, Ot = 0;
      const At = et - ht + 1;
      let re = !1, ie = 0;
      const nn = new Array(At);
      for (D = 0; D < At; D++) nn[D] = 0;
      for (D = st; D <= Y; D++) {
        const Vt = _[D];
        if (Ot >= At) {
          ot(Vt, I, A, !0);
          continue;
        }
        let fe;
        if (Vt.key != null)
          fe = _t.get(Vt.key);
        else
          for (dt = ht; dt <= et; dt++)
            if (nn[dt - ht] === 0 && jn(Vt, x[dt])) {
              fe = dt;
              break;
            }
        fe === void 0 ? ot(Vt, I, A, !0) : (nn[fe - ht] = D + 1, fe >= ie ? ie = fe : re = !0, v(
          Vt,
          x[fe],
          C,
          null,
          I,
          A,
          K,
          W,
          H
        ), Ot++);
      }
      const yr = re ? Nc(nn) : Sn;
      for (dt = yr.length - 1, D = At - 1; D >= 0; D--) {
        const Vt = ht + D, fe = x[Vt], _r = Vt + 1 < tt ? x[Vt + 1].el : F;
        nn[D] === 0 ? v(
          null,
          fe,
          C,
          _r,
          I,
          A,
          K,
          W,
          H
        ) : re && (dt < 0 || D !== yr[dt] ? it(fe, C, _r, 2) : dt--);
      }
    }
  }, it = (_, x, C, F, I = null) => {
    const { el: A, type: K, transition: W, children: H, shapeFlag: D } = _;
    if (D & 6) {
      it(_.component.subTree, x, C, F);
      return;
    }
    if (D & 128) {
      _.suspense.move(x, C, F);
      return;
    }
    if (D & 64) {
      K.move(_, x, C, Dt);
      return;
    }
    if (K === he) {
      r(A, x, C);
      for (let Y = 0; Y < H.length; Y++)
        it(H[Y], x, C, F);
      r(_.anchor, x, C);
      return;
    }
    if (K === Oi) {
      N(_, x, C);
      return;
    }
    if (F !== 2 && D & 1 && W)
      if (F === 0)
        W.beforeEnter(A), r(A, x, C), se(() => W.enter(A), I);
      else {
        const { leave: Y, delayLeave: et, afterLeave: st } = W, ht = () => {
          _.ctx.isUnmounted ? i(A) : r(A, x, C);
        }, _t = () => {
          Y(A, () => {
            ht(), st && st();
          });
        };
        et ? et(A, ht, _t) : _t();
      }
    else
      r(A, x, C);
  }, ot = (_, x, C, F = !1, I = !1) => {
    const {
      type: A,
      props: K,
      ref: W,
      children: H,
      dynamicChildren: D,
      shapeFlag: tt,
      patchFlag: Y,
      dirs: et,
      cacheIndex: st
    } = _;
    if (Y === -2 && (I = !1), W != null && (Ve(), Xn(W, null, C, _, !0), ze()), st != null && (x.renderCache[st] = void 0), tt & 256) {
      x.ctx.deactivate(_);
      return;
    }
    const ht = tt & 1 && et, _t = !Yn(_);
    let dt;
    if (_t && (dt = K && K.onVnodeBeforeUnmount) && Se(dt, x, _), tt & 6)
      wt(_.component, C, F);
    else {
      if (tt & 128) {
        _.suspense.unmount(C, F);
        return;
      }
      ht && sn(_, null, x, "beforeUnmount"), tt & 64 ? _.type.remove(
        _,
        x,
        C,
        Dt,
        F
      ) : D && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !D.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== he || Y > 0 && Y & 64) ? St(
        D,
        x,
        C,
        !1,
        !0
      ) : (A === he && Y & 384 || !I && tt & 16) && St(H, x, C), F && Et(_);
    }
    (_t && (dt = K && K.onVnodeUnmounted) || ht) && se(() => {
      dt && Se(dt, x, _), ht && sn(_, null, x, "unmounted");
    }, C);
  }, Et = (_) => {
    const { type: x, el: C, anchor: F, transition: I } = _;
    if (x === he) {
      mt(C, F);
      return;
    }
    if (x === Oi) {
      m(_);
      return;
    }
    const A = () => {
      i(C), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (_.shapeFlag & 1 && I && !I.persisted) {
      const { leave: K, delayLeave: W } = I, H = () => K(C, A);
      W ? W(_.el, A, H) : H();
    } else
      A();
  }, mt = (_, x) => {
    let C;
    for (; _ !== x; )
      C = h(_), i(_), _ = C;
    i(x);
  }, wt = (_, x, C) => {
    const {
      bum: F,
      scope: I,
      job: A,
      subTree: K,
      um: W,
      m: H,
      a: D,
      parent: tt,
      slots: { __: Y }
    } = _;
    co(H), co(D), F && Mi(F), tt && lt(Y) && Y.forEach((et) => {
      tt.renderCache[et] = void 0;
    }), I.stop(), A && (A.flags |= 8, ot(K, _, x, C)), W && se(W, x), se(() => {
      _.isUnmounted = !0;
    }, x), x && x.pendingBranch && !x.isUnmounted && _.asyncDep && !_.asyncResolved && _.suspenseId === x.pendingId && (x.deps--, x.deps === 0 && x.resolve());
  }, St = (_, x, C, F = !1, I = !1, A = 0) => {
    for (let K = A; K < _.length; K++)
      ot(_[K], x, C, F, I);
  }, vt = (_) => {
    if (_.shapeFlag & 6)
      return vt(_.component.subTree);
    if (_.shapeFlag & 128)
      return _.suspense.next();
    const x = h(_.anchor || _.el), C = x && x[Za];
    return C ? h(C) : x;
  };
  let Pt = !1;
  const Lt = (_, x, C) => {
    _ == null ? x._vnode && ot(x._vnode, null, null, !0) : v(
      x._vnode || null,
      _,
      x,
      null,
      null,
      null,
      C
    ), x._vnode = _, Pt || (Pt = !0, ro(), $l(), Pt = !1);
  }, Dt = {
    p: v,
    um: ot,
    m: it,
    r: Et,
    mt: E,
    mc: q,
    pc: L,
    pbc: j,
    n: vt,
    o: t
  };
  return {
    render: Lt,
    hydrate: void 0,
    createApp: _c(Lt)
  };
}
function Li({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function on({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function Cc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function tu(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (lt(r) && lt(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Ye(i[s]), l.el = o.el), !n && l.patchFlag !== -2 && tu(o, l)), l.type === yi && (l.el = o.el), l.type === Ln && !l.el && (l.el = o.el);
    }
}
function Nc(t) {
  const e = t.slice(), n = [0];
  let r, i, s, o, l;
  const u = t.length;
  for (r = 0; r < u; r++) {
    const c = t[r];
    if (c !== 0) {
      if (i = n[n.length - 1], t[i] < c) {
        e[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        l = s + o >> 1, t[n[l]] < c ? s = l + 1 : o = l;
      c < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; )
    n[s] = o, o = e[o];
  return n;
}
function eu(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : eu(e);
}
function co(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const Rc = Symbol.for("v-scx"), Lc = () => $r(Rc);
function Ii(t, e, n) {
  return nu(t, e, n);
}
function nu(t, e, n = xt) {
  const { immediate: r, deep: i, flush: s, once: o } = n, l = It({}, n), u = e && r || !e && s !== "post";
  let c;
  if (or) {
    if (s === "sync") {
      const p = Lc();
      c = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!u) {
      const p = () => {
      };
      return p.stop = Ce, p.resume = Ce, p.pause = Ce, p;
    }
  }
  const a = Ut;
  l.call = (p, w, v) => Re(p, a, w, v);
  let f = !1;
  s === "post" ? l.scheduler = (p) => {
    se(p, a && a.suspense);
  } : s !== "sync" && (f = !0, l.scheduler = (p, w) => {
    w ? p() : Ms(p);
  }), l.augmentJob = (p) => {
    e && (p.flags |= 4), f && (p.flags |= 2, a && (p.id = a.uid, p.i = a));
  };
  const h = Ka(t, e, l);
  return or && (c ? c.push(h) : u && h()), h;
}
function Ic(t, e, n) {
  const r = this.proxy, i = Rt(t) ? t.includes(".") ? ru(r, t) : () => r[t] : t.bind(r, r);
  let s;
  at(e) ? s = e : (s = e.handler, n = e);
  const o = pr(this), l = nu(i, s.bind(r), n);
  return o(), l;
}
function ru(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
const Oc = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${ve(e)}Modifiers`] || t[`${de(e)}Modifiers`];
function $c(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || xt;
  let i = n;
  const s = e.startsWith("update:"), o = s && Oc(r, e.slice(7));
  o && (o.trim && (i = n.map((a) => Rt(a) ? a.trim() : a)), o.number && (i = n.map(da)));
  let l, u = r[l = Pi(e)] || // also try camelCase event handler (#2249)
  r[l = Pi(ve(e))];
  !u && s && (u = r[l = Pi(de(e))]), u && Re(
    u,
    t,
    6,
    i
  );
  const c = r[l + "Once"];
  if (c) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, Re(
      c,
      t,
      6,
      i
    );
  }
}
function iu(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!at(t)) {
    const u = (c) => {
      const a = iu(c, e, !0);
      a && (l = !0, It(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  return !s && !l ? (Ct(t) && r.set(t, null), null) : (lt(s) ? s.forEach((u) => o[u] = null) : It(o, s), Ct(t) && r.set(t, o), o);
}
function wi(t, e) {
  return !t || !ui(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), gt(t, e[0].toLowerCase() + e.slice(1)) || gt(t, de(e)) || gt(t, e));
}
function fo(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    propsOptions: [s],
    slots: o,
    attrs: l,
    emit: u,
    render: c,
    renderCache: a,
    props: f,
    data: h,
    setupState: p,
    ctx: w,
    inheritAttrs: v
  } = t, y = Wr(t);
  let d, S;
  try {
    if (n.shapeFlag & 4) {
      const m = i || r, P = m;
      d = ke(
        c.call(
          P,
          m,
          a,
          f,
          p,
          h,
          w
        )
      ), S = l;
    } else {
      const m = e;
      d = ke(
        m.length > 1 ? m(
          f,
          { attrs: l, slots: o, emit: u }
        ) : m(
          f,
          null
        )
      ), S = e.props ? l : Ac(l);
    }
  } catch (m) {
    Qn.length = 0, gi(m, t, 1), d = De(Ln);
  }
  let N = d;
  if (S && v !== !1) {
    const m = Object.keys(S), { shapeFlag: P } = N;
    m.length && P & 7 && (s && m.some(ps) && (S = Fc(
      S,
      s
    )), N = In(N, S, !1, !0));
  }
  return n.dirs && (N = In(N, null, !1, !0), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && ks(N, n.transition), d = N, Wr(y), d;
}
const Ac = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ui(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Fc = (t, e) => {
  const n = {};
  for (const r in t)
    (!ps(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function jc(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: u } = e, c = s.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? ho(r, o, c) : !!o;
    if (u & 8) {
      const a = e.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const h = a[f];
        if (o[h] !== r[h] && !wi(c, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? ho(r, o, c) : !0 : !!o;
  return !1;
}
function ho(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !wi(n, s))
      return !0;
  }
  return !1;
}
function Bc({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const su = (t) => t.__isSuspense;
function Dc(t, e) {
  e && e.pendingBranch ? lt(t) ? e.effects.push(...t) : e.effects.push(t) : Ja(t);
}
const he = Symbol.for("v-fgt"), yi = Symbol.for("v-txt"), Ln = Symbol.for("v-cmt"), Oi = Symbol.for("v-stc"), Qn = [];
let ae = null;
function Ue(t = !1) {
  Qn.push(ae = t ? null : []);
}
function Vc() {
  Qn.pop(), ae = Qn[Qn.length - 1] || null;
}
let sr = 1;
function po(t, e = !1) {
  sr += t, t < 0 && ae && e && (ae.hasOnce = !0);
}
function zc(t) {
  return t.dynamicChildren = sr > 0 ? ae || Sn : null, Vc(), sr > 0 && ae && ae.push(t), t;
}
function We(t, e, n, r, i, s) {
  return zc(
    le(
      t,
      e,
      n,
      r,
      i,
      s,
      !0
    )
  );
}
function ou(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function jn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const lu = ({ key: t }) => t ?? null, Ar = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Rt(t) || Bt(t) || at(t) ? { i: pe, r: t, k: e, f: !!n } : t : null);
function le(t, e = null, n = null, r = 0, i = null, s = t === he ? 0 : 1, o = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && lu(e),
    ref: e && Ar(e),
    scopeId: Fl,
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
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: pe
  };
  return l ? (Ls(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= Rt(n) ? 8 : 16), sr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ae.push(u), u;
}
const De = Gc;
function Gc(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === fc) && (t = Ln), ou(t)) {
    const l = In(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Ls(l, n), sr > 0 && !s && ae && (l.shapeFlag & 6 ? ae[ae.indexOf(t)] = l : ae.push(l)), l.patchFlag = -2, l;
  }
  if (tf(t) && (t = t.__vccOpts), e) {
    e = Hc(e);
    let { class: l, style: u } = e;
    l && !Rt(l) && (e.class = ys(l)), Ct(u) && (Ps(u) && !lt(u) && (u = It({}, u)), e.style = ws(u));
  }
  const o = Rt(t) ? 1 : su(t) ? 128 : tc(t) ? 64 : Ct(t) ? 4 : at(t) ? 2 : 0;
  return le(
    t,
    e,
    n,
    r,
    i,
    o,
    s,
    !0
  );
}
function Hc(t) {
  return t ? Ps(t) || Kl(t) ? It({}, t) : t : null;
}
function In(t, e, n = !1, r = !1) {
  const { props: i, ref: s, patchFlag: o, children: l, transition: u } = t, c = e ? Uc(i || {}, e) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: c,
    key: c && lu(c),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? lt(s) ? s.concat(Ar(e)) : [s, Ar(e)] : Ar(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== he ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && In(t.ssContent),
    ssFallback: t.ssFallback && In(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return u && r && ks(
    a,
    u.clone(a)
  ), a;
}
function qc(t = " ", e = 0) {
  return De(yi, null, t, e);
}
function ke(t) {
  return t == null || typeof t == "boolean" ? De(Ln) : lt(t) ? De(
    he,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : ou(t) ? Ye(t) : De(yi, null, String(t));
}
function Ye(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : In(t);
}
function Ls(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (lt(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Ls(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Kl(e) ? e._ctx = pe : i === 3 && pe && (pe.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else at(e) ? (e = { default: e, _ctx: pe }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [qc(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Uc(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = ys([e.class, r.class]));
      else if (i === "style")
        e.style = ws([e.style, r.style]);
      else if (ui(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(lt(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function Se(t, e, n, r = null) {
  Re(t, e, 7, [
    n,
    r
  ]);
}
const Wc = ql();
let Kc = 0;
function Xc(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || Wc, s = {
    uid: Kc++,
    vnode: t,
    type: r,
    parent: e,
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
    scope: new va(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Yl(r, i),
    emitsOptions: iu(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: xt,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: xt,
    data: xt,
    props: xt,
    attrs: xt,
    slots: xt,
    refs: xt,
    setupState: xt,
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
  return s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = $c.bind(null, s), t.ce && t.ce(s), s;
}
let Ut = null, Xr, Qi;
{
  const t = hi(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Xr = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ut = n
  ), Qi = e(
    "__VUE_SSR_SETTERS__",
    (n) => or = n
  );
}
const pr = (t) => {
  const e = Ut;
  return Xr(t), t.scope.on(), () => {
    t.scope.off(), Xr(e);
  };
}, go = () => {
  Ut && Ut.scope.off(), Xr(null);
};
function uu(t) {
  return t.vnode.shapeFlag & 4;
}
let or = !1;
function Yc(t, e = !1, n = !1) {
  e && Qi(e);
  const { props: r, children: i } = t.vnode, s = uu(t);
  bc(t, r, s, e), Pc(t, i, n || e);
  const o = s ? Jc(t, e) : void 0;
  return e && Qi(!1), o;
}
function Jc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, hc);
  const { setup: r } = n;
  if (r) {
    Ve();
    const i = t.setupContext = r.length > 1 ? Zc(t) : null, s = pr(t), o = dr(
      r,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = cl(o);
    if (ze(), s(), (l || t.sp) && !Yn(t) && jl(t), l) {
      if (o.then(go, go), e)
        return o.then((u) => {
          mo(t, u);
        }).catch((u) => {
          gi(u, t, 0);
        });
      t.asyncDep = o;
    } else
      mo(t, o);
  } else
    au(t);
}
function mo(t, e, n) {
  at(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ct(e) && (t.setupState = Rl(e)), au(t);
}
function au(t, e, n) {
  const r = t.type;
  t.render || (t.render = r.render || Ce);
  {
    const i = pr(t);
    Ve();
    try {
      dc(t);
    } finally {
      ze(), i();
    }
  }
}
const Qc = {
  get(t, e) {
    return jt(t, "get", ""), t[e];
  }
};
function Zc(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, Qc),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function _i(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Rl(Va(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in Jn)
        return Jn[n](t);
    },
    has(e, n) {
      return n in e || n in Jn;
    }
  })) : t.proxy;
}
function tf(t) {
  return at(t) && "__vccOpts" in t;
}
const Zi = (t, e) => Ua(t, e, or), ef = "3.5.17";
/**
* @vue/runtime-dom v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ts;
const wo = typeof window < "u" && window.trustedTypes;
if (wo)
  try {
    ts = /* @__PURE__ */ wo.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const cu = ts ? (t) => ts.createHTML(t) : (t) => t, nf = "http://www.w3.org/2000/svg", rf = "http://www.w3.org/1998/Math/MathML", Ae = typeof document < "u" ? document : null, yo = Ae && /* @__PURE__ */ Ae.createElement("template"), sf = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? Ae.createElementNS(nf, t) : e === "mathml" ? Ae.createElementNS(rf, t) : n ? Ae.createElement(t, { is: n }) : Ae.createElement(t);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => Ae.createTextNode(t),
  createComment: (t) => Ae.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Ae.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, i, s) {
    const o = n ? n.previousSibling : e.lastChild;
    if (i && (i === s || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), n), !(i === s || !(i = i.nextSibling)); )
        ;
    else {
      yo.innerHTML = cu(
        r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t
      );
      const l = yo.content;
      if (r === "svg" || r === "mathml") {
        const u = l.firstChild;
        for (; u.firstChild; )
          l.appendChild(u.firstChild);
        l.removeChild(u);
      }
      e.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, of = Symbol("_vtc");
function lf(t, e, n) {
  const r = t[of];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Yr = Symbol("_vod"), fu = Symbol("_vsh"), Fr = {
  beforeMount(t, { value: e }, { transition: n }) {
    t[Yr] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : Bn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), Bn(t, !0), r.enter(t)) : r.leave(t, () => {
      Bn(t, !1);
    }) : Bn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    Bn(t, e);
  }
};
function Bn(t, e) {
  t.style.display = e ? t[Yr] : "none", t[fu] = !e;
}
const uf = Symbol(""), af = /(^|;)\s*display\s*:/;
function cf(t, e, n) {
  const r = t.style, i = Rt(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if (Rt(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && jr(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && jr(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), jr(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[uf];
      o && (n += ";" + o), r.cssText = n, s = af.test(n);
    }
  } else e && t.removeAttribute("style");
  Yr in t && (t[Yr] = s ? r.display : "", t[fu] && (r.display = "none"));
}
const _o = /\s*!important$/;
function jr(t, e, n) {
  if (lt(n))
    n.forEach((r) => jr(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = ff(t, e);
    _o.test(n) ? t.setProperty(
      de(r),
      n.replace(_o, ""),
      "important"
    ) : t[r] = n;
  }
}
const vo = ["Webkit", "Moz", "ms"], $i = {};
function ff(t, e) {
  const n = $i[e];
  if (n)
    return n;
  let r = ve(e);
  if (r !== "filter" && r in t)
    return $i[e] = r;
  r = hl(r);
  for (let i = 0; i < vo.length; i++) {
    const s = vo[i] + r;
    if (s in t)
      return $i[e] = s;
  }
  return e;
}
const bo = "http://www.w3.org/1999/xlink";
function xo(t, e, n, r, i, s = _a(e)) {
  r && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(bo, e.slice(6, e.length)) : t.setAttributeNS(bo, e, n) : n == null || s && !dl(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    s ? "" : en(n) ? String(n) : n
  );
}
function Eo(t, e, n, r, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? cu(n) : n);
    return;
  }
  const s = t.tagName;
  if (e === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? t.getAttribute("value") || "" : t.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== u || !("_value" in t)) && (t.value = u), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = dl(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function hf(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function df(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const So = Symbol("_vei");
function pf(t, e, n, r, i = null) {
  const s = t[So] || (t[So] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, u] = gf(e);
    if (r) {
      const c = s[e] = yf(
        r,
        i
      );
      hf(t, l, c, u);
    } else o && (df(t, l, o, u), s[e] = void 0);
  }
}
const Po = /(?:Once|Passive|Capture)$/;
function gf(t) {
  let e;
  if (Po.test(t)) {
    e = {};
    let r;
    for (; r = t.match(Po); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : de(t.slice(2)), e];
}
let Ai = 0;
const mf = /* @__PURE__ */ Promise.resolve(), wf = () => Ai || (mf.then(() => Ai = 0), Ai = Date.now());
function yf(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Re(
      _f(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = wf(), n;
}
function _f(t, e) {
  if (lt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (r) => (i) => !i._stopped && r && r(i)
    );
  } else
    return e;
}
const Mo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, vf = (t, e, n, r, i, s) => {
  const o = i === "svg";
  e === "class" ? lf(t, r, o) : e === "style" ? cf(t, n, r) : ui(e) ? ps(e) || pf(t, e, n, r, s) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : bf(t, e, r, o)) ? (Eo(t, e, r), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && xo(t, e, r, o, s, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Rt(r)) ? Eo(t, ve(e), r, s, e) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), xo(t, e, r, o));
};
function bf(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Mo(e) && at(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Mo(e) && Rt(n) ? !1 : e in t;
}
const ko = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function xf(t, e, n) {
  const r = /* @__PURE__ */ Ts(t, e);
  ci(r) && It(r, e);
  class i extends Is {
    constructor(o) {
      super(r, o, n);
    }
  }
  return i.def = r, i;
}
const Ef = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Is extends Ef {
  constructor(e, n = {}, r = Co) {
    super(), this._def = e, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== Co ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.parentNode || e.host); )
      if (e instanceof Is) {
        this._parent = e;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : e && e._pendingResolve ? this._pendingResolve = e._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(e = this._parent) {
    e && (this._instance.parent = e._instance, this._inheritParentContext(e));
  }
  _inheritParentContext(e = this._parent) {
    e && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      e._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, Il(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const i of r)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (r, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: s, styles: o } = r;
      let l;
      if (s && !lt(s))
        for (const u in s) {
          const c = s[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = Qs(this._props[u])), (l || (l = /* @__PURE__ */ Object.create(null)))[ve(u)] = !0);
        }
      this._numberProps = l, this._resolveProps(r), this.shadowRoot && this._applyStyles(o), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((r) => {
      r.configureApp = this._def.configureApp, e(this._def = r, !0);
    }) : e(this._def);
  }
  _mount(e) {
    this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        gt(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => rr(n[r])
        });
  }
  _resolveProps(e) {
    const { props: n } = e, r = lt(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i]);
    for (const i of r.map(ve))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(s) {
          this._setProp(i, s, !0, !0);
        }
      });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    const n = this.hasAttribute(e);
    let r = n ? this.getAttribute(e) : ko;
    const i = ve(e);
    n && this._numberProps && this._numberProps[i] && (r = Qs(r)), this._setProp(i, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, n, r = !0, i = !1) {
    if (n !== this._props[e] && (n === ko ? delete this._props[e] : (this._props[e] = n, e === "key" && this._app && (this._app._ceVNode.key = n)), i && this._instance && this._update(), r)) {
      const s = this._ob;
      s && s.disconnect(), n === !0 ? this.setAttribute(de(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(de(e), n + "") : n || this.removeAttribute(de(e)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const e = this._createVNode();
    this._app && (e.appContext = this._app._context), Pf(e, this._root);
  }
  _createVNode() {
    const e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    const n = De(this._def, It(e, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const i = (s, o) => {
        this.dispatchEvent(
          new CustomEvent(
            s,
            ci(o[0]) ? It({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      r.emit = (s, ...o) => {
        i(s, o), de(s) !== s && i(de(s), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(e, n) {
    if (!e) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let i = e.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      r && s.setAttribute("nonce", r), s.textContent = e[i], this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const e = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (e[r] || (e[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const e = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let r = 0; r < e.length; r++) {
      const i = e[r], s = i.getAttribute("name") || "default", o = this._slots[s], l = i.parentNode;
      if (o)
        for (const u of o) {
          if (n && u.nodeType === 1) {
            const c = n + "-s", a = document.createTreeWalker(u, 1);
            u.setAttribute(c, "");
            let f;
            for (; f = a.nextNode(); )
              f.setAttribute(c, "");
          }
          l.insertBefore(u, i);
        }
      else
        for (; i.firstChild; ) l.insertBefore(i.firstChild, i);
      l.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(e) {
    this._applyStyles(e.styles, e);
  }
  /**
   * @internal
   */
  _removeChildStyle(e) {
  }
}
const Sf = /* @__PURE__ */ It({ patchProp: vf }, sf);
let To;
function hu() {
  return To || (To = kc(Sf));
}
const Pf = (...t) => {
  hu().render(...t);
}, Co = (...t) => {
  const e = hu().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const i = kf(r);
    if (!i) return;
    const s = e._component;
    !at(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Mf(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
};
function Mf(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function kf(t) {
  return Rt(t) ? document.querySelector(t) : t;
}
const Tf = { class: "graph-controller__controls-overview" }, Cf = { key: 0 }, Nf = { key: 1 }, Rf = { key: 0 }, Lf = { key: 1 }, If = /* @__PURE__ */ Ts({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean },
    platformType: {}
  },
  setup(t) {
    const e = t, n = [
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
        desktop: e.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        touch: e.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
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
    let s = e.platformType === "mobile" || e.platformType === "tablet";
    return (o, l) => (Ue(), We("table", Tf, [
      Or(le("thead", null, [
        le("tr", null, [
          le("th", null, $e(i[0]), 1),
          le("th", null, $e(i[1]), 1)
        ])
      ], 512), [
        [Fr, e.showHeader]
      ]),
      le("tbody", null, [
        (Ue(), We(he, null, io(n, (u) => Or(le("tr", {
          key: u.action
        }, [
          le("td", null, $e(u.action), 1),
          rr(s) ? (Ue(), We("td", Cf, $e(u.touch), 1)) : (Ue(), We("td", Nf, $e(u.desktop), 1))
        ]), [
          [Fr, e.showControlsGraph]
        ])), 64)),
        (Ue(), We(he, null, io(r, (u) => Or(le("tr", {
          key: u.action
        }, [
          le("td", null, $e(u.action), 1),
          rr(s) ? (Ue(), We("td", Rf, $e(u.touch), 1)) : (Ue(), We("td", Lf, $e(u.desktop), 1))
        ]), [
          [Fr, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), Of = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, $f = /* @__PURE__ */ Of(If, [["__scopeId", "data-v-8c3d818f"]]);
var Af = { value: () => {
} };
function gr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Br(n);
}
function Br(t) {
  this._ = t;
}
function Ff(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Br.prototype = gr.prototype = {
  constructor: Br,
  on: function(t, e) {
    var n = this._, r = Ff(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = jf(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = No(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = No(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Br(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  }
};
function jf(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function No(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Af, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var es = "http://www.w3.org/1999/xhtml";
const Ro = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: es,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function vi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ro.hasOwnProperty(e) ? { space: Ro[e], local: t } : t;
}
function Bf(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === es && e.documentElement.namespaceURI === es ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Df(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function du(t) {
  var e = vi(t);
  return (e.local ? Df : Bf)(e);
}
function Vf() {
}
function Os(t) {
  return t == null ? Vf : function() {
    return this.querySelector(t);
  };
}
function zf(t) {
  typeof t != "function" && (t = Os(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), u, c, a = 0; a < o; ++a)
      (u = s[a]) && (c = t.call(u, u.__data__, a, s)) && ("__data__" in u && (c.__data__ = u.__data__), l[a] = c);
  return new ce(r, this._parents);
}
function Gf(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Hf() {
  return [];
}
function pu(t) {
  return t == null ? Hf : function() {
    return this.querySelectorAll(t);
  };
}
function qf(t) {
  return function() {
    return Gf(t.apply(this, arguments));
  };
}
function Uf(t) {
  typeof t == "function" ? t = qf(t) : t = pu(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && (r.push(t.call(u, u.__data__, c, o)), i.push(u));
  return new ce(r, i);
}
function gu(t) {
  return function() {
    return this.matches(t);
  };
}
function mu(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Wf = Array.prototype.find;
function Kf(t) {
  return function() {
    return Wf.call(this.children, t);
  };
}
function Xf() {
  return this.firstElementChild;
}
function Yf(t) {
  return this.select(t == null ? Xf : Kf(typeof t == "function" ? t : mu(t)));
}
var Jf = Array.prototype.filter;
function Qf() {
  return Array.from(this.children);
}
function Zf(t) {
  return function() {
    return Jf.call(this.children, t);
  };
}
function th(t) {
  return this.selectAll(t == null ? Qf : Zf(typeof t == "function" ? t : mu(t)));
}
function eh(t) {
  typeof t != "function" && (t = gu(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new ce(r, this._parents);
}
function wu(t) {
  return new Array(t.length);
}
function nh() {
  return new ce(this._enter || this._groups.map(wu), this._parents);
}
function Jr(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Jr.prototype = {
  constructor: Jr,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function rh(t) {
  return function() {
    return t;
  };
}
function ih(t, e, n, r, i, s) {
  for (var o = 0, l, u = e.length, c = s.length; o < c; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new Jr(t, s[o]);
  for (; o < u; ++o)
    (l = e[o]) && (i[o] = l);
}
function sh(t, e, n, r, i, s, o) {
  var l, u, c = /* @__PURE__ */ new Map(), a = e.length, f = s.length, h = new Array(a), p;
  for (l = 0; l < a; ++l)
    (u = e[l]) && (h[l] = p = o.call(u, u.__data__, l, e) + "", c.has(p) ? i[l] = u : c.set(p, u));
  for (l = 0; l < f; ++l)
    p = o.call(t, s[l], l, s) + "", (u = c.get(p)) ? (r[l] = u, u.__data__ = s[l], c.delete(p)) : n[l] = new Jr(t, s[l]);
  for (l = 0; l < a; ++l)
    (u = e[l]) && c.get(h[l]) === u && (i[l] = u);
}
function oh(t) {
  return t.__data__;
}
function lh(t, e) {
  if (!arguments.length) return Array.from(this, oh);
  var n = e ? sh : ih, r = this._parents, i = this._groups;
  typeof t != "function" && (t = rh(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), c = 0; c < s; ++c) {
    var a = r[c], f = i[c], h = f.length, p = uh(t.call(a, a && a.__data__, c, r)), w = p.length, v = l[c] = new Array(w), y = o[c] = new Array(w), d = u[c] = new Array(h);
    n(a, f, v, y, d, p, e);
    for (var S = 0, N = 0, m, P; S < w; ++S)
      if (m = v[S]) {
        for (S >= N && (N = S + 1); !(P = y[N]) && ++N < w; ) ;
        m._next = P || null;
      }
  }
  return o = new ce(o, r), o._enter = l, o._exit = u, o;
}
function uh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ah() {
  return new ce(this._exit || this._groups.map(wu), this._parents);
}
function ch(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function fh(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), u = 0; u < o; ++u)
    for (var c = n[u], a = r[u], f = c.length, h = l[u] = new Array(f), p, w = 0; w < f; ++w)
      (p = c[w] || a[w]) && (h[w] = p);
  for (; u < i; ++u)
    l[u] = n[u];
  return new ce(l, this._parents);
}
function hh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function dh(t) {
  t || (t = ph);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, u = i[s] = new Array(l), c, a = 0; a < l; ++a)
      (c = o[a]) && (u[a] = c);
    u.sort(e);
  }
  return new ce(i, this._parents).order();
}
function ph(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function gh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function mh() {
  return Array.from(this);
}
function wh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function yh() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function _h() {
  return !this.node();
}
function vh(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function bh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xh(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Eh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Sh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ph(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Mh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function kh(t, e) {
  var n = vi(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? xh : bh : typeof e == "function" ? n.local ? Mh : Ph : n.local ? Sh : Eh)(n, e));
}
function yu(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Th(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ch(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Nh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Rh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Th : typeof e == "function" ? Nh : Ch)(t, e, n ?? "")) : On(this.node(), t);
}
function On(t, e) {
  return t.style.getPropertyValue(e) || yu(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Lh(t) {
  return function() {
    delete this[t];
  };
}
function Ih(t, e) {
  return function() {
    this[t] = e;
  };
}
function Oh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function $h(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Lh : typeof e == "function" ? Oh : Ih)(t, e)) : this.node()[t];
}
function _u(t) {
  return t.trim().split(/^|\s+/);
}
function $s(t) {
  return t.classList || new vu(t);
}
function vu(t) {
  this._node = t, this._names = _u(t.getAttribute("class") || "");
}
vu.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function bu(t, e) {
  for (var n = $s(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function xu(t, e) {
  for (var n = $s(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Ah(t) {
  return function() {
    bu(this, t);
  };
}
function Fh(t) {
  return function() {
    xu(this, t);
  };
}
function jh(t, e) {
  return function() {
    (e.apply(this, arguments) ? bu : xu)(this, t);
  };
}
function Bh(t, e) {
  var n = _u(t + "");
  if (arguments.length < 2) {
    for (var r = $s(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? jh : e ? Ah : Fh)(n, e));
}
function Dh() {
  this.textContent = "";
}
function Vh(t) {
  return function() {
    this.textContent = t;
  };
}
function zh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Gh(t) {
  return arguments.length ? this.each(t == null ? Dh : (typeof t == "function" ? zh : Vh)(t)) : this.node().textContent;
}
function Hh() {
  this.innerHTML = "";
}
function qh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Uh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Wh(t) {
  return arguments.length ? this.each(t == null ? Hh : (typeof t == "function" ? Uh : qh)(t)) : this.node().innerHTML;
}
function Kh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Xh() {
  return this.each(Kh);
}
function Yh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Jh() {
  return this.each(Yh);
}
function Qh(t) {
  var e = typeof t == "function" ? t : du(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Zh() {
  return null;
}
function td(t, e) {
  var n = typeof t == "function" ? t : du(t), r = e == null ? Zh : typeof e == "function" ? e : Os(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ed() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function nd() {
  return this.each(ed);
}
function rd() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function id() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function sd(t) {
  return this.select(t ? id : rd);
}
function od(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ld(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ud(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function ad(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function cd(t, e, n) {
  return function() {
    var r = this.__on, i, s = ld(e);
    if (r) {
      for (var o = 0, l = r.length; o < l; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function fd(t, e, n) {
  var r = ud(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var u = 0, c = l.length, a; u < c; ++u)
        for (i = 0, a = l[u]; i < s; ++i)
          if ((o = r[i]).type === a.type && o.name === a.name)
            return a.value;
    }
    return;
  }
  for (l = e ? cd : ad, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function Eu(t, e, n) {
  var r = yu(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function hd(t, e) {
  return function() {
    return Eu(this, t, e);
  };
}
function dd(t, e) {
  return function() {
    return Eu(this, t, e.apply(this, arguments));
  };
}
function pd(t, e) {
  return this.each((typeof e == "function" ? dd : hd)(t, e));
}
function* gd() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var Su = [null];
function ce(t, e) {
  this._groups = t, this._parents = e;
}
function mr() {
  return new ce([[document.documentElement]], Su);
}
function md() {
  return this;
}
ce.prototype = mr.prototype = {
  constructor: ce,
  select: zf,
  selectAll: Uf,
  selectChild: Yf,
  selectChildren: th,
  filter: eh,
  data: lh,
  enter: nh,
  exit: ah,
  join: ch,
  merge: fh,
  selection: md,
  order: hh,
  sort: dh,
  call: gh,
  nodes: mh,
  node: wh,
  size: yh,
  empty: _h,
  each: vh,
  attr: kh,
  style: Rh,
  property: $h,
  classed: Bh,
  text: Gh,
  html: Wh,
  raise: Xh,
  lower: Jh,
  append: Qh,
  insert: td,
  remove: nd,
  clone: sd,
  datum: od,
  on: fd,
  dispatch: pd,
  [Symbol.iterator]: gd
};
function Tt(t) {
  return typeof t == "string" ? new ce([[document.querySelector(t)]], [document.documentElement]) : new ce([[t]], Su);
}
function Pu(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function ee(t, e) {
  if (t = Pu(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function wd(t, e) {
  return t.target && (t = Pu(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => ee(n, e));
}
const yd = { passive: !1 }, lr = { capture: !0, passive: !1 };
function Fi(t) {
  t.stopImmediatePropagation();
}
function Cn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Mu(t) {
  var e = t.document.documentElement, n = Tt(t).on("dragstart.drag", Cn, lr);
  "onselectstart" in e ? n.on("selectstart.drag", Cn, lr) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function ku(t, e) {
  var n = t.document.documentElement, r = Tt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Cn, lr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Sr = (t) => () => t;
function ns(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: l,
  dx: u,
  dy: c,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: a }
  });
}
ns.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function _d(t) {
  return !t.ctrlKey && !t.button;
}
function vd() {
  return this.parentNode;
}
function bd(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function xd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ed() {
  var t = _d, e = vd, n = bd, r = xd, i = {}, s = gr("start", "drag", "end"), o = 0, l, u, c, a, f = 0;
  function h(m) {
    m.on("mousedown.drag", p).filter(r).on("touchstart.drag", y).on("touchmove.drag", d, yd).on("touchend.drag touchcancel.drag", S).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(m, P) {
    if (!(a || !t.call(this, m, P))) {
      var $ = N(this, e.call(this, m, P), m, P, "mouse");
      $ && (Tt(m.view).on("mousemove.drag", w, lr).on("mouseup.drag", v, lr), Mu(m.view), Fi(m), c = !1, l = m.clientX, u = m.clientY, $("start", m));
    }
  }
  function w(m) {
    if (Cn(m), !c) {
      var P = m.clientX - l, $ = m.clientY - u;
      c = P * P + $ * $ > f;
    }
    i.mouse("drag", m);
  }
  function v(m) {
    Tt(m.view).on("mousemove.drag mouseup.drag", null), ku(m.view, c), Cn(m), i.mouse("end", m);
  }
  function y(m, P) {
    if (t.call(this, m, P)) {
      var $ = m.changedTouches, B = e.call(this, m, P), q = $.length, Z, j;
      for (Z = 0; Z < q; ++Z)
        (j = N(this, B, m, P, $[Z].identifier, $[Z])) && (Fi(m), j("start", m, $[Z]));
    }
  }
  function d(m) {
    var P = m.changedTouches, $ = P.length, B, q;
    for (B = 0; B < $; ++B)
      (q = i[P[B].identifier]) && (Cn(m), q("drag", m, P[B]));
  }
  function S(m) {
    var P = m.changedTouches, $ = P.length, B, q;
    for (a && clearTimeout(a), a = setTimeout(function() {
      a = null;
    }, 500), B = 0; B < $; ++B)
      (q = i[P[B].identifier]) && (Fi(m), q("end", m, P[B]));
  }
  function N(m, P, $, B, q, Z) {
    var j = s.copy(), Q = ee(Z || $, P), ut, U, E;
    if ((E = n.call(m, new ns("beforestart", {
      sourceEvent: $,
      target: h,
      identifier: q,
      active: o,
      x: Q[0],
      y: Q[1],
      dx: 0,
      dy: 0,
      dispatch: j
    }), B)) != null)
      return ut = E.x - Q[0] || 0, U = E.y - Q[1] || 0, function z(T, O, L) {
        var X = Q, J;
        switch (T) {
          case "start":
            i[q] = z, J = o++;
            break;
          case "end":
            delete i[q], --o;
          // falls through
          case "drag":
            Q = ee(L || O, P), J = o;
            break;
        }
        j.call(
          T,
          m,
          new ns(T, {
            sourceEvent: O,
            subject: E,
            target: h,
            identifier: q,
            active: J,
            x: Q[0] + ut,
            y: Q[1] + U,
            dx: Q[0] - X[0],
            dy: Q[1] - X[1],
            dispatch: j
          }),
          B
        );
      };
  }
  return h.filter = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : Sr(!!m), h) : t;
  }, h.container = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : Sr(m), h) : e;
  }, h.subject = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : Sr(m), h) : n;
  }, h.touchable = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : Sr(!!m), h) : r;
  }, h.on = function() {
    var m = s.on.apply(s, arguments);
    return m === s ? h : m;
  }, h.clickDistance = function(m) {
    return arguments.length ? (f = (m = +m) * m, h) : Math.sqrt(f);
  }, h;
}
function As(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Tu(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function wr() {
}
var ur = 0.7, Qr = 1 / ur, Nn = "\\s*([+-]?\\d+)\\s*", ar = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Sd = /^#([0-9a-f]{3,8})$/, Pd = new RegExp(`^rgb\\(${Nn},${Nn},${Nn}\\)$`), Md = new RegExp(`^rgb\\(${Ne},${Ne},${Ne}\\)$`), kd = new RegExp(`^rgba\\(${Nn},${Nn},${Nn},${ar}\\)$`), Td = new RegExp(`^rgba\\(${Ne},${Ne},${Ne},${ar}\\)$`), Cd = new RegExp(`^hsl\\(${ar},${Ne},${Ne}\\)$`), Nd = new RegExp(`^hsla\\(${ar},${Ne},${Ne},${ar}\\)$`), Lo = {
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
As(wr, gn, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Io,
  // Deprecated! Use color.formatHex.
  formatHex: Io,
  formatHex8: Rd,
  formatHsl: Ld,
  formatRgb: Oo,
  toString: Oo
});
function Io() {
  return this.rgb().formatHex();
}
function Rd() {
  return this.rgb().formatHex8();
}
function Ld() {
  return Cu(this).formatHsl();
}
function Oo() {
  return this.rgb().formatRgb();
}
function gn(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Sd.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? $o(e) : n === 3 ? new ne(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Pr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Pr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Pd.exec(t)) ? new ne(e[1], e[2], e[3], 1) : (e = Md.exec(t)) ? new ne(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = kd.exec(t)) ? Pr(e[1], e[2], e[3], e[4]) : (e = Td.exec(t)) ? Pr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Cd.exec(t)) ? jo(e[1], e[2] / 100, e[3] / 100, 1) : (e = Nd.exec(t)) ? jo(e[1], e[2] / 100, e[3] / 100, e[4]) : Lo.hasOwnProperty(t) ? $o(Lo[t]) : t === "transparent" ? new ne(NaN, NaN, NaN, 0) : null;
}
function $o(t) {
  return new ne(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Pr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new ne(t, e, n, r);
}
function Id(t) {
  return t instanceof wr || (t = gn(t)), t ? (t = t.rgb(), new ne(t.r, t.g, t.b, t.opacity)) : new ne();
}
function rs(t, e, n, r) {
  return arguments.length === 1 ? Id(t) : new ne(t, e, n, r ?? 1);
}
function ne(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
As(ne, rs, Tu(wr, {
  brighter(t) {
    return t = t == null ? Qr : Math.pow(Qr, t), new ne(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ur : Math.pow(ur, t), new ne(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ne(pn(this.r), pn(this.g), pn(this.b), Zr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ao,
  // Deprecated! Use color.formatHex.
  formatHex: Ao,
  formatHex8: Od,
  formatRgb: Fo,
  toString: Fo
}));
function Ao() {
  return `#${hn(this.r)}${hn(this.g)}${hn(this.b)}`;
}
function Od() {
  return `#${hn(this.r)}${hn(this.g)}${hn(this.b)}${hn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Fo() {
  const t = Zr(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${pn(this.r)}, ${pn(this.g)}, ${pn(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Zr(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function pn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function hn(t) {
  return t = pn(t), (t < 16 ? "0" : "") + t.toString(16);
}
function jo(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new _e(t, e, n, r);
}
function Cu(t) {
  if (t instanceof _e) return new _e(t.h, t.s, t.l, t.opacity);
  if (t instanceof wr || (t = gn(t)), !t) return new _e();
  if (t instanceof _e) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, l = s - i, u = (s + i) / 2;
  return l ? (e === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - e) / l + 2 : o = (e - n) / l + 4, l /= u < 0.5 ? s + i : 2 - s - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new _e(o, l, u, t.opacity);
}
function $d(t, e, n, r) {
  return arguments.length === 1 ? Cu(t) : new _e(t, e, n, r ?? 1);
}
function _e(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
As(_e, $d, Tu(wr, {
  brighter(t) {
    return t = t == null ? Qr : Math.pow(Qr, t), new _e(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ur : Math.pow(ur, t), new _e(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new ne(
      ji(t >= 240 ? t - 240 : t + 120, i, r),
      ji(t, i, r),
      ji(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new _e(Bo(this.h), Mr(this.s), Mr(this.l), Zr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Zr(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Bo(this.h)}, ${Mr(this.s) * 100}%, ${Mr(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Bo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Mr(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ji(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Fs = (t) => () => t;
function Ad(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Fd(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function jd(t) {
  return (t = +t) == 1 ? Nu : function(e, n) {
    return n - e ? Fd(e, n, t) : Fs(isNaN(e) ? n : e);
  };
}
function Nu(t, e) {
  var n = e - t;
  return n ? Ad(t, n) : Fs(isNaN(t) ? e : t);
}
const ti = function t(e) {
  var n = jd(e);
  function r(i, s) {
    var o = n((i = rs(i)).r, (s = rs(s)).r), l = n(i.g, s.g), u = n(i.b, s.b), c = Nu(i.opacity, s.opacity);
    return function(a) {
      return i.r = o(a), i.g = l(a), i.b = u(a), i.opacity = c(a), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Bd(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function Dd(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Vd(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = js(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function zd(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Te(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Gd(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = js(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var is = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Bi = new RegExp(is.source, "g");
function Hd(t) {
  return function() {
    return t;
  };
}
function qd(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Ru(t, e) {
  var n = is.lastIndex = Bi.lastIndex = 0, r, i, s, o = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = is.exec(t)) && (i = Bi.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: Te(r, i) })), n = Bi.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? u[0] ? qd(u[0].x) : Hd(e) : (e = u.length, function(c) {
    for (var a = 0, f; a < e; ++a) l[(f = u[a]).i] = f.x(c);
    return l.join("");
  });
}
function js(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Fs(e) : (n === "number" ? Te : n === "string" ? (r = gn(e)) ? (e = r, ti) : Ru : e instanceof gn ? ti : e instanceof Date ? zd : Dd(e) ? Bd : Array.isArray(e) ? Vd : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Gd : Te)(t, e);
}
var Do = 180 / Math.PI, ss = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Lu(t, e, n, r, i, s) {
  var o, l, u;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * Do,
    skewX: Math.atan(u) * Do,
    scaleX: o,
    scaleY: l
  };
}
var kr;
function Ud(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ss : Lu(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Wd(t) {
  return t == null || (kr || (kr = document.createElementNS("http://www.w3.org/2000/svg", "g")), kr.setAttribute("transform", t), !(t = kr.transform.baseVal.consolidate())) ? ss : (t = t.matrix, Lu(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Iu(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push("translate(", null, e, null, n);
      w.push({ i: v - 4, x: Te(c, f) }, { i: v - 2, x: Te(a, h) });
    } else (f || h) && p.push("translate(" + f + e + h + n);
  }
  function o(c, a, f, h) {
    c !== a ? (c - a > 180 ? a += 360 : a - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Te(c, a) })) : a && f.push(i(f) + "rotate(" + a + r);
  }
  function l(c, a, f, h) {
    c !== a ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Te(c, a) }) : a && f.push(i(f) + "skewX(" + a + r);
  }
  function u(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push(i(p) + "scale(", null, ",", null, ")");
      w.push({ i: v - 4, x: Te(c, f) }, { i: v - 2, x: Te(a, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(c, a) {
    var f = [], h = [];
    return c = t(c), a = t(a), s(c.translateX, c.translateY, a.translateX, a.translateY, f, h), o(c.rotate, a.rotate, f, h), l(c.skewX, a.skewX, f, h), u(c.scaleX, c.scaleY, a.scaleX, a.scaleY, f, h), c = a = null, function(p) {
      for (var w = -1, v = h.length, y; ++w < v; ) f[(y = h[w]).i] = y.x(p);
      return f.join("");
    };
  };
}
var Kd = Iu(Ud, "px, ", "px)", "deg)"), Xd = Iu(Wd, ", ", ")", ")"), Yd = 1e-12;
function Vo(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Jd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Qd(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Zd = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], u = s[1], c = s[2], a = o[0], f = o[1], h = o[2], p = a - l, w = f - u, v = p * p + w * w, y, d;
    if (v < Yd)
      d = Math.log(h / c) / e, y = function(B) {
        return [
          l + B * p,
          u + B * w,
          c * Math.exp(e * B * d)
        ];
      };
    else {
      var S = Math.sqrt(v), N = (h * h - c * c + r * v) / (2 * c * n * S), m = (h * h - c * c - r * v) / (2 * h * n * S), P = Math.log(Math.sqrt(N * N + 1) - N), $ = Math.log(Math.sqrt(m * m + 1) - m);
      d = ($ - P) / e, y = function(B) {
        var q = B * d, Z = Vo(P), j = c / (n * S) * (Z * Qd(e * q + P) - Jd(P));
        return [
          l + j * p,
          u + j * w,
          c * Z / Vo(e * q + P)
        ];
      };
    }
    return y.duration = d * 1e3 * e / Math.SQRT2, y;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, u = l * l;
    return t(o, l, u);
  }, i;
}(Math.SQRT2, 2, 4);
var $n = 0, Gn = 0, Dn = 0, Ou = 1e3, ei, Hn, ni = 0, mn = 0, bi = 0, cr = typeof performance == "object" && performance.now ? performance : Date, $u = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Bs() {
  return mn || ($u(tp), mn = cr.now() + bi);
}
function tp() {
  mn = 0;
}
function ri() {
  this._call = this._time = this._next = null;
}
ri.prototype = Ds.prototype = {
  constructor: ri,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Bs() : +n) + (e == null ? 0 : +e), !this._next && Hn !== this && (Hn ? Hn._next = this : ei = this, Hn = this), this._call = t, this._time = n, os();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, os());
  }
};
function Ds(t, e, n) {
  var r = new ri();
  return r.restart(t, e, n), r;
}
function ep() {
  Bs(), ++$n;
  for (var t = ei, e; t; )
    (e = mn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --$n;
}
function zo() {
  mn = (ni = cr.now()) + bi, $n = Gn = 0;
  try {
    ep();
  } finally {
    $n = 0, rp(), mn = 0;
  }
}
function np() {
  var t = cr.now(), e = t - ni;
  e > Ou && (bi -= e, ni = t);
}
function rp() {
  for (var t, e = ei, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ei = n);
  Hn = t, os(r);
}
function os(t) {
  if (!$n) {
    Gn && (Gn = clearTimeout(Gn));
    var e = t - mn;
    e > 24 ? (t < 1 / 0 && (Gn = setTimeout(zo, t - cr.now() - bi)), Dn && (Dn = clearInterval(Dn))) : (Dn || (ni = cr.now(), Dn = setInterval(np, Ou)), $n = 1, $u(zo));
  }
}
function Go(t, e, n) {
  var r = new ri();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ip = gr("start", "end", "cancel", "interrupt"), sp = [], Au = 0, Ho = 1, ls = 2, Dr = 3, qo = 4, us = 5, Vr = 6;
function xi(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  op(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ip,
    tween: sp,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Au
  });
}
function Vs(t, e) {
  var n = xe(t, e);
  if (n.state > Au) throw new Error("too late; already scheduled");
  return n;
}
function Le(t, e) {
  var n = xe(t, e);
  if (n.state > Dr) throw new Error("too late; already running");
  return n;
}
function xe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function op(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Ds(s, 0, n.time);
  function s(c) {
    n.state = Ho, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var a, f, h, p;
    if (n.state !== Ho) return u();
    for (a in r)
      if (p = r[a], p.name === n.name) {
        if (p.state === Dr) return Go(o);
        p.state === qo ? (p.state = Vr, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[a]) : +a < e && (p.state = Vr, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[a]);
      }
    if (Go(function() {
      n.state === Dr && (n.state = qo, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = ls, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ls) {
      for (n.state = Dr, i = new Array(h = n.tween.length), a = 0, f = -1; a < h; ++a)
        (p = n.tween[a].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var a = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = us, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, a);
    n.state === us && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Vr, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function zr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > ls && r.state < us, r.state = Vr, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function lp(t) {
  return this.each(function() {
    zr(this, t);
  });
}
function up(t, e) {
  var n, r;
  return function() {
    var i = Le(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, l = r.length; o < l; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ap(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Le(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var l = { name: e, value: n }, u = 0, c = i.length; u < c; ++u)
        if (i[u].name === e) {
          i[u] = l;
          break;
        }
      u === c && i.push(l);
    }
    s.tween = i;
  };
}
function cp(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = xe(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? up : ap)(n, t, e));
}
function zs(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Le(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return xe(i, r).value[e];
  };
}
function Fu(t, e) {
  var n;
  return (typeof e == "number" ? Te : e instanceof gn ? ti : (n = gn(e)) ? (e = n, ti) : Ru)(t, e);
}
function fp(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function hp(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function dp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function pp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function gp(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function mp(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function wp(t, e) {
  var n = vi(t), r = n === "transform" ? Xd : Fu;
  return this.attrTween(t, typeof e == "function" ? (n.local ? mp : gp)(n, r, zs(this, "attr." + t, e)) : e == null ? (n.local ? hp : fp)(n) : (n.local ? pp : dp)(n, r, e));
}
function yp(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function _p(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function vp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && _p(t, s)), n;
  }
  return i._value = e, i;
}
function bp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && yp(t, s)), n;
  }
  return i._value = e, i;
}
function xp(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = vi(t);
  return this.tween(n, (r.local ? vp : bp)(r, e));
}
function Ep(t, e) {
  return function() {
    Vs(this, t).delay = +e.apply(this, arguments);
  };
}
function Sp(t, e) {
  return e = +e, function() {
    Vs(this, t).delay = e;
  };
}
function Pp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ep : Sp)(e, t)) : xe(this.node(), e).delay;
}
function Mp(t, e) {
  return function() {
    Le(this, t).duration = +e.apply(this, arguments);
  };
}
function kp(t, e) {
  return e = +e, function() {
    Le(this, t).duration = e;
  };
}
function Tp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Mp : kp)(e, t)) : xe(this.node(), e).duration;
}
function Cp(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Le(this, t).ease = e;
  };
}
function Np(t) {
  var e = this._id;
  return arguments.length ? this.each(Cp(e, t)) : xe(this.node(), e).ease;
}
function Rp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Le(this, t).ease = n;
  };
}
function Lp(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Rp(this._id, t));
}
function Ip(t) {
  typeof t != "function" && (t = gu(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new Ge(r, this._parents, this._name, this._id);
}
function Op(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var u = e[l], c = n[l], a = u.length, f = o[l] = new Array(a), h, p = 0; p < a; ++p)
      (h = u[p] || c[p]) && (f[p] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new Ge(o, this._parents, this._name, this._id);
}
function $p(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Ap(t, e, n) {
  var r, i, s = $p(e) ? Vs : Le;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function Fp(t, e) {
  var n = this._id;
  return arguments.length < 2 ? xe(this.node(), n).on.on(t) : this.each(Ap(n, t, e));
}
function jp(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Bp() {
  return this.on("end.remove", jp(this._id));
}
function Dp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Os(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, c = s[o] = new Array(u), a, f, h = 0; h < u; ++h)
      (a = l[h]) && (f = t.call(a, a.__data__, h, l)) && ("__data__" in a && (f.__data__ = a.__data__), c[h] = f, xi(c[h], e, n, h, c, xe(a, n)));
  return new Ge(s, this._parents, e, n);
}
function Vp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = pu(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var u = r[l], c = u.length, a, f = 0; f < c; ++f)
      if (a = u[f]) {
        for (var h = t.call(a, a.__data__, f, u), p, w = xe(a, n), v = 0, y = h.length; v < y; ++v)
          (p = h[v]) && xi(p, e, n, v, h, w);
        s.push(h), o.push(a);
      }
  return new Ge(s, o, e, n);
}
var zp = mr.prototype.constructor;
function Gp() {
  return new zp(this._groups, this._parents);
}
function Hp(t, e) {
  var n, r, i;
  return function() {
    var s = On(this, t), o = (this.style.removeProperty(t), On(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function ju(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function qp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = On(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Up(t, e, n) {
  var r, i, s;
  return function() {
    var o = On(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), On(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l));
  };
}
function Wp(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var u = Le(this, t), c = u.on, a = u.value[s] == null ? l || (l = ju(e)) : void 0;
    (c !== n || i !== a) && (r = (n = c).copy()).on(o, i = a), u.on = r;
  };
}
function Kp(t, e, n) {
  var r = (t += "") == "transform" ? Kd : Fu;
  return e == null ? this.styleTween(t, Hp(t, r)).on("end.style." + t, ju(t)) : typeof e == "function" ? this.styleTween(t, Up(t, r, zs(this, "style." + t, e))).each(Wp(this._id, t)) : this.styleTween(t, qp(t, r, e), n).on("end.style." + t, null);
}
function Xp(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Yp(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Xp(t, o, n)), r;
  }
  return s._value = e, s;
}
function Jp(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Yp(t, e, n ?? ""));
}
function Qp(t) {
  return function() {
    this.textContent = t;
  };
}
function Zp(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function tg(t) {
  return this.tween("text", typeof t == "function" ? Zp(zs(this, "text", t)) : Qp(t == null ? "" : t + ""));
}
function eg(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ng(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && eg(i)), e;
  }
  return r._value = t, r;
}
function rg(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ng(t));
}
function ig() {
  for (var t = this._name, e = this._id, n = Bu(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      if (u = o[c]) {
        var a = xe(u, e);
        xi(u, t, n, c, o, {
          time: a.time + a.delay + a.duration,
          delay: 0,
          duration: a.duration,
          ease: a.ease
        });
      }
  return new Ge(r, this._parents, t, n);
}
function sg() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = Le(this, r), a = c.on;
      a !== t && (e = (t = a).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), c.on = e;
    }), i === 0 && s();
  });
}
var og = 0;
function Ge(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Bu() {
  return ++og;
}
var Oe = mr.prototype;
Ge.prototype = {
  constructor: Ge,
  select: Dp,
  selectAll: Vp,
  selectChild: Oe.selectChild,
  selectChildren: Oe.selectChildren,
  filter: Ip,
  merge: Op,
  selection: Gp,
  transition: ig,
  call: Oe.call,
  nodes: Oe.nodes,
  node: Oe.node,
  size: Oe.size,
  empty: Oe.empty,
  each: Oe.each,
  on: Fp,
  attr: wp,
  attrTween: xp,
  style: Kp,
  styleTween: Jp,
  text: tg,
  textTween: rg,
  remove: Bp,
  tween: cp,
  delay: Pp,
  duration: Tp,
  ease: Np,
  easeVarying: Lp,
  end: sg,
  [Symbol.iterator]: Oe[Symbol.iterator]
};
const Uo = (t) => +t;
function lg(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ug = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: lg
};
function ag(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function cg(t) {
  var e, n;
  t instanceof Ge ? (e = t._id, t = t._name) : (e = Bu(), (n = ug).time = Bs(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && xi(u, t, e, c, o, n || ag(u, e));
  return new Ge(r, this._parents, t, e);
}
mr.prototype.interrupt = lp;
mr.prototype.transition = cg;
const as = Math.PI, cs = 2 * as, fn = 1e-6, fg = cs - fn;
function Du(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function hg(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Du;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class dg {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Du : hg(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, s, o) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +s},${this._y1 = +o}`;
  }
  arcTo(e, n, r, i, s) {
    if (e = +e, n = +n, r = +r, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let o = this._x1, l = this._y1, u = r - e, c = i - n, a = o - e, f = l - n, h = a * a + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > fn) if (!(Math.abs(f * u - c * a) > fn) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - o, w = i - l, v = u * u + c * c, y = p * p + w * w, d = Math.sqrt(v), S = Math.sqrt(h), N = s * Math.tan((as - Math.acos((v + h - y) / (2 * d * S))) / 2), m = N / S, P = N / d;
      Math.abs(m - 1) > fn && this._append`L${e + m * a},${n + m * f}`, this._append`A${s},${s},0,0,${+(f * p > a * w)},${this._x1 = e + P * u},${this._y1 = n + P * c}`;
    }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), c = e + l, a = n + u, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${c},${a}` : (Math.abs(this._x1 - c) > fn || Math.abs(this._y1 - a) > fn) && this._append`L${c},${a}`, r && (h < 0 && (h = h % cs + cs), h > fg ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = a}` : h > fn && this._append`A${r},${r},0,${+(h >= as)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function pg(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Vu(this.cover(e, n), e, n, t);
}
function Vu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, p, w, v, y, d, S;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((v = e >= (f = (l + c) / 2)) ? l = f : c = f, (y = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[d = y << 1 | v])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), w = +t._y.call(null, s.data), e === p && n === w) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (v = e >= (f = (l + c) / 2)) ? l = f : c = f, (y = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((d = y << 1 | v) === (S = (w >= h) << 1 | p >= f));
  return i[S] = s, i[d] = o, t;
}
function gg(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  if (u > a || c > f) return this;
  for (this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    Vu(this, o[n], l[n], t[n]);
  return this;
}
function mg(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else {
    for (var o = i - n || 1, l = this._root, u, c; n > t || t >= i || r > e || e >= s; )
      switch (c = (e < r) << 1 | t < n, u = new Array(4), u[c] = l, l = u, o *= 2, c) {
        case 0:
          i = n + o, s = r + o;
          break;
        case 1:
          n = i - o, s = r + o;
          break;
        case 2:
          i = n + o, r = s - o;
          break;
        case 3:
          n = i - o, r = s - o;
          break;
      }
    this._root && this._root.length && (this._root = l);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function wg() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function yg(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Wt(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function _g(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, w, v;
  for (p && h.push(new Wt(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); w = h.pop(); )
    if (!(!(p = w.node) || (o = w.x0) > a || (l = w.y0) > f || (u = w.x1) < i || (c = w.y1) < s))
      if (p.length) {
        var y = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new Wt(p[3], y, d, u, c),
          new Wt(p[2], o, d, y, c),
          new Wt(p[1], y, l, u, d),
          new Wt(p[0], o, l, y, d)
        ), (v = (e >= d) << 1 | t >= y) && (w = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - v], h[h.length - 1 - v] = w);
      } else {
        var S = t - +this._x.call(null, p.data), N = e - +this._y.call(null, p.data), m = S * S + N * N;
        if (m < n) {
          var P = Math.sqrt(n = m);
          i = t - P, s = e - P, a = t + P, f = e + P, r = p.data;
        }
      }
  return r;
}
function vg(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, p, w, v, y, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((w = a >= (h = (o + u) / 2)) ? o = h : u = h, (v = f >= (p = (l + c) / 2)) ? l = p : c = p, e = n, !(n = n[y = v << 1 | w])) return this;
    if (!n.length) break;
    (e[y + 1 & 3] || e[y + 2 & 3] || e[y + 3 & 3]) && (r = e, d = y);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[y] = s : delete e[y], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function bg(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function xg() {
  return this._root;
}
function Eg() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function Sg(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Wt(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Wt(i, c, a, l, u)), (i = r[2]) && e.push(new Wt(i, s, a, c, u)), (i = r[1]) && e.push(new Wt(i, c, o, l, a)), (i = r[0]) && e.push(new Wt(i, s, o, c, a));
    }
  return this;
}
function Pg(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Wt(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Wt(s, o, l, a, f)), (s = i[1]) && e.push(new Wt(s, a, l, u, f)), (s = i[2]) && e.push(new Wt(s, o, f, a, c)), (s = i[3]) && e.push(new Wt(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Mg(t) {
  return t[0];
}
function kg(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function Tg(t) {
  return t[1];
}
function Cg(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Gs(t, e, n) {
  var r = new Hs(e ?? Mg, n ?? Tg, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Hs(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Wo(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Yt = Gs.prototype = Hs.prototype;
Yt.copy = function() {
  var t = new Hs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Wo(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Wo(r));
  return t;
};
Yt.add = pg;
Yt.addAll = gg;
Yt.cover = mg;
Yt.data = wg;
Yt.extent = yg;
Yt.find = _g;
Yt.remove = vg;
Yt.removeAll = bg;
Yt.root = xg;
Yt.size = Eg;
Yt.visit = Sg;
Yt.visitAfter = Pg;
Yt.x = kg;
Yt.y = Cg;
function Xt(t) {
  return function() {
    return t;
  };
}
function Qe(t) {
  return (t() - 0.5) * 1e-6;
}
function Ng(t) {
  return t.x + t.vx;
}
function Rg(t) {
  return t.y + t.vy;
}
function Lg(t) {
  var e, n, r, i = 1, s = 1;
  typeof t != "function" && (t = Xt(t == null ? 1 : +t));
  function o() {
    for (var c, a = e.length, f, h, p, w, v, y, d = 0; d < s; ++d)
      for (f = Gs(e, Ng, Rg).visitAfter(l), c = 0; c < a; ++c)
        h = e[c], v = n[h.index], y = v * v, p = h.x + h.vx, w = h.y + h.vy, f.visit(S);
    function S(N, m, P, $, B) {
      var q = N.data, Z = N.r, j = v + Z;
      if (q) {
        if (q.index > h.index) {
          var Q = p - q.x - q.vx, ut = w - q.y - q.vy, U = Q * Q + ut * ut;
          U < j * j && (Q === 0 && (Q = Qe(r), U += Q * Q), ut === 0 && (ut = Qe(r), U += ut * ut), U = (j - (U = Math.sqrt(U))) / U * i, h.vx += (Q *= U) * (j = (Z *= Z) / (y + Z)), h.vy += (ut *= U) * j, q.vx -= Q * (j = 1 - j), q.vy -= ut * j);
        }
        return;
      }
      return m > p + j || $ < p - j || P > w + j || B < w - j;
    }
  }
  function l(c) {
    if (c.data) return c.r = n[c.data.index];
    for (var a = c.r = 0; a < 4; ++a)
      c[a] && c[a].r > c.r && (c.r = c[a].r);
  }
  function u() {
    if (e) {
      var c, a = e.length, f;
      for (n = new Array(a), c = 0; c < a; ++c) f = e[c], n[f.index] = +t(f, c, e);
    }
  }
  return o.initialize = function(c, a) {
    e = c, r = a, u();
  }, o.iterations = function(c) {
    return arguments.length ? (s = +c, o) : s;
  }, o.strength = function(c) {
    return arguments.length ? (i = +c, o) : i;
  }, o.radius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Xt(+c), u(), o) : t;
  }, o;
}
function Ig(t) {
  return t.index;
}
function Ko(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function Og(t) {
  var e = Ig, n = f, r, i = Xt(30), s, o, l, u, c, a = 1;
  t == null && (t = []);
  function f(y) {
    return 1 / Math.min(l[y.source.index], l[y.target.index]);
  }
  function h(y) {
    for (var d = 0, S = t.length; d < a; ++d)
      for (var N = 0, m, P, $, B, q, Z, j; N < S; ++N)
        m = t[N], P = m.source, $ = m.target, B = $.x + $.vx - P.x - P.vx || Qe(c), q = $.y + $.vy - P.y - P.vy || Qe(c), Z = Math.sqrt(B * B + q * q), Z = (Z - s[N]) / Z * y * r[N], B *= Z, q *= Z, $.vx -= B * (j = u[N]), $.vy -= q * j, P.vx += B * (j = 1 - j), P.vy += q * j;
  }
  function p() {
    if (o) {
      var y, d = o.length, S = t.length, N = new Map(o.map((P, $) => [e(P, $, o), P])), m;
      for (y = 0, l = new Array(d); y < S; ++y)
        m = t[y], m.index = y, typeof m.source != "object" && (m.source = Ko(N, m.source)), typeof m.target != "object" && (m.target = Ko(N, m.target)), l[m.source.index] = (l[m.source.index] || 0) + 1, l[m.target.index] = (l[m.target.index] || 0) + 1;
      for (y = 0, u = new Array(S); y < S; ++y)
        m = t[y], u[y] = l[m.source.index] / (l[m.source.index] + l[m.target.index]);
      r = new Array(S), w(), s = new Array(S), v();
    }
  }
  function w() {
    if (o)
      for (var y = 0, d = t.length; y < d; ++y)
        r[y] = +n(t[y], y, t);
  }
  function v() {
    if (o)
      for (var y = 0, d = t.length; y < d; ++y)
        s[y] = +i(t[y], y, t);
  }
  return h.initialize = function(y, d) {
    o = y, c = d, p();
  }, h.links = function(y) {
    return arguments.length ? (t = y, p(), h) : t;
  }, h.id = function(y) {
    return arguments.length ? (e = y, h) : e;
  }, h.iterations = function(y) {
    return arguments.length ? (a = +y, h) : a;
  }, h.strength = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Xt(+y), w(), h) : n;
  }, h.distance = function(y) {
    return arguments.length ? (i = typeof y == "function" ? y : Xt(+y), v(), h) : i;
  }, h;
}
const $g = 1664525, Ag = 1013904223, Xo = 4294967296;
function Fg() {
  let t = 1;
  return () => (t = ($g * t + Ag) % Xo) / Xo;
}
function jg(t) {
  return t.x;
}
function Bg(t) {
  return t.y;
}
var Dg = 10, Vg = Math.PI * (3 - Math.sqrt(5));
function zg(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), u = Ds(f), c = gr("tick", "end"), a = Fg();
  t == null && (t = []);
  function f() {
    h(), c.call("tick", e), n < r && (u.stop(), c.call("end", e));
  }
  function h(v) {
    var y, d = t.length, S;
    v === void 0 && (v = 1);
    for (var N = 0; N < v; ++N)
      for (n += (s - n) * i, l.forEach(function(m) {
        m(n);
      }), y = 0; y < d; ++y)
        S = t[y], S.fx == null ? S.x += S.vx *= o : (S.x = S.fx, S.vx = 0), S.fy == null ? S.y += S.vy *= o : (S.y = S.fy, S.vy = 0);
    return e;
  }
  function p() {
    for (var v = 0, y = t.length, d; v < y; ++v) {
      if (d = t[v], d.index = v, d.fx != null && (d.x = d.fx), d.fy != null && (d.y = d.fy), isNaN(d.x) || isNaN(d.y)) {
        var S = Dg * Math.sqrt(0.5 + v), N = v * Vg;
        d.x = S * Math.cos(N), d.y = S * Math.sin(N);
      }
      (isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0);
    }
  }
  function w(v) {
    return v.initialize && v.initialize(t, a), v;
  }
  return p(), e = {
    tick: h,
    restart: function() {
      return u.restart(f), e;
    },
    stop: function() {
      return u.stop(), e;
    },
    nodes: function(v) {
      return arguments.length ? (t = v, p(), l.forEach(w), e) : t;
    },
    alpha: function(v) {
      return arguments.length ? (n = +v, e) : n;
    },
    alphaMin: function(v) {
      return arguments.length ? (r = +v, e) : r;
    },
    alphaDecay: function(v) {
      return arguments.length ? (i = +v, e) : +i;
    },
    alphaTarget: function(v) {
      return arguments.length ? (s = +v, e) : s;
    },
    velocityDecay: function(v) {
      return arguments.length ? (o = 1 - v, e) : 1 - o;
    },
    randomSource: function(v) {
      return arguments.length ? (a = v, l.forEach(w), e) : a;
    },
    force: function(v, y) {
      return arguments.length > 1 ? (y == null ? l.delete(v) : l.set(v, w(y)), e) : l.get(v);
    },
    find: function(v, y, d) {
      var S = 0, N = t.length, m, P, $, B, q;
      for (d == null ? d = 1 / 0 : d *= d, S = 0; S < N; ++S)
        B = t[S], m = v - B.x, P = y - B.y, $ = m * m + P * P, $ < d && (q = B, d = $);
      return q;
    },
    on: function(v, y) {
      return arguments.length > 1 ? (c.on(v, y), e) : c.on(v);
    }
  };
}
function Gg() {
  var t, e, n, r, i = Xt(-30), s, o = 1, l = 1 / 0, u = 0.81;
  function c(p) {
    var w, v = t.length, y = Gs(t, jg, Bg).visitAfter(f);
    for (r = p, w = 0; w < v; ++w) e = t[w], y.visit(h);
  }
  function a() {
    if (t) {
      var p, w = t.length, v;
      for (s = new Array(w), p = 0; p < w; ++p) v = t[p], s[v.index] = +i(v, p, t);
    }
  }
  function f(p) {
    var w = 0, v, y, d = 0, S, N, m;
    if (p.length) {
      for (S = N = m = 0; m < 4; ++m)
        (v = p[m]) && (y = Math.abs(v.value)) && (w += v.value, d += y, S += y * v.x, N += y * v.y);
      p.x = S / d, p.y = N / d;
    } else {
      v = p, v.x = v.data.x, v.y = v.data.y;
      do
        w += s[v.data.index];
      while (v = v.next);
    }
    p.value = w;
  }
  function h(p, w, v, y) {
    if (!p.value) return !0;
    var d = p.x - e.x, S = p.y - e.y, N = y - w, m = d * d + S * S;
    if (N * N / u < m)
      return m < l && (d === 0 && (d = Qe(n), m += d * d), S === 0 && (S = Qe(n), m += S * S), m < o && (m = Math.sqrt(o * m)), e.vx += d * p.value * r / m, e.vy += S * p.value * r / m), !0;
    if (p.length || m >= l) return;
    (p.data !== e || p.next) && (d === 0 && (d = Qe(n), m += d * d), S === 0 && (S = Qe(n), m += S * S), m < o && (m = Math.sqrt(o * m)));
    do
      p.data !== e && (N = s[p.data.index] * r / m, e.vx += d * N, e.vy += S * N);
    while (p = p.next);
  }
  return c.initialize = function(p, w) {
    t = p, n = w, a();
  }, c.strength = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Xt(+p), a(), c) : i;
  }, c.distanceMin = function(p) {
    return arguments.length ? (o = p * p, c) : Math.sqrt(o);
  }, c.distanceMax = function(p) {
    return arguments.length ? (l = p * p, c) : Math.sqrt(l);
  }, c.theta = function(p) {
    return arguments.length ? (u = p * p, c) : Math.sqrt(u);
  }, c;
}
function Hg(t) {
  var e = Xt(0.1), n, r, i;
  typeof t != "function" && (t = Xt(t == null ? 0 : +t));
  function s(l) {
    for (var u = 0, c = n.length, a; u < c; ++u)
      a = n[u], a.vx += (i[u] - a.x) * r[u] * l;
  }
  function o() {
    if (n) {
      var l, u = n.length;
      for (r = new Array(u), i = new Array(u), l = 0; l < u; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Xt(+l), o(), s) : e;
  }, s.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Xt(+l), o(), s) : t;
  }, s;
}
function qg(t) {
  var e = Xt(0.1), n, r, i;
  typeof t != "function" && (t = Xt(t == null ? 0 : +t));
  function s(l) {
    for (var u = 0, c = n.length, a; u < c; ++u)
      a = n[u], a.vy += (i[u] - a.y) * r[u] * l;
  }
  function o() {
    if (n) {
      var l, u = n.length;
      for (r = new Array(u), i = new Array(u), l = 0; l < u; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Xt(+l), o(), s) : e;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Xt(+l), o(), s) : t;
  }, s;
}
function te(t) {
  return function() {
    return t;
  };
}
const Yo = Math.abs, Ft = Math.atan2, ln = Math.cos, Ug = Math.max, Di = Math.min, Pe = Math.sin, En = Math.sqrt, Qt = 1e-12, fr = Math.PI, ii = fr / 2, Wg = 2 * fr;
function Kg(t) {
  return t > 1 ? 0 : t < -1 ? fr : Math.acos(t);
}
function Jo(t) {
  return t >= 1 ? ii : t <= -1 ? -ii : Math.asin(t);
}
function zu(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new dg(e);
}
function Xg(t) {
  return t.innerRadius;
}
function Yg(t) {
  return t.outerRadius;
}
function Jg(t) {
  return t.startAngle;
}
function Qg(t) {
  return t.endAngle;
}
function Zg(t) {
  return t && t.padAngle;
}
function t0(t, e, n, r, i, s, o, l) {
  var u = n - t, c = r - e, a = o - i, f = l - s, h = f * u - a * c;
  if (!(h * h < Qt))
    return h = (a * (e - s) - f * (t - i)) / h, [t + h * u, e + h * c];
}
function Tr(t, e, n, r, i, s, o) {
  var l = t - n, u = e - r, c = (o ? s : -s) / En(l * l + u * u), a = c * u, f = -c * l, h = t + a, p = e + f, w = n + a, v = r + f, y = (h + w) / 2, d = (p + v) / 2, S = w - h, N = v - p, m = S * S + N * N, P = i - s, $ = h * v - w * p, B = (N < 0 ? -1 : 1) * En(Ug(0, P * P * m - $ * $)), q = ($ * N - S * B) / m, Z = (-$ * S - N * B) / m, j = ($ * N + S * B) / m, Q = (-$ * S + N * B) / m, ut = q - y, U = Z - d, E = j - y, z = Q - d;
  return ut * ut + U * U > E * E + z * z && (q = j, Z = Q), {
    cx: q,
    cy: Z,
    x01: -a,
    y01: -f,
    x11: q * (i / P - 1),
    y11: Z * (i / P - 1)
  };
}
function e0() {
  var t = Xg, e = Yg, n = te(0), r = null, i = Jg, s = Qg, o = Zg, l = null, u = zu(c);
  function c() {
    var a, f, h = +t.apply(this, arguments), p = +e.apply(this, arguments), w = i.apply(this, arguments) - ii, v = s.apply(this, arguments) - ii, y = Yo(v - w), d = v > w;
    if (l || (l = a = u()), p < h && (f = p, p = h, h = f), !(p > Qt)) l.moveTo(0, 0);
    else if (y > Wg - Qt)
      l.moveTo(p * ln(w), p * Pe(w)), l.arc(0, 0, p, w, v, !d), h > Qt && (l.moveTo(h * ln(v), h * Pe(v)), l.arc(0, 0, h, v, w, d));
    else {
      var S = w, N = v, m = w, P = v, $ = y, B = y, q = o.apply(this, arguments) / 2, Z = q > Qt && (r ? +r.apply(this, arguments) : En(h * h + p * p)), j = Di(Yo(p - h) / 2, +n.apply(this, arguments)), Q = j, ut = j, U, E;
      if (Z > Qt) {
        var z = Jo(Z / h * Pe(q)), T = Jo(Z / p * Pe(q));
        ($ -= z * 2) > Qt ? (z *= d ? 1 : -1, m += z, P -= z) : ($ = 0, m = P = (w + v) / 2), (B -= T * 2) > Qt ? (T *= d ? 1 : -1, S += T, N -= T) : (B = 0, S = N = (w + v) / 2);
      }
      var O = p * ln(S), L = p * Pe(S), X = h * ln(P), J = h * Pe(P);
      if (j > Qt) {
        var it = p * ln(N), ot = p * Pe(N), Et = h * ln(m), mt = h * Pe(m), wt;
        if (y < fr)
          if (wt = t0(O, L, Et, mt, it, ot, X, J)) {
            var St = O - wt[0], vt = L - wt[1], Pt = it - wt[0], Lt = ot - wt[1], Dt = 1 / Pe(Kg((St * Pt + vt * Lt) / (En(St * St + vt * vt) * En(Pt * Pt + Lt * Lt))) / 2), Ee = En(wt[0] * wt[0] + wt[1] * wt[1]);
            Q = Di(j, (h - Ee) / (Dt - 1)), ut = Di(j, (p - Ee) / (Dt + 1));
          } else
            Q = ut = 0;
      }
      B > Qt ? ut > Qt ? (U = Tr(Et, mt, O, L, p, ut, d), E = Tr(it, ot, X, J, p, ut, d), l.moveTo(U.cx + U.x01, U.cy + U.y01), ut < j ? l.arc(U.cx, U.cy, ut, Ft(U.y01, U.x01), Ft(E.y01, E.x01), !d) : (l.arc(U.cx, U.cy, ut, Ft(U.y01, U.x01), Ft(U.y11, U.x11), !d), l.arc(0, 0, p, Ft(U.cy + U.y11, U.cx + U.x11), Ft(E.cy + E.y11, E.cx + E.x11), !d), l.arc(E.cx, E.cy, ut, Ft(E.y11, E.x11), Ft(E.y01, E.x01), !d))) : (l.moveTo(O, L), l.arc(0, 0, p, S, N, !d)) : l.moveTo(O, L), !(h > Qt) || !($ > Qt) ? l.lineTo(X, J) : Q > Qt ? (U = Tr(X, J, it, ot, h, -Q, d), E = Tr(O, L, Et, mt, h, -Q, d), l.lineTo(U.cx + U.x01, U.cy + U.y01), Q < j ? l.arc(U.cx, U.cy, Q, Ft(U.y01, U.x01), Ft(E.y01, E.x01), !d) : (l.arc(U.cx, U.cy, Q, Ft(U.y01, U.x01), Ft(U.y11, U.x11), !d), l.arc(0, 0, h, Ft(U.cy + U.y11, U.cx + U.x11), Ft(E.cy + E.y11, E.cx + E.x11), d), l.arc(E.cx, E.cy, Q, Ft(E.y11, E.x11), Ft(E.y01, E.x01), !d))) : l.arc(0, 0, h, P, m, d);
    }
    if (l.closePath(), a) return l = null, a + "" || null;
  }
  return c.centroid = function() {
    var a = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - fr / 2;
    return [ln(f) * a, Pe(f) * a];
  }, c.innerRadius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : te(+a), c) : t;
  }, c.outerRadius = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : te(+a), c) : e;
  }, c.cornerRadius = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : te(+a), c) : n;
  }, c.padRadius = function(a) {
    return arguments.length ? (r = a == null ? null : typeof a == "function" ? a : te(+a), c) : r;
  }, c.startAngle = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : te(+a), c) : i;
  }, c.endAngle = function(a) {
    return arguments.length ? (s = typeof a == "function" ? a : te(+a), c) : s;
  }, c.padAngle = function(a) {
    return arguments.length ? (o = typeof a == "function" ? a : te(+a), c) : o;
  }, c.context = function(a) {
    return arguments.length ? (l = a ?? null, c) : l;
  }, c;
}
function n0(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Gu(t) {
  this._context = t;
}
Gu.prototype = {
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
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function r0(t) {
  return new Gu(t);
}
function i0(t) {
  return t[0];
}
function s0(t) {
  return t[1];
}
function o0(t, e) {
  var n = te(!0), r = null, i = r0, s = null, o = zu(l);
  t = typeof t == "function" ? t : t === void 0 ? i0 : te(t), e = typeof e == "function" ? e : e === void 0 ? s0 : te(e);
  function l(u) {
    var c, a = (u = n0(u)).length, f, h = !1, p;
    for (r == null && (s = i(p = o())), c = 0; c <= a; ++c)
      !(c < a && n(f = u[c], c, u)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+t(f, c, u), +e(f, c, u));
    if (p) return s = null, p + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : te(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : te(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : te(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (s = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = s = null : s = i(r = u), l) : r;
  }, l;
}
const Cr = (t) => () => t;
function l0(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function Be(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Be.prototype = {
  constructor: Be,
  scale: function(t) {
    return t === 1 ? this : new Be(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Be(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Hu = new Be(1, 0, 0);
Be.prototype;
function Vi(t) {
  t.stopImmediatePropagation();
}
function Vn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function u0(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function a0() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Qo() {
  return this.__zoom || Hu;
}
function c0(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function f0() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function h0(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function d0() {
  var t = u0, e = a0, n = h0, r = c0, i = f0, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = Zd, c = gr("start", "zoom", "end"), a, f, h, p = 500, w = 150, v = 0, y = 10;
  function d(E) {
    E.property("__zoom", Qo).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", Z).on("dblclick.zoom", j).filter(i).on("touchstart.zoom", Q).on("touchmove.zoom", ut).on("touchend.zoom touchcancel.zoom", U).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(E, z, T, O) {
    var L = E.selection ? E.selection() : E;
    L.property("__zoom", Qo), E !== L ? P(E, z, T, O) : L.interrupt().each(function() {
      $(this, arguments).event(O).start().zoom(null, typeof z == "function" ? z.apply(this, arguments) : z).end();
    });
  }, d.scaleBy = function(E, z, T, O) {
    d.scaleTo(E, function() {
      var L = this.__zoom.k, X = typeof z == "function" ? z.apply(this, arguments) : z;
      return L * X;
    }, T, O);
  }, d.scaleTo = function(E, z, T, O) {
    d.transform(E, function() {
      var L = e.apply(this, arguments), X = this.__zoom, J = T == null ? m(L) : typeof T == "function" ? T.apply(this, arguments) : T, it = X.invert(J), ot = typeof z == "function" ? z.apply(this, arguments) : z;
      return n(N(S(X, ot), J, it), L, o);
    }, T, O);
  }, d.translateBy = function(E, z, T, O) {
    d.transform(E, function() {
      return n(this.__zoom.translate(
        typeof z == "function" ? z.apply(this, arguments) : z,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), e.apply(this, arguments), o);
    }, null, O);
  }, d.translateTo = function(E, z, T, O, L) {
    d.transform(E, function() {
      var X = e.apply(this, arguments), J = this.__zoom, it = O == null ? m(X) : typeof O == "function" ? O.apply(this, arguments) : O;
      return n(Hu.translate(it[0], it[1]).scale(J.k).translate(
        typeof z == "function" ? -z.apply(this, arguments) : -z,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), X, o);
    }, O, L);
  };
  function S(E, z) {
    return z = Math.max(s[0], Math.min(s[1], z)), z === E.k ? E : new Be(z, E.x, E.y);
  }
  function N(E, z, T) {
    var O = z[0] - T[0] * E.k, L = z[1] - T[1] * E.k;
    return O === E.x && L === E.y ? E : new Be(E.k, O, L);
  }
  function m(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function P(E, z, T, O) {
    E.on("start.zoom", function() {
      $(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      $(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var L = this, X = arguments, J = $(L, X).event(O), it = e.apply(L, X), ot = T == null ? m(it) : typeof T == "function" ? T.apply(L, X) : T, Et = Math.max(it[1][0] - it[0][0], it[1][1] - it[0][1]), mt = L.__zoom, wt = typeof z == "function" ? z.apply(L, X) : z, St = u(mt.invert(ot).concat(Et / mt.k), wt.invert(ot).concat(Et / wt.k));
      return function(vt) {
        if (vt === 1) vt = wt;
        else {
          var Pt = St(vt), Lt = Et / Pt[2];
          vt = new Be(Lt, ot[0] - Pt[0] * Lt, ot[1] - Pt[1] * Lt);
        }
        J.zoom(null, vt);
      };
    });
  }
  function $(E, z, T) {
    return !T && E.__zooming || new B(E, z);
  }
  function B(E, z) {
    this.that = E, this.args = z, this.active = 0, this.sourceEvent = null, this.extent = e.apply(E, z), this.taps = 0;
  }
  B.prototype = {
    event: function(E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(E, z) {
      return this.mouse && E !== "mouse" && (this.mouse[1] = z.invert(this.mouse[0])), this.touch0 && E !== "touch" && (this.touch0[1] = z.invert(this.touch0[0])), this.touch1 && E !== "touch" && (this.touch1[1] = z.invert(this.touch1[0])), this.that.__zoom = z, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(E) {
      var z = Tt(this.that).datum();
      c.call(
        E,
        this.that,
        new l0(E, {
          sourceEvent: this.sourceEvent,
          target: d,
          transform: this.that.__zoom,
          dispatch: c
        }),
        z
      );
    }
  };
  function q(E, ...z) {
    if (!t.apply(this, arguments)) return;
    var T = $(this, z).event(E), O = this.__zoom, L = Math.max(s[0], Math.min(s[1], O.k * Math.pow(2, r.apply(this, arguments)))), X = ee(E);
    if (T.wheel)
      (T.mouse[0][0] !== X[0] || T.mouse[0][1] !== X[1]) && (T.mouse[1] = O.invert(T.mouse[0] = X)), clearTimeout(T.wheel);
    else {
      if (O.k === L) return;
      T.mouse = [X, O.invert(X)], zr(this), T.start();
    }
    Vn(E), T.wheel = setTimeout(J, w), T.zoom("mouse", n(N(S(O, L), T.mouse[0], T.mouse[1]), T.extent, o));
    function J() {
      T.wheel = null, T.end();
    }
  }
  function Z(E, ...z) {
    if (h || !t.apply(this, arguments)) return;
    var T = E.currentTarget, O = $(this, z, !0).event(E), L = Tt(E.view).on("mousemove.zoom", ot, !0).on("mouseup.zoom", Et, !0), X = ee(E, T), J = E.clientX, it = E.clientY;
    Mu(E.view), Vi(E), O.mouse = [X, this.__zoom.invert(X)], zr(this), O.start();
    function ot(mt) {
      if (Vn(mt), !O.moved) {
        var wt = mt.clientX - J, St = mt.clientY - it;
        O.moved = wt * wt + St * St > v;
      }
      O.event(mt).zoom("mouse", n(N(O.that.__zoom, O.mouse[0] = ee(mt, T), O.mouse[1]), O.extent, o));
    }
    function Et(mt) {
      L.on("mousemove.zoom mouseup.zoom", null), ku(mt.view, O.moved), Vn(mt), O.event(mt).end();
    }
  }
  function j(E, ...z) {
    if (t.apply(this, arguments)) {
      var T = this.__zoom, O = ee(E.changedTouches ? E.changedTouches[0] : E, this), L = T.invert(O), X = T.k * (E.shiftKey ? 0.5 : 2), J = n(N(S(T, X), O, L), e.apply(this, z), o);
      Vn(E), l > 0 ? Tt(this).transition().duration(l).call(P, J, O, E) : Tt(this).call(d.transform, J, O, E);
    }
  }
  function Q(E, ...z) {
    if (t.apply(this, arguments)) {
      var T = E.touches, O = T.length, L = $(this, z, E.changedTouches.length === O).event(E), X, J, it, ot;
      for (Vi(E), J = 0; J < O; ++J)
        it = T[J], ot = ee(it, this), ot = [ot, this.__zoom.invert(ot), it.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== ot[2] && (L.touch1 = ot, L.taps = 0) : (L.touch0 = ot, X = !0, L.taps = 1 + !!a);
      a && (a = clearTimeout(a)), X && (L.taps < 2 && (f = ot[0], a = setTimeout(function() {
        a = null;
      }, p)), zr(this), L.start());
    }
  }
  function ut(E, ...z) {
    if (this.__zooming) {
      var T = $(this, z).event(E), O = E.changedTouches, L = O.length, X, J, it, ot;
      for (Vn(E), X = 0; X < L; ++X)
        J = O[X], it = ee(J, this), T.touch0 && T.touch0[2] === J.identifier ? T.touch0[0] = it : T.touch1 && T.touch1[2] === J.identifier && (T.touch1[0] = it);
      if (J = T.that.__zoom, T.touch1) {
        var Et = T.touch0[0], mt = T.touch0[1], wt = T.touch1[0], St = T.touch1[1], vt = (vt = wt[0] - Et[0]) * vt + (vt = wt[1] - Et[1]) * vt, Pt = (Pt = St[0] - mt[0]) * Pt + (Pt = St[1] - mt[1]) * Pt;
        J = S(J, Math.sqrt(vt / Pt)), it = [(Et[0] + wt[0]) / 2, (Et[1] + wt[1]) / 2], ot = [(mt[0] + St[0]) / 2, (mt[1] + St[1]) / 2];
      } else if (T.touch0) it = T.touch0[0], ot = T.touch0[1];
      else return;
      T.zoom("touch", n(N(J, it, ot), T.extent, o));
    }
  }
  function U(E, ...z) {
    if (this.__zooming) {
      var T = $(this, z).event(E), O = E.changedTouches, L = O.length, X, J;
      for (Vi(E), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), X = 0; X < L; ++X)
        J = O[X], T.touch0 && T.touch0[2] === J.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === J.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (J = ee(J, this), Math.hypot(f[0] - J[0], f[1] - J[1]) < y)) {
        var it = Tt(this).on("dblclick.zoom");
        it && it.apply(this, arguments);
      }
    }
  }
  return d.wheelDelta = function(E) {
    return arguments.length ? (r = typeof E == "function" ? E : Cr(+E), d) : r;
  }, d.filter = function(E) {
    return arguments.length ? (t = typeof E == "function" ? E : Cr(!!E), d) : t;
  }, d.touchable = function(E) {
    return arguments.length ? (i = typeof E == "function" ? E : Cr(!!E), d) : i;
  }, d.extent = function(E) {
    return arguments.length ? (e = typeof E == "function" ? E : Cr([[+E[0][0], +E[0][1]], [+E[1][0], +E[1][1]]]), d) : e;
  }, d.scaleExtent = function(E) {
    return arguments.length ? (s[0] = +E[0], s[1] = +E[1], d) : [s[0], s[1]];
  }, d.translateExtent = function(E) {
    return arguments.length ? (o[0][0] = +E[0][0], o[1][0] = +E[1][0], o[0][1] = +E[0][1], o[1][1] = +E[1][1], d) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, d.constrain = function(E) {
    return arguments.length ? (n = E, d) : n;
  }, d.duration = function(E) {
    return arguments.length ? (l = +E, d) : l;
  }, d.interpolate = function(E) {
    return arguments.length ? (u = E, d) : u;
  }, d.on = function() {
    var E = c.on.apply(c, arguments);
    return E === c ? d : E;
  }, d.clickDistance = function(E) {
    return arguments.length ? (v = (E = +E) * E, d) : Math.sqrt(v);
  }, d.tapDistance = function(E) {
    return arguments.length ? (y = +E, d) : y;
  }, d;
}
function p0(t, e) {
  let n = d0().filter((r) => r.button === 0 || r.touches?.length >= 2);
  return g0(n, t, e);
}
function g0(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
var nt = /* @__PURE__ */ ((t) => (t.CIRCLE = "circle", t.RECTANGLE = "rect", t))(nt || {});
class Rn {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The nodes x position
   * @param y - The nodes y position
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param shape - The shape of the node
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(e, n, r, i, s, o, l, u, c, a, f, h) {
    this.id = e, this.idImported = n, this.x = r, this.y = i, this.label = s, this.color = o, this.deletable = c, this.labelEditable = a, this.allowIncomingLinks = f, this.allowOutgoingLinks = h, this.shape = l, this.fixedPosition = u;
  }
  fx;
  fy;
  _fixedPosition;
  _shape;
  set shape(e) {
    this._shape === nt.CIRCLE || this._shape === nt.RECTANGLE ? this._shape = e : this._shape = void 0;
  }
  get shape() {
    return this._shape === nt.CIRCLE || this._shape === nt.RECTANGLE ? this._shape : void 0;
  }
  set fixedPosition(e) {
    this._fixedPosition = e, this.fx = this.fixedPosition?.x ? this.x : void 0, this.fy = this.fixedPosition?.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
}
function m0(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function w0(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function y0(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function _0(t, e, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Nr(t, e) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function un(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function v0(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function oe(t) {
  t.preventDefault(), t.stopPropagation();
}
function b0(t, e, n, r) {
  const i = r.nodeProps;
  return Ed().filter(
    (s, o) => s.button === 0 && //left mouse click
    (o.fixedPosition?.x !== !0 || o.fixedPosition?.y !== !0)
  ).on("start", (s, o) => {
    oe(s.sourceEvent), s.active === 0 && t.alphaTarget(0.5).restart(), o.fixedPosition?.x !== !0 && (o.fx = o.x), o.fixedPosition?.y !== !0 && (o.fy = o.y);
  }).on("drag", (s, o) => {
    o.fixedPosition?.x !== !0 && (r.isCanvasBoundToView ? i.shape === nt.CIRCLE ? o.fx = Math.max(i.radius, Math.min(e - i.radius, s.x)) : i.shape === nt.RECTANGLE && (o.fx = Math.max(0, Math.min(e - i.width, s.x))) : o.fx = s.x), o.fixedPosition?.y !== !0 && (r.isCanvasBoundToView ? i.shape === nt.CIRCLE ? o.fy = Math.max(i.radius, Math.min(n - i.radius, s.y)) : i.shape === nt.RECTANGLE && (o.fy = Math.max(0, Math.min(n - i.height, s.y))) : o.fy = s.y);
  }).on("end", (s, o) => {
    s.active === 0 && t.alphaTarget(0), o.fixedPosition?.x !== !0 && (o.fx = void 0), o.fixedPosition?.y !== !0 && (o.fy = void 0);
  });
}
function x0(t, e, n, r, i) {
  return t.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => oe(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
}
var ue = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(ue || {});
class E0 {
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
  constructor(e, n, r, i, s, o, l) {
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
  id;
}
function S0(t) {
  return t.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function P0(t) {
  return t.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function qe(t) {
  let e = [], n = [];
  if (!Array.isArray(t))
    typeof t == "number" ? e = [t] : n = [t];
  else {
    let r = t.map(String);
    n = r.filter((i) => i.includes("-")), e = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [e, n];
}
function Rr(t, e) {
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : vn(["x", "y"], Object.keys(e), !0) && (t.fixedPosition = e, qn(["x", "y"], Object.keys(e))));
}
function M0(t, e, n) {
  return `
        M 0,${n}
        A ${n},${n} 0 0 1 ${n},0
        H ${t - n}
        A ${n},${n} 0 0 1 ${t},${n}
        V ${e - n}
        A ${n},${n} 0 0 1 ${t - n},${e}
        H ${n}
        A ${n},${n} 0 0 1 0,${e - n}
        Z
    `;
}
function hr(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function Zo(t) {
  let e = t.target;
  e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
}
function k0(t, e, n = 2) {
  const r = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
  return r < n && i < n;
}
function qn(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, Je(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function vn(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, n && Je("Option missing", `Add: ${i}`)), r;
}
function Je(t, e) {
  console.error(t + `
` + e);
}
function T0(t, e, n, r) {
  if (Zn(t, n, e + "-link-arrow", "graph-controller__arrow", !1), Zn(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), Zn(
    t,
    n,
    e + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      fs(t, e, n, i);
}
function fs(t, e, n, r) {
  t.select(`#${e}-link-arrow-` + hr(r)).empty() && (Zn(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), Zn(
    t,
    n,
    e + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function zi(t, e, n) {
  t.select(`#${e}-link-arrow-` + hr(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + hr(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function Zn(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${o0()(e.arrowPoints)}`).style("fill", s || "");
}
function C0(t) {
  return t.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class tl {
  nodeIdCounter = 0;
  nodes = [];
  links = [];
  createNode(e, n, r, i, s, o, l = { x: !1, y: !1 }, u = !0, c = !0, a = !0, f = !0) {
    const h = new Rn(
      this.nodeIdCounter++,
      r,
      e,
      n,
      i,
      s,
      o,
      l,
      u,
      c,
      a,
      f
    );
    return this.nodes.push(h), h;
  }
  createLink(e, n, r, i, s = !0, o = !0) {
    if (this.links.find(
      (f) => f.source.id === e && f.target.id === n
    ) !== void 0)
      return;
    const u = this.nodes.find((f) => f.id === e);
    if (u === void 0)
      return;
    const c = this.nodes.find((f) => f.id === n);
    if (c === void 0)
      return;
    const a = new E0(
      u,
      c,
      void 0,
      r,
      i,
      s,
      o
    );
    return this.links.push(a), a;
  }
  removeNode(e) {
    const n = this.nodes.findIndex((i) => i.id === e.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const r = this.links.filter(
      (i) => i.source.id === e.id || i.target.id === e.id
    );
    return r.forEach((i) => {
      const s = this.links.indexOf(i, 0);
      this.links.splice(s, 1);
    }), [e, r];
  }
  removeLink(e) {
    const n = this.links.findIndex(
      (r) => r.source.id === e.source.id && r.target.id === e.target.id
    );
    if (n !== -1)
      return this.links.splice(n, 1), e;
  }
  /**
   * Checks if a link in a given (not default) color exists.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(e, n = "") {
    return this.links.some((r) => r.color === e && r.id !== n);
  }
  /**
   * Get the existing non-default colors of links.
   * @returns An array of strings representing non-default colors, empty if none exist.
   */
  getNonDefaultLinkColors() {
    return this.links.map((e) => e.color).filter((e) => e !== void 0 && e !== "");
  }
  /**
   * Get the link ids of links with provided color.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude a link from this check via its ID
   * @returns An array of link IDs that have the provided color (without the excludedLinkId)
   */
  getLinkIdsWithNonDefaultLinkColors(e, n = "") {
    return this.links.filter((r) => r.color === e && r.id !== n).map((r) => r.id);
  }
  /**
   * Determine if a source and a target node have a bidirectional link connection.
   * @param source
   * @param target
   */
  hasBidirectionalConnection(e, n) {
    return e.id !== n.id && this.links.some((r) => r.target.id === e.id && r.source.id === n.id) && this.links.some((r) => r.target.id === n.id && r.source.id === e.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(e = !0, n = !0, r = !1, i = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let s, o;
    return s = this.nodes.map((l) => {
      let u = `${l.id}`;
      return e && l.label !== void 0 && (u += ` ${l.label}`), r && l.color !== void 0 && (u += ` /COLOR:/${l.color}`), u;
    }).join(`
`), o = this.links.map((l) => {
      let u = `${l.source.id} ${l.target.id}`;
      return n && l.label !== void 0 && (u += ` ${l.label}`), i && l.color !== void 0 && (u += ` /COLOR:/${l.color}`), u;
    }).join(`
`), `${s}${o ? `
#
` : ""}${o}`;
  }
  /** Formats the graph in a json like graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodePosition if position should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(e = !0, n = !0, r = !0, i = !0, s = !0, o = !0, l = !0) {
    let u = this.nodes.map((a) => Object.fromEntries(
      Object.entries(a).filter(([f]) => f === "id" || e && f === "label" || r && f === "color" || s && (f === "x" || f === "y") || o && [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ].includes(f))
    )), c = this.links.map((a) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(a)).filter(([f]) => f === "sourceId" || f === "targetId" || n && f === "label" || i && f === "color" || l && ["deletable", "labelEditable"].includes(f))
    ));
    return JSON.stringify({ nodes: u, links: c }, null, 4);
  }
  _convertToJSONLink(e) {
    let n = e.id.split("-");
    return {
      sourceId: Number(n[0]),
      targetId: Number(n[1]),
      label: e.label,
      color: e.color,
      deletable: e.deletable,
      labelEditable: e.labelEditable
    };
  }
}
function N0(t) {
  var e = +this._x.call(null, t), n = +this._y.call(null, t);
  return qu(this.cover(e, n), e, n, t);
}
function qu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, p, w, v, y, d, S;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((v = e >= (f = (l + c) / 2)) ? l = f : c = f, (y = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[d = y << 1 | v])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), w = +t._y.call(null, s.data), e === p && n === w) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (v = e >= (f = (l + c) / 2)) ? l = f : c = f, (y = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((d = y << 1 | v) === (S = (w >= h) << 1 | p >= f));
  return i[S] = s, i[d] = o, t;
}
function R0(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  for (a < u && (u = this._x0, a = this._x1), f < c && (c = this._y0, f = this._y1), this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    qu(this, o[n], l[n], t[n]);
  return this;
}
function L0(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else if (n > t || t > i || r > e || e > s) {
    var o = i - n, l = this._root, u, c;
    switch (c = (e < (r + s) / 2) << 1 | t < (n + i) / 2) {
      case 0: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, i = n + o, s = r + o, t > i || e > s);
        break;
      }
      case 1: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, n = i - o, s = r + o, n > t || e > s);
        break;
      }
      case 2: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, i = n + o, r = s - o, t > i || r > e);
        break;
      }
      case 3: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, n = i - o, r = s - o, n > t || r > e);
        break;
      }
    }
    this._root && this._root.length && (this._root = l);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function I0() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function O0(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Kt(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function $0(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, w, v;
  for (p && h.push(new Kt(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); w = h.pop(); )
    if (!(!(p = w.node) || (o = w.x0) > a || (l = w.y0) > f || (u = w.x1) < i || (c = w.y1) < s))
      if (p.length) {
        var y = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new Kt(p[3], y, d, u, c),
          new Kt(p[2], o, d, y, c),
          new Kt(p[1], y, l, u, d),
          new Kt(p[0], o, l, y, d)
        ), (v = (e >= d) << 1 | t >= y) && (w = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - v], h[h.length - 1 - v] = w);
      } else {
        var S = t - +this._x.call(null, p.data), N = e - +this._y.call(null, p.data), m = S * S + N * N;
        if (m < n) {
          var P = Math.sqrt(n = m);
          i = t - P, s = e - P, a = t + P, f = e + P, r = p.data;
        }
      }
  return r;
}
function A0(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, p, w, v, y, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((w = a >= (h = (o + u) / 2)) ? o = h : u = h, (v = f >= (p = (l + c) / 2)) ? l = p : c = p, e = n, !(n = n[y = v << 1 | w])) return this;
    if (!n.length) break;
    (e[y + 1 & 3] || e[y + 2 & 3] || e[y + 3 & 3]) && (r = e, d = y);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[y] = s : delete e[y], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function F0(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function j0() {
  return this._root;
}
function B0() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function D0(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Kt(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Kt(i, c, a, l, u)), (i = r[2]) && e.push(new Kt(i, s, a, c, u)), (i = r[1]) && e.push(new Kt(i, c, o, l, a)), (i = r[0]) && e.push(new Kt(i, s, o, c, a));
    }
  return this;
}
function V0(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Kt(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Kt(s, o, l, a, f)), (s = i[1]) && e.push(new Kt(s, a, l, u, f)), (s = i[2]) && e.push(new Kt(s, o, f, a, c)), (s = i[3]) && e.push(new Kt(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function z0(t) {
  return t[0];
}
function G0(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function H0(t) {
  return t[1];
}
function q0(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Uu(t, e, n) {
  var r = new qs(e ?? z0, n ?? H0, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function qs(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function el(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Jt = Uu.prototype = qs.prototype;
Jt.copy = function() {
  var t = new qs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = el(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = el(r));
  return t;
};
Jt.add = N0;
Jt.addAll = R0;
Jt.cover = L0;
Jt.data = I0;
Jt.extent = O0;
Jt.find = $0;
Jt.remove = A0;
Jt.removeAll = F0;
Jt.root = j0;
Jt.size = B0;
Jt.visit = D0;
Jt.visitAfter = V0;
Jt.x = G0;
Jt.y = q0;
function U0(t) {
  function e(f) {
    return f.x + f.vx;
  }
  function n(f) {
    return f.y + f.vy;
  }
  function r(f) {
    return function() {
      return f;
    };
  }
  var i, s, o = 1, l = 1;
  typeof t != "function" && (t = r(t === null ? [[0, 0][1]] : t));
  function u() {
    var f, h, p, w, v, y, d, S, N, m, P = [];
    i.forEach(function(j, Q) {
      P.push({ node: j, vx: j.vx, vy: j.vy, x: j.x + (s[Q][1][0] + s[Q][0][0]) / 2, y: j.y + (s[Q][0][1] + s[Q][1][1]) / 2 }), P.push({ node: j, vx: j.vx, vy: j.vy, x: j.x + s[Q][0][0], y: j.y + s[Q][0][1] }), P.push({ node: j, vx: j.vx, vy: j.vy, x: j.x + s[Q][0][0], y: j.y + s[Q][1][1] }), P.push({ node: j, vx: j.vx, vy: j.vy, x: j.x + s[Q][1][0], y: j.y + s[Q][0][1] }), P.push({ node: j, vx: j.vx, vy: j.vy, x: j.x + s[Q][1][0], y: j.y + s[Q][1][1] });
    });
    for (var $ = P.length, B = 0; B < l; ++B)
      for (h = Uu(P, e, n).visitAfter(c), f = 0; f < $; ++f) {
        var q = ~~(f / 5);
        p = i[q], y = s[q], w = p.x + p.vx, v = p.y + p.vy, d = w + y[0][0], S = v + y[0][1], N = w + y[1][0], m = v + y[1][1], h.visit(Z);
      }
    function Z(j, Q, ut, U, E) {
      var z = j.data;
      if (z) {
        var T = a(y, 0), O = a(y, 1);
        if (z.node.index !== q) {
          var L = z.node, X = s[L.index], J = L.x + L.vx + X[0][0], it = L.y + L.vy + X[0][1], ot = L.x + L.vx + X[1][0], Et = L.y + L.vy + X[1][1], mt = a(X, 0), wt = a(X, 1);
          if (d <= ot && J <= N && S <= Et && it <= m) {
            var St = [Math.min.apply(null, [J, ot, d, N]), Math.max.apply(null, [J, ot, d, N])], vt = [Math.min.apply(null, [it, Et, S, m]), Math.max.apply(null, [it, Et, S, m])], Pt = T + mt - (St[1] - St[0]), Lt = O + wt - (vt[1] - vt[0]), Dt = Pt * o * (Lt / O), Ee = Lt * o * (Pt / T), _ = Pt * o * (Lt / wt), x = Lt * o * (Pt / mt);
            (d + N) / 2 < (J + ot) / 2 ? (p.vx -= Dt, L.vx += _) : (p.vx += Dt, L.vx -= _), (S + m) / 2 < (it + Et) / 2 ? (p.vy -= Ee, L.vy += x) : (p.vy += Ee, L.vy -= x);
          }
        }
        return;
      }
      return Q > N || U < d || ut > m || E < S;
    }
  }
  function c(f) {
    if (f.data)
      return f.bb = s[f.data.node.index];
    f.bb = [[0, 0], [0, 0]];
    for (var h = 0; h < 4; ++h)
      f[h] && f[h].bb[0][0] < f.bb[0][0] && (f.bb[0][0] = f[h].bb[0][0]), f[h] && f[h].bb[0][1] < f.bb[0][1] && (f.bb[0][1] = f[h].bb[0][1]), f[h] && f[h].bb[1][0] > f.bb[1][0] && (f.bb[1][0] = f[h].bb[1][0]), f[h] && f[h].bb[1][1] > f.bb[1][1] && (f.bb[1][1] = f[h].bb[1][1]);
  }
  function a(f, h) {
    return f[1][h] - f[0][h];
  }
  return u.initialize = function(f) {
    var h, p = (i = f).length;
    for (s = new Array(p), h = 0; h < p; ++h) s[h] = t(i[h], h, i);
  }, u.iterations = function(f) {
    return arguments.length ? (l = +f, u) : l;
  }, u.strength = function(f) {
    return arguments.length ? (o = +f, u) : o;
  }, u.bbox = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : r(+f), u) : t;
  }, u;
}
function W0(t, e, n, r, i) {
  let s = zg(t.nodes).on("tick", () => i());
  return s = K0(s, e), e.isCanvasBoundToView && (s = X0(t, s, n, r, e)), s = Ku(s, t, e, e.fixedLinkDistanceEnabled), s = Wu(s, e.nodePhysicsEnabled, n, r), s;
}
function K0(t, e) {
  if (e.nodeProps.shape === nt.CIRCLE)
    return t.force(
      "collision",
      Lg().radius(e.nodeProps.radius)
    );
  if (e.nodeProps.shape === nt.RECTANGLE) {
    let n = U0([
      [-0.5 * e.nodeProps.width, -0.5 * e.nodeProps.height],
      [0.5 * e.nodeProps.width, 0.5 * e.nodeProps.height]
    ]);
    return t.force("collision", n);
  }
  return t;
}
function X0(t, e, n, r, i) {
  return e.force("bounds", () => {
    for (const s of t.nodes)
      i.nodeProps.shape === nt.CIRCLE ? (s.x = Math.max(
        i.nodeProps.radius,
        Math.min(n - i.nodeProps.radius, s.x)
      ), s.y = Math.max(
        i.nodeProps.radius,
        Math.min(r - i.nodeProps.radius, s.y)
      )) : i.nodeProps.shape === nt.RECTANGLE && (s.x = Math.max(0, Math.min(n - i.nodeProps.width, s.x)), s.y = Math.max(0, Math.min(r - i.nodeProps.height, s.y)));
  });
}
function Wu(t, e, n, r) {
  return e ? t.force("charge", Gg().strength(-500)).force("x", Hg(n / 2).strength(0.05)).force("y", qg(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Ku(t, e, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === nt.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === nt.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), t.force(
      "link",
      Og().links(e.links).id((s) => s.id).distance(i * 10)
    );
  } else
    return t.force("link", null);
}
const Y0 = Object.prototype.toString;
function si(t) {
  const e = Y0.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function J0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!si(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, s = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > t.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = t[r], l = r + 1; l < s; l++)
    t[l] > o && (o = t[l]);
  return o;
}
function Q0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!si(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, s = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > t.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = t[r], l = r + 1; l < s; l++)
    t[l] < o && (o = t[l]);
  return o;
}
function nl(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (si(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!si(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = Q0(t), i = J0(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = e.min, o = s === void 0 ? e.autoMinMax ? r : 0 : s, l = e.max, u = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (o >= u)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (u - o) / (i - r), a = 0; a < t.length; a++)
    n[a] = (t[a] - r) * c + o;
  return n;
}
const Lr = " ".repeat(2), Xu = " ".repeat(4);
function Z0() {
  return Yu(this);
}
function Yu(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${Lr}[
${Xu}${tm(t, n, r, i)}
${Lr}]
${Lr}rows: ${t.rows}
${Lr}columns: ${t.columns}
}`;
}
function tm(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), u = [];
  for (let c = 0; c < o; c++) {
    let a = [];
    for (let f = 0; f < l; f++)
      a.push(em(t.get(c, f), r));
    u.push(`${a.join(" ")}`);
  }
  return l !== s && (u[u.length - 1] += ` ... ${s - n} more columns`), o !== i && u.push(`... ${i - e} more rows`), u.join(`
${Xu}`);
}
function em(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function nm(t, e) {
  t.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, t.prototype.addS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r);
    return this;
  }, t.prototype.addM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r.get(i, s));
    return this;
  }, t.add = function(r, i) {
    return new e(r).add(i);
  }, t.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, t.prototype.subS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r);
    return this;
  }, t.prototype.subM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r.get(i, s));
    return this;
  }, t.sub = function(r, i) {
    return new e(r).sub(i);
  }, t.prototype.subtract = t.prototype.sub, t.prototype.subtractS = t.prototype.subS, t.prototype.subtractM = t.prototype.subM, t.subtract = t.sub, t.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, t.prototype.mulS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r);
    return this;
  }, t.prototype.mulM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r.get(i, s));
    return this;
  }, t.mul = function(r, i) {
    return new e(r).mul(i);
  }, t.prototype.multiply = t.prototype.mul, t.prototype.multiplyS = t.prototype.mulS, t.prototype.multiplyM = t.prototype.mulM, t.multiply = t.mul, t.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, t.prototype.divS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r);
    return this;
  }, t.prototype.divM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r.get(i, s));
    return this;
  }, t.div = function(r, i) {
    return new e(r).div(i);
  }, t.prototype.divide = t.prototype.div, t.prototype.divideS = t.prototype.divS, t.prototype.divideM = t.prototype.divM, t.divide = t.div, t.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, t.prototype.modS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r);
    return this;
  }, t.prototype.modM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r.get(i, s));
    return this;
  }, t.mod = function(r, i) {
    return new e(r).mod(i);
  }, t.prototype.modulus = t.prototype.mod, t.prototype.modulusS = t.prototype.modS, t.prototype.modulusM = t.prototype.modM, t.modulus = t.mod, t.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, t.prototype.andS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r);
    return this;
  }, t.prototype.andM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r.get(i, s));
    return this;
  }, t.and = function(r, i) {
    return new e(r).and(i);
  }, t.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, t.prototype.orS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r);
    return this;
  }, t.prototype.orM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r.get(i, s));
    return this;
  }, t.or = function(r, i) {
    return new e(r).or(i);
  }, t.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, t.prototype.xorS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r);
    return this;
  }, t.prototype.xorM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r.get(i, s));
    return this;
  }, t.xor = function(r, i) {
    return new e(r).xor(i);
  }, t.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, t.prototype.leftShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r);
    return this;
  }, t.prototype.leftShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r.get(i, s));
    return this;
  }, t.leftShift = function(r, i) {
    return new e(r).leftShift(i);
  }, t.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, t.prototype.signPropagatingRightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r);
    return this;
  }, t.prototype.signPropagatingRightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r.get(i, s));
    return this;
  }, t.signPropagatingRightShift = function(r, i) {
    return new e(r).signPropagatingRightShift(i);
  }, t.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, t.prototype.rightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r);
    return this;
  }, t.prototype.rightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r.get(i, s));
    return this;
  }, t.rightShift = function(r, i) {
    return new e(r).rightShift(i);
  }, t.prototype.zeroFillRightShift = t.prototype.rightShift, t.prototype.zeroFillRightShiftS = t.prototype.rightShiftS, t.prototype.zeroFillRightShiftM = t.prototype.rightShiftM, t.zeroFillRightShift = t.rightShift, t.prototype.not = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, ~this.get(r, i));
    return this;
  }, t.not = function(r) {
    return new e(r).not();
  }, t.prototype.abs = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.abs(this.get(r, i)));
    return this;
  }, t.abs = function(r) {
    return new e(r).abs();
  }, t.prototype.acos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acos(this.get(r, i)));
    return this;
  }, t.acos = function(r) {
    return new e(r).acos();
  }, t.prototype.acosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acosh(this.get(r, i)));
    return this;
  }, t.acosh = function(r) {
    return new e(r).acosh();
  }, t.prototype.asin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asin(this.get(r, i)));
    return this;
  }, t.asin = function(r) {
    return new e(r).asin();
  }, t.prototype.asinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asinh(this.get(r, i)));
    return this;
  }, t.asinh = function(r) {
    return new e(r).asinh();
  }, t.prototype.atan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atan(this.get(r, i)));
    return this;
  }, t.atan = function(r) {
    return new e(r).atan();
  }, t.prototype.atanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atanh(this.get(r, i)));
    return this;
  }, t.atanh = function(r) {
    return new e(r).atanh();
  }, t.prototype.cbrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cbrt(this.get(r, i)));
    return this;
  }, t.cbrt = function(r) {
    return new e(r).cbrt();
  }, t.prototype.ceil = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.ceil(this.get(r, i)));
    return this;
  }, t.ceil = function(r) {
    return new e(r).ceil();
  }, t.prototype.clz32 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.clz32(this.get(r, i)));
    return this;
  }, t.clz32 = function(r) {
    return new e(r).clz32();
  }, t.prototype.cos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cos(this.get(r, i)));
    return this;
  }, t.cos = function(r) {
    return new e(r).cos();
  }, t.prototype.cosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cosh(this.get(r, i)));
    return this;
  }, t.cosh = function(r) {
    return new e(r).cosh();
  }, t.prototype.exp = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.exp(this.get(r, i)));
    return this;
  }, t.exp = function(r) {
    return new e(r).exp();
  }, t.prototype.expm1 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.expm1(this.get(r, i)));
    return this;
  }, t.expm1 = function(r) {
    return new e(r).expm1();
  }, t.prototype.floor = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.floor(this.get(r, i)));
    return this;
  }, t.floor = function(r) {
    return new e(r).floor();
  }, t.prototype.fround = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.fround(this.get(r, i)));
    return this;
  }, t.fround = function(r) {
    return new e(r).fround();
  }, t.prototype.log = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log(this.get(r, i)));
    return this;
  }, t.log = function(r) {
    return new e(r).log();
  }, t.prototype.log1p = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log1p(this.get(r, i)));
    return this;
  }, t.log1p = function(r) {
    return new e(r).log1p();
  }, t.prototype.log10 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log10(this.get(r, i)));
    return this;
  }, t.log10 = function(r) {
    return new e(r).log10();
  }, t.prototype.log2 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log2(this.get(r, i)));
    return this;
  }, t.log2 = function(r) {
    return new e(r).log2();
  }, t.prototype.round = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.round(this.get(r, i)));
    return this;
  }, t.round = function(r) {
    return new e(r).round();
  }, t.prototype.sign = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sign(this.get(r, i)));
    return this;
  }, t.sign = function(r) {
    return new e(r).sign();
  }, t.prototype.sin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sin(this.get(r, i)));
    return this;
  }, t.sin = function(r) {
    return new e(r).sin();
  }, t.prototype.sinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sinh(this.get(r, i)));
    return this;
  }, t.sinh = function(r) {
    return new e(r).sinh();
  }, t.prototype.sqrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sqrt(this.get(r, i)));
    return this;
  }, t.sqrt = function(r) {
    return new e(r).sqrt();
  }, t.prototype.tan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tan(this.get(r, i)));
    return this;
  }, t.tan = function(r) {
    return new e(r).tan();
  }, t.prototype.tanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tanh(this.get(r, i)));
    return this;
  }, t.tanh = function(r) {
    return new e(r).tanh();
  }, t.prototype.trunc = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.trunc(this.get(r, i)));
    return this;
  }, t.trunc = function(r) {
    return new e(r).trunc();
  }, t.pow = function(r, i) {
    return new e(r).pow(i);
  }, t.prototype.pow = function(r) {
    return typeof r == "number" ? this.powS(r) : this.powM(r);
  }, t.prototype.powS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r));
    return this;
  }, t.prototype.powM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r.get(i, s)));
    return this;
  };
}
function we(t, e, n) {
  let r = n ? t.rows : t.rows - 1;
  if (e < 0 || e > r)
    throw new RangeError("Row index out of range");
}
function ye(t, e, n) {
  let r = n ? t.columns : t.columns - 1;
  if (e < 0 || e > r)
    throw new RangeError("Column index out of range");
}
function bn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function xn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function rm(t, e, n) {
  return {
    row: im(t, e),
    column: sm(t, n)
  };
}
function im(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function sm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function rl(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Ir("startRow", e), Ir("endRow", n), Ir("startColumn", r), Ir("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Ei(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function Ir(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function yn(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function om(t) {
  let e = Ei(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function lm(t) {
  let e = Ei(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function um(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function am(t) {
  let e = Ei(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function cm(t) {
  let e = Ei(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function fm(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function hm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < i; a++)
      c = t.get(o, a) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / i) / (i - 1)) : s.push((u - l * l / i) / i);
  }
  return s;
}
function dm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < r; a++)
      c = t.get(a, o) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / r) / (r - 1)) : s.push((u - l * l / r) / r);
  }
  return s;
}
function pm(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, u = 0;
  for (let c = 0; c < r; c++)
    for (let a = 0; a < i; a++)
      u = t.get(c, a) - n, o += u, l += u * u;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function gm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function mm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function wm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function ym(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function _m(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function vm(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function bm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function xm(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function Em(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class ft {
  static from1DArray(e, n, r) {
    if (e * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let s = new rt(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, r[o * n + l]);
    return s;
  }
  static rowVector(e) {
    let n = new rt(1, e.length);
    for (let r = 0; r < e.length; r++)
      n.set(0, r, e[r]);
    return n;
  }
  static columnVector(e) {
    let n = new rt(e.length, 1);
    for (let r = 0; r < e.length; r++)
      n.set(r, 0, e[r]);
    return n;
  }
  static zeros(e, n) {
    return new rt(e, n);
  }
  static ones(e, n) {
    return new rt(e, n).fill(1);
  }
  static rand(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let s = new rt(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, i());
    return s;
  }
  static randInt(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: i = 0, max: s = 1e3, random: o = Math.random } = r;
    if (!Number.isInteger(i)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(s)) throw new TypeError("max must be an integer");
    if (i >= s) throw new RangeError("min must be smaller than max");
    let l = s - i, u = new rt(e, n);
    for (let c = 0; c < e; c++)
      for (let a = 0; a < n; a++) {
        let f = i + Math.round(o() * l);
        u.set(c, a, f);
      }
    return u;
  }
  static eye(e, n, r) {
    n === void 0 && (n = e), r === void 0 && (r = 1);
    let i = Math.min(e, n), s = this.zeros(e, n);
    for (let o = 0; o < i; o++)
      s.set(o, o, r);
    return s;
  }
  static diag(e, n, r) {
    let i = e.length;
    n === void 0 && (n = i), r === void 0 && (r = n);
    let s = Math.min(i, n, r), o = this.zeros(n, r);
    for (let l = 0; l < s; l++)
      o.set(l, l, e[l]);
    return o;
  }
  static min(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, s = new rt(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.min(e.get(o, l), n.get(o, l)));
    return s;
  }
  static max(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, s = new this(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.max(e.get(o, l), n.get(o, l)));
    return s;
  }
  static checkMatrix(e) {
    return ft.isMatrix(e) ? e : new rt(e);
  }
  static isMatrix(e) {
    return e != null && e.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(e) {
    if (typeof e != "function")
      throw new TypeError("callback must be a function");
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.call(this, n, r);
    return this;
  }
  to1DArray() {
    let e = [];
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.push(this.get(n, r));
    return e;
  }
  to2DArray() {
    let e = [];
    for (let n = 0; n < this.rows; n++) {
      e.push([]);
      for (let r = 0; r < this.columns; r++)
        e[n].push(this.get(n, r));
    }
    return e;
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
      for (let e = 0; e < this.rows; e++)
        for (let n = 0; n <= e; n++)
          if (this.get(e, n) !== this.get(n, e))
            return !1;
      return !0;
    }
    return !1;
  }
  isEchelonForm() {
    let e = 0, n = 0, r = -1, i = !0, s = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      e++;
    }
    return i;
  }
  isReducedEchelonForm() {
    let e = 0, n = 0, r = -1, i = !0, s = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      for (let o = n + 1; o < this.rows; o++)
        this.get(e, o) !== 0 && (i = !1);
      e++;
    }
    return i;
  }
  echelonForm() {
    let e = this.clone(), n = 0, r = 0;
    for (; n < e.rows && r < e.columns; ) {
      let i = n;
      for (let s = n; s < e.rows; s++)
        e.get(s, r) > e.get(i, r) && (i = s);
      if (e.get(i, r) === 0)
        r++;
      else {
        e.swapRows(n, i);
        let s = e.get(n, r);
        for (let o = r; o < e.columns; o++)
          e.set(n, o, e.get(n, o) / s);
        for (let o = n + 1; o < e.rows; o++) {
          let l = e.get(o, r) / e.get(n, r);
          e.set(o, r, 0);
          for (let u = r + 1; u < e.columns; u++)
            e.set(o, u, e.get(o, u) - e.get(n, u) * l);
        }
        n++, r++;
      }
    }
    return e;
  }
  reducedEchelonForm() {
    let e = this.echelonForm(), n = e.columns, r = e.rows, i = r - 1;
    for (; i >= 0; )
      if (e.maxRow(i) === 0)
        i--;
      else {
        let s = 0, o = !1;
        for (; s < r && o === !1; )
          e.get(i, s) === 1 ? o = !0 : s++;
        for (let l = 0; l < i; l++) {
          let u = e.get(l, s);
          for (let c = s; c < n; c++) {
            let a = e.get(l, c) - u * e.get(i, c);
            e.set(l, c, a);
          }
        }
        i--;
      }
    return e;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { rows: n = 1, columns: r = 1 } = e;
    if (!Number.isInteger(n) || n <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(r) || r <= 0)
      throw new TypeError("columns must be a positive integer");
    let i = new rt(this.rows * n, this.columns * r);
    for (let s = 0; s < n; s++)
      for (let o = 0; o < r; o++)
        i.setSubMatrix(this, this.rows * s, this.columns * o);
    return i;
  }
  fill(e) {
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, e);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(e) {
    we(this, e);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(e, r));
    return n;
  }
  getRowVector(e) {
    return rt.rowVector(this.getRow(e));
  }
  setRow(e, n) {
    we(this, e), n = bn(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, n[r]);
    return this;
  }
  swapRows(e, n) {
    we(this, e), we(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(e, r);
      this.set(e, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(e) {
    ye(this, e);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, e));
    return n;
  }
  getColumnVector(e) {
    return rt.columnVector(this.getColumn(e));
  }
  setColumn(e, n) {
    ye(this, e), n = xn(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, n[r]);
    return this;
  }
  swapColumns(e, n) {
    ye(this, e), ye(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, e);
      this.set(r, e, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[n]);
    return this;
  }
  mulRow(e, n) {
    we(this, e);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, this.get(e, r) * n);
    return this;
  }
  mulColumn(e, n) {
    ye(this, e);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, this.get(r, e) * n);
    return this;
  }
  max() {
    if (this.isEmpty())
      return NaN;
    let e = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) > e && (e = this.get(n, r));
    return e;
  }
  maxIndex() {
    yn(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) > e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  min() {
    if (this.isEmpty())
      return NaN;
    let e = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) < e && (e = this.get(n, r));
    return e;
  }
  minIndex() {
    yn(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(e) {
    if (we(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) > n && (n = this.get(e, r));
    return n;
  }
  maxRowIndex(e) {
    we(this, e), yn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) > n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  minRow(e) {
    if (we(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) < n && (n = this.get(e, r));
    return n;
  }
  minRowIndex(e) {
    we(this, e), yn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) < n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  maxColumn(e) {
    if (ye(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) > n && (n = this.get(r, e));
    return n;
  }
  maxColumnIndex(e) {
    ye(this, e), yn(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) > n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  minColumn(e) {
    if (ye(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) < n && (n = this.get(r, e));
    return n;
  }
  minColumnIndex(e) {
    ye(this, e), yn(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) < n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  diag() {
    let e = Math.min(this.rows, this.columns), n = [];
    for (let r = 0; r < e; r++)
      n.push(this.get(r, r));
    return n;
  }
  norm(e = "frobenius") {
    let n = 0;
    if (e === "max")
      return this.max();
    if (e === "frobenius") {
      for (let r = 0; r < this.rows; r++)
        for (let i = 0; i < this.columns; i++)
          n = n + this.get(r, i) * this.get(r, i);
      return Math.sqrt(n);
    } else
      throw new RangeError(`unknown norm type: ${e}`);
  }
  cumulativeSum() {
    let e = 0;
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e += this.get(n, r), this.set(n, r, e);
    return this;
  }
  dot(e) {
    ft.isMatrix(e) && (e = e.to1DArray());
    let n = this.to1DArray();
    if (n.length !== e.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * e[i];
    return r;
  }
  mmul(e) {
    e = rt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.columns, s = new rt(n, i), o = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let u = 0; u < r; u++)
        o[u] = e.get(u, l);
      for (let u = 0; u < n; u++) {
        let c = 0;
        for (let a = 0; a < r; a++)
          c += this.get(u, a) * o[a];
        s.set(u, l, c);
      }
    }
    return s;
  }
  strassen2x2(e) {
    e = rt.checkMatrix(e);
    let n = new rt(2, 2);
    const r = this.get(0, 0), i = e.get(0, 0), s = this.get(0, 1), o = e.get(0, 1), l = this.get(1, 0), u = e.get(1, 0), c = this.get(1, 1), a = e.get(1, 1), f = (r + c) * (i + a), h = (l + c) * i, p = r * (o - a), w = c * (u - i), v = (r + s) * a, y = (l - r) * (i + o), d = (s - c) * (u + a), S = f + w - v + d, N = p + v, m = h + w, P = f - h + p + y;
    return n.set(0, 0, S), n.set(0, 1, N), n.set(1, 0, m), n.set(1, 1, P), n;
  }
  strassen3x3(e) {
    e = rt.checkMatrix(e);
    let n = new rt(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), u = this.get(1, 2), c = this.get(2, 0), a = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), p = e.get(0, 1), w = e.get(0, 2), v = e.get(1, 0), y = e.get(1, 1), d = e.get(1, 2), S = e.get(2, 0), N = e.get(2, 1), m = e.get(2, 2), P = (r + i + s - o - l - a - f) * y, $ = (r - o) * (-p + y), B = l * (-h + p + v - y - d - S + m), q = (-r + o + l) * (h - p + y), Z = (o + l) * (-h + p), j = r * h, Q = (-r + c + a) * (h - w + d), ut = (-r + c) * (w - d), U = (c + a) * (-h + w), E = (r + i + s - l - u - c - a) * d, z = a * (-h + w + v - y - d - S + N), T = (-s + a + f) * (y + S - N), O = (s - f) * (y - N), L = s * S, X = (a + f) * (-S + N), J = (-s + l + u) * (d + S - m), it = (s - u) * (d - m), ot = (l + u) * (-S + m), Et = i * v, mt = u * N, wt = o * w, St = c * p, vt = f * m, Pt = j + L + Et, Lt = P + q + Z + j + T + L + X, Dt = j + Q + U + E + L + J + ot, Ee = $ + B + q + j + L + J + it, _ = $ + q + Z + j + mt, x = L + J + it + ot + wt, C = j + Q + ut + z + T + O + L, F = T + O + L + X + St, I = j + Q + ut + U + vt;
    return n.set(0, 0, Pt), n.set(0, 1, Lt), n.set(0, 2, Dt), n.set(1, 0, Ee), n.set(1, 1, _), n.set(1, 2, x), n.set(2, 0, C), n.set(2, 1, F), n.set(2, 2, I), n;
  }
  mmulStrassen(e) {
    e = rt.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, s = e.rows, o = e.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, p) {
      let w = f.rows, v = f.columns;
      if (w === h && v === p)
        return f;
      {
        let y = ft.zeros(h, p);
        return y = y.setSubMatrix(f, 0, 0), y;
      }
    }
    let u = Math.max(r, s), c = Math.max(i, o);
    n = l(n, u, c), e = l(e, u, c);
    function a(f, h, p, w) {
      if (p <= 512 || w <= 512)
        return f.mmul(h);
      p % 2 === 1 && w % 2 === 1 ? (f = l(f, p + 1, w + 1), h = l(h, p + 1, w + 1)) : p % 2 === 1 ? (f = l(f, p + 1, w), h = l(h, p + 1, w)) : w % 2 === 1 && (f = l(f, p, w + 1), h = l(h, p, w + 1));
      let v = parseInt(f.rows / 2, 10), y = parseInt(f.columns / 2, 10), d = f.subMatrix(0, v - 1, 0, y - 1), S = h.subMatrix(0, v - 1, 0, y - 1), N = f.subMatrix(0, v - 1, y, f.columns - 1), m = h.subMatrix(0, v - 1, y, h.columns - 1), P = f.subMatrix(v, f.rows - 1, 0, y - 1), $ = h.subMatrix(v, h.rows - 1, 0, y - 1), B = f.subMatrix(v, f.rows - 1, y, f.columns - 1), q = h.subMatrix(v, h.rows - 1, y, h.columns - 1), Z = a(
        ft.add(d, B),
        ft.add(S, q),
        v,
        y
      ), j = a(ft.add(P, B), S, v, y), Q = a(d, ft.sub(m, q), v, y), ut = a(B, ft.sub($, S), v, y), U = a(ft.add(d, N), q, v, y), E = a(
        ft.sub(P, d),
        ft.add(S, m),
        v,
        y
      ), z = a(
        ft.sub(N, B),
        ft.add($, q),
        v,
        y
      ), T = ft.add(Z, ut);
      T.sub(U), T.add(z);
      let O = ft.add(Q, U), L = ft.add(j, ut), X = ft.sub(Z, j);
      X.add(Q), X.add(E);
      let J = ft.zeros(2 * T.rows, 2 * T.columns);
      return J = J.setSubMatrix(T, 0, 0), J = J.setSubMatrix(O, T.rows, 0), J = J.setSubMatrix(L, 0, T.columns), J = J.setSubMatrix(X, T.rows, T.columns), J.subMatrix(0, p - 1, 0, w - 1);
    }
    return a(n, e, u, c);
  }
  scaleRows(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new rt(this.rows, this.columns);
    for (let s = 0; s < this.rows; s++) {
      const o = this.getRow(s);
      o.length > 0 && nl(o, { min: n, max: r, output: o }), i.setRow(s, o);
    }
    return i;
  }
  scaleColumns(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new rt(this.rows, this.columns);
    for (let s = 0; s < this.columns; s++) {
      const o = this.getColumn(s);
      o.length && nl(o, {
        min: n,
        max: r,
        output: o
      }), i.setColumn(s, o);
    }
    return i;
  }
  flipRows() {
    const e = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(n, r), s = this.get(n, this.columns - 1 - r);
        this.set(n, r, s), this.set(n, this.columns - 1 - r, i);
      }
    return this;
  }
  flipColumns() {
    const e = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(r, n), s = this.get(this.rows - 1 - r, n);
        this.set(r, n, s), this.set(this.rows - 1 - r, n, i);
      }
    return this;
  }
  kroneckerProduct(e) {
    e = rt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.rows, s = e.columns, o = new rt(n * i, r * s);
    for (let l = 0; l < n; l++)
      for (let u = 0; u < r; u++)
        for (let c = 0; c < i; c++)
          for (let a = 0; a < s; a++)
            o.set(i * l + c, s * u + a, this.get(l, u) * e.get(c, a));
    return o;
  }
  kroneckerSum(e) {
    if (e = rt.checkMatrix(e), !this.isSquare() || !e.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = e.rows, i = this.kroneckerProduct(rt.eye(r, r)), s = rt.eye(n, n).kroneckerProduct(e);
    return i.add(s);
  }
  transpose() {
    let e = new rt(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(r, n, this.get(n, r));
    return e;
  }
  sortRows(e = il) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(e));
    return this;
  }
  sortColumns(e = il) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(e));
    return this;
  }
  subMatrix(e, n, r, i) {
    rl(this, e, n, r, i);
    let s = new rt(
      n - e + 1,
      i - r + 1
    );
    for (let o = e; o <= n; o++)
      for (let l = r; l <= i; l++)
        s.set(o - e, l - r, this.get(o, l));
    return s;
  }
  subMatrixRow(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let i = new rt(e.length, r - n + 1);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.rows)
          throw new RangeError(`Row index out of range: ${e[s]}`);
        i.set(s, o - n, this.get(e[s], o));
      }
    return i;
  }
  subMatrixColumn(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let i = new rt(r - n + 1, e.length);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${e[s]}`);
        i.set(o - n, s, this.get(o, e[s]));
      }
    return i;
  }
  setSubMatrix(e, n, r) {
    if (e = rt.checkMatrix(e), e.isEmpty())
      return this;
    let i = n + e.rows - 1, s = r + e.columns - 1;
    rl(this, n, i, r, s);
    for (let o = 0; o < e.rows; o++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + o, r + l, e.get(o, l));
    return this;
  }
  selection(e, n) {
    let r = rm(this, e, n), i = new rt(e.length, n.length);
    for (let s = 0; s < r.row.length; s++) {
      let o = r.row[s];
      for (let l = 0; l < r.column.length; l++) {
        let u = r.column[l];
        i.set(s, l, this.get(o, u));
      }
    }
    return i;
  }
  trace() {
    let e = Math.min(this.rows, this.columns), n = 0;
    for (let r = 0; r < e; r++)
      n += this.get(r, r);
    return n;
  }
  clone() {
    let e = new rt(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(n, r, this.get(n, r));
    return e;
  }
  sum(e) {
    switch (e) {
      case "row":
        return om(this);
      case "column":
        return lm(this);
      case void 0:
        return um(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return am(this);
      case "column":
        return cm(this);
      case void 0:
        return fm(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  mean(e) {
    const n = this.sum(e);
    switch (e) {
      case "row": {
        for (let r = 0; r < this.rows; r++)
          n[r] /= this.columns;
        return n;
      }
      case "column": {
        for (let r = 0; r < this.columns; r++)
          n[r] /= this.rows;
        return n;
      }
      case void 0:
        return n / this.size;
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  variance(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { unbiased: r = !0, mean: i = this.mean(e) } = n;
    if (typeof r != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (e) {
      case "row": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return hm(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return dm(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return pm(this, r, i);
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  standardDeviation(e, n) {
    typeof e == "object" && (n = e, e = void 0);
    const r = this.variance(e, n);
    if (e === void 0)
      return Math.sqrt(r);
    for (let i = 0; i < r.length; i++)
      r[i] = Math.sqrt(r[i]);
    return r;
  }
  center(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { center: r = this.mean(e) } = n;
    switch (e) {
      case "row": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return gm(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return mm(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return wm(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  scale(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    let r = n.scale;
    switch (e) {
      case "row": {
        if (r === void 0)
          r = ym(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return _m(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = vm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return bm(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = xm(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Em(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  toString(e) {
    return Yu(this, e);
  }
}
ft.prototype.klass = "Matrix";
typeof Symbol < "u" && (ft.prototype[Symbol.for("nodejs.util.inspect.custom")] = Z0);
function il(t, e) {
  return t - e;
}
ft.random = ft.rand;
ft.randomInt = ft.randInt;
ft.diagonal = ft.diag;
ft.prototype.diagonal = ft.prototype.diag;
ft.identity = ft.eye;
ft.prototype.negate = ft.prototype.neg;
ft.prototype.tensorProduct = ft.prototype.kroneckerProduct;
class rt extends ft {
  constructor(e, n) {
    if (super(), rt.isMatrix(e))
      return e.clone();
    if (Number.isInteger(e) && e >= 0)
      if (this.data = [], Number.isInteger(n) && n >= 0)
        for (let r = 0; r < e; r++)
          this.data.push(new Float64Array(n));
      else
        throw new TypeError("nColumns must be a positive integer");
    else if (Array.isArray(e)) {
      const r = e;
      if (e = r.length, n = e ? r[0].length : 0, typeof n != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let i = 0; i < e; i++) {
        if (r[i].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(r[i]));
      }
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
    this.rows = e, this.columns = n;
  }
  set(e, n, r) {
    return this.data[e][n] = r, this;
  }
  get(e, n) {
    return this.data[e][n];
  }
  removeRow(e) {
    return we(this, e), this.data.splice(e, 1), this.rows -= 1, this;
  }
  addRow(e, n) {
    return n === void 0 && (n = e, e = this.rows), we(this, e, !0), n = Float64Array.from(bn(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
  }
  removeColumn(e) {
    ye(this, e);
    for (let n = 0; n < this.rows; n++) {
      const r = new Float64Array(this.columns - 1);
      for (let i = 0; i < e; i++)
        r[i] = this.data[n][i];
      for (let i = e + 1; i < this.columns; i++)
        r[i - 1] = this.data[n][i];
      this.data[n] = r;
    }
    return this.columns -= 1, this;
  }
  addColumn(e, n) {
    typeof n > "u" && (n = e, e = this.columns), ye(this, e, !0), n = xn(this, n);
    for (let r = 0; r < this.rows; r++) {
      const i = new Float64Array(this.columns + 1);
      let s = 0;
      for (; s < e; s++)
        i[s] = this.data[r][s];
      for (i[s++] = n[r]; s < this.columns + 1; s++)
        i[s] = this.data[r][s - 1];
      this.data[r] = i;
    }
    return this.columns += 1, this;
  }
}
nm(ft, rt);
function Sm(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Gr = { exports: {} }, Pm = Gr.exports, sl;
function Mm() {
  return sl || (sl = 1, function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Pm, function() {
      function n(o) {
        o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (T, O, L, X) => O + X.replaceAll(".", " ."));
        var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), u = l.length, c, a, f, h, p, w = [], v = [], y, d, S = 0, N = 0, m = 0, P = 0, $ = 0, B = 0, q = 0, Z = 0, j = 0, Q = 0, ut = 0, U = 0, E = 0, z = "";
        for (c = 1; c < u; c++) {
          if (a = l[c], f = a.substring(0, 1), h = f.toLowerCase(), w = a.replace(f, "").trim().split(" ").filter(function(T) {
            return T !== "";
          }), v = w, w = w.map(parseFloat), y = w.length, h === "m") {
            if (z += "M ", f === "m" ? (m += w[0], P += w[1]) : (m = w[0], P = w[1]), S = m, N = P, z += m + " " + P + " ", y > 2)
              for (d = 0; d < y; d += 2)
                f === "m" ? (m += w[d], P += w[d + 1]) : (m = w[d], P = w[d + 1]), z += "L " + m + " " + P + " ";
          } else if (h === "l")
            for (d = 0; d < y; d += 2)
              f === "l" ? (m += w[d], P += w[d + 1]) : (m = w[d], P = w[d + 1]), z += "L " + m + " " + P + " ";
          else if (h === "h")
            for (d = 0; d < y; d++)
              f === "h" ? m += w[d] : m = w[d], z += "L " + m + " " + P + " ";
          else if (h === "v")
            for (d = 0; d < y; d++)
              f === "v" ? P += w[d] : P = w[d], z += "L " + m + " " + P + " ";
          else if (h === "q")
            for (d = 0; d < y; d += 4)
              f === "q" ? ($ = m + w[d], B = P + w[d + 1], m += w[d + 2], P += w[d + 3]) : ($ = w[d], B = w[d + 1], m = w[d + 2], P = w[d + 3]), z += "Q " + $ + " " + B + " " + m + " " + P + " ";
          else if (h === "t")
            for (d = 0; d < y; d += 2)
              ["t", "q"].indexOf(p) > -1 ? ($ = m + (m - $), B = P + (P - B)) : ($ = m, B = P), f === "t" ? (m += w[d], P += w[d + 1]) : (m = w[d], P = w[d + 1]), z += "Q " + $ + " " + B + " " + m + " " + P + " ", p = h;
          else if (h === "c")
            for (d = 0; d < y; d += 6)
              f === "c" ? ($ = m + w[d], B = P + w[d + 1], q = m + w[d + 2], Z = P + w[d + 3], m += w[d + 4], P += w[d + 5]) : ($ = w[d], B = w[d + 1], q = w[d + 2], Z = w[d + 3], m = w[d + 4], P = w[d + 5]), z += "C " + $ + " " + B + " " + q + " " + Z + " " + m + " " + P + " ";
          else if (h === "s")
            for (d = 0; d < y; d += 4)
              $ = m, B = P, ["s", "c"].indexOf(p) > -1 && ($ += m - q, B += P - Z), f === "s" ? (q = m + w[d], Z = P + w[d + 1], m += w[d + 2], P += w[d + 3]) : (q = w[d], Z = w[d + 1], m = w[d + 2], P = w[d + 3]), z += "C " + $ + " " + B + " " + q + " " + Z + " " + m + " " + P + " ";
          else if (h === "a")
            for (d = 0; d < y; d += 7) {
              j = w[d], Q = w[d + 1], ut = w[d + 2], U = v[d + 3];
              let T = !1;
              if (U.length > 1) {
                let O = parseInt(U[0]), L = parseInt(U[1]), X;
                U.length > 2 && (X = parseFloat(U.substring(2))), w[d + 3] = O, w.splice(d + 4, 0, L), v.splice(d + 4, 0, "+"), X !== void 0 && w.splice(d + 5, 0, X), T = !0;
              }
              U = w[d + 3], E = T ? w[d + 4] : v[d + 4], !T && E.length > 1 && (w[d + 4] = parseInt(E[0]), w.splice(d + 5, 0, parseFloat(E.substring(1)))), E = w[d + 4], f === "a" ? (m += w[d + 5], P += w[d + 6]) : (m = w[d + 5], P = w[d + 6]), z += "A " + j + " " + Q + " " + ut + " " + U + " " + E + " " + m + " " + P + " ";
            }
          else h === "z" && (z += "Z ", m = S, P = N);
          p = h;
        }
        return z.trim();
      }
      function r(o) {
        var l = o.trim().split(" "), u, c = l.length, a = c - 1, f, h = [], p, w, v, y, d, S = new RegExp("[QAZLCM]", ""), N = l.slice(-1)[0].toUpperCase() === "Z";
        for (f = 0; f < c; f++)
          if (u = l[f], S.test(u)) {
            if (u === "A") {
              h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(u), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
              continue;
            } else if (u === "C")
              y = 3, d = 2;
            else if (u === "Q")
              y = 2, d = 1;
            else if (u === "L")
              y = 1, d = 1;
            else if (u === "M")
              y = 1, d = 0;
            else
              continue;
            for (y === d && h.push(u), v = 0; v < y; v++)
              v === d && h.push(u), p = l[++f], w = l[++f], h.push(w), h.push(p);
          } else {
            var m = l.slice(Math.max(f - 3, 0), 3).join(" ");
            throw post = l.slice(f + 1, Math.min(f + 4, a)).join(" "), range = m + " [" + u + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
          }
        h.push("M");
        var P = "", $ = h.length - 1, B;
        for (B = $; B > 0; B--)
          P += h[B] + " ";
        return N && (P += "Z"), P = P.replace(/M M/g, "Z M"), P;
      }
      function i(u, l) {
        l = parseInt(l) == l ? l : !1;
        var u = n(u), c = u.replace(/M/g, "|M").split("|"), a;
        if (c.splice(0, 1), l !== !1 && l >= c.length)
          return u;
        if (l === !1)
          c = c.map(function(h) {
            return r(h.trim());
          });
        else {
          var f = c[l];
          f && (a = r(f.trim()), c[l] = a);
        }
        return c.reverse().join(" ").replace(/ +/g, " ").trim();
      }
      var s = {
        normalize: n,
        reverseNormalized: r,
        reverse: i
      };
      return s;
    });
  }(Gr)), Gr.exports;
}
var km = Mm();
const ol = /* @__PURE__ */ Sm(km);
var pt = /* @__PURE__ */ ((t) => (t.RIGHT = "RIGHT", t.BOTTOMRIGHT = "BOTTOMRIGHT", t.BOTTOM = "BOTTOM", t.BOTTOMLEFT = "BOTTOMLEFT", t.LEFT = "LEFT", t.TOPLEFT = "TOPLEFT", t.TOP = "TOP", t.TOPRIGHT = "TOPRIGHT", t))(pt || {});
function Tm(t, e, n, r) {
  switch (t.pathType) {
    case ue.REFLEXIVE:
      return Ju(t.source, [e / 2, n / 2], r);
    case ue.ARC:
      return hs(t.source, t.target, r);
    case ue.ARCREVERSE:
      return ol.reverse(hs(t.source, t.target, r));
    case ue.LINE:
      return tr(t.source, t.target, r);
    case ue.LINEREVERSE:
      return ol.reverse(tr(t.source, t.target, r));
    default:
      return "";
  }
}
function Cm(t, e, n) {
  return t.id === e.id ? ue.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? ll(t, e) ? ue.ARCREVERSE : ue.ARC : ll(t, e) ? ue.LINEREVERSE : ue.LINE;
}
function tr(t, e, n) {
  let r, i;
  if (n.nodeProps.shape === nt.CIRCLE) {
    const s = e.x - t.x, o = e.y - t.y;
    let l = Math.sqrt(s * s + o * o);
    l === 0 && (l = Number.EPSILON);
    const u = s / l, c = o / l;
    r = {
      x: t.x + (n.nodeProps.radius - 1) * u,
      y: t.y + (n.nodeProps.radius - 1) * c
    }, e instanceof Rn ? i = {
      x: e.x - (n.nodeProps.radius + n.markerPadding) * u,
      y: e.y - (n.nodeProps.radius + n.markerPadding) * c
    } : i = {
      x: e.x,
      y: e.y
    };
  } else if (n.nodeProps.shape === nt.RECTANGLE) {
    const s = t.x + n.nodeProps.width * 0.5, o = t.y + n.nodeProps.height * 0.5;
    let l, u;
    e instanceof Rn ? (l = e.x + n.nodeProps.width * 0.5, u = e.y + n.nodeProps.height * 0.5) : (l = e.x, u = e.y);
    const c = l - s, a = u - o;
    let f = Math.sqrt(c * c + a * a);
    f === 0 && (f = Number.EPSILON);
    const h = c / f, p = a / f;
    r = oi(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      h,
      p,
      2
    ), e instanceof Rn ? i = oi(
      l,
      u,
      n.nodeProps.width,
      n.nodeProps.height,
      -h,
      -p,
      -n.markerPadding + 1
    ) : i = { x: l, y: u };
  }
  return `M${r.x},${r.y}
          L${i.x},${i.y}`;
}
function hs(t, e, n) {
  if (n.nodeProps.shape === nt.CIRCLE) {
    const r = new rt([[t.x, t.y]]), i = new rt([[e.x, e.y]]), s = rt.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o), u = li(10), c = qt(l, -u).multiply(n.nodeProps.radius - 1).add(r), a = rt.multiply(l, -1), f = qt(a, u).multiply(n.nodeProps.radius).add(i).add(qt(a, u).multiply(2 * n.markerBoxSize)), h = 1.2 * o;
    return `M${c.get(0, 0)},${c.get(0, 1)}
          A${h},${h},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
  } else if (n.nodeProps.shape === nt.RECTANGLE) {
    const r = t.x + n.nodeProps.width * 0.5, i = t.y + n.nodeProps.height * 0.5, s = e.x + n.nodeProps.width * 0.5, o = e.y + n.nodeProps.height * 0.5, l = new rt([[r, i]]), u = new rt([[s, o]]), c = rt.subtract(u, l), a = c.norm("frobenius"), f = c.divide(a), h = li(30), p = oi(
      r,
      i,
      n.nodeProps.width,
      n.nodeProps.height,
      f.get(0, 0),
      f.get(0, 1),
      2
    ), w = qt(f, -h).add([[p.x, p.y]]), v = oi(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      -f.get(0, 0),
      -f.get(0, 1)
    ), y = rt.multiply(f, -1), d = qt(y, h).add([[v.x, v.y]]).add(qt(y, h).multiply(2 * n.markerBoxSize)), S = a;
    return `M${w.get(0, 0)},${w.get(0, 1)}
          A${S},${S},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
  } else
    return "";
}
function Ju(t, e, n) {
  const r = new rt([e]);
  if (n.nodeProps.shape === nt.CIRCLE) {
    const i = new rt([[t.x, t.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const s = rt.subtract(i, r), o = s.divide(s.norm("frobenius")), l = li(40), u = qt(o, l).multiply(n.nodeProps.radius - 1).add(i), c = qt(o, -l).multiply(n.nodeProps.radius).add(i).add(qt(o, -l).multiply(2 * n.markerBoxSize));
    return `M${u.get(0, 0)},${u.get(0, 1)}
              A${n.nodeProps.radius},${n.nodeProps.radius},0,1,0,${c.get(0, 0)},${c.get(0, 1)}`;
  } else return n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.reflexiveEdgeStart == "MOVABLE" ? Nm(t, n, r) : Rm(t, n) : "";
}
function ll(t, e) {
  return t.x > e.x;
}
function Nm(t, e, n) {
  if (e.nodeProps.shape === nt.RECTANGLE) {
    const r = t.x + e.nodeProps.width * 0.5, i = t.y + e.nodeProps.height * 0.5, s = new rt([[r, i]]);
    s.get(0, 0) === n.get(0, 0) && s.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const o = rt.subtract(s, n), l = o.divide(o.norm("frobenius")), u = li(45);
    let c, a, f = 0.5 * e.nodeProps.width, h = 0.5 * e.nodeProps.height;
    const p = Lm(
      o.get(0, 0),
      o.get(0, 1),
      30
    );
    if (p === pt.BOTTOMLEFT || p === pt.BOTTOMRIGHT || p === pt.TOPLEFT || p === pt.TOPRIGHT) {
      let w = Qu(p, t, e);
      c = w.start, a = w.end, e.nodeProps.width > e.nodeProps.height ? (p === pt.TOPLEFT || p === pt.BOTTOMRIGHT) && (f = 0.25 * e.nodeProps.width) : e.nodeProps.height > e.nodeProps.width && (p === pt.TOPRIGHT || p === pt.BOTTOMLEFT) && (h = 0.25 * e.nodeProps.height);
    } else p === pt.LEFT || p === pt.RIGHT ? (c = qt(l, u).multiply(0.5 * e.nodeProps.width - 1).add(s), a = qt(l, -u).multiply(0.5 * e.nodeProps.height - 1).add(s).add(qt(l, -u).multiply(2 * e.markerBoxSize))) : (c = qt(l, u).multiply(0.5 * e.nodeProps.height - 1).add(s), a = qt(l, -u).multiply(0.5 * e.nodeProps.width - 1).add(s).add(qt(l, -u).multiply(2 * e.markerBoxSize)));
    return `M${c.get(0, 0)},${c.get(0, 1)} A${f},${h}, 0, 1, 0, ${a.get(0, 0)},${a.get(0, 1)}`;
  } else
    return "";
}
function Rm(t, e) {
  if (e.nodeProps.shape === nt.RECTANGLE && e.nodeProps.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * e.nodeProps.width, s = 0.5 * e.nodeProps.height;
    e.nodeProps.width > e.nodeProps.height ? (e.nodeProps.reflexiveEdgeStart === pt.TOPLEFT || e.nodeProps.reflexiveEdgeStart === pt.BOTTOMRIGHT) && (i = e.nodeProps.width / e.nodeProps.height + e.nodeProps.height) : e.nodeProps.height > e.nodeProps.width && (e.nodeProps.reflexiveEdgeStart === pt.TOPRIGHT || e.nodeProps.reflexiveEdgeStart === pt.BOTTOMLEFT) && (s = e.nodeProps.height / e.nodeProps.width + e.nodeProps.width);
    let o = Qu(
      e.nodeProps.reflexiveEdgeStart,
      t,
      e
    );
    return n = o.start, r = o.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${s}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function oi(t, e, n, r, i, s, o = 0) {
  const l = t - 0.5 * n, u = t + 0.5 * n, c = e - 0.5 * r, a = e + 0.5 * r;
  i === 0 && (i = Number.EPSILON), s === 0 && (s = Number.EPSILON);
  const f = i < 0 ? l : u, h = s < 0 ? c : a, p = (f - t) / i, w = (h - e) / s, v = Math.min(p, w);
  let y = t + v * i, d = e + v * s;
  if (o !== 0)
    if (p < w) {
      let S;
      f === l ? S = 1 : S = -1, y = y + o * S;
    } else {
      let S;
      h === c ? S = 1 : S = -1, d = d + o * S;
    }
  return { x: y, y: d };
}
function Lm(t, e, n = 30) {
  let r = Im(Math.atan2(t, e));
  return r < 0 && (r += 360), an(r, 0, n) ? pt.BOTTOMLEFT : an(r, [0, 90], -n) ? pt.BOTTOM : an(r, 90, n) ? pt.BOTTOMRIGHT : an(r, [90, 180], -n) ? pt.RIGHT : an(r, 180, n) ? pt.TOPRIGHT : an(r, [180, 270], -n) ? pt.TOP : an(r, 270, n) ? pt.TOPLEFT : pt.LEFT;
}
function Qu(t, e, n) {
  const r = e.x, i = e.y, s = n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.width : n.nodeProps.radius, o = n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.height : n.nodeProps.radius, l = n.markerBoxSize, u = {
    [pt.BOTTOMLEFT]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [pt.BOTTOM]: {
      start: [r + 0.5 * s, i + o - 1],
      end: [r + s + 2 * l, i + 0.5 * o]
    },
    [pt.BOTTOMRIGHT]: {
      start: [r + s - 2, i + o - 1],
      end: [r + s + 2 * l, i + 2 * l]
    },
    [pt.RIGHT]: {
      start: [r + s - 1, i + 0.5 * o],
      end: [r + 0.5 * s, i - 2 * l]
    },
    [pt.TOPRIGHT]: {
      start: [r + s - 2, i + 1],
      end: [r + 2 * l, i - 2 * l]
    },
    [pt.TOP]: {
      start: [r + 0.5 * s, i + 1],
      end: [r - 2 * l, i + 0.5 * o]
    },
    [pt.TOPLEFT]: {
      start: [r + 2, i + 1],
      end: [r - 2 * l, i + o - 2 * l]
    },
    [pt.LEFT]: {
      start: [r + 1, i + 0.5 * o],
      end: [r + 0.5 * s, i + o + 2 * l]
    }
  }, { start: c, end: a } = u[t];
  return {
    start: new rt([c]),
    end: new rt([a])
  };
}
function an(t, e, n = 0) {
  t = (t + 360) % 360;
  let r, i;
  return typeof e == "number" ? (r = (e - n + 360) % 360, i = (e + n) % 360) : (r = (e[0] - n + 360) % 360, i = (e[1] + n) % 360), r < i ? t >= r && t <= i : t >= r || t <= i;
}
function li(t) {
  return t * (Math.PI / 180);
}
function Im(t) {
  return t * (180 / Math.PI);
}
function qt(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new rt([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
class Om {
  persistSettingsLocalStorage = !1;
  hasToolbar = !1;
  // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
  _nodeProps = {
    shape: nt.RECTANGLE,
    width: 128,
    height: 48,
    cornerRadius: 4,
    reflexiveEdgeStart: "MOVABLE"
  };
  showNodeLabels = !0;
  nodePhysicsEnabled = !1;
  isGraphEditableInGUI = !0;
  zoomEnabled = !0;
  showLinkLabels = !0;
  fixedLinkDistanceEnabled = !1;
  markerBoxSize = 4;
  _markerPadding = 2 * this.markerBoxSize;
  set nodeSize(e) {
    this.nodeProps.shape === nt.CIRCLE ? typeof e == "number" ? this.nodeProps.radius = e : this.nodeProps.radius = e.radius ?? 24 : this.nodeProps.shape === nt.RECTANGLE && (typeof e == "number" ? (this.nodeProps.width = e, this.nodeProps.height = e) : (this.nodeProps.width = e.width ?? 48, this.nodeProps.height = e.height ?? 48));
  }
  get nodeSize() {
    return this.nodeProps.shape === nt.CIRCLE ? { radius: this.nodeProps.radius } : { width: this.nodeProps.width, height: this.nodeProps.height };
  }
  set nodeProps(e) {
    this._nodeProps = e, e.shape === nt.CIRCLE ? this.nodeSize = e.radius : e.shape === nt.RECTANGLE && (this.nodeSize = { width: e.width, height: e.height });
  }
  get nodeProps() {
    return this._nodeProps;
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
function $m(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`), n = e.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? e.slice(0, n) : e, i = n !== -1 ? e.slice(n + 1) : [], s = [];
  if (r.length)
    for (const l of r) {
      let [, u, c, a] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((f) => f.trim());
      c?.includes("/COLOR:/") && (a = c, c = ""), u && s.push({
        idImported: u,
        label: c,
        color: a?.replace("/COLOR:/", "")
      });
    }
  const o = [];
  if (i.length)
    for (const l of i) {
      let [, u, c, a, f] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((h) => h.trim());
      a?.includes("/COLOR:/") && (f = a, a = ""), u && c && o.push({
        sourceIdImported: u,
        targetIdImported: c,
        label: a,
        color: f?.replace("/COLOR:/", "")
      });
    }
  return [s, o];
}
function Am(t) {
  const e = [];
  for (let r of t.nodes)
    e.push({
      idImported: r.id,
      x: r.x,
      y: r.y,
      label: r.label,
      color: r.color,
      fixedPosition: r.fixedPosition,
      deletable: r.deletable,
      labelEditable: r.labelEditable,
      allowIncomingLinks: r.allowIncomingLinks,
      allowOutgoingLinks: r.allowOutgoingLinks
    });
  const n = [];
  for (let r of t.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label,
      color: r.color,
      deletable: r.deletable,
      labelEditable: r.labelEditable
    });
  return [e, n];
}
const Fm = {
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
}, Zu = {
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
}, Nt = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, Gt = {
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
}, Ke = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class R {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(e, n) {
    const r = n.match(e);
    return r && r.length > 0 && r[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(e, n) {
    const r = n.match(e);
    return r && r.length > 1 && r[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(e, n, r) {
    if (e.test(n))
      return r;
  }
  static getWindowsVersionName(e) {
    switch (e) {
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
  static getMacOSVersionName(e) {
    const n = e.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
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
  static getAndroidVersionName(e) {
    const n = e.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
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
  static getVersionPrecision(e) {
    return e.split(".").length;
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
  static compareVersions(e, n, r = !1) {
    const i = R.getVersionPrecision(e), s = R.getVersionPrecision(n);
    let o = Math.max(i, s), l = 0;
    const u = R.map([e, n], (c) => {
      const a = o - R.getVersionPrecision(c), f = c + new Array(a + 1).join(".0");
      return R.map(f.split("."), (h) => new Array(20 - h.length).join("0") + h).reverse();
    });
    for (r && (l = o - Math.min(i, s)), o -= 1; o >= l; ) {
      if (u[0][o] > u[1][o])
        return 1;
      if (u[0][o] === u[1][o]) {
        if (o === l)
          return 0;
        o -= 1;
      } else if (u[0][o] < u[1][o])
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
  static map(e, n) {
    const r = [];
    let i;
    if (Array.prototype.map)
      return Array.prototype.map.call(e, n);
    for (i = 0; i < e.length; i += 1)
      r.push(n(e[i]));
    return r;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(e, n) {
    let r, i;
    if (Array.prototype.find)
      return Array.prototype.find.call(e, n);
    for (r = 0, i = e.length; r < i; r += 1) {
      const s = e[r];
      if (n(s, r))
        return s;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(e, ...n) {
    const r = e;
    let i, s;
    if (Object.assign)
      return Object.assign(e, ...n);
    for (i = 0, s = n.length; i < s; i += 1) {
      const o = n[i];
      typeof o == "object" && o !== null && Object.keys(o).forEach((u) => {
        r[u] = o[u];
      });
    }
    return e;
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
  static getBrowserAlias(e) {
    return Fm[e];
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(e) {
    return Zu[e] || "";
  }
}
const bt = /version\/(\d+(\.?_?\d+)+)/i, jm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = R.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = R.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = R.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = R.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = R.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = R.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = R.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = R.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = R.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/msie|trident/i],
    describe(t) {
      const e = {
        name: "Internet Explorer"
      }, n = R.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/\sedg\//i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = R.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = R.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/vivaldi/i],
    describe(t) {
      const e = {
        name: "Vivaldi"
      }, n = R.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/seamonkey/i],
    describe(t) {
      const e = {
        name: "SeaMonkey"
      }, n = R.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sailfish/i],
    describe(t) {
      const e = {
        name: "Sailfish"
      }, n = R.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/silk/i],
    describe(t) {
      const e = {
        name: "Amazon Silk"
      }, n = R.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/phantom/i],
    describe(t) {
      const e = {
        name: "PhantomJS"
      }, n = R.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/slimerjs/i],
    describe(t) {
      const e = {
        name: "SlimerJS"
      }, n = R.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = {
        name: "BlackBerry"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = R.getFirstMatch(bt, t) || R.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/bada/i],
    describe(t) {
      const e = {
        name: "Bada"
      }, n = R.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/tizen/i],
    describe(t) {
      const e = {
        name: "Tizen"
      }, n = R.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = R.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(t) {
      const e = {
        name: "Firefox"
      }, n = R.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/electron/i],
    describe(t) {
      const e = {
        name: "Electron"
      }, n = R.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(t) {
      const e = {
        name: "Miui"
      }, n = R.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chromium/i],
    describe(t) {
      const e = {
        name: "Chromium"
      }, n = R.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(t) {
      const e = {
        name: "Chrome"
      }, n = R.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/GSA/i],
    describe(t) {
      const e = {
        name: "Google Search"
      }, n = R.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Android Browser */
  {
    test(t) {
      const e = !t.test(/like android/i), n = t.test(/android/i);
      return e && n;
    },
    describe(t) {
      const e = {
        name: "Android Browser"
      }, n = R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = R.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(t) {
      const e = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = t.search("\\(") !== -1 ? n : e;
      return {
        name: R.getFirstMatch(i, t),
        version: R.getSecondMatch(i, t)
      };
    }
  }
], Bm = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(t) {
      const e = R.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
      return {
        name: Gt.Roku,
        version: e
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(t) {
      const e = R.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t);
      return {
        name: Gt.WindowsPhone,
        version: e
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(t) {
      const e = R.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t), n = R.getWindowsVersionName(e);
      return {
        name: Gt.Windows,
        version: e,
        versionName: n
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(t) {
      const e = {
        name: Gt.iOS
      }, n = R.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
      return n && (e.version = n), e;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(t) {
      const e = R.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."), n = R.getMacOSVersionName(e), r = {
        name: Gt.MacOS,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(t) {
      const e = R.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".");
      return {
        name: Gt.iOS,
        version: e
      };
    }
  },
  /* Android */
  {
    test(t) {
      const e = !t.test(/like android/i), n = t.test(/android/i);
      return e && n;
    },
    describe(t) {
      const e = R.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, t), n = R.getAndroidVersionName(e), r = {
        name: Gt.Android,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = R.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t), n = {
        name: Gt.WebOS
      };
      return e && e.length && (n.version = e), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = R.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || R.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || R.getFirstMatch(/\bbb(\d+)/i, t);
      return {
        name: Gt.BlackBerry,
        version: e
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(t) {
      const e = R.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
      return {
        name: Gt.Bada,
        version: e
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(t) {
      const e = R.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: Gt.Tizen,
        version: e
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: Gt.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: Gt.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(t) {
      const e = R.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: Gt.PlayStation4,
        version: e
      };
    }
  }
], Dm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(t) {
      const e = R.getFirstMatch(/(can-l01)/i, t) && "Nova", n = {
        type: Nt.mobile,
        vendor: "Huawei"
      };
      return e && (n.model = e), n;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: Nt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Nt.tablet,
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
        type: Nt.tablet,
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
        type: Nt.tablet,
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
        type: Nt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Nt.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(t) {
      const e = t.test(/ipod|iphone/i), n = t.test(/like (ipod|iphone)/i);
      return e && !n;
    },
    describe(t) {
      const e = R.getFirstMatch(/(ipod|iphone)/i, t);
      return {
        type: Nt.mobile,
        vendor: "Apple",
        model: e
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: Nt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Nt.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(t) {
      return t.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: Nt.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(t) {
      return t.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: Nt.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(t) {
      return t.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: Nt.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(t) {
      const e = Number(String(t.getOSVersion()).split(".")[0]);
      return t.getOSName(!0) === "android" && e >= 3;
    },
    describe() {
      return {
        type: Nt.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(t) {
      return t.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: Nt.mobile
      };
    }
  },
  /* desktop */
  {
    test(t) {
      return t.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: Nt.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(t) {
      return t.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: Nt.desktop
      };
    }
  },
  /* Linux */
  {
    test(t) {
      return t.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: Nt.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(t) {
      return t.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: Nt.tv
      };
    }
  },
  /* Roku */
  {
    test(t) {
      return t.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: Nt.tv
      };
    }
  }
], Vm = [
  /* EdgeHTML */
  {
    test(t) {
      return t.getBrowserName(!0) === "microsoft edge";
    },
    describe(t) {
      if (/\sedg\//i.test(t))
        return {
          name: Ke.Blink
        };
      const n = R.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
      return {
        name: Ke.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(t) {
      const e = {
        name: Ke.Trident
      }, n = R.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Presto */
  {
    test(t) {
      return t.test(/presto/i);
    },
    describe(t) {
      const e = {
        name: Ke.Presto
      }, n = R.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Gecko */
  {
    test(t) {
      const e = t.test(/gecko/i), n = t.test(/like gecko/i);
      return e && !n;
    },
    describe(t) {
      const e = {
        name: Ke.Gecko
      }, n = R.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Ke.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(t) {
      const e = {
        name: Ke.WebKit
      }, n = R.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  }
];
class ul {
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
  constructor(e, n = !1) {
    if (e == null || e === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = e, this.parsedResult = {}, n !== !0 && this.parse();
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
  test(e) {
    return e.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const e = R.find(jm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.browser = e.describe(this.getUA())), this.parsedResult.browser;
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
  getBrowserName(e) {
    return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
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
    const e = R.find(Bm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.os = e.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(e) {
    const { name: n } = this.getOS();
    return e ? String(n).toLowerCase() || "" : n || "";
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
  getPlatformType(e = !1) {
    const { type: n } = this.getPlatform();
    return e ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const e = R.find(Dm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.platform = e.describe(this.getUA())), this.parsedResult.platform;
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
  getEngineName(e) {
    return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const e = R.find(Vm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.engine = e.describe(this.getUA())), this.parsedResult.engine;
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
    return R.assign({}, this.parsedResult);
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
  satisfies(e) {
    const n = {};
    let r = 0;
    const i = {};
    let s = 0;
    if (Object.keys(e).forEach((l) => {
      const u = e[l];
      typeof u == "string" ? (i[l] = u, s += 1) : typeof u == "object" && (n[l] = u, r += 1);
    }), r > 0) {
      const l = Object.keys(n), u = R.find(l, (a) => this.isOS(a));
      if (u) {
        const a = this.satisfies(n[u]);
        if (a !== void 0)
          return a;
      }
      const c = R.find(
        l,
        (a) => this.isPlatform(a)
      );
      if (c) {
        const a = this.satisfies(n[c]);
        if (a !== void 0)
          return a;
      }
    }
    if (s > 0) {
      const l = Object.keys(i), u = R.find(l, (c) => this.isBrowser(c, !0));
      if (u !== void 0)
        return this.compareVersion(i[u]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(e, n = !1) {
    const r = this.getBrowserName().toLowerCase();
    let i = e.toLowerCase();
    const s = R.getBrowserTypeByAlias(i);
    return n && s && (i = s.toLowerCase()), i === r;
  }
  compareVersion(e) {
    let n = [0], r = e, i = !1;
    const s = this.getBrowserVersion();
    if (typeof s == "string")
      return e[0] === ">" || e[0] === "<" ? (r = e.substr(1), e[1] === "=" ? (i = !0, r = e.substr(2)) : n = [], e[0] === ">" ? n.push(1) : n.push(-1)) : e[0] === "=" ? r = e.substr(1) : e[0] === "~" && (i = !0, r = e.substr(1)), n.indexOf(
        R.compareVersions(s, r, i)
      ) > -1;
  }
  isOS(e) {
    return this.getOSName(!0) === String(e).toLowerCase();
  }
  isPlatform(e) {
    return this.getPlatformType(!0) === String(e).toLowerCase();
  }
  isEngine(e) {
    return this.getEngineName(!0) === String(e).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(e, n = !1) {
    return this.isBrowser(e, n) || this.isOS(e) || this.isPlatform(e);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(e = []) {
    return e.some((n) => this.is(n));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class zm {
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
  static getParser(e, n = !1) {
    if (typeof e != "string")
      throw new Error("UserAgent should be a string");
    return new ul(e, n);
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
  static parse(e) {
    return new ul(e).getResult();
  }
  static get BROWSER_MAP() {
    return Zu;
  }
  static get ENGINE_MAP() {
    return Ke;
  }
  static get OS_MAP() {
    return Gt;
  }
  static get PLATFORMS_MAP() {
    return Nt;
  }
}
const Gm = /* @__PURE__ */ Ts({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = Zi(() => {
      const g = document.querySelectorAll("graph-component");
      let b;
      for (let M = 0; M < g.length; M++) {
        const k = g[M], G = Tt(k.shadowRoot);
        let V;
        if (G.empty() ? V = Tt(
          ".graph-controller__graph-host.uninitialised"
        ) : V = G.select(
          ".graph-controller__graph-host.uninitialised"
        ), !V.empty()) {
          V.classed("uninitialised", !1), b = V;
          break;
        }
      }
      return b === void 0 && (b = Tt(
        ".graph-controller__graph-host.uninitialised"
      ), b.classed("uninitialised", !1)), b;
    }), r = Zi(() => {
      let g = n.value.node().parentElement;
      g || (g = n.value.node().getRootNode().host);
      let b = g.getAttribute("id");
      return b || "gc";
    });
    Vl(() => {
      _();
    }), zl(() => {
      x(), window.addEventListener("resize", Ys);
    }), Cs(() => {
      window.removeEventListener("resize", Ys);
    });
    const s = zm.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1, l = { x: -1e5, y: -1e5 };
    const u = no(new tl()), c = no(!1), a = pi(new Om());
    let f, h = 400, p = 400, w, v, y, d, S, N, m, P, $, B = 0, q = 0, Z = 1, j, Q;
    e({
      getGraph: ut,
      setGraph: U,
      printGraph: E,
      deleteElement: z,
      setLabel: T,
      setColor: O,
      setNodeSize: L,
      setNodeShape: X,
      setNodeProps: J,
      setDeletable: it,
      setLabelEditable: ot,
      setNodesLinkPermission: Et,
      setNodesFixedPosition: mt,
      setEditability: wt,
      toggleNodeLabels: Lt,
      toggleLinkLabels: Pt,
      toggleZoom: Dt,
      toggleNodePhysics: St,
      toggleFixedLinkDistance: vt,
      toggleGraphEditingInGUI: Ee,
      resetView: rn
    });
    function ut(g = "json", b = !0, M = !0, k = !0) {
      if (g.toLowerCase() === "json")
        return JSON.parse(
          u.value.toJSON(
            a.showLinkLabels,
            a.showLinkLabels,
            b,
            b,
            M,
            k,
            k
          )
        );
      if (g.toLowerCase() === "tgf")
        return u.value.toTGF(a.showNodeLabels, a.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function U(g) {
      typeof g == "object" || typeof g == "string" ? ia(g) : Js();
    }
    function E(g = "json", b = !0, M = !0, k = !0) {
      g.toLowerCase() === "json" ? console.log(
        u.value.toJSON(
          a.showLinkLabels,
          a.showLinkLabels,
          b,
          b,
          M,
          k,
          k
        )
      ) : console.log(u.value.toTGF(a.showNodeLabels, a.showLinkLabels));
    }
    function z(g) {
      if (g !== void 0) {
        const [b, M] = qe(g);
        for (const k of b)
          S.filter((G) => G.id === k).each(function(G) {
            let V = u.value.removeNode(G);
            if (V !== void 0) {
              let [ct, me] = V;
              Nr(ct, n.value), me.forEach((Mt) => {
                un(Mt, n.value);
              });
            }
          });
        for (const k of M)
          d.filter((G) => G.id === k).each(function(G) {
            let V = u.value.removeLink(G);
            V !== void 0 && un(V, n.value);
          });
      } else
        S.each(function(b) {
          let M = u.value.removeNode(b);
          if (M !== void 0) {
            let [k, G] = M;
            Nr(k, n.value), G.forEach((V) => {
              un(V, n.value);
            });
          }
        }), d.each(function(b) {
          let M = u.value.removeLink(b);
          M !== void 0 && un(M, n.value);
        });
      c.value = u.value.nodes.length > 0, H();
    }
    function T(g, b) {
      if (b !== void 0) {
        const [M, k] = qe(b);
        for (const G of M)
          S.filter((V) => V.id === G).each((V) => {
            An(V, g);
          });
        for (const G of k)
          d.filter((V) => V.id === G).each((V) => {
            An(V, g);
          });
      } else
        S.each((M) => {
          An(M, g);
        }), d.each((M) => {
          An(M, g);
        });
    }
    function O(g, b) {
      if (b !== void 0) {
        const [M, k] = qe(b);
        Xs(k);
        for (const G of M)
          S.selectAll(".graph-controller__node").filter((V) => V.id === G).each((V) => V.color = g).style("fill", g);
        for (const G of k)
          d.selectAll(".graph-controller__link").filter((V) => V.id === G).each((V) => V.color = g).style("stroke", g);
      } else
        S.selectAll(".graph-controller__node").each((M) => M.color = g).style("fill", g), Xs(u.value.links.map((M) => M.id)), d.selectAll(".graph-controller__link").each((M) => M.color = g).style("stroke", g);
      fs(y, r.value, a, g), H();
    }
    function L(g, b) {
      typeof g == "number" && typeof b == "number" && a.nodeProps.shape === nt.RECTANGLE ? a.nodeSize = { width: g, height: b } : typeof g == "number" || a.nodeProps.shape === nt.CIRCLE && vn(["radius"], Object.keys(g), !1) || a.nodeProps.shape === nt.RECTANGLE && vn(["width", "height"], Object.keys(g), !1) ? a.nodeSize = g : Je(
        "Invalid Size Object",
        `For circular nodes: {radius: number}
For rectangular nodes: {width: number, height: number}`
      ), rn();
    }
    function X(g) {
      if (g === "circle") g = nt.CIRCLE;
      else if (g === "rect") g = nt.RECTANGLE;
      else {
        Je("Invalid Shape", `For circular nodes: 'circle'
For rectangular nodes: 'rect'`);
        return;
      }
      let b = a.nodeSize;
      if (a.nodeProps.shape !== g) {
        if (g === nt.CIRCLE) {
          a.nodeProps = {
            shape: g,
            radius: b.width / 2
          };
          for (let M of u.value.nodes)
            M.x = M.x + a.nodeProps.radius, M.y = M.y + a.nodeProps.radius;
        } else if (g === nt.RECTANGLE) {
          a.nodeProps = {
            shape: g,
            width: b.radius * 2,
            height: b.radius * 2,
            cornerRadius: 4,
            reflexiveEdgeStart: "MOVABLE"
          };
          for (let M of u.value.nodes)
            M.x = M.x - a.nodeProps.width / 2, M.y = M.y - a.nodeProps.height / 2;
        }
        rn();
      }
    }
    function J(g) {
      if (vn(["shape"], Object.keys(g), !1)) {
        if (g.shape === nt.CIRCLE) {
          const b = ["shape", "radius"];
          vn(b, Object.keys(g), !0) && (a.nodeProps = g), qn(b, Object.keys(g));
        } else if (g.shape === nt.RECTANGLE) {
          const b = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          vn(b, Object.keys(g), !0) && (Object.values(pt).includes(g.reflexiveEdgeStart) || g.reflexiveEdgeStart === "MOVABLE" ? a.nodeProps = g : Je(
            "Invalid reflexiveEdgeStart Value",
            "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
          )), qn(b, Object.keys(g));
        }
        rn();
      } else
        Je(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function it(g, b) {
      if (b !== void 0) {
        const [M, k] = qe(b);
        for (const G of M)
          S.filter((V) => V.id === G).each((V) => {
            V.deletable = g;
          });
        for (const G of k)
          d.filter((V) => V.id === G).each((V) => {
            V.deletable = g;
          });
      } else
        S.each((M) => {
          M.deletable = g;
        }), d.each((M) => {
          M.deletable = g;
        });
    }
    function ot(g, b) {
      if (b !== void 0) {
        const [M, k] = qe(b);
        for (const G of M)
          S.filter((V) => V.id === G).each((V) => {
            V.labelEditable = g;
          });
        for (const G of k)
          d.filter((V) => V.id === G).each((V) => {
            V.labelEditable = g;
          });
      } else
        S.each((M) => {
          M.labelEditable = g;
        }), d.each((M) => {
          M.labelEditable = g;
        });
    }
    function Et(g, b, M) {
      if (M !== void 0) {
        const [k, G] = qe(M);
        for (const V of k)
          S.filter((ct) => ct.id === V).each((ct) => {
            ct.allowIncomingLinks = g, ct.allowOutgoingLinks = b;
          });
      } else
        S.each((k) => {
          k.allowIncomingLinks = g, k.allowOutgoingLinks = b;
        });
    }
    function mt(g, b) {
      if (b !== void 0) {
        const [M, k] = qe(b);
        for (const G of M)
          S.filter((V) => V.id === G).each((V) => {
            Rr(V, g);
          });
      } else
        S.each((M) => {
          Rr(M, g);
        });
    }
    function wt(g, b) {
      const M = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], k = ["deletable", "labelEditable"];
      if (b !== void 0) {
        const [G, V] = qe(b), ct = G.length === 0;
        for (const me of G)
          S.filter((Mt) => Mt.id === me).each(function(Mt) {
            Mt.deletable = g.deletable ?? Mt.deletable, Mt.labelEditable = g.labelEditable ?? Mt.labelEditable, "fixedPosition" in g && Rr(Mt, g.fixedPosition), "allowIncomingLinks" in g && (Mt.allowIncomingLinks = g.allowIncomingLinks ?? Mt.allowIncomingLinks), "allowOutgoingLinks" in g && (Mt.allowOutgoingLinks = g.allowOutgoingLinks ?? Mt.allowOutgoingLinks);
          });
        for (const me of V)
          d.selectAll(".graph-controller__link").filter((Mt) => Mt.id === me).each(function(Mt) {
            Mt.deletable = g.deletable ?? Mt.deletable, Mt.labelEditable = g.labelEditable ?? Mt.labelEditable;
          });
        qn(
          ct ? k : M,
          Object.keys(g)
        );
      } else
        S.each(function(G) {
          G.deletable = g.deletable ?? G.deletable, G.labelEditable = g.labelEditable ?? G.labelEditable, "fixedPosition" in g && Rr(G, g.fixedPosition), "allowIncomingLinks" in g && (G.allowIncomingLinks = g.allowIncomingLinks ?? G.allowIncomingLinks), "allowOutgoingLinks" in g && (G.allowOutgoingLinks = g.allowOutgoingLinks ?? G.allowOutgoingLinks);
        }), d.selectAll(".graph-controller__link").each(function(G) {
          G.deletable = g.deletable ?? G.deletable, G.labelEditable = g.labelEditable ?? G.labelEditable;
        }), qn(M, Object.keys(g));
      H();
    }
    function St(g) {
      a.nodePhysicsEnabled = g, Wu(f, g, h, p);
    }
    function vt(g) {
      a.fixedLinkDistanceEnabled = g, Ku(f, u.value, a, g);
    }
    function Pt(g) {
      a.showLinkLabels = g;
    }
    function Lt(g) {
      a.showNodeLabels = g;
    }
    function Dt(g) {
      a.zoomEnabled = g, rn();
    }
    function Ee(g) {
      a.isGraphEditableInGUI = g;
    }
    function _() {
      const g = (b) => b === "false" ? !1 : !!b;
      localStorage.showNodeLabels && (a.showNodeLabels = g(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (a.nodePhysicsEnabled = g(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (a.showLinkLabels = g(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (a.fixedLinkDistanceEnabled = g(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (a.zoomEnabled = g(localStorage.enableZoom)), localStorage.persistSettings && (a.persistSettingsLocalStorage = g(localStorage.persistSettings));
    }
    function x() {
      h = n.value.node().clientWidth, p = n.value.node().clientHeight, w = p0(
        (g) => C(g, a.zoomEnabled),
        a.zoomEnabled
      ), y = x0(
        n.value,
        w,
        (g) => a.isGraphEditableInGUI ? At(g) : null,
        (g) => a.isGraphEditableInGUI ? _t(g) : null,
        (g) => {
          a.isGraphEditableInGUI && (a.nodeProps.shape === nt.RECTANGLE ? I(
            ee(g, y.node())[0] - 0.5 * a.nodeProps.width,
            ee(g, y.node())[1] - 0.5 * a.nodeProps.height
          ) : I(
            ee(g, y.node())[0],
            ee(g, y.node())[1]
          ));
        }
      ), T0(y, r.value, a, u.value.getNonDefaultLinkColors()), N = C0(y), d = S0(y), S = P0(y), f = W0(u.value, a, h, p, () => A()), v = b0(f, h, p, a), H();
    }
    function C(g, b = !0) {
      b && (B = g.transform.x, q = g.transform.y, Z = g.transform.k, y.attr("transform", `translate(${B},${q})scale(${Z})`));
    }
    function F(g, b, M, k, G = !0, V = !0) {
      let ct = u.value.createLink(
        g.id,
        b.id,
        M,
        k,
        G,
        V
      );
      ct !== void 0 && w0(ct, n.value), H();
    }
    function I(g, b, M, k, G, V, ct = { x: !1, y: !1 }, me = !0, Mt = !0, Si = !0, oa = !0) {
      let la = u.value.createNode(
        g ?? h / 2,
        b ?? p / 2,
        M,
        k,
        G,
        V,
        ct,
        me,
        Mt,
        Si,
        oa
      );
      m0(la, n.value), c.value = !0, H();
    }
    function A() {
      S.attr("transform", (g) => `translate(${g.x},${g.y})`), d.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (g) => (K(g), Tm(g, h, p, a))), tt();
    }
    function K(g) {
      let b = g.pathType;
      g.pathType = Cm(g.source, g.target, u.value), b !== g.pathType && H();
    }
    function W() {
      const g = m, b = Tt(
        n.value.node().querySelector(`#${r.value + "-node-" + g.id}`)
      ).classed("on-deletion");
      if (g !== void 0 && !b) {
        const M = P;
        M !== void 0 ? N.attr("d", () => g.id === M.id ? Ju(g, [h / 2, p / 2], a) : u.value.hasBidirectionalConnection(g, M) ? tr(g, M, a) : hs(g, M, a)) : $ !== void 0 && N.attr(
          "d",
          tr(g, { x: $[0], y: $[1] }, a)
        );
      }
    }
    function H(g = 0.5) {
      d = d.data(u.value.links, (b) => b.id).join((b) => {
        const M = b.append("g").classed("graph-controller__link-container", !0);
        return M.append("path").classed("graph-controller__link", !0).style("stroke", (k) => k.color ? k.color : "").attr("id", (k) => r.value + "-link-" + k.id), M.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (k) => {
          oe(k);
        }).on("pointerout", (k) => nn(k)).on("pointerdown", (k, G) => {
          _0(G, k.button, n.value), a.isGraphEditableInGUI && Vt(k, G);
        }).on("pointerup", (k, G) => {
          yr(k, G);
        }), M.append("text").attr("class", (k) => `graph-controller__${k.pathType?.toLowerCase()}-path-text`).append("textPath").attr(
          "class",
          (k) => k.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (k) => `#${r.value + "-link-" + k.id}`).text((k) => k.label ? k.label : "add label").on("click", (k, G) => {
          a.isGraphEditableInGUI && Us(k, G);
        }).on("dblclick", (k) => {
          oe(k);
        }), M.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (k) => `<div class='${k.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (k, G) => {
          a.isGraphEditableInGUI && Us(k, G);
        }).on("dblclick", (k) => {
          oe(k);
        }), M;
      }), d.selectChild(".graph-controller__link").attr("marker-start", function(b) {
        if (b.pathType?.includes("REVERSE")) {
          let M = `url(#${r.value}-link-arrow-reverse`;
          return b.color && (M += "-" + hr(b.color)), M += ")", M;
        } else
          return null;
      }).attr("marker-end", function(b) {
        if (b.pathType?.includes("REVERSE"))
          return null;
        {
          let M = `url(#${r.value}-link-arrow`;
          return b.color && (M += "-" + hr(b.color)), M += ")", M;
        }
      }), d.selectChild("text").attr("class", (b) => `graph-controller__${b.pathType?.toLowerCase()}-path-text`).attr("dy", (b) => b.pathType === ue.REFLEXIVE ? 15 : b.pathType == ue.LINEREVERSE ? -10 : b.pathType?.includes("REVERSE") ? 20 : -10).selectChild("textPath").attr(
        "class",
        (b) => b.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (b) => !a.showLinkLabels || !b.label && !b.labelEditable).classed("not-editable", !a.isGraphEditableInGUI).attr("startOffset", (b) => b.pathType?.includes("REVERSE") ? "46%" : "50%").text((b) => b.label ? b.label : "add label"), S = S.data(u.value.nodes, (b) => b.id).join(
        (b) => {
          const M = b.append("g").classed("graph-controller__node-container", !0).call(v).on("dblclick", (V) => {
            oe(V);
          }).on("pointerenter", (V, ct) => re(ct)).on("pointerout", (V, ct) => ie(ct)).on("pointerdown", (V, ct) => {
            y0(ct, V.button, n.value), l = { x: V.x, y: V.y }, a.isGraphEditableInGUI && Y(V, ct);
          }).on("pointerup", (V, ct) => {
            a.isGraphEditableInGUI && _t(V, ct);
          }), k = M.append(a.nodeProps.shape).classed("graph-controller__node", !0).attr("id", (V) => `${r.value + "-node-" + V.id}`).style("fill", (V) => V.color ? V.color : "");
          a.nodeProps.shape === nt.CIRCLE ? k.attr("r", a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && k.attr("width", a.nodeProps.width).attr("height", a.nodeProps.height).attr("rx", a.nodeProps.cornerRadius).attr("ry", a.nodeProps.cornerRadius);
          const G = M.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
          return a.nodeProps.shape === nt.CIRCLE ? G.attr("width", 2 * a.nodeProps.radius).attr("height", 2 * a.nodeProps.radius).attr("x", -a.nodeProps.radius).attr("y", -a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && G.attr("width", a.nodeProps.width).attr("height", a.nodeProps.height), G.append("xhtml:div").on("click", (V, ct) => {
            a.isGraphEditableInGUI && ea(V, ct);
          }).on("dblclick", (V) => {
            oe(V);
          }).on("pointerenter", (V, ct) => re(ct)).on("pointerout", (V, ct) => ie(ct)), M;
        },
        (b) => (a.nodeProps.shape === nt.CIRCLE ? b.selectChild(".graph-controller__node").attr("r", a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && b.selectChild(".graph-controller__node").attr("width", a.nodeProps.width).attr("height", a.nodeProps.height).attr("rx", a.nodeProps.cornerRadius).attr("ry", a.nodeProps.cornerRadius), b.selectChild("foreignObject").selectChild("div").classed(
          "hidden",
          (M) => !a.showNodeLabels || !M.label && !M.labelEditable
        ).classed("not-editable", !a.isGraphEditableInGUI), b)
      ), S.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (b) => b.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("hidden", (b) => !a.showNodeLabels || !b.label && !b.labelEditable).text((b) => b.label ? b.label : "add label"), window.MathJax?.version && window.MathJax.typesetPromise().then(() => {
        D();
      }), f.nodes(u.value.nodes), f.alpha(g).restart();
    }
    function D() {
      d.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(g) {
        const b = this, M = g, k = Tt(b.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !a.showLinkLabels || !M.label && !M.labelEditable
        ).node();
        k.replaceChild(b, k.childNodes[0]);
      }), d.selectChild("text").selectChild("textPath").each(function() {
        const g = this;
        let b = !1;
        g.childNodes.forEach((k) => {
          k?.nodeType === Node.TEXT_NODE && k?.textContent?.trim() !== "" && (b = !0);
        }), b || Tt(g).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), tt();
    }
    function tt() {
      d.selectChild("text").selectChild("textPath").each(function() {
        const g = this, [b, M] = Ks(g);
        Tt(g.parentNode.parentNode).select("foreignObject").attr("x", b).attr("y", M);
      });
    }
    function Y(g, b) {
      (g.button === 2 || g.pointerType === "touch") && (Zo(g), b.allowOutgoingLinks && ht(b), b.deletable && (j = setTimeout(() => {
        P = void 0, et(b);
      }, 250)));
    }
    function et(g) {
      let b = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`);
      Tt(b).classed("on-deletion", !0);
      let M = Tt(b.parentElement);
      if (a.nodeProps.shape === nt.CIRCLE) {
        let k = e0().outerRadius(a.nodeProps.radius + 4).innerRadius(a.nodeProps.radius), G = [{ startAngle: 0, endAngle: 0 }];
        M.append("g").attr("class", "arc").selectAll("path.arc").data(G).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Uo).attrTween("d", function(ct) {
          let me = { startAngle: 0, endAngle: 2 * Math.PI }, Mt = js(ct, me);
          return function(Si) {
            return k(Mt(Si));
          };
        }).on("end", () => st(g));
      } else if (a.nodeProps.shape === nt.RECTANGLE) {
        const k = M0(
          a.nodeProps.width,
          a.nodeProps.height,
          a.nodeProps.cornerRadius
        );
        let G = M.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", k), V = 2 * a.nodeProps.width + 2 * a.nodeProps.height;
        G.attr("stroke-dasharray", V).attr("stroke-dashoffset", V).transition().duration(750).ease(Uo).attr("stroke-dashoffset", 0).on("end", () => st(g));
      }
    }
    function st(g) {
      if (a.isGraphEditableInGUI) {
        let b = u.value.removeNode(g);
        if (b !== void 0) {
          let [M, k] = b;
          Nr(M, n.value), k.forEach((G) => {
            un(G, n.value);
          });
        }
        c.value = u.value.nodes.length > 0, vr(), H();
      }
    }
    function ht(g) {
      $ = a.nodeProps.shape === nt.CIRCLE ? [g.x, g.y] : [g.x + 0.5 * a.nodeProps.width, g.y + 0.5 * a.nodeProps.height], m = g, N.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", tr(g, { x: $[0], y: $[1] }, a));
    }
    function _t(g, b = void 0) {
      oe(g), clearTimeout(j), b && dt(b), g.pointerType === "mouse" || (g.pointerType === "touch" || g.pointerType === "pen") && !k0(
        { x: l.x, y: l.y },
        { x: g.x, y: g.y }
      ) ? Ot() : vr();
    }
    function dt(g) {
      let b = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`), M = Tt(b), k = Tt(b.parentElement);
      a.nodeProps.shape === nt.CIRCLE ? (M.classed("on-deletion", !1), k.select("g.arc").select("path.arc").interrupt().remove(), k.select("g.arc").remove()) : a.nodeProps.shape === nt.RECTANGLE && (M.classed("on-deletion") && k.select("path").attr("stroke-dasharray", 2 * a.nodeProps.width + 2 * a.nodeProps.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * a.nodeProps.width + 2 * a.nodeProps.height).on("end", () => {
        k.select("path").remove();
      }), M.classed("on-deletion", !1));
    }
    function Ot() {
      const g = m, b = P;
      vr(), !(g === void 0 || b === void 0) && F(g, b);
    }
    function At(g) {
      if (oe(g), m !== void 0) {
        const b = wd(g, n.value.node())[0];
        $ = [(b[0] - B) / Z, (b[1] - q) / Z], W();
      }
    }
    function re(g) {
      g.allowIncomingLinks && (P = g);
    }
    function ie(g) {
      g && dt(g), P = void 0, clearTimeout(j);
    }
    function nn(g) {
      oe(g), clearTimeout(Q);
    }
    function yr(g, b) {
      oe(g), clearTimeout(Q), (g.button === 2 || g.pointerType === "touch") && b.deletable && ta(b);
    }
    function Vt(g, b) {
      (g.button === 2 || g.pointerType === "touch") && (Zo(g), b.deletable && (Q = setTimeout(() => {
        fe(b);
      }, 250)));
    }
    function fe(g) {
      let b = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (Tt(b).classed("on-deletion", !0), b instanceof SVGPathElement) {
        let M = Tt(b), k = b.getTotalLength(), G = b.parentElement.querySelector("text"), V = Array.from(G.classList).some(
          (Mt) => Mt.includes("reverse")
        ), ct = 0, me = V ? k : -k;
        M.attr("stroke-dasharray", k).attr("stroke-dashoffset", ct).transition().duration(750).attr("stroke-dashoffset", me).on("end", () => _r(g));
      }
    }
    function _r(g) {
      let b = g.color;
      if (a.isGraphEditableInGUI) {
        let M = u.value.removeLink(g);
        M !== void 0 && un(M, n.value), b && (u.value.hasNonDefaultLinkColor(b) || zi(y, r.value, b));
      }
      H();
    }
    function ta(g) {
      let b = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (Tt(b).classed("on-deletion") && b instanceof SVGPathElement) {
        let M = Tt(b), k = b.getTotalLength();
        M.attr("stroke-dasharray", k).attr("stroke-dashoffset", k).transition().attr("stroke-dashoffset", 0).on("end", () => {
          M.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      Tt(b).classed("on-deletion", !1);
    }
    function ea(g, b) {
      if (oe(g), b.labelEditable) {
        let M = a.nodeProps.shape === nt.CIRCLE ? [b.x, b.y] : [
          b.x + 0.5 * a.nodeProps.width,
          b.y + 0.5 * a.nodeProps.height
        ];
        Ws(b, M);
      }
    }
    function Us(g, b) {
      if (b.labelEditable) {
        let M = g.target, k;
        M.nodeName === "textPath" ? k = M : k = M.closest(".graph-controller__link-container").querySelector("textPath");
        let G = Ks(k);
        Ws(b, G);
      }
    }
    function Ws(g, b) {
      let M = g instanceof Rn ? "node" : "link";
      const k = document.createElement("input");
      k.setAttribute("class", "graph-controller__label-input"), k.setAttribute("id", `${M}-label-input-field`), g.label == null ? k.value = "" : k.value = g.label, k.placeholder = `Enter ${M} label`;
      const G = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      G.setAttribute("width", "100%"), G.setAttribute("height", "100%"), G.setAttribute("x", `${b[0] - 90}`), G.setAttribute("y", `${b[1] - 12}`), G.append(k), n.value.select("svg").select("g").node().append(G), k.focus(), s !== "desktop" && (o = !0), k.ondblclick = function(ct) {
        oe(ct);
      };
      let V = !1;
      k.onkeyup = function(ct) {
        ct.key === "Enter" ? (V = !0, k.blur()) : ct.key === "Escape" && (k.value = "", k.blur());
      }, k.onblur = function() {
        V && An(g, k.value.trim()), G.remove(), s !== "desktop" && (o = !1);
      };
    }
    function An(g, b) {
      v0(g, b, n.value), g.label = b, H();
      let M = g instanceof Rn ? "node" : "link";
      M === "link" ? na(g) : M === "node" && b !== "" && ra(g);
    }
    function na(g) {
      const b = n.value.node().querySelector(
        `#${r.value + "-link-" + g.id}`
      ).parentElement;
      b.querySelector("mjx-container")?.remove(), b.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), H();
    }
    function ra(g) {
      const b = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement;
      if (b) {
        const M = b.parentElement;
        b.remove(), M.append(b);
      }
    }
    function Ks(g) {
      let b = n.value.select("svg").node().getBoundingClientRect(), M = g.getBoundingClientRect(), k = (M.x - b.x - B) / Z, G = (M.y - b.y - q) / Z;
      return [k, G];
    }
    function vr() {
      N?.classed("hidden", !0).attr("marker-end", "null"), m = void 0, P = void 0, $ = void 0;
    }
    function ia(g) {
      let b, M;
      try {
        if (typeof g == "string")
          [b, M] = $m(g);
        else if (typeof g == "object")
          [b, M] = Am(g);
        else {
          Je("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (k) {
        Je("Error during parsing:", `Invalid data format:
` + k);
        return;
      }
      Js(), sa(b, M);
    }
    function sa(g, b) {
      for (let k of g)
        I(
          k.x,
          k.y,
          k.idImported,
          k.label,
          k.color,
          a.nodeProps.shape,
          k.fixedPosition,
          k.deletable,
          k.labelEditable,
          k.allowIncomingLinks,
          k.allowOutgoingLinks
        );
      const M = (k) => u.value.nodes.find((G) => G.idImported === k);
      for (let k of b) {
        let G = M(k.sourceIdImported), V = M(k.targetIdImported);
        G && V && (F(
          G,
          V,
          k.label,
          k.color,
          k.deletable,
          k.labelEditable
        ), k.color && fs(y, r.value, a, k.color));
      }
    }
    function Xs(g) {
      for (let b of g) {
        const M = u.value.links.filter((k) => k.id === b).map((k) => k.color).shift();
        M && (u.value.hasNonDefaultLinkColor(M, b) ? u.value.getLinkIdsWithNonDefaultLinkColors(
          M,
          b
        ).every(
          (V) => g.includes(V)
        ) && zi(y, r.value, M) : zi(y, r.value, M));
      }
    }
    function rn() {
      f.stop(), n.value.selectChildren().remove(), w = void 0, B = 0, q = 0, Z = 1, y = void 0, N = void 0, d = void 0, S = void 0, f = void 0, vr(), _(), x();
    }
    function Ys() {
      a.isCanvasBoundToView && (o || rn());
    }
    function Js() {
      u.value.links.forEach((g) => un(g, n.value)), u.value.nodes.forEach((g) => Nr(g, n.value)), u.value = new tl(), c.value = !1, rn();
    }
    return (g, b) => (Ue(), We(he, null, [
      b[0] || (b[0] = le("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      Or(le("div", null, [
        De($f, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": rr(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Fr, !c.value]
      ])
    ], 64));
  }
});
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  /* @__PURE__ */ xf(Gm, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
