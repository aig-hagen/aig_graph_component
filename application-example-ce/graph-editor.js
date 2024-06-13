var dm = Object.defineProperty;
var hm = (e, t, n) => t in e ? dm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ie = (e, t, n) => (hm(e, typeof t != "symbol" ? t + "" : t, n), n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qs(e, t) {
  const n = new Set(e.split(","));
  return t ? (i) => n.has(i.toLowerCase()) : (i) => n.has(i);
}
const Ae = {}, Pi = [], Vt = () => {
}, vm = () => !1, nl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ys = (e) => e.startsWith("onUpdate:"), Ne = Object.assign, Ks = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mm = Object.prototype.hasOwnProperty, Ee = (e, t) => mm.call(e, t), ye = Array.isArray, Ti = (e) => il(e) === "[object Map]", Ef = (e) => il(e) === "[object Set]", xe = (e) => typeof e == "function", He = (e) => typeof e == "string", ji = (e) => typeof e == "symbol", Me = (e) => e !== null && typeof e == "object", Vf = (e) => (Me(e) || xe(e)) && xe(e.then) && xe(e.catch), Lf = Object.prototype.toString, il = (e) => Lf.call(e), gm = (e) => il(e).slice(8, -1), Pf = (e) => il(e) === "[object Object]", Xs = (e) => He(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rr = /* @__PURE__ */ qs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), rl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, ym = /-(\w)/g, ot = rl((e) => e.replace(ym, (t, n) => n ? n.toUpperCase() : "")), pm = /\B([A-Z])/g, Nt = rl(
  (e) => e.replace(pm, "-$1").toLowerCase()
), xn = rl((e) => e.charAt(0).toUpperCase() + e.slice(1)), Al = rl((e) => e ? `on${xn(e)}` : ""), Fn = (e, t) => !Object.is(e, t), $l = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Eo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, bm = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, os = (e) => {
  const t = He(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let lu;
const Tf = () => lu || (lu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zs(e) {
  if (ye(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = He(i) ? Sm(i) : Zs(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (He(e) || Me(e))
    return e;
}
const wm = /;(?![^(]*\))/g, _m = /:([^]+)/, xm = /\/\*[^]*?\*\//g;
function Sm(e) {
  const t = {};
  return e.replace(xm, "").split(wm).forEach((n) => {
    if (n) {
      const i = n.split(_m);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function Js(e) {
  let t = "";
  if (He(e))
    t = e;
  else if (ye(e))
    for (let n = 0; n < e.length; n++) {
      const i = Js(e[n]);
      i && (t += i + " ");
    }
  else if (Me(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Cm = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", km = /* @__PURE__ */ qs(Cm);
function Mf(e) {
  return !!e || e === "";
}
const Xn = (e) => He(e) ? e : e == null ? "" : ye(e) || Me(e) && (e.toString === Lf || !xe(e.toString)) ? JSON.stringify(e, If, 2) : String(e), If = (e, t) => t && t.__v_isRef ? If(e, t.value) : Ti(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[Rl(i, o) + " =>"] = r, n),
    {}
  )
} : Ef(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Rl(n))
} : ji(t) ? Rl(t) : Me(t) && !ye(t) && !Pf(t) ? String(t) : t, Rl = (e, t = "") => {
  var n;
  return ji(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gt;
class Af {
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
function Qs(e) {
  return new Af(e);
}
function Em(e, t = gt) {
  t && t.active && t.effects.push(e);
}
function Vm() {
  return gt;
}
function lt(e) {
  gt && gt.cleanups.push(e);
}
let li;
class ea {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Em(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, mi();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Lm(n.computed), this._dirtyLevel >= 4))
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
    let t = On, n = li;
    try {
      return On = !0, li = this, this._runnings++, su(this), this.fn();
    } finally {
      au(this), this._runnings--, li = n, On = t;
    }
  }
  stop() {
    var t;
    this.active && (su(this), au(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Lm(e) {
  return e.value;
}
function su(e) {
  e._trackId++, e._depsLength = 0;
}
function au(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      $f(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function $f(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let On = !0, ls = 0;
const Rf = [];
function mi() {
  Rf.push(On), On = !1;
}
function gi() {
  const e = Rf.pop();
  On = e === void 0 ? !0 : e;
}
function ta() {
  ls++;
}
function na() {
  for (ls--; !ls && ss.length; )
    ss.shift()();
}
function Nf(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && $f(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const ss = [];
function Of(e, t, n) {
  ta();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && ss.push(i.scheduler)));
  }
  na();
}
const Bf = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Vo = /* @__PURE__ */ new WeakMap(), si = Symbol(""), as = Symbol("");
function ft(e, t, n) {
  if (On && li) {
    let i = Vo.get(e);
    i || Vo.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = Bf(() => i.delete(n))), Nf(
      li,
      r
    );
  }
}
function yn(e, t, n, i, r, o) {
  const l = Vo.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && ye(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !ji(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        ye(e) ? Xs(n) && s.push(l.get("length")) : (s.push(l.get(si)), Ti(e) && s.push(l.get(as)));
        break;
      case "delete":
        ye(e) || (s.push(l.get(si)), Ti(e) && s.push(l.get(as)));
        break;
      case "set":
        Ti(e) && s.push(l.get(si));
        break;
    }
  ta();
  for (const a of s)
    a && Of(
      a,
      4
    );
  na();
}
function Pm(e, t) {
  var n;
  return (n = Vo.get(e)) == null ? void 0 : n.get(t);
}
const Tm = /* @__PURE__ */ qs("__proto__,__v_isRef,__isVue"), Ff = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ji)
), uu = /* @__PURE__ */ Mm();
function Mm() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = pe(this);
      for (let o = 0, l = this.length; o < l; o++)
        ft(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(pe)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      mi(), ta();
      const i = pe(this)[t].apply(this, n);
      return na(), gi(), i;
    };
  }), e;
}
function Im(e) {
  const t = pe(this);
  return ft(t, "has", e), t.hasOwnProperty(e);
}
class Df {
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
      return i === (r ? o ? Gm : Uf : o ? jf : zf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = ye(t);
    if (!r) {
      if (l && Ee(uu, n))
        return Reflect.get(uu, n, i);
      if (n === "hasOwnProperty")
        return Im;
    }
    const s = Reflect.get(t, n, i);
    return (ji(n) ? Ff.has(n) : Tm(n)) || (r || ft(t, "get", n), o) ? s : Oe(s) ? l && Xs(n) ? s : s.value : Me(s) ? r ? Tr(s) : jt(s) : s;
  }
}
class Hf extends Df {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = Oi(o);
      if (!Lo(i) && !Oi(i) && (o = pe(o), i = pe(i)), !ye(t) && Oe(o) && !Oe(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = ye(t) && Xs(n) ? Number(n) < t.length : Ee(t, n), s = Reflect.set(t, n, i, r);
    return t === pe(r) && (l ? Fn(i, o) && yn(t, "set", n, i) : yn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Ee(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && yn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!ji(n) || !Ff.has(n)) && ft(t, "has", n), i;
  }
  ownKeys(t) {
    return ft(
      t,
      "iterate",
      ye(t) ? "length" : si
    ), Reflect.ownKeys(t);
  }
}
class Am extends Df {
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
const $m = /* @__PURE__ */ new Hf(), Rm = /* @__PURE__ */ new Am(), Nm = /* @__PURE__ */ new Hf(
  !0
), ia = (e) => e, ol = (e) => Reflect.getPrototypeOf(e);
function qr(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = pe(e), o = pe(t);
  n || (Fn(t, o) && ft(r, "get", t), ft(r, "get", o));
  const { has: l } = ol(r), s = i ? ia : n ? la : fr;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function Yr(e, t = !1) {
  const n = this.__v_raw, i = pe(n), r = pe(e);
  return t || (Fn(e, r) && ft(i, "has", e), ft(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Kr(e, t = !1) {
  return e = e.__v_raw, !t && ft(pe(e), "iterate", si), Reflect.get(e, "size", e);
}
function cu(e) {
  e = pe(e);
  const t = pe(this);
  return ol(t).has.call(t, e) || (t.add(e), yn(t, "add", e, e)), this;
}
function fu(e, t) {
  t = pe(t);
  const n = pe(this), { has: i, get: r } = ol(n);
  let o = i.call(n, e);
  o || (e = pe(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? Fn(t, l) && yn(n, "set", e, t) : yn(n, "add", e, t), this;
}
function du(e) {
  const t = pe(this), { has: n, get: i } = ol(t);
  let r = n.call(t, e);
  r || (e = pe(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && yn(t, "delete", e, void 0), o;
}
function hu() {
  const e = pe(this), t = e.size !== 0, n = e.clear();
  return t && yn(e, "clear", void 0, void 0), n;
}
function Xr(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = pe(l), a = t ? ia : e ? la : fr;
    return !e && ft(s, "iterate", si), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function Zr(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = pe(r), l = Ti(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? ia : t ? la : fr;
    return !t && ft(
      o,
      "iterate",
      a ? as : si
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
function Vn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Om() {
  const e = {
    get(o) {
      return qr(this, o);
    },
    get size() {
      return Kr(this);
    },
    has: Yr,
    add: cu,
    set: fu,
    delete: du,
    clear: hu,
    forEach: Xr(!1, !1)
  }, t = {
    get(o) {
      return qr(this, o, !1, !0);
    },
    get size() {
      return Kr(this);
    },
    has: Yr,
    add: cu,
    set: fu,
    delete: du,
    clear: hu,
    forEach: Xr(!1, !0)
  }, n = {
    get(o) {
      return qr(this, o, !0);
    },
    get size() {
      return Kr(this, !0);
    },
    has(o) {
      return Yr.call(this, o, !0);
    },
    add: Vn("add"),
    set: Vn("set"),
    delete: Vn("delete"),
    clear: Vn("clear"),
    forEach: Xr(!0, !1)
  }, i = {
    get(o) {
      return qr(this, o, !0, !0);
    },
    get size() {
      return Kr(this, !0);
    },
    has(o) {
      return Yr.call(this, o, !0);
    },
    add: Vn("add"),
    set: Vn("set"),
    delete: Vn("delete"),
    clear: Vn("clear"),
    forEach: Xr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Zr(
      o,
      !1,
      !1
    ), n[o] = Zr(
      o,
      !0,
      !1
    ), t[o] = Zr(
      o,
      !1,
      !0
    ), i[o] = Zr(
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
  Bm,
  Fm,
  Dm,
  Hm
] = /* @__PURE__ */ Om();
function ra(e, t) {
  const n = t ? e ? Hm : Dm : e ? Fm : Bm;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Ee(n, r) && r in i ? n : i,
    r,
    o
  );
}
const zm = {
  get: /* @__PURE__ */ ra(!1, !1)
}, jm = {
  get: /* @__PURE__ */ ra(!1, !0)
}, Um = {
  get: /* @__PURE__ */ ra(!0, !1)
}, zf = /* @__PURE__ */ new WeakMap(), jf = /* @__PURE__ */ new WeakMap(), Uf = /* @__PURE__ */ new WeakMap(), Gm = /* @__PURE__ */ new WeakMap();
function Wm(e) {
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
function qm(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wm(gm(e));
}
function jt(e) {
  return Oi(e) ? e : oa(
    e,
    !1,
    $m,
    zm,
    zf
  );
}
function Ym(e) {
  return oa(
    e,
    !1,
    Nm,
    jm,
    jf
  );
}
function Tr(e) {
  return oa(
    e,
    !0,
    Rm,
    Um,
    Uf
  );
}
function oa(e, t, n, i, r) {
  if (!Me(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = qm(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Mi(e) {
  return Oi(e) ? Mi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Oi(e) {
  return !!(e && e.__v_isReadonly);
}
function Lo(e) {
  return !!(e && e.__v_isShallow);
}
function Gf(e) {
  return Mi(e) || Oi(e);
}
function pe(e) {
  const t = e && e.__v_raw;
  return t ? pe(t) : e;
}
function Wf(e) {
  return Object.isExtensible(e) && Eo(e, "__v_skip", !0), e;
}
const fr = (e) => Me(e) ? jt(e) : e, la = (e) => Me(e) ? Tr(e) : e;
class qf {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ea(
      () => t(this._value),
      () => vo(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = pe(this);
    return (!t._cacheable || t.effect.dirty) && Fn(t._value, t._value = t.effect.run()) && vo(t, 4), Yf(t), t.effect._dirtyLevel >= 2 && vo(t, 2), t._value;
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
function Km(e, t, n = !1) {
  let i, r;
  const o = xe(e);
  return o ? (i = e, r = Vt) : (i = e.get, r = e.set), new qf(i, r, o || !r, n);
}
function Yf(e) {
  var t;
  On && li && (e = pe(e), Nf(
    li,
    (t = e.dep) != null ? t : e.dep = Bf(
      () => e.dep = void 0,
      e instanceof qf ? e : void 0
    )
  ));
}
function vo(e, t = 4, n) {
  e = pe(e);
  const i = e.dep;
  i && Of(
    i,
    t
  );
}
function Oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function re(e) {
  return Kf(e, !1);
}
function me(e) {
  return Kf(e, !0);
}
function Kf(e, t) {
  return Oe(e) ? e : new Xm(e, t);
}
class Xm {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : pe(t), this._value = n ? t : fr(t);
  }
  get value() {
    return Yf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Lo(t) || Oi(t);
    t = n ? t : pe(t), Fn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : fr(t), vo(this, 4));
  }
}
function Ft(e) {
  return Oe(e) ? e.value : e;
}
const Zm = {
  get: (e, t, n) => Ft(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return Oe(r) && !Oe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function Xf(e) {
  return Mi(e) ? e : new Proxy(e, Zm);
}
function sa(e) {
  const t = ye(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Zf(e, n);
  return t;
}
class Jm {
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
    return Pm(pe(this._object), this._key);
  }
}
class Qm {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function se(e, t, n) {
  return Oe(e) ? e : xe(e) ? new Qm(e) : Me(e) && arguments.length > 1 ? Zf(e, t, n) : re(e);
}
function Zf(e, t, n) {
  const i = e[t];
  return Oe(i) ? i : new Jm(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Bn(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    ll(r, t, n);
  }
}
function Pt(e, t, n, i) {
  if (xe(e)) {
    const o = Bn(e, t, n, i);
    return o && Vf(o) && o.catch((l) => {
      ll(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Pt(e[o], t, n, i));
  return r;
}
function ll(e, t, n, i = !0) {
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
      Bn(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  eg(e, n, r, i);
}
function eg(e, t, n, i = !0) {
  console.error(e);
}
let dr = !1, us = !1;
const Je = [];
let en = 0;
const Ii = [];
let Mn = null, Jn = 0;
const Jf = /* @__PURE__ */ Promise.resolve();
let aa = null;
function ze(e) {
  const t = aa || Jf;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tg(e) {
  let t = en + 1, n = Je.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = Je[i], o = hr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function ua(e) {
  (!Je.length || !Je.includes(
    e,
    dr && e.allowRecurse ? en + 1 : en
  )) && (e.id == null ? Je.push(e) : Je.splice(tg(e.id), 0, e), Qf());
}
function Qf() {
  !dr && !us && (us = !0, aa = Jf.then(td));
}
function ng(e) {
  const t = Je.indexOf(e);
  t > en && Je.splice(t, 1);
}
function ig(e) {
  ye(e) ? Ii.push(...e) : (!Mn || !Mn.includes(
    e,
    e.allowRecurse ? Jn + 1 : Jn
  )) && Ii.push(e), Qf();
}
function vu(e, t, n = dr ? en + 1 : 0) {
  for (; n < Je.length; n++) {
    const i = Je[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      Je.splice(n, 1), n--, i();
    }
  }
}
function ed(e) {
  if (Ii.length) {
    const t = [...new Set(Ii)].sort(
      (n, i) => hr(n) - hr(i)
    );
    if (Ii.length = 0, Mn) {
      Mn.push(...t);
      return;
    }
    for (Mn = t, Jn = 0; Jn < Mn.length; Jn++)
      Mn[Jn]();
    Mn = null, Jn = 0;
  }
}
const hr = (e) => e.id == null ? 1 / 0 : e.id, rg = (e, t) => {
  const n = hr(e) - hr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function td(e) {
  us = !1, dr = !0, Je.sort(rg);
  try {
    for (en = 0; en < Je.length; en++) {
      const t = Je[en];
      t && t.active !== !1 && Bn(t, null, 14);
    }
  } finally {
    en = 0, Je.length = 0, ed(), dr = !1, aa = null, (Je.length || Ii.length) && td();
  }
}
function og(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || Ae;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = i[c] || Ae;
    f && (r = n.map((h) => He(h) ? h.trim() : h)), d && (r = n.map(bm));
  }
  let s, a = i[s = Al(t)] || // also try camelCase event handler (#2249)
  i[s = Al(ot(t))];
  !a && o && (a = i[s = Al(Nt(t))]), a && Pt(
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
function nd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!xe(e)) {
    const a = (u) => {
      const c = nd(u, t, !0);
      c && (s = !0, Ne(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Me(e) && i.set(e, null), null) : (ye(o) ? o.forEach((a) => l[a] = null) : Ne(l, o), Me(e) && i.set(e, l), l);
}
function sl(e, t) {
  return !e || !nl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ee(e, t[0].toLowerCase() + t.slice(1)) || Ee(e, Nt(t)) || Ee(e, t));
}
let it = null, id = null;
function Po(e) {
  const t = it;
  return it = e, id = e && e.type.__scopeId || null, t;
}
function ue(e, t = it, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && Lu(-1);
    const o = Po(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Po(o), i._d && Lu(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function Nl(e) {
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
  const w = Po(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, x = b;
      y = Qt(
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
      y = Qt(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? a : lg(a);
    }
  } catch (b) {
    ar.length = 0, ll(b, e, 1), y = p(Tt);
  }
  let _ = y;
  if (g && m !== !1) {
    const b = Object.keys(g), { shapeFlag: x } = _;
    b.length && x & 7 && (l && b.some(Ys) && (g = sg(
      g,
      l
    )), _ = pn(_, g));
  }
  return n.dirs && (_ = pn(_), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition && (_.transition = n.transition), y = _, Po(w), y;
}
const lg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || nl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, sg = (e, t) => {
  const n = {};
  for (const i in e)
    (!Ys(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function ag(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? mu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== i[f] && !sl(u, f))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? mu(i, l, u) : !0 : !!l;
  return !1;
}
function mu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !sl(n, o))
      return !0;
  }
  return !1;
}
function ug({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const rd = "components", cg = "directives", od = Symbol.for("v-ndc");
function fg(e) {
  return He(e) ? ld(rd, e, !1) || e : e || od;
}
function Ut(e) {
  return ld(cg, e);
}
function ld(e, t, n = !0, i = !1) {
  const r = it || Ke;
  if (r) {
    const o = r.type;
    if (e === rd) {
      const s = o0(
        o,
        !1
      );
      if (s && (s === t || s === ot(t) || s === xn(ot(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      gu(r[e] || o[e], t) || // global registration
      gu(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function gu(e, t) {
  return e && (e[t] || e[ot(t)] || e[xn(ot(t))]);
}
const dg = (e) => e.__isSuspense;
function hg(e, t) {
  t && t.pendingBranch ? ye(e) ? t.effects.push(...e) : t.effects.push(e) : ig(e);
}
const vg = Symbol.for("v-scx"), mg = () => $e(vg);
function on(e, t) {
  return ca(e, null, t);
}
const Jr = {};
function ge(e, t, n) {
  return ca(e, t, n);
}
function ca(e, t, {
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
  if (Oe(e) ? (c = () => e.value, d = Lo(e)) : Mi(e) ? (c = () => u(e), d = !0) : ye(e) ? (f = !0, d = e.some((V) => Mi(V) || Lo(V)), c = () => e.map((V) => {
    if (Oe(V))
      return V.value;
    if (Mi(V))
      return u(V);
    if (xe(V))
      return Bn(V, a, 2);
  })) : xe(e) ? t ? c = () => Bn(e, a, 2) : c = () => (h && h(), Pt(
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
      Bn(V, a, 4), h = _.onStop = void 0;
    };
  }, m;
  if (hl)
    if (v = Vt, t ? n && Pt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const V = mg();
      m = V.__watcherHandles || (V.__watcherHandles = []);
    } else
      return Vt;
  let y = f ? new Array(e.length).fill(Jr) : Jr;
  const g = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const V = _.run();
        (i || d || (f ? V.some((C, T) => Fn(C, y[T])) : Fn(V, y))) && (h && h(), Pt(t, a, 3, [
          V,
          // pass undefined as the old value when it's changed for the first time
          y === Jr ? void 0 : f && y[0] === Jr ? [] : y,
          v
        ]), y = V);
      } else
        _.run();
  };
  g.allowRecurse = !!t;
  let w;
  r === "sync" ? w = g : r === "post" ? w = () => ut(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), w = () => ua(g));
  const _ = new ea(c, Vt, w), b = Vm(), x = () => {
    _.stop(), b && Ks(b.effects, _);
  };
  return t ? n ? g() : y = _.run() : r === "post" ? ut(
    _.run.bind(_),
    a && a.suspense
  ) : _.run(), m && m.push(x), x;
}
function gg(e, t, n) {
  const i = this.proxy, r = He(e) ? e.includes(".") ? sd(i, e) : () => i[e] : e.bind(i, i);
  let o;
  xe(t) ? o = t : (o = t.handler, n = t);
  const l = Ir(this), s = ca(r, o.bind(i), n);
  return l(), s;
}
function sd(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function ti(e, t, n = 0, i) {
  if (!Me(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), Oe(e))
    ti(e.value, t, n, i);
  else if (ye(e))
    for (let r = 0; r < e.length; r++)
      ti(e[r], t, n, i);
  else if (Ef(e) || Ti(e))
    e.forEach((r) => {
      ti(r, t, n, i);
    });
  else if (Pf(e))
    for (const r in e)
      ti(e[r], t, n, i);
  return e;
}
function Ge(e, t) {
  if (it === null)
    return e;
  const n = vl(it) || it.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = Ae] = t[r];
    o && (xe(o) && (o = {
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
function Wn(e, t, n, i) {
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
const In = Symbol("_leaveCb"), Qr = Symbol("_enterCb");
function ad() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Gt(() => {
    e.isMounted = !0;
  }), Wt(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ct = [Function, Array], ud = {
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
}, yg = {
  name: "BaseTransition",
  props: ud,
  setup(e, { slots: t }) {
    const n = ga(), i = ad();
    return () => {
      const r = t.default && fa(t.default(), !0);
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
      const l = pe(e), { mode: s } = l;
      if (i.isLeaving)
        return Ol(o);
      const a = yu(o);
      if (!a)
        return Ol(o);
      const u = vr(
        a,
        l,
        i,
        n
      );
      mr(a, u);
      const c = n.subTree, d = c && yu(c);
      if (d && d.type !== Tt && !Qn(a, d)) {
        const f = vr(
          d,
          l,
          i,
          n
        );
        if (mr(d, f), s === "out-in")
          return i.isLeaving = !0, f.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, Ol(o);
        s === "in-out" && a.type !== Tt && (f.delayLeave = (h, v, m) => {
          const y = cd(
            i,
            d
          );
          y[String(d.key)] = d, h[In] = () => {
            v(), h[In] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, pg = yg;
function cd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function vr(e, t, n, i) {
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
  } = t, _ = String(e.key), b = cd(n, e), x = (T, $) => {
    T && Pt(
      T,
      i,
      9,
      $
    );
  }, V = (T, $) => {
    const N = $[1];
    x(T, $), ye(T) ? T.every((z) => z.length <= 1) && N() : T.length <= 1 && N();
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
      T[In] && T[In](
        !0
        /* cancelled */
      );
      const N = b[_];
      N && Qn(e, N) && N.el[In] && N.el[In](), x($, [T]);
    },
    enter(T) {
      let $ = a, N = u, z = c;
      if (!n.isMounted)
        if (r)
          $ = y || a, N = g || u, z = w || c;
        else
          return;
      let P = !1;
      const R = T[Qr] = (S) => {
        P || (P = !0, S ? x(z, [T]) : x(N, [T]), C.delayedLeave && C.delayedLeave(), T[Qr] = void 0);
      };
      $ ? V($, [T, R]) : R();
    },
    leave(T, $) {
      const N = String(e.key);
      if (T[Qr] && T[Qr](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      x(d, [T]);
      let z = !1;
      const P = T[In] = (R) => {
        z || (z = !0, $(), R ? x(v, [T]) : x(h, [T]), T[In] = void 0, b[N] === e && delete b[N]);
      };
      b[N] = e, f ? V(f, [T, P]) : P();
    },
    clone(T) {
      return vr(T, t, n, i);
    }
  };
  return C;
}
function Ol(e) {
  if (al(e))
    return e = pn(e), e.children = null, e;
}
function yu(e) {
  return al(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function mr(e, t) {
  e.shapeFlag & 6 && e.component ? mr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function fa(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Se ? (l.patchFlag & 128 && r++, i = i.concat(
      fa(l.children, t, s)
    )) : (t || l.type !== Tt) && i.push(s != null ? pn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
  return xe(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ne({ name: e.name }, t, { setup: e })
  ) : e;
}
const mo = (e) => !!e.type.__asyncLoader, al = (e) => e.type.__isKeepAlive;
function bg(e, t) {
  fd(e, "a", t);
}
function wg(e, t) {
  fd(e, "da", t);
}
function fd(e, t, n = Ke) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (ul(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      al(r.parent.vnode) && _g(i, t, n, r), r = r.parent;
  }
}
function _g(e, t, n, i) {
  const r = ul(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  fl(() => {
    Ks(i[t], r);
  }, n);
}
function ul(e, t, n = Ke, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      mi();
      const s = Ir(n), a = Pt(t, n, e, l);
      return s(), gi(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const Sn = (e) => (t, n = Ke) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!hl || e === "sp") && ul(e, (...i) => t(...i), n)
), cl = Sn("bm"), Gt = Sn("m"), xg = Sn("bu"), dd = Sn("u"), Wt = Sn("bum"), fl = Sn("um"), Sg = Sn("sp"), Cg = Sn(
  "rtg"
), kg = Sn(
  "rtc"
);
function Eg(e, t = Ke) {
  ul("ec", e, t);
}
function Vg(e, t, n, i) {
  let r;
  const o = n && n[i];
  if (ye(e) || He(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o && o[l]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o && o[l]);
  } else if (Me(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, s) => t(l, s, void 0, o && o[s])
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let s = 0, a = l.length; s < a; s++) {
        const u = l[s];
        r[s] = t(e[u], u, s, o && o[s]);
      }
    }
  else
    r = [];
  return n && (n[i] = r), r;
}
const cs = (e) => e ? Cd(e) ? vl(e) || e.proxy : cs(e.parent) : null, or = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ne(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => cs(e.parent),
    $root: (e) => cs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => da(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ua(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ze.bind(e.proxy)),
    $watch: (e) => gg.bind(e)
  })
), Bl = (e, t) => e !== Ae && !e.__isScriptSetup && Ee(e, t), Lg = {
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
        if (Bl(i, t))
          return l[t] = 1, i[t];
        if (r !== Ae && Ee(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Ee(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== Ae && Ee(n, t))
          return l[t] = 4, n[t];
        fs && (l[t] = 0);
      }
    }
    const c = or[t];
    let d, f;
    if (c)
      return t === "$attrs" && ft(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== Ae && Ee(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Ee(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return Bl(r, t) ? (r[t] = n, !0) : i !== Ae && Ee(i, t) ? (i[t] = n, !0) : Ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== Ae && Ee(e, l) || Bl(t, l) || (s = o[0]) && Ee(s, l) || Ee(i, l) || Ee(or, l) || Ee(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function pu(e) {
  return ye(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let fs = !0;
function Pg(e) {
  const t = da(e), n = e.proxy, i = e.ctx;
  fs = !1, t.beforeCreate && bu(t.beforeCreate, e, "bc");
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
    renderTracked: V,
    renderTriggered: C,
    errorCaptured: T,
    serverPrefetch: $,
    // public API
    expose: N,
    inheritAttrs: z,
    // assets
    components: P,
    directives: R,
    filters: S
  } = t;
  if (u && Tg(u, i, null), l)
    for (const G in l) {
      const A = l[G];
      xe(A) && (i[G] = A.bind(n));
    }
  if (r) {
    const G = r.call(n, n);
    Me(G) && (e.data = jt(G));
  }
  if (fs = !0, o)
    for (const G in o) {
      const A = o[G], F = xe(A) ? A.bind(n, n) : xe(A.get) ? A.get.bind(n, n) : Vt, O = !xe(A) && xe(A.set) ? A.set.bind(n) : Vt, j = k({
        get: F,
        set: O
      });
      Object.defineProperty(i, G, {
        enumerable: !0,
        configurable: !0,
        get: () => j.value,
        set: (Y) => j.value = Y
      });
    }
  if (s)
    for (const G in s)
      hd(s[G], i, n, G);
  if (a) {
    const G = xe(a) ? a.call(n) : a;
    Reflect.ownKeys(G).forEach((A) => {
      et(A, G[A]);
    });
  }
  c && bu(c, e, "c");
  function I(G, A) {
    ye(A) ? A.forEach((F) => G(F.bind(n))) : A && G(A.bind(n));
  }
  if (I(cl, d), I(Gt, f), I(xg, h), I(dd, v), I(bg, m), I(wg, y), I(Eg, T), I(kg, V), I(Cg, C), I(Wt, w), I(fl, b), I(Sg, $), ye(N))
    if (N.length) {
      const G = e.exposed || (e.exposed = {});
      N.forEach((A) => {
        Object.defineProperty(G, A, {
          get: () => n[A],
          set: (F) => n[A] = F
        });
      });
    } else
      e.exposed || (e.exposed = {});
  x && e.render === Vt && (e.render = x), z != null && (e.inheritAttrs = z), P && (e.components = P), R && (e.directives = R);
}
function Tg(e, t, n = Vt) {
  ye(e) && (e = ds(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Me(r) ? "default" in r ? o = $e(
      r.from || i,
      r.default,
      !0
    ) : o = $e(r.from || i) : o = $e(r), Oe(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function bu(e, t, n) {
  Pt(
    ye(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function hd(e, t, n, i) {
  const r = i.includes(".") ? sd(n, i) : () => n[i];
  if (He(e)) {
    const o = t[e];
    xe(o) && ge(r, o);
  } else if (xe(e))
    ge(r, e.bind(n));
  else if (Me(e))
    if (ye(e))
      e.forEach((o) => hd(o, t, n, i));
    else {
      const o = xe(e.handler) ? e.handler.bind(n) : t[e.handler];
      xe(o) && ge(r, o, e);
    }
}
function da(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => To(a, u, l, !0)
  ), To(a, t, l)), Me(t) && o.set(t, a), a;
}
function To(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && To(e, o, n, !0), r && r.forEach(
    (l) => To(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = Mg[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const Mg = {
  data: wu,
  props: _u,
  emits: _u,
  // objects
  methods: tr,
  computed: tr,
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
  components: tr,
  directives: tr,
  // watch
  watch: Ag,
  // provide / inject
  provide: wu,
  inject: Ig
};
function wu(e, t) {
  return t ? e ? function() {
    return Ne(
      xe(e) ? e.call(this, this) : e,
      xe(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ig(e, t) {
  return tr(ds(e), ds(t));
}
function ds(e) {
  if (ye(e)) {
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
function tr(e, t) {
  return e ? Ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function _u(e, t) {
  return e ? ye(e) && ye(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ne(
    /* @__PURE__ */ Object.create(null),
    pu(e),
    pu(t ?? {})
  ) : t;
}
function Ag(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ne(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = tt(e[i], t[i]);
  return n;
}
function vd() {
  return {
    app: null,
    config: {
      isNativeTag: vm,
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
let $g = 0;
function Rg(e, t) {
  return function(i, r = null) {
    xe(i) || (i = Ne({}, i)), r != null && !Me(r) && (r = null);
    const o = vd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: $g++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: s0,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && xe(u.install) ? (l.add(u), u.install(a, ...c)) : xe(u) && (l.add(u), u(a, ...c))), a;
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
          return f.appContext = o, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, vl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = lr;
        lr = a;
        try {
          return u();
        } finally {
          lr = c;
        }
      }
    };
    return a;
  };
}
let lr = null;
function et(e, t) {
  if (Ke) {
    let n = Ke.provides;
    const i = Ke.parent && Ke.parent.provides;
    i === n && (n = Ke.provides = Object.create(i)), n[e] = t;
  }
}
function $e(e, t, n = !1) {
  const i = Ke || it;
  if (i || lr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : lr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && xe(t) ? t.call(i && i.proxy) : t;
  }
}
function Ng(e, t, n, i = !1) {
  const r = {}, o = {};
  Eo(o, dl, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), md(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : Ym(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Og(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = pe(r), [a] = e.propsOptions;
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
        if (sl(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Ee(o, f))
            h !== o[f] && (o[f] = h, u = !0);
          else {
            const v = ot(f);
            r[v] = hs(
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
    md(e, t, r, o) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Ee(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Nt(d)) === d || !Ee(t, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[d] = hs(
        a,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete r[d]);
    if (o !== s)
      for (const d in o)
        (!t || !Ee(t, d)) && (delete o[d], u = !0);
  }
  u && yn(e, "set", "$attrs");
}
function md(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (rr(a))
        continue;
      const u = t[a];
      let c;
      r && Ee(r, c = ot(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : sl(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = pe(n), u = s || Ae;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      n[d] = hs(
        r,
        a,
        d,
        u[d],
        e,
        !Ee(u, d)
      );
    }
  }
  return l;
}
function hs(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Ee(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && xe(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = Ir(r);
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
function gd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!xe(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = gd(d, t, !0);
      Ne(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Me(e) && i.set(e, Pi), Pi;
  if (ye(o))
    for (let c = 0; c < o.length; c++) {
      const d = ot(o[c]);
      xu(d) && (l[d] = Ae);
    }
  else if (o)
    for (const c in o) {
      const d = ot(c);
      if (xu(d)) {
        const f = o[c], h = l[d] = ye(f) || xe(f) ? { type: f } : Ne({}, f);
        if (h) {
          const v = ku(Boolean, h.type), m = ku(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Ee(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Me(e) && i.set(e, u), u;
}
function xu(e) {
  return e[0] !== "$" && !rr(e);
}
function Su(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Cu(e, t) {
  return Su(e) === Su(t);
}
function ku(e, t) {
  return ye(t) ? t.findIndex((n) => Cu(n, e)) : xe(t) && Cu(t, e) ? 0 : -1;
}
const yd = (e) => e[0] === "_" || e === "$stable", ha = (e) => ye(e) ? e.map(Qt) : [Qt(e)], Bg = (e, t, n) => {
  if (t._n)
    return t;
  const i = ue((...r) => ha(t(...r)), n);
  return i._c = !1, i;
}, pd = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (yd(r))
      continue;
    const o = e[r];
    if (xe(o))
      t[r] = Bg(r, o, i);
    else if (o != null) {
      const l = ha(o);
      t[r] = () => l;
    }
  }
}, bd = (e, t) => {
  const n = ha(t);
  e.slots.default = () => n;
}, Fg = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = pe(t), Eo(t, "_", n)) : pd(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && bd(e, t);
  Eo(e.slots, dl, 1);
}, Dg = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = Ae;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (Ne(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, pd(t, r)), l = t;
  } else
    t && (bd(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !yd(s) && l[s] == null && delete r[s];
};
function vs(e, t, n, i, r = !1) {
  if (ye(e)) {
    e.forEach(
      (f, h) => vs(
        f,
        t && (ye(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (mo(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? vl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === Ae ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (He(u) ? (c[u] = null, Ee(d, u) && (d[u] = null)) : Oe(u) && (u.value = null)), xe(a))
    Bn(a, s, 12, [l, c]);
  else {
    const f = He(a), h = Oe(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const m = f ? Ee(d, a) ? d[a] : c[a] : a.value;
          r ? ye(m) && Ks(m, o) : ye(m) ? m.includes(o) || m.push(o) : f ? (c[a] = [o], Ee(d, a) && (d[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else
          f ? (c[a] = l, Ee(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, ut(v, n)) : v();
    }
  }
}
const ut = hg;
function Hg(e) {
  return zg(e);
}
function zg(e, t) {
  const n = Tf();
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
  } = e, m = (E, M, W, q = null, K = null, ne = null, oe = void 0, te = null, ie = !!M.dynamicChildren) => {
    if (E === M)
      return;
    E && !Qn(E, M) && (q = ae(E), Y(E, K, ne, !0), E = null), M.patchFlag === -2 && (ie = !1, M.dynamicChildren = null);
    const { type: X, ref: L, shapeFlag: H } = M;
    switch (X) {
      case Mr:
        y(E, M, W, q);
        break;
      case Tt:
        g(E, M, W, q);
        break;
      case Dl:
        E == null && w(M, W, q, oe);
        break;
      case Se:
        P(
          E,
          M,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie
        );
        break;
      default:
        H & 1 ? x(
          E,
          M,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie
        ) : H & 6 ? R(
          E,
          M,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie
        ) : (H & 64 || H & 128) && X.process(
          E,
          M,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie,
          Ze
        );
    }
    L != null && K && vs(L, E && E.ref, ne, M || E, !M);
  }, y = (E, M, W, q) => {
    if (E == null)
      i(
        M.el = s(M.children),
        W,
        q
      );
    else {
      const K = M.el = E.el;
      M.children !== E.children && u(K, M.children);
    }
  }, g = (E, M, W, q) => {
    E == null ? i(
      M.el = a(M.children || ""),
      W,
      q
    ) : M.el = E.el;
  }, w = (E, M, W, q) => {
    [E.el, E.anchor] = v(
      E.children,
      M,
      W,
      q,
      E.el,
      E.anchor
    );
  }, _ = ({ el: E, anchor: M }, W, q) => {
    let K;
    for (; E && E !== M; )
      K = f(E), i(E, W, q), E = K;
    i(M, W, q);
  }, b = ({ el: E, anchor: M }) => {
    let W;
    for (; E && E !== M; )
      W = f(E), r(E), E = W;
    r(M);
  }, x = (E, M, W, q, K, ne, oe, te, ie) => {
    M.type === "svg" ? oe = "svg" : M.type === "math" && (oe = "mathml"), E == null ? V(
      M,
      W,
      q,
      K,
      ne,
      oe,
      te,
      ie
    ) : $(
      E,
      M,
      K,
      ne,
      oe,
      te,
      ie
    );
  }, V = (E, M, W, q, K, ne, oe, te) => {
    let ie, X;
    const { props: L, shapeFlag: H, transition: U, dirs: D } = E;
    if (ie = E.el = l(
      E.type,
      ne,
      L && L.is,
      L
    ), H & 8 ? c(ie, E.children) : H & 16 && T(
      E.children,
      ie,
      null,
      q,
      K,
      Fl(E, ne),
      oe,
      te
    ), D && Wn(E, null, q, "created"), C(ie, E, E.scopeId, oe, q), L) {
      for (const _e in L)
        _e !== "value" && !rr(_e) && o(
          ie,
          _e,
          null,
          L[_e],
          ne,
          E.children,
          q,
          K,
          J
        );
      "value" in L && o(ie, "value", null, L.value, ne), (X = L.onVnodeBeforeMount) && Jt(X, q, E);
    }
    D && Wn(E, null, q, "beforeMount");
    const ee = jg(K, U);
    ee && U.beforeEnter(ie), i(ie, M, W), ((X = L && L.onVnodeMounted) || ee || D) && ut(() => {
      X && Jt(X, q, E), ee && U.enter(ie), D && Wn(E, null, q, "mounted");
    }, K);
  }, C = (E, M, W, q, K) => {
    if (W && h(E, W), q)
      for (let ne = 0; ne < q.length; ne++)
        h(E, q[ne]);
    if (K) {
      let ne = K.subTree;
      if (M === ne) {
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
  }, T = (E, M, W, q, K, ne, oe, te, ie = 0) => {
    for (let X = ie; X < E.length; X++) {
      const L = E[X] = te ? An(E[X]) : Qt(E[X]);
      m(
        null,
        L,
        M,
        W,
        q,
        K,
        ne,
        oe,
        te
      );
    }
  }, $ = (E, M, W, q, K, ne, oe) => {
    const te = M.el = E.el;
    let { patchFlag: ie, dynamicChildren: X, dirs: L } = M;
    ie |= E.patchFlag & 16;
    const H = E.props || Ae, U = M.props || Ae;
    let D;
    if (W && qn(W, !1), (D = U.onVnodeBeforeUpdate) && Jt(D, W, M, E), L && Wn(M, E, W, "beforeUpdate"), W && qn(W, !0), X ? N(
      E.dynamicChildren,
      X,
      te,
      W,
      q,
      Fl(M, K),
      ne
    ) : oe || A(
      E,
      M,
      te,
      null,
      W,
      q,
      Fl(M, K),
      ne,
      !1
    ), ie > 0) {
      if (ie & 16)
        z(
          te,
          M,
          H,
          U,
          W,
          q,
          K
        );
      else if (ie & 2 && H.class !== U.class && o(te, "class", null, U.class, K), ie & 4 && o(te, "style", H.style, U.style, K), ie & 8) {
        const ee = M.dynamicProps;
        for (let _e = 0; _e < ee.length; _e++) {
          const Ve = ee[_e], Re = H[Ve], at = U[Ve];
          (at !== Re || Ve === "value") && o(
            te,
            Ve,
            Re,
            at,
            K,
            E.children,
            W,
            q,
            J
          );
        }
      }
      ie & 1 && E.children !== M.children && c(te, M.children);
    } else
      !oe && X == null && z(
        te,
        M,
        H,
        U,
        W,
        q,
        K
      );
    ((D = U.onVnodeUpdated) || L) && ut(() => {
      D && Jt(D, W, M, E), L && Wn(M, E, W, "updated");
    }, q);
  }, N = (E, M, W, q, K, ne, oe) => {
    for (let te = 0; te < M.length; te++) {
      const ie = E[te], X = M[te], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ie.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ie.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qn(ie, X) || // - In the case of a component, it could contain anything.
        ie.shapeFlag & 70) ? d(ie.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          W
        )
      );
      m(
        ie,
        X,
        L,
        null,
        q,
        K,
        ne,
        oe,
        !0
      );
    }
  }, z = (E, M, W, q, K, ne, oe) => {
    if (W !== q) {
      if (W !== Ae)
        for (const te in W)
          !rr(te) && !(te in q) && o(
            E,
            te,
            W[te],
            null,
            oe,
            M.children,
            K,
            ne,
            J
          );
      for (const te in q) {
        if (rr(te))
          continue;
        const ie = q[te], X = W[te];
        ie !== X && te !== "value" && o(
          E,
          te,
          X,
          ie,
          oe,
          M.children,
          K,
          ne,
          J
        );
      }
      "value" in q && o(E, "value", W.value, q.value, oe);
    }
  }, P = (E, M, W, q, K, ne, oe, te, ie) => {
    const X = M.el = E ? E.el : s(""), L = M.anchor = E ? E.anchor : s("");
    let { patchFlag: H, dynamicChildren: U, slotScopeIds: D } = M;
    D && (te = te ? te.concat(D) : D), E == null ? (i(X, W, q), i(L, W, q), T(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      M.children || [],
      W,
      L,
      K,
      ne,
      oe,
      te,
      ie
    )) : H > 0 && H & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    E.dynamicChildren ? (N(
      E.dynamicChildren,
      U,
      W,
      K,
      ne,
      oe,
      te
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (M.key != null || K && M === K.subTree) && va(
      E,
      M,
      !0
      /* shallow */
    )) : A(
      E,
      M,
      W,
      L,
      K,
      ne,
      oe,
      te,
      ie
    );
  }, R = (E, M, W, q, K, ne, oe, te, ie) => {
    M.slotScopeIds = te, E == null ? M.shapeFlag & 512 ? K.ctx.activate(
      M,
      W,
      q,
      oe,
      ie
    ) : S(
      M,
      W,
      q,
      K,
      ne,
      oe,
      ie
    ) : B(E, M, ie);
  }, S = (E, M, W, q, K, ne, oe) => {
    const te = E.component = e0(
      E,
      q,
      K
    );
    if (al(E) && (te.ctx.renderer = Ze), t0(te), te.asyncDep) {
      if (K && K.registerDep(te, I), !E.el) {
        const ie = te.subTree = p(Tt);
        g(null, ie, M, W);
      }
    } else
      I(
        te,
        E,
        M,
        W,
        K,
        ne,
        oe
      );
  }, B = (E, M, W) => {
    const q = M.component = E.component;
    if (ag(E, M, W))
      if (q.asyncDep && !q.asyncResolved) {
        G(q, M, W);
        return;
      } else
        q.next = M, ng(q.update), q.effect.dirty = !0, q.update();
    else
      M.el = E.el, q.vnode = M;
  }, I = (E, M, W, q, K, ne, oe) => {
    const te = () => {
      if (E.isMounted) {
        let { next: L, bu: H, u: U, parent: D, vnode: ee } = E;
        {
          const fn = wd(E);
          if (fn) {
            L && (L.el = ee.el, G(E, L, oe)), fn.asyncDep.then(() => {
              E.isUnmounted || te();
            });
            return;
          }
        }
        let _e = L, Ve;
        qn(E, !1), L ? (L.el = ee.el, G(E, L, oe)) : L = ee, H && $l(H), (Ve = L.props && L.props.onVnodeBeforeUpdate) && Jt(Ve, D, L, ee), qn(E, !0);
        const Re = Nl(E), at = E.subTree;
        E.subTree = Re, m(
          at,
          Re,
          // parent may have changed if it's in a teleport
          d(at.el),
          // anchor may have changed if it's in a fragment
          ae(at),
          E,
          K,
          ne
        ), L.el = Re.el, _e === null && ug(E, Re.el), U && ut(U, K), (Ve = L.props && L.props.onVnodeUpdated) && ut(
          () => Jt(Ve, D, L, ee),
          K
        );
      } else {
        let L;
        const { el: H, props: U } = M, { bm: D, m: ee, parent: _e } = E, Ve = mo(M);
        if (qn(E, !1), D && $l(D), !Ve && (L = U && U.onVnodeBeforeMount) && Jt(L, _e, M), qn(E, !0), H && At) {
          const Re = () => {
            E.subTree = Nl(E), At(
              H,
              E.subTree,
              E,
              K,
              null
            );
          };
          Ve ? M.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !E.isUnmounted && Re()
          ) : Re();
        } else {
          const Re = E.subTree = Nl(E);
          m(
            null,
            Re,
            W,
            q,
            E,
            K,
            ne
          ), M.el = Re.el;
        }
        if (ee && ut(ee, K), !Ve && (L = U && U.onVnodeMounted)) {
          const Re = M;
          ut(
            () => Jt(L, _e, Re),
            K
          );
        }
        (M.shapeFlag & 256 || _e && mo(_e.vnode) && _e.vnode.shapeFlag & 256) && E.a && ut(E.a, K), E.isMounted = !0, M = W = q = null;
      }
    }, ie = E.effect = new ea(
      te,
      Vt,
      () => ua(X),
      E.scope
      // track it in component's effect scope
    ), X = E.update = () => {
      ie.dirty && ie.run();
    };
    X.id = E.uid, qn(E, !0), X();
  }, G = (E, M, W) => {
    M.component = E;
    const q = E.vnode.props;
    E.vnode = M, E.next = null, Og(E, M.props, q, W), Dg(E, M.children, W), mi(), vu(E), gi();
  }, A = (E, M, W, q, K, ne, oe, te, ie = !1) => {
    const X = E && E.children, L = E ? E.shapeFlag : 0, H = M.children, { patchFlag: U, shapeFlag: D } = M;
    if (U > 0) {
      if (U & 128) {
        O(
          X,
          H,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie
        );
        return;
      } else if (U & 256) {
        F(
          X,
          H,
          W,
          q,
          K,
          ne,
          oe,
          te,
          ie
        );
        return;
      }
    }
    D & 8 ? (L & 16 && J(X, K, ne), H !== X && c(W, H)) : L & 16 ? D & 16 ? O(
      X,
      H,
      W,
      q,
      K,
      ne,
      oe,
      te,
      ie
    ) : J(X, K, ne, !0) : (L & 8 && c(W, ""), D & 16 && T(
      H,
      W,
      q,
      K,
      ne,
      oe,
      te,
      ie
    ));
  }, F = (E, M, W, q, K, ne, oe, te, ie) => {
    E = E || Pi, M = M || Pi;
    const X = E.length, L = M.length, H = Math.min(X, L);
    let U;
    for (U = 0; U < H; U++) {
      const D = M[U] = ie ? An(M[U]) : Qt(M[U]);
      m(
        E[U],
        D,
        W,
        null,
        K,
        ne,
        oe,
        te,
        ie
      );
    }
    X > L ? J(
      E,
      K,
      ne,
      !0,
      !1,
      H
    ) : T(
      M,
      W,
      q,
      K,
      ne,
      oe,
      te,
      ie,
      H
    );
  }, O = (E, M, W, q, K, ne, oe, te, ie) => {
    let X = 0;
    const L = M.length;
    let H = E.length - 1, U = L - 1;
    for (; X <= H && X <= U; ) {
      const D = E[X], ee = M[X] = ie ? An(M[X]) : Qt(M[X]);
      if (Qn(D, ee))
        m(
          D,
          ee,
          W,
          null,
          K,
          ne,
          oe,
          te,
          ie
        );
      else
        break;
      X++;
    }
    for (; X <= H && X <= U; ) {
      const D = E[H], ee = M[U] = ie ? An(M[U]) : Qt(M[U]);
      if (Qn(D, ee))
        m(
          D,
          ee,
          W,
          null,
          K,
          ne,
          oe,
          te,
          ie
        );
      else
        break;
      H--, U--;
    }
    if (X > H) {
      if (X <= U) {
        const D = U + 1, ee = D < L ? M[D].el : q;
        for (; X <= U; )
          m(
            null,
            M[X] = ie ? An(M[X]) : Qt(M[X]),
            W,
            ee,
            K,
            ne,
            oe,
            te,
            ie
          ), X++;
      }
    } else if (X > U)
      for (; X <= H; )
        Y(E[X], K, ne, !0), X++;
    else {
      const D = X, ee = X, _e = /* @__PURE__ */ new Map();
      for (X = ee; X <= U; X++) {
        const vt = M[X] = ie ? An(M[X]) : Qt(M[X]);
        vt.key != null && _e.set(vt.key, X);
      }
      let Ve, Re = 0;
      const at = U - ee + 1;
      let fn = !1, iu = 0;
      const Yi = new Array(at);
      for (X = 0; X < at; X++)
        Yi[X] = 0;
      for (X = D; X <= H; X++) {
        const vt = E[X];
        if (Re >= at) {
          Y(vt, K, ne, !0);
          continue;
        }
        let Zt;
        if (vt.key != null)
          Zt = _e.get(vt.key);
        else
          for (Ve = ee; Ve <= U; Ve++)
            if (Yi[Ve - ee] === 0 && Qn(vt, M[Ve])) {
              Zt = Ve;
              break;
            }
        Zt === void 0 ? Y(vt, K, ne, !0) : (Yi[Zt - ee] = X + 1, Zt >= iu ? iu = Zt : fn = !0, m(
          vt,
          M[Zt],
          W,
          null,
          K,
          ne,
          oe,
          te,
          ie
        ), Re++);
      }
      const ru = fn ? Ug(Yi) : Pi;
      for (Ve = ru.length - 1, X = at - 1; X >= 0; X--) {
        const vt = ee + X, Zt = M[vt], ou = vt + 1 < L ? M[vt + 1].el : q;
        Yi[X] === 0 ? m(
          null,
          Zt,
          W,
          ou,
          K,
          ne,
          oe,
          te,
          ie
        ) : fn && (Ve < 0 || X !== ru[Ve] ? j(Zt, W, ou, 2) : Ve--);
      }
    }
  }, j = (E, M, W, q, K = null) => {
    const { el: ne, type: oe, transition: te, children: ie, shapeFlag: X } = E;
    if (X & 6) {
      j(E.component.subTree, M, W, q);
      return;
    }
    if (X & 128) {
      E.suspense.move(M, W, q);
      return;
    }
    if (X & 64) {
      oe.move(E, M, W, Ze);
      return;
    }
    if (oe === Se) {
      i(ne, M, W);
      for (let H = 0; H < ie.length; H++)
        j(ie[H], M, W, q);
      i(E.anchor, M, W);
      return;
    }
    if (oe === Dl) {
      _(E, M, W);
      return;
    }
    if (q !== 2 && X & 1 && te)
      if (q === 0)
        te.beforeEnter(ne), i(ne, M, W), ut(() => te.enter(ne), K);
      else {
        const { leave: H, delayLeave: U, afterLeave: D } = te, ee = () => i(ne, M, W), _e = () => {
          H(ne, () => {
            ee(), D && D();
          });
        };
        U ? U(ne, ee, _e) : _e();
      }
    else
      i(ne, M, W);
  }, Y = (E, M, W, q = !1, K = !1) => {
    const {
      type: ne,
      props: oe,
      ref: te,
      children: ie,
      dynamicChildren: X,
      shapeFlag: L,
      patchFlag: H,
      dirs: U
    } = E;
    if (te != null && vs(te, null, W, E, !0), L & 256) {
      M.ctx.deactivate(E);
      return;
    }
    const D = L & 1 && U, ee = !mo(E);
    let _e;
    if (ee && (_e = oe && oe.onVnodeBeforeUnmount) && Jt(_e, M, E), L & 6)
      de(E.component, W, q);
    else {
      if (L & 128) {
        E.suspense.unmount(W, q);
        return;
      }
      D && Wn(E, null, M, "beforeUnmount"), L & 64 ? E.type.remove(
        E,
        M,
        W,
        K,
        Ze,
        q
      ) : X && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ne !== Se || H > 0 && H & 64) ? J(
        X,
        M,
        W,
        !1,
        !0
      ) : (ne === Se && H & 384 || !K && L & 16) && J(ie, M, W), q && Q(E);
    }
    (ee && (_e = oe && oe.onVnodeUnmounted) || D) && ut(() => {
      _e && Jt(_e, M, E), D && Wn(E, null, M, "unmounted");
    }, W);
  }, Q = (E) => {
    const { type: M, el: W, anchor: q, transition: K } = E;
    if (M === Se) {
      le(W, q);
      return;
    }
    if (M === Dl) {
      b(E);
      return;
    }
    const ne = () => {
      r(W), K && !K.persisted && K.afterLeave && K.afterLeave();
    };
    if (E.shapeFlag & 1 && K && !K.persisted) {
      const { leave: oe, delayLeave: te } = K, ie = () => oe(W, ne);
      te ? te(E.el, ne, ie) : ie();
    } else
      ne();
  }, le = (E, M) => {
    let W;
    for (; E !== M; )
      W = f(E), r(E), E = W;
    r(M);
  }, de = (E, M, W) => {
    const { bum: q, scope: K, update: ne, subTree: oe, um: te } = E;
    q && $l(q), K.stop(), ne && (ne.active = !1, Y(oe, E, M, W)), te && ut(te, M), ut(() => {
      E.isUnmounted = !0;
    }, M), M && M.pendingBranch && !M.isUnmounted && E.asyncDep && !E.asyncResolved && E.suspenseId === M.pendingId && (M.deps--, M.deps === 0 && M.resolve());
  }, J = (E, M, W, q = !1, K = !1, ne = 0) => {
    for (let oe = ne; oe < E.length; oe++)
      Y(E[oe], M, W, q, K);
  }, ae = (E) => E.shapeFlag & 6 ? ae(E.component.subTree) : E.shapeFlag & 128 ? E.suspense.next() : f(E.anchor || E.el);
  let Ce = !1;
  const Ue = (E, M, W) => {
    E == null ? M._vnode && Y(M._vnode, null, null, !0) : m(
      M._vnode || null,
      E,
      M,
      null,
      null,
      null,
      W
    ), Ce || (Ce = !0, vu(), ed(), Ce = !1), M._vnode = E;
  }, Ze = {
    p: m,
    um: Y,
    m: j,
    r: Q,
    mt: S,
    mc: T,
    pc: A,
    pbc: N,
    n: ae,
    o: e
  };
  let St, At;
  return t && ([St, At] = t(
    Ze
  )), {
    render: Ue,
    hydrate: St,
    createApp: Rg(Ue, St)
  };
}
function Fl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function qn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function jg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function va(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (ye(i) && ye(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = An(r[o]), s.el = l.el), n || va(l, s)), s.type === Mr && (s.el = l.el);
    }
}
function Ug(e) {
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
function wd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : wd(t);
}
const Gg = (e) => e.__isTeleport, sr = (e) => e && (e.disabled || e.disabled === ""), Eu = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Vu = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ms = (e, t) => {
  const n = e && e.to;
  return He(n) ? t ? t(n) : null : n;
}, Wg = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: m, createComment: y }
    } = u, g = sr(t.props);
    let { shapeFlag: w, children: _, dynamicChildren: b } = t;
    if (e == null) {
      const x = t.el = m(""), V = t.anchor = m("");
      h(x, n, i), h(V, n, i);
      const C = t.target = ms(t.props, v), T = t.targetAnchor = m("");
      C && (h(T, C), l === "svg" || Eu(C) ? l = "svg" : (l === "mathml" || Vu(C)) && (l = "mathml"));
      const $ = (N, z) => {
        w & 16 && c(
          _,
          N,
          z,
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
      const x = t.anchor = e.anchor, V = t.target = e.target, C = t.targetAnchor = e.targetAnchor, T = sr(e.props), $ = T ? n : V, N = T ? x : C;
      if (l === "svg" || Eu(V) ? l = "svg" : (l === "mathml" || Vu(V)) && (l = "mathml"), b ? (f(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), va(e, t, !0)) : a || d(
        e,
        t,
        $,
        N,
        r,
        o,
        l,
        s,
        !1
      ), g)
        T ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : eo(
          t,
          n,
          x,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const z = t.target = ms(
          t.props,
          v
        );
        z && eo(
          t,
          z,
          null,
          u,
          0
        );
      } else
        T && eo(
          t,
          V,
          C,
          u,
          1
        );
    }
    _d(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && o(c), l && o(u), s & 16) {
      const h = l || !sr(f);
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
  move: eo,
  hydrate: qg
};
function eo(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = o === 2;
  if (d && i(l, t, n), (!d || sr(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      r(
        u[f],
        t,
        n,
        2
      );
  d && i(s, t, n);
}
function qg(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = ms(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (sr(t.props))
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
    _d(t);
  }
  return t.anchor && l(t.anchor);
}
const Yg = Wg;
function _d(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Se = Symbol.for("v-fgt"), Mr = Symbol.for("v-txt"), Tt = Symbol.for("v-cmt"), Dl = Symbol.for("v-stc"), ar = [];
let Dt = null;
function tn(e = !1) {
  ar.push(Dt = e ? null : []);
}
function Kg() {
  ar.pop(), Dt = ar[ar.length - 1] || null;
}
let gr = 1;
function Lu(e) {
  gr += e;
}
function xd(e) {
  return e.dynamicChildren = gr > 0 ? Dt || Pi : null, Kg(), gr > 0 && Dt && Dt.push(e), e;
}
function gs(e, t, n, i, r, o) {
  return xd(
    We(
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
  return xd(
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
function Mo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const dl = "__vInternal", Sd = ({ key: e }) => e ?? null, go = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? He(e) || Oe(e) || xe(e) ? { i: it, r: e, k: t, f: !!n } : e : null);
function We(e, t = null, n = null, i = 0, r = null, o = e === Se ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Sd(t),
    ref: t && go(t),
    scopeId: id,
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
  return s ? (ma(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= He(n) ? 8 : 16), gr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Dt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Dt.push(a), a;
}
const p = Xg;
function Xg(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === od) && (e = Tt), Mo(e)) {
    const s = pn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ma(s, n), gr > 0 && !o && Dt && (s.shapeFlag & 6 ? Dt[Dt.indexOf(e)] = s : Dt.push(s)), s.patchFlag |= -2, s;
  }
  if (l0(e) && (e = e.__vccOpts), t) {
    t = Zg(t);
    let { class: s, style: a } = t;
    s && !He(s) && (t.class = Js(s)), Me(a) && (Gf(a) && !ye(a) && (a = Ne({}, a)), t.style = Zs(a));
  }
  const l = He(e) ? 1 : dg(e) ? 128 : Gg(e) ? 64 : Me(e) ? 4 : xe(e) ? 2 : 0;
  return We(
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
function Zg(e) {
  return e ? Gf(e) || dl in e ? Ne({}, e) : e : null;
}
function pn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? ve(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && Sd(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? ye(r) ? r.concat(go(t)) : [r, go(t)] : go(t)
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
    ssContent: e.ssContent && pn(e.ssContent),
    ssFallback: e.ssFallback && pn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Fe(e = " ", t = 0) {
  return p(Mr, null, e, t);
}
function Pn(e = "", t = !1) {
  return t ? (tn(), ni(Tt, null, e)) : p(Tt, null, e);
}
function Qt(e) {
  return e == null || typeof e == "boolean" ? p(Tt) : ye(e) ? p(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? An(e) : p(Mr, null, String(e));
}
function An(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : pn(e);
}
function ma(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (ye(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ma(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(dl in t) ? t._ctx = it : r === 3 && it && (it.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    xe(t) ? (t = { default: t, _ctx: it }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Fe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ve(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = Js([t.class, i.class]));
      else if (r === "style")
        t.style = Zs([t.style, i.style]);
      else if (nl(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(ye(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else
        r !== "" && (t[r] = i[r]);
  }
  return t;
}
function Jt(e, t, n, i = null) {
  Pt(e, t, 7, [
    n,
    i
  ]);
}
const Jg = vd();
let Qg = 0;
function e0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || Jg, o = {
    uid: Qg++,
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
    scope: new Af(
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
    propsOptions: gd(i, r),
    emitsOptions: nd(i, r),
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = og.bind(null, o), e.ce && e.ce(o), o;
}
let Ke = null;
const ga = () => Ke || it;
let Io, ys;
{
  const e = Tf(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  Io = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ke = n
  ), ys = t(
    "__VUE_SSR_SETTERS__",
    (n) => hl = n
  );
}
const Ir = (e) => {
  const t = Ke;
  return Io(e), e.scope.on(), () => {
    e.scope.off(), Io(t);
  };
}, Pu = () => {
  Ke && Ke.scope.off(), Io(null);
};
function Cd(e) {
  return e.vnode.shapeFlag & 4;
}
let hl = !1;
function t0(e, t = !1) {
  t && ys(t);
  const { props: n, children: i } = e.vnode, r = Cd(e);
  Ng(e, n, r, t), Fg(e, i);
  const o = r ? n0(e, t) : void 0;
  return t && ys(!1), o;
}
function n0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Wf(new Proxy(e.ctx, Lg));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? r0(e) : null, o = Ir(e);
    mi();
    const l = Bn(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (gi(), o(), Vf(l)) {
      if (l.then(Pu, Pu), t)
        return l.then((s) => {
          Tu(e, s, t);
        }).catch((s) => {
          ll(s, e, 0);
        });
      e.asyncDep = l;
    } else
      Tu(e, l, t);
  } else
    kd(e, t);
}
function Tu(e, t, n) {
  xe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Me(t) && (e.setupState = Xf(t)), kd(e, n);
}
let Mu;
function kd(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Mu && !i.render) {
      const r = i.template || da(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = Ne(
          Ne(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = Mu(r, u);
      }
    }
    e.render = i.render || Vt;
  }
  {
    const r = Ir(e);
    mi();
    try {
      Pg(e);
    } finally {
      gi(), r();
    }
  }
}
function i0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ft(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function r0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return i0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function vl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Xf(Wf(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in or)
          return or[n](e);
      },
      has(t, n) {
        return n in t || n in or;
      }
    }));
}
function o0(e, t = !0) {
  return xe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function l0(e) {
  return xe(e) && "__vccOpts" in e;
}
const k = (e, t) => Km(e, t, hl);
function zn(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Me(t) && !ye(t) ? Mo(t) ? p(e, null, [t]) : p(e, t) : p(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && Mo(n) && (n = [n]), p(e, t, n));
}
const s0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const a0 = "http://www.w3.org/2000/svg", u0 = "http://www.w3.org/1998/Math/MathML", $n = typeof document < "u" ? document : null, Iu = $n && /* @__PURE__ */ $n.createElement("template"), c0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? $n.createElementNS(a0, e) : t === "mathml" ? $n.createElementNS(u0, e) : $n.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => $n.createTextNode(e),
  createComment: (e) => $n.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => $n.querySelector(e),
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
      Iu.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = Iu.content;
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
}, Ln = "transition", Ki = "animation", Bi = Symbol("_vtc"), bn = (e, { slots: t }) => zn(pg, Vd(e), t);
bn.displayName = "Transition";
const Ed = {
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
}, f0 = bn.props = /* @__PURE__ */ Ne(
  {},
  ud,
  Ed
), Yn = (e, t = []) => {
  ye(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Au = (e) => e ? ye(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Vd(e) {
  const t = {};
  for (const P in e)
    P in Ed || (t[P] = e[P]);
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
  } = e, v = d0(r), m = v && v[0], y = v && v[1], {
    onBeforeEnter: g,
    onEnter: w,
    onEnterCancelled: _,
    onLeave: b,
    onLeaveCancelled: x,
    onBeforeAppear: V = g,
    onAppear: C = w,
    onAppearCancelled: T = _
  } = t, $ = (P, R, S) => {
    Tn(P, R ? c : s), Tn(P, R ? u : l), S && S();
  }, N = (P, R) => {
    P._isLeaving = !1, Tn(P, d), Tn(P, h), Tn(P, f), R && R();
  }, z = (P) => (R, S) => {
    const B = P ? C : w, I = () => $(R, P, S);
    Yn(B, [R, I]), $u(() => {
      Tn(R, P ? a : o), hn(R, P ? c : s), Au(B) || Ru(R, i, m, I);
    });
  };
  return Ne(t, {
    onBeforeEnter(P) {
      Yn(g, [P]), hn(P, o), hn(P, l);
    },
    onBeforeAppear(P) {
      Yn(V, [P]), hn(P, a), hn(P, u);
    },
    onEnter: z(!1),
    onAppear: z(!0),
    onLeave(P, R) {
      P._isLeaving = !0;
      const S = () => N(P, R);
      hn(P, d), Pd(), hn(P, f), $u(() => {
        P._isLeaving && (Tn(P, d), hn(P, h), Au(b) || Ru(P, i, y, S));
      }), Yn(b, [P, S]);
    },
    onEnterCancelled(P) {
      $(P, !1), Yn(_, [P]);
    },
    onAppearCancelled(P) {
      $(P, !0), Yn(T, [P]);
    },
    onLeaveCancelled(P) {
      N(P), Yn(x, [P]);
    }
  });
}
function d0(e) {
  if (e == null)
    return null;
  if (Me(e))
    return [Hl(e.enter), Hl(e.leave)];
  {
    const t = Hl(e);
    return [t, t];
  }
}
function Hl(e) {
  return os(e);
}
function hn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Bi] || (e[Bi] = /* @__PURE__ */ new Set())).add(t);
}
function Tn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[Bi];
  n && (n.delete(t), n.size || (e[Bi] = void 0));
}
function $u(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let h0 = 0;
function Ru(e, t, n, i) {
  const r = e._endId = ++h0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = Ld(e, t);
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
function Ld(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${Ln}Delay`), o = i(`${Ln}Duration`), l = Nu(r, o), s = i(`${Ki}Delay`), a = i(`${Ki}Duration`), u = Nu(s, a);
  let c = null, d = 0, f = 0;
  t === Ln ? l > 0 && (c = Ln, d = l, f = o.length) : t === Ki ? u > 0 && (c = Ki, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? Ln : Ki : null, f = c ? c === Ln ? o.length : a.length : 0);
  const h = c === Ln && /\b(transform|all)(,|$)/.test(
    i(`${Ln}Property`).toString()
  );
  return {
    type: c,
    timeout: d,
    propCount: f,
    hasTransform: h
  };
}
function Nu(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => Ou(n) + Ou(e[i])));
}
function Ou(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Pd() {
  return document.body.offsetHeight;
}
function v0(e, t, n) {
  const i = e[Bi];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ao = Symbol("_vod"), Td = Symbol("_vsh"), ln = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ao] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Xi(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), Xi(e, !0), i.enter(e)) : i.leave(e, () => {
      Xi(e, !1);
    }) : Xi(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Xi(e, t);
  }
};
function Xi(e, t) {
  e.style.display = t ? e[Ao] : "none", e[Td] = !t;
}
const m0 = Symbol(""), g0 = /(^|;)\s*display\s*:/;
function y0(e, t, n) {
  const i = e.style, r = He(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (He(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && yo(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && yo(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), yo(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[m0];
      l && (n += ";" + l), i.cssText = n, o = g0.test(n);
    }
  } else
    t && e.removeAttribute("style");
  Ao in e && (e[Ao] = o ? i.display : "", e[Td] && (i.display = "none"));
}
const Bu = /\s*!important$/;
function yo(e, t, n) {
  if (ye(n))
    n.forEach((i) => yo(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = p0(e, t);
    Bu.test(n) ? e.setProperty(
      Nt(i),
      n.replace(Bu, ""),
      "important"
    ) : e[i] = n;
  }
}
const Fu = ["Webkit", "Moz", "ms"], zl = {};
function p0(e, t) {
  const n = zl[t];
  if (n)
    return n;
  let i = ot(t);
  if (i !== "filter" && i in e)
    return zl[t] = i;
  i = xn(i);
  for (let r = 0; r < Fu.length; r++) {
    const o = Fu[r] + i;
    if (o in e)
      return zl[t] = o;
  }
  return t;
}
const Du = "http://www.w3.org/1999/xlink";
function b0(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Du, t.slice(6, t.length)) : e.setAttributeNS(Du, t, n);
  else {
    const o = km(t);
    n == null || o && !Mf(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function w0(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = Mf(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function _0(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function x0(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Hu = Symbol("_vei");
function S0(e, t, n, i, r = null) {
  const o = e[Hu] || (e[Hu] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = C0(t);
    if (i) {
      const u = o[t] = V0(i, r);
      _0(e, s, u, a);
    } else
      l && (x0(e, s, l, a), o[t] = void 0);
  }
}
const zu = /(?:Once|Passive|Capture)$/;
function C0(e) {
  let t;
  if (zu.test(e)) {
    t = {};
    let i;
    for (; i = e.match(zu); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
}
let jl = 0;
const k0 = /* @__PURE__ */ Promise.resolve(), E0 = () => jl || (k0.then(() => jl = 0), jl = Date.now());
function V0(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Pt(
      L0(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = E0(), n;
}
function L0(e, t) {
  if (ye(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const ju = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, P0 = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? v0(e, i, u) : t === "style" ? y0(e, n, i) : nl(t) ? Ys(t) || S0(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : T0(e, t, i, u)) ? w0(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), b0(e, t, i, u));
};
function T0(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ju(t) && xe(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return ju(t) && He(n) ? !1 : t in e;
}
const Md = /* @__PURE__ */ new WeakMap(), Id = /* @__PURE__ */ new WeakMap(), $o = Symbol("_moveCb"), Uu = Symbol("_enterCb"), Ad = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ne({}, f0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = ga(), i = ad();
    let r, o;
    return dd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!R0(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(I0), r.forEach(A0);
      const s = r.filter($0);
      Pd(), s.forEach((a) => {
        const u = a.el, c = u.style;
        hn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[$o] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[$o] = null, Tn(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = pe(e), s = Vd(l);
      let a = l.tag || Se;
      r = o, o = t.default ? fa(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && mr(
          c,
          vr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          mr(
            c,
            vr(c, s, i, n)
          ), Md.set(c, c.el.getBoundingClientRect());
        }
      return p(a, null, o);
    };
  }
}, M0 = (e) => delete e.mode;
Ad.props;
const $d = Ad;
function I0(e) {
  const t = e.el;
  t[$o] && t[$o](), t[Uu] && t[Uu]();
}
function A0(e) {
  Id.set(e, e.el.getBoundingClientRect());
}
function $0(e) {
  const t = Md.get(e), n = Id.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function R0(e, t, n) {
  const i = e.cloneNode(), r = e[Bi];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = Ld(i);
  return o.removeChild(i), l;
}
const N0 = /* @__PURE__ */ Ne({ patchProp: P0 }, c0);
let Gu;
function O0() {
  return Gu || (Gu = Hg(N0));
}
const Wu = (...e) => {
  O0().render(...e);
};
/*! (c) Andrea Giammarchi - ISC */
const B0 = (() => {
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
      const { prototype: u } = s, { connectedCallback: c } = u, d = a + "Callback", f = (v, m, y, g) => {
        m.disconnect(), y.removeEventListener(e, g), h(v);
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
                  const y = () => f(v, g, m, y);
                  m.addEventListener(e, y);
                  const g = new MutationObserver(() => {
                    i(v) && f(v, g, m, y);
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
function F0(e, t, n) {
  const i = /* @__PURE__ */ Ui(e);
  class r extends ya {
    constructor(l) {
      super(i, l, t, n);
    }
  }
  return Ie(r, "def", i), r;
}
const D0 = typeof HTMLElement < "u" ? B0 : class {
};
class ya extends D0 {
  constructor(n, i = {}, r = {}, o) {
    super();
    /**
     * @internal
     */
    Ie(this, "_instance", null);
    Ie(this, "_connected", !1);
    Ie(this, "_resolved", !1);
    Ie(this, "_numberProps", null);
    Ie(this, "_styles");
    Ie(this, "_slots");
    Ie(this, "_ob", null);
    this._def = n, this._props = i, this._config = r, this._config = Ne(
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
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), ze(() => {
      this._connected || (Wu(null, this._root), this._instance = null);
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
      if (l && !ye(l))
        for (const u in l) {
          const c = l[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = os(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[ot(u)] = !0);
        }
      this._numberProps = a, o && this._resolveProps(r), this._config.shadowRoot || (this._slots = Array.from(this.children).map((u) => u.cloneNode(!0)), this.replaceChildren()), this._applyStyles(s), this._update();
    }, i = this._def.__asyncLoader;
    i ? i().then((r) => n(r, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: i } = n, r = ye(i) ? i : Object.keys(i || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(ot))
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
    const r = ot(n);
    this._numberProps && this._numberProps[r] && (i = os(i)), this._setProp(r, i, !1);
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
    i !== this._props[n] && (this._props[n] = i, o && this._instance && this._update(), r && (i === !0 ? this.setAttribute(Nt(n), "") : typeof i == "string" || typeof i == "number" ? this.setAttribute(Nt(n), i + "") : i || this.removeAttribute(Nt(n))));
  }
  _update() {
    Wu(this._createVNode(), this._root);
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
        return l.innerHTML = o.innerHTML, p(o.tagName, l, null);
      });
    });
    const i = p(this._def, Ne({}, this._props), n);
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
        o(s, a), Nt(s) !== s && o(Nt(s), a);
      };
      let l = this;
      for (; l = l && (l.parentNode || l.host); )
        if (l instanceof ya) {
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
var H0 = { value: () => {
} };
function Ar() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new po(n);
}
function po(e) {
  this._ = e;
}
function z0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
po.prototype = Ar.prototype = {
  constructor: po,
  on: function(e, t) {
    var n = this._, i = z0(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; )
        if ((r = (e = i[o]).type) && (r = j0(n[r], e.name)))
          return r;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type)
        n[r] = qu(n[r], e.name, t);
      else if (t == null)
        for (r in n)
          n[r] = qu(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new po(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0)
      for (var n = new Array(r), i = 0, r, o; i < r; ++i)
        n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (o = this._[e], i = 0, r = o.length; i < r; ++i)
      o[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var i = this._[e], r = 0, o = i.length; r < o; ++r)
      i[r].value.apply(t, n);
  }
};
function j0(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function qu(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = H0, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ps = "http://www.w3.org/1999/xhtml";
const Yu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ps,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ml(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Yu.hasOwnProperty(t) ? { space: Yu[t], local: e } : e;
}
function U0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ps && t.documentElement.namespaceURI === ps ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function G0(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Rd(e) {
  var t = ml(e);
  return (t.local ? G0 : U0)(t);
}
function W0() {
}
function pa(e) {
  return e == null ? W0 : function() {
    return this.querySelector(e);
  };
}
function q0(e) {
  typeof e != "function" && (e = pa(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new wt(i, this._parents);
}
function Y0(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function K0() {
  return [];
}
function Nd(e) {
  return e == null ? K0 : function() {
    return this.querySelectorAll(e);
  };
}
function X0(e) {
  return function() {
    return Y0(e.apply(this, arguments));
  };
}
function Z0(e) {
  typeof e == "function" ? e = X0(e) : e = Nd(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new wt(i, r);
}
function Od(e) {
  return function() {
    return this.matches(e);
  };
}
function Bd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var J0 = Array.prototype.find;
function Q0(e) {
  return function() {
    return J0.call(this.children, e);
  };
}
function ey() {
  return this.firstElementChild;
}
function ty(e) {
  return this.select(e == null ? ey : Q0(typeof e == "function" ? e : Bd(e)));
}
var ny = Array.prototype.filter;
function iy() {
  return Array.from(this.children);
}
function ry(e) {
  return function() {
    return ny.call(this.children, e);
  };
}
function oy(e) {
  return this.selectAll(e == null ? iy : ry(typeof e == "function" ? e : Bd(e)));
}
function ly(e) {
  typeof e != "function" && (e = Od(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new wt(i, this._parents);
}
function Fd(e) {
  return new Array(e.length);
}
function sy() {
  return new wt(this._enter || this._groups.map(Fd), this._parents);
}
function Ro(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ro.prototype = {
  constructor: Ro,
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
function ay(e) {
  return function() {
    return e;
  };
}
function uy(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new Ro(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function cy(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = o.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new Ro(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (r[s] = a);
}
function fy(e) {
  return e.__data__;
}
function dy(e, t) {
  if (!arguments.length)
    return Array.from(this, fy);
  var n = t ? cy : uy, i = this._parents, r = this._groups;
  typeof e != "function" && (e = ay(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], d = r[u], f = d.length, h = hy(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), y = l[u] = new Array(v), g = a[u] = new Array(f);
    n(c, d, m, y, g, h, t);
    for (var w = 0, _ = 0, b, x; w < v; ++w)
      if (b = m[w]) {
        for (w >= _ && (_ = w + 1); !(x = y[_]) && ++_ < v; )
          ;
        b._next = x || null;
      }
  }
  return l = new wt(l, i), l._enter = s, l._exit = a, l;
}
function hy(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function vy() {
  return new wt(this._exit || this._groups.map(Fd), this._parents);
}
function my(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function gy(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new wt(s, this._parents);
}
function yy() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function py(e) {
  e || (e = by);
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
function by(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function wy() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function _y() {
  return Array.from(this);
}
function xy() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l)
        return l;
    }
  return null;
}
function Sy() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function Cy() {
  return !this.node();
}
function ky(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function Ey(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Vy(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ly(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Py(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ty(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function My(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Iy(e, t) {
  var n = ml(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Vy : Ey : typeof t == "function" ? n.local ? My : Ty : n.local ? Py : Ly)(n, t));
}
function Dd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ay(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function $y(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Ry(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Ny(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Ay : typeof t == "function" ? Ry : $y)(e, t, n ?? "")) : Fi(this.node(), e);
}
function Fi(e, t) {
  return e.style.getPropertyValue(t) || Dd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Oy(e) {
  return function() {
    delete this[e];
  };
}
function By(e, t) {
  return function() {
    this[e] = t;
  };
}
function Fy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Dy(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Oy : typeof t == "function" ? Fy : By)(e, t)) : this.node()[e];
}
function Hd(e) {
  return e.trim().split(/^|\s+/);
}
function ba(e) {
  return e.classList || new zd(e);
}
function zd(e) {
  this._node = e, this._names = Hd(e.getAttribute("class") || "");
}
zd.prototype = {
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
function jd(e, t) {
  for (var n = ba(e), i = -1, r = t.length; ++i < r; )
    n.add(t[i]);
}
function Ud(e, t) {
  for (var n = ba(e), i = -1, r = t.length; ++i < r; )
    n.remove(t[i]);
}
function Hy(e) {
  return function() {
    jd(this, e);
  };
}
function zy(e) {
  return function() {
    Ud(this, e);
  };
}
function jy(e, t) {
  return function() {
    (t.apply(this, arguments) ? jd : Ud)(this, e);
  };
}
function Uy(e, t) {
  var n = Hd(e + "");
  if (arguments.length < 2) {
    for (var i = ba(this.node()), r = -1, o = n.length; ++r < o; )
      if (!i.contains(n[r]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? jy : t ? Hy : zy)(n, t));
}
function Gy() {
  this.textContent = "";
}
function Wy(e) {
  return function() {
    this.textContent = e;
  };
}
function qy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Yy(e) {
  return arguments.length ? this.each(e == null ? Gy : (typeof e == "function" ? qy : Wy)(e)) : this.node().textContent;
}
function Ky() {
  this.innerHTML = "";
}
function Xy(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Zy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Jy(e) {
  return arguments.length ? this.each(e == null ? Ky : (typeof e == "function" ? Zy : Xy)(e)) : this.node().innerHTML;
}
function Qy() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function e1() {
  return this.each(Qy);
}
function t1() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function n1() {
  return this.each(t1);
}
function i1(e) {
  var t = typeof e == "function" ? e : Rd(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function r1() {
  return null;
}
function o1(e, t) {
  var n = typeof e == "function" ? e : Rd(e), i = t == null ? r1 : typeof t == "function" ? t : pa(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function l1() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function s1() {
  return this.each(l1);
}
function a1() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function u1() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function c1(e) {
  return this.select(e ? u1 : a1);
}
function f1(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function d1(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function h1(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function v1(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function m1(e, t, n) {
  return function() {
    var i = this.__on, r, o = d1(t);
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
function g1(e, t, n) {
  var i = h1(e + ""), r, o = i.length, l;
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
  for (s = t ? m1 : v1, r = 0; r < o; ++r)
    this.each(s(i[r], t, n));
  return this;
}
function Gd(e, t, n) {
  var i = Dd(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function y1(e, t) {
  return function() {
    return Gd(this, e, t);
  };
}
function p1(e, t) {
  return function() {
    return Gd(this, e, t.apply(this, arguments));
  };
}
function b1(e, t) {
  return this.each((typeof t == "function" ? p1 : y1)(e, t));
}
function* w1() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var Wd = [null];
function wt(e, t) {
  this._groups = e, this._parents = t;
}
function $r() {
  return new wt([[document.documentElement]], Wd);
}
function _1() {
  return this;
}
wt.prototype = $r.prototype = {
  constructor: wt,
  select: q0,
  selectAll: Z0,
  selectChild: ty,
  selectChildren: oy,
  filter: ly,
  data: dy,
  enter: sy,
  exit: vy,
  join: my,
  merge: gy,
  selection: _1,
  order: yy,
  sort: py,
  call: wy,
  nodes: _y,
  node: xy,
  size: Sy,
  empty: Cy,
  each: ky,
  attr: Iy,
  style: Ny,
  property: Dy,
  classed: Uy,
  text: Yy,
  html: Jy,
  raise: e1,
  lower: n1,
  append: i1,
  insert: o1,
  remove: s1,
  clone: c1,
  datum: f1,
  on: g1,
  dispatch: b1,
  [Symbol.iterator]: w1
};
function Ot(e) {
  return typeof e == "string" ? new wt([[document.querySelector(e)]], [document.documentElement]) : new wt([[e]], Wd);
}
function qd(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function Et(e, t) {
  if (e = qd(e), t === void 0 && (t = e.currentTarget), t) {
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
function x1(e, t) {
  return e.target && (e = qd(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Et(n, t));
}
const S1 = { passive: !1 }, yr = { capture: !0, passive: !1 };
function Ul(e) {
  e.stopImmediatePropagation();
}
function Ai(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Yd(e) {
  var t = e.document.documentElement, n = Ot(e).on("dragstart.drag", Ai, yr);
  "onselectstart" in t ? n.on("selectstart.drag", Ai, yr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Kd(e, t) {
  var n = e.document.documentElement, i = Ot(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Ai, yr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const to = (e) => () => e;
function bs(e, {
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
bs.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function C1(e) {
  return !e.ctrlKey && !e.button;
}
function k1() {
  return this.parentNode;
}
function E1(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function V1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function L1() {
  var e = C1, t = k1, n = E1, i = V1, r = {}, o = Ar("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", y).on("touchmove.drag", g, S1).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, x) {
    if (!(c || !e.call(this, b, x))) {
      var V = _(this, t.call(this, b, x), b, x, "mouse");
      V && (Ot(b.view).on("mousemove.drag", v, yr).on("mouseup.drag", m, yr), Yd(b.view), Ul(b), u = !1, s = b.clientX, a = b.clientY, V("start", b));
    }
  }
  function v(b) {
    if (Ai(b), !u) {
      var x = b.clientX - s, V = b.clientY - a;
      u = x * x + V * V > d;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    Ot(b.view).on("mousemove.drag mouseup.drag", null), Kd(b.view, u), Ai(b), r.mouse("end", b);
  }
  function y(b, x) {
    if (e.call(this, b, x)) {
      var V = b.changedTouches, C = t.call(this, b, x), T = V.length, $, N;
      for ($ = 0; $ < T; ++$)
        (N = _(this, C, b, x, V[$].identifier, V[$])) && (Ul(b), N("start", b, V[$]));
    }
  }
  function g(b) {
    var x = b.changedTouches, V = x.length, C, T;
    for (C = 0; C < V; ++C)
      (T = r[x[C].identifier]) && (Ai(b), T("drag", b, x[C]));
  }
  function w(b) {
    var x = b.changedTouches, V = x.length, C, T;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), C = 0; C < V; ++C)
      (T = r[x[C].identifier]) && (Ul(b), T("end", b, x[C]));
  }
  function _(b, x, V, C, T, $) {
    var N = o.copy(), z = Et($ || V, x), P, R, S;
    if ((S = n.call(b, new bs("beforestart", {
      sourceEvent: V,
      target: f,
      identifier: T,
      active: l,
      x: z[0],
      y: z[1],
      dx: 0,
      dy: 0,
      dispatch: N
    }), C)) != null)
      return P = S.x - z[0] || 0, R = S.y - z[1] || 0, function B(I, G, A) {
        var F = z, O;
        switch (I) {
          case "start":
            r[T] = B, O = l++;
            break;
          case "end":
            delete r[T], --l;
          case "drag":
            z = Et(A || G, x), O = l;
            break;
        }
        N.call(
          I,
          b,
          new bs(I, {
            sourceEvent: G,
            subject: S,
            target: f,
            identifier: T,
            active: O,
            x: z[0] + P,
            y: z[1] + R,
            dx: z[0] - F[0],
            dy: z[1] - F[1],
            dispatch: N
          }),
          C
        );
      };
  }
  return f.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : to(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : to(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : to(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : to(!!b), f) : i;
  }, f.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function wa(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Xd(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t)
    n[i] = t[i];
  return n;
}
function Rr() {
}
var pr = 0.7, No = 1 / pr, $i = "\\s*([+-]?\\d+)\\s*", br = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", nn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", P1 = /^#([0-9a-f]{3,8})$/, T1 = new RegExp(`^rgb\\(${$i},${$i},${$i}\\)$`), M1 = new RegExp(`^rgb\\(${nn},${nn},${nn}\\)$`), I1 = new RegExp(`^rgba\\(${$i},${$i},${$i},${br}\\)$`), A1 = new RegExp(`^rgba\\(${nn},${nn},${nn},${br}\\)$`), $1 = new RegExp(`^hsl\\(${br},${nn},${nn}\\)$`), R1 = new RegExp(`^hsla\\(${br},${nn},${nn},${br}\\)$`), Ku = {
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
wa(Rr, wr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Xu,
  // Deprecated! Use color.formatHex.
  formatHex: Xu,
  formatHex8: N1,
  formatHsl: O1,
  formatRgb: Zu,
  toString: Zu
});
function Xu() {
  return this.rgb().formatHex();
}
function N1() {
  return this.rgb().formatHex8();
}
function O1() {
  return Zd(this).formatHsl();
}
function Zu() {
  return this.rgb().formatRgb();
}
function wr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = P1.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Ju(t) : n === 3 ? new ct(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? no(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? no(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = T1.exec(e)) ? new ct(t[1], t[2], t[3], 1) : (t = M1.exec(e)) ? new ct(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = I1.exec(e)) ? no(t[1], t[2], t[3], t[4]) : (t = A1.exec(e)) ? no(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = $1.exec(e)) ? tc(t[1], t[2] / 100, t[3] / 100, 1) : (t = R1.exec(e)) ? tc(t[1], t[2] / 100, t[3] / 100, t[4]) : Ku.hasOwnProperty(e) ? Ju(Ku[e]) : e === "transparent" ? new ct(NaN, NaN, NaN, 0) : null;
}
function Ju(e) {
  return new ct(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function no(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new ct(e, t, n, i);
}
function B1(e) {
  return e instanceof Rr || (e = wr(e)), e ? (e = e.rgb(), new ct(e.r, e.g, e.b, e.opacity)) : new ct();
}
function ws(e, t, n, i) {
  return arguments.length === 1 ? B1(e) : new ct(e, t, n, i ?? 1);
}
function ct(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
wa(ct, ws, Xd(Rr, {
  brighter(e) {
    return e = e == null ? No : Math.pow(No, e), new ct(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? pr : Math.pow(pr, e), new ct(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ct(ai(this.r), ai(this.g), ai(this.b), Oo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Qu,
  // Deprecated! Use color.formatHex.
  formatHex: Qu,
  formatHex8: F1,
  formatRgb: ec,
  toString: ec
}));
function Qu() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}`;
}
function F1() {
  return `#${ii(this.r)}${ii(this.g)}${ii(this.b)}${ii((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ec() {
  const e = Oo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ai(this.r)}, ${ai(this.g)}, ${ai(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Oo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ai(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ii(e) {
  return e = ai(e), (e < 16 ? "0" : "") + e.toString(16);
}
function tc(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Bt(e, t, n, i);
}
function Zd(e) {
  if (e instanceof Bt)
    return new Bt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Rr || (e = wr(e)), !e)
    return new Bt();
  if (e instanceof Bt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new Bt(l, s, a, e.opacity);
}
function D1(e, t, n, i) {
  return arguments.length === 1 ? Zd(e) : new Bt(e, t, n, i ?? 1);
}
function Bt(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
wa(Bt, D1, Xd(Rr, {
  brighter(e) {
    return e = e == null ? No : Math.pow(No, e), new Bt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? pr : Math.pow(pr, e), new Bt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new ct(
      Gl(e >= 240 ? e - 240 : e + 120, r, i),
      Gl(e, r, i),
      Gl(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Bt(nc(this.h), io(this.s), io(this.l), Oo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Oo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${nc(this.h)}, ${io(this.s) * 100}%, ${io(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function nc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function io(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Gl(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Jd = (e) => () => e;
function H1(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function z1(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function j1(e) {
  return (e = +e) == 1 ? Qd : function(t, n) {
    return n - t ? z1(t, n, e) : Jd(isNaN(t) ? n : t);
  };
}
function Qd(e, t) {
  var n = t - e;
  return n ? H1(e, n) : Jd(isNaN(e) ? t : e);
}
const ic = function e(t) {
  var n = j1(t);
  function i(r, o) {
    var l = n((r = ws(r)).r, (o = ws(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = Qd(r.opacity, o.opacity);
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
var _s = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Wl = new RegExp(_s.source, "g");
function U1(e) {
  return function() {
    return e;
  };
}
function G1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function W1(e, t) {
  var n = _s.lastIndex = Wl.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = _s.exec(e)) && (r = Wl.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: Rn(i, r) })), n = Wl.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? G1(a[0].x) : U1(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c)
      s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
var rc = 180 / Math.PI, xs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function eh(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * rc,
    skewX: Math.atan(a) * rc,
    scaleX: l,
    scaleY: s
  };
}
var ro;
function q1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? xs : eh(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Y1(e) {
  return e == null || (ro || (ro = document.createElementNS("http://www.w3.org/2000/svg", "g")), ro.setAttribute("transform", e), !(e = ro.transform.baseVal.consolidate())) ? xs : (e = e.matrix, eh(e.a, e.b, e.c, e.d, e.e, e.f));
}
function th(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: Rn(u, d) }, { i: m - 2, x: Rn(c, f) });
    } else
      (d || f) && h.push("translate(" + d + t + f + n);
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
    } else
      (d !== 1 || f !== 1) && h.push(r(h) + "scale(" + d + "," + f + ")");
  }
  return function(u, c) {
    var d = [], f = [];
    return u = e(u), c = e(c), o(u.translateX, u.translateY, c.translateX, c.translateY, d, f), l(u.rotate, c.rotate, d, f), s(u.skewX, c.skewX, d, f), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, d, f), u = c = null, function(h) {
      for (var v = -1, m = f.length, y; ++v < m; )
        d[(y = f[v]).i] = y.x(h);
      return d.join("");
    };
  };
}
var K1 = th(q1, "px, ", "px)", "deg)"), X1 = th(Y1, ", ", ")", ")"), Z1 = 1e-12;
function oc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function J1(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Q1(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ep = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, m = h * h + v * v, y, g;
    if (m < Z1)
      g = Math.log(f / u) / t, y = function(C) {
        return [
          s + C * h,
          a + C * v,
          u * Math.exp(t * C * g)
        ];
      };
    else {
      var w = Math.sqrt(m), _ = (f * f - u * u + i * m) / (2 * u * n * w), b = (f * f - u * u - i * m) / (2 * f * n * w), x = Math.log(Math.sqrt(_ * _ + 1) - _), V = Math.log(Math.sqrt(b * b + 1) - b);
      g = (V - x) / t, y = function(C) {
        var T = C * g, $ = oc(x), N = u / (n * w) * ($ * Q1(t * T + x) - J1(x));
        return [
          s + N * h,
          a + N * v,
          u * $ / oc(t * T + x)
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
var Di = 0, nr = 0, Zi = 0, nh = 1e3, Bo, ir, Fo = 0, di = 0, gl = 0, _r = typeof performance == "object" && performance.now ? performance : Date, ih = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function _a() {
  return di || (ih(tp), di = _r.now() + gl);
}
function tp() {
  di = 0;
}
function Do() {
  this._call = this._time = this._next = null;
}
Do.prototype = xa.prototype = {
  constructor: Do,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? _a() : +n) + (t == null ? 0 : +t), !this._next && ir !== this && (ir ? ir._next = this : Bo = this, ir = this), this._call = e, this._time = n, Ss();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ss());
  }
};
function xa(e, t, n) {
  var i = new Do();
  return i.restart(e, t, n), i;
}
function np() {
  _a(), ++Di;
  for (var e = Bo, t; e; )
    (t = di - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Di;
}
function lc() {
  di = (Fo = _r.now()) + gl, Di = nr = 0;
  try {
    np();
  } finally {
    Di = 0, rp(), di = 0;
  }
}
function ip() {
  var e = _r.now(), t = e - Fo;
  t > nh && (gl -= t, Fo = e);
}
function rp() {
  for (var e, t = Bo, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Bo = n);
  ir = e, Ss(i);
}
function Ss(e) {
  if (!Di) {
    nr && (nr = clearTimeout(nr));
    var t = e - di;
    t > 24 ? (e < 1 / 0 && (nr = setTimeout(lc, e - _r.now() - gl)), Zi && (Zi = clearInterval(Zi))) : (Zi || (Fo = _r.now(), Zi = setInterval(ip, nh)), Di = 1, ih(lc));
  }
}
function sc(e, t, n) {
  var i = new Do();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var op = Ar("start", "end", "cancel", "interrupt"), lp = [], rh = 0, ac = 1, Cs = 2, bo = 3, uc = 4, ks = 5, wo = 6;
function yl(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l)
    e.__transition = {};
  else if (n in l)
    return;
  sp(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: op,
    tween: lp,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: rh
  });
}
function Sa(e, t) {
  var n = qt(e, t);
  if (n.state > rh)
    throw new Error("too late; already scheduled");
  return n;
}
function sn(e, t) {
  var n = qt(e, t);
  if (n.state > bo)
    throw new Error("too late; already running");
  return n;
}
function qt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function sp(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = xa(o, 0, n.time);
  function o(u) {
    n.state = ac, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== ac)
      return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === bo)
          return sc(l);
        h.state === uc ? (h.state = wo, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = wo, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (sc(function() {
      n.state === bo && (n.state = uc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = Cs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Cs) {
      for (n.state = bo, r = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = h);
      r.length = d + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = ks, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(e, c);
    n.state === ks && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = wo, n.timer.stop(), delete i[t];
    for (var u in i)
      return;
    delete e.__transition;
  }
}
function _o(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > Cs && i.state < ks, i.state = wo, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function ap(e) {
  return this.each(function() {
    _o(this, e);
  });
}
function up(e, t) {
  var n, i;
  return function() {
    var r = sn(this, e), o = r.tween;
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
function cp(e, t, n) {
  var i, r;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = sn(this, e), l = o.tween;
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
function fp(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = qt(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? up : cp)(n, e, t));
}
function Ca(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = sn(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return qt(r, i).value[t];
  };
}
function oh(e, t) {
  var n;
  return (typeof t == "number" ? Rn : t instanceof wr ? ic : (n = wr(t)) ? (t = n, ic) : W1)(e, t);
}
function dp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function hp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function vp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function mp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function gp(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function yp(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function pp(e, t) {
  var n = ml(e), i = n === "transform" ? X1 : oh;
  return this.attrTween(e, typeof t == "function" ? (n.local ? yp : gp)(n, i, Ca(this, "attr." + e, t)) : t == null ? (n.local ? hp : dp)(n) : (n.local ? mp : vp)(n, i, t));
}
function bp(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function wp(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function _p(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && wp(e, o)), n;
  }
  return r._value = t, r;
}
function xp(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && bp(e, o)), n;
  }
  return r._value = t, r;
}
function Sp(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var i = ml(e);
  return this.tween(n, (i.local ? _p : xp)(i, t));
}
function Cp(e, t) {
  return function() {
    Sa(this, e).delay = +t.apply(this, arguments);
  };
}
function kp(e, t) {
  return t = +t, function() {
    Sa(this, e).delay = t;
  };
}
function Ep(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Cp : kp)(t, e)) : qt(this.node(), t).delay;
}
function Vp(e, t) {
  return function() {
    sn(this, e).duration = +t.apply(this, arguments);
  };
}
function Lp(e, t) {
  return t = +t, function() {
    sn(this, e).duration = t;
  };
}
function Pp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Vp : Lp)(t, e)) : qt(this.node(), t).duration;
}
function Tp(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    sn(this, e).ease = t;
  };
}
function Mp(e) {
  var t = this._id;
  return arguments.length ? this.each(Tp(t, e)) : qt(this.node(), t).ease;
}
function Ip(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    sn(this, e).ease = n;
  };
}
function Ap(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(Ip(this._id, e));
}
function $p(e) {
  typeof e != "function" && (e = Od(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new wn(i, this._parents, this._name, this._id);
}
function Rp(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < i; ++s)
    l[s] = t[s];
  return new wn(l, this._parents, this._name, this._id);
}
function Np(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Op(e, t, n) {
  var i, r, o = Np(t) ? Sa : sn;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function Bp(e, t) {
  var n = this._id;
  return arguments.length < 2 ? qt(this.node(), n).on.on(e) : this.each(Op(n, e, t));
}
function Fp(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function Dp() {
  return this.on("end.remove", Fp(this._id));
}
function Hp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = pa(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, yl(u[f], t, n, f, u, qt(c, n)));
  return new wn(o, this._parents, t, n);
}
function zp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Nd(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = qt(c, n), m = 0, y = f.length; m < y; ++m)
          (h = f[m]) && yl(h, t, n, m, f, v);
        o.push(f), l.push(c);
      }
  return new wn(o, l, t, n);
}
var jp = $r.prototype.constructor;
function Up() {
  return new jp(this._groups, this._parents);
}
function Gp(e, t) {
  var n, i, r;
  return function() {
    var o = Fi(this, e), l = (this.style.removeProperty(e), Fi(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function lh(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Wp(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = Fi(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function qp(e, t, n) {
  var i, r, o;
  return function() {
    var l = Fi(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), Fi(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function Yp(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = sn(this, e), u = a.on, c = a.value[o] == null ? s || (s = lh(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function Kp(e, t, n) {
  var i = (e += "") == "transform" ? K1 : oh;
  return t == null ? this.styleTween(e, Gp(e, i)).on("end.style." + e, lh(e)) : typeof t == "function" ? this.styleTween(e, qp(e, i, Ca(this, "style." + e, t))).each(Yp(this._id, e)) : this.styleTween(e, Wp(e, i, t), n).on("end.style." + e, null);
}
function Xp(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Zp(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && Xp(e, l, n)), i;
  }
  return o._value = t, o;
}
function Jp(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (t == null)
    return this.tween(i, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(i, Zp(e, t, n ?? ""));
}
function Qp(e) {
  return function() {
    this.textContent = e;
  };
}
function eb(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function tb(e) {
  return this.tween("text", typeof e == "function" ? eb(Ca(this, "text", e)) : Qp(e == null ? "" : e + ""));
}
function nb(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function ib(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && nb(r)), t;
  }
  return i._value = e, i;
}
function rb(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, ib(e));
}
function ob() {
  for (var e = this._name, t = this._id, n = sh(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = qt(a, t);
        yl(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new wn(i, this._parents, e, n);
}
function lb() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = sn(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var sb = 0;
function wn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function sh() {
  return ++sb;
}
var dn = $r.prototype;
wn.prototype = {
  constructor: wn,
  select: Hp,
  selectAll: zp,
  selectChild: dn.selectChild,
  selectChildren: dn.selectChildren,
  filter: $p,
  merge: Rp,
  selection: Up,
  transition: ob,
  call: dn.call,
  nodes: dn.nodes,
  node: dn.node,
  size: dn.size,
  empty: dn.empty,
  each: dn.each,
  on: Bp,
  attr: pp,
  attrTween: Sp,
  style: Kp,
  styleTween: Jp,
  text: tb,
  textTween: rb,
  remove: Dp,
  tween: fp,
  delay: Ep,
  duration: Pp,
  ease: Mp,
  easeVarying: Ap,
  end: lb,
  [Symbol.iterator]: dn[Symbol.iterator]
};
function ab(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var ub = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ab
};
function cb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function fb(e) {
  var t, n;
  e instanceof wn ? (t = e._id, e = e._name) : (t = sh(), (n = ub).time = _a(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && yl(a, e, t, u, l, n || cb(a, t));
  return new wn(i, this._parents, e, t);
}
$r.prototype.interrupt = ap;
$r.prototype.transition = fb;
const Es = Math.PI, Vs = 2 * Es, Zn = 1e-6, db = Vs - Zn;
function ah(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function hb(e) {
  let t = Math.floor(e);
  if (!(t >= 0))
    throw new Error(`invalid digits: ${e}`);
  if (t > 15)
    return ah;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class vb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? ah : hb(t);
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
    if (t = +t, n = +n, i = +i, r = +r, o = +o, o < 0)
      throw new Error(`negative radius: ${o}`);
    let l = this._x1, s = this._y1, a = i - t, u = r - n, c = l - t, d = s - n, f = c * c + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (f > Zn)
      if (!(Math.abs(d * a - u * c) > Zn) || !o)
        this._append`L${this._x1 = t},${this._y1 = n}`;
      else {
        let h = i - l, v = r - s, m = a * a + u * u, y = h * h + v * v, g = Math.sqrt(m), w = Math.sqrt(f), _ = o * Math.tan((Es - Math.acos((m + f - y) / (2 * g * w))) / 2), b = _ / w, x = _ / g;
        Math.abs(b - 1) > Zn && this._append`L${t + b * c},${n + b * d}`, this._append`A${o},${o},0,0,${+(d * h > c * v)},${this._x1 = t + x * a},${this._y1 = n + x * u}`;
      }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0)
      throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, d = 1 ^ l, f = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > Zn || Math.abs(this._y1 - c) > Zn) && this._append`L${u},${c}`, i && (f < 0 && (f = f % Vs + Vs), f > db ? this._append`A${i},${i},0,1,${d},${t - s},${n - a}A${i},${i},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > Zn && this._append`A${i},${i},0,${+(f >= Es)},${d},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function mb(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return uh(this.cover(t, n), t, n, e);
}
function uh(e, t, n, i) {
  if (isNaN(t) || isNaN(n))
    return e;
  var r, o = e._root, l = { data: i }, s = e._x0, a = e._y0, u = e._x1, c = e._y1, d, f, h, v, m, y, g, w;
  if (!o)
    return e._root = l, e;
  for (; o.length; )
    if ((m = t >= (d = (s + u) / 2)) ? s = d : u = d, (y = n >= (f = (a + c) / 2)) ? a = f : c = f, r = o, !(o = o[g = y << 1 | m]))
      return r[g] = l, e;
  if (h = +e._x.call(null, o.data), v = +e._y.call(null, o.data), t === h && n === v)
    return l.next = o, r ? r[g] = l : e._root = l, e;
  do
    r = r ? r[g] = new Array(4) : e._root = new Array(4), (m = t >= (d = (s + u) / 2)) ? s = d : u = d, (y = n >= (f = (a + c) / 2)) ? a = f : c = f;
  while ((g = y << 1 | m) === (w = (v >= f) << 1 | h >= d));
  return r[w] = o, r[g] = l, e;
}
function gb(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > d && (d = o));
  if (a > c || u > d)
    return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < i; ++n)
    uh(this, l[n], s[n], e[n]);
  return this;
}
function yb(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t))
    return this;
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
function pb() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length)
      do
        e.push(t.data);
      while (t = t.next);
  }), e;
}
function bb(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function nt(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function wb(e, t, n) {
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
function _b(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(d = +this._y.call(null, e)))
    return this;
  var t, n = this._root, i, r, o, l = this._x0, s = this._y0, a = this._x1, u = this._y1, c, d, f, h, v, m, y, g;
  if (!n)
    return this;
  if (n.length)
    for (; ; ) {
      if ((v = c >= (f = (l + a) / 2)) ? l = f : a = f, (m = d >= (h = (s + u) / 2)) ? s = h : u = h, t = n, !(n = n[y = m << 1 | v]))
        return this;
      if (!n.length)
        break;
      (t[y + 1 & 3] || t[y + 2 & 3] || t[y + 3 & 3]) && (i = t, g = y);
    }
  for (; n.data !== e; )
    if (r = n, !(n = n.next))
      return this;
  return (o = n.next) && delete n.next, r ? (o ? r.next = o : delete r.next, this) : t ? (o ? t[y] = o : delete t[y], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (i ? i[g] = n : this._root = n), this) : (this._root = o, this);
}
function xb(e) {
  for (var t = 0, n = e.length; t < n; ++t)
    this.remove(e[t]);
  return this;
}
function Sb() {
  return this._root;
}
function Cb() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length)
      do
        ++e;
      while (t = t.next);
  }), e;
}
function kb(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new nt(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new nt(r, u, c, s, a)), (r = i[2]) && t.push(new nt(r, o, c, u, a)), (r = i[1]) && t.push(new nt(r, u, l, s, c)), (r = i[0]) && t.push(new nt(r, o, l, u, c));
    }
  return this;
}
function Eb(e) {
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
function Vb(e) {
  return e[0];
}
function Lb(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Pb(e) {
  return e[1];
}
function Tb(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function ka(e, t, n) {
  var i = new Ea(t ?? Vb, n ?? Pb, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Ea(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function cc(e) {
  for (var t = { data: e.data }, n = t; e = e.next; )
    n = n.next = { data: e.data };
  return t;
}
var st = ka.prototype = Ea.prototype;
st.copy = function() {
  var e = new Ea(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t)
    return e;
  if (!t.length)
    return e._root = cc(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = cc(i));
  return e;
};
st.add = mb;
st.addAll = gb;
st.cover = yb;
st.data = pb;
st.extent = bb;
st.find = wb;
st.remove = _b;
st.removeAll = xb;
st.root = Sb;
st.size = Cb;
st.visit = kb;
st.visitAfter = Eb;
st.x = Lb;
st.y = Tb;
function rt(e) {
  return function() {
    return e;
  };
}
function Nn(e) {
  return (e() - 0.5) * 1e-6;
}
function Mb(e) {
  return e.x + e.vx;
}
function Ib(e) {
  return e.y + e.vy;
}
function Ab(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = rt(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, m, y, g = 0; g < o; ++g)
      for (d = ka(t, Mb, Ib).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], m = n[f.index], y = m * m, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(_, b, x, V, C) {
      var T = _.data, $ = _.r, N = m + $;
      if (T) {
        if (T.index > f.index) {
          var z = h - T.x - T.vx, P = v - T.y - T.vy, R = z * z + P * P;
          R < N * N && (z === 0 && (z = Nn(i), R += z * z), P === 0 && (P = Nn(i), R += P * P), R = (N - (R = Math.sqrt(R))) / R * r, f.vx += (z *= R) * (N = ($ *= $) / (y + $)), f.vy += (P *= R) * N, T.vx -= z * (N = 1 - N), T.vy -= P * N);
        }
        return;
      }
      return b > h + N || V < h - N || x > v + N || C < v - N;
    }
  }
  function s(u) {
    if (u.data)
      return u.r = n[u.data.index];
    for (var c = u.r = 0; c < 4; ++c)
      u[c] && u[c].r > u.r && (u.r = u[c].r);
  }
  function a() {
    if (t) {
      var u, c = t.length, d;
      for (n = new Array(c), u = 0; u < c; ++u)
        d = t[u], n[d.index] = +e(d, u, t);
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
function $b(e) {
  return e.index;
}
function fc(e, t) {
  var n = e.get(t);
  if (!n)
    throw new Error("node not found: " + t);
  return n;
}
function Rb(e) {
  var t = $b, n = d, i, r = rt(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(y) {
    return 1 / Math.min(s[y.source.index], s[y.target.index]);
  }
  function f(y) {
    for (var g = 0, w = e.length; g < c; ++g)
      for (var _ = 0, b, x, V, C, T, $, N; _ < w; ++_)
        b = e[_], x = b.source, V = b.target, C = V.x + V.vx - x.x - x.vx || Nn(u), T = V.y + V.vy - x.y - x.vy || Nn(u), $ = Math.sqrt(C * C + T * T), $ = ($ - o[_]) / $ * y * i[_], C *= $, T *= $, V.vx -= C * (N = a[_]), V.vy -= T * N, x.vx += C * (N = 1 - N), x.vy += T * N;
  }
  function h() {
    if (l) {
      var y, g = l.length, w = e.length, _ = new Map(l.map((x, V) => [t(x, V, l), x])), b;
      for (y = 0, s = new Array(g); y < w; ++y)
        b = e[y], b.index = y, typeof b.source != "object" && (b.source = fc(_, b.source)), typeof b.target != "object" && (b.target = fc(_, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
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
const Nb = 1664525, Ob = 1013904223, dc = 4294967296;
function Bb() {
  let e = 1;
  return () => (e = (Nb * e + Ob) % dc) / dc;
}
function Fb(e) {
  return e.x;
}
function Db(e) {
  return e.y;
}
var Hb = 10, zb = Math.PI * (3 - Math.sqrt(5));
function jb(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = xa(d), u = Ar("tick", "end"), c = Bb();
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
        var w = Hb * Math.sqrt(0.5 + m), _ = m * zb;
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
      var w = 0, _ = e.length, b, x, V, C, T;
      for (g == null ? g = 1 / 0 : g *= g, w = 0; w < _; ++w)
        C = e[w], b = m - C.x, x = y - C.y, V = b * b + x * x, V < g && (T = C, g = V);
      return T;
    },
    on: function(m, y) {
      return arguments.length > 1 ? (u.on(m, y), t) : u.on(m);
    }
  };
}
function Ub() {
  var e, t, n, i, r = rt(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, y = ka(e, Fb, Db).visitAfter(d);
    for (i = h, v = 0; v < m; ++v)
      t = e[v], y.visit(f);
  }
  function c() {
    if (e) {
      var h, v = e.length, m;
      for (o = new Array(v), h = 0; h < v; ++h)
        m = e[h], o[m.index] = +r(m, h, e);
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
    if (!h.value)
      return !0;
    var g = h.x - t.x, w = h.y - t.y, _ = y - v, b = g * g + w * w;
    if (_ * _ / a < b)
      return b < s && (g === 0 && (g = Nn(n), b += g * g), w === 0 && (w = Nn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += g * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s)
      return;
    (h.data !== t || h.next) && (g === 0 && (g = Nn(n), b += g * g), w === 0 && (w = Nn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
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
function Gb(e) {
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
function Wb(e) {
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
function _i(e) {
  return function() {
    return e;
  };
}
function qb(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length)
      return t;
    if (n == null)
      t = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0))
        throw new RangeError(`invalid digits: ${n}`);
      t = i;
    }
    return e;
  }, () => new vb(t);
}
function Yb(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ch(e) {
  this._context = e;
}
ch.prototype = {
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
function Kb(e) {
  return new ch(e);
}
function Xb(e) {
  return e[0];
}
function Zb(e) {
  return e[1];
}
function Jb(e, t) {
  var n = _i(!0), i = null, r = Kb, o = null, l = qb(s);
  e = typeof e == "function" ? e : e === void 0 ? Xb : _i(e), t = typeof t == "function" ? t : t === void 0 ? Zb : _i(t);
  function s(a) {
    var u, c = (a = Yb(a)).length, d, f = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(d = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+e(d, u, a), +t(d, u, a));
    if (h)
      return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : _i(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : _i(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : _i(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const oo = (e) => () => e;
function Qb(e, {
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
function mn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
mn.prototype = {
  constructor: mn,
  scale: function(e) {
    return e === 1 ? this : new mn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new mn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var fh = new mn(1, 0, 0);
mn.prototype;
function ql(e) {
  e.stopImmediatePropagation();
}
function Ji(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ew(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function tw() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function hc() {
  return this.__zoom || fh;
}
function nw(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function iw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function rw(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function ow() {
  var e = ew, t = tw, n = rw, i = nw, r = iw, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = ep, u = Ar("start", "zoom", "end"), c, d, f, h = 500, v = 150, m = 0, y = 10;
  function g(S) {
    S.property("__zoom", hc).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", N).filter(r).on("touchstart.zoom", z).on("touchmove.zoom", P).on("touchend.zoom touchcancel.zoom", R).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(S, B, I, G) {
    var A = S.selection ? S.selection() : S;
    A.property("__zoom", hc), S !== A ? x(S, B, I, G) : A.interrupt().each(function() {
      V(this, arguments).event(G).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, g.scaleBy = function(S, B, I, G) {
    g.scaleTo(S, function() {
      var A = this.__zoom.k, F = typeof B == "function" ? B.apply(this, arguments) : B;
      return A * F;
    }, I, G);
  }, g.scaleTo = function(S, B, I, G) {
    g.transform(S, function() {
      var A = t.apply(this, arguments), F = this.__zoom, O = I == null ? b(A) : typeof I == "function" ? I.apply(this, arguments) : I, j = F.invert(O), Y = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(_(w(F, Y), O, j), A, l);
    }, I, G);
  }, g.translateBy = function(S, B, I, G) {
    g.transform(S, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), l);
    }, null, G);
  }, g.translateTo = function(S, B, I, G, A) {
    g.transform(S, function() {
      var F = t.apply(this, arguments), O = this.__zoom, j = G == null ? b(F) : typeof G == "function" ? G.apply(this, arguments) : G;
      return n(fh.translate(j[0], j[1]).scale(O.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), F, l);
    }, G, A);
  };
  function w(S, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === S.k ? S : new mn(B, S.x, S.y);
  }
  function _(S, B, I) {
    var G = B[0] - I[0] * S.k, A = B[1] - I[1] * S.k;
    return G === S.x && A === S.y ? S : new mn(S.k, G, A);
  }
  function b(S) {
    return [(+S[0][0] + +S[1][0]) / 2, (+S[0][1] + +S[1][1]) / 2];
  }
  function x(S, B, I, G) {
    S.on("start.zoom", function() {
      V(this, arguments).event(G).start();
    }).on("interrupt.zoom end.zoom", function() {
      V(this, arguments).event(G).end();
    }).tween("zoom", function() {
      var A = this, F = arguments, O = V(A, F).event(G), j = t.apply(A, F), Y = I == null ? b(j) : typeof I == "function" ? I.apply(A, F) : I, Q = Math.max(j[1][0] - j[0][0], j[1][1] - j[0][1]), le = A.__zoom, de = typeof B == "function" ? B.apply(A, F) : B, J = a(le.invert(Y).concat(Q / le.k), de.invert(Y).concat(Q / de.k));
      return function(ae) {
        if (ae === 1)
          ae = de;
        else {
          var Ce = J(ae), Ue = Q / Ce[2];
          ae = new mn(Ue, Y[0] - Ce[0] * Ue, Y[1] - Ce[1] * Ue);
        }
        O.zoom(null, ae);
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
      var B = Ot(this.that).datum();
      u.call(
        S,
        this.that,
        new Qb(S, {
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
    if (!e.apply(this, arguments))
      return;
    var I = V(this, B).event(S), G = this.__zoom, A = Math.max(o[0], Math.min(o[1], G.k * Math.pow(2, i.apply(this, arguments)))), F = Et(S);
    if (I.wheel)
      (I.mouse[0][0] !== F[0] || I.mouse[0][1] !== F[1]) && (I.mouse[1] = G.invert(I.mouse[0] = F)), clearTimeout(I.wheel);
    else {
      if (G.k === A)
        return;
      I.mouse = [F, G.invert(F)], _o(this), I.start();
    }
    Ji(S), I.wheel = setTimeout(O, v), I.zoom("mouse", n(_(w(G, A), I.mouse[0], I.mouse[1]), I.extent, l));
    function O() {
      I.wheel = null, I.end();
    }
  }
  function $(S, ...B) {
    if (f || !e.apply(this, arguments))
      return;
    var I = S.currentTarget, G = V(this, B, !0).event(S), A = Ot(S.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", Q, !0), F = Et(S, I), O = S.clientX, j = S.clientY;
    Yd(S.view), ql(S), G.mouse = [F, this.__zoom.invert(F)], _o(this), G.start();
    function Y(le) {
      if (Ji(le), !G.moved) {
        var de = le.clientX - O, J = le.clientY - j;
        G.moved = de * de + J * J > m;
      }
      G.event(le).zoom("mouse", n(_(G.that.__zoom, G.mouse[0] = Et(le, I), G.mouse[1]), G.extent, l));
    }
    function Q(le) {
      A.on("mousemove.zoom mouseup.zoom", null), Kd(le.view, G.moved), Ji(le), G.event(le).end();
    }
  }
  function N(S, ...B) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, G = Et(S.changedTouches ? S.changedTouches[0] : S, this), A = I.invert(G), F = I.k * (S.shiftKey ? 0.5 : 2), O = n(_(w(I, F), G, A), t.apply(this, B), l);
      Ji(S), s > 0 ? Ot(this).transition().duration(s).call(x, O, G, S) : Ot(this).call(g.transform, O, G, S);
    }
  }
  function z(S, ...B) {
    if (e.apply(this, arguments)) {
      var I = S.touches, G = I.length, A = V(this, B, S.changedTouches.length === G).event(S), F, O, j, Y;
      for (ql(S), O = 0; O < G; ++O)
        j = I[O], Y = Et(j, this), Y = [Y, this.__zoom.invert(Y), j.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== Y[2] && (A.touch1 = Y, A.taps = 0) : (A.touch0 = Y, F = !0, A.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (A.taps < 2 && (d = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), _o(this), A.start());
    }
  }
  function P(S, ...B) {
    if (this.__zooming) {
      var I = V(this, B).event(S), G = S.changedTouches, A = G.length, F, O, j, Y;
      for (Ji(S), F = 0; F < A; ++F)
        O = G[F], j = Et(O, this), I.touch0 && I.touch0[2] === O.identifier ? I.touch0[0] = j : I.touch1 && I.touch1[2] === O.identifier && (I.touch1[0] = j);
      if (O = I.that.__zoom, I.touch1) {
        var Q = I.touch0[0], le = I.touch0[1], de = I.touch1[0], J = I.touch1[1], ae = (ae = de[0] - Q[0]) * ae + (ae = de[1] - Q[1]) * ae, Ce = (Ce = J[0] - le[0]) * Ce + (Ce = J[1] - le[1]) * Ce;
        O = w(O, Math.sqrt(ae / Ce)), j = [(Q[0] + de[0]) / 2, (Q[1] + de[1]) / 2], Y = [(le[0] + J[0]) / 2, (le[1] + J[1]) / 2];
      } else if (I.touch0)
        j = I.touch0[0], Y = I.touch0[1];
      else
        return;
      I.zoom("touch", n(_(O, j, Y), I.extent, l));
    }
  }
  function R(S, ...B) {
    if (this.__zooming) {
      var I = V(this, B).event(S), G = S.changedTouches, A = G.length, F, O;
      for (ql(S), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < A; ++F)
        O = G[F], I.touch0 && I.touch0[2] === O.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === O.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0)
        I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (O = Et(O, this), Math.hypot(d[0] - O[0], d[1] - O[1]) < y)) {
        var j = Ot(this).on("dblclick.zoom");
        j && j.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : oo(+S), g) : i;
  }, g.filter = function(S) {
    return arguments.length ? (e = typeof S == "function" ? S : oo(!!S), g) : e;
  }, g.touchable = function(S) {
    return arguments.length ? (r = typeof S == "function" ? S : oo(!!S), g) : r;
  }, g.extent = function(S) {
    return arguments.length ? (t = typeof S == "function" ? S : oo([[+S[0][0], +S[0][1]], [+S[1][0], +S[1][1]]]), g) : t;
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
class dh {
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
class lw {
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
    Ie(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class vc {
  constructor() {
    Ie(this, "nodeIdCounter", 0);
    Ie(this, "nodes", []);
    Ie(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new dh(
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
    const a = new lw(l, s, void 0, i, r);
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
function sw(e, t) {
  let n = ow().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return aw(n, e, t);
}
function aw(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
function ei(e) {
  e.preventDefault(), e.stopPropagation();
}
function uw(e, t, n, i) {
  return L1().filter((r) => r.button === 2).on("start", (r, o) => {
    ei(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function cw(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => ei(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function fw(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function dw(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function hw(e, t, n) {
  if (ur(e, t, "link-arrow", "arrow", !1), ur(e, t, "link-arrow-reverse", "arrow", !0), ur(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      Ls(e, t, i);
}
function Ls(e, t, n) {
  e.select("#link-arrow-" + n).empty() && (ur(e, t, "link-arrow-" + n, "arrow " + n, !1, n), ur(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow " + n,
    !0,
    n
  ));
}
function vw(e, t) {
  e.select("#link-arrow-" + t).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + t).select(function() {
    return this.parentNode;
  }).remove();
}
function ur(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${Jb()(t.arrowPoints)}`).style("fill", o || "");
}
function mw(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function gw(e, t, n, i, r) {
  let o = jb(e.nodes).on("tick", () => r()).force(
    "collision",
    Ab().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = yw(e, o, n, i, t), o = vh(o, e, t, t.fixedLinkDistanceEnabled), o = hh(o, t.nodePhysicsEnabled, n, i), o;
}
function yw(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function hh(e, t, n, i) {
  return t ? e.force("charge", Ub().strength(-500)).force("x", Gb(n / 2).strength(0.05)).force("y", Wb(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function vh(e, t, n, i) {
  return i ? e.force(
    "link",
    Rb().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class pw {
  constructor() {
    Ie(this, "hasToolbar", !0);
    Ie(this, "nodeRadius", 24);
    Ie(this, "showNodeLabels", !0);
    Ie(this, "nodePhysicsEnabled", !1);
    Ie(this, "zoomEnabled", !0);
    Ie(this, "showLinkLabels", !0);
    Ie(this, "fixedLinkDistanceEnabled", !1);
    Ie(this, "markerBoxSize", 4);
    Ie(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Ie(this, "markerRef", this.markerBoxSize / 2);
    Ie(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Ie(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
const bw = Object.prototype.toString;
function Ho(e) {
  const t = bw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function ww(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ho(e))
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
function _w(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ho(e))
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
function mc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Ho(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else
    throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Ho(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = _w(e), r = ww(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const lo = " ".repeat(2), mh = " ".repeat(4);
function xw() {
  return gh(this);
}
function gh(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${lo}[
${mh}${Sw(e, n, i, r)}
${lo}]
${lo}rows: ${e.rows}
${lo}columns: ${e.columns}
}`;
}
function Sw(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push(Cw(e.get(u, d), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${mh}`);
}
function Cw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function kw(e, t) {
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
function $t(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Rt(e, t, n) {
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
function Ew(e, t, n) {
  return {
    row: Vw(e, t),
    column: Lw(e, n)
  };
}
function Vw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Lw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function gc(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (so("startRow", t), so("endRow", n), so("startColumn", i), so("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function pl(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function so(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function xi(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function Pw(e) {
  let t = pl(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function Tw(e) {
  let t = pl(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function Mw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function Iw(e) {
  let t = pl(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function Aw(e) {
  let t = pl(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function $w(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function Rw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function Nw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function Ow(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function Bw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function Fw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function Dw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function Hw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function zw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function jw(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Uw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function Gw(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function Ww(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t);
}
class ke {
  static from1DArray(t, n, i) {
    if (t * n !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new we(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, i[l * n + s]);
    return o;
  }
  static rowVector(t) {
    let n = new we(1, t.length);
    for (let i = 0; i < t.length; i++)
      n.set(0, i, t[i]);
    return n;
  }
  static columnVector(t) {
    let n = new we(t.length, 1);
    for (let i = 0; i < t.length; i++)
      n.set(i, 0, t[i]);
    return n;
  }
  static zeros(t, n) {
    return new we(t, n);
  }
  static ones(t, n) {
    return new we(t, n).fill(1);
  }
  static rand(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: r = Math.random } = i;
    let o = new we(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        o.set(l, s, r());
    return o;
  }
  static randInt(t, n, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { min: r = 0, max: o = 1e3, random: l = Math.random } = i;
    if (!Number.isInteger(r))
      throw new TypeError("min must be an integer");
    if (!Number.isInteger(o))
      throw new TypeError("max must be an integer");
    if (r >= o)
      throw new RangeError("min must be smaller than max");
    let s = o - r, a = new we(t, n);
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
    let i = t.rows, r = t.columns, o = new we(i, r);
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
    return ke.isMatrix(t) ? t : new we(t);
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
    let r = new we(this.rows * n, this.columns * i);
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
    $t(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return we.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    $t(this, t), n = ki(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    $t(this, t), $t(this, n);
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
    return we.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Rt(this, t), n = Ei(this, n);
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
    $t(this, t);
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
    xi(this);
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
    xi(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if ($t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    $t(this, t), xi(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if ($t(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    $t(this, t), xi(this);
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
    Rt(this, t), xi(this);
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
    Rt(this, t), xi(this);
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
    ke.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let r = 0; r < n.length; r++)
      i += n[r] * t[r];
    return i;
  }
  mmul(t) {
    t = we.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.columns, o = new we(n, r), l = new Float64Array(i);
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
    t = we.checkMatrix(t);
    let n = new we(2, 2);
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (i + u) * (r + c), f = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, y = (s - i) * (r + l), g = (o - u) * (a + c), w = d + v - m + g, _ = h + m, b = f + v, x = d - f + h + y;
    return n.set(0, 0, w), n.set(0, 1, _), n.set(1, 0, b), n.set(1, 1, x), n;
  }
  strassen3x3(t) {
    t = we.checkMatrix(t);
    let n = new we(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), y = t.get(1, 1), g = t.get(1, 2), w = t.get(2, 0), _ = t.get(2, 1), b = t.get(2, 2), x = (i + r + o - l - s - c - d) * y, V = (i - l) * (-h + y), C = s * (-f + h + m - y - g - w + b), T = (-i + l + s) * (f - h + y), $ = (l + s) * (-f + h), N = i * f, z = (-i + u + c) * (f - v + g), P = (-i + u) * (v - g), R = (u + c) * (-f + v), S = (i + r + o - s - a - u - c) * g, B = c * (-f + v + m - y - g - w + _), I = (-o + c + d) * (y + w - _), G = (o - d) * (y - _), A = o * w, F = (c + d) * (-w + _), O = (-o + s + a) * (g + w - b), j = (o - a) * (g - b), Y = (s + a) * (-w + b), Q = r * m, le = a * _, de = l * v, J = u * h, ae = d * b, Ce = N + A + Q, Ue = x + T + $ + N + I + A + F, Ze = N + z + R + S + A + O + Y, St = V + C + T + N + A + O + j, At = V + T + $ + N + le, E = A + O + j + Y + de, M = N + z + P + B + I + G + A, W = I + G + A + F + J, q = N + z + P + R + ae;
    return n.set(0, 0, Ce), n.set(0, 1, Ue), n.set(0, 2, Ze), n.set(1, 0, St), n.set(1, 1, At), n.set(1, 2, E), n.set(2, 0, M), n.set(2, 1, W), n.set(2, 2, q), n;
  }
  mmulStrassen(t) {
    t = we.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, m = d.columns;
      if (v === f && m === h)
        return d;
      {
        let y = ke.zeros(f, h);
        return y = y.setSubMatrix(d, 0, 0), y;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let m = parseInt(d.rows / 2, 10), y = parseInt(d.columns / 2, 10), g = d.subMatrix(0, m - 1, 0, y - 1), w = f.subMatrix(0, m - 1, 0, y - 1), _ = d.subMatrix(0, m - 1, y, d.columns - 1), b = f.subMatrix(0, m - 1, y, f.columns - 1), x = d.subMatrix(m, d.rows - 1, 0, y - 1), V = f.subMatrix(m, f.rows - 1, 0, y - 1), C = d.subMatrix(m, d.rows - 1, y, d.columns - 1), T = f.subMatrix(m, f.rows - 1, y, f.columns - 1), $ = c(
        ke.add(g, C),
        ke.add(w, T),
        m,
        y
      ), N = c(ke.add(x, C), w, m, y), z = c(g, ke.sub(b, T), m, y), P = c(C, ke.sub(V, w), m, y), R = c(ke.add(g, _), T, m, y), S = c(
        ke.sub(x, g),
        ke.add(w, b),
        m,
        y
      ), B = c(
        ke.sub(_, C),
        ke.add(V, T),
        m,
        y
      ), I = ke.add($, P);
      I.sub(R), I.add(B);
      let G = ke.add(z, R), A = ke.add(N, P), F = ke.sub($, N);
      F.add(z), F.add(S);
      let O = ke.zeros(2 * I.rows, 2 * I.columns);
      return O = O.setSubMatrix(I, 0, 0), O = O.setSubMatrix(G, I.rows, 0), O = O.setSubMatrix(A, 0, I.columns), O = O.setSubMatrix(F, I.rows, I.columns), O.subMatrix(0, h - 1, 0, v - 1);
    }
    return c(n, t, a, u);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: i = 1 } = t;
    if (!Number.isFinite(n))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(i))
      throw new TypeError("max must be a number");
    if (n >= i)
      throw new RangeError("min must be smaller than max");
    let r = new we(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const l = this.getRow(o);
      l.length > 0 && mc(l, { min: n, max: i, output: l }), r.setRow(o, l);
    }
    return r;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: i = 1 } = t;
    if (!Number.isFinite(n))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(i))
      throw new TypeError("max must be a number");
    if (n >= i)
      throw new RangeError("min must be smaller than max");
    let r = new we(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const l = this.getColumn(o);
      l.length && mc(l, {
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
    t = we.checkMatrix(t);
    let n = this.rows, i = this.columns, r = t.rows, o = t.columns, l = new we(n * r, i * o);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < i; a++)
        for (let u = 0; u < r; u++)
          for (let c = 0; c < o; c++)
            l.set(r * s + u, o * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = we.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, i = t.rows, r = this.kroneckerProduct(we.eye(i, i)), o = we.eye(n, n).kroneckerProduct(t);
    return r.add(o);
  }
  transpose() {
    let t = new we(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, n, this.get(n, i));
    return t;
  }
  sortRows(t = yc) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = yc) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    gc(this, t, n, i, r);
    let o = new we(
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
    let r = new we(t.length, i - n + 1);
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
    let r = new we(i - n + 1, t.length);
    for (let o = 0; o < t.length; o++)
      for (let l = n; l <= i; l++) {
        if (t[o] < 0 || t[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[o]}`);
        r.set(l - n, o, this.get(l, t[o]));
      }
    return r;
  }
  setSubMatrix(t, n, i) {
    if (t = we.checkMatrix(t), t.isEmpty())
      return this;
    let r = n + t.rows - 1, o = i + t.columns - 1;
    gc(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = Ew(this, t, n), r = new we(t.length, n.length);
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
    let t = new we(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        t.set(n, i, this.get(n, i));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return Pw(this);
      case "column":
        return Tw(this);
      case void 0:
        return Mw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return Iw(this);
      case "column":
        return Aw(this);
      case void 0:
        return $w(this);
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
        return Rw(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return Nw(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return Ow(this, i, r);
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
        return Bw(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return Fw(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return Dw(this, i), this;
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
          i = Hw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return zw(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = jw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Uw(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = Gw(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return Ww(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return gh(this, t);
  }
}
ke.prototype.klass = "Matrix";
typeof Symbol < "u" && (ke.prototype[Symbol.for("nodejs.util.inspect.custom")] = xw);
function yc(e, t) {
  return e - t;
}
ke.random = ke.rand;
ke.randomInt = ke.randInt;
ke.diagonal = ke.diag;
ke.prototype.diagonal = ke.prototype.diag;
ke.identity = ke.eye;
ke.prototype.negate = ke.prototype.neg;
ke.prototype.tensorProduct = ke.prototype.kroneckerProduct;
class we extends ke {
  constructor(t, n) {
    if (super(), we.isMatrix(t))
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
    return $t(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), $t(this, t, !0), n = Float64Array.from(ki(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
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
    typeof n > "u" && (n = t, t = this.columns), Rt(this, t, !0), n = Ei(this, n);
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
kw(ke, we);
function Yl(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function Kl(e, t, n) {
  const i = new we([[e.x, e.y]]), r = new we([[t.x, t.y]]), o = we.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = yh(10), u = Ri(s, -a).multiply(n.nodeRadius - 1).add(i), c = we.multiply(s, -1), d = Ri(c, a).multiply(n.nodeRadius).add(r).add(Ri(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function pc(e, t, n) {
  const i = new we([[e.x, e.y]]), r = new we([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = we.subtract(i, r), l = o.divide(o.norm("frobenius")), s = yh(40), a = Ri(l, s).multiply(n.nodeRadius - 1).add(i), u = Ri(l, -s).multiply(n.nodeRadius).add(i).add(Ri(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function bc(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function yh(e) {
  return e * (Math.PI / 180);
}
function Ri(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new we([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
function qw(e) {
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
function Yw(e) {
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
var Kw = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xw(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ph = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(Kw, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (I, G, A, F) => G + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], m = [], y, g, w = 0, _ = 0, b = 0, x = 0, V = 0, C = 0, T = 0, $ = 0, N = 0, z = 0, P = 0, R = 0, S = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(I) {
          return I !== "";
        }), m = v, v = v.map(parseFloat), y = v.length, f === "m") {
          if (B += "M ", d === "m" ? (b += v[0], x += v[1]) : (b = v[0], x = v[1]), w = b, _ = x, B += b + " " + x + " ", y > 2)
            for (g = 0; g < y; g += 2)
              d === "m" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "L " + b + " " + x + " ";
        } else if (f === "l")
          for (g = 0; g < y; g += 2)
            d === "l" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "L " + b + " " + x + " ";
        else if (f === "h")
          for (g = 0; g < y; g++)
            d === "h" ? b += v[g] : b = v[g], B += "L " + b + " " + x + " ";
        else if (f === "v")
          for (g = 0; g < y; g++)
            d === "v" ? x += v[g] : x = v[g], B += "L " + b + " " + x + " ";
        else if (f === "q")
          for (g = 0; g < y; g += 4)
            d === "q" ? (V = b + v[g], C = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (V = v[g], C = v[g + 1], b = v[g + 2], x = v[g + 3]), B += "Q " + V + " " + C + " " + b + " " + x + " ";
        else if (f === "t")
          for (g = 0; g < y; g += 2)
            ["t", "q"].indexOf(h) > -1 ? (V = b + (b - V), C = x + (x - C)) : (V = b, C = x), d === "t" ? (b += v[g], x += v[g + 1]) : (b = v[g], x = v[g + 1]), B += "Q " + V + " " + C + " " + b + " " + x + " ", h = f;
        else if (f === "c")
          for (g = 0; g < y; g += 6)
            d === "c" ? (V = b + v[g], C = x + v[g + 1], T = b + v[g + 2], $ = x + v[g + 3], b += v[g + 4], x += v[g + 5]) : (V = v[g], C = v[g + 1], T = v[g + 2], $ = v[g + 3], b = v[g + 4], x = v[g + 5]), B += "C " + V + " " + C + " " + T + " " + $ + " " + b + " " + x + " ";
        else if (f === "s")
          for (g = 0; g < y; g += 4)
            V = b, C = x, ["s", "c"].indexOf(h) > -1 && (V += b - T, C += x - $), d === "s" ? (T = b + v[g], $ = x + v[g + 1], b += v[g + 2], x += v[g + 3]) : (T = v[g], $ = v[g + 1], b = v[g + 2], x = v[g + 3]), B += "C " + V + " " + C + " " + T + " " + $ + " " + b + " " + x + " ";
        else if (f === "a")
          for (g = 0; g < y; g += 7) {
            N = v[g], z = v[g + 1], P = v[g + 2], R = m[g + 3];
            let I = !1;
            if (R.length > 1) {
              let G = parseInt(R[0]), A = parseInt(R[1]), F;
              R.length > 2 && (F = parseFloat(R.substring(2))), v[g + 3] = G, v.splice(g + 4, 0, A), m.splice(g + 4, 0, "+"), F !== void 0 && v.splice(g + 5, 0, F), I = !0;
            }
            R = v[g + 3], S = I ? v[g + 4] : m[g + 4], !I && S.length > 1 && (v[g + 4] = parseInt(S[0]), v.splice(g + 5, 0, parseFloat(S.substring(1)))), S = v[g + 4], d === "a" ? (b += v[g + 5], x += v[g + 6]) : (b = v[g + 5], x = v[g + 6]), B += "A " + N + " " + z + " " + P + " " + R + " " + S + " " + b + " " + x + " ";
          }
        else
          f === "z" && (B += "Z ", b = w, x = _);
        h = f;
      }
      return B.trim();
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
})(ph);
var Zw = ph.exports;
const wc = /* @__PURE__ */ Xw(Zw), Te = typeof window < "u", Va = Te && "IntersectionObserver" in window, Jw = Te && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), _c = Te && "EyeDropper" in window;
function bh(e, t, n) {
  const i = t.length - 1;
  if (i < 0)
    return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function yi(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => yi(e[i], t[i]));
}
function Ps(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), bh(e, t.split("."), n));
}
function vn(e, t, n) {
  if (t === !0)
    return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean")
    return n;
  if (e !== Object(e)) {
    if (typeof t != "function")
      return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string")
    return Ps(e, t, n);
  if (Array.isArray(t))
    return bh(e, t, n);
  if (typeof t != "function")
    return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function La(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, i) => t + i);
}
function he(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function zo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function xr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const xc = Object.freeze({
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
}), Qw = Object.freeze({
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
function ri(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function _h(e, t) {
  const n = {}, i = new Set(Object.keys(e));
  for (const r of t)
    i.has(r) && (n[r] = e[r]);
  return n;
}
function Sc(e, t, n) {
  const i = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    t.some((l) => l instanceof RegExp ? l.test(o) : l === o) && !(n != null && n.some((l) => l === o)) ? i[o] = e[o] : r[o] = e[o];
  return [i, r];
}
function an(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const xh = /^on[^a-z]/, Pa = (e) => xh.test(e), e_ = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function bl(e) {
  const [t, n] = Sc(e, [xh]), i = an(t, e_), [r, o] = Sc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function rn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function t_(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), Ft(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function pt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Cc(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function kc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Ec(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function n_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function Vc(e) {
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
    if (zo(o) && zo(l)) {
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
function Sh(e) {
  return e.map((t) => t.type === Se ? Sh(t.children) : t).flat();
}
function ui() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (ui.cache.has(e))
    return ui.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return ui.cache.set(e, t), t;
}
ui.cache = /* @__PURE__ */ new Map();
function xo(e, t) {
  if (!t || typeof t != "object")
    return [];
  if (Array.isArray(t))
    return t.map((n) => xo(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => xo(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return xo(e, t.component.subTree).flat(1);
  }
  return [];
}
function i_(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function Ta(e) {
  const t = jt({}), n = k(e);
  return on(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), sa(t);
}
function jo(e, t) {
  return e.includes(t);
}
function Ch(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Ht = () => [Function, Array];
function Lc(e, t) {
  return t = "on" + xn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function kh(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else
    typeof e == "function" && e(...n);
}
function Sr(e) {
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
function Uo(e, t) {
  var i, r, o, l;
  const n = Sr(e);
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
    s ? s.focus() : Uo(e, t === "next" ? "first" : "last");
  }
}
function Go(e, t) {
  if (!(Te && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Vh(e) {
  return e.some((t) => Mo(t) ? t.type === Tt ? !1 : t.type !== Se || Vh(t.children) : !0) ? e : null;
}
function r_(e, t) {
  if (!Te || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function o_(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Lh = ["top", "bottom"], l_ = ["start", "end", "left", "right"];
function Ts(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = jo(Lh, n) ? "start" : jo(l_, n) ? "top" : "center"), {
    side: Pc(n, t),
    align: Pc(i, t)
  };
}
function Pc(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Xl(e) {
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
function Zl(e) {
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
function Tc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Mc(e) {
  return jo(Lh, e.side) ? "y" : "x";
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
function Ic(e, t) {
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
  return Array.isArray(e) ? new ci({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Ma(e) {
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
  if (typeof e.animate > "u")
    return {
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
const So = /* @__PURE__ */ new WeakMap();
function s_(e, t) {
  Object.keys(t).forEach((n) => {
    if (Pa(n)) {
      const i = Ch(n), r = So.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), So.has(e) || So.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function a_(e, t) {
  Object.keys(t).forEach((n) => {
    if (Pa(n)) {
      const i = Ch(n), r = So.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Si = 2.4, Ac = 0.2126729, $c = 0.7151522, Rc = 0.072175, u_ = 0.55, c_ = 0.58, f_ = 0.57, d_ = 0.62, ao = 0.03, Nc = 1.45, h_ = 5e-4, v_ = 1.25, m_ = 1.25, Oc = 0.078, Bc = 12.82051282051282, uo = 0.06, Fc = 1e-3;
function Dc(e, t) {
  const n = (e.r / 255) ** Si, i = (e.g / 255) ** Si, r = (e.b / 255) ** Si, o = (t.r / 255) ** Si, l = (t.g / 255) ** Si, s = (t.b / 255) ** Si;
  let a = n * Ac + i * $c + r * Rc, u = o * Ac + l * $c + s * Rc;
  if (a <= ao && (a += (ao - a) ** Nc), u <= ao && (u += (ao - u) ** Nc), Math.abs(u - a) < h_)
    return 0;
  let c;
  if (u > a) {
    const d = (u ** u_ - a ** c_) * v_;
    c = d < Fc ? 0 : d < Oc ? d - d * Bc * uo : d - uo;
  } else {
    const d = (u ** d_ - a ** f_) * m_;
    c = d > -Fc ? 0 : d > -Oc ? d - d * Bc * uo : d + uo;
  }
  return c * 100;
}
function g_(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const Wo = 0.20689655172413793, y_ = (e) => e > Wo ** 3 ? Math.cbrt(e) : e / (3 * Wo ** 2) + 4 / 29, p_ = (e) => e > Wo ? e ** 3 : 3 * Wo ** 2 * (e - 4 / 29);
function Th(e) {
  const t = y_, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Mh(e) {
  const t = p_, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const b_ = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], w_ = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, __ = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], x_ = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Ih(e) {
  const t = Array(3), n = w_, i = b_;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(pt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ia(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = x_, l = __;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function Ms(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function S_(e) {
  return Ms(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Hc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, C_ = {
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
  hsl: (e, t, n, i) => zc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => zc({
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
  if (typeof e == "string" && Hc.test(e)) {
    const {
      groups: t
    } = e.match(Hc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return C_[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Oh(t);
  } else if (typeof e == "object") {
    if (ri(e, ["r", "g", "b"]))
      return e;
    if (ri(e, ["h", "s", "l"]))
      return _n(Aa(e));
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
function zc(e) {
  return _n(Aa(e));
}
function wl(e) {
  if (!e)
    return {
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
function Aa(e) {
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
function Rh(e) {
  return $h(_n(e));
}
function co(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Nh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[co(t), co(n), co(i), r !== void 0 ? co(Math.round(r * 255)) : ""].join("")}`;
}
function Oh(e) {
  e = k_(e);
  let [t, n, i, r] = n_(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Bh(e) {
  const t = Oh(e);
  return wl(t);
}
function Fh(e) {
  return Nh(_n(e));
}
function k_(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = kc(kc(e, 6), 8, "F")), e;
}
function E_(e, t) {
  const n = Th(Ia(e));
  return n[0] = n[0] + t * 10, Ih(Mh(n));
}
function V_(e, t) {
  const n = Th(Ia(e));
  return n[0] = n[0] - t * 10, Ih(Mh(n));
}
function Is(e) {
  const t = Lt(e);
  return Ia(t)[1];
}
function L_(e, t) {
  const n = Is(e), i = Is(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function Dh(e) {
  const t = Math.abs(Dc(Lt(0), Lt(e)));
  return Math.abs(Dc(Lt(16777215), Lt(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
const be = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Hi = Symbol.for("vuetify:defaults");
function P_(e) {
  return re(e);
}
function $a() {
  const e = $e(Hi);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function un(e, t) {
  const n = $a(), i = re(e), r = k(() => {
    if (Ft(t == null ? void 0 : t.disabled))
      return n.value;
    const l = Ft(t == null ? void 0 : t.scoped), s = Ft(t == null ? void 0 : t.reset), a = Ft(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a))
      return n.value;
    let u = bt(i.value, {
      prev: n.value
    });
    if (l)
      return u;
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
  return et(Hi, r), r;
}
function T_(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[ui(t)]) < "u";
}
function M_() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $a();
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
      return u === "class" || u === "style" ? [(d = r.value) == null ? void 0 : d[u], c].filter((m) => m != null) : typeof u == "string" && !T_(i.vnode, u) ? ((f = r.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = me();
  on(() => {
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
    const a = R_(Hi, i);
    et(Hi, k(() => l.value ? bt((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
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
      return _h(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = $a();
      if (!o.value)
        return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = M_(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function ce() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Yt : Ui)(t);
}
function Gi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return ce()({
    name: n ?? xn(ot(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...be()
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
function Hh(e) {
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
const Cr = "cubic-bezier(0.4, 0, 0.2, 1)", I_ = "cubic-bezier(0.0, 0, 0.2, 1)", A_ = "cubic-bezier(0.4, 0, 1, 1)";
function Xe(e, t) {
  const n = ga();
  if (!n)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n;
}
function cn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Xe(e).type;
  return ui((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let zh = 0, Co = /* @__PURE__ */ new WeakMap();
function Mt() {
  const e = Xe("getUid");
  if (Co.has(e))
    return Co.get(e);
  {
    const t = zh++;
    return Co.set(e, t), t;
  }
}
Mt.reset = () => {
  zh = 0, Co = /* @__PURE__ */ new WeakMap();
};
function jh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? $_(e) : Ra(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function qo(e, t) {
  const n = [];
  if (t && e && !t.contains(e))
    return n;
  for (; e && (Ra(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Ra(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function $_(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function R_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Xe("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function N_(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function fe(e) {
  const t = Xe("useRender");
  t.render = e;
}
const pi = Z({
  border: [Boolean, Number, String]
}, "border");
function bi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return {
    borderClasses: k(() => {
      const i = Oe(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const O_ = [null, "default", "comfortable", "compact"], It = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => O_.includes(e)
  }
}, "density");
function Kt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return {
    densityClasses: k(() => `${t}--density-${e.density}`)
  };
}
const Cn = Z({
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
function kn(e) {
  return {
    elevationClasses: k(() => {
      const n = Oe(e) ? e.value : e.elevation, i = [];
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
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return {
    roundedClasses: k(() => {
      const i = Oe(e) ? e.value : e.rounded, r = Oe(e) ? e.value : e.tile, o = [];
      if (i === !0 || i === "")
        o.push(`${t}--rounded`);
      else if (typeof i == "string" || i === 0)
        for (const l of String(i).split(" "))
          o.push(`rounded-${l}`);
      else
        r && o.push("rounded-0");
      return o;
    })
  };
}
const Be = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Yo = Symbol.for("vuetify:theme"), je = Z({
  theme: String
}, "theme");
function jc() {
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
function B_() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : jc();
  const t = jc();
  if (!e)
    return {
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
function F_(e) {
  const t = B_(e), n = re(t.defaultTheme), i = re(t.themes), r = k(() => {
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
              const g = y === "lighten" ? E_ : V_;
              for (const w of La(t.variations[y], 1))
                h.colors[`${v}-${y}-${w}`] = Nh(g(Lt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`])
          continue;
        const m = `on-${v}`, y = Lt(h.colors[v]);
        h.colors[m] = Dh(y);
      }
    }
    return c;
  }), o = k(() => r.value[n.value]), l = k(() => {
    const c = [];
    o.value.dark && Kn(c, ":root", ["color-scheme: dark"]), Kn(c, ":root", Uc(o.value));
    for (const [v, m] of Object.entries(r.value))
      Kn(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Uc(m)]);
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
    if (t.isDisabled)
      return;
    const d = c._context.provides.usehead;
    if (d)
      if (d.push) {
        const h = d.push(s);
        Te && ge(l, () => {
          h.patch(s);
        });
      } else
        Te ? (d.addHeadObjs(k(s)), on(() => d.updateDOM())) : d.addHeadObjs(s());
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
      Te ? ge(l, v, {
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
function Ye(e) {
  Xe("provideTheme");
  const t = $e(Yo, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const n = k(() => e.theme ?? t.name.value), i = k(() => t.themes.value[n.value]), r = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return et(Yo, o), o;
}
function Kn(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Uc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Lt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Is(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Lt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function Na(e) {
  return Ta(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Ms(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && S_(e.value.background)) {
          const i = Lt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = Dh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Ms(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function zt(e, t) {
  const n = k(() => ({
    text: Oe(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Na(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function _t(e, t) {
  const n = k(() => ({
    background: Oe(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Na(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const D_ = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Wi(e, t) {
  return p(Se, null, [e && p("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), p("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const En = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => D_.includes(e)
  }
}, "variant");
function qi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  const n = k(() => {
    const {
      variant: o
    } = Ft(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = Na(k(() => {
    const {
      variant: o,
      color: l
    } = Ft(e);
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
const Uh = Z({
  divided: Boolean,
  ...pi(),
  ...be(),
  ...It(),
  ...Cn(),
  ...dt(),
  ...Be(),
  ...je(),
  ...En()
}, "VBtnGroup"), Gc = ce()({
  name: "VBtnGroup",
  props: Uh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      densityClasses: r
    } = Kt(e), {
      borderClasses: o
    } = bi(e), {
      elevationClasses: l
    } = kn(e), {
      roundedClasses: s
    } = ht(e);
    un({
      VBtn: {
        height: "auto",
        color: se(e, "color"),
        density: se(e, "density"),
        flat: !0,
        variant: se(e, "variant")
      }
    }), fe(() => p(e.tag, {
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
    n = Qs(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  ge(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), lt(() => {
    n == null || n.stop();
  });
}
function Pe(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const o = Xe("useProxiedModel"), l = re(e[t] !== void 0 ? e[t] : n), s = ui(t), u = k(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = o.vnode.props) != null && d.hasOwnProperty(t) || (f = o.vnode.props) != null && f.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = o.vnode.props) != null && d.hasOwnProperty(t) && ((f = o.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  hi(() => !u.value, () => {
    ge(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = k({
    get() {
      const d = e[t];
      return i(u.value ? d : l.value);
    },
    set(d) {
      const f = r(d), h = pe(u.value ? e[t] : l.value);
      h === f || i(h) === d || (l.value = f, o == null || o.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const _l = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), xl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Sl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = Xe("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = Mt();
  et(Symbol.for(`${t.description}:id`), r);
  const o = $e(t, null);
  if (!o) {
    if (!n)
      return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = se(e, "value"), s = k(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), Wt(() => {
    o.unregister(r);
  });
  const a = k(() => o.isSelected(r)), u = k(() => a.value && [o.selectedClass.value, e.selectedClass]);
  return ge(a, (c) => {
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
function Nr(e, t) {
  let n = !1;
  const i = jt([]), r = Pe(e, "modelValue", [], (f) => f == null ? [] : Gh(i, rn(f)), (f) => {
    const h = z_(i, f);
    return e.multiple ? h : h[0];
  }), o = Xe("useGroup");
  function l(f, h) {
    const v = f, m = Symbol.for(`${t.description}:id`), g = xo(m, o == null ? void 0 : o.vnode).indexOf(h);
    Ft(v.value) == null && (v.value = g), g > -1 ? i.splice(g, 0, v) : i.push(v);
  }
  function s(f) {
    if (n)
      return;
    a();
    const h = i.findIndex((v) => v.id === f);
    i.splice(h, 1);
  }
  function a() {
    const f = i.find((h) => !h.disabled);
    f && e.mandatory === "force" && !r.value.length && (r.value = [f.id]);
  }
  Gt(() => {
    a();
  }), Wt(() => {
    n = !0;
  });
  function u(f, h) {
    const v = i.find((m) => m.id === f);
    if (!(h && (v != null && v.disabled)))
      if (e.multiple) {
        const m = r.value.slice(), y = m.findIndex((w) => w === f), g = ~y;
        if (h = h ?? !g, g && e.mandatory && m.length <= 1 || !g && e.max != null && m.length + 1 > e.max)
          return;
        y < 0 && h ? m.push(f) : y >= 0 && !h && m.splice(y, 1), r.value = m;
      } else {
        const m = r.value.includes(f);
        if (e.mandatory && m)
          return;
        r.value = h ?? !m ? [f] : [];
      }
  }
  function c(f) {
    if (e.multiple, r.value.length) {
      const h = r.value[0], v = i.findIndex((g) => g.id === h);
      let m = (v + f) % i.length, y = i[m];
      for (; y.disabled && m !== v; )
        m = (m + f) % i.length, y = i[m];
      if (y.disabled)
        return;
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
    getItemIndex: (f) => H_(i, f)
  };
  return et(t, d), d;
}
function H_(e, t) {
  const n = Gh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function Gh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => yi(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function z_(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const Wh = Symbol.for("vuetify:v-btn-toggle"), j_ = Z({
  ...Uh(),
  ..._l()
}, "VBtnToggle");
ce()({
  name: "VBtnToggle",
  props: j_(),
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
    } = Nr(e, Wh);
    return fe(() => {
      const a = Gc.filterProps(e);
      return p(Gc, ve({
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
const U_ = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), qe = ce(!1)({
  name: "VDefaultsProvider",
  props: U_(),
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
    } = sa(e);
    return un(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), G_ = {
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
}, W_ = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => zn(qh, {
    ...e,
    class: "mdi"
  })
}, Le = [String, Function, Object, Array], As = Symbol.for("vuetify:icons"), Cl = Z({
  icon: {
    type: Le
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Wc = ce()({
  name: "VComponentIcon",
  props: Cl(),
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
}), Oa = Yt({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Cl(),
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
Yt({
  name: "VLigatureIcon",
  props: Cl(),
  setup(e) {
    return () => p(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const qh = Yt({
  name: "VClassIcon",
  props: Cl(),
  setup(e) {
    return () => p(e.tag, {
      class: e.icon
    }, null);
  }
});
function q_() {
  return {
    svg: {
      component: Oa
    },
    class: {
      component: qh
    }
  };
}
function Y_(e) {
  const t = q_(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = W_), bt({
    defaultSet: n,
    sets: t,
    aliases: {
      ...G_,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const K_ = (e) => {
  const t = $e(As);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: k(() => {
      var a;
      const i = Ft(e);
      if (!i)
        return {
          component: Wc
        };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r)
        throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: Oa,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: Wc,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, X_ = ["x-small", "small", "default", "large", "x-large"], Or = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Br(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return Ta(() => {
    let n, i;
    return jo(X_, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: he(e.size),
      height: he(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const Z_ = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Le,
  ...be(),
  ...Or(),
  ...Be({
    tag: "i"
  }),
  ...je()
}, "VIcon"), De = ce()({
  name: "VIcon",
  props: Z_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = re(), {
      themeClasses: o
    } = Ye(e), {
      iconData: l
    } = K_(k(() => r.value || e.icon)), {
      sizeClasses: s
    } = Br(e), {
      textColorClasses: a,
      textColorStyles: u
    } = zt(se(e, "color"));
    return fe(() => {
      var d, f;
      const c = (d = i.default) == null ? void 0 : d.call(i);
      return c && (r.value = (f = Sh(c).filter((h) => h.type === Mr && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), p(l.value.component, {
        tag: e.tag,
        icon: l.value.icon,
        class: ["v-icon", "notranslate", o.value, s.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
          fontSize: he(e.size),
          height: he(e.size),
          width: he(e.size)
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
  const n = re(), i = me(!1);
  if (Va) {
    const r = new IntersectionObserver((o) => {
      e == null || e(o, r), i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    Wt(() => {
      r.disconnect();
    }), ge(n, (o, l) => {
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
function zi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = re(), i = re();
  if (Te) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    Wt(() => {
      r.disconnect();
    }), ge(n, (o, l) => {
      l && (r.unobserve(xr(l)), i.value = void 0), o && r.observe(xr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Tr(i)
  };
}
const J_ = Z({
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
  ...be(),
  ...Or(),
  ...Be({
    tag: "div"
  }),
  ...je()
}, "VProgressCircular"), Kh = ce()({
  name: "VProgressCircular",
  props: J_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = re(), {
      themeClasses: l
    } = Ye(e), {
      sizeClasses: s,
      sizeStyles: a
    } = Br(e), {
      textColorClasses: u,
      textColorStyles: c
    } = zt(se(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = zt(se(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Yh(), {
      resizeRef: m,
      contentRect: y
    } = zi(), g = k(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = k(() => Number(e.width)), _ = k(() => a.value ? Number(e.size) : y.value ? y.value.width : Math.max(w.value, 32)), b = k(() => i / (1 - w.value / _.value) * 2), x = k(() => w.value / _.value * b.value), V = k(() => he((100 - g.value) / 100 * r));
    return on(() => {
      h.value = o.value, m.value = o.value;
    }), fe(() => p(e.tag, {
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
        "stroke-dashoffset": V.value
      }, null)]), n.default && p("div", {
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
      height: he(e.height),
      maxHeight: he(e.maxHeight),
      maxWidth: he(e.maxWidth),
      minHeight: he(e.minHeight),
      minWidth: he(e.minWidth),
      width: he(e.width)
    }))
  };
}
const Q_ = {
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
}, qc = "$vuetify.", Yc = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), Xh = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(qc))
    return Yc(i, o);
  const s = i.replace(qc, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Ps(a, s, null);
  return c || (`${i}${e.value}`, c = Ps(u, s, null)), c || (c = i), typeof c != "string" && (c = i), Yc(c, o);
};
function Zh(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function Jl(e, t, n) {
  const i = Pe(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, ge(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function Jh(e) {
  return (t) => {
    const n = Jl(t, "locale", e.current), i = Jl(t, "fallback", e.fallback), r = Jl(t, "messages", e.messages);
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
function ex(e) {
  const t = me((e == null ? void 0 : e.locale) ?? "en"), n = me((e == null ? void 0 : e.fallback) ?? "en"), i = re({
    en: Q_,
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
const Ko = Symbol.for("vuetify:locale");
function tx(e) {
  return e.name != null;
}
function nx(e) {
  const t = e != null && e.adapter && tx(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : ex(e), n = rx(t, e);
  return {
    ...t,
    ...n
  };
}
function Fr() {
  const e = $e(Ko);
  if (!e)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function ix() {
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
function rx(e, t) {
  const n = re((t == null ? void 0 : t.rtl) ?? ix()), i = k(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: k(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function Xt() {
  const e = $e(Ko);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const Kc = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Dr = Z({
  location: String
}, "location");
function Hr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = Xt();
  return {
    locationStyles: k(() => {
      if (!e.location)
        return {};
      const {
        side: o,
        align: l
      } = Ts(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[Kc[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[Kc[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const ox = Z({
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
  ...be(),
  ...Dr({
    location: "top"
  }),
  ...dt(),
  ...Be(),
  ...je()
}, "VProgressLinear"), Qh = ce()({
  name: "VProgressLinear",
  props: ox(),
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
    } = Ye(e), {
      locationStyles: s
    } = Hr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = zt(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = _t(k(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: h
    } = _t(e, "color"), {
      roundedClasses: v
    } = ht(e), {
      intersectionRef: m,
      isIntersecting: y
    } = Yh(), g = k(() => parseInt(e.max, 10)), w = k(() => parseInt(e.height, 10)), _ = k(() => parseFloat(e.bufferValue) / g.value * 100), b = k(() => parseFloat(i.value) / g.value * 100), x = k(() => r.value !== e.reverse), V = k(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), C = k(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function T($) {
      if (!m.value)
        return;
      const {
        left: N,
        right: z,
        width: P
      } = m.value.getBoundingClientRect(), R = x.value ? P - $.clientX + (z - P) : $.clientX - N;
      i.value = Math.round(R / P * g.value);
    }
    return fe(() => p(e.tag, {
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
        height: e.active ? he(w.value) : 0,
        "--v-progress-linear-height": he(w.value),
        ...s.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : b.value,
      onClick: e.clickable && T
    }, {
      default: () => [e.stream && p("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [x.value ? "left" : "right"]: he(-w.value),
          borderTop: `${he(w.value / 2)} dotted`,
          opacity: C.value,
          top: `calc(50% - ${he(w.value / 4)})`,
          width: he(100 - _.value, "%"),
          "--v-progress-linear-stream-to": he(w.value * (x.value ? 1 : -1))
        }
      }, null), p("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: C.value,
          width: he(e.stream ? _.value : 100, "%")
        }]
      }, null), p(bn, {
        name: V.value
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
            width: he(b.value, "%")
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
}), Ba = Z({
  loading: [Boolean, String]
}, "loader");
function kl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return {
    loaderClasses: k(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Fa(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return p("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || p(Qh, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const lx = ["static", "relative", "fixed", "absolute", "sticky"], El = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => lx.includes(e)
    )
  }
}, "position");
function Vl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  return {
    positionClasses: k(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function sx() {
  const e = Xe("useRoute");
  return k(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function ax() {
  var e, t;
  return (t = (e = Xe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Ll(e, t) {
  const n = fg("RouterLink"), i = k(() => !!(e.href || e.to)), r = k(() => (i == null ? void 0 : i.value) || Lc(t, "click") || Lc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: se(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = sx();
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
const Pl = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let Ql = !1;
function ux(e, t) {
  let n = !1, i, r;
  Te && (ze(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      Ql ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), Ql = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      Ql = !1;
    });
  }), lt(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function cx(e, t) {
  ge(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && ze(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const $s = Symbol("rippleStop"), fx = 80;
function Xc(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Rs(e) {
  return e.constructor.name === "TouchEvent";
}
function ev(e) {
  return e.constructor.name === "KeyboardEvent";
}
const dx = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!ev(e)) {
    const f = t.getBoundingClientRect(), h = Rs(e) ? e.touches[e.touches.length - 1] : e;
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
}, Xo = {
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
    } = dx(e, t, n), d = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = d, r.style.height = d, t.appendChild(i);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), Xc(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), Xc(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function kr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[$s])) {
    if (e[$s] = !0, Rs(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (t.center = n._ripple.centered || ev(e), n._ripple.class && (t.class = n._ripple.class), Rs(e)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        Xo.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, fx);
    } else
      Xo.show(e, n, t);
  }
}
function Zc(e) {
  e[$s] = !0;
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
    }), Xo.hide(t);
  }
}
function nv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Er = !1;
function iv(e) {
  !Er && (e.keyCode === xc.enter || e.keyCode === xc.space) && (Er = !0, kr(e));
}
function rv(e) {
  Er = !1, yt(e);
}
function ov(e) {
  Er && (Er = !1, yt(e));
}
function lv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = tv(i);
  if (o || Xo.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, zo(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", Zc, {
        passive: !0
      }), e.addEventListener("mousedown", Zc);
      return;
    }
    e.addEventListener("touchstart", kr, {
      passive: !0
    }), e.addEventListener("touchend", yt, {
      passive: !0
    }), e.addEventListener("touchmove", nv, {
      passive: !0
    }), e.addEventListener("touchcancel", yt), e.addEventListener("mousedown", kr), e.addEventListener("mouseup", yt), e.addEventListener("mouseleave", yt), e.addEventListener("keydown", iv), e.addEventListener("keyup", rv), e.addEventListener("blur", ov), e.addEventListener("dragstart", yt, {
      passive: !0
    });
  } else
    !o && n && sv(e);
}
function sv(e) {
  e.removeEventListener("mousedown", kr), e.removeEventListener("touchstart", kr), e.removeEventListener("touchend", yt), e.removeEventListener("touchmove", nv), e.removeEventListener("touchcancel", yt), e.removeEventListener("mouseup", yt), e.removeEventListener("mouseleave", yt), e.removeEventListener("keydown", iv), e.removeEventListener("keyup", rv), e.removeEventListener("dragstart", yt), e.removeEventListener("blur", ov);
}
function hx(e, t) {
  lv(e, t, !1);
}
function vx(e) {
  delete e._ripple, sv(e);
}
function mx(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = tv(t.oldValue);
  lv(e, t, n);
}
const wi = {
  mounted: hx,
  unmounted: vx,
  updated: mx
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
  ...be(),
  ...It(),
  ...jn(),
  ...Cn(),
  ...xl(),
  ...Ba(),
  ...Dr(),
  ...El(),
  ...dt(),
  ...Pl(),
  ...Or(),
  ...Be({
    tag: "button"
  }),
  ...je(),
  ...En({
    variant: "elevated"
  })
}, "VBtn"), Qe = ce()({
  name: "VBtn",
  directives: {
    Ripple: wi
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
    } = Ye(e), {
      borderClasses: o
    } = bi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = qi(e), {
      densityClasses: u
    } = Kt(e), {
      dimensionStyles: c
    } = Un(e), {
      elevationClasses: d
    } = kn(e), {
      loaderClasses: f
    } = kl(e), {
      locationStyles: h
    } = Hr(e), {
      positionClasses: v
    } = Vl(e), {
      roundedClasses: m
    } = ht(e), {
      sizeClasses: y,
      sizeStyles: g
    } = Br(e), w = Sl(e, e.symbol, !1), _ = Ll(e, n), b = k(() => {
      var $;
      return e.active !== void 0 ? e.active : _.isLink.value ? ($ = _.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), x = k(() => (w == null ? void 0 : w.disabled.value) || e.disabled), V = k(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), C = k(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function T($) {
      var N;
      x.value || _.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((N = _.navigate) == null || N.call(_, $), w == null || w.toggle());
    }
    return cx(_, w == null ? void 0 : w.select), fe(() => {
      var S, B;
      const $ = _.isLink.value ? "a" : e.tag, N = !!(e.prependIcon || i.prepend), z = !!(e.appendIcon || i.append), P = !!(e.icon && e.icon !== !0), R = (w == null ? void 0 : w.isSelected.value) && (!_.isLink.value || ((S = _.isActive) == null ? void 0 : S.value)) || !w || ((B = _.isActive) == null ? void 0 : B.value);
      return Ge(p($, {
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
        }, r.value, o.value, R ? l.value : void 0, u.value, d.value, f.value, v.value, m.value, y.value, a.value, e.class],
        style: [R ? s.value : void 0, c.value, h.value, g.value, e.style],
        disabled: x.value || void 0,
        href: _.href.value,
        onClick: T,
        value: C.value
      }, {
        default: () => {
          var I;
          return [Wi(!0, "v-btn"), !e.icon && N && p("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? p(qe, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : p(De, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), p("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && P ? p(De, {
            key: "content-icon",
            icon: e.icon
          }, null) : p(qe, {
            key: "content-defaults",
            disabled: !P,
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
          })]), !e.icon && z && p("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? p(qe, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : p(De, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && p("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((I = i.loader) == null ? void 0 : I.call(i)) ?? p(Kh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[Ut("ripple"), !x.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Tl = ce()({
  name: "VCardActions",
  props: be(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return un({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), fe(() => {
      var i;
      return p("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), Vi = Gi("v-card-subtitle"), Vr = Gi("v-card-title");
function gx(e) {
  return {
    aspectStyles: k(() => {
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
  ...be(),
  ...jn()
}, "VResponsive"), Jc = ce()({
  name: "VResponsive",
  props: uv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = gx(e), {
      dimensionStyles: r
    } = Un(e);
    return fe(() => {
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
}), zr = Z({
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
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? $d : bn,
    ...a
  } = typeof i == "object" ? i : {};
  return zn(s, ve(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function yx(e, t) {
  if (!Va)
    return;
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
    if (!u)
      return;
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
const px = {
  mounted: yx,
  unmounted: cv
}, fv = px, bx = Z({
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
  ...be(),
  ...dt(),
  ...zr()
}, "VImg"), dv = ce()({
  name: "VImg",
  directives: {
    intersect: fv
  },
  props: bx(),
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
    } = _t(se(e, "color")), {
      roundedClasses: l
    } = ht(e), s = Xe("VImg"), a = me(""), u = re(), c = me(e.eager ? "loading" : "idle"), d = me(), f = me(), h = k(() => e.src && typeof e.src == "object" ? {
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
    ge(() => e.src, () => {
      m(c.value !== "idle");
    }), ge(v, (P, R) => {
      !P && R && u.value && b(u.value);
    }), cl(() => m());
    function m(P) {
      if (!(e.eager && P) && !(Va && !P && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const R = new Image();
          R.src = h.value.lazySrc, b(R, null);
        }
        h.value.src && ze(() => {
          var R;
          n("loadstart", ((R = u.value) == null ? void 0 : R.currentSrc) || h.value.src), setTimeout(() => {
            var S;
            if (!s.isUnmounted)
              if ((S = u.value) != null && S.complete) {
                if (u.value.naturalWidth || g(), c.value === "error")
                  return;
                v.value || b(u.value, null), c.value === "loading" && y();
              } else
                v.value || b(u.value), w();
          });
        });
      }
    }
    function y() {
      var P;
      s.isUnmounted || (w(), b(u.value), c.value = "loaded", n("load", ((P = u.value) == null ? void 0 : P.currentSrc) || h.value.src));
    }
    function g() {
      var P;
      s.isUnmounted || (c.value = "error", n("error", ((P = u.value) == null ? void 0 : P.currentSrc) || h.value.src));
    }
    function w() {
      const P = u.value;
      P && (a.value = P.currentSrc || P.src);
    }
    let _ = -1;
    Wt(() => {
      clearTimeout(_);
    });
    function b(P) {
      let R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const S = () => {
        if (clearTimeout(_), s.isUnmounted)
          return;
        const {
          naturalHeight: B,
          naturalWidth: I
        } = P;
        B || I ? (d.value = I, f.value = B) : !P.complete && c.value === "loading" && R != null ? _ = window.setTimeout(S, R) : (P.currentSrc.endsWith(".svg") || P.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      S();
    }
    const x = k(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), V = () => {
      var S;
      if (!h.value.src || c.value === "idle")
        return null;
      const P = p("img", {
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
      }, null), R = (S = i.sources) == null ? void 0 : S.call(i);
      return p(gn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [Ge(R ? p("picture", {
          class: "v-img__picture"
        }, [R, P]) : P, [[ln, c.value === "loaded"]])]
      });
    }, C = () => p(gn, {
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
    }), T = () => i.placeholder ? p(gn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && p("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? p(gn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && p("div", {
        class: "v-img__error"
      }, [i.error()])]
    }) : null, N = () => e.gradient ? p("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, z = me(!1);
    {
      const P = ge(v, (R) => {
        R && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            z.value = !0;
          });
        }), P());
      });
    }
    return fe(() => {
      const P = Jc.filterProps(e);
      return Ge(p(Jc, ve({
        class: ["v-img", {
          "v-img--booting": !z.value
        }, r.value, l.value, e.class],
        style: [{
          width: he(e.width === "auto" ? d.value : e.width)
        }, o.value, e.style]
      }, P, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => p(Se, null, [p(V, null, null), p(C, null, null), p(N, null, null), p(T, null, null), p($, null, null)]),
        default: i.default
      }), [[Ut("intersect"), {
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
}), wx = Z({
  start: Boolean,
  end: Boolean,
  icon: Le,
  image: String,
  text: String,
  ...be(),
  ...It(),
  ...dt(),
  ...Or(),
  ...Be(),
  ...je(),
  ...En({
    variant: "flat"
  })
}, "VAvatar"), vi = ce()({
  name: "VAvatar",
  props: wx(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = qi(e), {
      densityClasses: s
    } = Kt(e), {
      roundedClasses: a
    } = ht(e), {
      sizeClasses: u,
      sizeStyles: c
    } = Br(e);
    return fe(() => p(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? p(qe, {
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
      }) : e.image ? p(dv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? p(De, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Wi(!1, "v-avatar")]
    })), {};
  }
}), _x = Z({
  appendAvatar: String,
  appendIcon: Le,
  prependAvatar: String,
  prependIcon: Le,
  subtitle: [String, Number],
  title: [String, Number],
  ...be(),
  ...It()
}, "VCardItem"), xx = ce()({
  name: "VCardItem",
  props: _x(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return fe(() => {
      var u;
      const i = !!(e.prependAvatar || e.prependIcon), r = !!(i || n.prepend), o = !!(e.appendAvatar || e.appendIcon), l = !!(o || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return p("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [r && p("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? p(qe, {
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
      }, n.prepend) : p(Se, null, [e.prependAvatar && p(vi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && p(De, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), p("div", {
        class: "v-card-item__content"
      }, [s && p(Vr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && p(Vi, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && p("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? p(qe, {
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
      }, n.append) : p(Se, null, [e.appendIcon && p(De, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && p(vi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), cr = Gi("v-card-text"), Sx = Z({
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
  ...be(),
  ...It(),
  ...jn(),
  ...Cn(),
  ...Ba(),
  ...Dr(),
  ...El(),
  ...dt(),
  ...Pl(),
  ...Be(),
  ...je(),
  ...En({
    variant: "elevated"
  })
}, "VCard"), Da = ce()({
  name: "VCard",
  directives: {
    Ripple: wi
  },
  props: Sx(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = Ye(e), {
      borderClasses: o
    } = bi(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = qi(e), {
      densityClasses: u
    } = Kt(e), {
      dimensionStyles: c
    } = Un(e), {
      elevationClasses: d
    } = kn(e), {
      loaderClasses: f
    } = kl(e), {
      locationStyles: h
    } = Hr(e), {
      positionClasses: v
    } = Vl(e), {
      roundedClasses: m
    } = ht(e), y = Ll(e, n), g = k(() => e.link !== !1 && y.isLink.value), w = k(() => !e.disabled && e.link !== !1 && (e.link || y.isClickable.value));
    return fe(() => {
      const _ = g.value ? "a" : e.tag, b = !!(i.title || e.title != null), x = !!(i.subtitle || e.subtitle != null), V = b || x, C = !!(i.append || e.appendAvatar || e.appendIcon), T = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), N = V || T || C, z = !!(i.text || e.text != null);
      return Ge(p(_, {
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
          var P;
          return [$ && p("div", {
            key: "image",
            class: "v-card__image"
          }, [i.image ? p(qe, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : p(dv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), p(Fa, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), N && p(xx, {
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
          }), z && p(cr, {
            key: "text"
          }, {
            default: () => {
              var R;
              return [((R = i.text) == null ? void 0 : R.call(i)) ?? e.text];
            }
          }), (P = i.default) == null ? void 0 : P.call(i), i.actions && p(Tl, null, {
            default: i.actions
          }), Wi(w.value, "v-card")];
        }
      }), [[Ut("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), Cx = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function xt(e, t, n) {
  return ce()({
    name: e,
    props: Cx({
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
        const s = i.group ? $d : bn;
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
function hv(e, t) {
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
      return () => zn(bn, {
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
const kx = Z({
  target: [Object, Array]
}, "v-dialog-transition"), Ha = ce()({
  name: "VDialogTransition",
  props: kx(),
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
        } = ef(e.target, r), d = oi(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: I_
        });
        (f = Qc(r)) == null || f.forEach((h) => {
          oi(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Cr
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
        } = ef(e.target, r);
        oi(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: A_
        }).finished.then(() => o()), (f = Qc(r)) == null || f.forEach((h) => {
          oi(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Cr
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? p(bn, ve({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : p(bn, {
      name: "dialog-transition"
    }, n);
  }
});
function Qc(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function ef(e, t) {
  const n = Ph(e), i = Ma(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((g) => parseFloat(g)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
xt("fab-transition", "center center", "out-in");
xt("dialog-bottom-transition");
xt("dialog-top-transition");
const tf = xt("fade-transition"), mv = xt("scale-transition");
xt("scroll-x-transition");
xt("scroll-x-reverse-transition");
xt("scroll-y-transition");
xt("scroll-y-reverse-transition");
xt("slide-x-transition");
xt("slide-x-reverse-transition");
const gv = xt("slide-y-transition");
xt("slide-y-reverse-transition");
const yv = hv("expand-transition", vv()), pv = hv("expand-x-transition", vv("", !0));
function es(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Ex(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function nf(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return es({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return es({
      x: r,
      y: o
    }, t);
  }
  return es({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const bv = {
  static: Px,
  // specific viewport position, usually centered
  connected: Mx
  // connected to a certain element
}, Vx = Z({
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
function Lx(e, t) {
  const n = re({}), i = re();
  Te && hi(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    ge(() => e.locationStrategy, o), lt(() => {
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
function Px() {
}
function Tx(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Ma(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function Mx(e, t, n) {
  (Array.isArray(e.target.value) || N_(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = Ta(() => {
    const v = Ts(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? Xl(v) : Ts(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === Zl(m).align ? {
      preferredAnchor: Tc(v),
      preferredOrigin: Tc(m)
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
  ge([e.target, e.contentEl], (v, m) => {
    let [y, g] = v, [w, _] = m;
    w && !Array.isArray(w) && f.unobserve(w), y && !Array.isArray(y) && f.observe(y), _ && f.unobserve(_), g && f.observe(g);
  }, {
    immediate: !0
  }), lt(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value)
      return;
    const v = Ph(e.target.value), m = Tx(e.contentEl.value, e.isRtl.value), y = qo(e.contentEl.value), g = 12;
    y.length || (y.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = y.reduce((z, P) => {
      const R = P.getBoundingClientRect(), S = new ci({
        x: P === document.documentElement ? 0 : R.x,
        y: P === document.documentElement ? 0 : R.y,
        width: P.clientWidth,
        height: P.clientHeight
      });
      return z ? new ci({
        x: Math.max(z.left, S.left),
        y: Math.max(z.top, S.top),
        width: Math.min(z.right, S.right) - Math.max(z.left, S.left),
        height: Math.min(z.bottom, S.bottom) - Math.max(z.top, S.top)
      }) : S;
    }, void 0);
    w.x += g, w.y += g, w.width -= g * 2, w.height -= g * 2;
    let _ = {
      anchor: r.value,
      origin: o.value
    };
    function b(z) {
      const P = new ci(m), R = nf(z.anchor, v), S = nf(z.origin, P);
      let {
        x: B,
        y: I
      } = Ex(R, S);
      switch (z.anchor.side) {
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
      switch (z.anchor.align) {
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
      return P.x += B, P.y += I, P.width = Math.min(P.width, a.value), P.height = Math.min(P.height, u.value), {
        overflows: Ic(P, w),
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
        x: z,
        y: P,
        overflows: R
      } = b(_);
      x += z, V += P, m.x += z, m.y += P;
      {
        const S = Mc(_.anchor), B = R.x.before || R.x.after, I = R.y.before || R.y.after;
        let G = !1;
        if (["x", "y"].forEach((A) => {
          if (A === "x" && B && !T.x || A === "y" && I && !T.y) {
            const F = {
              anchor: {
                ..._.anchor
              },
              origin: {
                ..._.origin
              }
            }, O = A === "x" ? S === "y" ? Zl : Xl : S === "y" ? Xl : Zl;
            F.anchor = O(F.anchor), F.origin = O(F.origin);
            const {
              overflows: j
            } = b(F);
            (j[A].before <= R[A].before && j[A].after <= R[A].after || j[A].before + j[A].after < (R[A].before + R[A].after) / 2) && (_ = F, G = T[A] = !0);
          }
        }), G)
          continue;
      }
      R.x.before && (x += R.x.before, m.x += R.x.before), R.x.after && (x -= R.x.after, m.x -= R.x.after), R.y.before && (V += R.y.before, m.y += R.y.before), R.y.after && (V -= R.y.after, m.y -= R.y.after);
      {
        const S = Ic(m, w);
        C.x = w.width - S.x.before - S.x.after, C.y = w.height - S.y.before - S.y.after, x += S.x.before, m.x += S.x.before, V += S.y.before, m.y += S.y.before;
      }
      break;
    }
    const N = Mc(_.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
      transformOrigin: `${_.origin.side} ${_.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: he(ts(V)),
      left: e.isRtl.value ? void 0 : he(ts(x)),
      right: e.isRtl.value ? he(ts(-x)) : void 0,
      minWidth: he(N === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: he(rf(pt(C.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: he(rf(pt(C.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: C,
      contentBox: m
    };
  }
  return ge(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), ze(() => {
    const v = h();
    if (!v)
      return;
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
function ts(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function rf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Ns = !0;
const Zo = [];
function Ix(e) {
  !Ns || Zo.length ? (Zo.push(e), Os()) : (Ns = !1, e(), Os());
}
let of = -1;
function Os() {
  cancelAnimationFrame(of), of = requestAnimationFrame(() => {
    const e = Zo.shift();
    e && e(), Zo.length ? Os() : Ns = !0;
  });
}
const ko = {
  none: null,
  close: Rx,
  block: Nx,
  reposition: Ox
}, Ax = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ko
  }
}, "VOverlay-scroll-strategies");
function $x(e, t) {
  if (!Te)
    return;
  let n;
  on(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Qs(), await ze(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = ko[e.scrollStrategy]) == null || i.call(ko, t, e, n);
    }));
  }), lt(() => {
    n == null || n.stop();
  });
}
function Rx(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  wv(e.targetEl.value ?? e.contentEl.value, t);
}
function Nx(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...qo(e.targetEl.value, t.contained ? n : void 0), ...qo(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Ra(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", he(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", he(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", he(r)), s.classList.add("v-overlay-scroll-blocked");
  }), lt(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Ox(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    Ix(() => {
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
  }), lt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function wv(e, t) {
  const n = [document, ...qo(e)];
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
const Bs = Symbol.for("vuetify:v-menu"), Bx = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Fx(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = r_(s, () => {
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
const Dx = Z({
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
  ...Bx()
}, "VOverlay-activator");
function Hx(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = Xe("useActivator"), o = re();
  let l = !1, s = !1, a = !0;
  const u = k(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = k(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = Fx(e, (C) => {
    C === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== C && (a = !0), n.value = C);
  }), h = re(), v = {
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
      Go(C.target, ":focus-visible") !== !1 && (s = !0, C.stopPropagation(), o.value = C.currentTarget || C.target, d());
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
      const T = $e(Bs, null);
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
  ge(i, (C) => {
    C && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), ge(n, (C) => {
    C || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = re();
  on(() => {
    w.value && ze(() => {
      o.value = xr(w.value);
    });
  });
  const _ = re(), b = k(() => e.target === "cursor" && h.value ? h.value : _.value ? xr(_.value) : _v(e.target, r) || o.value), x = k(() => Array.isArray(b.value) ? void 0 : b.value);
  let V;
  return ge(() => !!e.activator, (C) => {
    C && Te ? (V = Qs(), V.run(() => {
      zx(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : V && V.stop();
  }, {
    flush: "post",
    immediate: !0
  }), lt(() => {
    V == null || V.stop();
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
function zx(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  ge(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && ze(() => o());
  }, {
    immediate: !0
  }), ge(() => e.activatorProps, () => {
    o();
  }), lt(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && s_(a, ve(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && a_(a, ve(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = _v(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function _v(e, t) {
  var i, r;
  if (!e)
    return;
  let n;
  if (e === "parent") {
    let o = (r = (i = t == null ? void 0 : t.proxy) == null ? void 0 : i.$el) == null ? void 0 : r.parentNode;
    for (; o != null && o.hasAttribute("data-no-activator"); )
      o = o.parentNode;
    n = o;
  } else
    typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
const Ml = ["sm", "md", "lg", "xl", "xxl"], Fs = Symbol.for("vuetify:display"), lf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, jx = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : lf;
  return bt(lf, e);
};
function sf(e) {
  return Te && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function af(e) {
  return Te && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function uf(e) {
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
    touch: Jw,
    ssr: t === "ssr"
  };
}
function Ux(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = jx(e), r = me(af(t)), o = me(uf(t)), l = jt({}), s = me(sf(t));
  function a() {
    r.value = af(), s.value = sf();
  }
  function u() {
    a(), o.value = uf();
  }
  return on(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), m = s.value >= n.xxl, y = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", g = typeof i == "number" ? i : n[i], w = s.value < g;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = y, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Te && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...sa(l),
    update: u,
    ssr: !!t
  };
}
const Gx = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function za() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
  const n = $e(Fs);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const i = k(() => {
    if (!e.mobileBreakpoint)
      return n.mobile.value;
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
function Wx() {
  if (!Te)
    return me(!1);
  const {
    ssr: e
  } = za();
  if (e) {
    const t = me(!1);
    return Gt(() => {
      t.value = !0;
    }), t;
  } else
    return me(!0);
}
const Il = Z({
  eager: Boolean
}, "lazy");
function ja(e, t) {
  const n = me(!1), i = k(() => n.value || e.eager || t.value);
  ge(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: i,
    onAfterLeave: r
  };
}
function jr() {
  const t = Xe("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const cf = Symbol.for("vuetify:stack"), Qi = jt([]);
function qx(e, t, n) {
  const i = Xe("useStack"), r = !n, o = $e(cf, void 0), l = jt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  et(cf, l);
  const s = me(+t.value);
  hi(e, () => {
    var d;
    const c = (d = Qi.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, r && Qi.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), lt(() => {
      if (r) {
        const f = pe(Qi).findIndex((h) => h[0] === i.uid);
        Qi.splice(f, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = me(!0);
  r && on(() => {
    var d;
    const c = ((d = Qi.at(-1)) == null ? void 0 : d[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = k(() => !l.activeChildren.size);
  return {
    globalTop: Tr(a),
    localTop: u,
    stackStyles: k(() => ({
      zIndex: s.value
    }))
  };
}
function Yx(e) {
  return {
    teleportTarget: k(() => {
      const n = e.value;
      if (n === !0 || !Te)
        return;
      const i = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (i == null)
        return;
      let r = i.querySelector(":scope > .v-overlay-container");
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", i.appendChild(r)), r;
    })
  };
}
function Kx() {
  return !0;
}
function xv(e, t, n) {
  if (!e || Sv(e, n) === !1)
    return !1;
  const i = Hh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target)
    return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Sv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Kx)(e);
}
function Xx(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && xv(e, t, n) && setTimeout(() => {
    Sv(e, n) && i && i(e);
  }, 0);
}
function ff(e, t) {
  const n = Hh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const Zx = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => Xx(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = xv(r, e, t);
    };
    ff(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (ff(e, (n) => {
      var o;
      if (!n || !((o = e._clickOutside) != null && o[t.instance.$.uid]))
        return;
      const {
        onClick: i,
        onMousedown: r
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", i, !0), n.removeEventListener("mousedown", r, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function Jx(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return p(bn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && p("div", ve({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const Ur = Z({
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
  ...Dx(),
  ...be(),
  ...jn(),
  ...Il(),
  ...Vx(),
  ...Ax(),
  ...je(),
  ...zr()
}, "VOverlay"), Dn = ce()({
  name: "VOverlay",
  directives: {
    ClickOutside: Zx
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Ur()
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
    } = Yx(k(() => e.attach || e.contained)), {
      themeClasses: a
    } = Ye(e), {
      rtlClasses: u,
      isRtl: c
    } = Xt(), {
      hasContent: d,
      onAfterLeave: f
    } = ja(e, l), h = _t(k(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: y
    } = qx(l, se(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: g,
      activatorRef: w,
      target: _,
      targetEl: b,
      targetRef: x,
      activatorEvents: V,
      contentEvents: C,
      scrimEvents: T
    } = Hx(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = Un(e), N = Wx(), {
      scopeId: z
    } = jr();
    ge(() => e.disabled, (Q) => {
      Q && (l.value = !1);
    });
    const P = re(), R = re(), {
      contentStyles: S,
      updateLocation: B
    } = Lx(e, {
      isRtl: c,
      contentEl: R,
      target: _,
      isActive: l
    });
    $x(e, {
      root: P,
      contentEl: R,
      targetEl: b,
      isActive: l,
      updateLocation: B
    });
    function I(Q) {
      r("click:outside", Q), e.persistent ? j() : l.value = !1;
    }
    function G() {
      return l.value && v.value;
    }
    Te && ge(l, (Q) => {
      Q ? window.addEventListener("keydown", A) : window.removeEventListener("keydown", A);
    }, {
      immediate: !0
    }), Wt(() => {
      Te && window.removeEventListener("keydown", A);
    });
    function A(Q) {
      var le, de;
      Q.key === "Escape" && v.value && (e.persistent ? j() : (l.value = !1, (le = R.value) != null && le.contains(document.activeElement) && ((de = g.value) == null || de.focus())));
    }
    const F = ax();
    hi(() => e.closeOnBack, () => {
      ux(F, (Q) => {
        v.value && l.value ? (Q(!1), e.persistent ? j() : l.value = !1) : Q();
      });
    });
    const O = re();
    ge(() => l.value && (e.absolute || e.contained) && s.value == null, (Q) => {
      if (Q) {
        const le = jh(P.value);
        le && le !== document.scrollingElement && (O.value = le.scrollTop);
      }
    });
    function j() {
      e.noClickAnimation || R.value && oi(R.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Cr
      });
    }
    function Y() {
      f(), r("afterLeave");
    }
    return fe(() => {
      var Q;
      return p(Se, null, [(Q = n.activator) == null ? void 0 : Q.call(n, {
        isActive: l.value,
        props: ve({
          ref: w,
          targetRef: x
        }, V.value, e.activatorProps)
      }), N.value && d.value && p(Yg, {
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
            top: he(O.value)
          }, e.style],
          ref: P
        }, z, i), [p(Jx, ve({
          color: h,
          modelValue: l.value && !!e.scrim
        }, T.value), null), p(gn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: _.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var le;
            return [Ge(p("div", ve({
              ref: R,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, S.value]
            }, C.value, e.contentProps), [(le = n.default) == null ? void 0 : le.call(n, {
              isActive: l
            })]), [[ln, l.value], [Ut("click-outside"), {
              handler: I,
              closeConditional: G,
              include: () => [g.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: g,
      target: _,
      animateClick: j,
      contentEl: R,
      globalTop: v,
      localTop: m,
      updateLocation: B
    };
  }
}), ns = Symbol("Forwarded refs");
function is(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i)
      return i;
    n = Object.getPrototypeOf(n);
  }
}
function Gn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[ns] = n, new Proxy(e, {
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
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))
        return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, o))
          return !0;
      return !1;
    },
    set(r, o, l) {
      if (Reflect.has(r, o))
        return Reflect.set(r, o, l);
      if (typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))
        return !1;
      for (const s of n)
        if (s.value && Reflect.has(s.value, o))
          return Reflect.set(s.value, o, l);
      return !1;
    },
    getOwnPropertyDescriptor(r, o) {
      var s;
      const l = Reflect.getOwnPropertyDescriptor(r, o);
      if (l)
        return l;
      if (!(typeof o == "symbol" || o.startsWith("$") || o.startsWith("__"))) {
        for (const a of n) {
          if (!a.value)
            continue;
          const u = is(a.value, o) ?? ("_" in a.value ? is((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u)
            return u;
        }
        for (const a of n) {
          const u = a.value && a.value[ns];
          if (!u)
            continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = is(d.value, o);
            if (f)
              return f;
            const h = d.value && d.value[ns];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const Qx = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...Ur({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: Ha
    },
    zIndex: 2400
  })
}, "VDialog"), Ua = ce()({
  name: "VDialog",
  props: Qx(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = jr(), o = re();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = o.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = o.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Sr(o.value.contentEl);
        if (!h.length)
          return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Te && ge(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), ge(i, async (a) => {
      var u, c;
      await ze(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = k(() => ve({
      "aria-haspopup": "dialog",
      "aria-expanded": String(i.value)
    }, e.activatorProps));
    return fe(() => {
      const a = Dn.filterProps(e);
      return p(Dn, ve({
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
          return p(qe, {
            root: "VDialog"
          }, {
            default: () => {
              var f;
              return [(f = n.default) == null ? void 0 : f.call(n, ...c)];
            }
          });
        }
      });
    }), Gn({}, o);
  }
});
function df(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function hf(e) {
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
function e2(e) {
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
const t2 = Symbol.for("vuetify:v-slide-group"), Ga = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: t2
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
  ...be(),
  ...Gx(),
  ...Be(),
  ..._l({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Jo = ce()({
  name: "VSlideGroup",
  props: Ga(),
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
    } = za(e), l = Nr(e, e.symbol), s = me(!1), a = me(0), u = me(0), c = me(0), d = k(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = zi(), {
      resizeRef: v,
      contentRect: m
    } = zi(), y = k(() => l.selected.value.length ? l.items.value.findIndex((j) => j.id === l.selected.value[0]) : -1), g = k(() => l.selected.value.length ? l.items.value.findIndex((j) => j.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Te) {
      let j = -1;
      ge(() => [l.selected.value, h.value, m.value, d.value], () => {
        cancelAnimationFrame(j), j = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Y = d.value ? "width" : "height";
            u.value = h.value[Y], c.value = m.value[Y], s.value = u.value + 1 < c.value;
          }
          if (y.value >= 0 && v.value) {
            const Y = v.value.children[g.value];
            y.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = e2({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: d.value
            }) : s.value && (a.value = hf({
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
    const w = me(!1);
    let _ = 0, b = 0;
    function x(j) {
      const Y = d.value ? "clientX" : "clientY";
      b = (i.value && d.value ? -1 : 1) * a.value, _ = j.touches[0][Y], w.value = !0;
    }
    function V(j) {
      if (!s.value)
        return;
      const Y = d.value ? "clientX" : "clientY", Q = i.value && d.value ? -1 : 1;
      a.value = Q * (b + _ - j.touches[0][Y]);
    }
    function C(j) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function T() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = me(!1);
    function N(j) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const Y of j.composedPath())
          for (const Q of v.value.children)
            if (Q === Y) {
              a.value = hf({
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
    function z(j) {
      $.value = !1;
    }
    function P(j) {
      var Y;
      !$.value && !(j.relatedTarget && ((Y = v.value) != null && Y.contains(j.relatedTarget))) && S();
    }
    function R(j) {
      v.value && (d.value ? j.key === "ArrowRight" ? S(i.value ? "prev" : "next") : j.key === "ArrowLeft" && S(i.value ? "next" : "prev") : j.key === "ArrowDown" ? S("next") : j.key === "ArrowUp" && S("prev"), j.key === "Home" ? S("first") : j.key === "End" && S("last"));
    }
    function S(j) {
      var Y, Q, le, de, J;
      if (v.value)
        if (!j)
          (Y = Sr(v.value)[0]) == null || Y.focus();
        else if (j === "next") {
          const ae = (Q = v.value.querySelector(":focus")) == null ? void 0 : Q.nextElementSibling;
          ae ? ae.focus() : S("first");
        } else if (j === "prev") {
          const ae = (le = v.value.querySelector(":focus")) == null ? void 0 : le.previousElementSibling;
          ae ? ae.focus() : S("last");
        } else
          j === "first" ? (de = v.value.firstElementChild) == null || de.focus() : j === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function B(j) {
      const Y = a.value + (j === "prev" ? -1 : 1) * u.value;
      a.value = pt(Y, 0, c.value - u.value);
    }
    const I = k(() => {
      let j = a.value > c.value - u.value ? -(c.value - u.value) + df(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (j = df(-a.value));
      const Y = i.value && d.value ? -1 : 1;
      return {
        transform: `translate${d.value ? "X" : "Y"}(${Y * j}px)`,
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
    }), F = k(() => Math.abs(a.value) > 0), O = k(() => c.value > Math.abs(a.value) + u.value);
    return fe(() => p(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": A.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: P
    }, {
      default: () => {
        var j, Y, Q;
        return [A.value && p("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && B("prev")
        }, [((j = n.prev) == null ? void 0 : j.call(n, G.value)) ?? p(tf, null, {
          default: () => [p(De, {
            icon: i.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), p("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: T
        }, [p("div", {
          ref: v,
          class: "v-slide-group__content",
          style: I.value,
          onTouchstartPassive: x,
          onTouchmovePassive: V,
          onTouchendPassive: C,
          onFocusin: N,
          onFocusout: z,
          onKeydown: R
        }, [(Y = n.default) == null ? void 0 : Y.call(n, G.value)])]), A.value && p("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !O.value
          }],
          onClick: () => O.value && B("next")
        }, [((Q = n.next) == null ? void 0 : Q.call(n, G.value)) ?? p(tf, null, {
          default: () => [p(De, {
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
}), Cv = Symbol.for("vuetify:v-chip-group"), n2 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: yi
  },
  ...Ga(),
  ...be(),
  ..._l({
    selectedClass: "v-chip--selected"
  }),
  ...Be(),
  ...je(),
  ...En({
    variant: "tonal"
  })
}, "VChipGroup");
ce()({
  name: "VChipGroup",
  props: n2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = Nr(e, Cv);
    return un({
      VChip: {
        color: se(e, "color"),
        disabled: se(e, "disabled"),
        filter: se(e, "filter"),
        variant: se(e, "variant")
      }
    }), fe(() => {
      const u = Jo.filterProps(e);
      return p(Jo, ve(u, {
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
const i2 = Z({
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
  onClick: Ht(),
  onClickOnce: Ht(),
  ...pi(),
  ...be(),
  ...It(),
  ...Cn(),
  ...xl(),
  ...dt(),
  ...Pl(),
  ...Or(),
  ...Be({
    tag: "span"
  }),
  ...je(),
  ...En({
    variant: "tonal"
  })
}, "VChip"), kv = ce()({
  name: "VChip",
  directives: {
    Ripple: wi
  },
  props: i2(),
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
    } = Fr(), {
      borderClasses: l
    } = bi(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = qi(e), {
      densityClasses: c
    } = Kt(e), {
      elevationClasses: d
    } = kn(e), {
      roundedClasses: f
    } = ht(e), {
      sizeClasses: h
    } = Br(e), {
      themeClasses: v
    } = Ye(e), m = Pe(e, "modelValue"), y = Sl(e, Cv, !1), g = Ll(e, n), w = k(() => e.link !== !1 && g.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (!!y || e.link || g.isClickable.value)), b = k(() => ({
      "aria-label": o(e.closeLabel),
      onClick(C) {
        C.stopPropagation(), m.value = !1, i("click:close", C);
      }
    }));
    function x(C) {
      var T;
      i("click", C), _.value && ((T = g.navigate) == null || T.call(g, C), y == null || y.toggle());
    }
    function V(C) {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), x(C));
    }
    return () => {
      const C = g.isLink.value ? "a" : e.tag, T = !!(e.appendIcon || e.appendAvatar), $ = !!(T || r.append), N = !!(r.close || e.closable), z = !!(r.filter || e.filter) && y, P = !!(e.prependIcon || e.prependAvatar), R = !!(P || r.prepend), S = !y || y.isSelected.value;
      return m.value && Ge(p(C, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": _.value,
          "v-chip--filter": z,
          "v-chip--pill": e.pill
        }, v.value, l.value, S ? s.value : void 0, c.value, d.value, f.value, h.value, u.value, y == null ? void 0 : y.selectedClass.value, e.class],
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
          return [Wi(_.value, "v-chip"), z && p(pv, {
            key: "filter"
          }, {
            default: () => [Ge(p("div", {
              class: "v-chip__filter"
            }, [r.filter ? p(qe, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : p(De, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[ln, y.isSelected.value]])]
          }), R && p("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? p(qe, {
            key: "prepend-defaults",
            disabled: !P,
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
          }, r.prepend) : p(Se, null, [e.prependIcon && p(De, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && p(vi, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), p("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((B = r.default) == null ? void 0 : B.call(r, {
            isSelected: y == null ? void 0 : y.isSelected.value,
            selectedClass: y == null ? void 0 : y.selectedClass.value,
            select: y == null ? void 0 : y.select,
            toggle: y == null ? void 0 : y.toggle,
            value: y == null ? void 0 : y.value.value,
            disabled: e.disabled
          })) ?? e.text]), $ && p("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? p(qe, {
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
          }, r.append) : p(Se, null, [e.appendIcon && p(De, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(vi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), N && p("button", ve({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? p(qe, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : p(De, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Ut("ripple"), _.value && e.ripple, null]]);
    };
  }
}), r2 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...be(),
  ...zr({
    transition: {
      component: gv
    }
  })
}, "VCounter"), Ev = ce()({
  name: "VCounter",
  functional: !0,
  props: r2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return fe(() => p(gn, {
      transition: e.transition
    }, {
      default: () => [Ge(p("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[ln, e.active]])]
    })), {};
  }
}), o2 = Z({
  text: String,
  onClick: Ht(),
  ...be(),
  ...je()
}, "VLabel"), Wa = ce()({
  name: "VLabel",
  props: o2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return fe(() => {
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
}), l2 = Z({
  floating: Boolean,
  ...be()
}, "VFieldLabel"), fo = ce()({
  name: "VFieldLabel",
  props: l2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return fe(() => p(Wa, {
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
  } = Fr();
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
    return p(De, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const qa = Z({
  focused: Boolean,
  "onUpdate:focused": Ht()
}, "focus");
function Gr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn();
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
const s2 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ya = Z({
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
    validator: (e) => s2.includes(e)
  },
  "onClick:clear": Ht(),
  "onClick:appendInner": Ht(),
  "onClick:prependInner": Ht(),
  ...be(),
  ...Ba(),
  ...dt(),
  ...je()
}, "VField"), Ka = ce()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...qa(),
    ...Ya()
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
    } = Ye(e), {
      loaderClasses: l
    } = kl(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = Gr(e), {
      InputIcon: d
    } = Vv(e), {
      roundedClasses: f
    } = ht(e), {
      rtlClasses: h
    } = Xt(), v = k(() => e.dirty || e.active), m = k(() => !e.singleLine && !!(e.label || r.label)), y = Mt(), g = k(() => e.id || `input-${y}`), w = k(() => `${g.value}-messages`), _ = re(), b = re(), x = re(), V = k(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: C,
      backgroundColorStyles: T
    } = _t(se(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: N
    } = zt(k(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    ge(v, (R) => {
      if (m.value) {
        const S = _.value.$el, B = b.value.$el;
        requestAnimationFrame(() => {
          const I = Ma(S), G = B.getBoundingClientRect(), A = G.x - I.x, F = G.y - I.y - (I.height / 2 - G.height / 2), O = G.width / 0.75, j = Math.abs(O - I.width) > 1 ? {
            maxWidth: he(O)
          } : void 0, Y = getComputedStyle(S), Q = getComputedStyle(B), le = parseFloat(Y.transitionDuration) * 1e3 || 150, de = parseFloat(Q.getPropertyValue("--v-field-label-scale")), J = Q.getPropertyValue("color");
          S.style.visibility = "visible", B.style.visibility = "hidden", oi(S, {
            transform: `translate(${A}px, ${F}px) scale(${de})`,
            color: J,
            ...j
          }, {
            duration: le,
            easing: Cr,
            direction: R ? "normal" : "reverse"
          }).finished.then(() => {
            S.style.removeProperty("visibility"), B.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const z = k(() => ({
      isActive: v,
      isFocused: a,
      controlRef: x,
      blur: c,
      focus: u
    }));
    function P(R) {
      R.target !== document.activeElement && R.preventDefault();
    }
    return fe(() => {
      var A, F, O;
      const R = e.variant === "outlined", S = r["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || r.clear), I = !!(r["append-inner"] || e.appendInnerIcon || B), G = () => r.label ? r.label({
        ...z.value,
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label;
      return p("div", ve({
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
          "v-field--no-label": !G(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, C.value, s.value, l.value, f.value, h.value, e.class],
        style: [T.value, e.style],
        onClick: P
      }, n), [p("div", {
        class: "v-field__overlay"
      }, null), p(Fa, {
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
      }, null), (A = r["prepend-inner"]) == null ? void 0 : A.call(r, z.value)]), p("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && p(fo, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: g.value,
        style: N.value
      }, {
        default: () => [G()]
      }), p(fo, {
        ref: _,
        for: g.value
      }, {
        default: () => [G()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...z.value,
        props: {
          id: g.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), B && p(pv, {
        key: "clear"
      }, {
        default: () => [Ge(p("div", {
          class: "v-field__clearable",
          onMousedown: (j) => {
            j.preventDefault(), j.stopPropagation();
          }
        }, [r.clear ? r.clear() : p(d, {
          name: "clear"
        }, null)]), [[ln, e.dirty]])]
      }), I && p("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(O = r["append-inner"]) == null ? void 0 : O.call(r, z.value), e.appendInnerIcon && p(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), p("div", {
        class: ["v-field__outline", $.value],
        style: N.value
      }, [R && p(Se, null, [p("div", {
        class: "v-field__outline__start"
      }, null), m.value && p("div", {
        class: "v-field__outline__notch"
      }, [p(fo, {
        ref: b,
        floating: !0,
        for: g.value
      }, {
        default: () => [G()]
      })]), p("div", {
        class: "v-field__outline__end"
      }, null)]), V.value && m.value && p(fo, {
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
function Lv(e) {
  const t = Object.keys(Ka.props).filter((n) => !Pa(n) && n !== "class" && n !== "style");
  return _h(e, t);
}
const a2 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...be(),
  ...zr({
    transition: {
      component: gv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), u2 = ce()({
  name: "VMessages",
  props: a2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => rn(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = zt(k(() => e.color));
    return fe(() => p(gn, {
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
}), c2 = Symbol.for("vuetify:form");
function Pv() {
  return $e(c2, null);
}
const f2 = Z({
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
  ...qa()
}, "validation");
function d2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : cn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Mt();
  const i = Pe(e, "modelValue"), r = k(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Pv(), l = re([]), s = me(!0), a = k(() => !!(rn(i.value === "" ? null : i.value).length || rn(r.value === "" ? null : r.value).length)), u = k(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = k(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), d = k(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? rn(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
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
  }), v = me(!1), m = k(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), y = k(() => e.name ?? Ft(n));
  cl(() => {
    o == null || o.register({
      id: y.value,
      validate: _,
      reset: g,
      resetValidation: w
    });
  }), Wt(() => {
    o == null || o.unregister(y.value);
  }), Gt(async () => {
    f.value.lazy || await _(!0), o == null || o.update(y.value, h.value, d.value);
  }), hi(() => f.value.input, () => {
    ge(r, () => {
      if (r.value != null)
        _();
      else if (e.focused) {
        const b = ge(() => e.focused, (x) => {
          x || _(), b();
        });
      }
    });
  }), hi(() => f.value.blur, () => {
    ge(() => e.focused, (b) => {
      b || _();
    });
  }), ge([h, d], () => {
    o == null || o.update(y.value, h.value, d.value);
  });
  function g() {
    i.value = null, ze(w);
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
const Wr = Z({
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
  "onClick:prepend": Ht(),
  "onClick:append": Ht(),
  ...be(),
  ...It(),
  ...f2()
}, "VInput"), Hn = ce()({
  name: "VInput",
  props: {
    ...Wr()
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
    } = Vv(e), a = Mt(), u = k(() => e.id || `input-${a}`), c = k(() => `${u.value}-messages`), {
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
    } = d2(e, "v-input", u), V = k(() => ({
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
      var T;
      return (T = e.errorMessages) != null && T.length || !m.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return fe(() => {
      var P, R, S, B;
      const T = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), N = C.value.length > 0, z = !e.hideDetails || e.hideDetails === "auto" && (N || !!i.details);
      return p("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, x.value, e.class],
        style: e.style
      }, [T && p("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(P = i.prepend) == null ? void 0 : P.call(i, V.value), e.prependIcon && p(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && p("div", {
        class: "v-input__control"
      }, [(R = i.default) == null ? void 0 : R.call(i, V.value)]), $ && p("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && p(s, {
        key: "append-icon",
        name: "append"
      }, null), (S = i.append) == null ? void 0 : S.call(i, V.value)]), z && p("div", {
        class: "v-input__details"
      }, [p(u2, {
        id: c.value,
        active: N,
        messages: C.value
      }, {
        message: i.message
      }), (B = i.details) == null ? void 0 : B.call(i, V.value)])]);
    }), {
      reset: w,
      resetValidation: _,
      validate: b,
      isValid: y,
      errorMessages: d
    };
  }
}), h2 = Z({
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
  ...Wr({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => rn(e).every((t) => t != null && typeof t == "object")
  },
  ...Ya({
    clearable: !0
  })
}, "VFileInput"), v2 = ce()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: h2(),
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
    } = Fr(), l = Pe(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = Gr(e), c = k(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = k(() => (l.value ?? []).reduce(($, N) => {
      let {
        size: z = 0
      } = N;
      return $ + z;
    }, 0)), f = k(() => Vc(d.value, c.value)), h = k(() => (l.value ?? []).map(($) => {
      const {
        name: N = "",
        size: z = 0
      } = $;
      return e.showSize ? `${N} (${Vc(z, c.value)})` : N;
    })), v = k(() => {
      var N;
      const $ = ((N = l.value) == null ? void 0 : N.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, f.value) : o(e.counterString, $);
    }), m = re(), y = re(), g = re(), w = k(() => s.value || e.active), _ = k(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      g.value !== document.activeElement && (($ = g.value) == null || $.focus()), s.value || a();
    }
    function x($) {
      var N;
      (N = g.value) == null || N.click();
    }
    function V($) {
      i("mousedown:control", $);
    }
    function C($) {
      var N;
      (N = g.value) == null || N.click(), i("click:control", $);
    }
    function T($) {
      $.stopPropagation(), b(), ze(() => {
        l.value = [], kh(e["onClick:clear"], $);
      });
    }
    return ge(l, ($) => {
      (!Array.isArray($) || !$.length) && g.value && (g.value.value = "");
    }), fe(() => {
      const $ = !!(r.counter || e.counter), N = !!($ || r.details), [z, P] = bl(n), {
        modelValue: R,
        ...S
      } = Hn.filterProps(e), B = Lv(e);
      return p(Hn, ve({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (I) => l.value = I,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": _.value
        }, e.class],
        style: e.style,
        "onClick:prepend": x
      }, z, S, {
        centerAffix: !_.value,
        focused: s.value
      }), {
        ...r,
        default: (I) => {
          let {
            id: G,
            isDisabled: A,
            isDirty: F,
            isReadonly: O,
            isValid: j
          } = I;
          return p(Ka, ve({
            ref: y,
            "prepend-icon": e.prependIcon,
            onMousedown: V,
            onClick: C,
            "onClick:clear": T,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, B, {
            id: G.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: A.value,
            focused: s.value,
            error: j.value === !1
          }), {
            ...r,
            default: (Y) => {
              var de;
              let {
                props: {
                  class: Q,
                  ...le
                }
              } = Y;
              return p(Se, null, [p("input", ve({
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
                  if (!J.target)
                    return;
                  const ae = J.target;
                  l.value = [...ae.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, le, P), null), p("div", {
                class: Q
              }, [!!((de = l.value) != null && de.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: d.value,
                totalBytesReadable: f.value
              }) : e.chips ? h.value.map((J) => p(kv, {
                key: J,
                size: "small",
                color: e.color
              }, {
                default: () => [J]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: N ? (I) => {
          var G, A;
          return p(Se, null, [(G = r.details) == null ? void 0 : G.call(r, I), $ && p(Se, null, [p("span", null, null), p(Ev, {
            active: !!((A = l.value) != null && A.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), Gn({}, m, y, g);
  }
}), Tv = Ml.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Mv = Ml.reduce((e, t) => {
  const n = "offset" + xn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Iv = Ml.reduce((e, t) => {
  const n = "order" + xn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), vf = {
  col: Object.keys(Tv),
  offset: Object.keys(Mv),
  order: Object.keys(Iv)
};
function m2(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const g2 = ["auto", "start", "end", "center", "baseline", "stretch"], y2 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Tv,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Mv,
  order: {
    type: [String, Number],
    default: null
  },
  ...Iv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => g2.includes(e)
  },
  ...be(),
  ...Be()
}, "VCol"), ho = ce()({
  name: "VCol",
  props: y2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in vf)
        vf[o].forEach((s) => {
          const a = e[s], u = m2(o, s, a);
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
}), Xa = ["start", "end", "center"], Av = ["space-between", "space-around", "space-evenly"];
function Za(e, t) {
  return Ml.reduce((n, i) => {
    const r = e + xn(i);
    return n[r] = t(), n;
  }, {});
}
const p2 = [...Xa, "baseline", "stretch"], $v = (e) => p2.includes(e), Rv = Za("align", () => ({
  type: String,
  default: null,
  validator: $v
})), b2 = [...Xa, ...Av], Nv = (e) => b2.includes(e), Ov = Za("justify", () => ({
  type: String,
  default: null,
  validator: Nv
})), w2 = [...Xa, ...Av, "stretch"], Bv = (e) => w2.includes(e), Fv = Za("alignContent", () => ({
  type: String,
  default: null,
  validator: Bv
})), mf = {
  align: Object.keys(Rv),
  justify: Object.keys(Ov),
  alignContent: Object.keys(Fv)
}, _2 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function x2(e, t, n) {
  let i = _2[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const S2 = Z({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: $v
  },
  ...Rv,
  justify: {
    type: String,
    default: null,
    validator: Nv
  },
  ...Ov,
  alignContent: {
    type: String,
    default: null,
    validator: Bv
  },
  ...Fv,
  ...be(),
  ...Be()
}, "VRow"), kt = ce()({
  name: "VRow",
  props: S2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in mf)
        mf[o].forEach((l) => {
          const s = e[l], a = x2(o, l, s);
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
}), Qo = Gi("v-spacer", "div", "VSpacer");
function C2(e) {
  const t = me(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), ze(() => t.value = e);
  }
  function o(l) {
    const s = l ? getComputedStyle(l) : {
      transitionDuration: 0.2
    }, a = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (i(), t.value <= 0)
      return;
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
const k2 = Z({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Dr({
    location: "bottom"
  }),
  ...El(),
  ...dt(),
  ...En(),
  ...je(),
  ...an(Ur({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), E2 = ce()({
  name: "VSnackbar",
  props: k2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      locationStyles: r
    } = Hr(e), {
      positionClasses: o
    } = Vl(e), {
      scopeId: l
    } = jr(), {
      themeClasses: s
    } = Ye(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = qi(e), {
      roundedClasses: d
    } = ht(e), f = C2(Number(e.timeout)), h = re(), v = re(), m = me(!1);
    ge(i, g), ge(() => e.timeout, g), Gt(() => {
      i.value && g();
    });
    let y = -1;
    function g() {
      f.reset(), window.clearTimeout(y);
      const x = Number(e.timeout);
      if (!i.value || x === -1)
        return;
      const V = xr(v.value);
      f.start(V), y = window.setTimeout(() => {
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
    return fe(() => {
      const x = Dn.filterProps(e), V = !!(n.default || n.text || e.text);
      return p(Dn, ve({
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
          var C, T;
          return [Wi(!1, "v-snackbar"), e.timer && !m.value && p("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [p(Qh, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), V && p("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((C = n.text) == null ? void 0 : C.call(n)) ?? e.text, (T = n.default) == null ? void 0 : T.call(n)]), n.actions && p(qe, {
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
    }), Gn({}, h);
  }
}), Dv = Symbol.for("vuetify:v-tabs"), V2 = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...an(av({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Ds = ce()({
  name: "VTab",
  props: V2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = zt(e, "sliderColor"), l = re(), s = re(), a = k(() => e.direction === "horizontal"), u = k(() => {
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
        if (!m || !y)
          return;
        const g = getComputedStyle(m).color, w = m.getBoundingClientRect(), _ = y.getBoundingClientRect(), b = a.value ? "x" : "y", x = a.value ? "X" : "Y", V = a.value ? "right" : "bottom", C = a.value ? "width" : "height", T = w[b], $ = _[b], N = T > $ ? w[V] - _[V] : w[b] - _[b], z = Math.sign(N) > 0 ? a.value ? "right" : "bottom" : Math.sign(N) < 0 ? a.value ? "left" : "top" : "center", R = (Math.abs(N) + (Math.sign(N) < 0 ? w[C] : _[C])) / Math.max(w[C], _[C]) || 0, S = w[C] / _[C] || 0, B = 1.5;
        oi(y, {
          backgroundColor: [g, "currentcolor"],
          transform: [`translate${x}(${N}px) scale${x}(${S})`, `translate${x}(${N / B}px) scale${x}(${(R - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(z)
        }, {
          duration: 225,
          easing: Cr
        });
      }
    }
    return fe(() => {
      const d = Qe.filterProps(e);
      return p(Qe, ve({
        symbol: Dv,
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
          return p(Se, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && p("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), Gn({}, l);
  }
});
function L2(e) {
  return e ? e.map((t) => zo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const P2 = Z({
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
  ...Ga({
    mandatory: "force"
  }),
  ...It(),
  ...Be()
}, "VTabs"), T2 = ce()({
  name: "VTabs",
  props: P2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = k(() => L2(e.items)), {
      densityClasses: o
    } = Kt(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = _t(se(e, "bgColor"));
    return un({
      VTab: {
        color: se(e, "color"),
        direction: se(e, "direction"),
        stacked: se(e, "stacked"),
        fixed: se(e, "fixedTabs"),
        sliderColor: se(e, "sliderColor"),
        hideSlider: se(e, "hideSlider")
      }
    }), fe(() => {
      const a = Jo.filterProps(e);
      return p(Jo, ve(a, {
        modelValue: i.value,
        "onUpdate:modelValue": (u) => i.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, o.value, l.value, e.class],
        style: [{
          "--v-tabs-height": he(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: Dv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => p(Ds, ve(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), M2 = Z({
  id: String,
  text: String,
  ...an(Ur({
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
  props: M2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = jr(), o = Mt(), l = k(() => e.id || `v-tooltip-${o}`), s = re(), a = k(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = k(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = k(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), d = k(() => ve({
      "aria-describedby": l.value
    }, e.activatorProps));
    return fe(() => {
      const f = Dn.filterProps(e);
      return p(Dn, ve({
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
    }), Gn({}, s);
  }
}), I2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function A2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function $2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), I2(t);
}
function R2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function N2() {
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
    touchstart: (n) => A2(n, t),
    touchend: (n) => $2(n, t),
    touchmove: (n) => R2(n, t)
  };
}
function O2(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o)
    return;
  const l = N2(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, wh(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function B2(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i)
    return;
  const r = n._touchHandlers[i];
  wh(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const Hv = {
  mounted: O2,
  unmounted: B2
}, F2 = Hv, zv = Symbol.for("vuetify:v-window"), jv = Symbol.for("vuetify:v-window-group"), D2 = Z({
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
  ...be(),
  ...Be(),
  ...je()
}, "VWindow"), H2 = ce()({
  name: "VWindow",
  directives: {
    Touch: Hv
  },
  props: D2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      isRtl: r
    } = Xt(), {
      t: o
    } = Fr(), l = Nr(e, jv), s = re(), a = k(() => r.value ? !e.reverse : e.reverse), u = me(!1), c = k(() => {
      const b = e.direction === "vertical" ? "y" : "x", V = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${V}-transition`;
    }), d = me(0), f = re(void 0), h = k(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    ge(h, (b, x) => {
      const V = l.items.value.length, C = V - 1;
      V <= 2 ? u.value = b < x : b === C && x === 0 ? u.value = !0 : b === 0 && x === C ? u.value = !1 : u.value = b < x;
    }), et(zv, {
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
      const V = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: V
      }) : p(Qe, V, null) : p("div", null, null)), b;
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
            originalEvent: V
          } = x;
          V.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return fe(() => Ge(p(e.tag, {
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
    }), [[Ut("touch"), _.value]])), {
      group: l
    };
  }
});
function Uv() {
  const e = me(!1);
  return Gt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: k(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Tr(e)
  };
}
const z2 = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...be(),
  ...xl(),
  ...Il()
}, "VWindowItem"), gf = ce()({
  name: "VWindowItem",
  directives: {
    Touch: F2
  },
  props: z2(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(zv), r = Sl(e, jv), {
      isBooted: o
    } = Uv();
    if (!i || !r)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = me(!1), s = k(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !l.value || !i || (l.value = !1, i.transitionCount.value > 0 && (i.transitionCount.value -= 1, i.transitionCount.value === 0 && (i.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      l.value || !i || (l.value = !0, i.transitionCount.value === 0 && (i.transitionHeight.value = he((v = i.rootRef.value) == null ? void 0 : v.clientHeight)), i.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function d(v) {
      l.value && ze(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = he(v.clientHeight));
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
    } = ja(e, r.isSelected);
    return fe(() => p(gn, {
      transition: f.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [Ge(p("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[ln, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), j2 = /* @__PURE__ */ We("h3", { class: "heading" }, "Select File", -1), U2 = /* @__PURE__ */ We("b", null, "replace", -1), G2 = /* @__PURE__ */ We("h3", { class: "heading" }, "Preview", -1), W2 = /* @__PURE__ */ We("b", null, "copy", -1), q2 = /* @__PURE__ */ Ui({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = re(!1), o = re(0), l = re(), s = re(!1), a = k(
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
    return (h, v) => (tn(), ni(Ua, {
      modelValue: r.value,
      "onUpdate:modelValue": v[6] || (v[6] = (m) => r.value = m),
      "max-width": "800px"
    }, {
      activator: ue(({ props: m }) => [
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ue(({ props: y }) => [
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
      default: ue(() => [
        p(Da, null, {
          default: ue(() => [
            p(Vr, null, {
              default: ue(() => [
                p(T2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[0] || (v[0] = (m) => o.value = m)
                }, {
                  default: ue(() => [
                    p(Ds, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ue(() => [
                        Fe("Import")
                      ]),
                      _: 1
                    }),
                    p(Ds, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ue(() => [
                        Fe("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            p(cr, null, {
              default: ue(() => [
                p(H2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": v[2] || (v[2] = (m) => o.value = m),
                  class: "ml-4"
                }, {
                  default: ue(() => [
                    p(gf, null, {
                      default: ue(() => [
                        j2,
                        p(v2, {
                          modelValue: l.value,
                          "onUpdate:modelValue": v[1] || (v[1] = (m) => l.value = m),
                          accept: ".tgf",
                          density: "compact",
                          label: "Trivial Graph Format File",
                          rules: u,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        p(cr, null, {
                          default: ue(() => [
                            Fe(" The import is limited to files in trivial graph format. Importing will "),
                            U2,
                            Fe(" your current graph. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    p(gf, null, {
                      default: ue(() => [
                        G2,
                        We("pre", null, Xn(n.graphAsTgf), 1),
                        p(cr, null, {
                          default: ue(() => [
                            Fe("This export action will "),
                            W2,
                            Fe(" the graph in trivial graph format to your clipboard.")
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
            p(Tl, null, {
              default: ue(() => [
                p(Qo),
                p(Qe, {
                  color: "secondary",
                  variant: "text",
                  disabled: !a.value,
                  onClick: v[3] || (v[3] = (m) => d())
                }, {
                  default: ue(() => [
                    Fe("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                p(Qe, {
                  color: "secondary",
                  variant: "text",
                  onClick: v[4] || (v[4] = (m) => f())
                }, {
                  default: ue(() => [
                    Fe("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        p(E2, {
          modelValue: s.value,
          "onUpdate:modelValue": v[5] || (v[5] = (m) => s.value = m),
          timeout: 1500
        }, {
          default: ue(() => [
            Fe("Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Y2 = ".heading{margin-top:10px;margin-bottom:10px}", Ja = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, K2 = /* @__PURE__ */ Ja(q2, [["styles", [Y2]]]), X2 = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...be(),
  ...It(),
  ...Be(),
  ...je()
}, "VTable"), Z2 = ce()({
  name: "VTable",
  props: X2(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = Ye(e), {
      densityClasses: o
    } = Kt(e);
    return fe(() => p(e.tag, {
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
            height: he(e.height)
          }
        }, [p("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), J2 = { class: "text-left" }, Q2 = { class: "text-left" }, eS = { class: "text-left" }, tS = /* @__PURE__ */ Ui({
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
    ], n = re(!1), i = ["Action", "Desktop", "Mobile"];
    return (r, o) => (tn(), ni(Ua, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (l) => n.value = l),
      "max-width": "800px"
    }, {
      activator: ue(({ props: l }) => [
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ue(({ props: s }) => [
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
      default: ue(() => [
        p(Da, null, {
          default: ue(() => [
            p(Vr, { class: "card-header" }, {
              default: ue(() => [
                Fe("Controls")
              ]),
              _: 1
            }),
            p(Z2, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: ue(() => [
                We("thead", null, [
                  We("tr", null, [
                    We("th", J2, Xn(i[0]), 1),
                    We("th", Q2, Xn(i[1]), 1),
                    We("th", eS, Xn(i[2]), 1)
                  ])
                ]),
                We("tbody", null, [
                  (tn(), gs(Se, null, Vg(t, (l) => We("tr", {
                    key: l.action
                  }, [
                    We("td", null, Xn(l.action), 1),
                    We("td", null, Xn(l.desktop), 1),
                    We("td", null, Xn(l.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            p(Tl, null, {
              default: ue(() => [
                p(Qo),
                p(Qe, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (l) => n.value = !1)
                }, {
                  default: ue(() => [
                    Fe(" Close ")
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
}), nS = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", iS = /* @__PURE__ */ Ja(tS, [["styles", [nS]], ["__scopeId", "data-v-6c8401af"]]), rS = Z({
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
  ...be()
}, "VColorPickerCanvas"), oS = Yt({
  name: "VColorPickerCanvas",
  props: rS(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = me(!1), r = re(), o = me(parseFloat(e.width)), l = me(parseFloat(e.height)), s = re({
      x: 0,
      y: 0
    }), a = k({
      get: () => s.value,
      set(y) {
        var _, b;
        if (!r.value)
          return;
        const {
          x: g,
          y: w
        } = y;
        s.value = y, n("update:color", {
          h: ((_ = e.color) == null ? void 0 : _.h) ?? 0,
          s: pt(g, 0, o.value) / o.value,
          v: 1 - pt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = k(() => {
      const {
        x: y,
        y: g
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: he(e.dotSize),
        height: he(e.dotSize),
        transform: `translate(${he(y - w)}, ${he(g - w)})`
      };
    }), {
      resizeRef: c
    } = zi((y) => {
      var _;
      if (!((_ = c.value) != null && _.offsetParent))
        return;
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
        height: V
      } = w;
      a.value = {
        x: pt(y - _, 0, x),
        y: pt(g - b, 0, V)
      };
    }
    function f(y) {
      y.type === "mousedown" && y.preventDefault(), !e.disabled && (h(y), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(y) {
      if (e.disabled || !r.value)
        return;
      i.value = !0;
      const g = i_(y);
      d(g.clientX, g.clientY, r.value.getBoundingClientRect());
    }
    function v() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", v);
    }
    function m() {
      var b;
      if (!r.value)
        return;
      const y = r.value, g = y.getContext("2d");
      if (!g)
        return;
      const w = g.createLinearGradient(0, 0, y.width, 0);
      w.addColorStop(0, "hsla(0, 0%, 100%, 1)"), w.addColorStop(1, `hsla(${((b = e.color) == null ? void 0 : b.h) ?? 0}, 100%, 50%, 1)`), g.fillStyle = w, g.fillRect(0, 0, y.width, y.height);
      const _ = g.createLinearGradient(0, 0, 0, y.height);
      _.addColorStop(0, "hsla(0, 0%, 0%, 0)"), _.addColorStop(1, "hsla(0, 0%, 0%, 1)"), g.fillStyle = _, g.fillRect(0, 0, y.width, y.height);
    }
    return ge(() => {
      var y;
      return (y = e.color) == null ? void 0 : y.h;
    }, m, {
      immediate: !0
    }), ge(() => [o.value, l.value], (y, g) => {
      m(), s.value = {
        x: a.value.x * y[0] / g[0],
        y: a.value.y * y[1] / g[1]
      };
    }, {
      flush: "post"
    }), ge(() => e.color, () => {
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
    }), Gt(() => m()), fe(() => p("div", {
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
function lS(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function sS(e, t) {
  if (t == null || typeof t == "string") {
    const n = Fh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return ri(t, ["r", "g", "b"]) ? n = _n(e) : ri(t, ["h", "s", "l"]) ? n = Ah(e) : ri(t, ["h", "s", "v"]) && (n = e), lS(n, !ri(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Li = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, Hs = {
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
  from: wl
};
var kf;
const aS = {
  ...Hs,
  inputs: (kf = Hs.inputs) == null ? void 0 : kf.slice(0, 3)
}, zs = {
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
  from: Aa
}, uS = {
  ...zs,
  inputs: zs.inputs.slice(0, 3)
}, Gv = {
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
}, cS = {
  ...Gv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, fi = {
  rgb: aS,
  rgba: Hs,
  hsl: uS,
  hsla: zs,
  hex: cS,
  hexa: Gv
}, fS = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return p("div", {
    class: "v-color-picker-edit__input"
  }, [p("input", n, null), p("span", null, [t])]);
}, dS = Z({
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
  ...be()
}, "VColorPickerEdit"), hS = Yt({
  name: "VColorPickerEdit",
  props: dS(),
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
      if (!o)
        return [];
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
            h && n("update:color", o.from(c(l ?? o.to(Li), h.value)));
          }
        };
      });
    });
    return fe(() => {
      var o;
      return p("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => p(fS, l, null)), i.value.length > 1 && p(Qe, {
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
}), Qa = Symbol.for("vuetify:v-slider");
function vS(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function mS(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const gS = Z({
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
  ...Cn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), yS = (e) => {
  const t = k(() => parseFloat(e.min)), n = k(() => parseFloat(e.max)), i = k(() => +e.step > 0 ? parseFloat(e.step) : 0), r = k(() => Math.max(Cc(i.value), Cc(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0)
      return l;
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
}, pS = (e) => {
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
  } = Xt(), a = se(t, "reverse"), u = k(() => t.direction === "vertical"), c = k(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: m
  } = n, y = k(() => parseInt(t.thumbSize, 10)), g = k(() => parseInt(t.tickSize, 10)), w = k(() => parseInt(t.trackSize, 10)), _ = k(() => (f.value - d.value) / h.value), b = se(t, "disabled"), x = k(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), V = k(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), C = k(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), T = me(!1), $ = me(0), N = re(), z = re();
  function P(J) {
    var W;
    const ae = t.direction === "vertical", Ce = ae ? "top" : "left", Ue = ae ? "height" : "width", Ze = ae ? "clientY" : "clientX", {
      [Ce]: St,
      [Ue]: At
    } = (W = N.value) == null ? void 0 : W.$el.getBoundingClientRect(), E = mS(J, Ze);
    let M = Math.min(Math.max((E - St - $.value) / At, 0), 1) || 0;
    return (ae ? c.value : c.value !== s.value) && (M = 1 - M), m(d.value + M * (f.value - d.value));
  }
  const R = (J) => {
    o({
      value: P(J)
    }), T.value = !1, $.value = 0;
  }, S = (J) => {
    z.value = l(J), z.value && (z.value.focus(), T.value = !0, z.value.contains(J.target) ? $.value = vS(J, z.value, t.direction) : ($.value = 0, r({
      value: P(J)
    })), i({
      value: P(J)
    }));
  }, B = {
    passive: !0,
    capture: !0
  };
  function I(J) {
    r({
      value: P(J)
    });
  }
  function G(J) {
    J.stopPropagation(), J.preventDefault(), R(J), window.removeEventListener("mousemove", I, B), window.removeEventListener("mouseup", G);
  }
  function A(J) {
    var ae;
    R(J), window.removeEventListener("touchmove", I, B), (ae = J.target) == null || ae.removeEventListener("touchend", A);
  }
  function F(J) {
    var ae;
    S(J), window.addEventListener("touchmove", I, B), (ae = J.target) == null || ae.addEventListener("touchend", A, {
      passive: !1
    });
  }
  function O(J) {
    J.preventDefault(), S(J), window.addEventListener("mousemove", I, B), window.addEventListener("mouseup", G, {
      passive: !1
    });
  }
  const j = (J) => {
    const ae = (J - d.value) / (f.value - d.value) * 100;
    return pt(isNaN(ae) ? 0 : ae, 0, 100);
  }, Y = se(t, "showTicks"), Q = k(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: j(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: j(parseFloat(J)),
    label: t.ticks[J]
  })) : _.value !== 1 / 0 ? La(_.value + 1).map((J) => {
    const ae = d.value + J * h.value;
    return {
      value: ae,
      position: j(ae)
    };
  }) : [] : []), le = k(() => Q.value.some((J) => {
    let {
      label: ae
    } = J;
    return !!ae;
  })), de = {
    activeThumbRef: z,
    color: se(t, "color"),
    decimals: v,
    disabled: b,
    direction: se(t, "direction"),
    elevation: se(t, "elevation"),
    hasLabels: le,
    isReversed: a,
    indexFromEnd: c,
    min: d,
    max: f,
    mousePressed: T,
    numTicks: _,
    onSliderMousedown: O,
    onSliderTouchstart: F,
    parsedTicks: Q,
    parseMouseMove: P,
    position: j,
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
    trackColor: V,
    trackContainerRef: N,
    trackFillColor: C,
    trackSize: w,
    vertical: u
  };
  return et(Qa, de), de;
}, bS = Z({
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
  ...be()
}, "VSliderThumb"), wS = ce()({
  name: "VSliderThumb",
  directives: {
    Ripple: wi
  },
  props: bS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = $e(Qa), {
      isRtl: o,
      rtlClasses: l
    } = Xt();
    if (!r)
      throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
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
    } = kn(b), {
      textColorClasses: V,
      textColorStyles: C
    } = zt(s), {
      pageup: T,
      pagedown: $,
      end: N,
      home: z,
      left: P,
      right: R,
      down: S,
      up: B
    } = Qw, I = [T, $, N, z, P, R, S, B], G = k(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function A(O, j) {
      if (!I.includes(O.key))
        return;
      O.preventDefault();
      const Y = a.value || 0.1, Q = (e.max - e.min) / Y;
      if ([P, R, S, B].includes(O.key)) {
        const de = (v.value ? [o.value ? P : R, h.value ? S : B] : _.value !== o.value ? [P, B] : [R, B]).includes(O.key) ? 1 : -1, J = O.shiftKey ? 2 : O.ctrlKey ? 1 : 0;
        j = j + de * Y * G.value[J];
      } else if (O.key === z)
        j = e.min;
      else if (O.key === N)
        j = e.max;
      else {
        const le = O.key === $ ? 1 : -1;
        j = j - le * Y * (Q > 100 ? Q / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, j));
    }
    function F(O) {
      const j = A(O, e.modelValue);
      j != null && i("update:modelValue", j);
    }
    return fe(() => {
      const O = he(_.value ? 100 - e.position : e.position, "%");
      return p("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && g.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": O,
          "--v-slider-thumb-size": he(c.value)
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
        class: ["v-slider-thumb__surface", V.value, x.value],
        style: {
          ...C.value
        }
      }, null), Ge(p("div", {
        class: ["v-slider-thumb__ripple", V.value],
        style: C.value
      }, null), [[Ut("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), p(mv, {
        origin: "bottom center"
      }, {
        default: () => {
          var j;
          return [Ge(p("div", {
            class: "v-slider-thumb__label-container"
          }, [p("div", {
            class: ["v-slider-thumb__label"]
          }, [p("div", null, [((j = n["thumb-label"]) == null ? void 0 : j.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[ln, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), _S = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...be()
}, "VSliderTrack"), xS = ce()({
  name: "VSliderTrack",
  props: _S(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Qa);
    if (!i)
      throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
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
    } = ht(l), {
      backgroundColorClasses: g,
      backgroundColorStyles: w
    } = _t(c), {
      backgroundColorClasses: _,
      backgroundColorStyles: b
    } = _t(u), x = k(() => `inset-${f.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), V = k(() => f.value ? "height" : "width"), C = k(() => ({
      [x.value]: "0%",
      [V.value]: "100%"
    })), T = k(() => e.stop - e.start), $ = k(() => ({
      [x.value]: he(e.start, "%"),
      [V.value]: he(T.value, "%")
    })), N = k(() => s.value ? (f.value ? o.value.slice().reverse() : o.value).map((P, R) => {
      var B;
      const S = P.value !== h.value && P.value !== v.value ? he(P.position, "%") : void 0;
      return p("div", {
        key: P.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": P.position >= e.start && P.position <= e.stop,
          "v-slider-track__tick--first": P.value === h.value,
          "v-slider-track__tick--last": P.value === v.value
        }],
        style: {
          [x.value]: S
        }
      }, [(P.label || n["tick-label"]) && p("div", {
        class: "v-slider-track__tick-label"
      }, [((B = n["tick-label"]) == null ? void 0 : B.call(n, {
        tick: P,
        index: R
      })) ?? P.label])]);
    }) : []);
    return fe(() => p("div", {
      class: ["v-slider-track", y.value, e.class],
      style: [{
        "--v-slider-track-size": he(d.value),
        "--v-slider-tick-size": he(a.value)
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
    }, [N.value])])), {};
  }
}), SS = Z({
  ...qa(),
  ...gS(),
  ...Wr(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), yf = ce()({
  name: "VSlider",
  props: SS(),
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
    const r = re(), {
      rtlClasses: o
    } = Xt(), l = yS(e), s = Pe(e, "modelValue", void 0, (V) => l.roundValue(V ?? l.min.value)), {
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
    } = pS({
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
    } = Gr(e), x = k(() => m(s.value));
    return fe(() => {
      const V = Hn.filterProps(e), C = !!(e.label || n.label || n.prepend);
      return p(Hn, ve({
        class: ["v-slider", {
          "v-slider--has-labels": !!n["tick-label"] || y.value,
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
          var $, N;
          return p(Se, null, [(($ = n.label) == null ? void 0 : $.call(n, T)) ?? (e.label ? p(Wa, {
            id: T.id.value,
            class: "v-slider__label",
            text: e.label
          }, null) : void 0), (N = n.prepend) == null ? void 0 : N.call(n, T)]);
        } : void 0,
        default: (T) => {
          let {
            id: $,
            messagesId: N
          } = T;
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
          }, null), p(xS, {
            ref: v,
            start: 0,
            stop: x.value
          }, {
            "tick-label": n["tick-label"]
          }), p(wS, {
            ref: r,
            "aria-describedby": N.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (z) => s.value = z,
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
}), CS = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...be()
}, "VColorPickerPreview"), kS = Yt({
  name: "VColorPickerPreview",
  props: CS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    fl(() => i.abort());
    async function r() {
      if (!_c)
        return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Bh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Li,
          ...s
        });
      } catch {
      }
    }
    return fe(() => {
      var o, l;
      return p("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [_c && p("div", {
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
          background: Rh(e.color ?? Li)
        }
      }, null)]), p("div", {
        class: "v-color-picker-preview__sliders"
      }, [p(yf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Li,
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
      }, null), !e.hideAlpha && p(yf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Li,
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
}), ES = {
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
}, VS = {
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
}, LS = {
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
}, PS = {
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
}, TS = {
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
}, MS = {
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
}, IS = {
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
}, AS = {
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
}, $S = {
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
}, RS = {
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
}, NS = {
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
}, OS = {
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
}, BS = {
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
}, FS = {
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
}, DS = {
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
}, HS = {
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
}, zS = {
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
}, jS = {
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
}, US = {
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
}, GS = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, WS = {
  red: ES,
  pink: VS,
  purple: LS,
  deepPurple: PS,
  indigo: TS,
  blue: MS,
  lightBlue: IS,
  cyan: AS,
  teal: $S,
  green: RS,
  lightGreen: NS,
  lime: OS,
  yellow: BS,
  amber: FS,
  orange: DS,
  deepOrange: HS,
  brown: zS,
  blueGrey: jS,
  grey: US,
  shades: GS
}, qS = Z({
  swatches: {
    type: Array,
    default: () => YS(WS)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...be()
}, "VColorPickerSwatches");
function YS(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const KS = Yt({
  name: "VColorPickerSwatches",
  props: qS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    return fe(() => p("div", {
      class: ["v-color-picker-swatches", e.class],
      style: [{
        maxHeight: he(e.maxHeight)
      }, e.style]
    }, [p("div", null, [e.swatches.map((i) => p("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Lt(r), l = wl(o), s = $h(o);
      return p("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [p("div", {
        style: {
          background: s
        }
      }, [e.color && yi(e.color, l) ? p(De, {
        size: "x-small",
        icon: "$success",
        color: L_(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Wv = Z({
  color: String,
  ...pi(),
  ...be(),
  ...jn(),
  ...Cn(),
  ...Dr(),
  ...El(),
  ...dt(),
  ...Be(),
  ...je()
}, "VSheet"), pf = ce()({
  name: "VSheet",
  props: Wv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = _t(se(e, "color")), {
      borderClasses: l
    } = bi(e), {
      dimensionStyles: s
    } = Un(e), {
      elevationClasses: a
    } = kn(e), {
      locationStyles: u
    } = Hr(e), {
      positionClasses: c
    } = Vl(e), {
      roundedClasses: d
    } = ht(e);
    return fe(() => p(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, d.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), XS = Z({
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
  ...an(Wv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), Qk = Yt({
  name: "VColorPicker",
  props: XS(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = Pe(e, "mode"), n = re(null), i = Pe(e, "modelValue", void 0, (a) => {
      if (a == null || a === "")
        return null;
      let u;
      try {
        u = wl(Lt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? sS(a, e.modelValue) : null), r = k(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = Xt();
    let l = !0;
    ge(i, (a) => {
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
    return Gt(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), un({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), fe(() => {
      const a = pf.filterProps(e);
      return p(pf, ve({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Rh({
            ...r.value ?? Li,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && p(oS, {
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
        }, [!e.hideSliders && p(kS, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && p(hS, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && p(KS, {
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
}), Lr = Symbol.for("vuetify:v-expansion-panel"), ZS = ["default", "accordion", "inset", "popout"], JS = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => ZS.includes(e)
  },
  readonly: Boolean,
  ...be(),
  ..._l(),
  ...Be(),
  ...je()
}, "VExpansionPanels"), bf = ce()({
  name: "VExpansionPanels",
  props: JS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    Nr(e, Lr);
    const {
      themeClasses: i
    } = Ye(e), r = k(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return un({
      VExpansionPanel: {
        color: se(e, "color"),
        readonly: se(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: se(e, "focusable"),
        static: se(e, "static")
      }
    }), fe(() => p(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), QS = Z({
  ...be(),
  ...Il()
}, "VExpansionPanelText"), eC = ce()({
  name: "VExpansionPanelText",
  props: QS(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Lr);
    if (!i)
      throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = ja(e, i.isSelected);
    return fe(() => p(yv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [Ge(p("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && p("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[ln, i.isSelected.value]])];
      }
    })), {};
  }
}), qv = Z({
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
  ...be()
}, "VExpansionPanelTitle"), tC = ce()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: wi
  },
  props: qv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(Lr);
    if (!i)
      throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = _t(e, "color"), l = k(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return fe(() => {
      var s;
      return Ge(p("button", {
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
      }, [n.actions ? n.actions(l.value) : p(De, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[Ut("ripple"), e.ripple]]);
    }), {};
  }
}), nC = Z({
  title: String,
  text: String,
  bgColor: String,
  ...be(),
  ...Cn(),
  ...xl(),
  ...Il(),
  ...dt(),
  ...Be(),
  ...qv()
}, "VExpansionPanel"), eE = ce()({
  name: "VExpansionPanel",
  props: nC(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Sl(e, Lr), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = _t(e, "bgColor"), {
      elevationClasses: l
    } = kn(e), {
      roundedClasses: s
    } = ht(e), a = k(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = k(() => i.group.items.value.reduce((f, h, v) => (i.group.selected.value.includes(h.id) && f.push(v), f), [])), c = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === 1);
    }), d = k(() => {
      const f = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - f === -1);
    });
    return et(Lr, i), un({
      VExpansionPanelText: {
        eager: se(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: se(e, "readonly")
      }
    }), fe(() => {
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
          }, null), h && p(tC, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && p(eC, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), Yv = Symbol.for("vuetify:selection-control-group"), Kv = Z({
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
  ...be(),
  ...It(),
  ...je()
}, "SelectionControlGroup"), iC = Z({
  ...Kv({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
ce()({
  name: "VSelectionControlGroup",
  props: iC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), r = Mt(), o = k(() => e.id || `v-selection-control-group-${r}`), l = k(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return et(Yv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), lt(() => {
          s.delete(a);
        });
      }
    }), un({
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
    }), fe(() => {
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
const eu = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...be(),
  ...Kv()
}, "VSelectionControl");
function rC(e) {
  const t = $e(Yv, void 0), {
    densityClasses: n
  } = Kt(e), i = Pe(e, "modelValue"), r = k(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = k(() => e.falseValue !== void 0 ? e.falseValue : !1), l = k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = k({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? rn(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly)
        return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...rn(i.value), v] : rn(i.value).filter((y) => !e.valueComparator(y, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = zt(k(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = _t(k(() => s.value && !e.error && !e.disabled ? e.color : void 0)), f = k(() => s.value ? e.trueIcon : e.falseIcon);
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
const el = ce()({
  name: "VSelectionControl",
  directives: {
    Ripple: wi
  },
  inheritAttrs: !1,
  props: eu(),
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
    } = rC(e), h = Mt(), v = me(!1), m = me(!1), y = re(), g = k(() => e.id || `input-${h}`), w = k(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      y.value && (y.value.checked = s.value);
    });
    function _(C) {
      w.value && (v.value = !0, Go(C.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function x(C) {
      C.stopPropagation();
    }
    function V(C) {
      w.value && (e.readonly && r && ze(() => r.forceUpdate()), s.value = C.target.checked);
    }
    return fe(() => {
      var z, P;
      const C = i.label ? i.label({
        label: e.label,
        props: {
          for: g.value
        }
      }) : e.label, [T, $] = bl(n), N = p("input", ve({
        ref: y,
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
      return p("div", ve({
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
      }), [p("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(z = i.default) == null ? void 0 : z.call(i, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), Ge(p("div", {
        class: ["v-selection-control__input"]
      }, [((P = i.input) == null ? void 0 : P.call(i, {
        model: s,
        textColorClasses: a,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: N,
        icon: l.value,
        props: {
          onFocus: _,
          onBlur: b,
          id: g.value
        }
      })) ?? p(Se, null, [l.value && p(De, {
        key: "icon",
        icon: l.value
      }, null), N])]), [[Ut("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), C && p(Wa, {
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
}), oC = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Le,
    default: "$checkboxIndeterminate"
  },
  ...eu({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), lC = ce()({
  name: "VCheckboxBtn",
  props: oC(),
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
    return fe(() => {
      const a = an(el.filterProps(e), ["modelValue"]);
      return p(el, ve(a, {
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
}), js = Symbol.for("vuetify:list");
function Xv() {
  const e = $e(js, {
    hasPrepend: me(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: me(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return et(js, t), e;
}
function Zv() {
  return $e(js, null);
}
const tu = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = pe(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
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
}, Jv = (e) => {
  const t = tu(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = pe(o);
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
}, sC = (e) => {
  const t = tu(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = pe(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, aC = (e) => {
  const t = Jv(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = pe(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, uC = {
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
}, Qv = {
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
}, cC = {
  open: Qv.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: i,
      parents: r
    } = e;
    if (!n)
      return i;
    const o = [];
    let l = r.get(t);
    for (; l != null; )
      o.push(l), l = r.get(l);
    return new Set(o);
  }
}, nu = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = pe(i), e && !r) {
        const l = Array.from(o.entries()).reduce((s, a) => {
          let [u, c] = a;
          return c === "on" && s.push(u), s;
        }, []);
        if (l.length === 1 && l[0] === i)
          return o;
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
}, em = (e) => {
  const t = nu(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = pe(o);
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
}, fC = (e) => {
  const t = nu(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = pe(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, dC = (e) => {
  const t = em(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = pe(r), l.has(r) ? o : t.select({
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
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = pe(i);
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
}, Pr = Symbol.for("vuetify:nested"), tm = {
  id: me(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: re(/* @__PURE__ */ new Map()),
    children: re(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: re(!1),
    selectable: re(!1),
    opened: re(/* @__PURE__ */ new Set()),
    activated: re(/* @__PURE__ */ new Set()),
    selected: re(/* @__PURE__ */ new Map()),
    selectedValues: re([])
  }
}, vC = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), mC = (e) => {
  let t = !1;
  const n = re(/* @__PURE__ */ new Map()), i = re(/* @__PURE__ */ new Map()), r = Pe(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = k(() => {
    if (typeof e.activeStrategy == "object")
      return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return sC(e.mandatory);
      case "single-leaf":
        return aC(e.mandatory);
      case "independent":
        return tu(e.mandatory);
      case "single-independent":
      default:
        return Jv(e.mandatory);
    }
  }), l = k(() => {
    if (typeof e.selectStrategy == "object")
      return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return dC(e.mandatory);
      case "leaf":
        return fC(e.mandatory);
      case "independent":
        return nu(e.mandatory);
      case "single-independent":
        return em(e.mandatory);
      case "classic":
      default:
        return hC(e.mandatory);
    }
  }), s = k(() => {
    if (typeof e.openStrategy == "object")
      return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return cC;
      case "single":
        return uC;
      case "multiple":
      default:
        return Qv;
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
    id: me(),
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
        if (t)
          return;
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
  return et(Pr, f), f.root;
}, nm = (e, t) => {
  const n = $e(Pr, tm), i = Symbol(Mt()), r = k(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: k(() => n.root.opened.value.has(r.value)),
    parent: k(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: k(() => n.root.activated.value.has(pe(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: k(() => n.root.selected.value.get(pe(r.value)) === "on"),
    isIndeterminate: k(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: k(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), Wt(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && et(Pr, o), o;
}, gC = () => {
  const e = $e(Pr, tm);
  et(Pr, {
    ...e,
    isGroupActivator: !0
  });
}, yC = Yt({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return gC(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), pC = Z({
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
  ...be(),
  ...Be()
}, "VListGroup"), wf = ce()({
  name: "VListGroup",
  props: pC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = nm(se(e, "value"), !0), l = k(() => `v-list-group--id-${String(o.value)}`), s = Zv(), {
      isBooted: a
    } = Uv();
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
    return fe(() => p(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": i.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && p(qe, {
        defaults: f.value
      }, {
        default: () => [p(yC, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), p(gn, {
        transition: {
          component: yv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [Ge(p("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[ln, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), bC = Gi("v-list-item-subtitle"), wC = Gi("v-list-item-title"), _C = Z({
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
  onClick: Ht(),
  onClickOnce: Ht(),
  ...pi(),
  ...be(),
  ...It(),
  ...jn(),
  ...Cn(),
  ...dt(),
  ...Pl(),
  ...Be(),
  ...je(),
  ...En({
    variant: "text"
  })
}, "VListItem"), tl = ce()({
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
    const o = Ll(e, n), l = k(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: d,
      isGroupActivator: f,
      root: h,
      parent: v,
      openOnSelect: m
    } = nm(l, !1), y = Zv(), g = k(() => {
      var O;
      return e.active !== !1 && (e.active || ((O = o.isActive) == null ? void 0 : O.value) || (h.activatable.value ? a.value : c.value));
    }), w = k(() => e.link !== !1 && o.isLink.value), _ = k(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!y && (h.selectable.value || h.activatable.value || e.value != null))), b = k(() => e.rounded || e.nav), x = k(() => e.color ?? e.activeColor), V = k(() => ({
      color: g.value ? x.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ge(() => {
      var O;
      return (O = o.isActive) == null ? void 0 : O.value;
    }, (O) => {
      O && v.value != null && h.open(v.value, !0), O && m(O);
    }, {
      immediate: !0
    });
    const {
      themeClasses: C
    } = Ye(e), {
      borderClasses: T
    } = bi(e), {
      colorClasses: $,
      colorStyles: N,
      variantClasses: z
    } = qi(V), {
      densityClasses: P
    } = Kt(e), {
      dimensionStyles: R
    } = Un(e), {
      elevationClasses: S
    } = kn(e), {
      roundedClasses: B
    } = ht(b), I = k(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), G = k(() => ({
      isActive: g.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: d.value
    }));
    function A(O) {
      var j;
      r("click", O), !(f || !_.value) && ((j = o.navigate) == null || j.call(o, O), h.activatable ? s(!a.value, O) : (h.selectable || e.value != null) && u(!c.value, O));
    }
    function F(O) {
      (O.key === "Enter" || O.key === " ") && (O.preventDefault(), A(O));
    }
    return fe(() => {
      const O = w.value ? "a" : e.tag, j = i.title || e.title != null, Y = i.subtitle || e.subtitle != null, Q = !!(e.appendAvatar || e.appendIcon), le = !!(Q || i.append), de = !!(e.prependAvatar || e.prependIcon), J = !!(de || i.prepend);
      return y == null || y.updateHasPrepend(J), e.activeColor && g_("active-color", ["color", "base-color"]), Ge(p(O, {
        class: ["v-list-item", {
          "v-list-item--active": g.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": _.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (y == null ? void 0 : y.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && g.value
        }, C.value, T.value, $.value, P.value, S.value, I.value, B.value, z.value, e.class],
        style: [N.value, R.value, e.style],
        href: o.href.value,
        tabindex: _.value ? y ? -2 : 0 : void 0,
        onClick: A,
        onKeydown: _.value && !w.value && F
      }, {
        default: () => {
          var ae;
          return [Wi(_.value || g.value, "v-list-item"), J && p("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? p(qe, {
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
              var Ce;
              return [(Ce = i.prepend) == null ? void 0 : Ce.call(i, G.value)];
            }
          }) : p(Se, null, [e.prependAvatar && p(vi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && p(De, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), p("div", {
            class: "v-list-item__spacer"
          }, null)]), p("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [j && p(wC, {
            key: "title"
          }, {
            default: () => {
              var Ce;
              return [((Ce = i.title) == null ? void 0 : Ce.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && p(bC, {
            key: "subtitle"
          }, {
            default: () => {
              var Ce;
              return [((Ce = i.subtitle) == null ? void 0 : Ce.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (ae = i.default) == null ? void 0 : ae.call(i, G.value)]), le && p("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? p(qe, {
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
              var Ce;
              return [(Ce = i.append) == null ? void 0 : Ce.call(i, G.value)];
            }
          }) : p(Se, null, [e.appendIcon && p(De, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(vi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), p("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Ut("ripple"), _.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: y,
      select: u
    };
  }
}), xC = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...be(),
  ...Be()
}, "VListSubheader"), SC = ce()({
  name: "VListSubheader",
  props: xC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = zt(se(e, "color"));
    return fe(() => {
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
}), CC = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...be(),
  ...je()
}, "VDivider"), kC = ce()({
  name: "VDivider",
  props: CC(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      textColorClasses: r,
      textColorStyles: o
    } = zt(se(e, "color")), l = k(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = he(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = he(e.thickness)), s;
    });
    return fe(() => p("hr", {
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
}), EC = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), im = ce()({
  name: "VListChildren",
  props: EC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Xv(), () => {
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
          })) ?? p(kC, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? p(SC, s, null);
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
        }, d = wf.filterProps(s);
        return l ? p(wf, ve({
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
            }) : p(tl, y, c);
          },
          default: () => p(im, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : p(tl, ve(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), rm = Z({
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
function Us(e, t) {
  const n = vn(t, e.itemTitle, t), i = vn(t, e.itemValue, n), r = vn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? an(t, ["children"]) : t : void 0 : vn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? om(e, r) : void 0,
    raw: t
  };
}
function om(e, t) {
  const n = [];
  for (const i of t)
    n.push(Us(e, i));
  return n;
}
function VC(e) {
  const t = k(() => om(e, e.items)), n = k(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? Us(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || Us(e, l));
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
function LC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function PC(e, t) {
  const n = vn(t, e.itemType, "item"), i = LC(t) ? t : vn(t, e.itemTitle), r = vn(t, e.itemValue, void 0), o = vn(t, e.itemChildren), l = e.itemProps === !0 ? an(t, ["children"]) : vn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? lm(e, o) : void 0,
    raw: t
  };
}
function lm(e, t) {
  const n = [];
  for (const i of t)
    n.push(PC(e, i));
  return n;
}
function TC(e) {
  return {
    items: k(() => lm(e, e.items))
  };
}
const MC = Z({
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
  ...vC({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...pi(),
  ...be(),
  ...It(),
  ...jn(),
  ...Cn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...rm(),
  ...dt(),
  ...Be(),
  ...je(),
  ...En({
    variant: "text"
  })
}, "VList"), IC = ce()({
  name: "VList",
  props: MC(),
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
    } = TC(e), {
      themeClasses: r
    } = Ye(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = _t(se(e, "bgColor")), {
      borderClasses: s
    } = bi(e), {
      densityClasses: a
    } = Kt(e), {
      dimensionStyles: u
    } = Un(e), {
      elevationClasses: c
    } = kn(e), {
      roundedClasses: d
    } = ht(e), {
      children: f,
      open: h,
      parents: v,
      select: m
    } = mC(e), y = k(() => e.lines ? `v-list--${e.lines}-line` : void 0), g = se(e, "activeColor"), w = se(e, "baseColor"), _ = se(e, "color");
    Xv(), un({
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
    const b = me(!1), x = re();
    function V(P) {
      b.value = !0;
    }
    function C(P) {
      b.value = !1;
    }
    function T(P) {
      var R;
      !b.value && !(P.relatedTarget && ((R = x.value) != null && R.contains(P.relatedTarget))) && z();
    }
    function $(P) {
      if (x.value) {
        if (P.key === "ArrowDown")
          z("next");
        else if (P.key === "ArrowUp")
          z("prev");
        else if (P.key === "Home")
          z("first");
        else if (P.key === "End")
          z("last");
        else
          return;
        P.preventDefault();
      }
    }
    function N(P) {
      b.value = !0;
    }
    function z(P) {
      if (x.value)
        return Uo(x.value, P);
    }
    return fe(() => p(e.tag, {
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
      onFocusin: V,
      onFocusout: C,
      onFocus: T,
      onKeydown: $,
      onMousedown: N
    }, {
      default: () => [p(im, {
        items: i.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: m,
      focus: z,
      children: f,
      parents: v
    };
  }
}), AC = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...an(Ur({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Ha
    }
  }), ["absolute"])
}, "VMenu"), $C = ce()({
  name: "VMenu",
  props: AC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Pe(e, "modelValue"), {
      scopeId: r
    } = jr(), o = Mt(), l = k(() => e.id || `v-menu-${o}`), s = re(), a = $e(Bs, null), u = me(0);
    et(Bs, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !o_(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, _, b;
      const y = m.relatedTarget, g = m.target;
      await ze(), i.value && y !== g && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((_ = s.value) != null && _.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(g) && // It isn't inside the menu body
      !s.value.contentEl.contains(g) && ((b = Sr(s.value.contentEl)[0]) == null || b.focus());
    }
    ge(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(m) {
      a == null || a.closeParents(m);
    }
    function f(m) {
      var y, g, w;
      e.disabled || m.key === "Tab" && (Eh(Sr((y = s.value) == null ? void 0 : y.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (g = s.value) == null ? void 0 : g.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var g;
      if (e.disabled)
        return;
      const y = (g = s.value) == null ? void 0 : g.contentEl;
      y && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), Uo(y, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Uo(y, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = k(() => ve({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return fe(() => {
      const m = Dn.filterProps(e);
      return p(Dn, ve({
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
          return p(qe, {
            root: "VMenu"
          }, {
            default: () => {
              var _;
              return [(_ = n.default) == null ? void 0 : _.call(n, ...g)];
            }
          });
        }
      });
    }), Gn({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), RC = ["color", "file", "time", "date", "datetime-local", "week", "month"], sm = Z({
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
  ...Wr(),
  ...Ya()
}, "VTextField"), _f = ce()({
  name: "VTextField",
  directives: {
    Intersect: fv
  },
  inheritAttrs: !1,
  props: sm(),
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
    } = Gr(e), u = k(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = k(() => {
      if (n.maxlength)
        return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = k(() => ["plain", "underlined"].includes(e.variant));
    function f(V, C) {
      var T, $;
      !e.autofocus || !V || ($ = (T = C[0].target) == null ? void 0 : T.focus) == null || $.call(T);
    }
    const h = re(), v = re(), m = re(), y = k(() => RC.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
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
      V.stopPropagation(), g(), ze(() => {
        o.value = null, kh(e["onClick:clear"], V);
      });
    }
    function x(V) {
      var T;
      const C = V.target;
      if (o.value = C.value, (T = e.modelModifiers) != null && T.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [C.selectionStart, C.selectionEnd];
        ze(() => {
          C.selectionStart = $[0], C.selectionEnd = $[1];
        });
      }
    }
    return fe(() => {
      const V = !!(r.counter || e.counter !== !1 && e.counter != null), C = !!(V || r.details), [T, $] = bl(n), {
        modelValue: N,
        ...z
      } = Hn.filterProps(e), P = Lv(e);
      return p(Hn, ve({
        ref: h,
        modelValue: o.value,
        "onUpdate:modelValue": (R) => o.value = R,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, T, z, {
        centerAffix: !d.value,
        focused: l.value
      }), {
        ...r,
        default: (R) => {
          let {
            id: S,
            isDisabled: B,
            isDirty: I,
            isReadonly: G,
            isValid: A
          } = R;
          return p(Ka, ve({
            ref: v,
            onMousedown: w,
            onClick: _,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, P, {
            id: S.value,
            active: y.value || I.value,
            dirty: I.value || e.dirty,
            disabled: B.value,
            focused: l.value,
            error: A.value === !1
          }), {
            ...r,
            default: (F) => {
              let {
                props: {
                  class: O,
                  ...j
                }
              } = F;
              const Y = Ge(p("input", ve({
                ref: m,
                value: o.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: G.value,
                disabled: B.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: g,
                onBlur: a
              }, j, $), null), [[Ut("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return p(Se, null, [e.prefix && p("span", {
                class: "v-text-field__prefix"
              }, [p("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? p("div", {
                class: O,
                "data-no-activator": ""
              }, [r.default(), Y]) : pn(Y, {
                class: O
              }), e.suffix && p("span", {
                class: "v-text-field__suffix"
              }, [p("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: C ? (R) => {
          var S;
          return p(Se, null, [(S = r.details) == null ? void 0 : S.call(r, R), V && p(Se, null, [p("span", null, null), p(Ev, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), Gn({}, h, v, m);
  }
}), NC = Z({
  renderless: Boolean,
  ...be()
}, "VVirtualScrollItem"), OC = ce()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: NC(),
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
    } = zi(void 0, "border");
    ge(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), fe(() => {
      var s, a;
      return e.renderless ? p(Se, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : p("div", ve({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), BC = -1, FC = 1, rs = 100, DC = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function HC(e, t) {
  const n = za(), i = me(0);
  on(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = me(0), o = me(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = me(0), s = me(0), a = re(), u = re();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = zi();
  on(() => {
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
  const g = me(0);
  let w = -1;
  function _(F) {
    return m[F] || i.value;
  }
  const b = t_(() => {
    const F = performance.now();
    y[0] = 0;
    const O = t.value.length;
    for (let j = 1; j <= O - 1; j++)
      y[j] = (y[j - 1] || 0) + _(j - 1);
    g.value = Math.max(g.value, performance.now() - F);
  }, g), x = ge(v, (F) => {
    F && (x(), c = u.value.offsetTop, b.immediate(), B(), ~w && ze(() => {
      Te && window.requestAnimationFrame(() => {
        G(w), w = -1;
      });
    }));
  });
  lt(() => {
    b.clear();
  });
  function V(F, O) {
    const j = m[F], Y = i.value;
    i.value = Y ? Math.min(i.value, O) : O, (j !== O || Y !== i.value) && (m[F] = O, b());
  }
  function C(F) {
    return F = pt(F, 0, t.value.length - 1), y[F] || 0;
  }
  function T(F) {
    return zC(y, F);
  }
  let $ = 0, N = 0, z = 0;
  ge(h, (F, O) => {
    O && (B(), F < O && requestAnimationFrame(() => {
      N = 0, B();
    }));
  });
  function P() {
    if (!a.value || !u.value)
      return;
    const F = a.value.scrollTop, O = performance.now();
    O - z > 500 ? (N = Math.sign(F - $), c = u.value.offsetTop) : N = F - $, $ = F, z = O, B();
  }
  function R() {
    !a.value || !u.value || (N = 0, z = 0, B());
  }
  let S = -1;
  function B() {
    cancelAnimationFrame(S), S = requestAnimationFrame(I);
  }
  function I() {
    if (!a.value || !h.value)
      return;
    const F = $ - c, O = Math.sign(N), j = Math.max(0, F - rs), Y = pt(T(j), 0, t.value.length), Q = F + h.value + rs, le = pt(T(Q) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (O !== BC || Y < r.value) && (O !== FC || le > o.value)
    ) {
      const de = C(r.value) - C(Y), J = C(le) - C(o.value);
      Math.max(de, J) > rs ? (r.value = Y, o.value = le) : (Y <= 0 && (r.value = Y), le >= t.value.length && (o.value = le));
    }
    l.value = C(r.value), s.value = C(t.value.length) - C(o.value);
  }
  function G(F) {
    const O = C(F);
    !a.value || F && !O ? w = F : a.value.scrollTop = O;
  }
  const A = k(() => t.value.slice(r.value, o.value).map((F, O) => ({
    raw: F,
    index: O + r.value
  })));
  return ge(t, () => {
    m = Array.from({
      length: t.value.length
    }), y = Array.from({
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
    scrollToIndex: G,
    handleScroll: P,
    handleScrollend: R,
    handleItemResize: V
  };
}
function zC(e, t) {
  let n = e.length - 1, i = 0, r = 0, o = null, l = -1;
  if (e[n] < t)
    return n;
  for (; i <= n; )
    if (r = i + n >> 1, o = e[r], o > t)
      n = r - 1;
    else if (o < t)
      l = r, i = r + 1;
    else
      return o === t ? r : i;
  return l;
}
const jC = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...DC(),
  ...be(),
  ...jn()
}, "VVirtualScroll"), UC = ce()({
  name: "VVirtualScroll",
  props: jC(),
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
    } = HC(e, se(e, "items"));
    return hi(() => e.renderless, () => {
      function v() {
        var g, w;
        const y = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[y]("scroll", s, {
          passive: !0
        }), document[y]("scrollend", a)) : ((g = o.value) == null || g[y]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[y]("scrollend", a));
      }
      Gt(() => {
        o.value = jh(i.vnode.el, !0), v(!0);
      }), lt(v);
    }), fe(() => {
      const v = h.value.map((m) => p(OC, {
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
      return e.renderless ? p(Se, null, [p("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: he(d.value)
        }
      }, null), v, p("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: he(f.value)
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
          paddingTop: he(d.value),
          paddingBottom: he(f.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function GC(e, t) {
  const n = me(!1);
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
        const a = ge(n, () => {
          a(), s();
        });
      } else
        s();
    });
  }
  async function l(s) {
    var c, d;
    if (s.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key))
      return;
    const a = (d = e.value) == null ? void 0 : d.$el;
    if (!a)
      return;
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
const WC = Z({
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
  ...rm({
    itemChildren: !1
  })
}, "Select"), qC = Z({
  ...WC(),
  ...an(sm({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...zr({
    transition: {
      component: Ha
    }
  })
}, "VSelect"), tE = ce()({
  name: "VSelect",
  props: qC(),
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
    } = Fr(), r = re(), o = re(), l = re(), s = Pe(e, "menu"), a = k({
      get: () => s.value,
      set: (A) => {
        var F;
        s.value && !A && ((F = o.value) != null && F.ΨopenChildren) || (s.value = A);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = VC(e), f = Pe(e, "modelValue", [], (A) => c(A === null ? [null] : rn(A)), (A) => {
      const F = d(A);
      return e.multiple ? F : F[0] ?? null;
    }), h = k(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Pv(), m = k(() => f.value.map((A) => A.value)), y = me(!1), g = k(() => a.value ? e.closeText : e.openText);
    let w = "", _;
    const b = k(() => e.hideSelected ? u.value.filter((A) => !f.value.some((F) => F === A)) : u.value), x = k(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), V = k(() => {
      var A;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((A = e.menuProps) == null ? void 0 : A.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), C = re(), {
      onListScroll: T,
      onListKeydown: $
    } = GC(C, r);
    function N(A) {
      e.openOnClear && (a.value = !0);
    }
    function z() {
      x.value || (a.value = !a.value);
    }
    function P(A) {
      var Q, le;
      if (!A.key || e.readonly || v != null && v.isReadonly.value)
        return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(A.key) && A.preventDefault(), ["Enter", "ArrowDown", " "].includes(A.key) && (a.value = !0), ["Escape", "Tab"].includes(A.key) && (a.value = !1), A.key === "Home" ? (Q = C.value) == null || Q.focus("first") : A.key === "End" && ((le = C.value) == null || le.focus("last"));
      const F = 1e3;
      function O(de) {
        const J = de.key.length === 1, ae = !de.ctrlKey && !de.metaKey && !de.altKey;
        return J && ae;
      }
      if (e.multiple || !O(A))
        return;
      const j = performance.now();
      j - _ > F && (w = ""), w += A.key.toLowerCase(), _ = j;
      const Y = u.value.find((de) => de.title.toLowerCase().startsWith(w));
      Y !== void 0 && (f.value = [Y]);
    }
    function R(A) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!A.props.disabled)
        if (e.multiple) {
          const O = f.value.findIndex((Y) => e.valueComparator(Y.value, A.value)), j = F ?? !~O;
          if (~O) {
            const Y = j ? [...f.value, A] : [...f.value];
            Y.splice(O, 1), f.value = Y;
          } else
            j && (f.value = [...f.value, A]);
        } else {
          const O = F !== !1;
          f.value = O ? [A] : [], ze(() => {
            a.value = !1;
          });
        }
    }
    function S(A) {
      var F;
      (F = C.value) != null && F.$el.contains(A.relatedTarget) || (a.value = !1);
    }
    function B() {
      var A;
      y.value && ((A = r.value) == null || A.focus());
    }
    function I(A) {
      y.value = !0;
    }
    function G(A) {
      if (A == null)
        f.value = [];
      else if (Go(r.value, ":autofill") || Go(r.value, ":-webkit-autofill")) {
        const F = u.value.find((O) => O.title === A);
        F && R(F);
      } else
        r.value && (r.value.value = "");
    }
    return ge(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const A = b.value.findIndex((F) => f.value.some((O) => e.valueComparator(O.value, F.value)));
        Te && window.requestAnimationFrame(() => {
          var F;
          A >= 0 && ((F = l.value) == null || F.scrollToIndex(A));
        });
      }
    }), ge(() => e.items, (A, F) => {
      a.value || y.value && !F.length && A.length && (a.value = !0);
    }), fe(() => {
      const A = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), O = f.value.length > 0, j = _f.filterProps(e), Y = O || !y.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return p(_f, ve({
        ref: r
      }, j, {
        modelValue: f.value.map((Q) => Q.props.value).join(", "),
        "onUpdate:modelValue": G,
        focused: y.value,
        "onUpdate:focused": (Q) => y.value = Q,
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
        "onClick:clear": N,
        "onMousedown:control": z,
        onBlur: S,
        onKeydown: P,
        "aria-label": i(g.value),
        title: i(g.value)
      }), {
        ...n,
        default: () => p(Se, null, [p($C, ve({
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
          default: () => [F && p(IC, ve({
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
              var Q, le, de;
              return [(Q = n["prepend-item"]) == null ? void 0 : Q.call(n), !b.value.length && !e.hideNoData && (((le = n["no-data"]) == null ? void 0 : le.call(n)) ?? p(tl, {
                title: i(e.noDataText)
              }, null)), p(UC, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var St;
                  let {
                    item: ae,
                    index: Ce,
                    itemRef: Ue
                  } = J;
                  const Ze = ve(ae.props, {
                    ref: Ue,
                    key: Ce,
                    onClick: () => R(ae, null)
                  });
                  return ((St = n.item) == null ? void 0 : St.call(n, {
                    item: ae,
                    index: Ce,
                    props: Ze
                  })) ?? p(tl, ve(Ze, {
                    role: "option"
                  }), {
                    prepend: (At) => {
                      let {
                        isSelected: E
                      } = At;
                      return p(Se, null, [e.multiple && !e.hideSelected ? p(lC, {
                        key: ae.value,
                        modelValue: E,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ae.props.prependAvatar && p(vi, {
                        image: ae.props.prependAvatar
                      }, null), ae.props.prependIcon && p(De, {
                        icon: ae.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (de = n["append-item"]) == null ? void 0 : de.call(n)];
            }
          })]
        }), f.value.map((Q, le) => {
          function de(Ue) {
            Ue.stopPropagation(), Ue.preventDefault(), R(Q, !1);
          }
          const J = {
            "onClick:close": de,
            onMousedown(Ue) {
              Ue.preventDefault(), Ue.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ae = A ? !!n.chip : !!n.selection, Ce = ae ? Vh(A ? n.chip({
            item: Q,
            index: le,
            props: J
          }) : n.selection({
            item: Q,
            index: le
          })) : void 0;
          if (!(ae && !Ce))
            return p("div", {
              key: Q.value,
              class: "v-select__selection"
            }, [A ? n.chip ? p(qe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: Q.title
                }
              }
            }, {
              default: () => [Ce]
            }) : p(kv, ve({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Q.title,
              disabled: Q.props.disabled
            }, J), null) : Ce ?? p("span", {
              class: "v-select__selection-text"
            }, [Q.title, e.multiple && le < f.value.length - 1 && p("span", {
              class: "v-select__selection-comma"
            }, [Fe(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var Q = arguments.length, le = new Array(Q), de = 0; de < Q; de++)
            le[de] = arguments[de];
          return p(Se, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...le), e.menuIcon ? p(De, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Gn({
      isFocused: y,
      menu: a,
      select: R
    }, r);
  }
}), YC = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Wr(),
  ...eu()
}, "VSwitch"), er = ce()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: YC(),
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
    } = kl(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = Gr(e), c = re(), d = k(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = Mt(), h = k(() => e.id || `switch-${f}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(y) {
      var g, w;
      y.stopPropagation(), y.preventDefault(), (w = (g = c.value) == null ? void 0 : g.input) == null || w.click();
    }
    return fe(() => {
      const [y, g] = bl(n), w = Hn.filterProps(e), _ = el.filterProps(e);
      return p(Hn, ve({
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
            messagesId: V,
            isDisabled: C,
            isReadonly: T,
            isValid: $
          } = b;
          const N = {
            model: o,
            isValid: $
          };
          return p(el, ve({
            ref: c
          }, _, {
            modelValue: o.value,
            "onUpdate:modelValue": [(z) => o.value = z, v],
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
            default: (z) => {
              let {
                backgroundColorClasses: P,
                backgroundColorStyles: R
              } = z;
              return p("div", {
                class: ["v-switch__track", ...P.value],
                style: R.value,
                onClick: m
              }, [i["track-true"] && p("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [i["track-true"](N)]), i["track-false"] && p("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [i["track-false"](N)])]);
            },
            input: (z) => {
              let {
                inputNode: P,
                icon: R,
                backgroundColorClasses: S,
                backgroundColorStyles: B
              } = z;
              return p(Se, null, [P, p("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": R || e.loading
                }, e.inset ? void 0 : S.value],
                style: e.inset ? void 0 : B.value
              }, [i.thumb ? p(qe, {
                defaults: {
                  VIcon: {
                    icon: R,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [i.thumb({
                  ...N,
                  icon: R
                })]
              }) : p(mv, null, {
                default: () => [e.loading ? p(Fa, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : d.value
                }, {
                  default: (I) => i.loader ? i.loader(I) : p(Kh, {
                    active: I.isActive,
                    color: I.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : R && p(De, {
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
}), KC = /* @__PURE__ */ Ui({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-graph-settings"],
  setup(e, { emit: t }) {
    const n = e, i = re(n.isWelcome), r = re(n.config.showNodeLabels), o = re(n.config.nodePhysicsEnabled), l = re(n.config.showLinkLabels), s = re(n.config.fixedLinkDistanceEnabled), a = re(n.config.zoomEnabled), u = re(String(n.config.nodeRadius)), c = re(""), d = re("black"), f = re(""), h = t;
    function v() {
      localStorage.showNodeLabels = r.value, localStorage.enableNodePhysics = o.value, localStorage.showLinkLabels = l.value, localStorage.enableFixedLinkDistance = s.value, localStorage.enableZoom = a.value, localStorage.wasHere = !0;
    }
    function m() {
      v(), h("update-graph-settings", {
        showNodeLabels: r.value,
        nodePhysicsEnabled: o.value,
        showLinkLabels: l.value,
        fixedLinkDistanceEnabled: s.value,
        zoomEnabled: a.value
      }), i.value = !1;
    }
    return (y, g) => (tn(), ni(Ua, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": g[9] || (g[9] = (w) => i.value = w),
      persistent: ""
    }, {
      activator: ue(({ props: w }) => [
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: ue(({ props: _ }) => [
            p(Qe, ve({
              "aria-label": "Settings",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$settings"
            }, { ...w, ..._ }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ue(({ isActive: w }) => [
        p(Da, { class: "pa-3" }, {
          default: ue(() => [
            n.isWelcome ? (tn(), ni(Vr, { key: 0 }, {
              default: ue(() => [
                Fe("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (tn(), ni(Vr, { key: 1 }, {
              default: ue(() => [
                Fe("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (tn(), ni(Vi, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ue(() => [
                Fe(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Pn("", !0),
            p(Vi, { class: "px-6 pb-1" }, {
              default: ue(() => [
                Fe("The settings are saved in your browsers local storage.")
              ]),
              _: 1
            }),
            p(cr, null, {
              default: ue(() => [
                p(kt, null, {
                  default: ue(() => [
                    p(ho, { cols: "5" }, {
                      default: ue(() => [
                        p(kt, null, {
                          default: ue(() => [
                            p(Vi, { class: "py-5" }, {
                              default: ue(() => [
                                Fe("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, null, {
                          default: ue(() => [
                            p(bf, null, {
                              default: ue(() => [
                                Pn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, null, {
                          default: ue(() => [
                            p(ho, { class: "mx-0 px-0" }, {
                              default: ue(() => [
                                p(er, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": g[1] || (g[1] = (_) => r.value = _)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            p(ho, { class: "mx-0 px-0" }, {
                              default: ue(() => [
                                Pn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, { class: "my-0 py-0" }, {
                          default: ue(() => [
                            p(er, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": g[3] || (g[3] = (_) => o.value = _)
                            }, null, 8, ["modelValue"]),
                            Pn("", !0)
                          ]),
                          _: 1
                        }),
                        p(kt, { class: "my-0 py-0" }, {
                          default: ue(() => [
                            Pn("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    p(Qo),
                    p(ho, { cols: "5" }, {
                      default: ue(() => [
                        p(kt, null, {
                          default: ue(() => [
                            p(Vi, { class: "py-5" }, {
                              default: ue(() => [
                                Fe("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, null, {
                          default: ue(() => [
                            p(bf, null, {
                              default: ue(() => [
                                Pn("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, null, {
                          default: ue(() => [
                            p(er, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": g[6] || (g[6] = (_) => l.value = _)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        p(kt, null, {
                          default: ue(() => [
                            p(er, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": g[7] || (g[7] = (_) => s.value = _)
                            }, null, 8, ["modelValue"]),
                            Pn("", !0)
                          ]),
                          _: 1
                        }),
                        p(kt, { class: "my-0 py-0" }, {
                          default: ue(() => [
                            p(Vi, { class: "px-0" }, {
                              default: ue(() => [
                                Fe("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        p(kt, { class: "py-0 my-0" }, {
                          default: ue(() => [
                            p(er, {
                              label: "Zoom",
                              color: "secondary",
                              modelValue: a.value,
                              "onUpdate:modelValue": g[8] || (g[8] = (_) => a.value = _)
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
            p(Tl, null, {
              default: ue(() => [
                p(Qo),
                p(Qe, {
                  color: "secondary",
                  variant: "text",
                  onClick: m
                }, {
                  default: ue(() => [
                    Fe("Save")
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
}), XC = /* @__PURE__ */ We("div", { class: "graph-host uninitialised" }, null, -1), ZC = {
  key: 0,
  class: "button-container"
}, JC = { class: "info-text text-h5 text-grey" }, QC = /* @__PURE__ */ Ui({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = k(() => {
      const L = document.querySelectorAll("graph-editor");
      let H;
      for (let U = 0; U < L.length; U++) {
        const D = L[U], _e = Ot(D.shadowRoot).select(".graph-host.uninitialised");
        if (!_e.empty()) {
          _e.classed("uninitialised", !1), H = _e;
          break;
        }
      }
      return H === void 0 && (H = Ot(".graph-host.uninitialised"), H.classed("uninitialised", !1)), H;
    });
    cl(() => {
      R();
    }), Gt(() => {
      S(), window.addEventListener("resize", ie);
    }), fl(() => {
      window.removeEventListener("resize", ie);
    });
    const i = re(!1), r = re(new vc()), o = re(!1), l = jt(new pw());
    let s, a = 400, u = 400, c, d, f, h, v, m, y, g, w, _ = 0, b = 0, x = 1;
    t({
      getGraph: V,
      setGraph: C,
      printGraph: T,
      setNodeColor: $,
      setLinkColor: N,
      deleteNode: z,
      deleteLink: P,
      toggleNodeLabels: q,
      toggleLinkLabels: W,
      toggleZoom: K,
      toggleNodePhysics: E,
      toggleFixedLinkDistance: M,
      resetView: ie
    });
    function V() {
      return r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !0, !0);
    }
    function C(L) {
      if (typeof L == "string" && L !== "Graph is empty")
        oe(L);
      else if (typeof L == "object") {
        const [H, U] = Yw(L);
        X(), te(H, U);
      } else
        X();
    }
    function T() {
      console.log(r.value.toTGF(l.showNodeLabels, l.showLinkLabels));
    }
    function $(L, H) {
      if (!H) {
        v.selectAll("circle").each((D) => D.color = L).style("fill", L);
        return;
      }
      const U = Array.isArray(H) ? H : [H];
      for (const D of U)
        v.selectAll("circle").filter((ee) => ee.id === D).each((ee) => ee.color = L).style("fill", L);
    }
    function N(L, H) {
      if (Ls(f, l, L), !H) {
        h.selectAll(".link").each((D) => D.color = L).style("stroke", L);
        return;
      }
      const U = Array.isArray(H) ? H : [H];
      for (const D of U)
        h.selectAll(".link").filter((ee) => ee.id === D).each((ee) => ee.color = L).style("stroke", L);
    }
    function z(L) {
      const H = Array.isArray(L) ? L : [L];
      for (const U of H)
        v.selectAll("circle").filter((D) => D.id === U).each((D) => r.value.removeNode(D));
      o.value = r.value.nodes.length > 0;
    }
    function P(L) {
      const H = Array.isArray(L) ? L : [L];
      for (const U of H)
        h.selectAll("path").filter((D) => D.id === U).each((D) => r.value.removeLink(D));
    }
    function R() {
      const L = (H) => H === "false" ? !1 : !!H;
      localStorage.wasHere && (i.value = L(localStorage.wasHere)), localStorage.showNodeLabels && (l.showNodeLabels = L(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (l.nodePhysicsEnabled = L(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (l.showLinkLabels = L(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (l.fixedLinkDistanceEnabled = L(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (l.zoomEnabled = L(localStorage.enableZoom));
    }
    function S() {
      a = n.value.node().clientWidth, u = n.value.node().clientHeight, c = sw(
        (L) => B(L, l.zoomEnabled),
        l.zoomEnabled
      ), f = cw(
        n.value,
        c,
        (L) => ae(L),
        (L) => J(L),
        (L) => {
          G(Et(L, f.node())[0], Et(L, f.node())[1]);
        }
      ), hw(f, l, r.value.getNonDefaultLinkColors()), m = mw(f), h = fw(f), v = dw(f), s = gw(r.value, l, a, u, () => A()), d = uw(s, a, u, l.nodeRadius), le();
    }
    function B(L, H = !0) {
      H && (_ = L.transform.x, b = L.transform.y, x = L.transform.k, f.attr("transform", `translate(${_},${b})scale(${x})`));
    }
    function I(L, H, U, D) {
      r.value.createLink(L.id, H.id, U, D), le();
    }
    function G(L, H, U, D, ee) {
      r.value.createNode(L ?? a / 2, H ?? u / 2, U, D, ee), o.value = !0, le();
    }
    function A() {
      v.attr("transform", (L) => `translate(${L.x},${L.y})`), h.selectAll("path").attr("d", (L) => F(L)), Q(), le();
    }
    function F(L) {
      switch (O(L), L.pathType) {
        case mt.REFLEXIVE:
          return pc(L.source, [a / 2, u / 2], l);
        case mt.ARC:
          return Kl(L.source, L.target, l);
        case mt.ARCREVERSE:
          return wc.reverse(Kl(L.source, L.target, l));
        case mt.LINE:
          return Yl(L.source, L.target, l);
        case mt.LINEREVERSE:
          return wc.reverse(Yl(L.source, L.target, l));
        default:
          return "";
      }
    }
    function O(L) {
      L.source.id === L.target.id ? L.pathType = mt.REFLEXIVE : j(L.source, L.target) ? L.pathType = Y(L.source, L.target) ? mt.ARCREVERSE : mt.ARC : L.pathType = Y(L.source, L.target) ? mt.LINEREVERSE : mt.LINE;
    }
    function j(L, H) {
      return L.id !== H.id && r.value.links.some((U) => U.target.id === L.id && U.source.id === H.id) && r.value.links.some((U) => U.target.id === H.id && U.source.id === L.id);
    }
    function Y(L, H) {
      return L.x > H.x;
    }
    function Q() {
      const L = y;
      if (L !== void 0) {
        const H = g;
        if (H !== void 0)
          m.attr("d", () => L.id === H.id ? pc(L, [a / 2, u / 2], l) : j(L, H) ? Yl(L, H, l) : Kl(L, H, l));
        else if (w !== void 0) {
          const U = [L.x, L.y];
          m.attr("d", bc(U, w));
        }
      }
    }
    function le(L = 0.5) {
      h = h.data(r.value.links, (H) => H.id).join(
        (H) => {
          const U = H.append("g");
          return U.append("path").classed("link", !0).style("stroke", (D) => D.color ? D.color : "").attr("id", (D) => D.id).attr(
            "marker-end",
            (D) => D.color ? "url(#link-arrow-" + D.color : "url(#link-arrow)"
          ), U.append("path").classed("clickbox", !0).on("pointerdown", (D, ee) => {
            let _e = ee.color;
            D.button === 1 && (ei(D), r.value.removeLink(ee), _e && (r.value.hasNonDefaultLinkColor(_e) || vw(f, _e)));
          }), U.append("text").append("textPath").attr(
            "class",
            (D) => D.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (D) => `#${D.id}`).attr("startOffset", "50%").text((D) => D.label ? D.label : "add label").on("click", (D, ee) => {
            Ue(D, ee);
          }), U;
        },
        (H) => (H.selectChild("path").attr("marker-start", function(U) {
          var D;
          if ((D = U.pathType) != null && D.includes("REVERSE")) {
            let ee = "url(#link-arrow-reverse";
            return U.color && (ee += "-" + U.color), ee += ")", ee;
          } else
            return null;
        }).attr("marker-end", function(U) {
          var D;
          if ((D = U.pathType) != null && D.includes("REVERSE"))
            return null;
          {
            let ee = "url(#link-arrow";
            return U.color && (ee += "-" + U.color), ee += ")", ee;
          }
        }), H.selectChild("text").attr("class", (U) => {
          var D;
          return `${(D = U.pathType) == null ? void 0 : D.toLowerCase()}-path-text`;
        }).attr("dy", (U) => {
          var D;
          return U.pathType === mt.REFLEXIVE ? 15 : U.pathType == mt.LINEREVERSE ? -10 : (D = U.pathType) != null && D.includes("REVERSE") ? 20 : -10;
        }), H.selectChild("text").selectChild("textPath").classed("hidden", !l.showLinkLabels).attr("startOffset", (U) => {
          var D;
          return (D = U.pathType) != null && D.includes("REVERSE") ? "46%" : "50%";
        }), H)
      ), v = v.data(r.value.nodes, (H) => H.id).join(
        (H) => {
          const U = H.append("g").call(d).on("pointerdown", (D, ee) => {
            D.button === 1 && (ei(D), r.value.removeNode(ee), o.value = r.value.nodes.length > 0, ne(), le());
          });
          return U.append("circle").classed("node", !0).attr("id", (D) => D.id).attr("r", l.nodeRadius).style("fill", (D) => D.color ? D.color : "").on("mouseenter", (D, ee) => g = ee).on("mouseout", () => g = void 0).on("pointerdown", (D, ee) => {
            de(D, ee);
          }).on("pointerup", (D) => {
            J(D);
          }), U.append("text").attr(
            "class",
            (D) => D.label ? "node-label" : "node-label-placeholder"
          ).text((D) => D.label ? D.label : "add label").attr("dy", "0.33em").on("click", (D, ee) => {
            Ce(D, ee);
          }).on("mouseenter", (D, ee) => g = ee).on("mouseout", () => g = void 0), U;
        },
        (H) => (H.selectChild("text").classed("hidden", !l.showNodeLabels), H)
      ), s.nodes(r.value.nodes), s.alpha(L).restart();
    }
    function de(L, H) {
      if (L.button !== 0)
        return;
      ei(L);
      const U = [H.x, H.y];
      w = U, y = H, m.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", bc(U, U)), le();
    }
    function J(L) {
      const H = y, U = g;
      ne(), !(H === void 0 || U === void 0) && (ei(L), I(H, U));
    }
    function ae(L) {
      if (ei(L), y !== void 0) {
        const H = x1(L, n.value.node())[0], U = [
          (H[0] - _) / x,
          (H[1] - b) / x
        ];
        L.pointerType === "touch" && (U[1] = U[1] - 4 * l.nodeRadius, g = r.value.nodes.find(
          (D) => Math.sqrt(Math.pow(D.x - U[0], 2) + Math.pow(D.y - U[1], 2)) < l.nodeRadius
        )), w = U, Q();
      }
    }
    function Ce(L, H) {
      const U = L == null ? void 0 : L.target;
      Ze(H, U, [H.x, H.y]);
    }
    function Ue(L, H) {
      const U = L.target;
      let D = St(U);
      Ze(H, U, D);
    }
    function Ze(L, H, U) {
      var at;
      let D = L instanceof dh ? "node" : "link";
      const ee = document.createElement("input");
      ee.setAttribute("class", "label-input"), L.label == null ? ee.value = "" : ee.value = L.label, ee.placeholder = `Enter ${D} label`;
      let _e = !1;
      ee.onkeyup = function(fn) {
        fn.key === "Enter" ? (_e = !0, ee.blur()) : fn.key === "Escape" && (ee.value = "", ee.blur());
      }, ee.onblur = function() {
        _e && (ee.value === "" ? (H.setAttribute("class", `${D}-label-placeholder`), H.textContent = "add label", L.label = void 0) : (H.setAttribute("class", `${D}-label`), H.textContent = ee.value.trim(), L.label = H.textContent)), Ve.remove();
      };
      const Ve = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      Ve.setAttribute("width", "100%"), Ve.setAttribute("height", "100%"), Ve.setAttribute("x", `${U[0] - 80}`), Ve.setAttribute("y", `${U[1] - 12}`), Ve.append(ee);
      const Re = H.closest("svg");
      (at = Re == null ? void 0 : Re.querySelector("g")) == null || at.append(Ve), ee.focus();
    }
    function St(L) {
      let H = n.value.select("svg").node().getBoundingClientRect(), U = L.getBoundingClientRect(), D = (U.x - H.x - _) / x, ee = (U.y - H.y - b) / x;
      return [D, ee];
    }
    function At(L) {
      q(L.showNodeLabels), E(L.nodePhysicsEnabled), W(L.showLinkLabels), M(L.fixedLinkDistanceEnabled), K(L.zoomEnabled);
    }
    function E(L) {
      l.nodePhysicsEnabled = L, hh(s, L, a, u);
    }
    function M(L) {
      l.fixedLinkDistanceEnabled = L, vh(s, r.value, l, L);
    }
    function W(L) {
      l.showLinkLabels = L;
    }
    function q(L) {
      l.showNodeLabels = L;
    }
    function K(L) {
      l.zoomEnabled = L, ie();
    }
    function ne() {
      m == null || m.classed("hidden", !0).attr("marker-end", "null"), y = void 0, g = void 0, w = void 0;
    }
    function oe(L) {
      let [H, U] = qw(L);
      X(), te(H, U);
    }
    function te(L, H) {
      for (let D of L)
        G(void 0, void 0, D.idImported, D.label, D.color);
      const U = (D) => r.value.nodes.find((ee) => ee.idImported === D);
      for (let D of H) {
        let ee = U(D.sourceIdImported), _e = U(D.targetIdImported);
        ee && _e && (I(ee, _e, D.label, D.color), D.color && Ls(f, l, D.color));
      }
    }
    function ie() {
      s.stop(), n.value.selectChildren().remove(), c = void 0, _ = 0, b = 0, x = 1, f = void 0, m = void 0, h = void 0, v = void 0, s = void 0, ne(), R(), S();
    }
    function X() {
      r.value = new vc(), o.value = !1, ie();
    }
    return (L, H) => (tn(), gs(Se, null, [
      XC,
      l.hasToolbar ? (tn(), gs("div", ZC, [
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ue(({ props: U }) => [
            p(Qe, ve({
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, U, {
              variant: "plain",
              onClick: H[0] || (H[0] = (D) => G())
            }), null, 16)
          ]),
          _: 1
        }),
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ue(({ props: U }) => [
            p(Qe, ve({
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, U, {
              variant: "plain",
              onClick: H[1] || (H[1] = (D) => X())
            }), null, 16)
          ]),
          _: 1
        }),
        p(Ni, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ue(({ props: U }) => [
            p(Qe, ve({
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, U, {
              variant: "plain",
              onClick: H[2] || (H[2] = (D) => ie())
            }), null, 16)
          ]),
          _: 1
        }),
        p(K2, {
          "graph-as-tgf": r.value.toTGF(l.showNodeLabels, l.showLinkLabels, !1, !1),
          onFileImported: oe
        }, null, 8, ["graph-as-tgf"]),
        p(iS),
        p(KC, {
          config: l,
          "is-welcome": !i.value,
          onUpdateGraphSettings: At
        }, null, 8, ["config", "is-welcome"])
      ])) : Pn("", !0),
      Ge(We("div", JC, "Graph is empty", 512), [
        [ln, !o.value]
      ])
    ], 64));
  }
}), ek = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#5f9ea0;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#add8e6;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#5f9ea0}.arrow.draggable{fill:#add8e6}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#ffa07a;stroke:none;cursor:pointer}.node:hover{stroke:#5f9ea0;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", tk = /* @__PURE__ */ Ja(QC, [["styles", [ek]]]), Gs = {
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
function nk(e, t) {
  const n = [];
  let i = [];
  const r = am(e), o = um(e), l = (r.getDay() - Gs[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - Gs[t.slice(-2).toUpperCase()] + 7) % 7;
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
function ik(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function rk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function am(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function um(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function ok(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const lk = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function cm(e) {
  if (e == null)
    return /* @__PURE__ */ new Date();
  if (e instanceof Date)
    return e;
  if (typeof e == "string") {
    let t;
    if (lk.test(e))
      return ok(e);
    if (t = Date.parse(e), !isNaN(t))
      return new Date(t);
  }
  return null;
}
const xf = new Date(2e3, 0, 2);
function sk(e) {
  const t = Gs[e.slice(-2).toUpperCase()];
  return La(7).map((n) => {
    const i = new Date(xf);
    return i.setDate(xf.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function ak(e, t, n, i) {
  const r = cm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function uk(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Ec(String(n.getMonth() + 1), 2, "0"), o = Ec(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function ck(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function fk(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function dk(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function hk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function vk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function mk(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function gk(e) {
  return e.getFullYear();
}
function yk(e) {
  return e.getMonth();
}
function pk(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function bk(e) {
  return e.getHours();
}
function wk(e) {
  return e.getMinutes();
}
function _k(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function xk(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Sk(e, t) {
  return Ws(e, t[0]) && kk(e, t[1]);
}
function Ck(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Ws(e, t) {
  return e.getTime() > t.getTime();
}
function kk(e, t) {
  return e.getTime() < t.getTime();
}
function Sf(e, t) {
  return e.getTime() === t.getTime();
}
function Ek(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Vk(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Lk(e, t, n) {
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
function Pk(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Tk(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function Mk(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Ik(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Ak(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function $k(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Rk {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return cm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return uk(this, t);
  }
  parseISO(t) {
    return ck(t);
  }
  addMinutes(t, n) {
    return fk(t, n);
  }
  addHours(t, n) {
    return dk(t, n);
  }
  addDays(t, n) {
    return hk(t, n);
  }
  addWeeks(t, n) {
    return vk(t, n);
  }
  addMonths(t, n) {
    return mk(t, n);
  }
  getWeekArray(t) {
    return nk(t, this.locale);
  }
  startOfWeek(t) {
    return ik(t);
  }
  endOfWeek(t) {
    return rk(t);
  }
  startOfMonth(t) {
    return am(t);
  }
  endOfMonth(t) {
    return um(t);
  }
  format(t, n) {
    return ak(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Sf(t, n);
  }
  isValid(t) {
    return Ck(t);
  }
  isWithinRange(t, n) {
    return Sk(t, n);
  }
  isAfter(t, n) {
    return Ws(t, n);
  }
  isBefore(t, n) {
    return !Ws(t, n) && !Sf(t, n);
  }
  isSameDay(t, n) {
    return Ek(t, n);
  }
  isSameMonth(t, n) {
    return Vk(t, n);
  }
  setMinutes(t, n) {
    return Tk(t, n);
  }
  setHours(t, n) {
    return Pk(t, n);
  }
  setMonth(t, n) {
    return Mk(t, n);
  }
  setYear(t, n) {
    return Ik(t, n);
  }
  getDiff(t, n, i) {
    return Lk(t, n, i);
  }
  getWeekdays() {
    return sk(this.locale);
  }
  getYear(t) {
    return gk(t);
  }
  getMonth(t) {
    return yk(t);
  }
  getNextMonth(t) {
    return pk(t);
  }
  getHours(t) {
    return bk(t);
  }
  getMinutes(t) {
    return wk(t);
  }
  startOfDay(t) {
    return Ak(t);
  }
  endOfDay(t) {
    return $k(t);
  }
  startOfYear(t) {
    return _k(t);
  }
  endOfYear(t) {
    return xk(t);
  }
}
const Nk = Symbol.for("vuetify:date-options"), Cf = Symbol.for("vuetify:date-adapter");
function Ok(e, t) {
  const n = bt({
    adapter: Rk,
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
    instance: Bk(n, t)
  };
}
function Bk(e, t) {
  const n = jt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return ge(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const Fk = Symbol.for("vuetify:goto");
function Dk() {
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
function Hk(e, t) {
  return {
    rtl: t.isRtl,
    options: bt(Dk(), e)
  };
}
function fm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = bt(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = P_(i.defaults), a = Ux(i.display, i.ssr), u = F_(i.theme), c = Y_(i.icons), d = nx(i.locale), f = Ok(i.date, d), h = Hk(i.goTo, d);
  return {
    install: (m) => {
      for (const y in l)
        m.directive(y, l[y]);
      for (const y in o)
        m.component(y, o[y]);
      for (const y in r)
        m.component(y, Yt({
          ...r[y],
          name: y,
          aliasName: r[y].name
        }));
      if (u.install(m), m.provide(Hi, s), m.provide(Fs, a), m.provide(Yo, u), m.provide(As, c), m.provide(Ko, d), m.provide(Nk, f.options), m.provide(Cf, f.instance), m.provide(Fk, h), Te && i.ssr)
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
            return ze(() => a.update()), m.mount = y, g;
          };
        }
      Mt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return jt({
              defaults: Ci.call(this, Hi),
              display: Ci.call(this, Fs),
              theme: Ci.call(this, Yo),
              icons: Ci.call(this, As),
              locale: Ci.call(this, Ko),
              date: Ci.call(this, Cf)
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
const zk = "3.5.9";
fm.version = zk;
function Ci(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const jk = {
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
}, Uk = {
  component: Oa
};
var Gk = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Wk = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", qk = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", Yk = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", Kk = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", Xk = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", Zk = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
fm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...jk,
      addNode: Zk,
      deleteGraph: Wk,
      help: Yk,
      importExport: qk,
      resetView: Xk,
      settings: Gk,
      helpCircle: Kk
    },
    sets: {
      mdi: Uk
    }
  }
});
customElements.define(
  "graph-editor",
  // defineCustomElement(GraphEditor, { shadowRoot: true, plugins: [vuetify] })
  /* @__PURE__ */ F0(tk)
);
