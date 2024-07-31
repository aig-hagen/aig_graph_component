var ym = Object.defineProperty;
var pm = (e, t, n) => t in e ? ym(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var qe = (e, t, n) => pm(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qs(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const $e = {}, Pi = [], Pt = () => {
}, bm = () => !1, ll = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ea = (e) => e.startsWith("onUpdate:"), Fe = Object.assign, ta = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, wm = Object.prototype.hasOwnProperty, Le = (e, t) => wm.call(e, t), be = Array.isArray, Ti = (e) => sl(e) === "[object Map]", Tf = (e) => sl(e) === "[object Set]", Ce = (e) => typeof e == "function", De = (e) => typeof e == "string", Gi = (e) => typeof e == "symbol", Ae = (e) => e !== null && typeof e == "object", Mf = (e) => (Ae(e) || Ce(e)) && Ce(e.then) && Ce(e.catch), Af = Object.prototype.toString, sl = (e) => Af.call(e), xm = (e) => sl(e).slice(8, -1), $f = (e) => sl(e) === "[object Object]", na = (e) => De(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ar = /* @__PURE__ */ Qs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), al = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, _m = /-(\w)/g, ot = al((e) => e.replace(_m, (t, n) => n ? n.toUpperCase() : "")), Sm = /\B([A-Z])/g, Bt = al(
  (e) => e.replace(Sm, "-$1").toLowerCase()
), kn = al((e) => e.charAt(0).toUpperCase() + e.slice(1)), Rl = al((e) => e ? `on${kn(e)}` : ""), zn = (e, t) => !Object.is(e, t), Ol = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Po = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Cm = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, cs = (e) => {
  const t = De(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let fu;
const Nf = () => fu || (fu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ia(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = De(i) ? Lm(i) : ia(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (De(e) || Ae(e))
    return e;
}
const km = /;(?![^(]*\))/g, Em = /:([^]+)/, Vm = /\/\*[^]*?\*\//g;
function Lm(e) {
  const t = {};
  return e.replace(Vm, "").split(km).forEach((n) => {
    if (n) {
      const i = n.split(Em);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function ra(e) {
  let t = "";
  if (De(e))
    t = e;
  else if (be(e))
    for (let n = 0; n < e.length; n++) {
      const i = ra(e[n]);
      i && (t += i + " ");
    }
  else if (Ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Im = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Pm = /* @__PURE__ */ Qs(Im);
function Rf(e) {
  return !!e || e === "";
}
const Qn = (e) => De(e) ? e : e == null ? "" : be(e) || Ae(e) && (e.toString === Af || !Ce(e.toString)) ? JSON.stringify(e, Of, 2) : String(e), Of = (e, t) => t && t.__v_isRef ? Of(e, t.value) : Ti(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[Bl(i, o) + " =>"] = r, n),
    {}
  )
} : Tf(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Bl(n))
} : Gi(t) ? Bl(t) : Ae(t) && !be(t) && !$f(t) ? String(t) : t, Bl = (e, t = "") => {
  var n;
  return Gi(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let yt;
class Bf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = yt, !t && yt && (this.index = (yt.scopes || (yt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = yt;
      try {
        return yt = this, t();
      } finally {
        yt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    yt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    yt = this.parent;
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
function oa(e) {
  return new Bf(e);
}
function Tm(e, t = yt) {
  t && t.active && t.effects.push(e);
}
function Mm() {
  return yt;
}
function lt(e) {
  yt && yt.cleanups.push(e);
}
let ai;
class la {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Tm(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, yi();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Am(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), pi();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Dn, n = ai;
    try {
      return Dn = !0, ai = this, this._runnings++, du(this), this.fn();
    } finally {
      hu(this), this._runnings--, ai = n, Dn = t;
    }
  }
  stop() {
    var t;
    this.active && (du(this), hu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Am(e) {
  return e.value;
}
function du(e) {
  e._trackId++, e._depsLength = 0;
}
function hu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Ff(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Ff(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Dn = !0, fs = 0;
const Df = [];
function yi() {
  Df.push(Dn), Dn = !1;
}
function pi() {
  const e = Df.pop();
  Dn = e === void 0 ? !0 : e;
}
function sa() {
  fs++;
}
function aa() {
  for (fs--; !fs && ds.length; )
    ds.shift()();
}
function Hf(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && Ff(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const ds = [];
function zf(e, t, n) {
  sa();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && ds.push(i.scheduler)));
  }
  aa();
}
const jf = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, To = /* @__PURE__ */ new WeakMap(), ui = Symbol(""), hs = Symbol("");
function dt(e, t, n) {
  if (Dn && ai) {
    let i = To.get(e);
    i || To.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = jf(() => i.delete(n))), Hf(
      ai,
      r
    );
  }
}
function wn(e, t, n, i, r, o) {
  const l = To.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && be(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !Gi(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        be(e) ? na(n) && s.push(l.get("length")) : (s.push(l.get(ui)), Ti(e) && s.push(l.get(hs)));
        break;
      case "delete":
        be(e) || (s.push(l.get(ui)), Ti(e) && s.push(l.get(hs)));
        break;
      case "set":
        Ti(e) && s.push(l.get(ui));
        break;
    }
  sa();
  for (const a of s)
    a && zf(
      a,
      4
    );
  aa();
}
function $m(e, t) {
  var n;
  return (n = To.get(e)) == null ? void 0 : n.get(t);
}
const Nm = /* @__PURE__ */ Qs("__proto__,__v_isRef,__isVue"), Gf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Gi)
), vu = /* @__PURE__ */ Rm();
function Rm() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = we(this);
      for (let o = 0, l = this.length; o < l; o++)
        dt(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(we)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      yi(), sa();
      const i = we(this)[t].apply(this, n);
      return aa(), pi(), i;
    };
  }), e;
}
function Om(e) {
  const t = we(this);
  return dt(t, "has", e), t.hasOwnProperty(e);
}
class Uf {
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
      return i === (r ? o ? Xm : Kf : o ? Yf : qf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = be(t);
    if (!r) {
      if (l && Le(vu, n))
        return Reflect.get(vu, n, i);
      if (n === "hasOwnProperty")
        return Om;
    }
    const s = Reflect.get(t, n, i);
    return (Gi(n) ? Gf.has(n) : Nm(n)) || (r || dt(t, "get", n), o) ? s : Re(s) ? l && na(n) ? s : s.value : Ae(s) ? r ? Nr(s) : Ut(s) : s;
  }
}
class Wf extends Uf {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = Bi(o);
      if (!Mo(i) && !Bi(i) && (o = we(o), i = we(i)), !be(t) && Re(o) && !Re(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = be(t) && na(n) ? Number(n) < t.length : Le(t, n), s = Reflect.set(t, n, i, r);
    return t === we(r) && (l ? zn(i, o) && wn(t, "set", n, i) : wn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Le(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && wn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!Gi(n) || !Gf.has(n)) && dt(t, "has", n), i;
  }
  ownKeys(t) {
    return dt(
      t,
      "iterate",
      be(t) ? "length" : ui
    ), Reflect.ownKeys(t);
  }
}
class Bm extends Uf {
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
const Fm = /* @__PURE__ */ new Wf(), Dm = /* @__PURE__ */ new Bm(), Hm = /* @__PURE__ */ new Wf(
  !0
), ua = (e) => e, ul = (e) => Reflect.getPrototypeOf(e);
function Zr(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = we(e), o = we(t);
  n || (zn(t, o) && dt(r, "get", t), dt(r, "get", o));
  const { has: l } = ul(r), s = i ? ua : n ? da : mr;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function Jr(e, t = !1) {
  const n = this.__v_raw, i = we(n), r = we(e);
  return t || (zn(e, r) && dt(i, "has", e), dt(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Qr(e, t = !1) {
  return e = e.__v_raw, !t && dt(we(e), "iterate", ui), Reflect.get(e, "size", e);
}
function mu(e) {
  e = we(e);
  const t = we(this);
  return ul(t).has.call(t, e) || (t.add(e), wn(t, "add", e, e)), this;
}
function gu(e, t) {
  t = we(t);
  const n = we(this), { has: i, get: r } = ul(n);
  let o = i.call(n, e);
  o || (e = we(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? zn(t, l) && wn(n, "set", e, t) : wn(n, "add", e, t), this;
}
function yu(e) {
  const t = we(this), { has: n, get: i } = ul(t);
  let r = n.call(t, e);
  r || (e = we(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && wn(t, "delete", e, void 0), o;
}
function pu() {
  const e = we(this), t = e.size !== 0, n = e.clear();
  return t && wn(e, "clear", void 0, void 0), n;
}
function eo(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = we(l), a = t ? ua : e ? da : mr;
    return !e && dt(s, "iterate", ui), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function to(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = we(r), l = Ti(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? ua : t ? da : mr;
    return !t && dt(
      o,
      "iterate",
      a ? hs : ui
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
function Tn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function zm() {
  const e = {
    get(o) {
      return Zr(this, o);
    },
    get size() {
      return Qr(this);
    },
    has: Jr,
    add: mu,
    set: gu,
    delete: yu,
    clear: pu,
    forEach: eo(!1, !1)
  }, t = {
    get(o) {
      return Zr(this, o, !1, !0);
    },
    get size() {
      return Qr(this);
    },
    has: Jr,
    add: mu,
    set: gu,
    delete: yu,
    clear: pu,
    forEach: eo(!1, !0)
  }, n = {
    get(o) {
      return Zr(this, o, !0);
    },
    get size() {
      return Qr(this, !0);
    },
    has(o) {
      return Jr.call(this, o, !0);
    },
    add: Tn("add"),
    set: Tn("set"),
    delete: Tn("delete"),
    clear: Tn("clear"),
    forEach: eo(!0, !1)
  }, i = {
    get(o) {
      return Zr(this, o, !0, !0);
    },
    get size() {
      return Qr(this, !0);
    },
    has(o) {
      return Jr.call(this, o, !0);
    },
    add: Tn("add"),
    set: Tn("set"),
    delete: Tn("delete"),
    clear: Tn("clear"),
    forEach: eo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = to(
      o,
      !1,
      !1
    ), n[o] = to(
      o,
      !0,
      !1
    ), t[o] = to(
      o,
      !1,
      !0
    ), i[o] = to(
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
  jm,
  Gm,
  Um,
  Wm
] = /* @__PURE__ */ zm();
function ca(e, t) {
  const n = t ? e ? Wm : Um : e ? Gm : jm;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Le(n, r) && r in i ? n : i,
    r,
    o
  );
}
const qm = {
  get: /* @__PURE__ */ ca(!1, !1)
}, Ym = {
  get: /* @__PURE__ */ ca(!1, !0)
}, Km = {
  get: /* @__PURE__ */ ca(!0, !1)
}, qf = /* @__PURE__ */ new WeakMap(), Yf = /* @__PURE__ */ new WeakMap(), Kf = /* @__PURE__ */ new WeakMap(), Xm = /* @__PURE__ */ new WeakMap();
function Zm(e) {
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
function Jm(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Zm(xm(e));
}
function Ut(e) {
  return Bi(e) ? e : fa(
    e,
    !1,
    Fm,
    qm,
    qf
  );
}
function Qm(e) {
  return fa(
    e,
    !1,
    Hm,
    Ym,
    Yf
  );
}
function Nr(e) {
  return fa(
    e,
    !0,
    Dm,
    Km,
    Kf
  );
}
function fa(e, t, n, i, r) {
  if (!Ae(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = Jm(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Mi(e) {
  return Bi(e) ? Mi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Bi(e) {
  return !!(e && e.__v_isReadonly);
}
function Mo(e) {
  return !!(e && e.__v_isShallow);
}
function Xf(e) {
  return Mi(e) || Bi(e);
}
function we(e) {
  const t = e && e.__v_raw;
  return t ? we(t) : e;
}
function Zf(e) {
  return Object.isExtensible(e) && Po(e, "__v_skip", !0), e;
}
const mr = (e) => Ae(e) ? Ut(e) : e, da = (e) => Ae(e) ? Nr(e) : e;
class Jf {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new la(
      () => t(this._value),
      () => po(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = we(this);
    return (!t._cacheable || t.effect.dirty) && zn(t._value, t._value = t.effect.run()) && po(t, 4), Qf(t), t.effect._dirtyLevel >= 2 && po(t, 2), t._value;
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
function eg(e, t, n = !1) {
  let i, r;
  const o = Ce(e);
  return o ? (i = e, r = Pt) : (i = e.get, r = e.set), new Jf(i, r, o || !r, n);
}
function Qf(e) {
  var t;
  Dn && ai && (e = we(e), Hf(
    ai,
    (t = e.dep) != null ? t : e.dep = jf(
      () => e.dep = void 0,
      e instanceof Jf ? e : void 0
    )
  ));
}
function po(e, t = 4, n) {
  e = we(e);
  const i = e.dep;
  i && zf(
    i,
    t
  );
}
function Re(e) {
  return !!(e && e.__v_isRef === !0);
}
function ie(e) {
  return ed(e, !1);
}
function ye(e) {
  return ed(e, !0);
}
function ed(e, t) {
  return Re(e) ? e : new tg(e, t);
}
class tg {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : we(t), this._value = n ? t : mr(t);
  }
  get value() {
    return Qf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mo(t) || Bi(t);
    t = n ? t : we(t), zn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : mr(t), po(this, 4));
  }
}
function Ht(e) {
  return Re(e) ? e.value : e;
}
const ng = {
  get: (e, t, n) => Ht(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return Re(r) && !Re(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function td(e) {
  return Mi(e) ? e : new Proxy(e, ng);
}
function ha(e) {
  const t = be(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = nd(e, n);
  return t;
}
class ig {
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
    return $m(we(this._object), this._key);
  }
}
class rg {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function se(e, t, n) {
  return Re(e) ? e : Ce(e) ? new rg(e) : Ae(e) && arguments.length > 1 ? nd(e, t, n) : ie(e);
}
function nd(e, t, n) {
  const i = e[t];
  return Re(i) ? i : new ig(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Hn(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    cl(r, t, n);
  }
}
function Mt(e, t, n, i) {
  if (Ce(e)) {
    const o = Hn(e, t, n, i);
    return o && Mf(o) && o.catch((l) => {
      cl(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Mt(e[o], t, n, i));
  return r;
}
function cl(e, t, n, i = !0) {
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
      Hn(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  og(e, n, r, i);
}
function og(e, t, n, i = !0) {
  console.error(e);
}
let gr = !1, vs = !1;
const Je = [];
let on = 0;
const Ai = [];
let $n = null, ti = 0;
const id = /* @__PURE__ */ Promise.resolve();
let va = null;
function He(e) {
  const t = va || id;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function lg(e) {
  let t = on + 1, n = Je.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = Je[i], o = yr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function ma(e) {
  (!Je.length || !Je.includes(
    e,
    gr && e.allowRecurse ? on + 1 : on
  )) && (e.id == null ? Je.push(e) : Je.splice(lg(e.id), 0, e), rd());
}
function rd() {
  !gr && !vs && (vs = !0, va = id.then(ld));
}
function sg(e) {
  const t = Je.indexOf(e);
  t > on && Je.splice(t, 1);
}
function ag(e) {
  be(e) ? Ai.push(...e) : (!$n || !$n.includes(
    e,
    e.allowRecurse ? ti + 1 : ti
  )) && Ai.push(e), rd();
}
function bu(e, t, n = gr ? on + 1 : 0) {
  for (; n < Je.length; n++) {
    const i = Je[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      Je.splice(n, 1), n--, i();
    }
  }
}
function od(e) {
  if (Ai.length) {
    const t = [...new Set(Ai)].sort(
      (n, i) => yr(n) - yr(i)
    );
    if (Ai.length = 0, $n) {
      $n.push(...t);
      return;
    }
    for ($n = t, ti = 0; ti < $n.length; ti++)
      $n[ti]();
    $n = null, ti = 0;
  }
}
const yr = (e) => e.id == null ? 1 / 0 : e.id, ug = (e, t) => {
  const n = yr(e) - yr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ld(e) {
  vs = !1, gr = !0, Je.sort(ug);
  try {
    for (on = 0; on < Je.length; on++) {
      const t = Je[on];
      t && t.active !== !1 && Hn(t, null, 14);
    }
  } finally {
    on = 0, Je.length = 0, od(), gr = !1, va = null, (Je.length || Ai.length) && ld();
  }
}
function cg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || $e;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = i[c] || $e;
    f && (r = n.map((h) => De(h) ? h.trim() : h)), d && (r = n.map(Cm));
  }
  let s, a = i[s = Rl(t)] || // also try camelCase event handler (#2249)
  i[s = Rl(ot(t))];
  !a && o && (a = i[s = Rl(Bt(t))]), a && Mt(
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
    e.emitted[s] = !0, Mt(
      u,
      e,
      6,
      r
    );
  }
}
function sd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Ce(e)) {
    const a = (u) => {
      const c = sd(u, t, !0);
      c && (s = !0, Fe(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Ae(e) && i.set(e, null), null) : (be(o) ? o.forEach((a) => l[a] = null) : Fe(l, o), Ae(e) && i.set(e, l), l);
}
function fl(e, t) {
  return !e || !ll(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Le(e, t[0].toLowerCase() + t.slice(1)) || Le(e, Bt(t)) || Le(e, t));
}
let it = null, ad = null;
function Ao(e) {
  const t = it;
  return it = e, ad = e && e.type.__scopeId || null, t;
}
function fe(e, t = it, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && Au(-1);
    const o = Ao(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Ao(o), i._d && Au(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function Fl(e) {
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
  let y, g;
  const w = Ao(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, x = b;
      y = rn(
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
      y = rn(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? a : fg(a);
    }
  } catch (b) {
    dr.length = 0, cl(b, e, 1), y = p(At);
  }
  let _ = y;
  if (g && m !== !1) {
    const b = Object.keys(g), { shapeFlag: x } = _;
    b.length && x & 7 && (l && b.some(ea) && (g = dg(
      g,
      l
    )), _ = xn(_, g));
  }
  return n.dirs && (_ = xn(_), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition && (_.transition = n.transition), y = _, Ao(w), y;
}
const fg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ll(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, dg = (e, t) => {
  const n = {};
  for (const i in e)
    (!ea(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function hg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? wu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== i[f] && !fl(u, f))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? wu(i, l, u) : !0 : !!l;
  return !1;
}
function wu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !fl(n, o))
      return !0;
  }
  return !1;
}
function vg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ud = "components", mg = "directives", gg = Symbol.for("v-ndc");
function yg(e) {
  return De(e) && cd(ud, e, !1) || e;
}
function Wt(e) {
  return cd(mg, e);
}
function cd(e, t, n = !0, i = !1) {
  const r = it || Xe;
  if (r) {
    const o = r.type;
    if (e === ud) {
      const s = f0(
        o,
        !1
      );
      if (s && (s === t || s === ot(t) || s === kn(ot(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      xu(r[e] || o[e], t) || // global registration
      xu(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function xu(e, t) {
  return e && (e[t] || e[ot(t)] || e[kn(ot(t))]);
}
const pg = (e) => e.__isSuspense;
function bg(e, t) {
  t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : ag(e);
}
const wg = Symbol.for("v-scx"), xg = () => Ne(wg);
function un(e, t) {
  return ga(e, null, t);
}
const no = {};
function pe(e, t, n) {
  return ga(e, t, n);
}
function ga(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = $e) {
  if (t && o) {
    const E = t;
    t = (...C) => {
      E(...C), x();
    };
  }
  const a = Xe, u = (E) => i === !0 ? E : (
    // for deep: false, only traverse root-level properties
    ri(E, i === !1 ? 1 : void 0)
  );
  let c, d = !1, f = !1;
  if (Re(e) ? (c = () => e.value, d = Mo(e)) : Mi(e) ? (c = () => u(e), d = !0) : be(e) ? (f = !0, d = e.some((E) => Mi(E) || Mo(E)), c = () => e.map((E) => {
    if (Re(E))
      return E.value;
    if (Mi(E))
      return u(E);
    if (Ce(E))
      return Hn(E, a, 2);
  })) : Ce(e) ? t ? c = () => Hn(e, a, 2) : c = () => (h && h(), Mt(
    e,
    a,
    3,
    [v]
  )) : c = Pt, t && i) {
    const E = c;
    c = () => ri(E());
  }
  let h, v = (E) => {
    h = _.onStop = () => {
      Hn(E, a, 4), h = _.onStop = void 0;
    };
  }, m;
  if (yl)
    if (v = Pt, t ? n && Mt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const E = xg();
      m = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return Pt;
  let y = f ? new Array(e.length).fill(no) : no;
  const g = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const E = _.run();
        (i || d || (f ? E.some((C, P) => zn(C, y[P])) : zn(E, y))) && (h && h(), Mt(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          y === no ? void 0 : f && y[0] === no ? [] : y,
          v
        ]), y = E);
      } else
        _.run();
  };
  g.allowRecurse = !!t;
  let w;
  r === "sync" ? w = g : r === "post" ? w = () => ct(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), w = () => ma(g));
  const _ = new la(c, Pt, w), b = Mm(), x = () => {
    _.stop(), b && ta(b.effects, _);
  };
  return t ? n ? g() : y = _.run() : r === "post" ? ct(
    _.run.bind(_),
    a && a.suspense
  ) : _.run(), m && m.push(x), x;
}
function _g(e, t, n) {
  const i = this.proxy, r = De(e) ? e.includes(".") ? fd(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Ce(t) ? o = t : (o = t.handler, n = t);
  const l = Or(this), s = ga(r, o.bind(i), n);
  return l(), s;
}
function fd(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function ri(e, t, n = 0, i) {
  if (!Ae(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), Re(e))
    ri(e.value, t, n, i);
  else if (be(e))
    for (let r = 0; r < e.length; r++)
      ri(e[r], t, n, i);
  else if (Tf(e) || Ti(e))
    e.forEach((r) => {
      ri(r, t, n, i);
    });
  else if ($f(e))
    for (const r in e)
      ri(e[r], t, n, i);
  return e;
}
function We(e, t) {
  if (it === null)
    return e;
  const n = pl(it) || it.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = $e] = t[r];
    o && (Ce(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ri(l), i.push({
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
function Kn(e, t, n, i) {
  const r = e.dirs, o = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    o && (s.oldValue = o[l].value);
    let a = s.dir[i];
    a && (yi(), Mt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), pi());
  }
}
const Nn = Symbol("_leaveCb"), io = Symbol("_enterCb");
function dd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return qt(() => {
    e.isMounted = !0;
  }), Yt(() => {
    e.isUnmounting = !0;
  }), e;
}
const Vt = [Function, Array], hd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Vt,
  onEnter: Vt,
  onAfterEnter: Vt,
  onEnterCancelled: Vt,
  // leave
  onBeforeLeave: Vt,
  onLeave: Vt,
  onAfterLeave: Vt,
  onLeaveCancelled: Vt,
  // appear
  onBeforeAppear: Vt,
  onAppear: Vt,
  onAfterAppear: Vt,
  onAppearCancelled: Vt
}, Sg = {
  name: "BaseTransition",
  props: hd,
  setup(e, { slots: t }) {
    const n = _a(), i = dd();
    return () => {
      const r = t.default && ya(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const f of r)
          if (f.type !== At) {
            o = f;
            break;
          }
      }
      const l = we(e), { mode: s } = l;
      if (i.isLeaving)
        return Dl(o);
      const a = _u(o);
      if (!a)
        return Dl(o);
      const u = pr(
        a,
        l,
        i,
        n
      );
      br(a, u);
      const c = n.subTree, d = c && _u(c);
      if (d && d.type !== At && !ni(a, d)) {
        const f = pr(
          d,
          l,
          i,
          n
        );
        if (br(d, f), s === "out-in")
          return i.isLeaving = !0, f.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, Dl(o);
        s === "in-out" && a.type !== At && (f.delayLeave = (h, v, m) => {
          const y = vd(
            i,
            d
          );
          y[String(d.key)] = d, h[Nn] = () => {
            v(), h[Nn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, Cg = Sg;
function vd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function pr(e, t, n, i) {
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
    onAppear: y,
    onAfterAppear: g,
    onAppearCancelled: w
  } = t, _ = String(e.key), b = vd(n, e), x = (P, $) => {
    P && Mt(
      P,
      i,
      9,
      $
    );
  }, E = (P, $) => {
    const R = $[1];
    x(P, $), be(P) ? P.every((H) => H.length <= 1) && R() : P.length <= 1 && R();
  }, C = {
    mode: o,
    persisted: l,
    beforeEnter(P) {
      let $ = s;
      if (!n.isMounted)
        if (r)
          $ = m || s;
        else
          return;
      P[Nn] && P[Nn](
        !0
        /* cancelled */
      );
      const R = b[_];
      R && ni(e, R) && R.el[Nn] && R.el[Nn](), x($, [P]);
    },
    enter(P) {
      let $ = a, R = u, H = c;
      if (!n.isMounted)
        if (r)
          $ = y || a, R = g || u, H = w || c;
        else
          return;
      let I = !1;
      const N = P[io] = (S) => {
        I || (I = !0, S ? x(H, [P]) : x(R, [P]), C.delayedLeave && C.delayedLeave(), P[io] = void 0);
      };
      $ ? E($, [P, N]) : N();
    },
    leave(P, $) {
      const R = String(e.key);
      if (P[io] && P[io](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      x(d, [P]);
      let H = !1;
      const I = P[Nn] = (N) => {
        H || (H = !0, $(), N ? x(v, [P]) : x(h, [P]), P[Nn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, f ? E(f, [P, I]) : I();
    },
    clone(P) {
      return pr(P, t, n, i);
    }
  };
  return C;
}
function Dl(e) {
  if (dl(e))
    return e = xn(e), e.children = null, e;
}
function _u(e) {
  return dl(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function br(e, t) {
  e.shapeFlag & 6 && e.component ? br(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ya(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === ke ? (l.patchFlag & 128 && r++, i = i.concat(
      ya(l.children, t, s)
    )) : (t || l.type !== At) && i.push(s != null ? xn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
  return Ce(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Fe({ name: e.name }, t, { setup: e })
  ) : e;
}
const bo = (e) => !!e.type.__asyncLoader, dl = (e) => e.type.__isKeepAlive;
function kg(e, t) {
  md(e, "a", t);
}
function Eg(e, t) {
  md(e, "da", t);
}
function md(e, t, n = Xe) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (hl(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      dl(r.parent.vnode) && Vg(i, t, n, r), r = r.parent;
  }
}
function Vg(e, t, n, i) {
  const r = hl(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  ml(() => {
    ta(i[t], r);
  }, n);
}
function hl(e, t, n = Xe, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      yi();
      const s = Or(n), a = Mt(t, n, e, l);
      return s(), pi(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const En = (e) => (t, n = Xe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!yl || e === "sp") && hl(e, (...i) => t(...i), n)
), vl = En("bm"), qt = En("m"), Lg = En("bu"), gd = En("u"), Yt = En("bum"), ml = En("um"), Ig = En("sp"), Pg = En(
  "rtg"
), Tg = En(
  "rtc"
);
function Mg(e, t = Xe) {
  hl("ec", e, t);
}
function Ag(e, t, n, i) {
  let r;
  const o = n;
  if (be(e) || De(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (Ae(e))
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
const ms = (e) => e ? Ld(e) ? pl(e) || e.proxy : ms(e.parent) : null, ur = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ms(e.parent),
    $root: (e) => ms(e.root),
    $emit: (e) => e.emit,
    $options: (e) => pa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ma(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = He.bind(e.proxy)),
    $watch: (e) => _g.bind(e)
  })
), Hl = (e, t) => e !== $e && !e.__isScriptSetup && Le(e, t), $g = {
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
        if (Hl(i, t))
          return l[t] = 1, i[t];
        if (r !== $e && Le(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Le(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== $e && Le(n, t))
          return l[t] = 4, n[t];
        gs && (l[t] = 0);
      }
    }
    const c = ur[t];
    let d, f;
    if (c)
      return t === "$attrs" && dt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== $e && Le(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Le(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return Hl(r, t) ? (r[t] = n, !0) : i !== $e && Le(i, t) ? (i[t] = n, !0) : Le(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== $e && Le(e, l) || Hl(t, l) || (s = o[0]) && Le(s, l) || Le(i, l) || Le(ur, l) || Le(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Le(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Su(e) {
  return be(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let gs = !0;
function Ng(e) {
  const t = pa(e), n = e.proxy, i = e.ctx;
  gs = !1, t.beforeCreate && Cu(t.beforeCreate, e, "bc");
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
    deactivated: y,
    beforeDestroy: g,
    beforeUnmount: w,
    destroyed: _,
    unmounted: b,
    render: x,
    renderTracked: E,
    renderTriggered: C,
    errorCaptured: P,
    serverPrefetch: $,
    // public API
    expose: R,
    inheritAttrs: H,
    // assets
    components: I,
    directives: N,
    filters: S
  } = t;
  if (u && Rg(u, i, null), l)
    for (const G in l) {
      const A = l[G];
      Ce(A) && (i[G] = A.bind(n));
    }
  if (r) {
    const G = r.call(n, n);
    Ae(G) && (e.data = Ut(G));
  }
  if (gs = !0, o)
    for (const G in o) {
      const A = o[G], F = Ce(A) ? A.bind(n, n) : Ce(A.get) ? A.get.bind(n, n) : Pt, B = !Ce(A) && Ce(A.set) ? A.set.bind(n) : Pt, z = k({
        get: F,
        set: B
      });
      Object.defineProperty(i, G, {
        enumerable: !0,
        configurable: !0,
        get: () => z.value,
        set: (Y) => z.value = Y
      });
    }
  if (s)
    for (const G in s)
      yd(s[G], i, n, G);
  if (a) {
    const G = Ce(a) ? a.call(n) : a;
    Reflect.ownKeys(G).forEach((A) => {
      et(A, G[A]);
    });
  }
  c && Cu(c, e, "c");
  function M(G, A) {
    be(A) ? A.forEach((F) => G(F.bind(n))) : A && G(A.bind(n));
  }
  if (M(vl, d), M(qt, f), M(Lg, h), M(gd, v), M(kg, m), M(Eg, y), M(Mg, P), M(Tg, E), M(Pg, C), M(Yt, w), M(ml, b), M(Ig, $), be(R))
    if (R.length) {
      const G = e.exposed || (e.exposed = {});
      R.forEach((A) => {
        Object.defineProperty(G, A, {
          get: () => n[A],
          set: (F) => n[A] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === Pt && (e.render = x), H != null && (e.inheritAttrs = H), I && (e.components = I), N && (e.directives = N);
}
function Rg(e, t, n = Pt) {
  be(e) && (e = ys(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Ae(r) ? "default" in r ? o = Ne(
      r.from || i,
      r.default,
      !0
    ) : o = Ne(r.from || i) : o = Ne(r), Re(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function Cu(e, t, n) {
  Mt(
    be(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function yd(e, t, n, i) {
  const r = i.includes(".") ? fd(n, i) : () => n[i];
  if (De(e)) {
    const o = t[e];
    Ce(o) && pe(r, o);
  } else if (Ce(e))
    pe(r, e.bind(n));
  else if (Ae(e))
    if (be(e))
      e.forEach((o) => yd(o, t, n, i));
    else {
      const o = Ce(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ce(o) && pe(r, o, e);
    }
}
function pa(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => $o(a, u, l, !0)
  ), $o(a, t, l)), Ae(t) && o.set(t, a), a;
}
function $o(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && $o(e, o, n, !0), r && r.forEach(
    (l) => $o(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = Og[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const Og = {
  data: ku,
  props: Eu,
  emits: Eu,
  // objects
  methods: rr,
  computed: rr,
  // lifecycle
  beforeCreate: tt,
  created: tt,
  beforeMount: tt,
  mounted: tt,
  beforeUpdate: tt,
  updated: tt,
  beforeDestroy: tt,
  beforeUnmount: tt,
  destroyed: tt,
  unmounted: tt,
  activated: tt,
  deactivated: tt,
  errorCaptured: tt,
  serverPrefetch: tt,
  // assets
  components: rr,
  directives: rr,
  // watch
  watch: Fg,
  // provide / inject
  provide: ku,
  inject: Bg
};
function ku(e, t) {
  return t ? e ? function() {
    return Fe(
      Ce(e) ? e.call(this, this) : e,
      Ce(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Bg(e, t) {
  return rr(ys(e), ys(t));
}
function ys(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function tt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function rr(e, t) {
  return e ? Fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Eu(e, t) {
  return e ? be(e) && be(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Fe(
    /* @__PURE__ */ Object.create(null),
    Su(e),
    Su(t ?? {})
  ) : t;
}
function Fg(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Fe(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = tt(e[i], t[i]);
  return n;
}
function pd() {
  return {
    app: null,
    config: {
      isNativeTag: bm,
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
let Dg = 0;
function Hg(e, t) {
  return function(i, r = null) {
    Ce(i) || (i = Fe({}, i)), r != null && !Ae(r) && (r = null);
    const o = pd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: Dg++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: h0,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && Ce(u.install) ? (l.add(u), u.install(a, ...c)) : Ce(u) && (l.add(u), u(a, ...c))), a;
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
          const f = p(i, r);
          return f.appContext = o, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, pl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = cr;
        cr = a;
        try {
          return u();
        } finally {
          cr = c;
        }
      }
    };
    return a;
  };
}
let cr = null;
function et(e, t) {
  if (Xe) {
    let n = Xe.provides;
    const i = Xe.parent && Xe.parent.provides;
    i === n && (n = Xe.provides = Object.create(i)), n[e] = t;
  }
}
function Ne(e, t, n = !1) {
  const i = Xe || it;
  if (i || cr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : cr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Ce(t) ? t.call(i && i.proxy) : t;
  }
}
function zg(e, t, n, i = !1) {
  const r = {}, o = {};
  Po(o, gl, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), bd(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : Qm(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function jg(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = we(r), [a] = e.propsOptions;
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
        if (fl(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Le(o, f))
            h !== o[f] && (o[f] = h, u = !0);
          else {
            const v = ot(f);
            r[v] = ps(
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
    bd(e, t, r, o) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Le(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Bt(d)) === d || !Le(t, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[d] = ps(
        a,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete r[d]);
    if (o !== s)
      for (const d in o)
        (!t || !Le(t, d)) && (delete o[d], u = !0);
  }
  u && wn(e, "set", "$attrs");
}
function bd(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (ar(a))
        continue;
      const u = t[a];
      let c;
      r && Le(r, c = ot(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : fl(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = we(n), u = s || $e;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      n[d] = ps(
        r,
        a,
        d,
        u[d],
        e,
        !Le(u, d)
      );
    }
  }
  return l;
}
function ps(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Le(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Ce(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = Or(r);
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
    ] && (i === "" || i === Bt(n)) && (i = !0));
  }
  return i;
}
function wd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Ce(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = wd(d, t, !0);
      Fe(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Ae(e) && i.set(e, Pi), Pi;
  if (be(o))
    for (let c = 0; c < o.length; c++) {
      const d = ot(o[c]);
      Vu(d) && (l[d] = $e);
    }
  else if (o)
    for (const c in o) {
      const d = ot(c);
      if (Vu(d)) {
        const f = o[c], h = l[d] = be(f) || Ce(f) ? { type: f } : Fe({}, f);
        if (h) {
          const v = Pu(Boolean, h.type), m = Pu(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Le(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Ae(e) && i.set(e, u), u;
}
function Vu(e) {
  return e[0] !== "$" && !ar(e);
}
function Lu(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Iu(e, t) {
  return Lu(e) === Lu(t);
}
function Pu(e, t) {
  return be(t) ? t.findIndex((n) => Iu(n, e)) : Ce(t) && Iu(t, e) ? 0 : -1;
}
const xd = (e) => e[0] === "_" || e === "$stable", ba = (e) => be(e) ? e.map(rn) : [rn(e)], Gg = (e, t, n) => {
  if (t._n)
    return t;
  const i = fe((...r) => ba(t(...r)), n);
  return i._c = !1, i;
}, _d = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (xd(r))
      continue;
    const o = e[r];
    if (Ce(o))
      t[r] = Gg(r, o, i);
    else if (o != null) {
      const l = ba(o);
      t[r] = () => l;
    }
  }
}, Sd = (e, t) => {
  const n = ba(t);
  e.slots.default = () => n;
}, Ug = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = we(t), Po(t, "_", n)) : _d(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Sd(e, t);
  Po(e.slots, gl, 1);
}, Wg = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = $e;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (Fe(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, _d(t, r)), l = t;
  } else t && (Sd(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !xd(s) && l[s] == null && delete r[s];
};
function bs(e, t, n, i, r = !1) {
  if (be(e)) {
    e.forEach(
      (f, h) => bs(
        f,
        t && (be(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (bo(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? pl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === $e ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (De(u) ? (c[u] = null, Le(d, u) && (d[u] = null)) : Re(u) && (u.value = null)), Ce(a))
    Hn(a, s, 12, [l, c]);
  else {
    const f = De(a), h = Re(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const m = f ? Le(d, a) ? d[a] : c[a] : a.value;
          r ? be(m) && ta(m, o) : be(m) ? m.includes(o) || m.push(o) : f ? (c[a] = [o], Le(d, a) && (d[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else f ? (c[a] = l, Le(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, ct(v, n)) : v();
    }
  }
}
const ct = bg;
function qg(e) {
  return Yg(e);
}
function Yg(e, t) {
  const n = Nf();
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
    setScopeId: h = Pt,
    insertStaticContent: v
  } = e, m = (V, T, W, q = null, K = null, ne = null, oe = void 0, te = null, re = !!T.dynamicChildren) => {
    if (V === T)
      return;
    V && !ni(V, T) && (q = ue(V), Y(V, K, ne, !0), V = null), T.patchFlag === -2 && (re = !1, T.dynamicChildren = null);
    const { type: X, ref: le, shapeFlag: me } = T;
    switch (X) {
      case Rr:
        y(V, T, W, q);
        break;
      case At:
        g(V, T, W, q);
        break;
      case jl:
        V == null && w(T, W, q, oe);
        break;
      case ke:
        I(
          V,
          T,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re
        );
        break;
      default:
        me & 1 ? x(
          V,
          T,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re
        ) : me & 6 ? N(
          V,
          T,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re
        ) : (me & 64 || me & 128) && X.process(
          V,
          T,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re,
          at
        );
    }
    le != null && K && bs(le, V && V.ref, ne, T || V, !T);
  }, y = (V, T, W, q) => {
    if (V == null)
      i(
        T.el = s(T.children),
        W,
        q
      );
    else {
      const K = T.el = V.el;
      T.children !== V.children && u(K, T.children);
    }
  }, g = (V, T, W, q) => {
    V == null ? i(
      T.el = a(T.children || ""),
      W,
      q
    ) : T.el = V.el;
  }, w = (V, T, W, q) => {
    [V.el, V.anchor] = v(
      V.children,
      T,
      W,
      q,
      V.el,
      V.anchor
    );
  }, _ = ({ el: V, anchor: T }, W, q) => {
    let K;
    for (; V && V !== T; )
      K = f(V), i(V, W, q), V = K;
    i(T, W, q);
  }, b = ({ el: V, anchor: T }) => {
    let W;
    for (; V && V !== T; )
      W = f(V), r(V), V = W;
    r(T);
  }, x = (V, T, W, q, K, ne, oe, te, re) => {
    T.type === "svg" ? oe = "svg" : T.type === "math" && (oe = "mathml"), V == null ? E(
      T,
      W,
      q,
      K,
      ne,
      oe,
      te,
      re
    ) : $(
      V,
      T,
      K,
      ne,
      oe,
      te,
      re
    );
  }, E = (V, T, W, q, K, ne, oe, te) => {
    let re, X;
    const { props: le, shapeFlag: me, transition: L, dirs: D } = V;
    if (re = V.el = l(
      V.type,
      ne,
      le && le.is,
      le
    ), me & 8 ? c(re, V.children) : me & 16 && P(
      V.children,
      re,
      null,
      q,
      K,
      zl(V, ne),
      oe,
      te
    ), D && Kn(V, null, q, "created"), C(re, V, V.scopeId, oe, q), le) {
      for (const j in le)
        j !== "value" && !ar(j) && o(
          re,
          j,
          null,
          le[j],
          ne,
          V.children,
          q,
          K,
          J
        );
      "value" in le && o(re, "value", null, le.value, ne), (X = le.onVnodeBeforeMount) && nn(X, q, V);
    }
    D && Kn(V, null, q, "beforeMount");
    const U = Kg(K, L);
    U && L.beforeEnter(re), i(re, T, W), ((X = le && le.onVnodeMounted) || U || D) && ct(() => {
      X && nn(X, q, V), U && L.enter(re), D && Kn(V, null, q, "mounted");
    }, K);
  }, C = (V, T, W, q, K) => {
    if (W && h(V, W), q)
      for (let ne = 0; ne < q.length; ne++)
        h(V, q[ne]);
    if (K) {
      let ne = K.subTree;
      if (T === ne) {
        const oe = K.vnode;
        C(
          V,
          oe,
          oe.scopeId,
          oe.slotScopeIds,
          K.parent
        );
      }
    }
  }, P = (V, T, W, q, K, ne, oe, te, re = 0) => {
    for (let X = re; X < V.length; X++) {
      const le = V[X] = te ? Rn(V[X]) : rn(V[X]);
      m(
        null,
        le,
        T,
        W,
        q,
        K,
        ne,
        oe,
        te
      );
    }
  }, $ = (V, T, W, q, K, ne, oe) => {
    const te = T.el = V.el;
    let { patchFlag: re, dynamicChildren: X, dirs: le } = T;
    re |= V.patchFlag & 16;
    const me = V.props || $e, L = T.props || $e;
    let D;
    if (W && Xn(W, !1), (D = L.onVnodeBeforeUpdate) && nn(D, W, T, V), le && Kn(T, V, W, "beforeUpdate"), W && Xn(W, !0), X ? R(
      V.dynamicChildren,
      X,
      te,
      W,
      q,
      zl(T, K),
      ne
    ) : oe || A(
      V,
      T,
      te,
      null,
      W,
      q,
      zl(T, K),
      ne,
      !1
    ), re > 0) {
      if (re & 16)
        H(
          te,
          T,
          me,
          L,
          W,
          q,
          K
        );
      else if (re & 2 && me.class !== L.class && o(te, "class", null, L.class, K), re & 4 && o(te, "style", me.style, L.style, K), re & 8) {
        const U = T.dynamicProps;
        for (let j = 0; j < U.length; j++) {
          const ee = U[j], _e = me[ee], Me = L[ee];
          (Me !== _e || ee === "value") && o(
            te,
            ee,
            _e,
            Me,
            K,
            V.children,
            W,
            q,
            J
          );
        }
      }
      re & 1 && V.children !== T.children && c(te, T.children);
    } else !oe && X == null && H(
      te,
      T,
      me,
      L,
      W,
      q,
      K
    );
    ((D = L.onVnodeUpdated) || le) && ct(() => {
      D && nn(D, W, T, V), le && Kn(T, V, W, "updated");
    }, q);
  }, R = (V, T, W, q, K, ne, oe) => {
    for (let te = 0; te < T.length; te++) {
      const re = V[te], X = T[te], le = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        re.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (re.type === ke || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ni(re, X) || // - In the case of a component, it could contain anything.
        re.shapeFlag & 70) ? d(re.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      m(
        re,
        X,
        le,
        null,
        q,
        K,
        ne,
        oe,
        !0
      );
    }
  }, H = (V, T, W, q, K, ne, oe) => {
    if (W !== q) {
      if (W !== $e)
        for (const te in W)
          !ar(te) && !(te in q) && o(
            V,
            te,
            W[te],
            null,
            oe,
            T.children,
            K,
            ne,
            J
          );
      for (const te in q) {
        if (ar(te))
          continue;
        const re = q[te], X = W[te];
        re !== X && te !== "value" && o(
          V,
          te,
          X,
          re,
          oe,
          T.children,
          K,
          ne,
          J
        );
      }
      "value" in q && o(V, "value", W.value, q.value, oe);
    }
  }, I = (V, T, W, q, K, ne, oe, te, re) => {
    const X = T.el = V ? V.el : s(""), le = T.anchor = V ? V.anchor : s("");
    let { patchFlag: me, dynamicChildren: L, slotScopeIds: D } = T;
    D && (te = te ? te.concat(D) : D), V == null ? (i(X, W, q), i(le, W, q), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      T.children || [],
      W,
      le,
      K,
      ne,
      oe,
      te,
      re
    )) : me > 0 && me & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      L,
      W,
      K,
      ne,
      oe,
      te
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (T.key != null || K && T === K.subTree) && wa(
      V,
      T,
      !0
      /* shallow */
    )) : A(
      V,
      T,
      W,
      le,
      K,
      ne,
      oe,
      te,
      re
    );
  }, N = (V, T, W, q, K, ne, oe, te, re) => {
    T.slotScopeIds = te, V == null ? T.shapeFlag & 512 ? K.ctx.activate(
      T,
      W,
      q,
      oe,
      re
    ) : S(
      T,
      W,
      q,
      K,
      ne,
      oe,
      re
    ) : O(V, T, re);
  }, S = (V, T, W, q, K, ne, oe) => {
    const te = V.component = l0(
      V,
      q,
      K
    );
    if (dl(V) && (te.ctx.renderer = at), s0(te), te.asyncDep) {
      if (K && K.registerDep(te, M), !V.el) {
        const re = te.subTree = p(At);
        g(null, re, T, W);
      }
    } else
      M(
        te,
        V,
        T,
        W,
        K,
        ne,
        oe
      );
  }, O = (V, T, W) => {
    const q = T.component = V.component;
    if (hg(V, T, W))
      if (q.asyncDep && !q.asyncResolved) {
        G(q, T, W);
        return;
      } else
        q.next = T, sg(q.update), q.effect.dirty = !0, q.update();
    else
      T.el = V.el, q.vnode = T;
  }, M = (V, T, W, q, K, ne, oe) => {
    const te = () => {
      if (V.isMounted) {
        let { next: le, bu: me, u: L, parent: D, vnode: U } = V;
        {
          const ut = Cd(V);
          if (ut) {
            le && (le.el = U.el, G(V, le, oe)), ut.asyncDep.then(() => {
              V.isUnmounted || te();
            });
            return;
          }
        }
        let j = le, ee;
        Xn(V, !1), le ? (le.el = U.el, G(V, le, oe)) : le = U, me && Ol(me), (ee = le.props && le.props.onVnodeBeforeUpdate) && nn(ee, D, le, U), Xn(V, !0);
        const _e = Fl(V), Me = V.subTree;
        V.subTree = _e, m(
          Me,
          _e,
          // parent may have changed if it's in a teleport
          d(Me.el),
          // anchor may have changed if it's in a fragment
          ue(Me),
          V,
          K,
          ne
        ), le.el = _e.el, j === null && vg(V, _e.el), L && ct(L, K), (ee = le.props && le.props.onVnodeUpdated) && ct(
          () => nn(ee, D, le, U),
          K
        );
      } else {
        let le;
        const { el: me, props: L } = T, { bm: D, m: U, parent: j } = V, ee = bo(T);
        if (Xn(V, !1), D && Ol(D), !ee && (le = L && L.onVnodeBeforeMount) && nn(le, j, T), Xn(V, !0), me && en) {
          const _e = () => {
            V.subTree = Fl(V), en(
              me,
              V.subTree,
              V,
              K,
              null
            );
          };
          ee ? T.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && _e()
          ) : _e();
        } else {
          const _e = V.subTree = Fl(V);
          m(
            null,
            _e,
            W,
            q,
            V,
            K,
            ne
          ), T.el = _e.el;
        }
        if (U && ct(U, K), !ee && (le = L && L.onVnodeMounted)) {
          const _e = T;
          ct(
            () => nn(le, j, _e),
            K
          );
        }
        (T.shapeFlag & 256 || j && bo(j.vnode) && j.vnode.shapeFlag & 256) && V.a && ct(V.a, K), V.isMounted = !0, T = W = q = null;
      }
    }, re = V.effect = new la(
      te,
      Pt,
      () => ma(X),
      V.scope
      // track it in component's effect scope
    ), X = V.update = () => {
      re.dirty && re.run();
    };
    X.id = V.uid, Xn(V, !0), X();
  }, G = (V, T, W) => {
    T.component = V;
    const q = V.vnode.props;
    V.vnode = T, V.next = null, jg(V, T.props, q, W), Wg(V, T.children, W), yi(), bu(V), pi();
  }, A = (V, T, W, q, K, ne, oe, te, re = !1) => {
    const X = V && V.children, le = V ? V.shapeFlag : 0, me = T.children, { patchFlag: L, shapeFlag: D } = T;
    if (L > 0) {
      if (L & 128) {
        B(
          X,
          me,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re
        );
        return;
      } else if (L & 256) {
        F(
          X,
          me,
          W,
          q,
          K,
          ne,
          oe,
          te,
          re
        );
        return;
      }
    }
    D & 8 ? (le & 16 && J(X, K, ne), me !== X && c(W, me)) : le & 16 ? D & 16 ? B(
      X,
      me,
      W,
      q,
      K,
      ne,
      oe,
      te,
      re
    ) : J(X, K, ne, !0) : (le & 8 && c(W, ""), D & 16 && P(
      me,
      W,
      q,
      K,
      ne,
      oe,
      te,
      re
    ));
  }, F = (V, T, W, q, K, ne, oe, te, re) => {
    V = V || Pi, T = T || Pi;
    const X = V.length, le = T.length, me = Math.min(X, le);
    let L;
    for (L = 0; L < me; L++) {
      const D = T[L] = re ? Rn(T[L]) : rn(T[L]);
      m(
        V[L],
        D,
        W,
        null,
        K,
        ne,
        oe,
        te,
        re
      );
    }
    X > le ? J(
      V,
      K,
      ne,
      !0,
      !1,
      me
    ) : P(
      T,
      W,
      q,
      K,
      ne,
      oe,
      te,
      re,
      me
    );
  }, B = (V, T, W, q, K, ne, oe, te, re) => {
    let X = 0;
    const le = T.length;
    let me = V.length - 1, L = le - 1;
    for (; X <= me && X <= L; ) {
      const D = V[X], U = T[X] = re ? Rn(T[X]) : rn(T[X]);
      if (ni(D, U))
        m(
          D,
          U,
          W,
          null,
          K,
          ne,
          oe,
          te,
          re
        );
      else
        break;
      X++;
    }
    for (; X <= me && X <= L; ) {
      const D = V[me], U = T[L] = re ? Rn(T[L]) : rn(T[L]);
      if (ni(D, U))
        m(
          D,
          U,
          W,
          null,
          K,
          ne,
          oe,
          te,
          re
        );
      else
        break;
      me--, L--;
    }
    if (X > me) {
      if (X <= L) {
        const D = L + 1, U = D < le ? T[D].el : q;
        for (; X <= L; )
          m(
            null,
            T[X] = re ? Rn(T[X]) : rn(T[X]),
            W,
            U,
            K,
            ne,
            oe,
            te,
            re
          ), X++;
      }
    } else if (X > L)
      for (; X <= me; )
        Y(V[X], K, ne, !0), X++;
    else {
      const D = X, U = X, j = /* @__PURE__ */ new Map();
      for (X = U; X <= L; X++) {
        const mt = T[X] = re ? Rn(T[X]) : rn(T[X]);
        mt.key != null && j.set(mt.key, X);
      }
      let ee, _e = 0;
      const Me = L - U + 1;
      let ut = !1, Yn = 0;
      const Pn = new Array(Me);
      for (X = 0; X < Me; X++)
        Pn[X] = 0;
      for (X = D; X <= me; X++) {
        const mt = V[X];
        if (_e >= Me) {
          Y(mt, K, ne, !0);
          continue;
        }
        let tn;
        if (mt.key != null)
          tn = j.get(mt.key);
        else
          for (ee = U; ee <= L; ee++)
            if (Pn[ee - U] === 0 && ni(mt, T[ee])) {
              tn = ee;
              break;
            }
        tn === void 0 ? Y(mt, K, ne, !0) : (Pn[tn - U] = X + 1, tn >= Yn ? Yn = tn : ut = !0, m(
          mt,
          T[tn],
          W,
          null,
          K,
          ne,
          oe,
          te,
          re
        ), _e++);
      }
      const uu = ut ? Xg(Pn) : Pi;
      for (ee = uu.length - 1, X = Me - 1; X >= 0; X--) {
        const mt = U + X, tn = T[mt], cu = mt + 1 < le ? T[mt + 1].el : q;
        Pn[X] === 0 ? m(
          null,
          tn,
          W,
          cu,
          K,
          ne,
          oe,
          te,
          re
        ) : ut && (ee < 0 || X !== uu[ee] ? z(tn, W, cu, 2) : ee--);
      }
    }
  }, z = (V, T, W, q, K = null) => {
    const { el: ne, type: oe, transition: te, children: re, shapeFlag: X } = V;
    if (X & 6) {
      z(V.component.subTree, T, W, q);
      return;
    }
    if (X & 128) {
      V.suspense.move(T, W, q);
      return;
    }
    if (X & 64) {
      oe.move(V, T, W, at);
      return;
    }
    if (oe === ke) {
      i(ne, T, W);
      for (let me = 0; me < re.length; me++)
        z(re[me], T, W, q);
      i(V.anchor, T, W);
      return;
    }
    if (oe === jl) {
      _(V, T, W);
      return;
    }
    if (q !== 2 && X & 1 && te)
      if (q === 0)
        te.beforeEnter(ne), i(ne, T, W), ct(() => te.enter(ne), K);
      else {
        const { leave: me, delayLeave: L, afterLeave: D } = te, U = () => i(ne, T, W), j = () => {
          me(ne, () => {
            U(), D && D();
          });
        };
        L ? L(ne, U, j) : j();
      }
    else
      i(ne, T, W);
  }, Y = (V, T, W, q = !1, K = !1) => {
    const {
      type: ne,
      props: oe,
      ref: te,
      children: re,
      dynamicChildren: X,
      shapeFlag: le,
      patchFlag: me,
      dirs: L
    } = V;
    if (te != null && bs(te, null, W, V, !0), le & 256) {
      T.ctx.deactivate(V);
      return;
    }
    const D = le & 1 && L, U = !bo(V);
    let j;
    if (U && (j = oe && oe.onVnodeBeforeUnmount) && nn(j, T, V), le & 6)
      de(V.component, W, q);
    else {
      if (le & 128) {
        V.suspense.unmount(W, q);
        return;
      }
      D && Kn(V, null, T, "beforeUnmount"), le & 64 ? V.type.remove(
        V,
        T,
        W,
        K,
        at,
        q
      ) : X && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ne !== ke || me > 0 && me & 64) ? J(
        X,
        T,
        W,
        !1,
        !0
      ) : (ne === ke && me & 384 || !K && le & 16) && J(re, T, W), q && Q(V);
    }
    (U && (j = oe && oe.onVnodeUnmounted) || D) && ct(() => {
      j && nn(j, T, V), D && Kn(V, null, T, "unmounted");
    }, W);
  }, Q = (V) => {
    const { type: T, el: W, anchor: q, transition: K } = V;
    if (T === ke) {
      ae(W, q);
      return;
    }
    if (T === jl) {
      b(V);
      return;
    }
    const ne = () => {
      r(W), K && !K.persisted && K.afterLeave && K.afterLeave();
    };
    if (V.shapeFlag & 1 && K && !K.persisted) {
      const { leave: oe, delayLeave: te } = K, re = () => oe(W, ne);
      te ? te(V.el, ne, re) : re();
    } else
      ne();
  }, ae = (V, T) => {
    let W;
    for (; V !== T; )
      W = f(V), r(V), V = W;
    r(T);
  }, de = (V, T, W) => {
    const { bum: q, scope: K, update: ne, subTree: oe, um: te } = V;
    q && Ol(q), K.stop(), ne && (ne.active = !1, Y(oe, V, T, W)), te && ct(te, T), ct(() => {
      V.isUnmounted = !0;
    }, T), T && T.pendingBranch && !T.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === T.pendingId && (T.deps--, T.deps === 0 && T.resolve());
  }, J = (V, T, W, q = !1, K = !1, ne = 0) => {
    for (let oe = ne; oe < V.length; oe++)
      Y(V[oe], T, W, q, K);
  }, ue = (V) => V.shapeFlag & 6 ? ue(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : f(V.anchor || V.el);
  let Ee = !1;
  const je = (V, T, W) => {
    V == null ? T._vnode && Y(T._vnode, null, null, !0) : m(
      T._vnode || null,
      V,
      T,
      null,
      null,
      null,
      W
    ), Ee || (Ee = !0, bu(), od(), Ee = !1), T._vnode = V;
  }, at = {
    p: m,
    um: Y,
    m: z,
    r: Q,
    mt: S,
    mc: P,
    pc: A,
    pbc: R,
    n: ue,
    o: e
  };
  let Et, en;
  return {
    render: je,
    hydrate: Et,
    createApp: Hg(je, Et)
  };
}
function zl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Xn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Kg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function wa(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (be(i) && be(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = Rn(r[o]), s.el = l.el), n || wa(l, s)), s.type === Rr && (s.el = l.el);
    }
}
function Xg(e) {
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
function Cd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Cd(t);
}
const Zg = (e) => e.__isTeleport, fr = (e) => e && (e.disabled || e.disabled === ""), Tu = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Mu = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ws = (e, t) => {
  const n = e && e.to;
  return De(n) ? t ? t(n) : null : n;
}, Jg = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: m, createComment: y }
    } = u, g = fr(t.props);
    let { shapeFlag: w, children: _, dynamicChildren: b } = t;
    if (e == null) {
      const x = t.el = m(""), E = t.anchor = m("");
      h(x, n, i), h(E, n, i);
      const C = t.target = ws(t.props, v), P = t.targetAnchor = m("");
      C && (h(P, C), l === "svg" || Tu(C) ? l = "svg" : (l === "mathml" || Mu(C)) && (l = "mathml"));
      const $ = (R, H) => {
        w & 16 && c(
          _,
          R,
          H,
          r,
          o,
          l,
          s,
          a
        );
      };
      g ? $(n, E) : C && $(C, P);
    } else {
      t.el = e.el;
      const x = t.anchor = e.anchor, E = t.target = e.target, C = t.targetAnchor = e.targetAnchor, P = fr(e.props), $ = P ? n : E, R = P ? x : C;
      if (l === "svg" || Tu(E) ? l = "svg" : (l === "mathml" || Mu(E)) && (l = "mathml"), b ? (f(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), wa(e, t, !0)) : a || d(
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
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : ro(
          t,
          n,
          x,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const H = t.target = ws(
          t.props,
          v
        );
        H && ro(
          t,
          H,
          null,
          u,
          0
        );
      } else P && ro(
        t,
        E,
        C,
        u,
        1
      );
    }
    kd(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && o(c), l && o(u), s & 16) {
      const h = l || !fr(f);
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
  move: ro,
  hydrate: Qg
};
function ro(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = o === 2;
  if (d && i(l, t, n), (!d || fr(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      r(
        u[f],
        t,
        n,
        2
      );
  d && i(s, t, n);
}
function Qg(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = ws(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (fr(t.props))
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
    kd(t);
  }
  return t.anchor && l(t.anchor);
}
const e0 = Jg;
function kd(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const ke = Symbol.for("v-fgt"), Rr = Symbol.for("v-txt"), At = Symbol.for("v-cmt"), jl = Symbol.for("v-stc"), dr = [];
let zt = null;
function pt(e = !1) {
  dr.push(zt = e ? null : []);
}
function t0() {
  dr.pop(), zt = dr[dr.length - 1] || null;
}
let wr = 1;
function Au(e) {
  wr += e;
}
function Ed(e) {
  return e.dynamicChildren = wr > 0 ? zt || Pi : null, t0(), wr > 0 && zt && zt.push(e), e;
}
function xs(e, t, n, i, r, o) {
  return Ed(
    Ge(
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
  return Ed(
    p(
      e,
      t,
      n,
      i,
      r,
      !0
    )
  );
}
function No(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ni(e, t) {
  return e.type === t.type && e.key === t.key;
}
const gl = "__vInternal", Vd = ({ key: e }) => e ?? null, wo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? De(e) || Re(e) || Ce(e) ? { i: it, r: e, k: t, f: !!n } : e : null);
function Ge(e, t = null, n = null, i = 0, r = null, o = e === ke ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Vd(t),
    ref: t && wo(t),
    scopeId: ad,
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
    ctx: it
  };
  return s ? (xa(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= De(n) ? 8 : 16), wr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  zt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && zt.push(a), a;
}
const p = n0;
function n0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === gg) && (e = At), No(e)) {
    const s = xn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && xa(s, n), wr > 0 && !o && zt && (s.shapeFlag & 6 ? zt[zt.indexOf(e)] = s : zt.push(s)), s.patchFlag |= -2, s;
  }
  if (d0(e) && (e = e.__vccOpts), t) {
    t = i0(t);
    let { class: s, style: a } = t;
    s && !De(s) && (t.class = ra(s)), Ae(a) && (Xf(a) && !be(a) && (a = Fe({}, a)), t.style = ia(a));
  }
  const l = De(e) ? 1 : pg(e) ? 128 : Zg(e) ? 64 : Ae(e) ? 4 : Ce(e) ? 2 : 0;
  return Ge(
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
function i0(e) {
  return e ? Xf(e) || gl in e ? Fe({}, e) : e : null;
}
function xn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? ve(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && Vd(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? be(r) ? r.concat(wo(t)) : [r, wo(t)] : wo(t)
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
    ssContent: e.ssContent && xn(e.ssContent),
    ssFallback: e.ssFallback && xn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ue(e = " ", t = 0) {
  return p(Rr, null, e, t);
}
function Ot(e = "", t = !1) {
  return t ? (pt(), ln(At, null, e)) : p(At, null, e);
}
function rn(e) {
  return e == null || typeof e == "boolean" ? p(At) : be(e) ? p(
    ke,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Rn(e) : p(Rr, null, String(e));
}
function Rn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : xn(e);
}
function xa(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (be(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), xa(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(gl in t) ? t._ctx = it : r === 3 && it && (it.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ce(t) ? (t = { default: t, _ctx: it }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Ue(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ve(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = ra([t.class, i.class]));
      else if (r === "style")
        t.style = ia([t.style, i.style]);
      else if (ll(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(be(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function nn(e, t, n, i = null) {
  Mt(e, t, 7, [
    n,
    i
  ]);
}
const r0 = pd();
let o0 = 0;
function l0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || r0, o = {
    uid: o0++,
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
    scope: new Bf(
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
    propsOptions: wd(i, r),
    emitsOptions: sd(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: $e,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: $e,
    data: $e,
    props: $e,
    attrs: $e,
    slots: $e,
    refs: $e,
    setupState: $e,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = cg.bind(null, o), e.ce && e.ce(o), o;
}
let Xe = null;
const _a = () => Xe || it;
let Ro, _s;
{
  const e = Nf(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  Ro = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Xe = n
  ), _s = t(
    "__VUE_SSR_SETTERS__",
    (n) => yl = n
  );
}
const Or = (e) => {
  const t = Xe;
  return Ro(e), e.scope.on(), () => {
    e.scope.off(), Ro(t);
  };
}, $u = () => {
  Xe && Xe.scope.off(), Ro(null);
};
function Ld(e) {
  return e.vnode.shapeFlag & 4;
}
let yl = !1;
function s0(e, t = !1) {
  t && _s(t);
  const { props: n, children: i } = e.vnode, r = Ld(e);
  zg(e, n, r, t), Ug(e, i);
  const o = r ? a0(e, t) : void 0;
  return t && _s(!1), o;
}
function a0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Zf(new Proxy(e.ctx, $g));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? c0(e) : null, o = Or(e);
    yi();
    const l = Hn(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (pi(), o(), Mf(l)) {
      if (l.then($u, $u), t)
        return l.then((s) => {
          Nu(e, s, t);
        }).catch((s) => {
          cl(s, e, 0);
        });
      e.asyncDep = l;
    } else
      Nu(e, l, t);
  } else
    Id(e, t);
}
function Nu(e, t, n) {
  Ce(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ae(t) && (e.setupState = td(t)), Id(e, n);
}
let Ru;
function Id(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Ru && !i.render) {
      const r = i.template || pa(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = Fe(
          Fe(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = Ru(r, u);
      }
    }
    e.render = i.render || Pt;
  }
  {
    const r = Or(e);
    yi();
    try {
      Ng(e);
    } finally {
      pi(), r();
    }
  }
}
function u0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return dt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function c0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return u0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function pl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(td(Zf(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ur)
          return ur[n](e);
      },
      has(t, n) {
        return n in t || n in ur;
      }
    }));
}
function f0(e, t = !0) {
  return Ce(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function d0(e) {
  return Ce(e) && "__vccOpts" in e;
}
const k = (e, t) => eg(e, t, yl);
function Gn(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Ae(t) && !be(t) ? No(t) ? p(e, null, [t]) : p(e, t) : p(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && No(n) && (n = [n]), p(e, t, n));
}
const h0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const v0 = "http://www.w3.org/2000/svg", m0 = "http://www.w3.org/1998/Math/MathML", On = typeof document < "u" ? document : null, Ou = On && /* @__PURE__ */ On.createElement("template"), g0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? On.createElementNS(v0, e) : t === "mathml" ? On.createElementNS(m0, e) : On.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => On.createTextNode(e),
  createComment: (e) => On.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => On.querySelector(e),
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
      Ou.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = Ou.content;
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
}, Mn = "transition", Zi = "animation", Fi = Symbol("_vtc"), _n = (e, { slots: t }) => Gn(Cg, Td(e), t);
_n.displayName = "Transition";
const Pd = {
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
}, y0 = _n.props = /* @__PURE__ */ Fe(
  {},
  hd,
  Pd
), Zn = (e, t = []) => {
  be(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Bu = (e) => e ? be(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Td(e) {
  const t = {};
  for (const I in e)
    I in Pd || (t[I] = e[I]);
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
  } = e, v = p0(r), m = v && v[0], y = v && v[1], {
    onBeforeEnter: g,
    onEnter: w,
    onEnterCancelled: _,
    onLeave: b,
    onLeaveCancelled: x,
    onBeforeAppear: E = g,
    onAppear: C = w,
    onAppearCancelled: P = _
  } = t, $ = (I, N, S) => {
    An(I, N ? c : s), An(I, N ? u : l), S && S();
  }, R = (I, N) => {
    I._isLeaving = !1, An(I, d), An(I, h), An(I, f), N && N();
  }, H = (I) => (N, S) => {
    const O = I ? C : w, M = () => $(N, I, S);
    Zn(O, [N, M]), Fu(() => {
      An(N, I ? a : o), gn(N, I ? c : s), Bu(O) || Du(N, i, m, M);
    });
  };
  return Fe(t, {
    onBeforeEnter(I) {
      Zn(g, [I]), gn(I, o), gn(I, l);
    },
    onBeforeAppear(I) {
      Zn(E, [I]), gn(I, a), gn(I, u);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(I, N) {
      I._isLeaving = !0;
      const S = () => R(I, N);
      gn(I, d), Ad(), gn(I, f), Fu(() => {
        I._isLeaving && (An(I, d), gn(I, h), Bu(b) || Du(I, i, y, S));
      }), Zn(b, [I, S]);
    },
    onEnterCancelled(I) {
      $(I, !1), Zn(_, [I]);
    },
    onAppearCancelled(I) {
      $(I, !0), Zn(P, [I]);
    },
    onLeaveCancelled(I) {
      R(I), Zn(x, [I]);
    }
  });
}
function p0(e) {
  if (e == null)
    return null;
  if (Ae(e))
    return [Gl(e.enter), Gl(e.leave)];
  {
    const t = Gl(e);
    return [t, t];
  }
}
function Gl(e) {
  return cs(e);
}
function gn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Fi] || (e[Fi] = /* @__PURE__ */ new Set())).add(t);
}
function An(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[Fi];
  n && (n.delete(t), n.size || (e[Fi] = void 0));
}
function Fu(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let b0 = 0;
function Du(e, t, n, i) {
  const r = e._endId = ++b0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = Md(e, t);
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
function Md(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${Mn}Delay`), o = i(`${Mn}Duration`), l = Hu(r, o), s = i(`${Zi}Delay`), a = i(`${Zi}Duration`), u = Hu(s, a);
  let c = null, d = 0, f = 0;
  t === Mn ? l > 0 && (c = Mn, d = l, f = o.length) : t === Zi ? u > 0 && (c = Zi, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? Mn : Zi : null, f = c ? c === Mn ? o.length : a.length : 0);
  const h = c === Mn && /\b(transform|all)(,|$)/.test(
    i(`${Mn}Property`).toString()
  );
  return {
    type: c,
    timeout: d,
    propCount: f,
    hasTransform: h
  };
}
function Hu(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => zu(n) + zu(e[i])));
}
function zu(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ad() {
  return document.body.offsetHeight;
}
function w0(e, t, n) {
  const i = e[Fi];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Oo = Symbol("_vod"), $d = Symbol("_vsh"), fn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Oo] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ji(e, t);
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
  e.style.display = t ? e[Oo] : "none", e[$d] = !t;
}
const x0 = Symbol(""), _0 = /(^|;)\s*display\s*:/;
function S0(e, t, n) {
  const i = e.style, r = De(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (De(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && xo(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && xo(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), xo(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[x0];
      l && (n += ";" + l), i.cssText = n, o = _0.test(n);
    }
  } else t && e.removeAttribute("style");
  Oo in e && (e[Oo] = o ? i.display : "", e[$d] && (i.display = "none"));
}
const ju = /\s*!important$/;
function xo(e, t, n) {
  if (be(n))
    n.forEach((i) => xo(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = C0(e, t);
    ju.test(n) ? e.setProperty(
      Bt(i),
      n.replace(ju, ""),
      "important"
    ) : e[i] = n;
  }
}
const Gu = ["Webkit", "Moz", "ms"], Ul = {};
function C0(e, t) {
  const n = Ul[t];
  if (n)
    return n;
  let i = ot(t);
  if (i !== "filter" && i in e)
    return Ul[t] = i;
  i = kn(i);
  for (let r = 0; r < Gu.length; r++) {
    const o = Gu[r] + i;
    if (o in e)
      return Ul[t] = o;
  }
  return t;
}
const Uu = "http://www.w3.org/1999/xlink";
function k0(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Uu, t.slice(6, t.length)) : e.setAttributeNS(Uu, t, n);
  else {
    const o = Pm(t);
    n == null || o && !Rf(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function E0(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = Rf(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function V0(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function L0(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Wu = Symbol("_vei");
function I0(e, t, n, i, r = null) {
  const o = e[Wu] || (e[Wu] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = P0(t);
    if (i) {
      const u = o[t] = A0(i, r);
      V0(e, s, u, a);
    } else l && (L0(e, s, l, a), o[t] = void 0);
  }
}
const qu = /(?:Once|Passive|Capture)$/;
function P0(e) {
  let t;
  if (qu.test(e)) {
    t = {};
    let i;
    for (; i = e.match(qu); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Bt(e.slice(2)), t];
}
let Wl = 0;
const T0 = /* @__PURE__ */ Promise.resolve(), M0 = () => Wl || (T0.then(() => Wl = 0), Wl = Date.now());
function A0(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Mt(
      $0(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = M0(), n;
}
function $0(e, t) {
  if (be(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Yu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, N0 = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? w0(e, i, u) : t === "style" ? S0(e, n, i) : ll(t) ? ea(t) || I0(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : R0(e, t, i, u)) ? E0(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), k0(e, t, i, u));
};
function R0(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Yu(t) && Ce(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Yu(t) && De(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function O0(e, t) {
  const n = /* @__PURE__ */ Ui(e);
  class i extends Sa {
    constructor(o) {
      super(n, o, t);
    }
  }
  return i.def = n, i;
}
const B0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Sa extends B0 {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), He(() => {
      this._connected || (Zu(null, this.shadowRoot), this._instance = null);
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
      if (o && !be(o))
        for (const a in o) {
          const u = o[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = cs(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[ot(a)] = !0);
        }
      this._numberProps = s, r && this._resolveProps(i), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = be(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && i.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of i.map(ot))
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
    const i = ot(t);
    this._numberProps && this._numberProps[i] && (n = cs(n)), this._setProp(i, n, !1);
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
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), i && (n === !0 ? this.setAttribute(Bt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Bt(t), n + "") : n || this.removeAttribute(Bt(t))));
  }
  _update() {
    Zu(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = p(this._def, Fe({}, this._props));
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
        i(o, l), Bt(o) !== o && i(Bt(o), l);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof Sa) {
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
const Nd = /* @__PURE__ */ new WeakMap(), Rd = /* @__PURE__ */ new WeakMap(), Bo = Symbol("_moveCb"), Ku = Symbol("_enterCb"), Od = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Fe({}, y0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = _a(), i = dd();
    let r, o;
    return gd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!j0(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(D0), r.forEach(H0);
      const s = r.filter(z0);
      Ad(), s.forEach((a) => {
        const u = a.el, c = u.style;
        gn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[Bo] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[Bo] = null, An(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = we(e), s = Td(l);
      let a = l.tag || ke;
      r = o, o = t.default ? ya(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && br(
          c,
          pr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          br(
            c,
            pr(c, s, i, n)
          ), Nd.set(c, c.el.getBoundingClientRect());
        }
      return p(a, null, o);
    };
  }
}, F0 = (e) => delete e.mode;
Od.props;
const Bd = Od;
function D0(e) {
  const t = e.el;
  t[Bo] && t[Bo](), t[Ku] && t[Ku]();
}
function H0(e) {
  Rd.set(e, e.el.getBoundingClientRect());
}
function z0(e) {
  const t = Nd.get(e), n = Rd.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function j0(e, t, n) {
  const i = e.cloneNode(), r = e[Fi];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = Md(i);
  return o.removeChild(i), l;
}
const G0 = /* @__PURE__ */ Fe({ patchProp: N0 }, g0);
let Xu;
function U0() {
  return Xu || (Xu = qg(G0));
}
const Zu = (...e) => {
  U0().render(...e);
};
var W0 = { value: () => {
} };
function Br() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new _o(n);
}
function _o(e) {
  this._ = e;
}
function q0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
_o.prototype = Br.prototype = {
  constructor: _o,
  on: function(e, t) {
    var n = this._, i = q0(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = Y0(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = Ju(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Ju(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new _o(e);
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
function Y0(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Ju(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = W0, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Ss = "http://www.w3.org/1999/xhtml";
const Qu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ss,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function bl(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Qu.hasOwnProperty(t) ? { space: Qu[t], local: e } : e;
}
function K0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Ss && t.documentElement.namespaceURI === Ss ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function X0(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Fd(e) {
  var t = bl(e);
  return (t.local ? X0 : K0)(t);
}
function Z0() {
}
function Ca(e) {
  return e == null ? Z0 : function() {
    return this.querySelector(e);
  };
}
function J0(e) {
  typeof e != "function" && (e = Ca(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new _t(i, this._parents);
}
function Q0(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ey() {
  return [];
}
function Dd(e) {
  return e == null ? ey : function() {
    return this.querySelectorAll(e);
  };
}
function ty(e) {
  return function() {
    return Q0(e.apply(this, arguments));
  };
}
function ny(e) {
  typeof e == "function" ? e = ty(e) : e = Dd(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new _t(i, r);
}
function Hd(e) {
  return function() {
    return this.matches(e);
  };
}
function zd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var iy = Array.prototype.find;
function ry(e) {
  return function() {
    return iy.call(this.children, e);
  };
}
function oy() {
  return this.firstElementChild;
}
function ly(e) {
  return this.select(e == null ? oy : ry(typeof e == "function" ? e : zd(e)));
}
var sy = Array.prototype.filter;
function ay() {
  return Array.from(this.children);
}
function uy(e) {
  return function() {
    return sy.call(this.children, e);
  };
}
function cy(e) {
  return this.selectAll(e == null ? ay : uy(typeof e == "function" ? e : zd(e)));
}
function fy(e) {
  typeof e != "function" && (e = Hd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new _t(i, this._parents);
}
function jd(e) {
  return new Array(e.length);
}
function dy() {
  return new _t(this._enter || this._groups.map(jd), this._parents);
}
function Fo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Fo.prototype = {
  constructor: Fo,
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
function hy(e) {
  return function() {
    return e;
  };
}
function vy(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new Fo(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function my(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = o.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new Fo(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (r[s] = a);
}
function gy(e) {
  return e.__data__;
}
function yy(e, t) {
  if (!arguments.length) return Array.from(this, gy);
  var n = t ? my : vy, i = this._parents, r = this._groups;
  typeof e != "function" && (e = hy(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], d = r[u], f = d.length, h = py(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), y = l[u] = new Array(v), g = a[u] = new Array(f);
    n(c, d, m, y, g, h, t);
    for (var w = 0, _ = 0, b, x; w < v; ++w)
      if (b = m[w]) {
        for (w >= _ && (_ = w + 1); !(x = y[_]) && ++_ < v; ) ;
        b._next = x || null;
      }
  }
  return l = new _t(l, i), l._enter = s, l._exit = a, l;
}
function py(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function by() {
  return new _t(this._exit || this._groups.map(jd), this._parents);
}
function wy(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function xy(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new _t(s, this._parents);
}
function _y() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function Sy(e) {
  e || (e = Cy);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new _t(r, this._parents).order();
}
function Cy(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ky() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ey() {
  return Array.from(this);
}
function Vy() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function Ly() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Iy() {
  return !this.node();
}
function Py(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function Ty(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function My(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ay(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function $y(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ny(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Ry(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Oy(e, t) {
  var n = bl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? My : Ty : typeof t == "function" ? n.local ? Ry : Ny : n.local ? $y : Ay)(n, t));
}
function Gd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function By(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Fy(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Dy(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Hy(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? By : typeof t == "function" ? Dy : Fy)(e, t, n ?? "")) : Di(this.node(), e);
}
function Di(e, t) {
  return e.style.getPropertyValue(t) || Gd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function zy(e) {
  return function() {
    delete this[e];
  };
}
function jy(e, t) {
  return function() {
    this[e] = t;
  };
}
function Gy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Uy(e, t) {
  return arguments.length > 1 ? this.each((t == null ? zy : typeof t == "function" ? Gy : jy)(e, t)) : this.node()[e];
}
function Ud(e) {
  return e.trim().split(/^|\s+/);
}
function ka(e) {
  return e.classList || new Wd(e);
}
function Wd(e) {
  this._node = e, this._names = Ud(e.getAttribute("class") || "");
}
Wd.prototype = {
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
function qd(e, t) {
  for (var n = ka(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function Yd(e, t) {
  for (var n = ka(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function Wy(e) {
  return function() {
    qd(this, e);
  };
}
function qy(e) {
  return function() {
    Yd(this, e);
  };
}
function Yy(e, t) {
  return function() {
    (t.apply(this, arguments) ? qd : Yd)(this, e);
  };
}
function Ky(e, t) {
  var n = Ud(e + "");
  if (arguments.length < 2) {
    for (var i = ka(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Yy : t ? Wy : qy)(n, t));
}
function Xy() {
  this.textContent = "";
}
function Zy(e) {
  return function() {
    this.textContent = e;
  };
}
function Jy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Qy(e) {
  return arguments.length ? this.each(e == null ? Xy : (typeof e == "function" ? Jy : Zy)(e)) : this.node().textContent;
}
function e1() {
  this.innerHTML = "";
}
function t1(e) {
  return function() {
    this.innerHTML = e;
  };
}
function n1(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function i1(e) {
  return arguments.length ? this.each(e == null ? e1 : (typeof e == "function" ? n1 : t1)(e)) : this.node().innerHTML;
}
function r1() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function o1() {
  return this.each(r1);
}
function l1() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function s1() {
  return this.each(l1);
}
function a1(e) {
  var t = typeof e == "function" ? e : Fd(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function u1() {
  return null;
}
function c1(e, t) {
  var n = typeof e == "function" ? e : Fd(e), i = t == null ? u1 : typeof t == "function" ? t : Ca(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function f1() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function d1() {
  return this.each(f1);
}
function h1() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function v1() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function m1(e) {
  return this.select(e ? v1 : h1);
}
function g1(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function y1(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function p1(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function b1(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function w1(e, t, n) {
  return function() {
    var i = this.__on, r, o = y1(t);
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
function x1(e, t, n) {
  var i = p1(e + ""), r, o = i.length, l;
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
  for (s = t ? w1 : b1, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function Kd(e, t, n) {
  var i = Gd(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function _1(e, t) {
  return function() {
    return Kd(this, e, t);
  };
}
function S1(e, t) {
  return function() {
    return Kd(this, e, t.apply(this, arguments));
  };
}
function C1(e, t) {
  return this.each((typeof t == "function" ? S1 : _1)(e, t));
}
function* k1() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var Xd = [null];
function _t(e, t) {
  this._groups = e, this._parents = t;
}
function Fr() {
  return new _t([[document.documentElement]], Xd);
}
function E1() {
  return this;
}
_t.prototype = Fr.prototype = {
  constructor: _t,
  select: J0,
  selectAll: ny,
  selectChild: ly,
  selectChildren: cy,
  filter: fy,
  data: yy,
  enter: dy,
  exit: by,
  join: wy,
  merge: xy,
  selection: E1,
  order: _y,
  sort: Sy,
  call: ky,
  nodes: Ey,
  node: Vy,
  size: Ly,
  empty: Iy,
  each: Py,
  attr: Oy,
  style: Hy,
  property: Uy,
  classed: Ky,
  text: Qy,
  html: i1,
  raise: o1,
  lower: s1,
  append: a1,
  insert: c1,
  remove: d1,
  clone: m1,
  datum: g1,
  on: x1,
  dispatch: C1,
  [Symbol.iterator]: k1
};
function Ft(e) {
  return typeof e == "string" ? new _t([[document.querySelector(e)]], [document.documentElement]) : new _t([[e]], Xd);
}
function Zd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function It(e, t) {
  if (e = Zd(e), t === void 0 && (t = e.currentTarget), t) {
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
function V1(e, t) {
  return e.target && (e = Zd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => It(n, t));
}
const L1 = { passive: !1 }, xr = { capture: !0, passive: !1 };
function ql(e) {
  e.stopImmediatePropagation();
}
function $i(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jd(e) {
  var t = e.document.documentElement, n = Ft(e).on("dragstart.drag", $i, xr);
  "onselectstart" in t ? n.on("selectstart.drag", $i, xr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Qd(e, t) {
  var n = e.document.documentElement, i = Ft(e).on("dragstart.drag", null);
  t && (i.on("click.drag", $i, xr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const oo = (e) => () => e;
function Cs(e, {
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
Cs.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function I1(e) {
  return !e.ctrlKey && !e.button;
}
function P1() {
  return this.parentNode;
}
function T1(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function M1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function A1() {
  var e = I1, t = P1, n = T1, i = M1, r = {}, o = Br("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", y).on("touchmove.drag", g, L1).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, x) {
    if (!(c || !e.call(this, b, x))) {
      var E = _(this, t.call(this, b, x), b, x, "mouse");
      E && (Ft(b.view).on("mousemove.drag", v, xr).on("mouseup.drag", m, xr), Jd(b.view), ql(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if ($i(b), !u) {
      var x = b.clientX - s, E = b.clientY - a;
      u = x * x + E * E > d;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    Ft(b.view).on("mousemove.drag mouseup.drag", null), Qd(b.view, u), $i(b), r.mouse("end", b);
  }
  function y(b, x) {
    if (e.call(this, b, x)) {
      var E = b.changedTouches, C = t.call(this, b, x), P = E.length, $, R;
      for ($ = 0; $ < P; ++$)
        (R = _(this, C, b, x, E[$].identifier, E[$])) && (ql(b), R("start", b, E[$]));
    }
  }
  function g(b) {
    var x = b.changedTouches, E = x.length, C, P;
    for (C = 0; C < E; ++C)
      (P = r[x[C].identifier]) && ($i(b), P("drag", b, x[C]));
  }
  function w(b) {
    var x = b.changedTouches, E = x.length, C, P;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), C = 0; C < E; ++C)
      (P = r[x[C].identifier]) && (ql(b), P("end", b, x[C]));
  }
  function _(b, x, E, C, P, $) {
    var R = o.copy(), H = It($ || E, x), I, N, S;
    if ((S = n.call(b, new Cs("beforestart", {
      sourceEvent: E,
      target: f,
      identifier: P,
      active: l,
      x: H[0],
      y: H[1],
      dx: 0,
      dy: 0,
      dispatch: R
    }), C)) != null)
      return I = S.x - H[0] || 0, N = S.y - H[1] || 0, function O(M, G, A) {
        var F = H, B;
        switch (M) {
          case "start":
            r[P] = O, B = l++;
            break;
          case "end":
            delete r[P], --l;
          case "drag":
            H = It(A || G, x), B = l;
            break;
        }
        R.call(
          M,
          b,
          new Cs(M, {
            sourceEvent: G,
            subject: S,
            target: f,
            identifier: P,
            active: B,
            x: H[0] + I,
            y: H[1] + N,
            dx: H[0] - F[0],
            dy: H[1] - F[1],
            dispatch: R
          }),
          C
        );
      };
  }
  return f.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : oo(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : oo(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : oo(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : oo(!!b), f) : i;
  }, f.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function Ea(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function eh(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Dr() {
}
var _r = 0.7, Do = 1 / _r, Ni = "\\s*([+-]?\\d+)\\s*", Sr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", sn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $1 = /^#([0-9a-f]{3,8})$/, N1 = new RegExp(`^rgb\\(${Ni},${Ni},${Ni}\\)$`), R1 = new RegExp(`^rgb\\(${sn},${sn},${sn}\\)$`), O1 = new RegExp(`^rgba\\(${Ni},${Ni},${Ni},${Sr}\\)$`), B1 = new RegExp(`^rgba\\(${sn},${sn},${sn},${Sr}\\)$`), F1 = new RegExp(`^hsl\\(${Sr},${sn},${sn}\\)$`), D1 = new RegExp(`^hsla\\(${Sr},${sn},${sn},${Sr}\\)$`), ec = {
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
Ea(Dr, Cr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: tc,
  // Deprecated! Use color.formatHex.
  formatHex: tc,
  formatHex8: H1,
  formatHsl: z1,
  formatRgb: nc,
  toString: nc
});
function tc() {
  return this.rgb().formatHex();
}
function H1() {
  return this.rgb().formatHex8();
}
function z1() {
  return th(this).formatHsl();
}
function nc() {
  return this.rgb().formatRgb();
}
function Cr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = $1.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ic(t) : n === 3 ? new ft(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? lo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? lo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = N1.exec(e)) ? new ft(t[1], t[2], t[3], 1) : (t = R1.exec(e)) ? new ft(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = O1.exec(e)) ? lo(t[1], t[2], t[3], t[4]) : (t = B1.exec(e)) ? lo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = F1.exec(e)) ? lc(t[1], t[2] / 100, t[3] / 100, 1) : (t = D1.exec(e)) ? lc(t[1], t[2] / 100, t[3] / 100, t[4]) : ec.hasOwnProperty(e) ? ic(ec[e]) : e === "transparent" ? new ft(NaN, NaN, NaN, 0) : null;
}
function ic(e) {
  return new ft(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function lo(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new ft(e, t, n, i);
}
function j1(e) {
  return e instanceof Dr || (e = Cr(e)), e ? (e = e.rgb(), new ft(e.r, e.g, e.b, e.opacity)) : new ft();
}
function ks(e, t, n, i) {
  return arguments.length === 1 ? j1(e) : new ft(e, t, n, i ?? 1);
}
function ft(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Ea(ft, ks, eh(Dr, {
  brighter(e) {
    return e = e == null ? Do : Math.pow(Do, e), new ft(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? _r : Math.pow(_r, e), new ft(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ft(ci(this.r), ci(this.g), ci(this.b), Ho(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rc,
  // Deprecated! Use color.formatHex.
  formatHex: rc,
  formatHex8: G1,
  formatRgb: oc,
  toString: oc
}));
function rc() {
  return `#${oi(this.r)}${oi(this.g)}${oi(this.b)}`;
}
function G1() {
  return `#${oi(this.r)}${oi(this.g)}${oi(this.b)}${oi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function oc() {
  const e = Ho(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ci(this.r)}, ${ci(this.g)}, ${ci(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ho(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ci(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function oi(e) {
  return e = ci(e), (e < 16 ? "0" : "") + e.toString(16);
}
function lc(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Dt(e, t, n, i);
}
function th(e) {
  if (e instanceof Dt) return new Dt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Dr || (e = Cr(e)), !e) return new Dt();
  if (e instanceof Dt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new Dt(l, s, a, e.opacity);
}
function U1(e, t, n, i) {
  return arguments.length === 1 ? th(e) : new Dt(e, t, n, i ?? 1);
}
function Dt(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Ea(Dt, U1, eh(Dr, {
  brighter(e) {
    return e = e == null ? Do : Math.pow(Do, e), new Dt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? _r : Math.pow(_r, e), new Dt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new ft(
      Yl(e >= 240 ? e - 240 : e + 120, r, i),
      Yl(e, r, i),
      Yl(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Dt(sc(this.h), so(this.s), so(this.l), Ho(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ho(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${sc(this.h)}, ${so(this.s) * 100}%, ${so(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function sc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function so(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Yl(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const nh = (e) => () => e;
function W1(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function q1(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function Y1(e) {
  return (e = +e) == 1 ? ih : function(t, n) {
    return n - t ? q1(t, n, e) : nh(isNaN(t) ? n : t);
  };
}
function ih(e, t) {
  var n = t - e;
  return n ? W1(e, n) : nh(isNaN(e) ? t : e);
}
const ac = function e(t) {
  var n = Y1(t);
  function i(r, o) {
    var l = n((r = ks(r)).r, (o = ks(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = ih(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function Bn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Es = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Kl = new RegExp(Es.source, "g");
function K1(e) {
  return function() {
    return e;
  };
}
function X1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Z1(e, t) {
  var n = Es.lastIndex = Kl.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = Es.exec(e)) && (r = Kl.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: Bn(i, r) })), n = Kl.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? X1(a[0].x) : K1(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c) s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
var uc = 180 / Math.PI, Vs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function rh(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * uc,
    skewX: Math.atan(a) * uc,
    scaleX: l,
    scaleY: s
  };
}
var ao;
function J1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Vs : rh(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Q1(e) {
  return e == null || (ao || (ao = document.createElementNS("http://www.w3.org/2000/svg", "g")), ao.setAttribute("transform", e), !(e = ao.transform.baseVal.consolidate())) ? Vs : (e = e.matrix, rh(e.a, e.b, e.c, e.d, e.e, e.f));
}
function oh(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: Bn(u, d) }, { i: m - 2, x: Bn(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function l(u, c, d, f) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), f.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: Bn(u, c) })) : c && d.push(r(d) + "rotate(" + c + i);
  }
  function s(u, c, d, f) {
    u !== c ? f.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: Bn(u, c) }) : c && d.push(r(d) + "skewX(" + c + i);
  }
  function a(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: Bn(u, d) }, { i: m - 2, x: Bn(c, f) });
    } else (d !== 1 || f !== 1) && h.push(r(h) + "scale(" + d + "," + f + ")");
  }
  return function(u, c) {
    var d = [], f = [];
    return u = e(u), c = e(c), o(u.translateX, u.translateY, c.translateX, c.translateY, d, f), l(u.rotate, c.rotate, d, f), s(u.skewX, c.skewX, d, f), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, d, f), u = c = null, function(h) {
      for (var v = -1, m = f.length, y; ++v < m; ) d[(y = f[v]).i] = y.x(h);
      return d.join("");
    };
  };
}
var ep = oh(J1, "px, ", "px)", "deg)"), tp = oh(Q1, ", ", ")", ")"), np = 1e-12;
function cc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ip(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function rp(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const op = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, m = h * h + v * v, y, g;
    if (m < np)
      g = Math.log(f / u) / t, y = function(C) {
        return [
          s + C * h,
          a + C * v,
          u * Math.exp(t * C * g)
        ];
      };
    else {
      var w = Math.sqrt(m), _ = (f * f - u * u + i * m) / (2 * u * n * w), b = (f * f - u * u - i * m) / (2 * f * n * w), x = Math.log(Math.sqrt(_ * _ + 1) - _), E = Math.log(Math.sqrt(b * b + 1) - b);
      g = (E - x) / t, y = function(C) {
        var P = C * g, $ = cc(x), R = u / (n * w) * ($ * rp(t * P + x) - ip(x));
        return [
          s + R * h,
          a + R * v,
          u * $ / cc(t * P + x)
        ];
      };
    }
    return y.duration = g * 1e3 * t / Math.SQRT2, y;
  }
  return r.rho = function(o) {
    var l = Math.max(1e-3, +o), s = l * l, a = s * s;
    return e(l, s, a);
  }, r;
}(Math.SQRT2, 2, 4);
var Hi = 0, or = 0, Qi = 0, lh = 1e3, zo, lr, jo = 0, vi = 0, wl = 0, kr = typeof performance == "object" && performance.now ? performance : Date, sh = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Va() {
  return vi || (sh(lp), vi = kr.now() + wl);
}
function lp() {
  vi = 0;
}
function Go() {
  this._call = this._time = this._next = null;
}
Go.prototype = La.prototype = {
  constructor: Go,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Va() : +n) + (t == null ? 0 : +t), !this._next && lr !== this && (lr ? lr._next = this : zo = this, lr = this), this._call = e, this._time = n, Ls();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ls());
  }
};
function La(e, t, n) {
  var i = new Go();
  return i.restart(e, t, n), i;
}
function sp() {
  Va(), ++Hi;
  for (var e = zo, t; e; )
    (t = vi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Hi;
}
function fc() {
  vi = (jo = kr.now()) + wl, Hi = or = 0;
  try {
    sp();
  } finally {
    Hi = 0, up(), vi = 0;
  }
}
function ap() {
  var e = kr.now(), t = e - jo;
  t > lh && (wl -= t, jo = e);
}
function up() {
  for (var e, t = zo, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : zo = n);
  lr = e, Ls(i);
}
function Ls(e) {
  if (!Hi) {
    or && (or = clearTimeout(or));
    var t = e - vi;
    t > 24 ? (e < 1 / 0 && (or = setTimeout(fc, e - kr.now() - wl)), Qi && (Qi = clearInterval(Qi))) : (Qi || (jo = kr.now(), Qi = setInterval(ap, lh)), Hi = 1, sh(fc));
  }
}
function dc(e, t, n) {
  var i = new Go();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var cp = Br("start", "end", "cancel", "interrupt"), fp = [], ah = 0, hc = 1, Is = 2, So = 3, vc = 4, Ps = 5, Co = 6;
function xl(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  dp(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: cp,
    tween: fp,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ah
  });
}
function Ia(e, t) {
  var n = Kt(e, t);
  if (n.state > ah) throw new Error("too late; already scheduled");
  return n;
}
function dn(e, t) {
  var n = Kt(e, t);
  if (n.state > So) throw new Error("too late; already running");
  return n;
}
function Kt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function dp(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = La(o, 0, n.time);
  function o(u) {
    n.state = hc, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== hc) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === So) return dc(l);
        h.state === vc ? (h.state = Co, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = Co, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (dc(function() {
      n.state === So && (n.state = vc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = Is, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Is) {
      for (n.state = So, r = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = h);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = Ps, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(e, c);
    n.state === Ps && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Co, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function ko(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > Is && i.state < Ps, i.state = Co, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function hp(e) {
  return this.each(function() {
    ko(this, e);
  });
}
function vp(e, t) {
  var n, i;
  return function() {
    var r = dn(this, e), o = r.tween;
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
function mp(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = dn(this, e), l = o.tween;
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
function gp(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Kt(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? vp : mp)(n, e, t));
}
function Pa(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = dn(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return Kt(r, i).value[t];
  };
}
function uh(e, t) {
  var n;
  return (typeof t == "number" ? Bn : t instanceof Cr ? ac : (n = Cr(t)) ? (t = n, ac) : Z1)(e, t);
}
function yp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function bp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function wp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function xp(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function _p(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function Sp(e, t) {
  var n = bl(e), i = n === "transform" ? tp : uh;
  return this.attrTween(e, typeof t == "function" ? (n.local ? _p : xp)(n, i, Pa(this, "attr." + e, t)) : t == null ? (n.local ? pp : yp)(n) : (n.local ? wp : bp)(n, i, t));
}
function Cp(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function kp(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Ep(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && kp(e, o)), n;
  }
  return r._value = t, r;
}
function Vp(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Cp(e, o)), n;
  }
  return r._value = t, r;
}
function Lp(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = bl(e);
  return this.tween(n, (i.local ? Ep : Vp)(i, t));
}
function Ip(e, t) {
  return function() {
    Ia(this, e).delay = +t.apply(this, arguments);
  };
}
function Pp(e, t) {
  return t = +t, function() {
    Ia(this, e).delay = t;
  };
}
function Tp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ip : Pp)(t, e)) : Kt(this.node(), t).delay;
}
function Mp(e, t) {
  return function() {
    dn(this, e).duration = +t.apply(this, arguments);
  };
}
function Ap(e, t) {
  return t = +t, function() {
    dn(this, e).duration = t;
  };
}
function $p(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Mp : Ap)(t, e)) : Kt(this.node(), t).duration;
}
function Np(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    dn(this, e).ease = t;
  };
}
function Rp(e) {
  var t = this._id;
  return arguments.length ? this.each(Np(t, e)) : Kt(this.node(), t).ease;
}
function Op(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    dn(this, e).ease = n;
  };
}
function Bp(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Op(this._id, e));
}
function Fp(e) {
  typeof e != "function" && (e = Hd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Sn(i, this._parents, this._name, this._id);
}
function Dp(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < i; ++s)
    l[s] = t[s];
  return new Sn(l, this._parents, this._name, this._id);
}
function Hp(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function zp(e, t, n) {
  var i, r, o = Hp(t) ? Ia : dn;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function jp(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Kt(this.node(), n).on.on(e) : this.each(zp(n, e, t));
}
function Gp(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Up() {
  return this.on("end.remove", Gp(this._id));
}
function Wp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ca(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, xl(u[f], t, n, f, u, Kt(c, n)));
  return new Sn(o, this._parents, t, n);
}
function qp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Dd(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = Kt(c, n), m = 0, y = f.length; m < y; ++m)
          (h = f[m]) && xl(h, t, n, m, f, v);
        o.push(f), l.push(c);
      }
  return new Sn(o, l, t, n);
}
var Yp = Fr.prototype.constructor;
function Kp() {
  return new Yp(this._groups, this._parents);
}
function Xp(e, t) {
  var n, i, r;
  return function() {
    var o = Di(this, e), l = (this.style.removeProperty(e), Di(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function ch(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Zp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = Di(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function Jp(e, t, n) {
  var i, r, o;
  return function() {
    var l = Di(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), Di(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function Qp(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = dn(this, e), u = a.on, c = a.value[o] == null ? s || (s = ch(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function eb(e, t, n) {
  var i = (e += "") == "transform" ? ep : uh;
  return t == null ? this.styleTween(e, Xp(e, i)).on("end.style." + e, ch(e)) : typeof t == "function" ? this.styleTween(e, Jp(e, i, Pa(this, "style." + e, t))).each(Qp(this._id, e)) : this.styleTween(e, Zp(e, i, t), n).on("end.style." + e, null);
}
function tb(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function nb(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && tb(e, l, n)), i;
  }
  return o._value = t, o;
}
function ib(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, nb(e, t, n ?? ""));
}
function rb(e) {
  return function() {
    this.textContent = e;
  };
}
function ob(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function lb(e) {
  return this.tween("text", typeof e == "function" ? ob(Pa(this, "text", e)) : rb(e == null ? "" : e + ""));
}
function sb(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function ab(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && sb(r)), t;
  }
  return i._value = e, i;
}
function ub(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, ab(e));
}
function cb() {
  for (var e = this._name, t = this._id, n = fh(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = Kt(a, t);
        xl(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Sn(i, this._parents, e, n);
}
function fb() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = dn(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var db = 0;
function Sn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function fh() {
  return ++db;
}
var mn = Fr.prototype;
Sn.prototype = {
  constructor: Sn,
  select: Wp,
  selectAll: qp,
  selectChild: mn.selectChild,
  selectChildren: mn.selectChildren,
  filter: Fp,
  merge: Dp,
  selection: Kp,
  transition: cb,
  call: mn.call,
  nodes: mn.nodes,
  node: mn.node,
  size: mn.size,
  empty: mn.empty,
  each: mn.each,
  on: jp,
  attr: Sp,
  attrTween: Lp,
  style: eb,
  styleTween: ib,
  text: lb,
  textTween: ub,
  remove: Up,
  tween: gp,
  delay: Tp,
  duration: $p,
  ease: Rp,
  easeVarying: Bp,
  end: fb,
  [Symbol.iterator]: mn[Symbol.iterator]
};
function hb(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var vb = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: hb
};
function mb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function gb(e) {
  var t, n;
  e instanceof Sn ? (t = e._id, e = e._name) : (t = fh(), (n = vb).time = Va(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && xl(a, e, t, u, l, n || mb(a, t));
  return new Sn(i, this._parents, e, t);
}
Fr.prototype.interrupt = hp;
Fr.prototype.transition = gb;
const Ts = Math.PI, Ms = 2 * Ts, ei = 1e-6, yb = Ms - ei;
function dh(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function pb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return dh;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class bb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? dh : pb(t);
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
    else if (f > ei) if (!(Math.abs(d * a - u * c) > ei) || !o)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = i - l, v = r - s, m = a * a + u * u, y = h * h + v * v, g = Math.sqrt(m), w = Math.sqrt(f), _ = o * Math.tan((Ts - Math.acos((m + f - y) / (2 * g * w))) / 2), b = _ / w, x = _ / g;
      Math.abs(b - 1) > ei && this._append`L${t + b * c},${n + b * d}`, this._append`A${o},${o},0,0,${+(d * h > c * v)},${this._x1 = t + x * a},${this._y1 = n + x * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, d = 1 ^ l, f = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > ei || Math.abs(this._y1 - c) > ei) && this._append`L${u},${c}`, i && (f < 0 && (f = f % Ms + Ms), f > yb ? this._append`A${i},${i},0,1,${d},${t - s},${n - a}A${i},${i},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > ei && this._append`A${i},${i},0,${+(f >= Ts)},${d},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function wb(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return hh(this.cover(t, n), t, n, e);
}
function hh(e, t, n, i) {
  if (isNaN(t) || isNaN(n)) return e;
  var r, o = e._root, l = { data: i }, s = e._x0, a = e._y0, u = e._x1, c = e._y1, d, f, h, v, m, y, g, w;
  if (!o) return e._root = l, e;
  for (; o.length; )
    if ((m = t >= (d = (s + u) / 2)) ? s = d : u = d, (y = n >= (f = (a + c) / 2)) ? a = f : c = f, r = o, !(o = o[g = y << 1 | m])) return r[g] = l, e;
  if (h = +e._x.call(null, o.data), v = +e._y.call(null, o.data), t === h && n === v) return l.next = o, r ? r[g] = l : e._root = l, e;
  do
    r = r ? r[g] = new Array(4) : e._root = new Array(4), (m = t >= (d = (s + u) / 2)) ? s = d : u = d, (y = n >= (f = (a + c) / 2)) ? a = f : c = f;
  while ((g = y << 1 | m) === (w = (v >= f) << 1 | h >= d));
  return r[w] = o, r[g] = l, e;
}
function xb(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > d && (d = o));
  if (a > c || u > d) return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < i; ++n)
    hh(this, l[n], s[n], e[n]);
  return this;
}
function _b(e, t) {
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
function Sb() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function Cb(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function nt(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function kb(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, d = this._y1, f = [], h = this._root, v, m;
  for (h && f.push(new nt(h, r, o, c, d)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, d = t + n, n *= n); v = f.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > d || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var y = (l + a) / 2, g = (s + u) / 2;
        f.push(
          new nt(h[3], y, g, a, u),
          new nt(h[2], l, g, y, u),
          new nt(h[1], y, s, a, g),
          new nt(h[0], l, s, y, g)
        ), (m = (t >= g) << 1 | e >= y) && (v = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - m], f[f.length - 1 - m] = v);
      } else {
        var w = e - +this._x.call(null, h.data), _ = t - +this._y.call(null, h.data), b = w * w + _ * _;
        if (b < n) {
          var x = Math.sqrt(n = b);
          r = e - x, o = t - x, c = e + x, d = t + x, i = h.data;
        }
      }
  return i;
}
function Eb(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(d = +this._y.call(null, e))) return this;
  var t, n = this._root, i, r, o, l = this._x0, s = this._y0, a = this._x1, u = this._y1, c, d, f, h, v, m, y, g;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((v = c >= (f = (l + a) / 2)) ? l = f : a = f, (m = d >= (h = (s + u) / 2)) ? s = h : u = h, t = n, !(n = n[y = m << 1 | v])) return this;
    if (!n.length) break;
    (t[y + 1 & 3] || t[y + 2 & 3] || t[y + 3 & 3]) && (i = t, g = y);
  }
  for (; n.data !== e; ) if (r = n, !(n = n.next)) return this;
  return (o = n.next) && delete n.next, r ? (o ? r.next = o : delete r.next, this) : t ? (o ? t[y] = o : delete t[y], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (i ? i[g] = n : this._root = n), this) : (this._root = o, this);
}
function Vb(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Lb() {
  return this._root;
}
function Ib() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Pb(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new nt(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new nt(r, u, c, s, a)), (r = i[2]) && t.push(new nt(r, o, c, u, a)), (r = i[1]) && t.push(new nt(r, u, l, s, c)), (r = i[0]) && t.push(new nt(r, o, l, u, c));
    }
  return this;
}
function Tb(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new nt(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, d = (s + u) / 2;
      (o = r[0]) && t.push(new nt(o, l, s, c, d)), (o = r[1]) && t.push(new nt(o, c, s, a, d)), (o = r[2]) && t.push(new nt(o, l, d, c, u)), (o = r[3]) && t.push(new nt(o, c, d, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function Mb(e) {
  return e[0];
}
function Ab(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function $b(e) {
  return e[1];
}
function Nb(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ta(e, t, n) {
  var i = new Ma(t ?? Mb, n ?? $b, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Ma(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function mc(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var st = Ta.prototype = Ma.prototype;
st.copy = function() {
  var e = new Ma(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = mc(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = mc(i));
  return e;
};
st.add = wb;
st.addAll = xb;
st.cover = _b;
st.data = Sb;
st.extent = Cb;
st.find = kb;
st.remove = Eb;
st.removeAll = Vb;
st.root = Lb;
st.size = Ib;
st.visit = Pb;
st.visitAfter = Tb;
st.x = Ab;
st.y = Nb;
function rt(e) {
  return function() {
    return e;
  };
}
function Fn(e) {
  return (e() - 0.5) * 1e-6;
}
function Rb(e) {
  return e.x + e.vx;
}
function Ob(e) {
  return e.y + e.vy;
}
function Bb(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = rt(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, m, y, g = 0; g < o; ++g)
      for (d = Ta(t, Rb, Ob).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], m = n[f.index], y = m * m, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(_, b, x, E, C) {
      var P = _.data, $ = _.r, R = m + $;
      if (P) {
        if (P.index > f.index) {
          var H = h - P.x - P.vx, I = v - P.y - P.vy, N = H * H + I * I;
          N < R * R && (H === 0 && (H = Fn(i), N += H * H), I === 0 && (I = Fn(i), N += I * I), N = (R - (N = Math.sqrt(N))) / N * r, f.vx += (H *= N) * (R = ($ *= $) / (y + $)), f.vy += (I *= N) * R, P.vx -= H * (R = 1 - R), P.vy -= I * R);
        }
        return;
      }
      return b > h + R || E < h - R || x > v + R || C < v - R;
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
    return arguments.length ? (e = typeof u == "function" ? u : rt(+u), a(), l) : e;
  }, l;
}
function Fb(e) {
  return e.index;
}
function gc(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Db(e) {
  var t = Fb, n = d, i, r = rt(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(y) {
    return 1 / Math.min(s[y.source.index], s[y.target.index]);
  }
  function f(y) {
    for (var g = 0, w = e.length; g < c; ++g)
      for (var _ = 0, b, x, E, C, P, $, R; _ < w; ++_)
        b = e[_], x = b.source, E = b.target, C = E.x + E.vx - x.x - x.vx || Fn(u), P = E.y + E.vy - x.y - x.vy || Fn(u), $ = Math.sqrt(C * C + P * P), $ = ($ - o[_]) / $ * y * i[_], C *= $, P *= $, E.vx -= C * (R = a[_]), E.vy -= P * R, x.vx += C * (R = 1 - R), x.vy += P * R;
  }
  function h() {
    if (l) {
      var y, g = l.length, w = e.length, _ = new Map(l.map((x, E) => [t(x, E, l), x])), b;
      for (y = 0, s = new Array(g); y < w; ++y)
        b = e[y], b.index = y, typeof b.source != "object" && (b.source = gc(_, b.source)), typeof b.target != "object" && (b.target = gc(_, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
      for (y = 0, a = new Array(w); y < w; ++y)
        b = e[y], a[y] = s[b.source.index] / (s[b.source.index] + s[b.target.index]);
      i = new Array(w), v(), o = new Array(w), m();
    }
  }
  function v() {
    if (l)
      for (var y = 0, g = e.length; y < g; ++y)
        i[y] = +n(e[y], y, e);
  }
  function m() {
    if (l)
      for (var y = 0, g = e.length; y < g; ++y)
        o[y] = +r(e[y], y, e);
  }
  return f.initialize = function(y, g) {
    l = y, u = g, h();
  }, f.links = function(y) {
    return arguments.length ? (e = y, h(), f) : e;
  }, f.id = function(y) {
    return arguments.length ? (t = y, f) : t;
  }, f.iterations = function(y) {
    return arguments.length ? (c = +y, f) : c;
  }, f.strength = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : rt(+y), v(), f) : n;
  }, f.distance = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : rt(+y), m(), f) : r;
  }, f;
}
const Hb = 1664525, zb = 1013904223, yc = 4294967296;
function jb() {
  let e = 1;
  return () => (e = (Hb * e + zb) % yc) / yc;
}
function Gb(e) {
  return e.x;
}
function Ub(e) {
  return e.y;
}
var Wb = 10, qb = Math.PI * (3 - Math.sqrt(5));
function Yb(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = La(d), u = Br("tick", "end"), c = jb();
  e == null && (e = []);
  function d() {
    f(), u.call("tick", t), n < i && (a.stop(), u.call("end", t));
  }
  function f(m) {
    var y, g = e.length, w;
    m === void 0 && (m = 1);
    for (var _ = 0; _ < m; ++_)
      for (n += (o - n) * r, s.forEach(function(b) {
        b(n);
      }), y = 0; y < g; ++y)
        w = e[y], w.fx == null ? w.x += w.vx *= l : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= l : (w.y = w.fy, w.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, y = e.length, g; m < y; ++m) {
      if (g = e[m], g.index = m, g.fx != null && (g.x = g.fx), g.fy != null && (g.y = g.fy), isNaN(g.x) || isNaN(g.y)) {
        var w = Wb * Math.sqrt(0.5 + m), _ = m * qb;
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
    force: function(m, y) {
      return arguments.length > 1 ? (y == null ? s.delete(m) : s.set(m, v(y)), t) : s.get(m);
    },
    find: function(m, y, g) {
      var w = 0, _ = e.length, b, x, E, C, P;
      for (g == null ? g = 1 / 0 : g *= g, w = 0; w < _; ++w)
        C = e[w], b = m - C.x, x = y - C.y, E = b * b + x * x, E < g && (P = C, g = E);
      return P;
    },
    on: function(m, y) {
      return arguments.length > 1 ? (u.on(m, y), t) : u.on(m);
    }
  };
}
function Kb() {
  var e, t, n, i, r = rt(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, y = Ta(e, Gb, Ub).visitAfter(d);
    for (i = h, v = 0; v < m; ++v) t = e[v], y.visit(f);
  }
  function c() {
    if (e) {
      var h, v = e.length, m;
      for (o = new Array(v), h = 0; h < v; ++h) m = e[h], o[m.index] = +r(m, h, e);
    }
  }
  function d(h) {
    var v = 0, m, y, g = 0, w, _, b;
    if (h.length) {
      for (w = _ = b = 0; b < 4; ++b)
        (m = h[b]) && (y = Math.abs(m.value)) && (v += m.value, g += y, w += y * m.x, _ += y * m.y);
      h.x = w / g, h.y = _ / g;
    } else {
      m = h, m.x = m.data.x, m.y = m.data.y;
      do
        v += o[m.data.index];
      while (m = m.next);
    }
    h.value = v;
  }
  function f(h, v, m, y) {
    if (!h.value) return !0;
    var g = h.x - t.x, w = h.y - t.y, _ = y - v, b = g * g + w * w;
    if (_ * _ / a < b)
      return b < s && (g === 0 && (g = Fn(n), b += g * g), w === 0 && (w = Fn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += g * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (g === 0 && (g = Fn(n), b += g * g), w === 0 && (w = Fn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (_ = o[h.data.index] * i / b, t.vx += g * _, t.vy += w * _);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : rt(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function Xb(e) {
  var t = rt(0.1), n, i, r;
  typeof e != "function" && (e = rt(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : rt(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : rt(+s), l(), o) : e;
  }, o;
}
function Zb(e) {
  var t = rt(0.1), n, i, r;
  typeof e != "function" && (e = rt(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : rt(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : rt(+s), l(), o) : e;
  }, o;
}
function Si(e) {
  return function() {
    return e;
  };
}
function Jb(e) {
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
  }, () => new bb(t);
}
function Qb(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function vh(e) {
  this._context = e;
}
vh.prototype = {
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
function ew(e) {
  return new vh(e);
}
function tw(e) {
  return e[0];
}
function nw(e) {
  return e[1];
}
function iw(e, t) {
  var n = Si(!0), i = null, r = ew, o = null, l = Jb(s);
  e = typeof e == "function" ? e : e === void 0 ? tw : Si(e), t = typeof t == "function" ? t : t === void 0 ? nw : Si(t);
  function s(a) {
    var u, c = (a = Qb(a)).length, d, f = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(d = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+e(d, u, a), +t(d, u, a));
    if (h) return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Si(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Si(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Si(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const uo = (e) => () => e;
function rw(e, {
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
function pn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
pn.prototype = {
  constructor: pn,
  scale: function(e) {
    return e === 1 ? this : new pn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new pn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var mh = new pn(1, 0, 0);
pn.prototype;
function Xl(e) {
  e.stopImmediatePropagation();
}
function er(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ow(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function lw() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function pc() {
  return this.__zoom || mh;
}
function sw(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function aw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function uw(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function cw() {
  var e = ow, t = lw, n = uw, i = sw, r = aw, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = op, u = Br("start", "zoom", "end"), c, d, f, h = 500, v = 150, m = 0, y = 10;
  function g(S) {
    S.property("__zoom", pc).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", H).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(S, O, M, G) {
    var A = S.selection ? S.selection() : S;
    A.property("__zoom", pc), S !== A ? x(S, O, M, G) : A.interrupt().each(function() {
      E(this, arguments).event(G).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, g.scaleBy = function(S, O, M, G) {
    g.scaleTo(S, function() {
      var A = this.__zoom.k, F = typeof O == "function" ? O.apply(this, arguments) : O;
      return A * F;
    }, M, G);
  }, g.scaleTo = function(S, O, M, G) {
    g.transform(S, function() {
      var A = t.apply(this, arguments), F = this.__zoom, B = M == null ? b(A) : typeof M == "function" ? M.apply(this, arguments) : M, z = F.invert(B), Y = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(_(w(F, Y), B, z), A, l);
    }, M, G);
  }, g.translateBy = function(S, O, M, G) {
    g.transform(S, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), l);
    }, null, G);
  }, g.translateTo = function(S, O, M, G, A) {
    g.transform(S, function() {
      var F = t.apply(this, arguments), B = this.__zoom, z = G == null ? b(F) : typeof G == "function" ? G.apply(this, arguments) : G;
      return n(mh.translate(z[0], z[1]).scale(B.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), F, l);
    }, G, A);
  };
  function w(S, O) {
    return O = Math.max(o[0], Math.min(o[1], O)), O === S.k ? S : new pn(O, S.x, S.y);
  }
  function _(S, O, M) {
    var G = O[0] - M[0] * S.k, A = O[1] - M[1] * S.k;
    return G === S.x && A === S.y ? S : new pn(S.k, G, A);
  }
  function b(S) {
    return [(+S[0][0] + +S[1][0]) / 2, (+S[0][1] + +S[1][1]) / 2];
  }
  function x(S, O, M, G) {
    S.on("start.zoom", function() {
      E(this, arguments).event(G).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(G).end();
    }).tween("zoom", function() {
      var A = this, F = arguments, B = E(A, F).event(G), z = t.apply(A, F), Y = M == null ? b(z) : typeof M == "function" ? M.apply(A, F) : M, Q = Math.max(z[1][0] - z[0][0], z[1][1] - z[0][1]), ae = A.__zoom, de = typeof O == "function" ? O.apply(A, F) : O, J = a(ae.invert(Y).concat(Q / ae.k), de.invert(Y).concat(Q / de.k));
      return function(ue) {
        if (ue === 1) ue = de;
        else {
          var Ee = J(ue), je = Q / Ee[2];
          ue = new pn(je, Y[0] - Ee[0] * je, Y[1] - Ee[1] * je);
        }
        B.zoom(null, ue);
      };
    });
  }
  function E(S, O, M) {
    return !M && S.__zooming || new C(S, O);
  }
  function C(S, O) {
    this.that = S, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(S, O), this.taps = 0;
  }
  C.prototype = {
    event: function(S) {
      return S && (this.sourceEvent = S), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(S, O) {
      return this.mouse && S !== "mouse" && (this.mouse[1] = O.invert(this.mouse[0])), this.touch0 && S !== "touch" && (this.touch0[1] = O.invert(this.touch0[0])), this.touch1 && S !== "touch" && (this.touch1[1] = O.invert(this.touch1[0])), this.that.__zoom = O, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(S) {
      var O = Ft(this.that).datum();
      u.call(
        S,
        this.that,
        new rw(S, {
          sourceEvent: this.sourceEvent,
          target: g,
          type: S,
          transform: this.that.__zoom,
          dispatch: u
        }),
        O
      );
    }
  };
  function P(S, ...O) {
    if (!e.apply(this, arguments)) return;
    var M = E(this, O).event(S), G = this.__zoom, A = Math.max(o[0], Math.min(o[1], G.k * Math.pow(2, i.apply(this, arguments)))), F = It(S);
    if (M.wheel)
      (M.mouse[0][0] !== F[0] || M.mouse[0][1] !== F[1]) && (M.mouse[1] = G.invert(M.mouse[0] = F)), clearTimeout(M.wheel);
    else {
      if (G.k === A) return;
      M.mouse = [F, G.invert(F)], ko(this), M.start();
    }
    er(S), M.wheel = setTimeout(B, v), M.zoom("mouse", n(_(w(G, A), M.mouse[0], M.mouse[1]), M.extent, l));
    function B() {
      M.wheel = null, M.end();
    }
  }
  function $(S, ...O) {
    if (f || !e.apply(this, arguments)) return;
    var M = S.currentTarget, G = E(this, O, !0).event(S), A = Ft(S.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", Q, !0), F = It(S, M), B = S.clientX, z = S.clientY;
    Jd(S.view), Xl(S), G.mouse = [F, this.__zoom.invert(F)], ko(this), G.start();
    function Y(ae) {
      if (er(ae), !G.moved) {
        var de = ae.clientX - B, J = ae.clientY - z;
        G.moved = de * de + J * J > m;
      }
      G.event(ae).zoom("mouse", n(_(G.that.__zoom, G.mouse[0] = It(ae, M), G.mouse[1]), G.extent, l));
    }
    function Q(ae) {
      A.on("mousemove.zoom mouseup.zoom", null), Qd(ae.view, G.moved), er(ae), G.event(ae).end();
    }
  }
  function R(S, ...O) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, G = It(S.changedTouches ? S.changedTouches[0] : S, this), A = M.invert(G), F = M.k * (S.shiftKey ? 0.5 : 2), B = n(_(w(M, F), G, A), t.apply(this, O), l);
      er(S), s > 0 ? Ft(this).transition().duration(s).call(x, B, G, S) : Ft(this).call(g.transform, B, G, S);
    }
  }
  function H(S, ...O) {
    if (e.apply(this, arguments)) {
      var M = S.touches, G = M.length, A = E(this, O, S.changedTouches.length === G).event(S), F, B, z, Y;
      for (Xl(S), B = 0; B < G; ++B)
        z = M[B], Y = It(z, this), Y = [Y, this.__zoom.invert(Y), z.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== Y[2] && (A.touch1 = Y, A.taps = 0) : (A.touch0 = Y, F = !0, A.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (A.taps < 2 && (d = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), ko(this), A.start());
    }
  }
  function I(S, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(S), G = S.changedTouches, A = G.length, F, B, z, Y;
      for (er(S), F = 0; F < A; ++F)
        B = G[F], z = It(B, this), M.touch0 && M.touch0[2] === B.identifier ? M.touch0[0] = z : M.touch1 && M.touch1[2] === B.identifier && (M.touch1[0] = z);
      if (B = M.that.__zoom, M.touch1) {
        var Q = M.touch0[0], ae = M.touch0[1], de = M.touch1[0], J = M.touch1[1], ue = (ue = de[0] - Q[0]) * ue + (ue = de[1] - Q[1]) * ue, Ee = (Ee = J[0] - ae[0]) * Ee + (Ee = J[1] - ae[1]) * Ee;
        B = w(B, Math.sqrt(ue / Ee)), z = [(Q[0] + de[0]) / 2, (Q[1] + de[1]) / 2], Y = [(ae[0] + J[0]) / 2, (ae[1] + J[1]) / 2];
      } else if (M.touch0) z = M.touch0[0], Y = M.touch0[1];
      else return;
      M.zoom("touch", n(_(B, z, Y), M.extent, l));
    }
  }
  function N(S, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(S), G = S.changedTouches, A = G.length, F, B;
      for (Xl(S), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < A; ++F)
        B = G[F], M.touch0 && M.touch0[2] === B.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === B.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (B = It(B, this), Math.hypot(d[0] - B[0], d[1] - B[1]) < y)) {
        var z = Ft(this).on("dblclick.zoom");
        z && z.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : uo(+S), g) : i;
  }, g.filter = function(S) {
    return arguments.length ? (e = typeof S == "function" ? S : uo(!!S), g) : e;
  }, g.touchable = function(S) {
    return arguments.length ? (r = typeof S == "function" ? S : uo(!!S), g) : r;
  }, g.extent = function(S) {
    return arguments.length ? (t = typeof S == "function" ? S : uo([[+S[0][0], +S[0][1]], [+S[1][0], +S[1][1]]]), g) : t;
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
    return arguments.length ? (y = +S, g) : y;
  }, g;
}
class gh {
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
var gt = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(gt || {});
class fw {
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
    qe(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class bc {
  constructor() {
    qe(this, "nodeIdCounter", 0);
    qe(this, "nodes", []);
    qe(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new gh(
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
    const a = new fw(l, s, void 0, i, r);
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
function dw(e, t) {
  let n = cw().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return hw(n, e, t);
}
function hw(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
function vw(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function mw(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function gw(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function yw(e, t, n) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function Zl(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function tr(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function pw(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
function ii(e) {
  e.preventDefault(), e.stopPropagation();
}
function bw(e, t, n, i) {
  return A1().filter((r) => r.button === 2).on("start", (r, o) => {
    ii(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function ww(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => ii(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function xw(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function _w(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function Er(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function Sw(e, t, n) {
  if (hr(e, t, "link-arrow", "arrow", !1), hr(e, t, "link-arrow-reverse", "arrow", !0), hr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      As(e, t, i);
}
function As(e, t, n) {
  e.select("#link-arrow-" + Er(n)).empty() && (hr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), hr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function Jl(e, t) {
  e.select("#link-arrow-" + Er(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + Er(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function hr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${iw()(t.arrowPoints)}`).style("fill", o || "");
}
function Cw(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function kw(e, t, n, i, r) {
  let o = Yb(e.nodes).on("tick", () => r()).force(
    "collision",
    Bb().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Ew(e, o, n, i, t), o = ph(o, e, t, t.fixedLinkDistanceEnabled), o = yh(o, t.nodePhysicsEnabled, n, i), o;
}
function Ew(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function yh(e, t, n, i) {
  return t ? e.force("charge", Kb().strength(-500)).force("x", Xb(n / 2).strength(0.05)).force("y", Zb(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function ph(e, t, n, i) {
  return i ? e.force(
    "link",
    Db().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class Vw {
  constructor() {
    qe(this, "persistSettingsLocalStorage", !1);
    qe(this, "hasToolbar", !0);
    qe(this, "nodeRadius", 24);
    qe(this, "showNodeLabels", !0);
    qe(this, "nodePhysicsEnabled", !1);
    qe(this, "isGraphEditableInGUI", !0);
    qe(this, "zoomEnabled", !1);
    qe(this, "showLinkLabels", !0);
    qe(this, "fixedLinkDistanceEnabled", !1);
    qe(this, "markerBoxSize", 4);
    qe(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    qe(this, "markerRef", this.markerBoxSize / 2);
    qe(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    qe(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
const Lw = Object.prototype.toString;
function Uo(e) {
  const t = Lw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function Iw(e) {
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
function Pw(e) {
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
function wc(e) {
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
  var i = Pw(e), r = Iw(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const co = " ".repeat(2), bh = " ".repeat(4);
function Tw() {
  return wh(this);
}
function wh(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${co}[
${bh}${Mw(e, n, i, r)}
${co}]
${co}rows: ${e.rows}
${co}columns: ${e.columns}
}`;
}
function Mw(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push(Aw(e.get(u, d), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${bh}`);
}
function Aw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function $w(e, t) {
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
function Nt(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Rt(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function Vi(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function Li(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Nw(e, t, n) {
  return {
    row: Rw(e, t),
    column: Ow(e, n)
  };
}
function Rw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Ow(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function xc(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (fo("startRow", t), fo("endRow", n), fo("startColumn", i), fo("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function _l(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function fo(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Ci(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function Bw(e) {
  let t = _l(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function Fw(e) {
  let t = _l(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function Dw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function Hw(e) {
  let t = _l(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function zw(e) {
  let t = _l(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function jw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function Gw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function Uw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function Ww(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function qw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function Yw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function Kw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function Xw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Zw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function Jw(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Qw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function ex(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function tx(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t);
}
class Ve {
  static from1DArray(t, n, i) {
    if (t * n !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new Se(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, i[l * n + s]);
    return o;
  }
  static rowVector(t) {
    let n = new Se(1, t.length);
    for (let i = 0; i < t.length; i++)
      n.set(0, i, t[i]);
    return n;
  }
  static columnVector(t) {
    let n = new Se(t.length, 1);
    for (let i = 0; i < t.length; i++)
      n.set(i, 0, t[i]);
    return n;
  }
  static zeros(t, n) {
    return new Se(t, n);
  }
  static ones(t, n) {
    return new Se(t, n).fill(1);
  }
  static rand(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: r = Math.random } = i;
    let o = new Se(t, n);
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
    let s = o - r, a = new Se(t, n);
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
    let i = t.rows, r = t.columns, o = new Se(i, r);
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
    return Ve.isMatrix(t) ? t : new Se(t);
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
    let r = new Se(this.rows * n, this.columns * i);
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
    Nt(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return Se.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Nt(this, t), n = Vi(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    Nt(this, t), Nt(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    Rt(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return Se.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Rt(this, t), n = Li(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    Rt(this, t), Rt(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = Vi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = Vi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = Vi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = Vi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = Li(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = Li(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = Li(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = Li(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    Nt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    Rt(this, t);
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
    Ci(this);
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
    Ci(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (Nt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    Nt(this, t), Ci(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (Nt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    Nt(this, t), Ci(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if (Rt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    Rt(this, t), Ci(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if (Rt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    Rt(this, t), Ci(this);
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
    Ve.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let r = 0; r < n.length; r++)
      i += n[r] * t[r];
    return i;
  }
  mmul(t) {
    t = Se.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.columns, o = new Se(n, r), l = new Float64Array(i);
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
    t = Se.checkMatrix(t);
    let n = new Se(2, 2);
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (i + u) * (r + c), f = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, y = (s - i) * (r + l), g = (o - u) * (a + c), w = d + v - m + g, _ = h + m, b = f + v, x = d - f + h + y;
    return n.set(0, 0, w), n.set(0, 1, _), n.set(1, 0, b), n.set(1, 1, x), n;
  }
  strassen3x3(t) {
    t = Se.checkMatrix(t);
    let n = new Se(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), y = t.get(1, 1), g = t.get(1, 2), w = t.get(2, 0), _ = t.get(2, 1), b = t.get(2, 2), x = (i + r + o - l - s - c - d) * y, E = (i - l) * (-h + y), C = s * (-f + h + m - y - g - w + b), P = (-i + l + s) * (f - h + y), $ = (l + s) * (-f + h), R = i * f, H = (-i + u + c) * (f - v + g), I = (-i + u) * (v - g), N = (u + c) * (-f + v), S = (i + r + o - s - a - u - c) * g, O = c * (-f + v + m - y - g - w + _), M = (-o + c + d) * (y + w - _), G = (o - d) * (y - _), A = o * w, F = (c + d) * (-w + _), B = (-o + s + a) * (g + w - b), z = (o - a) * (g - b), Y = (s + a) * (-w + b), Q = r * m, ae = a * _, de = l * v, J = u * h, ue = d * b, Ee = R + A + Q, je = x + P + $ + R + M + A + F, at = R + H + N + S + A + B + Y, Et = E + C + P + R + A + B + z, en = E + P + $ + R + ae, V = A + B + z + Y + de, T = R + H + I + O + M + G + A, W = M + G + A + F + J, q = R + H + I + N + ue;
    return n.set(0, 0, Ee), n.set(0, 1, je), n.set(0, 2, at), n.set(1, 0, Et), n.set(1, 1, en), n.set(1, 2, V), n.set(2, 0, T), n.set(2, 1, W), n.set(2, 2, q), n;
  }
  mmulStrassen(t) {
    t = Se.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, m = d.columns;
      if (v === f && m === h)
        return d;
      {
        let y = Ve.zeros(f, h);
        return y = y.setSubMatrix(d, 0, 0), y;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let m = parseInt(d.rows / 2, 10), y = parseInt(d.columns / 2, 10), g = d.subMatrix(0, m - 1, 0, y - 1), w = f.subMatrix(0, m - 1, 0, y - 1), _ = d.subMatrix(0, m - 1, y, d.columns - 1), b = f.subMatrix(0, m - 1, y, f.columns - 1), x = d.subMatrix(m, d.rows - 1, 0, y - 1), E = f.subMatrix(m, f.rows - 1, 0, y - 1), C = d.subMatrix(m, d.rows - 1, y, d.columns - 1), P = f.subMatrix(m, f.rows - 1, y, f.columns - 1), $ = c(
        Ve.add(g, C),
        Ve.add(w, P),
        m,
        y
      ), R = c(Ve.add(x, C), w, m, y), H = c(g, Ve.sub(b, P), m, y), I = c(C, Ve.sub(E, w), m, y), N = c(Ve.add(g, _), P, m, y), S = c(
        Ve.sub(x, g),
        Ve.add(w, b),
        m,
        y
      ), O = c(
        Ve.sub(_, C),
        Ve.add(E, P),
        m,
        y
      ), M = Ve.add($, I);
      M.sub(N), M.add(O);
      let G = Ve.add(H, N), A = Ve.add(R, I), F = Ve.sub($, R);
      F.add(H), F.add(S);
      let B = Ve.zeros(2 * M.rows, 2 * M.columns);
      return B = B.setSubMatrix(M, 0, 0), B = B.setSubMatrix(G, M.rows, 0), B = B.setSubMatrix(A, 0, M.columns), B = B.setSubMatrix(F, M.rows, M.columns), B.subMatrix(0, h - 1, 0, v - 1);
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
    let r = new Se(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const l = this.getRow(o);
      l.length > 0 && wc(l, { min: n, max: i, output: l }), r.setRow(o, l);
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
    let r = new Se(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const l = this.getColumn(o);
      l.length && wc(l, {
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
    t = Se.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.rows, o = t.columns, l = new Se(n * r, i * o);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < i; a++)
        for (let u = 0; u < r; u++)
          for (let c = 0; c < o; c++)
            l.set(r * s + u, o * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = Se.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, i = t.rows, r = this.kroneckerProduct(Se.eye(i, i)), o = Se.eye(n, n).kroneckerProduct(t);
    return r.add(o);
  }
  transpose() {
    let t = new Se(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, n, this.get(n, i));
    return t;
  }
  sortRows(t = _c) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = _c) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    xc(this, t, n, i, r);
    let o = new Se(
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
    let r = new Se(t.length, i - n + 1);
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
    let r = new Se(i - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        r.set(l - n, o, this.get(l, t[o]));
      }
    return r;
  }
  setSubMatrix(t, n, i) {
    if (t = Se.checkMatrix(t), t.isEmpty())
      return this;
    let r = n + t.rows - 1, o = i + t.columns - 1;
    xc(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = Nw(this, t, n), r = new Se(t.length, n.length);
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
    let t = new Se(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(n, i, this.get(n, i));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return Bw(this);
      case "column":
        return Fw(this);
      case void 0:
        return Dw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return Hw(this);
      case "column":
        return zw(this);
      case void 0:
        return jw(this);
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
        return Gw(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return Uw(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return Ww(this, i, r);
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
        return qw(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return Yw(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return Kw(this, i), this;
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
          i = Xw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Zw(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = Jw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Qw(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = ex(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return tx(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return wh(this, t);
  }
}
Ve.prototype.klass = "Matrix";
typeof Symbol < "u" && (Ve.prototype[Symbol.for("nodejs.util.inspect.custom")] = Tw);
function _c(e, t) {
  return e - t;
}
Ve.random = Ve.rand;
Ve.randomInt = Ve.randInt;
Ve.diagonal = Ve.diag;
Ve.prototype.diagonal = Ve.prototype.diag;
Ve.identity = Ve.eye;
Ve.prototype.negate = Ve.prototype.neg;
Ve.prototype.tensorProduct = Ve.prototype.kroneckerProduct;
class Se extends Ve {
  constructor(t, n) {
    if (super(), Se.isMatrix(t))
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
    return Nt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Nt(this, t, !0), n = Float64Array.from(Vi(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    Rt(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), Rt(this, t, !0), n = Li(this, n);
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
$w(Ve, Se);
function Ql(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function es(e, t, n) {
  const i = new Se([[e.x, e.y]]), r = new Se([[t.x, t.y]]), o = Se.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = xh(10), u = Ri(s, -a).multiply(n.nodeRadius - 1).add(i), c = Se.multiply(s, -1), d = Ri(c, a).multiply(n.nodeRadius).add(r).add(Ri(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function Sc(e, t, n) {
  const i = new Se([[e.x, e.y]]), r = new Se([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = Se.subtract(i, r), l = o.divide(o.norm("frobenius")), s = xh(40), a = Ri(l, s).multiply(n.nodeRadius - 1).add(i), u = Ri(l, -s).multiply(n.nodeRadius).add(i).add(Ri(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function Cc(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function xh(e) {
  return e * (Math.PI / 180);
}
function Ri(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new Se([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
function nx(e) {
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
function ix(e) {
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
var rx = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ox(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _h = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(rx, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (M, G, A, F) => G + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], m = [], y, g, w = 0, _ = 0, b = 0, x = 0, E = 0, C = 0, P = 0, $ = 0, R = 0, H = 0, I = 0, N = 0, S = 0, O = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(M) {
          return M !== "";
        }), m = v, v = v.map(parseFloat), y = v.length, f === "m") {
          if (O += "M ", d === "m" ? (b += v[0], x += v[1]) : (b = v[0], x = v[1]), w = b, _ = x, O += b + " " + x + " ", y > 2)
            for (g = 0; g < y; g += 2)
              d === "m" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), O += "L " + b + " " + x + " ";
        } else if (f === "l")
          for (g = 0; g < y; g += 2)
            d === "l" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), O += "L " + b + " " + x + " ";
        else if (f === "h")
          for (g = 0; g < y; g++)
            d === "h" ? b += v[g] : b = v[g], O += "L " + b + " " + x + " ";
        else if (f === "v")
          for (g = 0; g < y; g++)
            d === "v" ? x += v[g] : x = v[g], O += "L " + b + " " + x + " ";
        else if (f === "q")
          for (g = 0; g < y; g += 4)
            d === "q" ? (E = b + v[g], C = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (E = v[g], C = v[g + 1], b = v[g + 2], x = v[g + 3]), O += "Q " + E + " " + C + " " + b + " " + x + " ";
        else if (f === "t")
          for (g = 0; g < y; g += 2)
            ["t", "q"].indexOf(h) > -1 ? (E = b + (b - E), C = x + (x - C)) : (E = b, C = x), d === "t" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), O += "Q " + E + " " + C + " " + b + " " + x + " ", h = f;
        else if (f === "c")
          for (g = 0; g < y; g += 6)
            d === "c" ? (E = b + v[g], C = x + v[g + 1], P = b + v[g + 2], $ = x + v[g + 3], b += v[g + 4], x += v[g + 5]) : (E = v[g], C = v[g + 1], P = v[g + 2], $ = v[g + 3], b = v[g + 4], x = v[g + 5]), O += "C " + E + " " + C + " " + P + " " + $ + " " + b + " " + x + " ";
        else if (f === "s")
          for (g = 0; g < y; g += 4)
            E = b, C = x, ["s", "c"].indexOf(h) > -1 && (E += b - P, C += x - $), d === "s" ? (P = b + v[g], $ = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (P = v[g], $ = v[g + 1], b = v[g + 2], x = v[g + 3]), O += "C " + E + " " + C + " " + P + " " + $ + " " + b + " " + x + " ";
        else if (f === "a")
          for (g = 0; g < y; g += 7) {
            R = v[g], H = v[g + 1], I = v[g + 2], N = m[g + 3];
            let M = !1;
            if (N.length > 1) {
              let G = parseInt(N[0]), A = parseInt(N[1]), F;
              N.length > 2 && (F = parseFloat(N.substring(2))), v[g + 3] = G, v.splice(g + 4, 0, A), m.splice(g + 4, 0, "+"), F !== void 0 && v.splice(g + 5, 0, F), M = !0;
            }
            N = v[g + 3], S = M ? v[g + 4] : m[g + 4], !M && S.length > 1 && (v[g + 4] = parseInt(S[0]), v.splice(g + 5, 0, parseFloat(S.substring(1)))), S = v[g + 4], d === "a" ? (b += v[g + 5], x += v[g + 6]) : (b = v[g + 5], x = v[g + 6]), O += "A " + R + " " + H + " " + I + " " + N + " " + S + " " + b + " " + x + " ";
          }
        else f === "z" && (O += "Z ", b = w, x = _);
        h = f;
      }
      return O.trim();
    }
    function i(l) {
      var s = l.trim().split(" "), a, u = s.length, c = u - 1, d, f = [], h, v, m, y, g, w = new RegExp("[QAZLCM]", ""), _ = s.slice(-1)[0].toUpperCase() === "Z";
      for (d = 0; d < u; d++)
        if (a = s[d], w.test(a)) {
          if (a === "A") {
            f.push(s[d + 5] === "0" ? "1" : "0"), f.push(s[d + 4]), f.push(s[d + 3]), f.push(s[d + 2]), f.push(s[d + 1]), f.push(a), f.push(s[d + 7]), f.push(s[d + 6]), d += 7;
            continue;
          } else if (a === "C")
            y = 3, g = 2;
          else if (a === "Q")
            y = 2, g = 1;
          else if (a === "L")
            y = 1, g = 1;
          else if (a === "M")
            y = 1, g = 0;
          else
            continue;
          for (y === g && f.push(a), m = 0; m < y; m++)
            m === g && f.push(a), h = s[++d], v = s[++d], f.push(v), f.push(h);
        } else {
          var b = s.slice(Math.max(d - 3, 0), 3).join(" ");
          throw post = s.slice(d + 1, Math.min(d + 4, c)).join(" "), range = b + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + d + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      f.push("M");
      var x = "", E = f.length - 1, C;
      for (C = E; C > 0; C--)
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
})(_h);
var lx = _h.exports;
const kc = /* @__PURE__ */ ox(lx), Te = typeof window < "u", Aa = Te && "IntersectionObserver" in window, sx = Te && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Ec = Te && "EyeDropper" in window;
function Sh(e, t, n) {
  const i = t.length - 1;
  if (i < 0) return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function bi(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => bi(e[i], t[i]));
}
function $s(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Sh(e, t.split("."), n));
}
function yn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return $s(e, t, n);
  if (Array.isArray(t)) return Sh(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function $a(e) {
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
function Wo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Vr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Vc = Object.freeze({
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
}), ax = Object.freeze({
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
function Ch(e) {
  return Object.keys(e);
}
function li(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function kh(e, t) {
  const n = {}, i = new Set(Object.keys(e));
  for (const r of t)
    i.has(r) && (n[r] = e[r]);
  return n;
}
function Lc(e, t, n) {
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
const Eh = /^on[^a-z]/, Na = (e) => Eh.test(e), ux = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Hr(e) {
  const [t, n] = Lc(e, [Eh]), i = Xt(t, ux), [r, o] = Lc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function an(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function cx(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), Ht(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function wt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ic(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function Pc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Tc(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function fx(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function Mc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let i = -1;
  for (; Math.abs(e) >= t && i < n.length - 1; )
    e /= t, ++i;
  return `${e.toFixed(1)} ${n[i]}B`;
}
function xt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (Wo(o) && Wo(l)) {
      i[r] = xt(o, l, n);
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
function Vh(e) {
  return e.map((t) => t.type === ke ? Vh(t.children) : t).flat();
}
function fi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (fi.cache.has(e)) return fi.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return fi.cache.set(e, t), t;
}
fi.cache = /* @__PURE__ */ new Map();
function Eo(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Eo(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Eo(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Eo(e, t.component.subTree).flat(1);
  }
  return [];
}
function dx(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function Ra(e) {
  const t = Ut({}), n = k(e);
  return un(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), ha(t);
}
function qo(e, t) {
  return e.includes(t);
}
function Lh(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const jt = () => [Function, Array];
function Ac(e, t) {
  return t = "on" + kn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Ih(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Lr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Ph(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function Yo(e, t) {
  var i, r, o, l;
  const n = Lr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Ph(n, t);
    s ? s.focus() : Yo(e, t === "next" ? "first" : "last");
  }
}
function Ko(e, t) {
  if (!(Te && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Th(e) {
  return e.some((t) => No(t) ? t.type === At ? !1 : t.type !== ke || Th(t.children) : !0) ? e : null;
}
function hx(e, t) {
  if (!Te || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function vx(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Mh = ["top", "bottom"], mx = ["start", "end", "left", "right"];
function Ns(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = qo(Mh, n) ? "start" : qo(mx, n) ? "top" : "center"), {
    side: $c(n, t),
    align: $c(i, t)
  };
}
function $c(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function ts(e) {
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
function ns(e) {
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
function Nc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Rc(e) {
  return qo(Mh, e.side) ? "y" : "x";
}
class di {
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
function Oc(e, t) {
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
function Ah(e) {
  return Array.isArray(e) ? new di({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Oa(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new di(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), d = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new di({
      x: c,
      y: d,
      width: f,
      height: h
    });
  } else
    return new di(t);
}
function si(e, t, n) {
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
const Vo = /* @__PURE__ */ new WeakMap();
function gx(e, t) {
  Object.keys(t).forEach((n) => {
    if (Na(n)) {
      const i = Lh(n), r = Vo.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), Vo.has(e) || Vo.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function yx(e, t) {
  Object.keys(t).forEach((n) => {
    if (Na(n)) {
      const i = Lh(n), r = Vo.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const ki = 2.4, Bc = 0.2126729, Fc = 0.7151522, Dc = 0.072175, px = 0.55, bx = 0.58, wx = 0.57, xx = 0.62, ho = 0.03, Hc = 1.45, _x = 5e-4, Sx = 1.25, Cx = 1.25, zc = 0.078, jc = 12.82051282051282, vo = 0.06, Gc = 1e-3;
function Uc(e, t) {
  const n = (e.r / 255) ** ki, i = (e.g / 255) ** ki, r = (e.b / 255) ** ki, o = (t.r / 255) ** ki, l = (t.g / 255) ** ki, s = (t.b / 255) ** ki;
  let a = n * Bc + i * Fc + r * Dc, u = o * Bc + l * Fc + s * Dc;
  if (a <= ho && (a += (ho - a) ** Hc), u <= ho && (u += (ho - u) ** Hc), Math.abs(u - a) < _x) return 0;
  let c;
  if (u > a) {
    const d = (u ** px - a ** bx) * Sx;
    c = d < Gc ? 0 : d < zc ? d - d * jc * vo : d - vo;
  } else {
    const d = (u ** xx - a ** wx) * Cx;
    c = d > -Gc ? 0 : d > -zc ? d - d * jc * vo : d + vo;
  }
  return c * 100;
}
function kx(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const Xo = 0.20689655172413793, Ex = (e) => e > Xo ** 3 ? Math.cbrt(e) : e / (3 * Xo ** 2) + 4 / 29, Vx = (e) => e > Xo ? e ** 3 : 3 * Xo ** 2 * (e - 4 / 29);
function $h(e) {
  const t = Ex, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Nh(e) {
  const t = Vx, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Lx = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Ix = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Px = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Tx = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Rh(e) {
  const t = Array(3), n = Ix, i = Lx;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(wt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ba(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Tx, l = Px;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function Rs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Mx(e) {
  return Rs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Wc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Ax = {
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
  hsl: (e, t, n, i) => qc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => qc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsv: (e, t, n, i) => Cn({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => Cn({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Tt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Wc.test(e)) {
    const {
      groups: t
    } = e.match(Wc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Ax[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Hh(t);
  } else if (typeof e == "object") {
    if (li(e, ["r", "g", "b"]))
      return e;
    if (li(e, ["h", "s", "l"]))
      return Cn(Fa(e));
    if (li(e, ["h", "s", "v"]))
      return Cn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Cn(e) {
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
function qc(e) {
  return Cn(Fa(e));
}
function Sl(e) {
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
function Oh(e) {
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
function Fa(e) {
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
function Bh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function Fh(e) {
  return Bh(Cn(e));
}
function mo(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Dh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[mo(t), mo(n), mo(i), r !== void 0 ? mo(Math.round(r * 255)) : ""].join("")}`;
}
function Hh(e) {
  e = $x(e);
  let [t, n, i, r] = fx(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function zh(e) {
  const t = Hh(e);
  return Sl(t);
}
function jh(e) {
  return Dh(Cn(e));
}
function $x(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Pc(Pc(e, 6), 8, "F")), e;
}
function Nx(e, t) {
  const n = $h(Ba(e));
  return n[0] = n[0] + t * 10, Rh(Nh(n));
}
function Rx(e, t) {
  const n = $h(Ba(e));
  return n[0] = n[0] - t * 10, Rh(Nh(n));
}
function Os(e) {
  const t = Tt(e);
  return Ba(t)[1];
}
function Ox(e, t) {
  const n = Os(e), i = Os(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function Gh(e) {
  const t = Math.abs(Uc(Tt(0), Tt(e)));
  return Math.abs(Uc(Tt(16777215), Tt(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
const xe = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), zi = Symbol.for("vuetify:defaults");
function Bx(e) {
  return ie(e);
}
function Da() {
  const e = Ne(zi);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function hn(e, t) {
  const n = Da(), i = ie(e), r = k(() => {
    if (Ht(t == null ? void 0 : t.disabled)) return n.value;
    const l = Ht(t == null ? void 0 : t.scoped), s = Ht(t == null ? void 0 : t.reset), a = Ht(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = xt(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = xt(xt(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? xt(u.prev, u) : u;
  });
  return et(zi, r), r;
}
function Fx(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[fi(t)]) < "u";
}
function Dx() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Da();
  const i = Ze("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = k(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var d, f, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(d = r.value) == null ? void 0 : d[u], c].filter((m) => m != null) : typeof u == "string" && !Fx(i.vnode, u) ? ((f = r.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = ye();
  un(() => {
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
    const a = Gx(zi, i);
    et(zi, k(() => l.value ? xt((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function Zt(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return kh(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = Da();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = Dx(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function ce() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Zt : Ui)(t);
}
function Wi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return ce()({
    name: n ?? kn(ot(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...xe()
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => {
        var l;
        return Gn(i.tag, {
          class: [e, i.class],
          style: i.style
        }, (l = o.default) == null ? void 0 : l.call(o));
      };
    }
  });
}
function Uh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Ir = "cubic-bezier(0.4, 0, 0.2, 1)", Hx = "cubic-bezier(0.0, 0, 0.2, 1)", zx = "cubic-bezier(0.4, 0, 1, 1)";
function Ze(e, t) {
  const n = _a();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function vn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Ze(e).type;
  return fi((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Wh = 0, Lo = /* @__PURE__ */ new WeakMap();
function Ct() {
  const e = Ze("getUid");
  if (Lo.has(e)) return Lo.get(e);
  {
    const t = Wh++;
    return Lo.set(e, t), t;
  }
}
Ct.reset = () => {
  Wh = 0, Lo = /* @__PURE__ */ new WeakMap();
};
function qh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? jx(e) : Ha(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function Zo(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Ha(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Ha(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function jx(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Gx(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ze("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function Ux(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function he(e) {
  const t = Ze("useRender");
  t.render = e;
}
const wi = Z({
  border: [Boolean, Number, String]
}, "border");
function xi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return {
    borderClasses: k(() => {
      const i = Re(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const Wx = [null, "default", "comfortable", "compact"], $t = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => Wx.includes(e)
  }
}, "density");
function Jt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return {
    densityClasses: k(() => `${t}--density-${e.density}`)
  };
}
const Vn = Z({
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
function Ln(e) {
  return {
    elevationClasses: k(() => {
      const n = Re(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const ht = Z({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function vt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return {
    roundedClasses: k(() => {
      const i = Re(e) ? e.value : e.rounded, r = Re(e) ? e.value : e.tile, o = [];
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
const Oe = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Jo = Symbol.for("vuetify:theme"), ze = Z({
  theme: String
}, "theme");
function Yc() {
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
function qx() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Yc();
  const t = Yc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [o, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || o === "dark" ? (i = t.themes) == null ? void 0 : i.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = xt(s, l);
  }
  return xt(t, {
    ...e,
    themes: n
  });
}
function Yx(e) {
  const t = qx(e), n = ie(t.defaultTheme), i = ie(t.themes), r = k(() => {
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
            for (const y of ["lighten", "darken"]) {
              const g = y === "lighten" ? Nx : Rx;
              for (const w of $a(t.variations[y], 1))
                h.colors[`${v}-${y}-${w}`] = Dh(g(Tt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, y = Tt(h.colors[v]);
        h.colors[m] = Gh(y);
      }
    }
    return c;
  }), o = k(() => r.value[n.value]), l = k(() => {
    const c = [];
    o.value.dark && Jn(c, ":root", ["color-scheme: dark"]), Jn(c, ":root", Kc(o.value));
    for (const [v, m] of Object.entries(r.value))
      Jn(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Kc(m)]);
    const d = [], f = [], h = new Set(Object.values(r.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? Jn(f, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (Jn(d, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), Jn(f, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), Jn(f, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
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
        Te && pe(l, () => {
          h.patch(s);
        });
      } else
        Te ? (d.addHeadObjs(k(s)), un(() => d.updateDOM())) : d.addHeadObjs(s());
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
      Te ? pe(l, v, {
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
function Ke(e) {
  Ze("provideTheme");
  const t = Ne(Jo, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = k(() => e.theme ?? t.name.value), i = k(() => t.themes.value[n.value]), r = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return et(Jo, o), o;
}
function Jn(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Kc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Tt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Os(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Tt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function za(e) {
  return Ra(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Rs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && Mx(e.value.background)) {
          const i = Tt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = Gh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Rs(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function Gt(e, t) {
  const n = k(() => ({
    text: Re(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = za(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function St(e, t) {
  const n = k(() => ({
    background: Re(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = za(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const Kx = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function qi(e, t) {
  return p(ke, null, [e && p("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), p("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const In = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Kx.includes(e)
  }
}, "variant");
function Yi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  const n = k(() => {
    const {
      variant: o
    } = Ht(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = za(k(() => {
    const {
      variant: o,
      color: l
    } = Ht(e);
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
const Yh = Z({
  divided: Boolean,
  ...wi(),
  ...xe(),
  ...$t(),
  ...Vn(),
  ...ht(),
  ...Oe(),
  ...ze(),
  ...In()
}, "VBtnGroup"), Xc = ce()({
  name: "VBtnGroup",
  props: Yh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      densityClasses: r
    } = Jt(e), {
      borderClasses: o
    } = xi(e), {
      elevationClasses: l
    } = Ln(e), {
      roundedClasses: s
    } = vt(e);
    hn({
      VBtn: {
        height: "auto",
        color: se(e, "color"),
        density: se(e, "density"),
        flat: !0,
        variant: se(e, "variant")
      }
    }), he(() => p(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, i.value, o.value, r.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function mi(e, t) {
  let n;
  function i() {
    n = oa(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  pe(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), lt(() => {
    n == null || n.stop();
  });
}
function Pe(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const o = Ze("useProxiedModel"), l = ie(e[t] !== void 0 ? e[t] : n), s = fi(t), u = k(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = o.vnode.props) != null && d.hasOwnProperty(t) || (f = o.vnode.props) != null && f.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = o.vnode.props) != null && d.hasOwnProperty(t) && ((f = o.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  mi(() => !u.value, () => {
    pe(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = k({
    get() {
      const d = e[t];
      return i(u.value ? d : l.value);
    },
    set(d) {
      const f = r(d), h = we(u.value ? e[t] : l.value);
      h === f || i(h) === d || (l.value = f, o == null || o.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const Cl = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), kl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function El(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = Ze("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = Ct();
  et(Symbol.for(`${t.description}:id`), r);
  const o = Ne(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = se(e, "value"), s = k(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), Yt(() => {
    o.unregister(r);
  });
  const a = k(() => o.isSelected(r)), u = k(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return pe(a, (c) => {
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
function zr(e, t) {
  let n = !1;
  const i = Ut([]), r = Pe(e, "modelValue", [], (f) => f == null ? [] : Kh(i, an(f)), (f) => {
    const h = Zx(i, f);
    return e.multiple ? h : h[0];
  }), o = Ze("useGroup");
  function l(f, h) {
    const v = f, m = Symbol.for(`${t.description}:id`), g = Eo(m, o == null ? void 0 : o.vnode).indexOf(h);
    Ht(v.value) == null && (v.value = g), g > -1 ? i.splice(g, 0, v) : i.push(v);
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
  qt(() => {
    a();
  }), Yt(() => {
    n = !0;
  });
  function u(f, h) {
    const v = i.find((m) => m.id === f);
    if (!(h && (v != null && v.disabled)))
      if (e.multiple) {
        const m = r.value.slice(), y = m.findIndex((w) => w === f), g = ~y;
        if (h = h ?? !g, g && e.mandatory && m.length <= 1 || !g && e.max != null && m.length + 1 > e.max) return;
        y < 0 && h ? m.push(f) : y >= 0 && !h && m.splice(y, 1), r.value = m;
      } else {
        const m = r.value.includes(f);
        if (e.mandatory && m) return;
        r.value = h ?? !m ? [f] : [];
      }
  }
  function c(f) {
    if (e.multiple, r.value.length) {
      const h = r.value[0], v = i.findIndex((g) => g.id === h);
      let m = (v + f) % i.length, y = i[m];
      for (; y.disabled && m !== v; )
        m = (m + f) % i.length, y = i[m];
      if (y.disabled) return;
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
    disabled: se(e, "disabled"),
    prev: () => c(i.length - 1),
    next: () => c(1),
    isSelected: (f) => r.value.includes(f),
    selectedClass: k(() => e.selectedClass),
    items: k(() => i),
    getItemIndex: (f) => Xx(i, f)
  };
  return et(t, d), d;
}
function Xx(e, t) {
  const n = Kh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function Kh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => bi(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function Zx(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const Xh = Symbol.for("vuetify:v-btn-toggle"), Jx = Z({
  ...Yh(),
  ...Cl()
}, "VBtnToggle");
ce()({
  name: "VBtnToggle",
  props: Jx(),
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
    } = zr(e, Xh);
    return he(() => {
      const a = Xc.filterProps(e);
      return p(Xc, ve({
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
const Qx = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ye = ce(!1)({
  name: "VDefaultsProvider",
  props: Qx(),
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
    } = ha(e);
    return hn(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), e_ = {
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
}, t_ = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => Gn(Zh, {
    ...e,
    class: "mdi"
  })
}, Ie = [String, Function, Object, Array], Bs = Symbol.for("vuetify:icons"), Vl = Z({
  icon: {
    type: Ie
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Zc = ce()({
  name: "VComponentIcon",
  props: Vl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const i = e.icon;
      return p(e.tag, null, {
        default: () => {
          var r;
          return [e.icon ? p(i, null, null) : (r = n.default) == null ? void 0 : r.call(n)];
        }
      });
    };
  }
}), ja = Zt({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Vl(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => p(e.tag, ve(n, {
      style: null
    }), {
      default: () => [p("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((i) => Array.isArray(i) ? p("path", {
        d: i[0],
        "fill-opacity": i[1]
      }, null) : p("path", {
        d: i
      }, null)) : p("path", {
        d: e.icon
      }, null)])]
    });
  }
});
Zt({
  name: "VLigatureIcon",
  props: Vl(),
  setup(e) {
    return () => p(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Zh = Zt({
  name: "VClassIcon",
  props: Vl(),
  setup(e) {
    return () => p(e.tag, {
      class: e.icon
    }, null);
  }
});
function n_() {
  return {
    svg: {
      component: ja
    },
    class: {
      component: Zh
    }
  };
}
function i_(e) {
  const t = n_(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = t_), xt({
    defaultSet: n,
    sets: t,
    aliases: {
      ...e_,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const r_ = (e) => {
  const t = Ne(Bs);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: k(() => {
      var a;
      const i = Ht(e);
      if (!i) return {
        component: Zc
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: ja,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: Zc,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, o_ = ["x-small", "small", "default", "large", "x-large"], jr = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Gr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return Ra(() => {
    let n, i;
    return qo(o_, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: ge(e.size),
      height: ge(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const l_ = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Ie,
  ...xe(),
  ...jr(),
  ...Oe({
    tag: "i"
  }),
  ...ze()
}, "VIcon"), Be = ce()({
  name: "VIcon",
  props: l_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = ie(), {
      themeClasses: o
    } = Ke(e), {
      iconData: l
    } = r_(k(() => r.value || e.icon)), {
      sizeClasses: s
    } = Gr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Gt(se(e, "color"));
    return he(() => {
      var d, f;
      const c = (d = i.default) == null ? void 0 : d.call(i);
      return c && (r.value = (f = Vh(c).filter((h) => h.type === Rr && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), p(l.value.component, {
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
function Jh(e, t) {
  const n = ie(), i = ye(!1);
  if (Aa) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    Yt(() => {
      r.disconnect();
    }), pe(n, (o, l) => {
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
function ji(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = ie(), i = ie();
  if (Te) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    Yt(() => {
      r.disconnect();
    }), pe(n, (o, l) => {
      l && (r.unobserve(Vr(l)), i.value = void 0), o && r.observe(Vr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Nr(i)
  };
}
const s_ = Z({
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
  ...xe(),
  ...jr(),
  ...Oe({
    tag: "div"
  }),
  ...ze()
}, "VProgressCircular"), Qh = ce()({
  name: "VProgressCircular",
  props: s_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = ie(), {
      themeClasses: l
    } = Ke(e), {
      sizeClasses: s,
      sizeStyles: a
    } = Gr(e), {
      textColorClasses: u,
      textColorStyles: c
    } = Gt(se(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = Gt(se(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Jh(), {
      resizeRef: m,
      contentRect: y
    } = ji(), g = k(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = k(() => Number(e.width)), _ = k(() => a.value ? Number(e.size) : y.value ? y.value.width : Math.max(w.value, 32)), b = k(() => i / (1 - w.value / _.value) * 2), x = k(() => w.value / _.value * b.value), E = k(() => ge((100 - g.value) / 100 * r));
    return un(() => {
      h.value = o.value, m.value = o.value;
    }), he(() => p(e.tag, {
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
      default: () => [p("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${b.value} ${b.value}`
      }, [p("circle", {
        class: ["v-progress-circular__underlay", d.value],
        style: f.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": x.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), p("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": x.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": E.value
      }, null)]), n.default && p("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: g.value
      })])]
    })), {};
  }
}), Un = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Wn(e) {
  return {
    dimensionStyles: k(() => ({
      height: ge(e.height),
      maxHeight: ge(e.maxHeight),
      maxWidth: ge(e.maxWidth),
      minHeight: ge(e.minHeight),
      minWidth: ge(e.minWidth),
      width: ge(e.width)
    }))
  };
}
const a_ = {
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
}, Jc = "$vuetify.", Qc = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), ev = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(Jc))
    return Qc(i, o);
  const s = i.replace(Jc, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = $s(a, s, null);
  return c || (`${i}${e.value}`, c = $s(u, s, null)), c || (c = i), typeof c != "string" && (c = i), Qc(c, o);
};
function tv(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function is(e, t, n) {
  const i = Pe(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, pe(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function nv(e) {
  return (t) => {
    const n = is(t, "locale", e.current), i = is(t, "fallback", e.fallback), r = is(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: ev(n, i, r),
      n: tv(n, i),
      provide: nv({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function u_(e) {
  const t = ye((e == null ? void 0 : e.locale) ?? "en"), n = ye((e == null ? void 0 : e.fallback) ?? "en"), i = ie({
    en: a_,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: ev(t, n, i),
    n: tv(t, n),
    provide: nv({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const Qo = Symbol.for("vuetify:locale");
function c_(e) {
  return e.name != null;
}
function f_(e) {
  const t = e != null && e.adapter && c_(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : u_(e), n = h_(t, e);
  return {
    ...t,
    ...n
  };
}
function Ur() {
  const e = Ne(Qo);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function d_() {
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
function h_(e, t) {
  const n = ie((t == null ? void 0 : t.rtl) ?? d_()), i = k(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: k(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function Qt() {
  const e = Ne(Qo);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const ef = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Wr = Z({
  location: String
}, "location");
function qr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = Qt();
  return {
    locationStyles: k(() => {
      if (!e.location) return {};
      const {
        side: o,
        align: l
      } = Ns(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[ef[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[ef[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const v_ = Z({
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
  ...xe(),
  ...Wr({
    location: "top"
  }),
  ...ht(),
  ...Oe(),
  ...ze()
}, "VProgressLinear"), iv = ce()({
  name: "VProgressLinear",
  props: v_(),
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
    } = Qt(), {
      themeClasses: l
    } = Ke(e), {
      locationStyles: s
    } = qr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Gt(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = St(k(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = St(e, "color"), {
      roundedClasses: v
    } = vt(e), {
      intersectionRef: m,
      isIntersecting: y
    } = Jh(), g = k(() => parseInt(e.max, 10)), w = k(() => parseInt(e.height, 10)), _ = k(() => parseFloat(e.bufferValue) / g.value * 100), b = k(() => parseFloat(i.value) / g.value * 100), x = k(() => r.value !== e.reverse), E = k(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), C = k(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function P($) {
      if (!m.value) return;
      const {
        left: R,
        right: H,
        width: I
      } = m.value.getBoundingClientRect(), N = x.value ? I - $.clientX + (H - I) : $.clientX - R;
      i.value = Math.round(N / I * g.value);
    }
    return he(() => p(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && y.value,
        "v-progress-linear--reverse": x.value,
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
      default: () => [e.stream && p("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [x.value ? "left" : "right"]: ge(-w.value),
          borderTop: `${ge(w.value / 2)} dotted`,
          opacity: C.value,
          top: `calc(50% - ${ge(w.value / 4)})`,
          width: ge(100 - _.value, "%"),
          "--v-progress-linear-stream-to": ge(w.value * (x.value ? 1 : -1))
        }
      }, null), p("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: C.value,
          width: ge(e.stream ? _.value : 100, "%")
        }]
      }, null), p(_n, {
        name: E.value
      }, {
        default: () => [e.indeterminate ? p("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map(($) => p("div", {
          key: $,
          class: ["v-progress-linear__indeterminate", $, f.value],
          style: h.value
        }, null))]) : p("div", {
          class: ["v-progress-linear__determinate", f.value],
          style: [h.value, {
            width: ge(b.value, "%")
          }]
        }, null)]
      }), n.default && p("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: b.value,
        buffer: _.value
      })])]
    })), {};
  }
}), Ga = Z({
  loading: [Boolean, String]
}, "loader");
function Ll(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return {
    loaderClasses: k(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Ua(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return p("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || p(iv, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const m_ = ["static", "relative", "fixed", "absolute", "sticky"], Il = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => m_.includes(e)
    )
  }
}, "position");
function Pl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  return {
    positionClasses: k(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function g_() {
  const e = Ze("useRoute");
  return k(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function y_() {
  var e, t;
  return (t = (e = Ze("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Tl(e, t) {
  const n = yg("RouterLink"), i = k(() => !!(e.href || e.to)), r = k(() => (i == null ? void 0 : i.value) || Ac(t, "click") || Ac(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: se(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = g_();
  return {
    isLink: i,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && k(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && bi(o.route.value.query, l.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (s = o.isActive) == null ? void 0 : s.value;
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
let rs = !1;
function p_(e, t) {
  let n = !1, i, r;
  Te && (He(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      rs ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), rs = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      rs = !1;
    });
  }), lt(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function b_(e, t) {
  pe(() => {
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
const Fs = Symbol("rippleStop"), w_ = 80;
function tf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Ds(e) {
  return e.constructor.name === "TouchEvent";
}
function rv(e) {
  return e.constructor.name === "KeyboardEvent";
}
const x_ = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!rv(e)) {
    const f = t.getBoundingClientRect(), h = Ds(e) ? e.touches[e.touches.length - 1] : e;
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
}, el = {
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
    } = x_(e, t, n), d = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = d, r.style.height = d, t.appendChild(i);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), tf(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), tf(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function ov(e) {
  return typeof e > "u" || !!e;
}
function Pr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Fs])) {
    if (e[Fs] = !0, Ds(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || rv(e), n._ripple.class && (t.class = n._ripple.class), Ds(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        el.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, w_);
    } else
      el.show(e, n, t);
  }
}
function nf(e) {
  e[Fs] = !0;
}
function bt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        bt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), el.hide(t);
  }
}
function lv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Tr = !1;
function sv(e) {
  !Tr && (e.keyCode === Vc.enter || e.keyCode === Vc.space) && (Tr = !0, Pr(e));
}
function av(e) {
  Tr = !1, bt(e);
}
function uv(e) {
  Tr && (Tr = !1, bt(e));
}
function cv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = ov(i);
  if (o || el.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, Wo(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", nf, {
        passive: !0
      }), e.addEventListener("mousedown", nf);
      return;
    }
    e.addEventListener("touchstart", Pr, {
      passive: !0
    }), e.addEventListener("touchend", bt, {
      passive: !0
    }), e.addEventListener("touchmove", lv, {
      passive: !0
    }), e.addEventListener("touchcancel", bt), e.addEventListener("mousedown", Pr), e.addEventListener("mouseup", bt), e.addEventListener("mouseleave", bt), e.addEventListener("keydown", sv), e.addEventListener("keyup", av), e.addEventListener("blur", uv), e.addEventListener("dragstart", bt, {
      passive: !0
    });
  } else !o && n && fv(e);
}
function fv(e) {
  e.removeEventListener("mousedown", Pr), e.removeEventListener("touchstart", Pr), e.removeEventListener("touchend", bt), e.removeEventListener("touchmove", lv), e.removeEventListener("touchcancel", bt), e.removeEventListener("mouseup", bt), e.removeEventListener("mouseleave", bt), e.removeEventListener("keydown", sv), e.removeEventListener("keyup", av), e.removeEventListener("dragstart", bt), e.removeEventListener("blur", uv);
}
function __(e, t) {
  cv(e, t, !1);
}
function S_(e) {
  delete e._ripple, fv(e);
}
function C_(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = ov(t.oldValue);
  cv(e, t, n);
}
const _i = {
  mounted: __,
  unmounted: S_,
  updated: C_
}, dv = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: Xh
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Ie,
  appendIcon: Ie,
  block: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...wi(),
  ...xe(),
  ...$t(),
  ...Un(),
  ...Vn(),
  ...kl(),
  ...Ga(),
  ...Wr(),
  ...Il(),
  ...ht(),
  ...Ml(),
  ...jr(),
  ...Oe({
    tag: "button"
  }),
  ...ze(),
  ...In({
    variant: "elevated"
  })
}, "VBtn"), Qe = ce()({
  name: "VBtn",
  directives: {
    Ripple: _i
  },
  props: dv(),
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
    } = Ke(e), {
      borderClasses: o
    } = xi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Yi(e), {
      densityClasses: u
    } = Jt(e), {
      dimensionStyles: c
    } = Wn(e), {
      elevationClasses: d
    } = Ln(e), {
      loaderClasses: f
    } = Ll(e), {
      locationStyles: h
    } = qr(e), {
      positionClasses: v
    } = Pl(e), {
      roundedClasses: m
    } = vt(e), {
      sizeClasses: y,
      sizeStyles: g
    } = Gr(e), w = El(e, e.symbol, !1), _ = Tl(e, n), b = k(() => {
      var $;
      return e.active !== void 0 ? e.active : _.isLink.value ? ($ = _.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), x = k(() => (w == null ? void 0 : w.disabled.value) || e.disabled), E = k(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), C = k(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function P($) {
      var R;
      x.value || _.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((R = _.navigate) == null || R.call(_, $), w == null || w.toggle());
    }
    return b_(_, w == null ? void 0 : w.select), he(() => {
      var S, O;
      const $ = _.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), H = !!(e.appendIcon || i.append), I = !!(e.icon && e.icon !== !0), N = (w == null ? void 0 : w.isSelected.value) && (!_.isLink.value || ((S = _.isActive) == null ? void 0 : S.value)) || !w || ((O = _.isActive) == null ? void 0 : O.value);
      return We(p($, {
        type: $ === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": x.value,
          "v-btn--elevated": E.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, N ? l.value : void 0, u.value, d.value, f.value, v.value, m.value, y.value, a.value, e.class],
        style: [N ? s.value : void 0, c.value, h.value, g.value, e.style],
        disabled: x.value || void 0,
        href: _.href.value,
        onClick: P,
        value: C.value
      }, {
        default: () => {
          var M;
          return [qi(!0, "v-btn"), !e.icon && R && p("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? p(Ye, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : p(Be, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), p("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && I ? p(Be, {
            key: "content-icon",
            icon: e.icon
          }, null) : p(Ye, {
            key: "content-defaults",
            disabled: !I,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var G;
              return [((G = i.default) == null ? void 0 : G.call(i)) ?? e.text];
            }
          })]), !e.icon && H && p("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? p(Ye, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : p(Be, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && p("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = i.loader) == null ? void 0 : M.call(i)) ?? p(Qh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[Wt("ripple"), !x.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Al = ce()({
  name: "VCardActions",
  props: xe(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return hn({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), he(() => {
      var i;
      return p("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), sr = Wi("v-card-subtitle"), Mr = Wi("v-card-title");
function k_(e) {
  return {
    aspectStyles: k(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const hv = Z({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...xe(),
  ...Un()
}, "VResponsive"), rf = ce()({
  name: "VResponsive",
  props: hv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = k_(e), {
      dimensionStyles: r
    } = Wn(e);
    return he(() => {
      var o;
      return p("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [r.value, e.style]
      }, [p("div", {
        class: "v-responsive__sizer",
        style: i.value
      }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && p("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), Yr = Z({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), bn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? Bd : _n,
    ...a
  } = typeof i == "object" ? i : {};
  return Gn(s, ve(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function E_(e, t) {
  if (!Aa) return;
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
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? vv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function vv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const mv = {
  mounted: E_,
  unmounted: vv
}, V_ = Z({
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
  ...hv(),
  ...xe(),
  ...ht(),
  ...Yr()
}, "VImg"), gv = ce()({
  name: "VImg",
  directives: {
    intersect: mv
  },
  props: V_(),
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
    } = St(se(e, "color")), {
      roundedClasses: l
    } = vt(e), s = Ze("VImg"), a = ye(""), u = ie(), c = ye(e.eager ? "loading" : "idle"), d = ye(), f = ye(), h = k(() => e.src && typeof e.src == "object" ? {
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
    pe(() => e.src, () => {
      m(c.value !== "idle");
    }), pe(v, (I, N) => {
      !I && N && u.value && b(u.value);
    }), vl(() => m());
    function m(I) {
      if (!(e.eager && I) && !(Aa && !I && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const N = new Image();
          N.src = h.value.lazySrc, b(N, null);
        }
        h.value.src && He(() => {
          var N;
          n("loadstart", ((N = u.value) == null ? void 0 : N.currentSrc) || h.value.src), setTimeout(() => {
            var S;
            if (!s.isUnmounted)
              if ((S = u.value) != null && S.complete) {
                if (u.value.naturalWidth || g(), c.value === "error") return;
                v.value || b(u.value, null), c.value === "loading" && y();
              } else
                v.value || b(u.value), w();
          });
        });
      }
    }
    function y() {
      var I;
      s.isUnmounted || (w(), b(u.value), c.value = "loaded", n("load", ((I = u.value) == null ? void 0 : I.currentSrc) || h.value.src));
    }
    function g() {
      var I;
      s.isUnmounted || (c.value = "error", n("error", ((I = u.value) == null ? void 0 : I.currentSrc) || h.value.src));
    }
    function w() {
      const I = u.value;
      I && (a.value = I.currentSrc || I.src);
    }
    let _ = -1;
    Yt(() => {
      clearTimeout(_);
    });
    function b(I) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const S = () => {
        if (clearTimeout(_), s.isUnmounted) return;
        const {
          naturalHeight: O,
          naturalWidth: M
        } = I;
        O || M ? (d.value = M, f.value = O) : !I.complete && c.value === "loading" && N != null ? _ = window.setTimeout(S, N) : (I.currentSrc.endsWith(".svg") || I.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      S();
    }
    const x = k(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), E = () => {
      var S;
      if (!h.value.src || c.value === "idle") return null;
      const I = p("img", {
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
        onLoad: y,
        onError: g
      }, null), N = (S = i.sources) == null ? void 0 : S.call(i);
      return p(bn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [We(N ? p("picture", {
          class: "v-img__picture"
        }, [N, I]) : I, [[fn, c.value === "loaded"]])]
      });
    }, C = () => p(bn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && p("img", {
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
    }), P = () => i.placeholder ? p(bn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && p("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? p(bn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && p("div", {
        class: "v-img__error"
      }, [i.error()])]
    }) : null, R = () => e.gradient ? p("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, H = ye(!1);
    {
      const I = pe(v, (N) => {
        N && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            H.value = !0;
          });
        }), I());
      });
    }
    return he(() => {
      const I = rf.filterProps(e);
      return We(p(rf, ve({
        class: ["v-img", {
          "v-img--booting": !H.value
        }, r.value, l.value, e.class],
        style: [{
          width: ge(e.width === "auto" ? d.value : e.width)
        }, o.value, e.style]
      }, I, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => p(ke, null, [p(E, null, null), p(C, null, null), p(R, null, null), p(P, null, null), p($, null, null)]),
        default: i.default
      }), [[Wt("intersect"), {
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
}), L_ = Z({
  start: Boolean,
  end: Boolean,
  icon: Ie,
  image: String,
  text: String,
  ...xe(),
  ...$t(),
  ...ht(),
  ...jr(),
  ...Oe(),
  ...ze(),
  ...In({
    variant: "flat"
  })
}, "VAvatar"), gi = ce()({
  name: "VAvatar",
  props: L_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = Yi(e), {
      densityClasses: s
    } = Jt(e), {
      roundedClasses: a
    } = vt(e), {
      sizeClasses: u,
      sizeStyles: c
    } = Gr(e);
    return he(() => p(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? p(Ye, {
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
      }) : e.image ? p(gv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? p(Be, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, qi(!1, "v-avatar")]
    })), {};
  }
}), I_ = Z({
  appendAvatar: String,
  appendIcon: Ie,
  prependAvatar: String,
  prependIcon: Ie,
  subtitle: [String, Number],
  title: [String, Number],
  ...xe(),
  ...$t()
}, "VCardItem"), P_ = ce()({
  name: "VCardItem",
  props: I_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => {
      var u;
      const i = !!(e.prependAvatar || e.prependIcon), r = !!(i || n.prepend), o = !!(e.appendAvatar || e.appendIcon), l = !!(o || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return p("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [r && p("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? p(Ye, {
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
      }, n.prepend) : p(ke, null, [e.prependAvatar && p(gi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && p(Be, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), p("div", {
        class: "v-card-item__content"
      }, [s && p(Mr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && p(sr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && p("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? p(Ye, {
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
      }, n.append) : p(ke, null, [e.appendIcon && p(Be, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && p(gi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), vr = Wi("v-card-text"), T_ = Z({
  appendAvatar: String,
  appendIcon: Ie,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: Ie,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...wi(),
  ...xe(),
  ...$t(),
  ...Un(),
  ...Vn(),
  ...Ga(),
  ...Wr(),
  ...Il(),
  ...ht(),
  ...Ml(),
  ...Oe(),
  ...ze(),
  ...In({
    variant: "elevated"
  })
}, "VCard"), Wa = ce()({
  name: "VCard",
  directives: {
    Ripple: _i
  },
  props: T_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = Ke(e), {
      borderClasses: o
    } = xi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Yi(e), {
      densityClasses: u
    } = Jt(e), {
      dimensionStyles: c
    } = Wn(e), {
      elevationClasses: d
    } = Ln(e), {
      loaderClasses: f
    } = Ll(e), {
      locationStyles: h
    } = qr(e), {
      positionClasses: v
    } = Pl(e), {
      roundedClasses: m
    } = vt(e), y = Tl(e, n), g = k(() => e.link !== !1 && y.isLink.value), w = k(() => !e.disabled && e.link !== !1 && (e.link || y.isClickable.value));
    return he(() => {
      const _ = g.value ? "a" : e.tag, b = !!(i.title || e.title != null), x = !!(i.subtitle || e.subtitle != null), E = b || x, C = !!(i.append || e.appendAvatar || e.appendIcon), P = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = E || P || C, H = !!(i.text || e.text != null);
      return We(p(_, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": w.value
        }, r.value, o.value, l.value, u.value, d.value, f.value, v.value, m.value, a.value, e.class],
        style: [s.value, c.value, h.value, e.style],
        href: y.href.value,
        onClick: w.value && y.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var I;
          return [$ && p("div", {
            key: "image",
            class: "v-card__image"
          }, [i.image ? p(Ye, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : p(gv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), p(Ua, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && p(P_, {
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
          }), H && p(vr, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = i.text) == null ? void 0 : N.call(i)) ?? e.text];
            }
          }), (I = i.default) == null ? void 0 : I.call(i), i.actions && p(Al, null, {
            default: i.actions
          }), qi(w.value, "v-card")];
        }
      }), [[Wt("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), M_ = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function kt(e, t, n) {
  return ce()({
    name: e,
    props: M_({
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
        const s = i.group ? Bd : _n;
        return Gn(s, {
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
function yv(e, t) {
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
      return () => Gn(_n, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function pv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = ot(`offset-${n}`);
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
const A_ = Z({
  target: [Object, Array]
}, "v-dialog-transition"), qa = ce()({
  name: "VDialogTransition",
  props: A_(),
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
        } = lf(e.target, r), d = si(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: Hx
        });
        (f = of(r)) == null || f.forEach((h) => {
          si(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Ir
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
        } = lf(e.target, r);
        si(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: zx
        }).finished.then(() => o()), (f = of(r)) == null || f.forEach((h) => {
          si(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Ir
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? p(_n, ve({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : p(_n, {
      name: "dialog-transition"
    }, n);
  }
});
function of(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function lf(e, t) {
  const n = Ah(e), i = Oa(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((g) => parseFloat(g)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let a = n.left + n.width / 2;
  l === "left" || s === "left" ? a -= n.width / 2 : (l === "right" || s === "right") && (a += n.width / 2);
  let u = n.top + n.height / 2;
  l === "top" || s === "top" ? u -= n.height / 2 : (l === "bottom" || s === "bottom") && (u += n.height / 2);
  const c = n.width / i.width, d = n.height / i.height, f = Math.max(1, c, d), h = c / f || 0, v = d / f || 0, m = i.width * i.height / (window.innerWidth * window.innerHeight), y = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
  return {
    x: a - (r + i.left),
    y: u - (o + i.top),
    sx: h,
    sy: v,
    speed: y
  };
}
kt("fab-transition", "center center", "out-in");
kt("dialog-bottom-transition");
kt("dialog-top-transition");
const sf = kt("fade-transition"), bv = kt("scale-transition");
kt("scroll-x-transition");
kt("scroll-x-reverse-transition");
kt("scroll-y-transition");
kt("scroll-y-reverse-transition");
kt("slide-x-transition");
kt("slide-x-reverse-transition");
const wv = kt("slide-y-transition");
kt("slide-y-reverse-transition");
const xv = yv("expand-transition", pv()), _v = yv("expand-x-transition", pv("", !0));
function os(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function $_(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function af(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return os({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return os({
      x: r,
      y: o
    }, t);
  }
  return os({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Sv = {
  static: O_,
  // specific viewport position, usually centered
  connected: F_
  // connected to a certain element
}, N_ = Z({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Sv
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
function R_(e, t) {
  const n = ie({}), i = ie();
  Te && mi(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    pe(() => e.locationStrategy, o), lt(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = Sv[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
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
function O_() {
}
function B_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Oa(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function F_(e, t, n) {
  (Array.isArray(e.target.value) || Ux(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = Ra(() => {
    const v = Ns(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? ts(v) : Ns(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === ns(m).align ? {
      preferredAnchor: Nc(v),
      preferredOrigin: Nc(m)
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
  pe([e.target, e.contentEl], (v, m) => {
    let [y, g] = v, [w, _] = m;
    w && !Array.isArray(w) && f.unobserve(w), y && !Array.isArray(y) && f.observe(y), _ && f.unobserve(_), g && f.observe(g);
  }, {
    immediate: !0
  }), lt(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const v = Ah(e.target.value), m = B_(e.contentEl.value, e.isRtl.value), y = Zo(e.contentEl.value), g = 12;
    y.length || (y.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = y.reduce((H, I) => {
      const N = I.getBoundingClientRect(), S = new di({
        x: I === document.documentElement ? 0 : N.x,
        y: I === document.documentElement ? 0 : N.y,
        width: I.clientWidth,
        height: I.clientHeight
      });
      return H ? new di({
        x: Math.max(H.left, S.left),
        y: Math.max(H.top, S.top),
        width: Math.min(H.right, S.right) - Math.max(H.left, S.left),
        height: Math.min(H.bottom, S.bottom) - Math.max(H.top, S.top)
      }) : S;
    }, void 0);
    w.x += g, w.y += g, w.width -= g * 2, w.height -= g * 2;
    let _ = {
      anchor: r.value,
      origin: o.value
    };
    function b(H) {
      const I = new di(m), N = af(H.anchor, v), S = af(H.origin, I);
      let {
        x: O,
        y: M
      } = $_(N, S);
      switch (H.anchor.side) {
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
      switch (H.anchor.align) {
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
      return I.x += O, I.y += M, I.width = Math.min(I.width, a.value), I.height = Math.min(I.height, u.value), {
        overflows: Oc(I, w),
        x: O,
        y: M
      };
    }
    let x = 0, E = 0;
    const C = {
      x: 0,
      y: 0
    }, P = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; !($++ > 10); ) {
      const {
        x: H,
        y: I,
        overflows: N
      } = b(_);
      x += H, E += I, m.x += H, m.y += I;
      {
        const S = Rc(_.anchor), O = N.x.before || N.x.after, M = N.y.before || N.y.after;
        let G = !1;
        if (["x", "y"].forEach((A) => {
          if (A === "x" && O && !P.x || A === "y" && M && !P.y) {
            const F = {
              anchor: {
                ..._.anchor
              },
              origin: {
                ..._.origin
              }
            }, B = A === "x" ? S === "y" ? ns : ts : S === "y" ? ts : ns;
            F.anchor = B(F.anchor), F.origin = B(F.origin);
            const {
              overflows: z
            } = b(F);
            (z[A].before <= N[A].before && z[A].after <= N[A].after || z[A].before + z[A].after < (N[A].before + N[A].after) / 2) && (_ = F, G = P[A] = !0);
          }
        }), G) continue;
      }
      N.x.before && (x += N.x.before, m.x += N.x.before), N.x.after && (x -= N.x.after, m.x -= N.x.after), N.y.before && (E += N.y.before, m.y += N.y.before), N.y.after && (E -= N.y.after, m.y -= N.y.after);
      {
        const S = Oc(m, w);
        C.x = w.width - S.x.before - S.x.after, C.y = w.height - S.y.before - S.y.after, x += S.x.before, m.x += S.x.before, E += S.y.before, m.y += S.y.before;
      }
      break;
    }
    const R = Rc(_.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
      transformOrigin: `${_.origin.side} ${_.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ge(ls(E)),
      left: e.isRtl.value ? void 0 : ge(ls(x)),
      right: e.isRtl.value ? ge(ls(-x)) : void 0,
      minWidth: ge(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: ge(uf(wt(C.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: ge(uf(wt(C.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: C,
      contentBox: m
    };
  }
  return pe(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), He(() => {
    const v = h();
    if (!v) return;
    const {
      available: m,
      contentBox: y
    } = v;
    y.height > m.y && requestAnimationFrame(() => {
      h(), requestAnimationFrame(() => {
        h();
      });
    });
  }), {
    updateLocation: h
  };
}
function ls(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function uf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Hs = !0;
const tl = [];
function D_(e) {
  !Hs || tl.length ? (tl.push(e), zs()) : (Hs = !1, e(), zs());
}
let cf = -1;
function zs() {
  cancelAnimationFrame(cf), cf = requestAnimationFrame(() => {
    const e = tl.shift();
    e && e(), tl.length ? zs() : Hs = !0;
  });
}
const Io = {
  none: null,
  close: j_,
  block: G_,
  reposition: U_
}, H_ = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Io
  }
}, "VOverlay-scroll-strategies");
function z_(e, t) {
  if (!Te) return;
  let n;
  un(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = oa(), await He(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = Io[e.scrollStrategy]) == null || i.call(Io, t, e, n);
    }));
  }), lt(() => {
    n == null || n.stop();
  });
}
function j_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Cv(e.targetEl.value ?? e.contentEl.value, t);
}
function G_(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...Zo(e.targetEl.value, t.contained ? n : void 0), ...Zo(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Ha(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", ge(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ge(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ge(r)), s.classList.add("v-overlay-scroll-blocked");
  }), lt(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function U_(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    D_(() => {
      var c, d;
      const a = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      Cv(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), lt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function Cv(e, t) {
  const n = [document, ...Zo(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), lt(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const js = Symbol.for("vuetify:v-menu"), W_ = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function q_(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = hx(s, () => {
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
const Y_ = Z({
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
  ...W_()
}, "VOverlay-activator");
function K_(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = Ze("useActivator"), o = ie();
  let l = !1, s = !1, a = !0;
  const u = k(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = k(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = q_(e, (C) => {
    C === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== C && (a = !0), n.value = C);
  }), h = ie(), v = {
    onClick: (C) => {
      C.stopPropagation(), o.value = C.currentTarget || C.target, n.value || (h.value = [C.clientX, C.clientY]), n.value = !n.value;
    },
    onMouseenter: (C) => {
      var P;
      (P = C.sourceCapabilities) != null && P.firesTouchEvents || (l = !0, o.value = C.currentTarget || C.target, d());
    },
    onMouseleave: (C) => {
      l = !1, f();
    },
    onFocus: (C) => {
      Ko(C.target, ":focus-visible") !== !1 && (s = !0, C.stopPropagation(), o.value = C.currentTarget || C.target, d());
    },
    onBlur: (C) => {
      s = !1, C.stopPropagation(), f();
    }
  }, m = k(() => {
    const C = {};
    return c.value && (C.onClick = v.onClick), e.openOnHover && (C.onMouseenter = v.onMouseenter, C.onMouseleave = v.onMouseleave), u.value && (C.onFocus = v.onFocus, C.onBlur = v.onBlur), C;
  }), y = k(() => {
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
      const P = Ne(js, null);
      C.onClick = () => {
        n.value = !1, P == null || P.closeParents();
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
  pe(i, (C) => {
    C && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), pe(n, (C) => {
    C || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = ie();
  un(() => {
    w.value && He(() => {
      o.value = Vr(w.value);
    });
  });
  const _ = ie(), b = k(() => e.target === "cursor" && h.value ? h.value : _.value ? Vr(_.value) : kv(e.target, r) || o.value), x = k(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return pe(() => !!e.activator, (C) => {
    C && Te ? (E = oa(), E.run(() => {
      X_(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), lt(() => {
    E == null || E.stop();
  }), {
    activatorEl: o,
    activatorRef: w,
    target: b,
    targetEl: x,
    targetRef: _,
    activatorEvents: m,
    contentEvents: y,
    scrimEvents: g
  };
}
function X_(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  pe(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && He(() => o());
  }, {
    immediate: !0
  }), pe(() => e.activatorProps, () => {
    o();
  }), lt(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && gx(a, ve(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && yx(a, ve(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = kv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function kv(e, t) {
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
const $l = ["sm", "md", "lg", "xl", "xxl"], Gs = Symbol.for("vuetify:display"), ff = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, Z_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ff;
  return xt(ff, e);
};
function df(e) {
  return Te && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function hf(e) {
  return Te && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function vf(e) {
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
    touch: sx,
    ssr: t === "ssr"
  };
}
function J_(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = Z_(e), r = ye(hf(t)), o = ye(vf(t)), l = Ut({}), s = ye(df(t));
  function a() {
    r.value = hf(), s.value = df();
  }
  function u() {
    a(), o.value = vf();
  }
  return un(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), m = s.value >= n.xxl, y = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", g = typeof i == "number" ? i : n[i], w = s.value < g;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = y, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Te && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...ha(l),
    update: u,
    ssr: !!t
  };
}
const Q_ = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function Ya() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
  const n = Ne(Gs);
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
function e2() {
  if (!Te) return ye(!1);
  const {
    ssr: e
  } = Ya();
  if (e) {
    const t = ye(!1);
    return qt(() => {
      t.value = !0;
    }), t;
  } else
    return ye(!0);
}
const Nl = Z({
  eager: Boolean
}, "lazy");
function Ka(e, t) {
  const n = ye(!1), i = k(() => n.value || e.eager || t.value);
  pe(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: r
  };
}
function Kr() {
  const t = Ze("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const mf = Symbol.for("vuetify:stack"), nr = Ut([]);
function t2(e, t, n) {
  const i = Ze("useStack"), r = !n, o = Ne(mf, void 0), l = Ut({
    activeChildren: /* @__PURE__ */ new Set()
  });
  et(mf, l);
  const s = ye(+t.value);
  mi(e, () => {
    var d;
    const c = (d = nr.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, r && nr.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), lt(() => {
      if (r) {
        const f = we(nr).findIndex((h) => h[0] === i.uid);
        nr.splice(f, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = ye(!0);
  r && un(() => {
    var d;
    const c = ((d = nr.at(-1)) == null ? void 0 : d[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = k(() => !l.activeChildren.size);
  return {
    globalTop: Nr(a),
    localTop: u,
    stackStyles: k(() => ({
      zIndex: s.value
    }))
  };
}
function n2(e) {
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
function i2() {
  return !0;
}
function Ev(e, t, n) {
  if (!e || Vv(e, n) === !1) return !1;
  const i = Uh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Vv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || i2)(e);
}
function r2(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Ev(e, t, n) && setTimeout(() => {
    Vv(e, n) && i && i(e);
  }, 0);
}
function gf(e, t) {
  const n = Uh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const o2 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => r2(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = Ev(r, e, t);
    };
    gf(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (gf(e, (n) => {
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
function l2(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return p(_n, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && p("div", ve({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const Xr = Z({
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
  ...Y_(),
  ...xe(),
  ...Un(),
  ...Nl(),
  ...N_(),
  ...H_(),
  ...ze(),
  ...Yr()
}, "VOverlay"), jn = ce()({
  name: "VOverlay",
  directives: {
    ClickOutside: o2
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Xr()
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
    } = n2(k(() => e.attach || e.contained)), {
      themeClasses: a
    } = Ke(e), {
      rtlClasses: u,
      isRtl: c
    } = Qt(), {
      hasContent: d,
      onAfterLeave: f
    } = Ka(e, l), h = St(k(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: y
    } = t2(l, se(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: g,
      activatorRef: w,
      target: _,
      targetEl: b,
      targetRef: x,
      activatorEvents: E,
      contentEvents: C,
      scrimEvents: P
    } = K_(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = Wn(e), R = e2(), {
      scopeId: H
    } = Kr();
    pe(() => e.disabled, (Q) => {
      Q && (l.value = !1);
    });
    const I = ie(), N = ie(), {
      contentStyles: S,
      updateLocation: O
    } = R_(e, {
      isRtl: c,
      contentEl: N,
      target: _,
      isActive: l
    });
    z_(e, {
      root: I,
      contentEl: N,
      targetEl: b,
      isActive: l,
      updateLocation: O
    });
    function M(Q) {
      r("click:outside", Q), e.persistent ? z() : l.value = !1;
    }
    function G() {
      return l.value && v.value;
    }
    Te && pe(l, (Q) => {
      Q ? window.addEventListener("keydown", A) : window.removeEventListener("keydown", A);
    }, {
      immediate: !0
    }), Yt(() => {
      Te && window.removeEventListener("keydown", A);
    });
    function A(Q) {
      var ae, de;
      Q.key === "Escape" && v.value && (e.persistent ? z() : (l.value = !1, (ae = N.value) != null && ae.contains(document.activeElement) && ((de = g.value) == null || de.focus())));
    }
    const F = y_();
    mi(() => e.closeOnBack, () => {
      p_(F, (Q) => {
        v.value && l.value ? (Q(!1), e.persistent ? z() : l.value = !1) : Q();
      });
    });
    const B = ie();
    pe(() => l.value && (e.absolute || e.contained) && s.value == null, (Q) => {
      if (Q) {
        const ae = qh(I.value);
        ae && ae !== document.scrollingElement && (B.value = ae.scrollTop);
      }
    });
    function z() {
      e.noClickAnimation || N.value && si(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Ir
      });
    }
    function Y() {
      f(), r("afterLeave");
    }
    return he(() => {
      var Q;
      return p(ke, null, [(Q = n.activator) == null ? void 0 : Q.call(n, {
        isActive: l.value,
        props: ve({
          ref: w,
          targetRef: x
        }, E.value, e.activatorProps)
      }), R.value && d.value && p(e0, {
        disabled: !s.value,
        to: s.value
      }, {
        default: () => [p("div", ve({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": l.value,
            "v-overlay--contained": e.contained
          }, a.value, u.value, e.class],
          style: [y.value, {
            "--v-overlay-opacity": e.opacity,
            top: ge(B.value)
          }, e.style],
          ref: I
        }, H, i), [p(l2, ve({
          color: h,
          modelValue: l.value && !!e.scrim
        }, P.value), null), p(bn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: _.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var ae;
            return [We(p("div", ve({
              ref: N,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, S.value]
            }, C.value, e.contentProps), [(ae = n.default) == null ? void 0 : ae.call(n, {
              isActive: l
            })]), [[fn, l.value], [Wt("click-outside"), {
              handler: M,
              closeConditional: G,
              include: () => [g.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: g,
      target: _,
      animateClick: z,
      contentEl: N,
      globalTop: v,
      localTop: m,
      updateLocation: O
    };
  }
}), ss = Symbol("Forwarded refs");
function as(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i) return i;
    n = Object.getPrototypeOf(n);
  }
}
function qn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[ss] = n, new Proxy(e, {
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
          const u = as(a.value, o) ?? ("_" in a.value ? as((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[ss];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = as(d.value, o);
            if (f) return f;
            const h = d.value && d.value[ss];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const s2 = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...Xr({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: qa
    },
    zIndex: 2400
  })
}, "VDialog"), Xa = ce()({
  name: "VDialog",
  props: s2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Kr(), o = ie();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = o.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = o.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Lr(o.value.contentEl);
        if (!h.length) return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Te && pe(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), pe(i, async (a) => {
      var u, c;
      await He(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = k(() => ve({
      "aria-haspopup": "dialog",
      "aria-expanded": String(i.value)
    }, e.activatorProps));
    return he(() => {
      const a = jn.filterProps(e);
      return p(jn, ve({
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
          return p(Ye, {
            root: "VDialog"
          }, {
            default: () => {
              var f;
              return [(f = n.default) == null ? void 0 : f.call(n, ...c)];
            }
          });
        }
      });
    }), qn({}, o);
  }
});
function yf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function pf(e) {
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
function a2(e) {
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
const u2 = Symbol.for("vuetify:v-slide-group"), Za = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: u2
  },
  nextIcon: {
    type: Ie,
    default: "$next"
  },
  prevIcon: {
    type: Ie,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...xe(),
  ...Q_(),
  ...Oe(),
  ...Cl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), nl = ce()({
  name: "VSlideGroup",
  props: Za(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = Qt(), {
      displayClasses: r,
      mobile: o
    } = Ya(e), l = zr(e, e.symbol), s = ye(!1), a = ye(0), u = ye(0), c = ye(0), d = k(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = ji(), {
      resizeRef: v,
      contentRect: m
    } = ji(), y = k(() => l.selected.value.length ? l.items.value.findIndex((z) => z.id === l.selected.value[0]) : -1), g = k(() => l.selected.value.length ? l.items.value.findIndex((z) => z.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Te) {
      let z = -1;
      pe(() => [l.selected.value, h.value, m.value, d.value], () => {
        cancelAnimationFrame(z), z = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Y = d.value ? "width" : "height";
            u.value = h.value[Y], c.value = m.value[Y], s.value = u.value + 1 < c.value;
          }
          if (y.value >= 0 && v.value) {
            const Y = v.value.children[g.value];
            y.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = a2({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: d.value
            }) : s.value && (a.value = pf({
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
    const w = ye(!1);
    let _ = 0, b = 0;
    function x(z) {
      const Y = d.value ? "clientX" : "clientY";
      b = (i.value && d.value ? -1 : 1) * a.value, _ = z.touches[0][Y], w.value = !0;
    }
    function E(z) {
      if (!s.value) return;
      const Y = d.value ? "clientX" : "clientY", Q = i.value && d.value ? -1 : 1;
      a.value = Q * (b + _ - z.touches[0][Y]);
    }
    function C(z) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function P() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = ye(!1);
    function R(z) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const Y of z.composedPath())
          for (const Q of v.value.children)
            if (Q === Y) {
              a.value = pf({
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
    function H(z) {
      $.value = !1;
    }
    function I(z) {
      var Y;
      !$.value && !(z.relatedTarget && ((Y = v.value) != null && Y.contains(z.relatedTarget))) && S();
    }
    function N(z) {
      v.value && (d.value ? z.key === "ArrowRight" ? S(i.value ? "prev" : "next") : z.key === "ArrowLeft" && S(i.value ? "next" : "prev") : z.key === "ArrowDown" ? S("next") : z.key === "ArrowUp" && S("prev"), z.key === "Home" ? S("first") : z.key === "End" && S("last"));
    }
    function S(z) {
      var Y, Q, ae, de, J;
      if (v.value)
        if (!z)
          (Y = Lr(v.value)[0]) == null || Y.focus();
        else if (z === "next") {
          const ue = (Q = v.value.querySelector(":focus")) == null ? void 0 : Q.nextElementSibling;
          ue ? ue.focus() : S("first");
        } else if (z === "prev") {
          const ue = (ae = v.value.querySelector(":focus")) == null ? void 0 : ae.previousElementSibling;
          ue ? ue.focus() : S("last");
        } else z === "first" ? (de = v.value.firstElementChild) == null || de.focus() : z === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function O(z) {
      const Y = a.value + (z === "prev" ? -1 : 1) * u.value;
      a.value = wt(Y, 0, c.value - u.value);
    }
    const M = k(() => {
      let z = a.value > c.value - u.value ? -(c.value - u.value) + yf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (z = yf(-a.value));
      const Y = i.value && d.value ? -1 : 1;
      return {
        transform: `translate${d.value ? "X" : "Y"}(${Y * z}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), G = k(() => ({
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
    }), F = k(() => Math.abs(a.value) > 0), B = k(() => c.value > Math.abs(a.value) + u.value);
    return he(() => p(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": A.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: I
    }, {
      default: () => {
        var z, Y, Q;
        return [A.value && p("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && O("prev")
        }, [((z = n.prev) == null ? void 0 : z.call(n, G.value)) ?? p(sf, null, {
          default: () => [p(Be, {
            icon: i.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), p("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: P
        }, [p("div", {
          ref: v,
          class: "v-slide-group__content",
          style: M.value,
          onTouchstartPassive: x,
          onTouchmovePassive: E,
          onTouchendPassive: C,
          onFocusin: R,
          onFocusout: H,
          onKeydown: N
        }, [(Y = n.default) == null ? void 0 : Y.call(n, G.value)])]), A.value && p("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !B.value
          }],
          onClick: () => B.value && O("next")
        }, [((Q = n.next) == null ? void 0 : Q.call(n, G.value)) ?? p(sf, null, {
          default: () => [p(Be, {
            icon: i.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: l.selected,
      scrollTo: O,
      scrollOffset: a,
      focus: S
    };
  }
}), Lv = Symbol.for("vuetify:v-chip-group"), c2 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: bi
  },
  ...Za(),
  ...xe(),
  ...Cl({
    selectedClass: "v-chip--selected"
  }),
  ...Oe(),
  ...ze(),
  ...In({
    variant: "tonal"
  })
}, "VChipGroup");
ce()({
  name: "VChipGroup",
  props: c2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = zr(e, Lv);
    return hn({
      VChip: {
        color: se(e, "color"),
        disabled: se(e, "disabled"),
        filter: se(e, "filter"),
        variant: se(e, "variant")
      }
    }), he(() => {
      const u = nl.filterProps(e);
      return p(nl, ve(u, {
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
const f2 = Z({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Ie,
  closable: Boolean,
  closeIcon: {
    type: Ie,
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
  prependIcon: Ie,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: jt(),
  onClickOnce: jt(),
  ...wi(),
  ...xe(),
  ...$t(),
  ...Vn(),
  ...kl(),
  ...ht(),
  ...Ml(),
  ...jr(),
  ...Oe({
    tag: "span"
  }),
  ...ze(),
  ...In({
    variant: "tonal"
  })
}, "VChip"), Iv = ce()({
  name: "VChip",
  directives: {
    Ripple: _i
  },
  props: f2(),
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
    } = xi(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = Yi(e), {
      densityClasses: c
    } = Jt(e), {
      elevationClasses: d
    } = Ln(e), {
      roundedClasses: f
    } = vt(e), {
      sizeClasses: h
    } = Gr(e), {
      themeClasses: v
    } = Ke(e), m = Pe(e, "modelValue"), y = El(e, Lv, !1), g = Tl(e, n), w = k(() => e.link !== !1 && g.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (!!y || e.link || g.isClickable.value)), b = k(() => ({
      "aria-label": o(e.closeLabel),
      onClick(C) {
        C.stopPropagation(), m.value = !1, i("click:close", C);
      }
    }));
    function x(C) {
      var P;
      i("click", C), _.value && ((P = g.navigate) == null || P.call(g, C), y == null || y.toggle());
    }
    function E(C) {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), x(C));
    }
    return () => {
      const C = g.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), $ = !!(P || r.append), R = !!(r.close || e.closable), H = !!(r.filter || e.filter) && y, I = !!(e.prependIcon || e.prependAvatar), N = !!(I || r.prepend), S = !y || y.isSelected.value;
      return m.value && We(p(C, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": _.value,
          "v-chip--filter": H,
          "v-chip--pill": e.pill
        }, v.value, l.value, S ? s.value : void 0, c.value, d.value, f.value, h.value, u.value, y == null ? void 0 : y.selectedClass.value, e.class],
        style: [S ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: g.href.value,
        tabindex: _.value ? 0 : void 0,
        onClick: x,
        onKeydown: _.value && !w.value && E
      }, {
        default: () => {
          var O;
          return [qi(_.value, "v-chip"), H && p(_v, {
            key: "filter"
          }, {
            default: () => [We(p("div", {
              class: "v-chip__filter"
            }, [r.filter ? p(Ye, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : p(Be, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[fn, y.isSelected.value]])]
          }), N && p("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? p(Ye, {
            key: "prepend-defaults",
            disabled: !I,
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
          }, r.prepend) : p(ke, null, [e.prependIcon && p(Be, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && p(gi, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), p("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((O = r.default) == null ? void 0 : O.call(r, {
            isSelected: y == null ? void 0 : y.isSelected.value,
            selectedClass: y == null ? void 0 : y.selectedClass.value,
            select: y == null ? void 0 : y.select,
            toggle: y == null ? void 0 : y.toggle,
            value: y == null ? void 0 : y.value.value,
            disabled: e.disabled
          })) ?? e.text]), $ && p("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? p(Ye, {
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
          }, r.append) : p(ke, null, [e.appendIcon && p(Be, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(gi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && p("button", ve({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? p(Ye, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : p(Be, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Wt("ripple"), _.value && e.ripple, null]]);
    };
  }
}), d2 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...xe(),
  ...Yr({
    transition: {
      component: wv
    }
  })
}, "VCounter"), Pv = ce()({
  name: "VCounter",
  functional: !0,
  props: d2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return he(() => p(bn, {
      transition: e.transition
    }, {
      default: () => [We(p("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[fn, e.active]])]
    })), {};
  }
}), h2 = Z({
  text: String,
  onClick: jt(),
  ...xe(),
  ...ze()
}, "VLabel"), Ja = ce()({
  name: "VLabel",
  props: h2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => {
      var i;
      return p("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), v2 = Z({
  floating: Boolean,
  ...xe()
}, "VFieldLabel"), go = ce()({
  name: "VFieldLabel",
  props: v2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => p(Ja, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Tv(e) {
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
    return p(Be, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Qa = Z({
  focused: Boolean,
  "onUpdate:focused": jt()
}, "focus");
function Ki(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn();
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
const m2 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], eu = Z({
  appendInnerIcon: Ie,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: Ie,
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
  prependInnerIcon: Ie,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => m2.includes(e)
  },
  "onClick:clear": jt(),
  "onClick:appendInner": jt(),
  "onClick:prependInner": jt(),
  ...xe(),
  ...Ga(),
  ...ht(),
  ...ze()
}, "VField"), tu = ce()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Qa(),
    ...eu()
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
    } = Ke(e), {
      loaderClasses: l
    } = Ll(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = Ki(e), {
      InputIcon: d
    } = Tv(e), {
      roundedClasses: f
    } = vt(e), {
      rtlClasses: h
    } = Qt(), v = k(() => e.dirty || e.active), m = k(() => !e.singleLine && !!(e.label || r.label)), y = Ct(), g = k(() => e.id || `input-${y}`), w = k(() => `${g.value}-messages`), _ = ie(), b = ie(), x = ie(), E = k(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: C,
      backgroundColorStyles: P
    } = St(se(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = Gt(k(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    pe(v, (N) => {
      if (m.value) {
        const S = _.value.$el, O = b.value.$el;
        requestAnimationFrame(() => {
          const M = Oa(S), G = O.getBoundingClientRect(), A = G.x - M.x, F = G.y - M.y - (M.height / 2 - G.height / 2), B = G.width / 0.75, z = Math.abs(B - M.width) > 1 ? {
            maxWidth: ge(B)
          } : void 0, Y = getComputedStyle(S), Q = getComputedStyle(O), ae = parseFloat(Y.transitionDuration) * 1e3 || 150, de = parseFloat(Q.getPropertyValue("--v-field-label-scale")), J = Q.getPropertyValue("color");
          S.style.visibility = "visible", O.style.visibility = "hidden", si(S, {
            transform: `translate(${A}px, ${F}px) scale(${de})`,
            color: J,
            ...z
          }, {
            duration: ae,
            easing: Ir,
            direction: N ? "normal" : "reverse"
          }).finished.then(() => {
            S.style.removeProperty("visibility"), O.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const H = k(() => ({
      isActive: v,
      isFocused: a,
      controlRef: x,
      blur: c,
      focus: u
    }));
    function I(N) {
      N.target !== document.activeElement && N.preventDefault();
    }
    return he(() => {
      var A, F, B;
      const N = e.variant === "outlined", S = r["prepend-inner"] || e.prependInnerIcon, O = !!(e.clearable || r.clear), M = !!(r["append-inner"] || e.appendInnerIcon || O), G = () => r.label ? r.label({
        ...H.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return p("div", ve({
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
          "v-field--prepended": S,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !G(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, C.value, s.value, l.value, f.value, h.value, e.class],
        style: [P.value, e.style],
        onClick: I
      }, n), [p("div", {
        class: "v-field__overlay"
      }, null), p(Ua, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: r.loader
      }), S && p("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && p(d, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (A = r["prepend-inner"]) == null ? void 0 : A.call(r, H.value)]), p("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && p(go, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: g.value,
        style: R.value
      }, {
        default: () => [G()]
      }), p(go, {
        ref: _,
        for: g.value
      }, {
        default: () => [G()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...H.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), O && p(_v, {
        key: "clear"
      }, {
        default: () => [We(p("div", {
          class: "v-field__clearable",
          onMousedown: (z) => {
            z.preventDefault(), z.stopPropagation();
          }
        }, [r.clear ? r.clear() : p(d, {
          name: "clear"
        }, null)]), [[fn, e.dirty]])]
      }), M && p("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(B = r["append-inner"]) == null ? void 0 : B.call(r, H.value), e.appendInnerIcon && p(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), p("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [N && p(ke, null, [p("div", {
        class: "v-field__outline__start"
      }, null), m.value && p("div", {
        class: "v-field__outline__notch"
      }, [p(go, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [G()]
      })]), p("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && m.value && p(go, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [G()]
      })])]);
    }), {
      controlRef: x
    };
  }
});
function Mv(e) {
  const t = Object.keys(tu.props).filter((n) => !Na(n) && n !== "class" && n !== "style");
  return kh(e, t);
}
const g2 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...xe(),
  ...Yr({
    transition: {
      component: wv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), y2 = ce()({
  name: "VMessages",
  props: g2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => an(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = Gt(k(() => e.color));
    return he(() => p(bn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", r.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && i.value.map((l, s) => p("div", {
        class: "v-messages__message",
        key: `${s}-${i.value}`
      }, [n.message ? n.message({
        message: l
      }) : l]))]
    })), {};
  }
}), p2 = Symbol.for("vuetify:form");
function Av() {
  return Ne(p2, null);
}
const b2 = Z({
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
  ...Qa()
}, "validation");
function w2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ct();
  const i = Pe(e, "modelValue"), r = k(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Av(), l = ie([]), s = ye(!0), a = k(() => !!(an(i.value === "" ? null : i.value).length || an(r.value === "" ? null : r.value).length)), u = k(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = k(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), d = k(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? an(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
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
  }), v = ye(!1), m = k(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), y = k(() => e.name ?? Ht(n));
  vl(() => {
    o == null || o.register({
      id: y.value,
      validate: _,
      reset: g,
      resetValidation: w
    });
  }), Yt(() => {
    o == null || o.unregister(y.value);
  }), qt(async () => {
    f.value.lazy || await _(!0), o == null || o.update(y.value, h.value, d.value);
  }), mi(() => f.value.input, () => {
    pe(r, () => {
      if (r.value != null)
        _();
      else if (e.focused) {
        const b = pe(() => e.focused, (x) => {
          x || _(), b();
        });
      }
    });
  }), mi(() => f.value.blur, () => {
    pe(() => e.focused, (b) => {
      b || _();
    });
  }), pe([h, d], () => {
    o == null || o.update(y.value, h.value, d.value);
  });
  function g() {
    i.value = null, He(w);
  }
  function w() {
    s.value = !0, f.value.lazy ? l.value = [] : _(!0);
  }
  async function _() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const x = [];
    v.value = !0;
    for (const E of e.rules) {
      if (x.length >= +(e.maxErrors ?? 1))
        break;
      const P = await (typeof E == "function" ? E : () => E)(r.value);
      if (P !== !0) {
        if (P !== !1 && typeof P != "string") {
          console.warn(`${P} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        x.push(P || "");
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
const Xi = Z({
  id: String,
  appendIcon: Ie,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: Ie,
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
  "onClick:prepend": jt(),
  "onClick:append": jt(),
  ...xe(),
  ...$t(),
  ...b2()
}, "VInput"), cn = ce()({
  name: "VInput",
  props: {
    ...Xi()
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
    } = Jt(e), {
      rtlClasses: l
    } = Qt(), {
      InputIcon: s
    } = Tv(e), a = Ct(), u = k(() => e.id || `input-${a}`), c = k(() => `${u.value}-messages`), {
      errorMessages: d,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: y,
      isValidating: g,
      reset: w,
      resetValidation: _,
      validate: b,
      validationClasses: x
    } = w2(e, "v-input", u), E = k(() => ({
      id: u,
      messagesId: c,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: y,
      isValidating: g,
      reset: w,
      resetValidation: _,
      validate: b
    })), C = k(() => {
      var P;
      return (P = e.errorMessages) != null && P.length || !m.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return he(() => {
      var I, N, S, O;
      const P = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), R = C.value.length > 0, H = !e.hideDetails || e.hideDetails === "auto" && (R || !!i.details);
      return p("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, x.value, e.class],
        style: e.style
      }, [P && p("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(I = i.prepend) == null ? void 0 : I.call(i, E.value), e.prependIcon && p(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && p("div", {
        class: "v-input__control"
      }, [(N = i.default) == null ? void 0 : N.call(i, E.value)]), $ && p("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && p(s, {
        key: "append-icon",
        name: "append"
      }, null), (S = i.append) == null ? void 0 : S.call(i, E.value)]), H && p("div", {
        class: "v-input__details"
      }, [p(y2, {
        id: c.value,
        active: R,
        messages: C.value
      }, {
        message: i.message
      }), (O = i.details) == null ? void 0 : O.call(i, E.value)])]);
    }), {
      reset: w,
      resetValidation: _,
      validate: b,
      isValid: y,
      errorMessages: d
    };
  }
}), x2 = Z({
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
  ...Xi({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => an(e).every((t) => t != null && typeof t == "object")
  },
  ...eu({
    clearable: !0
  })
}, "VFileInput"), _2 = ce()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: x2(),
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
    } = Ki(e), c = k(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = k(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: H = 0
      } = R;
      return $ + H;
    }, 0)), f = k(() => Mc(d.value, c.value)), h = k(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: H = 0
      } = $;
      return e.showSize ? `${R} (${Mc(H, c.value)})` : R;
    })), v = k(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, f.value) : o(e.counterString, $);
    }), m = ie(), y = ie(), g = ie(), w = k(() => s.value || e.active), _ = k(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      g.value !== document.activeElement && (($ = g.value) == null || $.focus()), s.value || a();
    }
    function x($) {
      var R;
      (R = g.value) == null || R.click();
    }
    function E($) {
      i("mousedown:control", $);
    }
    function C($) {
      var R;
      (R = g.value) == null || R.click(), i("click:control", $);
    }
    function P($) {
      $.stopPropagation(), b(), He(() => {
        l.value = [], Ih(e["onClick:clear"], $);
      });
    }
    return pe(l, ($) => {
      (!Array.isArray($) || !$.length) && g.value && (g.value.value = "");
    }), he(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [H, I] = Hr(n), {
        modelValue: N,
        ...S
      } = cn.filterProps(e), O = Mv(e);
      return p(cn, ve({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (M) => l.value = M,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": _.value
        }, e.class],
        style: e.style,
        "onClick:prepend": x
      }, H, S, {
        centerAffix: !_.value,
        focused: s.value
      }), {
        ...r,
        default: (M) => {
          let {
            id: G,
            isDisabled: A,
            isDirty: F,
            isReadonly: B,
            isValid: z
          } = M;
          return p(tu, ve({
            ref: y,
            "prepend-icon": e.prependIcon,
            onMousedown: E,
            onClick: C,
            "onClick:clear": P,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, O, {
            id: G.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: A.value,
            focused: s.value,
            error: z.value === !1
          }), {
            ...r,
            default: (Y) => {
              var de;
              let {
                props: {
                  class: Q,
                  ...ae
                }
              } = Y;
              return p(ke, null, [p("input", ve({
                ref: g,
                type: "file",
                readonly: B.value,
                disabled: A.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (J) => {
                  J.stopPropagation(), B.value && J.preventDefault(), b();
                },
                onChange: (J) => {
                  if (!J.target) return;
                  const ue = J.target;
                  l.value = [...ue.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, ae, I), null), p("div", {
                class: Q
              }, [!!((de = l.value) != null && de.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: d.value,
                totalBytesReadable: f.value
              }) : e.chips ? h.value.map((J) => p(Iv, {
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
          var G, A;
          return p(ke, null, [(G = r.details) == null ? void 0 : G.call(r, M), $ && p(ke, null, [p("span", null, null), p(Pv, {
            active: !!((A = l.value) != null && A.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), qn({}, m, y, g);
  }
}), $v = $l.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Nv = $l.reduce((e, t) => {
  const n = "offset" + kn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Rv = $l.reduce((e, t) => {
  const n = "order" + kn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), bf = {
  col: Object.keys($v),
  offset: Object.keys(Nv),
  order: Object.keys(Rv)
};
function S2(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const C2 = ["auto", "start", "end", "center", "baseline", "stretch"], k2 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...$v,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Nv,
  order: {
    type: [String, Number],
    default: null
  },
  ...Rv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => C2.includes(e)
  },
  ...xe(),
  ...Oe()
}, "VCol"), yo = ce()({
  name: "VCol",
  props: k2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in bf)
        bf[o].forEach((s) => {
          const a = e[s], u = S2(o, s, a);
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
      return Gn(e.tag, {
        class: [i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), nu = ["start", "end", "center"], Ov = ["space-between", "space-around", "space-evenly"];
function iu(e, t) {
  return $l.reduce((n, i) => {
    const r = e + kn(i);
    return n[r] = t(), n;
  }, {});
}
const E2 = [...nu, "baseline", "stretch"], Bv = (e) => E2.includes(e), Fv = iu("align", () => ({
  type: String,
  default: null,
  validator: Bv
})), V2 = [...nu, ...Ov], Dv = (e) => V2.includes(e), Hv = iu("justify", () => ({
  type: String,
  default: null,
  validator: Dv
})), L2 = [...nu, ...Ov, "stretch"], zv = (e) => L2.includes(e), jv = iu("alignContent", () => ({
  type: String,
  default: null,
  validator: zv
})), wf = {
  align: Object.keys(Fv),
  justify: Object.keys(Hv),
  alignContent: Object.keys(jv)
}, I2 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function P2(e, t, n) {
  let i = I2[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const T2 = Z({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Bv
  },
  ...Fv,
  justify: {
    type: String,
    default: null,
    validator: Dv
  },
  ...Hv,
  alignContent: {
    type: String,
    default: null,
    validator: zv
  },
  ...jv,
  ...xe(),
  ...Oe()
}, "VRow"), Lt = ce()({
  name: "VRow",
  props: T2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in wf)
        wf[o].forEach((l) => {
          const s = e[l], a = P2(o, l, s);
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
      return Gn(e.tag, {
        class: ["v-row", i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), il = Wi("v-spacer", "div", "VSpacer");
function M2(e) {
  const t = ye(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), He(() => t.value = e);
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
  return lt(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const A2 = Z({
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
  ...Il(),
  ...ht(),
  ...In(),
  ...ze(),
  ...Xt(Xr({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), $2 = ce()({
  name: "VSnackbar",
  props: A2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      locationStyles: r
    } = qr(e), {
      positionClasses: o
    } = Pl(e), {
      scopeId: l
    } = Kr(), {
      themeClasses: s
    } = Ke(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = Yi(e), {
      roundedClasses: d
    } = vt(e), f = M2(Number(e.timeout)), h = ie(), v = ie(), m = ye(!1);
    pe(i, g), pe(() => e.timeout, g), qt(() => {
      i.value && g();
    });
    let y = -1;
    function g() {
      f.reset(), window.clearTimeout(y);
      const x = Number(e.timeout);
      if (!i.value || x === -1) return;
      const E = Vr(v.value);
      f.start(E), y = window.setTimeout(() => {
        i.value = !1;
      }, x);
    }
    function w() {
      f.reset(), window.clearTimeout(y);
    }
    function _() {
      m.value = !0, w();
    }
    function b() {
      m.value = !1, g();
    }
    return he(() => {
      const x = jn.filterProps(e), E = !!(n.default || n.text || e.text);
      return p(jn, ve({
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
        contentProps: ve({
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
          var C, P;
          return [qi(!1, "v-snackbar"), e.timer && !m.value && p("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(iv, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), E && p("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((C = n.text) == null ? void 0 : C.call(n)) ?? e.text, (P = n.default) == null ? void 0 : P.call(n)]), n.actions && p(Ye, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [p("div", {
              class: "v-snackbar__actions"
            }, [n.actions()])]
          })];
        },
        activator: n.activator
      });
    }), qn({}, h);
  }
}), Gv = Symbol.for("vuetify:v-tabs"), N2 = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Xt(dv({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Us = ce()({
  name: "VTab",
  props: N2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = Gt(e, "sliderColor"), l = ie(), s = ie(), a = k(() => e.direction === "horizontal"), u = k(() => {
      var d, f;
      return ((f = (d = l.value) == null ? void 0 : d.group) == null ? void 0 : f.isSelected.value) ?? !1;
    });
    function c(d) {
      var h, v;
      let {
        value: f
      } = d;
      if (f) {
        const m = (v = (h = l.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : v.querySelector(".v-tab--selected .v-tab__slider"), y = s.value;
        if (!m || !y) return;
        const g = getComputedStyle(m).color, w = m.getBoundingClientRect(), _ = y.getBoundingClientRect(), b = a.value ? "x" : "y", x = a.value ? "X" : "Y", E = a.value ? "right" : "bottom", C = a.value ? "width" : "height", P = w[b], $ = _[b], R = P > $ ? w[E] - _[E] : w[b] - _[b], H = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", N = (Math.abs(R) + (Math.sign(R) < 0 ? w[C] : _[C])) / Math.max(w[C], _[C]) || 0, S = w[C] / _[C] || 0, O = 1.5;
        si(y, {
          backgroundColor: [g, "currentcolor"],
          transform: [`translate${x}(${R}px) scale${x}(${S})`, `translate${x}(${R / O}px) scale${x}(${(N - 1) / O + 1})`, "none"],
          transformOrigin: Array(3).fill(H)
        }, {
          duration: 225,
          easing: Ir
        });
      }
    }
    return he(() => {
      const d = Qe.filterProps(e);
      return p(Qe, ve({
        symbol: Gv,
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
          return p(ke, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && p("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), qn({}, l);
  }
});
function R2(e) {
  return e ? e.map((t) => Wo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const O2 = Z({
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
  ...Za({
    mandatory: "force"
  }),
  ...$t(),
  ...Oe()
}, "VTabs"), B2 = ce()({
  name: "VTabs",
  props: O2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = k(() => R2(e.items)), {
      densityClasses: o
    } = Jt(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = St(se(e, "bgColor"));
    return hn({
      VTab: {
        color: se(e, "color"),
        direction: se(e, "direction"),
        stacked: se(e, "stacked"),
        fixed: se(e, "fixedTabs"),
        sliderColor: se(e, "sliderColor"),
        hideSlider: se(e, "hideSlider")
      }
    }), he(() => {
      const a = nl.filterProps(e);
      return p(nl, ve(a, {
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
        symbol: Gv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => p(Us, ve(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), F2 = Z({
  id: String,
  text: String,
  ...Xt(Xr({
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
}, "VTooltip"), Oi = ce()({
  name: "VTooltip",
  props: F2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Kr(), o = Ct(), l = k(() => e.id || `v-tooltip-${o}`), s = ie(), a = k(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = k(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = k(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), d = k(() => ve({
      "aria-describedby": l.value
    }, e.activatorProps));
    return he(() => {
      const f = jn.filterProps(e);
      return p(jn, ve({
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
          var y;
          for (var h = arguments.length, v = new Array(h), m = 0; m < h; m++)
            v[m] = arguments[m];
          return ((y = n.default) == null ? void 0 : y.call(n, ...v)) ?? e.text;
        }
      });
    }), qn({}, s);
  }
}), D2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function H2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function z2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), D2(t);
}
function j2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function G2() {
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
    touchstart: (n) => H2(n, t),
    touchend: (n) => z2(n, t),
    touchmove: (n) => j2(n, t)
  };
}
function U2(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = G2(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, Ch(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function W2(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  Ch(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const Uv = {
  mounted: U2,
  unmounted: W2
}, q2 = Uv, Wv = Symbol.for("vuetify:v-window"), qv = Symbol.for("vuetify:v-window-group"), Y2 = Z({
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
  ...xe(),
  ...Oe(),
  ...ze()
}, "VWindow"), K2 = ce()({
  name: "VWindow",
  directives: {
    Touch: Uv
  },
  props: Y2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      isRtl: r
    } = Qt(), {
      t: o
    } = Ur(), l = zr(e, qv), s = ie(), a = k(() => r.value ? !e.reverse : e.reverse), u = ye(!1), c = k(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), d = ye(0), f = ie(void 0), h = k(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    pe(h, (b, x) => {
      const E = l.items.value.length, C = E - 1;
      E <= 2 ? u.value = b < x : b === C && x === 0 ? u.value = !0 : b === 0 && x === C ? u.value = !1 : u.value = b < x;
    }), et(Wv, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const v = k(() => e.continuous || h.value !== 0), m = k(() => e.continuous || h.value !== l.items.value.length - 1);
    function y() {
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
      }) : p(Qe, x, null) : p("div", null, null));
      const E = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: E
      }) : p(Qe, E, null) : p("div", null, null)), b;
    }), _ = k(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? y() : g();
        },
        right: () => {
          a.value ? g() : y();
        },
        start: (x) => {
          let {
            originalEvent: E
          } = x;
          E.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return he(() => We(p(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var b, x;
        return [p("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(b = n.default) == null ? void 0 : b.call(n, {
          group: l
        }), e.showArrows !== !1 && p("div", {
          class: "v-window__controls"
        }, [w.value])]), (x = n.additional) == null ? void 0 : x.call(n, {
          group: l
        })];
      }
    }), [[Wt("touch"), _.value]])), {
      group: l
    };
  }
});
function Yv() {
  const e = ye(!1);
  return qt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: k(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Nr(e)
  };
}
const X2 = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...xe(),
  ...kl(),
  ...Nl()
}, "VWindowItem"), xf = ce()({
  name: "VWindowItem",
  directives: {
    Touch: q2
  },
  props: X2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(Wv), r = El(e, qv), {
      isBooted: o
    } = Yv();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = ye(!1), s = k(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
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
      l.value && He(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = ge(v.clientHeight));
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
    } = Ka(e, r.isSelected);
    return he(() => p(bn, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [We(p("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[fn, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), Z2 = /* @__PURE__ */ Ge("h3", { class: "heading" }, "Select File", -1), J2 = /* @__PURE__ */ Ge("b", null, "replace", -1), Q2 = /* @__PURE__ */ Ge("h3", { class: "heading" }, "Preview", -1), eS = /* @__PURE__ */ Ge("b", null, "copy", -1), tS = /* @__PURE__ */ Ui({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = ie(!1), o = ie(0), l = ie(), s = ie(!1), a = k(
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
            var y;
            i("file-imported", (y = m.target) == null ? void 0 : y.result), f();
          }, h.onerror = (m) => {
            var y;
            console.error(
              //@ts-ignore
              `Error reading the file ${l.name}: ${(y = m.target) == null ? void 0 : y.error}`
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
    return (h, v) => (pt(), ln(Xa, {
      modelValue: r.value,
      "onUpdate:modelValue": v[6] || (v[6] = (m) => r.value = m),
      "max-width": "800px"
    }, {
      activator: fe(({ props: m }) => [
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: fe(({ props: y }) => [
            p(Qe, ve({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...m, ...y }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: fe(() => [
        p(Wa, null, {
          default: fe(() => [
            p(Mr, null, {
              default: fe(() => [
                p(B2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[0] || (v[0] = (m) => o.value = m)
                }, {
                  default: fe(() => [
                    p(Us, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: fe(() => [
                        Ue("Import")
                      ]),
                      _: 1
                    }),
                    p(Us, {
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
            p(vr, null, {
              default: fe(() => [
                p(K2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[2] || (v[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: fe(() => [
                    p(xf, null, {
                      default: fe(() => [
                        Z2,
                        p(_2, {
                          modelValue: l.value,
                          "onUpdate:modelValue": v[1] || (v[1] = (m) => l.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        p(vr, null, {
                          default: fe(() => [
                            Ue(" The import is limited to files in trivial graph format. Importing will "),
                            J2,
                            Ue(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    p(xf, null, {
                      default: fe(() => [
                        Q2,
                        Ge("pre", null, Qn(n.graphAsTgf), 1),
                        p(vr, null, {
                          default: fe(() => [
                            Ue("This export action will "),
                            eS,
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
            p(Al, null, {
              default: fe(() => [
                p(il),
                p(Qe, {
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
                p(Qe, {
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
        p($2, {
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
}), nS = ".heading{margin-top:10px;margin-bottom:10px}", ru = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, iS = /* @__PURE__ */ ru(tS, [["styles", [nS]]]), rS = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...xe(),
  ...$t(),
  ...Oe(),
  ...ze()
}, "VTable"), oS = ce()({
  name: "VTable",
  props: rS(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = Ke(e), {
      densityClasses: o
    } = Jt(e);
    return he(() => p(e.tag, {
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
        return [(l = n.top) == null ? void 0 : l.call(n), n.default ? p("div", {
          class: "v-table__wrapper",
          style: {
            height: ge(e.height)
          }
        }, [p("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), lS = { class: "text-left" }, sS = { class: "text-left" }, aS = { class: "text-left" }, uS = /* @__PURE__ */ Ui({
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
    ], n = ie(!1), i = ["Action", "Desktop", "Mobile"];
    return (r, o) => (pt(), ln(Xa, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (l) => n.value = l),
      "max-width": "800px"
    }, {
      activator: fe(({ props: l }) => [
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: fe(({ props: s }) => [
            p(Qe, ve({
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
        p(Wa, null, {
          default: fe(() => [
            p(Mr, { class: "card-header" }, {
              default: fe(() => [
                Ue("Controls")
              ]),
              _: 1
            }),
            p(oS, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: fe(() => [
                Ge("thead", null, [
                  Ge("tr", null, [
                    Ge("th", lS, Qn(i[0]), 1),
                    Ge("th", sS, Qn(i[1]), 1),
                    Ge("th", aS, Qn(i[2]), 1)
                  ])
                ]),
                Ge("tbody", null, [
                  (pt(), xs(ke, null, Ag(t, (l) => Ge("tr", {
                    key: l.action
                  }, [
                    Ge("td", null, Qn(l.action), 1),
                    Ge("td", null, Qn(l.desktop), 1),
                    Ge("td", null, Qn(l.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            p(Al, null, {
              default: fe(() => [
                p(il),
                p(Qe, {
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
}), cS = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", fS = /* @__PURE__ */ ru(uS, [["styles", [cS]], ["__scopeId", "data-v-6c8401af"]]), Kv = Symbol.for("vuetify:selection-control-group"), Xv = Z({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: Ie,
  trueIcon: Ie,
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
    default: bi
  },
  ...xe(),
  ...$t(),
  ...ze()
}, "SelectionControlGroup"), dS = Z({
  ...Xv({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ce()({
  name: "VSelectionControlGroup",
  props: dS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = Ct(), o = k(() => e.id || `v-selection-control-group-${r}`), l = k(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return et(Kv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), lt(() => {
          s.delete(a);
        });
      }
    }), hn({
      [e.defaultsTarget]: {
        color: se(e, "color"),
        disabled: se(e, "disabled"),
        density: se(e, "density"),
        error: se(e, "error"),
        inline: se(e, "inline"),
        modelValue: i,
        multiple: k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)),
        name: l,
        falseIcon: se(e, "falseIcon"),
        trueIcon: se(e, "trueIcon"),
        readonly: se(e, "readonly"),
        ripple: se(e, "ripple"),
        type: se(e, "type"),
        valueComparator: se(e, "valueComparator")
      }
    }), he(() => {
      var a;
      return p("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
});
const ou = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...xe(),
  ...Xv()
}, "VSelectionControl");
function hS(e) {
  const t = Ne(Kv, void 0), {
    densityClasses: n
  } = Jt(e), i = Pe(e, "modelValue"), r = k(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = k(() => e.falseValue !== void 0 ? e.falseValue : !1), l = k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = k({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? an(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...an(i.value), v] : an(i.value).filter((y) => !e.valueComparator(y, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = Gt(k(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = St(k(() => s.value && !e.error && !e.disabled ? e.color : void 0)), f = k(() => s.value ? e.trueIcon : e.falseIcon);
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
const rl = ce()({
  name: "VSelectionControl",
  directives: {
    Ripple: _i
  },
  inheritAttrs: !1,
  props: ou(),
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
    } = hS(e), h = Ct(), v = ye(!1), m = ye(!1), y = ie(), g = k(() => e.id || `input-${h}`), w = k(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function _(C) {
      w.value && (v.value = !0, Ko(C.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function x(C) {
      C.stopPropagation();
    }
    function E(C) {
      w.value && (e.readonly && r && He(() => r.forceUpdate()), s.value = C.target.checked);
    }
    return he(() => {
      var H, I;
      const C = i.label ? i.label({
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label, [P, $] = Hr(n), R = p("input", ve({
        ref: y,
        checked: s.value,
        disabled: !!e.disabled,
        id: g.value,
        onBlur: b,
        onFocus: _,
        onInput: E,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, $), null);
      return p("div", ve({
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
      }), [p("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(H = i.default) == null ? void 0 : H.call(i, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), We(p("div", {
        class: ["v-selection-control__input"]
      }, [((I = i.input) == null ? void 0 : I.call(i, {
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
      })) ?? p(ke, null, [l.value && p(Be, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[Wt("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), C && p(Ja, {
        for: g.value,
        onClick: x
      }, {
        default: () => [C]
      })]);
    }), {
      isFocused: v,
      input: y
    };
  }
}), Zv = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Ie,
    default: "$checkboxIndeterminate"
  },
  ...ou({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Ws = ce()({
  name: "VCheckboxBtn",
  props: Zv(),
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
    return he(() => {
      const a = Xt(rl.filterProps(e), ["modelValue"]);
      return p(rl, ve(a, {
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
}), vS = Z({
  ...Xi(),
  ...Xt(Zv(), ["inline"])
}, "VCheckbox"), mS = ce()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: vS(),
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
    } = Ki(e), a = Ct(), u = k(() => e.id || `checkbox-${a}`);
    return he(() => {
      const [c, d] = Hr(n), f = cn.filterProps(e), h = Ws.filterProps(e);
      return p(cn, ve({
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
            messagesId: y,
            isDisabled: g,
            isReadonly: w,
            isValid: _
          } = v;
          return p(Ws, ve(h, {
            id: m.value,
            "aria-describedby": y.value,
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
}), gS = Z({
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
  ...xe()
}, "VColorPickerCanvas"), yS = Zt({
  name: "VColorPickerCanvas",
  props: gS(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = ye(!1), r = ie(), o = ye(parseFloat(e.width)), l = ye(parseFloat(e.height)), s = ie({
      x: 0,
      y: 0
    }), a = k({
      get: () => s.value,
      set(y) {
        var _, b;
        if (!r.value) return;
        const {
          x: g,
          y: w
        } = y;
        s.value = y, n("update:color", {
          h: ((_ = e.color) == null ? void 0 : _.h) ?? 0,
          s: wt(g, 0, o.value) / o.value,
          v: 1 - wt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = k(() => {
      const {
        x: y,
        y: g
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: ge(e.dotSize),
        height: ge(e.dotSize),
        transform: `translate(${ge(y - w)}, ${ge(g - w)})`
      };
    }), {
      resizeRef: c
    } = ji((y) => {
      var _;
      if (!((_ = c.value) != null && _.offsetParent)) return;
      const {
        width: g,
        height: w
      } = y[0].contentRect;
      o.value = g, l.value = w;
    });
    function d(y, g, w) {
      const {
        left: _,
        top: b,
        width: x,
        height: E
      } = w;
      a.value = {
        x: wt(y - _, 0, x),
        y: wt(g - b, 0, E)
      };
    }
    function f(y) {
      y.type === "mousedown" && y.preventDefault(), !e.disabled && (h(y), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(y) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const g = dx(y);
      d(g.clientX, g.clientY, r.value.getBoundingClientRect());
    }
    function v() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", v);
    }
    function m() {
      var b;
      if (!r.value) return;
      const y = r.value, g = y.getContext("2d");
      if (!g) return;
      const w = g.createLinearGradient(0, 0, y.width, 0);
      w.addColorStop(0, "hsla(0, 0%, 100%, 1)"), w.addColorStop(1, `hsla(${((b = e.color) == null ? void 0 : b.h) ?? 0}, 100%, 50%, 1)`), g.fillStyle = w, g.fillRect(0, 0, y.width, y.height);
      const _ = g.createLinearGradient(0, 0, 0, y.height);
      _.addColorStop(0, "hsla(0, 0%, 0%, 0)"), _.addColorStop(1, "hsla(0, 0%, 0%, 1)"), g.fillStyle = _, g.fillRect(0, 0, y.width, y.height);
    }
    return pe(() => {
      var y;
      return (y = e.color) == null ? void 0 : y.h;
    }, m, {
      immediate: !0
    }), pe(() => [o.value, l.value], (y, g) => {
      m(), s.value = {
        x: a.value.x * y[0] / g[0],
        y: a.value.y * y[1] / g[1]
      };
    }, {
      flush: "post"
    }), pe(() => e.color, () => {
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
    }), qt(() => m()), he(() => p("div", {
      ref: c,
      class: ["v-color-picker-canvas", e.class],
      style: e.style,
      onMousedown: f,
      onTouchstartPassive: f
    }, [p("canvas", {
      ref: r,
      width: o.value,
      height: l.value
    }, null), e.color && p("div", {
      class: ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": e.disabled
      }],
      style: u.value
    }, null)])), {};
  }
});
function pS(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function bS(e, t) {
  if (t == null || typeof t == "string") {
    const n = jh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return li(t, ["r", "g", "b"]) ? n = Cn(e) : li(t, ["h", "s", "l"]) ? n = Oh(e) : li(t, ["h", "s", "v"]) && (n = e), pS(n, !li(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Ii = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, qs = {
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
  to: Cn,
  from: Sl
};
var Pf;
const wS = {
  ...qs,
  inputs: (Pf = qs.inputs) == null ? void 0 : Pf.slice(0, 3)
}, Ys = {
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
  to: Oh,
  from: Fa
}, xS = {
  ...Ys,
  inputs: Ys.inputs.slice(0, 3)
}, Jv = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: jh,
  from: zh
}, _S = {
  ...Jv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, hi = {
  rgb: wS,
  rgba: qs,
  hsl: xS,
  hsla: Ys,
  hex: _S,
  hexa: Jv
}, SS = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return p("div", {
    class: "v-color-picker-edit__input"
  }, [p("input", n, null), p("span", null, [t])]);
}, CS = Z({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(hi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(hi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(hi).includes(t))
  },
  ...xe()
}, "VColorPickerEdit"), kS = Zt({
  name: "VColorPickerEdit",
  props: CS(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = k(() => e.modes.map((o) => ({
      ...hi[o],
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
            h && n("update:color", o.from(c(l ?? o.to(Ii), h.value)));
          }
        };
      });
    });
    return he(() => {
      var o;
      return p("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => p(SS, l, null)), i.value.length > 1 && p(Qe, {
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
}), lu = Symbol.for("vuetify:v-slider");
function ES(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function VS(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const LS = Z({
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
  ...ht(),
  ...Vn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), IS = (e) => {
  const t = k(() => parseFloat(e.min)), n = k(() => parseFloat(e.max)), i = k(() => +e.step > 0 ? parseFloat(e.step) : 0), r = k(() => Math.max(Ic(i.value), Ic(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = wt(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, PS = (e) => {
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
  } = Qt(), a = se(t, "reverse"), u = k(() => t.direction === "vertical"), c = k(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: m
  } = n, y = k(() => parseInt(t.thumbSize, 10)), g = k(() => parseInt(t.tickSize, 10)), w = k(() => parseInt(t.trackSize, 10)), _ = k(() => (f.value - d.value) / h.value), b = se(t, "disabled"), x = k(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = k(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), C = k(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), P = ye(!1), $ = ye(0), R = ie(), H = ie();
  function I(J) {
    var W;
    const ue = t.direction === "vertical", Ee = ue ? "top" : "left", je = ue ? "height" : "width", at = ue ? "clientY" : "clientX", {
      [Ee]: Et,
      [je]: en
    } = (W = R.value) == null ? void 0 : W.$el.getBoundingClientRect(), V = VS(J, at);
    let T = Math.min(Math.max((V - Et - $.value) / en, 0), 1) || 0;
    return (ue ? c.value : c.value !== s.value) && (T = 1 - T), m(d.value + T * (f.value - d.value));
  }
  const N = (J) => {
    o({
      value: I(J)
    }), P.value = !1, $.value = 0;
  }, S = (J) => {
    H.value = l(J), H.value && (H.value.focus(), P.value = !0, H.value.contains(J.target) ? $.value = ES(J, H.value, t.direction) : ($.value = 0, r({
      value: I(J)
    })), i({
      value: I(J)
    }));
  }, O = {
    passive: !0,
    capture: !0
  };
  function M(J) {
    r({
      value: I(J)
    });
  }
  function G(J) {
    J.stopPropagation(), J.preventDefault(), N(J), window.removeEventListener("mousemove", M, O), window.removeEventListener("mouseup", G);
  }
  function A(J) {
    var ue;
    N(J), window.removeEventListener("touchmove", M, O), (ue = J.target) == null || ue.removeEventListener("touchend", A);
  }
  function F(J) {
    var ue;
    S(J), window.addEventListener("touchmove", M, O), (ue = J.target) == null || ue.addEventListener("touchend", A, {
      passive: !1
    });
  }
  function B(J) {
    J.preventDefault(), S(J), window.addEventListener("mousemove", M, O), window.addEventListener("mouseup", G, {
      passive: !1
    });
  }
  const z = (J) => {
    const ue = (J - d.value) / (f.value - d.value) * 100;
    return wt(isNaN(ue) ? 0 : ue, 0, 100);
  }, Y = se(t, "showTicks"), Q = k(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: z(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: z(parseFloat(J)),
    label: t.ticks[J]
  })) : _.value !== 1 / 0 ? $a(_.value + 1).map((J) => {
    const ue = d.value + J * h.value;
    return {
      value: ue,
      position: z(ue)
    };
  }) : [] : []), ae = k(() => Q.value.some((J) => {
    let {
      label: ue
    } = J;
    return !!ue;
  })), de = {
    activeThumbRef: H,
    color: se(t, "color"),
    decimals: v,
    disabled: b,
    direction: se(t, "direction"),
    elevation: se(t, "elevation"),
    hasLabels: ae,
    isReversed: a,
    indexFromEnd: c,
    min: d,
    max: f,
    mousePressed: P,
    numTicks: _,
    onSliderMousedown: B,
    onSliderTouchstart: F,
    parsedTicks: Q,
    parseMouseMove: I,
    position: z,
    readonly: se(t, "readonly"),
    rounded: se(t, "rounded"),
    roundValue: m,
    showTicks: Y,
    startOffset: $,
    step: h,
    thumbSize: y,
    thumbColor: x,
    thumbLabel: se(t, "thumbLabel"),
    ticks: se(t, "ticks"),
    tickSize: g,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: C,
    trackSize: w,
    vertical: u
  };
  return et(lu, de), de;
}, TS = Z({
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
  ...xe()
}, "VSliderThumb"), MS = ce()({
  name: "VSliderThumb",
  directives: {
    Ripple: _i
  },
  props: TS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = Ne(lu), {
      isRtl: o,
      rtlClasses: l
    } = Qt();
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
      elevation: y,
      mousePressed: g,
      decimals: w,
      indexFromEnd: _
    } = r, b = k(() => u.value ? void 0 : y.value), {
      elevationClasses: x
    } = Ln(b), {
      textColorClasses: E,
      textColorStyles: C
    } = Gt(s), {
      pageup: P,
      pagedown: $,
      end: R,
      home: H,
      left: I,
      right: N,
      down: S,
      up: O
    } = ax, M = [P, $, R, H, I, N, S, O], G = k(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function A(B, z) {
      if (!M.includes(B.key)) return;
      B.preventDefault();
      const Y = a.value || 0.1, Q = (e.max - e.min) / Y;
      if ([I, N, S, O].includes(B.key)) {
        const de = (v.value ? [o.value ? I : N, h.value ? S : O] : _.value !== o.value ? [I, O] : [N, O]).includes(B.key) ? 1 : -1, J = B.shiftKey ? 2 : B.ctrlKey ? 1 : 0;
        z = z + de * Y * G.value[J];
      } else if (B.key === H)
        z = e.min;
      else if (B.key === R)
        z = e.max;
      else {
        const ae = B.key === $ ? 1 : -1;
        z = z - ae * Y * (Q > 100 ? Q / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, z));
    }
    function F(B) {
      const z = A(B, e.modelValue);
      z != null && i("update:modelValue", z);
    }
    return he(() => {
      const B = ge(_.value ? 100 - e.position : e.position, "%");
      return p("div", {
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
      }, [p("div", {
        class: ["v-slider-thumb__surface", E.value, x.value],
        style: {
          ...C.value
        }
      }, null), We(p("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: C.value
      }, null), [[Wt("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), p(bv, {
        origin: "bottom center"
      }, {
        default: () => {
          var z;
          return [We(p("div", {
            class: "v-slider-thumb__label-container"
          }, [p("div", {
            class: ["v-slider-thumb__label"]
          }, [p("div", null, [((z = n["thumb-label"]) == null ? void 0 : z.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[fn, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), AS = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...xe()
}, "VSliderTrack"), $S = ce()({
  name: "VSliderTrack",
  props: AS(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(lu);
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
      roundedClasses: y
    } = vt(l), {
      backgroundColorClasses: g,
      backgroundColorStyles: w
    } = St(c), {
      backgroundColorClasses: _,
      backgroundColorStyles: b
    } = St(u), x = k(() => `inset-${f.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), E = k(() => f.value ? "height" : "width"), C = k(() => ({
      [x.value]: "0%",
      [E.value]: "100%"
    })), P = k(() => e.stop - e.start), $ = k(() => ({
      [x.value]: ge(e.start, "%"),
      [E.value]: ge(P.value, "%")
    })), R = k(() => s.value ? (f.value ? o.value.slice().reverse() : o.value).map((I, N) => {
      var O;
      const S = I.value !== h.value && I.value !== v.value ? ge(I.position, "%") : void 0;
      return p("div", {
        key: I.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": I.position >= e.start && I.position <= e.stop,
          "v-slider-track__tick--first": I.value === h.value,
          "v-slider-track__tick--last": I.value === v.value
        }],
        style: {
          [x.value]: S
        }
      }, [(I.label || n["tick-label"]) && p("div", {
        class: "v-slider-track__tick-label"
      }, [((O = n["tick-label"]) == null ? void 0 : O.call(n, {
        tick: I,
        index: N
      })) ?? I.label])]);
    }) : []);
    return he(() => p("div", {
      class: ["v-slider-track", y.value, e.class],
      style: [{
        "--v-slider-track-size": ge(d.value),
        "--v-slider-tick-size": ge(a.value)
      }, e.style]
    }, [p("div", {
      class: ["v-slider-track__background", _.value, {
        "v-slider-track__background--opacity": !!r.value || !c.value
      }],
      style: {
        ...C.value,
        ...b.value
      }
    }, null), p("div", {
      class: ["v-slider-track__fill", g.value],
      style: {
        ...$.value,
        ...w.value
      }
    }, null), s.value && p("div", {
      class: ["v-slider-track__ticks", {
        "v-slider-track__ticks--always-show": s.value === "always"
      }]
    }, [R.value])])), {};
  }
}), NS = Z({
  ...Qa(),
  ...LS(),
  ...Xi(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), _f = ce()({
  name: "VSlider",
  props: NS(),
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
    const r = ie(), {
      rtlClasses: o
    } = Qt(), l = IS(e), s = Pe(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
      min: a,
      max: u,
      mousePressed: c,
      roundValue: d,
      onSliderMousedown: f,
      onSliderTouchstart: h,
      trackContainerRef: v,
      position: m,
      hasLabels: y,
      readonly: g
    } = PS({
      props: e,
      steps: l,
      onSliderStart: () => {
        i("start", s.value);
      },
      onSliderEnd: (E) => {
        let {
          value: C
        } = E;
        const P = d(C);
        s.value = P, i("end", P);
      },
      onSliderMove: (E) => {
        let {
          value: C
        } = E;
        return s.value = d(C);
      },
      getActiveThumb: () => {
        var E;
        return (E = r.value) == null ? void 0 : E.$el;
      }
    }), {
      isFocused: w,
      focus: _,
      blur: b
    } = Ki(e), x = k(() => m(s.value));
    return he(() => {
      const E = cn.filterProps(e), C = !!(e.label || n.label || n.prepend);
      return p(cn, ve({
        class: ["v-slider", {
          "v-slider--has-labels": !!n["tick-label"] || y.value,
          "v-slider--focused": w.value,
          "v-slider--pressed": c.value,
          "v-slider--disabled": e.disabled
        }, o.value, e.class],
        style: e.style
      }, E, {
        focused: w.value
      }), {
        ...n,
        prepend: C ? (P) => {
          var $, R;
          return p(ke, null, [(($ = n.label) == null ? void 0 : $.call(n, P)) ?? (e.label ? p(Ja, {
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
          return p("div", {
            class: "v-slider__container",
            onMousedown: g.value ? void 0 : f,
            onTouchstartPassive: g.value ? void 0 : h
          }, [p("input", {
            id: $.value,
            name: e.name || $.value,
            disabled: !!e.disabled,
            readonly: !!e.readonly,
            tabindex: "-1",
            value: s.value
          }, null), p($S, {
            ref: v,
            start: 0,
            stop: x.value
          }, {
            "tick-label": n["tick-label"]
          }), p(MS, {
            ref: r,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (H) => s.value = H,
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
}), RS = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...xe()
}, "VColorPickerPreview"), OS = Zt({
  name: "VColorPickerPreview",
  props: RS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    ml(() => i.abort());
    async function r() {
      if (!Ec) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = zh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Ii,
          ...s
        });
      } catch {
      }
    }
    return he(() => {
      var o, l;
      return p("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [Ec && p("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [p(Qe, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), p("div", {
        class: "v-color-picker-preview__dot"
      }, [p("div", {
        style: {
          background: Fh(e.color ?? Ii)
        }
      }, null)]), p("div", {
        class: "v-color-picker-preview__sliders"
      }, [p(_f, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ii,
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
      }, null), !e.hideAlpha && p(_f, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ii,
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
}), BS = {
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
}, FS = {
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
}, DS = {
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
}, HS = {
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
}, zS = {
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
}, jS = {
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
}, GS = {
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
}, US = {
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
}, WS = {
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
}, qS = {
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
}, YS = {
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
}, KS = {
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
}, XS = {
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
}, ZS = {
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
}, JS = {
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
}, QS = {
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
}, eC = {
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
}, tC = {
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
}, nC = {
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
}, iC = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, rC = {
  red: BS,
  pink: FS,
  purple: DS,
  deepPurple: HS,
  indigo: zS,
  blue: jS,
  lightBlue: GS,
  cyan: US,
  teal: WS,
  green: qS,
  lightGreen: YS,
  lime: KS,
  yellow: XS,
  amber: ZS,
  orange: JS,
  deepOrange: QS,
  brown: eC,
  blueGrey: tC,
  grey: nC,
  shades: iC
}, oC = Z({
  swatches: {
    type: Array,
    default: () => lC(rC)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...xe()
}, "VColorPickerSwatches");
function lC(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const sC = Zt({
  name: "VColorPickerSwatches",
  props: oC(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    return he(() => p("div", {
      class: ["v-color-picker-swatches", e.class],
      style: [{
        maxHeight: ge(e.maxHeight)
      }, e.style]
    }, [p("div", null, [e.swatches.map((i) => p("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Tt(r), l = Sl(o), s = Bh(o);
      return p("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [p("div", {
        style: {
          background: s
        }
      }, [e.color && bi(e.color, l) ? p(Be, {
        size: "x-small",
        icon: "$success",
        color: Ox(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Qv = Z({
  color: String,
  ...wi(),
  ...xe(),
  ...Un(),
  ...Vn(),
  ...Wr(),
  ...Il(),
  ...ht(),
  ...Oe(),
  ...ze()
}, "VSheet"), Sf = ce()({
  name: "VSheet",
  props: Qv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = St(se(e, "color")), {
      borderClasses: l
    } = xi(e), {
      dimensionStyles: s
    } = Wn(e), {
      elevationClasses: a
    } = Ln(e), {
      locationStyles: u
    } = qr(e), {
      positionClasses: c
    } = Pl(e), {
      roundedClasses: d
    } = vt(e);
    return he(() => p(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, d.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), aC = Z({
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
    validator: (e) => Object.keys(hi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(hi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(hi).includes(t))
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
  ...Xt(Qv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), aE = Zt({
  name: "VColorPicker",
  props: aC(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = Pe(e, "mode"), n = ie(null), i = Pe(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = Sl(Tt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? bS(a, e.modelValue) : null), r = k(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = Qt();
    let l = !0;
    pe(i, (a) => {
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
    return qt(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), hn({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), he(() => {
      const a = Sf.filterProps(e);
      return p(Sf, ve({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Fh({
            ...r.value ?? Ii,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && p(yS, {
          key: "canvas",
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled,
          dotSize: e.dotSize,
          width: e.width,
          height: e.canvasHeight
        }, null), (!e.hideSliders || !e.hideInputs) && p("div", {
          key: "controls",
          class: "v-color-picker__controls"
        }, [!e.hideSliders && p(OS, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && p(kS, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && p(sC, {
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
}), Ar = Symbol.for("vuetify:v-expansion-panel"), uC = ["default", "accordion", "inset", "popout"], cC = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => uC.includes(e)
  },
  readonly: Boolean,
  ...xe(),
  ...Cl(),
  ...Oe(),
  ...ze()
}, "VExpansionPanels"), Cf = ce()({
  name: "VExpansionPanels",
  props: cC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    zr(e, Ar);
    const {
      themeClasses: i
    } = Ke(e), r = k(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return hn({
      VExpansionPanel: {
        color: se(e, "color"),
        readonly: se(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: se(e, "focusable"),
        static: se(e, "static")
      }
    }), he(() => p(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), fC = Z({
  ...xe(),
  ...Nl()
}, "VExpansionPanelText"), dC = ce()({
  name: "VExpansionPanelText",
  props: fC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(Ar);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = Ka(e, i.isSelected);
    return he(() => p(xv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [We(p("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && p("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[fn, i.isSelected.value]])];
      }
    })), {};
  }
}), em = Z({
  color: String,
  expandIcon: {
    type: Ie,
    default: "$expand"
  },
  collapseIcon: {
    type: Ie,
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
  ...xe()
}, "VExpansionPanelTitle"), hC = ce()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: _i
  },
  props: em(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ne(Ar);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = St(e, "color"), l = k(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return he(() => {
      var s;
      return We(p("button", {
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
      }, [p("span", {
        class: "v-expansion-panel-title__overlay"
      }, null), (s = n.default) == null ? void 0 : s.call(n, l.value), !e.hideActions && p("span", {
        class: "v-expansion-panel-title__icon"
      }, [n.actions ? n.actions(l.value) : p(Be, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[Wt("ripple"), e.ripple]]);
    }), {};
  }
}), vC = Z({
  title: String,
  text: String,
  bgColor: String,
  ...xe(),
  ...Vn(),
  ...kl(),
  ...Nl(),
  ...ht(),
  ...Oe(),
  ...em()
}, "VExpansionPanel"), uE = ce()({
  name: "VExpansionPanel",
  props: vC(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = El(e, Ar), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = St(e, "bgColor"), {
      elevationClasses: l
    } = Ln(e), {
      roundedClasses: s
    } = vt(e), a = k(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = k(() => i.group.items.value.reduce((f, h, v) => (i.group.selected.value.includes(h.id) && f.push(v), f), [])), c = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === 1);
    }), d = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === -1);
    });
    return et(Ar, i), hn({
      VExpansionPanelText: {
        eager: se(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: se(e, "readonly")
      }
    }), he(() => {
      const f = !!(n.text || e.text), h = !!(n.title || e.title);
      return p(e.tag, {
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
          return [p("div", {
            class: ["v-expansion-panel__shadow", ...l.value]
          }, null), h && p(hC, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && p(dC, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), Ks = Symbol.for("vuetify:list");
function tm() {
  const e = Ne(Ks, {
    hasPrepend: ye(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: ye(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return et(Ks, t), e;
}
function nm() {
  return Ne(Ks, null);
}
const su = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = we(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
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
}, im = (e) => {
  const t = su(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = we(o);
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
}, mC = (e) => {
  const t = su(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = we(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, gC = (e) => {
  const t = im(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = we(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, yC = {
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
}, rm = {
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
}, pC = {
  open: rm.open,
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
}, au = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = we(i), e && !r) {
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
}, om = (e) => {
  const t = au(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = we(o);
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
}, bC = (e) => {
  const t = au(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = we(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, wC = (e) => {
  const t = om(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = we(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, xC = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = we(i);
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
}, $r = Symbol.for("vuetify:nested"), lm = {
  id: ye(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ie(/* @__PURE__ */ new Map()),
    children: ie(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ie(!1),
    selectable: ie(!1),
    opened: ie(/* @__PURE__ */ new Set()),
    activated: ie(/* @__PURE__ */ new Set()),
    selected: ie(/* @__PURE__ */ new Map()),
    selectedValues: ie([])
  }
}, _C = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), SC = (e) => {
  let t = !1;
  const n = ie(/* @__PURE__ */ new Map()), i = ie(/* @__PURE__ */ new Map()), r = Pe(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = k(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return mC(e.mandatory);
      case "single-leaf":
        return gC(e.mandatory);
      case "independent":
        return su(e.mandatory);
      case "single-independent":
      default:
        return im(e.mandatory);
    }
  }), l = k(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return wC(e.mandatory);
      case "leaf":
        return bC(e.mandatory);
      case "independent":
        return au(e.mandatory);
      case "single-independent":
        return om(e.mandatory);
      case "classic":
      default:
        return xC(e.mandatory);
    }
  }), s = k(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return pC;
      case "single":
        return yC;
      case "multiple":
      default:
        return rm;
    }
  }), a = Pe(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = Pe(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  Yt(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const d = Ze("nested"), f = {
    id: ye(),
    root: {
      opened: r,
      activatable: se(e, "activatable"),
      selectable: se(e, "selectable"),
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
          n.value.set(v, m.filter((y) => y !== h));
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
        const y = s.value.open({
          id: h,
          value: v,
          opened: new Set(r.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        y && (r.value = y);
      },
      openOnSelect: (h, v, m) => {
        const y = s.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          opened: new Set(r.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        y && (r.value = y);
      },
      select: (h, v, m) => {
        d.emit("click:select", {
          id: h,
          value: v,
          path: c(h),
          event: m
        });
        const y = l.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        y && (u.value = y), f.root.openOnSelect(h, v, m);
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
        const y = o.value.activate({
          id: h,
          value: v,
          activated: new Set(a.value),
          children: n.value,
          parents: i.value,
          event: m
        });
        y && (a.value = y);
      },
      children: n,
      parents: i
    }
  };
  return et($r, f), f.root;
}, sm = (e, t) => {
  const n = Ne($r, lm), i = Symbol(Ct()), r = k(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: k(() => n.root.opened.value.has(r.value)),
    parent: k(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: k(() => n.root.activated.value.has(we(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: k(() => n.root.selected.value.get(we(r.value)) === "on"),
    isIndeterminate: k(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: k(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), Yt(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && et($r, o), o;
}, CC = () => {
  const e = Ne($r, lm);
  et($r, {
    ...e,
    isGroupActivator: !0
  });
}, kC = Zt({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return CC(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), EC = Z({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: Ie,
    default: "$collapse"
  },
  expandIcon: {
    type: Ie,
    default: "$expand"
  },
  prependIcon: Ie,
  appendIcon: Ie,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...xe(),
  ...Oe()
}, "VListGroup"), kf = ce()({
  name: "VListGroup",
  props: EC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = sm(se(e, "value"), !0), l = k(() => `v-list-group--id-${String(o.value)}`), s = nm(), {
      isBooted: a
    } = Yv();
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
    return he(() => p(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": i.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && p(Ye, {
        defaults: f.value
      }, {
        default: () => [p(kC, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), p(bn, {
        transition: {
          component: xv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [We(p("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[fn, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), VC = Wi("v-list-item-subtitle"), LC = Wi("v-list-item-title"), IC = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: Ie,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: Ie,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: jt(),
  onClickOnce: jt(),
  ...wi(),
  ...xe(),
  ...$t(),
  ...Un(),
  ...Vn(),
  ...ht(),
  ...Ml(),
  ...Oe(),
  ...ze(),
  ...In({
    variant: "text"
  })
}, "VListItem"), ol = ce()({
  name: "VListItem",
  directives: {
    Ripple: _i
  },
  props: IC(),
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
    } = sm(l, !1), y = nm(), g = k(() => {
      var B;
      return e.active !== !1 && (e.active || ((B = o.isActive) == null ? void 0 : B.value) || (h.activatable.value ? a.value : c.value));
    }), w = k(() => e.link !== !1 && o.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!y && (h.selectable.value || h.activatable.value || e.value != null))), b = k(() => e.rounded || e.nav), x = k(() => e.color ?? e.activeColor), E = k(() => ({
      color: g.value ? x.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    pe(() => {
      var B;
      return (B = o.isActive) == null ? void 0 : B.value;
    }, (B) => {
      B && v.value != null && h.open(v.value, !0), B && m(B);
    }, {
      immediate: !0
    });
    const {
      themeClasses: C
    } = Ke(e), {
      borderClasses: P
    } = xi(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: H
    } = Yi(E), {
      densityClasses: I
    } = Jt(e), {
      dimensionStyles: N
    } = Wn(e), {
      elevationClasses: S
    } = Ln(e), {
      roundedClasses: O
    } = vt(b), M = k(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), G = k(() => ({
      isActive: g.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: d.value
    }));
    function A(B) {
      var z;
      r("click", B), !(f || !_.value) && ((z = o.navigate) == null || z.call(o, B), h.activatable ? s(!a.value, B) : (h.selectable || e.value != null) && u(!c.value, B));
    }
    function F(B) {
      (B.key === "Enter" || B.key === " ") && (B.preventDefault(), A(B));
    }
    return he(() => {
      const B = w.value ? "a" : e.tag, z = i.title || e.title != null, Y = i.subtitle || e.subtitle != null, Q = !!(e.appendAvatar || e.appendIcon), ae = !!(Q || i.append), de = !!(e.prependAvatar || e.prependIcon), J = !!(de || i.prepend);
      return y == null || y.updateHasPrepend(J), e.activeColor && kx("active-color", ["color", "base-color"]), We(p(B, {
        class: ["v-list-item", {
          "v-list-item--active": g.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": _.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (y == null ? void 0 : y.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && g.value
        }, C.value, P.value, $.value, I.value, S.value, M.value, O.value, H.value, e.class],
        style: [R.value, N.value, e.style],
        href: o.href.value,
        tabindex: _.value ? y ? -2 : 0 : void 0,
        onClick: A,
        onKeydown: _.value && !w.value && F
      }, {
        default: () => {
          var ue;
          return [qi(_.value || g.value, "v-list-item"), J && p("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? p(Ye, {
            key: "prepend-defaults",
            disabled: !de,
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
              return [(Ee = i.prepend) == null ? void 0 : Ee.call(i, G.value)];
            }
          }) : p(ke, null, [e.prependAvatar && p(gi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && p(Be, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), p("div", {
            class: "v-list-item__spacer"
          }, null)]), p("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [z && p(LC, {
            key: "title"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.title) == null ? void 0 : Ee.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && p(VC, {
            key: "subtitle"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.subtitle) == null ? void 0 : Ee.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (ue = i.default) == null ? void 0 : ue.call(i, G.value)]), ae && p("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? p(Ye, {
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
              return [(Ee = i.append) == null ? void 0 : Ee.call(i, G.value)];
            }
          }) : p(ke, null, [e.appendIcon && p(Be, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(gi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), p("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Wt("ripple"), _.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: y,
      select: u
    };
  }
}), PC = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...xe(),
  ...Oe()
}, "VListSubheader"), TC = ce()({
  name: "VListSubheader",
  props: PC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = Gt(se(e, "color"));
    return he(() => {
      const o = !!(n.default || e.title);
      return p(e.tag, {
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
          return [o && p("div", {
            class: "v-list-subheader__text"
          }, [((l = n.default) == null ? void 0 : l.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), MC = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...xe(),
  ...ze()
}, "VDivider"), AC = ce()({
  name: "VDivider",
  props: MC(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = Ke(e), {
      textColorClasses: r,
      textColorStyles: o
    } = Gt(se(e, "color")), l = k(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = ge(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ge(e.thickness)), s;
    });
    return he(() => p("hr", {
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
}), $C = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), am = ce()({
  name: "VListChildren",
  props: $C(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return tm(), () => {
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
          })) ?? p(AC, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? p(TC, s, null);
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
        }, d = kf.filterProps(s);
        return l ? p(kf, ve({
          value: s == null ? void 0 : s.value
        }, d), {
          activator: (v) => {
            let {
              props: m
            } = v;
            const y = {
              ...s,
              ...m,
              value: e.returnObject ? u : s.value
            };
            return n.header ? n.header({
              props: y
            }) : p(ol, y, c);
          },
          default: () => p(am, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : p(ol, ve(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), um = Z({
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
    default: bi
  }
}, "list-items");
function Xs(e, t) {
  const n = yn(t, e.itemTitle, t), i = yn(t, e.itemValue, n), r = yn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Xt(t, ["children"]) : t : void 0 : yn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? cm(e, r) : void 0,
    raw: t
  };
}
function cm(e, t) {
  const n = [];
  for (const i of t)
    n.push(Xs(e, i));
  return n;
}
function NC(e) {
  const t = k(() => cm(e, e.items)), n = k(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? Xs(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || Xs(e, l));
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
function RC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function OC(e, t) {
  const n = yn(t, e.itemType, "item"), i = RC(t) ? t : yn(t, e.itemTitle), r = yn(t, e.itemValue, void 0), o = yn(t, e.itemChildren), l = e.itemProps === !0 ? Xt(t, ["children"]) : yn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? fm(e, o) : void 0,
    raw: t
  };
}
function fm(e, t) {
  const n = [];
  for (const i of t)
    n.push(OC(e, i));
  return n;
}
function BC(e) {
  return {
    items: k(() => fm(e, e.items))
  };
}
const FC = Z({
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
  ..._C({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...wi(),
  ...xe(),
  ...$t(),
  ...Un(),
  ...Vn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...um(),
  ...ht(),
  ...Oe(),
  ...ze(),
  ...In({
    variant: "text"
  })
}, "VList"), DC = ce()({
  name: "VList",
  props: FC(),
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
    } = BC(e), {
      themeClasses: r
    } = Ke(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = St(se(e, "bgColor")), {
      borderClasses: s
    } = xi(e), {
      densityClasses: a
    } = Jt(e), {
      dimensionStyles: u
    } = Wn(e), {
      elevationClasses: c
    } = Ln(e), {
      roundedClasses: d
    } = vt(e), {
      children: f,
      open: h,
      parents: v,
      select: m
    } = SC(e), y = k(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = se(e, "activeColor"), w = se(e, "baseColor"), _ = se(e, "color");
    tm(), hn({
      VListGroup: {
        activeColor: g,
        baseColor: w,
        color: _,
        expandIcon: se(e, "expandIcon"),
        collapseIcon: se(e, "collapseIcon")
      },
      VListItem: {
        activeClass: se(e, "activeClass"),
        activeColor: g,
        baseColor: w,
        color: _,
        density: se(e, "density"),
        disabled: se(e, "disabled"),
        lines: se(e, "lines"),
        nav: se(e, "nav"),
        slim: se(e, "slim"),
        variant: se(e, "variant")
      }
    });
    const b = ye(!1), x = ie();
    function E(I) {
      b.value = !0;
    }
    function C(I) {
      b.value = !1;
    }
    function P(I) {
      var N;
      !b.value && !(I.relatedTarget && ((N = x.value) != null && N.contains(I.relatedTarget))) && H();
    }
    function $(I) {
      if (x.value) {
        if (I.key === "ArrowDown")
          H("next");
        else if (I.key === "ArrowUp")
          H("prev");
        else if (I.key === "Home")
          H("first");
        else if (I.key === "End")
          H("last");
        else
          return;
        I.preventDefault();
      }
    }
    function R(I) {
      b.value = !0;
    }
    function H(I) {
      if (x.value)
        return Yo(x.value, I);
    }
    return he(() => p(e.tag, {
      ref: x,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, o.value, s.value, a.value, c.value, y.value, d.value, e.class],
      style: [l.value, u.value, e.style],
      tabindex: e.disabled || b.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: E,
      onFocusout: C,
      onFocus: P,
      onKeydown: $,
      onMousedown: R
    }, {
      default: () => [p(am, {
        items: i.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: m,
      focus: H,
      children: f,
      parents: v
    };
  }
}), HC = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...Xt(Xr({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: qa
    }
  }), ["absolute"])
}, "VMenu"), zC = ce()({
  name: "VMenu",
  props: HC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = Kr(), o = Ct(), l = k(() => e.id || `v-menu-${o}`), s = ie(), a = Ne(js, null), u = ye(0);
    et(js, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !vx(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, _, b;
      const y = m.relatedTarget, g = m.target;
      await He(), i.value && y !== g && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((_ = s.value) != null && _.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(g) && // It isn't inside the menu body
      !s.value.contentEl.contains(g) && ((b = Lr(s.value.contentEl)[0]) == null || b.focus());
    }
    pe(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(m) {
      a == null || a.closeParents(m);
    }
    function f(m) {
      var y, g, w;
      e.disabled || m.key === "Tab" && (Ph(Lr((y = s.value) == null ? void 0 : y.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (g = s.value) == null ? void 0 : g.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var g;
      if (e.disabled) return;
      const y = (g = s.value) == null ? void 0 : g.contentEl;
      y && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), Yo(y, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Yo(y, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = k(() => ve({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return he(() => {
      const m = jn.filterProps(e);
      return p(jn, ve({
        ref: s,
        id: l.value,
        class: ["v-menu", e.class],
        style: e.style
      }, m, {
        modelValue: i.value,
        "onUpdate:modelValue": (y) => i.value = y,
        absolute: !0,
        activatorProps: v.value,
        "onClick:outside": d,
        onKeydown: f
      }, r), {
        activator: n.activator,
        default: function() {
          for (var y = arguments.length, g = new Array(y), w = 0; w < y; w++)
            g[w] = arguments[w];
          return p(Ye, {
            root: "VMenu"
          }, {
            default: () => {
              var _;
              return [(_ = n.default) == null ? void 0 : _.call(n, ...g)];
            }
          });
        }
      });
    }), qn({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), jC = ["color", "file", "time", "date", "datetime-local", "week", "month"], dm = Z({
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
  ...Xi(),
  ...eu()
}, "VTextField"), Ef = ce()({
  name: "VTextField",
  directives: {
    Intersect: mv
  },
  inheritAttrs: !1,
  props: dm(),
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
    } = Ki(e), u = k(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = k(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = k(() => ["plain", "underlined"].includes(e.variant));
    function f(E, C) {
      var P, $;
      !e.autofocus || !E || ($ = (P = C[0].target) == null ? void 0 : P.focus) == null || $.call(P);
    }
    const h = ie(), v = ie(), m = ie(), y = k(() => jC.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
    function g() {
      var E;
      m.value !== document.activeElement && ((E = m.value) == null || E.focus()), l.value || s();
    }
    function w(E) {
      i("mousedown:control", E), E.target !== m.value && (g(), E.preventDefault());
    }
    function _(E) {
      g(), i("click:control", E);
    }
    function b(E) {
      E.stopPropagation(), g(), He(() => {
        o.value = null, Ih(e["onClick:clear"], E);
      });
    }
    function x(E) {
      var P;
      const C = E.target;
      if (o.value = C.value, (P = e.modelModifiers) != null && P.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [C.selectionStart, C.selectionEnd];
        He(() => {
          C.selectionStart = $[0], C.selectionEnd = $[1];
        });
      }
    }
    return he(() => {
      const E = !!(r.counter || e.counter !== !1 && e.counter != null), C = !!(E || r.details), [P, $] = Hr(n), {
        modelValue: R,
        ...H
      } = cn.filterProps(e), I = Mv(e);
      return p(cn, ve({
        ref: h,
        modelValue: o.value,
        "onUpdate:modelValue": (N) => o.value = N,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, P, H, {
        centerAffix: !d.value,
        focused: l.value
      }), {
        ...r,
        default: (N) => {
          let {
            id: S,
            isDisabled: O,
            isDirty: M,
            isReadonly: G,
            isValid: A
          } = N;
          return p(tu, ve({
            ref: v,
            onMousedown: w,
            onClick: _,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, I, {
            id: S.value,
            active: y.value || M.value,
            dirty: M.value || e.dirty,
            disabled: O.value,
            focused: l.value,
            error: A.value === !1
          }), {
            ...r,
            default: (F) => {
              let {
                props: {
                  class: B,
                  ...z
                }
              } = F;
              const Y = We(p("input", ve({
                ref: m,
                value: o.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: G.value,
                disabled: O.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: g,
                onBlur: a
              }, z, $), null), [[Wt("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return p(ke, null, [e.prefix && p("span", {
                class: "v-text-field__prefix"
              }, [p("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? p("div", {
                class: B,
                "data-no-activator": ""
              }, [r.default(), Y]) : xn(Y, {
                class: B
              }), e.suffix && p("span", {
                class: "v-text-field__suffix"
              }, [p("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: C ? (N) => {
          var S;
          return p(ke, null, [(S = r.details) == null ? void 0 : S.call(r, N), E && p(ke, null, [p("span", null, null), p(Pv, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), qn({}, h, v, m);
  }
}), GC = Z({
  renderless: Boolean,
  ...xe()
}, "VVirtualScrollItem"), UC = ce()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: GC(),
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
    } = ji(void 0, "border");
    pe(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), he(() => {
      var s, a;
      return e.renderless ? p(ke, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : p("div", ve({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), WC = -1, qC = 1, us = 100, YC = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function KC(e, t) {
  const n = Ya(), i = ye(0);
  un(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = ye(0), o = ye(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = ye(0), s = ye(0), a = ie(), u = ie();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = ji();
  un(() => {
    d.value = a.value;
  });
  const h = k(() => {
    var F;
    return a.value === document.documentElement ? n.height.value : ((F = f.value) == null ? void 0 : F.height) || parseInt(e.height) || 0;
  }), v = k(() => !!(a.value && u.value && h.value && i.value));
  let m = Array.from({
    length: t.value.length
  }), y = Array.from({
    length: t.value.length
  });
  const g = ye(0);
  let w = -1;
  function _(F) {
    return m[F] || i.value;
  }
  const b = cx(() => {
    const F = performance.now();
    y[0] = 0;
    const B = t.value.length;
    for (let z = 1; z <= B - 1; z++)
      y[z] = (y[z - 1] || 0) + _(z - 1);
    g.value = Math.max(g.value, performance.now() - F);
  }, g), x = pe(v, (F) => {
    F && (x(), c = u.value.offsetTop, b.immediate(), O(), ~w && He(() => {
      Te && window.requestAnimationFrame(() => {
        G(w), w = -1;
      });
    }));
  });
  lt(() => {
    b.clear();
  });
  function E(F, B) {
    const z = m[F], Y = i.value;
    i.value = Y ? Math.min(i.value, B) : B, (z !== B || Y !== i.value) && (m[F] = B, b());
  }
  function C(F) {
    return F = wt(F, 0, t.value.length - 1), y[F] || 0;
  }
  function P(F) {
    return XC(y, F);
  }
  let $ = 0, R = 0, H = 0;
  pe(h, (F, B) => {
    B && (O(), F < B && requestAnimationFrame(() => {
      R = 0, O();
    }));
  });
  function I() {
    if (!a.value || !u.value) return;
    const F = a.value.scrollTop, B = performance.now();
    B - H > 500 ? (R = Math.sign(F - $), c = u.value.offsetTop) : R = F - $, $ = F, H = B, O();
  }
  function N() {
    !a.value || !u.value || (R = 0, H = 0, O());
  }
  let S = -1;
  function O() {
    cancelAnimationFrame(S), S = requestAnimationFrame(M);
  }
  function M() {
    if (!a.value || !h.value) return;
    const F = $ - c, B = Math.sign(R), z = Math.max(0, F - us), Y = wt(P(z), 0, t.value.length), Q = F + h.value + us, ae = wt(P(Q) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (B !== WC || Y < r.value) && (B !== qC || ae > o.value)
    ) {
      const de = C(r.value) - C(Y), J = C(ae) - C(o.value);
      Math.max(de, J) > us ? (r.value = Y, o.value = ae) : (Y <= 0 && (r.value = Y), ae >= t.value.length && (o.value = ae));
    }
    l.value = C(r.value), s.value = C(t.value.length) - C(o.value);
  }
  function G(F) {
    const B = C(F);
    !a.value || F && !B ? w = F : a.value.scrollTop = B;
  }
  const A = k(() => t.value.slice(r.value, o.value).map((F, B) => ({
    raw: F,
    index: B + r.value
  })));
  return pe(t, () => {
    m = Array.from({
      length: t.value.length
    }), y = Array.from({
      length: t.value.length
    }), b.immediate(), O();
  }, {
    deep: !0
  }), {
    containerRef: a,
    markerRef: u,
    computedItems: A,
    paddingTop: l,
    paddingBottom: s,
    scrollToIndex: G,
    handleScroll: I,
    handleScrollend: N,
    handleItemResize: E
  };
}
function XC(e, t) {
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
const ZC = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...YC(),
  ...xe(),
  ...Un()
}, "VVirtualScroll"), JC = ce()({
  name: "VVirtualScroll",
  props: ZC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ze("VVirtualScroll"), {
      dimensionStyles: r
    } = Wn(e), {
      containerRef: o,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: d,
      paddingBottom: f,
      computedItems: h
    } = KC(e, se(e, "items"));
    return mi(() => e.renderless, () => {
      function v() {
        var g, w;
        const y = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[y]("scroll", s, {
          passive: !0
        }), document[y]("scrollend", a)) : ((g = o.value) == null || g[y]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[y]("scrollend", a));
      }
      qt(() => {
        o.value = qh(i.vnode.el, !0), v(!0);
      }), lt(v);
    }), he(() => {
      const v = h.value.map((m) => p(UC, {
        key: m.index,
        renderless: e.renderless,
        "onUpdate:height": (y) => u(m.index, y)
      }, {
        default: (y) => {
          var g;
          return (g = n.default) == null ? void 0 : g.call(n, {
            item: m.raw,
            index: m.index,
            ...y
          });
        }
      }));
      return e.renderless ? p(ke, null, [p("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ge(d.value)
        }
      }, null), v, p("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ge(f.value)
        }
      }, null)]) : p("div", {
        ref: o,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: a,
        style: [r.value, e.style]
      }, [p("div", {
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
function QC(e, t) {
  const n = ye(!1);
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
        const a = pe(n, () => {
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
const ek = Z({
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
    type: Ie,
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
  ...um({
    itemChildren: !1
  })
}, "Select"), tk = Z({
  ...ek(),
  ...Xt(dm({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Yr({
    transition: {
      component: qa
    }
  })
}, "VSelect"), cE = ce()({
  name: "VSelect",
  props: tk(),
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
    } = Ur(), r = ie(), o = ie(), l = ie(), s = Pe(e, "menu"), a = k({
      get: () => s.value,
      set: (A) => {
        var F;
        s.value && !A && ((F = o.value) != null && F.ΨopenChildren) || (s.value = A);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = NC(e), f = Pe(e, "modelValue", [], (A) => c(A === null ? [null] : an(A)), (A) => {
      const F = d(A);
      return e.multiple ? F : F[0] ?? null;
    }), h = k(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Av(), m = k(() => f.value.map((A) => A.value)), y = ye(!1), g = k(() => a.value ? e.closeText : e.openText);
    let w = "", _;
    const b = k(() => e.hideSelected ? u.value.filter((A) => !f.value.some((F) => F === A)) : u.value), x = k(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = k(() => {
      var A;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((A = e.menuProps) == null ? void 0 : A.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), C = ie(), {
      onListScroll: P,
      onListKeydown: $
    } = QC(C, r);
    function R(A) {
      e.openOnClear && (a.value = !0);
    }
    function H() {
      x.value || (a.value = !a.value);
    }
    function I(A) {
      var Q, ae;
      if (!A.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(A.key) && A.preventDefault(), ["Enter", "ArrowDown", " "].includes(A.key) && (a.value = !0), ["Escape", "Tab"].includes(A.key) && (a.value = !1), A.key === "Home" ? (Q = C.value) == null || Q.focus("first") : A.key === "End" && ((ae = C.value) == null || ae.focus("last"));
      const F = 1e3;
      function B(de) {
        const J = de.key.length === 1, ue = !de.ctrlKey && !de.metaKey && !de.altKey;
        return J && ue;
      }
      if (e.multiple || !B(A)) return;
      const z = performance.now();
      z - _ > F && (w = ""), w += A.key.toLowerCase(), _ = z;
      const Y = u.value.find((de) => de.title.toLowerCase().startsWith(w));
      Y !== void 0 && (f.value = [Y]);
    }
    function N(A) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!A.props.disabled)
        if (e.multiple) {
          const B = f.value.findIndex((Y) => e.valueComparator(Y.value, A.value)), z = F ?? !~B;
          if (~B) {
            const Y = z ? [...f.value, A] : [...f.value];
            Y.splice(B, 1), f.value = Y;
          } else z && (f.value = [...f.value, A]);
        } else {
          const B = F !== !1;
          f.value = B ? [A] : [], He(() => {
            a.value = !1;
          });
        }
    }
    function S(A) {
      var F;
      (F = C.value) != null && F.$el.contains(A.relatedTarget) || (a.value = !1);
    }
    function O() {
      var A;
      y.value && ((A = r.value) == null || A.focus());
    }
    function M(A) {
      y.value = !0;
    }
    function G(A) {
      if (A == null) f.value = [];
      else if (Ko(r.value, ":autofill") || Ko(r.value, ":-webkit-autofill")) {
        const F = u.value.find((B) => B.title === A);
        F && N(F);
      } else r.value && (r.value.value = "");
    }
    return pe(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const A = b.value.findIndex((F) => f.value.some((B) => e.valueComparator(B.value, F.value)));
        Te && window.requestAnimationFrame(() => {
          var F;
          A >= 0 && ((F = l.value) == null || F.scrollToIndex(A));
        });
      }
    }), pe(() => e.items, (A, F) => {
      a.value || y.value && !F.length && A.length && (a.value = !0);
    }), he(() => {
      const A = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), B = f.value.length > 0, z = Ef.filterProps(e), Y = B || !y.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return p(Ef, ve({
        ref: r
      }, z, {
        modelValue: f.value.map((Q) => Q.props.value).join(", "),
        "onUpdate:modelValue": G,
        focused: y.value,
        "onUpdate:focused": (Q) => y.value = Q,
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
        "onMousedown:control": H,
        onBlur: S,
        onKeydown: I,
        "aria-label": i(g.value),
        title: i(g.value)
      }), {
        ...n,
        default: () => p(ke, null, [p(zC, ve({
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
          onAfterLeave: O
        }, E.value), {
          default: () => [F && p(DC, ve({
            ref: C,
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
              var Q, ae, de;
              return [(Q = n["prepend-item"]) == null ? void 0 : Q.call(n), !b.value.length && !e.hideNoData && (((ae = n["no-data"]) == null ? void 0 : ae.call(n)) ?? p(ol, {
                title: i(e.noDataText)
              }, null)), p(JC, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var Et;
                  let {
                    item: ue,
                    index: Ee,
                    itemRef: je
                  } = J;
                  const at = ve(ue.props, {
                    ref: je,
                    key: Ee,
                    onClick: () => N(ue, null)
                  });
                  return ((Et = n.item) == null ? void 0 : Et.call(n, {
                    item: ue,
                    index: Ee,
                    props: at
                  })) ?? p(ol, ve(at, {
                    role: "option"
                  }), {
                    prepend: (en) => {
                      let {
                        isSelected: V
                      } = en;
                      return p(ke, null, [e.multiple && !e.hideSelected ? p(Ws, {
                        key: ue.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && p(gi, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && p(Be, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (de = n["append-item"]) == null ? void 0 : de.call(n)];
            }
          })]
        }), f.value.map((Q, ae) => {
          function de(je) {
            je.stopPropagation(), je.preventDefault(), N(Q, !1);
          }
          const J = {
            "onClick:close": de,
            onMousedown(je) {
              je.preventDefault(), je.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ue = A ? !!n.chip : !!n.selection, Ee = ue ? Th(A ? n.chip({
            item: Q,
            index: ae,
            props: J
          }) : n.selection({
            item: Q,
            index: ae
          })) : void 0;
          if (!(ue && !Ee))
            return p("div", {
              key: Q.value,
              class: "v-select__selection"
            }, [A ? n.chip ? p(Ye, {
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
            }) : p(Iv, ve({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Q.title,
              disabled: Q.props.disabled
            }, J), null) : Ee ?? p("span", {
              class: "v-select__selection-text"
            }, [Q.title, e.multiple && ae < f.value.length - 1 && p("span", {
              class: "v-select__selection-comma"
            }, [Ue(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var Q = arguments.length, ae = new Array(Q), de = 0; de < Q; de++)
            ae[de] = arguments[de];
          return p(ke, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...ae), e.menuIcon ? p(Be, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), qn({
      isFocused: y,
      menu: a,
      select: N
    }, r);
  }
}), nk = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Xi(),
  ...ou()
}, "VSwitch"), ir = ce()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: nk(),
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
    } = Ll(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = Ki(e), c = ie(), d = k(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = Ct(), h = k(() => e.id || `switch-${f}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(y) {
      var g, w;
      y.stopPropagation(), y.preventDefault(), (w = (g = c.value) == null ? void 0 : g.input) == null || w.click();
    }
    return he(() => {
      const [y, g] = Hr(n), w = cn.filterProps(e), _ = rl.filterProps(e);
      return p(cn, ve({
        class: ["v-switch", {
          "v-switch--flat": e.flat
        }, {
          "v-switch--inset": e.inset
        }, {
          "v-switch--indeterminate": r.value
        }, l.value, e.class]
      }, y, w, {
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
            messagesId: E,
            isDisabled: C,
            isReadonly: P,
            isValid: $
          } = b;
          const R = {
            model: o,
            isValid: $
          };
          return p(rl, ve({
            ref: c
          }, _, {
            modelValue: o.value,
            "onUpdate:modelValue": [(H) => o.value = H, v],
            id: x.value,
            "aria-describedby": E.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: C.value,
            readonly: P.value,
            onFocus: a,
            onBlur: u
          }, g), {
            ...i,
            default: (H) => {
              let {
                backgroundColorClasses: I,
                backgroundColorStyles: N
              } = H;
              return p("div", {
                class: ["v-switch__track", ...I.value],
                style: N.value,
                onClick: m
              }, [i["track-true"] && p("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [i["track-true"](R)]), i["track-false"] && p("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [i["track-false"](R)])]);
            },
            input: (H) => {
              let {
                inputNode: I,
                icon: N,
                backgroundColorClasses: S,
                backgroundColorStyles: O
              } = H;
              return p(ke, null, [I, p("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": N || e.loading
                }, e.inset ? void 0 : S.value],
                style: e.inset ? void 0 : O.value
              }, [i.thumb ? p(Ye, {
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
              }) : p(bv, null, {
                default: () => [e.loading ? p(Ua, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : d.value
                }, {
                  default: (M) => i.loader ? i.loader(M) : p(Qh, {
                    active: M.isActive,
                    color: M.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && p(Be, {
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
}), ik = /* @__PURE__ */ Ui({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = ie(n.isWelcome), r = ie(n.config.showNodeLabels), o = ie(n.config.nodePhysicsEnabled), l = ie(n.config.showLinkLabels), s = ie(n.config.fixedLinkDistanceEnabled), a = ie(n.config.zoomEnabled), u = ie(String(n.config.nodeRadius)), c = ie(""), d = ie("black"), f = ie(""), h = ie(n.config.persistSettingsLocalStorage), v = t;
    function m() {
      h.value ? (localStorage.showNodeLabels = r.value, localStorage.enableNodePhysics = o.value, localStorage.showLinkLabels = l.value, localStorage.enableFixedLinkDistance = s.value, localStorage.enableZoom = a.value, localStorage.persistSettings = h.value) : localStorage.clear(), localStorage.wasHere = !0;
    }
    function y() {
      m(), v("update-settings", {
        showNodeLabels: r.value,
        nodePhysicsEnabled: o.value,
        showLinkLabels: l.value,
        fixedLinkDistanceEnabled: s.value,
        zoomEnabled: a.value,
        persistEnabled: h.value
      }), i.value = !1;
    }
    return (g, w) => (pt(), ln(Xa, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (_) => i.value = _),
      persistent: ""
    }, {
      activator: fe(({ props: _ }) => [
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: fe(({ props: b }) => [
            p(Qe, ve({
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
        p(Wa, { class: "pa-3" }, {
          default: fe(() => [
            n.isWelcome ? (pt(), ln(Mr, { key: 0 }, {
              default: fe(() => [
                Ue("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (pt(), ln(Mr, { key: 1 }, {
              default: fe(() => [
                Ue("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (pt(), ln(sr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: fe(() => [
                Ue(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Ot("", !0),
            p(vr, null, {
              default: fe(() => [
                p(Lt, null, {
                  default: fe(() => [
                    p(yo, { cols: "5" }, {
                      default: fe(() => [
                        p(Lt, null, {
                          default: fe(() => [
                            p(sr, { class: "py-5" }, {
                              default: fe(() => [
                                Ue("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, null, {
                          default: fe(() => [
                            p(Cf, null, {
                              default: fe(() => [
                                Ot("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, null, {
                          default: fe(() => [
                            p(yo, { class: "mx-0 px-0" }, {
                              default: fe(() => [
                                p(ir, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            p(yo, { class: "mx-0 px-0" }, {
                              default: fe(() => [
                                Ot("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            p(ir, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            Ot("", !0)
                          ]),
                          _: 1
                        }),
                        p(Lt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            Ot("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    p(il),
                    p(yo, { cols: "5" }, {
                      default: fe(() => [
                        p(Lt, null, {
                          default: fe(() => [
                            p(sr, { class: "py-5" }, {
                              default: fe(() => [
                                Ue("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, null, {
                          default: fe(() => [
                            p(Cf, null, {
                              default: fe(() => [
                                Ot("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, null, {
                          default: fe(() => [
                            p(ir, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": w[6] || (w[6] = (b) => l.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        p(Lt, null, {
                          default: fe(() => [
                            p(ir, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            Ot("", !0)
                          ]),
                          _: 1
                        }),
                        p(Lt, { class: "my-0 py-0" }, {
                          default: fe(() => [
                            p(sr, { class: "px-0" }, {
                              default: fe(() => [
                                Ue("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(Lt, { class: "py-0 my-0" }, {
                          default: fe(() => [
                            p(ir, {
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
            p(Al, null, {
              default: fe(() => [
                p(mS, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                p(il),
                p(Qe, {
                  color: "secondary",
                  variant: "text",
                  onClick: y
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
}), rk = /* @__PURE__ */ Ge("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), ok = /* @__PURE__ */ Ge("div", { class: "graph-host uninitialised" }, null, -1), lk = {
  key: 0,
  class: "button-container"
}, sk = { class: "info-text text-h5 text-grey" }, ak = /* @__PURE__ */ Ui({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = k(() => {
      const L = document.querySelectorAll("graph-editor");
      let D;
      for (let U = 0; U < L.length; U++) {
        const j = L[U], _e = Ft(j.shadowRoot).select(".graph-host.uninitialised");
        if (!_e.empty()) {
          _e.classed("uninitialised", !1), D = _e;
          break;
        }
      }
      return D === void 0 && (D = Ft(".graph-host.uninitialised"), D.classed("uninitialised", !1)), D;
    });
    vl(() => {
      S();
    }), qt(() => {
      O(), window.addEventListener("resize", le);
    }), ml(() => {
      window.removeEventListener("resize", le);
    });
    const i = ie(!1), r = ie(new bc()), o = ie(!1), l = Ut(new Vw());
    let s, a = 400, u = 400, c, d, f, h, v, m, y, g, w, _ = 0, b = 0, x = 1;
    t({
      getGraph: E,
      setGraph: C,
      printGraph: P,
      setNodeColor: $,
      setLinkColor: R,
      deleteNode: H,
      deleteLink: I,
      toggleNodeLabels: K,
      toggleLinkLabels: q,
      toggleZoom: ne,
      toggleNodePhysics: T,
      toggleFixedLinkDistance: W,
      toggleGraphEditingInGUI: N,
      resetView: le
    });
    function E() {
      return r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !0, !0);
    }
    function C(L) {
      if (typeof L == "string" && L !== "Graph is empty")
        te(L);
      else if (typeof L == "object") {
        const [D, U] = ix(L);
        me(), re(D, U);
      } else
        me();
    }
    function P() {
      console.log(r.value.toTGF(l.showNodeLabels, l.showLinkLabels));
    }
    function $(L, D) {
      if (D !== void 0) {
        const j = (Array.isArray(D) ? D : [D]).map(Number);
        for (const ee of j)
          v.selectAll("circle").filter((_e) => _e.id === ee).each((_e) => _e.color = L).style("fill", L);
      } else
        v.selectAll("circle").each((U) => U.color = L).style("fill", L);
    }
    function R(L, D) {
      if (D) {
        const U = Array.isArray(D) ? D : [D];
        X(U);
        for (const j of U)
          h.selectAll(".link").filter((ee) => ee.id === j).each((ee) => ee.color = L).style("stroke", L);
      } else
        X(r.value.links.map((U) => U.id)), h.selectAll(".link").each((U) => U.color = L).style("stroke", L);
      As(f, l, L);
    }
    function H(L) {
      const D = Array.isArray(L) ? L : [L];
      for (const U of D)
        v.selectAll("circle").filter((j) => j.id === U).each(function(j) {
          let ee = r.value.removeNode(j);
          if (ee !== void 0) {
            let [_e, Me] = ee;
            Zl(_e, n.value), Me.forEach((ut) => {
              tr(ut, n.value);
            });
          }
        });
      o.value = r.value.nodes.length > 0;
    }
    function I(L) {
      const D = Array.isArray(L) ? L : [L];
      for (const U of D)
        h.selectAll("path").filter((j) => j.id === U).each(function(j) {
          let ee = r.value.removeLink(j);
          ee !== void 0 && tr(ee, n.value);
        });
    }
    function N(L) {
      l.isGraphEditableInGUI = L;
    }
    function S() {
      const L = (D) => D === "false" ? !1 : !!D;
      localStorage.wasHere && (i.value = L(localStorage.wasHere)), localStorage.showNodeLabels && (l.showNodeLabels = L(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (l.nodePhysicsEnabled = L(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (l.showLinkLabels = L(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (l.fixedLinkDistanceEnabled = L(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (l.zoomEnabled = L(localStorage.enableZoom)), localStorage.persistSettings && (l.persistSettingsLocalStorage = L(localStorage.persistSettings));
    }
    function O() {
      a = n.value.node().clientWidth, u = n.value.node().clientHeight, c = dw(
        (L) => M(L, l.zoomEnabled),
        l.zoomEnabled
      ), f = ww(
        n.value,
        c,
        (L) => l.isGraphEditableInGUI ? Ee(L) : null,
        (L) => l.isGraphEditableInGUI ? ue(L) : null,
        (L) => {
          l.isGraphEditableInGUI && A(
            It(L, f.node())[0],
            It(L, f.node())[1]
          );
        }
      ), Sw(f, l, r.value.getNonDefaultLinkColors()), m = Cw(f), h = xw(f), v = _w(f), s = kw(r.value, l, a, u, () => F()), d = bw(s, a, u, l.nodeRadius), de();
    }
    function M(L, D = !0) {
      D && (_ = L.transform.x, b = L.transform.y, x = L.transform.k, f.attr("transform", `translate(${_},${b})scale(${x})`));
    }
    function G(L, D, U, j) {
      let ee = r.value.createLink(L.id, D.id, U, j);
      ee !== void 0 && mw(ee, n.value), de();
    }
    function A(L, D, U, j, ee) {
      let _e = r.value.createNode(
        L ?? a / 2,
        D ?? u / 2,
        U,
        j,
        ee
      );
      vw(_e, n.value), o.value = !0, de();
    }
    function F() {
      v.attr("transform", (L) => `translate(${L.x},${L.y})`), h.selectAll("path").attr("d", (L) => B(L)), ae(), de();
    }
    function B(L) {
      switch (z(L), L.pathType) {
        case gt.REFLEXIVE:
          return Sc(L.source, [a / 2, u / 2], l);
        case gt.ARC:
          return es(L.source, L.target, l);
        case gt.ARCREVERSE:
          return kc.reverse(es(L.source, L.target, l));
        case gt.LINE:
          return Ql(L.source, L.target, l);
        case gt.LINEREVERSE:
          return kc.reverse(Ql(L.source, L.target, l));
        default:
          return "";
      }
    }
    function z(L) {
      L.source.id === L.target.id ? L.pathType = gt.REFLEXIVE : Y(L.source, L.target) ? L.pathType = Q(L.source, L.target) ? gt.ARCREVERSE : gt.ARC : L.pathType = Q(L.source, L.target) ? gt.LINEREVERSE : gt.LINE;
    }
    function Y(L, D) {
      return L.id !== D.id && r.value.links.some((U) => U.target.id === L.id && U.source.id === D.id) && r.value.links.some((U) => U.target.id === D.id && U.source.id === L.id);
    }
    function Q(L, D) {
      return L.x > D.x;
    }
    function ae() {
      const L = y;
      if (L !== void 0) {
        const D = g;
        if (D !== void 0)
          m.attr("d", () => L.id === D.id ? Sc(L, [a / 2, u / 2], l) : Y(L, D) ? Ql(L, D, l) : es(L, D, l));
        else if (w !== void 0) {
          const U = [L.x, L.y];
          m.attr("d", Cc(U, w));
        }
      }
    }
    function de(L = 0.5) {
      h = h.data(r.value.links, (D) => D.id).join(
        (D) => {
          const U = D.append("g");
          return U.append("path").classed("link", !0).style("stroke", (j) => j.color ? j.color : "").attr("id", (j) => j.id).attr(
            "marker-end",
            (j) => j.color ? "url(#link-arrow-" + j.color : "url(#link-arrow)"
          ), U.append("path").classed("clickbox", !0).on("pointerdown", (j, ee) => {
            yw(ee, j.button, n.value);
            let _e = ee.color;
            if (j.button === 1 && (ii(j), l.isGraphEditableInGUI)) {
              let Me = r.value.removeLink(ee);
              Me !== void 0 && tr(Me, n.value), _e && (r.value.hasNonDefaultLinkColor(_e) || Jl(f, _e));
            }
          }), U.append("text").append("textPath").attr(
            "class",
            (j) => j.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (j) => `#${j.id}`).attr("startOffset", "50%").text((j) => j.label ? j.label : "add label").on("click", (j, ee) => {
            l.isGraphEditableInGUI && at(j, ee);
          }), U;
        },
        (D) => (D.selectChild("path").attr("marker-start", function(U) {
          var j;
          if ((j = U.pathType) != null && j.includes("REVERSE")) {
            let ee = "url(#link-arrow-reverse";
            return U.color && (ee += "-" + Er(U.color)), ee += ")", ee;
          } else
            return null;
        }).attr("marker-end", function(U) {
          var j;
          if ((j = U.pathType) != null && j.includes("REVERSE"))
            return null;
          {
            let ee = "url(#link-arrow";
            return U.color && (ee += "-" + Er(U.color)), ee += ")", ee;
          }
        }), D.selectChild("text").attr("class", (U) => {
          var j;
          return `${(j = U.pathType) == null ? void 0 : j.toLowerCase()}-path-text`;
        }).attr("dy", (U) => {
          var j;
          return U.pathType === gt.REFLEXIVE ? 15 : U.pathType == gt.LINEREVERSE ? -10 : (j = U.pathType) != null && j.includes("REVERSE") ? 20 : -10;
        }), D.selectChild("text").selectChild("textPath").classed("hidden", !l.showLinkLabels).attr("startOffset", (U) => {
          var j;
          return (j = U.pathType) != null && j.includes("REVERSE") ? "46%" : "50%";
        }), D)
      ), v = v.data(r.value.nodes, (D) => D.id).join(
        (D) => {
          const U = D.append("g").call(d).on("pointerdown", (j, ee) => {
            if (j.button === 1 && (ii(j), l.isGraphEditableInGUI)) {
              let _e = r.value.removeNode(ee);
              if (_e !== void 0) {
                let [Me, ut] = _e;
                Zl(Me, n.value), ut.forEach((Yn) => {
                  tr(Yn, n.value);
                });
              }
              o.value = r.value.nodes.length > 0, oe(), de();
            }
          });
          return U.append("circle").classed("node", !0).attr("id", (j) => j.id).attr("r", l.nodeRadius).style("fill", (j) => j.color ? j.color : "").on("mouseenter", (j, ee) => g = ee).on("mouseout", () => g = void 0).on("pointerdown", (j, ee) => {
            gw(ee, j.button, n.value), l.isGraphEditableInGUI && J(j, ee);
          }).on("pointerup", (j) => {
            l.isGraphEditableInGUI && ue(j);
          }), U.append("text").attr(
            "class",
            (j) => j.label ? "node-label" : "node-label-placeholder"
          ).text((j) => j.label ? j.label : "add label").attr("dy", "0.33em").on("click", (j, ee) => {
            l.isGraphEditableInGUI && je(j, ee);
          }).on("mouseenter", (j, ee) => g = ee).on("mouseout", () => g = void 0), U;
        },
        (D) => (D.selectChild("text").classed("hidden", !l.showNodeLabels), D)
      ), s.nodes(r.value.nodes), s.alpha(L).restart();
    }
    function J(L, D) {
      if (L.button !== 0)
        return;
      ii(L);
      const U = [D.x, D.y];
      w = U, y = D, m.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Cc(U, U)), de();
    }
    function ue(L) {
      const D = y, U = g;
      oe(), !(D === void 0 || U === void 0) && (ii(L), G(D, U));
    }
    function Ee(L) {
      if (ii(L), y !== void 0) {
        const D = V1(L, n.value.node())[0], U = [
          (D[0] - _) / x,
          (D[1] - b) / x
        ];
        L.pointerType === "touch" && (U[1] = U[1] - 4 * l.nodeRadius, g = r.value.nodes.find(
          (j) => Math.sqrt(Math.pow(j.x - U[0], 2) + Math.pow(j.y - U[1], 2)) < l.nodeRadius
        )), w = U, ae();
      }
    }
    function je(L, D) {
      const U = L == null ? void 0 : L.target;
      Et(D, U, [D.x, D.y]);
    }
    function at(L, D) {
      const U = L.target;
      let j = en(U);
      Et(D, U, j);
    }
    function Et(L, D, U) {
      var Yn;
      let j = L instanceof gh ? "node" : "link";
      const ee = document.createElement("input");
      ee.setAttribute("class", "label-input"), L.label == null ? ee.value = "" : ee.value = L.label, ee.placeholder = `Enter ${j} label`;
      let _e = !1;
      ee.onkeyup = function(Pn) {
        Pn.key === "Enter" ? (pw(L, ee.value, n.value), _e = !0, ee.blur()) : Pn.key === "Escape" && (ee.value = "", ee.blur());
      }, ee.onblur = function() {
        _e && (ee.value === "" ? (D.setAttribute("class", `${j}-label-placeholder`), D.textContent = "add label", L.label = void 0) : (D.setAttribute("class", `${j}-label`), D.textContent = ee.value.trim(), L.label = D.textContent)), Me.remove();
      };
      const Me = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      Me.setAttribute("width", "100%"), Me.setAttribute("height", "100%"), Me.setAttribute("x", `${U[0] - 80}`), Me.setAttribute("y", `${U[1] - 12}`), Me.append(ee);
      const ut = D.closest("svg");
      (Yn = ut == null ? void 0 : ut.querySelector("g")) == null || Yn.append(Me), ee.focus();
    }
    function en(L) {
      let D = n.value.select("svg").node().getBoundingClientRect(), U = L.getBoundingClientRect(), j = (U.x - D.x - _) / x, ee = (U.y - D.y - b) / x;
      return [j, ee];
    }
    function V(L) {
      K(L.showNodeLabels), T(L.nodePhysicsEnabled), q(L.showLinkLabels), W(L.fixedLinkDistanceEnabled), ne(L.zoomEnabled), l.persistSettingsLocalStorage = L.persistEnabled;
    }
    function T(L) {
      l.nodePhysicsEnabled = L, yh(s, L, a, u);
    }
    function W(L) {
      l.fixedLinkDistanceEnabled = L, ph(s, r.value, l, L);
    }
    function q(L) {
      l.showLinkLabels = L;
    }
    function K(L) {
      l.showNodeLabels = L;
    }
    function ne(L) {
      l.zoomEnabled = L, le();
    }
    function oe() {
      m == null || m.classed("hidden", !0).attr("marker-end", "null"), y = void 0, g = void 0, w = void 0;
    }
    function te(L) {
      let [D, U] = nx(L);
      me(), re(D, U);
    }
    function re(L, D) {
      for (let j of L)
        A(
          j.x,
          j.y,
          j.idImported,
          j.label,
          j.color
        );
      const U = (j) => r.value.nodes.find((ee) => ee.idImported === j);
      for (let j of D) {
        let ee = U(j.sourceIdImported), _e = U(j.targetIdImported);
        ee && _e && (G(ee, _e, j.label, j.color), j.color && As(f, l, j.color));
      }
    }
    function X(L) {
      for (let D of L) {
        const U = r.value.links.filter((j) => j.id === D).map((j) => j.color).shift();
        U && (r.value.hasNonDefaultLinkColor(U, D) ? r.value.getLinkIdsWithNonDefaultLinkColors(
          U,
          D
        ).every(
          (_e) => L.includes(_e)
        ) && Jl(f, U) : Jl(f, U));
      }
    }
    function le() {
      s.stop(), n.value.selectChildren().remove(), c = void 0, _ = 0, b = 0, x = 1, f = void 0, m = void 0, h = void 0, v = void 0, s = void 0, oe(), S(), O();
    }
    function me() {
      r.value.links.forEach((L) => tr(L, n.value)), r.value.nodes.forEach((L) => Zl(L, n.value)), r.value = new bc(), o.value = !1, le();
    }
    return (L, D) => (pt(), xs(ke, null, [
      rk,
      ok,
      l.hasToolbar ? (pt(), xs("div", lk, [
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: fe(({ props: U }) => [
            l.isGraphEditableInGUI ? (pt(), ln(Qe, ve({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, U, {
              variant: "plain",
              onClick: D[0] || (D[0] = (j) => A())
            }), null, 16)) : Ot("", !0)
          ]),
          _: 1
        }),
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: fe(({ props: U }) => [
            l.isGraphEditableInGUI ? (pt(), ln(Qe, ve({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, U, {
              variant: "plain",
              onClick: D[1] || (D[1] = (j) => me())
            }), null, 16)) : Ot("", !0)
          ]),
          _: 1
        }),
        p(Oi, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: fe(({ props: U }) => [
            l.zoomEnabled ? (pt(), ln(Qe, ve({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, U, {
              variant: "plain",
              onClick: D[2] || (D[2] = (j) => le())
            }), null, 16)) : Ot("", !0)
          ]),
          _: 1
        }),
        p(iS, {
          "graph-as-tgf": r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !1, !1),
          onFileImported: te
        }, null, 8, ["graph-as-tgf"]),
        p(fS),
        p(ik, {
          config: l,
          "is-welcome": !i.value,
          onUpdateSettings: V
        }, null, 8, ["config", "is-welcome"])
      ])) : Ot("", !0),
      We(Ge("div", sk, "Graph is empty", 512), [
        [fn, !o.value]
      ])
    ], 64));
  }
}), uk = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", ck = /* @__PURE__ */ ru(ak, [["styles", [uk]]]), Zs = {
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
function fk(e, t) {
  const n = [];
  let i = [];
  const r = hm(e), o = vm(e), l = (r.getDay() - Zs[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - Zs[t.slice(-2).toUpperCase()] + 7) % 7;
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
function dk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function hk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function hm(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function vm(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function vk(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const mk = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function mm(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (mk.test(e))
      return vk(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const Vf = new Date(2e3, 0, 2);
function gk(e) {
  const t = Zs[e.slice(-2).toUpperCase()];
  return $a(7).map((n) => {
    const i = new Date(Vf);
    return i.setDate(Vf.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function yk(e, t, n, i) {
  const r = mm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function pk(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Tc(String(n.getMonth() + 1), 2, "0"), o = Tc(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function bk(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function wk(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function xk(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function _k(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Sk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Ck(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function kk(e) {
  return e.getFullYear();
}
function Ek(e) {
  return e.getMonth();
}
function Vk(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function Lk(e) {
  return e.getHours();
}
function Ik(e) {
  return e.getMinutes();
}
function Pk(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Tk(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Mk(e, t) {
  return Js(e, t[0]) && $k(e, t[1]);
}
function Ak(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Js(e, t) {
  return e.getTime() > t.getTime();
}
function $k(e, t) {
  return e.getTime() < t.getTime();
}
function Lf(e, t) {
  return e.getTime() === t.getTime();
}
function Nk(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Rk(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Ok(e, t, n) {
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
function Bk(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Fk(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Dk(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Hk(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function zk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function jk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Gk {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return mm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return pk(this, t);
  }
  parseISO(t) {
    return bk(t);
  }
  addMinutes(t, n) {
    return wk(t, n);
  }
  addHours(t, n) {
    return xk(t, n);
  }
  addDays(t, n) {
    return _k(t, n);
  }
  addWeeks(t, n) {
    return Sk(t, n);
  }
  addMonths(t, n) {
    return Ck(t, n);
  }
  getWeekArray(t) {
    return fk(t, this.locale);
  }
  startOfWeek(t) {
    return dk(t);
  }
  endOfWeek(t) {
    return hk(t);
  }
  startOfMonth(t) {
    return hm(t);
  }
  endOfMonth(t) {
    return vm(t);
  }
  format(t, n) {
    return yk(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Lf(t, n);
  }
  isValid(t) {
    return Ak(t);
  }
  isWithinRange(t, n) {
    return Mk(t, n);
  }
  isAfter(t, n) {
    return Js(t, n);
  }
  isBefore(t, n) {
    return !Js(t, n) && !Lf(t, n);
  }
  isSameDay(t, n) {
    return Nk(t, n);
  }
  isSameMonth(t, n) {
    return Rk(t, n);
  }
  setMinutes(t, n) {
    return Fk(t, n);
  }
  setHours(t, n) {
    return Bk(t, n);
  }
  setMonth(t, n) {
    return Dk(t, n);
  }
  setYear(t, n) {
    return Hk(t, n);
  }
  getDiff(t, n, i) {
    return Ok(t, n, i);
  }
  getWeekdays() {
    return gk(this.locale);
  }
  getYear(t) {
    return kk(t);
  }
  getMonth(t) {
    return Ek(t);
  }
  getNextMonth(t) {
    return Vk(t);
  }
  getHours(t) {
    return Lk(t);
  }
  getMinutes(t) {
    return Ik(t);
  }
  startOfDay(t) {
    return zk(t);
  }
  endOfDay(t) {
    return jk(t);
  }
  startOfYear(t) {
    return Pk(t);
  }
  endOfYear(t) {
    return Tk(t);
  }
}
const Uk = Symbol.for("vuetify:date-options"), If = Symbol.for("vuetify:date-adapter");
function Wk(e, t) {
  const n = xt({
    adapter: Gk,
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
    instance: qk(n, t)
  };
}
function qk(e, t) {
  const n = Ut(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return pe(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const Yk = Symbol.for("vuetify:goto");
function Kk() {
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
function Xk(e, t) {
  return {
    rtl: t.isRtl,
    options: xt(Kk(), e)
  };
}
function gm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = xt(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = Bx(i.defaults), a = J_(i.display, i.ssr), u = Yx(i.theme), c = i_(i.icons), d = f_(i.locale), f = Wk(i.date, d), h = Xk(i.goTo, d);
  return {
    install: (m) => {
      for (const y in l)
        m.directive(y, l[y]);
      for (const y in o)
        m.component(y, o[y]);
      for (const y in r)
        m.component(y, Zt({
          ...r[y],
          name: y,
          aliasName: r[y].name
        }));
      if (u.install(m), m.provide(zi, s), m.provide(Gs, a), m.provide(Jo, u), m.provide(Bs, c), m.provide(Qo, d), m.provide(Uk, f.options), m.provide(If, f.instance), m.provide(Yk, h), Te && i.ssr)
        if (m.$nuxt)
          m.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: y
          } = m;
          m.mount = function() {
            const g = y(...arguments);
            return He(() => a.update()), m.mount = y, g;
          };
        }
      Ct.reset(), m.mixin({
        computed: {
          $vuetify() {
            return Ut({
              defaults: Ei.call(this, zi),
              display: Ei.call(this, Gs),
              theme: Ei.call(this, Jo),
              icons: Ei.call(this, Bs),
              locale: Ei.call(this, Qo),
              date: Ei.call(this, If)
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
const Zk = "3.5.9";
gm.version = Zk;
function Ei(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const Jk = {
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
}, Qk = {
  component: ja
};
var eE = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", tE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", nE = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", iE = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", rE = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", oE = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", lE = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
gm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...Jk,
      addNode: lE,
      deleteGraph: tE,
      help: iE,
      importExport: nE,
      resetView: oE,
      settings: eE,
      helpCircle: rE
    },
    sets: {
      mdi: Qk
    }
  }
});
customElements.define(
  "graph-editor",
  // GUI Version
  // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
  // CLI Version
  /* @__PURE__ */ O0(ck)
);
