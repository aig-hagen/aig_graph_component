var Gh = Object.defineProperty;
var Uh = (e, t, n) => t in e ? Gh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Me = (e, t, n) => (Uh(e, typeof t != "symbol" ? t + "" : t, n), n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function dl(e, t) {
  const n = new Set(e.split(","));
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
const Te = {}, nr = [], pt = () => {
}, qh = () => !1, xo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), hl = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, gl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Yh = Object.prototype.hasOwnProperty, be = (e, t) => Yh.call(e, t), re = Array.isArray, rr = (e) => Co(e) === "[object Map]", Pc = (e) => Co(e) === "[object Set]", se = (e) => typeof e == "function", Pe = (e) => typeof e == "string", vr = (e) => typeof e == "symbol", Le = (e) => e !== null && typeof e == "object", Rc = (e) => (Le(e) || se(e)) && se(e.then) && se(e.catch), Nc = Object.prototype.toString, Co = (e) => Nc.call(e), Kh = (e) => Co(e).slice(8, -1), Oc = (e) => Co(e) === "[object Object]", ml = (e) => Pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ir = /* @__PURE__ */ dl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), So = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Xh = /-(\w)/g, Ze = So((e) => e.replace(Xh, (t, n) => n ? n.toUpperCase() : "")), Zh = /\B([A-Z])/g, Ct = So(
  (e) => e.replace(Zh, "-$1").toLowerCase()
), pr = So((e) => e.charAt(0).toUpperCase() + e.slice(1)), es = So((e) => e ? `on${pr(e)}` : ""), pn = (e, t) => !Object.is(e, t), ts = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Yi = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Jh = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Es = (e) => {
  const t = Pe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let xa;
const Fc = () => xa || (xa = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vl(e) {
  if (re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = Pe(r) ? ng(r) : vl(r);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (Pe(e) || Le(e))
    return e;
}
const Qh = /;(?![^(]*\))/g, eg = /:([^]+)/, tg = /\/\*[^]*?\*\//g;
function ng(e) {
  const t = {};
  return e.replace(tg, "").split(Qh).forEach((n) => {
    if (n) {
      const r = n.split(eg);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function pl(e) {
  let t = "";
  if (Pe(e))
    t = e;
  else if (re(e))
    for (let n = 0; n < e.length; n++) {
      const r = pl(e[n]);
      r && (t += r + " ");
    }
  else if (Le(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const rg = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ig = /* @__PURE__ */ dl(rg);
function Bc(e) {
  return !!e || e === "";
}
const Mn = (e) => Pe(e) ? e : e == null ? "" : re(e) || Le(e) && (e.toString === Nc || !se(e.toString)) ? JSON.stringify(e, Dc, 2) : String(e), Dc = (e, t) => t && t.__v_isRef ? Dc(e, t.value) : rr(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, i], o) => (n[ns(r, o) + " =>"] = i, n),
    {}
  )
} : Pc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ns(n))
} : vr(t) ? ns(t) : Le(t) && !re(t) && !Oc(t) ? String(t) : t, ns = (e, t = "") => {
  var n;
  return vr(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let lt;
class Hc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = lt, !t && lt && (this.index = (lt.scopes || (lt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = lt;
      try {
        return lt = this, t();
      } finally {
        lt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    lt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    lt = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function yl(e) {
  return new Hc(e);
}
function og(e, t = lt) {
  t && t.active && t.effects.push(e);
}
function sg() {
  return lt;
}
function ht(e) {
  lt && lt.cleanups.push(e);
}
let Nn;
class wl {
  constructor(t, n, r, i) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, og(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Wn();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (lg(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Gn();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = mn, n = Nn;
    try {
      return mn = !0, Nn = this, this._runnings++, Ca(this), this.fn();
    } finally {
      Sa(this), this._runnings--, Nn = n, mn = t;
    }
  }
  stop() {
    var t;
    this.active && (Ca(this), Sa(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function lg(e) {
  return e.value;
}
function Ca(e) {
  e._trackId++, e._depsLength = 0;
}
function Sa(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      zc(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function zc(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let mn = !0, Ls = 0;
const jc = [];
function Wn() {
  jc.push(mn), mn = !1;
}
function Gn() {
  const e = jc.pop();
  mn = e === void 0 ? !0 : e;
}
function bl() {
  Ls++;
}
function _l() {
  for (Ls--; !Ls && Ms.length; )
    Ms.shift()();
}
function Wc(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && zc(r, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Ms = [];
function Gc(e, t, n) {
  bl();
  for (const r of e.keys()) {
    let i;
    r._dirtyLevel < t && (i ?? (i = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (i ?? (i = e.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Ms.push(r.scheduler)));
  }
  _l();
}
const Uc = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Ki = /* @__PURE__ */ new WeakMap(), On = Symbol(""), Ts = Symbol("");
function nt(e, t, n) {
  if (mn && Nn) {
    let r = Ki.get(e);
    r || Ki.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Uc(() => r.delete(n))), Wc(
      Nn,
      i
    );
  }
}
function Ut(e, t, n, r, i, o) {
  const s = Ki.get(e);
  if (!s)
    return;
  let l = [];
  if (t === "clear")
    l = [...s.values()];
  else if (n === "length" && re(e)) {
    const a = Number(r);
    s.forEach((u, c) => {
      (c === "length" || !vr(c) && c >= a) && l.push(u);
    });
  } else
    switch (n !== void 0 && l.push(s.get(n)), t) {
      case "add":
        re(e) ? ml(n) && l.push(s.get("length")) : (l.push(s.get(On)), rr(e) && l.push(s.get(Ts)));
        break;
      case "delete":
        re(e) || (l.push(s.get(On)), rr(e) && l.push(s.get(Ts)));
        break;
      case "set":
        rr(e) && l.push(s.get(On));
        break;
    }
  bl();
  for (const a of l)
    a && Gc(
      a,
      4
    );
  _l();
}
function ag(e, t) {
  var n;
  return (n = Ki.get(e)) == null ? void 0 : n.get(t);
}
const ug = /* @__PURE__ */ dl("__proto__,__v_isRef,__isVue"), qc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(vr)
), ka = /* @__PURE__ */ cg();
function cg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = ve(this);
      for (let o = 0, s = this.length; o < s; o++)
        nt(r, "get", o + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(ve)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Wn(), bl();
      const r = ve(this)[t].apply(this, n);
      return _l(), Gn(), r;
    };
  }), e;
}
function fg(e) {
  const t = ve(this);
  return nt(t, "has", e), t.hasOwnProperty(e);
}
class Yc {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const i = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (i ? o ? Sg : Jc : o ? Zc : Xc).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const s = re(t);
    if (!i) {
      if (s && be(ka, n))
        return Reflect.get(ka, n, r);
      if (n === "hasOwnProperty")
        return fg;
    }
    const l = Reflect.get(t, n, r);
    return (vr(n) ? qc.has(n) : ug(n)) || (i || nt(t, "get", n), o) ? l : $e(l) ? s && ml(n) ? l : l.value : Le(l) ? i ? ei(l) : Mt(l) : l;
  }
}
class Kc extends Yc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, i) {
    let o = t[n];
    if (!this._isShallow) {
      const a = cr(o);
      if (!Xi(r) && !cr(r) && (o = ve(o), r = ve(r)), !re(t) && $e(o) && !$e(r))
        return a ? !1 : (o.value = r, !0);
    }
    const s = re(t) && ml(n) ? Number(n) < t.length : be(t, n), l = Reflect.set(t, n, r, i);
    return t === ve(i) && (s ? pn(r, o) && Ut(t, "set", n, r) : Ut(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = be(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && Ut(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!vr(n) || !qc.has(n)) && nt(t, "has", n), r;
  }
  ownKeys(t) {
    return nt(
      t,
      "iterate",
      re(t) ? "length" : On
    ), Reflect.ownKeys(t);
  }
}
class dg extends Yc {
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
const hg = /* @__PURE__ */ new Kc(), gg = /* @__PURE__ */ new dg(), mg = /* @__PURE__ */ new Kc(
  !0
), xl = (e) => e, ko = (e) => Reflect.getPrototypeOf(e);
function mi(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = ve(e), o = ve(t);
  n || (pn(t, o) && nt(i, "get", t), nt(i, "get", o));
  const { has: s } = ko(i), l = r ? xl : n ? kl : Or;
  if (s.call(i, t))
    return l(e.get(t));
  if (s.call(i, o))
    return l(e.get(o));
  e !== i && e.get(t);
}
function vi(e, t = !1) {
  const n = this.__v_raw, r = ve(n), i = ve(e);
  return t || (pn(e, i) && nt(r, "has", e), nt(r, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function pi(e, t = !1) {
  return e = e.__v_raw, !t && nt(ve(e), "iterate", On), Reflect.get(e, "size", e);
}
function Ea(e) {
  e = ve(e);
  const t = ve(this);
  return ko(t).has.call(t, e) || (t.add(e), Ut(t, "add", e, e)), this;
}
function La(e, t) {
  t = ve(t);
  const n = ve(this), { has: r, get: i } = ko(n);
  let o = r.call(n, e);
  o || (e = ve(e), o = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), o ? pn(t, s) && Ut(n, "set", e, t) : Ut(n, "add", e, t), this;
}
function Ma(e) {
  const t = ve(this), { has: n, get: r } = ko(t);
  let i = n.call(t, e);
  i || (e = ve(e), i = n.call(t, e)), r && r.call(t, e);
  const o = t.delete(e);
  return i && Ut(t, "delete", e, void 0), o;
}
function Ta() {
  const e = ve(this), t = e.size !== 0, n = e.clear();
  return t && Ut(e, "clear", void 0, void 0), n;
}
function yi(e, t) {
  return function(r, i) {
    const o = this, s = o.__v_raw, l = ve(s), a = t ? xl : e ? kl : Or;
    return !e && nt(l, "iterate", On), s.forEach((u, c) => r.call(i, a(u), a(c), o));
  };
}
function wi(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, o = ve(i), s = rr(o), l = e === "entries" || e === Symbol.iterator && s, a = e === "keys" && s, u = i[e](...r), c = n ? xl : t ? kl : Or;
    return !t && nt(
      o,
      "iterate",
      a ? Ts : On
    ), {
      // iterator protocol
      next() {
        const { value: f, done: d } = u.next();
        return d ? { value: f, done: d } : {
          value: l ? [c(f[0]), c(f[1])] : c(f),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function on(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function vg() {
  const e = {
    get(o) {
      return mi(this, o);
    },
    get size() {
      return pi(this);
    },
    has: vi,
    add: Ea,
    set: La,
    delete: Ma,
    clear: Ta,
    forEach: yi(!1, !1)
  }, t = {
    get(o) {
      return mi(this, o, !1, !0);
    },
    get size() {
      return pi(this);
    },
    has: vi,
    add: Ea,
    set: La,
    delete: Ma,
    clear: Ta,
    forEach: yi(!1, !0)
  }, n = {
    get(o) {
      return mi(this, o, !0);
    },
    get size() {
      return pi(this, !0);
    },
    has(o) {
      return vi.call(this, o, !0);
    },
    add: on("add"),
    set: on("set"),
    delete: on("delete"),
    clear: on("clear"),
    forEach: yi(!0, !1)
  }, r = {
    get(o) {
      return mi(this, o, !0, !0);
    },
    get size() {
      return pi(this, !0);
    },
    has(o) {
      return vi.call(this, o, !0);
    },
    add: on("add"),
    set: on("set"),
    delete: on("delete"),
    clear: on("clear"),
    forEach: yi(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = wi(
      o,
      !1,
      !1
    ), n[o] = wi(
      o,
      !0,
      !1
    ), t[o] = wi(
      o,
      !1,
      !0
    ), r[o] = wi(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  pg,
  yg,
  wg,
  bg
] = /* @__PURE__ */ vg();
function Cl(e, t) {
  const n = t ? e ? bg : wg : e ? yg : pg;
  return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(
    be(n, i) && i in r ? n : r,
    i,
    o
  );
}
const _g = {
  get: /* @__PURE__ */ Cl(!1, !1)
}, xg = {
  get: /* @__PURE__ */ Cl(!1, !0)
}, Cg = {
  get: /* @__PURE__ */ Cl(!0, !1)
}, Xc = /* @__PURE__ */ new WeakMap(), Zc = /* @__PURE__ */ new WeakMap(), Jc = /* @__PURE__ */ new WeakMap(), Sg = /* @__PURE__ */ new WeakMap();
function kg(e) {
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
function Eg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kg(Kh(e));
}
function Mt(e) {
  return cr(e) ? e : Sl(
    e,
    !1,
    hg,
    _g,
    Xc
  );
}
function Lg(e) {
  return Sl(
    e,
    !1,
    mg,
    xg,
    Zc
  );
}
function ei(e) {
  return Sl(
    e,
    !0,
    gg,
    Cg,
    Jc
  );
}
function Sl(e, t, n, r, i) {
  if (!Le(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const s = Eg(e);
  if (s === 0)
    return e;
  const l = new Proxy(
    e,
    s === 2 ? r : n
  );
  return i.set(e, l), l;
}
function ir(e) {
  return cr(e) ? ir(e.__v_raw) : !!(e && e.__v_isReactive);
}
function cr(e) {
  return !!(e && e.__v_isReadonly);
}
function Xi(e) {
  return !!(e && e.__v_isShallow);
}
function Qc(e) {
  return ir(e) || cr(e);
}
function ve(e) {
  const t = e && e.__v_raw;
  return t ? ve(t) : e;
}
function ef(e) {
  return Object.isExtensible(e) && Yi(e, "__v_skip", !0), e;
}
const Or = (e) => Le(e) ? Mt(e) : e, kl = (e) => Le(e) ? ei(e) : e;
class tf {
  constructor(t, n, r, i) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new wl(
      () => t(this._value),
      () => Ri(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const t = ve(this);
    return (!t._cacheable || t.effect.dirty) && pn(t._value, t._value = t.effect.run()) && Ri(t, 4), nf(t), t.effect._dirtyLevel >= 2 && Ri(t, 2), t._value;
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
function Mg(e, t, n = !1) {
  let r, i;
  const o = se(e);
  return o ? (r = e, i = pt) : (r = e.get, i = e.set), new tf(r, i, o || !i, n);
}
function nf(e) {
  var t;
  mn && Nn && (e = ve(e), Wc(
    Nn,
    (t = e.dep) != null ? t : e.dep = Uc(
      () => e.dep = void 0,
      e instanceof tf ? e : void 0
    )
  ));
}
function Ri(e, t = 4, n) {
  e = ve(e);
  const r = e.dep;
  r && Gc(
    r,
    t
  );
}
function $e(e) {
  return !!(e && e.__v_isRef === !0);
}
function ie(e) {
  return rf(e, !1);
}
function pe(e) {
  return rf(e, !0);
}
function rf(e, t) {
  return $e(e) ? e : new Tg(e, t);
}
class Tg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : ve(t), this._value = n ? t : Or(t);
  }
  get value() {
    return nf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Xi(t) || cr(t);
    t = n ? t : ve(t), pn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Or(t), Ri(this, 4));
  }
}
function Nt(e) {
  return $e(e) ? e.value : e;
}
const Vg = {
  get: (e, t, n) => Nt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return $e(i) && !$e(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function of(e) {
  return ir(e) ? e : new Proxy(e, Vg);
}
function El(e) {
  const t = re(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = sf(e, n);
  return t;
}
class Ig {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return ag(ve(this._object), this._key);
  }
}
class $g {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function we(e, t, n) {
  return $e(e) ? e : se(e) ? new $g(e) : Le(e) && arguments.length > 1 ? sf(e, t, n) : ie(e);
}
function sf(e, t, n) {
  const r = e[t];
  return $e(r) ? r : new Ig(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function vn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    Eo(i, t, n);
  }
}
function yt(e, t, n, r) {
  if (se(e)) {
    const o = vn(e, t, n, r);
    return o && Rc(o) && o.catch((s) => {
      Eo(s, t, n);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(yt(e[o], t, n, r));
  return i;
}
function Eo(e, t, n, r = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const s = t.proxy, l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](e, s, l) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      vn(
        a,
        null,
        10,
        [e, s, l]
      );
      return;
    }
  }
  Ag(e, n, i, r);
}
function Ag(e, t, n, r = !0) {
  console.error(e);
}
let Fr = !1, Vs = !1;
const ze = [];
let Rt = 0;
const or = [];
let an = null, Vn = 0;
const lf = /* @__PURE__ */ Promise.resolve();
let Ll = null;
function He(e) {
  const t = Ll || lf;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Pg(e) {
  let t = Rt + 1, n = ze.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = ze[r], o = Br(i);
    o < e || o === e && i.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Ml(e) {
  (!ze.length || !ze.includes(
    e,
    Fr && e.allowRecurse ? Rt + 1 : Rt
  )) && (e.id == null ? ze.push(e) : ze.splice(Pg(e.id), 0, e), af());
}
function af() {
  !Fr && !Vs && (Vs = !0, Ll = lf.then(cf));
}
function Rg(e) {
  const t = ze.indexOf(e);
  t > Rt && ze.splice(t, 1);
}
function Ng(e) {
  re(e) ? or.push(...e) : (!an || !an.includes(
    e,
    e.allowRecurse ? Vn + 1 : Vn
  )) && or.push(e), af();
}
function Va(e, t, n = Fr ? Rt + 1 : 0) {
  for (; n < ze.length; n++) {
    const r = ze[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid)
        continue;
      ze.splice(n, 1), n--, r();
    }
  }
}
function uf(e) {
  if (or.length) {
    const t = [...new Set(or)].sort(
      (n, r) => Br(n) - Br(r)
    );
    if (or.length = 0, an) {
      an.push(...t);
      return;
    }
    for (an = t, Vn = 0; Vn < an.length; Vn++)
      an[Vn]();
    an = null, Vn = 0;
  }
}
const Br = (e) => e.id == null ? 1 / 0 : e.id, Og = (e, t) => {
  const n = Br(e) - Br(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function cf(e) {
  Vs = !1, Fr = !0, ze.sort(Og);
  try {
    for (Rt = 0; Rt < ze.length; Rt++) {
      const t = ze[Rt];
      t && t.active !== !1 && vn(t, null, 14);
    }
  } finally {
    Rt = 0, ze.length = 0, uf(), Fr = !1, Ll = null, (ze.length || or.length) && cf();
  }
}
function Fg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || Te;
  let i = n;
  const o = t.startsWith("update:"), s = o && t.slice(7);
  if (s && s in r) {
    const c = `${s === "modelValue" ? "model" : s}Modifiers`, { number: f, trim: d } = r[c] || Te;
    d && (i = n.map((h) => Pe(h) ? h.trim() : h)), f && (i = n.map(Jh));
  }
  let l, a = r[l = es(t)] || // also try camelCase event handler (#2249)
  r[l = es(Ze(t))];
  !a && o && (a = r[l = es(Ct(t))]), a && yt(
    a,
    e,
    6,
    i
  );
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, yt(
      u,
      e,
      6,
      i
    );
  }
}
function ff(e, t, n = !1) {
  const r = t.emitsCache, i = r.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let s = {}, l = !1;
  if (!se(e)) {
    const a = (u) => {
      const c = ff(u, t, !0);
      c && (l = !0, Ie(s, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (Le(e) && r.set(e, null), null) : (re(o) ? o.forEach((a) => s[a] = null) : Ie(s, o), Le(e) && r.set(e, s), s);
}
function Lo(e, t) {
  return !e || !xo(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), be(e, t[0].toLowerCase() + t.slice(1)) || be(e, Ct(t)) || be(e, t));
}
let qe = null, df = null;
function Zi(e) {
  const t = qe;
  return qe = e, df = e && e.type.__scopeId || null, t;
}
function de(e, t = qe, n) {
  if (!t || e._n)
    return e;
  const r = (...i) => {
    r._d && Wa(-1);
    const o = Zi(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Zi(o), r._d && Wa(1);
    }
    return s;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function rs(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: o,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: h,
    ctx: g,
    inheritAttrs: m
  } = e;
  let p, v;
  const b = Zi(e);
  try {
    if (n.shapeFlag & 4) {
      const y = i || r, C = y;
      p = Pt(
        c.call(
          C,
          y,
          f,
          o,
          h,
          d,
          g
        )
      ), v = a;
    } else {
      const y = t;
      p = Pt(
        y.length > 1 ? y(
          o,
          { attrs: a, slots: l, emit: u }
        ) : y(
          o,
          null
          /* we know it doesn't need it */
        )
      ), v = t.props ? a : Bg(a);
    }
  } catch (y) {
    Rr.length = 0, Eo(y, e, 1), p = w(Lt);
  }
  let k = p;
  if (v && m !== !1) {
    const y = Object.keys(v), { shapeFlag: C } = k;
    y.length && C & 7 && (s && y.some(hl) && (v = Dg(
      v,
      s
    )), k = yn(k, v));
  }
  return n.dirs && (k = yn(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), p = k, Zi(b), p;
}
const Bg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || xo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Dg = (e, t) => {
  const n = {};
  for (const r in e)
    (!hl(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Hg(e, t, n) {
  const { props: r, children: i, component: o } = e, { props: s, children: l, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Ia(r, s, u) : !!s;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (s[d] !== r[d] && !Lo(u, d))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === s ? !1 : r ? s ? Ia(r, s, u) : !0 : !!s;
  return !1;
}
function Ia(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (t[o] !== e[o] && !Lo(n, o))
      return !0;
  }
  return !1;
}
function zg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const hf = "components", jg = "directives", gf = Symbol.for("v-ndc");
function Wg(e) {
  return Pe(e) ? mf(hf, e, !1) || e : e || gf;
}
function Un(e) {
  return mf(jg, e);
}
function mf(e, t, n = !0, r = !1) {
  const i = qe || Fe;
  if (i) {
    const o = i.type;
    if (e === hf) {
      const l = Bm(
        o,
        !1
      );
      if (l && (l === t || l === Ze(t) || l === pr(Ze(t))))
        return o;
    }
    const s = (
      // local registration
      // check instance[type] first which is resolved for options API
      $a(i[e] || o[e], t) || // global registration
      $a(i.appContext[e], t)
    );
    return !s && r ? o : s;
  }
}
function $a(e, t) {
  return e && (e[t] || e[Ze(t)] || e[pr(Ze(t))]);
}
const Gg = (e) => e.__isSuspense;
function Ug(e, t) {
  t && t.pendingBranch ? re(e) ? t.effects.push(...e) : t.effects.push(e) : Ng(e);
}
const qg = Symbol.for("v-scx"), Yg = () => Be(qg);
function _n(e, t) {
  return Tl(e, null, t);
}
const bi = {};
function ae(e, t, n) {
  return Tl(e, t, n);
}
function Tl(e, t, {
  immediate: n,
  deep: r,
  flush: i,
  once: o,
  onTrack: s,
  onTrigger: l
} = Te) {
  if (t && o) {
    const T = t;
    t = (...E) => {
      T(...E), C();
    };
  }
  const a = Fe, u = (T) => r === !0 ? T : (
    // for deep: false, only traverse root-level properties
    An(T, r === !1 ? 1 : void 0)
  );
  let c, f = !1, d = !1;
  if ($e(e) ? (c = () => e.value, f = Xi(e)) : ir(e) ? (c = () => u(e), f = !0) : re(e) ? (d = !0, f = e.some((T) => ir(T) || Xi(T)), c = () => e.map((T) => {
    if ($e(T))
      return T.value;
    if (ir(T))
      return u(T);
    if (se(T))
      return vn(T, a, 2);
  })) : se(e) ? t ? c = () => vn(e, a, 2) : c = () => (h && h(), yt(
    e,
    a,
    3,
    [g]
  )) : c = pt, t && r) {
    const T = c;
    c = () => An(T());
  }
  let h, g = (T) => {
    h = k.onStop = () => {
      vn(T, a, 4), h = k.onStop = void 0;
    };
  }, m;
  if ($o)
    if (g = pt, t ? n && yt(t, a, 3, [
      c(),
      d ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const T = Yg();
      m = T.__watcherHandles || (T.__watcherHandles = []);
    } else
      return pt;
  let p = d ? new Array(e.length).fill(bi) : bi;
  const v = () => {
    if (!(!k.active || !k.dirty))
      if (t) {
        const T = k.run();
        (r || f || (d ? T.some((E, P) => pn(E, p[P])) : pn(T, p))) && (h && h(), yt(t, a, 3, [
          T,
          // pass undefined as the old value when it's changed for the first time
          p === bi ? void 0 : d && p[0] === bi ? [] : p,
          g
        ]), p = T);
      } else
        k.run();
  };
  v.allowRecurse = !!t;
  let b;
  i === "sync" ? b = v : i === "post" ? b = () => et(v, a && a.suspense) : (v.pre = !0, a && (v.id = a.uid), b = () => Ml(v));
  const k = new wl(c, pt, b), y = sg(), C = () => {
    k.stop(), y && gl(y.effects, k);
  };
  return t ? n ? v() : p = k.run() : i === "post" ? et(
    k.run.bind(k),
    a && a.suspense
  ) : k.run(), m && m.push(C), C;
}
function Kg(e, t, n) {
  const r = this.proxy, i = Pe(e) ? e.includes(".") ? vf(r, e) : () => r[e] : e.bind(r, r);
  let o;
  se(t) ? o = t : (o = t.handler, n = t);
  const s = ni(this), l = Tl(i, o.bind(r), n);
  return s(), l;
}
function vf(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function An(e, t, n = 0, r) {
  if (!Le(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(e))
    return e;
  if (r.add(e), $e(e))
    An(e.value, t, n, r);
  else if (re(e))
    for (let i = 0; i < e.length; i++)
      An(e[i], t, n, r);
  else if (Pc(e) || rr(e))
    e.forEach((i) => {
      An(i, t, n, r);
    });
  else if (Oc(e))
    for (const i in e)
      An(e[i], t, n, r);
  return e;
}
function ft(e, t) {
  if (qe === null)
    return e;
  const n = Ao(qe) || qe.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, s, l, a = Te] = t[i];
    o && (se(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && An(s), r.push({
      dir: o,
      instance: n,
      value: s,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function Sn(e, t, n, r) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    o && (l.oldValue = o[s].value);
    let a = l.dir[r];
    a && (Wn(), yt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Gn());
  }
}
const un = Symbol("_leaveCb"), _i = Symbol("_enterCb");
function pf() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return xn(() => {
    e.isMounted = !0;
  }), Jt(() => {
    e.isUnmounting = !0;
  }), e;
}
const mt = [Function, Array], yf = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: mt,
  onEnter: mt,
  onAfterEnter: mt,
  onEnterCancelled: mt,
  // leave
  onBeforeLeave: mt,
  onLeave: mt,
  onAfterLeave: mt,
  onLeaveCancelled: mt,
  // appear
  onBeforeAppear: mt,
  onAppear: mt,
  onAfterAppear: mt,
  onAppearCancelled: mt
}, Xg = {
  name: "BaseTransition",
  props: yf,
  setup(e, { slots: t }) {
    const n = Ol(), r = pf();
    return () => {
      const i = t.default && Vl(t.default(), !0);
      if (!i || !i.length)
        return;
      let o = i[0];
      if (i.length > 1) {
        for (const d of i)
          if (d.type !== Lt) {
            o = d;
            break;
          }
      }
      const s = ve(e), { mode: l } = s;
      if (r.isLeaving)
        return is(o);
      const a = Aa(o);
      if (!a)
        return is(o);
      const u = Dr(
        a,
        s,
        r,
        n
      );
      Hr(a, u);
      const c = n.subTree, f = c && Aa(c);
      if (f && f.type !== Lt && !In(a, f)) {
        const d = Dr(
          f,
          s,
          r,
          n
        );
        if (Hr(f, d), l === "out-in")
          return r.isLeaving = !0, d.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, is(o);
        l === "in-out" && a.type !== Lt && (d.delayLeave = (h, g, m) => {
          const p = wf(
            r,
            f
          );
          p[String(f.key)] = f, h[un] = () => {
            g(), h[un] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, Zg = Xg;
function wf(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Dr(e, t, n, r) {
  const {
    appear: i,
    mode: o,
    persisted: s = !1,
    onBeforeEnter: l,
    onEnter: a,
    onAfterEnter: u,
    onEnterCancelled: c,
    onBeforeLeave: f,
    onLeave: d,
    onAfterLeave: h,
    onLeaveCancelled: g,
    onBeforeAppear: m,
    onAppear: p,
    onAfterAppear: v,
    onAppearCancelled: b
  } = t, k = String(e.key), y = wf(n, e), C = (P, O) => {
    P && yt(
      P,
      r,
      9,
      O
    );
  }, T = (P, O) => {
    const F = O[1];
    C(P, O), re(P) ? P.every((j) => j.length <= 1) && F() : P.length <= 1 && F();
  }, E = {
    mode: o,
    persisted: s,
    beforeEnter(P) {
      let O = l;
      if (!n.isMounted)
        if (i)
          O = m || l;
        else
          return;
      P[un] && P[un](
        !0
        /* cancelled */
      );
      const F = y[k];
      F && In(e, F) && F.el[un] && F.el[un](), C(O, [P]);
    },
    enter(P) {
      let O = a, F = u, j = c;
      if (!n.isMounted)
        if (i)
          O = p || a, F = v || u, j = b || c;
        else
          return;
      let R = !1;
      const N = P[_i] = (_) => {
        R || (R = !0, _ ? C(j, [P]) : C(F, [P]), E.delayedLeave && E.delayedLeave(), P[_i] = void 0);
      };
      O ? T(O, [P, N]) : N();
    },
    leave(P, O) {
      const F = String(e.key);
      if (P[_i] && P[_i](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return O();
      C(f, [P]);
      let j = !1;
      const R = P[un] = (N) => {
        j || (j = !0, O(), N ? C(g, [P]) : C(h, [P]), P[un] = void 0, y[F] === e && delete y[F]);
      };
      y[F] = e, d ? T(d, [P, R]) : R();
    },
    clone(P) {
      return Dr(P, t, n, r);
    }
  };
  return E;
}
function is(e) {
  if (Mo(e))
    return e = yn(e), e.children = null, e;
}
function Aa(e) {
  return Mo(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Hr(e, t) {
  e.shapeFlag & 6 && e.component ? Hr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Vl(e, t = !1, n) {
  let r = [], i = 0;
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : o);
    s.type === Se ? (s.patchFlag & 128 && i++, r = r.concat(
      Vl(s.children, t, l)
    )) : (t || s.type !== Lt) && r.push(l != null ? yn(s, { key: l }) : s);
  }
  if (i > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
  return se(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ie({ name: e.name }, t, { setup: e })
  ) : e;
}
const Ni = (e) => !!e.type.__asyncLoader, Mo = (e) => e.type.__isKeepAlive;
function Jg(e, t) {
  bf(e, "a", t);
}
function Qg(e, t) {
  bf(e, "da", t);
}
function bf(e, t, n = Fe) {
  const r = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (To(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Mo(i.parent.vnode) && em(r, t, n, i), i = i.parent;
  }
}
function em(e, t, n, r) {
  const i = To(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  $l(() => {
    gl(r[t], i);
  }, n);
}
function To(e, t, n = Fe, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...s) => {
      if (n.isUnmounted)
        return;
      Wn();
      const l = ni(n), a = yt(t, n, e, s);
      return l(), Gn(), a;
    });
    return r ? i.unshift(o) : i.push(o), o;
  }
}
const Zt = (e) => (t, n = Fe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!$o || e === "sp") && To(e, (...r) => t(...r), n)
), Il = Zt("bm"), xn = Zt("m"), tm = Zt("bu"), _f = Zt("u"), Jt = Zt("bum"), $l = Zt("um"), nm = Zt("sp"), rm = Zt(
  "rtg"
), im = Zt(
  "rtc"
);
function om(e, t = Fe) {
  To("ec", e, t);
}
function sm(e, t, n, r) {
  let i;
  const o = n && n[r];
  if (re(e) || Pe(e)) {
    i = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      i[s] = t(e[s], s, void 0, o && o[s]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let s = 0; s < e; s++)
      i[s] = t(s + 1, s, void 0, o && o[s]);
  } else if (Le(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (s, l) => t(s, l, void 0, o && o[l])
      );
    else {
      const s = Object.keys(e);
      i = new Array(s.length);
      for (let l = 0, a = s.length; l < a; l++) {
        const u = s[l];
        i[l] = t(e[u], u, l, o && o[l]);
      }
    }
  else
    i = [];
  return n && (n[r] = i), i;
}
const Is = (e) => e ? Af(e) ? Ao(e) || e.proxy : Is(e.parent) : null, $r = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ie(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Is(e.parent),
    $root: (e) => Is(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Al(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ml(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = He.bind(e.proxy)),
    $watch: (e) => Kg.bind(e)
  })
), os = (e, t) => e !== Te && !e.__isScriptSetup && be(e, t), lm = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: l, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const h = s[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return r[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (os(r, t))
          return s[t] = 1, r[t];
        if (i !== Te && be(i, t))
          return s[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && be(u, t)
        )
          return s[t] = 3, o[t];
        if (n !== Te && be(n, t))
          return s[t] = 4, n[t];
        $s && (s[t] = 0);
      }
    }
    const c = $r[t];
    let f, d;
    if (c)
      return t === "$attrs" && nt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Te && be(n, t))
      return s[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, be(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: o } = e;
    return os(i, t) ? (i[t] = n, !0) : r !== Te && be(r, t) ? (r[t] = n, !0) : be(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: o }
  }, s) {
    let l;
    return !!n[s] || e !== Te && be(e, s) || os(t, s) || (l = o[0]) && be(l, s) || be(r, s) || be($r, s) || be(i.config.globalProperties, s);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : be(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Pa(e) {
  return re(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let $s = !0;
function am(e) {
  const t = Al(e), n = e.proxy, r = e.ctx;
  $s = !1, t.beforeCreate && Ra(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: s,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: h,
    updated: g,
    activated: m,
    deactivated: p,
    beforeDestroy: v,
    beforeUnmount: b,
    destroyed: k,
    unmounted: y,
    render: C,
    renderTracked: T,
    renderTriggered: E,
    errorCaptured: P,
    serverPrefetch: O,
    // public API
    expose: F,
    inheritAttrs: j,
    // assets
    components: R,
    directives: N,
    filters: _
  } = t;
  if (u && um(u, r, null), s)
    for (const H in s) {
      const z = s[H];
      se(z) && (r[H] = z.bind(n));
    }
  if (i) {
    const H = i.call(n, n);
    Le(H) && (e.data = Mt(H));
  }
  if ($s = !0, o)
    for (const H in o) {
      const z = o[H], K = se(z) ? z.bind(n, n) : se(z.get) ? z.get.bind(n, n) : pt, X = !se(z) && se(z.set) ? z.set.bind(n) : pt, q = A({
        get: K,
        set: X
      });
      Object.defineProperty(r, H, {
        enumerable: !0,
        configurable: !0,
        get: () => q.value,
        set: (J) => q.value = J
      });
    }
  if (l)
    for (const H in l)
      xf(l[H], r, n, H);
  if (a) {
    const H = se(a) ? a.call(n) : a;
    Reflect.ownKeys(H).forEach((z) => {
      Bt(z, H[z]);
    });
  }
  c && Ra(c, e, "c");
  function V(H, z) {
    re(z) ? z.forEach((K) => H(K.bind(n))) : z && H(z.bind(n));
  }
  if (V(Il, f), V(xn, d), V(tm, h), V(_f, g), V(Jg, m), V(Qg, p), V(om, P), V(im, T), V(rm, E), V(Jt, b), V($l, y), V(nm, O), re(F))
    if (F.length) {
      const H = e.exposed || (e.exposed = {});
      F.forEach((z) => {
        Object.defineProperty(H, z, {
          get: () => n[z],
          set: (K) => n[z] = K
        });
      });
    } else
      e.exposed || (e.exposed = {});
  C && e.render === pt && (e.render = C), j != null && (e.inheritAttrs = j), R && (e.components = R), N && (e.directives = N);
}
function um(e, t, n = pt) {
  re(e) && (e = As(e));
  for (const r in e) {
    const i = e[r];
    let o;
    Le(i) ? "default" in i ? o = Be(
      i.from || r,
      i.default,
      !0
    ) : o = Be(i.from || r) : o = Be(i), $e(o) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (s) => o.value = s
    }) : t[r] = o;
  }
}
function Ra(e, t, n) {
  yt(
    re(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function xf(e, t, n, r) {
  const i = r.includes(".") ? vf(n, r) : () => n[r];
  if (Pe(e)) {
    const o = t[e];
    se(o) && ae(i, o);
  } else if (se(e))
    ae(i, e.bind(n));
  else if (Le(e))
    if (re(e))
      e.forEach((o) => xf(o, t, n, r));
    else {
      const o = se(e.handler) ? e.handler.bind(n) : t[e.handler];
      se(o) && ae(i, o, e);
    }
}
function Al(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: s }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = t : (a = {}, i.length && i.forEach(
    (u) => Ji(a, u, s, !0)
  ), Ji(a, t, s)), Le(t) && o.set(t, a), a;
}
function Ji(e, t, n, r = !1) {
  const { mixins: i, extends: o } = t;
  o && Ji(e, o, n, !0), i && i.forEach(
    (s) => Ji(e, s, n, !0)
  );
  for (const s in t)
    if (!(r && s === "expose")) {
      const l = cm[s] || n && n[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const cm = {
  data: Na,
  props: Oa,
  emits: Oa,
  // objects
  methods: Mr,
  computed: Mr,
  // lifecycle
  beforeCreate: We,
  created: We,
  beforeMount: We,
  mounted: We,
  beforeUpdate: We,
  updated: We,
  beforeDestroy: We,
  beforeUnmount: We,
  destroyed: We,
  unmounted: We,
  activated: We,
  deactivated: We,
  errorCaptured: We,
  serverPrefetch: We,
  // assets
  components: Mr,
  directives: Mr,
  // watch
  watch: dm,
  // provide / inject
  provide: Na,
  inject: fm
};
function Na(e, t) {
  return t ? e ? function() {
    return Ie(
      se(e) ? e.call(this, this) : e,
      se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function fm(e, t) {
  return Mr(As(e), As(t));
}
function As(e) {
  if (re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function We(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mr(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Oa(e, t) {
  return e ? re(e) && re(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(
    /* @__PURE__ */ Object.create(null),
    Pa(e),
    Pa(t ?? {})
  ) : t;
}
function dm(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = We(e[r], t[r]);
  return n;
}
function Cf() {
  return {
    app: null,
    config: {
      isNativeTag: qh,
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
let hm = 0;
function gm(e, t) {
  return function(r, i = null) {
    se(r) || (r = Ie({}, r)), i != null && !Le(i) && (i = null);
    const o = Cf(), s = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = o.app = {
      _uid: hm++,
      _component: r,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Hm,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return s.has(u) || (u && se(u.install) ? (s.add(u), u.install(a, ...c)) : se(u) && (s.add(u), u(a, ...c))), a;
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
      mount(u, c, f) {
        if (!l) {
          const d = w(r, i);
          return d.appContext = o, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && t ? t(d, u) : e(d, u, f), l = !0, a._container = u, u.__vue_app__ = a, Ao(d.component) || d.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Ar;
        Ar = a;
        try {
          return u();
        } finally {
          Ar = c;
        }
      }
    };
    return a;
  };
}
let Ar = null;
function Bt(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const r = Fe.parent && Fe.parent.provides;
    r === n && (n = Fe.provides = Object.create(r)), n[e] = t;
  }
}
function Be(e, t, n = !1) {
  const r = Fe || qe;
  if (r || Ar) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Ar._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && se(t) ? t.call(r && r.proxy) : t;
  }
}
function mm(e, t, n, r = !1) {
  const i = {}, o = {};
  Yi(o, Io, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Sf(e, t, i, o);
  for (const s in e.propsOptions[0])
    s in i || (i[s] = void 0);
  n ? e.props = r ? i : Lg(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function vm(e, t, n, r) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: s }
  } = e, l = ve(i), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (Lo(e.emitsOptions, d))
          continue;
        const h = t[d];
        if (a)
          if (be(o, d))
            h !== o[d] && (o[d] = h, u = !0);
          else {
            const g = Ze(d);
            i[g] = Ps(
              a,
              l,
              g,
              h,
              e,
              !1
            );
          }
        else
          h !== o[d] && (o[d] = h, u = !0);
      }
    }
  } else {
    Sf(e, t, i, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !be(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Ct(f)) === f || !be(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = Ps(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete i[f]);
    if (o !== l)
      for (const f in o)
        (!t || !be(t, f)) && (delete o[f], u = !0);
  }
  u && Ut(e, "set", "$attrs");
}
function Sf(e, t, n, r) {
  const [i, o] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let a in t) {
      if (Ir(a))
        continue;
      const u = t[a];
      let c;
      i && be(i, c = Ze(a)) ? !o || !o.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Lo(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, s = !0);
    }
  if (o) {
    const a = ve(n), u = l || Te;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = Ps(
        i,
        a,
        f,
        u[f],
        e,
        !be(u, f)
      );
    }
  }
  return s;
}
function Ps(e, t, n, r, i, o) {
  const s = e[n];
  if (s != null) {
    const l = be(s, "default");
    if (l && r === void 0) {
      const a = s.default;
      if (s.type !== Function && !s.skipFactory && se(a)) {
        const { propsDefaults: u } = i;
        if (n in u)
          r = u[n];
        else {
          const c = ni(i);
          r = u[n] = a.call(
            null,
            t
          ), c();
        }
      } else
        r = a;
    }
    s[
      0
      /* shouldCast */
    ] && (o && !l ? r = !1 : s[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Ct(n)) && (r = !0));
  }
  return r;
}
function kf(e, t, n = !1) {
  const r = t.propsCache, i = r.get(e);
  if (i)
    return i;
  const o = e.props, s = {}, l = [];
  let a = !1;
  if (!se(e)) {
    const c = (f) => {
      a = !0;
      const [d, h] = kf(f, t, !0);
      Ie(s, d), h && l.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Le(e) && r.set(e, nr), nr;
  if (re(o))
    for (let c = 0; c < o.length; c++) {
      const f = Ze(o[c]);
      Fa(f) && (s[f] = Te);
    }
  else if (o)
    for (const c in o) {
      const f = Ze(c);
      if (Fa(f)) {
        const d = o[c], h = s[f] = re(d) || se(d) ? { type: d } : Ie({}, d);
        if (h) {
          const g = Ha(Boolean, h.type), m = Ha(String, h.type);
          h[
            0
            /* shouldCast */
          ] = g > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || g < m, (g > -1 || be(h, "default")) && l.push(f);
        }
      }
    }
  const u = [s, l];
  return Le(e) && r.set(e, u), u;
}
function Fa(e) {
  return e[0] !== "$" && !Ir(e);
}
function Ba(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Da(e, t) {
  return Ba(e) === Ba(t);
}
function Ha(e, t) {
  return re(t) ? t.findIndex((n) => Da(n, e)) : se(t) && Da(t, e) ? 0 : -1;
}
const Ef = (e) => e[0] === "_" || e === "$stable", Pl = (e) => re(e) ? e.map(Pt) : [Pt(e)], pm = (e, t, n) => {
  if (t._n)
    return t;
  const r = de((...i) => Pl(t(...i)), n);
  return r._c = !1, r;
}, Lf = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if (Ef(i))
      continue;
    const o = e[i];
    if (se(o))
      t[i] = pm(i, o, r);
    else if (o != null) {
      const s = Pl(o);
      t[i] = () => s;
    }
  }
}, Mf = (e, t) => {
  const n = Pl(t);
  e.slots.default = () => n;
}, ym = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = ve(t), Yi(t, "_", n)) : Lf(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Mf(e, t);
  Yi(e.slots, Io, 1);
}, wm = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let o = !0, s = Te;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : (Ie(i, t), !n && l === 1 && delete i._) : (o = !t.$stable, Lf(t, i)), s = t;
  } else
    t && (Mf(e, t), s = { default: 1 });
  if (o)
    for (const l in i)
      !Ef(l) && s[l] == null && delete i[l];
};
function Rs(e, t, n, r, i = !1) {
  if (re(e)) {
    e.forEach(
      (d, h) => Rs(
        d,
        t && (re(t) ? t[h] : t),
        n,
        r,
        i
      )
    );
    return;
  }
  if (Ni(r) && !i)
    return;
  const o = r.shapeFlag & 4 ? Ao(r.component) || r.component.proxy : r.el, s = i ? null : o, { i: l, r: a } = e, u = t && t.r, c = l.refs === Te ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (Pe(u) ? (c[u] = null, be(f, u) && (f[u] = null)) : $e(u) && (u.value = null)), se(a))
    vn(a, l, 12, [s, c]);
  else {
    const d = Pe(a), h = $e(a);
    if (d || h) {
      const g = () => {
        if (e.f) {
          const m = d ? be(f, a) ? f[a] : c[a] : a.value;
          i ? re(m) && gl(m, o) : re(m) ? m.includes(o) || m.push(o) : d ? (c[a] = [o], be(f, a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else
          d ? (c[a] = s, be(f, a) && (f[a] = s)) : h && (a.value = s, e.k && (c[e.k] = s));
      };
      s ? (g.id = -1, et(g, n)) : g();
    }
  }
}
const et = Ug;
function bm(e) {
  return _m(e);
}
function _m(e, t) {
  const n = Fc();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: o,
    createElement: s,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: f,
    nextSibling: d,
    setScopeId: h = pt,
    insertStaticContent: g
  } = e, m = (x, L, D, W = null, U = null, Y = null, Z = void 0, S = null, I = !!L.dynamicChildren) => {
    if (x === L)
      return;
    x && !In(x, L) && (W = Ce(x), J(x, U, Y, !0), x = null), L.patchFlag === -2 && (I = !1, L.dynamicChildren = null);
    const { type: M, ref: $, shapeFlag: G } = L;
    switch (M) {
      case ti:
        p(x, L, D, W);
        break;
      case Lt:
        v(x, L, D, W);
        break;
      case ls:
        x == null && b(L, D, W, Z);
        break;
      case Se:
        R(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I
        );
        break;
      default:
        G & 1 ? C(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I
        ) : G & 6 ? N(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I
        ) : (G & 64 || G & 128) && M.process(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I,
          It
        );
    }
    $ != null && U && Rs($, x && x.ref, Y, L || x, !L);
  }, p = (x, L, D, W) => {
    if (x == null)
      r(
        L.el = l(L.children),
        D,
        W
      );
    else {
      const U = L.el = x.el;
      L.children !== x.children && u(U, L.children);
    }
  }, v = (x, L, D, W) => {
    x == null ? r(
      L.el = a(L.children || ""),
      D,
      W
    ) : L.el = x.el;
  }, b = (x, L, D, W) => {
    [x.el, x.anchor] = g(
      x.children,
      L,
      D,
      W,
      x.el,
      x.anchor
    );
  }, k = ({ el: x, anchor: L }, D, W) => {
    let U;
    for (; x && x !== L; )
      U = d(x), r(x, D, W), x = U;
    r(L, D, W);
  }, y = ({ el: x, anchor: L }) => {
    let D;
    for (; x && x !== L; )
      D = d(x), i(x), x = D;
    i(L);
  }, C = (x, L, D, W, U, Y, Z, S, I) => {
    L.type === "svg" ? Z = "svg" : L.type === "math" && (Z = "mathml"), x == null ? T(
      L,
      D,
      W,
      U,
      Y,
      Z,
      S,
      I
    ) : O(
      x,
      L,
      U,
      Y,
      Z,
      S,
      I
    );
  }, T = (x, L, D, W, U, Y, Z, S) => {
    let I, M;
    const { props: $, shapeFlag: G, transition: Q, dirs: ne } = x;
    if (I = x.el = s(
      x.type,
      Y,
      $ && $.is,
      $
    ), G & 8 ? c(I, x.children) : G & 16 && P(
      x.children,
      I,
      null,
      W,
      U,
      ss(x, Y),
      Z,
      S
    ), ne && Sn(x, null, W, "created"), E(I, x, x.scopeId, Z, W), $) {
      for (const _e in $)
        _e !== "value" && !Ir(_e) && o(
          I,
          _e,
          null,
          $[_e],
          Y,
          x.children,
          W,
          U,
          he
        );
      "value" in $ && o(I, "value", null, $.value, Y), (M = $.onVnodeBeforeMount) && At(M, W, x);
    }
    ne && Sn(x, null, W, "beforeMount");
    const ce = xm(U, Q);
    ce && Q.beforeEnter(I), r(I, L, D), ((M = $ && $.onVnodeMounted) || ce || ne) && et(() => {
      M && At(M, W, x), ce && Q.enter(I), ne && Sn(x, null, W, "mounted");
    }, U);
  }, E = (x, L, D, W, U) => {
    if (D && h(x, D), W)
      for (let Y = 0; Y < W.length; Y++)
        h(x, W[Y]);
    if (U) {
      let Y = U.subTree;
      if (L === Y) {
        const Z = U.vnode;
        E(
          x,
          Z,
          Z.scopeId,
          Z.slotScopeIds,
          U.parent
        );
      }
    }
  }, P = (x, L, D, W, U, Y, Z, S, I = 0) => {
    for (let M = I; M < x.length; M++) {
      const $ = x[M] = S ? cn(x[M]) : Pt(x[M]);
      m(
        null,
        $,
        L,
        D,
        W,
        U,
        Y,
        Z,
        S
      );
    }
  }, O = (x, L, D, W, U, Y, Z) => {
    const S = L.el = x.el;
    let { patchFlag: I, dynamicChildren: M, dirs: $ } = L;
    I |= x.patchFlag & 16;
    const G = x.props || Te, Q = L.props || Te;
    let ne;
    if (D && kn(D, !1), (ne = Q.onVnodeBeforeUpdate) && At(ne, D, L, x), $ && Sn(L, x, D, "beforeUpdate"), D && kn(D, !0), M ? F(
      x.dynamicChildren,
      M,
      S,
      D,
      W,
      ss(L, U),
      Y
    ) : Z || z(
      x,
      L,
      S,
      null,
      D,
      W,
      ss(L, U),
      Y,
      !1
    ), I > 0) {
      if (I & 16)
        j(
          S,
          L,
          G,
          Q,
          D,
          W,
          U
        );
      else if (I & 2 && G.class !== Q.class && o(S, "class", null, Q.class, U), I & 4 && o(S, "style", G.style, Q.style, U), I & 8) {
        const ce = L.dynamicProps;
        for (let _e = 0; _e < ce.length; _e++) {
          const Ee = ce[_e], Ne = G[Ee], bt = Q[Ee];
          (bt !== Ne || Ee === "value") && o(
            S,
            Ee,
            Ne,
            bt,
            U,
            x.children,
            D,
            W,
            he
          );
        }
      }
      I & 1 && x.children !== L.children && c(S, L.children);
    } else
      !Z && M == null && j(
        S,
        L,
        G,
        Q,
        D,
        W,
        U
      );
    ((ne = Q.onVnodeUpdated) || $) && et(() => {
      ne && At(ne, D, L, x), $ && Sn(L, x, D, "updated");
    }, W);
  }, F = (x, L, D, W, U, Y, Z) => {
    for (let S = 0; S < L.length; S++) {
      const I = x[S], M = L[S], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        I.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (I.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(I, M) || // - In the case of a component, it could contain anything.
        I.shapeFlag & 70) ? f(I.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          D
        )
      );
      m(
        I,
        M,
        $,
        null,
        W,
        U,
        Y,
        Z,
        !0
      );
    }
  }, j = (x, L, D, W, U, Y, Z) => {
    if (D !== W) {
      if (D !== Te)
        for (const S in D)
          !Ir(S) && !(S in W) && o(
            x,
            S,
            D[S],
            null,
            Z,
            L.children,
            U,
            Y,
            he
          );
      for (const S in W) {
        if (Ir(S))
          continue;
        const I = W[S], M = D[S];
        I !== M && S !== "value" && o(
          x,
          S,
          M,
          I,
          Z,
          L.children,
          U,
          Y,
          he
        );
      }
      "value" in W && o(x, "value", D.value, W.value, Z);
    }
  }, R = (x, L, D, W, U, Y, Z, S, I) => {
    const M = L.el = x ? x.el : l(""), $ = L.anchor = x ? x.anchor : l("");
    let { patchFlag: G, dynamicChildren: Q, slotScopeIds: ne } = L;
    ne && (S = S ? S.concat(ne) : ne), x == null ? (r(M, D, W), r($, D, W), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      L.children || [],
      D,
      $,
      U,
      Y,
      Z,
      S,
      I
    )) : G > 0 && G & 64 && Q && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    x.dynamicChildren ? (F(
      x.dynamicChildren,
      Q,
      D,
      U,
      Y,
      Z,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (L.key != null || U && L === U.subTree) && Rl(
      x,
      L,
      !0
      /* shallow */
    )) : z(
      x,
      L,
      D,
      $,
      U,
      Y,
      Z,
      S,
      I
    );
  }, N = (x, L, D, W, U, Y, Z, S, I) => {
    L.slotScopeIds = S, x == null ? L.shapeFlag & 512 ? U.ctx.activate(
      L,
      D,
      W,
      Z,
      I
    ) : _(
      L,
      D,
      W,
      U,
      Y,
      Z,
      I
    ) : B(x, L, I);
  }, _ = (x, L, D, W, U, Y, Z) => {
    const S = x.component = Pm(
      x,
      W,
      U
    );
    if (Mo(x) && (S.ctx.renderer = It), Rm(S), S.asyncDep) {
      if (U && U.registerDep(S, V), !x.el) {
        const I = S.subTree = w(Lt);
        v(null, I, L, D);
      }
    } else
      V(
        S,
        x,
        L,
        D,
        U,
        Y,
        Z
      );
  }, B = (x, L, D) => {
    const W = L.component = x.component;
    if (Hg(x, L, D))
      if (W.asyncDep && !W.asyncResolved) {
        H(W, L, D);
        return;
      } else
        W.next = L, Rg(W.update), W.effect.dirty = !0, W.update();
    else
      L.el = x.el, W.vnode = L;
  }, V = (x, L, D, W, U, Y, Z) => {
    const S = () => {
      if (x.isMounted) {
        let { next: $, bu: G, u: Q, parent: ne, vnode: ce } = x;
        {
          const Kn = Tf(x);
          if (Kn) {
            $ && ($.el = ce.el, H(x, $, Z)), Kn.asyncDep.then(() => {
              x.isUnmounted || S();
            });
            return;
          }
        }
        let _e = $, Ee;
        kn(x, !1), $ ? ($.el = ce.el, H(x, $, Z)) : $ = ce, G && ts(G), (Ee = $.props && $.props.onVnodeBeforeUpdate) && At(Ee, ne, $, ce), kn(x, !0);
        const Ne = rs(x), bt = x.subTree;
        x.subTree = Ne, m(
          bt,
          Ne,
          // parent may have changed if it's in a teleport
          f(bt.el),
          // anchor may have changed if it's in a fragment
          Ce(bt),
          x,
          U,
          Y
        ), $.el = Ne.el, _e === null && zg(x, Ne.el), Q && et(Q, U), (Ee = $.props && $.props.onVnodeUpdated) && et(
          () => At(Ee, ne, $, ce),
          U
        );
      } else {
        let $;
        const { el: G, props: Q } = L, { bm: ne, m: ce, parent: _e } = x, Ee = Ni(L);
        if (kn(x, !1), ne && ts(ne), !Ee && ($ = Q && Q.onVnodeBeforeMount) && At($, _e, L), kn(x, !0), G && rn) {
          const Ne = () => {
            x.subTree = rs(x), rn(
              G,
              x.subTree,
              x,
              U,
              null
            );
          };
          Ee ? L.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !x.isUnmounted && Ne()
          ) : Ne();
        } else {
          const Ne = x.subTree = rs(x);
          m(
            null,
            Ne,
            D,
            W,
            x,
            U,
            Y
          ), L.el = Ne.el;
        }
        if (ce && et(ce, U), !Ee && ($ = Q && Q.onVnodeMounted)) {
          const Ne = L;
          et(
            () => At($, _e, Ne),
            U
          );
        }
        (L.shapeFlag & 256 || _e && Ni(_e.vnode) && _e.vnode.shapeFlag & 256) && x.a && et(x.a, U), x.isMounted = !0, L = D = W = null;
      }
    }, I = x.effect = new wl(
      S,
      pt,
      () => Ml(M),
      x.scope
      // track it in component's effect scope
    ), M = x.update = () => {
      I.dirty && I.run();
    };
    M.id = x.uid, kn(x, !0), M();
  }, H = (x, L, D) => {
    L.component = x;
    const W = x.vnode.props;
    x.vnode = L, x.next = null, vm(x, L.props, W, D), wm(x, L.children, D), Wn(), Va(x), Gn();
  }, z = (x, L, D, W, U, Y, Z, S, I = !1) => {
    const M = x && x.children, $ = x ? x.shapeFlag : 0, G = L.children, { patchFlag: Q, shapeFlag: ne } = L;
    if (Q > 0) {
      if (Q & 128) {
        X(
          M,
          G,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I
        );
        return;
      } else if (Q & 256) {
        K(
          M,
          G,
          D,
          W,
          U,
          Y,
          Z,
          S,
          I
        );
        return;
      }
    }
    ne & 8 ? ($ & 16 && he(M, U, Y), G !== M && c(D, G)) : $ & 16 ? ne & 16 ? X(
      M,
      G,
      D,
      W,
      U,
      Y,
      Z,
      S,
      I
    ) : he(M, U, Y, !0) : ($ & 8 && c(D, ""), ne & 16 && P(
      G,
      D,
      W,
      U,
      Y,
      Z,
      S,
      I
    ));
  }, K = (x, L, D, W, U, Y, Z, S, I) => {
    x = x || nr, L = L || nr;
    const M = x.length, $ = L.length, G = Math.min(M, $);
    let Q;
    for (Q = 0; Q < G; Q++) {
      const ne = L[Q] = I ? cn(L[Q]) : Pt(L[Q]);
      m(
        x[Q],
        ne,
        D,
        null,
        U,
        Y,
        Z,
        S,
        I
      );
    }
    M > $ ? he(
      x,
      U,
      Y,
      !0,
      !1,
      G
    ) : P(
      L,
      D,
      W,
      U,
      Y,
      Z,
      S,
      I,
      G
    );
  }, X = (x, L, D, W, U, Y, Z, S, I) => {
    let M = 0;
    const $ = L.length;
    let G = x.length - 1, Q = $ - 1;
    for (; M <= G && M <= Q; ) {
      const ne = x[M], ce = L[M] = I ? cn(L[M]) : Pt(L[M]);
      if (In(ne, ce))
        m(
          ne,
          ce,
          D,
          null,
          U,
          Y,
          Z,
          S,
          I
        );
      else
        break;
      M++;
    }
    for (; M <= G && M <= Q; ) {
      const ne = x[G], ce = L[Q] = I ? cn(L[Q]) : Pt(L[Q]);
      if (In(ne, ce))
        m(
          ne,
          ce,
          D,
          null,
          U,
          Y,
          Z,
          S,
          I
        );
      else
        break;
      G--, Q--;
    }
    if (M > G) {
      if (M <= Q) {
        const ne = Q + 1, ce = ne < $ ? L[ne].el : W;
        for (; M <= Q; )
          m(
            null,
            L[M] = I ? cn(L[M]) : Pt(L[M]),
            D,
            ce,
            U,
            Y,
            Z,
            S,
            I
          ), M++;
      }
    } else if (M > Q)
      for (; M <= G; )
        J(x[M], U, Y, !0), M++;
    else {
      const ne = M, ce = M, _e = /* @__PURE__ */ new Map();
      for (M = ce; M <= Q; M++) {
        const ot = L[M] = I ? cn(L[M]) : Pt(L[M]);
        ot.key != null && _e.set(ot.key, M);
      }
      let Ee, Ne = 0;
      const bt = Q - ce + 1;
      let Kn = !1, wa = 0;
      const xr = new Array(bt);
      for (M = 0; M < bt; M++)
        xr[M] = 0;
      for (M = ne; M <= G; M++) {
        const ot = x[M];
        if (Ne >= bt) {
          J(ot, U, Y, !0);
          continue;
        }
        let $t;
        if (ot.key != null)
          $t = _e.get(ot.key);
        else
          for (Ee = ce; Ee <= Q; Ee++)
            if (xr[Ee - ce] === 0 && In(ot, L[Ee])) {
              $t = Ee;
              break;
            }
        $t === void 0 ? J(ot, U, Y, !0) : (xr[$t - ce] = M + 1, $t >= wa ? wa = $t : Kn = !0, m(
          ot,
          L[$t],
          D,
          null,
          U,
          Y,
          Z,
          S,
          I
        ), Ne++);
      }
      const ba = Kn ? Cm(xr) : nr;
      for (Ee = ba.length - 1, M = bt - 1; M >= 0; M--) {
        const ot = ce + M, $t = L[ot], _a = ot + 1 < $ ? L[ot + 1].el : W;
        xr[M] === 0 ? m(
          null,
          $t,
          D,
          _a,
          U,
          Y,
          Z,
          S,
          I
        ) : Kn && (Ee < 0 || M !== ba[Ee] ? q($t, D, _a, 2) : Ee--);
      }
    }
  }, q = (x, L, D, W, U = null) => {
    const { el: Y, type: Z, transition: S, children: I, shapeFlag: M } = x;
    if (M & 6) {
      q(x.component.subTree, L, D, W);
      return;
    }
    if (M & 128) {
      x.suspense.move(L, D, W);
      return;
    }
    if (M & 64) {
      Z.move(x, L, D, It);
      return;
    }
    if (Z === Se) {
      r(Y, L, D);
      for (let G = 0; G < I.length; G++)
        q(I[G], L, D, W);
      r(x.anchor, L, D);
      return;
    }
    if (Z === ls) {
      k(x, L, D);
      return;
    }
    if (W !== 2 && M & 1 && S)
      if (W === 0)
        S.beforeEnter(Y), r(Y, L, D), et(() => S.enter(Y), U);
      else {
        const { leave: G, delayLeave: Q, afterLeave: ne } = S, ce = () => r(Y, L, D), _e = () => {
          G(Y, () => {
            ce(), ne && ne();
          });
        };
        Q ? Q(Y, ce, _e) : _e();
      }
    else
      r(Y, L, D);
  }, J = (x, L, D, W = !1, U = !1) => {
    const {
      type: Y,
      props: Z,
      ref: S,
      children: I,
      dynamicChildren: M,
      shapeFlag: $,
      patchFlag: G,
      dirs: Q
    } = x;
    if (S != null && Rs(S, null, D, x, !0), $ & 256) {
      L.ctx.deactivate(x);
      return;
    }
    const ne = $ & 1 && Q, ce = !Ni(x);
    let _e;
    if (ce && (_e = Z && Z.onVnodeBeforeUnmount) && At(_e, L, x), $ & 6)
      xe(x.component, D, W);
    else {
      if ($ & 128) {
        x.suspense.unmount(D, W);
        return;
      }
      ne && Sn(x, null, L, "beforeUnmount"), $ & 64 ? x.type.remove(
        x,
        L,
        D,
        U,
        It,
        W
      ) : M && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (Y !== Se || G > 0 && G & 64) ? he(
        M,
        L,
        D,
        !1,
        !0
      ) : (Y === Se && G & 384 || !U && $ & 16) && he(I, L, D), W && te(x);
    }
    (ce && (_e = Z && Z.onVnodeUnmounted) || ne) && et(() => {
      _e && At(_e, L, x), ne && Sn(x, null, L, "unmounted");
    }, D);
  }, te = (x) => {
    const { type: L, el: D, anchor: W, transition: U } = x;
    if (L === Se) {
      ue(D, W);
      return;
    }
    if (L === ls) {
      y(x);
      return;
    }
    const Y = () => {
      i(D), U && !U.persisted && U.afterLeave && U.afterLeave();
    };
    if (x.shapeFlag & 1 && U && !U.persisted) {
      const { leave: Z, delayLeave: S } = U, I = () => Z(D, Y);
      S ? S(x.el, Y, I) : I();
    } else
      Y();
  }, ue = (x, L) => {
    let D;
    for (; x !== L; )
      D = d(x), i(x), x = D;
    i(L);
  }, xe = (x, L, D) => {
    const { bum: W, scope: U, update: Y, subTree: Z, um: S } = x;
    W && ts(W), U.stop(), Y && (Y.active = !1, J(Z, x, L, D)), S && et(S, L), et(() => {
      x.isUnmounted = !0;
    }, L), L && L.pendingBranch && !L.isUnmounted && x.asyncDep && !x.asyncResolved && x.suspenseId === L.pendingId && (L.deps--, L.deps === 0 && L.resolve());
  }, he = (x, L, D, W = !1, U = !1, Y = 0) => {
    for (let Z = Y; Z < x.length; Z++)
      J(x[Z], L, D, W, U);
  }, Ce = (x) => x.shapeFlag & 6 ? Ce(x.component.subTree) : x.shapeFlag & 128 ? x.suspense.next() : d(x.anchor || x.el);
  let Oe = !1;
  const wt = (x, L, D) => {
    x == null ? L._vnode && J(L._vnode, null, null, !0) : m(
      L._vnode || null,
      x,
      L,
      null,
      null,
      null,
      D
    ), Oe || (Oe = !0, Va(), uf(), Oe = !1), L._vnode = x;
  }, It = {
    p: m,
    um: J,
    m: q,
    r: te,
    mt: _,
    mc: P,
    pc: z,
    pbc: F,
    n: Ce,
    o: e
  };
  let nn, rn;
  return t && ([nn, rn] = t(
    It
  )), {
    render: wt,
    hydrate: nn,
    createApp: gm(wt, nn)
  };
}
function ss({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function kn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function xm(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Rl(e, t, n = !1) {
  const r = e.children, i = t.children;
  if (re(r) && re(i))
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = cn(i[o]), l.el = s.el), n || Rl(s, l)), l.type === ti && (l.el = s.el);
    }
}
function Cm(e) {
  const t = e.slice(), n = [0];
  let r, i, o, s, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[r] = i, n.push(r);
        continue;
      }
      for (o = 0, s = n.length - 1; o < s; )
        l = o + s >> 1, e[n[l]] < u ? o = l + 1 : s = l;
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, s = n[o - 1]; o-- > 0; )
    n[o] = s, s = t[s];
  return n;
}
function Tf(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Tf(t);
}
const Sm = (e) => e.__isTeleport, Pr = (e) => e && (e.disabled || e.disabled === ""), za = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ja = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ns = (e, t) => {
  const n = e && e.to;
  return Pe(n) ? t ? t(n) : null : n;
}, km = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, i, o, s, l, a, u) {
    const {
      mc: c,
      pc: f,
      pbc: d,
      o: { insert: h, querySelector: g, createText: m, createComment: p }
    } = u, v = Pr(t.props);
    let { shapeFlag: b, children: k, dynamicChildren: y } = t;
    if (e == null) {
      const C = t.el = m(""), T = t.anchor = m("");
      h(C, n, r), h(T, n, r);
      const E = t.target = Ns(t.props, g), P = t.targetAnchor = m("");
      E && (h(P, E), s === "svg" || za(E) ? s = "svg" : (s === "mathml" || ja(E)) && (s = "mathml"));
      const O = (F, j) => {
        b & 16 && c(
          k,
          F,
          j,
          i,
          o,
          s,
          l,
          a
        );
      };
      v ? O(n, T) : E && O(E, P);
    } else {
      t.el = e.el;
      const C = t.anchor = e.anchor, T = t.target = e.target, E = t.targetAnchor = e.targetAnchor, P = Pr(e.props), O = P ? n : T, F = P ? C : E;
      if (s === "svg" || za(T) ? s = "svg" : (s === "mathml" || ja(T)) && (s = "mathml"), y ? (d(
        e.dynamicChildren,
        y,
        O,
        i,
        o,
        s,
        l
      ), Rl(e, t, !0)) : a || f(
        e,
        t,
        O,
        F,
        i,
        o,
        s,
        l,
        !1
      ), v)
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : xi(
          t,
          n,
          C,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const j = t.target = Ns(
          t.props,
          g
        );
        j && xi(
          t,
          j,
          null,
          u,
          0
        );
      } else
        P && xi(
          t,
          T,
          E,
          u,
          1
        );
    }
    Vf(t);
  },
  remove(e, t, n, r, { um: i, o: { remove: o } }, s) {
    const { shapeFlag: l, children: a, anchor: u, targetAnchor: c, target: f, props: d } = e;
    if (f && o(c), s && o(u), l & 16) {
      const h = s || !Pr(d);
      for (let g = 0; g < a.length; g++) {
        const m = a[g];
        i(
          m,
          t,
          n,
          h,
          !!m.dynamicChildren
        );
      }
    }
  },
  move: xi,
  hydrate: Em
};
function xi(e, t, n, { o: { insert: r }, m: i }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: s, anchor: l, shapeFlag: a, children: u, props: c } = e, f = o === 2;
  if (f && r(s, t, n), (!f || Pr(c)) && a & 16)
    for (let d = 0; d < u.length; d++)
      i(
        u[d],
        t,
        n,
        2
      );
  f && r(l, t, n);
}
function Em(e, t, n, r, i, o, {
  o: { nextSibling: s, parentNode: l, querySelector: a }
}, u) {
  const c = t.target = Ns(
    t.props,
    a
  );
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Pr(t.props))
        t.anchor = u(
          s(e),
          t,
          l(e),
          n,
          r,
          i,
          o
        ), t.targetAnchor = f;
      else {
        t.anchor = s(e);
        let d = f;
        for (; d; )
          if (d = s(d), d && d.nodeType === 8 && d.data === "teleport anchor") {
            t.targetAnchor = d, c._lpa = t.targetAnchor && s(t.targetAnchor);
            break;
          }
        u(
          f,
          t,
          c,
          n,
          r,
          i,
          o
        );
      }
    Vf(t);
  }
  return t.anchor && s(t.anchor);
}
const Lm = km;
function Vf(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Se = Symbol.for("v-fgt"), ti = Symbol.for("v-txt"), Lt = Symbol.for("v-cmt"), ls = Symbol.for("v-stc"), Rr = [];
let Et = null;
function Hn(e = !1) {
  Rr.push(Et = e ? null : []);
}
function Mm() {
  Rr.pop(), Et = Rr[Rr.length - 1] || null;
}
let zr = 1;
function Wa(e) {
  zr += e;
}
function If(e) {
  return e.dynamicChildren = zr > 0 ? Et || nr : null, Mm(), zr > 0 && Et && Et.push(e), e;
}
function Os(e, t, n, r, i, o) {
  return If(
    Re(
      e,
      t,
      n,
      r,
      i,
      o,
      !0
    )
  );
}
function Vo(e, t, n, r, i) {
  return If(
    w(
      e,
      t,
      n,
      r,
      i,
      !0
    )
  );
}
function Fs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function In(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Io = "__vInternal", $f = ({ key: e }) => e ?? null, Oi = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Pe(e) || $e(e) || se(e) ? { i: qe, r: e, k: t, f: !!n } : e : null);
function Re(e, t = null, n = null, r = 0, i = null, o = e === Se ? 0 : 1, s = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && $f(t),
    ref: t && Oi(t),
    scopeId: df,
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
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: qe
  };
  return l ? (Nl(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Pe(n) ? 8 : 16), zr > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Et && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Et.push(a), a;
}
const w = Tm;
function Tm(e, t = null, n = null, r = 0, i = null, o = !1) {
  if ((!e || e === gf) && (e = Lt), Fs(e)) {
    const l = yn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Nl(l, n), zr > 0 && !o && Et && (l.shapeFlag & 6 ? Et[Et.indexOf(e)] = l : Et.push(l)), l.patchFlag |= -2, l;
  }
  if (Dm(e) && (e = e.__vccOpts), t) {
    t = Vm(t);
    let { class: l, style: a } = t;
    l && !Pe(l) && (t.class = pl(l)), Le(a) && (Qc(a) && !re(a) && (a = Ie({}, a)), t.style = vl(a));
  }
  const s = Pe(e) ? 1 : Gg(e) ? 128 : Sm(e) ? 64 : Le(e) ? 4 : se(e) ? 2 : 0;
  return Re(
    e,
    t,
    n,
    r,
    i,
    s,
    o,
    !0
  );
}
function Vm(e) {
  return e ? Qc(e) || Io in e ? Ie({}, e) : e : null;
}
function yn(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: s } = e, l = t ? fe(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && $f(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? re(i) ? i.concat(Oi(t)) : [i, Oi(t)] : Oi(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Se ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && yn(e.ssContent),
    ssFallback: e.ssFallback && yn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ge(e = " ", t = 0) {
  return w(ti, null, e, t);
}
function Im(e = "", t = !1) {
  return t ? (Hn(), Vo(Lt, null, e)) : w(Lt, null, e);
}
function Pt(e) {
  return e == null || typeof e == "boolean" ? w(Lt) : re(e) ? w(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? cn(e) : w(ti, null, String(e));
}
function cn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : yn(e);
}
function Nl(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (re(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Nl(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Io in t) ? t._ctx = qe : i === 3 && qe && (qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    se(t) ? (t = { default: t, _ctx: qe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ge(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function fe(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r)
      if (i === "class")
        t.class !== r.class && (t.class = pl([t.class, r.class]));
      else if (i === "style")
        t.style = vl([t.style, r.style]);
      else if (xo(i)) {
        const o = t[i], s = r[i];
        s && o !== s && !(re(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
      } else
        i !== "" && (t[i] = r[i]);
  }
  return t;
}
function At(e, t, n, r = null) {
  yt(e, t, 7, [
    n,
    r
  ]);
}
const $m = Cf();
let Am = 0;
function Pm(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || $m, o = {
    uid: Am++,
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
    scope: new Hc(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: kf(r, i),
    emitsOptions: ff(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Te,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Te,
    data: Te,
    props: Te,
    attrs: Te,
    slots: Te,
    refs: Te,
    setupState: Te,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Fg.bind(null, o), e.ce && e.ce(o), o;
}
let Fe = null;
const Ol = () => Fe || qe;
let Qi, Bs;
{
  const e = Fc(), t = (n, r) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(r), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  Qi = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Fe = n
  ), Bs = t(
    "__VUE_SSR_SETTERS__",
    (n) => $o = n
  );
}
const ni = (e) => {
  const t = Fe;
  return Qi(e), e.scope.on(), () => {
    e.scope.off(), Qi(t);
  };
}, Ga = () => {
  Fe && Fe.scope.off(), Qi(null);
};
function Af(e) {
  return e.vnode.shapeFlag & 4;
}
let $o = !1;
function Rm(e, t = !1) {
  t && Bs(t);
  const { props: n, children: r } = e.vnode, i = Af(e);
  mm(e, n, i, t), ym(e, r);
  const o = i ? Nm(e, t) : void 0;
  return t && Bs(!1), o;
}
function Nm(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ef(new Proxy(e.ctx, lm));
  const { setup: r } = n;
  if (r) {
    const i = e.setupContext = r.length > 1 ? Fm(e) : null, o = ni(e);
    Wn();
    const s = vn(
      r,
      e,
      0,
      [
        e.props,
        i
      ]
    );
    if (Gn(), o(), Rc(s)) {
      if (s.then(Ga, Ga), t)
        return s.then((l) => {
          Ua(e, l, t);
        }).catch((l) => {
          Eo(l, e, 0);
        });
      e.asyncDep = s;
    } else
      Ua(e, s, t);
  } else
    Pf(e, t);
}
function Ua(e, t, n) {
  se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Le(t) && (e.setupState = of(t)), Pf(e, n);
}
let qa;
function Pf(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && qa && !r.render) {
      const i = r.template || Al(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: s } = e.appContext.config, { delimiters: l, compilerOptions: a } = r, u = Ie(
          Ie(
            {
              isCustomElement: o,
              delimiters: l
            },
            s
          ),
          a
        );
        r.render = qa(i, u);
      }
    }
    e.render = r.render || pt;
  }
  {
    const i = ni(e);
    Wn();
    try {
      am(e);
    } finally {
      Gn(), i();
    }
  }
}
function Om(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return nt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Fm(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Om(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ao(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(of(ef(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in $r)
          return $r[n](e);
      },
      has(t, n) {
        return n in t || n in $r;
      }
    }));
}
function Bm(e, t = !0) {
  return se(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Dm(e) {
  return se(e) && "__vccOpts" in e;
}
const A = (e, t) => Mg(e, t, $o);
function wr(e, t, n) {
  const r = arguments.length;
  return r === 2 ? Le(t) && !re(t) ? Fs(t) ? w(e, null, [t]) : w(e, t) : w(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Fs(n) && (n = [n]), w(e, t, n));
}
const Hm = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const zm = "http://www.w3.org/2000/svg", jm = "http://www.w3.org/1998/Math/MathML", fn = typeof document < "u" ? document : null, Ya = fn && /* @__PURE__ */ fn.createElement("template"), Wm = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const i = t === "svg" ? fn.createElementNS(zm, e) : t === "mathml" ? fn.createElementNS(jm, e) : fn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (e) => fn.createTextNode(e),
  createComment: (e) => fn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => fn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, i, o) {
    const s = n ? n.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      Ya.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
      const l = Ya.content;
      if (r === "svg" || r === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, sn = "transition", Cr = "animation", fr = Symbol("_vtc"), Kt = (e, { slots: t }) => wr(Zg, Nf(e), t);
Kt.displayName = "Transition";
const Rf = {
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
}, Gm = Kt.props = /* @__PURE__ */ Ie(
  {},
  yf,
  Rf
), En = (e, t = []) => {
  re(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ka = (e) => e ? re(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Nf(e) {
  const t = {};
  for (const R in e)
    R in Rf || (t[R] = e[R]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: r,
    duration: i,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: s = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: a = o,
    appearActiveClass: u = s,
    appearToClass: c = l,
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: d = `${n}-leave-active`,
    leaveToClass: h = `${n}-leave-to`
  } = e, g = Um(i), m = g && g[0], p = g && g[1], {
    onBeforeEnter: v,
    onEnter: b,
    onEnterCancelled: k,
    onLeave: y,
    onLeaveCancelled: C,
    onBeforeAppear: T = v,
    onAppear: E = b,
    onAppearCancelled: P = k
  } = t, O = (R, N, _) => {
    ln(R, N ? c : l), ln(R, N ? u : s), _ && _();
  }, F = (R, N) => {
    R._isLeaving = !1, ln(R, f), ln(R, h), ln(R, d), N && N();
  }, j = (R) => (N, _) => {
    const B = R ? E : b, V = () => O(N, R, _);
    En(B, [N, V]), Xa(() => {
      ln(N, R ? a : o), Wt(N, R ? c : l), Ka(B) || Za(N, r, m, V);
    });
  };
  return Ie(t, {
    onBeforeEnter(R) {
      En(v, [R]), Wt(R, o), Wt(R, s);
    },
    onBeforeAppear(R) {
      En(T, [R]), Wt(R, a), Wt(R, u);
    },
    onEnter: j(!1),
    onAppear: j(!0),
    onLeave(R, N) {
      R._isLeaving = !0;
      const _ = () => F(R, N);
      Wt(R, f), Ff(), Wt(R, d), Xa(() => {
        R._isLeaving && (ln(R, f), Wt(R, h), Ka(y) || Za(R, r, p, _));
      }), En(y, [R, _]);
    },
    onEnterCancelled(R) {
      O(R, !1), En(k, [R]);
    },
    onAppearCancelled(R) {
      O(R, !0), En(P, [R]);
    },
    onLeaveCancelled(R) {
      F(R), En(C, [R]);
    }
  });
}
function Um(e) {
  if (e == null)
    return null;
  if (Le(e))
    return [as(e.enter), as(e.leave)];
  {
    const t = as(e);
    return [t, t];
  }
}
function as(e) {
  return Es(e);
}
function Wt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[fr] || (e[fr] = /* @__PURE__ */ new Set())).add(t);
}
function ln(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[fr];
  n && (n.delete(t), n.size || (e[fr] = void 0));
}
function Xa(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let qm = 0;
function Za(e, t, n, r) {
  const i = e._endId = ++qm, o = () => {
    i === e._endId && r();
  };
  if (n)
    return setTimeout(o, n);
  const { type: s, timeout: l, propCount: a } = Of(e, t);
  if (!s)
    return r();
  const u = s + "end";
  let c = 0;
  const f = () => {
    e.removeEventListener(u, d), o();
  }, d = (h) => {
    h.target === e && ++c >= a && f();
  };
  setTimeout(() => {
    c < a && f();
  }, l + 1), e.addEventListener(u, d);
}
function Of(e, t) {
  const n = window.getComputedStyle(e), r = (g) => (n[g] || "").split(", "), i = r(`${sn}Delay`), o = r(`${sn}Duration`), s = Ja(i, o), l = r(`${Cr}Delay`), a = r(`${Cr}Duration`), u = Ja(l, a);
  let c = null, f = 0, d = 0;
  t === sn ? s > 0 && (c = sn, f = s, d = o.length) : t === Cr ? u > 0 && (c = Cr, f = u, d = a.length) : (f = Math.max(s, u), c = f > 0 ? s > u ? sn : Cr : null, d = c ? c === sn ? o.length : a.length : 0);
  const h = c === sn && /\b(transform|all)(,|$)/.test(
    r(`${sn}Property`).toString()
  );
  return {
    type: c,
    timeout: f,
    propCount: d,
    hasTransform: h
  };
}
function Ja(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => Qa(n) + Qa(e[r])));
}
function Qa(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ff() {
  return document.body.offsetHeight;
}
function Ym(e, t, n) {
  const r = e[fr];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const eo = Symbol("_vod"), Bf = Symbol("_vsh"), qn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[eo] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Sr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Sr(e, !0), r.enter(e)) : r.leave(e, () => {
      Sr(e, !1);
    }) : Sr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Sr(e, t);
  }
};
function Sr(e, t) {
  e.style.display = t ? e[eo] : "none", e[Bf] = !t;
}
const Km = Symbol(""), Xm = /(^|;)\s*display\s*:/;
function Zm(e, t, n) {
  const r = e.style, i = Pe(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (Pe(t))
        for (const s of t.split(";")) {
          const l = s.slice(0, s.indexOf(":")).trim();
          n[l] == null && Fi(r, l, "");
        }
      else
        for (const s in t)
          n[s] == null && Fi(r, s, "");
    for (const s in n)
      s === "display" && (o = !0), Fi(r, s, n[s]);
  } else if (i) {
    if (t !== n) {
      const s = r[Km];
      s && (n += ";" + s), r.cssText = n, o = Xm.test(n);
    }
  } else
    t && e.removeAttribute("style");
  eo in e && (e[eo] = o ? r.display : "", e[Bf] && (r.display = "none"));
}
const eu = /\s*!important$/;
function Fi(e, t, n) {
  if (re(n))
    n.forEach((r) => Fi(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Jm(e, t);
    eu.test(n) ? e.setProperty(
      Ct(r),
      n.replace(eu, ""),
      "important"
    ) : e[r] = n;
  }
}
const tu = ["Webkit", "Moz", "ms"], us = {};
function Jm(e, t) {
  const n = us[t];
  if (n)
    return n;
  let r = Ze(t);
  if (r !== "filter" && r in e)
    return us[t] = r;
  r = pr(r);
  for (let i = 0; i < tu.length; i++) {
    const o = tu[i] + r;
    if (o in e)
      return us[t] = o;
  }
  return t;
}
const nu = "http://www.w3.org/1999/xlink";
function Qm(e, t, n, r, i) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(nu, t.slice(6, t.length)) : e.setAttributeNS(nu, t, n);
  else {
    const o = ig(t);
    n == null || o && !Bc(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function ev(e, t, n, r, i, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r && s(r, i, o), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    const u = l === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n ?? "";
    (u !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = Bc(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function tv(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function nv(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const ru = Symbol("_vei");
function rv(e, t, n, r, i = null) {
  const o = e[ru] || (e[ru] = {}), s = o[t];
  if (r && s)
    s.value = r;
  else {
    const [l, a] = iv(t);
    if (r) {
      const u = o[t] = lv(r, i);
      tv(e, l, u, a);
    } else
      s && (nv(e, l, s, a), o[t] = void 0);
  }
}
const iu = /(?:Once|Passive|Capture)$/;
function iv(e) {
  let t;
  if (iu.test(e)) {
    t = {};
    let r;
    for (; r = e.match(iu); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
let cs = 0;
const ov = /* @__PURE__ */ Promise.resolve(), sv = () => cs || (ov.then(() => cs = 0), cs = Date.now());
function lv(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    yt(
      av(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = sv(), n;
}
function av(e, t) {
  if (re(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return t;
}
const ou = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, uv = (e, t, n, r, i, o, s, l, a) => {
  const u = i === "svg";
  t === "class" ? Ym(e, r, u) : t === "style" ? Zm(e, n, r) : xo(t) ? hl(t) || rv(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : cv(e, t, r, u)) ? ev(
    e,
    t,
    r,
    o,
    s,
    l,
    a
  ) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Qm(e, t, r, u));
};
function cv(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ou(t) && se(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return ou(t) && Pe(n) ? !1 : t in e;
}
const Df = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), to = Symbol("_moveCb"), su = Symbol("_enterCb"), zf = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ie({}, Gm, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Ol(), r = pf();
    let i, o;
    return _f(() => {
      if (!i.length)
        return;
      const s = e.moveClass || `${e.name || "v"}-move`;
      if (!mv(
        i[0].el,
        n.vnode.el,
        s
      ))
        return;
      i.forEach(dv), i.forEach(hv);
      const l = i.filter(gv);
      Ff(), l.forEach((a) => {
        const u = a.el, c = u.style;
        Wt(u, s), c.transform = c.webkitTransform = c.transitionDuration = "";
        const f = u[to] = (d) => {
          d && d.target !== u || (!d || /transform$/.test(d.propertyName)) && (u.removeEventListener("transitionend", f), u[to] = null, ln(u, s));
        };
        u.addEventListener("transitionend", f);
      });
    }), () => {
      const s = ve(e), l = Nf(s);
      let a = s.tag || Se;
      i = o, o = t.default ? Vl(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && Hr(
          c,
          Dr(c, l, r, n)
        );
      }
      if (i)
        for (let u = 0; u < i.length; u++) {
          const c = i[u];
          Hr(
            c,
            Dr(c, l, r, n)
          ), Df.set(c, c.el.getBoundingClientRect());
        }
      return w(a, null, o);
    };
  }
}, fv = (e) => delete e.mode;
zf.props;
const jf = zf;
function dv(e) {
  const t = e.el;
  t[to] && t[to](), t[su] && t[su]();
}
function hv(e) {
  Hf.set(e, e.el.getBoundingClientRect());
}
function gv(e) {
  const t = Df.get(e), n = Hf.get(e), r = t.left - n.left, i = t.top - n.top;
  if (r || i) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${r}px,${i}px)`, o.transitionDuration = "0s", e;
  }
}
function mv(e, t, n) {
  const r = e.cloneNode(), i = e[fr];
  i && i.forEach((l) => {
    l.split(/\s+/).forEach((a) => a && r.classList.remove(a));
  }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Of(r);
  return o.removeChild(r), s;
}
const vv = /* @__PURE__ */ Ie({ patchProp: uv }, Wm);
let lu;
function pv() {
  return lu || (lu = bm(vv));
}
const au = (...e) => {
  pv().render(...e);
};
/*! (c) Andrea Giammarchi - ISC */
const yv = (() => {
  const e = "DOMContentLoaded", t = /* @__PURE__ */ new WeakMap(), n = [], r = (s) => {
    do
      if (s.nextSibling)
        return !0;
    while (s = s.parentNode);
    return !1;
  }, i = () => {
    n.splice(0).forEach((s) => {
      t.get(s[0]) !== !0 && (t.set(s[0], !0), s[0][s[1]]());
    });
  };
  document.addEventListener(e, i);
  class o extends HTMLElement {
    static withParsedCallback(l, a = "parsed") {
      const { prototype: u } = l, { connectedCallback: c } = u, f = a + "Callback", d = (g, m, p, v) => {
        m.disconnect(), p.removeEventListener(e, v), h(g);
      }, h = (g) => {
        n.length || requestAnimationFrame(i), n.push([g, f]);
      };
      return Object.defineProperties(
        u,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (c && c.apply(this, arguments), f in this && !t.has(this)) {
                const g = this, { ownerDocument: m } = g;
                if (t.set(g, !1), m.readyState === "complete" || r(g))
                  h(g);
                else {
                  const p = () => d(g, v, m, p);
                  m.addEventListener(e, p);
                  const v = new MutationObserver(() => {
                    r(g) && d(g, v, m, p);
                  });
                  v.observe(g.parentNode, { childList: !0, subtree: !0 });
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
      ), l;
    }
  }
  return o.withParsedCallback(o);
})();
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wv(e, t, n) {
  const r = /* @__PURE__ */ yr(e);
  class i extends Fl {
    constructor(s) {
      super(r, s, t, n);
    }
  }
  return Me(i, "def", r), i;
}
const bv = typeof HTMLElement < "u" ? yv : class {
};
class Fl extends bv {
  constructor(n, r = {}, i = {}, o) {
    super();
    /**
     * @internal
     */
    Me(this, "_instance", null);
    Me(this, "_connected", !1);
    Me(this, "_resolved", !1);
    Me(this, "_numberProps", null);
    Me(this, "_styles");
    Me(this, "_slots");
    Me(this, "_ob", null);
    this._def = n, this._props = r, this._config = i, this._config = Ie(
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
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), He(() => {
      this._connected || (au(null, this._root), this._instance = null);
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
      for (const o of i)
        this._setAttr(o.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const n = (i, o = !1) => {
      const { props: s, styles: l } = i;
      let a;
      if (s && !re(s))
        for (const u in s) {
          const c = s[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = Es(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[Ze(u)] = !0);
        }
      this._numberProps = a, o && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((u) => u.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = re(r) ? r : Object.keys(r || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && i.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of i.map(Ze))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(s) {
          this._setProp(o, s);
        }
      });
  }
  _setAttr(n) {
    let r = this.getAttribute(n);
    const i = Ze(n);
    this._numberProps && this._numberProps[i] && (r = Es(r)), this._setProp(i, r, !1);
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
  _setProp(n, r, i = !0, o = !0) {
    r !== this._props[n] && (this._props[n] = r, o && this._instance && this._update(), i && (r === !0 ? this.setAttribute(Ct(n), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(Ct(n), r + "") : r || this.removeAttribute(Ct(n))));
  }
  _update() {
    au(this._createVNode(), this._root);
  }
  _createVNode() {
    let n = null;
    this._config.shadowRoot || (n = () => {
      const i = (o) => {
        const s = {};
        for (let l = 0, a = o.length; l < a; l++) {
          const u = o[l];
          s[u.nodeName] = u.nodeValue;
        }
        return s;
      };
      return this._slots.map((o) => {
        const s = o.attributes ? i(o.attributes) : {};
        return s.innerHTML = o.innerHTML, w(o.tagName, s, null);
      });
    });
    const r = w(this._def, Ie({}, this._props), n);
    return this._instance || (r.ce = (i) => {
      this._instance = i, this._config.shadowRoot && (i.isCE = !0);
      const o = (l, a) => {
        this.dispatchEvent(
          new CustomEvent(l, {
            detail: a
          })
        );
      };
      i.emit = (l, ...a) => {
        o(l, a), Ct(l) !== l && o(Ct(l), a);
      };
      let s = this;
      for (; s = s && (s.parentNode || s.host); )
        if (s instanceof Fl) {
          i.parent = s._instance, i.provides = s._instance.provides;
          break;
        }
    }), r;
  }
  _applyStyles(n) {
    n && n.forEach((r) => {
      const i = document.createElement("style");
      i.textContent = r, this._root.appendChild(i);
    });
  }
}
var _v = { value: () => {
} };
function ri() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Bi(n);
}
function Bi(e) {
  this._ = e;
}
function xv(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Bi.prototype = ri.prototype = {
  constructor: Bi,
  on: function(e, t) {
    var n = this._, r = xv(e + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (e = r[o]).type) && (i = Cv(n[i], e.name)))
          return i;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++o < s; )
      if (i = (e = r[o]).type)
        n[i] = uu(n[i], e.name, t);
      else if (t == null)
        for (i in n)
          n[i] = uu(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new Bi(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (o = this._[e], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(t, n);
  }
};
function Cv(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function uu(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = _v, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Ds = "http://www.w3.org/1999/xhtml";
const cu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ds,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Po(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), cu.hasOwnProperty(t) ? { space: cu[t], local: e } : e;
}
function Sv(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Ds && t.documentElement.namespaceURI === Ds ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function kv(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Wf(e) {
  var t = Po(e);
  return (t.local ? kv : Sv)(t);
}
function Ev() {
}
function Bl(e) {
  return e == null ? Ev : function() {
    return this.querySelector(e);
  };
}
function Lv(e) {
  typeof e != "function" && (e = Bl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = new Array(s), a, u, c = 0; c < s; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), l[c] = u);
  return new dt(r, this._parents);
}
function Mv(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Tv() {
  return [];
}
function Gf(e) {
  return e == null ? Tv : function() {
    return this.querySelectorAll(e);
  };
}
function Vv(e) {
  return function() {
    return Mv(e.apply(this, arguments));
  };
}
function Iv(e) {
  typeof e == "function" ? e = Vv(e) : e = Gf(e);
  for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = t[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && (r.push(e.call(a, a.__data__, u, s)), i.push(a));
  return new dt(r, i);
}
function Uf(e) {
  return function() {
    return this.matches(e);
  };
}
function qf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var $v = Array.prototype.find;
function Av(e) {
  return function() {
    return $v.call(this.children, e);
  };
}
function Pv() {
  return this.firstElementChild;
}
function Rv(e) {
  return this.select(e == null ? Pv : Av(typeof e == "function" ? e : qf(e)));
}
var Nv = Array.prototype.filter;
function Ov() {
  return Array.from(this.children);
}
function Fv(e) {
  return function() {
    return Nv.call(this.children, e);
  };
}
function Bv(e) {
  return this.selectAll(e == null ? Ov : Fv(typeof e == "function" ? e : qf(e)));
}
function Dv(e) {
  typeof e != "function" && (e = Uf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new dt(r, this._parents);
}
function Yf(e) {
  return new Array(e.length);
}
function Hv() {
  return new dt(this._enter || this._groups.map(Yf), this._parents);
}
function no(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
no.prototype = {
  constructor: no,
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
function zv(e) {
  return function() {
    return e;
  };
}
function jv(e, t, n, r, i, o) {
  for (var s = 0, l, a = t.length, u = o.length; s < u; ++s)
    (l = t[s]) ? (l.__data__ = o[s], r[s] = l) : n[s] = new no(e, o[s]);
  for (; s < a; ++s)
    (l = t[s]) && (i[s] = l);
}
function Wv(e, t, n, r, i, o, s) {
  var l, a, u = /* @__PURE__ */ new Map(), c = t.length, f = o.length, d = new Array(c), h;
  for (l = 0; l < c; ++l)
    (a = t[l]) && (d[l] = h = s.call(a, a.__data__, l, t) + "", u.has(h) ? i[l] = a : u.set(h, a));
  for (l = 0; l < f; ++l)
    h = s.call(e, o[l], l, o) + "", (a = u.get(h)) ? (r[l] = a, a.__data__ = o[l], u.delete(h)) : n[l] = new no(e, o[l]);
  for (l = 0; l < c; ++l)
    (a = t[l]) && u.get(d[l]) === a && (i[l] = a);
}
function Gv(e) {
  return e.__data__;
}
function Uv(e, t) {
  if (!arguments.length)
    return Array.from(this, Gv);
  var n = t ? Wv : jv, r = this._parents, i = this._groups;
  typeof e != "function" && (e = zv(e));
  for (var o = i.length, s = new Array(o), l = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = r[u], f = i[u], d = f.length, h = qv(e.call(c, c && c.__data__, u, r)), g = h.length, m = l[u] = new Array(g), p = s[u] = new Array(g), v = a[u] = new Array(d);
    n(c, f, m, p, v, h, t);
    for (var b = 0, k = 0, y, C; b < g; ++b)
      if (y = m[b]) {
        for (b >= k && (k = b + 1); !(C = p[k]) && ++k < g; )
          ;
        y._next = C || null;
      }
  }
  return s = new dt(s, r), s._enter = l, s._exit = a, s;
}
function qv(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Yv() {
  return new dt(this._exit || this._groups.map(Yf), this._parents);
}
function Kv(e, t, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Xv(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, o = r.length, s = Math.min(i, o), l = new Array(i), a = 0; a < s; ++a)
    for (var u = n[a], c = r[a], f = u.length, d = l[a] = new Array(f), h, g = 0; g < f; ++g)
      (h = u[g] || c[g]) && (d[g] = h);
  for (; a < i; ++a)
    l[a] = n[a];
  return new dt(l, this._parents);
}
function Zv() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Jv(e) {
  e || (e = Qv);
  function t(f, d) {
    return f && d ? e(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], l = s.length, a = i[o] = new Array(l), u, c = 0; c < l; ++c)
      (u = s[c]) && (a[c] = u);
    a.sort(t);
  }
  return new dt(i, this._parents).order();
}
function Qv(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function e0() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function t0() {
  return Array.from(this);
}
function n0() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function r0() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function i0() {
  return !this.node();
}
function o0(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], o = 0, s = i.length, l; o < s; ++o)
      (l = i[o]) && e.call(l, l.__data__, o, i);
  return this;
}
function s0(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function l0(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function a0(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function u0(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function c0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function f0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function d0(e, t) {
  var n = Po(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? l0 : s0 : typeof t == "function" ? n.local ? f0 : c0 : n.local ? u0 : a0)(n, t));
}
function Kf(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function h0(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function g0(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function m0(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function v0(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? h0 : typeof t == "function" ? m0 : g0)(e, t, n ?? "")) : dr(this.node(), e);
}
function dr(e, t) {
  return e.style.getPropertyValue(t) || Kf(e).getComputedStyle(e, null).getPropertyValue(t);
}
function p0(e) {
  return function() {
    delete this[e];
  };
}
function y0(e, t) {
  return function() {
    this[e] = t;
  };
}
function w0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function b0(e, t) {
  return arguments.length > 1 ? this.each((t == null ? p0 : typeof t == "function" ? w0 : y0)(e, t)) : this.node()[e];
}
function Xf(e) {
  return e.trim().split(/^|\s+/);
}
function Dl(e) {
  return e.classList || new Zf(e);
}
function Zf(e) {
  this._node = e, this._names = Xf(e.getAttribute("class") || "");
}
Zf.prototype = {
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
function Jf(e, t) {
  for (var n = Dl(e), r = -1, i = t.length; ++r < i; )
    n.add(t[r]);
}
function Qf(e, t) {
  for (var n = Dl(e), r = -1, i = t.length; ++r < i; )
    n.remove(t[r]);
}
function _0(e) {
  return function() {
    Jf(this, e);
  };
}
function x0(e) {
  return function() {
    Qf(this, e);
  };
}
function C0(e, t) {
  return function() {
    (t.apply(this, arguments) ? Jf : Qf)(this, e);
  };
}
function S0(e, t) {
  var n = Xf(e + "");
  if (arguments.length < 2) {
    for (var r = Dl(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? C0 : t ? _0 : x0)(n, t));
}
function k0() {
  this.textContent = "";
}
function E0(e) {
  return function() {
    this.textContent = e;
  };
}
function L0(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function M0(e) {
  return arguments.length ? this.each(e == null ? k0 : (typeof e == "function" ? L0 : E0)(e)) : this.node().textContent;
}
function T0() {
  this.innerHTML = "";
}
function V0(e) {
  return function() {
    this.innerHTML = e;
  };
}
function I0(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function $0(e) {
  return arguments.length ? this.each(e == null ? T0 : (typeof e == "function" ? I0 : V0)(e)) : this.node().innerHTML;
}
function A0() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function P0() {
  return this.each(A0);
}
function R0() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function N0() {
  return this.each(R0);
}
function O0(e) {
  var t = typeof e == "function" ? e : Wf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function F0() {
  return null;
}
function B0(e, t) {
  var n = typeof e == "function" ? e : Wf(e), r = t == null ? F0 : typeof t == "function" ? t : Bl(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function D0() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function H0() {
  return this.each(D0);
}
function z0() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function j0() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function W0(e) {
  return this.select(e ? j0 : z0);
}
function G0(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function U0(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function q0(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function Y0(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, o; n < i; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++r] = o;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function K0(e, t, n) {
  return function() {
    var r = this.__on, i, o = U0(t);
    if (r) {
      for (var s = 0, l = r.length; s < l; ++s)
        if ((i = r[s]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, n), i = { type: e.type, name: e.name, value: t, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function X0(e, t, n) {
  var r = q0(e + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, u = l.length, c; a < u; ++a)
        for (i = 0, c = l[a]; i < o; ++i)
          if ((s = r[i]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (l = t ? K0 : Y0, i = 0; i < o; ++i)
    this.each(l(r[i], t, n));
  return this;
}
function ed(e, t, n) {
  var r = Kf(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Z0(e, t) {
  return function() {
    return ed(this, e, t);
  };
}
function J0(e, t) {
  return function() {
    return ed(this, e, t.apply(this, arguments));
  };
}
function Q0(e, t) {
  return this.each((typeof t == "function" ? J0 : Z0)(e, t));
}
function* ep() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var td = [null];
function dt(e, t) {
  this._groups = e, this._parents = t;
}
function ii() {
  return new dt([[document.documentElement]], td);
}
function tp() {
  return this;
}
dt.prototype = ii.prototype = {
  constructor: dt,
  select: Lv,
  selectAll: Iv,
  selectChild: Rv,
  selectChildren: Bv,
  filter: Dv,
  data: Uv,
  enter: Hv,
  exit: Yv,
  join: Kv,
  merge: Xv,
  selection: tp,
  order: Zv,
  sort: Jv,
  call: e0,
  nodes: t0,
  node: n0,
  size: r0,
  empty: i0,
  each: o0,
  attr: d0,
  style: v0,
  property: b0,
  classed: S0,
  text: M0,
  html: $0,
  raise: P0,
  lower: N0,
  append: O0,
  insert: B0,
  remove: H0,
  clone: W0,
  datum: G0,
  on: X0,
  dispatch: Q0,
  [Symbol.iterator]: ep
};
function St(e) {
  return typeof e == "string" ? new dt([[document.querySelector(e)]], [document.documentElement]) : new dt([[e]], td);
}
function nd(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function vt(e, t) {
  if (e = nd(e), t === void 0 && (t = e.currentTarget), t) {
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
function np(e, t) {
  return e.target && (e = nd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => vt(n, t));
}
const rp = { passive: !1 }, jr = { capture: !0, passive: !1 };
function fs(e) {
  e.stopImmediatePropagation();
}
function sr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function rd(e) {
  var t = e.document.documentElement, n = St(e).on("dragstart.drag", sr, jr);
  "onselectstart" in t ? n.on("selectstart.drag", sr, jr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function id(e, t) {
  var n = e.document.documentElement, r = St(e).on("dragstart.drag", null);
  t && (r.on("click.drag", sr, jr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ci = (e) => () => e;
function Hs(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: s,
  y: l,
  dx: a,
  dy: u,
  dispatch: c
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
Hs.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ip(e) {
  return !e.ctrlKey && !e.button;
}
function op() {
  return this.parentNode;
}
function sp(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function lp() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ap() {
  var e = ip, t = op, n = sp, r = lp, i = {}, o = ri("start", "drag", "end"), s = 0, l, a, u, c, f = 0;
  function d(y) {
    y.on("mousedown.drag", h).filter(r).on("touchstart.drag", p).on("touchmove.drag", v, rp).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(y, C) {
    if (!(c || !e.call(this, y, C))) {
      var T = k(this, t.call(this, y, C), y, C, "mouse");
      T && (St(y.view).on("mousemove.drag", g, jr).on("mouseup.drag", m, jr), rd(y.view), fs(y), u = !1, l = y.clientX, a = y.clientY, T("start", y));
    }
  }
  function g(y) {
    if (sr(y), !u) {
      var C = y.clientX - l, T = y.clientY - a;
      u = C * C + T * T > f;
    }
    i.mouse("drag", y);
  }
  function m(y) {
    St(y.view).on("mousemove.drag mouseup.drag", null), id(y.view, u), sr(y), i.mouse("end", y);
  }
  function p(y, C) {
    if (e.call(this, y, C)) {
      var T = y.changedTouches, E = t.call(this, y, C), P = T.length, O, F;
      for (O = 0; O < P; ++O)
        (F = k(this, E, y, C, T[O].identifier, T[O])) && (fs(y), F("start", y, T[O]));
    }
  }
  function v(y) {
    var C = y.changedTouches, T = C.length, E, P;
    for (E = 0; E < T; ++E)
      (P = i[C[E].identifier]) && (sr(y), P("drag", y, C[E]));
  }
  function b(y) {
    var C = y.changedTouches, T = C.length, E, P;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), E = 0; E < T; ++E)
      (P = i[C[E].identifier]) && (fs(y), P("end", y, C[E]));
  }
  function k(y, C, T, E, P, O) {
    var F = o.copy(), j = vt(O || T, C), R, N, _;
    if ((_ = n.call(y, new Hs("beforestart", {
      sourceEvent: T,
      target: d,
      identifier: P,
      active: s,
      x: j[0],
      y: j[1],
      dx: 0,
      dy: 0,
      dispatch: F
    }), E)) != null)
      return R = _.x - j[0] || 0, N = _.y - j[1] || 0, function B(V, H, z) {
        var K = j, X;
        switch (V) {
          case "start":
            i[P] = B, X = s++;
            break;
          case "end":
            delete i[P], --s;
          case "drag":
            j = vt(z || H, C), X = s;
            break;
        }
        F.call(
          V,
          y,
          new Hs(V, {
            sourceEvent: H,
            subject: _,
            target: d,
            identifier: P,
            active: X,
            x: j[0] + R,
            y: j[1] + N,
            dx: j[0] - K[0],
            dy: j[1] - K[1],
            dispatch: F
          }),
          E
        );
      };
  }
  return d.filter = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : Ci(!!y), d) : e;
  }, d.container = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : Ci(y), d) : t;
  }, d.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Ci(y), d) : n;
  }, d.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : Ci(!!y), d) : r;
  }, d.on = function() {
    var y = o.on.apply(o, arguments);
    return y === o ? d : y;
  }, d.clickDistance = function(y) {
    return arguments.length ? (f = (y = +y) * y, d) : Math.sqrt(f);
  }, d;
}
function Hl(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function od(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t)
    n[r] = t[r];
  return n;
}
function oi() {
}
var Wr = 0.7, ro = 1 / Wr, lr = "\\s*([+-]?\\d+)\\s*", Gr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", up = /^#([0-9a-f]{3,8})$/, cp = new RegExp(`^rgb\\(${lr},${lr},${lr}\\)$`), fp = new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`), dp = new RegExp(`^rgba\\(${lr},${lr},${lr},${Gr}\\)$`), hp = new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${Gr}\\)$`), gp = new RegExp(`^hsl\\(${Gr},${Ft},${Ft}\\)$`), mp = new RegExp(`^hsla\\(${Gr},${Ft},${Ft},${Gr}\\)$`), fu = {
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
Hl(oi, Ur, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: du,
  // Deprecated! Use color.formatHex.
  formatHex: du,
  formatHex8: vp,
  formatHsl: pp,
  formatRgb: hu,
  toString: hu
});
function du() {
  return this.rgb().formatHex();
}
function vp() {
  return this.rgb().formatHex8();
}
function pp() {
  return sd(this).formatHsl();
}
function hu() {
  return this.rgb().formatRgb();
}
function Ur(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = up.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? gu(t) : n === 3 ? new tt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Si(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Si(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = cp.exec(e)) ? new tt(t[1], t[2], t[3], 1) : (t = fp.exec(e)) ? new tt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = dp.exec(e)) ? Si(t[1], t[2], t[3], t[4]) : (t = hp.exec(e)) ? Si(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = gp.exec(e)) ? pu(t[1], t[2] / 100, t[3] / 100, 1) : (t = mp.exec(e)) ? pu(t[1], t[2] / 100, t[3] / 100, t[4]) : fu.hasOwnProperty(e) ? gu(fu[e]) : e === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function gu(e) {
  return new tt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Si(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new tt(e, t, n, r);
}
function yp(e) {
  return e instanceof oi || (e = Ur(e)), e ? (e = e.rgb(), new tt(e.r, e.g, e.b, e.opacity)) : new tt();
}
function zs(e, t, n, r) {
  return arguments.length === 1 ? yp(e) : new tt(e, t, n, r ?? 1);
}
function tt(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Hl(tt, zs, od(oi, {
  brighter(e) {
    return e = e == null ? ro : Math.pow(ro, e), new tt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wr : Math.pow(Wr, e), new tt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new tt(Fn(this.r), Fn(this.g), Fn(this.b), io(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: mu,
  // Deprecated! Use color.formatHex.
  formatHex: mu,
  formatHex8: wp,
  formatRgb: vu,
  toString: vu
}));
function mu() {
  return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}`;
}
function wp() {
  return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}${Pn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vu() {
  const e = io(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Fn(this.r)}, ${Fn(this.g)}, ${Fn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function io(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Fn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pn(e) {
  return e = Fn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function pu(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new kt(e, t, n, r);
}
function sd(e) {
  if (e instanceof kt)
    return new kt(e.h, e.s, e.l, e.opacity);
  if (e instanceof oi || (e = Ur(e)), !e)
    return new kt();
  if (e instanceof kt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), o = Math.max(t, n, r), s = NaN, l = o - i, a = (o + i) / 2;
  return l ? (t === o ? s = (n - r) / l + (n < r) * 6 : n === o ? s = (r - t) / l + 2 : s = (t - n) / l + 4, l /= a < 0.5 ? o + i : 2 - o - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new kt(s, l, a, e.opacity);
}
function bp(e, t, n, r) {
  return arguments.length === 1 ? sd(e) : new kt(e, t, n, r ?? 1);
}
function kt(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Hl(kt, bp, od(oi, {
  brighter(e) {
    return e = e == null ? ro : Math.pow(ro, e), new kt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wr : Math.pow(Wr, e), new kt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new tt(
      ds(e >= 240 ? e - 240 : e + 120, i, r),
      ds(e, i, r),
      ds(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new kt(yu(this.h), ki(this.s), ki(this.l), io(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = io(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${yu(this.h)}, ${ki(this.s) * 100}%, ${ki(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function yu(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ki(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ds(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ld = (e) => () => e;
function _p(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function xp(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function Cp(e) {
  return (e = +e) == 1 ? ad : function(t, n) {
    return n - t ? xp(t, n, e) : ld(isNaN(t) ? n : t);
  };
}
function ad(e, t) {
  var n = t - e;
  return n ? _p(e, n) : ld(isNaN(e) ? t : e);
}
const wu = function e(t) {
  var n = Cp(t);
  function r(i, o) {
    var s = n((i = zs(i)).r, (o = zs(o)).r), l = n(i.g, o.g), a = n(i.b, o.b), u = ad(i.opacity, o.opacity);
    return function(c) {
      return i.r = s(c), i.g = l(c), i.b = a(c), i.opacity = u(c), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function dn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var js = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hs = new RegExp(js.source, "g");
function Sp(e) {
  return function() {
    return e;
  };
}
function kp(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ep(e, t) {
  var n = js.lastIndex = hs.lastIndex = 0, r, i, o, s = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (r = js.exec(e)) && (i = hs.exec(t)); )
    (o = i.index) > n && (o = t.slice(n, o), l[s] ? l[s] += o : l[++s] = o), (r = r[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: dn(r, i) })), n = hs.lastIndex;
  return n < t.length && (o = t.slice(n), l[s] ? l[s] += o : l[++s] = o), l.length < 2 ? a[0] ? kp(a[0].x) : Sp(t) : (t = a.length, function(u) {
    for (var c = 0, f; c < t; ++c)
      l[(f = a[c]).i] = f.x(u);
    return l.join("");
  });
}
var bu = 180 / Math.PI, Ws = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ud(e, t, n, r, i, o) {
  var s, l, a;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (a = e * n + t * r) && (n -= e * a, r -= t * a), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, a /= l), e * r < t * n && (e = -e, t = -t, a = -a, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(t, e) * bu,
    skewX: Math.atan(a) * bu,
    scaleX: s,
    scaleY: l
  };
}
var Ei;
function Lp(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ws : ud(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Mp(e) {
  return e == null || (Ei || (Ei = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ei.setAttribute("transform", e), !(e = Ei.transform.baseVal.consolidate())) ? Ws : (e = e.matrix, ud(e.a, e.b, e.c, e.d, e.e, e.f));
}
function cd(e, t, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, f, d, h, g) {
    if (u !== f || c !== d) {
      var m = h.push("translate(", null, t, null, n);
      g.push({ i: m - 4, x: dn(u, f) }, { i: m - 2, x: dn(c, d) });
    } else
      (f || d) && h.push("translate(" + f + t + d + n);
  }
  function s(u, c, f, d) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: dn(u, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function l(u, c, f, d) {
    u !== c ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: dn(u, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function a(u, c, f, d, h, g) {
    if (u !== f || c !== d) {
      var m = h.push(i(h) + "scale(", null, ",", null, ")");
      g.push({ i: m - 4, x: dn(u, f) }, { i: m - 2, x: dn(c, d) });
    } else
      (f !== 1 || d !== 1) && h.push(i(h) + "scale(" + f + "," + d + ")");
  }
  return function(u, c) {
    var f = [], d = [];
    return u = e(u), c = e(c), o(u.translateX, u.translateY, c.translateX, c.translateY, f, d), s(u.rotate, c.rotate, f, d), l(u.skewX, c.skewX, f, d), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, d), u = c = null, function(h) {
      for (var g = -1, m = d.length, p; ++g < m; )
        f[(p = d[g]).i] = p.x(h);
      return f.join("");
    };
  };
}
var Tp = cd(Lp, "px, ", "px)", "deg)"), Vp = cd(Mp, ", ", ")", ")"), Ip = 1e-12;
function _u(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function $p(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ap(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Pp = function e(t, n, r) {
  function i(o, s) {
    var l = o[0], a = o[1], u = o[2], c = s[0], f = s[1], d = s[2], h = c - l, g = f - a, m = h * h + g * g, p, v;
    if (m < Ip)
      v = Math.log(d / u) / t, p = function(E) {
        return [
          l + E * h,
          a + E * g,
          u * Math.exp(t * E * v)
        ];
      };
    else {
      var b = Math.sqrt(m), k = (d * d - u * u + r * m) / (2 * u * n * b), y = (d * d - u * u - r * m) / (2 * d * n * b), C = Math.log(Math.sqrt(k * k + 1) - k), T = Math.log(Math.sqrt(y * y + 1) - y);
      v = (T - C) / t, p = function(E) {
        var P = E * v, O = _u(C), F = u / (n * b) * (O * Ap(t * P + C) - $p(C));
        return [
          l + F * h,
          a + F * g,
          u * O / _u(t * P + C)
        ];
      };
    }
    return p.duration = v * 1e3 * t / Math.SQRT2, p;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), l = s * s, a = l * l;
    return e(s, l, a);
  }, i;
}(Math.SQRT2, 2, 4);
var hr = 0, Tr = 0, kr = 0, fd = 1e3, oo, Vr, so = 0, zn = 0, Ro = 0, qr = typeof performance == "object" && performance.now ? performance : Date, dd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zl() {
  return zn || (dd(Rp), zn = qr.now() + Ro);
}
function Rp() {
  zn = 0;
}
function lo() {
  this._call = this._time = this._next = null;
}
lo.prototype = jl.prototype = {
  constructor: lo,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? zl() : +n) + (t == null ? 0 : +t), !this._next && Vr !== this && (Vr ? Vr._next = this : oo = this, Vr = this), this._call = e, this._time = n, Gs();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Gs());
  }
};
function jl(e, t, n) {
  var r = new lo();
  return r.restart(e, t, n), r;
}
function Np() {
  zl(), ++hr;
  for (var e = oo, t; e; )
    (t = zn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --hr;
}
function xu() {
  zn = (so = qr.now()) + Ro, hr = Tr = 0;
  try {
    Np();
  } finally {
    hr = 0, Fp(), zn = 0;
  }
}
function Op() {
  var e = qr.now(), t = e - so;
  t > fd && (Ro -= t, so = e);
}
function Fp() {
  for (var e, t = oo, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : oo = n);
  Vr = e, Gs(r);
}
function Gs(e) {
  if (!hr) {
    Tr && (Tr = clearTimeout(Tr));
    var t = e - zn;
    t > 24 ? (e < 1 / 0 && (Tr = setTimeout(xu, e - qr.now() - Ro)), kr && (kr = clearInterval(kr))) : (kr || (so = qr.now(), kr = setInterval(Op, fd)), hr = 1, dd(xu));
  }
}
function Cu(e, t, n) {
  var r = new lo();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var Bp = ri("start", "end", "cancel", "interrupt"), Dp = [], hd = 0, Su = 1, Us = 2, Di = 3, ku = 4, qs = 5, Hi = 6;
function No(e, t, n, r, i, o) {
  var s = e.__transition;
  if (!s)
    e.__transition = {};
  else if (n in s)
    return;
  Hp(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Bp,
    tween: Dp,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: hd
  });
}
function Wl(e, t) {
  var n = Tt(e, t);
  if (n.state > hd)
    throw new Error("too late; already scheduled");
  return n;
}
function Dt(e, t) {
  var n = Tt(e, t);
  if (n.state > Di)
    throw new Error("too late; already running");
  return n;
}
function Tt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function Hp(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = jl(o, 0, n.time);
  function o(u) {
    n.state = Su, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var c, f, d, h;
    if (n.state !== Su)
      return a();
    for (c in r)
      if (h = r[c], h.name === n.name) {
        if (h.state === Di)
          return Cu(s);
        h.state === ku ? (h.state = Hi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[c]) : +c < t && (h.state = Hi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[c]);
      }
    if (Cu(function() {
      n.state === Di && (n.state = ku, n.timer.restart(l, n.delay, n.time), l(u));
    }), n.state = Us, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Us) {
      for (n.state = Di, i = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = qs, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(e, c);
    n.state === qs && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Hi, n.timer.stop(), delete r[t];
    for (var u in r)
      return;
    delete e.__transition;
  }
}
function zi(e, t) {
  var n = e.__transition, r, i, o = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((r = n[s]).name !== t) {
        o = !1;
        continue;
      }
      i = r.state > Us && r.state < qs, r.state = Hi, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[s];
    }
    o && delete e.__transition;
  }
}
function zp(e) {
  return this.each(function() {
    zi(this, e);
  });
}
function jp(e, t) {
  var n, r;
  return function() {
    var i = Dt(this, e), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, l = r.length; s < l; ++s)
        if (r[s].name === t) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Wp(e, t, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = Dt(this, e), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var l = { name: t, value: n }, a = 0, u = i.length; a < u; ++a)
        if (i[a].name === t) {
          i[a] = l;
          break;
        }
      a === u && i.push(l);
    }
    o.tween = i;
  };
}
function Gp(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = Tt(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? jp : Wp)(n, e, t));
}
function Gl(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = Dt(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return Tt(i, r).value[t];
  };
}
function gd(e, t) {
  var n;
  return (typeof t == "number" ? dn : t instanceof Ur ? wu : (n = Ur(t)) ? (t = n, wu) : Ep)(e, t);
}
function Up(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function qp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yp(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function Kp(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function Xp(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function Zp(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function Jp(e, t) {
  var n = Po(e), r = n === "transform" ? Vp : gd;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Zp : Xp)(n, r, Gl(this, "attr." + e, t)) : t == null ? (n.local ? qp : Up)(n) : (n.local ? Kp : Yp)(n, r, t));
}
function Qp(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function e1(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function t1(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && e1(e, o)), n;
  }
  return i._value = t, i;
}
function n1(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && Qp(e, o)), n;
  }
  return i._value = t, i;
}
function r1(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var r = Po(e);
  return this.tween(n, (r.local ? t1 : n1)(r, t));
}
function i1(e, t) {
  return function() {
    Wl(this, e).delay = +t.apply(this, arguments);
  };
}
function o1(e, t) {
  return t = +t, function() {
    Wl(this, e).delay = t;
  };
}
function s1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? i1 : o1)(t, e)) : Tt(this.node(), t).delay;
}
function l1(e, t) {
  return function() {
    Dt(this, e).duration = +t.apply(this, arguments);
  };
}
function a1(e, t) {
  return t = +t, function() {
    Dt(this, e).duration = t;
  };
}
function u1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? l1 : a1)(t, e)) : Tt(this.node(), t).duration;
}
function c1(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Dt(this, e).ease = t;
  };
}
function f1(e) {
  var t = this._id;
  return arguments.length ? this.each(c1(t, e)) : Tt(this.node(), t).ease;
}
function d1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Dt(this, e).ease = n;
  };
}
function h1(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(d1(this._id, e));
}
function g1(e) {
  typeof e != "function" && (e = Uf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new Xt(r, this._parents, this._name, this._id);
}
function m1(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), s = new Array(r), l = 0; l < o; ++l)
    for (var a = t[l], u = n[l], c = a.length, f = s[l] = new Array(c), d, h = 0; h < c; ++h)
      (d = a[h] || u[h]) && (f[h] = d);
  for (; l < r; ++l)
    s[l] = t[l];
  return new Xt(s, this._parents, this._name, this._id);
}
function v1(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function p1(e, t, n) {
  var r, i, o = v1(t) ? Wl : Dt;
  return function() {
    var s = o(this, e), l = s.on;
    l !== r && (i = (r = l).copy()).on(t, n), s.on = i;
  };
}
function y1(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Tt(this.node(), n).on.on(e) : this.each(p1(n, e, t));
}
function w1(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function b1() {
  return this.on("end.remove", w1(this._id));
}
function _1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Bl(e));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var l = r[s], a = l.length, u = o[s] = new Array(a), c, f, d = 0; d < a; ++d)
      (c = l[d]) && (f = e.call(c, c.__data__, d, l)) && ("__data__" in c && (f.__data__ = c.__data__), u[d] = f, No(u[d], t, n, d, u, Tt(c, n)));
  return new Xt(o, this._parents, t, n);
}
function x1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Gf(e));
  for (var r = this._groups, i = r.length, o = [], s = [], l = 0; l < i; ++l)
    for (var a = r[l], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var d = e.call(c, c.__data__, f, a), h, g = Tt(c, n), m = 0, p = d.length; m < p; ++m)
          (h = d[m]) && No(h, t, n, m, d, g);
        o.push(d), s.push(c);
      }
  return new Xt(o, s, t, n);
}
var C1 = ii.prototype.constructor;
function S1() {
  return new C1(this._groups, this._parents);
}
function k1(e, t) {
  var n, r, i;
  return function() {
    var o = dr(this, e), s = (this.style.removeProperty(e), dr(this, e));
    return o === s ? null : o === n && s === r ? i : i = t(n = o, r = s);
  };
}
function md(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function E1(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = dr(this, e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function L1(e, t, n) {
  var r, i, o;
  return function() {
    var s = dr(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), dr(this, e))), s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l));
  };
}
function M1(e, t) {
  var n, r, i, o = "style." + t, s = "end." + o, l;
  return function() {
    var a = Dt(this, e), u = a.on, c = a.value[o] == null ? l || (l = md(t)) : void 0;
    (u !== n || i !== c) && (r = (n = u).copy()).on(s, i = c), a.on = r;
  };
}
function T1(e, t, n) {
  var r = (e += "") == "transform" ? Tp : gd;
  return t == null ? this.styleTween(e, k1(e, r)).on("end.style." + e, md(e)) : typeof t == "function" ? this.styleTween(e, L1(e, r, Gl(this, "style." + e, t))).each(M1(this._id, e)) : this.styleTween(e, E1(e, r, t), n).on("end.style." + e, null);
}
function V1(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function I1(e, t, n) {
  var r, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (r = (i = s) && V1(e, s, n)), r;
  }
  return o._value = t, o;
}
function $1(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, I1(e, t, n ?? ""));
}
function A1(e) {
  return function() {
    this.textContent = e;
  };
}
function P1(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function R1(e) {
  return this.tween("text", typeof e == "function" ? P1(Gl(this, "text", e)) : A1(e == null ? "" : e + ""));
}
function N1(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function O1(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && N1(i)), t;
  }
  return r._value = e, r;
}
function F1(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, O1(e));
}
function B1() {
  for (var e = this._name, t = this._id, n = vd(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      if (a = s[u]) {
        var c = Tt(a, t);
        No(a, e, n, u, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Xt(r, this._parents, e, n);
}
function D1() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = Dt(this, r), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), u.on = t;
    }), i === 0 && o();
  });
}
var H1 = 0;
function Xt(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function vd() {
  return ++H1;
}
var jt = ii.prototype;
Xt.prototype = {
  constructor: Xt,
  select: _1,
  selectAll: x1,
  selectChild: jt.selectChild,
  selectChildren: jt.selectChildren,
  filter: g1,
  merge: m1,
  selection: S1,
  transition: B1,
  call: jt.call,
  nodes: jt.nodes,
  node: jt.node,
  size: jt.size,
  empty: jt.empty,
  each: jt.each,
  on: y1,
  attr: Jp,
  attrTween: r1,
  style: T1,
  styleTween: $1,
  text: R1,
  textTween: F1,
  remove: b1,
  tween: Gp,
  delay: s1,
  duration: u1,
  ease: f1,
  easeVarying: h1,
  end: D1,
  [Symbol.iterator]: jt[Symbol.iterator]
};
function z1(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var j1 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: z1
};
function W1(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function G1(e) {
  var t, n;
  e instanceof Xt ? (t = e._id, e = e._name) : (t = vd(), (n = j1).time = zl(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && No(a, e, t, u, s, n || W1(a, t));
  return new Xt(r, this._parents, e, t);
}
ii.prototype.interrupt = zp;
ii.prototype.transition = G1;
const Ys = Math.PI, Ks = 2 * Ys, Tn = 1e-6, U1 = Ks - Tn;
function pd(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function q1(e) {
  let t = Math.floor(e);
  if (!(t >= 0))
    throw new Error(`invalid digits: ${e}`);
  if (t > 15)
    return pd;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Y1 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? pd : q1(t);
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
  bezierCurveTo(t, n, r, i, o, s) {
    this._append`C${+t},${+n},${+r},${+i},${this._x1 = +o},${this._y1 = +s}`;
  }
  arcTo(t, n, r, i, o) {
    if (t = +t, n = +n, r = +r, i = +i, o = +o, o < 0)
      throw new Error(`negative radius: ${o}`);
    let s = this._x1, l = this._y1, a = r - t, u = i - n, c = s - t, f = l - n, d = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (d > Tn)
      if (!(Math.abs(f * a - u * c) > Tn) || !o)
        this._append`L${this._x1 = t},${this._y1 = n}`;
      else {
        let h = r - s, g = i - l, m = a * a + u * u, p = h * h + g * g, v = Math.sqrt(m), b = Math.sqrt(d), k = o * Math.tan((Ys - Math.acos((m + d - p) / (2 * v * b))) / 2), y = k / b, C = k / v;
        Math.abs(y - 1) > Tn && this._append`L${t + y * c},${n + y * f}`, this._append`A${o},${o},0,0,${+(f * h > c * g)},${this._x1 = t + C * a},${this._y1 = n + C * u}`;
      }
  }
  arc(t, n, r, i, o, s) {
    if (t = +t, n = +n, r = +r, s = !!s, r < 0)
      throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), u = t + l, c = n + a, f = 1 ^ s, d = s ? i - o : o - i;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > Tn || Math.abs(this._y1 - c) > Tn) && this._append`L${u},${c}`, r && (d < 0 && (d = d % Ks + Ks), d > U1 ? this._append`A${r},${r},0,1,${f},${t - l},${n - a}A${r},${r},0,1,${f},${this._x1 = u},${this._y1 = c}` : d > Tn && this._append`A${r},${r},0,${+(d >= Ys)},${f},${this._x1 = t + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(t, n, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function K1(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return yd(this.cover(t, n), t, n, e);
}
function yd(e, t, n, r) {
  if (isNaN(t) || isNaN(n))
    return e;
  var i, o = e._root, s = { data: r }, l = e._x0, a = e._y0, u = e._x1, c = e._y1, f, d, h, g, m, p, v, b;
  if (!o)
    return e._root = s, e;
  for (; o.length; )
    if ((m = t >= (f = (l + u) / 2)) ? l = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d, i = o, !(o = o[v = p << 1 | m]))
      return i[v] = s, e;
  if (h = +e._x.call(null, o.data), g = +e._y.call(null, o.data), t === h && n === g)
    return s.next = o, i ? i[v] = s : e._root = s, e;
  do
    i = i ? i[v] = new Array(4) : e._root = new Array(4), (m = t >= (f = (l + u) / 2)) ? l = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d;
  while ((v = p << 1 | m) === (b = (g >= d) << 1 | h >= f));
  return i[b] = o, i[v] = s, e;
}
function X1(e) {
  var t, n, r = e.length, i, o, s = new Array(r), l = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (s[n] = i, l[n] = o, i < a && (a = i), i > c && (c = i), o < u && (u = o), o > f && (f = o));
  if (a > c || u > f)
    return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < r; ++n)
    yd(this, s[n], l[n], e[n]);
  return this;
}
function Z1(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t))
    return this;
  var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(e)) + 1, o = (r = Math.floor(t)) + 1;
  else {
    for (var s = i - n || 1, l = this._root, a, u; n > e || e >= i || r > t || t >= o; )
      switch (u = (t < r) << 1 | e < n, a = new Array(4), a[u] = l, l = a, s *= 2, u) {
        case 0:
          i = n + s, o = r + s;
          break;
        case 1:
          n = i - s, o = r + s;
          break;
        case 2:
          i = n + s, r = o - s;
          break;
        case 3:
          n = i - s, r = o - s;
          break;
      }
    this._root && this._root.length && (this._root = l);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this;
}
function J1() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length)
      do
        e.push(t.data);
      while (t = t.next);
  }), e;
}
function Q1(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ue(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function ey(e, t, n) {
  var r, i = this._x0, o = this._y0, s, l, a, u, c = this._x1, f = this._y1, d = [], h = this._root, g, m;
  for (h && d.push(new Ue(h, i, o, c, f)), n == null ? n = 1 / 0 : (i = e - n, o = t - n, c = e + n, f = t + n, n *= n); g = d.pop(); )
    if (!(!(h = g.node) || (s = g.x0) > c || (l = g.y0) > f || (a = g.x1) < i || (u = g.y1) < o))
      if (h.length) {
        var p = (s + a) / 2, v = (l + u) / 2;
        d.push(
          new Ue(h[3], p, v, a, u),
          new Ue(h[2], s, v, p, u),
          new Ue(h[1], p, l, a, v),
          new Ue(h[0], s, l, p, v)
        ), (m = (t >= v) << 1 | e >= p) && (g = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - m], d[d.length - 1 - m] = g);
      } else {
        var b = e - +this._x.call(null, h.data), k = t - +this._y.call(null, h.data), y = b * b + k * k;
        if (y < n) {
          var C = Math.sqrt(n = y);
          i = e - C, o = t - C, c = e + C, f = t + C, r = h.data;
        }
      }
  return r;
}
function ty(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(f = +this._y.call(null, e)))
    return this;
  var t, n = this._root, r, i, o, s = this._x0, l = this._y0, a = this._x1, u = this._y1, c, f, d, h, g, m, p, v;
  if (!n)
    return this;
  if (n.length)
    for (; ; ) {
      if ((g = c >= (d = (s + a) / 2)) ? s = d : a = d, (m = f >= (h = (l + u) / 2)) ? l = h : u = h, t = n, !(n = n[p = m << 1 | g]))
        return this;
      if (!n.length)
        break;
      (t[p + 1 & 3] || t[p + 2 & 3] || t[p + 3 & 3]) && (r = t, v = p);
    }
  for (; n.data !== e; )
    if (i = n, !(n = n.next))
      return this;
  return (o = n.next) && delete n.next, i ? (o ? i.next = o : delete i.next, this) : t ? (o ? t[p] = o : delete t[p], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[v] = n : this._root = n), this) : (this._root = o, this);
}
function ny(e) {
  for (var t = 0, n = e.length; t < n; ++t)
    this.remove(e[t]);
  return this;
}
function ry() {
  return this._root;
}
function iy() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length)
      do
        ++e;
      while (t = t.next);
  }), e;
}
function oy(e) {
  var t = [], n, r = this._root, i, o, s, l, a;
  for (r && t.push(new Ue(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, o = n.x0, s = n.y0, l = n.x1, a = n.y1) && r.length) {
      var u = (o + l) / 2, c = (s + a) / 2;
      (i = r[3]) && t.push(new Ue(i, u, c, l, a)), (i = r[2]) && t.push(new Ue(i, o, c, u, a)), (i = r[1]) && t.push(new Ue(i, u, s, l, c)), (i = r[0]) && t.push(new Ue(i, o, s, u, c));
    }
  return this;
}
function sy(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Ue(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, l = r.y0, a = r.x1, u = r.y1, c = (s + a) / 2, f = (l + u) / 2;
      (o = i[0]) && t.push(new Ue(o, s, l, c, f)), (o = i[1]) && t.push(new Ue(o, c, l, a, f)), (o = i[2]) && t.push(new Ue(o, s, f, c, u)), (o = i[3]) && t.push(new Ue(o, c, f, a, u));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function ly(e) {
  return e[0];
}
function ay(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function uy(e) {
  return e[1];
}
function cy(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ul(e, t, n) {
  var r = new ql(t ?? ly, n ?? uy, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function ql(e, t, n, r, i, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function Eu(e) {
  for (var t = { data: e.data }, n = t; e = e.next; )
    n = n.next = { data: e.data };
  return t;
}
var Je = Ul.prototype = ql.prototype;
Je.copy = function() {
  var e = new ql(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t)
    return e;
  if (!t.length)
    return e._root = Eu(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = Eu(r));
  return e;
};
Je.add = K1;
Je.addAll = X1;
Je.cover = Z1;
Je.data = J1;
Je.extent = Q1;
Je.find = ey;
Je.remove = ty;
Je.removeAll = ny;
Je.root = ry;
Je.size = iy;
Je.visit = oy;
Je.visitAfter = sy;
Je.x = ay;
Je.y = cy;
function Ye(e) {
  return function() {
    return e;
  };
}
function hn(e) {
  return (e() - 0.5) * 1e-6;
}
function fy(e) {
  return e.x + e.vx;
}
function dy(e) {
  return e.y + e.vy;
}
function hy(e) {
  var t, n, r, i = 1, o = 1;
  typeof e != "function" && (e = Ye(e == null ? 1 : +e));
  function s() {
    for (var u, c = t.length, f, d, h, g, m, p, v = 0; v < o; ++v)
      for (f = Ul(t, fy, dy).visitAfter(l), u = 0; u < c; ++u)
        d = t[u], m = n[d.index], p = m * m, h = d.x + d.vx, g = d.y + d.vy, f.visit(b);
    function b(k, y, C, T, E) {
      var P = k.data, O = k.r, F = m + O;
      if (P) {
        if (P.index > d.index) {
          var j = h - P.x - P.vx, R = g - P.y - P.vy, N = j * j + R * R;
          N < F * F && (j === 0 && (j = hn(r), N += j * j), R === 0 && (R = hn(r), N += R * R), N = (F - (N = Math.sqrt(N))) / N * i, d.vx += (j *= N) * (F = (O *= O) / (p + O)), d.vy += (R *= N) * F, P.vx -= j * (F = 1 - F), P.vy -= R * F);
        }
        return;
      }
      return y > h + F || T < h - F || C > g + F || E < g - F;
    }
  }
  function l(u) {
    if (u.data)
      return u.r = n[u.data.index];
    for (var c = u.r = 0; c < 4; ++c)
      u[c] && u[c].r > u.r && (u.r = u[c].r);
  }
  function a() {
    if (t) {
      var u, c = t.length, f;
      for (n = new Array(c), u = 0; u < c; ++u)
        f = t[u], n[f.index] = +e(f, u, t);
    }
  }
  return s.initialize = function(u, c) {
    t = u, r = c, a();
  }, s.iterations = function(u) {
    return arguments.length ? (o = +u, s) : o;
  }, s.strength = function(u) {
    return arguments.length ? (i = +u, s) : i;
  }, s.radius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ye(+u), a(), s) : e;
  }, s;
}
function gy(e) {
  return e.index;
}
function Lu(e, t) {
  var n = e.get(t);
  if (!n)
    throw new Error("node not found: " + t);
  return n;
}
function my(e) {
  var t = gy, n = f, r, i = Ye(30), o, s, l, a, u, c = 1;
  e == null && (e = []);
  function f(p) {
    return 1 / Math.min(l[p.source.index], l[p.target.index]);
  }
  function d(p) {
    for (var v = 0, b = e.length; v < c; ++v)
      for (var k = 0, y, C, T, E, P, O, F; k < b; ++k)
        y = e[k], C = y.source, T = y.target, E = T.x + T.vx - C.x - C.vx || hn(u), P = T.y + T.vy - C.y - C.vy || hn(u), O = Math.sqrt(E * E + P * P), O = (O - o[k]) / O * p * r[k], E *= O, P *= O, T.vx -= E * (F = a[k]), T.vy -= P * F, C.vx += E * (F = 1 - F), C.vy += P * F;
  }
  function h() {
    if (s) {
      var p, v = s.length, b = e.length, k = new Map(s.map((C, T) => [t(C, T, s), C])), y;
      for (p = 0, l = new Array(v); p < b; ++p)
        y = e[p], y.index = p, typeof y.source != "object" && (y.source = Lu(k, y.source)), typeof y.target != "object" && (y.target = Lu(k, y.target)), l[y.source.index] = (l[y.source.index] || 0) + 1, l[y.target.index] = (l[y.target.index] || 0) + 1;
      for (p = 0, a = new Array(b); p < b; ++p)
        y = e[p], a[p] = l[y.source.index] / (l[y.source.index] + l[y.target.index]);
      r = new Array(b), g(), o = new Array(b), m();
    }
  }
  function g() {
    if (s)
      for (var p = 0, v = e.length; p < v; ++p)
        r[p] = +n(e[p], p, e);
  }
  function m() {
    if (s)
      for (var p = 0, v = e.length; p < v; ++p)
        o[p] = +i(e[p], p, e);
  }
  return d.initialize = function(p, v) {
    s = p, u = v, h();
  }, d.links = function(p) {
    return arguments.length ? (e = p, h(), d) : e;
  }, d.id = function(p) {
    return arguments.length ? (t = p, d) : t;
  }, d.iterations = function(p) {
    return arguments.length ? (c = +p, d) : c;
  }, d.strength = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Ye(+p), g(), d) : n;
  }, d.distance = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Ye(+p), m(), d) : i;
  }, d;
}
const vy = 1664525, py = 1013904223, Mu = 4294967296;
function yy() {
  let e = 1;
  return () => (e = (vy * e + py) % Mu) / Mu;
}
function wy(e) {
  return e.x;
}
function by(e) {
  return e.y;
}
var _y = 10, xy = Math.PI * (3 - Math.sqrt(5));
function Cy(e) {
  var t, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, l = /* @__PURE__ */ new Map(), a = jl(f), u = ri("tick", "end"), c = yy();
  e == null && (e = []);
  function f() {
    d(), u.call("tick", t), n < r && (a.stop(), u.call("end", t));
  }
  function d(m) {
    var p, v = e.length, b;
    m === void 0 && (m = 1);
    for (var k = 0; k < m; ++k)
      for (n += (o - n) * i, l.forEach(function(y) {
        y(n);
      }), p = 0; p < v; ++p)
        b = e[p], b.fx == null ? b.x += b.vx *= s : (b.x = b.fx, b.vx = 0), b.fy == null ? b.y += b.vy *= s : (b.y = b.fy, b.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, p = e.length, v; m < p; ++m) {
      if (v = e[m], v.index = m, v.fx != null && (v.x = v.fx), v.fy != null && (v.y = v.fy), isNaN(v.x) || isNaN(v.y)) {
        var b = _y * Math.sqrt(0.5 + m), k = m * xy;
        v.x = b * Math.cos(k), v.y = b * Math.sin(k);
      }
      (isNaN(v.vx) || isNaN(v.vy)) && (v.vx = v.vy = 0);
    }
  }
  function g(m) {
    return m.initialize && m.initialize(e, c), m;
  }
  return h(), t = {
    tick: d,
    restart: function() {
      return a.restart(f), t;
    },
    stop: function() {
      return a.stop(), t;
    },
    nodes: function(m) {
      return arguments.length ? (e = m, h(), l.forEach(g), t) : e;
    },
    alpha: function(m) {
      return arguments.length ? (n = +m, t) : n;
    },
    alphaMin: function(m) {
      return arguments.length ? (r = +m, t) : r;
    },
    alphaDecay: function(m) {
      return arguments.length ? (i = +m, t) : +i;
    },
    alphaTarget: function(m) {
      return arguments.length ? (o = +m, t) : o;
    },
    velocityDecay: function(m) {
      return arguments.length ? (s = 1 - m, t) : 1 - s;
    },
    randomSource: function(m) {
      return arguments.length ? (c = m, l.forEach(g), t) : c;
    },
    force: function(m, p) {
      return arguments.length > 1 ? (p == null ? l.delete(m) : l.set(m, g(p)), t) : l.get(m);
    },
    find: function(m, p, v) {
      var b = 0, k = e.length, y, C, T, E, P;
      for (v == null ? v = 1 / 0 : v *= v, b = 0; b < k; ++b)
        E = e[b], y = m - E.x, C = p - E.y, T = y * y + C * C, T < v && (P = E, v = T);
      return P;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function Sy() {
  var e, t, n, r, i = Ye(-30), o, s = 1, l = 1 / 0, a = 0.81;
  function u(h) {
    var g, m = e.length, p = Ul(e, wy, by).visitAfter(f);
    for (r = h, g = 0; g < m; ++g)
      t = e[g], p.visit(d);
  }
  function c() {
    if (e) {
      var h, g = e.length, m;
      for (o = new Array(g), h = 0; h < g; ++h)
        m = e[h], o[m.index] = +i(m, h, e);
    }
  }
  function f(h) {
    var g = 0, m, p, v = 0, b, k, y;
    if (h.length) {
      for (b = k = y = 0; y < 4; ++y)
        (m = h[y]) && (p = Math.abs(m.value)) && (g += m.value, v += p, b += p * m.x, k += p * m.y);
      h.x = b / v, h.y = k / v;
    } else {
      m = h, m.x = m.data.x, m.y = m.data.y;
      do
        g += o[m.data.index];
      while (m = m.next);
    }
    h.value = g;
  }
  function d(h, g, m, p) {
    if (!h.value)
      return !0;
    var v = h.x - t.x, b = h.y - t.y, k = p - g, y = v * v + b * b;
    if (k * k / a < y)
      return y < l && (v === 0 && (v = hn(n), y += v * v), b === 0 && (b = hn(n), y += b * b), y < s && (y = Math.sqrt(s * y)), t.vx += v * h.value * r / y, t.vy += b * h.value * r / y), !0;
    if (h.length || y >= l)
      return;
    (h.data !== t || h.next) && (v === 0 && (v = hn(n), y += v * v), b === 0 && (b = hn(n), y += b * b), y < s && (y = Math.sqrt(s * y)));
    do
      h.data !== t && (k = o[h.data.index] * r / y, t.vx += v * k, t.vy += b * k);
    while (h = h.next);
  }
  return u.initialize = function(h, g) {
    e = h, n = g, c();
  }, u.strength = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Ye(+h), c(), u) : i;
  }, u.distanceMin = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.distanceMax = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function ky(e) {
  var t = Ye(0.1), n, r, i;
  typeof e != "function" && (e = Ye(e == null ? 0 : +e));
  function o(l) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vx += (i[a] - c.x) * r[a] * l;
  }
  function s() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +e(n[l], l, n)) ? 0 : +t(n[l], l, n);
    }
  }
  return o.initialize = function(l) {
    n = l, s();
  }, o.strength = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Ye(+l), s(), o) : t;
  }, o.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Ye(+l), s(), o) : e;
  }, o;
}
function Ey(e) {
  var t = Ye(0.1), n, r, i;
  typeof e != "function" && (e = Ye(e == null ? 0 : +e));
  function o(l) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vy += (i[a] - c.y) * r[a] * l;
  }
  function s() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +e(n[l], l, n)) ? 0 : +t(n[l], l, n);
    }
  }
  return o.initialize = function(l) {
    n = l, s();
  }, o.strength = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Ye(+l), s(), o) : t;
  }, o.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Ye(+l), s(), o) : e;
  }, o;
}
function Xn(e) {
  return function() {
    return e;
  };
}
function Ly(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length)
      return t;
    if (n == null)
      t = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0))
        throw new RangeError(`invalid digits: ${n}`);
      t = r;
    }
    return e;
  }, () => new Y1(t);
}
function My(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function wd(e) {
  this._context = e;
}
wd.prototype = {
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
function Ty(e) {
  return new wd(e);
}
function Vy(e) {
  return e[0];
}
function Iy(e) {
  return e[1];
}
function $y(e, t) {
  var n = Xn(!0), r = null, i = Ty, o = null, s = Ly(l);
  e = typeof e == "function" ? e : e === void 0 ? Vy : Xn(e), t = typeof t == "function" ? t : t === void 0 ? Iy : Xn(t);
  function l(a) {
    var u, c = (a = My(a)).length, f, d = !1, h;
    for (r == null && (o = i(h = s())), u = 0; u <= c; ++u)
      !(u < c && n(f = a[u], u, a)) === d && ((d = !d) ? o.lineStart() : o.lineEnd()), d && o.point(+e(f, u, a), +t(f, u, a));
    if (h)
      return o = null, h + "" || null;
  }
  return l.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Xn(+a), l) : e;
  }, l.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Xn(+a), l) : t;
  }, l.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Xn(!!a), l) : n;
  }, l.curve = function(a) {
    return arguments.length ? (i = a, r != null && (o = i(r)), l) : i;
  }, l.context = function(a) {
    return arguments.length ? (a == null ? r = o = null : o = i(r = a), l) : r;
  }, l;
}
const Li = (e) => () => e;
function Ay(e, {
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
function Gt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
Gt.prototype = {
  constructor: Gt,
  scale: function(e) {
    return e === 1 ? this : new Gt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Gt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var bd = new Gt(1, 0, 0);
Gt.prototype;
function gs(e) {
  e.stopImmediatePropagation();
}
function Er(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Py(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ry() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Tu() {
  return this.__zoom || bd;
}
function Ny(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Oy() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fy(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function By() {
  var e = Py, t = Ry, n = Fy, r = Ny, i = Oy, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Pp, u = ri("start", "zoom", "end"), c, f, d, h = 500, g = 150, m = 0, p = 10;
  function v(_) {
    _.property("__zoom", Tu).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", F).filter(i).on("touchstart.zoom", j).on("touchmove.zoom", R).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(_, B, V, H) {
    var z = _.selection ? _.selection() : _;
    z.property("__zoom", Tu), _ !== z ? C(_, B, V, H) : z.interrupt().each(function() {
      T(this, arguments).event(H).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, v.scaleBy = function(_, B, V, H) {
    v.scaleTo(_, function() {
      var z = this.__zoom.k, K = typeof B == "function" ? B.apply(this, arguments) : B;
      return z * K;
    }, V, H);
  }, v.scaleTo = function(_, B, V, H) {
    v.transform(_, function() {
      var z = t.apply(this, arguments), K = this.__zoom, X = V == null ? y(z) : typeof V == "function" ? V.apply(this, arguments) : V, q = K.invert(X), J = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(k(b(K, J), X, q), z, s);
    }, V, H);
  }, v.translateBy = function(_, B, V, H) {
    v.transform(_, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof V == "function" ? V.apply(this, arguments) : V
      ), t.apply(this, arguments), s);
    }, null, H);
  }, v.translateTo = function(_, B, V, H, z) {
    v.transform(_, function() {
      var K = t.apply(this, arguments), X = this.__zoom, q = H == null ? y(K) : typeof H == "function" ? H.apply(this, arguments) : H;
      return n(bd.translate(q[0], q[1]).scale(X.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof V == "function" ? -V.apply(this, arguments) : -V
      ), K, s);
    }, H, z);
  };
  function b(_, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === _.k ? _ : new Gt(B, _.x, _.y);
  }
  function k(_, B, V) {
    var H = B[0] - V[0] * _.k, z = B[1] - V[1] * _.k;
    return H === _.x && z === _.y ? _ : new Gt(_.k, H, z);
  }
  function y(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function C(_, B, V, H) {
    _.on("start.zoom", function() {
      T(this, arguments).event(H).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(H).end();
    }).tween("zoom", function() {
      var z = this, K = arguments, X = T(z, K).event(H), q = t.apply(z, K), J = V == null ? y(q) : typeof V == "function" ? V.apply(z, K) : V, te = Math.max(q[1][0] - q[0][0], q[1][1] - q[0][1]), ue = z.__zoom, xe = typeof B == "function" ? B.apply(z, K) : B, he = a(ue.invert(J).concat(te / ue.k), xe.invert(J).concat(te / xe.k));
      return function(Ce) {
        if (Ce === 1)
          Ce = xe;
        else {
          var Oe = he(Ce), wt = te / Oe[2];
          Ce = new Gt(wt, J[0] - Oe[0] * wt, J[1] - Oe[1] * wt);
        }
        X.zoom(null, Ce);
      };
    });
  }
  function T(_, B, V) {
    return !V && _.__zooming || new E(_, B);
  }
  function E(_, B) {
    this.that = _, this.args = B, this.active = 0, this.sourceEvent = null, this.extent = t.apply(_, B), this.taps = 0;
  }
  E.prototype = {
    event: function(_) {
      return _ && (this.sourceEvent = _), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(_, B) {
      return this.mouse && _ !== "mouse" && (this.mouse[1] = B.invert(this.mouse[0])), this.touch0 && _ !== "touch" && (this.touch0[1] = B.invert(this.touch0[0])), this.touch1 && _ !== "touch" && (this.touch1[1] = B.invert(this.touch1[0])), this.that.__zoom = B, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(_) {
      var B = St(this.that).datum();
      u.call(
        _,
        this.that,
        new Ay(_, {
          sourceEvent: this.sourceEvent,
          target: v,
          type: _,
          transform: this.that.__zoom,
          dispatch: u
        }),
        B
      );
    }
  };
  function P(_, ...B) {
    if (!e.apply(this, arguments))
      return;
    var V = T(this, B).event(_), H = this.__zoom, z = Math.max(o[0], Math.min(o[1], H.k * Math.pow(2, r.apply(this, arguments)))), K = vt(_);
    if (V.wheel)
      (V.mouse[0][0] !== K[0] || V.mouse[0][1] !== K[1]) && (V.mouse[1] = H.invert(V.mouse[0] = K)), clearTimeout(V.wheel);
    else {
      if (H.k === z)
        return;
      V.mouse = [K, H.invert(K)], zi(this), V.start();
    }
    Er(_), V.wheel = setTimeout(X, g), V.zoom("mouse", n(k(b(H, z), V.mouse[0], V.mouse[1]), V.extent, s));
    function X() {
      V.wheel = null, V.end();
    }
  }
  function O(_, ...B) {
    if (d || !e.apply(this, arguments))
      return;
    var V = _.currentTarget, H = T(this, B, !0).event(_), z = St(_.view).on("mousemove.zoom", J, !0).on("mouseup.zoom", te, !0), K = vt(_, V), X = _.clientX, q = _.clientY;
    rd(_.view), gs(_), H.mouse = [K, this.__zoom.invert(K)], zi(this), H.start();
    function J(ue) {
      if (Er(ue), !H.moved) {
        var xe = ue.clientX - X, he = ue.clientY - q;
        H.moved = xe * xe + he * he > m;
      }
      H.event(ue).zoom("mouse", n(k(H.that.__zoom, H.mouse[0] = vt(ue, V), H.mouse[1]), H.extent, s));
    }
    function te(ue) {
      z.on("mousemove.zoom mouseup.zoom", null), id(ue.view, H.moved), Er(ue), H.event(ue).end();
    }
  }
  function F(_, ...B) {
    if (e.apply(this, arguments)) {
      var V = this.__zoom, H = vt(_.changedTouches ? _.changedTouches[0] : _, this), z = V.invert(H), K = V.k * (_.shiftKey ? 0.5 : 2), X = n(k(b(V, K), H, z), t.apply(this, B), s);
      Er(_), l > 0 ? St(this).transition().duration(l).call(C, X, H, _) : St(this).call(v.transform, X, H, _);
    }
  }
  function j(_, ...B) {
    if (e.apply(this, arguments)) {
      var V = _.touches, H = V.length, z = T(this, B, _.changedTouches.length === H).event(_), K, X, q, J;
      for (gs(_), X = 0; X < H; ++X)
        q = V[X], J = vt(q, this), J = [J, this.__zoom.invert(J), q.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== J[2] && (z.touch1 = J, z.taps = 0) : (z.touch0 = J, K = !0, z.taps = 1 + !!c);
      c && (c = clearTimeout(c)), K && (z.taps < 2 && (f = J[0], c = setTimeout(function() {
        c = null;
      }, h)), zi(this), z.start());
    }
  }
  function R(_, ...B) {
    if (this.__zooming) {
      var V = T(this, B).event(_), H = _.changedTouches, z = H.length, K, X, q, J;
      for (Er(_), K = 0; K < z; ++K)
        X = H[K], q = vt(X, this), V.touch0 && V.touch0[2] === X.identifier ? V.touch0[0] = q : V.touch1 && V.touch1[2] === X.identifier && (V.touch1[0] = q);
      if (X = V.that.__zoom, V.touch1) {
        var te = V.touch0[0], ue = V.touch0[1], xe = V.touch1[0], he = V.touch1[1], Ce = (Ce = xe[0] - te[0]) * Ce + (Ce = xe[1] - te[1]) * Ce, Oe = (Oe = he[0] - ue[0]) * Oe + (Oe = he[1] - ue[1]) * Oe;
        X = b(X, Math.sqrt(Ce / Oe)), q = [(te[0] + xe[0]) / 2, (te[1] + xe[1]) / 2], J = [(ue[0] + he[0]) / 2, (ue[1] + he[1]) / 2];
      } else if (V.touch0)
        q = V.touch0[0], J = V.touch0[1];
      else
        return;
      V.zoom("touch", n(k(X, q, J), V.extent, s));
    }
  }
  function N(_, ...B) {
    if (this.__zooming) {
      var V = T(this, B).event(_), H = _.changedTouches, z = H.length, K, X;
      for (gs(_), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), K = 0; K < z; ++K)
        X = H[K], V.touch0 && V.touch0[2] === X.identifier ? delete V.touch0 : V.touch1 && V.touch1[2] === X.identifier && delete V.touch1;
      if (V.touch1 && !V.touch0 && (V.touch0 = V.touch1, delete V.touch1), V.touch0)
        V.touch0[1] = this.__zoom.invert(V.touch0[0]);
      else if (V.end(), V.taps === 2 && (X = vt(X, this), Math.hypot(f[0] - X[0], f[1] - X[1]) < p)) {
        var q = St(this).on("dblclick.zoom");
        q && q.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : Li(+_), v) : r;
  }, v.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Li(!!_), v) : e;
  }, v.touchable = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : Li(!!_), v) : i;
  }, v.extent = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Li([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), v) : t;
  }, v.scaleExtent = function(_) {
    return arguments.length ? (o[0] = +_[0], o[1] = +_[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(_) {
    return arguments.length ? (s[0][0] = +_[0][0], s[1][0] = +_[1][0], s[0][1] = +_[0][1], s[1][1] = +_[1][1], v) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, v.constrain = function(_) {
    return arguments.length ? (n = _, v) : n;
  }, v.duration = function(_) {
    return arguments.length ? (l = +_, v) : l;
  }, v.interpolate = function(_) {
    return arguments.length ? (a = _, v) : a;
  }, v.on = function() {
    var _ = u.on.apply(u, arguments);
    return _ === u ? v : _;
  }, v.clickDistance = function(_) {
    return arguments.length ? (m = (_ = +_) * _, v) : Math.sqrt(m);
  }, v.tapDistance = function(_) {
    return arguments.length ? (p = +_, v) : p;
  }, v;
}
class _d {
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
  constructor(t, n, r, i, o, s, l, a) {
    this.id = t, this.idImported = n, this.x = r, this.y = i, this.fx = o, this.fy = s, this.label = l, this.color = a;
  }
}
var st = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(st || {});
class Dy {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source
   * @param target
   * @param pathType
   * @param label
   * @param color The color of the node which was set (for default color this is empty)
   */
  constructor(t, n, r, i, o) {
    Me(this, "id");
    this.source = t, this.target = n, this.pathType = r, this.label = i, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class Vu {
  constructor() {
    Me(this, "nodeIdCounter", 0);
    Me(this, "nodes", []);
    Me(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, r, i, o) {
    const s = new _d(
      this.nodeIdCounter++,
      r,
      t,
      n,
      void 0,
      void 0,
      i,
      o
    );
    return this.nodes.push(s), s;
  }
  createLink(t, n, r, i) {
    if (this.links.find(
      (u) => u.source.id === t && u.target.id === n
    ) !== void 0)
      return;
    const s = this.nodes.find((u) => u.id === t);
    if (s === void 0)
      return;
    const l = this.nodes.find((u) => u.id === n);
    if (l === void 0)
      return;
    const a = new Dy(s, l, void 0, r, i);
    return this.links.push(a), a;
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
      const o = this.links.indexOf(i, 0);
      this.links.splice(o, 1);
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
   * @param color
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(t) {
    for (const n of this.links)
      if (n.color === t)
        return !0;
    return !1;
  }
  /**
   * Get the existing non-default colors of links.
   * @returns An array of strings representing non-default colors, empty if none exist.
   */
  getNonDefaultLinkColors() {
    return this.links.map((t) => t.color).filter((t) => t !== void 0 && t !== "");
  }
  /** Formats the Graph in Trivial Graph Format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, r = !1, i = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "Graph is empty";
    let o, s;
    return o = this.nodes.map((l) => {
      let a = `${l.id}`;
      return t && l.label !== void 0 && (a += ` ${l.label}`), r && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
    }).join(`
`), s = this.links.map((l) => {
      let a = `${l.source.id} ${l.target.id}`;
      return n && l.label !== void 0 && (a += ` ${l.label}`), i && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
    }).join(`
`), `${o}${s ? `
#
` : ""}${s}`;
  }
}
function Hy(e, t) {
  let n = By().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return zy(n, e, t);
}
function zy(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (r) => t(r, !0)) : e.scaleExtent([1, 1]).on("zoom", (r) => t(r, !1));
}
function $n(e) {
  e.preventDefault(), e.stopPropagation();
}
function jy(e, t, n, r) {
  return ap().filter((i) => i.button === 2).on("start", (i, o) => {
    $n(i.sourceEvent), i.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (i, o) => {
    o.fx = Math.max(r, Math.min(t - r, i.x)), o.fy = Math.max(r, Math.min(n - r, i.y));
  }).on("end", (i, o) => {
    i.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function Wy(e, t, n, r, i) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (s) => n(s)).on("pointerup", (s) => r(s)).on("contextmenu", (s) => $n(s)).on("dblclick", (s) => i(s)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function Gy(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function Uy(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function qy(e, t, n) {
  if (Nr(e, t, "link-arrow", "arrow", !1), Nr(e, t, "link-arrow-reverse", "arrow", !0), Nr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let r of n)
      Xs(e, t, r);
}
function Xs(e, t, n) {
  e.select("#link-arrow-" + n).empty() && (Nr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), Nr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow " + n,
    !0,
    n
  ));
}
function Yy(e, t) {
  e.select("#link-arrow-" + t).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + t).select(function() {
    return this.parentNode;
  }).remove();
}
function Nr(e, t, n, r, i, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${$y()(t.arrowPoints)}`).style("fill", o || "");
}
function Ky(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function Xy(e, t, n, r, i) {
  let o = Cy(e.nodes).on("tick", () => i()).force(
    "collision",
    hy().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Zy(e, o, n, r, t), o = Cd(o, e, t, t.fixedLinkDistanceEnabled), o = xd(o, t.nodePhysicsEnabled, n, r), o;
}
function Zy(e, t, n, r, i) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, o.x)), o.y = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, o.y));
  });
}
function xd(e, t, n, r) {
  return t ? e.force("charge", Sy().strength(-500)).force("x", ky(n / 2).strength(0.05)).force("y", Ey(r / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function Cd(e, t, n, r) {
  return r ? e.force(
    "link",
    my().links(t.links).id((i) => i.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class Jy {
  constructor() {
    Me(this, "hasToolbar", !0);
    Me(this, "nodeRadius", 24);
    Me(this, "showNodeLabels", !0);
    Me(this, "nodePhysicsEnabled", !1);
    Me(this, "zoomEnabled", !0);
    Me(this, "showLinkLabels", !0);
    Me(this, "fixedLinkDistanceEnabled", !1);
    Me(this, "markerBoxSize", 4);
    Me(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Me(this, "markerRef", this.markerBoxSize / 2);
    Me(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Me(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
const Qy = Object.prototype.toString;
function ao(e) {
  const t = Qy.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function ew(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ao(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, o = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= r || o > e.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var s = e[r], l = r + 1; l < o; l++)
    e[l] > s && (s = e[l]);
  return s;
}
function tw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ao(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, o = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= r || o > e.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var s = e[r], l = r + 1; l < o; l++)
    e[l] < s && (s = e[l]);
  return s;
}
function Iu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (ao(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else
    throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!ao(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var r = tw(e), i = ew(e);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, s = o === void 0 ? t.autoMinMax ? r : 0 : o, l = t.max, a = l === void 0 ? t.autoMinMax ? i : 1 : l;
  if (s >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - s) / (i - r), c = 0; c < e.length; c++)
    n[c] = (e[c] - r) * u + s;
  return n;
}
const Mi = " ".repeat(2), Sd = " ".repeat(4);
function nw() {
  return kd(this);
}
function kd(e, t = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = t;
  return `${e.constructor.name} {
${Mi}[
${Sd}${rw(e, n, r, i)}
${Mi}]
${Mi}rows: ${e.rows}
${Mi}columns: ${e.columns}
}`;
}
function rw(e, t, n, r) {
  const { rows: i, columns: o } = e, s = Math.min(i, t), l = Math.min(o, n), a = [];
  for (let u = 0; u < s; u++) {
    let c = [];
    for (let f = 0; f < l; f++)
      c.push(iw(e.get(u, f), r));
    a.push(`${c.join(" ")}`);
  }
  return l !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), s !== i && a.push(`... ${i - t} more rows`), a.join(`
${Sd}`);
}
function iw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const r = e.toPrecision(t - 2);
  if (r.length <= t)
    return r;
  const i = e.toExponential(t - 2), o = i.indexOf("e"), s = i.slice(o);
  return i.slice(0, t - s.length) + s;
}
function ow(e, t) {
  e.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, e.prototype.addS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) + r);
    return this;
  }, e.prototype.addM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) + r.get(i, o));
    return this;
  }, e.add = function(r, i) {
    return new t(r).add(i);
  }, e.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, e.prototype.subS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) - r);
    return this;
  }, e.prototype.subM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) - r.get(i, o));
    return this;
  }, e.sub = function(r, i) {
    return new t(r).sub(i);
  }, e.prototype.subtract = e.prototype.sub, e.prototype.subtractS = e.prototype.subS, e.prototype.subtractM = e.prototype.subM, e.subtract = e.sub, e.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, e.prototype.mulS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) * r);
    return this;
  }, e.prototype.mulM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) * r.get(i, o));
    return this;
  }, e.mul = function(r, i) {
    return new t(r).mul(i);
  }, e.prototype.multiply = e.prototype.mul, e.prototype.multiplyS = e.prototype.mulS, e.prototype.multiplyM = e.prototype.mulM, e.multiply = e.mul, e.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, e.prototype.divS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) / r);
    return this;
  }, e.prototype.divM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) / r.get(i, o));
    return this;
  }, e.div = function(r, i) {
    return new t(r).div(i);
  }, e.prototype.divide = e.prototype.div, e.prototype.divideS = e.prototype.divS, e.prototype.divideM = e.prototype.divM, e.divide = e.div, e.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, e.prototype.modS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) % r);
    return this;
  }, e.prototype.modM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) % r.get(i, o));
    return this;
  }, e.mod = function(r, i) {
    return new t(r).mod(i);
  }, e.prototype.modulus = e.prototype.mod, e.prototype.modulusS = e.prototype.modS, e.prototype.modulusM = e.prototype.modM, e.modulus = e.mod, e.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, e.prototype.andS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) & r);
    return this;
  }, e.prototype.andM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) & r.get(i, o));
    return this;
  }, e.and = function(r, i) {
    return new t(r).and(i);
  }, e.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, e.prototype.orS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) | r);
    return this;
  }, e.prototype.orM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) | r.get(i, o));
    return this;
  }, e.or = function(r, i) {
    return new t(r).or(i);
  }, e.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, e.prototype.xorS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) ^ r);
    return this;
  }, e.prototype.xorM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) ^ r.get(i, o));
    return this;
  }, e.xor = function(r, i) {
    return new t(r).xor(i);
  }, e.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, e.prototype.leftShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) << r);
    return this;
  }, e.prototype.leftShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) << r.get(i, o));
    return this;
  }, e.leftShift = function(r, i) {
    return new t(r).leftShift(i);
  }, e.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, e.prototype.signPropagatingRightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >> r);
    return this;
  }, e.prototype.signPropagatingRightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >> r.get(i, o));
    return this;
  }, e.signPropagatingRightShift = function(r, i) {
    return new t(r).signPropagatingRightShift(i);
  }, e.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, e.prototype.rightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >>> r);
    return this;
  }, e.prototype.rightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >>> r.get(i, o));
    return this;
  }, e.rightShift = function(r, i) {
    return new t(r).rightShift(i);
  }, e.prototype.zeroFillRightShift = e.prototype.rightShift, e.prototype.zeroFillRightShiftS = e.prototype.rightShiftS, e.prototype.zeroFillRightShiftM = e.prototype.rightShiftM, e.zeroFillRightShift = e.rightShift, e.prototype.not = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, ~this.get(r, i));
    return this;
  }, e.not = function(r) {
    return new t(r).not();
  }, e.prototype.abs = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.abs(this.get(r, i)));
    return this;
  }, e.abs = function(r) {
    return new t(r).abs();
  }, e.prototype.acos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acos(this.get(r, i)));
    return this;
  }, e.acos = function(r) {
    return new t(r).acos();
  }, e.prototype.acosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acosh(this.get(r, i)));
    return this;
  }, e.acosh = function(r) {
    return new t(r).acosh();
  }, e.prototype.asin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asin(this.get(r, i)));
    return this;
  }, e.asin = function(r) {
    return new t(r).asin();
  }, e.prototype.asinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asinh(this.get(r, i)));
    return this;
  }, e.asinh = function(r) {
    return new t(r).asinh();
  }, e.prototype.atan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atan(this.get(r, i)));
    return this;
  }, e.atan = function(r) {
    return new t(r).atan();
  }, e.prototype.atanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atanh(this.get(r, i)));
    return this;
  }, e.atanh = function(r) {
    return new t(r).atanh();
  }, e.prototype.cbrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cbrt(this.get(r, i)));
    return this;
  }, e.cbrt = function(r) {
    return new t(r).cbrt();
  }, e.prototype.ceil = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.ceil(this.get(r, i)));
    return this;
  }, e.ceil = function(r) {
    return new t(r).ceil();
  }, e.prototype.clz32 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.clz32(this.get(r, i)));
    return this;
  }, e.clz32 = function(r) {
    return new t(r).clz32();
  }, e.prototype.cos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cos(this.get(r, i)));
    return this;
  }, e.cos = function(r) {
    return new t(r).cos();
  }, e.prototype.cosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cosh(this.get(r, i)));
    return this;
  }, e.cosh = function(r) {
    return new t(r).cosh();
  }, e.prototype.exp = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.exp(this.get(r, i)));
    return this;
  }, e.exp = function(r) {
    return new t(r).exp();
  }, e.prototype.expm1 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.expm1(this.get(r, i)));
    return this;
  }, e.expm1 = function(r) {
    return new t(r).expm1();
  }, e.prototype.floor = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.floor(this.get(r, i)));
    return this;
  }, e.floor = function(r) {
    return new t(r).floor();
  }, e.prototype.fround = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.fround(this.get(r, i)));
    return this;
  }, e.fround = function(r) {
    return new t(r).fround();
  }, e.prototype.log = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log(this.get(r, i)));
    return this;
  }, e.log = function(r) {
    return new t(r).log();
  }, e.prototype.log1p = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log1p(this.get(r, i)));
    return this;
  }, e.log1p = function(r) {
    return new t(r).log1p();
  }, e.prototype.log10 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log10(this.get(r, i)));
    return this;
  }, e.log10 = function(r) {
    return new t(r).log10();
  }, e.prototype.log2 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log2(this.get(r, i)));
    return this;
  }, e.log2 = function(r) {
    return new t(r).log2();
  }, e.prototype.round = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.round(this.get(r, i)));
    return this;
  }, e.round = function(r) {
    return new t(r).round();
  }, e.prototype.sign = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sign(this.get(r, i)));
    return this;
  }, e.sign = function(r) {
    return new t(r).sign();
  }, e.prototype.sin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sin(this.get(r, i)));
    return this;
  }, e.sin = function(r) {
    return new t(r).sin();
  }, e.prototype.sinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sinh(this.get(r, i)));
    return this;
  }, e.sinh = function(r) {
    return new t(r).sinh();
  }, e.prototype.sqrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sqrt(this.get(r, i)));
    return this;
  }, e.sqrt = function(r) {
    return new t(r).sqrt();
  }, e.prototype.tan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tan(this.get(r, i)));
    return this;
  }, e.tan = function(r) {
    return new t(r).tan();
  }, e.prototype.tanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tanh(this.get(r, i)));
    return this;
  }, e.tanh = function(r) {
    return new t(r).tanh();
  }, e.prototype.trunc = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.trunc(this.get(r, i)));
    return this;
  }, e.trunc = function(r) {
    return new t(r).trunc();
  }, e.pow = function(r, i) {
    return new t(r).pow(i);
  }, e.prototype.pow = function(r) {
    return typeof r == "number" ? this.powS(r) : this.powM(r);
  }, e.prototype.powS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, Math.pow(this.get(i, o), r));
    return this;
  }, e.prototype.powM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, Math.pow(this.get(i, o), r.get(i, o)));
    return this;
  };
}
function _t(e, t, n) {
  let r = n ? e.rows : e.rows - 1;
  if (t < 0 || t > r)
    throw new RangeError("Row index out of range");
}
function xt(e, t, n) {
  let r = n ? e.columns : e.columns - 1;
  if (t < 0 || t > r)
    throw new RangeError("Column index out of range");
}
function er(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function tr(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function sw(e, t, n) {
  return {
    row: lw(e, t),
    column: aw(e, n)
  };
}
function lw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((r) => r < 0 || r >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function aw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((r) => r < 0 || r >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function $u(e, t, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Ti("startRow", t), Ti("endRow", n), Ti("startColumn", r), Ti("endColumn", i), t > n || r > i || t < 0 || t >= e.rows || n < 0 || n >= e.rows || r < 0 || r >= e.columns || i < 0 || i >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Oo(e, t = 0) {
  let n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
function Ti(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Zn(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function uw(e) {
  let t = Oo(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] += e.get(n, r);
  return t;
}
function cw(e) {
  let t = Oo(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] += e.get(n, r);
  return t;
}
function fw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t += e.get(n, r);
  return t;
}
function dw(e) {
  let t = Oo(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] *= e.get(n, r);
  return t;
}
function hw(e) {
  let t = Oo(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] *= e.get(n, r);
  return t;
}
function gw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t *= e.get(n, r);
  return t;
}
function mw(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < r; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(s, c) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / i) / (i - 1)) : o.push((a - l * l / i) / i);
  }
  return o;
}
function vw(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < i; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(c, s) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / r) / (r - 1)) : o.push((a - l * l / r) / r);
  }
  return o;
}
function pw(e, t, n) {
  const r = e.rows, i = e.columns, o = r * i;
  let s = 0, l = 0, a = 0;
  for (let u = 0; u < r; u++)
    for (let c = 0; c < i; c++)
      a = e.get(u, c) - n, s += a, l += a * a;
  return t ? (l - s * s / o) / (o - 1) : (l - s * s / o) / o;
}
function yw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[n]);
}
function ww(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[r]);
}
function bw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t);
}
function _w(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let r = 0;
    for (let i = 0; i < e.columns; i++)
      r += Math.pow(e.get(n, i), 2) / (e.columns - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function xw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[n]);
}
function Cw(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let r = 0;
    for (let i = 0; i < e.rows; i++)
      r += Math.pow(e.get(i, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function Sw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[r]);
}
function kw(e) {
  const t = e.size - 1;
  let n = 0;
  for (let r = 0; r < e.columns; r++)
    for (let i = 0; i < e.rows; i++)
      n += Math.pow(e.get(i, r), 2) / t;
  return Math.sqrt(n);
}
function Ew(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t);
}
class ge {
  static from1DArray(t, n, r) {
    if (t * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new oe(t, n);
    for (let s = 0; s < t; s++)
      for (let l = 0; l < n; l++)
        o.set(s, l, r[s * n + l]);
    return o;
  }
  static rowVector(t) {
    let n = new oe(1, t.length);
    for (let r = 0; r < t.length; r++)
      n.set(0, r, t[r]);
    return n;
  }
  static columnVector(t) {
    let n = new oe(t.length, 1);
    for (let r = 0; r < t.length; r++)
      n.set(r, 0, t[r]);
    return n;
  }
  static zeros(t, n) {
    return new oe(t, n);
  }
  static ones(t, n) {
    return new oe(t, n).fill(1);
  }
  static rand(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let o = new oe(t, n);
    for (let s = 0; s < t; s++)
      for (let l = 0; l < n; l++)
        o.set(s, l, i());
    return o;
  }
  static randInt(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: i = 0, max: o = 1e3, random: s = Math.random } = r;
    if (!Number.isInteger(i))
      throw new TypeError("min must be an integer");
    if (!Number.isInteger(o))
      throw new TypeError("max must be an integer");
    if (i >= o)
      throw new RangeError("min must be smaller than max");
    let l = o - i, a = new oe(t, n);
    for (let u = 0; u < t; u++)
      for (let c = 0; c < n; c++) {
        let f = i + Math.round(s() * l);
        a.set(u, c, f);
      }
    return a;
  }
  static eye(t, n, r) {
    n === void 0 && (n = t), r === void 0 && (r = 1);
    let i = Math.min(t, n), o = this.zeros(t, n);
    for (let s = 0; s < i; s++)
      o.set(s, s, r);
    return o;
  }
  static diag(t, n, r) {
    let i = t.length;
    n === void 0 && (n = i), r === void 0 && (r = n);
    let o = Math.min(i, n, r), s = this.zeros(n, r);
    for (let l = 0; l < o; l++)
      s.set(l, l, t[l]);
    return s;
  }
  static min(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, i = t.columns, o = new oe(r, i);
    for (let s = 0; s < r; s++)
      for (let l = 0; l < i; l++)
        o.set(s, l, Math.min(t.get(s, l), n.get(s, l)));
    return o;
  }
  static max(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, i = t.columns, o = new this(r, i);
    for (let s = 0; s < r; s++)
      for (let l = 0; l < i; l++)
        o.set(s, l, Math.max(t.get(s, l), n.get(s, l)));
    return o;
  }
  static checkMatrix(t) {
    return ge.isMatrix(t) ? t : new oe(t);
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
      for (let r = 0; r < this.columns; r++)
        t.call(this, n, r);
    return this;
  }
  to1DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.push(this.get(n, r));
    return t;
  }
  to2DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++) {
      t.push([]);
      for (let r = 0; r < this.columns; r++)
        t[n].push(this.get(n, r));
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
    let t = 0, n = 0, r = -1, i = !0, o = !1;
    for (; t < this.rows && i; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (o = !0, r = n) : (i = !1, o = !0);
      t++;
    }
    return i;
  }
  isReducedEchelonForm() {
    let t = 0, n = 0, r = -1, i = !0, o = !1;
    for (; t < this.rows && i; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (o = !0, r = n) : (i = !1, o = !0);
      for (let s = n + 1; s < this.rows; s++)
        this.get(t, s) !== 0 && (i = !1);
      t++;
    }
    return i;
  }
  echelonForm() {
    let t = this.clone(), n = 0, r = 0;
    for (; n < t.rows && r < t.columns; ) {
      let i = n;
      for (let o = n; o < t.rows; o++)
        t.get(o, r) > t.get(i, r) && (i = o);
      if (t.get(i, r) === 0)
        r++;
      else {
        t.swapRows(n, i);
        let o = t.get(n, r);
        for (let s = r; s < t.columns; s++)
          t.set(n, s, t.get(n, s) / o);
        for (let s = n + 1; s < t.rows; s++) {
          let l = t.get(s, r) / t.get(n, r);
          t.set(s, r, 0);
          for (let a = r + 1; a < t.columns; a++)
            t.set(s, a, t.get(s, a) - t.get(n, a) * l);
        }
        n++, r++;
      }
    }
    return t;
  }
  reducedEchelonForm() {
    let t = this.echelonForm(), n = t.columns, r = t.rows, i = r - 1;
    for (; i >= 0; )
      if (t.maxRow(i) === 0)
        i--;
      else {
        let o = 0, s = !1;
        for (; o < r && s === !1; )
          t.get(i, o) === 1 ? s = !0 : o++;
        for (let l = 0; l < i; l++) {
          let a = t.get(l, o);
          for (let u = o; u < n; u++) {
            let c = t.get(l, u) - a * t.get(i, u);
            t.set(l, u, c);
          }
        }
        i--;
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
    const { rows: n = 1, columns: r = 1 } = t;
    if (!Number.isInteger(n) || n <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(r) || r <= 0)
      throw new TypeError("columns must be a positive integer");
    let i = new oe(this.rows * n, this.columns * r);
    for (let o = 0; o < n; o++)
      for (let s = 0; s < r; s++)
        i.setSubMatrix(this, this.rows * o, this.columns * s);
    return i;
  }
  fill(t) {
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, t);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(t) {
    _t(this, t);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(t, r));
    return n;
  }
  getRowVector(t) {
    return oe.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    _t(this, t), n = er(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, n[r]);
    return this;
  }
  swapRows(t, n) {
    _t(this, t), _t(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(t, r);
      this.set(t, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(t) {
    xt(this, t);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, t));
    return n;
  }
  getColumnVector(t) {
    return oe.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    xt(this, t), n = tr(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, n[r]);
    return this;
  }
  swapColumns(t, n) {
    xt(this, t), xt(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, t);
      this.set(r, t, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(t) {
    t = er(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[r]);
    return this;
  }
  subRowVector(t) {
    t = er(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[r]);
    return this;
  }
  mulRowVector(t) {
    t = er(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[r]);
    return this;
  }
  divRowVector(t) {
    t = er(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[r]);
    return this;
  }
  addColumnVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[n]);
    return this;
  }
  mulRow(t, n) {
    _t(this, t);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, this.get(t, r) * n);
    return this;
  }
  mulColumn(t, n) {
    xt(this, t);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, this.get(r, t) * n);
    return this;
  }
  max() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) > t && (t = this.get(n, r));
    return t;
  }
  maxIndex() {
    Zn(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) > t && (t = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  min() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) < t && (t = this.get(n, r));
    return t;
  }
  minIndex() {
    Zn(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < t && (t = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(t) {
    if (_t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r));
    return n;
  }
  maxRowIndex(t) {
    _t(this, t), Zn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  minRow(t) {
    if (_t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r));
    return n;
  }
  minRowIndex(t) {
    _t(this, t), Zn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  maxColumn(t) {
    if (xt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t));
    return n;
  }
  maxColumnIndex(t) {
    xt(this, t), Zn(this);
    let n = this.get(0, t), r = [0, t];
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t), r[0] = i);
    return r;
  }
  minColumn(t) {
    if (xt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) < n && (n = this.get(r, t));
    return n;
  }
  minColumnIndex(t) {
    xt(this, t), Zn(this);
    let n = this.get(0, t), r = [0, t];
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t), r[0] = i);
    return r;
  }
  diag() {
    let t = Math.min(this.rows, this.columns), n = [];
    for (let r = 0; r < t; r++)
      n.push(this.get(r, r));
    return n;
  }
  norm(t = "frobenius") {
    let n = 0;
    if (t === "max")
      return this.max();
    if (t === "frobenius") {
      for (let r = 0; r < this.rows; r++)
        for (let i = 0; i < this.columns; i++)
          n = n + this.get(r, i) * this.get(r, i);
      return Math.sqrt(n);
    } else
      throw new RangeError(`unknown norm type: ${t}`);
  }
  cumulativeSum() {
    let t = 0;
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t += this.get(n, r), this.set(n, r, t);
    return this;
  }
  dot(t) {
    ge.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * t[i];
    return r;
  }
  mmul(t) {
    t = oe.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.columns, o = new oe(n, i), s = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let a = 0; a < r; a++)
        s[a] = t.get(a, l);
      for (let a = 0; a < n; a++) {
        let u = 0;
        for (let c = 0; c < r; c++)
          u += this.get(a, c) * s[c];
        o.set(a, l, u);
      }
    }
    return o;
  }
  strassen2x2(t) {
    t = oe.checkMatrix(t);
    let n = new oe(2, 2);
    const r = this.get(0, 0), i = t.get(0, 0), o = this.get(0, 1), s = t.get(0, 1), l = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), f = (r + u) * (i + c), d = (l + u) * i, h = r * (s - c), g = u * (a - i), m = (r + o) * c, p = (l - r) * (i + s), v = (o - u) * (a + c), b = f + g - m + v, k = h + m, y = d + g, C = f - d + h + p;
    return n.set(0, 0, b), n.set(0, 1, k), n.set(1, 0, y), n.set(1, 1, C), n;
  }
  strassen3x3(t) {
    t = oe.checkMatrix(t);
    let n = new oe(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), o = this.get(0, 2), s = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), d = t.get(0, 0), h = t.get(0, 1), g = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), v = t.get(1, 2), b = t.get(2, 0), k = t.get(2, 1), y = t.get(2, 2), C = (r + i + o - s - l - c - f) * p, T = (r - s) * (-h + p), E = l * (-d + h + m - p - v - b + y), P = (-r + s + l) * (d - h + p), O = (s + l) * (-d + h), F = r * d, j = (-r + u + c) * (d - g + v), R = (-r + u) * (g - v), N = (u + c) * (-d + g), _ = (r + i + o - l - a - u - c) * v, B = c * (-d + g + m - p - v - b + k), V = (-o + c + f) * (p + b - k), H = (o - f) * (p - k), z = o * b, K = (c + f) * (-b + k), X = (-o + l + a) * (v + b - y), q = (o - a) * (v - y), J = (l + a) * (-b + y), te = i * m, ue = a * k, xe = s * g, he = u * h, Ce = f * y, Oe = F + z + te, wt = C + P + O + F + V + z + K, It = F + j + N + _ + z + X + J, nn = T + E + P + F + z + X + q, rn = T + P + O + F + ue, x = z + X + q + J + xe, L = F + j + R + B + V + H + z, D = V + H + z + K + he, W = F + j + R + N + Ce;
    return n.set(0, 0, Oe), n.set(0, 1, wt), n.set(0, 2, It), n.set(1, 0, nn), n.set(1, 1, rn), n.set(1, 2, x), n.set(2, 0, L), n.set(2, 1, D), n.set(2, 2, W), n;
  }
  mmulStrassen(t) {
    t = oe.checkMatrix(t);
    let n = this.clone(), r = n.rows, i = n.columns, o = t.rows, s = t.columns;
    i !== o && console.warn(
      `Multiplying ${r} x ${i} and ${o} x ${s} matrix: dimensions do not match.`
    );
    function l(f, d, h) {
      let g = f.rows, m = f.columns;
      if (g === d && m === h)
        return f;
      {
        let p = ge.zeros(d, h);
        return p = p.setSubMatrix(f, 0, 0), p;
      }
    }
    let a = Math.max(r, o), u = Math.max(i, s);
    n = l(n, a, u), t = l(t, a, u);
    function c(f, d, h, g) {
      if (h <= 512 || g <= 512)
        return f.mmul(d);
      h % 2 === 1 && g % 2 === 1 ? (f = l(f, h + 1, g + 1), d = l(d, h + 1, g + 1)) : h % 2 === 1 ? (f = l(f, h + 1, g), d = l(d, h + 1, g)) : g % 2 === 1 && (f = l(f, h, g + 1), d = l(d, h, g + 1));
      let m = parseInt(f.rows / 2, 10), p = parseInt(f.columns / 2, 10), v = f.subMatrix(0, m - 1, 0, p - 1), b = d.subMatrix(0, m - 1, 0, p - 1), k = f.subMatrix(0, m - 1, p, f.columns - 1), y = d.subMatrix(0, m - 1, p, d.columns - 1), C = f.subMatrix(m, f.rows - 1, 0, p - 1), T = d.subMatrix(m, d.rows - 1, 0, p - 1), E = f.subMatrix(m, f.rows - 1, p, f.columns - 1), P = d.subMatrix(m, d.rows - 1, p, d.columns - 1), O = c(
        ge.add(v, E),
        ge.add(b, P),
        m,
        p
      ), F = c(ge.add(C, E), b, m, p), j = c(v, ge.sub(y, P), m, p), R = c(E, ge.sub(T, b), m, p), N = c(ge.add(v, k), P, m, p), _ = c(
        ge.sub(C, v),
        ge.add(b, y),
        m,
        p
      ), B = c(
        ge.sub(k, E),
        ge.add(T, P),
        m,
        p
      ), V = ge.add(O, R);
      V.sub(N), V.add(B);
      let H = ge.add(j, N), z = ge.add(F, R), K = ge.sub(O, F);
      K.add(j), K.add(_);
      let X = ge.zeros(2 * V.rows, 2 * V.columns);
      return X = X.setSubMatrix(V, 0, 0), X = X.setSubMatrix(H, V.rows, 0), X = X.setSubMatrix(z, 0, V.columns), X = X.setSubMatrix(K, V.rows, V.columns), X.subMatrix(0, h - 1, 0, g - 1);
    }
    return c(n, t, a, u);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(r))
      throw new TypeError("max must be a number");
    if (n >= r)
      throw new RangeError("min must be smaller than max");
    let i = new oe(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const s = this.getRow(o);
      s.length > 0 && Iu(s, { min: n, max: r, output: s }), i.setRow(o, s);
    }
    return i;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(r))
      throw new TypeError("max must be a number");
    if (n >= r)
      throw new RangeError("min must be smaller than max");
    let i = new oe(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const s = this.getColumn(o);
      s.length && Iu(s, {
        min: n,
        max: r,
        output: s
      }), i.setColumn(o, s);
    }
    return i;
  }
  flipRows() {
    const t = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < t; r++) {
        let i = this.get(n, r), o = this.get(n, this.columns - 1 - r);
        this.set(n, r, o), this.set(n, this.columns - 1 - r, i);
      }
    return this;
  }
  flipColumns() {
    const t = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < t; r++) {
        let i = this.get(r, n), o = this.get(this.rows - 1 - r, n);
        this.set(r, n, o), this.set(this.rows - 1 - r, n, i);
      }
    return this;
  }
  kroneckerProduct(t) {
    t = oe.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.rows, o = t.columns, s = new oe(n * i, r * o);
    for (let l = 0; l < n; l++)
      for (let a = 0; a < r; a++)
        for (let u = 0; u < i; u++)
          for (let c = 0; c < o; c++)
            s.set(i * l + u, o * a + c, this.get(l, a) * t.get(u, c));
    return s;
  }
  kroneckerSum(t) {
    if (t = oe.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = t.rows, i = this.kroneckerProduct(oe.eye(r, r)), o = oe.eye(n, n).kroneckerProduct(t);
    return i.add(o);
  }
  transpose() {
    let t = new oe(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(r, n, this.get(n, r));
    return t;
  }
  sortRows(t = Au) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = Au) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, r, i) {
    $u(this, t, n, r, i);
    let o = new oe(
      n - t + 1,
      i - r + 1
    );
    for (let s = t; s <= n; s++)
      for (let l = r; l <= i; l++)
        o.set(s - t, l - r, this.get(s, l));
    return o;
  }
  subMatrixRow(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let i = new oe(t.length, r - n + 1);
    for (let o = 0; o < t.length; o++)
      for (let s = n; s <= r; s++) {
        if (t[o] < 0 || t[o] >= this.rows)
          throw new RangeError(`Row index out of range: ${t[o]}`);
        i.set(o, s - n, this.get(t[o], s));
      }
    return i;
  }
  subMatrixColumn(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let i = new oe(r - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let s = n; s <= r; s++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        i.set(s - n, o, this.get(s, t[o]));
      }
    return i;
  }
  setSubMatrix(t, n, r) {
    if (t = oe.checkMatrix(t), t.isEmpty())
      return this;
    let i = n + t.rows - 1, o = r + t.columns - 1;
    $u(this, n, i, r, o);
    for (let s = 0; s < t.rows; s++)
      for (let l = 0; l < t.columns; l++)
        this.set(n + s, r + l, t.get(s, l));
    return this;
  }
  selection(t, n) {
    let r = sw(this, t, n), i = new oe(t.length, n.length);
    for (let o = 0; o < r.row.length; o++) {
      let s = r.row[o];
      for (let l = 0; l < r.column.length; l++) {
        let a = r.column[l];
        i.set(o, l, this.get(s, a));
      }
    }
    return i;
  }
  trace() {
    let t = Math.min(this.rows, this.columns), n = 0;
    for (let r = 0; r < t; r++)
      n += this.get(r, r);
    return n;
  }
  clone() {
    let t = new oe(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(n, r, this.get(n, r));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return uw(this);
      case "column":
        return cw(this);
      case void 0:
        return fw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return dw(this);
      case "column":
        return hw(this);
      case void 0:
        return gw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  mean(t) {
    const n = this.sum(t);
    switch (t) {
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
        throw new Error(`invalid option: ${t}`);
    }
  }
  variance(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { unbiased: r = !0, mean: i = this.mean(t) } = n;
    if (typeof r != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (t) {
      case "row": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return mw(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return vw(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return pw(this, r, i);
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  standardDeviation(t, n) {
    typeof t == "object" && (n = t, t = void 0);
    const r = this.variance(t, n);
    if (t === void 0)
      return Math.sqrt(r);
    for (let i = 0; i < r.length; i++)
      r[i] = Math.sqrt(r[i]);
    return r;
  }
  center(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { center: r = this.mean(t) } = n;
    switch (t) {
      case "row": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return yw(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return ww(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return bw(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  scale(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    let r = n.scale;
    switch (t) {
      case "row": {
        if (r === void 0)
          r = _w(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return xw(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Cw(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Sw(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = kw(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Ew(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return kd(this, t);
  }
}
ge.prototype.klass = "Matrix";
typeof Symbol < "u" && (ge.prototype[Symbol.for("nodejs.util.inspect.custom")] = nw);
function Au(e, t) {
  return e - t;
}
ge.random = ge.rand;
ge.randomInt = ge.randInt;
ge.diagonal = ge.diag;
ge.prototype.diagonal = ge.prototype.diag;
ge.identity = ge.eye;
ge.prototype.negate = ge.prototype.neg;
ge.prototype.tensorProduct = ge.prototype.kroneckerProduct;
class oe extends ge {
  constructor(t, n) {
    if (super(), oe.isMatrix(t))
      return t.clone();
    if (Number.isInteger(t) && t >= 0)
      if (this.data = [], Number.isInteger(n) && n >= 0)
        for (let r = 0; r < t; r++)
          this.data.push(new Float64Array(n));
      else
        throw new TypeError("nColumns must be a positive integer");
    else if (Array.isArray(t)) {
      const r = t;
      if (t = r.length, n = t ? r[0].length : 0, typeof n != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let i = 0; i < t; i++) {
        if (r[i].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(r[i]));
      }
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
    this.rows = t, this.columns = n;
  }
  set(t, n, r) {
    return this.data[t][n] = r, this;
  }
  get(t, n) {
    return this.data[t][n];
  }
  removeRow(t) {
    return _t(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), _t(this, t, !0), n = Float64Array.from(er(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    xt(this, t);
    for (let n = 0; n < this.rows; n++) {
      const r = new Float64Array(this.columns - 1);
      for (let i = 0; i < t; i++)
        r[i] = this.data[n][i];
      for (let i = t + 1; i < this.columns; i++)
        r[i - 1] = this.data[n][i];
      this.data[n] = r;
    }
    return this.columns -= 1, this;
  }
  addColumn(t, n) {
    typeof n > "u" && (n = t, t = this.columns), xt(this, t, !0), n = tr(this, n);
    for (let r = 0; r < this.rows; r++) {
      const i = new Float64Array(this.columns + 1);
      let o = 0;
      for (; o < t; o++)
        i[o] = this.data[r][o];
      for (i[o++] = n[r]; o < this.columns + 1; o++)
        i[o] = this.data[r][o - 1];
      this.data[r] = i;
    }
    return this.columns += 1, this;
  }
}
ow(ge, oe);
function ms(e, t, n) {
  const r = t.x - e.x, i = t.y - e.y, o = Math.sqrt(r * r + i * i), s = r / o, l = i / o, a = e.x + (n.nodeRadius - 1) * s, u = e.y + (n.nodeRadius - 1) * l, c = t.x - n.markerPadding * s, f = t.y - n.markerPadding * l;
  return `M${a},${u}
          L${c},${f}`;
}
function vs(e, t, n) {
  const r = new oe([[e.x, e.y]]), i = new oe([[t.x, t.y]]), o = oe.subtract(i, r), s = o.norm("frobenius"), l = o.divide(s), a = Ed(10), u = ar(l, -a).multiply(n.nodeRadius - 1).add(r), c = oe.multiply(l, -1), f = ar(c, a).multiply(n.nodeRadius).add(i).add(ar(c, a).multiply(2 * n.markerBoxSize)), d = 1.2 * s;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${d},${d},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Pu(e, t, n) {
  const r = new oe([[e.x, e.y]]), i = new oe([t]);
  r.get(0, 0) === i.get(0, 0) && r.get(0, 1) === i.get(0, 1) && i.add([[0, 1]]);
  const o = oe.subtract(r, i), s = o.divide(o.norm("frobenius")), l = Ed(40), a = ar(s, l).multiply(n.nodeRadius - 1).add(r), u = ar(s, -l).multiply(n.nodeRadius).add(r).add(ar(s, -l).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function Ru(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Ed(e) {
  return e * (Math.PI / 180);
}
function ar(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new oe([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
function Lw(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, i = n !== -1 ? t.slice(n + 1) : [], o = [];
  if (r.length)
    for (const l of r) {
      let [, a, u, c] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((f) => f.trim());
      u != null && u.includes("/COLOR:/") && (c = u, u = ""), a && o.push({
        idImported: a,
        label: u,
        color: c == null ? void 0 : c.replace("/COLOR:/", "")
      });
    }
  const s = [];
  if (i.length)
    for (const l of i) {
      let [, a, u, c, f] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((d) => d.trim());
      c != null && c.includes("/COLOR:/") && (f = c, c = ""), a && u && s.push({
        sourceIdImported: a,
        targetIdImported: u,
        label: c,
        color: f == null ? void 0 : f.replace("/COLOR:/", "")
      });
    }
  return [o, s];
}
function Mw(e) {
  const t = [];
  for (let r of e.nodes)
    t.push({ idImported: r.id, label: r.label, color: r.color });
  const n = [];
  for (let r of e.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label,
      color: r.color
    });
  return [t, n];
}
var Tw = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vw(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ld = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Tw, function() {
    function n(s) {
      s = s.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (V, H, z, K) => H + K.replaceAll(".", " ."));
      var l = s.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, u, c, f, d, h, g = [], m = [], p, v, b = 0, k = 0, y = 0, C = 0, T = 0, E = 0, P = 0, O = 0, F = 0, j = 0, R = 0, N = 0, _ = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = l[u], f = c.substring(0, 1), d = f.toLowerCase(), g = c.replace(f, "").trim().split(" ").filter(function(V) {
          return V !== "";
        }), m = g, g = g.map(parseFloat), p = g.length, d === "m") {
          if (B += "M ", f === "m" ? (y += g[0], C += g[1]) : (y = g[0], C = g[1]), b = y, k = C, B += y + " " + C + " ", p > 2)
            for (v = 0; v < p; v += 2)
              f === "m" ? (y += g[v], C += g[v + 1]) : (y = g[v], C = g[v + 1]), B += "L " + y + " " + C + " ";
        } else if (d === "l")
          for (v = 0; v < p; v += 2)
            f === "l" ? (y += g[v], C += g[v + 1]) : (y = g[v], C = g[v + 1]), B += "L " + y + " " + C + " ";
        else if (d === "h")
          for (v = 0; v < p; v++)
            f === "h" ? y += g[v] : y = g[v], B += "L " + y + " " + C + " ";
        else if (d === "v")
          for (v = 0; v < p; v++)
            f === "v" ? C += g[v] : C = g[v], B += "L " + y + " " + C + " ";
        else if (d === "q")
          for (v = 0; v < p; v += 4)
            f === "q" ? (T = y + g[v], E = C + g[v + 1], y += g[v + 2], C += g[v + 3]) : (T = g[v], E = g[v + 1], y = g[v + 2], C = g[v + 3]), B += "Q " + T + " " + E + " " + y + " " + C + " ";
        else if (d === "t")
          for (v = 0; v < p; v += 2)
            ["t", "q"].indexOf(h) > -1 ? (T = y + (y - T), E = C + (C - E)) : (T = y, E = C), f === "t" ? (y += g[v], C += g[v + 1]) : (y = g[v], C = g[v + 1]), B += "Q " + T + " " + E + " " + y + " " + C + " ", h = d;
        else if (d === "c")
          for (v = 0; v < p; v += 6)
            f === "c" ? (T = y + g[v], E = C + g[v + 1], P = y + g[v + 2], O = C + g[v + 3], y += g[v + 4], C += g[v + 5]) : (T = g[v], E = g[v + 1], P = g[v + 2], O = g[v + 3], y = g[v + 4], C = g[v + 5]), B += "C " + T + " " + E + " " + P + " " + O + " " + y + " " + C + " ";
        else if (d === "s")
          for (v = 0; v < p; v += 4)
            T = y, E = C, ["s", "c"].indexOf(h) > -1 && (T += y - P, E += C - O), f === "s" ? (P = y + g[v], O = C + g[v + 1], y += g[v + 2], C += g[v + 3]) : (P = g[v], O = g[v + 1], y = g[v + 2], C = g[v + 3]), B += "C " + T + " " + E + " " + P + " " + O + " " + y + " " + C + " ";
        else if (d === "a")
          for (v = 0; v < p; v += 7) {
            F = g[v], j = g[v + 1], R = g[v + 2], N = m[v + 3];
            let V = !1;
            if (N.length > 1) {
              let H = parseInt(N[0]), z = parseInt(N[1]), K;
              N.length > 2 && (K = parseFloat(N.substring(2))), g[v + 3] = H, g.splice(v + 4, 0, z), m.splice(v + 4, 0, "+"), K !== void 0 && g.splice(v + 5, 0, K), V = !0;
            }
            N = g[v + 3], _ = V ? g[v + 4] : m[v + 4], !V && _.length > 1 && (g[v + 4] = parseInt(_[0]), g.splice(v + 5, 0, parseFloat(_.substring(1)))), _ = g[v + 4], f === "a" ? (y += g[v + 5], C += g[v + 6]) : (y = g[v + 5], C = g[v + 6]), B += "A " + F + " " + j + " " + R + " " + N + " " + _ + " " + y + " " + C + " ";
          }
        else
          d === "z" && (B += "Z ", y = b, C = k);
        h = d;
      }
      return B.trim();
    }
    function r(s) {
      var l = s.trim().split(" "), a, u = l.length, c = u - 1, f, d = [], h, g, m, p, v, b = new RegExp("[QAZLCM]", ""), k = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < u; f++)
        if (a = l[f], b.test(a)) {
          if (a === "A") {
            d.push(l[f + 5] === "0" ? "1" : "0"), d.push(l[f + 4]), d.push(l[f + 3]), d.push(l[f + 2]), d.push(l[f + 1]), d.push(a), d.push(l[f + 7]), d.push(l[f + 6]), f += 7;
            continue;
          } else if (a === "C")
            p = 3, v = 2;
          else if (a === "Q")
            p = 2, v = 1;
          else if (a === "L")
            p = 1, v = 1;
          else if (a === "M")
            p = 1, v = 0;
          else
            continue;
          for (p === v && d.push(a), m = 0; m < p; m++)
            m === v && d.push(a), h = l[++f], g = l[++f], d.push(g), d.push(h);
        } else {
          var y = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, c)).join(" "), range = y + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      d.push("M");
      var C = "", T = d.length - 1, E;
      for (E = T; E > 0; E--)
        C += d[E] + " ";
      return k && (C += "Z"), C = C.replace(/M M/g, "Z M"), C;
    }
    function i(a, l) {
      l = parseInt(l) == l ? l : !1;
      var a = n(a), u = a.replace(/M/g, "|M").split("|"), c;
      if (u.splice(0, 1), l !== !1 && l >= u.length)
        return a;
      if (l === !1)
        u = u.map(function(d) {
          return r(d.trim());
        });
      else {
        var f = u[l];
        f && (c = r(f.trim()), u[l] = c);
      }
      return u.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var o = {
      normalize: n,
      reverseNormalized: r,
      reverse: i
    };
    return o;
  });
})(Ld);
var Iw = Ld.exports;
const Nu = /* @__PURE__ */ Vw(Iw), Ve = typeof window < "u", Yl = Ve && "IntersectionObserver" in window, $w = Ve && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function Aw(e, t, n) {
  const r = t.length - 1;
  if (r < 0)
    return e === void 0 ? n : e;
  for (let i = 0; i < r; i++) {
    if (e == null)
      return n;
    e = e[t[i]];
  }
  return e == null || e[t[r]] === void 0 ? n : e[t[r]];
}
function si(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((r) => si(e[r], t[r]));
}
function Ou(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Aw(e, t.split("."), n));
}
function Md(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, r) => t + r);
}
function me(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function uo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Yr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Fu = Object.freeze({
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
});
function Td(e) {
  return Object.keys(e);
}
function ps(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Vd(e, t) {
  const n = {}, r = new Set(Object.keys(e));
  for (const i of t)
    r.has(i) && (n[i] = e[i]);
  return n;
}
function Bu(e, t, n) {
  const r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((s) => s instanceof RegExp ? s.test(o) : s === o) && !(n != null && n.some((s) => s === o)) ? r[o] = e[o] : i[o] = e[o];
  return [r, i];
}
function li(e, t) {
  const n = {
    ...e
  };
  return t.forEach((r) => delete n[r]), n;
}
const Id = /^on[^a-z]/, Kl = (e) => Id.test(e), Pw = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Xl(e) {
  const [t, n] = Bu(e, [Id]), r = li(t, Pw), [i, o] = Bu(n, ["class", "style", "id", /^data-/]);
  return Object.assign(i, t), Object.assign(o, r), [i, o];
}
function qt(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function co(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Du(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Hu(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Rw(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let r = 0;
  for (; r < e.length; )
    n.push(e.substr(r, t)), r += t;
  return n;
}
function zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let r = -1;
  for (; Math.abs(e) >= t && r < n.length - 1; )
    e /= t, ++r;
  return `${e.toFixed(1)} ${n[r]}B`;
}
function ut() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const r = {};
  for (const i in e)
    r[i] = e[i];
  for (const i in t) {
    const o = e[i], s = t[i];
    if (uo(o) && uo(s)) {
      r[i] = ut(o, s, n);
      continue;
    }
    if (Array.isArray(o) && Array.isArray(s) && n) {
      r[i] = n(o, s);
      continue;
    }
    r[i] = s;
  }
  return r;
}
function $d(e) {
  return e.map((t) => t.type === Se ? $d(t.children) : t).flat();
}
function Bn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Bn.cache.has(e))
    return Bn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Bn.cache.set(e, t), t;
}
Bn.cache = /* @__PURE__ */ new Map();
function ji(e, t) {
  if (!t || typeof t != "object")
    return [];
  if (Array.isArray(t))
    return t.map((n) => ji(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => ji(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return ji(e, t.component.subTree).flat(1);
  }
  return [];
}
function Zl(e) {
  const t = Mt({}), n = A(e);
  return _n(() => {
    for (const r in n.value)
      t[r] = n.value[r];
  }, {
    flush: "sync"
  }), El(t);
}
function fo(e, t) {
  return e.includes(t);
}
function Ad(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Yt = () => [Function, Array];
function ju(e, t) {
  return t = "on" + pr(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Nw(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (Array.isArray(e))
    for (const i of e)
      i(...n);
  else
    typeof e == "function" && e(...n);
}
function Kr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((r) => `${r}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Pd(e, t, n) {
  let r, i = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    i += o, r = e[i];
  while ((!r || r.offsetParent == null || !((n == null ? void 0 : n(r)) ?? !0)) && i < e.length && i >= 0);
  return r;
}
function Zs(e, t) {
  var r, i, o, s;
  const n = Kr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((r = n[0]) == null || r.focus());
  else if (t === "first")
    (i = n[0]) == null || i.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (s = n[t]) == null || s.focus();
  else {
    const l = Pd(n, t);
    l ? l.focus() : Zs(e, t === "next" ? "first" : "last");
  }
}
function Rd(e, t) {
  if (!(Ve && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Ow(e, t) {
  if (!Ve || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Fw(e, t) {
  const n = e.clientX, r = e.clientY, i = t.getBoundingClientRect(), o = i.left, s = i.top, l = i.right, a = i.bottom;
  return n >= o && n <= l && r >= s && r <= a;
}
const Nd = ["top", "bottom"], Bw = ["start", "end", "left", "right"];
function Js(e, t) {
  let [n, r] = e.split(" ");
  return r || (r = fo(Nd, n) ? "start" : fo(Bw, n) ? "top" : "center"), {
    side: Wu(n, t),
    align: Wu(r, t)
  };
}
function Wu(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function ys(e) {
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
function Gu(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Uu(e) {
  return fo(Nd, e.side) ? "y" : "x";
}
class Dn {
  constructor(t) {
    let {
      x: n,
      y: r,
      width: i,
      height: o
    } = t;
    this.x = n, this.y = r, this.width = i, this.height = o;
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
function qu(e, t) {
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
function Od(e) {
  return Array.isArray(e) ? new Dn({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Jl(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), r = n.transform;
  if (r) {
    let i, o, s, l, a;
    if (r.startsWith("matrix3d("))
      i = r.slice(9, -1).split(/, /), o = +i[0], s = +i[5], l = +i[12], a = +i[13];
    else if (r.startsWith("matrix("))
      i = r.slice(7, -1).split(/, /), o = +i[0], s = +i[3], l = +i[4], a = +i[5];
    else
      return new Dn(t);
    const u = n.transformOrigin, c = t.x - l - (1 - o) * parseFloat(u), f = t.y - a - (1 - s) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = o ? t.width / o : e.offsetWidth + 1, h = s ? t.height / s : e.offsetHeight + 1;
    return new Dn({
      x: c,
      y: f,
      width: d,
      height: h
    });
  } else
    return new Dn(t);
}
function Rn(e, t, n) {
  if (typeof e.animate > "u")
    return {
      finished: Promise.resolve()
    };
  let r;
  try {
    r = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof r.finished > "u" && (r.finished = new Promise((i) => {
    r.onfinish = () => {
      i(r);
    };
  })), r;
}
const Wi = /* @__PURE__ */ new WeakMap();
function Dw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Ad(n), i = Wi.get(e);
      if (t[n] == null)
        i == null || i.forEach((o) => {
          const [s, l] = o;
          s === r && (e.removeEventListener(r, l), i.delete(o));
        });
      else if (!i || ![...i].some((o) => o[0] === r && o[1] === t[n])) {
        e.addEventListener(r, t[n]);
        const o = i || /* @__PURE__ */ new Set();
        o.add([r, t[n]]), Wi.has(e) || Wi.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Hw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Ad(n), i = Wi.get(e);
      i == null || i.forEach((o) => {
        const [s, l] = o;
        s === r && (e.removeEventListener(r, l), i.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Jn = 2.4, Yu = 0.2126729, Ku = 0.7151522, Xu = 0.072175, zw = 0.55, jw = 0.58, Ww = 0.57, Gw = 0.62, Vi = 0.03, Zu = 1.45, Uw = 5e-4, qw = 1.25, Yw = 1.25, Ju = 0.078, Qu = 12.82051282051282, Ii = 0.06, ec = 1e-3;
function tc(e, t) {
  const n = (e.r / 255) ** Jn, r = (e.g / 255) ** Jn, i = (e.b / 255) ** Jn, o = (t.r / 255) ** Jn, s = (t.g / 255) ** Jn, l = (t.b / 255) ** Jn;
  let a = n * Yu + r * Ku + i * Xu, u = o * Yu + s * Ku + l * Xu;
  if (a <= Vi && (a += (Vi - a) ** Zu), u <= Vi && (u += (Vi - u) ** Zu), Math.abs(u - a) < Uw)
    return 0;
  let c;
  if (u > a) {
    const f = (u ** zw - a ** jw) * qw;
    c = f < ec ? 0 : f < Ju ? f - f * Qu * Ii : f - Ii;
  } else {
    const f = (u ** Gw - a ** Ww) * Yw;
    c = f > -ec ? 0 : f > -Ju ? f - f * Qu * Ii : f + Ii;
  }
  return c * 100;
}
const ho = 0.20689655172413793, Kw = (e) => e > ho ** 3 ? Math.cbrt(e) : e / (3 * ho ** 2) + 4 / 29, Xw = (e) => e > ho ? e ** 3 : 3 * ho ** 2 * (e - 4 / 29);
function Fd(e) {
  const t = Kw, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Bd(e) {
  const t = Xw, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Zw = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Jw = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Qw = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], eb = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Dd(e) {
  const t = Array(3), n = Jw, r = Zw;
  for (let i = 0; i < 3; ++i)
    t[i] = Math.round(co(n(r[i][0] * e[0] + r[i][1] * e[1] + r[i][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ql(e) {
  let {
    r: t,
    g: n,
    b: r
  } = e;
  const i = [0, 0, 0], o = eb, s = Qw;
  t = o(t / 255), n = o(n / 255), r = o(r / 255);
  for (let l = 0; l < 3; ++l)
    i[l] = s[l][0] * t + s[l][1] * n + s[l][2] * r;
  return i;
}
function Qs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function tb(e) {
  return Qs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const nc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, nb = {
  rgb: (e, t, n, r) => ({
    r: e,
    g: t,
    b: n,
    a: r
  }),
  rgba: (e, t, n, r) => ({
    r: e,
    g: t,
    b: n,
    a: r
  }),
  hsl: (e, t, n, r) => rc({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsla: (e, t, n, r) => rc({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsv: (e, t, n, r) => Xr({
    h: e,
    s: t,
    v: n,
    a: r
  }),
  hsva: (e, t, n, r) => Xr({
    h: e,
    s: t,
    v: n,
    a: r
  })
};
function Ot(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && nc.test(e)) {
    const {
      groups: t
    } = e.match(nc), {
      fn: n,
      values: r
    } = t, i = r.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return nb[n](...i);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), ib(t);
  } else if (typeof e == "object") {
    if (ps(e, ["r", "g", "b"]))
      return e;
    if (ps(e, ["h", "s", "l"]))
      return Xr(Hd(e));
    if (ps(e, ["h", "s", "v"]))
      return Xr(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Xr(e) {
  const {
    h: t,
    s: n,
    v: r,
    a: i
  } = e, o = (l) => {
    const a = (l + t / 60) % 6;
    return r - r * n * Math.max(Math.min(a, 4 - a, 1), 0);
  }, s = [o(5), o(3), o(1)].map((l) => Math.round(l * 255));
  return {
    r: s[0],
    g: s[1],
    b: s[2],
    a: i
  };
}
function rc(e) {
  return Xr(Hd(e));
}
function Hd(e) {
  const {
    h: t,
    s: n,
    l: r,
    a: i
  } = e, o = r + n * Math.min(r, 1 - r), s = o === 0 ? 0 : 2 - 2 * r / o;
  return {
    h: t,
    s,
    v: o,
    a: i
  };
}
function $i(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function rb(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: i
  } = e;
  return `#${[$i(t), $i(n), $i(r), i !== void 0 ? $i(Math.round(i * 255)) : ""].join("")}`;
}
function ib(e) {
  e = ob(e);
  let [t, n, r, i] = Rw(e, 2).map((o) => parseInt(o, 16));
  return i = i === void 0 ? i : i / 255, {
    r: t,
    g: n,
    b: r,
    a: i
  };
}
function ob(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Du(Du(e, 6), 8, "F")), e;
}
function sb(e, t) {
  const n = Fd(Ql(e));
  return n[0] = n[0] + t * 10, Dd(Bd(n));
}
function lb(e, t) {
  const n = Fd(Ql(e));
  return n[0] = n[0] - t * 10, Dd(Bd(n));
}
function ab(e) {
  const t = Ot(e);
  return Ql(t)[1];
}
function zd(e) {
  const t = Math.abs(tc(Ot(0), Ot(e)));
  return Math.abs(tc(Ot(16777215), Ot(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function ee(e, t) {
  return (n) => Object.keys(e).reduce((r, i) => {
    const s = typeof e[i] == "object" && e[i] != null && !Array.isArray(e[i]) ? e[i] : {
      type: e[i]
    };
    return n && i in n ? r[i] = {
      ...s,
      default: n[i]
    } : r[i] = s, t && !r[i].source && (r[i].source = t), r;
  }, {});
}
const ke = ee({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), gr = Symbol.for("vuetify:defaults");
function ub(e) {
  return ie(e);
}
function ea() {
  const e = Be(gr);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function br(e, t) {
  const n = ea(), r = ie(e), i = A(() => {
    if (Nt(t == null ? void 0 : t.disabled))
      return n.value;
    const s = Nt(t == null ? void 0 : t.scoped), l = Nt(t == null ? void 0 : t.reset), a = Nt(t == null ? void 0 : t.root);
    if (r.value == null && !(s || l || a))
      return n.value;
    let u = ut(r.value, {
      prev: n.value
    });
    if (s)
      return u;
    if (l || a) {
      const c = Number(l || 1 / 0);
      for (let f = 0; f <= c && !(!u || !("prev" in u)); f++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = ut(ut(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? ut(u.prev, u) : u;
  });
  return Bt(gr, i), i;
}
function cb(e, t) {
  var n, r;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((r = e.props) == null ? void 0 : r[Bn(t)]) < "u";
}
function fb() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ea();
  const r = Qe("useDefaults");
  if (t = t ?? r.type.name ?? r.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const i = A(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var f, d, h, g;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(f = i.value) == null ? void 0 : f[u], c].filter((m) => m != null) : typeof u == "string" && !cb(r.vnode, u) ? ((d = i.value) == null ? void 0 : d[u]) ?? ((g = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : g[u]) ?? c : c;
    }
  }), s = pe();
  _n(() => {
    if (i.value) {
      const a = Object.entries(i.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      s.value = a.length ? Object.fromEntries(a) : void 0;
    } else
      s.value = void 0;
  });
  function l() {
    const a = vb(gr, r);
    Bt(gr, A(() => s.value ? ut((a == null ? void 0 : a.value) ?? {}, s.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: l
  };
}
function ai(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = ee(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(r) {
      return Vd(r, t);
    }, e.props._as = String, e.setup = function(r, i) {
      const o = ea();
      if (!o.value)
        return e._setup(r, i);
      const {
        props: s,
        provideSubDefaults: l
      } = fb(r, r._as ?? e.name, o), a = e._setup(s, i);
      return l(), a;
    };
  }
  return e;
}
function le() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? ai : yr)(t);
}
function Fo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return le()({
    name: n ?? pr(Ze(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...ke()
    },
    setup(r, i) {
      let {
        slots: o
      } = i;
      return () => {
        var s;
        return wr(r.tag, {
          class: [e, r.class],
          style: r.style
        }, (s = o.default) == null ? void 0 : s.call(o));
      };
    }
  });
}
function jd(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; )
      e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Zr = "cubic-bezier(0.4, 0, 0.2, 1)", db = "cubic-bezier(0.0, 0, 0.2, 1)", hb = "cubic-bezier(0.4, 0, 1, 1)";
function Qe(e, t) {
  const n = Ol();
  if (!n)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n;
}
function Ht() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Qe(e).type;
  return Bn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Wd = 0, Gi = /* @__PURE__ */ new WeakMap();
function Vt() {
  const e = Qe("getUid");
  if (Gi.has(e))
    return Gi.get(e);
  {
    const t = Wd++;
    return Gi.set(e, t), t;
  }
}
Vt.reset = () => {
  Wd = 0, Gi = /* @__PURE__ */ new WeakMap();
};
function gb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? mb(e) : ta(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function go(e, t) {
  const n = [];
  if (t && e && !t.contains(e))
    return n;
  for (; e && (ta(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function ta(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function mb(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function vb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qe("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function pb(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ye(e) {
  const t = Qe("useRender");
  t.render = e;
}
const Bo = ee({
  border: [Boolean, Number, String]
}, "border");
function Do(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    borderClasses: A(() => {
      const r = $e(e) ? e.value : e.border, i = [];
      if (r === !0 || r === "")
        i.push(`${t}--border`);
      else if (typeof r == "string" || r === 0)
        for (const o of String(r).split(" "))
          i.push(`border-${o}`);
      return i;
    })
  };
}
const yb = [null, "default", "comfortable", "compact"], zt = ee({
  density: {
    type: String,
    default: "default",
    validator: (e) => yb.includes(e)
  }
}, "density");
function Qt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    densityClasses: A(() => `${t}--density-${e.density}`)
  };
}
const Ho = ee({
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
function zo(e) {
  return {
    elevationClasses: A(() => {
      const n = $e(e) ? e.value : e.elevation, r = [];
      return n == null || r.push(`elevation-${n}`), r;
    })
  };
}
const en = ee({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function tn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    roundedClasses: A(() => {
      const r = $e(e) ? e.value : e.rounded, i = $e(e) ? e.value : e.tile, o = [];
      if (r === !0 || r === "")
        o.push(`${t}--rounded`);
      else if (typeof r == "string" || r === 0)
        for (const s of String(r).split(" "))
          o.push(`rounded-${s}`);
      else
        i && o.push("rounded-0");
      return o;
    })
  };
}
const rt = ee({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), mo = Symbol.for("vuetify:theme"), je = ee({
  theme: String
}, "theme");
function ic() {
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
function wb() {
  var r, i;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ic();
  const t = ic();
  if (!e)
    return {
      ...t,
      isDisabled: !0
    };
  const n = {};
  for (const [o, s] of Object.entries(e.themes ?? {})) {
    const l = s.dark || o === "dark" ? (r = t.themes) == null ? void 0 : r.dark : (i = t.themes) == null ? void 0 : i.light;
    n[o] = ut(l, s);
  }
  return ut(t, {
    ...e,
    themes: n
  });
}
function bb(e) {
  const t = wb(e), n = ie(t.defaultTheme), r = ie(t.themes), i = A(() => {
    const c = {};
    for (const [f, d] of Object.entries(r.value)) {
      const h = c[f] = {
        ...d,
        colors: {
          ...d.colors
        }
      };
      if (t.variations)
        for (const g of t.variations.colors) {
          const m = h.colors[g];
          if (m)
            for (const p of ["lighten", "darken"]) {
              const v = p === "lighten" ? sb : lb;
              for (const b of Md(t.variations[p], 1))
                h.colors[`${g}-${p}-${b}`] = rb(v(Ot(m), b));
            }
        }
      for (const g of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(g) || h.colors[`on-${g}`])
          continue;
        const m = `on-${g}`, p = Ot(h.colors[g]);
        h.colors[m] = zd(p);
      }
    }
    return c;
  }), o = A(() => i.value[n.value]), s = A(() => {
    const c = [];
    o.value.dark && Ln(c, ":root", ["color-scheme: dark"]), Ln(c, ":root", oc(o.value));
    for (const [g, m] of Object.entries(i.value))
      Ln(c, `.v-theme--${g}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...oc(m)]);
    const f = [], d = [], h = new Set(Object.values(i.value).flatMap((g) => Object.keys(g.colors)));
    for (const g of h)
      /^on-[a-z]/.test(g) ? Ln(d, `.${g}`, [`color: rgb(var(--v-theme-${g})) !important`]) : (Ln(f, `.bg-${g}`, [`--v-theme-overlay-multiplier: var(--v-theme-${g}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${g})) !important`, `color: rgb(var(--v-theme-on-${g})) !important`]), Ln(d, `.text-${g}`, [`color: rgb(var(--v-theme-${g})) !important`]), Ln(d, `.border-${g}`, [`--v-border-color: var(--v-theme-${g})`]));
    return c.push(...f, ...d), c.map((g, m) => m === 0 ? g : `    ${g}`).join("");
  });
  function l() {
    return {
      style: [{
        children: s.value,
        id: "vuetify-theme-stylesheet",
        nonce: t.cspNonce || !1
      }]
    };
  }
  function a(c) {
    if (t.isDisabled)
      return;
    const f = c._context.provides.usehead;
    if (f)
      if (f.push) {
        const h = f.push(l);
        Ve && ae(s, () => {
          h.patch(l);
        });
      } else
        Ve ? (f.addHeadObjs(A(l)), _n(() => f.updateDOM())) : f.addHeadObjs(l());
    else {
      let g = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = s.value);
      };
      var d = g;
      let h = Ve ? document.getElementById("vuetify-theme-stylesheet") : null;
      Ve ? ae(s, g, {
        immediate: !0
      }) : g();
    }
  }
  const u = A(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
  return {
    install: a,
    isDisabled: t.isDisabled,
    name: n,
    themes: r,
    current: o,
    computedThemes: i,
    themeClasses: u,
    styles: s,
    global: {
      name: n,
      current: o
    }
  };
}
function it(e) {
  Qe("provideTheme");
  const t = Be(mo, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const n = A(() => e.theme ?? t.name.value), r = A(() => t.themes.value[n.value]), i = A(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: r,
    themeClasses: i
  };
  return Bt(mo, o), o;
}
function Ln(e, t, n) {
  e.push(`${t} {
`, ...n.map((r) => `  ${r};
`), `}
`);
}
function oc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, r = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const s = Ot(o);
    r.push(`--v-theme-${i}: ${s.r},${s.g},${s.b}`), i.startsWith("on-") || r.push(`--v-theme-${i}-overlay-multiplier: ${ab(o) > 0.18 ? t : n}`);
  }
  for (const [i, o] of Object.entries(e.variables)) {
    const s = typeof o == "string" && o.startsWith("#") ? Ot(o) : void 0, l = s ? `${s.r}, ${s.g}, ${s.b}` : void 0;
    r.push(`--v-${i}: ${l ?? o}`);
  }
  return r;
}
function na(e) {
  return Zl(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Qs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && tb(e.value.background)) {
          const r = Ot(e.value.background);
          if (r.a == null || r.a === 1) {
            const i = zd(r);
            n.color = i, n.caretColor = i;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Qs(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function wn(e, t) {
  const n = A(() => ({
    text: $e(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: i
  } = na(n);
  return {
    textColorClasses: r,
    textColorStyles: i
  };
}
function jn(e, t) {
  const n = A(() => ({
    background: $e(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: i
  } = na(n);
  return {
    backgroundColorClasses: r,
    backgroundColorStyles: i
  };
}
const _b = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function ui(e, t) {
  return w(Se, null, [e && w("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), w("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Yn = ee({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => _b.includes(e)
  }
}, "variant");
function ci(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = A(() => {
    const {
      variant: o
    } = Nt(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: r,
    colorStyles: i
  } = na(A(() => {
    const {
      variant: o,
      color: s
    } = Nt(e);
    return {
      [["elevated", "flat"].includes(o) ? "background" : "text"]: s
    };
  }));
  return {
    colorClasses: r,
    colorStyles: i,
    variantClasses: n
  };
}
const Gd = ee({
  divided: Boolean,
  ...Bo(),
  ...ke(),
  ...zt(),
  ...Ho(),
  ...en(),
  ...rt(),
  ...je(),
  ...Yn()
}, "VBtnGroup"), sc = le()({
  name: "VBtnGroup",
  props: Gd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      densityClasses: i
    } = Qt(e), {
      borderClasses: o
    } = Do(e), {
      elevationClasses: s
    } = zo(e), {
      roundedClasses: l
    } = tn(e);
    br({
      VBtn: {
        height: "auto",
        color: we(e, "color"),
        density: we(e, "density"),
        flat: !0,
        variant: we(e, "variant")
      }
    }), ye(() => w(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, r.value, o.value, i.value, s.value, l.value, e.class],
      style: e.style
    }, n));
  }
});
function mr(e, t) {
  let n;
  function r() {
    n = yl(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), r();
    }) : t());
  }
  ae(e, (i) => {
    i && !n ? r() : i || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), ht(() => {
    n == null || n.stop();
  });
}
function De(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const o = Qe("useProxiedModel"), s = ie(e[t] !== void 0 ? e[t] : n), l = Bn(t), u = A(l !== t ? () => {
    var f, d, h, g;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(l)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (g = o.vnode.props) != null && g.hasOwnProperty(`onUpdate:${l}`)));
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  mr(() => !u.value, () => {
    ae(() => e[t], (f) => {
      s.value = f;
    });
  });
  const c = A({
    get() {
      const f = e[t];
      return r(u.value ? f : s.value);
    },
    set(f) {
      const d = i(f), h = ve(u.value ? e[t] : s.value);
      h === d || r(h) === f || (s.value = d, o == null || o.emit(`update:${t}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : s.value
  }), c;
}
const ra = ee({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), ia = ee({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function oa(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const r = Qe("useGroupItem");
  if (!r)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const i = Vt();
  Bt(Symbol.for(`${t.description}:id`), i);
  const o = Be(t, null);
  if (!o) {
    if (!n)
      return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const s = we(e, "value"), l = A(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: i,
    value: s,
    disabled: l
  }, r), Jt(() => {
    o.unregister(i);
  });
  const a = A(() => o.isSelected(i)), u = A(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return ae(a, (c) => {
    r.emit("group:selected", {
      value: c
    });
  }, {
    flush: "sync"
  }), {
    id: i,
    isSelected: a,
    toggle: () => o.select(i, !a.value),
    select: (c) => o.select(i, c),
    selectedClass: u,
    value: s,
    disabled: l,
    group: o
  };
}
function jo(e, t) {
  let n = !1;
  const r = Mt([]), i = De(e, "modelValue", [], (d) => d == null ? [] : Ud(r, qt(d)), (d) => {
    const h = Cb(r, d);
    return e.multiple ? h : h[0];
  }), o = Qe("useGroup");
  function s(d, h) {
    const g = d, m = Symbol.for(`${t.description}:id`), v = ji(m, o == null ? void 0 : o.vnode).indexOf(h);
    Nt(g.value) == null && (g.value = v), v > -1 ? r.splice(v, 0, g) : r.push(g);
  }
  function l(d) {
    if (n)
      return;
    a();
    const h = r.findIndex((g) => g.id === d);
    r.splice(h, 1);
  }
  function a() {
    const d = r.find((h) => !h.disabled);
    d && e.mandatory === "force" && !i.value.length && (i.value = [d.id]);
  }
  xn(() => {
    a();
  }), Jt(() => {
    n = !0;
  });
  function u(d, h) {
    const g = r.find((m) => m.id === d);
    if (!(h && (g != null && g.disabled)))
      if (e.multiple) {
        const m = i.value.slice(), p = m.findIndex((b) => b === d), v = ~p;
        if (h = h ?? !v, v && e.mandatory && m.length <= 1 || !v && e.max != null && m.length + 1 > e.max)
          return;
        p < 0 && h ? m.push(d) : p >= 0 && !h && m.splice(p, 1), i.value = m;
      } else {
        const m = i.value.includes(d);
        if (e.mandatory && m)
          return;
        i.value = h ?? !m ? [d] : [];
      }
  }
  function c(d) {
    if (e.multiple, i.value.length) {
      const h = i.value[0], g = r.findIndex((v) => v.id === h);
      let m = (g + d) % r.length, p = r[m];
      for (; p.disabled && m !== g; )
        m = (m + d) % r.length, p = r[m];
      if (p.disabled)
        return;
      i.value = [r[m].id];
    } else {
      const h = r.find((g) => !g.disabled);
      h && (i.value = [h.id]);
    }
  }
  const f = {
    register: s,
    unregister: l,
    selected: i,
    select: u,
    disabled: we(e, "disabled"),
    prev: () => c(r.length - 1),
    next: () => c(1),
    isSelected: (d) => i.value.includes(d),
    selectedClass: A(() => e.selectedClass),
    items: A(() => r),
    getItemIndex: (d) => xb(r, d)
  };
  return Bt(t, f), f;
}
function xb(e, t) {
  const n = Ud(e, [t]);
  return n.length ? e.findIndex((r) => r.id === n[0]) : -1;
}
function Ud(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.find((s) => si(r, s.value)), o = e[r];
    (i == null ? void 0 : i.value) != null ? n.push(i.id) : o != null && n.push(o.id);
  }), n;
}
function Cb(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.findIndex((o) => o.id === r);
    if (~i) {
      const o = e[i];
      n.push(o.value != null ? o.value : i);
    }
  }), n;
}
const qd = Symbol.for("vuetify:v-btn-toggle"), Sb = ee({
  ...Gd(),
  ...ra()
}, "VBtnToggle");
le()({
  name: "VBtnToggle",
  props: Sb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: r,
      next: i,
      prev: o,
      select: s,
      selected: l
    } = jo(e, qd);
    return ye(() => {
      const a = sc.filterProps(e);
      return w(sc, fe({
        class: ["v-btn-toggle", e.class]
      }, a, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: r,
            next: i,
            prev: o,
            select: s,
            selected: l
          })];
        }
      });
    }), {
      next: i,
      prev: o,
      select: s
    };
  }
});
const kb = ee({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ke = le(!1)({
  name: "VDefaultsProvider",
  props: kb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: r,
      disabled: i,
      reset: o,
      root: s,
      scoped: l
    } = El(e);
    return br(r, {
      reset: o,
      root: s,
      scoped: l,
      disabled: i
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), Eb = {
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
}, Lb = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => wr(Yd, {
    ...e,
    class: "mdi"
  })
}, Ae = [String, Function, Object, Array], el = Symbol.for("vuetify:icons"), Wo = ee({
  icon: {
    type: Ae
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), lc = le()({
  name: "VComponentIcon",
  props: Wo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const r = e.icon;
      return w(e.tag, null, {
        default: () => {
          var i;
          return [e.icon ? w(r, null, null) : (i = n.default) == null ? void 0 : i.call(n)];
        }
      });
    };
  }
}), sa = ai({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Wo(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => w(e.tag, fe(n, {
      style: null
    }), {
      default: () => [w("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((r) => Array.isArray(r) ? w("path", {
        d: r[0],
        "fill-opacity": r[1]
      }, null) : w("path", {
        d: r
      }, null)) : w("path", {
        d: e.icon
      }, null)])]
    });
  }
});
ai({
  name: "VLigatureIcon",
  props: Wo(),
  setup(e) {
    return () => w(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Yd = ai({
  name: "VClassIcon",
  props: Wo(),
  setup(e) {
    return () => w(e.tag, {
      class: e.icon
    }, null);
  }
});
function Mb() {
  return {
    svg: {
      component: sa
    },
    class: {
      component: Yd
    }
  };
}
function Tb(e) {
  const t = Mb(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Lb), ut({
    defaultSet: n,
    sets: t,
    aliases: {
      ...Eb,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const Vb = (e) => {
  const t = Be(el);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: A(() => {
      var a;
      const r = Nt(e);
      if (!r)
        return {
          component: lc
        };
      let i = r;
      if (typeof i == "string" && (i = i.trim(), i.startsWith("$") && (i = (a = t.aliases) == null ? void 0 : a[i.slice(1)])), !i)
        throw new Error(`Could not find aliased icon "${r}"`);
      if (Array.isArray(i))
        return {
          component: sa,
          icon: i
        };
      if (typeof i != "string")
        return {
          component: lc,
          icon: i
        };
      const o = Object.keys(t.sets).find((u) => typeof i == "string" && i.startsWith(`${u}:`)), s = o ? i.slice(o.length + 1) : i;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: s
      };
    })
  };
}, Ib = ["x-small", "small", "default", "large", "x-large"], fi = ee({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function di(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return Zl(() => {
    let n, r;
    return fo(Ib, e.size) ? n = `${t}--size-${e.size}` : e.size && (r = {
      width: me(e.size),
      height: me(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: r
    };
  });
}
const $b = ee({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Ae,
  ...ke(),
  ...fi(),
  ...rt({
    tag: "i"
  }),
  ...je()
}, "VIcon"), Xe = le()({
  name: "VIcon",
  props: $b(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const i = ie(), {
      themeClasses: o
    } = it(e), {
      iconData: s
    } = Vb(A(() => i.value || e.icon)), {
      sizeClasses: l
    } = di(e), {
      textColorClasses: a,
      textColorStyles: u
    } = wn(we(e, "color"));
    return ye(() => {
      var f, d;
      const c = (f = r.default) == null ? void 0 : f.call(r);
      return c && (i.value = (d = $d(c).filter((h) => h.type === ti && h.children && typeof h.children == "string")[0]) == null ? void 0 : d.children), w(s.value.component, {
        tag: e.tag,
        icon: s.value.icon,
        class: ["v-icon", "notranslate", o.value, l.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [l.value ? void 0 : {
          fontSize: me(e.size),
          height: me(e.size),
          width: me(e.size)
        }, u.value, e.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {
        default: () => [c]
      });
    }), {};
  }
});
function Kd(e, t) {
  const n = ie(), r = pe(!1);
  if (Yl) {
    const i = new IntersectionObserver((o) => {
      e == null || e(o, i), r.value = !!o.find((s) => s.isIntersecting);
    }, t);
    Jt(() => {
      i.disconnect();
    }), ae(n, (o, s) => {
      s && (i.unobserve(s), r.value = !1), o && i.observe(o);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: r
  };
}
function tl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = ie(), r = ie();
  if (Ve) {
    const i = new ResizeObserver((o) => {
      e == null || e(o, i), o.length && (t === "content" ? r.value = o[0].contentRect : r.value = o[0].target.getBoundingClientRect());
    });
    Jt(() => {
      i.disconnect();
    }), ae(n, (o, s) => {
      s && (i.unobserve(Yr(s)), r.value = void 0), o && i.observe(Yr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: ei(r)
  };
}
const Ab = ee({
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
  ...fi(),
  ...rt({
    tag: "div"
  }),
  ...je()
}, "VProgressCircular"), Xd = le()({
  name: "VProgressCircular",
  props: Ab(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = 20, i = 2 * Math.PI * r, o = ie(), {
      themeClasses: s
    } = it(e), {
      sizeClasses: l,
      sizeStyles: a
    } = di(e), {
      textColorClasses: u,
      textColorStyles: c
    } = wn(we(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = wn(we(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: g
    } = Kd(), {
      resizeRef: m,
      contentRect: p
    } = tl(), v = A(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), b = A(() => Number(e.width)), k = A(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(b.value, 32)), y = A(() => r / (1 - b.value / k.value) * 2), C = A(() => b.value / k.value * y.value), T = A(() => me((100 - v.value) / 100 * i));
    return _n(() => {
      h.value = o.value, m.value = o.value;
    }), ye(() => w(e.tag, {
      ref: o,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": g.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, s.value, l.value, u.value, e.class],
      style: [a.value, c.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : v.value
    }, {
      default: () => [w("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${y.value} ${y.value}`
      }, [w("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": C.value,
        "stroke-dasharray": i,
        "stroke-dashoffset": 0
      }, null), w("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": C.value,
        "stroke-dasharray": i,
        "stroke-dashoffset": T.value
      }, null)]), n.default && w("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: v.value
      })])]
    })), {};
  }
}), Go = ee({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Uo(e) {
  return {
    dimensionStyles: A(() => ({
      height: me(e.height),
      maxHeight: me(e.maxHeight),
      maxWidth: me(e.maxWidth),
      minHeight: me(e.minHeight),
      minWidth: me(e.minWidth),
      width: me(e.width)
    }))
  };
}
const Pb = {
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
}, ac = "$vuetify.", uc = (e, t) => e.replace(/\{(\d+)\}/g, (n, r) => String(t[+r])), Zd = (e, t, n) => function(r) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
    o[s - 1] = arguments[s];
  if (!r.startsWith(ac))
    return uc(r, o);
  const l = r.replace(ac, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Ou(a, l, null);
  return c || (`${r}${e.value}`, c = Ou(u, l, null)), c || (c = r), typeof c != "string" && (c = r), uc(c, o);
};
function Jd(e, t) {
  return (n, r) => new Intl.NumberFormat([e.value, t.value], r).format(n);
}
function bs(e, t, n) {
  const r = De(e, t, e[t] ?? n.value);
  return r.value = e[t] ?? n.value, ae(n, (i) => {
    e[t] == null && (r.value = n.value);
  }), r;
}
function Qd(e) {
  return (t) => {
    const n = bs(t, "locale", e.current), r = bs(t, "fallback", e.fallback), i = bs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: r,
      messages: i,
      t: Zd(n, r, i),
      n: Jd(n, r),
      provide: Qd({
        current: n,
        fallback: r,
        messages: i
      })
    };
  };
}
function Rb(e) {
  const t = pe((e == null ? void 0 : e.locale) ?? "en"), n = pe((e == null ? void 0 : e.fallback) ?? "en"), r = ie({
    en: Pb,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: r,
    t: Zd(t, n, r),
    n: Jd(t, n),
    provide: Qd({
      current: t,
      fallback: n,
      messages: r
    })
  };
}
const vo = Symbol.for("vuetify:locale");
function Nb(e) {
  return e.name != null;
}
function Ob(e) {
  const t = e != null && e.adapter && Nb(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Rb(e), n = Bb(t, e);
  return {
    ...t,
    ...n
  };
}
function qo() {
  const e = Be(vo);
  if (!e)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Fb() {
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
function Bb(e, t) {
  const n = ie((t == null ? void 0 : t.rtl) ?? Fb()), r = A(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: r,
    rtl: n,
    rtlClasses: A(() => `v-locale--is-${r.value ? "rtl" : "ltr"}`)
  };
}
function Cn() {
  const e = Be(vo);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const cc = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Yo = ee({
  location: String
}, "location");
function Ko(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: r
  } = Cn();
  return {
    locationStyles: A(() => {
      if (!e.location)
        return {};
      const {
        side: o,
        align: s
      } = Js(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, r.value);
      function l(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[cc[o]] = `calc(100% - ${l(o)}px)` : a[o] = 0), s !== "center" ? t ? a[cc[s]] = `calc(100% - ${l(s)}px)` : a[s] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const Db = ee({
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
  ...Yo({
    location: "top"
  }),
  ...en(),
  ...rt(),
  ...je()
}, "VProgressLinear"), eh = le()({
  name: "VProgressLinear",
  props: Db(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      isRtl: i,
      rtlClasses: o
    } = Cn(), {
      themeClasses: s
    } = it(e), {
      locationStyles: l
    } = Ko(e), {
      textColorClasses: a,
      textColorStyles: u
    } = wn(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = jn(A(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: h
    } = jn(e, "color"), {
      roundedClasses: g
    } = tn(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Kd(), v = A(() => parseInt(e.max, 10)), b = A(() => parseInt(e.height, 10)), k = A(() => parseFloat(e.bufferValue) / v.value * 100), y = A(() => parseFloat(r.value) / v.value * 100), C = A(() => i.value !== e.reverse), T = A(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), E = A(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function P(O) {
      if (!m.value)
        return;
      const {
        left: F,
        right: j,
        width: R
      } = m.value.getBoundingClientRect(), N = C.value ? R - O.clientX + (j - R) : O.clientX - F;
      r.value = Math.round(N / R * v.value);
    }
    return ye(() => w(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": C.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, g.value, s.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? me(b.value) : 0,
        "--v-progress-linear-height": me(b.value),
        ...l.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : y.value,
      onClick: e.clickable && P
    }, {
      default: () => [e.stream && w("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [C.value ? "left" : "right"]: me(-b.value),
          borderTop: `${me(b.value / 2)} dotted`,
          opacity: E.value,
          top: `calc(50% - ${me(b.value / 4)})`,
          width: me(100 - k.value, "%"),
          "--v-progress-linear-stream-to": me(b.value * (C.value ? 1 : -1))
        }
      }, null), w("div", {
        class: ["v-progress-linear__background", c.value],
        style: [f.value, {
          opacity: E.value,
          width: me(e.stream ? k.value : 100, "%")
        }]
      }, null), w(Kt, {
        name: T.value
      }, {
        default: () => [e.indeterminate ? w("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((O) => w("div", {
          key: O,
          class: ["v-progress-linear__indeterminate", O, d.value],
          style: h.value
        }, null))]) : w("div", {
          class: ["v-progress-linear__determinate", d.value],
          style: [h.value, {
            width: me(y.value, "%")
          }]
        }, null)]
      }), n.default && w("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: y.value,
        buffer: k.value
      })])]
    })), {};
  }
}), la = ee({
  loading: [Boolean, String]
}, "loader");
function Xo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    loaderClasses: A(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function aa(e, t) {
  var r;
  let {
    slots: n
  } = t;
  return w("div", {
    class: `${e.name}__loader`
  }, [((r = n.default) == null ? void 0 : r.call(n, {
    color: e.color,
    isActive: e.active
  })) || w(eh, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Hb = ["static", "relative", "fixed", "absolute", "sticky"], ua = ee({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Hb.includes(e)
    )
  }
}, "position");
function ca(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    positionClasses: A(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function zb() {
  const e = Qe("useRoute");
  return A(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function jb() {
  var e, t;
  return (t = (e = Qe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function fa(e, t) {
  const n = Wg("RouterLink"), r = A(() => !!(e.href || e.to)), i = A(() => (r == null ? void 0 : r.value) || ju(t, "click") || ju(e, "click"));
  if (typeof n == "string")
    return {
      isLink: r,
      isClickable: i,
      href: we(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, s = zb();
  return {
    isLink: r,
    isClickable: i,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && A(() => {
      var l, a, u;
      return e.exact ? s.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && si(o.route.value.query, s.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (l = o.isActive) == null ? void 0 : l.value;
    }),
    href: A(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const da = ee({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let _s = !1;
function Wb(e, t) {
  let n = !1, r, i;
  Ve && (He(() => {
    window.addEventListener("popstate", o), r = e == null ? void 0 : e.beforeEach((s, l, a) => {
      _s ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), _s = !0;
    }), i = e == null ? void 0 : e.afterEach(() => {
      _s = !1;
    });
  }), ht(() => {
    window.removeEventListener("popstate", o), r == null || r(), i == null || i();
  }));
  function o(s) {
    var l;
    (l = s.state) != null && l.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Gb(e, t) {
  ae(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && He(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const nl = Symbol("rippleStop"), Ub = 80;
function fc(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function rl(e) {
  return e.constructor.name === "TouchEvent";
}
function th(e) {
  return e.constructor.name === "KeyboardEvent";
}
const qb = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = 0, i = 0;
  if (!th(e)) {
    const d = t.getBoundingClientRect(), h = rl(e) ? e.touches[e.touches.length - 1] : e;
    r = h.clientX - d.left, i = h.clientY - d.top;
  }
  let o = 0, s = 0.3;
  (f = t._ripple) != null && f.circle ? (s = 0.15, o = t.clientWidth / 2, o = n.center ? o : o + Math.sqrt((r - o) ** 2 + (i - o) ** 2) / 4) : o = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const l = `${(t.clientWidth - o * 2) / 2}px`, a = `${(t.clientHeight - o * 2) / 2}px`, u = n.center ? l : `${r - o}px`, c = n.center ? a : `${i - o}px`;
  return {
    radius: o,
    scale: s,
    x: u,
    y: c,
    centerX: l,
    centerY: a
  };
}, po = {
  /* eslint-disable max-statements */
  show(e, t) {
    var h;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((h = t == null ? void 0 : t._ripple) != null && h.enabled))
      return;
    const r = document.createElement("span"), i = document.createElement("span");
    r.appendChild(i), r.className = "v-ripple__container", n.class && (r.className += ` ${n.class}`);
    const {
      radius: o,
      scale: s,
      x: l,
      y: a,
      centerX: u,
      centerY: c
    } = qb(e, t, n), f = `${o * 2}px`;
    i.className = "v-ripple__animation", i.style.width = f, i.style.height = f, t.appendChild(r);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), i.classList.add("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--visible"), fc(i, `translate(${l}, ${a}) scale3d(${s},${s},${s})`), i.dataset.activated = String(performance.now()), setTimeout(() => {
      i.classList.remove("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--in"), fc(i, `translate(${u}, ${c}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var o;
    if (!((o = e == null ? void 0 : e._ripple) != null && o.enabled))
      return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0)
      return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding)
      return;
    n.dataset.isHiding = "true";
    const r = performance.now() - Number(n.dataset.activated), i = Math.max(250 - r, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var l;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((l = n.parentNode) == null ? void 0 : l.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, i);
  }
};
function nh(e) {
  return typeof e > "u" || !!e;
}
function Jr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[nl])) {
    if (e[nl] = !0, rl(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (t.center = n._ripple.centered || th(e), n._ripple.class && (t.class = n._ripple.class), rl(e)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        po.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var r;
        (r = n == null ? void 0 : n._ripple) != null && r.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Ub);
    } else
      po.show(e, n, t);
  }
}
function dc(e) {
  e[nl] = !0;
}
function at(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        at(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), po.hide(t);
  }
}
function rh(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Qr = !1;
function ih(e) {
  !Qr && (e.keyCode === Fu.enter || e.keyCode === Fu.space) && (Qr = !0, Jr(e));
}
function oh(e) {
  Qr = !1, at(e);
}
function sh(e) {
  Qr && (Qr = !1, at(e));
}
function lh(e, t, n) {
  const {
    value: r,
    modifiers: i
  } = t, o = nh(r);
  if (o || po.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = i.center, e._ripple.circle = i.circle, uo(r) && r.class && (e._ripple.class = r.class), o && !n) {
    if (i.stop) {
      e.addEventListener("touchstart", dc, {
        passive: !0
      }), e.addEventListener("mousedown", dc);
      return;
    }
    e.addEventListener("touchstart", Jr, {
      passive: !0
    }), e.addEventListener("touchend", at, {
      passive: !0
    }), e.addEventListener("touchmove", rh, {
      passive: !0
    }), e.addEventListener("touchcancel", at), e.addEventListener("mousedown", Jr), e.addEventListener("mouseup", at), e.addEventListener("mouseleave", at), e.addEventListener("keydown", ih), e.addEventListener("keyup", oh), e.addEventListener("blur", sh), e.addEventListener("dragstart", at, {
      passive: !0
    });
  } else
    !o && n && ah(e);
}
function ah(e) {
  e.removeEventListener("mousedown", Jr), e.removeEventListener("touchstart", Jr), e.removeEventListener("touchend", at), e.removeEventListener("touchmove", rh), e.removeEventListener("touchcancel", at), e.removeEventListener("mouseup", at), e.removeEventListener("mouseleave", at), e.removeEventListener("keydown", ih), e.removeEventListener("keyup", oh), e.removeEventListener("dragstart", at), e.removeEventListener("blur", sh);
}
function Yb(e, t) {
  lh(e, t, !1);
}
function Kb(e) {
  delete e._ripple, ah(e);
}
function Xb(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = nh(t.oldValue);
  lh(e, t, n);
}
const Zo = {
  mounted: Yb,
  unmounted: Kb,
  updated: Xb
}, uh = ee({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: qd
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Ae,
  appendIcon: Ae,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...Bo(),
  ...ke(),
  ...zt(),
  ...Go(),
  ...Ho(),
  ...ia(),
  ...la(),
  ...Yo(),
  ...ua(),
  ...en(),
  ...da(),
  ...fi(),
  ...rt({
    tag: "button"
  }),
  ...je(),
  ...Yn({
    variant: "elevated"
  })
}, "VBtn"), ct = le()({
  name: "VBtn",
  directives: {
    Ripple: Zo
  },
  props: uh(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      borderClasses: o
    } = Do(e), {
      colorClasses: s,
      colorStyles: l,
      variantClasses: a
    } = ci(e), {
      densityClasses: u
    } = Qt(e), {
      dimensionStyles: c
    } = Uo(e), {
      elevationClasses: f
    } = zo(e), {
      loaderClasses: d
    } = Xo(e), {
      locationStyles: h
    } = Ko(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = tn(e), {
      sizeClasses: p,
      sizeStyles: v
    } = di(e), b = oa(e, e.symbol, !1), k = fa(e, n), y = A(() => {
      var O;
      return e.active !== void 0 ? e.active : k.isLink.value ? (O = k.isActive) == null ? void 0 : O.value : b == null ? void 0 : b.isSelected.value;
    }), C = A(() => (b == null ? void 0 : b.disabled.value) || e.disabled), T = A(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = A(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P(O) {
      var F;
      C.value || k.isLink.value && (O.metaKey || O.ctrlKey || O.shiftKey || O.button !== 0 || n.target === "_blank") || ((F = k.navigate) == null || F.call(k, O), b == null || b.toggle());
    }
    return Gb(k, b == null ? void 0 : b.select), ye(() => {
      var _, B;
      const O = k.isLink.value ? "a" : e.tag, F = !!(e.prependIcon || r.prepend), j = !!(e.appendIcon || r.append), R = !!(e.icon && e.icon !== !0), N = (b == null ? void 0 : b.isSelected.value) && (!k.isLink.value || ((_ = k.isActive) == null ? void 0 : _.value)) || !b || ((B = k.isActive) == null ? void 0 : B.value);
      return ft(w(O, {
        type: O === "a" ? void 0 : "button",
        class: ["v-btn", b == null ? void 0 : b.selectedClass.value, {
          "v-btn--active": y.value,
          "v-btn--block": e.block,
          "v-btn--disabled": C.value,
          "v-btn--elevated": T.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, i.value, o.value, N ? s.value : void 0, u.value, f.value, d.value, g.value, m.value, p.value, a.value, e.class],
        style: [N ? l.value : void 0, c.value, h.value, v.value, e.style],
        disabled: C.value || void 0,
        href: k.href.value,
        onClick: P,
        value: E.value
      }, {
        default: () => {
          var V;
          return [ui(!0, "v-btn"), !e.icon && F && w("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [r.prepend ? w(Ke, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, r.prepend) : w(Xe, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), w("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!r.default && R ? w(Xe, {
            key: "content-icon",
            icon: e.icon
          }, null) : w(Ke, {
            key: "content-defaults",
            disabled: !R,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var H;
              return [((H = r.default) == null ? void 0 : H.call(r)) ?? e.text];
            }
          })]), !e.icon && j && w("span", {
            key: "append",
            class: "v-btn__append"
          }, [r.append ? w(Ke, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, r.append) : w(Xe, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && w("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((V = r.loader) == null ? void 0 : V.call(r)) ?? w(Xd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[Un("ripple"), !C.value && e.ripple, null]]);
    }), {
      group: b
    };
  }
}), ha = le()({
  name: "VCardActions",
  props: ke(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return br({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ye(() => {
      var r;
      return w("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), il = Fo("v-card-subtitle"), Jo = Fo("v-card-title");
function Zb(e) {
  return {
    aspectStyles: A(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const ch = ee({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...ke(),
  ...Go()
}, "VResponsive"), hc = le()({
  name: "VResponsive",
  props: ch(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: r
    } = Zb(e), {
      dimensionStyles: i
    } = Uo(e);
    return ye(() => {
      var o;
      return w("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [i.value, e.style]
      }, [w("div", {
        class: "v-responsive__sizer",
        style: r.value
      }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && w("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), Qo = ee({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), gn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: r,
    disabled: i,
    group: o,
    ...s
  } = e, {
    component: l = o ? jf : Kt,
    ...a
  } = typeof r == "object" ? r : {};
  return wr(l, fe(typeof r == "string" ? {
    name: i ? "" : r
  } : a, typeof r == "string" ? {} : {
    disabled: i,
    group: o
  }, s), n);
};
function Jb(e, t) {
  if (!Yl)
    return;
  const n = t.modifiers || {}, r = t.value, {
    handler: i,
    options: o
  } = typeof r == "object" ? r : {
    handler: r,
    options: {}
  }, s = new IntersectionObserver(function() {
    var f;
    let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0;
    const u = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!u)
      return;
    const c = l.some((d) => d.isIntersecting);
    i && (!n.quiet || u.init) && (!n.once || c || u.init) && i(c, l, a), c && n.once ? fh(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: s
  }, s.observe(e);
}
function fh(e, t) {
  var r;
  const n = (r = e._observe) == null ? void 0 : r[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Qb = {
  mounted: Jb,
  unmounted: fh
}, e_ = Qb, t_ = ee({
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
  ...ch(),
  ...ke(),
  ...en(),
  ...Qo()
}, "VImg"), dh = le()({
  name: "VImg",
  directives: {
    intersect: e_
  },
  props: t_(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: r
    } = t;
    const {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = jn(we(e, "color")), {
      roundedClasses: s
    } = tn(e), l = Qe("VImg"), a = pe(""), u = ie(), c = pe(e.eager ? "loading" : "idle"), f = pe(), d = pe(), h = A(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = A(() => h.value.aspect || f.value / d.value || 0);
    ae(() => e.src, () => {
      m(c.value !== "idle");
    }), ae(g, (R, N) => {
      !R && N && u.value && y(u.value);
    }), Il(() => m());
    function m(R) {
      if (!(e.eager && R) && !(Yl && !R && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const N = new Image();
          N.src = h.value.lazySrc, y(N, null);
        }
        h.value.src && He(() => {
          var N;
          n("loadstart", ((N = u.value) == null ? void 0 : N.currentSrc) || h.value.src), setTimeout(() => {
            var _;
            if (!l.isUnmounted)
              if ((_ = u.value) != null && _.complete) {
                if (u.value.naturalWidth || v(), c.value === "error")
                  return;
                g.value || y(u.value, null), c.value === "loading" && p();
              } else
                g.value || y(u.value), b();
          });
        });
      }
    }
    function p() {
      var R;
      l.isUnmounted || (b(), y(u.value), c.value = "loaded", n("load", ((R = u.value) == null ? void 0 : R.currentSrc) || h.value.src));
    }
    function v() {
      var R;
      l.isUnmounted || (c.value = "error", n("error", ((R = u.value) == null ? void 0 : R.currentSrc) || h.value.src));
    }
    function b() {
      const R = u.value;
      R && (a.value = R.currentSrc || R.src);
    }
    let k = -1;
    Jt(() => {
      clearTimeout(k);
    });
    function y(R) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const _ = () => {
        if (clearTimeout(k), l.isUnmounted)
          return;
        const {
          naturalHeight: B,
          naturalWidth: V
        } = R;
        B || V ? (f.value = V, d.value = B) : !R.complete && c.value === "loading" && N != null ? k = window.setTimeout(_, N) : (R.currentSrc.endsWith(".svg") || R.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
      };
      _();
    }
    const C = A(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), T = () => {
      var _;
      if (!h.value.src || c.value === "idle")
        return null;
      const R = w("img", {
        class: ["v-img__img", C.value],
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
        onError: v
      }, null), N = (_ = r.sources) == null ? void 0 : _.call(r);
      return w(gn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ft(N ? w("picture", {
          class: "v-img__picture"
        }, [N, R]) : R, [[qn, c.value === "loaded"]])]
      });
    }, E = () => w(gn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && w("img", {
        class: ["v-img__img", "v-img__img--preload", C.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), P = () => r.placeholder ? w(gn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !r.error) && w("div", {
        class: "v-img__placeholder"
      }, [r.placeholder()])]
    }) : null, O = () => r.error ? w(gn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && w("div", {
        class: "v-img__error"
      }, [r.error()])]
    }) : null, F = () => e.gradient ? w("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, j = pe(!1);
    {
      const R = ae(g, (N) => {
        N && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            j.value = !0;
          });
        }), R());
      });
    }
    return ye(() => {
      const R = hc.filterProps(e);
      return ft(w(hc, fe({
        class: ["v-img", {
          "v-img--booting": !j.value
        }, i.value, s.value, e.class],
        style: [{
          width: me(e.width === "auto" ? f.value : e.width)
        }, o.value, e.style]
      }, R, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => w(Se, null, [w(T, null, null), w(E, null, null), w(F, null, null), w(P, null, null), w(O, null, null)]),
        default: r.default
      }), [[Un("intersect"), {
        handler: m,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: a,
      image: u,
      state: c,
      naturalWidth: f,
      naturalHeight: d
    };
  }
}), n_ = ee({
  start: Boolean,
  end: Boolean,
  icon: Ae,
  image: String,
  text: String,
  ...ke(),
  ...zt(),
  ...en(),
  ...fi(),
  ...rt(),
  ...je(),
  ...Yn({
    variant: "flat"
  })
}, "VAvatar"), yo = le()({
  name: "VAvatar",
  props: n_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: s
    } = ci(e), {
      densityClasses: l
    } = Qt(e), {
      roundedClasses: a
    } = tn(e), {
      sizeClasses: u,
      sizeStyles: c
    } = di(e);
    return ye(() => w(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, r.value, i.value, l.value, a.value, u.value, s.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? w(Ke, {
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
      }) : e.image ? w(dh, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? w(Xe, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, ui(!1, "v-avatar")]
    })), {};
  }
}), r_ = ee({
  appendAvatar: String,
  appendIcon: Ae,
  prependAvatar: String,
  prependIcon: Ae,
  subtitle: [String, Number],
  title: [String, Number],
  ...ke(),
  ...zt()
}, "VCardItem"), i_ = le()({
  name: "VCardItem",
  props: r_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ye(() => {
      var u;
      const r = !!(e.prependAvatar || e.prependIcon), i = !!(r || n.prepend), o = !!(e.appendAvatar || e.appendIcon), s = !!(o || n.append), l = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return w("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [i && w("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? w(Ke, {
        key: "prepend-defaults",
        disabled: !r,
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
      }, n.prepend) : w(Se, null, [e.prependAvatar && w(yo, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && w(Xe, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), w("div", {
        class: "v-card-item__content"
      }, [l && w(Jo, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && w(il, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), s && w("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? w(Ke, {
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
      }, n.append) : w(Se, null, [e.appendIcon && w(Xe, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && w(yo, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Ui = Fo("v-card-text"), o_ = ee({
  appendAvatar: String,
  appendIcon: Ae,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Ae,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...Bo(),
  ...ke(),
  ...zt(),
  ...Go(),
  ...Ho(),
  ...la(),
  ...Yo(),
  ...ua(),
  ...en(),
  ...da(),
  ...rt(),
  ...je(),
  ...Yn({
    variant: "elevated"
  })
}, "VCard"), ga = le()({
  name: "VCard",
  directives: {
    Ripple: Zo
  },
  props: o_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      borderClasses: o
    } = Do(e), {
      colorClasses: s,
      colorStyles: l,
      variantClasses: a
    } = ci(e), {
      densityClasses: u
    } = Qt(e), {
      dimensionStyles: c
    } = Uo(e), {
      elevationClasses: f
    } = zo(e), {
      loaderClasses: d
    } = Xo(e), {
      locationStyles: h
    } = Ko(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = tn(e), p = fa(e, n), v = A(() => e.link !== !1 && p.isLink.value), b = A(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return ye(() => {
      const k = v.value ? "a" : e.tag, y = !!(r.title || e.title != null), C = !!(r.subtitle || e.subtitle != null), T = y || C, E = !!(r.append || e.appendAvatar || e.appendIcon), P = !!(r.prepend || e.prependAvatar || e.prependIcon), O = !!(r.image || e.image), F = T || P || E, j = !!(r.text || e.text != null);
      return ft(w(k, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": b.value
        }, i.value, o.value, s.value, u.value, f.value, d.value, g.value, m.value, a.value, e.class],
        style: [l.value, c.value, h.value, e.style],
        href: p.href.value,
        onClick: b.value && p.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var R;
          return [O && w("div", {
            key: "image",
            class: "v-card__image"
          }, [r.image ? w(Ke, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, r.image) : w(dh, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), w(aa, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: r.loader
          }), F && w(i_, {
            key: "item",
            prependAvatar: e.prependAvatar,
            prependIcon: e.prependIcon,
            title: e.title,
            subtitle: e.subtitle,
            appendAvatar: e.appendAvatar,
            appendIcon: e.appendIcon
          }, {
            default: r.item,
            prepend: r.prepend,
            title: r.title,
            subtitle: r.subtitle,
            append: r.append
          }), j && w(Ui, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = r.text) == null ? void 0 : N.call(r)) ?? e.text];
            }
          }), (R = r.default) == null ? void 0 : R.call(r), r.actions && w(ha, null, {
            default: r.actions
          }), ui(b.value, "v-card")];
        }
      }), [[Un("ripple"), b.value && e.ripple]]);
    }), {};
  }
}), s_ = ee({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function gt(e, t, n) {
  return le()({
    name: e,
    props: s_({
      mode: n,
      origin: t
    }),
    setup(r, i) {
      let {
        slots: o
      } = i;
      const s = {
        onBeforeEnter(l) {
          r.origin && (l.style.transformOrigin = r.origin);
        },
        onLeave(l) {
          if (r.leaveAbsolute) {
            const {
              offsetTop: a,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: f
            } = l;
            l._transitionInitialStyles = {
              position: l.style.position,
              top: l.style.top,
              left: l.style.left,
              width: l.style.width,
              height: l.style.height
            }, l.style.position = "absolute", l.style.top = `${a}px`, l.style.left = `${u}px`, l.style.width = `${c}px`, l.style.height = `${f}px`;
          }
          r.hideOnLeave && l.style.setProperty("display", "none", "important");
        },
        onAfterLeave(l) {
          if (r.leaveAbsolute && (l != null && l._transitionInitialStyles)) {
            const {
              position: a,
              top: u,
              left: c,
              width: f,
              height: d
            } = l._transitionInitialStyles;
            delete l._transitionInitialStyles, l.style.position = a || "", l.style.top = u || "", l.style.left = c || "", l.style.width = f || "", l.style.height = d || "";
          }
        }
      };
      return () => {
        const l = r.group ? jf : Kt;
        return wr(l, {
          name: r.disabled ? "" : e,
          css: !r.disabled,
          ...r.group ? void 0 : {
            mode: r.mode
          },
          ...r.disabled ? {} : s
        }, o.default);
      };
    }
  });
}
function hh(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return le()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean
    },
    setup(r, i) {
      let {
        slots: o
      } = i;
      return () => wr(Kt, {
        name: r.disabled ? "" : e,
        css: !r.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...r.disabled ? {} : t
      }, o.default);
    }
  });
}
function gh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", r = Ze(`offset-${n}`);
  return {
    onBeforeEnter(s) {
      s._parent = s.parentNode, s._initialStyle = {
        transition: s.style.transition,
        overflow: s.style.overflow,
        [n]: s.style[n]
      };
    },
    onEnter(s) {
      const l = s._initialStyle;
      s.style.setProperty("transition", "none", "important"), s.style.overflow = "hidden";
      const a = `${s[r]}px`;
      s.style[n] = "0", s.offsetHeight, s.style.transition = l.transition, e && s._parent && s._parent.classList.add(e), requestAnimationFrame(() => {
        s.style[n] = a;
      });
    },
    onAfterEnter: o,
    onEnterCancelled: o,
    onLeave(s) {
      s._initialStyle = {
        transition: "",
        overflow: s.style.overflow,
        [n]: s.style[n]
      }, s.style.overflow = "hidden", s.style[n] = `${s[r]}px`, s.offsetHeight, requestAnimationFrame(() => s.style[n] = "0");
    },
    onAfterLeave: i,
    onLeaveCancelled: i
  };
  function i(s) {
    e && s._parent && s._parent.classList.remove(e), o(s);
  }
  function o(s) {
    const l = s._initialStyle[n];
    s.style.overflow = s._initialStyle.overflow, l != null && (s.style[n] = l), delete s._initialStyle;
  }
}
const l_ = ee({
  target: [Object, Array]
}, "v-dialog-transition"), mh = le()({
  name: "VDialogTransition",
  props: l_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = {
      onBeforeEnter(i) {
        i.style.pointerEvents = "none", i.style.visibility = "hidden";
      },
      async onEnter(i, o) {
        var d;
        await new Promise((h) => requestAnimationFrame(h)), await new Promise((h) => requestAnimationFrame(h)), i.style.visibility = "";
        const {
          x: s,
          y: l,
          sx: a,
          sy: u,
          speed: c
        } = mc(e.target, i), f = Rn(i, [{
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: db
        });
        (d = gc(i)) == null || d.forEach((h) => {
          Rn(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Zr
          });
        }), f.finished.then(() => o());
      },
      onAfterEnter(i) {
        i.style.removeProperty("pointer-events");
      },
      onBeforeLeave(i) {
        i.style.pointerEvents = "none";
      },
      async onLeave(i, o) {
        var d;
        await new Promise((h) => requestAnimationFrame(h));
        const {
          x: s,
          y: l,
          sx: a,
          sy: u,
          speed: c
        } = mc(e.target, i);
        Rn(i, [{}, {
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: hb
        }).finished.then(() => o()), (d = gc(i)) == null || d.forEach((h) => {
          Rn(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Zr
          });
        });
      },
      onAfterLeave(i) {
        i.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? w(Kt, fe({
      name: "dialog-transition"
    }, r, {
      css: !1
    }), n) : w(Kt, {
      name: "dialog-transition"
    }, n);
  }
});
function gc(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function mc(e, t) {
  const n = Od(e), r = Jl(t), [i, o] = getComputedStyle(t).transformOrigin.split(" ").map((v) => parseFloat(v)), [s, l] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let a = n.left + n.width / 2;
  s === "left" || l === "left" ? a -= n.width / 2 : (s === "right" || l === "right") && (a += n.width / 2);
  let u = n.top + n.height / 2;
  s === "top" || l === "top" ? u -= n.height / 2 : (s === "bottom" || l === "bottom") && (u += n.height / 2);
  const c = n.width / r.width, f = n.height / r.height, d = Math.max(1, c, f), h = c / d || 0, g = f / d || 0, m = r.width * r.height / (window.innerWidth * window.innerHeight), p = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
  return {
    x: a - (i + r.left),
    y: u - (o + r.top),
    sx: h,
    sy: g,
    speed: p
  };
}
gt("fab-transition", "center center", "out-in");
gt("dialog-bottom-transition");
gt("dialog-top-transition");
const vc = gt("fade-transition"), a_ = gt("scale-transition");
gt("scroll-x-transition");
gt("scroll-x-reverse-transition");
gt("scroll-y-transition");
gt("scroll-y-reverse-transition");
gt("slide-x-transition");
gt("slide-x-reverse-transition");
const vh = gt("slide-y-transition");
gt("slide-y-reverse-transition");
hh("expand-transition", gh());
const ph = hh("expand-x-transition", gh("", !0));
function xs(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function u_(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function pc(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: r
    } = e, i = r === "left" ? 0 : r === "center" ? t.width / 2 : r === "right" ? t.width : r, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return xs({
      x: i,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: r
    } = e, i = n === "left" ? 0 : n === "right" ? t.width : n, o = r === "top" ? 0 : r === "center" ? t.height / 2 : r === "bottom" ? t.height : r;
    return xs({
      x: i,
      y: o
    }, t);
  }
  return xs({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const yh = {
  static: d_,
  // specific viewport position, usually centered
  connected: g_
  // connected to a certain element
}, c_ = ee({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in yh
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
function f_(e, t) {
  const n = ie({}), r = ie();
  Ve && mr(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var s, l;
    ae(() => e.locationStrategy, o), ht(() => {
      window.removeEventListener("resize", i), r.value = void 0;
    }), window.addEventListener("resize", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? r.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : r.value = (l = yh[e.locationStrategy](t, e, n)) == null ? void 0 : l.updateLocation;
  });
  function i(o) {
    var s;
    (s = r.value) == null || s.call(r, o);
  }
  return {
    contentStyles: n,
    updateLocation: r
  };
}
function d_() {
}
function h_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Jl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function g_(e, t, n) {
  (Array.isArray(e.target.value) || pb(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: i,
    preferredOrigin: o
  } = Zl(() => {
    const g = Js(t.location, e.isRtl.value), m = t.origin === "overlap" ? g : t.origin === "auto" ? ys(g) : Js(t.origin, e.isRtl.value);
    return g.side === m.side && g.align === ws(m).align ? {
      preferredAnchor: Gu(g),
      preferredOrigin: Gu(m)
    } : {
      preferredAnchor: g,
      preferredOrigin: m
    };
  }), [s, l, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((g) => A(() => {
    const m = parseFloat(t[g]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = A(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const g = t.offset.split(" ").map(parseFloat);
      return g.length < 2 && g.push(0), g;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let f = !1;
  const d = new ResizeObserver(() => {
    f && h();
  });
  ae([e.target, e.contentEl], (g, m) => {
    let [p, v] = g, [b, k] = m;
    b && !Array.isArray(b) && d.unobserve(b), p && !Array.isArray(p) && d.observe(p), k && d.unobserve(k), v && d.observe(v);
  }, {
    immediate: !0
  }), ht(() => {
    d.disconnect();
  });
  function h() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value)
      return;
    const g = Od(e.target.value), m = h_(e.contentEl.value, e.isRtl.value), p = go(e.contentEl.value), v = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const b = p.reduce((j, R) => {
      const N = R.getBoundingClientRect(), _ = new Dn({
        x: R === document.documentElement ? 0 : N.x,
        y: R === document.documentElement ? 0 : N.y,
        width: R.clientWidth,
        height: R.clientHeight
      });
      return j ? new Dn({
        x: Math.max(j.left, _.left),
        y: Math.max(j.top, _.top),
        width: Math.min(j.right, _.right) - Math.max(j.left, _.left),
        height: Math.min(j.bottom, _.bottom) - Math.max(j.top, _.top)
      }) : _;
    }, void 0);
    b.x += v, b.y += v, b.width -= v * 2, b.height -= v * 2;
    let k = {
      anchor: i.value,
      origin: o.value
    };
    function y(j) {
      const R = new Dn(m), N = pc(j.anchor, g), _ = pc(j.origin, R);
      let {
        x: B,
        y: V
      } = u_(N, _);
      switch (j.anchor.side) {
        case "top":
          V -= c.value[0];
          break;
        case "bottom":
          V += c.value[0];
          break;
        case "left":
          B -= c.value[0];
          break;
        case "right":
          B += c.value[0];
          break;
      }
      switch (j.anchor.align) {
        case "top":
          V -= c.value[1];
          break;
        case "bottom":
          V += c.value[1];
          break;
        case "left":
          B -= c.value[1];
          break;
        case "right":
          B += c.value[1];
          break;
      }
      return R.x += B, R.y += V, R.width = Math.min(R.width, a.value), R.height = Math.min(R.height, u.value), {
        overflows: qu(R, b),
        x: B,
        y: V
      };
    }
    let C = 0, T = 0;
    const E = {
      x: 0,
      y: 0
    }, P = {
      x: !1,
      y: !1
    };
    let O = -1;
    for (; !(O++ > 10); ) {
      const {
        x: j,
        y: R,
        overflows: N
      } = y(k);
      C += j, T += R, m.x += j, m.y += R;
      {
        const _ = Uu(k.anchor), B = N.x.before || N.x.after, V = N.y.before || N.y.after;
        let H = !1;
        if (["x", "y"].forEach((z) => {
          if (z === "x" && B && !P.x || z === "y" && V && !P.y) {
            const K = {
              anchor: {
                ...k.anchor
              },
              origin: {
                ...k.origin
              }
            }, X = z === "x" ? _ === "y" ? ws : ys : _ === "y" ? ys : ws;
            K.anchor = X(K.anchor), K.origin = X(K.origin);
            const {
              overflows: q
            } = y(K);
            (q[z].before <= N[z].before && q[z].after <= N[z].after || q[z].before + q[z].after < (N[z].before + N[z].after) / 2) && (k = K, H = P[z] = !0);
          }
        }), H)
          continue;
      }
      N.x.before && (C += N.x.before, m.x += N.x.before), N.x.after && (C -= N.x.after, m.x -= N.x.after), N.y.before && (T += N.y.before, m.y += N.y.before), N.y.after && (T -= N.y.after, m.y -= N.y.after);
      {
        const _ = qu(m, b);
        E.x = b.width - _.x.before - _.x.after, E.y = b.height - _.y.before - _.y.after, C += _.x.before, m.x += _.x.before, T += _.y.before, m.y += _.y.before;
      }
      break;
    }
    const F = Uu(k.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${k.anchor.side} ${k.anchor.align}`,
      transformOrigin: `${k.origin.side} ${k.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: me(Cs(T)),
      left: e.isRtl.value ? void 0 : me(Cs(C)),
      right: e.isRtl.value ? me(Cs(-C)) : void 0,
      minWidth: me(F === "y" ? Math.min(s.value, g.width) : s.value),
      maxWidth: me(yc(co(E.x, s.value === 1 / 0 ? 0 : s.value, a.value))),
      maxHeight: me(yc(co(E.y, l.value === 1 / 0 ? 0 : l.value, u.value)))
    }), {
      available: E,
      contentBox: m
    };
  }
  return ae(() => [i.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), He(() => {
    const g = h();
    if (!g)
      return;
    const {
      available: m,
      contentBox: p
    } = g;
    p.height > m.y && requestAnimationFrame(() => {
      h(), requestAnimationFrame(() => {
        h();
      });
    });
  }), {
    updateLocation: h
  };
}
function Cs(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function yc(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ol = !0;
const wo = [];
function m_(e) {
  !ol || wo.length ? (wo.push(e), sl()) : (ol = !1, e(), sl());
}
let wc = -1;
function sl() {
  cancelAnimationFrame(wc), wc = requestAnimationFrame(() => {
    const e = wo.shift();
    e && e(), wo.length ? sl() : ol = !0;
  });
}
const qi = {
  none: null,
  close: y_,
  block: w_,
  reposition: b_
}, v_ = ee({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in qi
  }
}, "VOverlay-scroll-strategies");
function p_(e, t) {
  if (!Ve)
    return;
  let n;
  _n(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = yl(), await He(), n.active && n.run(() => {
      var r;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (r = qi[e.scrollStrategy]) == null || r.call(qi, t, e, n);
    }));
  }), ht(() => {
    n == null || n.stop();
  });
}
function y_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  wh(e.targetEl.value ?? e.contentEl.value, t);
}
function w_(e, t) {
  var s;
  const n = (s = e.root.value) == null ? void 0 : s.offsetParent, r = [.../* @__PURE__ */ new Set([...go(e.targetEl.value, t.contained ? n : void 0), ...go(e.contentEl.value, t.contained ? n : void 0)])].filter((l) => !l.classList.contains("v-overlay-scroll-blocked")), i = window.innerWidth - document.documentElement.offsetWidth, o = ((l) => ta(l) && l)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), r.forEach((l, a) => {
    l.style.setProperty("--v-body-scroll-x", me(-l.scrollLeft)), l.style.setProperty("--v-body-scroll-y", me(-l.scrollTop)), l !== document.documentElement && l.style.setProperty("--v-scrollbar-offset", me(i)), l.classList.add("v-overlay-scroll-blocked");
  }), ht(() => {
    r.forEach((l, a) => {
      const u = parseFloat(l.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(l.style.getPropertyValue("--v-body-scroll-y")), f = l.style.scrollBehavior;
      l.style.scrollBehavior = "auto", l.style.removeProperty("--v-body-scroll-x"), l.style.removeProperty("--v-body-scroll-y"), l.style.removeProperty("--v-scrollbar-offset"), l.classList.remove("v-overlay-scroll-blocked"), l.scrollLeft = -u, l.scrollTop = -c, l.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function b_(e, t, n) {
  let r = !1, i = -1, o = -1;
  function s(l) {
    m_(() => {
      var c, f;
      const a = performance.now();
      (f = (c = e.updateLocation).value) == null || f.call(c, l), r = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (l) => l() : requestIdleCallback)(() => {
    n.run(() => {
      wh(e.targetEl.value ?? e.contentEl.value, (l) => {
        r ? (cancelAnimationFrame(i), i = requestAnimationFrame(() => {
          i = requestAnimationFrame(() => {
            s(l);
          });
        })) : s(l);
      });
    });
  }), ht(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(i);
  });
}
function wh(e, t) {
  const n = [document, ...go(e)];
  n.forEach((r) => {
    r.addEventListener("scroll", t, {
      passive: !0
    });
  }), ht(() => {
    n.forEach((r) => {
      r.removeEventListener("scroll", t);
    });
  });
}
const ll = Symbol.for("vuetify:v-menu"), __ = ee({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function x_(e, t) {
  let n = () => {
  };
  function r(s) {
    n == null || n();
    const l = Number(s ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = Ow(l, () => {
        t == null || t(s), a(s);
      });
    });
  }
  function i() {
    return r(!0);
  }
  function o() {
    return r(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: i,
    runCloseDelay: o
  };
}
const C_ = ee({
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
  ...__()
}, "VOverlay-activator");
function S_(e, t) {
  let {
    isActive: n,
    isTop: r
  } = t;
  const i = Qe("useActivator"), o = ie();
  let s = !1, l = !1, a = !0;
  const u = A(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = A(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = x_(e, (E) => {
    E === (e.openOnHover && s || u.value && l) && !(e.openOnHover && n.value && !r.value) && (n.value !== E && (a = !0), n.value = E);
  }), h = ie(), g = {
    onClick: (E) => {
      E.stopPropagation(), o.value = E.currentTarget || E.target, n.value || (h.value = [E.clientX, E.clientY]), n.value = !n.value;
    },
    onMouseenter: (E) => {
      var P;
      (P = E.sourceCapabilities) != null && P.firesTouchEvents || (s = !0, o.value = E.currentTarget || E.target, f());
    },
    onMouseleave: (E) => {
      s = !1, d();
    },
    onFocus: (E) => {
      Rd(E.target, ":focus-visible") !== !1 && (l = !0, E.stopPropagation(), o.value = E.currentTarget || E.target, f());
    },
    onBlur: (E) => {
      l = !1, E.stopPropagation(), d();
    }
  }, m = A(() => {
    const E = {};
    return c.value && (E.onClick = g.onClick), e.openOnHover && (E.onMouseenter = g.onMouseenter, E.onMouseleave = g.onMouseleave), u.value && (E.onFocus = g.onFocus, E.onBlur = g.onBlur), E;
  }), p = A(() => {
    const E = {};
    if (e.openOnHover && (E.onMouseenter = () => {
      s = !0, f();
    }, E.onMouseleave = () => {
      s = !1, d();
    }), u.value && (E.onFocusin = () => {
      l = !0, f();
    }, E.onFocusout = () => {
      l = !1, d();
    }), e.closeOnContentClick) {
      const P = Be(ll, null);
      E.onClick = () => {
        n.value = !1, P == null || P.closeParents();
      };
    }
    return E;
  }), v = A(() => {
    const E = {};
    return e.openOnHover && (E.onMouseenter = () => {
      a && (s = !0, a = !1, f());
    }, E.onMouseleave = () => {
      s = !1, d();
    }), E;
  });
  ae(r, (E) => {
    E && (e.openOnHover && !s && (!u.value || !l) || u.value && !l && (!e.openOnHover || !s)) && (n.value = !1);
  }), ae(n, (E) => {
    E || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const b = ie();
  _n(() => {
    b.value && He(() => {
      o.value = Yr(b.value);
    });
  });
  const k = ie(), y = A(() => e.target === "cursor" && h.value ? h.value : k.value ? Yr(k.value) : bh(e.target, i) || o.value), C = A(() => Array.isArray(y.value) ? void 0 : y.value);
  let T;
  return ae(() => !!e.activator, (E) => {
    E && Ve ? (T = yl(), T.run(() => {
      k_(e, i, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : T && T.stop();
  }, {
    flush: "post",
    immediate: !0
  }), ht(() => {
    T == null || T.stop();
  }), {
    activatorEl: o,
    activatorRef: b,
    target: y,
    targetEl: C,
    targetRef: k,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: v
  };
}
function k_(e, t, n) {
  let {
    activatorEl: r,
    activatorEvents: i
  } = n;
  ae(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = l(u);
      c && s(c);
    }
    a && He(() => o());
  }, {
    immediate: !0
  }), ae(() => e.activatorProps, () => {
    o();
  }), ht(() => {
    s();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Dw(a, fe(i.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Hw(a, fe(i.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = bh(a, t);
    return r.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, r.value;
  }
}
function bh(e, t) {
  var r, i;
  if (!e)
    return;
  let n;
  if (e === "parent") {
    let o = (i = (r = t == null ? void 0 : t.proxy) == null ? void 0 : r.$el) == null ? void 0 : i.parentNode;
    for (; o != null && o.hasAttribute("data-no-activator"); )
      o = o.parentNode;
    n = o;
  } else
    typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
const al = Symbol.for("vuetify:display"), bc = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, E_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : bc;
  return ut(bc, e);
};
function _c(e) {
  return Ve && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function xc(e) {
  return Ve && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function Cc(e) {
  const t = Ve && !e ? window.navigator.userAgent : "ssr";
  function n(g) {
    return !!t.match(g);
  }
  const r = n(/android/i), i = n(/iphone|ipad|ipod/i), o = n(/cordova/i), s = n(/electron/i), l = n(/chrome/i), a = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), f = n(/win/i), d = n(/mac/i), h = n(/linux/i);
  return {
    android: r,
    ios: i,
    cordova: o,
    electron: s,
    chrome: l,
    edge: a,
    firefox: u,
    opera: c,
    win: f,
    mac: d,
    linux: h,
    touch: $w,
    ssr: t === "ssr"
  };
}
function L_(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: r
  } = E_(e), i = pe(xc(t)), o = pe(Cc(t)), s = Mt({}), l = pe(_c(t));
  function a() {
    i.value = xc(), l.value = _c();
  }
  function u() {
    a(), o.value = Cc();
  }
  return _n(() => {
    const c = l.value < n.sm, f = l.value < n.md && !c, d = l.value < n.lg && !(f || c), h = l.value < n.xl && !(d || f || c), g = l.value < n.xxl && !(h || d || f || c), m = l.value >= n.xxl, p = c ? "xs" : f ? "sm" : d ? "md" : h ? "lg" : g ? "xl" : "xxl", v = typeof r == "number" ? r : n[r], b = l.value < v;
    s.xs = c, s.sm = f, s.md = d, s.lg = h, s.xl = g, s.xxl = m, s.smAndUp = !c, s.mdAndUp = !(c || f), s.lgAndUp = !(c || f || d), s.xlAndUp = !(c || f || d || h), s.smAndDown = !(d || h || g || m), s.mdAndDown = !(h || g || m), s.lgAndDown = !(g || m), s.xlAndDown = !m, s.name = p, s.height = i.value, s.width = l.value, s.mobile = b, s.mobileBreakpoint = r, s.platform = o.value, s.thresholds = n;
  }), Ve && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...El(s),
    update: u,
    ssr: !!t
  };
}
const M_ = ee({
  mobileBreakpoint: [Number, String]
}, "display");
function _h() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = Be(al);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const r = A(() => {
    if (!e.mobileBreakpoint)
      return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o;
  }), i = A(() => t ? {
    [`${t}--mobile`]: r.value
  } : {});
  return {
    ...n,
    displayClasses: i,
    mobile: r
  };
}
function T_() {
  if (!Ve)
    return pe(!1);
  const {
    ssr: e
  } = _h();
  if (e) {
    const t = pe(!1);
    return xn(() => {
      t.value = !0;
    }), t;
  } else
    return pe(!0);
}
const xh = ee({
  eager: Boolean
}, "lazy");
function Ch(e, t) {
  const n = pe(!1), r = A(() => n.value || e.eager || t.value);
  ae(t, () => n.value = !0);
  function i() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: r,
    onAfterLeave: i
  };
}
function hi() {
  const t = Qe("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const Sc = Symbol.for("vuetify:stack"), Lr = Mt([]);
function V_(e, t, n) {
  const r = Qe("useStack"), i = !n, o = Be(Sc, void 0), s = Mt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Bt(Sc, s);
  const l = pe(+t.value);
  mr(e, () => {
    var f;
    const c = (f = Lr.at(-1)) == null ? void 0 : f[1];
    l.value = c ? c + 10 : +t.value, i && Lr.push([r.uid, l.value]), o == null || o.activeChildren.add(r.uid), ht(() => {
      if (i) {
        const d = ve(Lr).findIndex((h) => h[0] === r.uid);
        Lr.splice(d, 1);
      }
      o == null || o.activeChildren.delete(r.uid);
    });
  });
  const a = pe(!0);
  i && _n(() => {
    var f;
    const c = ((f = Lr.at(-1)) == null ? void 0 : f[0]) === r.uid;
    setTimeout(() => a.value = c);
  });
  const u = A(() => !s.activeChildren.size);
  return {
    globalTop: ei(a),
    localTop: u,
    stackStyles: A(() => ({
      zIndex: l.value
    }))
  };
}
function I_(e) {
  return {
    teleportTarget: A(() => {
      const n = e.value;
      if (n === !0 || !Ve)
        return;
      const r = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (r == null)
        return;
      let i = r.querySelector(":scope > .v-overlay-container");
      return i || (i = document.createElement("div"), i.className = "v-overlay-container", r.appendChild(i)), i;
    })
  };
}
function $_() {
  return !0;
}
function Sh(e, t, n) {
  if (!e || kh(e, n) === !1)
    return !1;
  const r = jd(t);
  if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && r.host === e.target)
    return !1;
  const i = (typeof n.value == "object" && n.value.include || (() => []))();
  return i.push(t), !i.some((o) => o == null ? void 0 : o.contains(e.target));
}
function kh(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || $_)(e);
}
function A_(e, t, n) {
  const r = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Sh(e, t, n) && setTimeout(() => {
    kh(e, n) && r && r(e);
  }, 0);
}
function kc(e, t) {
  const n = jd(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const P_ = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (i) => A_(i, e, t), r = (i) => {
      e._clickOutside.lastMousedownWasOutside = Sh(i, e, t);
    };
    kc(e, (i) => {
      i.addEventListener("click", n, !0), i.addEventListener("mousedown", r, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: r
    };
  },
  unmounted(e, t) {
    e._clickOutside && (kc(e, (n) => {
      var o;
      if (!n || !((o = e._clickOutside) != null && o[t.instance.$.uid]))
        return;
      const {
        onClick: r,
        onMousedown: i
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", r, !0), n.removeEventListener("mousedown", i, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function R_(e) {
  const {
    modelValue: t,
    color: n,
    ...r
  } = e;
  return w(Kt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && w("div", fe({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, r), null)]
  });
}
const gi = ee({
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
  ...C_(),
  ...ke(),
  ...Go(),
  ...xh(),
  ...c_(),
  ...v_(),
  ...je(),
  ...Qo()
}, "VOverlay"), bn = le()({
  name: "VOverlay",
  directives: {
    ClickOutside: P_
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...gi()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: r,
      emit: i
    } = t;
    const o = De(e, "modelValue"), s = A({
      get: () => o.value,
      set: (te) => {
        te && e.disabled || (o.value = te);
      }
    }), {
      teleportTarget: l
    } = I_(A(() => e.attach || e.contained)), {
      themeClasses: a
    } = it(e), {
      rtlClasses: u,
      isRtl: c
    } = Cn(), {
      hasContent: f,
      onAfterLeave: d
    } = Ch(e, s), h = jn(A(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: g,
      localTop: m,
      stackStyles: p
    } = V_(s, we(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: v,
      activatorRef: b,
      target: k,
      targetEl: y,
      targetRef: C,
      activatorEvents: T,
      contentEvents: E,
      scrimEvents: P
    } = S_(e, {
      isActive: s,
      isTop: m
    }), {
      dimensionStyles: O
    } = Uo(e), F = T_(), {
      scopeId: j
    } = hi();
    ae(() => e.disabled, (te) => {
      te && (s.value = !1);
    });
    const R = ie(), N = ie(), {
      contentStyles: _,
      updateLocation: B
    } = f_(e, {
      isRtl: c,
      contentEl: N,
      target: k,
      isActive: s
    });
    p_(e, {
      root: R,
      contentEl: N,
      targetEl: y,
      isActive: s,
      updateLocation: B
    });
    function V(te) {
      i("click:outside", te), e.persistent ? q() : s.value = !1;
    }
    function H() {
      return s.value && g.value;
    }
    Ve && ae(s, (te) => {
      te ? window.addEventListener("keydown", z) : window.removeEventListener("keydown", z);
    }, {
      immediate: !0
    }), Jt(() => {
      Ve && window.removeEventListener("keydown", z);
    });
    function z(te) {
      var ue, xe;
      te.key === "Escape" && g.value && (e.persistent ? q() : (s.value = !1, (ue = N.value) != null && ue.contains(document.activeElement) && ((xe = v.value) == null || xe.focus())));
    }
    const K = jb();
    mr(() => e.closeOnBack, () => {
      Wb(K, (te) => {
        g.value && s.value ? (te(!1), e.persistent ? q() : s.value = !1) : te();
      });
    });
    const X = ie();
    ae(() => s.value && (e.absolute || e.contained) && l.value == null, (te) => {
      if (te) {
        const ue = gb(R.value);
        ue && ue !== document.scrollingElement && (X.value = ue.scrollTop);
      }
    });
    function q() {
      e.noClickAnimation || N.value && Rn(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Zr
      });
    }
    function J() {
      d(), i("afterLeave");
    }
    return ye(() => {
      var te;
      return w(Se, null, [(te = n.activator) == null ? void 0 : te.call(n, {
        isActive: s.value,
        props: fe({
          ref: b,
          targetRef: C
        }, T.value, e.activatorProps)
      }), F.value && f.value && w(Lm, {
        disabled: !l.value,
        to: l.value
      }, {
        default: () => [w("div", fe({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": s.value,
            "v-overlay--contained": e.contained
          }, a.value, u.value, e.class],
          style: [p.value, {
            "--v-overlay-opacity": e.opacity,
            top: me(X.value)
          }, e.style],
          ref: R
        }, j, r), [w(R_, fe({
          color: h,
          modelValue: s.value && !!e.scrim
        }, P.value), null), w(gn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: k.value,
          onAfterLeave: J
        }, {
          default: () => {
            var ue;
            return [ft(w("div", fe({
              ref: N,
              class: ["v-overlay__content", e.contentClass],
              style: [O.value, _.value]
            }, E.value, e.contentProps), [(ue = n.default) == null ? void 0 : ue.call(n, {
              isActive: s
            })]), [[qn, s.value], [Un("click-outside"), {
              handler: V,
              closeConditional: H,
              include: () => [v.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: v,
      target: k,
      animateClick: q,
      contentEl: N,
      globalTop: g,
      localTop: m,
      updateLocation: B
    };
  }
}), Ss = Symbol("Forwarded refs");
function ks(e, t) {
  let n = e;
  for (; n; ) {
    const r = Reflect.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = Object.getPrototypeOf(n);
  }
}
function _r(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return e[Ss] = n, new Proxy(e, {
    get(i, o) {
      if (Reflect.has(i, o))
        return Reflect.get(i, o);
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const s of n)
          if (s.value && Reflect.has(s.value, o)) {
            const l = Reflect.get(s.value, o);
            return typeof l == "function" ? l.bind(s.value) : l;
          }
      }
    },
    has(i, o) {
      if (Reflect.has(i, o))
        return !0;
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))
        return !1;
      for (const s of n)
        if (s.value && Reflect.has(s.value, o))
          return !0;
      return !1;
    },
    set(i, o, s) {
      if (Reflect.has(i, o))
        return Reflect.set(i, o, s);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))
        return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, o))
          return Reflect.set(l.value, o, s);
      return !1;
    },
    getOwnPropertyDescriptor(i, o) {
      var l;
      const s = Reflect.getOwnPropertyDescriptor(i, o);
      if (s)
        return s;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const a of n) {
          if (!a.value)
            continue;
          const u = ks(a.value, o) ?? ("_" in a.value ? ks((l = a.value._) == null ? void 0 : l.setupState, o) : void 0);
          if (u)
            return u;
        }
        for (const a of n) {
          const u = a.value && a.value[Ss];
          if (!u)
            continue;
          const c = u.slice();
          for (; c.length; ) {
            const f = c.shift(), d = ks(f.value, o);
            if (d)
              return d;
            const h = f.value && f.value[Ss];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const N_ = ee({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...gi({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: mh
    },
    zIndex: 2400
  })
}, "VDialog"), Eh = le()({
  name: "VDialog",
  props: N_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      scopeId: i
    } = hi(), o = ie();
    function s(a) {
      var f, d;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((f = o.value) != null && f.contentEl) && // We're the topmost dialog
      ((d = o.value) != null && d.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Kr(o.value.contentEl);
        if (!h.length)
          return;
        const g = h[0], m = h[h.length - 1];
        u === g ? m.focus() : g.focus();
      }
    }
    Ve && ae(() => r.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", s) : document.removeEventListener("focusin", s);
    }, {
      immediate: !0
    }), ae(r, async (a) => {
      var u, c;
      await He(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const l = A(() => fe({
      "aria-haspopup": "dialog",
      "aria-expanded": String(r.value)
    }, e.activatorProps));
    return ye(() => {
      const a = bn.filterProps(e);
      return w(bn, fe({
        ref: o,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, a, {
        modelValue: r.value,
        "onUpdate:modelValue": (u) => r.value = u,
        "aria-modal": "true",
        activatorProps: l.value,
        role: "dialog"
      }, i), {
        activator: n.activator,
        default: function() {
          for (var u = arguments.length, c = new Array(u), f = 0; f < u; f++)
            c[f] = arguments[f];
          return w(Ke, {
            root: "VDialog"
          }, {
            default: () => {
              var d;
              return [(d = n.default) == null ? void 0 : d.call(n, ...c)];
            }
          });
        }
      });
    }), _r({}, o);
  }
});
function Ec(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function Lc(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: r,
    isRtl: i,
    currentScrollOffset: o,
    isHorizontal: s
  } = e;
  const l = s ? t.clientWidth : t.clientHeight, a = s ? t.offsetLeft : t.offsetTop, u = i && s ? r - a - l : a, c = n + o, f = l + u, d = l * 0.4;
  return u <= o ? o = Math.max(u - d, 0) : c <= f && (o = Math.min(o - (c - f - d), r - n)), o;
}
function O_(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: r,
    isRtl: i,
    isHorizontal: o
  } = e;
  const s = o ? t.clientWidth : t.clientHeight, l = o ? t.offsetLeft : t.offsetTop, a = i && o ? r - l - s / 2 - n / 2 : l + s / 2 - n / 2;
  return Math.min(r - n, Math.max(0, a));
}
const F_ = Symbol.for("vuetify:v-slide-group"), ma = ee({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: F_
  },
  nextIcon: {
    type: Ae,
    default: "$next"
  },
  prevIcon: {
    type: Ae,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...ke(),
  ...M_(),
  ...rt(),
  ...ra({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), bo = le()({
  name: "VSlideGroup",
  props: ma(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: r
    } = Cn(), {
      displayClasses: i,
      mobile: o
    } = _h(e), s = jo(e, e.symbol), l = pe(!1), a = pe(0), u = pe(0), c = pe(0), f = A(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: h
    } = tl(), {
      resizeRef: g,
      contentRect: m
    } = tl(), p = A(() => s.selected.value.length ? s.items.value.findIndex((q) => q.id === s.selected.value[0]) : -1), v = A(() => s.selected.value.length ? s.items.value.findIndex((q) => q.id === s.selected.value[s.selected.value.length - 1]) : -1);
    if (Ve) {
      let q = -1;
      ae(() => [s.selected.value, h.value, m.value, f.value], () => {
        cancelAnimationFrame(q), q = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const J = f.value ? "width" : "height";
            u.value = h.value[J], c.value = m.value[J], l.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && g.value) {
            const J = g.value.children[v.value];
            p.value === 0 || !l.value ? a.value = 0 : e.centerActive ? a.value = O_({
              selectedElement: J,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              isHorizontal: f.value
            }) : l.value && (a.value = Lc({
              selectedElement: J,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              currentScrollOffset: a.value,
              isHorizontal: f.value
            }));
          }
        });
      });
    }
    const b = pe(!1);
    let k = 0, y = 0;
    function C(q) {
      const J = f.value ? "clientX" : "clientY";
      y = (r.value && f.value ? -1 : 1) * a.value, k = q.touches[0][J], b.value = !0;
    }
    function T(q) {
      if (!l.value)
        return;
      const J = f.value ? "clientX" : "clientY", te = r.value && f.value ? -1 : 1;
      a.value = te * (y + k - q.touches[0][J]);
    }
    function E(q) {
      const J = c.value - u.value;
      a.value < 0 || !l.value ? a.value = 0 : a.value >= J && (a.value = J), b.value = !1;
    }
    function P() {
      d.value && (d.value[f.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const O = pe(!1);
    function F(q) {
      if (O.value = !0, !(!l.value || !g.value)) {
        for (const J of q.composedPath())
          for (const te of g.value.children)
            if (te === J) {
              a.value = Lc({
                selectedElement: te,
                containerSize: u.value,
                contentSize: c.value,
                isRtl: r.value,
                currentScrollOffset: a.value,
                isHorizontal: f.value
              });
              return;
            }
      }
    }
    function j(q) {
      O.value = !1;
    }
    function R(q) {
      var J;
      !O.value && !(q.relatedTarget && ((J = g.value) != null && J.contains(q.relatedTarget))) && _();
    }
    function N(q) {
      g.value && (f.value ? q.key === "ArrowRight" ? _(r.value ? "prev" : "next") : q.key === "ArrowLeft" && _(r.value ? "next" : "prev") : q.key === "ArrowDown" ? _("next") : q.key === "ArrowUp" && _("prev"), q.key === "Home" ? _("first") : q.key === "End" && _("last"));
    }
    function _(q) {
      var J, te, ue, xe, he;
      if (g.value)
        if (!q)
          (J = Kr(g.value)[0]) == null || J.focus();
        else if (q === "next") {
          const Ce = (te = g.value.querySelector(":focus")) == null ? void 0 : te.nextElementSibling;
          Ce ? Ce.focus() : _("first");
        } else if (q === "prev") {
          const Ce = (ue = g.value.querySelector(":focus")) == null ? void 0 : ue.previousElementSibling;
          Ce ? Ce.focus() : _("last");
        } else
          q === "first" ? (xe = g.value.firstElementChild) == null || xe.focus() : q === "last" && ((he = g.value.lastElementChild) == null || he.focus());
    }
    function B(q) {
      const J = a.value + (q === "prev" ? -1 : 1) * u.value;
      a.value = co(J, 0, c.value - u.value);
    }
    const V = A(() => {
      let q = a.value > c.value - u.value ? -(c.value - u.value) + Ec(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (q = Ec(-a.value));
      const J = r.value && f.value ? -1 : 1;
      return {
        transform: `translate${f.value ? "X" : "Y"}(${J * q}px)`,
        transition: b.value ? "none" : "",
        willChange: b.value ? "transform" : ""
      };
    }), H = A(() => ({
      next: s.next,
      prev: s.prev,
      select: s.select,
      isSelected: s.isSelected
    })), z = A(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !o.value;
        case !0:
          return l.value || Math.abs(a.value) > 0;
        case "mobile":
          return o.value || l.value || Math.abs(a.value) > 0;
        default:
          return !o.value && (l.value || Math.abs(a.value) > 0);
      }
    }), K = A(() => Math.abs(a.value) > 0), X = A(() => c.value > Math.abs(a.value) + u.value);
    return ye(() => w(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !f.value,
        "v-slide-group--has-affixes": z.value,
        "v-slide-group--is-overflowing": l.value
      }, i.value, e.class],
      style: e.style,
      tabindex: O.value || s.selected.value.length ? -1 : 0,
      onFocus: R
    }, {
      default: () => {
        var q, J, te;
        return [z.value && w("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !K.value
          }],
          onClick: () => K.value && B("prev")
        }, [((q = n.prev) == null ? void 0 : q.call(n, H.value)) ?? w(vc, null, {
          default: () => [w(Xe, {
            icon: r.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), w("div", {
          key: "container",
          ref: d,
          class: "v-slide-group__container",
          onScroll: P
        }, [w("div", {
          ref: g,
          class: "v-slide-group__content",
          style: V.value,
          onTouchstartPassive: C,
          onTouchmovePassive: T,
          onTouchendPassive: E,
          onFocusin: F,
          onFocusout: j,
          onKeydown: N
        }, [(J = n.default) == null ? void 0 : J.call(n, H.value)])]), z.value && w("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !X.value
          }],
          onClick: () => X.value && B("next")
        }, [((te = n.next) == null ? void 0 : te.call(n, H.value)) ?? w(vc, null, {
          default: () => [w(Xe, {
            icon: r.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: s.selected,
      scrollTo: B,
      scrollOffset: a,
      focus: _
    };
  }
}), Lh = Symbol.for("vuetify:v-chip-group"), B_ = ee({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: si
  },
  ...ma(),
  ...ke(),
  ...ra({
    selectedClass: "v-chip--selected"
  }),
  ...rt(),
  ...je(),
  ...Yn({
    variant: "tonal"
  })
}, "VChipGroup");
le()({
  name: "VChipGroup",
  props: B_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      isSelected: i,
      select: o,
      next: s,
      prev: l,
      selected: a
    } = jo(e, Lh);
    return br({
      VChip: {
        color: we(e, "color"),
        disabled: we(e, "disabled"),
        filter: we(e, "filter"),
        variant: we(e, "variant")
      }
    }), ye(() => {
      const u = bo.filterProps(e);
      return w(bo, fe(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, r.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: i,
            select: o,
            next: s,
            prev: l,
            selected: a.value
          })];
        }
      });
    }), {};
  }
});
const D_ = ee({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Ae,
  closable: Boolean,
  closeIcon: {
    type: Ae,
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
  prependIcon: Ae,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Yt(),
  onClickOnce: Yt(),
  ...Bo(),
  ...ke(),
  ...zt(),
  ...Ho(),
  ...ia(),
  ...en(),
  ...da(),
  ...fi(),
  ...rt({
    tag: "span"
  }),
  ...je(),
  ...Yn({
    variant: "tonal"
  })
}, "VChip"), H_ = le()({
  name: "VChip",
  directives: {
    Ripple: Zo
  },
  props: D_(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: i
    } = t;
    const {
      t: o
    } = qo(), {
      borderClasses: s
    } = Do(e), {
      colorClasses: l,
      colorStyles: a,
      variantClasses: u
    } = ci(e), {
      densityClasses: c
    } = Qt(e), {
      elevationClasses: f
    } = zo(e), {
      roundedClasses: d
    } = tn(e), {
      sizeClasses: h
    } = di(e), {
      themeClasses: g
    } = it(e), m = De(e, "modelValue"), p = oa(e, Lh, !1), v = fa(e, n), b = A(() => e.link !== !1 && v.isLink.value), k = A(() => !e.disabled && e.link !== !1 && (!!p || e.link || v.isClickable.value)), y = A(() => ({
      "aria-label": o(e.closeLabel),
      onClick(E) {
        E.stopPropagation(), m.value = !1, r("click:close", E);
      }
    }));
    function C(E) {
      var P;
      r("click", E), k.value && ((P = v.navigate) == null || P.call(v, E), p == null || p.toggle());
    }
    function T(E) {
      (E.key === "Enter" || E.key === " ") && (E.preventDefault(), C(E));
    }
    return () => {
      const E = v.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), O = !!(P || i.append), F = !!(i.close || e.closable), j = !!(i.filter || e.filter) && p, R = !!(e.prependIcon || e.prependAvatar), N = !!(R || i.prepend), _ = !p || p.isSelected.value;
      return m.value && ft(w(E, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": k.value,
          "v-chip--filter": j,
          "v-chip--pill": e.pill
        }, g.value, s.value, _ ? l.value : void 0, c.value, f.value, d.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [_ ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: v.href.value,
        tabindex: k.value ? 0 : void 0,
        onClick: C,
        onKeydown: k.value && !b.value && T
      }, {
        default: () => {
          var B;
          return [ui(k.value, "v-chip"), j && w(ph, {
            key: "filter"
          }, {
            default: () => [ft(w("div", {
              class: "v-chip__filter"
            }, [i.filter ? w(Ke, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, i.filter) : w(Xe, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[qn, p.isSelected.value]])]
          }), N && w("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [i.prepend ? w(Ke, {
            key: "prepend-defaults",
            disabled: !R,
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
          }, i.prepend) : w(Se, null, [e.prependIcon && w(Xe, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && w(yo, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), w("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((B = i.default) == null ? void 0 : B.call(i, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), O && w("div", {
            key: "append",
            class: "v-chip__append"
          }, [i.append ? w(Ke, {
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
          }, i.append) : w(Se, null, [e.appendIcon && w(Xe, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(yo, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), F && w("button", fe({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, y.value), [i.close ? w(Ke, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, i.close) : w(Xe, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Un("ripple"), k.value && e.ripple, null]]);
    };
  }
}), z_ = ee({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ke(),
  ...Qo({
    transition: {
      component: vh
    }
  })
}, "VCounter"), j_ = le()({
  name: "VCounter",
  functional: !0,
  props: z_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = A(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ye(() => w(gn, {
      transition: e.transition
    }, {
      default: () => [ft(w("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: r.value,
        max: e.max,
        value: e.value
      }) : r.value]), [[qn, e.active]])]
    })), {};
  }
}), W_ = ee({
  text: String,
  onClick: Yt(),
  ...ke(),
  ...je()
}, "VLabel"), Mh = le()({
  name: "VLabel",
  props: W_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ye(() => {
      var r;
      return w("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), G_ = ee({
  floating: Boolean,
  ...ke()
}, "VFieldLabel"), Ai = le()({
  name: "VFieldLabel",
  props: G_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ye(() => w(Mh, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Th(e) {
  const {
    t
  } = qo();
  function n(r) {
    let {
      name: i
    } = r;
    const o = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[i], s = e[`onClick:${i}`], l = s && o ? t(`$vuetify.input.${o}`, e.label ?? "") : void 0;
    return w(Xe, {
      icon: e[`${i}Icon`],
      "aria-label": l,
      onClick: s
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Vh = ee({
  focused: Boolean,
  "onUpdate:focused": Yt()
}, "focus");
function va(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = De(e, "focused"), r = A(() => ({
    [`${t}--focused`]: n.value
  }));
  function i() {
    n.value = !0;
  }
  function o() {
    n.value = !1;
  }
  return {
    focusClasses: r,
    isFocused: n,
    focus: i,
    blur: o
  };
}
const U_ = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ih = ee({
  appendInnerIcon: Ae,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Ae,
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
  prependInnerIcon: Ae,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => U_.includes(e)
  },
  "onClick:clear": Yt(),
  "onClick:appendInner": Yt(),
  "onClick:prependInner": Yt(),
  ...ke(),
  ...la(),
  ...en(),
  ...je()
}, "VField"), $h = le()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Vh(),
    ...Ih()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: i
    } = t;
    const {
      themeClasses: o
    } = it(e), {
      loaderClasses: s
    } = Xo(e), {
      focusClasses: l,
      isFocused: a,
      focus: u,
      blur: c
    } = va(e), {
      InputIcon: f
    } = Th(e), {
      roundedClasses: d
    } = tn(e), {
      rtlClasses: h
    } = Cn(), g = A(() => e.dirty || e.active), m = A(() => !e.singleLine && !!(e.label || i.label)), p = Vt(), v = A(() => e.id || `input-${p}`), b = A(() => `${v.value}-messages`), k = ie(), y = ie(), C = ie(), T = A(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: E,
      backgroundColorStyles: P
    } = jn(we(e, "bgColor")), {
      textColorClasses: O,
      textColorStyles: F
    } = wn(A(() => e.error || e.disabled ? void 0 : g.value && a.value ? e.color : e.baseColor));
    ae(g, (N) => {
      if (m.value) {
        const _ = k.value.$el, B = y.value.$el;
        requestAnimationFrame(() => {
          const V = Jl(_), H = B.getBoundingClientRect(), z = H.x - V.x, K = H.y - V.y - (V.height / 2 - H.height / 2), X = H.width / 0.75, q = Math.abs(X - V.width) > 1 ? {
            maxWidth: me(X)
          } : void 0, J = getComputedStyle(_), te = getComputedStyle(B), ue = parseFloat(J.transitionDuration) * 1e3 || 150, xe = parseFloat(te.getPropertyValue("--v-field-label-scale")), he = te.getPropertyValue("color");
          _.style.visibility = "visible", B.style.visibility = "hidden", Rn(_, {
            transform: `translate(${z}px, ${K}px) scale(${xe})`,
            color: he,
            ...q
          }, {
            duration: ue,
            easing: Zr,
            direction: N ? "normal" : "reverse"
          }).finished.then(() => {
            _.style.removeProperty("visibility"), B.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const j = A(() => ({
      isActive: g,
      isFocused: a,
      controlRef: C,
      blur: c,
      focus: u
    }));
    function R(N) {
      N.target !== document.activeElement && N.preventDefault();
    }
    return ye(() => {
      var z, K, X;
      const N = e.variant === "outlined", _ = i["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || i.clear), V = !!(i["append-inner"] || e.appendInnerIcon || B), H = () => i.label ? i.label({
        ...j.value,
        label: e.label,
        props: {
          for: v.value
        }
      }) : e.label;
      return w("div", fe({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": V,
          "v-field--center-affix": e.centerAffix ?? !T.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": _,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !H(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, E.value, l.value, s.value, d.value, h.value, e.class],
        style: [P.value, e.style],
        onClick: R
      }, n), [w("div", {
        class: "v-field__overlay"
      }, null), w(aa, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: i.loader
      }), _ && w("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && w(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (z = i["prepend-inner"]) == null ? void 0 : z.call(i, j.value)]), w("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && w(Ai, {
        key: "floating-label",
        ref: y,
        class: [O.value],
        floating: !0,
        for: v.value,
        style: F.value
      }, {
        default: () => [H()]
      }), w(Ai, {
        ref: k,
        for: v.value
      }, {
        default: () => [H()]
      }), (K = i.default) == null ? void 0 : K.call(i, {
        ...j.value,
        props: {
          id: v.value,
          class: "v-field__input",
          "aria-describedby": b.value
        },
        focus: u,
        blur: c
      })]), B && w(ph, {
        key: "clear"
      }, {
        default: () => [ft(w("div", {
          class: "v-field__clearable",
          onMousedown: (q) => {
            q.preventDefault(), q.stopPropagation();
          }
        }, [i.clear ? i.clear() : w(f, {
          name: "clear"
        }, null)]), [[qn, e.dirty]])]
      }), V && w("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(X = i["append-inner"]) == null ? void 0 : X.call(i, j.value), e.appendInnerIcon && w(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), w("div", {
        class: ["v-field__outline", O.value],
        style: F.value
      }, [N && w(Se, null, [w("div", {
        class: "v-field__outline__start"
      }, null), m.value && w("div", {
        class: "v-field__outline__notch"
      }, [w(Ai, {
        ref: y,
        floating: !0,
        for: v.value
      }, {
        default: () => [H()]
      })]), w("div", {
        class: "v-field__outline__end"
      }, null)]), T.value && m.value && w(Ai, {
        ref: y,
        floating: !0,
        for: v.value
      }, {
        default: () => [H()]
      })])]);
    }), {
      controlRef: C
    };
  }
});
function q_(e) {
  const t = Object.keys($h.props).filter((n) => !Kl(n) && n !== "class" && n !== "style");
  return Vd(e, t);
}
const Y_ = ee({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ke(),
  ...Qo({
    transition: {
      component: vh,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), K_ = le()({
  name: "VMessages",
  props: Y_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = A(() => qt(e.messages)), {
      textColorClasses: i,
      textColorStyles: o
    } = wn(A(() => e.color));
    return ye(() => w(gn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", i.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && r.value.map((s, l) => w("div", {
        class: "v-messages__message",
        key: `${l}-${r.value}`
      }, [n.message ? n.message({
        message: s
      }) : s]))]
    })), {};
  }
}), X_ = Symbol.for("vuetify:form");
function Z_() {
  return Be(X_, null);
}
const J_ = ee({
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
  ...Vh()
}, "validation");
function Q_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Vt();
  const r = De(e, "modelValue"), i = A(() => e.validationValue === void 0 ? r.value : e.validationValue), o = Z_(), s = ie([]), l = pe(!0), a = A(() => !!(qt(r.value === "" ? null : r.value).length || qt(i.value === "" ? null : i.value).length)), u = A(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = A(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = A(() => {
    var y;
    return (y = e.errorMessages) != null && y.length ? qt(e.errorMessages).concat(s.value).slice(0, Math.max(0, +e.maxErrors)) : s.value;
  }), d = A(() => {
    let y = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    y === "lazy" && (y = "input lazy");
    const C = new Set((y == null ? void 0 : y.split(" ")) ?? []);
    return {
      blur: C.has("blur") || C.has("input"),
      input: C.has("input"),
      submit: C.has("submit"),
      lazy: C.has("lazy")
    };
  }), h = A(() => {
    var y;
    return e.error || (y = e.errorMessages) != null && y.length ? !1 : e.rules.length ? l.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), g = pe(!1), m = A(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = A(() => e.name ?? Nt(n));
  Il(() => {
    o == null || o.register({
      id: p.value,
      validate: k,
      reset: v,
      resetValidation: b
    });
  }), Jt(() => {
    o == null || o.unregister(p.value);
  }), xn(async () => {
    d.value.lazy || await k(!0), o == null || o.update(p.value, h.value, f.value);
  }), mr(() => d.value.input, () => {
    ae(i, () => {
      if (i.value != null)
        k();
      else if (e.focused) {
        const y = ae(() => e.focused, (C) => {
          C || k(), y();
        });
      }
    });
  }), mr(() => d.value.blur, () => {
    ae(() => e.focused, (y) => {
      y || k();
    });
  }), ae([h, f], () => {
    o == null || o.update(p.value, h.value, f.value);
  });
  function v() {
    r.value = null, He(b);
  }
  function b() {
    l.value = !0, d.value.lazy ? s.value = [] : k(!0);
  }
  async function k() {
    let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const C = [];
    g.value = !0;
    for (const T of e.rules) {
      if (C.length >= +(e.maxErrors ?? 1))
        break;
      const P = await (typeof T == "function" ? T : () => T)(i.value);
      if (P !== !0) {
        if (P !== !1 && typeof P != "string") {
          console.warn(`${P} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        C.push(P || "");
      }
    }
    return s.value = C, g.value = !1, l.value = y, s.value;
  }
  return {
    errorMessages: f,
    isDirty: a,
    isDisabled: u,
    isReadonly: c,
    isPristine: l,
    isValid: h,
    isValidating: g,
    reset: v,
    resetValidation: b,
    validate: k,
    validationClasses: m
  };
}
const pa = ee({
  id: String,
  appendIcon: Ae,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Ae,
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
  "onClick:prepend": Yt(),
  "onClick:append": Yt(),
  ...ke(),
  ...zt(),
  ...J_()
}, "VInput"), _o = le()({
  name: "VInput",
  props: {
    ...pa()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r,
      emit: i
    } = t;
    const {
      densityClasses: o
    } = Qt(e), {
      rtlClasses: s
    } = Cn(), {
      InputIcon: l
    } = Th(e), a = Vt(), u = A(() => e.id || `input-${a}`), c = A(() => `${u.value}-messages`), {
      errorMessages: f,
      isDirty: d,
      isDisabled: h,
      isReadonly: g,
      isPristine: m,
      isValid: p,
      isValidating: v,
      reset: b,
      resetValidation: k,
      validate: y,
      validationClasses: C
    } = Q_(e, "v-input", u), T = A(() => ({
      id: u,
      messagesId: c,
      isDirty: d,
      isDisabled: h,
      isReadonly: g,
      isPristine: m,
      isValid: p,
      isValidating: v,
      reset: b,
      resetValidation: k,
      validate: y
    })), E = A(() => {
      var P;
      return (P = e.errorMessages) != null && P.length || !m.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ye(() => {
      var R, N, _, B;
      const P = !!(r.prepend || e.prependIcon), O = !!(r.append || e.appendIcon), F = E.value.length > 0, j = !e.hideDetails || e.hideDetails === "auto" && (F || !!r.details);
      return w("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, C.value, e.class],
        style: e.style
      }, [P && w("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(R = r.prepend) == null ? void 0 : R.call(r, T.value), e.prependIcon && w(l, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), r.default && w("div", {
        class: "v-input__control"
      }, [(N = r.default) == null ? void 0 : N.call(r, T.value)]), O && w("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && w(l, {
        key: "append-icon",
        name: "append"
      }, null), (_ = r.append) == null ? void 0 : _.call(r, T.value)]), j && w("div", {
        class: "v-input__details"
      }, [w(K_, {
        id: c.value,
        active: F,
        messages: E.value
      }, {
        message: r.message
      }), (B = r.details) == null ? void 0 : B.call(r, T.value)])]);
    }), {
      reset: b,
      resetValidation: k,
      validate: y,
      isValid: p,
      errorMessages: f
    };
  }
}), e2 = ee({
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
  ...pa({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => qt(e).every((t) => t != null && typeof t == "object")
  },
  ...Ih({
    clearable: !0
  })
}, "VFileInput"), t2 = le()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: e2(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: i
    } = t;
    const {
      t: o
    } = qo(), s = De(e, "modelValue"), {
      isFocused: l,
      focus: a,
      blur: u
    } = va(e), c = A(() => typeof e.showSize != "boolean" ? e.showSize : void 0), f = A(() => (s.value ?? []).reduce((O, F) => {
      let {
        size: j = 0
      } = F;
      return O + j;
    }, 0)), d = A(() => zu(f.value, c.value)), h = A(() => (s.value ?? []).map((O) => {
      const {
        name: F = "",
        size: j = 0
      } = O;
      return e.showSize ? `${F} (${zu(j, c.value)})` : F;
    })), g = A(() => {
      var F;
      const O = ((F = s.value) == null ? void 0 : F.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, O, d.value) : o(e.counterString, O);
    }), m = ie(), p = ie(), v = ie(), b = A(() => l.value || e.active), k = A(() => ["plain", "underlined"].includes(e.variant));
    function y() {
      var O;
      v.value !== document.activeElement && ((O = v.value) == null || O.focus()), l.value || a();
    }
    function C(O) {
      var F;
      (F = v.value) == null || F.click();
    }
    function T(O) {
      r("mousedown:control", O);
    }
    function E(O) {
      var F;
      (F = v.value) == null || F.click(), r("click:control", O);
    }
    function P(O) {
      O.stopPropagation(), y(), He(() => {
        s.value = [], Nw(e["onClick:clear"], O);
      });
    }
    return ae(s, (O) => {
      (!Array.isArray(O) || !O.length) && v.value && (v.value.value = "");
    }), ye(() => {
      const O = !!(i.counter || e.counter), F = !!(O || i.details), [j, R] = Xl(n), {
        modelValue: N,
        ..._
      } = _o.filterProps(e), B = q_(e);
      return w(_o, fe({
        ref: m,
        modelValue: s.value,
        "onUpdate:modelValue": (V) => s.value = V,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": k.value
        }, e.class],
        style: e.style,
        "onClick:prepend": C
      }, j, _, {
        centerAffix: !k.value,
        focused: l.value
      }), {
        ...i,
        default: (V) => {
          let {
            id: H,
            isDisabled: z,
            isDirty: K,
            isReadonly: X,
            isValid: q
          } = V;
          return w($h, fe({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: T,
            onClick: E,
            "onClick:clear": P,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, B, {
            id: H.value,
            active: b.value || K.value,
            dirty: K.value,
            disabled: z.value,
            focused: l.value,
            error: q.value === !1
          }), {
            ...i,
            default: (J) => {
              var xe;
              let {
                props: {
                  class: te,
                  ...ue
                }
              } = J;
              return w(Se, null, [w("input", fe({
                ref: v,
                type: "file",
                readonly: X.value,
                disabled: z.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (he) => {
                  he.stopPropagation(), X.value && he.preventDefault(), y();
                },
                onChange: (he) => {
                  if (!he.target)
                    return;
                  const Ce = he.target;
                  s.value = [...Ce.files ?? []];
                },
                onFocus: y,
                onBlur: u
              }, ue, R), null), w("div", {
                class: te
              }, [!!((xe = s.value) != null && xe.length) && (i.selection ? i.selection({
                fileNames: h.value,
                totalBytes: f.value,
                totalBytesReadable: d.value
              }) : e.chips ? h.value.map((he) => w(H_, {
                key: he,
                size: "small",
                color: e.color
              }, {
                default: () => [he]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: F ? (V) => {
          var H, z;
          return w(Se, null, [(H = i.details) == null ? void 0 : H.call(i, V), O && w(Se, null, [w("span", null, null), w(j_, {
            active: !!((z = s.value) != null && z.length),
            value: g.value
          }, i.counter)])]);
        } : void 0
      });
    }), _r({}, m, p, v);
  }
}), n2 = ee({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...ke(),
  ...rt()
}, "VContainer"), Mc = le()({
  name: "VContainer",
  props: n2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: r
    } = Cn();
    return ye(() => w(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), Ah = Fo("v-spacer", "div", "VSpacer");
function r2(e) {
  const t = pe(e);
  let n = -1;
  function r() {
    clearInterval(n);
  }
  function i() {
    r(), He(() => t.value = e);
  }
  function o(s) {
    const l = s ? getComputedStyle(s) : {
      transitionDuration: 0.2
    }, a = parseFloat(l.transitionDuration) * 1e3 || 200;
    if (r(), t.value <= 0)
      return;
    const u = performance.now();
    n = window.setInterval(() => {
      const c = performance.now() - u + a;
      t.value = Math.max(e - c, 0), t.value <= 0 && r();
    }, a);
  }
  return ht(r), {
    clear: r,
    time: t,
    start: o,
    reset: i
  };
}
const i2 = ee({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Yo({
    location: "bottom"
  }),
  ...ua(),
  ...en(),
  ...Yn(),
  ...je(),
  ...li(gi({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), o2 = le()({
  name: "VSnackbar",
  props: i2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      locationStyles: i
    } = Ko(e), {
      positionClasses: o
    } = ca(e), {
      scopeId: s
    } = hi(), {
      themeClasses: l
    } = it(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = ci(e), {
      roundedClasses: f
    } = tn(e), d = r2(Number(e.timeout)), h = ie(), g = ie(), m = pe(!1);
    ae(r, v), ae(() => e.timeout, v), xn(() => {
      r.value && v();
    });
    let p = -1;
    function v() {
      d.reset(), window.clearTimeout(p);
      const C = Number(e.timeout);
      if (!r.value || C === -1)
        return;
      const T = Yr(g.value);
      d.start(T), p = window.setTimeout(() => {
        r.value = !1;
      }, C);
    }
    function b() {
      d.reset(), window.clearTimeout(p);
    }
    function k() {
      m.value = !0, b();
    }
    function y() {
      m.value = !1, v();
    }
    return ye(() => {
      const C = bn.filterProps(e), T = !!(n.default || n.text || e.text);
      return w(bn, fe({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": r.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, C, {
        modelValue: r.value,
        "onUpdate:modelValue": (E) => r.value = E,
        contentProps: fe({
          class: ["v-snackbar__wrapper", l.value, a.value, f.value, c.value],
          style: [i.value, u.value],
          onPointerenter: k,
          onPointerleave: y
        }, C.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, s), {
        default: () => {
          var E, P;
          return [ui(!1, "v-snackbar"), e.timer && !m.value && w("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [w(eh, {
            ref: g,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), T && w("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((E = n.text) == null ? void 0 : E.call(n)) ?? e.text, (P = n.default) == null ? void 0 : P.call(n)]), n.actions && w(Ke, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [w("div", {
              class: "v-snackbar__actions"
            }, [n.actions()])]
          })];
        },
        activator: n.activator
      });
    }), _r({}, h);
  }
}), Ph = Symbol.for("vuetify:v-tabs"), s2 = ee({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...li(uh({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), ul = le()({
  name: "VTab",
  props: s2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: r
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: o
    } = wn(e, "sliderColor"), s = ie(), l = ie(), a = A(() => e.direction === "horizontal"), u = A(() => {
      var f, d;
      return ((d = (f = s.value) == null ? void 0 : f.group) == null ? void 0 : d.isSelected.value) ?? !1;
    });
    function c(f) {
      var h, g;
      let {
        value: d
      } = f;
      if (d) {
        const m = (g = (h = s.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : g.querySelector(".v-tab--selected .v-tab__slider"), p = l.value;
        if (!m || !p)
          return;
        const v = getComputedStyle(m).color, b = m.getBoundingClientRect(), k = p.getBoundingClientRect(), y = a.value ? "x" : "y", C = a.value ? "X" : "Y", T = a.value ? "right" : "bottom", E = a.value ? "width" : "height", P = b[y], O = k[y], F = P > O ? b[T] - k[T] : b[y] - k[y], j = Math.sign(F) > 0 ? a.value ? "right" : "bottom" : Math.sign(F) < 0 ? a.value ? "left" : "top" : "center", N = (Math.abs(F) + (Math.sign(F) < 0 ? b[E] : k[E])) / Math.max(b[E], k[E]) || 0, _ = b[E] / k[E] || 0, B = 1.5;
        Rn(p, {
          backgroundColor: [v, "currentcolor"],
          transform: [`translate${C}(${F}px) scale${C}(${_})`, `translate${C}(${F / B}px) scale${C}(${(N - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(j)
        }, {
          duration: 225,
          easing: Zr
        });
      }
    }
    return ye(() => {
      const f = ct.filterProps(e);
      return w(ct, fe({
        symbol: Ph,
        ref: s,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, f, r, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...n,
        default: () => {
          var d;
          return w(Se, null, [((d = n.default) == null ? void 0 : d.call(n)) ?? e.text, !e.hideSlider && w("div", {
            ref: l,
            class: ["v-tab__slider", i.value],
            style: o.value
          }, null)]);
        }
      });
    }), _r({}, s);
  }
});
function l2(e) {
  return e ? e.map((t) => uo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const a2 = ee({
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
  ...ma({
    mandatory: "force"
  }),
  ...zt(),
  ...rt()
}, "VTabs"), u2 = le()({
  name: "VTabs",
  props: a2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), i = A(() => l2(e.items)), {
      densityClasses: o
    } = Qt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: l
    } = jn(we(e, "bgColor"));
    return br({
      VTab: {
        color: we(e, "color"),
        direction: we(e, "direction"),
        stacked: we(e, "stacked"),
        fixed: we(e, "fixedTabs"),
        sliderColor: we(e, "sliderColor"),
        hideSlider: we(e, "hideSlider")
      }
    }), ye(() => {
      const a = bo.filterProps(e);
      return w(bo, fe(a, {
        modelValue: r.value,
        "onUpdate:modelValue": (u) => r.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, s.value, e.class],
        style: [{
          "--v-tabs-height": me(e.height)
        }, l.value, e.style],
        role: "tablist",
        symbol: Ph
      }), {
        default: () => [n.default ? n.default() : i.value.map((u) => w(ul, fe(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), c2 = ee({
  id: String,
  text: String,
  ...li(gi({
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
}, "VTooltip"), ur = le()({
  name: "VTooltip",
  props: c2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      scopeId: i
    } = hi(), o = Vt(), s = A(() => e.id || `v-tooltip-${o}`), l = ie(), a = A(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = A(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = A(() => e.transition ? e.transition : r.value ? "scale-transition" : "fade-transition"), f = A(() => fe({
      "aria-describedby": s.value
    }, e.activatorProps));
    return ye(() => {
      const d = bn.filterProps(e);
      return w(bn, fe({
        ref: l,
        class: ["v-tooltip", e.class],
        style: e.style,
        id: s.value
      }, d, {
        modelValue: r.value,
        "onUpdate:modelValue": (h) => r.value = h,
        transition: c.value,
        absolute: !0,
        location: a.value,
        origin: u.value,
        persistent: !0,
        role: "tooltip",
        activatorProps: f.value,
        _disableGlobalStack: !0
      }, i), {
        activator: n.activator,
        default: function() {
          var p;
          for (var h = arguments.length, g = new Array(h), m = 0; m < h; m++)
            g[m] = arguments[m];
          return ((p = n.default) == null ? void 0 : p.call(n, ...g)) ?? e.text;
        }
      });
    }), _r({}, l);
  }
}), f2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: r,
    touchendY: i
  } = e, o = 0.5, s = 16;
  e.offsetX = n - t, e.offsetY = i - r, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - s && e.left(e), e.right && n > t + s && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && i < r - s && e.up(e), e.down && i > r + s && e.down(e));
};
function d2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (r = t.start) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function h2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (r = t.end) == null || r.call(t, {
    originalEvent: e,
    ...t
  }), f2(t);
}
function g2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (r = t.move) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function m2() {
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
    touchstart: (n) => d2(n, t),
    touchend: (n) => h2(n, t),
    touchmove: (n) => g2(n, t)
  };
}
function v2(e, t) {
  var l;
  const n = t.value, r = n != null && n.parent ? e.parentElement : e, i = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!r || !o)
    return;
  const s = m2(t.value);
  r._touchHandlers = r._touchHandlers ?? /* @__PURE__ */ Object.create(null), r._touchHandlers[o] = s, Td(s).forEach((a) => {
    r.addEventListener(a, s[a], i);
  });
}
function p2(e, t) {
  var o, s;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, r = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!(n != null && n._touchHandlers) || !r)
    return;
  const i = n._touchHandlers[r];
  Td(i).forEach((l) => {
    n.removeEventListener(l, i[l]);
  }), delete n._touchHandlers[r];
}
const Rh = {
  mounted: v2,
  unmounted: p2
}, y2 = Rh, Nh = Symbol.for("vuetify:v-window"), Oh = Symbol.for("vuetify:v-window-group"), w2 = ee({
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
  ...rt(),
  ...je()
}, "VWindow"), b2 = le()({
  name: "VWindow",
  directives: {
    Touch: Rh
  },
  props: w2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      isRtl: i
    } = Cn(), {
      t: o
    } = qo(), s = jo(e, Oh), l = ie(), a = A(() => i.value ? !e.reverse : e.reverse), u = pe(!1), c = A(() => {
      const y = e.direction === "vertical" ? "y" : "x", T = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${y}${T}-transition`;
    }), f = pe(0), d = ie(void 0), h = A(() => s.items.value.findIndex((y) => s.selected.value.includes(y.id)));
    ae(h, (y, C) => {
      const T = s.items.value.length, E = T - 1;
      T <= 2 ? u.value = y < C : y === E && C === 0 ? u.value = !0 : y === 0 && C === E ? u.value = !1 : u.value = y < C;
    }), Bt(Nh, {
      transition: c,
      isReversed: u,
      transitionCount: f,
      transitionHeight: d,
      rootRef: l
    });
    const g = A(() => e.continuous || h.value !== 0), m = A(() => e.continuous || h.value !== s.items.value.length - 1);
    function p() {
      g.value && s.prev();
    }
    function v() {
      m.value && s.next();
    }
    const b = A(() => {
      const y = [], C = {
        icon: i.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: s.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      y.push(g.value ? n.prev ? n.prev({
        props: C
      }) : w(ct, C, null) : w("div", null, null));
      const T = {
        icon: i.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: s.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return y.push(m.value ? n.next ? n.next({
        props: T
      }) : w(ct, T, null) : w("div", null, null)), y;
    }), k = A(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : v();
        },
        right: () => {
          a.value ? v() : p();
        },
        start: (C) => {
          let {
            originalEvent: T
          } = C;
          T.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ye(() => ft(w(e.tag, {
      ref: l,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, r.value, e.class],
      style: e.style
    }, {
      default: () => {
        var y, C;
        return [w("div", {
          class: "v-window__container",
          style: {
            height: d.value
          }
        }, [(y = n.default) == null ? void 0 : y.call(n, {
          group: s
        }), e.showArrows !== !1 && w("div", {
          class: "v-window__controls"
        }, [b.value])]), (C = n.additional) == null ? void 0 : C.call(n, {
          group: s
        })];
      }
    }), [[Un("touch"), k.value]])), {
      group: s
    };
  }
});
function _2() {
  const e = pe(!1);
  return xn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: A(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ei(e)
  };
}
const x2 = ee({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ke(),
  ...ia(),
  ...xh()
}, "VWindowItem"), Tc = le()({
  name: "VWindowItem",
  directives: {
    Touch: y2
  },
  props: x2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(Nh), i = oa(e, Oh), {
      isBooted: o
    } = _2();
    if (!r || !i)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const s = pe(!1), l = A(() => o.value && (r.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !s.value || !r || (s.value = !1, r.transitionCount.value > 0 && (r.transitionCount.value -= 1, r.transitionCount.value === 0 && (r.transitionHeight.value = void 0)));
    }
    function u() {
      var g;
      s.value || !r || (s.value = !0, r.transitionCount.value === 0 && (r.transitionHeight.value = me((g = r.rootRef.value) == null ? void 0 : g.clientHeight)), r.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function f(g) {
      s.value && He(() => {
        !l.value || !s.value || !r || (r.transitionHeight.value = me(g.clientHeight));
      });
    }
    const d = A(() => {
      const g = r.isReversed.value ? e.reverseTransition : e.transition;
      return l.value ? {
        name: typeof g != "string" ? r.transition.value : g,
        onBeforeEnter: u,
        onAfterEnter: a,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: a,
        onLeaveCancelled: c,
        onEnter: f
      } : !1;
    }), {
      hasContent: h
    } = Ch(e, i.isSelected);
    return ye(() => w(gn, {
      transition: d.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [ft(w("div", {
          class: ["v-window-item", i.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((g = n.default) == null ? void 0 : g.call(n))]), [[qn, i.isSelected.value]])];
      }
    })), {
      groupItem: i
    };
  }
}), C2 = /* @__PURE__ */ Re("h3", { class: "heading" }, "Select File", -1), S2 = /* @__PURE__ */ Re("b", null, "replace", -1), k2 = /* @__PURE__ */ Re("h3", { class: "heading" }, "Preview", -1), E2 = /* @__PURE__ */ Re("b", null, "copy", -1), L2 = /* @__PURE__ */ yr({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, r = t, i = ie(!1), o = ie(0), s = ie(), l = ie(!1), a = A(
      () => {
        var h;
        return o.value === 0 && (s == null ? void 0 : s.value) && ((h = s == null ? void 0 : s.value[0]) == null ? void 0 : h.name.toLowerCase().endsWith(".tgf")) || o.value === 1 && n.graphAsTgf !== "Graph is empty";
      }
    ), u = [
      (h) => !!h[0] || "File is required",
      (h) => {
        var g;
        return !h || /\.(tgf|TGF)$/.test((g = h[0]) == null ? void 0 : g.name) || "Invalid file format. Please select a .tgf file.";
      }
    ];
    function c() {
      if (s != null && s.value) {
        const h = new FileReader();
        for (let g of s.value)
          h.readAsText(g), h.onload = (m) => {
            var p;
            r("file-imported", (p = m.target) == null ? void 0 : p.result), d();
          }, h.onerror = (m) => {
            var p;
            console.error(
              //@ts-ignore
              `Error reading the file ${s.name}: ${(p = m.target) == null ? void 0 : p.error}`
            );
          };
      }
    }
    function f() {
      o.value === 0 ? c() : o.value === 1 && navigator.clipboard.writeText(n.graphAsTgf.toString()).then(
        () => l.value = !0,
        (h) => console.error("Copy unsuccessful: ", h)
      );
    }
    function d() {
      i.value = !1, o.value = 0, s.value = void 0, l.value = !1;
    }
    return (h, g) => (Hn(), Vo(Eh, {
      modelValue: i.value,
      "onUpdate:modelValue": g[6] || (g[6] = (m) => i.value = m),
      "max-width": "800px"
    }, {
      activator: de(({ props: m }) => [
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: de(({ props: p }) => [
            w(ct, fe({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...m, ...p }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: de(() => [
        w(ga, null, {
          default: de(() => [
            w(Jo, null, {
              default: de(() => [
                w(u2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": g[0] || (g[0] = (m) => o.value = m)
                }, {
                  default: de(() => [
                    w(ul, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: de(() => [
                        Ge("Import")
                      ]),
                      _: 1
                    }),
                    w(ul, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: de(() => [
                        Ge("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            w(Ui, null, {
              default: de(() => [
                w(b2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": g[2] || (g[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: de(() => [
                    w(Tc, null, {
                      default: de(() => [
                        C2,
                        w(t2, {
                          modelValue: s.value,
                          "onUpdate:modelValue": g[1] || (g[1] = (m) => s.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        w(Ui, null, {
                          default: de(() => [
                            Ge(" The import is limited to files in trivial graph format. Importing will "),
                            S2,
                            Ge(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    w(Tc, null, {
                      default: de(() => [
                        k2,
                        Re("pre", null, Mn(n.graphAsTgf), 1),
                        w(Ui, null, {
                          default: de(() => [
                            Ge("This export action will "),
                            E2,
                            Ge(" the graph in trivial graph format to your clipboard.")
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
            w(ha, null, {
              default: de(() => [
                w(Ah),
                w(ct, {
                  color: "secondary",
                  variant: "text",
                  disabled: !a.value,
                  onClick: g[3] || (g[3] = (m) => f())
                }, {
                  default: de(() => [
                    Ge("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                w(ct, {
                  color: "secondary",
                  variant: "text",
                  onClick: g[4] || (g[4] = (m) => d())
                }, {
                  default: de(() => [
                    Ge("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        w(o2, {
          modelValue: l.value,
          "onUpdate:modelValue": g[5] || (g[5] = (m) => l.value = m),
          timeout: 1500
        }, {
          default: de(() => [
            Ge("Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), M2 = ".heading{margin-top:10px;margin-bottom:10px}", ya = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, T2 = /* @__PURE__ */ ya(L2, [["styles", [M2]]]), V2 = ee({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...li(gi({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: mh
    }
  }), ["absolute"])
}, "VMenu"), I2 = le()({
  name: "VMenu",
  props: V2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      scopeId: i
    } = hi(), o = Vt(), s = A(() => e.id || `v-menu-${o}`), l = ie(), a = Be(ll, null), u = pe(0);
    Bt(ll, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Fw(m, l.value.contentEl)) && (r.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var b, k, y;
      const p = m.relatedTarget, v = m.target;
      await He(), r.value && p !== v && ((b = l.value) != null && b.contentEl) && // We're the topmost menu
      ((k = l.value) != null && k.globalTop) && // It isn't the document or the menu body
      ![document, l.value.contentEl].includes(v) && // It isn't inside the menu body
      !l.value.contentEl.contains(v) && ((y = Kr(l.value.contentEl)[0]) == null || y.focus());
    }
    ae(r, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function f(m) {
      a == null || a.closeParents(m);
    }
    function d(m) {
      var p, v, b;
      e.disabled || m.key === "Tab" && (Pd(Kr((p = l.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (y) => y.tabIndex >= 0) || (r.value = !1, (b = (v = l.value) == null ? void 0 : v.activatorEl) == null || b.focus()));
    }
    function h(m) {
      var v;
      if (e.disabled)
        return;
      const p = (v = l.value) == null ? void 0 : v.contentEl;
      p && r.value ? m.key === "ArrowDown" ? (m.preventDefault(), Zs(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Zs(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (r.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const g = A(() => fe({
      "aria-haspopup": "menu",
      "aria-expanded": String(r.value),
      "aria-owns": s.value,
      onKeydown: h
    }, e.activatorProps));
    return ye(() => {
      const m = bn.filterProps(e);
      return w(bn, fe({
        ref: l,
        id: s.value,
        class: ["v-menu", e.class],
        style: e.style
      }, m, {
        modelValue: r.value,
        "onUpdate:modelValue": (p) => r.value = p,
        absolute: !0,
        activatorProps: g.value,
        "onClick:outside": f,
        onKeydown: d
      }, i), {
        activator: n.activator,
        default: function() {
          for (var p = arguments.length, v = new Array(p), b = 0; b < p; b++)
            v[b] = arguments[b];
          return w(Ke, {
            root: "VMenu"
          }, {
            default: () => {
              var k;
              return [(k = n.default) == null ? void 0 : k.call(n, ...v)];
            }
          });
        }
      });
    }), _r({
      id: s,
      ΨopenChildren: u
    }, l);
  }
}), Fh = Symbol.for("vuetify:selection-control-group"), Bh = ee({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Ae,
  trueIcon: Ae,
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
    default: si
  },
  ...ke(),
  ...zt(),
  ...je()
}, "SelectionControlGroup"), $2 = ee({
  ...Bh({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
le()({
  name: "VSelectionControlGroup",
  props: $2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), i = Vt(), o = A(() => e.id || `v-selection-control-group-${i}`), s = A(() => e.name || o.value), l = /* @__PURE__ */ new Set();
    return Bt(Fh, {
      modelValue: r,
      forceUpdate: () => {
        l.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        l.add(a), ht(() => {
          l.delete(a);
        });
      }
    }), br({
      [e.defaultsTarget]: {
        color: we(e, "color"),
        disabled: we(e, "disabled"),
        density: we(e, "density"),
        error: we(e, "error"),
        inline: we(e, "inline"),
        modelValue: r,
        multiple: A(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)),
        name: s,
        falseIcon: we(e, "falseIcon"),
        trueIcon: we(e, "trueIcon"),
        readonly: we(e, "readonly"),
        ripple: we(e, "ripple"),
        type: we(e, "type"),
        valueComparator: we(e, "valueComparator")
      }
    }), ye(() => {
      var a;
      return w("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
});
const Dh = ee({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ke(),
  ...Bh()
}, "VSelectionControl");
function A2(e) {
  const t = Be(Fh, void 0), {
    densityClasses: n
  } = Qt(e), r = De(e, "modelValue"), i = A(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = A(() => e.falseValue !== void 0 ? e.falseValue : !1), s = A(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)), l = A({
    get() {
      const h = t ? t.modelValue.value : r.value;
      return s.value ? qt(h).some((g) => e.valueComparator(g, i.value)) : e.valueComparator(h, i.value);
    },
    set(h) {
      if (e.readonly)
        return;
      const g = h ? i.value : o.value;
      let m = g;
      s.value && (m = h ? [...qt(r.value), g] : qt(r.value).filter((p) => !e.valueComparator(p, i.value))), t ? t.modelValue.value = m : r.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = wn(A(() => {
    if (!(e.error || e.disabled))
      return l.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = jn(A(() => l.value && !e.error && !e.disabled ? e.color : void 0)), d = A(() => l.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: i,
    falseValue: o,
    model: l,
    textColorClasses: a,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: f,
    icon: d
  };
}
const Vc = le()({
  name: "VSelectionControl",
  directives: {
    Ripple: Zo
  },
  inheritAttrs: !1,
  props: Dh(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      group: i,
      densityClasses: o,
      icon: s,
      model: l,
      textColorClasses: a,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: f,
      trueValue: d
    } = A2(e), h = Vt(), g = pe(!1), m = pe(!1), p = ie(), v = A(() => e.id || `input-${h}`), b = A(() => !e.disabled && !e.readonly);
    i == null || i.onForceUpdate(() => {
      p.value && (p.value.checked = l.value);
    });
    function k(E) {
      b.value && (g.value = !0, Rd(E.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function y() {
      g.value = !1, m.value = !1;
    }
    function C(E) {
      E.stopPropagation();
    }
    function T(E) {
      b.value && (e.readonly && i && He(() => i.forceUpdate()), l.value = E.target.checked);
    }
    return ye(() => {
      var j, R;
      const E = r.label ? r.label({
        label: e.label,
        props: {
          for: v.value
        }
      }) : e.label, [P, O] = Xl(n), F = w("input", fe({
        ref: p,
        checked: l.value,
        disabled: !!e.disabled,
        id: v.value,
        onBlur: y,
        onFocus: k,
        onInput: T,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: d.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? l.value : void 0
      }, O), null);
      return w("div", fe({
        class: ["v-selection-control", {
          "v-selection-control--dirty": l.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": m.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, P, {
        style: e.style
      }), [w("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(j = r.default) == null ? void 0 : j.call(r, {
        backgroundColorClasses: c,
        backgroundColorStyles: f
      }), ft(w("div", {
        class: ["v-selection-control__input"]
      }, [((R = r.input) == null ? void 0 : R.call(r, {
        model: l,
        textColorClasses: a,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: f,
        inputNode: F,
        icon: s.value,
        props: {
          onFocus: k,
          onBlur: y,
          id: v.value
        }
      })) ?? w(Se, null, [s.value && w(Xe, {
        key: "icon",
        icon: s.value
      }, null), F])]), [[Un("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), E && w(Mh, {
        for: v.value,
        onClick: C
      }, {
        default: () => [E]
      })]);
    }), {
      isFocused: g,
      input: p
    };
  }
}), P2 = ee({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...pa(),
  ...Dh()
}, "VSwitch"), Pi = le()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: P2(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const i = De(e, "indeterminate"), o = De(e, "modelValue"), {
      loaderClasses: s
    } = Xo(e), {
      isFocused: l,
      focus: a,
      blur: u
    } = va(e), c = ie(), f = A(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = Vt(), h = A(() => e.id || `switch-${d}`);
    function g() {
      i.value && (i.value = !1);
    }
    function m(p) {
      var v, b;
      p.stopPropagation(), p.preventDefault(), (b = (v = c.value) == null ? void 0 : v.input) == null || b.click();
    }
    return ye(() => {
      const [p, v] = Xl(n), b = _o.filterProps(e), k = Vc.filterProps(e);
      return w(_o, fe({
        class: ["v-switch", {
          "v-switch--flat": e.flat
        }, {
          "v-switch--inset": e.inset
        }, {
          "v-switch--indeterminate": i.value
        }, s.value, e.class]
      }, p, b, {
        modelValue: o.value,
        "onUpdate:modelValue": (y) => o.value = y,
        id: h.value,
        focused: l.value,
        style: e.style
      }), {
        ...r,
        default: (y) => {
          let {
            id: C,
            messagesId: T,
            isDisabled: E,
            isReadonly: P,
            isValid: O
          } = y;
          const F = {
            model: o,
            isValid: O
          };
          return w(Vc, fe({
            ref: c
          }, k, {
            modelValue: o.value,
            "onUpdate:modelValue": [(j) => o.value = j, g],
            id: C.value,
            "aria-describedby": T.value,
            type: "checkbox",
            "aria-checked": i.value ? "mixed" : void 0,
            disabled: E.value,
            readonly: P.value,
            onFocus: a,
            onBlur: u
          }, v), {
            ...r,
            default: (j) => {
              let {
                backgroundColorClasses: R,
                backgroundColorStyles: N
              } = j;
              return w("div", {
                class: ["v-switch__track", ...R.value],
                style: N.value,
                onClick: m
              }, [r["track-true"] && w("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [r["track-true"](F)]), r["track-false"] && w("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [r["track-false"](F)])]);
            },
            input: (j) => {
              let {
                inputNode: R,
                icon: N,
                backgroundColorClasses: _,
                backgroundColorStyles: B
              } = j;
              return w(Se, null, [R, w("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": N || e.loading
                }, e.inset ? void 0 : _.value],
                style: e.inset ? void 0 : B.value
              }, [r.thumb ? w(Ke, {
                defaults: {
                  VIcon: {
                    icon: N,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [r.thumb({
                  ...F,
                  icon: N
                })]
              }) : w(a_, null, {
                default: () => [e.loading ? w(aa, {
                  name: "v-switch",
                  active: !0,
                  color: O.value === !1 ? void 0 : f.value
                }, {
                  default: (V) => r.loader ? r.loader(V) : w(Xd, {
                    active: V.isActive,
                    color: V.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && w(Xe, {
                  key: String(N),
                  icon: N,
                  size: "x-small"
                }, null)]
              })])]);
            }
          });
        }
      });
    }), {};
  }
}), R2 = /* @__PURE__ */ yr({
  __name: "GraphSettings",
  props: {
    nodeLabelsEnabled: { type: null },
    linkLabelsEnabled: { type: null },
    physicsEnabled: { type: null },
    fixedLinkDistanceEnabled: { type: null }
  },
  emits: [
    "toggle-node-physics",
    "toggle-node-labels",
    "toggle-link-labels",
    "toggle-fixed-link-distance"
  ],
  setup(e, { emit: t }) {
    const n = e, r = ie(!1), i = t, o = A({
      get: () => n.nodeLabelsEnabled,
      set: (u) => {
        i("toggle-node-labels", u);
      }
    }), s = A({
      get: () => n.physicsEnabled,
      set: (u) => {
        i("toggle-node-physics", u);
      }
    }), l = A({
      get: () => n.linkLabelsEnabled,
      set: (u) => {
        i("toggle-link-labels", u);
      }
    }), a = A({
      get: () => n.fixedLinkDistanceEnabled,
      set: (u) => {
        i("toggle-fixed-link-distance", u);
      }
    });
    return (u, c) => (Hn(), Vo(I2, {
      modelValue: r.value,
      "onUpdate:modelValue": c[4] || (c[4] = (f) => r.value = f),
      "close-on-content-click": !1,
      transition: "slide-y-transition"
    }, {
      activator: de(({ props: f }) => [
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: de(({ props: d }) => [
            w(ct, fe({
              "aria-label": "Settings",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$settings"
            }, { ...f, ...d }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: de(() => [
        w(ga, null, {
          default: de(() => [
            w(Jo, null, {
              default: de(() => [
                Ge(" Settings ")
              ]),
              _: 1
            }),
            w(il, null, {
              default: de(() => [
                Ge("Nodes")
              ]),
              _: 1
            }),
            w(Mc, null, {
              default: de(() => [
                w(Pi, {
                  modelValue: o.value,
                  "onUpdate:modelValue": c[0] || (c[0] = (f) => o.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                w(Pi, {
                  modelValue: s.value,
                  "onUpdate:modelValue": c[1] || (c[1] = (f) => s.value = f),
                  color: "secondary",
                  label: "Physics"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            w(il, null, {
              default: de(() => [
                Ge("Links")
              ]),
              _: 1
            }),
            w(Mc, null, {
              default: de(() => [
                w(Pi, {
                  modelValue: l.value,
                  "onUpdate:modelValue": c[2] || (c[2] = (f) => l.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                w(Pi, {
                  modelValue: a.value,
                  "onUpdate:modelValue": c[3] || (c[3] = (f) => a.value = f),
                  color: "secondary",
                  label: "Fixed Distance"
                }, null, 8, ["modelValue"])
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
}), N2 = ee({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...ke(),
  ...zt(),
  ...rt(),
  ...je()
}, "VTable"), O2 = le()({
  name: "VTable",
  props: N2(),
  setup(e, t) {
    let {
      slots: n,
      emit: r
    } = t;
    const {
      themeClasses: i
    } = it(e), {
      densityClasses: o
    } = Qt(e);
    return ye(() => w(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover
      }, i.value, o.value, e.class],
      style: e.style
    }, {
      default: () => {
        var s, l, a;
        return [(s = n.top) == null ? void 0 : s.call(n), n.default ? w("div", {
          class: "v-table__wrapper",
          style: {
            height: me(e.height)
          }
        }, [w("table", null, [n.default()])]) : (l = n.wrapper) == null ? void 0 : l.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), F2 = { class: "text-left" }, B2 = { class: "text-left" }, D2 = { class: "text-left" }, H2 = /* @__PURE__ */ yr({
  __name: "GraphHelp",
  setup(e) {
    const t = [
      {
        action: "Create node",
        desktop: "Double-click",
        mobile: "Double-tap"
      },
      {
        action: "Move node",
        desktop: "Right-click & drag",
        mobile: "Long tap & drag"
      },
      {
        action: "Create link",
        desktop: "Left-click on node & drag",
        mobile: "Touch & drag"
      },
      {
        action: "Create/Update label",
        desktop: "Left-click on label",
        mobile: "Touch"
      },
      {
        action: "Delete node/link",
        desktop: "Middle-click",
        mobile: "Multi-touch"
      },
      // still needs testing on mobile
      {
        action: "Pan",
        desktop: "Left-click & drag",
        mobile: "Multi-touch"
      },
      {
        action: "Zoom",
        desktop: "Mouse wheel",
        mobile: "Multi-touch"
      }
    ], n = ie(!1), r = ["Action", "Desktop", "Mobile"];
    return (i, o) => (Hn(), Vo(Eh, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (s) => n.value = s),
      "max-width": "800px"
    }, {
      activator: de(({ props: s }) => [
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: de(({ props: l }) => [
            w(ct, fe({
              "aria-label": "Help",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              icon: "$help",
              elevation: "6"
            }, { ...s, ...l }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: de(() => [
        w(ga, null, {
          default: de(() => [
            w(Jo, { class: "card-header" }, {
              default: de(() => [
                Ge("Controls")
              ]),
              _: 1
            }),
            w(O2, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: de(() => [
                Re("thead", null, [
                  Re("tr", null, [
                    Re("th", F2, Mn(r[0]), 1),
                    Re("th", B2, Mn(r[1]), 1),
                    Re("th", D2, Mn(r[2]), 1)
                  ])
                ]),
                Re("tbody", null, [
                  (Hn(), Os(Se, null, sm(t, (s) => Re("tr", {
                    key: s.action
                  }, [
                    Re("td", null, Mn(s.action), 1),
                    Re("td", null, Mn(s.desktop), 1),
                    Re("td", null, Mn(s.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            w(ha, null, {
              default: de(() => [
                w(Ah),
                w(ct, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (s) => n.value = !1)
                }, {
                  default: de(() => [
                    Ge(" Close ")
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
}), z2 = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", j2 = /* @__PURE__ */ ya(H2, [["styles", [z2]], ["__scopeId", "data-v-6c8401af"]]), W2 = /* @__PURE__ */ Re("div", { class: "graph-host uninitialised" }, null, -1), G2 = {
  key: 0,
  class: "button-container"
}, U2 = { class: "info-text text-h5 text-grey" }, q2 = /* @__PURE__ */ yr({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = A(() => {
      const S = document.querySelectorAll("graph-editor");
      let I;
      for (let M = 0; M < S.length; M++) {
        const $ = S[M], Q = St($.shadowRoot).select(".graph-host.uninitialised");
        if (!Q.empty()) {
          Q.classed("uninitialised", !1), I = Q;
          break;
        }
      }
      return I === void 0 && (I = St(".graph-host.uninitialised"), I.classed("uninitialised", !1)), I;
    });
    xn(() => {
      N(), window.addEventListener("resize", Y);
    }), $l(() => {
      window.removeEventListener("resize", Y);
    });
    const r = ie(new Vu()), i = ie(!1), o = Mt(new Jy());
    let s, l = 400, a = 400, u, c, f, d, h, g, m, p, v, b = 0, k = 0, y = 1;
    t({
      getGraph: C,
      setGraph: T,
      printGraph: E,
      setNodeColor: P,
      setLinkColor: O,
      deleteNode: F,
      deleteLink: j,
      toggleNodeLabel: L,
      toggleLinkLabel: x,
      toggleZoom: R,
      toggleNodePhysics: nn,
      toggleFixedLinkDistance: rn,
      resetView: Y
    });
    function C() {
      return r.value.toTGF(o.showNodeLabels, o.showLinkLabels, !0, !0);
    }
    function T(S) {
      if (typeof S == "string" && S !== "Graph is empty")
        W(S);
      else if (typeof S == "object") {
        const [I, M] = Mw(S);
        Z(), U(I, M);
      } else
        Z();
    }
    function E() {
      console.log(r.value.toTGF(o.showNodeLabels, o.showLinkLabels));
    }
    function P(S, I) {
      if (!I) {
        h.selectAll("circle").each(($) => $.color = S).style("fill", S);
        return;
      }
      const M = Array.isArray(I) ? I : [I];
      for (const $ of M)
        h.selectAll("circle").filter((G) => G.id === $).each((G) => G.color = S).style("fill", S);
    }
    function O(S, I) {
      if (Xs(f, o, S), !I) {
        d.selectAll(".link").each(($) => $.color = S).style("stroke", S);
        return;
      }
      const M = Array.isArray(I) ? I : [I];
      for (const $ of M)
        d.selectAll(".link").filter((G) => G.id === $).each((G) => G.color = S).style("stroke", S);
    }
    function F(S) {
      const I = Array.isArray(S) ? S : [S];
      for (const M of I)
        h.selectAll("circle").filter(($) => $.id === M).each(($) => r.value.removeNode($));
      i.value = r.value.nodes.length > 0;
    }
    function j(S) {
      const I = Array.isArray(S) ? S : [S];
      for (const M of I)
        d.selectAll("path").filter(($) => $.id === M).each(($) => r.value.removeLink($));
    }
    function R(S) {
      o.zoomEnabled = S, Y();
    }
    function N() {
      l = n.value.node().clientWidth, a = n.value.node().clientHeight, u = Hy(
        (S) => _(S, o.zoomEnabled),
        o.zoomEnabled
      ), f = Wy(
        n.value,
        u,
        (S) => he(S),
        (S) => xe(S),
        (S) => {
          V(vt(S, f.node())[0], vt(S, f.node())[1]);
        }
      ), qy(f, o, r.value.getNonDefaultLinkColors()), g = Ky(f), d = Gy(f), h = Uy(f), s = Xy(r.value, o, l, a, () => H()), c = jy(s, l, a, o.nodeRadius), te();
    }
    function _(S, I = !0) {
      I && (b = S.transform.x, k = S.transform.y, y = S.transform.k, f.attr("transform", `translate(${b},${k})scale(${y})`));
    }
    function B(S, I, M, $) {
      r.value.createLink(S.id, I.id, M, $), te();
    }
    function V(S, I, M, $, G) {
      r.value.createNode(S ?? l / 2, I ?? a / 2, M, $, G), i.value = !0, te();
    }
    function H() {
      h.attr("transform", (S) => `translate(${S.x},${S.y})`), d.selectAll("path").attr("d", (S) => z(S)), J(), te();
    }
    function z(S) {
      switch (K(S), S.pathType) {
        case st.REFLEXIVE:
          return Pu(S.source, [l / 2, a / 2], o);
        case st.ARC:
          return vs(S.source, S.target, o);
        case st.ARCREVERSE:
          return Nu.reverse(vs(S.source, S.target, o));
        case st.LINE:
          return ms(S.source, S.target, o);
        case st.LINEREVERSE:
          return Nu.reverse(ms(S.source, S.target, o));
        default:
          return "";
      }
    }
    function K(S) {
      S.source.id === S.target.id ? S.pathType = st.REFLEXIVE : X(S.source, S.target) ? S.pathType = q(S.source, S.target) ? st.ARCREVERSE : st.ARC : S.pathType = q(S.source, S.target) ? st.LINEREVERSE : st.LINE;
    }
    function X(S, I) {
      return S.id !== I.id && r.value.links.some((M) => M.target.id === S.id && M.source.id === I.id) && r.value.links.some((M) => M.target.id === I.id && M.source.id === S.id);
    }
    function q(S, I) {
      return S.x > I.x;
    }
    function J() {
      const S = m;
      if (S !== void 0) {
        const I = p;
        if (I !== void 0)
          g.attr("d", () => S.id === I.id ? Pu(S, [l / 2, a / 2], o) : X(S, I) ? ms(S, I, o) : vs(S, I, o));
        else if (v !== void 0) {
          const M = [S.x, S.y];
          g.attr("d", Ru(M, v));
        }
      }
    }
    function te(S = 0.5) {
      d = d.data(r.value.links, (I) => I.id).join(
        (I) => {
          const M = I.append("g");
          return M.append("path").classed("link", !0).style("stroke", ($) => $.color ? $.color : "").attr("id", ($) => $.id).attr(
            "marker-end",
            ($) => $.color ? "url(#link-arrow-" + $.color : "url(#link-arrow)"
          ), M.append("path").classed("clickbox", !0).on("pointerdown", ($, G) => {
            let Q = G.color;
            $.button === 1 && ($n($), r.value.removeLink(G), Q && (r.value.hasNonDefaultLinkColor(Q) || Yy(f, Q)));
          }), M.append("text").append("textPath").attr(
            "class",
            ($) => $.label ? "link-label" : "link-label-placeholder"
          ).attr("href", ($) => `#${$.id}`).attr("startOffset", "50%").text(($) => $.label ? $.label : "add label").on("click", ($, G) => {
            Oe($, G);
          }), M;
        },
        (I) => (I.selectChild("path").attr("marker-start", function(M) {
          var $;
          if (($ = M.pathType) != null && $.includes("REVERSE")) {
            let G = "url(#link-arrow-reverse";
            return M.color && (G += "-" + M.color), G += ")", G;
          } else
            return null;
        }).attr("marker-end", function(M) {
          var $;
          if (($ = M.pathType) != null && $.includes("REVERSE"))
            return null;
          {
            let G = "url(#link-arrow";
            return M.color && (G += "-" + M.color), G += ")", G;
          }
        }), I.selectChild("text").attr("class", (M) => {
          var $;
          return `${($ = M.pathType) == null ? void 0 : $.toLowerCase()}-path-text`;
        }).attr("dy", (M) => {
          var $;
          return M.pathType === st.REFLEXIVE ? 15 : M.pathType == st.LINEREVERSE ? -10 : ($ = M.pathType) != null && $.includes("REVERSE") ? 20 : -10;
        }), I.selectChild("text").selectChild("textPath").classed("hidden", !o.showLinkLabels).attr("startOffset", (M) => {
          var $;
          return ($ = M.pathType) != null && $.includes("REVERSE") ? "46%" : "50%";
        }), I)
      ), h = h.data(r.value.nodes, (I) => I.id).join(
        (I) => {
          const M = I.append("g").call(c).on("pointerdown", ($, G) => {
            $.button === 1 && ($n($), r.value.removeNode(G), i.value = r.value.nodes.length > 0, D(), te());
          });
          return M.append("circle").classed("node", !0).attr("id", ($) => $.id).attr("r", o.nodeRadius).style("fill", ($) => $.color ? $.color : "").on("mouseenter", ($, G) => p = G).on("mouseout", () => p = void 0).on("pointerdown", ($, G) => {
            ue($, G);
          }).on("pointerup", ($) => {
            xe($);
          }), M.append("text").attr(
            "class",
            ($) => $.label ? "node-label" : "node-label-placeholder"
          ).text(($) => $.label ? $.label : "add label").attr("dy", "0.33em").on("click", ($, G) => {
            Ce($, G);
          }).on("mouseenter", ($, G) => p = G).on("mouseout", () => p = void 0), M;
        },
        (I) => (I.selectChild("text").classed("hidden", !o.showNodeLabels), I)
      ), s.nodes(r.value.nodes), s.alpha(S).restart();
    }
    function ue(S, I) {
      if (S.button !== 0)
        return;
      $n(S);
      const M = [I.x, I.y];
      v = M, m = I, g.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Ru(M, M)), te();
    }
    function xe(S) {
      const I = m, M = p;
      D(), !(I === void 0 || M === void 0) && ($n(S), B(I, M));
    }
    function he(S) {
      if ($n(S), m !== void 0) {
        const I = np(S, n.value.node())[0], M = [
          (I[0] - b) / y,
          (I[1] - k) / y
        ];
        S.pointerType === "touch" && (M[1] = M[1] - 4 * o.nodeRadius, p = r.value.nodes.find(
          ($) => Math.sqrt(Math.pow($.x - M[0], 2) + Math.pow($.y - M[1], 2)) < o.nodeRadius
        )), v = M, J();
      }
    }
    function Ce(S, I) {
      const M = S == null ? void 0 : S.target;
      wt(I, M, [I.x, I.y]);
    }
    function Oe(S, I) {
      const M = S.target;
      let $ = It(M);
      wt(I, M, $);
    }
    function wt(S, I, M) {
      var _e;
      let $ = S instanceof _d ? "node" : "link";
      const G = document.createElement("input");
      G.setAttribute("class", "label-input"), S.label == null ? G.value = "" : G.value = S.label, G.placeholder = `Enter ${$} label`;
      let Q = !1;
      G.onkeyup = function(Ee) {
        Ee.key === "Enter" ? (Q = !0, G.blur()) : Ee.key === "Escape" && (G.value = "", G.blur());
      }, G.onblur = function() {
        Q && (G.value === "" ? (I.setAttribute("class", `${$}-label-placeholder`), I.textContent = "add label", S.label = void 0) : (I.setAttribute("class", `${$}-label`), I.textContent = G.value.trim(), S.label = I.textContent)), ne.remove();
      };
      const ne = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      ne.setAttribute("width", "100%"), ne.setAttribute("height", "100%"), ne.setAttribute("x", `${M[0] - 80}`), ne.setAttribute("y", `${M[1] - 12}`), ne.append(G);
      const ce = I.closest("svg");
      (_e = ce == null ? void 0 : ce.querySelector("g")) == null || _e.append(ne), G.focus();
    }
    function It(S) {
      let I = n.value.select("svg").node().getBoundingClientRect(), M = S.getBoundingClientRect(), $ = (M.x - I.x - b) / y, G = (M.y - I.y - k) / y;
      return [$, G];
    }
    function nn(S) {
      o.nodePhysicsEnabled = S, xd(s, S, l, a);
    }
    function rn(S) {
      o.fixedLinkDistanceEnabled = S, Cd(s, r.value, o, S);
    }
    function x(S) {
      o.showLinkLabels = S;
    }
    function L(S) {
      o.showNodeLabels = S;
    }
    function D() {
      g == null || g.classed("hidden", !0).attr("marker-end", "null"), m = void 0, p = void 0, v = void 0;
    }
    function W(S) {
      let [I, M] = Lw(S);
      Z(), U(I, M);
    }
    function U(S, I) {
      for (let $ of S)
        V(void 0, void 0, $.idImported, $.label, $.color);
      const M = ($) => r.value.nodes.find((G) => G.idImported === $);
      for (let $ of I) {
        let G = M($.sourceIdImported), Q = M($.targetIdImported);
        G && Q && (B(G, Q, $.label, $.color), $.color && Xs(f, o, $.color));
      }
    }
    function Y() {
      s.stop(), n.value.selectChildren().remove(), u = void 0, b = 0, k = 0, y = 1, f = void 0, g = void 0, d = void 0, h = void 0, s = void 0, D(), N();
    }
    function Z() {
      r.value = new Vu(), i.value = !1, Y();
    }
    return (S, I) => (Hn(), Os(Se, null, [
      W2,
      o.hasToolbar ? (Hn(), Os("div", G2, [
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: de(({ props: M }) => [
            w(ct, fe({
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, M, {
              variant: "plain",
              onClick: I[0] || (I[0] = ($) => V())
            }), null, 16)
          ]),
          _: 1
        }),
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: de(({ props: M }) => [
            w(ct, fe({
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, M, {
              variant: "plain",
              onClick: I[1] || (I[1] = ($) => Z())
            }), null, 16)
          ]),
          _: 1
        }),
        w(ur, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: de(({ props: M }) => [
            w(ct, fe({
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, M, {
              variant: "plain",
              onClick: I[2] || (I[2] = ($) => Y())
            }), null, 16)
          ]),
          _: 1
        }),
        w(T2, {
          "graph-as-tgf": r.value.toTGF(o.showNodeLabels, o.showLinkLabels, !1, !1),
          onFileImported: W
        }, null, 8, ["graph-as-tgf"]),
        w(j2),
        w(R2, {
          "node-labels-enabled": o.showNodeLabels,
          "link-labels-enabled": o.showLinkLabels,
          "physics-enabled": o.nodePhysicsEnabled,
          "fixed-link-distance-enabled": o.fixedLinkDistanceEnabled,
          onToggleNodePhysics: nn,
          onToggleNodeLabels: L,
          onToggleLinkLabels: x,
          onToggleFixedLinkDistance: rn
        }, null, 8, ["node-labels-enabled", "link-labels-enabled", "physics-enabled", "fixed-link-distance-enabled"])
      ])) : Im("", !0),
      ft(Re("div", U2, "Graph is empty", 512), [
        [qn, !i.value]
      ])
    ], 64));
  }
}), Y2 = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#5f9ea0;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#add8e6;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#5f9ea0}.arrow.draggable{fill:#add8e6}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#ffa07a;stroke:none;cursor:pointer}.node:hover{stroke:#5f9ea0;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", K2 = /* @__PURE__ */ ya(q2, [["styles", [Y2]]]), cl = {
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
function X2(e, t) {
  const n = [];
  let r = [];
  const i = Hh(e), o = zh(e), s = (i.getDay() - cl[t.slice(-2).toUpperCase()] + 7) % 7, l = (o.getDay() - cl[t.slice(-2).toUpperCase()] + 7) % 7;
  for (let a = 0; a < s; a++) {
    const u = new Date(i);
    u.setDate(u.getDate() - (s - a)), r.push(u);
  }
  for (let a = 1; a <= o.getDate(); a++) {
    const u = new Date(e.getFullYear(), e.getMonth(), a);
    r.push(u), r.length === 7 && (n.push(r), r = []);
  }
  for (let a = 1; a < 7 - l; a++) {
    const u = new Date(o);
    u.setDate(u.getDate() + a), r.push(u);
  }
  return r.length > 0 && n.push(r), n;
}
function Z2(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function J2(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function Hh(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function zh(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Q2(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const ex = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function jh(e) {
  if (e == null)
    return /* @__PURE__ */ new Date();
  if (e instanceof Date)
    return e;
  if (typeof e == "string") {
    let t;
    if (ex.test(e))
      return Q2(e);
    if (t = Date.parse(e), !isNaN(t))
      return new Date(t);
  }
  return null;
}
const Ic = new Date(2e3, 0, 2);
function tx(e) {
  const t = cl[e.slice(-2).toUpperCase()];
  return Md(7).map((n) => {
    const r = new Date(Ic);
    return r.setDate(Ic.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(r);
  });
}
function nx(e, t, n, r) {
  const i = jh(e) ?? /* @__PURE__ */ new Date(), o = r == null ? void 0 : r[t];
  if (typeof o == "function")
    return o(i, t, n);
  let s = {};
  switch (t) {
    case "fullDateWithWeekday":
      s = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      };
      break;
    case "hours12h":
      s = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "normalDateWithWeekday":
      s = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "keyboardDate":
      s = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      s = {
        month: "long",
        day: "numeric"
      };
      break;
    case "monthAndYear":
      s = {
        month: "long",
        year: "numeric"
      };
      break;
    case "month":
      s = {
        month: "long"
      };
      break;
    case "monthShort":
      s = {
        month: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(n).format(i.getDate());
    case "shortDate":
      s = {
        year: "2-digit",
        month: "numeric",
        day: "numeric"
      };
      break;
    case "weekdayShort":
      s = {
        weekday: "short"
      };
      break;
    case "year":
      s = {
        year: "numeric"
      };
      break;
    default:
      s = o ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, s).format(i);
}
function rx(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), i = Hu(String(n.getMonth() + 1), 2, "0"), o = Hu(String(n.getDate()), 2, "0");
  return `${r}-${i}-${o}`;
}
function ix(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function ox(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function sx(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function lx(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function ax(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function ux(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function cx(e) {
  return e.getFullYear();
}
function fx(e) {
  return e.getMonth();
}
function dx(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function hx(e) {
  return e.getHours();
}
function gx(e) {
  return e.getMinutes();
}
function mx(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function vx(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function px(e, t) {
  return fl(e, t[0]) && wx(e, t[1]);
}
function yx(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function fl(e, t) {
  return e.getTime() > t.getTime();
}
function wx(e, t) {
  return e.getTime() < t.getTime();
}
function $c(e, t) {
  return e.getTime() === t.getTime();
}
function bx(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function _x(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function xx(e, t, n) {
  const r = new Date(e), i = new Date(t);
  switch (n) {
    case "years":
      return r.getFullYear() - i.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - i.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - i.getTime()) / 1e3);
    default:
      return r.getTime() - i.getTime();
  }
}
function Cx(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Sx(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function kx(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Ex(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Lx(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Mx(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Tx {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return jh(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return rx(this, t);
  }
  parseISO(t) {
    return ix(t);
  }
  addMinutes(t, n) {
    return ox(t, n);
  }
  addHours(t, n) {
    return sx(t, n);
  }
  addDays(t, n) {
    return lx(t, n);
  }
  addWeeks(t, n) {
    return ax(t, n);
  }
  addMonths(t, n) {
    return ux(t, n);
  }
  getWeekArray(t) {
    return X2(t, this.locale);
  }
  startOfWeek(t) {
    return Z2(t);
  }
  endOfWeek(t) {
    return J2(t);
  }
  startOfMonth(t) {
    return Hh(t);
  }
  endOfMonth(t) {
    return zh(t);
  }
  format(t, n) {
    return nx(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return $c(t, n);
  }
  isValid(t) {
    return yx(t);
  }
  isWithinRange(t, n) {
    return px(t, n);
  }
  isAfter(t, n) {
    return fl(t, n);
  }
  isBefore(t, n) {
    return !fl(t, n) && !$c(t, n);
  }
  isSameDay(t, n) {
    return bx(t, n);
  }
  isSameMonth(t, n) {
    return _x(t, n);
  }
  setMinutes(t, n) {
    return Sx(t, n);
  }
  setHours(t, n) {
    return Cx(t, n);
  }
  setMonth(t, n) {
    return kx(t, n);
  }
  setYear(t, n) {
    return Ex(t, n);
  }
  getDiff(t, n, r) {
    return xx(t, n, r);
  }
  getWeekdays() {
    return tx(this.locale);
  }
  getYear(t) {
    return cx(t);
  }
  getMonth(t) {
    return fx(t);
  }
  getNextMonth(t) {
    return dx(t);
  }
  getHours(t) {
    return hx(t);
  }
  getMinutes(t) {
    return gx(t);
  }
  startOfDay(t) {
    return Lx(t);
  }
  endOfDay(t) {
    return Mx(t);
  }
  startOfYear(t) {
    return mx(t);
  }
  endOfYear(t) {
    return vx(t);
  }
}
const Vx = Symbol.for("vuetify:date-options"), Ac = Symbol.for("vuetify:date-adapter");
function Ix(e, t) {
  const n = ut({
    adapter: Tx,
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
    instance: $x(n, t)
  };
}
function $x(e, t) {
  const n = Mt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ae(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
const Ax = Symbol.for("vuetify:goto");
function Px() {
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
function Rx(e, t) {
  return {
    rtl: t.isRtl,
    options: ut(Px(), e)
  };
}
function Wh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = ut(t, n), {
    aliases: i = {},
    components: o = {},
    directives: s = {}
  } = r, l = ub(r.defaults), a = L_(r.display, r.ssr), u = bb(r.theme), c = Tb(r.icons), f = Ob(r.locale), d = Ix(r.date, f), h = Rx(r.goTo, f);
  return {
    install: (m) => {
      for (const p in s)
        m.directive(p, s[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in i)
        m.component(p, ai({
          ...i[p],
          name: p,
          aliasName: i[p].name
        }));
      if (u.install(m), m.provide(gr, l), m.provide(al, a), m.provide(mo, u), m.provide(el, c), m.provide(vo, f), m.provide(Vx, d.options), m.provide(Ac, d.instance), m.provide(Ax, h), Ve && r.ssr)
        if (m.$nuxt)
          m.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: p
          } = m;
          m.mount = function() {
            const v = p(...arguments);
            return He(() => a.update()), m.mount = p, v;
          };
        }
      Vt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return Mt({
              defaults: Qn.call(this, gr),
              display: Qn.call(this, al),
              theme: Qn.call(this, mo),
              icons: Qn.call(this, el),
              locale: Qn.call(this, vo),
              date: Qn.call(this, Ac)
            });
          }
        }
      });
    },
    defaults: l,
    display: a,
    theme: u,
    icons: c,
    locale: f,
    date: d,
    goTo: h
  };
}
const Nx = "3.5.9";
Wh.version = Nx;
function Qn(e) {
  var r, i;
  const t = this.$, n = ((r = t.parent) == null ? void 0 : r.provides) ?? ((i = t.vnode.appContext) == null ? void 0 : i.provides);
  if (n && e in n)
    return n[e];
}
const Ox = {
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
}, Fx = {
  component: sa
};
var Bx = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Dx = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", Hx = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", zx = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", jx = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", Wx = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
Wh({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...Ox,
      addNode: Wx,
      deleteGraph: Dx,
      help: zx,
      importExport: Hx,
      resetView: jx,
      settings: Bx
    },
    sets: {
      mdi: Fx
    }
  }
});
customElements.define(
  "graph-editor",
  // defineCustomElement(GraphEditor, { shadowRoot: true, plugins: [vuetify] })
  /* @__PURE__ */ wv(K2)
);
