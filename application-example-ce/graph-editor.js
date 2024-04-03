var Uh = Object.defineProperty;
var Gh = (e, t, n) => t in e ? Uh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var lt = (e, t, n) => (Gh(e, typeof t != "symbol" ? t + "" : t, n), n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function dl(e, t) {
  const n = new Set(e.split(","));
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
const Me = {}, rr = [], wt = () => {
}, qh = () => !1, xo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), hl = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, gl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Yh = Object.prototype.hasOwnProperty, _e = (e, t) => Yh.call(e, t), re = Array.isArray, ir = (e) => Co(e) === "[object Map]", Ac = (e) => Co(e) === "[object Set]", le = (e) => typeof e == "function", Ae = (e) => typeof e == "string", pr = (e) => typeof e == "symbol", Le = (e) => e !== null && typeof e == "object", Rc = (e) => (Le(e) || le(e)) && le(e.then) && le(e.catch), Nc = Object.prototype.toString, Co = (e) => Nc.call(e), Kh = (e) => Co(e).slice(8, -1), Oc = (e) => Co(e) === "[object Object]", ml = (e) => Ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $r = /* @__PURE__ */ dl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), So = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Xh = /-(\w)/g, Ze = So((e) => e.replace(Xh, (t, n) => n ? n.toUpperCase() : "")), Zh = /\B([A-Z])/g, kt = So(
  (e) => e.replace(Zh, "-$1").toLowerCase()
), yr = So((e) => e.charAt(0).toUpperCase() + e.slice(1)), es = So((e) => e ? `on${yr(e)}` : ""), yn = (e, t) => !Object.is(e, t), ts = (e, t) => {
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
}, Ls = (e) => {
  const t = Ae(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let _a;
const Fc = () => _a || (_a = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vl(e) {
  if (re(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = Ae(r) ? ng(r) : vl(r);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (Ae(e) || Le(e))
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
const rg = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ig = /* @__PURE__ */ dl(rg);
function Bc(e) {
  return !!e || e === "";
}
const Tn = (e) => Ae(e) ? e : e == null ? "" : re(e) || Le(e) && (e.toString === Nc || !le(e.toString)) ? JSON.stringify(e, Dc, 2) : String(e), Dc = (e, t) => t && t.__v_isRef ? Dc(e, t.value) : ir(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, i], o) => (n[ns(r, o) + " =>"] = i, n),
    {}
  )
} : Ac(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ns(n))
} : pr(t) ? ns(t) : Le(t) && !re(t) && !Oc(t) ? String(t) : t, ns = (e, t = "") => {
  var n;
  return pr(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ut;
class Hc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ut, !t && ut && (this.index = (ut.scopes || (ut.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ut;
      try {
        return ut = this, t();
      } finally {
        ut = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ut = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ut = this.parent;
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
function og(e, t = ut) {
  t && t.active && t.effects.push(e);
}
function sg() {
  return ut;
}
function mt(e) {
  ut && ut.cleanups.push(e);
}
let On;
class wl {
  constructor(t, n, r, i) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, og(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Un();
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
    let t = vn, n = On;
    try {
      return vn = !0, On = this, this._runnings++, xa(this), this.fn();
    } finally {
      Ca(this), this._runnings--, On = n, vn = t;
    }
  }
  stop() {
    var t;
    this.active && (xa(this), Ca(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function lg(e) {
  return e.value;
}
function xa(e) {
  e._trackId++, e._depsLength = 0;
}
function Ca(e) {
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
let vn = !0, Ms = 0;
const jc = [];
function Un() {
  jc.push(vn), vn = !1;
}
function Gn() {
  const e = jc.pop();
  vn = e === void 0 ? !0 : e;
}
function bl() {
  Ms++;
}
function _l() {
  for (Ms--; !Ms && Ts.length; )
    Ts.shift()();
}
function Wc(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && zc(r, e), e.deps[e._depsLength++] = t) : e._depsLength++;
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
const Gc = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Ki = /* @__PURE__ */ new WeakMap(), Fn = Symbol(""), Vs = Symbol("");
function nt(e, t, n) {
  if (vn && On) {
    let r = Ki.get(e);
    r || Ki.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Gc(() => r.delete(n))), Wc(
      On,
      i
    );
  }
}
function qt(e, t, n, r, i, o) {
  const s = Ki.get(e);
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
function ag(e, t) {
  var n;
  return (n = Ki.get(e)) == null ? void 0 : n.get(t);
}
const ug = /* @__PURE__ */ dl("__proto__,__v_isRef,__isVue"), qc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pr)
), Sa = /* @__PURE__ */ cg();
function cg() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = pe(this);
      for (let o = 0, s = this.length; o < s; o++)
        nt(r, "get", o + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(pe)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Un(), bl();
      const r = pe(this)[t].apply(this, n);
      return _l(), Gn(), r;
    };
  }), e;
}
function fg(e) {
  const t = pe(this);
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
      if (s && _e(Sa, n))
        return Reflect.get(Sa, n, r);
      if (n === "hasOwnProperty")
        return fg;
    }
    const l = Reflect.get(t, n, r);
    return (pr(n) ? qc.has(n) : ug(n)) || (i || nt(t, "get", n), o) ? l : $e(l) ? s && ml(n) ? l : l.value : Le(l) ? i ? ei(l) : Tt(l) : l;
  }
}
class Kc extends Yc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, i) {
    let o = t[n];
    if (!this._isShallow) {
      const a = fr(o);
      if (!Xi(r) && !fr(r) && (o = pe(o), r = pe(r)), !re(t) && $e(o) && !$e(r))
        return a ? !1 : (o.value = r, !0);
    }
    const s = re(t) && ml(n) ? Number(n) < t.length : _e(t, n), l = Reflect.set(t, n, r, i);
    return t === pe(i) && (s ? yn(r, o) && qt(t, "set", n, r) : qt(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = _e(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && qt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!pr(n) || !qc.has(n)) && nt(t, "has", n), r;
  }
  ownKeys(t) {
    return nt(
      t,
      "iterate",
      re(t) ? "length" : Fn
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
  const i = pe(e), o = pe(t);
  n || (yn(t, o) && nt(i, "get", t), nt(i, "get", o));
  const { has: s } = ko(i), l = r ? xl : n ? kl : Or;
  if (s.call(i, t))
    return l(e.get(t));
  if (s.call(i, o))
    return l(e.get(o));
  e !== i && e.get(t);
}
function vi(e, t = !1) {
  const n = this.__v_raw, r = pe(n), i = pe(e);
  return t || (yn(e, i) && nt(r, "has", e), nt(r, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function pi(e, t = !1) {
  return e = e.__v_raw, !t && nt(pe(e), "iterate", Fn), Reflect.get(e, "size", e);
}
function ka(e) {
  e = pe(e);
  const t = pe(this);
  return ko(t).has.call(t, e) || (t.add(e), qt(t, "add", e, e)), this;
}
function Ea(e, t) {
  t = pe(t);
  const n = pe(this), { has: r, get: i } = ko(n);
  let o = r.call(n, e);
  o || (e = pe(e), o = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), o ? yn(t, s) && qt(n, "set", e, t) : qt(n, "add", e, t), this;
}
function La(e) {
  const t = pe(this), { has: n, get: r } = ko(t);
  let i = n.call(t, e);
  i || (e = pe(e), i = n.call(t, e)), r && r.call(t, e);
  const o = t.delete(e);
  return i && qt(t, "delete", e, void 0), o;
}
function Ma() {
  const e = pe(this), t = e.size !== 0, n = e.clear();
  return t && qt(e, "clear", void 0, void 0), n;
}
function yi(e, t) {
  return function(r, i) {
    const o = this, s = o.__v_raw, l = pe(s), a = t ? xl : e ? kl : Or;
    return !e && nt(l, "iterate", Fn), s.forEach((u, c) => r.call(i, a(u), a(c), o));
  };
}
function wi(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, o = pe(i), s = ir(o), l = e === "entries" || e === Symbol.iterator && s, a = e === "keys" && s, u = i[e](...r), c = n ? xl : t ? kl : Or;
    return !t && nt(
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
function vg() {
  const e = {
    get(o) {
      return mi(this, o);
    },
    get size() {
      return pi(this);
    },
    has: vi,
    add: ka,
    set: Ea,
    delete: La,
    clear: Ma,
    forEach: yi(!1, !1)
  }, t = {
    get(o) {
      return mi(this, o, !1, !0);
    },
    get size() {
      return pi(this);
    },
    has: vi,
    add: ka,
    set: Ea,
    delete: La,
    clear: Ma,
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
    _e(n, i) && i in r ? n : r,
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
function Tt(e) {
  return fr(e) ? e : Sl(
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
function or(e) {
  return fr(e) ? or(e.__v_raw) : !!(e && e.__v_isReactive);
}
function fr(e) {
  return !!(e && e.__v_isReadonly);
}
function Xi(e) {
  return !!(e && e.__v_isShallow);
}
function Qc(e) {
  return or(e) || fr(e);
}
function pe(e) {
  const t = e && e.__v_raw;
  return t ? pe(t) : e;
}
function ef(e) {
  return Object.isExtensible(e) && Yi(e, "__v_skip", !0), e;
}
const Or = (e) => Le(e) ? Tt(e) : e, kl = (e) => Le(e) ? ei(e) : e;
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
    const t = pe(this);
    return (!t._cacheable || t.effect.dirty) && yn(t._value, t._value = t.effect.run()) && Ri(t, 4), nf(t), t.effect._dirtyLevel >= 2 && Ri(t, 2), t._value;
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
  const o = le(e);
  return o ? (r = e, i = wt) : (r = e.get, i = e.set), new tf(r, i, o || !i, n);
}
function nf(e) {
  var t;
  vn && On && (e = pe(e), Wc(
    On,
    (t = e.dep) != null ? t : e.dep = Gc(
      () => e.dep = void 0,
      e instanceof tf ? e : void 0
    )
  ));
}
function Ri(e, t = 4, n) {
  e = pe(e);
  const r = e.dep;
  r && Uc(
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
function ye(e) {
  return rf(e, !0);
}
function rf(e, t) {
  return $e(e) ? e : new Tg(e, t);
}
class Tg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : pe(t), this._value = n ? t : Or(t);
  }
  get value() {
    return nf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Xi(t) || fr(t);
    t = n ? t : pe(t), yn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Or(t), Ri(this, 4));
  }
}
function Ot(e) {
  return $e(e) ? e.value : e;
}
const Vg = {
  get: (e, t, n) => Ot(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return $e(i) && !$e(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function of(e) {
  return or(e) ? e : new Proxy(e, Vg);
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
    return ag(pe(this._object), this._key);
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
function be(e, t, n) {
  return $e(e) ? e : le(e) ? new $g(e) : Le(e) && arguments.length > 1 ? sf(e, t, n) : ie(e);
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
function pn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    Eo(i, t, n);
  }
}
function bt(e, t, n, r) {
  if (le(e)) {
    const o = pn(e, t, n, r);
    return o && Rc(o) && o.catch((s) => {
      Eo(s, t, n);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(bt(e[o], t, n, r));
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
let Fr = !1, Is = !1;
const ze = [];
let Rt = 0;
const sr = [];
let un = null, In = 0;
const lf = /* @__PURE__ */ Promise.resolve();
let Ll = null;
function He(e) {
  const t = Ll || lf;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ag(e) {
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
  )) && (e.id == null ? ze.push(e) : ze.splice(Ag(e.id), 0, e), af());
}
function af() {
  !Fr && !Is && (Is = !0, Ll = lf.then(cf));
}
function Rg(e) {
  const t = ze.indexOf(e);
  t > Rt && ze.splice(t, 1);
}
function Ng(e) {
  re(e) ? sr.push(...e) : (!un || !un.includes(
    e,
    e.allowRecurse ? In + 1 : In
  )) && sr.push(e), af();
}
function Ta(e, t, n = Fr ? Rt + 1 : 0) {
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
  if (sr.length) {
    const t = [...new Set(sr)].sort(
      (n, r) => Br(n) - Br(r)
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
  Is = !1, Fr = !0, ze.sort(Og);
  try {
    for (Rt = 0; Rt < ze.length; Rt++) {
      const t = ze[Rt];
      t && t.active !== !1 && pn(t, null, 14);
    }
  } finally {
    Rt = 0, ze.length = 0, uf(), Fr = !1, Ll = null, (ze.length || sr.length) && cf();
  }
}
function Fg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || Me;
  let i = n;
  const o = t.startsWith("update:"), s = o && t.slice(7);
  if (s && s in r) {
    const c = `${s === "modelValue" ? "model" : s}Modifiers`, { number: f, trim: d } = r[c] || Me;
    d && (i = n.map((h) => Ae(h) ? h.trim() : h)), f && (i = n.map(Jh));
  }
  let l, a = r[l = es(t)] || // also try camelCase event handler (#2249)
  r[l = es(Ze(t))];
  !a && o && (a = r[l = es(kt(t))]), a && bt(
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
    e.emitted[l] = !0, bt(
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
  if (!le(e)) {
    const a = (u) => {
      const c = ff(u, t, !0);
      c && (l = !0, Ie(s, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (Le(e) && r.set(e, null), null) : (re(o) ? o.forEach((a) => s[a] = null) : Ie(s, o), Le(e) && r.set(e, s), s);
}
function Lo(e, t) {
  return !e || !xo(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), _e(e, t[0].toLowerCase() + t.slice(1)) || _e(e, kt(t)) || _e(e, t));
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
    r._d && ja(-1);
    const o = Zi(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Zi(o), r._d && ja(1);
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
  const x = Zi(e);
  try {
    if (n.shapeFlag & 4) {
      const y = i || r, S = y;
      p = At(
        c.call(
          S,
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
      p = At(
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
    Nr.length = 0, Eo(y, e, 1), p = b(Mt);
  }
  let k = p;
  if (v && m !== !1) {
    const y = Object.keys(v), { shapeFlag: S } = k;
    y.length && S & 7 && (s && y.some(hl) && (v = Dg(
      v,
      s
    )), k = wn(k, v));
  }
  return n.dirs && (k = wn(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), p = k, Zi(x), p;
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
      return r ? Va(r, s, u) : !!s;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (s[d] !== r[d] && !Lo(u, d))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === s ? !1 : r ? s ? Va(r, s, u) : !0 : !!s;
  return !1;
}
function Va(e, t, n) {
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
  return Ae(e) ? mf(hf, e, !1) || e : e || gf;
}
function qn(e) {
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
      if (l && (l === t || l === Ze(t) || l === yr(Ze(t))))
        return o;
    }
    const s = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ia(i[e] || o[e], t) || // global registration
      Ia(i.appContext[e], t)
    );
    return !s && r ? o : s;
  }
}
function Ia(e, t) {
  return e && (e[t] || e[Ze(t)] || e[yr(Ze(t))]);
}
const Ug = (e) => e.__isSuspense;
function Gg(e, t) {
  t && t.pendingBranch ? re(e) ? t.effects.push(...e) : t.effects.push(e) : Ng(e);
}
const qg = Symbol.for("v-scx"), Yg = () => Be(qg);
function xn(e, t) {
  return Tl(e, null, t);
}
const bi = {};
function ce(e, t, n) {
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
    const M = t;
    t = (...E) => {
      M(...E), S();
    };
  }
  const a = Fe, u = (M) => r === !0 ? M : (
    // for deep: false, only traverse root-level properties
    An(M, r === !1 ? 1 : void 0)
  );
  let c, f = !1, d = !1;
  if ($e(e) ? (c = () => e.value, f = Xi(e)) : or(e) ? (c = () => u(e), f = !0) : re(e) ? (d = !0, f = e.some((M) => or(M) || Xi(M)), c = () => e.map((M) => {
    if ($e(M))
      return M.value;
    if (or(M))
      return u(M);
    if (le(M))
      return pn(M, a, 2);
  })) : le(e) ? t ? c = () => pn(e, a, 2) : c = () => (h && h(), bt(
    e,
    a,
    3,
    [g]
  )) : c = wt, t && r) {
    const M = c;
    c = () => An(M());
  }
  let h, g = (M) => {
    h = k.onStop = () => {
      pn(M, a, 4), h = k.onStop = void 0;
    };
  }, m;
  if ($o)
    if (g = wt, t ? n && bt(t, a, 3, [
      c(),
      d ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const M = Yg();
      m = M.__watcherHandles || (M.__watcherHandles = []);
    } else
      return wt;
  let p = d ? new Array(e.length).fill(bi) : bi;
  const v = () => {
    if (!(!k.active || !k.dirty))
      if (t) {
        const M = k.run();
        (r || f || (d ? M.some((E, I) => yn(E, p[I])) : yn(M, p))) && (h && h(), bt(t, a, 3, [
          M,
          // pass undefined as the old value when it's changed for the first time
          p === bi ? void 0 : d && p[0] === bi ? [] : p,
          g
        ]), p = M);
      } else
        k.run();
  };
  v.allowRecurse = !!t;
  let x;
  i === "sync" ? x = v : i === "post" ? x = () => et(v, a && a.suspense) : (v.pre = !0, a && (v.id = a.uid), x = () => Ml(v));
  const k = new wl(c, wt, x), y = sg(), S = () => {
    k.stop(), y && gl(y.effects, k);
  };
  return t ? n ? v() : p = k.run() : i === "post" ? et(
    k.run.bind(k),
    a && a.suspense
  ) : k.run(), m && m.push(S), S;
}
function Kg(e, t, n) {
  const r = this.proxy, i = Ae(e) ? e.includes(".") ? vf(r, e) : () => r[e] : e.bind(r, r);
  let o;
  le(t) ? o = t : (o = t.handler, n = t);
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
  else if (Ac(e) || ir(e))
    e.forEach((i) => {
      An(i, t, n, r);
    });
  else if (Oc(e))
    for (const i in e)
      An(e[i], t, n, r);
  return e;
}
function ht(e, t) {
  if (qe === null)
    return e;
  const n = Po(qe) || qe.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, s, l, a = Me] = t[i];
    o && (le(o) && (o = {
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
function kn(e, t, n, r) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    o && (l.oldValue = o[s].value);
    let a = l.dir[r];
    a && (Un(), bt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Gn());
  }
}
const cn = Symbol("_leaveCb"), _i = Symbol("_enterCb");
function pf() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Cn(() => {
    e.isMounted = !0;
  }), Qt(() => {
    e.isUnmounting = !0;
  }), e;
}
const pt = [Function, Array], yf = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: pt,
  onEnter: pt,
  onAfterEnter: pt,
  onEnterCancelled: pt,
  // leave
  onBeforeLeave: pt,
  onLeave: pt,
  onAfterLeave: pt,
  onLeaveCancelled: pt,
  // appear
  onBeforeAppear: pt,
  onAppear: pt,
  onAfterAppear: pt,
  onAppearCancelled: pt
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
          if (d.type !== Mt) {
            o = d;
            break;
          }
      }
      const s = pe(e), { mode: l } = s;
      if (r.isLeaving)
        return is(o);
      const a = $a(o);
      if (!a)
        return is(o);
      const u = Dr(
        a,
        s,
        r,
        n
      );
      Hr(a, u);
      const c = n.subTree, f = c && $a(c);
      if (f && f.type !== Mt && !$n(a, f)) {
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
        l === "in-out" && a.type !== Mt && (d.delayLeave = (h, g, m) => {
          const p = wf(
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
    onAppearCancelled: x
  } = t, k = String(e.key), y = wf(n, e), S = (I, A) => {
    I && bt(
      I,
      r,
      9,
      A
    );
  }, M = (I, A) => {
    const N = A[1];
    S(I, A), re(I) ? I.every((D) => D.length <= 1) && N() : I.length <= 1 && N();
  }, E = {
    mode: o,
    persisted: s,
    beforeEnter(I) {
      let A = l;
      if (!n.isMounted)
        if (i)
          A = m || l;
        else
          return;
      I[cn] && I[cn](
        !0
        /* cancelled */
      );
      const N = y[k];
      N && $n(e, N) && N.el[cn] && N.el[cn](), S(A, [I]);
    },
    enter(I) {
      let A = a, N = u, D = c;
      if (!n.isMounted)
        if (i)
          A = p || a, N = v || u, D = x || c;
        else
          return;
      let $ = !1;
      const R = I[_i] = (C) => {
        $ || ($ = !0, C ? S(D, [I]) : S(N, [I]), E.delayedLeave && E.delayedLeave(), I[_i] = void 0);
      };
      A ? M(A, [I, R]) : R();
    },
    leave(I, A) {
      const N = String(e.key);
      if (I[_i] && I[_i](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return A();
      S(f, [I]);
      let D = !1;
      const $ = I[cn] = (R) => {
        D || (D = !0, A(), R ? S(g, [I]) : S(h, [I]), I[cn] = void 0, y[N] === e && delete y[N]);
      };
      y[N] = e, d ? M(d, [I, $]) : $();
    },
    clone(I) {
      return Dr(I, t, n, r);
    }
  };
  return E;
}
function is(e) {
  if (Mo(e))
    return e = wn(e), e.children = null, e;
}
function $a(e) {
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
    s.type === ke ? (s.patchFlag & 128 && i++, r = r.concat(
      Vl(s.children, t, l)
    )) : (t || s.type !== Mt) && r.push(l != null ? wn(s, { key: l }) : s);
  }
  if (i > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
  return le(e) ? (
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
      Un();
      const l = ni(n), a = bt(t, n, e, s);
      return l(), Gn(), a;
    });
    return r ? i.unshift(o) : i.push(o), o;
  }
}
const Jt = (e) => (t, n = Fe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!$o || e === "sp") && To(e, (...r) => t(...r), n)
), Il = Jt("bm"), Cn = Jt("m"), tm = Jt("bu"), _f = Jt("u"), Qt = Jt("bum"), $l = Jt("um"), nm = Jt("sp"), rm = Jt(
  "rtg"
), im = Jt(
  "rtc"
);
function om(e, t = Fe) {
  To("ec", e, t);
}
function sm(e, t, n, r) {
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
const $s = (e) => e ? Pf(e) ? Po(e) || e.proxy : $s(e.parent) : null, Pr = (
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
    $parent: (e) => $s(e.parent),
    $root: (e) => $s(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Pl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ml(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = He.bind(e.proxy)),
    $watch: (e) => Kg.bind(e)
  })
), os = (e, t) => e !== Me && !e.__isScriptSetup && _e(e, t), lm = {
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
        if (i !== Me && _e(i, t))
          return s[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && _e(u, t)
        )
          return s[t] = 3, o[t];
        if (n !== Me && _e(n, t))
          return s[t] = 4, n[t];
        Ps && (s[t] = 0);
      }
    }
    const c = Pr[t];
    let f, d;
    if (c)
      return t === "$attrs" && nt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Me && _e(n, t))
      return s[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, _e(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: o } = e;
    return os(i, t) ? (i[t] = n, !0) : r !== Me && _e(r, t) ? (r[t] = n, !0) : _e(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: o }
  }, s) {
    let l;
    return !!n[s] || e !== Me && _e(e, s) || os(t, s) || (l = o[0]) && _e(l, s) || _e(r, s) || _e(Pr, s) || _e(i.config.globalProperties, s);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : _e(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Pa(e) {
  return re(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ps = !0;
function am(e) {
  const t = Pl(e), n = e.proxy, r = e.ctx;
  Ps = !1, t.beforeCreate && Aa(t.beforeCreate, e, "bc");
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
    beforeUnmount: x,
    destroyed: k,
    unmounted: y,
    render: S,
    renderTracked: M,
    renderTriggered: E,
    errorCaptured: I,
    serverPrefetch: A,
    // public API
    expose: N,
    inheritAttrs: D,
    // assets
    components: $,
    directives: R,
    filters: C
  } = t;
  if (u && um(u, r, null), s)
    for (const B in s) {
      const F = s[B];
      le(F) && (r[B] = F.bind(n));
    }
  if (i) {
    const B = i.call(n, n);
    Le(B) && (e.data = Tt(B));
  }
  if (Ps = !0, o)
    for (const B in o) {
      const F = o[B], q = le(F) ? F.bind(n, n) : le(F.get) ? F.get.bind(n, n) : wt, K = !le(F) && le(F.set) ? F.set.bind(n) : wt, j = V({
        get: q,
        set: K
      });
      Object.defineProperty(r, B, {
        enumerable: !0,
        configurable: !0,
        get: () => j.value,
        set: (Z) => j.value = Z
      });
    }
  if (l)
    for (const B in l)
      xf(l[B], r, n, B);
  if (a) {
    const B = le(a) ? a.call(n) : a;
    Reflect.ownKeys(B).forEach((F) => {
      Dt(F, B[F]);
    });
  }
  c && Aa(c, e, "c");
  function T(B, F) {
    re(F) ? F.forEach((q) => B(q.bind(n))) : F && B(F.bind(n));
  }
  if (T(Il, f), T(Cn, d), T(tm, h), T(_f, g), T(Jg, m), T(Qg, p), T(om, I), T(im, M), T(rm, E), T(Qt, x), T($l, y), T(nm, A), re(N))
    if (N.length) {
      const B = e.exposed || (e.exposed = {});
      N.forEach((F) => {
        Object.defineProperty(B, F, {
          get: () => n[F],
          set: (q) => n[F] = q
        });
      });
    } else
      e.exposed || (e.exposed = {});
  S && e.render === wt && (e.render = S), D != null && (e.inheritAttrs = D), $ && (e.components = $), R && (e.directives = R);
}
function um(e, t, n = wt) {
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
function Aa(e, t, n) {
  bt(
    re(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function xf(e, t, n, r) {
  const i = r.includes(".") ? vf(n, r) : () => n[r];
  if (Ae(e)) {
    const o = t[e];
    le(o) && ce(i, o);
  } else if (le(e))
    ce(i, e.bind(n));
  else if (Le(e))
    if (re(e))
      e.forEach((o) => xf(o, t, n, r));
    else {
      const o = le(e.handler) ? e.handler.bind(n) : t[e.handler];
      le(o) && ce(i, o, e);
    }
}
function Pl(e) {
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
  data: Ra,
  props: Na,
  emits: Na,
  // objects
  methods: Tr,
  computed: Tr,
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
  components: Tr,
  directives: Tr,
  // watch
  watch: dm,
  // provide / inject
  provide: Ra,
  inject: fm
};
function Ra(e, t) {
  return t ? e ? function() {
    return Ie(
      le(e) ? e.call(this, this) : e,
      le(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function fm(e, t) {
  return Tr(As(e), As(t));
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
function Tr(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Na(e, t) {
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
    le(r) || (r = Ie({}, r)), i != null && !Le(i) && (i = null);
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
        return s.has(u) || (u && le(u.install) ? (s.add(u), u.install(a, ...c)) : le(u) && (s.add(u), u(a, ...c))), a;
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
          const d = b(r, i);
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
function Dt(e, t) {
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
      return n && le(t) ? t.call(r && r.proxy) : t;
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
  } = e, l = pe(i), [a] = e.propsOptions;
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
          if (_e(o, d))
            h !== o[d] && (o[d] = h, u = !0);
          else {
            const g = Ze(d);
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
    Sf(e, t, i, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !_e(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = kt(f)) === f || !_e(t, c))) && (a ? n && // for camelCase
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
        (!t || !_e(t, f)) && (delete o[f], u = !0);
  }
  u && qt(e, "set", "$attrs");
}
function Sf(e, t, n, r) {
  const [i, o] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let a in t) {
      if ($r(a))
        continue;
      const u = t[a];
      let c;
      i && _e(i, c = Ze(a)) ? !o || !o.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Lo(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, s = !0);
    }
  if (o) {
    const a = pe(n), u = l || Me;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = Rs(
        i,
        a,
        f,
        u[f],
        e,
        !_e(u, f)
      );
    }
  }
  return s;
}
function Rs(e, t, n, r, i, o) {
  const s = e[n];
  if (s != null) {
    const l = _e(s, "default");
    if (l && r === void 0) {
      const a = s.default;
      if (s.type !== Function && !s.skipFactory && le(a)) {
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
    ] && (r === "" || r === kt(n)) && (r = !0));
  }
  return r;
}
function kf(e, t, n = !1) {
  const r = t.propsCache, i = r.get(e);
  if (i)
    return i;
  const o = e.props, s = {}, l = [];
  let a = !1;
  if (!le(e)) {
    const c = (f) => {
      a = !0;
      const [d, h] = kf(f, t, !0);
      Ie(s, d), h && l.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Le(e) && r.set(e, rr), rr;
  if (re(o))
    for (let c = 0; c < o.length; c++) {
      const f = Ze(o[c]);
      Oa(f) && (s[f] = Me);
    }
  else if (o)
    for (const c in o) {
      const f = Ze(c);
      if (Oa(f)) {
        const d = o[c], h = s[f] = re(d) || le(d) ? { type: d } : Ie({}, d);
        if (h) {
          const g = Da(Boolean, h.type), m = Da(String, h.type);
          h[
            0
            /* shouldCast */
          ] = g > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || g < m, (g > -1 || _e(h, "default")) && l.push(f);
        }
      }
    }
  const u = [s, l];
  return Le(e) && r.set(e, u), u;
}
function Oa(e) {
  return e[0] !== "$" && !$r(e);
}
function Fa(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ba(e, t) {
  return Fa(e) === Fa(t);
}
function Da(e, t) {
  return re(t) ? t.findIndex((n) => Ba(n, e)) : le(t) && Ba(t, e) ? 0 : -1;
}
const Ef = (e) => e[0] === "_" || e === "$stable", Al = (e) => re(e) ? e.map(At) : [At(e)], pm = (e, t, n) => {
  if (t._n)
    return t;
  const r = de((...i) => Al(t(...i)), n);
  return r._c = !1, r;
}, Lf = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if (Ef(i))
      continue;
    const o = e[i];
    if (le(o))
      t[i] = pm(i, o, r);
    else if (o != null) {
      const s = Al(o);
      t[i] = () => s;
    }
  }
}, Mf = (e, t) => {
  const n = Al(t);
  e.slots.default = () => n;
}, ym = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = pe(t), Yi(t, "_", n)) : Lf(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Mf(e, t);
  Yi(e.slots, Io, 1);
}, wm = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let o = !0, s = Me;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : (Ie(i, t), !n && l === 1 && delete i._) : (o = !t.$stable, Lf(t, i)), s = t;
  } else
    t && (Mf(e, t), s = { default: 1 });
  if (o)
    for (const l in i)
      !Ef(l) && s[l] == null && delete i[l];
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
  if (Ni(r) && !i)
    return;
  const o = r.shapeFlag & 4 ? Po(r.component) || r.component.proxy : r.el, s = i ? null : o, { i: l, r: a } = e, u = t && t.r, c = l.refs === Me ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (Ae(u) ? (c[u] = null, _e(f, u) && (f[u] = null)) : $e(u) && (u.value = null)), le(a))
    pn(a, l, 12, [s, c]);
  else {
    const d = Ae(a), h = $e(a);
    if (d || h) {
      const g = () => {
        if (e.f) {
          const m = d ? _e(f, a) ? f[a] : c[a] : a.value;
          i ? re(m) && gl(m, o) : re(m) ? m.includes(o) || m.push(o) : d ? (c[a] = [o], _e(f, a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else
          d ? (c[a] = s, _e(f, a) && (f[a] = s)) : h && (a.value = s, e.k && (c[e.k] = s));
      };
      s ? (g.id = -1, et(g, n)) : g();
    }
  }
}
const et = Gg;
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
    setScopeId: h = wt,
    insertStaticContent: g
  } = e, m = (w, _, L, P = null, H = null, W = null, X = void 0, G = null, Y = !!_.dynamicChildren) => {
    if (w === _)
      return;
    w && !$n(w, _) && (P = xe(w), Z(w, H, W, !0), w = null), _.patchFlag === -2 && (Y = !1, _.dynamicChildren = null);
    const { type: U, ref: J, shapeFlag: ne } = _;
    switch (U) {
      case ti:
        p(w, _, L, P);
        break;
      case Mt:
        v(w, _, L, P);
        break;
      case ls:
        w == null && x(_, L, P, X);
        break;
      case ke:
        $(
          w,
          _,
          L,
          P,
          H,
          W,
          X,
          G,
          Y
        );
        break;
      default:
        ne & 1 ? S(
          w,
          _,
          L,
          P,
          H,
          W,
          X,
          G,
          Y
        ) : ne & 6 ? R(
          w,
          _,
          L,
          P,
          H,
          W,
          X,
          G,
          Y
        ) : (ne & 64 || ne & 128) && U.process(
          w,
          _,
          L,
          P,
          H,
          W,
          X,
          G,
          Y,
          ot
        );
    }
    J != null && H && Ns(J, w && w.ref, W, _ || w, !_);
  }, p = (w, _, L, P) => {
    if (w == null)
      r(
        _.el = l(_.children),
        L,
        P
      );
    else {
      const H = _.el = w.el;
      _.children !== w.children && u(H, _.children);
    }
  }, v = (w, _, L, P) => {
    w == null ? r(
      _.el = a(_.children || ""),
      L,
      P
    ) : _.el = w.el;
  }, x = (w, _, L, P) => {
    [w.el, w.anchor] = g(
      w.children,
      _,
      L,
      P,
      w.el,
      w.anchor
    );
  }, k = ({ el: w, anchor: _ }, L, P) => {
    let H;
    for (; w && w !== _; )
      H = d(w), r(w, L, P), w = H;
    r(_, L, P);
  }, y = ({ el: w, anchor: _ }) => {
    let L;
    for (; w && w !== _; )
      L = d(w), i(w), w = L;
    i(_);
  }, S = (w, _, L, P, H, W, X, G, Y) => {
    _.type === "svg" ? X = "svg" : _.type === "math" && (X = "mathml"), w == null ? M(
      _,
      L,
      P,
      H,
      W,
      X,
      G,
      Y
    ) : A(
      w,
      _,
      H,
      W,
      X,
      G,
      Y
    );
  }, M = (w, _, L, P, H, W, X, G) => {
    let Y, U;
    const { props: J, shapeFlag: ne, transition: ee, dirs: oe } = w;
    if (Y = w.el = s(
      w.type,
      W,
      J && J.is,
      J
    ), ne & 8 ? c(Y, w.children) : ne & 16 && I(
      w.children,
      Y,
      null,
      P,
      H,
      ss(w, W),
      X,
      G
    ), oe && kn(w, null, P, "created"), E(Y, w, w.scopeId, X, P), J) {
      for (const Se in J)
        Se !== "value" && !$r(Se) && o(
          Y,
          Se,
          null,
          J[Se],
          W,
          w.children,
          P,
          H,
          he
        );
      "value" in J && o(Y, "value", null, J.value, W), (U = J.onVnodeBeforeMount) && Pt(U, P, w);
    }
    oe && kn(w, null, P, "beforeMount");
    const ve = xm(H, ee);
    ve && ee.beforeEnter(Y), r(Y, _, L), ((U = J && J.onVnodeMounted) || ve || oe) && et(() => {
      U && Pt(U, P, w), ve && ee.enter(Y), oe && kn(w, null, P, "mounted");
    }, H);
  }, E = (w, _, L, P, H) => {
    if (L && h(w, L), P)
      for (let W = 0; W < P.length; W++)
        h(w, P[W]);
    if (H) {
      let W = H.subTree;
      if (_ === W) {
        const X = H.vnode;
        E(
          w,
          X,
          X.scopeId,
          X.slotScopeIds,
          H.parent
        );
      }
    }
  }, I = (w, _, L, P, H, W, X, G, Y = 0) => {
    for (let U = Y; U < w.length; U++) {
      const J = w[U] = G ? fn(w[U]) : At(w[U]);
      m(
        null,
        J,
        _,
        L,
        P,
        H,
        W,
        X,
        G
      );
    }
  }, A = (w, _, L, P, H, W, X) => {
    const G = _.el = w.el;
    let { patchFlag: Y, dynamicChildren: U, dirs: J } = _;
    Y |= w.patchFlag & 16;
    const ne = w.props || Me, ee = _.props || Me;
    let oe;
    if (L && En(L, !1), (oe = ee.onVnodeBeforeUpdate) && Pt(oe, L, _, w), J && kn(_, w, L, "beforeUpdate"), L && En(L, !0), U ? N(
      w.dynamicChildren,
      U,
      G,
      L,
      P,
      ss(_, H),
      W
    ) : X || F(
      w,
      _,
      G,
      null,
      L,
      P,
      ss(_, H),
      W,
      !1
    ), Y > 0) {
      if (Y & 16)
        D(
          G,
          _,
          ne,
          ee,
          L,
          P,
          H
        );
      else if (Y & 2 && ne.class !== ee.class && o(G, "class", null, ee.class, H), Y & 4 && o(G, "style", ne.style, ee.style, H), Y & 8) {
        const ve = _.dynamicProps;
        for (let Se = 0; Se < ve.length; Se++) {
          const Te = ve[Se], Oe = ne[Te], xt = ee[Te];
          (xt !== Oe || Te === "value") && o(
            G,
            Te,
            Oe,
            xt,
            H,
            w.children,
            L,
            P,
            he
          );
        }
      }
      Y & 1 && w.children !== _.children && c(G, _.children);
    } else
      !X && U == null && D(
        G,
        _,
        ne,
        ee,
        L,
        P,
        H
      );
    ((oe = ee.onVnodeUpdated) || J) && et(() => {
      oe && Pt(oe, L, _, w), J && kn(_, w, L, "updated");
    }, P);
  }, N = (w, _, L, P, H, W, X) => {
    for (let G = 0; G < _.length; G++) {
      const Y = w[G], U = _[G], J = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        Y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (Y.type === ke || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !$n(Y, U) || // - In the case of a component, it could contain anything.
        Y.shapeFlag & 70) ? f(Y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          L
        )
      );
      m(
        Y,
        U,
        J,
        null,
        P,
        H,
        W,
        X,
        !0
      );
    }
  }, D = (w, _, L, P, H, W, X) => {
    if (L !== P) {
      if (L !== Me)
        for (const G in L)
          !$r(G) && !(G in P) && o(
            w,
            G,
            L[G],
            null,
            X,
            _.children,
            H,
            W,
            he
          );
      for (const G in P) {
        if ($r(G))
          continue;
        const Y = P[G], U = L[G];
        Y !== U && G !== "value" && o(
          w,
          G,
          U,
          Y,
          X,
          _.children,
          H,
          W,
          he
        );
      }
      "value" in P && o(w, "value", L.value, P.value, X);
    }
  }, $ = (w, _, L, P, H, W, X, G, Y) => {
    const U = _.el = w ? w.el : l(""), J = _.anchor = w ? w.anchor : l("");
    let { patchFlag: ne, dynamicChildren: ee, slotScopeIds: oe } = _;
    oe && (G = G ? G.concat(oe) : oe), w == null ? (r(U, L, P), r(J, L, P), I(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      _.children || [],
      L,
      J,
      H,
      W,
      X,
      G,
      Y
    )) : ne > 0 && ne & 64 && ee && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    w.dynamicChildren ? (N(
      w.dynamicChildren,
      ee,
      L,
      H,
      W,
      X,
      G
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (_.key != null || H && _ === H.subTree) && Rl(
      w,
      _,
      !0
      /* shallow */
    )) : F(
      w,
      _,
      L,
      J,
      H,
      W,
      X,
      G,
      Y
    );
  }, R = (w, _, L, P, H, W, X, G, Y) => {
    _.slotScopeIds = G, w == null ? _.shapeFlag & 512 ? H.ctx.activate(
      _,
      L,
      P,
      X,
      Y
    ) : C(
      _,
      L,
      P,
      H,
      W,
      X,
      Y
    ) : O(w, _, Y);
  }, C = (w, _, L, P, H, W, X) => {
    const G = w.component = Am(
      w,
      P,
      H
    );
    if (Mo(w) && (G.ctx.renderer = ot), Rm(G), G.asyncDep) {
      if (H && H.registerDep(G, T), !w.el) {
        const Y = G.subTree = b(Mt);
        v(null, Y, _, L);
      }
    } else
      T(
        G,
        w,
        _,
        L,
        H,
        W,
        X
      );
  }, O = (w, _, L) => {
    const P = _.component = w.component;
    if (Hg(w, _, L))
      if (P.asyncDep && !P.asyncResolved) {
        B(P, _, L);
        return;
      } else
        P.next = _, Rg(P.update), P.effect.dirty = !0, P.update();
    else
      _.el = w.el, P.vnode = _;
  }, T = (w, _, L, P, H, W, X) => {
    const G = () => {
      if (w.isMounted) {
        let { next: J, bu: ne, u: ee, parent: oe, vnode: ve } = w;
        {
          const Xn = Tf(w);
          if (Xn) {
            J && (J.el = ve.el, B(w, J, X)), Xn.asyncDep.then(() => {
              w.isUnmounted || G();
            });
            return;
          }
        }
        let Se = J, Te;
        En(w, !1), J ? (J.el = ve.el, B(w, J, X)) : J = ve, ne && ts(ne), (Te = J.props && J.props.onVnodeBeforeUpdate) && Pt(Te, oe, J, ve), En(w, !0);
        const Oe = rs(w), xt = w.subTree;
        w.subTree = Oe, m(
          xt,
          Oe,
          // parent may have changed if it's in a teleport
          f(xt.el),
          // anchor may have changed if it's in a fragment
          xe(xt),
          w,
          H,
          W
        ), J.el = Oe.el, Se === null && zg(w, Oe.el), ee && et(ee, H), (Te = J.props && J.props.onVnodeUpdated) && et(
          () => Pt(Te, oe, J, ve),
          H
        );
      } else {
        let J;
        const { el: ne, props: ee } = _, { bm: oe, m: ve, parent: Se } = w, Te = Ni(_);
        if (En(w, !1), oe && ts(oe), !Te && (J = ee && ee.onVnodeBeforeMount) && Pt(J, Se, _), En(w, !0), ne && z) {
          const Oe = () => {
            w.subTree = rs(w), z(
              ne,
              w.subTree,
              w,
              H,
              null
            );
          };
          Te ? _.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !w.isUnmounted && Oe()
          ) : Oe();
        } else {
          const Oe = w.subTree = rs(w);
          m(
            null,
            Oe,
            L,
            P,
            w,
            H,
            W
          ), _.el = Oe.el;
        }
        if (ve && et(ve, H), !Te && (J = ee && ee.onVnodeMounted)) {
          const Oe = _;
          et(
            () => Pt(J, Se, Oe),
            H
          );
        }
        (_.shapeFlag & 256 || Se && Ni(Se.vnode) && Se.vnode.shapeFlag & 256) && w.a && et(w.a, H), w.isMounted = !0, _ = L = P = null;
      }
    }, Y = w.effect = new wl(
      G,
      wt,
      () => Ml(U),
      w.scope
      // track it in component's effect scope
    ), U = w.update = () => {
      Y.dirty && Y.run();
    };
    U.id = w.uid, En(w, !0), U();
  }, B = (w, _, L) => {
    _.component = w;
    const P = w.vnode.props;
    w.vnode = _, w.next = null, vm(w, _.props, P, L), wm(w, _.children, L), Un(), Ta(w), Gn();
  }, F = (w, _, L, P, H, W, X, G, Y = !1) => {
    const U = w && w.children, J = w ? w.shapeFlag : 0, ne = _.children, { patchFlag: ee, shapeFlag: oe } = _;
    if (ee > 0) {
      if (ee & 128) {
        K(
          U,
          ne,
          L,
          P,
          H,
          W,
          X,
          G,
          Y
        );
        return;
      } else if (ee & 256) {
        q(
          U,
          ne,
          L,
          P,
          H,
          W,
          X,
          G,
          Y
        );
        return;
      }
    }
    oe & 8 ? (J & 16 && he(U, H, W), ne !== U && c(L, ne)) : J & 16 ? oe & 16 ? K(
      U,
      ne,
      L,
      P,
      H,
      W,
      X,
      G,
      Y
    ) : he(U, H, W, !0) : (J & 8 && c(L, ""), oe & 16 && I(
      ne,
      L,
      P,
      H,
      W,
      X,
      G,
      Y
    ));
  }, q = (w, _, L, P, H, W, X, G, Y) => {
    w = w || rr, _ = _ || rr;
    const U = w.length, J = _.length, ne = Math.min(U, J);
    let ee;
    for (ee = 0; ee < ne; ee++) {
      const oe = _[ee] = Y ? fn(_[ee]) : At(_[ee]);
      m(
        w[ee],
        oe,
        L,
        null,
        H,
        W,
        X,
        G,
        Y
      );
    }
    U > J ? he(
      w,
      H,
      W,
      !0,
      !1,
      ne
    ) : I(
      _,
      L,
      P,
      H,
      W,
      X,
      G,
      Y,
      ne
    );
  }, K = (w, _, L, P, H, W, X, G, Y) => {
    let U = 0;
    const J = _.length;
    let ne = w.length - 1, ee = J - 1;
    for (; U <= ne && U <= ee; ) {
      const oe = w[U], ve = _[U] = Y ? fn(_[U]) : At(_[U]);
      if ($n(oe, ve))
        m(
          oe,
          ve,
          L,
          null,
          H,
          W,
          X,
          G,
          Y
        );
      else
        break;
      U++;
    }
    for (; U <= ne && U <= ee; ) {
      const oe = w[ne], ve = _[ee] = Y ? fn(_[ee]) : At(_[ee]);
      if ($n(oe, ve))
        m(
          oe,
          ve,
          L,
          null,
          H,
          W,
          X,
          G,
          Y
        );
      else
        break;
      ne--, ee--;
    }
    if (U > ne) {
      if (U <= ee) {
        const oe = ee + 1, ve = oe < J ? _[oe].el : P;
        for (; U <= ee; )
          m(
            null,
            _[U] = Y ? fn(_[U]) : At(_[U]),
            L,
            ve,
            H,
            W,
            X,
            G,
            Y
          ), U++;
      }
    } else if (U > ee)
      for (; U <= ne; )
        Z(w[U], H, W, !0), U++;
    else {
      const oe = U, ve = U, Se = /* @__PURE__ */ new Map();
      for (U = ve; U <= ee; U++) {
        const st = _[U] = Y ? fn(_[U]) : At(_[U]);
        st.key != null && Se.set(st.key, U);
      }
      let Te, Oe = 0;
      const xt = ee - ve + 1;
      let Xn = !1, ya = 0;
      const Cr = new Array(xt);
      for (U = 0; U < xt; U++)
        Cr[U] = 0;
      for (U = oe; U <= ne; U++) {
        const st = w[U];
        if (Oe >= xt) {
          Z(st, H, W, !0);
          continue;
        }
        let $t;
        if (st.key != null)
          $t = Se.get(st.key);
        else
          for (Te = ve; Te <= ee; Te++)
            if (Cr[Te - ve] === 0 && $n(st, _[Te])) {
              $t = Te;
              break;
            }
        $t === void 0 ? Z(st, H, W, !0) : (Cr[$t - ve] = U + 1, $t >= ya ? ya = $t : Xn = !0, m(
          st,
          _[$t],
          L,
          null,
          H,
          W,
          X,
          G,
          Y
        ), Oe++);
      }
      const wa = Xn ? Cm(Cr) : rr;
      for (Te = wa.length - 1, U = xt - 1; U >= 0; U--) {
        const st = ve + U, $t = _[st], ba = st + 1 < J ? _[st + 1].el : P;
        Cr[U] === 0 ? m(
          null,
          $t,
          L,
          ba,
          H,
          W,
          X,
          G,
          Y
        ) : Xn && (Te < 0 || U !== wa[Te] ? j($t, L, ba, 2) : Te--);
      }
    }
  }, j = (w, _, L, P, H = null) => {
    const { el: W, type: X, transition: G, children: Y, shapeFlag: U } = w;
    if (U & 6) {
      j(w.component.subTree, _, L, P);
      return;
    }
    if (U & 128) {
      w.suspense.move(_, L, P);
      return;
    }
    if (U & 64) {
      X.move(w, _, L, ot);
      return;
    }
    if (X === ke) {
      r(W, _, L);
      for (let ne = 0; ne < Y.length; ne++)
        j(Y[ne], _, L, P);
      r(w.anchor, _, L);
      return;
    }
    if (X === ls) {
      k(w, _, L);
      return;
    }
    if (P !== 2 && U & 1 && G)
      if (P === 0)
        G.beforeEnter(W), r(W, _, L), et(() => G.enter(W), H);
      else {
        const { leave: ne, delayLeave: ee, afterLeave: oe } = G, ve = () => r(W, _, L), Se = () => {
          ne(W, () => {
            ve(), oe && oe();
          });
        };
        ee ? ee(W, ve, Se) : Se();
      }
    else
      r(W, _, L);
  }, Z = (w, _, L, P = !1, H = !1) => {
    const {
      type: W,
      props: X,
      ref: G,
      children: Y,
      dynamicChildren: U,
      shapeFlag: J,
      patchFlag: ne,
      dirs: ee
    } = w;
    if (G != null && Ns(G, null, L, w, !0), J & 256) {
      _.ctx.deactivate(w);
      return;
    }
    const oe = J & 1 && ee, ve = !Ni(w);
    let Se;
    if (ve && (Se = X && X.onVnodeBeforeUnmount) && Pt(Se, _, w), J & 6)
      Ce(w.component, L, P);
    else {
      if (J & 128) {
        w.suspense.unmount(L, P);
        return;
      }
      oe && kn(w, null, _, "beforeUnmount"), J & 64 ? w.type.remove(
        w,
        _,
        L,
        H,
        ot,
        P
      ) : U && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (W !== ke || ne > 0 && ne & 64) ? he(
        U,
        _,
        L,
        !1,
        !0
      ) : (W === ke && ne & 384 || !H && J & 16) && he(Y, _, L), P && te(w);
    }
    (ve && (Se = X && X.onVnodeUnmounted) || oe) && et(() => {
      Se && Pt(Se, _, w), oe && kn(w, null, _, "unmounted");
    }, L);
  }, te = (w) => {
    const { type: _, el: L, anchor: P, transition: H } = w;
    if (_ === ke) {
      ue(L, P);
      return;
    }
    if (_ === ls) {
      y(w);
      return;
    }
    const W = () => {
      i(L), H && !H.persisted && H.afterLeave && H.afterLeave();
    };
    if (w.shapeFlag & 1 && H && !H.persisted) {
      const { leave: X, delayLeave: G } = H, Y = () => X(L, W);
      G ? G(w.el, W, Y) : Y();
    } else
      W();
  }, ue = (w, _) => {
    let L;
    for (; w !== _; )
      L = d(w), i(w), w = L;
    i(_);
  }, Ce = (w, _, L) => {
    const { bum: P, scope: H, update: W, subTree: X, um: G } = w;
    P && ts(P), H.stop(), W && (W.active = !1, Z(X, w, _, L)), G && et(G, _), et(() => {
      w.isUnmounted = !0;
    }, _), _ && _.pendingBranch && !_.isUnmounted && w.asyncDep && !w.asyncResolved && w.suspenseId === _.pendingId && (_.deps--, _.deps === 0 && _.resolve());
  }, he = (w, _, L, P = !1, H = !1, W = 0) => {
    for (let X = W; X < w.length; X++)
      Z(w[X], _, L, P, H);
  }, xe = (w) => w.shapeFlag & 6 ? xe(w.component.subTree) : w.shapeFlag & 128 ? w.suspense.next() : d(w.anchor || w.el);
  let Re = !1;
  const _t = (w, _, L) => {
    w == null ? _._vnode && Z(_._vnode, null, null, !0) : m(
      _._vnode || null,
      w,
      _,
      null,
      null,
      null,
      L
    ), Re || (Re = !0, Ta(), uf(), Re = !1), _._vnode = w;
  }, ot = {
    p: m,
    um: Z,
    m: j,
    r: te,
    mt: C,
    mc: I,
    pc: F,
    pbc: N,
    n: xe,
    o: e
  };
  let rn, z;
  return t && ([rn, z] = t(
    ot
  )), {
    render: _t,
    hydrate: rn,
    createApp: gm(_t, rn)
  };
}
function ss({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function En({ effect: e, update: t }, n) {
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
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = fn(i[o]), l.el = s.el), n || Rl(s, l)), l.type === ti && (l.el = s.el);
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
const Sm = (e) => e.__isTeleport, Rr = (e) => e && (e.disabled || e.disabled === ""), Ha = (e) => typeof SVGElement < "u" && e instanceof SVGElement, za = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Os = (e, t) => {
  const n = e && e.to;
  return Ae(n) ? t ? t(n) : null : n;
}, km = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, i, o, s, l, a, u) {
    const {
      mc: c,
      pc: f,
      pbc: d,
      o: { insert: h, querySelector: g, createText: m, createComment: p }
    } = u, v = Rr(t.props);
    let { shapeFlag: x, children: k, dynamicChildren: y } = t;
    if (e == null) {
      const S = t.el = m(""), M = t.anchor = m("");
      h(S, n, r), h(M, n, r);
      const E = t.target = Os(t.props, g), I = t.targetAnchor = m("");
      E && (h(I, E), s === "svg" || Ha(E) ? s = "svg" : (s === "mathml" || za(E)) && (s = "mathml"));
      const A = (N, D) => {
        x & 16 && c(
          k,
          N,
          D,
          i,
          o,
          s,
          l,
          a
        );
      };
      v ? A(n, M) : E && A(E, I);
    } else {
      t.el = e.el;
      const S = t.anchor = e.anchor, M = t.target = e.target, E = t.targetAnchor = e.targetAnchor, I = Rr(e.props), A = I ? n : M, N = I ? S : E;
      if (s === "svg" || Ha(M) ? s = "svg" : (s === "mathml" || za(M)) && (s = "mathml"), y ? (d(
        e.dynamicChildren,
        y,
        A,
        i,
        o,
        s,
        l
      ), Rl(e, t, !0)) : a || f(
        e,
        t,
        A,
        N,
        i,
        o,
        s,
        l,
        !1
      ), v)
        I ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : xi(
          t,
          n,
          S,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const D = t.target = Os(
          t.props,
          g
        );
        D && xi(
          t,
          D,
          null,
          u,
          0
        );
      } else
        I && xi(
          t,
          M,
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
  move: xi,
  hydrate: Em
};
function xi(e, t, n, { o: { insert: r }, m: i }, o = 2) {
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
function Em(e, t, n, r, i, o, {
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
const ke = Symbol.for("v-fgt"), ti = Symbol.for("v-txt"), Mt = Symbol.for("v-cmt"), ls = Symbol.for("v-stc"), Nr = [];
let Lt = null;
function zn(e = !1) {
  Nr.push(Lt = e ? null : []);
}
function Mm() {
  Nr.pop(), Lt = Nr[Nr.length - 1] || null;
}
let zr = 1;
function ja(e) {
  zr += e;
}
function If(e) {
  return e.dynamicChildren = zr > 0 ? Lt || rr : null, Mm(), zr > 0 && Lt && Lt.push(e), e;
}
function Fs(e, t, n, r, i, o) {
  return If(
    Ne(
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
    b(
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
const Io = "__vInternal", $f = ({ key: e }) => e ?? null, Oi = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ae(e) || $e(e) || le(e) ? { i: qe, r: e, k: t, f: !!n } : e : null);
function Ne(e, t = null, n = null, r = 0, i = null, o = e === ke ? 0 : 1, s = !1, l = !1) {
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
  return l ? (Nl(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ae(n) ? 8 : 16), zr > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Lt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Lt.push(a), a;
}
const b = Tm;
function Tm(e, t = null, n = null, r = 0, i = null, o = !1) {
  if ((!e || e === gf) && (e = Mt), Bs(e)) {
    const l = wn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Nl(l, n), zr > 0 && !o && Lt && (l.shapeFlag & 6 ? Lt[Lt.indexOf(e)] = l : Lt.push(l)), l.patchFlag |= -2, l;
  }
  if (Dm(e) && (e = e.__vccOpts), t) {
    t = Vm(t);
    let { class: l, style: a } = t;
    l && !Ae(l) && (t.class = pl(l)), Le(a) && (Qc(a) && !re(a) && (a = Ie({}, a)), t.style = vl(a));
  }
  const s = Ae(e) ? 1 : Ug(e) ? 128 : Sm(e) ? 64 : Le(e) ? 4 : le(e) ? 2 : 0;
  return Ne(
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
function wn(e, t, n = !1) {
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
    patchFlag: t && e.type !== ke ? o === -1 ? 16 : o | 16 : o,
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
function Ue(e = " ", t = 0) {
  return b(ti, null, e, t);
}
function Im(e = "", t = !1) {
  return t ? (zn(), Vo(Mt, null, e)) : b(Mt, null, e);
}
function At(e) {
  return e == null || typeof e == "boolean" ? b(Mt) : re(e) ? b(
    ke,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? fn(e) : b(ti, null, String(e));
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
      !i && !(Io in t) ? t._ctx = qe : i === 3 && qe && (qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    le(t) ? (t = { default: t, _ctx: qe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ue(t)]) : n = 8);
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
function Pt(e, t, n, r = null) {
  bt(e, t, 7, [
    n,
    r
  ]);
}
const $m = Cf();
let Pm = 0;
function Am(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || $m, o = {
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Fg.bind(null, o), e.ce && e.ce(o), o;
}
let Fe = null;
const Ol = () => Fe || qe;
let Qi, Ds;
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
  ), Ds = t(
    "__VUE_SSR_SETTERS__",
    (n) => $o = n
  );
}
const ni = (e) => {
  const t = Fe;
  return Qi(e), e.scope.on(), () => {
    e.scope.off(), Qi(t);
  };
}, Wa = () => {
  Fe && Fe.scope.off(), Qi(null);
};
function Pf(e) {
  return e.vnode.shapeFlag & 4;
}
let $o = !1;
function Rm(e, t = !1) {
  t && Ds(t);
  const { props: n, children: r } = e.vnode, i = Pf(e);
  mm(e, n, i, t), ym(e, r);
  const o = i ? Nm(e, t) : void 0;
  return t && Ds(!1), o;
}
function Nm(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ef(new Proxy(e.ctx, lm));
  const { setup: r } = n;
  if (r) {
    const i = e.setupContext = r.length > 1 ? Fm(e) : null, o = ni(e);
    Un();
    const s = pn(
      r,
      e,
      0,
      [
        e.props,
        i
      ]
    );
    if (Gn(), o(), Rc(s)) {
      if (s.then(Wa, Wa), t)
        return s.then((l) => {
          Ua(e, l, t);
        }).catch((l) => {
          Eo(l, e, 0);
        });
      e.asyncDep = s;
    } else
      Ua(e, s, t);
  } else
    Af(e, t);
}
function Ua(e, t, n) {
  le(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Le(t) && (e.setupState = of(t)), Af(e, n);
}
let Ga;
function Af(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Ga && !r.render) {
      const i = r.template || Pl(e).template;
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
        r.render = Ga(i, u);
      }
    }
    e.render = r.render || wt;
  }
  {
    const i = ni(e);
    Un();
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
function Po(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(of(ef(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Pr)
          return Pr[n](e);
      },
      has(t, n) {
        return n in t || n in Pr;
      }
    }));
}
function Bm(e, t = !0) {
  return le(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Dm(e) {
  return le(e) && "__vccOpts" in e;
}
const V = (e, t) => Mg(e, t, $o);
function br(e, t, n) {
  const r = arguments.length;
  return r === 2 ? Le(t) && !re(t) ? Bs(t) ? b(e, null, [t]) : b(e, t) : b(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Bs(n) && (n = [n]), b(e, t, n));
}
const Hm = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const zm = "http://www.w3.org/2000/svg", jm = "http://www.w3.org/1998/Math/MathML", dn = typeof document < "u" ? document : null, qa = dn && /* @__PURE__ */ dn.createElement("template"), Wm = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const i = t === "svg" ? dn.createElementNS(zm, e) : t === "mathml" ? dn.createElementNS(jm, e) : dn.createElement(e, n ? { is: n } : void 0);
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
      qa.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
      const l = qa.content;
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
}, sn = "transition", Sr = "animation", dr = Symbol("_vtc"), Xt = (e, { slots: t }) => br(Zg, Nf(e), t);
Xt.displayName = "Transition";
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
}, Um = Xt.props = /* @__PURE__ */ Ie(
  {},
  yf,
  Rf
), Ln = (e, t = []) => {
  re(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ya = (e) => e ? re(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Nf(e) {
  const t = {};
  for (const $ in e)
    $ in Rf || (t[$] = e[$]);
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
  } = e, g = Gm(i), m = g && g[0], p = g && g[1], {
    onBeforeEnter: v,
    onEnter: x,
    onEnterCancelled: k,
    onLeave: y,
    onLeaveCancelled: S,
    onBeforeAppear: M = v,
    onAppear: E = x,
    onAppearCancelled: I = k
  } = t, A = ($, R, C) => {
    an($, R ? c : l), an($, R ? u : s), C && C();
  }, N = ($, R) => {
    $._isLeaving = !1, an($, f), an($, h), an($, d), R && R();
  }, D = ($) => (R, C) => {
    const O = $ ? E : x, T = () => A(R, $, C);
    Ln(O, [R, T]), Ka(() => {
      an(R, $ ? a : o), Ut(R, $ ? c : l), Ya(O) || Xa(R, r, m, T);
    });
  };
  return Ie(t, {
    onBeforeEnter($) {
      Ln(v, [$]), Ut($, o), Ut($, s);
    },
    onBeforeAppear($) {
      Ln(M, [$]), Ut($, a), Ut($, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave($, R) {
      $._isLeaving = !0;
      const C = () => N($, R);
      Ut($, f), Ff(), Ut($, d), Ka(() => {
        $._isLeaving && (an($, f), Ut($, h), Ya(y) || Xa($, r, p, C));
      }), Ln(y, [$, C]);
    },
    onEnterCancelled($) {
      A($, !1), Ln(k, [$]);
    },
    onAppearCancelled($) {
      A($, !0), Ln(I, [$]);
    },
    onLeaveCancelled($) {
      N($), Ln(S, [$]);
    }
  });
}
function Gm(e) {
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
  return Ls(e);
}
function Ut(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[dr] || (e[dr] = /* @__PURE__ */ new Set())).add(t);
}
function an(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[dr];
  n && (n.delete(t), n.size || (e[dr] = void 0));
}
function Ka(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let qm = 0;
function Xa(e, t, n, r) {
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
  const n = window.getComputedStyle(e), r = (g) => (n[g] || "").split(", "), i = r(`${sn}Delay`), o = r(`${sn}Duration`), s = Za(i, o), l = r(`${Sr}Delay`), a = r(`${Sr}Duration`), u = Za(l, a);
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
function Za(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => Ja(n) + Ja(e[r])));
}
function Ja(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ff() {
  return document.body.offsetHeight;
}
function Ym(e, t, n) {
  const r = e[dr];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const eo = Symbol("_vod"), Bf = Symbol("_vsh"), Yn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[eo] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : kr(e, t);
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
  e.style.display = t ? e[eo] : "none", e[Bf] = !t;
}
const Km = Symbol(""), Xm = /(^|;)\s*display\s*:/;
function Zm(e, t, n) {
  const r = e.style, i = Ae(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (Ae(t))
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
const Qa = /\s*!important$/;
function Fi(e, t, n) {
  if (re(n))
    n.forEach((r) => Fi(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Jm(e, t);
    Qa.test(n) ? e.setProperty(
      kt(r),
      n.replace(Qa, ""),
      "important"
    ) : e[r] = n;
  }
}
const eu = ["Webkit", "Moz", "ms"], us = {};
function Jm(e, t) {
  const n = us[t];
  if (n)
    return n;
  let r = Ze(t);
  if (r !== "filter" && r in e)
    return us[t] = r;
  r = yr(r);
  for (let i = 0; i < eu.length; i++) {
    const o = eu[i] + r;
    if (o in e)
      return us[t] = o;
  }
  return t;
}
const tu = "http://www.w3.org/1999/xlink";
function Qm(e, t, n, r, i) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(tu, t.slice(6, t.length)) : e.setAttributeNS(tu, t, n);
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
const nu = Symbol("_vei");
function rv(e, t, n, r, i = null) {
  const o = e[nu] || (e[nu] = {}), s = o[t];
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
const ru = /(?:Once|Passive|Capture)$/;
function iv(e) {
  let t;
  if (ru.test(e)) {
    t = {};
    let r;
    for (; r = e.match(ru); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : kt(e.slice(2)), t];
}
let cs = 0;
const ov = /* @__PURE__ */ Promise.resolve(), sv = () => cs || (ov.then(() => cs = 0), cs = Date.now());
function lv(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    bt(
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
const iu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
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
    return !!(t === "innerHTML" || t === "textContent" || t in e && iu(t) && le(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return iu(t) && Ae(n) ? !1 : t in e;
}
const Df = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), to = Symbol("_moveCb"), ou = Symbol("_enterCb"), zf = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ie({}, Um, {
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
        Ut(u, s), c.transform = c.webkitTransform = c.transitionDuration = "";
        const f = u[to] = (d) => {
          d && d.target !== u || (!d || /transform$/.test(d.propertyName)) && (u.removeEventListener("transitionend", f), u[to] = null, an(u, s));
        };
        u.addEventListener("transitionend", f);
      });
    }), () => {
      const s = pe(e), l = Nf(s);
      let a = s.tag || ke;
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
      return b(a, null, o);
    };
  }
}, fv = (e) => delete e.mode;
zf.props;
const jf = zf;
function dv(e) {
  const t = e.el;
  t[to] && t[to](), t[ou] && t[ou]();
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
  const r = e.cloneNode(), i = e[dr];
  i && i.forEach((l) => {
    l.split(/\s+/).forEach((a) => a && r.classList.remove(a));
  }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Of(r);
  return o.removeChild(r), s;
}
const vv = /* @__PURE__ */ Ie({ patchProp: uv }, Wm);
let su;
function pv() {
  return su || (su = bm(vv));
}
const lu = (...e) => {
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
  const r = /* @__PURE__ */ wr(e);
  class i extends Fl {
    constructor(s) {
      super(r, s, t, n);
    }
  }
  return lt(i, "def", r), i;
}
const bv = typeof HTMLElement < "u" ? yv : class {
};
class Fl extends bv {
  constructor(n, r = {}, i = {}, o) {
    super();
    /**
     * @internal
     */
    lt(this, "_instance", null);
    lt(this, "_connected", !1);
    lt(this, "_resolved", !1);
    lt(this, "_numberProps", null);
    lt(this, "_styles");
    lt(this, "_slots");
    lt(this, "_ob", null);
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
      this._connected || (lu(null, this._root), this._instance = null);
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
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = Ls(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[Ze(u)] = !0);
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
    r !== this._props[n] && (this._props[n] = r, o && this._instance && this._update(), i && (r === !0 ? this.setAttribute(kt(n), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(kt(n), r + "") : r || this.removeAttribute(kt(n))));
  }
  _update() {
    lu(this._createVNode(), this._root);
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
        return s.innerHTML = o.innerHTML, b(o.tagName, s, null);
      });
    });
    const r = b(this._def, Ie({}, this._props), n);
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
        o(l, a), kt(l) !== l && o(kt(l), a);
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
        n[i] = au(n[i], e.name, t);
      else if (t == null)
        for (i in n)
          n[i] = au(n[i], e.name, null);
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
function au(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = _v, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Hs = "http://www.w3.org/1999/xhtml";
const uu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Hs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ao(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), uu.hasOwnProperty(t) ? { space: uu[t], local: e } : e;
}
function Sv(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Hs && t.documentElement.namespaceURI === Hs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function kv(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Wf(e) {
  var t = Ao(e);
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
  return new gt(r, this._parents);
}
function Mv(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Tv() {
  return [];
}
function Uf(e) {
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
  typeof e == "function" ? e = Vv(e) : e = Uf(e);
  for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = t[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && (r.push(e.call(a, a.__data__, u, s)), i.push(a));
  return new gt(r, i);
}
function Gf(e) {
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
function Pv(e) {
  return function() {
    return $v.call(this.children, e);
  };
}
function Av() {
  return this.firstElementChild;
}
function Rv(e) {
  return this.select(e == null ? Av : Pv(typeof e == "function" ? e : qf(e)));
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
  typeof e != "function" && (e = Gf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new gt(r, this._parents);
}
function Yf(e) {
  return new Array(e.length);
}
function Hv() {
  return new gt(this._enter || this._groups.map(Yf), this._parents);
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
function Uv(e) {
  return e.__data__;
}
function Gv(e, t) {
  if (!arguments.length)
    return Array.from(this, Uv);
  var n = t ? Wv : jv, r = this._parents, i = this._groups;
  typeof e != "function" && (e = zv(e));
  for (var o = i.length, s = new Array(o), l = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = r[u], f = i[u], d = f.length, h = qv(e.call(c, c && c.__data__, u, r)), g = h.length, m = l[u] = new Array(g), p = s[u] = new Array(g), v = a[u] = new Array(d);
    n(c, f, m, p, v, h, t);
    for (var x = 0, k = 0, y, S; x < g; ++x)
      if (y = m[x]) {
        for (x >= k && (k = x + 1); !(S = p[k]) && ++k < g; )
          ;
        y._next = S || null;
      }
  }
  return s = new gt(s, r), s._enter = l, s._exit = a, s;
}
function qv(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Yv() {
  return new gt(this._exit || this._groups.map(Yf), this._parents);
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
  return new gt(l, this._parents);
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
  return new gt(i, this._parents).order();
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
  var n = Ao(e);
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
  return arguments.length > 1 ? this.each((t == null ? h0 : typeof t == "function" ? m0 : g0)(e, t, n ?? "")) : hr(this.node(), e);
}
function hr(e, t) {
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
function P0() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function A0() {
  return this.each(P0);
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
function U0(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function G0(e) {
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
    var r = this.__on, i, o = G0(t);
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
function* e1() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var td = [null];
function gt(e, t) {
  this._groups = e, this._parents = t;
}
function ii() {
  return new gt([[document.documentElement]], td);
}
function t1() {
  return this;
}
gt.prototype = ii.prototype = {
  constructor: gt,
  select: Lv,
  selectAll: Iv,
  selectChild: Rv,
  selectChildren: Bv,
  filter: Dv,
  data: Gv,
  enter: Hv,
  exit: Yv,
  join: Kv,
  merge: Xv,
  selection: t1,
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
  raise: A0,
  lower: N0,
  append: O0,
  insert: B0,
  remove: H0,
  clone: W0,
  datum: U0,
  on: X0,
  dispatch: Q0,
  [Symbol.iterator]: e1
};
function Nt(e) {
  return typeof e == "string" ? new gt([[document.querySelector(e)]], [document.documentElement]) : new gt([[e]], td);
}
function nd(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function yt(e, t) {
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
function n1(e, t) {
  return e.target && (e = nd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => yt(n, t));
}
const r1 = { passive: !1 }, jr = { capture: !0, passive: !1 };
function fs(e) {
  e.stopImmediatePropagation();
}
function lr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function rd(e) {
  var t = e.document.documentElement, n = Nt(e).on("dragstart.drag", lr, jr);
  "onselectstart" in t ? n.on("selectstart.drag", lr, jr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function id(e, t) {
  var n = e.document.documentElement, r = Nt(e).on("dragstart.drag", null);
  t && (r.on("click.drag", lr, jr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ci = (e) => () => e;
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
function i1(e) {
  return !e.ctrlKey && !e.button;
}
function o1() {
  return this.parentNode;
}
function s1(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function l1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function a1() {
  var e = i1, t = o1, n = s1, r = l1, i = {}, o = ri("start", "drag", "end"), s = 0, l, a, u, c, f = 0;
  function d(y) {
    y.on("mousedown.drag", h).filter(r).on("touchstart.drag", p).on("touchmove.drag", v, r1).on("touchend.drag touchcancel.drag", x).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(y, S) {
    if (!(c || !e.call(this, y, S))) {
      var M = k(this, t.call(this, y, S), y, S, "mouse");
      M && (Nt(y.view).on("mousemove.drag", g, jr).on("mouseup.drag", m, jr), rd(y.view), fs(y), u = !1, l = y.clientX, a = y.clientY, M("start", y));
    }
  }
  function g(y) {
    if (lr(y), !u) {
      var S = y.clientX - l, M = y.clientY - a;
      u = S * S + M * M > f;
    }
    i.mouse("drag", y);
  }
  function m(y) {
    Nt(y.view).on("mousemove.drag mouseup.drag", null), id(y.view, u), lr(y), i.mouse("end", y);
  }
  function p(y, S) {
    if (e.call(this, y, S)) {
      var M = y.changedTouches, E = t.call(this, y, S), I = M.length, A, N;
      for (A = 0; A < I; ++A)
        (N = k(this, E, y, S, M[A].identifier, M[A])) && (fs(y), N("start", y, M[A]));
    }
  }
  function v(y) {
    var S = y.changedTouches, M = S.length, E, I;
    for (E = 0; E < M; ++E)
      (I = i[S[E].identifier]) && (lr(y), I("drag", y, S[E]));
  }
  function x(y) {
    var S = y.changedTouches, M = S.length, E, I;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), E = 0; E < M; ++E)
      (I = i[S[E].identifier]) && (fs(y), I("end", y, S[E]));
  }
  function k(y, S, M, E, I, A) {
    var N = o.copy(), D = yt(A || M, S), $, R, C;
    if ((C = n.call(y, new zs("beforestart", {
      sourceEvent: M,
      target: d,
      identifier: I,
      active: s,
      x: D[0],
      y: D[1],
      dx: 0,
      dy: 0,
      dispatch: N
    }), E)) != null)
      return $ = C.x - D[0] || 0, R = C.y - D[1] || 0, function O(T, B, F) {
        var q = D, K;
        switch (T) {
          case "start":
            i[I] = O, K = s++;
            break;
          case "end":
            delete i[I], --s;
          case "drag":
            D = yt(F || B, S), K = s;
            break;
        }
        N.call(
          T,
          y,
          new zs(T, {
            sourceEvent: B,
            subject: C,
            target: d,
            identifier: I,
            active: K,
            x: D[0] + $,
            y: D[1] + R,
            dx: D[0] - q[0],
            dy: D[1] - q[1],
            dispatch: N
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
var Wr = 0.7, ro = 1 / Wr, ar = "\\s*([+-]?\\d+)\\s*", Ur = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", u1 = /^#([0-9a-f]{3,8})$/, c1 = new RegExp(`^rgb\\(${ar},${ar},${ar}\\)$`), f1 = new RegExp(`^rgb\\(${Bt},${Bt},${Bt}\\)$`), d1 = new RegExp(`^rgba\\(${ar},${ar},${ar},${Ur}\\)$`), h1 = new RegExp(`^rgba\\(${Bt},${Bt},${Bt},${Ur}\\)$`), g1 = new RegExp(`^hsl\\(${Ur},${Bt},${Bt}\\)$`), m1 = new RegExp(`^hsla\\(${Ur},${Bt},${Bt},${Ur}\\)$`), cu = {
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
Hl(oi, Gr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fu,
  // Deprecated! Use color.formatHex.
  formatHex: fu,
  formatHex8: v1,
  formatHsl: p1,
  formatRgb: du,
  toString: du
});
function fu() {
  return this.rgb().formatHex();
}
function v1() {
  return this.rgb().formatHex8();
}
function p1() {
  return sd(this).formatHsl();
}
function du() {
  return this.rgb().formatRgb();
}
function Gr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = u1.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? hu(t) : n === 3 ? new tt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Si(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Si(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = c1.exec(e)) ? new tt(t[1], t[2], t[3], 1) : (t = f1.exec(e)) ? new tt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = d1.exec(e)) ? Si(t[1], t[2], t[3], t[4]) : (t = h1.exec(e)) ? Si(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = g1.exec(e)) ? vu(t[1], t[2] / 100, t[3] / 100, 1) : (t = m1.exec(e)) ? vu(t[1], t[2] / 100, t[3] / 100, t[4]) : cu.hasOwnProperty(e) ? hu(cu[e]) : e === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function hu(e) {
  return new tt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Si(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new tt(e, t, n, r);
}
function y1(e) {
  return e instanceof oi || (e = Gr(e)), e ? (e = e.rgb(), new tt(e.r, e.g, e.b, e.opacity)) : new tt();
}
function js(e, t, n, r) {
  return arguments.length === 1 ? y1(e) : new tt(e, t, n, r ?? 1);
}
function tt(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Hl(tt, js, od(oi, {
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
    return new tt(Bn(this.r), Bn(this.g), Bn(this.b), io(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: gu,
  // Deprecated! Use color.formatHex.
  formatHex: gu,
  formatHex8: w1,
  formatRgb: mu,
  toString: mu
}));
function gu() {
  return `#${Rn(this.r)}${Rn(this.g)}${Rn(this.b)}`;
}
function w1() {
  return `#${Rn(this.r)}${Rn(this.g)}${Rn(this.b)}${Rn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function mu() {
  const e = io(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Bn(this.r)}, ${Bn(this.g)}, ${Bn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function io(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Bn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Rn(e) {
  return e = Bn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function vu(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Et(e, t, n, r);
}
function sd(e) {
  if (e instanceof Et)
    return new Et(e.h, e.s, e.l, e.opacity);
  if (e instanceof oi || (e = Gr(e)), !e)
    return new Et();
  if (e instanceof Et)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), o = Math.max(t, n, r), s = NaN, l = o - i, a = (o + i) / 2;
  return l ? (t === o ? s = (n - r) / l + (n < r) * 6 : n === o ? s = (r - t) / l + 2 : s = (t - n) / l + 4, l /= a < 0.5 ? o + i : 2 - o - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new Et(s, l, a, e.opacity);
}
function b1(e, t, n, r) {
  return arguments.length === 1 ? sd(e) : new Et(e, t, n, r ?? 1);
}
function Et(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Hl(Et, b1, od(oi, {
  brighter(e) {
    return e = e == null ? ro : Math.pow(ro, e), new Et(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wr : Math.pow(Wr, e), new Et(this.h, this.s, this.l * e, this.opacity);
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
    return new Et(pu(this.h), ki(this.s), ki(this.l), io(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = io(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${pu(this.h)}, ${ki(this.s) * 100}%, ${ki(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function pu(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ki(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ds(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ld = (e) => () => e;
function _1(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function x1(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function C1(e) {
  return (e = +e) == 1 ? ad : function(t, n) {
    return n - t ? x1(t, n, e) : ld(isNaN(t) ? n : t);
  };
}
function ad(e, t) {
  var n = t - e;
  return n ? _1(e, n) : ld(isNaN(e) ? t : e);
}
const yu = function e(t) {
  var n = C1(t);
  function r(i, o) {
    var s = n((i = js(i)).r, (o = js(o)).r), l = n(i.g, o.g), a = n(i.b, o.b), u = ad(i.opacity, o.opacity);
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
var Ws = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hs = new RegExp(Ws.source, "g");
function S1(e) {
  return function() {
    return e;
  };
}
function k1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function E1(e, t) {
  var n = Ws.lastIndex = hs.lastIndex = 0, r, i, o, s = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (r = Ws.exec(e)) && (i = hs.exec(t)); )
    (o = i.index) > n && (o = t.slice(n, o), l[s] ? l[s] += o : l[++s] = o), (r = r[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: hn(r, i) })), n = hs.lastIndex;
  return n < t.length && (o = t.slice(n), l[s] ? l[s] += o : l[++s] = o), l.length < 2 ? a[0] ? k1(a[0].x) : S1(t) : (t = a.length, function(u) {
    for (var c = 0, f; c < t; ++c)
      l[(f = a[c]).i] = f.x(u);
    return l.join("");
  });
}
var wu = 180 / Math.PI, Us = {
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
    rotate: Math.atan2(t, e) * wu,
    skewX: Math.atan(a) * wu,
    scaleX: s,
    scaleY: l
  };
}
var Ei;
function L1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Us : ud(t.a, t.b, t.c, t.d, t.e, t.f);
}
function M1(e) {
  return e == null || (Ei || (Ei = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ei.setAttribute("transform", e), !(e = Ei.transform.baseVal.consolidate())) ? Us : (e = e.matrix, ud(e.a, e.b, e.c, e.d, e.e, e.f));
}
function cd(e, t, n, r) {
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
var T1 = cd(L1, "px, ", "px)", "deg)"), V1 = cd(M1, ", ", ")", ")"), I1 = 1e-12;
function bu(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function $1(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function P1(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const A1 = function e(t, n, r) {
  function i(o, s) {
    var l = o[0], a = o[1], u = o[2], c = s[0], f = s[1], d = s[2], h = c - l, g = f - a, m = h * h + g * g, p, v;
    if (m < I1)
      v = Math.log(d / u) / t, p = function(E) {
        return [
          l + E * h,
          a + E * g,
          u * Math.exp(t * E * v)
        ];
      };
    else {
      var x = Math.sqrt(m), k = (d * d - u * u + r * m) / (2 * u * n * x), y = (d * d - u * u - r * m) / (2 * d * n * x), S = Math.log(Math.sqrt(k * k + 1) - k), M = Math.log(Math.sqrt(y * y + 1) - y);
      v = (M - S) / t, p = function(E) {
        var I = E * v, A = bu(S), N = u / (n * x) * (A * P1(t * I + S) - $1(S));
        return [
          l + N * h,
          a + N * g,
          u * A / bu(t * I + S)
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
var gr = 0, Vr = 0, Er = 0, fd = 1e3, oo, Ir, so = 0, jn = 0, Ro = 0, qr = typeof performance == "object" && performance.now ? performance : Date, dd = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zl() {
  return jn || (dd(R1), jn = qr.now() + Ro);
}
function R1() {
  jn = 0;
}
function lo() {
  this._call = this._time = this._next = null;
}
lo.prototype = jl.prototype = {
  constructor: lo,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? zl() : +n) + (t == null ? 0 : +t), !this._next && Ir !== this && (Ir ? Ir._next = this : oo = this, Ir = this), this._call = e, this._time = n, Gs();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Gs());
  }
};
function jl(e, t, n) {
  var r = new lo();
  return r.restart(e, t, n), r;
}
function N1() {
  zl(), ++gr;
  for (var e = oo, t; e; )
    (t = jn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --gr;
}
function _u() {
  jn = (so = qr.now()) + Ro, gr = Vr = 0;
  try {
    N1();
  } finally {
    gr = 0, F1(), jn = 0;
  }
}
function O1() {
  var e = qr.now(), t = e - so;
  t > fd && (Ro -= t, so = e);
}
function F1() {
  for (var e, t = oo, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : oo = n);
  Ir = e, Gs(r);
}
function Gs(e) {
  if (!gr) {
    Vr && (Vr = clearTimeout(Vr));
    var t = e - jn;
    t > 24 ? (e < 1 / 0 && (Vr = setTimeout(_u, e - qr.now() - Ro)), Er && (Er = clearInterval(Er))) : (Er || (so = qr.now(), Er = setInterval(O1, fd)), gr = 1, dd(_u));
  }
}
function xu(e, t, n) {
  var r = new lo();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var B1 = ri("start", "end", "cancel", "interrupt"), D1 = [], hd = 0, Cu = 1, qs = 2, Di = 3, Su = 4, Ys = 5, Hi = 6;
function No(e, t, n, r, i, o) {
  var s = e.__transition;
  if (!s)
    e.__transition = {};
  else if (n in s)
    return;
  H1(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: B1,
    tween: D1,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: hd
  });
}
function Wl(e, t) {
  var n = Vt(e, t);
  if (n.state > hd)
    throw new Error("too late; already scheduled");
  return n;
}
function Ht(e, t) {
  var n = Vt(e, t);
  if (n.state > Di)
    throw new Error("too late; already running");
  return n;
}
function Vt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function H1(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = jl(o, 0, n.time);
  function o(u) {
    n.state = Cu, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var c, f, d, h;
    if (n.state !== Cu)
      return a();
    for (c in r)
      if (h = r[c], h.name === n.name) {
        if (h.state === Di)
          return xu(s);
        h.state === Su ? (h.state = Hi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[c]) : +c < t && (h.state = Hi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[c]);
      }
    if (xu(function() {
      n.state === Di && (n.state = Su, n.timer.restart(l, n.delay, n.time), l(u));
    }), n.state = qs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === qs) {
      for (n.state = Di, i = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
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
      i = r.state > qs && r.state < Ys, r.state = Hi, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[s];
    }
    o && delete e.__transition;
  }
}
function z1(e) {
  return this.each(function() {
    zi(this, e);
  });
}
function j1(e, t) {
  var n, r;
  return function() {
    var i = Ht(this, e), o = i.tween;
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
function W1(e, t, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = Ht(this, e), s = o.tween;
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
function U1(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = Vt(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? j1 : W1)(n, e, t));
}
function Ul(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = Ht(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return Vt(i, r).value[t];
  };
}
function gd(e, t) {
  var n;
  return (typeof t == "number" ? hn : t instanceof Gr ? yu : (n = Gr(t)) ? (t = n, yu) : E1)(e, t);
}
function G1(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function q1(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Y1(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function K1(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function X1(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function Z1(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l)));
  };
}
function J1(e, t) {
  var n = Ao(e), r = n === "transform" ? V1 : gd;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Z1 : X1)(n, r, Ul(this, "attr." + e, t)) : t == null ? (n.local ? q1 : G1)(n) : (n.local ? K1 : Y1)(n, r, t));
}
function Q1(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function ep(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function tp(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && ep(e, o)), n;
  }
  return i._value = t, i;
}
function np(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && Q1(e, o)), n;
  }
  return i._value = t, i;
}
function rp(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var r = Ao(e);
  return this.tween(n, (r.local ? tp : np)(r, t));
}
function ip(e, t) {
  return function() {
    Wl(this, e).delay = +t.apply(this, arguments);
  };
}
function op(e, t) {
  return t = +t, function() {
    Wl(this, e).delay = t;
  };
}
function sp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ip : op)(t, e)) : Vt(this.node(), t).delay;
}
function lp(e, t) {
  return function() {
    Ht(this, e).duration = +t.apply(this, arguments);
  };
}
function ap(e, t) {
  return t = +t, function() {
    Ht(this, e).duration = t;
  };
}
function up(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? lp : ap)(t, e)) : Vt(this.node(), t).duration;
}
function cp(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Ht(this, e).ease = t;
  };
}
function fp(e) {
  var t = this._id;
  return arguments.length ? this.each(cp(t, e)) : Vt(this.node(), t).ease;
}
function dp(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Ht(this, e).ease = n;
  };
}
function hp(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(dp(this._id, e));
}
function gp(e) {
  typeof e != "function" && (e = Gf(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], a, u = 0; u < s; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && l.push(a);
  return new Zt(r, this._parents, this._name, this._id);
}
function mp(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), s = new Array(r), l = 0; l < o; ++l)
    for (var a = t[l], u = n[l], c = a.length, f = s[l] = new Array(c), d, h = 0; h < c; ++h)
      (d = a[h] || u[h]) && (f[h] = d);
  for (; l < r; ++l)
    s[l] = t[l];
  return new Zt(s, this._parents, this._name, this._id);
}
function vp(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function pp(e, t, n) {
  var r, i, o = vp(t) ? Wl : Ht;
  return function() {
    var s = o(this, e), l = s.on;
    l !== r && (i = (r = l).copy()).on(t, n), s.on = i;
  };
}
function yp(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Vt(this.node(), n).on.on(e) : this.each(pp(n, e, t));
}
function wp(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function bp() {
  return this.on("end.remove", wp(this._id));
}
function _p(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Bl(e));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var l = r[s], a = l.length, u = o[s] = new Array(a), c, f, d = 0; d < a; ++d)
      (c = l[d]) && (f = e.call(c, c.__data__, d, l)) && ("__data__" in c && (f.__data__ = c.__data__), u[d] = f, No(u[d], t, n, d, u, Vt(c, n)));
  return new Zt(o, this._parents, t, n);
}
function xp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Uf(e));
  for (var r = this._groups, i = r.length, o = [], s = [], l = 0; l < i; ++l)
    for (var a = r[l], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var d = e.call(c, c.__data__, f, a), h, g = Vt(c, n), m = 0, p = d.length; m < p; ++m)
          (h = d[m]) && No(h, t, n, m, d, g);
        o.push(d), s.push(c);
      }
  return new Zt(o, s, t, n);
}
var Cp = ii.prototype.constructor;
function Sp() {
  return new Cp(this._groups, this._parents);
}
function kp(e, t) {
  var n, r, i;
  return function() {
    var o = hr(this, e), s = (this.style.removeProperty(e), hr(this, e));
    return o === s ? null : o === n && s === r ? i : i = t(n = o, r = s);
  };
}
function md(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ep(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = hr(this, e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function Lp(e, t, n) {
  var r, i, o;
  return function() {
    var s = hr(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), hr(this, e))), s === a ? null : s === r && a === i ? o : (i = a, o = t(r = s, l));
  };
}
function Mp(e, t) {
  var n, r, i, o = "style." + t, s = "end." + o, l;
  return function() {
    var a = Ht(this, e), u = a.on, c = a.value[o] == null ? l || (l = md(t)) : void 0;
    (u !== n || i !== c) && (r = (n = u).copy()).on(s, i = c), a.on = r;
  };
}
function Tp(e, t, n) {
  var r = (e += "") == "transform" ? T1 : gd;
  return t == null ? this.styleTween(e, kp(e, r)).on("end.style." + e, md(e)) : typeof t == "function" ? this.styleTween(e, Lp(e, r, Ul(this, "style." + e, t))).each(Mp(this._id, e)) : this.styleTween(e, Ep(e, r, t), n).on("end.style." + e, null);
}
function Vp(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function Ip(e, t, n) {
  var r, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (r = (i = s) && Vp(e, s, n)), r;
  }
  return o._value = t, o;
}
function $p(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (t == null)
    return this.tween(r, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(r, Ip(e, t, n ?? ""));
}
function Pp(e) {
  return function() {
    this.textContent = e;
  };
}
function Ap(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Rp(e) {
  return this.tween("text", typeof e == "function" ? Ap(Ul(this, "text", e)) : Pp(e == null ? "" : e + ""));
}
function Np(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Op(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && Np(i)), t;
  }
  return r._value = e, r;
}
function Fp(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, Op(e));
}
function Bp() {
  for (var e = this._name, t = this._id, n = vd(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      if (a = s[u]) {
        var c = Vt(a, t);
        No(a, e, n, u, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Zt(r, this._parents, e, n);
}
function Dp() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = Ht(this, r), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), u.on = t;
    }), i === 0 && o();
  });
}
var Hp = 0;
function Zt(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function vd() {
  return ++Hp;
}
var Wt = ii.prototype;
Zt.prototype = {
  constructor: Zt,
  select: _p,
  selectAll: xp,
  selectChild: Wt.selectChild,
  selectChildren: Wt.selectChildren,
  filter: gp,
  merge: mp,
  selection: Sp,
  transition: Bp,
  call: Wt.call,
  nodes: Wt.nodes,
  node: Wt.node,
  size: Wt.size,
  empty: Wt.empty,
  each: Wt.each,
  on: yp,
  attr: J1,
  attrTween: rp,
  style: Tp,
  styleTween: $p,
  text: Rp,
  textTween: Fp,
  remove: bp,
  tween: U1,
  delay: sp,
  duration: up,
  ease: fp,
  easeVarying: hp,
  end: Dp,
  [Symbol.iterator]: Wt[Symbol.iterator]
};
function zp(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var jp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: zp
};
function Wp(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Up(e) {
  var t, n;
  e instanceof Zt ? (t = e._id, e = e._name) : (t = vd(), (n = jp).time = zl(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, u = 0; u < l; ++u)
      (a = s[u]) && No(a, e, t, u, s, n || Wp(a, t));
  return new Zt(r, this._parents, e, t);
}
ii.prototype.interrupt = z1;
ii.prototype.transition = Up;
const Ks = Math.PI, Xs = 2 * Ks, Vn = 1e-6, Gp = Xs - Vn;
function pd(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function qp(e) {
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
class Yp {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? pd : qp(t);
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
        let h = r - s, g = i - l, m = a * a + u * u, p = h * h + g * g, v = Math.sqrt(m), x = Math.sqrt(d), k = o * Math.tan((Ks - Math.acos((m + d - p) / (2 * v * x))) / 2), y = k / x, S = k / v;
        Math.abs(y - 1) > Vn && this._append`L${t + y * c},${n + y * f}`, this._append`A${o},${o},0,0,${+(f * h > c * g)},${this._x1 = t + S * a},${this._y1 = n + S * u}`;
      }
  }
  arc(t, n, r, i, o, s) {
    if (t = +t, n = +n, r = +r, s = !!s, r < 0)
      throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), u = t + l, c = n + a, f = 1 ^ s, d = s ? i - o : o - i;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > Vn || Math.abs(this._y1 - c) > Vn) && this._append`L${u},${c}`, r && (d < 0 && (d = d % Xs + Xs), d > Gp ? this._append`A${r},${r},0,1,${f},${t - l},${n - a}A${r},${r},0,1,${f},${this._x1 = u},${this._y1 = c}` : d > Vn && this._append`A${r},${r},0,${+(d >= Ks)},${f},${this._x1 = t + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(t, n, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Kp(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return yd(this.cover(t, n), t, n, e);
}
function yd(e, t, n, r) {
  if (isNaN(t) || isNaN(n))
    return e;
  var i, o = e._root, s = { data: r }, l = e._x0, a = e._y0, u = e._x1, c = e._y1, f, d, h, g, m, p, v, x;
  if (!o)
    return e._root = s, e;
  for (; o.length; )
    if ((m = t >= (f = (l + u) / 2)) ? l = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d, i = o, !(o = o[v = p << 1 | m]))
      return i[v] = s, e;
  if (h = +e._x.call(null, o.data), g = +e._y.call(null, o.data), t === h && n === g)
    return s.next = o, i ? i[v] = s : e._root = s, e;
  do
    i = i ? i[v] = new Array(4) : e._root = new Array(4), (m = t >= (f = (l + u) / 2)) ? l = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d;
  while ((v = p << 1 | m) === (x = (g >= d) << 1 | h >= f));
  return i[x] = o, i[v] = s, e;
}
function Xp(e) {
  var t, n, r = e.length, i, o, s = new Array(r), l = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (s[n] = i, l[n] = o, i < a && (a = i), i > c && (c = i), o < u && (u = o), o > f && (f = o));
  if (a > c || u > f)
    return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < r; ++n)
    yd(this, s[n], l[n], e[n]);
  return this;
}
function Zp(e, t) {
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
function Jp() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length)
      do
        e.push(t.data);
      while (t = t.next);
  }), e;
}
function Qp(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ge(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function ey(e, t, n) {
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
        var x = e - +this._x.call(null, h.data), k = t - +this._y.call(null, h.data), y = x * x + k * k;
        if (y < n) {
          var S = Math.sqrt(n = y);
          i = e - S, o = t - S, c = e + S, f = t + S, r = h.data;
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
  for (r && t.push(new Ge(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, o = n.x0, s = n.y0, l = n.x1, a = n.y1) && r.length) {
      var u = (o + l) / 2, c = (s + a) / 2;
      (i = r[3]) && t.push(new Ge(i, u, c, l, a)), (i = r[2]) && t.push(new Ge(i, o, c, u, a)), (i = r[1]) && t.push(new Ge(i, u, s, l, c)), (i = r[0]) && t.push(new Ge(i, o, s, u, c));
    }
  return this;
}
function sy(e) {
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
function Gl(e, t, n) {
  var r = new ql(t ?? ly, n ?? uy, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function ql(e, t, n, r, i, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function ku(e) {
  for (var t = { data: e.data }, n = t; e = e.next; )
    n = n.next = { data: e.data };
  return t;
}
var Je = Gl.prototype = ql.prototype;
Je.copy = function() {
  var e = new ql(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t)
    return e;
  if (!t.length)
    return e._root = ku(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = ku(r));
  return e;
};
Je.add = Kp;
Je.addAll = Xp;
Je.cover = Zp;
Je.data = Jp;
Je.extent = Qp;
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
function gn(e) {
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
      for (f = Gl(t, fy, dy).visitAfter(l), u = 0; u < c; ++u)
        d = t[u], m = n[d.index], p = m * m, h = d.x + d.vx, g = d.y + d.vy, f.visit(x);
    function x(k, y, S, M, E) {
      var I = k.data, A = k.r, N = m + A;
      if (I) {
        if (I.index > d.index) {
          var D = h - I.x - I.vx, $ = g - I.y - I.vy, R = D * D + $ * $;
          R < N * N && (D === 0 && (D = gn(r), R += D * D), $ === 0 && ($ = gn(r), R += $ * $), R = (N - (R = Math.sqrt(R))) / R * i, d.vx += (D *= R) * (N = (A *= A) / (p + A)), d.vy += ($ *= R) * N, I.vx -= D * (N = 1 - N), I.vy -= $ * N);
        }
        return;
      }
      return y > h + N || M < h - N || S > g + N || E < g - N;
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
function Eu(e, t) {
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
    for (var v = 0, x = e.length; v < c; ++v)
      for (var k = 0, y, S, M, E, I, A, N; k < x; ++k)
        y = e[k], S = y.source, M = y.target, E = M.x + M.vx - S.x - S.vx || gn(u), I = M.y + M.vy - S.y - S.vy || gn(u), A = Math.sqrt(E * E + I * I), A = (A - o[k]) / A * p * r[k], E *= A, I *= A, M.vx -= E * (N = a[k]), M.vy -= I * N, S.vx += E * (N = 1 - N), S.vy += I * N;
  }
  function h() {
    if (s) {
      var p, v = s.length, x = e.length, k = new Map(s.map((S, M) => [t(S, M, s), S])), y;
      for (p = 0, l = new Array(v); p < x; ++p)
        y = e[p], y.index = p, typeof y.source != "object" && (y.source = Eu(k, y.source)), typeof y.target != "object" && (y.target = Eu(k, y.target)), l[y.source.index] = (l[y.source.index] || 0) + 1, l[y.target.index] = (l[y.target.index] || 0) + 1;
      for (p = 0, a = new Array(x); p < x; ++p)
        y = e[p], a[p] = l[y.source.index] / (l[y.source.index] + l[y.target.index]);
      r = new Array(x), g(), o = new Array(x), m();
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
const vy = 1664525, py = 1013904223, Lu = 4294967296;
function yy() {
  let e = 1;
  return () => (e = (vy * e + py) % Lu) / Lu;
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
    var p, v = e.length, x;
    m === void 0 && (m = 1);
    for (var k = 0; k < m; ++k)
      for (n += (o - n) * i, l.forEach(function(y) {
        y(n);
      }), p = 0; p < v; ++p)
        x = e[p], x.fx == null ? x.x += x.vx *= s : (x.x = x.fx, x.vx = 0), x.fy == null ? x.y += x.vy *= s : (x.y = x.fy, x.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, p = e.length, v; m < p; ++m) {
      if (v = e[m], v.index = m, v.fx != null && (v.x = v.fx), v.fy != null && (v.y = v.fy), isNaN(v.x) || isNaN(v.y)) {
        var x = _y * Math.sqrt(0.5 + m), k = m * xy;
        v.x = x * Math.cos(k), v.y = x * Math.sin(k);
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
      var x = 0, k = e.length, y, S, M, E, I;
      for (v == null ? v = 1 / 0 : v *= v, x = 0; x < k; ++x)
        E = e[x], y = m - E.x, S = p - E.y, M = y * y + S * S, M < v && (I = E, v = M);
      return I;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function Sy() {
  var e, t, n, r, i = Ye(-30), o, s = 1, l = 1 / 0, a = 0.81;
  function u(h) {
    var g, m = e.length, p = Gl(e, wy, by).visitAfter(f);
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
    var g = 0, m, p, v = 0, x, k, y;
    if (h.length) {
      for (x = k = y = 0; y < 4; ++y)
        (m = h[y]) && (p = Math.abs(m.value)) && (g += m.value, v += p, x += p * m.x, k += p * m.y);
      h.x = x / v, h.y = k / v;
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
    var v = h.x - t.x, x = h.y - t.y, k = p - g, y = v * v + x * x;
    if (k * k / a < y)
      return y < l && (v === 0 && (v = gn(n), y += v * v), x === 0 && (x = gn(n), y += x * x), y < s && (y = Math.sqrt(s * y)), t.vx += v * h.value * r / y, t.vy += x * h.value * r / y), !0;
    if (h.length || y >= l)
      return;
    (h.data !== t || h.next) && (v === 0 && (v = gn(n), y += v * v), x === 0 && (x = gn(n), y += x * x), y < s && (y = Math.sqrt(s * y)));
    do
      h.data !== t && (k = o[h.data.index] * r / y, t.vx += v * k, t.vy += x * k);
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
function Zn(e) {
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
  }, () => new Yp(t);
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
  var n = Zn(!0), r = null, i = Ty, o = null, s = Ly(l);
  e = typeof e == "function" ? e : e === void 0 ? Vy : Zn(e), t = typeof t == "function" ? t : t === void 0 ? Iy : Zn(t);
  function l(a) {
    var u, c = (a = My(a)).length, f, d = !1, h;
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
const Li = (e) => () => e;
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
var bd = new Gt(1, 0, 0);
Gt.prototype;
function gs(e) {
  e.stopImmediatePropagation();
}
function Lr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ay(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ry() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Mu() {
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
  var e = Ay, t = Ry, n = Fy, r = Ny, i = Oy, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = A1, u = ri("start", "zoom", "end"), c, f, d, h = 500, g = 150, m = 0, p = 10;
  function v(C) {
    C.property("__zoom", Mu).on("wheel.zoom", I, { passive: !1 }).on("mousedown.zoom", A).on("dblclick.zoom", N).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", $).on("touchend.zoom touchcancel.zoom", R).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(C, O, T, B) {
    var F = C.selection ? C.selection() : C;
    F.property("__zoom", Mu), C !== F ? S(C, O, T, B) : F.interrupt().each(function() {
      M(this, arguments).event(B).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, v.scaleBy = function(C, O, T, B) {
    v.scaleTo(C, function() {
      var F = this.__zoom.k, q = typeof O == "function" ? O.apply(this, arguments) : O;
      return F * q;
    }, T, B);
  }, v.scaleTo = function(C, O, T, B) {
    v.transform(C, function() {
      var F = t.apply(this, arguments), q = this.__zoom, K = T == null ? y(F) : typeof T == "function" ? T.apply(this, arguments) : T, j = q.invert(K), Z = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(k(x(q, Z), K, j), F, s);
    }, T, B);
  }, v.translateBy = function(C, O, T, B) {
    v.transform(C, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), t.apply(this, arguments), s);
    }, null, B);
  }, v.translateTo = function(C, O, T, B, F) {
    v.transform(C, function() {
      var q = t.apply(this, arguments), K = this.__zoom, j = B == null ? y(q) : typeof B == "function" ? B.apply(this, arguments) : B;
      return n(bd.translate(j[0], j[1]).scale(K.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), q, s);
    }, B, F);
  };
  function x(C, O) {
    return O = Math.max(o[0], Math.min(o[1], O)), O === C.k ? C : new Gt(O, C.x, C.y);
  }
  function k(C, O, T) {
    var B = O[0] - T[0] * C.k, F = O[1] - T[1] * C.k;
    return B === C.x && F === C.y ? C : new Gt(C.k, B, F);
  }
  function y(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function S(C, O, T, B) {
    C.on("start.zoom", function() {
      M(this, arguments).event(B).start();
    }).on("interrupt.zoom end.zoom", function() {
      M(this, arguments).event(B).end();
    }).tween("zoom", function() {
      var F = this, q = arguments, K = M(F, q).event(B), j = t.apply(F, q), Z = T == null ? y(j) : typeof T == "function" ? T.apply(F, q) : T, te = Math.max(j[1][0] - j[0][0], j[1][1] - j[0][1]), ue = F.__zoom, Ce = typeof O == "function" ? O.apply(F, q) : O, he = a(ue.invert(Z).concat(te / ue.k), Ce.invert(Z).concat(te / Ce.k));
      return function(xe) {
        if (xe === 1)
          xe = Ce;
        else {
          var Re = he(xe), _t = te / Re[2];
          xe = new Gt(_t, Z[0] - Re[0] * _t, Z[1] - Re[1] * _t);
        }
        K.zoom(null, xe);
      };
    });
  }
  function M(C, O, T) {
    return !T && C.__zooming || new E(C, O);
  }
  function E(C, O) {
    this.that = C, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(C, O), this.taps = 0;
  }
  E.prototype = {
    event: function(C) {
      return C && (this.sourceEvent = C), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(C, O) {
      return this.mouse && C !== "mouse" && (this.mouse[1] = O.invert(this.mouse[0])), this.touch0 && C !== "touch" && (this.touch0[1] = O.invert(this.touch0[0])), this.touch1 && C !== "touch" && (this.touch1[1] = O.invert(this.touch1[0])), this.that.__zoom = O, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(C) {
      var O = Nt(this.that).datum();
      u.call(
        C,
        this.that,
        new Py(C, {
          sourceEvent: this.sourceEvent,
          target: v,
          type: C,
          transform: this.that.__zoom,
          dispatch: u
        }),
        O
      );
    }
  };
  function I(C, ...O) {
    if (!e.apply(this, arguments))
      return;
    var T = M(this, O).event(C), B = this.__zoom, F = Math.max(o[0], Math.min(o[1], B.k * Math.pow(2, r.apply(this, arguments)))), q = yt(C);
    if (T.wheel)
      (T.mouse[0][0] !== q[0] || T.mouse[0][1] !== q[1]) && (T.mouse[1] = B.invert(T.mouse[0] = q)), clearTimeout(T.wheel);
    else {
      if (B.k === F)
        return;
      T.mouse = [q, B.invert(q)], zi(this), T.start();
    }
    Lr(C), T.wheel = setTimeout(K, g), T.zoom("mouse", n(k(x(B, F), T.mouse[0], T.mouse[1]), T.extent, s));
    function K() {
      T.wheel = null, T.end();
    }
  }
  function A(C, ...O) {
    if (d || !e.apply(this, arguments))
      return;
    var T = C.currentTarget, B = M(this, O, !0).event(C), F = Nt(C.view).on("mousemove.zoom", Z, !0).on("mouseup.zoom", te, !0), q = yt(C, T), K = C.clientX, j = C.clientY;
    rd(C.view), gs(C), B.mouse = [q, this.__zoom.invert(q)], zi(this), B.start();
    function Z(ue) {
      if (Lr(ue), !B.moved) {
        var Ce = ue.clientX - K, he = ue.clientY - j;
        B.moved = Ce * Ce + he * he > m;
      }
      B.event(ue).zoom("mouse", n(k(B.that.__zoom, B.mouse[0] = yt(ue, T), B.mouse[1]), B.extent, s));
    }
    function te(ue) {
      F.on("mousemove.zoom mouseup.zoom", null), id(ue.view, B.moved), Lr(ue), B.event(ue).end();
    }
  }
  function N(C, ...O) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, B = yt(C.changedTouches ? C.changedTouches[0] : C, this), F = T.invert(B), q = T.k * (C.shiftKey ? 0.5 : 2), K = n(k(x(T, q), B, F), t.apply(this, O), s);
      Lr(C), l > 0 ? Nt(this).transition().duration(l).call(S, K, B, C) : Nt(this).call(v.transform, K, B, C);
    }
  }
  function D(C, ...O) {
    if (e.apply(this, arguments)) {
      var T = C.touches, B = T.length, F = M(this, O, C.changedTouches.length === B).event(C), q, K, j, Z;
      for (gs(C), K = 0; K < B; ++K)
        j = T[K], Z = yt(j, this), Z = [Z, this.__zoom.invert(Z), j.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== Z[2] && (F.touch1 = Z, F.taps = 0) : (F.touch0 = Z, q = !0, F.taps = 1 + !!c);
      c && (c = clearTimeout(c)), q && (F.taps < 2 && (f = Z[0], c = setTimeout(function() {
        c = null;
      }, h)), zi(this), F.start());
    }
  }
  function $(C, ...O) {
    if (this.__zooming) {
      var T = M(this, O).event(C), B = C.changedTouches, F = B.length, q, K, j, Z;
      for (Lr(C), q = 0; q < F; ++q)
        K = B[q], j = yt(K, this), T.touch0 && T.touch0[2] === K.identifier ? T.touch0[0] = j : T.touch1 && T.touch1[2] === K.identifier && (T.touch1[0] = j);
      if (K = T.that.__zoom, T.touch1) {
        var te = T.touch0[0], ue = T.touch0[1], Ce = T.touch1[0], he = T.touch1[1], xe = (xe = Ce[0] - te[0]) * xe + (xe = Ce[1] - te[1]) * xe, Re = (Re = he[0] - ue[0]) * Re + (Re = he[1] - ue[1]) * Re;
        K = x(K, Math.sqrt(xe / Re)), j = [(te[0] + Ce[0]) / 2, (te[1] + Ce[1]) / 2], Z = [(ue[0] + he[0]) / 2, (ue[1] + he[1]) / 2];
      } else if (T.touch0)
        j = T.touch0[0], Z = T.touch0[1];
      else
        return;
      T.zoom("touch", n(k(K, j, Z), T.extent, s));
    }
  }
  function R(C, ...O) {
    if (this.__zooming) {
      var T = M(this, O).event(C), B = C.changedTouches, F = B.length, q, K;
      for (gs(C), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), q = 0; q < F; ++q)
        K = B[q], T.touch0 && T.touch0[2] === K.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === K.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0)
        T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (K = yt(K, this), Math.hypot(f[0] - K[0], f[1] - K[1]) < p)) {
        var j = Nt(this).on("dblclick.zoom");
        j && j.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : Li(+C), v) : r;
  }, v.filter = function(C) {
    return arguments.length ? (e = typeof C == "function" ? C : Li(!!C), v) : e;
  }, v.touchable = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : Li(!!C), v) : i;
  }, v.extent = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : Li([[+C[0][0], +C[0][1]], [+C[1][0], +C[1][1]]]), v) : t;
  }, v.scaleExtent = function(C) {
    return arguments.length ? (o[0] = +C[0], o[1] = +C[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(C) {
    return arguments.length ? (s[0][0] = +C[0][0], s[1][0] = +C[1][0], s[0][1] = +C[0][1], s[1][1] = +C[1][1], v) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, v.constrain = function(C) {
    return arguments.length ? (n = C, v) : n;
  }, v.duration = function(C) {
    return arguments.length ? (l = +C, v) : l;
  }, v.interpolate = function(C) {
    return arguments.length ? (a = C, v) : a;
  }, v.on = function() {
    var C = u.on.apply(u, arguments);
    return C === u ? v : C;
  }, v.clickDistance = function(C) {
    return arguments.length ? (m = (C = +C) * C, v) : Math.sqrt(m);
  }, v.tapDistance = function(C) {
    return arguments.length ? (p = +C, v) : p;
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
   */
  constructor(t, n, r, i, o, s, l) {
    this.id = t, this.idImported = n, this.x = r, this.y = i, this.fx = o, this.fy = s, this.label = l;
  }
}
var at = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(at || {});
class Dy {
  // eslint-disable-next-line no-useless-constructor
  constructor(t, n, r, i) {
    lt(this, "id");
    this.source = t, this.target = n, this.pathType = r, this.label = i, this.id = `${t.id}-${n.id}`;
  }
}
class Tu {
  constructor() {
    lt(this, "nodeIdCounter", 0);
    lt(this, "nodes", []);
    lt(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, r, i) {
    const o = new _d(
      this.nodeIdCounter++,
      r,
      t,
      n,
      void 0,
      void 0,
      i
    );
    return this.nodes.push(o), o;
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
    const l = new Dy(o, s, void 0, r);
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
  // formats the graph in Trivial Graph Format
  toTGF(t, n) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "Graph is empty";
    let r, i;
    return t ? r = this.nodes.map((o) => `${o.id} ${o.label !== void 0 ? `${o.label}` : ""}`).join(`
`) : r = this.nodes.map((o) => `${o.id}`).join(`
`), n ? i = this.links.map(
      (o) => `${o.source.id} ${o.target.id} ${o.label !== void 0 ? `${o.label}` : ""}`
    ).join(`
`) : i = this.links.map((o) => `${o.source.id} ${o.target.id}`).join(`
`), `${r}${i ? `
#
` : ""}${i}`;
  }
}
function Hy(e) {
  return By().scaleExtent([0.5, 5]).filter((t) => {
    var n;
    return t.button === 0 || ((n = t.touches) == null ? void 0 : n.length) >= 2;
  }).on("zoom", (t) => e(t));
}
function Pn(e) {
  e.preventDefault(), e.stopPropagation();
}
function zy(e, t, n, r) {
  return a1().filter((i) => i.button === 2).on("start", (i, o) => {
    Pn(i.sourceEvent), i.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (i, o) => {
    o.fx = Math.max(r, Math.min(t - r, i.x)), o.fy = Math.max(r, Math.min(n - r, i.y));
  }).on("end", (i, o) => {
    i.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function jy(e, t, n, r, i) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (s) => n(s)).on("pointerup", (s) => r(s)).on("contextmenu", (s) => Pn(s)).on("dblclick", (s) => i(s)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function Wy(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function Uy(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function Gy(e, t) {
  ms(e, t, "link-arrow", "arrow", !1), ms(e, t, "link-arrow-reverse", "arrow", !0), ms(e, t, "draggable-link-arrow", "arrow draggable", !1);
}
function ms(e, t, n, r, i) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${$y()(t.arrowPoints)}`);
}
function qy(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function Yy(e, t, n, r, i) {
  let o = Cy(e.nodes).on("tick", () => i()).force(
    "collision",
    hy().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Ky(e, o, n, r, t), o = Cd(o, e, t, t.fixedLinkDistanceEnabled), o = xd(o, t.nodePhysicsEnabled, n, r), o;
}
function Ky(e, t, n, r, i) {
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
const Xy = !0, Vu = 24, Zy = !0, Jy = !1, Qy = !0, ew = !1, ln = 4, tw = {
  hasToolbar: Xy,
  nodeRadius: Vu,
  showNodeLabels: Zy,
  nodePhysicsEnabled: Jy,
  showLinkLabels: Qy,
  fixedLinkDistanceEnabled: ew,
  markerBoxSize: ln,
  markerPadding: Vu + 2 * ln,
  markerRef: ln / 2,
  arrowPoints: [
    [0, 0],
    [0, ln],
    [ln, ln / 2]
  ],
  markerPath: [0, 0, ln, ln].join(",")
}, nw = Object.prototype.toString;
function ao(e) {
  const t = nw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function rw(e) {
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
function iw(e) {
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
  var r = iw(e), i = rw(e);
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
function ow() {
  return kd(this);
}
function kd(e, t = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = t;
  return `${e.constructor.name} {
${Mi}[
${Sd}${sw(e, n, r, i)}
${Mi}]
${Mi}rows: ${e.rows}
${Mi}columns: ${e.columns}
}`;
}
function sw(e, t, n, r) {
  const { rows: i, columns: o } = e, s = Math.min(i, t), l = Math.min(o, n), a = [];
  for (let u = 0; u < s; u++) {
    let c = [];
    for (let f = 0; f < l; f++)
      c.push(lw(e.get(u, f), r));
    a.push(`${c.join(" ")}`);
  }
  return l !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), s !== i && a.push(`... ${i - t} more rows`), a.join(`
${Sd}`);
}
function lw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const r = e.toPrecision(t - 2);
  if (r.length <= t)
    return r;
  const i = e.toExponential(t - 2), o = i.indexOf("e"), s = i.slice(o);
  return i.slice(0, t - s.length) + s;
}
function aw(e, t) {
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
function Ct(e, t, n) {
  let r = n ? e.rows : e.rows - 1;
  if (t < 0 || t > r)
    throw new RangeError("Row index out of range");
}
function St(e, t, n) {
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
function uw(e, t, n) {
  return {
    row: cw(e, t),
    column: fw(e, n)
  };
}
function cw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((r) => r < 0 || r >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function fw(e, t) {
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
function Jn(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function dw(e) {
  let t = Oo(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] += e.get(n, r);
  return t;
}
function hw(e) {
  let t = Oo(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] += e.get(n, r);
  return t;
}
function gw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t += e.get(n, r);
  return t;
}
function mw(e) {
  let t = Oo(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] *= e.get(n, r);
  return t;
}
function vw(e) {
  let t = Oo(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] *= e.get(n, r);
  return t;
}
function pw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t *= e.get(n, r);
  return t;
}
function yw(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < r; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(s, c) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / i) / (i - 1)) : o.push((a - l * l / i) / i);
  }
  return o;
}
function ww(e, t, n) {
  const r = e.rows, i = e.columns, o = [];
  for (let s = 0; s < i; s++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(c, s) - n[s], l += u, a += u * u;
    t ? o.push((a - l * l / r) / (r - 1)) : o.push((a - l * l / r) / r);
  }
  return o;
}
function bw(e, t, n) {
  const r = e.rows, i = e.columns, o = r * i;
  let s = 0, l = 0, a = 0;
  for (let u = 0; u < r; u++)
    for (let c = 0; c < i; c++)
      a = e.get(u, c) - n, s += a, l += a * a;
  return t ? (l - s * s / o) / (o - 1) : (l - s * s / o) / o;
}
function _w(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[n]);
}
function xw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[r]);
}
function Cw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t);
}
function Sw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let r = 0;
    for (let i = 0; i < e.columns; i++)
      r += Math.pow(e.get(n, i), 2) / (e.columns - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function kw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[n]);
}
function Ew(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let r = 0;
    for (let i = 0; i < e.rows; i++)
      r += Math.pow(e.get(i, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function Lw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[r]);
}
function Mw(e) {
  const t = e.size - 1;
  let n = 0;
  for (let r = 0; r < e.columns; r++)
    for (let i = 0; i < e.rows; i++)
      n += Math.pow(e.get(i, r), 2) / t;
  return Math.sqrt(n);
}
function Tw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t);
}
class ge {
  static from1DArray(t, n, r) {
    if (t * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new se(t, n);
    for (let s = 0; s < t; s++)
      for (let l = 0; l < n; l++)
        o.set(s, l, r[s * n + l]);
    return o;
  }
  static rowVector(t) {
    let n = new se(1, t.length);
    for (let r = 0; r < t.length; r++)
      n.set(0, r, t[r]);
    return n;
  }
  static columnVector(t) {
    let n = new se(t.length, 1);
    for (let r = 0; r < t.length; r++)
      n.set(r, 0, t[r]);
    return n;
  }
  static zeros(t, n) {
    return new se(t, n);
  }
  static ones(t, n) {
    return new se(t, n).fill(1);
  }
  static rand(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let o = new se(t, n);
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
    let l = o - i, a = new se(t, n);
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
    let r = t.rows, i = t.columns, o = new se(r, i);
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
    return ge.isMatrix(t) ? t : new se(t);
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
    let i = new se(this.rows * n, this.columns * r);
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
    Ct(this, t);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(t, r));
    return n;
  }
  getRowVector(t) {
    return se.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Ct(this, t), n = tr(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, n[r]);
    return this;
  }
  swapRows(t, n) {
    Ct(this, t), Ct(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(t, r);
      this.set(t, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(t) {
    St(this, t);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, t));
    return n;
  }
  getColumnVector(t) {
    return se.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    St(this, t), n = nr(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, n[r]);
    return this;
  }
  swapColumns(t, n) {
    St(this, t), St(this, n);
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
    Ct(this, t);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, this.get(t, r) * n);
    return this;
  }
  mulColumn(t, n) {
    St(this, t);
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
    if (Ct(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r));
    return n;
  }
  maxRowIndex(t) {
    Ct(this, t), Jn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  minRow(t) {
    if (Ct(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r));
    return n;
  }
  minRowIndex(t) {
    Ct(this, t), Jn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  maxColumn(t) {
    if (St(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t));
    return n;
  }
  maxColumnIndex(t) {
    St(this, t), Jn(this);
    let n = this.get(0, t), r = [0, t];
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t), r[0] = i);
    return r;
  }
  minColumn(t) {
    if (St(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) < n && (n = this.get(r, t));
    return n;
  }
  minColumnIndex(t) {
    St(this, t), Jn(this);
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
    t = se.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.columns, o = new se(n, i), s = new Float64Array(r);
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
    t = se.checkMatrix(t);
    let n = new se(2, 2);
    const r = this.get(0, 0), i = t.get(0, 0), o = this.get(0, 1), s = t.get(0, 1), l = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), f = (r + u) * (i + c), d = (l + u) * i, h = r * (s - c), g = u * (a - i), m = (r + o) * c, p = (l - r) * (i + s), v = (o - u) * (a + c), x = f + g - m + v, k = h + m, y = d + g, S = f - d + h + p;
    return n.set(0, 0, x), n.set(0, 1, k), n.set(1, 0, y), n.set(1, 1, S), n;
  }
  strassen3x3(t) {
    t = se.checkMatrix(t);
    let n = new se(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), o = this.get(0, 2), s = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), d = t.get(0, 0), h = t.get(0, 1), g = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), v = t.get(1, 2), x = t.get(2, 0), k = t.get(2, 1), y = t.get(2, 2), S = (r + i + o - s - l - c - f) * p, M = (r - s) * (-h + p), E = l * (-d + h + m - p - v - x + y), I = (-r + s + l) * (d - h + p), A = (s + l) * (-d + h), N = r * d, D = (-r + u + c) * (d - g + v), $ = (-r + u) * (g - v), R = (u + c) * (-d + g), C = (r + i + o - l - a - u - c) * v, O = c * (-d + g + m - p - v - x + k), T = (-o + c + f) * (p + x - k), B = (o - f) * (p - k), F = o * x, q = (c + f) * (-x + k), K = (-o + l + a) * (v + x - y), j = (o - a) * (v - y), Z = (l + a) * (-x + y), te = i * m, ue = a * k, Ce = s * g, he = u * h, xe = f * y, Re = N + F + te, _t = S + I + A + N + T + F + q, ot = N + D + R + C + F + K + Z, rn = M + E + I + N + F + K + j, z = M + I + A + N + ue, w = F + K + j + Z + Ce, _ = N + D + $ + O + T + B + F, L = T + B + F + q + he, P = N + D + $ + R + xe;
    return n.set(0, 0, Re), n.set(0, 1, _t), n.set(0, 2, ot), n.set(1, 0, rn), n.set(1, 1, z), n.set(1, 2, w), n.set(2, 0, _), n.set(2, 1, L), n.set(2, 2, P), n;
  }
  mmulStrassen(t) {
    t = se.checkMatrix(t);
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
      let m = parseInt(f.rows / 2, 10), p = parseInt(f.columns / 2, 10), v = f.subMatrix(0, m - 1, 0, p - 1), x = d.subMatrix(0, m - 1, 0, p - 1), k = f.subMatrix(0, m - 1, p, f.columns - 1), y = d.subMatrix(0, m - 1, p, d.columns - 1), S = f.subMatrix(m, f.rows - 1, 0, p - 1), M = d.subMatrix(m, d.rows - 1, 0, p - 1), E = f.subMatrix(m, f.rows - 1, p, f.columns - 1), I = d.subMatrix(m, d.rows - 1, p, d.columns - 1), A = c(
        ge.add(v, E),
        ge.add(x, I),
        m,
        p
      ), N = c(ge.add(S, E), x, m, p), D = c(v, ge.sub(y, I), m, p), $ = c(E, ge.sub(M, x), m, p), R = c(ge.add(v, k), I, m, p), C = c(
        ge.sub(S, v),
        ge.add(x, y),
        m,
        p
      ), O = c(
        ge.sub(k, E),
        ge.add(M, I),
        m,
        p
      ), T = ge.add(A, $);
      T.sub(R), T.add(O);
      let B = ge.add(D, R), F = ge.add(N, $), q = ge.sub(A, N);
      q.add(D), q.add(C);
      let K = ge.zeros(2 * T.rows, 2 * T.columns);
      return K = K.setSubMatrix(T, 0, 0), K = K.setSubMatrix(B, T.rows, 0), K = K.setSubMatrix(F, 0, T.columns), K = K.setSubMatrix(q, T.rows, T.columns), K.subMatrix(0, h - 1, 0, g - 1);
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
    let i = new se(this.rows, this.columns);
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
    let i = new se(this.rows, this.columns);
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
    t = se.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.rows, o = t.columns, s = new se(n * i, r * o);
    for (let l = 0; l < n; l++)
      for (let a = 0; a < r; a++)
        for (let u = 0; u < i; u++)
          for (let c = 0; c < o; c++)
            s.set(i * l + u, o * a + c, this.get(l, a) * t.get(u, c));
    return s;
  }
  kroneckerSum(t) {
    if (t = se.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = t.rows, i = this.kroneckerProduct(se.eye(r, r)), o = se.eye(n, n).kroneckerProduct(t);
    return i.add(o);
  }
  transpose() {
    let t = new se(this.columns, this.rows);
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
    $u(this, t, n, r, i);
    let o = new se(
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
    let i = new se(t.length, r - n + 1);
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
    let i = new se(r - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let s = n; s <= r; s++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        i.set(s - n, o, this.get(s, t[o]));
      }
    return i;
  }
  setSubMatrix(t, n, r) {
    if (t = se.checkMatrix(t), t.isEmpty())
      return this;
    let i = n + t.rows - 1, o = r + t.columns - 1;
    $u(this, n, i, r, o);
    for (let s = 0; s < t.rows; s++)
      for (let l = 0; l < t.columns; l++)
        this.set(n + s, r + l, t.get(s, l));
    return this;
  }
  selection(t, n) {
    let r = uw(this, t, n), i = new se(t.length, n.length);
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
    let t = new se(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(n, r, this.get(n, r));
    return t;
  }
  sum(t) {
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
  product(t) {
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
        return yw(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return ww(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return bw(this, r, i);
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
        return _w(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return xw(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return Cw(this, r), this;
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
          r = Sw(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return kw(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Ew(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Lw(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Mw(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Tw(this, r), this;
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
typeof Symbol < "u" && (ge.prototype[Symbol.for("nodejs.util.inspect.custom")] = ow);
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
class se extends ge {
  constructor(t, n) {
    if (super(), se.isMatrix(t))
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
    return Ct(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Ct(this, t, !0), n = Float64Array.from(tr(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    St(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), St(this, t, !0), n = nr(this, n);
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
aw(ge, se);
function vs(e, t, n) {
  const r = t.x - e.x, i = t.y - e.y, o = Math.sqrt(r * r + i * i), s = r / o, l = i / o, a = e.x + (n.nodeRadius - 1) * s, u = e.y + (n.nodeRadius - 1) * l, c = t.x - n.markerPadding * s, f = t.y - n.markerPadding * l;
  return `M${a},${u}
          L${c},${f}`;
}
function ps(e, t, n) {
  const r = new se([[e.x, e.y]]), i = new se([[t.x, t.y]]), o = se.subtract(i, r), s = o.norm("frobenius"), l = o.divide(s), a = Ed(10), u = ur(l, -a).multiply(n.nodeRadius - 1).add(r), c = se.multiply(l, -1), f = ur(c, a).multiply(n.nodeRadius).add(i).add(ur(c, a).multiply(2 * n.markerBoxSize)), d = 1.2 * s;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${d},${d},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Au(e, t, n) {
  const r = new se([[e.x, e.y]]), i = new se([t]);
  r.get(0, 0) === i.get(0, 0) && r.get(0, 1) === i.get(0, 1) && i.add([[0, 1]]);
  const o = se.subtract(r, i), s = o.divide(o.norm("frobenius")), l = Ed(40), a = ur(s, l).multiply(n.nodeRadius - 1).add(r), u = ur(s, -l).multiply(n.nodeRadius).add(r).add(ur(s, -l).multiply(2 * n.markerBoxSize));
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
function ur(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new se([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
function Vw(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, i = n !== -1 ? t.slice(n + 1) : [], o = [];
  if (r.length)
    for (const l of r) {
      const [, a, u] = l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || [];
      a && u ? o.push({ idImported: a.trim(), label: u.trim() }) : a && o.push({ idImported: a.trim(), label: a.trim() });
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
var Iw = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $w(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ld = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Iw, function() {
    function n(s) {
      s = s.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (T, B, F, q) => B + q.replaceAll(".", " ."));
      var l = s.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, u, c, f, d, h, g = [], m = [], p, v, x = 0, k = 0, y = 0, S = 0, M = 0, E = 0, I = 0, A = 0, N = 0, D = 0, $ = 0, R = 0, C = 0, O = "";
      for (u = 1; u < a; u++) {
        if (c = l[u], f = c.substring(0, 1), d = f.toLowerCase(), g = c.replace(f, "").trim().split(" ").filter(function(T) {
          return T !== "";
        }), m = g, g = g.map(parseFloat), p = g.length, d === "m") {
          if (O += "M ", f === "m" ? (y += g[0], S += g[1]) : (y = g[0], S = g[1]), x = y, k = S, O += y + " " + S + " ", p > 2)
            for (v = 0; v < p; v += 2)
              f === "m" ? (y += g[v], S += g[v + 1]) : (y = g[v], S = g[v + 1]), O += "L " + y + " " + S + " ";
        } else if (d === "l")
          for (v = 0; v < p; v += 2)
            f === "l" ? (y += g[v], S += g[v + 1]) : (y = g[v], S = g[v + 1]), O += "L " + y + " " + S + " ";
        else if (d === "h")
          for (v = 0; v < p; v++)
            f === "h" ? y += g[v] : y = g[v], O += "L " + y + " " + S + " ";
        else if (d === "v")
          for (v = 0; v < p; v++)
            f === "v" ? S += g[v] : S = g[v], O += "L " + y + " " + S + " ";
        else if (d === "q")
          for (v = 0; v < p; v += 4)
            f === "q" ? (M = y + g[v], E = S + g[v + 1], y += g[v + 2], S += g[v + 3]) : (M = g[v], E = g[v + 1], y = g[v + 2], S = g[v + 3]), O += "Q " + M + " " + E + " " + y + " " + S + " ";
        else if (d === "t")
          for (v = 0; v < p; v += 2)
            ["t", "q"].indexOf(h) > -1 ? (M = y + (y - M), E = S + (S - E)) : (M = y, E = S), f === "t" ? (y += g[v], S += g[v + 1]) : (y = g[v], S = g[v + 1]), O += "Q " + M + " " + E + " " + y + " " + S + " ", h = d;
        else if (d === "c")
          for (v = 0; v < p; v += 6)
            f === "c" ? (M = y + g[v], E = S + g[v + 1], I = y + g[v + 2], A = S + g[v + 3], y += g[v + 4], S += g[v + 5]) : (M = g[v], E = g[v + 1], I = g[v + 2], A = g[v + 3], y = g[v + 4], S = g[v + 5]), O += "C " + M + " " + E + " " + I + " " + A + " " + y + " " + S + " ";
        else if (d === "s")
          for (v = 0; v < p; v += 4)
            M = y, E = S, ["s", "c"].indexOf(h) > -1 && (M += y - I, E += S - A), f === "s" ? (I = y + g[v], A = S + g[v + 1], y += g[v + 2], S += g[v + 3]) : (I = g[v], A = g[v + 1], y = g[v + 2], S = g[v + 3]), O += "C " + M + " " + E + " " + I + " " + A + " " + y + " " + S + " ";
        else if (d === "a")
          for (v = 0; v < p; v += 7) {
            N = g[v], D = g[v + 1], $ = g[v + 2], R = m[v + 3];
            let T = !1;
            if (R.length > 1) {
              let B = parseInt(R[0]), F = parseInt(R[1]), q;
              R.length > 2 && (q = parseFloat(R.substring(2))), g[v + 3] = B, g.splice(v + 4, 0, F), m.splice(v + 4, 0, "+"), q !== void 0 && g.splice(v + 5, 0, q), T = !0;
            }
            R = g[v + 3], C = T ? g[v + 4] : m[v + 4], !T && C.length > 1 && (g[v + 4] = parseInt(C[0]), g.splice(v + 5, 0, parseFloat(C.substring(1)))), C = g[v + 4], f === "a" ? (y += g[v + 5], S += g[v + 6]) : (y = g[v + 5], S = g[v + 6]), O += "A " + N + " " + D + " " + $ + " " + R + " " + C + " " + y + " " + S + " ";
          }
        else
          d === "z" && (O += "Z ", y = x, S = k);
        h = d;
      }
      return O.trim();
    }
    function r(s) {
      var l = s.trim().split(" "), a, u = l.length, c = u - 1, f, d = [], h, g, m, p, v, x = new RegExp("[QAZLCM]", ""), k = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < u; f++)
        if (a = l[f], x.test(a)) {
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
      var S = "", M = d.length - 1, E;
      for (E = M; E > 0; E--)
        S += d[E] + " ";
      return k && (S += "Z"), S = S.replace(/M M/g, "Z M"), S;
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
var Pw = Ld.exports;
const Nu = /* @__PURE__ */ $w(Pw), Ve = typeof window < "u", Yl = Ve && "IntersectionObserver" in window, Aw = Ve && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function Rw(e, t, n) {
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
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Rw(e, t.split("."), n));
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
function ys(e, t) {
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
const Id = /^on[^a-z]/, Kl = (e) => Id.test(e), Nw = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Xl(e) {
  const [t, n] = Bu(e, [Id]), r = li(t, Nw), [i, o] = Bu(n, ["class", "style", "id", /^data-/]);
  return Object.assign(i, t), Object.assign(o, r), [i, o];
}
function Yt(e) {
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
function Ow(e) {
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
function ft() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const r = {};
  for (const i in e)
    r[i] = e[i];
  for (const i in t) {
    const o = e[i], s = t[i];
    if (uo(o) && uo(s)) {
      r[i] = ft(o, s, n);
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
  return e.map((t) => t.type === ke ? $d(t.children) : t).flat();
}
function Dn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Dn.cache.has(e))
    return Dn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Dn.cache.set(e, t), t;
}
Dn.cache = /* @__PURE__ */ new Map();
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
  const t = Tt({}), n = V(e);
  return xn(() => {
    for (const r in n.value)
      t[r] = n.value[r];
  }, {
    flush: "sync"
  }), El(t);
}
function fo(e, t) {
  return e.includes(t);
}
function Pd(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Kt = () => [Function, Array];
function ju(e, t) {
  return t = "on" + yr(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Fw(e) {
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
function Ad(e, t, n) {
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
    const l = Ad(n, t);
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
function Bw(e, t) {
  if (!Ve || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Dw(e, t) {
  const n = e.clientX, r = e.clientY, i = t.getBoundingClientRect(), o = i.left, s = i.top, l = i.right, a = i.bottom;
  return n >= o && n <= l && r >= s && r <= a;
}
const Nd = ["top", "bottom"], Hw = ["start", "end", "left", "right"];
function Js(e, t) {
  let [n, r] = e.split(" ");
  return r || (r = fo(Nd, n) ? "start" : fo(Hw, n) ? "top" : "center"), {
    side: Wu(n, t),
    align: Wu(r, t)
  };
}
function Wu(e, t) {
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
function Gu(e) {
  return fo(Nd, e.side) ? "y" : "x";
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
const Wi = /* @__PURE__ */ new WeakMap();
function zw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Pd(n), i = Wi.get(e);
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
function jw(e, t) {
  Object.keys(t).forEach((n) => {
    if (Kl(n)) {
      const r = Pd(n), i = Wi.get(e);
      i == null || i.forEach((o) => {
        const [s, l] = o;
        s === r && (e.removeEventListener(r, l), i.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Qn = 2.4, Yu = 0.2126729, Ku = 0.7151522, Xu = 0.072175, Ww = 0.55, Uw = 0.58, Gw = 0.57, qw = 0.62, Vi = 0.03, Zu = 1.45, Yw = 5e-4, Kw = 1.25, Xw = 1.25, Ju = 0.078, Qu = 12.82051282051282, Ii = 0.06, ec = 1e-3;
function tc(e, t) {
  const n = (e.r / 255) ** Qn, r = (e.g / 255) ** Qn, i = (e.b / 255) ** Qn, o = (t.r / 255) ** Qn, s = (t.g / 255) ** Qn, l = (t.b / 255) ** Qn;
  let a = n * Yu + r * Ku + i * Xu, u = o * Yu + s * Ku + l * Xu;
  if (a <= Vi && (a += (Vi - a) ** Zu), u <= Vi && (u += (Vi - u) ** Zu), Math.abs(u - a) < Yw)
    return 0;
  let c;
  if (u > a) {
    const f = (u ** Ww - a ** Uw) * Kw;
    c = f < ec ? 0 : f < Ju ? f - f * Qu * Ii : f - Ii;
  } else {
    const f = (u ** qw - a ** Gw) * Xw;
    c = f > -ec ? 0 : f > -Ju ? f - f * Qu * Ii : f + Ii;
  }
  return c * 100;
}
const ho = 0.20689655172413793, Zw = (e) => e > ho ** 3 ? Math.cbrt(e) : e / (3 * ho ** 2) + 4 / 29, Jw = (e) => e > ho ? e ** 3 : 3 * ho ** 2 * (e - 4 / 29);
function Fd(e) {
  const t = Zw, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Bd(e) {
  const t = Jw, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Qw = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], eb = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, tb = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], nb = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Dd(e) {
  const t = Array(3), n = eb, r = Qw;
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
  const i = [0, 0, 0], o = nb, s = tb;
  t = o(t / 255), n = o(n / 255), r = o(r / 255);
  for (let l = 0; l < 3; ++l)
    i[l] = s[l][0] * t + s[l][1] * n + s[l][2] * r;
  return i;
}
function Qs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function rb(e) {
  return Qs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const nc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, ib = {
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
function Ft(e) {
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
    return ib[n](...i);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), sb(t);
  } else if (typeof e == "object") {
    if (ys(e, ["r", "g", "b"]))
      return e;
    if (ys(e, ["h", "s", "l"]))
      return Xr(Hd(e));
    if (ys(e, ["h", "s", "v"]))
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
function ob(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: i
  } = e;
  return `#${[$i(t), $i(n), $i(r), i !== void 0 ? $i(Math.round(i * 255)) : ""].join("")}`;
}
function sb(e) {
  e = lb(e);
  let [t, n, r, i] = Ow(e, 2).map((o) => parseInt(o, 16));
  return i = i === void 0 ? i : i / 255, {
    r: t,
    g: n,
    b: r,
    a: i
  };
}
function lb(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Du(Du(e, 6), 8, "F")), e;
}
function ab(e, t) {
  const n = Fd(Ql(e));
  return n[0] = n[0] + t * 10, Dd(Bd(n));
}
function ub(e, t) {
  const n = Fd(Ql(e));
  return n[0] = n[0] - t * 10, Dd(Bd(n));
}
function cb(e) {
  const t = Ft(e);
  return Ql(t)[1];
}
function zd(e) {
  const t = Math.abs(tc(Ft(0), Ft(e)));
  return Math.abs(tc(Ft(16777215), Ft(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Q(e, t) {
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
const Ee = Q({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), mr = Symbol.for("vuetify:defaults");
function fb(e) {
  return ie(e);
}
function ea() {
  const e = Be(mr);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function _r(e, t) {
  const n = ea(), r = ie(e), i = V(() => {
    if (Ot(t == null ? void 0 : t.disabled))
      return n.value;
    const s = Ot(t == null ? void 0 : t.scoped), l = Ot(t == null ? void 0 : t.reset), a = Ot(t == null ? void 0 : t.root);
    if (r.value == null && !(s || l || a))
      return n.value;
    let u = ft(r.value, {
      prev: n.value
    });
    if (s)
      return u;
    if (l || a) {
      const c = Number(l || 1 / 0);
      for (let f = 0; f <= c && !(!u || !("prev" in u)); f++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = ft(ft(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? ft(u.prev, u) : u;
  });
  return Dt(mr, i), i;
}
function db(e, t) {
  var n, r;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((r = e.props) == null ? void 0 : r[Dn(t)]) < "u";
}
function hb() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ea();
  const r = Qe("useDefaults");
  if (t = t ?? r.type.name ?? r.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const i = V(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var f, d, h, g;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(f = i.value) == null ? void 0 : f[u], c].filter((m) => m != null) : typeof u == "string" && !db(r.vnode, u) ? ((d = i.value) == null ? void 0 : d[u]) ?? ((g = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : g[u]) ?? c : c;
    }
  }), s = ye();
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
    const a = yb(mr, r);
    Dt(mr, V(() => s.value ? ft((a == null ? void 0 : a.value) ?? {}, s.value) : a == null ? void 0 : a.value));
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
    e.props = Q(e.props ?? {}, e.name)();
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
      } = hb(r, r._as ?? e.name, o), a = e._setup(s, i);
      return l(), a;
    };
  }
  return e;
}
function ae() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? ai : wr)(t);
}
function Fo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return ae()({
    name: n ?? yr(Ze(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...Ee()
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
const Zr = "cubic-bezier(0.4, 0, 0.2, 1)", gb = "cubic-bezier(0.0, 0, 0.2, 1)", mb = "cubic-bezier(0.4, 0, 1, 1)";
function Qe(e, t) {
  const n = Ol();
  if (!n)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n;
}
function zt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Qe(e).type;
  return Dn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Wd = 0, Ui = /* @__PURE__ */ new WeakMap();
function It() {
  const e = Qe("getUid");
  if (Ui.has(e))
    return Ui.get(e);
  {
    const t = Wd++;
    return Ui.set(e, t), t;
  }
}
It.reset = () => {
  Wd = 0, Ui = /* @__PURE__ */ new WeakMap();
};
function vb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? pb(e) : ta(e))
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
function pb(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function yb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qe("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function wb(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function we(e) {
  const t = Qe("useRender");
  t.render = e;
}
const Bo = Q({
  border: [Boolean, Number, String]
}, "border");
function Do(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    borderClasses: V(() => {
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
const bb = [null, "default", "comfortable", "compact"], jt = Q({
  density: {
    type: String,
    default: "default",
    validator: (e) => bb.includes(e)
  }
}, "density");
function en(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    densityClasses: V(() => `${t}--density-${e.density}`)
  };
}
const Ho = Q({
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
    elevationClasses: V(() => {
      const n = $e(e) ? e.value : e.elevation, r = [];
      return n == null || r.push(`elevation-${n}`), r;
    })
  };
}
const tn = Q({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function nn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    roundedClasses: V(() => {
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
const rt = Q({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), mo = Symbol.for("vuetify:theme"), je = Q({
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
function _b() {
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
    n[o] = ft(l, s);
  }
  return ft(t, {
    ...e,
    themes: n
  });
}
function xb(e) {
  const t = _b(e), n = ie(t.defaultTheme), r = ie(t.themes), i = V(() => {
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
              const v = p === "lighten" ? ab : ub;
              for (const x of Md(t.variations[p], 1))
                h.colors[`${g}-${p}-${x}`] = ob(v(Ft(m), x));
            }
        }
      for (const g of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(g) || h.colors[`on-${g}`])
          continue;
        const m = `on-${g}`, p = Ft(h.colors[g]);
        h.colors[m] = zd(p);
      }
    }
    return c;
  }), o = V(() => i.value[n.value]), s = V(() => {
    const c = [];
    o.value.dark && Mn(c, ":root", ["color-scheme: dark"]), Mn(c, ":root", oc(o.value));
    for (const [g, m] of Object.entries(i.value))
      Mn(c, `.v-theme--${g}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...oc(m)]);
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
        Ve && ce(s, () => {
          h.patch(l);
        });
      } else
        Ve ? (f.addHeadObjs(V(l)), xn(() => f.updateDOM())) : f.addHeadObjs(l());
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
      Ve ? ce(s, g, {
        immediate: !0
      }) : g();
    }
  }
  const u = V(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
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
  const n = V(() => e.theme ?? t.name.value), r = V(() => t.themes.value[n.value]), i = V(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: r,
    themeClasses: i
  };
  return Dt(mo, o), o;
}
function Mn(e, t, n) {
  e.push(`${t} {
`, ...n.map((r) => `  ${r};
`), `}
`);
}
function oc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, r = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const s = Ft(o);
    r.push(`--v-theme-${i}: ${s.r},${s.g},${s.b}`), i.startsWith("on-") || r.push(`--v-theme-${i}-overlay-multiplier: ${cb(o) > 0.18 ? t : n}`);
  }
  for (const [i, o] of Object.entries(e.variables)) {
    const s = typeof o == "string" && o.startsWith("#") ? Ft(o) : void 0, l = s ? `${s.r}, ${s.g}, ${s.b}` : void 0;
    r.push(`--v-${i}: ${l ?? o}`);
  }
  return r;
}
function na(e) {
  return Zl(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Qs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && rb(e.value.background)) {
          const r = Ft(e.value.background);
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
function bn(e, t) {
  const n = V(() => ({
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
function Wn(e, t) {
  const n = V(() => ({
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
const Cb = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function ui(e, t) {
  return b(ke, null, [e && b("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), b("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Kn = Q({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Cb.includes(e)
  }
}, "variant");
function ci(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = V(() => {
    const {
      variant: o
    } = Ot(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: r,
    colorStyles: i
  } = na(V(() => {
    const {
      variant: o,
      color: s
    } = Ot(e);
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
const Ud = Q({
  divided: Boolean,
  ...Bo(),
  ...Ee(),
  ...jt(),
  ...Ho(),
  ...tn(),
  ...rt(),
  ...je(),
  ...Kn()
}, "VBtnGroup"), sc = ae()({
  name: "VBtnGroup",
  props: Ud(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = it(e), {
      densityClasses: i
    } = en(e), {
      borderClasses: o
    } = Do(e), {
      elevationClasses: s
    } = zo(e), {
      roundedClasses: l
    } = nn(e);
    _r({
      VBtn: {
        height: "auto",
        color: be(e, "color"),
        density: be(e, "density"),
        flat: !0,
        variant: be(e, "variant")
      }
    }), we(() => b(e.tag, {
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
  ce(e, (i) => {
    i && !n ? r() : i || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), mt(() => {
    n == null || n.stop();
  });
}
function De(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const o = Qe("useProxiedModel"), s = ie(e[t] !== void 0 ? e[t] : n), l = Dn(t), u = V(l !== t ? () => {
    var f, d, h, g;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(l)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (g = o.vnode.props) != null && g.hasOwnProperty(`onUpdate:${l}`)));
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  vr(() => !u.value, () => {
    ce(() => e[t], (f) => {
      s.value = f;
    });
  });
  const c = V({
    get() {
      const f = e[t];
      return r(u.value ? f : s.value);
    },
    set(f) {
      const d = i(f), h = pe(u.value ? e[t] : s.value);
      h === d || r(h) === f || (s.value = d, o == null || o.emit(`update:${t}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : s.value
  }), c;
}
const ra = Q({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), ia = Q({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function oa(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const r = Qe("useGroupItem");
  if (!r)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const i = It();
  Dt(Symbol.for(`${t.description}:id`), i);
  const o = Be(t, null);
  if (!o) {
    if (!n)
      return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const s = be(e, "value"), l = V(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: i,
    value: s,
    disabled: l
  }, r), Qt(() => {
    o.unregister(i);
  });
  const a = V(() => o.isSelected(i)), u = V(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return ce(a, (c) => {
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
  const r = Tt([]), i = De(e, "modelValue", [], (d) => d == null ? [] : Gd(r, Yt(d)), (d) => {
    const h = kb(r, d);
    return e.multiple ? h : h[0];
  }), o = Qe("useGroup");
  function s(d, h) {
    const g = d, m = Symbol.for(`${t.description}:id`), v = ji(m, o == null ? void 0 : o.vnode).indexOf(h);
    Ot(g.value) == null && (g.value = v), v > -1 ? r.splice(v, 0, g) : r.push(g);
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
  }), Qt(() => {
    n = !0;
  });
  function u(d, h) {
    const g = r.find((m) => m.id === d);
    if (!(h && (g != null && g.disabled)))
      if (e.multiple) {
        const m = i.value.slice(), p = m.findIndex((x) => x === d), v = ~p;
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
    disabled: be(e, "disabled"),
    prev: () => c(r.length - 1),
    next: () => c(1),
    isSelected: (d) => i.value.includes(d),
    selectedClass: V(() => e.selectedClass),
    items: V(() => r),
    getItemIndex: (d) => Sb(r, d)
  };
  return Dt(t, f), f;
}
function Sb(e, t) {
  const n = Gd(e, [t]);
  return n.length ? e.findIndex((r) => r.id === n[0]) : -1;
}
function Gd(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.find((s) => si(r, s.value)), o = e[r];
    (i == null ? void 0 : i.value) != null ? n.push(i.id) : o != null && n.push(o.id);
  }), n;
}
function kb(e, t) {
  const n = [];
  return t.forEach((r) => {
    const i = e.findIndex((o) => o.id === r);
    if (~i) {
      const o = e[i];
      n.push(o.value != null ? o.value : i);
    }
  }), n;
}
const qd = Symbol.for("vuetify:v-btn-toggle"), Eb = Q({
  ...Ud(),
  ...ra()
}, "VBtnToggle");
ae()({
  name: "VBtnToggle",
  props: Eb(),
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
    return we(() => {
      const a = sc.filterProps(e);
      return b(sc, fe({
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
const Lb = Q({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ke = ae(!1)({
  name: "VDefaultsProvider",
  props: Lb(),
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
}), Mb = {
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
}, Tb = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => br(Yd, {
    ...e,
    class: "mdi"
  })
}, Pe = [String, Function, Object, Array], el = Symbol.for("vuetify:icons"), Wo = Q({
  icon: {
    type: Pe
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), lc = ae()({
  name: "VComponentIcon",
  props: Wo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const r = e.icon;
      return b(e.tag, null, {
        default: () => {
          var i;
          return [e.icon ? b(r, null, null) : (i = n.default) == null ? void 0 : i.call(n)];
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
    return () => b(e.tag, fe(n, {
      style: null
    }), {
      default: () => [b("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((r) => Array.isArray(r) ? b("path", {
        d: r[0],
        "fill-opacity": r[1]
      }, null) : b("path", {
        d: r
      }, null)) : b("path", {
        d: e.icon
      }, null)])]
    });
  }
});
ai({
  name: "VLigatureIcon",
  props: Wo(),
  setup(e) {
    return () => b(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Yd = ai({
  name: "VClassIcon",
  props: Wo(),
  setup(e) {
    return () => b(e.tag, {
      class: e.icon
    }, null);
  }
});
function Vb() {
  return {
    svg: {
      component: sa
    },
    class: {
      component: Yd
    }
  };
}
function Ib(e) {
  const t = Vb(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Tb), ft({
    defaultSet: n,
    sets: t,
    aliases: {
      ...Mb,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const $b = (e) => {
  const t = Be(el);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: V(() => {
      var a;
      const r = Ot(e);
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
}, Pb = ["x-small", "small", "default", "large", "x-large"], fi = Q({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function di(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return Zl(() => {
    let n, r;
    return fo(Pb, e.size) ? n = `${t}--size-${e.size}` : e.size && (r = {
      width: me(e.size),
      height: me(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: r
    };
  });
}
const Ab = Q({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Pe,
  ...Ee(),
  ...fi(),
  ...rt({
    tag: "i"
  }),
  ...je()
}, "VIcon"), Xe = ae()({
  name: "VIcon",
  props: Ab(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const i = ie(), {
      themeClasses: o
    } = it(e), {
      iconData: s
    } = $b(V(() => i.value || e.icon)), {
      sizeClasses: l
    } = di(e), {
      textColorClasses: a,
      textColorStyles: u
    } = bn(be(e, "color"));
    return we(() => {
      var f, d;
      const c = (f = r.default) == null ? void 0 : f.call(r);
      return c && (i.value = (d = $d(c).filter((h) => h.type === ti && h.children && typeof h.children == "string")[0]) == null ? void 0 : d.children), b(s.value.component, {
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
  const n = ie(), r = ye(!1);
  if (Yl) {
    const i = new IntersectionObserver((o) => {
      e == null || e(o, i), r.value = !!o.find((s) => s.isIntersecting);
    }, t);
    Qt(() => {
      i.disconnect();
    }), ce(n, (o, s) => {
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
    Qt(() => {
      i.disconnect();
    }), ce(n, (o, s) => {
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
const Rb = Q({
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
  ...Ee(),
  ...fi(),
  ...rt({
    tag: "div"
  }),
  ...je()
}, "VProgressCircular"), Xd = ae()({
  name: "VProgressCircular",
  props: Rb(),
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
    } = bn(be(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = bn(be(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: g
    } = Kd(), {
      resizeRef: m,
      contentRect: p
    } = tl(), v = V(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), x = V(() => Number(e.width)), k = V(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(x.value, 32)), y = V(() => r / (1 - x.value / k.value) * 2), S = V(() => x.value / k.value * y.value), M = V(() => me((100 - v.value) / 100 * i));
    return xn(() => {
      h.value = o.value, m.value = o.value;
    }), we(() => b(e.tag, {
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
      default: () => [b("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${y.value} ${y.value}`
      }, [b("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": S.value,
        "stroke-dasharray": i,
        "stroke-dashoffset": 0
      }, null), b("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": S.value,
        "stroke-dasharray": i,
        "stroke-dashoffset": M.value
      }, null)]), n.default && b("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: v.value
      })])]
    })), {};
  }
}), Uo = Q({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Go(e) {
  return {
    dimensionStyles: V(() => ({
      height: me(e.height),
      maxHeight: me(e.maxHeight),
      maxWidth: me(e.maxWidth),
      minHeight: me(e.minHeight),
      minWidth: me(e.minWidth),
      width: me(e.width)
    }))
  };
}
const Nb = {
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
function _s(e, t, n) {
  const r = De(e, t, e[t] ?? n.value);
  return r.value = e[t] ?? n.value, ce(n, (i) => {
    e[t] == null && (r.value = n.value);
  }), r;
}
function Qd(e) {
  return (t) => {
    const n = _s(t, "locale", e.current), r = _s(t, "fallback", e.fallback), i = _s(t, "messages", e.messages);
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
function Ob(e) {
  const t = ye((e == null ? void 0 : e.locale) ?? "en"), n = ye((e == null ? void 0 : e.fallback) ?? "en"), r = ie({
    en: Nb,
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
function Fb(e) {
  return e.name != null;
}
function Bb(e) {
  const t = e != null && e.adapter && Fb(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Ob(e), n = Hb(t, e);
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
function Db() {
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
function Hb(e, t) {
  const n = ie((t == null ? void 0 : t.rtl) ?? Db()), r = V(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: r,
    rtl: n,
    rtlClasses: V(() => `v-locale--is-${r.value ? "rtl" : "ltr"}`)
  };
}
function Sn() {
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
}, Yo = Q({
  location: String
}, "location");
function Ko(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: r
  } = Sn();
  return {
    locationStyles: V(() => {
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
const zb = Q({
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
  ...Ee(),
  ...Yo({
    location: "top"
  }),
  ...tn(),
  ...rt(),
  ...je()
}, "VProgressLinear"), eh = ae()({
  name: "VProgressLinear",
  props: zb(),
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
    } = Sn(), {
      themeClasses: s
    } = it(e), {
      locationStyles: l
    } = Ko(e), {
      textColorClasses: a,
      textColorStyles: u
    } = bn(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = Wn(V(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: h
    } = Wn(e, "color"), {
      roundedClasses: g
    } = nn(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Kd(), v = V(() => parseInt(e.max, 10)), x = V(() => parseInt(e.height, 10)), k = V(() => parseFloat(e.bufferValue) / v.value * 100), y = V(() => parseFloat(r.value) / v.value * 100), S = V(() => i.value !== e.reverse), M = V(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), E = V(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function I(A) {
      if (!m.value)
        return;
      const {
        left: N,
        right: D,
        width: $
      } = m.value.getBoundingClientRect(), R = S.value ? $ - A.clientX + (D - $) : A.clientX - N;
      r.value = Math.round(R / $ * v.value);
    }
    return we(() => b(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": S.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, g.value, s.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? me(x.value) : 0,
        "--v-progress-linear-height": me(x.value),
        ...l.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : y.value,
      onClick: e.clickable && I
    }, {
      default: () => [e.stream && b("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [S.value ? "left" : "right"]: me(-x.value),
          borderTop: `${me(x.value / 2)} dotted`,
          opacity: E.value,
          top: `calc(50% - ${me(x.value / 4)})`,
          width: me(100 - k.value, "%"),
          "--v-progress-linear-stream-to": me(x.value * (S.value ? 1 : -1))
        }
      }, null), b("div", {
        class: ["v-progress-linear__background", c.value],
        style: [f.value, {
          opacity: E.value,
          width: me(e.stream ? k.value : 100, "%")
        }]
      }, null), b(Xt, {
        name: M.value
      }, {
        default: () => [e.indeterminate ? b("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((A) => b("div", {
          key: A,
          class: ["v-progress-linear__indeterminate", A, d.value],
          style: h.value
        }, null))]) : b("div", {
          class: ["v-progress-linear__determinate", d.value],
          style: [h.value, {
            width: me(y.value, "%")
          }]
        }, null)]
      }), n.default && b("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: y.value,
        buffer: k.value
      })])]
    })), {};
  }
}), la = Q({
  loading: [Boolean, String]
}, "loader");
function Xo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    loaderClasses: V(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function aa(e, t) {
  var r;
  let {
    slots: n
  } = t;
  return b("div", {
    class: `${e.name}__loader`
  }, [((r = n.default) == null ? void 0 : r.call(n, {
    color: e.color,
    isActive: e.active
  })) || b(eh, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const jb = ["static", "relative", "fixed", "absolute", "sticky"], ua = Q({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => jb.includes(e)
    )
  }
}, "position");
function ca(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  return {
    positionClasses: V(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Wb() {
  const e = Qe("useRoute");
  return V(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Ub() {
  var e, t;
  return (t = (e = Qe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function fa(e, t) {
  const n = Wg("RouterLink"), r = V(() => !!(e.href || e.to)), i = V(() => (r == null ? void 0 : r.value) || ju(t, "click") || ju(e, "click"));
  if (typeof n == "string")
    return {
      isLink: r,
      isClickable: i,
      href: be(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, s = Wb();
  return {
    isLink: r,
    isClickable: i,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && V(() => {
      var l, a, u;
      return e.exact ? s.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && si(o.route.value.query, s.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (l = o.isActive) == null ? void 0 : l.value;
    }),
    href: V(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const da = Q({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let xs = !1;
function Gb(e, t) {
  let n = !1, r, i;
  Ve && (He(() => {
    window.addEventListener("popstate", o), r = e == null ? void 0 : e.beforeEach((s, l, a) => {
      xs ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), xs = !0;
    }), i = e == null ? void 0 : e.afterEach(() => {
      xs = !1;
    });
  }), mt(() => {
    window.removeEventListener("popstate", o), r == null || r(), i == null || i();
  }));
  function o(s) {
    var l;
    (l = s.state) != null && l.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function qb(e, t) {
  ce(() => {
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
const nl = Symbol("rippleStop"), Yb = 80;
function fc(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function rl(e) {
  return e.constructor.name === "TouchEvent";
}
function th(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Kb = function(e, t) {
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
    } = Kb(e, t, n), f = `${o * 2}px`;
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
      }, Yb);
    } else
      po.show(e, n, t);
  }
}
function dc(e) {
  e[nl] = !0;
}
function ct(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        ct(e);
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
  Qr = !1, ct(e);
}
function sh(e) {
  Qr && (Qr = !1, ct(e));
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
    }), e.addEventListener("touchend", ct, {
      passive: !0
    }), e.addEventListener("touchmove", rh, {
      passive: !0
    }), e.addEventListener("touchcancel", ct), e.addEventListener("mousedown", Jr), e.addEventListener("mouseup", ct), e.addEventListener("mouseleave", ct), e.addEventListener("keydown", ih), e.addEventListener("keyup", oh), e.addEventListener("blur", sh), e.addEventListener("dragstart", ct, {
      passive: !0
    });
  } else
    !o && n && ah(e);
}
function ah(e) {
  e.removeEventListener("mousedown", Jr), e.removeEventListener("touchstart", Jr), e.removeEventListener("touchend", ct), e.removeEventListener("touchmove", rh), e.removeEventListener("touchcancel", ct), e.removeEventListener("mouseup", ct), e.removeEventListener("mouseleave", ct), e.removeEventListener("keydown", ih), e.removeEventListener("keyup", oh), e.removeEventListener("dragstart", ct), e.removeEventListener("blur", sh);
}
function Xb(e, t) {
  lh(e, t, !1);
}
function Zb(e) {
  delete e._ripple, ah(e);
}
function Jb(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = nh(t.oldValue);
  lh(e, t, n);
}
const Zo = {
  mounted: Xb,
  unmounted: Zb,
  updated: Jb
}, uh = Q({
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
  prependIcon: Pe,
  appendIcon: Pe,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...Bo(),
  ...Ee(),
  ...jt(),
  ...Uo(),
  ...Ho(),
  ...ia(),
  ...la(),
  ...Yo(),
  ...ua(),
  ...tn(),
  ...da(),
  ...fi(),
  ...rt({
    tag: "button"
  }),
  ...je(),
  ...Kn({
    variant: "elevated"
  })
}, "VBtn"), dt = ae()({
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
    } = en(e), {
      dimensionStyles: c
    } = Go(e), {
      elevationClasses: f
    } = zo(e), {
      loaderClasses: d
    } = Xo(e), {
      locationStyles: h
    } = Ko(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = nn(e), {
      sizeClasses: p,
      sizeStyles: v
    } = di(e), x = oa(e, e.symbol, !1), k = fa(e, n), y = V(() => {
      var A;
      return e.active !== void 0 ? e.active : k.isLink.value ? (A = k.isActive) == null ? void 0 : A.value : x == null ? void 0 : x.isSelected.value;
    }), S = V(() => (x == null ? void 0 : x.disabled.value) || e.disabled), M = V(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = V(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function I(A) {
      var N;
      S.value || k.isLink.value && (A.metaKey || A.ctrlKey || A.shiftKey || A.button !== 0 || n.target === "_blank") || ((N = k.navigate) == null || N.call(k, A), x == null || x.toggle());
    }
    return qb(k, x == null ? void 0 : x.select), we(() => {
      var C, O;
      const A = k.isLink.value ? "a" : e.tag, N = !!(e.prependIcon || r.prepend), D = !!(e.appendIcon || r.append), $ = !!(e.icon && e.icon !== !0), R = (x == null ? void 0 : x.isSelected.value) && (!k.isLink.value || ((C = k.isActive) == null ? void 0 : C.value)) || !x || ((O = k.isActive) == null ? void 0 : O.value);
      return ht(b(A, {
        type: A === "a" ? void 0 : "button",
        class: ["v-btn", x == null ? void 0 : x.selectedClass.value, {
          "v-btn--active": y.value,
          "v-btn--block": e.block,
          "v-btn--disabled": S.value,
          "v-btn--elevated": M.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, i.value, o.value, R ? s.value : void 0, u.value, f.value, d.value, g.value, m.value, p.value, a.value, e.class],
        style: [R ? l.value : void 0, c.value, h.value, v.value, e.style],
        disabled: S.value || void 0,
        href: k.href.value,
        onClick: I,
        value: E.value
      }, {
        default: () => {
          var T;
          return [ui(!0, "v-btn"), !e.icon && N && b("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [r.prepend ? b(Ke, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, r.prepend) : b(Xe, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), b("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!r.default && $ ? b(Xe, {
            key: "content-icon",
            icon: e.icon
          }, null) : b(Ke, {
            key: "content-defaults",
            disabled: !$,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var B;
              return [((B = r.default) == null ? void 0 : B.call(r)) ?? e.text];
            }
          })]), !e.icon && D && b("span", {
            key: "append",
            class: "v-btn__append"
          }, [r.append ? b(Ke, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, r.append) : b(Xe, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && b("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((T = r.loader) == null ? void 0 : T.call(r)) ?? b(Xd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[qn("ripple"), !S.value && e.ripple, null]]);
    }), {
      group: x
    };
  }
}), ha = ae()({
  name: "VCardActions",
  props: Ee(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return _r({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), we(() => {
      var r;
      return b("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), il = Fo("v-card-subtitle"), Jo = Fo("v-card-title");
function Qb(e) {
  return {
    aspectStyles: V(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const ch = Q({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...Ee(),
  ...Uo()
}, "VResponsive"), hc = ae()({
  name: "VResponsive",
  props: ch(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: r
    } = Qb(e), {
      dimensionStyles: i
    } = Go(e);
    return we(() => {
      var o;
      return b("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [i.value, e.style]
      }, [b("div", {
        class: "v-responsive__sizer",
        style: r.value
      }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && b("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), Qo = Q({
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
    component: l = o ? jf : Xt,
    ...a
  } = typeof r == "object" ? r : {};
  return br(l, fe(typeof r == "string" ? {
    name: i ? "" : r
  } : a, typeof r == "string" ? {} : {
    disabled: i,
    group: o
  }, s), n);
};
function e_(e, t) {
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
const t_ = {
  mounted: e_,
  unmounted: fh
}, n_ = t_, r_ = Q({
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
  ...Ee(),
  ...tn(),
  ...Qo()
}, "VImg"), dh = ae()({
  name: "VImg",
  directives: {
    intersect: n_
  },
  props: r_(),
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
    } = Wn(be(e, "color")), {
      roundedClasses: s
    } = nn(e), l = Qe("VImg"), a = ye(""), u = ie(), c = ye(e.eager ? "loading" : "idle"), f = ye(), d = ye(), h = V(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = V(() => h.value.aspect || f.value / d.value || 0);
    ce(() => e.src, () => {
      m(c.value !== "idle");
    }), ce(g, ($, R) => {
      !$ && R && u.value && y(u.value);
    }), Il(() => m());
    function m($) {
      if (!(e.eager && $) && !(Yl && !$ && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const R = new Image();
          R.src = h.value.lazySrc, y(R, null);
        }
        h.value.src && He(() => {
          var R;
          n("loadstart", ((R = u.value) == null ? void 0 : R.currentSrc) || h.value.src), setTimeout(() => {
            var C;
            if (!l.isUnmounted)
              if ((C = u.value) != null && C.complete) {
                if (u.value.naturalWidth || v(), c.value === "error")
                  return;
                g.value || y(u.value, null), c.value === "loading" && p();
              } else
                g.value || y(u.value), x();
          });
        });
      }
    }
    function p() {
      var $;
      l.isUnmounted || (x(), y(u.value), c.value = "loaded", n("load", (($ = u.value) == null ? void 0 : $.currentSrc) || h.value.src));
    }
    function v() {
      var $;
      l.isUnmounted || (c.value = "error", n("error", (($ = u.value) == null ? void 0 : $.currentSrc) || h.value.src));
    }
    function x() {
      const $ = u.value;
      $ && (a.value = $.currentSrc || $.src);
    }
    let k = -1;
    Qt(() => {
      clearTimeout(k);
    });
    function y($) {
      let R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const C = () => {
        if (clearTimeout(k), l.isUnmounted)
          return;
        const {
          naturalHeight: O,
          naturalWidth: T
        } = $;
        O || T ? (f.value = T, d.value = O) : !$.complete && c.value === "loading" && R != null ? k = window.setTimeout(C, R) : ($.currentSrc.endsWith(".svg") || $.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
      };
      C();
    }
    const S = V(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), M = () => {
      var C;
      if (!h.value.src || c.value === "idle")
        return null;
      const $ = b("img", {
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
        onError: v
      }, null), R = (C = r.sources) == null ? void 0 : C.call(r);
      return b(mn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ht(R ? b("picture", {
          class: "v-img__picture"
        }, [R, $]) : $, [[Yn, c.value === "loaded"]])]
      });
    }, E = () => b(mn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && b("img", {
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
    }), I = () => r.placeholder ? b(mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !r.error) && b("div", {
        class: "v-img__placeholder"
      }, [r.placeholder()])]
    }) : null, A = () => r.error ? b(mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && b("div", {
        class: "v-img__error"
      }, [r.error()])]
    }) : null, N = () => e.gradient ? b("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, D = ye(!1);
    {
      const $ = ce(g, (R) => {
        R && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            D.value = !0;
          });
        }), $());
      });
    }
    return we(() => {
      const $ = hc.filterProps(e);
      return ht(b(hc, fe({
        class: ["v-img", {
          "v-img--booting": !D.value
        }, i.value, s.value, e.class],
        style: [{
          width: me(e.width === "auto" ? f.value : e.width)
        }, o.value, e.style]
      }, $, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => b(ke, null, [b(M, null, null), b(E, null, null), b(N, null, null), b(I, null, null), b(A, null, null)]),
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
}), i_ = Q({
  start: Boolean,
  end: Boolean,
  icon: Pe,
  image: String,
  text: String,
  ...Ee(),
  ...jt(),
  ...tn(),
  ...fi(),
  ...rt(),
  ...je(),
  ...Kn({
    variant: "flat"
  })
}, "VAvatar"), yo = ae()({
  name: "VAvatar",
  props: i_(),
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
    } = en(e), {
      roundedClasses: a
    } = nn(e), {
      sizeClasses: u,
      sizeStyles: c
    } = di(e);
    return we(() => b(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, r.value, i.value, l.value, a.value, u.value, s.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? b(Ke, {
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
      }) : e.image ? b(dh, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? b(Xe, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, ui(!1, "v-avatar")]
    })), {};
  }
}), o_ = Q({
  appendAvatar: String,
  appendIcon: Pe,
  prependAvatar: String,
  prependIcon: Pe,
  subtitle: [String, Number],
  title: [String, Number],
  ...Ee(),
  ...jt()
}, "VCardItem"), s_ = ae()({
  name: "VCardItem",
  props: o_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return we(() => {
      var u;
      const r = !!(e.prependAvatar || e.prependIcon), i = !!(r || n.prepend), o = !!(e.appendAvatar || e.appendIcon), s = !!(o || n.append), l = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return b("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [i && b("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? b(Ke, {
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
      }, n.prepend) : b(ke, null, [e.prependAvatar && b(yo, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && b(Xe, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), b("div", {
        class: "v-card-item__content"
      }, [l && b(Jo, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && b(il, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), s && b("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? b(Ke, {
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
      }, n.append) : b(ke, null, [e.appendIcon && b(Xe, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && b(yo, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Gi = Fo("v-card-text"), l_ = Q({
  appendAvatar: String,
  appendIcon: Pe,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Pe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...Bo(),
  ...Ee(),
  ...jt(),
  ...Uo(),
  ...Ho(),
  ...la(),
  ...Yo(),
  ...ua(),
  ...tn(),
  ...da(),
  ...rt(),
  ...je(),
  ...Kn({
    variant: "elevated"
  })
}, "VCard"), ga = ae()({
  name: "VCard",
  directives: {
    Ripple: Zo
  },
  props: l_(),
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
    } = en(e), {
      dimensionStyles: c
    } = Go(e), {
      elevationClasses: f
    } = zo(e), {
      loaderClasses: d
    } = Xo(e), {
      locationStyles: h
    } = Ko(e), {
      positionClasses: g
    } = ca(e), {
      roundedClasses: m
    } = nn(e), p = fa(e, n), v = V(() => e.link !== !1 && p.isLink.value), x = V(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return we(() => {
      const k = v.value ? "a" : e.tag, y = !!(r.title || e.title != null), S = !!(r.subtitle || e.subtitle != null), M = y || S, E = !!(r.append || e.appendAvatar || e.appendIcon), I = !!(r.prepend || e.prependAvatar || e.prependIcon), A = !!(r.image || e.image), N = M || I || E, D = !!(r.text || e.text != null);
      return ht(b(k, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": x.value
        }, i.value, o.value, s.value, u.value, f.value, d.value, g.value, m.value, a.value, e.class],
        style: [l.value, c.value, h.value, e.style],
        href: p.href.value,
        onClick: x.value && p.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var $;
          return [A && b("div", {
            key: "image",
            class: "v-card__image"
          }, [r.image ? b(Ke, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, r.image) : b(dh, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), b(aa, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: r.loader
          }), N && b(s_, {
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
          }), D && b(Gi, {
            key: "text"
          }, {
            default: () => {
              var R;
              return [((R = r.text) == null ? void 0 : R.call(r)) ?? e.text];
            }
          }), ($ = r.default) == null ? void 0 : $.call(r), r.actions && b(ha, null, {
            default: r.actions
          }), ui(x.value, "v-card")];
        }
      }), [[qn("ripple"), x.value && e.ripple]]);
    }), {};
  }
}), a_ = Q({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function vt(e, t, n) {
  return ae()({
    name: e,
    props: a_({
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
        const l = r.group ? jf : Xt;
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
function hh(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return ae()({
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
      return () => br(Xt, {
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
const u_ = Q({
  target: [Object, Array]
}, "v-dialog-transition"), mh = ae()({
  name: "VDialogTransition",
  props: u_(),
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
        } = mc(e.target, i), f = Nn(i, [{
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: gb
        });
        (d = gc(i)) == null || d.forEach((h) => {
          Nn(h, [{
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
        Nn(i, [{}, {
          transform: `translate(${s}px, ${l}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: mb
        }).finished.then(() => o()), (d = gc(i)) == null || d.forEach((h) => {
          Nn(h, [{}, {
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
    return () => e.target ? b(Xt, fe({
      name: "dialog-transition"
    }, r, {
      css: !1
    }), n) : b(Xt, {
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
vt("fab-transition", "center center", "out-in");
vt("dialog-bottom-transition");
vt("dialog-top-transition");
const vc = vt("fade-transition"), c_ = vt("scale-transition");
vt("scroll-x-transition");
vt("scroll-x-reverse-transition");
vt("scroll-y-transition");
vt("scroll-y-reverse-transition");
vt("slide-x-transition");
vt("slide-x-reverse-transition");
const vh = vt("slide-y-transition");
vt("slide-y-reverse-transition");
hh("expand-transition", gh());
const ph = hh("expand-x-transition", gh("", !0));
function Cs(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function f_(e, t) {
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
const yh = {
  static: g_,
  // specific viewport position, usually centered
  connected: v_
  // connected to a certain element
}, d_ = Q({
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
function h_(e, t) {
  const n = ie({}), r = ie();
  Ve && vr(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var s, l;
    ce(() => e.locationStrategy, o), mt(() => {
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
function g_() {
}
function m_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Jl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function v_(e, t, n) {
  (Array.isArray(e.target.value) || wb(e.target.value)) && Object.assign(n.value, {
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
  }), [s, l, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((g) => V(() => {
    const m = parseFloat(t[g]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = V(() => {
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
  ce([e.target, e.contentEl], (g, m) => {
    let [p, v] = g, [x, k] = m;
    x && !Array.isArray(x) && d.unobserve(x), p && !Array.isArray(p) && d.observe(p), k && d.unobserve(k), v && d.observe(v);
  }, {
    immediate: !0
  }), mt(() => {
    d.disconnect();
  });
  function h() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value)
      return;
    const g = Od(e.target.value), m = m_(e.contentEl.value, e.isRtl.value), p = go(e.contentEl.value), v = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = p.reduce((D, $) => {
      const R = $.getBoundingClientRect(), C = new Hn({
        x: $ === document.documentElement ? 0 : R.x,
        y: $ === document.documentElement ? 0 : R.y,
        width: $.clientWidth,
        height: $.clientHeight
      });
      return D ? new Hn({
        x: Math.max(D.left, C.left),
        y: Math.max(D.top, C.top),
        width: Math.min(D.right, C.right) - Math.max(D.left, C.left),
        height: Math.min(D.bottom, C.bottom) - Math.max(D.top, C.top)
      }) : C;
    }, void 0);
    x.x += v, x.y += v, x.width -= v * 2, x.height -= v * 2;
    let k = {
      anchor: i.value,
      origin: o.value
    };
    function y(D) {
      const $ = new Hn(m), R = pc(D.anchor, g), C = pc(D.origin, $);
      let {
        x: O,
        y: T
      } = f_(R, C);
      switch (D.anchor.side) {
        case "top":
          T -= c.value[0];
          break;
        case "bottom":
          T += c.value[0];
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
          T -= c.value[1];
          break;
        case "bottom":
          T += c.value[1];
          break;
        case "left":
          O -= c.value[1];
          break;
        case "right":
          O += c.value[1];
          break;
      }
      return $.x += O, $.y += T, $.width = Math.min($.width, a.value), $.height = Math.min($.height, u.value), {
        overflows: qu($, x),
        x: O,
        y: T
      };
    }
    let S = 0, M = 0;
    const E = {
      x: 0,
      y: 0
    }, I = {
      x: !1,
      y: !1
    };
    let A = -1;
    for (; !(A++ > 10); ) {
      const {
        x: D,
        y: $,
        overflows: R
      } = y(k);
      S += D, M += $, m.x += D, m.y += $;
      {
        const C = Gu(k.anchor), O = R.x.before || R.x.after, T = R.y.before || R.y.after;
        let B = !1;
        if (["x", "y"].forEach((F) => {
          if (F === "x" && O && !I.x || F === "y" && T && !I.y) {
            const q = {
              anchor: {
                ...k.anchor
              },
              origin: {
                ...k.origin
              }
            }, K = F === "x" ? C === "y" ? bs : ws : C === "y" ? ws : bs;
            q.anchor = K(q.anchor), q.origin = K(q.origin);
            const {
              overflows: j
            } = y(q);
            (j[F].before <= R[F].before && j[F].after <= R[F].after || j[F].before + j[F].after < (R[F].before + R[F].after) / 2) && (k = q, B = I[F] = !0);
          }
        }), B)
          continue;
      }
      R.x.before && (S += R.x.before, m.x += R.x.before), R.x.after && (S -= R.x.after, m.x -= R.x.after), R.y.before && (M += R.y.before, m.y += R.y.before), R.y.after && (M -= R.y.after, m.y -= R.y.after);
      {
        const C = qu(m, x);
        E.x = x.width - C.x.before - C.x.after, E.y = x.height - C.y.before - C.y.after, S += C.x.before, m.x += C.x.before, M += C.y.before, m.y += C.y.before;
      }
      break;
    }
    const N = Gu(k.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${k.anchor.side} ${k.anchor.align}`,
      transformOrigin: `${k.origin.side} ${k.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: me(Ss(M)),
      left: e.isRtl.value ? void 0 : me(Ss(S)),
      right: e.isRtl.value ? me(Ss(-S)) : void 0,
      minWidth: me(N === "y" ? Math.min(s.value, g.width) : s.value),
      maxWidth: me(yc(co(E.x, s.value === 1 / 0 ? 0 : s.value, a.value))),
      maxHeight: me(yc(co(E.y, l.value === 1 / 0 ? 0 : l.value, u.value)))
    }), {
      available: E,
      contentBox: m
    };
  }
  return ce(() => [i.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), He(() => {
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
function yc(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ol = !0;
const wo = [];
function p_(e) {
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
  close: b_,
  block: __,
  reposition: x_
}, y_ = Q({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in qi
  }
}, "VOverlay-scroll-strategies");
function w_(e, t) {
  if (!Ve)
    return;
  let n;
  xn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = yl(), await He(), n.active && n.run(() => {
      var r;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (r = qi[e.scrollStrategy]) == null || r.call(qi, t, e, n);
    }));
  }), mt(() => {
    n == null || n.stop();
  });
}
function b_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  wh(e.targetEl.value ?? e.contentEl.value, t);
}
function __(e, t) {
  var s;
  const n = (s = e.root.value) == null ? void 0 : s.offsetParent, r = [.../* @__PURE__ */ new Set([...go(e.targetEl.value, t.contained ? n : void 0), ...go(e.contentEl.value, t.contained ? n : void 0)])].filter((l) => !l.classList.contains("v-overlay-scroll-blocked")), i = window.innerWidth - document.documentElement.offsetWidth, o = ((l) => ta(l) && l)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), r.forEach((l, a) => {
    l.style.setProperty("--v-body-scroll-x", me(-l.scrollLeft)), l.style.setProperty("--v-body-scroll-y", me(-l.scrollTop)), l !== document.documentElement && l.style.setProperty("--v-scrollbar-offset", me(i)), l.classList.add("v-overlay-scroll-blocked");
  }), mt(() => {
    r.forEach((l, a) => {
      const u = parseFloat(l.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(l.style.getPropertyValue("--v-body-scroll-y")), f = l.style.scrollBehavior;
      l.style.scrollBehavior = "auto", l.style.removeProperty("--v-body-scroll-x"), l.style.removeProperty("--v-body-scroll-y"), l.style.removeProperty("--v-scrollbar-offset"), l.classList.remove("v-overlay-scroll-blocked"), l.scrollLeft = -u, l.scrollTop = -c, l.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function x_(e, t, n) {
  let r = !1, i = -1, o = -1;
  function s(l) {
    p_(() => {
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
  }), mt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(i);
  });
}
function wh(e, t) {
  const n = [document, ...go(e)];
  n.forEach((r) => {
    r.addEventListener("scroll", t, {
      passive: !0
    });
  }), mt(() => {
    n.forEach((r) => {
      r.removeEventListener("scroll", t);
    });
  });
}
const ll = Symbol.for("vuetify:v-menu"), C_ = Q({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function S_(e, t) {
  let n = () => {
  };
  function r(s) {
    n == null || n();
    const l = Number(s ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = Bw(l, () => {
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
const k_ = Q({
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
  ...C_()
}, "VOverlay-activator");
function E_(e, t) {
  let {
    isActive: n,
    isTop: r
  } = t;
  const i = Qe("useActivator"), o = ie();
  let s = !1, l = !1, a = !0;
  const u = V(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = V(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = S_(e, (E) => {
    E === (e.openOnHover && s || u.value && l) && !(e.openOnHover && n.value && !r.value) && (n.value !== E && (a = !0), n.value = E);
  }), h = ie(), g = {
    onClick: (E) => {
      E.stopPropagation(), o.value = E.currentTarget || E.target, n.value || (h.value = [E.clientX, E.clientY]), n.value = !n.value;
    },
    onMouseenter: (E) => {
      var I;
      (I = E.sourceCapabilities) != null && I.firesTouchEvents || (s = !0, o.value = E.currentTarget || E.target, f());
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
  }, m = V(() => {
    const E = {};
    return c.value && (E.onClick = g.onClick), e.openOnHover && (E.onMouseenter = g.onMouseenter, E.onMouseleave = g.onMouseleave), u.value && (E.onFocus = g.onFocus, E.onBlur = g.onBlur), E;
  }), p = V(() => {
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
      const I = Be(ll, null);
      E.onClick = () => {
        n.value = !1, I == null || I.closeParents();
      };
    }
    return E;
  }), v = V(() => {
    const E = {};
    return e.openOnHover && (E.onMouseenter = () => {
      a && (s = !0, a = !1, f());
    }, E.onMouseleave = () => {
      s = !1, d();
    }), E;
  });
  ce(r, (E) => {
    E && (e.openOnHover && !s && (!u.value || !l) || u.value && !l && (!e.openOnHover || !s)) && (n.value = !1);
  }), ce(n, (E) => {
    E || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const x = ie();
  xn(() => {
    x.value && He(() => {
      o.value = Yr(x.value);
    });
  });
  const k = ie(), y = V(() => e.target === "cursor" && h.value ? h.value : k.value ? Yr(k.value) : bh(e.target, i) || o.value), S = V(() => Array.isArray(y.value) ? void 0 : y.value);
  let M;
  return ce(() => !!e.activator, (E) => {
    E && Ve ? (M = yl(), M.run(() => {
      L_(e, i, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : M && M.stop();
  }, {
    flush: "post",
    immediate: !0
  }), mt(() => {
    M == null || M.stop();
  }), {
    activatorEl: o,
    activatorRef: x,
    target: y,
    targetEl: S,
    targetRef: k,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: v
  };
}
function L_(e, t, n) {
  let {
    activatorEl: r,
    activatorEvents: i
  } = n;
  ce(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = l(u);
      c && s(c);
    }
    a && He(() => o());
  }, {
    immediate: !0
  }), ce(() => e.activatorProps, () => {
    o();
  }), mt(() => {
    s();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && zw(a, fe(i.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && jw(a, fe(i.value, u));
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
}, M_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : bc;
  return ft(bc, e);
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
    touch: Aw,
    ssr: t === "ssr"
  };
}
function T_(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: r
  } = M_(e), i = ye(xc(t)), o = ye(Cc(t)), s = Tt({}), l = ye(_c(t));
  function a() {
    i.value = xc(), l.value = _c();
  }
  function u() {
    a(), o.value = Cc();
  }
  return xn(() => {
    const c = l.value < n.sm, f = l.value < n.md && !c, d = l.value < n.lg && !(f || c), h = l.value < n.xl && !(d || f || c), g = l.value < n.xxl && !(h || d || f || c), m = l.value >= n.xxl, p = c ? "xs" : f ? "sm" : d ? "md" : h ? "lg" : g ? "xl" : "xxl", v = typeof r == "number" ? r : n[r], x = l.value < v;
    s.xs = c, s.sm = f, s.md = d, s.lg = h, s.xl = g, s.xxl = m, s.smAndUp = !c, s.mdAndUp = !(c || f), s.lgAndUp = !(c || f || d), s.xlAndUp = !(c || f || d || h), s.smAndDown = !(d || h || g || m), s.mdAndDown = !(h || g || m), s.lgAndDown = !(g || m), s.xlAndDown = !m, s.name = p, s.height = i.value, s.width = l.value, s.mobile = x, s.mobileBreakpoint = r, s.platform = o.value, s.thresholds = n;
  }), Ve && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...El(s),
    update: u,
    ssr: !!t
  };
}
const V_ = Q({
  mobileBreakpoint: [Number, String]
}, "display");
function _h() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = Be(al);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const r = V(() => {
    if (!e.mobileBreakpoint)
      return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o;
  }), i = V(() => t ? {
    [`${t}--mobile`]: r.value
  } : {});
  return {
    ...n,
    displayClasses: i,
    mobile: r
  };
}
function I_() {
  if (!Ve)
    return ye(!1);
  const {
    ssr: e
  } = _h();
  if (e) {
    const t = ye(!1);
    return Cn(() => {
      t.value = !0;
    }), t;
  } else
    return ye(!0);
}
const xh = Q({
  eager: Boolean
}, "lazy");
function Ch(e, t) {
  const n = ye(!1), r = V(() => n.value || e.eager || t.value);
  ce(t, () => n.value = !0);
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
const Sc = Symbol.for("vuetify:stack"), Mr = Tt([]);
function $_(e, t, n) {
  const r = Qe("useStack"), i = !n, o = Be(Sc, void 0), s = Tt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Dt(Sc, s);
  const l = ye(+t.value);
  vr(e, () => {
    var f;
    const c = (f = Mr.at(-1)) == null ? void 0 : f[1];
    l.value = c ? c + 10 : +t.value, i && Mr.push([r.uid, l.value]), o == null || o.activeChildren.add(r.uid), mt(() => {
      if (i) {
        const d = pe(Mr).findIndex((h) => h[0] === r.uid);
        Mr.splice(d, 1);
      }
      o == null || o.activeChildren.delete(r.uid);
    });
  });
  const a = ye(!0);
  i && xn(() => {
    var f;
    const c = ((f = Mr.at(-1)) == null ? void 0 : f[0]) === r.uid;
    setTimeout(() => a.value = c);
  });
  const u = V(() => !s.activeChildren.size);
  return {
    globalTop: ei(a),
    localTop: u,
    stackStyles: V(() => ({
      zIndex: l.value
    }))
  };
}
function P_(e) {
  return {
    teleportTarget: V(() => {
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
function A_() {
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
  return (typeof t.value == "object" && t.value.closeConditional || A_)(e);
}
function R_(e, t, n) {
  const r = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Sh(e, t, n) && setTimeout(() => {
    kh(e, n) && r && r(e);
  }, 0);
}
function kc(e, t) {
  const n = jd(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const N_ = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (i) => R_(i, e, t), r = (i) => {
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
function O_(e) {
  const {
    modelValue: t,
    color: n,
    ...r
  } = e;
  return b(Xt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && b("div", fe({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, r), null)]
  });
}
const gi = Q({
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
  ...k_(),
  ...Ee(),
  ...Uo(),
  ...xh(),
  ...d_(),
  ...y_(),
  ...je(),
  ...Qo()
}, "VOverlay"), _n = ae()({
  name: "VOverlay",
  directives: {
    ClickOutside: N_
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
    const o = De(e, "modelValue"), s = V({
      get: () => o.value,
      set: (te) => {
        te && e.disabled || (o.value = te);
      }
    }), {
      teleportTarget: l
    } = P_(V(() => e.attach || e.contained)), {
      themeClasses: a
    } = it(e), {
      rtlClasses: u,
      isRtl: c
    } = Sn(), {
      hasContent: f,
      onAfterLeave: d
    } = Ch(e, s), h = Wn(V(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: g,
      localTop: m,
      stackStyles: p
    } = $_(s, be(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: v,
      activatorRef: x,
      target: k,
      targetEl: y,
      targetRef: S,
      activatorEvents: M,
      contentEvents: E,
      scrimEvents: I
    } = E_(e, {
      isActive: s,
      isTop: m
    }), {
      dimensionStyles: A
    } = Go(e), N = I_(), {
      scopeId: D
    } = hi();
    ce(() => e.disabled, (te) => {
      te && (s.value = !1);
    });
    const $ = ie(), R = ie(), {
      contentStyles: C,
      updateLocation: O
    } = h_(e, {
      isRtl: c,
      contentEl: R,
      target: k,
      isActive: s
    });
    w_(e, {
      root: $,
      contentEl: R,
      targetEl: y,
      isActive: s,
      updateLocation: O
    });
    function T(te) {
      i("click:outside", te), e.persistent ? j() : s.value = !1;
    }
    function B() {
      return s.value && g.value;
    }
    Ve && ce(s, (te) => {
      te ? window.addEventListener("keydown", F) : window.removeEventListener("keydown", F);
    }, {
      immediate: !0
    }), Qt(() => {
      Ve && window.removeEventListener("keydown", F);
    });
    function F(te) {
      var ue, Ce;
      te.key === "Escape" && g.value && (e.persistent ? j() : (s.value = !1, (ue = R.value) != null && ue.contains(document.activeElement) && ((Ce = v.value) == null || Ce.focus())));
    }
    const q = Ub();
    vr(() => e.closeOnBack, () => {
      Gb(q, (te) => {
        g.value && s.value ? (te(!1), e.persistent ? j() : s.value = !1) : te();
      });
    });
    const K = ie();
    ce(() => s.value && (e.absolute || e.contained) && l.value == null, (te) => {
      if (te) {
        const ue = vb($.value);
        ue && ue !== document.scrollingElement && (K.value = ue.scrollTop);
      }
    });
    function j() {
      e.noClickAnimation || R.value && Nn(R.value, [{
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
    function Z() {
      d(), i("afterLeave");
    }
    return we(() => {
      var te;
      return b(ke, null, [(te = n.activator) == null ? void 0 : te.call(n, {
        isActive: s.value,
        props: fe({
          ref: x,
          targetRef: S
        }, M.value, e.activatorProps)
      }), N.value && f.value && b(Lm, {
        disabled: !l.value,
        to: l.value
      }, {
        default: () => [b("div", fe({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": s.value,
            "v-overlay--contained": e.contained
          }, a.value, u.value, e.class],
          style: [p.value, {
            "--v-overlay-opacity": e.opacity,
            top: me(K.value)
          }, e.style],
          ref: $
        }, D, r), [b(O_, fe({
          color: h,
          modelValue: s.value && !!e.scrim
        }, I.value), null), b(mn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: k.value,
          onAfterLeave: Z
        }, {
          default: () => {
            var ue;
            return [ht(b("div", fe({
              ref: R,
              class: ["v-overlay__content", e.contentClass],
              style: [A.value, C.value]
            }, E.value, e.contentProps), [(ue = n.default) == null ? void 0 : ue.call(n, {
              isActive: s
            })]), [[Yn, s.value], [qn("click-outside"), {
              handler: T,
              closeConditional: B,
              include: () => [v.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: v,
      target: k,
      animateClick: j,
      contentEl: R,
      globalTop: g,
      localTop: m,
      updateLocation: O
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
const F_ = Q({
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
}, "VDialog"), Eh = ae()({
  name: "VDialog",
  props: F_(),
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
    Ve && ce(() => r.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", s) : document.removeEventListener("focusin", s);
    }, {
      immediate: !0
    }), ce(r, async (a) => {
      var u, c;
      await He(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const l = V(() => fe({
      "aria-haspopup": "dialog",
      "aria-expanded": String(r.value)
    }, e.activatorProps));
    return we(() => {
      const a = _n.filterProps(e);
      return b(_n, fe({
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
          return b(Ke, {
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
function B_(e) {
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
const D_ = Symbol.for("vuetify:v-slide-group"), ma = Q({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: D_
  },
  nextIcon: {
    type: Pe,
    default: "$next"
  },
  prevIcon: {
    type: Pe,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...Ee(),
  ...V_(),
  ...rt(),
  ...ra({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), bo = ae()({
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
    } = _h(e), s = jo(e, e.symbol), l = ye(!1), a = ye(0), u = ye(0), c = ye(0), f = V(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: h
    } = tl(), {
      resizeRef: g,
      contentRect: m
    } = tl(), p = V(() => s.selected.value.length ? s.items.value.findIndex((j) => j.id === s.selected.value[0]) : -1), v = V(() => s.selected.value.length ? s.items.value.findIndex((j) => j.id === s.selected.value[s.selected.value.length - 1]) : -1);
    if (Ve) {
      let j = -1;
      ce(() => [s.selected.value, h.value, m.value, f.value], () => {
        cancelAnimationFrame(j), j = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Z = f.value ? "width" : "height";
            u.value = h.value[Z], c.value = m.value[Z], l.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && g.value) {
            const Z = g.value.children[v.value];
            p.value === 0 || !l.value ? a.value = 0 : e.centerActive ? a.value = B_({
              selectedElement: Z,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              isHorizontal: f.value
            }) : l.value && (a.value = Lc({
              selectedElement: Z,
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
    const x = ye(!1);
    let k = 0, y = 0;
    function S(j) {
      const Z = f.value ? "clientX" : "clientY";
      y = (r.value && f.value ? -1 : 1) * a.value, k = j.touches[0][Z], x.value = !0;
    }
    function M(j) {
      if (!l.value)
        return;
      const Z = f.value ? "clientX" : "clientY", te = r.value && f.value ? -1 : 1;
      a.value = te * (y + k - j.touches[0][Z]);
    }
    function E(j) {
      const Z = c.value - u.value;
      a.value < 0 || !l.value ? a.value = 0 : a.value >= Z && (a.value = Z), x.value = !1;
    }
    function I() {
      d.value && (d.value[f.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const A = ye(!1);
    function N(j) {
      if (A.value = !0, !(!l.value || !g.value)) {
        for (const Z of j.composedPath())
          for (const te of g.value.children)
            if (te === Z) {
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
    function D(j) {
      A.value = !1;
    }
    function $(j) {
      var Z;
      !A.value && !(j.relatedTarget && ((Z = g.value) != null && Z.contains(j.relatedTarget))) && C();
    }
    function R(j) {
      g.value && (f.value ? j.key === "ArrowRight" ? C(r.value ? "prev" : "next") : j.key === "ArrowLeft" && C(r.value ? "next" : "prev") : j.key === "ArrowDown" ? C("next") : j.key === "ArrowUp" && C("prev"), j.key === "Home" ? C("first") : j.key === "End" && C("last"));
    }
    function C(j) {
      var Z, te, ue, Ce, he;
      if (g.value)
        if (!j)
          (Z = Kr(g.value)[0]) == null || Z.focus();
        else if (j === "next") {
          const xe = (te = g.value.querySelector(":focus")) == null ? void 0 : te.nextElementSibling;
          xe ? xe.focus() : C("first");
        } else if (j === "prev") {
          const xe = (ue = g.value.querySelector(":focus")) == null ? void 0 : ue.previousElementSibling;
          xe ? xe.focus() : C("last");
        } else
          j === "first" ? (Ce = g.value.firstElementChild) == null || Ce.focus() : j === "last" && ((he = g.value.lastElementChild) == null || he.focus());
    }
    function O(j) {
      const Z = a.value + (j === "prev" ? -1 : 1) * u.value;
      a.value = co(Z, 0, c.value - u.value);
    }
    const T = V(() => {
      let j = a.value > c.value - u.value ? -(c.value - u.value) + Ec(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (j = Ec(-a.value));
      const Z = r.value && f.value ? -1 : 1;
      return {
        transform: `translate${f.value ? "X" : "Y"}(${Z * j}px)`,
        transition: x.value ? "none" : "",
        willChange: x.value ? "transform" : ""
      };
    }), B = V(() => ({
      next: s.next,
      prev: s.prev,
      select: s.select,
      isSelected: s.isSelected
    })), F = V(() => {
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
    }), q = V(() => Math.abs(a.value) > 0), K = V(() => c.value > Math.abs(a.value) + u.value);
    return we(() => b(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !f.value,
        "v-slide-group--has-affixes": F.value,
        "v-slide-group--is-overflowing": l.value
      }, i.value, e.class],
      style: e.style,
      tabindex: A.value || s.selected.value.length ? -1 : 0,
      onFocus: $
    }, {
      default: () => {
        var j, Z, te;
        return [F.value && b("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !q.value
          }],
          onClick: () => q.value && O("prev")
        }, [((j = n.prev) == null ? void 0 : j.call(n, B.value)) ?? b(vc, null, {
          default: () => [b(Xe, {
            icon: r.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), b("div", {
          key: "container",
          ref: d,
          class: "v-slide-group__container",
          onScroll: I
        }, [b("div", {
          ref: g,
          class: "v-slide-group__content",
          style: T.value,
          onTouchstartPassive: S,
          onTouchmovePassive: M,
          onTouchendPassive: E,
          onFocusin: N,
          onFocusout: D,
          onKeydown: R
        }, [(Z = n.default) == null ? void 0 : Z.call(n, B.value)])]), F.value && b("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !K.value
          }],
          onClick: () => K.value && O("next")
        }, [((te = n.next) == null ? void 0 : te.call(n, B.value)) ?? b(vc, null, {
          default: () => [b(Xe, {
            icon: r.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: s.selected,
      scrollTo: O,
      scrollOffset: a,
      focus: C
    };
  }
}), Lh = Symbol.for("vuetify:v-chip-group"), H_ = Q({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: si
  },
  ...ma(),
  ...Ee(),
  ...ra({
    selectedClass: "v-chip--selected"
  }),
  ...rt(),
  ...je(),
  ...Kn({
    variant: "tonal"
  })
}, "VChipGroup");
ae()({
  name: "VChipGroup",
  props: H_(),
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
    return _r({
      VChip: {
        color: be(e, "color"),
        disabled: be(e, "disabled"),
        filter: be(e, "filter"),
        variant: be(e, "variant")
      }
    }), we(() => {
      const u = bo.filterProps(e);
      return b(bo, fe(u, {
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
const z_ = Q({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Pe,
  closable: Boolean,
  closeIcon: {
    type: Pe,
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
  prependIcon: Pe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Kt(),
  onClickOnce: Kt(),
  ...Bo(),
  ...Ee(),
  ...jt(),
  ...Ho(),
  ...ia(),
  ...tn(),
  ...da(),
  ...fi(),
  ...rt({
    tag: "span"
  }),
  ...je(),
  ...Kn({
    variant: "tonal"
  })
}, "VChip"), j_ = ae()({
  name: "VChip",
  directives: {
    Ripple: Zo
  },
  props: z_(),
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
    } = en(e), {
      elevationClasses: f
    } = zo(e), {
      roundedClasses: d
    } = nn(e), {
      sizeClasses: h
    } = di(e), {
      themeClasses: g
    } = it(e), m = De(e, "modelValue"), p = oa(e, Lh, !1), v = fa(e, n), x = V(() => e.link !== !1 && v.isLink.value), k = V(() => !e.disabled && e.link !== !1 && (!!p || e.link || v.isClickable.value)), y = V(() => ({
      "aria-label": o(e.closeLabel),
      onClick(E) {
        E.stopPropagation(), m.value = !1, r("click:close", E);
      }
    }));
    function S(E) {
      var I;
      r("click", E), k.value && ((I = v.navigate) == null || I.call(v, E), p == null || p.toggle());
    }
    function M(E) {
      (E.key === "Enter" || E.key === " ") && (E.preventDefault(), S(E));
    }
    return () => {
      const E = v.isLink.value ? "a" : e.tag, I = !!(e.appendIcon || e.appendAvatar), A = !!(I || i.append), N = !!(i.close || e.closable), D = !!(i.filter || e.filter) && p, $ = !!(e.prependIcon || e.prependAvatar), R = !!($ || i.prepend), C = !p || p.isSelected.value;
      return m.value && ht(b(E, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": k.value,
          "v-chip--filter": D,
          "v-chip--pill": e.pill
        }, g.value, s.value, C ? l.value : void 0, c.value, f.value, d.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [C ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: v.href.value,
        tabindex: k.value ? 0 : void 0,
        onClick: S,
        onKeydown: k.value && !x.value && M
      }, {
        default: () => {
          var O;
          return [ui(k.value, "v-chip"), D && b(ph, {
            key: "filter"
          }, {
            default: () => [ht(b("div", {
              class: "v-chip__filter"
            }, [i.filter ? b(Ke, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, i.filter) : b(Xe, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Yn, p.isSelected.value]])]
          }), R && b("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [i.prepend ? b(Ke, {
            key: "prepend-defaults",
            disabled: !$,
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
          }, i.prepend) : b(ke, null, [e.prependIcon && b(Xe, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && b(yo, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), b("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((O = i.default) == null ? void 0 : O.call(i, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), A && b("div", {
            key: "append",
            class: "v-chip__append"
          }, [i.append ? b(Ke, {
            key: "append-defaults",
            disabled: !I,
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
          }, i.append) : b(ke, null, [e.appendIcon && b(Xe, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && b(yo, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), N && b("button", fe({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, y.value), [i.close ? b(Ke, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, i.close) : b(Xe, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[qn("ripple"), k.value && e.ripple, null]]);
    };
  }
}), W_ = Q({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Ee(),
  ...Qo({
    transition: {
      component: vh
    }
  })
}, "VCounter"), U_ = ae()({
  name: "VCounter",
  functional: !0,
  props: W_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = V(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return we(() => b(mn, {
      transition: e.transition
    }, {
      default: () => [ht(b("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: r.value,
        max: e.max,
        value: e.value
      }) : r.value]), [[Yn, e.active]])]
    })), {};
  }
}), G_ = Q({
  text: String,
  onClick: Kt(),
  ...Ee(),
  ...je()
}, "VLabel"), Mh = ae()({
  name: "VLabel",
  props: G_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return we(() => {
      var r;
      return b("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), q_ = Q({
  floating: Boolean,
  ...Ee()
}, "VFieldLabel"), Pi = ae()({
  name: "VFieldLabel",
  props: q_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return we(() => b(Mh, {
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
    return b(Xe, {
      icon: e[`${i}Icon`],
      "aria-label": l,
      onClick: s
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Vh = Q({
  focused: Boolean,
  "onUpdate:focused": Kt()
}, "focus");
function va(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt();
  const n = De(e, "focused"), r = V(() => ({
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
const Y_ = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ih = Q({
  appendInnerIcon: Pe,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Pe,
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
  prependInnerIcon: Pe,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Y_.includes(e)
  },
  "onClick:clear": Kt(),
  "onClick:appendInner": Kt(),
  "onClick:prependInner": Kt(),
  ...Ee(),
  ...la(),
  ...tn(),
  ...je()
}, "VField"), $h = ae()({
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
    } = nn(e), {
      rtlClasses: h
    } = Sn(), g = V(() => e.dirty || e.active), m = V(() => !e.singleLine && !!(e.label || i.label)), p = It(), v = V(() => e.id || `input-${p}`), x = V(() => `${v.value}-messages`), k = ie(), y = ie(), S = ie(), M = V(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: E,
      backgroundColorStyles: I
    } = Wn(be(e, "bgColor")), {
      textColorClasses: A,
      textColorStyles: N
    } = bn(V(() => e.error || e.disabled ? void 0 : g.value && a.value ? e.color : e.baseColor));
    ce(g, (R) => {
      if (m.value) {
        const C = k.value.$el, O = y.value.$el;
        requestAnimationFrame(() => {
          const T = Jl(C), B = O.getBoundingClientRect(), F = B.x - T.x, q = B.y - T.y - (T.height / 2 - B.height / 2), K = B.width / 0.75, j = Math.abs(K - T.width) > 1 ? {
            maxWidth: me(K)
          } : void 0, Z = getComputedStyle(C), te = getComputedStyle(O), ue = parseFloat(Z.transitionDuration) * 1e3 || 150, Ce = parseFloat(te.getPropertyValue("--v-field-label-scale")), he = te.getPropertyValue("color");
          C.style.visibility = "visible", O.style.visibility = "hidden", Nn(C, {
            transform: `translate(${F}px, ${q}px) scale(${Ce})`,
            color: he,
            ...j
          }, {
            duration: ue,
            easing: Zr,
            direction: R ? "normal" : "reverse"
          }).finished.then(() => {
            C.style.removeProperty("visibility"), O.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const D = V(() => ({
      isActive: g,
      isFocused: a,
      controlRef: S,
      blur: c,
      focus: u
    }));
    function $(R) {
      R.target !== document.activeElement && R.preventDefault();
    }
    return we(() => {
      var F, q, K;
      const R = e.variant === "outlined", C = i["prepend-inner"] || e.prependInnerIcon, O = !!(e.clearable || i.clear), T = !!(i["append-inner"] || e.appendInnerIcon || O), B = () => i.label ? i.label({
        ...D.value,
        label: e.label,
        props: {
          for: v.value
        }
      }) : e.label;
      return b("div", fe({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": T,
          "v-field--center-affix": e.centerAffix ?? !M.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": C,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !B(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, E.value, l.value, s.value, d.value, h.value, e.class],
        style: [I.value, e.style],
        onClick: $
      }, n), [b("div", {
        class: "v-field__overlay"
      }, null), b(aa, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: i.loader
      }), C && b("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && b(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (F = i["prepend-inner"]) == null ? void 0 : F.call(i, D.value)]), b("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && b(Pi, {
        key: "floating-label",
        ref: y,
        class: [A.value],
        floating: !0,
        for: v.value,
        style: N.value
      }, {
        default: () => [B()]
      }), b(Pi, {
        ref: k,
        for: v.value
      }, {
        default: () => [B()]
      }), (q = i.default) == null ? void 0 : q.call(i, {
        ...D.value,
        props: {
          id: v.value,
          class: "v-field__input",
          "aria-describedby": x.value
        },
        focus: u,
        blur: c
      })]), O && b(ph, {
        key: "clear"
      }, {
        default: () => [ht(b("div", {
          class: "v-field__clearable",
          onMousedown: (j) => {
            j.preventDefault(), j.stopPropagation();
          }
        }, [i.clear ? i.clear() : b(f, {
          name: "clear"
        }, null)]), [[Yn, e.dirty]])]
      }), T && b("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(K = i["append-inner"]) == null ? void 0 : K.call(i, D.value), e.appendInnerIcon && b(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), b("div", {
        class: ["v-field__outline", A.value],
        style: N.value
      }, [R && b(ke, null, [b("div", {
        class: "v-field__outline__start"
      }, null), m.value && b("div", {
        class: "v-field__outline__notch"
      }, [b(Pi, {
        ref: y,
        floating: !0,
        for: v.value
      }, {
        default: () => [B()]
      })]), b("div", {
        class: "v-field__outline__end"
      }, null)]), M.value && m.value && b(Pi, {
        ref: y,
        floating: !0,
        for: v.value
      }, {
        default: () => [B()]
      })])]);
    }), {
      controlRef: S
    };
  }
});
function K_(e) {
  const t = Object.keys($h.props).filter((n) => !Kl(n) && n !== "class" && n !== "style");
  return Vd(e, t);
}
const X_ = Q({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Ee(),
  ...Qo({
    transition: {
      component: vh,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Z_ = ae()({
  name: "VMessages",
  props: X_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = V(() => Yt(e.messages)), {
      textColorClasses: i,
      textColorStyles: o
    } = bn(V(() => e.color));
    return we(() => b(mn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", i.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && r.value.map((s, l) => b("div", {
        class: "v-messages__message",
        key: `${l}-${r.value}`
      }, [n.message ? n.message({
        message: s
      }) : s]))]
    })), {};
  }
}), J_ = Symbol.for("vuetify:form");
function Q_() {
  return Be(J_, null);
}
const e2 = Q({
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
function t2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : It();
  const r = De(e, "modelValue"), i = V(() => e.validationValue === void 0 ? r.value : e.validationValue), o = Q_(), s = ie([]), l = ye(!0), a = V(() => !!(Yt(r.value === "" ? null : r.value).length || Yt(i.value === "" ? null : i.value).length)), u = V(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = V(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = V(() => {
    var y;
    return (y = e.errorMessages) != null && y.length ? Yt(e.errorMessages).concat(s.value).slice(0, Math.max(0, +e.maxErrors)) : s.value;
  }), d = V(() => {
    let y = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    y === "lazy" && (y = "input lazy");
    const S = new Set((y == null ? void 0 : y.split(" ")) ?? []);
    return {
      blur: S.has("blur") || S.has("input"),
      input: S.has("input"),
      submit: S.has("submit"),
      lazy: S.has("lazy")
    };
  }), h = V(() => {
    var y;
    return e.error || (y = e.errorMessages) != null && y.length ? !1 : e.rules.length ? l.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0;
  }), g = ye(!1), m = V(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = V(() => e.name ?? Ot(n));
  Il(() => {
    o == null || o.register({
      id: p.value,
      validate: k,
      reset: v,
      resetValidation: x
    });
  }), Qt(() => {
    o == null || o.unregister(p.value);
  }), Cn(async () => {
    d.value.lazy || await k(!0), o == null || o.update(p.value, h.value, f.value);
  }), vr(() => d.value.input, () => {
    ce(i, () => {
      if (i.value != null)
        k();
      else if (e.focused) {
        const y = ce(() => e.focused, (S) => {
          S || k(), y();
        });
      }
    });
  }), vr(() => d.value.blur, () => {
    ce(() => e.focused, (y) => {
      y || k();
    });
  }), ce([h, f], () => {
    o == null || o.update(p.value, h.value, f.value);
  });
  function v() {
    r.value = null, He(x);
  }
  function x() {
    l.value = !0, d.value.lazy ? s.value = [] : k(!0);
  }
  async function k() {
    let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const S = [];
    g.value = !0;
    for (const M of e.rules) {
      if (S.length >= +(e.maxErrors ?? 1))
        break;
      const I = await (typeof M == "function" ? M : () => M)(i.value);
      if (I !== !0) {
        if (I !== !1 && typeof I != "string") {
          console.warn(`${I} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        S.push(I || "");
      }
    }
    return s.value = S, g.value = !1, l.value = y, s.value;
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
    resetValidation: x,
    validate: k,
    validationClasses: m
  };
}
const pa = Q({
  id: String,
  appendIcon: Pe,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Pe,
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
  "onClick:prepend": Kt(),
  "onClick:append": Kt(),
  ...Ee(),
  ...jt(),
  ...e2()
}, "VInput"), _o = ae()({
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
    } = en(e), {
      rtlClasses: s
    } = Sn(), {
      InputIcon: l
    } = Th(e), a = It(), u = V(() => e.id || `input-${a}`), c = V(() => `${u.value}-messages`), {
      errorMessages: f,
      isDirty: d,
      isDisabled: h,
      isReadonly: g,
      isPristine: m,
      isValid: p,
      isValidating: v,
      reset: x,
      resetValidation: k,
      validate: y,
      validationClasses: S
    } = t2(e, "v-input", u), M = V(() => ({
      id: u,
      messagesId: c,
      isDirty: d,
      isDisabled: h,
      isReadonly: g,
      isPristine: m,
      isValid: p,
      isValidating: v,
      reset: x,
      resetValidation: k,
      validate: y
    })), E = V(() => {
      var I;
      return (I = e.errorMessages) != null && I.length || !m.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return we(() => {
      var $, R, C, O;
      const I = !!(r.prepend || e.prependIcon), A = !!(r.append || e.appendIcon), N = E.value.length > 0, D = !e.hideDetails || e.hideDetails === "auto" && (N || !!r.details);
      return b("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, s.value, S.value, e.class],
        style: e.style
      }, [I && b("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [($ = r.prepend) == null ? void 0 : $.call(r, M.value), e.prependIcon && b(l, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), r.default && b("div", {
        class: "v-input__control"
      }, [(R = r.default) == null ? void 0 : R.call(r, M.value)]), A && b("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && b(l, {
        key: "append-icon",
        name: "append"
      }, null), (C = r.append) == null ? void 0 : C.call(r, M.value)]), D && b("div", {
        class: "v-input__details"
      }, [b(Z_, {
        id: c.value,
        active: N,
        messages: E.value
      }, {
        message: r.message
      }), (O = r.details) == null ? void 0 : O.call(r, M.value)])]);
    }), {
      reset: x,
      resetValidation: k,
      validate: y,
      isValid: p,
      errorMessages: f
    };
  }
}), n2 = Q({
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
    validator: (e) => Yt(e).every((t) => t != null && typeof t == "object")
  },
  ...Ih({
    clearable: !0
  })
}, "VFileInput"), r2 = ae()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: n2(),
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
    } = va(e), c = V(() => typeof e.showSize != "boolean" ? e.showSize : void 0), f = V(() => (s.value ?? []).reduce((A, N) => {
      let {
        size: D = 0
      } = N;
      return A + D;
    }, 0)), d = V(() => zu(f.value, c.value)), h = V(() => (s.value ?? []).map((A) => {
      const {
        name: N = "",
        size: D = 0
      } = A;
      return e.showSize ? `${N} (${zu(D, c.value)})` : N;
    })), g = V(() => {
      var N;
      const A = ((N = s.value) == null ? void 0 : N.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, A, d.value) : o(e.counterString, A);
    }), m = ie(), p = ie(), v = ie(), x = V(() => l.value || e.active), k = V(() => ["plain", "underlined"].includes(e.variant));
    function y() {
      var A;
      v.value !== document.activeElement && ((A = v.value) == null || A.focus()), l.value || a();
    }
    function S(A) {
      var N;
      (N = v.value) == null || N.click();
    }
    function M(A) {
      r("mousedown:control", A);
    }
    function E(A) {
      var N;
      (N = v.value) == null || N.click(), r("click:control", A);
    }
    function I(A) {
      A.stopPropagation(), y(), He(() => {
        s.value = [], Fw(e["onClick:clear"], A);
      });
    }
    return ce(s, (A) => {
      (!Array.isArray(A) || !A.length) && v.value && (v.value.value = "");
    }), we(() => {
      const A = !!(i.counter || e.counter), N = !!(A || i.details), [D, $] = Xl(n), {
        modelValue: R,
        ...C
      } = _o.filterProps(e), O = K_(e);
      return b(_o, fe({
        ref: m,
        modelValue: s.value,
        "onUpdate:modelValue": (T) => s.value = T,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": k.value
        }, e.class],
        style: e.style,
        "onClick:prepend": S
      }, D, C, {
        centerAffix: !k.value,
        focused: l.value
      }), {
        ...i,
        default: (T) => {
          let {
            id: B,
            isDisabled: F,
            isDirty: q,
            isReadonly: K,
            isValid: j
          } = T;
          return b($h, fe({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: M,
            onClick: E,
            "onClick:clear": I,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, O, {
            id: B.value,
            active: x.value || q.value,
            dirty: q.value,
            disabled: F.value,
            focused: l.value,
            error: j.value === !1
          }), {
            ...i,
            default: (Z) => {
              var Ce;
              let {
                props: {
                  class: te,
                  ...ue
                }
              } = Z;
              return b(ke, null, [b("input", fe({
                ref: v,
                type: "file",
                readonly: K.value,
                disabled: F.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (he) => {
                  he.stopPropagation(), K.value && he.preventDefault(), y();
                },
                onChange: (he) => {
                  if (!he.target)
                    return;
                  const xe = he.target;
                  s.value = [...xe.files ?? []];
                },
                onFocus: y,
                onBlur: u
              }, ue, $), null), b("div", {
                class: te
              }, [!!((Ce = s.value) != null && Ce.length) && (i.selection ? i.selection({
                fileNames: h.value,
                totalBytes: f.value,
                totalBytesReadable: d.value
              }) : e.chips ? h.value.map((he) => b(j_, {
                key: he,
                size: "small",
                color: e.color
              }, {
                default: () => [he]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: N ? (T) => {
          var B, F;
          return b(ke, null, [(B = i.details) == null ? void 0 : B.call(i, T), A && b(ke, null, [b("span", null, null), b(U_, {
            active: !!((F = s.value) != null && F.length),
            value: g.value
          }, i.counter)])]);
        } : void 0
      });
    }), xr({}, m, p, v);
  }
}), i2 = Q({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...Ee(),
  ...rt()
}, "VContainer"), Mc = ae()({
  name: "VContainer",
  props: i2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: r
    } = Sn();
    return we(() => b(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), Ph = Fo("v-spacer", "div", "VSpacer");
function o2(e) {
  const t = ye(e);
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
  return mt(r), {
    clear: r,
    time: t,
    start: o,
    reset: i
  };
}
const s2 = Q({
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
  ...tn(),
  ...Kn(),
  ...je(),
  ...li(gi({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), l2 = ae()({
  name: "VSnackbar",
  props: s2(),
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
    } = nn(e), d = o2(Number(e.timeout)), h = ie(), g = ie(), m = ye(!1);
    ce(r, v), ce(() => e.timeout, v), Cn(() => {
      r.value && v();
    });
    let p = -1;
    function v() {
      d.reset(), window.clearTimeout(p);
      const S = Number(e.timeout);
      if (!r.value || S === -1)
        return;
      const M = Yr(g.value);
      d.start(M), p = window.setTimeout(() => {
        r.value = !1;
      }, S);
    }
    function x() {
      d.reset(), window.clearTimeout(p);
    }
    function k() {
      m.value = !0, x();
    }
    function y() {
      m.value = !1, v();
    }
    return we(() => {
      const S = _n.filterProps(e), M = !!(n.default || n.text || e.text);
      return b(_n, fe({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": r.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, S, {
        modelValue: r.value,
        "onUpdate:modelValue": (E) => r.value = E,
        contentProps: fe({
          class: ["v-snackbar__wrapper", l.value, a.value, f.value, c.value],
          style: [i.value, u.value],
          onPointerenter: k,
          onPointerleave: y
        }, S.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, s), {
        default: () => {
          var E, I;
          return [ui(!1, "v-snackbar"), e.timer && !m.value && b("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [b(eh, {
            ref: g,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), M && b("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((E = n.text) == null ? void 0 : E.call(n)) ?? e.text, (I = n.default) == null ? void 0 : I.call(n)]), n.actions && b(Ke, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [b("div", {
              class: "v-snackbar__actions"
            }, [n.actions()])]
          })];
        },
        activator: n.activator
      });
    }), xr({}, h);
  }
}), Ah = Symbol.for("vuetify:v-tabs"), a2 = Q({
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
}, "VTab"), ul = ae()({
  name: "VTab",
  props: a2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: r
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: o
    } = bn(e, "sliderColor"), s = ie(), l = ie(), a = V(() => e.direction === "horizontal"), u = V(() => {
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
        const v = getComputedStyle(m).color, x = m.getBoundingClientRect(), k = p.getBoundingClientRect(), y = a.value ? "x" : "y", S = a.value ? "X" : "Y", M = a.value ? "right" : "bottom", E = a.value ? "width" : "height", I = x[y], A = k[y], N = I > A ? x[M] - k[M] : x[y] - k[y], D = Math.sign(N) > 0 ? a.value ? "right" : "bottom" : Math.sign(N) < 0 ? a.value ? "left" : "top" : "center", R = (Math.abs(N) + (Math.sign(N) < 0 ? x[E] : k[E])) / Math.max(x[E], k[E]) || 0, C = x[E] / k[E] || 0, O = 1.5;
        Nn(p, {
          backgroundColor: [v, "currentcolor"],
          transform: [`translate${S}(${N}px) scale${S}(${C})`, `translate${S}(${N / O}px) scale${S}(${(R - 1) / O + 1})`, "none"],
          transformOrigin: Array(3).fill(D)
        }, {
          duration: 225,
          easing: Zr
        });
      }
    }
    return we(() => {
      const f = dt.filterProps(e);
      return b(dt, fe({
        symbol: Ah,
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
          return b(ke, null, [((d = n.default) == null ? void 0 : d.call(n)) ?? e.text, !e.hideSlider && b("div", {
            ref: l,
            class: ["v-tab__slider", i.value],
            style: o.value
          }, null)]);
        }
      });
    }), xr({}, s);
  }
});
function u2(e) {
  return e ? e.map((t) => uo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const c2 = Q({
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
  ...jt(),
  ...rt()
}, "VTabs"), f2 = ae()({
  name: "VTabs",
  props: c2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), i = V(() => u2(e.items)), {
      densityClasses: o
    } = en(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: l
    } = Wn(be(e, "bgColor"));
    return _r({
      VTab: {
        color: be(e, "color"),
        direction: be(e, "direction"),
        stacked: be(e, "stacked"),
        fixed: be(e, "fixedTabs"),
        sliderColor: be(e, "sliderColor"),
        hideSlider: be(e, "hideSlider")
      }
    }), we(() => {
      const a = bo.filterProps(e);
      return b(bo, fe(a, {
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
        symbol: Ah
      }), {
        default: () => [n.default ? n.default() : i.value.map((u) => b(ul, fe(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), d2 = Q({
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
}, "VTooltip"), cr = ae()({
  name: "VTooltip",
  props: d2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), {
      scopeId: i
    } = hi(), o = It(), s = V(() => e.id || `v-tooltip-${o}`), l = ie(), a = V(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = V(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = V(() => e.transition ? e.transition : r.value ? "scale-transition" : "fade-transition"), f = V(() => fe({
      "aria-describedby": s.value
    }, e.activatorProps));
    return we(() => {
      const d = _n.filterProps(e);
      return b(_n, fe({
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
}), h2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: r,
    touchendY: i
  } = e, o = 0.5, s = 16;
  e.offsetX = n - t, e.offsetY = i - r, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - s && e.left(e), e.right && n > t + s && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && i < r - s && e.up(e), e.down && i > r + s && e.down(e));
};
function g2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (r = t.start) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function m2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (r = t.end) == null || r.call(t, {
    originalEvent: e,
    ...t
  }), h2(t);
}
function v2(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (r = t.move) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function p2() {
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
    touchstart: (n) => g2(n, t),
    touchend: (n) => m2(n, t),
    touchmove: (n) => v2(n, t)
  };
}
function y2(e, t) {
  var l;
  const n = t.value, r = n != null && n.parent ? e.parentElement : e, i = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!r || !o)
    return;
  const s = p2(t.value);
  r._touchHandlers = r._touchHandlers ?? /* @__PURE__ */ Object.create(null), r._touchHandlers[o] = s, Td(s).forEach((a) => {
    r.addEventListener(a, s[a], i);
  });
}
function w2(e, t) {
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
  mounted: y2,
  unmounted: w2
}, b2 = Rh, Nh = Symbol.for("vuetify:v-window"), Oh = Symbol.for("vuetify:v-window-group"), _2 = Q({
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
  ...Ee(),
  ...rt(),
  ...je()
}, "VWindow"), x2 = ae()({
  name: "VWindow",
  directives: {
    Touch: Rh
  },
  props: _2(),
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
    } = Sn(), {
      t: o
    } = qo(), s = jo(e, Oh), l = ie(), a = V(() => i.value ? !e.reverse : e.reverse), u = ye(!1), c = V(() => {
      const y = e.direction === "vertical" ? "y" : "x", M = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${y}${M}-transition`;
    }), f = ye(0), d = ie(void 0), h = V(() => s.items.value.findIndex((y) => s.selected.value.includes(y.id)));
    ce(h, (y, S) => {
      const M = s.items.value.length, E = M - 1;
      M <= 2 ? u.value = y < S : y === E && S === 0 ? u.value = !0 : y === 0 && S === E ? u.value = !1 : u.value = y < S;
    }), Dt(Nh, {
      transition: c,
      isReversed: u,
      transitionCount: f,
      transitionHeight: d,
      rootRef: l
    });
    const g = V(() => e.continuous || h.value !== 0), m = V(() => e.continuous || h.value !== s.items.value.length - 1);
    function p() {
      g.value && s.prev();
    }
    function v() {
      m.value && s.next();
    }
    const x = V(() => {
      const y = [], S = {
        icon: i.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: s.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      y.push(g.value ? n.prev ? n.prev({
        props: S
      }) : b(dt, S, null) : b("div", null, null));
      const M = {
        icon: i.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: s.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return y.push(m.value ? n.next ? n.next({
        props: M
      }) : b(dt, M, null) : b("div", null, null)), y;
    }), k = V(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : v();
        },
        right: () => {
          a.value ? v() : p();
        },
        start: (S) => {
          let {
            originalEvent: M
          } = S;
          M.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return we(() => ht(b(e.tag, {
      ref: l,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, r.value, e.class],
      style: e.style
    }, {
      default: () => {
        var y, S;
        return [b("div", {
          class: "v-window__container",
          style: {
            height: d.value
          }
        }, [(y = n.default) == null ? void 0 : y.call(n, {
          group: s
        }), e.showArrows !== !1 && b("div", {
          class: "v-window__controls"
        }, [x.value])]), (S = n.additional) == null ? void 0 : S.call(n, {
          group: s
        })];
      }
    }), [[qn("touch"), k.value]])), {
      group: s
    };
  }
});
function C2() {
  const e = ye(!1);
  return Cn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: V(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ei(e)
  };
}
const S2 = Q({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...Ee(),
  ...ia(),
  ...xh()
}, "VWindowItem"), Tc = ae()({
  name: "VWindowItem",
  directives: {
    Touch: b2
  },
  props: S2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Be(Nh), i = oa(e, Oh), {
      isBooted: o
    } = C2();
    if (!r || !i)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const s = ye(!1), l = V(() => o.value && (r.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
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
    const d = V(() => {
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
    return we(() => b(mn, {
      transition: d.value,
      disabled: !o.value
    }, {
      default: () => {
        var g;
        return [ht(b("div", {
          class: ["v-window-item", i.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((g = n.default) == null ? void 0 : g.call(n))]), [[Yn, i.isSelected.value]])];
      }
    })), {
      groupItem: i
    };
  }
}), k2 = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Select File", -1), E2 = /* @__PURE__ */ Ne("b", null, "replace", -1), L2 = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Preview", -1), M2 = /* @__PURE__ */ Ne("b", null, "copy", -1), T2 = /* @__PURE__ */ wr({
  __name: "ImportExport",
  props: {
    graphAsTgf: {}
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, r = t, i = ie(!1), o = ie(0), s = ie(), l = ie(!1), a = V(
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
    return (h, g) => (zn(), Vo(Eh, {
      modelValue: i.value,
      "onUpdate:modelValue": g[6] || (g[6] = (m) => i.value = m),
      "max-width": "800px"
    }, {
      activator: de(({ props: m }) => [
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: de(({ props: p }) => [
            b(dt, fe({
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
        b(ga, null, {
          default: de(() => [
            b(Jo, null, {
              default: de(() => [
                b(f2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": g[0] || (g[0] = (m) => o.value = m)
                }, {
                  default: de(() => [
                    b(ul, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: de(() => [
                        Ue("Import")
                      ]),
                      _: 1
                    }),
                    b(ul, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: de(() => [
                        Ue("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            b(Gi, null, {
              default: de(() => [
                b(x2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": g[2] || (g[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: de(() => [
                    b(Tc, null, {
                      default: de(() => [
                        k2,
                        b(r2, {
                          modelValue: s.value,
                          "onUpdate:modelValue": g[1] || (g[1] = (m) => s.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        b(Gi, null, {
                          default: de(() => [
                            Ue(" The import is limited to files in trivial graph format. Importing will "),
                            E2,
                            Ue(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    b(Tc, null, {
                      default: de(() => [
                        L2,
                        Ne("pre", null, Tn(n.graphAsTgf), 1),
                        b(Gi, null, {
                          default: de(() => [
                            Ue("This export action will "),
                            M2,
                            Ue(" the graph in trivial graph format to your clipboard.")
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
            b(ha, null, {
              default: de(() => [
                b(Ph),
                b(dt, {
                  color: "secondary",
                  variant: "text",
                  disabled: !a.value,
                  onClick: g[3] || (g[3] = (m) => f())
                }, {
                  default: de(() => [
                    Ue("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                b(dt, {
                  color: "secondary",
                  variant: "text",
                  onClick: g[4] || (g[4] = (m) => d())
                }, {
                  default: de(() => [
                    Ue("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        b(l2, {
          modelValue: l.value,
          "onUpdate:modelValue": g[5] || (g[5] = (m) => l.value = m),
          timeout: 1500
        }, {
          default: de(() => [
            Ue("Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), V2 = Q({
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
}, "VMenu"), I2 = ae()({
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
    } = hi(), o = It(), s = V(() => e.id || `v-menu-${o}`), l = ie(), a = Be(ll, null), u = ye(0);
    Dt(ll, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Dw(m, l.value.contentEl)) && (r.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var x, k, y;
      const p = m.relatedTarget, v = m.target;
      await He(), r.value && p !== v && ((x = l.value) != null && x.contentEl) && // We're the topmost menu
      ((k = l.value) != null && k.globalTop) && // It isn't the document or the menu body
      ![document, l.value.contentEl].includes(v) && // It isn't inside the menu body
      !l.value.contentEl.contains(v) && ((y = Kr(l.value.contentEl)[0]) == null || y.focus());
    }
    ce(r, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function f(m) {
      a == null || a.closeParents(m);
    }
    function d(m) {
      var p, v, x;
      e.disabled || m.key === "Tab" && (Ad(Kr((p = l.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (y) => y.tabIndex >= 0) || (r.value = !1, (x = (v = l.value) == null ? void 0 : v.activatorEl) == null || x.focus()));
    }
    function h(m) {
      var v;
      if (e.disabled)
        return;
      const p = (v = l.value) == null ? void 0 : v.contentEl;
      p && r.value ? m.key === "ArrowDown" ? (m.preventDefault(), Zs(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Zs(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (r.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const g = V(() => fe({
      "aria-haspopup": "menu",
      "aria-expanded": String(r.value),
      "aria-owns": s.value,
      onKeydown: h
    }, e.activatorProps));
    return we(() => {
      const m = _n.filterProps(e);
      return b(_n, fe({
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
          for (var p = arguments.length, v = new Array(p), x = 0; x < p; x++)
            v[x] = arguments[x];
          return b(Ke, {
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
}), Fh = Symbol.for("vuetify:selection-control-group"), Bh = Q({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Pe,
  trueIcon: Pe,
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
  ...Ee(),
  ...jt(),
  ...je()
}, "SelectionControlGroup"), $2 = Q({
  ...Bh({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ae()({
  name: "VSelectionControlGroup",
  props: $2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = De(e, "modelValue"), i = It(), o = V(() => e.id || `v-selection-control-group-${i}`), s = V(() => e.name || o.value), l = /* @__PURE__ */ new Set();
    return Dt(Fh, {
      modelValue: r,
      forceUpdate: () => {
        l.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        l.add(a), mt(() => {
          l.delete(a);
        });
      }
    }), _r({
      [e.defaultsTarget]: {
        color: be(e, "color"),
        disabled: be(e, "disabled"),
        density: be(e, "density"),
        error: be(e, "error"),
        inline: be(e, "inline"),
        modelValue: r,
        multiple: V(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)),
        name: s,
        falseIcon: be(e, "falseIcon"),
        trueIcon: be(e, "trueIcon"),
        readonly: be(e, "readonly"),
        ripple: be(e, "ripple"),
        type: be(e, "type"),
        valueComparator: be(e, "valueComparator")
      }
    }), we(() => {
      var a;
      return b("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
});
const Dh = Q({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Ee(),
  ...Bh()
}, "VSelectionControl");
function P2(e) {
  const t = Be(Fh, void 0), {
    densityClasses: n
  } = en(e), r = De(e, "modelValue"), i = V(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = V(() => e.falseValue !== void 0 ? e.falseValue : !1), s = V(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)), l = V({
    get() {
      const h = t ? t.modelValue.value : r.value;
      return s.value ? Yt(h).some((g) => e.valueComparator(g, i.value)) : e.valueComparator(h, i.value);
    },
    set(h) {
      if (e.readonly)
        return;
      const g = h ? i.value : o.value;
      let m = g;
      s.value && (m = h ? [...Yt(r.value), g] : Yt(r.value).filter((p) => !e.valueComparator(p, i.value))), t ? t.modelValue.value = m : r.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = bn(V(() => {
    if (!(e.error || e.disabled))
      return l.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = Wn(V(() => l.value && !e.error && !e.disabled ? e.color : void 0)), d = V(() => l.value ? e.trueIcon : e.falseIcon);
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
const Vc = ae()({
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
    } = P2(e), h = It(), g = ye(!1), m = ye(!1), p = ie(), v = V(() => e.id || `input-${h}`), x = V(() => !e.disabled && !e.readonly);
    i == null || i.onForceUpdate(() => {
      p.value && (p.value.checked = l.value);
    });
    function k(E) {
      x.value && (g.value = !0, Rd(E.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function y() {
      g.value = !1, m.value = !1;
    }
    function S(E) {
      E.stopPropagation();
    }
    function M(E) {
      x.value && (e.readonly && i && He(() => i.forceUpdate()), l.value = E.target.checked);
    }
    return we(() => {
      var D, $;
      const E = r.label ? r.label({
        label: e.label,
        props: {
          for: v.value
        }
      }) : e.label, [I, A] = Xl(n), N = b("input", fe({
        ref: p,
        checked: l.value,
        disabled: !!e.disabled,
        id: v.value,
        onBlur: y,
        onFocus: k,
        onInput: M,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: d.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? l.value : void 0
      }, A), null);
      return b("div", fe({
        class: ["v-selection-control", {
          "v-selection-control--dirty": l.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": m.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, I, {
        style: e.style
      }), [b("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(D = r.default) == null ? void 0 : D.call(r, {
        backgroundColorClasses: c,
        backgroundColorStyles: f
      }), ht(b("div", {
        class: ["v-selection-control__input"]
      }, [(($ = r.input) == null ? void 0 : $.call(r, {
        model: l,
        textColorClasses: a,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: f,
        inputNode: N,
        icon: s.value,
        props: {
          onFocus: k,
          onBlur: y,
          id: v.value
        }
      })) ?? b(ke, null, [s.value && b(Xe, {
        key: "icon",
        icon: s.value
      }, null), N])]), [[qn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), E && b(Mh, {
        for: v.value,
        onClick: S
      }, {
        default: () => [E]
      })]);
    }), {
      isFocused: g,
      input: p
    };
  }
}), A2 = Q({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...pa(),
  ...Dh()
}, "VSwitch"), Ai = ae()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: A2(),
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
    } = va(e), c = ie(), f = V(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = It(), h = V(() => e.id || `switch-${d}`);
    function g() {
      i.value && (i.value = !1);
    }
    function m(p) {
      var v, x;
      p.stopPropagation(), p.preventDefault(), (x = (v = c.value) == null ? void 0 : v.input) == null || x.click();
    }
    return we(() => {
      const [p, v] = Xl(n), x = _o.filterProps(e), k = Vc.filterProps(e);
      return b(_o, fe({
        class: ["v-switch", {
          "v-switch--flat": e.flat
        }, {
          "v-switch--inset": e.inset
        }, {
          "v-switch--indeterminate": i.value
        }, s.value, e.class]
      }, p, x, {
        modelValue: o.value,
        "onUpdate:modelValue": (y) => o.value = y,
        id: h.value,
        focused: l.value,
        style: e.style
      }), {
        ...r,
        default: (y) => {
          let {
            id: S,
            messagesId: M,
            isDisabled: E,
            isReadonly: I,
            isValid: A
          } = y;
          const N = {
            model: o,
            isValid: A
          };
          return b(Vc, fe({
            ref: c
          }, k, {
            modelValue: o.value,
            "onUpdate:modelValue": [(D) => o.value = D, g],
            id: S.value,
            "aria-describedby": M.value,
            type: "checkbox",
            "aria-checked": i.value ? "mixed" : void 0,
            disabled: E.value,
            readonly: I.value,
            onFocus: a,
            onBlur: u
          }, v), {
            ...r,
            default: (D) => {
              let {
                backgroundColorClasses: $,
                backgroundColorStyles: R
              } = D;
              return b("div", {
                class: ["v-switch__track", ...$.value],
                style: R.value,
                onClick: m
              }, [r["track-true"] && b("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [r["track-true"](N)]), r["track-false"] && b("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [r["track-false"](N)])]);
            },
            input: (D) => {
              let {
                inputNode: $,
                icon: R,
                backgroundColorClasses: C,
                backgroundColorStyles: O
              } = D;
              return b(ke, null, [$, b("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": R || e.loading
                }, e.inset ? void 0 : C.value],
                style: e.inset ? void 0 : O.value
              }, [r.thumb ? b(Ke, {
                defaults: {
                  VIcon: {
                    icon: R,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [r.thumb({
                  ...N,
                  icon: R
                })]
              }) : b(c_, null, {
                default: () => [e.loading ? b(aa, {
                  name: "v-switch",
                  active: !0,
                  color: A.value === !1 ? void 0 : f.value
                }, {
                  default: (T) => r.loader ? r.loader(T) : b(Xd, {
                    active: T.isActive,
                    color: T.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : R && b(Xe, {
                  key: String(R),
                  icon: R,
                  size: "x-small"
                }, null)]
              })])]);
            }
          });
        }
      });
    }), {};
  }
}), R2 = /* @__PURE__ */ wr({
  __name: "GraphSettings",
  props: {
    nodeLabelsEnabled: {},
    linkLabelsEnabled: {},
    physicsEnabled: {},
    fixedLinkDistanceEnabled: {}
  },
  emits: [
    "toggle-node-physics",
    "toggle-node-labels",
    "toggle-link-labels",
    "toggle-fixed-link-distance"
  ],
  setup(e, { emit: t }) {
    const n = e, r = ie(!1), i = t, o = V({
      get: () => n.nodeLabelsEnabled,
      set: (u) => {
        i("toggle-node-labels", u);
      }
    }), s = V({
      get: () => n.physicsEnabled,
      set: (u) => {
        i("toggle-node-physics", u);
      }
    }), l = V({
      get: () => n.linkLabelsEnabled,
      set: (u) => {
        i("toggle-link-labels", u);
      }
    }), a = V({
      get: () => n.fixedLinkDistanceEnabled,
      set: (u) => {
        i("toggle-fixed-link-distance", u);
      }
    });
    return (u, c) => (zn(), Vo(I2, {
      modelValue: r.value,
      "onUpdate:modelValue": c[4] || (c[4] = (f) => r.value = f),
      "close-on-content-click": !1,
      transition: "slide-y-transition"
    }, {
      activator: de(({ props: f }) => [
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: de(({ props: d }) => [
            b(dt, fe({
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
        b(ga, null, {
          default: de(() => [
            b(Jo, null, {
              default: de(() => [
                Ue(" Settings ")
              ]),
              _: 1
            }),
            b(il, null, {
              default: de(() => [
                Ue("Nodes")
              ]),
              _: 1
            }),
            b(Mc, null, {
              default: de(() => [
                b(Ai, {
                  modelValue: o.value,
                  "onUpdate:modelValue": c[0] || (c[0] = (f) => o.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                b(Ai, {
                  modelValue: s.value,
                  "onUpdate:modelValue": c[1] || (c[1] = (f) => s.value = f),
                  color: "secondary",
                  label: "Physics"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            b(il, null, {
              default: de(() => [
                Ue("Links")
              ]),
              _: 1
            }),
            b(Mc, null, {
              default: de(() => [
                b(Ai, {
                  modelValue: l.value,
                  "onUpdate:modelValue": c[2] || (c[2] = (f) => l.value = f),
                  color: "secondary",
                  label: "Labels"
                }, null, 8, ["modelValue"]),
                b(Ai, {
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
}), N2 = Q({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Ee(),
  ...jt(),
  ...rt(),
  ...je()
}, "VTable"), O2 = ae()({
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
    } = en(e);
    return we(() => b(e.tag, {
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
        return [(s = n.top) == null ? void 0 : s.call(n), n.default ? b("div", {
          class: "v-table__wrapper",
          style: {
            height: me(e.height)
          }
        }, [b("table", null, [n.default()])]) : (l = n.wrapper) == null ? void 0 : l.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), F2 = { class: "text-left" }, B2 = { class: "text-left" }, D2 = { class: "text-left" }, H2 = /* @__PURE__ */ wr({
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
    return (i, o) => (zn(), Vo(Eh, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (s) => n.value = s),
      "max-width": "800px"
    }, {
      activator: de(({ props: s }) => [
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: de(({ props: l }) => [
            b(dt, fe({
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
        b(ga, null, {
          default: de(() => [
            b(Jo, { class: "card-header" }, {
              default: de(() => [
                Ue("Controls")
              ]),
              _: 1
            }),
            b(O2, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: de(() => [
                Ne("thead", null, [
                  Ne("tr", null, [
                    Ne("th", F2, Tn(r[0]), 1),
                    Ne("th", B2, Tn(r[1]), 1),
                    Ne("th", D2, Tn(r[2]), 1)
                  ])
                ]),
                Ne("tbody", null, [
                  (zn(), Fs(ke, null, sm(t, (s) => Ne("tr", {
                    key: s.action
                  }, [
                    Ne("td", null, Tn(s.action), 1),
                    Ne("td", null, Tn(s.desktop), 1),
                    Ne("td", null, Tn(s.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            b(ha, null, {
              default: de(() => [
                b(Ph),
                b(dt, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (s) => n.value = !1)
                }, {
                  default: de(() => [
                    Ue(" Close ")
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
}), z2 = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, j2 = /* @__PURE__ */ z2(H2, [["__scopeId", "data-v-6c8401af"]]), W2 = /* @__PURE__ */ Ne("div", { class: "graph-host" }, null, -1), U2 = {
  key: 0,
  class: "button-container"
}, G2 = { class: "info-text text-h5 text-grey" }, q2 = /* @__PURE__ */ wr({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = V(() => Nt(".graph-host"));
    Cn(() => {
      I(), window.addEventListener("resize", ot);
    }), $l(() => {
      window.removeEventListener("resize", ot);
    });
    const r = ie(new Tu()), i = ie(!1), o = Tt(tw);
    let s, l = 400, a = 400, u, c, f, d, h, g, m, p, v, x = 0, k = 0, y = 1;
    t({ getGraph: S, setGraph: M, printGraph: E });
    function S() {
      return r.value.toTGF(o.showNodeLabels, o.showLinkLabels);
    }
    function M(z) {
      z !== "Graph is empty" && _t(z);
    }
    function E() {
      console.log(r.value.toTGF(o.showNodeLabels, o.showLinkLabels));
    }
    function I() {
      l = n.value.node().clientWidth, a = n.value.node().clientHeight, u = Hy((z) => A(z)), f = jy(
        n.value,
        u,
        (z) => j(z),
        (z) => K(z),
        (z) => {
          D(yt(z, f.node())[0], yt(z, f.node())[1]);
        }
      ), Gy(f, o), g = qy(f), d = Wy(f), h = Uy(f), s = Yy(r.value, o, l, a, () => $()), c = zy(s, l, a, o.nodeRadius), F();
    }
    function A(z) {
      x = z.transform.x, k = z.transform.y, y = z.transform.k, f.attr("transform", `translate(${x},${k})scale(${y})`);
    }
    function N(z, w, _) {
      r.value.createLink(z.id, w.id, _), F();
    }
    function D(z, w, _, L) {
      r.value.createNode(z ?? l / 2, w ?? a / 2, _, L), i.value = !0, F();
    }
    function $() {
      h.attr("transform", (z) => `translate(${z.x},${z.y})`), d.selectAll("path").attr("d", (z) => R(z)), B(), F();
    }
    function R(z) {
      switch (C(z), z.pathType) {
        case at.REFLEXIVE:
          return Au(z.source, [l / 2, a / 2], o);
        case at.ARC:
          return ps(z.source, z.target, o);
        case at.ARCREVERSE:
          return Nu.reverse(ps(z.source, z.target, o));
        case at.LINE:
          return vs(z.source, z.target, o);
        case at.LINEREVERSE:
          return Nu.reverse(vs(z.source, z.target, o));
        default:
          return "";
      }
    }
    function C(z) {
      z.source.id === z.target.id ? z.pathType = at.REFLEXIVE : O(z.source, z.target) ? z.pathType = T(z.source, z.target) ? at.ARCREVERSE : at.ARC : z.pathType = T(z.source, z.target) ? at.LINEREVERSE : at.LINE;
    }
    function O(z, w) {
      return z.id !== w.id && r.value.links.some((_) => _.target.id === z.id && _.source.id === w.id) && r.value.links.some((_) => _.target.id === w.id && _.source.id === z.id);
    }
    function T(z, w) {
      return z.x > w.x;
    }
    function B() {
      const z = m;
      if (z !== void 0) {
        const w = p;
        if (w !== void 0)
          g.attr("d", () => z.id === w.id ? Au(z, [l / 2, a / 2], o) : O(z, w) ? vs(z, w, o) : ps(z, w, o));
        else if (v !== void 0) {
          const _ = [z.x, z.y];
          g.attr("d", Ru(_, v));
        }
      }
    }
    function F(z = 0.5) {
      d = d.data(r.value.links, (w) => w.id).join(
        (w) => {
          const _ = w.append("g");
          return _.append("path").classed("link", !0).attr("id", (L) => L.id).attr("marker-end", "url(#link-arrow)"), _.append("path").classed("clickbox", !0).on("pointerdown", (L, P) => {
            L.button === 1 && (Pn(L), r.value.removeLink(P), F());
          }), _.append("text").append("textPath").attr(
            "class",
            (L) => L.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (L) => `#${L.id}`).attr("startOffset", "50%").text((L) => L.label ? L.label : "add label").on("click", (L, P) => {
            te(L, P);
          }), _;
        },
        (w) => (w.selectChild("path").attr(
          "marker-start",
          (_) => {
            var L;
            return (L = _.pathType) != null && L.includes("REVERSE") ? "url(#link-arrow-reverse)" : null;
          }
        ).attr(
          "marker-end",
          (_) => {
            var L;
            return (L = _.pathType) != null && L.includes("REVERSE") ? null : "url(#link-arrow)";
          }
        ), w.selectChild("text").attr("class", (_) => {
          var L;
          return `${(L = _.pathType) == null ? void 0 : L.toLowerCase()}-path-text`;
        }).attr("dy", (_) => {
          var L;
          return _.pathType === at.REFLEXIVE ? 15 : _.pathType == at.LINEREVERSE ? -10 : (L = _.pathType) != null && L.includes("REVERSE") ? 20 : -10;
        }), w.selectChild("text").selectChild("textPath").classed("hidden", !o.showLinkLabels).attr("startOffset", (_) => {
          var L;
          return (L = _.pathType) != null && L.includes("REVERSE") ? "46%" : "50%";
        }), w)
      ), h = h.data(r.value.nodes, (w) => w.id).join(
        (w) => {
          const _ = w.append("g").call(c).on("pointerdown", (L, P) => {
            L.button === 1 && (Pn(L), r.value.removeNode(P), i.value = r.value.nodes.length > 0, Re(), F());
          });
          return _.append("circle").classed("node", !0).attr("r", o.nodeRadius).on("mouseenter", (L, P) => p = P).on("mouseout", () => p = void 0).on("pointerdown", (L, P) => {
            q(L, P);
          }).on("pointerup", (L) => {
            K(L);
          }), _.append("text").attr(
            "class",
            (L) => L.label ? "node-label" : "node-label-placeholder"
          ).text((L) => L.label !== void 0 ? L.label : "add label").attr("dy", "0.33em").on("click", (L, P) => {
            Z(L, P);
          }).on("mouseenter", (L, P) => p = P).on("mouseout", () => p = void 0), _;
        },
        (w) => (w.selectChild("text").classed("hidden", !o.showNodeLabels), w)
      ), s.nodes(r.value.nodes), s.alpha(z).restart();
    }
    function q(z, w) {
      if (z.button !== 0)
        return;
      Pn(z);
      const _ = [w.x, w.y];
      v = _, m = w, g.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Ru(_, _)), F();
    }
    function K(z) {
      const w = m, _ = p;
      Re(), !(w === void 0 || _ === void 0) && (Pn(z), N(w, _));
    }
    function j(z) {
      if (Pn(z), m !== void 0) {
        const w = n1(z, n.value.node())[0], _ = [
          (w[0] - x) / y,
          (w[1] - k) / y
        ];
        z.pointerType === "touch" && (_[1] = _[1] - 4 * o.nodeRadius, p = r.value.nodes.find(
          (L) => Math.sqrt(Math.pow(L.x - _[0], 2) + Math.pow(L.y - _[1], 2)) < o.nodeRadius
        )), v = _, B();
      }
    }
    function Z(z, w) {
      const _ = z == null ? void 0 : z.target;
      ue(w, _, [w.x, w.y]);
    }
    function te(z, w) {
      const _ = z.target;
      let L = Ce(_);
      ue(w, _, L);
    }
    function ue(z, w, _) {
      var G;
      let L = z instanceof _d ? "node" : "link";
      const P = document.createElement("input");
      P.setAttribute("class", "label-input"), z.label == null ? P.value = "" : P.value = z.label, P.placeholder = `Enter ${L} label`;
      let H = !1;
      P.onkeyup = function(Y) {
        Y.key === "Enter" ? (H = !0, P.blur()) : Y.key === "Escape" && (P.value = "", P.blur());
      }, P.onblur = function() {
        H && (P.value === "" ? (w.setAttribute("class", `${L}-label-placeholder`), w.textContent = "add label", z.label = void 0) : (w.setAttribute("class", `${L}-label`), w.textContent = P.value.trim(), z.label = w.textContent)), W.remove();
      };
      const W = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      W.setAttribute("width", "100%"), W.setAttribute("height", "100%"), W.setAttribute("x", `${_[0] - 80}`), W.setAttribute("y", `${_[1] - 12}`), W.append(P);
      const X = w.closest("svg");
      (G = X == null ? void 0 : X.querySelector("g")) == null || G.append(W), P.focus();
    }
    function Ce(z) {
      let w = z.getBoundingClientRect(), _ = (w.x - x) / y, L = (w.y - k) / y;
      return [_, L];
    }
    function he(z) {
      o.nodePhysicsEnabled = z, xd(s, z, l, a);
    }
    function xe(z) {
      o.fixedLinkDistanceEnabled = z, Cd(s, r.value, o, z);
    }
    function Re() {
      g == null || g.classed("hidden", !0).attr("marker-end", "null"), m = void 0, p = void 0, v = void 0;
    }
    function _t(z) {
      let [w, _] = Vw(z);
      rn();
      for (let P of w)
        D(void 0, void 0, P.idImported, P.label);
      const L = (P) => r.value.nodes.find((H) => H.idImported === P);
      for (let P of _) {
        let H = L(P.sourceIdImported), W = L(P.targetIdImported);
        H && W && N(H, W, P.label);
      }
    }
    function ot() {
      s.stop(), n.value.selectChildren().remove(), u = void 0, x = 0, k = 0, y = 1, f = void 0, g = void 0, d = void 0, h = void 0, s = void 0, Re(), I();
    }
    function rn() {
      r.value = new Tu(), i.value = !1, ot();
    }
    return (z, w) => (zn(), Fs(ke, null, [
      W2,
      o.hasToolbar ? (zn(), Fs("div", U2, [
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: de(({ props: _ }) => [
            b(dt, fe({
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, _, {
              variant: "plain",
              onClick: w[0] || (w[0] = (L) => D())
            }), null, 16)
          ]),
          _: 1
        }),
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: de(({ props: _ }) => [
            b(dt, fe({
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, _, {
              variant: "plain",
              onClick: w[1] || (w[1] = (L) => rn())
            }), null, 16)
          ]),
          _: 1
        }),
        b(cr, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: de(({ props: _ }) => [
            b(dt, fe({
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, _, {
              variant: "plain",
              onClick: w[2] || (w[2] = (L) => ot())
            }), null, 16)
          ]),
          _: 1
        }),
        b(T2, {
          "graph-as-tgf": r.value.toTGF(o.showNodeLabels, o.showLinkLabels),
          onFileImported: _t
        }, null, 8, ["graph-as-tgf"]),
        b(j2),
        b(R2, {
          "node-labels-enabled": o.showNodeLabels,
          "link-labels-enabled": o.showLinkLabels,
          "physics-enabled": o.nodePhysicsEnabled,
          "fixed-link-distance-enabled": o.fixedLinkDistanceEnabled,
          onToggleNodePhysics: he,
          onToggleNodeLabels: w[3] || (w[3] = (_) => o.showNodeLabels = _),
          onToggleLinkLabels: w[4] || (w[4] = (_) => o.showLinkLabels = _),
          onToggleFixedLinkDistance: xe
        }, null, 8, ["node-labels-enabled", "link-labels-enabled", "physics-enabled", "fixed-link-distance-enabled"])
      ])) : Im("", !0),
      ht(Ne("div", G2, "Graph is empty", 512), [
        [Yn, !i.value]
      ])
    ], 64));
  }
}), cl = {
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
function Y2(e, t) {
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
function K2(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function X2(e) {
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
function Z2(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const J2 = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function jh(e) {
  if (e == null)
    return /* @__PURE__ */ new Date();
  if (e instanceof Date)
    return e;
  if (typeof e == "string") {
    let t;
    if (J2.test(e))
      return Z2(e);
    if (t = Date.parse(e), !isNaN(t))
      return new Date(t);
  }
  return null;
}
const Ic = new Date(2e3, 0, 2);
function Q2(e) {
  const t = cl[e.slice(-2).toUpperCase()];
  return Md(7).map((n) => {
    const r = new Date(Ic);
    return r.setDate(Ic.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(r);
  });
}
function ex(e, t, n, r) {
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
function tx(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), i = Hu(String(n.getMonth() + 1), 2, "0"), o = Hu(String(n.getDate()), 2, "0");
  return `${r}-${i}-${o}`;
}
function nx(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function rx(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function ix(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function ox(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function sx(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function lx(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function ax(e) {
  return e.getFullYear();
}
function ux(e) {
  return e.getMonth();
}
function cx(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function fx(e) {
  return e.getHours();
}
function dx(e) {
  return e.getMinutes();
}
function hx(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function gx(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function mx(e, t) {
  return fl(e, t[0]) && px(e, t[1]);
}
function vx(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function fl(e, t) {
  return e.getTime() > t.getTime();
}
function px(e, t) {
  return e.getTime() < t.getTime();
}
function $c(e, t) {
  return e.getTime() === t.getTime();
}
function yx(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function wx(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function bx(e, t, n) {
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
function _x(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function xx(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Cx(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Sx(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function kx(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Ex(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Lx {
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
    return tx(this, t);
  }
  parseISO(t) {
    return nx(t);
  }
  addMinutes(t, n) {
    return rx(t, n);
  }
  addHours(t, n) {
    return ix(t, n);
  }
  addDays(t, n) {
    return ox(t, n);
  }
  addWeeks(t, n) {
    return sx(t, n);
  }
  addMonths(t, n) {
    return lx(t, n);
  }
  getWeekArray(t) {
    return Y2(t, this.locale);
  }
  startOfWeek(t) {
    return K2(t);
  }
  endOfWeek(t) {
    return X2(t);
  }
  startOfMonth(t) {
    return Hh(t);
  }
  endOfMonth(t) {
    return zh(t);
  }
  format(t, n) {
    return ex(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return $c(t, n);
  }
  isValid(t) {
    return vx(t);
  }
  isWithinRange(t, n) {
    return mx(t, n);
  }
  isAfter(t, n) {
    return fl(t, n);
  }
  isBefore(t, n) {
    return !fl(t, n) && !$c(t, n);
  }
  isSameDay(t, n) {
    return yx(t, n);
  }
  isSameMonth(t, n) {
    return wx(t, n);
  }
  setMinutes(t, n) {
    return xx(t, n);
  }
  setHours(t, n) {
    return _x(t, n);
  }
  setMonth(t, n) {
    return Cx(t, n);
  }
  setYear(t, n) {
    return Sx(t, n);
  }
  getDiff(t, n, r) {
    return bx(t, n, r);
  }
  getWeekdays() {
    return Q2(this.locale);
  }
  getYear(t) {
    return ax(t);
  }
  getMonth(t) {
    return ux(t);
  }
  getNextMonth(t) {
    return cx(t);
  }
  getHours(t) {
    return fx(t);
  }
  getMinutes(t) {
    return dx(t);
  }
  startOfDay(t) {
    return kx(t);
  }
  endOfDay(t) {
    return Ex(t);
  }
  startOfYear(t) {
    return hx(t);
  }
  endOfYear(t) {
    return gx(t);
  }
}
const Mx = Symbol.for("vuetify:date-options"), Pc = Symbol.for("vuetify:date-adapter");
function Tx(e, t) {
  const n = ft({
    adapter: Lx,
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
    instance: Vx(n, t)
  };
}
function Vx(e, t) {
  const n = Tt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ce(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
const Ix = Symbol.for("vuetify:goto");
function $x() {
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
function Px(e, t) {
  return {
    rtl: t.isRtl,
    options: ft($x(), e)
  };
}
function Wh() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = ft(t, n), {
    aliases: i = {},
    components: o = {},
    directives: s = {}
  } = r, l = fb(r.defaults), a = T_(r.display, r.ssr), u = xb(r.theme), c = Ib(r.icons), f = Bb(r.locale), d = Tx(r.date, f), h = Px(r.goTo, f);
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
      if (u.install(m), m.provide(mr, l), m.provide(al, a), m.provide(mo, u), m.provide(el, c), m.provide(vo, f), m.provide(Mx, d.options), m.provide(Pc, d.instance), m.provide(Ix, h), Ve && r.ssr)
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
      It.reset(), m.mixin({
        computed: {
          $vuetify() {
            return Tt({
              defaults: er.call(this, mr),
              display: er.call(this, al),
              theme: er.call(this, mo),
              icons: er.call(this, el),
              locale: er.call(this, vo),
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
const Ax = "3.5.9";
Wh.version = Ax;
function er(e) {
  var r, i;
  const t = this.$, n = ((r = t.parent) == null ? void 0 : r.provides) ?? ((i = t.vnode.appContext) == null ? void 0 : i.provides);
  if (n && e in n)
    return n[e];
}
const Rx = {
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
}, Nx = {
  component: sa
};
var Ox = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Fx = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", Bx = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", Dx = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", Hx = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", zx = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
const jx = Wh({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...Rx,
      addNode: zx,
      deleteGraph: Fx,
      help: Dx,
      importExport: Bx,
      resetView: Hx,
      settings: Ox
    },
    sets: {
      mdi: Nx
    }
  }
});
customElements.define(
  "graph-editor",
  /* @__PURE__ */ wv(q2, { shadowRoot: !1, plugins: [jx] })
);
