var Xm = Object.defineProperty;
var Zm = (e, t, n) => t in e ? Xm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Qe = (e, t, n) => Zm(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ea(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const Fe = {}, Ki = [], Gt = () => {
}, Jm = () => !1, Pl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Va = (e) => e.startsWith("onUpdate:"), qe = Object.assign, La = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Qm = Object.prototype.hasOwnProperty, Ie = (e, t) => Qm.call(e, t), we = Array.isArray, Xi = (e) => Il(e) === "[object Map]", ad = (e) => Il(e) === "[object Set]", Ee = (e) => typeof e == "function", Ye = (e) => typeof e == "string", cr = (e) => typeof e == "symbol", Oe = (e) => e !== null && typeof e == "object", ud = (e) => (Oe(e) || Ee(e)) && Ee(e.then) && Ee(e.catch), cd = Object.prototype.toString, Il = (e) => cd.call(e), eg = (e) => Il(e).slice(8, -1), fd = (e) => Il(e) === "[object Object]", Pa = (e) => Ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ir = /* @__PURE__ */ Ea(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Tl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, tg = /-(\w)/g, gt = Tl((e) => e.replace(tg, (t, n) => n ? n.toUpperCase() : "")), ng = /\B([A-Z])/g, en = Tl(
  (e) => e.replace(ng, "-$1").toLowerCase()
), Dn = Tl((e) => e.charAt(0).toUpperCase() + e.slice(1)), as = Tl((e) => e ? `on${Dn(e)}` : ""), ni = (e, t) => !Object.is(e, t), us = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Zo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ig = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Os = (e) => {
  const t = Ye(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Fu;
const dd = () => Fu || (Fu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ia(e) {
  if (we(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = Ye(i) ? sg(i) : Ia(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Ye(e) || Oe(e))
    return e;
}
const rg = /;(?![^(]*\))/g, og = /:([^]+)/, lg = /\/\*[^]*?\*\//g;
function sg(e) {
  const t = {};
  return e.replace(lg, "").split(rg).forEach((n) => {
    if (n) {
      const i = n.split(og);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function Ta(e) {
  let t = "";
  if (Ye(e))
    t = e;
  else if (we(e))
    for (let n = 0; n < e.length; n++) {
      const i = Ta(e[n]);
      i && (t += i + " ");
    }
  else if (Oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ag = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ug = /* @__PURE__ */ Ea(ag);
function hd(e) {
  return !!e || e === "";
}
const ft = (e) => Ye(e) ? e : e == null ? "" : we(e) || Oe(e) && (e.toString === cd || !Ee(e.toString)) ? JSON.stringify(e, vd, 2) : String(e), vd = (e, t) => t && t.__v_isRef ? vd(e, t.value) : Xi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[cs(i, o) + " =>"] = r, n),
    {}
  )
} : ad(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => cs(n))
} : cr(t) ? cs(t) : Oe(t) && !we(t) && !fd(t) ? String(t) : t, cs = (e, t = "") => {
  var n;
  return cr(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let $t;
class md {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = $t, !t && $t && (this.index = ($t.scopes || ($t.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = $t;
      try {
        return $t = this, t();
      } finally {
        $t = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    $t = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    $t = this.parent;
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
  return new md(e);
}
function cg(e, t = $t) {
  t && t.active && t.effects.push(e);
}
function fg() {
  return $t;
}
function pt(e) {
  $t && $t.cleanups.push(e);
}
let wi;
class Aa {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, cg(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ii();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (dg(n.computed), this._dirtyLevel >= 4))
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
      return ei = !0, wi = this, this._runnings++, Du(this), this.fn();
    } finally {
      Hu(this), this._runnings--, wi = n, ei = t;
    }
  }
  stop() {
    var t;
    this.active && (Du(this), Hu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function dg(e) {
  return e.value;
}
function Du(e) {
  e._trackId++, e._depsLength = 0;
}
function Hu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      gd(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function gd(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let ei = !0, Bs = 0;
const yd = [];
function Ii() {
  yd.push(ei), ei = !1;
}
function Ti() {
  const e = yd.pop();
  ei = e === void 0 ? !0 : e;
}
function $a() {
  Bs++;
}
function Na() {
  for (Bs--; !Bs && Fs.length; )
    Fs.shift()();
}
function pd(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && gd(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Fs = [];
function bd(e, t, n) {
  $a();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && Fs.push(i.scheduler)));
  }
  Na();
}
const wd = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Jo = /* @__PURE__ */ new WeakMap(), xi = Symbol(""), Ds = Symbol("");
function Vt(e, t, n) {
  if (ei && wi) {
    let i = Jo.get(e);
    i || Jo.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = wd(() => i.delete(n))), pd(
      wi,
      r
    );
  }
}
function Nn(e, t, n, i, r, o) {
  const l = Jo.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && we(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !cr(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        we(e) ? Pa(n) && s.push(l.get("length")) : (s.push(l.get(xi)), Xi(e) && s.push(l.get(Ds)));
        break;
      case "delete":
        we(e) || (s.push(l.get(xi)), Xi(e) && s.push(l.get(Ds)));
        break;
      case "set":
        Xi(e) && s.push(l.get(xi));
        break;
    }
  $a();
  for (const a of s)
    a && bd(
      a,
      4
    );
  Na();
}
function hg(e, t) {
  var n;
  return (n = Jo.get(e)) == null ? void 0 : n.get(t);
}
const vg = /* @__PURE__ */ Ea("__proto__,__v_isRef,__isVue"), xd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(cr)
), zu = /* @__PURE__ */ mg();
function mg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = xe(this);
      for (let o = 0, l = this.length; o < l; o++)
        Vt(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(xe)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ii(), $a();
      const i = xe(this)[t].apply(this, n);
      return Na(), Ti(), i;
    };
  }), e;
}
function gg(e) {
  const t = xe(this);
  return Vt(t, "has", e), t.hasOwnProperty(e);
}
class _d {
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
      return i === (r ? o ? Pg : Ed : o ? Cd : kd).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = we(t);
    if (!r) {
      if (l && Ie(zu, n))
        return Reflect.get(zu, n, i);
      if (n === "hasOwnProperty")
        return gg;
    }
    const s = Reflect.get(t, n, i);
    return (cr(n) ? xd.has(n) : vg(n)) || (r || Vt(t, "get", n), o) ? s : Ue(s) ? l && Pa(n) ? s : s.value : Oe(s) ? r ? io(s) : an(s) : s;
  }
}
class Sd extends _d {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = ir(o);
      if (!Qo(i) && !ir(i) && (o = xe(o), i = xe(i)), !we(t) && Ue(o) && !Ue(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = we(t) && Pa(n) ? Number(n) < t.length : Ie(t, n), s = Reflect.set(t, n, i, r);
    return t === xe(r) && (l ? ni(i, o) && Nn(t, "set", n, i) : Nn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Ie(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && Nn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!cr(n) || !xd.has(n)) && Vt(t, "has", n), i;
  }
  ownKeys(t) {
    return Vt(
      t,
      "iterate",
      we(t) ? "length" : xi
    ), Reflect.ownKeys(t);
  }
}
class yg extends _d {
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
const pg = /* @__PURE__ */ new Sd(), bg = /* @__PURE__ */ new yg(), wg = /* @__PURE__ */ new Sd(
  !0
), Ra = (e) => e, Ml = (e) => Reflect.getPrototypeOf(e);
function bo(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = xe(e), o = xe(t);
  n || (ni(t, o) && Vt(r, "get", t), Vt(r, "get", o));
  const { has: l } = Ml(r), s = i ? Ra : n ? Fa : Or;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function wo(e, t = !1) {
  const n = this.__v_raw, i = xe(n), r = xe(e);
  return t || (ni(e, r) && Vt(i, "has", e), Vt(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function xo(e, t = !1) {
  return e = e.__v_raw, !t && Vt(xe(e), "iterate", xi), Reflect.get(e, "size", e);
}
function ju(e) {
  e = xe(e);
  const t = xe(this);
  return Ml(t).has.call(t, e) || (t.add(e), Nn(t, "add", e, e)), this;
}
function Gu(e, t) {
  t = xe(t);
  const n = xe(this), { has: i, get: r } = Ml(n);
  let o = i.call(n, e);
  o || (e = xe(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? ni(t, l) && Nn(n, "set", e, t) : Nn(n, "add", e, t), this;
}
function Uu(e) {
  const t = xe(this), { has: n, get: i } = Ml(t);
  let r = n.call(t, e);
  r || (e = xe(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && Nn(t, "delete", e, void 0), o;
}
function Wu() {
  const e = xe(this), t = e.size !== 0, n = e.clear();
  return t && Nn(e, "clear", void 0, void 0), n;
}
function _o(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = xe(l), a = t ? Ra : e ? Fa : Or;
    return !e && Vt(s, "iterate", xi), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function So(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = xe(r), l = Xi(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? Ra : t ? Fa : Or;
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
function xg() {
  const e = {
    get(o) {
      return bo(this, o);
    },
    get size() {
      return xo(this);
    },
    has: wo,
    add: ju,
    set: Gu,
    delete: Uu,
    clear: Wu,
    forEach: _o(!1, !1)
  }, t = {
    get(o) {
      return bo(this, o, !1, !0);
    },
    get size() {
      return xo(this);
    },
    has: wo,
    add: ju,
    set: Gu,
    delete: Uu,
    clear: Wu,
    forEach: _o(!1, !0)
  }, n = {
    get(o) {
      return bo(this, o, !0);
    },
    get size() {
      return xo(this, !0);
    },
    has(o) {
      return wo.call(this, o, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: _o(!0, !1)
  }, i = {
    get(o) {
      return bo(this, o, !0, !0);
    },
    get size() {
      return xo(this, !0);
    },
    has(o) {
      return wo.call(this, o, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: _o(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = So(
      o,
      !1,
      !1
    ), n[o] = So(
      o,
      !0,
      !1
    ), t[o] = So(
      o,
      !1,
      !0
    ), i[o] = So(
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
  _g,
  Sg,
  kg,
  Cg
] = /* @__PURE__ */ xg();
function Oa(e, t) {
  const n = t ? e ? Cg : kg : e ? Sg : _g;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Ie(n, r) && r in i ? n : i,
    r,
    o
  );
}
const Eg = {
  get: /* @__PURE__ */ Oa(!1, !1)
}, Vg = {
  get: /* @__PURE__ */ Oa(!1, !0)
}, Lg = {
  get: /* @__PURE__ */ Oa(!0, !1)
}, kd = /* @__PURE__ */ new WeakMap(), Cd = /* @__PURE__ */ new WeakMap(), Ed = /* @__PURE__ */ new WeakMap(), Pg = /* @__PURE__ */ new WeakMap();
function Ig(e) {
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
function Tg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ig(eg(e));
}
function an(e) {
  return ir(e) ? e : Ba(
    e,
    !1,
    pg,
    Eg,
    kd
  );
}
function Mg(e) {
  return Ba(
    e,
    !1,
    wg,
    Vg,
    Cd
  );
}
function io(e) {
  return Ba(
    e,
    !0,
    bg,
    Lg,
    Ed
  );
}
function Ba(e, t, n, i, r) {
  if (!Oe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = Tg(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Zi(e) {
  return ir(e) ? Zi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ir(e) {
  return !!(e && e.__v_isReadonly);
}
function Qo(e) {
  return !!(e && e.__v_isShallow);
}
function Vd(e) {
  return Zi(e) || ir(e);
}
function xe(e) {
  const t = e && e.__v_raw;
  return t ? xe(t) : e;
}
function Ld(e) {
  return Object.isExtensible(e) && Zo(e, "__v_skip", !0), e;
}
const Or = (e) => Oe(e) ? an(e) : e, Fa = (e) => Oe(e) ? io(e) : e;
class Pd {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Aa(
      () => t(this._value),
      () => Fo(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = xe(this);
    return (!t._cacheable || t.effect.dirty) && ni(t._value, t._value = t.effect.run()) && Fo(t, 4), Id(t), t.effect._dirtyLevel >= 2 && Fo(t, 2), t._value;
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
function Ag(e, t, n = !1) {
  let i, r;
  const o = Ee(e);
  return o ? (i = e, r = Gt) : (i = e.get, r = e.set), new Pd(i, r, o || !r, n);
}
function Id(e) {
  var t;
  ei && wi && (e = xe(e), pd(
    wi,
    (t = e.dep) != null ? t : e.dep = wd(
      () => e.dep = void 0,
      e instanceof Pd ? e : void 0
    )
  ));
}
function Fo(e, t = 4, n) {
  e = xe(e);
  const i = e.dep;
  i && bd(
    i,
    t
  );
}
function Ue(e) {
  return !!(e && e.__v_isRef === !0);
}
function ee(e) {
  return Td(e, !1);
}
function pe(e) {
  return Td(e, !0);
}
function Td(e, t) {
  return Ue(e) ? e : new $g(e, t);
}
class $g {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : xe(t), this._value = n ? t : Or(t);
  }
  get value() {
    return Id(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Qo(t) || ir(t);
    t = n ? t : xe(t), ni(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Or(t), Fo(this, 4));
  }
}
function nn(e) {
  return Ue(e) ? e.value : e;
}
const Ng = {
  get: (e, t, n) => nn(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return Ue(r) && !Ue(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function Md(e) {
  return Zi(e) ? e : new Proxy(e, Ng);
}
function Da(e) {
  const t = we(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Ad(e, n);
  return t;
}
class Rg {
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
    return hg(xe(this._object), this._key);
  }
}
class Og {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function ae(e, t, n) {
  return Ue(e) ? e : Ee(e) ? new Og(e) : Oe(e) && arguments.length > 1 ? Ad(e, t, n) : ee(e);
}
function Ad(e, t, n) {
  const i = e[t];
  return Ue(i) ? i : new Rg(e, t, n);
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
    Al(r, t, n);
  }
}
function Wt(e, t, n, i) {
  if (Ee(e)) {
    const o = ti(e, t, n, i);
    return o && ud(o) && o.catch((l) => {
      Al(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Wt(e[o], t, n, i));
  return r;
}
function Al(e, t, n, i = !0) {
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
  Bg(e, n, r, i);
}
function Bg(e, t, n, i = !0) {
  console.error(e);
}
let Br = !1, Hs = !1;
const st = [];
let xn = 0;
const Ji = [];
let Kn = null, vi = 0;
const $d = /* @__PURE__ */ Promise.resolve();
let Ha = null;
function Ke(e) {
  const t = Ha || $d;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fg(e) {
  let t = xn + 1, n = st.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = st[i], o = Fr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function za(e) {
  (!st.length || !st.includes(
    e,
    Br && e.allowRecurse ? xn + 1 : xn
  )) && (e.id == null ? st.push(e) : st.splice(Fg(e.id), 0, e), Nd());
}
function Nd() {
  !Br && !Hs && (Hs = !0, Ha = $d.then(Od));
}
function Dg(e) {
  const t = st.indexOf(e);
  t > xn && st.splice(t, 1);
}
function Hg(e) {
  we(e) ? Ji.push(...e) : (!Kn || !Kn.includes(
    e,
    e.allowRecurse ? vi + 1 : vi
  )) && Ji.push(e), Nd();
}
function qu(e, t, n = Br ? xn + 1 : 0) {
  for (; n < st.length; n++) {
    const i = st[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      st.splice(n, 1), n--, i();
    }
  }
}
function Rd(e) {
  if (Ji.length) {
    const t = [...new Set(Ji)].sort(
      (n, i) => Fr(n) - Fr(i)
    );
    if (Ji.length = 0, Kn) {
      Kn.push(...t);
      return;
    }
    for (Kn = t, vi = 0; vi < Kn.length; vi++)
      Kn[vi]();
    Kn = null, vi = 0;
  }
}
const Fr = (e) => e.id == null ? 1 / 0 : e.id, zg = (e, t) => {
  const n = Fr(e) - Fr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Od(e) {
  Hs = !1, Br = !0, st.sort(zg);
  try {
    for (xn = 0; xn < st.length; xn++) {
      const t = st[xn];
      t && t.active !== !1 && ti(t, null, 14);
    }
  } finally {
    xn = 0, st.length = 0, Rd(), Br = !1, Ha = null, (st.length || Ji.length) && Od();
  }
}
function jg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || Fe;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = i[c] || Fe;
    f && (r = n.map((h) => Ye(h) ? h.trim() : h)), d && (r = n.map(ig));
  }
  let s, a = i[s = as(t)] || // also try camelCase event handler (#2249)
  i[s = as(gt(t))];
  !a && o && (a = i[s = as(en(t))]), a && Wt(
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
    e.emitted[s] = !0, Wt(
      u,
      e,
      6,
      r
    );
  }
}
function Bd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Ee(e)) {
    const a = (u) => {
      const c = Bd(u, t, !0);
      c && (s = !0, qe(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Oe(e) && i.set(e, null), null) : (we(o) ? o.forEach((a) => l[a] = null) : qe(l, o), Oe(e) && i.set(e, l), l);
}
function $l(e, t) {
  return !e || !Pl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ie(e, t[0].toLowerCase() + t.slice(1)) || Ie(e, en(t)) || Ie(e, t));
}
let vt = null, Fd = null;
function el(e) {
  const t = vt;
  return vt = e, Fd = e && e.type.__scopeId || null, t;
}
function ce(e, t = vt, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && ac(-1);
    const o = el(t);
    let l;
    try {
      l = e(...r);
    } finally {
      el(o), i._d && ac(1);
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
  const w = el(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, S = b;
      p = bn(
        c.call(
          S,
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
      p = bn(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? a : Gg(a);
    }
  } catch (b) {
    $r.length = 0, Al(b, e, 1), p = y(qt);
  }
  let x = p;
  if (g && m !== !1) {
    const b = Object.keys(g), { shapeFlag: S } = x;
    b.length && S & 7 && (l && b.some(Va) && (g = Ug(
      g,
      l
    )), x = Rn(x, g));
  }
  return n.dirs && (x = Rn(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), p = x, el(w), p;
}
const Gg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Pl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ug = (e, t) => {
  const n = {};
  for (const i in e)
    (!Va(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function Wg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? Yu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== i[f] && !$l(u, f))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? Yu(i, l, u) : !0 : !!l;
  return !1;
}
function Yu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !$l(n, o))
      return !0;
  }
  return !1;
}
function qg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Dd = "components", Yg = "directives", Kg = Symbol.for("v-ndc");
function Xg(e) {
  return Ye(e) && Hd(Dd, e, !1) || e;
}
function un(e) {
  return Hd(Yg, e);
}
function Hd(e, t, n = !0, i = !1) {
  const r = vt || nt;
  if (r) {
    const o = r.type;
    if (e === Dd) {
      const s = j0(
        o,
        !1
      );
      if (s && (s === t || s === gt(t) || s === Dn(gt(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ku(r[e] || o[e], t) || // global registration
      Ku(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function Ku(e, t) {
  return e && (e[t] || e[gt(t)] || e[Dn(gt(t))]);
}
const Zg = (e) => e.__isSuspense;
function Jg(e, t) {
  t && t.pendingBranch ? we(e) ? t.effects.push(...e) : t.effects.push(e) : Hg(e);
}
const Qg = Symbol.for("v-scx"), e0 = () => He(Qg);
function kn(e, t) {
  return ja(e, null, t);
}
const ko = {};
function be(e, t, n) {
  return ja(e, t, n);
}
function ja(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = Fe) {
  if (t && o) {
    const E = t;
    t = (...k) => {
      E(...k), S();
    };
  }
  const a = nt, u = (E) => i === !0 ? E : (
    // for deep: false, only traverse root-level properties
    gi(E, i === !1 ? 1 : void 0)
  );
  let c, d = !1, f = !1;
  if (Ue(e) ? (c = () => e.value, d = Qo(e)) : Zi(e) ? (c = () => u(e), d = !0) : we(e) ? (f = !0, d = e.some((E) => Zi(E) || Qo(E)), c = () => e.map((E) => {
    if (Ue(E))
      return E.value;
    if (Zi(E))
      return u(E);
    if (Ee(E))
      return ti(E, a, 2);
  })) : Ee(e) ? t ? c = () => ti(e, a, 2) : c = () => (h && h(), Wt(
    e,
    a,
    3,
    [v]
  )) : c = Gt, t && i) {
    const E = c;
    c = () => gi(E());
  }
  let h, v = (E) => {
    h = x.onStop = () => {
      ti(E, a, 4), h = x.onStop = void 0;
    };
  }, m;
  if (Dl)
    if (v = Gt, t ? n && Wt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const E = e0();
      m = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return Gt;
  let p = f ? new Array(e.length).fill(ko) : ko;
  const g = () => {
    if (!(!x.active || !x.dirty))
      if (t) {
        const E = x.run();
        (i || d || (f ? E.some((k, P) => ni(k, p[P])) : ni(E, p))) && (h && h(), Wt(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          p === ko ? void 0 : f && p[0] === ko ? [] : p,
          v
        ]), p = E);
      } else
        x.run();
  };
  g.allowRecurse = !!t;
  let w;
  r === "sync" ? w = g : r === "post" ? w = () => kt(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), w = () => za(g));
  const x = new Aa(c, Gt, w), b = fg(), S = () => {
    x.stop(), b && La(b.effects, x);
  };
  return t ? n ? g() : p = x.run() : r === "post" ? kt(
    x.run.bind(x),
    a && a.suspense
  ) : x.run(), m && m.push(S), S;
}
function t0(e, t, n) {
  const i = this.proxy, r = Ye(e) ? e.includes(".") ? zd(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Ee(t) ? o = t : (o = t.handler, n = t);
  const l = oo(this), s = ja(r, o.bind(i), n);
  return l(), s;
}
function zd(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function gi(e, t, n = 0, i) {
  if (!Oe(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), Ue(e))
    gi(e.value, t, n, i);
  else if (we(e))
    for (let r = 0; r < e.length; r++)
      gi(e[r], t, n, i);
  else if (ad(e) || Xi(e))
    e.forEach((r) => {
      gi(r, t, n, i);
    });
  else if (fd(e))
    for (const r in e)
      gi(e[r], t, n, i);
  return e;
}
function De(e, t) {
  if (vt === null)
    return e;
  const n = Hl(vt) || vt.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = Fe] = t[r];
    o && (Ee(o) && (o = {
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
    a && (Ii(), Wt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), Ti());
  }
}
const Xn = Symbol("_leaveCb"), Co = Symbol("_enterCb");
function jd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return cn(() => {
    e.isMounted = !0;
  }), fn(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ht = [Function, Array], Gd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ht,
  onEnter: Ht,
  onAfterEnter: Ht,
  onEnterCancelled: Ht,
  // leave
  onBeforeLeave: Ht,
  onLeave: Ht,
  onAfterLeave: Ht,
  onLeaveCancelled: Ht,
  // appear
  onBeforeAppear: Ht,
  onAppear: Ht,
  onAfterAppear: Ht,
  onAppearCancelled: Ht
}, n0 = {
  name: "BaseTransition",
  props: Gd,
  setup(e, { slots: t }) {
    const n = Ka(), i = jd();
    return () => {
      const r = t.default && Ga(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const f of r)
          if (f.type !== qt) {
            o = f;
            break;
          }
      }
      const l = xe(e), { mode: s } = l;
      if (i.isLeaving)
        return ds(o);
      const a = Xu(o);
      if (!a)
        return ds(o);
      const u = Dr(
        a,
        l,
        i,
        n
      );
      Hr(a, u);
      const c = n.subTree, d = c && Xu(c);
      if (d && d.type !== qt && !mi(a, d)) {
        const f = Dr(
          d,
          l,
          i,
          n
        );
        if (Hr(d, f), s === "out-in")
          return i.isLeaving = !0, f.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, ds(o);
        s === "in-out" && a.type !== qt && (f.delayLeave = (h, v, m) => {
          const p = Ud(
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
}, i0 = n0;
function Ud(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function Dr(e, t, n, i) {
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
  } = t, x = String(e.key), b = Ud(n, e), S = (P, $) => {
    P && Wt(
      P,
      i,
      9,
      $
    );
  }, E = (P, $) => {
    const R = $[1];
    S(P, $), we(P) ? P.every((D) => D.length <= 1) && R() : P.length <= 1 && R();
  }, k = {
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
      R && mi(e, R) && R.el[Xn] && R.el[Xn](), S($, [P]);
    },
    enter(P) {
      let $ = a, R = u, D = c;
      if (!n.isMounted)
        if (r)
          $ = p || a, R = g || u, D = w || c;
        else
          return;
      let L = !1;
      const I = P[Co] = (_) => {
        L || (L = !0, _ ? S(D, [P]) : S(R, [P]), k.delayedLeave && k.delayedLeave(), P[Co] = void 0);
      };
      $ ? E($, [P, I]) : I();
    },
    leave(P, $) {
      const R = String(e.key);
      if (P[Co] && P[Co](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      S(d, [P]);
      let D = !1;
      const L = P[Xn] = (I) => {
        D || (D = !0, $(), I ? S(v, [P]) : S(h, [P]), P[Xn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, f ? E(f, [P, L]) : L();
    },
    clone(P) {
      return Dr(P, t, n, i);
    }
  };
  return k;
}
function ds(e) {
  if (Nl(e))
    return e = Rn(e), e.children = null, e;
}
function Xu(e) {
  return Nl(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Hr(e, t) {
  e.shapeFlag & 6 && e.component ? Hr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ga(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Ve ? (l.patchFlag & 128 && r++, i = i.concat(
      Ga(l.children, t, s)
    )) : (t || l.type !== qt) && i.push(s != null ? Rn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Mi(e, t) {
  return Ee(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    qe({ name: e.name }, t, { setup: e })
  ) : e;
}
const Do = (e) => !!e.type.__asyncLoader, Nl = (e) => e.type.__isKeepAlive;
function r0(e, t) {
  Wd(e, "a", t);
}
function o0(e, t) {
  Wd(e, "da", t);
}
function Wd(e, t, n = nt) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Rl(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Nl(r.parent.vnode) && l0(i, t, n, r), r = r.parent;
  }
}
function l0(e, t, n, i) {
  const r = Rl(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  Bl(() => {
    La(i[t], r);
  }, n);
}
function Rl(e, t, n = nt, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      Ii();
      const s = oo(n), a = Wt(t, n, e, l);
      return s(), Ti(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const Hn = (e) => (t, n = nt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Dl || e === "sp") && Rl(e, (...i) => t(...i), n)
), Ol = Hn("bm"), cn = Hn("m"), s0 = Hn("bu"), qd = Hn("u"), fn = Hn("bum"), Bl = Hn("um"), a0 = Hn("sp"), u0 = Hn(
  "rtg"
), c0 = Hn(
  "rtc"
);
function f0(e, t = nt) {
  Rl("ec", e, t);
}
function Zu(e, t, n, i) {
  let r;
  const o = n;
  if (we(e) || Ye(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (Oe(e))
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
const zs = (e) => e ? oh(e) ? Hl(e) || e.proxy : zs(e.parent) : null, Tr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ qe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => zs(e.parent),
    $root: (e) => zs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ua(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, za(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ke.bind(e.proxy)),
    $watch: (e) => t0.bind(e)
  })
), hs = (e, t) => e !== Fe && !e.__isScriptSetup && Ie(e, t), d0 = {
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
        if (r !== Fe && Ie(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Ie(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== Fe && Ie(n, t))
          return l[t] = 4, n[t];
        js && (l[t] = 0);
      }
    }
    const c = Tr[t];
    let d, f;
    if (c)
      return t === "$attrs" && Vt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== Fe && Ie(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Ie(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return hs(r, t) ? (r[t] = n, !0) : i !== Fe && Ie(i, t) ? (i[t] = n, !0) : Ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== Fe && Ie(e, l) || hs(t, l) || (s = o[0]) && Ie(s, l) || Ie(i, l) || Ie(Tr, l) || Ie(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ju(e) {
  return we(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let js = !0;
function h0(e) {
  const t = Ua(e), n = e.proxy, i = e.ctx;
  js = !1, t.beforeCreate && Qu(t.beforeCreate, e, "bc");
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
    render: S,
    renderTracked: E,
    renderTriggered: k,
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
  if (u && v0(u, i, null), l)
    for (const z in l) {
      const N = l[z];
      Ee(N) && (i[z] = N.bind(n));
    }
  if (r) {
    const z = r.call(n, n);
    Oe(z) && (e.data = an(z));
  }
  if (js = !0, o)
    for (const z in o) {
      const N = o[z], F = Ee(N) ? N.bind(n, n) : Ee(N.get) ? N.get.bind(n, n) : Gt, B = !Ee(N) && Ee(N.set) ? N.set.bind(n) : Gt, H = C({
        get: F,
        set: B
      });
      Object.defineProperty(i, z, {
        enumerable: !0,
        configurable: !0,
        get: () => H.value,
        set: (W) => H.value = W
      });
    }
  if (s)
    for (const z in s)
      Yd(s[z], i, n, z);
  if (a) {
    const z = Ee(a) ? a.call(n) : a;
    Reflect.ownKeys(z).forEach((N) => {
      ut(N, z[N]);
    });
  }
  c && Qu(c, e, "c");
  function M(z, N) {
    we(N) ? N.forEach((F) => z(F.bind(n))) : N && z(N.bind(n));
  }
  if (M(Ol, d), M(cn, f), M(s0, h), M(qd, v), M(r0, m), M(o0, p), M(f0, P), M(c0, E), M(u0, k), M(fn, w), M(Bl, b), M(a0, $), we(R))
    if (R.length) {
      const z = e.exposed || (e.exposed = {});
      R.forEach((N) => {
        Object.defineProperty(z, N, {
          get: () => n[N],
          set: (F) => n[N] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Gt && (e.render = S), D != null && (e.inheritAttrs = D), L && (e.components = L), I && (e.directives = I);
}
function v0(e, t, n = Gt) {
  we(e) && (e = Gs(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Oe(r) ? "default" in r ? o = He(
      r.from || i,
      r.default,
      !0
    ) : o = He(r.from || i) : o = He(r), Ue(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function Qu(e, t, n) {
  Wt(
    we(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Yd(e, t, n, i) {
  const r = i.includes(".") ? zd(n, i) : () => n[i];
  if (Ye(e)) {
    const o = t[e];
    Ee(o) && be(r, o);
  } else if (Ee(e))
    be(r, e.bind(n));
  else if (Oe(e))
    if (we(e))
      e.forEach((o) => Yd(o, t, n, i));
    else {
      const o = Ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ee(o) && be(r, o, e);
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
    (u) => tl(a, u, l, !0)
  ), tl(a, t, l)), Oe(t) && o.set(t, a), a;
}
function tl(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && tl(e, o, n, !0), r && r.forEach(
    (l) => tl(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = m0[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const m0 = {
  data: ec,
  props: tc,
  emits: tc,
  // objects
  methods: Er,
  computed: Er,
  // lifecycle
  beforeCreate: ct,
  created: ct,
  beforeMount: ct,
  mounted: ct,
  beforeUpdate: ct,
  updated: ct,
  beforeDestroy: ct,
  beforeUnmount: ct,
  destroyed: ct,
  unmounted: ct,
  activated: ct,
  deactivated: ct,
  errorCaptured: ct,
  serverPrefetch: ct,
  // assets
  components: Er,
  directives: Er,
  // watch
  watch: y0,
  // provide / inject
  provide: ec,
  inject: g0
};
function ec(e, t) {
  return t ? e ? function() {
    return qe(
      Ee(e) ? e.call(this, this) : e,
      Ee(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function g0(e, t) {
  return Er(Gs(e), Gs(t));
}
function Gs(e) {
  if (we(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ct(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Er(e, t) {
  return e ? qe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function tc(e, t) {
  return e ? we(e) && we(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : qe(
    /* @__PURE__ */ Object.create(null),
    Ju(e),
    Ju(t ?? {})
  ) : t;
}
function y0(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = qe(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = ct(e[i], t[i]);
  return n;
}
function Kd() {
  return {
    app: null,
    config: {
      isNativeTag: Jm,
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
let p0 = 0;
function b0(e, t) {
  return function(i, r = null) {
    Ee(i) || (i = qe({}, i)), r != null && !Oe(r) && (r = null);
    const o = Kd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: p0++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: U0,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && Ee(u.install) ? (l.add(u), u.install(a, ...c)) : Ee(u) && (l.add(u), u(a, ...c))), a;
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
          return f.appContext = o, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, Hl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Mr;
        Mr = a;
        try {
          return u();
        } finally {
          Mr = c;
        }
      }
    };
    return a;
  };
}
let Mr = null;
function ut(e, t) {
  if (nt) {
    let n = nt.provides;
    const i = nt.parent && nt.parent.provides;
    i === n && (n = nt.provides = Object.create(i)), n[e] = t;
  }
}
function He(e, t, n = !1) {
  const i = nt || vt;
  if (i || Mr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : Mr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Ee(t) ? t.call(i && i.proxy) : t;
  }
}
function w0(e, t, n, i = !1) {
  const r = {}, o = {};
  Zo(o, Fl, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Xd(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : Mg(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function x0(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = xe(r), [a] = e.propsOptions;
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
        if ($l(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Ie(o, f))
            h !== o[f] && (o[f] = h, u = !0);
          else {
            const v = gt(f);
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
    Xd(e, t, r, o) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Ie(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = en(d)) === d || !Ie(t, c))) && (a ? n && // for camelCase
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
        (!t || !Ie(t, d)) && (delete o[d], u = !0);
  }
  u && Nn(e, "set", "$attrs");
}
function Xd(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (Ir(a))
        continue;
      const u = t[a];
      let c;
      r && Ie(r, c = gt(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : $l(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = xe(n), u = s || Fe;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      n[d] = Us(
        r,
        a,
        d,
        u[d],
        e,
        !Ie(u, d)
      );
    }
  }
  return l;
}
function Us(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Ie(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Ee(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = oo(r);
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
    ] && (i === "" || i === en(n)) && (i = !0));
  }
  return i;
}
function Zd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Ee(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = Zd(d, t, !0);
      qe(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Oe(e) && i.set(e, Ki), Ki;
  if (we(o))
    for (let c = 0; c < o.length; c++) {
      const d = gt(o[c]);
      nc(d) && (l[d] = Fe);
    }
  else if (o)
    for (const c in o) {
      const d = gt(c);
      if (nc(d)) {
        const f = o[c], h = l[d] = we(f) || Ee(f) ? { type: f } : qe({}, f);
        if (h) {
          const v = oc(Boolean, h.type), m = oc(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Ie(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Oe(e) && i.set(e, u), u;
}
function nc(e) {
  return e[0] !== "$" && !Ir(e);
}
function ic(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function rc(e, t) {
  return ic(e) === ic(t);
}
function oc(e, t) {
  return we(t) ? t.findIndex((n) => rc(n, e)) : Ee(t) && rc(t, e) ? 0 : -1;
}
const Jd = (e) => e[0] === "_" || e === "$stable", Wa = (e) => we(e) ? e.map(bn) : [bn(e)], _0 = (e, t, n) => {
  if (t._n)
    return t;
  const i = ce((...r) => Wa(t(...r)), n);
  return i._c = !1, i;
}, Qd = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (Jd(r))
      continue;
    const o = e[r];
    if (Ee(o))
      t[r] = _0(r, o, i);
    else if (o != null) {
      const l = Wa(o);
      t[r] = () => l;
    }
  }
}, eh = (e, t) => {
  const n = Wa(t);
  e.slots.default = () => n;
}, S0 = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = xe(t), Zo(t, "_", n)) : Qd(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && eh(e, t);
  Zo(e.slots, Fl, 1);
}, k0 = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = Fe;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (qe(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, Qd(t, r)), l = t;
  } else t && (eh(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !Jd(s) && l[s] == null && delete r[s];
};
function Ws(e, t, n, i, r = !1) {
  if (we(e)) {
    e.forEach(
      (f, h) => Ws(
        f,
        t && (we(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (Do(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? Hl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === Fe ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (Ye(u) ? (c[u] = null, Ie(d, u) && (d[u] = null)) : Ue(u) && (u.value = null)), Ee(a))
    ti(a, s, 12, [l, c]);
  else {
    const f = Ye(a), h = Ue(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const m = f ? Ie(d, a) ? d[a] : c[a] : a.value;
          r ? we(m) && La(m, o) : we(m) ? m.includes(o) || m.push(o) : f ? (c[a] = [o], Ie(d, a) && (d[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else f ? (c[a] = l, Ie(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, kt(v, n)) : v();
    }
  }
}
const kt = Jg;
function C0(e) {
  return E0(e);
}
function E0(e, t) {
  const n = dd();
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
    setScopeId: h = Gt,
    insertStaticContent: v
  } = e, m = (V, A, U, Y = null, K = null, ne = null, oe = void 0, te = null, ie = !!A.dynamicChildren) => {
    if (V === A)
      return;
    V && !mi(V, A) && (Y = le(V), W(V, K, ne, !0), V = null), A.patchFlag === -2 && (ie = !1, A.dynamicChildren = null);
    const { type: Q, ref: ue, shapeFlag: ye } = A;
    switch (Q) {
      case ro:
        p(V, A, U, Y);
        break;
      case qt:
        g(V, A, U, Y);
        break;
      case ms:
        V == null && w(A, U, Y, oe);
        break;
      case Ve:
        L(
          V,
          A,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie
        );
        break;
      default:
        ye & 1 ? S(
          V,
          A,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie
        ) : ye & 6 ? I(
          V,
          A,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie
        ) : (ye & 64 || ye & 128) && Q.process(
          V,
          A,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie,
          je
        );
    }
    ue != null && K && Ws(ue, V && V.ref, ne, A || V, !A);
  }, p = (V, A, U, Y) => {
    if (V == null)
      i(
        A.el = s(A.children),
        U,
        Y
      );
    else {
      const K = A.el = V.el;
      A.children !== V.children && u(K, A.children);
    }
  }, g = (V, A, U, Y) => {
    V == null ? i(
      A.el = a(A.children || ""),
      U,
      Y
    ) : A.el = V.el;
  }, w = (V, A, U, Y) => {
    [V.el, V.anchor] = v(
      V.children,
      A,
      U,
      Y,
      V.el,
      V.anchor
    );
  }, x = ({ el: V, anchor: A }, U, Y) => {
    let K;
    for (; V && V !== A; )
      K = f(V), i(V, U, Y), V = K;
    i(A, U, Y);
  }, b = ({ el: V, anchor: A }) => {
    let U;
    for (; V && V !== A; )
      U = f(V), r(V), V = U;
    r(A);
  }, S = (V, A, U, Y, K, ne, oe, te, ie) => {
    A.type === "svg" ? oe = "svg" : A.type === "math" && (oe = "mathml"), V == null ? E(
      A,
      U,
      Y,
      K,
      ne,
      oe,
      te,
      ie
    ) : $(
      V,
      A,
      K,
      ne,
      oe,
      te,
      ie
    );
  }, E = (V, A, U, Y, K, ne, oe, te) => {
    let ie, Q;
    const { props: ue, shapeFlag: ye, transition: me, dirs: Se } = V;
    if (ie = V.el = l(
      V.type,
      ne,
      ue && ue.is,
      ue
    ), ye & 8 ? c(ie, V.children) : ye & 16 && P(
      V.children,
      ie,
      null,
      Y,
      K,
      vs(V, ne),
      oe,
      te
    ), Se && ai(V, null, Y, "created"), k(ie, V, V.scopeId, oe, Y), ue) {
      for (const Ae in ue)
        Ae !== "value" && !Ir(Ae) && o(
          ie,
          Ae,
          null,
          ue[Ae],
          ne,
          V.children,
          Y,
          K,
          Z
        );
      "value" in ue && o(ie, "value", null, ue.value, ne), (Q = ue.onVnodeBeforeMount) && yn(Q, Y, V);
    }
    Se && ai(V, null, Y, "beforeMount");
    const Le = V0(K, me);
    Le && me.beforeEnter(ie), i(ie, A, U), ((Q = ue && ue.onVnodeMounted) || Le || Se) && kt(() => {
      Q && yn(Q, Y, V), Le && me.enter(ie), Se && ai(V, null, Y, "mounted");
    }, K);
  }, k = (V, A, U, Y, K) => {
    if (U && h(V, U), Y)
      for (let ne = 0; ne < Y.length; ne++)
        h(V, Y[ne]);
    if (K) {
      let ne = K.subTree;
      if (A === ne) {
        const oe = K.vnode;
        k(
          V,
          oe,
          oe.scopeId,
          oe.slotScopeIds,
          K.parent
        );
      }
    }
  }, P = (V, A, U, Y, K, ne, oe, te, ie = 0) => {
    for (let Q = ie; Q < V.length; Q++) {
      const ue = V[Q] = te ? Zn(V[Q]) : bn(V[Q]);
      m(
        null,
        ue,
        A,
        U,
        Y,
        K,
        ne,
        oe,
        te
      );
    }
  }, $ = (V, A, U, Y, K, ne, oe) => {
    const te = A.el = V.el;
    let { patchFlag: ie, dynamicChildren: Q, dirs: ue } = A;
    ie |= V.patchFlag & 16;
    const ye = V.props || Fe, me = A.props || Fe;
    let Se;
    if (U && ui(U, !1), (Se = me.onVnodeBeforeUpdate) && yn(Se, U, A, V), ue && ai(A, V, U, "beforeUpdate"), U && ui(U, !0), Q ? R(
      V.dynamicChildren,
      Q,
      te,
      U,
      Y,
      vs(A, K),
      ne
    ) : oe || N(
      V,
      A,
      te,
      null,
      U,
      Y,
      vs(A, K),
      ne,
      !1
    ), ie > 0) {
      if (ie & 16)
        D(
          te,
          A,
          ye,
          me,
          U,
          Y,
          K
        );
      else if (ie & 2 && ye.class !== me.class && o(te, "class", null, me.class, K), ie & 4 && o(te, "style", ye.style, me.style, K), ie & 8) {
        const Le = A.dynamicProps;
        for (let Ae = 0; Ae < Le.length; Ae++) {
          const Ne = Le[Ae], Ze = ye[Ne], Tt = me[Ne];
          (Tt !== Ze || Ne === "value") && o(
            te,
            Ne,
            Ze,
            Tt,
            K,
            V.children,
            U,
            Y,
            Z
          );
        }
      }
      ie & 1 && V.children !== A.children && c(te, A.children);
    } else !oe && Q == null && D(
      te,
      A,
      ye,
      me,
      U,
      Y,
      K
    );
    ((Se = me.onVnodeUpdated) || ue) && kt(() => {
      Se && yn(Se, U, A, V), ue && ai(A, V, U, "updated");
    }, Y);
  }, R = (V, A, U, Y, K, ne, oe) => {
    for (let te = 0; te < A.length; te++) {
      const ie = V[te], Q = A[te], ue = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ie.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ie.type === Ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !mi(ie, Q) || // - In the case of a component, it could contain anything.
        ie.shapeFlag & 70) ? d(ie.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          U
        )
      );
      m(
        ie,
        Q,
        ue,
        null,
        Y,
        K,
        ne,
        oe,
        !0
      );
    }
  }, D = (V, A, U, Y, K, ne, oe) => {
    if (U !== Y) {
      if (U !== Fe)
        for (const te in U)
          !Ir(te) && !(te in Y) && o(
            V,
            te,
            U[te],
            null,
            oe,
            A.children,
            K,
            ne,
            Z
          );
      for (const te in Y) {
        if (Ir(te))
          continue;
        const ie = Y[te], Q = U[te];
        ie !== Q && te !== "value" && o(
          V,
          te,
          Q,
          ie,
          oe,
          A.children,
          K,
          ne,
          Z
        );
      }
      "value" in Y && o(V, "value", U.value, Y.value, oe);
    }
  }, L = (V, A, U, Y, K, ne, oe, te, ie) => {
    const Q = A.el = V ? V.el : s(""), ue = A.anchor = V ? V.anchor : s("");
    let { patchFlag: ye, dynamicChildren: me, slotScopeIds: Se } = A;
    Se && (te = te ? te.concat(Se) : Se), V == null ? (i(Q, U, Y), i(ue, U, Y), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      A.children || [],
      U,
      ue,
      K,
      ne,
      oe,
      te,
      ie
    )) : ye > 0 && ye & 64 && me && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      me,
      U,
      K,
      ne,
      oe,
      te
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (A.key != null || K && A === K.subTree) && qa(
      V,
      A,
      !0
      /* shallow */
    )) : N(
      V,
      A,
      U,
      ue,
      K,
      ne,
      oe,
      te,
      ie
    );
  }, I = (V, A, U, Y, K, ne, oe, te, ie) => {
    A.slotScopeIds = te, V == null ? A.shapeFlag & 512 ? K.ctx.activate(
      A,
      U,
      Y,
      oe,
      ie
    ) : _(
      A,
      U,
      Y,
      K,
      ne,
      oe,
      ie
    ) : O(V, A, ie);
  }, _ = (V, A, U, Y, K, ne, oe) => {
    const te = V.component = B0(
      V,
      Y,
      K
    );
    if (Nl(V) && (te.ctx.renderer = je), F0(te), te.asyncDep) {
      if (K && K.registerDep(te, M), !V.el) {
        const ie = te.subTree = y(qt);
        g(null, ie, A, U);
      }
    } else
      M(
        te,
        V,
        A,
        U,
        K,
        ne,
        oe
      );
  }, O = (V, A, U) => {
    const Y = A.component = V.component;
    if (Wg(V, A, U))
      if (Y.asyncDep && !Y.asyncResolved) {
        z(Y, A, U);
        return;
      } else
        Y.next = A, Dg(Y.update), Y.effect.dirty = !0, Y.update();
    else
      A.el = V.el, Y.vnode = A;
  }, M = (V, A, U, Y, K, ne, oe) => {
    const te = () => {
      if (V.isMounted) {
        let { next: ue, bu: ye, u: me, parent: Se, vnode: Le } = V;
        {
          const Ln = th(V);
          if (Ln) {
            ue && (ue.el = Le.el, z(V, ue, oe)), Ln.asyncDep.then(() => {
              V.isUnmounted || te();
            });
            return;
          }
        }
        let Ae = ue, Ne;
        ui(V, !1), ue ? (ue.el = Le.el, z(V, ue, oe)) : ue = Le, ye && us(ye), (Ne = ue.props && ue.props.onVnodeBeforeUpdate) && yn(Ne, Se, ue, Le), ui(V, !0);
        const Ze = fs(V), Tt = V.subTree;
        V.subTree = Ze, m(
          Tt,
          Ze,
          // parent may have changed if it's in a teleport
          d(Tt.el),
          // anchor may have changed if it's in a fragment
          le(Tt),
          V,
          K,
          ne
        ), ue.el = Ze.el, Ae === null && qg(V, Ze.el), me && kt(me, K), (Ne = ue.props && ue.props.onVnodeUpdated) && kt(
          () => yn(Ne, Se, ue, Le),
          K
        );
      } else {
        let ue;
        const { el: ye, props: me } = A, { bm: Se, m: Le, parent: Ae } = V, Ne = Do(A);
        if (ui(V, !1), Se && us(Se), !Ne && (ue = me && me.onVnodeBeforeMount) && yn(ue, Ae, A), ui(V, !0), ye && gn) {
          const Ze = () => {
            V.subTree = fs(V), gn(
              ye,
              V.subTree,
              V,
              K,
              null
            );
          };
          Ne ? A.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && Ze()
          ) : Ze();
        } else {
          const Ze = V.subTree = fs(V);
          m(
            null,
            Ze,
            U,
            Y,
            V,
            K,
            ne
          ), A.el = Ze.el;
        }
        if (Le && kt(Le, K), !Ne && (ue = me && me.onVnodeMounted)) {
          const Ze = A;
          kt(
            () => yn(ue, Ae, Ze),
            K
          );
        }
        (A.shapeFlag & 256 || Ae && Do(Ae.vnode) && Ae.vnode.shapeFlag & 256) && V.a && kt(V.a, K), V.isMounted = !0, A = U = Y = null;
      }
    }, ie = V.effect = new Aa(
      te,
      Gt,
      () => za(Q),
      V.scope
      // track it in component's effect scope
    ), Q = V.update = () => {
      ie.dirty && ie.run();
    };
    Q.id = V.uid, ui(V, !0), Q();
  }, z = (V, A, U) => {
    A.component = V;
    const Y = V.vnode.props;
    V.vnode = A, V.next = null, x0(V, A.props, Y, U), k0(V, A.children, U), Ii(), qu(V), Ti();
  }, N = (V, A, U, Y, K, ne, oe, te, ie = !1) => {
    const Q = V && V.children, ue = V ? V.shapeFlag : 0, ye = A.children, { patchFlag: me, shapeFlag: Se } = A;
    if (me > 0) {
      if (me & 128) {
        B(
          Q,
          ye,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie
        );
        return;
      } else if (me & 256) {
        F(
          Q,
          ye,
          U,
          Y,
          K,
          ne,
          oe,
          te,
          ie
        );
        return;
      }
    }
    Se & 8 ? (ue & 16 && Z(Q, K, ne), ye !== Q && c(U, ye)) : ue & 16 ? Se & 16 ? B(
      Q,
      ye,
      U,
      Y,
      K,
      ne,
      oe,
      te,
      ie
    ) : Z(Q, K, ne, !0) : (ue & 8 && c(U, ""), Se & 16 && P(
      ye,
      U,
      Y,
      K,
      ne,
      oe,
      te,
      ie
    ));
  }, F = (V, A, U, Y, K, ne, oe, te, ie) => {
    V = V || Ki, A = A || Ki;
    const Q = V.length, ue = A.length, ye = Math.min(Q, ue);
    let me;
    for (me = 0; me < ye; me++) {
      const Se = A[me] = ie ? Zn(A[me]) : bn(A[me]);
      m(
        V[me],
        Se,
        U,
        null,
        K,
        ne,
        oe,
        te,
        ie
      );
    }
    Q > ue ? Z(
      V,
      K,
      ne,
      !0,
      !1,
      ye
    ) : P(
      A,
      U,
      Y,
      K,
      ne,
      oe,
      te,
      ie,
      ye
    );
  }, B = (V, A, U, Y, K, ne, oe, te, ie) => {
    let Q = 0;
    const ue = A.length;
    let ye = V.length - 1, me = ue - 1;
    for (; Q <= ye && Q <= me; ) {
      const Se = V[Q], Le = A[Q] = ie ? Zn(A[Q]) : bn(A[Q]);
      if (mi(Se, Le))
        m(
          Se,
          Le,
          U,
          null,
          K,
          ne,
          oe,
          te,
          ie
        );
      else
        break;
      Q++;
    }
    for (; Q <= ye && Q <= me; ) {
      const Se = V[ye], Le = A[me] = ie ? Zn(A[me]) : bn(A[me]);
      if (mi(Se, Le))
        m(
          Se,
          Le,
          U,
          null,
          K,
          ne,
          oe,
          te,
          ie
        );
      else
        break;
      ye--, me--;
    }
    if (Q > ye) {
      if (Q <= me) {
        const Se = me + 1, Le = Se < ue ? A[Se].el : Y;
        for (; Q <= me; )
          m(
            null,
            A[Q] = ie ? Zn(A[Q]) : bn(A[Q]),
            U,
            Le,
            K,
            ne,
            oe,
            te,
            ie
          ), Q++;
      }
    } else if (Q > me)
      for (; Q <= ye; )
        W(V[Q], K, ne, !0), Q++;
    else {
      const Se = Q, Le = Q, Ae = /* @__PURE__ */ new Map();
      for (Q = Le; Q <= me; Q++) {
        const rt = A[Q] = ie ? Zn(A[Q]) : bn(A[Q]);
        rt.key != null && Ae.set(rt.key, Q);
      }
      let Ne, Ze = 0;
      const Tt = me - Le + 1;
      let Ln = !1, gr = 0;
      const Un = new Array(Tt);
      for (Q = 0; Q < Tt; Q++)
        Un[Q] = 0;
      for (Q = Se; Q <= ye; Q++) {
        const rt = V[Q];
        if (Ze >= Tt) {
          W(rt, K, ne, !0);
          continue;
        }
        let xt;
        if (rt.key != null)
          xt = Ae.get(rt.key);
        else
          for (Ne = Le; Ne <= me; Ne++)
            if (Un[Ne - Le] === 0 && mi(rt, A[Ne])) {
              xt = Ne;
              break;
            }
        xt === void 0 ? W(rt, K, ne, !0) : (Un[xt - Le] = Q + 1, xt >= gr ? gr = xt : Ln = !0, m(
          rt,
          A[xt],
          U,
          null,
          K,
          ne,
          oe,
          te,
          ie
        ), Ze++);
      }
      const yr = Ln ? L0(Un) : Ki;
      for (Ne = yr.length - 1, Q = Tt - 1; Q >= 0; Q--) {
        const rt = Le + Q, xt = A[rt], pr = rt + 1 < ue ? A[rt + 1].el : Y;
        Un[Q] === 0 ? m(
          null,
          xt,
          U,
          pr,
          K,
          ne,
          oe,
          te,
          ie
        ) : Ln && (Ne < 0 || Q !== yr[Ne] ? H(xt, U, pr, 2) : Ne--);
      }
    }
  }, H = (V, A, U, Y, K = null) => {
    const { el: ne, type: oe, transition: te, children: ie, shapeFlag: Q } = V;
    if (Q & 6) {
      H(V.component.subTree, A, U, Y);
      return;
    }
    if (Q & 128) {
      V.suspense.move(A, U, Y);
      return;
    }
    if (Q & 64) {
      oe.move(V, A, U, je);
      return;
    }
    if (oe === Ve) {
      i(ne, A, U);
      for (let ye = 0; ye < ie.length; ye++)
        H(ie[ye], A, U, Y);
      i(V.anchor, A, U);
      return;
    }
    if (oe === ms) {
      x(V, A, U);
      return;
    }
    if (Y !== 2 && Q & 1 && te)
      if (Y === 0)
        te.beforeEnter(ne), i(ne, A, U), kt(() => te.enter(ne), K);
      else {
        const { leave: ye, delayLeave: me, afterLeave: Se } = te, Le = () => i(ne, A, U), Ae = () => {
          ye(ne, () => {
            Le(), Se && Se();
          });
        };
        me ? me(ne, Le, Ae) : Ae();
      }
    else
      i(ne, A, U);
  }, W = (V, A, U, Y = !1, K = !1) => {
    const {
      type: ne,
      props: oe,
      ref: te,
      children: ie,
      dynamicChildren: Q,
      shapeFlag: ue,
      patchFlag: ye,
      dirs: me
    } = V;
    if (te != null && Ws(te, null, U, V, !0), ue & 256) {
      A.ctx.deactivate(V);
      return;
    }
    const Se = ue & 1 && me, Le = !Do(V);
    let Ae;
    if (Le && (Ae = oe && oe.onVnodeBeforeUnmount) && yn(Ae, A, V), ue & 6)
      fe(V.component, U, Y);
    else {
      if (ue & 128) {
        V.suspense.unmount(U, Y);
        return;
      }
      Se && ai(V, null, A, "beforeUnmount"), ue & 64 ? V.type.remove(
        V,
        A,
        U,
        K,
        je,
        Y
      ) : Q && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ne !== Ve || ye > 0 && ye & 64) ? Z(
        Q,
        A,
        U,
        !1,
        !0
      ) : (ne === Ve && ye & 384 || !K && ue & 16) && Z(ie, A, U), Y && J(V);
    }
    (Le && (Ae = oe && oe.onVnodeUnmounted) || Se) && kt(() => {
      Ae && yn(Ae, A, V), Se && ai(V, null, A, "unmounted");
    }, U);
  }, J = (V) => {
    const { type: A, el: U, anchor: Y, transition: K } = V;
    if (A === Ve) {
      se(U, Y);
      return;
    }
    if (A === ms) {
      b(V);
      return;
    }
    const ne = () => {
      r(U), K && !K.persisted && K.afterLeave && K.afterLeave();
    };
    if (V.shapeFlag & 1 && K && !K.persisted) {
      const { leave: oe, delayLeave: te } = K, ie = () => oe(U, ne);
      te ? te(V.el, ne, ie) : ie();
    } else
      ne();
  }, se = (V, A) => {
    let U;
    for (; V !== A; )
      U = f(V), r(V), V = U;
    r(A);
  }, fe = (V, A, U) => {
    const { bum: Y, scope: K, update: ne, subTree: oe, um: te } = V;
    Y && us(Y), K.stop(), ne && (ne.active = !1, W(oe, V, A, U)), te && kt(te, A), kt(() => {
      V.isUnmounted = !0;
    }, A), A && A.pendingBranch && !A.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === A.pendingId && (A.deps--, A.deps === 0 && A.resolve());
  }, Z = (V, A, U, Y = !1, K = !1, ne = 0) => {
    for (let oe = ne; oe < V.length; oe++)
      W(V[oe], A, U, Y, K);
  }, le = (V) => V.shapeFlag & 6 ? le(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : f(V.anchor || V.el);
  let Ce = !1;
  const Be = (V, A, U) => {
    V == null ? A._vnode && W(A._vnode, null, null, !0) : m(
      A._vnode || null,
      V,
      A,
      null,
      null,
      null,
      U
    ), Ce || (Ce = !0, qu(), Rd(), Ce = !1), A._vnode = V;
  }, je = {
    p: m,
    um: W,
    m: H,
    r: J,
    mt: _,
    mc: P,
    pc: N,
    pbc: R,
    n: le,
    o: e
  };
  let wt, gn;
  return {
    render: Be,
    hydrate: wt,
    createApp: b0(Be, wt)
  };
}
function vs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ui({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function V0(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qa(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (we(i) && we(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = Zn(r[o]), s.el = l.el), n || qa(l, s)), s.type === ro && (s.el = l.el);
    }
}
function L0(e) {
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
function th(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : th(t);
}
const P0 = (e) => e.__isTeleport, Ar = (e) => e && (e.disabled || e.disabled === ""), lc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, sc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, qs = (e, t) => {
  const n = e && e.to;
  return Ye(n) ? t ? t(n) : null : n;
}, I0 = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: m, createComment: p }
    } = u, g = Ar(t.props);
    let { shapeFlag: w, children: x, dynamicChildren: b } = t;
    if (e == null) {
      const S = t.el = m(""), E = t.anchor = m("");
      h(S, n, i), h(E, n, i);
      const k = t.target = qs(t.props, v), P = t.targetAnchor = m("");
      k && (h(P, k), l === "svg" || lc(k) ? l = "svg" : (l === "mathml" || sc(k)) && (l = "mathml"));
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
      g ? $(n, E) : k && $(k, P);
    } else {
      t.el = e.el;
      const S = t.anchor = e.anchor, E = t.target = e.target, k = t.targetAnchor = e.targetAnchor, P = Ar(e.props), $ = P ? n : E, R = P ? S : k;
      if (l === "svg" || lc(E) ? l = "svg" : (l === "mathml" || sc(E)) && (l = "mathml"), b ? (f(
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
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Eo(
          t,
          n,
          S,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const D = t.target = qs(
          t.props,
          v
        );
        D && Eo(
          t,
          D,
          null,
          u,
          0
        );
      } else P && Eo(
        t,
        E,
        k,
        u,
        1
      );
    }
    nh(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && o(c), l && o(u), s & 16) {
      const h = l || !Ar(f);
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
  move: Eo,
  hydrate: T0
};
function Eo(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = o === 2;
  if (d && i(l, t, n), (!d || Ar(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      r(
        u[f],
        t,
        n,
        2
      );
  d && i(s, t, n);
}
function T0(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = qs(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Ar(t.props))
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
    nh(t);
  }
  return t.anchor && l(t.anchor);
}
const M0 = I0;
function nh(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Ve = Symbol.for("v-fgt"), ro = Symbol.for("v-txt"), qt = Symbol.for("v-cmt"), ms = Symbol.for("v-stc"), $r = [];
let rn = null;
function dt(e = !1) {
  $r.push(rn = e ? null : []);
}
function A0() {
  $r.pop(), rn = $r[$r.length - 1] || null;
}
let zr = 1;
function ac(e) {
  zr += e;
}
function ih(e) {
  return e.dynamicChildren = zr > 0 ? rn || Ki : null, A0(), zr > 0 && rn && rn.push(e), e;
}
function nl(e, t, n, i, r, o) {
  return ih(
    Me(
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
function on(e, t, n, i, r) {
  return ih(
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
function il(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mi(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Fl = "__vInternal", rh = ({ key: e }) => e ?? null, Ho = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ye(e) || Ue(e) || Ee(e) ? { i: vt, r: e, k: t, f: !!n } : e : null);
function Me(e, t = null, n = null, i = 0, r = null, o = e === Ve ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && rh(t),
    ref: t && Ho(t),
    scopeId: Fd,
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
    ctx: vt
  };
  return s ? (Ya(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ye(n) ? 8 : 16), zr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  rn && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && rn.push(a), a;
}
const y = $0;
function $0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === Kg) && (e = qt), il(e)) {
    const s = Rn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ya(s, n), zr > 0 && !o && rn && (s.shapeFlag & 6 ? rn[rn.indexOf(e)] = s : rn.push(s)), s.patchFlag |= -2, s;
  }
  if (G0(e) && (e = e.__vccOpts), t) {
    t = N0(t);
    let { class: s, style: a } = t;
    s && !Ye(s) && (t.class = Ta(s)), Oe(a) && (Vd(a) && !we(a) && (a = qe({}, a)), t.style = Ia(a));
  }
  const l = Ye(e) ? 1 : Zg(e) ? 128 : P0(e) ? 64 : Oe(e) ? 4 : Ee(e) ? 2 : 0;
  return Me(
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
function N0(e) {
  return e ? Vd(e) || Fl in e ? qe({}, e) : e : null;
}
function Rn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? he(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && rh(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? we(r) ? r.concat(Ho(t)) : [r, Ho(t)] : Ho(t)
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
    patchFlag: t && e.type !== Ve ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && Rn(e.ssContent),
    ssFallback: e.ssFallback && Rn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Je(e = " ", t = 0) {
  return y(ro, null, e, t);
}
function Qt(e = "", t = !1) {
  return t ? (dt(), on(qt, null, e)) : y(qt, null, e);
}
function bn(e) {
  return e == null || typeof e == "boolean" ? y(qt) : we(e) ? y(
    Ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Zn(e) : y(ro, null, String(e));
}
function Zn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Rn(e);
}
function Ya(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (we(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ya(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Fl in t) ? t._ctx = vt : r === 3 && vt && (vt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ee(t) ? (t = { default: t, _ctx: vt }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Je(t)]) : n = 8);
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
      else if (Pl(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(we(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function yn(e, t, n, i = null) {
  Wt(e, t, 7, [
    n,
    i
  ]);
}
const R0 = Kd();
let O0 = 0;
function B0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || R0, o = {
    uid: O0++,
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
    scope: new md(
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
    propsOptions: Zd(i, r),
    emitsOptions: Bd(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Fe,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: Fe,
    data: Fe,
    props: Fe,
    attrs: Fe,
    slots: Fe,
    refs: Fe,
    setupState: Fe,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = jg.bind(null, o), e.ce && e.ce(o), o;
}
let nt = null;
const Ka = () => nt || vt;
let rl, Ys;
{
  const e = dd(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  rl = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => nt = n
  ), Ys = t(
    "__VUE_SSR_SETTERS__",
    (n) => Dl = n
  );
}
const oo = (e) => {
  const t = nt;
  return rl(e), e.scope.on(), () => {
    e.scope.off(), rl(t);
  };
}, uc = () => {
  nt && nt.scope.off(), rl(null);
};
function oh(e) {
  return e.vnode.shapeFlag & 4;
}
let Dl = !1;
function F0(e, t = !1) {
  t && Ys(t);
  const { props: n, children: i } = e.vnode, r = oh(e);
  w0(e, n, r, t), S0(e, i);
  const o = r ? D0(e, t) : void 0;
  return t && Ys(!1), o;
}
function D0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ld(new Proxy(e.ctx, d0));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? z0(e) : null, o = oo(e);
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
    if (Ti(), o(), ud(l)) {
      if (l.then(uc, uc), t)
        return l.then((s) => {
          cc(e, s, t);
        }).catch((s) => {
          Al(s, e, 0);
        });
      e.asyncDep = l;
    } else
      cc(e, l, t);
  } else
    lh(e, t);
}
function cc(e, t, n) {
  Ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Oe(t) && (e.setupState = Md(t)), lh(e, n);
}
let fc;
function lh(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && fc && !i.render) {
      const r = i.template || Ua(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = qe(
          qe(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = fc(r, u);
      }
    }
    e.render = i.render || Gt;
  }
  {
    const r = oo(e);
    Ii();
    try {
      h0(e);
    } finally {
      Ti(), r();
    }
  }
}
function H0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return Vt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function z0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return H0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Hl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Md(Ld(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Tr)
          return Tr[n](e);
      },
      has(t, n) {
        return n in t || n in Tr;
      }
    }));
}
function j0(e, t = !0) {
  return Ee(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function G0(e) {
  return Ee(e) && "__vccOpts" in e;
}
const C = (e, t) => Ag(e, t, Dl);
function ri(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Oe(t) && !we(t) ? il(t) ? y(e, null, [t]) : y(e, t) : y(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && il(n) && (n = [n]), y(e, t, n));
}
const U0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const W0 = "http://www.w3.org/2000/svg", q0 = "http://www.w3.org/1998/Math/MathML", Jn = typeof document < "u" ? document : null, dc = Jn && /* @__PURE__ */ Jn.createElement("template"), Y0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? Jn.createElementNS(W0, e) : t === "mathml" ? Jn.createElementNS(q0, e) : Jn.createElement(e, n ? { is: n } : void 0);
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
      dc.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = dc.content;
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
}, qn = "transition", br = "animation", rr = Symbol("_vtc"), On = (e, { slots: t }) => ri(i0, ah(e), t);
On.displayName = "Transition";
const sh = {
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
}, K0 = On.props = /* @__PURE__ */ qe(
  {},
  Gd,
  sh
), ci = (e, t = []) => {
  we(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, hc = (e) => e ? we(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ah(e) {
  const t = {};
  for (const L in e)
    L in sh || (t[L] = e[L]);
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
  } = e, v = X0(r), m = v && v[0], p = v && v[1], {
    onBeforeEnter: g,
    onEnter: w,
    onEnterCancelled: x,
    onLeave: b,
    onLeaveCancelled: S,
    onBeforeAppear: E = g,
    onAppear: k = w,
    onAppearCancelled: P = x
  } = t, $ = (L, I, _) => {
    Yn(L, I ? c : s), Yn(L, I ? u : l), _ && _();
  }, R = (L, I) => {
    L._isLeaving = !1, Yn(L, d), Yn(L, h), Yn(L, f), I && I();
  }, D = (L) => (I, _) => {
    const O = L ? k : w, M = () => $(I, L, _);
    ci(O, [I, M]), vc(() => {
      Yn(I, L ? a : o), Tn(I, L ? c : s), hc(O) || mc(I, i, m, M);
    });
  };
  return qe(t, {
    onBeforeEnter(L) {
      ci(g, [L]), Tn(L, o), Tn(L, l);
    },
    onBeforeAppear(L) {
      ci(E, [L]), Tn(L, a), Tn(L, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave(L, I) {
      L._isLeaving = !0;
      const _ = () => R(L, I);
      Tn(L, d), ch(), Tn(L, f), vc(() => {
        L._isLeaving && (Yn(L, d), Tn(L, h), hc(b) || mc(L, i, p, _));
      }), ci(b, [L, _]);
    },
    onEnterCancelled(L) {
      $(L, !1), ci(x, [L]);
    },
    onAppearCancelled(L) {
      $(L, !0), ci(P, [L]);
    },
    onLeaveCancelled(L) {
      R(L), ci(S, [L]);
    }
  });
}
function X0(e) {
  if (e == null)
    return null;
  if (Oe(e))
    return [gs(e.enter), gs(e.leave)];
  {
    const t = gs(e);
    return [t, t];
  }
}
function gs(e) {
  return Os(e);
}
function Tn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[rr] || (e[rr] = /* @__PURE__ */ new Set())).add(t);
}
function Yn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[rr];
  n && (n.delete(t), n.size || (e[rr] = void 0));
}
function vc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Z0 = 0;
function mc(e, t, n, i) {
  const r = e._endId = ++Z0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = uh(e, t);
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
function uh(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${qn}Delay`), o = i(`${qn}Duration`), l = gc(r, o), s = i(`${br}Delay`), a = i(`${br}Duration`), u = gc(s, a);
  let c = null, d = 0, f = 0;
  t === qn ? l > 0 && (c = qn, d = l, f = o.length) : t === br ? u > 0 && (c = br, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? qn : br : null, f = c ? c === qn ? o.length : a.length : 0);
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
function gc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => yc(n) + yc(e[i])));
}
function yc(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ch() {
  return document.body.offsetHeight;
}
function J0(e, t, n) {
  const i = e[rr];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ol = Symbol("_vod"), fh = Symbol("_vsh"), yt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[ol] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : wr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), wr(e, !0), i.enter(e)) : i.leave(e, () => {
      wr(e, !1);
    }) : wr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    wr(e, t);
  }
};
function wr(e, t) {
  e.style.display = t ? e[ol] : "none", e[fh] = !t;
}
const Q0 = Symbol(""), ey = /(^|;)\s*display\s*:/;
function ty(e, t, n) {
  const i = e.style, r = Ye(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Ye(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && zo(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && zo(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), zo(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[Q0];
      l && (n += ";" + l), i.cssText = n, o = ey.test(n);
    }
  } else t && e.removeAttribute("style");
  ol in e && (e[ol] = o ? i.display : "", e[fh] && (i.display = "none"));
}
const pc = /\s*!important$/;
function zo(e, t, n) {
  if (we(n))
    n.forEach((i) => zo(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = ny(e, t);
    pc.test(n) ? e.setProperty(
      en(i),
      n.replace(pc, ""),
      "important"
    ) : e[i] = n;
  }
}
const bc = ["Webkit", "Moz", "ms"], ys = {};
function ny(e, t) {
  const n = ys[t];
  if (n)
    return n;
  let i = gt(t);
  if (i !== "filter" && i in e)
    return ys[t] = i;
  i = Dn(i);
  for (let r = 0; r < bc.length; r++) {
    const o = bc[r] + i;
    if (o in e)
      return ys[t] = o;
  }
  return t;
}
const wc = "http://www.w3.org/1999/xlink";
function iy(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(wc, t.slice(6, t.length)) : e.setAttributeNS(wc, t, n);
  else {
    const o = ug(t);
    n == null || o && !hd(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function ry(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = hd(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function oy(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function ly(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const xc = Symbol("_vei");
function sy(e, t, n, i, r = null) {
  const o = e[xc] || (e[xc] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = ay(t);
    if (i) {
      const u = o[t] = fy(i, r);
      oy(e, s, u, a);
    } else l && (ly(e, s, l, a), o[t] = void 0);
  }
}
const _c = /(?:Once|Passive|Capture)$/;
function ay(e) {
  let t;
  if (_c.test(e)) {
    t = {};
    let i;
    for (; i = e.match(_c); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : en(e.slice(2)), t];
}
let ps = 0;
const uy = /* @__PURE__ */ Promise.resolve(), cy = () => ps || (uy.then(() => ps = 0), ps = Date.now());
function fy(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Wt(
      dy(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = cy(), n;
}
function dy(e, t) {
  if (we(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Sc = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, hy = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? J0(e, i, u) : t === "style" ? ty(e, n, i) : Pl(t) ? Va(t) || sy(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vy(e, t, i, u)) ? ry(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), iy(e, t, i, u));
};
function vy(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Sc(t) && Ee(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Sc(t) && Ye(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function my(e, t) {
  const n = /* @__PURE__ */ Mi(e);
  class i extends Xa {
    constructor(o) {
      super(n, o, t);
    }
  }
  return i.def = n, i;
}
const gy = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Xa extends gy {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Ke(() => {
      this._connected || (Ec(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let i = 0; i < this.attributes.length; i++)
      this._setAttr(this.attributes[i].name);
    this._ob = new MutationObserver((i) => {
      for (const r of i)
        this._setAttr(r.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (i, r = !1) => {
      const { props: o, styles: l } = i;
      let s;
      if (o && !we(o))
        for (const a in o) {
          const u = o[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = Os(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[gt(a)] = !0);
        }
      this._numberProps = s, r && this._resolveProps(i), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = we(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && i.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of i.map(gt))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(o) {
          this._setProp(r, o);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const i = gt(t);
    this._numberProps && this._numberProps[i] && (n = Os(n)), this._setProp(i, n, !1);
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
  _setProp(t, n, i = !0, r = !0) {
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), i && (n === !0 ? this.setAttribute(en(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(en(t), n + "") : n || this.removeAttribute(en(t))));
  }
  _update() {
    Ec(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = y(this._def, qe({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const i = (o, l) => {
        this.dispatchEvent(
          new CustomEvent(o, {
            detail: l
          })
        );
      };
      n.emit = (o, ...l) => {
        i(o, l), en(o) !== o && i(en(o), l);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof Xa) {
          n.parent = r._instance, n.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const i = document.createElement("style");
      i.textContent = n, this.shadowRoot.appendChild(i);
    });
  }
}
const dh = /* @__PURE__ */ new WeakMap(), hh = /* @__PURE__ */ new WeakMap(), ll = Symbol("_moveCb"), kc = Symbol("_enterCb"), vh = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ qe({}, K0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Ka(), i = jd();
    let r, o;
    return qd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!xy(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(py), r.forEach(by);
      const s = r.filter(wy);
      ch(), s.forEach((a) => {
        const u = a.el, c = u.style;
        Tn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[ll] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[ll] = null, Yn(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = xe(e), s = ah(l);
      let a = l.tag || Ve;
      r = o, o = t.default ? Ga(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && Hr(
          c,
          Dr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          Hr(
            c,
            Dr(c, s, i, n)
          ), dh.set(c, c.el.getBoundingClientRect());
        }
      return y(a, null, o);
    };
  }
}, yy = (e) => delete e.mode;
vh.props;
const mh = vh;
function py(e) {
  const t = e.el;
  t[ll] && t[ll](), t[kc] && t[kc]();
}
function by(e) {
  hh.set(e, e.el.getBoundingClientRect());
}
function wy(e) {
  const t = dh.get(e), n = hh.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function xy(e, t, n) {
  const i = e.cloneNode(), r = e[rr];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = uh(i);
  return o.removeChild(i), l;
}
const _y = /* @__PURE__ */ qe({ patchProp: hy }, Y0);
let Cc;
function Sy() {
  return Cc || (Cc = C0(_y));
}
const Ec = (...e) => {
  Sy().render(...e);
}, Re = typeof window < "u", Za = Re && "IntersectionObserver" in window, ky = Re && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Vc = Re && "EyeDropper" in window;
function gh(e, t, n) {
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
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), gh(e, t.split("."), n));
}
function Mn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Ks(e, t, n);
  if (Array.isArray(t)) return gh(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function Ja(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, i) => t + i);
}
function ge(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function sl(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function jr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Lc = Object.freeze({
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
}), Cy = Object.freeze({
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
function yh(e) {
  return Object.keys(e);
}
function yi(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function ph(e, t) {
  const n = {}, i = new Set(Object.keys(e));
  for (const r of t)
    i.has(r) && (n[r] = e[r]);
  return n;
}
function Pc(e, t, n) {
  const i = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((l) => l instanceof RegExp ? l.test(o) : l === o) && !(n != null && n.some((l) => l === o)) ? i[o] = e[o] : r[o] = e[o];
  return [i, r];
}
function Kt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const bh = /^on[^a-z]/, Qa = (e) => bh.test(e), Ey = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function fr(e) {
  const [t, n] = Pc(e, [bh]), i = Kt(t, Ey), [r, o] = Pc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function _n(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Vy(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), nn(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function Rt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ic(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function Tc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Mc(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Ly(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function Ac(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let i = -1;
  for (; Math.abs(e) >= t && i < n.length - 1; )
    e /= t, ++i;
  return `${e.toFixed(1)} ${n[i]}B`;
}
function Ot() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (sl(o) && sl(l)) {
      i[r] = Ot(o, l, n);
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
function wh(e) {
  return e.map((t) => t.type === Ve ? wh(t.children) : t).flat();
}
function _i() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (_i.cache.has(e)) return _i.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return _i.cache.set(e, t), t;
}
_i.cache = /* @__PURE__ */ new Map();
function jo(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => jo(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => jo(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return jo(e, t.component.subTree).flat(1);
  }
  return [];
}
function Py(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function eu(e) {
  const t = an({}), n = C(e);
  return kn(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), Da(t);
}
function al(e, t) {
  return e.includes(t);
}
function xh(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const ln = () => [Function, Array];
function $c(e, t) {
  return t = "on" + Dn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function _h(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Gr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Sh(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function ul(e, t) {
  var i, r, o, l;
  const n = Gr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Sh(n, t);
    s ? s.focus() : ul(e, t === "next" ? "first" : "last");
  }
}
function cl(e, t) {
  if (!(Re && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function kh(e) {
  return e.some((t) => il(t) ? t.type === qt ? !1 : t.type !== Ve || kh(t.children) : !0) ? e : null;
}
function Iy(e, t) {
  if (!Re || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Ty(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Ch = ["top", "bottom"], My = ["start", "end", "left", "right"];
function Xs(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = al(Ch, n) ? "start" : al(My, n) ? "top" : "center"), {
    side: Nc(n, t),
    align: Nc(i, t)
  };
}
function Nc(e, t) {
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
function Rc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Oc(e) {
  return al(Ch, e.side) ? "y" : "x";
}
class Si {
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
function Bc(e, t) {
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
function Eh(e) {
  return Array.isArray(e) ? new Si({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function tu(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new Si(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), d = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new Si({
      x: c,
      y: d,
      width: f,
      height: h
    });
  } else
    return new Si(t);
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
const Go = /* @__PURE__ */ new WeakMap();
function Ay(e, t) {
  Object.keys(t).forEach((n) => {
    if (Qa(n)) {
      const i = xh(n), r = Go.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), Go.has(e) || Go.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function $y(e, t) {
  Object.keys(t).forEach((n) => {
    if (Qa(n)) {
      const i = xh(n), r = Go.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Hi = 2.4, Fc = 0.2126729, Dc = 0.7151522, Hc = 0.072175, Ny = 0.55, Ry = 0.58, Oy = 0.57, By = 0.62, Vo = 0.03, zc = 1.45, Fy = 5e-4, Dy = 1.25, Hy = 1.25, jc = 0.078, Gc = 12.82051282051282, Lo = 0.06, Uc = 1e-3;
function Wc(e, t) {
  const n = (e.r / 255) ** Hi, i = (e.g / 255) ** Hi, r = (e.b / 255) ** Hi, o = (t.r / 255) ** Hi, l = (t.g / 255) ** Hi, s = (t.b / 255) ** Hi;
  let a = n * Fc + i * Dc + r * Hc, u = o * Fc + l * Dc + s * Hc;
  if (a <= Vo && (a += (Vo - a) ** zc), u <= Vo && (u += (Vo - u) ** zc), Math.abs(u - a) < Fy) return 0;
  let c;
  if (u > a) {
    const d = (u ** Ny - a ** Ry) * Dy;
    c = d < Uc ? 0 : d < jc ? d - d * Gc * Lo : d - Lo;
  } else {
    const d = (u ** By - a ** Oy) * Hy;
    c = d > -Uc ? 0 : d > -jc ? d - d * Gc * Lo : d + Lo;
  }
  return c * 100;
}
function zy(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const fl = 0.20689655172413793, jy = (e) => e > fl ** 3 ? Math.cbrt(e) : e / (3 * fl ** 2) + 4 / 29, Gy = (e) => e > fl ? e ** 3 : 3 * fl ** 2 * (e - 4 / 29);
function Vh(e) {
  const t = jy, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Lh(e) {
  const t = Gy, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Uy = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Wy = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, qy = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Yy = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Ph(e) {
  const t = Array(3), n = Wy, i = Uy;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(Rt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function nu(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Yy, l = qy;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function Zs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Ky(e) {
  return Zs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const qc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Xy = {
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
  hsl: (e, t, n, i) => Yc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => Yc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsv: (e, t, n, i) => Bn({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => Bn({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Ut(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && qc.test(e)) {
    const {
      groups: t
    } = e.match(qc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Xy[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), $h(t);
  } else if (typeof e == "object") {
    if (yi(e, ["r", "g", "b"]))
      return e;
    if (yi(e, ["h", "s", "l"]))
      return Bn(iu(e));
    if (yi(e, ["h", "s", "v"]))
      return Bn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Bn(e) {
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
function Yc(e) {
  return Bn(iu(e));
}
function zl(e) {
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
function Ih(e) {
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
function iu(e) {
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
function Th(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function Mh(e) {
  return Th(Bn(e));
}
function Po(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Ah(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[Po(t), Po(n), Po(i), r !== void 0 ? Po(Math.round(r * 255)) : ""].join("")}`;
}
function $h(e) {
  e = Zy(e);
  let [t, n, i, r] = Ly(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Nh(e) {
  const t = $h(e);
  return zl(t);
}
function Rh(e) {
  return Ah(Bn(e));
}
function Zy(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Tc(Tc(e, 6), 8, "F")), e;
}
function Jy(e, t) {
  const n = Vh(nu(e));
  return n[0] = n[0] + t * 10, Ph(Lh(n));
}
function Qy(e, t) {
  const n = Vh(nu(e));
  return n[0] = n[0] - t * 10, Ph(Lh(n));
}
function Js(e) {
  const t = Ut(e);
  return nu(t)[1];
}
function ep(e, t) {
  const n = Js(e), i = Js(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function Oh(e) {
  const t = Math.abs(Wc(Ut(0), Ut(e)));
  return Math.abs(Wc(Ut(16777215), Ut(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function X(e, t) {
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
const _e = X({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), or = Symbol.for("vuetify:defaults");
function tp(e) {
  return ee(e);
}
function ru() {
  const e = He(or);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function Cn(e, t) {
  const n = ru(), i = ee(e), r = C(() => {
    if (nn(t == null ? void 0 : t.disabled)) return n.value;
    const l = nn(t == null ? void 0 : t.scoped), s = nn(t == null ? void 0 : t.reset), a = nn(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = Ot(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = Ot(Ot(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? Ot(u.prev, u) : u;
  });
  return ut(or, r), r;
}
function np(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[_i(t)]) < "u";
}
function ip() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ru();
  const i = it("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = C(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var d, f, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(d = r.value) == null ? void 0 : d[u], c].filter((m) => m != null) : typeof u == "string" && !np(i.vnode, u) ? ((f = r.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = pe();
  kn(() => {
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
    const a = sp(or, i);
    ut(or, C(() => l.value ? Ot((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function dn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = X(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return ph(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = ru();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = ip(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function de() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? dn : Mi)(t);
}
function dr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return de()({
    name: n ?? Dn(gt(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ..._e()
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
function Bh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Ur = "cubic-bezier(0.4, 0, 0.2, 1)", rp = "cubic-bezier(0.0, 0, 0.2, 1)", op = "cubic-bezier(0.4, 0, 1, 1)";
function it(e, t) {
  const n = Ka();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function En() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = it(e).type;
  return _i((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Fh = 0, Uo = /* @__PURE__ */ new WeakMap();
function Lt() {
  const e = it("getUid");
  if (Uo.has(e)) return Uo.get(e);
  {
    const t = Fh++;
    return Uo.set(e, t), t;
  }
}
Lt.reset = () => {
  Fh = 0, Uo = /* @__PURE__ */ new WeakMap();
};
function Dh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? lp(e) : ou(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function dl(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (ou(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function ou(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function lp(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function sp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : it("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function ap(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ve(e) {
  const t = it("useRender");
  t.render = e;
}
const $i = X({
  border: [Boolean, Number, String]
}, "border");
function Ni(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return {
    borderClasses: C(() => {
      const i = Ue(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const up = [null, "default", "comfortable", "compact"], Xt = X({
  density: {
    type: String,
    default: "default",
    validator: (e) => up.includes(e)
  }
}, "density");
function hn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return {
    densityClasses: C(() => `${t}--density-${e.density}`)
  };
}
const zn = X({
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
      const n = Ue(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const Pt = X({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function It(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return {
    roundedClasses: C(() => {
      const i = Ue(e) ? e.value : e.rounded, r = Ue(e) ? e.value : e.tile, o = [];
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
const We = X({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), hl = Symbol.for("vuetify:theme"), Xe = X({
  theme: String
}, "theme");
function Kc() {
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
function cp() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Kc();
  const t = Kc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [o, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || o === "dark" ? (i = t.themes) == null ? void 0 : i.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = Ot(s, l);
  }
  return Ot(t, {
    ...e,
    themes: n
  });
}
function fp(e) {
  const t = cp(e), n = ee(t.defaultTheme), i = ee(t.themes), r = C(() => {
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
              const g = p === "lighten" ? Jy : Qy;
              for (const w of Ja(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = Ah(g(Ut(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, p = Ut(h.colors[v]);
        h.colors[m] = Oh(p);
      }
    }
    return c;
  }), o = C(() => r.value[n.value]), l = C(() => {
    const c = [];
    o.value.dark && fi(c, ":root", ["color-scheme: dark"]), fi(c, ":root", Xc(o.value));
    for (const [v, m] of Object.entries(r.value))
      fi(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Xc(m)]);
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
        Re && be(l, () => {
          h.patch(s);
        });
      } else
        Re ? (d.addHeadObjs(C(s)), kn(() => d.updateDOM())) : d.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var f = v;
      let h = Re ? document.getElementById("vuetify-theme-stylesheet") : null;
      Re ? be(l, v, {
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
function tt(e) {
  it("provideTheme");
  const t = He(hl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = C(() => e.theme ?? t.name.value), i = C(() => t.themes.value[n.value]), r = C(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return ut(hl, o), o;
}
function fi(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Xc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Ut(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Js(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Ut(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function lu(e) {
  return eu(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Zs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && Ky(e.value.background)) {
          const i = Ut(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = Oh(i);
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
function sn(e, t) {
  const n = C(() => ({
    text: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = lu(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function Bt(e, t) {
  const n = C(() => ({
    background: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = lu(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const dp = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function hr(e, t) {
  return y(Ve, null, [e && y("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), y("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Gn = X({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => dp.includes(e)
  }
}, "variant");
function vr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  const n = C(() => {
    const {
      variant: o
    } = nn(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = lu(C(() => {
    const {
      variant: o,
      color: l
    } = nn(e);
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
const Hh = X({
  divided: Boolean,
  ...$i(),
  ..._e(),
  ...Xt(),
  ...zn(),
  ...Pt(),
  ...We(),
  ...Xe(),
  ...Gn()
}, "VBtnGroup"), Zc = de()({
  name: "VBtnGroup",
  props: Hh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      densityClasses: r
    } = hn(e), {
      borderClasses: o
    } = Ni(e), {
      elevationClasses: l
    } = jn(e), {
      roundedClasses: s
    } = It(e);
    Cn({
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
  be(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), pt(() => {
    n == null || n.stop();
  });
}
function $e(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const o = it("useProxiedModel"), l = ee(e[t] !== void 0 ? e[t] : n), s = _i(t), u = C(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = o.vnode.props) != null && d.hasOwnProperty(t) || (f = o.vnode.props) != null && f.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = o.vnode.props) != null && d.hasOwnProperty(t) && ((f = o.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  Ei(() => !u.value, () => {
    be(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = C({
    get() {
      const d = e[t];
      return i(u.value ? d : l.value);
    },
    set(d) {
      const f = r(d), h = xe(u.value ? e[t] : l.value);
      h === f || i(h) === d || (l.value = f, o == null || o.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const jl = X({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Gl = X({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Ul(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = it("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = Lt();
  ut(Symbol.for(`${t.description}:id`), r);
  const o = He(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = ae(e, "value"), s = C(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), fn(() => {
    o.unregister(r);
  });
  const a = C(() => o.isSelected(r)), u = C(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return be(a, (c) => {
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
function lo(e, t) {
  let n = !1;
  const i = an([]), r = $e(e, "modelValue", [], (f) => f == null ? [] : zh(i, _n(f)), (f) => {
    const h = vp(i, f);
    return e.multiple ? h : h[0];
  }), o = it("useGroup");
  function l(f, h) {
    const v = f, m = Symbol.for(`${t.description}:id`), g = jo(m, o == null ? void 0 : o.vnode).indexOf(h);
    nn(v.value) == null && (v.value = g), g > -1 ? i.splice(g, 0, v) : i.push(v);
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
  cn(() => {
    a();
  }), fn(() => {
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
    getItemIndex: (f) => hp(i, f)
  };
  return ut(t, d), d;
}
function hp(e, t) {
  const n = zh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function zh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => Ai(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function vp(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const jh = Symbol.for("vuetify:v-btn-toggle"), mp = X({
  ...Hh(),
  ...jl()
}, "VBtnToggle");
de()({
  name: "VBtnToggle",
  props: mp(),
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
    } = lo(e, jh);
    return ve(() => {
      const a = Zc.filterProps(e);
      return y(Zc, he({
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
const gp = X({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), et = de(!1)({
  name: "VDefaultsProvider",
  props: gp(),
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
    return Cn(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), yp = {
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
}, pp = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => ri(Gh, {
    ...e,
    class: "mdi"
  })
}, Te = [String, Function, Object, Array], Qs = Symbol.for("vuetify:icons"), Wl = X({
  icon: {
    type: Te
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Jc = de()({
  name: "VComponentIcon",
  props: Wl(),
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
}), su = dn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Wl(),
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
dn({
  name: "VLigatureIcon",
  props: Wl(),
  setup(e) {
    return () => y(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Gh = dn({
  name: "VClassIcon",
  props: Wl(),
  setup(e) {
    return () => y(e.tag, {
      class: e.icon
    }, null);
  }
});
function bp() {
  return {
    svg: {
      component: su
    },
    class: {
      component: Gh
    }
  };
}
function wp(e) {
  const t = bp(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = pp), Ot({
    defaultSet: n,
    sets: t,
    aliases: {
      ...yp,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const xp = (e) => {
  const t = He(Qs);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: C(() => {
      var a;
      const i = nn(e);
      if (!i) return {
        component: Jc
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: su,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: Jc,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, _p = ["x-small", "small", "default", "large", "x-large"], so = X({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function ao(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return eu(() => {
    let n, i;
    return al(_p, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: ge(e.size),
      height: ge(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const Sp = X({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Te,
  ..._e(),
  ...so(),
  ...We({
    tag: "i"
  }),
  ...Xe()
}, "VIcon"), ze = de()({
  name: "VIcon",
  props: Sp(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = ee(), {
      themeClasses: o
    } = tt(e), {
      iconData: l
    } = xp(C(() => r.value || e.icon)), {
      sizeClasses: s
    } = ao(e), {
      textColorClasses: a,
      textColorStyles: u
    } = sn(ae(e, "color"));
    return ve(() => {
      var d, f;
      const c = (d = i.default) == null ? void 0 : d.call(i);
      return c && (r.value = (f = wh(c).filter((h) => h.type === ro && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), y(l.value.component, {
        tag: e.tag,
        icon: l.value.icon,
        class: ["v-icon", "notranslate", o.value, s.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
          fontSize: ge(e.size),
          height: ge(e.size),
          width: ge(e.size)
        }, u.value, e.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {
        default: () => [c]
      });
    }), {};
  }
});
function Uh(e, t) {
  const n = ee(), i = pe(!1);
  if (Za) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    fn(() => {
      r.disconnect();
    }), be(n, (o, l) => {
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
function lr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = ee(), i = ee();
  if (Re) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    fn(() => {
      r.disconnect();
    }), be(n, (o, l) => {
      l && (r.unobserve(jr(l)), i.value = void 0), o && r.observe(jr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: io(i)
  };
}
const kp = X({
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
  ..._e(),
  ...so(),
  ...We({
    tag: "div"
  }),
  ...Xe()
}, "VProgressCircular"), Wh = de()({
  name: "VProgressCircular",
  props: kp(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = ee(), {
      themeClasses: l
    } = tt(e), {
      sizeClasses: s,
      sizeStyles: a
    } = ao(e), {
      textColorClasses: u,
      textColorStyles: c
    } = sn(ae(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = sn(ae(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Uh(), {
      resizeRef: m,
      contentRect: p
    } = lr(), g = C(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = C(() => Number(e.width)), x = C(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = C(() => i / (1 - w.value / x.value) * 2), S = C(() => w.value / x.value * b.value), E = C(() => ge((100 - g.value) / 100 * r));
    return kn(() => {
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
        "stroke-width": S.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), y("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": S.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": E.value
      }, null)]), n.default && y("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: g.value
      })])]
    })), {};
  }
}), oi = X({
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
      height: ge(e.height),
      maxHeight: ge(e.maxHeight),
      maxWidth: ge(e.maxWidth),
      minHeight: ge(e.minHeight),
      minWidth: ge(e.minWidth),
      width: ge(e.width)
    }))
  };
}
const Cp = {
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
}, Qc = "$vuetify.", ef = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), qh = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(Qc))
    return ef(i, o);
  const s = i.replace(Qc, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Ks(a, s, null);
  return c || (`${i}${e.value}`, c = Ks(u, s, null)), c || (c = i), typeof c != "string" && (c = i), ef(c, o);
};
function Yh(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function xs(e, t, n) {
  const i = $e(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, be(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function Kh(e) {
  return (t) => {
    const n = xs(t, "locale", e.current), i = xs(t, "fallback", e.fallback), r = xs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: qh(n, i, r),
      n: Yh(n, i),
      provide: Kh({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function Ep(e) {
  const t = pe((e == null ? void 0 : e.locale) ?? "en"), n = pe((e == null ? void 0 : e.fallback) ?? "en"), i = ee({
    en: Cp,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: qh(t, n, i),
    n: Yh(t, n),
    provide: Kh({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const vl = Symbol.for("vuetify:locale");
function Vp(e) {
  return e.name != null;
}
function Lp(e) {
  const t = e != null && e.adapter && Vp(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Ep(e), n = Ip(t, e);
  return {
    ...t,
    ...n
  };
}
function uo() {
  const e = He(vl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Pp() {
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
function Ip(e, t) {
  const n = ee((t == null ? void 0 : t.rtl) ?? Pp()), i = C(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: C(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function vn() {
  const e = He(vl);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const tf = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, co = X({
  location: String
}, "location");
function fo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = vn();
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
      return o !== "center" && (t ? a[tf[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[tf[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const Tp = X({
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
  ..._e(),
  ...co({
    location: "top"
  }),
  ...Pt(),
  ...We(),
  ...Xe()
}, "VProgressLinear"), Xh = de()({
  name: "VProgressLinear",
  props: Tp(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      isRtl: r,
      rtlClasses: o
    } = vn(), {
      themeClasses: l
    } = tt(e), {
      locationStyles: s
    } = fo(e), {
      textColorClasses: a,
      textColorStyles: u
    } = sn(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = Bt(C(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = Bt(e, "color"), {
      roundedClasses: v
    } = It(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Uh(), g = C(() => parseInt(e.max, 10)), w = C(() => parseInt(e.height, 10)), x = C(() => parseFloat(e.bufferValue) / g.value * 100), b = C(() => parseFloat(i.value) / g.value * 100), S = C(() => r.value !== e.reverse), E = C(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), k = C(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function P($) {
      if (!m.value) return;
      const {
        left: R,
        right: D,
        width: L
      } = m.value.getBoundingClientRect(), I = S.value ? L - $.clientX + (D - L) : $.clientX - R;
      i.value = Math.round(I / L * g.value);
    }
    return ve(() => y(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": S.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, v.value, l.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ge(w.value) : 0,
        "--v-progress-linear-height": ge(w.value),
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
          [S.value ? "left" : "right"]: ge(-w.value),
          borderTop: `${ge(w.value / 2)} dotted`,
          opacity: k.value,
          top: `calc(50% - ${ge(w.value / 4)})`,
          width: ge(100 - x.value, "%"),
          "--v-progress-linear-stream-to": ge(w.value * (S.value ? 1 : -1))
        }
      }, null), y("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: k.value,
          width: ge(e.stream ? x.value : 100, "%")
        }]
      }, null), y(On, {
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
            width: ge(b.value, "%")
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
}), au = X({
  loading: [Boolean, String]
}, "loader");
function ql(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return {
    loaderClasses: C(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function uu(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return y("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || y(Xh, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Mp = ["static", "relative", "fixed", "absolute", "sticky"], Yl = X({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Mp.includes(e)
    )
  }
}, "position");
function Kl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  return {
    positionClasses: C(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Ap() {
  const e = it("useRoute");
  return C(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function $p() {
  var e, t;
  return (t = (e = it("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Xl(e, t) {
  const n = Xg("RouterLink"), i = C(() => !!(e.href || e.to)), r = C(() => (i == null ? void 0 : i.value) || $c(t, "click") || $c(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: ae(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = Ap();
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
const Zl = X({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let _s = !1;
function Np(e, t) {
  let n = !1, i, r;
  Re && (Ke(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      _s ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), _s = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      _s = !1;
    });
  }), pt(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Rp(e, t) {
  be(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && Ke(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const ea = Symbol("rippleStop"), Op = 80;
function nf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function ta(e) {
  return e.constructor.name === "TouchEvent";
}
function Zh(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Bp = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!Zh(e)) {
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
}, ml = {
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
    } = Bp(e, t, n), d = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = d, r.style.height = d, t.appendChild(i);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), nf(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), nf(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function Jh(e) {
  return typeof e > "u" || !!e;
}
function Wr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[ea])) {
    if (e[ea] = !0, ta(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Zh(e), n._ripple.class && (t.class = n._ripple.class), ta(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        ml.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Op);
    } else
      ml.show(e, n, t);
  }
}
function rf(e) {
  e[ea] = !0;
}
function Nt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Nt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), ml.hide(t);
  }
}
function Qh(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let qr = !1;
function ev(e) {
  !qr && (e.keyCode === Lc.enter || e.keyCode === Lc.space) && (qr = !0, Wr(e));
}
function tv(e) {
  qr = !1, Nt(e);
}
function nv(e) {
  qr && (qr = !1, Nt(e));
}
function iv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = Jh(i);
  if (o || ml.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, sl(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", rf, {
        passive: !0
      }), e.addEventListener("mousedown", rf);
      return;
    }
    e.addEventListener("touchstart", Wr, {
      passive: !0
    }), e.addEventListener("touchend", Nt, {
      passive: !0
    }), e.addEventListener("touchmove", Qh, {
      passive: !0
    }), e.addEventListener("touchcancel", Nt), e.addEventListener("mousedown", Wr), e.addEventListener("mouseup", Nt), e.addEventListener("mouseleave", Nt), e.addEventListener("keydown", ev), e.addEventListener("keyup", tv), e.addEventListener("blur", nv), e.addEventListener("dragstart", Nt, {
      passive: !0
    });
  } else !o && n && rv(e);
}
function rv(e) {
  e.removeEventListener("mousedown", Wr), e.removeEventListener("touchstart", Wr), e.removeEventListener("touchend", Nt), e.removeEventListener("touchmove", Qh), e.removeEventListener("touchcancel", Nt), e.removeEventListener("mouseup", Nt), e.removeEventListener("mouseleave", Nt), e.removeEventListener("keydown", ev), e.removeEventListener("keyup", tv), e.removeEventListener("dragstart", Nt), e.removeEventListener("blur", nv);
}
function Fp(e, t) {
  iv(e, t, !1);
}
function Dp(e) {
  delete e._ripple, rv(e);
}
function Hp(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = Jh(t.oldValue);
  iv(e, t, n);
}
const Ri = {
  mounted: Fp,
  unmounted: Dp,
  updated: Hp
}, ov = X({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: jh
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Te,
  appendIcon: Te,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...$i(),
  ..._e(),
  ...Xt(),
  ...oi(),
  ...zn(),
  ...Gl(),
  ...au(),
  ...co(),
  ...Yl(),
  ...Pt(),
  ...Zl(),
  ...so(),
  ...We({
    tag: "button"
  }),
  ...Xe(),
  ...Gn({
    variant: "elevated"
  })
}, "VBtn"), at = de()({
  name: "VBtn",
  directives: {
    Ripple: Ri
  },
  props: ov(),
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
    } = tt(e), {
      borderClasses: o
    } = Ni(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = vr(e), {
      densityClasses: u
    } = hn(e), {
      dimensionStyles: c
    } = li(e), {
      elevationClasses: d
    } = jn(e), {
      loaderClasses: f
    } = ql(e), {
      locationStyles: h
    } = fo(e), {
      positionClasses: v
    } = Kl(e), {
      roundedClasses: m
    } = It(e), {
      sizeClasses: p,
      sizeStyles: g
    } = ao(e), w = Ul(e, e.symbol, !1), x = Xl(e, n), b = C(() => {
      var $;
      return e.active !== void 0 ? e.active : x.isLink.value ? ($ = x.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), S = C(() => (w == null ? void 0 : w.disabled.value) || e.disabled), E = C(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), k = C(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P($) {
      var R;
      S.value || x.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((R = x.navigate) == null || R.call(x, $), w == null || w.toggle());
    }
    return Rp(x, w == null ? void 0 : w.select), ve(() => {
      var _, O;
      const $ = x.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), D = !!(e.appendIcon || i.append), L = !!(e.icon && e.icon !== !0), I = (w == null ? void 0 : w.isSelected.value) && (!x.isLink.value || ((_ = x.isActive) == null ? void 0 : _.value)) || !w || ((O = x.isActive) == null ? void 0 : O.value);
      return De(y($, {
        type: $ === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": S.value,
          "v-btn--elevated": E.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, I ? l.value : void 0, u.value, d.value, f.value, v.value, m.value, p.value, a.value, e.class],
        style: [I ? s.value : void 0, c.value, h.value, g.value, e.style],
        disabled: S.value || void 0,
        href: x.href.value,
        onClick: P,
        value: k.value
      }, {
        default: () => {
          var M;
          return [hr(!0, "v-btn"), !e.icon && R && y("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? y(et, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : y(ze, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), y("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && L ? y(ze, {
            key: "content-icon",
            icon: e.icon
          }, null) : y(et, {
            key: "content-defaults",
            disabled: !L,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var z;
              return [((z = i.default) == null ? void 0 : z.call(i)) ?? e.text];
            }
          })]), !e.icon && D && y("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? y(et, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : y(ze, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && y("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = i.loader) == null ? void 0 : M.call(i)) ?? y(Wh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[un("ripple"), !S.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Jl = de()({
  name: "VCardActions",
  props: _e(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Cn({
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
}), Vr = dr("v-card-subtitle"), Yr = dr("v-card-title");
function zp(e) {
  return {
    aspectStyles: C(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const lv = X({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ..._e(),
  ...oi()
}, "VResponsive"), of = de()({
  name: "VResponsive",
  props: lv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = zp(e), {
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
}), ho = X({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), An = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? mh : On,
    ...a
  } = typeof i == "object" ? i : {};
  return ri(s, he(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function jp(e, t) {
  if (!Za) return;
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
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? sv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function sv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const av = {
  mounted: jp,
  unmounted: sv
}, Gp = X({
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
  ...lv(),
  ..._e(),
  ...Pt(),
  ...ho()
}, "VImg"), uv = de()({
  name: "VImg",
  directives: {
    intersect: av
  },
  props: Gp(),
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
    } = Bt(ae(e, "color")), {
      roundedClasses: l
    } = It(e), s = it("VImg"), a = pe(""), u = ee(), c = pe(e.eager ? "loading" : "idle"), d = pe(), f = pe(), h = C(() => e.src && typeof e.src == "object" ? {
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
    be(() => e.src, () => {
      m(c.value !== "idle");
    }), be(v, (L, I) => {
      !L && I && u.value && b(u.value);
    }), Ol(() => m());
    function m(L) {
      if (!(e.eager && L) && !(Za && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const I = new Image();
          I.src = h.value.lazySrc, b(I, null);
        }
        h.value.src && Ke(() => {
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
    fn(() => {
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
    const S = C(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), E = () => {
      var _;
      if (!h.value.src || c.value === "idle") return null;
      const L = y("img", {
        class: ["v-img__img", S.value],
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
      return y(An, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [De(I ? y("picture", {
          class: "v-img__picture"
        }, [I, L]) : L, [[yt, c.value === "loaded"]])]
      });
    }, k = () => y(An, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && y("img", {
        class: ["v-img__img", "v-img__img--preload", S.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), P = () => i.placeholder ? y(An, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && y("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? y(An, {
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
    }, null) : null, D = pe(!1);
    {
      const L = be(v, (I) => {
        I && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            D.value = !0;
          });
        }), L());
      });
    }
    return ve(() => {
      const L = of.filterProps(e);
      return De(y(of, he({
        class: ["v-img", {
          "v-img--booting": !D.value
        }, r.value, l.value, e.class],
        style: [{
          width: ge(e.width === "auto" ? d.value : e.width)
        }, o.value, e.style]
      }, L, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => y(Ve, null, [y(E, null, null), y(k, null, null), y(R, null, null), y(P, null, null), y($, null, null)]),
        default: i.default
      }), [[un("intersect"), {
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
}), Up = X({
  start: Boolean,
  end: Boolean,
  icon: Te,
  image: String,
  text: String,
  ..._e(),
  ...Xt(),
  ...Pt(),
  ...so(),
  ...We(),
  ...Xe(),
  ...Gn({
    variant: "flat"
  })
}, "VAvatar"), Vi = de()({
  name: "VAvatar",
  props: Up(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = vr(e), {
      densityClasses: s
    } = hn(e), {
      roundedClasses: a
    } = It(e), {
      sizeClasses: u,
      sizeStyles: c
    } = ao(e);
    return ve(() => y(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? y(et, {
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
      }) : e.image ? y(uv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? y(ze, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, hr(!1, "v-avatar")]
    })), {};
  }
}), Wp = X({
  appendAvatar: String,
  appendIcon: Te,
  prependAvatar: String,
  prependIcon: Te,
  subtitle: [String, Number],
  title: [String, Number],
  ..._e(),
  ...Xt()
}, "VCardItem"), qp = de()({
  name: "VCardItem",
  props: Wp(),
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
      }, [n.prepend ? y(et, {
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
      }, n.prepend) : y(Ve, null, [e.prependAvatar && y(Vi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && y(ze, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), y("div", {
        class: "v-card-item__content"
      }, [s && y(Yr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && y(Vr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && y("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? y(et, {
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
      }, n.append) : y(Ve, null, [e.appendIcon && y(ze, {
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
}), Nr = dr("v-card-text"), Yp = X({
  appendAvatar: String,
  appendIcon: Te,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Te,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...$i(),
  ..._e(),
  ...Xt(),
  ...oi(),
  ...zn(),
  ...au(),
  ...co(),
  ...Yl(),
  ...Pt(),
  ...Zl(),
  ...We(),
  ...Xe(),
  ...Gn({
    variant: "elevated"
  })
}, "VCard"), cu = de()({
  name: "VCard",
  directives: {
    Ripple: Ri
  },
  props: Yp(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = tt(e), {
      borderClasses: o
    } = Ni(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = vr(e), {
      densityClasses: u
    } = hn(e), {
      dimensionStyles: c
    } = li(e), {
      elevationClasses: d
    } = jn(e), {
      loaderClasses: f
    } = ql(e), {
      locationStyles: h
    } = fo(e), {
      positionClasses: v
    } = Kl(e), {
      roundedClasses: m
    } = It(e), p = Xl(e, n), g = C(() => e.link !== !1 && p.isLink.value), w = C(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return ve(() => {
      const x = g.value ? "a" : e.tag, b = !!(i.title || e.title != null), S = !!(i.subtitle || e.subtitle != null), E = b || S, k = !!(i.append || e.appendAvatar || e.appendIcon), P = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = E || P || k, D = !!(i.text || e.text != null);
      return De(y(x, {
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
          }, [i.image ? y(et, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : y(uv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), y(uu, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && y(qp, {
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
          }), D && y(Nr, {
            key: "text"
          }, {
            default: () => {
              var I;
              return [((I = i.text) == null ? void 0 : I.call(i)) ?? e.text];
            }
          }), (L = i.default) == null ? void 0 : L.call(i), i.actions && y(Jl, null, {
            default: i.actions
          }), hr(w.value, "v-card")];
        }
      }), [[un("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), Kp = X({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Dt(e, t, n) {
  return de()({
    name: e,
    props: Kp({
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
        const s = i.group ? mh : On;
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
function cv(e, t) {
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
      return () => ri(On, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function fv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = gt(`offset-${n}`);
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
const Xp = X({
  target: [Object, Array]
}, "v-dialog-transition"), fu = de()({
  name: "VDialogTransition",
  props: Xp(),
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
        } = sf(e.target, r), d = pi(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: rp
        });
        (f = lf(r)) == null || f.forEach((h) => {
          pi(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Ur
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
        } = sf(e.target, r);
        pi(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: op
        }).finished.then(() => o()), (f = lf(r)) == null || f.forEach((h) => {
          pi(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Ur
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? y(On, he({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : y(On, {
      name: "dialog-transition"
    }, n);
  }
});
function lf(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function sf(e, t) {
  const n = Eh(e), i = tu(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((g) => parseFloat(g)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
Dt("fab-transition", "center center", "out-in");
Dt("dialog-bottom-transition");
Dt("dialog-top-transition");
const af = Dt("fade-transition"), dv = Dt("scale-transition");
Dt("scroll-x-transition");
Dt("scroll-x-reverse-transition");
Dt("scroll-y-transition");
Dt("scroll-y-reverse-transition");
Dt("slide-x-transition");
Dt("slide-x-reverse-transition");
const hv = Dt("slide-y-transition");
Dt("slide-y-reverse-transition");
const vv = cv("expand-transition", fv()), mv = cv("expand-x-transition", fv("", !0));
function Ss(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Zp(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function uf(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Ss({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return Ss({
      x: r,
      y: o
    }, t);
  }
  return Ss({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const gv = {
  static: e1,
  // specific viewport position, usually centered
  connected: n1
  // connected to a certain element
}, Jp = X({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in gv
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
function Qp(e, t) {
  const n = ee({}), i = ee();
  Re && Ei(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    be(() => e.locationStrategy, o), pt(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = gv[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
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
function e1() {
}
function t1(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = tu(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function n1(e, t, n) {
  (Array.isArray(e.target.value) || ap(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = eu(() => {
    const v = Xs(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? bs(v) : Xs(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === ws(m).align ? {
      preferredAnchor: Rc(v),
      preferredOrigin: Rc(m)
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
  be([e.target, e.contentEl], (v, m) => {
    let [p, g] = v, [w, x] = m;
    w && !Array.isArray(w) && f.unobserve(w), p && !Array.isArray(p) && f.observe(p), x && f.unobserve(x), g && f.observe(g);
  }, {
    immediate: !0
  }), pt(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const v = Eh(e.target.value), m = t1(e.contentEl.value, e.isRtl.value), p = dl(e.contentEl.value), g = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((D, L) => {
      const I = L.getBoundingClientRect(), _ = new Si({
        x: L === document.documentElement ? 0 : I.x,
        y: L === document.documentElement ? 0 : I.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return D ? new Si({
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
      const L = new Si(m), I = uf(D.anchor, v), _ = uf(D.origin, L);
      let {
        x: O,
        y: M
      } = Zp(I, _);
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
        overflows: Bc(L, w),
        x: O,
        y: M
      };
    }
    let S = 0, E = 0;
    const k = {
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
      S += D, E += L, m.x += D, m.y += L;
      {
        const _ = Oc(x.anchor), O = I.x.before || I.x.after, M = I.y.before || I.y.after;
        let z = !1;
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
            (H[N].before <= I[N].before && H[N].after <= I[N].after || H[N].before + H[N].after < (I[N].before + I[N].after) / 2) && (x = F, z = P[N] = !0);
          }
        }), z) continue;
      }
      I.x.before && (S += I.x.before, m.x += I.x.before), I.x.after && (S -= I.x.after, m.x -= I.x.after), I.y.before && (E += I.y.before, m.y += I.y.before), I.y.after && (E -= I.y.after, m.y -= I.y.after);
      {
        const _ = Bc(m, w);
        k.x = w.width - _.x.before - _.x.after, k.y = w.height - _.y.before - _.y.after, S += _.x.before, m.x += _.x.before, E += _.y.before, m.y += _.y.before;
      }
      break;
    }
    const R = Oc(x.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ge(ks(E)),
      left: e.isRtl.value ? void 0 : ge(ks(S)),
      right: e.isRtl.value ? ge(ks(-S)) : void 0,
      minWidth: ge(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: ge(cf(Rt(k.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: ge(cf(Rt(k.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: k,
      contentBox: m
    };
  }
  return be(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), Ke(() => {
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
function ks(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function cf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let na = !0;
const gl = [];
function i1(e) {
  !na || gl.length ? (gl.push(e), ia()) : (na = !1, e(), ia());
}
let ff = -1;
function ia() {
  cancelAnimationFrame(ff), ff = requestAnimationFrame(() => {
    const e = gl.shift();
    e && e(), gl.length ? ia() : na = !0;
  });
}
const Wo = {
  none: null,
  close: l1,
  block: s1,
  reposition: a1
}, r1 = X({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Wo
  }
}, "VOverlay-scroll-strategies");
function o1(e, t) {
  if (!Re) return;
  let n;
  kn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Ma(), await Ke(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = Wo[e.scrollStrategy]) == null || i.call(Wo, t, e, n);
    }));
  }), pt(() => {
    n == null || n.stop();
  });
}
function l1(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  yv(e.targetEl.value ?? e.contentEl.value, t);
}
function s1(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...dl(e.targetEl.value, t.contained ? n : void 0), ...dl(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => ou(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", ge(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ge(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ge(r)), s.classList.add("v-overlay-scroll-blocked");
  }), pt(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function a1(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    i1(() => {
      var c, d;
      const a = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      yv(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), pt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function yv(e, t) {
  const n = [document, ...dl(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), pt(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const ra = Symbol.for("vuetify:v-menu"), u1 = X({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function c1(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = Iy(s, () => {
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
const f1 = X({
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
  ...u1()
}, "VOverlay-activator");
function d1(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = it("useActivator"), o = ee();
  let l = !1, s = !1, a = !0;
  const u = C(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = C(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = c1(e, (k) => {
    k === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== k && (a = !0), n.value = k);
  }), h = ee(), v = {
    onClick: (k) => {
      k.stopPropagation(), o.value = k.currentTarget || k.target, n.value || (h.value = [k.clientX, k.clientY]), n.value = !n.value;
    },
    onMouseenter: (k) => {
      var P;
      (P = k.sourceCapabilities) != null && P.firesTouchEvents || (l = !0, o.value = k.currentTarget || k.target, d());
    },
    onMouseleave: (k) => {
      l = !1, f();
    },
    onFocus: (k) => {
      cl(k.target, ":focus-visible") !== !1 && (s = !0, k.stopPropagation(), o.value = k.currentTarget || k.target, d());
    },
    onBlur: (k) => {
      s = !1, k.stopPropagation(), f();
    }
  }, m = C(() => {
    const k = {};
    return c.value && (k.onClick = v.onClick), e.openOnHover && (k.onMouseenter = v.onMouseenter, k.onMouseleave = v.onMouseleave), u.value && (k.onFocus = v.onFocus, k.onBlur = v.onBlur), k;
  }), p = C(() => {
    const k = {};
    if (e.openOnHover && (k.onMouseenter = () => {
      l = !0, d();
    }, k.onMouseleave = () => {
      l = !1, f();
    }), u.value && (k.onFocusin = () => {
      s = !0, d();
    }, k.onFocusout = () => {
      s = !1, f();
    }), e.closeOnContentClick) {
      const P = He(ra, null);
      k.onClick = () => {
        n.value = !1, P == null || P.closeParents();
      };
    }
    return k;
  }), g = C(() => {
    const k = {};
    return e.openOnHover && (k.onMouseenter = () => {
      a && (l = !0, a = !1, d());
    }, k.onMouseleave = () => {
      l = !1, f();
    }), k;
  });
  be(i, (k) => {
    k && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), be(n, (k) => {
    k || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = ee();
  kn(() => {
    w.value && Ke(() => {
      o.value = jr(w.value);
    });
  });
  const x = ee(), b = C(() => e.target === "cursor" && h.value ? h.value : x.value ? jr(x.value) : pv(e.target, r) || o.value), S = C(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return be(() => !!e.activator, (k) => {
    k && Re ? (E = Ma(), E.run(() => {
      h1(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), pt(() => {
    E == null || E.stop();
  }), {
    activatorEl: o,
    activatorRef: w,
    target: b,
    targetEl: S,
    targetRef: x,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: g
  };
}
function h1(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  be(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && Ke(() => o());
  }, {
    immediate: !0
  }), be(() => e.activatorProps, () => {
    o();
  }), pt(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Ay(a, he(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && $y(a, he(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = pv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function pv(e, t) {
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
const Ql = ["sm", "md", "lg", "xl", "xxl"], oa = Symbol.for("vuetify:display"), df = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, v1 = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : df;
  return Ot(df, e);
};
function hf(e) {
  return Re && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function vf(e) {
  return Re && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function mf(e) {
  const t = Re && !e ? window.navigator.userAgent : "ssr";
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
    touch: ky,
    ssr: t === "ssr"
  };
}
function m1(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = v1(e), r = pe(vf(t)), o = pe(mf(t)), l = an({}), s = pe(hf(t));
  function a() {
    r.value = vf(), s.value = hf();
  }
  function u() {
    a(), o.value = mf();
  }
  return kn(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), m = s.value >= n.xxl, p = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", g = typeof i == "number" ? i : n[i], w = s.value < g;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = p, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Re && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...Da(l),
    update: u,
    ssr: !!t
  };
}
const g1 = X({
  mobileBreakpoint: [Number, String]
}, "display");
function du() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  const n = He(oa);
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
function y1() {
  if (!Re) return pe(!1);
  const {
    ssr: e
  } = du();
  if (e) {
    const t = pe(!1);
    return cn(() => {
      t.value = !0;
    }), t;
  } else
    return pe(!0);
}
const es = X({
  eager: Boolean
}, "lazy");
function hu(e, t) {
  const n = pe(!1), i = C(() => n.value || e.eager || t.value);
  be(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: r
  };
}
function vo() {
  const t = it("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const gf = Symbol.for("vuetify:stack"), xr = an([]);
function p1(e, t, n) {
  const i = it("useStack"), r = !n, o = He(gf, void 0), l = an({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ut(gf, l);
  const s = pe(+t.value);
  Ei(e, () => {
    var d;
    const c = (d = xr.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, r && xr.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), pt(() => {
      if (r) {
        const f = xe(xr).findIndex((h) => h[0] === i.uid);
        xr.splice(f, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = pe(!0);
  r && kn(() => {
    var d;
    const c = ((d = xr.at(-1)) == null ? void 0 : d[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = C(() => !l.activeChildren.size);
  return {
    globalTop: io(a),
    localTop: u,
    stackStyles: C(() => ({
      zIndex: s.value
    }))
  };
}
function b1(e) {
  return {
    teleportTarget: C(() => {
      const n = e.value;
      if (n === !0 || !Re) return;
      const i = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (i == null)
        return;
      let r = i.querySelector(":scope > .v-overlay-container");
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", i.appendChild(r)), r;
    })
  };
}
function w1() {
  return !0;
}
function bv(e, t, n) {
  if (!e || wv(e, n) === !1) return !1;
  const i = Bh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function wv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || w1)(e);
}
function x1(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && bv(e, t, n) && setTimeout(() => {
    wv(e, n) && i && i(e);
  }, 0);
}
function yf(e, t) {
  const n = Bh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const _1 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => x1(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = bv(r, e, t);
    };
    yf(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (yf(e, (n) => {
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
function S1(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return y(On, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && y("div", he({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const mo = X({
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
  ...f1(),
  ..._e(),
  ...oi(),
  ...es(),
  ...Jp(),
  ...r1(),
  ...Xe(),
  ...ho()
}, "VOverlay"), ii = de()({
  name: "VOverlay",
  directives: {
    ClickOutside: _1
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...mo()
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
    const o = $e(e, "modelValue"), l = C({
      get: () => o.value,
      set: (J) => {
        J && e.disabled || (o.value = J);
      }
    }), {
      teleportTarget: s
    } = b1(C(() => e.attach || e.contained)), {
      themeClasses: a
    } = tt(e), {
      rtlClasses: u,
      isRtl: c
    } = vn(), {
      hasContent: d,
      onAfterLeave: f
    } = hu(e, l), h = Bt(C(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: p
    } = p1(l, ae(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: g,
      activatorRef: w,
      target: x,
      targetEl: b,
      targetRef: S,
      activatorEvents: E,
      contentEvents: k,
      scrimEvents: P
    } = d1(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = li(e), R = y1(), {
      scopeId: D
    } = vo();
    be(() => e.disabled, (J) => {
      J && (l.value = !1);
    });
    const L = ee(), I = ee(), {
      contentStyles: _,
      updateLocation: O
    } = Qp(e, {
      isRtl: c,
      contentEl: I,
      target: x,
      isActive: l
    });
    o1(e, {
      root: L,
      contentEl: I,
      targetEl: b,
      isActive: l,
      updateLocation: O
    });
    function M(J) {
      r("click:outside", J), e.persistent ? H() : l.value = !1;
    }
    function z() {
      return l.value && v.value;
    }
    Re && be(l, (J) => {
      J ? window.addEventListener("keydown", N) : window.removeEventListener("keydown", N);
    }, {
      immediate: !0
    }), fn(() => {
      Re && window.removeEventListener("keydown", N);
    });
    function N(J) {
      var se, fe;
      J.key === "Escape" && v.value && (e.persistent ? H() : (l.value = !1, (se = I.value) != null && se.contains(document.activeElement) && ((fe = g.value) == null || fe.focus())));
    }
    const F = $p();
    Ei(() => e.closeOnBack, () => {
      Np(F, (J) => {
        v.value && l.value ? (J(!1), e.persistent ? H() : l.value = !1) : J();
      });
    });
    const B = ee();
    be(() => l.value && (e.absolute || e.contained) && s.value == null, (J) => {
      if (J) {
        const se = Dh(L.value);
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
        easing: Ur
      });
    }
    function W() {
      f(), r("afterLeave");
    }
    return ve(() => {
      var J;
      return y(Ve, null, [(J = n.activator) == null ? void 0 : J.call(n, {
        isActive: l.value,
        props: he({
          ref: w,
          targetRef: S
        }, E.value, e.activatorProps)
      }), R.value && d.value && y(M0, {
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
            top: ge(B.value)
          }, e.style],
          ref: L
        }, D, i), [y(S1, he({
          color: h,
          modelValue: l.value && !!e.scrim
        }, P.value), null), y(An, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterLeave: W
        }, {
          default: () => {
            var se;
            return [De(y("div", he({
              ref: I,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, _.value]
            }, k.value, e.contentProps), [(se = n.default) == null ? void 0 : se.call(n, {
              isActive: l
            })]), [[yt, l.value], [un("click-outside"), {
              handler: M,
              closeConditional: z,
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
const k1 = X({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...mo({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: fu
    },
    zIndex: 2400
  })
}, "VDialog"), vu = de()({
  name: "VDialog",
  props: k1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = vo(), o = ee();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = o.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = o.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Gr(o.value.contentEl);
        if (!h.length) return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Re && be(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), be(i, async (a) => {
      var u, c;
      await Ke(), a ? (u = o.value.contentEl) == null || u.focus({
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
          return y(et, {
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
function pf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function bf(e) {
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
function C1(e) {
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
const E1 = Symbol.for("vuetify:v-slide-group"), mu = X({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: E1
  },
  nextIcon: {
    type: Te,
    default: "$next"
  },
  prevIcon: {
    type: Te,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ..._e(),
  ...g1(),
  ...We(),
  ...jl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), yl = de()({
  name: "VSlideGroup",
  props: mu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = vn(), {
      displayClasses: r,
      mobile: o
    } = du(e), l = lo(e, e.symbol), s = pe(!1), a = pe(0), u = pe(0), c = pe(0), d = C(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = lr(), {
      resizeRef: v,
      contentRect: m
    } = lr(), p = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[0]) : -1), g = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Re) {
      let H = -1;
      be(() => [l.selected.value, h.value, m.value, d.value], () => {
        cancelAnimationFrame(H), H = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const W = d.value ? "width" : "height";
            u.value = h.value[W], c.value = m.value[W], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const W = v.value.children[g.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = C1({
              selectedElement: W,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: d.value
            }) : s.value && (a.value = bf({
              selectedElement: W,
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
    const w = pe(!1);
    let x = 0, b = 0;
    function S(H) {
      const W = d.value ? "clientX" : "clientY";
      b = (i.value && d.value ? -1 : 1) * a.value, x = H.touches[0][W], w.value = !0;
    }
    function E(H) {
      if (!s.value) return;
      const W = d.value ? "clientX" : "clientY", J = i.value && d.value ? -1 : 1;
      a.value = J * (b + x - H.touches[0][W]);
    }
    function k(H) {
      const W = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= W && (a.value = W), w.value = !1;
    }
    function P() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = pe(!1);
    function R(H) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const W of H.composedPath())
          for (const J of v.value.children)
            if (J === W) {
              a.value = bf({
                selectedElement: J,
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
      var W;
      !$.value && !(H.relatedTarget && ((W = v.value) != null && W.contains(H.relatedTarget))) && _();
    }
    function I(H) {
      v.value && (d.value ? H.key === "ArrowRight" ? _(i.value ? "prev" : "next") : H.key === "ArrowLeft" && _(i.value ? "next" : "prev") : H.key === "ArrowDown" ? _("next") : H.key === "ArrowUp" && _("prev"), H.key === "Home" ? _("first") : H.key === "End" && _("last"));
    }
    function _(H) {
      var W, J, se, fe, Z;
      if (v.value)
        if (!H)
          (W = Gr(v.value)[0]) == null || W.focus();
        else if (H === "next") {
          const le = (J = v.value.querySelector(":focus")) == null ? void 0 : J.nextElementSibling;
          le ? le.focus() : _("first");
        } else if (H === "prev") {
          const le = (se = v.value.querySelector(":focus")) == null ? void 0 : se.previousElementSibling;
          le ? le.focus() : _("last");
        } else H === "first" ? (fe = v.value.firstElementChild) == null || fe.focus() : H === "last" && ((Z = v.value.lastElementChild) == null || Z.focus());
    }
    function O(H) {
      const W = a.value + (H === "prev" ? -1 : 1) * u.value;
      a.value = Rt(W, 0, c.value - u.value);
    }
    const M = C(() => {
      let H = a.value > c.value - u.value ? -(c.value - u.value) + pf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (H = pf(-a.value));
      const W = i.value && d.value ? -1 : 1;
      return {
        transform: `translate${d.value ? "X" : "Y"}(${W * H}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), z = C(() => ({
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
        var H, W, J;
        return [N.value && y("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && O("prev")
        }, [((H = n.prev) == null ? void 0 : H.call(n, z.value)) ?? y(af, null, {
          default: () => [y(ze, {
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
          onTouchstartPassive: S,
          onTouchmovePassive: E,
          onTouchendPassive: k,
          onFocusin: R,
          onFocusout: D,
          onKeydown: I
        }, [(W = n.default) == null ? void 0 : W.call(n, z.value)])]), N.value && y("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }],
          onClick: () => B.value && O("next")
        }, [((J = n.next) == null ? void 0 : J.call(n, z.value)) ?? y(af, null, {
          default: () => [y(ze, {
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
}), xv = Symbol.for("vuetify:v-chip-group"), V1 = X({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ai
  },
  ...mu(),
  ..._e(),
  ...jl({
    selectedClass: "v-chip--selected"
  }),
  ...We(),
  ...Xe(),
  ...Gn({
    variant: "tonal"
  })
}, "VChipGroup");
de()({
  name: "VChipGroup",
  props: V1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = lo(e, xv);
    return Cn({
      VChip: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        filter: ae(e, "filter"),
        variant: ae(e, "variant")
      }
    }), ve(() => {
      const u = yl.filterProps(e);
      return y(yl, he(u, {
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
const L1 = X({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Te,
  closable: Boolean,
  closeIcon: {
    type: Te,
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
  prependIcon: Te,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: ln(),
  onClickOnce: ln(),
  ...$i(),
  ..._e(),
  ...Xt(),
  ...zn(),
  ...Gl(),
  ...Pt(),
  ...Zl(),
  ...so(),
  ...We({
    tag: "span"
  }),
  ...Xe(),
  ...Gn({
    variant: "tonal"
  })
}, "VChip"), _v = de()({
  name: "VChip",
  directives: {
    Ripple: Ri
  },
  props: L1(),
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
    } = uo(), {
      borderClasses: l
    } = Ni(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = vr(e), {
      densityClasses: c
    } = hn(e), {
      elevationClasses: d
    } = jn(e), {
      roundedClasses: f
    } = It(e), {
      sizeClasses: h
    } = ao(e), {
      themeClasses: v
    } = tt(e), m = $e(e, "modelValue"), p = Ul(e, xv, !1), g = Xl(e, n), w = C(() => e.link !== !1 && g.isLink.value), x = C(() => !e.disabled && e.link !== !1 && (!!p || e.link || g.isClickable.value)), b = C(() => ({
      "aria-label": o(e.closeLabel),
      onClick(k) {
        k.stopPropagation(), m.value = !1, i("click:close", k);
      }
    }));
    function S(k) {
      var P;
      i("click", k), x.value && ((P = g.navigate) == null || P.call(g, k), p == null || p.toggle());
    }
    function E(k) {
      (k.key === "Enter" || k.key === " ") && (k.preventDefault(), S(k));
    }
    return () => {
      const k = g.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), $ = !!(P || r.append), R = !!(r.close || e.closable), D = !!(r.filter || e.filter) && p, L = !!(e.prependIcon || e.prependAvatar), I = !!(L || r.prepend), _ = !p || p.isSelected.value;
      return m.value && De(y(k, {
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
        onClick: S,
        onKeydown: x.value && !w.value && E
      }, {
        default: () => {
          var O;
          return [hr(x.value, "v-chip"), D && y(mv, {
            key: "filter"
          }, {
            default: () => [De(y("div", {
              class: "v-chip__filter"
            }, [r.filter ? y(et, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : y(ze, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[yt, p.isSelected.value]])]
          }), I && y("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? y(et, {
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
          }, r.prepend) : y(Ve, null, [e.prependIcon && y(ze, {
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
          }, [r.append ? y(et, {
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
          }, r.append) : y(Ve, null, [e.appendIcon && y(ze, {
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
          }, b.value), [r.close ? y(et, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : y(ze, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[un("ripple"), x.value && e.ripple, null]]);
    };
  }
}), P1 = X({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ..._e(),
  ...ho({
    transition: {
      component: hv
    }
  })
}, "VCounter"), Sv = de()({
  name: "VCounter",
  functional: !0,
  props: P1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ve(() => y(An, {
      transition: e.transition
    }, {
      default: () => [De(y("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[yt, e.active]])]
    })), {};
  }
}), I1 = X({
  text: String,
  onClick: ln(),
  ..._e(),
  ...Xe()
}, "VLabel"), ts = de()({
  name: "VLabel",
  props: I1(),
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
}), T1 = X({
  floating: Boolean,
  ..._e()
}, "VFieldLabel"), Io = de()({
  name: "VFieldLabel",
  props: T1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(ts, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function kv(e) {
  const {
    t
  } = uo();
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
    return y(ze, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const gu = X({
  focused: Boolean,
  "onUpdate:focused": ln()
}, "focus");
function mr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En();
  const n = $e(e, "focused"), i = C(() => ({
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
const M1 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], yu = X({
  appendInnerIcon: Te,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Te,
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
  prependInnerIcon: Te,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => M1.includes(e)
  },
  "onClick:clear": ln(),
  "onClick:appendInner": ln(),
  "onClick:prependInner": ln(),
  ..._e(),
  ...au(),
  ...Pt(),
  ...Xe()
}, "VField"), pu = de()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...gu(),
    ...yu()
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
    } = tt(e), {
      loaderClasses: l
    } = ql(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = mr(e), {
      InputIcon: d
    } = kv(e), {
      roundedClasses: f
    } = It(e), {
      rtlClasses: h
    } = vn(), v = C(() => e.dirty || e.active), m = C(() => !e.singleLine && !!(e.label || r.label)), p = Lt(), g = C(() => e.id || `input-${p}`), w = C(() => `${g.value}-messages`), x = ee(), b = ee(), S = ee(), E = C(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: k,
      backgroundColorStyles: P
    } = Bt(ae(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = sn(C(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    be(v, (I) => {
      if (m.value) {
        const _ = x.value.$el, O = b.value.$el;
        requestAnimationFrame(() => {
          const M = tu(_), z = O.getBoundingClientRect(), N = z.x - M.x, F = z.y - M.y - (M.height / 2 - z.height / 2), B = z.width / 0.75, H = Math.abs(B - M.width) > 1 ? {
            maxWidth: ge(B)
          } : void 0, W = getComputedStyle(_), J = getComputedStyle(O), se = parseFloat(W.transitionDuration) * 1e3 || 150, fe = parseFloat(J.getPropertyValue("--v-field-label-scale")), Z = J.getPropertyValue("color");
          _.style.visibility = "visible", O.style.visibility = "hidden", pi(_, {
            transform: `translate(${N}px, ${F}px) scale(${fe})`,
            color: Z,
            ...H
          }, {
            duration: se,
            easing: Ur,
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
      controlRef: S,
      blur: c,
      focus: u
    }));
    function L(I) {
      I.target !== document.activeElement && I.preventDefault();
    }
    return ve(() => {
      var N, F, B;
      const I = e.variant === "outlined", _ = r["prepend-inner"] || e.prependInnerIcon, O = !!(e.clearable || r.clear), M = !!(r["append-inner"] || e.appendInnerIcon || O), z = () => r.label ? r.label({
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
          "v-field--no-label": !z(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, k.value, s.value, l.value, f.value, h.value, e.class],
        style: [P.value, e.style],
        onClick: L
      }, n), [y("div", {
        class: "v-field__overlay"
      }, null), y(uu, {
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
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && y(Io, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: g.value,
        style: R.value
      }, {
        default: () => [z()]
      }), y(Io, {
        ref: x,
        for: g.value
      }, {
        default: () => [z()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...D.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), O && y(mv, {
        key: "clear"
      }, {
        default: () => [De(y("div", {
          class: "v-field__clearable",
          onMousedown: (H) => {
            H.preventDefault(), H.stopPropagation();
          }
        }, [r.clear ? r.clear() : y(d, {
          name: "clear"
        }, null)]), [[yt, e.dirty]])]
      }), M && y("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(B = r["append-inner"]) == null ? void 0 : B.call(r, D.value), e.appendInnerIcon && y(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), y("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [I && y(Ve, null, [y("div", {
        class: "v-field__outline__start"
      }, null), m.value && y("div", {
        class: "v-field__outline__notch"
      }, [y(Io, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [z()]
      })]), y("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && m.value && y(Io, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [z()]
      })])]);
    }), {
      controlRef: S
    };
  }
});
function Cv(e) {
  const t = Object.keys(pu.props).filter((n) => !Qa(n) && n !== "class" && n !== "style");
  return ph(e, t);
}
const A1 = X({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ..._e(),
  ...ho({
    transition: {
      component: hv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), $1 = de()({
  name: "VMessages",
  props: A1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => _n(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = sn(C(() => e.color));
    return ve(() => y(An, {
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
}), N1 = Symbol.for("vuetify:form");
function Ev() {
  return He(N1, null);
}
const R1 = X({
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
  ...gu()
}, "validation");
function O1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lt();
  const i = $e(e, "modelValue"), r = C(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Ev(), l = ee([]), s = pe(!0), a = C(() => !!(_n(i.value === "" ? null : i.value).length || _n(r.value === "" ? null : r.value).length)), u = C(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = C(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), d = C(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? _n(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
  }), f = C(() => {
    let b = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    b === "lazy" && (b = "input lazy");
    const S = new Set((b == null ? void 0 : b.split(" ")) ?? []);
    return {
      blur: S.has("blur") || S.has("input"),
      input: S.has("input"),
      submit: S.has("submit"),
      lazy: S.has("lazy")
    };
  }), h = C(() => {
    var b;
    return e.error || (b = e.errorMessages) != null && b.length ? !1 : e.rules.length ? s.value ? l.value.length || f.value.lazy ? null : !0 : !l.value.length : !0;
  }), v = pe(!1), m = C(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = C(() => e.name ?? nn(n));
  Ol(() => {
    o == null || o.register({
      id: p.value,
      validate: x,
      reset: g,
      resetValidation: w
    });
  }), fn(() => {
    o == null || o.unregister(p.value);
  }), cn(async () => {
    f.value.lazy || await x(!0), o == null || o.update(p.value, h.value, d.value);
  }), Ei(() => f.value.input, () => {
    be(r, () => {
      if (r.value != null)
        x();
      else if (e.focused) {
        const b = be(() => e.focused, (S) => {
          S || x(), b();
        });
      }
    });
  }), Ei(() => f.value.blur, () => {
    be(() => e.focused, (b) => {
      b || x();
    });
  }), be([h, d], () => {
    o == null || o.update(p.value, h.value, d.value);
  });
  function g() {
    i.value = null, Ke(w);
  }
  function w() {
    s.value = !0, f.value.lazy ? l.value = [] : x(!0);
  }
  async function x() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const S = [];
    v.value = !0;
    for (const E of e.rules) {
      if (S.length >= +(e.maxErrors ?? 1))
        break;
      const P = await (typeof E == "function" ? E : () => E)(r.value);
      if (P !== !0) {
        if (P !== !1 && typeof P != "string") {
          console.warn(`${P} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        S.push(P || "");
      }
    }
    return l.value = S, v.value = !1, s.value = b, l.value;
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
const Oi = X({
  id: String,
  appendIcon: Te,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Te,
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
  "onClick:prepend": ln(),
  "onClick:append": ln(),
  ..._e(),
  ...Xt(),
  ...R1()
}, "VInput"), Yt = de()({
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
    } = hn(e), {
      rtlClasses: l
    } = vn(), {
      InputIcon: s
    } = kv(e), a = Lt(), u = C(() => e.id || `input-${a}`), c = C(() => `${u.value}-messages`), {
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
      validationClasses: S
    } = O1(e, "v-input", u), E = C(() => ({
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
    })), k = C(() => {
      var P;
      return (P = e.errorMessages) != null && P.length || !m.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ve(() => {
      var L, I, _, O;
      const P = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), R = k.value.length > 0, D = !e.hideDetails || e.hideDetails === "auto" && (R || !!i.details);
      return y("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, S.value, e.class],
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
      }, [y($1, {
        id: c.value,
        active: R,
        messages: k.value
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
}), B1 = X({
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
    validator: (e) => _n(e).every((t) => t != null && typeof t == "object")
  },
  ...yu({
    clearable: !0
  })
}, "VFileInput"), F1 = de()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: B1(),
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
    } = uo(), l = $e(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = mr(e), c = C(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = C(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: D = 0
      } = R;
      return $ + D;
    }, 0)), f = C(() => Ac(d.value, c.value)), h = C(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: D = 0
      } = $;
      return e.showSize ? `${R} (${Ac(D, c.value)})` : R;
    })), v = C(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, f.value) : o(e.counterString, $);
    }), m = ee(), p = ee(), g = ee(), w = C(() => s.value || e.active), x = C(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      g.value !== document.activeElement && (($ = g.value) == null || $.focus()), s.value || a();
    }
    function S($) {
      var R;
      (R = g.value) == null || R.click();
    }
    function E($) {
      i("mousedown:control", $);
    }
    function k($) {
      var R;
      (R = g.value) == null || R.click(), i("click:control", $);
    }
    function P($) {
      $.stopPropagation(), b(), Ke(() => {
        l.value = [], _h(e["onClick:clear"], $);
      });
    }
    return be(l, ($) => {
      (!Array.isArray($) || !$.length) && g.value && (g.value.value = "");
    }), ve(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [D, L] = fr(n), {
        modelValue: I,
        ..._
      } = Yt.filterProps(e), O = Cv(e);
      return y(Yt, he({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (M) => l.value = M,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": x.value
        }, e.class],
        style: e.style,
        "onClick:prepend": S
      }, D, _, {
        centerAffix: !x.value,
        focused: s.value
      }), {
        ...r,
        default: (M) => {
          let {
            id: z,
            isDisabled: N,
            isDirty: F,
            isReadonly: B,
            isValid: H
          } = M;
          return y(pu, he({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: E,
            onClick: k,
            "onClick:clear": P,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, O, {
            id: z.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: N.value,
            focused: s.value,
            error: H.value === !1
          }), {
            ...r,
            default: (W) => {
              var fe;
              let {
                props: {
                  class: J,
                  ...se
                }
              } = W;
              return y(Ve, null, [y("input", he({
                ref: g,
                type: "file",
                readonly: B.value,
                disabled: N.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (Z) => {
                  Z.stopPropagation(), B.value && Z.preventDefault(), b();
                },
                onChange: (Z) => {
                  if (!Z.target) return;
                  const le = Z.target;
                  l.value = [...le.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, se, L), null), y("div", {
                class: J
              }, [!!((fe = l.value) != null && fe.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: d.value,
                totalBytesReadable: f.value
              }) : e.chips ? h.value.map((Z) => y(_v, {
                key: Z,
                size: "small",
                color: e.color
              }, {
                default: () => [Z]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: R ? (M) => {
          var z, N;
          return y(Ve, null, [(z = r.details) == null ? void 0 : z.call(r, M), $ && y(Ve, null, [y("span", null, null), y(Sv, {
            active: !!((N = l.value) != null && N.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), si({}, m, p, g);
  }
}), Vv = Ql.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Lv = Ql.reduce((e, t) => {
  const n = "offset" + Dn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Pv = Ql.reduce((e, t) => {
  const n = "order" + Dn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), wf = {
  col: Object.keys(Vv),
  offset: Object.keys(Lv),
  order: Object.keys(Pv)
};
function D1(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const H1 = ["auto", "start", "end", "center", "baseline", "stretch"], z1 = X({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Vv,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Lv,
  order: {
    type: [String, Number],
    default: null
  },
  ...Pv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => H1.includes(e)
  },
  ..._e(),
  ...We()
}, "VCol"), Wi = de()({
  name: "VCol",
  props: z1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => {
      const r = [];
      let o;
      for (o in wf)
        wf[o].forEach((s) => {
          const a = e[s], u = D1(o, s, a);
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
}), bu = ["start", "end", "center"], Iv = ["space-between", "space-around", "space-evenly"];
function wu(e, t) {
  return Ql.reduce((n, i) => {
    const r = e + Dn(i);
    return n[r] = t(), n;
  }, {});
}
const j1 = [...bu, "baseline", "stretch"], Tv = (e) => j1.includes(e), Mv = wu("align", () => ({
  type: String,
  default: null,
  validator: Tv
})), G1 = [...bu, ...Iv], Av = (e) => G1.includes(e), $v = wu("justify", () => ({
  type: String,
  default: null,
  validator: Av
})), U1 = [...bu, ...Iv, "stretch"], Nv = (e) => U1.includes(e), Rv = wu("alignContent", () => ({
  type: String,
  default: null,
  validator: Nv
})), xf = {
  align: Object.keys(Mv),
  justify: Object.keys($v),
  alignContent: Object.keys(Rv)
}, W1 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function q1(e, t, n) {
  let i = W1[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const Y1 = X({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Tv
  },
  ...Mv,
  justify: {
    type: String,
    default: null,
    validator: Av
  },
  ...$v,
  alignContent: {
    type: String,
    default: null,
    validator: Nv
  },
  ...Rv,
  ..._e(),
  ...We()
}, "VRow"), St = de()({
  name: "VRow",
  props: Y1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = C(() => {
      const r = [];
      let o;
      for (o in xf)
        xf[o].forEach((l) => {
          const s = e[l], a = q1(o, l, s);
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
}), pl = dr("v-spacer", "div", "VSpacer"), Ov = Symbol.for("vuetify:selection-control-group"), xu = X({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Te,
  trueIcon: Te,
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
  ..._e(),
  ...Xt(),
  ...Xe()
}, "SelectionControlGroup"), K1 = X({
  ...xu({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup"), X1 = de()({
  name: "VSelectionControlGroup",
  props: K1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = Lt(), o = C(() => e.id || `v-selection-control-group-${r}`), l = C(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return ut(Ov, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), pt(() => {
          s.delete(a);
        });
      }
    }), Cn({
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
}), ns = X({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ..._e(),
  ...xu()
}, "VSelectionControl");
function Z1(e) {
  const t = He(Ov, void 0), {
    densityClasses: n
  } = hn(e), i = $e(e, "modelValue"), r = C(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = C(() => e.falseValue !== void 0 ? e.falseValue : !1), l = C(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = C({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? _n(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [..._n(i.value), v] : _n(i.value).filter((p) => !e.valueComparator(p, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = sn(C(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = Bt(C(() => s.value && !e.error && !e.disabled ? e.color : void 0)), f = C(() => s.value ? e.trueIcon : e.falseIcon);
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
const sr = de()({
  name: "VSelectionControl",
  directives: {
    Ripple: Ri
  },
  inheritAttrs: !1,
  props: ns(),
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
    } = Z1(e), h = Lt(), v = pe(!1), m = pe(!1), p = ee(), g = C(() => e.id || `input-${h}`), w = C(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function x(k) {
      w.value && (v.value = !0, cl(k.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function S(k) {
      k.stopPropagation();
    }
    function E(k) {
      w.value && (e.readonly && r && Ke(() => r.forceUpdate()), s.value = k.target.checked);
    }
    return ve(() => {
      var D, L;
      const k = i.label ? i.label({
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label, [P, $] = fr(n), R = y("input", he({
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
      }), De(y("div", {
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
      })) ?? y(Ve, null, [l.value && y(ze, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[un("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), k && y(ts, {
        for: g.value,
        onClick: S
      }, {
        default: () => [k]
      })]);
    }), {
      isFocused: v,
      input: p
    };
  }
}), J1 = X({
  ...ns({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio"), _f = de()({
  name: "VRadio",
  props: J1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(sr, he(e, {
      class: ["v-radio", e.class],
      style: e.style,
      type: "radio"
    }), n)), {};
  }
}), Q1 = X({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...Oi(),
  ...Kt(xu(), ["multiple"]),
  trueIcon: {
    type: Te,
    default: "$radioOn"
  },
  falseIcon: {
    type: Te,
    default: "$radioOff"
  },
  type: {
    type: String,
    default: "radio"
  }
}, "VRadioGroup"), eb = de()({
  name: "VRadioGroup",
  inheritAttrs: !1,
  props: Q1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Lt(), o = C(() => e.id || `radio-group-${r}`), l = $e(e, "modelValue");
    return ve(() => {
      const [s, a] = fr(n), u = Yt.filterProps(e), c = sr.filterProps(e), d = i.label ? i.label({
        label: e.label,
        props: {
          for: o.value
        }
      }) : e.label;
      return y(Yt, he({
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
          return y(Ve, null, [d && y(ts, {
            id: h.value
          }, {
            default: () => [d]
          }), y(X1, he(c, {
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
function tb(e) {
  const t = pe(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), Ke(() => t.value = e);
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
  return pt(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const nb = X({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...co({
    location: "bottom"
  }),
  ...Yl(),
  ...Pt(),
  ...Gn(),
  ...Xe(),
  ...Kt(mo({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), la = de()({
  name: "VSnackbar",
  props: nb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      locationStyles: r
    } = fo(e), {
      positionClasses: o
    } = Kl(e), {
      scopeId: l
    } = vo(), {
      themeClasses: s
    } = tt(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = vr(e), {
      roundedClasses: d
    } = It(e), f = tb(Number(e.timeout)), h = ee(), v = ee(), m = pe(!1);
    be(i, g), be(() => e.timeout, g), cn(() => {
      i.value && g();
    });
    let p = -1;
    function g() {
      f.reset(), window.clearTimeout(p);
      const S = Number(e.timeout);
      if (!i.value || S === -1) return;
      const E = jr(v.value);
      f.start(E), p = window.setTimeout(() => {
        i.value = !1;
      }, S);
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
      const S = ii.filterProps(e), E = !!(n.default || n.text || e.text);
      return y(ii, he({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": i.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, S, {
        modelValue: i.value,
        "onUpdate:modelValue": (k) => i.value = k,
        contentProps: he({
          class: ["v-snackbar__wrapper", s.value, a.value, d.value, c.value],
          style: [r.value, u.value],
          onPointerenter: x,
          onPointerleave: b
        }, S.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, l), {
        default: () => {
          var k, P;
          return [hr(!1, "v-snackbar"), e.timer && !m.value && y("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [y(Xh, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), E && y("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((k = n.text) == null ? void 0 : k.call(n)) ?? e.text, (P = n.default) == null ? void 0 : P.call(n)]), n.actions && y(et, {
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
}), Bv = Symbol.for("vuetify:v-tabs"), ib = X({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Kt(ov({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), sa = de()({
  name: "VTab",
  props: ib(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = sn(e, "sliderColor"), l = ee(), s = ee(), a = C(() => e.direction === "horizontal"), u = C(() => {
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
        const g = getComputedStyle(m).color, w = m.getBoundingClientRect(), x = p.getBoundingClientRect(), b = a.value ? "x" : "y", S = a.value ? "X" : "Y", E = a.value ? "right" : "bottom", k = a.value ? "width" : "height", P = w[b], $ = x[b], R = P > $ ? w[E] - x[E] : w[b] - x[b], D = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", I = (Math.abs(R) + (Math.sign(R) < 0 ? w[k] : x[k])) / Math.max(w[k], x[k]) || 0, _ = w[k] / x[k] || 0, O = 1.5;
        pi(p, {
          backgroundColor: [g, "currentcolor"],
          transform: [`translate${S}(${R}px) scale${S}(${_})`, `translate${S}(${R / O}px) scale${S}(${(I - 1) / O + 1})`, "none"],
          transformOrigin: Array(3).fill(D)
        }, {
          duration: 225,
          easing: Ur
        });
      }
    }
    return ve(() => {
      const d = at.filterProps(e);
      return y(at, he({
        symbol: Bv,
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
          return y(Ve, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && y("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), si({}, l);
  }
});
function rb(e) {
  return e ? e.map((t) => sl(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const ob = X({
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
  ...mu({
    mandatory: "force"
  }),
  ...Xt(),
  ...We()
}, "VTabs"), lb = de()({
  name: "VTabs",
  props: ob(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = C(() => rb(e.items)), {
      densityClasses: o
    } = hn(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = Bt(ae(e, "bgColor"));
    return Cn({
      VTab: {
        color: ae(e, "color"),
        direction: ae(e, "direction"),
        stacked: ae(e, "stacked"),
        fixed: ae(e, "fixedTabs"),
        sliderColor: ae(e, "sliderColor"),
        hideSlider: ae(e, "hideSlider")
      }
    }), ve(() => {
      const a = yl.filterProps(e);
      return y(yl, he(a, {
        modelValue: i.value,
        "onUpdate:modelValue": (u) => i.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, l.value, e.class],
        style: [{
          "--v-tabs-height": ge(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: Bv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => y(sa, he(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), sb = X({
  id: String,
  text: String,
  ...Kt(mo({
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
}, "VTooltip"), Qi = de()({
  name: "VTooltip",
  props: sb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = vo(), o = Lt(), l = C(() => e.id || `v-tooltip-${o}`), s = ee(), a = C(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = C(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = C(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), d = C(() => he({
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
}), ab = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function ub(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function cb(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), ab(t);
}
function fb(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function db() {
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
    touchstart: (n) => ub(n, t),
    touchend: (n) => cb(n, t),
    touchmove: (n) => fb(n, t)
  };
}
function hb(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = db(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, yh(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function vb(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  yh(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const Fv = {
  mounted: hb,
  unmounted: vb
}, mb = Fv, Dv = Symbol.for("vuetify:v-window"), Hv = Symbol.for("vuetify:v-window-group"), gb = X({
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
  ..._e(),
  ...We(),
  ...Xe()
}, "VWindow"), yb = de()({
  name: "VWindow",
  directives: {
    Touch: Fv
  },
  props: gb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      isRtl: r
    } = vn(), {
      t: o
    } = uo(), l = lo(e, Hv), s = ee(), a = C(() => r.value ? !e.reverse : e.reverse), u = pe(!1), c = C(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), d = pe(0), f = ee(void 0), h = C(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    be(h, (b, S) => {
      const E = l.items.value.length, k = E - 1;
      E <= 2 ? u.value = b < S : b === k && S === 0 ? u.value = !0 : b === 0 && S === k ? u.value = !1 : u.value = b < S;
    }), ut(Dv, {
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
      const b = [], S = {
        icon: r.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: l.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      b.push(v.value ? n.prev ? n.prev({
        props: S
      }) : y(at, S, null) : y("div", null, null));
      const E = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: E
      }) : y(at, E, null) : y("div", null, null)), b;
    }), x = C(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : g();
        },
        right: () => {
          a.value ? g() : p();
        },
        start: (S) => {
          let {
            originalEvent: E
          } = S;
          E.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ve(() => De(y(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var b, S;
        return [y("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(b = n.default) == null ? void 0 : b.call(n, {
          group: l
        }), e.showArrows !== !1 && y("div", {
          class: "v-window__controls"
        }, [w.value])]), (S = n.additional) == null ? void 0 : S.call(n, {
          group: l
        })];
      }
    }), [[un("touch"), x.value]])), {
      group: l
    };
  }
});
function zv() {
  const e = pe(!1);
  return cn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: C(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: io(e)
  };
}
const pb = X({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ..._e(),
  ...Gl(),
  ...es()
}, "VWindowItem"), Sf = de()({
  name: "VWindowItem",
  directives: {
    Touch: mb
  },
  props: pb(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Dv), r = Ul(e, Hv), {
      isBooted: o
    } = zv();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = pe(!1), s = C(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !l.value || !i || (l.value = !1, i.transitionCount.value > 0 && (i.transitionCount.value -= 1, i.transitionCount.value === 0 && (i.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      l.value || !i || (l.value = !0, i.transitionCount.value === 0 && (i.transitionHeight.value = ge((v = i.rootRef.value) == null ? void 0 : v.clientHeight)), i.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function d(v) {
      l.value && Ke(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = ge(v.clientHeight));
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
    } = hu(e, r.isSelected);
    return ve(() => y(An, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [De(y("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[yt, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), bb = /* @__PURE__ */ Me("h3", { class: "heading" }, "Select File", -1), wb = /* @__PURE__ */ Me("p", null, " Files in a specific JSON format or trivial graph format are supported. ", -1), xb = /* @__PURE__ */ Me("p", null, [
  /* @__PURE__ */ Je("Importing will "),
  /* @__PURE__ */ Me("strong", null, "replace"),
  /* @__PURE__ */ Je(" your current graph.")
], -1), _b = /* @__PURE__ */ Me("h3", { class: "heading" }, "Select Format", -1), Sb = /* @__PURE__ */ Me("h3", { class: "heading" }, "Preview", -1), kb = /* @__PURE__ */ Me("strong", null, "copy", -1), Cb = /* @__PURE__ */ Mi({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null },
    graphAsJson: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = ee(!1), o = ee(0), l = ee(), s = ee("JSON"), a = ee(!1), u = ee(!1), c = ee(""), d = ee(""), f = C(
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
          x.text().then((S) => {
            b === "tgf" ? i("file-imported", S) : b === "json" ? i("file-imported", JSON.parse(S)) : g("No valid file extension.", ""), p();
          }).catch((S) => {
            g(`Error reading the imported file ${x.name}`, S);
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
    return (w, x) => (dt(), on(vu, {
      modelValue: r.value,
      "onUpdate:modelValue": x[8] || (x[8] = (b) => r.value = b),
      "max-width": "800px"
    }, {
      activator: ce(({ props: b }) => [
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ce(({ props: S }) => [
            y(at, he({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...b, ...S }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(() => [
        y(cu, null, {
          default: ce(() => [
            y(Yr, null, {
              default: ce(() => [
                y(lb, {
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
                        Je("Import")
                      ]),
                      _: 1
                    }),
                    y(sa, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ce(() => [
                        Je("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            y(Nr, null, {
              default: ce(() => [
                y(yb, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[3] || (x[3] = (b) => o.value = b),
                  class: "ml-4"
                }, {
                  default: ce(() => [
                    y(Sf, null, {
                      default: ce(() => [
                        bb,
                        y(F1, {
                          modelValue: l.value,
                          "onUpdate:modelValue": x[1] || (x[1] = (b) => l.value = b),
                          accept: ".tgf, .json",
                          density: "compact",
                          label: "Graph Format File",
                          rules: h,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        y(Nr, null, {
                          default: ce(() => [
                            wb,
                            xb
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(Sf, null, {
                      default: ce(() => [
                        _b,
                        y(eb, {
                          inline: "",
                          modelValue: s.value,
                          "onUpdate:modelValue": x[2] || (x[2] = (b) => s.value = b)
                        }, {
                          default: ce(() => [
                            y(_f, {
                              label: "JSON",
                              value: "JSON"
                            }),
                            y(_f, {
                              label: "TGF",
                              value: "TGF"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        Sb,
                        De(Me("pre", null, ft(n.graphAsJson), 513), [
                          [yt, s.value === "JSON"]
                        ]),
                        De(Me("pre", null, ft(n.graphAsTgf), 513), [
                          [yt, s.value === "TGF"]
                        ]),
                        y(Nr, null, {
                          default: ce(() => [
                            Je("This export action will "),
                            kb,
                            Je(" the graph as JSON or in trivial graph format to your clipboard.")
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
            y(Jl, null, {
              default: ce(() => [
                y(pl),
                y(at, {
                  color: "secondary",
                  variant: "text",
                  disabled: !f.value,
                  onClick: x[4] || (x[4] = (b) => m())
                }, {
                  default: ce(() => [
                    Je("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                y(at, {
                  color: "secondary",
                  variant: "text",
                  onClick: x[5] || (x[5] = (b) => p())
                }, {
                  default: ce(() => [
                    Je("Close")
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
            y(St, { align: "center" }, {
              default: ce(() => [
                y(ze, {
                  icon: "$error",
                  class: "ml-2"
                }),
                y(Wi, null, {
                  default: ce(() => [
                    Me("h4", null, ft(c.value), 1),
                    Me("p", null, ft(d.value), 1)
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
            y(ze, {
              color: "secondary",
              icon: "$success"
            }),
            Je(" Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Eb = ".heading{margin-top:10px;margin-bottom:10px}", _u = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, Vb = /* @__PURE__ */ _u(Cb, [["styles", [Eb]]]), Lb = X({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ..._e(),
  ...Xt(),
  ...We(),
  ...Xe()
}, "VTable"), Pb = de()({
  name: "VTable",
  props: Lb(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = tt(e), {
      densityClasses: o
    } = hn(e);
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
            height: ge(e.height)
          }
        }, [y("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), Ib = { class: "text-left" }, Tb = { class: "text-left" }, Mb = { class: "text-left" }, jv = /* @__PURE__ */ Mi({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
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
        desktop: "Left-click on label",
        mobile: "Tap on label"
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
    return (o, l) => (dt(), on(Pb, {
      density: "comfortable",
      "fixed-header": ""
    }, {
      default: ce(() => [
        De(Me("thead", null, [
          Me("tr", null, [
            Me("th", Ib, ft(r[0]), 1),
            Me("th", Tb, ft(r[1]), 1),
            Me("th", Mb, ft(r[2]), 1)
          ])
        ], 512), [
          [yt, t.showHeader]
        ]),
        Me("tbody", null, [
          (dt(), nl(Ve, null, Zu(n, (s) => De(Me("tr", {
            key: s.action
          }, [
            Me("td", null, ft(s.action), 1),
            Me("td", null, ft(s.desktop), 1),
            Me("td", null, ft(s.mobile), 1)
          ]), [
            [yt, t.showControlsGraph]
          ])), 64)),
          (dt(), nl(Ve, null, Zu(i, (s) => De(Me("tr", {
            key: s.action
          }, [
            Me("td", null, ft(s.action), 1),
            Me("td", null, ft(s.desktop), 1),
            Me("td", null, ft(s.mobile), 1)
          ]), [
            [yt, t.showControlsEnvironment]
          ])), 64))
        ])
      ]),
      _: 1
    }));
  }
}), Ab = /* @__PURE__ */ Mi({
  __name: "GraphHelp",
  setup(e) {
    const t = ee(!1);
    return (n, i) => (dt(), on(vu, {
      modelValue: t.value,
      "onUpdate:modelValue": i[1] || (i[1] = (r) => t.value = r),
      "max-width": "800px"
    }, {
      activator: ce(({ props: r }) => [
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ce(({ props: o }) => [
            y(at, he({
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
        y(cu, null, {
          default: ce(() => [
            y(Yr, { class: "card-header" }, {
              default: ce(() => [
                Je("Controls")
              ]),
              _: 1
            }),
            y(jv, {
              "show-controls-environment": "",
              "show-header": "",
              "show-controls-graph": ""
            }),
            y(Jl, null, {
              default: ce(() => [
                y(pl),
                y(at, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: i[0] || (i[0] = (r) => t.value = !1)
                }, {
                  default: ce(() => [
                    Je(" Close ")
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
}), $b = ".v-data-table-header-mobile tr:first-child th[data-v-1a420e58]{height:0!important}", Nb = /* @__PURE__ */ _u(Ab, [["styles", [$b]], ["__scopeId", "data-v-1a420e58"]]), Gv = X({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Te,
    default: "$checkboxIndeterminate"
  },
  ...ns({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), aa = de()({
  name: "VCheckboxBtn",
  props: Gv(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "indeterminate"), r = $e(e, "modelValue");
    function o(a) {
      i.value && (i.value = !1);
    }
    const l = C(() => i.value ? e.indeterminateIcon : e.falseIcon), s = C(() => i.value ? e.indeterminateIcon : e.trueIcon);
    return ve(() => {
      const a = Kt(sr.filterProps(e), ["modelValue"]);
      return y(sr, he(a, {
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
}), Rb = X({
  ...Oi(),
  ...Kt(Gv(), ["inline"])
}, "VCheckbox"), Ob = de()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Rb(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = $e(e, "modelValue"), {
      isFocused: o,
      focus: l,
      blur: s
    } = mr(e), a = Lt(), u = C(() => e.id || `checkbox-${a}`);
    return ve(() => {
      const [c, d] = fr(n), f = Yt.filterProps(e), h = aa.filterProps(e);
      return y(Yt, he({
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
}), Bb = X({
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
  ..._e()
}, "VColorPickerCanvas"), Fb = dn({
  name: "VColorPickerCanvas",
  props: Bb(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = pe(!1), r = ee(), o = pe(parseFloat(e.width)), l = pe(parseFloat(e.height)), s = ee({
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
          s: Rt(g, 0, o.value) / o.value,
          v: 1 - Rt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = C(() => {
      const {
        x: p,
        y: g
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: ge(e.dotSize),
        height: ge(e.dotSize),
        transform: `translate(${ge(p - w)}, ${ge(g - w)})`
      };
    }), {
      resizeRef: c
    } = lr((p) => {
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
        width: S,
        height: E
      } = w;
      a.value = {
        x: Rt(p - x, 0, S),
        y: Rt(g - b, 0, E)
      };
    }
    function f(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const g = Py(p);
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
    return be(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, m, {
      immediate: !0
    }), be(() => [o.value, l.value], (p, g) => {
      m(), s.value = {
        x: a.value.x * p[0] / g[0],
        y: a.value.y * p[1] / g[1]
      };
    }, {
      flush: "post"
    }), be(() => e.color, () => {
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
    }), cn(() => m()), ve(() => y("div", {
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
function Db(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function Hb(e, t) {
  if (t == null || typeof t == "string") {
    const n = Rh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return yi(t, ["r", "g", "b"]) ? n = Bn(e) : yi(t, ["h", "s", "l"]) ? n = Ih(e) : yi(t, ["h", "s", "v"]) && (n = e), Db(n, !yi(t, ["a"]) && e.a === 1);
  }
  return e;
}
const qi = {
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
  to: Bn,
  from: zl
};
var sd;
const zb = {
  ...ua,
  inputs: (sd = ua.inputs) == null ? void 0 : sd.slice(0, 3)
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
  to: Ih,
  from: iu
}, jb = {
  ...ca,
  inputs: ca.inputs.slice(0, 3)
}, Uv = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: Rh,
  from: Nh
}, Gb = {
  ...Uv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, ki = {
  rgb: zb,
  rgba: ua,
  hsl: jb,
  hsla: ca,
  hex: Gb,
  hexa: Uv
}, Ub = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return y("div", {
    class: "v-color-picker-edit__input"
  }, [y("input", n, null), y("span", null, [t])]);
}, Wb = X({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(ki).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(ki),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(ki).includes(t))
  },
  ..._e()
}, "VColorPickerEdit"), qb = dn({
  name: "VColorPickerEdit",
  props: Wb(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = C(() => e.modes.map((o) => ({
      ...ki[o],
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
            h && n("update:color", o.from(c(l ?? o.to(qi), h.value)));
          }
        };
      });
    });
    return ve(() => {
      var o;
      return y("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => y(Ub, l, null)), i.value.length > 1 && y(at, {
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
}), Su = Symbol.for("vuetify:v-slider");
function Yb(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function Kb(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const Xb = X({
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
  ...zn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), Zb = (e) => {
  const t = C(() => parseFloat(e.min)), n = C(() => parseFloat(e.max)), i = C(() => +e.step > 0 ? parseFloat(e.step) : 0), r = C(() => Math.max(Ic(i.value), Ic(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = Rt(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, Jb = (e) => {
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
  } = vn(), a = ae(t, "reverse"), u = C(() => t.direction === "vertical"), c = C(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: m
  } = n, p = C(() => parseInt(t.thumbSize, 10)), g = C(() => parseInt(t.tickSize, 10)), w = C(() => parseInt(t.trackSize, 10)), x = C(() => (f.value - d.value) / h.value), b = ae(t, "disabled"), S = C(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = C(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), k = C(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), P = pe(!1), $ = pe(0), R = ee(), D = ee();
  function L(Z) {
    var U;
    const le = t.direction === "vertical", Ce = le ? "top" : "left", Be = le ? "height" : "width", je = le ? "clientY" : "clientX", {
      [Ce]: wt,
      [Be]: gn
    } = (U = R.value) == null ? void 0 : U.$el.getBoundingClientRect(), V = Kb(Z, je);
    let A = Math.min(Math.max((V - wt - $.value) / gn, 0), 1) || 0;
    return (le ? c.value : c.value !== s.value) && (A = 1 - A), m(d.value + A * (f.value - d.value));
  }
  const I = (Z) => {
    o({
      value: L(Z)
    }), P.value = !1, $.value = 0;
  }, _ = (Z) => {
    D.value = l(Z), D.value && (D.value.focus(), P.value = !0, D.value.contains(Z.target) ? $.value = Yb(Z, D.value, t.direction) : ($.value = 0, r({
      value: L(Z)
    })), i({
      value: L(Z)
    }));
  }, O = {
    passive: !0,
    capture: !0
  };
  function M(Z) {
    r({
      value: L(Z)
    });
  }
  function z(Z) {
    Z.stopPropagation(), Z.preventDefault(), I(Z), window.removeEventListener("mousemove", M, O), window.removeEventListener("mouseup", z);
  }
  function N(Z) {
    var le;
    I(Z), window.removeEventListener("touchmove", M, O), (le = Z.target) == null || le.removeEventListener("touchend", N);
  }
  function F(Z) {
    var le;
    _(Z), window.addEventListener("touchmove", M, O), (le = Z.target) == null || le.addEventListener("touchend", N, {
      passive: !1
    });
  }
  function B(Z) {
    Z.preventDefault(), _(Z), window.addEventListener("mousemove", M, O), window.addEventListener("mouseup", z, {
      passive: !1
    });
  }
  const H = (Z) => {
    const le = (Z - d.value) / (f.value - d.value) * 100;
    return Rt(isNaN(le) ? 0 : le, 0, 100);
  }, W = ae(t, "showTicks"), J = C(() => W.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((Z) => ({
    value: Z,
    position: H(Z),
    label: Z.toString()
  })) : Object.keys(t.ticks).map((Z) => ({
    value: parseFloat(Z),
    position: H(parseFloat(Z)),
    label: t.ticks[Z]
  })) : x.value !== 1 / 0 ? Ja(x.value + 1).map((Z) => {
    const le = d.value + Z * h.value;
    return {
      value: le,
      position: H(le)
    };
  }) : [] : []), se = C(() => J.value.some((Z) => {
    let {
      label: le
    } = Z;
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
    parsedTicks: J,
    parseMouseMove: L,
    position: H,
    readonly: ae(t, "readonly"),
    rounded: ae(t, "rounded"),
    roundValue: m,
    showTicks: W,
    startOffset: $,
    step: h,
    thumbSize: p,
    thumbColor: S,
    thumbLabel: ae(t, "thumbLabel"),
    ticks: ae(t, "ticks"),
    tickSize: g,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: k,
    trackSize: w,
    vertical: u
  };
  return ut(Su, fe), fe;
}, Qb = X({
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
  ..._e()
}, "VSliderThumb"), ew = de()({
  name: "VSliderThumb",
  directives: {
    Ripple: Ri
  },
  props: Qb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = He(Su), {
      isRtl: o,
      rtlClasses: l
    } = vn();
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
      elevationClasses: S
    } = jn(b), {
      textColorClasses: E,
      textColorStyles: k
    } = sn(s), {
      pageup: P,
      pagedown: $,
      end: R,
      home: D,
      left: L,
      right: I,
      down: _,
      up: O
    } = Cy, M = [P, $, R, D, L, I, _, O], z = C(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function N(B, H) {
      if (!M.includes(B.key)) return;
      B.preventDefault();
      const W = a.value || 0.1, J = (e.max - e.min) / W;
      if ([L, I, _, O].includes(B.key)) {
        const fe = (v.value ? [o.value ? L : I, h.value ? _ : O] : x.value !== o.value ? [L, O] : [I, O]).includes(B.key) ? 1 : -1, Z = B.shiftKey ? 2 : B.ctrlKey ? 1 : 0;
        H = H + fe * W * z.value[Z];
      } else if (B.key === D)
        H = e.min;
      else if (B.key === R)
        H = e.max;
      else {
        const se = B.key === $ ? 1 : -1;
        H = H - se * W * (J > 100 ? J / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, H));
    }
    function F(B) {
      const H = N(B, e.modelValue);
      H != null && i("update:modelValue", H);
    }
    return ve(() => {
      const B = ge(x.value ? 100 - e.position : e.position, "%");
      return y("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && g.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": B,
          "--v-slider-thumb-size": ge(c.value)
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
        class: ["v-slider-thumb__surface", E.value, S.value],
        style: {
          ...k.value
        }
      }, null), De(y("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: k.value
      }, null), [[un("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), y(dv, {
        origin: "bottom center"
      }, {
        default: () => {
          var H;
          return [De(y("div", {
            class: "v-slider-thumb__label-container"
          }, [y("div", {
            class: ["v-slider-thumb__label"]
          }, [y("div", null, [((H = n["thumb-label"]) == null ? void 0 : H.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[yt, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), tw = X({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ..._e()
}, "VSliderTrack"), nw = de()({
  name: "VSliderTrack",
  props: tw(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Su);
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
    } = Bt(c), {
      backgroundColorClasses: x,
      backgroundColorStyles: b
    } = Bt(u), S = C(() => `inset-${f.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), E = C(() => f.value ? "height" : "width"), k = C(() => ({
      [S.value]: "0%",
      [E.value]: "100%"
    })), P = C(() => e.stop - e.start), $ = C(() => ({
      [S.value]: ge(e.start, "%"),
      [E.value]: ge(P.value, "%")
    })), R = C(() => s.value ? (f.value ? o.value.slice().reverse() : o.value).map((L, I) => {
      var O;
      const _ = L.value !== h.value && L.value !== v.value ? ge(L.position, "%") : void 0;
      return y("div", {
        key: L.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": L.position >= e.start && L.position <= e.stop,
          "v-slider-track__tick--first": L.value === h.value,
          "v-slider-track__tick--last": L.value === v.value
        }],
        style: {
          [S.value]: _
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
        "--v-slider-track-size": ge(d.value),
        "--v-slider-tick-size": ge(a.value)
      }, e.style]
    }, [y("div", {
      class: ["v-slider-track__background", x.value, {
        "v-slider-track__background--opacity": !!r.value || !c.value
      }],
      style: {
        ...k.value,
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
}), iw = X({
  ...gu(),
  ...Xb(),
  ...Oi(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), kf = de()({
  name: "VSlider",
  props: iw(),
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
    const r = ee(), {
      rtlClasses: o
    } = vn(), l = Zb(e), s = $e(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
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
    } = Jb({
      props: e,
      steps: l,
      onSliderStart: () => {
        i("start", s.value);
      },
      onSliderEnd: (E) => {
        let {
          value: k
        } = E;
        const P = d(k);
        s.value = P, i("end", P);
      },
      onSliderMove: (E) => {
        let {
          value: k
        } = E;
        return s.value = d(k);
      },
      getActiveThumb: () => {
        var E;
        return (E = r.value) == null ? void 0 : E.$el;
      }
    }), {
      isFocused: w,
      focus: x,
      blur: b
    } = mr(e), S = C(() => m(s.value));
    return ve(() => {
      const E = Yt.filterProps(e), k = !!(e.label || n.label || n.prepend);
      return y(Yt, he({
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
        prepend: k ? (P) => {
          var $, R;
          return y(Ve, null, [(($ = n.label) == null ? void 0 : $.call(n, P)) ?? (e.label ? y(ts, {
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
          }, null), y(nw, {
            ref: v,
            start: 0,
            stop: S.value
          }, {
            "tick-label": n["tick-label"]
          }), y(ew, {
            ref: r,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (D) => s.value = D,
            position: S.value,
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
}), rw = X({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ..._e()
}, "VColorPickerPreview"), ow = dn({
  name: "VColorPickerPreview",
  props: rw(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    Bl(() => i.abort());
    async function r() {
      if (!Vc) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Nh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? qi,
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
      }, [Vc && y("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [y(at, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), y("div", {
        class: "v-color-picker-preview__dot"
      }, [y("div", {
        style: {
          background: Mh(e.color ?? qi)
        }
      }, null)]), y("div", {
        class: "v-color-picker-preview__sliders"
      }, [y(kf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? qi,
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
      }, null), !e.hideAlpha && y(kf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? qi,
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
}), lw = {
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
}, sw = {
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
}, aw = {
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
}, uw = {
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
}, cw = {
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
}, fw = {
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
}, dw = {
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
}, hw = {
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
}, vw = {
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
}, mw = {
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
}, gw = {
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
}, yw = {
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
}, pw = {
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
}, bw = {
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
}, ww = {
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
}, xw = {
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
}, _w = {
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
}, kw = {
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
}, Cw = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, Ew = {
  red: lw,
  pink: sw,
  purple: aw,
  deepPurple: uw,
  indigo: cw,
  blue: fw,
  lightBlue: dw,
  cyan: hw,
  teal: vw,
  green: mw,
  lightGreen: gw,
  lime: yw,
  yellow: pw,
  amber: bw,
  orange: ww,
  deepOrange: xw,
  brown: _w,
  blueGrey: Sw,
  grey: kw,
  shades: Cw
}, Vw = X({
  swatches: {
    type: Array,
    default: () => Lw(Ew)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ..._e()
}, "VColorPickerSwatches");
function Lw(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const Pw = dn({
  name: "VColorPickerSwatches",
  props: Vw(),
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
        maxHeight: ge(e.maxHeight)
      }, e.style]
    }, [y("div", null, [e.swatches.map((i) => y("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Ut(r), l = zl(o), s = Th(o);
      return y("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [y("div", {
        style: {
          background: s
        }
      }, [e.color && Ai(e.color, l) ? y(ze, {
        size: "x-small",
        icon: "$success",
        color: ep(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Wv = X({
  color: String,
  ...$i(),
  ..._e(),
  ...oi(),
  ...zn(),
  ...co(),
  ...Yl(),
  ...Pt(),
  ...We(),
  ...Xe()
}, "VSheet"), Cf = de()({
  name: "VSheet",
  props: Wv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Bt(ae(e, "color")), {
      borderClasses: l
    } = Ni(e), {
      dimensionStyles: s
    } = li(e), {
      elevationClasses: a
    } = jn(e), {
      locationStyles: u
    } = fo(e), {
      positionClasses: c
    } = Kl(e), {
      roundedClasses: d
    } = It(e);
    return ve(() => y(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, d.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), Iw = X({
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
    validator: (e) => Object.keys(ki).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(ki),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(ki).includes(t))
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
  ...Kt(Wv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), rV = dn({
  name: "VColorPicker",
  props: Iw(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = $e(e, "mode"), n = ee(null), i = $e(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = zl(Ut(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? Hb(a, e.modelValue) : null), r = C(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = vn();
    let l = !0;
    be(i, (a) => {
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
    return cn(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), Cn({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), ve(() => {
      const a = Cf.filterProps(e);
      return y(Cf, he({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Mh({
            ...r.value ?? qi,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && y(Fb, {
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
        }, [!e.hideSliders && y(ow, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && y(qb, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && y(Pw, {
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
}), Kr = Symbol.for("vuetify:v-expansion-panel"), Tw = ["default", "accordion", "inset", "popout"], Mw = X({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => Tw.includes(e)
  },
  readonly: Boolean,
  ..._e(),
  ...jl(),
  ...We(),
  ...Xe()
}, "VExpansionPanels"), Ef = de()({
  name: "VExpansionPanels",
  props: Mw(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    lo(e, Kr);
    const {
      themeClasses: i
    } = tt(e), r = C(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return Cn({
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
}), Aw = X({
  ..._e(),
  ...es()
}, "VExpansionPanelText"), $w = de()({
  name: "VExpansionPanelText",
  props: Aw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Kr);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = hu(e, i.isSelected);
    return ve(() => y(vv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [De(y("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && y("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[yt, i.isSelected.value]])];
      }
    })), {};
  }
}), qv = X({
  color: String,
  expandIcon: {
    type: Te,
    default: "$expand"
  },
  collapseIcon: {
    type: Te,
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
  ..._e()
}, "VExpansionPanelTitle"), Nw = de()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Ri
  },
  props: qv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Kr);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Bt(e, "color"), l = C(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return ve(() => {
      var s;
      return De(y("button", {
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
      }, [n.actions ? n.actions(l.value) : y(ze, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[un("ripple"), e.ripple]]);
    }), {};
  }
}), Rw = X({
  title: String,
  text: String,
  bgColor: String,
  ..._e(),
  ...zn(),
  ...Gl(),
  ...es(),
  ...Pt(),
  ...We(),
  ...qv()
}, "VExpansionPanel"), oV = de()({
  name: "VExpansionPanel",
  props: Rw(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ul(e, Kr), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Bt(e, "bgColor"), {
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
    return ut(Kr, i), Cn({
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
          }, null), h && y(Nw, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && y($w, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), fa = Symbol.for("vuetify:list");
function Yv() {
  const e = He(fa, {
    hasPrepend: pe(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: pe(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return ut(fa, t), e;
}
function Kv() {
  return He(fa, null);
}
const ku = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = xe(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
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
}, Xv = (e) => {
  const t = ku(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = xe(o);
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
}, Ow = (e) => {
  const t = ku(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = xe(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Bw = (e) => {
  const t = Xv(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = xe(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Fw = {
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
}, Zv = {
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
}, Dw = {
  open: Zv.open,
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
}, Cu = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = xe(i), e && !r) {
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
}, Jv = (e) => {
  const t = Cu(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = xe(o);
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
}, Hw = (e) => {
  const t = Cu(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = xe(r), l.has(r) ? o : t.select({
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
  const t = Jv(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = xe(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, jw = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = xe(i);
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
}, Xr = Symbol.for("vuetify:nested"), Qv = {
  id: pe(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ee(/* @__PURE__ */ new Map()),
    children: ee(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ee(!1),
    selectable: ee(!1),
    opened: ee(/* @__PURE__ */ new Set()),
    activated: ee(/* @__PURE__ */ new Set()),
    selected: ee(/* @__PURE__ */ new Map()),
    selectedValues: ee([])
  }
}, Gw = X({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), Uw = (e) => {
  let t = !1;
  const n = ee(/* @__PURE__ */ new Map()), i = ee(/* @__PURE__ */ new Map()), r = $e(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = C(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return Ow(e.mandatory);
      case "single-leaf":
        return Bw(e.mandatory);
      case "independent":
        return ku(e.mandatory);
      case "single-independent":
      default:
        return Xv(e.mandatory);
    }
  }), l = C(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return zw(e.mandatory);
      case "leaf":
        return Hw(e.mandatory);
      case "independent":
        return Cu(e.mandatory);
      case "single-independent":
        return Jv(e.mandatory);
      case "classic":
      default:
        return jw(e.mandatory);
    }
  }), s = C(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Dw;
      case "single":
        return Fw;
      case "multiple":
      default:
        return Zv;
    }
  }), a = $e(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = $e(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  fn(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const d = it("nested"), f = {
    id: pe(),
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
  return ut(Xr, f), f.root;
}, em = (e, t) => {
  const n = He(Xr, Qv), i = Symbol(Lt()), r = C(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: C(() => n.root.opened.value.has(r.value)),
    parent: C(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: C(() => n.root.activated.value.has(xe(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: C(() => n.root.selected.value.get(xe(r.value)) === "on"),
    isIndeterminate: C(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: C(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), fn(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && ut(Xr, o), o;
}, Ww = () => {
  const e = He(Xr, Qv);
  ut(Xr, {
    ...e,
    isGroupActivator: !0
  });
}, qw = dn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Ww(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), Yw = X({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: Te,
    default: "$collapse"
  },
  expandIcon: {
    type: Te,
    default: "$expand"
  },
  prependIcon: Te,
  appendIcon: Te,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ..._e(),
  ...We()
}, "VListGroup"), Vf = de()({
  name: "VListGroup",
  props: Yw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = em(ae(e, "value"), !0), l = C(() => `v-list-group--id-${String(o.value)}`), s = Kv(), {
      isBooted: a
    } = zv();
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
      default: () => [n.activator && y(et, {
        defaults: f.value
      }, {
        default: () => [y(qw, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), y(An, {
        transition: {
          component: vv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [De(y("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[yt, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), Kw = dr("v-list-item-subtitle"), Xw = dr("v-list-item-title"), Zw = X({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: Te,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: Te,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: ln(),
  onClickOnce: ln(),
  ...$i(),
  ..._e(),
  ...Xt(),
  ...oi(),
  ...zn(),
  ...Pt(),
  ...Zl(),
  ...We(),
  ...Xe(),
  ...Gn({
    variant: "text"
  })
}, "VListItem"), bl = de()({
  name: "VListItem",
  directives: {
    Ripple: Ri
  },
  props: Zw(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const o = Xl(e, n), l = C(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: d,
      isGroupActivator: f,
      root: h,
      parent: v,
      openOnSelect: m
    } = em(l, !1), p = Kv(), g = C(() => {
      var B;
      return e.active !== !1 && (e.active || ((B = o.isActive) == null ? void 0 : B.value) || (h.activatable.value ? a.value : c.value));
    }), w = C(() => e.link !== !1 && o.isLink.value), x = C(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = C(() => e.rounded || e.nav), S = C(() => e.color ?? e.activeColor), E = C(() => ({
      color: g.value ? S.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    be(() => {
      var B;
      return (B = o.isActive) == null ? void 0 : B.value;
    }, (B) => {
      B && v.value != null && h.open(v.value, !0), B && m(B);
    }, {
      immediate: !0
    });
    const {
      themeClasses: k
    } = tt(e), {
      borderClasses: P
    } = Ni(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: D
    } = vr(E), {
      densityClasses: L
    } = hn(e), {
      dimensionStyles: I
    } = li(e), {
      elevationClasses: _
    } = jn(e), {
      roundedClasses: O
    } = It(b), M = C(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), z = C(() => ({
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
      const B = w.value ? "a" : e.tag, H = i.title || e.title != null, W = i.subtitle || e.subtitle != null, J = !!(e.appendAvatar || e.appendIcon), se = !!(J || i.append), fe = !!(e.prependAvatar || e.prependIcon), Z = !!(fe || i.prepend);
      return p == null || p.updateHasPrepend(Z), e.activeColor && zy("active-color", ["color", "base-color"]), De(y(B, {
        class: ["v-list-item", {
          "v-list-item--active": g.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": x.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !Z && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && g.value
        }, k.value, P.value, $.value, L.value, _.value, M.value, O.value, D.value, e.class],
        style: [R.value, I.value, e.style],
        href: o.href.value,
        tabindex: x.value ? p ? -2 : 0 : void 0,
        onClick: N,
        onKeydown: x.value && !w.value && F
      }, {
        default: () => {
          var le;
          return [hr(x.value || g.value, "v-list-item"), Z && y("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? y(et, {
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
              var Ce;
              return [(Ce = i.prepend) == null ? void 0 : Ce.call(i, z.value)];
            }
          }) : y(Ve, null, [e.prependAvatar && y(Vi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && y(ze, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)]), y("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [H && y(Xw, {
            key: "title"
          }, {
            default: () => {
              var Ce;
              return [((Ce = i.title) == null ? void 0 : Ce.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), W && y(Kw, {
            key: "subtitle"
          }, {
            default: () => {
              var Ce;
              return [((Ce = i.subtitle) == null ? void 0 : Ce.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (le = i.default) == null ? void 0 : le.call(i, z.value)]), se && y("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? y(et, {
            key: "append-defaults",
            disabled: !J,
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
              var Ce;
              return [(Ce = i.append) == null ? void 0 : Ce.call(i, z.value)];
            }
          }) : y(Ve, null, [e.appendIcon && y(ze, {
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
      }), [[un("ripple"), x.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), Jw = X({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ..._e(),
  ...We()
}, "VListSubheader"), Qw = de()({
  name: "VListSubheader",
  props: Jw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = sn(ae(e, "color"));
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
}), ex = X({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ..._e(),
  ...Xe()
}, "VDivider"), tx = de()({
  name: "VDivider",
  props: ex(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      textColorClasses: r,
      textColorStyles: o
    } = sn(ae(e, "color")), l = C(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = ge(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ge(e.thickness)), s;
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
}), nx = X({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), tm = de()({
  name: "VListChildren",
  props: nx(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Yv(), () => {
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
          })) ?? y(tx, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? y(Qw, s, null);
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
        }, d = Vf.filterProps(s);
        return l ? y(Vf, he({
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
            }) : y(bl, p, c);
          },
          default: () => y(tm, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : y(bl, he(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), nm = X({
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
  const n = Mn(t, e.itemTitle, t), i = Mn(t, e.itemValue, n), r = Mn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Kt(t, ["children"]) : t : void 0 : Mn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? im(e, r) : void 0,
    raw: t
  };
}
function im(e, t) {
  const n = [];
  for (const i of t)
    n.push(da(e, i));
  return n;
}
function ix(e) {
  const t = C(() => im(e, e.items)), n = C(() => t.value.some((o) => o.value === null));
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
function rx(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function ox(e, t) {
  const n = Mn(t, e.itemType, "item"), i = rx(t) ? t : Mn(t, e.itemTitle), r = Mn(t, e.itemValue, void 0), o = Mn(t, e.itemChildren), l = e.itemProps === !0 ? Kt(t, ["children"]) : Mn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? rm(e, o) : void 0,
    raw: t
  };
}
function rm(e, t) {
  const n = [];
  for (const i of t)
    n.push(ox(e, i));
  return n;
}
function lx(e) {
  return {
    items: C(() => rm(e, e.items))
  };
}
const sx = X({
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
  ...Gw({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...$i(),
  ..._e(),
  ...Xt(),
  ...oi(),
  ...zn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...nm(),
  ...Pt(),
  ...We(),
  ...Xe(),
  ...Gn({
    variant: "text"
  })
}, "VList"), ax = de()({
  name: "VList",
  props: sx(),
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
    } = lx(e), {
      themeClasses: r
    } = tt(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = Bt(ae(e, "bgColor")), {
      borderClasses: s
    } = Ni(e), {
      densityClasses: a
    } = hn(e), {
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
    } = Uw(e), p = C(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = ae(e, "activeColor"), w = ae(e, "baseColor"), x = ae(e, "color");
    Yv(), Cn({
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
    const b = pe(!1), S = ee();
    function E(L) {
      b.value = !0;
    }
    function k(L) {
      b.value = !1;
    }
    function P(L) {
      var I;
      !b.value && !(L.relatedTarget && ((I = S.value) != null && I.contains(L.relatedTarget))) && D();
    }
    function $(L) {
      if (S.value) {
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
      if (S.value)
        return ul(S.value, L);
    }
    return ve(() => y(e.tag, {
      ref: S,
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
      onFocusout: k,
      onFocus: P,
      onKeydown: $,
      onMousedown: R
    }, {
      default: () => [y(tm, {
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
}), ux = X({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...Kt(mo({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: fu
    }
  }), ["absolute"])
}, "VMenu"), cx = de()({
  name: "VMenu",
  props: ux(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = vo(), o = Lt(), l = C(() => e.id || `v-menu-${o}`), s = ee(), a = He(ra, null), u = pe(0);
    ut(ra, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Ty(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, x, b;
      const p = m.relatedTarget, g = m.target;
      await Ke(), i.value && p !== g && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((x = s.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(g) && // It isn't inside the menu body
      !s.value.contentEl.contains(g) && ((b = Gr(s.value.contentEl)[0]) == null || b.focus());
    }
    be(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(m) {
      a == null || a.closeParents(m);
    }
    function f(m) {
      var p, g, w;
      e.disabled || m.key === "Tab" && (Sh(Gr((p = s.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (g = s.value) == null ? void 0 : g.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var g;
      if (e.disabled) return;
      const p = (g = s.value) == null ? void 0 : g.contentEl;
      p && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), ul(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), ul(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
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
          return y(et, {
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
}), fx = ["color", "file", "time", "date", "datetime-local", "week", "month"], om = X({
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
  ...yu()
}, "VTextField"), Lf = de()({
  name: "VTextField",
  directives: {
    Intersect: av
  },
  inheritAttrs: !1,
  props: om(),
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
    const o = $e(e, "modelValue"), {
      isFocused: l,
      focus: s,
      blur: a
    } = mr(e), u = C(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = C(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = C(() => ["plain", "underlined"].includes(e.variant));
    function f(E, k) {
      var P, $;
      !e.autofocus || !E || ($ = (P = k[0].target) == null ? void 0 : P.focus) == null || $.call(P);
    }
    const h = ee(), v = ee(), m = ee(), p = C(() => fx.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
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
      E.stopPropagation(), g(), Ke(() => {
        o.value = null, _h(e["onClick:clear"], E);
      });
    }
    function S(E) {
      var P;
      const k = E.target;
      if (o.value = k.value, (P = e.modelModifiers) != null && P.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [k.selectionStart, k.selectionEnd];
        Ke(() => {
          k.selectionStart = $[0], k.selectionEnd = $[1];
        });
      }
    }
    return ve(() => {
      const E = !!(r.counter || e.counter !== !1 && e.counter != null), k = !!(E || r.details), [P, $] = fr(n), {
        modelValue: R,
        ...D
      } = Yt.filterProps(e), L = Cv(e);
      return y(Yt, he({
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
            isReadonly: z,
            isValid: N
          } = I;
          return y(pu, he({
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
              const W = De(y("input", he({
                ref: m,
                value: o.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: z.value,
                disabled: O.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: g,
                onBlur: a
              }, H, $), null), [[un("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return y(Ve, null, [e.prefix && y("span", {
                class: "v-text-field__prefix"
              }, [y("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? y("div", {
                class: B,
                "data-no-activator": ""
              }, [r.default(), W]) : Rn(W, {
                class: B
              }), e.suffix && y("span", {
                class: "v-text-field__suffix"
              }, [y("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: k ? (I) => {
          var _;
          return y(Ve, null, [(_ = r.details) == null ? void 0 : _.call(r, I), E && y(Ve, null, [y("span", null, null), y(Sv, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), si({}, h, v, m);
  }
}), dx = X({
  renderless: Boolean,
  ..._e()
}, "VVirtualScrollItem"), hx = de()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: dx(),
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
    } = lr(void 0, "border");
    be(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), ve(() => {
      var s, a;
      return e.renderless ? y(Ve, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : y("div", he({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), vx = -1, mx = 1, Vs = 100, gx = X({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function yx(e, t) {
  const n = du(), i = pe(0);
  kn(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = pe(0), o = pe(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = pe(0), s = pe(0), a = ee(), u = ee();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = lr();
  kn(() => {
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
  const g = pe(0);
  let w = -1;
  function x(F) {
    return m[F] || i.value;
  }
  const b = Vy(() => {
    const F = performance.now();
    p[0] = 0;
    const B = t.value.length;
    for (let H = 1; H <= B - 1; H++)
      p[H] = (p[H - 1] || 0) + x(H - 1);
    g.value = Math.max(g.value, performance.now() - F);
  }, g), S = be(v, (F) => {
    F && (S(), c = u.value.offsetTop, b.immediate(), O(), ~w && Ke(() => {
      Re && window.requestAnimationFrame(() => {
        z(w), w = -1;
      });
    }));
  });
  pt(() => {
    b.clear();
  });
  function E(F, B) {
    const H = m[F], W = i.value;
    i.value = W ? Math.min(i.value, B) : B, (H !== B || W !== i.value) && (m[F] = B, b());
  }
  function k(F) {
    return F = Rt(F, 0, t.value.length - 1), p[F] || 0;
  }
  function P(F) {
    return px(p, F);
  }
  let $ = 0, R = 0, D = 0;
  be(h, (F, B) => {
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
    const F = $ - c, B = Math.sign(R), H = Math.max(0, F - Vs), W = Rt(P(H), 0, t.value.length), J = F + h.value + Vs, se = Rt(P(J) + 1, W + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (B !== vx || W < r.value) && (B !== mx || se > o.value)
    ) {
      const fe = k(r.value) - k(W), Z = k(se) - k(o.value);
      Math.max(fe, Z) > Vs ? (r.value = W, o.value = se) : (W <= 0 && (r.value = W), se >= t.value.length && (o.value = se));
    }
    l.value = k(r.value), s.value = k(t.value.length) - k(o.value);
  }
  function z(F) {
    const B = k(F);
    !a.value || F && !B ? w = F : a.value.scrollTop = B;
  }
  const N = C(() => t.value.slice(r.value, o.value).map((F, B) => ({
    raw: F,
    index: B + r.value
  })));
  return be(t, () => {
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
    scrollToIndex: z,
    handleScroll: L,
    handleScrollend: I,
    handleItemResize: E
  };
}
function px(e, t) {
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
const bx = X({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...gx(),
  ..._e(),
  ...oi()
}, "VVirtualScroll"), wx = de()({
  name: "VVirtualScroll",
  props: bx(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = it("VVirtualScroll"), {
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
    } = yx(e, ae(e, "items"));
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
      cn(() => {
        o.value = Dh(i.vnode.el, !0), v(!0);
      }), pt(v);
    }), ve(() => {
      const v = h.value.map((m) => y(hx, {
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
      return e.renderless ? y(Ve, null, [y("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ge(d.value)
        }
      }, null), v, y("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ge(f.value)
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
          paddingTop: ge(d.value),
          paddingBottom: ge(f.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function xx(e, t) {
  const n = pe(!1);
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
        const a = be(n, () => {
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
const _x = X({
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
    type: Te,
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
  ...nm({
    itemChildren: !1
  })
}, "Select"), Sx = X({
  ..._x(),
  ...Kt(om({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...ho({
    transition: {
      component: fu
    }
  })
}, "VSelect"), lV = de()({
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
    } = uo(), r = ee(), o = ee(), l = ee(), s = $e(e, "menu"), a = C({
      get: () => s.value,
      set: (N) => {
        var F;
        s.value && !N && ((F = o.value) != null && F.ΨopenChildren) || (s.value = N);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = ix(e), f = $e(e, "modelValue", [], (N) => c(N === null ? [null] : _n(N)), (N) => {
      const F = d(N);
      return e.multiple ? F : F[0] ?? null;
    }), h = C(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Ev(), m = C(() => f.value.map((N) => N.value)), p = pe(!1), g = C(() => a.value ? e.closeText : e.openText);
    let w = "", x;
    const b = C(() => e.hideSelected ? u.value.filter((N) => !f.value.some((F) => F === N)) : u.value), S = C(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = C(() => {
      var N;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((N = e.menuProps) == null ? void 0 : N.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), k = ee(), {
      onListScroll: P,
      onListKeydown: $
    } = xx(k, r);
    function R(N) {
      e.openOnClear && (a.value = !0);
    }
    function D() {
      S.value || (a.value = !a.value);
    }
    function L(N) {
      var J, se;
      if (!N.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown", " "].includes(N.key) && (a.value = !0), ["Escape", "Tab"].includes(N.key) && (a.value = !1), N.key === "Home" ? (J = k.value) == null || J.focus("first") : N.key === "End" && ((se = k.value) == null || se.focus("last"));
      const F = 1e3;
      function B(fe) {
        const Z = fe.key.length === 1, le = !fe.ctrlKey && !fe.metaKey && !fe.altKey;
        return Z && le;
      }
      if (e.multiple || !B(N)) return;
      const H = performance.now();
      H - x > F && (w = ""), w += N.key.toLowerCase(), x = H;
      const W = u.value.find((fe) => fe.title.toLowerCase().startsWith(w));
      W !== void 0 && (f.value = [W]);
    }
    function I(N) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!N.props.disabled)
        if (e.multiple) {
          const B = f.value.findIndex((W) => e.valueComparator(W.value, N.value)), H = F ?? !~B;
          if (~B) {
            const W = H ? [...f.value, N] : [...f.value];
            W.splice(B, 1), f.value = W;
          } else H && (f.value = [...f.value, N]);
        } else {
          const B = F !== !1;
          f.value = B ? [N] : [], Ke(() => {
            a.value = !1;
          });
        }
    }
    function _(N) {
      var F;
      (F = k.value) != null && F.$el.contains(N.relatedTarget) || (a.value = !1);
    }
    function O() {
      var N;
      p.value && ((N = r.value) == null || N.focus());
    }
    function M(N) {
      p.value = !0;
    }
    function z(N) {
      if (N == null) f.value = [];
      else if (cl(r.value, ":autofill") || cl(r.value, ":-webkit-autofill")) {
        const F = u.value.find((B) => B.title === N);
        F && I(F);
      } else r.value && (r.value.value = "");
    }
    return be(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const N = b.value.findIndex((F) => f.value.some((B) => e.valueComparator(B.value, F.value)));
        Re && window.requestAnimationFrame(() => {
          var F;
          N >= 0 && ((F = l.value) == null || F.scrollToIndex(N));
        });
      }
    }), be(() => e.items, (N, F) => {
      a.value || p.value && !F.length && N.length && (a.value = !0);
    }), ve(() => {
      const N = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), B = f.value.length > 0, H = Lf.filterProps(e), W = B || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return y(Lf, he({
        ref: r
      }, H, {
        modelValue: f.value.map((J) => J.props.value).join(", "),
        "onUpdate:modelValue": z,
        focused: p.value,
        "onUpdate:focused": (J) => p.value = J,
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
        placeholder: W,
        "onClick:clear": R,
        "onMousedown:control": D,
        onBlur: _,
        onKeydown: L,
        "aria-label": i(g.value),
        title: i(g.value)
      }), {
        ...n,
        default: () => y(Ve, null, [y(cx, he({
          ref: o,
          modelValue: a.value,
          "onUpdate:modelValue": (J) => a.value = J,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: S.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: O
        }, E.value), {
          default: () => [F && y(ax, he({
            ref: k,
            selected: m.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (J) => J.preventDefault(),
            onKeydown: $,
            onFocusin: M,
            onScrollPassive: P,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var J, se, fe;
              return [(J = n["prepend-item"]) == null ? void 0 : J.call(n), !b.value.length && !e.hideNoData && (((se = n["no-data"]) == null ? void 0 : se.call(n)) ?? y(bl, {
                title: i(e.noDataText)
              }, null)), y(wx, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (Z) => {
                  var wt;
                  let {
                    item: le,
                    index: Ce,
                    itemRef: Be
                  } = Z;
                  const je = he(le.props, {
                    ref: Be,
                    key: Ce,
                    onClick: () => I(le, null)
                  });
                  return ((wt = n.item) == null ? void 0 : wt.call(n, {
                    item: le,
                    index: Ce,
                    props: je
                  })) ?? y(bl, he(je, {
                    role: "option"
                  }), {
                    prepend: (gn) => {
                      let {
                        isSelected: V
                      } = gn;
                      return y(Ve, null, [e.multiple && !e.hideSelected ? y(aa, {
                        key: le.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, le.props.prependAvatar && y(Vi, {
                        image: le.props.prependAvatar
                      }, null), le.props.prependIcon && y(ze, {
                        icon: le.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (fe = n["append-item"]) == null ? void 0 : fe.call(n)];
            }
          })]
        }), f.value.map((J, se) => {
          function fe(Be) {
            Be.stopPropagation(), Be.preventDefault(), I(J, !1);
          }
          const Z = {
            "onClick:close": fe,
            onMousedown(Be) {
              Be.preventDefault(), Be.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, le = N ? !!n.chip : !!n.selection, Ce = le ? kh(N ? n.chip({
            item: J,
            index: se,
            props: Z
          }) : n.selection({
            item: J,
            index: se
          })) : void 0;
          if (!(le && !Ce))
            return y("div", {
              key: J.value,
              class: "v-select__selection"
            }, [N ? n.chip ? y(et, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: J.title
                }
              }
            }, {
              default: () => [Ce]
            }) : y(_v, he({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: J.title,
              disabled: J.props.disabled
            }, Z), null) : Ce ?? y("span", {
              class: "v-select__selection-text"
            }, [J.title, e.multiple && se < f.value.length - 1 && y("span", {
              class: "v-select__selection-comma"
            }, [Je(",")])])]);
        })]),
        "append-inner": function() {
          var Z;
          for (var J = arguments.length, se = new Array(J), fe = 0; fe < J; fe++)
            se[fe] = arguments[fe];
          return y(Ve, null, [(Z = n["append-inner"]) == null ? void 0 : Z.call(n, ...se), e.menuIcon ? y(ze, {
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
}), kx = X({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Oi(),
  ...ns()
}, "VSwitch"), _r = de()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: kx(),
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
    const r = $e(e, "indeterminate"), o = $e(e, "modelValue"), {
      loaderClasses: l
    } = ql(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = mr(e), c = ee(), d = C(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = Lt(), h = C(() => e.id || `switch-${f}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(p) {
      var g, w;
      p.stopPropagation(), p.preventDefault(), (w = (g = c.value) == null ? void 0 : g.input) == null || w.click();
    }
    return ve(() => {
      const [p, g] = fr(n), w = Yt.filterProps(e), x = sr.filterProps(e);
      return y(Yt, he({
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
            id: S,
            messagesId: E,
            isDisabled: k,
            isReadonly: P,
            isValid: $
          } = b;
          const R = {
            model: o,
            isValid: $
          };
          return y(sr, he({
            ref: c
          }, x, {
            modelValue: o.value,
            "onUpdate:modelValue": [(D) => o.value = D, v],
            id: S.value,
            "aria-describedby": E.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: k.value,
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
              return y(Ve, null, [L, y("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": I || e.loading
                }, e.inset ? void 0 : _.value],
                style: e.inset ? void 0 : O.value
              }, [i.thumb ? y(et, {
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
              }) : y(dv, null, {
                default: () => [e.loading ? y(uu, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : d.value
                }, {
                  default: (M) => i.loader ? i.loader(M) : y(Wh, {
                    active: M.isActive,
                    color: M.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : I && y(ze, {
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
}), Cx = /* @__PURE__ */ Mi({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = ee(n.isWelcome), r = ee(n.config.showNodeLabels), o = ee(n.config.nodePhysicsEnabled), l = ee(n.config.showLinkLabels), s = ee(n.config.fixedLinkDistanceEnabled), a = ee(n.config.zoomEnabled), u = ee(String(n.config.nodeRadius)), c = ee(""), d = ee("black"), f = ee(""), h = ee(n.config.persistSettingsLocalStorage), v = t;
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
    return (g, w) => (dt(), on(vu, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (x) => i.value = x),
      persistent: ""
    }, {
      activator: ce(({ props: x }) => [
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: ce(({ props: b }) => [
            y(at, he({
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
        y(cu, { class: "pa-3" }, {
          default: ce(() => [
            n.isWelcome ? (dt(), on(Yr, { key: 0 }, {
              default: ce(() => [
                Je("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (dt(), on(Yr, { key: 1 }, {
              default: ce(() => [
                Je("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (dt(), on(Vr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ce(() => [
                Je(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Qt("", !0),
            y(Nr, null, {
              default: ce(() => [
                y(St, null, {
                  default: ce(() => [
                    y(Wi, { cols: "5" }, {
                      default: ce(() => [
                        y(St, null, {
                          default: ce(() => [
                            y(Vr, { class: "py-5" }, {
                              default: ce(() => [
                                Je("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, null, {
                          default: ce(() => [
                            y(Ef, null, {
                              default: ce(() => [
                                Qt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, null, {
                          default: ce(() => [
                            y(Wi, { class: "mx-0 px-0" }, {
                              default: ce(() => [
                                y(_r, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            y(Wi, { class: "mx-0 px-0" }, {
                              default: ce(() => [
                                Qt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            y(_r, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            Qt("", !0)
                          ]),
                          _: 1
                        }),
                        y(St, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            Qt("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(pl),
                    y(Wi, { cols: "5" }, {
                      default: ce(() => [
                        y(St, null, {
                          default: ce(() => [
                            y(Vr, { class: "py-5" }, {
                              default: ce(() => [
                                Je("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, null, {
                          default: ce(() => [
                            y(Ef, null, {
                              default: ce(() => [
                                Qt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, null, {
                          default: ce(() => [
                            y(_r, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": w[6] || (w[6] = (b) => l.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        y(St, null, {
                          default: ce(() => [
                            y(_r, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            Qt("", !0)
                          ]),
                          _: 1
                        }),
                        y(St, { class: "my-0 py-0" }, {
                          default: ce(() => [
                            y(Vr, { class: "px-0" }, {
                              default: ce(() => [
                                Je("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(St, { class: "py-0 my-0" }, {
                          default: ce(() => [
                            y(_r, {
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
            y(Jl, null, {
              default: ce(() => [
                y(Ob, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                y(pl),
                y(at, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: ce(() => [
                    Je("Save")
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
var Ex = { value: () => {
} };
function go() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new qo(n);
}
function qo(e) {
  this._ = e;
}
function Vx(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
qo.prototype = go.prototype = {
  constructor: qo,
  on: function(e, t) {
    var n = this._, i = Vx(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = Lx(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = Pf(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Pf(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new qo(e);
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
function Lx(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Pf(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = Ex, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ha = "http://www.w3.org/1999/xhtml";
const If = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ha,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function is(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), If.hasOwnProperty(t) ? { space: If[t], local: e } : e;
}
function Px(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ha && t.documentElement.namespaceURI === ha ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Ix(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function lm(e) {
  var t = is(e);
  return (t.local ? Ix : Px)(t);
}
function Tx() {
}
function Eu(e) {
  return e == null ? Tx : function() {
    return this.querySelector(e);
  };
}
function Mx(e) {
  typeof e != "function" && (e = Eu(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new Ft(i, this._parents);
}
function Ax(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function $x() {
  return [];
}
function sm(e) {
  return e == null ? $x : function() {
    return this.querySelectorAll(e);
  };
}
function Nx(e) {
  return function() {
    return Ax(e.apply(this, arguments));
  };
}
function Rx(e) {
  typeof e == "function" ? e = Nx(e) : e = sm(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new Ft(i, r);
}
function am(e) {
  return function() {
    return this.matches(e);
  };
}
function um(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ox = Array.prototype.find;
function Bx(e) {
  return function() {
    return Ox.call(this.children, e);
  };
}
function Fx() {
  return this.firstElementChild;
}
function Dx(e) {
  return this.select(e == null ? Fx : Bx(typeof e == "function" ? e : um(e)));
}
var Hx = Array.prototype.filter;
function zx() {
  return Array.from(this.children);
}
function jx(e) {
  return function() {
    return Hx.call(this.children, e);
  };
}
function Gx(e) {
  return this.selectAll(e == null ? zx : jx(typeof e == "function" ? e : um(e)));
}
function Ux(e) {
  typeof e != "function" && (e = am(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Ft(i, this._parents);
}
function cm(e) {
  return new Array(e.length);
}
function Wx() {
  return new Ft(this._enter || this._groups.map(cm), this._parents);
}
function wl(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
wl.prototype = {
  constructor: wl,
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
function qx(e) {
  return function() {
    return e;
  };
}
function Yx(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new wl(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function Kx(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = o.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new wl(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (r[s] = a);
}
function Xx(e) {
  return e.__data__;
}
function Zx(e, t) {
  if (!arguments.length) return Array.from(this, Xx);
  var n = t ? Kx : Yx, i = this._parents, r = this._groups;
  typeof e != "function" && (e = qx(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], d = r[u], f = d.length, h = Jx(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), p = l[u] = new Array(v), g = a[u] = new Array(f);
    n(c, d, m, p, g, h, t);
    for (var w = 0, x = 0, b, S; w < v; ++w)
      if (b = m[w]) {
        for (w >= x && (x = w + 1); !(S = p[x]) && ++x < v; ) ;
        b._next = S || null;
      }
  }
  return l = new Ft(l, i), l._enter = s, l._exit = a, l;
}
function Jx(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Qx() {
  return new Ft(this._exit || this._groups.map(cm), this._parents);
}
function e2(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function t2(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new Ft(s, this._parents);
}
function n2() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function i2(e) {
  e || (e = r2);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new Ft(r, this._parents).order();
}
function r2(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function o2() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function l2() {
  return Array.from(this);
}
function s2() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function a2() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function u2() {
  return !this.node();
}
function c2(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function f2(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function d2(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function h2(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function v2(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function m2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function g2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function y2(e, t) {
  var n = is(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? d2 : f2 : typeof t == "function" ? n.local ? g2 : m2 : n.local ? v2 : h2)(n, t));
}
function fm(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function p2(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function b2(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function w2(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function x2(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? p2 : typeof t == "function" ? w2 : b2)(e, t, n ?? "")) : ar(this.node(), e);
}
function ar(e, t) {
  return e.style.getPropertyValue(t) || fm(e).getComputedStyle(e, null).getPropertyValue(t);
}
function _2(e) {
  return function() {
    delete this[e];
  };
}
function S2(e, t) {
  return function() {
    this[e] = t;
  };
}
function k2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function C2(e, t) {
  return arguments.length > 1 ? this.each((t == null ? _2 : typeof t == "function" ? k2 : S2)(e, t)) : this.node()[e];
}
function dm(e) {
  return e.trim().split(/^|\s+/);
}
function Vu(e) {
  return e.classList || new hm(e);
}
function hm(e) {
  this._node = e, this._names = dm(e.getAttribute("class") || "");
}
hm.prototype = {
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
function vm(e, t) {
  for (var n = Vu(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function mm(e, t) {
  for (var n = Vu(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function E2(e) {
  return function() {
    vm(this, e);
  };
}
function V2(e) {
  return function() {
    mm(this, e);
  };
}
function L2(e, t) {
  return function() {
    (t.apply(this, arguments) ? vm : mm)(this, e);
  };
}
function P2(e, t) {
  var n = dm(e + "");
  if (arguments.length < 2) {
    for (var i = Vu(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? L2 : t ? E2 : V2)(n, t));
}
function I2() {
  this.textContent = "";
}
function T2(e) {
  return function() {
    this.textContent = e;
  };
}
function M2(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function A2(e) {
  return arguments.length ? this.each(e == null ? I2 : (typeof e == "function" ? M2 : T2)(e)) : this.node().textContent;
}
function $2() {
  this.innerHTML = "";
}
function N2(e) {
  return function() {
    this.innerHTML = e;
  };
}
function R2(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function O2(e) {
  return arguments.length ? this.each(e == null ? $2 : (typeof e == "function" ? R2 : N2)(e)) : this.node().innerHTML;
}
function B2() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function F2() {
  return this.each(B2);
}
function D2() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function H2() {
  return this.each(D2);
}
function z2(e) {
  var t = typeof e == "function" ? e : lm(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function j2() {
  return null;
}
function G2(e, t) {
  var n = typeof e == "function" ? e : lm(e), i = t == null ? j2 : typeof t == "function" ? t : Eu(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function U2() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function W2() {
  return this.each(U2);
}
function q2() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Y2() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function K2(e) {
  return this.select(e ? Y2 : q2);
}
function X2(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Z2(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function J2(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Q2(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function e_(e, t, n) {
  return function() {
    var i = this.__on, r, o = Z2(t);
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
function t_(e, t, n) {
  var i = J2(e + ""), r, o = i.length, l;
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
  for (s = t ? e_ : Q2, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function gm(e, t, n) {
  var i = fm(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function n_(e, t) {
  return function() {
    return gm(this, e, t);
  };
}
function i_(e, t) {
  return function() {
    return gm(this, e, t.apply(this, arguments));
  };
}
function r_(e, t) {
  return this.each((typeof t == "function" ? i_ : n_)(e, t));
}
function* o_() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var ym = [null];
function Ft(e, t) {
  this._groups = e, this._parents = t;
}
function yo() {
  return new Ft([[document.documentElement]], ym);
}
function l_() {
  return this;
}
Ft.prototype = yo.prototype = {
  constructor: Ft,
  select: Mx,
  selectAll: Rx,
  selectChild: Dx,
  selectChildren: Gx,
  filter: Ux,
  data: Zx,
  enter: Wx,
  exit: Qx,
  join: e2,
  merge: t2,
  selection: l_,
  order: n2,
  sort: i2,
  call: o2,
  nodes: l2,
  node: s2,
  size: a2,
  empty: u2,
  each: c2,
  attr: y2,
  style: x2,
  property: C2,
  classed: P2,
  text: A2,
  html: O2,
  raise: F2,
  lower: H2,
  append: z2,
  insert: G2,
  remove: W2,
  clone: K2,
  datum: X2,
  on: t_,
  dispatch: r_,
  [Symbol.iterator]: o_
};
function lt(e) {
  return typeof e == "string" ? new Ft([[document.querySelector(e)]], [document.documentElement]) : new Ft([[e]], ym);
}
function pm(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function jt(e, t) {
  if (e = pm(e), t === void 0 && (t = e.currentTarget), t) {
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
function s_(e, t) {
  return e.target && (e = pm(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => jt(n, t));
}
const a_ = { passive: !1 }, Zr = { capture: !0, passive: !1 };
function Ls(e) {
  e.stopImmediatePropagation();
}
function er(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function bm(e) {
  var t = e.document.documentElement, n = lt(e).on("dragstart.drag", er, Zr);
  "onselectstart" in t ? n.on("selectstart.drag", er, Zr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function wm(e, t) {
  var n = e.document.documentElement, i = lt(e).on("dragstart.drag", null);
  t && (i.on("click.drag", er, Zr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const To = (e) => () => e;
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
function u_(e) {
  return !e.ctrlKey && !e.button;
}
function c_() {
  return this.parentNode;
}
function f_(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function d_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function h_() {
  var e = u_, t = c_, n = f_, i = d_, r = {}, o = go("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", p).on("touchmove.drag", g, a_).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, S) {
    if (!(c || !e.call(this, b, S))) {
      var E = x(this, t.call(this, b, S), b, S, "mouse");
      E && (lt(b.view).on("mousemove.drag", v, Zr).on("mouseup.drag", m, Zr), bm(b.view), Ls(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if (er(b), !u) {
      var S = b.clientX - s, E = b.clientY - a;
      u = S * S + E * E > d;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    lt(b.view).on("mousemove.drag mouseup.drag", null), wm(b.view, u), er(b), r.mouse("end", b);
  }
  function p(b, S) {
    if (e.call(this, b, S)) {
      var E = b.changedTouches, k = t.call(this, b, S), P = E.length, $, R;
      for ($ = 0; $ < P; ++$)
        (R = x(this, k, b, S, E[$].identifier, E[$])) && (Ls(b), R("start", b, E[$]));
    }
  }
  function g(b) {
    var S = b.changedTouches, E = S.length, k, P;
    for (k = 0; k < E; ++k)
      (P = r[S[k].identifier]) && (er(b), P("drag", b, S[k]));
  }
  function w(b) {
    var S = b.changedTouches, E = S.length, k, P;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), k = 0; k < E; ++k)
      (P = r[S[k].identifier]) && (Ls(b), P("end", b, S[k]));
  }
  function x(b, S, E, k, P, $) {
    var R = o.copy(), D = jt($ || E, S), L, I, _;
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
    }), k)) != null)
      return L = _.x - D[0] || 0, I = _.y - D[1] || 0, function O(M, z, N) {
        var F = D, B;
        switch (M) {
          case "start":
            r[P] = O, B = l++;
            break;
          case "end":
            delete r[P], --l;
          case "drag":
            D = jt(N || z, S), B = l;
            break;
        }
        R.call(
          M,
          b,
          new va(M, {
            sourceEvent: z,
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
          k
        );
      };
  }
  return f.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : To(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : To(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : To(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : To(!!b), f) : i;
  }, f.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function Lu(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function xm(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function po() {
}
var Jr = 0.7, xl = 1 / Jr, tr = "\\s*([+-]?\\d+)\\s*", Qr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Sn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", v_ = /^#([0-9a-f]{3,8})$/, m_ = new RegExp(`^rgb\\(${tr},${tr},${tr}\\)$`), g_ = new RegExp(`^rgb\\(${Sn},${Sn},${Sn}\\)$`), y_ = new RegExp(`^rgba\\(${tr},${tr},${tr},${Qr}\\)$`), p_ = new RegExp(`^rgba\\(${Sn},${Sn},${Sn},${Qr}\\)$`), b_ = new RegExp(`^hsl\\(${Qr},${Sn},${Sn}\\)$`), w_ = new RegExp(`^hsla\\(${Qr},${Sn},${Sn},${Qr}\\)$`), Tf = {
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
Lu(po, Li, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Mf,
  // Deprecated! Use color.formatHex.
  formatHex: Mf,
  formatHex8: x_,
  formatHsl: __,
  formatRgb: Af,
  toString: Af
});
function Mf() {
  return this.rgb().formatHex();
}
function x_() {
  return this.rgb().formatHex8();
}
function __() {
  return _m(this).formatHsl();
}
function Af() {
  return this.rgb().formatRgb();
}
function Li(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = v_.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? $f(t) : n === 3 ? new Et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Mo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Mo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = m_.exec(e)) ? new Et(t[1], t[2], t[3], 1) : (t = g_.exec(e)) ? new Et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = y_.exec(e)) ? Mo(t[1], t[2], t[3], t[4]) : (t = p_.exec(e)) ? Mo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = b_.exec(e)) ? Of(t[1], t[2] / 100, t[3] / 100, 1) : (t = w_.exec(e)) ? Of(t[1], t[2] / 100, t[3] / 100, t[4]) : Tf.hasOwnProperty(e) ? $f(Tf[e]) : e === "transparent" ? new Et(NaN, NaN, NaN, 0) : null;
}
function $f(e) {
  return new Et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Mo(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Et(e, t, n, i);
}
function S_(e) {
  return e instanceof po || (e = Li(e)), e ? (e = e.rgb(), new Et(e.r, e.g, e.b, e.opacity)) : new Et();
}
function ma(e, t, n, i) {
  return arguments.length === 1 ? S_(e) : new Et(e, t, n, i ?? 1);
}
function Et(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Lu(Et, ma, xm(po, {
  brighter(e) {
    return e = e == null ? xl : Math.pow(xl, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jr : Math.pow(Jr, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Et(Ci(this.r), Ci(this.g), Ci(this.b), _l(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Nf,
  // Deprecated! Use color.formatHex.
  formatHex: Nf,
  formatHex8: k_,
  formatRgb: Rf,
  toString: Rf
}));
function Nf() {
  return `#${bi(this.r)}${bi(this.g)}${bi(this.b)}`;
}
function k_() {
  return `#${bi(this.r)}${bi(this.g)}${bi(this.b)}${bi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Rf() {
  const e = _l(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ci(this.r)}, ${Ci(this.g)}, ${Ci(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function _l(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ci(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function bi(e) {
  return e = Ci(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Of(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new tn(e, t, n, i);
}
function _m(e) {
  if (e instanceof tn) return new tn(e.h, e.s, e.l, e.opacity);
  if (e instanceof po || (e = Li(e)), !e) return new tn();
  if (e instanceof tn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new tn(l, s, a, e.opacity);
}
function C_(e, t, n, i) {
  return arguments.length === 1 ? _m(e) : new tn(e, t, n, i ?? 1);
}
function tn(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Lu(tn, C_, xm(po, {
  brighter(e) {
    return e = e == null ? xl : Math.pow(xl, e), new tn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jr : Math.pow(Jr, e), new tn(this.h, this.s, this.l * e, this.opacity);
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
    return new tn(Bf(this.h), Ao(this.s), Ao(this.l), _l(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = _l(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Bf(this.h)}, ${Ao(this.s) * 100}%, ${Ao(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Bf(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ao(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ps(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Pu = (e) => () => e;
function E_(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function V_(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function L_(e) {
  return (e = +e) == 1 ? Sm : function(t, n) {
    return n - t ? V_(t, n, e) : Pu(isNaN(t) ? n : t);
  };
}
function Sm(e, t) {
  var n = t - e;
  return n ? E_(e, n) : Pu(isNaN(e) ? t : e);
}
const Sl = function e(t) {
  var n = L_(t);
  function i(r, o) {
    var l = n((r = ma(r)).r, (o = ma(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = Sm(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function P_(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, i = t.slice(), r;
  return function(o) {
    for (r = 0; r < n; ++r) i[r] = e[r] * (1 - o) + t[r] * o;
    return i;
  };
}
function I_(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function T_(e, t) {
  var n = t ? t.length : 0, i = e ? Math.min(n, e.length) : 0, r = new Array(i), o = new Array(n), l;
  for (l = 0; l < i; ++l) r[l] = Iu(e[l], t[l]);
  for (; l < n; ++l) o[l] = t[l];
  return function(s) {
    for (l = 0; l < i; ++l) o[l] = r[l](s);
    return o;
  };
}
function M_(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(i) {
    return n.setTime(e * (1 - i) + t * i), n;
  };
}
function wn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function A_(e, t) {
  var n = {}, i = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = Iu(e[r], t[r]) : i[r] = t[r];
  return function(o) {
    for (r in n) i[r] = n[r](o);
    return i;
  };
}
var ga = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Is = new RegExp(ga.source, "g");
function $_(e) {
  return function() {
    return e;
  };
}
function N_(e) {
  return function(t) {
    return e(t) + "";
  };
}
function km(e, t) {
  var n = ga.lastIndex = Is.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = ga.exec(e)) && (r = Is.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: wn(i, r) })), n = Is.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? N_(a[0].x) : $_(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c) s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
function Iu(e, t) {
  var n = typeof t, i;
  return t == null || n === "boolean" ? Pu(t) : (n === "number" ? wn : n === "string" ? (i = Li(t)) ? (t = i, Sl) : km : t instanceof Li ? Sl : t instanceof Date ? M_ : I_(t) ? P_ : Array.isArray(t) ? T_ : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? A_ : wn)(e, t);
}
var Ff = 180 / Math.PI, ya = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Cm(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * Ff,
    skewX: Math.atan(a) * Ff,
    scaleX: l,
    scaleY: s
  };
}
var $o;
function R_(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ya : Cm(t.a, t.b, t.c, t.d, t.e, t.f);
}
function O_(e) {
  return e == null || ($o || ($o = document.createElementNS("http://www.w3.org/2000/svg", "g")), $o.setAttribute("transform", e), !(e = $o.transform.baseVal.consolidate())) ? ya : (e = e.matrix, Cm(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Em(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: wn(u, d) }, { i: m - 2, x: wn(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function l(u, c, d, f) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), f.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: wn(u, c) })) : c && d.push(r(d) + "rotate(" + c + i);
  }
  function s(u, c, d, f) {
    u !== c ? f.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: wn(u, c) }) : c && d.push(r(d) + "skewX(" + c + i);
  }
  function a(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: wn(u, d) }, { i: m - 2, x: wn(c, f) });
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
var B_ = Em(R_, "px, ", "px)", "deg)"), F_ = Em(O_, ", ", ")", ")"), D_ = 1e-12;
function Df(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function H_(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function z_(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const j_ = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, m = h * h + v * v, p, g;
    if (m < D_)
      g = Math.log(f / u) / t, p = function(k) {
        return [
          s + k * h,
          a + k * v,
          u * Math.exp(t * k * g)
        ];
      };
    else {
      var w = Math.sqrt(m), x = (f * f - u * u + i * m) / (2 * u * n * w), b = (f * f - u * u - i * m) / (2 * f * n * w), S = Math.log(Math.sqrt(x * x + 1) - x), E = Math.log(Math.sqrt(b * b + 1) - b);
      g = (E - S) / t, p = function(k) {
        var P = k * g, $ = Df(S), R = u / (n * w) * ($ * z_(t * P + S) - H_(S));
        return [
          s + R * h,
          a + R * v,
          u * $ / Df(t * P + S)
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
var ur = 0, Lr = 0, Sr = 0, Vm = 1e3, kl, Pr, Cl = 0, Pi = 0, rs = 0, eo = typeof performance == "object" && performance.now ? performance : Date, Lm = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Tu() {
  return Pi || (Lm(G_), Pi = eo.now() + rs);
}
function G_() {
  Pi = 0;
}
function El() {
  this._call = this._time = this._next = null;
}
El.prototype = Mu.prototype = {
  constructor: El,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Tu() : +n) + (t == null ? 0 : +t), !this._next && Pr !== this && (Pr ? Pr._next = this : kl = this, Pr = this), this._call = e, this._time = n, pa();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, pa());
  }
};
function Mu(e, t, n) {
  var i = new El();
  return i.restart(e, t, n), i;
}
function U_() {
  Tu(), ++ur;
  for (var e = kl, t; e; )
    (t = Pi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ur;
}
function Hf() {
  Pi = (Cl = eo.now()) + rs, ur = Lr = 0;
  try {
    U_();
  } finally {
    ur = 0, q_(), Pi = 0;
  }
}
function W_() {
  var e = eo.now(), t = e - Cl;
  t > Vm && (rs -= t, Cl = e);
}
function q_() {
  for (var e, t = kl, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : kl = n);
  Pr = e, pa(i);
}
function pa(e) {
  if (!ur) {
    Lr && (Lr = clearTimeout(Lr));
    var t = e - Pi;
    t > 24 ? (e < 1 / 0 && (Lr = setTimeout(Hf, e - eo.now() - rs)), Sr && (Sr = clearInterval(Sr))) : (Sr || (Cl = eo.now(), Sr = setInterval(W_, Vm)), ur = 1, Lm(Hf));
  }
}
function zf(e, t, n) {
  var i = new El();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var Y_ = go("start", "end", "cancel", "interrupt"), K_ = [], Pm = 0, jf = 1, ba = 2, Yo = 3, Gf = 4, wa = 5, Ko = 6;
function os(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  X_(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Y_,
    tween: K_,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Pm
  });
}
function Au(e, t) {
  var n = mn(e, t);
  if (n.state > Pm) throw new Error("too late; already scheduled");
  return n;
}
function Vn(e, t) {
  var n = mn(e, t);
  if (n.state > Yo) throw new Error("too late; already running");
  return n;
}
function mn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function X_(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = Mu(o, 0, n.time);
  function o(u) {
    n.state = jf, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== jf) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === Yo) return zf(l);
        h.state === Gf ? (h.state = Ko, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = Ko, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (zf(function() {
      n.state === Yo && (n.state = Gf, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = ba, n.on.call("start", e, e.__data__, n.index, n.group), n.state === ba) {
      for (n.state = Yo, r = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
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
    n.state = Ko, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function Xo(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > ba && i.state < wa, i.state = Ko, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function Z_(e) {
  return this.each(function() {
    Xo(this, e);
  });
}
function J_(e, t) {
  var n, i;
  return function() {
    var r = Vn(this, e), o = r.tween;
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
function Q_(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Vn(this, e), l = o.tween;
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
function eS(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = mn(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? J_ : Q_)(n, e, t));
}
function $u(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = Vn(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return mn(r, i).value[t];
  };
}
function Im(e, t) {
  var n;
  return (typeof t == "number" ? wn : t instanceof Li ? Sl : (n = Li(t)) ? (t = n, Sl) : km)(e, t);
}
function tS(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function nS(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function iS(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function rS(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function oS(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function lS(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function sS(e, t) {
  var n = is(e), i = n === "transform" ? F_ : Im;
  return this.attrTween(e, typeof t == "function" ? (n.local ? lS : oS)(n, i, $u(this, "attr." + e, t)) : t == null ? (n.local ? nS : tS)(n) : (n.local ? rS : iS)(n, i, t));
}
function aS(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function uS(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function cS(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && uS(e, o)), n;
  }
  return r._value = t, r;
}
function fS(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && aS(e, o)), n;
  }
  return r._value = t, r;
}
function dS(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = is(e);
  return this.tween(n, (i.local ? cS : fS)(i, t));
}
function hS(e, t) {
  return function() {
    Au(this, e).delay = +t.apply(this, arguments);
  };
}
function vS(e, t) {
  return t = +t, function() {
    Au(this, e).delay = t;
  };
}
function mS(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? hS : vS)(t, e)) : mn(this.node(), t).delay;
}
function gS(e, t) {
  return function() {
    Vn(this, e).duration = +t.apply(this, arguments);
  };
}
function yS(e, t) {
  return t = +t, function() {
    Vn(this, e).duration = t;
  };
}
function pS(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? gS : yS)(t, e)) : mn(this.node(), t).duration;
}
function bS(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Vn(this, e).ease = t;
  };
}
function wS(e) {
  var t = this._id;
  return arguments.length ? this.each(bS(t, e)) : mn(this.node(), t).ease;
}
function xS(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Vn(this, e).ease = n;
  };
}
function _S(e) {
  if (typeof e != "function") throw new Error();
  return this.each(xS(this._id, e));
}
function SS(e) {
  typeof e != "function" && (e = am(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Fn(i, this._parents, this._name, this._id);
}
function kS(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < i; ++s)
    l[s] = t[s];
  return new Fn(l, this._parents, this._name, this._id);
}
function CS(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function ES(e, t, n) {
  var i, r, o = CS(t) ? Au : Vn;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function VS(e, t) {
  var n = this._id;
  return arguments.length < 2 ? mn(this.node(), n).on.on(e) : this.each(ES(n, e, t));
}
function LS(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function PS() {
  return this.on("end.remove", LS(this._id));
}
function IS(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Eu(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, os(u[f], t, n, f, u, mn(c, n)));
  return new Fn(o, this._parents, t, n);
}
function TS(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = sm(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = mn(c, n), m = 0, p = f.length; m < p; ++m)
          (h = f[m]) && os(h, t, n, m, f, v);
        o.push(f), l.push(c);
      }
  return new Fn(o, l, t, n);
}
var MS = yo.prototype.constructor;
function AS() {
  return new MS(this._groups, this._parents);
}
function $S(e, t) {
  var n, i, r;
  return function() {
    var o = ar(this, e), l = (this.style.removeProperty(e), ar(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function Tm(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function NS(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = ar(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function RS(e, t, n) {
  var i, r, o;
  return function() {
    var l = ar(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), ar(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function OS(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = Vn(this, e), u = a.on, c = a.value[o] == null ? s || (s = Tm(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function BS(e, t, n) {
  var i = (e += "") == "transform" ? B_ : Im;
  return t == null ? this.styleTween(e, $S(e, i)).on("end.style." + e, Tm(e)) : typeof t == "function" ? this.styleTween(e, RS(e, i, $u(this, "style." + e, t))).each(OS(this._id, e)) : this.styleTween(e, NS(e, i, t), n).on("end.style." + e, null);
}
function FS(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function DS(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && FS(e, l, n)), i;
  }
  return o._value = t, o;
}
function HS(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, DS(e, t, n ?? ""));
}
function zS(e) {
  return function() {
    this.textContent = e;
  };
}
function jS(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function GS(e) {
  return this.tween("text", typeof e == "function" ? jS($u(this, "text", e)) : zS(e == null ? "" : e + ""));
}
function US(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function WS(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && US(r)), t;
  }
  return i._value = e, i;
}
function qS(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, WS(e));
}
function YS() {
  for (var e = this._name, t = this._id, n = Mm(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = mn(a, t);
        os(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Fn(i, this._parents, e, n);
}
function KS() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = Vn(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var XS = 0;
function Fn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function Mm() {
  return ++XS;
}
var In = yo.prototype;
Fn.prototype = {
  constructor: Fn,
  select: IS,
  selectAll: TS,
  selectChild: In.selectChild,
  selectChildren: In.selectChildren,
  filter: SS,
  merge: kS,
  selection: AS,
  transition: YS,
  call: In.call,
  nodes: In.nodes,
  node: In.node,
  size: In.size,
  empty: In.empty,
  each: In.each,
  on: VS,
  attr: sS,
  attrTween: dS,
  style: BS,
  styleTween: HS,
  text: GS,
  textTween: qS,
  remove: PS,
  tween: eS,
  delay: mS,
  duration: pS,
  ease: wS,
  easeVarying: _S,
  end: KS,
  [Symbol.iterator]: In[Symbol.iterator]
};
const ZS = (e) => +e;
function JS(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var QS = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: JS
};
function ek(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function tk(e) {
  var t, n;
  e instanceof Fn ? (t = e._id, e = e._name) : (t = Mm(), (n = QS).time = Tu(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && os(a, e, t, u, l, n || ek(a, t));
  return new Fn(i, this._parents, e, t);
}
yo.prototype.interrupt = Z_;
yo.prototype.transition = tk;
const xa = Math.PI, _a = 2 * xa, hi = 1e-6, nk = _a - hi;
function Am(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function ik(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Am;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class rk {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Am : ik(t);
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
      let h = i - l, v = r - s, m = a * a + u * u, p = h * h + v * v, g = Math.sqrt(m), w = Math.sqrt(f), x = o * Math.tan((xa - Math.acos((m + f - p) / (2 * g * w))) / 2), b = x / w, S = x / g;
      Math.abs(b - 1) > hi && this._append`L${t + b * c},${n + b * d}`, this._append`A${o},${o},0,0,${+(d * h > c * v)},${this._x1 = t + S * a},${this._y1 = n + S * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, d = 1 ^ l, f = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > hi || Math.abs(this._y1 - c) > hi) && this._append`L${u},${c}`, i && (f < 0 && (f = f % _a + _a), f > nk ? this._append`A${i},${i},0,1,${d},${t - s},${n - a}A${i},${i},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > hi && this._append`A${i},${i},0,${+(f >= xa)},${d},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function ok(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return $m(this.cover(t, n), t, n, e);
}
function $m(e, t, n, i) {
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
function lk(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > d && (d = o));
  if (a > c || u > d) return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < i; ++n)
    $m(this, l[n], s[n], e[n]);
  return this;
}
function sk(e, t) {
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
function ak() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function uk(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function ht(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function ck(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, d = this._y1, f = [], h = this._root, v, m;
  for (h && f.push(new ht(h, r, o, c, d)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, d = t + n, n *= n); v = f.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > d || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var p = (l + a) / 2, g = (s + u) / 2;
        f.push(
          new ht(h[3], p, g, a, u),
          new ht(h[2], l, g, p, u),
          new ht(h[1], p, s, a, g),
          new ht(h[0], l, s, p, g)
        ), (m = (t >= g) << 1 | e >= p) && (v = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - m], f[f.length - 1 - m] = v);
      } else {
        var w = e - +this._x.call(null, h.data), x = t - +this._y.call(null, h.data), b = w * w + x * x;
        if (b < n) {
          var S = Math.sqrt(n = b);
          r = e - S, o = t - S, c = e + S, d = t + S, i = h.data;
        }
      }
  return i;
}
function fk(e) {
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
function dk(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function hk() {
  return this._root;
}
function vk() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function mk(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new ht(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new ht(r, u, c, s, a)), (r = i[2]) && t.push(new ht(r, o, c, u, a)), (r = i[1]) && t.push(new ht(r, u, l, s, c)), (r = i[0]) && t.push(new ht(r, o, l, u, c));
    }
  return this;
}
function gk(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new ht(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, d = (s + u) / 2;
      (o = r[0]) && t.push(new ht(o, l, s, c, d)), (o = r[1]) && t.push(new ht(o, c, s, a, d)), (o = r[2]) && t.push(new ht(o, l, d, c, u)), (o = r[3]) && t.push(new ht(o, c, d, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function yk(e) {
  return e[0];
}
function pk(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function bk(e) {
  return e[1];
}
function wk(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Nu(e, t, n) {
  var i = new Ru(t ?? yk, n ?? bk, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Ru(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function Uf(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var bt = Nu.prototype = Ru.prototype;
bt.copy = function() {
  var e = new Ru(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = Uf(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = Uf(i));
  return e;
};
bt.add = ok;
bt.addAll = lk;
bt.cover = sk;
bt.data = ak;
bt.extent = uk;
bt.find = ck;
bt.remove = fk;
bt.removeAll = dk;
bt.root = hk;
bt.size = vk;
bt.visit = mk;
bt.visitAfter = gk;
bt.x = pk;
bt.y = wk;
function mt(e) {
  return function() {
    return e;
  };
}
function Qn(e) {
  return (e() - 0.5) * 1e-6;
}
function xk(e) {
  return e.x + e.vx;
}
function _k(e) {
  return e.y + e.vy;
}
function Sk(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = mt(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, m, p, g = 0; g < o; ++g)
      for (d = Nu(t, xk, _k).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], m = n[f.index], p = m * m, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(x, b, S, E, k) {
      var P = x.data, $ = x.r, R = m + $;
      if (P) {
        if (P.index > f.index) {
          var D = h - P.x - P.vx, L = v - P.y - P.vy, I = D * D + L * L;
          I < R * R && (D === 0 && (D = Qn(i), I += D * D), L === 0 && (L = Qn(i), I += L * L), I = (R - (I = Math.sqrt(I))) / I * r, f.vx += (D *= I) * (R = ($ *= $) / (p + $)), f.vy += (L *= I) * R, P.vx -= D * (R = 1 - R), P.vy -= L * R);
        }
        return;
      }
      return b > h + R || E < h - R || S > v + R || k < v - R;
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
    return arguments.length ? (e = typeof u == "function" ? u : mt(+u), a(), l) : e;
  }, l;
}
function kk(e) {
  return e.index;
}
function Wf(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Ck(e) {
  var t = kk, n = d, i, r = mt(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function f(p) {
    for (var g = 0, w = e.length; g < c; ++g)
      for (var x = 0, b, S, E, k, P, $, R; x < w; ++x)
        b = e[x], S = b.source, E = b.target, k = E.x + E.vx - S.x - S.vx || Qn(u), P = E.y + E.vy - S.y - S.vy || Qn(u), $ = Math.sqrt(k * k + P * P), $ = ($ - o[x]) / $ * p * i[x], k *= $, P *= $, E.vx -= k * (R = a[x]), E.vy -= P * R, S.vx += k * (R = 1 - R), S.vy += P * R;
  }
  function h() {
    if (l) {
      var p, g = l.length, w = e.length, x = new Map(l.map((S, E) => [t(S, E, l), S])), b;
      for (p = 0, s = new Array(g); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = Wf(x, b.source)), typeof b.target != "object" && (b.target = Wf(x, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
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
    return arguments.length ? (n = typeof p == "function" ? p : mt(+p), v(), f) : n;
  }, f.distance = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : mt(+p), m(), f) : r;
  }, f;
}
const Ek = 1664525, Vk = 1013904223, qf = 4294967296;
function Lk() {
  let e = 1;
  return () => (e = (Ek * e + Vk) % qf) / qf;
}
function Pk(e) {
  return e.x;
}
function Ik(e) {
  return e.y;
}
var Tk = 10, Mk = Math.PI * (3 - Math.sqrt(5));
function Ak(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Mu(d), u = go("tick", "end"), c = Lk();
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
        var w = Tk * Math.sqrt(0.5 + m), x = m * Mk;
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
      var w = 0, x = e.length, b, S, E, k, P;
      for (g == null ? g = 1 / 0 : g *= g, w = 0; w < x; ++w)
        k = e[w], b = m - k.x, S = p - k.y, E = b * b + S * S, E < g && (P = k, g = E);
      return P;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function $k() {
  var e, t, n, i, r = mt(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, p = Nu(e, Pk, Ik).visitAfter(d);
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
    return arguments.length ? (r = typeof h == "function" ? h : mt(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function Nk(e) {
  var t = mt(0.1), n, i, r;
  typeof e != "function" && (e = mt(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : mt(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : mt(+s), l(), o) : e;
  }, o;
}
function Rk(e) {
  var t = mt(0.1), n, i, r;
  typeof e != "function" && (e = mt(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : mt(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : mt(+s), l(), o) : e;
  }, o;
}
function Ct(e) {
  return function() {
    return e;
  };
}
const Yf = Math.abs, ot = Math.atan2, di = Math.cos, Ok = Math.max, Ts = Math.min, pn = Math.sin, Yi = Math.sqrt, _t = 1e-12, to = Math.PI, Vl = to / 2, Bk = 2 * to;
function Fk(e) {
  return e > 1 ? 0 : e < -1 ? to : Math.acos(e);
}
function Kf(e) {
  return e >= 1 ? Vl : e <= -1 ? -Vl : Math.asin(e);
}
function Nm(e) {
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
  }, () => new rk(t);
}
function Dk(e) {
  return e.innerRadius;
}
function Hk(e) {
  return e.outerRadius;
}
function zk(e) {
  return e.startAngle;
}
function jk(e) {
  return e.endAngle;
}
function Gk(e) {
  return e && e.padAngle;
}
function Uk(e, t, n, i, r, o, l, s) {
  var a = n - e, u = i - t, c = l - r, d = s - o, f = d * a - c * u;
  if (!(f * f < _t))
    return f = (c * (t - o) - d * (e - r)) / f, [e + f * a, t + f * u];
}
function No(e, t, n, i, r, o, l) {
  var s = e - n, a = t - i, u = (l ? o : -o) / Yi(s * s + a * a), c = u * a, d = -u * s, f = e + c, h = t + d, v = n + c, m = i + d, p = (f + v) / 2, g = (h + m) / 2, w = v - f, x = m - h, b = w * w + x * x, S = r - o, E = f * m - v * h, k = (x < 0 ? -1 : 1) * Yi(Ok(0, S * S * b - E * E)), P = (E * x - w * k) / b, $ = (-E * w - x * k) / b, R = (E * x + w * k) / b, D = (-E * w + x * k) / b, L = P - p, I = $ - g, _ = R - p, O = D - g;
  return L * L + I * I > _ * _ + O * O && (P = R, $ = D), {
    cx: P,
    cy: $,
    x01: -c,
    y01: -d,
    x11: P * (r / S - 1),
    y11: $ * (r / S - 1)
  };
}
function Wk() {
  var e = Dk, t = Hk, n = Ct(0), i = null, r = zk, o = jk, l = Gk, s = null, a = Nm(u);
  function u() {
    var c, d, f = +e.apply(this, arguments), h = +t.apply(this, arguments), v = r.apply(this, arguments) - Vl, m = o.apply(this, arguments) - Vl, p = Yf(m - v), g = m > v;
    if (s || (s = c = a()), h < f && (d = h, h = f, f = d), !(h > _t)) s.moveTo(0, 0);
    else if (p > Bk - _t)
      s.moveTo(h * di(v), h * pn(v)), s.arc(0, 0, h, v, m, !g), f > _t && (s.moveTo(f * di(m), f * pn(m)), s.arc(0, 0, f, m, v, g));
    else {
      var w = v, x = m, b = v, S = m, E = p, k = p, P = l.apply(this, arguments) / 2, $ = P > _t && (i ? +i.apply(this, arguments) : Yi(f * f + h * h)), R = Ts(Yf(h - f) / 2, +n.apply(this, arguments)), D = R, L = R, I, _;
      if ($ > _t) {
        var O = Kf($ / f * pn(P)), M = Kf($ / h * pn(P));
        (E -= O * 2) > _t ? (O *= g ? 1 : -1, b += O, S -= O) : (E = 0, b = S = (v + m) / 2), (k -= M * 2) > _t ? (M *= g ? 1 : -1, w += M, x -= M) : (k = 0, w = x = (v + m) / 2);
      }
      var z = h * di(w), N = h * pn(w), F = f * di(S), B = f * pn(S);
      if (R > _t) {
        var H = h * di(x), W = h * pn(x), J = f * di(b), se = f * pn(b), fe;
        if (p < to)
          if (fe = Uk(z, N, J, se, H, W, F, B)) {
            var Z = z - fe[0], le = N - fe[1], Ce = H - fe[0], Be = W - fe[1], je = 1 / pn(Fk((Z * Ce + le * Be) / (Yi(Z * Z + le * le) * Yi(Ce * Ce + Be * Be))) / 2), wt = Yi(fe[0] * fe[0] + fe[1] * fe[1]);
            D = Ts(R, (f - wt) / (je - 1)), L = Ts(R, (h - wt) / (je + 1));
          } else
            D = L = 0;
      }
      k > _t ? L > _t ? (I = No(J, se, z, N, h, L, g), _ = No(H, W, F, B, h, L, g), s.moveTo(I.cx + I.x01, I.cy + I.y01), L < R ? s.arc(I.cx, I.cy, L, ot(I.y01, I.x01), ot(_.y01, _.x01), !g) : (s.arc(I.cx, I.cy, L, ot(I.y01, I.x01), ot(I.y11, I.x11), !g), s.arc(0, 0, h, ot(I.cy + I.y11, I.cx + I.x11), ot(_.cy + _.y11, _.cx + _.x11), !g), s.arc(_.cx, _.cy, L, ot(_.y11, _.x11), ot(_.y01, _.x01), !g))) : (s.moveTo(z, N), s.arc(0, 0, h, w, x, !g)) : s.moveTo(z, N), !(f > _t) || !(E > _t) ? s.lineTo(F, B) : D > _t ? (I = No(F, B, H, W, f, -D, g), _ = No(z, N, J, se, f, -D, g), s.lineTo(I.cx + I.x01, I.cy + I.y01), D < R ? s.arc(I.cx, I.cy, D, ot(I.y01, I.x01), ot(_.y01, _.x01), !g) : (s.arc(I.cx, I.cy, D, ot(I.y01, I.x01), ot(I.y11, I.x11), !g), s.arc(0, 0, f, ot(I.cy + I.y11, I.cx + I.x11), ot(_.cy + _.y11, _.cx + _.x11), g), s.arc(_.cx, _.cy, D, ot(_.y11, _.x11), ot(_.y01, _.x01), !g))) : s.arc(0, 0, f, S, b, g);
    }
    if (s.closePath(), c) return s = null, c + "" || null;
  }
  return u.centroid = function() {
    var c = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, d = (+r.apply(this, arguments) + +o.apply(this, arguments)) / 2 - to / 2;
    return [di(d) * c, pn(d) * c];
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
function qk(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Rm(e) {
  this._context = e;
}
Rm.prototype = {
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
function Yk(e) {
  return new Rm(e);
}
function Kk(e) {
  return e[0];
}
function Xk(e) {
  return e[1];
}
function Zk(e, t) {
  var n = Ct(!0), i = null, r = Yk, o = null, l = Nm(s);
  e = typeof e == "function" ? e : e === void 0 ? Kk : Ct(e), t = typeof t == "function" ? t : t === void 0 ? Xk : Ct(t);
  function s(a) {
    var u, c = (a = qk(a)).length, d, f = !1, h;
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
const Ro = (e) => () => e;
function Jk(e, {
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
function $n(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
$n.prototype = {
  constructor: $n,
  scale: function(e) {
    return e === 1 ? this : new $n(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new $n(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Om = new $n(1, 0, 0);
$n.prototype;
function Ms(e) {
  e.stopImmediatePropagation();
}
function kr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Qk(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function eC() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Xf() {
  return this.__zoom || Om;
}
function tC(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function nC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function iC(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function rC() {
  var e = Qk, t = eC, n = iC, i = tC, r = nC, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = j_, u = go("start", "zoom", "end"), c, d, f, h = 500, v = 150, m = 0, p = 10;
  function g(_) {
    _.property("__zoom", Xf).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", D).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", I).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(_, O, M, z) {
    var N = _.selection ? _.selection() : _;
    N.property("__zoom", Xf), _ !== N ? S(_, O, M, z) : N.interrupt().each(function() {
      E(this, arguments).event(z).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, g.scaleBy = function(_, O, M, z) {
    g.scaleTo(_, function() {
      var N = this.__zoom.k, F = typeof O == "function" ? O.apply(this, arguments) : O;
      return N * F;
    }, M, z);
  }, g.scaleTo = function(_, O, M, z) {
    g.transform(_, function() {
      var N = t.apply(this, arguments), F = this.__zoom, B = M == null ? b(N) : typeof M == "function" ? M.apply(this, arguments) : M, H = F.invert(B), W = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(x(w(F, W), B, H), N, l);
    }, M, z);
  }, g.translateBy = function(_, O, M, z) {
    g.transform(_, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), l);
    }, null, z);
  }, g.translateTo = function(_, O, M, z, N) {
    g.transform(_, function() {
      var F = t.apply(this, arguments), B = this.__zoom, H = z == null ? b(F) : typeof z == "function" ? z.apply(this, arguments) : z;
      return n(Om.translate(H[0], H[1]).scale(B.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), F, l);
    }, z, N);
  };
  function w(_, O) {
    return O = Math.max(o[0], Math.min(o[1], O)), O === _.k ? _ : new $n(O, _.x, _.y);
  }
  function x(_, O, M) {
    var z = O[0] - M[0] * _.k, N = O[1] - M[1] * _.k;
    return z === _.x && N === _.y ? _ : new $n(_.k, z, N);
  }
  function b(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function S(_, O, M, z) {
    _.on("start.zoom", function() {
      E(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var N = this, F = arguments, B = E(N, F).event(z), H = t.apply(N, F), W = M == null ? b(H) : typeof M == "function" ? M.apply(N, F) : M, J = Math.max(H[1][0] - H[0][0], H[1][1] - H[0][1]), se = N.__zoom, fe = typeof O == "function" ? O.apply(N, F) : O, Z = a(se.invert(W).concat(J / se.k), fe.invert(W).concat(J / fe.k));
      return function(le) {
        if (le === 1) le = fe;
        else {
          var Ce = Z(le), Be = J / Ce[2];
          le = new $n(Be, W[0] - Ce[0] * Be, W[1] - Ce[1] * Be);
        }
        B.zoom(null, le);
      };
    });
  }
  function E(_, O, M) {
    return !M && _.__zooming || new k(_, O);
  }
  function k(_, O) {
    this.that = _, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(_, O), this.taps = 0;
  }
  k.prototype = {
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
      var O = lt(this.that).datum();
      u.call(
        _,
        this.that,
        new Jk(_, {
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
    var M = E(this, O).event(_), z = this.__zoom, N = Math.max(o[0], Math.min(o[1], z.k * Math.pow(2, i.apply(this, arguments)))), F = jt(_);
    if (M.wheel)
      (M.mouse[0][0] !== F[0] || M.mouse[0][1] !== F[1]) && (M.mouse[1] = z.invert(M.mouse[0] = F)), clearTimeout(M.wheel);
    else {
      if (z.k === N) return;
      M.mouse = [F, z.invert(F)], Xo(this), M.start();
    }
    kr(_), M.wheel = setTimeout(B, v), M.zoom("mouse", n(x(w(z, N), M.mouse[0], M.mouse[1]), M.extent, l));
    function B() {
      M.wheel = null, M.end();
    }
  }
  function $(_, ...O) {
    if (f || !e.apply(this, arguments)) return;
    var M = _.currentTarget, z = E(this, O, !0).event(_), N = lt(_.view).on("mousemove.zoom", W, !0).on("mouseup.zoom", J, !0), F = jt(_, M), B = _.clientX, H = _.clientY;
    bm(_.view), Ms(_), z.mouse = [F, this.__zoom.invert(F)], Xo(this), z.start();
    function W(se) {
      if (kr(se), !z.moved) {
        var fe = se.clientX - B, Z = se.clientY - H;
        z.moved = fe * fe + Z * Z > m;
      }
      z.event(se).zoom("mouse", n(x(z.that.__zoom, z.mouse[0] = jt(se, M), z.mouse[1]), z.extent, l));
    }
    function J(se) {
      N.on("mousemove.zoom mouseup.zoom", null), wm(se.view, z.moved), kr(se), z.event(se).end();
    }
  }
  function R(_, ...O) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, z = jt(_.changedTouches ? _.changedTouches[0] : _, this), N = M.invert(z), F = M.k * (_.shiftKey ? 0.5 : 2), B = n(x(w(M, F), z, N), t.apply(this, O), l);
      kr(_), s > 0 ? lt(this).transition().duration(s).call(S, B, z, _) : lt(this).call(g.transform, B, z, _);
    }
  }
  function D(_, ...O) {
    if (e.apply(this, arguments)) {
      var M = _.touches, z = M.length, N = E(this, O, _.changedTouches.length === z).event(_), F, B, H, W;
      for (Ms(_), B = 0; B < z; ++B)
        H = M[B], W = jt(H, this), W = [W, this.__zoom.invert(W), H.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== W[2] && (N.touch1 = W, N.taps = 0) : (N.touch0 = W, F = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (N.taps < 2 && (d = W[0], c = setTimeout(function() {
        c = null;
      }, h)), Xo(this), N.start());
    }
  }
  function L(_, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(_), z = _.changedTouches, N = z.length, F, B, H, W;
      for (kr(_), F = 0; F < N; ++F)
        B = z[F], H = jt(B, this), M.touch0 && M.touch0[2] === B.identifier ? M.touch0[0] = H : M.touch1 && M.touch1[2] === B.identifier && (M.touch1[0] = H);
      if (B = M.that.__zoom, M.touch1) {
        var J = M.touch0[0], se = M.touch0[1], fe = M.touch1[0], Z = M.touch1[1], le = (le = fe[0] - J[0]) * le + (le = fe[1] - J[1]) * le, Ce = (Ce = Z[0] - se[0]) * Ce + (Ce = Z[1] - se[1]) * Ce;
        B = w(B, Math.sqrt(le / Ce)), H = [(J[0] + fe[0]) / 2, (J[1] + fe[1]) / 2], W = [(se[0] + Z[0]) / 2, (se[1] + Z[1]) / 2];
      } else if (M.touch0) H = M.touch0[0], W = M.touch0[1];
      else return;
      M.zoom("touch", n(x(B, H, W), M.extent, l));
    }
  }
  function I(_, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(_), z = _.changedTouches, N = z.length, F, B;
      for (Ms(_), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < N; ++F)
        B = z[F], M.touch0 && M.touch0[2] === B.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === B.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (B = jt(B, this), Math.hypot(d[0] - B[0], d[1] - B[1]) < p)) {
        var H = lt(this).on("dblclick.zoom");
        H && H.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : Ro(+_), g) : i;
  }, g.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Ro(!!_), g) : e;
  }, g.touchable = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : Ro(!!_), g) : r;
  }, g.extent = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Ro([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), g) : t;
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
function oC(e, t) {
  let n = rC().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return lC(n, e, t);
}
function lC(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
class Bm {
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
function sC(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function aC(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function uC(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function cC(e, t, n) {
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
function Cr(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function fC(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
function zt(e) {
  e.preventDefault(), e.stopPropagation();
}
function dC(e, t, n, i) {
  return h_().filter((r) => r.button === 0).on("start", (r, o) => {
    zt(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function hC(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => zt(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
var At = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(At || {});
class vC {
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
    Qe(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
function mC(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function gC(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function no(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function yC(e, t, n) {
  if (Rr(e, t, "link-arrow", "arrow", !1), Rr(e, t, "link-arrow-reverse", "arrow", !0), Rr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      Sa(e, t, i);
}
function Sa(e, t, n) {
  e.select("#link-arrow-" + no(n)).empty() && (Rr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), Rr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function $s(e, t) {
  e.select("#link-arrow-" + no(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + no(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function Rr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${Zk()(t.arrowPoints)}`).style("fill", o || "");
}
function pC(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class Zf {
  constructor() {
    Qe(this, "nodeIdCounter", 0);
    Qe(this, "nodes", []);
    Qe(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new Bm(
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
    const a = new vC(l, s, void 0, i, r);
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
function bC(e, t, n, i, r) {
  let o = Ak(e.nodes).on("tick", () => r()).force(
    "collision",
    Sk().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = wC(e, o, n, i, t), o = Dm(o, e, t, t.fixedLinkDistanceEnabled), o = Fm(o, t.nodePhysicsEnabled, n, i), o;
}
function wC(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function Fm(e, t, n, i) {
  return t ? e.force("charge", $k().strength(-500)).force("x", Nk(n / 2).strength(0.05)).force("y", Rk(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function Dm(e, t, n, i) {
  return i ? e.force(
    "link",
    Ck().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
const xC = Object.prototype.toString;
function Ll(e) {
  const t = xC.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function _C(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ll(e))
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
  if (!Ll(e))
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
function Jf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Ll(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Ll(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = SC(e), r = _C(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const Oo = " ".repeat(2), Hm = " ".repeat(4);
function kC() {
  return zm(this);
}
function zm(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${Oo}[
${Hm}${CC(e, n, i, r)}
${Oo}]
${Oo}rows: ${e.rows}
${Oo}columns: ${e.columns}
}`;
}
function CC(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push(EC(e.get(u, d), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${Hm}`);
}
function EC(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function VC(e, t) {
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
function Zt(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Jt(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function Gi(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function Ui(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function LC(e, t, n) {
  return {
    row: PC(e, t),
    column: IC(e, n)
  };
}
function PC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function IC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Qf(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Bo("startRow", t), Bo("endRow", n), Bo("startColumn", i), Bo("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function ls(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function Bo(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function zi(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function TC(e) {
  let t = ls(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function MC(e) {
  let t = ls(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function AC(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function $C(e) {
  let t = ls(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function NC(e) {
  let t = ls(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function RC(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function OC(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function BC(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function FC(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function DC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function HC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function zC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function jC(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function GC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function UC(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function WC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function qC(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function YC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t);
}
class Pe {
  static from1DArray(t, n, i) {
    if (t * n !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new ke(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, i[l * n + s]);
    return o;
  }
  static rowVector(t) {
    let n = new ke(1, t.length);
    for (let i = 0; i < t.length; i++)
      n.set(0, i, t[i]);
    return n;
  }
  static columnVector(t) {
    let n = new ke(t.length, 1);
    for (let i = 0; i < t.length; i++)
      n.set(i, 0, t[i]);
    return n;
  }
  static zeros(t, n) {
    return new ke(t, n);
  }
  static ones(t, n) {
    return new ke(t, n).fill(1);
  }
  static rand(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: r = Math.random } = i;
    let o = new ke(t, n);
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
    let s = o - r, a = new ke(t, n);
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
    let i = t.rows, r = t.columns, o = new ke(i, r);
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
    return Pe.isMatrix(t) ? t : new ke(t);
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
    let r = new ke(this.rows * n, this.columns * i);
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
    Zt(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return ke.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Zt(this, t), n = Gi(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    Zt(this, t), Zt(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    Jt(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return ke.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Jt(this, t), n = Ui(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    Jt(this, t), Jt(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = Gi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = Gi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = Gi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = Gi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = Ui(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = Ui(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = Ui(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = Ui(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    Zt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    Jt(this, t);
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
    zi(this);
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
    zi(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (Zt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    Zt(this, t), zi(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (Zt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    Zt(this, t), zi(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    Jt(this, t), zi(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    Jt(this, t), zi(this);
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
    Pe.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let r = 0; r < n.length; r++)
      i += n[r] * t[r];
    return i;
  }
  mmul(t) {
    t = ke.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.columns, o = new ke(n, r), l = new Float64Array(i);
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
    t = ke.checkMatrix(t);
    let n = new ke(2, 2);
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (i + u) * (r + c), f = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, p = (s - i) * (r + l), g = (o - u) * (a + c), w = d + v - m + g, x = h + m, b = f + v, S = d - f + h + p;
    return n.set(0, 0, w), n.set(0, 1, x), n.set(1, 0, b), n.set(1, 1, S), n;
  }
  strassen3x3(t) {
    t = ke.checkMatrix(t);
    let n = new ke(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), g = t.get(1, 2), w = t.get(2, 0), x = t.get(2, 1), b = t.get(2, 2), S = (i + r + o - l - s - c - d) * p, E = (i - l) * (-h + p), k = s * (-f + h + m - p - g - w + b), P = (-i + l + s) * (f - h + p), $ = (l + s) * (-f + h), R = i * f, D = (-i + u + c) * (f - v + g), L = (-i + u) * (v - g), I = (u + c) * (-f + v), _ = (i + r + o - s - a - u - c) * g, O = c * (-f + v + m - p - g - w + x), M = (-o + c + d) * (p + w - x), z = (o - d) * (p - x), N = o * w, F = (c + d) * (-w + x), B = (-o + s + a) * (g + w - b), H = (o - a) * (g - b), W = (s + a) * (-w + b), J = r * m, se = a * x, fe = l * v, Z = u * h, le = d * b, Ce = R + N + J, Be = S + P + $ + R + M + N + F, je = R + D + I + _ + N + B + W, wt = E + k + P + R + N + B + H, gn = E + P + $ + R + se, V = N + B + H + W + fe, A = R + D + L + O + M + z + N, U = M + z + N + F + Z, Y = R + D + L + I + le;
    return n.set(0, 0, Ce), n.set(0, 1, Be), n.set(0, 2, je), n.set(1, 0, wt), n.set(1, 1, gn), n.set(1, 2, V), n.set(2, 0, A), n.set(2, 1, U), n.set(2, 2, Y), n;
  }
  mmulStrassen(t) {
    t = ke.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, m = d.columns;
      if (v === f && m === h)
        return d;
      {
        let p = Pe.zeros(f, h);
        return p = p.setSubMatrix(d, 0, 0), p;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let m = parseInt(d.rows / 2, 10), p = parseInt(d.columns / 2, 10), g = d.subMatrix(0, m - 1, 0, p - 1), w = f.subMatrix(0, m - 1, 0, p - 1), x = d.subMatrix(0, m - 1, p, d.columns - 1), b = f.subMatrix(0, m - 1, p, f.columns - 1), S = d.subMatrix(m, d.rows - 1, 0, p - 1), E = f.subMatrix(m, f.rows - 1, 0, p - 1), k = d.subMatrix(m, d.rows - 1, p, d.columns - 1), P = f.subMatrix(m, f.rows - 1, p, f.columns - 1), $ = c(
        Pe.add(g, k),
        Pe.add(w, P),
        m,
        p
      ), R = c(Pe.add(S, k), w, m, p), D = c(g, Pe.sub(b, P), m, p), L = c(k, Pe.sub(E, w), m, p), I = c(Pe.add(g, x), P, m, p), _ = c(
        Pe.sub(S, g),
        Pe.add(w, b),
        m,
        p
      ), O = c(
        Pe.sub(x, k),
        Pe.add(E, P),
        m,
        p
      ), M = Pe.add($, L);
      M.sub(I), M.add(O);
      let z = Pe.add(D, I), N = Pe.add(R, L), F = Pe.sub($, R);
      F.add(D), F.add(_);
      let B = Pe.zeros(2 * M.rows, 2 * M.columns);
      return B = B.setSubMatrix(M, 0, 0), B = B.setSubMatrix(z, M.rows, 0), B = B.setSubMatrix(N, 0, M.columns), B = B.setSubMatrix(F, M.rows, M.columns), B.subMatrix(0, h - 1, 0, v - 1);
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
    let r = new ke(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const l = this.getRow(o);
      l.length > 0 && Jf(l, { min: n, max: i, output: l }), r.setRow(o, l);
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
    let r = new ke(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const l = this.getColumn(o);
      l.length && Jf(l, {
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
    t = ke.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.rows, o = t.columns, l = new ke(n * r, i * o);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < i; a++)
        for (let u = 0; u < r; u++)
          for (let c = 0; c < o; c++)
            l.set(r * s + u, o * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = ke.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, i = t.rows, r = this.kroneckerProduct(ke.eye(i, i)), o = ke.eye(n, n).kroneckerProduct(t);
    return r.add(o);
  }
  transpose() {
    let t = new ke(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, n, this.get(n, i));
    return t;
  }
  sortRows(t = ed) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = ed) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    Qf(this, t, n, i, r);
    let o = new ke(
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
    let r = new ke(t.length, i - n + 1);
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
    let r = new ke(i - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        r.set(l - n, o, this.get(l, t[o]));
      }
    return r;
  }
  setSubMatrix(t, n, i) {
    if (t = ke.checkMatrix(t), t.isEmpty())
      return this;
    let r = n + t.rows - 1, o = i + t.columns - 1;
    Qf(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = LC(this, t, n), r = new ke(t.length, n.length);
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
    let t = new ke(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(n, i, this.get(n, i));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return TC(this);
      case "column":
        return MC(this);
      case void 0:
        return AC(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return $C(this);
      case "column":
        return NC(this);
      case void 0:
        return RC(this);
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
        return OC(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return BC(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return FC(this, i, r);
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
        return DC(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return HC(this, i), this;
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
          i = jC(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return GC(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = UC(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return WC(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = qC(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return YC(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return zm(this, t);
  }
}
Pe.prototype.klass = "Matrix";
typeof Symbol < "u" && (Pe.prototype[Symbol.for("nodejs.util.inspect.custom")] = kC);
function ed(e, t) {
  return e - t;
}
Pe.random = Pe.rand;
Pe.randomInt = Pe.randInt;
Pe.diagonal = Pe.diag;
Pe.prototype.diagonal = Pe.prototype.diag;
Pe.identity = Pe.eye;
Pe.prototype.negate = Pe.prototype.neg;
Pe.prototype.tensorProduct = Pe.prototype.kroneckerProduct;
class ke extends Pe {
  constructor(t, n) {
    if (super(), ke.isMatrix(t))
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
    return Zt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Zt(this, t, !0), n = Float64Array.from(Gi(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    Jt(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), Jt(this, t, !0), n = Ui(this, n);
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
VC(Pe, ke);
function Ns(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function Rs(e, t, n) {
  const i = new ke([[e.x, e.y]]), r = new ke([[t.x, t.y]]), o = ke.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = jm(10), u = nr(s, -a).multiply(n.nodeRadius - 1).add(i), c = ke.multiply(s, -1), d = nr(c, a).multiply(n.nodeRadius).add(r).add(nr(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function td(e, t, n) {
  const i = new ke([[e.x, e.y]]), r = new ke([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = ke.subtract(i, r), l = o.divide(o.norm("frobenius")), s = jm(40), a = nr(l, s).multiply(n.nodeRadius - 1).add(i), u = nr(l, -s).multiply(n.nodeRadius).add(i).add(nr(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function nd(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function jm(e) {
  return e * (Math.PI / 180);
}
function nr(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new ke([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
class KC {
  constructor() {
    Qe(this, "persistSettingsLocalStorage", !1);
    Qe(this, "hasToolbar", !0);
    Qe(this, "nodeRadius", 24);
    Qe(this, "showNodeLabels", !0);
    Qe(this, "nodePhysicsEnabled", !1);
    Qe(this, "isGraphEditableInGUI", !0);
    Qe(this, "zoomEnabled", !1);
    Qe(this, "showLinkLabels", !0);
    Qe(this, "fixedLinkDistanceEnabled", !1);
    Qe(this, "markerBoxSize", 4);
    Qe(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Qe(this, "markerRef", this.markerBoxSize / 2);
    Qe(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Qe(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
function XC(e) {
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
function ZC(e) {
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
var JC = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function QC(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gm = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(JC, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (M, z, N, F) => z + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], m = [], p, g, w = 0, x = 0, b = 0, S = 0, E = 0, k = 0, P = 0, $ = 0, R = 0, D = 0, L = 0, I = 0, _ = 0, O = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(M) {
          return M !== "";
        }), m = v, v = v.map(parseFloat), p = v.length, f === "m") {
          if (O += "M ", d === "m" ? (b += v[0], S += v[1]) : (b = v[0], S = v[1]), w = b, x = S, O += b + " " + S + " ", p > 2)
            for (g = 0; g < p; g += 2)
              d === "m" ? (b += v[g], S += v[g + 1]) : (b = v[g], S = v[g + 1]), O += "L " + b + " " + S + " ";
        } else if (f === "l")
          for (g = 0; g < p; g += 2)
            d === "l" ? (b += v[g], S += v[g + 1]) : (b = v[g], S = v[g + 1]), O += "L " + b + " " + S + " ";
        else if (f === "h")
          for (g = 0; g < p; g++)
            d === "h" ? b += v[g] : b = v[g], O += "L " + b + " " + S + " ";
        else if (f === "v")
          for (g = 0; g < p; g++)
            d === "v" ? S += v[g] : S = v[g], O += "L " + b + " " + S + " ";
        else if (f === "q")
          for (g = 0; g < p; g += 4)
            d === "q" ? (E = b + v[g], k = S + v[g + 1], b += v[g + 2], S += v[g + 3]) : (E = v[g], k = v[g + 1], b = v[g + 2], S = v[g + 3]), O += "Q " + E + " " + k + " " + b + " " + S + " ";
        else if (f === "t")
          for (g = 0; g < p; g += 2)
            ["t", "q"].indexOf(h) > -1 ? (E = b + (b - E), k = S + (S - k)) : (E = b, k = S), d === "t" ? (b += v[g], S += v[g + 1]) : (b = v[g], S = v[g + 1]), O += "Q " + E + " " + k + " " + b + " " + S + " ", h = f;
        else if (f === "c")
          for (g = 0; g < p; g += 6)
            d === "c" ? (E = b + v[g], k = S + v[g + 1], P = b + v[g + 2], $ = S + v[g + 3], b += v[g + 4], S += v[g + 5]) : (E = v[g], k = v[g + 1], P = v[g + 2], $ = v[g + 3], b = v[g + 4], S = v[g + 5]), O += "C " + E + " " + k + " " + P + " " + $ + " " + b + " " + S + " ";
        else if (f === "s")
          for (g = 0; g < p; g += 4)
            E = b, k = S, ["s", "c"].indexOf(h) > -1 && (E += b - P, k += S - $), d === "s" ? (P = b + v[g], $ = S + v[g + 1], b += v[g + 2], S += v[g + 3]) : (P = v[g], $ = v[g + 1], b = v[g + 2], S = v[g + 3]), O += "C " + E + " " + k + " " + P + " " + $ + " " + b + " " + S + " ";
        else if (f === "a")
          for (g = 0; g < p; g += 7) {
            R = v[g], D = v[g + 1], L = v[g + 2], I = m[g + 3];
            let M = !1;
            if (I.length > 1) {
              let z = parseInt(I[0]), N = parseInt(I[1]), F;
              I.length > 2 && (F = parseFloat(I.substring(2))), v[g + 3] = z, v.splice(g + 4, 0, N), m.splice(g + 4, 0, "+"), F !== void 0 && v.splice(g + 5, 0, F), M = !0;
            }
            I = v[g + 3], _ = M ? v[g + 4] : m[g + 4], !M && _.length > 1 && (v[g + 4] = parseInt(_[0]), v.splice(g + 5, 0, parseFloat(_.substring(1)))), _ = v[g + 4], d === "a" ? (b += v[g + 5], S += v[g + 6]) : (b = v[g + 5], S = v[g + 6]), O += "A " + R + " " + D + " " + L + " " + I + " " + _ + " " + b + " " + S + " ";
          }
        else f === "z" && (O += "Z ", b = w, S = x);
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
      var S = "", E = f.length - 1, k;
      for (k = E; k > 0; k--)
        S += f[k] + " ";
      return x && (S += "Z"), S = S.replace(/M M/g, "Z M"), S;
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
})(Gm);
var eE = Gm.exports;
const id = /* @__PURE__ */ QC(eE), tE = /* @__PURE__ */ Me("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), nE = /* @__PURE__ */ Me("div", { class: "graph-host uninitialised" }, null, -1), iE = {
  key: 0,
  class: "button-container"
}, rE = /* @__PURE__ */ Mi({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = C(() => {
      const T = document.querySelectorAll("graph-editor");
      let j;
      for (let q = 0; q < T.length; q++) {
        const G = T[q], Ge = lt(G.shadowRoot).select(".graph-host.uninitialised");
        if (!Ge.empty()) {
          Ge.classed("uninitialised", !1), j = Ge;
          break;
        }
      }
      return j === void 0 && (j = lt(".graph-host.uninitialised"), j.classed("uninitialised", !1)), j;
    });
    Ol(() => {
      F();
    }), cn(() => {
      B(), window.addEventListener("resize", Bi);
    }), Bl(() => {
      window.removeEventListener("resize", Bi);
    });
    const i = ee(!1), r = ee(!1), o = ee(""), l = ee(""), s = ee(new Zf()), a = ee(!1), u = an(new KC());
    let c, d = 400, f = 400, h, v, m, p, g, w, x, b, S, E = 0, k = 0, P = 1, $, R;
    t({
      getGraph: D,
      setGraph: L,
      printGraph: I,
      setNodeColor: _,
      setLinkColor: O,
      deleteNode: M,
      deleteLink: z,
      toggleNodeLabels: yr,
      toggleLinkLabels: Un,
      toggleZoom: rt,
      toggleNodePhysics: Ln,
      toggleFixedLinkDistance: gr,
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
      typeof T == "object" || typeof T == "string" ? pr(T) : ss();
    }
    function I(T = "json") {
      T.toLowerCase() === "json" ? console.log(
        s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
      ) : console.log(s.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function _(T, j) {
      if (j !== void 0) {
        const G = (Array.isArray(j) ? j : [j]).map(Number);
        for (const re of G)
          g.selectAll("circle").filter((Ge) => Ge.id === re).each((Ge) => Ge.color = T).style("fill", T);
      } else
        g.selectAll("circle").each((q) => q.color = T).style("fill", T);
    }
    function O(T, j) {
      if (j) {
        const q = Array.isArray(j) ? j : [j];
        Ou(q);
        for (const G of q)
          p.selectAll(".link").filter((re) => re.id === G).each((re) => re.color = T).style("stroke", T);
      } else
        Ou(s.value.links.map((q) => q.id)), p.selectAll(".link").each((q) => q.color = T).style("stroke", T);
      Sa(m, u, T);
    }
    function M(T) {
      const j = Array.isArray(T) ? T : [T];
      for (const q of j)
        g.selectAll("circle").filter((G) => G.id === q).each(function(G) {
          let re = s.value.removeNode(G);
          if (re !== void 0) {
            let [Ge, Mt] = re;
            As(Ge, n.value), Mt.forEach((Pn) => {
              Cr(Pn, n.value);
            });
          }
        });
      a.value = s.value.nodes.length > 0;
    }
    function z(T) {
      const j = Array.isArray(T) ? T : [T];
      for (const q of j)
        p.selectAll("path").filter((G) => G.id === q).each(function(G) {
          let re = s.value.removeLink(G);
          re !== void 0 && Cr(re, n.value);
        });
    }
    function N(T) {
      u.isGraphEditableInGUI = T;
    }
    function F() {
      const T = (j) => j === "false" ? !1 : !!j;
      localStorage.wasHere && (i.value = T(localStorage.wasHere)), localStorage.showNodeLabels && (u.showNodeLabels = T(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (u.nodePhysicsEnabled = T(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (u.showLinkLabels = T(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (u.fixedLinkDistanceEnabled = T(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (u.zoomEnabled = T(localStorage.enableZoom)), localStorage.persistSettings && (u.persistSettingsLocalStorage = T(localStorage.persistSettings));
    }
    function B() {
      d = n.value.node().clientWidth, f = n.value.node().clientHeight, h = oC(
        (T) => H(T, u.zoomEnabled),
        u.zoomEnabled
      ), m = hC(
        n.value,
        h,
        (T) => u.isGraphEditableInGUI ? ne(T) : null,
        (T) => u.isGraphEditableInGUI ? U(T) : null,
        (T) => {
          u.isGraphEditableInGUI && J(
            jt(T, m.node())[0],
            jt(T, m.node())[1]
          );
        }
      ), yC(m, u, s.value.getNonDefaultLinkColors()), w = pC(m), p = mC(m), g = gC(m), c = bC(s.value, u, d, f, () => se()), v = dC(c, d, f, u.nodeRadius), je();
    }
    function H(T, j = !0) {
      j && (E = T.transform.x, k = T.transform.y, P = T.transform.k, m.attr("transform", `translate(${E},${k})scale(${P})`));
    }
    function W(T, j, q, G) {
      let re = s.value.createLink(T.id, j.id, q, G);
      re !== void 0 && aC(re, n.value), je();
    }
    function J(T, j, q, G, re) {
      let Ge = s.value.createNode(
        T ?? d / 2,
        j ?? f / 2,
        q,
        G,
        re
      );
      sC(Ge, n.value), a.value = !0, je();
    }
    function se() {
      g.attr("transform", (T) => `translate(${T.x},${T.y})`), p.selectAll("path").attr("d", (T) => fe(T)), Be(), je();
    }
    function fe(T) {
      switch (Z(T), T.pathType) {
        case At.REFLEXIVE:
          return td(T.source, [d / 2, f / 2], u);
        case At.ARC:
          return Rs(T.source, T.target, u);
        case At.ARCREVERSE:
          return id.reverse(Rs(T.source, T.target, u));
        case At.LINE:
          return Ns(T.source, T.target, u);
        case At.LINEREVERSE:
          return id.reverse(Ns(T.source, T.target, u));
        default:
          return "";
      }
    }
    function Z(T) {
      T.source.id === T.target.id ? T.pathType = At.REFLEXIVE : le(T.source, T.target) ? T.pathType = Ce(T.source, T.target) ? At.ARCREVERSE : At.ARC : T.pathType = Ce(T.source, T.target) ? At.LINEREVERSE : At.LINE;
    }
    function le(T, j) {
      return T.id !== j.id && s.value.links.some((q) => q.target.id === T.id && q.source.id === j.id) && s.value.links.some((q) => q.target.id === j.id && q.source.id === T.id);
    }
    function Ce(T, j) {
      return T.x > j.x;
    }
    function Be() {
      const T = x;
      if (T !== void 0) {
        const j = b;
        if (j !== void 0)
          w.attr("d", () => T.id === j.id ? td(T, [d / 2, f / 2], u) : le(T, j) ? Ns(T, j, u) : Rs(T, j, u));
        else if (S !== void 0) {
          const q = [T.x, T.y];
          w.attr("d", nd(q, S));
        }
      }
    }
    function je(T = 0.5) {
      p = p.data(s.value.links, (j) => j.id).join(
        (j) => {
          const q = j.append("g");
          return q.append("path").classed("link", !0).style("stroke", (G) => G.color ? G.color : "").attr("id", (G) => G.id).attr(
            "marker-end",
            (G) => G.color ? "url(#link-arrow-" + G.color : "url(#link-arrow)"
          ), q.append("path").classed("clickbox", !0).on("dblclick", (G) => {
            zt(G);
          }).on("pointerout", (G) => ie(G)).on("pointerdown", (G, re) => {
            cC(re, G.button, n.value), u.isGraphEditableInGUI && ue(G, re);
          }).on("pointerup", (G, re) => {
            Q(G, re);
          }), q.append("text").append("textPath").attr(
            "class",
            (G) => G.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (G) => `#${G.id}`).attr("startOffset", "50%").text((G) => G.label ? G.label : "add label").on("click", (G, re) => {
            u.isGraphEditableInGUI && Ae(G, re);
          }).on("dblclick", (G) => {
            zt(G);
          }), q;
        },
        (j) => (j.selectChild("path").attr("marker-start", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE")) {
            let re = "url(#link-arrow-reverse";
            return q.color && (re += "-" + no(q.color)), re += ")", re;
          } else
            return null;
        }).attr("marker-end", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE"))
            return null;
          {
            let re = "url(#link-arrow";
            return q.color && (re += "-" + no(q.color)), re += ")", re;
          }
        }), j.selectChild("text").attr("class", (q) => {
          var G;
          return `${(G = q.pathType) == null ? void 0 : G.toLowerCase()}-path-text`;
        }).attr("dy", (q) => {
          var G;
          return q.pathType === At.REFLEXIVE ? 15 : q.pathType == At.LINEREVERSE ? -10 : (G = q.pathType) != null && G.includes("REVERSE") ? 20 : -10;
        }), j.selectChild("text").selectChild("textPath").classed("hidden", !u.showLinkLabels).attr("startOffset", (q) => {
          var G;
          return (G = q.pathType) != null && G.includes("REVERSE") ? "46%" : "50%";
        }), j)
      ), g = g.data(s.value.nodes, (j) => j.id).join(
        (j) => {
          const q = j.append("g").call(v).on("dblclick", (G) => {
            zt(G);
          });
          return q.append("circle").classed("node", !0).attr("id", (G) => G.id).attr("r", u.nodeRadius).style("fill", (G) => G.color ? G.color : "").on("mouseenter", (G, re) => oe(re)).on("mouseout", (G, re) => te(re)).on("pointerdown", (G, re) => {
            uC(re, G.button, n.value), u.isGraphEditableInGUI && wt(G, re);
          }).on("pointerup", (G, re) => {
            u.isGraphEditableInGUI && U(G, re);
          }), q.append("text").attr(
            "class",
            (G) => G.label ? "node-label" : "node-label-placeholder"
          ).text((G) => G.label ? G.label : "add label").attr("dy", "0.33em").on("click", (G, re) => {
            u.isGraphEditableInGUI && Le(G, re);
          }).on("dblclick", (G) => {
            zt(G);
          }).on("mouseenter", (G, re) => b = re).on("mouseout", () => b = void 0), q;
        },
        (j) => (j.selectChild("text").classed("hidden", !u.showNodeLabels), j)
      ), c.nodes(s.value.nodes), c.alpha(T).restart();
    }
    function wt(T, j) {
      T.button === 2 && (A(j), $ = setTimeout(() => {
        b = void 0, gn(j);
      }, 250));
    }
    function gn(T) {
      let j = n.value.node().querySelector(`#${CSS.escape(String(T.id))}`);
      lt(j).classed("on-deletion", !0);
      let q = lt(j.parentElement);
      q.select("g.arc").remove();
      let G = Wk().outerRadius(u.nodeRadius + 4).innerRadius(u.nodeRadius), re = [{ startAngle: 0, endAngle: 0 }];
      q.append("g").attr("class", "arc").selectAll("path.arc").data(re).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(ZS).attrTween("d", function(Mt) {
        let Pn = { startAngle: 0, endAngle: 2 * Math.PI }, Fi = Iu(Mt, Pn);
        return function(Di) {
          return G(Fi(Di));
        };
      }).on("end", () => V(T));
    }
    function V(T) {
      if (u.isGraphEditableInGUI) {
        let j = s.value.removeNode(T);
        if (j !== void 0) {
          let [q, G] = j;
          As(q, n.value), G.forEach((re) => {
            Cr(re, n.value);
          });
        }
        a.value = s.value.nodes.length > 0, xt(), je();
      }
    }
    function A(T) {
      const j = [T.x, T.y];
      S = j, x = T, w.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", nd(j, j)), je();
    }
    function U(T, j = void 0) {
      zt(T), clearTimeout($), j && Y(j), K();
    }
    function Y(T) {
      let j = n.value.node().querySelector(`#${CSS.escape(String(T.id))}`).parentElement, q = lt(j);
      q.select("circle").classed("on-deletion", !1), q.select("g.arc").select("path.arc").interrupt().remove();
    }
    function K() {
      const T = x, j = b;
      xt(), !(T === void 0 || j === void 0) && W(T, j);
    }
    function ne(T) {
      if (zt(T), x !== void 0) {
        const j = s_(T, n.value.node())[0], q = [
          (j[0] - E) / P,
          (j[1] - k) / P
        ];
        T.pointerType === "touch" && (q[1] = q[1] - 4 * u.nodeRadius, b = s.value.nodes.find(
          (G) => Math.sqrt(Math.pow(G.x - q[0], 2) + Math.pow(G.y - q[1], 2)) < u.nodeRadius
        )), S = q, Be();
      }
    }
    function oe(T) {
      b = T;
    }
    function te(T) {
      T && Y(T), b = void 0, clearTimeout($);
    }
    function ie(T) {
      zt(T), clearTimeout(R);
    }
    function Q(T, j) {
      zt(T), clearTimeout(R), T.button === 2 && Se(j);
    }
    function ue(T, j) {
      T.button === 2 && (zt(T), R = setTimeout(() => {
        ye(j);
      }, 250));
    }
    function ye(T) {
      let j = n.value.node().querySelector(`#${CSS.escape(T.id)}`);
      if (j instanceof SVGPathElement) {
        let q = lt(j), G = j.getTotalLength(), re = j.parentElement.querySelector("text"), Ge = Array.from(re.classList).some(
          (Fi) => Fi.includes("reverse")
        ), Mt = 0, Pn = Ge ? G : -G;
        q.attr("stroke-dasharray", G).attr("stroke-dashoffset", Mt).transition().duration(750).attr("stroke-dashoffset", Pn).on("end", () => me(T));
      }
    }
    function me(T) {
      let j = T.color;
      if (u.isGraphEditableInGUI) {
        let q = s.value.removeLink(T);
        q !== void 0 && Cr(q, n.value), j && (s.value.hasNonDefaultLinkColor(j) || $s(m, j));
      }
    }
    function Se(T) {
      let j = n.value.node().querySelector(`#${CSS.escape(T.id)}`);
      if (j instanceof SVGPathElement) {
        let q = lt(j), G = j.getTotalLength();
        q.attr("stroke-dasharray", G).attr("stroke-dashoffset", G).transition().attr("stroke-dashoffset", 0).on("end", () => {
          q.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
    }
    function Le(T, j) {
      const q = T == null ? void 0 : T.target;
      Ne(j, q, [j.x, j.y]);
    }
    function Ae(T, j) {
      const q = T.target;
      let G = Ze(q);
      Ne(j, q, G);
    }
    function Ne(T, j, q) {
      var Fi;
      let G = T instanceof Bm ? "node" : "link";
      const re = document.createElement("input");
      re.setAttribute("class", "label-input"), T.label == null ? re.value = "" : re.value = T.label, re.placeholder = `Enter ${G} label`, re.ondblclick = function(Di) {
        zt(Di);
      };
      let Ge = !1;
      re.onkeyup = function(Di) {
        Di.key === "Enter" ? (fC(T, re.value, n.value), Ge = !0, re.blur()) : Di.key === "Escape" && (re.value = "", re.blur());
      }, re.onblur = function() {
        Ge && (re.value === "" ? (j.setAttribute("class", `${G}-label-placeholder`), j.textContent = "add label", T.label = void 0) : (j.setAttribute("class", `${G}-label`), j.textContent = re.value.trim(), T.label = j.textContent)), Mt.remove();
      };
      const Mt = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      Mt.setAttribute("width", "100%"), Mt.setAttribute("height", "100%"), Mt.setAttribute("x", `${q[0] - 80}`), Mt.setAttribute("y", `${q[1] - 12}`), Mt.append(re);
      const Pn = j.closest("svg");
      (Fi = Pn == null ? void 0 : Pn.querySelector("g")) == null || Fi.append(Mt), re.focus();
    }
    function Ze(T) {
      let j = n.value.select("svg").node().getBoundingClientRect(), q = T.getBoundingClientRect(), G = (q.x - j.x - E) / P, re = (q.y - j.y - k) / P;
      return [G, re];
    }
    function Tt(T) {
      yr(T.showNodeLabels), Ln(T.nodePhysicsEnabled), Un(T.showLinkLabels), gr(T.fixedLinkDistanceEnabled), rt(T.zoomEnabled), u.persistSettingsLocalStorage = T.persistEnabled;
    }
    function Ln(T) {
      u.nodePhysicsEnabled = T, Fm(c, T, d, f);
    }
    function gr(T) {
      u.fixedLinkDistanceEnabled = T, Dm(c, s.value, u, T);
    }
    function Un(T) {
      u.showLinkLabels = T;
    }
    function yr(T) {
      u.showNodeLabels = T;
    }
    function rt(T) {
      u.zoomEnabled = T, Bi();
    }
    function xt() {
      w == null || w.classed("hidden", !0).attr("marker-end", "null"), x = void 0, b = void 0, S = void 0;
    }
    function pr(T) {
      let j, q;
      try {
        if (typeof T == "string")
          [j, q] = XC(T);
        else if (typeof T == "object")
          [j, q] = ZC(T);
        else {
          Bu("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (G) {
        Bu("Error during parsing:", `Invalid data format:
` + G);
        return;
      }
      ss(), Km(j, q);
    }
    function Km(T, j) {
      for (let G of T)
        J(
          G.x,
          G.y,
          G.idImported,
          G.label,
          G.color
        );
      const q = (G) => s.value.nodes.find((re) => re.idImported === G);
      for (let G of j) {
        let re = q(G.sourceIdImported), Ge = q(G.targetIdImported);
        re && Ge && (W(re, Ge, G.label, G.color), G.color && Sa(m, u, G.color));
      }
    }
    function Ou(T) {
      for (let j of T) {
        const q = s.value.links.filter((G) => G.id === j).map((G) => G.color).shift();
        q && (s.value.hasNonDefaultLinkColor(q, j) ? s.value.getLinkIdsWithNonDefaultLinkColors(
          q,
          j
        ).every(
          (Ge) => T.includes(Ge)
        ) && $s(m, q) : $s(m, q));
      }
    }
    function Bi() {
      c.stop(), n.value.selectChildren().remove(), h = void 0, E = 0, k = 0, P = 1, m = void 0, w = void 0, p = void 0, g = void 0, c = void 0, xt(), F(), B();
    }
    function ss() {
      s.value.links.forEach((T) => Cr(T, n.value)), s.value.nodes.forEach((T) => As(T, n.value)), s.value = new Zf(), a.value = !1, Bi();
    }
    function Bu(T, j) {
      console.error(T + `
` + j), r.value = !0, o.value = T, l.value = j.toString(), window.setInterval(() => r.value = !1, 6e3);
    }
    return (T, j) => (dt(), nl(Ve, null, [
      tE,
      nE,
      u.hasToolbar ? (dt(), nl("div", iE, [
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ce(({ props: q }) => [
            u.isGraphEditableInGUI ? (dt(), on(at, he({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, q, {
              variant: "plain",
              onClick: j[0] || (j[0] = (G) => J())
            }), null, 16)) : Qt("", !0)
          ]),
          _: 1
        }),
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ce(({ props: q }) => [
            u.isGraphEditableInGUI ? (dt(), on(at, he({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, q, {
              variant: "plain",
              onClick: j[1] || (j[1] = (G) => ss())
            }), null, 16)) : Qt("", !0)
          ]),
          _: 1
        }),
        y(Qi, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ce(({ props: q }) => [
            u.zoomEnabled ? (dt(), on(at, he({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, q, {
              variant: "plain",
              onClick: j[2] || (j[2] = (G) => Bi())
            }), null, 16)) : Qt("", !0)
          ]),
          _: 1
        }),
        y(Vb, {
          "graph-as-tgf": s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !1, !1),
          "graph-as-json": s.value.toJSON(u.showNodeLabels, u.showLinkLabels, !0, !0, !0),
          onFileImported: pr
        }, null, 8, ["graph-as-tgf", "graph-as-json"]),
        y(Nb),
        y(Cx, {
          config: u,
          "is-welcome": !i.value,
          onUpdateSettings: Tt
        }, null, 8, ["config", "is-welcome"])
      ])) : Qt("", !0),
      De(Me("div", null, [
        y(jv, {
          class: "info-text-background",
          "show-controls-graph": "",
          "show-controls-environment": !1,
          "show-header": !1
        })
      ], 512), [
        [yt, !a.value]
      ]),
      y(la, {
        modelValue: r.value,
        "onUpdate:modelValue": j[3] || (j[3] = (q) => r.value = q),
        color: "error",
        variant: "tonal"
      }, {
        default: ce(() => [
          y(St, { align: "center" }, {
            default: ce(() => [
              y(ze, {
                icon: "$error",
                class: "ml-2"
              }),
              y(Wi, null, {
                default: ce(() => [
                  Me("h4", null, ft(o.value), 1),
                  Me("p", null, ft(l.value), 1)
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
}), oE = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:not(.on-deletion):hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text-background{width:50%;height:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}", lE = /* @__PURE__ */ _u(rE, [["styles", [oE]]]), ka = {
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
function sE(e, t) {
  const n = [];
  let i = [];
  const r = Um(e), o = Wm(e), l = (r.getDay() - ka[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - ka[t.slice(-2).toUpperCase()] + 7) % 7;
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
function aE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function uE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function Um(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Wm(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function cE(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const fE = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function qm(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (fE.test(e))
      return cE(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const rd = new Date(2e3, 0, 2);
function dE(e) {
  const t = ka[e.slice(-2).toUpperCase()];
  return Ja(7).map((n) => {
    const i = new Date(rd);
    return i.setDate(rd.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function hE(e, t, n, i) {
  const r = qm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function vE(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Mc(String(n.getMonth() + 1), 2, "0"), o = Mc(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function mE(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function gE(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function yE(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function pE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function bE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function wE(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function xE(e) {
  return e.getFullYear();
}
function _E(e) {
  return e.getMonth();
}
function SE(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function kE(e) {
  return e.getHours();
}
function CE(e) {
  return e.getMinutes();
}
function EE(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function VE(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function LE(e, t) {
  return Ca(e, t[0]) && IE(e, t[1]);
}
function PE(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Ca(e, t) {
  return e.getTime() > t.getTime();
}
function IE(e, t) {
  return e.getTime() < t.getTime();
}
function od(e, t) {
  return e.getTime() === t.getTime();
}
function TE(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function ME(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function AE(e, t, n) {
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
function $E(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function NE(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function RE(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function OE(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function BE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function FE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class DE {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return qm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return vE(this, t);
  }
  parseISO(t) {
    return mE(t);
  }
  addMinutes(t, n) {
    return gE(t, n);
  }
  addHours(t, n) {
    return yE(t, n);
  }
  addDays(t, n) {
    return pE(t, n);
  }
  addWeeks(t, n) {
    return bE(t, n);
  }
  addMonths(t, n) {
    return wE(t, n);
  }
  getWeekArray(t) {
    return sE(t, this.locale);
  }
  startOfWeek(t) {
    return aE(t);
  }
  endOfWeek(t) {
    return uE(t);
  }
  startOfMonth(t) {
    return Um(t);
  }
  endOfMonth(t) {
    return Wm(t);
  }
  format(t, n) {
    return hE(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return od(t, n);
  }
  isValid(t) {
    return PE(t);
  }
  isWithinRange(t, n) {
    return LE(t, n);
  }
  isAfter(t, n) {
    return Ca(t, n);
  }
  isBefore(t, n) {
    return !Ca(t, n) && !od(t, n);
  }
  isSameDay(t, n) {
    return TE(t, n);
  }
  isSameMonth(t, n) {
    return ME(t, n);
  }
  setMinutes(t, n) {
    return NE(t, n);
  }
  setHours(t, n) {
    return $E(t, n);
  }
  setMonth(t, n) {
    return RE(t, n);
  }
  setYear(t, n) {
    return OE(t, n);
  }
  getDiff(t, n, i) {
    return AE(t, n, i);
  }
  getWeekdays() {
    return dE(this.locale);
  }
  getYear(t) {
    return xE(t);
  }
  getMonth(t) {
    return _E(t);
  }
  getNextMonth(t) {
    return SE(t);
  }
  getHours(t) {
    return kE(t);
  }
  getMinutes(t) {
    return CE(t);
  }
  startOfDay(t) {
    return BE(t);
  }
  endOfDay(t) {
    return FE(t);
  }
  startOfYear(t) {
    return EE(t);
  }
  endOfYear(t) {
    return VE(t);
  }
}
const HE = Symbol.for("vuetify:date-options"), ld = Symbol.for("vuetify:date-adapter");
function zE(e, t) {
  const n = Ot({
    adapter: DE,
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
    instance: jE(n, t)
  };
}
function jE(e, t) {
  const n = an(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return be(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const GE = Symbol.for("vuetify:goto");
function UE() {
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
function WE(e, t) {
  return {
    rtl: t.isRtl,
    options: Ot(UE(), e)
  };
}
function Ym() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = Ot(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = tp(i.defaults), a = m1(i.display, i.ssr), u = fp(i.theme), c = wp(i.icons), d = Lp(i.locale), f = zE(i.date, d), h = WE(i.goTo, d);
  return {
    install: (m) => {
      for (const p in l)
        m.directive(p, l[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in r)
        m.component(p, dn({
          ...r[p],
          name: p,
          aliasName: r[p].name
        }));
      if (u.install(m), m.provide(or, s), m.provide(oa, a), m.provide(hl, u), m.provide(Qs, c), m.provide(vl, d), m.provide(HE, f.options), m.provide(ld, f.instance), m.provide(GE, h), Re && i.ssr)
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
            return Ke(() => a.update()), m.mount = p, g;
          };
        }
      Lt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return an({
              defaults: ji.call(this, or),
              display: ji.call(this, oa),
              theme: ji.call(this, hl),
              icons: ji.call(this, Qs),
              locale: ji.call(this, vl),
              date: ji.call(this, ld)
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
const qE = "3.5.9";
Ym.version = qE;
function ji(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const YE = {
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
}, KE = {
  component: su
};
var XE = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", ZE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", JE = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", QE = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", eV = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", tV = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", nV = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
Ym({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...YE,
      addNode: nV,
      deleteGraph: ZE,
      help: QE,
      importExport: JE,
      resetView: tV,
      settings: XE,
      helpCircle: eV
    },
    sets: {
      mdi: KE
    }
  }
});
customElements.define(
  "graph-editor",
  // GUI Version
  // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
  // CLI Version
  /* @__PURE__ */ my(lE)
);
