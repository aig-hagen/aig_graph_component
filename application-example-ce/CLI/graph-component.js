var eg = Object.defineProperty;
var tg = (e, t, n) => t in e ? eg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Oe = (e, t, n) => tg(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ea(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const He = {}, qi = [], Ut = () => {
}, ng = () => !1, Vl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Va = (e) => e.startsWith("onUpdate:"), We = Object.assign, La = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ig = Object.prototype.hasOwnProperty, Te = (e, t) => ig.call(e, t), xe = Array.isArray, Yi = (e) => Ll(e) === "[object Map]", fd = (e) => Ll(e) === "[object Set]", Ve = (e) => typeof e == "function", Xe = (e) => typeof e == "string", ar = (e) => typeof e == "symbol", Fe = (e) => e !== null && typeof e == "object", dd = (e) => (Fe(e) || Ve(e)) && Ve(e.then) && Ve(e.catch), hd = Object.prototype.toString, Ll = (e) => hd.call(e), rg = (e) => Ll(e).slice(8, -1), vd = (e) => Ll(e) === "[object Object]", Pa = (e) => Xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Er = /* @__PURE__ */ Ea(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Pl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, og = /-(\w)/g, yt = Pl((e) => e.replace(og, (t, n) => n ? n.toUpperCase() : "")), lg = /\B([A-Z])/g, tn = Pl(
  (e) => e.replace(lg, "-$1").toLowerCase()
), Fn = Pl((e) => e.charAt(0).toUpperCase() + e.slice(1)), as = Pl((e) => e ? `on${Fn(e)}` : ""), ni = (e, t) => !Object.is(e, t), us = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Ko = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, sg = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Os = (e) => {
  const t = Xe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let ju;
const md = () => ju || (ju = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ia(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = Xe(i) ? fg(i) : Ia(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Xe(e) || Fe(e))
    return e;
}
const ag = /;(?![^(]*\))/g, ug = /:([^]+)/, cg = /\/\*[^]*?\*\//g;
function fg(e) {
  const t = {};
  return e.replace(cg, "").split(ag).forEach((n) => {
    if (n) {
      const i = n.split(ug);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function Ta(e) {
  let t = "";
  if (Xe(e))
    t = e;
  else if (xe(e))
    for (let n = 0; n < e.length; n++) {
      const i = Ta(e[n]);
      i && (t += i + " ");
    }
  else if (Fe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const dg = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", hg = /* @__PURE__ */ Ea(dg);
function gd(e) {
  return !!e || e === "";
}
const dt = (e) => Xe(e) ? e : e == null ? "" : xe(e) || Fe(e) && (e.toString === hd || !Ve(e.toString)) ? JSON.stringify(e, yd, 2) : String(e), yd = (e, t) => t && t.__v_isRef ? yd(e, t.value) : Yi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[cs(i, o) + " =>"] = r, n),
    {}
  )
} : fd(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => cs(n))
} : ar(t) ? cs(t) : Fe(t) && !xe(t) && !vd(t) ? String(t) : t, cs = (e, t = "") => {
  var n;
  return ar(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Rt;
class pd {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Rt, !t && Rt && (this.index = (Rt.scopes || (Rt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Rt;
      try {
        return Rt = this, t();
      } finally {
        Rt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Rt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Rt = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++)
        this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ma(e) {
  return new pd(e);
}
function vg(e, t = Rt) {
  t && t.active && t.effects.push(e);
}
function mg() {
  return Rt;
}
function bt(e) {
  Rt && Rt.cleanups.push(e);
}
let wi;
class Aa {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, vg(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ii();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (gg(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ti();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = ei, n = wi;
    try {
      return ei = !0, wi = this, this._runnings++, zu(this), this.fn();
    } finally {
      Gu(this), this._runnings--, wi = n, ei = t;
    }
  }
  stop() {
    var t;
    this.active && (zu(this), Gu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function gg(e) {
  return e.value;
}
function zu(e) {
  e._trackId++, e._depsLength = 0;
}
function Gu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      bd(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function bd(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let ei = !0, Bs = 0;
const wd = [];
function Ii() {
  wd.push(ei), ei = !1;
}
function Ti() {
  const e = wd.pop();
  ei = e === void 0 ? !0 : e;
}
function $a() {
  Bs++;
}
function Na() {
  for (Bs--; !Bs && Fs.length; )
    Fs.shift()();
}
function xd(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && bd(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Fs = [];
function _d(e, t, n) {
  $a();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && Fs.push(i.scheduler)));
  }
  Na();
}
const kd = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Xo = /* @__PURE__ */ new WeakMap(), xi = Symbol(""), Ds = Symbol("");
function Vt(e, t, n) {
  if (ei && wi) {
    let i = Xo.get(e);
    i || Xo.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = kd(() => i.delete(n))), xd(
      wi,
      r
    );
  }
}
function $n(e, t, n, i, r, o) {
  const l = Xo.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && xe(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !ar(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        xe(e) ? Pa(n) && s.push(l.get("length")) : (s.push(l.get(xi)), Yi(e) && s.push(l.get(Ds)));
        break;
      case "delete":
        xe(e) || (s.push(l.get(xi)), Yi(e) && s.push(l.get(Ds)));
        break;
      case "set":
        Yi(e) && s.push(l.get(xi));
        break;
    }
  $a();
  for (const a of s)
    a && _d(
      a,
      4
    );
  Na();
}
function yg(e, t) {
  var n;
  return (n = Xo.get(e)) == null ? void 0 : n.get(t);
}
const pg = /* @__PURE__ */ Ea("__proto__,__v_isRef,__isVue"), Sd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ar)
), Uu = /* @__PURE__ */ bg();
function bg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = _e(this);
      for (let o = 0, l = this.length; o < l; o++)
        Vt(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(_e)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ii(), $a();
      const i = _e(this)[t].apply(this, n);
      return Na(), Ti(), i;
    };
  }), e;
}
function wg(e) {
  const t = _e(this);
  return Vt(t, "has", e), t.hasOwnProperty(e);
}
class Cd {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, i) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return i === (r ? o ? Ag : Pd : o ? Ld : Vd).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = xe(t);
    if (!r) {
      if (l && Te(Uu, n))
        return Reflect.get(Uu, n, i);
      if (n === "hasOwnProperty")
        return wg;
    }
    const s = Reflect.get(t, n, i);
    return (ar(n) ? Sd.has(n) : pg(n)) || (r || Vt(t, "get", n), o) ? s : qe(s) ? l && Pa(n) ? s : s.value : Fe(s) ? r ? Qr(s) : un(s) : s;
  }
}
class Ed extends Cd {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = tr(o);
      if (!Zo(i) && !tr(i) && (o = _e(o), i = _e(i)), !xe(t) && qe(o) && !qe(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = xe(t) && Pa(n) ? Number(n) < t.length : Te(t, n), s = Reflect.set(t, n, i, r);
    return t === _e(r) && (l ? ni(i, o) && $n(t, "set", n, i) : $n(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Te(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && $n(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!ar(n) || !Sd.has(n)) && Vt(t, "has", n), i;
  }
  ownKeys(t) {
    return Vt(
      t,
      "iterate",
      xe(t) ? "length" : xi
    ), Reflect.ownKeys(t);
  }
}
class xg extends Cd {
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
const _g = /* @__PURE__ */ new Ed(), kg = /* @__PURE__ */ new xg(), Sg = /* @__PURE__ */ new Ed(
  !0
), Ra = (e) => e, Il = (e) => Reflect.getPrototypeOf(e);
function yo(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = _e(e), o = _e(t);
  n || (ni(t, o) && Vt(r, "get", t), Vt(r, "get", o));
  const { has: l } = Il(r), s = i ? Ra : n ? Fa : Ar;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function po(e, t = !1) {
  const n = this.__v_raw, i = _e(n), r = _e(e);
  return t || (ni(e, r) && Vt(i, "has", e), Vt(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function bo(e, t = !1) {
  return e = e.__v_raw, !t && Vt(_e(e), "iterate", xi), Reflect.get(e, "size", e);
}
function Wu(e) {
  e = _e(e);
  const t = _e(this);
  return Il(t).has.call(t, e) || (t.add(e), $n(t, "add", e, e)), this;
}
function qu(e, t) {
  t = _e(t);
  const n = _e(this), { has: i, get: r } = Il(n);
  let o = i.call(n, e);
  o || (e = _e(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? ni(t, l) && $n(n, "set", e, t) : $n(n, "add", e, t), this;
}
function Yu(e) {
  const t = _e(this), { has: n, get: i } = Il(t);
  let r = n.call(t, e);
  r || (e = _e(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && $n(t, "delete", e, void 0), o;
}
function Ku() {
  const e = _e(this), t = e.size !== 0, n = e.clear();
  return t && $n(e, "clear", void 0, void 0), n;
}
function wo(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = _e(l), a = t ? Ra : e ? Fa : Ar;
    return !e && Vt(s, "iterate", xi), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function xo(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = _e(r), l = Yi(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? Ra : t ? Fa : Ar;
    return !t && Vt(
      o,
      "iterate",
      a ? Ds : xi
    ), {
      // iterator protocol
      next() {
        const { value: d, done: f } = u.next();
        return f ? { value: d, done: f } : {
          value: s ? [c(d[0]), c(d[1])] : c(d),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Wn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Cg() {
  const e = {
    get(o) {
      return yo(this, o);
    },
    get size() {
      return bo(this);
    },
    has: po,
    add: Wu,
    set: qu,
    delete: Yu,
    clear: Ku,
    forEach: wo(!1, !1)
  }, t = {
    get(o) {
      return yo(this, o, !1, !0);
    },
    get size() {
      return bo(this);
    },
    has: po,
    add: Wu,
    set: qu,
    delete: Yu,
    clear: Ku,
    forEach: wo(!1, !0)
  }, n = {
    get(o) {
      return yo(this, o, !0);
    },
    get size() {
      return bo(this, !0);
    },
    has(o) {
      return po.call(this, o, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: wo(!0, !1)
  }, i = {
    get(o) {
      return yo(this, o, !0, !0);
    },
    get size() {
      return bo(this, !0);
    },
    has(o) {
      return po.call(this, o, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: wo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = xo(
      o,
      !1,
      !1
    ), n[o] = xo(
      o,
      !0,
      !1
    ), t[o] = xo(
      o,
      !1,
      !0
    ), i[o] = xo(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    i
  ];
}
const [
  Eg,
  Vg,
  Lg,
  Pg
] = /* @__PURE__ */ Cg();
function Oa(e, t) {
  const n = t ? e ? Pg : Lg : e ? Vg : Eg;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Te(n, r) && r in i ? n : i,
    r,
    o
  );
}
const Ig = {
  get: /* @__PURE__ */ Oa(!1, !1)
}, Tg = {
  get: /* @__PURE__ */ Oa(!1, !0)
}, Mg = {
  get: /* @__PURE__ */ Oa(!0, !1)
}, Vd = /* @__PURE__ */ new WeakMap(), Ld = /* @__PURE__ */ new WeakMap(), Pd = /* @__PURE__ */ new WeakMap(), Ag = /* @__PURE__ */ new WeakMap();
function $g(e) {
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
function Ng(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $g(rg(e));
}
function un(e) {
  return tr(e) ? e : Ba(
    e,
    !1,
    _g,
    Ig,
    Vd
  );
}
function Rg(e) {
  return Ba(
    e,
    !1,
    Sg,
    Tg,
    Ld
  );
}
function Qr(e) {
  return Ba(
    e,
    !0,
    kg,
    Mg,
    Pd
  );
}
function Ba(e, t, n, i, r) {
  if (!Fe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = Ng(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Ki(e) {
  return tr(e) ? Ki(e.__v_raw) : !!(e && e.__v_isReactive);
}
function tr(e) {
  return !!(e && e.__v_isReadonly);
}
function Zo(e) {
  return !!(e && e.__v_isShallow);
}
function Id(e) {
  return Ki(e) || tr(e);
}
function _e(e) {
  const t = e && e.__v_raw;
  return t ? _e(t) : e;
}
function Td(e) {
  return Object.isExtensible(e) && Ko(e, "__v_skip", !0), e;
}
const Ar = (e) => Fe(e) ? un(e) : e, Fa = (e) => Fe(e) ? Qr(e) : e;
class Md {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Aa(
      () => t(this._value),
      () => Oo(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = _e(this);
    return (!t._cacheable || t.effect.dirty) && ni(t._value, t._value = t.effect.run()) && Oo(t, 4), Ad(t), t.effect._dirtyLevel >= 2 && Oo(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Og(e, t, n = !1) {
  let i, r;
  const o = Ve(e);
  return o ? (i = e, r = Ut) : (i = e.get, r = e.set), new Md(i, r, o || !r, n);
}
function Ad(e) {
  var t;
  ei && wi && (e = _e(e), xd(
    wi,
    (t = e.dep) != null ? t : e.dep = kd(
      () => e.dep = void 0,
      e instanceof Md ? e : void 0
    )
  ));
}
function Oo(e, t = 4, n) {
  e = _e(e);
  const i = e.dep;
  i && _d(
    i,
    t
  );
}
function qe(e) {
  return !!(e && e.__v_isRef === !0);
}
function te(e) {
  return $d(e, !1);
}
function be(e) {
  return $d(e, !0);
}
function $d(e, t) {
  return qe(e) ? e : new Bg(e, t);
}
class Bg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : _e(t), this._value = n ? t : Ar(t);
  }
  get value() {
    return Ad(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Zo(t) || tr(t);
    t = n ? t : _e(t), ni(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ar(t), Oo(this, 4));
  }
}
function rn(e) {
  return qe(e) ? e.value : e;
}
const Fg = {
  get: (e, t, n) => rn(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return qe(r) && !qe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function Nd(e) {
  return Ki(e) ? e : new Proxy(e, Fg);
}
function Da(e) {
  const t = xe(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Rd(e, n);
  return t;
}
class Dg {
  constructor(t, n, i) {
    this._object = t, this._key = n, this._defaultValue = i, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return yg(_e(this._object), this._key);
  }
}
class Hg {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function ae(e, t, n) {
  return qe(e) ? e : Ve(e) ? new Hg(e) : Fe(e) && arguments.length > 1 ? Rd(e, t, n) : te(e);
}
function Rd(e, t, n) {
  const i = e[t];
  return qe(i) ? i : new Dg(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ti(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    Tl(r, t, n);
  }
}
function qt(e, t, n, i) {
  if (Ve(e)) {
    const o = ti(e, t, n, i);
    return o && dd(o) && o.catch((l) => {
      Tl(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(qt(e[o], t, n, i));
  return r;
}
function Tl(e, t, n, i = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const l = t.proxy, s = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](e, l, s) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      ti(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  jg(e, n, r, i);
}
function jg(e, t, n, i = !0) {
  console.error(e);
}
let $r = !1, Hs = !1;
const at = [];
let _n = 0;
const Xi = [];
let Kn = null, vi = 0;
const Od = /* @__PURE__ */ Promise.resolve();
let Ha = null;
function Ze(e) {
  const t = Ha || Od;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zg(e) {
  let t = _n + 1, n = at.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = at[i], o = Nr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function ja(e) {
  (!at.length || !at.includes(
    e,
    $r && e.allowRecurse ? _n + 1 : _n
  )) && (e.id == null ? at.push(e) : at.splice(zg(e.id), 0, e), Bd());
}
function Bd() {
  !$r && !Hs && (Hs = !0, Ha = Od.then(Dd));
}
function Gg(e) {
  const t = at.indexOf(e);
  t > _n && at.splice(t, 1);
}
function Ug(e) {
  xe(e) ? Xi.push(...e) : (!Kn || !Kn.includes(
    e,
    e.allowRecurse ? vi + 1 : vi
  )) && Xi.push(e), Bd();
}
function Xu(e, t, n = $r ? _n + 1 : 0) {
  for (; n < at.length; n++) {
    const i = at[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      at.splice(n, 1), n--, i();
    }
  }
}
function Fd(e) {
  if (Xi.length) {
    const t = [...new Set(Xi)].sort(
      (n, i) => Nr(n) - Nr(i)
    );
    if (Xi.length = 0, Kn) {
      Kn.push(...t);
      return;
    }
    for (Kn = t, vi = 0; vi < Kn.length; vi++)
      Kn[vi]();
    Kn = null, vi = 0;
  }
}
const Nr = (e) => e.id == null ? 1 / 0 : e.id, Wg = (e, t) => {
  const n = Nr(e) - Nr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Dd(e) {
  Hs = !1, $r = !0, at.sort(Wg);
  try {
    for (_n = 0; _n < at.length; _n++) {
      const t = at[_n];
      t && t.active !== !1 && ti(t, null, 14);
    }
  } finally {
    _n = 0, at.length = 0, Fd(), $r = !1, Ha = null, (at.length || Xi.length) && Dd();
  }
}
function qg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || He;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = i[c] || He;
    f && (r = n.map((h) => Xe(h) ? h.trim() : h)), d && (r = n.map(sg));
  }
  let s, a = i[s = as(t)] || // also try camelCase event handler (#2249)
  i[s = as(yt(t))];
  !a && o && (a = i[s = as(tn(t))]), a && qt(
    a,
    e,
    6,
    r
  );
  const u = i[s + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[s])
      return;
    e.emitted[s] = !0, qt(
      u,
      e,
      6,
      r
    );
  }
}
function Hd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Ve(e)) {
    const a = (u) => {
      const c = Hd(u, t, !0);
      c && (s = !0, We(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Fe(e) && i.set(e, null), null) : (xe(o) ? o.forEach((a) => l[a] = null) : We(l, o), Fe(e) && i.set(e, l), l);
}
function Ml(e, t) {
  return !e || !Vl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, tn(t)) || Te(e, t));
}
let mt = null, jd = null;
function Jo(e) {
  const t = mt;
  return mt = e, jd = e && e.type.__scopeId || null, t;
}
function ce(e, t = mt, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && fc(-1);
    const o = Jo(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Jo(o), i._d && fc(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function fs(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: r,
    props: o,
    propsOptions: [l],
    slots: s,
    attrs: a,
    emit: u,
    render: c,
    renderCache: d,
    data: f,
    setupState: h,
    ctx: v,
    inheritAttrs: m
  } = e;
  let p, g;
  const w = Jo(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, k = b;
      p = wn(
        c.call(
          k,
          b,
          d,
          o,
          h,
          f,
          v
        )
      ), g = a;
    } else {
      const b = t;
      p = wn(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? a : Yg(a);
    }
  } catch (b) {
    Ir.length = 0, Tl(b, e, 1), p = y(Yt);
  }
  let x = p;
  if (g && m !== !1) {
    const b = Object.keys(g), { shapeFlag: k } = x;
    b.length && k & 7 && (l && b.some(Va) && (g = Kg(
      g,
      l
    )), x = Nn(x, g));
  }
  return n.dirs && (x = Nn(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), p = x, Jo(w), p;
}
const Yg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Kg = (e, t) => {
  const n = {};
  for (const i in e)
    (!Va(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function Xg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? Zu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== i[f] && !Ml(u, f))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? Zu(i, l, u) : !0 : !!l;
  return !1;
}
function Zu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !Ml(n, o))
      return !0;
  }
  return !1;
}
function Zg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const zd = "components", Jg = "directives", Qg = Symbol.for("v-ndc");
function e0(e) {
  return Xe(e) && Gd(zd, e, !1) || e;
}
function cn(e) {
  return Gd(Jg, e);
}
function Gd(e, t, n = !0, i = !1) {
  const r = mt || rt;
  if (r) {
    const o = r.type;
    if (e === zd) {
      const s = q0(
        o,
        !1
      );
      if (s && (s === t || s === yt(t) || s === Fn(yt(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ju(r[e] || o[e], t) || // global registration
      Ju(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function Ju(e, t) {
  return e && (e[t] || e[yt(t)] || e[Fn(yt(t))]);
}
const t0 = (e) => e.__isSuspense;
function n0(e, t) {
  t && t.pendingBranch ? xe(e) ? t.effects.push(...e) : t.effects.push(e) : Ug(e);
}
const i0 = Symbol.for("v-scx"), r0 = () => ze(i0);
function Cn(e, t) {
  return za(e, null, t);
}
const _o = {};
function we(e, t, n) {
  return za(e, t, n);
}
function za(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = He) {
  if (t && o) {
    const E = t;
    t = (...S) => {
      E(...S), k();
    };
  }
  const a = rt, u = (E) => i === !0 ? E : (
    // for deep: false, only traverse root-level properties
    gi(E, i === !1 ? 1 : void 0)
  );
  let c, d = !1, f = !1;
  if (qe(e) ? (c = () => e.value, d = Zo(e)) : Ki(e) ? (c = () => u(e), d = !0) : xe(e) ? (f = !0, d = e.some((E) => Ki(E) || Zo(E)), c = () => e.map((E) => {
    if (qe(E))
      return E.value;
    if (Ki(E))
      return u(E);
    if (Ve(E))
      return ti(E, a, 2);
  })) : Ve(e) ? t ? c = () => ti(e, a, 2) : c = () => (h && h(), qt(
    e,
    a,
    3,
    [v]
  )) : c = Ut, t && i) {
    const E = c;
    c = () => gi(E());
  }
  let h, v = (E) => {
    h = x.onStop = () => {
      ti(E, a, 4), h = x.onStop = void 0;
    };
  }, m;
  if (Bl)
    if (v = Ut, t ? n && qt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const E = r0();
      m = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return Ut;
  let p = f ? new Array(e.length).fill(_o) : _o;
  const g = () => {
    if (!(!x.active || !x.dirty))
      if (t) {
        const E = x.run();
        (i || d || (f ? E.some((S, P) => ni(S, p[P])) : ni(E, p))) && (h && h(), qt(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          p === _o ? void 0 : f && p[0] === _o ? [] : p,
          v
        ]), p = E);
      } else
        x.run();
  };
  g.allowRecurse = !!t;
  let w;
  r === "sync" ? w = g : r === "post" ? w = () => St(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), w = () => ja(g));
  const x = new Aa(c, Ut, w), b = mg(), k = () => {
    x.stop(), b && La(b.effects, x);
  };
  return t ? n ? g() : p = x.run() : r === "post" ? St(
    x.run.bind(x),
    a && a.suspense
  ) : x.run(), m && m.push(k), k;
}
function o0(e, t, n) {
  const i = this.proxy, r = Xe(e) ? e.includes(".") ? Ud(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Ve(t) ? o = t : (o = t.handler, n = t);
  const l = to(this), s = za(r, o.bind(i), n);
  return l(), s;
}
function Ud(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function gi(e, t, n = 0, i) {
  if (!Fe(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), qe(e))
    gi(e.value, t, n, i);
  else if (xe(e))
    for (let r = 0; r < e.length; r++)
      gi(e[r], t, n, i);
  else if (fd(e) || Yi(e))
    e.forEach((r) => {
      gi(r, t, n, i);
    });
  else if (vd(e))
    for (const r in e)
      gi(e[r], t, n, i);
  return e;
}
function je(e, t) {
  if (mt === null)
    return e;
  const n = Fl(mt) || mt.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = He] = t[r];
    o && (Ve(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && gi(l), i.push({
      dir: o,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: s,
      modifiers: a
    }));
  }
  return e;
}
function ai(e, t, n, i) {
  const r = e.dirs, o = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    o && (s.oldValue = o[l].value);
    let a = s.dir[i];
    a && (Ii(), qt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), Ti());
  }
}
const Xn = Symbol("_leaveCb"), ko = Symbol("_enterCb");
function Wd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return fn(() => {
    e.isMounted = !0;
  }), dn(() => {
    e.isUnmounting = !0;
  }), e;
}
const zt = [Function, Array], qd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: zt,
  onEnter: zt,
  onAfterEnter: zt,
  onEnterCancelled: zt,
  // leave
  onBeforeLeave: zt,
  onLeave: zt,
  onAfterLeave: zt,
  onLeaveCancelled: zt,
  // appear
  onBeforeAppear: zt,
  onAppear: zt,
  onAfterAppear: zt,
  onAppearCancelled: zt
}, l0 = {
  name: "BaseTransition",
  props: qd,
  setup(e, { slots: t }) {
    const n = Ka(), i = Wd();
    return () => {
      const r = t.default && Ga(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const f of r)
          if (f.type !== Yt) {
            o = f;
            break;
          }
      }
      const l = _e(e), { mode: s } = l;
      if (i.isLeaving)
        return ds(o);
      const a = Qu(o);
      if (!a)
        return ds(o);
      const u = Rr(
        a,
        l,
        i,
        n
      );
      Or(a, u);
      const c = n.subTree, d = c && Qu(c);
      if (d && d.type !== Yt && !mi(a, d)) {
        const f = Rr(
          d,
          l,
          i,
          n
        );
        if (Or(d, f), s === "out-in")
          return i.isLeaving = !0, f.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, ds(o);
        s === "in-out" && a.type !== Yt && (f.delayLeave = (h, v, m) => {
          const p = Yd(
            i,
            d
          );
          p[String(d.key)] = d, h[Xn] = () => {
            v(), h[Xn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, s0 = l0;
function Yd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function Rr(e, t, n, i) {
  const {
    appear: r,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: s,
    onEnter: a,
    onAfterEnter: u,
    onEnterCancelled: c,
    onBeforeLeave: d,
    onLeave: f,
    onAfterLeave: h,
    onLeaveCancelled: v,
    onBeforeAppear: m,
    onAppear: p,
    onAfterAppear: g,
    onAppearCancelled: w
  } = t, x = String(e.key), b = Yd(n, e), k = (P, $) => {
    P && qt(
      P,
      i,
      9,
      $
    );
  }, E = (P, $) => {
    const R = $[1];
    k(P, $), xe(P) ? P.every((D) => D.length <= 1) && R() : P.length <= 1 && R();
  }, S = {
    mode: o,
    persisted: l,
    beforeEnter(P) {
      let $ = s;
      if (!n.isMounted)
        if (r)
          $ = m || s;
        else
          return;
      P[Xn] && P[Xn](
        !0
        /* cancelled */
      );
      const R = b[x];
      R && mi(e, R) && R.el[Xn] && R.el[Xn](), k($, [P]);
    },
    enter(P) {
      let $ = a, R = u, D = c;
      if (!n.isMounted)
        if (r)
          $ = p || a, R = g || u, D = w || c;
        else
          return;
      let L = !1;
      const I = P[ko] = (_) => {
        L || (L = !0, _ ? k(D, [P]) : k(R, [P]), S.delayedLeave && S.delayedLeave(), P[ko] = void 0);
      };
      $ ? E($, [P, I]) : I();
    },
    leave(P, $) {
      const R = String(e.key);
      if (P[ko] && P[ko](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      k(d, [P]);
      let D = !1;
      const L = P[Xn] = (I) => {
        D || (D = !0, $(), I ? k(v, [P]) : k(h, [P]), P[Xn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, f ? E(f, [P, L]) : L();
    },
    clone(P) {
      return Rr(P, t, n, i);
    }
  };
  return S;
}
function ds(e) {
  if (Al(e))
    return e = Nn(e), e.children = null, e;
}
function Qu(e) {
  return Al(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Or(e, t) {
  e.shapeFlag & 6 && e.component ? Or(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ga(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Le ? (l.patchFlag & 128 && r++, i = i.concat(
      Ga(l.children, t, s)
    )) : (t || l.type !== Yt) && i.push(s != null ? Nn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Mi(e, t) {
  return Ve(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    We({ name: e.name }, t, { setup: e })
  ) : e;
}
const Bo = (e) => !!e.type.__asyncLoader, Al = (e) => e.type.__isKeepAlive;
function a0(e, t) {
  Kd(e, "a", t);
}
function u0(e, t) {
  Kd(e, "da", t);
}
function Kd(e, t, n = rt) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if ($l(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Al(r.parent.vnode) && c0(i, t, n, r), r = r.parent;
  }
}
function c0(e, t, n, i) {
  const r = $l(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  Rl(() => {
    La(i[t], r);
  }, n);
}
function $l(e, t, n = rt, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      Ii();
      const s = to(n), a = qt(t, n, e, l);
      return s(), Ti(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const Dn = (e) => (t, n = rt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Bl || e === "sp") && $l(e, (...i) => t(...i), n)
), Nl = Dn("bm"), fn = Dn("m"), f0 = Dn("bu"), Xd = Dn("u"), dn = Dn("bum"), Rl = Dn("um"), d0 = Dn("sp"), h0 = Dn(
  "rtg"
), v0 = Dn(
  "rtc"
);
function m0(e, t = rt) {
  $l("ec", e, t);
}
function ec(e, t, n, i) {
  let r;
  const o = n;
  if (xe(e) || Xe(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (Fe(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, s) => t(l, s, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let s = 0, a = l.length; s < a; s++) {
        const u = l[s];
        r[s] = t(e[u], u, s, o);
      }
    }
  else
    r = [];
  return r;
}
const js = (e) => e ? ah(e) ? Fl(e) || e.proxy : js(e.parent) : null, Vr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ We(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => js(e.parent),
    $root: (e) => js(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ua(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ja(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ze.bind(e.proxy)),
    $watch: (e) => o0.bind(e)
  })
), hs = (e, t) => e !== He && !e.__isScriptSetup && Te(e, t), g0 = {
  get({ _: e }, t) {
    const { ctx: n, setupState: i, data: r, props: o, accessCache: l, type: s, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const h = l[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return i[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (hs(i, t))
          return l[t] = 1, i[t];
        if (r !== He && Te(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Te(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== He && Te(n, t))
          return l[t] = 4, n[t];
        zs && (l[t] = 0);
      }
    }
    const c = Vr[t];
    let d, f;
    if (c)
      return t === "$attrs" && Vt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== He && Te(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Te(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return hs(r, t) ? (r[t] = n, !0) : i !== He && Te(i, t) ? (i[t] = n, !0) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== He && Te(e, l) || hs(t, l) || (s = o[0]) && Te(s, l) || Te(i, l) || Te(Vr, l) || Te(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function tc(e) {
  return xe(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let zs = !0;
function y0(e) {
  const t = Ua(e), n = e.proxy, i = e.ctx;
  zs = !1, t.beforeCreate && nc(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: l,
    watch: s,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: d,
    mounted: f,
    beforeUpdate: h,
    updated: v,
    activated: m,
    deactivated: p,
    beforeDestroy: g,
    beforeUnmount: w,
    destroyed: x,
    unmounted: b,
    render: k,
    renderTracked: E,
    renderTriggered: S,
    errorCaptured: P,
    serverPrefetch: $,
    // public API
    expose: R,
    inheritAttrs: D,
    // assets
    components: L,
    directives: I,
    filters: _
  } = t;
  if (u && p0(u, i, null), l)
    for (const j in l) {
      const N = l[j];
      Ve(N) && (i[j] = N.bind(n));
    }
  if (r) {
    const j = r.call(n, n);
    Fe(j) && (e.data = un(j));
  }
  if (zs = !0, o)
    for (const j in o) {
      const N = o[j], F = Ve(N) ? N.bind(n, n) : Ve(N.get) ? N.get.bind(n, n) : Ut, B = !Ve(N) && Ve(N.set) ? N.set.bind(n) : Ut, H = C({
        get: F,
        set: B
      });
      Object.defineProperty(i, j, {
        enumerable: !0,
        configurable: !0,
        get: () => H.value,
        set: (Y) => H.value = Y
      });
    }
  if (s)
    for (const j in s)
      Zd(s[j], i, n, j);
  if (a) {
    const j = Ve(a) ? a.call(n) : a;
    Reflect.ownKeys(j).forEach((N) => {
      ct(N, j[N]);
    });
  }
  c && nc(c, e, "c");
  function M(j, N) {
    xe(N) ? N.forEach((F) => j(F.bind(n))) : N && j(N.bind(n));
  }
  if (M(Nl, d), M(fn, f), M(f0, h), M(Xd, v), M(a0, m), M(u0, p), M(m0, P), M(v0, E), M(h0, S), M(dn, w), M(Rl, b), M(d0, $), xe(R))
    if (R.length) {
      const j = e.exposed || (e.exposed = {});
      R.forEach((N) => {
        Object.defineProperty(j, N, {
          get: () => n[N],
          set: (F) => n[N] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === Ut && (e.render = k), D != null && (e.inheritAttrs = D), L && (e.components = L), I && (e.directives = I);
}
function p0(e, t, n = Ut) {
  xe(e) && (e = Gs(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Fe(r) ? "default" in r ? o = ze(
      r.from || i,
      r.default,
      !0
    ) : o = ze(r.from || i) : o = ze(r), qe(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function nc(e, t, n) {
  qt(
    xe(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Zd(e, t, n, i) {
  const r = i.includes(".") ? Ud(n, i) : () => n[i];
  if (Xe(e)) {
    const o = t[e];
    Ve(o) && we(r, o);
  } else if (Ve(e))
    we(r, e.bind(n));
  else if (Fe(e))
    if (xe(e))
      e.forEach((o) => Zd(o, t, n, i));
    else {
      const o = Ve(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ve(o) && we(r, o, e);
    }
}
function Ua(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => Qo(a, u, l, !0)
  ), Qo(a, t, l)), Fe(t) && o.set(t, a), a;
}
function Qo(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && Qo(e, o, n, !0), r && r.forEach(
    (l) => Qo(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = b0[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const b0 = {
  data: ic,
  props: rc,
  emits: rc,
  // objects
  methods: _r,
  computed: _r,
  // lifecycle
  beforeCreate: ft,
  created: ft,
  beforeMount: ft,
  mounted: ft,
  beforeUpdate: ft,
  updated: ft,
  beforeDestroy: ft,
  beforeUnmount: ft,
  destroyed: ft,
  unmounted: ft,
  activated: ft,
  deactivated: ft,
  errorCaptured: ft,
  serverPrefetch: ft,
  // assets
  components: _r,
  directives: _r,
  // watch
  watch: x0,
  // provide / inject
  provide: ic,
  inject: w0
};
function ic(e, t) {
  return t ? e ? function() {
    return We(
      Ve(e) ? e.call(this, this) : e,
      Ve(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function w0(e, t) {
  return _r(Gs(e), Gs(t));
}
function Gs(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ft(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function _r(e, t) {
  return e ? We(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function rc(e, t) {
  return e ? xe(e) && xe(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : We(
    /* @__PURE__ */ Object.create(null),
    tc(e),
    tc(t ?? {})
  ) : t;
}
function x0(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = We(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = ft(e[i], t[i]);
  return n;
}
function Jd() {
  return {
    app: null,
    config: {
      isNativeTag: ng,
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
let _0 = 0;
function k0(e, t) {
  return function(i, r = null) {
    Ve(i) || (i = We({}, i)), r != null && !Fe(r) && (r = null);
    const o = Jd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: _0++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: K0,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && Ve(u.install) ? (l.add(u), u.install(a, ...c)) : Ve(u) && (l.add(u), u(a, ...c))), a;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), a;
      },
      component(u, c) {
        return c ? (o.components[u] = c, a) : o.components[u];
      },
      directive(u, c) {
        return c ? (o.directives[u] = c, a) : o.directives[u];
      },
      mount(u, c, d) {
        if (!s) {
          const f = y(i, r);
          return f.appContext = o, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, Fl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Lr;
        Lr = a;
        try {
          return u();
        } finally {
          Lr = c;
        }
      }
    };
    return a;
  };
}
let Lr = null;
function ct(e, t) {
  if (rt) {
    let n = rt.provides;
    const i = rt.parent && rt.parent.provides;
    i === n && (n = rt.provides = Object.create(i)), n[e] = t;
  }
}
function ze(e, t, n = !1) {
  const i = rt || mt;
  if (i || Lr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : Lr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Ve(t) ? t.call(i && i.proxy) : t;
  }
}
function S0(e, t, n, i = !1) {
  const r = {}, o = {};
  Ko(o, Ol, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Qd(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : Rg(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function C0(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = _e(r), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (i || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const c = e.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let f = c[d];
        if (Ml(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Te(o, f))
            h !== o[f] && (o[f] = h, u = !0);
          else {
            const v = yt(f);
            r[v] = Us(
              a,
              s,
              v,
              h,
              e,
              !1
            );
          }
        else
          h !== o[f] && (o[f] = h, u = !0);
      }
    }
  } else {
    Qd(e, t, r, o) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Te(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = tn(d)) === d || !Te(t, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[d] = Us(
        a,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete r[d]);
    if (o !== s)
      for (const d in o)
        (!t || !Te(t, d)) && (delete o[d], u = !0);
  }
  u && $n(e, "set", "$attrs");
}
function Qd(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (Er(a))
        continue;
      const u = t[a];
      let c;
      r && Te(r, c = yt(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : Ml(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = _e(n), u = s || He;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      n[d] = Us(
        r,
        a,
        d,
        u[d],
        e,
        !Te(u, d)
      );
    }
  }
  return l;
}
function Us(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Te(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Ve(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = to(r);
          i = u[n] = a.call(
            null,
            t
          ), c();
        }
      } else
        i = a;
    }
    l[
      0
      /* shouldCast */
    ] && (o && !s ? i = !1 : l[
      1
      /* shouldCastTrue */
    ] && (i === "" || i === tn(n)) && (i = !0));
  }
  return i;
}
function eh(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Ve(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = eh(d, t, !0);
      We(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Fe(e) && i.set(e, qi), qi;
  if (xe(o))
    for (let c = 0; c < o.length; c++) {
      const d = yt(o[c]);
      oc(d) && (l[d] = He);
    }
  else if (o)
    for (const c in o) {
      const d = yt(c);
      if (oc(d)) {
        const f = o[c], h = l[d] = xe(f) || Ve(f) ? { type: f } : We({}, f);
        if (h) {
          const v = ac(Boolean, h.type), m = ac(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Te(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Fe(e) && i.set(e, u), u;
}
function oc(e) {
  return e[0] !== "$" && !Er(e);
}
function lc(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function sc(e, t) {
  return lc(e) === lc(t);
}
function ac(e, t) {
  return xe(t) ? t.findIndex((n) => sc(n, e)) : Ve(t) && sc(t, e) ? 0 : -1;
}
const th = (e) => e[0] === "_" || e === "$stable", Wa = (e) => xe(e) ? e.map(wn) : [wn(e)], E0 = (e, t, n) => {
  if (t._n)
    return t;
  const i = ce((...r) => Wa(t(...r)), n);
  return i._c = !1, i;
}, nh = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (th(r))
      continue;
    const o = e[r];
    if (Ve(o))
      t[r] = E0(r, o, i);
    else if (o != null) {
      const l = Wa(o);
      t[r] = () => l;
    }
  }
}, ih = (e, t) => {
  const n = Wa(t);
  e.slots.default = () => n;
}, V0 = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = _e(t), Ko(t, "_", n)) : nh(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && ih(e, t);
  Ko(e.slots, Ol, 1);
}, L0 = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = He;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (We(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, nh(t, r)), l = t;
  } else t && (ih(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !th(s) && l[s] == null && delete r[s];
};
function Ws(e, t, n, i, r = !1) {
  if (xe(e)) {
    e.forEach(
      (f, h) => Ws(
        f,
        t && (xe(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (Bo(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? Fl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === He ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (Xe(u) ? (c[u] = null, Te(d, u) && (d[u] = null)) : qe(u) && (u.value = null)), Ve(a))
    ti(a, s, 12, [l, c]);
  else {
    const f = Xe(a), h = qe(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const m = f ? Te(d, a) ? d[a] : c[a] : a.value;
          r ? xe(m) && La(m, o) : xe(m) ? m.includes(o) || m.push(o) : f ? (c[a] = [o], Te(d, a) && (d[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else f ? (c[a] = l, Te(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, St(v, n)) : v();
    }
  }
}
const St = n0;
function P0(e) {
  return I0(e);
}
function I0(e, t) {
  const n = md();
  n.__VUE__ = !0;
  const {
    insert: i,
    remove: r,
    patchProp: o,
    createElement: l,
    createText: s,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: d,
    nextSibling: f,
    setScopeId: h = Ut,
    insertStaticContent: v
  } = e, m = (V, A, U, K = null, X = null, ie = null, oe = void 0, ne = null, re = !!A.dynamicChildren) => {
    if (V === A)
      return;
    V && !mi(V, A) && (K = le(V), Y(V, X, ie, !0), V = null), A.patchFlag === -2 && (re = !1, A.dynamicChildren = null);
    const { type: ee, ref: ue, shapeFlag: pe } = A;
    switch (ee) {
      case eo:
        p(V, A, U, K);
        break;
      case Yt:
        g(V, A, U, K);
        break;
      case ms:
        V == null && w(A, U, K, oe);
        break;
      case Le:
        L(
          V,
          A,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re
        );
        break;
      default:
        pe & 1 ? k(
          V,
          A,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re
        ) : pe & 6 ? I(
          V,
          A,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re
        ) : (pe & 64 || pe & 128) && ee.process(
          V,
          A,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re,
          Ue
        );
    }
    ue != null && X && Ws(ue, V && V.ref, ie, A || V, !A);
  }, p = (V, A, U, K) => {
    if (V == null)
      i(
        A.el = s(A.children),
        U,
        K
      );
    else {
      const X = A.el = V.el;
      A.children !== V.children && u(X, A.children);
    }
  }, g = (V, A, U, K) => {
    V == null ? i(
      A.el = a(A.children || ""),
      U,
      K
    ) : A.el = V.el;
  }, w = (V, A, U, K) => {
    [V.el, V.anchor] = v(
      V.children,
      A,
      U,
      K,
      V.el,
      V.anchor
    );
  }, x = ({ el: V, anchor: A }, U, K) => {
    let X;
    for (; V && V !== A; )
      X = f(V), i(V, U, K), V = X;
    i(A, U, K);
  }, b = ({ el: V, anchor: A }) => {
    let U;
    for (; V && V !== A; )
      U = f(V), r(V), V = U;
    r(A);
  }, k = (V, A, U, K, X, ie, oe, ne, re) => {
    A.type === "svg" ? oe = "svg" : A.type === "math" && (oe = "mathml"), V == null ? E(
      A,
      U,
      K,
      X,
      ie,
      oe,
      ne,
      re
    ) : $(
      V,
      A,
      X,
      ie,
      oe,
      ne,
      re
    );
  }, E = (V, A, U, K, X, ie, oe, ne) => {
    let re, ee;
    const { props: ue, shapeFlag: pe, transition: ge, dirs: Se } = V;
    if (re = V.el = l(
      V.type,
      ie,
      ue && ue.is,
      ue
    ), pe & 8 ? c(re, V.children) : pe & 16 && P(
      V.children,
      re,
      null,
      K,
      X,
      vs(V, ie),
      oe,
      ne
    ), Se && ai(V, null, K, "created"), S(re, V, V.scopeId, oe, K), ue) {
      for (const $e in ue)
        $e !== "value" && !Er($e) && o(
          re,
          $e,
          null,
          ue[$e],
          ie,
          V.children,
          K,
          X,
          J
        );
      "value" in ue && o(re, "value", null, ue.value, ie), (ee = ue.onVnodeBeforeMount) && pn(ee, K, V);
    }
    Se && ai(V, null, K, "beforeMount");
    const Pe = T0(X, ge);
    Pe && ge.beforeEnter(re), i(re, A, U), ((ee = ue && ue.onVnodeMounted) || Pe || Se) && St(() => {
      ee && pn(ee, K, V), Pe && ge.enter(re), Se && ai(V, null, K, "mounted");
    }, X);
  }, S = (V, A, U, K, X) => {
    if (U && h(V, U), K)
      for (let ie = 0; ie < K.length; ie++)
        h(V, K[ie]);
    if (X) {
      let ie = X.subTree;
      if (A === ie) {
        const oe = X.vnode;
        S(
          V,
          oe,
          oe.scopeId,
          oe.slotScopeIds,
          X.parent
        );
      }
    }
  }, P = (V, A, U, K, X, ie, oe, ne, re = 0) => {
    for (let ee = re; ee < V.length; ee++) {
      const ue = V[ee] = ne ? Zn(V[ee]) : wn(V[ee]);
      m(
        null,
        ue,
        A,
        U,
        K,
        X,
        ie,
        oe,
        ne
      );
    }
  }, $ = (V, A, U, K, X, ie, oe) => {
    const ne = A.el = V.el;
    let { patchFlag: re, dynamicChildren: ee, dirs: ue } = A;
    re |= V.patchFlag & 16;
    const pe = V.props || He, ge = A.props || He;
    let Se;
    if (U && ui(U, !1), (Se = ge.onVnodeBeforeUpdate) && pn(Se, U, A, V), ue && ai(A, V, U, "beforeUpdate"), U && ui(U, !0), ee ? R(
      V.dynamicChildren,
      ee,
      ne,
      U,
      K,
      vs(A, X),
      ie
    ) : oe || N(
      V,
      A,
      ne,
      null,
      U,
      K,
      vs(A, X),
      ie,
      !1
    ), re > 0) {
      if (re & 16)
        D(
          ne,
          A,
          pe,
          ge,
          U,
          K,
          X
        );
      else if (re & 2 && pe.class !== ge.class && o(ne, "class", null, ge.class, X), re & 4 && o(ne, "style", pe.style, ge.style, X), re & 8) {
        const Pe = A.dynamicProps;
        for (let $e = 0; $e < Pe.length; $e++) {
          const Re = Pe[$e], Qe = pe[Re], Tt = ge[Re];
          (Tt !== Qe || Re === "value") && o(
            ne,
            Re,
            Qe,
            Tt,
            X,
            V.children,
            U,
            K,
            J
          );
        }
      }
      re & 1 && V.children !== A.children && c(ne, A.children);
    } else !oe && ee == null && D(
      ne,
      A,
      pe,
      ge,
      U,
      K,
      X
    );
    ((Se = ge.onVnodeUpdated) || ue) && St(() => {
      Se && pn(Se, U, A, V), ue && ai(A, V, U, "updated");
    }, K);
  }, R = (V, A, U, K, X, ie, oe) => {
    for (let ne = 0; ne < A.length; ne++) {
      const re = V[ne], ee = A[ne], ue = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        re.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (re.type === Le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !mi(re, ee) || // - In the case of a component, it could contain anything.
        re.shapeFlag & 70) ? d(re.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          U
        )
      );
      m(
        re,
        ee,
        ue,
        null,
        K,
        X,
        ie,
        oe,
        !0
      );
    }
  }, D = (V, A, U, K, X, ie, oe) => {
    if (U !== K) {
      if (U !== He)
        for (const ne in U)
          !Er(ne) && !(ne in K) && o(
            V,
            ne,
            U[ne],
            null,
            oe,
            A.children,
            X,
            ie,
            J
          );
      for (const ne in K) {
        if (Er(ne))
          continue;
        const re = K[ne], ee = U[ne];
        re !== ee && ne !== "value" && o(
          V,
          ne,
          ee,
          re,
          oe,
          A.children,
          X,
          ie,
          J
        );
      }
      "value" in K && o(V, "value", U.value, K.value, oe);
    }
  }, L = (V, A, U, K, X, ie, oe, ne, re) => {
    const ee = A.el = V ? V.el : s(""), ue = A.anchor = V ? V.anchor : s("");
    let { patchFlag: pe, dynamicChildren: ge, slotScopeIds: Se } = A;
    Se && (ne = ne ? ne.concat(Se) : Se), V == null ? (i(ee, U, K), i(ue, U, K), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      A.children || [],
      U,
      ue,
      X,
      ie,
      oe,
      ne,
      re
    )) : pe > 0 && pe & 64 && ge && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      ge,
      U,
      X,
      ie,
      oe,
      ne
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (A.key != null || X && A === X.subTree) && qa(
      V,
      A,
      !0
      /* shallow */
    )) : N(
      V,
      A,
      U,
      ue,
      X,
      ie,
      oe,
      ne,
      re
    );
  }, I = (V, A, U, K, X, ie, oe, ne, re) => {
    A.slotScopeIds = ne, V == null ? A.shapeFlag & 512 ? X.ctx.activate(
      A,
      U,
      K,
      oe,
      re
    ) : _(
      A,
      U,
      K,
      X,
      ie,
      oe,
      re
    ) : O(V, A, re);
  }, _ = (V, A, U, K, X, ie, oe) => {
    const ne = V.component = j0(
      V,
      K,
      X
    );
    if (Al(V) && (ne.ctx.renderer = Ue), z0(ne), ne.asyncDep) {
      if (X && X.registerDep(ne, M), !V.el) {
        const re = ne.subTree = y(Yt);
        g(null, re, A, U);
      }
    } else
      M(
        ne,
        V,
        A,
        U,
        X,
        ie,
        oe
      );
  }, O = (V, A, U) => {
    const K = A.component = V.component;
    if (Xg(V, A, U))
      if (K.asyncDep && !K.asyncResolved) {
        j(K, A, U);
        return;
      } else
        K.next = A, Gg(K.update), K.effect.dirty = !0, K.update();
    else
      A.el = V.el, K.vnode = A;
  }, M = (V, A, U, K, X, ie, oe) => {
    const ne = () => {
      if (V.isMounted) {
        let { next: ue, bu: pe, u: ge, parent: Se, vnode: Pe } = V;
        {
          const Gn = rh(V);
          if (Gn) {
            ue && (ue.el = Pe.el, j(V, ue, oe)), Gn.asyncDep.then(() => {
              V.isUnmounted || ne();
            });
            return;
          }
        }
        let $e = ue, Re;
        ui(V, !1), ue ? (ue.el = Pe.el, j(V, ue, oe)) : ue = Pe, pe && us(pe), (Re = ue.props && ue.props.onVnodeBeforeUpdate) && pn(Re, Se, ue, Pe), ui(V, !0);
        const Qe = fs(V), Tt = V.subTree;
        V.subTree = Qe, m(
          Tt,
          Qe,
          // parent may have changed if it's in a teleport
          d(Tt.el),
          // anchor may have changed if it's in a fragment
          le(Tt),
          V,
          X,
          ie
        ), ue.el = Qe.el, $e === null && Zg(V, Qe.el), ge && St(ge, X), (Re = ue.props && ue.props.onVnodeUpdated) && St(
          () => pn(Re, Se, ue, Pe),
          X
        );
      } else {
        let ue;
        const { el: pe, props: ge } = A, { bm: Se, m: Pe, parent: $e } = V, Re = Bo(A);
        if (ui(V, !1), Se && us(Se), !Re && (ue = ge && ge.onVnodeBeforeMount) && pn(ue, $e, A), ui(V, !0), pe && yn) {
          const Qe = () => {
            V.subTree = fs(V), yn(
              pe,
              V.subTree,
              V,
              X,
              null
            );
          };
          Re ? A.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && Qe()
          ) : Qe();
        } else {
          const Qe = V.subTree = fs(V);
          m(
            null,
            Qe,
            U,
            K,
            V,
            X,
            ie
          ), A.el = Qe.el;
        }
        if (Pe && St(Pe, X), !Re && (ue = ge && ge.onVnodeMounted)) {
          const Qe = A;
          St(
            () => pn(ue, $e, Qe),
            X
          );
        }
        (A.shapeFlag & 256 || $e && Bo($e.vnode) && $e.vnode.shapeFlag & 256) && V.a && St(V.a, X), V.isMounted = !0, A = U = K = null;
      }
    }, re = V.effect = new Aa(
      ne,
      Ut,
      () => ja(ee),
      V.scope
      // track it in component's effect scope
    ), ee = V.update = () => {
      re.dirty && re.run();
    };
    ee.id = V.uid, ui(V, !0), ee();
  }, j = (V, A, U) => {
    A.component = V;
    const K = V.vnode.props;
    V.vnode = A, V.next = null, C0(V, A.props, K, U), L0(V, A.children, U), Ii(), Xu(V), Ti();
  }, N = (V, A, U, K, X, ie, oe, ne, re = !1) => {
    const ee = V && V.children, ue = V ? V.shapeFlag : 0, pe = A.children, { patchFlag: ge, shapeFlag: Se } = A;
    if (ge > 0) {
      if (ge & 128) {
        B(
          ee,
          pe,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re
        );
        return;
      } else if (ge & 256) {
        F(
          ee,
          pe,
          U,
          K,
          X,
          ie,
          oe,
          ne,
          re
        );
        return;
      }
    }
    Se & 8 ? (ue & 16 && J(ee, X, ie), pe !== ee && c(U, pe)) : ue & 16 ? Se & 16 ? B(
      ee,
      pe,
      U,
      K,
      X,
      ie,
      oe,
      ne,
      re
    ) : J(ee, X, ie, !0) : (ue & 8 && c(U, ""), Se & 16 && P(
      pe,
      U,
      K,
      X,
      ie,
      oe,
      ne,
      re
    ));
  }, F = (V, A, U, K, X, ie, oe, ne, re) => {
    V = V || qi, A = A || qi;
    const ee = V.length, ue = A.length, pe = Math.min(ee, ue);
    let ge;
    for (ge = 0; ge < pe; ge++) {
      const Se = A[ge] = re ? Zn(A[ge]) : wn(A[ge]);
      m(
        V[ge],
        Se,
        U,
        null,
        X,
        ie,
        oe,
        ne,
        re
      );
    }
    ee > ue ? J(
      V,
      X,
      ie,
      !0,
      !1,
      pe
    ) : P(
      A,
      U,
      K,
      X,
      ie,
      oe,
      ne,
      re,
      pe
    );
  }, B = (V, A, U, K, X, ie, oe, ne, re) => {
    let ee = 0;
    const ue = A.length;
    let pe = V.length - 1, ge = ue - 1;
    for (; ee <= pe && ee <= ge; ) {
      const Se = V[ee], Pe = A[ee] = re ? Zn(A[ee]) : wn(A[ee]);
      if (mi(Se, Pe))
        m(
          Se,
          Pe,
          U,
          null,
          X,
          ie,
          oe,
          ne,
          re
        );
      else
        break;
      ee++;
    }
    for (; ee <= pe && ee <= ge; ) {
      const Se = V[pe], Pe = A[ge] = re ? Zn(A[ge]) : wn(A[ge]);
      if (mi(Se, Pe))
        m(
          Se,
          Pe,
          U,
          null,
          X,
          ie,
          oe,
          ne,
          re
        );
      else
        break;
      pe--, ge--;
    }
    if (ee > pe) {
      if (ee <= ge) {
        const Se = ge + 1, Pe = Se < ue ? A[Se].el : K;
        for (; ee <= ge; )
          m(
            null,
            A[ee] = re ? Zn(A[ee]) : wn(A[ee]),
            U,
            Pe,
            X,
            ie,
            oe,
            ne,
            re
          ), ee++;
      }
    } else if (ee > ge)
      for (; ee <= pe; )
        Y(V[ee], X, ie, !0), ee++;
    else {
      const Se = ee, Pe = ee, $e = /* @__PURE__ */ new Map();
      for (ee = Pe; ee <= ge; ee++) {
        const lt = A[ee] = re ? Zn(A[ee]) : wn(A[ee]);
        lt.key != null && $e.set(lt.key, ee);
      }
      let Re, Qe = 0;
      const Tt = ge - Pe + 1;
      let Gn = !1, mo = 0;
      const Un = new Array(Tt);
      for (ee = 0; ee < Tt; ee++)
        Un[ee] = 0;
      for (ee = Se; ee <= pe; ee++) {
        const lt = V[ee];
        if (Qe >= Tt) {
          Y(lt, X, ie, !0);
          continue;
        }
        let Mt;
        if (lt.key != null)
          Mt = $e.get(lt.key);
        else
          for (Re = Pe; Re <= ge; Re++)
            if (Un[Re - Pe] === 0 && mi(lt, A[Re])) {
              Mt = Re;
              break;
            }
        Mt === void 0 ? Y(lt, X, ie, !0) : (Un[Mt - Pe] = ee + 1, Mt >= mo ? mo = Mt : Gn = !0, m(
          lt,
          A[Mt],
          U,
          null,
          X,
          ie,
          oe,
          ne,
          re
        ), Qe++);
      }
      const go = Gn ? M0(Un) : qi;
      for (Re = go.length - 1, ee = Tt - 1; ee >= 0; ee--) {
        const lt = Pe + ee, Mt = A[lt], vr = lt + 1 < ue ? A[lt + 1].el : K;
        Un[ee] === 0 ? m(
          null,
          Mt,
          U,
          vr,
          X,
          ie,
          oe,
          ne,
          re
        ) : Gn && (Re < 0 || ee !== go[Re] ? H(Mt, U, vr, 2) : Re--);
      }
    }
  }, H = (V, A, U, K, X = null) => {
    const { el: ie, type: oe, transition: ne, children: re, shapeFlag: ee } = V;
    if (ee & 6) {
      H(V.component.subTree, A, U, K);
      return;
    }
    if (ee & 128) {
      V.suspense.move(A, U, K);
      return;
    }
    if (ee & 64) {
      oe.move(V, A, U, Ue);
      return;
    }
    if (oe === Le) {
      i(ie, A, U);
      for (let pe = 0; pe < re.length; pe++)
        H(re[pe], A, U, K);
      i(V.anchor, A, U);
      return;
    }
    if (oe === ms) {
      x(V, A, U);
      return;
    }
    if (K !== 2 && ee & 1 && ne)
      if (K === 0)
        ne.beforeEnter(ie), i(ie, A, U), St(() => ne.enter(ie), X);
      else {
        const { leave: pe, delayLeave: ge, afterLeave: Se } = ne, Pe = () => i(ie, A, U), $e = () => {
          pe(ie, () => {
            Pe(), Se && Se();
          });
        };
        ge ? ge(ie, Pe, $e) : $e();
      }
    else
      i(ie, A, U);
  }, Y = (V, A, U, K = !1, X = !1) => {
    const {
      type: ie,
      props: oe,
      ref: ne,
      children: re,
      dynamicChildren: ee,
      shapeFlag: ue,
      patchFlag: pe,
      dirs: ge
    } = V;
    if (ne != null && Ws(ne, null, U, V, !0), ue & 256) {
      A.ctx.deactivate(V);
      return;
    }
    const Se = ue & 1 && ge, Pe = !Bo(V);
    let $e;
    if (Pe && ($e = oe && oe.onVnodeBeforeUnmount) && pn($e, A, V), ue & 6)
      fe(V.component, U, K);
    else {
      if (ue & 128) {
        V.suspense.unmount(U, K);
        return;
      }
      Se && ai(V, null, A, "beforeUnmount"), ue & 64 ? V.type.remove(
        V,
        A,
        U,
        X,
        Ue,
        K
      ) : ee && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ie !== Le || pe > 0 && pe & 64) ? J(
        ee,
        A,
        U,
        !1,
        !0
      ) : (ie === Le && pe & 384 || !X && ue & 16) && J(re, A, U), K && Q(V);
    }
    (Pe && ($e = oe && oe.onVnodeUnmounted) || Se) && St(() => {
      $e && pn($e, A, V), Se && ai(V, null, A, "unmounted");
    }, U);
  }, Q = (V) => {
    const { type: A, el: U, anchor: K, transition: X } = V;
    if (A === Le) {
      se(U, K);
      return;
    }
    if (A === ms) {
      b(V);
      return;
    }
    const ie = () => {
      r(U), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (V.shapeFlag & 1 && X && !X.persisted) {
      const { leave: oe, delayLeave: ne } = X, re = () => oe(U, ie);
      ne ? ne(V.el, ie, re) : re();
    } else
      ie();
  }, se = (V, A) => {
    let U;
    for (; V !== A; )
      U = f(V), r(V), V = U;
    r(A);
  }, fe = (V, A, U) => {
    const { bum: K, scope: X, update: ie, subTree: oe, um: ne } = V;
    K && us(K), X.stop(), ie && (ie.active = !1, Y(oe, V, A, U)), ne && St(ne, A), St(() => {
      V.isUnmounted = !0;
    }, A), A && A.pendingBranch && !A.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === A.pendingId && (A.deps--, A.deps === 0 && A.resolve());
  }, J = (V, A, U, K = !1, X = !1, ie = 0) => {
    for (let oe = ie; oe < V.length; oe++)
      Y(V[oe], A, U, K, X);
  }, le = (V) => V.shapeFlag & 6 ? le(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : f(V.anchor || V.el);
  let Ee = !1;
  const De = (V, A, U) => {
    V == null ? A._vnode && Y(A._vnode, null, null, !0) : m(
      A._vnode || null,
      V,
      A,
      null,
      null,
      null,
      U
    ), Ee || (Ee = !0, Xu(), Fd(), Ee = !1), A._vnode = V;
  }, Ue = {
    p: m,
    um: Y,
    m: H,
    r: Q,
    mt: _,
    mc: P,
    pc: N,
    pbc: R,
    n: le,
    o: e
  };
  let xt, yn;
  return {
    render: De,
    hydrate: xt,
    createApp: k0(De, xt)
  };
}
function vs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ui({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function T0(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qa(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (xe(i) && xe(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = Zn(r[o]), s.el = l.el), n || qa(l, s)), s.type === eo && (s.el = l.el);
    }
}
function M0(e) {
  const t = e.slice(), n = [0];
  let i, r, o, l, s;
  const a = e.length;
  for (i = 0; i < a; i++) {
    const u = e[i];
    if (u !== 0) {
      if (r = n[n.length - 1], e[r] < u) {
        t[i] = r, n.push(i);
        continue;
      }
      for (o = 0, l = n.length - 1; o < l; )
        s = o + l >> 1, e[n[s]] < u ? o = s + 1 : l = s;
      u < e[n[o]] && (o > 0 && (t[i] = n[o - 1]), n[o] = i);
    }
  }
  for (o = n.length, l = n[o - 1]; o-- > 0; )
    n[o] = l, l = t[l];
  return n;
}
function rh(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : rh(t);
}
const A0 = (e) => e.__isTeleport, Pr = (e) => e && (e.disabled || e.disabled === ""), uc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, cc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, qs = (e, t) => {
  const n = e && e.to;
  return Xe(n) ? t ? t(n) : null : n;
}, $0 = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: m, createComment: p }
    } = u, g = Pr(t.props);
    let { shapeFlag: w, children: x, dynamicChildren: b } = t;
    if (e == null) {
      const k = t.el = m(""), E = t.anchor = m("");
      h(k, n, i), h(E, n, i);
      const S = t.target = qs(t.props, v), P = t.targetAnchor = m("");
      S && (h(P, S), l === "svg" || uc(S) ? l = "svg" : (l === "mathml" || cc(S)) && (l = "mathml"));
      const $ = (R, D) => {
        w & 16 && c(
          x,
          R,
          D,
          r,
          o,
          l,
          s,
          a
        );
      };
      g ? $(n, E) : S && $(S, P);
    } else {
      t.el = e.el;
      const k = t.anchor = e.anchor, E = t.target = e.target, S = t.targetAnchor = e.targetAnchor, P = Pr(e.props), $ = P ? n : E, R = P ? k : S;
      if (l === "svg" || uc(E) ? l = "svg" : (l === "mathml" || cc(E)) && (l = "mathml"), b ? (f(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), qa(e, t, !0)) : a || d(
        e,
        t,
        $,
        R,
        r,
        o,
        l,
        s,
        !1
      ), g)
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : So(
          t,
          n,
          k,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const D = t.target = qs(
          t.props,
          v
        );
        D && So(
          t,
          D,
          null,
          u,
          0
        );
      } else P && So(
        t,
        E,
        S,
        u,
        1
      );
    }
    oh(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && o(c), l && o(u), s & 16) {
      const h = l || !Pr(f);
      for (let v = 0; v < a.length; v++) {
        const m = a[v];
        r(
          m,
          t,
          n,
          h,
          !!m.dynamicChildren
        );
      }
    }
  },
  move: So,
  hydrate: N0
};
function So(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = o === 2;
  if (d && i(l, t, n), (!d || Pr(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      r(
        u[f],
        t,
        n,
        2
      );
  d && i(s, t, n);
}
function N0(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = qs(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Pr(t.props))
        t.anchor = u(
          l(e),
          t,
          s(e),
          n,
          i,
          r,
          o
        ), t.targetAnchor = d;
      else {
        t.anchor = l(e);
        let f = d;
        for (; f; )
          if (f = l(f), f && f.nodeType === 8 && f.data === "teleport anchor") {
            t.targetAnchor = f, c._lpa = t.targetAnchor && l(t.targetAnchor);
            break;
          }
        u(
          d,
          t,
          c,
          n,
          i,
          r,
          o
        );
      }
    oh(t);
  }
  return t.anchor && l(t.anchor);
}
const R0 = $0;
function oh(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Le = Symbol.for("v-fgt"), eo = Symbol.for("v-txt"), Yt = Symbol.for("v-cmt"), ms = Symbol.for("v-stc"), Ir = [];
let on = null;
function ht(e = !1) {
  Ir.push(on = e ? null : []);
}
function O0() {
  Ir.pop(), on = Ir[Ir.length - 1] || null;
}
let Br = 1;
function fc(e) {
  Br += e;
}
function lh(e) {
  return e.dynamicChildren = Br > 0 ? on || qi : null, O0(), Br > 0 && on && on.push(e), e;
}
function el(e, t, n, i, r, o) {
  return lh(
    Ae(
      e,
      t,
      n,
      i,
      r,
      o,
      !0
    )
  );
}
function ln(e, t, n, i, r) {
  return lh(
    y(
      e,
      t,
      n,
      i,
      r,
      !0
    )
  );
}
function tl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mi(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ol = "__vInternal", sh = ({ key: e }) => e ?? null, Fo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Xe(e) || qe(e) || Ve(e) ? { i: mt, r: e, k: t, f: !!n } : e : null);
function Ae(e, t = null, n = null, i = 0, r = null, o = e === Le ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sh(t),
    ref: t && Fo(t),
    scopeId: jd,
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
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: i,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: mt
  };
  return s ? (Ya(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Xe(n) ? 8 : 16), Br > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  on && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && on.push(a), a;
}
const y = B0;
function B0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === Qg) && (e = Yt), tl(e)) {
    const s = Nn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ya(s, n), Br > 0 && !o && on && (s.shapeFlag & 6 ? on[on.indexOf(e)] = s : on.push(s)), s.patchFlag |= -2, s;
  }
  if (Y0(e) && (e = e.__vccOpts), t) {
    t = F0(t);
    let { class: s, style: a } = t;
    s && !Xe(s) && (t.class = Ta(s)), Fe(a) && (Id(a) && !xe(a) && (a = We({}, a)), t.style = Ia(a));
  }
  const l = Xe(e) ? 1 : t0(e) ? 128 : A0(e) ? 64 : Fe(e) ? 4 : Ve(e) ? 2 : 0;
  return Ae(
    e,
    t,
    n,
    i,
    r,
    l,
    o,
    !0
  );
}
function F0(e) {
  return e ? Id(e) || Ol in e ? We({}, e) : e : null;
}
function Nn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? he(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && sh(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? xe(r) ? r.concat(Fo(t)) : [r, Fo(t)] : Fo(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Le ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Nn(e.ssContent),
    ssFallback: e.ssFallback && Nn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function tt(e = " ", t = 0) {
  return y(eo, null, e, t);
}
function en(e = "", t = !1) {
  return t ? (ht(), ln(Yt, null, e)) : y(Yt, null, e);
}
function wn(e) {
  return e == null || typeof e == "boolean" ? y(Yt) : xe(e) ? y(
    Le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Zn(e) : y(eo, null, String(e));
}
function Zn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Nn(e);
}
function Ya(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (xe(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ya(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Ol in t) ? t._ctx = mt : r === 3 && mt && (mt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ve(t) ? (t = { default: t, _ctx: mt }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [tt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function he(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = Ta([t.class, i.class]));
      else if (r === "style")
        t.style = Ia([t.style, i.style]);
      else if (Vl(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(xe(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function pn(e, t, n, i = null) {
  qt(e, t, 7, [
    n,
    i
  ]);
}
const D0 = Jd();
let H0 = 0;
function j0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || D0, o = {
    uid: H0++,
    vnode: e,
    type: i,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new pd(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: eh(i, r),
    emitsOptions: Hd(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: He,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: He,
    data: He,
    props: He,
    attrs: He,
    slots: He,
    refs: He,
    setupState: He,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = qg.bind(null, o), e.ce && e.ce(o), o;
}
let rt = null;
const Ka = () => rt || mt;
let nl, Ys;
{
  const e = md(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  nl = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => rt = n
  ), Ys = t(
    "__VUE_SSR_SETTERS__",
    (n) => Bl = n
  );
}
const to = (e) => {
  const t = rt;
  return nl(e), e.scope.on(), () => {
    e.scope.off(), nl(t);
  };
}, dc = () => {
  rt && rt.scope.off(), nl(null);
};
function ah(e) {
  return e.vnode.shapeFlag & 4;
}
let Bl = !1;
function z0(e, t = !1) {
  t && Ys(t);
  const { props: n, children: i } = e.vnode, r = ah(e);
  S0(e, n, r, t), V0(e, i);
  const o = r ? G0(e, t) : void 0;
  return t && Ys(!1), o;
}
function G0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Td(new Proxy(e.ctx, g0));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? W0(e) : null, o = to(e);
    Ii();
    const l = ti(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (Ti(), o(), dd(l)) {
      if (l.then(dc, dc), t)
        return l.then((s) => {
          hc(e, s, t);
        }).catch((s) => {
          Tl(s, e, 0);
        });
      e.asyncDep = l;
    } else
      hc(e, l, t);
  } else
    uh(e, t);
}
function hc(e, t, n) {
  Ve(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Fe(t) && (e.setupState = Nd(t)), uh(e, n);
}
let vc;
function uh(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && vc && !i.render) {
      const r = i.template || Ua(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = We(
          We(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = vc(r, u);
      }
    }
    e.render = i.render || Ut;
  }
  {
    const r = to(e);
    Ii();
    try {
      y0(e);
    } finally {
      Ti(), r();
    }
  }
}
function U0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return Vt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function W0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return U0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Nd(Td(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Vr)
          return Vr[n](e);
      },
      has(t, n) {
        return n in t || n in Vr;
      }
    }));
}
function q0(e, t = !0) {
  return Ve(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Y0(e) {
  return Ve(e) && "__vccOpts" in e;
}
const C = (e, t) => Og(e, t, Bl);
function ri(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Fe(t) && !xe(t) ? tl(t) ? y(e, null, [t]) : y(e, t) : y(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && tl(n) && (n = [n]), y(e, t, n));
}
const K0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const X0 = "http://www.w3.org/2000/svg", Z0 = "http://www.w3.org/1998/Math/MathML", Jn = typeof document < "u" ? document : null, mc = Jn && /* @__PURE__ */ Jn.createElement("template"), J0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? Jn.createElementNS(X0, e) : t === "mathml" ? Jn.createElementNS(Z0, e) : Jn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => Jn.createTextNode(e),
  createComment: (e) => Jn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Jn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, i, r, o) {
    const l = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      mc.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = mc.content;
      if (i === "svg" || i === "mathml") {
        const a = s.firstChild;
        for (; a.firstChild; )
          s.appendChild(a.firstChild);
        s.removeChild(a);
      }
      t.insertBefore(s, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, qn = "transition", mr = "animation", nr = Symbol("_vtc"), Rn = (e, { slots: t }) => ri(s0, fh(e), t);
Rn.displayName = "Transition";
const ch = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Q0 = Rn.props = /* @__PURE__ */ We(
  {},
  qd,
  ch
), ci = (e, t = []) => {
  xe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, gc = (e) => e ? xe(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function fh(e) {
  const t = {};
  for (const L in e)
    L in ch || (t[L] = e[L]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: i,
    duration: r,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: l = `${n}-enter-active`,
    enterToClass: s = `${n}-enter-to`,
    appearFromClass: a = o,
    appearActiveClass: u = l,
    appearToClass: c = s,
    leaveFromClass: d = `${n}-leave-from`,
    leaveActiveClass: f = `${n}-leave-active`,
    leaveToClass: h = `${n}-leave-to`
  } = e, v = ey(r), m = v && v[0], p = v && v[1], {
    onBeforeEnter: g,
    onEnter: w,
    onEnterCancelled: x,
    onLeave: b,
    onLeaveCancelled: k,
    onBeforeAppear: E = g,
    onAppear: S = w,
    onAppearCancelled: P = x
  } = t, $ = (L, I, _) => {
    Yn(L, I ? c : s), Yn(L, I ? u : l), _ && _();
  }, R = (L, I) => {
    L._isLeaving = !1, Yn(L, d), Yn(L, h), Yn(L, f), I && I();
  }, D = (L) => (I, _) => {
    const O = L ? S : w, M = () => $(I, L, _);
    ci(O, [I, M]), yc(() => {
      Yn(I, L ? a : o), In(I, L ? c : s), gc(O) || pc(I, i, m, M);
    });
  };
  return We(t, {
    onBeforeEnter(L) {
      ci(g, [L]), In(L, o), In(L, l);
    },
    onBeforeAppear(L) {
      ci(E, [L]), In(L, a), In(L, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave(L, I) {
      L._isLeaving = !0;
      const _ = () => R(L, I);
      In(L, d), hh(), In(L, f), yc(() => {
        L._isLeaving && (Yn(L, d), In(L, h), gc(b) || pc(L, i, p, _));
      }), ci(b, [L, _]);
    },
    onEnterCancelled(L) {
      $(L, !1), ci(x, [L]);
    },
    onAppearCancelled(L) {
      $(L, !0), ci(P, [L]);
    },
    onLeaveCancelled(L) {
      R(L), ci(k, [L]);
    }
  });
}
function ey(e) {
  if (e == null)
    return null;
  if (Fe(e))
    return [gs(e.enter), gs(e.leave)];
  {
    const t = gs(e);
    return [t, t];
  }
}
function gs(e) {
  return Os(e);
}
function In(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[nr] || (e[nr] = /* @__PURE__ */ new Set())).add(t);
}
function Yn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[nr];
  n && (n.delete(t), n.size || (e[nr] = void 0));
}
function yc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ty = 0;
function pc(e, t, n, i) {
  const r = e._endId = ++ty, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = dh(e, t);
  if (!l)
    return i();
  const u = l + "end";
  let c = 0;
  const d = () => {
    e.removeEventListener(u, f), o();
  }, f = (h) => {
    h.target === e && ++c >= a && d();
  };
  setTimeout(() => {
    c < a && d();
  }, s + 1), e.addEventListener(u, f);
}
function dh(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${qn}Delay`), o = i(`${qn}Duration`), l = bc(r, o), s = i(`${mr}Delay`), a = i(`${mr}Duration`), u = bc(s, a);
  let c = null, d = 0, f = 0;
  t === qn ? l > 0 && (c = qn, d = l, f = o.length) : t === mr ? u > 0 && (c = mr, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? qn : mr : null, f = c ? c === qn ? o.length : a.length : 0);
  const h = c === qn && /\b(transform|all)(,|$)/.test(
    i(`${qn}Property`).toString()
  );
  return {
    type: c,
    timeout: d,
    propCount: f,
    hasTransform: h
  };
}
function bc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => wc(n) + wc(e[i])));
}
function wc(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function hh() {
  return document.body.offsetHeight;
}
function ny(e, t, n) {
  const i = e[nr];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const il = Symbol("_vod"), vh = Symbol("_vsh"), pt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[il] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : gr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), gr(e, !0), i.enter(e)) : i.leave(e, () => {
      gr(e, !1);
    }) : gr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    gr(e, t);
  }
};
function gr(e, t) {
  e.style.display = t ? e[il] : "none", e[vh] = !t;
}
const iy = Symbol(""), ry = /(^|;)\s*display\s*:/;
function oy(e, t, n) {
  const i = e.style, r = Xe(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Xe(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && Do(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && Do(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), Do(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[iy];
      l && (n += ";" + l), i.cssText = n, o = ry.test(n);
    }
  } else t && e.removeAttribute("style");
  il in e && (e[il] = o ? i.display : "", e[vh] && (i.display = "none"));
}
const xc = /\s*!important$/;
function Do(e, t, n) {
  if (xe(n))
    n.forEach((i) => Do(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = ly(e, t);
    xc.test(n) ? e.setProperty(
      tn(i),
      n.replace(xc, ""),
      "important"
    ) : e[i] = n;
  }
}
const _c = ["Webkit", "Moz", "ms"], ys = {};
function ly(e, t) {
  const n = ys[t];
  if (n)
    return n;
  let i = yt(t);
  if (i !== "filter" && i in e)
    return ys[t] = i;
  i = Fn(i);
  for (let r = 0; r < _c.length; r++) {
    const o = _c[r] + i;
    if (o in e)
      return ys[t] = o;
  }
  return t;
}
const kc = "http://www.w3.org/1999/xlink";
function sy(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(kc, t.slice(6, t.length)) : e.setAttributeNS(kc, t, n);
  else {
    const o = hg(t);
    n == null || o && !gd(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function ay(e, t, n, i, r, o, l) {
  if (t === "innerHTML" || t === "textContent") {
    i && l(i, r, o), e[t] = n ?? "";
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n ?? "";
    (u !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = gd(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function uy(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function cy(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Sc = Symbol("_vei");
function fy(e, t, n, i, r = null) {
  const o = e[Sc] || (e[Sc] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = dy(t);
    if (i) {
      const u = o[t] = my(i, r);
      uy(e, s, u, a);
    } else l && (cy(e, s, l, a), o[t] = void 0);
  }
}
const Cc = /(?:Once|Passive|Capture)$/;
function dy(e) {
  let t;
  if (Cc.test(e)) {
    t = {};
    let i;
    for (; i = e.match(Cc); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : tn(e.slice(2)), t];
}
let ps = 0;
const hy = /* @__PURE__ */ Promise.resolve(), vy = () => ps || (hy.then(() => ps = 0), ps = Date.now());
function my(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    qt(
      gy(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = vy(), n;
}
function gy(e, t) {
  if (xe(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Ec = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yy = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? ny(e, i, u) : t === "style" ? oy(e, n, i) : Vl(t) ? Va(t) || fy(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : py(e, t, i, u)) ? ay(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), sy(e, t, i, u));
};
function py(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ec(t) && Ve(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Ec(t) && Xe(n) ? !1 : t in e;
}
const mh = /* @__PURE__ */ new WeakMap(), gh = /* @__PURE__ */ new WeakMap(), rl = Symbol("_moveCb"), Vc = Symbol("_enterCb"), yh = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ We({}, Q0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Ka(), i = Wd();
    let r, o;
    return Xd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!ky(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(wy), r.forEach(xy);
      const s = r.filter(_y);
      hh(), s.forEach((a) => {
        const u = a.el, c = u.style;
        In(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[rl] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[rl] = null, Yn(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = _e(e), s = fh(l);
      let a = l.tag || Le;
      r = o, o = t.default ? Ga(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && Or(
          c,
          Rr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          Or(
            c,
            Rr(c, s, i, n)
          ), mh.set(c, c.el.getBoundingClientRect());
        }
      return y(a, null, o);
    };
  }
}, by = (e) => delete e.mode;
yh.props;
const ph = yh;
function wy(e) {
  const t = e.el;
  t[rl] && t[rl](), t[Vc] && t[Vc]();
}
function xy(e) {
  gh.set(e, e.el.getBoundingClientRect());
}
function _y(e) {
  const t = mh.get(e), n = gh.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function ky(e, t, n) {
  const i = e.cloneNode(), r = e[nr];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = dh(i);
  return o.removeChild(i), l;
}
const Sy = /* @__PURE__ */ We({ patchProp: yy }, J0);
let Lc;
function Cy() {
  return Lc || (Lc = P0(Sy));
}
const Pc = (...e) => {
  Cy().render(...e);
}, Be = typeof window < "u", Xa = Be && "IntersectionObserver" in window, Ey = Be && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Ic = Be && "EyeDropper" in window;
function bh(e, t, n) {
  const i = t.length - 1;
  if (i < 0) return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function Ai(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => Ai(e[i], t[i]));
}
function Ks(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), bh(e, t.split("."), n));
}
function Tn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Ks(e, t, n);
  if (Array.isArray(t)) return bh(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function Za(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, i) => t + i);
}
function ye(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function ol(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Fr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Tc = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
}), Vy = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function wh(e) {
  return Object.keys(e);
}
function yi(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function xh(e, t) {
  const n = {}, i = new Set(Object.keys(e));
  for (const r of t)
    i.has(r) && (n[r] = e[r]);
  return n;
}
function Mc(e, t, n) {
  const i = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((l) => l instanceof RegExp ? l.test(o) : l === o) && !(n != null && n.some((l) => l === o)) ? i[o] = e[o] : r[o] = e[o];
  return [i, r];
}
function Xt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const _h = /^on[^a-z]/, Ja = (e) => _h.test(e), Ly = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function ur(e) {
  const [t, n] = Mc(e, [_h]), i = Xt(t, Ly), [r, o] = Mc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function kn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Py(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), rn(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function Bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ac(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function $c(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Nc(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Iy(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function Rc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let i = -1;
  for (; Math.abs(e) >= t && i < n.length - 1; )
    e /= t, ++i;
  return `${e.toFixed(1)} ${n[i]}B`;
}
function Ft() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (ol(o) && ol(l)) {
      i[r] = Ft(o, l, n);
      continue;
    }
    if (Array.isArray(o) && Array.isArray(l) && n) {
      i[r] = n(o, l);
      continue;
    }
    i[r] = l;
  }
  return i;
}
function kh(e) {
  return e.map((t) => t.type === Le ? kh(t.children) : t).flat();
}
function _i() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (_i.cache.has(e)) return _i.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return _i.cache.set(e, t), t;
}
_i.cache = /* @__PURE__ */ new Map();
function Ho(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Ho(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Ho(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Ho(e, t.component.subTree).flat(1);
  }
  return [];
}
function Ty(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function Qa(e) {
  const t = un({}), n = C(e);
  return Cn(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), Da(t);
}
function ll(e, t) {
  return e.includes(t);
}
function Sh(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const sn = () => [Function, Array];
function Oc(e, t) {
  return t = "on" + Fn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Ch(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Dr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Eh(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function sl(e, t) {
  var i, r, o, l;
  const n = Dr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Eh(n, t);
    s ? s.focus() : sl(e, t === "next" ? "first" : "last");
  }
}
function al(e, t) {
  if (!(Be && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Vh(e) {
  return e.some((t) => tl(t) ? t.type === Yt ? !1 : t.type !== Le || Vh(t.children) : !0) ? e : null;
}
function My(e, t) {
  if (!Be || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Ay(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Lh = ["top", "bottom"], $y = ["start", "end", "left", "right"];
function Xs(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = ll(Lh, n) ? "start" : ll($y, n) ? "top" : "center"), {
    side: Bc(n, t),
    align: Bc(i, t)
  };
}
function Bc(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function bs(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function ws(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function Fc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Dc(e) {
  return ll(Lh, e.side) ? "y" : "x";
}
class ki {
  constructor(t) {
    let {
      x: n,
      y: i,
      width: r,
      height: o
    } = t;
    this.x = n, this.y = i, this.width = r, this.height = o;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function Hc(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function Ph(e) {
  return Array.isArray(e) ? new ki({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function eu(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new ki(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), d = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new ki({
      x: c,
      y: d,
      width: f,
      height: h
    });
  } else
    return new ki(t);
}
function pi(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let i;
  try {
    i = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof i.finished > "u" && (i.finished = new Promise((r) => {
    i.onfinish = () => {
      r(i);
    };
  })), i;
}
const jo = /* @__PURE__ */ new WeakMap();
function Ny(e, t) {
  Object.keys(t).forEach((n) => {
    if (Ja(n)) {
      const i = Sh(n), r = jo.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), jo.has(e) || jo.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Ry(e, t) {
  Object.keys(t).forEach((n) => {
    if (Ja(n)) {
      const i = Sh(n), r = jo.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Fi = 2.4, jc = 0.2126729, zc = 0.7151522, Gc = 0.072175, Oy = 0.55, By = 0.58, Fy = 0.57, Dy = 0.62, Co = 0.03, Uc = 1.45, Hy = 5e-4, jy = 1.25, zy = 1.25, Wc = 0.078, qc = 12.82051282051282, Eo = 0.06, Yc = 1e-3;
function Kc(e, t) {
  const n = (e.r / 255) ** Fi, i = (e.g / 255) ** Fi, r = (e.b / 255) ** Fi, o = (t.r / 255) ** Fi, l = (t.g / 255) ** Fi, s = (t.b / 255) ** Fi;
  let a = n * jc + i * zc + r * Gc, u = o * jc + l * zc + s * Gc;
  if (a <= Co && (a += (Co - a) ** Uc), u <= Co && (u += (Co - u) ** Uc), Math.abs(u - a) < Hy) return 0;
  let c;
  if (u > a) {
    const d = (u ** Oy - a ** By) * jy;
    c = d < Yc ? 0 : d < Wc ? d - d * qc * Eo : d - Eo;
  } else {
    const d = (u ** Dy - a ** Fy) * zy;
    c = d > -Yc ? 0 : d > -Wc ? d - d * qc * Eo : d + Eo;
  }
  return c * 100;
}
function Gy(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const ul = 0.20689655172413793, Uy = (e) => e > ul ** 3 ? Math.cbrt(e) : e / (3 * ul ** 2) + 4 / 29, Wy = (e) => e > ul ? e ** 3 : 3 * ul ** 2 * (e - 4 / 29);
function Ih(e) {
  const t = Uy, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Th(e) {
  const t = Wy, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const qy = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Yy = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Ky = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Xy = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Mh(e) {
  const t = Array(3), n = Yy, i = qy;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(Bt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function tu(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Xy, l = Ky;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function Zs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Zy(e) {
  return Zs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Xc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Jy = {
  rgb: (e, t, n, i) => ({
    r: e,
    g: t,
    b: n,
    a: i
  }),
  rgba: (e, t, n, i) => ({
    r: e,
    g: t,
    b: n,
    a: i
  }),
  hsl: (e, t, n, i) => Zc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => Zc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsv: (e, t, n, i) => On({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => On({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Wt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Xc.test(e)) {
    const {
      groups: t
    } = e.match(Xc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Jy[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Oh(t);
  } else if (typeof e == "object") {
    if (yi(e, ["r", "g", "b"]))
      return e;
    if (yi(e, ["h", "s", "l"]))
      return On(nu(e));
    if (yi(e, ["h", "s", "v"]))
      return On(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function On(e) {
  const {
    h: t,
    s: n,
    v: i,
    a: r
  } = e, o = (s) => {
    const a = (s + t / 60) % 6;
    return i - i * n * Math.max(Math.min(a, 4 - a, 1), 0);
  }, l = [o(5), o(3), o(1)].map((s) => Math.round(s * 255));
  return {
    r: l[0],
    g: l[1],
    b: l[2],
    a: r
  };
}
function Zc(e) {
  return On(nu(e));
}
function Dl(e) {
  if (!e) return {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  };
  const t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.max(t, n, i), o = Math.min(t, n, i);
  let l = 0;
  r !== o && (r === t ? l = 60 * (0 + (n - i) / (r - o)) : r === n ? l = 60 * (2 + (i - t) / (r - o)) : r === i && (l = 60 * (4 + (t - n) / (r - o)))), l < 0 && (l = l + 360);
  const s = r === 0 ? 0 : (r - o) / r, a = [l, s, r];
  return {
    h: a[0],
    s: a[1],
    v: a[2],
    a: e.a
  };
}
function Ah(e) {
  const {
    h: t,
    s: n,
    v: i,
    a: r
  } = e, o = i - i * n / 2, l = o === 1 || o === 0 ? 0 : (i - o) / Math.min(o, 1 - o);
  return {
    h: t,
    s: l,
    l: o,
    a: r
  };
}
function nu(e) {
  const {
    h: t,
    s: n,
    l: i,
    a: r
  } = e, o = i + n * Math.min(i, 1 - i), l = o === 0 ? 0 : 2 - 2 * i / o;
  return {
    h: t,
    s: l,
    v: o,
    a: r
  };
}
function $h(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function Nh(e) {
  return $h(On(e));
}
function Vo(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Rh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[Vo(t), Vo(n), Vo(i), r !== void 0 ? Vo(Math.round(r * 255)) : ""].join("")}`;
}
function Oh(e) {
  e = Qy(e);
  let [t, n, i, r] = Iy(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Bh(e) {
  const t = Oh(e);
  return Dl(t);
}
function Fh(e) {
  return Rh(On(e));
}
function Qy(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = $c($c(e, 6), 8, "F")), e;
}
function ep(e, t) {
  const n = Ih(tu(e));
  return n[0] = n[0] + t * 10, Mh(Th(n));
}
function tp(e, t) {
  const n = Ih(tu(e));
  return n[0] = n[0] - t * 10, Mh(Th(n));
}
function Js(e) {
  const t = Wt(e);
  return tu(t)[1];
}
function np(e, t) {
  const n = Js(e), i = Js(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function Dh(e) {
  const t = Math.abs(Kc(Wt(0), Wt(e)));
  return Math.abs(Kc(Wt(16777215), Wt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Z(e, t) {
  return (n) => Object.keys(e).reduce((i, r) => {
    const l = typeof e[r] == "object" && e[r] != null && !Array.isArray(e[r]) ? e[r] : {
      type: e[r]
    };
    return n && r in n ? i[r] = {
      ...l,
      default: n[r]
    } : i[r] = l, t && !i[r].source && (i[r].source = t), i;
  }, {});
}
const ke = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), ir = Symbol.for("vuetify:defaults");
function ip(e) {
  return te(e);
}
function iu() {
  const e = ze(ir);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function En(e, t) {
  const n = iu(), i = te(e), r = C(() => {
    if (rn(t == null ? void 0 : t.disabled)) return n.value;
    const l = rn(t == null ? void 0 : t.scoped), s = rn(t == null ? void 0 : t.reset), a = rn(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = Ft(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = Ft(Ft(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? Ft(u.prev, u) : u;
  });
  return ct(ir, r), r;
}
function rp(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[_i(t)]) < "u";
}
function op() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : iu();
  const i = ot("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = C(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var d, f, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(d = r.value) == null ? void 0 : d[u], c].filter((m) => m != null) : typeof u == "string" && !rp(i.vnode, u) ? ((f = r.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = be();
  Cn(() => {
    if (r.value) {
      const a = Object.entries(r.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      l.value = a.length ? Object.fromEntries(a) : void 0;
    } else
      l.value = void 0;
  });
  function s() {
    const a = up(ir, i);
    ct(ir, C(() => l.value ? Ft((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function hn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return xh(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = iu();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = op(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function de() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? hn : Mi)(t);
}
function cr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return de()({
    name: n ?? Fn(yt(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...ke()
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => {
        var l;
        return ri(i.tag, {
          class: [e, i.class],
          style: i.style
        }, (l = o.default) == null ? void 0 : l.call(o));
      };
    }
  });
}
function Hh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Hr = "cubic-bezier(0.4, 0, 0.2, 1)", lp = "cubic-bezier(0.0, 0, 0.2, 1)", sp = "cubic-bezier(0.4, 0, 1, 1)";
function ot(e, t) {
  const n = Ka();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Vn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = ot(e).type;
  return _i((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let jh = 0, zo = /* @__PURE__ */ new WeakMap();
function Lt() {
  const e = ot("getUid");
  if (zo.has(e)) return zo.get(e);
  {
    const t = jh++;
    return zo.set(e, t), t;
  }
}
Lt.reset = () => {
  jh = 0, zo = /* @__PURE__ */ new WeakMap();
};
function zh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? ap(e) : ru(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function cl(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (ru(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function ru(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function ap(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function up(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ot("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function cp(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ve(e) {
  const t = ot("useRender");
  t.render = e;
}
const $i = Z({
  border: [Boolean, Number, String]
}, "border");
function Ni(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    borderClasses: C(() => {
      const i = qe(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const fp = [null, "default", "comfortable", "compact"], Zt = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => fp.includes(e)
  }
}, "density");
function vn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    densityClasses: C(() => `${t}--density-${e.density}`)
  };
}
const Hn = Z({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function jn(e) {
  return {
    elevationClasses: C(() => {
      const n = qe(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const Pt = Z({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function It(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    roundedClasses: C(() => {
      const i = qe(e) ? e.value : e.rounded, r = qe(e) ? e.value : e.tile, o = [];
      if (i === !0 || i === "")
        o.push(`${t}--rounded`);
      else if (typeof i == "string" || i === 0)
        for (const l of String(i).split(" "))
          o.push(`rounded-${l}`);
      else r && o.push("rounded-0");
      return o;
    })
  };
}
const Ye = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), fl = Symbol.for("vuetify:theme"), Je = Z({
  theme: String
}, "theme");
function Jc() {
  return {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  };
}
function dp() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Jc();
  const t = Jc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [o, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || o === "dark" ? (i = t.themes) == null ? void 0 : i.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = Ft(s, l);
  }
  return Ft(t, {
    ...e,
    themes: n
  });
}
function hp(e) {
  const t = dp(e), n = te(t.defaultTheme), i = te(t.themes), r = C(() => {
    const c = {};
    for (const [d, f] of Object.entries(i.value)) {
      const h = c[d] = {
        ...f,
        colors: {
          ...f.colors
        }
      };
      if (t.variations)
        for (const v of t.variations.colors) {
          const m = h.colors[v];
          if (m)
            for (const p of ["lighten", "darken"]) {
              const g = p === "lighten" ? ep : tp;
              for (const w of Za(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = Rh(g(Wt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, p = Wt(h.colors[v]);
        h.colors[m] = Dh(p);
      }
    }
    return c;
  }), o = C(() => r.value[n.value]), l = C(() => {
    const c = [];
    o.value.dark && fi(c, ":root", ["color-scheme: dark"]), fi(c, ":root", Qc(o.value));
    for (const [v, m] of Object.entries(r.value))
      fi(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Qc(m)]);
    const d = [], f = [], h = new Set(Object.values(r.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? fi(f, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (fi(d, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), fi(f, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), fi(f, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
    return c.push(...d, ...f), c.map((v, m) => m === 0 ? v : `    ${v}`).join("");
  });
  function s() {
    return {
      style: [{
        children: l.value,
        id: "vuetify-theme-stylesheet",
        nonce: t.cspNonce || !1
      }]
    };
  }
  function a(c) {
    if (t.isDisabled) return;
    const d = c._context.provides.usehead;
    if (d)
      if (d.push) {
        const h = d.push(s);
        Be && we(l, () => {
          h.patch(s);
        });
      } else
        Be ? (d.addHeadObjs(C(s)), Cn(() => d.updateDOM())) : d.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var f = v;
      let h = Be ? document.getElementById("vuetify-theme-stylesheet") : null;
      Be ? we(l, v, {
        immediate: !0
      }) : v();
    }
  }
  const u = C(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
  return {
    install: a,
    isDisabled: t.isDisabled,
    name: n,
    themes: i,
    current: o,
    computedThemes: r,
    themeClasses: u,
    styles: l,
    global: {
      name: n,
      current: o
    }
  };
}
function it(e) {
  ot("provideTheme");
  const t = ze(fl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = C(() => e.theme ?? t.name.value), i = C(() => t.themes.value[n.value]), r = C(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return ct(fl, o), o;
}
function fi(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Qc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Wt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Js(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Wt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function ou(e) {
  return Qa(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Zs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && Zy(e.value.background)) {
          const i = Wt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = Dh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Zs(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function an(e, t) {
  const n = C(() => ({
    text: qe(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = ou(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function Dt(e, t) {
  const n = C(() => ({
    background: qe(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = ou(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const vp = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function fr(e, t) {
  return y(Le, null, [e && y("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), y("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const zn = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => vp.includes(e)
  }
}, "variant");
function dr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = C(() => {
    const {
      variant: o
    } = rn(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = ou(C(() => {
    const {
      variant: o,
      color: l
    } = rn(e);
    return {
      [["elevated", "flat"].includes(o) ? "background" : "text"]: l
    };
  }));
  return {
    colorClasses: i,
    colorStyles: r,
    variantClasses: n
  };
}
const Gh = Z({
  divided: Boolean,
  ...$i(),
  ...ke(),
  ...Zt(),
  ...Hn(),
  ...Pt(),
  ...Ye(),
  ...Je(),
  ...zn()
}, "VBtnGroup"), ef = de()({
  name: "VBtnGroup",
  props: Gh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      densityClasses: r
    } = vn(e), {
      borderClasses: o
    } = Ni(e), {
      elevationClasses: l
    } = jn(e), {
      roundedClasses: s
    } = It(e);
    En({
      VBtn: {
        height: "auto",
        color: ae(e, "color"),
        density: ae(e, "density"),
        flat: !0,
        variant: ae(e, "variant")
      }
    }), ve(() => y(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, i.value, o.value, r.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function Ei(e, t) {
  let n;
  function i() {
    n = Ma(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  we(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), bt(() => {
    n == null || n.stop();
  });
}
function Ne(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const o = ot("useProxiedModel"), l = te(e[t] !== void 0 ? e[t] : n), s = _i(t), u = C(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = o.vnode.props) != null && d.hasOwnProperty(t) || (f = o.vnode.props) != null && f.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = o.vnode.props) != null && d.hasOwnProperty(t) && ((f = o.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  Ei(() => !u.value, () => {
    we(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = C({
    get() {
      const d = e[t];
      return i(u.value ? d : l.value);
    },
    set(d) {
      const f = r(d), h = _e(u.value ? e[t] : l.value);
      h === f || i(h) === d || (l.value = f, o == null || o.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const Hl = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), jl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function zl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = ot("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = Lt();
  ct(Symbol.for(`${t.description}:id`), r);
  const o = ze(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = ae(e, "value"), s = C(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), dn(() => {
    o.unregister(r);
  });
  const a = C(() => o.isSelected(r)), u = C(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return we(a, (c) => {
    i.emit("group:selected", {
      value: c
    });
  }, {
    flush: "sync"
  }), {
    id: r,
    isSelected: a,
    toggle: () => o.select(r, !a.value),
    select: (c) => o.select(r, c),
    selectedClass: u,
    value: l,
    disabled: s,
    group: o
  };
}
function no(e, t) {
  let n = !1;
  const i = un([]), r = Ne(e, "modelValue", [], (f) => f == null ? [] : Uh(i, kn(f)), (f) => {
    const h = gp(i, f);
    return e.multiple ? h : h[0];
  }), o = ot("useGroup");
  function l(f, h) {
    const v = f, m = Symbol.for(`${t.description}:id`), g = Ho(m, o == null ? void 0 : o.vnode).indexOf(h);
    rn(v.value) == null && (v.value = g), g > -1 ? i.splice(g, 0, v) : i.push(v);
  }
  function s(f) {
    if (n) return;
    a();
    const h = i.findIndex((v) => v.id === f);
    i.splice(h, 1);
  }
  function a() {
    const f = i.find((h) => !h.disabled);
    f && e.mandatory === "force" && !r.value.length && (r.value = [f.id]);
  }
  fn(() => {
    a();
  }), dn(() => {
    n = !0;
  });
  function u(f, h) {
    const v = i.find((m) => m.id === f);
    if (!(h && (v != null && v.disabled)))
      if (e.multiple) {
        const m = r.value.slice(), p = m.findIndex((w) => w === f), g = ~p;
        if (h = h ?? !g, g && e.mandatory && m.length <= 1 || !g && e.max != null && m.length + 1 > e.max) return;
        p < 0 && h ? m.push(f) : p >= 0 && !h && m.splice(p, 1), r.value = m;
      } else {
        const m = r.value.includes(f);
        if (e.mandatory && m) return;
        r.value = h ?? !m ? [f] : [];
      }
  }
  function c(f) {
    if (e.multiple, r.value.length) {
      const h = r.value[0], v = i.findIndex((g) => g.id === h);
      let m = (v + f) % i.length, p = i[m];
      for (; p.disabled && m !== v; )
        m = (m + f) % i.length, p = i[m];
      if (p.disabled) return;
      r.value = [i[m].id];
    } else {
      const h = i.find((v) => !v.disabled);
      h && (r.value = [h.id]);
    }
  }
  const d = {
    register: l,
    unregister: s,
    selected: r,
    select: u,
    disabled: ae(e, "disabled"),
    prev: () => c(i.length - 1),
    next: () => c(1),
    isSelected: (f) => r.value.includes(f),
    selectedClass: C(() => e.selectedClass),
    items: C(() => i),
    getItemIndex: (f) => mp(i, f)
  };
  return ct(t, d), d;
}
function mp(e, t) {
  const n = Uh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function Uh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => Ai(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function gp(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const Wh = Symbol.for("vuetify:v-btn-toggle"), yp = Z({
  ...Gh(),
  ...Hl()
}, "VBtnToggle");
de()({
  name: "VBtnToggle",
  props: yp(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: i,
      next: r,
      prev: o,
      select: l,
      selected: s
    } = no(e, Wh);
    return ve(() => {
      const a = ef.filterProps(e);
      return y(ef, he({
        class: ["v-btn-toggle", e.class]
      }, a, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: i,
            next: r,
            prev: o,
            select: l,
            selected: s
          })];
        }
      });
    }), {
      next: r,
      prev: o,
      select: l
    };
  }
});
const pp = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), nt = de(!1)({
  name: "VDefaultsProvider",
  props: pp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: i,
      disabled: r,
      reset: o,
      root: l,
      scoped: s
    } = Da(e);
    return En(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), bp = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  eyeDropper: "mdi-eyedropper"
}, wp = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => ri(qh, {
    ...e,
    class: "mdi"
  })
}, Me = [String, Function, Object, Array], Qs = Symbol.for("vuetify:icons"), Gl = Z({
  icon: {
    type: Me
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), tf = de()({
  name: "VComponentIcon",
  props: Gl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const i = e.icon;
      return y(e.tag, null, {
        default: () => {
          var r;
          return [e.icon ? y(i, null, null) : (r = n.default) == null ? void 0 : r.call(n)];
        }
      });
    };
  }
}), lu = hn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Gl(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => y(e.tag, he(n, {
      style: null
    }), {
      default: () => [y("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((i) => Array.isArray(i) ? y("path", {
        d: i[0],
        "fill-opacity": i[1]
      }, null) : y("path", {
        d: i
      }, null)) : y("path", {
        d: e.icon
      }, null)])]
    });
  }
});
hn({
  name: "VLigatureIcon",
  props: Gl(),
  setup(e) {
    return () => y(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const qh = hn({
  name: "VClassIcon",
  props: Gl(),
  setup(e) {
    return () => y(e.tag, {
      class: e.icon
    }, null);
  }
});
function xp() {
  return {
    svg: {
      component: lu
    },
    class: {
      component: qh
    }
  };
}
function _p(e) {
  const t = xp(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = wp), Ft({
    defaultSet: n,
    sets: t,
    aliases: {
      ...bp,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const kp = (e) => {
  const t = ze(Qs);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: C(() => {
      var a;
      const i = rn(e);
      if (!i) return {
        component: tf
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: lu,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: tf,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, Sp = ["x-small", "small", "default", "large", "x-large"], io = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function ro(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return Qa(() => {
    let n, i;
    return ll(Sp, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: ye(e.size),
      height: ye(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const Cp = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Me,
  ...ke(),
  ...io(),
  ...Ye({
    tag: "i"
  }),
  ...Je()
}, "VIcon"), Ge = de()({
  name: "VIcon",
  props: Cp(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = te(), {
      themeClasses: o
    } = it(e), {
      iconData: l
    } = kp(C(() => r.value || e.icon)), {
      sizeClasses: s
    } = ro(e), {
      textColorClasses: a,
      textColorStyles: u
    } = an(ae(e, "color"));
    return ve(() => {
      var d, f;
      const c = (d = i.default) == null ? void 0 : d.call(i);
      return c && (r.value = (f = kh(c).filter((h) => h.type === eo && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), y(l.value.component, {
        tag: e.tag,
        icon: l.value.icon,
        class: ["v-icon", "notranslate", o.value, s.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
          fontSize: ye(e.size),
          height: ye(e.size),
          width: ye(e.size)
        }, u.value, e.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {
        default: () => [c]
      });
    }), {};
  }
});
function Yh(e, t) {
  const n = te(), i = be(!1);
  if (Xa) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    dn(() => {
      r.disconnect();
    }), we(n, (o, l) => {
      l && (r.unobserve(l), i.value = !1), o && r.observe(o);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: i
  };
}
function rr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = te(), i = te();
  if (Be) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    dn(() => {
      r.disconnect();
    }), we(n, (o, l) => {
      l && (r.unobserve(Fr(l)), i.value = void 0), o && r.observe(Fr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Qr(i)
  };
}
const Ep = Z({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...ke(),
  ...io(),
  ...Ye({
    tag: "div"
  }),
  ...Je()
}, "VProgressCircular"), Kh = de()({
  name: "VProgressCircular",
  props: Ep(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = te(), {
      themeClasses: l
    } = it(e), {
      sizeClasses: s,
      sizeStyles: a
    } = ro(e), {
      textColorClasses: u,
      textColorStyles: c
    } = an(ae(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = an(ae(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Yh(), {
      resizeRef: m,
      contentRect: p
    } = rr(), g = C(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = C(() => Number(e.width)), x = C(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = C(() => i / (1 - w.value / x.value) * 2), k = C(() => w.value / x.value * b.value), E = C(() => ye((100 - g.value) / 100 * r));
    return Cn(() => {
      h.value = o.value, m.value = o.value;
    }), ve(() => y(e.tag, {
      ref: o,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": v.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, l.value, s.value, u.value, e.class],
      style: [a.value, c.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : g.value
    }, {
      default: () => [y("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${b.value} ${b.value}`
      }, [y("circle", {
        class: ["v-progress-circular__underlay", d.value],
        style: f.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": k.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), y("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": k.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": E.value
      }, null)]), n.default && y("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: g.value
      })])]
    })), {};
  }
}), oi = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function li(e) {
  return {
    dimensionStyles: C(() => ({
      height: ye(e.height),
      maxHeight: ye(e.maxHeight),
      maxWidth: ye(e.maxWidth),
      minHeight: ye(e.minHeight),
      minWidth: ye(e.minWidth),
      width: ye(e.width)
    }))
  };
}
const Vp = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  }
}, nf = "$vuetify.", rf = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), Xh = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(nf))
    return rf(i, o);
  const s = i.replace(nf, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Ks(a, s, null);
  return c || (`${i}${e.value}`, c = Ks(u, s, null)), c || (c = i), typeof c != "string" && (c = i), rf(c, o);
};
function Zh(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function xs(e, t, n) {
  const i = Ne(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, we(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function Jh(e) {
  return (t) => {
    const n = xs(t, "locale", e.current), i = xs(t, "fallback", e.fallback), r = xs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: Xh(n, i, r),
      n: Zh(n, i),
      provide: Jh({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function Lp(e) {
  const t = be((e == null ? void 0 : e.locale) ?? "en"), n = be((e == null ? void 0 : e.fallback) ?? "en"), i = te({
    en: Vp,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: Xh(t, n, i),
    n: Zh(t, n),
    provide: Jh({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const dl = Symbol.for("vuetify:locale");
function Pp(e) {
  return e.name != null;
}
function Ip(e) {
  const t = e != null && e.adapter && Pp(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Lp(e), n = Mp(t, e);
  return {
    ...t,
    ...n
  };
}
function oo() {
  const e = ze(dl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Tp() {
  return {
    af: !1,
    ar: !0,
    bg: !1,
    ca: !1,
    ckb: !1,
    cs: !1,
    de: !1,
    el: !1,
    en: !1,
    es: !1,
    et: !1,
    fa: !0,
    fi: !1,
    fr: !1,
    hr: !1,
    hu: !1,
    he: !0,
    id: !1,
    it: !1,
    ja: !1,
    km: !1,
    ko: !1,
    lv: !1,
    lt: !1,
    nl: !1,
    no: !1,
    pl: !1,
    pt: !1,
    ro: !1,
    ru: !1,
    sk: !1,
    sl: !1,
    srCyrl: !1,
    srLatn: !1,
    sv: !1,
    th: !1,
    tr: !1,
    az: !1,
    uk: !1,
    vi: !1,
    zhHans: !1,
    zhHant: !1
  };
}
function Mp(e, t) {
  const n = te((t == null ? void 0 : t.rtl) ?? Tp()), i = C(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: C(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function mn() {
  const e = ze(dl);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const of = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, lo = Z({
  location: String
}, "location");
function so(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = mn();
  return {
    locationStyles: C(() => {
      if (!e.location) return {};
      const {
        side: o,
        align: l
      } = Xs(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[of[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[of[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[o]] = "50%", a.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[o]), a;
    })
  };
}
const Ap = Z({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...ke(),
  ...lo({
    location: "top"
  }),
  ...Pt(),
  ...Ye(),
  ...Je()
}, "VProgressLinear"), Qh = de()({
  name: "VProgressLinear",
  props: Ap(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), {
      isRtl: r,
      rtlClasses: o
    } = mn(), {
      themeClasses: l
    } = it(e), {
      locationStyles: s
    } = so(e), {
      textColorClasses: a,
      textColorStyles: u
    } = an(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = Dt(C(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = Dt(e, "color"), {
      roundedClasses: v
    } = It(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Yh(), g = C(() => parseInt(e.max, 10)), w = C(() => parseInt(e.height, 10)), x = C(() => parseFloat(e.bufferValue) / g.value * 100), b = C(() => parseFloat(i.value) / g.value * 100), k = C(() => r.value !== e.reverse), E = C(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), S = C(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function P($) {
      if (!m.value) return;
      const {
        left: R,
        right: D,
        width: L
      } = m.value.getBoundingClientRect(), I = k.value ? L - $.clientX + (D - L) : $.clientX - R;
      i.value = Math.round(I / L * g.value);
    }
    return ve(() => y(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": k.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, v.value, l.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ye(w.value) : 0,
        "--v-progress-linear-height": ye(w.value),
        ...s.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : b.value,
      onClick: e.clickable && P
    }, {
      default: () => [e.stream && y("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [k.value ? "left" : "right"]: ye(-w.value),
          borderTop: `${ye(w.value / 2)} dotted`,
          opacity: S.value,
          top: `calc(50% - ${ye(w.value / 4)})`,
          width: ye(100 - x.value, "%"),
          "--v-progress-linear-stream-to": ye(w.value * (k.value ? 1 : -1))
        }
      }, null), y("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: S.value,
          width: ye(e.stream ? x.value : 100, "%")
        }]
      }, null), y(Rn, {
        name: E.value
      }, {
        default: () => [e.indeterminate ? y("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map(($) => y("div", {
          key: $,
          class: ["v-progress-linear__indeterminate", $, f.value],
          style: h.value
        }, null))]) : y("div", {
          class: ["v-progress-linear__determinate", f.value],
          style: [h.value, {
            width: ye(b.value, "%")
          }]
        }, null)]
      }), n.default && y("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: b.value,
        buffer: x.value
      })])]
    })), {};
  }
}), su = Z({
  loading: [Boolean, String]
}, "loader");
function Ul(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    loaderClasses: C(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function au(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return y("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || y(Qh, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const $p = ["static", "relative", "fixed", "absolute", "sticky"], Wl = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => $p.includes(e)
    )
  }
}, "position");
function ql(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    positionClasses: C(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Np() {
  const e = ot("useRoute");
  return C(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Rp() {
  var e, t;
  return (t = (e = ot("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Yl(e, t) {
  const n = e0("RouterLink"), i = C(() => !!(e.href || e.to)), r = C(() => (i == null ? void 0 : i.value) || Oc(t, "click") || Oc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: ae(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = Np();
  return {
    isLink: i,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && C(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && Ai(o.route.value.query, l.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (s = o.isActive) == null ? void 0 : s.value;
    }),
    href: C(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const Kl = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let _s = !1;
function Op(e, t) {
  let n = !1, i, r;
  Be && (Ze(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      _s ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), _s = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      _s = !1;
    });
  }), bt(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Bp(e, t) {
  we(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && Ze(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const ea = Symbol("rippleStop"), Fp = 80;
function lf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function ta(e) {
  return e.constructor.name === "TouchEvent";
}
function ev(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Dp = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!ev(e)) {
    const f = t.getBoundingClientRect(), h = ta(e) ? e.touches[e.touches.length - 1] : e;
    i = h.clientX - f.left, r = h.clientY - f.top;
  }
  let o = 0, l = 0.3;
  (d = t._ripple) != null && d.circle ? (l = 0.15, o = t.clientWidth / 2, o = n.center ? o : o + Math.sqrt((i - o) ** 2 + (r - o) ** 2) / 4) : o = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const s = `${(t.clientWidth - o * 2) / 2}px`, a = `${(t.clientHeight - o * 2) / 2}px`, u = n.center ? s : `${i - o}px`, c = n.center ? a : `${r - o}px`;
  return {
    radius: o,
    scale: l,
    x: u,
    y: c,
    centerX: s,
    centerY: a
  };
}, hl = {
  /* eslint-disable max-statements */
  show(e, t) {
    var h;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((h = t == null ? void 0 : t._ripple) != null && h.enabled))
      return;
    const i = document.createElement("span"), r = document.createElement("span");
    i.appendChild(r), i.className = "v-ripple__container", n.class && (i.className += ` ${n.class}`);
    const {
      radius: o,
      scale: l,
      x: s,
      y: a,
      centerX: u,
      centerY: c
    } = Dp(e, t, n), d = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = d, r.style.height = d, t.appendChild(i);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), lf(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), lf(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var o;
    if (!((o = e == null ? void 0 : e._ripple) != null && o.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const i = performance.now() - Number(n.dataset.activated), r = Math.max(250 - i, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var s;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((s = n.parentNode) == null ? void 0 : s.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, r);
  }
};
function tv(e) {
  return typeof e > "u" || !!e;
}
function jr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[ea])) {
    if (e[ea] = !0, ta(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || ev(e), n._ripple.class && (t.class = n._ripple.class), ta(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        hl.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Fp);
    } else
      hl.show(e, n, t);
  }
}
function sf(e) {
  e[ea] = !0;
}
function Ot(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Ot(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), hl.hide(t);
  }
}
function nv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let zr = !1;
function iv(e) {
  !zr && (e.keyCode === Tc.enter || e.keyCode === Tc.space) && (zr = !0, jr(e));
}
function rv(e) {
  zr = !1, Ot(e);
}
function ov(e) {
  zr && (zr = !1, Ot(e));
}
function lv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = tv(i);
  if (o || hl.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, ol(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", sf, {
        passive: !0
      }), e.addEventListener("mousedown", sf);
      return;
    }
    e.addEventListener("touchstart", jr, {
      passive: !0
    }), e.addEventListener("touchend", Ot, {
      passive: !0
    }), e.addEventListener("touchmove", nv, {
      passive: !0
    }), e.addEventListener("touchcancel", Ot), e.addEventListener("mousedown", jr), e.addEventListener("mouseup", Ot), e.addEventListener("mouseleave", Ot), e.addEventListener("keydown", iv), e.addEventListener("keyup", rv), e.addEventListener("blur", ov), e.addEventListener("dragstart", Ot, {
      passive: !0
    });
  } else !o && n && sv(e);
}
function sv(e) {
  e.removeEventListener("mousedown", jr), e.removeEventListener("touchstart", jr), e.removeEventListener("touchend", Ot), e.removeEventListener("touchmove", nv), e.removeEventListener("touchcancel", Ot), e.removeEventListener("mouseup", Ot), e.removeEventListener("mouseleave", Ot), e.removeEventListener("keydown", iv), e.removeEventListener("keyup", rv), e.removeEventListener("dragstart", Ot), e.removeEventListener("blur", ov);
}
function Hp(e, t) {
  lv(e, t, !1);
}
function jp(e) {
  delete e._ripple, sv(e);
}
function zp(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = tv(t.oldValue);
  lv(e, t, n);
}
const Ri = {
  mounted: Hp,
  unmounted: jp,
  updated: zp
}, av = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: Wh
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Me,
  appendIcon: Me,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...$i(),
  ...ke(),
  ...Zt(),
  ...oi(),
  ...Hn(),
  ...jl(),
  ...su(),
  ...lo(),
  ...Wl(),
  ...Pt(),
  ...Kl(),
  ...io(),
  ...Ye({
    tag: "button"
  }),
  ...Je(),
  ...zn({
    variant: "elevated"
  })
}, "VBtn"), ut = de()({
  name: "VBtn",
  directives: {
    Ripple: Ri
  },
  props: av(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      borderClasses: o
    } = Ni(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = dr(e), {
      densityClasses: u
    } = vn(e), {
      dimensionStyles: c
    } = li(e), {
      elevationClasses: d
    } = jn(e), {
      loaderClasses: f
    } = Ul(e), {
      locationStyles: h
    } = so(e), {
      positionClasses: v
    } = ql(e), {
      roundedClasses: m
    } = It(e), {
      sizeClasses: p,
      sizeStyles: g
    } = ro(e), w = zl(e, e.symbol, !1), x = Yl(e, n), b = C(() => {
      var $;
      return e.active !== void 0 ? e.active : x.isLink.value ? ($ = x.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), k = C(() => (w == null ? void 0 : w.disabled.value) || e.disabled), E = C(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), S = C(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P($) {
      var R;
      k.value || x.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((R = x.navigate) == null || R.call(x, $), w == null || w.toggle());
    }
    return Bp(x, w == null ? void 0 : w.select), ve(() => {
      var _, O;
      const $ = x.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), D = !!(e.appendIcon || i.append), L = !!(e.icon && e.icon !== !0), I = (w == null ? void 0 : w.isSelected.value) && (!x.isLink.value || ((_ = x.isActive) == null ? void 0 : _.value)) || !w || ((O = x.isActive) == null ? void 0 : O.value);
      return je(y($, {
        type: $ === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": k.value,
          "v-btn--elevated": E.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, I ? l.value : void 0, u.value, d.value, f.value, v.value, m.value, p.value, a.value, e.class],
        style: [I ? s.value : void 0, c.value, h.value, g.value, e.style],
        disabled: k.value || void 0,
        href: x.href.value,
        onClick: P,
        value: S.value
      }, {
        default: () => {
          var M;
          return [fr(!0, "v-btn"), !e.icon && R && y("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? y(nt, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : y(Ge, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), y("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && L ? y(Ge, {
            key: "content-icon",
            icon: e.icon
          }, null) : y(nt, {
            key: "content-defaults",
            disabled: !L,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var j;
              return [((j = i.default) == null ? void 0 : j.call(i)) ?? e.text];
            }
          })]), !e.icon && D && y("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? y(nt, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : y(Ge, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && y("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = i.loader) == null ? void 0 : M.call(i)) ?? y(Kh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[cn("ripple"), !k.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Xl = de()({
  name: "VCardActions",
  props: ke(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return En({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ve(() => {
      var i;
      return y("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), kr = cr("v-card-subtitle"), Gr = cr("v-card-title");
function Gp(e) {
  return {
    aspectStyles: C(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const uv = Z({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...ke(),
  ...oi()
}, "VResponsive"), af = de()({
  name: "VResponsive",
  props: uv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = Gp(e), {
      dimensionStyles: r
    } = li(e);
    return ve(() => {
      var o;
      return y("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [r.value, e.style]
      }, [y("div", {
        class: "v-responsive__sizer",
        style: i.value
      }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && y("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), ao = Z({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Mn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? ph : Rn,
    ...a
  } = typeof i == "object" ? i : {};
  return ri(s, he(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function Up(e, t) {
  if (!Xa) return;
  const n = t.modifiers || {}, i = t.value, {
    handler: r,
    options: o
  } = typeof i == "object" ? i : {
    handler: i,
    options: {}
  }, l = new IntersectionObserver(function() {
    var d;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0;
    const u = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!u) return;
    const c = s.some((f) => f.isIntersecting);
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? cv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function cv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const fv = {
  mounted: Up,
  unmounted: cv
}, Wp = Z({
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...uv(),
  ...ke(),
  ...Pt(),
  ...ao()
}, "VImg"), dv = de()({
  name: "VImg",
  directives: {
    intersect: fv
  },
  props: Wp(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: i
    } = t;
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Dt(ae(e, "color")), {
      roundedClasses: l
    } = It(e), s = ot("VImg"), a = be(""), u = te(), c = be(e.eager ? "loading" : "idle"), d = be(), f = be(), h = C(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), v = C(() => h.value.aspect || d.value / f.value || 0);
    we(() => e.src, () => {
      m(c.value !== "idle");
    }), we(v, (L, I) => {
      !L && I && u.value && b(u.value);
    }), Nl(() => m());
    function m(L) {
      if (!(e.eager && L) && !(Xa && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const I = new Image();
          I.src = h.value.lazySrc, b(I, null);
        }
        h.value.src && Ze(() => {
          var I;
          n("loadstart", ((I = u.value) == null ? void 0 : I.currentSrc) || h.value.src), setTimeout(() => {
            var _;
            if (!s.isUnmounted)
              if ((_ = u.value) != null && _.complete) {
                if (u.value.naturalWidth || g(), c.value === "error") return;
                v.value || b(u.value, null), c.value === "loading" && p();
              } else
                v.value || b(u.value), w();
          });
        });
      }
    }
    function p() {
      var L;
      s.isUnmounted || (w(), b(u.value), c.value = "loaded", n("load", ((L = u.value) == null ? void 0 : L.currentSrc) || h.value.src));
    }
    function g() {
      var L;
      s.isUnmounted || (c.value = "error", n("error", ((L = u.value) == null ? void 0 : L.currentSrc) || h.value.src));
    }
    function w() {
      const L = u.value;
      L && (a.value = L.currentSrc || L.src);
    }
    let x = -1;
    dn(() => {
      clearTimeout(x);
    });
    function b(L) {
      let I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const _ = () => {
        if (clearTimeout(x), s.isUnmounted) return;
        const {
          naturalHeight: O,
          naturalWidth: M
        } = L;
        O || M ? (d.value = M, f.value = O) : !L.complete && c.value === "loading" && I != null ? x = window.setTimeout(_, I) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      _();
    }
    const k = C(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), E = () => {
      var _;
      if (!h.value.src || c.value === "idle") return null;
      const L = y("img", {
        class: ["v-img__img", k.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.src,
        srcset: h.value.srcset,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: u,
        onLoad: p,
        onError: g
      }, null), I = (_ = i.sources) == null ? void 0 : _.call(i);
      return y(Mn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [je(I ? y("picture", {
          class: "v-img__picture"
        }, [I, L]) : L, [[pt, c.value === "loaded"]])]
      });
    }, S = () => y(Mn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && y("img", {
        class: ["v-img__img", "v-img__img--preload", k.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), P = () => i.placeholder ? y(Mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && y("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? y(Mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && y("div", {
        class: "v-img__error"
      }, [i.error()])]
    }) : null, R = () => e.gradient ? y("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, D = be(!1);
    {
      const L = we(v, (I) => {
        I && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            D.value = !0;
          });
        }), L());
      });
    }
    return ve(() => {
      const L = af.filterProps(e);
      return je(y(af, he({
        class: ["v-img", {
          "v-img--booting": !D.value
        }, r.value, l.value, e.class],
        style: [{
          width: ye(e.width === "auto" ? d.value : e.width)
        }, o.value, e.style]
      }, L, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => y(Le, null, [y(E, null, null), y(S, null, null), y(R, null, null), y(P, null, null), y($, null, null)]),
        default: i.default
      }), [[cn("intersect"), {
        handler: m,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: a,
      image: u,
      state: c,
      naturalWidth: d,
      naturalHeight: f
    };
  }
}), qp = Z({
  start: Boolean,
  end: Boolean,
  icon: Me,
  image: String,
  text: String,
  ...ke(),
  ...Zt(),
  ...Pt(),
  ...io(),
  ...Ye(),
  ...Je(),
  ...zn({
    variant: "flat"
  })
}, "VAvatar"), Vi = de()({
  name: "VAvatar",
  props: qp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = dr(e), {
      densityClasses: s
    } = vn(e), {
      roundedClasses: a
    } = It(e), {
      sizeClasses: u,
      sizeStyles: c
    } = ro(e);
    return ve(() => y(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? y(nt, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            image: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? y(dv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? y(Ge, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, fr(!1, "v-avatar")]
    })), {};
  }
}), Yp = Z({
  appendAvatar: String,
  appendIcon: Me,
  prependAvatar: String,
  prependIcon: Me,
  subtitle: [String, Number],
  title: [String, Number],
  ...ke(),
  ...Zt()
}, "VCardItem"), Kp = de()({
  name: "VCardItem",
  props: Yp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => {
      var u;
      const i = !!(e.prependAvatar || e.prependIcon), r = !!(i || n.prepend), o = !!(e.appendAvatar || e.appendIcon), l = !!(o || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return y("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [r && y("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? y(nt, {
        key: "prepend-defaults",
        disabled: !i,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.prependAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.prependIcon
          }
        }
      }, n.prepend) : y(Le, null, [e.prependAvatar && y(Vi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && y(Ge, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), y("div", {
        class: "v-card-item__content"
      }, [s && y(Gr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && y(kr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && y("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? y(nt, {
        key: "append-defaults",
        disabled: !o,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.appendAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.appendIcon
          }
        }
      }, n.append) : y(Le, null, [e.appendIcon && y(Ge, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && y(Vi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Tr = cr("v-card-text"), Xp = Z({
  appendAvatar: String,
  appendIcon: Me,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Me,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...$i(),
  ...ke(),
  ...Zt(),
  ...oi(),
  ...Hn(),
  ...su(),
  ...lo(),
  ...Wl(),
  ...Pt(),
  ...Kl(),
  ...Ye(),
  ...Je(),
  ...zn({
    variant: "elevated"
  })
}, "VCard"), uu = de()({
  name: "VCard",
  directives: {
    Ripple: Ri
  },
  props: Xp(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      borderClasses: o
    } = Ni(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = dr(e), {
      densityClasses: u
    } = vn(e), {
      dimensionStyles: c
    } = li(e), {
      elevationClasses: d
    } = jn(e), {
      loaderClasses: f
    } = Ul(e), {
      locationStyles: h
    } = so(e), {
      positionClasses: v
    } = ql(e), {
      roundedClasses: m
    } = It(e), p = Yl(e, n), g = C(() => e.link !== !1 && p.isLink.value), w = C(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return ve(() => {
      const x = g.value ? "a" : e.tag, b = !!(i.title || e.title != null), k = !!(i.subtitle || e.subtitle != null), E = b || k, S = !!(i.append || e.appendAvatar || e.appendIcon), P = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = E || P || S, D = !!(i.text || e.text != null);
      return je(y(x, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": w.value
        }, r.value, o.value, l.value, u.value, d.value, f.value, v.value, m.value, a.value, e.class],
        style: [s.value, c.value, h.value, e.style],
        href: p.href.value,
        onClick: w.value && p.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var L;
          return [$ && y("div", {
            key: "image",
            class: "v-card__image"
          }, [i.image ? y(nt, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : y(dv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), y(au, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && y(Kp, {
            key: "item",
            prependAvatar: e.prependAvatar,
            prependIcon: e.prependIcon,
            title: e.title,
            subtitle: e.subtitle,
            appendAvatar: e.appendAvatar,
            appendIcon: e.appendIcon
          }, {
            default: i.item,
            prepend: i.prepend,
            title: i.title,
            subtitle: i.subtitle,
            append: i.append
          }), D && y(Tr, {
            key: "text"
          }, {
            default: () => {
              var I;
              return [((I = i.text) == null ? void 0 : I.call(i)) ?? e.text];
            }
          }), (L = i.default) == null ? void 0 : L.call(i), i.actions && y(Xl, null, {
            default: i.actions
          }), fr(w.value, "v-card")];
        }
      }), [[cn("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), Zp = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function jt(e, t, n) {
  return de()({
    name: e,
    props: Zp({
      mode: n,
      origin: t
    }),
    setup(i, r) {
      let {
        slots: o
      } = r;
      const l = {
        onBeforeEnter(s) {
          i.origin && (s.style.transformOrigin = i.origin);
        },
        onLeave(s) {
          if (i.leaveAbsolute) {
            const {
              offsetTop: a,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: d
            } = s;
            s._transitionInitialStyles = {
              position: s.style.position,
              top: s.style.top,
              left: s.style.left,
              width: s.style.width,
              height: s.style.height
            }, s.style.position = "absolute", s.style.top = `${a}px`, s.style.left = `${u}px`, s.style.width = `${c}px`, s.style.height = `${d}px`;
          }
          i.hideOnLeave && s.style.setProperty("display", "none", "important");
        },
        onAfterLeave(s) {
          if (i.leaveAbsolute && (s != null && s._transitionInitialStyles)) {
            const {
              position: a,
              top: u,
              left: c,
              width: d,
              height: f
            } = s._transitionInitialStyles;
            delete s._transitionInitialStyles, s.style.position = a || "", s.style.top = u || "", s.style.left = c || "", s.style.width = d || "", s.style.height = f || "";
          }
        }
      };
      return () => {
        const s = i.group ? ph : Rn;
        return ri(s, {
          name: i.disabled ? "" : e,
          css: !i.disabled,
          ...i.group ? void 0 : {
            mode: i.mode
          },
          ...i.disabled ? {} : l
        }, o.default);
      };
    }
  });
}
function hv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return de()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => ri(Rn, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function vv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = yt(`offset-${n}`);
  return {
    onBeforeEnter(l) {
      l._parent = l.parentNode, l._initialStyle = {
        transition: l.style.transition,
        overflow: l.style.overflow,
        [n]: l.style[n]
      };
    },
    onEnter(l) {
      const s = l._initialStyle;
      l.style.setProperty("transition", "none", "important"), l.style.overflow = "hidden";
      const a = `${l[i]}px`;
      l.style[n] = "0", l.offsetHeight, l.style.transition = s.transition, e && l._parent && l._parent.classList.add(e), requestAnimationFrame(() => {
        l.style[n] = a;
      });
    },
    onAfterEnter: o,
    onEnterCancelled: o,
    onLeave(l) {
      l._initialStyle = {
        transition: "",
        overflow: l.style.overflow,
        [n]: l.style[n]
      }, l.style.overflow = "hidden", l.style[n] = `${l[i]}px`, l.offsetHeight, requestAnimationFrame(() => l.style[n] = "0");
    },
    onAfterLeave: r,
    onLeaveCancelled: r
  };
  function r(l) {
    e && l._parent && l._parent.classList.remove(e), o(l);
  }
  function o(l) {
    const s = l._initialStyle[n];
    l.style.overflow = l._initialStyle.overflow, s != null && (l.style[n] = s), delete l._initialStyle;
  }
}
const Jp = Z({
  target: [Object, Array]
}, "v-dialog-transition"), cu = de()({
  name: "VDialogTransition",
  props: Jp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = {
      onBeforeEnter(r) {
        r.style.pointerEvents = "none", r.style.visibility = "hidden";
      },
      async onEnter(r, o) {
        var f;
        await new Promise((h) => requestAnimationFrame(h)), await new Promise((h) => requestAnimationFrame(h)), r.style.visibility = "";
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = cf(e.target, r), d = pi(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: lp
        });
        (f = uf(r)) == null || f.forEach((h) => {
          pi(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Hr
          });
        }), d.finished.then(() => o());
      },
      onAfterEnter(r) {
        r.style.removeProperty("pointer-events");
      },
      onBeforeLeave(r) {
        r.style.pointerEvents = "none";
      },
      async onLeave(r, o) {
        var f;
        await new Promise((h) => requestAnimationFrame(h));
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = cf(e.target, r);
        pi(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: sp
        }).finished.then(() => o()), (f = uf(r)) == null || f.forEach((h) => {
          pi(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Hr
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? y(Rn, he({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : y(Rn, {
      name: "dialog-transition"
    }, n);
  }
});
function uf(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function cf(e, t) {
  const n = Ph(e), i = eu(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((g) => parseFloat(g)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let a = n.left + n.width / 2;
  l === "left" || s === "left" ? a -= n.width / 2 : (l === "right" || s === "right") && (a += n.width / 2);
  let u = n.top + n.height / 2;
  l === "top" || s === "top" ? u -= n.height / 2 : (l === "bottom" || s === "bottom") && (u += n.height / 2);
  const c = n.width / i.width, d = n.height / i.height, f = Math.max(1, c, d), h = c / f || 0, v = d / f || 0, m = i.width * i.height / (window.innerWidth * window.innerHeight), p = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
  return {
    x: a - (r + i.left),
    y: u - (o + i.top),
    sx: h,
    sy: v,
    speed: p
  };
}
jt("fab-transition", "center center", "out-in");
jt("dialog-bottom-transition");
jt("dialog-top-transition");
const ff = jt("fade-transition"), mv = jt("scale-transition");
jt("scroll-x-transition");
jt("scroll-x-reverse-transition");
jt("scroll-y-transition");
jt("scroll-y-reverse-transition");
jt("slide-x-transition");
jt("slide-x-reverse-transition");
const gv = jt("slide-y-transition");
jt("slide-y-reverse-transition");
const yv = hv("expand-transition", vv()), pv = hv("expand-x-transition", vv("", !0));
function ks(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Qp(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function df(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return ks({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return ks({
      x: r,
      y: o
    }, t);
  }
  return ks({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const bv = {
  static: n1,
  // specific viewport position, usually centered
  connected: r1
  // connected to a certain element
}, e1 = Z({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in bv
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function t1(e, t) {
  const n = te({}), i = te();
  Be && Ei(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    we(() => e.locationStrategy, o), bt(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = bv[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
  });
  function r(o) {
    var l;
    (l = i.value) == null || l.call(i, o);
  }
  return {
    contentStyles: n,
    updateLocation: i
  };
}
function n1() {
}
function i1(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = eu(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function r1(e, t, n) {
  (Array.isArray(e.target.value) || cp(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = Qa(() => {
    const v = Xs(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? bs(v) : Xs(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === ws(m).align ? {
      preferredAnchor: Fc(v),
      preferredOrigin: Fc(m)
    } : {
      preferredAnchor: v,
      preferredOrigin: m
    };
  }), [l, s, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((v) => C(() => {
    const m = parseFloat(t[v]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = C(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const v = t.offset.split(" ").map(parseFloat);
      return v.length < 2 && v.push(0), v;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let d = !1;
  const f = new ResizeObserver(() => {
    d && h();
  });
  we([e.target, e.contentEl], (v, m) => {
    let [p, g] = v, [w, x] = m;
    w && !Array.isArray(w) && f.unobserve(w), p && !Array.isArray(p) && f.observe(p), x && f.unobserve(x), g && f.observe(g);
  }, {
    immediate: !0
  }), bt(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const v = Ph(e.target.value), m = i1(e.contentEl.value, e.isRtl.value), p = cl(e.contentEl.value), g = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((D, L) => {
      const I = L.getBoundingClientRect(), _ = new ki({
        x: L === document.documentElement ? 0 : I.x,
        y: L === document.documentElement ? 0 : I.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return D ? new ki({
        x: Math.max(D.left, _.left),
        y: Math.max(D.top, _.top),
        width: Math.min(D.right, _.right) - Math.max(D.left, _.left),
        height: Math.min(D.bottom, _.bottom) - Math.max(D.top, _.top)
      }) : _;
    }, void 0);
    w.x += g, w.y += g, w.width -= g * 2, w.height -= g * 2;
    let x = {
      anchor: r.value,
      origin: o.value
    };
    function b(D) {
      const L = new ki(m), I = df(D.anchor, v), _ = df(D.origin, L);
      let {
        x: O,
        y: M
      } = Qp(I, _);
      switch (D.anchor.side) {
        case "top":
          M -= c.value[0];
          break;
        case "bottom":
          M += c.value[0];
          break;
        case "left":
          O -= c.value[0];
          break;
        case "right":
          O += c.value[0];
          break;
      }
      switch (D.anchor.align) {
        case "top":
          M -= c.value[1];
          break;
        case "bottom":
          M += c.value[1];
          break;
        case "left":
          O -= c.value[1];
          break;
        case "right":
          O += c.value[1];
          break;
      }
      return L.x += O, L.y += M, L.width = Math.min(L.width, a.value), L.height = Math.min(L.height, u.value), {
        overflows: Hc(L, w),
        x: O,
        y: M
      };
    }
    let k = 0, E = 0;
    const S = {
      x: 0,
      y: 0
    }, P = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; !($++ > 10); ) {
      const {
        x: D,
        y: L,
        overflows: I
      } = b(x);
      k += D, E += L, m.x += D, m.y += L;
      {
        const _ = Dc(x.anchor), O = I.x.before || I.x.after, M = I.y.before || I.y.after;
        let j = !1;
        if (["x", "y"].forEach((N) => {
          if (N === "x" && O && !P.x || N === "y" && M && !P.y) {
            const F = {
              anchor: {
                ...x.anchor
              },
              origin: {
                ...x.origin
              }
            }, B = N === "x" ? _ === "y" ? ws : bs : _ === "y" ? bs : ws;
            F.anchor = B(F.anchor), F.origin = B(F.origin);
            const {
              overflows: H
            } = b(F);
            (H[N].before <= I[N].before && H[N].after <= I[N].after || H[N].before + H[N].after < (I[N].before + I[N].after) / 2) && (x = F, j = P[N] = !0);
          }
        }), j) continue;
      }
      I.x.before && (k += I.x.before, m.x += I.x.before), I.x.after && (k -= I.x.after, m.x -= I.x.after), I.y.before && (E += I.y.before, m.y += I.y.before), I.y.after && (E -= I.y.after, m.y -= I.y.after);
      {
        const _ = Hc(m, w);
        S.x = w.width - _.x.before - _.x.after, S.y = w.height - _.y.before - _.y.after, k += _.x.before, m.x += _.x.before, E += _.y.before, m.y += _.y.before;
      }
      break;
    }
    const R = Dc(x.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ye(Ss(E)),
      left: e.isRtl.value ? void 0 : ye(Ss(k)),
      right: e.isRtl.value ? ye(Ss(-k)) : void 0,
      minWidth: ye(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: ye(hf(Bt(S.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: ye(hf(Bt(S.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: S,
      contentBox: m
    };
  }
  return we(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), Ze(() => {
    const v = h();
    if (!v) return;
    const {
      available: m,
      contentBox: p
    } = v;
    p.height > m.y && requestAnimationFrame(() => {
      h(), requestAnimationFrame(() => {
        h();
      });
    });
  }), {
    updateLocation: h
  };
}
function Ss(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function hf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let na = !0;
const vl = [];
function o1(e) {
  !na || vl.length ? (vl.push(e), ia()) : (na = !1, e(), ia());
}
let vf = -1;
function ia() {
  cancelAnimationFrame(vf), vf = requestAnimationFrame(() => {
    const e = vl.shift();
    e && e(), vl.length ? ia() : na = !0;
  });
}
const Go = {
  none: null,
  close: a1,
  block: u1,
  reposition: c1
}, l1 = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Go
  }
}, "VOverlay-scroll-strategies");
function s1(e, t) {
  if (!Be) return;
  let n;
  Cn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Ma(), await Ze(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = Go[e.scrollStrategy]) == null || i.call(Go, t, e, n);
    }));
  }), bt(() => {
    n == null || n.stop();
  });
}
function a1(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  wv(e.targetEl.value ?? e.contentEl.value, t);
}
function u1(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...cl(e.targetEl.value, t.contained ? n : void 0), ...cl(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => ru(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", ye(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ye(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ye(r)), s.classList.add("v-overlay-scroll-blocked");
  }), bt(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function c1(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    o1(() => {
      var c, d;
      const a = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      wv(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), bt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function wv(e, t) {
  const n = [document, ...cl(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), bt(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const ra = Symbol.for("vuetify:v-menu"), f1 = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function d1(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = My(s, () => {
        t == null || t(l), a(l);
      });
    });
  }
  function r() {
    return i(!0);
  }
  function o() {
    return i(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: r,
    runCloseDelay: o
  };
}
const h1 = Z({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...f1()
}, "VOverlay-activator");
function v1(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = ot("useActivator"), o = te();
  let l = !1, s = !1, a = !0;
  const u = C(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = C(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = d1(e, (S) => {
    S === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== S && (a = !0), n.value = S);
  }), h = te(), v = {
    onClick: (S) => {
      S.stopPropagation(), o.value = S.currentTarget || S.target, n.value || (h.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      var P;
      (P = S.sourceCapabilities) != null && P.firesTouchEvents || (l = !0, o.value = S.currentTarget || S.target, d());
    },
    onMouseleave: (S) => {
      l = !1, f();
    },
    onFocus: (S) => {
      al(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), o.value = S.currentTarget || S.target, d());
    },
    onBlur: (S) => {
      s = !1, S.stopPropagation(), f();
    }
  }, m = C(() => {
    const S = {};
    return c.value && (S.onClick = v.onClick), e.openOnHover && (S.onMouseenter = v.onMouseenter, S.onMouseleave = v.onMouseleave), u.value && (S.onFocus = v.onFocus, S.onBlur = v.onBlur), S;
  }), p = C(() => {
    const S = {};
    if (e.openOnHover && (S.onMouseenter = () => {
      l = !0, d();
    }, S.onMouseleave = () => {
      l = !1, f();
    }), u.value && (S.onFocusin = () => {
      s = !0, d();
    }, S.onFocusout = () => {
      s = !1, f();
    }), e.closeOnContentClick) {
      const P = ze(ra, null);
      S.onClick = () => {
        n.value = !1, P == null || P.closeParents();
      };
    }
    return S;
  }), g = C(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      a && (l = !0, a = !1, d());
    }, S.onMouseleave = () => {
      l = !1, f();
    }), S;
  });
  we(i, (S) => {
    S && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), we(n, (S) => {
    S || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = te();
  Cn(() => {
    w.value && Ze(() => {
      o.value = Fr(w.value);
    });
  });
  const x = te(), b = C(() => e.target === "cursor" && h.value ? h.value : x.value ? Fr(x.value) : xv(e.target, r) || o.value), k = C(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return we(() => !!e.activator, (S) => {
    S && Be ? (E = Ma(), E.run(() => {
      m1(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), bt(() => {
    E == null || E.stop();
  }), {
    activatorEl: o,
    activatorRef: w,
    target: b,
    targetEl: k,
    targetRef: x,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: g
  };
}
function m1(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  we(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && Ze(() => o());
  }, {
    immediate: !0
  }), we(() => e.activatorProps, () => {
    o();
  }), bt(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Ny(a, he(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Ry(a, he(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = xv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function xv(e, t) {
  var i, r;
  if (!e) return;
  let n;
  if (e === "parent") {
    let o = (r = (i = t == null ? void 0 : t.proxy) == null ? void 0 : i.$el) == null ? void 0 : r.parentNode;
    for (; o != null && o.hasAttribute("data-no-activator"); )
      o = o.parentNode;
    n = o;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
const Zl = ["sm", "md", "lg", "xl", "xxl"], oa = Symbol.for("vuetify:display"), mf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, g1 = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mf;
  return Ft(mf, e);
};
function gf(e) {
  return Be && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function yf(e) {
  return Be && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function pf(e) {
  const t = Be && !e ? window.navigator.userAgent : "ssr";
  function n(v) {
    return !!t.match(v);
  }
  const i = n(/android/i), r = n(/iphone|ipad|ipod/i), o = n(/cordova/i), l = n(/electron/i), s = n(/chrome/i), a = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), d = n(/win/i), f = n(/mac/i), h = n(/linux/i);
  return {
    android: i,
    ios: r,
    cordova: o,
    electron: l,
    chrome: s,
    edge: a,
    firefox: u,
    opera: c,
    win: d,
    mac: f,
    linux: h,
    touch: Ey,
    ssr: t === "ssr"
  };
}
function y1(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = g1(e), r = be(yf(t)), o = be(pf(t)), l = un({}), s = be(gf(t));
  function a() {
    r.value = yf(), s.value = gf();
  }
  function u() {
    a(), o.value = pf();
  }
  return Cn(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), m = s.value >= n.xxl, p = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", g = typeof i == "number" ? i : n[i], w = s.value < g;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = p, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Be && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...Da(l),
    update: u,
    ssr: !!t
  };
}
const p1 = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function fu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = ze(oa);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const i = C(() => {
    if (!e.mobileBreakpoint) return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o;
  }), r = C(() => t ? {
    [`${t}--mobile`]: i.value
  } : {});
  return {
    ...n,
    displayClasses: r,
    mobile: i
  };
}
function b1() {
  if (!Be) return be(!1);
  const {
    ssr: e
  } = fu();
  if (e) {
    const t = be(!1);
    return fn(() => {
      t.value = !0;
    }), t;
  } else
    return be(!0);
}
const Jl = Z({
  eager: Boolean
}, "lazy");
function du(e, t) {
  const n = be(!1), i = C(() => n.value || e.eager || t.value);
  we(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: r
  };
}
function uo() {
  const t = ot("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const bf = Symbol.for("vuetify:stack"), yr = un([]);
function w1(e, t, n) {
  const i = ot("useStack"), r = !n, o = ze(bf, void 0), l = un({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ct(bf, l);
  const s = be(+t.value);
  Ei(e, () => {
    var d;
    const c = (d = yr.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, r && yr.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), bt(() => {
      if (r) {
        const f = _e(yr).findIndex((h) => h[0] === i.uid);
        yr.splice(f, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = be(!0);
  r && Cn(() => {
    var d;
    const c = ((d = yr.at(-1)) == null ? void 0 : d[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = C(() => !l.activeChildren.size);
  return {
    globalTop: Qr(a),
    localTop: u,
    stackStyles: C(() => ({
      zIndex: s.value
    }))
  };
}
function x1(e) {
  return {
    teleportTarget: C(() => {
      const n = e.value;
      if (n === !0 || !Be) return;
      const i = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (i == null)
        return;
      let r = i.querySelector(":scope > .v-overlay-container");
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", i.appendChild(r)), r;
    })
  };
}
function _1() {
  return !0;
}
function _v(e, t, n) {
  if (!e || kv(e, n) === !1) return !1;
  const i = Hh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function kv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || _1)(e);
}
function k1(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && _v(e, t, n) && setTimeout(() => {
    kv(e, n) && i && i(e);
  }, 0);
}
function wf(e, t) {
  const n = Hh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const S1 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => k1(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = _v(r, e, t);
    };
    wf(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (wf(e, (n) => {
      var o;
      if (!n || !((o = e._clickOutside) != null && o[t.instance.$.uid])) return;
      const {
        onClick: i,
        onMousedown: r
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", i, !0), n.removeEventListener("mousedown", r, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function C1(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return y(Rn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && y("div", he({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const co = Z({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...h1(),
  ...ke(),
  ...oi(),
  ...Jl(),
  ...e1(),
  ...l1(),
  ...Je(),
  ...ao()
}, "VOverlay"), ii = de()({
  name: "VOverlay",
  directives: {
    ClickOutside: S1
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...co()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: i,
      emit: r
    } = t;
    const o = Ne(e, "modelValue"), l = C({
      get: () => o.value,
      set: (Q) => {
        Q && e.disabled || (o.value = Q);
      }
    }), {
      teleportTarget: s
    } = x1(C(() => e.attach || e.contained)), {
      themeClasses: a
    } = it(e), {
      rtlClasses: u,
      isRtl: c
    } = mn(), {
      hasContent: d,
      onAfterLeave: f
    } = du(e, l), h = Dt(C(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: p
    } = w1(l, ae(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: g,
      activatorRef: w,
      target: x,
      targetEl: b,
      targetRef: k,
      activatorEvents: E,
      contentEvents: S,
      scrimEvents: P
    } = v1(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = li(e), R = b1(), {
      scopeId: D
    } = uo();
    we(() => e.disabled, (Q) => {
      Q && (l.value = !1);
    });
    const L = te(), I = te(), {
      contentStyles: _,
      updateLocation: O
    } = t1(e, {
      isRtl: c,
      contentEl: I,
      target: x,
      isActive: l
    });
    s1(e, {
      root: L,
      contentEl: I,
      targetEl: b,
      isActive: l,
      updateLocation: O
    });
    function M(Q) {
      r("click:outside", Q), e.persistent ? H() : l.value = !1;
    }
    function j() {
      return l.value && v.value;
    }
    Be && we(l, (Q) => {
      Q ? window.addEventListener("keydown", N) : window.removeEventListener("keydown", N);
    }, {
      immediate: !0
    }), dn(() => {
      Be && window.removeEventListener("keydown", N);
    });
    function N(Q) {
      var se, fe;
      Q.key === "Escape" && v.value && (e.persistent ? H() : (l.value = !1, (se = I.value) != null && se.contains(document.activeElement) && ((fe = g.value) == null || fe.focus())));
    }
    const F = Rp();
    Ei(() => e.closeOnBack, () => {
      Op(F, (Q) => {
        v.value && l.value ? (Q(!1), e.persistent ? H() : l.value = !1) : Q();
      });
    });
    const B = te();
    we(() => l.value && (e.absolute || e.contained) && s.value == null, (Q) => {
      if (Q) {
        const se = zh(L.value);
        se && se !== document.scrollingElement && (B.value = se.scrollTop);
      }
    });
    function H() {
      e.noClickAnimation || I.value && pi(I.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Hr
      });
    }
    function Y() {
      f(), r("afterLeave");
    }
    return ve(() => {
      var Q;
      return y(Le, null, [(Q = n.activator) == null ? void 0 : Q.call(n, {
        isActive: l.value,
        props: he({
          ref: w,
          targetRef: k
        }, E.value, e.activatorProps)
      }), R.value && d.value && y(R0, {
        disabled: !s.value,
        to: s.value
      }, {
        default: () => [y("div", he({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": l.value,
            "v-overlay--contained": e.contained
          }, a.value, u.value, e.class],
          style: [p.value, {
            "--v-overlay-opacity": e.opacity,
            top: ye(B.value)
          }, e.style],
          ref: L
        }, D, i), [y(C1, he({
          color: h,
          modelValue: l.value && !!e.scrim
        }, P.value), null), y(Mn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var se;
            return [je(y("div", he({
              ref: I,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, _.value]
            }, S.value, e.contentProps), [(se = n.default) == null ? void 0 : se.call(n, {
              isActive: l
            })]), [[pt, l.value], [cn("click-outside"), {
              handler: M,
              closeConditional: j,
              include: () => [g.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: g,
      target: x,
      animateClick: H,
      contentEl: I,
      globalTop: v,
      localTop: m,
      updateLocation: O
    };
  }
}), Cs = Symbol("Forwarded refs");
function Es(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i) return i;
    n = Object.getPrototypeOf(n);
  }
}
function si(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[Cs] = n, new Proxy(e, {
    get(r, o) {
      if (Reflect.has(r, o))
        return Reflect.get(r, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const l of n)
          if (l.value && Reflect.has(l.value, o)) {
            const s = Reflect.get(l.value, o);
            return typeof s == "function" ? s.bind(l.value) : s;
          }
      }
    },
    has(r, o) {
      if (Reflect.has(r, o))
        return !0;
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, o))
          return !0;
      return !1;
    },
    set(r, o, l) {
      if (Reflect.has(r, o))
        return Reflect.set(r, o, l);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__")) return !1;
      for (const s of n)
        if (s.value && Reflect.has(s.value, o))
          return Reflect.set(s.value, o, l);
      return !1;
    },
    getOwnPropertyDescriptor(r, o) {
      var s;
      const l = Reflect.getOwnPropertyDescriptor(r, o);
      if (l) return l;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const a of n) {
          if (!a.value) continue;
          const u = Es(a.value, o) ?? ("_" in a.value ? Es((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[Cs];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = Es(d.value, o);
            if (f) return f;
            const h = d.value && d.value[Cs];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const E1 = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...co({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: cu
    },
    zIndex: 2400
  })
}, "VDialog"), hu = de()({
  name: "VDialog",
  props: E1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), {
      scopeId: r
    } = uo(), o = te();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = o.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = o.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Dr(o.value.contentEl);
        if (!h.length) return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Be && we(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), we(i, async (a) => {
      var u, c;
      await Ze(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = C(() => he({
      "aria-haspopup": "dialog",
      "aria-expanded": String(i.value)
    }, e.activatorProps));
    return ve(() => {
      const a = ii.filterProps(e);
      return y(ii, he({
        ref: o,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, a, {
        modelValue: i.value,
        "onUpdate:modelValue": (u) => i.value = u,
        "aria-modal": "true",
        activatorProps: s.value,
        role: "dialog"
      }, r), {
        activator: n.activator,
        default: function() {
          for (var u = arguments.length, c = new Array(u), d = 0; d < u; d++)
            c[d] = arguments[d];
          return y(nt, {
            root: "VDialog"
          }, {
            default: () => {
              var f;
              return [(f = n.default) == null ? void 0 : f.call(n, ...c)];
            }
          });
        }
      });
    }), si({}, o);
  }
});
function xf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function _f(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: i,
    isRtl: r,
    currentScrollOffset: o,
    isHorizontal: l
  } = e;
  const s = l ? t.clientWidth : t.clientHeight, a = l ? t.offsetLeft : t.offsetTop, u = r && l ? i - a - s : a, c = n + o, d = s + u, f = s * 0.4;
  return u <= o ? o = Math.max(u - f, 0) : c <= d && (o = Math.min(o - (c - d - f), i - n)), o;
}
function V1(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: i,
    isRtl: r,
    isHorizontal: o
  } = e;
  const l = o ? t.clientWidth : t.clientHeight, s = o ? t.offsetLeft : t.offsetTop, a = r && o ? i - s - l / 2 - n / 2 : s + l / 2 - n / 2;
  return Math.min(i - n, Math.max(0, a));
}
const L1 = Symbol.for("vuetify:v-slide-group"), vu = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: L1
  },
  nextIcon: {
    type: Me,
    default: "$next"
  },
  prevIcon: {
    type: Me,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...ke(),
  ...p1(),
  ...Ye(),
  ...Hl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), ml = de()({
  name: "VSlideGroup",
  props: vu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = mn(), {
      displayClasses: r,
      mobile: o
    } = fu(e), l = no(e, e.symbol), s = be(!1), a = be(0), u = be(0), c = be(0), d = C(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = rr(), {
      resizeRef: v,
      contentRect: m
    } = rr(), p = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[0]) : -1), g = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Be) {
      let H = -1;
      we(() => [l.selected.value, h.value, m.value, d.value], () => {
        cancelAnimationFrame(H), H = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Y = d.value ? "width" : "height";
            u.value = h.value[Y], c.value = m.value[Y], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const Y = v.value.children[g.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = V1({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: d.value
            }) : s.value && (a.value = _f({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              currentScrollOffset: a.value,
              isHorizontal: d.value
            }));
          }
        });
      });
    }
    const w = be(!1);
    let x = 0, b = 0;
    function k(H) {
      const Y = d.value ? "clientX" : "clientY";
      b = (i.value && d.value ? -1 : 1) * a.value, x = H.touches[0][Y], w.value = !0;
    }
    function E(H) {
      if (!s.value) return;
      const Y = d.value ? "clientX" : "clientY", Q = i.value && d.value ? -1 : 1;
      a.value = Q * (b + x - H.touches[0][Y]);
    }
    function S(H) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function P() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = be(!1);
    function R(H) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const Y of H.composedPath())
          for (const Q of v.value.children)
            if (Q === Y) {
              a.value = _f({
                selectedElement: Q,
                containerSize: u.value,
                contentSize: c.value,
                isRtl: i.value,
                currentScrollOffset: a.value,
                isHorizontal: d.value
              });
              return;
            }
      }
    }
    function D(H) {
      $.value = !1;
    }
    function L(H) {
      var Y;
      !$.value && !(H.relatedTarget && ((Y = v.value) != null && Y.contains(H.relatedTarget))) && _();
    }
    function I(H) {
      v.value && (d.value ? H.key === "ArrowRight" ? _(i.value ? "prev" : "next") : H.key === "ArrowLeft" && _(i.value ? "next" : "prev") : H.key === "ArrowDown" ? _("next") : H.key === "ArrowUp" && _("prev"), H.key === "Home" ? _("first") : H.key === "End" && _("last"));
    }
    function _(H) {
      var Y, Q, se, fe, J;
      if (v.value)
        if (!H)
          (Y = Dr(v.value)[0]) == null || Y.focus();
        else if (H === "next") {
          const le = (Q = v.value.querySelector(":focus")) == null ? void 0 : Q.nextElementSibling;
          le ? le.focus() : _("first");
        } else if (H === "prev") {
          const le = (se = v.value.querySelector(":focus")) == null ? void 0 : se.previousElementSibling;
          le ? le.focus() : _("last");
        } else H === "first" ? (fe = v.value.firstElementChild) == null || fe.focus() : H === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function O(H) {
      const Y = a.value + (H === "prev" ? -1 : 1) * u.value;
      a.value = Bt(Y, 0, c.value - u.value);
    }
    const M = C(() => {
      let H = a.value > c.value - u.value ? -(c.value - u.value) + xf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (H = xf(-a.value));
      const Y = i.value && d.value ? -1 : 1;
      return {
        transform: `translate${d.value ? "X" : "Y"}(${Y * H}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), j = C(() => ({
      next: l.next,
      prev: l.prev,
      select: l.select,
      isSelected: l.isSelected
    })), N = C(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !o.value;
        case !0:
          return s.value || Math.abs(a.value) > 0;
        case "mobile":
          return o.value || s.value || Math.abs(a.value) > 0;
        default:
          return !o.value && (s.value || Math.abs(a.value) > 0);
      }
    }), F = C(() => Math.abs(a.value) > 0), B = C(() => c.value > Math.abs(a.value) + u.value);
    return ve(() => y(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": N.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: L
    }, {
      default: () => {
        var H, Y, Q;
        return [N.value && y("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && O("prev")
        }, [((H = n.prev) == null ? void 0 : H.call(n, j.value)) ?? y(ff, null, {
          default: () => [y(Ge, {
            icon: i.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), y("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: P
        }, [y("div", {
          ref: v,
          class: "v-slide-group__content",
          style: M.value,
          onTouchstartPassive: k,
          onTouchmovePassive: E,
          onTouchendPassive: S,
          onFocusin: R,
          onFocusout: D,
          onKeydown: I
        }, [(Y = n.default) == null ? void 0 : Y.call(n, j.value)])]), N.value && y("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }],
          onClick: () => B.value && O("next")
        }, [((Q = n.next) == null ? void 0 : Q.call(n, j.value)) ?? y(ff, null, {
          default: () => [y(Ge, {
            icon: i.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: l.selected,
      scrollTo: O,
      scrollOffset: a,
      focus: _
    };
  }
}), Sv = Symbol.for("vuetify:v-chip-group"), P1 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ai
  },
  ...vu(),
  ...ke(),
  ...Hl({
    selectedClass: "v-chip--selected"
  }),
  ...Ye(),
  ...Je(),
  ...zn({
    variant: "tonal"
  })
}, "VChipGroup");
de()({
  name: "VChipGroup",
  props: P1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = no(e, Sv);
    return En({
      VChip: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        filter: ae(e, "filter"),
        variant: ae(e, "variant")
      }
    }), ve(() => {
      const u = ml.filterProps(e);
      return y(ml, he(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, i.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: r,
            select: o,
            next: l,
            prev: s,
            selected: a.value
          })];
        }
      });
    }), {};
  }
});
const I1 = Z({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Me,
  closable: Boolean,
  closeIcon: {
    type: Me,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: Me,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: sn(),
  onClickOnce: sn(),
  ...$i(),
  ...ke(),
  ...Zt(),
  ...Hn(),
  ...jl(),
  ...Pt(),
  ...Kl(),
  ...io(),
  ...Ye({
    tag: "span"
  }),
  ...Je(),
  ...zn({
    variant: "tonal"
  })
}, "VChip"), Cv = de()({
  name: "VChip",
  directives: {
    Ripple: Ri
  },
  props: I1(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: i,
      slots: r
    } = t;
    const {
      t: o
    } = oo(), {
      borderClasses: l
    } = Ni(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = dr(e), {
      densityClasses: c
    } = vn(e), {
      elevationClasses: d
    } = jn(e), {
      roundedClasses: f
    } = It(e), {
      sizeClasses: h
    } = ro(e), {
      themeClasses: v
    } = it(e), m = Ne(e, "modelValue"), p = zl(e, Sv, !1), g = Yl(e, n), w = C(() => e.link !== !1 && g.isLink.value), x = C(() => !e.disabled && e.link !== !1 && (!!p || e.link || g.isClickable.value)), b = C(() => ({
      "aria-label": o(e.closeLabel),
      onClick(S) {
        S.stopPropagation(), m.value = !1, i("click:close", S);
      }
    }));
    function k(S) {
      var P;
      i("click", S), x.value && ((P = g.navigate) == null || P.call(g, S), p == null || p.toggle());
    }
    function E(S) {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), k(S));
    }
    return () => {
      const S = g.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), $ = !!(P || r.append), R = !!(r.close || e.closable), D = !!(r.filter || e.filter) && p, L = !!(e.prependIcon || e.prependAvatar), I = !!(L || r.prepend), _ = !p || p.isSelected.value;
      return m.value && je(y(S, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": x.value,
          "v-chip--filter": D,
          "v-chip--pill": e.pill
        }, v.value, l.value, _ ? s.value : void 0, c.value, d.value, f.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [_ ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: g.href.value,
        tabindex: x.value ? 0 : void 0,
        onClick: k,
        onKeydown: x.value && !w.value && E
      }, {
        default: () => {
          var O;
          return [fr(x.value, "v-chip"), D && y(pv, {
            key: "filter"
          }, {
            default: () => [je(y("div", {
              class: "v-chip__filter"
            }, [r.filter ? y(nt, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : y(Ge, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[pt, p.isSelected.value]])]
          }), I && y("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? y(nt, {
            key: "prepend-defaults",
            disabled: !L,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, r.prepend) : y(Le, null, [e.prependIcon && y(Ge, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && y(Vi, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), y("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((O = r.default) == null ? void 0 : O.call(r, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), $ && y("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? y(nt, {
            key: "append-defaults",
            disabled: !P,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, r.append) : y(Le, null, [e.appendIcon && y(Ge, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(Vi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && y("button", he({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? y(nt, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : y(Ge, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[cn("ripple"), x.value && e.ripple, null]]);
    };
  }
}), T1 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ke(),
  ...ao({
    transition: {
      component: gv
    }
  })
}, "VCounter"), Ev = de()({
  name: "VCounter",
  functional: !0,
  props: T1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ve(() => y(Mn, {
      transition: e.transition
    }, {
      default: () => [je(y("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[pt, e.active]])]
    })), {};
  }
}), M1 = Z({
  text: String,
  onClick: sn(),
  ...ke(),
  ...Je()
}, "VLabel"), Ql = de()({
  name: "VLabel",
  props: M1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => {
      var i;
      return y("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), A1 = Z({
  floating: Boolean,
  ...ke()
}, "VFieldLabel"), Lo = de()({
  name: "VFieldLabel",
  props: A1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(Ql, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Vv(e) {
  const {
    t
  } = oo();
  function n(i) {
    let {
      name: r
    } = i;
    const o = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[r], l = e[`onClick:${r}`], s = l && o ? t(`$vuetify.input.${o}`, e.label ?? "") : void 0;
    return y(Ge, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const mu = Z({
  focused: Boolean,
  "onUpdate:focused": sn()
}, "focus");
function hr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = Ne(e, "focused"), i = C(() => ({
    [`${t}--focused`]: n.value
  }));
  function r() {
    n.value = !0;
  }
  function o() {
    n.value = !1;
  }
  return {
    focusClasses: i,
    isFocused: n,
    focus: r,
    blur: o
  };
}
const $1 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], gu = Z({
  appendInnerIcon: Me,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Me,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: Me,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => $1.includes(e)
  },
  "onClick:clear": sn(),
  "onClick:appendInner": sn(),
  "onClick:prependInner": sn(),
  ...ke(),
  ...su(),
  ...Pt(),
  ...Je()
}, "VField"), yu = de()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...mu(),
    ...gu()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: i,
      slots: r
    } = t;
    const {
      themeClasses: o
    } = it(e), {
      loaderClasses: l
    } = Ul(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = hr(e), {
      InputIcon: d
    } = Vv(e), {
      roundedClasses: f
    } = It(e), {
      rtlClasses: h
    } = mn(), v = C(() => e.dirty || e.active), m = C(() => !e.singleLine && !!(e.label || r.label)), p = Lt(), g = C(() => e.id || `input-${p}`), w = C(() => `${g.value}-messages`), x = te(), b = te(), k = te(), E = C(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: S,
      backgroundColorStyles: P
    } = Dt(ae(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = an(C(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    we(v, (I) => {
      if (m.value) {
        const _ = x.value.$el, O = b.value.$el;
        requestAnimationFrame(() => {
          const M = eu(_), j = O.getBoundingClientRect(), N = j.x - M.x, F = j.y - M.y - (M.height / 2 - j.height / 2), B = j.width / 0.75, H = Math.abs(B - M.width) > 1 ? {
            maxWidth: ye(B)
          } : void 0, Y = getComputedStyle(_), Q = getComputedStyle(O), se = parseFloat(Y.transitionDuration) * 1e3 || 150, fe = parseFloat(Q.getPropertyValue("--v-field-label-scale")), J = Q.getPropertyValue("color");
          _.style.visibility = "visible", O.style.visibility = "hidden", pi(_, {
            transform: `translate(${N}px, ${F}px) scale(${fe})`,
            color: J,
            ...H
          }, {
            duration: se,
            easing: Hr,
            direction: I ? "normal" : "reverse"
          }).finished.then(() => {
            _.style.removeProperty("visibility"), O.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const D = C(() => ({
      isActive: v,
      isFocused: a,
      controlRef: k,
      blur: c,
      focus: u
    }));
    function L(I) {
      I.target !== document.activeElement && I.preventDefault();
    }
    return ve(() => {
      var N, F, B;
      const I = e.variant === "outlined", _ = r["prepend-inner"] || e.prependInnerIcon, O = !!(e.clearable || r.clear), M = !!(r["append-inner"] || e.appendInnerIcon || O), j = () => r.label ? r.label({
        ...D.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return y("div", he({
        class: ["v-field", {
          "v-field--active": v.value,
          "v-field--appended": M,
          "v-field--center-affix": e.centerAffix ?? !E.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": _,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !j(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, S.value, s.value, l.value, f.value, h.value, e.class],
        style: [P.value, e.style],
        onClick: L
      }, n), [y("div", {
        class: "v-field__overlay"
      }, null), y(au, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: r.loader
      }), _ && y("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && y(d, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (N = r["prepend-inner"]) == null ? void 0 : N.call(r, D.value)]), y("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && y(Lo, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: g.value,
        style: R.value
      }, {
        default: () => [j()]
      }), y(Lo, {
        ref: x,
        for: g.value
      }, {
        default: () => [j()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...D.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), O && y(pv, {
        key: "clear"
      }, {
        default: () => [je(y("div", {
          class: "v-field__clearable",
          onMousedown: (H) => {
            H.preventDefault(), H.stopPropagation();
          }
        }, [r.clear ? r.clear() : y(d, {
          name: "clear"
        }, null)]), [[pt, e.dirty]])]
      }), M && y("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(B = r["append-inner"]) == null ? void 0 : B.call(r, D.value), e.appendInnerIcon && y(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), y("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [I && y(Le, null, [y("div", {
        class: "v-field__outline__start"
      }, null), m.value && y("div", {
        class: "v-field__outline__notch"
      }, [y(Lo, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [j()]
      })]), y("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && m.value && y(Lo, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [j()]
      })])]);
    }), {
      controlRef: k
    };
  }
});
function Lv(e) {
  const t = Object.keys(yu.props).filter((n) => !Ja(n) && n !== "class" && n !== "style");
  return xh(e, t);
}
const N1 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ke(),
  ...ao({
    transition: {
      component: gv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), R1 = de()({
  name: "VMessages",
  props: N1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => kn(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = an(C(() => e.color));
    return ve(() => y(Mn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", r.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && i.value.map((l, s) => y("div", {
        class: "v-messages__message",
        key: `${s}-${i.value}`
      }, [n.message ? n.message({
        message: l
      }) : l]))]
    })), {};
  }
}), O1 = Symbol.for("vuetify:form");
function Pv() {
  return ze(O1, null);
}
const B1 = Z({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...mu()
}, "validation");
function F1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lt();
  const i = Ne(e, "modelValue"), r = C(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Pv(), l = te([]), s = be(!0), a = C(() => !!(kn(i.value === "" ? null : i.value).length || kn(r.value === "" ? null : r.value).length)), u = C(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = C(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), d = C(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? kn(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
  }), f = C(() => {
    let b = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    b === "lazy" && (b = "input lazy");
    const k = new Set((b == null ? void 0 : b.split(" ")) ?? []);
    return {
      blur: k.has("blur") || k.has("input"),
      input: k.has("input"),
      submit: k.has("submit"),
      lazy: k.has("lazy")
    };
  }), h = C(() => {
    var b;
    return e.error || (b = e.errorMessages) != null && b.length ? !1 : e.rules.length ? s.value ? l.value.length || f.value.lazy ? null : !0 : !l.value.length : !0;
  }), v = be(!1), m = C(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = C(() => e.name ?? rn(n));
  Nl(() => {
    o == null || o.register({
      id: p.value,
      validate: x,
      reset: g,
      resetValidation: w
    });
  }), dn(() => {
    o == null || o.unregister(p.value);
  }), fn(async () => {
    f.value.lazy || await x(!0), o == null || o.update(p.value, h.value, d.value);
  }), Ei(() => f.value.input, () => {
    we(r, () => {
      if (r.value != null)
        x();
      else if (e.focused) {
        const b = we(() => e.focused, (k) => {
          k || x(), b();
        });
      }
    });
  }), Ei(() => f.value.blur, () => {
    we(() => e.focused, (b) => {
      b || x();
    });
  }), we([h, d], () => {
    o == null || o.update(p.value, h.value, d.value);
  });
  function g() {
    i.value = null, Ze(w);
  }
  function w() {
    s.value = !0, f.value.lazy ? l.value = [] : x(!0);
  }
  async function x() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const k = [];
    v.value = !0;
    for (const E of e.rules) {
      if (k.length >= +(e.maxErrors ?? 1))
        break;
      const P = await (typeof E == "function" ? E : () => E)(r.value);
      if (P !== !0) {
        if (P !== !1 && typeof P != "string") {
          console.warn(`${P} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        k.push(P || "");
      }
    }
    return l.value = k, v.value = !1, s.value = b, l.value;
  }
  return {
    errorMessages: d,
    isDirty: a,
    isDisabled: u,
    isReadonly: c,
    isPristine: s,
    isValid: h,
    isValidating: v,
    reset: g,
    resetValidation: w,
    validate: x,
    validationClasses: m
  };
}
const Oi = Z({
  id: String,
  appendIcon: Me,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Me,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": sn(),
  "onClick:append": sn(),
  ...ke(),
  ...Zt(),
  ...B1()
}, "VInput"), Kt = de()({
  name: "VInput",
  props: {
    ...Oi()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const {
      densityClasses: o
    } = vn(e), {
      rtlClasses: l
    } = mn(), {
      InputIcon: s
    } = Vv(e), a = Lt(), u = C(() => e.id || `input-${a}`), c = C(() => `${u.value}-messages`), {
      errorMessages: d,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: g,
      reset: w,
      resetValidation: x,
      validate: b,
      validationClasses: k
    } = F1(e, "v-input", u), E = C(() => ({
      id: u,
      messagesId: c,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: g,
      reset: w,
      resetValidation: x,
      validate: b
    })), S = C(() => {
      var P;
      return (P = e.errorMessages) != null && P.length || !m.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ve(() => {
      var L, I, _, O;
      const P = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), R = S.value.length > 0, D = !e.hideDetails || e.hideDetails === "auto" && (R || !!i.details);
      return y("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, k.value, e.class],
        style: e.style
      }, [P && y("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(L = i.prepend) == null ? void 0 : L.call(i, E.value), e.prependIcon && y(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && y("div", {
        class: "v-input__control"
      }, [(I = i.default) == null ? void 0 : I.call(i, E.value)]), $ && y("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && y(s, {
        key: "append-icon",
        name: "append"
      }, null), (_ = i.append) == null ? void 0 : _.call(i, E.value)]), D && y("div", {
        class: "v-input__details"
      }, [y(R1, {
        id: c.value,
        active: R,
        messages: S.value
      }, {
        message: i.message
      }), (O = i.details) == null ? void 0 : O.call(i, E.value)])]);
    }), {
      reset: w,
      resetValidation: x,
      validate: b,
      isValid: p,
      errorMessages: d
    };
  }
}), D1 = Z({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: "$vuetify.fileInput.counterSize"
  },
  counterString: {
    type: String,
    default: "$vuetify.fileInput.counter"
  },
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: !1,
    validator: (e) => typeof e == "boolean" || [1e3, 1024].includes(Number(e))
  },
  ...Oi({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => kn(e).every((t) => t != null && typeof t == "object")
  },
  ...gu({
    clearable: !0
  })
}, "VFileInput"), H1 = de()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: D1(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: i,
      slots: r
    } = t;
    const {
      t: o
    } = oo(), l = Ne(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = hr(e), c = C(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = C(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: D = 0
      } = R;
      return $ + D;
    }, 0)), f = C(() => Rc(d.value, c.value)), h = C(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: D = 0
      } = $;
      return e.showSize ? `${R} (${Rc(D, c.value)})` : R;
    })), v = C(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, f.value) : o(e.counterString, $);
    }), m = te(), p = te(), g = te(), w = C(() => s.value || e.active), x = C(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      g.value !== document.activeElement && (($ = g.value) == null || $.focus()), s.value || a();
    }
    function k($) {
      var R;
      (R = g.value) == null || R.click();
    }
    function E($) {
      i("mousedown:control", $);
    }
    function S($) {
      var R;
      (R = g.value) == null || R.click(), i("click:control", $);
    }
    function P($) {
      $.stopPropagation(), b(), Ze(() => {
        l.value = [], Ch(e["onClick:clear"], $);
      });
    }
    return we(l, ($) => {
      (!Array.isArray($) || !$.length) && g.value && (g.value.value = "");
    }), ve(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [D, L] = ur(n), {
        modelValue: I,
        ..._
      } = Kt.filterProps(e), O = Lv(e);
      return y(Kt, he({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (M) => l.value = M,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": x.value
        }, e.class],
        style: e.style,
        "onClick:prepend": k
      }, D, _, {
        centerAffix: !x.value,
        focused: s.value
      }), {
        ...r,
        default: (M) => {
          let {
            id: j,
            isDisabled: N,
            isDirty: F,
            isReadonly: B,
            isValid: H
          } = M;
          return y(yu, he({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: E,
            onClick: S,
            "onClick:clear": P,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, O, {
            id: j.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: N.value,
            focused: s.value,
            error: H.value === !1
          }), {
            ...r,
            default: (Y) => {
              var fe;
              let {
                props: {
                  class: Q,
                  ...se
                }
              } = Y;
              return y(Le, null, [y("input", he({
                ref: g,
                type: "file",
                readonly: B.value,
                disabled: N.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (J) => {
                  J.stopPropagation(), B.value && J.preventDefault(), b();
                },
                onChange: (J) => {
                  if (!J.target) return;
                  const le = J.target;
                  l.value = [...le.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, se, L), null), y("div", {
                class: Q
              }, [!!((fe = l.value) != null && fe.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: d.value,
                totalBytesReadable: f.value
              }) : e.chips ? h.value.map((J) => y(Cv, {
                key: J,
                size: "small",
                color: e.color
              }, {
                default: () => [J]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: R ? (M) => {
          var j, N;
          return y(Le, null, [(j = r.details) == null ? void 0 : j.call(r, M), $ && y(Le, null, [y("span", null, null), y(Ev, {
            active: !!((N = l.value) != null && N.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), si({}, m, p, g);
  }
}), Iv = Zl.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Tv = Zl.reduce((e, t) => {
  const n = "offset" + Fn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Mv = Zl.reduce((e, t) => {
  const n = "order" + Fn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), kf = {
  col: Object.keys(Iv),
  offset: Object.keys(Tv),
  order: Object.keys(Mv)
};
function j1(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const z1 = ["auto", "start", "end", "center", "baseline", "stretch"], G1 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Iv,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Tv,
  order: {
    type: [String, Number],
    default: null
  },
  ...Mv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => z1.includes(e)
  },
  ...ke(),
  ...Ye()
}, "VCol"), Gi = de()({
  name: "VCol",
  props: G1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => {
      const r = [];
      let o;
      for (o in kf)
        kf[o].forEach((s) => {
          const a = e[s], u = j1(o, s, a);
          u && r.push(u);
        });
      const l = r.some((s) => s.startsWith("v-col-"));
      return r.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !l || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), r;
    });
    return () => {
      var r;
      return ri(e.tag, {
        class: [i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), pu = ["start", "end", "center"], Av = ["space-between", "space-around", "space-evenly"];
function bu(e, t) {
  return Zl.reduce((n, i) => {
    const r = e + Fn(i);
    return n[r] = t(), n;
  }, {});
}
const U1 = [...pu, "baseline", "stretch"], $v = (e) => U1.includes(e), Nv = bu("align", () => ({
  type: String,
  default: null,
  validator: $v
})), W1 = [...pu, ...Av], Rv = (e) => W1.includes(e), Ov = bu("justify", () => ({
  type: String,
  default: null,
  validator: Rv
})), q1 = [...pu, ...Av, "stretch"], Bv = (e) => q1.includes(e), Fv = bu("alignContent", () => ({
  type: String,
  default: null,
  validator: Bv
})), Sf = {
  align: Object.keys(Nv),
  justify: Object.keys(Ov),
  alignContent: Object.keys(Fv)
}, Y1 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function K1(e, t, n) {
  let i = Y1[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const X1 = Z({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: $v
  },
  ...Nv,
  justify: {
    type: String,
    default: null,
    validator: Rv
  },
  ...Ov,
  alignContent: {
    type: String,
    default: null,
    validator: Bv
  },
  ...Fv,
  ...ke(),
  ...Ye()
}, "VRow"), kt = de()({
  name: "VRow",
  props: X1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => {
      const r = [];
      let o;
      for (o in Sf)
        Sf[o].forEach((l) => {
          const s = e[l], a = K1(o, l, s);
          a && r.push(a);
        });
      return r.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), r;
    });
    return () => {
      var r;
      return ri(e.tag, {
        class: ["v-row", i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), gl = cr("v-spacer", "div", "VSpacer"), Dv = Symbol.for("vuetify:selection-control-group"), wu = Z({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Me,
  trueIcon: Me,
  ripple: {
    type: Boolean,
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: Ai
  },
  ...ke(),
  ...Zt(),
  ...Je()
}, "SelectionControlGroup"), Z1 = Z({
  ...wu({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup"), J1 = de()({
  name: "VSelectionControlGroup",
  props: Z1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), r = Lt(), o = C(() => e.id || `v-selection-control-group-${r}`), l = C(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return ct(Dv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), bt(() => {
          s.delete(a);
        });
      }
    }), En({
      [e.defaultsTarget]: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        density: ae(e, "density"),
        error: ae(e, "error"),
        inline: ae(e, "inline"),
        modelValue: i,
        multiple: C(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)),
        name: l,
        falseIcon: ae(e, "falseIcon"),
        trueIcon: ae(e, "trueIcon"),
        readonly: ae(e, "readonly"),
        ripple: ae(e, "ripple"),
        type: ae(e, "type"),
        valueComparator: ae(e, "valueComparator")
      }
    }), ve(() => {
      var a;
      return y("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), es = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ke(),
  ...wu()
}, "VSelectionControl");
function Q1(e) {
  const t = ze(Dv, void 0), {
    densityClasses: n
  } = vn(e), i = Ne(e, "modelValue"), r = C(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = C(() => e.falseValue !== void 0 ? e.falseValue : !1), l = C(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = C({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? kn(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...kn(i.value), v] : kn(i.value).filter((p) => !e.valueComparator(p, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = an(C(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = Dt(C(() => s.value && !e.error && !e.disabled ? e.color : void 0)), f = C(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: r,
    falseValue: o,
    model: s,
    textColorClasses: a,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: f
  };
}
const or = de()({
  name: "VSelectionControl",
  directives: {
    Ripple: Ri
  },
  inheritAttrs: !1,
  props: es(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      group: r,
      densityClasses: o,
      icon: l,
      model: s,
      textColorClasses: a,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: f
    } = Q1(e), h = Lt(), v = be(!1), m = be(!1), p = te(), g = C(() => e.id || `input-${h}`), w = C(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function x(S) {
      w.value && (v.value = !0, al(S.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function k(S) {
      S.stopPropagation();
    }
    function E(S) {
      w.value && (e.readonly && r && Ze(() => r.forceUpdate()), s.value = S.target.checked);
    }
    return ve(() => {
      var D, L;
      const S = i.label ? i.label({
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label, [P, $] = ur(n), R = y("input", he({
        ref: p,
        checked: s.value,
        disabled: !!e.disabled,
        id: g.value,
        onBlur: b,
        onFocus: x,
        onInput: E,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, $), null);
      return y("div", he({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": v.value,
          "v-selection-control--focus-visible": m.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, P, {
        style: e.style
      }), [y("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(D = i.default) == null ? void 0 : D.call(i, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), je(y("div", {
        class: ["v-selection-control__input"]
      }, [((L = i.input) == null ? void 0 : L.call(i, {
        model: s,
        textColorClasses: a,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: R,
        icon: l.value,
        props: {
          onFocus: x,
          onBlur: b,
          id: g.value
        }
      })) ?? y(Le, null, [l.value && y(Ge, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[cn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), S && y(Ql, {
        for: g.value,
        onClick: k
      }, {
        default: () => [S]
      })]);
    }), {
      isFocused: v,
      input: p
    };
  }
}), eb = Z({
  ...es({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio"), Cf = de()({
  name: "VRadio",
  props: eb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(or, he(e, {
      class: ["v-radio", e.class],
      style: e.style,
      type: "radio"
    }), n)), {};
  }
}), tb = Z({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...Oi(),
  ...Xt(wu(), ["multiple"]),
  trueIcon: {
    type: Me,
    default: "$radioOn"
  },
  falseIcon: {
    type: Me,
    default: "$radioOff"
  },
  type: {
    type: String,
    default: "radio"
  }
}, "VRadioGroup"), nb = de()({
  name: "VRadioGroup",
  inheritAttrs: !1,
  props: tb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Lt(), o = C(() => e.id || `radio-group-${r}`), l = Ne(e, "modelValue");
    return ve(() => {
      const [s, a] = ur(n), u = Kt.filterProps(e), c = or.filterProps(e), d = i.label ? i.label({
        label: e.label,
        props: {
          for: o.value
        }
      }) : e.label;
      return y(Kt, he({
        class: ["v-radio-group", e.class],
        style: e.style
      }, s, u, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        id: o.value
      }), {
        ...i,
        default: (f) => {
          let {
            id: h,
            messagesId: v,
            isDisabled: m,
            isReadonly: p
          } = f;
          return y(Le, null, [d && y(Ql, {
            id: h.value
          }, {
            default: () => [d]
          }), y(J1, he(c, {
            id: h.value,
            "aria-describedby": v.value,
            defaultsTarget: "VRadio",
            trueIcon: e.trueIcon,
            falseIcon: e.falseIcon,
            type: e.type,
            disabled: m.value,
            readonly: p.value,
            "aria-labelledby": d ? h.value : void 0,
            multiple: !1
          }, a, {
            modelValue: l.value,
            "onUpdate:modelValue": (g) => l.value = g
          }), i)]);
        }
      });
    }), {};
  }
});
function ib(e) {
  const t = be(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), Ze(() => t.value = e);
  }
  function o(l) {
    const s = l ? getComputedStyle(l) : {
      transitionDuration: 0.2
    }, a = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (i(), t.value <= 0) return;
    const u = performance.now();
    n = window.setInterval(() => {
      const c = performance.now() - u + a;
      t.value = Math.max(e - c, 0), t.value <= 0 && i();
    }, a);
  }
  return bt(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const rb = Z({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...lo({
    location: "bottom"
  }),
  ...Wl(),
  ...Pt(),
  ...zn(),
  ...Je(),
  ...Xt(co({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), la = de()({
  name: "VSnackbar",
  props: rb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), {
      locationStyles: r
    } = so(e), {
      positionClasses: o
    } = ql(e), {
      scopeId: l
    } = uo(), {
      themeClasses: s
    } = it(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = dr(e), {
      roundedClasses: d
    } = It(e), f = ib(Number(e.timeout)), h = te(), v = te(), m = be(!1);
    we(i, g), we(() => e.timeout, g), fn(() => {
      i.value && g();
    });
    let p = -1;
    function g() {
      f.reset(), window.clearTimeout(p);
      const k = Number(e.timeout);
      if (!i.value || k === -1) return;
      const E = Fr(v.value);
      f.start(E), p = window.setTimeout(() => {
        i.value = !1;
      }, k);
    }
    function w() {
      f.reset(), window.clearTimeout(p);
    }
    function x() {
      m.value = !0, w();
    }
    function b() {
      m.value = !1, g();
    }
    return ve(() => {
      const k = ii.filterProps(e), E = !!(n.default || n.text || e.text);
      return y(ii, he({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": i.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, k, {
        modelValue: i.value,
        "onUpdate:modelValue": (S) => i.value = S,
        contentProps: he({
          class: ["v-snackbar__wrapper", s.value, a.value, d.value, c.value],
          style: [r.value, u.value],
          onPointerenter: x,
          onPointerleave: b
        }, k.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, l), {
        default: () => {
          var S, P;
          return [fr(!1, "v-snackbar"), e.timer && !m.value && y("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [y(Qh, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), E && y("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((S = n.text) == null ? void 0 : S.call(n)) ?? e.text, (P = n.default) == null ? void 0 : P.call(n)]), n.actions && y(nt, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [y("div", {
              class: "v-snackbar__actions"
            }, [n.actions()])]
          })];
        },
        activator: n.activator
      });
    }), si({}, h);
  }
}), Hv = Symbol.for("vuetify:v-tabs"), ob = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Xt(av({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), sa = de()({
  name: "VTab",
  props: ob(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = an(e, "sliderColor"), l = te(), s = te(), a = C(() => e.direction === "horizontal"), u = C(() => {
      var d, f;
      return ((f = (d = l.value) == null ? void 0 : d.group) == null ? void 0 : f.isSelected.value) ?? !1;
    });
    function c(d) {
      var h, v;
      let {
        value: f
      } = d;
      if (f) {
        const m = (v = (h = l.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : v.querySelector(".v-tab--selected .v-tab__slider"), p = s.value;
        if (!m || !p) return;
        const g = getComputedStyle(m).color, w = m.getBoundingClientRect(), x = p.getBoundingClientRect(), b = a.value ? "x" : "y", k = a.value ? "X" : "Y", E = a.value ? "right" : "bottom", S = a.value ? "width" : "height", P = w[b], $ = x[b], R = P > $ ? w[E] - x[E] : w[b] - x[b], D = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", I = (Math.abs(R) + (Math.sign(R) < 0 ? w[S] : x[S])) / Math.max(w[S], x[S]) || 0, _ = w[S] / x[S] || 0, O = 1.5;
        pi(p, {
          backgroundColor: [g, "currentcolor"],
          transform: [`translate${k}(${R}px) scale${k}(${_})`, `translate${k}(${R / O}px) scale${k}(${(I - 1) / O + 1})`, "none"],
          transformOrigin: Array(3).fill(D)
        }, {
          duration: 225,
          easing: Hr
        });
      }
    }
    return ve(() => {
      const d = ut.filterProps(e);
      return y(ut, he({
        symbol: Hv,
        ref: l,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, d, i, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...n,
        default: () => {
          var f;
          return y(Le, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && y("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), si({}, l);
  }
});
function lb(e) {
  return e ? e.map((t) => ol(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const sb = Z({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...vu({
    mandatory: "force"
  }),
  ...Zt(),
  ...Ye()
}, "VTabs"), ab = de()({
  name: "VTabs",
  props: sb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), r = C(() => lb(e.items)), {
      densityClasses: o
    } = vn(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = Dt(ae(e, "bgColor"));
    return En({
      VTab: {
        color: ae(e, "color"),
        direction: ae(e, "direction"),
        stacked: ae(e, "stacked"),
        fixed: ae(e, "fixedTabs"),
        sliderColor: ae(e, "sliderColor"),
        hideSlider: ae(e, "hideSlider")
      }
    }), ve(() => {
      const a = ml.filterProps(e);
      return y(ml, he(a, {
        modelValue: i.value,
        "onUpdate:modelValue": (u) => i.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, l.value, e.class],
        style: [{
          "--v-tabs-height": ye(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: Hv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => y(sa, he(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), ub = Z({
  id: String,
  text: String,
  ...Xt(co({
    closeOnBack: !1,
    location: "end",
    locationStrategy: "connected",
    eager: !0,
    minWidth: 0,
    offset: 10,
    openOnClick: !1,
    openOnHover: !0,
    origin: "auto",
    scrim: !1,
    scrollStrategy: "reposition",
    transition: !1
  }), ["absolute", "persistent"])
}, "VTooltip"), Zi = de()({
  name: "VTooltip",
  props: ub(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), {
      scopeId: r
    } = uo(), o = Lt(), l = C(() => e.id || `v-tooltip-${o}`), s = te(), a = C(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = C(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = C(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), d = C(() => he({
      "aria-describedby": l.value
    }, e.activatorProps));
    return ve(() => {
      const f = ii.filterProps(e);
      return y(ii, he({
        ref: s,
        class: ["v-tooltip", e.class],
        style: e.style,
        id: l.value
      }, f, {
        modelValue: i.value,
        "onUpdate:modelValue": (h) => i.value = h,
        transition: c.value,
        absolute: !0,
        location: a.value,
        origin: u.value,
        persistent: !0,
        role: "tooltip",
        activatorProps: d.value,
        _disableGlobalStack: !0
      }, r), {
        activator: n.activator,
        default: function() {
          var p;
          for (var h = arguments.length, v = new Array(h), m = 0; m < h; m++)
            v[m] = arguments[m];
          return ((p = n.default) == null ? void 0 : p.call(n, ...v)) ?? e.text;
        }
      });
    }), si({}, s);
  }
}), cb = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function fb(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function db(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), cb(t);
}
function hb(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function vb() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: (n) => fb(n, t),
    touchend: (n) => db(n, t),
    touchmove: (n) => hb(n, t)
  };
}
function mb(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = vb(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, wh(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function gb(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  wh(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const jv = {
  mounted: mb,
  unmounted: gb
}, zv = Symbol.for("vuetify:v-window"), Gv = Symbol.for("vuetify:v-window-group"), yb = Z({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || e === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...ke(),
  ...Ye(),
  ...Je()
}, "VWindow"), pb = de()({
  name: "VWindow",
  directives: {
    Touch: jv
  },
  props: yb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      isRtl: r
    } = mn(), {
      t: o
    } = oo(), l = no(e, Gv), s = te(), a = C(() => r.value ? !e.reverse : e.reverse), u = be(!1), c = C(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), d = be(0), f = te(void 0), h = C(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    we(h, (b, k) => {
      const E = l.items.value.length, S = E - 1;
      E <= 2 ? u.value = b < k : b === S && k === 0 ? u.value = !0 : b === 0 && k === S ? u.value = !1 : u.value = b < k;
    }), ct(zv, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const v = C(() => e.continuous || h.value !== 0), m = C(() => e.continuous || h.value !== l.items.value.length - 1);
    function p() {
      v.value && l.prev();
    }
    function g() {
      m.value && l.next();
    }
    const w = C(() => {
      const b = [], k = {
        icon: r.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: l.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      b.push(v.value ? n.prev ? n.prev({
        props: k
      }) : y(ut, k, null) : y("div", null, null));
      const E = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: E
      }) : y(ut, E, null) : y("div", null, null)), b;
    }), x = C(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : g();
        },
        right: () => {
          a.value ? g() : p();
        },
        start: (k) => {
          let {
            originalEvent: E
          } = k;
          E.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ve(() => je(y(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var b, k;
        return [y("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(b = n.default) == null ? void 0 : b.call(n, {
          group: l
        }), e.showArrows !== !1 && y("div", {
          class: "v-window__controls"
        }, [w.value])]), (k = n.additional) == null ? void 0 : k.call(n, {
          group: l
        })];
      }
    }), [[cn("touch"), x.value]])), {
      group: l
    };
  }
});
function Uv() {
  const e = be(!1);
  return fn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: C(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Qr(e)
  };
}
const bb = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ke(),
  ...jl(),
  ...Jl()
}, "VWindowItem"), Ef = de()({
  name: "VWindowItem",
  directives: {
    Touch: jv
  },
  props: bb(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = ze(zv), r = zl(e, Gv), {
      isBooted: o
    } = Uv();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = be(!1), s = C(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !l.value || !i || (l.value = !1, i.transitionCount.value > 0 && (i.transitionCount.value -= 1, i.transitionCount.value === 0 && (i.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      l.value || !i || (l.value = !0, i.transitionCount.value === 0 && (i.transitionHeight.value = ye((v = i.rootRef.value) == null ? void 0 : v.clientHeight)), i.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function d(v) {
      l.value && Ze(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = ye(v.clientHeight));
      });
    }
    const f = C(() => {
      const v = i.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof v != "string" ? i.transition.value : v,
        onBeforeEnter: u,
        onAfterEnter: a,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: a,
        onLeaveCancelled: c,
        onEnter: d
      } : !1;
    }), {
      hasContent: h
    } = du(e, r.isSelected);
    return ve(() => y(Mn, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [je(y("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[pt, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), wb = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Select File", -1), xb = /* @__PURE__ */ Ae("p", null, " Files in a specific JSON format or trivial graph format are supported. ", -1), _b = /* @__PURE__ */ Ae("p", null, [
  /* @__PURE__ */ tt("Importing will "),
  /* @__PURE__ */ Ae("strong", null, "replace"),
  /* @__PURE__ */ tt(" your current graph.")
], -1), kb = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Select Format", -1), Sb = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Preview", -1), Cb = /* @__PURE__ */ Ae("strong", null, "copy", -1), Eb = /* @__PURE__ */ Mi({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null },
    graphAsJson: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = te(!1), o = te(0), l = te(), s = te("JSON"), a = te(!1), u = te(!1), c = te(""), d = te(""), f = C(
      () => {
        var w, x;
        return o.value === 0 && (l == null ? void 0 : l.value) && (((w = l == null ? void 0 : l.value[0]) == null ? void 0 : w.name.toLowerCase().endsWith(".tgf")) || ((x = l == null ? void 0 : l.value[0]) == null ? void 0 : x.name.toLowerCase().endsWith(".json"))) || o.value === 1 && n.graphAsTgf !== "";
      }
    ), h = [
      (w) => !!w[0] || "File is required",
      (w) => {
        var x;
        return !w || /\.(tgf|TGF|json|JSON)$/.test((x = w[0]) == null ? void 0 : x.name) || "Invalid file format. Please select a .tgf or .json file.";
      }
    ];
    function v() {
      var w;
      if (l != null && l.value)
        for (let x of l.value) {
          const b = (w = x.name.split(".").pop()) == null ? void 0 : w.toLowerCase();
          x.text().then((k) => {
            b === "tgf" ? i("file-imported", k) : b === "json" ? i("file-imported", JSON.parse(k)) : g("No valid file extension.", ""), p();
          }).catch((k) => {
            g(`Error reading the imported file ${x.name}`, k);
          });
        }
    }
    function m() {
      o.value === 0 ? v() : o.value === 1 && navigator.clipboard.writeText(
        s.value === "TGF" ? n.graphAsTgf.toString() : n.graphAsJson.toString()
      ).then(
        () => a.value = !0,
        (w) => {
          g("Copy unsuccessful", w);
        }
      );
    }
    function p() {
      u.value = !1, c.value = "", d.value = "", r.value = !1, o.value = 0, l.value = void 0, a.value = !1;
    }
    function g(w, x) {
      console.error(w + `
` + x), u.value = !0, c.value = w, d.value = x.toString(), window.setInterval(() => u.value = !1, 5e3);
    }
    return (w, x) => (ht(), ln(hu, {
      modelValue: r.value,
      "onUpdate:modelValue": x[8] || (x[8] = (b) => r.value = b),
      "max-width": "800px"
    }, {
      activator: ce(({ props: b }) => [
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ce(({ props: k }) => [
            y(ut, he({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...b, ...k }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(() => [
        y(uu, null, {
          default: ce(() => [
            y(Gr, null, {
              default: ce(() => [
                y(ab, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[0] || (x[0] = (b) => o.value = b)
                }, {
                  default: ce(() => [
                    y(sa, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ce(() => [
                        tt("Import")
                      ]),
                      _: 1
                    }),
                    y(sa, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ce(() => [
                        tt("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            y(Tr, null, {
              default: ce(() => [
                y(pb, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[3] || (x[3] = (b) => o.value = b),
                  class: "ml-4"
                }, {
                  default: ce(() => [
                    y(Ef, null, {
                      default: ce(() => [
                        wb,
                        y(H1, {
                          modelValue: l.value,
                          "onUpdate:modelValue": x[1] || (x[1] = (b) => l.value = b),
                          accept: ".tgf, .json",
                          density: "compact",
                          label: "Graph Format File",
                          rules: h,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        y(Tr, null, {
                          default: ce(() => [
                            xb,
                            _b
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(Ef, null, {
                      default: ce(() => [
                        kb,
                        y(nb, {
                          inline: "",
                          modelValue: s.value,
                          "onUpdate:modelValue": x[2] || (x[2] = (b) => s.value = b)
                        }, {
                          default: ce(() => [
                            y(Cf, {
                              label: "JSON",
                              value: "JSON"
                            }),
                            y(Cf, {
                              label: "TGF",
                              value: "TGF"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        Sb,
                        je(Ae("pre", null, dt(n.graphAsJson), 513), [
                          [pt, s.value === "JSON"]
                        ]),
                        je(Ae("pre", null, dt(n.graphAsTgf), 513), [
                          [pt, s.value === "TGF"]
                        ]),
                        y(Tr, null, {
                          default: ce(() => [
                            tt("This export action will "),
                            Cb,
                            tt(" the graph as JSON or in trivial graph format to your clipboard.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            y(Xl, null, {
              default: ce(() => [
                y(gl),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  disabled: !f.value,
                  onClick: x[4] || (x[4] = (b) => m())
                }, {
                  default: ce(() => [
                    tt("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  onClick: x[5] || (x[5] = (b) => p())
                }, {
                  default: ce(() => [
                    tt("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        y(la, {
          modelValue: u.value,
          "onUpdate:modelValue": x[6] || (x[6] = (b) => u.value = b),
          color: "error",
          variant: "tonal"
        }, {
          default: ce(() => [
            y(kt, { align: "center" }, {
              default: ce(() => [
                y(Ge, {
                  icon: "$error",
                  class: "ml-2"
                }),
                y(Gi, null, {
                  default: ce(() => [
                    Ae("h4", null, dt(c.value), 1),
                    Ae("p", null, dt(d.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        y(la, {
          modelValue: a.value,
          "onUpdate:modelValue": x[7] || (x[7] = (b) => a.value = b),
          timeout: 1500
        }, {
          default: ce(() => [
            y(Ge, {
              color: "secondary",
              icon: "$success"
            }),
            tt(" Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Vb = ".heading{margin-top:10px;margin-bottom:10px}", xu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, Lb = /* @__PURE__ */ xu(Eb, [["styles", [Vb]]]), Pb = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...ke(),
  ...Zt(),
  ...Ye(),
  ...Je()
}, "VTable"), Ib = de()({
  name: "VTable",
  props: Pb(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      densityClasses: o
    } = vn(e);
    return ve(() => y(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover
      }, r.value, o.value, e.class],
      style: e.style
    }, {
      default: () => {
        var l, s, a;
        return [(l = n.top) == null ? void 0 : l.call(n), n.default ? y("div", {
          class: "v-table__wrapper",
          style: {
            height: ye(e.height)
          }
        }, [y("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), Tb = { class: "text-left" }, Mb = { class: "text-left" }, Ab = { class: "text-left" }, Wv = /* @__PURE__ */ Mi({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean }
  },
  setup(e) {
    const t = e, n = [
      {
        action: "Create node",
        desktop: "Double-click",
        mobile: "Double-tap"
      },
      {
        action: "Create link",
        desktop: "Right-click on node + hold + drag towards target",
        mobile: "Long-tap + drag"
      },
      {
        action: "Delete node/link",
        desktop: "Right-click + hold on node/link",
        mobile: "Long-tap"
      },
      {
        action: "Move node",
        desktop: "Left-click + hold on node + drag",
        mobile: "-"
      },
      {
        action: "Create/Update label",
        desktop: t.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        mobile: t.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
      }
    ], i = [
      {
        action: "Pan",
        desktop: "Left-click on canvas + drag",
        mobile: "Multi-touch"
      },
      {
        action: "Zoom",
        desktop: "Mouse wheel",
        mobile: "Multi-touch"
      }
    ], r = ["Action", "Desktop", "Mobile"];
    return (o, l) => (ht(), ln(Ib, {
      density: "comfortable",
      "fixed-header": ""
    }, {
      default: ce(() => [
        je(Ae("thead", null, [
          Ae("tr", null, [
            Ae("th", Tb, dt(r[0]), 1),
            Ae("th", Mb, dt(r[1]), 1),
            Ae("th", Ab, dt(r[2]), 1)
          ])
        ], 512), [
          [pt, t.showHeader]
        ]),
        Ae("tbody", null, [
          (ht(), el(Le, null, ec(n, (s) => je(Ae("tr", {
            key: s.action
          }, [
            Ae("td", null, dt(s.action), 1),
            Ae("td", null, dt(s.desktop), 1),
            Ae("td", null, dt(s.mobile), 1)
          ]), [
            [pt, t.showControlsGraph]
          ])), 64)),
          (ht(), el(Le, null, ec(i, (s) => je(Ae("tr", {
            key: s.action
          }, [
            Ae("td", null, dt(s.action), 1),
            Ae("td", null, dt(s.desktop), 1),
            Ae("td", null, dt(s.mobile), 1)
          ]), [
            [pt, t.showControlsEnvironment]
          ])), 64))
        ])
      ]),
      _: 1
    }));
  }
}), $b = /* @__PURE__ */ Mi({
  __name: "GraphHelp",
  setup(e) {
    const t = te(!1);
    return (n, i) => (ht(), ln(hu, {
      modelValue: t.value,
      "onUpdate:modelValue": i[1] || (i[1] = (r) => t.value = r),
      "max-width": "800px"
    }, {
      activator: ce(({ props: r }) => [
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ce(({ props: o }) => [
            y(ut, he({
              "aria-label": "Help",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              icon: "$help",
              elevation: "6"
            }, { ...r, ...o }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(() => [
        y(uu, null, {
          default: ce(() => [
            y(Gr, { class: "card-header" }, {
              default: ce(() => [
                tt("Controls")
              ]),
              _: 1
            }),
            y(Wv, {
              "show-controls-environment": "",
              "show-header": "",
              "show-controls-graph": "",
              "show-latex-info": ""
            }),
            y(Xl, null, {
              default: ce(() => [
                y(gl),
                y(ut, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: i[0] || (i[0] = (r) => t.value = !1)
                }, {
                  default: ce(() => [
                    tt(" Close ")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Nb = ".v-data-table-header-mobile tr:first-child th[data-v-0a71b4f5]{height:0!important}", Rb = /* @__PURE__ */ xu($b, [["styles", [Nb]], ["__scopeId", "data-v-0a71b4f5"]]), qv = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Me,
    default: "$checkboxIndeterminate"
  },
  ...es({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), aa = de()({
  name: "VCheckboxBtn",
  props: qv(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "indeterminate"), r = Ne(e, "modelValue");
    function o(a) {
      i.value && (i.value = !1);
    }
    const l = C(() => i.value ? e.indeterminateIcon : e.falseIcon), s = C(() => i.value ? e.indeterminateIcon : e.trueIcon);
    return ve(() => {
      const a = Xt(or.filterProps(e), ["modelValue"]);
      return y(or, he(a, {
        modelValue: r.value,
        "onUpdate:modelValue": [(u) => r.value = u, o],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: l.value,
        trueIcon: s.value,
        "aria-checked": i.value ? "mixed" : void 0
      }), n);
    }), {};
  }
}), Ob = Z({
  ...Oi(),
  ...Xt(qv(), ["inline"])
}, "VCheckbox"), Bb = de()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Ob(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Ne(e, "modelValue"), {
      isFocused: o,
      focus: l,
      blur: s
    } = hr(e), a = Lt(), u = C(() => e.id || `checkbox-${a}`);
    return ve(() => {
      const [c, d] = ur(n), f = Kt.filterProps(e), h = aa.filterProps(e);
      return y(Kt, he({
        class: ["v-checkbox", e.class]
      }, c, f, {
        modelValue: r.value,
        "onUpdate:modelValue": (v) => r.value = v,
        id: u.value,
        focused: o.value,
        style: e.style
      }), {
        ...i,
        default: (v) => {
          let {
            id: m,
            messagesId: p,
            isDisabled: g,
            isReadonly: w,
            isValid: x
          } = v;
          return y(aa, he(h, {
            id: m.value,
            "aria-describedby": p.value,
            disabled: g.value,
            readonly: w.value
          }, d, {
            error: x.value === !1,
            modelValue: r.value,
            "onUpdate:modelValue": (b) => r.value = b,
            onFocus: l,
            onBlur: s
          }), i);
        }
      });
    }), {};
  }
}), Fb = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  height: {
    type: [Number, String],
    default: 150
  },
  width: {
    type: [Number, String],
    default: 300
  },
  ...ke()
}, "VColorPickerCanvas"), Db = hn({
  name: "VColorPickerCanvas",
  props: Fb(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = be(!1), r = te(), o = be(parseFloat(e.width)), l = be(parseFloat(e.height)), s = te({
      x: 0,
      y: 0
    }), a = C({
      get: () => s.value,
      set(p) {
        var x, b;
        if (!r.value) return;
        const {
          x: g,
          y: w
        } = p;
        s.value = p, n("update:color", {
          h: ((x = e.color) == null ? void 0 : x.h) ?? 0,
          s: Bt(g, 0, o.value) / o.value,
          v: 1 - Bt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = C(() => {
      const {
        x: p,
        y: g
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: ye(e.dotSize),
        height: ye(e.dotSize),
        transform: `translate(${ye(p - w)}, ${ye(g - w)})`
      };
    }), {
      resizeRef: c
    } = rr((p) => {
      var x;
      if (!((x = c.value) != null && x.offsetParent)) return;
      const {
        width: g,
        height: w
      } = p[0].contentRect;
      o.value = g, l.value = w;
    });
    function d(p, g, w) {
      const {
        left: x,
        top: b,
        width: k,
        height: E
      } = w;
      a.value = {
        x: Bt(p - x, 0, k),
        y: Bt(g - b, 0, E)
      };
    }
    function f(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const g = Ty(p);
      d(g.clientX, g.clientY, r.value.getBoundingClientRect());
    }
    function v() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", v);
    }
    function m() {
      var b;
      if (!r.value) return;
      const p = r.value, g = p.getContext("2d");
      if (!g) return;
      const w = g.createLinearGradient(0, 0, p.width, 0);
      w.addColorStop(0, "hsla(0, 0%, 100%, 1)"), w.addColorStop(1, `hsla(${((b = e.color) == null ? void 0 : b.h) ?? 0}, 100%, 50%, 1)`), g.fillStyle = w, g.fillRect(0, 0, p.width, p.height);
      const x = g.createLinearGradient(0, 0, 0, p.height);
      x.addColorStop(0, "hsla(0, 0%, 0%, 0)"), x.addColorStop(1, "hsla(0, 0%, 0%, 1)"), g.fillStyle = x, g.fillRect(0, 0, p.width, p.height);
    }
    return we(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, m, {
      immediate: !0
    }), we(() => [o.value, l.value], (p, g) => {
      m(), s.value = {
        x: a.value.x * p[0] / g[0],
        y: a.value.y * p[1] / g[1]
      };
    }, {
      flush: "post"
    }), we(() => e.color, () => {
      if (i.value) {
        i.value = !1;
        return;
      }
      s.value = e.color ? {
        x: e.color.s * o.value,
        y: (1 - e.color.v) * l.value
      } : {
        x: 0,
        y: 0
      };
    }, {
      deep: !0,
      immediate: !0
    }), fn(() => m()), ve(() => y("div", {
      ref: c,
      class: ["v-color-picker-canvas", e.class],
      style: e.style,
      onMousedown: f,
      onTouchstartPassive: f
    }, [y("canvas", {
      ref: r,
      width: o.value,
      height: l.value
    }, null), e.color && y("div", {
      class: ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": e.disabled
      }],
      style: u.value
    }, null)])), {};
  }
});
function Hb(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function jb(e, t) {
  if (t == null || typeof t == "string") {
    const n = Fh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return yi(t, ["r", "g", "b"]) ? n = On(e) : yi(t, ["h", "s", "l"]) ? n = Ah(e) : yi(t, ["h", "s", "v"]) && (n = e), Hb(n, !yi(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Ui = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, ua = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "R",
    max: 255,
    step: 1,
    getValue: (e) => Math.round(e.r),
    getColor: (e, t) => ({
      ...e,
      r: Number(t)
    })
  }, {
    label: "G",
    max: 255,
    step: 1,
    getValue: (e) => Math.round(e.g),
    getColor: (e, t) => ({
      ...e,
      g: Number(t)
    })
  }, {
    label: "B",
    max: 255,
    step: 1,
    getValue: (e) => Math.round(e.b),
    getColor: (e, t) => ({
      ...e,
      b: Number(t)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (e) => {
      let {
        a: t
      } = e;
      return t != null ? Math.round(t * 100) / 100 : 1;
    },
    getColor: (e, t) => ({
      ...e,
      a: Number(t)
    })
  }],
  to: On,
  from: Dl
};
var cd;
const zb = {
  ...ua,
  inputs: (cd = ua.inputs) == null ? void 0 : cd.slice(0, 3)
}, ca = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "H",
    max: 360,
    step: 1,
    getValue: (e) => Math.round(e.h),
    getColor: (e, t) => ({
      ...e,
      h: Number(t)
    })
  }, {
    label: "S",
    max: 1,
    step: 0.01,
    getValue: (e) => Math.round(e.s * 100) / 100,
    getColor: (e, t) => ({
      ...e,
      s: Number(t)
    })
  }, {
    label: "L",
    max: 1,
    step: 0.01,
    getValue: (e) => Math.round(e.l * 100) / 100,
    getColor: (e, t) => ({
      ...e,
      l: Number(t)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (e) => {
      let {
        a: t
      } = e;
      return t != null ? Math.round(t * 100) / 100 : 1;
    },
    getColor: (e, t) => ({
      ...e,
      a: Number(t)
    })
  }],
  to: Ah,
  from: nu
}, Gb = {
  ...ca,
  inputs: ca.inputs.slice(0, 3)
}, Yv = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: Fh,
  from: Bh
}, Ub = {
  ...Yv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, Si = {
  rgb: zb,
  rgba: ua,
  hsl: Gb,
  hsla: ca,
  hex: Ub,
  hexa: Yv
}, Wb = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return y("div", {
    class: "v-color-picker-edit__input"
  }, [y("input", n, null), y("span", null, [t])]);
}, qb = Z({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(Si).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(Si),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Si).includes(t))
  },
  ...ke()
}, "VColorPickerEdit"), Yb = hn({
  name: "VColorPickerEdit",
  props: qb(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = C(() => e.modes.map((o) => ({
      ...Si[o],
      name: o
    }))), r = C(() => {
      var s;
      const o = i.value.find((a) => a.name === e.mode);
      if (!o) return [];
      const l = e.color ? o.to(e.color) : null;
      return (s = o.inputs) == null ? void 0 : s.map((a) => {
        let {
          getValue: u,
          getColor: c,
          ...d
        } = a;
        return {
          ...o.inputProps,
          ...d,
          disabled: e.disabled,
          value: l && u(l),
          onChange: (f) => {
            const h = f.target;
            h && n("update:color", o.from(c(l ?? o.to(Ui), h.value)));
          }
        };
      });
    });
    return ve(() => {
      var o;
      return y("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => y(Wb, l, null)), i.value.length > 1 && y(ut, {
        icon: "$unfold",
        size: "x-small",
        variant: "plain",
        onClick: () => {
          const l = i.value.findIndex((s) => s.name === e.mode);
          n("update:mode", i.value[(l + 1) % i.value.length].name);
        }
      }, null)]);
    }), {};
  }
}), _u = Symbol.for("vuetify:v-slider");
function Kb(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function Xb(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const Zb = Z({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  readonly: {
    type: Boolean,
    default: null
  },
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: void 0,
    validator: (e) => typeof e == "boolean" || e === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: !1,
    validator: (e) => typeof e == "boolean" || e === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["vertical", "horizontal"].includes(e)
  },
  reverse: Boolean,
  ...Pt(),
  ...Hn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), Jb = (e) => {
  const t = C(() => parseFloat(e.min)), n = C(() => parseFloat(e.max)), i = C(() => +e.step > 0 ? parseFloat(e.step) : 0), r = C(() => Math.max(Ac(i.value), Ac(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = Bt(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, Qb = (e) => {
  let {
    props: t,
    steps: n,
    onSliderStart: i,
    onSliderMove: r,
    onSliderEnd: o,
    getActiveThumb: l
  } = e;
  const {
    isRtl: s
  } = mn(), a = ae(t, "reverse"), u = C(() => t.direction === "vertical"), c = C(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: m
  } = n, p = C(() => parseInt(t.thumbSize, 10)), g = C(() => parseInt(t.tickSize, 10)), w = C(() => parseInt(t.trackSize, 10)), x = C(() => (f.value - d.value) / h.value), b = ae(t, "disabled"), k = C(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = C(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), S = C(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), P = be(!1), $ = be(0), R = te(), D = te();
  function L(J) {
    var U;
    const le = t.direction === "vertical", Ee = le ? "top" : "left", De = le ? "height" : "width", Ue = le ? "clientY" : "clientX", {
      [Ee]: xt,
      [De]: yn
    } = (U = R.value) == null ? void 0 : U.$el.getBoundingClientRect(), V = Xb(J, Ue);
    let A = Math.min(Math.max((V - xt - $.value) / yn, 0), 1) || 0;
    return (le ? c.value : c.value !== s.value) && (A = 1 - A), m(d.value + A * (f.value - d.value));
  }
  const I = (J) => {
    o({
      value: L(J)
    }), P.value = !1, $.value = 0;
  }, _ = (J) => {
    D.value = l(J), D.value && (D.value.focus(), P.value = !0, D.value.contains(J.target) ? $.value = Kb(J, D.value, t.direction) : ($.value = 0, r({
      value: L(J)
    })), i({
      value: L(J)
    }));
  }, O = {
    passive: !0,
    capture: !0
  };
  function M(J) {
    r({
      value: L(J)
    });
  }
  function j(J) {
    J.stopPropagation(), J.preventDefault(), I(J), window.removeEventListener("mousemove", M, O), window.removeEventListener("mouseup", j);
  }
  function N(J) {
    var le;
    I(J), window.removeEventListener("touchmove", M, O), (le = J.target) == null || le.removeEventListener("touchend", N);
  }
  function F(J) {
    var le;
    _(J), window.addEventListener("touchmove", M, O), (le = J.target) == null || le.addEventListener("touchend", N, {
      passive: !1
    });
  }
  function B(J) {
    J.preventDefault(), _(J), window.addEventListener("mousemove", M, O), window.addEventListener("mouseup", j, {
      passive: !1
    });
  }
  const H = (J) => {
    const le = (J - d.value) / (f.value - d.value) * 100;
    return Bt(isNaN(le) ? 0 : le, 0, 100);
  }, Y = ae(t, "showTicks"), Q = C(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: H(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: H(parseFloat(J)),
    label: t.ticks[J]
  })) : x.value !== 1 / 0 ? Za(x.value + 1).map((J) => {
    const le = d.value + J * h.value;
    return {
      value: le,
      position: H(le)
    };
  }) : [] : []), se = C(() => Q.value.some((J) => {
    let {
      label: le
    } = J;
    return !!le;
  })), fe = {
    activeThumbRef: D,
    color: ae(t, "color"),
    decimals: v,
    disabled: b,
    direction: ae(t, "direction"),
    elevation: ae(t, "elevation"),
    hasLabels: se,
    isReversed: a,
    indexFromEnd: c,
    min: d,
    max: f,
    mousePressed: P,
    numTicks: x,
    onSliderMousedown: B,
    onSliderTouchstart: F,
    parsedTicks: Q,
    parseMouseMove: L,
    position: H,
    readonly: ae(t, "readonly"),
    rounded: ae(t, "rounded"),
    roundValue: m,
    showTicks: Y,
    startOffset: $,
    step: h,
    thumbSize: p,
    thumbColor: k,
    thumbLabel: ae(t, "thumbLabel"),
    ticks: ae(t, "ticks"),
    tickSize: g,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: S,
    trackSize: w,
    vertical: u
  };
  return ct(_u, fe), fe;
}, ew = Z({
  focused: Boolean,
  max: {
    type: Number,
    required: !0
  },
  min: {
    type: Number,
    required: !0
  },
  modelValue: {
    type: Number,
    required: !0
  },
  position: {
    type: Number,
    required: !0
  },
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  ...ke()
}, "VSliderThumb"), tw = de()({
  name: "VSliderThumb",
  directives: {
    Ripple: Ri
  },
  props: ew(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = ze(_u), {
      isRtl: o,
      rtlClasses: l
    } = mn();
    if (!r) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor: s,
      step: a,
      disabled: u,
      thumbSize: c,
      thumbLabel: d,
      direction: f,
      isReversed: h,
      vertical: v,
      readonly: m,
      elevation: p,
      mousePressed: g,
      decimals: w,
      indexFromEnd: x
    } = r, b = C(() => u.value ? void 0 : p.value), {
      elevationClasses: k
    } = jn(b), {
      textColorClasses: E,
      textColorStyles: S
    } = an(s), {
      pageup: P,
      pagedown: $,
      end: R,
      home: D,
      left: L,
      right: I,
      down: _,
      up: O
    } = Vy, M = [P, $, R, D, L, I, _, O], j = C(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function N(B, H) {
      if (!M.includes(B.key)) return;
      B.preventDefault();
      const Y = a.value || 0.1, Q = (e.max - e.min) / Y;
      if ([L, I, _, O].includes(B.key)) {
        const fe = (v.value ? [o.value ? L : I, h.value ? _ : O] : x.value !== o.value ? [L, O] : [I, O]).includes(B.key) ? 1 : -1, J = B.shiftKey ? 2 : B.ctrlKey ? 1 : 0;
        H = H + fe * Y * j.value[J];
      } else if (B.key === D)
        H = e.min;
      else if (B.key === R)
        H = e.max;
      else {
        const se = B.key === $ ? 1 : -1;
        H = H - se * Y * (Q > 100 ? Q / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, H));
    }
    function F(B) {
      const H = N(B, e.modelValue);
      H != null && i("update:modelValue", H);
    }
    return ve(() => {
      const B = ye(x.value ? 100 - e.position : e.position, "%");
      return y("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && g.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": B,
          "--v-slider-thumb-size": ye(c.value)
        }, e.style],
        role: "slider",
        tabindex: u.value ? -1 : 0,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.modelValue,
        "aria-readonly": !!m.value,
        "aria-orientation": f.value,
        onKeydown: m.value ? void 0 : F
      }, [y("div", {
        class: ["v-slider-thumb__surface", E.value, k.value],
        style: {
          ...S.value
        }
      }, null), je(y("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: S.value
      }, null), [[cn("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), y(mv, {
        origin: "bottom center"
      }, {
        default: () => {
          var H;
          return [je(y("div", {
            class: "v-slider-thumb__label-container"
          }, [y("div", {
            class: ["v-slider-thumb__label"]
          }, [y("div", null, [((H = n["thumb-label"]) == null ? void 0 : H.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[pt, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), nw = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...ke()
}, "VSliderTrack"), iw = de()({
  name: "VSliderTrack",
  props: nw(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = ze(_u);
    if (!i) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color: r,
      parsedTicks: o,
      rounded: l,
      showTicks: s,
      tickSize: a,
      trackColor: u,
      trackFillColor: c,
      trackSize: d,
      vertical: f,
      min: h,
      max: v,
      indexFromEnd: m
    } = i, {
      roundedClasses: p
    } = It(l), {
      backgroundColorClasses: g,
      backgroundColorStyles: w
    } = Dt(c), {
      backgroundColorClasses: x,
      backgroundColorStyles: b
    } = Dt(u), k = C(() => `inset-${f.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), E = C(() => f.value ? "height" : "width"), S = C(() => ({
      [k.value]: "0%",
      [E.value]: "100%"
    })), P = C(() => e.stop - e.start), $ = C(() => ({
      [k.value]: ye(e.start, "%"),
      [E.value]: ye(P.value, "%")
    })), R = C(() => s.value ? (f.value ? o.value.slice().reverse() : o.value).map((L, I) => {
      var O;
      const _ = L.value !== h.value && L.value !== v.value ? ye(L.position, "%") : void 0;
      return y("div", {
        key: L.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": L.position >= e.start && L.position <= e.stop,
          "v-slider-track__tick--first": L.value === h.value,
          "v-slider-track__tick--last": L.value === v.value
        }],
        style: {
          [k.value]: _
        }
      }, [(L.label || n["tick-label"]) && y("div", {
        class: "v-slider-track__tick-label"
      }, [((O = n["tick-label"]) == null ? void 0 : O.call(n, {
        tick: L,
        index: I
      })) ?? L.label])]);
    }) : []);
    return ve(() => y("div", {
      class: ["v-slider-track", p.value, e.class],
      style: [{
        "--v-slider-track-size": ye(d.value),
        "--v-slider-tick-size": ye(a.value)
      }, e.style]
    }, [y("div", {
      class: ["v-slider-track__background", x.value, {
        "v-slider-track__background--opacity": !!r.value || !c.value
      }],
      style: {
        ...S.value,
        ...b.value
      }
    }, null), y("div", {
      class: ["v-slider-track__fill", g.value],
      style: {
        ...$.value,
        ...w.value
      }
    }, null), s.value && y("div", {
      class: ["v-slider-track__ticks", {
        "v-slider-track__ticks--always-show": s.value === "always"
      }]
    }, [R.value])])), {};
  }
}), rw = Z({
  ...mu(),
  ...Zb(),
  ...Oi(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), Vf = de()({
  name: "VSlider",
  props: rw(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    start: (e) => !0,
    end: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = te(), {
      rtlClasses: o
    } = mn(), l = Jb(e), s = Ne(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
      min: a,
      max: u,
      mousePressed: c,
      roundValue: d,
      onSliderMousedown: f,
      onSliderTouchstart: h,
      trackContainerRef: v,
      position: m,
      hasLabels: p,
      readonly: g
    } = Qb({
      props: e,
      steps: l,
      onSliderStart: () => {
        i("start", s.value);
      },
      onSliderEnd: (E) => {
        let {
          value: S
        } = E;
        const P = d(S);
        s.value = P, i("end", P);
      },
      onSliderMove: (E) => {
        let {
          value: S
        } = E;
        return s.value = d(S);
      },
      getActiveThumb: () => {
        var E;
        return (E = r.value) == null ? void 0 : E.$el;
      }
    }), {
      isFocused: w,
      focus: x,
      blur: b
    } = hr(e), k = C(() => m(s.value));
    return ve(() => {
      const E = Kt.filterProps(e), S = !!(e.label || n.label || n.prepend);
      return y(Kt, he({
        class: ["v-slider", {
          "v-slider--has-labels": !!n["tick-label"] || p.value,
          "v-slider--focused": w.value,
          "v-slider--pressed": c.value,
          "v-slider--disabled": e.disabled
        }, o.value, e.class],
        style: e.style
      }, E, {
        focused: w.value
      }), {
        ...n,
        prepend: S ? (P) => {
          var $, R;
          return y(Le, null, [(($ = n.label) == null ? void 0 : $.call(n, P)) ?? (e.label ? y(Ql, {
            id: P.id.value,
            class: "v-slider__label",
            text: e.label
          }, null) : void 0), (R = n.prepend) == null ? void 0 : R.call(n, P)]);
        } : void 0,
        default: (P) => {
          let {
            id: $,
            messagesId: R
          } = P;
          return y("div", {
            class: "v-slider__container",
            onMousedown: g.value ? void 0 : f,
            onTouchstartPassive: g.value ? void 0 : h
          }, [y("input", {
            id: $.value,
            name: e.name || $.value,
            disabled: !!e.disabled,
            readonly: !!e.readonly,
            tabindex: "-1",
            value: s.value
          }, null), y(iw, {
            ref: v,
            start: 0,
            stop: k.value
          }, {
            "tick-label": n["tick-label"]
          }), y(tw, {
            ref: r,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (D) => s.value = D,
            position: k.value,
            elevation: e.elevation,
            onFocus: x,
            onBlur: b,
            ripple: e.ripple
          }, {
            "thumb-label": n["thumb-label"]
          })]);
        }
      });
    }), {};
  }
}), ow = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...ke()
}, "VColorPickerPreview"), lw = hn({
  name: "VColorPickerPreview",
  props: ow(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    Rl(() => i.abort());
    async function r() {
      if (!Ic) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Bh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Ui,
          ...s
        });
      } catch {
      }
    }
    return ve(() => {
      var o, l;
      return y("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [Ic && y("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [y(ut, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), y("div", {
        class: "v-color-picker-preview__dot"
      }, [y("div", {
        style: {
          background: Nh(e.color ?? Ui)
        }
      }, null)]), y("div", {
        class: "v-color-picker-preview__sliders"
      }, [y(Vf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ui,
          h: s
        }),
        step: 0,
        min: 0,
        max: 360,
        disabled: e.disabled,
        thumbSize: 14,
        trackSize: 8,
        trackFillColor: "white",
        hideDetails: !0
      }, null), !e.hideAlpha && y(Vf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ui,
          a: s
        }),
        step: 1 / 256,
        min: 0,
        max: 1,
        disabled: e.disabled,
        thumbSize: 14,
        trackSize: 8,
        trackFillColor: "white",
        hideDetails: !0
      }, null)])]);
    }), {};
  }
}), sw = {
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
}, aw = {
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
}, uw = {
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
}, cw = {
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
}, fw = {
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
}, dw = {
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
}, hw = {
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
}, vw = {
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
}, mw = {
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
}, gw = {
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
}, yw = {
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
}, pw = {
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
}, bw = {
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
}, ww = {
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
}, xw = {
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
}, _w = {
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
}, kw = {
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
}, Sw = {
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
}, Cw = {
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
}, Ew = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, Vw = {
  red: sw,
  pink: aw,
  purple: uw,
  deepPurple: cw,
  indigo: fw,
  blue: dw,
  lightBlue: hw,
  cyan: vw,
  teal: mw,
  green: gw,
  lightGreen: yw,
  lime: pw,
  yellow: bw,
  amber: ww,
  orange: xw,
  deepOrange: _w,
  brown: kw,
  blueGrey: Sw,
  grey: Cw,
  shades: Ew
}, Lw = Z({
  swatches: {
    type: Array,
    default: () => Pw(Vw)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...ke()
}, "VColorPickerSwatches");
function Pw(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const Iw = hn({
  name: "VColorPickerSwatches",
  props: Lw(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    return ve(() => y("div", {
      class: ["v-color-picker-swatches", e.class],
      style: [{
        maxHeight: ye(e.maxHeight)
      }, e.style]
    }, [y("div", null, [e.swatches.map((i) => y("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Wt(r), l = Dl(o), s = $h(o);
      return y("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [y("div", {
        style: {
          background: s
        }
      }, [e.color && Ai(e.color, l) ? y(Ge, {
        size: "x-small",
        icon: "$success",
        color: np(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Kv = Z({
  color: String,
  ...$i(),
  ...ke(),
  ...oi(),
  ...Hn(),
  ...lo(),
  ...Wl(),
  ...Pt(),
  ...Ye(),
  ...Je()
}, "VSheet"), Lf = de()({
  name: "VSheet",
  props: Kv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Dt(ae(e, "color")), {
      borderClasses: l
    } = Ni(e), {
      dimensionStyles: s
    } = li(e), {
      elevationClasses: a
    } = jn(e), {
      locationStyles: u
    } = so(e), {
      positionClasses: c
    } = ql(e), {
      roundedClasses: d
    } = It(e);
    return ve(() => y(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, d.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), Tw = Z({
  canvasHeight: {
    type: [String, Number],
    default: 150
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  hideCanvas: Boolean,
  hideSliders: Boolean,
  hideInputs: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(Si).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(Si),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Si).includes(t))
  },
  showSwatches: Boolean,
  swatches: Array,
  swatchesMaxHeight: {
    type: [Number, String],
    default: 150
  },
  modelValue: {
    type: [Object, String]
  },
  ...Xt(Kv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), aV = hn({
  name: "VColorPicker",
  props: Tw(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = Ne(e, "mode"), n = te(null), i = Ne(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = Dl(Wt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? jb(a, e.modelValue) : null), r = C(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = mn();
    let l = !0;
    we(i, (a) => {
      if (!l) {
        l = !0;
        return;
      }
      a && (n.value = a.h);
    }, {
      immediate: !0
    });
    const s = (a) => {
      l = !1, n.value = a.h, i.value = a;
    };
    return fn(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), En({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), ve(() => {
      const a = Lf.filterProps(e);
      return y(Lf, he({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Nh({
            ...r.value ?? Ui,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && y(Db, {
          key: "canvas",
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled,
          dotSize: e.dotSize,
          width: e.width,
          height: e.canvasHeight
        }, null), (!e.hideSliders || !e.hideInputs) && y("div", {
          key: "controls",
          class: "v-color-picker__controls"
        }, [!e.hideSliders && y(lw, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && y(Yb, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && y(Iw, {
          key: "swatches",
          color: r.value,
          "onUpdate:color": s,
          maxHeight: e.swatchesMaxHeight,
          swatches: e.swatches,
          disabled: e.disabled
        }, null)]
      });
    }), {};
  }
}), Ur = Symbol.for("vuetify:v-expansion-panel"), Mw = ["default", "accordion", "inset", "popout"], Aw = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => Mw.includes(e)
  },
  readonly: Boolean,
  ...ke(),
  ...Hl(),
  ...Ye(),
  ...Je()
}, "VExpansionPanels"), Pf = de()({
  name: "VExpansionPanels",
  props: Aw(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    no(e, Ur);
    const {
      themeClasses: i
    } = it(e), r = C(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return En({
      VExpansionPanel: {
        color: ae(e, "color"),
        readonly: ae(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: ae(e, "focusable"),
        static: ae(e, "static")
      }
    }), ve(() => y(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), $w = Z({
  ...ke(),
  ...Jl()
}, "VExpansionPanelText"), Nw = de()({
  name: "VExpansionPanelText",
  props: $w(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = ze(Ur);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = du(e, i.isSelected);
    return ve(() => y(yv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [je(y("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && y("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[pt, i.isSelected.value]])];
      }
    })), {};
  }
}), Xv = Z({
  color: String,
  expandIcon: {
    type: Me,
    default: "$expand"
  },
  collapseIcon: {
    type: Me,
    default: "$collapse"
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !1
  },
  readonly: Boolean,
  ...ke()
}, "VExpansionPanelTitle"), Rw = de()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Ri
  },
  props: Xv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = ze(Ur);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Dt(e, "color"), l = C(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return ve(() => {
      var s;
      return je(y("button", {
        class: ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": i.isSelected.value,
          "v-expansion-panel-title--focusable": e.focusable,
          "v-expansion-panel-title--static": e.static
        }, r.value, e.class],
        style: [o.value, e.style],
        type: "button",
        tabindex: i.disabled.value ? -1 : void 0,
        disabled: i.disabled.value,
        "aria-expanded": i.isSelected.value,
        onClick: e.readonly ? void 0 : i.toggle
      }, [y("span", {
        class: "v-expansion-panel-title__overlay"
      }, null), (s = n.default) == null ? void 0 : s.call(n, l.value), !e.hideActions && y("span", {
        class: "v-expansion-panel-title__icon"
      }, [n.actions ? n.actions(l.value) : y(Ge, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[cn("ripple"), e.ripple]]);
    }), {};
  }
}), Ow = Z({
  title: String,
  text: String,
  bgColor: String,
  ...ke(),
  ...Hn(),
  ...jl(),
  ...Jl(),
  ...Pt(),
  ...Ye(),
  ...Xv()
}, "VExpansionPanel"), uV = de()({
  name: "VExpansionPanel",
  props: Ow(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = zl(e, Ur), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Dt(e, "bgColor"), {
      elevationClasses: l
    } = jn(e), {
      roundedClasses: s
    } = It(e), a = C(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = C(() => i.group.items.value.reduce((f, h, v) => (i.group.selected.value.includes(h.id) && f.push(v), f), [])), c = C(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === 1);
    }), d = C(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === -1);
    });
    return ct(Ur, i), En({
      VExpansionPanelText: {
        eager: ae(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: ae(e, "readonly")
      }
    }), ve(() => {
      const f = !!(n.text || e.text), h = !!(n.title || e.title);
      return y(e.tag, {
        class: ["v-expansion-panel", {
          "v-expansion-panel--active": i.isSelected.value,
          "v-expansion-panel--before-active": c.value,
          "v-expansion-panel--after-active": d.value,
          "v-expansion-panel--disabled": a.value
        }, s.value, r.value, e.class],
        style: [o.value, e.style]
      }, {
        default: () => {
          var v;
          return [y("div", {
            class: ["v-expansion-panel__shadow", ...l.value]
          }, null), h && y(Rw, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && y(Nw, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), fa = Symbol.for("vuetify:list");
function Zv() {
  const e = ze(fa, {
    hasPrepend: be(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: be(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return ct(fa, t), e;
}
function Jv() {
  return ze(fa, null);
}
const ku = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = _e(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
    },
    in: (n, i, r) => {
      let o = /* @__PURE__ */ new Set();
      for (const l of n || [])
        o = t.activate({
          id: l,
          value: !0,
          activated: new Set(o),
          children: i,
          parents: r
        });
      return o;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, Qv = (e) => {
  const t = ku(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = _e(o);
      const s = r.has(o) ? /* @__PURE__ */ new Set([o]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...l,
        id: o,
        activated: s
      });
    },
    in: (i, r, o) => {
      let l = /* @__PURE__ */ new Set();
      return i != null && i.length && (l = t.in(i.slice(0, 1), r, o)), l;
    },
    out: (i, r, o) => t.out(i, r, o)
  };
}, Bw = (e) => {
  const t = ku(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = _e(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Fw = (e) => {
  const t = Qv(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = _e(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Dw = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: i,
      parents: r
    } = e;
    if (n) {
      const o = /* @__PURE__ */ new Set();
      o.add(t);
      let l = r.get(t);
      for (; l != null; )
        o.add(l), l = r.get(l);
      return o;
    } else
      return i.delete(t), i;
  },
  select: () => null
}, em = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: i,
      parents: r
    } = e;
    if (n) {
      let o = r.get(t);
      for (i.add(t); o != null && o !== t; )
        i.add(o), o = r.get(o);
      return i;
    } else
      i.delete(t);
    return i;
  },
  select: () => null
}, Hw = {
  open: em.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: i,
      parents: r
    } = e;
    if (!n) return i;
    const o = [];
    let l = r.get(t);
    for (; l != null; )
      o.push(l), l = r.get(l);
    return new Set(o);
  }
}, Su = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = _e(i), e && !r) {
        const l = Array.from(o.entries()).reduce((s, a) => {
          let [u, c] = a;
          return c === "on" && s.push(u), s;
        }, []);
        if (l.length === 1 && l[0] === i) return o;
      }
      return o.set(i, r ? "on" : "off"), o;
    },
    in: (n, i, r) => {
      let o = /* @__PURE__ */ new Map();
      for (const l of n || [])
        o = t.select({
          id: l,
          value: !0,
          selected: new Map(o),
          children: i,
          parents: r
        });
      return o;
    },
    out: (n) => {
      const i = [];
      for (const [r, o] of n.entries())
        o === "on" && i.push(r);
      return i;
    }
  };
  return t;
}, tm = (e) => {
  const t = Su(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = _e(o);
      const s = r.has(o) ? /* @__PURE__ */ new Map([[o, r.get(o)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...l,
        id: o,
        selected: s
      });
    },
    in: (i, r, o) => {
      let l = /* @__PURE__ */ new Map();
      return i != null && i.length && (l = t.in(i.slice(0, 1), r, o)), l;
    },
    out: (i, r, o) => t.out(i, r, o)
  };
}, jw = (e) => {
  const t = Su(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = _e(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, zw = (e) => {
  const t = tm(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = _e(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Gw = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = _e(i);
      const a = new Map(o), u = [i];
      for (; u.length; ) {
        const d = u.shift();
        o.set(d, r ? "on" : "off"), l.has(d) && u.push(...l.get(d));
      }
      let c = s.get(i);
      for (; c; ) {
        const d = l.get(c), f = d.every((v) => o.get(v) === "on"), h = d.every((v) => !o.has(v) || o.get(v) === "off");
        o.set(c, f ? "on" : h ? "off" : "indeterminate"), c = s.get(c);
      }
      return e && !r && Array.from(o.entries()).reduce((f, h) => {
        let [v, m] = h;
        return m === "on" && f.push(v), f;
      }, []).length === 0 ? a : o;
    },
    in: (n, i, r) => {
      let o = /* @__PURE__ */ new Map();
      for (const l of n || [])
        o = t.select({
          id: l,
          value: !0,
          selected: new Map(o),
          children: i,
          parents: r
        });
      return o;
    },
    out: (n, i) => {
      const r = [];
      for (const [o, l] of n.entries())
        l === "on" && !i.has(o) && r.push(o);
      return r;
    }
  };
  return t;
}, Wr = Symbol.for("vuetify:nested"), nm = {
  id: be(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: te(/* @__PURE__ */ new Map()),
    children: te(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: te(!1),
    selectable: te(!1),
    opened: te(/* @__PURE__ */ new Set()),
    activated: te(/* @__PURE__ */ new Set()),
    selected: te(/* @__PURE__ */ new Map()),
    selectedValues: te([])
  }
}, Uw = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), Ww = (e) => {
  let t = !1;
  const n = te(/* @__PURE__ */ new Map()), i = te(/* @__PURE__ */ new Map()), r = Ne(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = C(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return Bw(e.mandatory);
      case "single-leaf":
        return Fw(e.mandatory);
      case "independent":
        return ku(e.mandatory);
      case "single-independent":
      default:
        return Qv(e.mandatory);
    }
  }), l = C(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return zw(e.mandatory);
      case "leaf":
        return jw(e.mandatory);
      case "independent":
        return Su(e.mandatory);
      case "single-independent":
        return tm(e.mandatory);
      case "classic":
      default:
        return Gw(e.mandatory);
    }
  }), s = C(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Hw;
      case "single":
        return Dw;
      case "multiple":
      default:
        return em;
    }
  }), a = Ne(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = Ne(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  dn(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const d = ot("nested"), f = {
    id: be(),
    root: {
      opened: r,
      activatable: ae(e, "activatable"),
      selectable: ae(e, "selectable"),
      activated: a,
      selected: u,
      selectedValues: C(() => {
        const h = [];
        for (const [v, m] of u.value.entries())
          m === "on" && h.push(v);
        return h;
      }),
      register: (h, v, m) => {
        v && h !== v && i.value.set(h, v), m && n.value.set(h, []), v != null && n.value.set(v, [...n.value.get(v) || [], h]);
      },
      unregister: (h) => {
        if (t) return;
        n.value.delete(h);
        const v = i.value.get(h);
        if (v) {
          const m = n.value.get(v) ?? [];
          n.value.set(v, m.filter((p) => p !== h));
        }
        i.value.delete(h), r.value.delete(h);
      },
      open: (h, v, m) => {
        d.emit("click:open", {
          id: h,
          value: v,
          path: c(h),
          event: m
        });
        const p = s.value.open({
          id: h,
          value: v,
          opened: new Set(r.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        p && (r.value = p);
      },
      openOnSelect: (h, v, m) => {
        const p = s.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          opened: new Set(r.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        p && (r.value = p);
      },
      select: (h, v, m) => {
        d.emit("click:select", {
          id: h,
          value: v,
          path: c(h),
          event: m
        });
        const p = l.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        p && (u.value = p), f.root.openOnSelect(h, v, m);
      },
      activate: (h, v, m) => {
        if (!e.activatable)
          return f.root.select(h, !0, m);
        d.emit("click:activate", {
          id: h,
          value: v,
          path: c(h),
          event: m
        });
        const p = o.value.activate({
          id: h,
          value: v,
          activated: new Set(a.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        p && (a.value = p);
      },
      children: n,
      parents: i
    }
  };
  return ct(Wr, f), f.root;
}, im = (e, t) => {
  const n = ze(Wr, nm), i = Symbol(Lt()), r = C(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: C(() => n.root.opened.value.has(r.value)),
    parent: C(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: C(() => n.root.activated.value.has(_e(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: C(() => n.root.selected.value.get(_e(r.value)) === "on"),
    isIndeterminate: C(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: C(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), dn(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && ct(Wr, o), o;
}, qw = () => {
  const e = ze(Wr, nm);
  ct(Wr, {
    ...e,
    isGroupActivator: !0
  });
}, Yw = hn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return qw(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), Kw = Z({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: Me,
    default: "$collapse"
  },
  expandIcon: {
    type: Me,
    default: "$expand"
  },
  prependIcon: Me,
  appendIcon: Me,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...ke(),
  ...Ye()
}, "VListGroup"), If = de()({
  name: "VListGroup",
  props: Kw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = im(ae(e, "value"), !0), l = C(() => `v-list-group--id-${String(o.value)}`), s = Jv(), {
      isBooted: a
    } = Uv();
    function u(h) {
      r(!i.value, h);
    }
    const c = C(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: l.value
    })), d = C(() => i.value ? e.collapseIcon : e.expandIcon), f = C(() => ({
      VListItem: {
        active: i.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && d.value,
        appendIcon: e.appendIcon || !e.subgroup && d.value,
        title: e.title,
        value: e.value
      }
    }));
    return ve(() => y(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": i.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && y(nt, {
        defaults: f.value
      }, {
        default: () => [y(Yw, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), y(Mn, {
        transition: {
          component: yv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [je(y("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[pt, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), Xw = cr("v-list-item-subtitle"), Zw = cr("v-list-item-title"), Jw = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: Me,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: Me,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: sn(),
  onClickOnce: sn(),
  ...$i(),
  ...ke(),
  ...Zt(),
  ...oi(),
  ...Hn(),
  ...Pt(),
  ...Kl(),
  ...Ye(),
  ...Je(),
  ...zn({
    variant: "text"
  })
}, "VListItem"), yl = de()({
  name: "VListItem",
  directives: {
    Ripple: Ri
  },
  props: Jw(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const o = Yl(e, n), l = C(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: d,
      isGroupActivator: f,
      root: h,
      parent: v,
      openOnSelect: m
    } = im(l, !1), p = Jv(), g = C(() => {
      var B;
      return e.active !== !1 && (e.active || ((B = o.isActive) == null ? void 0 : B.value) || (h.activatable.value ? a.value : c.value));
    }), w = C(() => e.link !== !1 && o.isLink.value), x = C(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = C(() => e.rounded || e.nav), k = C(() => e.color ?? e.activeColor), E = C(() => ({
      color: g.value ? k.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    we(() => {
      var B;
      return (B = o.isActive) == null ? void 0 : B.value;
    }, (B) => {
      B && v.value != null && h.open(v.value, !0), B && m(B);
    }, {
      immediate: !0
    });
    const {
      themeClasses: S
    } = it(e), {
      borderClasses: P
    } = Ni(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: D
    } = dr(E), {
      densityClasses: L
    } = vn(e), {
      dimensionStyles: I
    } = li(e), {
      elevationClasses: _
    } = jn(e), {
      roundedClasses: O
    } = It(b), M = C(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), j = C(() => ({
      isActive: g.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: d.value
    }));
    function N(B) {
      var H;
      r("click", B), !(f || !x.value) && ((H = o.navigate) == null || H.call(o, B), h.activatable ? s(!a.value, B) : (h.selectable || e.value != null) && u(!c.value, B));
    }
    function F(B) {
      (B.key === "Enter" || B.key === " ") && (B.preventDefault(), N(B));
    }
    return ve(() => {
      const B = w.value ? "a" : e.tag, H = i.title || e.title != null, Y = i.subtitle || e.subtitle != null, Q = !!(e.appendAvatar || e.appendIcon), se = !!(Q || i.append), fe = !!(e.prependAvatar || e.prependIcon), J = !!(fe || i.prepend);
      return p == null || p.updateHasPrepend(J), e.activeColor && Gy("active-color", ["color", "base-color"]), je(y(B, {
        class: ["v-list-item", {
          "v-list-item--active": g.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": x.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && g.value
        }, S.value, P.value, $.value, L.value, _.value, M.value, O.value, D.value, e.class],
        style: [R.value, I.value, e.style],
        href: o.href.value,
        tabindex: x.value ? p ? -2 : 0 : void 0,
        onClick: N,
        onKeydown: x.value && !w.value && F
      }, {
        default: () => {
          var le;
          return [fr(x.value || g.value, "v-list-item"), J && y("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? y(nt, {
            key: "prepend-defaults",
            disabled: !fe,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var Ee;
              return [(Ee = i.prepend) == null ? void 0 : Ee.call(i, j.value)];
            }
          }) : y(Le, null, [e.prependAvatar && y(Vi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && y(Ge, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)]), y("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [H && y(Zw, {
            key: "title"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.title) == null ? void 0 : Ee.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && y(Xw, {
            key: "subtitle"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.subtitle) == null ? void 0 : Ee.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (le = i.default) == null ? void 0 : le.call(i, j.value)]), se && y("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? y(nt, {
            key: "append-defaults",
            disabled: !Q,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var Ee;
              return [(Ee = i.append) == null ? void 0 : Ee.call(i, j.value)];
            }
          }) : y(Le, null, [e.appendIcon && y(Ge, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(Vi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[cn("ripple"), x.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), Qw = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...ke(),
  ...Ye()
}, "VListSubheader"), ex = de()({
  name: "VListSubheader",
  props: Qw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = an(ae(e, "color"));
    return ve(() => {
      const o = !!(n.default || e.title);
      return y(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, i.value, e.class],
        style: [{
          textColorStyles: r
        }, e.style]
      }, {
        default: () => {
          var l;
          return [o && y("div", {
            class: "v-list-subheader__text"
          }, [((l = n.default) == null ? void 0 : l.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), tx = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...ke(),
  ...Je()
}, "VDivider"), nx = de()({
  name: "VDivider",
  props: tx(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      textColorClasses: r,
      textColorStyles: o
    } = an(ae(e, "color")), l = C(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = ye(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ye(e.thickness)), s;
    });
    return ve(() => y("hr", {
      class: [{
        "v-divider": !0,
        "v-divider--inset": e.inset,
        "v-divider--vertical": e.vertical
      }, i.value, r.value, e.class],
      style: [l.value, o.value, e.style],
      "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
      role: `${n.role || "separator"}`
    }, null)), {};
  }
}), ix = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), rm = de()({
  name: "VListChildren",
  props: ix(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Zv(), () => {
      var i, r;
      return ((i = n.default) == null ? void 0 : i.call(n)) ?? ((r = e.items) == null ? void 0 : r.map((o) => {
        var f, h;
        let {
          children: l,
          props: s,
          type: a,
          raw: u
        } = o;
        if (a === "divider")
          return ((f = n.divider) == null ? void 0 : f.call(n, {
            props: s
          })) ?? y(nx, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? y(ex, s, null);
        const c = {
          subtitle: n.subtitle ? (v) => {
            var m;
            return (m = n.subtitle) == null ? void 0 : m.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (v) => {
            var m;
            return (m = n.prepend) == null ? void 0 : m.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          append: n.append ? (v) => {
            var m;
            return (m = n.append) == null ? void 0 : m.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          title: n.title ? (v) => {
            var m;
            return (m = n.title) == null ? void 0 : m.call(n, {
              ...v,
              item: u
            });
          } : void 0
        }, d = If.filterProps(s);
        return l ? y(If, he({
          value: s == null ? void 0 : s.value
        }, d), {
          activator: (v) => {
            let {
              props: m
            } = v;
            const p = {
              ...s,
              ...m,
              value: e.returnObject ? u : s.value
            };
            return n.header ? n.header({
              props: p
            }) : y(yl, p, c);
          },
          default: () => y(rm, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : y(yl, he(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), om = Z({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: Ai
  }
}, "list-items");
function da(e, t) {
  const n = Tn(t, e.itemTitle, t), i = Tn(t, e.itemValue, n), r = Tn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Xt(t, ["children"]) : t : void 0 : Tn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? lm(e, r) : void 0,
    raw: t
  };
}
function lm(e, t) {
  const n = [];
  for (const i of t)
    n.push(da(e, i));
  return n;
}
function rx(e) {
  const t = C(() => lm(e, e.items)), n = C(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? da(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || da(e, l));
  }
  function r(o) {
    return e.returnObject ? o.map((l) => {
      let {
        raw: s
      } = l;
      return s;
    }) : o.map((l) => {
      let {
        value: s
      } = l;
      return s;
    });
  }
  return {
    items: t,
    transformIn: i,
    transformOut: r
  };
}
function ox(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function lx(e, t) {
  const n = Tn(t, e.itemType, "item"), i = ox(t) ? t : Tn(t, e.itemTitle), r = Tn(t, e.itemValue, void 0), o = Tn(t, e.itemChildren), l = e.itemProps === !0 ? Xt(t, ["children"]) : Tn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? sm(e, o) : void 0,
    raw: t
  };
}
function sm(e, t) {
  const n = [];
  for (const i of t)
    n.push(lx(e, i));
  return n;
}
function sx(e) {
  return {
    items: C(() => sm(e, e.items))
  };
}
const ax = Z({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  ...Uw({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...$i(),
  ...ke(),
  ...Zt(),
  ...oi(),
  ...Hn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...om(),
  ...Pt(),
  ...Ye(),
  ...Je(),
  ...zn({
    variant: "text"
  })
}, "VList"), ux = de()({
  name: "VList",
  props: ax(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: i
    } = sx(e), {
      themeClasses: r
    } = it(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = Dt(ae(e, "bgColor")), {
      borderClasses: s
    } = Ni(e), {
      densityClasses: a
    } = vn(e), {
      dimensionStyles: u
    } = li(e), {
      elevationClasses: c
    } = jn(e), {
      roundedClasses: d
    } = It(e), {
      children: f,
      open: h,
      parents: v,
      select: m
    } = Ww(e), p = C(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = ae(e, "activeColor"), w = ae(e, "baseColor"), x = ae(e, "color");
    Zv(), En({
      VListGroup: {
        activeColor: g,
        baseColor: w,
        color: x,
        expandIcon: ae(e, "expandIcon"),
        collapseIcon: ae(e, "collapseIcon")
      },
      VListItem: {
        activeClass: ae(e, "activeClass"),
        activeColor: g,
        baseColor: w,
        color: x,
        density: ae(e, "density"),
        disabled: ae(e, "disabled"),
        lines: ae(e, "lines"),
        nav: ae(e, "nav"),
        slim: ae(e, "slim"),
        variant: ae(e, "variant")
      }
    });
    const b = be(!1), k = te();
    function E(L) {
      b.value = !0;
    }
    function S(L) {
      b.value = !1;
    }
    function P(L) {
      var I;
      !b.value && !(L.relatedTarget && ((I = k.value) != null && I.contains(L.relatedTarget))) && D();
    }
    function $(L) {
      if (k.value) {
        if (L.key === "ArrowDown")
          D("next");
        else if (L.key === "ArrowUp")
          D("prev");
        else if (L.key === "Home")
          D("first");
        else if (L.key === "End")
          D("last");
        else
          return;
        L.preventDefault();
      }
    }
    function R(L) {
      b.value = !0;
    }
    function D(L) {
      if (k.value)
        return sl(k.value, L);
    }
    return ve(() => y(e.tag, {
      ref: k,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, o.value, s.value, a.value, c.value, p.value, d.value, e.class],
      style: [l.value, u.value, e.style],
      tabindex: e.disabled || b.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: E,
      onFocusout: S,
      onFocus: P,
      onKeydown: $,
      onMousedown: R
    }, {
      default: () => [y(rm, {
        items: i.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: m,
      focus: D,
      children: f,
      parents: v
    };
  }
}), cx = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...Xt(co({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: cu
    }
  }), ["absolute"])
}, "VMenu"), fx = de()({
  name: "VMenu",
  props: cx(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(e, "modelValue"), {
      scopeId: r
    } = uo(), o = Lt(), l = C(() => e.id || `v-menu-${o}`), s = te(), a = ze(ra, null), u = be(0);
    ct(ra, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Ay(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, x, b;
      const p = m.relatedTarget, g = m.target;
      await Ze(), i.value && p !== g && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((x = s.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(g) && // It isn't inside the menu body
      !s.value.contentEl.contains(g) && ((b = Dr(s.value.contentEl)[0]) == null || b.focus());
    }
    we(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(m) {
      a == null || a.closeParents(m);
    }
    function f(m) {
      var p, g, w;
      e.disabled || m.key === "Tab" && (Eh(Dr((p = s.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (g = s.value) == null ? void 0 : g.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var g;
      if (e.disabled) return;
      const p = (g = s.value) == null ? void 0 : g.contentEl;
      p && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), sl(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), sl(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = C(() => he({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return ve(() => {
      const m = ii.filterProps(e);
      return y(ii, he({
        ref: s,
        id: l.value,
        class: ["v-menu", e.class],
        style: e.style
      }, m, {
        modelValue: i.value,
        "onUpdate:modelValue": (p) => i.value = p,
        absolute: !0,
        activatorProps: v.value,
        "onClick:outside": d,
        onKeydown: f
      }, r), {
        activator: n.activator,
        default: function() {
          for (var p = arguments.length, g = new Array(p), w = 0; w < p; w++)
            g[w] = arguments[w];
          return y(nt, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = n.default) == null ? void 0 : x.call(n, ...g)];
            }
          });
        }
      });
    }), si({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), dx = ["color", "file", "time", "date", "datetime-local", "week", "month"], am = Z({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...Oi(),
  ...gu()
}, "VTextField"), Tf = de()({
  name: "VTextField",
  directives: {
    Intersect: fv
  },
  inheritAttrs: !1,
  props: am(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: i,
      slots: r
    } = t;
    const o = Ne(e, "modelValue"), {
      isFocused: l,
      focus: s,
      blur: a
    } = hr(e), u = C(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = C(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = C(() => ["plain", "underlined"].includes(e.variant));
    function f(E, S) {
      var P, $;
      !e.autofocus || !E || ($ = (P = S[0].target) == null ? void 0 : P.focus) == null || $.call(P);
    }
    const h = te(), v = te(), m = te(), p = C(() => dx.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
    function g() {
      var E;
      m.value !== document.activeElement && ((E = m.value) == null || E.focus()), l.value || s();
    }
    function w(E) {
      i("mousedown:control", E), E.target !== m.value && (g(), E.preventDefault());
    }
    function x(E) {
      g(), i("click:control", E);
    }
    function b(E) {
      E.stopPropagation(), g(), Ze(() => {
        o.value = null, Ch(e["onClick:clear"], E);
      });
    }
    function k(E) {
      var P;
      const S = E.target;
      if (o.value = S.value, (P = e.modelModifiers) != null && P.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [S.selectionStart, S.selectionEnd];
        Ze(() => {
          S.selectionStart = $[0], S.selectionEnd = $[1];
        });
      }
    }
    return ve(() => {
      const E = !!(r.counter || e.counter !== !1 && e.counter != null), S = !!(E || r.details), [P, $] = ur(n), {
        modelValue: R,
        ...D
      } = Kt.filterProps(e), L = Lv(e);
      return y(Kt, he({
        ref: h,
        modelValue: o.value,
        "onUpdate:modelValue": (I) => o.value = I,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, P, D, {
        centerAffix: !d.value,
        focused: l.value
      }), {
        ...r,
        default: (I) => {
          let {
            id: _,
            isDisabled: O,
            isDirty: M,
            isReadonly: j,
            isValid: N
          } = I;
          return y(yu, he({
            ref: v,
            onMousedown: w,
            onClick: x,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: _.value,
            active: p.value || M.value,
            dirty: M.value || e.dirty,
            disabled: O.value,
            focused: l.value,
            error: N.value === !1
          }), {
            ...r,
            default: (F) => {
              let {
                props: {
                  class: B,
                  ...H
                }
              } = F;
              const Y = je(y("input", he({
                ref: m,
                value: o.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: j.value,
                disabled: O.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: g,
                onBlur: a
              }, H, $), null), [[cn("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return y(Le, null, [e.prefix && y("span", {
                class: "v-text-field__prefix"
              }, [y("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? y("div", {
                class: B,
                "data-no-activator": ""
              }, [r.default(), Y]) : Nn(Y, {
                class: B
              }), e.suffix && y("span", {
                class: "v-text-field__suffix"
              }, [y("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: S ? (I) => {
          var _;
          return y(Le, null, [(_ = r.details) == null ? void 0 : _.call(r, I), E && y(Le, null, [y("span", null, null), y(Ev, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), si({}, h, v, m);
  }
}), hx = Z({
  renderless: Boolean,
  ...ke()
}, "VVirtualScrollItem"), vx = de()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: hx(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: i,
      slots: r
    } = t;
    const {
      resizeRef: o,
      contentRect: l
    } = rr(void 0, "border");
    we(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), ve(() => {
      var s, a;
      return e.renderless ? y(Le, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : y("div", he({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), mx = -1, gx = 1, Vs = 100, yx = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function px(e, t) {
  const n = fu(), i = be(0);
  Cn(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = be(0), o = be(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = be(0), s = be(0), a = te(), u = te();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = rr();
  Cn(() => {
    d.value = a.value;
  });
  const h = C(() => {
    var F;
    return a.value === document.documentElement ? n.height.value : ((F = f.value) == null ? void 0 : F.height) || parseInt(e.height) || 0;
  }), v = C(() => !!(a.value && u.value && h.value && i.value));
  let m = Array.from({
    length: t.value.length
  }), p = Array.from({
    length: t.value.length
  });
  const g = be(0);
  let w = -1;
  function x(F) {
    return m[F] || i.value;
  }
  const b = Py(() => {
    const F = performance.now();
    p[0] = 0;
    const B = t.value.length;
    for (let H = 1; H <= B - 1; H++)
      p[H] = (p[H - 1] || 0) + x(H - 1);
    g.value = Math.max(g.value, performance.now() - F);
  }, g), k = we(v, (F) => {
    F && (k(), c = u.value.offsetTop, b.immediate(), O(), ~w && Ze(() => {
      Be && window.requestAnimationFrame(() => {
        j(w), w = -1;
      });
    }));
  });
  bt(() => {
    b.clear();
  });
  function E(F, B) {
    const H = m[F], Y = i.value;
    i.value = Y ? Math.min(i.value, B) : B, (H !== B || Y !== i.value) && (m[F] = B, b());
  }
  function S(F) {
    return F = Bt(F, 0, t.value.length - 1), p[F] || 0;
  }
  function P(F) {
    return bx(p, F);
  }
  let $ = 0, R = 0, D = 0;
  we(h, (F, B) => {
    B && (O(), F < B && requestAnimationFrame(() => {
      R = 0, O();
    }));
  });
  function L() {
    if (!a.value || !u.value) return;
    const F = a.value.scrollTop, B = performance.now();
    B - D > 500 ? (R = Math.sign(F - $), c = u.value.offsetTop) : R = F - $, $ = F, D = B, O();
  }
  function I() {
    !a.value || !u.value || (R = 0, D = 0, O());
  }
  let _ = -1;
  function O() {
    cancelAnimationFrame(_), _ = requestAnimationFrame(M);
  }
  function M() {
    if (!a.value || !h.value) return;
    const F = $ - c, B = Math.sign(R), H = Math.max(0, F - Vs), Y = Bt(P(H), 0, t.value.length), Q = F + h.value + Vs, se = Bt(P(Q) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (B !== mx || Y < r.value) && (B !== gx || se > o.value)
    ) {
      const fe = S(r.value) - S(Y), J = S(se) - S(o.value);
      Math.max(fe, J) > Vs ? (r.value = Y, o.value = se) : (Y <= 0 && (r.value = Y), se >= t.value.length && (o.value = se));
    }
    l.value = S(r.value), s.value = S(t.value.length) - S(o.value);
  }
  function j(F) {
    const B = S(F);
    !a.value || F && !B ? w = F : a.value.scrollTop = B;
  }
  const N = C(() => t.value.slice(r.value, o.value).map((F, B) => ({
    raw: F,
    index: B + r.value
  })));
  return we(t, () => {
    m = Array.from({
      length: t.value.length
    }), p = Array.from({
      length: t.value.length
    }), b.immediate(), O();
  }, {
    deep: !0
  }), {
    containerRef: a,
    markerRef: u,
    computedItems: N,
    paddingTop: l,
    paddingBottom: s,
    scrollToIndex: j,
    handleScroll: L,
    handleScrollend: I,
    handleItemResize: E
  };
}
function bx(e, t) {
  let n = e.length - 1, i = 0, r = 0, o = null, l = -1;
  if (e[n] < t)
    return n;
  for (; i <= n; )
    if (r = i + n >> 1, o = e[r], o > t)
      n = r - 1;
    else if (o < t)
      l = r, i = r + 1;
    else return o === t ? r : i;
  return l;
}
const wx = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...yx(),
  ...ke(),
  ...oi()
}, "VVirtualScroll"), xx = de()({
  name: "VVirtualScroll",
  props: wx(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = ot("VVirtualScroll"), {
      dimensionStyles: r
    } = li(e), {
      containerRef: o,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: d,
      paddingBottom: f,
      computedItems: h
    } = px(e, ae(e, "items"));
    return Ei(() => e.renderless, () => {
      function v() {
        var g, w;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", a)) : ((g = o.value) == null || g[p]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[p]("scrollend", a));
      }
      fn(() => {
        o.value = zh(i.vnode.el, !0), v(!0);
      }), bt(v);
    }), ve(() => {
      const v = h.value.map((m) => y(vx, {
        key: m.index,
        renderless: e.renderless,
        "onUpdate:height": (p) => u(m.index, p)
      }, {
        default: (p) => {
          var g;
          return (g = n.default) == null ? void 0 : g.call(n, {
            item: m.raw,
            index: m.index,
            ...p
          });
        }
      }));
      return e.renderless ? y(Le, null, [y("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ye(d.value)
        }
      }, null), v, y("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ye(f.value)
        }
      }, null)]) : y("div", {
        ref: o,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: a,
        style: [r.value, e.style]
      }, [y("div", {
        ref: l,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ye(d.value),
          paddingBottom: ye(f.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function _x(e, t) {
  const n = be(!1);
  let i;
  function r(s) {
    cancelAnimationFrame(i), n.value = !0, i = requestAnimationFrame(() => {
      i = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function o() {
    await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => requestAnimationFrame(s)), await new Promise((s) => {
      if (n.value) {
        const a = we(n, () => {
          a(), s();
        });
      } else s();
    });
  }
  async function l(s) {
    var c, d;
    if (s.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const a = (d = e.value) == null ? void 0 : d.$el;
    if (!a) return;
    (s.key === "Home" || s.key === "End") && a.scrollTo({
      top: s.key === "Home" ? 0 : a.scrollHeight,
      behavior: "smooth"
    }), await o();
    const u = a.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const f = a.getBoundingClientRect().top;
      for (const h of u)
        if (h.getBoundingClientRect().top >= f) {
          h.focus();
          break;
        }
    } else {
      const f = a.getBoundingClientRect().bottom;
      for (const h of [...u].reverse())
        if (h.getBoundingClientRect().bottom <= f) {
          h.focus();
          break;
        }
    }
  }
  return {
    onListScroll: r,
    onListKeydown: l
  };
}
const kx = Z({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: Me,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...om({
    itemChildren: !1
  })
}, "Select"), Sx = Z({
  ...kx(),
  ...Xt(am({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...ao({
    transition: {
      component: cu
    }
  })
}, "VSelect"), cV = de()({
  name: "VSelect",
  props: Sx(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: i
    } = oo(), r = te(), o = te(), l = te(), s = Ne(e, "menu"), a = C({
      get: () => s.value,
      set: (N) => {
        var F;
        s.value && !N && ((F = o.value) != null && F.ΨopenChildren) || (s.value = N);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = rx(e), f = Ne(e, "modelValue", [], (N) => c(N === null ? [null] : kn(N)), (N) => {
      const F = d(N);
      return e.multiple ? F : F[0] ?? null;
    }), h = C(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Pv(), m = C(() => f.value.map((N) => N.value)), p = be(!1), g = C(() => a.value ? e.closeText : e.openText);
    let w = "", x;
    const b = C(() => e.hideSelected ? u.value.filter((N) => !f.value.some((F) => F === N)) : u.value), k = C(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = C(() => {
      var N;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((N = e.menuProps) == null ? void 0 : N.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), S = te(), {
      onListScroll: P,
      onListKeydown: $
    } = _x(S, r);
    function R(N) {
      e.openOnClear && (a.value = !0);
    }
    function D() {
      k.value || (a.value = !a.value);
    }
    function L(N) {
      var Q, se;
      if (!N.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown", " "].includes(N.key) && (a.value = !0), ["Escape", "Tab"].includes(N.key) && (a.value = !1), N.key === "Home" ? (Q = S.value) == null || Q.focus("first") : N.key === "End" && ((se = S.value) == null || se.focus("last"));
      const F = 1e3;
      function B(fe) {
        const J = fe.key.length === 1, le = !fe.ctrlKey && !fe.metaKey && !fe.altKey;
        return J && le;
      }
      if (e.multiple || !B(N)) return;
      const H = performance.now();
      H - x > F && (w = ""), w += N.key.toLowerCase(), x = H;
      const Y = u.value.find((fe) => fe.title.toLowerCase().startsWith(w));
      Y !== void 0 && (f.value = [Y]);
    }
    function I(N) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!N.props.disabled)
        if (e.multiple) {
          const B = f.value.findIndex((Y) => e.valueComparator(Y.value, N.value)), H = F ?? !~B;
          if (~B) {
            const Y = H ? [...f.value, N] : [...f.value];
            Y.splice(B, 1), f.value = Y;
          } else H && (f.value = [...f.value, N]);
        } else {
          const B = F !== !1;
          f.value = B ? [N] : [], Ze(() => {
            a.value = !1;
          });
        }
    }
    function _(N) {
      var F;
      (F = S.value) != null && F.$el.contains(N.relatedTarget) || (a.value = !1);
    }
    function O() {
      var N;
      p.value && ((N = r.value) == null || N.focus());
    }
    function M(N) {
      p.value = !0;
    }
    function j(N) {
      if (N == null) f.value = [];
      else if (al(r.value, ":autofill") || al(r.value, ":-webkit-autofill")) {
        const F = u.value.find((B) => B.title === N);
        F && I(F);
      } else r.value && (r.value.value = "");
    }
    return we(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const N = b.value.findIndex((F) => f.value.some((B) => e.valueComparator(B.value, F.value)));
        Be && window.requestAnimationFrame(() => {
          var F;
          N >= 0 && ((F = l.value) == null || F.scrollToIndex(N));
        });
      }
    }), we(() => e.items, (N, F) => {
      a.value || p.value && !F.length && N.length && (a.value = !0);
    }), ve(() => {
      const N = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), B = f.value.length > 0, H = Tf.filterProps(e), Y = B || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return y(Tf, he({
        ref: r
      }, H, {
        modelValue: f.value.map((Q) => Q.props.value).join(", "),
        "onUpdate:modelValue": j,
        focused: p.value,
        "onUpdate:focused": (Q) => p.value = Q,
        validationValue: f.externalValue,
        counterValue: h.value,
        dirty: B,
        class: ["v-select", {
          "v-select--active-menu": a.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": f.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: Y,
        "onClick:clear": R,
        "onMousedown:control": D,
        onBlur: _,
        onKeydown: L,
        "aria-label": i(g.value),
        title: i(g.value)
      }), {
        ...n,
        default: () => y(Le, null, [y(fx, he({
          ref: o,
          modelValue: a.value,
          "onUpdate:modelValue": (Q) => a.value = Q,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: k.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: O
        }, E.value), {
          default: () => [F && y(ux, he({
            ref: S,
            selected: m.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (Q) => Q.preventDefault(),
            onKeydown: $,
            onFocusin: M,
            onScrollPassive: P,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var Q, se, fe;
              return [(Q = n["prepend-item"]) == null ? void 0 : Q.call(n), !b.value.length && !e.hideNoData && (((se = n["no-data"]) == null ? void 0 : se.call(n)) ?? y(yl, {
                title: i(e.noDataText)
              }, null)), y(xx, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var xt;
                  let {
                    item: le,
                    index: Ee,
                    itemRef: De
                  } = J;
                  const Ue = he(le.props, {
                    ref: De,
                    key: Ee,
                    onClick: () => I(le, null)
                  });
                  return ((xt = n.item) == null ? void 0 : xt.call(n, {
                    item: le,
                    index: Ee,
                    props: Ue
                  })) ?? y(yl, he(Ue, {
                    role: "option"
                  }), {
                    prepend: (yn) => {
                      let {
                        isSelected: V
                      } = yn;
                      return y(Le, null, [e.multiple && !e.hideSelected ? y(aa, {
                        key: le.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, le.props.prependAvatar && y(Vi, {
                        image: le.props.prependAvatar
                      }, null), le.props.prependIcon && y(Ge, {
                        icon: le.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (fe = n["append-item"]) == null ? void 0 : fe.call(n)];
            }
          })]
        }), f.value.map((Q, se) => {
          function fe(De) {
            De.stopPropagation(), De.preventDefault(), I(Q, !1);
          }
          const J = {
            "onClick:close": fe,
            onMousedown(De) {
              De.preventDefault(), De.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, le = N ? !!n.chip : !!n.selection, Ee = le ? Vh(N ? n.chip({
            item: Q,
            index: se,
            props: J
          }) : n.selection({
            item: Q,
            index: se
          })) : void 0;
          if (!(le && !Ee))
            return y("div", {
              key: Q.value,
              class: "v-select__selection"
            }, [N ? n.chip ? y(nt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: Q.title
                }
              }
            }, {
              default: () => [Ee]
            }) : y(Cv, he({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Q.title,
              disabled: Q.props.disabled
            }, J), null) : Ee ?? y("span", {
              class: "v-select__selection-text"
            }, [Q.title, e.multiple && se < f.value.length - 1 && y("span", {
              class: "v-select__selection-comma"
            }, [tt(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var Q = arguments.length, se = new Array(Q), fe = 0; fe < Q; fe++)
            se[fe] = arguments[fe];
          return y(Le, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...se), e.menuIcon ? y(Ge, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), si({
      isFocused: p,
      menu: a,
      select: I
    }, r);
  }
}), Cx = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Oi(),
  ...es()
}, "VSwitch"), pr = de()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: Cx(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Ne(e, "indeterminate"), o = Ne(e, "modelValue"), {
      loaderClasses: l
    } = Ul(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = hr(e), c = te(), d = C(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = Lt(), h = C(() => e.id || `switch-${f}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(p) {
      var g, w;
      p.stopPropagation(), p.preventDefault(), (w = (g = c.value) == null ? void 0 : g.input) == null || w.click();
    }
    return ve(() => {
      const [p, g] = ur(n), w = Kt.filterProps(e), x = or.filterProps(e);
      return y(Kt, he({
        class: ["v-switch", {
          "v-switch--flat": e.flat
        }, {
          "v-switch--inset": e.inset
        }, {
          "v-switch--indeterminate": r.value
        }, l.value, e.class]
      }, p, w, {
        modelValue: o.value,
        "onUpdate:modelValue": (b) => o.value = b,
        id: h.value,
        focused: s.value,
        style: e.style
      }), {
        ...i,
        default: (b) => {
          let {
            id: k,
            messagesId: E,
            isDisabled: S,
            isReadonly: P,
            isValid: $
          } = b;
          const R = {
            model: o,
            isValid: $
          };
          return y(or, he({
            ref: c
          }, x, {
            modelValue: o.value,
            "onUpdate:modelValue": [(D) => o.value = D, v],
            id: k.value,
            "aria-describedby": E.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: S.value,
            readonly: P.value,
            onFocus: a,
            onBlur: u
          }, g), {
            ...i,
            default: (D) => {
              let {
                backgroundColorClasses: L,
                backgroundColorStyles: I
              } = D;
              return y("div", {
                class: ["v-switch__track", ...L.value],
                style: I.value,
                onClick: m
              }, [i["track-true"] && y("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [i["track-true"](R)]), i["track-false"] && y("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [i["track-false"](R)])]);
            },
            input: (D) => {
              let {
                inputNode: L,
                icon: I,
                backgroundColorClasses: _,
                backgroundColorStyles: O
              } = D;
              return y(Le, null, [L, y("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": I || e.loading
                }, e.inset ? void 0 : _.value],
                style: e.inset ? void 0 : O.value
              }, [i.thumb ? y(nt, {
                defaults: {
                  VIcon: {
                    icon: I,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [i.thumb({
                  ...R,
                  icon: I
                })]
              }) : y(mv, null, {
                default: () => [e.loading ? y(au, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : d.value
                }, {
                  default: (M) => i.loader ? i.loader(M) : y(Kh, {
                    active: M.isActive,
                    color: M.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : I && y(Ge, {
                  key: String(I),
                  icon: I,
                  size: "x-small"
                }, null)]
              })])]);
            }
          });
        }
      });
    }), {};
  }
}), Ex = /* @__PURE__ */ Mi({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = te(n.isWelcome), r = te(n.config.showNodeLabels), o = te(n.config.nodePhysicsEnabled), l = te(n.config.showLinkLabels), s = te(n.config.fixedLinkDistanceEnabled), a = te(n.config.zoomEnabled), u = te(String(n.config.nodeRadius)), c = te(""), d = te("black"), f = te(""), h = te(n.config.persistSettingsLocalStorage), v = t;
    function m() {
      h.value ? (localStorage.showNodeLabels = r.value, localStorage.enableNodePhysics = o.value, localStorage.showLinkLabels = l.value, localStorage.enableFixedLinkDistance = s.value, localStorage.enableZoom = a.value, localStorage.persistSettings = h.value) : localStorage.clear(), localStorage.wasHere = !0;
    }
    function p() {
      m(), v("update-settings", {
        showNodeLabels: r.value,
        nodePhysicsEnabled: o.value,
        showLinkLabels: l.value,
        fixedLinkDistanceEnabled: s.value,
        zoomEnabled: a.value,
        persistEnabled: h.value
      }), i.value = !1;
    }
    return (g, w) => (ht(), ln(hu, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (x) => i.value = x),
      persistent: ""
    }, {
      activator: ce(({ props: x }) => [
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: ce(({ props: b }) => [
            y(ut, he({
              "aria-label": "Settings",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$settings"
            }, { ...x, ...b }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(({ isActive: x }) => [
        y(uu, { class: "pa-3" }, {
          default: ce(() => [
            n.isWelcome ? (ht(), ln(Gr, { key: 0 }, {
              default: ce(() => [
                tt("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (ht(), ln(Gr, { key: 1 }, {
              default: ce(() => [
                tt("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (ht(), ln(kr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ce(() => [
                tt(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : en("", !0),
            y(Tr, null, {
              default: ce(() => [
                y(kt, null, {
                  default: ce(() => [
                    y(Gi, { cols: "5" }, {
                      default: ce(() => [
                        y(kt, null, {
                          default: ce(() => [
                            y(kr, { class: "py-5" }, {
                              default: ce(() => [
                                tt("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(Pf, null, {
                              default: ce(() => [
                                en("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(Gi, { class: "mx-0 px-0" }, {
                              default: ce(() => [
                                y(pr, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            y(Gi, { class: "mx-0 px-0" }, {
                              default: ce(() => [
                                en("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            y(pr, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            en("", !0)
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            en("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(gl),
                    y(Gi, { cols: "5" }, {
                      default: ce(() => [
                        y(kt, null, {
                          default: ce(() => [
                            y(kr, { class: "py-5" }, {
                              default: ce(() => [
                                tt("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(Pf, null, {
                              default: ce(() => [
                                en("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(pr, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": w[6] || (w[6] = (b) => l.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(pr, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            en("", !0)
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            y(kr, { class: "px-0" }, {
                              default: ce(() => [
                                tt("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "py-0 my-0" }, {
                          default: ce(() => [
                            y(pr, {
                              label: "Zoom",
                              color: "secondary",
                              modelValue: a.value,
                              "onUpdate:modelValue": w[8] || (w[8] = (b) => a.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            y(Xl, null, {
              default: ce(() => [
                y(Bb, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                y(gl),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: ce(() => [
                    tt("Save")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
});
var Vx = { value: () => {
} };
function fo() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Uo(n);
}
function Uo(e) {
  this._ = e;
}
function Lx(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Uo.prototype = fo.prototype = {
  constructor: Uo,
  on: function(e, t) {
    var n = this._, i = Lx(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = Px(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = Mf(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Mf(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Uo(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, o; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], i = 0, r = o.length; i < r; ++i) o[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], r = 0, o = i.length; r < o; ++r) i[r].value.apply(t, n);
  }
};
function Px(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Mf(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = Vx, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ha = "http://www.w3.org/1999/xhtml";
const Af = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ha,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ts(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Af.hasOwnProperty(t) ? { space: Af[t], local: e } : e;
}
function Ix(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ha && t.documentElement.namespaceURI === ha ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Tx(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function um(e) {
  var t = ts(e);
  return (t.local ? Tx : Ix)(t);
}
function Mx() {
}
function Cu(e) {
  return e == null ? Mx : function() {
    return this.querySelector(e);
  };
}
function Ax(e) {
  typeof e != "function" && (e = Cu(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new Ht(i, this._parents);
}
function $x(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Nx() {
  return [];
}
function cm(e) {
  return e == null ? Nx : function() {
    return this.querySelectorAll(e);
  };
}
function Rx(e) {
  return function() {
    return $x(e.apply(this, arguments));
  };
}
function Ox(e) {
  typeof e == "function" ? e = Rx(e) : e = cm(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new Ht(i, r);
}
function fm(e) {
  return function() {
    return this.matches(e);
  };
}
function dm(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Bx = Array.prototype.find;
function Fx(e) {
  return function() {
    return Bx.call(this.children, e);
  };
}
function Dx() {
  return this.firstElementChild;
}
function Hx(e) {
  return this.select(e == null ? Dx : Fx(typeof e == "function" ? e : dm(e)));
}
var jx = Array.prototype.filter;
function zx() {
  return Array.from(this.children);
}
function Gx(e) {
  return function() {
    return jx.call(this.children, e);
  };
}
function Ux(e) {
  return this.selectAll(e == null ? zx : Gx(typeof e == "function" ? e : dm(e)));
}
function Wx(e) {
  typeof e != "function" && (e = fm(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Ht(i, this._parents);
}
function hm(e) {
  return new Array(e.length);
}
function qx() {
  return new Ht(this._enter || this._groups.map(hm), this._parents);
}
function pl(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
pl.prototype = {
  constructor: pl,
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
function Yx(e) {
  return function() {
    return e;
  };
}
function Kx(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new pl(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function Xx(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = o.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new pl(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (r[s] = a);
}
function Zx(e) {
  return e.__data__;
}
function Jx(e, t) {
  if (!arguments.length) return Array.from(this, Zx);
  var n = t ? Xx : Kx, i = this._parents, r = this._groups;
  typeof e != "function" && (e = Yx(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], d = r[u], f = d.length, h = Qx(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), p = l[u] = new Array(v), g = a[u] = new Array(f);
    n(c, d, m, p, g, h, t);
    for (var w = 0, x = 0, b, k; w < v; ++w)
      if (b = m[w]) {
        for (w >= x && (x = w + 1); !(k = p[x]) && ++x < v; ) ;
        b._next = k || null;
      }
  }
  return l = new Ht(l, i), l._enter = s, l._exit = a, l;
}
function Qx(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function e_() {
  return new Ht(this._exit || this._groups.map(hm), this._parents);
}
function t_(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function n_(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new Ht(s, this._parents);
}
function i_() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function r_(e) {
  e || (e = o_);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new Ht(r, this._parents).order();
}
function o_(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function l_() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function s_() {
  return Array.from(this);
}
function a_() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function u_() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function c_() {
  return !this.node();
}
function f_(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function d_(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function h_(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function v_(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function m_(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function g_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function y_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function p_(e, t) {
  var n = ts(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? h_ : d_ : typeof t == "function" ? n.local ? y_ : g_ : n.local ? m_ : v_)(n, t));
}
function vm(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function b_(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function w_(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function x_(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function __(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? b_ : typeof t == "function" ? x_ : w_)(e, t, n ?? "")) : lr(this.node(), e);
}
function lr(e, t) {
  return e.style.getPropertyValue(t) || vm(e).getComputedStyle(e, null).getPropertyValue(t);
}
function k_(e) {
  return function() {
    delete this[e];
  };
}
function S_(e, t) {
  return function() {
    this[e] = t;
  };
}
function C_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function E_(e, t) {
  return arguments.length > 1 ? this.each((t == null ? k_ : typeof t == "function" ? C_ : S_)(e, t)) : this.node()[e];
}
function mm(e) {
  return e.trim().split(/^|\s+/);
}
function Eu(e) {
  return e.classList || new gm(e);
}
function gm(e) {
  this._node = e, this._names = mm(e.getAttribute("class") || "");
}
gm.prototype = {
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
function ym(e, t) {
  for (var n = Eu(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function pm(e, t) {
  for (var n = Eu(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function V_(e) {
  return function() {
    ym(this, e);
  };
}
function L_(e) {
  return function() {
    pm(this, e);
  };
}
function P_(e, t) {
  return function() {
    (t.apply(this, arguments) ? ym : pm)(this, e);
  };
}
function I_(e, t) {
  var n = mm(e + "");
  if (arguments.length < 2) {
    for (var i = Eu(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? P_ : t ? V_ : L_)(n, t));
}
function T_() {
  this.textContent = "";
}
function M_(e) {
  return function() {
    this.textContent = e;
  };
}
function A_(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function $_(e) {
  return arguments.length ? this.each(e == null ? T_ : (typeof e == "function" ? A_ : M_)(e)) : this.node().textContent;
}
function N_() {
  this.innerHTML = "";
}
function R_(e) {
  return function() {
    this.innerHTML = e;
  };
}
function O_(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function B_(e) {
  return arguments.length ? this.each(e == null ? N_ : (typeof e == "function" ? O_ : R_)(e)) : this.node().innerHTML;
}
function F_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function D_() {
  return this.each(F_);
}
function H_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function j_() {
  return this.each(H_);
}
function z_(e) {
  var t = typeof e == "function" ? e : um(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function G_() {
  return null;
}
function U_(e, t) {
  var n = typeof e == "function" ? e : um(e), i = t == null ? G_ : typeof t == "function" ? t : Cu(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function W_() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function q_() {
  return this.each(W_);
}
function Y_() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function K_() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function X_(e) {
  return this.select(e ? K_ : Y_);
}
function Z_(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function J_(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Q_(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function e2(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function t2(e, t, n) {
  return function() {
    var i = this.__on, r, o = J_(t);
    if (i) {
      for (var l = 0, s = i.length; l < s; ++l)
        if ((r = i[l]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = n), r.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, n), r = { type: e.type, name: e.name, value: t, listener: o, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function n2(e, t, n) {
  var i = Q_(e + ""), r, o = i.length, l;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var a = 0, u = s.length, c; a < u; ++a)
        for (r = 0, c = s[a]; r < o; ++r)
          if ((l = i[r]).type === c.type && l.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = t ? t2 : e2, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function bm(e, t, n) {
  var i = vm(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function i2(e, t) {
  return function() {
    return bm(this, e, t);
  };
}
function r2(e, t) {
  return function() {
    return bm(this, e, t.apply(this, arguments));
  };
}
function o2(e, t) {
  return this.each((typeof t == "function" ? r2 : i2)(e, t));
}
function* l2() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var wm = [null];
function Ht(e, t) {
  this._groups = e, this._parents = t;
}
function ho() {
  return new Ht([[document.documentElement]], wm);
}
function s2() {
  return this;
}
Ht.prototype = ho.prototype = {
  constructor: Ht,
  select: Ax,
  selectAll: Ox,
  selectChild: Hx,
  selectChildren: Ux,
  filter: Wx,
  data: Jx,
  enter: qx,
  exit: e_,
  join: t_,
  merge: n_,
  selection: s2,
  order: i_,
  sort: r_,
  call: l_,
  nodes: s_,
  node: a_,
  size: u_,
  empty: c_,
  each: f_,
  attr: p_,
  style: __,
  property: E_,
  classed: I_,
  text: $_,
  html: B_,
  raise: D_,
  lower: j_,
  append: z_,
  insert: U_,
  remove: q_,
  clone: X_,
  datum: Z_,
  on: n2,
  dispatch: o2,
  [Symbol.iterator]: l2
};
function Ke(e) {
  return typeof e == "string" ? new Ht([[document.querySelector(e)]], [document.documentElement]) : new Ht([[e]], wm);
}
function xm(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Gt(e, t) {
  if (e = xm(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = e.clientX, i.y = e.clientY, i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (t.getBoundingClientRect) {
      var r = t.getBoundingClientRect();
      return [e.clientX - r.left - t.clientLeft, e.clientY - r.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
function a2(e, t) {
  return e.target && (e = xm(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Gt(n, t));
}
const u2 = { passive: !1 }, qr = { capture: !0, passive: !1 };
function Ls(e) {
  e.stopImmediatePropagation();
}
function Ji(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function _m(e) {
  var t = e.document.documentElement, n = Ke(e).on("dragstart.drag", Ji, qr);
  "onselectstart" in t ? n.on("selectstart.drag", Ji, qr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function km(e, t) {
  var n = e.document.documentElement, i = Ke(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Ji, qr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Po = (e) => () => e;
function va(e, {
  sourceEvent: t,
  subject: n,
  target: i,
  identifier: r,
  active: o,
  x: l,
  y: s,
  dx: a,
  dy: u,
  dispatch: c
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    identifier: { value: r, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: l, enumerable: !0, configurable: !0 },
    y: { value: s, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
va.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function c2(e) {
  return !e.ctrlKey && !e.button;
}
function f2() {
  return this.parentNode;
}
function d2(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function h2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function v2() {
  var e = c2, t = f2, n = d2, i = h2, r = {}, o = fo("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", p).on("touchmove.drag", g, u2).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, k) {
    if (!(c || !e.call(this, b, k))) {
      var E = x(this, t.call(this, b, k), b, k, "mouse");
      E && (Ke(b.view).on("mousemove.drag", v, qr).on("mouseup.drag", m, qr), _m(b.view), Ls(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if (Ji(b), !u) {
      var k = b.clientX - s, E = b.clientY - a;
      u = k * k + E * E > d;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    Ke(b.view).on("mousemove.drag mouseup.drag", null), km(b.view, u), Ji(b), r.mouse("end", b);
  }
  function p(b, k) {
    if (e.call(this, b, k)) {
      var E = b.changedTouches, S = t.call(this, b, k), P = E.length, $, R;
      for ($ = 0; $ < P; ++$)
        (R = x(this, S, b, k, E[$].identifier, E[$])) && (Ls(b), R("start", b, E[$]));
    }
  }
  function g(b) {
    var k = b.changedTouches, E = k.length, S, P;
    for (S = 0; S < E; ++S)
      (P = r[k[S].identifier]) && (Ji(b), P("drag", b, k[S]));
  }
  function w(b) {
    var k = b.changedTouches, E = k.length, S, P;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), S = 0; S < E; ++S)
      (P = r[k[S].identifier]) && (Ls(b), P("end", b, k[S]));
  }
  function x(b, k, E, S, P, $) {
    var R = o.copy(), D = Gt($ || E, k), L, I, _;
    if ((_ = n.call(b, new va("beforestart", {
      sourceEvent: E,
      target: f,
      identifier: P,
      active: l,
      x: D[0],
      y: D[1],
      dx: 0,
      dy: 0,
      dispatch: R
    }), S)) != null)
      return L = _.x - D[0] || 0, I = _.y - D[1] || 0, function O(M, j, N) {
        var F = D, B;
        switch (M) {
          case "start":
            r[P] = O, B = l++;
            break;
          case "end":
            delete r[P], --l;
          case "drag":
            D = Gt(N || j, k), B = l;
            break;
        }
        R.call(
          M,
          b,
          new va(M, {
            sourceEvent: j,
            subject: _,
            target: f,
            identifier: P,
            active: B,
            x: D[0] + L,
            y: D[1] + I,
            dx: D[0] - F[0],
            dy: D[1] - F[1],
            dispatch: R
          }),
          S
        );
      };
  }
  return f.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : Po(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : Po(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : Po(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : Po(!!b), f) : i;
  }, f.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function Vu(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Sm(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function vo() {
}
var Yr = 0.7, bl = 1 / Yr, Qi = "\\s*([+-]?\\d+)\\s*", Kr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Sn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", m2 = /^#([0-9a-f]{3,8})$/, g2 = new RegExp(`^rgb\\(${Qi},${Qi},${Qi}\\)$`), y2 = new RegExp(`^rgb\\(${Sn},${Sn},${Sn}\\)$`), p2 = new RegExp(`^rgba\\(${Qi},${Qi},${Qi},${Kr}\\)$`), b2 = new RegExp(`^rgba\\(${Sn},${Sn},${Sn},${Kr}\\)$`), w2 = new RegExp(`^hsl\\(${Kr},${Sn},${Sn}\\)$`), x2 = new RegExp(`^hsla\\(${Kr},${Sn},${Sn},${Kr}\\)$`), $f = {
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
Vu(vo, Li, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Nf,
  // Deprecated! Use color.formatHex.
  formatHex: Nf,
  formatHex8: _2,
  formatHsl: k2,
  formatRgb: Rf,
  toString: Rf
});
function Nf() {
  return this.rgb().formatHex();
}
function _2() {
  return this.rgb().formatHex8();
}
function k2() {
  return Cm(this).formatHsl();
}
function Rf() {
  return this.rgb().formatRgb();
}
function Li(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = m2.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Of(t) : n === 3 ? new Et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Io(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Io(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = g2.exec(e)) ? new Et(t[1], t[2], t[3], 1) : (t = y2.exec(e)) ? new Et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = p2.exec(e)) ? Io(t[1], t[2], t[3], t[4]) : (t = b2.exec(e)) ? Io(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = w2.exec(e)) ? Df(t[1], t[2] / 100, t[3] / 100, 1) : (t = x2.exec(e)) ? Df(t[1], t[2] / 100, t[3] / 100, t[4]) : $f.hasOwnProperty(e) ? Of($f[e]) : e === "transparent" ? new Et(NaN, NaN, NaN, 0) : null;
}
function Of(e) {
  return new Et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Io(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Et(e, t, n, i);
}
function S2(e) {
  return e instanceof vo || (e = Li(e)), e ? (e = e.rgb(), new Et(e.r, e.g, e.b, e.opacity)) : new Et();
}
function ma(e, t, n, i) {
  return arguments.length === 1 ? S2(e) : new Et(e, t, n, i ?? 1);
}
function Et(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Vu(Et, ma, Sm(vo, {
  brighter(e) {
    return e = e == null ? bl : Math.pow(bl, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yr : Math.pow(Yr, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Et(Ci(this.r), Ci(this.g), Ci(this.b), wl(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Bf,
  // Deprecated! Use color.formatHex.
  formatHex: Bf,
  formatHex8: C2,
  formatRgb: Ff,
  toString: Ff
}));
function Bf() {
  return `#${bi(this.r)}${bi(this.g)}${bi(this.b)}`;
}
function C2() {
  return `#${bi(this.r)}${bi(this.g)}${bi(this.b)}${bi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ff() {
  const e = wl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ci(this.r)}, ${Ci(this.g)}, ${Ci(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function wl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ci(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function bi(e) {
  return e = Ci(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Df(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new nn(e, t, n, i);
}
function Cm(e) {
  if (e instanceof nn) return new nn(e.h, e.s, e.l, e.opacity);
  if (e instanceof vo || (e = Li(e)), !e) return new nn();
  if (e instanceof nn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new nn(l, s, a, e.opacity);
}
function E2(e, t, n, i) {
  return arguments.length === 1 ? Cm(e) : new nn(e, t, n, i ?? 1);
}
function nn(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Vu(nn, E2, Sm(vo, {
  brighter(e) {
    return e = e == null ? bl : Math.pow(bl, e), new nn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yr : Math.pow(Yr, e), new nn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new Et(
      Ps(e >= 240 ? e - 240 : e + 120, r, i),
      Ps(e, r, i),
      Ps(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new nn(Hf(this.h), To(this.s), To(this.l), wl(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = wl(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Hf(this.h)}, ${To(this.s) * 100}%, ${To(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Hf(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function To(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ps(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Lu = (e) => () => e;
function V2(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function L2(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function P2(e) {
  return (e = +e) == 1 ? Em : function(t, n) {
    return n - t ? L2(t, n, e) : Lu(isNaN(t) ? n : t);
  };
}
function Em(e, t) {
  var n = t - e;
  return n ? V2(e, n) : Lu(isNaN(e) ? t : e);
}
const xl = function e(t) {
  var n = P2(t);
  function i(r, o) {
    var l = n((r = ma(r)).r, (o = ma(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = Em(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function I2(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, i = t.slice(), r;
  return function(o) {
    for (r = 0; r < n; ++r) i[r] = e[r] * (1 - o) + t[r] * o;
    return i;
  };
}
function T2(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function M2(e, t) {
  var n = t ? t.length : 0, i = e ? Math.min(n, e.length) : 0, r = new Array(i), o = new Array(n), l;
  for (l = 0; l < i; ++l) r[l] = Pu(e[l], t[l]);
  for (; l < n; ++l) o[l] = t[l];
  return function(s) {
    for (l = 0; l < i; ++l) o[l] = r[l](s);
    return o;
  };
}
function A2(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(i) {
    return n.setTime(e * (1 - i) + t * i), n;
  };
}
function xn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function $2(e, t) {
  var n = {}, i = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = Pu(e[r], t[r]) : i[r] = t[r];
  return function(o) {
    for (r in n) i[r] = n[r](o);
    return i;
  };
}
var ga = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Is = new RegExp(ga.source, "g");
function N2(e) {
  return function() {
    return e;
  };
}
function R2(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Vm(e, t) {
  var n = ga.lastIndex = Is.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = ga.exec(e)) && (r = Is.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: xn(i, r) })), n = Is.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? R2(a[0].x) : N2(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c) s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
function Pu(e, t) {
  var n = typeof t, i;
  return t == null || n === "boolean" ? Lu(t) : (n === "number" ? xn : n === "string" ? (i = Li(t)) ? (t = i, xl) : Vm : t instanceof Li ? xl : t instanceof Date ? A2 : T2(t) ? I2 : Array.isArray(t) ? M2 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? $2 : xn)(e, t);
}
var jf = 180 / Math.PI, ya = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Lm(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * jf,
    skewX: Math.atan(a) * jf,
    scaleX: l,
    scaleY: s
  };
}
var Mo;
function O2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ya : Lm(t.a, t.b, t.c, t.d, t.e, t.f);
}
function B2(e) {
  return e == null || (Mo || (Mo = document.createElementNS("http://www.w3.org/2000/svg", "g")), Mo.setAttribute("transform", e), !(e = Mo.transform.baseVal.consolidate())) ? ya : (e = e.matrix, Lm(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Pm(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: xn(u, d) }, { i: m - 2, x: xn(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function l(u, c, d, f) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), f.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: xn(u, c) })) : c && d.push(r(d) + "rotate(" + c + i);
  }
  function s(u, c, d, f) {
    u !== c ? f.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: xn(u, c) }) : c && d.push(r(d) + "skewX(" + c + i);
  }
  function a(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: xn(u, d) }, { i: m - 2, x: xn(c, f) });
    } else (d !== 1 || f !== 1) && h.push(r(h) + "scale(" + d + "," + f + ")");
  }
  return function(u, c) {
    var d = [], f = [];
    return u = e(u), c = e(c), o(u.translateX, u.translateY, c.translateX, c.translateY, d, f), l(u.rotate, c.rotate, d, f), s(u.skewX, c.skewX, d, f), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, d, f), u = c = null, function(h) {
      for (var v = -1, m = f.length, p; ++v < m; ) d[(p = f[v]).i] = p.x(h);
      return d.join("");
    };
  };
}
var F2 = Pm(O2, "px, ", "px)", "deg)"), D2 = Pm(B2, ", ", ")", ")"), H2 = 1e-12;
function zf(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function j2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function z2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const G2 = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, m = h * h + v * v, p, g;
    if (m < H2)
      g = Math.log(f / u) / t, p = function(S) {
        return [
          s + S * h,
          a + S * v,
          u * Math.exp(t * S * g)
        ];
      };
    else {
      var w = Math.sqrt(m), x = (f * f - u * u + i * m) / (2 * u * n * w), b = (f * f - u * u - i * m) / (2 * f * n * w), k = Math.log(Math.sqrt(x * x + 1) - x), E = Math.log(Math.sqrt(b * b + 1) - b);
      g = (E - k) / t, p = function(S) {
        var P = S * g, $ = zf(k), R = u / (n * w) * ($ * z2(t * P + k) - j2(k));
        return [
          s + R * h,
          a + R * v,
          u * $ / zf(t * P + k)
        ];
      };
    }
    return p.duration = g * 1e3 * t / Math.SQRT2, p;
  }
  return r.rho = function(o) {
    var l = Math.max(1e-3, +o), s = l * l, a = s * s;
    return e(l, s, a);
  }, r;
}(Math.SQRT2, 2, 4);
var sr = 0, Sr = 0, br = 0, Im = 1e3, _l, Cr, kl = 0, Pi = 0, ns = 0, Xr = typeof performance == "object" && performance.now ? performance : Date, Tm = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Iu() {
  return Pi || (Tm(U2), Pi = Xr.now() + ns);
}
function U2() {
  Pi = 0;
}
function Sl() {
  this._call = this._time = this._next = null;
}
Sl.prototype = Tu.prototype = {
  constructor: Sl,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Iu() : +n) + (t == null ? 0 : +t), !this._next && Cr !== this && (Cr ? Cr._next = this : _l = this, Cr = this), this._call = e, this._time = n, pa();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, pa());
  }
};
function Tu(e, t, n) {
  var i = new Sl();
  return i.restart(e, t, n), i;
}
function W2() {
  Iu(), ++sr;
  for (var e = _l, t; e; )
    (t = Pi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --sr;
}
function Gf() {
  Pi = (kl = Xr.now()) + ns, sr = Sr = 0;
  try {
    W2();
  } finally {
    sr = 0, Y2(), Pi = 0;
  }
}
function q2() {
  var e = Xr.now(), t = e - kl;
  t > Im && (ns -= t, kl = e);
}
function Y2() {
  for (var e, t = _l, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : _l = n);
  Cr = e, pa(i);
}
function pa(e) {
  if (!sr) {
    Sr && (Sr = clearTimeout(Sr));
    var t = e - Pi;
    t > 24 ? (e < 1 / 0 && (Sr = setTimeout(Gf, e - Xr.now() - ns)), br && (br = clearInterval(br))) : (br || (kl = Xr.now(), br = setInterval(q2, Im)), sr = 1, Tm(Gf));
  }
}
function Uf(e, t, n) {
  var i = new Sl();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var K2 = fo("start", "end", "cancel", "interrupt"), X2 = [], Mm = 0, Wf = 1, ba = 2, Wo = 3, qf = 4, wa = 5, qo = 6;
function is(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  Z2(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: K2,
    tween: X2,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Mm
  });
}
function Mu(e, t) {
  var n = gn(e, t);
  if (n.state > Mm) throw new Error("too late; already scheduled");
  return n;
}
function Ln(e, t) {
  var n = gn(e, t);
  if (n.state > Wo) throw new Error("too late; already running");
  return n;
}
function gn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Z2(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = Tu(o, 0, n.time);
  function o(u) {
    n.state = Wf, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== Wf) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === Wo) return Uf(l);
        h.state === qf ? (h.state = qo, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = qo, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (Uf(function() {
      n.state === Wo && (n.state = qf, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = ba, n.on.call("start", e, e.__data__, n.index, n.group), n.state === ba) {
      for (n.state = Wo, r = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = h);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = wa, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(e, c);
    n.state === wa && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = qo, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function Yo(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > ba && i.state < wa, i.state = qo, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function J2(e) {
  return this.each(function() {
    Yo(this, e);
  });
}
function Q2(e, t) {
  var n, i;
  return function() {
    var r = Ln(this, e), o = r.tween;
    if (o !== n) {
      i = n = o;
      for (var l = 0, s = i.length; l < s; ++l)
        if (i[l].name === t) {
          i = i.slice(), i.splice(l, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function ek(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Ln(this, e), l = o.tween;
    if (l !== i) {
      r = (i = l).slice();
      for (var s = { name: t, value: n }, a = 0, u = r.length; a < u; ++a)
        if (r[a].name === t) {
          r[a] = s;
          break;
        }
      a === u && r.push(s);
    }
    o.tween = r;
  };
}
function tk(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = gn(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? Q2 : ek)(n, e, t));
}
function Au(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = Ln(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return gn(r, i).value[t];
  };
}
function Am(e, t) {
  var n;
  return (typeof t == "number" ? xn : t instanceof Li ? xl : (n = Li(t)) ? (t = n, xl) : Vm)(e, t);
}
function nk(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ik(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function rk(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function ok(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function lk(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function sk(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function ak(e, t) {
  var n = ts(e), i = n === "transform" ? D2 : Am;
  return this.attrTween(e, typeof t == "function" ? (n.local ? sk : lk)(n, i, Au(this, "attr." + e, t)) : t == null ? (n.local ? ik : nk)(n) : (n.local ? ok : rk)(n, i, t));
}
function uk(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function ck(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function fk(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && ck(e, o)), n;
  }
  return r._value = t, r;
}
function dk(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && uk(e, o)), n;
  }
  return r._value = t, r;
}
function hk(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = ts(e);
  return this.tween(n, (i.local ? fk : dk)(i, t));
}
function vk(e, t) {
  return function() {
    Mu(this, e).delay = +t.apply(this, arguments);
  };
}
function mk(e, t) {
  return t = +t, function() {
    Mu(this, e).delay = t;
  };
}
function gk(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vk : mk)(t, e)) : gn(this.node(), t).delay;
}
function yk(e, t) {
  return function() {
    Ln(this, e).duration = +t.apply(this, arguments);
  };
}
function pk(e, t) {
  return t = +t, function() {
    Ln(this, e).duration = t;
  };
}
function bk(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? yk : pk)(t, e)) : gn(this.node(), t).duration;
}
function wk(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ln(this, e).ease = t;
  };
}
function xk(e) {
  var t = this._id;
  return arguments.length ? this.each(wk(t, e)) : gn(this.node(), t).ease;
}
function _k(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ln(this, e).ease = n;
  };
}
function kk(e) {
  if (typeof e != "function") throw new Error();
  return this.each(_k(this._id, e));
}
function Sk(e) {
  typeof e != "function" && (e = fm(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Bn(i, this._parents, this._name, this._id);
}
function Ck(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < i; ++s)
    l[s] = t[s];
  return new Bn(l, this._parents, this._name, this._id);
}
function Ek(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Vk(e, t, n) {
  var i, r, o = Ek(t) ? Mu : Ln;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function Lk(e, t) {
  var n = this._id;
  return arguments.length < 2 ? gn(this.node(), n).on.on(e) : this.each(Vk(n, e, t));
}
function Pk(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Ik() {
  return this.on("end.remove", Pk(this._id));
}
function Tk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Cu(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, is(u[f], t, n, f, u, gn(c, n)));
  return new Bn(o, this._parents, t, n);
}
function Mk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = cm(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = gn(c, n), m = 0, p = f.length; m < p; ++m)
          (h = f[m]) && is(h, t, n, m, f, v);
        o.push(f), l.push(c);
      }
  return new Bn(o, l, t, n);
}
var Ak = ho.prototype.constructor;
function $k() {
  return new Ak(this._groups, this._parents);
}
function Nk(e, t) {
  var n, i, r;
  return function() {
    var o = lr(this, e), l = (this.style.removeProperty(e), lr(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function $m(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Rk(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = lr(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function Ok(e, t, n) {
  var i, r, o;
  return function() {
    var l = lr(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), lr(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function Bk(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = Ln(this, e), u = a.on, c = a.value[o] == null ? s || (s = $m(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function Fk(e, t, n) {
  var i = (e += "") == "transform" ? F2 : Am;
  return t == null ? this.styleTween(e, Nk(e, i)).on("end.style." + e, $m(e)) : typeof t == "function" ? this.styleTween(e, Ok(e, i, Au(this, "style." + e, t))).each(Bk(this._id, e)) : this.styleTween(e, Rk(e, i, t), n).on("end.style." + e, null);
}
function Dk(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Hk(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && Dk(e, l, n)), i;
  }
  return o._value = t, o;
}
function jk(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Hk(e, t, n ?? ""));
}
function zk(e) {
  return function() {
    this.textContent = e;
  };
}
function Gk(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Uk(e) {
  return this.tween("text", typeof e == "function" ? Gk(Au(this, "text", e)) : zk(e == null ? "" : e + ""));
}
function Wk(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function qk(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && Wk(r)), t;
  }
  return i._value = e, i;
}
function Yk(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, qk(e));
}
function Kk() {
  for (var e = this._name, t = this._id, n = Nm(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = gn(a, t);
        is(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Bn(i, this._parents, e, n);
}
function Xk() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = Ln(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var Zk = 0;
function Bn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function Nm() {
  return ++Zk;
}
var Pn = ho.prototype;
Bn.prototype = {
  constructor: Bn,
  select: Tk,
  selectAll: Mk,
  selectChild: Pn.selectChild,
  selectChildren: Pn.selectChildren,
  filter: Sk,
  merge: Ck,
  selection: $k,
  transition: Kk,
  call: Pn.call,
  nodes: Pn.nodes,
  node: Pn.node,
  size: Pn.size,
  empty: Pn.empty,
  each: Pn.each,
  on: Lk,
  attr: ak,
  attrTween: hk,
  style: Fk,
  styleTween: jk,
  text: Uk,
  textTween: Yk,
  remove: Ik,
  tween: tk,
  delay: gk,
  duration: bk,
  ease: xk,
  easeVarying: kk,
  end: Xk,
  [Symbol.iterator]: Pn[Symbol.iterator]
};
const Jk = (e) => +e;
function Qk(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var eS = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Qk
};
function tS(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function nS(e) {
  var t, n;
  e instanceof Bn ? (t = e._id, e = e._name) : (t = Nm(), (n = eS).time = Iu(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && is(a, e, t, u, l, n || tS(a, t));
  return new Bn(i, this._parents, e, t);
}
ho.prototype.interrupt = J2;
ho.prototype.transition = nS;
const xa = Math.PI, _a = 2 * xa, hi = 1e-6, iS = _a - hi;
function Rm(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function rS(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Rm;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class oS {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Rm : rS(t);
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
  quadraticCurveTo(t, n, i, r) {
    this._append`Q${+t},${+n},${this._x1 = +i},${this._y1 = +r}`;
  }
  bezierCurveTo(t, n, i, r, o, l) {
    this._append`C${+t},${+n},${+i},${+r},${this._x1 = +o},${this._y1 = +l}`;
  }
  arcTo(t, n, i, r, o) {
    if (t = +t, n = +n, i = +i, r = +r, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let l = this._x1, s = this._y1, a = i - t, u = r - n, c = l - t, d = s - n, f = c * c + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (f > hi) if (!(Math.abs(d * a - u * c) > hi) || !o)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = i - l, v = r - s, m = a * a + u * u, p = h * h + v * v, g = Math.sqrt(m), w = Math.sqrt(f), x = o * Math.tan((xa - Math.acos((m + f - p) / (2 * g * w))) / 2), b = x / w, k = x / g;
      Math.abs(b - 1) > hi && this._append`L${t + b * c},${n + b * d}`, this._append`A${o},${o},0,0,${+(d * h > c * v)},${this._x1 = t + k * a},${this._y1 = n + k * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, d = 1 ^ l, f = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > hi || Math.abs(this._y1 - c) > hi) && this._append`L${u},${c}`, i && (f < 0 && (f = f % _a + _a), f > iS ? this._append`A${i},${i},0,1,${d},${t - s},${n - a}A${i},${i},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > hi && this._append`A${i},${i},0,${+(f >= xa)},${d},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function lS(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Om(this.cover(t, n), t, n, e);
}
function Om(e, t, n, i) {
  if (isNaN(t) || isNaN(n)) return e;
  var r, o = e._root, l = { data: i }, s = e._x0, a = e._y0, u = e._x1, c = e._y1, d, f, h, v, m, p, g, w;
  if (!o) return e._root = l, e;
  for (; o.length; )
    if ((m = t >= (d = (s + u) / 2)) ? s = d : u = d, (p = n >= (f = (a + c) / 2)) ? a = f : c = f, r = o, !(o = o[g = p << 1 | m])) return r[g] = l, e;
  if (h = +e._x.call(null, o.data), v = +e._y.call(null, o.data), t === h && n === v) return l.next = o, r ? r[g] = l : e._root = l, e;
  do
    r = r ? r[g] = new Array(4) : e._root = new Array(4), (m = t >= (d = (s + u) / 2)) ? s = d : u = d, (p = n >= (f = (a + c) / 2)) ? a = f : c = f;
  while ((g = p << 1 | m) === (w = (v >= f) << 1 | h >= d));
  return r[w] = o, r[g] = l, e;
}
function sS(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > d && (d = o));
  if (a > c || u > d) return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < i; ++n)
    Om(this, l[n], s[n], e[n]);
  return this;
}
function aS(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, i = this._y0, r = this._x1, o = this._y1;
  if (isNaN(n))
    r = (n = Math.floor(e)) + 1, o = (i = Math.floor(t)) + 1;
  else {
    for (var l = r - n || 1, s = this._root, a, u; n > e || e >= r || i > t || t >= o; )
      switch (u = (t < i) << 1 | e < n, a = new Array(4), a[u] = s, s = a, l *= 2, u) {
        case 0:
          r = n + l, o = i + l;
          break;
        case 1:
          n = r - l, o = i + l;
          break;
        case 2:
          r = n + l, i = o - l;
          break;
        case 3:
          n = r - l, i = o - l;
          break;
      }
    this._root && this._root.length && (this._root = s);
  }
  return this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this;
}
function uS() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function cS(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function vt(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function fS(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, d = this._y1, f = [], h = this._root, v, m;
  for (h && f.push(new vt(h, r, o, c, d)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, d = t + n, n *= n); v = f.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > d || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var p = (l + a) / 2, g = (s + u) / 2;
        f.push(
          new vt(h[3], p, g, a, u),
          new vt(h[2], l, g, p, u),
          new vt(h[1], p, s, a, g),
          new vt(h[0], l, s, p, g)
        ), (m = (t >= g) << 1 | e >= p) && (v = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - m], f[f.length - 1 - m] = v);
      } else {
        var w = e - +this._x.call(null, h.data), x = t - +this._y.call(null, h.data), b = w * w + x * x;
        if (b < n) {
          var k = Math.sqrt(n = b);
          r = e - k, o = t - k, c = e + k, d = t + k, i = h.data;
        }
      }
  return i;
}
function dS(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(d = +this._y.call(null, e))) return this;
  var t, n = this._root, i, r, o, l = this._x0, s = this._y0, a = this._x1, u = this._y1, c, d, f, h, v, m, p, g;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((v = c >= (f = (l + a) / 2)) ? l = f : a = f, (m = d >= (h = (s + u) / 2)) ? s = h : u = h, t = n, !(n = n[p = m << 1 | v])) return this;
    if (!n.length) break;
    (t[p + 1 & 3] || t[p + 2 & 3] || t[p + 3 & 3]) && (i = t, g = p);
  }
  for (; n.data !== e; ) if (r = n, !(n = n.next)) return this;
  return (o = n.next) && delete n.next, r ? (o ? r.next = o : delete r.next, this) : t ? (o ? t[p] = o : delete t[p], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (i ? i[g] = n : this._root = n), this) : (this._root = o, this);
}
function hS(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function vS() {
  return this._root;
}
function mS() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function gS(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new vt(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new vt(r, u, c, s, a)), (r = i[2]) && t.push(new vt(r, o, c, u, a)), (r = i[1]) && t.push(new vt(r, u, l, s, c)), (r = i[0]) && t.push(new vt(r, o, l, u, c));
    }
  return this;
}
function yS(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new vt(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, d = (s + u) / 2;
      (o = r[0]) && t.push(new vt(o, l, s, c, d)), (o = r[1]) && t.push(new vt(o, c, s, a, d)), (o = r[2]) && t.push(new vt(o, l, d, c, u)), (o = r[3]) && t.push(new vt(o, c, d, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function pS(e) {
  return e[0];
}
function bS(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function wS(e) {
  return e[1];
}
function xS(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function $u(e, t, n) {
  var i = new Nu(t ?? pS, n ?? wS, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Nu(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function Yf(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var wt = $u.prototype = Nu.prototype;
wt.copy = function() {
  var e = new Nu(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = Yf(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = Yf(i));
  return e;
};
wt.add = lS;
wt.addAll = sS;
wt.cover = aS;
wt.data = uS;
wt.extent = cS;
wt.find = fS;
wt.remove = dS;
wt.removeAll = hS;
wt.root = vS;
wt.size = mS;
wt.visit = gS;
wt.visitAfter = yS;
wt.x = bS;
wt.y = xS;
function gt(e) {
  return function() {
    return e;
  };
}
function Qn(e) {
  return (e() - 0.5) * 1e-6;
}
function _S(e) {
  return e.x + e.vx;
}
function kS(e) {
  return e.y + e.vy;
}
function SS(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = gt(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, m, p, g = 0; g < o; ++g)
      for (d = $u(t, _S, kS).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], m = n[f.index], p = m * m, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(x, b, k, E, S) {
      var P = x.data, $ = x.r, R = m + $;
      if (P) {
        if (P.index > f.index) {
          var D = h - P.x - P.vx, L = v - P.y - P.vy, I = D * D + L * L;
          I < R * R && (D === 0 && (D = Qn(i), I += D * D), L === 0 && (L = Qn(i), I += L * L), I = (R - (I = Math.sqrt(I))) / I * r, f.vx += (D *= I) * (R = ($ *= $) / (p + $)), f.vy += (L *= I) * R, P.vx -= D * (R = 1 - R), P.vy -= L * R);
        }
        return;
      }
      return b > h + R || E < h - R || k > v + R || S < v - R;
    }
  }
  function s(u) {
    if (u.data) return u.r = n[u.data.index];
    for (var c = u.r = 0; c < 4; ++c)
      u[c] && u[c].r > u.r && (u.r = u[c].r);
  }
  function a() {
    if (t) {
      var u, c = t.length, d;
      for (n = new Array(c), u = 0; u < c; ++u) d = t[u], n[d.index] = +e(d, u, t);
    }
  }
  return l.initialize = function(u, c) {
    t = u, i = c, a();
  }, l.iterations = function(u) {
    return arguments.length ? (o = +u, l) : o;
  }, l.strength = function(u) {
    return arguments.length ? (r = +u, l) : r;
  }, l.radius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : gt(+u), a(), l) : e;
  }, l;
}
function CS(e) {
  return e.index;
}
function Kf(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function ES(e) {
  var t = CS, n = d, i, r = gt(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function f(p) {
    for (var g = 0, w = e.length; g < c; ++g)
      for (var x = 0, b, k, E, S, P, $, R; x < w; ++x)
        b = e[x], k = b.source, E = b.target, S = E.x + E.vx - k.x - k.vx || Qn(u), P = E.y + E.vy - k.y - k.vy || Qn(u), $ = Math.sqrt(S * S + P * P), $ = ($ - o[x]) / $ * p * i[x], S *= $, P *= $, E.vx -= S * (R = a[x]), E.vy -= P * R, k.vx += S * (R = 1 - R), k.vy += P * R;
  }
  function h() {
    if (l) {
      var p, g = l.length, w = e.length, x = new Map(l.map((k, E) => [t(k, E, l), k])), b;
      for (p = 0, s = new Array(g); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = Kf(x, b.source)), typeof b.target != "object" && (b.target = Kf(x, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
      for (p = 0, a = new Array(w); p < w; ++p)
        b = e[p], a[p] = s[b.source.index] / (s[b.source.index] + s[b.target.index]);
      i = new Array(w), v(), o = new Array(w), m();
    }
  }
  function v() {
    if (l)
      for (var p = 0, g = e.length; p < g; ++p)
        i[p] = +n(e[p], p, e);
  }
  function m() {
    if (l)
      for (var p = 0, g = e.length; p < g; ++p)
        o[p] = +r(e[p], p, e);
  }
  return f.initialize = function(p, g) {
    l = p, u = g, h();
  }, f.links = function(p) {
    return arguments.length ? (e = p, h(), f) : e;
  }, f.id = function(p) {
    return arguments.length ? (t = p, f) : t;
  }, f.iterations = function(p) {
    return arguments.length ? (c = +p, f) : c;
  }, f.strength = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : gt(+p), v(), f) : n;
  }, f.distance = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : gt(+p), m(), f) : r;
  }, f;
}
const VS = 1664525, LS = 1013904223, Xf = 4294967296;
function PS() {
  let e = 1;
  return () => (e = (VS * e + LS) % Xf) / Xf;
}
function IS(e) {
  return e.x;
}
function TS(e) {
  return e.y;
}
var MS = 10, AS = Math.PI * (3 - Math.sqrt(5));
function $S(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Tu(d), u = fo("tick", "end"), c = PS();
  e == null && (e = []);
  function d() {
    f(), u.call("tick", t), n < i && (a.stop(), u.call("end", t));
  }
  function f(m) {
    var p, g = e.length, w;
    m === void 0 && (m = 1);
    for (var x = 0; x < m; ++x)
      for (n += (o - n) * r, s.forEach(function(b) {
        b(n);
      }), p = 0; p < g; ++p)
        w = e[p], w.fx == null ? w.x += w.vx *= l : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= l : (w.y = w.fy, w.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, p = e.length, g; m < p; ++m) {
      if (g = e[m], g.index = m, g.fx != null && (g.x = g.fx), g.fy != null && (g.y = g.fy), isNaN(g.x) || isNaN(g.y)) {
        var w = MS * Math.sqrt(0.5 + m), x = m * AS;
        g.x = w * Math.cos(x), g.y = w * Math.sin(x);
      }
      (isNaN(g.vx) || isNaN(g.vy)) && (g.vx = g.vy = 0);
    }
  }
  function v(m) {
    return m.initialize && m.initialize(e, c), m;
  }
  return h(), t = {
    tick: f,
    restart: function() {
      return a.restart(d), t;
    },
    stop: function() {
      return a.stop(), t;
    },
    nodes: function(m) {
      return arguments.length ? (e = m, h(), s.forEach(v), t) : e;
    },
    alpha: function(m) {
      return arguments.length ? (n = +m, t) : n;
    },
    alphaMin: function(m) {
      return arguments.length ? (i = +m, t) : i;
    },
    alphaDecay: function(m) {
      return arguments.length ? (r = +m, t) : +r;
    },
    alphaTarget: function(m) {
      return arguments.length ? (o = +m, t) : o;
    },
    velocityDecay: function(m) {
      return arguments.length ? (l = 1 - m, t) : 1 - l;
    },
    randomSource: function(m) {
      return arguments.length ? (c = m, s.forEach(v), t) : c;
    },
    force: function(m, p) {
      return arguments.length > 1 ? (p == null ? s.delete(m) : s.set(m, v(p)), t) : s.get(m);
    },
    find: function(m, p, g) {
      var w = 0, x = e.length, b, k, E, S, P;
      for (g == null ? g = 1 / 0 : g *= g, w = 0; w < x; ++w)
        S = e[w], b = m - S.x, k = p - S.y, E = b * b + k * k, E < g && (P = S, g = E);
      return P;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function NS() {
  var e, t, n, i, r = gt(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, p = $u(e, IS, TS).visitAfter(d);
    for (i = h, v = 0; v < m; ++v) t = e[v], p.visit(f);
  }
  function c() {
    if (e) {
      var h, v = e.length, m;
      for (o = new Array(v), h = 0; h < v; ++h) m = e[h], o[m.index] = +r(m, h, e);
    }
  }
  function d(h) {
    var v = 0, m, p, g = 0, w, x, b;
    if (h.length) {
      for (w = x = b = 0; b < 4; ++b)
        (m = h[b]) && (p = Math.abs(m.value)) && (v += m.value, g += p, w += p * m.x, x += p * m.y);
      h.x = w / g, h.y = x / g;
    } else {
      m = h, m.x = m.data.x, m.y = m.data.y;
      do
        v += o[m.data.index];
      while (m = m.next);
    }
    h.value = v;
  }
  function f(h, v, m, p) {
    if (!h.value) return !0;
    var g = h.x - t.x, w = h.y - t.y, x = p - v, b = g * g + w * w;
    if (x * x / a < b)
      return b < s && (g === 0 && (g = Qn(n), b += g * g), w === 0 && (w = Qn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += g * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (g === 0 && (g = Qn(n), b += g * g), w === 0 && (w = Qn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (x = o[h.data.index] * i / b, t.vx += g * x, t.vy += w * x);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : gt(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function RS(e) {
  var t = gt(0.1), n, i, r;
  typeof e != "function" && (e = gt(e == null ? 0 : +e));
  function o(s) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vx += (r[a] - c.x) * i[a] * s;
  }
  function l() {
    if (n) {
      var s, a = n.length;
      for (i = new Array(a), r = new Array(a), s = 0; s < a; ++s)
        i[s] = isNaN(r[s] = +e(n[s], s, n)) ? 0 : +t(n[s], s, n);
    }
  }
  return o.initialize = function(s) {
    n = s, l();
  }, o.strength = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : gt(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : gt(+s), l(), o) : e;
  }, o;
}
function OS(e) {
  var t = gt(0.1), n, i, r;
  typeof e != "function" && (e = gt(e == null ? 0 : +e));
  function o(s) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vy += (r[a] - c.y) * i[a] * s;
  }
  function l() {
    if (n) {
      var s, a = n.length;
      for (i = new Array(a), r = new Array(a), s = 0; s < a; ++s)
        i[s] = isNaN(r[s] = +e(n[s], s, n)) ? 0 : +t(n[s], s, n);
    }
  }
  return o.initialize = function(s) {
    n = s, l();
  }, o.strength = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : gt(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : gt(+s), l(), o) : e;
  }, o;
}
function Ct(e) {
  return function() {
    return e;
  };
}
const Zf = Math.abs, st = Math.atan2, di = Math.cos, BS = Math.max, Ts = Math.min, bn = Math.sin, Wi = Math.sqrt, _t = 1e-12, Zr = Math.PI, Cl = Zr / 2, FS = 2 * Zr;
function DS(e) {
  return e > 1 ? 0 : e < -1 ? Zr : Math.acos(e);
}
function Jf(e) {
  return e >= 1 ? Cl : e <= -1 ? -Cl : Math.asin(e);
}
function Bm(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = i;
    }
    return e;
  }, () => new oS(t);
}
function HS(e) {
  return e.innerRadius;
}
function jS(e) {
  return e.outerRadius;
}
function zS(e) {
  return e.startAngle;
}
function GS(e) {
  return e.endAngle;
}
function US(e) {
  return e && e.padAngle;
}
function WS(e, t, n, i, r, o, l, s) {
  var a = n - e, u = i - t, c = l - r, d = s - o, f = d * a - c * u;
  if (!(f * f < _t))
    return f = (c * (t - o) - d * (e - r)) / f, [e + f * a, t + f * u];
}
function Ao(e, t, n, i, r, o, l) {
  var s = e - n, a = t - i, u = (l ? o : -o) / Wi(s * s + a * a), c = u * a, d = -u * s, f = e + c, h = t + d, v = n + c, m = i + d, p = (f + v) / 2, g = (h + m) / 2, w = v - f, x = m - h, b = w * w + x * x, k = r - o, E = f * m - v * h, S = (x < 0 ? -1 : 1) * Wi(BS(0, k * k * b - E * E)), P = (E * x - w * S) / b, $ = (-E * w - x * S) / b, R = (E * x + w * S) / b, D = (-E * w + x * S) / b, L = P - p, I = $ - g, _ = R - p, O = D - g;
  return L * L + I * I > _ * _ + O * O && (P = R, $ = D), {
    cx: P,
    cy: $,
    x01: -c,
    y01: -d,
    x11: P * (r / k - 1),
    y11: $ * (r / k - 1)
  };
}
function qS() {
  var e = HS, t = jS, n = Ct(0), i = null, r = zS, o = GS, l = US, s = null, a = Bm(u);
  function u() {
    var c, d, f = +e.apply(this, arguments), h = +t.apply(this, arguments), v = r.apply(this, arguments) - Cl, m = o.apply(this, arguments) - Cl, p = Zf(m - v), g = m > v;
    if (s || (s = c = a()), h < f && (d = h, h = f, f = d), !(h > _t)) s.moveTo(0, 0);
    else if (p > FS - _t)
      s.moveTo(h * di(v), h * bn(v)), s.arc(0, 0, h, v, m, !g), f > _t && (s.moveTo(f * di(m), f * bn(m)), s.arc(0, 0, f, m, v, g));
    else {
      var w = v, x = m, b = v, k = m, E = p, S = p, P = l.apply(this, arguments) / 2, $ = P > _t && (i ? +i.apply(this, arguments) : Wi(f * f + h * h)), R = Ts(Zf(h - f) / 2, +n.apply(this, arguments)), D = R, L = R, I, _;
      if ($ > _t) {
        var O = Jf($ / f * bn(P)), M = Jf($ / h * bn(P));
        (E -= O * 2) > _t ? (O *= g ? 1 : -1, b += O, k -= O) : (E = 0, b = k = (v + m) / 2), (S -= M * 2) > _t ? (M *= g ? 1 : -1, w += M, x -= M) : (S = 0, w = x = (v + m) / 2);
      }
      var j = h * di(w), N = h * bn(w), F = f * di(k), B = f * bn(k);
      if (R > _t) {
        var H = h * di(x), Y = h * bn(x), Q = f * di(b), se = f * bn(b), fe;
        if (p < Zr)
          if (fe = WS(j, N, Q, se, H, Y, F, B)) {
            var J = j - fe[0], le = N - fe[1], Ee = H - fe[0], De = Y - fe[1], Ue = 1 / bn(DS((J * Ee + le * De) / (Wi(J * J + le * le) * Wi(Ee * Ee + De * De))) / 2), xt = Wi(fe[0] * fe[0] + fe[1] * fe[1]);
            D = Ts(R, (f - xt) / (Ue - 1)), L = Ts(R, (h - xt) / (Ue + 1));
          } else
            D = L = 0;
      }
      S > _t ? L > _t ? (I = Ao(Q, se, j, N, h, L, g), _ = Ao(H, Y, F, B, h, L, g), s.moveTo(I.cx + I.x01, I.cy + I.y01), L < R ? s.arc(I.cx, I.cy, L, st(I.y01, I.x01), st(_.y01, _.x01), !g) : (s.arc(I.cx, I.cy, L, st(I.y01, I.x01), st(I.y11, I.x11), !g), s.arc(0, 0, h, st(I.cy + I.y11, I.cx + I.x11), st(_.cy + _.y11, _.cx + _.x11), !g), s.arc(_.cx, _.cy, L, st(_.y11, _.x11), st(_.y01, _.x01), !g))) : (s.moveTo(j, N), s.arc(0, 0, h, w, x, !g)) : s.moveTo(j, N), !(f > _t) || !(E > _t) ? s.lineTo(F, B) : D > _t ? (I = Ao(F, B, H, Y, f, -D, g), _ = Ao(j, N, Q, se, f, -D, g), s.lineTo(I.cx + I.x01, I.cy + I.y01), D < R ? s.arc(I.cx, I.cy, D, st(I.y01, I.x01), st(_.y01, _.x01), !g) : (s.arc(I.cx, I.cy, D, st(I.y01, I.x01), st(I.y11, I.x11), !g), s.arc(0, 0, f, st(I.cy + I.y11, I.cx + I.x11), st(_.cy + _.y11, _.cx + _.x11), g), s.arc(_.cx, _.cy, D, st(_.y11, _.x11), st(_.y01, _.x01), !g))) : s.arc(0, 0, f, k, b, g);
    }
    if (s.closePath(), c) return s = null, c + "" || null;
  }
  return u.centroid = function() {
    var c = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, d = (+r.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Zr / 2;
    return [di(d) * c, bn(d) * c];
  }, u.innerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ct(+c), u) : e;
  }, u.outerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ct(+c), u) : t;
  }, u.cornerRadius = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : Ct(+c), u) : n;
  }, u.padRadius = function(c) {
    return arguments.length ? (i = c == null ? null : typeof c == "function" ? c : Ct(+c), u) : i;
  }, u.startAngle = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Ct(+c), u) : r;
  }, u.endAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : Ct(+c), u) : o;
  }, u.padAngle = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : Ct(+c), u) : l;
  }, u.context = function(c) {
    return arguments.length ? (s = c ?? null, u) : s;
  }, u;
}
function YS(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Fm(e) {
  this._context = e;
}
Fm.prototype = {
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
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function KS(e) {
  return new Fm(e);
}
function XS(e) {
  return e[0];
}
function ZS(e) {
  return e[1];
}
function JS(e, t) {
  var n = Ct(!0), i = null, r = KS, o = null, l = Bm(s);
  e = typeof e == "function" ? e : e === void 0 ? XS : Ct(e), t = typeof t == "function" ? t : t === void 0 ? ZS : Ct(t);
  function s(a) {
    var u, c = (a = YS(a)).length, d, f = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(d = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+e(d, u, a), +t(d, u, a));
    if (h) return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Ct(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Ct(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Ct(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const $o = (e) => () => e;
function QS(e, {
  sourceEvent: t,
  target: n,
  transform: i,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function An(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
An.prototype = {
  constructor: An,
  scale: function(e) {
    return e === 1 ? this : new An(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new An(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Dm = new An(1, 0, 0);
An.prototype;
function Ms(e) {
  e.stopImmediatePropagation();
}
function wr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function eC(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function tC() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Qf() {
  return this.__zoom || Dm;
}
function nC(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function iC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function rC(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function oC() {
  var e = eC, t = tC, n = rC, i = nC, r = iC, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = G2, u = fo("start", "zoom", "end"), c, d, f, h = 500, v = 150, m = 0, p = 10;
  function g(_) {
    _.property("__zoom", Qf).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", D).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", I).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(_, O, M, j) {
    var N = _.selection ? _.selection() : _;
    N.property("__zoom", Qf), _ !== N ? k(_, O, M, j) : N.interrupt().each(function() {
      E(this, arguments).event(j).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, g.scaleBy = function(_, O, M, j) {
    g.scaleTo(_, function() {
      var N = this.__zoom.k, F = typeof O == "function" ? O.apply(this, arguments) : O;
      return N * F;
    }, M, j);
  }, g.scaleTo = function(_, O, M, j) {
    g.transform(_, function() {
      var N = t.apply(this, arguments), F = this.__zoom, B = M == null ? b(N) : typeof M == "function" ? M.apply(this, arguments) : M, H = F.invert(B), Y = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(x(w(F, Y), B, H), N, l);
    }, M, j);
  }, g.translateBy = function(_, O, M, j) {
    g.transform(_, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), l);
    }, null, j);
  }, g.translateTo = function(_, O, M, j, N) {
    g.transform(_, function() {
      var F = t.apply(this, arguments), B = this.__zoom, H = j == null ? b(F) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(Dm.translate(H[0], H[1]).scale(B.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), F, l);
    }, j, N);
  };
  function w(_, O) {
    return O = Math.max(o[0], Math.min(o[1], O)), O === _.k ? _ : new An(O, _.x, _.y);
  }
  function x(_, O, M) {
    var j = O[0] - M[0] * _.k, N = O[1] - M[1] * _.k;
    return j === _.x && N === _.y ? _ : new An(_.k, j, N);
  }
  function b(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function k(_, O, M, j) {
    _.on("start.zoom", function() {
      E(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var N = this, F = arguments, B = E(N, F).event(j), H = t.apply(N, F), Y = M == null ? b(H) : typeof M == "function" ? M.apply(N, F) : M, Q = Math.max(H[1][0] - H[0][0], H[1][1] - H[0][1]), se = N.__zoom, fe = typeof O == "function" ? O.apply(N, F) : O, J = a(se.invert(Y).concat(Q / se.k), fe.invert(Y).concat(Q / fe.k));
      return function(le) {
        if (le === 1) le = fe;
        else {
          var Ee = J(le), De = Q / Ee[2];
          le = new An(De, Y[0] - Ee[0] * De, Y[1] - Ee[1] * De);
        }
        B.zoom(null, le);
      };
    });
  }
  function E(_, O, M) {
    return !M && _.__zooming || new S(_, O);
  }
  function S(_, O) {
    this.that = _, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(_, O), this.taps = 0;
  }
  S.prototype = {
    event: function(_) {
      return _ && (this.sourceEvent = _), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(_, O) {
      return this.mouse && _ !== "mouse" && (this.mouse[1] = O.invert(this.mouse[0])), this.touch0 && _ !== "touch" && (this.touch0[1] = O.invert(this.touch0[0])), this.touch1 && _ !== "touch" && (this.touch1[1] = O.invert(this.touch1[0])), this.that.__zoom = O, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(_) {
      var O = Ke(this.that).datum();
      u.call(
        _,
        this.that,
        new QS(_, {
          sourceEvent: this.sourceEvent,
          target: g,
          type: _,
          transform: this.that.__zoom,
          dispatch: u
        }),
        O
      );
    }
  };
  function P(_, ...O) {
    if (!e.apply(this, arguments)) return;
    var M = E(this, O).event(_), j = this.__zoom, N = Math.max(o[0], Math.min(o[1], j.k * Math.pow(2, i.apply(this, arguments)))), F = Gt(_);
    if (M.wheel)
      (M.mouse[0][0] !== F[0] || M.mouse[0][1] !== F[1]) && (M.mouse[1] = j.invert(M.mouse[0] = F)), clearTimeout(M.wheel);
    else {
      if (j.k === N) return;
      M.mouse = [F, j.invert(F)], Yo(this), M.start();
    }
    wr(_), M.wheel = setTimeout(B, v), M.zoom("mouse", n(x(w(j, N), M.mouse[0], M.mouse[1]), M.extent, l));
    function B() {
      M.wheel = null, M.end();
    }
  }
  function $(_, ...O) {
    if (f || !e.apply(this, arguments)) return;
    var M = _.currentTarget, j = E(this, O, !0).event(_), N = Ke(_.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", Q, !0), F = Gt(_, M), B = _.clientX, H = _.clientY;
    _m(_.view), Ms(_), j.mouse = [F, this.__zoom.invert(F)], Yo(this), j.start();
    function Y(se) {
      if (wr(se), !j.moved) {
        var fe = se.clientX - B, J = se.clientY - H;
        j.moved = fe * fe + J * J > m;
      }
      j.event(se).zoom("mouse", n(x(j.that.__zoom, j.mouse[0] = Gt(se, M), j.mouse[1]), j.extent, l));
    }
    function Q(se) {
      N.on("mousemove.zoom mouseup.zoom", null), km(se.view, j.moved), wr(se), j.event(se).end();
    }
  }
  function R(_, ...O) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, j = Gt(_.changedTouches ? _.changedTouches[0] : _, this), N = M.invert(j), F = M.k * (_.shiftKey ? 0.5 : 2), B = n(x(w(M, F), j, N), t.apply(this, O), l);
      wr(_), s > 0 ? Ke(this).transition().duration(s).call(k, B, j, _) : Ke(this).call(g.transform, B, j, _);
    }
  }
  function D(_, ...O) {
    if (e.apply(this, arguments)) {
      var M = _.touches, j = M.length, N = E(this, O, _.changedTouches.length === j).event(_), F, B, H, Y;
      for (Ms(_), B = 0; B < j; ++B)
        H = M[B], Y = Gt(H, this), Y = [Y, this.__zoom.invert(Y), H.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== Y[2] && (N.touch1 = Y, N.taps = 0) : (N.touch0 = Y, F = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (N.taps < 2 && (d = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), Yo(this), N.start());
    }
  }
  function L(_, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(_), j = _.changedTouches, N = j.length, F, B, H, Y;
      for (wr(_), F = 0; F < N; ++F)
        B = j[F], H = Gt(B, this), M.touch0 && M.touch0[2] === B.identifier ? M.touch0[0] = H : M.touch1 && M.touch1[2] === B.identifier && (M.touch1[0] = H);
      if (B = M.that.__zoom, M.touch1) {
        var Q = M.touch0[0], se = M.touch0[1], fe = M.touch1[0], J = M.touch1[1], le = (le = fe[0] - Q[0]) * le + (le = fe[1] - Q[1]) * le, Ee = (Ee = J[0] - se[0]) * Ee + (Ee = J[1] - se[1]) * Ee;
        B = w(B, Math.sqrt(le / Ee)), H = [(Q[0] + fe[0]) / 2, (Q[1] + fe[1]) / 2], Y = [(se[0] + J[0]) / 2, (se[1] + J[1]) / 2];
      } else if (M.touch0) H = M.touch0[0], Y = M.touch0[1];
      else return;
      M.zoom("touch", n(x(B, H, Y), M.extent, l));
    }
  }
  function I(_, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(_), j = _.changedTouches, N = j.length, F, B;
      for (Ms(_), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < N; ++F)
        B = j[F], M.touch0 && M.touch0[2] === B.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === B.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (B = Gt(B, this), Math.hypot(d[0] - B[0], d[1] - B[1]) < p)) {
        var H = Ke(this).on("dblclick.zoom");
        H && H.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : $o(+_), g) : i;
  }, g.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : $o(!!_), g) : e;
  }, g.touchable = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : $o(!!_), g) : r;
  }, g.extent = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : $o([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), g) : t;
  }, g.scaleExtent = function(_) {
    return arguments.length ? (o[0] = +_[0], o[1] = +_[1], g) : [o[0], o[1]];
  }, g.translateExtent = function(_) {
    return arguments.length ? (l[0][0] = +_[0][0], l[1][0] = +_[1][0], l[0][1] = +_[0][1], l[1][1] = +_[1][1], g) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, g.constrain = function(_) {
    return arguments.length ? (n = _, g) : n;
  }, g.duration = function(_) {
    return arguments.length ? (s = +_, g) : s;
  }, g.interpolate = function(_) {
    return arguments.length ? (a = _, g) : a;
  }, g.on = function() {
    var _ = u.on.apply(u, arguments);
    return _ === u ? g : _;
  }, g.clickDistance = function(_) {
    return arguments.length ? (m = (_ = +_) * _, g) : Math.sqrt(m);
  }, g.tapDistance = function(_) {
    return arguments.length ? (p = +_, g) : p;
  }, g;
}
function lC(e, t) {
  let n = oC().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return sC(n, e, t);
}
function sC(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
class Hm {
  // eslint-disable-next-line no-useless-constructor
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x
   * @param y
   * @param fx
   * @param fy
   * @param label
   * @param color - The color of the node which was set (for default color this is empty)
   */
  constructor(t, n, i, r, o, l, s, a) {
    this.id = t, this.idImported = n, this.x = i, this.y = r, this.fx = o, this.fy = l, this.label = s, this.color = a;
  }
}
function aC(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function uC(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function cC(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function fC(e, t, n) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function As(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function xr(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function dC(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
function Nt(e) {
  e.preventDefault(), e.stopPropagation();
}
function hC(e, t, n, i) {
  return v2().filter((r) => r.button === 0).on("start", (r, o) => {
    Nt(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function vC(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => Nt(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
var $t = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))($t || {});
class mC {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source
   * @param target
   * @param pathType
   * @param label
   * @param color The color of the node which was set (for default color this is empty)
   */
  constructor(t, n, i, r, o) {
    Oe(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
function gC(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function yC(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function Jr(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function pC(e, t, n) {
  if (Mr(e, t, "link-arrow", "arrow", !1), Mr(e, t, "link-arrow-reverse", "arrow", !0), Mr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      ka(e, t, i);
}
function ka(e, t, n) {
  e.select("#link-arrow-" + Jr(n)).empty() && (Mr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), Mr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function $s(e, t) {
  e.select("#link-arrow-" + Jr(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + Jr(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function Mr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${JS()(t.arrowPoints)}`).style("fill", o || "");
}
function bC(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class ed {
  constructor() {
    Oe(this, "nodeIdCounter", 0);
    Oe(this, "nodes", []);
    Oe(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new Hm(
      this.nodeIdCounter++,
      i,
      t,
      n,
      void 0,
      void 0,
      r,
      o
    );
    return this.nodes.push(l), l;
  }
  createLink(t, n, i, r) {
    if (this.links.find(
      (u) => u.source.id === t && u.target.id === n
    ) !== void 0)
      return;
    const l = this.nodes.find((u) => u.id === t);
    if (l === void 0)
      return;
    const s = this.nodes.find((u) => u.id === n);
    if (s === void 0)
      return;
    const a = new mC(l, s, void 0, i, r);
    return this.links.push(a), a;
  }
  removeNode(t) {
    const n = this.nodes.findIndex((r) => r.id === t.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const i = this.links.filter(
      (r) => r.source.id === t.id || r.target.id === t.id
    );
    return i.forEach((r) => {
      const o = this.links.indexOf(r, 0);
      this.links.splice(o, 1);
    }), [t, i];
  }
  removeLink(t) {
    const n = this.links.findIndex(
      (i) => i.source.id === t.source.id && i.target.id === t.target.id
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
    return this.links.some((i) => i.color === t && i.id !== n);
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
    return this.links.filter((i) => i.color === t && i.id !== n).map((i) => i.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, i = !1, r = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let o, l;
    return o = this.nodes.map((s) => {
      let a = `${s.id}`;
      return t && s.label !== void 0 && (a += ` ${s.label}`), i && s.color !== void 0 && (a += ` /COLOR:/${s.color}`), a;
    }).join(`
`), l = this.links.map((s) => {
      let a = `${s.source.id} ${s.target.id}`;
      return n && s.label !== void 0 && (a += ` ${s.label}`), r && s.color !== void 0 && (a += ` /COLOR:/${s.color}`), a;
    }).join(`
`), `${o}${l ? `
#
` : ""}${l}`;
  }
  /** Formats the graph in a json like graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodePosition if position should be included
   * @returns The graph in JSON format*/
  toJSON(t = !0, n = !0, i = !0, r = !0, o = !0) {
    let l = this.nodes.map((a) => {
      let u = ["id"];
      return t && a.label !== void 0 && u.push("label"), i && a.color !== void 0 && u.push("color"), o && a.x !== void 0 && (u.push("x"), u.push("y")), JSON.stringify(a, u);
    }).join(`,
		`), s = this.links.map((a) => {
      let u = ["sourceId", "targetId"];
      n && a.label !== void 0 && u.push("label"), r && a.color !== void 0 && u.push("color");
      let c = this.convertD3ToJSONLink(a);
      return JSON.stringify(c, u);
    }).join(`,
		`);
    return `{
	"nodes":[
		${l}
	],
	"links":[
		${s}
	]
}`;
  }
  convertD3ToJSONLink(t) {
    let n = t.id.split("-");
    return {
      sourceId: Number(n[0]),
      targetId: Number(n[1]),
      label: t.label,
      color: t.color
    };
  }
}
function wC(e, t, n, i, r) {
  let o = $S(e.nodes).on("tick", () => r()).force(
    "collision",
    SS().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = xC(e, o, n, i, t), o = zm(o, e, t, t.fixedLinkDistanceEnabled), o = jm(o, t.nodePhysicsEnabled, n, i), o;
}
function xC(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function jm(e, t, n, i) {
  return t ? e.force("charge", NS().strength(-500)).force("x", RS(n / 2).strength(0.05)).force("y", OS(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function zm(e, t, n, i) {
  return i ? e.force(
    "link",
    ES().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
const _C = Object.prototype.toString;
function El(e) {
  const t = _C.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function kC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!El(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, i = n === void 0 ? 0 : n, r = t.toIndex, o = r === void 0 ? e.length : r;
  if (i < 0 || i >= e.length || !Number.isInteger(i))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= i || o > e.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var l = e[i], s = i + 1; s < o; s++)
    e[s] > l && (l = e[s]);
  return l;
}
function SC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!El(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, i = n === void 0 ? 0 : n, r = t.toIndex, o = r === void 0 ? e.length : r;
  if (i < 0 || i >= e.length || !Number.isInteger(i))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= i || o > e.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var l = e[i], s = i + 1; s < o; s++)
    e[s] < l && (l = e[s]);
  return l;
}
function td(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (El(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!El(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = SC(e), r = kC(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const No = " ".repeat(2), Gm = " ".repeat(4);
function CC() {
  return Um(this);
}
function Um(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${No}[
${Gm}${EC(e, n, i, r)}
${No}]
${No}rows: ${e.rows}
${No}columns: ${e.columns}
}`;
}
function EC(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push(VC(e.get(u, d), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${Gm}`);
}
function VC(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function LC(e, t) {
  e.prototype.add = function(i) {
    return typeof i == "number" ? this.addS(i) : this.addM(i);
  }, e.prototype.addS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) + i);
    return this;
  }, e.prototype.addM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) + i.get(r, o));
    return this;
  }, e.add = function(i, r) {
    return new t(i).add(r);
  }, e.prototype.sub = function(i) {
    return typeof i == "number" ? this.subS(i) : this.subM(i);
  }, e.prototype.subS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) - i);
    return this;
  }, e.prototype.subM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) - i.get(r, o));
    return this;
  }, e.sub = function(i, r) {
    return new t(i).sub(r);
  }, e.prototype.subtract = e.prototype.sub, e.prototype.subtractS = e.prototype.subS, e.prototype.subtractM = e.prototype.subM, e.subtract = e.sub, e.prototype.mul = function(i) {
    return typeof i == "number" ? this.mulS(i) : this.mulM(i);
  }, e.prototype.mulS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) * i);
    return this;
  }, e.prototype.mulM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) * i.get(r, o));
    return this;
  }, e.mul = function(i, r) {
    return new t(i).mul(r);
  }, e.prototype.multiply = e.prototype.mul, e.prototype.multiplyS = e.prototype.mulS, e.prototype.multiplyM = e.prototype.mulM, e.multiply = e.mul, e.prototype.div = function(i) {
    return typeof i == "number" ? this.divS(i) : this.divM(i);
  }, e.prototype.divS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) / i);
    return this;
  }, e.prototype.divM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) / i.get(r, o));
    return this;
  }, e.div = function(i, r) {
    return new t(i).div(r);
  }, e.prototype.divide = e.prototype.div, e.prototype.divideS = e.prototype.divS, e.prototype.divideM = e.prototype.divM, e.divide = e.div, e.prototype.mod = function(i) {
    return typeof i == "number" ? this.modS(i) : this.modM(i);
  }, e.prototype.modS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) % i);
    return this;
  }, e.prototype.modM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) % i.get(r, o));
    return this;
  }, e.mod = function(i, r) {
    return new t(i).mod(r);
  }, e.prototype.modulus = e.prototype.mod, e.prototype.modulusS = e.prototype.modS, e.prototype.modulusM = e.prototype.modM, e.modulus = e.mod, e.prototype.and = function(i) {
    return typeof i == "number" ? this.andS(i) : this.andM(i);
  }, e.prototype.andS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) & i);
    return this;
  }, e.prototype.andM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) & i.get(r, o));
    return this;
  }, e.and = function(i, r) {
    return new t(i).and(r);
  }, e.prototype.or = function(i) {
    return typeof i == "number" ? this.orS(i) : this.orM(i);
  }, e.prototype.orS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) | i);
    return this;
  }, e.prototype.orM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) | i.get(r, o));
    return this;
  }, e.or = function(i, r) {
    return new t(i).or(r);
  }, e.prototype.xor = function(i) {
    return typeof i == "number" ? this.xorS(i) : this.xorM(i);
  }, e.prototype.xorS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) ^ i);
    return this;
  }, e.prototype.xorM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) ^ i.get(r, o));
    return this;
  }, e.xor = function(i, r) {
    return new t(i).xor(r);
  }, e.prototype.leftShift = function(i) {
    return typeof i == "number" ? this.leftShiftS(i) : this.leftShiftM(i);
  }, e.prototype.leftShiftS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) << i);
    return this;
  }, e.prototype.leftShiftM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) << i.get(r, o));
    return this;
  }, e.leftShift = function(i, r) {
    return new t(i).leftShift(r);
  }, e.prototype.signPropagatingRightShift = function(i) {
    return typeof i == "number" ? this.signPropagatingRightShiftS(i) : this.signPropagatingRightShiftM(i);
  }, e.prototype.signPropagatingRightShiftS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) >> i);
    return this;
  }, e.prototype.signPropagatingRightShiftM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) >> i.get(r, o));
    return this;
  }, e.signPropagatingRightShift = function(i, r) {
    return new t(i).signPropagatingRightShift(r);
  }, e.prototype.rightShift = function(i) {
    return typeof i == "number" ? this.rightShiftS(i) : this.rightShiftM(i);
  }, e.prototype.rightShiftS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) >>> i);
    return this;
  }, e.prototype.rightShiftM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, this.get(r, o) >>> i.get(r, o));
    return this;
  }, e.rightShift = function(i, r) {
    return new t(i).rightShift(r);
  }, e.prototype.zeroFillRightShift = e.prototype.rightShift, e.prototype.zeroFillRightShiftS = e.prototype.rightShiftS, e.prototype.zeroFillRightShiftM = e.prototype.rightShiftM, e.zeroFillRightShift = e.rightShift, e.prototype.not = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, ~this.get(i, r));
    return this;
  }, e.not = function(i) {
    return new t(i).not();
  }, e.prototype.abs = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.abs(this.get(i, r)));
    return this;
  }, e.abs = function(i) {
    return new t(i).abs();
  }, e.prototype.acos = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.acos(this.get(i, r)));
    return this;
  }, e.acos = function(i) {
    return new t(i).acos();
  }, e.prototype.acosh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.acosh(this.get(i, r)));
    return this;
  }, e.acosh = function(i) {
    return new t(i).acosh();
  }, e.prototype.asin = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.asin(this.get(i, r)));
    return this;
  }, e.asin = function(i) {
    return new t(i).asin();
  }, e.prototype.asinh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.asinh(this.get(i, r)));
    return this;
  }, e.asinh = function(i) {
    return new t(i).asinh();
  }, e.prototype.atan = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.atan(this.get(i, r)));
    return this;
  }, e.atan = function(i) {
    return new t(i).atan();
  }, e.prototype.atanh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.atanh(this.get(i, r)));
    return this;
  }, e.atanh = function(i) {
    return new t(i).atanh();
  }, e.prototype.cbrt = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.cbrt(this.get(i, r)));
    return this;
  }, e.cbrt = function(i) {
    return new t(i).cbrt();
  }, e.prototype.ceil = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.ceil(this.get(i, r)));
    return this;
  }, e.ceil = function(i) {
    return new t(i).ceil();
  }, e.prototype.clz32 = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.clz32(this.get(i, r)));
    return this;
  }, e.clz32 = function(i) {
    return new t(i).clz32();
  }, e.prototype.cos = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.cos(this.get(i, r)));
    return this;
  }, e.cos = function(i) {
    return new t(i).cos();
  }, e.prototype.cosh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.cosh(this.get(i, r)));
    return this;
  }, e.cosh = function(i) {
    return new t(i).cosh();
  }, e.prototype.exp = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.exp(this.get(i, r)));
    return this;
  }, e.exp = function(i) {
    return new t(i).exp();
  }, e.prototype.expm1 = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.expm1(this.get(i, r)));
    return this;
  }, e.expm1 = function(i) {
    return new t(i).expm1();
  }, e.prototype.floor = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.floor(this.get(i, r)));
    return this;
  }, e.floor = function(i) {
    return new t(i).floor();
  }, e.prototype.fround = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.fround(this.get(i, r)));
    return this;
  }, e.fround = function(i) {
    return new t(i).fround();
  }, e.prototype.log = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.log(this.get(i, r)));
    return this;
  }, e.log = function(i) {
    return new t(i).log();
  }, e.prototype.log1p = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.log1p(this.get(i, r)));
    return this;
  }, e.log1p = function(i) {
    return new t(i).log1p();
  }, e.prototype.log10 = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.log10(this.get(i, r)));
    return this;
  }, e.log10 = function(i) {
    return new t(i).log10();
  }, e.prototype.log2 = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.log2(this.get(i, r)));
    return this;
  }, e.log2 = function(i) {
    return new t(i).log2();
  }, e.prototype.round = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.round(this.get(i, r)));
    return this;
  }, e.round = function(i) {
    return new t(i).round();
  }, e.prototype.sign = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.sign(this.get(i, r)));
    return this;
  }, e.sign = function(i) {
    return new t(i).sign();
  }, e.prototype.sin = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.sin(this.get(i, r)));
    return this;
  }, e.sin = function(i) {
    return new t(i).sin();
  }, e.prototype.sinh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.sinh(this.get(i, r)));
    return this;
  }, e.sinh = function(i) {
    return new t(i).sinh();
  }, e.prototype.sqrt = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.sqrt(this.get(i, r)));
    return this;
  }, e.sqrt = function(i) {
    return new t(i).sqrt();
  }, e.prototype.tan = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.tan(this.get(i, r)));
    return this;
  }, e.tan = function(i) {
    return new t(i).tan();
  }, e.prototype.tanh = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.tanh(this.get(i, r)));
    return this;
  }, e.tanh = function(i) {
    return new t(i).tanh();
  }, e.prototype.trunc = function() {
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, Math.trunc(this.get(i, r)));
    return this;
  }, e.trunc = function(i) {
    return new t(i).trunc();
  }, e.pow = function(i, r) {
    return new t(i).pow(r);
  }, e.prototype.pow = function(i) {
    return typeof i == "number" ? this.powS(i) : this.powM(i);
  }, e.prototype.powS = function(i) {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.pow(this.get(r, o), i));
    return this;
  }, e.prototype.powM = function(i) {
    if (i = t.checkMatrix(i), this.rows !== i.rows || this.columns !== i.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.pow(this.get(r, o), i.get(r, o)));
    return this;
  };
}
function Jt(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Qt(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function ji(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function zi(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function PC(e, t, n) {
  return {
    row: IC(e, t),
    column: TC(e, n)
  };
}
function IC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function TC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function nd(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Ro("startRow", t), Ro("endRow", n), Ro("startColumn", i), Ro("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function rs(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function Ro(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Di(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function MC(e) {
  let t = rs(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function AC(e) {
  let t = rs(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function $C(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function NC(e) {
  let t = rs(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function RC(e) {
  let t = rs(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function OC(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function BC(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function FC(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function DC(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function HC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function jC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function zC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function GC(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function UC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function WC(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function qC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function YC(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function KC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t);
}
class Ie {
  static from1DArray(t, n, i) {
    if (t * n !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new Ce(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, i[l * n + s]);
    return o;
  }
  static rowVector(t) {
    let n = new Ce(1, t.length);
    for (let i = 0; i < t.length; i++)
      n.set(0, i, t[i]);
    return n;
  }
  static columnVector(t) {
    let n = new Ce(t.length, 1);
    for (let i = 0; i < t.length; i++)
      n.set(i, 0, t[i]);
    return n;
  }
  static zeros(t, n) {
    return new Ce(t, n);
  }
  static ones(t, n) {
    return new Ce(t, n).fill(1);
  }
  static rand(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: r = Math.random } = i;
    let o = new Ce(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, r());
    return o;
  }
  static randInt(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { min: r = 0, max: o = 1e3, random: l = Math.random } = i;
    if (!Number.isInteger(r)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(o)) throw new TypeError("max must be an integer");
    if (r >= o) throw new RangeError("min must be smaller than max");
    let s = o - r, a = new Ce(t, n);
    for (let u = 0; u < t; u++)
      for (let c = 0; c < n; c++) {
        let d = r + Math.round(l() * s);
        a.set(u, c, d);
      }
    return a;
  }
  static eye(t, n, i) {
    n === void 0 && (n = t), i === void 0 && (i = 1);
    let r = Math.min(t, n), o = this.zeros(t, n);
    for (let l = 0; l < r; l++)
      o.set(l, l, i);
    return o;
  }
  static diag(t, n, i) {
    let r = t.length;
    n === void 0 && (n = r), i === void 0 && (i = n);
    let o = Math.min(r, n, i), l = this.zeros(n, i);
    for (let s = 0; s < o; s++)
      l.set(s, s, t[s]);
    return l;
  }
  static min(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let i = t.rows, r = t.columns, o = new Ce(i, r);
    for (let l = 0; l < i; l++)
      for (let s = 0; s < r; s++)
        o.set(l, s, Math.min(t.get(l, s), n.get(l, s)));
    return o;
  }
  static max(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let i = t.rows, r = t.columns, o = new this(i, r);
    for (let l = 0; l < i; l++)
      for (let s = 0; s < r; s++)
        o.set(l, s, Math.max(t.get(l, s), n.get(l, s)));
    return o;
  }
  static checkMatrix(t) {
    return Ie.isMatrix(t) ? t : new Ce(t);
  }
  static isMatrix(t) {
    return t != null && t.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(t) {
    if (typeof t != "function")
      throw new TypeError("callback must be a function");
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.call(this, n, i);
    return this;
  }
  to1DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.push(this.get(n, i));
    return t;
  }
  to2DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++) {
      t.push([]);
      for (let i = 0; i < this.columns; i++)
        t[n].push(this.get(n, i));
    }
    return t;
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
      for (let t = 0; t < this.rows; t++)
        for (let n = 0; n <= t; n++)
          if (this.get(t, n) !== this.get(n, t))
            return !1;
      return !0;
    }
    return !1;
  }
  isEchelonForm() {
    let t = 0, n = 0, i = -1, r = !0, o = !1;
    for (; t < this.rows && r; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > i ? (o = !0, i = n) : (r = !1, o = !0);
      t++;
    }
    return r;
  }
  isReducedEchelonForm() {
    let t = 0, n = 0, i = -1, r = !0, o = !1;
    for (; t < this.rows && r; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > i ? (o = !0, i = n) : (r = !1, o = !0);
      for (let l = n + 1; l < this.rows; l++)
        this.get(t, l) !== 0 && (r = !1);
      t++;
    }
    return r;
  }
  echelonForm() {
    let t = this.clone(), n = 0, i = 0;
    for (; n < t.rows && i < t.columns; ) {
      let r = n;
      for (let o = n; o < t.rows; o++)
        t.get(o, i) > t.get(r, i) && (r = o);
      if (t.get(r, i) === 0)
        i++;
      else {
        t.swapRows(n, r);
        let o = t.get(n, i);
        for (let l = i; l < t.columns; l++)
          t.set(n, l, t.get(n, l) / o);
        for (let l = n + 1; l < t.rows; l++) {
          let s = t.get(l, i) / t.get(n, i);
          t.set(l, i, 0);
          for (let a = i + 1; a < t.columns; a++)
            t.set(l, a, t.get(l, a) - t.get(n, a) * s);
        }
        n++, i++;
      }
    }
    return t;
  }
  reducedEchelonForm() {
    let t = this.echelonForm(), n = t.columns, i = t.rows, r = i - 1;
    for (; r >= 0; )
      if (t.maxRow(r) === 0)
        r--;
      else {
        let o = 0, l = !1;
        for (; o < i && l === !1; )
          t.get(r, o) === 1 ? l = !0 : o++;
        for (let s = 0; s < r; s++) {
          let a = t.get(s, o);
          for (let u = o; u < n; u++) {
            let c = t.get(s, u) - a * t.get(r, u);
            t.set(s, u, c);
          }
        }
        r--;
      }
    return t;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { rows: n = 1, columns: i = 1 } = t;
    if (!Number.isInteger(n) || n <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(i) || i <= 0)
      throw new TypeError("columns must be a positive integer");
    let r = new Ce(this.rows * n, this.columns * i);
    for (let o = 0; o < n; o++)
      for (let l = 0; l < i; l++)
        r.setSubMatrix(this, this.rows * o, this.columns * l);
    return r;
  }
  fill(t) {
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, t);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(t) {
    Jt(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return Ce.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Jt(this, t), n = ji(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    Jt(this, t), Jt(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    Qt(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return Ce.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Qt(this, t), n = zi(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    Qt(this, t), Qt(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = ji(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = ji(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = ji(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = ji(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = zi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = zi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = zi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = zi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    Jt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    Qt(this, t);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, this.get(i, t) * n);
    return this;
  }
  max() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.get(n, i) > t && (t = this.get(n, i));
    return t;
  }
  maxIndex() {
    Di(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) > t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  min() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.get(n, i) < t && (t = this.get(n, i));
    return t;
  }
  minIndex() {
    Di(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    Jt(this, t), Di(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    Jt(this, t), Di(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if (Qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    Qt(this, t), Di(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if (Qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    Qt(this, t), Di(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) < n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  diag() {
    let t = Math.min(this.rows, this.columns), n = [];
    for (let i = 0; i < t; i++)
      n.push(this.get(i, i));
    return n;
  }
  norm(t = "frobenius") {
    let n = 0;
    if (t === "max")
      return this.max();
    if (t === "frobenius") {
      for (let i = 0; i < this.rows; i++)
        for (let r = 0; r < this.columns; r++)
          n = n + this.get(i, r) * this.get(i, r);
      return Math.sqrt(n);
    } else
      throw new RangeError(`unknown norm type: ${t}`);
  }
  cumulativeSum() {
    let t = 0;
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t += this.get(n, i), this.set(n, i, t);
    return this;
  }
  dot(t) {
    Ie.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let r = 0; r < n.length; r++)
      i += n[r] * t[r];
    return i;
  }
  mmul(t) {
    t = Ce.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.columns, o = new Ce(n, r), l = new Float64Array(i);
    for (let s = 0; s < r; s++) {
      for (let a = 0; a < i; a++)
        l[a] = t.get(a, s);
      for (let a = 0; a < n; a++) {
        let u = 0;
        for (let c = 0; c < i; c++)
          u += this.get(a, c) * l[c];
        o.set(a, s, u);
      }
    }
    return o;
  }
  strassen2x2(t) {
    t = Ce.checkMatrix(t);
    let n = new Ce(2, 2);
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (i + u) * (r + c), f = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, p = (s - i) * (r + l), g = (o - u) * (a + c), w = d + v - m + g, x = h + m, b = f + v, k = d - f + h + p;
    return n.set(0, 0, w), n.set(0, 1, x), n.set(1, 0, b), n.set(1, 1, k), n;
  }
  strassen3x3(t) {
    t = Ce.checkMatrix(t);
    let n = new Ce(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), g = t.get(1, 2), w = t.get(2, 0), x = t.get(2, 1), b = t.get(2, 2), k = (i + r + o - l - s - c - d) * p, E = (i - l) * (-h + p), S = s * (-f + h + m - p - g - w + b), P = (-i + l + s) * (f - h + p), $ = (l + s) * (-f + h), R = i * f, D = (-i + u + c) * (f - v + g), L = (-i + u) * (v - g), I = (u + c) * (-f + v), _ = (i + r + o - s - a - u - c) * g, O = c * (-f + v + m - p - g - w + x), M = (-o + c + d) * (p + w - x), j = (o - d) * (p - x), N = o * w, F = (c + d) * (-w + x), B = (-o + s + a) * (g + w - b), H = (o - a) * (g - b), Y = (s + a) * (-w + b), Q = r * m, se = a * x, fe = l * v, J = u * h, le = d * b, Ee = R + N + Q, De = k + P + $ + R + M + N + F, Ue = R + D + I + _ + N + B + Y, xt = E + S + P + R + N + B + H, yn = E + P + $ + R + se, V = N + B + H + Y + fe, A = R + D + L + O + M + j + N, U = M + j + N + F + J, K = R + D + L + I + le;
    return n.set(0, 0, Ee), n.set(0, 1, De), n.set(0, 2, Ue), n.set(1, 0, xt), n.set(1, 1, yn), n.set(1, 2, V), n.set(2, 0, A), n.set(2, 1, U), n.set(2, 2, K), n;
  }
  mmulStrassen(t) {
    t = Ce.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, m = d.columns;
      if (v === f && m === h)
        return d;
      {
        let p = Ie.zeros(f, h);
        return p = p.setSubMatrix(d, 0, 0), p;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let m = parseInt(d.rows / 2, 10), p = parseInt(d.columns / 2, 10), g = d.subMatrix(0, m - 1, 0, p - 1), w = f.subMatrix(0, m - 1, 0, p - 1), x = d.subMatrix(0, m - 1, p, d.columns - 1), b = f.subMatrix(0, m - 1, p, f.columns - 1), k = d.subMatrix(m, d.rows - 1, 0, p - 1), E = f.subMatrix(m, f.rows - 1, 0, p - 1), S = d.subMatrix(m, d.rows - 1, p, d.columns - 1), P = f.subMatrix(m, f.rows - 1, p, f.columns - 1), $ = c(
        Ie.add(g, S),
        Ie.add(w, P),
        m,
        p
      ), R = c(Ie.add(k, S), w, m, p), D = c(g, Ie.sub(b, P), m, p), L = c(S, Ie.sub(E, w), m, p), I = c(Ie.add(g, x), P, m, p), _ = c(
        Ie.sub(k, g),
        Ie.add(w, b),
        m,
        p
      ), O = c(
        Ie.sub(x, S),
        Ie.add(E, P),
        m,
        p
      ), M = Ie.add($, L);
      M.sub(I), M.add(O);
      let j = Ie.add(D, I), N = Ie.add(R, L), F = Ie.sub($, R);
      F.add(D), F.add(_);
      let B = Ie.zeros(2 * M.rows, 2 * M.columns);
      return B = B.setSubMatrix(M, 0, 0), B = B.setSubMatrix(j, M.rows, 0), B = B.setSubMatrix(N, 0, M.columns), B = B.setSubMatrix(F, M.rows, M.columns), B.subMatrix(0, h - 1, 0, v - 1);
    }
    return c(n, t, a, u);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: i = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(i)) throw new TypeError("max must be a number");
    if (n >= i) throw new RangeError("min must be smaller than max");
    let r = new Ce(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const l = this.getRow(o);
      l.length > 0 && td(l, { min: n, max: i, output: l }), r.setRow(o, l);
    }
    return r;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: i = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(i)) throw new TypeError("max must be a number");
    if (n >= i) throw new RangeError("min must be smaller than max");
    let r = new Ce(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const l = this.getColumn(o);
      l.length && td(l, {
        min: n,
        max: i,
        output: l
      }), r.setColumn(o, l);
    }
    return r;
  }
  flipRows() {
    const t = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < t; i++) {
        let r = this.get(n, i), o = this.get(n, this.columns - 1 - i);
        this.set(n, i, o), this.set(n, this.columns - 1 - i, r);
      }
    return this;
  }
  flipColumns() {
    const t = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let i = 0; i < t; i++) {
        let r = this.get(i, n), o = this.get(this.rows - 1 - i, n);
        this.set(i, n, o), this.set(this.rows - 1 - i, n, r);
      }
    return this;
  }
  kroneckerProduct(t) {
    t = Ce.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.rows, o = t.columns, l = new Ce(n * r, i * o);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < i; a++)
        for (let u = 0; u < r; u++)
          for (let c = 0; c < o; c++)
            l.set(r * s + u, o * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = Ce.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, i = t.rows, r = this.kroneckerProduct(Ce.eye(i, i)), o = Ce.eye(n, n).kroneckerProduct(t);
    return r.add(o);
  }
  transpose() {
    let t = new Ce(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, n, this.get(n, i));
    return t;
  }
  sortRows(t = id) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = id) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    nd(this, t, n, i, r);
    let o = new Ce(
      n - t + 1,
      r - i + 1
    );
    for (let l = t; l <= n; l++)
      for (let s = i; s <= r; s++)
        o.set(l - t, s - i, this.get(l, s));
    return o;
  }
  subMatrixRow(t, n, i) {
    if (n === void 0 && (n = 0), i === void 0 && (i = this.columns - 1), n > i || n < 0 || n >= this.columns || i < 0 || i >= this.columns)
      throw new RangeError("Argument out of range");
    let r = new Ce(t.length, i - n + 1);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.rows)
          throw new RangeError(`Row index out of range: ${t[o]}`);
        r.set(o, l - n, this.get(t[o], l));
      }
    return r;
  }
  subMatrixColumn(t, n, i) {
    if (n === void 0 && (n = 0), i === void 0 && (i = this.rows - 1), n > i || n < 0 || n >= this.rows || i < 0 || i >= this.rows)
      throw new RangeError("Argument out of range");
    let r = new Ce(i - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        r.set(l - n, o, this.get(l, t[o]));
      }
    return r;
  }
  setSubMatrix(t, n, i) {
    if (t = Ce.checkMatrix(t), t.isEmpty())
      return this;
    let r = n + t.rows - 1, o = i + t.columns - 1;
    nd(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = PC(this, t, n), r = new Ce(t.length, n.length);
    for (let o = 0; o < i.row.length; o++) {
      let l = i.row[o];
      for (let s = 0; s < i.column.length; s++) {
        let a = i.column[s];
        r.set(o, s, this.get(l, a));
      }
    }
    return r;
  }
  trace() {
    let t = Math.min(this.rows, this.columns), n = 0;
    for (let i = 0; i < t; i++)
      n += this.get(i, i);
    return n;
  }
  clone() {
    let t = new Ce(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(n, i, this.get(n, i));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return MC(this);
      case "column":
        return AC(this);
      case void 0:
        return $C(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return NC(this);
      case "column":
        return RC(this);
      case void 0:
        return OC(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  mean(t) {
    const n = this.sum(t);
    switch (t) {
      case "row": {
        for (let i = 0; i < this.rows; i++)
          n[i] /= this.columns;
        return n;
      }
      case "column": {
        for (let i = 0; i < this.columns; i++)
          n[i] /= this.rows;
        return n;
      }
      case void 0:
        return n / this.size;
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  variance(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { unbiased: i = !0, mean: r = this.mean(t) } = n;
    if (typeof i != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (t) {
      case "row": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return BC(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return FC(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return DC(this, i, r);
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  standardDeviation(t, n) {
    typeof t == "object" && (n = t, t = void 0);
    const i = this.variance(t, n);
    if (t === void 0)
      return Math.sqrt(i);
    for (let r = 0; r < i.length; r++)
      i[r] = Math.sqrt(i[r]);
    return i;
  }
  center(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { center: i = this.mean(t) } = n;
    switch (t) {
      case "row": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return HC(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return jC(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return zC(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  scale(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    let i = n.scale;
    switch (t) {
      case "row": {
        if (i === void 0)
          i = GC(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return UC(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = WC(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return qC(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = YC(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return KC(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return Um(this, t);
  }
}
Ie.prototype.klass = "Matrix";
typeof Symbol < "u" && (Ie.prototype[Symbol.for("nodejs.util.inspect.custom")] = CC);
function id(e, t) {
  return e - t;
}
Ie.random = Ie.rand;
Ie.randomInt = Ie.randInt;
Ie.diagonal = Ie.diag;
Ie.prototype.diagonal = Ie.prototype.diag;
Ie.identity = Ie.eye;
Ie.prototype.negate = Ie.prototype.neg;
Ie.prototype.tensorProduct = Ie.prototype.kroneckerProduct;
class Ce extends Ie {
  constructor(t, n) {
    if (super(), Ce.isMatrix(t))
      return t.clone();
    if (Number.isInteger(t) && t >= 0)
      if (this.data = [], Number.isInteger(n) && n >= 0)
        for (let i = 0; i < t; i++)
          this.data.push(new Float64Array(n));
      else
        throw new TypeError("nColumns must be a positive integer");
    else if (Array.isArray(t)) {
      const i = t;
      if (t = i.length, n = t ? i[0].length : 0, typeof n != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let r = 0; r < t; r++) {
        if (i[r].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(i[r]));
      }
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
    this.rows = t, this.columns = n;
  }
  set(t, n, i) {
    return this.data[t][n] = i, this;
  }
  get(t, n) {
    return this.data[t][n];
  }
  removeRow(t) {
    return Jt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Jt(this, t, !0), n = Float64Array.from(ji(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    Qt(this, t);
    for (let n = 0; n < this.rows; n++) {
      const i = new Float64Array(this.columns - 1);
      for (let r = 0; r < t; r++)
        i[r] = this.data[n][r];
      for (let r = t + 1; r < this.columns; r++)
        i[r - 1] = this.data[n][r];
      this.data[n] = i;
    }
    return this.columns -= 1, this;
  }
  addColumn(t, n) {
    typeof n > "u" && (n = t, t = this.columns), Qt(this, t, !0), n = zi(this, n);
    for (let i = 0; i < this.rows; i++) {
      const r = new Float64Array(this.columns + 1);
      let o = 0;
      for (; o < t; o++)
        r[o] = this.data[i][o];
      for (r[o++] = n[i]; o < this.columns + 1; o++)
        r[o] = this.data[i][o - 1];
      this.data[i] = r;
    }
    return this.columns += 1, this;
  }
}
LC(Ie, Ce);
function Ns(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function Rs(e, t, n) {
  const i = new Ce([[e.x, e.y]]), r = new Ce([[t.x, t.y]]), o = Ce.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = Wm(10), u = er(s, -a).multiply(n.nodeRadius - 1).add(i), c = Ce.multiply(s, -1), d = er(c, a).multiply(n.nodeRadius).add(r).add(er(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function rd(e, t, n) {
  const i = new Ce([[e.x, e.y]]), r = new Ce([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = Ce.subtract(i, r), l = o.divide(o.norm("frobenius")), s = Wm(40), a = er(l, s).multiply(n.nodeRadius - 1).add(i), u = er(l, -s).multiply(n.nodeRadius).add(i).add(er(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function od(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Wm(e) {
  return e * (Math.PI / 180);
}
function er(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new Ce([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
class XC {
  constructor() {
    Oe(this, "persistSettingsLocalStorage", !1);
    Oe(this, "hasToolbar", !0);
    Oe(this, "nodeRadius", 24);
    Oe(this, "showNodeLabels", !0);
    Oe(this, "nodePhysicsEnabled", !1);
    Oe(this, "isGraphEditableInGUI", !0);
    Oe(this, "zoomEnabled", !1);
    Oe(this, "showLinkLabels", !0);
    Oe(this, "fixedLinkDistanceEnabled", !1);
    Oe(this, "markerBoxSize", 4);
    Oe(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Oe(this, "markerRef", this.markerBoxSize / 2);
    Oe(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Oe(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
function ZC(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((s) => s.trim().startsWith("#")), i = n !== -1 ? t.slice(0, n) : t, r = n !== -1 ? t.slice(n + 1) : [], o = [];
  if (i.length)
    for (const s of i) {
      let [, a, u, c] = (s.match(/(\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (.*)/) || s.match(/(\w+)/) || []).map((d) => d.trim());
      u != null && u.includes("/COLOR:/") && (c = u, u = ""), a && o.push({
        idImported: a,
        label: u,
        color: c == null ? void 0 : c.replace("/COLOR:/", "")
      });
    }
  const l = [];
  if (r.length)
    for (const s of r) {
      let [, a, u, c, d] = (s.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (\w+) (.*)/) || s.match(/(\w+) (\w+)/) || []).map((f) => f.trim());
      c != null && c.includes("/COLOR:/") && (d = c, c = ""), a && u && l.push({
        sourceIdImported: a,
        targetIdImported: u,
        label: c,
        color: d == null ? void 0 : d.replace("/COLOR:/", "")
      });
    }
  return [o, l];
}
function JC(e) {
  const t = [];
  for (let i of e.nodes)
    t.push({
      idImported: i.id,
      x: i.x,
      y: i.y,
      label: i.label,
      color: i.color
    });
  const n = [];
  for (let i of e.links)
    n.push({
      sourceIdImported: i.sourceId,
      targetIdImported: i.targetId,
      label: i.label,
      color: i.color
    });
  return [t, n];
}
var QC = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function eE(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qm = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(QC, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (M, j, N, F) => j + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], m = [], p, g, w = 0, x = 0, b = 0, k = 0, E = 0, S = 0, P = 0, $ = 0, R = 0, D = 0, L = 0, I = 0, _ = 0, O = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(M) {
          return M !== "";
        }), m = v, v = v.map(parseFloat), p = v.length, f === "m") {
          if (O += "M ", d === "m" ? (b += v[0], k += v[1]) : (b = v[0], k = v[1]), w = b, x = k, O += b + " " + k + " ", p > 2)
            for (g = 0; g < p; g += 2)
              d === "m" ? (b += v[g], k += v[g + 1]) : (b = v[g], k = v[g + 1]), O += "L " + b + " " + k + " ";
        } else if (f === "l")
          for (g = 0; g < p; g += 2)
            d === "l" ? (b += v[g], k += v[g + 1]) : (b = v[g], k = v[g + 1]), O += "L " + b + " " + k + " ";
        else if (f === "h")
          for (g = 0; g < p; g++)
            d === "h" ? b += v[g] : b = v[g], O += "L " + b + " " + k + " ";
        else if (f === "v")
          for (g = 0; g < p; g++)
            d === "v" ? k += v[g] : k = v[g], O += "L " + b + " " + k + " ";
        else if (f === "q")
          for (g = 0; g < p; g += 4)
            d === "q" ? (E = b + v[g], S = k + v[g + 1], b += v[g + 2], k += v[g + 3]) : (E = v[g], S = v[g + 1], b = v[g + 2], k = v[g + 3]), O += "Q " + E + " " + S + " " + b + " " + k + " ";
        else if (f === "t")
          for (g = 0; g < p; g += 2)
            ["t", "q"].indexOf(h) > -1 ? (E = b + (b - E), S = k + (k - S)) : (E = b, S = k), d === "t" ? (b += v[g], k += v[g + 1]) : (b = v[g], k = v[g + 1]), O += "Q " + E + " " + S + " " + b + " " + k + " ", h = f;
        else if (f === "c")
          for (g = 0; g < p; g += 6)
            d === "c" ? (E = b + v[g], S = k + v[g + 1], P = b + v[g + 2], $ = k + v[g + 3], b += v[g + 4], k += v[g + 5]) : (E = v[g], S = v[g + 1], P = v[g + 2], $ = v[g + 3], b = v[g + 4], k = v[g + 5]), O += "C " + E + " " + S + " " + P + " " + $ + " " + b + " " + k + " ";
        else if (f === "s")
          for (g = 0; g < p; g += 4)
            E = b, S = k, ["s", "c"].indexOf(h) > -1 && (E += b - P, S += k - $), d === "s" ? (P = b + v[g], $ = k + v[g + 1], b += v[g + 2], k += v[g + 3]) : (P = v[g], $ = v[g + 1], b = v[g + 2], k = v[g + 3]), O += "C " + E + " " + S + " " + P + " " + $ + " " + b + " " + k + " ";
        else if (f === "a")
          for (g = 0; g < p; g += 7) {
            R = v[g], D = v[g + 1], L = v[g + 2], I = m[g + 3];
            let M = !1;
            if (I.length > 1) {
              let j = parseInt(I[0]), N = parseInt(I[1]), F;
              I.length > 2 && (F = parseFloat(I.substring(2))), v[g + 3] = j, v.splice(g + 4, 0, N), m.splice(g + 4, 0, "+"), F !== void 0 && v.splice(g + 5, 0, F), M = !0;
            }
            I = v[g + 3], _ = M ? v[g + 4] : m[g + 4], !M && _.length > 1 && (v[g + 4] = parseInt(_[0]), v.splice(g + 5, 0, parseFloat(_.substring(1)))), _ = v[g + 4], d === "a" ? (b += v[g + 5], k += v[g + 6]) : (b = v[g + 5], k = v[g + 6]), O += "A " + R + " " + D + " " + L + " " + I + " " + _ + " " + b + " " + k + " ";
          }
        else f === "z" && (O += "Z ", b = w, k = x);
        h = f;
      }
      return O.trim();
    }
    function i(l) {
      var s = l.trim().split(" "), a, u = s.length, c = u - 1, d, f = [], h, v, m, p, g, w = new RegExp("[QAZLCM]", ""), x = s.slice(-1)[0].toUpperCase() === "Z";
      for (d = 0; d < u; d++)
        if (a = s[d], w.test(a)) {
          if (a === "A") {
            f.push(s[d + 5] === "0" ? "1" : "0"), f.push(s[d + 4]), f.push(s[d + 3]), f.push(s[d + 2]), f.push(s[d + 1]), f.push(a), f.push(s[d + 7]), f.push(s[d + 6]), d += 7;
            continue;
          } else if (a === "C")
            p = 3, g = 2;
          else if (a === "Q")
            p = 2, g = 1;
          else if (a === "L")
            p = 1, g = 1;
          else if (a === "M")
            p = 1, g = 0;
          else
            continue;
          for (p === g && f.push(a), m = 0; m < p; m++)
            m === g && f.push(a), h = s[++d], v = s[++d], f.push(v), f.push(h);
        } else {
          var b = s.slice(Math.max(d - 3, 0), 3).join(" ");
          throw post = s.slice(d + 1, Math.min(d + 4, c)).join(" "), range = b + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + d + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      f.push("M");
      var k = "", E = f.length - 1, S;
      for (S = E; S > 0; S--)
        k += f[S] + " ";
      return x && (k += "Z"), k = k.replace(/M M/g, "Z M"), k;
    }
    function r(a, s) {
      s = parseInt(s) == s ? s : !1;
      var a = n(a), u = a.replace(/M/g, "|M").split("|"), c;
      if (u.splice(0, 1), s !== !1 && s >= u.length)
        return a;
      if (s === !1)
        u = u.map(function(f) {
          return i(f.trim());
        });
      else {
        var d = u[s];
        d && (c = i(d.trim()), u[s] = c);
      }
      return u.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var o = {
      normalize: n,
      reverseNormalized: i,
      reverse: r
    };
    return o;
  });
})(qm);
var tE = qm.exports;
const ld = /* @__PURE__ */ eE(tE), nE = /* @__PURE__ */ Ae("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), iE = /* @__PURE__ */ Ae("div", { class: "graph-host uninitialised" }, null, -1), rE = {
  key: 0,
  class: "button-container"
}, oE = /* @__PURE__ */ Mi({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = C(() => {
      const T = document.querySelectorAll("graph-component");
      let z;
      for (let W = 0; W < T.length; W++) {
        const q = T[W], G = Ke(q.shadowRoot);
        let me;
        if (G.empty() ? me = Ke(".graph-host.uninitialised") : me = G.select(".graph-host.uninitialised"), !me.empty()) {
          me.classed("uninitialised", !1), z = me;
          break;
        }
      }
      return z === void 0 && (z = Ke(".graph-host.uninitialised"), z.classed("uninitialised", !1)), z;
    });
    Nl(() => {
      F();
    }), fn(() => {
      B(), window.addEventListener("resize", Bi);
    }), Rl(() => {
      window.removeEventListener("resize", Bi);
    });
    const i = te(!1), r = te(!1), o = te(""), l = te(""), s = te(new ed()), a = te(!1), u = un(new XC());
    let c, d = 400, f = 400, h, v, m, p, g, w, x, b, k, E = 0, S = 0, P = 1, $, R;
    t({
      getGraph: D,
      setGraph: L,
      printGraph: I,
      setNodeColor: _,
      setLinkColor: O,
      deleteNode: M,
      deleteLink: j,
      toggleNodeLabels: Ou,
      toggleLinkLabels: vr,
      toggleZoom: Bu,
      toggleNodePhysics: lt,
      toggleFixedLinkDistance: Mt,
      toggleGraphEditingInGUI: N,
      resetView: Bi
    });
    function D(T = "json") {
      if (T.toLowerCase() === "json")
        return JSON.parse(
          s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
        );
      if (T.toLowerCase() === "tgf")
        return s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function L(T) {
      typeof T == "object" || typeof T == "string" ? Fu(T) : ls();
    }
    function I(T = "json") {
      T.toLowerCase() === "json" ? console.log(
        s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
      ) : console.log(s.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function _(T, z) {
      if (z !== void 0) {
        const q = (Array.isArray(z) ? z : [z]).map(Number);
        for (const G of q)
          g.selectAll("circle").filter((me) => me.id === G).each((me) => me.color = T).style("fill", T);
      } else
        g.selectAll("circle").each((W) => W.color = T).style("fill", T);
    }
    function O(T, z) {
      if (z) {
        const W = Array.isArray(z) ? z : [z];
        Du(W);
        for (const q of W)
          p.selectAll(".link").filter((G) => G.id === q).each((G) => G.color = T).style("stroke", T);
      } else
        Du(s.value.links.map((W) => W.id)), p.selectAll(".link").each((W) => W.color = T).style("stroke", T);
      ka(m, u, T);
    }
    function M(T) {
      const z = Array.isArray(T) ? T : [T];
      for (const W of z)
        g.selectAll("circle").filter((q) => q.id === W).each(function(q) {
          let G = s.value.removeNode(q);
          if (G !== void 0) {
            let [me, et] = G;
            As(me, n.value), et.forEach((At) => {
              xr(At, n.value);
            });
          }
        });
      a.value = s.value.nodes.length > 0;
    }
    function j(T) {
      const z = Array.isArray(T) ? T : [T];
      for (const W of z)
        p.selectAll("path").filter((q) => q.id === W).each(function(q) {
          let G = s.value.removeLink(q);
          G !== void 0 && xr(G, n.value);
        });
    }
    function N(T) {
      u.isGraphEditableInGUI = T;
    }
    function F() {
      const T = (z) => z === "false" ? !1 : !!z;
      localStorage.wasHere && (i.value = T(localStorage.wasHere)), localStorage.showNodeLabels && (u.showNodeLabels = T(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (u.nodePhysicsEnabled = T(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (u.showLinkLabels = T(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (u.fixedLinkDistanceEnabled = T(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (u.zoomEnabled = T(localStorage.enableZoom)), localStorage.persistSettings && (u.persistSettingsLocalStorage = T(localStorage.persistSettings));
    }
    function B() {
      d = n.value.node().clientWidth, f = n.value.node().clientHeight, h = lC(
        (T) => H(T, u.zoomEnabled),
        u.zoomEnabled
      ), m = vC(
        n.value,
        h,
        (T) => u.isGraphEditableInGUI ? ie(T) : null,
        (T) => u.isGraphEditableInGUI ? U(T) : null,
        (T) => {
          u.isGraphEditableInGUI && Q(
            Gt(T, m.node())[0],
            Gt(T, m.node())[1]
          );
        }
      ), pC(m, u, s.value.getNonDefaultLinkColors()), w = bC(m), p = gC(m), g = yC(m), c = wC(s.value, u, d, f, () => se()), v = hC(c, d, f, u.nodeRadius), Ue();
    }
    function H(T, z = !0) {
      z && (E = T.transform.x, S = T.transform.y, P = T.transform.k, m.attr("transform", `translate(${E},${S})scale(${P})`));
    }
    function Y(T, z, W, q) {
      let G = s.value.createLink(T.id, z.id, W, q);
      G !== void 0 && uC(G, n.value), Ue();
    }
    function Q(T, z, W, q, G) {
      let me = s.value.createNode(
        T ?? d / 2,
        z ?? f / 2,
        W,
        q,
        G
      );
      aC(me, n.value), a.value = !0, Ue();
    }
    function se() {
      g.attr("transform", (T) => `translate(${T.x},${T.y})`), p.selectAll("path").attr("d", (T) => fe(T)), De(), Ue();
    }
    function fe(T) {
      switch (J(T), T.pathType) {
        case $t.REFLEXIVE:
          return rd(T.source, [d / 2, f / 2], u);
        case $t.ARC:
          return Rs(T.source, T.target, u);
        case $t.ARCREVERSE:
          return ld.reverse(Rs(T.source, T.target, u));
        case $t.LINE:
          return Ns(T.source, T.target, u);
        case $t.LINEREVERSE:
          return ld.reverse(Ns(T.source, T.target, u));
        default:
          return "";
      }
    }
    function J(T) {
      T.source.id === T.target.id ? T.pathType = $t.REFLEXIVE : le(T.source, T.target) ? T.pathType = Ee(T.source, T.target) ? $t.ARCREVERSE : $t.ARC : T.pathType = Ee(T.source, T.target) ? $t.LINEREVERSE : $t.LINE;
    }
    function le(T, z) {
      return T.id !== z.id && s.value.links.some((W) => W.target.id === T.id && W.source.id === z.id) && s.value.links.some((W) => W.target.id === z.id && W.source.id === T.id);
    }
    function Ee(T, z) {
      return T.x > z.x;
    }
    function De() {
      const T = x;
      if (T !== void 0) {
        const z = b;
        if (z !== void 0)
          w.attr("d", () => T.id === z.id ? rd(T, [d / 2, f / 2], u) : le(T, z) ? Ns(T, z, u) : Rs(T, z, u));
        else if (k !== void 0) {
          const W = [T.x, T.y];
          w.attr("d", od(W, k));
        }
      }
    }
    function Ue(T = 0.5) {
      var z;
      p = p.data(s.value.links, (W) => W.id).join(
        (W) => {
          const q = W.append("g").classed("link-container", !0);
          return q.append("path").classed("link", !0).style("stroke", (G) => G.color ? G.color : "").attr("id", (G) => G.id).attr(
            "marker-end",
            (G) => G.color ? "url(#link-arrow-" + G.color : "url(#link-arrow)"
          ), q.append("path").classed("clickbox", !0).on("dblclick", (G) => {
            Nt(G);
          }).on("pointerout", (G) => re(G)).on("pointerdown", (G, me) => {
            fC(me, G.button, n.value), u.isGraphEditableInGUI && ue(G, me);
          }).on("pointerup", (G, me) => {
            ee(G, me);
          }), q.append("text").append("textPath").attr(
            "class",
            (G) => G.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (G) => `#${G.id}`).attr("startOffset", "50%").text((G) => G.label ? G.label : "add label").on("click", (G, me) => {
            u.isGraphEditableInGUI && $e(G, me);
          }).on("dblclick", (G) => {
            Nt(G);
          }), q.append("foreignObject").classed("link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
            (G) => `<div class=${G.label ? "link-label" : "link-label-placeholder"}>
                            </div>`
          ).on("click", (G, me) => {
            u.isGraphEditableInGUI && $e(G, me);
          }).on("dblclick", (G) => {
            Nt(G);
          }), q;
        },
        (W) => (W.selectChild("path").attr("marker-start", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE")) {
            let me = "url(#link-arrow-reverse";
            return q.color && (me += "-" + Jr(q.color)), me += ")", me;
          } else
            return null;
        }).attr("marker-end", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE"))
            return null;
          {
            let me = "url(#link-arrow";
            return q.color && (me += "-" + Jr(q.color)), me += ")", me;
          }
        }), W.selectChild("text").attr("class", (q) => {
          var G;
          return `${(G = q.pathType) == null ? void 0 : G.toLowerCase()}-path-text`;
        }).attr("dy", (q) => {
          var G;
          return q.pathType === $t.REFLEXIVE ? 15 : q.pathType == $t.LINEREVERSE ? -10 : (G = q.pathType) != null && G.includes("REVERSE") ? 20 : -10;
        }), W.selectChild("text").selectChild("textPath").classed("hidden", !u.showLinkLabels).classed("not-editable", !u.isGraphEditableInGUI).attr("startOffset", (q) => {
          var G;
          return (G = q.pathType) != null && G.includes("REVERSE") ? "46%" : "50%";
        }), W.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function() {
          const q = Ke(
            this.parentNode.parentNode.parentNode
          ).selectChild("foreignObject").selectChild("div").attr("class", "link-label").classed("hidden", !u.showLinkLabels).node(), G = Ke(this).remove().node();
          q == null || q.appendChild(G);
        }), W.selectChild("text").selectChild("textPath").each(function() {
          const q = this;
          let G = !1;
          q.childNodes.forEach((et) => {
            var At;
            (et == null ? void 0 : et.nodeType) === Node.TEXT_NODE && ((At = et == null ? void 0 : et.textContent) == null ? void 0 : At.trim()) !== "" && (G = !0);
          }), G || Ke(q).text("I").attr("class", "link-label-placeholder mjxhidden");
        }), W.selectChild("text").selectChild("textPath").each(function() {
          const q = this, [G, me] = Un(q);
          Ke(q.parentNode.parentNode).select("foreignObject").attr("x", G).attr("y", me);
        }), W)
      ), g = g.data(s.value.nodes, (W) => W.id).join(
        (W) => {
          const q = W.append("g").classed("node-container", !0).call(v).on("dblclick", (G) => {
            Nt(G);
          });
          return q.append("circle").classed("node", !0).attr("id", (G) => G.id).attr("r", u.nodeRadius).style("fill", (G) => G.color ? G.color : "").on("mouseenter", (G, me) => oe(me)).on("mouseout", (G, me) => ne(me)).on("pointerdown", (G, me) => {
            cC(me, G.button, n.value), u.isGraphEditableInGUI && xt(G, me);
          }).on("pointerup", (G, me) => {
            u.isGraphEditableInGUI && U(G, me);
          }), q.append("foreignObject").classed("node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).attr("y", -0.5 * u.nodeRadius).html(
            (G) => `<div class=${G.label ? "node-label" : "node-label-placeholder"}>
                                ${G.label ? G.label : "add label"}
                            </div>`
          ).on("click", (G, me) => {
            u.isGraphEditableInGUI && Pe(G, me);
          }).on("dblclick", (G) => {
            Nt(G);
          }).on("mouseenter", (G, me) => b = me).on("mouseout", () => b = void 0), q;
        },
        (W) => (W.selectChild("foreignObject").selectChild("div").classed("hidden", !u.showNodeLabels).classed("not-editable", !u.isGraphEditableInGUI), W)
      ), (z = window.MathJax) != null && z.version && window.MathJax.typeset(), c.nodes(s.value.nodes), c.alpha(T).restart();
    }
    function xt(T, z) {
      T.button === 2 && (A(z), $ = setTimeout(() => {
        b = void 0, yn(z);
      }, 250));
    }
    function yn(T) {
      let z = n.value.node().querySelector(`#${CSS.escape(String(T.id))}`);
      Ke(z).classed("on-deletion", !0);
      let W = Ke(z.parentElement);
      W.select("g.arc").remove();
      let q = qS().outerRadius(u.nodeRadius + 4).innerRadius(u.nodeRadius), G = [{ startAngle: 0, endAngle: 0 }];
      W.append("g").attr("class", "arc").selectAll("path.arc").data(G).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Jk).attrTween("d", function(et) {
        let At = { startAngle: 0, endAngle: 2 * Math.PI }, ss = Pu(et, At);
        return function(Qm) {
          return q(ss(Qm));
        };
      }).on("end", () => V(T));
    }
    function V(T) {
      if (u.isGraphEditableInGUI) {
        let z = s.value.removeNode(T);
        if (z !== void 0) {
          let [W, q] = z;
          As(W, n.value), q.forEach((G) => {
            xr(G, n.value);
          });
        }
        a.value = s.value.nodes.length > 0, os(), Ue();
      }
    }
    function A(T) {
      const z = [T.x, T.y];
      k = z, x = T, w.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", od(z, z)), Ue();
    }
    function U(T, z = void 0) {
      Nt(T), clearTimeout($), z && K(z), X();
    }
    function K(T) {
      let z = n.value.node().querySelector(`#${CSS.escape(String(T.id))}`).parentElement, W = Ke(z);
      W.select("circle").classed("on-deletion", !1), W.select("g.arc").select("path.arc").interrupt().remove();
    }
    function X() {
      const T = x, z = b;
      os(), !(T === void 0 || z === void 0) && Y(T, z);
    }
    function ie(T) {
      if (Nt(T), x !== void 0) {
        const z = a2(T, n.value.node())[0], W = [
          (z[0] - E) / P,
          (z[1] - S) / P
        ];
        T.pointerType === "touch" && (W[1] = W[1] - 4 * u.nodeRadius, b = s.value.nodes.find(
          (q) => Math.sqrt(Math.pow(q.x - W[0], 2) + Math.pow(q.y - W[1], 2)) < u.nodeRadius
        )), k = W, De();
      }
    }
    function oe(T) {
      b = T;
    }
    function ne(T) {
      T && K(T), b = void 0, clearTimeout($);
    }
    function re(T) {
      Nt(T), clearTimeout(R);
    }
    function ee(T, z) {
      Nt(T), clearTimeout(R), T.button === 2 && Se(z);
    }
    function ue(T, z) {
      T.button === 2 && (Nt(T), R = setTimeout(() => {
        pe(z);
      }, 250));
    }
    function pe(T) {
      let z = n.value.node().querySelector(`#${CSS.escape(T.id)}`);
      if (z instanceof SVGPathElement) {
        let W = Ke(z), q = z.getTotalLength(), G = z.parentElement.querySelector("text"), me = Array.from(G.classList).some(
          (ss) => ss.includes("reverse")
        ), et = 0, At = me ? q : -q;
        W.attr("stroke-dasharray", q).attr("stroke-dashoffset", et).transition().duration(750).attr("stroke-dashoffset", At).on("end", () => ge(T));
      }
    }
    function ge(T) {
      let z = T.color;
      if (u.isGraphEditableInGUI) {
        let W = s.value.removeLink(T);
        W !== void 0 && xr(W, n.value), z && (s.value.hasNonDefaultLinkColor(z) || $s(m, z));
      }
    }
    function Se(T) {
      let z = n.value.node().querySelector(`#${CSS.escape(T.id)}`);
      if (z instanceof SVGPathElement) {
        let W = Ke(z), q = z.getTotalLength();
        W.attr("stroke-dasharray", q).attr("stroke-dashoffset", q).transition().attr("stroke-dashoffset", 0).on("end", () => {
          W.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
    }
    function Pe(T, z) {
      const q = (T == null ? void 0 : T.target).closest("div");
      Re(z, q, [z.x, z.y]);
    }
    function $e(T, z) {
      let W = T.target, q;
      W.nodeName === "textPath" ? q = W : q = W.closest(".link-container").querySelector("textPath");
      let G = Un(q);
      Re(z, q, G);
    }
    function Re(T, z, W) {
      let q = T instanceof Hm ? "node" : "link";
      const G = document.createElement("input");
      G.setAttribute("class", "label-input"), G.setAttribute("id", `${q}-label-input-field`), T.label == null ? G.value = "" : G.value = T.label, G.placeholder = `Enter ${q} label`, G.ondblclick = function(At) {
        Nt(At);
      };
      let me = !1;
      G.onkeyup = function(At) {
        At.key === "Enter" ? (dC(T, G.value, n.value), me = !0, G.blur()) : At.key === "Escape" && (G.value = "", G.blur());
      }, G.onblur = function() {
        me && (q === "link" && Qe(z), G.value === "" ? Gn(z, T, q) : (mo(G, z, T, q), q === "node" && Tt(z))), et.remove();
      };
      const et = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      et.setAttribute("width", "100%"), et.setAttribute("height", "100%"), et.setAttribute("x", `${W[0] - 80}`), et.setAttribute("y", `${W[1] - 12}`), et.append(G), n.value.select("svg").select("g").node().append(et), G.focus();
    }
    function Qe(T) {
      var W;
      const z = T.closest(".link-container");
      (W = z.querySelector("mjx-container")) == null || W.remove(), z.querySelector("div").setAttribute("class", "link-label-placeholder");
    }
    function Tt(T) {
      let z = T.closest(".node-container");
      const W = z.parentElement;
      z.remove(), W.append(z);
    }
    function Gn(T, z, W) {
      T.setAttribute("class", `${W}-label-placeholder`), T.textContent = "add label", z.label = void 0;
    }
    function mo(T, z, W, q) {
      z.setAttribute("class", `${q}-label`), z.textContent = T.value.trim(), W.label = z.textContent;
    }
    function Un(T) {
      let z = n.value.select("svg").node().getBoundingClientRect(), W = T.getBoundingClientRect(), q = (W.x - z.x - E) / P, G = (W.y - z.y - S) / P;
      return [q, G];
    }
    function go(T) {
      Ou(T.showNodeLabels), lt(T.nodePhysicsEnabled), vr(T.showLinkLabels), Mt(T.fixedLinkDistanceEnabled), Bu(T.zoomEnabled), u.persistSettingsLocalStorage = T.persistEnabled;
    }
    function lt(T) {
      u.nodePhysicsEnabled = T, jm(c, T, d, f);
    }
    function Mt(T) {
      u.fixedLinkDistanceEnabled = T, zm(c, s.value, u, T);
    }
    function vr(T) {
      u.showLinkLabels = T;
    }
    function Ou(T) {
      u.showNodeLabels = T;
    }
    function Bu(T) {
      u.zoomEnabled = T, Bi();
    }
    function os() {
      w == null || w.classed("hidden", !0).attr("marker-end", "null"), x = void 0, b = void 0, k = void 0;
    }
    function Fu(T) {
      let z, W;
      try {
        if (typeof T == "string")
          [z, W] = ZC(T);
        else if (typeof T == "object")
          [z, W] = JC(T);
        else {
          Hu("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (q) {
        Hu("Error during parsing:", `Invalid data format:
` + q);
        return;
      }
      ls(), Jm(z, W);
    }
    function Jm(T, z) {
      for (let q of T)
        Q(
          q.x,
          q.y,
          q.idImported,
          q.label,
          q.color
        );
      const W = (q) => s.value.nodes.find((G) => G.idImported === q);
      for (let q of z) {
        let G = W(q.sourceIdImported), me = W(q.targetIdImported);
        G && me && (Y(G, me, q.label, q.color), q.color && ka(m, u, q.color));
      }
    }
    function Du(T) {
      for (let z of T) {
        const W = s.value.links.filter((q) => q.id === z).map((q) => q.color).shift();
        W && (s.value.hasNonDefaultLinkColor(W, z) ? s.value.getLinkIdsWithNonDefaultLinkColors(
          W,
          z
        ).every(
          (me) => T.includes(me)
        ) && $s(m, W) : $s(m, W));
      }
    }
    function Bi() {
      c.stop(), n.value.selectChildren().remove(), h = void 0, E = 0, S = 0, P = 1, m = void 0, w = void 0, p = void 0, g = void 0, c = void 0, os(), F(), B();
    }
    function ls() {
      s.value.links.forEach((T) => xr(T, n.value)), s.value.nodes.forEach((T) => As(T, n.value)), s.value = new ed(), a.value = !1, Bi();
    }
    function Hu(T, z) {
      console.error(T + `
` + z), r.value = !0, o.value = T, l.value = z.toString(), window.setInterval(() => r.value = !1, 6e3);
    }
    return (T, z) => (ht(), el(Le, null, [
      nE,
      iE,
      u.hasToolbar ? (ht(), el("div", rE, [
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ce(({ props: W }) => [
            u.isGraphEditableInGUI ? (ht(), ln(ut, he({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, W, {
              variant: "plain",
              onClick: z[0] || (z[0] = (q) => Q())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ce(({ props: W }) => [
            u.isGraphEditableInGUI ? (ht(), ln(ut, he({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, W, {
              variant: "plain",
              onClick: z[1] || (z[1] = (q) => ls())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ce(({ props: W }) => [
            u.zoomEnabled ? (ht(), ln(ut, he({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, W, {
              variant: "plain",
              onClick: z[2] || (z[2] = (q) => Bi())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Lb, {
          "graph-as-tgf": s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !1, !1),
          "graph-as-json": s.value.toJSON(u.showNodeLabels, u.showLinkLabels, !0, !0, !0),
          onFileImported: Fu
        }, null, 8, ["graph-as-tgf", "graph-as-json"]),
        y(Rb),
        y(Ex, {
          config: u,
          "is-welcome": !i.value,
          onUpdateSettings: go
        }, null, 8, ["config", "is-welcome"])
      ])) : en("", !0),
      je(Ae("div", null, [
        y(Wv, {
          class: "info-text-background text-subtitle-1 text-grey",
          "show-controls-graph": "",
          "show-latex-info": "",
          "show-controls-environment": !1,
          "show-header": !1
        })
      ], 512), [
        [pt, !a.value]
      ]),
      y(la, {
        modelValue: r.value,
        "onUpdate:modelValue": z[3] || (z[3] = (W) => r.value = W),
        color: "error",
        variant: "tonal"
      }, {
        default: ce(() => [
          y(kt, { align: "center" }, {
            default: ce(() => [
              y(Ge, {
                icon: "$error",
                class: "ml-2"
              }),
              y(Gi, null, {
                default: ce(() => [
                  Ae("h4", null, dt(o.value), 1),
                  Ae("p", null, dt(l.value), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 64));
  }
}), lE = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text,.link-label-mathjax-container{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label,.link-label-mathjax-container .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden,.link-label-mathjax-container .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label.not-editable,.arc-path-text .link-label.not-editable,.line-reverse-path-text .link-label.not-editable,.arc-reverse-path-text .link-label.not-editable,.reflexive-path-text .link-label.not-editable,.link-label-mathjax-container .link-label.not-editable{cursor:pointer}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder,.link-label-mathjax-container .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden,.link-label-mathjax-container .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder.not-editable,.arc-path-text .link-label-placeholder.not-editable,.line-reverse-path-text .link-label-placeholder.not-editable,.arc-reverse-path-text .link-label-placeholder.not-editable,.reflexive-path-text .link-label-placeholder.not-editable,.link-label-mathjax-container .link-label-placeholder.not-editable{cursor:pointer}.line-path-text .link-label-placeholder.mjxhidden,.arc-path-text .link-label-placeholder.mjxhidden,.line-reverse-path-text .link-label-placeholder.mjxhidden,.arc-reverse-path-text .link-label-placeholder.mjxhidden,.reflexive-path-text .link-label-placeholder.mjxhidden,.link-label-mathjax-container .link-label-placeholder.mjxhidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:not(.on-deletion):hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.link-label-mathjax-container,.node-label-container{overflow:visible}.node-label{display:flex;justify-content:center;align-items:center;font-size:1rem;opacity:1;text-align:center;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label.not-editable{cursor:pointer}.node-label-placeholder{color:#696969;display:flex;justify-content:center;font-style:oblique;font-size:.85rem;opacity:1;pointer-events:all;cursor:text;position:relative;top:-6px}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder.not-editable{cursor:pointer}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text-background{width:50%;height:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}", sE = /* @__PURE__ */ xu(oE, [["styles", [lE]]]), Sa = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};
function aE(e, t) {
  const n = [];
  let i = [];
  const r = Ym(e), o = Km(e), l = (r.getDay() - Sa[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - Sa[t.slice(-2).toUpperCase()] + 7) % 7;
  for (let a = 0; a < l; a++) {
    const u = new Date(r);
    u.setDate(u.getDate() - (l - a)), i.push(u);
  }
  for (let a = 1; a <= o.getDate(); a++) {
    const u = new Date(e.getFullYear(), e.getMonth(), a);
    i.push(u), i.length === 7 && (n.push(i), i = []);
  }
  for (let a = 1; a < 7 - s; a++) {
    const u = new Date(o);
    u.setDate(u.getDate() + a), i.push(u);
  }
  return i.length > 0 && n.push(i), n;
}
function uE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function cE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function Ym(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Km(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function fE(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const dE = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Xm(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (dE.test(e))
      return fE(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const sd = new Date(2e3, 0, 2);
function hE(e) {
  const t = Sa[e.slice(-2).toUpperCase()];
  return Za(7).map((n) => {
    const i = new Date(sd);
    return i.setDate(sd.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function vE(e, t, n, i) {
  const r = Xm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
  if (typeof o == "function")
    return o(r, t, n);
  let l = {};
  switch (t) {
    case "fullDateWithWeekday":
      l = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      };
      break;
    case "hours12h":
      l = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "normalDateWithWeekday":
      l = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "keyboardDate":
      l = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      l = {
        month: "long",
        day: "numeric"
      };
      break;
    case "monthAndYear":
      l = {
        month: "long",
        year: "numeric"
      };
      break;
    case "month":
      l = {
        month: "long"
      };
      break;
    case "monthShort":
      l = {
        month: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(n).format(r.getDate());
    case "shortDate":
      l = {
        year: "2-digit",
        month: "numeric",
        day: "numeric"
      };
      break;
    case "weekdayShort":
      l = {
        weekday: "short"
      };
      break;
    case "year":
      l = {
        year: "numeric"
      };
      break;
    default:
      l = o ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, l).format(r);
}
function mE(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Nc(String(n.getMonth() + 1), 2, "0"), o = Nc(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function gE(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function yE(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function pE(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function bE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function wE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function xE(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function _E(e) {
  return e.getFullYear();
}
function kE(e) {
  return e.getMonth();
}
function SE(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function CE(e) {
  return e.getHours();
}
function EE(e) {
  return e.getMinutes();
}
function VE(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function LE(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function PE(e, t) {
  return Ca(e, t[0]) && TE(e, t[1]);
}
function IE(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Ca(e, t) {
  return e.getTime() > t.getTime();
}
function TE(e, t) {
  return e.getTime() < t.getTime();
}
function ad(e, t) {
  return e.getTime() === t.getTime();
}
function ME(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function AE(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function $E(e, t, n) {
  const i = new Date(e), r = new Date(t);
  switch (n) {
    case "years":
      return i.getFullYear() - r.getFullYear();
    case "quarters":
      return Math.floor((i.getMonth() - r.getMonth() + (i.getFullYear() - r.getFullYear()) * 12) / 4);
    case "months":
      return i.getMonth() - r.getMonth() + (i.getFullYear() - r.getFullYear()) * 12;
    case "weeks":
      return Math.floor((i.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((i.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((i.getTime() - r.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((i.getTime() - r.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((i.getTime() - r.getTime()) / 1e3);
    default:
      return i.getTime() - r.getTime();
  }
}
function NE(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function RE(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function OE(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function BE(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function FE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function DE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class HE {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return Xm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return mE(this, t);
  }
  parseISO(t) {
    return gE(t);
  }
  addMinutes(t, n) {
    return yE(t, n);
  }
  addHours(t, n) {
    return pE(t, n);
  }
  addDays(t, n) {
    return bE(t, n);
  }
  addWeeks(t, n) {
    return wE(t, n);
  }
  addMonths(t, n) {
    return xE(t, n);
  }
  getWeekArray(t) {
    return aE(t, this.locale);
  }
  startOfWeek(t) {
    return uE(t);
  }
  endOfWeek(t) {
    return cE(t);
  }
  startOfMonth(t) {
    return Ym(t);
  }
  endOfMonth(t) {
    return Km(t);
  }
  format(t, n) {
    return vE(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return ad(t, n);
  }
  isValid(t) {
    return IE(t);
  }
  isWithinRange(t, n) {
    return PE(t, n);
  }
  isAfter(t, n) {
    return Ca(t, n);
  }
  isBefore(t, n) {
    return !Ca(t, n) && !ad(t, n);
  }
  isSameDay(t, n) {
    return ME(t, n);
  }
  isSameMonth(t, n) {
    return AE(t, n);
  }
  setMinutes(t, n) {
    return RE(t, n);
  }
  setHours(t, n) {
    return NE(t, n);
  }
  setMonth(t, n) {
    return OE(t, n);
  }
  setYear(t, n) {
    return BE(t, n);
  }
  getDiff(t, n, i) {
    return $E(t, n, i);
  }
  getWeekdays() {
    return hE(this.locale);
  }
  getYear(t) {
    return _E(t);
  }
  getMonth(t) {
    return kE(t);
  }
  getNextMonth(t) {
    return SE(t);
  }
  getHours(t) {
    return CE(t);
  }
  getMinutes(t) {
    return EE(t);
  }
  startOfDay(t) {
    return FE(t);
  }
  endOfDay(t) {
    return DE(t);
  }
  startOfYear(t) {
    return VE(t);
  }
  endOfYear(t) {
    return LE(t);
  }
}
const jE = Symbol.for("vuetify:date-options"), ud = Symbol.for("vuetify:date-adapter");
function zE(e, t) {
  const n = Ft({
    adapter: HE,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, e);
  return {
    options: n,
    instance: GE(n, t)
  };
}
function GE(e, t) {
  const n = un(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return we(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const UE = Symbol.for("vuetify:goto");
function WE() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function qE(e, t) {
  return {
    rtl: t.isRtl,
    options: Ft(WE(), e)
  };
}
function Zm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = Ft(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = ip(i.defaults), a = y1(i.display, i.ssr), u = hp(i.theme), c = _p(i.icons), d = Ip(i.locale), f = zE(i.date, d), h = qE(i.goTo, d);
  return {
    install: (m) => {
      for (const p in l)
        m.directive(p, l[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in r)
        m.component(p, hn({
          ...r[p],
          name: p,
          aliasName: r[p].name
        }));
      if (u.install(m), m.provide(ir, s), m.provide(oa, a), m.provide(fl, u), m.provide(Qs, c), m.provide(dl, d), m.provide(jE, f.options), m.provide(ud, f.instance), m.provide(UE, h), Be && i.ssr)
        if (m.$nuxt)
          m.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: p
          } = m;
          m.mount = function() {
            const g = p(...arguments);
            return Ze(() => a.update()), m.mount = p, g;
          };
        }
      Lt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return un({
              defaults: Hi.call(this, ir),
              display: Hi.call(this, oa),
              theme: Hi.call(this, fl),
              icons: Hi.call(this, Qs),
              locale: Hi.call(this, dl),
              date: Hi.call(this, ud)
            });
          }
        }
      });
    },
    defaults: s,
    display: a,
    theme: u,
    icons: c,
    locale: d,
    date: f,
    goTo: h
  };
}
const YE = "3.5.9";
Zm.version = YE;
function Hi(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const KE = {
  collapse: "svg:M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
  complete: "svg:M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  cancel: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  close: "svg:M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  delete: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  // delete (e.g. v-chip close)
  clear: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  success: "svg:M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
  info: "svg:M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  warning: "svg:M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  error: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  prev: "svg:M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  next: "svg:M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  checkboxOn: "svg:M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  checkboxOff: "svg:M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  checkboxIndeterminate: "svg:M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  delimiter: "svg:M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  // for carousel
  sortAsc: "svg:M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
  sortDesc: "svg:M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
  expand: "svg:M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  menu: "svg:M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
  subgroup: "svg:M7,10L12,15L17,10H7Z",
  dropdown: "svg:M7,10L12,15L17,10H7Z",
  radioOn: "svg:M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z",
  radioOff: "svg:M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  edit: "svg:M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
  ratingEmpty: "svg:M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  ratingFull: "svg:M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
  ratingHalf: "svg:M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  loading: "svg:M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12",
  first: "svg:M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
  last: "svg:M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
  unfold: "svg:M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
  file: "svg:M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z",
  plus: "svg:M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  minus: "svg:M19,13H5V11H19V13Z",
  calendar: "svg:M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z",
  treeviewCollapse: "svg:M7,10L12,15L17,10H7Z",
  treeviewExpand: "svg:M10,17L15,12L10,7V17Z",
  eyeDropper: "svg:M19.35,11.72L17.22,13.85L15.81,12.43L8.1,20.14L3.5,22L2,20.5L3.86,15.9L11.57,8.19L10.15,6.78L12.28,4.65L19.35,11.72M16.76,3C17.93,1.83 19.83,1.83 21,3C22.17,4.17 22.17,6.07 21,7.24L19.08,9.16L14.84,4.92L16.76,3M5.56,17.03L4.5,19.5L6.97,18.44L14.4,11L13,9.6L5.56,17.03Z"
}, XE = {
  component: lu
};
var ZE = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", JE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", QE = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", eV = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", tV = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", nV = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", iV = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
Zm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...KE,
      addNode: iV,
      deleteGraph: JE,
      help: eV,
      importExport: QE,
      resetView: nV,
      settings: ZE,
      helpCircle: tV
    },
    sets: {
      mdi: XE
    }
  }
});
/*! (c) Andrea Giammarchi - ISC */
const rV = (() => {
  const e = "DOMContentLoaded", t = /* @__PURE__ */ new WeakMap(), n = [], i = (l) => {
    do
      if (l.nextSibling)
        return !0;
    while (l = l.parentNode);
    return !1;
  }, r = () => {
    n.splice(0).forEach((l) => {
      t.get(l[0]) !== !0 && (t.set(l[0], !0), l[0][l[1]]());
    });
  };
  document.addEventListener(e, r);
  class o extends HTMLElement {
    static withParsedCallback(s, a = "parsed") {
      const { prototype: u } = s, { connectedCallback: c } = u, d = a + "Callback", f = (v, m, p, g) => {
        m.disconnect(), p.removeEventListener(e, g), h(v);
      }, h = (v) => {
        n.length || requestAnimationFrame(r), n.push([v, d]);
      };
      return Object.defineProperties(
        u,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (c && c.apply(this, arguments), d in this && !t.has(this)) {
                const v = this, { ownerDocument: m } = v;
                if (t.set(v, !1), m.readyState === "complete" || i(v))
                  h(v);
                else {
                  const p = () => f(v, g, m, p);
                  m.addEventListener(e, p);
                  const g = new MutationObserver(() => {
                    i(v) && f(v, g, m, p);
                  });
                  g.observe(v.parentNode, { childList: !0, subtree: !0 });
                }
              }
            }
          },
          [a]: {
            configurable: !0,
            get() {
              return t.get(this) === !0;
            }
          }
        }
      ), s;
    }
  }
  return o.withParsedCallback(o);
})();
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function oV(e, t, n) {
  const i = /* @__PURE__ */ Mi(e);
  class r extends Ru {
    constructor(l) {
      super(i, l, t, n);
    }
  }
  return Oe(r, "def", i), r;
}
const lV = typeof HTMLElement < "u" ? rV : class {
};
class Ru extends lV {
  constructor(n, i = {}, r = {}, o) {
    super();
    /**
     * @internal
     */
    Oe(this, "_instance", null);
    Oe(this, "_connected", !1);
    Oe(this, "_resolved", !1);
    Oe(this, "_numberProps", null);
    Oe(this, "_styles");
    Oe(this, "_slots");
    Oe(this, "_ob", null);
    this._def = n, this._props = i, this._config = r, this._config = We(
      {
        shadowRoot: !0
      },
      this._config
    ), this._config.shadowRoot ? this.shadowRoot && o ? o(this._createVNode(), this._root) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def)) : o && o(this._createVNode(), this._root);
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._config.shadowRoot ? this._connect() : super.connectedCallback();
  }
  // use of parsedCallback when shadowRoot is disabled
  // to wait for slots to be parsed
  // see https://stackoverflow.com/a/52884370
  parsedCallback() {
    this._config.shadowRoot || this._connect();
  }
  _connect() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Ze(() => {
      this._connected || (Pc(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const o of r)
        this._setAttr(o.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const n = (r, o = !1) => {
      const { props: l, styles: s } = r;
      let a;
      if (l && !xe(l))
        for (const u in l) {
          const c = l[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = Os(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[yt(u)] = !0);
        }
      this._numberProps = a, o && this._resolveProps(r), this._config.shadowRoot || (this._slots = Array.from(this.children).map((u) => u.cloneNode(!0)), this.replaceChildren()), this._applyStyles(s), this._update();
    }, i = this._def.__asyncLoader;
    i ? i().then((r) => n(r, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: i } = n, r = xe(i) ? i : Object.keys(i || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(yt))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(l) {
          this._setProp(o, l);
        }
      });
  }
  _setAttr(n) {
    let i = this.getAttribute(n);
    const r = yt(n);
    this._numberProps && this._numberProps[r] && (i = Os(i)), this._setProp(r, i, !1);
  }
  /**
   * @internal
   */
  _getProp(n) {
    return this._props[n];
  }
  /**
   * @internal
   */
  _setProp(n, i, r = !0, o = !0) {
    i !== this._props[n] && (this._props[n] = i, o && this._instance && this._update(), r && (i === !0 ? this.setAttribute(tn(n), "") : typeof i == "string" || typeof i == "number" ? this.setAttribute(tn(n), i + "") : i || this.removeAttribute(tn(n))));
  }
  _update() {
    Pc(this._createVNode(), this._root);
  }
  _createVNode() {
    let n = null;
    this._config.shadowRoot || (n = () => {
      const r = (o) => {
        const l = {};
        for (let s = 0, a = o.length; s < a; s++) {
          const u = o[s];
          l[u.nodeName] = u.nodeValue;
        }
        return l;
      };
      return this._slots.map((o) => {
        const l = o.attributes ? r(o.attributes) : {};
        return l.innerHTML = o.innerHTML, y(o.tagName, l, null);
      });
    });
    const i = y(this._def, We({}, this._props), n);
    return this._instance || (i.ce = (r) => {
      this._instance = r, this._config.shadowRoot && (r.isCE = !0);
      const o = (s, a) => {
        this.dispatchEvent(
          new CustomEvent(s, {
            detail: a
          })
        );
      };
      r.emit = (s, ...a) => {
        o(s, a), tn(s) !== s && o(tn(s), a);
      };
      let l = this;
      for (; l = l && (l.parentNode || l.host); )
        if (l instanceof Ru) {
          r.parent = l._instance, r.provides = l._instance.provides;
          break;
        }
    }), i;
  }
  _applyStyles(n) {
    n && n.forEach((i) => {
      const r = document.createElement("style");
      r.textContent = i, this._root.appendChild(r);
    });
  }
}
customElements.define(
  "graph-component",
  // Menu Version without CLI functionality
  // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
  // CLI Version with ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  // CLI Version with Latex without ShadowRoot for MathJax to work
  /* @__PURE__ */ oV(sE, { shadowRoot: !1 })
);
