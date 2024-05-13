var Uh = Object.defineProperty;
var qh = (e, t, n) => t in e ? Uh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ot = (e, t, n) => (qh(e, typeof t != "symbol" ? t + "" : t, n), n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function dl(e, t) {
  const n = new Set(e.split(","));
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
const Me = {}, rr = [], pt = () => {
}, Yh = () => !1, Co = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), hl = (e) => e.startsWith("onUpdate:"), Ve = Object.assign, gl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Kh = Object.prototype.hasOwnProperty, be = (e, t) => Kh.call(e, t), re = Array.isArray, ir = (e) => So(e) === "[object Map]", Rc = (e) => So(e) === "[object Set]", se = (e) => typeof e == "function", Ae = (e) => typeof e == "string", pr = (e) => typeof e == "symbol", Le = (e) => e !== null && typeof e == "object", Nc = (e) => (Le(e) || se(e)) && se(e.then) && se(e.catch), Oc = Object.prototype.toString, So = (e) => Oc.call(e), Xh = (e) => So(e).slice(8, -1), Fc = (e) => So(e) === "[object Object]", ml = (e) => Ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $r = /* @__PURE__ */ dl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ko = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Zh = /-(\w)/g, Xe = ko((e) => e.replace(Zh, (t, n) => n ? n.toUpperCase() : "")), Jh = /\B([A-Z])/g, Ct = ko(
  (e) => e.replace(Jh, "-$1").toLowerCase()
), yr = ko((e) => e.charAt(0).toUpperCase() + e.slice(1)), ts = ko((e) => e ? `on${yr(e)}` : ""), yn = (e, t) => !Object.is(e, t), ns = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Ki = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Qh = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ls = (e) => {
  const t = Ae(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let xa;
const Bc = () => xa || (xa = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vl(e) {
  if (re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = Ae(r) ? rg(r) : vl(r);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (Ae(e) || Le(e))
    return e;
}
const eg = /;(?![^(]*\))/g, tg = /:([^]+)/, ng = /\/\*[^]*?\*\//g;
function rg(e) {
  const t = {};
  return e.replace(ng, "").split(eg).forEach((n) => {
    if (n) {
      const r = n.split(tg);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function pl(e) {
  let t = "";
  if (Ae(e))
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
const ig = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", og = /* @__PURE__ */ dl(ig);
function Dc(e) {
  return !!e || e === "";
}
const Tn = (e) => Ae(e) ? e : e == null ? "" : re(e) || Le(e) && (e.toString === Oc || !se(e.toString)) ? JSON.stringify(e, Hc, 2) : String(e), Hc = (e, t) => t && t.__v_isRef ? Hc(e, t.value) : ir(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, i], o) => (n[rs(r, o) + " =>"] = i, n),
    {}
  )
} : Rc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => rs(n))
} : pr(t) ? rs(t) : Le(t) && !re(t) && !Fc(t) ? String(t) : t, rs = (e, t = "") => {
  var n;
  return pr(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let lt;
class zc {
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
  return new zc(e);
}
function sg(e, t = lt) {
  t && t.active && t.effects.push(e);
}
function lg() {
  return lt;
}
function ht(e) {
  lt && lt.cleanups.push(e);
}
let On;
class wl {
  constructor(t, n, r, i) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, sg(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Gn();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (ag(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Un();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = vn, n = On;
    try {
      return vn = !0, On = this, this._runnings++, Ca(this), this.fn();
    } finally {
      Sa(this), this._runnings--, On = n, vn = t;
    }
  }
  stop() {
    var t;
    this.active && (Ca(this), Sa(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function ag(e) {
  return e.value;
}
function Ca(e) {
  e._trackId++, e._depsLength = 0;
}
function Sa(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      jc(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function jc(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let vn = !0, Ms = 0;
const Wc = [];
function Gn() {
  Wc.push(vn), vn = !1;
}
function Un() {
  const e = Wc.pop();
  vn = e === void 0 ? !0 : e;
}
function bl() {
  Ms++;
}
function _l() {
  for (Ms--; !Ms && Ts.length; )
    Ts.shift()();
}
function Gc(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && jc(r, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Ts = [];
function Uc(e, t, n) {
  bl();
  for (const r of e.keys()) {
    let i;
    r._dirtyLevel < t && (i ?? (i = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (i ?? (i = e.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Ts.push(r.scheduler)));
  }
  _l();
}
const qc = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Xi = /* @__PURE__ */ new WeakMap(), Fn = Symbol(""), Vs = Symbol("");
function tt(e, t, n) {
  if (vn && On) {
    let r = Xi.get(e);
    r || Xi.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = qc(() => r.delete(n))), Gc(
      On,
      i
    );
  }
}
function Ut(e, t, n, r, i, o) {
  const s = Xi.get(e);
  if (!s)
    return;
  let l = [];
  if (t === "clear")
    l = [...s.values()];
  else if (n === "length" && re(e)) {
    const a = Number(r);
    s.forEach((u, c) => {
      (c === "length" || !pr(c) && c >= a) && l.push(u);
    });
  } else
    switch (n !== void 0 && l.push(s.get(n)), t) {
      case "add":
        re(e) ? ml(n) && l.push(s.get("length")) : (l.push(s.get(Fn)), ir(e) && l.push(s.get(Vs)));
        break;
      case "delete":
        re(e) || (l.push(s.get(Fn)), ir(e) && l.push(s.get(Vs)));
        break;
      case "set":
        ir(e) && l.push(s.get(Fn));
        break;
    }
  bl();
  for (const a of l)
    a && Uc(
      a,
      4
    );
  _l();
}
function ug(e, t) {
  var n;
  return (n = Xi.get(e)) == null ? void 0 : n.get(t);
}
const cg = /* @__PURE__ */ dl("__proto__,__v_isRef,__isVue"), Yc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pr)
), ka = /* @__PURE__ */ fg();
function fg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = ve(this);
      for (let o = 0, s = this.length; o < s; o++)
        tt(r, "get", o + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(ve)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Gn(), bl();
      const r = ve(this)[t].apply(this, n);
      return _l(), Un(), r;
    };
  }), e;
}
function dg(e) {
  const t = ve(this);
  return tt(t, "has", e), t.hasOwnProperty(e);
}
class Kc {
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
      return r === (i ? o ? kg : Qc : o ? Jc : Zc).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const s = re(t);
    if (!i) {
      if (s && be(ka, n))
        return Reflect.get(ka, n, r);
      if (n === "hasOwnProperty")
        return dg;
    }
    const l = Reflect.get(t, n, r);
    return (pr(n) ? Yc.has(n) : cg(n)) || (i || tt(t, "get", n), o) ? l : Ie(l) ? s && ml(n) ? l : l.value : Le(l) ? i ? ti(l) : Mt(l) : l;
  }
}
class Xc extends Kc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, i) {
    let o = t[n];
    if (!this._isShallow) {
      const a = fr(o);
      if (!Zi(r) && !fr(r) && (o = ve(o), r = ve(r)), !re(t) && Ie(o) && !Ie(r))
        return a ? !1 : (o.value = r, !0);
    }
    const s = re(t) && ml(n) ? Number(n) < t.length : be(t, n), l = Reflect.set(t, n, r, i);
    return t === ve(i) && (s ? yn(r, o) && Ut(t, "set", n, r) : Ut(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = be(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && Ut(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!pr(n) || !Yc.has(n)) && tt(t, "has", n), r;
  }
  ownKeys(t) {
    return tt(
      t,
      "iterate",
      re(t) ? "length" : Fn
    ), Reflect.ownKeys(t);
  }
}
class hg extends Kc {
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
const gg = /* @__PURE__ */ new Xc(), mg = /* @__PURE__ */ new hg(), vg = /* @__PURE__ */ new Xc(
  !0
), xl = (e) => e, Eo = (e) => Reflect.getPrototypeOf(e);
function vi(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = ve(e), o = ve(t);
  n || (yn(t, o) && tt(i, "get", t), tt(i, "get", o));
  const { has: s } = Eo(i), l = r ? xl : n ? kl : Fr;
  if (s.call(i, t))
    return l(e.get(t));
  if (s.call(i, o))
    return l(e.get(o));
  e !== i && e.get(t);
}
function pi(e, t = !1) {
  const n = this.__v_raw, r = ve(n), i = ve(e);
  return t || (yn(e, i) && tt(r, "has", e), tt(r, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function yi(e, t = !1) {
  return e = e.__v_raw, !t && tt(ve(e), "iterate", Fn), Reflect.get(e, "size", e);
}
function Ea(e) {
  e = ve(e);
  const t = ve(this);
  return Eo(t).has.call(t, e) || (t.add(e), Ut(t, "add", e, e)), this;
}
function La(e, t) {
  t = ve(t);
  const n = ve(this), { has: r, get: i } = Eo(n);
  let o = r.call(n, e);
  o || (e = ve(e), o = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), o ? yn(t, s) && Ut(n, "set", e, t) : Ut(n, "add", e, t), this;
}
function Ma(e) {
  const t = ve(this), { has: n, get: r } = Eo(t);
  let i = n.call(t, e);
  i || (e = ve(e), i = n.call(t, e)), r && r.call(t, e);
  const o = t.delete(e);
  return i && Ut(t, "delete", e, void 0), o;
}
function Ta() {
  const e = ve(this), t = e.size !== 0, n = e.clear();
  return t && Ut(e, "clear", void 0, void 0), n;
}
function wi(e, t) {
  return function(r, i) {
    const o = this, s = o.__v_raw, l = ve(s), a = t ? xl : e ? kl : Fr;
    return !e && tt(l, "iterate", Fn), s.forEach((u, c) => r.call(i, a(u), a(c), o));
  };
}
function bi(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, o = ve(i), s = ir(o), l = e === "entries" || e === Symbol.iterator && s, a = e === "keys" && s, u = i[e](...r), c = n ? xl : t ? kl : Fr;
    return !t && tt(
      o,
      "iterate",
      a ? Vs : Fn
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
function pg() {
  const e = {
    get(o) {
      return vi(this, o);
    },
    get size() {
      return yi(this);
    },
    has: pi,
    add: Ea,
    set: La,
    delete: Ma,
    clear: Ta,
    forEach: wi(!1, !1)
  }, t = {
    get(o) {
      return vi(this, o, !1, !0);
    },
    get size() {
      return yi(this);
    },
    has: pi,
    add: Ea,
    set: La,
    delete: Ma,
    clear: Ta,
    forEach: wi(!1, !0)
  }, n = {
    get(o) {
      return vi(this, o, !0);
    },
    get size() {
      return yi(this, !0);
    },
    has(o) {
      return pi.call(this, o, !0);
    },
    add: on("add"),
    set: on("set"),
    delete: on("delete"),
    clear: on("clear"),
    forEach: wi(!0, !1)
  }, r = {
    get(o) {
      return vi(this, o, !0, !0);
    },
    get size() {
      return yi(this, !0);
    },
    has(o) {
      return pi.call(this, o, !0);
    },
    add: on("add"),
    set: on("set"),
    delete: on("delete"),
    clear: on("clear"),
    forEach: wi(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = bi(
      o,
      !1,
      !1
    ), n[o] = bi(
      o,
      !0,
      !1
    ), t[o] = bi(
      o,
      !1,
      !0
    ), r[o] = bi(
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
  yg,
  wg,
  bg,
  _g
] = /* @__PURE__ */ pg();
function Cl(e, t) {
  const n = t ? e ? _g : bg : e ? wg : yg;
  return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(
    be(n, i) && i in r ? n : r,
    i,
    o
  );
}
const xg = {
  get: /* @__PURE__ */ Cl(!1, !1)
}, Cg = {
  get: /* @__PURE__ */ Cl(!1, !0)
}, Sg = {
  get: /* @__PURE__ */ Cl(!0, !1)
}, Zc = /* @__PURE__ */ new WeakMap(), Jc = /* @__PURE__ */ new WeakMap(), Qc = /* @__PURE__ */ new WeakMap(), kg = /* @__PURE__ */ new WeakMap();
function Eg(e) {
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
function Lg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Eg(Xh(e));
}
function Mt(e) {
  return fr(e) ? e : Sl(
    e,
    !1,
    gg,
    xg,
    Zc
  );
}
function Mg(e) {
  return Sl(
    e,
    !1,
    vg,
    Cg,
    Jc
  );
}
function ti(e) {
  return Sl(
    e,
    !0,
    mg,
    Sg,
    Qc
  );
}
function Sl(e, t, n, r, i) {
  if (!Le(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const s = Lg(e);
  if (s === 0)
    return e;
  const l = new Proxy(
    e,
    s === 2 ? r : n
  );
  return i.set(e, l), l;
}
function or(e) {
  return fr(e) ? or(e.__v_raw) : !!(e && e.__v_isReactive);
}
function fr(e) {
  return !!(e && e.__v_isReadonly);
}
function Zi(e) {
  return !!(e && e.__v_isShallow);
}
function ef(e) {
  return or(e) || fr(e);
}
function ve(e) {
  const t = e && e.__v_raw;
  return t ? ve(t) : e;
}
function tf(e) {
  return Object.isExtensible(e) && Ki(e, "__v_skip", !0), e;
}
const Fr = (e) => Le(e) ? Mt(e) : e, kl = (e) => Le(e) ? ti(e) : e;
class nf {
  constructor(t, n, r, i) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new wl(
      () => t(this._value),
      () => Ni(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const t = ve(this);
    return (!t._cacheable || t.effect.dirty) && yn(t._value, t._value = t.effect.run()) && Ni(t, 4), rf(t), t.effect._dirtyLevel >= 2 && Ni(t, 2), t._value;
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
function Tg(e, t, n = !1) {
  let r, i;
  const o = se(e);
  return o ? (r = e, i = pt) : (r = e.get, i = e.set), new nf(r, i, o || !i, n);
}
function rf(e) {
  var t;
  vn && On && (e = ve(e), Gc(
    On,
    (t = e.dep) != null ? t : e.dep = qc(
      () => e.dep = void 0,
      e instanceof nf ? e : void 0
    )
  ));
}
function Ni(e, t = 4, n) {
  e = ve(e);
  const r = e.dep;
  r && Uc(
    r,
    t
  );
}
function Ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function ie(e) {
  return of(e, !1);
}
function pe(e) {
  return of(e, !0);
}
function of(e, t) {
  return Ie(e) ? e : new Vg(e, t);
}
class Vg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : ve(t), this._value = n ? t : Fr(t);
  }
  get value() {
    return rf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Zi(t) || fr(t);
    t = n ? t : ve(t), yn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Fr(t), Ni(this, 4));
  }
}
function Nt(e) {
  return Ie(e) ? e.value : e;
}
const Ig = {
  get: (e, t, n) => Nt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return Ie(i) && !Ie(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function sf(e) {
  return or(e) ? e : new Proxy(e, Ig);
}
function El(e) {
  const t = re(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = lf(e, n);
  return t;
}
class $g {
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
    return ug(ve(this._object), this._key);
  }
}
class Ag {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function we(e, t, n) {
  return Ie(e) ? e : se(e) ? new Ag(e) : Le(e) && arguments.length > 1 ? lf(e, t, n) : ie(e);
}
function lf(e, t, n) {
  const r = e[t];
  return Ie(r) ? r : new $g(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function pn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    Lo(i, t, n);
  }
}
function yt(e, t, n, r) {
  if (se(e)) {
    const o = pn(e, t, n, r);
    return o && Nc(o) && o.catch((s) => {
      Lo(s, t, n);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(yt(e[o], t, n, r));
  return i;
}
function Lo(e, t, n, r = !0) {
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
      pn(
        a,
        null,
        10,
        [e, s, l]
      );
      return;
    }
  }
  Pg(e, n, i, r);
}
function Pg(e, t, n, r = !0) {
  console.error(e);
}
let Br = !1, Is = !1;
const He = [];
let Rt = 0;
const sr = [];
let un = null, In = 0;
const af = /* @__PURE__ */ Promise.resolve();
let Ll = null;
function De(e) {
  const t = Ll || af;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Rg(e) {
  let t = Rt + 1, n = He.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = He[r], o = Dr(i);
    o < e || o === e && i.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Ml(e) {
  (!He.length || !He.includes(
    e,
    Br && e.allowRecurse ? Rt + 1 : Rt
  )) && (e.id == null ? He.push(e) : He.splice(Rg(e.id), 0, e), uf());
}
function uf() {
  !Br && !Is && (Is = !0, Ll = af.then(ff));
}
function Ng(e) {
  const t = He.indexOf(e);
  t > Rt && He.splice(t, 1);
}
function Og(e) {
  re(e) ? sr.push(...e) : (!un || !un.includes(
    e,
    e.allowRecurse ? In + 1 : In
  )) && sr.push(e), uf();
}
function Va(e, t, n = Br ? Rt + 1 : 0) {
  for (; n < He.length; n++) {
    const r = He[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid)
        continue;
      He.splice(n, 1), n--, r();
    }
  }
}
function cf(e) {
  if (sr.length) {
    const t = [...new Set(sr)].sort(
      (n, r) => Dr(n) - Dr(r)
    );
    if (sr.length = 0, un) {
      un.push(...t);
      return;
    }
    for (un = t, In = 0; In < un.length; In++)
      un[In]();
    un = null, In = 0;
  }
}
const Dr = (e) => e.id == null ? 1 / 0 : e.id, Fg = (e, t) => {
  const n = Dr(e) - Dr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ff(e) {
  Is = !1, Br = !0, He.sort(Fg);
  try {
    for (Rt = 0; Rt < He.length; Rt++) {
      const t = He[Rt];
      t && t.active !== !1 && pn(t, null, 14);
    }
  } finally {
    Rt = 0, He.length = 0, cf(), Br = !1, Ll = null, (He.length || sr.length) && ff();
  }
}
function Bg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || Me;
  let i = n;
  const o = t.startsWith("update:"), s = o && t.slice(7);
  if (s && s in r) {
    const c = `${s === "modelValue" ? "model" : s}Modifiers`, { number: f, trim: d } = r[c] || Me;
    d && (i = n.map((h) => Ae(h) ? h.trim() : h)), f && (i = n.map(Qh));
  }
  let l, a = r[l = ts(t)] || // also try camelCase event handler (#2249)
  r[l = ts(Xe(t))];
  !a && o && (a = r[l = ts(Ct(t))]), a && yt(
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
function df(e, t, n = !1) {
  const r = t.emitsCache, i = r.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let s = {}, l = !1;
  if (!se(e)) {
    const a = (u) => {
      const c = df(u, t, !0);
      c && (l = !0, Ve(s, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (Le(e) && r.set(e, null), null) : (re(o) ? o.forEach((a) => s[a] = null) : Ve(s, o), Le(e) && r.set(e, s), s);
}
function Mo(e, t) {
  return !e || !Co(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), be(e, t[0].toLowerCase() + t.slice(1)) || be(e, Ct(t)) || be(e, t));
}
let Ue = null, hf = null;
function Ji(e) {
  const t = Ue;
  return Ue = e, hf = e && e.type.__scopeId || null, t;
}
function de(e, t = Ue, n) {
  if (!t || e._n)
    return e;
  const r = (...i) => {
    r._d && Wa(-1);
    const o = Ji(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Ji(o), r._d && Wa(1);
    }
    return s;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function is(e) {
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
  const b = Ji(e);
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
      ), v = t.props ? a : Dg(a);
    }
  } catch (y) {
    Nr.length = 0, Lo(y, e, 1), p = w(Lt);
  }
  let k = p;
  if (v && m !== !1) {
    const y = Object.keys(v), { shapeFlag: C } = k;
    y.length && C & 7 && (s && y.some(hl) && (v = Hg(
      v,
      s
    )), k = wn(k, v));
  }
  return n.dirs && (k = wn(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), p = k, Ji(b), p;
}
const Dg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Co(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Hg = (e, t) => {
  const n = {};
  for (const r in e)
    (!hl(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function zg(e, t, n) {
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
        if (s[d] !== r[d] && !Mo(u, d))
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
    if (t[o] !== e[o] && !Mo(n, o))
      return !0;
  }
  return !1;
}
function jg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const gf = "components", Wg = "directives", mf = Symbol.for("v-ndc");
function Gg(e) {
  return Ae(e) ? vf(gf, e, !1) || e : e || mf;
}
function qn(e) {
  return vf(Wg, e);
}
function vf(e, t, n = !0, r = !1) {
  const i = Ue || Oe;
  if (i) {
    const o = i.type;
    if (e === gf) {
      const l = Dm(
        o,
        !1
      );
      if (l && (l === t || l === Xe(t) || l === yr(Xe(t))))
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
  return e && (e[t] || e[Xe(t)] || e[yr(Xe(t))]);
}
const Ug = (e) => e.__isSuspense;
function qg(e, t) {
  t && t.pendingBranch ? re(e) ? t.effects.push(...e) : t.effects.push(e) : Og(e);
}
const Yg = Symbol.for("v-scx"), Kg = () => Fe(Yg);
function xn(e, t) {
  return Tl(e, null, t);
}
const _i = {};
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
} = Me) {
  if (t && o) {
    const T = t;
    t = (...E) => {
      T(...E), C();
    };
  }
  const a = Oe, u = (T) => r === !0 ? T : (
    // for deep: false, only traverse root-level properties
    Pn(T, r === !1 ? 1 : void 0)
  );
  let c, f = !1, d = !1;
  if (Ie(e) ? (c = () => e.value, f = Zi(e)) : or(e) ? (c = () => u(e), f = !0) : re(e) ? (d = !0, f = e.some((T) => or(T) || Zi(T)), c = () => e.map((T) => {
    if (Ie(T))
      return T.value;
    if (or(T))
      return u(T);
    if (se(T))
      return pn(T, a, 2);
  })) : se(e) ? t ? c = () => pn(e, a, 2) : c = () => (h && h(), yt(
    e,
    a,
    3,
    [g]
  )) : c = pt, t && r) {
    const T = c;
    c = () => Pn(T());
  }
  let h, g = (T) => {
    h = k.onStop = () => {
      pn(T, a, 4), h = k.onStop = void 0;
    };
  }, m;
  if (Ao)
    if (g = pt, t ? n && yt(t, a, 3, [
      c(),
      d ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const T = Kg();
      m = T.__watcherHandles || (T.__watcherHandles = []);
    } else
      return pt;
  let p = d ? new Array(e.length).fill(_i) : _i;
  const v = () => {
    if (!(!k.active || !k.dirty))
      if (t) {
        const T = k.run();
        (r || f || (d ? T.some((E, P) => yn(E, p[P])) : yn(T, p))) && (h && h(), yt(t, a, 3, [
          T,
          // pass undefined as the old value when it's changed for the first time
          p === _i ? void 0 : d && p[0] === _i ? [] : p,
          g
        ]), p = T);
      } else
        k.run();
  };
  v.allowRecurse = !!t;
  let b;
  i === "sync" ? b = v : i === "post" ? b = () => Qe(v, a && a.suspense) : (v.pre = !0, a && (v.id = a.uid), b = () => Ml(v));
  const k = new wl(c, pt, b), y = lg(), C = () => {
    k.stop(), y && gl(y.effects, k);
  };
  return t ? n ? v() : p = k.run() : i === "post" ? Qe(
    k.run.bind(k),
    a && a.suspense
  ) : k.run(), m && m.push(C), C;
}
function Xg(e, t, n) {
  const r = this.proxy, i = Ae(e) ? e.includes(".") ? pf(r, e) : () => r[e] : e.bind(r, r);
  let o;
  se(t) ? o = t : (o = t.handler, n = t);
  const s = ri(this), l = Tl(i, o.bind(r), n);
  return s(), l;
}
function pf(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Pn(e, t, n = 0, r) {
  if (!Le(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(e))
    return e;
  if (r.add(e), Ie(e))
    Pn(e.value, t, n, r);
  else if (re(e))
    for (let i = 0; i < e.length; i++)
      Pn(e[i], t, n, r);
  else if (Rc(e) || ir(e))
    e.forEach((i) => {
      Pn(i, t, n, r);
    });
  else if (Fc(e))
    for (const i in e)
      Pn(e[i], t, n, r);
  return e;
}
function ft(e, t) {
  if (Ue === null)
    return e;
  const n = Po(Ue) || Ue.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, s, l, a = Me] = t[i];
    o && (se(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Pn(s), r.push({
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
function kn(e, t, n, r) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    o && (l.oldValue = o[s].value);
    let a = l.dir[r];
    a && (Gn(), yt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Un());
  }
}
const cn = Symbol("_leaveCb"), xi = Symbol("_enterCb");
function yf() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Cn(() => {
    e.isMounted = !0;
  }), Jt(() => {
    e.isUnmounting = !0;
  }), e;
}
const mt = [Function, Array], wf = {
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
}, Zg = {
  name: "BaseTransition",
  props: wf,
  setup(e, { slots: t }) {
    const n = Ol(), r = yf();
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
        return os(o);
      const a = Aa(o);
      if (!a)
        return os(o);
      const u = Hr(
        a,
        s,
        r,
        n
      );
      zr(a, u);
      const c = n.subTree, f = c && Aa(c);
      if (f && f.type !== Lt && !$n(a, f)) {
        const d = Hr(
          f,
          s,
          r,
          n
        );
        if (zr(f, d), l === "out-in")
          return r.isLeaving = !0, d.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, os(o);
        l === "in-out" && a.type !== Lt && (d.delayLeave = (h, g, m) => {
          const p = bf(
            r,
            f
          );
          p[String(f.key)] = f, h[cn] = () => {
            g(), h[cn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, Jg = Zg;
function bf(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Hr(e, t, n, r) {
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
  } = t, k = String(e.key), y = bf(n, e), C = (P, O) => {
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
      P[cn] && P[cn](
        !0
        /* cancelled */
      );
      const F = y[k];
      F && $n(e, F) && F.el[cn] && F.el[cn](), C(O, [P]);
    },
    enter(P) {
      let O = a, F = u, j = c;
      if (!n.isMounted)
        if (i)
          O = p || a, F = v || u, j = b || c;
        else
          return;
      let R = !1;
      const N = P[xi] = (_) => {
        R || (R = !0, _ ? C(j, [P]) : C(F, [P]), E.delayedLeave && E.delayedLeave(), P[xi] = void 0);
      };
      O ? T(O, [P, N]) : N();
    },
    leave(P, O) {
      const F = String(e.key);
      if (P[xi] && P[xi](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return O();
      C(f, [P]);
      let j = !1;
      const R = P[cn] = (N) => {
        j || (j = !0, O(), N ? C(g, [P]) : C(h, [P]), P[cn] = void 0, y[F] === e && delete y[F]);
      };
      y[F] = e, d ? T(d, [P, R]) : R();
    },
    clone(P) {
      return Hr(P, t, n, r);
    }
  };
  return E;
}
function os(e) {
  if (To(e))
    return e = wn(e), e.children = null, e;
}
function Aa(e) {
  return To(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function zr(e, t) {
  e.shapeFlag & 6 && e.component ? zr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Vl(e, t = !1, n) {
  let r = [], i = 0;
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : o);
    s.type === Se ? (s.patchFlag & 128 && i++, r = r.concat(
      Vl(s.children, t, l)
    )) : (t || s.type !== Lt) && r.push(l != null ? wn(s, { key: l }) : s);
  }
  if (i > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
  return se(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ve({ name: e.name }, t, { setup: e })
  ) : e;
}
const Oi = (e) => !!e.type.__asyncLoader, To = (e) => e.type.__isKeepAlive;
function Qg(e, t) {
  _f(e, "a", t);
}
function em(e, t) {
  _f(e, "da", t);
}
function _f(e, t, n = Oe) {
  const r = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Vo(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      To(i.parent.vnode) && tm(r, t, n, i), i = i.parent;
  }
}
function tm(e, t, n, r) {
  const i = Vo(
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
function Vo(e, t, n = Oe, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...s) => {
      if (n.isUnmounted)
        return;
      Gn();
      const l = ri(n), a = yt(t, n, e, s);
      return l(), Un(), a;
    });
    return r ? i.unshift(o) : i.push(o), o;
  }
}
const Zt = (e) => (t, n = Oe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Ao || e === "sp") && Vo(e, (...r) => t(...r), n)
), Il = Zt("bm"), Cn = Zt("m"), nm = Zt("bu"), xf = Zt("u"), Jt = Zt("bum"), $l = Zt("um"), rm = Zt("sp"), im = Zt(
  "rtg"
), om = Zt(
  "rtc"
);
function sm(e, t = Oe) {
  Vo("ec", e, t);
}
function lm(e, t, n, r) {
  let i;
  const o = n && n[r];
  if (re(e) || Ae(e)) {
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
const $s = (e) => e ? Pf(e) ? Po(e) || e.proxy : $s(e.parent) : null, Ar = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ve(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => $s(e.parent),
    $root: (e) => $s(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Al(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ml(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = De.bind(e.proxy)),
    $watch: (e) => Xg.bind(e)
  })
), ss = (e, t) => e !== Me && !e.__isScriptSetup && be(e, t), am = {
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
        if (ss(r, t))
          return s[t] = 1, r[t];
        if (i !== Me && be(i, t))
          return s[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && be(u, t)
        )
          return s[t] = 3, o[t];
        if (n !== Me && be(n, t))
          return s[t] = 4, n[t];
        As && (s[t] = 0);
      }
    }
    const c = Ar[t];
    let f, d;
    if (c)
      return t === "$attrs" && tt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Me && be(n, t))
      return s[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, be(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: o } = e;
    return ss(i, t) ? (i[t] = n, !0) : r !== Me && be(r, t) ? (r[t] = n, !0) : be(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: o }
  }, s) {
    let l;
    return !!n[s] || e !== Me && be(e, s) || ss(t, s) || (l = o[0]) && be(l, s) || be(r, s) || be(Ar, s) || be(i.config.globalProperties, s);
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
let As = !0;
function um(e) {
  const t = Al(e), n = e.proxy, r = e.ctx;
  As = !1, t.beforeCreate && Ra(t.beforeCreate, e, "bc");
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
  if (u && cm(u, r, null), s)
    for (const H in s) {
      const z = s[H];
      se(z) && (r[H] = z.bind(n));
    }
  if (i) {
    const H = i.call(n, n);
    Le(H) && (e.data = Mt(H));
  }
  if (As = !0, o)
    for (const H in o) {
      const z = o[H], K = se(z) ? z.bind(n, n) : se(z.get) ? z.get.bind(n, n) : pt, X = !se(z) && se(z.set) ? z.set.bind(n) : pt, q = $({
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
      Cf(l[H], r, n, H);
  if (a) {
    const H = se(a) ? a.call(n) : a;
    Reflect.ownKeys(H).forEach((z) => {
      Bt(z, H[z]);
    });
  }
  c && Ra(c, e, "c");
  function I(H, z) {
    re(z) ? z.forEach((K) => H(K.bind(n))) : z && H(z.bind(n));
  }
  if (I(Il, f), I(Cn, d), I(nm, h), I(xf, g), I(Qg, m), I(em, p), I(sm, P), I(om, T), I(im, E), I(Jt, b), I($l, y), I(rm, O), re(F))
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
function cm(e, t, n = pt) {
  re(e) && (e = Ps(e));
  for (const r in e) {
    const i = e[r];
    let o;
    Le(i) ? "default" in i ? o = Fe(
      i.from || r,
      i.default,
      !0
    ) : o = Fe(i.from || r) : o = Fe(i), Ie(o) ? Object.defineProperty(t, r, {
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
function Cf(e, t, n, r) {
  const i = r.includes(".") ? pf(n, r) : () => n[r];
  if (Ae(e)) {
    const o = t[e];
    se(o) && ae(i, o);
  } else if (se(e))
    ae(i, e.bind(n));
  else if (Le(e))
    if (re(e))
      e.forEach((o) => Cf(o, t, n, r));
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
    (u) => Qi(a, u, s, !0)
  ), Qi(a, t, s)), Le(t) && o.set(t, a), a;
}
function Qi(e, t, n, r = !1) {
  const { mixins: i, extends: o } = t;
  o && Qi(e, o, n, !0), i && i.forEach(
    (s) => Qi(e, s, n, !0)
  );
  for (const s in t)
    if (!(r && s === "expose")) {
      const l = fm[s] || n && n[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const fm = {
  data: Na,
  props: Oa,
  emits: Oa,
  // objects
  methods: Tr,
  computed: Tr,
  // lifecycle
  beforeCreate: je,
  created: je,
  beforeMount: je,
  mounted: je,
  beforeUpdate: je,
  updated: je,
  beforeDestroy: je,
  beforeUnmount: je,
  destroyed: je,
  unmounted: je,
  activated: je,
  deactivated: je,
  errorCaptured: je,
  serverPrefetch: je,
  // assets
  components: Tr,
  directives: Tr,
  // watch
  watch: hm,
  // provide / inject
  provide: Na,
  inject: dm
};
function Na(e, t) {
  return t ? e ? function() {
    return Ve(
      se(e) ? e.call(this, this) : e,
      se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function dm(e, t) {
  return Tr(Ps(e), Ps(t));
}
function Ps(e) {
  if (re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Tr(e, t) {
  return e ? Ve(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Oa(e, t) {
  return e ? re(e) && re(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ve(
    /* @__PURE__ */ Object.create(null),
    Pa(e),
    Pa(t ?? {})
  ) : t;
}
function hm(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ve(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = je(e[r], t[r]);
  return n;
}
function Sf() {
  return {
    app: null,
    config: {
      isNativeTag: Yh,
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
let gm = 0;
function mm(e, t) {
  return function(r, i = null) {
    se(r) || (r = Ve({}, r)), i != null && !Le(i) && (i = null);
    const o = Sf(), s = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = o.app = {
      _uid: gm++,
      _component: r,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: zm,
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
          return d.appContext = o, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && t ? t(d, u) : e(d, u, f), l = !0, a._container = u, u.__vue_app__ = a, Po(d.component) || d.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Pr;
        Pr = a;
        try {
          return u();
        } finally {
          Pr = c;
        }
      }
    };
    return a;
  };
}
let Pr = null;
function Bt(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const r = Oe.parent && Oe.parent.provides;
    r === n && (n = Oe.provides = Object.create(r)), n[e] = t;
  }
}
function Fe(e, t, n = !1) {
  const r = Oe || Ue;
  if (r || Pr) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Pr._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && se(t) ? t.call(r && r.proxy) : t;
  }
}
function vm(e, t, n, r = !1) {
  const i = {}, o = {};
  Ki(o, $o, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), kf(e, t, i, o);
  for (const s in e.propsOptions[0])
    s in i || (i[s] = void 0);
  n ? e.props = r ? i : Mg(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function pm(e, t, n, r) {
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
        if (Mo(e.emitsOptions, d))
          continue;
        const h = t[d];
        if (a)
          if (be(o, d))
            h !== o[d] && (o[d] = h, u = !0);
          else {
            const g = Xe(d);
            i[g] = Rs(
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
    kf(e, t, i, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !be(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Ct(f)) === f || !be(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = Rs(
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
function kf(e, t, n, r) {
  const [i, o] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let a in t) {
      if ($r(a))
        continue;
      const u = t[a];
      let c;
      i && be(i, c = Xe(a)) ? !o || !o.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Mo(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, s = !0);
    }
  if (o) {
    const a = ve(n), u = l || Me;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = Rs(
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
function Rs(e, t, n, r, i, o) {
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
          const c = ri(i);
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
function Ef(e, t, n = !1) {
  const r = t.propsCache, i = r.get(e);
  if (i)
    return i;
  const o = e.props, s = {}, l = [];
  let a = !1;
  if (!se(e)) {
    const c = (f) => {
      a = !0;
      const [d, h] = Ef(f, t, !0);
      Ve(s, d), h && l.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Le(e) && r.set(e, rr), rr;
  if (re(o))
    for (let c = 0; c < o.length; c++) {
      const f = Xe(o[c]);
      Fa(f) && (s[f] = Me);
    }
  else if (o)
    for (const c in o) {
      const f = Xe(c);
      if (Fa(f)) {
        const d = o[c], h = s[f] = re(d) || se(d) ? { type: d } : Ve({}, d);
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
  return e[0] !== "$" && !$r(e);
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
const Lf = (e) => e[0] === "_" || e === "$stable", Pl = (e) => re(e) ? e.map(Pt) : [Pt(e)], ym = (e, t, n) => {
  if (t._n)
    return t;
  const r = de((...i) => Pl(t(...i)), n);
  return r._c = !1, r;
}, Mf = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if (Lf(i))
      continue;
    const o = e[i];
    if (se(o))
      t[i] = ym(i, o, r);
    else if (o != null) {
      const s = Pl(o);
      t[i] = () => s;
    }
  }
}, Tf = (e, t) => {
  const n = Pl(t);
  e.slots.default = () => n;
}, wm = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = ve(t), Ki(t, "_", n)) : Mf(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Tf(e, t);
  Ki(e.slots, $o, 1);
}, bm = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let o = !0, s = Me;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : (Ve(i, t), !n && l === 1 && delete i._) : (o = !t.$stable, Mf(t, i)), s = t;
  } else
    t && (Tf(e, t), s = { default: 1 });
  if (o)
    for (const l in i)
      !Lf(l) && s[l] == null && delete i[l];
};
function Ns(e, t, n, r, i = !1) {
  if (re(e)) {
    e.forEach(
      (d, h) => Ns(
        d,
        t && (re(t) ? t[h] : t),
        n,
        r,
        i
      )
    );
    return;
  }
  if (Oi(r) && !i)
    return;
  const o = r.shapeFlag & 4 ? Po(r.component) || r.component.proxy : r.el, s = i ? null : o, { i: l, r: a } = e, u = t && t.r, c = l.refs === Me ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (Ae(u) ? (c[u] = null, be(f, u) && (f[u] = null)) : Ie(u) && (u.value = null)), se(a))
    pn(a, l, 12, [s, c]);
  else {
    const d = Ae(a), h = Ie(a);
    if (d || h) {
      const g = () => {
        if (e.f) {
          const m = d ? be(f, a) ? f[a] : c[a] : a.value;
          i ? re(m) && gl(m, o) : re(m) ? m.includes(o) || m.push(o) : d ? (c[a] = [o], be(f, a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else
          d ? (c[a] = s, be(f, a) && (f[a] = s)) : h && (a.value = s, e.k && (c[e.k] = s));
      };
      s ? (g.id = -1, Qe(g, n)) : g();
    }
  }
}
const Qe = qg;
function _m(e) {
  return xm(e);
}
function xm(e, t) {
  const n = Bc();
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
  } = e, m = (x, L, D, W = null, U = null, Y = null, Z = void 0, S = null, V = !!L.dynamicChildren) => {
    if (x === L)
      return;
    x && !$n(x, L) && (W = Ce(x), J(x, U, Y, !0), x = null), L.patchFlag === -2 && (V = !1, L.dynamicChildren = null);
    const { type: M, ref: A, shapeFlag: G } = L;
    switch (M) {
      case ni:
        p(x, L, D, W);
        break;
      case Lt:
        v(x, L, D, W);
        break;
      case as:
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
          V
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
          V
        ) : G & 6 ? N(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          V
        ) : (G & 64 || G & 128) && M.process(
          x,
          L,
          D,
          W,
          U,
          Y,
          Z,
          S,
          V,
          It
        );
    }
    A != null && U && Ns(A, x && x.ref, Y, L || x, !L);
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
  }, C = (x, L, D, W, U, Y, Z, S, V) => {
    L.type === "svg" ? Z = "svg" : L.type === "math" && (Z = "mathml"), x == null ? T(
      L,
      D,
      W,
      U,
      Y,
      Z,
      S,
      V
    ) : O(
      x,
      L,
      U,
      Y,
      Z,
      S,
      V
    );
  }, T = (x, L, D, W, U, Y, Z, S) => {
    let V, M;
    const { props: A, shapeFlag: G, transition: Q, dirs: ne } = x;
    if (V = x.el = s(
      x.type,
      Y,
      A && A.is,
      A
    ), G & 8 ? c(V, x.children) : G & 16 && P(
      x.children,
      V,
      null,
      W,
      U,
      ls(x, Y),
      Z,
      S
    ), ne && kn(x, null, W, "created"), E(V, x, x.scopeId, Z, W), A) {
      for (const _e in A)
        _e !== "value" && !$r(_e) && o(
          V,
          _e,
          null,
          A[_e],
          Y,
          x.children,
          W,
          U,
          he
        );
      "value" in A && o(V, "value", null, A.value, Y), (M = A.onVnodeBeforeMount) && At(M, W, x);
    }
    ne && kn(x, null, W, "beforeMount");
    const ce = Cm(U, Q);
    ce && Q.beforeEnter(V), r(V, L, D), ((M = A && A.onVnodeMounted) || ce || ne) && Qe(() => {
      M && At(M, W, x), ce && Q.enter(V), ne && kn(x, null, W, "mounted");
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
  }, P = (x, L, D, W, U, Y, Z, S, V = 0) => {
    for (let M = V; M < x.length; M++) {
      const A = x[M] = S ? fn(x[M]) : Pt(x[M]);
      m(
        null,
        A,
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
    let { patchFlag: V, dynamicChildren: M, dirs: A } = L;
    V |= x.patchFlag & 16;
    const G = x.props || Me, Q = L.props || Me;
    let ne;
    if (D && En(D, !1), (ne = Q.onVnodeBeforeUpdate) && At(ne, D, L, x), A && kn(L, x, D, "beforeUpdate"), D && En(D, !0), M ? F(
      x.dynamicChildren,
      M,
      S,
      D,
      W,
      ls(L, U),
      Y
    ) : Z || z(
      x,
      L,
      S,
      null,
      D,
      W,
      ls(L, U),
      Y,
      !1
    ), V > 0) {
      if (V & 16)
        j(
          S,
          L,
          G,
          Q,
          D,
          W,
          U
        );
      else if (V & 2 && G.class !== Q.class && o(S, "class", null, Q.class, U), V & 4 && o(S, "style", G.style, Q.style, U), V & 8) {
        const ce = L.dynamicProps;
        for (let _e = 0; _e < ce.length; _e++) {
          const Ee = ce[_e], Re = G[Ee], bt = Q[Ee];
          (bt !== Re || Ee === "value") && o(
            S,
            Ee,
            Re,
            bt,
            U,
            x.children,
            D,
            W,
            he
          );
        }
      }
      V & 1 && x.children !== L.children && c(S, L.children);
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
    ((ne = Q.onVnodeUpdated) || A) && Qe(() => {
      ne && At(ne, D, L, x), A && kn(L, x, D, "updated");
    }, W);
  }, F = (x, L, D, W, U, Y, Z) => {
    for (let S = 0; S < L.length; S++) {
      const V = x[S], M = L[S], A = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        V.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (V.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !$n(V, M) || // - In the case of a component, it could contain anything.
        V.shapeFlag & 70) ? f(V.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          D
        )
      );
      m(
        V,
        M,
        A,
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
      if (D !== Me)
        for (const S in D)
          !$r(S) && !(S in W) && o(
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
        if ($r(S))
          continue;
        const V = W[S], M = D[S];
        V !== M && S !== "value" && o(
          x,
          S,
          M,
          V,
          Z,
          L.children,
          U,
          Y,
          he
        );
      }
      "value" in W && o(x, "value", D.value, W.value, Z);
    }
  }, R = (x, L, D, W, U, Y, Z, S, V) => {
    const M = L.el = x ? x.el : l(""), A = L.anchor = x ? x.anchor : l("");
    let { patchFlag: G, dynamicChildren: Q, slotScopeIds: ne } = L;
    ne && (S = S ? S.concat(ne) : ne), x == null ? (r(M, D, W), r(A, D, W), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      L.children || [],
      D,
      A,
      U,
      Y,
      Z,
      S,
      V
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
      A,
      U,
      Y,
      Z,
      S,
      V
    );
  }, N = (x, L, D, W, U, Y, Z, S, V) => {
    L.slotScopeIds = S, x == null ? L.shapeFlag & 512 ? U.ctx.activate(
      L,
      D,
      W,
      Z,
      V
    ) : _(
      L,
      D,
      W,
      U,
      Y,
      Z,
      V
    ) : B(x, L, V);
  }, _ = (x, L, D, W, U, Y, Z) => {
    const S = x.component = Rm(
      x,
      W,
      U
    );
    if (To(x) && (S.ctx.renderer = It), Nm(S), S.asyncDep) {
      if (U && U.registerDep(S, I), !x.el) {
        const V = S.subTree = w(Lt);
        v(null, V, L, D);
      }
    } else
      I(
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
    if (zg(x, L, D))
      if (W.asyncDep && !W.asyncResolved) {
        H(W, L, D);
        return;
      } else
        W.next = L, Ng(W.update), W.effect.dirty = !0, W.update();
    else
      L.el = x.el, W.vnode = L;
  }, I = (x, L, D, W, U, Y, Z) => {
    const S = () => {
      if (x.isMounted) {
        let { next: A, bu: G, u: Q, parent: ne, vnode: ce } = x;
        {
          const Xn = Vf(x);
          if (Xn) {
            A && (A.el = ce.el, H(x, A, Z)), Xn.asyncDep.then(() => {
              x.isUnmounted || S();
            });
            return;
          }
        }
        let _e = A, Ee;
        En(x, !1), A ? (A.el = ce.el, H(x, A, Z)) : A = ce, G && ns(G), (Ee = A.props && A.props.onVnodeBeforeUpdate) && At(Ee, ne, A, ce), En(x, !0);
        const Re = is(x), bt = x.subTree;
        x.subTree = Re, m(
          bt,
          Re,
          // parent may have changed if it's in a teleport
          f(bt.el),
          // anchor may have changed if it's in a fragment
          Ce(bt),
          x,
          U,
          Y
        ), A.el = Re.el, _e === null && jg(x, Re.el), Q && Qe(Q, U), (Ee = A.props && A.props.onVnodeUpdated) && Qe(
          () => At(Ee, ne, A, ce),
          U
        );
      } else {
        let A;
        const { el: G, props: Q } = L, { bm: ne, m: ce, parent: _e } = x, Ee = Oi(L);
        if (En(x, !1), ne && ns(ne), !Ee && (A = Q && Q.onVnodeBeforeMount) && At(A, _e, L), En(x, !0), G && rn) {
          const Re = () => {
            x.subTree = is(x), rn(
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
            () => !x.isUnmounted && Re()
          ) : Re();
        } else {
          const Re = x.subTree = is(x);
          m(
            null,
            Re,
            D,
            W,
            x,
            U,
            Y
          ), L.el = Re.el;
        }
        if (ce && Qe(ce, U), !Ee && (A = Q && Q.onVnodeMounted)) {
          const Re = L;
          Qe(
            () => At(A, _e, Re),
            U
          );
        }
        (L.shapeFlag & 256 || _e && Oi(_e.vnode) && _e.vnode.shapeFlag & 256) && x.a && Qe(x.a, U), x.isMounted = !0, L = D = W = null;
      }
    }, V = x.effect = new wl(
      S,
      pt,
      () => Ml(M),
      x.scope
      // track it in component's effect scope
    ), M = x.update = () => {
      V.dirty && V.run();
    };
    M.id = x.uid, En(x, !0), M();
  }, H = (x, L, D) => {
    L.component = x;
    const W = x.vnode.props;
    x.vnode = L, x.next = null, pm(x, L.props, W, D), bm(x, L.children, D), Gn(), Va(x), Un();
  }, z = (x, L, D, W, U, Y, Z, S, V = !1) => {
    const M = x && x.children, A = x ? x.shapeFlag : 0, G = L.children, { patchFlag: Q, shapeFlag: ne } = L;
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
          V
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
          V
        );
        return;
      }
    }
    ne & 8 ? (A & 16 && he(M, U, Y), G !== M && c(D, G)) : A & 16 ? ne & 16 ? X(
      M,
      G,
      D,
      W,
      U,
      Y,
      Z,
      S,
      V
    ) : he(M, U, Y, !0) : (A & 8 && c(D, ""), ne & 16 && P(
      G,
      D,
      W,
      U,
      Y,
      Z,
      S,
      V
    ));
  }, K = (x, L, D, W, U, Y, Z, S, V) => {
    x = x || rr, L = L || rr;
    const M = x.length, A = L.length, G = Math.min(M, A);
    let Q;
    for (Q = 0; Q < G; Q++) {
      const ne = L[Q] = V ? fn(L[Q]) : Pt(L[Q]);
      m(
        x[Q],
        ne,
        D,
        null,
        U,
        Y,
        Z,
        S,
        V
      );
    }
    M > A ? he(
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
      V,
      G
    );
  }, X = (x, L, D, W, U, Y, Z, S, V) => {
    let M = 0;
    const A = L.length;
    let G = x.length - 1, Q = A - 1;
    for (; M <= G && M <= Q; ) {
      const ne = x[M], ce = L[M] = V ? fn(L[M]) : Pt(L[M]);
      if ($n(ne, ce))
        m(
          ne,
          ce,
          D,
          null,
          U,
          Y,
          Z,
          S,
          V
        );
      else
        break;
      M++;
    }
    for (; M <= G && M <= Q; ) {
      const ne = x[G], ce = L[Q] = V ? fn(L[Q]) : Pt(L[Q]);
      if ($n(ne, ce))
        m(
          ne,
          ce,
          D,
          null,
          U,
          Y,
          Z,
          S,
          V
        );
      else
        break;
      G--, Q--;
    }
    if (M > G) {
      if (M <= Q) {
        const ne = Q + 1, ce = ne < A ? L[ne].el : W;
        for (; M <= Q; )
          m(
            null,
            L[M] = V ? fn(L[M]) : Pt(L[M]),
            D,
            ce,
            U,
            Y,
            Z,
            S,
            V
          ), M++;
      }
    } else if (M > Q)
      for (; M <= G; )
        J(x[M], U, Y, !0), M++;
    else {
      const ne = M, ce = M, _e = /* @__PURE__ */ new Map();
      for (M = ce; M <= Q; M++) {
        const it = L[M] = V ? fn(L[M]) : Pt(L[M]);
        it.key != null && _e.set(it.key, M);
      }
      let Ee, Re = 0;
      const bt = Q - ce + 1;
      let Xn = !1, wa = 0;
      const Cr = new Array(bt);
      for (M = 0; M < bt; M++)
        Cr[M] = 0;
      for (M = ne; M <= G; M++) {
        const it = x[M];
        if (Re >= bt) {
          J(it, U, Y, !0);
          continue;
        }
        let $t;
        if (it.key != null)
          $t = _e.get(it.key);
        else
          for (Ee = ce; Ee <= Q; Ee++)
            if (Cr[Ee - ce] === 0 && $n(it, L[Ee])) {
              $t = Ee;
              break;
            }
        $t === void 0 ? J(it, U, Y, !0) : (Cr[$t - ce] = M + 1, $t >= wa ? wa = $t : Xn = !0, m(
          it,
          L[$t],
          D,
          null,
          U,
          Y,
          Z,
          S,
          V
        ), Re++);
      }
      const ba = Xn ? Sm(Cr) : rr;
      for (Ee = ba.length - 1, M = bt - 1; M >= 0; M--) {
        const it = ce + M, $t = L[it], _a = it + 1 < A ? L[it + 1].el : W;
        Cr[M] === 0 ? m(
          null,
          $t,
          D,
          _a,
          U,
          Y,
          Z,
          S,
          V
        ) : Xn && (Ee < 0 || M !== ba[Ee] ? q($t, D, _a, 2) : Ee--);
      }
    }
  }, q = (x, L, D, W, U = null) => {
    const { el: Y, type: Z, transition: S, children: V, shapeFlag: M } = x;
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
      for (let G = 0; G < V.length; G++)
        q(V[G], L, D, W);
      r(x.anchor, L, D);
      return;
    }
    if (Z === as) {
      k(x, L, D);
      return;
    }
    if (W !== 2 && M & 1 && S)
      if (W === 0)
        S.beforeEnter(Y), r(Y, L, D), Qe(() => S.enter(Y), U);
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
      children: V,
      dynamicChildren: M,
      shapeFlag: A,
      patchFlag: G,
      dirs: Q
    } = x;
    if (S != null && Ns(S, null, D, x, !0), A & 256) {
      L.ctx.deactivate(x);
      return;
    }
    const ne = A & 1 && Q, ce = !Oi(x);
    let _e;
    if (ce && (_e = Z && Z.onVnodeBeforeUnmount) && At(_e, L, x), A & 6)
      xe(x.component, D, W);
    else {
      if (A & 128) {
        x.suspense.unmount(D, W);
        return;
      }
      ne && kn(x, null, L, "beforeUnmount"), A & 64 ? x.type.remove(
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
      ) : (Y === Se && G & 384 || !U && A & 16) && he(V, L, D), W && te(x);
    }
    (ce && (_e = Z && Z.onVnodeUnmounted) || ne) && Qe(() => {
      _e && At(_e, L, x), ne && kn(x, null, L, "unmounted");
    }, D);
  }, te = (x) => {
    const { type: L, el: D, anchor: W, transition: U } = x;
    if (L === Se) {
      ue(D, W);
      return;
    }
    if (L === as) {
      y(x);
      return;
    }
    const Y = () => {
      i(D), U && !U.persisted && U.afterLeave && U.afterLeave();
    };
    if (x.shapeFlag & 1 && U && !U.persisted) {
      const { leave: Z, delayLeave: S } = U, V = () => Z(D, Y);
      S ? S(x.el, Y, V) : V();
    } else
      Y();
  }, ue = (x, L) => {
    let D;
    for (; x !== L; )
      D = d(x), i(x), x = D;
    i(L);
  }, xe = (x, L, D) => {
    const { bum: W, scope: U, update: Y, subTree: Z, um: S } = x;
    W && ns(W), U.stop(), Y && (Y.active = !1, J(Z, x, L, D)), S && Qe(S, L), Qe(() => {
      x.isUnmounted = !0;
    }, L), L && L.pendingBranch && !L.isUnmounted && x.asyncDep && !x.asyncResolved && x.suspenseId === L.pendingId && (L.deps--, L.deps === 0 && L.resolve());
  }, he = (x, L, D, W = !1, U = !1, Y = 0) => {
    for (let Z = Y; Z < x.length; Z++)
      J(x[Z], L, D, W, U);
  }, Ce = (x) => x.shapeFlag & 6 ? Ce(x.component.subTree) : x.shapeFlag & 128 ? x.suspense.next() : d(x.anchor || x.el);
  let Ne = !1;
  const wt = (x, L, D) => {
    x == null ? L._vnode && J(L._vnode, null, null, !0) : m(
      L._vnode || null,
      x,
      L,
      null,
      null,
      null,
      D
    ), Ne || (Ne = !0, Va(), cf(), Ne = !1), L._vnode = x;
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
    createApp: mm(wt, nn)
  };
}
function ls({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function En({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Cm(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Rl(e, t, n = !1) {
  const r = e.children, i = t.children;
  if (re(r) && re(i))
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = fn(i[o]), l.el = s.el), n || Rl(s, l)), l.type === ni && (l.el = s.el);
    }
}
function Sm(e) {
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
function Vf(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Vf(t);
}
const km = (e) => e.__isTeleport, Rr = (e) => e && (e.disabled || e.disabled === ""), za = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ja = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Os = (e, t) => {
  const n = e && e.to;
  return Ae(n) ? t ? t(n) : null : n;
}, Em = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, i, o, s, l, a, u) {
    const {
      mc: c,
      pc: f,
      pbc: d,
      o: { insert: h, querySelector: g, createText: m, createComment: p }
    } = u, v = Rr(t.props);
    let { shapeFlag: b, children: k, dynamicChildren: y } = t;
    if (e == null) {
      const C = t.el = m(""), T = t.anchor = m("");
      h(C, n, r), h(T, n, r);
      const E = t.target = Os(t.props, g), P = t.targetAnchor = m("");
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
      const C = t.anchor = e.anchor, T = t.target = e.target, E = t.targetAnchor = e.targetAnchor, P = Rr(e.props), O = P ? n : T, F = P ? C : E;
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
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Ci(
          t,
          n,
          C,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const j = t.target = Os(
          t.props,
          g
        );
        j && Ci(
          t,
          j,
          null,
          u,
          0
        );
      } else
        P && Ci(
          t,
          T,
          E,
          u,
          1
        );
    }
    If(t);
  },
  remove(e, t, n, r, { um: i, o: { remove: o } }, s) {
    const { shapeFlag: l, children: a, anchor: u, targetAnchor: c, target: f, props: d } = e;
    if (f && o(c), s && o(u), l & 16) {
      const h = s || !Rr(d);
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
  move: Ci,
  hydrate: Lm
};
function Ci(e, t, n, { o: { insert: r }, m: i }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: s, anchor: l, shapeFlag: a, children: u, props: c } = e, f = o === 2;
  if (f && r(s, t, n), (!f || Rr(c)) && a & 16)
    for (let d = 0; d < u.length; d++)
      i(
        u[d],
        t,
        n,
        2
      );
  f && r(l, t, n);
}
function Lm(e, t, n, r, i, o, {
  o: { nextSibling: s, parentNode: l, querySelector: a }
}, u) {
  const c = t.target = Os(
    t.props,
    a
  );
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Rr(t.props))
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
    If(t);
  }
  return t.anchor && s(t.anchor);
}
const Mm = Em;
function If(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Se = Symbol.for("v-fgt"), ni = Symbol.for("v-txt"), Lt = Symbol.for("v-cmt"), as = Symbol.for("v-stc"), Nr = [];
let Et = null;
function zn(e = !1) {
  Nr.push(Et = e ? null : []);
}
function Tm() {
  Nr.pop(), Et = Nr[Nr.length - 1] || null;
}
let jr = 1;
function Wa(e) {
  jr += e;
}
function $f(e) {
  return e.dynamicChildren = jr > 0 ? Et || rr : null, Tm(), jr > 0 && Et && Et.push(e), e;
}
function Fs(e, t, n, r, i, o) {
  return $f(
    Pe(
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
function Io(e, t, n, r, i) {
  return $f(
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
function Bs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function $n(e, t) {
  return e.type === t.type && e.key === t.key;
}
const $o = "__vInternal", Af = ({ key: e }) => e ?? null, Fi = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ae(e) || Ie(e) || se(e) ? { i: Ue, r: e, k: t, f: !!n } : e : null);
function Pe(e, t = null, n = null, r = 0, i = null, o = e === Se ? 0 : 1, s = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Af(t),
    ref: t && Fi(t),
    scopeId: hf,
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
    ctx: Ue
  };
  return l ? (Nl(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ae(n) ? 8 : 16), jr > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Et && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Et.push(a), a;
}
const w = Vm;
function Vm(e, t = null, n = null, r = 0, i = null, o = !1) {
  if ((!e || e === mf) && (e = Lt), Bs(e)) {
    const l = wn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Nl(l, n), jr > 0 && !o && Et && (l.shapeFlag & 6 ? Et[Et.indexOf(e)] = l : Et.push(l)), l.patchFlag |= -2, l;
  }
  if (Hm(e) && (e = e.__vccOpts), t) {
    t = Im(t);
    let { class: l, style: a } = t;
    l && !Ae(l) && (t.class = pl(l)), Le(a) && (ef(a) && !re(a) && (a = Ve({}, a)), t.style = vl(a));
  }
  const s = Ae(e) ? 1 : Ug(e) ? 128 : km(e) ? 64 : Le(e) ? 4 : se(e) ? 2 : 0;
  return Pe(
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
function Im(e) {
  return e ? ef(e) || $o in e ? Ve({}, e) : e : null;
}
function wn(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: s } = e, l = t ? fe(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Af(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? re(i) ? i.concat(Fi(t)) : [i, Fi(t)] : Fi(t)
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
    ssContent: e.ssContent && wn(e.ssContent),
    ssFallback: e.ssFallback && wn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function We(e = " ", t = 0) {
  return w(ni, null, e, t);
}
function $m(e = "", t = !1) {
  return t ? (zn(), Io(Lt, null, e)) : w(Lt, null, e);
}
function Pt(e) {
  return e == null || typeof e == "boolean" ? w(Lt) : re(e) ? w(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? fn(e) : w(ni, null, String(e));
}
function fn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : wn(e);
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
      !i && !($o in t) ? t._ctx = Ue : i === 3 && Ue && (Ue.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    se(t) ? (t = { default: t, _ctx: Ue }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [We(t)]) : n = 8);
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
      else if (Co(i)) {
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
const Am = Sf();
let Pm = 0;
function Rm(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || Am, o = {
    uid: Pm++,
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
    scope: new zc(
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
    propsOptions: Ef(r, i),
    emitsOptions: df(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Me,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Me,
    data: Me,
    props: Me,
    attrs: Me,
    slots: Me,
    refs: Me,
    setupState: Me,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Bg.bind(null, o), e.ce && e.ce(o), o;
}
let Oe = null;
const Ol = () => Oe || Ue;
let eo, Ds;
{
  const e = Bc(), t = (n, r) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(r), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  eo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), Ds = t(
    "__VUE_SSR_SETTERS__",
    (n) => Ao = n
  );
}
const ri = (e) => {
  const t = Oe;
  return eo(e), e.scope.on(), () => {
    e.scope.off(), eo(t);
  };
}, Ga = () => {
  Oe && Oe.scope.off(), eo(null);
};
function Pf(e) {
  return e.vnode.shapeFlag & 4;
}
let Ao = !1;
function Nm(e, t = !1) {
  t && Ds(t);
  const { props: n, children: r } = e.vnode, i = Pf(e);
  vm(e, n, i, t), wm(e, r);
  const o = i ? Om(e, t) : void 0;
  return t && Ds(!1), o;
}
function Om(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = tf(new Proxy(e.ctx, am));
  const { setup: r } = n;
  if (r) {
    const i = e.setupContext = r.length > 1 ? Bm(e) : null, o = ri(e);
    Gn();
    const s = pn(
      r,
      e,
      0,
      [
        e.props,
        i
      ]
    );
    if (Un(), o(), Nc(s)) {
      if (s.then(Ga, Ga), t)
        return s.then((l) => {
          Ua(e, l, t);
        }).catch((l) => {
          Lo(l, e, 0);
        });
      e.asyncDep = s;
    } else
      Ua(e, s, t);
  } else
    Rf(e, t);
}
function Ua(e, t, n) {
  se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Le(t) && (e.setupState = sf(t)), Rf(e, n);
}
let qa;
function Rf(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && qa && !r.render) {
      const i = r.template || Al(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: s } = e.appContext.config, { delimiters: l, compilerOptions: a } = r, u = Ve(
          Ve(
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
    const i = ri(e);
    Gn();
    try {
      um(e);
    } finally {
      Un(), i();
    }
  }
}
function Fm(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return tt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Bm(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Fm(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Po(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(sf(tf(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Ar)
          return Ar[n](e);
      },
      has(t, n) {
        return n in t || n in Ar;
      }
    }));
}
function Dm(e, t = !0) {
  return se(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Hm(e) {
  return se(e) && "__vccOpts" in e;
}
const $ = (e, t) => Tg(e, t, Ao);
function br(e, t, n) {
  const r = arguments.length;
  return r === 2 ? Le(t) && !re(t) ? Bs(t) ? w(e, null, [t]) : w(e, t) : w(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Bs(n) && (n = [n]), w(e, t, n));
}
const zm = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const jm = "http://www.w3.org/2000/svg", Wm = "http://www.w3.org/1998/Math/MathML", dn = typeof document < "u" ? document : null, Ya = dn && /* @__PURE__ */ dn.createElement("template"), Gm = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const i = t === "svg" ? dn.createElementNS(jm, e) : t === "mathml" ? dn.createElementNS(Wm, e) : dn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (e) => dn.createTextNode(e),
  createComment: (e) => dn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => dn.querySelector(e),
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
}, sn = "transition", Sr = "animation", dr = Symbol("_vtc"), Kt = (e, { slots: t }) => br(Jg, Of(e), t);
Kt.displayName = "Transition";
const Nf = {
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
}, Um = Kt.props = /* @__PURE__ */ Ve(
  {},
  wf,
  Nf
), Ln = (e, t = []) => {
  re(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ka = (e) => e ? re(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Of(e) {
  const t = {};
  for (const R in e)
    R in Nf || (t[R] = e[R]);
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
  } = e, g = qm(i), m = g && g[0], p = g && g[1], {
    onBeforeEnter: v,
    onEnter: b,
    onEnterCancelled: k,
    onLeave: y,
    onLeaveCancelled: C,
    onBeforeAppear: T = v,
    onAppear: E = b,
    onAppearCancelled: P = k
  } = t, O = (R, N, _) => {
    an(R, N ? c : l), an(R, N ? u : s), _ && _();
  }, F = (R, N) => {
    R._isLeaving = !1, an(R, f), an(R, h), an(R, d), N && N();
  }, j = (R) => (N, _) => {
    const B = R ? E : b, I = () => O(N, R, _);
    Ln(B, [N, I]), Xa(() => {
      an(N, R ? a : o), Wt(N, R ? c : l), Ka(B) || Za(N, r, m, I);
    });
  };
  return Ve(t, {
    onBeforeEnter(R) {
      Ln(v, [R]), Wt(R, o), Wt(R, s);
    },
    onBeforeAppear(R) {
      Ln(T, [R]), Wt(R, a), Wt(R, u);
    },
    onEnter: j(!1),
    onAppear: j(!0),
    onLeave(R, N) {
      R._isLeaving = !0;
      const _ = () => F(R, N);
      Wt(R, f), Bf(), Wt(R, d), Xa(() => {
        R._isLeaving && (an(R, f), Wt(R, h), Ka(y) || Za(R, r, p, _));
      }), Ln(y, [R, _]);
    },
    onEnterCancelled(R) {
      O(R, !1), Ln(k, [R]);
    },
    onAppearCancelled(R) {
      O(R, !0), Ln(P, [R]);
    },
    onLeaveCancelled(R) {
      F(R), Ln(C, [R]);
    }
  });
}
function qm(e) {
  if (e == null)
    return null;
  if (Le(e))
    return [us(e.enter), us(e.leave)];
  {
    const t = us(e);
    return [t, t];
  }
}
function us(e) {
  return Ls(e);
}
function Wt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[dr] || (e[dr] = /* @__PURE__ */ new Set())).add(t);
}
function an(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[dr];
  n && (n.delete(t), n.size || (e[dr] = void 0));
}
function Xa(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ym = 0;
function Za(e, t, n, r) {
  const i = e._endId = ++Ym, o = () => {
    i === e._endId && r();
  };
  if (n)
    return setTimeout(o, n);
  const { type: s, timeout: l, propCount: a } = Ff(e, t);
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
function Ff(e, t) {
  const n = window.getComputedStyle(e), r = (g) => (n[g] || "").split(", "), i = r(`${sn}Delay`), o = r(`${sn}Duration`), s = Ja(i, o), l = r(`${Sr}Delay`), a = r(`${Sr}Duration`), u = Ja(l, a);
  let c = null, f = 0, d = 0;
  t === sn ? s > 0 && (c = sn, f = s, d = o.length) : t === Sr ? u > 0 && (c = Sr, f = u, d = a.length) : (f = Math.max(s, u), c = f > 0 ? s > u ? sn : Sr : null, d = c ? c === sn ? o.length : a.length : 0);
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
function Bf() {
  return document.body.offsetHeight;
}
function Km(e, t, n) {
  const r = e[dr];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const to = Symbol("_vod"), Df = Symbol("_vsh"), Yn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[to] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : kr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), kr(e, !0), r.enter(e)) : r.leave(e, () => {
      kr(e, !1);
    }) : kr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    kr(e, t);
  }
};
function kr(e, t) {
  e.style.display = t ? e[to] : "none", e[Df] = !t;
}
const Xm = Symbol(""), Zm = /(^|;)\s*display\s*:/;
function Jm(e, t, n) {
  const r = e.style, i = Ae(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (Ae(t))
        for (const s of t.split(";")) {
          const l = s.slice(0, s.indexOf(":")).trim();
          n[l] == null && Bi(r, l, "");
        }
      else
        for (const s in t)
          n[s] == null && Bi(r, s, "");
    for (const s in n)
      s === "display" && (o = !0), Bi(r, s, n[s]);
  } else if (i) {
    if (t !== n) {
      const s = r[Xm];
      s && (n += ";" + s), r.cssText = n, o = Zm.test(n);
    }
  } else
    t && e.removeAttribute("style");
  to in e && (e[to] = o ? r.display : "", e[Df] && (r.display = "none"));
}
const eu = /\s*!important$/;
function Bi(e, t, n) {
  if (re(n))
    n.forEach((r) => Bi(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Qm(e, t);
    eu.test(n) ? e.setProperty(
      Ct(r),
      n.replace(eu, ""),
      "important"
    ) : e[r] = n;
  }
}
const tu = ["Webkit", "Moz", "ms"], cs = {};
function Qm(e, t) {
  const n = cs[t];
  if (n)
    return n;
  let r = Xe(t);
  if (r !== "filter" && r in e)
    return cs[t] = r;
  r = yr(r);
  for (let i = 0; i < tu.length; i++) {
    const o = tu[i] + r;
    if (o in e)
      return cs[t] = o;
  }
  return t;
}
const nu = "http://www.w3.org/1999/xlink";
function ev(e, t, n, r, i) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(nu, t.slice(6, t.length)) : e.setAttributeNS(nu, t, n);
  else {
    const o = og(t);
    n == null || o && !Dc(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function tv(e, t, n, r, i, o, s) {
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
    u === "boolean" ? n = Dc(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function nv(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function rv(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const ru = Symbol("_vei");
function iv(e, t, n, r, i = null) {
  const o = e[ru] || (e[ru] = {}), s = o[t];
  if (r && s)
    s.value = r;
  else {
    const [l, a] = ov(t);
    if (r) {
      const u = o[t] = av(r, i);
      nv(e, l, u, a);
    } else
      s && (rv(e, l, s, a), o[t] = void 0);
  }
}
const iu = /(?:Once|Passive|Capture)$/;
function ov(e) {
  let t;
  if (iu.test(e)) {
    t = {};
    let r;
    for (; r = e.match(iu); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
let fs = 0;
const sv = /* @__PURE__ */ Promise.resolve(), lv = () => fs || (sv.then(() => fs = 0), fs = Date.now());
function av(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    yt(
      uv(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = lv(), n;
}
function uv(e, t) {
  if (re(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return t;
}
const ou = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, cv = (e, t, n, r, i, o, s, l, a) => {
  const u = i === "svg";
  t === "class" ? Km(e, r, u) : t === "style" ? Jm(e, n, r) : Co(t) ? hl(t) || iv(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : fv(e, t, r, u)) ? tv(
    e,
    t,
    r,
    o,
    s,
    l,
    a
  ) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ev(e, t, r, u));
};
function fv(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ou(t) && se(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return ou(t) && Ae(n) ? !1 : t in e;
}
const Hf = /* @__PURE__ */ new WeakMap(), zf = /* @__PURE__ */ new WeakMap(), no = Symbol("_moveCb"), su = Symbol("_enterCb"), jf = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ve({}, Um, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Ol(), r = yf();
    let i, o;
    return xf(() => {
      if (!i.length)
        return;
      const s = e.moveClass || `${e.name || "v"}-move`;
      if (!vv(
        i[0].el,
        n.vnode.el,
        s
      ))
        return;
      i.forEach(hv), i.forEach(gv);
      const l = i.filter(mv);
      Bf(), l.forEach((a) => {
        const u = a.el, c = u.style;
        Wt(u, s), c.transform = c.webkitTransform = c.transitionDuration = "";
        const f = u[no] = (d) => {
          d && d.target !== u || (!d || /transform$/.test(d.propertyName)) && (u.removeEventListener("transitionend", f), u[no] = null, an(u, s));
        };
        u.addEventListener("transitionend", f);
      });
    }), () => {
      const s = ve(e), l = Of(s);
      let a = s.tag || Se;
      i = o, o = t.default ? Vl(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && zr(
          c,
          Hr(c, l, r, n)
        );
      }
      if (i)
        for (let u = 0; u < i.length; u++) {
          const c = i[u];
          zr(
            c,
            Hr(c, l, r, n)
          ), Hf.set(c, c.el.getBoundingClientRect());
        }
      return w(a, null, o);
    };
  }
}, dv = (e) => delete e.mode;
jf.props;
const Wf = jf;
function hv(e) {
  const t = e.el;
  t[no] && t[no](), t[su] && t[su]();
}
function gv(e) {
  zf.set(e, e.el.getBoundingClientRect());
}
function mv(e) {
  const t = Hf.get(e), n = zf.get(e), r = t.left - n.left, i = t.top - n.top;
  if (r || i) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${r}px,${i}px)`, o.transitionDuration = "0s", e;
  }
}
function vv(e, t, n) {
  const r = e.cloneNode(), i = e[dr];
  i && i.forEach((l) => {
    l.split(/\s+/).forEach((a) => a && r.classList.remove(a));
  }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Ff(r);
  return o.removeChild(r), s;
}
const pv = /* @__PURE__ */ Ve({ patchProp: cv }, Gm);
let lu;
function yv() {
  return lu || (lu = _m(pv));
}
const au = (...e) => {
  yv().render(...e);
};
/*! (c) Andrea Giammarchi - ISC */
const wv = (() => {
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
function bv(e, t, n) {
  const r = /* @__PURE__ */ wr(e);
  class i extends Fl {
    constructor(s) {
      super(r, s, t, n);
    }
  }
  return ot(i, "def", r), i;
}
const _v = typeof HTMLElement < "u" ? wv : class {
};
class Fl extends _v {
  constructor(n, r = {}, i = {}, o) {
    super();
    /**
     * @internal
     */
    ot(this, "_instance", null);
    ot(this, "_connected", !1);
    ot(this, "_resolved", !1);
    ot(this, "_numberProps", null);
    ot(this, "_styles");
    ot(this, "_slots");
    ot(this, "_ob", null);
    this._def = n, this._props = r, this._config = i, this._config = Ve(
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
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), De(() => {
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
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = Ls(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[Xe(u)] = !0);
        }
      this._numberProps = a, o && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((u) => u.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = re(r) ? r : Object.keys(r || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && i.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of i.map(Xe))
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
    const i = Xe(n);
    this._numberProps && this._numberProps[i] && (r = Ls(r)), this._setProp(i, r, !1);
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
    const r = w(this._def, Ve({}, this._props), n);
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
var xv = { value: () => {
} };
function ii() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Di(n);
}
function Di(e) {
  this._ = e;
}
function Cv(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Di.prototype = ii.prototype = {
  constructor: Di,
  on: function(e, t) {
    var n = this._, r = Cv(e + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (e = r[o]).type) && (i = Sv(n[i], e.name)))
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
    return new Di(e);
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
function Sv(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function uu(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = xv, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Hs = "http://www.w3.org/1999/xhtml";
const cu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Hs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ro(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), cu.hasOwnProperty(t) ? { space: cu[t], local: e } : e;
}
function kv(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Hs && t.documentElement.namespaceURI === Hs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Ev(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Gf(e) {
  var t = Ro(e);
  return (t.local ? Ev : kv)(t);
}
function Lv() {
}
function Bl(e) {
  return e == null ? Lv : function() {
    return this.querySelector(e);
  };
}
function Mv(e) {
  typeof e != "function" && (e = Bl(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = new Array(s), a, u, c = 0; c < s; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), l[c] = u);
  return new dt(r, this._parents);
}
function Tv(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Vv() {
  return [];
}
function Uf(e) {
  return e == null ? Vv : function() {
    return this.querySelectorAll(e);
  };
}
function Iv(e) {
  return function() {
    return Tv(e.apply(this, arguments));
  };
}
function $v(e) {
  typeof e == "function" ? e = Iv(e) : e = Uf(e);
  for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = t[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && (r.push(e.call(a, a.__data__, u, s)), i.push(a));
  return new dt(r, i);
}
function qf(e) {
  return function() {
    return this.matches(e);
  };
}
function Yf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Av = Array.prototype.find;
function Pv(e) {
  return function() {
    return Av.call(this.children, e);
  };
}
function Rv() {
  return this.firstElementChild;
}
function Nv(e) {
  return this.select(e == null ? Rv : Pv(typeof e == "function" ? e : Yf(e)));
}
var Ov = Array.prototype.filter;
function Fv() {
  return Array.from(this.children);
}
function Bv(e) {
  return function() {
    return Ov.call(this.children, e);
  };
}
function Dv(e) {
  return this.selectAll(e == null ? Fv : Bv(typeof e == "function" ? e : Yf(e)));
}
function Hv(e) {
  typeof e != "function" && (e = qf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new dt(r, this._parents);
}
function Kf(e) {
  return new Array(e.length);
}
function zv() {
  return new dt(this._enter || this._groups.map(Kf), this._parents);
}
function ro(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ro.prototype = {
  constructor: ro,
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
function jv(e) {
  return function() {
    return e;
  };
}
function Wv(e, t, n, r, i, o) {
  for (var s = 0, l, a = t.length, u = o.length; s < u; ++s)
    (l = t[s]) ? (l.__data__ = o[s], r[s] = l) : n[s] = new ro(e, o[s]);
  for (; s < a; ++s)
    (l = t[s]) && (i[s] = l);
}
function Gv(e, t, n, r, i, o, s) {
  var l, a, u = /* @__PURE__ */ new Map(), c = t.length, f = o.length, d = new Array(c), h;
  for (l = 0; l < c; ++l)
    (a = t[l]) && (d[l] = h = s.call(a, a.__data__, l, t) + "", u.has(h) ? i[l] = a : u.set(h, a));
  for (l = 0; l < f; ++l)
    h = s.call(e, o[l], l, o) + "", (a = u.get(h)) ? (r[l] = a, a.__data__ = o[l], u.delete(h)) : n[l] = new ro(e, o[l]);
  for (l = 0; l < c; ++l)
    (a = t[l]) && u.get(d[l]) === a && (i[l] = a);
}
function Uv(e) {
  return e.__data__;
}
function qv(e, t) {
  if (!arguments.length)
    return Array.from(this, Uv);
  var n = t ? Gv : Wv, r = this._parents, i = this._groups;
  typeof e != "function" && (e = jv(e));
  for (var o = i.length, s = new Array(o), l = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = r[u], f = i[u], d = f.length, h = Yv(e.call(c, c && c.__data__, u, r)), g = h.length, m = l[u] = new Array(g), p = s[u] = new Array(g), v = a[u] = new Array(d);
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
function Yv(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Kv() {
  return new dt(this._exit || this._groups.map(Kf), this._parents);
}
function Xv(e, t, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Zv(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, o = r.length, s = Math.min(i, o), l = new Array(i), a = 0; a < s; ++a)
    for (var u = n[a], c = r[a], f = u.length, d = l[a] = new Array(f), h, g = 0; g < f; ++g)
      (h = u[g] || c[g]) && (d[g] = h);
  for (; a < i; ++a)
    l[a] = n[a];
  return new dt(l, this._parents);
}
function Jv() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Qv(e) {
  e || (e = e0);
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
function e0(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function t0() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function n0() {
  return Array.from(this);
}
function r0() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function i0() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function o0() {
  return !this.node();
}
function s0(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], o = 0, s = i.length, l; o < s; ++o)
      (l = i[o]) && e.call(l, l.__data__, o, i);
  return this;
}
function l0(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function a0(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function u0(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function c0(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function f0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function d0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function h0(e, t) {
  var n = Ro(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? a0 : l0 : typeof t == "function" ? n.local ? d0 : f0 : n.local ? c0 : u0)(n, t));
}
function Xf(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function g0(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function m0(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function v0(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function p0(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? g0 : typeof t == "function" ? v0 : m0)(e, t, n ?? "")) : hr(this.node(), e);
}
function hr(e, t) {
  return e.style.getPropertyValue(t) || Xf(e).getComputedStyle(e, null).getPropertyValue(t);
}
function y0(e) {
  return function() {
    delete this[e];
  };
}
function w0(e, t) {
  return function() {
    this[e] = t;
  };
}
function b0(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function _0(e, t) {
  return arguments.length > 1 ? this.each((t == null ? y0 : typeof t == "function" ? b0 : w0)(e, t)) : this.node()[e];
}
function Zf(e) {
  return e.trim().split(/^|\s+/);
}
function Dl(e) {
  return e.classList || new Jf(e);
}
function Jf(e) {
  this._node = e, this._names = Zf(e.getAttribute("class") || "");
}
Jf.prototype = {
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
function Qf(e, t) {
  for (var n = Dl(e), r = -1, i = t.length; ++r < i; )
    n.add(t[r]);
}
function ed(e, t) {
  for (var n = Dl(e), r = -1, i = t.length; ++r < i; )
    n.remove(t[r]);
}
function x0(e) {
  return function() {
    Qf(this, e);
  };
}
function C0(e) {
  return function() {
    ed(this, e);
  };
}
function S0(e, t) {
  return function() {
    (t.apply(this, arguments) ? Qf : ed)(this, e);
  };
}
function k0(e, t) {
  var n = Zf(e + "");
  if (arguments.length < 2) {
    for (var r = Dl(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? S0 : t ? x0 : C0)(n, t));
}
function E0() {
  this.textContent = "";
}
function L0(e) {
  return function() {
    this.textContent = e;
  };
}
function M0(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function T0(e) {
  return arguments.length ? this.each(e == null ? E0 : (typeof e == "function" ? M0 : L0)(e)) : this.node().textContent;
}
function V0() {
  this.innerHTML = "";
}
function I0(e) {
  return function() {
    this.innerHTML = e;
  };
}
function $0(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function A0(e) {
  return arguments.length ? this.each(e == null ? V0 : (typeof e == "function" ? $0 : I0)(e)) : this.node().innerHTML;
}
function P0() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function R0() {
  return this.each(P0);
}
function N0() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function O0() {
  return this.each(N0);
}
function F0(e) {
  var t = typeof e == "function" ? e : Gf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function B0() {
  return null;
}
function D0(e, t) {
  var n = typeof e == "function" ? e : Gf(e), r = t == null ? B0 : typeof t == "function" ? t : Bl(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function H0() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function z0() {
  return this.each(H0);
}
function j0() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function W0() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function G0(e) {
  return this.select(e ? W0 : j0);
}
function U0(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function q0(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Y0(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function K0(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, o; n < i; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++r] = o;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function X0(e, t, n) {
  return function() {
    var r = this.__on, i, o = q0(t);
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
function Z0(e, t, n) {
  var r = Y0(e + ""), i, o = r.length, s;
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
  for (l = t ? X0 : K0, i = 0; i < o; ++i)
    this.each(l(r[i], t, n));
  return this;
}
function td(e, t, n) {
  var r = Xf(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function J0(e, t) {
  return function() {
    return td(this, e, t);
  };
}
function Q0(e, t) {
  return function() {
    return td(this, e, t.apply(this, arguments));
  };
}
function ep(e, t) {
  return this.each((typeof t == "function" ? Q0 : J0)(e, t));
}
function* tp() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var nd = [null];
function dt(e, t) {
  this._groups = e, this._parents = t;
}
function oi() {
  return new dt([[document.documentElement]], nd);
}
function np() {
  return this;
}
dt.prototype = oi.prototype = {
  constructor: dt,
  select: Mv,
  selectAll: $v,
  selectChild: Nv,
  selectChildren: Dv,
  filter: Hv,
  data: qv,
  enter: zv,
  exit: Kv,
  join: Xv,
  merge: Zv,
  selection: np,
  order: Jv,
  sort: Qv,
  call: t0,
  nodes: n0,
  node: r0,
  size: i0,
  empty: o0,
  each: s0,
  attr: h0,
  style: p0,
  property: _0,
  classed: k0,
  text: T0,
  html: A0,
  raise: R0,
  lower: O0,
  append: F0,
  insert: D0,
  remove: z0,
  clone: G0,
  datum: U0,
  on: Z0,
  dispatch: ep,
  [Symbol.iterator]: tp
};
function St(e) {
  return typeof e == "string" ? new dt([[document.querySelector(e)]], [document.documentElement]) : new dt([[e]], nd);
}
function rd(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function vt(e, t) {
  if (e = rd(e), t === void 0 && (t = e.currentTarget), t) {
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
function rp(e, t) {
  return e.target && (e = rd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => vt(n, t));
}
const ip = { passive: !1 }, Wr = { capture: !0, passive: !1 };
function ds(e) {
  e.stopImmediatePropagation();
}
function lr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function id(e) {
  var t = e.document.documentElement, n = St(e).on("dragstart.drag", lr, Wr);
  "onselectstart" in t ? n.on("selectstart.drag", lr, Wr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function od(e, t) {
  var n = e.document.documentElement, r = St(e).on("dragstart.drag", null);
  t && (r.on("click.drag", lr, Wr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Si = (e) => () => e;
function zs(e, {
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
zs.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function op(e) {
  return !e.ctrlKey && !e.button;
}
function sp() {
  return this.parentNode;
}
function lp(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function ap() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function up() {
  var e = op, t = sp, n = lp, r = ap, i = {}, o = ii("start", "drag", "end"), s = 0, l, a, u, c, f = 0;
  function d(y) {
    y.on("mousedown.drag", h).filter(r).on("touchstart.drag", p).on("touchmove.drag", v, ip).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(y, C) {
    if (!(c || !e.call(this, y, C))) {
      var T = k(this, t.call(this, y, C), y, C, "mouse");
      T && (St(y.view).on("mousemove.drag", g, Wr).on("mouseup.drag", m, Wr), id(y.view), ds(y), u = !1, l = y.clientX, a = y.clientY, T("start", y));
    }
  }
  function g(y) {
    if (lr(y), !u) {
      var C = y.clientX - l, T = y.clientY - a;
      u = C * C + T * T > f;
    }
    i.mouse("drag", y);
  }
  function m(y) {
    St(y.view).on("mousemove.drag mouseup.drag", null), od(y.view, u), lr(y), i.mouse("end", y);
  }
  function p(y, C) {
    if (e.call(this, y, C)) {
      var T = y.changedTouches, E = t.call(this, y, C), P = T.length, O, F;
      for (O = 0; O < P; ++O)
        (F = k(this, E, y, C, T[O].identifier, T[O])) && (ds(y), F("start", y, T[O]));
    }
  }
  function v(y) {
    var C = y.changedTouches, T = C.length, E, P;
    for (E = 0; E < T; ++E)
      (P = i[C[E].identifier]) && (lr(y), P("drag", y, C[E]));
  }
  function b(y) {
    var C = y.changedTouches, T = C.length, E, P;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), E = 0; E < T; ++E)
      (P = i[C[E].identifier]) && (ds(y), P("end", y, C[E]));
  }
  function k(y, C, T, E, P, O) {
    var F = o.copy(), j = vt(O || T, C), R, N, _;
    if ((_ = n.call(y, new zs("beforestart", {
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
      return R = _.x - j[0] || 0, N = _.y - j[1] || 0, function B(I, H, z) {
        var K = j, X;
        switch (I) {
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
          I,
          y,
          new zs(I, {
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
    return arguments.length ? (e = typeof y == "function" ? y : Si(!!y), d) : e;
  }, d.container = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : Si(y), d) : t;
  }, d.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Si(y), d) : n;
  }, d.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : Si(!!y), d) : r;
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
function sd(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t)
    n[r] = t[r];
  return n;
}
function si() {
}
var Gr = 0.7, io = 1 / Gr, ar = "\\s*([+-]?\\d+)\\s*", Ur = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cp = /^#([0-9a-f]{3,8})$/, fp = new RegExp(`^rgb\\(${ar},${ar},${ar}\\)$`), dp = new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`), hp = new RegExp(`^rgba\\(${ar},${ar},${ar},${Ur}\\)$`), gp = new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${Ur}\\)$`), mp = new RegExp(`^hsl\\(${Ur},${Ft},${Ft}\\)$`), vp = new RegExp(`^hsla\\(${Ur},${Ft},${Ft},${Ur}\\)$`), fu = {
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
Hl(si, qr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: du,
  // Deprecated! Use color.formatHex.
  formatHex: du,
  formatHex8: pp,
  formatHsl: yp,
  formatRgb: hu,
  toString: hu
});
function du() {
  return this.rgb().formatHex();
}
function pp() {
  return this.rgb().formatHex8();
}
function yp() {
  return ld(this).formatHsl();
}
function hu() {
  return this.rgb().formatRgb();
}
function qr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = cp.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? gu(t) : n === 3 ? new et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ki(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ki(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = fp.exec(e)) ? new et(t[1], t[2], t[3], 1) : (t = dp.exec(e)) ? new et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hp.exec(e)) ? ki(t[1], t[2], t[3], t[4]) : (t = gp.exec(e)) ? ki(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = mp.exec(e)) ? pu(t[1], t[2] / 100, t[3] / 100, 1) : (t = vp.exec(e)) ? pu(t[1], t[2] / 100, t[3] / 100, t[4]) : fu.hasOwnProperty(e) ? gu(fu[e]) : e === "transparent" ? new et(NaN, NaN, NaN, 0) : null;
}
function gu(e) {
  return new et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ki(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new et(e, t, n, r);
}
function wp(e) {
  return e instanceof si || (e = qr(e)), e ? (e = e.rgb(), new et(e.r, e.g, e.b, e.opacity)) : new et();
}
function js(e, t, n, r) {
  return arguments.length === 1 ? wp(e) : new et(e, t, n, r ?? 1);
}
function et(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Hl(et, js, sd(si, {
  brighter(e) {
    return e = e == null ? io : Math.pow(io, e), new et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Gr : Math.pow(Gr, e), new et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new et(Bn(this.r), Bn(this.g), Bn(this.b), oo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: mu,
  // Deprecated! Use color.formatHex.
  formatHex: mu,
  formatHex8: bp,
  formatRgb: vu,
  toString: vu
}));
function mu() {
  return `#${Rn(this.r)}${Rn(this.g)}${Rn(this.b)}`;
}
function bp() {
  return `#${Rn(this.r)}${Rn(this.g)}${Rn(this.b)}${Rn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vu() {
  const e = oo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Bn(this.r)}, ${Bn(this.g)}, ${Bn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function oo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Bn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Rn(e) {
  return e = Bn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function pu(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new kt(e, t, n, r);
}
function ld(e) {
  if (e instanceof kt)
    return new kt(e.h, e.s, e.l, e.opacity);
  if (e instanceof si || (e = qr(e)), !e)
    return new kt();
  if (e instanceof kt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), o = Math.max(t, n, r), s = NaN, l = o - i, a = (o + i) / 2;
  return l ? (t === o ? s = (n - r) / l + (n < r) * 6 : n === o ? s = (r - t) / l + 2 : s = (t - n) / l + 4, l /= a < 0.5 ? o + i : 2 - o - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new kt(s, l, a, e.opacity);
}
function _p(e, t, n, r) {
  return arguments.length === 1 ? ld(e) : new kt(e, t, n, r ?? 1);
}
function kt(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Hl(kt, _p, sd(si, {
  brighter(e) {
    return e = e == null ? io : Math.pow(io, e), new kt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Gr : Math.pow(Gr, e), new kt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new et(
      hs(e >= 240 ? e - 240 : e + 120, i, r),
      hs(e, i, r),
      hs(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new kt(yu(this.h), Ei(this.s), Ei(this.l), oo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = oo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${yu(this.h)}, ${Ei(this.s) * 100}%, ${Ei(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function yu(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ei(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function hs(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ad = (e) => () => e;
function xp(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Cp(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function Sp(e) {
  return (e = +e) == 1 ? ud : function(t, n) {
    return n - t ? Cp(t, n, e) : ad(isNaN(t) ? n : t);
  };
}
function ud(e, t) {
  var n = t - e;
  return n ? xp(e, n) : ad(isNaN(e) ? t : e);
}
const wu = function e(t) {
  var n = Sp(t);
  function r(i, o) {
    var s = n((i = js(i)).r, (o = js(o)).r), l = n(i.g, o.g), a = n(i.b, o.b), u = ud(i.opacity, o.opacity);
    return function(c) {
      return i.r = s(c), i.g = l(c), i.b = a(c), i.opacity = u(c), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function hn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Ws = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gs = new RegExp(Ws.source, "g");
function kp(e) {
  return function() {
    return e;
  };
}
function Ep(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Lp(e, t) {
  var n = Ws.lastIndex = gs.lastIndex = 0, r, i, o, s = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (r = Ws.exec(e)) && (i = gs.exec(t)); )
    (o = i.index) > n && (o = t.slice(n, o), l[s] ? l[s] += o : l[++s] = o), (r = r[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: hn(r, i) })), n = gs.lastIndex;
  return n < t.length && (o = t.slice(n), l[s] ? l[s] += o : l[++s] = o), l.length < 2 ? a[0] ? Ep(a[0].x) : kp(t) : (t = a.length, function(u) {
    for (var c = 0, f; c < t; ++c)
      l[(f = a[c]).i] = f.x(u);
    return l.join("");
  });
}
var bu = 180 / Math.PI, Gs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function cd(e, t, n, r, i, o) {
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
var Li;
function Mp(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Gs : cd(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Tp(e) {
  return e == null || (Li || (Li = document.createElementNS("http://www.w3.org/2000/svg", "g")), Li.setAttribute("transform", e), !(e = Li.transform.baseVal.consolidate())) ? Gs : (e = e.matrix, cd(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fd(e, t, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, f, d, h, g) {
    if (u !== f || c !== d) {
      var m = h.push("translate(", null, t, null, n);
      g.push({ i: m - 4, x: hn(u, f) }, { i: m - 2, x: hn(c, d) });
    } else
      (f || d) && h.push("translate(" + f + t + d + n);
  }
  function s(u, c, f, d) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: hn(u, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function l(u, c, f, d) {
    u !== c ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: hn(u, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function a(u, c, f, d, h, g) {
    if (u !== f || c !== d) {
      var m = h.push(i(h) + "scale(", null, ",", null, ")");
      g.push({ i: m - 4, x: hn(u, f) }, { i: m - 2, x: hn(c, d) });
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
var Vp = fd(Mp, "px, ", "px)", "deg)"), Ip = fd(Tp, ", ", ")", ")"), $p = 1e-12;
function _u(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Ap(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Pp(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Rp = function e(t, n, r) {
  function i(o, s) {
    var l = o[0], a = o[1], u = o[2], c = s[0], f = s[1], d = s[2], h = c - l, g = f - a, m = h * h + g * g, p, v;
    if (m < $p)
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
        var P = E * v, O = _u(C), F = u / (n * b) * (O * Pp(t * P + C) - Ap(C));
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
var gr = 0, Vr = 0, Er = 0, dd = 1e3, so, Ir, lo = 0, jn = 0, No = 0, Yr = typeof performance == "object" && performance.now ? performance : Date, hd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zl() {
  return jn || (hd(Np), jn = Yr.now() + No);
}
function Np() {
  jn = 0;
}
function ao() {
  this._call = this._time = this._next = null;
}
ao.prototype = jl.prototype = {
  constructor: ao,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? zl() : +n) + (t == null ? 0 : +t), !this._next && Ir !== this && (Ir ? Ir._next = this : so = this, Ir = this), this._call = e, this._time = n, Us();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Us());
  }
};
function jl(e, t, n) {
  var r = new ao();
  return r.restart(e, t, n), r;
}
function Op() {
  zl(), ++gr;
  for (var e = so, t; e; )
    (t = jn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --gr;
}
function xu() {
  jn = (lo = Yr.now()) + No, gr = Vr = 0;
  try {
    Op();
  } finally {
    gr = 0, Bp(), jn = 0;
  }
}
function Fp() {
  var e = Yr.now(), t = e - lo;
  t > dd && (No -= t, lo = e);
}
function Bp() {
  for (var e, t = so, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : so = n);
  Ir = e, Us(r);
}
function Us(e) {
  if (!gr) {
    Vr && (Vr = clearTimeout(Vr));
    var t = e - jn;
    t > 24 ? (e < 1 / 0 && (Vr = setTimeout(xu, e - Yr.now() - No)), Er && (Er = clearInterval(Er))) : (Er || (lo = Yr.now(), Er = setInterval(Fp, dd)), gr = 1, hd(xu));
  }
}
function Cu(e, t, n) {
  var r = new ao();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var Dp = ii("start", "end", "cancel", "interrupt"), Hp = [], gd = 0, Su = 1, qs = 2, Hi = 3, ku = 4, Ys = 5, zi = 6;
function Oo(e, t, n, r, i, o) {
  var s = e.__transition;
  if (!s)
    e.__transition = {};
  else if (n in s)
    return;
  zp(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Dp,
    tween: Hp,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: gd
  });
}
function Wl(e, t) {
  var n = Tt(e, t);
  if (n.state > gd)
    throw new Error("too late; already scheduled");
  return n;
}
function Dt(e, t) {
  var n = Tt(e, t);
  if (n.state > Hi)
    throw new Error("too late; already running");
  return n;
}
function Tt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function zp(e, t, n) {
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
        if (h.state === Hi)
          return Cu(s);
        h.state === ku ? (h.state = zi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[c]) : +c < t && (h.state = zi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[c]);
      }
    if (Cu(function() {
      n.state === Hi && (n.state = ku, n.timer.restart(l, n.delay, n.time), l(u));
    }), n.state = qs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === qs) {
      for (n.state = Hi, i = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = Ys, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(e, c);
    n.state === Ys && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = zi, n.timer.stop(), delete r[t];
    for (var u in r)
      return;
    delete e.__transition;
  }
}
function ji(e, t) {
  var n = e.__transition, r, i, o = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((r = n[s]).name !== t) {
        o = !1;
        continue;
      }
      i = r.state > qs && r.state < Ys, r.state = zi, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[s];
    }
    o && delete e.__transition;
  }
}
function jp(e) {
  return this.each(function() {
    ji(this, e);
  });
}
function Wp(e, t) {
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
function Gp(e, t, n) {
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
function Up(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = Tt(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Wp : Gp)(n, e, t));
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
function md(e, t) {
  var n;
  return (typeof t == "number" ? hn : t instanceof qr ? wu : (n = qr(t)) ? (t = n, wu) : Lp)(e, t);
}
function qp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Yp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Kp(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function Xp(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function Zp(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function Jp(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function Qp(e, t) {
  var n = Ro(e), r = n === "transform" ? Ip : md;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Jp : Zp)(n, r, Gl(this, "attr." + e, t)) : t == null ? (n.local ? Yp : qp)(n) : (n.local ? Xp : Kp)(n, r, t));
}
function e1(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function t1(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function n1(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && t1(e, o)), n;
  }
  return i._value = t, i;
}
function r1(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && e1(e, o)), n;
  }
  return i._value = t, i;
}
function i1(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var r = Ro(e);
  return this.tween(n, (r.local ? n1 : r1)(r, t));
}
function o1(e, t) {
  return function() {
    Wl(this, e).delay = +t.apply(this, arguments);
  };
}
function s1(e, t) {
  return t = +t, function() {
    Wl(this, e).delay = t;
  };
}
function l1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? o1 : s1)(t, e)) : Tt(this.node(), t).delay;
}
function a1(e, t) {
  return function() {
    Dt(this, e).duration = +t.apply(this, arguments);
  };
}
function u1(e, t) {
  return t = +t, function() {
    Dt(this, e).duration = t;
  };
}
function c1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? a1 : u1)(t, e)) : Tt(this.node(), t).duration;
}
function f1(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Dt(this, e).ease = t;
  };
}
function d1(e) {
  var t = this._id;
  return arguments.length ? this.each(f1(t, e)) : Tt(this.node(), t).ease;
}
function h1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Dt(this, e).ease = n;
  };
}
function g1(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(h1(this._id, e));
}
function m1(e) {
  typeof e != "function" && (e = qf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new Xt(r, this._parents, this._name, this._id);
}
function v1(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), s = new Array(r), l = 0; l < o; ++l)
    for (var a = t[l], u = n[l], c = a.length, f = s[l] = new Array(c), d, h = 0; h < c; ++h)
      (d = a[h] || u[h]) && (f[h] = d);
  for (; l < r; ++l)
    s[l] = t[l];
  return new Xt(s, this._parents, this._name, this._id);
}
function p1(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function y1(e, t, n) {
  var r, i, o = p1(t) ? Wl : Dt;
  return function() {
    var s = o(this, e), l = s.on;
    l !== r && (i = (r = l).copy()).on(t, n), s.on = i;
  };
}
function w1(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Tt(this.node(), n).on.on(e) : this.each(y1(n, e, t));
}
function b1(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function _1() {
  return this.on("end.remove", b1(this._id));
}
function x1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Bl(e));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var l = r[s], a = l.length, u = o[s] = new Array(a), c, f, d = 0; d < a; ++d)
      (c = l[d]) && (f = e.call(c, c.__data__, d, l)) && ("__data__" in c && (f.__data__ = c.__data__), u[d] = f, Oo(u[d], t, n, d, u, Tt(c, n)));
  return new Xt(o, this._parents, t, n);
}
function C1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Uf(e));
  for (var r = this._groups, i = r.length, o = [], s = [], l = 0; l < i; ++l)
    for (var a = r[l], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var d = e.call(c, c.__data__, f, a), h, g = Tt(c, n), m = 0, p = d.length; m < p; ++m)
          (h = d[m]) && Oo(h, t, n, m, d, g);
        o.push(d), s.push(c);
      }
  return new Xt(o, s, t, n);
}
var S1 = oi.prototype.constructor;
function k1() {
  return new S1(this._groups, this._parents);
}
function E1(e, t) {
  var n, r, i;
  return function() {
    var o = hr(this, e), s = (this.style.removeProperty(e), hr(this, e));
    return o === s ? null : o === n && s === r ? i : i = t(n = o, r = s);
  };
}
function vd(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function L1(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = hr(this, e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function M1(e, t, n) {
  var r, i, o;
  return function() {
    var s = hr(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), hr(this, e))), s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l));
  };
}
function T1(e, t) {
  var n, r, i, o = "style." + t, s = "end." + o, l;
  return function() {
    var a = Dt(this, e), u = a.on, c = a.value[o] == null ? l || (l = vd(t)) : void 0;
    (u !== n || i !== c) && (r = (n = u).copy()).on(s, i = c), a.on = r;
  };
}
function V1(e, t, n) {
  var r = (e += "") == "transform" ? Vp : md;
  return t == null ? this.styleTween(e, E1(e, r)).on("end.style." + e, vd(e)) : typeof t == "function" ? this.styleTween(e, M1(e, r, Gl(this, "style." + e, t))).each(T1(this._id, e)) : this.styleTween(e, L1(e, r, t), n).on("end.style." + e, null);
}
function I1(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function $1(e, t, n) {
  var r, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (r = (i = s) && I1(e, s, n)), r;
  }
  return o._value = t, o;
}
function A1(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, $1(e, t, n ?? ""));
}
function P1(e) {
  return function() {
    this.textContent = e;
  };
}
function R1(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function N1(e) {
  return this.tween("text", typeof e == "function" ? R1(Gl(this, "text", e)) : P1(e == null ? "" : e + ""));
}
function O1(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function F1(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && O1(i)), t;
  }
  return r._value = e, r;
}
function B1(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, F1(e));
}
function D1() {
  for (var e = this._name, t = this._id, n = pd(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      if (a = s[u]) {
        var c = Tt(a, t);
        Oo(a, e, n, u, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Xt(r, this._parents, e, n);
}
function H1() {
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
var z1 = 0;
function Xt(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function pd() {
  return ++z1;
}
var jt = oi.prototype;
Xt.prototype = {
  constructor: Xt,
  select: x1,
  selectAll: C1,
  selectChild: jt.selectChild,
  selectChildren: jt.selectChildren,
  filter: m1,
  merge: v1,
  selection: k1,
  transition: D1,
  call: jt.call,
  nodes: jt.nodes,
  node: jt.node,
  size: jt.size,
  empty: jt.empty,
  each: jt.each,
  on: w1,
  attr: Qp,
  attrTween: i1,
  style: V1,
  styleTween: A1,
  text: N1,
  textTween: B1,
  remove: _1,
  tween: Up,
  delay: l1,
  duration: c1,
  ease: d1,
  easeVarying: g1,
  end: H1,
  [Symbol.iterator]: jt[Symbol.iterator]
};
function j1(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var W1 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: j1
};
function G1(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function U1(e) {
  var t, n;
  e instanceof Xt ? (t = e._id, e = e._name) : (t = pd(), (n = W1).time = zl(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && Oo(a, e, t, u, s, n || G1(a, t));
  return new Xt(r, this._parents, e, t);
}
oi.prototype.interrupt = jp;
oi.prototype.transition = U1;
const Ks = Math.PI, Xs = 2 * Ks, Vn = 1e-6, q1 = Xs - Vn;
function yd(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Y1(e) {
  let t = Math.floor(e);
  if (!(t >= 0))
    throw new Error(`invalid digits: ${e}`);
  if (t > 15)
    return yd;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class K1 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? yd : Y1(t);
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
    else if (d > Vn)
      if (!(Math.abs(f * a - u * c) > Vn) || !o)
        this._append`L${this._x1 = t},${this._y1 = n}`;
      else {
        let h = r - s, g = i - l, m = a * a + u * u, p = h * h + g * g, v = Math.sqrt(m), b = Math.sqrt(d), k = o * Math.tan((Ks - Math.acos((m + d - p) / (2 * v * b))) / 2), y = k / b, C = k / v;
        Math.abs(y - 1) > Vn && this._append`L${t + y * c},${n + y * f}`, this._append`A${o},${o},0,0,${+(f * h > c * g)},${this._x1 = t + C * a},${this._y1 = n + C * u}`;
      }
  }
  arc(t, n, r, i, o, s) {
    if (t = +t, n = +n, r = +r, s = !!s, r < 0)
      throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), u = t + l, c = n + a, f = 1 ^ s, d = s ? i - o : o - i;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > Vn || Math.abs(this._y1 - c) > Vn) && this._append`L${u},${c}`, r && (d < 0 && (d = d % Xs + Xs), d > q1 ? this._append`A${r},${r},0,1,${f},${t - l},${n - a}A${r},${r},0,1,${f},${this._x1 = u},${this._y1 = c}` : d > Vn && this._append`A${r},${r},0,${+(d >= Ks)},${f},${this._x1 = t + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(t, n, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function X1(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return wd(this.cover(t, n), t, n, e);
}
function wd(e, t, n, r) {
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
function Z1(e) {
  var t, n, r = e.length, i, o, s = new Array(r), l = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (s[n] = i, l[n] = o, i < a && (a = i), i > c && (c = i), o < u && (u = o), o > f && (f = o));
  if (a > c || u > f)
    return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < r; ++n)
    wd(this, s[n], l[n], e[n]);
  return this;
}
function J1(e, t) {
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
function Q1() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length)
      do
        e.push(t.data);
      while (t = t.next);
  }), e;
}
function ey(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ge(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function ty(e, t, n) {
  var r, i = this._x0, o = this._y0, s, l, a, u, c = this._x1, f = this._y1, d = [], h = this._root, g, m;
  for (h && d.push(new Ge(h, i, o, c, f)), n == null ? n = 1 / 0 : (i = e - n, o = t - n, c = e + n, f = t + n, n *= n); g = d.pop(); )
    if (!(!(h = g.node) || (s = g.x0) > c || (l = g.y0) > f || (a = g.x1) < i || (u = g.y1) < o))
      if (h.length) {
        var p = (s + a) / 2, v = (l + u) / 2;
        d.push(
          new Ge(h[3], p, v, a, u),
          new Ge(h[2], s, v, p, u),
          new Ge(h[1], p, l, a, v),
          new Ge(h[0], s, l, p, v)
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
function ny(e) {
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
function ry(e) {
  for (var t = 0, n = e.length; t < n; ++t)
    this.remove(e[t]);
  return this;
}
function iy() {
  return this._root;
}
function oy() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length)
      do
        ++e;
      while (t = t.next);
  }), e;
}
function sy(e) {
  var t = [], n, r = this._root, i, o, s, l, a;
  for (r && t.push(new Ge(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, o = n.x0, s = n.y0, l = n.x1, a = n.y1) && r.length) {
      var u = (o + l) / 2, c = (s + a) / 2;
      (i = r[3]) && t.push(new Ge(i, u, c, l, a)), (i = r[2]) && t.push(new Ge(i, o, c, u, a)), (i = r[1]) && t.push(new Ge(i, u, s, l, c)), (i = r[0]) && t.push(new Ge(i, o, s, u, c));
    }
  return this;
}
function ly(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Ge(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, l = r.y0, a = r.x1, u = r.y1, c = (s + a) / 2, f = (l + u) / 2;
      (o = i[0]) && t.push(new Ge(o, s, l, c, f)), (o = i[1]) && t.push(new Ge(o, c, l, a, f)), (o = i[2]) && t.push(new Ge(o, s, f, c, u)), (o = i[3]) && t.push(new Ge(o, c, f, a, u));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function ay(e) {
  return e[0];
}
function uy(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function cy(e) {
  return e[1];
}
function fy(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ul(e, t, n) {
  var r = new ql(t ?? ay, n ?? cy, NaN, NaN, NaN, NaN);
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
var Ze = Ul.prototype = ql.prototype;
Ze.copy = function() {
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
Ze.add = X1;
Ze.addAll = Z1;
Ze.cover = J1;
Ze.data = Q1;
Ze.extent = ey;
Ze.find = ty;
Ze.remove = ny;
Ze.removeAll = ry;
Ze.root = iy;
Ze.size = oy;
Ze.visit = sy;
Ze.visitAfter = ly;
Ze.x = uy;
Ze.y = fy;
function qe(e) {
  return function() {
    return e;
  };
}
function gn(e) {
  return (e() - 0.5) * 1e-6;
}
function dy(e) {
  return e.x + e.vx;
}
function hy(e) {
  return e.y + e.vy;
}
function gy(e) {
  var t, n, r, i = 1, o = 1;
  typeof e != "function" && (e = qe(e == null ? 1 : +e));
  function s() {
    for (var u, c = t.length, f, d, h, g, m, p, v = 0; v < o; ++v)
      for (f = Ul(t, dy, hy).visitAfter(l), u = 0; u < c; ++u)
        d = t[u], m = n[d.index], p = m * m, h = d.x + d.vx, g = d.y + d.vy, f.visit(b);
    function b(k, y, C, T, E) {
      var P = k.data, O = k.r, F = m + O;
      if (P) {
        if (P.index > d.index) {
          var j = h - P.x - P.vx, R = g - P.y - P.vy, N = j * j + R * R;
          N < F * F && (j === 0 && (j = gn(r), N += j * j), R === 0 && (R = gn(r), N += R * R), N = (F - (N = Math.sqrt(N))) / N * i, d.vx += (j *= N) * (F = (O *= O) / (p + O)), d.vy += (R *= N) * F, P.vx -= j * (F = 1 - F), P.vy -= R * F);
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
    return arguments.length ? (e = typeof u == "function" ? u : qe(+u), a(), s) : e;
  }, s;
}
function my(e) {
  return e.index;
}
function Lu(e, t) {
  var n = e.get(t);
  if (!n)
    throw new Error("node not found: " + t);
  return n;
}
function vy(e) {
  var t = my, n = f, r, i = qe(30), o, s, l, a, u, c = 1;
  e == null && (e = []);
  function f(p) {
    return 1 / Math.min(l[p.source.index], l[p.target.index]);
  }
  function d(p) {
    for (var v = 0, b = e.length; v < c; ++v)
      for (var k = 0, y, C, T, E, P, O, F; k < b; ++k)
        y = e[k], C = y.source, T = y.target, E = T.x + T.vx - C.x - C.vx || gn(u), P = T.y + T.vy - C.y - C.vy || gn(u), O = Math.sqrt(E * E + P * P), O = (O - o[k]) / O * p * r[k], E *= O, P *= O, T.vx -= E * (F = a[k]), T.vy -= P * F, C.vx += E * (F = 1 - F), C.vy += P * F;
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
    return arguments.length ? (n = typeof p == "function" ? p : qe(+p), g(), d) : n;
  }, d.distance = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : qe(+p), m(), d) : i;
  }, d;
}
const py = 1664525, yy = 1013904223, Mu = 4294967296;
function wy() {
  let e = 1;
  return () => (e = (py * e + yy) % Mu) / Mu;
}
function by(e) {
  return e.x;
}
function _y(e) {
  return e.y;
}
var xy = 10, Cy = Math.PI * (3 - Math.sqrt(5));
function Sy(e) {
  var t, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, l = /* @__PURE__ */ new Map(), a = jl(f), u = ii("tick", "end"), c = wy();
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
        var b = xy * Math.sqrt(0.5 + m), k = m * Cy;
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
function ky() {
  var e, t, n, r, i = qe(-30), o, s = 1, l = 1 / 0, a = 0.81;
  function u(h) {
    var g, m = e.length, p = Ul(e, by, _y).visitAfter(f);
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
      return y < l && (v === 0 && (v = gn(n), y += v * v), b === 0 && (b = gn(n), y += b * b), y < s && (y = Math.sqrt(s * y)), t.vx += v * h.value * r / y, t.vy += b * h.value * r / y), !0;
    if (h.length || y >= l)
      return;
    (h.data !== t || h.next) && (v === 0 && (v = gn(n), y += v * v), b === 0 && (b = gn(n), y += b * b), y < s && (y = Math.sqrt(s * y)));
    do
      h.data !== t && (k = o[h.data.index] * r / y, t.vx += v * k, t.vy += b * k);
    while (h = h.next);
  }
  return u.initialize = function(h, g) {
    e = h, n = g, c();
  }, u.strength = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : qe(+h), c(), u) : i;
  }, u.distanceMin = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.distanceMax = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function Ey(e) {
  var t = qe(0.1), n, r, i;
  typeof e != "function" && (e = qe(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof l == "function" ? l : qe(+l), s(), o) : t;
  }, o.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : qe(+l), s(), o) : e;
  }, o;
}
function Ly(e) {
  var t = qe(0.1), n, r, i;
  typeof e != "function" && (e = qe(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof l == "function" ? l : qe(+l), s(), o) : t;
  }, o.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : qe(+l), s(), o) : e;
  }, o;
}
function Zn(e) {
  return function() {
    return e;
  };
}
function My(e) {
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
  }, () => new K1(t);
}
function Ty(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function bd(e) {
  this._context = e;
}
bd.prototype = {
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
function Vy(e) {
  return new bd(e);
}
function Iy(e) {
  return e[0];
}
function $y(e) {
  return e[1];
}
function Ay(e, t) {
  var n = Zn(!0), r = null, i = Vy, o = null, s = My(l);
  e = typeof e == "function" ? e : e === void 0 ? Iy : Zn(e), t = typeof t == "function" ? t : t === void 0 ? $y : Zn(t);
  function l(a) {
    var u, c = (a = Ty(a)).length, f, d = !1, h;
    for (r == null && (o = i(h = s())), u = 0; u <= c; ++u)
      !(u < c && n(f = a[u], u, a)) === d && ((d = !d) ? o.lineStart() : o.lineEnd()), d && o.point(+e(f, u, a), +t(f, u, a));
    if (h)
      return o = null, h + "" || null;
  }
  return l.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Zn(+a), l) : e;
  }, l.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Zn(+a), l) : t;
  }, l.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Zn(!!a), l) : n;
  }, l.curve = function(a) {
    return arguments.length ? (i = a, r != null && (o = i(r)), l) : i;
  }, l.context = function(a) {
    return arguments.length ? (a == null ? r = o = null : o = i(r = a), l) : r;
  }, l;
}
const Mi = (e) => () => e;
function Py(e, {
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
var _d = new Gt(1, 0, 0);
Gt.prototype;
function ms(e) {
  e.stopImmediatePropagation();
}
function Lr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ry(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ny() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Tu() {
  return this.__zoom || _d;
}
function Oy(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Fy() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function By(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Dy() {
  var e = Ry, t = Ny, n = By, r = Oy, i = Fy, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Rp, u = ii("start", "zoom", "end"), c, f, d, h = 500, g = 150, m = 0, p = 10;
  function v(_) {
    _.property("__zoom", Tu).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", F).filter(i).on("touchstart.zoom", j).on("touchmove.zoom", R).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(_, B, I, H) {
    var z = _.selection ? _.selection() : _;
    z.property("__zoom", Tu), _ !== z ? C(_, B, I, H) : z.interrupt().each(function() {
      T(this, arguments).event(H).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, v.scaleBy = function(_, B, I, H) {
    v.scaleTo(_, function() {
      var z = this.__zoom.k, K = typeof B == "function" ? B.apply(this, arguments) : B;
      return z * K;
    }, I, H);
  }, v.scaleTo = function(_, B, I, H) {
    v.transform(_, function() {
      var z = t.apply(this, arguments), K = this.__zoom, X = I == null ? y(z) : typeof I == "function" ? I.apply(this, arguments) : I, q = K.invert(X), J = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(k(b(K, J), X, q), z, s);
    }, I, H);
  }, v.translateBy = function(_, B, I, H) {
    v.transform(_, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), s);
    }, null, H);
  }, v.translateTo = function(_, B, I, H, z) {
    v.transform(_, function() {
      var K = t.apply(this, arguments), X = this.__zoom, q = H == null ? y(K) : typeof H == "function" ? H.apply(this, arguments) : H;
      return n(_d.translate(q[0], q[1]).scale(X.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), K, s);
    }, H, z);
  };
  function b(_, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === _.k ? _ : new Gt(B, _.x, _.y);
  }
  function k(_, B, I) {
    var H = B[0] - I[0] * _.k, z = B[1] - I[1] * _.k;
    return H === _.x && z === _.y ? _ : new Gt(_.k, H, z);
  }
  function y(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function C(_, B, I, H) {
    _.on("start.zoom", function() {
      T(this, arguments).event(H).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(H).end();
    }).tween("zoom", function() {
      var z = this, K = arguments, X = T(z, K).event(H), q = t.apply(z, K), J = I == null ? y(q) : typeof I == "function" ? I.apply(z, K) : I, te = Math.max(q[1][0] - q[0][0], q[1][1] - q[0][1]), ue = z.__zoom, xe = typeof B == "function" ? B.apply(z, K) : B, he = a(ue.invert(J).concat(te / ue.k), xe.invert(J).concat(te / xe.k));
      return function(Ce) {
        if (Ce === 1)
          Ce = xe;
        else {
          var Ne = he(Ce), wt = te / Ne[2];
          Ce = new Gt(wt, J[0] - Ne[0] * wt, J[1] - Ne[1] * wt);
        }
        X.zoom(null, Ce);
      };
    });
  }
  function T(_, B, I) {
    return !I && _.__zooming || new E(_, B);
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
        new Py(_, {
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
    var I = T(this, B).event(_), H = this.__zoom, z = Math.max(o[0], Math.min(o[1], H.k * Math.pow(2, r.apply(this, arguments)))), K = vt(_);
    if (I.wheel)
      (I.mouse[0][0] !== K[0] || I.mouse[0][1] !== K[1]) && (I.mouse[1] = H.invert(I.mouse[0] = K)), clearTimeout(I.wheel);
    else {
      if (H.k === z)
        return;
      I.mouse = [K, H.invert(K)], ji(this), I.start();
    }
    Lr(_), I.wheel = setTimeout(X, g), I.zoom("mouse", n(k(b(H, z), I.mouse[0], I.mouse[1]), I.extent, s));
    function X() {
      I.wheel = null, I.end();
    }
  }
  function O(_, ...B) {
    if (d || !e.apply(this, arguments))
      return;
    var I = _.currentTarget, H = T(this, B, !0).event(_), z = St(_.view).on("mousemove.zoom", J, !0).on("mouseup.zoom", te, !0), K = vt(_, I), X = _.clientX, q = _.clientY;
    id(_.view), ms(_), H.mouse = [K, this.__zoom.invert(K)], ji(this), H.start();
    function J(ue) {
      if (Lr(ue), !H.moved) {
        var xe = ue.clientX - X, he = ue.clientY - q;
        H.moved = xe * xe + he * he > m;
      }
      H.event(ue).zoom("mouse", n(k(H.that.__zoom, H.mouse[0] = vt(ue, I), H.mouse[1]), H.extent, s));
    }
    function te(ue) {
      z.on("mousemove.zoom mouseup.zoom", null), od(ue.view, H.moved), Lr(ue), H.event(ue).end();
    }
  }
  function F(_, ...B) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, H = vt(_.changedTouches ? _.changedTouches[0] : _, this), z = I.invert(H), K = I.k * (_.shiftKey ? 0.5 : 2), X = n(k(b(I, K), H, z), t.apply(this, B), s);
      Lr(_), l > 0 ? St(this).transition().duration(l).call(C, X, H, _) : St(this).call(v.transform, X, H, _);
    }
  }
  function j(_, ...B) {
    if (e.apply(this, arguments)) {
      var I = _.touches, H = I.length, z = T(this, B, _.changedTouches.length === H).event(_), K, X, q, J;
      for (ms(_), X = 0; X < H; ++X)
        q = I[X], J = vt(q, this), J = [J, this.__zoom.invert(J), q.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== J[2] && (z.touch1 = J, z.taps = 0) : (z.touch0 = J, K = !0, z.taps = 1 + !!c);
      c && (c = clearTimeout(c)), K && (z.taps < 2 && (f = J[0], c = setTimeout(function() {
        c = null;
      }, h)), ji(this), z.start());
    }
  }
  function R(_, ...B) {
    if (this.__zooming) {
      var I = T(this, B).event(_), H = _.changedTouches, z = H.length, K, X, q, J;
      for (Lr(_), K = 0; K < z; ++K)
        X = H[K], q = vt(X, this), I.touch0 && I.touch0[2] === X.identifier ? I.touch0[0] = q : I.touch1 && I.touch1[2] === X.identifier && (I.touch1[0] = q);
      if (X = I.that.__zoom, I.touch1) {
        var te = I.touch0[0], ue = I.touch0[1], xe = I.touch1[0], he = I.touch1[1], Ce = (Ce = xe[0] - te[0]) * Ce + (Ce = xe[1] - te[1]) * Ce, Ne = (Ne = he[0] - ue[0]) * Ne + (Ne = he[1] - ue[1]) * Ne;
        X = b(X, Math.sqrt(Ce / Ne)), q = [(te[0] + xe[0]) / 2, (te[1] + xe[1]) / 2], J = [(ue[0] + he[0]) / 2, (ue[1] + he[1]) / 2];
      } else if (I.touch0)
        q = I.touch0[0], J = I.touch0[1];
      else
        return;
      I.zoom("touch", n(k(X, q, J), I.extent, s));
    }
  }
  function N(_, ...B) {
    if (this.__zooming) {
      var I = T(this, B).event(_), H = _.changedTouches, z = H.length, K, X;
      for (ms(_), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), K = 0; K < z; ++K)
        X = H[K], I.touch0 && I.touch0[2] === X.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === X.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0)
        I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (X = vt(X, this), Math.hypot(f[0] - X[0], f[1] - X[1]) < p)) {
        var q = St(this).on("dblclick.zoom");
        q && q.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : Mi(+_), v) : r;
  }, v.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Mi(!!_), v) : e;
  }, v.touchable = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : Mi(!!_), v) : i;
  }, v.extent = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Mi([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), v) : t;
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
class xd {
  // eslint-disable-next-line no-useless-constructor
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x
   * @param y
   * @param fx
   * @param fy
   * @param label
   * @param color
   */
  constructor(t, n, r, i, o, s, l, a) {
    this.id = t, this.idImported = n, this.x = r, this.y = i, this.fx = o, this.fy = s, this.label = l, this.color = a;
  }
}
var st = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(st || {});
class Hy {
  // eslint-disable-next-line no-useless-constructor
  constructor(t, n, r, i, o) {
    ot(this, "id");
    this.source = t, this.target = n, this.pathType = r, this.label = i, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class Vu {
  constructor() {
    ot(this, "nodeIdCounter", 0);
    ot(this, "nodes", []);
    ot(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, r, i, o) {
    const s = new xd(
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
  createLink(t, n, r) {
    if (this.links.find(
      (a) => a.source.id === t && a.target.id === n
    ) !== void 0)
      return;
    const o = this.nodes.find((a) => a.id === t);
    if (o === void 0)
      return;
    const s = this.nodes.find((a) => a.id === n);
    if (s === void 0)
      return;
    const l = new Hy(o, s, void 0, r);
    return this.links.push(l), l;
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
  linkColorExists(t) {
    console.log("in link color exitst");
    for (const n of this.links)
      if (console.log("in for"), n.color === t)
        return console.log("color same"), !0;
    return !1;
  }
  /** Formats the Graph in Trivial Graph Format.
   * @param includeNodeLabels include node labels
   * @param includeLinkLabels include link labels
   * @param includeNodeColor TGF normally has no color option, this ist just used for internal purposes
   */
  toTGF(t = !0, n = !0, r = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "Graph is empty";
    let i, o;
    return i = this.nodes.map((s) => {
      let l = `${s.id}`;
      return t && s.label !== void 0 && (l += ` ${s.label}`), r && s.color !== void 0 && (l += ` /COLOR:/${s.color}`), l;
    }).join(`
`), n ? o = this.links.map(
      (s) => `${s.source.id} ${s.target.id} ${s.label !== void 0 ? `${s.label}` : ""}`
    ).join(`
`) : o = this.links.map((s) => `${s.source.id} ${s.target.id}`).join(`
`), `${i}${o ? `
#
` : ""}${o}`;
  }
}
function zy(e) {
  return Dy().scaleExtent([0.5, 5]).filter((t) => {
    var n;
    return t.button === 0 || ((n = t.touches) == null ? void 0 : n.length) >= 2;
  }).on("zoom", (t) => e(t));
}
function An(e) {
  e.preventDefault(), e.stopPropagation();
}
function jy(e, t, n, r) {
  return up().filter((i) => i.button === 2).on("start", (i, o) => {
    An(i.sourceEvent), i.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (i, o) => {
    o.fx = Math.max(r, Math.min(t - r, i.x)), o.fy = Math.max(r, Math.min(n - r, i.y));
  }).on("end", (i, o) => {
    i.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function Wy(e, t, n, r, i) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (s) => n(s)).on("pointerup", (s) => r(s)).on("contextmenu", (s) => An(s)).on("dblclick", (s) => i(s)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function Gy(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function Uy(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function qy(e, t) {
  Or(e, t, "link-arrow", "arrow", !1), Or(e, t, "link-arrow-reverse", "arrow", !0), Or(e, t, "draggable-link-arrow", "arrow draggable", !1);
}
function Yy(e, t, n) {
  e.select("#link-arrow-" + n).empty() && (Or(e, t, "link-arrow-" + n, "arrow " + n, !1, n), Or(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow " + n,
    !0,
    n
  ));
}
function Ky(e, t) {
  e.select("#link-arrow-" + t).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + t).select(function() {
    return this.parentNode;
  }).remove();
}
function Or(e, t, n, r, i, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${Ay()(t.arrowPoints)}`).style("fill", o || "");
}
function Xy(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function Zy(e, t, n, r, i) {
  let o = Sy(e.nodes).on("tick", () => i()).force(
    "collision",
    gy().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Jy(e, o, n, r, t), o = Sd(o, e, t, t.fixedLinkDistanceEnabled), o = Cd(o, t.nodePhysicsEnabled, n, r), o;
}
function Jy(e, t, n, r, i) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, o.x)), o.y = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, o.y));
  });
}
function Cd(e, t, n, r) {
  return t ? e.force("charge", ky().strength(-500)).force("x", Ey(n / 2).strength(0.05)).force("y", Ly(r / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function Sd(e, t, n, r) {
  return r ? e.force(
    "link",
    vy().links(t.links).id((i) => i.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
const Qy = !0, Iu = 24, ew = !0, tw = !1, nw = !0, rw = !1, ln = 4, iw = {
  hasToolbar: Qy,
  nodeRadius: Iu,
  showNodeLabels: ew,
  nodePhysicsEnabled: tw,
  showLinkLabels: nw,
  fixedLinkDistanceEnabled: rw,
  markerBoxSize: ln,
  markerPadding: Iu + 2 * ln,
  markerRef: ln / 2,
  arrowPoints: [
    [0, 0],
    [0, ln],
    [ln, ln / 2]
  ],
  markerPath: [0, 0, ln, ln].join(",")
}, ow = Object.prototype.toString;
function uo(e) {
  const t = ow.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function sw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!uo(e))
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
function lw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!uo(e))
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
function $u(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (uo(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else
    throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!uo(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var r = lw(e), i = sw(e);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, s = o === void 0 ? t.autoMinMax ? r : 0 : o, l = t.max, a = l === void 0 ? t.autoMinMax ? i : 1 : l;
  if (s >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - s) / (i - r), c = 0; c < e.length; c++)
    n[c] = (e[c] - r) * u + s;
  return n;
}
const Ti = " ".repeat(2), kd = " ".repeat(4);
function aw() {
  return Ed(this);
}
function Ed(e, t = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = t;
  return `${e.constructor.name} {
${Ti}[
${kd}${uw(e, n, r, i)}
${Ti}]
${Ti}rows: ${e.rows}
${Ti}columns: ${e.columns}
}`;
}
function uw(e, t, n, r) {
  const { rows: i, columns: o } = e, s = Math.min(i, t), l = Math.min(o, n), a = [];
  for (let u = 0; u < s; u++) {
    let c = [];
    for (let f = 0; f < l; f++)
      c.push(cw(e.get(u, f), r));
    a.push(`${c.join(" ")}`);
  }
  return l !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), s !== i && a.push(`... ${i - t} more rows`), a.join(`
${kd}`);
}
function cw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const r = e.toPrecision(t - 2);
  if (r.length <= t)
    return r;
  const i = e.toExponential(t - 2), o = i.indexOf("e"), s = i.slice(o);
  return i.slice(0, t - s.length) + s;
}
function fw(e, t) {
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
function tr(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function nr(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function dw(e, t, n) {
  return {
    row: hw(e, t),
    column: gw(e, n)
  };
}
function hw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((r) => r < 0 || r >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function gw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((r) => r < 0 || r >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Au(e, t, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Vi("startRow", t), Vi("endRow", n), Vi("startColumn", r), Vi("endColumn", i), t > n || r > i || t < 0 || t >= e.rows || n < 0 || n >= e.rows || r < 0 || r >= e.columns || i < 0 || i >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Fo(e, t = 0) {
  let n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
function Vi(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Jn(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function mw(e) {
  let t = Fo(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] += e.get(n, r);
  return t;
}
function vw(e) {
  let t = Fo(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] += e.get(n, r);
  return t;
}
function pw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t += e.get(n, r);
  return t;
}
function yw(e) {
  let t = Fo(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] *= e.get(n, r);
  return t;
}
function ww(e) {
  let t = Fo(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] *= e.get(n, r);
  return t;
}
function bw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t *= e.get(n, r);
  return t;
}
function _w(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < r; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(s, c) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / i) / (i - 1)) : o.push((a - l * l / i) / i);
  }
  return o;
}
function xw(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < i; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(c, s) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / r) / (r - 1)) : o.push((a - l * l / r) / r);
  }
  return o;
}
function Cw(e, t, n) {
  const r = e.rows, i = e.columns, o = r * i;
  let s = 0, l = 0, a = 0;
  for (let u = 0; u < r; u++)
    for (let c = 0; c < i; c++)
      a = e.get(u, c) - n, s += a, l += a * a;
  return t ? (l - s * s / o) / (o - 1) : (l - s * s / o) / o;
}
function Sw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[n]);
}
function kw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[r]);
}
function Ew(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t);
}
function Lw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let r = 0;
    for (let i = 0; i < e.columns; i++)
      r += Math.pow(e.get(n, i), 2) / (e.columns - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function Mw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[n]);
}
function Tw(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let r = 0;
    for (let i = 0; i < e.rows; i++)
      r += Math.pow(e.get(i, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function Vw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[r]);
}
function Iw(e) {
  const t = e.size - 1;
  let n = 0;
  for (let r = 0; r < e.columns; r++)
    for (let i = 0; i < e.rows; i++)
      n += Math.pow(e.get(i, r), 2) / t;
  return Math.sqrt(n);
}
function $w(e, t) {
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
    _t(this, t), n = tr(this, n);
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
    xt(this, t), n = nr(this, n);
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
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[r]);
    return this;
  }
  subRowVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[r]);
    return this;
  }
  mulRowVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[r]);
    return this;
  }
  divRowVector(t) {
    t = tr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[r]);
    return this;
  }
  addColumnVector(t) {
    t = nr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = nr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = nr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = nr(this, t);
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
    Jn(this);
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
    Jn(this);
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
    _t(this, t), Jn(this);
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
    _t(this, t), Jn(this);
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
    xt(this, t), Jn(this);
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
    xt(this, t), Jn(this);
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
    const r = this.get(0, 0), i = this.get(0, 1), o = this.get(0, 2), s = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), d = t.get(0, 0), h = t.get(0, 1), g = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), v = t.get(1, 2), b = t.get(2, 0), k = t.get(2, 1), y = t.get(2, 2), C = (r + i + o - s - l - c - f) * p, T = (r - s) * (-h + p), E = l * (-d + h + m - p - v - b + y), P = (-r + s + l) * (d - h + p), O = (s + l) * (-d + h), F = r * d, j = (-r + u + c) * (d - g + v), R = (-r + u) * (g - v), N = (u + c) * (-d + g), _ = (r + i + o - l - a - u - c) * v, B = c * (-d + g + m - p - v - b + k), I = (-o + c + f) * (p + b - k), H = (o - f) * (p - k), z = o * b, K = (c + f) * (-b + k), X = (-o + l + a) * (v + b - y), q = (o - a) * (v - y), J = (l + a) * (-b + y), te = i * m, ue = a * k, xe = s * g, he = u * h, Ce = f * y, Ne = F + z + te, wt = C + P + O + F + I + z + K, It = F + j + N + _ + z + X + J, nn = T + E + P + F + z + X + q, rn = T + P + O + F + ue, x = z + X + q + J + xe, L = F + j + R + B + I + H + z, D = I + H + z + K + he, W = F + j + R + N + Ce;
    return n.set(0, 0, Ne), n.set(0, 1, wt), n.set(0, 2, It), n.set(1, 0, nn), n.set(1, 1, rn), n.set(1, 2, x), n.set(2, 0, L), n.set(2, 1, D), n.set(2, 2, W), n;
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
      ), I = ge.add(O, R);
      I.sub(N), I.add(B);
      let H = ge.add(j, N), z = ge.add(F, R), K = ge.sub(O, F);
      K.add(j), K.add(_);
      let X = ge.zeros(2 * I.rows, 2 * I.columns);
      return X = X.setSubMatrix(I, 0, 0), X = X.setSubMatrix(H, I.rows, 0), X = X.setSubMatrix(z, 0, I.columns), X = X.setSubMatrix(K, I.rows, I.columns), X.subMatrix(0, h - 1, 0, g - 1);
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
      s.length > 0 && $u(s, { min: n, max: r, output: s }), i.setRow(o, s);
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
      s.length && $u(s, {
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
  sortRows(t = Pu) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = Pu) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, r, i) {
    Au(this, t, n, r, i);
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
    Au(this, n, i, r, o);
    for (let s = 0; s < t.rows; s++)
      for (let l = 0; l < t.columns; l++)
        this.set(n + s, r + l, t.get(s, l));
    return this;
  }
  selection(t, n) {
    let r = dw(this, t, n), i = new oe(t.length, n.length);
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
        return mw(this);
      case "column":
        return vw(this);
      case void 0:
        return pw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return yw(this);
      case "column":
        return ww(this);
      case void 0:
        return bw(this);
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
        return _w(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return xw(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Cw(this, r, i);
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
        return Sw(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return kw(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return Ew(this, r), this;
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
          r = Lw(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Mw(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Tw(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Vw(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Iw(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return $w(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return Ed(this, t);
  }
}
ge.prototype.klass = "Matrix";
typeof Symbol < "u" && (ge.prototype[Symbol.for("nodejs.util.inspect.custom")] = aw);
function Pu(e, t) {
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
    return n === void 0 && (n = t, t = this.rows), _t(this, t, !0), n = Float64Array.from(tr(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
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
    typeof n > "u" && (n = t, t = this.columns), xt(this, t, !0), n = nr(this, n);
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
fw(ge, oe);
function vs(e, t, n) {
  const r = t.x - e.x, i = t.y - e.y, o = Math.sqrt(r * r + i * i), s = r / o, l = i / o, a = e.x + (n.nodeRadius - 1) * s, u = e.y + (n.nodeRadius - 1) * l, c = t.x - n.markerPadding * s, f = t.y - n.markerPadding * l;
  return `M${a},${u}
          L${c},${f}`;
}
function ps(e, t, n) {
  const r = new oe([[e.x, e.y]]), i = new oe([[t.x, t.y]]), o = oe.subtract(i, r), s = o.norm("frobenius"), l = o.divide(s), a = Ld(10), u = ur(l, -a).multiply(n.nodeRadius - 1).add(r), c = oe.multiply(l, -1), f = ur(c, a).multiply(n.nodeRadius).add(i).add(ur(c, a).multiply(2 * n.markerBoxSize)), d = 1.2 * s;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${d},${d},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Ru(e, t, n) {
  const r = new oe([[e.x, e.y]]), i = new oe([t]);
  r.get(0, 0) === i.get(0, 0) && r.get(0, 1) === i.get(0, 1) && i.add([[0, 1]]);
  const o = oe.subtract(r, i), s = o.divide(o.norm("frobenius")), l = Ld(40), a = ur(s, l).multiply(n.nodeRadius - 1).add(r), u = ur(s, -l).multiply(n.nodeRadius).add(r).add(ur(s, -l).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function Nu(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Ld(e) {
  return e * (Math.PI / 180);
}
function ur(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new oe([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
function Aw(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, i = n !== -1 ? t.slice(n + 1) : [], o = [];
  if (r.length)
    for (const l of r) {
      const [, a, u, c] = l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || [];
      a && o.push({
        idImported: a.trim(),
        label: u == null ? void 0 : u.trim(),
        color: c == null ? void 0 : c.trim()
      });
    }
  const s = [];
  if (i.length)
    for (const l of i) {
      const [, a, u, c] = l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || [];
      a && u && s.push({
        sourceIdImported: a.trim(),
        targetIdImported: u.trim(),
        label: c == null ? void 0 : c.trim()
      });
    }
  return [o, s];
}
function Pw(e) {
  const t = [];
  for (let r of e.nodes)
    t.push({ idImported: r.id, label: r.label, color: r.color });
  const n = [];
  for (let r of e.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label
    });
  return [t, n];
}
var Rw = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Nw(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Md = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Rw, function() {
    function n(s) {
      s = s.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (I, H, z, K) => H + K.replaceAll(".", " ."));
      var l = s.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, u, c, f, d, h, g = [], m = [], p, v, b = 0, k = 0, y = 0, C = 0, T = 0, E = 0, P = 0, O = 0, F = 0, j = 0, R = 0, N = 0, _ = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = l[u], f = c.substring(0, 1), d = f.toLowerCase(), g = c.replace(f, "").trim().split(" ").filter(function(I) {
          return I !== "";
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
            let I = !1;
            if (N.length > 1) {
              let H = parseInt(N[0]), z = parseInt(N[1]), K;
              N.length > 2 && (K = parseFloat(N.substring(2))), g[v + 3] = H, g.splice(v + 4, 0, z), m.splice(v + 4, 0, "+"), K !== void 0 && g.splice(v + 5, 0, K), I = !0;
            }
            N = g[v + 3], _ = I ? g[v + 4] : m[v + 4], !I && _.length > 1 && (g[v + 4] = parseInt(_[0]), g.splice(v + 5, 0, parseFloat(_.substring(1)))), _ = g[v + 4], f === "a" ? (y += g[v + 5], C += g[v + 6]) : (y = g[v + 5], C = g[v + 6]), B += "A " + F + " " + j + " " + R + " " + N + " " + _ + " " + y + " " + C + " ";
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
})(Md);
var Ow = Md.exports;
const Ou = /* @__PURE__ */ Nw(Ow), Te = typeof window < "u", Yl = Te && "IntersectionObserver" in window, Fw = Te && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function Bw(e, t, n) {
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
function li(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((r) => li(e[r], t[r]));
}
function Fu(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Bw(e, t.split("."), n));
}
function Td(e) {
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
function co(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Kr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Bu = Object.freeze({
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
function Vd(e) {
  return Object.keys(e);
}
function ys(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Id(e, t) {
  const n = {}, r = new Set(Object.keys(e));
  for (const i of t)
    r.has(i) && (n[i] = e[i]);
  return n;
}
function Du(e, t, n) {
  const r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((s) => s instanceof RegExp ? s.test(o) : s === o) && !(n != null && n.some((s) => s === o)) ? r[o] = e[o] : i[o] = e[o];
  return [r, i];
}
function ai(e, t) {
  const n = {
    ...e
  };
  return t.forEach((r) => delete n[r]), n;
}
const $d = /^on[^a-z]/, Kl = (e) => $d.test(e), Dw = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Xl(e) {
  const [t, n] = Du(e, [$d]), r = ai(t, Dw), [i, o] = Du(n, ["class", "style", "id", /^data-/]);
  return Object.assign(i, t), Object.assign(o, r), [i, o];
}
function qt(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function fo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Hu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function zu(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Hw(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let r = 0;
  for (; r < e.length; )
    n.push(e.substr(r, t)), r += t;
  return n;
}
function ju(e) {
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
    if (co(o) && co(s)) {
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
function Ad(e) {
  return e.map((t) => t.type === Se ? Ad(t.children) : t).flat();
}
function Dn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Dn.cache.has(e))
    return Dn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Dn.cache.set(e, t), t;
}
Dn.cache = /* @__PURE__ */ new Map();
function Wi(e, t) {
  if (!t || typeof t != "object")
    return [];
  if (Array.isArray(t))
    return t.map((n) => Wi(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Wi(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Wi(e, t.component.subTree).flat(1);
  }
  return [];
}
function Zl(e) {
  const t = Mt({}), n = $(e);
  return xn(() => {
    for (const r in n.value)
      t[r] = n.value[r];
  }, {
    flush: "sync"
  }), El(t);
}
function ho(e, t) {
  return e.includes(t);
}
function Pd(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Yt = () => [Function, Array];
function Wu(e, t) {
  return t = "on" + yr(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function zw(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (Array.isArray(e))
    for (const i of e)
      i(...n);
  else
    typeof e == "function" && e(...n);
}
function Xr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((r) => `${r}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Rd(e, t, n) {
  let r, i = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    i += o, r = e[i];
  while ((!r || r.offsetParent == null || !((n == null ? void 0 : n(r)) ?? !0)) && i < e.length && i >= 0);
  return r;
}
function Zs(e, t) {
  var r, i, o, s;
  const n = Xr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((r = n[0]) == null || r.focus());
  else if (t === "first")
    (i = n[0]) == null || i.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (s = n[t]) == null || s.focus();
  else {
    const l = Rd(n, t);
    l ? l.focus() : Zs(e, t === "next" ? "first" : "last");
  }
}
function Nd(e, t) {
  if (!(Te && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function jw(e, t) {
  if (!Te || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Ww(e, t) {
  const n = e.clientX, r = e.clientY, i = t.getBoundingClientRect(), o = i.left, s = i.top, l = i.right, a = i.bottom;
  return n >= o && n <= l && r >= s && r <= a;
}
const Od = ["top", "bottom"], Gw = ["start", "end", "left", "right"];
function Js(e, t) {
  let [n, r] = e.split(" ");
  return r || (r = ho(Od, n) ? "start" : ho(Gw, n) ? "top" : "center"), {
    side: Gu(n, t),
    align: Gu(r, t)
  };
}
function Gu(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function ws(e) {
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
function bs(e) {
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
function Uu(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function qu(e) {
  return ho(Od, e.side) ? "y" : "x";
}
class Hn {
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
function Yu(e, t) {
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
function Fd(e) {
  return Array.isArray(e) ? new Hn({
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
      return new Hn(t);
    const u = n.transformOrigin, c = t.x - l - (1 - o) * parseFloat(u), f = t.y - a - (1 - s) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = o ? t.width / o : e.offsetWidth + 1, h = s ? t.height / s : e.offsetHeight + 1;
    return new Hn({
      x: c,
      y: f,
      width: d,
      height: h
    });
  } else
    return new Hn(t);
}
function Nn(e, t, n) {
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
const Gi = /* @__PURE__ */ new WeakMap();
function Uw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Pd(n), i = Gi.get(e);
      if (t[n] == null)
        i == null || i.forEach((o) => {
          const [s, l] = o;
          s === r && (e.removeEventListener(r, l), i.delete(o));
        });
      else if (!i || ![...i].some((o) => o[0] === r && o[1] === t[n])) {
        e.addEventListener(r, t[n]);
        const o = i || /* @__PURE__ */ new Set();
        o.add([r, t[n]]), Gi.has(e) || Gi.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function qw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Pd(n), i = Gi.get(e);
      i == null || i.forEach((o) => {
        const [s, l] = o;
        s === r && (e.removeEventListener(r, l), i.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Qn = 2.4, Ku = 0.2126729, Xu = 0.7151522, Zu = 0.072175, Yw = 0.55, Kw = 0.58, Xw = 0.57, Zw = 0.62, Ii = 0.03, Ju = 1.45, Jw = 5e-4, Qw = 1.25, eb = 1.25, Qu = 0.078, ec = 12.82051282051282, $i = 0.06, tc = 1e-3;
function nc(e, t) {
  const n = (e.r / 255) ** Qn, r = (e.g / 255) ** Qn, i = (e.b / 255) ** Qn, o = (t.r / 255) ** Qn, s = (t.g / 255) ** Qn, l = (t.b / 255) ** Qn;
  let a = n * Ku + r * Xu + i * Zu, u = o * Ku + s * Xu + l * Zu;
  if (a <= Ii && (a += (Ii - a) ** Ju), u <= Ii && (u += (Ii - u) ** Ju), Math.abs(u - a) < Jw)
    return 0;
  let c;
  if (u > a) {
    const f = (u ** Yw - a ** Kw) * Qw;
    c = f < tc ? 0 : f < Qu ? f - f * ec * $i : f - $i;
  } else {
    const f = (u ** Zw - a ** Xw) * eb;
    c = f > -tc ? 0 : f > -Qu ? f - f * ec * $i : f + $i;
  }
  return c * 100;
}
const go = 0.20689655172413793, tb = (e) => e > go ** 3 ? Math.cbrt(e) : e / (3 * go ** 2) + 4 / 29, nb = (e) => e > go ? e ** 3 : 3 * go ** 2 * (e - 4 / 29);
function Bd(e) {
  const t = tb, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Dd(e) {
  const t = nb, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const rb = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], ib = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, ob = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], sb = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Hd(e) {
  const t = Array(3), n = ib, r = rb;
  for (let i = 0; i < 3; ++i)
    t[i] = Math.round(fo(n(r[i][0] * e[0] + r[i][1] * e[1] + r[i][2] * e[2])) * 255);
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
  const i = [0, 0, 0], o = sb, s = ob;
  t = o(t / 255), n = o(n / 255), r = o(r / 255);
  for (let l = 0; l < 3; ++l)
    i[l] = s[l][0] * t + s[l][1] * n + s[l][2] * r;
  return i;
}
function Qs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function lb(e) {
  return Qs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const rc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, ab = {
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
  hsl: (e, t, n, r) => ic({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsla: (e, t, n, r) => ic({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsv: (e, t, n, r) => Zr({
    h: e,
    s: t,
    v: n,
    a: r
  }),
  hsva: (e, t, n, r) => Zr({
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
  if (typeof e == "string" && rc.test(e)) {
    const {
      groups: t
    } = e.match(rc), {
      fn: n,
      values: r
    } = t, i = r.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return ab[n](...i);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), cb(t);
  } else if (typeof e == "object") {
    if (ys(e, ["r", "g", "b"]))
      return e;
    if (ys(e, ["h", "s", "l"]))
      return Zr(zd(e));
    if (ys(e, ["h", "s", "v"]))
      return Zr(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Zr(e) {
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
function ic(e) {
  return Zr(zd(e));
}
function zd(e) {
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
function Ai(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function ub(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: i
  } = e;
  return `#${[Ai(t), Ai(n), Ai(r), i !== void 0 ? Ai(Math.round(i * 255)) : ""].join("")}`;
}
function cb(e) {
  e = fb(e);
  let [t, n, r, i] = Hw(e, 2).map((o) => parseInt(o, 16));
  return i = i === void 0 ? i : i / 255, {
    r: t,
    g: n,
    b: r,
    a: i
  };
}
function fb(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Hu(Hu(e, 6), 8, "F")), e;
}
function db(e, t) {
  const n = Bd(Ql(e));
  return n[0] = n[0] + t * 10, Hd(Dd(n));
}
function hb(e, t) {
  const n = Bd(Ql(e));
  return n[0] = n[0] - t * 10, Hd(Dd(n));
}
function gb(e) {
  const t = Ot(e);
  return Ql(t)[1];
}
function jd(e) {
  const t = Math.abs(nc(Ot(0), Ot(e)));
  return Math.abs(nc(Ot(16777215), Ot(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
}, "component"), mr = Symbol.for("vuetify:defaults");
function mb(e) {
  return ie(e);
}
function ea() {
  const e = Fe(mr);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function _r(e, t) {
  const n = ea(), r = ie(e), i = $(() => {
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
  return Bt(mr, i), i;
}
function vb(e, t) {
  var n, r;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((r = e.props) == null ? void 0 : r[Dn(t)]) < "u";
}
function pb() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ea();
  const r = Je("useDefaults");
  if (t = t ?? r.type.name ?? r.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const i = $(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var f, d, h, g;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(f = i.value) == null ? void 0 : f[u], c].filter((m) => m != null) : typeof u == "string" && !vb(r.vnode, u) ? ((d = i.value) == null ? void 0 : d[u]) ?? ((g = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : g[u]) ?? c : c;
    }
  }), s = pe();
  xn(() => {
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
    const a = xb(mr, r);
    Bt(mr, $(() => s.value ? ut((a == null ? void 0 : a.value) ?? {}, s.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: l
  };
}
function ui(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = ee(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(r) {
      return Id(r, t);
    }, e.props._as = String, e.setup = function(r, i) {
      const o = ea();
      if (!o.value)
        return e._setup(r, i);
      const {
        props: s,
        provideSubDefaults: l
      } = pb(r, r._as ?? e.name, o), a = e._setup(s, i);
      return l(), a;
    };
  }
  return e;
}
function le() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? ui : wr)(t);
}
function Bo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return le()({
    name: n ?? yr(Xe(e.replace(/__/g, "-"))),
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
        return br(r.tag, {
          class: [e, r.class],
          style: r.style
        }, (s = o.default) == null ? void 0 : s.call(o));
      };
    }
  });
}
function Wd(e) {
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
const Jr = "cubic-bezier(0.4, 0, 0.2, 1)", yb = "cubic-bezier(0.0, 0, 0.2, 1)", wb = "cubic-bezier(0.4, 0, 1, 1)";
function Je(e, t) {
  const n = Ol();
  if (!n)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n;
}
function Ht() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Je(e).type;
  return Dn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Gd = 0, Ui = /* @__PURE__ */ new WeakMap();
function Vt() {
  const e = Je("getUid");
  if (Ui.has(e))
    return Ui.get(e);
  {
    const t = Gd++;
    return Ui.set(e, t), t;
  }
}
Vt.reset = () => {
  Gd = 0, Ui = /* @__PURE__ */ new WeakMap();
};
function bb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? _b(e) : ta(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function mo(e, t) {
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
function _b(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function xb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Je("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function Cb(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ye(e) {
  const t = Je("useRender");
  t.render = e;
}
const Do = ee({
  border: [Boolean, Number, String]
}, "border");
function Ho(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    borderClasses: $(() => {
      const r = Ie(e) ? e.value : e.border, i = [];
      if (r === !0 || r === "")
        i.push(`${t}--border`);
      else if (typeof r == "string" || r === 0)
        for (const o of String(r).split(" "))
          i.push(`border-${o}`);
      return i;
    })
  };
}
const Sb = [null, "default", "comfortable", "compact"], zt = ee({
  density: {
    type: String,
    default: "default",
    validator: (e) => Sb.includes(e)
  }
}, "density");
function Qt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    densityClasses: $(() => `${t}--density-${e.density}`)
  };
}
const zo = ee({
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
function jo(e) {
  return {
    elevationClasses: $(() => {
      const n = Ie(e) ? e.value : e.elevation, r = [];
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
    roundedClasses: $(() => {
      const r = Ie(e) ? e.value : e.rounded, i = Ie(e) ? e.value : e.tile, o = [];
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
const nt = ee({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), vo = Symbol.for("vuetify:theme"), ze = ee({
  theme: String
}, "theme");
function oc() {
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
function kb() {
  var r, i;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : oc();
  const t = oc();
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
function Eb(e) {
  const t = kb(e), n = ie(t.defaultTheme), r = ie(t.themes), i = $(() => {
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
              const v = p === "lighten" ? db : hb;
              for (const b of Td(t.variations[p], 1))
                h.colors[`${g}-${p}-${b}`] = ub(v(Ot(m), b));
            }
        }
      for (const g of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(g) || h.colors[`on-${g}`])
          continue;
        const m = `on-${g}`, p = Ot(h.colors[g]);
        h.colors[m] = jd(p);
      }
    }
    return c;
  }), o = $(() => i.value[n.value]), s = $(() => {
    const c = [];
    o.value.dark && Mn(c, ":root", ["color-scheme: dark"]), Mn(c, ":root", sc(o.value));
    for (const [g, m] of Object.entries(i.value))
      Mn(c, `.v-theme--${g}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...sc(m)]);
    const f = [], d = [], h = new Set(Object.values(i.value).flatMap((g) => Object.keys(g.colors)));
    for (const g of h)
      /^on-[a-z]/.test(g) ? Mn(d, `.${g}`, [`color: rgb(var(--v-theme-${g})) !important`]) : (Mn(f, `.bg-${g}`, [`--v-theme-overlay-multiplier: var(--v-theme-${g}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${g})) !important`, `color: rgb(var(--v-theme-on-${g})) !important`]), Mn(d, `.text-${g}`, [`color: rgb(var(--v-theme-${g})) !important`]), Mn(d, `.border-${g}`, [`--v-border-color: var(--v-theme-${g})`]));
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
        Te && ae(s, () => {
          h.patch(l);
        });
      } else
        Te ? (f.addHeadObjs($(l)), xn(() => f.updateDOM())) : f.addHeadObjs(l());
    else {
      let g = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = s.value);
      };
      var d = g;
      let h = Te ? document.getElementById("vuetify-theme-stylesheet") : null;
      Te ? ae(s, g, {
        immediate: !0
      }) : g();
    }
  }
  const u = $(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
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
function rt(e) {
  Je("provideTheme");
  const t = Fe(vo, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const n = $(() => e.theme ?? t.name.value), r = $(() => t.themes.value[n.value]), i = $(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: r,
    themeClasses: i
  };
  return Bt(vo, o), o;
}
function Mn(e, t, n) {
  e.push(`${t} {
`, ...n.map((r) => `  ${r};
`), `}
`);
}
function sc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, r = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const s = Ot(o);
    r.push(`--v-theme-${i}: ${s.r},${s.g},${s.b}`), i.startsWith("on-") || r.push(`--v-theme-${i}-overlay-multiplier: ${gb(o) > 0.18 ? t : n}`);
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
        if (n.backgroundColor = e.value.background, !e.value.text && lb(e.value.background)) {
          const r = Ot(e.value.background);
          if (r.a == null || r.a === 1) {
            const i = jd(r);
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
function bn(e, t) {
  const n = $(() => ({
    text: Ie(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: i
  } = na(n);
  return {
    textColorClasses: r,
    textColorStyles: i
  };
}
function Wn(e, t) {
  const n = $(() => ({
    background: Ie(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: i
  } = na(n);
  return {
    backgroundColorClasses: r,
    backgroundColorStyles: i
  };
}
const Lb = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function ci(e, t) {
  return w(Se, null, [e && w("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), w("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Kn = ee({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Lb.includes(e)
  }
}, "variant");
function fi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = $(() => {
    const {
      variant: o
    } = Nt(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: r,
    colorStyles: i
  } = na($(() => {
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
const Ud = ee({
  divided: Boolean,
  ...Do(),
  ...ke(),
  ...zt(),
  ...zo(),
  ...en(),
  ...nt(),
  ...ze(),
  ...Kn()
}, "VBtnGroup"), lc = le()({
  name: "VBtnGroup",
  props: Ud(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      densityClasses: i
    } = Qt(e), {
      borderClasses: o
    } = Ho(e), {
      elevationClasses: s
    } = jo(e), {
      roundedClasses: l
    } = tn(e);
    _r({
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
function vr(e, t) {
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
function Be(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const o = Je("useProxiedModel"), s = ie(e[t] !== void 0 ? e[t] : n), l = Dn(t), u = $(l !== t ? () => {
    var f, d, h, g;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(l)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (g = o.vnode.props) != null && g.hasOwnProperty(`onUpdate:${l}`)));
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  vr(() => !u.value, () => {
    ae(() => e[t], (f) => {
      s.value = f;
    });
  });
  const c = $({
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
  const r = Je("useGroupItem");
  if (!r)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const i = Vt();
  Bt(Symbol.for(`${t.description}:id`), i);
  const o = Fe(t, null);
  if (!o) {
    if (!n)
      return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const s = we(e, "value"), l = $(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: i,
    value: s,
    disabled: l
  }, r), Jt(() => {
    o.unregister(i);
  });
  const a = $(() => o.isSelected(i)), u = $(() => a.value && [o.selectedClass.value, e.selectedClass]);
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
function Wo(e, t) {
  let n = !1;
  const r = Mt([]), i = Be(e, "modelValue", [], (d) => d == null ? [] : qd(r, qt(d)), (d) => {
    const h = Tb(r, d);
    return e.multiple ? h : h[0];
  }), o = Je("useGroup");
  function s(d, h) {
    const g = d, m = Symbol.for(`${t.description}:id`), v = Wi(m, o == null ? void 0 : o.vnode).indexOf(h);
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
  Cn(() => {
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
    selectedClass: $(() => e.selectedClass),
    items: $(() => r),
    getItemIndex: (d) => Mb(r, d)
  };
  return Bt(t, f), f;
}
function Mb(e, t) {
  const n = qd(e, [t]);
  return n.length ? e.findIndex((r) => r.id === n[0]) : -1;
}
function qd(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.find((s) => li(r, s.value)), o = e[r];
    (i == null ? void 0 : i.value) != null ? n.push(i.id) : o != null && n.push(o.id);
  }), n;
}
function Tb(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.findIndex((o) => o.id === r);
    if (~i) {
      const o = e[i];
      n.push(o.value != null ? o.value : i);
    }
  }), n;
}
const Yd = Symbol.for("vuetify:v-btn-toggle"), Vb = ee({
  ...Ud(),
  ...ra()
}, "VBtnToggle");
le()({
  name: "VBtnToggle",
  props: Vb(),
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
    } = Wo(e, Yd);
    return ye(() => {
      const a = lc.filterProps(e);
      return w(lc, fe({
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
const Ib = ee({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ye = le(!1)({
  name: "VDefaultsProvider",
  props: Ib(),
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
    return _r(r, {
      reset: o,
      root: s,
      scoped: l,
      disabled: i
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), $b = {
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
}, Ab = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => br(Kd, {
    ...e,
    class: "mdi"
  })
}, $e = [String, Function, Object, Array], el = Symbol.for("vuetify:icons"), Go = ee({
  icon: {
    type: $e
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), ac = le()({
  name: "VComponentIcon",
  props: Go(),
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
}), sa = ui({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Go(),
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
ui({
  name: "VLigatureIcon",
  props: Go(),
  setup(e) {
    return () => w(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Kd = ui({
  name: "VClassIcon",
  props: Go(),
  setup(e) {
    return () => w(e.tag, {
      class: e.icon
    }, null);
  }
});
function Pb() {
  return {
    svg: {
      component: sa
    },
    class: {
      component: Kd
    }
  };
}
function Rb(e) {
  const t = Pb(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Ab), ut({
    defaultSet: n,
    sets: t,
    aliases: {
      ...$b,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const Nb = (e) => {
  const t = Fe(el);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: $(() => {
      var a;
      const r = Nt(e);
      if (!r)
        return {
          component: ac
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
          component: ac,
          icon: i
        };
      const o = Object.keys(t.sets).find((u) => typeof i == "string" && i.startsWith(`${u}:`)), s = o ? i.slice(o.length + 1) : i;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: s
      };
    })
  };
}, Ob = ["x-small", "small", "default", "large", "x-large"], di = ee({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function hi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return Zl(() => {
    let n, r;
    return ho(Ob, e.size) ? n = `${t}--size-${e.size}` : e.size && (r = {
      width: me(e.size),
      height: me(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: r
    };
  });
}
const Fb = ee({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: $e,
  ...ke(),
  ...di(),
  ...nt({
    tag: "i"
  }),
  ...ze()
}, "VIcon"), Ke = le()({
  name: "VIcon",
  props: Fb(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const i = ie(), {
      themeClasses: o
    } = rt(e), {
      iconData: s
    } = Nb($(() => i.value || e.icon)), {
      sizeClasses: l
    } = hi(e), {
      textColorClasses: a,
      textColorStyles: u
    } = bn(we(e, "color"));
    return ye(() => {
      var f, d;
      const c = (f = r.default) == null ? void 0 : f.call(r);
      return c && (i.value = (d = Ad(c).filter((h) => h.type === ni && h.children && typeof h.children == "string")[0]) == null ? void 0 : d.children), w(s.value.component, {
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
function Xd(e, t) {
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
  if (Te) {
    const i = new ResizeObserver((o) => {
      e == null || e(o, i), o.length && (t === "content" ? r.value = o[0].contentRect : r.value = o[0].target.getBoundingClientRect());
    });
    Jt(() => {
      i.disconnect();
    }), ae(n, (o, s) => {
      s && (i.unobserve(Kr(s)), r.value = void 0), o && i.observe(Kr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: ti(r)
  };
}
const Bb = ee({
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
  ...di(),
  ...nt({
    tag: "div"
  }),
  ...ze()
}, "VProgressCircular"), Zd = le()({
  name: "VProgressCircular",
  props: Bb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = 20, i = 2 * Math.PI * r, o = ie(), {
      themeClasses: s
    } = rt(e), {
      sizeClasses: l,
      sizeStyles: a
    } = hi(e), {
      textColorClasses: u,
      textColorStyles: c
    } = bn(we(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = bn(we(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: g
    } = Xd(), {
      resizeRef: m,
      contentRect: p
    } = tl(), v = $(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), b = $(() => Number(e.width)), k = $(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(b.value, 32)), y = $(() => r / (1 - b.value / k.value) * 2), C = $(() => b.value / k.value * y.value), T = $(() => me((100 - v.value) / 100 * i));
    return xn(() => {
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
}), Uo = ee({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function qo(e) {
  return {
    dimensionStyles: $(() => ({
      height: me(e.height),
      maxHeight: me(e.maxHeight),
      maxWidth: me(e.maxWidth),
      minHeight: me(e.minHeight),
      minWidth: me(e.minWidth),
      width: me(e.width)
    }))
  };
}
const Db = {
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
}, uc = "$vuetify.", cc = (e, t) => e.replace(/\{(\d+)\}/g, (n, r) => String(t[+r])), Jd = (e, t, n) => function(r) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
    o[s - 1] = arguments[s];
  if (!r.startsWith(uc))
    return cc(r, o);
  const l = r.replace(uc, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Fu(a, l, null);
  return c || (`${r}${e.value}`, c = Fu(u, l, null)), c || (c = r), typeof c != "string" && (c = r), cc(c, o);
};
function Qd(e, t) {
  return (n, r) => new Intl.NumberFormat([e.value, t.value], r).format(n);
}
function _s(e, t, n) {
  const r = Be(e, t, e[t] ?? n.value);
  return r.value = e[t] ?? n.value, ae(n, (i) => {
    e[t] == null && (r.value = n.value);
  }), r;
}
function eh(e) {
  return (t) => {
    const n = _s(t, "locale", e.current), r = _s(t, "fallback", e.fallback), i = _s(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: r,
      messages: i,
      t: Jd(n, r, i),
      n: Qd(n, r),
      provide: eh({
        current: n,
        fallback: r,
        messages: i
      })
    };
  };
}
function Hb(e) {
  const t = pe((e == null ? void 0 : e.locale) ?? "en"), n = pe((e == null ? void 0 : e.fallback) ?? "en"), r = ie({
    en: Db,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: r,
    t: Jd(t, n, r),
    n: Qd(t, n),
    provide: eh({
      current: t,
      fallback: n,
      messages: r
    })
  };
}
const po = Symbol.for("vuetify:locale");
function zb(e) {
  return e.name != null;
}
function jb(e) {
  const t = e != null && e.adapter && zb(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Hb(e), n = Gb(t, e);
  return {
    ...t,
    ...n
  };
}
function Yo() {
  const e = Fe(po);
  if (!e)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Wb() {
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
function Gb(e, t) {
  const n = ie((t == null ? void 0 : t.rtl) ?? Wb()), r = $(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: r,
    rtl: n,
    rtlClasses: $(() => `v-locale--is-${r.value ? "rtl" : "ltr"}`)
  };
}
function Sn() {
  const e = Fe(po);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const fc = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ko = ee({
  location: String
}, "location");
function Xo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: r
  } = Sn();
  return {
    locationStyles: $(() => {
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
      return o !== "center" && (t ? a[fc[o]] = `calc(100% - ${l(o)}px)` : a[o] = 0), s !== "center" ? t ? a[fc[s]] = `calc(100% - ${l(s)}px)` : a[s] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const Ub = ee({
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
  ...Ko({
    location: "top"
  }),
  ...en(),
  ...nt(),
  ...ze()
}, "VProgressLinear"), th = le()({
  name: "VProgressLinear",
  props: Ub(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), {
      isRtl: i,
      rtlClasses: o
    } = Sn(), {
      themeClasses: s
    } = rt(e), {
      locationStyles: l
    } = Xo(e), {
      textColorClasses: a,
      textColorStyles: u
    } = bn(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = Wn($(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: h
    } = Wn(e, "color"), {
      roundedClasses: g
    } = tn(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Xd(), v = $(() => parseInt(e.max, 10)), b = $(() => parseInt(e.height, 10)), k = $(() => parseFloat(e.bufferValue) / v.value * 100), y = $(() => parseFloat(r.value) / v.value * 100), C = $(() => i.value !== e.reverse), T = $(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), E = $(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
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
function Zo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    loaderClasses: $(() => ({
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
  })) || w(th, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const qb = ["static", "relative", "fixed", "absolute", "sticky"], ua = ee({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => qb.includes(e)
    )
  }
}, "position");
function ca(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  return {
    positionClasses: $(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Yb() {
  const e = Je("useRoute");
  return $(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Kb() {
  var e, t;
  return (t = (e = Je("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function fa(e, t) {
  const n = Gg("RouterLink"), r = $(() => !!(e.href || e.to)), i = $(() => (r == null ? void 0 : r.value) || Wu(t, "click") || Wu(e, "click"));
  if (typeof n == "string")
    return {
      isLink: r,
      isClickable: i,
      href: we(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, s = Yb();
  return {
    isLink: r,
    isClickable: i,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && $(() => {
      var l, a, u;
      return e.exact ? s.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && li(o.route.value.query, s.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (l = o.isActive) == null ? void 0 : l.value;
    }),
    href: $(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const da = ee({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let xs = !1;
function Xb(e, t) {
  let n = !1, r, i;
  Te && (De(() => {
    window.addEventListener("popstate", o), r = e == null ? void 0 : e.beforeEach((s, l, a) => {
      xs ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), xs = !0;
    }), i = e == null ? void 0 : e.afterEach(() => {
      xs = !1;
    });
  }), ht(() => {
    window.removeEventListener("popstate", o), r == null || r(), i == null || i();
  }));
  function o(s) {
    var l;
    (l = s.state) != null && l.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Zb(e, t) {
  ae(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && De(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const nl = Symbol("rippleStop"), Jb = 80;
function dc(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function rl(e) {
  return e.constructor.name === "TouchEvent";
}
function nh(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Qb = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = 0, i = 0;
  if (!nh(e)) {
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
}, yo = {
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
    } = Qb(e, t, n), f = `${o * 2}px`;
    i.className = "v-ripple__animation", i.style.width = f, i.style.height = f, t.appendChild(r);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), i.classList.add("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--visible"), dc(i, `translate(${l}, ${a}) scale3d(${s},${s},${s})`), i.dataset.activated = String(performance.now()), setTimeout(() => {
      i.classList.remove("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--in"), dc(i, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function rh(e) {
  return typeof e > "u" || !!e;
}
function Qr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[nl])) {
    if (e[nl] = !0, rl(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (t.center = n._ripple.centered || nh(e), n._ripple.class && (t.class = n._ripple.class), rl(e)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        yo.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var r;
        (r = n == null ? void 0 : n._ripple) != null && r.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Jb);
    } else
      yo.show(e, n, t);
  }
}
function hc(e) {
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
    }), yo.hide(t);
  }
}
function ih(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let ei = !1;
function oh(e) {
  !ei && (e.keyCode === Bu.enter || e.keyCode === Bu.space) && (ei = !0, Qr(e));
}
function sh(e) {
  ei = !1, at(e);
}
function lh(e) {
  ei && (ei = !1, at(e));
}
function ah(e, t, n) {
  const {
    value: r,
    modifiers: i
  } = t, o = rh(r);
  if (o || yo.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = i.center, e._ripple.circle = i.circle, co(r) && r.class && (e._ripple.class = r.class), o && !n) {
    if (i.stop) {
      e.addEventListener("touchstart", hc, {
        passive: !0
      }), e.addEventListener("mousedown", hc);
      return;
    }
    e.addEventListener("touchstart", Qr, {
      passive: !0
    }), e.addEventListener("touchend", at, {
      passive: !0
    }), e.addEventListener("touchmove", ih, {
      passive: !0
    }), e.addEventListener("touchcancel", at), e.addEventListener("mousedown", Qr), e.addEventListener("mouseup", at), e.addEventListener("mouseleave", at), e.addEventListener("keydown", oh), e.addEventListener("keyup", sh), e.addEventListener("blur", lh), e.addEventListener("dragstart", at, {
      passive: !0
    });
  } else
    !o && n && uh(e);
}
function uh(e) {
  e.removeEventListener("mousedown", Qr), e.removeEventListener("touchstart", Qr), e.removeEventListener("touchend", at), e.removeEventListener("touchmove", ih), e.removeEventListener("touchcancel", at), e.removeEventListener("mouseup", at), e.removeEventListener("mouseleave", at), e.removeEventListener("keydown", oh), e.removeEventListener("keyup", sh), e.removeEventListener("dragstart", at), e.removeEventListener("blur", lh);
}
function e_(e, t) {
  ah(e, t, !1);
}
function t_(e) {
  delete e._ripple, uh(e);
}
function n_(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = rh(t.oldValue);
  ah(e, t, n);
}
const Jo = {
  mounted: e_,
  unmounted: t_,
  updated: n_
}, ch = ee({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: Yd
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: $e,
  appendIcon: $e,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...Do(),
  ...ke(),
  ...zt(),
  ...Uo(),
  ...zo(),
  ...ia(),
  ...la(),
  ...Ko(),
  ...ua(),
  ...en(),
  ...da(),
  ...di(),
  ...nt({
    tag: "button"
  }),
  ...ze(),
  ...Kn({
    variant: "elevated"
  })
}, "VBtn"), ct = le()({
  name: "VBtn",
  directives: {
    Ripple: Jo
  },
  props: ch(),
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
    } = rt(e), {
      borderClasses: o
    } = Ho(e), {
      colorClasses: s,
      colorStyles: l,
      variantClasses: a
    } = fi(e), {
      densityClasses: u
    } = Qt(e), {
      dimensionStyles: c
    } = qo(e), {
      elevationClasses: f
    } = jo(e), {
      loaderClasses: d
    } = Zo(e), {
      locationStyles: h
    } = Xo(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = tn(e), {
      sizeClasses: p,
      sizeStyles: v
    } = hi(e), b = oa(e, e.symbol, !1), k = fa(e, n), y = $(() => {
      var O;
      return e.active !== void 0 ? e.active : k.isLink.value ? (O = k.isActive) == null ? void 0 : O.value : b == null ? void 0 : b.isSelected.value;
    }), C = $(() => (b == null ? void 0 : b.disabled.value) || e.disabled), T = $(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = $(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P(O) {
      var F;
      C.value || k.isLink.value && (O.metaKey || O.ctrlKey || O.shiftKey || O.button !== 0 || n.target === "_blank") || ((F = k.navigate) == null || F.call(k, O), b == null || b.toggle());
    }
    return Zb(k, b == null ? void 0 : b.select), ye(() => {
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
          var I;
          return [ci(!0, "v-btn"), !e.icon && F && w("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [r.prepend ? w(Ye, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, r.prepend) : w(Ke, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), w("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!r.default && R ? w(Ke, {
            key: "content-icon",
            icon: e.icon
          }, null) : w(Ye, {
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
          }, [r.append ? w(Ye, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, r.append) : w(Ke, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && w("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((I = r.loader) == null ? void 0 : I.call(r)) ?? w(Zd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[qn("ripple"), !C.value && e.ripple, null]]);
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
    return _r({
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
}), il = Bo("v-card-subtitle"), Qo = Bo("v-card-title");
function r_(e) {
  return {
    aspectStyles: $(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const fh = ee({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...ke(),
  ...Uo()
}, "VResponsive"), gc = le()({
  name: "VResponsive",
  props: fh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: r
    } = r_(e), {
      dimensionStyles: i
    } = qo(e);
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
}), es = ee({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), mn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: r,
    disabled: i,
    group: o,
    ...s
  } = e, {
    component: l = o ? Wf : Kt,
    ...a
  } = typeof r == "object" ? r : {};
  return br(l, fe(typeof r == "string" ? {
    name: i ? "" : r
  } : a, typeof r == "string" ? {} : {
    disabled: i,
    group: o
  }, s), n);
};
function i_(e, t) {
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
    i && (!n.quiet || u.init) && (!n.once || c || u.init) && i(c, l, a), c && n.once ? dh(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: s
  }, s.observe(e);
}
function dh(e, t) {
  var r;
  const n = (r = e._observe) == null ? void 0 : r[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const o_ = {
  mounted: i_,
  unmounted: dh
}, s_ = o_, l_ = ee({
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
  ...fh(),
  ...ke(),
  ...en(),
  ...es()
}, "VImg"), hh = le()({
  name: "VImg",
  directives: {
    intersect: s_
  },
  props: l_(),
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
    } = Wn(we(e, "color")), {
      roundedClasses: s
    } = tn(e), l = Je("VImg"), a = pe(""), u = ie(), c = pe(e.eager ? "loading" : "idle"), f = pe(), d = pe(), h = $(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = $(() => h.value.aspect || f.value / d.value || 0);
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
        h.value.src && De(() => {
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
          naturalWidth: I
        } = R;
        B || I ? (f.value = I, d.value = B) : !R.complete && c.value === "loading" && N != null ? k = window.setTimeout(_, N) : (R.currentSrc.endsWith(".svg") || R.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
      };
      _();
    }
    const C = $(() => ({
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
      return w(mn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ft(N ? w("picture", {
          class: "v-img__picture"
        }, [N, R]) : R, [[Yn, c.value === "loaded"]])]
      });
    }, E = () => w(mn, {
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
    }), P = () => r.placeholder ? w(mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !r.error) && w("div", {
        class: "v-img__placeholder"
      }, [r.placeholder()])]
    }) : null, O = () => r.error ? w(mn, {
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
      const R = gc.filterProps(e);
      return ft(w(gc, fe({
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
      }), [[qn("intersect"), {
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
}), a_ = ee({
  start: Boolean,
  end: Boolean,
  icon: $e,
  image: String,
  text: String,
  ...ke(),
  ...zt(),
  ...en(),
  ...di(),
  ...nt(),
  ...ze(),
  ...Kn({
    variant: "flat"
  })
}, "VAvatar"), wo = le()({
  name: "VAvatar",
  props: a_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: s
    } = fi(e), {
      densityClasses: l
    } = Qt(e), {
      roundedClasses: a
    } = tn(e), {
      sizeClasses: u,
      sizeStyles: c
    } = hi(e);
    return ye(() => w(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, r.value, i.value, l.value, a.value, u.value, s.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? w(Ye, {
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
      }) : e.image ? w(hh, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? w(Ke, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, ci(!1, "v-avatar")]
    })), {};
  }
}), u_ = ee({
  appendAvatar: String,
  appendIcon: $e,
  prependAvatar: String,
  prependIcon: $e,
  subtitle: [String, Number],
  title: [String, Number],
  ...ke(),
  ...zt()
}, "VCardItem"), c_ = le()({
  name: "VCardItem",
  props: u_(),
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
      }, [n.prepend ? w(Ye, {
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
      }, n.prepend) : w(Se, null, [e.prependAvatar && w(wo, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && w(Ke, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), w("div", {
        class: "v-card-item__content"
      }, [l && w(Qo, {
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
      }, [n.append ? w(Ye, {
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
      }, n.append) : w(Se, null, [e.appendIcon && w(Ke, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && w(wo, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), qi = Bo("v-card-text"), f_ = ee({
  appendAvatar: String,
  appendIcon: $e,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: $e,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...Do(),
  ...ke(),
  ...zt(),
  ...Uo(),
  ...zo(),
  ...la(),
  ...Ko(),
  ...ua(),
  ...en(),
  ...da(),
  ...nt(),
  ...ze(),
  ...Kn({
    variant: "elevated"
  })
}, "VCard"), ga = le()({
  name: "VCard",
  directives: {
    Ripple: Jo
  },
  props: f_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: i
    } = rt(e), {
      borderClasses: o
    } = Ho(e), {
      colorClasses: s,
      colorStyles: l,
      variantClasses: a
    } = fi(e), {
      densityClasses: u
    } = Qt(e), {
      dimensionStyles: c
    } = qo(e), {
      elevationClasses: f
    } = jo(e), {
      loaderClasses: d
    } = Zo(e), {
      locationStyles: h
    } = Xo(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = tn(e), p = fa(e, n), v = $(() => e.link !== !1 && p.isLink.value), b = $(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
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
          }, [r.image ? w(Ye, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, r.image) : w(hh, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), w(aa, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: r.loader
          }), F && w(c_, {
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
          }), j && w(qi, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = r.text) == null ? void 0 : N.call(r)) ?? e.text];
            }
          }), (R = r.default) == null ? void 0 : R.call(r), r.actions && w(ha, null, {
            default: r.actions
          }), ci(b.value, "v-card")];
        }
      }), [[qn("ripple"), b.value && e.ripple]]);
    }), {};
  }
}), d_ = ee({
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
    props: d_({
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
        const l = r.group ? Wf : Kt;
        return br(l, {
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
function gh(e, t) {
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
      return () => br(Kt, {
        name: r.disabled ? "" : e,
        css: !r.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...r.disabled ? {} : t
      }, o.default);
    }
  });
}
function mh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", r = Xe(`offset-${n}`);
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
const h_ = ee({
  target: [Object, Array]
}, "v-dialog-transition"), vh = le()({
  name: "VDialogTransition",
  props: h_(),
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
        } = vc(e.target, i), f = Nn(i, [{
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: yb
        });
        (d = mc(i)) == null || d.forEach((h) => {
          Nn(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Jr
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
        } = vc(e.target, i);
        Nn(i, [{}, {
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: wb
        }).finished.then(() => o()), (d = mc(i)) == null || d.forEach((h) => {
          Nn(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Jr
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
function mc(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function vc(e, t) {
  const n = Fd(e), r = Jl(t), [i, o] = getComputedStyle(t).transformOrigin.split(" ").map((v) => parseFloat(v)), [s, l] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
const pc = gt("fade-transition"), g_ = gt("scale-transition");
gt("scroll-x-transition");
gt("scroll-x-reverse-transition");
gt("scroll-y-transition");
gt("scroll-y-reverse-transition");
gt("slide-x-transition");
gt("slide-x-reverse-transition");
const ph = gt("slide-y-transition");
gt("slide-y-reverse-transition");
gh("expand-transition", mh());
const yh = gh("expand-x-transition", mh("", !0));
function Cs(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function m_(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function yc(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: r
    } = e, i = r === "left" ? 0 : r === "center" ? t.width / 2 : r === "right" ? t.width : r, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Cs({
      x: i,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: r
    } = e, i = n === "left" ? 0 : n === "right" ? t.width : n, o = r === "top" ? 0 : r === "center" ? t.height / 2 : r === "bottom" ? t.height : r;
    return Cs({
      x: i,
      y: o
    }, t);
  }
  return Cs({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const wh = {
  static: y_,
  // specific viewport position, usually centered
  connected: b_
  // connected to a certain element
}, v_ = ee({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in wh
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
function p_(e, t) {
  const n = ie({}), r = ie();
  Te && vr(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var s, l;
    ae(() => e.locationStrategy, o), ht(() => {
      window.removeEventListener("resize", i), r.value = void 0;
    }), window.addEventListener("resize", i, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? r.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : r.value = (l = wh[e.locationStrategy](t, e, n)) == null ? void 0 : l.updateLocation;
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
function y_() {
}
function w_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Jl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function b_(e, t, n) {
  (Array.isArray(e.target.value) || Cb(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: i,
    preferredOrigin: o
  } = Zl(() => {
    const g = Js(t.location, e.isRtl.value), m = t.origin === "overlap" ? g : t.origin === "auto" ? ws(g) : Js(t.origin, e.isRtl.value);
    return g.side === m.side && g.align === bs(m).align ? {
      preferredAnchor: Uu(g),
      preferredOrigin: Uu(m)
    } : {
      preferredAnchor: g,
      preferredOrigin: m
    };
  }), [s, l, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((g) => $(() => {
    const m = parseFloat(t[g]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = $(() => {
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
    const g = Fd(e.target.value), m = w_(e.contentEl.value, e.isRtl.value), p = mo(e.contentEl.value), v = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const b = p.reduce((j, R) => {
      const N = R.getBoundingClientRect(), _ = new Hn({
        x: R === document.documentElement ? 0 : N.x,
        y: R === document.documentElement ? 0 : N.y,
        width: R.clientWidth,
        height: R.clientHeight
      });
      return j ? new Hn({
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
      const R = new Hn(m), N = yc(j.anchor, g), _ = yc(j.origin, R);
      let {
        x: B,
        y: I
      } = m_(N, _);
      switch (j.anchor.side) {
        case "top":
          I -= c.value[0];
          break;
        case "bottom":
          I += c.value[0];
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
          I -= c.value[1];
          break;
        case "bottom":
          I += c.value[1];
          break;
        case "left":
          B -= c.value[1];
          break;
        case "right":
          B += c.value[1];
          break;
      }
      return R.x += B, R.y += I, R.width = Math.min(R.width, a.value), R.height = Math.min(R.height, u.value), {
        overflows: Yu(R, b),
        x: B,
        y: I
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
        const _ = qu(k.anchor), B = N.x.before || N.x.after, I = N.y.before || N.y.after;
        let H = !1;
        if (["x", "y"].forEach((z) => {
          if (z === "x" && B && !P.x || z === "y" && I && !P.y) {
            const K = {
              anchor: {
                ...k.anchor
              },
              origin: {
                ...k.origin
              }
            }, X = z === "x" ? _ === "y" ? bs : ws : _ === "y" ? ws : bs;
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
        const _ = Yu(m, b);
        E.x = b.width - _.x.before - _.x.after, E.y = b.height - _.y.before - _.y.after, C += _.x.before, m.x += _.x.before, T += _.y.before, m.y += _.y.before;
      }
      break;
    }
    const F = qu(k.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${k.anchor.side} ${k.anchor.align}`,
      transformOrigin: `${k.origin.side} ${k.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: me(Ss(T)),
      left: e.isRtl.value ? void 0 : me(Ss(C)),
      right: e.isRtl.value ? me(Ss(-C)) : void 0,
      minWidth: me(F === "y" ? Math.min(s.value, g.width) : s.value),
      maxWidth: me(wc(fo(E.x, s.value === 1 / 0 ? 0 : s.value, a.value))),
      maxHeight: me(wc(fo(E.y, l.value === 1 / 0 ? 0 : l.value, u.value)))
    }), {
      available: E,
      contentBox: m
    };
  }
  return ae(() => [i.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), De(() => {
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
function Ss(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function wc(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ol = !0;
const bo = [];
function __(e) {
  !ol || bo.length ? (bo.push(e), sl()) : (ol = !1, e(), sl());
}
let bc = -1;
function sl() {
  cancelAnimationFrame(bc), bc = requestAnimationFrame(() => {
    const e = bo.shift();
    e && e(), bo.length ? sl() : ol = !0;
  });
}
const Yi = {
  none: null,
  close: S_,
  block: k_,
  reposition: E_
}, x_ = ee({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Yi
  }
}, "VOverlay-scroll-strategies");
function C_(e, t) {
  if (!Te)
    return;
  let n;
  xn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = yl(), await De(), n.active && n.run(() => {
      var r;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (r = Yi[e.scrollStrategy]) == null || r.call(Yi, t, e, n);
    }));
  }), ht(() => {
    n == null || n.stop();
  });
}
function S_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  bh(e.targetEl.value ?? e.contentEl.value, t);
}
function k_(e, t) {
  var s;
  const n = (s = e.root.value) == null ? void 0 : s.offsetParent, r = [.../* @__PURE__ */ new Set([...mo(e.targetEl.value, t.contained ? n : void 0), ...mo(e.contentEl.value, t.contained ? n : void 0)])].filter((l) => !l.classList.contains("v-overlay-scroll-blocked")), i = window.innerWidth - document.documentElement.offsetWidth, o = ((l) => ta(l) && l)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), r.forEach((l, a) => {
    l.style.setProperty("--v-body-scroll-x", me(-l.scrollLeft)), l.style.setProperty("--v-body-scroll-y", me(-l.scrollTop)), l !== document.documentElement && l.style.setProperty("--v-scrollbar-offset", me(i)), l.classList.add("v-overlay-scroll-blocked");
  }), ht(() => {
    r.forEach((l, a) => {
      const u = parseFloat(l.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(l.style.getPropertyValue("--v-body-scroll-y")), f = l.style.scrollBehavior;
      l.style.scrollBehavior = "auto", l.style.removeProperty("--v-body-scroll-x"), l.style.removeProperty("--v-body-scroll-y"), l.style.removeProperty("--v-scrollbar-offset"), l.classList.remove("v-overlay-scroll-blocked"), l.scrollLeft = -u, l.scrollTop = -c, l.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function E_(e, t, n) {
  let r = !1, i = -1, o = -1;
  function s(l) {
    __(() => {
      var c, f;
      const a = performance.now();
      (f = (c = e.updateLocation).value) == null || f.call(c, l), r = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (l) => l() : requestIdleCallback)(() => {
    n.run(() => {
      bh(e.targetEl.value ?? e.contentEl.value, (l) => {
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
function bh(e, t) {
  const n = [document, ...mo(e)];
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
const ll = Symbol.for("vuetify:v-menu"), L_ = ee({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function M_(e, t) {
  let n = () => {
  };
  function r(s) {
    n == null || n();
    const l = Number(s ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = jw(l, () => {
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
const T_ = ee({
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
  ...L_()
}, "VOverlay-activator");
function V_(e, t) {
  let {
    isActive: n,
    isTop: r
  } = t;
  const i = Je("useActivator"), o = ie();
  let s = !1, l = !1, a = !0;
  const u = $(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = $(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = M_(e, (E) => {
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
      Nd(E.target, ":focus-visible") !== !1 && (l = !0, E.stopPropagation(), o.value = E.currentTarget || E.target, f());
    },
    onBlur: (E) => {
      l = !1, E.stopPropagation(), d();
    }
  }, m = $(() => {
    const E = {};
    return c.value && (E.onClick = g.onClick), e.openOnHover && (E.onMouseenter = g.onMouseenter, E.onMouseleave = g.onMouseleave), u.value && (E.onFocus = g.onFocus, E.onBlur = g.onBlur), E;
  }), p = $(() => {
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
      const P = Fe(ll, null);
      E.onClick = () => {
        n.value = !1, P == null || P.closeParents();
      };
    }
    return E;
  }), v = $(() => {
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
  xn(() => {
    b.value && De(() => {
      o.value = Kr(b.value);
    });
  });
  const k = ie(), y = $(() => e.target === "cursor" && h.value ? h.value : k.value ? Kr(k.value) : _h(e.target, i) || o.value), C = $(() => Array.isArray(y.value) ? void 0 : y.value);
  let T;
  return ae(() => !!e.activator, (E) => {
    E && Te ? (T = yl(), T.run(() => {
      I_(e, i, {
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
function I_(e, t, n) {
  let {
    activatorEl: r,
    activatorEvents: i
  } = n;
  ae(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = l(u);
      c && s(c);
    }
    a && De(() => o());
  }, {
    immediate: !0
  }), ae(() => e.activatorProps, () => {
    o();
  }), ht(() => {
    s();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Uw(a, fe(i.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && qw(a, fe(i.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = _h(a, t);
    return r.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, r.value;
  }
}
function _h(e, t) {
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
const al = Symbol.for("vuetify:display"), _c = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, $_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _c;
  return ut(_c, e);
};
function xc(e) {
  return Te && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function Cc(e) {
  return Te && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function Sc(e) {
  const t = Te && !e ? window.navigator.userAgent : "ssr";
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
    touch: Fw,
    ssr: t === "ssr"
  };
}
function A_(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: r
  } = $_(e), i = pe(Cc(t)), o = pe(Sc(t)), s = Mt({}), l = pe(xc(t));
  function a() {
    i.value = Cc(), l.value = xc();
  }
  function u() {
    a(), o.value = Sc();
  }
  return xn(() => {
    const c = l.value < n.sm, f = l.value < n.md && !c, d = l.value < n.lg && !(f || c), h = l.value < n.xl && !(d || f || c), g = l.value < n.xxl && !(h || d || f || c), m = l.value >= n.xxl, p = c ? "xs" : f ? "sm" : d ? "md" : h ? "lg" : g ? "xl" : "xxl", v = typeof r == "number" ? r : n[r], b = l.value < v;
    s.xs = c, s.sm = f, s.md = d, s.lg = h, s.xl = g, s.xxl = m, s.smAndUp = !c, s.mdAndUp = !(c || f), s.lgAndUp = !(c || f || d), s.xlAndUp = !(c || f || d || h), s.smAndDown = !(d || h || g || m), s.mdAndDown = !(h || g || m), s.lgAndDown = !(g || m), s.xlAndDown = !m, s.name = p, s.height = i.value, s.width = l.value, s.mobile = b, s.mobileBreakpoint = r, s.platform = o.value, s.thresholds = n;
  }), Te && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...El(s),
    update: u,
    ssr: !!t
  };
}
const P_ = ee({
  mobileBreakpoint: [Number, String]
}, "display");
function xh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = Fe(al);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const r = $(() => {
    if (!e.mobileBreakpoint)
      return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o;
  }), i = $(() => t ? {
    [`${t}--mobile`]: r.value
  } : {});
  return {
    ...n,
    displayClasses: i,
    mobile: r
  };
}
function R_() {
  if (!Te)
    return pe(!1);
  const {
    ssr: e
  } = xh();
  if (e) {
    const t = pe(!1);
    return Cn(() => {
      t.value = !0;
    }), t;
  } else
    return pe(!0);
}
const Ch = ee({
  eager: Boolean
}, "lazy");
function Sh(e, t) {
  const n = pe(!1), r = $(() => n.value || e.eager || t.value);
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
function gi() {
  const t = Je("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const kc = Symbol.for("vuetify:stack"), Mr = Mt([]);
function N_(e, t, n) {
  const r = Je("useStack"), i = !n, o = Fe(kc, void 0), s = Mt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Bt(kc, s);
  const l = pe(+t.value);
  vr(e, () => {
    var f;
    const c = (f = Mr.at(-1)) == null ? void 0 : f[1];
    l.value = c ? c + 10 : +t.value, i && Mr.push([r.uid, l.value]), o == null || o.activeChildren.add(r.uid), ht(() => {
      if (i) {
        const d = ve(Mr).findIndex((h) => h[0] === r.uid);
        Mr.splice(d, 1);
      }
      o == null || o.activeChildren.delete(r.uid);
    });
  });
  const a = pe(!0);
  i && xn(() => {
    var f;
    const c = ((f = Mr.at(-1)) == null ? void 0 : f[0]) === r.uid;
    setTimeout(() => a.value = c);
  });
  const u = $(() => !s.activeChildren.size);
  return {
    globalTop: ti(a),
    localTop: u,
    stackStyles: $(() => ({
      zIndex: l.value
    }))
  };
}
function O_(e) {
  return {
    teleportTarget: $(() => {
      const n = e.value;
      if (n === !0 || !Te)
        return;
      const r = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (r == null)
        return;
      let i = r.querySelector(":scope > .v-overlay-container");
      return i || (i = document.createElement("div"), i.className = "v-overlay-container", r.appendChild(i)), i;
    })
  };
}
function F_() {
  return !0;
}
function kh(e, t, n) {
  if (!e || Eh(e, n) === !1)
    return !1;
  const r = Wd(t);
  if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && r.host === e.target)
    return !1;
  const i = (typeof n.value == "object" && n.value.include || (() => []))();
  return i.push(t), !i.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Eh(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || F_)(e);
}
function B_(e, t, n) {
  const r = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && kh(e, t, n) && setTimeout(() => {
    Eh(e, n) && r && r(e);
  }, 0);
}
function Ec(e, t) {
  const n = Wd(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const D_ = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (i) => B_(i, e, t), r = (i) => {
      e._clickOutside.lastMousedownWasOutside = kh(i, e, t);
    };
    Ec(e, (i) => {
      i.addEventListener("click", n, !0), i.addEventListener("mousedown", r, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: r
    };
  },
  unmounted(e, t) {
    e._clickOutside && (Ec(e, (n) => {
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
function H_(e) {
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
const mi = ee({
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
  ...T_(),
  ...ke(),
  ...Uo(),
  ...Ch(),
  ...v_(),
  ...x_(),
  ...ze(),
  ...es()
}, "VOverlay"), _n = le()({
  name: "VOverlay",
  directives: {
    ClickOutside: D_
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...mi()
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
    const o = Be(e, "modelValue"), s = $({
      get: () => o.value,
      set: (te) => {
        te && e.disabled || (o.value = te);
      }
    }), {
      teleportTarget: l
    } = O_($(() => e.attach || e.contained)), {
      themeClasses: a
    } = rt(e), {
      rtlClasses: u,
      isRtl: c
    } = Sn(), {
      hasContent: f,
      onAfterLeave: d
    } = Sh(e, s), h = Wn($(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: g,
      localTop: m,
      stackStyles: p
    } = N_(s, we(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: v,
      activatorRef: b,
      target: k,
      targetEl: y,
      targetRef: C,
      activatorEvents: T,
      contentEvents: E,
      scrimEvents: P
    } = V_(e, {
      isActive: s,
      isTop: m
    }), {
      dimensionStyles: O
    } = qo(e), F = R_(), {
      scopeId: j
    } = gi();
    ae(() => e.disabled, (te) => {
      te && (s.value = !1);
    });
    const R = ie(), N = ie(), {
      contentStyles: _,
      updateLocation: B
    } = p_(e, {
      isRtl: c,
      contentEl: N,
      target: k,
      isActive: s
    });
    C_(e, {
      root: R,
      contentEl: N,
      targetEl: y,
      isActive: s,
      updateLocation: B
    });
    function I(te) {
      i("click:outside", te), e.persistent ? q() : s.value = !1;
    }
    function H() {
      return s.value && g.value;
    }
    Te && ae(s, (te) => {
      te ? window.addEventListener("keydown", z) : window.removeEventListener("keydown", z);
    }, {
      immediate: !0
    }), Jt(() => {
      Te && window.removeEventListener("keydown", z);
    });
    function z(te) {
      var ue, xe;
      te.key === "Escape" && g.value && (e.persistent ? q() : (s.value = !1, (ue = N.value) != null && ue.contains(document.activeElement) && ((xe = v.value) == null || xe.focus())));
    }
    const K = Kb();
    vr(() => e.closeOnBack, () => {
      Xb(K, (te) => {
        g.value && s.value ? (te(!1), e.persistent ? q() : s.value = !1) : te();
      });
    });
    const X = ie();
    ae(() => s.value && (e.absolute || e.contained) && l.value == null, (te) => {
      if (te) {
        const ue = bb(R.value);
        ue && ue !== document.scrollingElement && (X.value = ue.scrollTop);
      }
    });
    function q() {
      e.noClickAnimation || N.value && Nn(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Jr
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
      }), F.value && f.value && w(Mm, {
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
        }, j, r), [w(H_, fe({
          color: h,
          modelValue: s.value && !!e.scrim
        }, P.value), null), w(mn, {
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
            })]), [[Yn, s.value], [qn("click-outside"), {
              handler: I,
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
}), ks = Symbol("Forwarded refs");
function Es(e, t) {
  let n = e;
  for (; n; ) {
    const r = Reflect.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = Object.getPrototypeOf(n);
  }
}
function xr(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return e[ks] = n, new Proxy(e, {
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
          const u = Es(a.value, o) ?? ("_" in a.value ? Es((l = a.value._) == null ? void 0 : l.setupState, o) : void 0);
          if (u)
            return u;
        }
        for (const a of n) {
          const u = a.value && a.value[ks];
          if (!u)
            continue;
          const c = u.slice();
          for (; c.length; ) {
            const f = c.shift(), d = Es(f.value, o);
            if (d)
              return d;
            const h = f.value && f.value[ks];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const z_ = ee({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...mi({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: vh
    },
    zIndex: 2400
  })
}, "VDialog"), Lh = le()({
  name: "VDialog",
  props: z_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), {
      scopeId: i
    } = gi(), o = ie();
    function s(a) {
      var f, d;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((f = o.value) != null && f.contentEl) && // We're the topmost dialog
      ((d = o.value) != null && d.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Xr(o.value.contentEl);
        if (!h.length)
          return;
        const g = h[0], m = h[h.length - 1];
        u === g ? m.focus() : g.focus();
      }
    }
    Te && ae(() => r.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", s) : document.removeEventListener("focusin", s);
    }, {
      immediate: !0
    }), ae(r, async (a) => {
      var u, c;
      await De(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const l = $(() => fe({
      "aria-haspopup": "dialog",
      "aria-expanded": String(r.value)
    }, e.activatorProps));
    return ye(() => {
      const a = _n.filterProps(e);
      return w(_n, fe({
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
          return w(Ye, {
            root: "VDialog"
          }, {
            default: () => {
              var d;
              return [(d = n.default) == null ? void 0 : d.call(n, ...c)];
            }
          });
        }
      });
    }), xr({}, o);
  }
});
function Lc(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function Mc(e) {
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
function j_(e) {
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
const W_ = Symbol.for("vuetify:v-slide-group"), ma = ee({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: W_
  },
  nextIcon: {
    type: $e,
    default: "$next"
  },
  prevIcon: {
    type: $e,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...ke(),
  ...P_(),
  ...nt(),
  ...ra({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), _o = le()({
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
    } = Sn(), {
      displayClasses: i,
      mobile: o
    } = xh(e), s = Wo(e, e.symbol), l = pe(!1), a = pe(0), u = pe(0), c = pe(0), f = $(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: h
    } = tl(), {
      resizeRef: g,
      contentRect: m
    } = tl(), p = $(() => s.selected.value.length ? s.items.value.findIndex((q) => q.id === s.selected.value[0]) : -1), v = $(() => s.selected.value.length ? s.items.value.findIndex((q) => q.id === s.selected.value[s.selected.value.length - 1]) : -1);
    if (Te) {
      let q = -1;
      ae(() => [s.selected.value, h.value, m.value, f.value], () => {
        cancelAnimationFrame(q), q = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const J = f.value ? "width" : "height";
            u.value = h.value[J], c.value = m.value[J], l.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && g.value) {
            const J = g.value.children[v.value];
            p.value === 0 || !l.value ? a.value = 0 : e.centerActive ? a.value = j_({
              selectedElement: J,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              isHorizontal: f.value
            }) : l.value && (a.value = Mc({
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
              a.value = Mc({
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
          (J = Xr(g.value)[0]) == null || J.focus();
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
      a.value = fo(J, 0, c.value - u.value);
    }
    const I = $(() => {
      let q = a.value > c.value - u.value ? -(c.value - u.value) + Lc(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (q = Lc(-a.value));
      const J = r.value && f.value ? -1 : 1;
      return {
        transform: `translate${f.value ? "X" : "Y"}(${J * q}px)`,
        transition: b.value ? "none" : "",
        willChange: b.value ? "transform" : ""
      };
    }), H = $(() => ({
      next: s.next,
      prev: s.prev,
      select: s.select,
      isSelected: s.isSelected
    })), z = $(() => {
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
    }), K = $(() => Math.abs(a.value) > 0), X = $(() => c.value > Math.abs(a.value) + u.value);
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
        }, [((q = n.prev) == null ? void 0 : q.call(n, H.value)) ?? w(pc, null, {
          default: () => [w(Ke, {
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
          style: I.value,
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
        }, [((te = n.next) == null ? void 0 : te.call(n, H.value)) ?? w(pc, null, {
          default: () => [w(Ke, {
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
}), Mh = Symbol.for("vuetify:v-chip-group"), G_ = ee({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: li
  },
  ...ma(),
  ...ke(),
  ...ra({
    selectedClass: "v-chip--selected"
  }),
  ...nt(),
  ...ze(),
  ...Kn({
    variant: "tonal"
  })
}, "VChipGroup");
le()({
  name: "VChipGroup",
  props: G_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      isSelected: i,
      select: o,
      next: s,
      prev: l,
      selected: a
    } = Wo(e, Mh);
    return _r({
      VChip: {
        color: we(e, "color"),
        disabled: we(e, "disabled"),
        filter: we(e, "filter"),
        variant: we(e, "variant")
      }
    }), ye(() => {
      const u = _o.filterProps(e);
      return w(_o, fe(u, {
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
const U_ = ee({
  activeClass: String,
  appendAvatar: String,
  appendIcon: $e,
  closable: Boolean,
  closeIcon: {
    type: $e,
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
  prependIcon: $e,
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
  ...Do(),
  ...ke(),
  ...zt(),
  ...zo(),
  ...ia(),
  ...en(),
  ...da(),
  ...di(),
  ...nt({
    tag: "span"
  }),
  ...ze(),
  ...Kn({
    variant: "tonal"
  })
}, "VChip"), q_ = le()({
  name: "VChip",
  directives: {
    Ripple: Jo
  },
  props: U_(),
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
    } = Yo(), {
      borderClasses: s
    } = Ho(e), {
      colorClasses: l,
      colorStyles: a,
      variantClasses: u
    } = fi(e), {
      densityClasses: c
    } = Qt(e), {
      elevationClasses: f
    } = jo(e), {
      roundedClasses: d
    } = tn(e), {
      sizeClasses: h
    } = hi(e), {
      themeClasses: g
    } = rt(e), m = Be(e, "modelValue"), p = oa(e, Mh, !1), v = fa(e, n), b = $(() => e.link !== !1 && v.isLink.value), k = $(() => !e.disabled && e.link !== !1 && (!!p || e.link || v.isClickable.value)), y = $(() => ({
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
          return [ci(k.value, "v-chip"), j && w(yh, {
            key: "filter"
          }, {
            default: () => [ft(w("div", {
              class: "v-chip__filter"
            }, [i.filter ? w(Ye, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, i.filter) : w(Ke, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Yn, p.isSelected.value]])]
          }), N && w("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [i.prepend ? w(Ye, {
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
          }, i.prepend) : w(Se, null, [e.prependIcon && w(Ke, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && w(wo, {
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
          }, [i.append ? w(Ye, {
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
          }, i.append) : w(Se, null, [e.appendIcon && w(Ke, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(wo, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), F && w("button", fe({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, y.value), [i.close ? w(Ye, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, i.close) : w(Ke, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[qn("ripple"), k.value && e.ripple, null]]);
    };
  }
}), Y_ = ee({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ke(),
  ...es({
    transition: {
      component: ph
    }
  })
}, "VCounter"), K_ = le()({
  name: "VCounter",
  functional: !0,
  props: Y_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = $(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ye(() => w(mn, {
      transition: e.transition
    }, {
      default: () => [ft(w("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: r.value,
        max: e.max,
        value: e.value
      }) : r.value]), [[Yn, e.active]])]
    })), {};
  }
}), X_ = ee({
  text: String,
  onClick: Yt(),
  ...ke(),
  ...ze()
}, "VLabel"), Th = le()({
  name: "VLabel",
  props: X_(),
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
}), Z_ = ee({
  floating: Boolean,
  ...ke()
}, "VFieldLabel"), Pi = le()({
  name: "VFieldLabel",
  props: Z_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ye(() => w(Th, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Vh(e) {
  const {
    t
  } = Yo();
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
    return w(Ke, {
      icon: e[`${i}Icon`],
      "aria-label": l,
      onClick: s
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Ih = ee({
  focused: Boolean,
  "onUpdate:focused": Yt()
}, "focus");
function va(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht();
  const n = Be(e, "focused"), r = $(() => ({
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
const J_ = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], $h = ee({
  appendInnerIcon: $e,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: $e,
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
  prependInnerIcon: $e,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => J_.includes(e)
  },
  "onClick:clear": Yt(),
  "onClick:appendInner": Yt(),
  "onClick:prependInner": Yt(),
  ...ke(),
  ...la(),
  ...en(),
  ...ze()
}, "VField"), Ah = le()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Ih(),
    ...$h()
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
    } = rt(e), {
      loaderClasses: s
    } = Zo(e), {
      focusClasses: l,
      isFocused: a,
      focus: u,
      blur: c
    } = va(e), {
      InputIcon: f
    } = Vh(e), {
      roundedClasses: d
    } = tn(e), {
      rtlClasses: h
    } = Sn(), g = $(() => e.dirty || e.active), m = $(() => !e.singleLine && !!(e.label || i.label)), p = Vt(), v = $(() => e.id || `input-${p}`), b = $(() => `${v.value}-messages`), k = ie(), y = ie(), C = ie(), T = $(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: E,
      backgroundColorStyles: P
    } = Wn(we(e, "bgColor")), {
      textColorClasses: O,
      textColorStyles: F
    } = bn($(() => e.error || e.disabled ? void 0 : g.value && a.value ? e.color : e.baseColor));
    ae(g, (N) => {
      if (m.value) {
        const _ = k.value.$el, B = y.value.$el;
        requestAnimationFrame(() => {
          const I = Jl(_), H = B.getBoundingClientRect(), z = H.x - I.x, K = H.y - I.y - (I.height / 2 - H.height / 2), X = H.width / 0.75, q = Math.abs(X - I.width) > 1 ? {
            maxWidth: me(X)
          } : void 0, J = getComputedStyle(_), te = getComputedStyle(B), ue = parseFloat(J.transitionDuration) * 1e3 || 150, xe = parseFloat(te.getPropertyValue("--v-field-label-scale")), he = te.getPropertyValue("color");
          _.style.visibility = "visible", B.style.visibility = "hidden", Nn(_, {
            transform: `translate(${z}px, ${K}px) scale(${xe})`,
            color: he,
            ...q
          }, {
            duration: ue,
            easing: Jr,
            direction: N ? "normal" : "reverse"
          }).finished.then(() => {
            _.style.removeProperty("visibility"), B.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const j = $(() => ({
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
      const N = e.variant === "outlined", _ = i["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || i.clear), I = !!(i["append-inner"] || e.appendInnerIcon || B), H = () => i.label ? i.label({
        ...j.value,
        label: e.label,
        props: {
          for: v.value
        }
      }) : e.label;
      return w("div", fe({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": I,
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
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && w(Pi, {
        key: "floating-label",
        ref: y,
        class: [O.value],
        floating: !0,
        for: v.value,
        style: F.value
      }, {
        default: () => [H()]
      }), w(Pi, {
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
      })]), B && w(yh, {
        key: "clear"
      }, {
        default: () => [ft(w("div", {
          class: "v-field__clearable",
          onMousedown: (q) => {
            q.preventDefault(), q.stopPropagation();
          }
        }, [i.clear ? i.clear() : w(f, {
          name: "clear"
        }, null)]), [[Yn, e.dirty]])]
      }), I && w("div", {
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
      }, [w(Pi, {
        ref: y,
        floating: !0,
        for: v.value
      }, {
        default: () => [H()]
      })]), w("div", {
        class: "v-field__outline__end"
      }, null)]), T.value && m.value && w(Pi, {
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
function Q_(e) {
  const t = Object.keys(Ah.props).filter((n) => !Kl(n) && n !== "class" && n !== "style");
  return Id(e, t);
}
const e2 = ee({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ke(),
  ...es({
    transition: {
      component: ph,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), t2 = le()({
  name: "VMessages",
  props: e2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = $(() => qt(e.messages)), {
      textColorClasses: i,
      textColorStyles: o
    } = bn($(() => e.color));
    return ye(() => w(mn, {
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
}), n2 = Symbol.for("vuetify:form");
function r2() {
  return Fe(n2, null);
}
const i2 = ee({
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
  ...Ih()
}, "validation");
function o2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ht(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Vt();
  const r = Be(e, "modelValue"), i = $(() => e.validationValue === void 0 ? r.value : e.validationValue), o = r2(), s = ie([]), l = pe(!0), a = $(() => !!(qt(r.value === "" ? null : r.value).length || qt(i.value === "" ? null : i.value).length)), u = $(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = $(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = $(() => {
    var y;
    return (y = e.errorMessages) != null && y.length ? qt(e.errorMessages).concat(s.value).slice(0, Math.max(0, +e.maxErrors)) : s.value;
  }), d = $(() => {
    let y = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    y === "lazy" && (y = "input lazy");
    const C = new Set((y == null ? void 0 : y.split(" ")) ?? []);
    return {
      blur: C.has("blur") || C.has("input"),
      input: C.has("input"),
      submit: C.has("submit"),
      lazy: C.has("lazy")
    };
  }), h = $(() => {
    var y;
    return e.error || (y = e.errorMessages) != null && y.length ? !1 : e.rules.length ? l.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), g = pe(!1), m = $(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = $(() => e.name ?? Nt(n));
  Il(() => {
    o == null || o.register({
      id: p.value,
      validate: k,
      reset: v,
      resetValidation: b
    });
  }), Jt(() => {
    o == null || o.unregister(p.value);
  }), Cn(async () => {
    d.value.lazy || await k(!0), o == null || o.update(p.value, h.value, f.value);
  }), vr(() => d.value.input, () => {
    ae(i, () => {
      if (i.value != null)
        k();
      else if (e.focused) {
        const y = ae(() => e.focused, (C) => {
          C || k(), y();
        });
      }
    });
  }), vr(() => d.value.blur, () => {
    ae(() => e.focused, (y) => {
      y || k();
    });
  }), ae([h, f], () => {
    o == null || o.update(p.value, h.value, f.value);
  });
  function v() {
    r.value = null, De(b);
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
  appendIcon: $e,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: $e,
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
  ...i2()
}, "VInput"), xo = le()({
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
    } = Sn(), {
      InputIcon: l
    } = Vh(e), a = Vt(), u = $(() => e.id || `input-${a}`), c = $(() => `${u.value}-messages`), {
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
    } = o2(e, "v-input", u), T = $(() => ({
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
    })), E = $(() => {
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
      }, [w(t2, {
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
}), s2 = ee({
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
  ...$h({
    clearable: !0
  })
}, "VFileInput"), l2 = le()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: s2(),
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
    } = Yo(), s = Be(e, "modelValue"), {
      isFocused: l,
      focus: a,
      blur: u
    } = va(e), c = $(() => typeof e.showSize != "boolean" ? e.showSize : void 0), f = $(() => (s.value ?? []).reduce((O, F) => {
      let {
        size: j = 0
      } = F;
      return O + j;
    }, 0)), d = $(() => ju(f.value, c.value)), h = $(() => (s.value ?? []).map((O) => {
      const {
        name: F = "",
        size: j = 0
      } = O;
      return e.showSize ? `${F} (${ju(j, c.value)})` : F;
    })), g = $(() => {
      var F;
      const O = ((F = s.value) == null ? void 0 : F.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, O, d.value) : o(e.counterString, O);
    }), m = ie(), p = ie(), v = ie(), b = $(() => l.value || e.active), k = $(() => ["plain", "underlined"].includes(e.variant));
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
      O.stopPropagation(), y(), De(() => {
        s.value = [], zw(e["onClick:clear"], O);
      });
    }
    return ae(s, (O) => {
      (!Array.isArray(O) || !O.length) && v.value && (v.value.value = "");
    }), ye(() => {
      const O = !!(i.counter || e.counter), F = !!(O || i.details), [j, R] = Xl(n), {
        modelValue: N,
        ..._
      } = xo.filterProps(e), B = Q_(e);
      return w(xo, fe({
        ref: m,
        modelValue: s.value,
        "onUpdate:modelValue": (I) => s.value = I,
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
        default: (I) => {
          let {
            id: H,
            isDisabled: z,
            isDirty: K,
            isReadonly: X,
            isValid: q
          } = I;
          return w(Ah, fe({
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
              }) : e.chips ? h.value.map((he) => w(q_, {
                key: he,
                size: "small",
                color: e.color
              }, {
                default: () => [he]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: F ? (I) => {
          var H, z;
          return w(Se, null, [(H = i.details) == null ? void 0 : H.call(i, I), O && w(Se, null, [w("span", null, null), w(K_, {
            active: !!((z = s.value) != null && z.length),
            value: g.value
          }, i.counter)])]);
        } : void 0
      });
    }), xr({}, m, p, v);
  }
}), a2 = ee({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...ke(),
  ...nt()
}, "VContainer"), Tc = le()({
  name: "VContainer",
  props: a2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: r
    } = Sn();
    return ye(() => w(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), Ph = Bo("v-spacer", "div", "VSpacer");
function u2(e) {
  const t = pe(e);
  let n = -1;
  function r() {
    clearInterval(n);
  }
  function i() {
    r(), De(() => t.value = e);
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
const c2 = ee({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Ko({
    location: "bottom"
  }),
  ...ua(),
  ...en(),
  ...Kn(),
  ...ze(),
  ...ai(mi({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), f2 = le()({
  name: "VSnackbar",
  props: c2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), {
      locationStyles: i
    } = Xo(e), {
      positionClasses: o
    } = ca(e), {
      scopeId: s
    } = gi(), {
      themeClasses: l
    } = rt(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = fi(e), {
      roundedClasses: f
    } = tn(e), d = u2(Number(e.timeout)), h = ie(), g = ie(), m = pe(!1);
    ae(r, v), ae(() => e.timeout, v), Cn(() => {
      r.value && v();
    });
    let p = -1;
    function v() {
      d.reset(), window.clearTimeout(p);
      const C = Number(e.timeout);
      if (!r.value || C === -1)
        return;
      const T = Kr(g.value);
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
      const C = _n.filterProps(e), T = !!(n.default || n.text || e.text);
      return w(_n, fe({
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
          return [ci(!1, "v-snackbar"), e.timer && !m.value && w("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [w(th, {
            ref: g,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), T && w("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((E = n.text) == null ? void 0 : E.call(n)) ?? e.text, (P = n.default) == null ? void 0 : P.call(n)]), n.actions && w(Ye, {
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
    }), xr({}, h);
  }
}), Rh = Symbol.for("vuetify:v-tabs"), d2 = ee({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...ai(ch({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), ul = le()({
  name: "VTab",
  props: d2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: r
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: o
    } = bn(e, "sliderColor"), s = ie(), l = ie(), a = $(() => e.direction === "horizontal"), u = $(() => {
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
        Nn(p, {
          backgroundColor: [v, "currentcolor"],
          transform: [`translate${C}(${F}px) scale${C}(${_})`, `translate${C}(${F / B}px) scale${C}(${(N - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(j)
        }, {
          duration: 225,
          easing: Jr
        });
      }
    }
    return ye(() => {
      const f = ct.filterProps(e);
      return w(ct, fe({
        symbol: Rh,
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
    }), xr({}, s);
  }
});
function h2(e) {
  return e ? e.map((t) => co(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const g2 = ee({
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
  ...nt()
}, "VTabs"), m2 = le()({
  name: "VTabs",
  props: g2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), i = $(() => h2(e.items)), {
      densityClasses: o
    } = Qt(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: l
    } = Wn(we(e, "bgColor"));
    return _r({
      VTab: {
        color: we(e, "color"),
        direction: we(e, "direction"),
        stacked: we(e, "stacked"),
        fixed: we(e, "fixedTabs"),
        sliderColor: we(e, "sliderColor"),
        hideSlider: we(e, "hideSlider")
      }
    }), ye(() => {
      const a = _o.filterProps(e);
      return w(_o, fe(a, {
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
        symbol: Rh
      }), {
        default: () => [n.default ? n.default() : i.value.map((u) => w(ul, fe(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), v2 = ee({
  id: String,
  text: String,
  ...ai(mi({
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
}, "VTooltip"), cr = le()({
  name: "VTooltip",
  props: v2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), {
      scopeId: i
    } = gi(), o = Vt(), s = $(() => e.id || `v-tooltip-${o}`), l = ie(), a = $(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = $(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = $(() => e.transition ? e.transition : r.value ? "scale-transition" : "fade-transition"), f = $(() => fe({
      "aria-describedby": s.value
    }, e.activatorProps));
    return ye(() => {
      const d = _n.filterProps(e);
      return w(_n, fe({
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
    }), xr({}, l);
  }
}), p2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: r,
    touchendY: i
  } = e, o = 0.5, s = 16;
  e.offsetX = n - t, e.offsetY = i - r, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - s && e.left(e), e.right && n > t + s && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && i < r - s && e.up(e), e.down && i > r + s && e.down(e));
};
function y2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (r = t.start) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function w2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (r = t.end) == null || r.call(t, {
    originalEvent: e,
    ...t
  }), p2(t);
}
function b2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (r = t.move) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function _2() {
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
    touchstart: (n) => y2(n, t),
    touchend: (n) => w2(n, t),
    touchmove: (n) => b2(n, t)
  };
}
function x2(e, t) {
  var l;
  const n = t.value, r = n != null && n.parent ? e.parentElement : e, i = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!r || !o)
    return;
  const s = _2(t.value);
  r._touchHandlers = r._touchHandlers ?? /* @__PURE__ */ Object.create(null), r._touchHandlers[o] = s, Vd(s).forEach((a) => {
    r.addEventListener(a, s[a], i);
  });
}
function C2(e, t) {
  var o, s;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, r = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!(n != null && n._touchHandlers) || !r)
    return;
  const i = n._touchHandlers[r];
  Vd(i).forEach((l) => {
    n.removeEventListener(l, i[l]);
  }), delete n._touchHandlers[r];
}
const Nh = {
  mounted: x2,
  unmounted: C2
}, S2 = Nh, Oh = Symbol.for("vuetify:v-window"), Fh = Symbol.for("vuetify:v-window-group"), k2 = ee({
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
  ...nt(),
  ...ze()
}, "VWindow"), E2 = le()({
  name: "VWindow",
  directives: {
    Touch: Nh
  },
  props: k2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      isRtl: i
    } = Sn(), {
      t: o
    } = Yo(), s = Wo(e, Fh), l = ie(), a = $(() => i.value ? !e.reverse : e.reverse), u = pe(!1), c = $(() => {
      const y = e.direction === "vertical" ? "y" : "x", T = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${y}${T}-transition`;
    }), f = pe(0), d = ie(void 0), h = $(() => s.items.value.findIndex((y) => s.selected.value.includes(y.id)));
    ae(h, (y, C) => {
      const T = s.items.value.length, E = T - 1;
      T <= 2 ? u.value = y < C : y === E && C === 0 ? u.value = !0 : y === 0 && C === E ? u.value = !1 : u.value = y < C;
    }), Bt(Oh, {
      transition: c,
      isReversed: u,
      transitionCount: f,
      transitionHeight: d,
      rootRef: l
    });
    const g = $(() => e.continuous || h.value !== 0), m = $(() => e.continuous || h.value !== s.items.value.length - 1);
    function p() {
      g.value && s.prev();
    }
    function v() {
      m.value && s.next();
    }
    const b = $(() => {
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
    }), k = $(() => e.touch === !1 ? e.touch : {
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
    }), [[qn("touch"), k.value]])), {
      group: s
    };
  }
});
function L2() {
  const e = pe(!1);
  return Cn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: $(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ti(e)
  };
}
const M2 = ee({
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
  ...Ch()
}, "VWindowItem"), Vc = le()({
  name: "VWindowItem",
  directives: {
    Touch: S2
  },
  props: M2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Fe(Oh), i = oa(e, Fh), {
      isBooted: o
    } = L2();
    if (!r || !i)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const s = pe(!1), l = $(() => o.value && (r.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
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
      s.value && De(() => {
        !l.value || !s.value || !r || (r.transitionHeight.value = me(g.clientHeight));
      });
    }
    const d = $(() => {
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
    } = Sh(e, i.isSelected);
    return ye(() => w(mn, {
      transition: d.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [ft(w("div", {
          class: ["v-window-item", i.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((g = n.default) == null ? void 0 : g.call(n))]), [[Yn, i.isSelected.value]])];
      }
    })), {
      groupItem: i
    };
  }
}), T2 = /* @__PURE__ */ Pe("h3", { class: "heading" }, "Select File", -1), V2 = /* @__PURE__ */ Pe("b", null, "replace", -1), I2 = /* @__PURE__ */ Pe("h3", { class: "heading" }, "Preview", -1), $2 = /* @__PURE__ */ Pe("b", null, "copy", -1), A2 = /* @__PURE__ */ wr({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, r = t, i = ie(!1), o = ie(0), s = ie(), l = ie(!1), a = $(
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
    return (h, g) => (zn(), Io(Lh, {
      modelValue: i.value,
      "onUpdate:modelValue": g[6] || (g[6] = (m) => i.value = m),
      "max-width": "800px"
    }, {
      activator: de(({ props: m }) => [
        w(cr, {
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
            w(Qo, null, {
              default: de(() => [
                w(m2, {
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
                        We("Import")
                      ]),
                      _: 1
                    }),
                    w(ul, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: de(() => [
                        We("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            w(qi, null, {
              default: de(() => [
                w(E2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": g[2] || (g[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: de(() => [
                    w(Vc, null, {
                      default: de(() => [
                        T2,
                        w(l2, {
                          modelValue: s.value,
                          "onUpdate:modelValue": g[1] || (g[1] = (m) => s.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        w(qi, null, {
                          default: de(() => [
                            We(" The import is limited to files in trivial graph format. Importing will "),
                            V2,
                            We(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    w(Vc, null, {
                      default: de(() => [
                        I2,
                        Pe("pre", null, Tn(n.graphAsTgf), 1),
                        w(qi, null, {
                          default: de(() => [
                            We("This export action will "),
                            $2,
                            We(" the graph in trivial graph format to your clipboard.")
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
                w(Ph),
                w(ct, {
                  color: "secondary",
                  variant: "text",
                  disabled: !a.value,
                  onClick: g[3] || (g[3] = (m) => f())
                }, {
                  default: de(() => [
                    We("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                w(ct, {
                  color: "secondary",
                  variant: "text",
                  onClick: g[4] || (g[4] = (m) => d())
                }, {
                  default: de(() => [
                    We("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        w(f2, {
          modelValue: l.value,
          "onUpdate:modelValue": g[5] || (g[5] = (m) => l.value = m),
          timeout: 1500
        }, {
          default: de(() => [
            We("Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), P2 = ".heading{margin-top:10px;margin-bottom:10px}", ya = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, R2 = /* @__PURE__ */ ya(A2, [["styles", [P2]]]), N2 = ee({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...ai(mi({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: vh
    }
  }), ["absolute"])
}, "VMenu"), O2 = le()({
  name: "VMenu",
  props: N2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), {
      scopeId: i
    } = gi(), o = Vt(), s = $(() => e.id || `v-menu-${o}`), l = ie(), a = Fe(ll, null), u = pe(0);
    Bt(ll, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Ww(m, l.value.contentEl)) && (r.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var b, k, y;
      const p = m.relatedTarget, v = m.target;
      await De(), r.value && p !== v && ((b = l.value) != null && b.contentEl) && // We're the topmost menu
      ((k = l.value) != null && k.globalTop) && // It isn't the document or the menu body
      ![document, l.value.contentEl].includes(v) && // It isn't inside the menu body
      !l.value.contentEl.contains(v) && ((y = Xr(l.value.contentEl)[0]) == null || y.focus());
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
      e.disabled || m.key === "Tab" && (Rd(Xr((p = l.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (y) => y.tabIndex >= 0) || (r.value = !1, (b = (v = l.value) == null ? void 0 : v.activatorEl) == null || b.focus()));
    }
    function h(m) {
      var v;
      if (e.disabled)
        return;
      const p = (v = l.value) == null ? void 0 : v.contentEl;
      p && r.value ? m.key === "ArrowDown" ? (m.preventDefault(), Zs(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Zs(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (r.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const g = $(() => fe({
      "aria-haspopup": "menu",
      "aria-expanded": String(r.value),
      "aria-owns": s.value,
      onKeydown: h
    }, e.activatorProps));
    return ye(() => {
      const m = _n.filterProps(e);
      return w(_n, fe({
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
          return w(Ye, {
            root: "VMenu"
          }, {
            default: () => {
              var k;
              return [(k = n.default) == null ? void 0 : k.call(n, ...v)];
            }
          });
        }
      });
    }), xr({
      id: s,
      ΨopenChildren: u
    }, l);
  }
}), Bh = Symbol.for("vuetify:selection-control-group"), Dh = ee({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: $e,
  trueIcon: $e,
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
    default: li
  },
  ...ke(),
  ...zt(),
  ...ze()
}, "SelectionControlGroup"), F2 = ee({
  ...Dh({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
le()({
  name: "VSelectionControlGroup",
  props: F2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(e, "modelValue"), i = Vt(), o = $(() => e.id || `v-selection-control-group-${i}`), s = $(() => e.name || o.value), l = /* @__PURE__ */ new Set();
    return Bt(Bh, {
      modelValue: r,
      forceUpdate: () => {
        l.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        l.add(a), ht(() => {
          l.delete(a);
        });
      }
    }), _r({
      [e.defaultsTarget]: {
        color: we(e, "color"),
        disabled: we(e, "disabled"),
        density: we(e, "density"),
        error: we(e, "error"),
        inline: we(e, "inline"),
        modelValue: r,
        multiple: $(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)),
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
const Hh = ee({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ke(),
  ...Dh()
}, "VSelectionControl");
function B2(e) {
  const t = Fe(Bh, void 0), {
    densityClasses: n
  } = Qt(e), r = Be(e, "modelValue"), i = $(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = $(() => e.falseValue !== void 0 ? e.falseValue : !1), s = $(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)), l = $({
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
  } = bn($(() => {
    if (!(e.error || e.disabled))
      return l.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = Wn($(() => l.value && !e.error && !e.disabled ? e.color : void 0)), d = $(() => l.value ? e.trueIcon : e.falseIcon);
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
const Ic = le()({
  name: "VSelectionControl",
  directives: {
    Ripple: Jo
  },
  inheritAttrs: !1,
  props: Hh(),
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
    } = B2(e), h = Vt(), g = pe(!1), m = pe(!1), p = ie(), v = $(() => e.id || `input-${h}`), b = $(() => !e.disabled && !e.readonly);
    i == null || i.onForceUpdate(() => {
      p.value && (p.value.checked = l.value);
    });
    function k(E) {
      b.value && (g.value = !0, Nd(E.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function y() {
      g.value = !1, m.value = !1;
    }
    function C(E) {
      E.stopPropagation();
    }
    function T(E) {
      b.value && (e.readonly && i && De(() => i.forceUpdate()), l.value = E.target.checked);
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
      })) ?? w(Se, null, [s.value && w(Ke, {
        key: "icon",
        icon: s.value
      }, null), F])]), [[qn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), E && w(Th, {
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
}), D2 = ee({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...pa(),
  ...Hh()
}, "VSwitch"), Ri = le()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: D2(),
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
    const i = Be(e, "indeterminate"), o = Be(e, "modelValue"), {
      loaderClasses: s
    } = Zo(e), {
      isFocused: l,
      focus: a,
      blur: u
    } = va(e), c = ie(), f = $(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = Vt(), h = $(() => e.id || `switch-${d}`);
    function g() {
      i.value && (i.value = !1);
    }
    function m(p) {
      var v, b;
      p.stopPropagation(), p.preventDefault(), (b = (v = c.value) == null ? void 0 : v.input) == null || b.click();
    }
    return ye(() => {
      const [p, v] = Xl(n), b = xo.filterProps(e), k = Ic.filterProps(e);
      return w(xo, fe({
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
          return w(Ic, fe({
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
              }, [r.thumb ? w(Ye, {
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
              }) : w(g_, null, {
                default: () => [e.loading ? w(aa, {
                  name: "v-switch",
                  active: !0,
                  color: O.value === !1 ? void 0 : f.value
                }, {
                  default: (I) => r.loader ? r.loader(I) : w(Zd, {
                    active: I.isActive,
                    color: I.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && w(Ke, {
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
}), H2 = /* @__PURE__ */ wr({
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
    const n = e, r = ie(!1), i = t, o = $({
      get: () => n.nodeLabelsEnabled,
      set: (u) => {
        i("toggle-node-labels", u);
      }
    }), s = $({
      get: () => n.physicsEnabled,
      set: (u) => {
        i("toggle-node-physics", u);
      }
    }), l = $({
      get: () => n.linkLabelsEnabled,
      set: (u) => {
        i("toggle-link-labels", u);
      }
    }), a = $({
      get: () => n.fixedLinkDistanceEnabled,
      set: (u) => {
        i("toggle-fixed-link-distance", u);
      }
    });
    return (u, c) => (zn(), Io(O2, {
      modelValue: r.value,
      "onUpdate:modelValue": c[4] || (c[4] = (f) => r.value = f),
      "close-on-content-click": !1,
      transition: "slide-y-transition"
    }, {
      activator: de(({ props: f }) => [
        w(cr, {
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
            w(Qo, null, {
              default: de(() => [
                We(" Settings ")
              ]),
              _: 1
            }),
            w(il, null, {
              default: de(() => [
                We("Nodes")
              ]),
              _: 1
            }),
            w(Tc, null, {
              default: de(() => [
                w(Ri, {
                  modelValue: o.value,
                  "onUpdate:modelValue": c[0] || (c[0] = (f) => o.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                w(Ri, {
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
                We("Links")
              ]),
              _: 1
            }),
            w(Tc, null, {
              default: de(() => [
                w(Ri, {
                  modelValue: l.value,
                  "onUpdate:modelValue": c[2] || (c[2] = (f) => l.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                w(Ri, {
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
}), z2 = ee({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...ke(),
  ...zt(),
  ...nt(),
  ...ze()
}, "VTable"), j2 = le()({
  name: "VTable",
  props: z2(),
  setup(e, t) {
    let {
      slots: n,
      emit: r
    } = t;
    const {
      themeClasses: i
    } = rt(e), {
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
}), W2 = { class: "text-left" }, G2 = { class: "text-left" }, U2 = { class: "text-left" }, q2 = /* @__PURE__ */ wr({
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
    return (i, o) => (zn(), Io(Lh, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (s) => n.value = s),
      "max-width": "800px"
    }, {
      activator: de(({ props: s }) => [
        w(cr, {
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
            w(Qo, { class: "card-header" }, {
              default: de(() => [
                We("Controls")
              ]),
              _: 1
            }),
            w(j2, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: de(() => [
                Pe("thead", null, [
                  Pe("tr", null, [
                    Pe("th", W2, Tn(r[0]), 1),
                    Pe("th", G2, Tn(r[1]), 1),
                    Pe("th", U2, Tn(r[2]), 1)
                  ])
                ]),
                Pe("tbody", null, [
                  (zn(), Fs(Se, null, lm(t, (s) => Pe("tr", {
                    key: s.action
                  }, [
                    Pe("td", null, Tn(s.action), 1),
                    Pe("td", null, Tn(s.desktop), 1),
                    Pe("td", null, Tn(s.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            w(ha, null, {
              default: de(() => [
                w(Ph),
                w(ct, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (s) => n.value = !1)
                }, {
                  default: de(() => [
                    We(" Close ")
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
}), Y2 = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", K2 = /* @__PURE__ */ ya(q2, [["styles", [Y2]], ["__scopeId", "data-v-6c8401af"]]), X2 = /* @__PURE__ */ Pe("div", { class: "graph-host uninitialised" }, null, -1), Z2 = {
  key: 0,
  class: "button-container"
}, J2 = { class: "info-text text-h5 text-grey" }, Q2 = /* @__PURE__ */ wr({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = $(() => {
      const S = document.querySelectorAll("graph-editor");
      let V;
      for (let M = 0; M < S.length; M++) {
        const A = S[M], Q = St(A.shadowRoot).select(".graph-host.uninitialised");
        if (!Q.empty()) {
          Q.classed("uninitialised", !1), V = Q;
          break;
        }
      }
      return V === void 0 && (V = St(".graph-host.uninitialised"), V.classed("uninitialised", !1)), V;
    });
    Cn(() => {
      N(), window.addEventListener("resize", Y);
    }), $l(() => {
      window.removeEventListener("resize", Y);
    });
    const r = ie(new Vu()), i = ie(!1), o = Mt(iw);
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
      return r.value.toTGF(o.showNodeLabels, o.showLinkLabels, !0);
    }
    function T(S) {
      if (typeof S == "string" && S !== "Graph is empty")
        W(S);
      else if (typeof S == "object") {
        const [V, M] = Pw(S);
        Z(), U(V, M);
      } else
        Z();
    }
    function E() {
      console.log(r.value.toTGF(o.showNodeLabels, o.showLinkLabels));
    }
    function P(S, V) {
      if (!V) {
        h.selectAll("circle").each((A) => A.color = S).style("fill", S);
        return;
      }
      const M = Array.isArray(V) ? V : [V];
      for (const A of M)
        h.selectAll("circle").filter((G) => G.id === A).each((G) => G.color = S).style("fill", S);
    }
    function O(S, V) {
      if (Yy(f, o, S), !V) {
        d.selectAll(".link").each((A) => A.color = S).style("stroke", S);
        return;
      }
      const M = Array.isArray(V) ? V : [V];
      for (const A of M)
        d.selectAll(".link").filter((G) => G.id === A).each((G) => G.color = S).style("stroke", S);
    }
    function F(S) {
      const V = Array.isArray(S) ? S : [S];
      for (const M of V)
        h.selectAll("circle").filter((A) => A.id === M).each((A) => r.value.removeNode(A));
      i.value = r.value.nodes.length > 0;
    }
    function j(S) {
      const V = Array.isArray(S) ? S : [S];
      for (const M of V)
        d.selectAll("path").filter((A) => A.id === M).each((A) => r.value.removeLink(A));
    }
    function R(S) {
      S ? u.scaleExtent([0.5, 5]).on("zoom", (V) => _(V, !0)) : (Y(), u.scaleExtent([1, 1]).on("zoom", (V) => _(V, !1)));
    }
    function N() {
      l = n.value.node().clientWidth, a = n.value.node().clientHeight, u = zy((S) => _(S)), f = Wy(
        n.value,
        u,
        (S) => he(S),
        (S) => xe(S),
        (S) => {
          I(vt(S, f.node())[0], vt(S, f.node())[1]);
        }
      ), qy(f, o), g = Xy(f), d = Gy(f), h = Uy(f), s = Zy(r.value, o, l, a, () => H()), c = jy(s, l, a, o.nodeRadius), te();
    }
    function _(S, V = !0) {
      V && (b = S.transform.x, k = S.transform.y, y = S.transform.k, f.attr("transform", `translate(${b},${k})scale(${y})`));
    }
    function B(S, V, M) {
      r.value.createLink(S.id, V.id, M), te();
    }
    function I(S, V, M, A, G) {
      r.value.createNode(S ?? l / 2, V ?? a / 2, M, A, G), i.value = !0, te();
    }
    function H() {
      h.attr("transform", (S) => `translate(${S.x},${S.y})`), d.selectAll("path").attr("d", (S) => z(S)), J(), te();
    }
    function z(S) {
      switch (K(S), S.pathType) {
        case st.REFLEXIVE:
          return Ru(S.source, [l / 2, a / 2], o);
        case st.ARC:
          return ps(S.source, S.target, o);
        case st.ARCREVERSE:
          return Ou.reverse(ps(S.source, S.target, o));
        case st.LINE:
          return vs(S.source, S.target, o);
        case st.LINEREVERSE:
          return Ou.reverse(vs(S.source, S.target, o));
        default:
          return "";
      }
    }
    function K(S) {
      S.source.id === S.target.id ? S.pathType = st.REFLEXIVE : X(S.source, S.target) ? S.pathType = q(S.source, S.target) ? st.ARCREVERSE : st.ARC : S.pathType = q(S.source, S.target) ? st.LINEREVERSE : st.LINE;
    }
    function X(S, V) {
      return S.id !== V.id && r.value.links.some((M) => M.target.id === S.id && M.source.id === V.id) && r.value.links.some((M) => M.target.id === V.id && M.source.id === S.id);
    }
    function q(S, V) {
      return S.x > V.x;
    }
    function J() {
      const S = m;
      if (S !== void 0) {
        const V = p;
        if (V !== void 0)
          g.attr("d", () => S.id === V.id ? Ru(S, [l / 2, a / 2], o) : X(S, V) ? vs(S, V, o) : ps(S, V, o));
        else if (v !== void 0) {
          const M = [S.x, S.y];
          g.attr("d", Nu(M, v));
        }
      }
    }
    function te(S = 0.5) {
      d = d.data(r.value.links, (V) => V.id).join(
        (V) => {
          const M = V.append("g");
          return M.append("path").classed("link", !0).style("stroke", (A) => A.color ? A.color : "").attr("id", (A) => A.id).attr(
            "marker-end",
            (A) => A.color ? "url(#link-arrow-" + A.color : "url(#link-arrow)"
          ), M.append("path").classed("clickbox", !0).on("pointerdown", (A, G) => {
            let Q = G.color;
            A.button === 1 && (An(A), r.value.removeLink(G), Q && (r.value.linkColorExists(Q) || Ky(f, Q)));
          }), M.append("text").append("textPath").attr(
            "class",
            (A) => A.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (A) => `#${A.id}`).attr("startOffset", "50%").text((A) => A.label ? A.label : "add label").on("click", (A, G) => {
            Ne(A, G);
          }), M;
        },
        (V) => (V.selectChild("path").attr("marker-start", function(M) {
          var A;
          if ((A = M.pathType) != null && A.includes("REVERSE")) {
            let G = "url(#link-arrow-reverse";
            return M.color && (G += "-" + M.color), G += ")", G;
          } else
            return null;
        }).attr("marker-end", function(M) {
          var A;
          if ((A = M.pathType) != null && A.includes("REVERSE"))
            return null;
          {
            let G = "url(#link-arrow";
            return M.color && (G += "-" + M.color), G += ")", G;
          }
        }), V.selectChild("text").attr("class", (M) => {
          var A;
          return `${(A = M.pathType) == null ? void 0 : A.toLowerCase()}-path-text`;
        }).attr("dy", (M) => {
          var A;
          return M.pathType === st.REFLEXIVE ? 15 : M.pathType == st.LINEREVERSE ? -10 : (A = M.pathType) != null && A.includes("REVERSE") ? 20 : -10;
        }), V.selectChild("text").selectChild("textPath").classed("hidden", !o.showLinkLabels).attr("startOffset", (M) => {
          var A;
          return (A = M.pathType) != null && A.includes("REVERSE") ? "46%" : "50%";
        }), V)
      ), h = h.data(r.value.nodes, (V) => V.id).join(
        (V) => {
          const M = V.append("g").call(c).on("pointerdown", (A, G) => {
            A.button === 1 && (An(A), r.value.removeNode(G), i.value = r.value.nodes.length > 0, D(), te());
          });
          return M.append("circle").classed("node", !0).attr("id", (A) => A.id).attr("r", o.nodeRadius).style("fill", (A) => A.color ? A.color : "").on("mouseenter", (A, G) => p = G).on("mouseout", () => p = void 0).on("pointerdown", (A, G) => {
            ue(A, G);
          }).on("pointerup", (A) => {
            xe(A);
          }), M.append("text").attr(
            "class",
            (A) => A.label ? "node-label" : "node-label-placeholder"
          ).text((A) => A.label ? A.label : "add label").attr("dy", "0.33em").on("click", (A, G) => {
            Ce(A, G);
          }).on("mouseenter", (A, G) => p = G).on("mouseout", () => p = void 0), M;
        },
        (V) => (V.selectChild("text").classed("hidden", !o.showNodeLabels), V)
      ), s.nodes(r.value.nodes), s.alpha(S).restart();
    }
    function ue(S, V) {
      if (S.button !== 0)
        return;
      An(S);
      const M = [V.x, V.y];
      v = M, m = V, g.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Nu(M, M)), te();
    }
    function xe(S) {
      const V = m, M = p;
      D(), !(V === void 0 || M === void 0) && (An(S), B(V, M));
    }
    function he(S) {
      if (An(S), m !== void 0) {
        const V = rp(S, n.value.node())[0], M = [
          (V[0] - b) / y,
          (V[1] - k) / y
        ];
        S.pointerType === "touch" && (M[1] = M[1] - 4 * o.nodeRadius, p = r.value.nodes.find(
          (A) => Math.sqrt(Math.pow(A.x - M[0], 2) + Math.pow(A.y - M[1], 2)) < o.nodeRadius
        )), v = M, J();
      }
    }
    function Ce(S, V) {
      const M = S == null ? void 0 : S.target;
      wt(V, M, [V.x, V.y]);
    }
    function Ne(S, V) {
      const M = S.target;
      let A = It(M);
      wt(V, M, A);
    }
    function wt(S, V, M) {
      var _e;
      let A = S instanceof xd ? "node" : "link";
      const G = document.createElement("input");
      G.setAttribute("class", "label-input"), S.label == null ? G.value = "" : G.value = S.label, G.placeholder = `Enter ${A} label`;
      let Q = !1;
      G.onkeyup = function(Ee) {
        Ee.key === "Enter" ? (Q = !0, G.blur()) : Ee.key === "Escape" && (G.value = "", G.blur());
      }, G.onblur = function() {
        Q && (G.value === "" ? (V.setAttribute("class", `${A}-label-placeholder`), V.textContent = "add label", S.label = void 0) : (V.setAttribute("class", `${A}-label`), V.textContent = G.value.trim(), S.label = V.textContent)), ne.remove();
      };
      const ne = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      ne.setAttribute("width", "100%"), ne.setAttribute("height", "100%"), ne.setAttribute("x", `${M[0] - 80}`), ne.setAttribute("y", `${M[1] - 12}`), ne.append(G);
      const ce = V.closest("svg");
      (_e = ce == null ? void 0 : ce.querySelector("g")) == null || _e.append(ne), G.focus();
    }
    function It(S) {
      let V = n.value.select("svg").node().getBoundingClientRect(), M = S.getBoundingClientRect(), A = (M.x - V.x - b) / y, G = (M.y - V.y - k) / y;
      return [A, G];
    }
    function nn(S) {
      o.nodePhysicsEnabled = S, Cd(s, S, l, a);
    }
    function rn(S) {
      o.fixedLinkDistanceEnabled = S, Sd(s, r.value, o, S);
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
      let [V, M] = Aw(S);
      Z(), U(V, M);
    }
    function U(S, V) {
      for (let A of S)
        I(void 0, void 0, A.idImported, A.label, A.color);
      const M = (A) => r.value.nodes.find((G) => G.idImported === A);
      for (let A of V) {
        let G = M(A.sourceIdImported), Q = M(A.targetIdImported);
        G && Q && B(G, Q, A.label);
      }
    }
    function Y() {
      s.stop(), n.value.selectChildren().remove(), u = void 0, b = 0, k = 0, y = 1, f = void 0, g = void 0, d = void 0, h = void 0, s = void 0, D(), N();
    }
    function Z() {
      r.value = new Vu(), i.value = !1, Y();
    }
    return (S, V) => (zn(), Fs(Se, null, [
      X2,
      o.hasToolbar ? (zn(), Fs("div", Z2, [
        w(cr, {
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
              onClick: V[0] || (V[0] = (A) => I())
            }), null, 16)
          ]),
          _: 1
        }),
        w(cr, {
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
              onClick: V[1] || (V[1] = (A) => Z())
            }), null, 16)
          ]),
          _: 1
        }),
        w(cr, {
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
              onClick: V[2] || (V[2] = (A) => Y())
            }), null, 16)
          ]),
          _: 1
        }),
        w(R2, {
          "graph-as-tgf": r.value.toTGF(o.showNodeLabels, o.showLinkLabels, !1),
          onFileImported: W
        }, null, 8, ["graph-as-tgf"]),
        w(K2),
        w(H2, {
          "node-labels-enabled": o.showNodeLabels,
          "link-labels-enabled": o.showLinkLabels,
          "physics-enabled": o.nodePhysicsEnabled,
          "fixed-link-distance-enabled": o.fixedLinkDistanceEnabled,
          onToggleNodePhysics: nn,
          onToggleNodeLabels: L,
          onToggleLinkLabels: x,
          onToggleFixedLinkDistance: rn
        }, null, 8, ["node-labels-enabled", "link-labels-enabled", "physics-enabled", "fixed-link-distance-enabled"])
      ])) : $m("", !0),
      ft(Pe("div", J2, "Graph is empty", 512), [
        [Yn, !i.value]
      ])
    ], 64));
  }
}), ex = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#5f9ea0;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#add8e6;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#5f9ea0}.arrow.draggable{fill:#add8e6}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#ffa07a;stroke:none;cursor:pointer}.node:hover{stroke:#5f9ea0;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", tx = /* @__PURE__ */ ya(Q2, [["styles", [ex]]]), cl = {
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
function nx(e, t) {
  const n = [];
  let r = [];
  const i = zh(e), o = jh(e), s = (i.getDay() - cl[t.slice(-2).toUpperCase()] + 7) % 7, l = (o.getDay() - cl[t.slice(-2).toUpperCase()] + 7) % 7;
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
function rx(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function ix(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function zh(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function jh(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function ox(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const sx = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Wh(e) {
  if (e == null)
    return /* @__PURE__ */ new Date();
  if (e instanceof Date)
    return e;
  if (typeof e == "string") {
    let t;
    if (sx.test(e))
      return ox(e);
    if (t = Date.parse(e), !isNaN(t))
      return new Date(t);
  }
  return null;
}
const $c = new Date(2e3, 0, 2);
function lx(e) {
  const t = cl[e.slice(-2).toUpperCase()];
  return Td(7).map((n) => {
    const r = new Date($c);
    return r.setDate($c.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(r);
  });
}
function ax(e, t, n, r) {
  const i = Wh(e) ?? /* @__PURE__ */ new Date(), o = r == null ? void 0 : r[t];
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
function ux(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), i = zu(String(n.getMonth() + 1), 2, "0"), o = zu(String(n.getDate()), 2, "0");
  return `${r}-${i}-${o}`;
}
function cx(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function fx(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function dx(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function hx(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function gx(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function mx(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function vx(e) {
  return e.getFullYear();
}
function px(e) {
  return e.getMonth();
}
function yx(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function wx(e) {
  return e.getHours();
}
function bx(e) {
  return e.getMinutes();
}
function _x(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function xx(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Cx(e, t) {
  return fl(e, t[0]) && kx(e, t[1]);
}
function Sx(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function fl(e, t) {
  return e.getTime() > t.getTime();
}
function kx(e, t) {
  return e.getTime() < t.getTime();
}
function Ac(e, t) {
  return e.getTime() === t.getTime();
}
function Ex(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Lx(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Mx(e, t, n) {
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
function Tx(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Vx(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Ix(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function $x(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Ax(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Px(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Rx {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return Wh(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return ux(this, t);
  }
  parseISO(t) {
    return cx(t);
  }
  addMinutes(t, n) {
    return fx(t, n);
  }
  addHours(t, n) {
    return dx(t, n);
  }
  addDays(t, n) {
    return hx(t, n);
  }
  addWeeks(t, n) {
    return gx(t, n);
  }
  addMonths(t, n) {
    return mx(t, n);
  }
  getWeekArray(t) {
    return nx(t, this.locale);
  }
  startOfWeek(t) {
    return rx(t);
  }
  endOfWeek(t) {
    return ix(t);
  }
  startOfMonth(t) {
    return zh(t);
  }
  endOfMonth(t) {
    return jh(t);
  }
  format(t, n) {
    return ax(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Ac(t, n);
  }
  isValid(t) {
    return Sx(t);
  }
  isWithinRange(t, n) {
    return Cx(t, n);
  }
  isAfter(t, n) {
    return fl(t, n);
  }
  isBefore(t, n) {
    return !fl(t, n) && !Ac(t, n);
  }
  isSameDay(t, n) {
    return Ex(t, n);
  }
  isSameMonth(t, n) {
    return Lx(t, n);
  }
  setMinutes(t, n) {
    return Vx(t, n);
  }
  setHours(t, n) {
    return Tx(t, n);
  }
  setMonth(t, n) {
    return Ix(t, n);
  }
  setYear(t, n) {
    return $x(t, n);
  }
  getDiff(t, n, r) {
    return Mx(t, n, r);
  }
  getWeekdays() {
    return lx(this.locale);
  }
  getYear(t) {
    return vx(t);
  }
  getMonth(t) {
    return px(t);
  }
  getNextMonth(t) {
    return yx(t);
  }
  getHours(t) {
    return wx(t);
  }
  getMinutes(t) {
    return bx(t);
  }
  startOfDay(t) {
    return Ax(t);
  }
  endOfDay(t) {
    return Px(t);
  }
  startOfYear(t) {
    return _x(t);
  }
  endOfYear(t) {
    return xx(t);
  }
}
const Nx = Symbol.for("vuetify:date-options"), Pc = Symbol.for("vuetify:date-adapter");
function Ox(e, t) {
  const n = ut({
    adapter: Rx,
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
    instance: Fx(n, t)
  };
}
function Fx(e, t) {
  const n = Mt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ae(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
const Bx = Symbol.for("vuetify:goto");
function Dx() {
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
function Hx(e, t) {
  return {
    rtl: t.isRtl,
    options: ut(Dx(), e)
  };
}
function Gh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = ut(t, n), {
    aliases: i = {},
    components: o = {},
    directives: s = {}
  } = r, l = mb(r.defaults), a = A_(r.display, r.ssr), u = Eb(r.theme), c = Rb(r.icons), f = jb(r.locale), d = Ox(r.date, f), h = Hx(r.goTo, f);
  return {
    install: (m) => {
      for (const p in s)
        m.directive(p, s[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in i)
        m.component(p, ui({
          ...i[p],
          name: p,
          aliasName: i[p].name
        }));
      if (u.install(m), m.provide(mr, l), m.provide(al, a), m.provide(vo, u), m.provide(el, c), m.provide(po, f), m.provide(Nx, d.options), m.provide(Pc, d.instance), m.provide(Bx, h), Te && r.ssr)
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
            return De(() => a.update()), m.mount = p, v;
          };
        }
      Vt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return Mt({
              defaults: er.call(this, mr),
              display: er.call(this, al),
              theme: er.call(this, vo),
              icons: er.call(this, el),
              locale: er.call(this, po),
              date: er.call(this, Pc)
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
const zx = "3.5.9";
Gh.version = zx;
function er(e) {
  var r, i;
  const t = this.$, n = ((r = t.parent) == null ? void 0 : r.provides) ?? ((i = t.vnode.appContext) == null ? void 0 : i.provides);
  if (n && e in n)
    return n[e];
}
const jx = {
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
}, Wx = {
  component: sa
};
var Gx = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Ux = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", qx = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", Yx = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", Kx = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", Xx = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
Gh({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...jx,
      addNode: Xx,
      deleteGraph: Ux,
      help: Yx,
      importExport: qx,
      resetView: Kx,
      settings: Gx
    },
    sets: {
      mdi: Wx
    }
  }
});
customElements.define(
  "graph-editor",
  // defineCustomElement(GraphEditor, { shadowRoot: true, plugins: [vuetify] })
  /* @__PURE__ */ bv(tx)
);
