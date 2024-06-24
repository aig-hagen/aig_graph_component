var mm = Object.defineProperty;
var gm = (e, t, n) => t in e ? mm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ye = (e, t, n) => gm(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Zs(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const Ae = {}, Li = [], Vt = () => {
}, ym = () => !1, ol = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Js = (e) => e.startsWith("onUpdate:"), Be = Object.assign, Qs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, pm = Object.prototype.hasOwnProperty, Ve = (e, t) => pm.call(e, t), pe = Array.isArray, Pi = (e) => ll(e) === "[object Map]", Pf = (e) => ll(e) === "[object Set]", Se = (e) => typeof e == "function", Fe = (e) => typeof e == "string", zi = (e) => typeof e == "symbol", Ie = (e) => e !== null && typeof e == "object", Tf = (e) => (Ie(e) || Se(e)) && Se(e.then) && Se(e.catch), Mf = Object.prototype.toString, ll = (e) => Mf.call(e), bm = (e) => ll(e).slice(8, -1), If = (e) => ll(e) === "[object Object]", ea = (e) => Fe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, sr = /* @__PURE__ */ Zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), sl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, wm = /-(\w)/g, lt = sl((e) => e.replace(wm, (t, n) => n ? n.toUpperCase() : "")), xm = /\B([A-Z])/g, Nt = sl(
  (e) => e.replace(xm, "-$1").toLowerCase()
), Sn = sl((e) => e.charAt(0).toUpperCase() + e.slice(1)), Nl = sl((e) => e ? `on${Sn(e)}` : ""), Dn = (e, t) => !Object.is(e, t), Rl = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Po = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, _m = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, as = (e) => {
  const t = Fe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let uu;
const Af = () => uu || (uu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ta(e) {
  if (pe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = Fe(i) ? Em(i) : ta(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Fe(e) || Ie(e))
    return e;
}
const Sm = /;(?![^(]*\))/g, Cm = /:([^]+)/, km = /\/\*[^]*?\*\//g;
function Em(e) {
  const t = {};
  return e.replace(km, "").split(Sm).forEach((n) => {
    if (n) {
      const i = n.split(Cm);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function na(e) {
  let t = "";
  if (Fe(e))
    t = e;
  else if (pe(e))
    for (let n = 0; n < e.length; n++) {
      const i = na(e[n]);
      i && (t += i + " ");
    }
  else if (Ie(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Vm = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Lm = /* @__PURE__ */ Zs(Vm);
function $f(e) {
  return !!e || e === "";
}
const Xn = (e) => Fe(e) ? e : e == null ? "" : pe(e) || Ie(e) && (e.toString === Mf || !Se(e.toString)) ? JSON.stringify(e, Nf, 2) : String(e), Nf = (e, t) => t && t.__v_isRef ? Nf(e, t.value) : Pi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[Ol(i, o) + " =>"] = r, n),
    {}
  )
} : Pf(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ol(n))
} : zi(t) ? Ol(t) : Ie(t) && !pe(t) && !If(t) ? String(t) : t, Ol = (e, t = "") => {
  var n;
  return zi(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class Rf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = gt, !t && gt && (this.index = (gt.scopes || (gt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = gt;
      try {
        return gt = this, t();
      } finally {
        gt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    gt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    gt = this.parent;
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
function ia(e) {
  return new Rf(e);
}
function Pm(e, t = gt) {
  t && t.active && t.effects.push(e);
}
function Tm() {
  return gt;
}
function st(e) {
  gt && gt.cleanups.push(e);
}
let li;
class ra {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Pm(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, mi();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Mm(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), gi();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Bn, n = li;
    try {
      return Bn = !0, li = this, this._runnings++, cu(this), this.fn();
    } finally {
      fu(this), this._runnings--, li = n, Bn = t;
    }
  }
  stop() {
    var t;
    this.active && (cu(this), fu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Mm(e) {
  return e.value;
}
function cu(e) {
  e._trackId++, e._depsLength = 0;
}
function fu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Of(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Of(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Bn = !0, us = 0;
const Bf = [];
function mi() {
  Bf.push(Bn), Bn = !1;
}
function gi() {
  const e = Bf.pop();
  Bn = e === void 0 ? !0 : e;
}
function oa() {
  us++;
}
function la() {
  for (us--; !us && cs.length; )
    cs.shift()();
}
function Ff(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && Of(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const cs = [];
function Df(e, t, n) {
  oa();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && cs.push(i.scheduler)));
  }
  la();
}
const Hf = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, To = /* @__PURE__ */ new WeakMap(), si = Symbol(""), fs = Symbol("");
function ft(e, t, n) {
  if (Bn && li) {
    let i = To.get(e);
    i || To.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = Hf(() => i.delete(n))), Ff(
      li,
      r
    );
  }
}
function pn(e, t, n, i, r, o) {
  const l = To.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && pe(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !zi(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        pe(e) ? ea(n) && s.push(l.get("length")) : (s.push(l.get(si)), Pi(e) && s.push(l.get(fs)));
        break;
      case "delete":
        pe(e) || (s.push(l.get(si)), Pi(e) && s.push(l.get(fs)));
        break;
      case "set":
        Pi(e) && s.push(l.get(si));
        break;
    }
  oa();
  for (const a of s)
    a && Df(
      a,
      4
    );
  la();
}
function Im(e, t) {
  var n;
  return (n = To.get(e)) == null ? void 0 : n.get(t);
}
const Am = /* @__PURE__ */ Zs("__proto__,__v_isRef,__isVue"), zf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(zi)
), du = /* @__PURE__ */ $m();
function $m() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = be(this);
      for (let o = 0, l = this.length; o < l; o++)
        ft(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(be)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      mi(), oa();
      const i = be(this)[t].apply(this, n);
      return la(), gi(), i;
    };
  }), e;
}
function Nm(e) {
  const t = be(this);
  return ft(t, "has", e), t.hasOwnProperty(e);
}
class jf {
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
      return i === (r ? o ? Ym : qf : o ? Gf : Wf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = pe(t);
    if (!r) {
      if (l && Ve(du, n))
        return Reflect.get(du, n, i);
      if (n === "hasOwnProperty")
        return Nm;
    }
    const s = Reflect.get(t, n, i);
    return (zi(n) ? zf.has(n) : Am(n)) || (r || ft(t, "get", n), o) ? s : Ne(s) ? l && ea(n) ? s : s.value : Ie(s) ? r ? $r(s) : zt(s) : s;
  }
}
class Uf extends jf {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = Ri(o);
      if (!Mo(i) && !Ri(i) && (o = be(o), i = be(i)), !pe(t) && Ne(o) && !Ne(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = pe(t) && ea(n) ? Number(n) < t.length : Ve(t, n), s = Reflect.set(t, n, i, r);
    return t === be(r) && (l ? Dn(i, o) && pn(t, "set", n, i) : pn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Ve(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && pn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!zi(n) || !zf.has(n)) && ft(t, "has", n), i;
  }
  ownKeys(t) {
    return ft(
      t,
      "iterate",
      pe(t) ? "length" : si
    ), Reflect.ownKeys(t);
  }
}
class Rm extends jf {
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
const Om = /* @__PURE__ */ new Uf(), Bm = /* @__PURE__ */ new Rm(), Fm = /* @__PURE__ */ new Uf(
  !0
), sa = (e) => e, al = (e) => Reflect.getPrototypeOf(e);
function Xr(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = be(e), o = be(t);
  n || (Dn(t, o) && ft(r, "get", t), ft(r, "get", o));
  const { has: l } = al(r), s = i ? sa : n ? ca : vr;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function Zr(e, t = !1) {
  const n = this.__v_raw, i = be(n), r = be(e);
  return t || (Dn(e, r) && ft(i, "has", e), ft(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Jr(e, t = !1) {
  return e = e.__v_raw, !t && ft(be(e), "iterate", si), Reflect.get(e, "size", e);
}
function hu(e) {
  e = be(e);
  const t = be(this);
  return al(t).has.call(t, e) || (t.add(e), pn(t, "add", e, e)), this;
}
function vu(e, t) {
  t = be(t);
  const n = be(this), { has: i, get: r } = al(n);
  let o = i.call(n, e);
  o || (e = be(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? Dn(t, l) && pn(n, "set", e, t) : pn(n, "add", e, t), this;
}
function mu(e) {
  const t = be(this), { has: n, get: i } = al(t);
  let r = n.call(t, e);
  r || (e = be(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && pn(t, "delete", e, void 0), o;
}
function gu() {
  const e = be(this), t = e.size !== 0, n = e.clear();
  return t && pn(e, "clear", void 0, void 0), n;
}
function Qr(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = be(l), a = t ? sa : e ? ca : vr;
    return !e && ft(s, "iterate", si), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function eo(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = be(r), l = Pi(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? sa : t ? ca : vr;
    return !t && ft(
      o,
      "iterate",
      a ? fs : si
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
function Ln(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Dm() {
  const e = {
    get(o) {
      return Xr(this, o);
    },
    get size() {
      return Jr(this);
    },
    has: Zr,
    add: hu,
    set: vu,
    delete: mu,
    clear: gu,
    forEach: Qr(!1, !1)
  }, t = {
    get(o) {
      return Xr(this, o, !1, !0);
    },
    get size() {
      return Jr(this);
    },
    has: Zr,
    add: hu,
    set: vu,
    delete: mu,
    clear: gu,
    forEach: Qr(!1, !0)
  }, n = {
    get(o) {
      return Xr(this, o, !0);
    },
    get size() {
      return Jr(this, !0);
    },
    has(o) {
      return Zr.call(this, o, !0);
    },
    add: Ln("add"),
    set: Ln("set"),
    delete: Ln("delete"),
    clear: Ln("clear"),
    forEach: Qr(!0, !1)
  }, i = {
    get(o) {
      return Xr(this, o, !0, !0);
    },
    get size() {
      return Jr(this, !0);
    },
    has(o) {
      return Zr.call(this, o, !0);
    },
    add: Ln("add"),
    set: Ln("set"),
    delete: Ln("delete"),
    clear: Ln("clear"),
    forEach: Qr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = eo(
      o,
      !1,
      !1
    ), n[o] = eo(
      o,
      !0,
      !1
    ), t[o] = eo(
      o,
      !1,
      !0
    ), i[o] = eo(
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
  Hm,
  zm,
  jm,
  Um
] = /* @__PURE__ */ Dm();
function aa(e, t) {
  const n = t ? e ? Um : jm : e ? zm : Hm;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Ve(n, r) && r in i ? n : i,
    r,
    o
  );
}
const Wm = {
  get: /* @__PURE__ */ aa(!1, !1)
}, Gm = {
  get: /* @__PURE__ */ aa(!1, !0)
}, qm = {
  get: /* @__PURE__ */ aa(!0, !1)
}, Wf = /* @__PURE__ */ new WeakMap(), Gf = /* @__PURE__ */ new WeakMap(), qf = /* @__PURE__ */ new WeakMap(), Ym = /* @__PURE__ */ new WeakMap();
function Km(e) {
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
function Xm(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Km(bm(e));
}
function zt(e) {
  return Ri(e) ? e : ua(
    e,
    !1,
    Om,
    Wm,
    Wf
  );
}
function Zm(e) {
  return ua(
    e,
    !1,
    Fm,
    Gm,
    Gf
  );
}
function $r(e) {
  return ua(
    e,
    !0,
    Bm,
    qm,
    qf
  );
}
function ua(e, t, n, i, r) {
  if (!Ie(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = Xm(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Ti(e) {
  return Ri(e) ? Ti(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ri(e) {
  return !!(e && e.__v_isReadonly);
}
function Mo(e) {
  return !!(e && e.__v_isShallow);
}
function Yf(e) {
  return Ti(e) || Ri(e);
}
function be(e) {
  const t = e && e.__v_raw;
  return t ? be(t) : e;
}
function Kf(e) {
  return Object.isExtensible(e) && Po(e, "__v_skip", !0), e;
}
const vr = (e) => Ie(e) ? zt(e) : e, ca = (e) => Ie(e) ? $r(e) : e;
class Xf {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ra(
      () => t(this._value),
      () => yo(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = be(this);
    return (!t._cacheable || t.effect.dirty) && Dn(t._value, t._value = t.effect.run()) && yo(t, 4), Zf(t), t.effect._dirtyLevel >= 2 && yo(t, 2), t._value;
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
function Jm(e, t, n = !1) {
  let i, r;
  const o = Se(e);
  return o ? (i = e, r = Vt) : (i = e.get, r = e.set), new Xf(i, r, o || !r, n);
}
function Zf(e) {
  var t;
  Bn && li && (e = be(e), Ff(
    li,
    (t = e.dep) != null ? t : e.dep = Hf(
      () => e.dep = void 0,
      e instanceof Xf ? e : void 0
    )
  ));
}
function yo(e, t = 4, n) {
  e = be(e);
  const i = e.dep;
  i && Df(
    i,
    t
  );
}
function Ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function ne(e) {
  return Jf(e, !1);
}
function ge(e) {
  return Jf(e, !0);
}
function Jf(e, t) {
  return Ne(e) ? e : new Qm(e, t);
}
class Qm {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : be(t), this._value = n ? t : vr(t);
  }
  get value() {
    return Zf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mo(t) || Ri(t);
    t = n ? t : be(t), Dn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : vr(t), yo(this, 4));
  }
}
function Bt(e) {
  return Ne(e) ? e.value : e;
}
const eg = {
  get: (e, t, n) => Bt(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return Ne(r) && !Ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function Qf(e) {
  return Ti(e) ? e : new Proxy(e, eg);
}
function fa(e) {
  const t = pe(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ed(e, n);
  return t;
}
class tg {
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
    return Im(be(this._object), this._key);
  }
}
class ng {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function ae(e, t, n) {
  return Ne(e) ? e : Se(e) ? new ng(e) : Ie(e) && arguments.length > 1 ? ed(e, t, n) : ne(e);
}
function ed(e, t, n) {
  const i = e[t];
  return Ne(i) ? i : new tg(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Fn(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    ul(r, t, n);
  }
}
function Pt(e, t, n, i) {
  if (Se(e)) {
    const o = Fn(e, t, n, i);
    return o && Tf(o) && o.catch((l) => {
      ul(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Pt(e[o], t, n, i));
  return r;
}
function ul(e, t, n, i = !0) {
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
      Fn(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  ig(e, n, r, i);
}
function ig(e, t, n, i = !0) {
  console.error(e);
}
let mr = !1, ds = !1;
const Ze = [];
let tn = 0;
const Mi = [];
let In = null, Jn = 0;
const td = /* @__PURE__ */ Promise.resolve();
let da = null;
function De(e) {
  const t = da || td;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function rg(e) {
  let t = tn + 1, n = Ze.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = Ze[i], o = gr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function ha(e) {
  (!Ze.length || !Ze.includes(
    e,
    mr && e.allowRecurse ? tn + 1 : tn
  )) && (e.id == null ? Ze.push(e) : Ze.splice(rg(e.id), 0, e), nd());
}
function nd() {
  !mr && !ds && (ds = !0, da = td.then(rd));
}
function og(e) {
  const t = Ze.indexOf(e);
  t > tn && Ze.splice(t, 1);
}
function lg(e) {
  pe(e) ? Mi.push(...e) : (!In || !In.includes(
    e,
    e.allowRecurse ? Jn + 1 : Jn
  )) && Mi.push(e), nd();
}
function yu(e, t, n = mr ? tn + 1 : 0) {
  for (; n < Ze.length; n++) {
    const i = Ze[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      Ze.splice(n, 1), n--, i();
    }
  }
}
function id(e) {
  if (Mi.length) {
    const t = [...new Set(Mi)].sort(
      (n, i) => gr(n) - gr(i)
    );
    if (Mi.length = 0, In) {
      In.push(...t);
      return;
    }
    for (In = t, Jn = 0; Jn < In.length; Jn++)
      In[Jn]();
    In = null, Jn = 0;
  }
}
const gr = (e) => e.id == null ? 1 / 0 : e.id, sg = (e, t) => {
  const n = gr(e) - gr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function rd(e) {
  ds = !1, mr = !0, Ze.sort(sg);
  try {
    for (tn = 0; tn < Ze.length; tn++) {
      const t = Ze[tn];
      t && t.active !== !1 && Fn(t, null, 14);
    }
  } finally {
    tn = 0, Ze.length = 0, id(), mr = !1, da = null, (Ze.length || Mi.length) && rd();
  }
}
function ag(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || Ae;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = i[c] || Ae;
    f && (r = n.map((h) => Fe(h) ? h.trim() : h)), d && (r = n.map(_m));
  }
  let s, a = i[s = Nl(t)] || // also try camelCase event handler (#2249)
  i[s = Nl(lt(t))];
  !a && o && (a = i[s = Nl(Nt(t))]), a && Pt(
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
    e.emitted[s] = !0, Pt(
      u,
      e,
      6,
      r
    );
  }
}
function od(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Se(e)) {
    const a = (u) => {
      const c = od(u, t, !0);
      c && (s = !0, Be(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Ie(e) && i.set(e, null), null) : (pe(o) ? o.forEach((a) => l[a] = null) : Be(l, o), Ie(e) && i.set(e, l), l);
}
function cl(e, t) {
  return !e || !ol(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ve(e, t[0].toLowerCase() + t.slice(1)) || Ve(e, Nt(t)) || Ve(e, t));
}
let rt = null, ld = null;
function Io(e) {
  const t = rt;
  return rt = e, ld = e && e.type.__scopeId || null, t;
}
function fe(e, t = rt, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && Mu(-1);
    const o = Io(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Io(o), i._d && Mu(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function Bl(e) {
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
  const w = Io(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, x = b;
      p = en(
        c.call(
          x,
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
      p = en(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? a : ug(a);
    }
  } catch (b) {
    fr.length = 0, ul(b, e, 1), p = y(Tt);
  }
  let _ = p;
  if (g && m !== !1) {
    const b = Object.keys(g), { shapeFlag: x } = _;
    b.length && x & 7 && (l && b.some(Js) && (g = cg(
      g,
      l
    )), _ = bn(_, g));
  }
  return n.dirs && (_ = bn(_), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition && (_.transition = n.transition), p = _, Io(w), p;
}
const ug = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ol(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, cg = (e, t) => {
  const n = {};
  for (const i in e)
    (!Js(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function fg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? pu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== i[f] && !cl(u, f))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? pu(i, l, u) : !0 : !!l;
  return !1;
}
function pu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !cl(n, o))
      return !0;
  }
  return !1;
}
function dg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const sd = "components", hg = "directives", vg = Symbol.for("v-ndc");
function mg(e) {
  return Fe(e) && ad(sd, e, !1) || e;
}
function jt(e) {
  return ad(hg, e);
}
function ad(e, t, n = !0, i = !1) {
  const r = rt || Ke;
  if (r) {
    const o = r.type;
    if (e === sd) {
      const s = u0(
        o,
        !1
      );
      if (s && (s === t || s === lt(t) || s === Sn(lt(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      bu(r[e] || o[e], t) || // global registration
      bu(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function bu(e, t) {
  return e && (e[t] || e[lt(t)] || e[Sn(lt(t))]);
}
const gg = (e) => e.__isSuspense;
function yg(e, t) {
  t && t.pendingBranch ? pe(e) ? t.effects.push(...e) : t.effects.push(e) : lg(e);
}
const pg = Symbol.for("v-scx"), bg = () => $e(pg);
function ln(e, t) {
  return va(e, null, t);
}
const to = {};
function ye(e, t, n) {
  return va(e, t, n);
}
function va(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = Ae) {
  if (t && o) {
    const V = t;
    t = (...C) => {
      V(...C), x();
    };
  }
  const a = Ke, u = (V) => i === !0 ? V : (
    // for deep: false, only traverse root-level properties
    ti(V, i === !1 ? 1 : void 0)
  );
  let c, d = !1, f = !1;
  if (Ne(e) ? (c = () => e.value, d = Mo(e)) : Ti(e) ? (c = () => u(e), d = !0) : pe(e) ? (f = !0, d = e.some((V) => Ti(V) || Mo(V)), c = () => e.map((V) => {
    if (Ne(V))
      return V.value;
    if (Ti(V))
      return u(V);
    if (Se(V))
      return Fn(V, a, 2);
  })) : Se(e) ? t ? c = () => Fn(e, a, 2) : c = () => (h && h(), Pt(
    e,
    a,
    3,
    [v]
  )) : c = Vt, t && i) {
    const V = c;
    c = () => ti(V());
  }
  let h, v = (V) => {
    h = _.onStop = () => {
      Fn(V, a, 4), h = _.onStop = void 0;
    };
  }, m;
  if (gl)
    if (v = Vt, t ? n && Pt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const V = bg();
      m = V.__watcherHandles || (V.__watcherHandles = []);
    } else
      return Vt;
  let p = f ? new Array(e.length).fill(to) : to;
  const g = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const V = _.run();
        (i || d || (f ? V.some((C, T) => Dn(C, p[T])) : Dn(V, p))) && (h && h(), Pt(t, a, 3, [
          V,
          // pass undefined as the old value when it's changed for the first time
          p === to ? void 0 : f && p[0] === to ? [] : p,
          v
        ]), p = V);
      } else
        _.run();
  };
  g.allowRecurse = !!t;
  let w;
  r === "sync" ? w = g : r === "post" ? w = () => ut(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), w = () => ha(g));
  const _ = new ra(c, Vt, w), b = Tm(), x = () => {
    _.stop(), b && Qs(b.effects, _);
  };
  return t ? n ? g() : p = _.run() : r === "post" ? ut(
    _.run.bind(_),
    a && a.suspense
  ) : _.run(), m && m.push(x), x;
}
function wg(e, t, n) {
  const i = this.proxy, r = Fe(e) ? e.includes(".") ? ud(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Se(t) ? o = t : (o = t.handler, n = t);
  const l = Rr(this), s = va(r, o.bind(i), n);
  return l(), s;
}
function ud(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function ti(e, t, n = 0, i) {
  if (!Ie(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), Ne(e))
    ti(e.value, t, n, i);
  else if (pe(e))
    for (let r = 0; r < e.length; r++)
      ti(e[r], t, n, i);
  else if (Pf(e) || Pi(e))
    e.forEach((r) => {
      ti(r, t, n, i);
    });
  else if (If(e))
    for (const r in e)
      ti(e[r], t, n, i);
  return e;
}
function We(e, t) {
  if (rt === null)
    return e;
  const n = yl(rt) || rt.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = Ae] = t[r];
    o && (Se(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ti(l), i.push({
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
function Gn(e, t, n, i) {
  const r = e.dirs, o = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    o && (s.oldValue = o[l].value);
    let a = s.dir[i];
    a && (mi(), Pt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), gi());
  }
}
const An = Symbol("_leaveCb"), no = Symbol("_enterCb");
function cd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Ut(() => {
    e.isMounted = !0;
  }), Wt(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ct = [Function, Array], fd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ct,
  onEnter: Ct,
  onAfterEnter: Ct,
  onEnterCancelled: Ct,
  // leave
  onBeforeLeave: Ct,
  onLeave: Ct,
  onAfterLeave: Ct,
  onLeaveCancelled: Ct,
  // appear
  onBeforeAppear: Ct,
  onAppear: Ct,
  onAfterAppear: Ct,
  onAppearCancelled: Ct
}, xg = {
  name: "BaseTransition",
  props: fd,
  setup(e, { slots: t }) {
    const n = wa(), i = cd();
    return () => {
      const r = t.default && ma(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const f of r)
          if (f.type !== Tt) {
            o = f;
            break;
          }
      }
      const l = be(e), { mode: s } = l;
      if (i.isLeaving)
        return Fl(o);
      const a = wu(o);
      if (!a)
        return Fl(o);
      const u = yr(
        a,
        l,
        i,
        n
      );
      pr(a, u);
      const c = n.subTree, d = c && wu(c);
      if (d && d.type !== Tt && !Qn(a, d)) {
        const f = yr(
          d,
          l,
          i,
          n
        );
        if (pr(d, f), s === "out-in")
          return i.isLeaving = !0, f.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, Fl(o);
        s === "in-out" && a.type !== Tt && (f.delayLeave = (h, v, m) => {
          const p = dd(
            i,
            d
          );
          p[String(d.key)] = d, h[An] = () => {
            v(), h[An] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, _g = xg;
function dd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function yr(e, t, n, i) {
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
  } = t, _ = String(e.key), b = dd(n, e), x = (T, $) => {
    T && Pt(
      T,
      i,
      9,
      $
    );
  }, V = (T, $) => {
    const R = $[1];
    x(T, $), pe(T) ? T.every((j) => j.length <= 1) && R() : T.length <= 1 && R();
  }, C = {
    mode: o,
    persisted: l,
    beforeEnter(T) {
      let $ = s;
      if (!n.isMounted)
        if (r)
          $ = m || s;
        else
          return;
      T[An] && T[An](
        !0
        /* cancelled */
      );
      const R = b[_];
      R && Qn(e, R) && R.el[An] && R.el[An](), x($, [T]);
    },
    enter(T) {
      let $ = a, R = u, j = c;
      if (!n.isMounted)
        if (r)
          $ = p || a, R = g || u, j = w || c;
        else
          return;
      let L = !1;
      const N = T[no] = (S) => {
        L || (L = !0, S ? x(j, [T]) : x(R, [T]), C.delayedLeave && C.delayedLeave(), T[no] = void 0);
      };
      $ ? V($, [T, N]) : N();
    },
    leave(T, $) {
      const R = String(e.key);
      if (T[no] && T[no](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      x(d, [T]);
      let j = !1;
      const L = T[An] = (N) => {
        j || (j = !0, $(), N ? x(v, [T]) : x(h, [T]), T[An] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, f ? V(f, [T, L]) : L();
    },
    clone(T) {
      return yr(T, t, n, i);
    }
  };
  return C;
}
function Fl(e) {
  if (fl(e))
    return e = bn(e), e.children = null, e;
}
function wu(e) {
  return fl(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function pr(e, t) {
  e.shapeFlag & 6 && e.component ? pr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ma(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Ce ? (l.patchFlag & 128 && r++, i = i.concat(
      ma(l.children, t, s)
    )) : (t || l.type !== Tt) && i.push(s != null ? bn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ji(e, t) {
  return Se(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Be({ name: e.name }, t, { setup: e })
  ) : e;
}
const po = (e) => !!e.type.__asyncLoader, fl = (e) => e.type.__isKeepAlive;
function Sg(e, t) {
  hd(e, "a", t);
}
function Cg(e, t) {
  hd(e, "da", t);
}
function hd(e, t, n = Ke) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (dl(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      fl(r.parent.vnode) && kg(i, t, n, r), r = r.parent;
  }
}
function kg(e, t, n, i) {
  const r = dl(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  vl(() => {
    Qs(i[t], r);
  }, n);
}
function dl(e, t, n = Ke, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      mi();
      const s = Rr(n), a = Pt(t, n, e, l);
      return s(), gi(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const Cn = (e) => (t, n = Ke) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!gl || e === "sp") && dl(e, (...i) => t(...i), n)
), hl = Cn("bm"), Ut = Cn("m"), Eg = Cn("bu"), vd = Cn("u"), Wt = Cn("bum"), vl = Cn("um"), Vg = Cn("sp"), Lg = Cn(
  "rtg"
), Pg = Cn(
  "rtc"
);
function Tg(e, t = Ke) {
  dl("ec", e, t);
}
function Mg(e, t, n, i) {
  let r;
  const o = n;
  if (pe(e) || Fe(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (Ie(e))
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
const hs = (e) => e ? Ed(e) ? yl(e) || e.proxy : hs(e.parent) : null, ar = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Be(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => hs(e.parent),
    $root: (e) => hs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ga(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ha(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = De.bind(e.proxy)),
    $watch: (e) => wg.bind(e)
  })
), Dl = (e, t) => e !== Ae && !e.__isScriptSetup && Ve(e, t), Ig = {
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
        if (Dl(i, t))
          return l[t] = 1, i[t];
        if (r !== Ae && Ve(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Ve(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== Ae && Ve(n, t))
          return l[t] = 4, n[t];
        vs && (l[t] = 0);
      }
    }
    const c = ar[t];
    let d, f;
    if (c)
      return t === "$attrs" && ft(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== Ae && Ve(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Ve(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return Dl(r, t) ? (r[t] = n, !0) : i !== Ae && Ve(i, t) ? (i[t] = n, !0) : Ve(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== Ae && Ve(e, l) || Dl(t, l) || (s = o[0]) && Ve(s, l) || Ve(i, l) || Ve(ar, l) || Ve(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ve(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function xu(e) {
  return pe(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let vs = !0;
function Ag(e) {
  const t = ga(e), n = e.proxy, i = e.ctx;
  vs = !1, t.beforeCreate && _u(t.beforeCreate, e, "bc");
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
    destroyed: _,
    unmounted: b,
    render: x,
    renderTracked: V,
    renderTriggered: C,
    errorCaptured: T,
    serverPrefetch: $,
    // public API
    expose: R,
    inheritAttrs: j,
    // assets
    components: L,
    directives: N,
    filters: S
  } = t;
  if (u && $g(u, i, null), l)
    for (const W in l) {
      const A = l[W];
      Se(A) && (i[W] = A.bind(n));
    }
  if (r) {
    const W = r.call(n, n);
    Ie(W) && (e.data = zt(W));
  }
  if (vs = !0, o)
    for (const W in o) {
      const A = o[W], D = Se(A) ? A.bind(n, n) : Se(A.get) ? A.get.bind(n, n) : Vt, O = !Se(A) && Se(A.set) ? A.set.bind(n) : Vt, U = k({
        get: D,
        set: O
      });
      Object.defineProperty(i, W, {
        enumerable: !0,
        configurable: !0,
        get: () => U.value,
        set: (Y) => U.value = Y
      });
    }
  if (s)
    for (const W in s)
      md(s[W], i, n, W);
  if (a) {
    const W = Se(a) ? a.call(n) : a;
    Reflect.ownKeys(W).forEach((A) => {
      Qe(A, W[A]);
    });
  }
  c && _u(c, e, "c");
  function I(W, A) {
    pe(A) ? A.forEach((D) => W(D.bind(n))) : A && W(A.bind(n));
  }
  if (I(hl, d), I(Ut, f), I(Eg, h), I(vd, v), I(Sg, m), I(Cg, p), I(Tg, T), I(Pg, V), I(Lg, C), I(Wt, w), I(vl, b), I(Vg, $), pe(R))
    if (R.length) {
      const W = e.exposed || (e.exposed = {});
      R.forEach((A) => {
        Object.defineProperty(W, A, {
          get: () => n[A],
          set: (D) => n[A] = D
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === Vt && (e.render = x), j != null && (e.inheritAttrs = j), L && (e.components = L), N && (e.directives = N);
}
function $g(e, t, n = Vt) {
  pe(e) && (e = ms(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Ie(r) ? "default" in r ? o = $e(
      r.from || i,
      r.default,
      !0
    ) : o = $e(r.from || i) : o = $e(r), Ne(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function _u(e, t, n) {
  Pt(
    pe(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function md(e, t, n, i) {
  const r = i.includes(".") ? ud(n, i) : () => n[i];
  if (Fe(e)) {
    const o = t[e];
    Se(o) && ye(r, o);
  } else if (Se(e))
    ye(r, e.bind(n));
  else if (Ie(e))
    if (pe(e))
      e.forEach((o) => md(o, t, n, i));
    else {
      const o = Se(e.handler) ? e.handler.bind(n) : t[e.handler];
      Se(o) && ye(r, o, e);
    }
}
function ga(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => Ao(a, u, l, !0)
  ), Ao(a, t, l)), Ie(t) && o.set(t, a), a;
}
function Ao(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && Ao(e, o, n, !0), r && r.forEach(
    (l) => Ao(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = Ng[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const Ng = {
  data: Su,
  props: Cu,
  emits: Cu,
  // objects
  methods: ir,
  computed: ir,
  // lifecycle
  beforeCreate: nt,
  created: nt,
  beforeMount: nt,
  mounted: nt,
  beforeUpdate: nt,
  updated: nt,
  beforeDestroy: nt,
  beforeUnmount: nt,
  destroyed: nt,
  unmounted: nt,
  activated: nt,
  deactivated: nt,
  errorCaptured: nt,
  serverPrefetch: nt,
  // assets
  components: ir,
  directives: ir,
  // watch
  watch: Og,
  // provide / inject
  provide: Su,
  inject: Rg
};
function Su(e, t) {
  return t ? e ? function() {
    return Be(
      Se(e) ? e.call(this, this) : e,
      Se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rg(e, t) {
  return ir(ms(e), ms(t));
}
function ms(e) {
  if (pe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function nt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ir(e, t) {
  return e ? Be(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Cu(e, t) {
  return e ? pe(e) && pe(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Be(
    /* @__PURE__ */ Object.create(null),
    xu(e),
    xu(t ?? {})
  ) : t;
}
function Og(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Be(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = nt(e[i], t[i]);
  return n;
}
function gd() {
  return {
    app: null,
    config: {
      isNativeTag: ym,
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
let Bg = 0;
function Fg(e, t) {
  return function(i, r = null) {
    Se(i) || (i = Be({}, i)), r != null && !Ie(r) && (r = null);
    const o = gd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: Bg++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: f0,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && Se(u.install) ? (l.add(u), u.install(a, ...c)) : Se(u) && (l.add(u), u(a, ...c))), a;
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
          return f.appContext = o, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, yl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = ur;
        ur = a;
        try {
          return u();
        } finally {
          ur = c;
        }
      }
    };
    return a;
  };
}
let ur = null;
function Qe(e, t) {
  if (Ke) {
    let n = Ke.provides;
    const i = Ke.parent && Ke.parent.provides;
    i === n && (n = Ke.provides = Object.create(i)), n[e] = t;
  }
}
function $e(e, t, n = !1) {
  const i = Ke || rt;
  if (i || ur) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : ur._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Se(t) ? t.call(i && i.proxy) : t;
  }
}
function Dg(e, t, n, i = !1) {
  const r = {}, o = {};
  Po(o, ml, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), yd(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : Zm(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Hg(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = be(r), [a] = e.propsOptions;
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
        if (cl(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Ve(o, f))
            h !== o[f] && (o[f] = h, u = !0);
          else {
            const v = lt(f);
            r[v] = gs(
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
    yd(e, t, r, o) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Ve(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Nt(d)) === d || !Ve(t, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[d] = gs(
        a,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete r[d]);
    if (o !== s)
      for (const d in o)
        (!t || !Ve(t, d)) && (delete o[d], u = !0);
  }
  u && pn(e, "set", "$attrs");
}
function yd(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (sr(a))
        continue;
      const u = t[a];
      let c;
      r && Ve(r, c = lt(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : cl(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = be(n), u = s || Ae;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      n[d] = gs(
        r,
        a,
        d,
        u[d],
        e,
        !Ve(u, d)
      );
    }
  }
  return l;
}
function gs(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Ve(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Se(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = Rr(r);
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
    ] && (i === "" || i === Nt(n)) && (i = !0));
  }
  return i;
}
function pd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Se(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = pd(d, t, !0);
      Be(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Ie(e) && i.set(e, Li), Li;
  if (pe(o))
    for (let c = 0; c < o.length; c++) {
      const d = lt(o[c]);
      ku(d) && (l[d] = Ae);
    }
  else if (o)
    for (const c in o) {
      const d = lt(c);
      if (ku(d)) {
        const f = o[c], h = l[d] = pe(f) || Se(f) ? { type: f } : Be({}, f);
        if (h) {
          const v = Lu(Boolean, h.type), m = Lu(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Ve(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Ie(e) && i.set(e, u), u;
}
function ku(e) {
  return e[0] !== "$" && !sr(e);
}
function Eu(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Vu(e, t) {
  return Eu(e) === Eu(t);
}
function Lu(e, t) {
  return pe(t) ? t.findIndex((n) => Vu(n, e)) : Se(t) && Vu(t, e) ? 0 : -1;
}
const bd = (e) => e[0] === "_" || e === "$stable", ya = (e) => pe(e) ? e.map(en) : [en(e)], zg = (e, t, n) => {
  if (t._n)
    return t;
  const i = fe((...r) => ya(t(...r)), n);
  return i._c = !1, i;
}, wd = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (bd(r))
      continue;
    const o = e[r];
    if (Se(o))
      t[r] = zg(r, o, i);
    else if (o != null) {
      const l = ya(o);
      t[r] = () => l;
    }
  }
}, xd = (e, t) => {
  const n = ya(t);
  e.slots.default = () => n;
}, jg = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = be(t), Po(t, "_", n)) : wd(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && xd(e, t);
  Po(e.slots, ml, 1);
}, Ug = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = Ae;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (Be(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, wd(t, r)), l = t;
  } else t && (xd(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !bd(s) && l[s] == null && delete r[s];
};
function ys(e, t, n, i, r = !1) {
  if (pe(e)) {
    e.forEach(
      (f, h) => ys(
        f,
        t && (pe(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (po(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? yl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === Ae ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (Fe(u) ? (c[u] = null, Ve(d, u) && (d[u] = null)) : Ne(u) && (u.value = null)), Se(a))
    Fn(a, s, 12, [l, c]);
  else {
    const f = Fe(a), h = Ne(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const m = f ? Ve(d, a) ? d[a] : c[a] : a.value;
          r ? pe(m) && Qs(m, o) : pe(m) ? m.includes(o) || m.push(o) : f ? (c[a] = [o], Ve(d, a) && (d[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else f ? (c[a] = l, Ve(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, ut(v, n)) : v();
    }
  }
}
const ut = yg;
function Wg(e) {
  return Gg(e);
}
function Gg(e, t) {
  const n = Af();
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
    setScopeId: h = Vt,
    insertStaticContent: v
  } = e, m = (E, M, G, q = null, K = null, te = null, oe = void 0, ee = null, re = !!M.dynamicChildren) => {
    if (E === M)
      return;
    E && !Qn(E, M) && (q = ue(E), Y(E, K, te, !0), E = null), M.patchFlag === -2 && (re = !1, M.dynamicChildren = null);
    const { type: X, ref: se, shapeFlag: P } = M;
    switch (X) {
      case Nr:
        p(E, M, G, q);
        break;
      case Tt:
        g(E, M, G, q);
        break;
      case zl:
        E == null && w(M, G, q, oe);
        break;
      case Ce:
        L(
          E,
          M,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re
        );
        break;
      default:
        P & 1 ? x(
          E,
          M,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re
        ) : P & 6 ? N(
          E,
          M,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re
        ) : (P & 64 || P & 128) && X.process(
          E,
          M,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re,
          et
        );
    }
    se != null && K && ys(se, E && E.ref, te, M || E, !M);
  }, p = (E, M, G, q) => {
    if (E == null)
      i(
        M.el = s(M.children),
        G,
        q
      );
    else {
      const K = M.el = E.el;
      M.children !== E.children && u(K, M.children);
    }
  }, g = (E, M, G, q) => {
    E == null ? i(
      M.el = a(M.children || ""),
      G,
      q
    ) : M.el = E.el;
  }, w = (E, M, G, q) => {
    [E.el, E.anchor] = v(
      E.children,
      M,
      G,
      q,
      E.el,
      E.anchor
    );
  }, _ = ({ el: E, anchor: M }, G, q) => {
    let K;
    for (; E && E !== M; )
      K = f(E), i(E, G, q), E = K;
    i(M, G, q);
  }, b = ({ el: E, anchor: M }) => {
    let G;
    for (; E && E !== M; )
      G = f(E), r(E), E = G;
    r(M);
  }, x = (E, M, G, q, K, te, oe, ee, re) => {
    M.type === "svg" ? oe = "svg" : M.type === "math" && (oe = "mathml"), E == null ? V(
      M,
      G,
      q,
      K,
      te,
      oe,
      ee,
      re
    ) : $(
      E,
      M,
      K,
      te,
      oe,
      ee,
      re
    );
  }, V = (E, M, G, q, K, te, oe, ee) => {
    let re, X;
    const { props: se, shapeFlag: P, transition: F, dirs: z } = E;
    if (re = E.el = l(
      E.type,
      te,
      se && se.is,
      se
    ), P & 8 ? c(re, E.children) : P & 16 && T(
      E.children,
      re,
      null,
      q,
      K,
      Hl(E, te),
      oe,
      ee
    ), z && Gn(E, null, q, "created"), C(re, E, E.scopeId, oe, q), se) {
      for (const ie in se)
        ie !== "value" && !sr(ie) && o(
          re,
          ie,
          null,
          se[ie],
          te,
          E.children,
          q,
          K,
          J
        );
      "value" in se && o(re, "value", null, se.value, te), (X = se.onVnodeBeforeMount) && Qt(X, q, E);
    }
    z && Gn(E, null, q, "beforeMount");
    const H = qg(K, F);
    H && F.beforeEnter(re), i(re, M, G), ((X = se && se.onVnodeMounted) || H || z) && ut(() => {
      X && Qt(X, q, E), H && F.enter(re), z && Gn(E, null, q, "mounted");
    }, K);
  }, C = (E, M, G, q, K) => {
    if (G && h(E, G), q)
      for (let te = 0; te < q.length; te++)
        h(E, q[te]);
    if (K) {
      let te = K.subTree;
      if (M === te) {
        const oe = K.vnode;
        C(
          E,
          oe,
          oe.scopeId,
          oe.slotScopeIds,
          K.parent
        );
      }
    }
  }, T = (E, M, G, q, K, te, oe, ee, re = 0) => {
    for (let X = re; X < E.length; X++) {
      const se = E[X] = ee ? $n(E[X]) : en(E[X]);
      m(
        null,
        se,
        M,
        G,
        q,
        K,
        te,
        oe,
        ee
      );
    }
  }, $ = (E, M, G, q, K, te, oe) => {
    const ee = M.el = E.el;
    let { patchFlag: re, dynamicChildren: X, dirs: se } = M;
    re |= E.patchFlag & 16;
    const P = E.props || Ae, F = M.props || Ae;
    let z;
    if (G && qn(G, !1), (z = F.onVnodeBeforeUpdate) && Qt(z, G, M, E), se && Gn(M, E, G, "beforeUpdate"), G && qn(G, !0), X ? R(
      E.dynamicChildren,
      X,
      ee,
      G,
      q,
      Hl(M, K),
      te
    ) : oe || A(
      E,
      M,
      ee,
      null,
      G,
      q,
      Hl(M, K),
      te,
      !1
    ), re > 0) {
      if (re & 16)
        j(
          ee,
          M,
          P,
          F,
          G,
          q,
          K
        );
      else if (re & 2 && P.class !== F.class && o(ee, "class", null, F.class, K), re & 4 && o(ee, "style", P.style, F.style, K), re & 8) {
        const H = M.dynamicProps;
        for (let ie = 0; ie < H.length; ie++) {
          const xe = H[ie], Me = P[xe], tt = F[xe];
          (tt !== Me || xe === "value") && o(
            ee,
            xe,
            Me,
            tt,
            K,
            E.children,
            G,
            q,
            J
          );
        }
      }
      re & 1 && E.children !== M.children && c(ee, M.children);
    } else !oe && X == null && j(
      ee,
      M,
      P,
      F,
      G,
      q,
      K
    );
    ((z = F.onVnodeUpdated) || se) && ut(() => {
      z && Qt(z, G, M, E), se && Gn(M, E, G, "updated");
    }, q);
  }, R = (E, M, G, q, K, te, oe) => {
    for (let ee = 0; ee < M.length; ee++) {
      const re = E[ee], X = M[ee], se = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        re.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (re.type === Ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qn(re, X) || // - In the case of a component, it could contain anything.
        re.shapeFlag & 70) ? d(re.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          G
        )
      );
      m(
        re,
        X,
        se,
        null,
        q,
        K,
        te,
        oe,
        !0
      );
    }
  }, j = (E, M, G, q, K, te, oe) => {
    if (G !== q) {
      if (G !== Ae)
        for (const ee in G)
          !sr(ee) && !(ee in q) && o(
            E,
            ee,
            G[ee],
            null,
            oe,
            M.children,
            K,
            te,
            J
          );
      for (const ee in q) {
        if (sr(ee))
          continue;
        const re = q[ee], X = G[ee];
        re !== X && ee !== "value" && o(
          E,
          ee,
          X,
          re,
          oe,
          M.children,
          K,
          te,
          J
        );
      }
      "value" in q && o(E, "value", G.value, q.value, oe);
    }
  }, L = (E, M, G, q, K, te, oe, ee, re) => {
    const X = M.el = E ? E.el : s(""), se = M.anchor = E ? E.anchor : s("");
    let { patchFlag: P, dynamicChildren: F, slotScopeIds: z } = M;
    z && (ee = ee ? ee.concat(z) : z), E == null ? (i(X, G, q), i(se, G, q), T(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      M.children || [],
      G,
      se,
      K,
      te,
      oe,
      ee,
      re
    )) : P > 0 && P & 64 && F && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    E.dynamicChildren ? (R(
      E.dynamicChildren,
      F,
      G,
      K,
      te,
      oe,
      ee
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (M.key != null || K && M === K.subTree) && pa(
      E,
      M,
      !0
      /* shallow */
    )) : A(
      E,
      M,
      G,
      se,
      K,
      te,
      oe,
      ee,
      re
    );
  }, N = (E, M, G, q, K, te, oe, ee, re) => {
    M.slotScopeIds = ee, E == null ? M.shapeFlag & 512 ? K.ctx.activate(
      M,
      G,
      q,
      oe,
      re
    ) : S(
      M,
      G,
      q,
      K,
      te,
      oe,
      re
    ) : B(E, M, re);
  }, S = (E, M, G, q, K, te, oe) => {
    const ee = E.component = r0(
      E,
      q,
      K
    );
    if (fl(E) && (ee.ctx.renderer = et), o0(ee), ee.asyncDep) {
      if (K && K.registerDep(ee, I), !E.el) {
        const re = ee.subTree = y(Tt);
        g(null, re, M, G);
      }
    } else
      I(
        ee,
        E,
        M,
        G,
        K,
        te,
        oe
      );
  }, B = (E, M, G) => {
    const q = M.component = E.component;
    if (fg(E, M, G))
      if (q.asyncDep && !q.asyncResolved) {
        W(q, M, G);
        return;
      } else
        q.next = M, og(q.update), q.effect.dirty = !0, q.update();
    else
      M.el = E.el, q.vnode = M;
  }, I = (E, M, G, q, K, te, oe) => {
    const ee = () => {
      if (E.isMounted) {
        let { next: se, bu: P, u: F, parent: z, vnode: H } = E;
        {
          const dn = _d(E);
          if (dn) {
            se && (se.el = H.el, W(E, se, oe)), dn.asyncDep.then(() => {
              E.isUnmounted || ee();
            });
            return;
          }
        }
        let ie = se, xe;
        qn(E, !1), se ? (se.el = H.el, W(E, se, oe)) : se = H, P && Rl(P), (xe = se.props && se.props.onVnodeBeforeUpdate) && Qt(xe, z, se, H), qn(E, !0);
        const Me = Bl(E), tt = E.subTree;
        E.subTree = Me, m(
          tt,
          Me,
          // parent may have changed if it's in a teleport
          d(tt.el),
          // anchor may have changed if it's in a fragment
          ue(tt),
          E,
          K,
          te
        ), se.el = Me.el, ie === null && dg(E, Me.el), F && ut(F, K), (xe = se.props && se.props.onVnodeUpdated) && ut(
          () => Qt(xe, z, se, H),
          K
        );
      } else {
        let se;
        const { el: P, props: F } = M, { bm: z, m: H, parent: ie } = E, xe = po(M);
        if (qn(E, !1), z && Rl(z), !xe && (se = F && F.onVnodeBeforeMount) && Qt(se, ie, M), qn(E, !0), P && Zt) {
          const Me = () => {
            E.subTree = Bl(E), Zt(
              P,
              E.subTree,
              E,
              K,
              null
            );
          };
          xe ? M.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !E.isUnmounted && Me()
          ) : Me();
        } else {
          const Me = E.subTree = Bl(E);
          m(
            null,
            Me,
            G,
            q,
            E,
            K,
            te
          ), M.el = Me.el;
        }
        if (H && ut(H, K), !xe && (se = F && F.onVnodeMounted)) {
          const Me = M;
          ut(
            () => Qt(se, ie, Me),
            K
          );
        }
        (M.shapeFlag & 256 || ie && po(ie.vnode) && ie.vnode.shapeFlag & 256) && E.a && ut(E.a, K), E.isMounted = !0, M = G = q = null;
      }
    }, re = E.effect = new ra(
      ee,
      Vt,
      () => ha(X),
      E.scope
      // track it in component's effect scope
    ), X = E.update = () => {
      re.dirty && re.run();
    };
    X.id = E.uid, qn(E, !0), X();
  }, W = (E, M, G) => {
    M.component = E;
    const q = E.vnode.props;
    E.vnode = M, E.next = null, Hg(E, M.props, q, G), Ug(E, M.children, G), mi(), yu(E), gi();
  }, A = (E, M, G, q, K, te, oe, ee, re = !1) => {
    const X = E && E.children, se = E ? E.shapeFlag : 0, P = M.children, { patchFlag: F, shapeFlag: z } = M;
    if (F > 0) {
      if (F & 128) {
        O(
          X,
          P,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re
        );
        return;
      } else if (F & 256) {
        D(
          X,
          P,
          G,
          q,
          K,
          te,
          oe,
          ee,
          re
        );
        return;
      }
    }
    z & 8 ? (se & 16 && J(X, K, te), P !== X && c(G, P)) : se & 16 ? z & 16 ? O(
      X,
      P,
      G,
      q,
      K,
      te,
      oe,
      ee,
      re
    ) : J(X, K, te, !0) : (se & 8 && c(G, ""), z & 16 && T(
      P,
      G,
      q,
      K,
      te,
      oe,
      ee,
      re
    ));
  }, D = (E, M, G, q, K, te, oe, ee, re) => {
    E = E || Li, M = M || Li;
    const X = E.length, se = M.length, P = Math.min(X, se);
    let F;
    for (F = 0; F < P; F++) {
      const z = M[F] = re ? $n(M[F]) : en(M[F]);
      m(
        E[F],
        z,
        G,
        null,
        K,
        te,
        oe,
        ee,
        re
      );
    }
    X > se ? J(
      E,
      K,
      te,
      !0,
      !1,
      P
    ) : T(
      M,
      G,
      q,
      K,
      te,
      oe,
      ee,
      re,
      P
    );
  }, O = (E, M, G, q, K, te, oe, ee, re) => {
    let X = 0;
    const se = M.length;
    let P = E.length - 1, F = se - 1;
    for (; X <= P && X <= F; ) {
      const z = E[X], H = M[X] = re ? $n(M[X]) : en(M[X]);
      if (Qn(z, H))
        m(
          z,
          H,
          G,
          null,
          K,
          te,
          oe,
          ee,
          re
        );
      else
        break;
      X++;
    }
    for (; X <= P && X <= F; ) {
      const z = E[P], H = M[F] = re ? $n(M[F]) : en(M[F]);
      if (Qn(z, H))
        m(
          z,
          H,
          G,
          null,
          K,
          te,
          oe,
          ee,
          re
        );
      else
        break;
      P--, F--;
    }
    if (X > P) {
      if (X <= F) {
        const z = F + 1, H = z < se ? M[z].el : q;
        for (; X <= F; )
          m(
            null,
            M[X] = re ? $n(M[X]) : en(M[X]),
            G,
            H,
            K,
            te,
            oe,
            ee,
            re
          ), X++;
      }
    } else if (X > F)
      for (; X <= P; )
        Y(E[X], K, te, !0), X++;
    else {
      const z = X, H = X, ie = /* @__PURE__ */ new Map();
      for (X = H; X <= F; X++) {
        const vt = M[X] = re ? $n(M[X]) : en(M[X]);
        vt.key != null && ie.set(vt.key, X);
      }
      let xe, Me = 0;
      const tt = F - H + 1;
      let dn = !1, Ki = 0;
      const Xi = new Array(tt);
      for (X = 0; X < tt; X++)
        Xi[X] = 0;
      for (X = z; X <= P; X++) {
        const vt = E[X];
        if (Me >= tt) {
          Y(vt, K, te, !0);
          continue;
        }
        let Jt;
        if (vt.key != null)
          Jt = ie.get(vt.key);
        else
          for (xe = H; xe <= F; xe++)
            if (Xi[xe - H] === 0 && Qn(vt, M[xe])) {
              Jt = xe;
              break;
            }
        Jt === void 0 ? Y(vt, K, te, !0) : (Xi[Jt - H] = X + 1, Jt >= Ki ? Ki = Jt : dn = !0, m(
          vt,
          M[Jt],
          G,
          null,
          K,
          te,
          oe,
          ee,
          re
        ), Me++);
      }
      const su = dn ? Yg(Xi) : Li;
      for (xe = su.length - 1, X = tt - 1; X >= 0; X--) {
        const vt = H + X, Jt = M[vt], au = vt + 1 < se ? M[vt + 1].el : q;
        Xi[X] === 0 ? m(
          null,
          Jt,
          G,
          au,
          K,
          te,
          oe,
          ee,
          re
        ) : dn && (xe < 0 || X !== su[xe] ? U(Jt, G, au, 2) : xe--);
      }
    }
  }, U = (E, M, G, q, K = null) => {
    const { el: te, type: oe, transition: ee, children: re, shapeFlag: X } = E;
    if (X & 6) {
      U(E.component.subTree, M, G, q);
      return;
    }
    if (X & 128) {
      E.suspense.move(M, G, q);
      return;
    }
    if (X & 64) {
      oe.move(E, M, G, et);
      return;
    }
    if (oe === Ce) {
      i(te, M, G);
      for (let P = 0; P < re.length; P++)
        U(re[P], M, G, q);
      i(E.anchor, M, G);
      return;
    }
    if (oe === zl) {
      _(E, M, G);
      return;
    }
    if (q !== 2 && X & 1 && ee)
      if (q === 0)
        ee.beforeEnter(te), i(te, M, G), ut(() => ee.enter(te), K);
      else {
        const { leave: P, delayLeave: F, afterLeave: z } = ee, H = () => i(te, M, G), ie = () => {
          P(te, () => {
            H(), z && z();
          });
        };
        F ? F(te, H, ie) : ie();
      }
    else
      i(te, M, G);
  }, Y = (E, M, G, q = !1, K = !1) => {
    const {
      type: te,
      props: oe,
      ref: ee,
      children: re,
      dynamicChildren: X,
      shapeFlag: se,
      patchFlag: P,
      dirs: F
    } = E;
    if (ee != null && ys(ee, null, G, E, !0), se & 256) {
      M.ctx.deactivate(E);
      return;
    }
    const z = se & 1 && F, H = !po(E);
    let ie;
    if (H && (ie = oe && oe.onVnodeBeforeUnmount) && Qt(ie, M, E), se & 6)
      ve(E.component, G, q);
    else {
      if (se & 128) {
        E.suspense.unmount(G, q);
        return;
      }
      z && Gn(E, null, M, "beforeUnmount"), se & 64 ? E.type.remove(
        E,
        M,
        G,
        K,
        et,
        q
      ) : X && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (te !== Ce || P > 0 && P & 64) ? J(
        X,
        M,
        G,
        !1,
        !0
      ) : (te === Ce && P & 384 || !K && se & 16) && J(re, M, G), q && Q(E);
    }
    (H && (ie = oe && oe.onVnodeUnmounted) || z) && ut(() => {
      ie && Qt(ie, M, E), z && Gn(E, null, M, "unmounted");
    }, G);
  }, Q = (E) => {
    const { type: M, el: G, anchor: q, transition: K } = E;
    if (M === Ce) {
      le(G, q);
      return;
    }
    if (M === zl) {
      b(E);
      return;
    }
    const te = () => {
      r(G), K && !K.persisted && K.afterLeave && K.afterLeave();
    };
    if (E.shapeFlag & 1 && K && !K.persisted) {
      const { leave: oe, delayLeave: ee } = K, re = () => oe(G, te);
      ee ? ee(E.el, te, re) : re();
    } else
      te();
  }, le = (E, M) => {
    let G;
    for (; E !== M; )
      G = f(E), r(E), E = G;
    r(M);
  }, ve = (E, M, G) => {
    const { bum: q, scope: K, update: te, subTree: oe, um: ee } = E;
    q && Rl(q), K.stop(), te && (te.active = !1, Y(oe, E, M, G)), ee && ut(ee, M), ut(() => {
      E.isUnmounted = !0;
    }, M), M && M.pendingBranch && !M.isUnmounted && E.asyncDep && !E.asyncResolved && E.suspenseId === M.pendingId && (M.deps--, M.deps === 0 && M.resolve());
  }, J = (E, M, G, q = !1, K = !1, te = 0) => {
    for (let oe = te; oe < E.length; oe++)
      Y(E[oe], M, G, q, K);
  }, ue = (E) => E.shapeFlag & 6 ? ue(E.component.subTree) : E.shapeFlag & 128 ? E.suspense.next() : f(E.anchor || E.el);
  let ke = !1;
  const ze = (E, M, G) => {
    E == null ? M._vnode && Y(M._vnode, null, null, !0) : m(
      M._vnode || null,
      E,
      M,
      null,
      null,
      null,
      G
    ), ke || (ke = !0, yu(), id(), ke = !1), M._vnode = E;
  }, et = {
    p: m,
    um: Y,
    m: U,
    r: Q,
    mt: S,
    mc: T,
    pc: A,
    pbc: R,
    n: ue,
    o: e
  };
  let It, Zt;
  return {
    render: ze,
    hydrate: It,
    createApp: Fg(ze, It)
  };
}
function Hl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function qn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function qg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pa(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (pe(i) && pe(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = $n(r[o]), s.el = l.el), n || pa(l, s)), s.type === Nr && (s.el = l.el);
    }
}
function Yg(e) {
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
function _d(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : _d(t);
}
const Kg = (e) => e.__isTeleport, cr = (e) => e && (e.disabled || e.disabled === ""), Pu = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Tu = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ps = (e, t) => {
  const n = e && e.to;
  return Fe(n) ? t ? t(n) : null : n;
}, Xg = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: m, createComment: p }
    } = u, g = cr(t.props);
    let { shapeFlag: w, children: _, dynamicChildren: b } = t;
    if (e == null) {
      const x = t.el = m(""), V = t.anchor = m("");
      h(x, n, i), h(V, n, i);
      const C = t.target = ps(t.props, v), T = t.targetAnchor = m("");
      C && (h(T, C), l === "svg" || Pu(C) ? l = "svg" : (l === "mathml" || Tu(C)) && (l = "mathml"));
      const $ = (R, j) => {
        w & 16 && c(
          _,
          R,
          j,
          r,
          o,
          l,
          s,
          a
        );
      };
      g ? $(n, V) : C && $(C, T);
    } else {
      t.el = e.el;
      const x = t.anchor = e.anchor, V = t.target = e.target, C = t.targetAnchor = e.targetAnchor, T = cr(e.props), $ = T ? n : V, R = T ? x : C;
      if (l === "svg" || Pu(V) ? l = "svg" : (l === "mathml" || Tu(V)) && (l = "mathml"), b ? (f(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), pa(e, t, !0)) : a || d(
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
        T ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : io(
          t,
          n,
          x,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const j = t.target = ps(
          t.props,
          v
        );
        j && io(
          t,
          j,
          null,
          u,
          0
        );
      } else T && io(
        t,
        V,
        C,
        u,
        1
      );
    }
    Sd(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && o(c), l && o(u), s & 16) {
      const h = l || !cr(f);
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
  move: io,
  hydrate: Zg
};
function io(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = o === 2;
  if (d && i(l, t, n), (!d || cr(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      r(
        u[f],
        t,
        n,
        2
      );
  d && i(s, t, n);
}
function Zg(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = ps(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (cr(t.props))
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
    Sd(t);
  }
  return t.anchor && l(t.anchor);
}
const Jg = Xg;
function Sd(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Ce = Symbol.for("v-fgt"), Nr = Symbol.for("v-txt"), Tt = Symbol.for("v-cmt"), zl = Symbol.for("v-stc"), fr = [];
let Ft = null;
function nn(e = !1) {
  fr.push(Ft = e ? null : []);
}
function Qg() {
  fr.pop(), Ft = fr[fr.length - 1] || null;
}
let br = 1;
function Mu(e) {
  br += e;
}
function Cd(e) {
  return e.dynamicChildren = br > 0 ? Ft || Li : null, Qg(), br > 0 && Ft && Ft.push(e), e;
}
function bs(e, t, n, i, r, o) {
  return Cd(
    je(
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
function ni(e, t, n, i, r) {
  return Cd(
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
function $o(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ml = "__vInternal", kd = ({ key: e }) => e ?? null, bo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Fe(e) || Ne(e) || Se(e) ? { i: rt, r: e, k: t, f: !!n } : e : null);
function je(e, t = null, n = null, i = 0, r = null, o = e === Ce ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && kd(t),
    ref: t && bo(t),
    scopeId: ld,
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
    ctx: rt
  };
  return s ? (ba(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Fe(n) ? 8 : 16), br > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Ft && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ft.push(a), a;
}
const y = e0;
function e0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === vg) && (e = Tt), $o(e)) {
    const s = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ba(s, n), br > 0 && !o && Ft && (s.shapeFlag & 6 ? Ft[Ft.indexOf(e)] = s : Ft.push(s)), s.patchFlag |= -2, s;
  }
  if (c0(e) && (e = e.__vccOpts), t) {
    t = t0(t);
    let { class: s, style: a } = t;
    s && !Fe(s) && (t.class = na(s)), Ie(a) && (Yf(a) && !pe(a) && (a = Be({}, a)), t.style = ta(a));
  }
  const l = Fe(e) ? 1 : gg(e) ? 128 : Kg(e) ? 64 : Ie(e) ? 4 : Se(e) ? 2 : 0;
  return je(
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
function t0(e) {
  return e ? Yf(e) || ml in e ? Be({}, e) : e : null;
}
function bn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? he(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && kd(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? pe(r) ? r.concat(bo(t)) : [r, bo(t)] : bo(t)
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
    patchFlag: t && e.type !== Ce ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && bn(e.ssContent),
    ssFallback: e.ssFallback && bn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ue(e = " ", t = 0) {
  return y(Nr, null, e, t);
}
function Tn(e = "", t = !1) {
  return t ? (nn(), ni(Tt, null, e)) : y(Tt, null, e);
}
function en(e) {
  return e == null || typeof e == "boolean" ? y(Tt) : pe(e) ? y(
    Ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? $n(e) : y(Nr, null, String(e));
}
function $n(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function ba(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (pe(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ba(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(ml in t) ? t._ctx = rt : r === 3 && rt && (rt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Se(t) ? (t = { default: t, _ctx: rt }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Ue(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function he(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = na([t.class, i.class]));
      else if (r === "style")
        t.style = ta([t.style, i.style]);
      else if (ol(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(pe(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function Qt(e, t, n, i = null) {
  Pt(e, t, 7, [
    n,
    i
  ]);
}
const n0 = gd();
let i0 = 0;
function r0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || n0, o = {
    uid: i0++,
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
    scope: new Rf(
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
    propsOptions: pd(i, r),
    emitsOptions: od(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ae,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: Ae,
    data: Ae,
    props: Ae,
    attrs: Ae,
    slots: Ae,
    refs: Ae,
    setupState: Ae,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = ag.bind(null, o), e.ce && e.ce(o), o;
}
let Ke = null;
const wa = () => Ke || rt;
let No, ws;
{
  const e = Af(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  No = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ke = n
  ), ws = t(
    "__VUE_SSR_SETTERS__",
    (n) => gl = n
  );
}
const Rr = (e) => {
  const t = Ke;
  return No(e), e.scope.on(), () => {
    e.scope.off(), No(t);
  };
}, Iu = () => {
  Ke && Ke.scope.off(), No(null);
};
function Ed(e) {
  return e.vnode.shapeFlag & 4;
}
let gl = !1;
function o0(e, t = !1) {
  t && ws(t);
  const { props: n, children: i } = e.vnode, r = Ed(e);
  Dg(e, n, r, t), jg(e, i);
  const o = r ? l0(e, t) : void 0;
  return t && ws(!1), o;
}
function l0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Kf(new Proxy(e.ctx, Ig));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? a0(e) : null, o = Rr(e);
    mi();
    const l = Fn(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (gi(), o(), Tf(l)) {
      if (l.then(Iu, Iu), t)
        return l.then((s) => {
          Au(e, s, t);
        }).catch((s) => {
          ul(s, e, 0);
        });
      e.asyncDep = l;
    } else
      Au(e, l, t);
  } else
    Vd(e, t);
}
function Au(e, t, n) {
  Se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ie(t) && (e.setupState = Qf(t)), Vd(e, n);
}
let $u;
function Vd(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && $u && !i.render) {
      const r = i.template || ga(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = Be(
          Be(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = $u(r, u);
      }
    }
    e.render = i.render || Vt;
  }
  {
    const r = Rr(e);
    mi();
    try {
      Ag(e);
    } finally {
      gi(), r();
    }
  }
}
function s0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ft(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function a0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return s0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function yl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Qf(Kf(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ar)
          return ar[n](e);
      },
      has(t, n) {
        return n in t || n in ar;
      }
    }));
}
function u0(e, t = !0) {
  return Se(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function c0(e) {
  return Se(e) && "__vccOpts" in e;
}
const k = (e, t) => Jm(e, t, gl);
function zn(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Ie(t) && !pe(t) ? $o(t) ? y(e, null, [t]) : y(e, t) : y(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && $o(n) && (n = [n]), y(e, t, n));
}
const f0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const d0 = "http://www.w3.org/2000/svg", h0 = "http://www.w3.org/1998/Math/MathML", Nn = typeof document < "u" ? document : null, Nu = Nn && /* @__PURE__ */ Nn.createElement("template"), v0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? Nn.createElementNS(d0, e) : t === "mathml" ? Nn.createElementNS(h0, e) : Nn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => Nn.createTextNode(e),
  createComment: (e) => Nn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Nn.querySelector(e),
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
      Nu.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = Nu.content;
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
}, Pn = "transition", Zi = "animation", Oi = Symbol("_vtc"), wn = (e, { slots: t }) => zn(_g, Pd(e), t);
wn.displayName = "Transition";
const Ld = {
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
}, m0 = wn.props = /* @__PURE__ */ Be(
  {},
  fd,
  Ld
), Yn = (e, t = []) => {
  pe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ru = (e) => e ? pe(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Pd(e) {
  const t = {};
  for (const L in e)
    L in Ld || (t[L] = e[L]);
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
  } = e, v = g0(r), m = v && v[0], p = v && v[1], {
    onBeforeEnter: g,
    onEnter: w,
    onEnterCancelled: _,
    onLeave: b,
    onLeaveCancelled: x,
    onBeforeAppear: V = g,
    onAppear: C = w,
    onAppearCancelled: T = _
  } = t, $ = (L, N, S) => {
    Mn(L, N ? c : s), Mn(L, N ? u : l), S && S();
  }, R = (L, N) => {
    L._isLeaving = !1, Mn(L, d), Mn(L, h), Mn(L, f), N && N();
  }, j = (L) => (N, S) => {
    const B = L ? C : w, I = () => $(N, L, S);
    Yn(B, [N, I]), Ou(() => {
      Mn(N, L ? a : o), vn(N, L ? c : s), Ru(B) || Bu(N, i, m, I);
    });
  };
  return Be(t, {
    onBeforeEnter(L) {
      Yn(g, [L]), vn(L, o), vn(L, l);
    },
    onBeforeAppear(L) {
      Yn(V, [L]), vn(L, a), vn(L, u);
    },
    onEnter: j(!1),
    onAppear: j(!0),
    onLeave(L, N) {
      L._isLeaving = !0;
      const S = () => R(L, N);
      vn(L, d), Md(), vn(L, f), Ou(() => {
        L._isLeaving && (Mn(L, d), vn(L, h), Ru(b) || Bu(L, i, p, S));
      }), Yn(b, [L, S]);
    },
    onEnterCancelled(L) {
      $(L, !1), Yn(_, [L]);
    },
    onAppearCancelled(L) {
      $(L, !0), Yn(T, [L]);
    },
    onLeaveCancelled(L) {
      R(L), Yn(x, [L]);
    }
  });
}
function g0(e) {
  if (e == null)
    return null;
  if (Ie(e))
    return [jl(e.enter), jl(e.leave)];
  {
    const t = jl(e);
    return [t, t];
  }
}
function jl(e) {
  return as(e);
}
function vn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Oi] || (e[Oi] = /* @__PURE__ */ new Set())).add(t);
}
function Mn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[Oi];
  n && (n.delete(t), n.size || (e[Oi] = void 0));
}
function Ou(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let y0 = 0;
function Bu(e, t, n, i) {
  const r = e._endId = ++y0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = Td(e, t);
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
function Td(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${Pn}Delay`), o = i(`${Pn}Duration`), l = Fu(r, o), s = i(`${Zi}Delay`), a = i(`${Zi}Duration`), u = Fu(s, a);
  let c = null, d = 0, f = 0;
  t === Pn ? l > 0 && (c = Pn, d = l, f = o.length) : t === Zi ? u > 0 && (c = Zi, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? Pn : Zi : null, f = c ? c === Pn ? o.length : a.length : 0);
  const h = c === Pn && /\b(transform|all)(,|$)/.test(
    i(`${Pn}Property`).toString()
  );
  return {
    type: c,
    timeout: d,
    propCount: f,
    hasTransform: h
  };
}
function Fu(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => Du(n) + Du(e[i])));
}
function Du(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Md() {
  return document.body.offsetHeight;
}
function p0(e, t, n) {
  const i = e[Oi];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ro = Symbol("_vod"), Id = Symbol("_vsh"), an = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ro] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ji(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), Ji(e, !0), i.enter(e)) : i.leave(e, () => {
      Ji(e, !1);
    }) : Ji(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ji(e, t);
  }
};
function Ji(e, t) {
  e.style.display = t ? e[Ro] : "none", e[Id] = !t;
}
const b0 = Symbol(""), w0 = /(^|;)\s*display\s*:/;
function x0(e, t, n) {
  const i = e.style, r = Fe(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Fe(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && wo(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && wo(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), wo(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[b0];
      l && (n += ";" + l), i.cssText = n, o = w0.test(n);
    }
  } else t && e.removeAttribute("style");
  Ro in e && (e[Ro] = o ? i.display : "", e[Id] && (i.display = "none"));
}
const Hu = /\s*!important$/;
function wo(e, t, n) {
  if (pe(n))
    n.forEach((i) => wo(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = _0(e, t);
    Hu.test(n) ? e.setProperty(
      Nt(i),
      n.replace(Hu, ""),
      "important"
    ) : e[i] = n;
  }
}
const zu = ["Webkit", "Moz", "ms"], Ul = {};
function _0(e, t) {
  const n = Ul[t];
  if (n)
    return n;
  let i = lt(t);
  if (i !== "filter" && i in e)
    return Ul[t] = i;
  i = Sn(i);
  for (let r = 0; r < zu.length; r++) {
    const o = zu[r] + i;
    if (o in e)
      return Ul[t] = o;
  }
  return t;
}
const ju = "http://www.w3.org/1999/xlink";
function S0(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ju, t.slice(6, t.length)) : e.setAttributeNS(ju, t, n);
  else {
    const o = Lm(t);
    n == null || o && !$f(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function C0(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = $f(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function k0(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function E0(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Uu = Symbol("_vei");
function V0(e, t, n, i, r = null) {
  const o = e[Uu] || (e[Uu] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = L0(t);
    if (i) {
      const u = o[t] = M0(i, r);
      k0(e, s, u, a);
    } else l && (E0(e, s, l, a), o[t] = void 0);
  }
}
const Wu = /(?:Once|Passive|Capture)$/;
function L0(e) {
  let t;
  if (Wu.test(e)) {
    t = {};
    let i;
    for (; i = e.match(Wu); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
}
let Wl = 0;
const P0 = /* @__PURE__ */ Promise.resolve(), T0 = () => Wl || (P0.then(() => Wl = 0), Wl = Date.now());
function M0(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Pt(
      I0(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = T0(), n;
}
function I0(e, t) {
  if (pe(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Gu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, A0 = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? p0(e, i, u) : t === "style" ? x0(e, n, i) : ol(t) ? Js(t) || V0(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $0(e, t, i, u)) ? C0(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), S0(e, t, i, u));
};
function $0(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Gu(t) && Se(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Gu(t) && Fe(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function N0(e, t) {
  const n = /* @__PURE__ */ ji(e);
  class i extends xa {
    constructor(o) {
      super(n, o, t);
    }
  }
  return i.def = n, i;
}
const R0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class xa extends R0 {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), De(() => {
      this._connected || (Ku(null, this.shadowRoot), this._instance = null);
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
      if (o && !pe(o))
        for (const a in o) {
          const u = o[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = as(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[lt(a)] = !0);
        }
      this._numberProps = s, r && this._resolveProps(i), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = pe(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && i.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of i.map(lt))
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
    const i = lt(t);
    this._numberProps && this._numberProps[i] && (n = as(n)), this._setProp(i, n, !1);
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
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), i && (n === !0 ? this.setAttribute(Nt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Nt(t), n + "") : n || this.removeAttribute(Nt(t))));
  }
  _update() {
    Ku(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = y(this._def, Be({}, this._props));
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
        i(o, l), Nt(o) !== o && i(Nt(o), l);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof xa) {
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
const Ad = /* @__PURE__ */ new WeakMap(), $d = /* @__PURE__ */ new WeakMap(), Oo = Symbol("_moveCb"), qu = Symbol("_enterCb"), Nd = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Be({}, m0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = wa(), i = cd();
    let r, o;
    return vd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!H0(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(B0), r.forEach(F0);
      const s = r.filter(D0);
      Md(), s.forEach((a) => {
        const u = a.el, c = u.style;
        vn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[Oo] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[Oo] = null, Mn(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = be(e), s = Pd(l);
      let a = l.tag || Ce;
      r = o, o = t.default ? ma(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && pr(
          c,
          yr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          pr(
            c,
            yr(c, s, i, n)
          ), Ad.set(c, c.el.getBoundingClientRect());
        }
      return y(a, null, o);
    };
  }
}, O0 = (e) => delete e.mode;
Nd.props;
const Rd = Nd;
function B0(e) {
  const t = e.el;
  t[Oo] && t[Oo](), t[qu] && t[qu]();
}
function F0(e) {
  $d.set(e, e.el.getBoundingClientRect());
}
function D0(e) {
  const t = Ad.get(e), n = $d.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function H0(e, t, n) {
  const i = e.cloneNode(), r = e[Oi];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = Td(i);
  return o.removeChild(i), l;
}
const z0 = /* @__PURE__ */ Be({ patchProp: A0 }, v0);
let Yu;
function j0() {
  return Yu || (Yu = Wg(z0));
}
const Ku = (...e) => {
  j0().render(...e);
};
var U0 = { value: () => {
} };
function Or() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new xo(n);
}
function xo(e) {
  this._ = e;
}
function W0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
xo.prototype = Or.prototype = {
  constructor: xo,
  on: function(e, t) {
    var n = this._, i = W0(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = G0(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = Xu(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Xu(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new xo(e);
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
function G0(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Xu(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = U0, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var xs = "http://www.w3.org/1999/xhtml";
const Zu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pl(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Zu.hasOwnProperty(t) ? { space: Zu[t], local: e } : e;
}
function q0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === xs && t.documentElement.namespaceURI === xs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Y0(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Od(e) {
  var t = pl(e);
  return (t.local ? Y0 : q0)(t);
}
function K0() {
}
function _a(e) {
  return e == null ? K0 : function() {
    return this.querySelector(e);
  };
}
function X0(e) {
  typeof e != "function" && (e = _a(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new wt(i, this._parents);
}
function Z0(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function J0() {
  return [];
}
function Bd(e) {
  return e == null ? J0 : function() {
    return this.querySelectorAll(e);
  };
}
function Q0(e) {
  return function() {
    return Z0(e.apply(this, arguments));
  };
}
function ey(e) {
  typeof e == "function" ? e = Q0(e) : e = Bd(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new wt(i, r);
}
function Fd(e) {
  return function() {
    return this.matches(e);
  };
}
function Dd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var ty = Array.prototype.find;
function ny(e) {
  return function() {
    return ty.call(this.children, e);
  };
}
function iy() {
  return this.firstElementChild;
}
function ry(e) {
  return this.select(e == null ? iy : ny(typeof e == "function" ? e : Dd(e)));
}
var oy = Array.prototype.filter;
function ly() {
  return Array.from(this.children);
}
function sy(e) {
  return function() {
    return oy.call(this.children, e);
  };
}
function ay(e) {
  return this.selectAll(e == null ? ly : sy(typeof e == "function" ? e : Dd(e)));
}
function uy(e) {
  typeof e != "function" && (e = Fd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new wt(i, this._parents);
}
function Hd(e) {
  return new Array(e.length);
}
function cy() {
  return new wt(this._enter || this._groups.map(Hd), this._parents);
}
function Bo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Bo.prototype = {
  constructor: Bo,
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
function fy(e) {
  return function() {
    return e;
  };
}
function dy(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new Bo(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function hy(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = o.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new Bo(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (r[s] = a);
}
function vy(e) {
  return e.__data__;
}
function my(e, t) {
  if (!arguments.length) return Array.from(this, vy);
  var n = t ? hy : dy, i = this._parents, r = this._groups;
  typeof e != "function" && (e = fy(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], d = r[u], f = d.length, h = gy(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), p = l[u] = new Array(v), g = a[u] = new Array(f);
    n(c, d, m, p, g, h, t);
    for (var w = 0, _ = 0, b, x; w < v; ++w)
      if (b = m[w]) {
        for (w >= _ && (_ = w + 1); !(x = p[_]) && ++_ < v; ) ;
        b._next = x || null;
      }
  }
  return l = new wt(l, i), l._enter = s, l._exit = a, l;
}
function gy(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function yy() {
  return new wt(this._exit || this._groups.map(Hd), this._parents);
}
function py(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function by(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new wt(s, this._parents);
}
function wy() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function xy(e) {
  e || (e = _y);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new wt(r, this._parents).order();
}
function _y(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Sy() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Cy() {
  return Array.from(this);
}
function ky() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function Ey() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Vy() {
  return !this.node();
}
function Ly(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function Py(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ty(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function My(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Iy(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ay(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function $y(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Ny(e, t) {
  var n = pl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Ty : Py : typeof t == "function" ? n.local ? $y : Ay : n.local ? Iy : My)(n, t));
}
function zd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ry(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Oy(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function By(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Fy(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Ry : typeof t == "function" ? By : Oy)(e, t, n ?? "")) : Bi(this.node(), e);
}
function Bi(e, t) {
  return e.style.getPropertyValue(t) || zd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Dy(e) {
  return function() {
    delete this[e];
  };
}
function Hy(e, t) {
  return function() {
    this[e] = t;
  };
}
function zy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function jy(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Dy : typeof t == "function" ? zy : Hy)(e, t)) : this.node()[e];
}
function jd(e) {
  return e.trim().split(/^|\s+/);
}
function Sa(e) {
  return e.classList || new Ud(e);
}
function Ud(e) {
  this._node = e, this._names = jd(e.getAttribute("class") || "");
}
Ud.prototype = {
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
function Wd(e, t) {
  for (var n = Sa(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function Gd(e, t) {
  for (var n = Sa(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function Uy(e) {
  return function() {
    Wd(this, e);
  };
}
function Wy(e) {
  return function() {
    Gd(this, e);
  };
}
function Gy(e, t) {
  return function() {
    (t.apply(this, arguments) ? Wd : Gd)(this, e);
  };
}
function qy(e, t) {
  var n = jd(e + "");
  if (arguments.length < 2) {
    for (var i = Sa(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Gy : t ? Uy : Wy)(n, t));
}
function Yy() {
  this.textContent = "";
}
function Ky(e) {
  return function() {
    this.textContent = e;
  };
}
function Xy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Zy(e) {
  return arguments.length ? this.each(e == null ? Yy : (typeof e == "function" ? Xy : Ky)(e)) : this.node().textContent;
}
function Jy() {
  this.innerHTML = "";
}
function Qy(e) {
  return function() {
    this.innerHTML = e;
  };
}
function e1(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function t1(e) {
  return arguments.length ? this.each(e == null ? Jy : (typeof e == "function" ? e1 : Qy)(e)) : this.node().innerHTML;
}
function n1() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function i1() {
  return this.each(n1);
}
function r1() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function o1() {
  return this.each(r1);
}
function l1(e) {
  var t = typeof e == "function" ? e : Od(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function s1() {
  return null;
}
function a1(e, t) {
  var n = typeof e == "function" ? e : Od(e), i = t == null ? s1 : typeof t == "function" ? t : _a(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function u1() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function c1() {
  return this.each(u1);
}
function f1() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function d1() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function h1(e) {
  return this.select(e ? d1 : f1);
}
function v1(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function m1(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function g1(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function y1(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function p1(e, t, n) {
  return function() {
    var i = this.__on, r, o = m1(t);
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
function b1(e, t, n) {
  var i = g1(e + ""), r, o = i.length, l;
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
  for (s = t ? p1 : y1, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function qd(e, t, n) {
  var i = zd(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function w1(e, t) {
  return function() {
    return qd(this, e, t);
  };
}
function x1(e, t) {
  return function() {
    return qd(this, e, t.apply(this, arguments));
  };
}
function _1(e, t) {
  return this.each((typeof t == "function" ? x1 : w1)(e, t));
}
function* S1() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var Yd = [null];
function wt(e, t) {
  this._groups = e, this._parents = t;
}
function Br() {
  return new wt([[document.documentElement]], Yd);
}
function C1() {
  return this;
}
wt.prototype = Br.prototype = {
  constructor: wt,
  select: X0,
  selectAll: ey,
  selectChild: ry,
  selectChildren: ay,
  filter: uy,
  data: my,
  enter: cy,
  exit: yy,
  join: py,
  merge: by,
  selection: C1,
  order: wy,
  sort: xy,
  call: Sy,
  nodes: Cy,
  node: ky,
  size: Ey,
  empty: Vy,
  each: Ly,
  attr: Ny,
  style: Fy,
  property: jy,
  classed: qy,
  text: Zy,
  html: t1,
  raise: i1,
  lower: o1,
  append: l1,
  insert: a1,
  remove: c1,
  clone: h1,
  datum: v1,
  on: b1,
  dispatch: _1,
  [Symbol.iterator]: S1
};
function Rt(e) {
  return typeof e == "string" ? new wt([[document.querySelector(e)]], [document.documentElement]) : new wt([[e]], Yd);
}
function Kd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Et(e, t) {
  if (e = Kd(e), t === void 0 && (t = e.currentTarget), t) {
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
function k1(e, t) {
  return e.target && (e = Kd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Et(n, t));
}
const E1 = { passive: !1 }, wr = { capture: !0, passive: !1 };
function Gl(e) {
  e.stopImmediatePropagation();
}
function Ii(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xd(e) {
  var t = e.document.documentElement, n = Rt(e).on("dragstart.drag", Ii, wr);
  "onselectstart" in t ? n.on("selectstart.drag", Ii, wr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Zd(e, t) {
  var n = e.document.documentElement, i = Rt(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Ii, wr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ro = (e) => () => e;
function _s(e, {
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
_s.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function V1(e) {
  return !e.ctrlKey && !e.button;
}
function L1() {
  return this.parentNode;
}
function P1(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function T1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function M1() {
  var e = V1, t = L1, n = P1, i = T1, r = {}, o = Or("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", p).on("touchmove.drag", g, E1).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, x) {
    if (!(c || !e.call(this, b, x))) {
      var V = _(this, t.call(this, b, x), b, x, "mouse");
      V && (Rt(b.view).on("mousemove.drag", v, wr).on("mouseup.drag", m, wr), Xd(b.view), Gl(b), u = !1, s = b.clientX, a = b.clientY, V("start", b));
    }
  }
  function v(b) {
    if (Ii(b), !u) {
      var x = b.clientX - s, V = b.clientY - a;
      u = x * x + V * V > d;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    Rt(b.view).on("mousemove.drag mouseup.drag", null), Zd(b.view, u), Ii(b), r.mouse("end", b);
  }
  function p(b, x) {
    if (e.call(this, b, x)) {
      var V = b.changedTouches, C = t.call(this, b, x), T = V.length, $, R;
      for ($ = 0; $ < T; ++$)
        (R = _(this, C, b, x, V[$].identifier, V[$])) && (Gl(b), R("start", b, V[$]));
    }
  }
  function g(b) {
    var x = b.changedTouches, V = x.length, C, T;
    for (C = 0; C < V; ++C)
      (T = r[x[C].identifier]) && (Ii(b), T("drag", b, x[C]));
  }
  function w(b) {
    var x = b.changedTouches, V = x.length, C, T;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), C = 0; C < V; ++C)
      (T = r[x[C].identifier]) && (Gl(b), T("end", b, x[C]));
  }
  function _(b, x, V, C, T, $) {
    var R = o.copy(), j = Et($ || V, x), L, N, S;
    if ((S = n.call(b, new _s("beforestart", {
      sourceEvent: V,
      target: f,
      identifier: T,
      active: l,
      x: j[0],
      y: j[1],
      dx: 0,
      dy: 0,
      dispatch: R
    }), C)) != null)
      return L = S.x - j[0] || 0, N = S.y - j[1] || 0, function B(I, W, A) {
        var D = j, O;
        switch (I) {
          case "start":
            r[T] = B, O = l++;
            break;
          case "end":
            delete r[T], --l;
          case "drag":
            j = Et(A || W, x), O = l;
            break;
        }
        R.call(
          I,
          b,
          new _s(I, {
            sourceEvent: W,
            subject: S,
            target: f,
            identifier: T,
            active: O,
            x: j[0] + L,
            y: j[1] + N,
            dx: j[0] - D[0],
            dy: j[1] - D[1],
            dispatch: R
          }),
          C
        );
      };
  }
  return f.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : ro(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : ro(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : ro(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : ro(!!b), f) : i;
  }, f.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function Ca(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Jd(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Fr() {
}
var xr = 0.7, Fo = 1 / xr, Ai = "\\s*([+-]?\\d+)\\s*", _r = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", rn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", I1 = /^#([0-9a-f]{3,8})$/, A1 = new RegExp(`^rgb\\(${Ai},${Ai},${Ai}\\)$`), $1 = new RegExp(`^rgb\\(${rn},${rn},${rn}\\)$`), N1 = new RegExp(`^rgba\\(${Ai},${Ai},${Ai},${_r}\\)$`), R1 = new RegExp(`^rgba\\(${rn},${rn},${rn},${_r}\\)$`), O1 = new RegExp(`^hsl\\(${_r},${rn},${rn}\\)$`), B1 = new RegExp(`^hsla\\(${_r},${rn},${rn},${_r}\\)$`), Ju = {
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
Ca(Fr, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qu,
  // Deprecated! Use color.formatHex.
  formatHex: Qu,
  formatHex8: F1,
  formatHsl: D1,
  formatRgb: ec,
  toString: ec
});
function Qu() {
  return this.rgb().formatHex();
}
function F1() {
  return this.rgb().formatHex8();
}
function D1() {
  return Qd(this).formatHsl();
}
function ec() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = I1.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? tc(t) : n === 3 ? new ct(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? oo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? oo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = A1.exec(e)) ? new ct(t[1], t[2], t[3], 1) : (t = $1.exec(e)) ? new ct(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = N1.exec(e)) ? oo(t[1], t[2], t[3], t[4]) : (t = R1.exec(e)) ? oo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = O1.exec(e)) ? rc(t[1], t[2] / 100, t[3] / 100, 1) : (t = B1.exec(e)) ? rc(t[1], t[2] / 100, t[3] / 100, t[4]) : Ju.hasOwnProperty(e) ? tc(Ju[e]) : e === "transparent" ? new ct(NaN, NaN, NaN, 0) : null;
}
function tc(e) {
  return new ct(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function oo(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new ct(e, t, n, i);
}
function H1(e) {
  return e instanceof Fr || (e = Sr(e)), e ? (e = e.rgb(), new ct(e.r, e.g, e.b, e.opacity)) : new ct();
}
function Ss(e, t, n, i) {
  return arguments.length === 1 ? H1(e) : new ct(e, t, n, i ?? 1);
}
function ct(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Ca(ct, Ss, Jd(Fr, {
  brighter(e) {
    return e = e == null ? Fo : Math.pow(Fo, e), new ct(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xr : Math.pow(xr, e), new ct(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ct(ai(this.r), ai(this.g), ai(this.b), Do(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: nc,
  // Deprecated! Use color.formatHex.
  formatHex: nc,
  formatHex8: z1,
  formatRgb: ic,
  toString: ic
}));
function nc() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}`;
}
function z1() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}${ii((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ic() {
  const e = Do(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ai(this.r)}, ${ai(this.g)}, ${ai(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Do(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ai(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ii(e) {
  return e = ai(e), (e < 16 ? "0" : "") + e.toString(16);
}
function rc(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ot(e, t, n, i);
}
function Qd(e) {
  if (e instanceof Ot) return new Ot(e.h, e.s, e.l, e.opacity);
  if (e instanceof Fr || (e = Sr(e)), !e) return new Ot();
  if (e instanceof Ot) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new Ot(l, s, a, e.opacity);
}
function j1(e, t, n, i) {
  return arguments.length === 1 ? Qd(e) : new Ot(e, t, n, i ?? 1);
}
function Ot(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Ca(Ot, j1, Jd(Fr, {
  brighter(e) {
    return e = e == null ? Fo : Math.pow(Fo, e), new Ot(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xr : Math.pow(xr, e), new Ot(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new ct(
      ql(e >= 240 ? e - 240 : e + 120, r, i),
      ql(e, r, i),
      ql(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Ot(oc(this.h), lo(this.s), lo(this.l), Do(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Do(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${oc(this.h)}, ${lo(this.s) * 100}%, ${lo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function oc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function lo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ql(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const eh = (e) => () => e;
function U1(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function W1(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function G1(e) {
  return (e = +e) == 1 ? th : function(t, n) {
    return n - t ? W1(t, n, e) : eh(isNaN(t) ? n : t);
  };
}
function th(e, t) {
  var n = t - e;
  return n ? U1(e, n) : eh(isNaN(e) ? t : e);
}
const lc = function e(t) {
  var n = G1(t);
  function i(r, o) {
    var l = n((r = Ss(r)).r, (o = Ss(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = th(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function Rn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Cs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Yl = new RegExp(Cs.source, "g");
function q1(e) {
  return function() {
    return e;
  };
}
function Y1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function K1(e, t) {
  var n = Cs.lastIndex = Yl.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = Cs.exec(e)) && (r = Yl.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: Rn(i, r) })), n = Yl.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? Y1(a[0].x) : q1(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c) s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
var sc = 180 / Math.PI, ks = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function nh(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * sc,
    skewX: Math.atan(a) * sc,
    scaleX: l,
    scaleY: s
  };
}
var so;
function X1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ks : nh(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Z1(e) {
  return e == null || (so || (so = document.createElementNS("http://www.w3.org/2000/svg", "g")), so.setAttribute("transform", e), !(e = so.transform.baseVal.consolidate())) ? ks : (e = e.matrix, nh(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ih(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: Rn(u, d) }, { i: m - 2, x: Rn(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function l(u, c, d, f) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), f.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: Rn(u, c) })) : c && d.push(r(d) + "rotate(" + c + i);
  }
  function s(u, c, d, f) {
    u !== c ? f.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: Rn(u, c) }) : c && d.push(r(d) + "skewX(" + c + i);
  }
  function a(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: Rn(u, d) }, { i: m - 2, x: Rn(c, f) });
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
var J1 = ih(X1, "px, ", "px)", "deg)"), Q1 = ih(Z1, ", ", ")", ")"), ep = 1e-12;
function ac(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function tp(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function np(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ip = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, m = h * h + v * v, p, g;
    if (m < ep)
      g = Math.log(f / u) / t, p = function(C) {
        return [
          s + C * h,
          a + C * v,
          u * Math.exp(t * C * g)
        ];
      };
    else {
      var w = Math.sqrt(m), _ = (f * f - u * u + i * m) / (2 * u * n * w), b = (f * f - u * u - i * m) / (2 * f * n * w), x = Math.log(Math.sqrt(_ * _ + 1) - _), V = Math.log(Math.sqrt(b * b + 1) - b);
      g = (V - x) / t, p = function(C) {
        var T = C * g, $ = ac(x), R = u / (n * w) * ($ * np(t * T + x) - tp(x));
        return [
          s + R * h,
          a + R * v,
          u * $ / ac(t * T + x)
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
var Fi = 0, rr = 0, Qi = 0, rh = 1e3, Ho, or, zo = 0, di = 0, bl = 0, Cr = typeof performance == "object" && performance.now ? performance : Date, oh = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ka() {
  return di || (oh(rp), di = Cr.now() + bl);
}
function rp() {
  di = 0;
}
function jo() {
  this._call = this._time = this._next = null;
}
jo.prototype = Ea.prototype = {
  constructor: jo,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ka() : +n) + (t == null ? 0 : +t), !this._next && or !== this && (or ? or._next = this : Ho = this, or = this), this._call = e, this._time = n, Es();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Es());
  }
};
function Ea(e, t, n) {
  var i = new jo();
  return i.restart(e, t, n), i;
}
function op() {
  ka(), ++Fi;
  for (var e = Ho, t; e; )
    (t = di - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Fi;
}
function uc() {
  di = (zo = Cr.now()) + bl, Fi = rr = 0;
  try {
    op();
  } finally {
    Fi = 0, sp(), di = 0;
  }
}
function lp() {
  var e = Cr.now(), t = e - zo;
  t > rh && (bl -= t, zo = e);
}
function sp() {
  for (var e, t = Ho, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Ho = n);
  or = e, Es(i);
}
function Es(e) {
  if (!Fi) {
    rr && (rr = clearTimeout(rr));
    var t = e - di;
    t > 24 ? (e < 1 / 0 && (rr = setTimeout(uc, e - Cr.now() - bl)), Qi && (Qi = clearInterval(Qi))) : (Qi || (zo = Cr.now(), Qi = setInterval(lp, rh)), Fi = 1, oh(uc));
  }
}
function cc(e, t, n) {
  var i = new jo();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var ap = Or("start", "end", "cancel", "interrupt"), up = [], lh = 0, fc = 1, Vs = 2, _o = 3, dc = 4, Ls = 5, So = 6;
function wl(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  cp(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: ap,
    tween: up,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: lh
  });
}
function Va(e, t) {
  var n = Gt(e, t);
  if (n.state > lh) throw new Error("too late; already scheduled");
  return n;
}
function un(e, t) {
  var n = Gt(e, t);
  if (n.state > _o) throw new Error("too late; already running");
  return n;
}
function Gt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function cp(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = Ea(o, 0, n.time);
  function o(u) {
    n.state = fc, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== fc) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === _o) return cc(l);
        h.state === dc ? (h.state = So, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = So, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (cc(function() {
      n.state === _o && (n.state = dc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = Vs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Vs) {
      for (n.state = _o, r = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = h);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = Ls, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(e, c);
    n.state === Ls && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = So, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function Co(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > Vs && i.state < Ls, i.state = So, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function fp(e) {
  return this.each(function() {
    Co(this, e);
  });
}
function dp(e, t) {
  var n, i;
  return function() {
    var r = un(this, e), o = r.tween;
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
function hp(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = un(this, e), l = o.tween;
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
function vp(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Gt(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? dp : hp)(n, e, t));
}
function La(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = un(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return Gt(r, i).value[t];
  };
}
function sh(e, t) {
  var n;
  return (typeof t == "number" ? Rn : t instanceof Sr ? lc : (n = Sr(t)) ? (t = n, lc) : K1)(e, t);
}
function mp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function gp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function yp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function pp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function bp(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function wp(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function xp(e, t) {
  var n = pl(e), i = n === "transform" ? Q1 : sh;
  return this.attrTween(e, typeof t == "function" ? (n.local ? wp : bp)(n, i, La(this, "attr." + e, t)) : t == null ? (n.local ? gp : mp)(n) : (n.local ? pp : yp)(n, i, t));
}
function _p(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Sp(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Cp(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Sp(e, o)), n;
  }
  return r._value = t, r;
}
function kp(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && _p(e, o)), n;
  }
  return r._value = t, r;
}
function Ep(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = pl(e);
  return this.tween(n, (i.local ? Cp : kp)(i, t));
}
function Vp(e, t) {
  return function() {
    Va(this, e).delay = +t.apply(this, arguments);
  };
}
function Lp(e, t) {
  return t = +t, function() {
    Va(this, e).delay = t;
  };
}
function Pp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Vp : Lp)(t, e)) : Gt(this.node(), t).delay;
}
function Tp(e, t) {
  return function() {
    un(this, e).duration = +t.apply(this, arguments);
  };
}
function Mp(e, t) {
  return t = +t, function() {
    un(this, e).duration = t;
  };
}
function Ip(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Tp : Mp)(t, e)) : Gt(this.node(), t).duration;
}
function Ap(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    un(this, e).ease = t;
  };
}
function $p(e) {
  var t = this._id;
  return arguments.length ? this.each(Ap(t, e)) : Gt(this.node(), t).ease;
}
function Np(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    un(this, e).ease = n;
  };
}
function Rp(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Np(this._id, e));
}
function Op(e) {
  typeof e != "function" && (e = Fd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new xn(i, this._parents, this._name, this._id);
}
function Bp(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < i; ++s)
    l[s] = t[s];
  return new xn(l, this._parents, this._name, this._id);
}
function Fp(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Dp(e, t, n) {
  var i, r, o = Fp(t) ? Va : un;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function Hp(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Gt(this.node(), n).on.on(e) : this.each(Dp(n, e, t));
}
function zp(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function jp() {
  return this.on("end.remove", zp(this._id));
}
function Up(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = _a(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, wl(u[f], t, n, f, u, Gt(c, n)));
  return new xn(o, this._parents, t, n);
}
function Wp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Bd(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = Gt(c, n), m = 0, p = f.length; m < p; ++m)
          (h = f[m]) && wl(h, t, n, m, f, v);
        o.push(f), l.push(c);
      }
  return new xn(o, l, t, n);
}
var Gp = Br.prototype.constructor;
function qp() {
  return new Gp(this._groups, this._parents);
}
function Yp(e, t) {
  var n, i, r;
  return function() {
    var o = Bi(this, e), l = (this.style.removeProperty(e), Bi(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function ah(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Kp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = Bi(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function Xp(e, t, n) {
  var i, r, o;
  return function() {
    var l = Bi(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), Bi(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function Zp(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = un(this, e), u = a.on, c = a.value[o] == null ? s || (s = ah(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function Jp(e, t, n) {
  var i = (e += "") == "transform" ? J1 : sh;
  return t == null ? this.styleTween(e, Yp(e, i)).on("end.style." + e, ah(e)) : typeof t == "function" ? this.styleTween(e, Xp(e, i, La(this, "style." + e, t))).each(Zp(this._id, e)) : this.styleTween(e, Kp(e, i, t), n).on("end.style." + e, null);
}
function Qp(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function eb(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && Qp(e, l, n)), i;
  }
  return o._value = t, o;
}
function tb(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, eb(e, t, n ?? ""));
}
function nb(e) {
  return function() {
    this.textContent = e;
  };
}
function ib(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function rb(e) {
  return this.tween("text", typeof e == "function" ? ib(La(this, "text", e)) : nb(e == null ? "" : e + ""));
}
function ob(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function lb(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && ob(r)), t;
  }
  return i._value = e, i;
}
function sb(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, lb(e));
}
function ab() {
  for (var e = this._name, t = this._id, n = uh(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = Gt(a, t);
        wl(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new xn(i, this._parents, e, n);
}
function ub() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = un(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var cb = 0;
function xn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function uh() {
  return ++cb;
}
var hn = Br.prototype;
xn.prototype = {
  constructor: xn,
  select: Up,
  selectAll: Wp,
  selectChild: hn.selectChild,
  selectChildren: hn.selectChildren,
  filter: Op,
  merge: Bp,
  selection: qp,
  transition: ab,
  call: hn.call,
  nodes: hn.nodes,
  node: hn.node,
  size: hn.size,
  empty: hn.empty,
  each: hn.each,
  on: Hp,
  attr: xp,
  attrTween: Ep,
  style: Jp,
  styleTween: tb,
  text: rb,
  textTween: sb,
  remove: jp,
  tween: vp,
  delay: Pp,
  duration: Ip,
  ease: $p,
  easeVarying: Rp,
  end: ub,
  [Symbol.iterator]: hn[Symbol.iterator]
};
function fb(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var db = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: fb
};
function hb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function vb(e) {
  var t, n;
  e instanceof xn ? (t = e._id, e = e._name) : (t = uh(), (n = db).time = ka(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && wl(a, e, t, u, l, n || hb(a, t));
  return new xn(i, this._parents, e, t);
}
Br.prototype.interrupt = fp;
Br.prototype.transition = vb;
const Ps = Math.PI, Ts = 2 * Ps, Zn = 1e-6, mb = Ts - Zn;
function ch(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function gb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return ch;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class yb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? ch : gb(t);
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
    else if (f > Zn) if (!(Math.abs(d * a - u * c) > Zn) || !o)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = i - l, v = r - s, m = a * a + u * u, p = h * h + v * v, g = Math.sqrt(m), w = Math.sqrt(f), _ = o * Math.tan((Ps - Math.acos((m + f - p) / (2 * g * w))) / 2), b = _ / w, x = _ / g;
      Math.abs(b - 1) > Zn && this._append`L${t + b * c},${n + b * d}`, this._append`A${o},${o},0,0,${+(d * h > c * v)},${this._x1 = t + x * a},${this._y1 = n + x * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, d = 1 ^ l, f = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > Zn || Math.abs(this._y1 - c) > Zn) && this._append`L${u},${c}`, i && (f < 0 && (f = f % Ts + Ts), f > mb ? this._append`A${i},${i},0,1,${d},${t - s},${n - a}A${i},${i},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > Zn && this._append`A${i},${i},0,${+(f >= Ps)},${d},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function pb(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return fh(this.cover(t, n), t, n, e);
}
function fh(e, t, n, i) {
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
function bb(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > d && (d = o));
  if (a > c || u > d) return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < i; ++n)
    fh(this, l[n], s[n], e[n]);
  return this;
}
function wb(e, t) {
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
function xb() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function _b(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function it(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function Sb(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, d = this._y1, f = [], h = this._root, v, m;
  for (h && f.push(new it(h, r, o, c, d)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, d = t + n, n *= n); v = f.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > d || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var p = (l + a) / 2, g = (s + u) / 2;
        f.push(
          new it(h[3], p, g, a, u),
          new it(h[2], l, g, p, u),
          new it(h[1], p, s, a, g),
          new it(h[0], l, s, p, g)
        ), (m = (t >= g) << 1 | e >= p) && (v = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - m], f[f.length - 1 - m] = v);
      } else {
        var w = e - +this._x.call(null, h.data), _ = t - +this._y.call(null, h.data), b = w * w + _ * _;
        if (b < n) {
          var x = Math.sqrt(n = b);
          r = e - x, o = t - x, c = e + x, d = t + x, i = h.data;
        }
      }
  return i;
}
function Cb(e) {
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
function kb(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Eb() {
  return this._root;
}
function Vb() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Lb(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new it(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new it(r, u, c, s, a)), (r = i[2]) && t.push(new it(r, o, c, u, a)), (r = i[1]) && t.push(new it(r, u, l, s, c)), (r = i[0]) && t.push(new it(r, o, l, u, c));
    }
  return this;
}
function Pb(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new it(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, d = (s + u) / 2;
      (o = r[0]) && t.push(new it(o, l, s, c, d)), (o = r[1]) && t.push(new it(o, c, s, a, d)), (o = r[2]) && t.push(new it(o, l, d, c, u)), (o = r[3]) && t.push(new it(o, c, d, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function Tb(e) {
  return e[0];
}
function Mb(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Ib(e) {
  return e[1];
}
function Ab(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Pa(e, t, n) {
  var i = new Ta(t ?? Tb, n ?? Ib, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Ta(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function hc(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var at = Pa.prototype = Ta.prototype;
at.copy = function() {
  var e = new Ta(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = hc(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = hc(i));
  return e;
};
at.add = pb;
at.addAll = bb;
at.cover = wb;
at.data = xb;
at.extent = _b;
at.find = Sb;
at.remove = Cb;
at.removeAll = kb;
at.root = Eb;
at.size = Vb;
at.visit = Lb;
at.visitAfter = Pb;
at.x = Mb;
at.y = Ab;
function ot(e) {
  return function() {
    return e;
  };
}
function On(e) {
  return (e() - 0.5) * 1e-6;
}
function $b(e) {
  return e.x + e.vx;
}
function Nb(e) {
  return e.y + e.vy;
}
function Rb(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = ot(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, m, p, g = 0; g < o; ++g)
      for (d = Pa(t, $b, Nb).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], m = n[f.index], p = m * m, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(_, b, x, V, C) {
      var T = _.data, $ = _.r, R = m + $;
      if (T) {
        if (T.index > f.index) {
          var j = h - T.x - T.vx, L = v - T.y - T.vy, N = j * j + L * L;
          N < R * R && (j === 0 && (j = On(i), N += j * j), L === 0 && (L = On(i), N += L * L), N = (R - (N = Math.sqrt(N))) / N * r, f.vx += (j *= N) * (R = ($ *= $) / (p + $)), f.vy += (L *= N) * R, T.vx -= j * (R = 1 - R), T.vy -= L * R);
        }
        return;
      }
      return b > h + R || V < h - R || x > v + R || C < v - R;
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
    return arguments.length ? (e = typeof u == "function" ? u : ot(+u), a(), l) : e;
  }, l;
}
function Ob(e) {
  return e.index;
}
function vc(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Bb(e) {
  var t = Ob, n = d, i, r = ot(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function f(p) {
    for (var g = 0, w = e.length; g < c; ++g)
      for (var _ = 0, b, x, V, C, T, $, R; _ < w; ++_)
        b = e[_], x = b.source, V = b.target, C = V.x + V.vx - x.x - x.vx || On(u), T = V.y + V.vy - x.y - x.vy || On(u), $ = Math.sqrt(C * C + T * T), $ = ($ - o[_]) / $ * p * i[_], C *= $, T *= $, V.vx -= C * (R = a[_]), V.vy -= T * R, x.vx += C * (R = 1 - R), x.vy += T * R;
  }
  function h() {
    if (l) {
      var p, g = l.length, w = e.length, _ = new Map(l.map((x, V) => [t(x, V, l), x])), b;
      for (p = 0, s = new Array(g); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = vc(_, b.source)), typeof b.target != "object" && (b.target = vc(_, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
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
    return arguments.length ? (n = typeof p == "function" ? p : ot(+p), v(), f) : n;
  }, f.distance = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : ot(+p), m(), f) : r;
  }, f;
}
const Fb = 1664525, Db = 1013904223, mc = 4294967296;
function Hb() {
  let e = 1;
  return () => (e = (Fb * e + Db) % mc) / mc;
}
function zb(e) {
  return e.x;
}
function jb(e) {
  return e.y;
}
var Ub = 10, Wb = Math.PI * (3 - Math.sqrt(5));
function Gb(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Ea(d), u = Or("tick", "end"), c = Hb();
  e == null && (e = []);
  function d() {
    f(), u.call("tick", t), n < i && (a.stop(), u.call("end", t));
  }
  function f(m) {
    var p, g = e.length, w;
    m === void 0 && (m = 1);
    for (var _ = 0; _ < m; ++_)
      for (n += (o - n) * r, s.forEach(function(b) {
        b(n);
      }), p = 0; p < g; ++p)
        w = e[p], w.fx == null ? w.x += w.vx *= l : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= l : (w.y = w.fy, w.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, p = e.length, g; m < p; ++m) {
      if (g = e[m], g.index = m, g.fx != null && (g.x = g.fx), g.fy != null && (g.y = g.fy), isNaN(g.x) || isNaN(g.y)) {
        var w = Ub * Math.sqrt(0.5 + m), _ = m * Wb;
        g.x = w * Math.cos(_), g.y = w * Math.sin(_);
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
      var w = 0, _ = e.length, b, x, V, C, T;
      for (g == null ? g = 1 / 0 : g *= g, w = 0; w < _; ++w)
        C = e[w], b = m - C.x, x = p - C.y, V = b * b + x * x, V < g && (T = C, g = V);
      return T;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function qb() {
  var e, t, n, i, r = ot(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, p = Pa(e, zb, jb).visitAfter(d);
    for (i = h, v = 0; v < m; ++v) t = e[v], p.visit(f);
  }
  function c() {
    if (e) {
      var h, v = e.length, m;
      for (o = new Array(v), h = 0; h < v; ++h) m = e[h], o[m.index] = +r(m, h, e);
    }
  }
  function d(h) {
    var v = 0, m, p, g = 0, w, _, b;
    if (h.length) {
      for (w = _ = b = 0; b < 4; ++b)
        (m = h[b]) && (p = Math.abs(m.value)) && (v += m.value, g += p, w += p * m.x, _ += p * m.y);
      h.x = w / g, h.y = _ / g;
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
    var g = h.x - t.x, w = h.y - t.y, _ = p - v, b = g * g + w * w;
    if (_ * _ / a < b)
      return b < s && (g === 0 && (g = On(n), b += g * g), w === 0 && (w = On(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += g * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (g === 0 && (g = On(n), b += g * g), w === 0 && (w = On(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (_ = o[h.data.index] * i / b, t.vx += g * _, t.vy += w * _);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : ot(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function Yb(e) {
  var t = ot(0.1), n, i, r;
  typeof e != "function" && (e = ot(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ot(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ot(+s), l(), o) : e;
  }, o;
}
function Kb(e) {
  var t = ot(0.1), n, i, r;
  typeof e != "function" && (e = ot(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ot(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ot(+s), l(), o) : e;
  }, o;
}
function xi(e) {
  return function() {
    return e;
  };
}
function Xb(e) {
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
  }, () => new yb(t);
}
function Zb(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function dh(e) {
  this._context = e;
}
dh.prototype = {
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
function Jb(e) {
  return new dh(e);
}
function Qb(e) {
  return e[0];
}
function ew(e) {
  return e[1];
}
function tw(e, t) {
  var n = xi(!0), i = null, r = Jb, o = null, l = Xb(s);
  e = typeof e == "function" ? e : e === void 0 ? Qb : xi(e), t = typeof t == "function" ? t : t === void 0 ? ew : xi(t);
  function s(a) {
    var u, c = (a = Zb(a)).length, d, f = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(d = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+e(d, u, a), +t(d, u, a));
    if (h) return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : xi(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : xi(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : xi(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const ao = (e) => () => e;
function nw(e, {
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
function gn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
gn.prototype = {
  constructor: gn,
  scale: function(e) {
    return e === 1 ? this : new gn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new gn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var hh = new gn(1, 0, 0);
gn.prototype;
function Kl(e) {
  e.stopImmediatePropagation();
}
function er(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function iw(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function rw() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function gc() {
  return this.__zoom || hh;
}
function ow(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function lw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function sw(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function aw() {
  var e = iw, t = rw, n = sw, i = ow, r = lw, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = ip, u = Or("start", "zoom", "end"), c, d, f, h = 500, v = 150, m = 0, p = 10;
  function g(S) {
    S.property("__zoom", gc).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", j).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(S, B, I, W) {
    var A = S.selection ? S.selection() : S;
    A.property("__zoom", gc), S !== A ? x(S, B, I, W) : A.interrupt().each(function() {
      V(this, arguments).event(W).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, g.scaleBy = function(S, B, I, W) {
    g.scaleTo(S, function() {
      var A = this.__zoom.k, D = typeof B == "function" ? B.apply(this, arguments) : B;
      return A * D;
    }, I, W);
  }, g.scaleTo = function(S, B, I, W) {
    g.transform(S, function() {
      var A = t.apply(this, arguments), D = this.__zoom, O = I == null ? b(A) : typeof I == "function" ? I.apply(this, arguments) : I, U = D.invert(O), Y = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(_(w(D, Y), O, U), A, l);
    }, I, W);
  }, g.translateBy = function(S, B, I, W) {
    g.transform(S, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), l);
    }, null, W);
  }, g.translateTo = function(S, B, I, W, A) {
    g.transform(S, function() {
      var D = t.apply(this, arguments), O = this.__zoom, U = W == null ? b(D) : typeof W == "function" ? W.apply(this, arguments) : W;
      return n(hh.translate(U[0], U[1]).scale(O.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), D, l);
    }, W, A);
  };
  function w(S, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === S.k ? S : new gn(B, S.x, S.y);
  }
  function _(S, B, I) {
    var W = B[0] - I[0] * S.k, A = B[1] - I[1] * S.k;
    return W === S.x && A === S.y ? S : new gn(S.k, W, A);
  }
  function b(S) {
    return [(+S[0][0] + +S[1][0]) / 2, (+S[0][1] + +S[1][1]) / 2];
  }
  function x(S, B, I, W) {
    S.on("start.zoom", function() {
      V(this, arguments).event(W).start();
    }).on("interrupt.zoom end.zoom", function() {
      V(this, arguments).event(W).end();
    }).tween("zoom", function() {
      var A = this, D = arguments, O = V(A, D).event(W), U = t.apply(A, D), Y = I == null ? b(U) : typeof I == "function" ? I.apply(A, D) : I, Q = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), le = A.__zoom, ve = typeof B == "function" ? B.apply(A, D) : B, J = a(le.invert(Y).concat(Q / le.k), ve.invert(Y).concat(Q / ve.k));
      return function(ue) {
        if (ue === 1) ue = ve;
        else {
          var ke = J(ue), ze = Q / ke[2];
          ue = new gn(ze, Y[0] - ke[0] * ze, Y[1] - ke[1] * ze);
        }
        O.zoom(null, ue);
      };
    });
  }
  function V(S, B, I) {
    return !I && S.__zooming || new C(S, B);
  }
  function C(S, B) {
    this.that = S, this.args = B, this.active = 0, this.sourceEvent = null, this.extent = t.apply(S, B), this.taps = 0;
  }
  C.prototype = {
    event: function(S) {
      return S && (this.sourceEvent = S), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(S, B) {
      return this.mouse && S !== "mouse" && (this.mouse[1] = B.invert(this.mouse[0])), this.touch0 && S !== "touch" && (this.touch0[1] = B.invert(this.touch0[0])), this.touch1 && S !== "touch" && (this.touch1[1] = B.invert(this.touch1[0])), this.that.__zoom = B, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(S) {
      var B = Rt(this.that).datum();
      u.call(
        S,
        this.that,
        new nw(S, {
          sourceEvent: this.sourceEvent,
          target: g,
          type: S,
          transform: this.that.__zoom,
          dispatch: u
        }),
        B
      );
    }
  };
  function T(S, ...B) {
    if (!e.apply(this, arguments)) return;
    var I = V(this, B).event(S), W = this.__zoom, A = Math.max(o[0], Math.min(o[1], W.k * Math.pow(2, i.apply(this, arguments)))), D = Et(S);
    if (I.wheel)
      (I.mouse[0][0] !== D[0] || I.mouse[0][1] !== D[1]) && (I.mouse[1] = W.invert(I.mouse[0] = D)), clearTimeout(I.wheel);
    else {
      if (W.k === A) return;
      I.mouse = [D, W.invert(D)], Co(this), I.start();
    }
    er(S), I.wheel = setTimeout(O, v), I.zoom("mouse", n(_(w(W, A), I.mouse[0], I.mouse[1]), I.extent, l));
    function O() {
      I.wheel = null, I.end();
    }
  }
  function $(S, ...B) {
    if (f || !e.apply(this, arguments)) return;
    var I = S.currentTarget, W = V(this, B, !0).event(S), A = Rt(S.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", Q, !0), D = Et(S, I), O = S.clientX, U = S.clientY;
    Xd(S.view), Kl(S), W.mouse = [D, this.__zoom.invert(D)], Co(this), W.start();
    function Y(le) {
      if (er(le), !W.moved) {
        var ve = le.clientX - O, J = le.clientY - U;
        W.moved = ve * ve + J * J > m;
      }
      W.event(le).zoom("mouse", n(_(W.that.__zoom, W.mouse[0] = Et(le, I), W.mouse[1]), W.extent, l));
    }
    function Q(le) {
      A.on("mousemove.zoom mouseup.zoom", null), Zd(le.view, W.moved), er(le), W.event(le).end();
    }
  }
  function R(S, ...B) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, W = Et(S.changedTouches ? S.changedTouches[0] : S, this), A = I.invert(W), D = I.k * (S.shiftKey ? 0.5 : 2), O = n(_(w(I, D), W, A), t.apply(this, B), l);
      er(S), s > 0 ? Rt(this).transition().duration(s).call(x, O, W, S) : Rt(this).call(g.transform, O, W, S);
    }
  }
  function j(S, ...B) {
    if (e.apply(this, arguments)) {
      var I = S.touches, W = I.length, A = V(this, B, S.changedTouches.length === W).event(S), D, O, U, Y;
      for (Kl(S), O = 0; O < W; ++O)
        U = I[O], Y = Et(U, this), Y = [Y, this.__zoom.invert(Y), U.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== Y[2] && (A.touch1 = Y, A.taps = 0) : (A.touch0 = Y, D = !0, A.taps = 1 + !!c);
      c && (c = clearTimeout(c)), D && (A.taps < 2 && (d = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), Co(this), A.start());
    }
  }
  function L(S, ...B) {
    if (this.__zooming) {
      var I = V(this, B).event(S), W = S.changedTouches, A = W.length, D, O, U, Y;
      for (er(S), D = 0; D < A; ++D)
        O = W[D], U = Et(O, this), I.touch0 && I.touch0[2] === O.identifier ? I.touch0[0] = U : I.touch1 && I.touch1[2] === O.identifier && (I.touch1[0] = U);
      if (O = I.that.__zoom, I.touch1) {
        var Q = I.touch0[0], le = I.touch0[1], ve = I.touch1[0], J = I.touch1[1], ue = (ue = ve[0] - Q[0]) * ue + (ue = ve[1] - Q[1]) * ue, ke = (ke = J[0] - le[0]) * ke + (ke = J[1] - le[1]) * ke;
        O = w(O, Math.sqrt(ue / ke)), U = [(Q[0] + ve[0]) / 2, (Q[1] + ve[1]) / 2], Y = [(le[0] + J[0]) / 2, (le[1] + J[1]) / 2];
      } else if (I.touch0) U = I.touch0[0], Y = I.touch0[1];
      else return;
      I.zoom("touch", n(_(O, U, Y), I.extent, l));
    }
  }
  function N(S, ...B) {
    if (this.__zooming) {
      var I = V(this, B).event(S), W = S.changedTouches, A = W.length, D, O;
      for (Kl(S), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), D = 0; D < A; ++D)
        O = W[D], I.touch0 && I.touch0[2] === O.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === O.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (O = Et(O, this), Math.hypot(d[0] - O[0], d[1] - O[1]) < p)) {
        var U = Rt(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : ao(+S), g) : i;
  }, g.filter = function(S) {
    return arguments.length ? (e = typeof S == "function" ? S : ao(!!S), g) : e;
  }, g.touchable = function(S) {
    return arguments.length ? (r = typeof S == "function" ? S : ao(!!S), g) : r;
  }, g.extent = function(S) {
    return arguments.length ? (t = typeof S == "function" ? S : ao([[+S[0][0], +S[0][1]], [+S[1][0], +S[1][1]]]), g) : t;
  }, g.scaleExtent = function(S) {
    return arguments.length ? (o[0] = +S[0], o[1] = +S[1], g) : [o[0], o[1]];
  }, g.translateExtent = function(S) {
    return arguments.length ? (l[0][0] = +S[0][0], l[1][0] = +S[1][0], l[0][1] = +S[0][1], l[1][1] = +S[1][1], g) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, g.constrain = function(S) {
    return arguments.length ? (n = S, g) : n;
  }, g.duration = function(S) {
    return arguments.length ? (s = +S, g) : s;
  }, g.interpolate = function(S) {
    return arguments.length ? (a = S, g) : a;
  }, g.on = function() {
    var S = u.on.apply(u, arguments);
    return S === u ? g : S;
  }, g.clickDistance = function(S) {
    return arguments.length ? (m = (S = +S) * S, g) : Math.sqrt(m);
  }, g.tapDistance = function(S) {
    return arguments.length ? (p = +S, g) : p;
  }, g;
}
class vh {
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
var mt = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(mt || {});
class uw {
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
    Ye(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class yc {
  constructor() {
    Ye(this, "nodeIdCounter", 0);
    Ye(this, "nodes", []);
    Ye(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new vh(
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
    const a = new uw(l, s, void 0, i, r);
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
  /** Formats the Graph in Trivial Graph Format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, i = !1, r = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "Graph is empty";
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
}
function cw(e, t) {
  let n = aw().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return fw(n, e, t);
}
function fw(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
function ei(e) {
  e.preventDefault(), e.stopPropagation();
}
function dw(e, t, n, i) {
  return M1().filter((r) => r.button === 2).on("start", (r, o) => {
    ei(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function hw(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => ei(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function vw(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function mw(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function kr(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function gw(e, t, n) {
  if (dr(e, t, "link-arrow", "arrow", !1), dr(e, t, "link-arrow-reverse", "arrow", !0), dr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      Ms(e, t, i);
}
function Ms(e, t, n) {
  e.select("#link-arrow-" + kr(n)).empty() && (dr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), dr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function Xl(e, t) {
  e.select("#link-arrow-" + kr(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + kr(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function dr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${tw()(t.arrowPoints)}`).style("fill", o || "");
}
function yw(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function pw(e, t, n, i, r) {
  let o = Gb(e.nodes).on("tick", () => r()).force(
    "collision",
    Rb().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = bw(e, o, n, i, t), o = gh(o, e, t, t.fixedLinkDistanceEnabled), o = mh(o, t.nodePhysicsEnabled, n, i), o;
}
function bw(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function mh(e, t, n, i) {
  return t ? e.force("charge", qb().strength(-500)).force("x", Yb(n / 2).strength(0.05)).force("y", Kb(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function gh(e, t, n, i) {
  return i ? e.force(
    "link",
    Bb().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class ww {
  constructor() {
    Ye(this, "persistSettingsLocalStorage", !1);
    Ye(this, "hasToolbar", !0);
    Ye(this, "nodeRadius", 24);
    Ye(this, "showNodeLabels", !0);
    Ye(this, "nodePhysicsEnabled", !1);
    Ye(this, "zoomEnabled", !0);
    Ye(this, "showLinkLabels", !0);
    Ye(this, "fixedLinkDistanceEnabled", !1);
    Ye(this, "markerBoxSize", 4);
    Ye(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Ye(this, "markerRef", this.markerBoxSize / 2);
    Ye(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Ye(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
const xw = Object.prototype.toString;
function Uo(e) {
  const t = xw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function _w(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Uo(e))
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
function Sw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Uo(e))
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
function pc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Uo(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Uo(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = Sw(e), r = _w(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const uo = " ".repeat(2), yh = " ".repeat(4);
function Cw() {
  return ph(this);
}
function ph(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${uo}[
${yh}${kw(e, n, i, r)}
${uo}]
${uo}rows: ${e.rows}
${uo}columns: ${e.columns}
}`;
}
function kw(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push(Ew(e.get(u, d), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${yh}`);
}
function Ew(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function Vw(e, t) {
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
function At(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function $t(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function ki(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function Ei(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Lw(e, t, n) {
  return {
    row: Pw(e, t),
    column: Tw(e, n)
  };
}
function Pw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Tw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function bc(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (co("startRow", t), co("endRow", n), co("startColumn", i), co("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function xl(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function co(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function _i(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function Mw(e) {
  let t = xl(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function Iw(e) {
  let t = xl(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function Aw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function $w(e) {
  let t = xl(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function Nw(e) {
  let t = xl(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function Rw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function Ow(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function Bw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function Fw(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function Dw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function Hw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function zw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function jw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Uw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function Ww(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Gw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function qw(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function Yw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t);
}
class Ee {
  static from1DArray(t, n, i) {
    if (t * n !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new _e(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, i[l * n + s]);
    return o;
  }
  static rowVector(t) {
    let n = new _e(1, t.length);
    for (let i = 0; i < t.length; i++)
      n.set(0, i, t[i]);
    return n;
  }
  static columnVector(t) {
    let n = new _e(t.length, 1);
    for (let i = 0; i < t.length; i++)
      n.set(i, 0, t[i]);
    return n;
  }
  static zeros(t, n) {
    return new _e(t, n);
  }
  static ones(t, n) {
    return new _e(t, n).fill(1);
  }
  static rand(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: r = Math.random } = i;
    let o = new _e(t, n);
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
    let s = o - r, a = new _e(t, n);
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
    let i = t.rows, r = t.columns, o = new _e(i, r);
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
    return Ee.isMatrix(t) ? t : new _e(t);
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
    let r = new _e(this.rows * n, this.columns * i);
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
    At(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return _e.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    At(this, t), n = ki(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    At(this, t), At(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    $t(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return _e.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    $t(this, t), n = Ei(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    $t(this, t), $t(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = ki(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = ki(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = ki(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = ki(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = Ei(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = Ei(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = Ei(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = Ei(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    At(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    $t(this, t);
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
    _i(this);
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
    _i(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (At(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    At(this, t), _i(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (At(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    At(this, t), _i(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if ($t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    $t(this, t), _i(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if ($t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    $t(this, t), _i(this);
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
    Ee.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let r = 0; r < n.length; r++)
      i += n[r] * t[r];
    return i;
  }
  mmul(t) {
    t = _e.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.columns, o = new _e(n, r), l = new Float64Array(i);
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
    t = _e.checkMatrix(t);
    let n = new _e(2, 2);
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (i + u) * (r + c), f = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, p = (s - i) * (r + l), g = (o - u) * (a + c), w = d + v - m + g, _ = h + m, b = f + v, x = d - f + h + p;
    return n.set(0, 0, w), n.set(0, 1, _), n.set(1, 0, b), n.set(1, 1, x), n;
  }
  strassen3x3(t) {
    t = _e.checkMatrix(t);
    let n = new _e(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), g = t.get(1, 2), w = t.get(2, 0), _ = t.get(2, 1), b = t.get(2, 2), x = (i + r + o - l - s - c - d) * p, V = (i - l) * (-h + p), C = s * (-f + h + m - p - g - w + b), T = (-i + l + s) * (f - h + p), $ = (l + s) * (-f + h), R = i * f, j = (-i + u + c) * (f - v + g), L = (-i + u) * (v - g), N = (u + c) * (-f + v), S = (i + r + o - s - a - u - c) * g, B = c * (-f + v + m - p - g - w + _), I = (-o + c + d) * (p + w - _), W = (o - d) * (p - _), A = o * w, D = (c + d) * (-w + _), O = (-o + s + a) * (g + w - b), U = (o - a) * (g - b), Y = (s + a) * (-w + b), Q = r * m, le = a * _, ve = l * v, J = u * h, ue = d * b, ke = R + A + Q, ze = x + T + $ + R + I + A + D, et = R + j + N + S + A + O + Y, It = V + C + T + R + A + O + U, Zt = V + T + $ + R + le, E = A + O + U + Y + ve, M = R + j + L + B + I + W + A, G = I + W + A + D + J, q = R + j + L + N + ue;
    return n.set(0, 0, ke), n.set(0, 1, ze), n.set(0, 2, et), n.set(1, 0, It), n.set(1, 1, Zt), n.set(1, 2, E), n.set(2, 0, M), n.set(2, 1, G), n.set(2, 2, q), n;
  }
  mmulStrassen(t) {
    t = _e.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, m = d.columns;
      if (v === f && m === h)
        return d;
      {
        let p = Ee.zeros(f, h);
        return p = p.setSubMatrix(d, 0, 0), p;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let m = parseInt(d.rows / 2, 10), p = parseInt(d.columns / 2, 10), g = d.subMatrix(0, m - 1, 0, p - 1), w = f.subMatrix(0, m - 1, 0, p - 1), _ = d.subMatrix(0, m - 1, p, d.columns - 1), b = f.subMatrix(0, m - 1, p, f.columns - 1), x = d.subMatrix(m, d.rows - 1, 0, p - 1), V = f.subMatrix(m, f.rows - 1, 0, p - 1), C = d.subMatrix(m, d.rows - 1, p, d.columns - 1), T = f.subMatrix(m, f.rows - 1, p, f.columns - 1), $ = c(
        Ee.add(g, C),
        Ee.add(w, T),
        m,
        p
      ), R = c(Ee.add(x, C), w, m, p), j = c(g, Ee.sub(b, T), m, p), L = c(C, Ee.sub(V, w), m, p), N = c(Ee.add(g, _), T, m, p), S = c(
        Ee.sub(x, g),
        Ee.add(w, b),
        m,
        p
      ), B = c(
        Ee.sub(_, C),
        Ee.add(V, T),
        m,
        p
      ), I = Ee.add($, L);
      I.sub(N), I.add(B);
      let W = Ee.add(j, N), A = Ee.add(R, L), D = Ee.sub($, R);
      D.add(j), D.add(S);
      let O = Ee.zeros(2 * I.rows, 2 * I.columns);
      return O = O.setSubMatrix(I, 0, 0), O = O.setSubMatrix(W, I.rows, 0), O = O.setSubMatrix(A, 0, I.columns), O = O.setSubMatrix(D, I.rows, I.columns), O.subMatrix(0, h - 1, 0, v - 1);
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
    let r = new _e(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const l = this.getRow(o);
      l.length > 0 && pc(l, { min: n, max: i, output: l }), r.setRow(o, l);
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
    let r = new _e(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const l = this.getColumn(o);
      l.length && pc(l, {
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
    t = _e.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.rows, o = t.columns, l = new _e(n * r, i * o);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < i; a++)
        for (let u = 0; u < r; u++)
          for (let c = 0; c < o; c++)
            l.set(r * s + u, o * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = _e.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, i = t.rows, r = this.kroneckerProduct(_e.eye(i, i)), o = _e.eye(n, n).kroneckerProduct(t);
    return r.add(o);
  }
  transpose() {
    let t = new _e(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, n, this.get(n, i));
    return t;
  }
  sortRows(t = wc) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = wc) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    bc(this, t, n, i, r);
    let o = new _e(
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
    let r = new _e(t.length, i - n + 1);
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
    let r = new _e(i - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        r.set(l - n, o, this.get(l, t[o]));
      }
    return r;
  }
  setSubMatrix(t, n, i) {
    if (t = _e.checkMatrix(t), t.isEmpty())
      return this;
    let r = n + t.rows - 1, o = i + t.columns - 1;
    bc(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = Lw(this, t, n), r = new _e(t.length, n.length);
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
    let t = new _e(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(n, i, this.get(n, i));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return Mw(this);
      case "column":
        return Iw(this);
      case void 0:
        return Aw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return $w(this);
      case "column":
        return Nw(this);
      case void 0:
        return Rw(this);
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
        return Ow(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return Bw(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return Fw(this, i, r);
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
        return Dw(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return Hw(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return zw(this, i), this;
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
          i = jw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Uw(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = Ww(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Gw(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = qw(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return Yw(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return ph(this, t);
  }
}
Ee.prototype.klass = "Matrix";
typeof Symbol < "u" && (Ee.prototype[Symbol.for("nodejs.util.inspect.custom")] = Cw);
function wc(e, t) {
  return e - t;
}
Ee.random = Ee.rand;
Ee.randomInt = Ee.randInt;
Ee.diagonal = Ee.diag;
Ee.prototype.diagonal = Ee.prototype.diag;
Ee.identity = Ee.eye;
Ee.prototype.negate = Ee.prototype.neg;
Ee.prototype.tensorProduct = Ee.prototype.kroneckerProduct;
class _e extends Ee {
  constructor(t, n) {
    if (super(), _e.isMatrix(t))
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
    return At(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), At(this, t, !0), n = Float64Array.from(ki(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    $t(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), $t(this, t, !0), n = Ei(this, n);
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
Vw(Ee, _e);
function Zl(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function Jl(e, t, n) {
  const i = new _e([[e.x, e.y]]), r = new _e([[t.x, t.y]]), o = _e.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = bh(10), u = $i(s, -a).multiply(n.nodeRadius - 1).add(i), c = _e.multiply(s, -1), d = $i(c, a).multiply(n.nodeRadius).add(r).add($i(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function xc(e, t, n) {
  const i = new _e([[e.x, e.y]]), r = new _e([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = _e.subtract(i, r), l = o.divide(o.norm("frobenius")), s = bh(40), a = $i(l, s).multiply(n.nodeRadius - 1).add(i), u = $i(l, -s).multiply(n.nodeRadius).add(i).add($i(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function _c(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function bh(e) {
  return e * (Math.PI / 180);
}
function $i(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new _e([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
function Kw(e) {
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
function Xw(e) {
  const t = [];
  for (let i of e.nodes)
    t.push({ idImported: i.id, label: i.label, color: i.color });
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
var Zw = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jw(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var wh = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(Zw, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (I, W, A, D) => W + D.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], m = [], p, g, w = 0, _ = 0, b = 0, x = 0, V = 0, C = 0, T = 0, $ = 0, R = 0, j = 0, L = 0, N = 0, S = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(I) {
          return I !== "";
        }), m = v, v = v.map(parseFloat), p = v.length, f === "m") {
          if (B += "M ", d === "m" ? (b += v[0], x += v[1]) : (b = v[0], x = v[1]), w = b, _ = x, B += b + " " + x + " ", p > 2)
            for (g = 0; g < p; g += 2)
              d === "m" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "L " + b + " " + x + " ";
        } else if (f === "l")
          for (g = 0; g < p; g += 2)
            d === "l" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "L " + b + " " + x + " ";
        else if (f === "h")
          for (g = 0; g < p; g++)
            d === "h" ? b += v[g] : b = v[g], B += "L " + b + " " + x + " ";
        else if (f === "v")
          for (g = 0; g < p; g++)
            d === "v" ? x += v[g] : x = v[g], B += "L " + b + " " + x + " ";
        else if (f === "q")
          for (g = 0; g < p; g += 4)
            d === "q" ? (V = b + v[g], C = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (V = v[g], C = v[g + 1], b = v[g + 2], x = v[g + 3]), B += "Q " + V + " " + C + " " + b + " " + x + " ";
        else if (f === "t")
          for (g = 0; g < p; g += 2)
            ["t", "q"].indexOf(h) > -1 ? (V = b + (b - V), C = x + (x - C)) : (V = b, C = x), d === "t" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "Q " + V + " " + C + " " + b + " " + x + " ", h = f;
        else if (f === "c")
          for (g = 0; g < p; g += 6)
            d === "c" ? (V = b + v[g], C = x + v[g + 1], T = b + v[g + 2], $ = x + v[g + 3], b += v[g + 4], x += v[g + 5]) : (V = v[g], C = v[g + 1], T = v[g + 2], $ = v[g + 3], b = v[g + 4], x = v[g + 5]), B += "C " + V + " " + C + " " + T + " " + $ + " " + b + " " + x + " ";
        else if (f === "s")
          for (g = 0; g < p; g += 4)
            V = b, C = x, ["s", "c"].indexOf(h) > -1 && (V += b - T, C += x - $), d === "s" ? (T = b + v[g], $ = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (T = v[g], $ = v[g + 1], b = v[g + 2], x = v[g + 3]), B += "C " + V + " " + C + " " + T + " " + $ + " " + b + " " + x + " ";
        else if (f === "a")
          for (g = 0; g < p; g += 7) {
            R = v[g], j = v[g + 1], L = v[g + 2], N = m[g + 3];
            let I = !1;
            if (N.length > 1) {
              let W = parseInt(N[0]), A = parseInt(N[1]), D;
              N.length > 2 && (D = parseFloat(N.substring(2))), v[g + 3] = W, v.splice(g + 4, 0, A), m.splice(g + 4, 0, "+"), D !== void 0 && v.splice(g + 5, 0, D), I = !0;
            }
            N = v[g + 3], S = I ? v[g + 4] : m[g + 4], !I && S.length > 1 && (v[g + 4] = parseInt(S[0]), v.splice(g + 5, 0, parseFloat(S.substring(1)))), S = v[g + 4], d === "a" ? (b += v[g + 5], x += v[g + 6]) : (b = v[g + 5], x = v[g + 6]), B += "A " + R + " " + j + " " + L + " " + N + " " + S + " " + b + " " + x + " ";
          }
        else f === "z" && (B += "Z ", b = w, x = _);
        h = f;
      }
      return B.trim();
    }
    function i(l) {
      var s = l.trim().split(" "), a, u = s.length, c = u - 1, d, f = [], h, v, m, p, g, w = new RegExp("[QAZLCM]", ""), _ = s.slice(-1)[0].toUpperCase() === "Z";
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
      var x = "", V = f.length - 1, C;
      for (C = V; C > 0; C--)
        x += f[C] + " ";
      return _ && (x += "Z"), x = x.replace(/M M/g, "Z M"), x;
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
})(wh);
var Qw = wh.exports;
const Sc = /* @__PURE__ */ Jw(Qw), Te = typeof window < "u", Ma = Te && "IntersectionObserver" in window, ex = Te && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Cc = Te && "EyeDropper" in window;
function xh(e, t, n) {
  const i = t.length - 1;
  if (i < 0) return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function yi(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => yi(e[i], t[i]));
}
function Is(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), xh(e, t.split("."), n));
}
function mn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Is(e, t, n);
  if (Array.isArray(t)) return xh(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function Ia(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, i) => t + i);
}
function me(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function Wo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Er(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const kc = Object.freeze({
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
}), tx = Object.freeze({
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
function _h(e) {
  return Object.keys(e);
}
function ri(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Sh(e, t) {
  const n = {}, i = new Set(Object.keys(e));
  for (const r of t)
    i.has(r) && (n[r] = e[r]);
  return n;
}
function Ec(e, t, n) {
  const i = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((l) => l instanceof RegExp ? l.test(o) : l === o) && !(n != null && n.some((l) => l === o)) ? i[o] = e[o] : r[o] = e[o];
  return [i, r];
}
function qt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const Ch = /^on[^a-z]/, Aa = (e) => Ch.test(e), nx = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Dr(e) {
  const [t, n] = Ec(e, [Ch]), i = qt(t, nx), [r, o] = Ec(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function on(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function ix(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), Bt(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function pt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Vc(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function Lc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Pc(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function rx(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function Tc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let i = -1;
  for (; Math.abs(e) >= t && i < n.length - 1; )
    e /= t, ++i;
  return `${e.toFixed(1)} ${n[i]}B`;
}
function bt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (Wo(o) && Wo(l)) {
      i[r] = bt(o, l, n);
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
  return e.map((t) => t.type === Ce ? kh(t.children) : t).flat();
}
function ui() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (ui.cache.has(e)) return ui.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return ui.cache.set(e, t), t;
}
ui.cache = /* @__PURE__ */ new Map();
function ko(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => ko(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => ko(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return ko(e, t.component.subTree).flat(1);
  }
  return [];
}
function ox(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function $a(e) {
  const t = zt({}), n = k(e);
  return ln(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), fa(t);
}
function Go(e, t) {
  return e.includes(t);
}
function Eh(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Dt = () => [Function, Array];
function Mc(e, t) {
  return t = "on" + Sn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Vh(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Vr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Lh(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function qo(e, t) {
  var i, r, o, l;
  const n = Vr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Lh(n, t);
    s ? s.focus() : qo(e, t === "next" ? "first" : "last");
  }
}
function Yo(e, t) {
  if (!(Te && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Ph(e) {
  return e.some((t) => $o(t) ? t.type === Tt ? !1 : t.type !== Ce || Ph(t.children) : !0) ? e : null;
}
function lx(e, t) {
  if (!Te || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function sx(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Th = ["top", "bottom"], ax = ["start", "end", "left", "right"];
function As(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = Go(Th, n) ? "start" : Go(ax, n) ? "top" : "center"), {
    side: Ic(n, t),
    align: Ic(i, t)
  };
}
function Ic(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Ql(e) {
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
function es(e) {
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
function Ac(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function $c(e) {
  return Go(Th, e.side) ? "y" : "x";
}
class ci {
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
function Nc(e, t) {
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
function Mh(e) {
  return Array.isArray(e) ? new ci({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Na(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new ci(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), d = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new ci({
      x: c,
      y: d,
      width: f,
      height: h
    });
  } else
    return new ci(t);
}
function oi(e, t, n) {
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
const Eo = /* @__PURE__ */ new WeakMap();
function ux(e, t) {
  Object.keys(t).forEach((n) => {
    if (Aa(n)) {
      const i = Eh(n), r = Eo.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), Eo.has(e) || Eo.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function cx(e, t) {
  Object.keys(t).forEach((n) => {
    if (Aa(n)) {
      const i = Eh(n), r = Eo.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Si = 2.4, Rc = 0.2126729, Oc = 0.7151522, Bc = 0.072175, fx = 0.55, dx = 0.58, hx = 0.57, vx = 0.62, fo = 0.03, Fc = 1.45, mx = 5e-4, gx = 1.25, yx = 1.25, Dc = 0.078, Hc = 12.82051282051282, ho = 0.06, zc = 1e-3;
function jc(e, t) {
  const n = (e.r / 255) ** Si, i = (e.g / 255) ** Si, r = (e.b / 255) ** Si, o = (t.r / 255) ** Si, l = (t.g / 255) ** Si, s = (t.b / 255) ** Si;
  let a = n * Rc + i * Oc + r * Bc, u = o * Rc + l * Oc + s * Bc;
  if (a <= fo && (a += (fo - a) ** Fc), u <= fo && (u += (fo - u) ** Fc), Math.abs(u - a) < mx) return 0;
  let c;
  if (u > a) {
    const d = (u ** fx - a ** dx) * gx;
    c = d < zc ? 0 : d < Dc ? d - d * Hc * ho : d - ho;
  } else {
    const d = (u ** vx - a ** hx) * yx;
    c = d > -zc ? 0 : d > -Dc ? d - d * Hc * ho : d + ho;
  }
  return c * 100;
}
function px(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const Ko = 0.20689655172413793, bx = (e) => e > Ko ** 3 ? Math.cbrt(e) : e / (3 * Ko ** 2) + 4 / 29, wx = (e) => e > Ko ? e ** 3 : 3 * Ko ** 2 * (e - 4 / 29);
function Ih(e) {
  const t = bx, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Ah(e) {
  const t = wx, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const xx = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], _x = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Sx = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Cx = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function $h(e) {
  const t = Array(3), n = _x, i = xx;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(pt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ra(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Cx, l = Sx;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function $s(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function kx(e) {
  return $s(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Uc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Ex = {
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
  hsl: (e, t, n, i) => Wc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => Wc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsv: (e, t, n, i) => _n({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => _n({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Lt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Uc.test(e)) {
    const {
      groups: t
    } = e.match(Uc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Ex[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Fh(t);
  } else if (typeof e == "object") {
    if (ri(e, ["r", "g", "b"]))
      return e;
    if (ri(e, ["h", "s", "l"]))
      return _n(Oa(e));
    if (ri(e, ["h", "s", "v"]))
      return _n(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function _n(e) {
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
function Wc(e) {
  return _n(Oa(e));
}
function _l(e) {
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
function Nh(e) {
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
function Oa(e) {
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
function Rh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function Oh(e) {
  return Rh(_n(e));
}
function vo(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Bh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[vo(t), vo(n), vo(i), r !== void 0 ? vo(Math.round(r * 255)) : ""].join("")}`;
}
function Fh(e) {
  e = Vx(e);
  let [t, n, i, r] = rx(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Dh(e) {
  const t = Fh(e);
  return _l(t);
}
function Hh(e) {
  return Bh(_n(e));
}
function Vx(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Lc(Lc(e, 6), 8, "F")), e;
}
function Lx(e, t) {
  const n = Ih(Ra(e));
  return n[0] = n[0] + t * 10, $h(Ah(n));
}
function Px(e, t) {
  const n = Ih(Ra(e));
  return n[0] = n[0] - t * 10, $h(Ah(n));
}
function Ns(e) {
  const t = Lt(e);
  return Ra(t)[1];
}
function Tx(e, t) {
  const n = Ns(e), i = Ns(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function zh(e) {
  const t = Math.abs(jc(Lt(0), Lt(e)));
  return Math.abs(jc(Lt(16777215), Lt(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
const we = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Di = Symbol.for("vuetify:defaults");
function Mx(e) {
  return ne(e);
}
function Ba() {
  const e = $e(Di);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function cn(e, t) {
  const n = Ba(), i = ne(e), r = k(() => {
    if (Bt(t == null ? void 0 : t.disabled)) return n.value;
    const l = Bt(t == null ? void 0 : t.scoped), s = Bt(t == null ? void 0 : t.reset), a = Bt(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = bt(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = bt(bt(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? bt(u.prev, u) : u;
  });
  return Qe(Di, r), r;
}
function Ix(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[ui(t)]) < "u";
}
function Ax() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ba();
  const i = Xe("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = k(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var d, f, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(d = r.value) == null ? void 0 : d[u], c].filter((m) => m != null) : typeof u == "string" && !Ix(i.vnode, u) ? ((f = r.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = ge();
  ln(() => {
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
    const a = Ox(Di, i);
    Qe(Di, k(() => l.value ? bt((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function Yt(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return Sh(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = Ba();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = Ax(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function ce() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Yt : ji)(t);
}
function Ui(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return ce()({
    name: n ?? Sn(lt(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...we()
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => {
        var l;
        return zn(i.tag, {
          class: [e, i.class],
          style: i.style
        }, (l = o.default) == null ? void 0 : l.call(o));
      };
    }
  });
}
function jh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Lr = "cubic-bezier(0.4, 0, 0.2, 1)", $x = "cubic-bezier(0.0, 0, 0.2, 1)", Nx = "cubic-bezier(0.4, 0, 1, 1)";
function Xe(e, t) {
  const n = wa();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function fn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Xe(e).type;
  return ui((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Uh = 0, Vo = /* @__PURE__ */ new WeakMap();
function _t() {
  const e = Xe("getUid");
  if (Vo.has(e)) return Vo.get(e);
  {
    const t = Uh++;
    return Vo.set(e, t), t;
  }
}
_t.reset = () => {
  Uh = 0, Vo = /* @__PURE__ */ new WeakMap();
};
function Wh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Rx(e) : Fa(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function Xo(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Fa(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Fa(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Rx(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Ox(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Xe("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function Bx(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function de(e) {
  const t = Xe("useRender");
  t.render = e;
}
const pi = Z({
  border: [Boolean, Number, String]
}, "border");
function bi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return {
    borderClasses: k(() => {
      const i = Ne(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const Fx = [null, "default", "comfortable", "compact"], Mt = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => Fx.includes(e)
  }
}, "density");
function Kt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return {
    densityClasses: k(() => `${t}--density-${e.density}`)
  };
}
const kn = Z({
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
function En(e) {
  return {
    elevationClasses: k(() => {
      const n = Ne(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const dt = Z({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function ht(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return {
    roundedClasses: k(() => {
      const i = Ne(e) ? e.value : e.rounded, r = Ne(e) ? e.value : e.tile, o = [];
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
const Re = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Zo = Symbol.for("vuetify:theme"), He = Z({
  theme: String
}, "theme");
function Gc() {
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
function Dx() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Gc();
  const t = Gc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [o, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || o === "dark" ? (i = t.themes) == null ? void 0 : i.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = bt(s, l);
  }
  return bt(t, {
    ...e,
    themes: n
  });
}
function Hx(e) {
  const t = Dx(e), n = ne(t.defaultTheme), i = ne(t.themes), r = k(() => {
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
              const g = p === "lighten" ? Lx : Px;
              for (const w of Ia(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = Bh(g(Lt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, p = Lt(h.colors[v]);
        h.colors[m] = zh(p);
      }
    }
    return c;
  }), o = k(() => r.value[n.value]), l = k(() => {
    const c = [];
    o.value.dark && Kn(c, ":root", ["color-scheme: dark"]), Kn(c, ":root", qc(o.value));
    for (const [v, m] of Object.entries(r.value))
      Kn(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...qc(m)]);
    const d = [], f = [], h = new Set(Object.values(r.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? Kn(f, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (Kn(d, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), Kn(f, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), Kn(f, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
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
        Te && ye(l, () => {
          h.patch(s);
        });
      } else
        Te ? (d.addHeadObjs(k(s)), ln(() => d.updateDOM())) : d.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var f = v;
      let h = Te ? document.getElementById("vuetify-theme-stylesheet") : null;
      Te ? ye(l, v, {
        immediate: !0
      }) : v();
    }
  }
  const u = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
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
function qe(e) {
  Xe("provideTheme");
  const t = $e(Zo, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = k(() => e.theme ?? t.name.value), i = k(() => t.themes.value[n.value]), r = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return Qe(Zo, o), o;
}
function Kn(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function qc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Lt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Ns(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Lt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function Da(e) {
  return $a(() => {
    const t = [], n = {};
    if (e.value.background)
      if ($s(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && kx(e.value.background)) {
          const i = Lt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = zh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && ($s(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function Ht(e, t) {
  const n = k(() => ({
    text: Ne(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Da(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function xt(e, t) {
  const n = k(() => ({
    background: Ne(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Da(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const zx = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Wi(e, t) {
  return y(Ce, null, [e && y("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), y("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Vn = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => zx.includes(e)
  }
}, "variant");
function Gi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  const n = k(() => {
    const {
      variant: o
    } = Bt(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = Da(k(() => {
    const {
      variant: o,
      color: l
    } = Bt(e);
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
  ...pi(),
  ...we(),
  ...Mt(),
  ...kn(),
  ...dt(),
  ...Re(),
  ...He(),
  ...Vn()
}, "VBtnGroup"), Yc = ce()({
  name: "VBtnGroup",
  props: Gh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      densityClasses: r
    } = Kt(e), {
      borderClasses: o
    } = bi(e), {
      elevationClasses: l
    } = En(e), {
      roundedClasses: s
    } = ht(e);
    cn({
      VBtn: {
        height: "auto",
        color: ae(e, "color"),
        density: ae(e, "density"),
        flat: !0,
        variant: ae(e, "variant")
      }
    }), de(() => y(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, i.value, o.value, r.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function hi(e, t) {
  let n;
  function i() {
    n = ia(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  ye(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), st(() => {
    n == null || n.stop();
  });
}
function Pe(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const o = Xe("useProxiedModel"), l = ne(e[t] !== void 0 ? e[t] : n), s = ui(t), u = k(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = o.vnode.props) != null && d.hasOwnProperty(t) || (f = o.vnode.props) != null && f.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = o.vnode.props) != null && d.hasOwnProperty(t) && ((f = o.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  hi(() => !u.value, () => {
    ye(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = k({
    get() {
      const d = e[t];
      return i(u.value ? d : l.value);
    },
    set(d) {
      const f = r(d), h = be(u.value ? e[t] : l.value);
      h === f || i(h) === d || (l.value = f, o == null || o.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const Sl = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Cl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function kl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = Xe("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = _t();
  Qe(Symbol.for(`${t.description}:id`), r);
  const o = $e(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = ae(e, "value"), s = k(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), Wt(() => {
    o.unregister(r);
  });
  const a = k(() => o.isSelected(r)), u = k(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return ye(a, (c) => {
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
function Hr(e, t) {
  let n = !1;
  const i = zt([]), r = Pe(e, "modelValue", [], (f) => f == null ? [] : qh(i, on(f)), (f) => {
    const h = Ux(i, f);
    return e.multiple ? h : h[0];
  }), o = Xe("useGroup");
  function l(f, h) {
    const v = f, m = Symbol.for(`${t.description}:id`), g = ko(m, o == null ? void 0 : o.vnode).indexOf(h);
    Bt(v.value) == null && (v.value = g), g > -1 ? i.splice(g, 0, v) : i.push(v);
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
  Ut(() => {
    a();
  }), Wt(() => {
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
    selectedClass: k(() => e.selectedClass),
    items: k(() => i),
    getItemIndex: (f) => jx(i, f)
  };
  return Qe(t, d), d;
}
function jx(e, t) {
  const n = qh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function qh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => yi(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function Ux(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const Yh = Symbol.for("vuetify:v-btn-toggle"), Wx = Z({
  ...Gh(),
  ...Sl()
}, "VBtnToggle");
ce()({
  name: "VBtnToggle",
  props: Wx(),
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
    } = Hr(e, Yh);
    return de(() => {
      const a = Yc.filterProps(e);
      return y(Yc, he({
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
const Gx = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ge = ce(!1)({
  name: "VDefaultsProvider",
  props: Gx(),
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
    } = fa(e);
    return cn(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), qx = {
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
}, Yx = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => zn(Kh, {
    ...e,
    class: "mdi"
  })
}, Le = [String, Function, Object, Array], Rs = Symbol.for("vuetify:icons"), El = Z({
  icon: {
    type: Le
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Kc = ce()({
  name: "VComponentIcon",
  props: El(),
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
}), Ha = Yt({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: El(),
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
Yt({
  name: "VLigatureIcon",
  props: El(),
  setup(e) {
    return () => y(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Kh = Yt({
  name: "VClassIcon",
  props: El(),
  setup(e) {
    return () => y(e.tag, {
      class: e.icon
    }, null);
  }
});
function Kx() {
  return {
    svg: {
      component: Ha
    },
    class: {
      component: Kh
    }
  };
}
function Xx(e) {
  const t = Kx(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Yx), bt({
    defaultSet: n,
    sets: t,
    aliases: {
      ...qx,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const Zx = (e) => {
  const t = $e(Rs);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: k(() => {
      var a;
      const i = Bt(e);
      if (!i) return {
        component: Kc
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: Ha,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: Kc,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, Jx = ["x-small", "small", "default", "large", "x-large"], zr = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function jr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return $a(() => {
    let n, i;
    return Go(Jx, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: me(e.size),
      height: me(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const Qx = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Le,
  ...we(),
  ...zr(),
  ...Re({
    tag: "i"
  }),
  ...He()
}, "VIcon"), Oe = ce()({
  name: "VIcon",
  props: Qx(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = ne(), {
      themeClasses: o
    } = qe(e), {
      iconData: l
    } = Zx(k(() => r.value || e.icon)), {
      sizeClasses: s
    } = jr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Ht(ae(e, "color"));
    return de(() => {
      var d, f;
      const c = (d = i.default) == null ? void 0 : d.call(i);
      return c && (r.value = (f = kh(c).filter((h) => h.type === Nr && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), y(l.value.component, {
        tag: e.tag,
        icon: l.value.icon,
        class: ["v-icon", "notranslate", o.value, s.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
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
function Xh(e, t) {
  const n = ne(), i = ge(!1);
  if (Ma) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    Wt(() => {
      r.disconnect();
    }), ye(n, (o, l) => {
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
function Hi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = ne(), i = ne();
  if (Te) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    Wt(() => {
      r.disconnect();
    }), ye(n, (o, l) => {
      l && (r.unobserve(Er(l)), i.value = void 0), o && r.observe(Er(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: $r(i)
  };
}
const e_ = Z({
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
  ...we(),
  ...zr(),
  ...Re({
    tag: "div"
  }),
  ...He()
}, "VProgressCircular"), Zh = ce()({
  name: "VProgressCircular",
  props: e_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = ne(), {
      themeClasses: l
    } = qe(e), {
      sizeClasses: s,
      sizeStyles: a
    } = jr(e), {
      textColorClasses: u,
      textColorStyles: c
    } = Ht(ae(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = Ht(ae(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Xh(), {
      resizeRef: m,
      contentRect: p
    } = Hi(), g = k(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = k(() => Number(e.width)), _ = k(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = k(() => i / (1 - w.value / _.value) * 2), x = k(() => w.value / _.value * b.value), V = k(() => me((100 - g.value) / 100 * r));
    return ln(() => {
      h.value = o.value, m.value = o.value;
    }), de(() => y(e.tag, {
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
        "stroke-width": x.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), y("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": x.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": V.value
      }, null)]), n.default && y("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: g.value
      })])]
    })), {};
  }
}), jn = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Un(e) {
  return {
    dimensionStyles: k(() => ({
      height: me(e.height),
      maxHeight: me(e.maxHeight),
      maxWidth: me(e.maxWidth),
      minHeight: me(e.minHeight),
      minWidth: me(e.minWidth),
      width: me(e.width)
    }))
  };
}
const t_ = {
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
}, Xc = "$vuetify.", Zc = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), Jh = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(Xc))
    return Zc(i, o);
  const s = i.replace(Xc, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Is(a, s, null);
  return c || (`${i}${e.value}`, c = Is(u, s, null)), c || (c = i), typeof c != "string" && (c = i), Zc(c, o);
};
function Qh(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function ts(e, t, n) {
  const i = Pe(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, ye(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function ev(e) {
  return (t) => {
    const n = ts(t, "locale", e.current), i = ts(t, "fallback", e.fallback), r = ts(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: Jh(n, i, r),
      n: Qh(n, i),
      provide: ev({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function n_(e) {
  const t = ge((e == null ? void 0 : e.locale) ?? "en"), n = ge((e == null ? void 0 : e.fallback) ?? "en"), i = ne({
    en: t_,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: Jh(t, n, i),
    n: Qh(t, n),
    provide: ev({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const Jo = Symbol.for("vuetify:locale");
function i_(e) {
  return e.name != null;
}
function r_(e) {
  const t = e != null && e.adapter && i_(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : n_(e), n = l_(t, e);
  return {
    ...t,
    ...n
  };
}
function Ur() {
  const e = $e(Jo);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function o_() {
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
function l_(e, t) {
  const n = ne((t == null ? void 0 : t.rtl) ?? o_()), i = k(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: k(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function Xt() {
  const e = $e(Jo);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const Jc = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Wr = Z({
  location: String
}, "location");
function Gr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = Xt();
  return {
    locationStyles: k(() => {
      if (!e.location) return {};
      const {
        side: o,
        align: l
      } = As(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[Jc[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[Jc[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const s_ = Z({
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
  ...we(),
  ...Wr({
    location: "top"
  }),
  ...dt(),
  ...Re(),
  ...He()
}, "VProgressLinear"), tv = ce()({
  name: "VProgressLinear",
  props: s_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      isRtl: r,
      rtlClasses: o
    } = Xt(), {
      themeClasses: l
    } = qe(e), {
      locationStyles: s
    } = Gr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Ht(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = xt(k(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = xt(e, "color"), {
      roundedClasses: v
    } = ht(e), {
      intersectionRef: m,
      isIntersecting: p
    } = Xh(), g = k(() => parseInt(e.max, 10)), w = k(() => parseInt(e.height, 10)), _ = k(() => parseFloat(e.bufferValue) / g.value * 100), b = k(() => parseFloat(i.value) / g.value * 100), x = k(() => r.value !== e.reverse), V = k(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), C = k(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function T($) {
      if (!m.value) return;
      const {
        left: R,
        right: j,
        width: L
      } = m.value.getBoundingClientRect(), N = x.value ? L - $.clientX + (j - L) : $.clientX - R;
      i.value = Math.round(N / L * g.value);
    }
    return de(() => y(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": x.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, v.value, l.value, o.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? me(w.value) : 0,
        "--v-progress-linear-height": me(w.value),
        ...s.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : b.value,
      onClick: e.clickable && T
    }, {
      default: () => [e.stream && y("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [x.value ? "left" : "right"]: me(-w.value),
          borderTop: `${me(w.value / 2)} dotted`,
          opacity: C.value,
          top: `calc(50% - ${me(w.value / 4)})`,
          width: me(100 - _.value, "%"),
          "--v-progress-linear-stream-to": me(w.value * (x.value ? 1 : -1))
        }
      }, null), y("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: C.value,
          width: me(e.stream ? _.value : 100, "%")
        }]
      }, null), y(wn, {
        name: V.value
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
            width: me(b.value, "%")
          }]
        }, null)]
      }), n.default && y("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: b.value,
        buffer: _.value
      })])]
    })), {};
  }
}), za = Z({
  loading: [Boolean, String]
}, "loader");
function Vl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return {
    loaderClasses: k(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function ja(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return y("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || y(tv, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const a_ = ["static", "relative", "fixed", "absolute", "sticky"], Ll = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => a_.includes(e)
    )
  }
}, "position");
function Pl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  return {
    positionClasses: k(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function u_() {
  const e = Xe("useRoute");
  return k(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function c_() {
  var e, t;
  return (t = (e = Xe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Tl(e, t) {
  const n = mg("RouterLink"), i = k(() => !!(e.href || e.to)), r = k(() => (i == null ? void 0 : i.value) || Mc(t, "click") || Mc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: ae(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = u_();
  return {
    isLink: i,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && k(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && yi(o.route.value.query, l.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (s = o.isActive) == null ? void 0 : s.value;
    }),
    href: k(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const Ml = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let ns = !1;
function f_(e, t) {
  let n = !1, i, r;
  Te && (De(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      ns ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), ns = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      ns = !1;
    });
  }), st(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function d_(e, t) {
  ye(() => {
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
const Os = Symbol("rippleStop"), h_ = 80;
function Qc(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Bs(e) {
  return e.constructor.name === "TouchEvent";
}
function nv(e) {
  return e.constructor.name === "KeyboardEvent";
}
const v_ = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!nv(e)) {
    const f = t.getBoundingClientRect(), h = Bs(e) ? e.touches[e.touches.length - 1] : e;
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
}, Qo = {
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
    } = v_(e, t, n), d = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = d, r.style.height = d, t.appendChild(i);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), Qc(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), Qc(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function iv(e) {
  return typeof e > "u" || !!e;
}
function Pr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Os])) {
    if (e[Os] = !0, Bs(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || nv(e), n._ripple.class && (t.class = n._ripple.class), Bs(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        Qo.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, h_);
    } else
      Qo.show(e, n, t);
  }
}
function ef(e) {
  e[Os] = !0;
}
function yt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        yt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), Qo.hide(t);
  }
}
function rv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Tr = !1;
function ov(e) {
  !Tr && (e.keyCode === kc.enter || e.keyCode === kc.space) && (Tr = !0, Pr(e));
}
function lv(e) {
  Tr = !1, yt(e);
}
function sv(e) {
  Tr && (Tr = !1, yt(e));
}
function av(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = iv(i);
  if (o || Qo.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, Wo(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", ef, {
        passive: !0
      }), e.addEventListener("mousedown", ef);
      return;
    }
    e.addEventListener("touchstart", Pr, {
      passive: !0
    }), e.addEventListener("touchend", yt, {
      passive: !0
    }), e.addEventListener("touchmove", rv, {
      passive: !0
    }), e.addEventListener("touchcancel", yt), e.addEventListener("mousedown", Pr), e.addEventListener("mouseup", yt), e.addEventListener("mouseleave", yt), e.addEventListener("keydown", ov), e.addEventListener("keyup", lv), e.addEventListener("blur", sv), e.addEventListener("dragstart", yt, {
      passive: !0
    });
  } else !o && n && uv(e);
}
function uv(e) {
  e.removeEventListener("mousedown", Pr), e.removeEventListener("touchstart", Pr), e.removeEventListener("touchend", yt), e.removeEventListener("touchmove", rv), e.removeEventListener("touchcancel", yt), e.removeEventListener("mouseup", yt), e.removeEventListener("mouseleave", yt), e.removeEventListener("keydown", ov), e.removeEventListener("keyup", lv), e.removeEventListener("dragstart", yt), e.removeEventListener("blur", sv);
}
function m_(e, t) {
  av(e, t, !1);
}
function g_(e) {
  delete e._ripple, uv(e);
}
function y_(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = iv(t.oldValue);
  av(e, t, n);
}
const wi = {
  mounted: m_,
  unmounted: g_,
  updated: y_
}, cv = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: Yh
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Le,
  appendIcon: Le,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...pi(),
  ...we(),
  ...Mt(),
  ...jn(),
  ...kn(),
  ...Cl(),
  ...za(),
  ...Wr(),
  ...Ll(),
  ...dt(),
  ...Ml(),
  ...zr(),
  ...Re({
    tag: "button"
  }),
  ...He(),
  ...Vn({
    variant: "elevated"
  })
}, "VBtn"), Je = ce()({
  name: "VBtn",
  directives: {
    Ripple: wi
  },
  props: cv(),
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
    } = qe(e), {
      borderClasses: o
    } = bi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Gi(e), {
      densityClasses: u
    } = Kt(e), {
      dimensionStyles: c
    } = Un(e), {
      elevationClasses: d
    } = En(e), {
      loaderClasses: f
    } = Vl(e), {
      locationStyles: h
    } = Gr(e), {
      positionClasses: v
    } = Pl(e), {
      roundedClasses: m
    } = ht(e), {
      sizeClasses: p,
      sizeStyles: g
    } = jr(e), w = kl(e, e.symbol, !1), _ = Tl(e, n), b = k(() => {
      var $;
      return e.active !== void 0 ? e.active : _.isLink.value ? ($ = _.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), x = k(() => (w == null ? void 0 : w.disabled.value) || e.disabled), V = k(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), C = k(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function T($) {
      var R;
      x.value || _.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((R = _.navigate) == null || R.call(_, $), w == null || w.toggle());
    }
    return d_(_, w == null ? void 0 : w.select), de(() => {
      var S, B;
      const $ = _.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), j = !!(e.appendIcon || i.append), L = !!(e.icon && e.icon !== !0), N = (w == null ? void 0 : w.isSelected.value) && (!_.isLink.value || ((S = _.isActive) == null ? void 0 : S.value)) || !w || ((B = _.isActive) == null ? void 0 : B.value);
      return We(y($, {
        type: $ === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": x.value,
          "v-btn--elevated": V.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, N ? l.value : void 0, u.value, d.value, f.value, v.value, m.value, p.value, a.value, e.class],
        style: [N ? s.value : void 0, c.value, h.value, g.value, e.style],
        disabled: x.value || void 0,
        href: _.href.value,
        onClick: T,
        value: C.value
      }, {
        default: () => {
          var I;
          return [Wi(!0, "v-btn"), !e.icon && R && y("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? y(Ge, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : y(Oe, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), y("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && L ? y(Oe, {
            key: "content-icon",
            icon: e.icon
          }, null) : y(Ge, {
            key: "content-defaults",
            disabled: !L,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var W;
              return [((W = i.default) == null ? void 0 : W.call(i)) ?? e.text];
            }
          })]), !e.icon && j && y("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? y(Ge, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : y(Oe, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && y("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((I = i.loader) == null ? void 0 : I.call(i)) ?? y(Zh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[jt("ripple"), !x.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Il = ce()({
  name: "VCardActions",
  props: we(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return cn({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), de(() => {
      var i;
      return y("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), lr = Ui("v-card-subtitle"), Mr = Ui("v-card-title");
function p_(e) {
  return {
    aspectStyles: k(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const fv = Z({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...we(),
  ...jn()
}, "VResponsive"), tf = ce()({
  name: "VResponsive",
  props: fv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = p_(e), {
      dimensionStyles: r
    } = Un(e);
    return de(() => {
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
}), qr = Z({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), yn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? Rd : wn,
    ...a
  } = typeof i == "object" ? i : {};
  return zn(s, he(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function b_(e, t) {
  if (!Ma) return;
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
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? dv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function dv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const hv = {
  mounted: b_,
  unmounted: dv
}, w_ = Z({
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
  ...fv(),
  ...we(),
  ...dt(),
  ...qr()
}, "VImg"), vv = ce()({
  name: "VImg",
  directives: {
    intersect: hv
  },
  props: w_(),
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
    } = xt(ae(e, "color")), {
      roundedClasses: l
    } = ht(e), s = Xe("VImg"), a = ge(""), u = ne(), c = ge(e.eager ? "loading" : "idle"), d = ge(), f = ge(), h = k(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), v = k(() => h.value.aspect || d.value / f.value || 0);
    ye(() => e.src, () => {
      m(c.value !== "idle");
    }), ye(v, (L, N) => {
      !L && N && u.value && b(u.value);
    }), hl(() => m());
    function m(L) {
      if (!(e.eager && L) && !(Ma && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const N = new Image();
          N.src = h.value.lazySrc, b(N, null);
        }
        h.value.src && De(() => {
          var N;
          n("loadstart", ((N = u.value) == null ? void 0 : N.currentSrc) || h.value.src), setTimeout(() => {
            var S;
            if (!s.isUnmounted)
              if ((S = u.value) != null && S.complete) {
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
    let _ = -1;
    Wt(() => {
      clearTimeout(_);
    });
    function b(L) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const S = () => {
        if (clearTimeout(_), s.isUnmounted) return;
        const {
          naturalHeight: B,
          naturalWidth: I
        } = L;
        B || I ? (d.value = I, f.value = B) : !L.complete && c.value === "loading" && N != null ? _ = window.setTimeout(S, N) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      S();
    }
    const x = k(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), V = () => {
      var S;
      if (!h.value.src || c.value === "idle") return null;
      const L = y("img", {
        class: ["v-img__img", x.value],
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
      }, null), N = (S = i.sources) == null ? void 0 : S.call(i);
      return y(yn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [We(N ? y("picture", {
          class: "v-img__picture"
        }, [N, L]) : L, [[an, c.value === "loaded"]])]
      });
    }, C = () => y(yn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && y("img", {
        class: ["v-img__img", "v-img__img--preload", x.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), T = () => i.placeholder ? y(yn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && y("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? y(yn, {
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
    }, null) : null, j = ge(!1);
    {
      const L = ye(v, (N) => {
        N && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            j.value = !0;
          });
        }), L());
      });
    }
    return de(() => {
      const L = tf.filterProps(e);
      return We(y(tf, he({
        class: ["v-img", {
          "v-img--booting": !j.value
        }, r.value, l.value, e.class],
        style: [{
          width: me(e.width === "auto" ? d.value : e.width)
        }, o.value, e.style]
      }, L, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => y(Ce, null, [y(V, null, null), y(C, null, null), y(R, null, null), y(T, null, null), y($, null, null)]),
        default: i.default
      }), [[jt("intersect"), {
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
}), x_ = Z({
  start: Boolean,
  end: Boolean,
  icon: Le,
  image: String,
  text: String,
  ...we(),
  ...Mt(),
  ...dt(),
  ...zr(),
  ...Re(),
  ...He(),
  ...Vn({
    variant: "flat"
  })
}, "VAvatar"), vi = ce()({
  name: "VAvatar",
  props: x_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = Gi(e), {
      densityClasses: s
    } = Kt(e), {
      roundedClasses: a
    } = ht(e), {
      sizeClasses: u,
      sizeStyles: c
    } = jr(e);
    return de(() => y(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? y(Ge, {
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
      }) : e.image ? y(vv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? y(Oe, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Wi(!1, "v-avatar")]
    })), {};
  }
}), __ = Z({
  appendAvatar: String,
  appendIcon: Le,
  prependAvatar: String,
  prependIcon: Le,
  subtitle: [String, Number],
  title: [String, Number],
  ...we(),
  ...Mt()
}, "VCardItem"), S_ = ce()({
  name: "VCardItem",
  props: __(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return de(() => {
      var u;
      const i = !!(e.prependAvatar || e.prependIcon), r = !!(i || n.prepend), o = !!(e.appendAvatar || e.appendIcon), l = !!(o || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return y("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [r && y("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? y(Ge, {
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
      }, n.prepend) : y(Ce, null, [e.prependAvatar && y(vi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && y(Oe, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), y("div", {
        class: "v-card-item__content"
      }, [s && y(Mr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && y(lr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && y("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? y(Ge, {
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
      }, n.append) : y(Ce, null, [e.appendIcon && y(Oe, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && y(vi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), hr = Ui("v-card-text"), C_ = Z({
  appendAvatar: String,
  appendIcon: Le,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Le,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...pi(),
  ...we(),
  ...Mt(),
  ...jn(),
  ...kn(),
  ...za(),
  ...Wr(),
  ...Ll(),
  ...dt(),
  ...Ml(),
  ...Re(),
  ...He(),
  ...Vn({
    variant: "elevated"
  })
}, "VCard"), Ua = ce()({
  name: "VCard",
  directives: {
    Ripple: wi
  },
  props: C_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = qe(e), {
      borderClasses: o
    } = bi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Gi(e), {
      densityClasses: u
    } = Kt(e), {
      dimensionStyles: c
    } = Un(e), {
      elevationClasses: d
    } = En(e), {
      loaderClasses: f
    } = Vl(e), {
      locationStyles: h
    } = Gr(e), {
      positionClasses: v
    } = Pl(e), {
      roundedClasses: m
    } = ht(e), p = Tl(e, n), g = k(() => e.link !== !1 && p.isLink.value), w = k(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return de(() => {
      const _ = g.value ? "a" : e.tag, b = !!(i.title || e.title != null), x = !!(i.subtitle || e.subtitle != null), V = b || x, C = !!(i.append || e.appendAvatar || e.appendIcon), T = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = V || T || C, j = !!(i.text || e.text != null);
      return We(y(_, {
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
          }, [i.image ? y(Ge, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : y(vv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), y(ja, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && y(S_, {
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
          }), j && y(hr, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = i.text) == null ? void 0 : N.call(i)) ?? e.text];
            }
          }), (L = i.default) == null ? void 0 : L.call(i), i.actions && y(Il, null, {
            default: i.actions
          }), Wi(w.value, "v-card")];
        }
      }), [[jt("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), k_ = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function St(e, t, n) {
  return ce()({
    name: e,
    props: k_({
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
        const s = i.group ? Rd : wn;
        return zn(s, {
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
function mv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return ce()({
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
      return () => zn(wn, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function gv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = lt(`offset-${n}`);
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
const E_ = Z({
  target: [Object, Array]
}, "v-dialog-transition"), Wa = ce()({
  name: "VDialogTransition",
  props: E_(),
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
        } = rf(e.target, r), d = oi(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: $x
        });
        (f = nf(r)) == null || f.forEach((h) => {
          oi(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Lr
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
        } = rf(e.target, r);
        oi(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: Nx
        }).finished.then(() => o()), (f = nf(r)) == null || f.forEach((h) => {
          oi(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Lr
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? y(wn, he({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : y(wn, {
      name: "dialog-transition"
    }, n);
  }
});
function nf(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function rf(e, t) {
  const n = Mh(e), i = Na(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((g) => parseFloat(g)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
St("fab-transition", "center center", "out-in");
St("dialog-bottom-transition");
St("dialog-top-transition");
const of = St("fade-transition"), yv = St("scale-transition");
St("scroll-x-transition");
St("scroll-x-reverse-transition");
St("scroll-y-transition");
St("scroll-y-reverse-transition");
St("slide-x-transition");
St("slide-x-reverse-transition");
const pv = St("slide-y-transition");
St("slide-y-reverse-transition");
const bv = mv("expand-transition", gv()), wv = mv("expand-x-transition", gv("", !0));
function is(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function V_(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function lf(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return is({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return is({
      x: r,
      y: o
    }, t);
  }
  return is({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const xv = {
  static: T_,
  // specific viewport position, usually centered
  connected: I_
  // connected to a certain element
}, L_ = Z({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in xv
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
function P_(e, t) {
  const n = ne({}), i = ne();
  Te && hi(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    ye(() => e.locationStrategy, o), st(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = xv[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
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
function T_() {
}
function M_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Na(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function I_(e, t, n) {
  (Array.isArray(e.target.value) || Bx(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = $a(() => {
    const v = As(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? Ql(v) : As(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === es(m).align ? {
      preferredAnchor: Ac(v),
      preferredOrigin: Ac(m)
    } : {
      preferredAnchor: v,
      preferredOrigin: m
    };
  }), [l, s, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((v) => k(() => {
    const m = parseFloat(t[v]);
    return isNaN(m) ? 1 / 0 : m;
  })), c = k(() => {
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
  ye([e.target, e.contentEl], (v, m) => {
    let [p, g] = v, [w, _] = m;
    w && !Array.isArray(w) && f.unobserve(w), p && !Array.isArray(p) && f.observe(p), _ && f.unobserve(_), g && f.observe(g);
  }, {
    immediate: !0
  }), st(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const v = Mh(e.target.value), m = M_(e.contentEl.value, e.isRtl.value), p = Xo(e.contentEl.value), g = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((j, L) => {
      const N = L.getBoundingClientRect(), S = new ci({
        x: L === document.documentElement ? 0 : N.x,
        y: L === document.documentElement ? 0 : N.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return j ? new ci({
        x: Math.max(j.left, S.left),
        y: Math.max(j.top, S.top),
        width: Math.min(j.right, S.right) - Math.max(j.left, S.left),
        height: Math.min(j.bottom, S.bottom) - Math.max(j.top, S.top)
      }) : S;
    }, void 0);
    w.x += g, w.y += g, w.width -= g * 2, w.height -= g * 2;
    let _ = {
      anchor: r.value,
      origin: o.value
    };
    function b(j) {
      const L = new ci(m), N = lf(j.anchor, v), S = lf(j.origin, L);
      let {
        x: B,
        y: I
      } = V_(N, S);
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
      return L.x += B, L.y += I, L.width = Math.min(L.width, a.value), L.height = Math.min(L.height, u.value), {
        overflows: Nc(L, w),
        x: B,
        y: I
      };
    }
    let x = 0, V = 0;
    const C = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; !($++ > 10); ) {
      const {
        x: j,
        y: L,
        overflows: N
      } = b(_);
      x += j, V += L, m.x += j, m.y += L;
      {
        const S = $c(_.anchor), B = N.x.before || N.x.after, I = N.y.before || N.y.after;
        let W = !1;
        if (["x", "y"].forEach((A) => {
          if (A === "x" && B && !T.x || A === "y" && I && !T.y) {
            const D = {
              anchor: {
                ..._.anchor
              },
              origin: {
                ..._.origin
              }
            }, O = A === "x" ? S === "y" ? es : Ql : S === "y" ? Ql : es;
            D.anchor = O(D.anchor), D.origin = O(D.origin);
            const {
              overflows: U
            } = b(D);
            (U[A].before <= N[A].before && U[A].after <= N[A].after || U[A].before + U[A].after < (N[A].before + N[A].after) / 2) && (_ = D, W = T[A] = !0);
          }
        }), W) continue;
      }
      N.x.before && (x += N.x.before, m.x += N.x.before), N.x.after && (x -= N.x.after, m.x -= N.x.after), N.y.before && (V += N.y.before, m.y += N.y.before), N.y.after && (V -= N.y.after, m.y -= N.y.after);
      {
        const S = Nc(m, w);
        C.x = w.width - S.x.before - S.x.after, C.y = w.height - S.y.before - S.y.after, x += S.x.before, m.x += S.x.before, V += S.y.before, m.y += S.y.before;
      }
      break;
    }
    const R = $c(_.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
      transformOrigin: `${_.origin.side} ${_.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: me(rs(V)),
      left: e.isRtl.value ? void 0 : me(rs(x)),
      right: e.isRtl.value ? me(rs(-x)) : void 0,
      minWidth: me(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: me(sf(pt(C.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: me(sf(pt(C.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: C,
      contentBox: m
    };
  }
  return ye(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), De(() => {
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
function rs(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function sf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Fs = !0;
const el = [];
function A_(e) {
  !Fs || el.length ? (el.push(e), Ds()) : (Fs = !1, e(), Ds());
}
let af = -1;
function Ds() {
  cancelAnimationFrame(af), af = requestAnimationFrame(() => {
    const e = el.shift();
    e && e(), el.length ? Ds() : Fs = !0;
  });
}
const Lo = {
  none: null,
  close: R_,
  block: O_,
  reposition: B_
}, $_ = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Lo
  }
}, "VOverlay-scroll-strategies");
function N_(e, t) {
  if (!Te) return;
  let n;
  ln(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = ia(), await De(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = Lo[e.scrollStrategy]) == null || i.call(Lo, t, e, n);
    }));
  }), st(() => {
    n == null || n.stop();
  });
}
function R_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  _v(e.targetEl.value ?? e.contentEl.value, t);
}
function O_(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...Xo(e.targetEl.value, t.contained ? n : void 0), ...Xo(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Fa(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", me(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", me(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", me(r)), s.classList.add("v-overlay-scroll-blocked");
  }), st(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function B_(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    A_(() => {
      var c, d;
      const a = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      _v(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), st(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function _v(e, t) {
  const n = [document, ...Xo(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), st(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const Hs = Symbol.for("vuetify:v-menu"), F_ = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function D_(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = lx(s, () => {
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
const H_ = Z({
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
  ...F_()
}, "VOverlay-activator");
function z_(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = Xe("useActivator"), o = ne();
  let l = !1, s = !1, a = !0;
  const u = k(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = k(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = D_(e, (C) => {
    C === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== C && (a = !0), n.value = C);
  }), h = ne(), v = {
    onClick: (C) => {
      C.stopPropagation(), o.value = C.currentTarget || C.target, n.value || (h.value = [C.clientX, C.clientY]), n.value = !n.value;
    },
    onMouseenter: (C) => {
      var T;
      (T = C.sourceCapabilities) != null && T.firesTouchEvents || (l = !0, o.value = C.currentTarget || C.target, d());
    },
    onMouseleave: (C) => {
      l = !1, f();
    },
    onFocus: (C) => {
      Yo(C.target, ":focus-visible") !== !1 && (s = !0, C.stopPropagation(), o.value = C.currentTarget || C.target, d());
    },
    onBlur: (C) => {
      s = !1, C.stopPropagation(), f();
    }
  }, m = k(() => {
    const C = {};
    return c.value && (C.onClick = v.onClick), e.openOnHover && (C.onMouseenter = v.onMouseenter, C.onMouseleave = v.onMouseleave), u.value && (C.onFocus = v.onFocus, C.onBlur = v.onBlur), C;
  }), p = k(() => {
    const C = {};
    if (e.openOnHover && (C.onMouseenter = () => {
      l = !0, d();
    }, C.onMouseleave = () => {
      l = !1, f();
    }), u.value && (C.onFocusin = () => {
      s = !0, d();
    }, C.onFocusout = () => {
      s = !1, f();
    }), e.closeOnContentClick) {
      const T = $e(Hs, null);
      C.onClick = () => {
        n.value = !1, T == null || T.closeParents();
      };
    }
    return C;
  }), g = k(() => {
    const C = {};
    return e.openOnHover && (C.onMouseenter = () => {
      a && (l = !0, a = !1, d());
    }, C.onMouseleave = () => {
      l = !1, f();
    }), C;
  });
  ye(i, (C) => {
    C && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), ye(n, (C) => {
    C || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = ne();
  ln(() => {
    w.value && De(() => {
      o.value = Er(w.value);
    });
  });
  const _ = ne(), b = k(() => e.target === "cursor" && h.value ? h.value : _.value ? Er(_.value) : Sv(e.target, r) || o.value), x = k(() => Array.isArray(b.value) ? void 0 : b.value);
  let V;
  return ye(() => !!e.activator, (C) => {
    C && Te ? (V = ia(), V.run(() => {
      j_(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : V && V.stop();
  }, {
    flush: "post",
    immediate: !0
  }), st(() => {
    V == null || V.stop();
  }), {
    activatorEl: o,
    activatorRef: w,
    target: b,
    targetEl: x,
    targetRef: _,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: g
  };
}
function j_(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  ye(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && De(() => o());
  }, {
    immediate: !0
  }), ye(() => e.activatorProps, () => {
    o();
  }), st(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && ux(a, he(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && cx(a, he(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Sv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function Sv(e, t) {
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
const Al = ["sm", "md", "lg", "xl", "xxl"], zs = Symbol.for("vuetify:display"), uf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, U_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : uf;
  return bt(uf, e);
};
function cf(e) {
  return Te && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function ff(e) {
  return Te && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function df(e) {
  const t = Te && !e ? window.navigator.userAgent : "ssr";
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
    touch: ex,
    ssr: t === "ssr"
  };
}
function W_(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = U_(e), r = ge(ff(t)), o = ge(df(t)), l = zt({}), s = ge(cf(t));
  function a() {
    r.value = ff(), s.value = cf();
  }
  function u() {
    a(), o.value = df();
  }
  return ln(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), m = s.value >= n.xxl, p = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", g = typeof i == "number" ? i : n[i], w = s.value < g;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = p, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Te && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...fa(l),
    update: u,
    ssr: !!t
  };
}
const G_ = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function Ga() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  const n = $e(zs);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const i = k(() => {
    if (!e.mobileBreakpoint) return n.mobile.value;
    const o = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < o;
  }), r = k(() => t ? {
    [`${t}--mobile`]: i.value
  } : {});
  return {
    ...n,
    displayClasses: r,
    mobile: i
  };
}
function q_() {
  if (!Te) return ge(!1);
  const {
    ssr: e
  } = Ga();
  if (e) {
    const t = ge(!1);
    return Ut(() => {
      t.value = !0;
    }), t;
  } else
    return ge(!0);
}
const $l = Z({
  eager: Boolean
}, "lazy");
function qa(e, t) {
  const n = ge(!1), i = k(() => n.value || e.eager || t.value);
  ye(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: r
  };
}
function Yr() {
  const t = Xe("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const hf = Symbol.for("vuetify:stack"), tr = zt([]);
function Y_(e, t, n) {
  const i = Xe("useStack"), r = !n, o = $e(hf, void 0), l = zt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Qe(hf, l);
  const s = ge(+t.value);
  hi(e, () => {
    var d;
    const c = (d = tr.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, r && tr.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), st(() => {
      if (r) {
        const f = be(tr).findIndex((h) => h[0] === i.uid);
        tr.splice(f, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = ge(!0);
  r && ln(() => {
    var d;
    const c = ((d = tr.at(-1)) == null ? void 0 : d[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = k(() => !l.activeChildren.size);
  return {
    globalTop: $r(a),
    localTop: u,
    stackStyles: k(() => ({
      zIndex: s.value
    }))
  };
}
function K_(e) {
  return {
    teleportTarget: k(() => {
      const n = e.value;
      if (n === !0 || !Te) return;
      const i = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (i == null)
        return;
      let r = i.querySelector(":scope > .v-overlay-container");
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", i.appendChild(r)), r;
    })
  };
}
function X_() {
  return !0;
}
function Cv(e, t, n) {
  if (!e || kv(e, n) === !1) return !1;
  const i = jh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function kv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || X_)(e);
}
function Z_(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Cv(e, t, n) && setTimeout(() => {
    kv(e, n) && i && i(e);
  }, 0);
}
function vf(e, t) {
  const n = jh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const J_ = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => Z_(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = Cv(r, e, t);
    };
    vf(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (vf(e, (n) => {
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
function Q_(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return y(wn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && y("div", he({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const Kr = Z({
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
  ...H_(),
  ...we(),
  ...jn(),
  ...$l(),
  ...L_(),
  ...$_(),
  ...He(),
  ...qr()
}, "VOverlay"), Hn = ce()({
  name: "VOverlay",
  directives: {
    ClickOutside: J_
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Kr()
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
    const o = Pe(e, "modelValue"), l = k({
      get: () => o.value,
      set: (Q) => {
        Q && e.disabled || (o.value = Q);
      }
    }), {
      teleportTarget: s
    } = K_(k(() => e.attach || e.contained)), {
      themeClasses: a
    } = qe(e), {
      rtlClasses: u,
      isRtl: c
    } = Xt(), {
      hasContent: d,
      onAfterLeave: f
    } = qa(e, l), h = xt(k(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: p
    } = Y_(l, ae(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: g,
      activatorRef: w,
      target: _,
      targetEl: b,
      targetRef: x,
      activatorEvents: V,
      contentEvents: C,
      scrimEvents: T
    } = z_(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = Un(e), R = q_(), {
      scopeId: j
    } = Yr();
    ye(() => e.disabled, (Q) => {
      Q && (l.value = !1);
    });
    const L = ne(), N = ne(), {
      contentStyles: S,
      updateLocation: B
    } = P_(e, {
      isRtl: c,
      contentEl: N,
      target: _,
      isActive: l
    });
    N_(e, {
      root: L,
      contentEl: N,
      targetEl: b,
      isActive: l,
      updateLocation: B
    });
    function I(Q) {
      r("click:outside", Q), e.persistent ? U() : l.value = !1;
    }
    function W() {
      return l.value && v.value;
    }
    Te && ye(l, (Q) => {
      Q ? window.addEventListener("keydown", A) : window.removeEventListener("keydown", A);
    }, {
      immediate: !0
    }), Wt(() => {
      Te && window.removeEventListener("keydown", A);
    });
    function A(Q) {
      var le, ve;
      Q.key === "Escape" && v.value && (e.persistent ? U() : (l.value = !1, (le = N.value) != null && le.contains(document.activeElement) && ((ve = g.value) == null || ve.focus())));
    }
    const D = c_();
    hi(() => e.closeOnBack, () => {
      f_(D, (Q) => {
        v.value && l.value ? (Q(!1), e.persistent ? U() : l.value = !1) : Q();
      });
    });
    const O = ne();
    ye(() => l.value && (e.absolute || e.contained) && s.value == null, (Q) => {
      if (Q) {
        const le = Wh(L.value);
        le && le !== document.scrollingElement && (O.value = le.scrollTop);
      }
    });
    function U() {
      e.noClickAnimation || N.value && oi(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Lr
      });
    }
    function Y() {
      f(), r("afterLeave");
    }
    return de(() => {
      var Q;
      return y(Ce, null, [(Q = n.activator) == null ? void 0 : Q.call(n, {
        isActive: l.value,
        props: he({
          ref: w,
          targetRef: x
        }, V.value, e.activatorProps)
      }), R.value && d.value && y(Jg, {
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
            top: me(O.value)
          }, e.style],
          ref: L
        }, j, i), [y(Q_, he({
          color: h,
          modelValue: l.value && !!e.scrim
        }, T.value), null), y(yn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: _.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var le;
            return [We(y("div", he({
              ref: N,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, S.value]
            }, C.value, e.contentProps), [(le = n.default) == null ? void 0 : le.call(n, {
              isActive: l
            })]), [[an, l.value], [jt("click-outside"), {
              handler: I,
              closeConditional: W,
              include: () => [g.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: g,
      target: _,
      animateClick: U,
      contentEl: N,
      globalTop: v,
      localTop: m,
      updateLocation: B
    };
  }
}), os = Symbol("Forwarded refs");
function ls(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i) return i;
    n = Object.getPrototypeOf(n);
  }
}
function Wn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[os] = n, new Proxy(e, {
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
          const u = ls(a.value, o) ?? ("_" in a.value ? ls((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[os];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = ls(d.value, o);
            if (f) return f;
            const h = d.value && d.value[os];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const e2 = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...Kr({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: Wa
    },
    zIndex: 2400
  })
}, "VDialog"), Ya = ce()({
  name: "VDialog",
  props: e2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Yr(), o = ne();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = o.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = o.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Vr(o.value.contentEl);
        if (!h.length) return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Te && ye(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), ye(i, async (a) => {
      var u, c;
      await De(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = k(() => he({
      "aria-haspopup": "dialog",
      "aria-expanded": String(i.value)
    }, e.activatorProps));
    return de(() => {
      const a = Hn.filterProps(e);
      return y(Hn, he({
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
          return y(Ge, {
            root: "VDialog"
          }, {
            default: () => {
              var f;
              return [(f = n.default) == null ? void 0 : f.call(n, ...c)];
            }
          });
        }
      });
    }), Wn({}, o);
  }
});
function mf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function gf(e) {
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
function t2(e) {
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
const n2 = Symbol.for("vuetify:v-slide-group"), Ka = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: n2
  },
  nextIcon: {
    type: Le,
    default: "$next"
  },
  prevIcon: {
    type: Le,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...we(),
  ...G_(),
  ...Re(),
  ...Sl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), tl = ce()({
  name: "VSlideGroup",
  props: Ka(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = Xt(), {
      displayClasses: r,
      mobile: o
    } = Ga(e), l = Hr(e, e.symbol), s = ge(!1), a = ge(0), u = ge(0), c = ge(0), d = k(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = Hi(), {
      resizeRef: v,
      contentRect: m
    } = Hi(), p = k(() => l.selected.value.length ? l.items.value.findIndex((U) => U.id === l.selected.value[0]) : -1), g = k(() => l.selected.value.length ? l.items.value.findIndex((U) => U.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Te) {
      let U = -1;
      ye(() => [l.selected.value, h.value, m.value, d.value], () => {
        cancelAnimationFrame(U), U = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Y = d.value ? "width" : "height";
            u.value = h.value[Y], c.value = m.value[Y], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const Y = v.value.children[g.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = t2({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: d.value
            }) : s.value && (a.value = gf({
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
    const w = ge(!1);
    let _ = 0, b = 0;
    function x(U) {
      const Y = d.value ? "clientX" : "clientY";
      b = (i.value && d.value ? -1 : 1) * a.value, _ = U.touches[0][Y], w.value = !0;
    }
    function V(U) {
      if (!s.value) return;
      const Y = d.value ? "clientX" : "clientY", Q = i.value && d.value ? -1 : 1;
      a.value = Q * (b + _ - U.touches[0][Y]);
    }
    function C(U) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function T() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = ge(!1);
    function R(U) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const Y of U.composedPath())
          for (const Q of v.value.children)
            if (Q === Y) {
              a.value = gf({
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
    function j(U) {
      $.value = !1;
    }
    function L(U) {
      var Y;
      !$.value && !(U.relatedTarget && ((Y = v.value) != null && Y.contains(U.relatedTarget))) && S();
    }
    function N(U) {
      v.value && (d.value ? U.key === "ArrowRight" ? S(i.value ? "prev" : "next") : U.key === "ArrowLeft" && S(i.value ? "next" : "prev") : U.key === "ArrowDown" ? S("next") : U.key === "ArrowUp" && S("prev"), U.key === "Home" ? S("first") : U.key === "End" && S("last"));
    }
    function S(U) {
      var Y, Q, le, ve, J;
      if (v.value)
        if (!U)
          (Y = Vr(v.value)[0]) == null || Y.focus();
        else if (U === "next") {
          const ue = (Q = v.value.querySelector(":focus")) == null ? void 0 : Q.nextElementSibling;
          ue ? ue.focus() : S("first");
        } else if (U === "prev") {
          const ue = (le = v.value.querySelector(":focus")) == null ? void 0 : le.previousElementSibling;
          ue ? ue.focus() : S("last");
        } else U === "first" ? (ve = v.value.firstElementChild) == null || ve.focus() : U === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function B(U) {
      const Y = a.value + (U === "prev" ? -1 : 1) * u.value;
      a.value = pt(Y, 0, c.value - u.value);
    }
    const I = k(() => {
      let U = a.value > c.value - u.value ? -(c.value - u.value) + mf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (U = mf(-a.value));
      const Y = i.value && d.value ? -1 : 1;
      return {
        transform: `translate${d.value ? "X" : "Y"}(${Y * U}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), W = k(() => ({
      next: l.next,
      prev: l.prev,
      select: l.select,
      isSelected: l.isSelected
    })), A = k(() => {
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
    }), D = k(() => Math.abs(a.value) > 0), O = k(() => c.value > Math.abs(a.value) + u.value);
    return de(() => y(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": A.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: L
    }, {
      default: () => {
        var U, Y, Q;
        return [A.value && y("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !D.value
          }],
          onClick: () => D.value && B("prev")
        }, [((U = n.prev) == null ? void 0 : U.call(n, W.value)) ?? y(of, null, {
          default: () => [y(Oe, {
            icon: i.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), y("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: T
        }, [y("div", {
          ref: v,
          class: "v-slide-group__content",
          style: I.value,
          onTouchstartPassive: x,
          onTouchmovePassive: V,
          onTouchendPassive: C,
          onFocusin: R,
          onFocusout: j,
          onKeydown: N
        }, [(Y = n.default) == null ? void 0 : Y.call(n, W.value)])]), A.value && y("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !O.value
          }],
          onClick: () => O.value && B("next")
        }, [((Q = n.next) == null ? void 0 : Q.call(n, W.value)) ?? y(of, null, {
          default: () => [y(Oe, {
            icon: i.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: l.selected,
      scrollTo: B,
      scrollOffset: a,
      focus: S
    };
  }
}), Ev = Symbol.for("vuetify:v-chip-group"), i2 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: yi
  },
  ...Ka(),
  ...we(),
  ...Sl({
    selectedClass: "v-chip--selected"
  }),
  ...Re(),
  ...He(),
  ...Vn({
    variant: "tonal"
  })
}, "VChipGroup");
ce()({
  name: "VChipGroup",
  props: i2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = Hr(e, Ev);
    return cn({
      VChip: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        filter: ae(e, "filter"),
        variant: ae(e, "variant")
      }
    }), de(() => {
      const u = tl.filterProps(e);
      return y(tl, he(u, {
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
const r2 = Z({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Le,
  closable: Boolean,
  closeIcon: {
    type: Le,
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
  prependIcon: Le,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Dt(),
  onClickOnce: Dt(),
  ...pi(),
  ...we(),
  ...Mt(),
  ...kn(),
  ...Cl(),
  ...dt(),
  ...Ml(),
  ...zr(),
  ...Re({
    tag: "span"
  }),
  ...He(),
  ...Vn({
    variant: "tonal"
  })
}, "VChip"), Vv = ce()({
  name: "VChip",
  directives: {
    Ripple: wi
  },
  props: r2(),
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
    } = Ur(), {
      borderClasses: l
    } = bi(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = Gi(e), {
      densityClasses: c
    } = Kt(e), {
      elevationClasses: d
    } = En(e), {
      roundedClasses: f
    } = ht(e), {
      sizeClasses: h
    } = jr(e), {
      themeClasses: v
    } = qe(e), m = Pe(e, "modelValue"), p = kl(e, Ev, !1), g = Tl(e, n), w = k(() => e.link !== !1 && g.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (!!p || e.link || g.isClickable.value)), b = k(() => ({
      "aria-label": o(e.closeLabel),
      onClick(C) {
        C.stopPropagation(), m.value = !1, i("click:close", C);
      }
    }));
    function x(C) {
      var T;
      i("click", C), _.value && ((T = g.navigate) == null || T.call(g, C), p == null || p.toggle());
    }
    function V(C) {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), x(C));
    }
    return () => {
      const C = g.isLink.value ? "a" : e.tag, T = !!(e.appendIcon || e.appendAvatar), $ = !!(T || r.append), R = !!(r.close || e.closable), j = !!(r.filter || e.filter) && p, L = !!(e.prependIcon || e.prependAvatar), N = !!(L || r.prepend), S = !p || p.isSelected.value;
      return m.value && We(y(C, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": _.value,
          "v-chip--filter": j,
          "v-chip--pill": e.pill
        }, v.value, l.value, S ? s.value : void 0, c.value, d.value, f.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [S ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: g.href.value,
        tabindex: _.value ? 0 : void 0,
        onClick: x,
        onKeydown: _.value && !w.value && V
      }, {
        default: () => {
          var B;
          return [Wi(_.value, "v-chip"), j && y(wv, {
            key: "filter"
          }, {
            default: () => [We(y("div", {
              class: "v-chip__filter"
            }, [r.filter ? y(Ge, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : y(Oe, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[an, p.isSelected.value]])]
          }), N && y("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? y(Ge, {
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
          }, r.prepend) : y(Ce, null, [e.prependIcon && y(Oe, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && y(vi, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), y("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((B = r.default) == null ? void 0 : B.call(r, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), $ && y("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? y(Ge, {
            key: "append-defaults",
            disabled: !T,
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
          }, r.append) : y(Ce, null, [e.appendIcon && y(Oe, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(vi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && y("button", he({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? y(Ge, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : y(Oe, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[jt("ripple"), _.value && e.ripple, null]]);
    };
  }
}), o2 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...we(),
  ...qr({
    transition: {
      component: pv
    }
  })
}, "VCounter"), Lv = ce()({
  name: "VCounter",
  functional: !0,
  props: o2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return de(() => y(yn, {
      transition: e.transition
    }, {
      default: () => [We(y("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[an, e.active]])]
    })), {};
  }
}), l2 = Z({
  text: String,
  onClick: Dt(),
  ...we(),
  ...He()
}, "VLabel"), Xa = ce()({
  name: "VLabel",
  props: l2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return de(() => {
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
}), s2 = Z({
  floating: Boolean,
  ...we()
}, "VFieldLabel"), mo = ce()({
  name: "VFieldLabel",
  props: s2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return de(() => y(Xa, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Pv(e) {
  const {
    t
  } = Ur();
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
    return y(Oe, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Za = Z({
  focused: Boolean,
  "onUpdate:focused": Dt()
}, "focus");
function qi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn();
  const n = Pe(e, "focused"), i = k(() => ({
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
const a2 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ja = Z({
  appendInnerIcon: Le,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Le,
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
  prependInnerIcon: Le,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => a2.includes(e)
  },
  "onClick:clear": Dt(),
  "onClick:appendInner": Dt(),
  "onClick:prependInner": Dt(),
  ...we(),
  ...za(),
  ...dt(),
  ...He()
}, "VField"), Qa = ce()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Za(),
    ...Ja()
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
    } = qe(e), {
      loaderClasses: l
    } = Vl(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = qi(e), {
      InputIcon: d
    } = Pv(e), {
      roundedClasses: f
    } = ht(e), {
      rtlClasses: h
    } = Xt(), v = k(() => e.dirty || e.active), m = k(() => !e.singleLine && !!(e.label || r.label)), p = _t(), g = k(() => e.id || `input-${p}`), w = k(() => `${g.value}-messages`), _ = ne(), b = ne(), x = ne(), V = k(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: C,
      backgroundColorStyles: T
    } = xt(ae(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = Ht(k(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    ye(v, (N) => {
      if (m.value) {
        const S = _.value.$el, B = b.value.$el;
        requestAnimationFrame(() => {
          const I = Na(S), W = B.getBoundingClientRect(), A = W.x - I.x, D = W.y - I.y - (I.height / 2 - W.height / 2), O = W.width / 0.75, U = Math.abs(O - I.width) > 1 ? {
            maxWidth: me(O)
          } : void 0, Y = getComputedStyle(S), Q = getComputedStyle(B), le = parseFloat(Y.transitionDuration) * 1e3 || 150, ve = parseFloat(Q.getPropertyValue("--v-field-label-scale")), J = Q.getPropertyValue("color");
          S.style.visibility = "visible", B.style.visibility = "hidden", oi(S, {
            transform: `translate(${A}px, ${D}px) scale(${ve})`,
            color: J,
            ...U
          }, {
            duration: le,
            easing: Lr,
            direction: N ? "normal" : "reverse"
          }).finished.then(() => {
            S.style.removeProperty("visibility"), B.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const j = k(() => ({
      isActive: v,
      isFocused: a,
      controlRef: x,
      blur: c,
      focus: u
    }));
    function L(N) {
      N.target !== document.activeElement && N.preventDefault();
    }
    return de(() => {
      var A, D, O;
      const N = e.variant === "outlined", S = r["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || r.clear), I = !!(r["append-inner"] || e.appendInnerIcon || B), W = () => r.label ? r.label({
        ...j.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return y("div", he({
        class: ["v-field", {
          "v-field--active": v.value,
          "v-field--appended": I,
          "v-field--center-affix": e.centerAffix ?? !V.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": S,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !W(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, C.value, s.value, l.value, f.value, h.value, e.class],
        style: [T.value, e.style],
        onClick: L
      }, n), [y("div", {
        class: "v-field__overlay"
      }, null), y(ja, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: r.loader
      }), S && y("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && y(d, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (A = r["prepend-inner"]) == null ? void 0 : A.call(r, j.value)]), y("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && y(mo, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: g.value,
        style: R.value
      }, {
        default: () => [W()]
      }), y(mo, {
        ref: _,
        for: g.value
      }, {
        default: () => [W()]
      }), (D = r.default) == null ? void 0 : D.call(r, {
        ...j.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), B && y(wv, {
        key: "clear"
      }, {
        default: () => [We(y("div", {
          class: "v-field__clearable",
          onMousedown: (U) => {
            U.preventDefault(), U.stopPropagation();
          }
        }, [r.clear ? r.clear() : y(d, {
          name: "clear"
        }, null)]), [[an, e.dirty]])]
      }), I && y("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(O = r["append-inner"]) == null ? void 0 : O.call(r, j.value), e.appendInnerIcon && y(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), y("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [N && y(Ce, null, [y("div", {
        class: "v-field__outline__start"
      }, null), m.value && y("div", {
        class: "v-field__outline__notch"
      }, [y(mo, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [W()]
      })]), y("div", {
        class: "v-field__outline__end"
      }, null)]), V.value && m.value && y(mo, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [W()]
      })])]);
    }), {
      controlRef: x
    };
  }
});
function Tv(e) {
  const t = Object.keys(Qa.props).filter((n) => !Aa(n) && n !== "class" && n !== "style");
  return Sh(e, t);
}
const u2 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...we(),
  ...qr({
    transition: {
      component: pv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), c2 = ce()({
  name: "VMessages",
  props: u2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => on(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = Ht(k(() => e.color));
    return de(() => y(yn, {
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
}), f2 = Symbol.for("vuetify:form");
function Mv() {
  return $e(f2, null);
}
const d2 = Z({
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
  ...Za()
}, "validation");
function h2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _t();
  const i = Pe(e, "modelValue"), r = k(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Mv(), l = ne([]), s = ge(!0), a = k(() => !!(on(i.value === "" ? null : i.value).length || on(r.value === "" ? null : r.value).length)), u = k(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = k(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), d = k(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? on(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
  }), f = k(() => {
    let b = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    b === "lazy" && (b = "input lazy");
    const x = new Set((b == null ? void 0 : b.split(" ")) ?? []);
    return {
      blur: x.has("blur") || x.has("input"),
      input: x.has("input"),
      submit: x.has("submit"),
      lazy: x.has("lazy")
    };
  }), h = k(() => {
    var b;
    return e.error || (b = e.errorMessages) != null && b.length ? !1 : e.rules.length ? s.value ? l.value.length || f.value.lazy ? null : !0 : !l.value.length : !0;
  }), v = ge(!1), m = k(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = k(() => e.name ?? Bt(n));
  hl(() => {
    o == null || o.register({
      id: p.value,
      validate: _,
      reset: g,
      resetValidation: w
    });
  }), Wt(() => {
    o == null || o.unregister(p.value);
  }), Ut(async () => {
    f.value.lazy || await _(!0), o == null || o.update(p.value, h.value, d.value);
  }), hi(() => f.value.input, () => {
    ye(r, () => {
      if (r.value != null)
        _();
      else if (e.focused) {
        const b = ye(() => e.focused, (x) => {
          x || _(), b();
        });
      }
    });
  }), hi(() => f.value.blur, () => {
    ye(() => e.focused, (b) => {
      b || _();
    });
  }), ye([h, d], () => {
    o == null || o.update(p.value, h.value, d.value);
  });
  function g() {
    i.value = null, De(w);
  }
  function w() {
    s.value = !0, f.value.lazy ? l.value = [] : _(!0);
  }
  async function _() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const x = [];
    v.value = !0;
    for (const V of e.rules) {
      if (x.length >= +(e.maxErrors ?? 1))
        break;
      const T = await (typeof V == "function" ? V : () => V)(r.value);
      if (T !== !0) {
        if (T !== !1 && typeof T != "string") {
          console.warn(`${T} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        x.push(T || "");
      }
    }
    return l.value = x, v.value = !1, s.value = b, l.value;
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
    validate: _,
    validationClasses: m
  };
}
const Yi = Z({
  id: String,
  appendIcon: Le,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Le,
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
  "onClick:prepend": Dt(),
  "onClick:append": Dt(),
  ...we(),
  ...Mt(),
  ...d2()
}, "VInput"), sn = ce()({
  name: "VInput",
  props: {
    ...Yi()
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
    } = Kt(e), {
      rtlClasses: l
    } = Xt(), {
      InputIcon: s
    } = Pv(e), a = _t(), u = k(() => e.id || `input-${a}`), c = k(() => `${u.value}-messages`), {
      errorMessages: d,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: g,
      reset: w,
      resetValidation: _,
      validate: b,
      validationClasses: x
    } = h2(e, "v-input", u), V = k(() => ({
      id: u,
      messagesId: c,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: g,
      reset: w,
      resetValidation: _,
      validate: b
    })), C = k(() => {
      var T;
      return (T = e.errorMessages) != null && T.length || !m.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return de(() => {
      var L, N, S, B;
      const T = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), R = C.value.length > 0, j = !e.hideDetails || e.hideDetails === "auto" && (R || !!i.details);
      return y("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, x.value, e.class],
        style: e.style
      }, [T && y("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(L = i.prepend) == null ? void 0 : L.call(i, V.value), e.prependIcon && y(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && y("div", {
        class: "v-input__control"
      }, [(N = i.default) == null ? void 0 : N.call(i, V.value)]), $ && y("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && y(s, {
        key: "append-icon",
        name: "append"
      }, null), (S = i.append) == null ? void 0 : S.call(i, V.value)]), j && y("div", {
        class: "v-input__details"
      }, [y(c2, {
        id: c.value,
        active: R,
        messages: C.value
      }, {
        message: i.message
      }), (B = i.details) == null ? void 0 : B.call(i, V.value)])]);
    }), {
      reset: w,
      resetValidation: _,
      validate: b,
      isValid: p,
      errorMessages: d
    };
  }
}), v2 = Z({
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
  ...Yi({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => on(e).every((t) => t != null && typeof t == "object")
  },
  ...Ja({
    clearable: !0
  })
}, "VFileInput"), m2 = ce()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: v2(),
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
    } = Ur(), l = Pe(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = qi(e), c = k(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = k(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: j = 0
      } = R;
      return $ + j;
    }, 0)), f = k(() => Tc(d.value, c.value)), h = k(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: j = 0
      } = $;
      return e.showSize ? `${R} (${Tc(j, c.value)})` : R;
    })), v = k(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, f.value) : o(e.counterString, $);
    }), m = ne(), p = ne(), g = ne(), w = k(() => s.value || e.active), _ = k(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      g.value !== document.activeElement && (($ = g.value) == null || $.focus()), s.value || a();
    }
    function x($) {
      var R;
      (R = g.value) == null || R.click();
    }
    function V($) {
      i("mousedown:control", $);
    }
    function C($) {
      var R;
      (R = g.value) == null || R.click(), i("click:control", $);
    }
    function T($) {
      $.stopPropagation(), b(), De(() => {
        l.value = [], Vh(e["onClick:clear"], $);
      });
    }
    return ye(l, ($) => {
      (!Array.isArray($) || !$.length) && g.value && (g.value.value = "");
    }), de(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [j, L] = Dr(n), {
        modelValue: N,
        ...S
      } = sn.filterProps(e), B = Tv(e);
      return y(sn, he({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (I) => l.value = I,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": _.value
        }, e.class],
        style: e.style,
        "onClick:prepend": x
      }, j, S, {
        centerAffix: !_.value,
        focused: s.value
      }), {
        ...r,
        default: (I) => {
          let {
            id: W,
            isDisabled: A,
            isDirty: D,
            isReadonly: O,
            isValid: U
          } = I;
          return y(Qa, he({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: V,
            onClick: C,
            "onClick:clear": T,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, B, {
            id: W.value,
            active: w.value || D.value,
            dirty: D.value,
            disabled: A.value,
            focused: s.value,
            error: U.value === !1
          }), {
            ...r,
            default: (Y) => {
              var ve;
              let {
                props: {
                  class: Q,
                  ...le
                }
              } = Y;
              return y(Ce, null, [y("input", he({
                ref: g,
                type: "file",
                readonly: O.value,
                disabled: A.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (J) => {
                  J.stopPropagation(), O.value && J.preventDefault(), b();
                },
                onChange: (J) => {
                  if (!J.target) return;
                  const ue = J.target;
                  l.value = [...ue.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, le, L), null), y("div", {
                class: Q
              }, [!!((ve = l.value) != null && ve.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: d.value,
                totalBytesReadable: f.value
              }) : e.chips ? h.value.map((J) => y(Vv, {
                key: J,
                size: "small",
                color: e.color
              }, {
                default: () => [J]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: R ? (I) => {
          var W, A;
          return y(Ce, null, [(W = r.details) == null ? void 0 : W.call(r, I), $ && y(Ce, null, [y("span", null, null), y(Lv, {
            active: !!((A = l.value) != null && A.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), Wn({}, m, p, g);
  }
}), Iv = Al.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Av = Al.reduce((e, t) => {
  const n = "offset" + Sn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), $v = Al.reduce((e, t) => {
  const n = "order" + Sn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), yf = {
  col: Object.keys(Iv),
  offset: Object.keys(Av),
  order: Object.keys($v)
};
function g2(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const y2 = ["auto", "start", "end", "center", "baseline", "stretch"], p2 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Iv,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Av,
  order: {
    type: [String, Number],
    default: null
  },
  ...$v,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => y2.includes(e)
  },
  ...we(),
  ...Re()
}, "VCol"), go = ce()({
  name: "VCol",
  props: p2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in yf)
        yf[o].forEach((s) => {
          const a = e[s], u = g2(o, s, a);
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
      return zn(e.tag, {
        class: [i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), eu = ["start", "end", "center"], Nv = ["space-between", "space-around", "space-evenly"];
function tu(e, t) {
  return Al.reduce((n, i) => {
    const r = e + Sn(i);
    return n[r] = t(), n;
  }, {});
}
const b2 = [...eu, "baseline", "stretch"], Rv = (e) => b2.includes(e), Ov = tu("align", () => ({
  type: String,
  default: null,
  validator: Rv
})), w2 = [...eu, ...Nv], Bv = (e) => w2.includes(e), Fv = tu("justify", () => ({
  type: String,
  default: null,
  validator: Bv
})), x2 = [...eu, ...Nv, "stretch"], Dv = (e) => x2.includes(e), Hv = tu("alignContent", () => ({
  type: String,
  default: null,
  validator: Dv
})), pf = {
  align: Object.keys(Ov),
  justify: Object.keys(Fv),
  alignContent: Object.keys(Hv)
}, _2 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function S2(e, t, n) {
  let i = _2[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const C2 = Z({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Rv
  },
  ...Ov,
  justify: {
    type: String,
    default: null,
    validator: Bv
  },
  ...Fv,
  alignContent: {
    type: String,
    default: null,
    validator: Dv
  },
  ...Hv,
  ...we(),
  ...Re()
}, "VRow"), kt = ce()({
  name: "VRow",
  props: C2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in pf)
        pf[o].forEach((l) => {
          const s = e[l], a = S2(o, l, s);
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
      return zn(e.tag, {
        class: ["v-row", i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), nl = Ui("v-spacer", "div", "VSpacer");
function k2(e) {
  const t = ge(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), De(() => t.value = e);
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
  return st(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const E2 = Z({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Wr({
    location: "bottom"
  }),
  ...Ll(),
  ...dt(),
  ...Vn(),
  ...He(),
  ...qt(Kr({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), V2 = ce()({
  name: "VSnackbar",
  props: E2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      locationStyles: r
    } = Gr(e), {
      positionClasses: o
    } = Pl(e), {
      scopeId: l
    } = Yr(), {
      themeClasses: s
    } = qe(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = Gi(e), {
      roundedClasses: d
    } = ht(e), f = k2(Number(e.timeout)), h = ne(), v = ne(), m = ge(!1);
    ye(i, g), ye(() => e.timeout, g), Ut(() => {
      i.value && g();
    });
    let p = -1;
    function g() {
      f.reset(), window.clearTimeout(p);
      const x = Number(e.timeout);
      if (!i.value || x === -1) return;
      const V = Er(v.value);
      f.start(V), p = window.setTimeout(() => {
        i.value = !1;
      }, x);
    }
    function w() {
      f.reset(), window.clearTimeout(p);
    }
    function _() {
      m.value = !0, w();
    }
    function b() {
      m.value = !1, g();
    }
    return de(() => {
      const x = Hn.filterProps(e), V = !!(n.default || n.text || e.text);
      return y(Hn, he({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": i.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, x, {
        modelValue: i.value,
        "onUpdate:modelValue": (C) => i.value = C,
        contentProps: he({
          class: ["v-snackbar__wrapper", s.value, a.value, d.value, c.value],
          style: [r.value, u.value],
          onPointerenter: _,
          onPointerleave: b
        }, x.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, l), {
        default: () => {
          var C, T;
          return [Wi(!1, "v-snackbar"), e.timer && !m.value && y("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [y(tv, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), V && y("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((C = n.text) == null ? void 0 : C.call(n)) ?? e.text, (T = n.default) == null ? void 0 : T.call(n)]), n.actions && y(Ge, {
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
    }), Wn({}, h);
  }
}), zv = Symbol.for("vuetify:v-tabs"), L2 = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...qt(cv({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), js = ce()({
  name: "VTab",
  props: L2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = Ht(e, "sliderColor"), l = ne(), s = ne(), a = k(() => e.direction === "horizontal"), u = k(() => {
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
        const g = getComputedStyle(m).color, w = m.getBoundingClientRect(), _ = p.getBoundingClientRect(), b = a.value ? "x" : "y", x = a.value ? "X" : "Y", V = a.value ? "right" : "bottom", C = a.value ? "width" : "height", T = w[b], $ = _[b], R = T > $ ? w[V] - _[V] : w[b] - _[b], j = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", N = (Math.abs(R) + (Math.sign(R) < 0 ? w[C] : _[C])) / Math.max(w[C], _[C]) || 0, S = w[C] / _[C] || 0, B = 1.5;
        oi(p, {
          backgroundColor: [g, "currentcolor"],
          transform: [`translate${x}(${R}px) scale${x}(${S})`, `translate${x}(${R / B}px) scale${x}(${(N - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(j)
        }, {
          duration: 225,
          easing: Lr
        });
      }
    }
    return de(() => {
      const d = Je.filterProps(e);
      return y(Je, he({
        symbol: zv,
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
          return y(Ce, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && y("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), Wn({}, l);
  }
});
function P2(e) {
  return e ? e.map((t) => Wo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const T2 = Z({
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
  ...Ka({
    mandatory: "force"
  }),
  ...Mt(),
  ...Re()
}, "VTabs"), M2 = ce()({
  name: "VTabs",
  props: T2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = k(() => P2(e.items)), {
      densityClasses: o
    } = Kt(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = xt(ae(e, "bgColor"));
    return cn({
      VTab: {
        color: ae(e, "color"),
        direction: ae(e, "direction"),
        stacked: ae(e, "stacked"),
        fixed: ae(e, "fixedTabs"),
        sliderColor: ae(e, "sliderColor"),
        hideSlider: ae(e, "hideSlider")
      }
    }), de(() => {
      const a = tl.filterProps(e);
      return y(tl, he(a, {
        modelValue: i.value,
        "onUpdate:modelValue": (u) => i.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, l.value, e.class],
        style: [{
          "--v-tabs-height": me(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: zv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => y(js, he(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), I2 = Z({
  id: String,
  text: String,
  ...qt(Kr({
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
}, "VTooltip"), Ni = ce()({
  name: "VTooltip",
  props: I2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Yr(), o = _t(), l = k(() => e.id || `v-tooltip-${o}`), s = ne(), a = k(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = k(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = k(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), d = k(() => he({
      "aria-describedby": l.value
    }, e.activatorProps));
    return de(() => {
      const f = Hn.filterProps(e);
      return y(Hn, he({
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
    }), Wn({}, s);
  }
}), A2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function $2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function N2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), A2(t);
}
function R2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function O2() {
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
    touchstart: (n) => $2(n, t),
    touchend: (n) => N2(n, t),
    touchmove: (n) => R2(n, t)
  };
}
function B2(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = O2(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, _h(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function F2(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  _h(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const jv = {
  mounted: B2,
  unmounted: F2
}, D2 = jv, Uv = Symbol.for("vuetify:v-window"), Wv = Symbol.for("vuetify:v-window-group"), H2 = Z({
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
  ...we(),
  ...Re(),
  ...He()
}, "VWindow"), z2 = ce()({
  name: "VWindow",
  directives: {
    Touch: jv
  },
  props: H2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      isRtl: r
    } = Xt(), {
      t: o
    } = Ur(), l = Hr(e, Wv), s = ne(), a = k(() => r.value ? !e.reverse : e.reverse), u = ge(!1), c = k(() => {
      const b = e.direction === "vertical" ? "y" : "x", V = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${V}-transition`;
    }), d = ge(0), f = ne(void 0), h = k(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    ye(h, (b, x) => {
      const V = l.items.value.length, C = V - 1;
      V <= 2 ? u.value = b < x : b === C && x === 0 ? u.value = !0 : b === 0 && x === C ? u.value = !1 : u.value = b < x;
    }), Qe(Uv, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const v = k(() => e.continuous || h.value !== 0), m = k(() => e.continuous || h.value !== l.items.value.length - 1);
    function p() {
      v.value && l.prev();
    }
    function g() {
      m.value && l.next();
    }
    const w = k(() => {
      const b = [], x = {
        icon: r.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: l.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      b.push(v.value ? n.prev ? n.prev({
        props: x
      }) : y(Je, x, null) : y("div", null, null));
      const V = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: V
      }) : y(Je, V, null) : y("div", null, null)), b;
    }), _ = k(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : g();
        },
        right: () => {
          a.value ? g() : p();
        },
        start: (x) => {
          let {
            originalEvent: V
          } = x;
          V.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return de(() => We(y(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var b, x;
        return [y("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(b = n.default) == null ? void 0 : b.call(n, {
          group: l
        }), e.showArrows !== !1 && y("div", {
          class: "v-window__controls"
        }, [w.value])]), (x = n.additional) == null ? void 0 : x.call(n, {
          group: l
        })];
      }
    }), [[jt("touch"), _.value]])), {
      group: l
    };
  }
});
function Gv() {
  const e = ge(!1);
  return Ut(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: k(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: $r(e)
  };
}
const j2 = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...we(),
  ...Cl(),
  ...$l()
}, "VWindowItem"), bf = ce()({
  name: "VWindowItem",
  directives: {
    Touch: D2
  },
  props: j2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Uv), r = kl(e, Wv), {
      isBooted: o
    } = Gv();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = ge(!1), s = k(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !l.value || !i || (l.value = !1, i.transitionCount.value > 0 && (i.transitionCount.value -= 1, i.transitionCount.value === 0 && (i.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      l.value || !i || (l.value = !0, i.transitionCount.value === 0 && (i.transitionHeight.value = me((v = i.rootRef.value) == null ? void 0 : v.clientHeight)), i.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function d(v) {
      l.value && De(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = me(v.clientHeight));
      });
    }
    const f = k(() => {
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
    } = qa(e, r.isSelected);
    return de(() => y(yn, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [We(y("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[an, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), U2 = /* @__PURE__ */ je("h3", { class: "heading" }, "Select File", -1), W2 = /* @__PURE__ */ je("b", null, "replace", -1), G2 = /* @__PURE__ */ je("h3", { class: "heading" }, "Preview", -1), q2 = /* @__PURE__ */ je("b", null, "copy", -1), Y2 = /* @__PURE__ */ ji({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = ne(!1), o = ne(0), l = ne(), s = ne(!1), a = k(
      () => {
        var h;
        return o.value === 0 && (l == null ? void 0 : l.value) && ((h = l == null ? void 0 : l.value[0]) == null ? void 0 : h.name.toLowerCase().endsWith(".tgf")) || o.value === 1 && n.graphAsTgf !== "Graph is empty";
      }
    ), u = [
      (h) => !!h[0] || "File is required",
      (h) => {
        var v;
        return !h || /\.(tgf|TGF)$/.test((v = h[0]) == null ? void 0 : v.name) || "Invalid file format. Please select a .tgf file.";
      }
    ];
    function c() {
      if (l != null && l.value) {
        const h = new FileReader();
        for (let v of l.value)
          h.readAsText(v), h.onload = (m) => {
            var p;
            i("file-imported", (p = m.target) == null ? void 0 : p.result), f();
          }, h.onerror = (m) => {
            var p;
            console.error(
              //@ts-ignore
              `Error reading the file ${l.name}: ${(p = m.target) == null ? void 0 : p.error}`
            );
          };
      }
    }
    function d() {
      o.value === 0 ? c() : o.value === 1 && navigator.clipboard.writeText(n.graphAsTgf.toString()).then(
        () => s.value = !0,
        (h) => console.error("Copy unsuccessful: ", h)
      );
    }
    function f() {
      r.value = !1, o.value = 0, l.value = void 0, s.value = !1;
    }
    return (h, v) => (nn(), ni(Ya, {
      modelValue: r.value,
      "onUpdate:modelValue": v[6] || (v[6] = (m) => r.value = m),
      "max-width": "800px"
    }, {
      activator: fe(({ props: m }) => [
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: fe(({ props: p }) => [
            y(Je, he({
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
      default: fe(() => [
        y(Ua, null, {
          default: fe(() => [
            y(Mr, null, {
              default: fe(() => [
                y(M2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[0] || (v[0] = (m) => o.value = m)
                }, {
                  default: fe(() => [
                    y(js, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: fe(() => [
                        Ue("Import")
                      ]),
                      _: 1
                    }),
                    y(js, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: fe(() => [
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
            y(hr, null, {
              default: fe(() => [
                y(z2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[2] || (v[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: fe(() => [
                    y(bf, null, {
                      default: fe(() => [
                        U2,
                        y(m2, {
                          modelValue: l.value,
                          "onUpdate:modelValue": v[1] || (v[1] = (m) => l.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        y(hr, null, {
                          default: fe(() => [
                            Ue(" The import is limited to files in trivial graph format. Importing will "),
                            W2,
                            Ue(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(bf, null, {
                      default: fe(() => [
                        G2,
                        je("pre", null, Xn(n.graphAsTgf), 1),
                        y(hr, null, {
                          default: fe(() => [
                            Ue("This export action will "),
                            q2,
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
            y(Il, null, {
              default: fe(() => [
                y(nl),
                y(Je, {
                  color: "secondary",
                  variant: "text",
                  disabled: !a.value,
                  onClick: v[3] || (v[3] = (m) => d())
                }, {
                  default: fe(() => [
                    Ue("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                y(Je, {
                  color: "secondary",
                  variant: "text",
                  onClick: v[4] || (v[4] = (m) => f())
                }, {
                  default: fe(() => [
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
        y(V2, {
          modelValue: s.value,
          "onUpdate:modelValue": v[5] || (v[5] = (m) => s.value = m),
          timeout: 1500
        }, {
          default: fe(() => [
            Ue("Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), K2 = ".heading{margin-top:10px;margin-bottom:10px}", nu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, X2 = /* @__PURE__ */ nu(Y2, [["styles", [K2]]]), Z2 = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...we(),
  ...Mt(),
  ...Re(),
  ...He()
}, "VTable"), J2 = ce()({
  name: "VTable",
  props: Z2(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = qe(e), {
      densityClasses: o
    } = Kt(e);
    return de(() => y(e.tag, {
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
            height: me(e.height)
          }
        }, [y("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), Q2 = { class: "text-left" }, eS = { class: "text-left" }, tS = { class: "text-left" }, nS = /* @__PURE__ */ ji({
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
    ], n = ne(!1), i = ["Action", "Desktop", "Mobile"];
    return (r, o) => (nn(), ni(Ya, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (l) => n.value = l),
      "max-width": "800px"
    }, {
      activator: fe(({ props: l }) => [
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: fe(({ props: s }) => [
            y(Je, he({
              "aria-label": "Help",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              icon: "$help",
              elevation: "6"
            }, { ...l, ...s }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: fe(() => [
        y(Ua, null, {
          default: fe(() => [
            y(Mr, { class: "card-header" }, {
              default: fe(() => [
                Ue("Controls")
              ]),
              _: 1
            }),
            y(J2, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: fe(() => [
                je("thead", null, [
                  je("tr", null, [
                    je("th", Q2, Xn(i[0]), 1),
                    je("th", eS, Xn(i[1]), 1),
                    je("th", tS, Xn(i[2]), 1)
                  ])
                ]),
                je("tbody", null, [
                  (nn(), bs(Ce, null, Mg(t, (l) => je("tr", {
                    key: l.action
                  }, [
                    je("td", null, Xn(l.action), 1),
                    je("td", null, Xn(l.desktop), 1),
                    je("td", null, Xn(l.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            y(Il, null, {
              default: fe(() => [
                y(nl),
                y(Je, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (l) => n.value = !1)
                }, {
                  default: fe(() => [
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
}), iS = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", rS = /* @__PURE__ */ nu(nS, [["styles", [iS]], ["__scopeId", "data-v-6c8401af"]]), qv = Symbol.for("vuetify:selection-control-group"), Yv = Z({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Le,
  trueIcon: Le,
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
    default: yi
  },
  ...we(),
  ...Mt(),
  ...He()
}, "SelectionControlGroup"), oS = Z({
  ...Yv({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ce()({
  name: "VSelectionControlGroup",
  props: oS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = _t(), o = k(() => e.id || `v-selection-control-group-${r}`), l = k(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return Qe(qv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), st(() => {
          s.delete(a);
        });
      }
    }), cn({
      [e.defaultsTarget]: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        density: ae(e, "density"),
        error: ae(e, "error"),
        inline: ae(e, "inline"),
        modelValue: i,
        multiple: k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)),
        name: l,
        falseIcon: ae(e, "falseIcon"),
        trueIcon: ae(e, "trueIcon"),
        readonly: ae(e, "readonly"),
        ripple: ae(e, "ripple"),
        type: ae(e, "type"),
        valueComparator: ae(e, "valueComparator")
      }
    }), de(() => {
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
});
const iu = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...we(),
  ...Yv()
}, "VSelectionControl");
function lS(e) {
  const t = $e(qv, void 0), {
    densityClasses: n
  } = Kt(e), i = Pe(e, "modelValue"), r = k(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = k(() => e.falseValue !== void 0 ? e.falseValue : !1), l = k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = k({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? on(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...on(i.value), v] : on(i.value).filter((p) => !e.valueComparator(p, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = Ht(k(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = xt(k(() => s.value && !e.error && !e.disabled ? e.color : void 0)), f = k(() => s.value ? e.trueIcon : e.falseIcon);
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
const il = ce()({
  name: "VSelectionControl",
  directives: {
    Ripple: wi
  },
  inheritAttrs: !1,
  props: iu(),
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
    } = lS(e), h = _t(), v = ge(!1), m = ge(!1), p = ne(), g = k(() => e.id || `input-${h}`), w = k(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function _(C) {
      w.value && (v.value = !0, Yo(C.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function x(C) {
      C.stopPropagation();
    }
    function V(C) {
      w.value && (e.readonly && r && De(() => r.forceUpdate()), s.value = C.target.checked);
    }
    return de(() => {
      var j, L;
      const C = i.label ? i.label({
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label, [T, $] = Dr(n), R = y("input", he({
        ref: p,
        checked: s.value,
        disabled: !!e.disabled,
        id: g.value,
        onBlur: b,
        onFocus: _,
        onInput: V,
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
      }, T, {
        style: e.style
      }), [y("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(j = i.default) == null ? void 0 : j.call(i, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), We(y("div", {
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
          onFocus: _,
          onBlur: b,
          id: g.value
        }
      })) ?? y(Ce, null, [l.value && y(Oe, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[jt("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), C && y(Xa, {
        for: g.value,
        onClick: x
      }, {
        default: () => [C]
      })]);
    }), {
      isFocused: v,
      input: p
    };
  }
}), Kv = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Le,
    default: "$checkboxIndeterminate"
  },
  ...iu({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Us = ce()({
  name: "VCheckboxBtn",
  props: Kv(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "indeterminate"), r = Pe(e, "modelValue");
    function o(a) {
      i.value && (i.value = !1);
    }
    const l = k(() => i.value ? e.indeterminateIcon : e.falseIcon), s = k(() => i.value ? e.indeterminateIcon : e.trueIcon);
    return de(() => {
      const a = qt(il.filterProps(e), ["modelValue"]);
      return y(il, he(a, {
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
}), sS = Z({
  ...Yi(),
  ...qt(Kv(), ["inline"])
}, "VCheckbox"), aS = ce()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: sS(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Pe(e, "modelValue"), {
      isFocused: o,
      focus: l,
      blur: s
    } = qi(e), a = _t(), u = k(() => e.id || `checkbox-${a}`);
    return de(() => {
      const [c, d] = Dr(n), f = sn.filterProps(e), h = Us.filterProps(e);
      return y(sn, he({
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
            isValid: _
          } = v;
          return y(Us, he(h, {
            id: m.value,
            "aria-describedby": p.value,
            disabled: g.value,
            readonly: w.value
          }, d, {
            error: _.value === !1,
            modelValue: r.value,
            "onUpdate:modelValue": (b) => r.value = b,
            onFocus: l,
            onBlur: s
          }), i);
        }
      });
    }), {};
  }
}), uS = Z({
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
  ...we()
}, "VColorPickerCanvas"), cS = Yt({
  name: "VColorPickerCanvas",
  props: uS(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = ge(!1), r = ne(), o = ge(parseFloat(e.width)), l = ge(parseFloat(e.height)), s = ne({
      x: 0,
      y: 0
    }), a = k({
      get: () => s.value,
      set(p) {
        var _, b;
        if (!r.value) return;
        const {
          x: g,
          y: w
        } = p;
        s.value = p, n("update:color", {
          h: ((_ = e.color) == null ? void 0 : _.h) ?? 0,
          s: pt(g, 0, o.value) / o.value,
          v: 1 - pt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = k(() => {
      const {
        x: p,
        y: g
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: me(e.dotSize),
        height: me(e.dotSize),
        transform: `translate(${me(p - w)}, ${me(g - w)})`
      };
    }), {
      resizeRef: c
    } = Hi((p) => {
      var _;
      if (!((_ = c.value) != null && _.offsetParent)) return;
      const {
        width: g,
        height: w
      } = p[0].contentRect;
      o.value = g, l.value = w;
    });
    function d(p, g, w) {
      const {
        left: _,
        top: b,
        width: x,
        height: V
      } = w;
      a.value = {
        x: pt(p - _, 0, x),
        y: pt(g - b, 0, V)
      };
    }
    function f(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const g = ox(p);
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
      const _ = g.createLinearGradient(0, 0, 0, p.height);
      _.addColorStop(0, "hsla(0, 0%, 0%, 0)"), _.addColorStop(1, "hsla(0, 0%, 0%, 1)"), g.fillStyle = _, g.fillRect(0, 0, p.width, p.height);
    }
    return ye(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, m, {
      immediate: !0
    }), ye(() => [o.value, l.value], (p, g) => {
      m(), s.value = {
        x: a.value.x * p[0] / g[0],
        y: a.value.y * p[1] / g[1]
      };
    }, {
      flush: "post"
    }), ye(() => e.color, () => {
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
    }), Ut(() => m()), de(() => y("div", {
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
function fS(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function dS(e, t) {
  if (t == null || typeof t == "string") {
    const n = Hh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return ri(t, ["r", "g", "b"]) ? n = _n(e) : ri(t, ["h", "s", "l"]) ? n = Nh(e) : ri(t, ["h", "s", "v"]) && (n = e), fS(n, !ri(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Vi = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, Ws = {
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
  to: _n,
  from: _l
};
var Lf;
const hS = {
  ...Ws,
  inputs: (Lf = Ws.inputs) == null ? void 0 : Lf.slice(0, 3)
}, Gs = {
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
  to: Nh,
  from: Oa
}, vS = {
  ...Gs,
  inputs: Gs.inputs.slice(0, 3)
}, Xv = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: Hh,
  from: Dh
}, mS = {
  ...Xv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, fi = {
  rgb: hS,
  rgba: Ws,
  hsl: vS,
  hsla: Gs,
  hex: mS,
  hexa: Xv
}, gS = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return y("div", {
    class: "v-color-picker-edit__input"
  }, [y("input", n, null), y("span", null, [t])]);
}, yS = Z({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(fi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(fi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(fi).includes(t))
  },
  ...we()
}, "VColorPickerEdit"), pS = Yt({
  name: "VColorPickerEdit",
  props: yS(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = k(() => e.modes.map((o) => ({
      ...fi[o],
      name: o
    }))), r = k(() => {
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
            h && n("update:color", o.from(c(l ?? o.to(Vi), h.value)));
          }
        };
      });
    });
    return de(() => {
      var o;
      return y("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => y(gS, l, null)), i.value.length > 1 && y(Je, {
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
}), ru = Symbol.for("vuetify:v-slider");
function bS(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function wS(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const xS = Z({
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
  ...dt(),
  ...kn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), _S = (e) => {
  const t = k(() => parseFloat(e.min)), n = k(() => parseFloat(e.max)), i = k(() => +e.step > 0 ? parseFloat(e.step) : 0), r = k(() => Math.max(Vc(i.value), Vc(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = pt(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, SS = (e) => {
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
  } = Xt(), a = ae(t, "reverse"), u = k(() => t.direction === "vertical"), c = k(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: m
  } = n, p = k(() => parseInt(t.thumbSize, 10)), g = k(() => parseInt(t.tickSize, 10)), w = k(() => parseInt(t.trackSize, 10)), _ = k(() => (f.value - d.value) / h.value), b = ae(t, "disabled"), x = k(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), V = k(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), C = k(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), T = ge(!1), $ = ge(0), R = ne(), j = ne();
  function L(J) {
    var G;
    const ue = t.direction === "vertical", ke = ue ? "top" : "left", ze = ue ? "height" : "width", et = ue ? "clientY" : "clientX", {
      [ke]: It,
      [ze]: Zt
    } = (G = R.value) == null ? void 0 : G.$el.getBoundingClientRect(), E = wS(J, et);
    let M = Math.min(Math.max((E - It - $.value) / Zt, 0), 1) || 0;
    return (ue ? c.value : c.value !== s.value) && (M = 1 - M), m(d.value + M * (f.value - d.value));
  }
  const N = (J) => {
    o({
      value: L(J)
    }), T.value = !1, $.value = 0;
  }, S = (J) => {
    j.value = l(J), j.value && (j.value.focus(), T.value = !0, j.value.contains(J.target) ? $.value = bS(J, j.value, t.direction) : ($.value = 0, r({
      value: L(J)
    })), i({
      value: L(J)
    }));
  }, B = {
    passive: !0,
    capture: !0
  };
  function I(J) {
    r({
      value: L(J)
    });
  }
  function W(J) {
    J.stopPropagation(), J.preventDefault(), N(J), window.removeEventListener("mousemove", I, B), window.removeEventListener("mouseup", W);
  }
  function A(J) {
    var ue;
    N(J), window.removeEventListener("touchmove", I, B), (ue = J.target) == null || ue.removeEventListener("touchend", A);
  }
  function D(J) {
    var ue;
    S(J), window.addEventListener("touchmove", I, B), (ue = J.target) == null || ue.addEventListener("touchend", A, {
      passive: !1
    });
  }
  function O(J) {
    J.preventDefault(), S(J), window.addEventListener("mousemove", I, B), window.addEventListener("mouseup", W, {
      passive: !1
    });
  }
  const U = (J) => {
    const ue = (J - d.value) / (f.value - d.value) * 100;
    return pt(isNaN(ue) ? 0 : ue, 0, 100);
  }, Y = ae(t, "showTicks"), Q = k(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: U(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: U(parseFloat(J)),
    label: t.ticks[J]
  })) : _.value !== 1 / 0 ? Ia(_.value + 1).map((J) => {
    const ue = d.value + J * h.value;
    return {
      value: ue,
      position: U(ue)
    };
  }) : [] : []), le = k(() => Q.value.some((J) => {
    let {
      label: ue
    } = J;
    return !!ue;
  })), ve = {
    activeThumbRef: j,
    color: ae(t, "color"),
    decimals: v,
    disabled: b,
    direction: ae(t, "direction"),
    elevation: ae(t, "elevation"),
    hasLabels: le,
    isReversed: a,
    indexFromEnd: c,
    min: d,
    max: f,
    mousePressed: T,
    numTicks: _,
    onSliderMousedown: O,
    onSliderTouchstart: D,
    parsedTicks: Q,
    parseMouseMove: L,
    position: U,
    readonly: ae(t, "readonly"),
    rounded: ae(t, "rounded"),
    roundValue: m,
    showTicks: Y,
    startOffset: $,
    step: h,
    thumbSize: p,
    thumbColor: x,
    thumbLabel: ae(t, "thumbLabel"),
    ticks: ae(t, "ticks"),
    tickSize: g,
    trackColor: V,
    trackContainerRef: R,
    trackFillColor: C,
    trackSize: w,
    vertical: u
  };
  return Qe(ru, ve), ve;
}, CS = Z({
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
  ...we()
}, "VSliderThumb"), kS = ce()({
  name: "VSliderThumb",
  directives: {
    Ripple: wi
  },
  props: CS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = $e(ru), {
      isRtl: o,
      rtlClasses: l
    } = Xt();
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
      indexFromEnd: _
    } = r, b = k(() => u.value ? void 0 : p.value), {
      elevationClasses: x
    } = En(b), {
      textColorClasses: V,
      textColorStyles: C
    } = Ht(s), {
      pageup: T,
      pagedown: $,
      end: R,
      home: j,
      left: L,
      right: N,
      down: S,
      up: B
    } = tx, I = [T, $, R, j, L, N, S, B], W = k(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function A(O, U) {
      if (!I.includes(O.key)) return;
      O.preventDefault();
      const Y = a.value || 0.1, Q = (e.max - e.min) / Y;
      if ([L, N, S, B].includes(O.key)) {
        const ve = (v.value ? [o.value ? L : N, h.value ? S : B] : _.value !== o.value ? [L, B] : [N, B]).includes(O.key) ? 1 : -1, J = O.shiftKey ? 2 : O.ctrlKey ? 1 : 0;
        U = U + ve * Y * W.value[J];
      } else if (O.key === j)
        U = e.min;
      else if (O.key === R)
        U = e.max;
      else {
        const le = O.key === $ ? 1 : -1;
        U = U - le * Y * (Q > 100 ? Q / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, U));
    }
    function D(O) {
      const U = A(O, e.modelValue);
      U != null && i("update:modelValue", U);
    }
    return de(() => {
      const O = me(_.value ? 100 - e.position : e.position, "%");
      return y("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && g.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": O,
          "--v-slider-thumb-size": me(c.value)
        }, e.style],
        role: "slider",
        tabindex: u.value ? -1 : 0,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.modelValue,
        "aria-readonly": !!m.value,
        "aria-orientation": f.value,
        onKeydown: m.value ? void 0 : D
      }, [y("div", {
        class: ["v-slider-thumb__surface", V.value, x.value],
        style: {
          ...C.value
        }
      }, null), We(y("div", {
        class: ["v-slider-thumb__ripple", V.value],
        style: C.value
      }, null), [[jt("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), y(yv, {
        origin: "bottom center"
      }, {
        default: () => {
          var U;
          return [We(y("div", {
            class: "v-slider-thumb__label-container"
          }, [y("div", {
            class: ["v-slider-thumb__label"]
          }, [y("div", null, [((U = n["thumb-label"]) == null ? void 0 : U.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[an, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), ES = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...we()
}, "VSliderTrack"), VS = ce()({
  name: "VSliderTrack",
  props: ES(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(ru);
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
    } = ht(l), {
      backgroundColorClasses: g,
      backgroundColorStyles: w
    } = xt(c), {
      backgroundColorClasses: _,
      backgroundColorStyles: b
    } = xt(u), x = k(() => `inset-${f.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), V = k(() => f.value ? "height" : "width"), C = k(() => ({
      [x.value]: "0%",
      [V.value]: "100%"
    })), T = k(() => e.stop - e.start), $ = k(() => ({
      [x.value]: me(e.start, "%"),
      [V.value]: me(T.value, "%")
    })), R = k(() => s.value ? (f.value ? o.value.slice().reverse() : o.value).map((L, N) => {
      var B;
      const S = L.value !== h.value && L.value !== v.value ? me(L.position, "%") : void 0;
      return y("div", {
        key: L.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": L.position >= e.start && L.position <= e.stop,
          "v-slider-track__tick--first": L.value === h.value,
          "v-slider-track__tick--last": L.value === v.value
        }],
        style: {
          [x.value]: S
        }
      }, [(L.label || n["tick-label"]) && y("div", {
        class: "v-slider-track__tick-label"
      }, [((B = n["tick-label"]) == null ? void 0 : B.call(n, {
        tick: L,
        index: N
      })) ?? L.label])]);
    }) : []);
    return de(() => y("div", {
      class: ["v-slider-track", p.value, e.class],
      style: [{
        "--v-slider-track-size": me(d.value),
        "--v-slider-tick-size": me(a.value)
      }, e.style]
    }, [y("div", {
      class: ["v-slider-track__background", _.value, {
        "v-slider-track__background--opacity": !!r.value || !c.value
      }],
      style: {
        ...C.value,
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
}), LS = Z({
  ...Za(),
  ...xS(),
  ...Yi(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), wf = ce()({
  name: "VSlider",
  props: LS(),
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
    const r = ne(), {
      rtlClasses: o
    } = Xt(), l = _S(e), s = Pe(e, "modelValue", void 0, (V) => l.roundValue(V ?? l.min.value)), {
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
    } = SS({
      props: e,
      steps: l,
      onSliderStart: () => {
        i("start", s.value);
      },
      onSliderEnd: (V) => {
        let {
          value: C
        } = V;
        const T = d(C);
        s.value = T, i("end", T);
      },
      onSliderMove: (V) => {
        let {
          value: C
        } = V;
        return s.value = d(C);
      },
      getActiveThumb: () => {
        var V;
        return (V = r.value) == null ? void 0 : V.$el;
      }
    }), {
      isFocused: w,
      focus: _,
      blur: b
    } = qi(e), x = k(() => m(s.value));
    return de(() => {
      const V = sn.filterProps(e), C = !!(e.label || n.label || n.prepend);
      return y(sn, he({
        class: ["v-slider", {
          "v-slider--has-labels": !!n["tick-label"] || p.value,
          "v-slider--focused": w.value,
          "v-slider--pressed": c.value,
          "v-slider--disabled": e.disabled
        }, o.value, e.class],
        style: e.style
      }, V, {
        focused: w.value
      }), {
        ...n,
        prepend: C ? (T) => {
          var $, R;
          return y(Ce, null, [(($ = n.label) == null ? void 0 : $.call(n, T)) ?? (e.label ? y(Xa, {
            id: T.id.value,
            class: "v-slider__label",
            text: e.label
          }, null) : void 0), (R = n.prepend) == null ? void 0 : R.call(n, T)]);
        } : void 0,
        default: (T) => {
          let {
            id: $,
            messagesId: R
          } = T;
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
          }, null), y(VS, {
            ref: v,
            start: 0,
            stop: x.value
          }, {
            "tick-label": n["tick-label"]
          }), y(kS, {
            ref: r,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (j) => s.value = j,
            position: x.value,
            elevation: e.elevation,
            onFocus: _,
            onBlur: b,
            ripple: e.ripple
          }, {
            "thumb-label": n["thumb-label"]
          })]);
        }
      });
    }), {};
  }
}), PS = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...we()
}, "VColorPickerPreview"), TS = Yt({
  name: "VColorPickerPreview",
  props: PS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    vl(() => i.abort());
    async function r() {
      if (!Cc) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Dh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Vi,
          ...s
        });
      } catch {
      }
    }
    return de(() => {
      var o, l;
      return y("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [Cc && y("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [y(Je, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), y("div", {
        class: "v-color-picker-preview__dot"
      }, [y("div", {
        style: {
          background: Oh(e.color ?? Vi)
        }
      }, null)]), y("div", {
        class: "v-color-picker-preview__sliders"
      }, [y(wf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Vi,
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
      }, null), !e.hideAlpha && y(wf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Vi,
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
}), MS = {
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
}, IS = {
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
}, AS = {
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
}, $S = {
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
}, NS = {
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
}, RS = {
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
}, OS = {
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
}, BS = {
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
}, FS = {
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
}, DS = {
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
}, HS = {
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
}, zS = {
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
}, jS = {
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
}, US = {
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
}, WS = {
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
}, GS = {
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
}, qS = {
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
}, YS = {
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
}, KS = {
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
}, XS = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, ZS = {
  red: MS,
  pink: IS,
  purple: AS,
  deepPurple: $S,
  indigo: NS,
  blue: RS,
  lightBlue: OS,
  cyan: BS,
  teal: FS,
  green: DS,
  lightGreen: HS,
  lime: zS,
  yellow: jS,
  amber: US,
  orange: WS,
  deepOrange: GS,
  brown: qS,
  blueGrey: YS,
  grey: KS,
  shades: XS
}, JS = Z({
  swatches: {
    type: Array,
    default: () => QS(ZS)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...we()
}, "VColorPickerSwatches");
function QS(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const eC = Yt({
  name: "VColorPickerSwatches",
  props: JS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    return de(() => y("div", {
      class: ["v-color-picker-swatches", e.class],
      style: [{
        maxHeight: me(e.maxHeight)
      }, e.style]
    }, [y("div", null, [e.swatches.map((i) => y("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Lt(r), l = _l(o), s = Rh(o);
      return y("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [y("div", {
        style: {
          background: s
        }
      }, [e.color && yi(e.color, l) ? y(Oe, {
        size: "x-small",
        icon: "$success",
        color: Tx(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Zv = Z({
  color: String,
  ...pi(),
  ...we(),
  ...jn(),
  ...kn(),
  ...Wr(),
  ...Ll(),
  ...dt(),
  ...Re(),
  ...He()
}, "VSheet"), xf = ce()({
  name: "VSheet",
  props: Zv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = xt(ae(e, "color")), {
      borderClasses: l
    } = bi(e), {
      dimensionStyles: s
    } = Un(e), {
      elevationClasses: a
    } = En(e), {
      locationStyles: u
    } = Gr(e), {
      positionClasses: c
    } = Pl(e), {
      roundedClasses: d
    } = ht(e);
    return de(() => y(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, d.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), tC = Z({
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
    validator: (e) => Object.keys(fi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(fi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(fi).includes(t))
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
  ...qt(Zv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), rE = Yt({
  name: "VColorPicker",
  props: tC(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = Pe(e, "mode"), n = ne(null), i = Pe(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = _l(Lt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? dS(a, e.modelValue) : null), r = k(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = Xt();
    let l = !0;
    ye(i, (a) => {
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
    return Ut(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), cn({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), de(() => {
      const a = xf.filterProps(e);
      return y(xf, he({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Oh({
            ...r.value ?? Vi,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && y(cS, {
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
        }, [!e.hideSliders && y(TS, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && y(pS, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && y(eC, {
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
}), Ir = Symbol.for("vuetify:v-expansion-panel"), nC = ["default", "accordion", "inset", "popout"], iC = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => nC.includes(e)
  },
  readonly: Boolean,
  ...we(),
  ...Sl(),
  ...Re(),
  ...He()
}, "VExpansionPanels"), _f = ce()({
  name: "VExpansionPanels",
  props: iC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    Hr(e, Ir);
    const {
      themeClasses: i
    } = qe(e), r = k(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return cn({
      VExpansionPanel: {
        color: ae(e, "color"),
        readonly: ae(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: ae(e, "focusable"),
        static: ae(e, "static")
      }
    }), de(() => y(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), rC = Z({
  ...we(),
  ...$l()
}, "VExpansionPanelText"), oC = ce()({
  name: "VExpansionPanelText",
  props: rC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Ir);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = qa(e, i.isSelected);
    return de(() => y(bv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [We(y("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && y("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[an, i.isSelected.value]])];
      }
    })), {};
  }
}), Jv = Z({
  color: String,
  expandIcon: {
    type: Le,
    default: "$expand"
  },
  collapseIcon: {
    type: Le,
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
  ...we()
}, "VExpansionPanelTitle"), lC = ce()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: wi
  },
  props: Jv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Ir);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = xt(e, "color"), l = k(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return de(() => {
      var s;
      return We(y("button", {
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
      }, [n.actions ? n.actions(l.value) : y(Oe, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[jt("ripple"), e.ripple]]);
    }), {};
  }
}), sC = Z({
  title: String,
  text: String,
  bgColor: String,
  ...we(),
  ...kn(),
  ...Cl(),
  ...$l(),
  ...dt(),
  ...Re(),
  ...Jv()
}, "VExpansionPanel"), oE = ce()({
  name: "VExpansionPanel",
  props: sC(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = kl(e, Ir), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = xt(e, "bgColor"), {
      elevationClasses: l
    } = En(e), {
      roundedClasses: s
    } = ht(e), a = k(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = k(() => i.group.items.value.reduce((f, h, v) => (i.group.selected.value.includes(h.id) && f.push(v), f), [])), c = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === 1);
    }), d = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === -1);
    });
    return Qe(Ir, i), cn({
      VExpansionPanelText: {
        eager: ae(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: ae(e, "readonly")
      }
    }), de(() => {
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
          }, null), h && y(lC, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && y(oC, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), qs = Symbol.for("vuetify:list");
function Qv() {
  const e = $e(qs, {
    hasPrepend: ge(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: ge(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return Qe(qs, t), e;
}
function em() {
  return $e(qs, null);
}
const ou = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = be(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
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
}, tm = (e) => {
  const t = ou(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = be(o);
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
}, aC = (e) => {
  const t = ou(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = be(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, uC = (e) => {
  const t = tm(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = be(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, cC = {
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
}, nm = {
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
}, fC = {
  open: nm.open,
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
}, lu = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = be(i), e && !r) {
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
}, im = (e) => {
  const t = lu(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = be(o);
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
}, dC = (e) => {
  const t = lu(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = be(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, hC = (e) => {
  const t = im(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = be(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, vC = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = be(i);
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
}, Ar = Symbol.for("vuetify:nested"), rm = {
  id: ge(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ne(/* @__PURE__ */ new Map()),
    children: ne(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ne(!1),
    selectable: ne(!1),
    opened: ne(/* @__PURE__ */ new Set()),
    activated: ne(/* @__PURE__ */ new Set()),
    selected: ne(/* @__PURE__ */ new Map()),
    selectedValues: ne([])
  }
}, mC = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), gC = (e) => {
  let t = !1;
  const n = ne(/* @__PURE__ */ new Map()), i = ne(/* @__PURE__ */ new Map()), r = Pe(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = k(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return aC(e.mandatory);
      case "single-leaf":
        return uC(e.mandatory);
      case "independent":
        return ou(e.mandatory);
      case "single-independent":
      default:
        return tm(e.mandatory);
    }
  }), l = k(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return hC(e.mandatory);
      case "leaf":
        return dC(e.mandatory);
      case "independent":
        return lu(e.mandatory);
      case "single-independent":
        return im(e.mandatory);
      case "classic":
      default:
        return vC(e.mandatory);
    }
  }), s = k(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return fC;
      case "single":
        return cC;
      case "multiple":
      default:
        return nm;
    }
  }), a = Pe(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = Pe(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  Wt(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const d = Xe("nested"), f = {
    id: ge(),
    root: {
      opened: r,
      activatable: ae(e, "activatable"),
      selectable: ae(e, "selectable"),
      activated: a,
      selected: u,
      selectedValues: k(() => {
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
  return Qe(Ar, f), f.root;
}, om = (e, t) => {
  const n = $e(Ar, rm), i = Symbol(_t()), r = k(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: k(() => n.root.opened.value.has(r.value)),
    parent: k(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: k(() => n.root.activated.value.has(be(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: k(() => n.root.selected.value.get(be(r.value)) === "on"),
    isIndeterminate: k(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: k(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), Wt(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && Qe(Ar, o), o;
}, yC = () => {
  const e = $e(Ar, rm);
  Qe(Ar, {
    ...e,
    isGroupActivator: !0
  });
}, pC = Yt({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return yC(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), bC = Z({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: Le,
    default: "$collapse"
  },
  expandIcon: {
    type: Le,
    default: "$expand"
  },
  prependIcon: Le,
  appendIcon: Le,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...we(),
  ...Re()
}, "VListGroup"), Sf = ce()({
  name: "VListGroup",
  props: bC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = om(ae(e, "value"), !0), l = k(() => `v-list-group--id-${String(o.value)}`), s = em(), {
      isBooted: a
    } = Gv();
    function u(h) {
      r(!i.value, h);
    }
    const c = k(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: l.value
    })), d = k(() => i.value ? e.collapseIcon : e.expandIcon), f = k(() => ({
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
    return de(() => y(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": i.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && y(Ge, {
        defaults: f.value
      }, {
        default: () => [y(pC, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), y(yn, {
        transition: {
          component: bv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [We(y("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[an, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), wC = Ui("v-list-item-subtitle"), xC = Ui("v-list-item-title"), _C = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: Le,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: Le,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: Dt(),
  onClickOnce: Dt(),
  ...pi(),
  ...we(),
  ...Mt(),
  ...jn(),
  ...kn(),
  ...dt(),
  ...Ml(),
  ...Re(),
  ...He(),
  ...Vn({
    variant: "text"
  })
}, "VListItem"), rl = ce()({
  name: "VListItem",
  directives: {
    Ripple: wi
  },
  props: _C(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const o = Tl(e, n), l = k(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: d,
      isGroupActivator: f,
      root: h,
      parent: v,
      openOnSelect: m
    } = om(l, !1), p = em(), g = k(() => {
      var O;
      return e.active !== !1 && (e.active || ((O = o.isActive) == null ? void 0 : O.value) || (h.activatable.value ? a.value : c.value));
    }), w = k(() => e.link !== !1 && o.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = k(() => e.rounded || e.nav), x = k(() => e.color ?? e.activeColor), V = k(() => ({
      color: g.value ? x.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ye(() => {
      var O;
      return (O = o.isActive) == null ? void 0 : O.value;
    }, (O) => {
      O && v.value != null && h.open(v.value, !0), O && m(O);
    }, {
      immediate: !0
    });
    const {
      themeClasses: C
    } = qe(e), {
      borderClasses: T
    } = bi(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: j
    } = Gi(V), {
      densityClasses: L
    } = Kt(e), {
      dimensionStyles: N
    } = Un(e), {
      elevationClasses: S
    } = En(e), {
      roundedClasses: B
    } = ht(b), I = k(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), W = k(() => ({
      isActive: g.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: d.value
    }));
    function A(O) {
      var U;
      r("click", O), !(f || !_.value) && ((U = o.navigate) == null || U.call(o, O), h.activatable ? s(!a.value, O) : (h.selectable || e.value != null) && u(!c.value, O));
    }
    function D(O) {
      (O.key === "Enter" || O.key === " ") && (O.preventDefault(), A(O));
    }
    return de(() => {
      const O = w.value ? "a" : e.tag, U = i.title || e.title != null, Y = i.subtitle || e.subtitle != null, Q = !!(e.appendAvatar || e.appendIcon), le = !!(Q || i.append), ve = !!(e.prependAvatar || e.prependIcon), J = !!(ve || i.prepend);
      return p == null || p.updateHasPrepend(J), e.activeColor && px("active-color", ["color", "base-color"]), We(y(O, {
        class: ["v-list-item", {
          "v-list-item--active": g.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": _.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && g.value
        }, C.value, T.value, $.value, L.value, S.value, I.value, B.value, j.value, e.class],
        style: [R.value, N.value, e.style],
        href: o.href.value,
        tabindex: _.value ? p ? -2 : 0 : void 0,
        onClick: A,
        onKeydown: _.value && !w.value && D
      }, {
        default: () => {
          var ue;
          return [Wi(_.value || g.value, "v-list-item"), J && y("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? y(Ge, {
            key: "prepend-defaults",
            disabled: !ve,
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
              var ke;
              return [(ke = i.prepend) == null ? void 0 : ke.call(i, W.value)];
            }
          }) : y(Ce, null, [e.prependAvatar && y(vi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && y(Oe, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)]), y("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [U && y(xC, {
            key: "title"
          }, {
            default: () => {
              var ke;
              return [((ke = i.title) == null ? void 0 : ke.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && y(wC, {
            key: "subtitle"
          }, {
            default: () => {
              var ke;
              return [((ke = i.subtitle) == null ? void 0 : ke.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (ue = i.default) == null ? void 0 : ue.call(i, W.value)]), le && y("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? y(Ge, {
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
              var ke;
              return [(ke = i.append) == null ? void 0 : ke.call(i, W.value)];
            }
          }) : y(Ce, null, [e.appendIcon && y(Oe, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(vi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[jt("ripple"), _.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), SC = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...we(),
  ...Re()
}, "VListSubheader"), CC = ce()({
  name: "VListSubheader",
  props: SC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = Ht(ae(e, "color"));
    return de(() => {
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
}), kC = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...we(),
  ...He()
}, "VDivider"), EC = ce()({
  name: "VDivider",
  props: kC(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = qe(e), {
      textColorClasses: r,
      textColorStyles: o
    } = Ht(ae(e, "color")), l = k(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = me(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = me(e.thickness)), s;
    });
    return de(() => y("hr", {
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
}), VC = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), lm = ce()({
  name: "VListChildren",
  props: VC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Qv(), () => {
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
          })) ?? y(EC, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? y(CC, s, null);
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
        }, d = Sf.filterProps(s);
        return l ? y(Sf, he({
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
            }) : y(rl, p, c);
          },
          default: () => y(lm, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : y(rl, he(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), sm = Z({
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
    default: yi
  }
}, "list-items");
function Ys(e, t) {
  const n = mn(t, e.itemTitle, t), i = mn(t, e.itemValue, n), r = mn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? qt(t, ["children"]) : t : void 0 : mn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? am(e, r) : void 0,
    raw: t
  };
}
function am(e, t) {
  const n = [];
  for (const i of t)
    n.push(Ys(e, i));
  return n;
}
function LC(e) {
  const t = k(() => am(e, e.items)), n = k(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? Ys(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || Ys(e, l));
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
function PC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function TC(e, t) {
  const n = mn(t, e.itemType, "item"), i = PC(t) ? t : mn(t, e.itemTitle), r = mn(t, e.itemValue, void 0), o = mn(t, e.itemChildren), l = e.itemProps === !0 ? qt(t, ["children"]) : mn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? um(e, o) : void 0,
    raw: t
  };
}
function um(e, t) {
  const n = [];
  for (const i of t)
    n.push(TC(e, i));
  return n;
}
function MC(e) {
  return {
    items: k(() => um(e, e.items))
  };
}
const IC = Z({
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
  ...mC({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...pi(),
  ...we(),
  ...Mt(),
  ...jn(),
  ...kn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...sm(),
  ...dt(),
  ...Re(),
  ...He(),
  ...Vn({
    variant: "text"
  })
}, "VList"), AC = ce()({
  name: "VList",
  props: IC(),
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
    } = MC(e), {
      themeClasses: r
    } = qe(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = xt(ae(e, "bgColor")), {
      borderClasses: s
    } = bi(e), {
      densityClasses: a
    } = Kt(e), {
      dimensionStyles: u
    } = Un(e), {
      elevationClasses: c
    } = En(e), {
      roundedClasses: d
    } = ht(e), {
      children: f,
      open: h,
      parents: v,
      select: m
    } = gC(e), p = k(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = ae(e, "activeColor"), w = ae(e, "baseColor"), _ = ae(e, "color");
    Qv(), cn({
      VListGroup: {
        activeColor: g,
        baseColor: w,
        color: _,
        expandIcon: ae(e, "expandIcon"),
        collapseIcon: ae(e, "collapseIcon")
      },
      VListItem: {
        activeClass: ae(e, "activeClass"),
        activeColor: g,
        baseColor: w,
        color: _,
        density: ae(e, "density"),
        disabled: ae(e, "disabled"),
        lines: ae(e, "lines"),
        nav: ae(e, "nav"),
        slim: ae(e, "slim"),
        variant: ae(e, "variant")
      }
    });
    const b = ge(!1), x = ne();
    function V(L) {
      b.value = !0;
    }
    function C(L) {
      b.value = !1;
    }
    function T(L) {
      var N;
      !b.value && !(L.relatedTarget && ((N = x.value) != null && N.contains(L.relatedTarget))) && j();
    }
    function $(L) {
      if (x.value) {
        if (L.key === "ArrowDown")
          j("next");
        else if (L.key === "ArrowUp")
          j("prev");
        else if (L.key === "Home")
          j("first");
        else if (L.key === "End")
          j("last");
        else
          return;
        L.preventDefault();
      }
    }
    function R(L) {
      b.value = !0;
    }
    function j(L) {
      if (x.value)
        return qo(x.value, L);
    }
    return de(() => y(e.tag, {
      ref: x,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, o.value, s.value, a.value, c.value, p.value, d.value, e.class],
      style: [l.value, u.value, e.style],
      tabindex: e.disabled || b.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: V,
      onFocusout: C,
      onFocus: T,
      onKeydown: $,
      onMousedown: R
    }, {
      default: () => [y(lm, {
        items: i.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: m,
      focus: j,
      children: f,
      parents: v
    };
  }
}), $C = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...qt(Kr({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Wa
    }
  }), ["absolute"])
}, "VMenu"), NC = ce()({
  name: "VMenu",
  props: $C(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Yr(), o = _t(), l = k(() => e.id || `v-menu-${o}`), s = ne(), a = $e(Hs, null), u = ge(0);
    Qe(Hs, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !sx(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, _, b;
      const p = m.relatedTarget, g = m.target;
      await De(), i.value && p !== g && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((_ = s.value) != null && _.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(g) && // It isn't inside the menu body
      !s.value.contentEl.contains(g) && ((b = Vr(s.value.contentEl)[0]) == null || b.focus());
    }
    ye(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(m) {
      a == null || a.closeParents(m);
    }
    function f(m) {
      var p, g, w;
      e.disabled || m.key === "Tab" && (Lh(Vr((p = s.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (g = s.value) == null ? void 0 : g.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var g;
      if (e.disabled) return;
      const p = (g = s.value) == null ? void 0 : g.contentEl;
      p && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), qo(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), qo(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = k(() => he({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return de(() => {
      const m = Hn.filterProps(e);
      return y(Hn, he({
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
          return y(Ge, {
            root: "VMenu"
          }, {
            default: () => {
              var _;
              return [(_ = n.default) == null ? void 0 : _.call(n, ...g)];
            }
          });
        }
      });
    }), Wn({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), RC = ["color", "file", "time", "date", "datetime-local", "week", "month"], cm = Z({
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
  ...Yi(),
  ...Ja()
}, "VTextField"), Cf = ce()({
  name: "VTextField",
  directives: {
    Intersect: hv
  },
  inheritAttrs: !1,
  props: cm(),
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
    const o = Pe(e, "modelValue"), {
      isFocused: l,
      focus: s,
      blur: a
    } = qi(e), u = k(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = k(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = k(() => ["plain", "underlined"].includes(e.variant));
    function f(V, C) {
      var T, $;
      !e.autofocus || !V || ($ = (T = C[0].target) == null ? void 0 : T.focus) == null || $.call(T);
    }
    const h = ne(), v = ne(), m = ne(), p = k(() => RC.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
    function g() {
      var V;
      m.value !== document.activeElement && ((V = m.value) == null || V.focus()), l.value || s();
    }
    function w(V) {
      i("mousedown:control", V), V.target !== m.value && (g(), V.preventDefault());
    }
    function _(V) {
      g(), i("click:control", V);
    }
    function b(V) {
      V.stopPropagation(), g(), De(() => {
        o.value = null, Vh(e["onClick:clear"], V);
      });
    }
    function x(V) {
      var T;
      const C = V.target;
      if (o.value = C.value, (T = e.modelModifiers) != null && T.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [C.selectionStart, C.selectionEnd];
        De(() => {
          C.selectionStart = $[0], C.selectionEnd = $[1];
        });
      }
    }
    return de(() => {
      const V = !!(r.counter || e.counter !== !1 && e.counter != null), C = !!(V || r.details), [T, $] = Dr(n), {
        modelValue: R,
        ...j
      } = sn.filterProps(e), L = Tv(e);
      return y(sn, he({
        ref: h,
        modelValue: o.value,
        "onUpdate:modelValue": (N) => o.value = N,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, T, j, {
        centerAffix: !d.value,
        focused: l.value
      }), {
        ...r,
        default: (N) => {
          let {
            id: S,
            isDisabled: B,
            isDirty: I,
            isReadonly: W,
            isValid: A
          } = N;
          return y(Qa, he({
            ref: v,
            onMousedown: w,
            onClick: _,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: S.value,
            active: p.value || I.value,
            dirty: I.value || e.dirty,
            disabled: B.value,
            focused: l.value,
            error: A.value === !1
          }), {
            ...r,
            default: (D) => {
              let {
                props: {
                  class: O,
                  ...U
                }
              } = D;
              const Y = We(y("input", he({
                ref: m,
                value: o.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: W.value,
                disabled: B.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: g,
                onBlur: a
              }, U, $), null), [[jt("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return y(Ce, null, [e.prefix && y("span", {
                class: "v-text-field__prefix"
              }, [y("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? y("div", {
                class: O,
                "data-no-activator": ""
              }, [r.default(), Y]) : bn(Y, {
                class: O
              }), e.suffix && y("span", {
                class: "v-text-field__suffix"
              }, [y("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: C ? (N) => {
          var S;
          return y(Ce, null, [(S = r.details) == null ? void 0 : S.call(r, N), V && y(Ce, null, [y("span", null, null), y(Lv, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), Wn({}, h, v, m);
  }
}), OC = Z({
  renderless: Boolean,
  ...we()
}, "VVirtualScrollItem"), BC = ce()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: OC(),
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
    } = Hi(void 0, "border");
    ye(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), de(() => {
      var s, a;
      return e.renderless ? y(Ce, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : y("div", he({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), FC = -1, DC = 1, ss = 100, HC = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function zC(e, t) {
  const n = Ga(), i = ge(0);
  ln(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = ge(0), o = ge(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = ge(0), s = ge(0), a = ne(), u = ne();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = Hi();
  ln(() => {
    d.value = a.value;
  });
  const h = k(() => {
    var D;
    return a.value === document.documentElement ? n.height.value : ((D = f.value) == null ? void 0 : D.height) || parseInt(e.height) || 0;
  }), v = k(() => !!(a.value && u.value && h.value && i.value));
  let m = Array.from({
    length: t.value.length
  }), p = Array.from({
    length: t.value.length
  });
  const g = ge(0);
  let w = -1;
  function _(D) {
    return m[D] || i.value;
  }
  const b = ix(() => {
    const D = performance.now();
    p[0] = 0;
    const O = t.value.length;
    for (let U = 1; U <= O - 1; U++)
      p[U] = (p[U - 1] || 0) + _(U - 1);
    g.value = Math.max(g.value, performance.now() - D);
  }, g), x = ye(v, (D) => {
    D && (x(), c = u.value.offsetTop, b.immediate(), B(), ~w && De(() => {
      Te && window.requestAnimationFrame(() => {
        W(w), w = -1;
      });
    }));
  });
  st(() => {
    b.clear();
  });
  function V(D, O) {
    const U = m[D], Y = i.value;
    i.value = Y ? Math.min(i.value, O) : O, (U !== O || Y !== i.value) && (m[D] = O, b());
  }
  function C(D) {
    return D = pt(D, 0, t.value.length - 1), p[D] || 0;
  }
  function T(D) {
    return jC(p, D);
  }
  let $ = 0, R = 0, j = 0;
  ye(h, (D, O) => {
    O && (B(), D < O && requestAnimationFrame(() => {
      R = 0, B();
    }));
  });
  function L() {
    if (!a.value || !u.value) return;
    const D = a.value.scrollTop, O = performance.now();
    O - j > 500 ? (R = Math.sign(D - $), c = u.value.offsetTop) : R = D - $, $ = D, j = O, B();
  }
  function N() {
    !a.value || !u.value || (R = 0, j = 0, B());
  }
  let S = -1;
  function B() {
    cancelAnimationFrame(S), S = requestAnimationFrame(I);
  }
  function I() {
    if (!a.value || !h.value) return;
    const D = $ - c, O = Math.sign(R), U = Math.max(0, D - ss), Y = pt(T(U), 0, t.value.length), Q = D + h.value + ss, le = pt(T(Q) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (O !== FC || Y < r.value) && (O !== DC || le > o.value)
    ) {
      const ve = C(r.value) - C(Y), J = C(le) - C(o.value);
      Math.max(ve, J) > ss ? (r.value = Y, o.value = le) : (Y <= 0 && (r.value = Y), le >= t.value.length && (o.value = le));
    }
    l.value = C(r.value), s.value = C(t.value.length) - C(o.value);
  }
  function W(D) {
    const O = C(D);
    !a.value || D && !O ? w = D : a.value.scrollTop = O;
  }
  const A = k(() => t.value.slice(r.value, o.value).map((D, O) => ({
    raw: D,
    index: O + r.value
  })));
  return ye(t, () => {
    m = Array.from({
      length: t.value.length
    }), p = Array.from({
      length: t.value.length
    }), b.immediate(), B();
  }, {
    deep: !0
  }), {
    containerRef: a,
    markerRef: u,
    computedItems: A,
    paddingTop: l,
    paddingBottom: s,
    scrollToIndex: W,
    handleScroll: L,
    handleScrollend: N,
    handleItemResize: V
  };
}
function jC(e, t) {
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
const UC = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...HC(),
  ...we(),
  ...jn()
}, "VVirtualScroll"), WC = ce()({
  name: "VVirtualScroll",
  props: UC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Xe("VVirtualScroll"), {
      dimensionStyles: r
    } = Un(e), {
      containerRef: o,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: d,
      paddingBottom: f,
      computedItems: h
    } = zC(e, ae(e, "items"));
    return hi(() => e.renderless, () => {
      function v() {
        var g, w;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", a)) : ((g = o.value) == null || g[p]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[p]("scrollend", a));
      }
      Ut(() => {
        o.value = Wh(i.vnode.el, !0), v(!0);
      }), st(v);
    }), de(() => {
      const v = h.value.map((m) => y(BC, {
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
      return e.renderless ? y(Ce, null, [y("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: me(d.value)
        }
      }, null), v, y("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: me(f.value)
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
          paddingTop: me(d.value),
          paddingBottom: me(f.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function GC(e, t) {
  const n = ge(!1);
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
        const a = ye(n, () => {
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
const qC = Z({
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
    type: Le,
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
  ...sm({
    itemChildren: !1
  })
}, "Select"), YC = Z({
  ...qC(),
  ...qt(cm({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...qr({
    transition: {
      component: Wa
    }
  })
}, "VSelect"), lE = ce()({
  name: "VSelect",
  props: YC(),
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
    } = Ur(), r = ne(), o = ne(), l = ne(), s = Pe(e, "menu"), a = k({
      get: () => s.value,
      set: (A) => {
        var D;
        s.value && !A && ((D = o.value) != null && D.ΨopenChildren) || (s.value = A);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = LC(e), f = Pe(e, "modelValue", [], (A) => c(A === null ? [null] : on(A)), (A) => {
      const D = d(A);
      return e.multiple ? D : D[0] ?? null;
    }), h = k(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Mv(), m = k(() => f.value.map((A) => A.value)), p = ge(!1), g = k(() => a.value ? e.closeText : e.openText);
    let w = "", _;
    const b = k(() => e.hideSelected ? u.value.filter((A) => !f.value.some((D) => D === A)) : u.value), x = k(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), V = k(() => {
      var A;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((A = e.menuProps) == null ? void 0 : A.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), C = ne(), {
      onListScroll: T,
      onListKeydown: $
    } = GC(C, r);
    function R(A) {
      e.openOnClear && (a.value = !0);
    }
    function j() {
      x.value || (a.value = !a.value);
    }
    function L(A) {
      var Q, le;
      if (!A.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(A.key) && A.preventDefault(), ["Enter", "ArrowDown", " "].includes(A.key) && (a.value = !0), ["Escape", "Tab"].includes(A.key) && (a.value = !1), A.key === "Home" ? (Q = C.value) == null || Q.focus("first") : A.key === "End" && ((le = C.value) == null || le.focus("last"));
      const D = 1e3;
      function O(ve) {
        const J = ve.key.length === 1, ue = !ve.ctrlKey && !ve.metaKey && !ve.altKey;
        return J && ue;
      }
      if (e.multiple || !O(A)) return;
      const U = performance.now();
      U - _ > D && (w = ""), w += A.key.toLowerCase(), _ = U;
      const Y = u.value.find((ve) => ve.title.toLowerCase().startsWith(w));
      Y !== void 0 && (f.value = [Y]);
    }
    function N(A) {
      let D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!A.props.disabled)
        if (e.multiple) {
          const O = f.value.findIndex((Y) => e.valueComparator(Y.value, A.value)), U = D ?? !~O;
          if (~O) {
            const Y = U ? [...f.value, A] : [...f.value];
            Y.splice(O, 1), f.value = Y;
          } else U && (f.value = [...f.value, A]);
        } else {
          const O = D !== !1;
          f.value = O ? [A] : [], De(() => {
            a.value = !1;
          });
        }
    }
    function S(A) {
      var D;
      (D = C.value) != null && D.$el.contains(A.relatedTarget) || (a.value = !1);
    }
    function B() {
      var A;
      p.value && ((A = r.value) == null || A.focus());
    }
    function I(A) {
      p.value = !0;
    }
    function W(A) {
      if (A == null) f.value = [];
      else if (Yo(r.value, ":autofill") || Yo(r.value, ":-webkit-autofill")) {
        const D = u.value.find((O) => O.title === A);
        D && N(D);
      } else r.value && (r.value.value = "");
    }
    return ye(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const A = b.value.findIndex((D) => f.value.some((O) => e.valueComparator(O.value, D.value)));
        Te && window.requestAnimationFrame(() => {
          var D;
          A >= 0 && ((D = l.value) == null || D.scrollToIndex(A));
        });
      }
    }), ye(() => e.items, (A, D) => {
      a.value || p.value && !D.length && A.length && (a.value = !0);
    }), de(() => {
      const A = !!(e.chips || n.chip), D = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), O = f.value.length > 0, U = Cf.filterProps(e), Y = O || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return y(Cf, he({
        ref: r
      }, U, {
        modelValue: f.value.map((Q) => Q.props.value).join(", "),
        "onUpdate:modelValue": W,
        focused: p.value,
        "onUpdate:focused": (Q) => p.value = Q,
        validationValue: f.externalValue,
        counterValue: h.value,
        dirty: O,
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
        "onMousedown:control": j,
        onBlur: S,
        onKeydown: L,
        "aria-label": i(g.value),
        title: i(g.value)
      }), {
        ...n,
        default: () => y(Ce, null, [y(NC, he({
          ref: o,
          modelValue: a.value,
          "onUpdate:modelValue": (Q) => a.value = Q,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: x.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: B
        }, V.value), {
          default: () => [D && y(AC, he({
            ref: C,
            selected: m.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (Q) => Q.preventDefault(),
            onKeydown: $,
            onFocusin: I,
            onScrollPassive: T,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var Q, le, ve;
              return [(Q = n["prepend-item"]) == null ? void 0 : Q.call(n), !b.value.length && !e.hideNoData && (((le = n["no-data"]) == null ? void 0 : le.call(n)) ?? y(rl, {
                title: i(e.noDataText)
              }, null)), y(WC, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var It;
                  let {
                    item: ue,
                    index: ke,
                    itemRef: ze
                  } = J;
                  const et = he(ue.props, {
                    ref: ze,
                    key: ke,
                    onClick: () => N(ue, null)
                  });
                  return ((It = n.item) == null ? void 0 : It.call(n, {
                    item: ue,
                    index: ke,
                    props: et
                  })) ?? y(rl, he(et, {
                    role: "option"
                  }), {
                    prepend: (Zt) => {
                      let {
                        isSelected: E
                      } = Zt;
                      return y(Ce, null, [e.multiple && !e.hideSelected ? y(Us, {
                        key: ue.value,
                        modelValue: E,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && y(vi, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && y(Oe, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (ve = n["append-item"]) == null ? void 0 : ve.call(n)];
            }
          })]
        }), f.value.map((Q, le) => {
          function ve(ze) {
            ze.stopPropagation(), ze.preventDefault(), N(Q, !1);
          }
          const J = {
            "onClick:close": ve,
            onMousedown(ze) {
              ze.preventDefault(), ze.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ue = A ? !!n.chip : !!n.selection, ke = ue ? Ph(A ? n.chip({
            item: Q,
            index: le,
            props: J
          }) : n.selection({
            item: Q,
            index: le
          })) : void 0;
          if (!(ue && !ke))
            return y("div", {
              key: Q.value,
              class: "v-select__selection"
            }, [A ? n.chip ? y(Ge, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: Q.title
                }
              }
            }, {
              default: () => [ke]
            }) : y(Vv, he({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Q.title,
              disabled: Q.props.disabled
            }, J), null) : ke ?? y("span", {
              class: "v-select__selection-text"
            }, [Q.title, e.multiple && le < f.value.length - 1 && y("span", {
              class: "v-select__selection-comma"
            }, [Ue(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var Q = arguments.length, le = new Array(Q), ve = 0; ve < Q; ve++)
            le[ve] = arguments[ve];
          return y(Ce, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...le), e.menuIcon ? y(Oe, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Wn({
      isFocused: p,
      menu: a,
      select: N
    }, r);
  }
}), KC = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Yi(),
  ...iu()
}, "VSwitch"), nr = ce()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: KC(),
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
    const r = Pe(e, "indeterminate"), o = Pe(e, "modelValue"), {
      loaderClasses: l
    } = Vl(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = qi(e), c = ne(), d = k(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = _t(), h = k(() => e.id || `switch-${f}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(p) {
      var g, w;
      p.stopPropagation(), p.preventDefault(), (w = (g = c.value) == null ? void 0 : g.input) == null || w.click();
    }
    return de(() => {
      const [p, g] = Dr(n), w = sn.filterProps(e), _ = il.filterProps(e);
      return y(sn, he({
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
            id: x,
            messagesId: V,
            isDisabled: C,
            isReadonly: T,
            isValid: $
          } = b;
          const R = {
            model: o,
            isValid: $
          };
          return y(il, he({
            ref: c
          }, _, {
            modelValue: o.value,
            "onUpdate:modelValue": [(j) => o.value = j, v],
            id: x.value,
            "aria-describedby": V.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: C.value,
            readonly: T.value,
            onFocus: a,
            onBlur: u
          }, g), {
            ...i,
            default: (j) => {
              let {
                backgroundColorClasses: L,
                backgroundColorStyles: N
              } = j;
              return y("div", {
                class: ["v-switch__track", ...L.value],
                style: N.value,
                onClick: m
              }, [i["track-true"] && y("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [i["track-true"](R)]), i["track-false"] && y("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [i["track-false"](R)])]);
            },
            input: (j) => {
              let {
                inputNode: L,
                icon: N,
                backgroundColorClasses: S,
                backgroundColorStyles: B
              } = j;
              return y(Ce, null, [L, y("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": N || e.loading
                }, e.inset ? void 0 : S.value],
                style: e.inset ? void 0 : B.value
              }, [i.thumb ? y(Ge, {
                defaults: {
                  VIcon: {
                    icon: N,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [i.thumb({
                  ...R,
                  icon: N
                })]
              }) : y(yv, null, {
                default: () => [e.loading ? y(ja, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : d.value
                }, {
                  default: (I) => i.loader ? i.loader(I) : y(Zh, {
                    active: I.isActive,
                    color: I.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && y(Oe, {
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
}), XC = /* @__PURE__ */ ji({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = ne(n.isWelcome), r = ne(n.config.showNodeLabels), o = ne(n.config.nodePhysicsEnabled), l = ne(n.config.showLinkLabels), s = ne(n.config.fixedLinkDistanceEnabled), a = ne(n.config.zoomEnabled), u = ne(String(n.config.nodeRadius)), c = ne(""), d = ne("black"), f = ne(""), h = ne(n.config.persistSettingsLocalStorage), v = t;
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
    return (g, w) => (nn(), ni(Ya, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (_) => i.value = _),
      persistent: ""
    }, {
      activator: fe(({ props: _ }) => [
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: fe(({ props: b }) => [
            y(Je, he({
              "aria-label": "Settings",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$settings"
            }, { ..._, ...b }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: fe(({ isActive: _ }) => [
        y(Ua, { class: "pa-3" }, {
          default: fe(() => [
            n.isWelcome ? (nn(), ni(Mr, { key: 0 }, {
              default: fe(() => [
                Ue("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (nn(), ni(Mr, { key: 1 }, {
              default: fe(() => [
                Ue("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (nn(), ni(lr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: fe(() => [
                Ue(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Tn("", !0),
            y(hr, null, {
              default: fe(() => [
                y(kt, null, {
                  default: fe(() => [
                    y(go, { cols: "5" }, {
                      default: fe(() => [
                        y(kt, null, {
                          default: fe(() => [
                            y(lr, { class: "py-5" }, {
                              default: fe(() => [
                                Ue("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: fe(() => [
                            y(_f, null, {
                              default: fe(() => [
                                Tn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: fe(() => [
                            y(go, { class: "mx-0 px-0" }, {
                              default: fe(() => [
                                y(nr, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            y(go, { class: "mx-0 px-0" }, {
                              default: fe(() => [
                                Tn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            y(nr, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            Tn("", !0)
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            Tn("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(nl),
                    y(go, { cols: "5" }, {
                      default: fe(() => [
                        y(kt, null, {
                          default: fe(() => [
                            y(lr, { class: "py-5" }, {
                              default: fe(() => [
                                Ue("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: fe(() => [
                            y(_f, null, {
                              default: fe(() => [
                                Tn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: fe(() => [
                            y(nr, {
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
                          default: fe(() => [
                            y(nr, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            Tn("", !0)
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            y(lr, { class: "px-0" }, {
                              default: fe(() => [
                                Ue("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "py-0 my-0" }, {
                          default: fe(() => [
                            y(nr, {
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
            y(Il, null, {
              default: fe(() => [
                y(aS, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                y(nl),
                y(Je, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: fe(() => [
                    Ue("Save")
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
function ZC(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function JC(e, t, n) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function QC(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
const ek = /* @__PURE__ */ je("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), tk = /* @__PURE__ */ je("div", { class: "graph-host uninitialised" }, null, -1), nk = {
  key: 0,
  class: "button-container"
}, ik = { class: "info-text text-h5 text-grey" }, rk = /* @__PURE__ */ ji({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = k(() => {
      const P = document.querySelectorAll("graph-editor");
      let F;
      for (let z = 0; z < P.length; z++) {
        const H = P[z], xe = Rt(H.shadowRoot).select(".graph-host.uninitialised");
        if (!xe.empty()) {
          xe.classed("uninitialised", !1), F = xe;
          break;
        }
      }
      return F === void 0 && (F = Rt(".graph-host.uninitialised"), F.classed("uninitialised", !1)), F;
    });
    hl(() => {
      N();
    }), Ut(() => {
      S(), window.addEventListener("resize", X);
    }), vl(() => {
      window.removeEventListener("resize", X);
    });
    const i = ne(!1), r = ne(new yc()), o = ne(!1), l = zt(new ww());
    let s, a = 400, u = 400, c, d, f, h, v, m, p, g, w, _ = 0, b = 0, x = 1;
    t({
      getGraph: V,
      setGraph: C,
      printGraph: T,
      setNodeColor: $,
      setLinkColor: R,
      deleteNode: j,
      deleteLink: L,
      toggleNodeLabels: q,
      toggleLinkLabels: G,
      toggleZoom: K,
      toggleNodePhysics: E,
      toggleFixedLinkDistance: M,
      resetView: X
    });
    function V() {
      return r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !0, !0);
    }
    function C(P) {
      if (typeof P == "string" && P !== "Graph is empty")
        oe(P);
      else if (typeof P == "object") {
        const [F, z] = Xw(P);
        se(), ee(F, z);
      } else
        se();
    }
    function T() {
      console.log(r.value.toTGF(l.showNodeLabels, l.showLinkLabels));
    }
    function $(P, F) {
      if (F !== void 0) {
        const H = (Array.isArray(F) ? F : [F]).map(Number);
        for (const ie of H)
          v.selectAll("circle").filter((xe) => xe.id === ie).each((xe) => xe.color = P).style("fill", P);
      } else
        v.selectAll("circle").each((z) => z.color = P).style("fill", P);
    }
    function R(P, F) {
      if (F) {
        const z = Array.isArray(F) ? F : [F];
        re(z);
        for (const H of z)
          h.selectAll(".link").filter((ie) => ie.id === H).each((ie) => ie.color = P).style("stroke", P);
      } else
        re(r.value.links.map((z) => z.id)), h.selectAll(".link").each((z) => z.color = P).style("stroke", P);
      Ms(f, l, P);
    }
    function j(P) {
      const F = Array.isArray(P) ? P : [P];
      for (const z of F)
        v.selectAll("circle").filter((H) => H.id === z).each((H) => r.value.removeNode(H));
      o.value = r.value.nodes.length > 0;
    }
    function L(P) {
      const F = Array.isArray(P) ? P : [P];
      for (const z of F)
        h.selectAll("path").filter((H) => H.id === z).each((H) => r.value.removeLink(H));
    }
    function N() {
      const P = (F) => F === "false" ? !1 : !!F;
      localStorage.wasHere && (i.value = P(localStorage.wasHere)), localStorage.showNodeLabels && (l.showNodeLabels = P(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (l.nodePhysicsEnabled = P(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (l.showLinkLabels = P(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (l.fixedLinkDistanceEnabled = P(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (l.zoomEnabled = P(localStorage.enableZoom)), localStorage.persistSettings && (l.persistSettingsLocalStorage = P(localStorage.persistSettings));
    }
    function S() {
      a = n.value.node().clientWidth, u = n.value.node().clientHeight, c = cw(
        (P) => B(P, l.zoomEnabled),
        l.zoomEnabled
      ), f = hw(
        n.value,
        c,
        (P) => ue(P),
        (P) => J(P),
        (P) => {
          W(Et(P, f.node())[0], Et(P, f.node())[1]);
        }
      ), gw(f, l, r.value.getNonDefaultLinkColors()), m = yw(f), h = vw(f), v = mw(f), s = pw(r.value, l, a, u, () => A()), d = dw(s, a, u, l.nodeRadius), le();
    }
    function B(P, F = !0) {
      F && (_ = P.transform.x, b = P.transform.y, x = P.transform.k, f.attr("transform", `translate(${_},${b})scale(${x})`));
    }
    function I(P, F, z, H) {
      r.value.createLink(P.id, F.id, z, H), le();
    }
    function W(P, F, z, H, ie) {
      r.value.createNode(P ?? a / 2, F ?? u / 2, z, H, ie), o.value = !0, le();
    }
    function A() {
      v.attr("transform", (P) => `translate(${P.x},${P.y})`), h.selectAll("path").attr("d", (P) => D(P)), Q(), le();
    }
    function D(P) {
      switch (O(P), P.pathType) {
        case mt.REFLEXIVE:
          return xc(P.source, [a / 2, u / 2], l);
        case mt.ARC:
          return Jl(P.source, P.target, l);
        case mt.ARCREVERSE:
          return Sc.reverse(Jl(P.source, P.target, l));
        case mt.LINE:
          return Zl(P.source, P.target, l);
        case mt.LINEREVERSE:
          return Sc.reverse(Zl(P.source, P.target, l));
        default:
          return "";
      }
    }
    function O(P) {
      P.source.id === P.target.id ? P.pathType = mt.REFLEXIVE : U(P.source, P.target) ? P.pathType = Y(P.source, P.target) ? mt.ARCREVERSE : mt.ARC : P.pathType = Y(P.source, P.target) ? mt.LINEREVERSE : mt.LINE;
    }
    function U(P, F) {
      return P.id !== F.id && r.value.links.some((z) => z.target.id === P.id && z.source.id === F.id) && r.value.links.some((z) => z.target.id === F.id && z.source.id === P.id);
    }
    function Y(P, F) {
      return P.x > F.x;
    }
    function Q() {
      const P = p;
      if (P !== void 0) {
        const F = g;
        if (F !== void 0)
          m.attr("d", () => P.id === F.id ? xc(P, [a / 2, u / 2], l) : U(P, F) ? Zl(P, F, l) : Jl(P, F, l));
        else if (w !== void 0) {
          const z = [P.x, P.y];
          m.attr("d", _c(z, w));
        }
      }
    }
    function le(P = 0.5) {
      h = h.data(r.value.links, (F) => F.id).join(
        (F) => {
          const z = F.append("g");
          return z.append("path").classed("link", !0).style("stroke", (H) => H.color ? H.color : "").attr("id", (H) => H.id).attr(
            "marker-end",
            (H) => H.color ? "url(#link-arrow-" + H.color : "url(#link-arrow)"
          ), z.append("path").classed("clickbox", !0).on("pointerdown", (H, ie) => {
            JC(ie, H.button, n.value);
            let xe = ie.color;
            H.button === 1 && (ei(H), r.value.removeLink(ie), xe && (r.value.hasNonDefaultLinkColor(xe) || Xl(f, xe)));
          }), z.append("text").append("textPath").attr(
            "class",
            (H) => H.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (H) => `#${H.id}`).attr("startOffset", "50%").text((H) => H.label ? H.label : "add label").on("click", (H, ie) => {
            ze(H, ie);
          }), z;
        },
        (F) => (F.selectChild("path").attr("marker-start", function(z) {
          var H;
          if ((H = z.pathType) != null && H.includes("REVERSE")) {
            let ie = "url(#link-arrow-reverse";
            return z.color && (ie += "-" + kr(z.color)), ie += ")", ie;
          } else
            return null;
        }).attr("marker-end", function(z) {
          var H;
          if ((H = z.pathType) != null && H.includes("REVERSE"))
            return null;
          {
            let ie = "url(#link-arrow";
            return z.color && (ie += "-" + kr(z.color)), ie += ")", ie;
          }
        }), F.selectChild("text").attr("class", (z) => {
          var H;
          return `${(H = z.pathType) == null ? void 0 : H.toLowerCase()}-path-text`;
        }).attr("dy", (z) => {
          var H;
          return z.pathType === mt.REFLEXIVE ? 15 : z.pathType == mt.LINEREVERSE ? -10 : (H = z.pathType) != null && H.includes("REVERSE") ? 20 : -10;
        }), F.selectChild("text").selectChild("textPath").classed("hidden", !l.showLinkLabels).attr("startOffset", (z) => {
          var H;
          return (H = z.pathType) != null && H.includes("REVERSE") ? "46%" : "50%";
        }), F)
      ), v = v.data(r.value.nodes, (F) => F.id).join(
        (F) => {
          const z = F.append("g").call(d).on("pointerdown", (H, ie) => {
            H.button === 1 && (ei(H), r.value.removeNode(ie), o.value = r.value.nodes.length > 0, te(), le());
          });
          return z.append("circle").classed("node", !0).attr("id", (H) => H.id).attr("r", l.nodeRadius).style("fill", (H) => H.color ? H.color : "").on("mouseenter", (H, ie) => g = ie).on("mouseout", () => g = void 0).on("pointerdown", (H, ie) => {
            ve(H, ie);
          }).on("pointerup", (H) => {
            J(H);
          }), z.append("text").attr(
            "class",
            (H) => H.label ? "node-label" : "node-label-placeholder"
          ).text((H) => H.label ? H.label : "add label").attr("dy", "0.33em").on("click", (H, ie) => {
            ke(H, ie);
          }).on("mouseenter", (H, ie) => g = ie).on("mouseout", () => g = void 0), z;
        },
        (F) => (F.selectChild("text").classed("hidden", !l.showNodeLabels), F)
      ), s.nodes(r.value.nodes), s.alpha(P).restart();
    }
    function ve(P, F) {
      if (ZC(F, P.button, n.value), P.button !== 0)
        return;
      ei(P);
      const z = [F.x, F.y];
      w = z, p = F, m.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", _c(z, z)), le();
    }
    function J(P) {
      const F = p, z = g;
      te(), !(F === void 0 || z === void 0) && (ei(P), I(F, z));
    }
    function ue(P) {
      if (ei(P), p !== void 0) {
        const F = k1(P, n.value.node())[0], z = [
          (F[0] - _) / x,
          (F[1] - b) / x
        ];
        P.pointerType === "touch" && (z[1] = z[1] - 4 * l.nodeRadius, g = r.value.nodes.find(
          (H) => Math.sqrt(Math.pow(H.x - z[0], 2) + Math.pow(H.y - z[1], 2)) < l.nodeRadius
        )), w = z, Q();
      }
    }
    function ke(P, F) {
      const z = P == null ? void 0 : P.target;
      et(F, z, [F.x, F.y]);
    }
    function ze(P, F) {
      const z = P.target;
      let H = It(z);
      et(F, z, H);
    }
    function et(P, F, z) {
      var dn;
      let H = P instanceof vh ? "node" : "link";
      const ie = document.createElement("input");
      ie.setAttribute("class", "label-input"), P.label == null ? ie.value = "" : ie.value = P.label, ie.placeholder = `Enter ${H} label`;
      let xe = !1;
      ie.onkeyup = function(Ki) {
        Ki.key === "Enter" ? (QC(P, ie.value, n.value), xe = !0, ie.blur()) : Ki.key === "Escape" && (ie.value = "", ie.blur());
      }, ie.onblur = function() {
        xe && (ie.value === "" ? (F.setAttribute("class", `${H}-label-placeholder`), F.textContent = "add label", P.label = void 0) : (F.setAttribute("class", `${H}-label`), F.textContent = ie.value.trim(), P.label = F.textContent)), Me.remove();
      };
      const Me = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      Me.setAttribute("width", "100%"), Me.setAttribute("height", "100%"), Me.setAttribute("x", `${z[0] - 80}`), Me.setAttribute("y", `${z[1] - 12}`), Me.append(ie);
      const tt = F.closest("svg");
      (dn = tt == null ? void 0 : tt.querySelector("g")) == null || dn.append(Me), ie.focus();
    }
    function It(P) {
      let F = n.value.select("svg").node().getBoundingClientRect(), z = P.getBoundingClientRect(), H = (z.x - F.x - _) / x, ie = (z.y - F.y - b) / x;
      return [H, ie];
    }
    function Zt(P) {
      q(P.showNodeLabels), E(P.nodePhysicsEnabled), G(P.showLinkLabels), M(P.fixedLinkDistanceEnabled), K(P.zoomEnabled), l.persistSettingsLocalStorage = P.persistEnabled;
    }
    function E(P) {
      l.nodePhysicsEnabled = P, mh(s, P, a, u);
    }
    function M(P) {
      l.fixedLinkDistanceEnabled = P, gh(s, r.value, l, P);
    }
    function G(P) {
      l.showLinkLabels = P;
    }
    function q(P) {
      l.showNodeLabels = P;
    }
    function K(P) {
      l.zoomEnabled = P, X();
    }
    function te() {
      m == null || m.classed("hidden", !0).attr("marker-end", "null"), p = void 0, g = void 0, w = void 0;
    }
    function oe(P) {
      let [F, z] = Kw(P);
      se(), ee(F, z);
    }
    function ee(P, F) {
      for (let H of P)
        W(void 0, void 0, H.idImported, H.label, H.color);
      const z = (H) => r.value.nodes.find((ie) => ie.idImported === H);
      for (let H of F) {
        let ie = z(H.sourceIdImported), xe = z(H.targetIdImported);
        ie && xe && (I(ie, xe, H.label, H.color), H.color && Ms(f, l, H.color));
      }
    }
    function re(P) {
      for (let F of P) {
        const z = r.value.links.filter((H) => H.id === F).map((H) => H.color).shift();
        z && (r.value.hasNonDefaultLinkColor(z, F) ? r.value.getLinkIdsWithNonDefaultLinkColors(
          z,
          F
        ).every(
          (xe) => P.includes(xe)
        ) && Xl(f, z) : Xl(f, z));
      }
    }
    function X() {
      s.stop(), n.value.selectChildren().remove(), c = void 0, _ = 0, b = 0, x = 1, f = void 0, m = void 0, h = void 0, v = void 0, s = void 0, te(), N(), S();
    }
    function se() {
      r.value = new yc(), o.value = !1, X();
    }
    return (P, F) => (nn(), bs(Ce, null, [
      ek,
      tk,
      l.hasToolbar ? (nn(), bs("div", nk, [
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: fe(({ props: z }) => [
            y(Je, he({
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, z, {
              variant: "plain",
              onClick: F[0] || (F[0] = (H) => W())
            }), null, 16)
          ]),
          _: 1
        }),
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: fe(({ props: z }) => [
            y(Je, he({
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, z, {
              variant: "plain",
              onClick: F[1] || (F[1] = (H) => se())
            }), null, 16)
          ]),
          _: 1
        }),
        y(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: fe(({ props: z }) => [
            y(Je, he({
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, z, {
              variant: "plain",
              onClick: F[2] || (F[2] = (H) => X())
            }), null, 16)
          ]),
          _: 1
        }),
        y(X2, {
          "graph-as-tgf": r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !1, !1),
          onFileImported: oe
        }, null, 8, ["graph-as-tgf"]),
        y(rS),
        y(XC, {
          config: l,
          "is-welcome": !i.value,
          onUpdateSettings: Zt
        }, null, 8, ["config", "is-welcome"])
      ])) : Tn("", !0),
      We(je("div", ik, "Graph is empty", 512), [
        [an, !o.value]
      ])
    ], 64));
  }
}), ok = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", lk = /* @__PURE__ */ nu(rk, [["styles", [ok]]]), Ks = {
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
function sk(e, t) {
  const n = [];
  let i = [];
  const r = fm(e), o = dm(e), l = (r.getDay() - Ks[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - Ks[t.slice(-2).toUpperCase()] + 7) % 7;
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
function ak(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function uk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function fm(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function dm(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function ck(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const fk = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function hm(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (fk.test(e))
      return ck(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const kf = new Date(2e3, 0, 2);
function dk(e) {
  const t = Ks[e.slice(-2).toUpperCase()];
  return Ia(7).map((n) => {
    const i = new Date(kf);
    return i.setDate(kf.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function hk(e, t, n, i) {
  const r = hm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function vk(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Pc(String(n.getMonth() + 1), 2, "0"), o = Pc(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function mk(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function gk(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function yk(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function pk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function bk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function wk(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function xk(e) {
  return e.getFullYear();
}
function _k(e) {
  return e.getMonth();
}
function Sk(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function Ck(e) {
  return e.getHours();
}
function kk(e) {
  return e.getMinutes();
}
function Ek(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Vk(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Lk(e, t) {
  return Xs(e, t[0]) && Tk(e, t[1]);
}
function Pk(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Xs(e, t) {
  return e.getTime() > t.getTime();
}
function Tk(e, t) {
  return e.getTime() < t.getTime();
}
function Ef(e, t) {
  return e.getTime() === t.getTime();
}
function Mk(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Ik(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Ak(e, t, n) {
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
function $k(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Nk(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Rk(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Ok(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Bk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Fk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Dk {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return hm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return vk(this, t);
  }
  parseISO(t) {
    return mk(t);
  }
  addMinutes(t, n) {
    return gk(t, n);
  }
  addHours(t, n) {
    return yk(t, n);
  }
  addDays(t, n) {
    return pk(t, n);
  }
  addWeeks(t, n) {
    return bk(t, n);
  }
  addMonths(t, n) {
    return wk(t, n);
  }
  getWeekArray(t) {
    return sk(t, this.locale);
  }
  startOfWeek(t) {
    return ak(t);
  }
  endOfWeek(t) {
    return uk(t);
  }
  startOfMonth(t) {
    return fm(t);
  }
  endOfMonth(t) {
    return dm(t);
  }
  format(t, n) {
    return hk(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Ef(t, n);
  }
  isValid(t) {
    return Pk(t);
  }
  isWithinRange(t, n) {
    return Lk(t, n);
  }
  isAfter(t, n) {
    return Xs(t, n);
  }
  isBefore(t, n) {
    return !Xs(t, n) && !Ef(t, n);
  }
  isSameDay(t, n) {
    return Mk(t, n);
  }
  isSameMonth(t, n) {
    return Ik(t, n);
  }
  setMinutes(t, n) {
    return Nk(t, n);
  }
  setHours(t, n) {
    return $k(t, n);
  }
  setMonth(t, n) {
    return Rk(t, n);
  }
  setYear(t, n) {
    return Ok(t, n);
  }
  getDiff(t, n, i) {
    return Ak(t, n, i);
  }
  getWeekdays() {
    return dk(this.locale);
  }
  getYear(t) {
    return xk(t);
  }
  getMonth(t) {
    return _k(t);
  }
  getNextMonth(t) {
    return Sk(t);
  }
  getHours(t) {
    return Ck(t);
  }
  getMinutes(t) {
    return kk(t);
  }
  startOfDay(t) {
    return Bk(t);
  }
  endOfDay(t) {
    return Fk(t);
  }
  startOfYear(t) {
    return Ek(t);
  }
  endOfYear(t) {
    return Vk(t);
  }
}
const Hk = Symbol.for("vuetify:date-options"), Vf = Symbol.for("vuetify:date-adapter");
function zk(e, t) {
  const n = bt({
    adapter: Dk,
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
    instance: jk(n, t)
  };
}
function jk(e, t) {
  const n = zt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ye(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const Uk = Symbol.for("vuetify:goto");
function Wk() {
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
function Gk(e, t) {
  return {
    rtl: t.isRtl,
    options: bt(Wk(), e)
  };
}
function vm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = bt(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = Mx(i.defaults), a = W_(i.display, i.ssr), u = Hx(i.theme), c = Xx(i.icons), d = r_(i.locale), f = zk(i.date, d), h = Gk(i.goTo, d);
  return {
    install: (m) => {
      for (const p in l)
        m.directive(p, l[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in r)
        m.component(p, Yt({
          ...r[p],
          name: p,
          aliasName: r[p].name
        }));
      if (u.install(m), m.provide(Di, s), m.provide(zs, a), m.provide(Zo, u), m.provide(Rs, c), m.provide(Jo, d), m.provide(Hk, f.options), m.provide(Vf, f.instance), m.provide(Uk, h), Te && i.ssr)
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
            return De(() => a.update()), m.mount = p, g;
          };
        }
      _t.reset(), m.mixin({
        computed: {
          $vuetify() {
            return zt({
              defaults: Ci.call(this, Di),
              display: Ci.call(this, zs),
              theme: Ci.call(this, Zo),
              icons: Ci.call(this, Rs),
              locale: Ci.call(this, Jo),
              date: Ci.call(this, Vf)
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
const qk = "3.5.9";
vm.version = qk;
function Ci(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const Yk = {
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
}, Kk = {
  component: Ha
};
var Xk = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Zk = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", Jk = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", Qk = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", eE = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", tE = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", nE = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
vm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...Yk,
      addNode: nE,
      deleteGraph: Zk,
      help: Qk,
      importExport: Jk,
      resetView: tE,
      settings: Xk,
      helpCircle: eE
    },
    sets: {
      mdi: Kk
    }
  }
});
customElements.define(
  "graph-editor",
  // GUI Version
  // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
  // CLI Version
  /* @__PURE__ */ N0(lk)
);
