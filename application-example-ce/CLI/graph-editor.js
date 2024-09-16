var bm = Object.defineProperty;
var wm = (e, t, n) => t in e ? bm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ze = (e, t, n) => wm(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ra(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const Be = {}, Ai = [], $t = () => {
}, xm = () => !1, al = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), oa = (e) => e.startsWith("onUpdate:"), Ue = Object.assign, la = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, _m = Object.prototype.hasOwnProperty, Pe = (e, t) => _m.call(e, t), xe = Array.isArray, $i = (e) => ul(e) === "[object Map]", $f = (e) => ul(e) === "[object Set]", Ee = (e) => typeof e == "function", We = (e) => typeof e == "string", Yi = (e) => typeof e == "symbol", Oe = (e) => e !== null && typeof e == "object", Nf = (e) => (Oe(e) || Ee(e)) && Ee(e.then) && Ee(e.catch), Rf = Object.prototype.toString, ul = (e) => Rf.call(e), Sm = (e) => ul(e).slice(8, -1), Of = (e) => ul(e) === "[object Object]", sa = (e) => We(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, hr = /* @__PURE__ */ ra(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), cl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Cm = /-(\w)/g, dt = cl((e) => e.replace(Cm, (t, n) => n ? n.toUpperCase() : "")), km = /\B([A-Z])/g, Wt = cl(
  (e) => e.replace(km, "-$1").toLowerCase()
), In = cl((e) => e.charAt(0).toUpperCase() + e.slice(1)), Dl = cl((e) => e ? `on${In(e)}` : ""), Un = (e, t) => !Object.is(e, t), Hl = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Ao = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Em = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, vs = (e) => {
  const t = We(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let hu;
const Bf = () => hu || (hu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function aa(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = We(i) ? Pm(i) : aa(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (We(e) || Oe(e))
    return e;
}
const Vm = /;(?![^(]*\))/g, Lm = /:([^]+)/, Im = /\/\*[^]*?\*\//g;
function Pm(e) {
  const t = {};
  return e.replace(Im, "").split(Vm).forEach((n) => {
    if (n) {
      const i = n.split(Lm);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function ua(e) {
  let t = "";
  if (We(e))
    t = e;
  else if (xe(e))
    for (let n = 0; n < e.length; n++) {
      const i = ua(e[n]);
      i && (t += i + " ");
    }
  else if (Oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Tm = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Mm = /* @__PURE__ */ ra(Tm);
function Ff(e) {
  return !!e || e === "";
}
const At = (e) => We(e) ? e : e == null ? "" : xe(e) || Oe(e) && (e.toString === Rf || !Ee(e.toString)) ? JSON.stringify(e, Df, 2) : String(e), Df = (e, t) => t && t.__v_isRef ? Df(e, t.value) : $i(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[zl(i, o) + " =>"] = r, n),
    {}
  )
} : $f(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zl(n))
} : Yi(t) ? zl(t) : Oe(t) && !xe(t) && !Of(t) ? String(t) : t, zl = (e, t = "") => {
  var n;
  return Yi(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let St;
class Hf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = St, !t && St && (this.index = (St.scopes || (St.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = St;
      try {
        return St = this, t();
      } finally {
        St = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    St = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    St = this.parent;
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
function ca(e) {
  return new Hf(e);
}
function Am(e, t = St) {
  t && t.active && t.effects.push(e);
}
function $m() {
  return St;
}
function ht(e) {
  St && St.cleanups.push(e);
}
let ui;
class fa {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Am(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, pi();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Nm(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), bi();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = jn, n = ui;
    try {
      return jn = !0, ui = this, this._runnings++, vu(this), this.fn();
    } finally {
      mu(this), this._runnings--, ui = n, jn = t;
    }
  }
  stop() {
    var t;
    this.active && (vu(this), mu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Nm(e) {
  return e.value;
}
function vu(e) {
  e._trackId++, e._depsLength = 0;
}
function mu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      zf(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function zf(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let jn = !0, ms = 0;
const jf = [];
function pi() {
  jf.push(jn), jn = !1;
}
function bi() {
  const e = jf.pop();
  jn = e === void 0 ? !0 : e;
}
function da() {
  ms++;
}
function ha() {
  for (ms--; !ms && gs.length; )
    gs.shift()();
}
function Gf(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && zf(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const gs = [];
function Uf(e, t, n) {
  da();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && gs.push(i.scheduler)));
  }
  ha();
}
const Wf = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, $o = /* @__PURE__ */ new WeakMap(), ci = Symbol(""), ys = Symbol("");
function pt(e, t, n) {
  if (jn && ui) {
    let i = $o.get(e);
    i || $o.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = Wf(() => i.delete(n))), Gf(
      ui,
      r
    );
  }
}
function Cn(e, t, n, i, r, o) {
  const l = $o.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && xe(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !Yi(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        xe(e) ? sa(n) && s.push(l.get("length")) : (s.push(l.get(ci)), $i(e) && s.push(l.get(ys)));
        break;
      case "delete":
        xe(e) || (s.push(l.get(ci)), $i(e) && s.push(l.get(ys)));
        break;
      case "set":
        $i(e) && s.push(l.get(ci));
        break;
    }
  da();
  for (const a of s)
    a && Uf(
      a,
      4
    );
  ha();
}
function Rm(e, t) {
  var n;
  return (n = $o.get(e)) == null ? void 0 : n.get(t);
}
const Om = /* @__PURE__ */ ra("__proto__,__v_isRef,__isVue"), qf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Yi)
), gu = /* @__PURE__ */ Bm();
function Bm() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = _e(this);
      for (let o = 0, l = this.length; o < l; o++)
        pt(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(_e)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      pi(), da();
      const i = _e(this)[t].apply(this, n);
      return ha(), bi(), i;
    };
  }), e;
}
function Fm(e) {
  const t = _e(this);
  return pt(t, "has", e), t.hasOwnProperty(e);
}
class Yf {
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
      return i === (r ? o ? Jm : Jf : o ? Zf : Xf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = xe(t);
    if (!r) {
      if (l && Pe(gu, n))
        return Reflect.get(gu, n, i);
      if (n === "hasOwnProperty")
        return Fm;
    }
    const s = Reflect.get(t, n, i);
    return (Yi(n) ? qf.has(n) : Om(n)) || (r || pt(t, "get", n), o) ? s : He(s) ? l && sa(n) ? s : s.value : Oe(s) ? r ? Dr(s) : Qt(s) : s;
  }
}
class Kf extends Yf {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = Hi(o);
      if (!No(i) && !Hi(i) && (o = _e(o), i = _e(i)), !xe(t) && He(o) && !He(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = xe(t) && sa(n) ? Number(n) < t.length : Pe(t, n), s = Reflect.set(t, n, i, r);
    return t === _e(r) && (l ? Un(i, o) && Cn(t, "set", n, i) : Cn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Pe(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && Cn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!Yi(n) || !qf.has(n)) && pt(t, "has", n), i;
  }
  ownKeys(t) {
    return pt(
      t,
      "iterate",
      xe(t) ? "length" : ci
    ), Reflect.ownKeys(t);
  }
}
class Dm extends Yf {
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
const Hm = /* @__PURE__ */ new Kf(), zm = /* @__PURE__ */ new Dm(), jm = /* @__PURE__ */ new Kf(
  !0
), va = (e) => e, fl = (e) => Reflect.getPrototypeOf(e);
function to(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = _e(e), o = _e(t);
  n || (Un(t, o) && pt(r, "get", t), pt(r, "get", o));
  const { has: l } = fl(r), s = i ? va : n ? ya : wr;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function no(e, t = !1) {
  const n = this.__v_raw, i = _e(n), r = _e(e);
  return t || (Un(e, r) && pt(i, "has", e), pt(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function io(e, t = !1) {
  return e = e.__v_raw, !t && pt(_e(e), "iterate", ci), Reflect.get(e, "size", e);
}
function yu(e) {
  e = _e(e);
  const t = _e(this);
  return fl(t).has.call(t, e) || (t.add(e), Cn(t, "add", e, e)), this;
}
function pu(e, t) {
  t = _e(t);
  const n = _e(this), { has: i, get: r } = fl(n);
  let o = i.call(n, e);
  o || (e = _e(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? Un(t, l) && Cn(n, "set", e, t) : Cn(n, "add", e, t), this;
}
function bu(e) {
  const t = _e(this), { has: n, get: i } = fl(t);
  let r = n.call(t, e);
  r || (e = _e(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && Cn(t, "delete", e, void 0), o;
}
function wu() {
  const e = _e(this), t = e.size !== 0, n = e.clear();
  return t && Cn(e, "clear", void 0, void 0), n;
}
function ro(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = _e(l), a = t ? va : e ? ya : wr;
    return !e && pt(s, "iterate", ci), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function oo(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = _e(r), l = $i(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? va : t ? ya : wr;
    return !t && pt(
      o,
      "iterate",
      a ? ys : ci
    ), {
      // iterator protocol
      next() {
        const { value: f, done: d } = u.next();
        return d ? { value: f, done: d } : {
          value: s ? [c(f[0]), c(f[1])] : c(f),
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
function $n(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Gm() {
  const e = {
    get(o) {
      return to(this, o);
    },
    get size() {
      return io(this);
    },
    has: no,
    add: yu,
    set: pu,
    delete: bu,
    clear: wu,
    forEach: ro(!1, !1)
  }, t = {
    get(o) {
      return to(this, o, !1, !0);
    },
    get size() {
      return io(this);
    },
    has: no,
    add: yu,
    set: pu,
    delete: bu,
    clear: wu,
    forEach: ro(!1, !0)
  }, n = {
    get(o) {
      return to(this, o, !0);
    },
    get size() {
      return io(this, !0);
    },
    has(o) {
      return no.call(this, o, !0);
    },
    add: $n("add"),
    set: $n("set"),
    delete: $n("delete"),
    clear: $n("clear"),
    forEach: ro(!0, !1)
  }, i = {
    get(o) {
      return to(this, o, !0, !0);
    },
    get size() {
      return io(this, !0);
    },
    has(o) {
      return no.call(this, o, !0);
    },
    add: $n("add"),
    set: $n("set"),
    delete: $n("delete"),
    clear: $n("clear"),
    forEach: ro(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = oo(
      o,
      !1,
      !1
    ), n[o] = oo(
      o,
      !0,
      !1
    ), t[o] = oo(
      o,
      !1,
      !0
    ), i[o] = oo(
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
  Um,
  Wm,
  qm,
  Ym
] = /* @__PURE__ */ Gm();
function ma(e, t) {
  const n = t ? e ? Ym : qm : e ? Wm : Um;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Pe(n, r) && r in i ? n : i,
    r,
    o
  );
}
const Km = {
  get: /* @__PURE__ */ ma(!1, !1)
}, Xm = {
  get: /* @__PURE__ */ ma(!1, !0)
}, Zm = {
  get: /* @__PURE__ */ ma(!0, !1)
}, Xf = /* @__PURE__ */ new WeakMap(), Zf = /* @__PURE__ */ new WeakMap(), Jf = /* @__PURE__ */ new WeakMap(), Jm = /* @__PURE__ */ new WeakMap();
function Qm(e) {
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
function eg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Qm(Sm(e));
}
function Qt(e) {
  return Hi(e) ? e : ga(
    e,
    !1,
    Hm,
    Km,
    Xf
  );
}
function tg(e) {
  return ga(
    e,
    !1,
    jm,
    Xm,
    Zf
  );
}
function Dr(e) {
  return ga(
    e,
    !0,
    zm,
    Zm,
    Jf
  );
}
function ga(e, t, n, i, r) {
  if (!Oe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = eg(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Ni(e) {
  return Hi(e) ? Ni(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Hi(e) {
  return !!(e && e.__v_isReadonly);
}
function No(e) {
  return !!(e && e.__v_isShallow);
}
function Qf(e) {
  return Ni(e) || Hi(e);
}
function _e(e) {
  const t = e && e.__v_raw;
  return t ? _e(t) : e;
}
function ed(e) {
  return Object.isExtensible(e) && Ao(e, "__v_skip", !0), e;
}
const wr = (e) => Oe(e) ? Qt(e) : e, ya = (e) => Oe(e) ? Dr(e) : e;
class td {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new fa(
      () => t(this._value),
      () => xo(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = _e(this);
    return (!t._cacheable || t.effect.dirty) && Un(t._value, t._value = t.effect.run()) && xo(t, 4), nd(t), t.effect._dirtyLevel >= 2 && xo(t, 2), t._value;
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
function ng(e, t, n = !1) {
  let i, r;
  const o = Ee(e);
  return o ? (i = e, r = $t) : (i = e.get, r = e.set), new td(i, r, o || !r, n);
}
function nd(e) {
  var t;
  jn && ui && (e = _e(e), Gf(
    ui,
    (t = e.dep) != null ? t : e.dep = Wf(
      () => e.dep = void 0,
      e instanceof td ? e : void 0
    )
  ));
}
function xo(e, t = 4, n) {
  e = _e(e);
  const i = e.dep;
  i && Uf(
    i,
    t
  );
}
function He(e) {
  return !!(e && e.__v_isRef === !0);
}
function Q(e) {
  return id(e, !1);
}
function pe(e) {
  return id(e, !0);
}
function id(e, t) {
  return He(e) ? e : new ig(e, t);
}
class ig {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : _e(t), this._value = n ? t : wr(t);
  }
  get value() {
    return nd(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || No(t) || Hi(t);
    t = n ? t : _e(t), Un(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : wr(t), xo(this, 4));
  }
}
function Kt(e) {
  return He(e) ? e.value : e;
}
const rg = {
  get: (e, t, n) => Kt(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return He(r) && !He(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function rd(e) {
  return Ni(e) ? e : new Proxy(e, rg);
}
function pa(e) {
  const t = xe(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = od(e, n);
  return t;
}
class og {
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
    return Rm(_e(this._object), this._key);
  }
}
class lg {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function oe(e, t, n) {
  return He(e) ? e : Ee(e) ? new lg(e) : Oe(e) && arguments.length > 1 ? od(e, t, n) : Q(e);
}
function od(e, t, n) {
  const i = e[t];
  return He(i) ? i : new og(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Gn(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    dl(r, t, n);
  }
}
function Rt(e, t, n, i) {
  if (Ee(e)) {
    const o = Gn(e, t, n, i);
    return o && Nf(o) && o.catch((l) => {
      dl(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Rt(e[o], t, n, i));
  return r;
}
function dl(e, t, n, i = !0) {
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
      Gn(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  sg(e, n, r, i);
}
function sg(e, t, n, i = !0) {
  console.error(e);
}
let xr = !1, ps = !1;
const it = [];
let fn = 0;
const Ri = [];
let On = null, ni = 0;
const ld = /* @__PURE__ */ Promise.resolve();
let ba = null;
function qe(e) {
  const t = ba || ld;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ag(e) {
  let t = fn + 1, n = it.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = it[i], o = _r(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function wa(e) {
  (!it.length || !it.includes(
    e,
    xr && e.allowRecurse ? fn + 1 : fn
  )) && (e.id == null ? it.push(e) : it.splice(ag(e.id), 0, e), sd());
}
function sd() {
  !xr && !ps && (ps = !0, ba = ld.then(ud));
}
function ug(e) {
  const t = it.indexOf(e);
  t > fn && it.splice(t, 1);
}
function cg(e) {
  xe(e) ? Ri.push(...e) : (!On || !On.includes(
    e,
    e.allowRecurse ? ni + 1 : ni
  )) && Ri.push(e), sd();
}
function xu(e, t, n = xr ? fn + 1 : 0) {
  for (; n < it.length; n++) {
    const i = it[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      it.splice(n, 1), n--, i();
    }
  }
}
function ad(e) {
  if (Ri.length) {
    const t = [...new Set(Ri)].sort(
      (n, i) => _r(n) - _r(i)
    );
    if (Ri.length = 0, On) {
      On.push(...t);
      return;
    }
    for (On = t, ni = 0; ni < On.length; ni++)
      On[ni]();
    On = null, ni = 0;
  }
}
const _r = (e) => e.id == null ? 1 / 0 : e.id, fg = (e, t) => {
  const n = _r(e) - _r(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ud(e) {
  ps = !1, xr = !0, it.sort(fg);
  try {
    for (fn = 0; fn < it.length; fn++) {
      const t = it[fn];
      t && t.active !== !1 && Gn(t, null, 14);
    }
  } finally {
    fn = 0, it.length = 0, ad(), xr = !1, ba = null, (it.length || Ri.length) && ud();
  }
}
function dg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || Be;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: f, trim: d } = i[c] || Be;
    d && (r = n.map((h) => We(h) ? h.trim() : h)), f && (r = n.map(Em));
  }
  let s, a = i[s = Dl(t)] || // also try camelCase event handler (#2249)
  i[s = Dl(dt(t))];
  !a && o && (a = i[s = Dl(Wt(t))]), a && Rt(
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
    e.emitted[s] = !0, Rt(
      u,
      e,
      6,
      r
    );
  }
}
function cd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Ee(e)) {
    const a = (u) => {
      const c = cd(u, t, !0);
      c && (s = !0, Ue(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Oe(e) && i.set(e, null), null) : (xe(o) ? o.forEach((a) => l[a] = null) : Ue(l, o), Oe(e) && i.set(e, l), l);
}
function hl(e, t) {
  return !e || !al(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Pe(e, t[0].toLowerCase() + t.slice(1)) || Pe(e, Wt(t)) || Pe(e, t));
}
let ct = null, fd = null;
function Ro(e) {
  const t = ct;
  return ct = e, fd = e && e.type.__scopeId || null, t;
}
function ae(e, t = ct, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && Nu(-1);
    const o = Ro(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Ro(o), i._d && Nu(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function jl(e) {
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
    renderCache: f,
    data: d,
    setupState: h,
    ctx: v,
    inheritAttrs: m
  } = e;
  let p, y;
  const w = Ro(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, _ = b;
      p = cn(
        c.call(
          _,
          b,
          f,
          o,
          h,
          d,
          v
        )
      ), y = a;
    } else {
      const b = t;
      p = cn(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), y = t.props ? a : hg(a);
    }
  } catch (b) {
    yr.length = 0, dl(b, e, 1), p = g(Ot);
  }
  let x = p;
  if (y && m !== !1) {
    const b = Object.keys(y), { shapeFlag: _ } = x;
    b.length && _ & 7 && (l && b.some(oa) && (y = vg(
      y,
      l
    )), x = kn(x, y));
  }
  return n.dirs && (x = kn(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), p = x, Ro(w), p;
}
const hg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || al(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, vg = (e, t) => {
  const n = {};
  for (const i in e)
    (!oa(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function mg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? _u(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (l[d] !== i[d] && !hl(u, d))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? _u(i, l, u) : !0 : !!l;
  return !1;
}
function _u(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !hl(n, o))
      return !0;
  }
  return !1;
}
function gg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const dd = "components", yg = "directives", pg = Symbol.for("v-ndc");
function bg(e) {
  return We(e) && hd(dd, e, !1) || e;
}
function en(e) {
  return hd(yg, e);
}
function hd(e, t, n = !0, i = !1) {
  const r = ct || tt;
  if (r) {
    const o = r.type;
    if (e === dd) {
      const s = h0(
        o,
        !1
      );
      if (s && (s === t || s === dt(t) || s === In(dt(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Su(r[e] || o[e], t) || // global registration
      Su(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function Su(e, t) {
  return e && (e[t] || e[dt(t)] || e[In(dt(t))]);
}
const wg = (e) => e.__isSuspense;
function xg(e, t) {
  t && t.pendingBranch ? xe(e) ? t.effects.push(...e) : t.effects.push(e) : cg(e);
}
const _g = Symbol.for("v-scx"), Sg = () => Fe(_g);
function mn(e, t) {
  return xa(e, null, t);
}
const lo = {};
function be(e, t, n) {
  return xa(e, t, n);
}
function xa(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = Be) {
  if (t && o) {
    const E = t;
    t = (...S) => {
      E(...S), _();
    };
  }
  const a = tt, u = (E) => i === !0 ? E : (
    // for deep: false, only traverse root-level properties
    oi(E, i === !1 ? 1 : void 0)
  );
  let c, f = !1, d = !1;
  if (He(e) ? (c = () => e.value, f = No(e)) : Ni(e) ? (c = () => u(e), f = !0) : xe(e) ? (d = !0, f = e.some((E) => Ni(E) || No(E)), c = () => e.map((E) => {
    if (He(E))
      return E.value;
    if (Ni(E))
      return u(E);
    if (Ee(E))
      return Gn(E, a, 2);
  })) : Ee(e) ? t ? c = () => Gn(e, a, 2) : c = () => (h && h(), Rt(
    e,
    a,
    3,
    [v]
  )) : c = $t, t && i) {
    const E = c;
    c = () => oi(E());
  }
  let h, v = (E) => {
    h = x.onStop = () => {
      Gn(E, a, 4), h = x.onStop = void 0;
    };
  }, m;
  if (bl)
    if (v = $t, t ? n && Rt(t, a, 3, [
      c(),
      d ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const E = Sg();
      m = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return $t;
  let p = d ? new Array(e.length).fill(lo) : lo;
  const y = () => {
    if (!(!x.active || !x.dirty))
      if (t) {
        const E = x.run();
        (i || f || (d ? E.some((S, I) => Un(S, p[I])) : Un(E, p))) && (h && h(), Rt(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          p === lo ? void 0 : d && p[0] === lo ? [] : p,
          v
        ]), p = E);
      } else
        x.run();
  };
  y.allowRecurse = !!t;
  let w;
  r === "sync" ? w = y : r === "post" ? w = () => gt(y, a && a.suspense) : (y.pre = !0, a && (y.id = a.uid), w = () => wa(y));
  const x = new fa(c, $t, w), b = $m(), _ = () => {
    x.stop(), b && la(b.effects, x);
  };
  return t ? n ? y() : p = x.run() : r === "post" ? gt(
    x.run.bind(x),
    a && a.suspense
  ) : x.run(), m && m.push(_), _;
}
function Cg(e, t, n) {
  const i = this.proxy, r = We(e) ? e.includes(".") ? vd(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Ee(t) ? o = t : (o = t.handler, n = t);
  const l = zr(this), s = xa(r, o.bind(i), n);
  return l(), s;
}
function vd(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function oi(e, t, n = 0, i) {
  if (!Oe(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), He(e))
    oi(e.value, t, n, i);
  else if (xe(e))
    for (let r = 0; r < e.length; r++)
      oi(e[r], t, n, i);
  else if ($f(e) || $i(e))
    e.forEach((r) => {
      oi(r, t, n, i);
    });
  else if (Of(e))
    for (const r in e)
      oi(e[r], t, n, i);
  return e;
}
function ze(e, t) {
  if (ct === null)
    return e;
  const n = wl(ct) || ct.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = Be] = t[r];
    o && (Ee(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && oi(l), i.push({
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
function Zn(e, t, n, i) {
  const r = e.dirs, o = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    o && (s.oldValue = o[l].value);
    let a = s.dir[i];
    a && (pi(), Rt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), bi());
  }
}
const Bn = Symbol("_leaveCb"), so = Symbol("_enterCb");
function md() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return tn(() => {
    e.isMounted = !0;
  }), nn(() => {
    e.isUnmounting = !0;
  }), e;
}
const Tt = [Function, Array], gd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Tt,
  onEnter: Tt,
  onAfterEnter: Tt,
  onEnterCancelled: Tt,
  // leave
  onBeforeLeave: Tt,
  onLeave: Tt,
  onAfterLeave: Tt,
  onLeaveCancelled: Tt,
  // appear
  onBeforeAppear: Tt,
  onAppear: Tt,
  onAfterAppear: Tt,
  onAppearCancelled: Tt
}, kg = {
  name: "BaseTransition",
  props: gd,
  setup(e, { slots: t }) {
    const n = Va(), i = md();
    return () => {
      const r = t.default && _a(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const d of r)
          if (d.type !== Ot) {
            o = d;
            break;
          }
      }
      const l = _e(e), { mode: s } = l;
      if (i.isLeaving)
        return Gl(o);
      const a = Cu(o);
      if (!a)
        return Gl(o);
      const u = Sr(
        a,
        l,
        i,
        n
      );
      Cr(a, u);
      const c = n.subTree, f = c && Cu(c);
      if (f && f.type !== Ot && !ii(a, f)) {
        const d = Sr(
          f,
          l,
          i,
          n
        );
        if (Cr(f, d), s === "out-in")
          return i.isLeaving = !0, d.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, Gl(o);
        s === "in-out" && a.type !== Ot && (d.delayLeave = (h, v, m) => {
          const p = yd(
            i,
            f
          );
          p[String(f.key)] = f, h[Bn] = () => {
            v(), h[Bn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, Eg = kg;
function yd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function Sr(e, t, n, i) {
  const {
    appear: r,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: s,
    onEnter: a,
    onAfterEnter: u,
    onEnterCancelled: c,
    onBeforeLeave: f,
    onLeave: d,
    onAfterLeave: h,
    onLeaveCancelled: v,
    onBeforeAppear: m,
    onAppear: p,
    onAfterAppear: y,
    onAppearCancelled: w
  } = t, x = String(e.key), b = yd(n, e), _ = (I, $) => {
    I && Rt(
      I,
      i,
      9,
      $
    );
  }, E = (I, $) => {
    const R = $[1];
    _(I, $), xe(I) ? I.every((H) => H.length <= 1) && R() : I.length <= 1 && R();
  }, S = {
    mode: o,
    persisted: l,
    beforeEnter(I) {
      let $ = s;
      if (!n.isMounted)
        if (r)
          $ = m || s;
        else
          return;
      I[Bn] && I[Bn](
        !0
        /* cancelled */
      );
      const R = b[x];
      R && ii(e, R) && R.el[Bn] && R.el[Bn](), _($, [I]);
    },
    enter(I) {
      let $ = a, R = u, H = c;
      if (!n.isMounted)
        if (r)
          $ = p || a, R = y || u, H = w || c;
        else
          return;
      let L = !1;
      const N = I[so] = (C) => {
        L || (L = !0, C ? _(H, [I]) : _(R, [I]), S.delayedLeave && S.delayedLeave(), I[so] = void 0);
      };
      $ ? E($, [I, N]) : N();
    },
    leave(I, $) {
      const R = String(e.key);
      if (I[so] && I[so](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      _(f, [I]);
      let H = !1;
      const L = I[Bn] = (N) => {
        H || (H = !0, $(), N ? _(v, [I]) : _(h, [I]), I[Bn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, d ? E(d, [I, L]) : L();
    },
    clone(I) {
      return Sr(I, t, n, i);
    }
  };
  return S;
}
function Gl(e) {
  if (vl(e))
    return e = kn(e), e.children = null, e;
}
function Cu(e) {
  return vl(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Cr(e, t) {
  e.shapeFlag & 6 && e.component ? Cr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function _a(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Ve ? (l.patchFlag & 128 && r++, i = i.concat(
      _a(l.children, t, s)
    )) : (t || l.type !== Ot) && i.push(s != null ? kn(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ki(e, t) {
  return Ee(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ue({ name: e.name }, t, { setup: e })
  ) : e;
}
const _o = (e) => !!e.type.__asyncLoader, vl = (e) => e.type.__isKeepAlive;
function Vg(e, t) {
  pd(e, "a", t);
}
function Lg(e, t) {
  pd(e, "da", t);
}
function pd(e, t, n = tt) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (ml(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      vl(r.parent.vnode) && Ig(i, t, n, r), r = r.parent;
  }
}
function Ig(e, t, n, i) {
  const r = ml(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  yl(() => {
    la(i[t], r);
  }, n);
}
function ml(e, t, n = tt, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      pi();
      const s = zr(n), a = Rt(t, n, e, l);
      return s(), bi(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const Pn = (e) => (t, n = tt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!bl || e === "sp") && ml(e, (...i) => t(...i), n)
), gl = Pn("bm"), tn = Pn("m"), Pg = Pn("bu"), bd = Pn("u"), nn = Pn("bum"), yl = Pn("um"), Tg = Pn("sp"), Mg = Pn(
  "rtg"
), Ag = Pn(
  "rtc"
);
function $g(e, t = tt) {
  ml("ec", e, t);
}
function Ng(e, t, n, i) {
  let r;
  const o = n;
  if (xe(e) || We(e)) {
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
const bs = (e) => e ? Td(e) ? wl(e) || e.proxy : bs(e.parent) : null, vr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ue(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => bs(e.parent),
    $root: (e) => bs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Sa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, wa(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = qe.bind(e.proxy)),
    $watch: (e) => Cg.bind(e)
  })
), Ul = (e, t) => e !== Be && !e.__isScriptSetup && Pe(e, t), Rg = {
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
        if (Ul(i, t))
          return l[t] = 1, i[t];
        if (r !== Be && Pe(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Pe(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== Be && Pe(n, t))
          return l[t] = 4, n[t];
        ws && (l[t] = 0);
      }
    }
    const c = vr[t];
    let f, d;
    if (c)
      return t === "$attrs" && pt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (f = s.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Be && Pe(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, Pe(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return Ul(r, t) ? (r[t] = n, !0) : i !== Be && Pe(i, t) ? (i[t] = n, !0) : Pe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== Be && Pe(e, l) || Ul(t, l) || (s = o[0]) && Pe(s, l) || Pe(i, l) || Pe(vr, l) || Pe(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Pe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ku(e) {
  return xe(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ws = !0;
function Og(e) {
  const t = Sa(e), n = e.proxy, i = e.ctx;
  ws = !1, t.beforeCreate && Eu(t.beforeCreate, e, "bc");
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
    beforeMount: f,
    mounted: d,
    beforeUpdate: h,
    updated: v,
    activated: m,
    deactivated: p,
    beforeDestroy: y,
    beforeUnmount: w,
    destroyed: x,
    unmounted: b,
    render: _,
    renderTracked: E,
    renderTriggered: S,
    errorCaptured: I,
    serverPrefetch: $,
    // public API
    expose: R,
    inheritAttrs: H,
    // assets
    components: L,
    directives: N,
    filters: C
  } = t;
  if (u && Bg(u, i, null), l)
    for (const z in l) {
      const A = l[z];
      Ee(A) && (i[z] = A.bind(n));
    }
  if (r) {
    const z = r.call(n, n);
    Oe(z) && (e.data = Qt(z));
  }
  if (ws = !0, o)
    for (const z in o) {
      const A = o[z], F = Ee(A) ? A.bind(n, n) : Ee(A.get) ? A.get.bind(n, n) : $t, O = !Ee(A) && Ee(A.set) ? A.set.bind(n) : $t, D = k({
        get: F,
        set: O
      });
      Object.defineProperty(i, z, {
        enumerable: !0,
        configurable: !0,
        get: () => D.value,
        set: (Y) => D.value = Y
      });
    }
  if (s)
    for (const z in s)
      wd(s[z], i, n, z);
  if (a) {
    const z = Ee(a) ? a.call(n) : a;
    Reflect.ownKeys(z).forEach((A) => {
      ot(A, z[A]);
    });
  }
  c && Eu(c, e, "c");
  function M(z, A) {
    xe(A) ? A.forEach((F) => z(F.bind(n))) : A && z(A.bind(n));
  }
  if (M(gl, f), M(tn, d), M(Pg, h), M(bd, v), M(Vg, m), M(Lg, p), M($g, I), M(Ag, E), M(Mg, S), M(nn, w), M(yl, b), M(Tg, $), xe(R))
    if (R.length) {
      const z = e.exposed || (e.exposed = {});
      R.forEach((A) => {
        Object.defineProperty(z, A, {
          get: () => n[A],
          set: (F) => n[A] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  _ && e.render === $t && (e.render = _), H != null && (e.inheritAttrs = H), L && (e.components = L), N && (e.directives = N);
}
function Bg(e, t, n = $t) {
  xe(e) && (e = xs(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Oe(r) ? "default" in r ? o = Fe(
      r.from || i,
      r.default,
      !0
    ) : o = Fe(r.from || i) : o = Fe(r), He(o) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function Eu(e, t, n) {
  Rt(
    xe(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function wd(e, t, n, i) {
  const r = i.includes(".") ? vd(n, i) : () => n[i];
  if (We(e)) {
    const o = t[e];
    Ee(o) && be(r, o);
  } else if (Ee(e))
    be(r, e.bind(n));
  else if (Oe(e))
    if (xe(e))
      e.forEach((o) => wd(o, t, n, i));
    else {
      const o = Ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ee(o) && be(r, o, e);
    }
}
function Sa(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => Oo(a, u, l, !0)
  ), Oo(a, t, l)), Oe(t) && o.set(t, a), a;
}
function Oo(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && Oo(e, o, n, !0), r && r.forEach(
    (l) => Oo(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = Fg[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const Fg = {
  data: Vu,
  props: Lu,
  emits: Lu,
  // objects
  methods: ur,
  computed: ur,
  // lifecycle
  beforeCreate: at,
  created: at,
  beforeMount: at,
  mounted: at,
  beforeUpdate: at,
  updated: at,
  beforeDestroy: at,
  beforeUnmount: at,
  destroyed: at,
  unmounted: at,
  activated: at,
  deactivated: at,
  errorCaptured: at,
  serverPrefetch: at,
  // assets
  components: ur,
  directives: ur,
  // watch
  watch: Hg,
  // provide / inject
  provide: Vu,
  inject: Dg
};
function Vu(e, t) {
  return t ? e ? function() {
    return Ue(
      Ee(e) ? e.call(this, this) : e,
      Ee(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Dg(e, t) {
  return ur(xs(e), xs(t));
}
function xs(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function at(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ur(e, t) {
  return e ? Ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Lu(e, t) {
  return e ? xe(e) && xe(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ue(
    /* @__PURE__ */ Object.create(null),
    ku(e),
    ku(t ?? {})
  ) : t;
}
function Hg(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ue(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = at(e[i], t[i]);
  return n;
}
function xd() {
  return {
    app: null,
    config: {
      isNativeTag: xm,
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
let zg = 0;
function jg(e, t) {
  return function(i, r = null) {
    Ee(i) || (i = Ue({}, i)), r != null && !Oe(r) && (r = null);
    const o = xd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: zg++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: m0,
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
      mount(u, c, f) {
        if (!s) {
          const d = g(i, r);
          return d.appContext = o, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && t ? t(d, u) : e(d, u, f), s = !0, a._container = u, u.__vue_app__ = a, wl(d.component) || d.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = mr;
        mr = a;
        try {
          return u();
        } finally {
          mr = c;
        }
      }
    };
    return a;
  };
}
let mr = null;
function ot(e, t) {
  if (tt) {
    let n = tt.provides;
    const i = tt.parent && tt.parent.provides;
    i === n && (n = tt.provides = Object.create(i)), n[e] = t;
  }
}
function Fe(e, t, n = !1) {
  const i = tt || ct;
  if (i || mr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : mr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Ee(t) ? t.call(i && i.proxy) : t;
  }
}
function Gg(e, t, n, i = !1) {
  const r = {}, o = {};
  Ao(o, pl, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), _d(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : tg(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Ug(e, t, n, i) {
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
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (hl(e.emitsOptions, d))
          continue;
        const h = t[d];
        if (a)
          if (Pe(o, d))
            h !== o[d] && (o[d] = h, u = !0);
          else {
            const v = dt(d);
            r[v] = _s(
              a,
              s,
              v,
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
    _d(e, t, r, o) && (u = !0);
    let c;
    for (const f in s)
      (!t || // for camelCase
      !Pe(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Wt(f)) === f || !Pe(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[f] = _s(
        a,
        s,
        f,
        void 0,
        e,
        !0
      )) : delete r[f]);
    if (o !== s)
      for (const f in o)
        (!t || !Pe(t, f)) && (delete o[f], u = !0);
  }
  u && Cn(e, "set", "$attrs");
}
function _d(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (hr(a))
        continue;
      const u = t[a];
      let c;
      r && Pe(r, c = dt(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : hl(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = _e(n), u = s || Be;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = _s(
        r,
        a,
        f,
        u[f],
        e,
        !Pe(u, f)
      );
    }
  }
  return l;
}
function _s(e, t, n, i, r, o) {
  const l = e[n];
  if (l != null) {
    const s = Pe(l, "default");
    if (s && i === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Ee(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          i = u[n];
        else {
          const c = zr(r);
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
    ] && (i === "" || i === Wt(n)) && (i = !0));
  }
  return i;
}
function Sd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Ee(e)) {
    const c = (f) => {
      a = !0;
      const [d, h] = Sd(f, t, !0);
      Ue(l, d), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Oe(e) && i.set(e, Ai), Ai;
  if (xe(o))
    for (let c = 0; c < o.length; c++) {
      const f = dt(o[c]);
      Iu(f) && (l[f] = Be);
    }
  else if (o)
    for (const c in o) {
      const f = dt(c);
      if (Iu(f)) {
        const d = o[c], h = l[f] = xe(d) || Ee(d) ? { type: d } : Ue({}, d);
        if (h) {
          const v = Mu(Boolean, h.type), m = Mu(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Pe(h, "default")) && s.push(f);
        }
      }
    }
  const u = [l, s];
  return Oe(e) && i.set(e, u), u;
}
function Iu(e) {
  return e[0] !== "$" && !hr(e);
}
function Pu(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Tu(e, t) {
  return Pu(e) === Pu(t);
}
function Mu(e, t) {
  return xe(t) ? t.findIndex((n) => Tu(n, e)) : Ee(t) && Tu(t, e) ? 0 : -1;
}
const Cd = (e) => e[0] === "_" || e === "$stable", Ca = (e) => xe(e) ? e.map(cn) : [cn(e)], Wg = (e, t, n) => {
  if (t._n)
    return t;
  const i = ae((...r) => Ca(t(...r)), n);
  return i._c = !1, i;
}, kd = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (Cd(r))
      continue;
    const o = e[r];
    if (Ee(o))
      t[r] = Wg(r, o, i);
    else if (o != null) {
      const l = Ca(o);
      t[r] = () => l;
    }
  }
}, Ed = (e, t) => {
  const n = Ca(t);
  e.slots.default = () => n;
}, qg = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = _e(t), Ao(t, "_", n)) : kd(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Ed(e, t);
  Ao(e.slots, pl, 1);
}, Yg = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = Be;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (Ue(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, kd(t, r)), l = t;
  } else t && (Ed(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !Cd(s) && l[s] == null && delete r[s];
};
function Ss(e, t, n, i, r = !1) {
  if (xe(e)) {
    e.forEach(
      (d, h) => Ss(
        d,
        t && (xe(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (_o(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? wl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === Be ? s.refs = {} : s.refs, f = s.setupState;
  if (u != null && u !== a && (We(u) ? (c[u] = null, Pe(f, u) && (f[u] = null)) : He(u) && (u.value = null)), Ee(a))
    Gn(a, s, 12, [l, c]);
  else {
    const d = We(a), h = He(a);
    if (d || h) {
      const v = () => {
        if (e.f) {
          const m = d ? Pe(f, a) ? f[a] : c[a] : a.value;
          r ? xe(m) && la(m, o) : xe(m) ? m.includes(o) || m.push(o) : d ? (c[a] = [o], Pe(f, a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else d ? (c[a] = l, Pe(f, a) && (f[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, gt(v, n)) : v();
    }
  }
}
const gt = xg;
function Kg(e) {
  return Xg(e);
}
function Xg(e, t) {
  const n = Bf();
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
    parentNode: f,
    nextSibling: d,
    setScopeId: h = $t,
    insertStaticContent: v
  } = e, m = (V, P, j, q = null, K = null, ne = null, re = void 0, te = null, ie = !!P.dynamicChildren) => {
    if (V === P)
      return;
    V && !ii(V, P) && (q = ue(V), Y(V, K, ne, !0), V = null), P.patchFlag === -2 && (ie = !1, P.dynamicChildren = null);
    const { type: Z, ref: le, shapeFlag: ye } = P;
    switch (Z) {
      case Hr:
        p(V, P, j, q);
        break;
      case Ot:
        y(V, P, j, q);
        break;
      case ql:
        V == null && w(P, j, q, re);
        break;
      case Ve:
        L(
          V,
          P,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie
        );
        break;
      default:
        ye & 1 ? _(
          V,
          P,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie
        ) : ye & 6 ? N(
          V,
          P,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie
        ) : (ye & 64 || ye & 128) && Z.process(
          V,
          P,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie,
          lt
        );
    }
    le != null && K && Ss(le, V && V.ref, ne, P || V, !P);
  }, p = (V, P, j, q) => {
    if (V == null)
      i(
        P.el = s(P.children),
        j,
        q
      );
    else {
      const K = P.el = V.el;
      P.children !== V.children && u(K, P.children);
    }
  }, y = (V, P, j, q) => {
    V == null ? i(
      P.el = a(P.children || ""),
      j,
      q
    ) : P.el = V.el;
  }, w = (V, P, j, q) => {
    [V.el, V.anchor] = v(
      V.children,
      P,
      j,
      q,
      V.el,
      V.anchor
    );
  }, x = ({ el: V, anchor: P }, j, q) => {
    let K;
    for (; V && V !== P; )
      K = d(V), i(V, j, q), V = K;
    i(P, j, q);
  }, b = ({ el: V, anchor: P }) => {
    let j;
    for (; V && V !== P; )
      j = d(V), r(V), V = j;
    r(P);
  }, _ = (V, P, j, q, K, ne, re, te, ie) => {
    P.type === "svg" ? re = "svg" : P.type === "math" && (re = "mathml"), V == null ? E(
      P,
      j,
      q,
      K,
      ne,
      re,
      te,
      ie
    ) : $(
      V,
      P,
      K,
      ne,
      re,
      te,
      ie
    );
  }, E = (V, P, j, q, K, ne, re, te) => {
    let ie, Z;
    const { props: le, shapeFlag: ye, transition: ve, dirs: we } = V;
    if (ie = V.el = l(
      V.type,
      ne,
      le && le.is,
      le
    ), ye & 8 ? c(ie, V.children) : ye & 16 && I(
      V.children,
      ie,
      null,
      q,
      K,
      Wl(V, ne),
      re,
      te
    ), we && Zn(V, null, q, "created"), S(ie, V, V.scopeId, re, q), le) {
      for (const Ae in le)
        Ae !== "value" && !hr(Ae) && o(
          ie,
          Ae,
          null,
          le[Ae],
          ne,
          V.children,
          q,
          K,
          J
        );
      "value" in le && o(ie, "value", null, le.value, ne), (Z = le.onVnodeBeforeMount) && un(Z, q, V);
    }
    we && Zn(V, null, q, "beforeMount");
    const Le = Zg(K, ve);
    Le && ve.beforeEnter(ie), i(ie, P, j), ((Z = le && le.onVnodeMounted) || Le || we) && gt(() => {
      Z && un(Z, q, V), Le && ve.enter(ie), we && Zn(V, null, q, "mounted");
    }, K);
  }, S = (V, P, j, q, K) => {
    if (j && h(V, j), q)
      for (let ne = 0; ne < q.length; ne++)
        h(V, q[ne]);
    if (K) {
      let ne = K.subTree;
      if (P === ne) {
        const re = K.vnode;
        S(
          V,
          re,
          re.scopeId,
          re.slotScopeIds,
          K.parent
        );
      }
    }
  }, I = (V, P, j, q, K, ne, re, te, ie = 0) => {
    for (let Z = ie; Z < V.length; Z++) {
      const le = V[Z] = te ? Fn(V[Z]) : cn(V[Z]);
      m(
        null,
        le,
        P,
        j,
        q,
        K,
        ne,
        re,
        te
      );
    }
  }, $ = (V, P, j, q, K, ne, re) => {
    const te = P.el = V.el;
    let { patchFlag: ie, dynamicChildren: Z, dirs: le } = P;
    ie |= V.patchFlag & 16;
    const ye = V.props || Be, ve = P.props || Be;
    let we;
    if (j && Jn(j, !1), (we = ve.onVnodeBeforeUpdate) && un(we, j, P, V), le && Zn(P, V, j, "beforeUpdate"), j && Jn(j, !0), Z ? R(
      V.dynamicChildren,
      Z,
      te,
      j,
      q,
      Wl(P, K),
      ne
    ) : re || A(
      V,
      P,
      te,
      null,
      j,
      q,
      Wl(P, K),
      ne,
      !1
    ), ie > 0) {
      if (ie & 16)
        H(
          te,
          P,
          ye,
          ve,
          j,
          q,
          K
        );
      else if (ie & 2 && ye.class !== ve.class && o(te, "class", null, ve.class, K), ie & 4 && o(te, "style", ye.style, ve.style, K), ie & 8) {
        const Le = P.dynamicProps;
        for (let Ae = 0; Ae < Le.length; Ae++) {
          const T = Le[Ae], G = ye[T], W = ve[T];
          (W !== G || T === "value") && o(
            te,
            T,
            G,
            W,
            K,
            V.children,
            j,
            q,
            J
          );
        }
      }
      ie & 1 && V.children !== P.children && c(te, P.children);
    } else !re && Z == null && H(
      te,
      P,
      ye,
      ve,
      j,
      q,
      K
    );
    ((we = ve.onVnodeUpdated) || le) && gt(() => {
      we && un(we, j, P, V), le && Zn(P, V, j, "updated");
    }, q);
  }, R = (V, P, j, q, K, ne, re) => {
    for (let te = 0; te < P.length; te++) {
      const ie = V[te], Z = P[te], le = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        ie.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (ie.type === Ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ii(ie, Z) || // - In the case of a component, it could contain anything.
        ie.shapeFlag & 70) ? f(ie.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          j
        )
      );
      m(
        ie,
        Z,
        le,
        null,
        q,
        K,
        ne,
        re,
        !0
      );
    }
  }, H = (V, P, j, q, K, ne, re) => {
    if (j !== q) {
      if (j !== Be)
        for (const te in j)
          !hr(te) && !(te in q) && o(
            V,
            te,
            j[te],
            null,
            re,
            P.children,
            K,
            ne,
            J
          );
      for (const te in q) {
        if (hr(te))
          continue;
        const ie = q[te], Z = j[te];
        ie !== Z && te !== "value" && o(
          V,
          te,
          Z,
          ie,
          re,
          P.children,
          K,
          ne,
          J
        );
      }
      "value" in q && o(V, "value", j.value, q.value, re);
    }
  }, L = (V, P, j, q, K, ne, re, te, ie) => {
    const Z = P.el = V ? V.el : s(""), le = P.anchor = V ? V.anchor : s("");
    let { patchFlag: ye, dynamicChildren: ve, slotScopeIds: we } = P;
    we && (te = te ? te.concat(we) : we), V == null ? (i(Z, j, q), i(le, j, q), I(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      P.children || [],
      j,
      le,
      K,
      ne,
      re,
      te,
      ie
    )) : ye > 0 && ye & 64 && ve && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      ve,
      j,
      K,
      ne,
      re,
      te
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (P.key != null || K && P === K.subTree) && ka(
      V,
      P,
      !0
      /* shallow */
    )) : A(
      V,
      P,
      j,
      le,
      K,
      ne,
      re,
      te,
      ie
    );
  }, N = (V, P, j, q, K, ne, re, te, ie) => {
    P.slotScopeIds = te, V == null ? P.shapeFlag & 512 ? K.ctx.activate(
      P,
      j,
      q,
      re,
      ie
    ) : C(
      P,
      j,
      q,
      K,
      ne,
      re,
      ie
    ) : B(V, P, ie);
  }, C = (V, P, j, q, K, ne, re) => {
    const te = V.component = a0(
      V,
      q,
      K
    );
    if (vl(V) && (te.ctx.renderer = lt), u0(te), te.asyncDep) {
      if (K && K.registerDep(te, M), !V.el) {
        const ie = te.subTree = g(Ot);
        y(null, ie, P, j);
      }
    } else
      M(
        te,
        V,
        P,
        j,
        K,
        ne,
        re
      );
  }, B = (V, P, j) => {
    const q = P.component = V.component;
    if (mg(V, P, j))
      if (q.asyncDep && !q.asyncResolved) {
        z(q, P, j);
        return;
      } else
        q.next = P, ug(q.update), q.effect.dirty = !0, q.update();
    else
      P.el = V.el, q.vnode = P;
  }, M = (V, P, j, q, K, ne, re) => {
    const te = () => {
      if (V.isMounted) {
        let { next: le, bu: ye, u: ve, parent: we, vnode: Le } = V;
        {
          const U = Vd(V);
          if (U) {
            le && (le.el = Le.el, z(V, le, re)), U.asyncDep.then(() => {
              V.isUnmounted || te();
            });
            return;
          }
        }
        let Ae = le, T;
        Jn(V, !1), le ? (le.el = Le.el, z(V, le, re)) : le = Le, ye && Hl(ye), (T = le.props && le.props.onVnodeBeforeUpdate) && un(T, we, le, Le), Jn(V, !0);
        const G = jl(V), W = V.subTree;
        V.subTree = G, m(
          W,
          G,
          // parent may have changed if it's in a teleport
          f(W.el),
          // anchor may have changed if it's in a fragment
          ue(W),
          V,
          K,
          ne
        ), le.el = G.el, Ae === null && gg(V, G.el), ve && gt(ve, K), (T = le.props && le.props.onVnodeUpdated) && gt(
          () => un(T, we, le, Le),
          K
        );
      } else {
        let le;
        const { el: ye, props: ve } = P, { bm: we, m: Le, parent: Ae } = V, T = _o(P);
        if (Jn(V, !1), we && Hl(we), !T && (le = ve && ve.onVnodeBeforeMount) && un(le, Ae, P), Jn(V, !0), ye && an) {
          const G = () => {
            V.subTree = jl(V), an(
              ye,
              V.subTree,
              V,
              K,
              null
            );
          };
          T ? P.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && G()
          ) : G();
        } else {
          const G = V.subTree = jl(V);
          m(
            null,
            G,
            j,
            q,
            V,
            K,
            ne
          ), P.el = G.el;
        }
        if (Le && gt(Le, K), !T && (le = ve && ve.onVnodeMounted)) {
          const G = P;
          gt(
            () => un(le, Ae, G),
            K
          );
        }
        (P.shapeFlag & 256 || Ae && _o(Ae.vnode) && Ae.vnode.shapeFlag & 256) && V.a && gt(V.a, K), V.isMounted = !0, P = j = q = null;
      }
    }, ie = V.effect = new fa(
      te,
      $t,
      () => wa(Z),
      V.scope
      // track it in component's effect scope
    ), Z = V.update = () => {
      ie.dirty && ie.run();
    };
    Z.id = V.uid, Jn(V, !0), Z();
  }, z = (V, P, j) => {
    P.component = V;
    const q = V.vnode.props;
    V.vnode = P, V.next = null, Ug(V, P.props, q, j), Yg(V, P.children, j), pi(), xu(V), bi();
  }, A = (V, P, j, q, K, ne, re, te, ie = !1) => {
    const Z = V && V.children, le = V ? V.shapeFlag : 0, ye = P.children, { patchFlag: ve, shapeFlag: we } = P;
    if (ve > 0) {
      if (ve & 128) {
        O(
          Z,
          ye,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie
        );
        return;
      } else if (ve & 256) {
        F(
          Z,
          ye,
          j,
          q,
          K,
          ne,
          re,
          te,
          ie
        );
        return;
      }
    }
    we & 8 ? (le & 16 && J(Z, K, ne), ye !== Z && c(j, ye)) : le & 16 ? we & 16 ? O(
      Z,
      ye,
      j,
      q,
      K,
      ne,
      re,
      te,
      ie
    ) : J(Z, K, ne, !0) : (le & 8 && c(j, ""), we & 16 && I(
      ye,
      j,
      q,
      K,
      ne,
      re,
      te,
      ie
    ));
  }, F = (V, P, j, q, K, ne, re, te, ie) => {
    V = V || Ai, P = P || Ai;
    const Z = V.length, le = P.length, ye = Math.min(Z, le);
    let ve;
    for (ve = 0; ve < ye; ve++) {
      const we = P[ve] = ie ? Fn(P[ve]) : cn(P[ve]);
      m(
        V[ve],
        we,
        j,
        null,
        K,
        ne,
        re,
        te,
        ie
      );
    }
    Z > le ? J(
      V,
      K,
      ne,
      !0,
      !1,
      ye
    ) : I(
      P,
      j,
      q,
      K,
      ne,
      re,
      te,
      ie,
      ye
    );
  }, O = (V, P, j, q, K, ne, re, te, ie) => {
    let Z = 0;
    const le = P.length;
    let ye = V.length - 1, ve = le - 1;
    for (; Z <= ye && Z <= ve; ) {
      const we = V[Z], Le = P[Z] = ie ? Fn(P[Z]) : cn(P[Z]);
      if (ii(we, Le))
        m(
          we,
          Le,
          j,
          null,
          K,
          ne,
          re,
          te,
          ie
        );
      else
        break;
      Z++;
    }
    for (; Z <= ye && Z <= ve; ) {
      const we = V[ye], Le = P[ve] = ie ? Fn(P[ve]) : cn(P[ve]);
      if (ii(we, Le))
        m(
          we,
          Le,
          j,
          null,
          K,
          ne,
          re,
          te,
          ie
        );
      else
        break;
      ye--, ve--;
    }
    if (Z > ye) {
      if (Z <= ve) {
        const we = ve + 1, Le = we < le ? P[we].el : q;
        for (; Z <= ve; )
          m(
            null,
            P[Z] = ie ? Fn(P[Z]) : cn(P[Z]),
            j,
            Le,
            K,
            ne,
            re,
            te,
            ie
          ), Z++;
      }
    } else if (Z > ve)
      for (; Z <= ye; )
        Y(V[Z], K, ne, !0), Z++;
    else {
      const we = Z, Le = Z, Ae = /* @__PURE__ */ new Map();
      for (Z = Le; Z <= ve; Z++) {
        const Ge = P[Z] = ie ? Fn(P[Z]) : cn(P[Z]);
        Ge.key != null && Ae.set(Ge.key, Z);
      }
      let T, G = 0;
      const W = ve - Le + 1;
      let U = !1, se = 0;
      const Me = new Array(W);
      for (Z = 0; Z < W; Z++)
        Me[Z] = 0;
      for (Z = we; Z <= ye; Z++) {
        const Ge = V[Z];
        if (G >= W) {
          Y(Ge, K, ne, !0);
          continue;
        }
        let st;
        if (Ge.key != null)
          st = Ae.get(Ge.key);
        else
          for (T = Le; T <= ve; T++)
            if (Me[T - Le] === 0 && ii(Ge, P[T])) {
              st = T;
              break;
            }
        st === void 0 ? Y(Ge, K, ne, !0) : (Me[st - Le] = Z + 1, st >= se ? se = st : U = !0, m(
          Ge,
          P[st],
          j,
          null,
          K,
          ne,
          re,
          te,
          ie
        ), G++);
      }
      const et = U ? Jg(Me) : Ai;
      for (T = et.length - 1, Z = W - 1; Z >= 0; Z--) {
        const Ge = Le + Z, st = P[Ge], tr = Ge + 1 < le ? P[Ge + 1].el : q;
        Me[Z] === 0 ? m(
          null,
          st,
          j,
          tr,
          K,
          ne,
          re,
          te,
          ie
        ) : U && (T < 0 || Z !== et[T] ? D(st, j, tr, 2) : T--);
      }
    }
  }, D = (V, P, j, q, K = null) => {
    const { el: ne, type: re, transition: te, children: ie, shapeFlag: Z } = V;
    if (Z & 6) {
      D(V.component.subTree, P, j, q);
      return;
    }
    if (Z & 128) {
      V.suspense.move(P, j, q);
      return;
    }
    if (Z & 64) {
      re.move(V, P, j, lt);
      return;
    }
    if (re === Ve) {
      i(ne, P, j);
      for (let ye = 0; ye < ie.length; ye++)
        D(ie[ye], P, j, q);
      i(V.anchor, P, j);
      return;
    }
    if (re === ql) {
      x(V, P, j);
      return;
    }
    if (q !== 2 && Z & 1 && te)
      if (q === 0)
        te.beforeEnter(ne), i(ne, P, j), gt(() => te.enter(ne), K);
      else {
        const { leave: ye, delayLeave: ve, afterLeave: we } = te, Le = () => i(ne, P, j), Ae = () => {
          ye(ne, () => {
            Le(), we && we();
          });
        };
        ve ? ve(ne, Le, Ae) : Ae();
      }
    else
      i(ne, P, j);
  }, Y = (V, P, j, q = !1, K = !1) => {
    const {
      type: ne,
      props: re,
      ref: te,
      children: ie,
      dynamicChildren: Z,
      shapeFlag: le,
      patchFlag: ye,
      dirs: ve
    } = V;
    if (te != null && Ss(te, null, j, V, !0), le & 256) {
      P.ctx.deactivate(V);
      return;
    }
    const we = le & 1 && ve, Le = !_o(V);
    let Ae;
    if (Le && (Ae = re && re.onVnodeBeforeUnmount) && un(Ae, P, V), le & 6)
      me(V.component, j, q);
    else {
      if (le & 128) {
        V.suspense.unmount(j, q);
        return;
      }
      we && Zn(V, null, P, "beforeUnmount"), le & 64 ? V.type.remove(
        V,
        P,
        j,
        K,
        lt,
        q
      ) : Z && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ne !== Ve || ye > 0 && ye & 64) ? J(
        Z,
        P,
        j,
        !1,
        !0
      ) : (ne === Ve && ye & 384 || !K && le & 16) && J(ie, P, j), q && ee(V);
    }
    (Le && (Ae = re && re.onVnodeUnmounted) || we) && gt(() => {
      Ae && un(Ae, P, V), we && Zn(V, null, P, "unmounted");
    }, j);
  }, ee = (V) => {
    const { type: P, el: j, anchor: q, transition: K } = V;
    if (P === Ve) {
      ce(j, q);
      return;
    }
    if (P === ql) {
      b(V);
      return;
    }
    const ne = () => {
      r(j), K && !K.persisted && K.afterLeave && K.afterLeave();
    };
    if (V.shapeFlag & 1 && K && !K.persisted) {
      const { leave: re, delayLeave: te } = K, ie = () => re(j, ne);
      te ? te(V.el, ne, ie) : ie();
    } else
      ne();
  }, ce = (V, P) => {
    let j;
    for (; V !== P; )
      j = d(V), r(V), V = j;
    r(P);
  }, me = (V, P, j) => {
    const { bum: q, scope: K, update: ne, subTree: re, um: te } = V;
    q && Hl(q), K.stop(), ne && (ne.active = !1, Y(re, V, P, j)), te && gt(te, P), gt(() => {
      V.isUnmounted = !0;
    }, P), P && P.pendingBranch && !P.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === P.pendingId && (P.deps--, P.deps === 0 && P.resolve());
  }, J = (V, P, j, q = !1, K = !1, ne = 0) => {
    for (let re = ne; re < V.length; re++)
      Y(V[re], P, j, q, K);
  }, ue = (V) => V.shapeFlag & 6 ? ue(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : d(V.anchor || V.el);
  let ke = !1;
  const Ke = (V, P, j) => {
    V == null ? P._vnode && Y(P._vnode, null, null, !0) : m(
      P._vnode || null,
      V,
      P,
      null,
      null,
      null,
      j
    ), ke || (ke = !0, xu(), ad(), ke = !1), P._vnode = V;
  }, lt = {
    p: m,
    um: Y,
    m: D,
    r: ee,
    mt: C,
    mc: I,
    pc: A,
    pbc: R,
    n: ue,
    o: e
  };
  let zt, an;
  return {
    render: Ke,
    hydrate: zt,
    createApp: jg(Ke, zt)
  };
}
function Wl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Jn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Zg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ka(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (xe(i) && xe(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = Fn(r[o]), s.el = l.el), n || ka(l, s)), s.type === Hr && (s.el = l.el);
    }
}
function Jg(e) {
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
function Vd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Vd(t);
}
const Qg = (e) => e.__isTeleport, gr = (e) => e && (e.disabled || e.disabled === ""), Au = (e) => typeof SVGElement < "u" && e instanceof SVGElement, $u = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Cs = (e, t) => {
  const n = e && e.to;
  return We(n) ? t ? t(n) : null : n;
}, e0 = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: f,
      pbc: d,
      o: { insert: h, querySelector: v, createText: m, createComment: p }
    } = u, y = gr(t.props);
    let { shapeFlag: w, children: x, dynamicChildren: b } = t;
    if (e == null) {
      const _ = t.el = m(""), E = t.anchor = m("");
      h(_, n, i), h(E, n, i);
      const S = t.target = Cs(t.props, v), I = t.targetAnchor = m("");
      S && (h(I, S), l === "svg" || Au(S) ? l = "svg" : (l === "mathml" || $u(S)) && (l = "mathml"));
      const $ = (R, H) => {
        w & 16 && c(
          x,
          R,
          H,
          r,
          o,
          l,
          s,
          a
        );
      };
      y ? $(n, E) : S && $(S, I);
    } else {
      t.el = e.el;
      const _ = t.anchor = e.anchor, E = t.target = e.target, S = t.targetAnchor = e.targetAnchor, I = gr(e.props), $ = I ? n : E, R = I ? _ : S;
      if (l === "svg" || Au(E) ? l = "svg" : (l === "mathml" || $u(E)) && (l = "mathml"), b ? (d(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), ka(e, t, !0)) : a || f(
        e,
        t,
        $,
        R,
        r,
        o,
        l,
        s,
        !1
      ), y)
        I ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : ao(
          t,
          n,
          _,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const H = t.target = Cs(
          t.props,
          v
        );
        H && ao(
          t,
          H,
          null,
          u,
          0
        );
      } else I && ao(
        t,
        E,
        S,
        u,
        1
      );
    }
    Ld(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: f, props: d } = e;
    if (f && o(c), l && o(u), s & 16) {
      const h = l || !gr(d);
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
  move: ao,
  hydrate: t0
};
function ao(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, f = o === 2;
  if (f && i(l, t, n), (!f || gr(c)) && a & 16)
    for (let d = 0; d < u.length; d++)
      r(
        u[d],
        t,
        n,
        2
      );
  f && i(s, t, n);
}
function t0(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = Cs(
    t.props,
    a
  );
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (gr(t.props))
        t.anchor = u(
          l(e),
          t,
          s(e),
          n,
          i,
          r,
          o
        ), t.targetAnchor = f;
      else {
        t.anchor = l(e);
        let d = f;
        for (; d; )
          if (d = l(d), d && d.nodeType === 8 && d.data === "teleport anchor") {
            t.targetAnchor = d, c._lpa = t.targetAnchor && l(t.targetAnchor);
            break;
          }
        u(
          f,
          t,
          c,
          n,
          i,
          r,
          o
        );
      }
    Ld(t);
  }
  return t.anchor && l(t.anchor);
}
const n0 = e0;
function Ld(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Ve = Symbol.for("v-fgt"), Hr = Symbol.for("v-txt"), Ot = Symbol.for("v-cmt"), ql = Symbol.for("v-stc"), yr = [];
let Xt = null;
function Ct(e = !1) {
  yr.push(Xt = e ? null : []);
}
function i0() {
  yr.pop(), Xt = yr[yr.length - 1] || null;
}
let kr = 1;
function Nu(e) {
  kr += e;
}
function Id(e) {
  return e.dynamicChildren = kr > 0 ? Xt || Ai : null, i0(), kr > 0 && Xt && Xt.push(e), e;
}
function ks(e, t, n, i, r, o) {
  return Id(
    Ne(
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
function dn(e, t, n, i, r) {
  return Id(
    g(
      e,
      t,
      n,
      i,
      r,
      !0
    )
  );
}
function Bo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ii(e, t) {
  return e.type === t.type && e.key === t.key;
}
const pl = "__vInternal", Pd = ({ key: e }) => e ?? null, So = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? We(e) || He(e) || Ee(e) ? { i: ct, r: e, k: t, f: !!n } : e : null);
function Ne(e, t = null, n = null, i = 0, r = null, o = e === Ve ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pd(t),
    ref: t && So(t),
    scopeId: fd,
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
    ctx: ct
  };
  return s ? (Ea(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= We(n) ? 8 : 16), kr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Xt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Xt.push(a), a;
}
const g = r0;
function r0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === pg) && (e = Ot), Bo(e)) {
    const s = kn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ea(s, n), kr > 0 && !o && Xt && (s.shapeFlag & 6 ? Xt[Xt.indexOf(e)] = s : Xt.push(s)), s.patchFlag |= -2, s;
  }
  if (v0(e) && (e = e.__vccOpts), t) {
    t = o0(t);
    let { class: s, style: a } = t;
    s && !We(s) && (t.class = ua(s)), Oe(a) && (Qf(a) && !xe(a) && (a = Ue({}, a)), t.style = aa(a));
  }
  const l = We(e) ? 1 : wg(e) ? 128 : Qg(e) ? 64 : Oe(e) ? 4 : Ee(e) ? 2 : 0;
  return Ne(
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
function o0(e) {
  return e ? Qf(e) || pl in e ? Ue({}, e) : e : null;
}
function kn(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? de(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && Pd(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? xe(r) ? r.concat(So(t)) : [r, So(t)] : So(t)
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
    ssContent: e.ssContent && kn(e.ssContent),
    ssFallback: e.ssFallback && kn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Xe(e = " ", t = 0) {
  return g(Hr, null, e, t);
}
function Ut(e = "", t = !1) {
  return t ? (Ct(), dn(Ot, null, e)) : g(Ot, null, e);
}
function cn(e) {
  return e == null || typeof e == "boolean" ? g(Ot) : xe(e) ? g(
    Ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Fn(e) : g(Hr, null, String(e));
}
function Fn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kn(e);
}
function Ea(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (xe(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ea(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(pl in t) ? t._ctx = ct : r === 3 && ct && (ct.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ee(t) ? (t = { default: t, _ctx: ct }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Xe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function de(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = ua([t.class, i.class]));
      else if (r === "style")
        t.style = aa([t.style, i.style]);
      else if (al(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(xe(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function un(e, t, n, i = null) {
  Rt(e, t, 7, [
    n,
    i
  ]);
}
const l0 = xd();
let s0 = 0;
function a0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || l0, o = {
    uid: s0++,
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
    scope: new Hf(
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
    propsOptions: Sd(i, r),
    emitsOptions: cd(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Be,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: Be,
    data: Be,
    props: Be,
    attrs: Be,
    slots: Be,
    refs: Be,
    setupState: Be,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = dg.bind(null, o), e.ce && e.ce(o), o;
}
let tt = null;
const Va = () => tt || ct;
let Fo, Es;
{
  const e = Bf(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  Fo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => tt = n
  ), Es = t(
    "__VUE_SSR_SETTERS__",
    (n) => bl = n
  );
}
const zr = (e) => {
  const t = tt;
  return Fo(e), e.scope.on(), () => {
    e.scope.off(), Fo(t);
  };
}, Ru = () => {
  tt && tt.scope.off(), Fo(null);
};
function Td(e) {
  return e.vnode.shapeFlag & 4;
}
let bl = !1;
function u0(e, t = !1) {
  t && Es(t);
  const { props: n, children: i } = e.vnode, r = Td(e);
  Gg(e, n, r, t), qg(e, i);
  const o = r ? c0(e, t) : void 0;
  return t && Es(!1), o;
}
function c0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ed(new Proxy(e.ctx, Rg));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? d0(e) : null, o = zr(e);
    pi();
    const l = Gn(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (bi(), o(), Nf(l)) {
      if (l.then(Ru, Ru), t)
        return l.then((s) => {
          Ou(e, s, t);
        }).catch((s) => {
          dl(s, e, 0);
        });
      e.asyncDep = l;
    } else
      Ou(e, l, t);
  } else
    Md(e, t);
}
function Ou(e, t, n) {
  Ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Oe(t) && (e.setupState = rd(t)), Md(e, n);
}
let Bu;
function Md(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Bu && !i.render) {
      const r = i.template || Sa(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = Ue(
          Ue(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = Bu(r, u);
      }
    }
    e.render = i.render || $t;
  }
  {
    const r = zr(e);
    pi();
    try {
      Og(e);
    } finally {
      bi(), r();
    }
  }
}
function f0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return pt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function d0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return f0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function wl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(rd(ed(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in vr)
          return vr[n](e);
      },
      has(t, n) {
        return n in t || n in vr;
      }
    }));
}
function h0(e, t = !0) {
  return Ee(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function v0(e) {
  return Ee(e) && "__vccOpts" in e;
}
const k = (e, t) => ng(e, t, bl);
function qn(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Oe(t) && !xe(t) ? Bo(t) ? g(e, null, [t]) : g(e, t) : g(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && Bo(n) && (n = [n]), g(e, t, n));
}
const m0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const g0 = "http://www.w3.org/2000/svg", y0 = "http://www.w3.org/1998/Math/MathML", Dn = typeof document < "u" ? document : null, Fu = Dn && /* @__PURE__ */ Dn.createElement("template"), p0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? Dn.createElementNS(g0, e) : t === "mathml" ? Dn.createElementNS(y0, e) : Dn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => Dn.createTextNode(e),
  createComment: (e) => Dn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Dn.querySelector(e),
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
      Fu.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = Fu.content;
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
}, Nn = "transition", nr = "animation", zi = Symbol("_vtc"), En = (e, { slots: t }) => qn(Eg, $d(e), t);
En.displayName = "Transition";
const Ad = {
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
}, b0 = En.props = /* @__PURE__ */ Ue(
  {},
  gd,
  Ad
), Qn = (e, t = []) => {
  xe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Du = (e) => e ? xe(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function $d(e) {
  const t = {};
  for (const L in e)
    L in Ad || (t[L] = e[L]);
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
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: d = `${n}-leave-active`,
    leaveToClass: h = `${n}-leave-to`
  } = e, v = w0(r), m = v && v[0], p = v && v[1], {
    onBeforeEnter: y,
    onEnter: w,
    onEnterCancelled: x,
    onLeave: b,
    onLeaveCancelled: _,
    onBeforeAppear: E = y,
    onAppear: S = w,
    onAppearCancelled: I = x
  } = t, $ = (L, N, C) => {
    Rn(L, N ? c : s), Rn(L, N ? u : l), C && C();
  }, R = (L, N) => {
    L._isLeaving = !1, Rn(L, f), Rn(L, h), Rn(L, d), N && N();
  }, H = (L) => (N, C) => {
    const B = L ? S : w, M = () => $(N, L, C);
    Qn(B, [N, M]), Hu(() => {
      Rn(N, L ? a : o), wn(N, L ? c : s), Du(B) || zu(N, i, m, M);
    });
  };
  return Ue(t, {
    onBeforeEnter(L) {
      Qn(y, [L]), wn(L, o), wn(L, l);
    },
    onBeforeAppear(L) {
      Qn(E, [L]), wn(L, a), wn(L, u);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(L, N) {
      L._isLeaving = !0;
      const C = () => R(L, N);
      wn(L, f), Rd(), wn(L, d), Hu(() => {
        L._isLeaving && (Rn(L, f), wn(L, h), Du(b) || zu(L, i, p, C));
      }), Qn(b, [L, C]);
    },
    onEnterCancelled(L) {
      $(L, !1), Qn(x, [L]);
    },
    onAppearCancelled(L) {
      $(L, !0), Qn(I, [L]);
    },
    onLeaveCancelled(L) {
      R(L), Qn(_, [L]);
    }
  });
}
function w0(e) {
  if (e == null)
    return null;
  if (Oe(e))
    return [Yl(e.enter), Yl(e.leave)];
  {
    const t = Yl(e);
    return [t, t];
  }
}
function Yl(e) {
  return vs(e);
}
function wn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[zi] || (e[zi] = /* @__PURE__ */ new Set())).add(t);
}
function Rn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[zi];
  n && (n.delete(t), n.size || (e[zi] = void 0));
}
function Hu(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let x0 = 0;
function zu(e, t, n, i) {
  const r = e._endId = ++x0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = Nd(e, t);
  if (!l)
    return i();
  const u = l + "end";
  let c = 0;
  const f = () => {
    e.removeEventListener(u, d), o();
  }, d = (h) => {
    h.target === e && ++c >= a && f();
  };
  setTimeout(() => {
    c < a && f();
  }, s + 1), e.addEventListener(u, d);
}
function Nd(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${Nn}Delay`), o = i(`${Nn}Duration`), l = ju(r, o), s = i(`${nr}Delay`), a = i(`${nr}Duration`), u = ju(s, a);
  let c = null, f = 0, d = 0;
  t === Nn ? l > 0 && (c = Nn, f = l, d = o.length) : t === nr ? u > 0 && (c = nr, f = u, d = a.length) : (f = Math.max(l, u), c = f > 0 ? l > u ? Nn : nr : null, d = c ? c === Nn ? o.length : a.length : 0);
  const h = c === Nn && /\b(transform|all)(,|$)/.test(
    i(`${Nn}Property`).toString()
  );
  return {
    type: c,
    timeout: f,
    propCount: d,
    hasTransform: h
  };
}
function ju(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => Gu(n) + Gu(e[i])));
}
function Gu(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Rd() {
  return document.body.offsetHeight;
}
function _0(e, t, n) {
  const i = e[zi];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Do = Symbol("_vod"), Od = Symbol("_vsh"), Bt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Do] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ir(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), ir(e, !0), i.enter(e)) : i.leave(e, () => {
      ir(e, !1);
    }) : ir(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ir(e, t);
  }
};
function ir(e, t) {
  e.style.display = t ? e[Do] : "none", e[Od] = !t;
}
const S0 = Symbol(""), C0 = /(^|;)\s*display\s*:/;
function k0(e, t, n) {
  const i = e.style, r = We(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (We(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && Co(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && Co(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), Co(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[S0];
      l && (n += ";" + l), i.cssText = n, o = C0.test(n);
    }
  } else t && e.removeAttribute("style");
  Do in e && (e[Do] = o ? i.display : "", e[Od] && (i.display = "none"));
}
const Uu = /\s*!important$/;
function Co(e, t, n) {
  if (xe(n))
    n.forEach((i) => Co(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = E0(e, t);
    Uu.test(n) ? e.setProperty(
      Wt(i),
      n.replace(Uu, ""),
      "important"
    ) : e[i] = n;
  }
}
const Wu = ["Webkit", "Moz", "ms"], Kl = {};
function E0(e, t) {
  const n = Kl[t];
  if (n)
    return n;
  let i = dt(t);
  if (i !== "filter" && i in e)
    return Kl[t] = i;
  i = In(i);
  for (let r = 0; r < Wu.length; r++) {
    const o = Wu[r] + i;
    if (o in e)
      return Kl[t] = o;
  }
  return t;
}
const qu = "http://www.w3.org/1999/xlink";
function V0(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(qu, t.slice(6, t.length)) : e.setAttributeNS(qu, t, n);
  else {
    const o = Mm(t);
    n == null || o && !Ff(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function L0(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = Ff(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function I0(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function P0(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Yu = Symbol("_vei");
function T0(e, t, n, i, r = null) {
  const o = e[Yu] || (e[Yu] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = M0(t);
    if (i) {
      const u = o[t] = N0(i, r);
      I0(e, s, u, a);
    } else l && (P0(e, s, l, a), o[t] = void 0);
  }
}
const Ku = /(?:Once|Passive|Capture)$/;
function M0(e) {
  let t;
  if (Ku.test(e)) {
    t = {};
    let i;
    for (; i = e.match(Ku); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Wt(e.slice(2)), t];
}
let Xl = 0;
const A0 = /* @__PURE__ */ Promise.resolve(), $0 = () => Xl || (A0.then(() => Xl = 0), Xl = Date.now());
function N0(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Rt(
      R0(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = $0(), n;
}
function R0(e, t) {
  if (xe(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Xu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, O0 = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? _0(e, i, u) : t === "style" ? k0(e, n, i) : al(t) ? oa(t) || T0(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : B0(e, t, i, u)) ? L0(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), V0(e, t, i, u));
};
function B0(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Xu(t) && Ee(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Xu(t) && We(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function F0(e, t) {
  const n = /* @__PURE__ */ Ki(e);
  class i extends La {
    constructor(o) {
      super(n, o, t);
    }
  }
  return i.def = n, i;
}
const D0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class La extends D0 {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), qe(() => {
      this._connected || (Qu(null, this.shadowRoot), this._instance = null);
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
      if (o && !xe(o))
        for (const a in o) {
          const u = o[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = vs(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[dt(a)] = !0);
        }
      this._numberProps = s, r && this._resolveProps(i), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = xe(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && i.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of i.map(dt))
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
    const i = dt(t);
    this._numberProps && this._numberProps[i] && (n = vs(n)), this._setProp(i, n, !1);
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
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), i && (n === !0 ? this.setAttribute(Wt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Wt(t), n + "") : n || this.removeAttribute(Wt(t))));
  }
  _update() {
    Qu(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = g(this._def, Ue({}, this._props));
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
        i(o, l), Wt(o) !== o && i(Wt(o), l);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof La) {
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
const Bd = /* @__PURE__ */ new WeakMap(), Fd = /* @__PURE__ */ new WeakMap(), Ho = Symbol("_moveCb"), Zu = Symbol("_enterCb"), Dd = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ue({}, b0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Va(), i = md();
    let r, o;
    return bd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!U0(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(z0), r.forEach(j0);
      const s = r.filter(G0);
      Rd(), s.forEach((a) => {
        const u = a.el, c = u.style;
        wn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const f = u[Ho] = (d) => {
          d && d.target !== u || (!d || /transform$/.test(d.propertyName)) && (u.removeEventListener("transitionend", f), u[Ho] = null, Rn(u, l));
        };
        u.addEventListener("transitionend", f);
      });
    }), () => {
      const l = _e(e), s = $d(l);
      let a = l.tag || Ve;
      r = o, o = t.default ? _a(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && Cr(
          c,
          Sr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          Cr(
            c,
            Sr(c, s, i, n)
          ), Bd.set(c, c.el.getBoundingClientRect());
        }
      return g(a, null, o);
    };
  }
}, H0 = (e) => delete e.mode;
Dd.props;
const Hd = Dd;
function z0(e) {
  const t = e.el;
  t[Ho] && t[Ho](), t[Zu] && t[Zu]();
}
function j0(e) {
  Fd.set(e, e.el.getBoundingClientRect());
}
function G0(e) {
  const t = Bd.get(e), n = Fd.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function U0(e, t, n) {
  const i = e.cloneNode(), r = e[zi];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = Nd(i);
  return o.removeChild(i), l;
}
const W0 = /* @__PURE__ */ Ue({ patchProp: O0 }, p0);
let Ju;
function q0() {
  return Ju || (Ju = Kg(W0));
}
const Qu = (...e) => {
  q0().render(...e);
};
var Y0 = { value: () => {
} };
function jr() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new ko(n);
}
function ko(e) {
  this._ = e;
}
function K0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
ko.prototype = jr.prototype = {
  constructor: ko,
  on: function(e, t) {
    var n = this._, i = K0(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = X0(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = ec(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = ec(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new ko(e);
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
function X0(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function ec(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = Y0, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Vs = "http://www.w3.org/1999/xhtml";
const tc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Vs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function xl(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), tc.hasOwnProperty(t) ? { space: tc[t], local: e } : e;
}
function Z0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Vs && t.documentElement.namespaceURI === Vs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function J0(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function zd(e) {
  var t = xl(e);
  return (t.local ? J0 : Z0)(t);
}
function Q0() {
}
function Ia(e) {
  return e == null ? Q0 : function() {
    return this.querySelector(e);
  };
}
function ey(e) {
  typeof e != "function" && (e = Ia(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new Lt(i, this._parents);
}
function ty(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ny() {
  return [];
}
function jd(e) {
  return e == null ? ny : function() {
    return this.querySelectorAll(e);
  };
}
function iy(e) {
  return function() {
    return ty(e.apply(this, arguments));
  };
}
function ry(e) {
  typeof e == "function" ? e = iy(e) : e = jd(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new Lt(i, r);
}
function Gd(e) {
  return function() {
    return this.matches(e);
  };
}
function Ud(e) {
  return function(t) {
    return t.matches(e);
  };
}
var oy = Array.prototype.find;
function ly(e) {
  return function() {
    return oy.call(this.children, e);
  };
}
function sy() {
  return this.firstElementChild;
}
function ay(e) {
  return this.select(e == null ? sy : ly(typeof e == "function" ? e : Ud(e)));
}
var uy = Array.prototype.filter;
function cy() {
  return Array.from(this.children);
}
function fy(e) {
  return function() {
    return uy.call(this.children, e);
  };
}
function dy(e) {
  return this.selectAll(e == null ? cy : fy(typeof e == "function" ? e : Ud(e)));
}
function hy(e) {
  typeof e != "function" && (e = Gd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Lt(i, this._parents);
}
function Wd(e) {
  return new Array(e.length);
}
function vy() {
  return new Lt(this._enter || this._groups.map(Wd), this._parents);
}
function zo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
zo.prototype = {
  constructor: zo,
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
function my(e) {
  return function() {
    return e;
  };
}
function gy(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new zo(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function yy(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, f = o.length, d = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (d[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < f; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new zo(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(d[s]) === a && (r[s] = a);
}
function py(e) {
  return e.__data__;
}
function by(e, t) {
  if (!arguments.length) return Array.from(this, py);
  var n = t ? yy : gy, i = this._parents, r = this._groups;
  typeof e != "function" && (e = my(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], f = r[u], d = f.length, h = wy(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), p = l[u] = new Array(v), y = a[u] = new Array(d);
    n(c, f, m, p, y, h, t);
    for (var w = 0, x = 0, b, _; w < v; ++w)
      if (b = m[w]) {
        for (w >= x && (x = w + 1); !(_ = p[x]) && ++x < v; ) ;
        b._next = _ || null;
      }
  }
  return l = new Lt(l, i), l._enter = s, l._exit = a, l;
}
function wy(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function xy() {
  return new Lt(this._exit || this._groups.map(Wd), this._parents);
}
function _y(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function Sy(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], f = u.length, d = s[a] = new Array(f), h, v = 0; v < f; ++v)
      (h = u[v] || c[v]) && (d[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new Lt(s, this._parents);
}
function Cy() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function ky(e) {
  e || (e = Ey);
  function t(f, d) {
    return f && d ? e(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new Lt(r, this._parents).order();
}
function Ey(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Vy() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ly() {
  return Array.from(this);
}
function Iy() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function Py() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ty() {
  return !this.node();
}
function My(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function Ay(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function $y(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ny(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Ry(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Oy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function By(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Fy(e, t) {
  var n = xl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? $y : Ay : typeof t == "function" ? n.local ? By : Oy : n.local ? Ry : Ny)(n, t));
}
function qd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Dy(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Hy(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function zy(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function jy(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Dy : typeof t == "function" ? zy : Hy)(e, t, n ?? "")) : ji(this.node(), e);
}
function ji(e, t) {
  return e.style.getPropertyValue(t) || qd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Gy(e) {
  return function() {
    delete this[e];
  };
}
function Uy(e, t) {
  return function() {
    this[e] = t;
  };
}
function Wy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function qy(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Gy : typeof t == "function" ? Wy : Uy)(e, t)) : this.node()[e];
}
function Yd(e) {
  return e.trim().split(/^|\s+/);
}
function Pa(e) {
  return e.classList || new Kd(e);
}
function Kd(e) {
  this._node = e, this._names = Yd(e.getAttribute("class") || "");
}
Kd.prototype = {
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
function Xd(e, t) {
  for (var n = Pa(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function Zd(e, t) {
  for (var n = Pa(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function Yy(e) {
  return function() {
    Xd(this, e);
  };
}
function Ky(e) {
  return function() {
    Zd(this, e);
  };
}
function Xy(e, t) {
  return function() {
    (t.apply(this, arguments) ? Xd : Zd)(this, e);
  };
}
function Zy(e, t) {
  var n = Yd(e + "");
  if (arguments.length < 2) {
    for (var i = Pa(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Xy : t ? Yy : Ky)(n, t));
}
function Jy() {
  this.textContent = "";
}
function Qy(e) {
  return function() {
    this.textContent = e;
  };
}
function ep(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function tp(e) {
  return arguments.length ? this.each(e == null ? Jy : (typeof e == "function" ? ep : Qy)(e)) : this.node().textContent;
}
function np() {
  this.innerHTML = "";
}
function ip(e) {
  return function() {
    this.innerHTML = e;
  };
}
function rp(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function op(e) {
  return arguments.length ? this.each(e == null ? np : (typeof e == "function" ? rp : ip)(e)) : this.node().innerHTML;
}
function lp() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function sp() {
  return this.each(lp);
}
function ap() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function up() {
  return this.each(ap);
}
function cp(e) {
  var t = typeof e == "function" ? e : zd(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function fp() {
  return null;
}
function dp(e, t) {
  var n = typeof e == "function" ? e : zd(e), i = t == null ? fp : typeof t == "function" ? t : Ia(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function hp() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function vp() {
  return this.each(hp);
}
function mp() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function gp() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function yp(e) {
  return this.select(e ? gp : mp);
}
function pp(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function bp(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function wp(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function xp(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function _p(e, t, n) {
  return function() {
    var i = this.__on, r, o = bp(t);
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
function Sp(e, t, n) {
  var i = wp(e + ""), r, o = i.length, l;
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
  for (s = t ? _p : xp, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function Jd(e, t, n) {
  var i = qd(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Cp(e, t) {
  return function() {
    return Jd(this, e, t);
  };
}
function kp(e, t) {
  return function() {
    return Jd(this, e, t.apply(this, arguments));
  };
}
function Ep(e, t) {
  return this.each((typeof t == "function" ? kp : Cp)(e, t));
}
function* Vp() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var Qd = [null];
function Lt(e, t) {
  this._groups = e, this._parents = t;
}
function Gr() {
  return new Lt([[document.documentElement]], Qd);
}
function Lp() {
  return this;
}
Lt.prototype = Gr.prototype = {
  constructor: Lt,
  select: ey,
  selectAll: ry,
  selectChild: ay,
  selectChildren: dy,
  filter: hy,
  data: by,
  enter: vy,
  exit: xy,
  join: _y,
  merge: Sy,
  selection: Lp,
  order: Cy,
  sort: ky,
  call: Vy,
  nodes: Ly,
  node: Iy,
  size: Py,
  empty: Ty,
  each: My,
  attr: Fy,
  style: jy,
  property: qy,
  classed: Zy,
  text: tp,
  html: op,
  raise: sp,
  lower: up,
  append: cp,
  insert: dp,
  remove: vp,
  clone: yp,
  datum: pp,
  on: Sp,
  dispatch: Ep,
  [Symbol.iterator]: Vp
};
function qt(e) {
  return typeof e == "string" ? new Lt([[document.querySelector(e)]], [document.documentElement]) : new Lt([[e]], Qd);
}
function eh(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Mt(e, t) {
  if (e = eh(e), t === void 0 && (t = e.currentTarget), t) {
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
function Ip(e, t) {
  return e.target && (e = eh(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Mt(n, t));
}
const Pp = { passive: !1 }, Er = { capture: !0, passive: !1 };
function Zl(e) {
  e.stopImmediatePropagation();
}
function Oi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function th(e) {
  var t = e.document.documentElement, n = qt(e).on("dragstart.drag", Oi, Er);
  "onselectstart" in t ? n.on("selectstart.drag", Oi, Er) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function nh(e, t) {
  var n = e.document.documentElement, i = qt(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Oi, Er), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const uo = (e) => () => e;
function Ls(e, {
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
Ls.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Tp(e) {
  return !e.ctrlKey && !e.button;
}
function Mp() {
  return this.parentNode;
}
function Ap(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function $p() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Np() {
  var e = Tp, t = Mp, n = Ap, i = $p, r = {}, o = jr("start", "drag", "end"), l = 0, s, a, u, c, f = 0;
  function d(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", p).on("touchmove.drag", y, Pp).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, _) {
    if (!(c || !e.call(this, b, _))) {
      var E = x(this, t.call(this, b, _), b, _, "mouse");
      E && (qt(b.view).on("mousemove.drag", v, Er).on("mouseup.drag", m, Er), th(b.view), Zl(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if (Oi(b), !u) {
      var _ = b.clientX - s, E = b.clientY - a;
      u = _ * _ + E * E > f;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    qt(b.view).on("mousemove.drag mouseup.drag", null), nh(b.view, u), Oi(b), r.mouse("end", b);
  }
  function p(b, _) {
    if (e.call(this, b, _)) {
      var E = b.changedTouches, S = t.call(this, b, _), I = E.length, $, R;
      for ($ = 0; $ < I; ++$)
        (R = x(this, S, b, _, E[$].identifier, E[$])) && (Zl(b), R("start", b, E[$]));
    }
  }
  function y(b) {
    var _ = b.changedTouches, E = _.length, S, I;
    for (S = 0; S < E; ++S)
      (I = r[_[S].identifier]) && (Oi(b), I("drag", b, _[S]));
  }
  function w(b) {
    var _ = b.changedTouches, E = _.length, S, I;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), S = 0; S < E; ++S)
      (I = r[_[S].identifier]) && (Zl(b), I("end", b, _[S]));
  }
  function x(b, _, E, S, I, $) {
    var R = o.copy(), H = Mt($ || E, _), L, N, C;
    if ((C = n.call(b, new Ls("beforestart", {
      sourceEvent: E,
      target: d,
      identifier: I,
      active: l,
      x: H[0],
      y: H[1],
      dx: 0,
      dy: 0,
      dispatch: R
    }), S)) != null)
      return L = C.x - H[0] || 0, N = C.y - H[1] || 0, function B(M, z, A) {
        var F = H, O;
        switch (M) {
          case "start":
            r[I] = B, O = l++;
            break;
          case "end":
            delete r[I], --l;
          case "drag":
            H = Mt(A || z, _), O = l;
            break;
        }
        R.call(
          M,
          b,
          new Ls(M, {
            sourceEvent: z,
            subject: C,
            target: d,
            identifier: I,
            active: O,
            x: H[0] + L,
            y: H[1] + N,
            dx: H[0] - F[0],
            dy: H[1] - F[1],
            dispatch: R
          }),
          S
        );
      };
  }
  return d.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : uo(!!b), d) : e;
  }, d.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : uo(b), d) : t;
  }, d.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : uo(b), d) : n;
  }, d.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : uo(!!b), d) : i;
  }, d.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? d : b;
  }, d.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, d) : Math.sqrt(f);
  }, d;
}
function Ta(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function ih(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Ur() {
}
var Vr = 0.7, jo = 1 / Vr, Bi = "\\s*([+-]?\\d+)\\s*", Lr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Rp = /^#([0-9a-f]{3,8})$/, Op = new RegExp(`^rgb\\(${Bi},${Bi},${Bi}\\)$`), Bp = new RegExp(`^rgb\\(${hn},${hn},${hn}\\)$`), Fp = new RegExp(`^rgba\\(${Bi},${Bi},${Bi},${Lr}\\)$`), Dp = new RegExp(`^rgba\\(${hn},${hn},${hn},${Lr}\\)$`), Hp = new RegExp(`^hsl\\(${Lr},${hn},${hn}\\)$`), zp = new RegExp(`^hsla\\(${Lr},${hn},${hn},${Lr}\\)$`), nc = {
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
Ta(Ur, Ir, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ic,
  // Deprecated! Use color.formatHex.
  formatHex: ic,
  formatHex8: jp,
  formatHsl: Gp,
  formatRgb: rc,
  toString: rc
});
function ic() {
  return this.rgb().formatHex();
}
function jp() {
  return this.rgb().formatHex8();
}
function Gp() {
  return rh(this).formatHsl();
}
function rc() {
  return this.rgb().formatRgb();
}
function Ir(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Rp.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? oc(t) : n === 3 ? new yt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? co(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? co(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Op.exec(e)) ? new yt(t[1], t[2], t[3], 1) : (t = Bp.exec(e)) ? new yt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Fp.exec(e)) ? co(t[1], t[2], t[3], t[4]) : (t = Dp.exec(e)) ? co(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Hp.exec(e)) ? ac(t[1], t[2] / 100, t[3] / 100, 1) : (t = zp.exec(e)) ? ac(t[1], t[2] / 100, t[3] / 100, t[4]) : nc.hasOwnProperty(e) ? oc(nc[e]) : e === "transparent" ? new yt(NaN, NaN, NaN, 0) : null;
}
function oc(e) {
  return new yt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function co(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new yt(e, t, n, i);
}
function Up(e) {
  return e instanceof Ur || (e = Ir(e)), e ? (e = e.rgb(), new yt(e.r, e.g, e.b, e.opacity)) : new yt();
}
function Is(e, t, n, i) {
  return arguments.length === 1 ? Up(e) : new yt(e, t, n, i ?? 1);
}
function yt(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Ta(yt, Is, ih(Ur, {
  brighter(e) {
    return e = e == null ? jo : Math.pow(jo, e), new yt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vr : Math.pow(Vr, e), new yt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new yt(fi(this.r), fi(this.g), fi(this.b), Go(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: lc,
  // Deprecated! Use color.formatHex.
  formatHex: lc,
  formatHex8: Wp,
  formatRgb: sc,
  toString: sc
}));
function lc() {
  return `#${li(this.r)}${li(this.g)}${li(this.b)}`;
}
function Wp() {
  return `#${li(this.r)}${li(this.g)}${li(this.b)}${li((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function sc() {
  const e = Go(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${fi(this.r)}, ${fi(this.g)}, ${fi(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Go(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function fi(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function li(e) {
  return e = fi(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ac(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Yt(e, t, n, i);
}
function rh(e) {
  if (e instanceof Yt) return new Yt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ur || (e = Ir(e)), !e) return new Yt();
  if (e instanceof Yt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new Yt(l, s, a, e.opacity);
}
function qp(e, t, n, i) {
  return arguments.length === 1 ? rh(e) : new Yt(e, t, n, i ?? 1);
}
function Yt(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Ta(Yt, qp, ih(Ur, {
  brighter(e) {
    return e = e == null ? jo : Math.pow(jo, e), new Yt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Vr : Math.pow(Vr, e), new Yt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new yt(
      Jl(e >= 240 ? e - 240 : e + 120, r, i),
      Jl(e, r, i),
      Jl(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Yt(uc(this.h), fo(this.s), fo(this.l), Go(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Go(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${uc(this.h)}, ${fo(this.s) * 100}%, ${fo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function uc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function fo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Jl(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const oh = (e) => () => e;
function Yp(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Kp(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function Xp(e) {
  return (e = +e) == 1 ? lh : function(t, n) {
    return n - t ? Kp(t, n, e) : oh(isNaN(t) ? n : t);
  };
}
function lh(e, t) {
  var n = t - e;
  return n ? Yp(e, n) : oh(isNaN(e) ? t : e);
}
const cc = function e(t) {
  var n = Xp(t);
  function i(r, o) {
    var l = n((r = Is(r)).r, (o = Is(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = lh(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function Hn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Ps = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ql = new RegExp(Ps.source, "g");
function Zp(e) {
  return function() {
    return e;
  };
}
function Jp(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Qp(e, t) {
  var n = Ps.lastIndex = Ql.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = Ps.exec(e)) && (r = Ql.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: Hn(i, r) })), n = Ql.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? Jp(a[0].x) : Zp(t) : (t = a.length, function(u) {
    for (var c = 0, f; c < t; ++c) s[(f = a[c]).i] = f.x(u);
    return s.join("");
  });
}
var fc = 180 / Math.PI, Ts = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function sh(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * fc,
    skewX: Math.atan(a) * fc,
    scaleX: l,
    scaleY: s
  };
}
var ho;
function e1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ts : sh(t.a, t.b, t.c, t.d, t.e, t.f);
}
function t1(e) {
  return e == null || (ho || (ho = document.createElementNS("http://www.w3.org/2000/svg", "g")), ho.setAttribute("transform", e), !(e = ho.transform.baseVal.consolidate())) ? Ts : (e = e.matrix, sh(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ah(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, f, d, h, v) {
    if (u !== f || c !== d) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: Hn(u, f) }, { i: m - 2, x: Hn(c, d) });
    } else (f || d) && h.push("translate(" + f + t + d + n);
  }
  function l(u, c, f, d) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), d.push({ i: f.push(r(f) + "rotate(", null, i) - 2, x: Hn(u, c) })) : c && f.push(r(f) + "rotate(" + c + i);
  }
  function s(u, c, f, d) {
    u !== c ? d.push({ i: f.push(r(f) + "skewX(", null, i) - 2, x: Hn(u, c) }) : c && f.push(r(f) + "skewX(" + c + i);
  }
  function a(u, c, f, d, h, v) {
    if (u !== f || c !== d) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: Hn(u, f) }, { i: m - 2, x: Hn(c, d) });
    } else (f !== 1 || d !== 1) && h.push(r(h) + "scale(" + f + "," + d + ")");
  }
  return function(u, c) {
    var f = [], d = [];
    return u = e(u), c = e(c), o(u.translateX, u.translateY, c.translateX, c.translateY, f, d), l(u.rotate, c.rotate, f, d), s(u.skewX, c.skewX, f, d), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, d), u = c = null, function(h) {
      for (var v = -1, m = d.length, p; ++v < m; ) f[(p = d[v]).i] = p.x(h);
      return f.join("");
    };
  };
}
var n1 = ah(e1, "px, ", "px)", "deg)"), i1 = ah(t1, ", ", ")", ")"), r1 = 1e-12;
function dc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function o1(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function l1(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const s1 = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], f = l[1], d = l[2], h = c - s, v = f - a, m = h * h + v * v, p, y;
    if (m < r1)
      y = Math.log(d / u) / t, p = function(S) {
        return [
          s + S * h,
          a + S * v,
          u * Math.exp(t * S * y)
        ];
      };
    else {
      var w = Math.sqrt(m), x = (d * d - u * u + i * m) / (2 * u * n * w), b = (d * d - u * u - i * m) / (2 * d * n * w), _ = Math.log(Math.sqrt(x * x + 1) - x), E = Math.log(Math.sqrt(b * b + 1) - b);
      y = (E - _) / t, p = function(S) {
        var I = S * y, $ = dc(_), R = u / (n * w) * ($ * l1(t * I + _) - o1(_));
        return [
          s + R * h,
          a + R * v,
          u * $ / dc(t * I + _)
        ];
      };
    }
    return p.duration = y * 1e3 * t / Math.SQRT2, p;
  }
  return r.rho = function(o) {
    var l = Math.max(1e-3, +o), s = l * l, a = s * s;
    return e(l, s, a);
  }, r;
}(Math.SQRT2, 2, 4);
var Gi = 0, cr = 0, rr = 0, uh = 1e3, Uo, fr, Wo = 0, mi = 0, _l = 0, Pr = typeof performance == "object" && performance.now ? performance : Date, ch = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ma() {
  return mi || (ch(a1), mi = Pr.now() + _l);
}
function a1() {
  mi = 0;
}
function qo() {
  this._call = this._time = this._next = null;
}
qo.prototype = Aa.prototype = {
  constructor: qo,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ma() : +n) + (t == null ? 0 : +t), !this._next && fr !== this && (fr ? fr._next = this : Uo = this, fr = this), this._call = e, this._time = n, Ms();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ms());
  }
};
function Aa(e, t, n) {
  var i = new qo();
  return i.restart(e, t, n), i;
}
function u1() {
  Ma(), ++Gi;
  for (var e = Uo, t; e; )
    (t = mi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Gi;
}
function hc() {
  mi = (Wo = Pr.now()) + _l, Gi = cr = 0;
  try {
    u1();
  } finally {
    Gi = 0, f1(), mi = 0;
  }
}
function c1() {
  var e = Pr.now(), t = e - Wo;
  t > uh && (_l -= t, Wo = e);
}
function f1() {
  for (var e, t = Uo, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Uo = n);
  fr = e, Ms(i);
}
function Ms(e) {
  if (!Gi) {
    cr && (cr = clearTimeout(cr));
    var t = e - mi;
    t > 24 ? (e < 1 / 0 && (cr = setTimeout(hc, e - Pr.now() - _l)), rr && (rr = clearInterval(rr))) : (rr || (Wo = Pr.now(), rr = setInterval(c1, uh)), Gi = 1, ch(hc));
  }
}
function vc(e, t, n) {
  var i = new qo();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var d1 = jr("start", "end", "cancel", "interrupt"), h1 = [], fh = 0, mc = 1, As = 2, Eo = 3, gc = 4, $s = 5, Vo = 6;
function Sl(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  v1(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: d1,
    tween: h1,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: fh
  });
}
function $a(e, t) {
  var n = rn(e, t);
  if (n.state > fh) throw new Error("too late; already scheduled");
  return n;
}
function gn(e, t) {
  var n = rn(e, t);
  if (n.state > Eo) throw new Error("too late; already running");
  return n;
}
function rn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function v1(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = Aa(o, 0, n.time);
  function o(u) {
    n.state = mc, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, f, d, h;
    if (n.state !== mc) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === Eo) return vc(l);
        h.state === gc ? (h.state = Vo, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = Vo, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (vc(function() {
      n.state === Eo && (n.state = gc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = As, n.on.call("start", e, e.__data__, n.index, n.group), n.state === As) {
      for (n.state = Eo, r = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++f] = h);
      r.length = f + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = $s, 1), f = -1, d = r.length; ++f < d; )
      r[f].call(e, c);
    n.state === $s && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Vo, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function Lo(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > As && i.state < $s, i.state = Vo, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function m1(e) {
  return this.each(function() {
    Lo(this, e);
  });
}
function g1(e, t) {
  var n, i;
  return function() {
    var r = gn(this, e), o = r.tween;
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
function y1(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = gn(this, e), l = o.tween;
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
function p1(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = rn(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? g1 : y1)(n, e, t));
}
function Na(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = gn(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return rn(r, i).value[t];
  };
}
function dh(e, t) {
  var n;
  return (typeof t == "number" ? Hn : t instanceof Ir ? cc : (n = Ir(t)) ? (t = n, cc) : Qp)(e, t);
}
function b1(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function w1(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function x1(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function _1(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function S1(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function C1(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function k1(e, t) {
  var n = xl(e), i = n === "transform" ? i1 : dh;
  return this.attrTween(e, typeof t == "function" ? (n.local ? C1 : S1)(n, i, Na(this, "attr." + e, t)) : t == null ? (n.local ? w1 : b1)(n) : (n.local ? _1 : x1)(n, i, t));
}
function E1(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function V1(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function L1(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && V1(e, o)), n;
  }
  return r._value = t, r;
}
function I1(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && E1(e, o)), n;
  }
  return r._value = t, r;
}
function P1(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = xl(e);
  return this.tween(n, (i.local ? L1 : I1)(i, t));
}
function T1(e, t) {
  return function() {
    $a(this, e).delay = +t.apply(this, arguments);
  };
}
function M1(e, t) {
  return t = +t, function() {
    $a(this, e).delay = t;
  };
}
function A1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? T1 : M1)(t, e)) : rn(this.node(), t).delay;
}
function $1(e, t) {
  return function() {
    gn(this, e).duration = +t.apply(this, arguments);
  };
}
function N1(e, t) {
  return t = +t, function() {
    gn(this, e).duration = t;
  };
}
function R1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? $1 : N1)(t, e)) : rn(this.node(), t).duration;
}
function O1(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    gn(this, e).ease = t;
  };
}
function B1(e) {
  var t = this._id;
  return arguments.length ? this.each(O1(t, e)) : rn(this.node(), t).ease;
}
function F1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    gn(this, e).ease = n;
  };
}
function D1(e) {
  if (typeof e != "function") throw new Error();
  return this.each(F1(this._id, e));
}
function H1(e) {
  typeof e != "function" && (e = Gd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Vn(i, this._parents, this._name, this._id);
}
function z1(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, f = l[s] = new Array(c), d, h = 0; h < c; ++h)
      (d = a[h] || u[h]) && (f[h] = d);
  for (; s < i; ++s)
    l[s] = t[s];
  return new Vn(l, this._parents, this._name, this._id);
}
function j1(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function G1(e, t, n) {
  var i, r, o = j1(t) ? $a : gn;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function U1(e, t) {
  var n = this._id;
  return arguments.length < 2 ? rn(this.node(), n).on.on(e) : this.each(G1(n, e, t));
}
function W1(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function q1() {
  return this.on("end.remove", W1(this._id));
}
function Y1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ia(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, f, d = 0; d < a; ++d)
      (c = s[d]) && (f = e.call(c, c.__data__, d, s)) && ("__data__" in c && (f.__data__ = c.__data__), u[d] = f, Sl(u[d], t, n, d, u, rn(c, n)));
  return new Vn(o, this._parents, t, n);
}
function K1(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = jd(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var d = e.call(c, c.__data__, f, a), h, v = rn(c, n), m = 0, p = d.length; m < p; ++m)
          (h = d[m]) && Sl(h, t, n, m, d, v);
        o.push(d), l.push(c);
      }
  return new Vn(o, l, t, n);
}
var X1 = Gr.prototype.constructor;
function Z1() {
  return new X1(this._groups, this._parents);
}
function J1(e, t) {
  var n, i, r;
  return function() {
    var o = ji(this, e), l = (this.style.removeProperty(e), ji(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function hh(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Q1(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = ji(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function eb(e, t, n) {
  var i, r, o;
  return function() {
    var l = ji(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), ji(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function tb(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = gn(this, e), u = a.on, c = a.value[o] == null ? s || (s = hh(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function nb(e, t, n) {
  var i = (e += "") == "transform" ? n1 : dh;
  return t == null ? this.styleTween(e, J1(e, i)).on("end.style." + e, hh(e)) : typeof t == "function" ? this.styleTween(e, eb(e, i, Na(this, "style." + e, t))).each(tb(this._id, e)) : this.styleTween(e, Q1(e, i, t), n).on("end.style." + e, null);
}
function ib(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function rb(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && ib(e, l, n)), i;
  }
  return o._value = t, o;
}
function ob(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, rb(e, t, n ?? ""));
}
function lb(e) {
  return function() {
    this.textContent = e;
  };
}
function sb(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ab(e) {
  return this.tween("text", typeof e == "function" ? sb(Na(this, "text", e)) : lb(e == null ? "" : e + ""));
}
function ub(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function cb(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && ub(r)), t;
  }
  return i._value = e, i;
}
function fb(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, cb(e));
}
function db() {
  for (var e = this._name, t = this._id, n = vh(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = rn(a, t);
        Sl(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Vn(i, this._parents, e, n);
}
function hb() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = gn(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var vb = 0;
function Vn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function vh() {
  return ++vb;
}
var bn = Gr.prototype;
Vn.prototype = {
  constructor: Vn,
  select: Y1,
  selectAll: K1,
  selectChild: bn.selectChild,
  selectChildren: bn.selectChildren,
  filter: H1,
  merge: z1,
  selection: Z1,
  transition: db,
  call: bn.call,
  nodes: bn.nodes,
  node: bn.node,
  size: bn.size,
  empty: bn.empty,
  each: bn.each,
  on: U1,
  attr: k1,
  attrTween: P1,
  style: nb,
  styleTween: ob,
  text: ab,
  textTween: fb,
  remove: q1,
  tween: p1,
  delay: A1,
  duration: R1,
  ease: B1,
  easeVarying: D1,
  end: hb,
  [Symbol.iterator]: bn[Symbol.iterator]
};
function mb(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var gb = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: mb
};
function yb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function pb(e) {
  var t, n;
  e instanceof Vn ? (t = e._id, e = e._name) : (t = vh(), (n = gb).time = Ma(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && Sl(a, e, t, u, l, n || yb(a, t));
  return new Vn(i, this._parents, e, t);
}
Gr.prototype.interrupt = m1;
Gr.prototype.transition = pb;
const Ns = Math.PI, Rs = 2 * Ns, ti = 1e-6, bb = Rs - ti;
function mh(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function wb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return mh;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class xb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? mh : wb(t);
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
    let l = this._x1, s = this._y1, a = i - t, u = r - n, c = l - t, f = s - n, d = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (d > ti) if (!(Math.abs(f * a - u * c) > ti) || !o)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = i - l, v = r - s, m = a * a + u * u, p = h * h + v * v, y = Math.sqrt(m), w = Math.sqrt(d), x = o * Math.tan((Ns - Math.acos((m + d - p) / (2 * y * w))) / 2), b = x / w, _ = x / y;
      Math.abs(b - 1) > ti && this._append`L${t + b * c},${n + b * f}`, this._append`A${o},${o},0,0,${+(f * h > c * v)},${this._x1 = t + _ * a},${this._y1 = n + _ * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, f = 1 ^ l, d = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > ti || Math.abs(this._y1 - c) > ti) && this._append`L${u},${c}`, i && (d < 0 && (d = d % Rs + Rs), d > bb ? this._append`A${i},${i},0,1,${f},${t - s},${n - a}A${i},${i},0,1,${f},${this._x1 = u},${this._y1 = c}` : d > ti && this._append`A${i},${i},0,${+(d >= Ns)},${f},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function _b(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return gh(this.cover(t, n), t, n, e);
}
function gh(e, t, n, i) {
  if (isNaN(t) || isNaN(n)) return e;
  var r, o = e._root, l = { data: i }, s = e._x0, a = e._y0, u = e._x1, c = e._y1, f, d, h, v, m, p, y, w;
  if (!o) return e._root = l, e;
  for (; o.length; )
    if ((m = t >= (f = (s + u) / 2)) ? s = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d, r = o, !(o = o[y = p << 1 | m])) return r[y] = l, e;
  if (h = +e._x.call(null, o.data), v = +e._y.call(null, o.data), t === h && n === v) return l.next = o, r ? r[y] = l : e._root = l, e;
  do
    r = r ? r[y] = new Array(4) : e._root = new Array(4), (m = t >= (f = (s + u) / 2)) ? s = f : u = f, (p = n >= (d = (a + c) / 2)) ? a = d : c = d;
  while ((y = p << 1 | m) === (w = (v >= d) << 1 | h >= f));
  return r[w] = o, r[y] = l, e;
}
function Sb(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > f && (f = o));
  if (a > c || u > f) return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < i; ++n)
    gh(this, l[n], s[n], e[n]);
  return this;
}
function Cb(e, t) {
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
function kb() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function Eb(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function ut(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function Vb(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, f = this._y1, d = [], h = this._root, v, m;
  for (h && d.push(new ut(h, r, o, c, f)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, f = t + n, n *= n); v = d.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > f || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var p = (l + a) / 2, y = (s + u) / 2;
        d.push(
          new ut(h[3], p, y, a, u),
          new ut(h[2], l, y, p, u),
          new ut(h[1], p, s, a, y),
          new ut(h[0], l, s, p, y)
        ), (m = (t >= y) << 1 | e >= p) && (v = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - m], d[d.length - 1 - m] = v);
      } else {
        var w = e - +this._x.call(null, h.data), x = t - +this._y.call(null, h.data), b = w * w + x * x;
        if (b < n) {
          var _ = Math.sqrt(n = b);
          r = e - _, o = t - _, c = e + _, f = t + _, i = h.data;
        }
      }
  return i;
}
function Lb(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(f = +this._y.call(null, e))) return this;
  var t, n = this._root, i, r, o, l = this._x0, s = this._y0, a = this._x1, u = this._y1, c, f, d, h, v, m, p, y;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((v = c >= (d = (l + a) / 2)) ? l = d : a = d, (m = f >= (h = (s + u) / 2)) ? s = h : u = h, t = n, !(n = n[p = m << 1 | v])) return this;
    if (!n.length) break;
    (t[p + 1 & 3] || t[p + 2 & 3] || t[p + 3 & 3]) && (i = t, y = p);
  }
  for (; n.data !== e; ) if (r = n, !(n = n.next)) return this;
  return (o = n.next) && delete n.next, r ? (o ? r.next = o : delete r.next, this) : t ? (o ? t[p] = o : delete t[p], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (i ? i[y] = n : this._root = n), this) : (this._root = o, this);
}
function Ib(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Pb() {
  return this._root;
}
function Tb() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Mb(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new ut(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new ut(r, u, c, s, a)), (r = i[2]) && t.push(new ut(r, o, c, u, a)), (r = i[1]) && t.push(new ut(r, u, l, s, c)), (r = i[0]) && t.push(new ut(r, o, l, u, c));
    }
  return this;
}
function Ab(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new ut(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, f = (s + u) / 2;
      (o = r[0]) && t.push(new ut(o, l, s, c, f)), (o = r[1]) && t.push(new ut(o, c, s, a, f)), (o = r[2]) && t.push(new ut(o, l, f, c, u)), (o = r[3]) && t.push(new ut(o, c, f, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function $b(e) {
  return e[0];
}
function Nb(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Rb(e) {
  return e[1];
}
function Ob(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ra(e, t, n) {
  var i = new Oa(t ?? $b, n ?? Rb, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Oa(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function yc(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var vt = Ra.prototype = Oa.prototype;
vt.copy = function() {
  var e = new Oa(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = yc(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = yc(i));
  return e;
};
vt.add = _b;
vt.addAll = Sb;
vt.cover = Cb;
vt.data = kb;
vt.extent = Eb;
vt.find = Vb;
vt.remove = Lb;
vt.removeAll = Ib;
vt.root = Pb;
vt.size = Tb;
vt.visit = Mb;
vt.visitAfter = Ab;
vt.x = Nb;
vt.y = Ob;
function ft(e) {
  return function() {
    return e;
  };
}
function zn(e) {
  return (e() - 0.5) * 1e-6;
}
function Bb(e) {
  return e.x + e.vx;
}
function Fb(e) {
  return e.y + e.vy;
}
function Db(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = ft(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, f, d, h, v, m, p, y = 0; y < o; ++y)
      for (f = Ra(t, Bb, Fb).visitAfter(s), u = 0; u < c; ++u)
        d = t[u], m = n[d.index], p = m * m, h = d.x + d.vx, v = d.y + d.vy, f.visit(w);
    function w(x, b, _, E, S) {
      var I = x.data, $ = x.r, R = m + $;
      if (I) {
        if (I.index > d.index) {
          var H = h - I.x - I.vx, L = v - I.y - I.vy, N = H * H + L * L;
          N < R * R && (H === 0 && (H = zn(i), N += H * H), L === 0 && (L = zn(i), N += L * L), N = (R - (N = Math.sqrt(N))) / N * r, d.vx += (H *= N) * (R = ($ *= $) / (p + $)), d.vy += (L *= N) * R, I.vx -= H * (R = 1 - R), I.vy -= L * R);
        }
        return;
      }
      return b > h + R || E < h - R || _ > v + R || S < v - R;
    }
  }
  function s(u) {
    if (u.data) return u.r = n[u.data.index];
    for (var c = u.r = 0; c < 4; ++c)
      u[c] && u[c].r > u.r && (u.r = u[c].r);
  }
  function a() {
    if (t) {
      var u, c = t.length, f;
      for (n = new Array(c), u = 0; u < c; ++u) f = t[u], n[f.index] = +e(f, u, t);
    }
  }
  return l.initialize = function(u, c) {
    t = u, i = c, a();
  }, l.iterations = function(u) {
    return arguments.length ? (o = +u, l) : o;
  }, l.strength = function(u) {
    return arguments.length ? (r = +u, l) : r;
  }, l.radius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : ft(+u), a(), l) : e;
  }, l;
}
function Hb(e) {
  return e.index;
}
function pc(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function zb(e) {
  var t = Hb, n = f, i, r = ft(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function f(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function d(p) {
    for (var y = 0, w = e.length; y < c; ++y)
      for (var x = 0, b, _, E, S, I, $, R; x < w; ++x)
        b = e[x], _ = b.source, E = b.target, S = E.x + E.vx - _.x - _.vx || zn(u), I = E.y + E.vy - _.y - _.vy || zn(u), $ = Math.sqrt(S * S + I * I), $ = ($ - o[x]) / $ * p * i[x], S *= $, I *= $, E.vx -= S * (R = a[x]), E.vy -= I * R, _.vx += S * (R = 1 - R), _.vy += I * R;
  }
  function h() {
    if (l) {
      var p, y = l.length, w = e.length, x = new Map(l.map((_, E) => [t(_, E, l), _])), b;
      for (p = 0, s = new Array(y); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = pc(x, b.source)), typeof b.target != "object" && (b.target = pc(x, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
      for (p = 0, a = new Array(w); p < w; ++p)
        b = e[p], a[p] = s[b.source.index] / (s[b.source.index] + s[b.target.index]);
      i = new Array(w), v(), o = new Array(w), m();
    }
  }
  function v() {
    if (l)
      for (var p = 0, y = e.length; p < y; ++p)
        i[p] = +n(e[p], p, e);
  }
  function m() {
    if (l)
      for (var p = 0, y = e.length; p < y; ++p)
        o[p] = +r(e[p], p, e);
  }
  return d.initialize = function(p, y) {
    l = p, u = y, h();
  }, d.links = function(p) {
    return arguments.length ? (e = p, h(), d) : e;
  }, d.id = function(p) {
    return arguments.length ? (t = p, d) : t;
  }, d.iterations = function(p) {
    return arguments.length ? (c = +p, d) : c;
  }, d.strength = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : ft(+p), v(), d) : n;
  }, d.distance = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : ft(+p), m(), d) : r;
  }, d;
}
const jb = 1664525, Gb = 1013904223, bc = 4294967296;
function Ub() {
  let e = 1;
  return () => (e = (jb * e + Gb) % bc) / bc;
}
function Wb(e) {
  return e.x;
}
function qb(e) {
  return e.y;
}
var Yb = 10, Kb = Math.PI * (3 - Math.sqrt(5));
function Xb(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Aa(f), u = jr("tick", "end"), c = Ub();
  e == null && (e = []);
  function f() {
    d(), u.call("tick", t), n < i && (a.stop(), u.call("end", t));
  }
  function d(m) {
    var p, y = e.length, w;
    m === void 0 && (m = 1);
    for (var x = 0; x < m; ++x)
      for (n += (o - n) * r, s.forEach(function(b) {
        b(n);
      }), p = 0; p < y; ++p)
        w = e[p], w.fx == null ? w.x += w.vx *= l : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= l : (w.y = w.fy, w.vy = 0);
    return t;
  }
  function h() {
    for (var m = 0, p = e.length, y; m < p; ++m) {
      if (y = e[m], y.index = m, y.fx != null && (y.x = y.fx), y.fy != null && (y.y = y.fy), isNaN(y.x) || isNaN(y.y)) {
        var w = Yb * Math.sqrt(0.5 + m), x = m * Kb;
        y.x = w * Math.cos(x), y.y = w * Math.sin(x);
      }
      (isNaN(y.vx) || isNaN(y.vy)) && (y.vx = y.vy = 0);
    }
  }
  function v(m) {
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
    find: function(m, p, y) {
      var w = 0, x = e.length, b, _, E, S, I;
      for (y == null ? y = 1 / 0 : y *= y, w = 0; w < x; ++w)
        S = e[w], b = m - S.x, _ = p - S.y, E = b * b + _ * _, E < y && (I = S, y = E);
      return I;
    },
    on: function(m, p) {
      return arguments.length > 1 ? (u.on(m, p), t) : u.on(m);
    }
  };
}
function Zb() {
  var e, t, n, i, r = ft(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, p = Ra(e, Wb, qb).visitAfter(f);
    for (i = h, v = 0; v < m; ++v) t = e[v], p.visit(d);
  }
  function c() {
    if (e) {
      var h, v = e.length, m;
      for (o = new Array(v), h = 0; h < v; ++h) m = e[h], o[m.index] = +r(m, h, e);
    }
  }
  function f(h) {
    var v = 0, m, p, y = 0, w, x, b;
    if (h.length) {
      for (w = x = b = 0; b < 4; ++b)
        (m = h[b]) && (p = Math.abs(m.value)) && (v += m.value, y += p, w += p * m.x, x += p * m.y);
      h.x = w / y, h.y = x / y;
    } else {
      m = h, m.x = m.data.x, m.y = m.data.y;
      do
        v += o[m.data.index];
      while (m = m.next);
    }
    h.value = v;
  }
  function d(h, v, m, p) {
    if (!h.value) return !0;
    var y = h.x - t.x, w = h.y - t.y, x = p - v, b = y * y + w * w;
    if (x * x / a < b)
      return b < s && (y === 0 && (y = zn(n), b += y * y), w === 0 && (w = zn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += y * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (y === 0 && (y = zn(n), b += y * y), w === 0 && (w = zn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (x = o[h.data.index] * i / b, t.vx += y * x, t.vy += w * x);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : ft(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function Jb(e) {
  var t = ft(0.1), n, i, r;
  typeof e != "function" && (e = ft(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ft(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ft(+s), l(), o) : e;
  }, o;
}
function Qb(e) {
  var t = ft(0.1), n, i, r;
  typeof e != "function" && (e = ft(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ft(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ft(+s), l(), o) : e;
  }, o;
}
function ki(e) {
  return function() {
    return e;
  };
}
function ew(e) {
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
  }, () => new xb(t);
}
function tw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function yh(e) {
  this._context = e;
}
yh.prototype = {
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
function nw(e) {
  return new yh(e);
}
function iw(e) {
  return e[0];
}
function rw(e) {
  return e[1];
}
function ow(e, t) {
  var n = ki(!0), i = null, r = nw, o = null, l = ew(s);
  e = typeof e == "function" ? e : e === void 0 ? iw : ki(e), t = typeof t == "function" ? t : t === void 0 ? rw : ki(t);
  function s(a) {
    var u, c = (a = tw(a)).length, f, d = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(f = a[u], u, a)) === d && ((d = !d) ? o.lineStart() : o.lineEnd()), d && o.point(+e(f, u, a), +t(f, u, a));
    if (h) return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : ki(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : ki(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : ki(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const vo = (e) => () => e;
function lw(e, {
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
var ph = new _n(1, 0, 0);
_n.prototype;
function es(e) {
  e.stopImmediatePropagation();
}
function or(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function sw(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function aw() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function wc() {
  return this.__zoom || ph;
}
function uw(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function cw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fw(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function dw() {
  var e = sw, t = aw, n = fw, i = uw, r = cw, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = s1, u = jr("start", "zoom", "end"), c, f, d, h = 500, v = 150, m = 0, p = 10;
  function y(C) {
    C.property("__zoom", wc).on("wheel.zoom", I, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", H).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(C, B, M, z) {
    var A = C.selection ? C.selection() : C;
    A.property("__zoom", wc), C !== A ? _(C, B, M, z) : A.interrupt().each(function() {
      E(this, arguments).event(z).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, y.scaleBy = function(C, B, M, z) {
    y.scaleTo(C, function() {
      var A = this.__zoom.k, F = typeof B == "function" ? B.apply(this, arguments) : B;
      return A * F;
    }, M, z);
  }, y.scaleTo = function(C, B, M, z) {
    y.transform(C, function() {
      var A = t.apply(this, arguments), F = this.__zoom, O = M == null ? b(A) : typeof M == "function" ? M.apply(this, arguments) : M, D = F.invert(O), Y = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(x(w(F, Y), O, D), A, l);
    }, M, z);
  }, y.translateBy = function(C, B, M, z) {
    y.transform(C, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), l);
    }, null, z);
  }, y.translateTo = function(C, B, M, z, A) {
    y.transform(C, function() {
      var F = t.apply(this, arguments), O = this.__zoom, D = z == null ? b(F) : typeof z == "function" ? z.apply(this, arguments) : z;
      return n(ph.translate(D[0], D[1]).scale(O.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), F, l);
    }, z, A);
  };
  function w(C, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === C.k ? C : new _n(B, C.x, C.y);
  }
  function x(C, B, M) {
    var z = B[0] - M[0] * C.k, A = B[1] - M[1] * C.k;
    return z === C.x && A === C.y ? C : new _n(C.k, z, A);
  }
  function b(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function _(C, B, M, z) {
    C.on("start.zoom", function() {
      E(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var A = this, F = arguments, O = E(A, F).event(z), D = t.apply(A, F), Y = M == null ? b(D) : typeof M == "function" ? M.apply(A, F) : M, ee = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ce = A.__zoom, me = typeof B == "function" ? B.apply(A, F) : B, J = a(ce.invert(Y).concat(ee / ce.k), me.invert(Y).concat(ee / me.k));
      return function(ue) {
        if (ue === 1) ue = me;
        else {
          var ke = J(ue), Ke = ee / ke[2];
          ue = new _n(Ke, Y[0] - ke[0] * Ke, Y[1] - ke[1] * Ke);
        }
        O.zoom(null, ue);
      };
    });
  }
  function E(C, B, M) {
    return !M && C.__zooming || new S(C, B);
  }
  function S(C, B) {
    this.that = C, this.args = B, this.active = 0, this.sourceEvent = null, this.extent = t.apply(C, B), this.taps = 0;
  }
  S.prototype = {
    event: function(C) {
      return C && (this.sourceEvent = C), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(C, B) {
      return this.mouse && C !== "mouse" && (this.mouse[1] = B.invert(this.mouse[0])), this.touch0 && C !== "touch" && (this.touch0[1] = B.invert(this.touch0[0])), this.touch1 && C !== "touch" && (this.touch1[1] = B.invert(this.touch1[0])), this.that.__zoom = B, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(C) {
      var B = qt(this.that).datum();
      u.call(
        C,
        this.that,
        new lw(C, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: C,
          transform: this.that.__zoom,
          dispatch: u
        }),
        B
      );
    }
  };
  function I(C, ...B) {
    if (!e.apply(this, arguments)) return;
    var M = E(this, B).event(C), z = this.__zoom, A = Math.max(o[0], Math.min(o[1], z.k * Math.pow(2, i.apply(this, arguments)))), F = Mt(C);
    if (M.wheel)
      (M.mouse[0][0] !== F[0] || M.mouse[0][1] !== F[1]) && (M.mouse[1] = z.invert(M.mouse[0] = F)), clearTimeout(M.wheel);
    else {
      if (z.k === A) return;
      M.mouse = [F, z.invert(F)], Lo(this), M.start();
    }
    or(C), M.wheel = setTimeout(O, v), M.zoom("mouse", n(x(w(z, A), M.mouse[0], M.mouse[1]), M.extent, l));
    function O() {
      M.wheel = null, M.end();
    }
  }
  function $(C, ...B) {
    if (d || !e.apply(this, arguments)) return;
    var M = C.currentTarget, z = E(this, B, !0).event(C), A = qt(C.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", ee, !0), F = Mt(C, M), O = C.clientX, D = C.clientY;
    th(C.view), es(C), z.mouse = [F, this.__zoom.invert(F)], Lo(this), z.start();
    function Y(ce) {
      if (or(ce), !z.moved) {
        var me = ce.clientX - O, J = ce.clientY - D;
        z.moved = me * me + J * J > m;
      }
      z.event(ce).zoom("mouse", n(x(z.that.__zoom, z.mouse[0] = Mt(ce, M), z.mouse[1]), z.extent, l));
    }
    function ee(ce) {
      A.on("mousemove.zoom mouseup.zoom", null), nh(ce.view, z.moved), or(ce), z.event(ce).end();
    }
  }
  function R(C, ...B) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, z = Mt(C.changedTouches ? C.changedTouches[0] : C, this), A = M.invert(z), F = M.k * (C.shiftKey ? 0.5 : 2), O = n(x(w(M, F), z, A), t.apply(this, B), l);
      or(C), s > 0 ? qt(this).transition().duration(s).call(_, O, z, C) : qt(this).call(y.transform, O, z, C);
    }
  }
  function H(C, ...B) {
    if (e.apply(this, arguments)) {
      var M = C.touches, z = M.length, A = E(this, B, C.changedTouches.length === z).event(C), F, O, D, Y;
      for (es(C), O = 0; O < z; ++O)
        D = M[O], Y = Mt(D, this), Y = [Y, this.__zoom.invert(Y), D.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== Y[2] && (A.touch1 = Y, A.taps = 0) : (A.touch0 = Y, F = !0, A.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (A.taps < 2 && (f = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), Lo(this), A.start());
    }
  }
  function L(C, ...B) {
    if (this.__zooming) {
      var M = E(this, B).event(C), z = C.changedTouches, A = z.length, F, O, D, Y;
      for (or(C), F = 0; F < A; ++F)
        O = z[F], D = Mt(O, this), M.touch0 && M.touch0[2] === O.identifier ? M.touch0[0] = D : M.touch1 && M.touch1[2] === O.identifier && (M.touch1[0] = D);
      if (O = M.that.__zoom, M.touch1) {
        var ee = M.touch0[0], ce = M.touch0[1], me = M.touch1[0], J = M.touch1[1], ue = (ue = me[0] - ee[0]) * ue + (ue = me[1] - ee[1]) * ue, ke = (ke = J[0] - ce[0]) * ke + (ke = J[1] - ce[1]) * ke;
        O = w(O, Math.sqrt(ue / ke)), D = [(ee[0] + me[0]) / 2, (ee[1] + me[1]) / 2], Y = [(ce[0] + J[0]) / 2, (ce[1] + J[1]) / 2];
      } else if (M.touch0) D = M.touch0[0], Y = M.touch0[1];
      else return;
      M.zoom("touch", n(x(O, D, Y), M.extent, l));
    }
  }
  function N(C, ...B) {
    if (this.__zooming) {
      var M = E(this, B).event(C), z = C.changedTouches, A = z.length, F, O;
      for (es(C), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), F = 0; F < A; ++F)
        O = z[F], M.touch0 && M.touch0[2] === O.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === O.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (O = Mt(O, this), Math.hypot(f[0] - O[0], f[1] - O[1]) < p)) {
        var D = qt(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : vo(+C), y) : i;
  }, y.filter = function(C) {
    return arguments.length ? (e = typeof C == "function" ? C : vo(!!C), y) : e;
  }, y.touchable = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : vo(!!C), y) : r;
  }, y.extent = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : vo([[+C[0][0], +C[0][1]], [+C[1][0], +C[1][1]]]), y) : t;
  }, y.scaleExtent = function(C) {
    return arguments.length ? (o[0] = +C[0], o[1] = +C[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(C) {
    return arguments.length ? (l[0][0] = +C[0][0], l[1][0] = +C[1][0], l[0][1] = +C[0][1], l[1][1] = +C[1][1], y) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, y.constrain = function(C) {
    return arguments.length ? (n = C, y) : n;
  }, y.duration = function(C) {
    return arguments.length ? (s = +C, y) : s;
  }, y.interpolate = function(C) {
    return arguments.length ? (a = C, y) : a;
  }, y.on = function() {
    var C = u.on.apply(u, arguments);
    return C === u ? y : C;
  }, y.clickDistance = function(C) {
    return arguments.length ? (m = (C = +C) * C, y) : Math.sqrt(m);
  }, y.tapDistance = function(C) {
    return arguments.length ? (p = +C, y) : p;
  }, y;
}
class bh {
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
var _t = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(_t || {});
class hw {
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
    Ze(this, "id");
    this.source = t, this.target = n, this.pathType = i, this.label = r, this.color = o, this.id = `${t.id}-${n.id}`;
  }
}
class xc {
  constructor() {
    Ze(this, "nodeIdCounter", 0);
    Ze(this, "nodes", []);
    Ze(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, i, r, o) {
    const l = new bh(
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
    const a = new hw(l, s, void 0, i, r);
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
function vw(e, t) {
  let n = dw().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return mw(n, e, t);
}
function mw(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
function gw(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function yw(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function pw(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function bw(e, t, n) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function ts(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function lr(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function ww(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
function ri(e) {
  e.preventDefault(), e.stopPropagation();
}
function xw(e, t, n, i) {
  return Np().filter((r) => r.button === 2).on("start", (r, o) => {
    ri(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function _w(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => ri(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function Sw(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function Cw(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function Tr(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function kw(e, t, n) {
  if (pr(e, t, "link-arrow", "arrow", !1), pr(e, t, "link-arrow-reverse", "arrow", !0), pr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      Os(e, t, i);
}
function Os(e, t, n) {
  e.select("#link-arrow-" + Tr(n)).empty() && (pr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), pr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function ns(e, t) {
  e.select("#link-arrow-" + Tr(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + Tr(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function pr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${ow()(t.arrowPoints)}`).style("fill", o || "");
}
function Ew(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function Vw(e, t, n, i, r) {
  let o = Xb(e.nodes).on("tick", () => r()).force(
    "collision",
    Db().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Lw(e, o, n, i, t), o = xh(o, e, t, t.fixedLinkDistanceEnabled), o = wh(o, t.nodePhysicsEnabled, n, i), o;
}
function Lw(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function wh(e, t, n, i) {
  return t ? e.force("charge", Zb().strength(-500)).force("x", Jb(n / 2).strength(0.05)).force("y", Qb(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function xh(e, t, n, i) {
  return i ? e.force(
    "link",
    zb().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class Iw {
  constructor() {
    Ze(this, "persistSettingsLocalStorage", !1);
    Ze(this, "hasToolbar", !0);
    Ze(this, "nodeRadius", 24);
    Ze(this, "showNodeLabels", !0);
    Ze(this, "nodePhysicsEnabled", !1);
    Ze(this, "isGraphEditableInGUI", !0);
    Ze(this, "zoomEnabled", !1);
    Ze(this, "showLinkLabels", !0);
    Ze(this, "fixedLinkDistanceEnabled", !1);
    Ze(this, "markerBoxSize", 4);
    Ze(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    Ze(this, "markerRef", this.markerBoxSize / 2);
    Ze(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    Ze(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
const Pw = Object.prototype.toString;
function Yo(e) {
  const t = Pw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function Tw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Yo(e))
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
function Mw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Yo(e))
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
function _c(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Yo(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Yo(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = Mw(e), r = Tw(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const mo = " ".repeat(2), _h = " ".repeat(4);
function Aw() {
  return Sh(this);
}
function Sh(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${mo}[
${_h}${$w(e, n, i, r)}
${mo}]
${mo}rows: ${e.rows}
${mo}columns: ${e.columns}
}`;
}
function $w(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let f = 0; f < s; f++)
      c.push(Nw(e.get(u, f), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${_h}`);
}
function Nw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function Rw(e, t) {
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
function jt(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Gt(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function Ii(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function Pi(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Ow(e, t, n) {
  return {
    row: Bw(e, t),
    column: Fw(e, n)
  };
}
function Bw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Fw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Sc(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (go("startRow", t), go("endRow", n), go("startColumn", i), go("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Cl(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function go(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Ei(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function Dw(e) {
  let t = Cl(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function Hw(e) {
  let t = Cl(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function zw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function jw(e) {
  let t = Cl(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function Gw(e) {
  let t = Cl(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function Uw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function Ww(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function qw(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function Yw(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function Kw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function Xw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function Zw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function Jw(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function Qw(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function ex(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function tx(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function nx(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function ix(e, t) {
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
        let f = r + Math.round(l() * s);
        a.set(u, c, f);
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
    jt(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return Ce.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    jt(this, t), n = Ii(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    jt(this, t), jt(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    Gt(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return Ce.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Gt(this, t), n = Pi(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    Gt(this, t), Gt(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = Ii(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = Ii(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = Ii(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = Ii(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = Pi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = Pi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = Pi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = Pi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    jt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    Gt(this, t);
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
    Ei(this);
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
    Ei(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    jt(this, t), Ei(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    jt(this, t), Ei(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if (Gt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    Gt(this, t), Ei(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if (Gt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    Gt(this, t), Ei(this);
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
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), f = (i + u) * (r + c), d = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, p = (s - i) * (r + l), y = (o - u) * (a + c), w = f + v - m + y, x = h + m, b = d + v, _ = f - d + h + p;
    return n.set(0, 0, w), n.set(0, 1, x), n.set(1, 0, b), n.set(1, 1, _), n;
  }
  strassen3x3(t) {
    t = Ce.checkMatrix(t);
    let n = new Ce(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), d = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), y = t.get(1, 2), w = t.get(2, 0), x = t.get(2, 1), b = t.get(2, 2), _ = (i + r + o - l - s - c - f) * p, E = (i - l) * (-h + p), S = s * (-d + h + m - p - y - w + b), I = (-i + l + s) * (d - h + p), $ = (l + s) * (-d + h), R = i * d, H = (-i + u + c) * (d - v + y), L = (-i + u) * (v - y), N = (u + c) * (-d + v), C = (i + r + o - s - a - u - c) * y, B = c * (-d + v + m - p - y - w + x), M = (-o + c + f) * (p + w - x), z = (o - f) * (p - x), A = o * w, F = (c + f) * (-w + x), O = (-o + s + a) * (y + w - b), D = (o - a) * (y - b), Y = (s + a) * (-w + b), ee = r * m, ce = a * x, me = l * v, J = u * h, ue = f * b, ke = R + A + ee, Ke = _ + I + $ + R + M + A + F, lt = R + H + N + C + A + O + Y, zt = E + S + I + R + A + O + D, an = E + I + $ + R + ce, V = A + O + D + Y + me, P = R + H + L + B + M + z + A, j = M + z + A + F + J, q = R + H + L + N + ue;
    return n.set(0, 0, ke), n.set(0, 1, Ke), n.set(0, 2, lt), n.set(1, 0, zt), n.set(1, 1, an), n.set(1, 2, V), n.set(2, 0, P), n.set(2, 1, j), n.set(2, 2, q), n;
  }
  mmulStrassen(t) {
    t = Ce.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(f, d, h) {
      let v = f.rows, m = f.columns;
      if (v === d && m === h)
        return f;
      {
        let p = Ie.zeros(d, h);
        return p = p.setSubMatrix(f, 0, 0), p;
      }
    }
    let a = Math.max(i, o), u = Math.max(r, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(f, d, h, v) {
      if (h <= 512 || v <= 512)
        return f.mmul(d);
      h % 2 === 1 && v % 2 === 1 ? (f = s(f, h + 1, v + 1), d = s(d, h + 1, v + 1)) : h % 2 === 1 ? (f = s(f, h + 1, v), d = s(d, h + 1, v)) : v % 2 === 1 && (f = s(f, h, v + 1), d = s(d, h, v + 1));
      let m = parseInt(f.rows / 2, 10), p = parseInt(f.columns / 2, 10), y = f.subMatrix(0, m - 1, 0, p - 1), w = d.subMatrix(0, m - 1, 0, p - 1), x = f.subMatrix(0, m - 1, p, f.columns - 1), b = d.subMatrix(0, m - 1, p, d.columns - 1), _ = f.subMatrix(m, f.rows - 1, 0, p - 1), E = d.subMatrix(m, d.rows - 1, 0, p - 1), S = f.subMatrix(m, f.rows - 1, p, f.columns - 1), I = d.subMatrix(m, d.rows - 1, p, d.columns - 1), $ = c(
        Ie.add(y, S),
        Ie.add(w, I),
        m,
        p
      ), R = c(Ie.add(_, S), w, m, p), H = c(y, Ie.sub(b, I), m, p), L = c(S, Ie.sub(E, w), m, p), N = c(Ie.add(y, x), I, m, p), C = c(
        Ie.sub(_, y),
        Ie.add(w, b),
        m,
        p
      ), B = c(
        Ie.sub(x, S),
        Ie.add(E, I),
        m,
        p
      ), M = Ie.add($, L);
      M.sub(N), M.add(B);
      let z = Ie.add(H, N), A = Ie.add(R, L), F = Ie.sub($, R);
      F.add(H), F.add(C);
      let O = Ie.zeros(2 * M.rows, 2 * M.columns);
      return O = O.setSubMatrix(M, 0, 0), O = O.setSubMatrix(z, M.rows, 0), O = O.setSubMatrix(A, 0, M.columns), O = O.setSubMatrix(F, M.rows, M.columns), O.subMatrix(0, h - 1, 0, v - 1);
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
      l.length > 0 && _c(l, { min: n, max: i, output: l }), r.setRow(o, l);
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
      l.length && _c(l, {
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
  sortRows(t = Cc) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = Cc) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    Sc(this, t, n, i, r);
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
    Sc(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = Ow(this, t, n), r = new Ce(t.length, n.length);
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
        return Dw(this);
      case "column":
        return Hw(this);
      case void 0:
        return zw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return jw(this);
      case "column":
        return Gw(this);
      case void 0:
        return Uw(this);
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
        return Ww(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return qw(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return Yw(this, i, r);
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
        return Kw(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return Xw(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return Zw(this, i), this;
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
          i = Jw(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return Qw(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = ex(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return tx(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = nx(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return ix(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return Sh(this, t);
  }
}
Ie.prototype.klass = "Matrix";
typeof Symbol < "u" && (Ie.prototype[Symbol.for("nodejs.util.inspect.custom")] = Aw);
function Cc(e, t) {
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
    return jt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), jt(this, t, !0), n = Float64Array.from(Ii(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    Gt(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), Gt(this, t, !0), n = Pi(this, n);
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
Rw(Ie, Ce);
function is(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, f = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${f}`;
}
function rs(e, t, n) {
  const i = new Ce([[e.x, e.y]]), r = new Ce([[t.x, t.y]]), o = Ce.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = Ch(10), u = Fi(s, -a).multiply(n.nodeRadius - 1).add(i), c = Ce.multiply(s, -1), f = Fi(c, a).multiply(n.nodeRadius).add(r).add(Fi(c, a).multiply(2 * n.markerBoxSize)), d = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${d},${d},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function kc(e, t, n) {
  const i = new Ce([[e.x, e.y]]), r = new Ce([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = Ce.subtract(i, r), l = o.divide(o.norm("frobenius")), s = Ch(40), a = Fi(l, s).multiply(n.nodeRadius - 1).add(i), u = Fi(l, -s).multiply(n.nodeRadius).add(i).add(Fi(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function Ec(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Ch(e) {
  return e * (Math.PI / 180);
}
function Fi(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new Ce([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
function rx(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((s) => s.trim().startsWith("#")), i = n !== -1 ? t.slice(0, n) : t, r = n !== -1 ? t.slice(n + 1) : [], o = [];
  if (i.length)
    for (const s of i) {
      let [, a, u, c] = (s.match(/(\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (.*)/) || s.match(/(\w+)/) || []).map((f) => f.trim());
      u != null && u.includes("/COLOR:/") && (c = u, u = ""), a && o.push({
        idImported: a,
        label: u,
        color: c == null ? void 0 : c.replace("/COLOR:/", "")
      });
    }
  const l = [];
  if (r.length)
    for (const s of r) {
      let [, a, u, c, f] = (s.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (\w+) (.*)/) || s.match(/(\w+) (\w+)/) || []).map((d) => d.trim());
      c != null && c.includes("/COLOR:/") && (f = c, c = ""), a && u && l.push({
        sourceIdImported: a,
        targetIdImported: u,
        label: c,
        color: f == null ? void 0 : f.replace("/COLOR:/", "")
      });
    }
  return [o, l];
}
function ox(e) {
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
var lx = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function sx(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var kh = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(lx, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (M, z, A, F) => z + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, f, d, h, v = [], m = [], p, y, w = 0, x = 0, b = 0, _ = 0, E = 0, S = 0, I = 0, $ = 0, R = 0, H = 0, L = 0, N = 0, C = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], f = c.substring(0, 1), d = f.toLowerCase(), v = c.replace(f, "").trim().split(" ").filter(function(M) {
          return M !== "";
        }), m = v, v = v.map(parseFloat), p = v.length, d === "m") {
          if (B += "M ", f === "m" ? (b += v[0], _ += v[1]) : (b = v[0], _ = v[1]), w = b, x = _, B += b + " " + _ + " ", p > 2)
            for (y = 0; y < p; y += 2)
              f === "m" ? (b += v[y], _ += v[y + 1]) : (b = v[y], _ = v[y + 1]), B += "L " + b + " " + _ + " ";
        } else if (d === "l")
          for (y = 0; y < p; y += 2)
            f === "l" ? (b += v[y], _ += v[y + 1]) : (b = v[y], _ = v[y + 1]), B += "L " + b + " " + _ + " ";
        else if (d === "h")
          for (y = 0; y < p; y++)
            f === "h" ? b += v[y] : b = v[y], B += "L " + b + " " + _ + " ";
        else if (d === "v")
          for (y = 0; y < p; y++)
            f === "v" ? _ += v[y] : _ = v[y], B += "L " + b + " " + _ + " ";
        else if (d === "q")
          for (y = 0; y < p; y += 4)
            f === "q" ? (E = b + v[y], S = _ + v[y + 1], b += v[y + 2], _ += v[y + 3]) : (E = v[y], S = v[y + 1], b = v[y + 2], _ = v[y + 3]), B += "Q " + E + " " + S + " " + b + " " + _ + " ";
        else if (d === "t")
          for (y = 0; y < p; y += 2)
            ["t", "q"].indexOf(h) > -1 ? (E = b + (b - E), S = _ + (_ - S)) : (E = b, S = _), f === "t" ? (b += v[y], _ += v[y + 1]) : (b = v[y], _ = v[y + 1]), B += "Q " + E + " " + S + " " + b + " " + _ + " ", h = d;
        else if (d === "c")
          for (y = 0; y < p; y += 6)
            f === "c" ? (E = b + v[y], S = _ + v[y + 1], I = b + v[y + 2], $ = _ + v[y + 3], b += v[y + 4], _ += v[y + 5]) : (E = v[y], S = v[y + 1], I = v[y + 2], $ = v[y + 3], b = v[y + 4], _ = v[y + 5]), B += "C " + E + " " + S + " " + I + " " + $ + " " + b + " " + _ + " ";
        else if (d === "s")
          for (y = 0; y < p; y += 4)
            E = b, S = _, ["s", "c"].indexOf(h) > -1 && (E += b - I, S += _ - $), f === "s" ? (I = b + v[y], $ = _ + v[y + 1], b += v[y + 2], _ += v[y + 3]) : (I = v[y], $ = v[y + 1], b = v[y + 2], _ = v[y + 3]), B += "C " + E + " " + S + " " + I + " " + $ + " " + b + " " + _ + " ";
        else if (d === "a")
          for (y = 0; y < p; y += 7) {
            R = v[y], H = v[y + 1], L = v[y + 2], N = m[y + 3];
            let M = !1;
            if (N.length > 1) {
              let z = parseInt(N[0]), A = parseInt(N[1]), F;
              N.length > 2 && (F = parseFloat(N.substring(2))), v[y + 3] = z, v.splice(y + 4, 0, A), m.splice(y + 4, 0, "+"), F !== void 0 && v.splice(y + 5, 0, F), M = !0;
            }
            N = v[y + 3], C = M ? v[y + 4] : m[y + 4], !M && C.length > 1 && (v[y + 4] = parseInt(C[0]), v.splice(y + 5, 0, parseFloat(C.substring(1)))), C = v[y + 4], f === "a" ? (b += v[y + 5], _ += v[y + 6]) : (b = v[y + 5], _ = v[y + 6]), B += "A " + R + " " + H + " " + L + " " + N + " " + C + " " + b + " " + _ + " ";
          }
        else d === "z" && (B += "Z ", b = w, _ = x);
        h = d;
      }
      return B.trim();
    }
    function i(l) {
      var s = l.trim().split(" "), a, u = s.length, c = u - 1, f, d = [], h, v, m, p, y, w = new RegExp("[QAZLCM]", ""), x = s.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < u; f++)
        if (a = s[f], w.test(a)) {
          if (a === "A") {
            d.push(s[f + 5] === "0" ? "1" : "0"), d.push(s[f + 4]), d.push(s[f + 3]), d.push(s[f + 2]), d.push(s[f + 1]), d.push(a), d.push(s[f + 7]), d.push(s[f + 6]), f += 7;
            continue;
          } else if (a === "C")
            p = 3, y = 2;
          else if (a === "Q")
            p = 2, y = 1;
          else if (a === "L")
            p = 1, y = 1;
          else if (a === "M")
            p = 1, y = 0;
          else
            continue;
          for (p === y && d.push(a), m = 0; m < p; m++)
            m === y && d.push(a), h = s[++f], v = s[++f], d.push(v), d.push(h);
        } else {
          var b = s.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = s.slice(f + 1, Math.min(f + 4, c)).join(" "), range = b + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      d.push("M");
      var _ = "", E = d.length - 1, S;
      for (S = E; S > 0; S--)
        _ += d[S] + " ";
      return x && (_ += "Z"), _ = _.replace(/M M/g, "Z M"), _;
    }
    function r(a, s) {
      s = parseInt(s) == s ? s : !1;
      var a = n(a), u = a.replace(/M/g, "|M").split("|"), c;
      if (u.splice(0, 1), s !== !1 && s >= u.length)
        return a;
      if (s === !1)
        u = u.map(function(d) {
          return i(d.trim());
        });
      else {
        var f = u[s];
        f && (c = i(f.trim()), u[s] = c);
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
})(kh);
var ax = kh.exports;
const Vc = /* @__PURE__ */ sx(ax), Re = typeof window < "u", Ba = Re && "IntersectionObserver" in window, ux = Re && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Lc = Re && "EyeDropper" in window;
function Eh(e, t, n) {
  const i = t.length - 1;
  if (i < 0) return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function wi(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => wi(e[i], t[i]));
}
function Bs(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Eh(e, t.split("."), n));
}
function xn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Bs(e, t, n);
  if (Array.isArray(t)) return Eh(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function Fa(e) {
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
function Ko(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Mr(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Ic = Object.freeze({
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
}), cx = Object.freeze({
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
function Vh(e) {
  return Object.keys(e);
}
function si(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Lh(e, t) {
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
function Dt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const Ih = /^on[^a-z]/, Da = (e) => Ih.test(e), fx = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Xi(e) {
  const [t, n] = Pc(e, [Ih]), i = Dt(t, fx), [r, o] = Pc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function vn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function dx(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), Kt(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function Et(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Tc(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function Mc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Ac(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function hx(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let i = 0;
  for (; i < e.length; )
    n.push(e.substr(i, t)), i += t;
  return n;
}
function $c(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let i = -1;
  for (; Math.abs(e) >= t && i < n.length - 1; )
    e /= t, ++i;
  return `${e.toFixed(1)} ${n[i]}B`;
}
function Vt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (Ko(o) && Ko(l)) {
      i[r] = Vt(o, l, n);
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
function Ph(e) {
  return e.map((t) => t.type === Ve ? Ph(t.children) : t).flat();
}
function di() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (di.cache.has(e)) return di.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return di.cache.set(e, t), t;
}
di.cache = /* @__PURE__ */ new Map();
function Io(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Io(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Io(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Io(e, t.component.subTree).flat(1);
  }
  return [];
}
function vx(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function Ha(e) {
  const t = Qt({}), n = k(e);
  return mn(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), pa(t);
}
function Xo(e, t) {
  return e.includes(t);
}
function Th(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Zt = () => [Function, Array];
function Nc(e, t) {
  return t = "on" + In(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Mh(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Ar(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Ah(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function Zo(e, t) {
  var i, r, o, l;
  const n = Ar(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Ah(n, t);
    s ? s.focus() : Zo(e, t === "next" ? "first" : "last");
  }
}
function Jo(e, t) {
  if (!(Re && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function $h(e) {
  return e.some((t) => Bo(t) ? t.type === Ot ? !1 : t.type !== Ve || $h(t.children) : !0) ? e : null;
}
function mx(e, t) {
  if (!Re || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function gx(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Nh = ["top", "bottom"], yx = ["start", "end", "left", "right"];
function Fs(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = Xo(Nh, n) ? "start" : Xo(yx, n) ? "top" : "center"), {
    side: Rc(n, t),
    align: Rc(i, t)
  };
}
function Rc(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function os(e) {
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
function ls(e) {
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
function Oc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Bc(e) {
  return Xo(Nh, e.side) ? "y" : "x";
}
class hi {
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
function Fc(e, t) {
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
function Rh(e) {
  return Array.isArray(e) ? new hi({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function za(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new hi(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), f = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new hi({
      x: c,
      y: f,
      width: d,
      height: h
    });
  } else
    return new hi(t);
}
function ai(e, t, n) {
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
const Po = /* @__PURE__ */ new WeakMap();
function px(e, t) {
  Object.keys(t).forEach((n) => {
    if (Da(n)) {
      const i = Th(n), r = Po.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), Po.has(e) || Po.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function bx(e, t) {
  Object.keys(t).forEach((n) => {
    if (Da(n)) {
      const i = Th(n), r = Po.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Vi = 2.4, Dc = 0.2126729, Hc = 0.7151522, zc = 0.072175, wx = 0.55, xx = 0.58, _x = 0.57, Sx = 0.62, yo = 0.03, jc = 1.45, Cx = 5e-4, kx = 1.25, Ex = 1.25, Gc = 0.078, Uc = 12.82051282051282, po = 0.06, Wc = 1e-3;
function qc(e, t) {
  const n = (e.r / 255) ** Vi, i = (e.g / 255) ** Vi, r = (e.b / 255) ** Vi, o = (t.r / 255) ** Vi, l = (t.g / 255) ** Vi, s = (t.b / 255) ** Vi;
  let a = n * Dc + i * Hc + r * zc, u = o * Dc + l * Hc + s * zc;
  if (a <= yo && (a += (yo - a) ** jc), u <= yo && (u += (yo - u) ** jc), Math.abs(u - a) < Cx) return 0;
  let c;
  if (u > a) {
    const f = (u ** wx - a ** xx) * kx;
    c = f < Wc ? 0 : f < Gc ? f - f * Uc * po : f - po;
  } else {
    const f = (u ** Sx - a ** _x) * Ex;
    c = f > -Wc ? 0 : f > -Gc ? f - f * Uc * po : f + po;
  }
  return c * 100;
}
function Vx(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const Qo = 0.20689655172413793, Lx = (e) => e > Qo ** 3 ? Math.cbrt(e) : e / (3 * Qo ** 2) + 4 / 29, Ix = (e) => e > Qo ? e ** 3 : 3 * Qo ** 2 * (e - 4 / 29);
function Oh(e) {
  const t = Lx, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Bh(e) {
  const t = Ix, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Px = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Tx = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Mx = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Ax = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Fh(e) {
  const t = Array(3), n = Tx, i = Px;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(Et(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function ja(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Ax, l = Mx;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function Ds(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function $x(e) {
  return Ds(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Yc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Nx = {
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
  hsl: (e, t, n, i) => Kc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsla: (e, t, n, i) => Kc({
    h: e,
    s: t,
    l: n,
    a: i
  }),
  hsv: (e, t, n, i) => Ln({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => Ln({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Nt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Yc.test(e)) {
    const {
      groups: t
    } = e.match(Yc), {
      fn: n,
      values: i
    } = t, r = i.split(/,\s*/).map((o) => o.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(o) / 100 : parseFloat(o));
    return Nx[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Gh(t);
  } else if (typeof e == "object") {
    if (si(e, ["r", "g", "b"]))
      return e;
    if (si(e, ["h", "s", "l"]))
      return Ln(Ga(e));
    if (si(e, ["h", "s", "v"]))
      return Ln(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Ln(e) {
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
function Kc(e) {
  return Ln(Ga(e));
}
function kl(e) {
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
function Dh(e) {
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
function Ga(e) {
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
function Hh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function zh(e) {
  return Hh(Ln(e));
}
function bo(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function jh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[bo(t), bo(n), bo(i), r !== void 0 ? bo(Math.round(r * 255)) : ""].join("")}`;
}
function Gh(e) {
  e = Rx(e);
  let [t, n, i, r] = hx(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Uh(e) {
  const t = Gh(e);
  return kl(t);
}
function Wh(e) {
  return jh(Ln(e));
}
function Rx(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Mc(Mc(e, 6), 8, "F")), e;
}
function Ox(e, t) {
  const n = Oh(ja(e));
  return n[0] = n[0] + t * 10, Fh(Bh(n));
}
function Bx(e, t) {
  const n = Oh(ja(e));
  return n[0] = n[0] - t * 10, Fh(Bh(n));
}
function Hs(e) {
  const t = Nt(e);
  return ja(t)[1];
}
function Fx(e, t) {
  const n = Hs(e), i = Hs(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function qh(e) {
  const t = Math.abs(qc(Nt(0), Nt(e)));
  return Math.abs(qc(Nt(16777215), Nt(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
const Se = X({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Ui = Symbol.for("vuetify:defaults");
function Dx(e) {
  return Q(e);
}
function Ua() {
  const e = Fe(Ui);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function yn(e, t) {
  const n = Ua(), i = Q(e), r = k(() => {
    if (Kt(t == null ? void 0 : t.disabled)) return n.value;
    const l = Kt(t == null ? void 0 : t.scoped), s = Kt(t == null ? void 0 : t.reset), a = Kt(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = Vt(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let f = 0; f <= c && !(!u || !("prev" in u)); f++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = Vt(Vt(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? Vt(u.prev, u) : u;
  });
  return ot(Ui, r), r;
}
function Hx(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[di(t)]) < "u";
}
function zx() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ua();
  const i = nt("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = k(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var f, d, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(f = r.value) == null ? void 0 : f[u], c].filter((m) => m != null) : typeof u == "string" && !Hx(i.vnode, u) ? ((d = r.value) == null ? void 0 : d[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = pe();
  mn(() => {
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
    const a = Wx(Ui, i);
    ot(Ui, k(() => l.value ? Vt((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function on(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = X(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return Lh(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = Ua();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = zx(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function fe() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? on : Ki)(t);
}
function Zi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return fe()({
    name: n ?? In(dt(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...Se()
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => {
        var l;
        return qn(i.tag, {
          class: [e, i.class],
          style: i.style
        }, (l = o.default) == null ? void 0 : l.call(o));
      };
    }
  });
}
function Yh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const $r = "cubic-bezier(0.4, 0, 0.2, 1)", jx = "cubic-bezier(0.0, 0, 0.2, 1)", Gx = "cubic-bezier(0.4, 0, 1, 1)";
function nt(e, t) {
  const n = Va();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function pn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = nt(e).type;
  return di((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Kh = 0, To = /* @__PURE__ */ new WeakMap();
function bt() {
  const e = nt("getUid");
  if (To.has(e)) return To.get(e);
  {
    const t = Kh++;
    return To.set(e, t), t;
  }
}
bt.reset = () => {
  Kh = 0, To = /* @__PURE__ */ new WeakMap();
};
function Xh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Ux(e) : Wa(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function el(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Wa(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Wa(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Ux(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Wx(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : nt("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function qx(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function he(e) {
  const t = nt("useRender");
  t.render = e;
}
const xi = X({
  border: [Boolean, Number, String]
}, "border");
function _i(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return {
    borderClasses: k(() => {
      const i = He(e) ? e.value : e.border, r = [];
      if (i === !0 || i === "")
        r.push(`${t}--border`);
      else if (typeof i == "string" || i === 0)
        for (const o of String(i).split(" "))
          r.push(`border-${o}`);
      return r;
    })
  };
}
const Yx = [null, "default", "comfortable", "compact"], Ht = X({
  density: {
    type: String,
    default: "default",
    validator: (e) => Yx.includes(e)
  }
}, "density");
function ln(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return {
    densityClasses: k(() => `${t}--density-${e.density}`)
  };
}
const Tn = X({
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
function Mn(e) {
  return {
    elevationClasses: k(() => {
      const n = He(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const wt = X({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function xt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return {
    roundedClasses: k(() => {
      const i = He(e) ? e.value : e.rounded, r = He(e) ? e.value : e.tile, o = [];
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
const je = X({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), tl = Symbol.for("vuetify:theme"), Ye = X({
  theme: String
}, "theme");
function Xc() {
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
function Kx() {
  var i, r;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Xc();
  const t = Xc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [o, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || o === "dark" ? (i = t.themes) == null ? void 0 : i.dark : (r = t.themes) == null ? void 0 : r.light;
    n[o] = Vt(s, l);
  }
  return Vt(t, {
    ...e,
    themes: n
  });
}
function Xx(e) {
  const t = Kx(e), n = Q(t.defaultTheme), i = Q(t.themes), r = k(() => {
    const c = {};
    for (const [f, d] of Object.entries(i.value)) {
      const h = c[f] = {
        ...d,
        colors: {
          ...d.colors
        }
      };
      if (t.variations)
        for (const v of t.variations.colors) {
          const m = h.colors[v];
          if (m)
            for (const p of ["lighten", "darken"]) {
              const y = p === "lighten" ? Ox : Bx;
              for (const w of Fa(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = jh(y(Nt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, p = Nt(h.colors[v]);
        h.colors[m] = qh(p);
      }
    }
    return c;
  }), o = k(() => r.value[n.value]), l = k(() => {
    const c = [];
    o.value.dark && ei(c, ":root", ["color-scheme: dark"]), ei(c, ":root", Zc(o.value));
    for (const [v, m] of Object.entries(r.value))
      ei(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Zc(m)]);
    const f = [], d = [], h = new Set(Object.values(r.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? ei(d, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (ei(f, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), ei(d, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), ei(d, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
    return c.push(...f, ...d), c.map((v, m) => m === 0 ? v : `    ${v}`).join("");
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
    const f = c._context.provides.usehead;
    if (f)
      if (f.push) {
        const h = f.push(s);
        Re && be(l, () => {
          h.patch(s);
        });
      } else
        Re ? (f.addHeadObjs(k(s)), mn(() => f.updateDOM())) : f.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var d = v;
      let h = Re ? document.getElementById("vuetify-theme-stylesheet") : null;
      Re ? be(l, v, {
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
function Qe(e) {
  nt("provideTheme");
  const t = Fe(tl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = k(() => e.theme ?? t.name.value), i = k(() => t.themes.value[n.value]), r = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return ot(tl, o), o;
}
function ei(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Zc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Nt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Hs(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Nt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function qa(e) {
  return Ha(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Ds(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && $x(e.value.background)) {
          const i = Nt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = qh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Ds(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function Jt(e, t) {
  const n = k(() => ({
    text: He(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = qa(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function It(e, t) {
  const n = k(() => ({
    background: He(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = qa(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const Zx = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Ji(e, t) {
  return g(Ve, null, [e && g("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), g("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const An = X({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Zx.includes(e)
  }
}, "variant");
function Qi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  const n = k(() => {
    const {
      variant: o
    } = Kt(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = qa(k(() => {
    const {
      variant: o,
      color: l
    } = Kt(e);
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
const Zh = X({
  divided: Boolean,
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Tn(),
  ...wt(),
  ...je(),
  ...Ye(),
  ...An()
}, "VBtnGroup"), Jc = fe()({
  name: "VBtnGroup",
  props: Zh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      densityClasses: r
    } = ln(e), {
      borderClasses: o
    } = _i(e), {
      elevationClasses: l
    } = Mn(e), {
      roundedClasses: s
    } = xt(e);
    yn({
      VBtn: {
        height: "auto",
        color: oe(e, "color"),
        density: oe(e, "density"),
        flat: !0,
        variant: oe(e, "variant")
      }
    }), he(() => g(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, i.value, o.value, r.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function gi(e, t) {
  let n;
  function i() {
    n = ca(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  be(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), ht(() => {
    n == null || n.stop();
  });
}
function $e(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const o = nt("useProxiedModel"), l = Q(e[t] !== void 0 ? e[t] : n), s = di(t), u = k(s !== t ? () => {
    var f, d, h, v;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  gi(() => !u.value, () => {
    be(() => e[t], (f) => {
      l.value = f;
    });
  });
  const c = k({
    get() {
      const f = e[t];
      return i(u.value ? f : l.value);
    },
    set(f) {
      const d = r(f), h = _e(u.value ? e[t] : l.value);
      h === d || i(h) === f || (l.value = d, o == null || o.emit(`update:${t}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const El = X({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Vl = X({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Ll(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = nt("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = bt();
  ot(Symbol.for(`${t.description}:id`), r);
  const o = Fe(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = oe(e, "value"), s = k(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), nn(() => {
    o.unregister(r);
  });
  const a = k(() => o.isSelected(r)), u = k(() => a.value && [o.selectedClass.value, e.selectedClass]);
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
function Wr(e, t) {
  let n = !1;
  const i = Qt([]), r = $e(e, "modelValue", [], (d) => d == null ? [] : Jh(i, vn(d)), (d) => {
    const h = Qx(i, d);
    return e.multiple ? h : h[0];
  }), o = nt("useGroup");
  function l(d, h) {
    const v = d, m = Symbol.for(`${t.description}:id`), y = Io(m, o == null ? void 0 : o.vnode).indexOf(h);
    Kt(v.value) == null && (v.value = y), y > -1 ? i.splice(y, 0, v) : i.push(v);
  }
  function s(d) {
    if (n) return;
    a();
    const h = i.findIndex((v) => v.id === d);
    i.splice(h, 1);
  }
  function a() {
    const d = i.find((h) => !h.disabled);
    d && e.mandatory === "force" && !r.value.length && (r.value = [d.id]);
  }
  tn(() => {
    a();
  }), nn(() => {
    n = !0;
  });
  function u(d, h) {
    const v = i.find((m) => m.id === d);
    if (!(h && (v != null && v.disabled)))
      if (e.multiple) {
        const m = r.value.slice(), p = m.findIndex((w) => w === d), y = ~p;
        if (h = h ?? !y, y && e.mandatory && m.length <= 1 || !y && e.max != null && m.length + 1 > e.max) return;
        p < 0 && h ? m.push(d) : p >= 0 && !h && m.splice(p, 1), r.value = m;
      } else {
        const m = r.value.includes(d);
        if (e.mandatory && m) return;
        r.value = h ?? !m ? [d] : [];
      }
  }
  function c(d) {
    if (e.multiple, r.value.length) {
      const h = r.value[0], v = i.findIndex((y) => y.id === h);
      let m = (v + d) % i.length, p = i[m];
      for (; p.disabled && m !== v; )
        m = (m + d) % i.length, p = i[m];
      if (p.disabled) return;
      r.value = [i[m].id];
    } else {
      const h = i.find((v) => !v.disabled);
      h && (r.value = [h.id]);
    }
  }
  const f = {
    register: l,
    unregister: s,
    selected: r,
    select: u,
    disabled: oe(e, "disabled"),
    prev: () => c(i.length - 1),
    next: () => c(1),
    isSelected: (d) => r.value.includes(d),
    selectedClass: k(() => e.selectedClass),
    items: k(() => i),
    getItemIndex: (d) => Jx(i, d)
  };
  return ot(t, f), f;
}
function Jx(e, t) {
  const n = Jh(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function Jh(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => wi(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function Qx(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const Qh = Symbol.for("vuetify:v-btn-toggle"), e_ = X({
  ...Zh(),
  ...El()
}, "VBtnToggle");
fe()({
  name: "VBtnToggle",
  props: e_(),
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
    } = Wr(e, Qh);
    return he(() => {
      const a = Jc.filterProps(e);
      return g(Jc, de({
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
const t_ = X({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Je = fe(!1)({
  name: "VDefaultsProvider",
  props: t_(),
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
    } = pa(e);
    return yn(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), n_ = {
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
}, i_ = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => qn(ev, {
    ...e,
    class: "mdi"
  })
}, Te = [String, Function, Object, Array], zs = Symbol.for("vuetify:icons"), Il = X({
  icon: {
    type: Te
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Qc = fe()({
  name: "VComponentIcon",
  props: Il(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const i = e.icon;
      return g(e.tag, null, {
        default: () => {
          var r;
          return [e.icon ? g(i, null, null) : (r = n.default) == null ? void 0 : r.call(n)];
        }
      });
    };
  }
}), Ya = on({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Il(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => g(e.tag, de(n, {
      style: null
    }), {
      default: () => [g("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((i) => Array.isArray(i) ? g("path", {
        d: i[0],
        "fill-opacity": i[1]
      }, null) : g("path", {
        d: i
      }, null)) : g("path", {
        d: e.icon
      }, null)])]
    });
  }
});
on({
  name: "VLigatureIcon",
  props: Il(),
  setup(e) {
    return () => g(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const ev = on({
  name: "VClassIcon",
  props: Il(),
  setup(e) {
    return () => g(e.tag, {
      class: e.icon
    }, null);
  }
});
function r_() {
  return {
    svg: {
      component: Ya
    },
    class: {
      component: ev
    }
  };
}
function o_(e) {
  const t = r_(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = i_), Vt({
    defaultSet: n,
    sets: t,
    aliases: {
      ...n_,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const l_ = (e) => {
  const t = Fe(zs);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: k(() => {
      var a;
      const i = Kt(e);
      if (!i) return {
        component: Qc
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: Ya,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: Qc,
          icon: r
        };
      const o = Object.keys(t.sets).find((u) => typeof r == "string" && r.startsWith(`${u}:`)), l = o ? r.slice(o.length + 1) : r;
      return {
        component: t.sets[o ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, s_ = ["x-small", "small", "default", "large", "x-large"], qr = X({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Yr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return Ha(() => {
    let n, i;
    return Xo(s_, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: ge(e.size),
      height: ge(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const a_ = X({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Te,
  ...Se(),
  ...qr(),
  ...je({
    tag: "i"
  }),
  ...Ye()
}, "VIcon"), De = fe()({
  name: "VIcon",
  props: a_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = Q(), {
      themeClasses: o
    } = Qe(e), {
      iconData: l
    } = l_(k(() => r.value || e.icon)), {
      sizeClasses: s
    } = Yr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Jt(oe(e, "color"));
    return he(() => {
      var f, d;
      const c = (f = i.default) == null ? void 0 : f.call(i);
      return c && (r.value = (d = Ph(c).filter((h) => h.type === Hr && h.children && typeof h.children == "string")[0]) == null ? void 0 : d.children), g(l.value.component, {
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
function tv(e, t) {
  const n = Q(), i = pe(!1);
  if (Ba) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    nn(() => {
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
function Wi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Q(), i = Q();
  if (Re) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    nn(() => {
      r.disconnect();
    }), be(n, (o, l) => {
      l && (r.unobserve(Mr(l)), i.value = void 0), o && r.observe(Mr(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Dr(i)
  };
}
const u_ = X({
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
  ...Se(),
  ...qr(),
  ...je({
    tag: "div"
  }),
  ...Ye()
}, "VProgressCircular"), nv = fe()({
  name: "VProgressCircular",
  props: u_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = Q(), {
      themeClasses: l
    } = Qe(e), {
      sizeClasses: s,
      sizeStyles: a
    } = Yr(e), {
      textColorClasses: u,
      textColorStyles: c
    } = Jt(oe(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = Jt(oe(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = tv(), {
      resizeRef: m,
      contentRect: p
    } = Wi(), y = k(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = k(() => Number(e.width)), x = k(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = k(() => i / (1 - w.value / x.value) * 2), _ = k(() => w.value / x.value * b.value), E = k(() => ge((100 - y.value) / 100 * r));
    return mn(() => {
      h.value = o.value, m.value = o.value;
    }), he(() => g(e.tag, {
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
      "aria-valuenow": e.indeterminate ? void 0 : y.value
    }, {
      default: () => [g("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${b.value} ${b.value}`
      }, [g("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: d.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": _.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), g("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: i,
        "stroke-width": _.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": E.value
      }, null)]), n.default && g("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: y.value
      })])]
    })), {};
  }
}), Yn = X({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Kn(e) {
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
const c_ = {
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
}, ef = "$vuetify.", tf = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), iv = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(ef))
    return tf(i, o);
  const s = i.replace(ef, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Bs(a, s, null);
  return c || (`${i}${e.value}`, c = Bs(u, s, null)), c || (c = i), typeof c != "string" && (c = i), tf(c, o);
};
function rv(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function ss(e, t, n) {
  const i = $e(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, be(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function ov(e) {
  return (t) => {
    const n = ss(t, "locale", e.current), i = ss(t, "fallback", e.fallback), r = ss(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: iv(n, i, r),
      n: rv(n, i),
      provide: ov({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function f_(e) {
  const t = pe((e == null ? void 0 : e.locale) ?? "en"), n = pe((e == null ? void 0 : e.fallback) ?? "en"), i = Q({
    en: c_,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: iv(t, n, i),
    n: rv(t, n),
    provide: ov({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const nl = Symbol.for("vuetify:locale");
function d_(e) {
  return e.name != null;
}
function h_(e) {
  const t = e != null && e.adapter && d_(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : f_(e), n = m_(t, e);
  return {
    ...t,
    ...n
  };
}
function Kr() {
  const e = Fe(nl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function v_() {
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
function m_(e, t) {
  const n = Q((t == null ? void 0 : t.rtl) ?? v_()), i = k(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: k(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function sn() {
  const e = Fe(nl);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const nf = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Xr = X({
  location: String
}, "location");
function Zr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = sn();
  return {
    locationStyles: k(() => {
      if (!e.location) return {};
      const {
        side: o,
        align: l
      } = Fs(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return o !== "center" && (t ? a[nf[o]] = `calc(100% - ${s(o)}px)` : a[o] = 0), l !== "center" ? t ? a[nf[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (o === "center" ? a.top = a.left = "50%" : a[{
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
const g_ = X({
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
  ...Se(),
  ...Xr({
    location: "top"
  }),
  ...wt(),
  ...je(),
  ...Ye()
}, "VProgressLinear"), lv = fe()({
  name: "VProgressLinear",
  props: g_(),
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
    } = sn(), {
      themeClasses: l
    } = Qe(e), {
      locationStyles: s
    } = Zr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = Jt(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = It(k(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: h
    } = It(e, "color"), {
      roundedClasses: v
    } = xt(e), {
      intersectionRef: m,
      isIntersecting: p
    } = tv(), y = k(() => parseInt(e.max, 10)), w = k(() => parseInt(e.height, 10)), x = k(() => parseFloat(e.bufferValue) / y.value * 100), b = k(() => parseFloat(i.value) / y.value * 100), _ = k(() => r.value !== e.reverse), E = k(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), S = k(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function I($) {
      if (!m.value) return;
      const {
        left: R,
        right: H,
        width: L
      } = m.value.getBoundingClientRect(), N = _.value ? L - $.clientX + (H - L) : $.clientX - R;
      i.value = Math.round(N / L * y.value);
    }
    return he(() => g(e.tag, {
      ref: m,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": _.value,
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
      onClick: e.clickable && I
    }, {
      default: () => [e.stream && g("div", {
        key: "stream",
        class: ["v-progress-linear__stream", a.value],
        style: {
          ...u.value,
          [_.value ? "left" : "right"]: ge(-w.value),
          borderTop: `${ge(w.value / 2)} dotted`,
          opacity: S.value,
          top: `calc(50% - ${ge(w.value / 4)})`,
          width: ge(100 - x.value, "%"),
          "--v-progress-linear-stream-to": ge(w.value * (_.value ? 1 : -1))
        }
      }, null), g("div", {
        class: ["v-progress-linear__background", c.value],
        style: [f.value, {
          opacity: S.value,
          width: ge(e.stream ? x.value : 100, "%")
        }]
      }, null), g(En, {
        name: E.value
      }, {
        default: () => [e.indeterminate ? g("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map(($) => g("div", {
          key: $,
          class: ["v-progress-linear__indeterminate", $, d.value],
          style: h.value
        }, null))]) : g("div", {
          class: ["v-progress-linear__determinate", d.value],
          style: [h.value, {
            width: ge(b.value, "%")
          }]
        }, null)]
      }), n.default && g("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: b.value,
        buffer: x.value
      })])]
    })), {};
  }
}), Ka = X({
  loading: [Boolean, String]
}, "loader");
function Pl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return {
    loaderClasses: k(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Xa(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return g("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || g(lv, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const y_ = ["static", "relative", "fixed", "absolute", "sticky"], Tl = X({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => y_.includes(e)
    )
  }
}, "position");
function Ml(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  return {
    positionClasses: k(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function p_() {
  const e = nt("useRoute");
  return k(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function b_() {
  var e, t;
  return (t = (e = nt("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Al(e, t) {
  const n = bg("RouterLink"), i = k(() => !!(e.href || e.to)), r = k(() => (i == null ? void 0 : i.value) || Nc(t, "click") || Nc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: oe(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = p_();
  return {
    isLink: i,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && k(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && wi(o.route.value.query, l.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (s = o.isActive) == null ? void 0 : s.value;
    }),
    href: k(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const $l = X({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let as = !1;
function w_(e, t) {
  let n = !1, i, r;
  Re && (qe(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      as ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), as = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      as = !1;
    });
  }), ht(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function x_(e, t) {
  be(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && qe(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const js = Symbol("rippleStop"), __ = 80;
function rf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Gs(e) {
  return e.constructor.name === "TouchEvent";
}
function sv(e) {
  return e.constructor.name === "KeyboardEvent";
}
const S_ = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!sv(e)) {
    const d = t.getBoundingClientRect(), h = Gs(e) ? e.touches[e.touches.length - 1] : e;
    i = h.clientX - d.left, r = h.clientY - d.top;
  }
  let o = 0, l = 0.3;
  (f = t._ripple) != null && f.circle ? (l = 0.15, o = t.clientWidth / 2, o = n.center ? o : o + Math.sqrt((i - o) ** 2 + (r - o) ** 2) / 4) : o = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const s = `${(t.clientWidth - o * 2) / 2}px`, a = `${(t.clientHeight - o * 2) / 2}px`, u = n.center ? s : `${i - o}px`, c = n.center ? a : `${r - o}px`;
  return {
    radius: o,
    scale: l,
    x: u,
    y: c,
    centerX: s,
    centerY: a
  };
}, il = {
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
    } = S_(e, t, n), f = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = f, r.style.height = f, t.appendChild(i);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), rf(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), rf(r, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function av(e) {
  return typeof e > "u" || !!e;
}
function Nr(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[js])) {
    if (e[js] = !0, Gs(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || sv(e), n._ripple.class && (t.class = n._ripple.class), Gs(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        il.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, __);
    } else
      il.show(e, n, t);
  }
}
function of(e) {
  e[js] = !0;
}
function kt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        kt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), il.hide(t);
  }
}
function uv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Rr = !1;
function cv(e) {
  !Rr && (e.keyCode === Ic.enter || e.keyCode === Ic.space) && (Rr = !0, Nr(e));
}
function fv(e) {
  Rr = !1, kt(e);
}
function dv(e) {
  Rr && (Rr = !1, kt(e));
}
function hv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = av(i);
  if (o || il.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, Ko(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", of, {
        passive: !0
      }), e.addEventListener("mousedown", of);
      return;
    }
    e.addEventListener("touchstart", Nr, {
      passive: !0
    }), e.addEventListener("touchend", kt, {
      passive: !0
    }), e.addEventListener("touchmove", uv, {
      passive: !0
    }), e.addEventListener("touchcancel", kt), e.addEventListener("mousedown", Nr), e.addEventListener("mouseup", kt), e.addEventListener("mouseleave", kt), e.addEventListener("keydown", cv), e.addEventListener("keyup", fv), e.addEventListener("blur", dv), e.addEventListener("dragstart", kt, {
      passive: !0
    });
  } else !o && n && vv(e);
}
function vv(e) {
  e.removeEventListener("mousedown", Nr), e.removeEventListener("touchstart", Nr), e.removeEventListener("touchend", kt), e.removeEventListener("touchmove", uv), e.removeEventListener("touchcancel", kt), e.removeEventListener("mouseup", kt), e.removeEventListener("mouseleave", kt), e.removeEventListener("keydown", cv), e.removeEventListener("keyup", fv), e.removeEventListener("dragstart", kt), e.removeEventListener("blur", dv);
}
function C_(e, t) {
  hv(e, t, !1);
}
function k_(e) {
  delete e._ripple, vv(e);
}
function E_(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = av(t.oldValue);
  hv(e, t, n);
}
const Si = {
  mounted: C_,
  unmounted: k_,
  updated: E_
}, mv = X({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: Qh
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
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Yn(),
  ...Tn(),
  ...Vl(),
  ...Ka(),
  ...Xr(),
  ...Tl(),
  ...wt(),
  ...$l(),
  ...qr(),
  ...je({
    tag: "button"
  }),
  ...Ye(),
  ...An({
    variant: "elevated"
  })
}, "VBtn"), rt = fe()({
  name: "VBtn",
  directives: {
    Ripple: Si
  },
  props: mv(),
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
    } = Qe(e), {
      borderClasses: o
    } = _i(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Qi(e), {
      densityClasses: u
    } = ln(e), {
      dimensionStyles: c
    } = Kn(e), {
      elevationClasses: f
    } = Mn(e), {
      loaderClasses: d
    } = Pl(e), {
      locationStyles: h
    } = Zr(e), {
      positionClasses: v
    } = Ml(e), {
      roundedClasses: m
    } = xt(e), {
      sizeClasses: p,
      sizeStyles: y
    } = Yr(e), w = Ll(e, e.symbol, !1), x = Al(e, n), b = k(() => {
      var $;
      return e.active !== void 0 ? e.active : x.isLink.value ? ($ = x.isActive) == null ? void 0 : $.value : w == null ? void 0 : w.isSelected.value;
    }), _ = k(() => (w == null ? void 0 : w.disabled.value) || e.disabled), E = k(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), S = k(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function I($) {
      var R;
      _.value || x.isLink.value && ($.metaKey || $.ctrlKey || $.shiftKey || $.button !== 0 || n.target === "_blank") || ((R = x.navigate) == null || R.call(x, $), w == null || w.toggle());
    }
    return x_(x, w == null ? void 0 : w.select), he(() => {
      var C, B;
      const $ = x.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), H = !!(e.appendIcon || i.append), L = !!(e.icon && e.icon !== !0), N = (w == null ? void 0 : w.isSelected.value) && (!x.isLink.value || ((C = x.isActive) == null ? void 0 : C.value)) || !w || ((B = x.isActive) == null ? void 0 : B.value);
      return ze(g($, {
        type: $ === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": _.value,
          "v-btn--elevated": E.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, o.value, N ? l.value : void 0, u.value, f.value, d.value, v.value, m.value, p.value, a.value, e.class],
        style: [N ? s.value : void 0, c.value, h.value, y.value, e.style],
        disabled: _.value || void 0,
        href: x.href.value,
        onClick: I,
        value: S.value
      }, {
        default: () => {
          var M;
          return [Ji(!0, "v-btn"), !e.icon && R && g("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? g(Je, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : g(De, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), g("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && L ? g(De, {
            key: "content-icon",
            icon: e.icon
          }, null) : g(Je, {
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
          })]), !e.icon && H && g("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? g(Je, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : g(De, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && g("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = i.loader) == null ? void 0 : M.call(i)) ?? g(nv, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[en("ripple"), !_.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Nl = fe()({
  name: "VCardActions",
  props: Se(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return yn({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), he(() => {
      var i;
      return g("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), dr = Zi("v-card-subtitle"), Or = Zi("v-card-title");
function V_(e) {
  return {
    aspectStyles: k(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const gv = X({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...Se(),
  ...Yn()
}, "VResponsive"), lf = fe()({
  name: "VResponsive",
  props: gv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = V_(e), {
      dimensionStyles: r
    } = Kn(e);
    return he(() => {
      var o;
      return g("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [r.value, e.style]
      }, [g("div", {
        class: "v-responsive__sizer",
        style: i.value
      }, null), (o = n.additional) == null ? void 0 : o.call(n), n.default && g("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), Jr = X({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Sn = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? Hd : En,
    ...a
  } = typeof i == "object" ? i : {};
  return qn(s, de(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function L_(e, t) {
  if (!Ba) return;
  const n = t.modifiers || {}, i = t.value, {
    handler: r,
    options: o
  } = typeof i == "object" ? i : {
    handler: i,
    options: {}
  }, l = new IntersectionObserver(function() {
    var f;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0;
    const u = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!u) return;
    const c = s.some((d) => d.isIntersecting);
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? yv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function yv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const pv = {
  mounted: L_,
  unmounted: yv
}, I_ = X({
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
  ...gv(),
  ...Se(),
  ...wt(),
  ...Jr()
}, "VImg"), bv = fe()({
  name: "VImg",
  directives: {
    intersect: pv
  },
  props: I_(),
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
    } = It(oe(e, "color")), {
      roundedClasses: l
    } = xt(e), s = nt("VImg"), a = pe(""), u = Q(), c = pe(e.eager ? "loading" : "idle"), f = pe(), d = pe(), h = k(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), v = k(() => h.value.aspect || f.value / d.value || 0);
    be(() => e.src, () => {
      m(c.value !== "idle");
    }), be(v, (L, N) => {
      !L && N && u.value && b(u.value);
    }), gl(() => m());
    function m(L) {
      if (!(e.eager && L) && !(Ba && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const N = new Image();
          N.src = h.value.lazySrc, b(N, null);
        }
        h.value.src && qe(() => {
          var N;
          n("loadstart", ((N = u.value) == null ? void 0 : N.currentSrc) || h.value.src), setTimeout(() => {
            var C;
            if (!s.isUnmounted)
              if ((C = u.value) != null && C.complete) {
                if (u.value.naturalWidth || y(), c.value === "error") return;
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
    function y() {
      var L;
      s.isUnmounted || (c.value = "error", n("error", ((L = u.value) == null ? void 0 : L.currentSrc) || h.value.src));
    }
    function w() {
      const L = u.value;
      L && (a.value = L.currentSrc || L.src);
    }
    let x = -1;
    nn(() => {
      clearTimeout(x);
    });
    function b(L) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const C = () => {
        if (clearTimeout(x), s.isUnmounted) return;
        const {
          naturalHeight: B,
          naturalWidth: M
        } = L;
        B || M ? (f.value = M, d.value = B) : !L.complete && c.value === "loading" && N != null ? x = window.setTimeout(C, N) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
      };
      C();
    }
    const _ = k(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), E = () => {
      var C;
      if (!h.value.src || c.value === "idle") return null;
      const L = g("img", {
        class: ["v-img__img", _.value],
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
        onError: y
      }, null), N = (C = i.sources) == null ? void 0 : C.call(i);
      return g(Sn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ze(N ? g("picture", {
          class: "v-img__picture"
        }, [N, L]) : L, [[Bt, c.value === "loaded"]])]
      });
    }, S = () => g(Sn, {
      transition: e.transition
    }, {
      default: () => [h.value.lazySrc && c.value !== "loaded" && g("img", {
        class: ["v-img__img", "v-img__img--preload", _.value],
        style: {
          objectPosition: e.position
        },
        src: h.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), I = () => i.placeholder ? g(Sn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && g("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? g(Sn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && g("div", {
        class: "v-img__error"
      }, [i.error()])]
    }) : null, R = () => e.gradient ? g("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, H = pe(!1);
    {
      const L = be(v, (N) => {
        N && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            H.value = !0;
          });
        }), L());
      });
    }
    return he(() => {
      const L = lf.filterProps(e);
      return ze(g(lf, de({
        class: ["v-img", {
          "v-img--booting": !H.value
        }, r.value, l.value, e.class],
        style: [{
          width: ge(e.width === "auto" ? f.value : e.width)
        }, o.value, e.style]
      }, L, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => g(Ve, null, [g(E, null, null), g(S, null, null), g(R, null, null), g(I, null, null), g($, null, null)]),
        default: i.default
      }), [[en("intersect"), {
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
}), P_ = X({
  start: Boolean,
  end: Boolean,
  icon: Te,
  image: String,
  text: String,
  ...Se(),
  ...Ht(),
  ...wt(),
  ...qr(),
  ...je(),
  ...Ye(),
  ...An({
    variant: "flat"
  })
}, "VAvatar"), yi = fe()({
  name: "VAvatar",
  props: P_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      colorClasses: r,
      colorStyles: o,
      variantClasses: l
    } = Qi(e), {
      densityClasses: s
    } = ln(e), {
      roundedClasses: a
    } = xt(e), {
      sizeClasses: u,
      sizeStyles: c
    } = Yr(e);
    return he(() => g(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? g(Je, {
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
      }) : e.image ? g(bv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? g(De, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Ji(!1, "v-avatar")]
    })), {};
  }
}), T_ = X({
  appendAvatar: String,
  appendIcon: Te,
  prependAvatar: String,
  prependIcon: Te,
  subtitle: [String, Number],
  title: [String, Number],
  ...Se(),
  ...Ht()
}, "VCardItem"), M_ = fe()({
  name: "VCardItem",
  props: T_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => {
      var u;
      const i = !!(e.prependAvatar || e.prependIcon), r = !!(i || n.prepend), o = !!(e.appendAvatar || e.appendIcon), l = !!(o || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return g("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [r && g("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? g(Je, {
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
      }, n.prepend) : g(Ve, null, [e.prependAvatar && g(yi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && g(De, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), g("div", {
        class: "v-card-item__content"
      }, [s && g(Or, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && g(dr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && g("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? g(Je, {
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
      }, n.append) : g(Ve, null, [e.appendIcon && g(De, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && g(yi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), br = Zi("v-card-text"), A_ = X({
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
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Yn(),
  ...Tn(),
  ...Ka(),
  ...Xr(),
  ...Tl(),
  ...wt(),
  ...$l(),
  ...je(),
  ...Ye(),
  ...An({
    variant: "elevated"
  })
}, "VCard"), Za = fe()({
  name: "VCard",
  directives: {
    Ripple: Si
  },
  props: A_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = Qe(e), {
      borderClasses: o
    } = _i(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = Qi(e), {
      densityClasses: u
    } = ln(e), {
      dimensionStyles: c
    } = Kn(e), {
      elevationClasses: f
    } = Mn(e), {
      loaderClasses: d
    } = Pl(e), {
      locationStyles: h
    } = Zr(e), {
      positionClasses: v
    } = Ml(e), {
      roundedClasses: m
    } = xt(e), p = Al(e, n), y = k(() => e.link !== !1 && p.isLink.value), w = k(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return he(() => {
      const x = y.value ? "a" : e.tag, b = !!(i.title || e.title != null), _ = !!(i.subtitle || e.subtitle != null), E = b || _, S = !!(i.append || e.appendAvatar || e.appendIcon), I = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = E || I || S, H = !!(i.text || e.text != null);
      return ze(g(x, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": w.value
        }, r.value, o.value, l.value, u.value, f.value, d.value, v.value, m.value, a.value, e.class],
        style: [s.value, c.value, h.value, e.style],
        href: p.href.value,
        onClick: w.value && p.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var L;
          return [$ && g("div", {
            key: "image",
            class: "v-card__image"
          }, [i.image ? g(Je, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : g(bv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), g(Xa, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && g(M_, {
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
          }), H && g(br, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = i.text) == null ? void 0 : N.call(i)) ?? e.text];
            }
          }), (L = i.default) == null ? void 0 : L.call(i), i.actions && g(Nl, null, {
            default: i.actions
          }), Ji(w.value, "v-card")];
        }
      }), [[en("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), $_ = X({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Pt(e, t, n) {
  return fe()({
    name: e,
    props: $_({
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
              offsetHeight: f
            } = s;
            s._transitionInitialStyles = {
              position: s.style.position,
              top: s.style.top,
              left: s.style.left,
              width: s.style.width,
              height: s.style.height
            }, s.style.position = "absolute", s.style.top = `${a}px`, s.style.left = `${u}px`, s.style.width = `${c}px`, s.style.height = `${f}px`;
          }
          i.hideOnLeave && s.style.setProperty("display", "none", "important");
        },
        onAfterLeave(s) {
          if (i.leaveAbsolute && (s != null && s._transitionInitialStyles)) {
            const {
              position: a,
              top: u,
              left: c,
              width: f,
              height: d
            } = s._transitionInitialStyles;
            delete s._transitionInitialStyles, s.style.position = a || "", s.style.top = u || "", s.style.left = c || "", s.style.width = f || "", s.style.height = d || "";
          }
        }
      };
      return () => {
        const s = i.group ? Hd : En;
        return qn(s, {
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
function wv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return fe()({
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
      return () => qn(En, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function xv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = dt(`offset-${n}`);
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
const N_ = X({
  target: [Object, Array]
}, "v-dialog-transition"), Ja = fe()({
  name: "VDialogTransition",
  props: N_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = {
      onBeforeEnter(r) {
        r.style.pointerEvents = "none", r.style.visibility = "hidden";
      },
      async onEnter(r, o) {
        var d;
        await new Promise((h) => requestAnimationFrame(h)), await new Promise((h) => requestAnimationFrame(h)), r.style.visibility = "";
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = af(e.target, r), f = ai(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: jx
        });
        (d = sf(r)) == null || d.forEach((h) => {
          ai(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: $r
          });
        }), f.finished.then(() => o());
      },
      onAfterEnter(r) {
        r.style.removeProperty("pointer-events");
      },
      onBeforeLeave(r) {
        r.style.pointerEvents = "none";
      },
      async onLeave(r, o) {
        var d;
        await new Promise((h) => requestAnimationFrame(h));
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = af(e.target, r);
        ai(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: Gx
        }).finished.then(() => o()), (d = sf(r)) == null || d.forEach((h) => {
          ai(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: $r
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? g(En, de({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : g(En, {
      name: "dialog-transition"
    }, n);
  }
});
function sf(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function af(e, t) {
  const n = Rh(e), i = za(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((y) => parseFloat(y)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let a = n.left + n.width / 2;
  l === "left" || s === "left" ? a -= n.width / 2 : (l === "right" || s === "right") && (a += n.width / 2);
  let u = n.top + n.height / 2;
  l === "top" || s === "top" ? u -= n.height / 2 : (l === "bottom" || s === "bottom") && (u += n.height / 2);
  const c = n.width / i.width, f = n.height / i.height, d = Math.max(1, c, f), h = c / d || 0, v = f / d || 0, m = i.width * i.height / (window.innerWidth * window.innerHeight), p = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
  return {
    x: a - (r + i.left),
    y: u - (o + i.top),
    sx: h,
    sy: v,
    speed: p
  };
}
Pt("fab-transition", "center center", "out-in");
Pt("dialog-bottom-transition");
Pt("dialog-top-transition");
const uf = Pt("fade-transition"), _v = Pt("scale-transition");
Pt("scroll-x-transition");
Pt("scroll-x-reverse-transition");
Pt("scroll-y-transition");
Pt("scroll-y-reverse-transition");
Pt("slide-x-transition");
Pt("slide-x-reverse-transition");
const Sv = Pt("slide-y-transition");
Pt("slide-y-reverse-transition");
const Cv = wv("expand-transition", xv()), kv = wv("expand-x-transition", xv("", !0));
function us(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function R_(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function cf(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: i
    } = e, r = i === "left" ? 0 : i === "center" ? t.width / 2 : i === "right" ? t.width : i, o = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return us({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return us({
      x: r,
      y: o
    }, t);
  }
  return us({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Ev = {
  static: F_,
  // specific viewport position, usually centered
  connected: H_
  // connected to a certain element
}, O_ = X({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Ev
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
function B_(e, t) {
  const n = Q({}), i = Q();
  Re && gi(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    be(() => e.locationStrategy, o), ht(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = Ev[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
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
function F_() {
}
function D_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = za(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function H_(e, t, n) {
  (Array.isArray(e.target.value) || qx(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = Ha(() => {
    const v = Fs(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? os(v) : Fs(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === ls(m).align ? {
      preferredAnchor: Oc(v),
      preferredOrigin: Oc(m)
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
  let f = !1;
  const d = new ResizeObserver(() => {
    f && h();
  });
  be([e.target, e.contentEl], (v, m) => {
    let [p, y] = v, [w, x] = m;
    w && !Array.isArray(w) && d.unobserve(w), p && !Array.isArray(p) && d.observe(p), x && d.unobserve(x), y && d.observe(y);
  }, {
    immediate: !0
  }), ht(() => {
    d.disconnect();
  });
  function h() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value) return;
    const v = Rh(e.target.value), m = D_(e.contentEl.value, e.isRtl.value), p = el(e.contentEl.value), y = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((H, L) => {
      const N = L.getBoundingClientRect(), C = new hi({
        x: L === document.documentElement ? 0 : N.x,
        y: L === document.documentElement ? 0 : N.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return H ? new hi({
        x: Math.max(H.left, C.left),
        y: Math.max(H.top, C.top),
        width: Math.min(H.right, C.right) - Math.max(H.left, C.left),
        height: Math.min(H.bottom, C.bottom) - Math.max(H.top, C.top)
      }) : C;
    }, void 0);
    w.x += y, w.y += y, w.width -= y * 2, w.height -= y * 2;
    let x = {
      anchor: r.value,
      origin: o.value
    };
    function b(H) {
      const L = new hi(m), N = cf(H.anchor, v), C = cf(H.origin, L);
      let {
        x: B,
        y: M
      } = R_(N, C);
      switch (H.anchor.side) {
        case "top":
          M -= c.value[0];
          break;
        case "bottom":
          M += c.value[0];
          break;
        case "left":
          B -= c.value[0];
          break;
        case "right":
          B += c.value[0];
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
          B -= c.value[1];
          break;
        case "right":
          B += c.value[1];
          break;
      }
      return L.x += B, L.y += M, L.width = Math.min(L.width, a.value), L.height = Math.min(L.height, u.value), {
        overflows: Fc(L, w),
        x: B,
        y: M
      };
    }
    let _ = 0, E = 0;
    const S = {
      x: 0,
      y: 0
    }, I = {
      x: !1,
      y: !1
    };
    let $ = -1;
    for (; !($++ > 10); ) {
      const {
        x: H,
        y: L,
        overflows: N
      } = b(x);
      _ += H, E += L, m.x += H, m.y += L;
      {
        const C = Bc(x.anchor), B = N.x.before || N.x.after, M = N.y.before || N.y.after;
        let z = !1;
        if (["x", "y"].forEach((A) => {
          if (A === "x" && B && !I.x || A === "y" && M && !I.y) {
            const F = {
              anchor: {
                ...x.anchor
              },
              origin: {
                ...x.origin
              }
            }, O = A === "x" ? C === "y" ? ls : os : C === "y" ? os : ls;
            F.anchor = O(F.anchor), F.origin = O(F.origin);
            const {
              overflows: D
            } = b(F);
            (D[A].before <= N[A].before && D[A].after <= N[A].after || D[A].before + D[A].after < (N[A].before + N[A].after) / 2) && (x = F, z = I[A] = !0);
          }
        }), z) continue;
      }
      N.x.before && (_ += N.x.before, m.x += N.x.before), N.x.after && (_ -= N.x.after, m.x -= N.x.after), N.y.before && (E += N.y.before, m.y += N.y.before), N.y.after && (E -= N.y.after, m.y -= N.y.after);
      {
        const C = Fc(m, w);
        S.x = w.width - C.x.before - C.x.after, S.y = w.height - C.y.before - C.y.after, _ += C.x.before, m.x += C.x.before, E += C.y.before, m.y += C.y.before;
      }
      break;
    }
    const R = Bc(x.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ge(cs(E)),
      left: e.isRtl.value ? void 0 : ge(cs(_)),
      right: e.isRtl.value ? ge(cs(-_)) : void 0,
      minWidth: ge(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: ge(ff(Et(S.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: ge(ff(Et(S.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: S,
      contentBox: m
    };
  }
  return be(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), qe(() => {
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
function cs(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function ff(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Us = !0;
const rl = [];
function z_(e) {
  !Us || rl.length ? (rl.push(e), Ws()) : (Us = !1, e(), Ws());
}
let df = -1;
function Ws() {
  cancelAnimationFrame(df), df = requestAnimationFrame(() => {
    const e = rl.shift();
    e && e(), rl.length ? Ws() : Us = !0;
  });
}
const Mo = {
  none: null,
  close: U_,
  block: W_,
  reposition: q_
}, j_ = X({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Mo
  }
}, "VOverlay-scroll-strategies");
function G_(e, t) {
  if (!Re) return;
  let n;
  mn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = ca(), await qe(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = Mo[e.scrollStrategy]) == null || i.call(Mo, t, e, n);
    }));
  }), ht(() => {
    n == null || n.stop();
  });
}
function U_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Vv(e.targetEl.value ?? e.contentEl.value, t);
}
function W_(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...el(e.targetEl.value, t.contained ? n : void 0), ...el(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Wa(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", ge(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ge(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ge(r)), s.classList.add("v-overlay-scroll-blocked");
  }), ht(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), f = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function q_(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    z_(() => {
      var c, f;
      const a = performance.now();
      (f = (c = e.updateLocation).value) == null || f.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      Vv(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), ht(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function Vv(e, t) {
  const n = [document, ...el(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), ht(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const qs = Symbol.for("vuetify:v-menu"), Y_ = X({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function K_(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = mx(s, () => {
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
const X_ = X({
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
  ...Y_()
}, "VOverlay-activator");
function Z_(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = nt("useActivator"), o = Q();
  let l = !1, s = !1, a = !0;
  const u = k(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = k(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = K_(e, (S) => {
    S === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== S && (a = !0), n.value = S);
  }), h = Q(), v = {
    onClick: (S) => {
      S.stopPropagation(), o.value = S.currentTarget || S.target, n.value || (h.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      var I;
      (I = S.sourceCapabilities) != null && I.firesTouchEvents || (l = !0, o.value = S.currentTarget || S.target, f());
    },
    onMouseleave: (S) => {
      l = !1, d();
    },
    onFocus: (S) => {
      Jo(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), o.value = S.currentTarget || S.target, f());
    },
    onBlur: (S) => {
      s = !1, S.stopPropagation(), d();
    }
  }, m = k(() => {
    const S = {};
    return c.value && (S.onClick = v.onClick), e.openOnHover && (S.onMouseenter = v.onMouseenter, S.onMouseleave = v.onMouseleave), u.value && (S.onFocus = v.onFocus, S.onBlur = v.onBlur), S;
  }), p = k(() => {
    const S = {};
    if (e.openOnHover && (S.onMouseenter = () => {
      l = !0, f();
    }, S.onMouseleave = () => {
      l = !1, d();
    }), u.value && (S.onFocusin = () => {
      s = !0, f();
    }, S.onFocusout = () => {
      s = !1, d();
    }), e.closeOnContentClick) {
      const I = Fe(qs, null);
      S.onClick = () => {
        n.value = !1, I == null || I.closeParents();
      };
    }
    return S;
  }), y = k(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      a && (l = !0, a = !1, f());
    }, S.onMouseleave = () => {
      l = !1, d();
    }), S;
  });
  be(i, (S) => {
    S && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), be(n, (S) => {
    S || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = Q();
  mn(() => {
    w.value && qe(() => {
      o.value = Mr(w.value);
    });
  });
  const x = Q(), b = k(() => e.target === "cursor" && h.value ? h.value : x.value ? Mr(x.value) : Lv(e.target, r) || o.value), _ = k(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return be(() => !!e.activator, (S) => {
    S && Re ? (E = ca(), E.run(() => {
      J_(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), ht(() => {
    E == null || E.stop();
  }), {
    activatorEl: o,
    activatorRef: w,
    target: b,
    targetEl: _,
    targetRef: x,
    activatorEvents: m,
    contentEvents: p,
    scrimEvents: y
  };
}
function J_(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  be(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && qe(() => o());
  }, {
    immediate: !0
  }), be(() => e.activatorProps, () => {
    o();
  }), ht(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && px(a, de(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && bx(a, de(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Lv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function Lv(e, t) {
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
const Rl = ["sm", "md", "lg", "xl", "xxl"], Ys = Symbol.for("vuetify:display"), hf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, Q_ = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : hf;
  return Vt(hf, e);
};
function vf(e) {
  return Re && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function mf(e) {
  return Re && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function gf(e) {
  const t = Re && !e ? window.navigator.userAgent : "ssr";
  function n(v) {
    return !!t.match(v);
  }
  const i = n(/android/i), r = n(/iphone|ipad|ipod/i), o = n(/cordova/i), l = n(/electron/i), s = n(/chrome/i), a = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), f = n(/win/i), d = n(/mac/i), h = n(/linux/i);
  return {
    android: i,
    ios: r,
    cordova: o,
    electron: l,
    chrome: s,
    edge: a,
    firefox: u,
    opera: c,
    win: f,
    mac: d,
    linux: h,
    touch: ux,
    ssr: t === "ssr"
  };
}
function e2(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = Q_(e), r = pe(mf(t)), o = pe(gf(t)), l = Qt({}), s = pe(vf(t));
  function a() {
    r.value = mf(), s.value = vf();
  }
  function u() {
    a(), o.value = gf();
  }
  return mn(() => {
    const c = s.value < n.sm, f = s.value < n.md && !c, d = s.value < n.lg && !(f || c), h = s.value < n.xl && !(d || f || c), v = s.value < n.xxl && !(h || d || f || c), m = s.value >= n.xxl, p = c ? "xs" : f ? "sm" : d ? "md" : h ? "lg" : v ? "xl" : "xxl", y = typeof i == "number" ? i : n[i], w = s.value < y;
    l.xs = c, l.sm = f, l.md = d, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || f), l.lgAndUp = !(c || f || d), l.xlAndUp = !(c || f || d || h), l.smAndDown = !(d || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = p, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Re && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...pa(l),
    update: u,
    ssr: !!t
  };
}
const t2 = X({
  mobileBreakpoint: [Number, String]
}, "display");
function Qa() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  const n = Fe(Ys);
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
function n2() {
  if (!Re) return pe(!1);
  const {
    ssr: e
  } = Qa();
  if (e) {
    const t = pe(!1);
    return tn(() => {
      t.value = !0;
    }), t;
  } else
    return pe(!0);
}
const Ol = X({
  eager: Boolean
}, "lazy");
function eu(e, t) {
  const n = pe(!1), i = k(() => n.value || e.eager || t.value);
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
function Qr() {
  const t = nt("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const yf = Symbol.for("vuetify:stack"), sr = Qt([]);
function i2(e, t, n) {
  const i = nt("useStack"), r = !n, o = Fe(yf, void 0), l = Qt({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ot(yf, l);
  const s = pe(+t.value);
  gi(e, () => {
    var f;
    const c = (f = sr.at(-1)) == null ? void 0 : f[1];
    s.value = c ? c + 10 : +t.value, r && sr.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), ht(() => {
      if (r) {
        const d = _e(sr).findIndex((h) => h[0] === i.uid);
        sr.splice(d, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = pe(!0);
  r && mn(() => {
    var f;
    const c = ((f = sr.at(-1)) == null ? void 0 : f[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = k(() => !l.activeChildren.size);
  return {
    globalTop: Dr(a),
    localTop: u,
    stackStyles: k(() => ({
      zIndex: s.value
    }))
  };
}
function r2(e) {
  return {
    teleportTarget: k(() => {
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
function o2() {
  return !0;
}
function Iv(e, t, n) {
  if (!e || Pv(e, n) === !1) return !1;
  const i = Yh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Pv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || o2)(e);
}
function l2(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Iv(e, t, n) && setTimeout(() => {
    Pv(e, n) && i && i(e);
  }, 0);
}
function pf(e, t) {
  const n = Yh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const s2 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => l2(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = Iv(r, e, t);
    };
    pf(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", i, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: i
    };
  },
  unmounted(e, t) {
    e._clickOutside && (pf(e, (n) => {
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
function a2(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return g(En, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && g("div", de({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const eo = X({
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
  ...X_(),
  ...Se(),
  ...Yn(),
  ...Ol(),
  ...O_(),
  ...j_(),
  ...Ye(),
  ...Jr()
}, "VOverlay"), Wn = fe()({
  name: "VOverlay",
  directives: {
    ClickOutside: s2
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...eo()
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
    const o = $e(e, "modelValue"), l = k({
      get: () => o.value,
      set: (ee) => {
        ee && e.disabled || (o.value = ee);
      }
    }), {
      teleportTarget: s
    } = r2(k(() => e.attach || e.contained)), {
      themeClasses: a
    } = Qe(e), {
      rtlClasses: u,
      isRtl: c
    } = sn(), {
      hasContent: f,
      onAfterLeave: d
    } = eu(e, l), h = It(k(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: p
    } = i2(l, oe(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: y,
      activatorRef: w,
      target: x,
      targetEl: b,
      targetRef: _,
      activatorEvents: E,
      contentEvents: S,
      scrimEvents: I
    } = Z_(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = Kn(e), R = n2(), {
      scopeId: H
    } = Qr();
    be(() => e.disabled, (ee) => {
      ee && (l.value = !1);
    });
    const L = Q(), N = Q(), {
      contentStyles: C,
      updateLocation: B
    } = B_(e, {
      isRtl: c,
      contentEl: N,
      target: x,
      isActive: l
    });
    G_(e, {
      root: L,
      contentEl: N,
      targetEl: b,
      isActive: l,
      updateLocation: B
    });
    function M(ee) {
      r("click:outside", ee), e.persistent ? D() : l.value = !1;
    }
    function z() {
      return l.value && v.value;
    }
    Re && be(l, (ee) => {
      ee ? window.addEventListener("keydown", A) : window.removeEventListener("keydown", A);
    }, {
      immediate: !0
    }), nn(() => {
      Re && window.removeEventListener("keydown", A);
    });
    function A(ee) {
      var ce, me;
      ee.key === "Escape" && v.value && (e.persistent ? D() : (l.value = !1, (ce = N.value) != null && ce.contains(document.activeElement) && ((me = y.value) == null || me.focus())));
    }
    const F = b_();
    gi(() => e.closeOnBack, () => {
      w_(F, (ee) => {
        v.value && l.value ? (ee(!1), e.persistent ? D() : l.value = !1) : ee();
      });
    });
    const O = Q();
    be(() => l.value && (e.absolute || e.contained) && s.value == null, (ee) => {
      if (ee) {
        const ce = Xh(L.value);
        ce && ce !== document.scrollingElement && (O.value = ce.scrollTop);
      }
    });
    function D() {
      e.noClickAnimation || N.value && ai(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: $r
      });
    }
    function Y() {
      d(), r("afterLeave");
    }
    return he(() => {
      var ee;
      return g(Ve, null, [(ee = n.activator) == null ? void 0 : ee.call(n, {
        isActive: l.value,
        props: de({
          ref: w,
          targetRef: _
        }, E.value, e.activatorProps)
      }), R.value && f.value && g(n0, {
        disabled: !s.value,
        to: s.value
      }, {
        default: () => [g("div", de({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": l.value,
            "v-overlay--contained": e.contained
          }, a.value, u.value, e.class],
          style: [p.value, {
            "--v-overlay-opacity": e.opacity,
            top: ge(O.value)
          }, e.style],
          ref: L
        }, H, i), [g(a2, de({
          color: h,
          modelValue: l.value && !!e.scrim
        }, I.value), null), g(Sn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var ce;
            return [ze(g("div", de({
              ref: N,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, C.value]
            }, S.value, e.contentProps), [(ce = n.default) == null ? void 0 : ce.call(n, {
              isActive: l
            })]), [[Bt, l.value], [en("click-outside"), {
              handler: M,
              closeConditional: z,
              include: () => [y.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: y,
      target: x,
      animateClick: D,
      contentEl: N,
      globalTop: v,
      localTop: m,
      updateLocation: B
    };
  }
}), fs = Symbol("Forwarded refs");
function ds(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i) return i;
    n = Object.getPrototypeOf(n);
  }
}
function Xn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[fs] = n, new Proxy(e, {
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
          const u = ds(a.value, o) ?? ("_" in a.value ? ds((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[fs];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const f = c.shift(), d = ds(f.value, o);
            if (d) return d;
            const h = f.value && f.value[fs];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const u2 = X({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...eo({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: Ja
    },
    zIndex: 2400
  })
}, "VDialog"), tu = fe()({
  name: "VDialog",
  props: u2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = Qr(), o = Q();
    function l(a) {
      var f, d;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((f = o.value) != null && f.contentEl) && // We're the topmost dialog
      ((d = o.value) != null && d.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Ar(o.value.contentEl);
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
      await qe(), a ? (u = o.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = k(() => de({
      "aria-haspopup": "dialog",
      "aria-expanded": String(i.value)
    }, e.activatorProps));
    return he(() => {
      const a = Wn.filterProps(e);
      return g(Wn, de({
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
          for (var u = arguments.length, c = new Array(u), f = 0; f < u; f++)
            c[f] = arguments[f];
          return g(Je, {
            root: "VDialog"
          }, {
            default: () => {
              var d;
              return [(d = n.default) == null ? void 0 : d.call(n, ...c)];
            }
          });
        }
      });
    }), Xn({}, o);
  }
});
function bf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function wf(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: i,
    isRtl: r,
    currentScrollOffset: o,
    isHorizontal: l
  } = e;
  const s = l ? t.clientWidth : t.clientHeight, a = l ? t.offsetLeft : t.offsetTop, u = r && l ? i - a - s : a, c = n + o, f = s + u, d = s * 0.4;
  return u <= o ? o = Math.max(u - d, 0) : c <= f && (o = Math.min(o - (c - f - d), i - n)), o;
}
function c2(e) {
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
const f2 = Symbol.for("vuetify:v-slide-group"), nu = X({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: f2
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
  ...Se(),
  ...t2(),
  ...je(),
  ...El({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), ol = fe()({
  name: "VSlideGroup",
  props: nu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = sn(), {
      displayClasses: r,
      mobile: o
    } = Qa(e), l = Wr(e, e.symbol), s = pe(!1), a = pe(0), u = pe(0), c = pe(0), f = k(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: h
    } = Wi(), {
      resizeRef: v,
      contentRect: m
    } = Wi(), p = k(() => l.selected.value.length ? l.items.value.findIndex((D) => D.id === l.selected.value[0]) : -1), y = k(() => l.selected.value.length ? l.items.value.findIndex((D) => D.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Re) {
      let D = -1;
      be(() => [l.selected.value, h.value, m.value, f.value], () => {
        cancelAnimationFrame(D), D = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const Y = f.value ? "width" : "height";
            u.value = h.value[Y], c.value = m.value[Y], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const Y = v.value.children[y.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = c2({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: f.value
            }) : s.value && (a.value = wf({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              currentScrollOffset: a.value,
              isHorizontal: f.value
            }));
          }
        });
      });
    }
    const w = pe(!1);
    let x = 0, b = 0;
    function _(D) {
      const Y = f.value ? "clientX" : "clientY";
      b = (i.value && f.value ? -1 : 1) * a.value, x = D.touches[0][Y], w.value = !0;
    }
    function E(D) {
      if (!s.value) return;
      const Y = f.value ? "clientX" : "clientY", ee = i.value && f.value ? -1 : 1;
      a.value = ee * (b + x - D.touches[0][Y]);
    }
    function S(D) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function I() {
      d.value && (d.value[f.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = pe(!1);
    function R(D) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const Y of D.composedPath())
          for (const ee of v.value.children)
            if (ee === Y) {
              a.value = wf({
                selectedElement: ee,
                containerSize: u.value,
                contentSize: c.value,
                isRtl: i.value,
                currentScrollOffset: a.value,
                isHorizontal: f.value
              });
              return;
            }
      }
    }
    function H(D) {
      $.value = !1;
    }
    function L(D) {
      var Y;
      !$.value && !(D.relatedTarget && ((Y = v.value) != null && Y.contains(D.relatedTarget))) && C();
    }
    function N(D) {
      v.value && (f.value ? D.key === "ArrowRight" ? C(i.value ? "prev" : "next") : D.key === "ArrowLeft" && C(i.value ? "next" : "prev") : D.key === "ArrowDown" ? C("next") : D.key === "ArrowUp" && C("prev"), D.key === "Home" ? C("first") : D.key === "End" && C("last"));
    }
    function C(D) {
      var Y, ee, ce, me, J;
      if (v.value)
        if (!D)
          (Y = Ar(v.value)[0]) == null || Y.focus();
        else if (D === "next") {
          const ue = (ee = v.value.querySelector(":focus")) == null ? void 0 : ee.nextElementSibling;
          ue ? ue.focus() : C("first");
        } else if (D === "prev") {
          const ue = (ce = v.value.querySelector(":focus")) == null ? void 0 : ce.previousElementSibling;
          ue ? ue.focus() : C("last");
        } else D === "first" ? (me = v.value.firstElementChild) == null || me.focus() : D === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function B(D) {
      const Y = a.value + (D === "prev" ? -1 : 1) * u.value;
      a.value = Et(Y, 0, c.value - u.value);
    }
    const M = k(() => {
      let D = a.value > c.value - u.value ? -(c.value - u.value) + bf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (D = bf(-a.value));
      const Y = i.value && f.value ? -1 : 1;
      return {
        transform: `translate${f.value ? "X" : "Y"}(${Y * D}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), z = k(() => ({
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
    return he(() => g(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !f.value,
        "v-slide-group--has-affixes": A.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: L
    }, {
      default: () => {
        var D, Y, ee;
        return [A.value && g("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && B("prev")
        }, [((D = n.prev) == null ? void 0 : D.call(n, z.value)) ?? g(uf, null, {
          default: () => [g(De, {
            icon: i.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), g("div", {
          key: "container",
          ref: d,
          class: "v-slide-group__container",
          onScroll: I
        }, [g("div", {
          ref: v,
          class: "v-slide-group__content",
          style: M.value,
          onTouchstartPassive: _,
          onTouchmovePassive: E,
          onTouchendPassive: S,
          onFocusin: R,
          onFocusout: H,
          onKeydown: N
        }, [(Y = n.default) == null ? void 0 : Y.call(n, z.value)])]), A.value && g("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !O.value
          }],
          onClick: () => O.value && B("next")
        }, [((ee = n.next) == null ? void 0 : ee.call(n, z.value)) ?? g(uf, null, {
          default: () => [g(De, {
            icon: i.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: l.selected,
      scrollTo: B,
      scrollOffset: a,
      focus: C
    };
  }
}), Tv = Symbol.for("vuetify:v-chip-group"), d2 = X({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: wi
  },
  ...nu(),
  ...Se(),
  ...El({
    selectedClass: "v-chip--selected"
  }),
  ...je(),
  ...Ye(),
  ...An({
    variant: "tonal"
  })
}, "VChipGroup");
fe()({
  name: "VChipGroup",
  props: d2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      isSelected: r,
      select: o,
      next: l,
      prev: s,
      selected: a
    } = Wr(e, Tv);
    return yn({
      VChip: {
        color: oe(e, "color"),
        disabled: oe(e, "disabled"),
        filter: oe(e, "filter"),
        variant: oe(e, "variant")
      }
    }), he(() => {
      const u = ol.filterProps(e);
      return g(ol, de(u, {
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
const h2 = X({
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
  onClick: Zt(),
  onClickOnce: Zt(),
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Tn(),
  ...Vl(),
  ...wt(),
  ...$l(),
  ...qr(),
  ...je({
    tag: "span"
  }),
  ...Ye(),
  ...An({
    variant: "tonal"
  })
}, "VChip"), Mv = fe()({
  name: "VChip",
  directives: {
    Ripple: Si
  },
  props: h2(),
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
    } = Kr(), {
      borderClasses: l
    } = _i(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = Qi(e), {
      densityClasses: c
    } = ln(e), {
      elevationClasses: f
    } = Mn(e), {
      roundedClasses: d
    } = xt(e), {
      sizeClasses: h
    } = Yr(e), {
      themeClasses: v
    } = Qe(e), m = $e(e, "modelValue"), p = Ll(e, Tv, !1), y = Al(e, n), w = k(() => e.link !== !1 && y.isLink.value), x = k(() => !e.disabled && e.link !== !1 && (!!p || e.link || y.isClickable.value)), b = k(() => ({
      "aria-label": o(e.closeLabel),
      onClick(S) {
        S.stopPropagation(), m.value = !1, i("click:close", S);
      }
    }));
    function _(S) {
      var I;
      i("click", S), x.value && ((I = y.navigate) == null || I.call(y, S), p == null || p.toggle());
    }
    function E(S) {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), _(S));
    }
    return () => {
      const S = y.isLink.value ? "a" : e.tag, I = !!(e.appendIcon || e.appendAvatar), $ = !!(I || r.append), R = !!(r.close || e.closable), H = !!(r.filter || e.filter) && p, L = !!(e.prependIcon || e.prependAvatar), N = !!(L || r.prepend), C = !p || p.isSelected.value;
      return m.value && ze(g(S, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": x.value,
          "v-chip--filter": H,
          "v-chip--pill": e.pill
        }, v.value, l.value, C ? s.value : void 0, c.value, f.value, d.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [C ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: y.href.value,
        tabindex: x.value ? 0 : void 0,
        onClick: _,
        onKeydown: x.value && !w.value && E
      }, {
        default: () => {
          var B;
          return [Ji(x.value, "v-chip"), H && g(kv, {
            key: "filter"
          }, {
            default: () => [ze(g("div", {
              class: "v-chip__filter"
            }, [r.filter ? g(Je, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : g(De, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Bt, p.isSelected.value]])]
          }), N && g("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? g(Je, {
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
          }, r.prepend) : g(Ve, null, [e.prependIcon && g(De, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && g(yi, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), g("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((B = r.default) == null ? void 0 : B.call(r, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), $ && g("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? g(Je, {
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
          }, r.append) : g(Ve, null, [e.appendIcon && g(De, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(yi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && g("button", de({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? g(Je, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : g(De, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[en("ripple"), x.value && e.ripple, null]]);
    };
  }
}), v2 = X({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Se(),
  ...Jr({
    transition: {
      component: Sv
    }
  })
}, "VCounter"), Av = fe()({
  name: "VCounter",
  functional: !0,
  props: v2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return he(() => g(Sn, {
      transition: e.transition
    }, {
      default: () => [ze(g("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[Bt, e.active]])]
    })), {};
  }
}), m2 = X({
  text: String,
  onClick: Zt(),
  ...Se(),
  ...Ye()
}, "VLabel"), Bl = fe()({
  name: "VLabel",
  props: m2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => {
      var i;
      return g("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (i = n.default) == null ? void 0 : i.call(n)]);
    }), {};
  }
}), g2 = X({
  floating: Boolean,
  ...Se()
}, "VFieldLabel"), wo = fe()({
  name: "VFieldLabel",
  props: g2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => g(Bl, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function $v(e) {
  const {
    t
  } = Kr();
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
    return g(De, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const iu = X({
  focused: Boolean,
  "onUpdate:focused": Zt()
}, "focus");
function er(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn();
  const n = $e(e, "focused"), i = k(() => ({
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
const y2 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], ru = X({
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
    validator: (e) => y2.includes(e)
  },
  "onClick:clear": Zt(),
  "onClick:appendInner": Zt(),
  "onClick:prependInner": Zt(),
  ...Se(),
  ...Ka(),
  ...wt(),
  ...Ye()
}, "VField"), ou = fe()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...iu(),
    ...ru()
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
    } = Qe(e), {
      loaderClasses: l
    } = Pl(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = er(e), {
      InputIcon: f
    } = $v(e), {
      roundedClasses: d
    } = xt(e), {
      rtlClasses: h
    } = sn(), v = k(() => e.dirty || e.active), m = k(() => !e.singleLine && !!(e.label || r.label)), p = bt(), y = k(() => e.id || `input-${p}`), w = k(() => `${y.value}-messages`), x = Q(), b = Q(), _ = Q(), E = k(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: S,
      backgroundColorStyles: I
    } = It(oe(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = Jt(k(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    be(v, (N) => {
      if (m.value) {
        const C = x.value.$el, B = b.value.$el;
        requestAnimationFrame(() => {
          const M = za(C), z = B.getBoundingClientRect(), A = z.x - M.x, F = z.y - M.y - (M.height / 2 - z.height / 2), O = z.width / 0.75, D = Math.abs(O - M.width) > 1 ? {
            maxWidth: ge(O)
          } : void 0, Y = getComputedStyle(C), ee = getComputedStyle(B), ce = parseFloat(Y.transitionDuration) * 1e3 || 150, me = parseFloat(ee.getPropertyValue("--v-field-label-scale")), J = ee.getPropertyValue("color");
          C.style.visibility = "visible", B.style.visibility = "hidden", ai(C, {
            transform: `translate(${A}px, ${F}px) scale(${me})`,
            color: J,
            ...D
          }, {
            duration: ce,
            easing: $r,
            direction: N ? "normal" : "reverse"
          }).finished.then(() => {
            C.style.removeProperty("visibility"), B.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const H = k(() => ({
      isActive: v,
      isFocused: a,
      controlRef: _,
      blur: c,
      focus: u
    }));
    function L(N) {
      N.target !== document.activeElement && N.preventDefault();
    }
    return he(() => {
      var A, F, O;
      const N = e.variant === "outlined", C = r["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || r.clear), M = !!(r["append-inner"] || e.appendInnerIcon || B), z = () => r.label ? r.label({
        ...H.value,
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label;
      return g("div", de({
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
          "v-field--prepended": C,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !z(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, S.value, s.value, l.value, d.value, h.value, e.class],
        style: [I.value, e.style],
        onClick: L
      }, n), [g("div", {
        class: "v-field__overlay"
      }, null), g(Xa, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: r.loader
      }), C && g("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && g(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (A = r["prepend-inner"]) == null ? void 0 : A.call(r, H.value)]), g("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && g(wo, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: y.value,
        style: R.value
      }, {
        default: () => [z()]
      }), g(wo, {
        ref: x,
        for: y.value
      }, {
        default: () => [z()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...H.value,
        props: {
          id: y.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), B && g(kv, {
        key: "clear"
      }, {
        default: () => [ze(g("div", {
          class: "v-field__clearable",
          onMousedown: (D) => {
            D.preventDefault(), D.stopPropagation();
          }
        }, [r.clear ? r.clear() : g(f, {
          name: "clear"
        }, null)]), [[Bt, e.dirty]])]
      }), M && g("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(O = r["append-inner"]) == null ? void 0 : O.call(r, H.value), e.appendInnerIcon && g(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), g("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [N && g(Ve, null, [g("div", {
        class: "v-field__outline__start"
      }, null), m.value && g("div", {
        class: "v-field__outline__notch"
      }, [g(wo, {
        ref: b,
        floating: !0,
        for: y.value
      }, {
        default: () => [z()]
      })]), g("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && m.value && g(wo, {
        ref: b,
        floating: !0,
        for: y.value
      }, {
        default: () => [z()]
      })])]);
    }), {
      controlRef: _
    };
  }
});
function Nv(e) {
  const t = Object.keys(ou.props).filter((n) => !Da(n) && n !== "class" && n !== "style");
  return Lh(e, t);
}
const p2 = X({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Se(),
  ...Jr({
    transition: {
      component: Sv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), b2 = fe()({
  name: "VMessages",
  props: p2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => vn(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = Jt(k(() => e.color));
    return he(() => g(Sn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", r.value, e.class],
      style: [o.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && i.value.map((l, s) => g("div", {
        class: "v-messages__message",
        key: `${s}-${i.value}`
      }, [n.message ? n.message({
        message: l
      }) : l]))]
    })), {};
  }
}), w2 = Symbol.for("vuetify:form");
function Rv() {
  return Fe(w2, null);
}
const x2 = X({
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
  ...iu()
}, "validation");
function _2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : bt();
  const i = $e(e, "modelValue"), r = k(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Rv(), l = Q([]), s = pe(!0), a = k(() => !!(vn(i.value === "" ? null : i.value).length || vn(r.value === "" ? null : r.value).length)), u = k(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = k(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = k(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? vn(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
  }), d = k(() => {
    let b = (e.validateOn ?? (o == null ? void 0 : o.validateOn.value)) || "input";
    b === "lazy" && (b = "input lazy");
    const _ = new Set((b == null ? void 0 : b.split(" ")) ?? []);
    return {
      blur: _.has("blur") || _.has("input"),
      input: _.has("input"),
      submit: _.has("submit"),
      lazy: _.has("lazy")
    };
  }), h = k(() => {
    var b;
    return e.error || (b = e.errorMessages) != null && b.length ? !1 : e.rules.length ? s.value ? l.value.length || d.value.lazy ? null : !0 : !l.value.length : !0;
  }), v = pe(!1), m = k(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = k(() => e.name ?? Kt(n));
  gl(() => {
    o == null || o.register({
      id: p.value,
      validate: x,
      reset: y,
      resetValidation: w
    });
  }), nn(() => {
    o == null || o.unregister(p.value);
  }), tn(async () => {
    d.value.lazy || await x(!0), o == null || o.update(p.value, h.value, f.value);
  }), gi(() => d.value.input, () => {
    be(r, () => {
      if (r.value != null)
        x();
      else if (e.focused) {
        const b = be(() => e.focused, (_) => {
          _ || x(), b();
        });
      }
    });
  }), gi(() => d.value.blur, () => {
    be(() => e.focused, (b) => {
      b || x();
    });
  }), be([h, f], () => {
    o == null || o.update(p.value, h.value, f.value);
  });
  function y() {
    i.value = null, qe(w);
  }
  function w() {
    s.value = !0, d.value.lazy ? l.value = [] : x(!0);
  }
  async function x() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const _ = [];
    v.value = !0;
    for (const E of e.rules) {
      if (_.length >= +(e.maxErrors ?? 1))
        break;
      const I = await (typeof E == "function" ? E : () => E)(r.value);
      if (I !== !0) {
        if (I !== !1 && typeof I != "string") {
          console.warn(`${I} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        _.push(I || "");
      }
    }
    return l.value = _, v.value = !1, s.value = b, l.value;
  }
  return {
    errorMessages: f,
    isDirty: a,
    isDisabled: u,
    isReadonly: c,
    isPristine: s,
    isValid: h,
    isValidating: v,
    reset: y,
    resetValidation: w,
    validate: x,
    validationClasses: m
  };
}
const Ci = X({
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
  "onClick:prepend": Zt(),
  "onClick:append": Zt(),
  ...Se(),
  ...Ht(),
  ...x2()
}, "VInput"), Ft = fe()({
  name: "VInput",
  props: {
    ...Ci()
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
    } = ln(e), {
      rtlClasses: l
    } = sn(), {
      InputIcon: s
    } = $v(e), a = bt(), u = k(() => e.id || `input-${a}`), c = k(() => `${u.value}-messages`), {
      errorMessages: f,
      isDirty: d,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: y,
      reset: w,
      resetValidation: x,
      validate: b,
      validationClasses: _
    } = _2(e, "v-input", u), E = k(() => ({
      id: u,
      messagesId: c,
      isDirty: d,
      isDisabled: h,
      isReadonly: v,
      isPristine: m,
      isValid: p,
      isValidating: y,
      reset: w,
      resetValidation: x,
      validate: b
    })), S = k(() => {
      var I;
      return (I = e.errorMessages) != null && I.length || !m.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return he(() => {
      var L, N, C, B;
      const I = !!(i.prepend || e.prependIcon), $ = !!(i.append || e.appendIcon), R = S.value.length > 0, H = !e.hideDetails || e.hideDetails === "auto" && (R || !!i.details);
      return g("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, o.value, l.value, _.value, e.class],
        style: e.style
      }, [I && g("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(L = i.prepend) == null ? void 0 : L.call(i, E.value), e.prependIcon && g(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), i.default && g("div", {
        class: "v-input__control"
      }, [(N = i.default) == null ? void 0 : N.call(i, E.value)]), $ && g("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && g(s, {
        key: "append-icon",
        name: "append"
      }, null), (C = i.append) == null ? void 0 : C.call(i, E.value)]), H && g("div", {
        class: "v-input__details"
      }, [g(b2, {
        id: c.value,
        active: R,
        messages: S.value
      }, {
        message: i.message
      }), (B = i.details) == null ? void 0 : B.call(i, E.value)])]);
    }), {
      reset: w,
      resetValidation: x,
      validate: b,
      isValid: p,
      errorMessages: f
    };
  }
}), S2 = X({
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
  ...Ci({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => vn(e).every((t) => t != null && typeof t == "object")
  },
  ...ru({
    clearable: !0
  })
}, "VFileInput"), C2 = fe()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: S2(),
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
    } = Kr(), l = $e(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = er(e), c = k(() => typeof e.showSize != "boolean" ? e.showSize : void 0), f = k(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: H = 0
      } = R;
      return $ + H;
    }, 0)), d = k(() => $c(f.value, c.value)), h = k(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: H = 0
      } = $;
      return e.showSize ? `${R} (${$c(H, c.value)})` : R;
    })), v = k(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, d.value) : o(e.counterString, $);
    }), m = Q(), p = Q(), y = Q(), w = k(() => s.value || e.active), x = k(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var $;
      y.value !== document.activeElement && (($ = y.value) == null || $.focus()), s.value || a();
    }
    function _($) {
      var R;
      (R = y.value) == null || R.click();
    }
    function E($) {
      i("mousedown:control", $);
    }
    function S($) {
      var R;
      (R = y.value) == null || R.click(), i("click:control", $);
    }
    function I($) {
      $.stopPropagation(), b(), qe(() => {
        l.value = [], Mh(e["onClick:clear"], $);
      });
    }
    return be(l, ($) => {
      (!Array.isArray($) || !$.length) && y.value && (y.value.value = "");
    }), he(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [H, L] = Xi(n), {
        modelValue: N,
        ...C
      } = Ft.filterProps(e), B = Nv(e);
      return g(Ft, de({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (M) => l.value = M,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": x.value
        }, e.class],
        style: e.style,
        "onClick:prepend": _
      }, H, C, {
        centerAffix: !x.value,
        focused: s.value
      }), {
        ...r,
        default: (M) => {
          let {
            id: z,
            isDisabled: A,
            isDirty: F,
            isReadonly: O,
            isValid: D
          } = M;
          return g(ou, de({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: E,
            onClick: S,
            "onClick:clear": I,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, B, {
            id: z.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: A.value,
            focused: s.value,
            error: D.value === !1
          }), {
            ...r,
            default: (Y) => {
              var me;
              let {
                props: {
                  class: ee,
                  ...ce
                }
              } = Y;
              return g(Ve, null, [g("input", de({
                ref: y,
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
              }, ce, L), null), g("div", {
                class: ee
              }, [!!((me = l.value) != null && me.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: f.value,
                totalBytesReadable: d.value
              }) : e.chips ? h.value.map((J) => g(Mv, {
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
          var z, A;
          return g(Ve, null, [(z = r.details) == null ? void 0 : z.call(r, M), $ && g(Ve, null, [g("span", null, null), g(Av, {
            active: !!((A = l.value) != null && A.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), Xn({}, m, p, y);
  }
}), Ov = Rl.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Bv = Rl.reduce((e, t) => {
  const n = "offset" + In(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Fv = Rl.reduce((e, t) => {
  const n = "order" + In(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), xf = {
  col: Object.keys(Ov),
  offset: Object.keys(Bv),
  order: Object.keys(Fv)
};
function k2(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const E2 = ["auto", "start", "end", "center", "baseline", "stretch"], V2 = X({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Ov,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Bv,
  order: {
    type: [String, Number],
    default: null
  },
  ...Fv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => E2.includes(e)
  },
  ...Se(),
  ...je()
}, "VCol"), Ti = fe()({
  name: "VCol",
  props: V2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in xf)
        xf[o].forEach((s) => {
          const a = e[s], u = k2(o, s, a);
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
      return qn(e.tag, {
        class: [i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), lu = ["start", "end", "center"], Dv = ["space-between", "space-around", "space-evenly"];
function su(e, t) {
  return Rl.reduce((n, i) => {
    const r = e + In(i);
    return n[r] = t(), n;
  }, {});
}
const L2 = [...lu, "baseline", "stretch"], Hv = (e) => L2.includes(e), zv = su("align", () => ({
  type: String,
  default: null,
  validator: Hv
})), I2 = [...lu, ...Dv], jv = (e) => I2.includes(e), Gv = su("justify", () => ({
  type: String,
  default: null,
  validator: jv
})), P2 = [...lu, ...Dv, "stretch"], Uv = (e) => P2.includes(e), Wv = su("alignContent", () => ({
  type: String,
  default: null,
  validator: Uv
})), _f = {
  align: Object.keys(zv),
  justify: Object.keys(Gv),
  alignContent: Object.keys(Wv)
}, T2 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function M2(e, t, n) {
  let i = T2[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const A2 = X({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Hv
  },
  ...zv,
  justify: {
    type: String,
    default: null,
    validator: jv
  },
  ...Gv,
  alignContent: {
    type: String,
    default: null,
    validator: Uv
  },
  ...Wv,
  ...Se(),
  ...je()
}, "VRow"), mt = fe()({
  name: "VRow",
  props: A2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in _f)
        _f[o].forEach((l) => {
          const s = e[l], a = M2(o, l, s);
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
      return qn(e.tag, {
        class: ["v-row", i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), ll = Zi("v-spacer", "div", "VSpacer"), qv = Symbol.for("vuetify:selection-control-group"), au = X({
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
    default: wi
  },
  ...Se(),
  ...Ht(),
  ...Ye()
}, "SelectionControlGroup"), $2 = X({
  ...au({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup"), N2 = fe()({
  name: "VSelectionControlGroup",
  props: $2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = bt(), o = k(() => e.id || `v-selection-control-group-${r}`), l = k(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return ot(qv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), ht(() => {
          s.delete(a);
        });
      }
    }), yn({
      [e.defaultsTarget]: {
        color: oe(e, "color"),
        disabled: oe(e, "disabled"),
        density: oe(e, "density"),
        error: oe(e, "error"),
        inline: oe(e, "inline"),
        modelValue: i,
        multiple: k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)),
        name: l,
        falseIcon: oe(e, "falseIcon"),
        trueIcon: oe(e, "trueIcon"),
        readonly: oe(e, "readonly"),
        ripple: oe(e, "ripple"),
        type: oe(e, "type"),
        valueComparator: oe(e, "valueComparator")
      }
    }), he(() => {
      var a;
      return g("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), Fl = X({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Se(),
  ...au()
}, "VSelectionControl");
function R2(e) {
  const t = Fe(qv, void 0), {
    densityClasses: n
  } = ln(e), i = $e(e, "modelValue"), r = k(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = k(() => e.falseValue !== void 0 ? e.falseValue : !1), l = k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = k({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? vn(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...vn(i.value), v] : vn(i.value).filter((p) => !e.valueComparator(p, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = Jt(k(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = It(k(() => s.value && !e.error && !e.disabled ? e.color : void 0)), d = k(() => s.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: r,
    falseValue: o,
    model: s,
    textColorClasses: a,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: f,
    icon: d
  };
}
const qi = fe()({
  name: "VSelectionControl",
  directives: {
    Ripple: Si
  },
  inheritAttrs: !1,
  props: Fl(),
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
      backgroundColorStyles: f,
      trueValue: d
    } = R2(e), h = bt(), v = pe(!1), m = pe(!1), p = Q(), y = k(() => e.id || `input-${h}`), w = k(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function x(S) {
      w.value && (v.value = !0, Jo(S.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function _(S) {
      S.stopPropagation();
    }
    function E(S) {
      w.value && (e.readonly && r && qe(() => r.forceUpdate()), s.value = S.target.checked);
    }
    return he(() => {
      var H, L;
      const S = i.label ? i.label({
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label, [I, $] = Xi(n), R = g("input", de({
        ref: p,
        checked: s.value,
        disabled: !!e.disabled,
        id: y.value,
        onBlur: b,
        onFocus: x,
        onInput: E,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: d.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, $), null);
      return g("div", de({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": v.value,
          "v-selection-control--focus-visible": m.value,
          "v-selection-control--inline": e.inline
        }, o.value, e.class]
      }, I, {
        style: e.style
      }), [g("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(H = i.default) == null ? void 0 : H.call(i, {
        backgroundColorClasses: c,
        backgroundColorStyles: f
      }), ze(g("div", {
        class: ["v-selection-control__input"]
      }, [((L = i.input) == null ? void 0 : L.call(i, {
        model: s,
        textColorClasses: a,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: f,
        inputNode: R,
        icon: l.value,
        props: {
          onFocus: x,
          onBlur: b,
          id: y.value
        }
      })) ?? g(Ve, null, [l.value && g(De, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[en("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), S && g(Bl, {
        for: y.value,
        onClick: _
      }, {
        default: () => [S]
      })]);
    }), {
      isFocused: v,
      input: p
    };
  }
}), O2 = X({
  ...Fl({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio"), Sf = fe()({
  name: "VRadio",
  props: O2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => g(qi, de(e, {
      class: ["v-radio", e.class],
      style: e.style,
      type: "radio"
    }), n)), {};
  }
}), B2 = X({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...Ci(),
  ...Dt(au(), ["multiple"]),
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
}, "VRadioGroup"), F2 = fe()({
  name: "VRadioGroup",
  inheritAttrs: !1,
  props: B2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = bt(), o = k(() => e.id || `radio-group-${r}`), l = $e(e, "modelValue");
    return he(() => {
      const [s, a] = Xi(n), u = Ft.filterProps(e), c = qi.filterProps(e), f = i.label ? i.label({
        label: e.label,
        props: {
          for: o.value
        }
      }) : e.label;
      return g(Ft, de({
        class: ["v-radio-group", e.class],
        style: e.style
      }, s, u, {
        modelValue: l.value,
        "onUpdate:modelValue": (d) => l.value = d,
        id: o.value
      }), {
        ...i,
        default: (d) => {
          let {
            id: h,
            messagesId: v,
            isDisabled: m,
            isReadonly: p
          } = d;
          return g(Ve, null, [f && g(Bl, {
            id: h.value
          }, {
            default: () => [f]
          }), g(N2, de(c, {
            id: h.value,
            "aria-describedby": v.value,
            defaultsTarget: "VRadio",
            trueIcon: e.trueIcon,
            falseIcon: e.falseIcon,
            type: e.type,
            disabled: m.value,
            readonly: p.value,
            "aria-labelledby": f ? h.value : void 0,
            multiple: !1
          }, a, {
            modelValue: l.value,
            "onUpdate:modelValue": (y) => l.value = y
          }), i)]);
        }
      });
    }), {};
  }
});
function D2(e) {
  const t = pe(e);
  let n = -1;
  function i() {
    clearInterval(n);
  }
  function r() {
    i(), qe(() => t.value = e);
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
  return ht(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const H2 = X({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Xr({
    location: "bottom"
  }),
  ...Tl(),
  ...wt(),
  ...An(),
  ...Ye(),
  ...Dt(eo({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Ks = fe()({
  name: "VSnackbar",
  props: H2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      locationStyles: r
    } = Zr(e), {
      positionClasses: o
    } = Ml(e), {
      scopeId: l
    } = Qr(), {
      themeClasses: s
    } = Qe(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = Qi(e), {
      roundedClasses: f
    } = xt(e), d = D2(Number(e.timeout)), h = Q(), v = Q(), m = pe(!1);
    be(i, y), be(() => e.timeout, y), tn(() => {
      i.value && y();
    });
    let p = -1;
    function y() {
      d.reset(), window.clearTimeout(p);
      const _ = Number(e.timeout);
      if (!i.value || _ === -1) return;
      const E = Mr(v.value);
      d.start(E), p = window.setTimeout(() => {
        i.value = !1;
      }, _);
    }
    function w() {
      d.reset(), window.clearTimeout(p);
    }
    function x() {
      m.value = !0, w();
    }
    function b() {
      m.value = !1, y();
    }
    return he(() => {
      const _ = Wn.filterProps(e), E = !!(n.default || n.text || e.text);
      return g(Wn, de({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": i.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, o.value, e.class],
        style: e.style
      }, _, {
        modelValue: i.value,
        "onUpdate:modelValue": (S) => i.value = S,
        contentProps: de({
          class: ["v-snackbar__wrapper", s.value, a.value, f.value, c.value],
          style: [r.value, u.value],
          onPointerenter: x,
          onPointerleave: b
        }, _.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0
      }, l), {
        default: () => {
          var S, I;
          return [Ji(!1, "v-snackbar"), e.timer && !m.value && g("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [g(lv, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), E && g("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((S = n.text) == null ? void 0 : S.call(n)) ?? e.text, (I = n.default) == null ? void 0 : I.call(n)]), n.actions && g(Je, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [g("div", {
              class: "v-snackbar__actions"
            }, [n.actions()])]
          })];
        },
        activator: n.activator
      });
    }), Xn({}, h);
  }
}), Yv = Symbol.for("vuetify:v-tabs"), z2 = X({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Dt(mv({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Xs = fe()({
  name: "VTab",
  props: z2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = Jt(e, "sliderColor"), l = Q(), s = Q(), a = k(() => e.direction === "horizontal"), u = k(() => {
      var f, d;
      return ((d = (f = l.value) == null ? void 0 : f.group) == null ? void 0 : d.isSelected.value) ?? !1;
    });
    function c(f) {
      var h, v;
      let {
        value: d
      } = f;
      if (d) {
        const m = (v = (h = l.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : v.querySelector(".v-tab--selected .v-tab__slider"), p = s.value;
        if (!m || !p) return;
        const y = getComputedStyle(m).color, w = m.getBoundingClientRect(), x = p.getBoundingClientRect(), b = a.value ? "x" : "y", _ = a.value ? "X" : "Y", E = a.value ? "right" : "bottom", S = a.value ? "width" : "height", I = w[b], $ = x[b], R = I > $ ? w[E] - x[E] : w[b] - x[b], H = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", N = (Math.abs(R) + (Math.sign(R) < 0 ? w[S] : x[S])) / Math.max(w[S], x[S]) || 0, C = w[S] / x[S] || 0, B = 1.5;
        ai(p, {
          backgroundColor: [y, "currentcolor"],
          transform: [`translate${_}(${R}px) scale${_}(${C})`, `translate${_}(${R / B}px) scale${_}(${(N - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(H)
        }, {
          duration: 225,
          easing: $r
        });
      }
    }
    return he(() => {
      const f = rt.filterProps(e);
      return g(rt, de({
        symbol: Yv,
        ref: l,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, f, i, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...n,
        default: () => {
          var d;
          return g(Ve, null, [((d = n.default) == null ? void 0 : d.call(n)) ?? e.text, !e.hideSlider && g("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), Xn({}, l);
  }
});
function j2(e) {
  return e ? e.map((t) => Ko(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const G2 = X({
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
  ...nu({
    mandatory: "force"
  }),
  ...Ht(),
  ...je()
}, "VTabs"), U2 = fe()({
  name: "VTabs",
  props: G2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = k(() => j2(e.items)), {
      densityClasses: o
    } = ln(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = It(oe(e, "bgColor"));
    return yn({
      VTab: {
        color: oe(e, "color"),
        direction: oe(e, "direction"),
        stacked: oe(e, "stacked"),
        fixed: oe(e, "fixedTabs"),
        sliderColor: oe(e, "sliderColor"),
        hideSlider: oe(e, "hideSlider")
      }
    }), he(() => {
      const a = ol.filterProps(e);
      return g(ol, de(a, {
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
        symbol: Yv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => g(Xs, de(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), W2 = X({
  id: String,
  text: String,
  ...Dt(eo({
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
}, "VTooltip"), Di = fe()({
  name: "VTooltip",
  props: W2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = Qr(), o = bt(), l = k(() => e.id || `v-tooltip-${o}`), s = Q(), a = k(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = k(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = k(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), f = k(() => de({
      "aria-describedby": l.value
    }, e.activatorProps));
    return he(() => {
      const d = Wn.filterProps(e);
      return g(Wn, de({
        ref: s,
        class: ["v-tooltip", e.class],
        style: e.style,
        id: l.value
      }, d, {
        modelValue: i.value,
        "onUpdate:modelValue": (h) => i.value = h,
        transition: c.value,
        absolute: !0,
        location: a.value,
        origin: u.value,
        persistent: !0,
        role: "tooltip",
        activatorProps: f.value,
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
    }), Xn({}, s);
  }
}), q2 = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function Y2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function K2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), q2(t);
}
function X2(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function Z2() {
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
    touchstart: (n) => Y2(n, t),
    touchend: (n) => K2(n, t),
    touchmove: (n) => X2(n, t)
  };
}
function J2(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = Z2(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, Vh(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function Q2(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  Vh(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const Kv = {
  mounted: J2,
  unmounted: Q2
}, eS = Kv, Xv = Symbol.for("vuetify:v-window"), Zv = Symbol.for("vuetify:v-window-group"), tS = X({
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
  ...Se(),
  ...je(),
  ...Ye()
}, "VWindow"), nS = fe()({
  name: "VWindow",
  directives: {
    Touch: Kv
  },
  props: tS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      isRtl: r
    } = sn(), {
      t: o
    } = Kr(), l = Wr(e, Zv), s = Q(), a = k(() => r.value ? !e.reverse : e.reverse), u = pe(!1), c = k(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), f = pe(0), d = Q(void 0), h = k(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    be(h, (b, _) => {
      const E = l.items.value.length, S = E - 1;
      E <= 2 ? u.value = b < _ : b === S && _ === 0 ? u.value = !0 : b === 0 && _ === S ? u.value = !1 : u.value = b < _;
    }), ot(Xv, {
      transition: c,
      isReversed: u,
      transitionCount: f,
      transitionHeight: d,
      rootRef: s
    });
    const v = k(() => e.continuous || h.value !== 0), m = k(() => e.continuous || h.value !== l.items.value.length - 1);
    function p() {
      v.value && l.prev();
    }
    function y() {
      m.value && l.next();
    }
    const w = k(() => {
      const b = [], _ = {
        icon: r.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: l.prev,
        "aria-label": o("$vuetify.carousel.prev")
      };
      b.push(v.value ? n.prev ? n.prev({
        props: _
      }) : g(rt, _, null) : g("div", null, null));
      const E = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: E
      }) : g(rt, E, null) : g("div", null, null)), b;
    }), x = k(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : y();
        },
        right: () => {
          a.value ? y() : p();
        },
        start: (_) => {
          let {
            originalEvent: E
          } = _;
          E.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return he(() => ze(g(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var b, _;
        return [g("div", {
          class: "v-window__container",
          style: {
            height: d.value
          }
        }, [(b = n.default) == null ? void 0 : b.call(n, {
          group: l
        }), e.showArrows !== !1 && g("div", {
          class: "v-window__controls"
        }, [w.value])]), (_ = n.additional) == null ? void 0 : _.call(n, {
          group: l
        })];
      }
    }), [[en("touch"), x.value]])), {
      group: l
    };
  }
});
function Jv() {
  const e = pe(!1);
  return tn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: k(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Dr(e)
  };
}
const iS = X({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...Se(),
  ...Vl(),
  ...Ol()
}, "VWindowItem"), Cf = fe()({
  name: "VWindowItem",
  directives: {
    Touch: eS
  },
  props: iS(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Fe(Xv), r = Ll(e, Zv), {
      isBooted: o
    } = Jv();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = pe(!1), s = k(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
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
    function f(v) {
      l.value && qe(() => {
        !s.value || !l.value || !i || (i.transitionHeight.value = ge(v.clientHeight));
      });
    }
    const d = k(() => {
      const v = i.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof v != "string" ? i.transition.value : v,
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
    } = eu(e, r.isSelected);
    return he(() => g(Sn, {
      transition: d.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [ze(g("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[Bt, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), rS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Select File", -1), oS = /* @__PURE__ */ Ne("p", null, " Files in a specific JSON format or trivial graph format are supported. ", -1), lS = /* @__PURE__ */ Ne("p", null, [
  /* @__PURE__ */ Xe("Importing will "),
  /* @__PURE__ */ Ne("strong", null, "replace"),
  /* @__PURE__ */ Xe(" your current graph.")
], -1), sS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Select Format", -1), aS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Preview", -1), uS = /* @__PURE__ */ Ne("strong", null, "copy", -1), cS = /* @__PURE__ */ Ki({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null },
    graphAsJson: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = Q(!1), o = Q(0), l = Q(), s = Q("JSON"), a = Q(!1), u = Q(!1), c = Q(""), f = Q(""), d = k(
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
          x.text().then((_) => {
            b === "tgf" ? i("file-imported", _) : b === "json" ? i("file-imported", JSON.parse(_)) : y("No valid file extension.", ""), p();
          }).catch((_) => {
            y(`Error reading the imported file ${x.name}`, _);
          });
        }
    }
    function m() {
      o.value === 0 ? v() : o.value === 1 && navigator.clipboard.writeText(
        s.value === "TGF" ? n.graphAsTgf.toString() : n.graphAsJson.toString()
      ).then(
        () => a.value = !0,
        (w) => {
          y("Copy unsuccessful", w);
        }
      );
    }
    function p() {
      u.value = !1, c.value = "", f.value = "", r.value = !1, o.value = 0, l.value = void 0, a.value = !1;
    }
    function y(w, x) {
      console.error(w + `
` + x), u.value = !0, c.value = w, f.value = x.toString(), window.setInterval(() => u.value = !1, 5e3);
    }
    return (w, x) => (Ct(), dn(tu, {
      modelValue: r.value,
      "onUpdate:modelValue": x[8] || (x[8] = (b) => r.value = b),
      "max-width": "800px"
    }, {
      activator: ae(({ props: b }) => [
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ae(({ props: _ }) => [
            g(rt, de({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...b, ..._ }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ae(() => [
        g(Za, null, {
          default: ae(() => [
            g(Or, null, {
              default: ae(() => [
                g(U2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[0] || (x[0] = (b) => o.value = b)
                }, {
                  default: ae(() => [
                    g(Xs, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ae(() => [
                        Xe("Import")
                      ]),
                      _: 1
                    }),
                    g(Xs, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ae(() => [
                        Xe("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(br, null, {
              default: ae(() => [
                g(nS, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[3] || (x[3] = (b) => o.value = b),
                  class: "ml-4"
                }, {
                  default: ae(() => [
                    g(Cf, null, {
                      default: ae(() => [
                        rS,
                        g(C2, {
                          modelValue: l.value,
                          "onUpdate:modelValue": x[1] || (x[1] = (b) => l.value = b),
                          accept: ".tgf, .json",
                          density: "compact",
                          label: "Graph Format File",
                          rules: h,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        g(br, null, {
                          default: ae(() => [
                            oS,
                            lS
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    g(Cf, null, {
                      default: ae(() => [
                        sS,
                        g(F2, {
                          inline: "",
                          modelValue: s.value,
                          "onUpdate:modelValue": x[2] || (x[2] = (b) => s.value = b)
                        }, {
                          default: ae(() => [
                            g(Sf, {
                              label: "JSON",
                              value: "JSON"
                            }),
                            g(Sf, {
                              label: "TGF",
                              value: "TGF"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        aS,
                        ze(Ne("pre", null, At(n.graphAsJson), 513), [
                          [Bt, s.value === "JSON"]
                        ]),
                        ze(Ne("pre", null, At(n.graphAsTgf), 513), [
                          [Bt, s.value === "TGF"]
                        ]),
                        g(br, null, {
                          default: ae(() => [
                            Xe("This export action will "),
                            uS,
                            Xe(" the graph as JSON or in trivial graph format to your clipboard.")
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
            g(Nl, null, {
              default: ae(() => [
                g(ll),
                g(rt, {
                  color: "secondary",
                  variant: "text",
                  disabled: !d.value,
                  onClick: x[4] || (x[4] = (b) => m())
                }, {
                  default: ae(() => [
                    Xe("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                g(rt, {
                  color: "secondary",
                  variant: "text",
                  onClick: x[5] || (x[5] = (b) => p())
                }, {
                  default: ae(() => [
                    Xe("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        g(Ks, {
          modelValue: u.value,
          "onUpdate:modelValue": x[6] || (x[6] = (b) => u.value = b),
          color: "error",
          variant: "tonal"
        }, {
          default: ae(() => [
            g(mt, { align: "center" }, {
              default: ae(() => [
                g(De, {
                  icon: "$error",
                  class: "ml-2"
                }),
                g(Ti, null, {
                  default: ae(() => [
                    Ne("h4", null, At(c.value), 1),
                    Ne("p", null, At(f.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        g(Ks, {
          modelValue: a.value,
          "onUpdate:modelValue": x[7] || (x[7] = (b) => a.value = b),
          timeout: 1500
        }, {
          default: ae(() => [
            g(De, {
              color: "secondary",
              icon: "$success"
            }),
            Xe(" Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), fS = ".heading{margin-top:10px;margin-bottom:10px}", uu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, dS = /* @__PURE__ */ uu(cS, [["styles", [fS]]]), hS = X({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Se(),
  ...Ht(),
  ...je(),
  ...Ye()
}, "VTable"), vS = fe()({
  name: "VTable",
  props: hS(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = Qe(e), {
      densityClasses: o
    } = ln(e);
    return he(() => g(e.tag, {
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
        return [(l = n.top) == null ? void 0 : l.call(n), n.default ? g("div", {
          class: "v-table__wrapper",
          style: {
            height: ge(e.height)
          }
        }, [g("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), mS = { class: "text-left" }, gS = { class: "text-left" }, yS = { class: "text-left" }, pS = /* @__PURE__ */ Ki({
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
    ], n = Q(!1), i = ["Action", "Desktop", "Mobile"];
    return (r, o) => (Ct(), dn(tu, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (l) => n.value = l),
      "max-width": "800px"
    }, {
      activator: ae(({ props: l }) => [
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ae(({ props: s }) => [
            g(rt, de({
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
      default: ae(() => [
        g(Za, null, {
          default: ae(() => [
            g(Or, { class: "card-header" }, {
              default: ae(() => [
                Xe("Controls")
              ]),
              _: 1
            }),
            g(vS, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: ae(() => [
                Ne("thead", null, [
                  Ne("tr", null, [
                    Ne("th", mS, At(i[0]), 1),
                    Ne("th", gS, At(i[1]), 1),
                    Ne("th", yS, At(i[2]), 1)
                  ])
                ]),
                Ne("tbody", null, [
                  (Ct(), ks(Ve, null, Ng(t, (l) => Ne("tr", {
                    key: l.action
                  }, [
                    Ne("td", null, At(l.action), 1),
                    Ne("td", null, At(l.desktop), 1),
                    Ne("td", null, At(l.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            g(Nl, null, {
              default: ae(() => [
                g(ll),
                g(rt, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (l) => n.value = !1)
                }, {
                  default: ae(() => [
                    Xe(" Close ")
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
}), bS = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", wS = /* @__PURE__ */ uu(pS, [["styles", [bS]], ["__scopeId", "data-v-6c8401af"]]), Qv = X({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Te,
    default: "$checkboxIndeterminate"
  },
  ...Fl({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Zs = fe()({
  name: "VCheckboxBtn",
  props: Qv(),
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
    const l = k(() => i.value ? e.indeterminateIcon : e.falseIcon), s = k(() => i.value ? e.indeterminateIcon : e.trueIcon);
    return he(() => {
      const a = Dt(qi.filterProps(e), ["modelValue"]);
      return g(qi, de(a, {
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
}), xS = X({
  ...Ci(),
  ...Dt(Qv(), ["inline"])
}, "VCheckbox"), _S = fe()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: xS(),
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
    } = er(e), a = bt(), u = k(() => e.id || `checkbox-${a}`);
    return he(() => {
      const [c, f] = Xi(n), d = Ft.filterProps(e), h = Zs.filterProps(e);
      return g(Ft, de({
        class: ["v-checkbox", e.class]
      }, c, d, {
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
            isDisabled: y,
            isReadonly: w,
            isValid: x
          } = v;
          return g(Zs, de(h, {
            id: m.value,
            "aria-describedby": p.value,
            disabled: y.value,
            readonly: w.value
          }, f, {
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
}), SS = X({
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
  ...Se()
}, "VColorPickerCanvas"), CS = on({
  name: "VColorPickerCanvas",
  props: SS(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = pe(!1), r = Q(), o = pe(parseFloat(e.width)), l = pe(parseFloat(e.height)), s = Q({
      x: 0,
      y: 0
    }), a = k({
      get: () => s.value,
      set(p) {
        var x, b;
        if (!r.value) return;
        const {
          x: y,
          y: w
        } = p;
        s.value = p, n("update:color", {
          h: ((x = e.color) == null ? void 0 : x.h) ?? 0,
          s: Et(y, 0, o.value) / o.value,
          v: 1 - Et(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = k(() => {
      const {
        x: p,
        y
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: ge(e.dotSize),
        height: ge(e.dotSize),
        transform: `translate(${ge(p - w)}, ${ge(y - w)})`
      };
    }), {
      resizeRef: c
    } = Wi((p) => {
      var x;
      if (!((x = c.value) != null && x.offsetParent)) return;
      const {
        width: y,
        height: w
      } = p[0].contentRect;
      o.value = y, l.value = w;
    });
    function f(p, y, w) {
      const {
        left: x,
        top: b,
        width: _,
        height: E
      } = w;
      a.value = {
        x: Et(p - x, 0, _),
        y: Et(y - b, 0, E)
      };
    }
    function d(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const y = vx(p);
      f(y.clientX, y.clientY, r.value.getBoundingClientRect());
    }
    function v() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", v);
    }
    function m() {
      var b;
      if (!r.value) return;
      const p = r.value, y = p.getContext("2d");
      if (!y) return;
      const w = y.createLinearGradient(0, 0, p.width, 0);
      w.addColorStop(0, "hsla(0, 0%, 100%, 1)"), w.addColorStop(1, `hsla(${((b = e.color) == null ? void 0 : b.h) ?? 0}, 100%, 50%, 1)`), y.fillStyle = w, y.fillRect(0, 0, p.width, p.height);
      const x = y.createLinearGradient(0, 0, 0, p.height);
      x.addColorStop(0, "hsla(0, 0%, 0%, 0)"), x.addColorStop(1, "hsla(0, 0%, 0%, 1)"), y.fillStyle = x, y.fillRect(0, 0, p.width, p.height);
    }
    return be(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, m, {
      immediate: !0
    }), be(() => [o.value, l.value], (p, y) => {
      m(), s.value = {
        x: a.value.x * p[0] / y[0],
        y: a.value.y * p[1] / y[1]
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
    }), tn(() => m()), he(() => g("div", {
      ref: c,
      class: ["v-color-picker-canvas", e.class],
      style: e.style,
      onMousedown: d,
      onTouchstartPassive: d
    }, [g("canvas", {
      ref: r,
      width: o.value,
      height: l.value
    }, null), e.color && g("div", {
      class: ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": e.disabled
      }],
      style: u.value
    }, null)])), {};
  }
});
function kS(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function ES(e, t) {
  if (t == null || typeof t == "string") {
    const n = Wh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return si(t, ["r", "g", "b"]) ? n = Ln(e) : si(t, ["h", "s", "l"]) ? n = Dh(e) : si(t, ["h", "s", "v"]) && (n = e), kS(n, !si(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Mi = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, Js = {
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
  to: Ln,
  from: kl
};
var Af;
const VS = {
  ...Js,
  inputs: (Af = Js.inputs) == null ? void 0 : Af.slice(0, 3)
}, Qs = {
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
  to: Dh,
  from: Ga
}, LS = {
  ...Qs,
  inputs: Qs.inputs.slice(0, 3)
}, em = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: Wh,
  from: Uh
}, IS = {
  ...em,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, vi = {
  rgb: VS,
  rgba: Js,
  hsl: LS,
  hsla: Qs,
  hex: IS,
  hexa: em
}, PS = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return g("div", {
    class: "v-color-picker-edit__input"
  }, [g("input", n, null), g("span", null, [t])]);
}, TS = X({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(vi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(vi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(vi).includes(t))
  },
  ...Se()
}, "VColorPickerEdit"), MS = on({
  name: "VColorPickerEdit",
  props: TS(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = k(() => e.modes.map((o) => ({
      ...vi[o],
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
          ...f
        } = a;
        return {
          ...o.inputProps,
          ...f,
          disabled: e.disabled,
          value: l && u(l),
          onChange: (d) => {
            const h = d.target;
            h && n("update:color", o.from(c(l ?? o.to(Mi), h.value)));
          }
        };
      });
    });
    return he(() => {
      var o;
      return g("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => g(PS, l, null)), i.value.length > 1 && g(rt, {
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
}), cu = Symbol.for("vuetify:v-slider");
function AS(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function $S(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const NS = X({
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
  ...wt(),
  ...Tn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), RS = (e) => {
  const t = k(() => parseFloat(e.min)), n = k(() => parseFloat(e.max)), i = k(() => +e.step > 0 ? parseFloat(e.step) : 0), r = k(() => Math.max(Tc(i.value), Tc(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = Et(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, OS = (e) => {
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
  } = sn(), a = oe(t, "reverse"), u = k(() => t.direction === "vertical"), c = k(() => u.value !== a.value), {
    min: f,
    max: d,
    step: h,
    decimals: v,
    roundValue: m
  } = n, p = k(() => parseInt(t.thumbSize, 10)), y = k(() => parseInt(t.tickSize, 10)), w = k(() => parseInt(t.trackSize, 10)), x = k(() => (d.value - f.value) / h.value), b = oe(t, "disabled"), _ = k(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = k(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), S = k(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), I = pe(!1), $ = pe(0), R = Q(), H = Q();
  function L(J) {
    var j;
    const ue = t.direction === "vertical", ke = ue ? "top" : "left", Ke = ue ? "height" : "width", lt = ue ? "clientY" : "clientX", {
      [ke]: zt,
      [Ke]: an
    } = (j = R.value) == null ? void 0 : j.$el.getBoundingClientRect(), V = $S(J, lt);
    let P = Math.min(Math.max((V - zt - $.value) / an, 0), 1) || 0;
    return (ue ? c.value : c.value !== s.value) && (P = 1 - P), m(f.value + P * (d.value - f.value));
  }
  const N = (J) => {
    o({
      value: L(J)
    }), I.value = !1, $.value = 0;
  }, C = (J) => {
    H.value = l(J), H.value && (H.value.focus(), I.value = !0, H.value.contains(J.target) ? $.value = AS(J, H.value, t.direction) : ($.value = 0, r({
      value: L(J)
    })), i({
      value: L(J)
    }));
  }, B = {
    passive: !0,
    capture: !0
  };
  function M(J) {
    r({
      value: L(J)
    });
  }
  function z(J) {
    J.stopPropagation(), J.preventDefault(), N(J), window.removeEventListener("mousemove", M, B), window.removeEventListener("mouseup", z);
  }
  function A(J) {
    var ue;
    N(J), window.removeEventListener("touchmove", M, B), (ue = J.target) == null || ue.removeEventListener("touchend", A);
  }
  function F(J) {
    var ue;
    C(J), window.addEventListener("touchmove", M, B), (ue = J.target) == null || ue.addEventListener("touchend", A, {
      passive: !1
    });
  }
  function O(J) {
    J.preventDefault(), C(J), window.addEventListener("mousemove", M, B), window.addEventListener("mouseup", z, {
      passive: !1
    });
  }
  const D = (J) => {
    const ue = (J - f.value) / (d.value - f.value) * 100;
    return Et(isNaN(ue) ? 0 : ue, 0, 100);
  }, Y = oe(t, "showTicks"), ee = k(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: D(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: D(parseFloat(J)),
    label: t.ticks[J]
  })) : x.value !== 1 / 0 ? Fa(x.value + 1).map((J) => {
    const ue = f.value + J * h.value;
    return {
      value: ue,
      position: D(ue)
    };
  }) : [] : []), ce = k(() => ee.value.some((J) => {
    let {
      label: ue
    } = J;
    return !!ue;
  })), me = {
    activeThumbRef: H,
    color: oe(t, "color"),
    decimals: v,
    disabled: b,
    direction: oe(t, "direction"),
    elevation: oe(t, "elevation"),
    hasLabels: ce,
    isReversed: a,
    indexFromEnd: c,
    min: f,
    max: d,
    mousePressed: I,
    numTicks: x,
    onSliderMousedown: O,
    onSliderTouchstart: F,
    parsedTicks: ee,
    parseMouseMove: L,
    position: D,
    readonly: oe(t, "readonly"),
    rounded: oe(t, "rounded"),
    roundValue: m,
    showTicks: Y,
    startOffset: $,
    step: h,
    thumbSize: p,
    thumbColor: _,
    thumbLabel: oe(t, "thumbLabel"),
    ticks: oe(t, "ticks"),
    tickSize: y,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: S,
    trackSize: w,
    vertical: u
  };
  return ot(cu, me), me;
}, BS = X({
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
  ...Se()
}, "VSliderThumb"), FS = fe()({
  name: "VSliderThumb",
  directives: {
    Ripple: Si
  },
  props: BS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = Fe(cu), {
      isRtl: o,
      rtlClasses: l
    } = sn();
    if (!r) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor: s,
      step: a,
      disabled: u,
      thumbSize: c,
      thumbLabel: f,
      direction: d,
      isReversed: h,
      vertical: v,
      readonly: m,
      elevation: p,
      mousePressed: y,
      decimals: w,
      indexFromEnd: x
    } = r, b = k(() => u.value ? void 0 : p.value), {
      elevationClasses: _
    } = Mn(b), {
      textColorClasses: E,
      textColorStyles: S
    } = Jt(s), {
      pageup: I,
      pagedown: $,
      end: R,
      home: H,
      left: L,
      right: N,
      down: C,
      up: B
    } = cx, M = [I, $, R, H, L, N, C, B], z = k(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function A(O, D) {
      if (!M.includes(O.key)) return;
      O.preventDefault();
      const Y = a.value || 0.1, ee = (e.max - e.min) / Y;
      if ([L, N, C, B].includes(O.key)) {
        const me = (v.value ? [o.value ? L : N, h.value ? C : B] : x.value !== o.value ? [L, B] : [N, B]).includes(O.key) ? 1 : -1, J = O.shiftKey ? 2 : O.ctrlKey ? 1 : 0;
        D = D + me * Y * z.value[J];
      } else if (O.key === H)
        D = e.min;
      else if (O.key === R)
        D = e.max;
      else {
        const ce = O.key === $ ? 1 : -1;
        D = D - ce * Y * (ee > 100 ? ee / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, D));
    }
    function F(O) {
      const D = A(O, e.modelValue);
      D != null && i("update:modelValue", D);
    }
    return he(() => {
      const O = ge(x.value ? 100 - e.position : e.position, "%");
      return g("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && y.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": O,
          "--v-slider-thumb-size": ge(c.value)
        }, e.style],
        role: "slider",
        tabindex: u.value ? -1 : 0,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.modelValue,
        "aria-readonly": !!m.value,
        "aria-orientation": d.value,
        onKeydown: m.value ? void 0 : F
      }, [g("div", {
        class: ["v-slider-thumb__surface", E.value, _.value],
        style: {
          ...S.value
        }
      }, null), ze(g("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: S.value
      }, null), [[en("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), g(_v, {
        origin: "bottom center"
      }, {
        default: () => {
          var D;
          return [ze(g("div", {
            class: "v-slider-thumb__label-container"
          }, [g("div", {
            class: ["v-slider-thumb__label"]
          }, [g("div", null, [((D = n["thumb-label"]) == null ? void 0 : D.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[Bt, f.value && e.focused || f.value === "always"]])];
        }
      })]);
    }), {};
  }
}), DS = X({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...Se()
}, "VSliderTrack"), HS = fe()({
  name: "VSliderTrack",
  props: DS(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Fe(cu);
    if (!i) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color: r,
      parsedTicks: o,
      rounded: l,
      showTicks: s,
      tickSize: a,
      trackColor: u,
      trackFillColor: c,
      trackSize: f,
      vertical: d,
      min: h,
      max: v,
      indexFromEnd: m
    } = i, {
      roundedClasses: p
    } = xt(l), {
      backgroundColorClasses: y,
      backgroundColorStyles: w
    } = It(c), {
      backgroundColorClasses: x,
      backgroundColorStyles: b
    } = It(u), _ = k(() => `inset-${d.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), E = k(() => d.value ? "height" : "width"), S = k(() => ({
      [_.value]: "0%",
      [E.value]: "100%"
    })), I = k(() => e.stop - e.start), $ = k(() => ({
      [_.value]: ge(e.start, "%"),
      [E.value]: ge(I.value, "%")
    })), R = k(() => s.value ? (d.value ? o.value.slice().reverse() : o.value).map((L, N) => {
      var B;
      const C = L.value !== h.value && L.value !== v.value ? ge(L.position, "%") : void 0;
      return g("div", {
        key: L.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": L.position >= e.start && L.position <= e.stop,
          "v-slider-track__tick--first": L.value === h.value,
          "v-slider-track__tick--last": L.value === v.value
        }],
        style: {
          [_.value]: C
        }
      }, [(L.label || n["tick-label"]) && g("div", {
        class: "v-slider-track__tick-label"
      }, [((B = n["tick-label"]) == null ? void 0 : B.call(n, {
        tick: L,
        index: N
      })) ?? L.label])]);
    }) : []);
    return he(() => g("div", {
      class: ["v-slider-track", p.value, e.class],
      style: [{
        "--v-slider-track-size": ge(f.value),
        "--v-slider-tick-size": ge(a.value)
      }, e.style]
    }, [g("div", {
      class: ["v-slider-track__background", x.value, {
        "v-slider-track__background--opacity": !!r.value || !c.value
      }],
      style: {
        ...S.value,
        ...b.value
      }
    }, null), g("div", {
      class: ["v-slider-track__fill", y.value],
      style: {
        ...$.value,
        ...w.value
      }
    }, null), s.value && g("div", {
      class: ["v-slider-track__ticks", {
        "v-slider-track__ticks--always-show": s.value === "always"
      }]
    }, [R.value])])), {};
  }
}), zS = X({
  ...iu(),
  ...NS(),
  ...Ci(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), kf = fe()({
  name: "VSlider",
  props: zS(),
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
    const r = Q(), {
      rtlClasses: o
    } = sn(), l = RS(e), s = $e(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
      min: a,
      max: u,
      mousePressed: c,
      roundValue: f,
      onSliderMousedown: d,
      onSliderTouchstart: h,
      trackContainerRef: v,
      position: m,
      hasLabels: p,
      readonly: y
    } = OS({
      props: e,
      steps: l,
      onSliderStart: () => {
        i("start", s.value);
      },
      onSliderEnd: (E) => {
        let {
          value: S
        } = E;
        const I = f(S);
        s.value = I, i("end", I);
      },
      onSliderMove: (E) => {
        let {
          value: S
        } = E;
        return s.value = f(S);
      },
      getActiveThumb: () => {
        var E;
        return (E = r.value) == null ? void 0 : E.$el;
      }
    }), {
      isFocused: w,
      focus: x,
      blur: b
    } = er(e), _ = k(() => m(s.value));
    return he(() => {
      const E = Ft.filterProps(e), S = !!(e.label || n.label || n.prepend);
      return g(Ft, de({
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
        prepend: S ? (I) => {
          var $, R;
          return g(Ve, null, [(($ = n.label) == null ? void 0 : $.call(n, I)) ?? (e.label ? g(Bl, {
            id: I.id.value,
            class: "v-slider__label",
            text: e.label
          }, null) : void 0), (R = n.prepend) == null ? void 0 : R.call(n, I)]);
        } : void 0,
        default: (I) => {
          let {
            id: $,
            messagesId: R
          } = I;
          return g("div", {
            class: "v-slider__container",
            onMousedown: y.value ? void 0 : d,
            onTouchstartPassive: y.value ? void 0 : h
          }, [g("input", {
            id: $.value,
            name: e.name || $.value,
            disabled: !!e.disabled,
            readonly: !!e.readonly,
            tabindex: "-1",
            value: s.value
          }, null), g(HS, {
            ref: v,
            start: 0,
            stop: _.value
          }, {
            "tick-label": n["tick-label"]
          }), g(FS, {
            ref: r,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (H) => s.value = H,
            position: _.value,
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
}), jS = X({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...Se()
}, "VColorPickerPreview"), GS = on({
  name: "VColorPickerPreview",
  props: jS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    yl(() => i.abort());
    async function r() {
      if (!Lc) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Uh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Mi,
          ...s
        });
      } catch {
      }
    }
    return he(() => {
      var o, l;
      return g("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [Lc && g("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [g(rt, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), g("div", {
        class: "v-color-picker-preview__dot"
      }, [g("div", {
        style: {
          background: zh(e.color ?? Mi)
        }
      }, null)]), g("div", {
        class: "v-color-picker-preview__sliders"
      }, [g(kf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Mi,
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
      }, null), !e.hideAlpha && g(kf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Mi,
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
}), US = {
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
}, WS = {
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
}, qS = {
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
}, YS = {
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
}, KS = {
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
}, XS = {
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
}, ZS = {
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
}, JS = {
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
}, QS = {
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
}, eC = {
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
}, tC = {
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
}, nC = {
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
}, iC = {
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
}, rC = {
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
}, oC = {
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
}, lC = {
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
}, sC = {
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
}, aC = {
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
}, uC = {
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
}, cC = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, fC = {
  red: US,
  pink: WS,
  purple: qS,
  deepPurple: YS,
  indigo: KS,
  blue: XS,
  lightBlue: ZS,
  cyan: JS,
  teal: QS,
  green: eC,
  lightGreen: tC,
  lime: nC,
  yellow: iC,
  amber: rC,
  orange: oC,
  deepOrange: lC,
  brown: sC,
  blueGrey: aC,
  grey: uC,
  shades: cC
}, dC = X({
  swatches: {
    type: Array,
    default: () => hC(fC)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...Se()
}, "VColorPickerSwatches");
function hC(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const vC = on({
  name: "VColorPickerSwatches",
  props: dC(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    return he(() => g("div", {
      class: ["v-color-picker-swatches", e.class],
      style: [{
        maxHeight: ge(e.maxHeight)
      }, e.style]
    }, [g("div", null, [e.swatches.map((i) => g("div", {
      class: "v-color-picker-swatches__swatch"
    }, [i.map((r) => {
      const o = Nt(r), l = kl(o), s = Hh(o);
      return g("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [g("div", {
        style: {
          background: s
        }
      }, [e.color && wi(e.color, l) ? g(De, {
        size: "x-small",
        icon: "$success",
        color: Fx(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), tm = X({
  color: String,
  ...xi(),
  ...Se(),
  ...Yn(),
  ...Tn(),
  ...Xr(),
  ...Tl(),
  ...wt(),
  ...je(),
  ...Ye()
}, "VSheet"), Ef = fe()({
  name: "VSheet",
  props: tm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = It(oe(e, "color")), {
      borderClasses: l
    } = _i(e), {
      dimensionStyles: s
    } = Kn(e), {
      elevationClasses: a
    } = Mn(e), {
      locationStyles: u
    } = Zr(e), {
      positionClasses: c
    } = Ml(e), {
      roundedClasses: f
    } = xt(e);
    return he(() => g(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, f.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), mC = X({
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
    validator: (e) => Object.keys(vi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(vi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(vi).includes(t))
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
  ...Dt(tm({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), mE = on({
  name: "VColorPicker",
  props: mC(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = $e(e, "mode"), n = Q(null), i = $e(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = kl(Nt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? ES(a, e.modelValue) : null), r = k(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = sn();
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
    return tn(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), yn({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), he(() => {
      const a = Ef.filterProps(e);
      return g(Ef, de({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": zh({
            ...r.value ?? Mi,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && g(CS, {
          key: "canvas",
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled,
          dotSize: e.dotSize,
          width: e.width,
          height: e.canvasHeight
        }, null), (!e.hideSliders || !e.hideInputs) && g("div", {
          key: "controls",
          class: "v-color-picker__controls"
        }, [!e.hideSliders && g(GS, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && g(MS, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && g(vC, {
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
}), Br = Symbol.for("vuetify:v-expansion-panel"), gC = ["default", "accordion", "inset", "popout"], yC = X({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => gC.includes(e)
  },
  readonly: Boolean,
  ...Se(),
  ...El(),
  ...je(),
  ...Ye()
}, "VExpansionPanels"), Vf = fe()({
  name: "VExpansionPanels",
  props: yC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    Wr(e, Br);
    const {
      themeClasses: i
    } = Qe(e), r = k(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return yn({
      VExpansionPanel: {
        color: oe(e, "color"),
        readonly: oe(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: oe(e, "focusable"),
        static: oe(e, "static")
      }
    }), he(() => g(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), pC = X({
  ...Se(),
  ...Ol()
}, "VExpansionPanelText"), bC = fe()({
  name: "VExpansionPanelText",
  props: pC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Fe(Br);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = eu(e, i.isSelected);
    return he(() => g(Cv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [ze(g("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && g("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[Bt, i.isSelected.value]])];
      }
    })), {};
  }
}), nm = X({
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
  ...Se()
}, "VExpansionPanelTitle"), wC = fe()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Si
  },
  props: nm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Fe(Br);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = It(e, "color"), l = k(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return he(() => {
      var s;
      return ze(g("button", {
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
      }, [g("span", {
        class: "v-expansion-panel-title__overlay"
      }, null), (s = n.default) == null ? void 0 : s.call(n, l.value), !e.hideActions && g("span", {
        class: "v-expansion-panel-title__icon"
      }, [n.actions ? n.actions(l.value) : g(De, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[en("ripple"), e.ripple]]);
    }), {};
  }
}), xC = X({
  title: String,
  text: String,
  bgColor: String,
  ...Se(),
  ...Tn(),
  ...Vl(),
  ...Ol(),
  ...wt(),
  ...je(),
  ...nm()
}, "VExpansionPanel"), gE = fe()({
  name: "VExpansionPanel",
  props: xC(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Ll(e, Br), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = It(e, "bgColor"), {
      elevationClasses: l
    } = Mn(e), {
      roundedClasses: s
    } = xt(e), a = k(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = k(() => i.group.items.value.reduce((d, h, v) => (i.group.selected.value.includes(h.id) && d.push(v), d), [])), c = k(() => {
      const d = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - d === 1);
    }), f = k(() => {
      const d = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - d === -1);
    });
    return ot(Br, i), yn({
      VExpansionPanelText: {
        eager: oe(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: oe(e, "readonly")
      }
    }), he(() => {
      const d = !!(n.text || e.text), h = !!(n.title || e.title);
      return g(e.tag, {
        class: ["v-expansion-panel", {
          "v-expansion-panel--active": i.isSelected.value,
          "v-expansion-panel--before-active": c.value,
          "v-expansion-panel--after-active": f.value,
          "v-expansion-panel--disabled": a.value
        }, s.value, r.value, e.class],
        style: [o.value, e.style]
      }, {
        default: () => {
          var v;
          return [g("div", {
            class: ["v-expansion-panel__shadow", ...l.value]
          }, null), h && g(wC, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), d && g(bC, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), ea = Symbol.for("vuetify:list");
function im() {
  const e = Fe(ea, {
    hasPrepend: pe(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: pe(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return ot(ea, t), e;
}
function rm() {
  return Fe(ea, null);
}
const fu = (e) => {
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
}, om = (e) => {
  const t = fu(e);
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
}, _C = (e) => {
  const t = fu(e);
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
}, SC = (e) => {
  const t = om(e);
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
}, CC = {
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
}, lm = {
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
}, kC = {
  open: lm.open,
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
}, du = (e) => {
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
}, sm = (e) => {
  const t = du(e);
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
}, EC = (e) => {
  const t = du(e);
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
}, VC = (e) => {
  const t = sm(e);
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
}, LC = (e) => {
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
        const f = u.shift();
        o.set(f, r ? "on" : "off"), l.has(f) && u.push(...l.get(f));
      }
      let c = s.get(i);
      for (; c; ) {
        const f = l.get(c), d = f.every((v) => o.get(v) === "on"), h = f.every((v) => !o.has(v) || o.get(v) === "off");
        o.set(c, d ? "on" : h ? "off" : "indeterminate"), c = s.get(c);
      }
      return e && !r && Array.from(o.entries()).reduce((d, h) => {
        let [v, m] = h;
        return m === "on" && d.push(v), d;
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
}, Fr = Symbol.for("vuetify:nested"), am = {
  id: pe(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: Q(/* @__PURE__ */ new Map()),
    children: Q(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: Q(!1),
    selectable: Q(!1),
    opened: Q(/* @__PURE__ */ new Set()),
    activated: Q(/* @__PURE__ */ new Set()),
    selected: Q(/* @__PURE__ */ new Map()),
    selectedValues: Q([])
  }
}, IC = X({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), PC = (e) => {
  let t = !1;
  const n = Q(/* @__PURE__ */ new Map()), i = Q(/* @__PURE__ */ new Map()), r = $e(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = k(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return _C(e.mandatory);
      case "single-leaf":
        return SC(e.mandatory);
      case "independent":
        return fu(e.mandatory);
      case "single-independent":
      default:
        return om(e.mandatory);
    }
  }), l = k(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return VC(e.mandatory);
      case "leaf":
        return EC(e.mandatory);
      case "independent":
        return du(e.mandatory);
      case "single-independent":
        return sm(e.mandatory);
      case "classic":
      default:
        return LC(e.mandatory);
    }
  }), s = k(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return kC;
      case "single":
        return CC;
      case "multiple":
      default:
        return lm;
    }
  }), a = $e(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = $e(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  nn(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const f = nt("nested"), d = {
    id: pe(),
    root: {
      opened: r,
      activatable: oe(e, "activatable"),
      selectable: oe(e, "selectable"),
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
        f.emit("click:open", {
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
        f.emit("click:select", {
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
        p && (u.value = p), d.root.openOnSelect(h, v, m);
      },
      activate: (h, v, m) => {
        if (!e.activatable)
          return d.root.select(h, !0, m);
        f.emit("click:activate", {
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
  return ot(Fr, d), d.root;
}, um = (e, t) => {
  const n = Fe(Fr, am), i = Symbol(bt()), r = k(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: k(() => n.root.opened.value.has(r.value)),
    parent: k(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: k(() => n.root.activated.value.has(_e(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: k(() => n.root.selected.value.get(_e(r.value)) === "on"),
    isIndeterminate: k(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: k(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), nn(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && ot(Fr, o), o;
}, TC = () => {
  const e = Fe(Fr, am);
  ot(Fr, {
    ...e,
    isGroupActivator: !0
  });
}, MC = on({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return TC(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), AC = X({
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
  ...Se(),
  ...je()
}, "VListGroup"), Lf = fe()({
  name: "VListGroup",
  props: AC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = um(oe(e, "value"), !0), l = k(() => `v-list-group--id-${String(o.value)}`), s = rm(), {
      isBooted: a
    } = Jv();
    function u(h) {
      r(!i.value, h);
    }
    const c = k(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: l.value
    })), f = k(() => i.value ? e.collapseIcon : e.expandIcon), d = k(() => ({
      VListItem: {
        active: i.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && f.value,
        appendIcon: e.appendIcon || !e.subgroup && f.value,
        title: e.title,
        value: e.value
      }
    }));
    return he(() => g(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": s == null ? void 0 : s.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": i.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && g(Je, {
        defaults: d.value
      }, {
        default: () => [g(MC, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), g(Sn, {
        transition: {
          component: Cv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [ze(g("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[Bt, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), $C = Zi("v-list-item-subtitle"), NC = Zi("v-list-item-title"), RC = X({
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
  onClick: Zt(),
  onClickOnce: Zt(),
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Yn(),
  ...Tn(),
  ...wt(),
  ...$l(),
  ...je(),
  ...Ye(),
  ...An({
    variant: "text"
  })
}, "VListItem"), sl = fe()({
  name: "VListItem",
  directives: {
    Ripple: Si
  },
  props: RC(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const o = Al(e, n), l = k(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: f,
      isGroupActivator: d,
      root: h,
      parent: v,
      openOnSelect: m
    } = um(l, !1), p = rm(), y = k(() => {
      var O;
      return e.active !== !1 && (e.active || ((O = o.isActive) == null ? void 0 : O.value) || (h.activatable.value ? a.value : c.value));
    }), w = k(() => e.link !== !1 && o.isLink.value), x = k(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = k(() => e.rounded || e.nav), _ = k(() => e.color ?? e.activeColor), E = k(() => ({
      color: y.value ? _.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    be(() => {
      var O;
      return (O = o.isActive) == null ? void 0 : O.value;
    }, (O) => {
      O && v.value != null && h.open(v.value, !0), O && m(O);
    }, {
      immediate: !0
    });
    const {
      themeClasses: S
    } = Qe(e), {
      borderClasses: I
    } = _i(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: H
    } = Qi(E), {
      densityClasses: L
    } = ln(e), {
      dimensionStyles: N
    } = Kn(e), {
      elevationClasses: C
    } = Mn(e), {
      roundedClasses: B
    } = xt(b), M = k(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), z = k(() => ({
      isActive: y.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: f.value
    }));
    function A(O) {
      var D;
      r("click", O), !(d || !x.value) && ((D = o.navigate) == null || D.call(o, O), h.activatable ? s(!a.value, O) : (h.selectable || e.value != null) && u(!c.value, O));
    }
    function F(O) {
      (O.key === "Enter" || O.key === " ") && (O.preventDefault(), A(O));
    }
    return he(() => {
      const O = w.value ? "a" : e.tag, D = i.title || e.title != null, Y = i.subtitle || e.subtitle != null, ee = !!(e.appendAvatar || e.appendIcon), ce = !!(ee || i.append), me = !!(e.prependAvatar || e.prependIcon), J = !!(me || i.prepend);
      return p == null || p.updateHasPrepend(J), e.activeColor && Vx("active-color", ["color", "base-color"]), ze(g(O, {
        class: ["v-list-item", {
          "v-list-item--active": y.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": x.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && y.value
        }, S.value, I.value, $.value, L.value, C.value, M.value, B.value, H.value, e.class],
        style: [R.value, N.value, e.style],
        href: o.href.value,
        tabindex: x.value ? p ? -2 : 0 : void 0,
        onClick: A,
        onKeydown: x.value && !w.value && F
      }, {
        default: () => {
          var ue;
          return [Ji(x.value || y.value, "v-list-item"), J && g("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? g(Je, {
            key: "prepend-defaults",
            disabled: !me,
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
              return [(ke = i.prepend) == null ? void 0 : ke.call(i, z.value)];
            }
          }) : g(Ve, null, [e.prependAvatar && g(yi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && g(De, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)]), g("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [D && g(NC, {
            key: "title"
          }, {
            default: () => {
              var ke;
              return [((ke = i.title) == null ? void 0 : ke.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && g($C, {
            key: "subtitle"
          }, {
            default: () => {
              var ke;
              return [((ke = i.subtitle) == null ? void 0 : ke.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (ue = i.default) == null ? void 0 : ue.call(i, z.value)]), ce && g("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? g(Je, {
            key: "append-defaults",
            disabled: !ee,
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
              return [(ke = i.append) == null ? void 0 : ke.call(i, z.value)];
            }
          }) : g(Ve, null, [e.appendIcon && g(De, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(yi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[en("ripple"), x.value && e.ripple]]);
    }), {
      isGroupActivator: d,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), OC = X({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...Se(),
  ...je()
}, "VListSubheader"), BC = fe()({
  name: "VListSubheader",
  props: OC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = Jt(oe(e, "color"));
    return he(() => {
      const o = !!(n.default || e.title);
      return g(e.tag, {
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
          return [o && g("div", {
            class: "v-list-subheader__text"
          }, [((l = n.default) == null ? void 0 : l.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), FC = X({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...Se(),
  ...Ye()
}, "VDivider"), DC = fe()({
  name: "VDivider",
  props: FC(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = Qe(e), {
      textColorClasses: r,
      textColorStyles: o
    } = Jt(oe(e, "color")), l = k(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = ge(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ge(e.thickness)), s;
    });
    return he(() => g("hr", {
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
}), HC = X({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), cm = fe()({
  name: "VListChildren",
  props: HC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return im(), () => {
      var i, r;
      return ((i = n.default) == null ? void 0 : i.call(n)) ?? ((r = e.items) == null ? void 0 : r.map((o) => {
        var d, h;
        let {
          children: l,
          props: s,
          type: a,
          raw: u
        } = o;
        if (a === "divider")
          return ((d = n.divider) == null ? void 0 : d.call(n, {
            props: s
          })) ?? g(DC, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? g(BC, s, null);
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
        }, f = Lf.filterProps(s);
        return l ? g(Lf, de({
          value: s == null ? void 0 : s.value
        }, f), {
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
            }) : g(sl, p, c);
          },
          default: () => g(cm, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : g(sl, de(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), fm = X({
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
    default: wi
  }
}, "list-items");
function ta(e, t) {
  const n = xn(t, e.itemTitle, t), i = xn(t, e.itemValue, n), r = xn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Dt(t, ["children"]) : t : void 0 : xn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? dm(e, r) : void 0,
    raw: t
  };
}
function dm(e, t) {
  const n = [];
  for (const i of t)
    n.push(ta(e, i));
  return n;
}
function zC(e) {
  const t = k(() => dm(e, e.items)), n = k(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? ta(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || ta(e, l));
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
function jC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function GC(e, t) {
  const n = xn(t, e.itemType, "item"), i = jC(t) ? t : xn(t, e.itemTitle), r = xn(t, e.itemValue, void 0), o = xn(t, e.itemChildren), l = e.itemProps === !0 ? Dt(t, ["children"]) : xn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? hm(e, o) : void 0,
    raw: t
  };
}
function hm(e, t) {
  const n = [];
  for (const i of t)
    n.push(GC(e, i));
  return n;
}
function UC(e) {
  return {
    items: k(() => hm(e, e.items))
  };
}
const WC = X({
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
  ...IC({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...xi(),
  ...Se(),
  ...Ht(),
  ...Yn(),
  ...Tn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...fm(),
  ...wt(),
  ...je(),
  ...Ye(),
  ...An({
    variant: "text"
  })
}, "VList"), qC = fe()({
  name: "VList",
  props: WC(),
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
    } = UC(e), {
      themeClasses: r
    } = Qe(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = It(oe(e, "bgColor")), {
      borderClasses: s
    } = _i(e), {
      densityClasses: a
    } = ln(e), {
      dimensionStyles: u
    } = Kn(e), {
      elevationClasses: c
    } = Mn(e), {
      roundedClasses: f
    } = xt(e), {
      children: d,
      open: h,
      parents: v,
      select: m
    } = PC(e), p = k(() => e.lines ? `v-list--${e.lines}-line` : void 0), y = oe(e, "activeColor"), w = oe(e, "baseColor"), x = oe(e, "color");
    im(), yn({
      VListGroup: {
        activeColor: y,
        baseColor: w,
        color: x,
        expandIcon: oe(e, "expandIcon"),
        collapseIcon: oe(e, "collapseIcon")
      },
      VListItem: {
        activeClass: oe(e, "activeClass"),
        activeColor: y,
        baseColor: w,
        color: x,
        density: oe(e, "density"),
        disabled: oe(e, "disabled"),
        lines: oe(e, "lines"),
        nav: oe(e, "nav"),
        slim: oe(e, "slim"),
        variant: oe(e, "variant")
      }
    });
    const b = pe(!1), _ = Q();
    function E(L) {
      b.value = !0;
    }
    function S(L) {
      b.value = !1;
    }
    function I(L) {
      var N;
      !b.value && !(L.relatedTarget && ((N = _.value) != null && N.contains(L.relatedTarget))) && H();
    }
    function $(L) {
      if (_.value) {
        if (L.key === "ArrowDown")
          H("next");
        else if (L.key === "ArrowUp")
          H("prev");
        else if (L.key === "Home")
          H("first");
        else if (L.key === "End")
          H("last");
        else
          return;
        L.preventDefault();
      }
    }
    function R(L) {
      b.value = !0;
    }
    function H(L) {
      if (_.value)
        return Zo(_.value, L);
    }
    return he(() => g(e.tag, {
      ref: _,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, o.value, s.value, a.value, c.value, p.value, f.value, e.class],
      style: [l.value, u.value, e.style],
      tabindex: e.disabled || b.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: E,
      onFocusout: S,
      onFocus: I,
      onKeydown: $,
      onMousedown: R
    }, {
      default: () => [g(cm, {
        items: i.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: m,
      focus: H,
      children: d,
      parents: v
    };
  }
}), YC = X({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...Dt(eo({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Ja
    }
  }), ["absolute"])
}, "VMenu"), KC = fe()({
  name: "VMenu",
  props: YC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = Qr(), o = bt(), l = k(() => e.id || `v-menu-${o}`), s = Q(), a = Fe(qs, null), u = pe(0);
    ot(qs, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !gx(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, x, b;
      const p = m.relatedTarget, y = m.target;
      await qe(), i.value && p !== y && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((x = s.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(y) && // It isn't inside the menu body
      !s.value.contentEl.contains(y) && ((b = Ar(s.value.contentEl)[0]) == null || b.focus());
    }
    be(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function f(m) {
      a == null || a.closeParents(m);
    }
    function d(m) {
      var p, y, w;
      e.disabled || m.key === "Tab" && (Ah(Ar((p = s.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (y = s.value) == null ? void 0 : y.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var y;
      if (e.disabled) return;
      const p = (y = s.value) == null ? void 0 : y.contentEl;
      p && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), Zo(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Zo(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = k(() => de({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return he(() => {
      const m = Wn.filterProps(e);
      return g(Wn, de({
        ref: s,
        id: l.value,
        class: ["v-menu", e.class],
        style: e.style
      }, m, {
        modelValue: i.value,
        "onUpdate:modelValue": (p) => i.value = p,
        absolute: !0,
        activatorProps: v.value,
        "onClick:outside": f,
        onKeydown: d
      }, r), {
        activator: n.activator,
        default: function() {
          for (var p = arguments.length, y = new Array(p), w = 0; w < p; w++)
            y[w] = arguments[w];
          return g(Je, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = n.default) == null ? void 0 : x.call(n, ...y)];
            }
          });
        }
      });
    }), Xn({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), XC = ["color", "file", "time", "date", "datetime-local", "week", "month"], vm = X({
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
  ...Ci(),
  ...ru()
}, "VTextField"), If = fe()({
  name: "VTextField",
  directives: {
    Intersect: pv
  },
  inheritAttrs: !1,
  props: vm(),
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
    } = er(e), u = k(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = k(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = k(() => ["plain", "underlined"].includes(e.variant));
    function d(E, S) {
      var I, $;
      !e.autofocus || !E || ($ = (I = S[0].target) == null ? void 0 : I.focus) == null || $.call(I);
    }
    const h = Q(), v = Q(), m = Q(), p = k(() => XC.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
    function y() {
      var E;
      m.value !== document.activeElement && ((E = m.value) == null || E.focus()), l.value || s();
    }
    function w(E) {
      i("mousedown:control", E), E.target !== m.value && (y(), E.preventDefault());
    }
    function x(E) {
      y(), i("click:control", E);
    }
    function b(E) {
      E.stopPropagation(), y(), qe(() => {
        o.value = null, Mh(e["onClick:clear"], E);
      });
    }
    function _(E) {
      var I;
      const S = E.target;
      if (o.value = S.value, (I = e.modelModifiers) != null && I.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [S.selectionStart, S.selectionEnd];
        qe(() => {
          S.selectionStart = $[0], S.selectionEnd = $[1];
        });
      }
    }
    return he(() => {
      const E = !!(r.counter || e.counter !== !1 && e.counter != null), S = !!(E || r.details), [I, $] = Xi(n), {
        modelValue: R,
        ...H
      } = Ft.filterProps(e), L = Nv(e);
      return g(Ft, de({
        ref: h,
        modelValue: o.value,
        "onUpdate:modelValue": (N) => o.value = N,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, I, H, {
        centerAffix: !f.value,
        focused: l.value
      }), {
        ...r,
        default: (N) => {
          let {
            id: C,
            isDisabled: B,
            isDirty: M,
            isReadonly: z,
            isValid: A
          } = N;
          return g(ou, de({
            ref: v,
            onMousedown: w,
            onClick: x,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: C.value,
            active: p.value || M.value,
            dirty: M.value || e.dirty,
            disabled: B.value,
            focused: l.value,
            error: A.value === !1
          }), {
            ...r,
            default: (F) => {
              let {
                props: {
                  class: O,
                  ...D
                }
              } = F;
              const Y = ze(g("input", de({
                ref: m,
                value: o.value,
                onInput: _,
                autofocus: e.autofocus,
                readonly: z.value,
                disabled: B.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: y,
                onBlur: a
              }, D, $), null), [[en("intersect"), {
                handler: d
              }, null, {
                once: !0
              }]]);
              return g(Ve, null, [e.prefix && g("span", {
                class: "v-text-field__prefix"
              }, [g("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? g("div", {
                class: O,
                "data-no-activator": ""
              }, [r.default(), Y]) : kn(Y, {
                class: O
              }), e.suffix && g("span", {
                class: "v-text-field__suffix"
              }, [g("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: S ? (N) => {
          var C;
          return g(Ve, null, [(C = r.details) == null ? void 0 : C.call(r, N), E && g(Ve, null, [g("span", null, null), g(Av, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), Xn({}, h, v, m);
  }
}), ZC = X({
  renderless: Boolean,
  ...Se()
}, "VVirtualScrollItem"), JC = fe()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: ZC(),
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
    } = Wi(void 0, "border");
    be(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), he(() => {
      var s, a;
      return e.renderless ? g(Ve, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : g("div", de({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), QC = -1, ek = 1, hs = 100, tk = X({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function nk(e, t) {
  const n = Qa(), i = pe(0);
  mn(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = pe(0), o = pe(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = pe(0), s = pe(0), a = Q(), u = Q();
  let c = 0;
  const {
    resizeRef: f,
    contentRect: d
  } = Wi();
  mn(() => {
    f.value = a.value;
  });
  const h = k(() => {
    var F;
    return a.value === document.documentElement ? n.height.value : ((F = d.value) == null ? void 0 : F.height) || parseInt(e.height) || 0;
  }), v = k(() => !!(a.value && u.value && h.value && i.value));
  let m = Array.from({
    length: t.value.length
  }), p = Array.from({
    length: t.value.length
  });
  const y = pe(0);
  let w = -1;
  function x(F) {
    return m[F] || i.value;
  }
  const b = dx(() => {
    const F = performance.now();
    p[0] = 0;
    const O = t.value.length;
    for (let D = 1; D <= O - 1; D++)
      p[D] = (p[D - 1] || 0) + x(D - 1);
    y.value = Math.max(y.value, performance.now() - F);
  }, y), _ = be(v, (F) => {
    F && (_(), c = u.value.offsetTop, b.immediate(), B(), ~w && qe(() => {
      Re && window.requestAnimationFrame(() => {
        z(w), w = -1;
      });
    }));
  });
  ht(() => {
    b.clear();
  });
  function E(F, O) {
    const D = m[F], Y = i.value;
    i.value = Y ? Math.min(i.value, O) : O, (D !== O || Y !== i.value) && (m[F] = O, b());
  }
  function S(F) {
    return F = Et(F, 0, t.value.length - 1), p[F] || 0;
  }
  function I(F) {
    return ik(p, F);
  }
  let $ = 0, R = 0, H = 0;
  be(h, (F, O) => {
    O && (B(), F < O && requestAnimationFrame(() => {
      R = 0, B();
    }));
  });
  function L() {
    if (!a.value || !u.value) return;
    const F = a.value.scrollTop, O = performance.now();
    O - H > 500 ? (R = Math.sign(F - $), c = u.value.offsetTop) : R = F - $, $ = F, H = O, B();
  }
  function N() {
    !a.value || !u.value || (R = 0, H = 0, B());
  }
  let C = -1;
  function B() {
    cancelAnimationFrame(C), C = requestAnimationFrame(M);
  }
  function M() {
    if (!a.value || !h.value) return;
    const F = $ - c, O = Math.sign(R), D = Math.max(0, F - hs), Y = Et(I(D), 0, t.value.length), ee = F + h.value + hs, ce = Et(I(ee) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (O !== QC || Y < r.value) && (O !== ek || ce > o.value)
    ) {
      const me = S(r.value) - S(Y), J = S(ce) - S(o.value);
      Math.max(me, J) > hs ? (r.value = Y, o.value = ce) : (Y <= 0 && (r.value = Y), ce >= t.value.length && (o.value = ce));
    }
    l.value = S(r.value), s.value = S(t.value.length) - S(o.value);
  }
  function z(F) {
    const O = S(F);
    !a.value || F && !O ? w = F : a.value.scrollTop = O;
  }
  const A = k(() => t.value.slice(r.value, o.value).map((F, O) => ({
    raw: F,
    index: O + r.value
  })));
  return be(t, () => {
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
    scrollToIndex: z,
    handleScroll: L,
    handleScrollend: N,
    handleItemResize: E
  };
}
function ik(e, t) {
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
const rk = X({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...tk(),
  ...Se(),
  ...Yn()
}, "VVirtualScroll"), ok = fe()({
  name: "VVirtualScroll",
  props: rk(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = nt("VVirtualScroll"), {
      dimensionStyles: r
    } = Kn(e), {
      containerRef: o,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: f,
      paddingBottom: d,
      computedItems: h
    } = nk(e, oe(e, "items"));
    return gi(() => e.renderless, () => {
      function v() {
        var y, w;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", a)) : ((y = o.value) == null || y[p]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[p]("scrollend", a));
      }
      tn(() => {
        o.value = Xh(i.vnode.el, !0), v(!0);
      }), ht(v);
    }), he(() => {
      const v = h.value.map((m) => g(JC, {
        key: m.index,
        renderless: e.renderless,
        "onUpdate:height": (p) => u(m.index, p)
      }, {
        default: (p) => {
          var y;
          return (y = n.default) == null ? void 0 : y.call(n, {
            item: m.raw,
            index: m.index,
            ...p
          });
        }
      }));
      return e.renderless ? g(Ve, null, [g("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ge(f.value)
        }
      }, null), v, g("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ge(d.value)
        }
      }, null)]) : g("div", {
        ref: o,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: a,
        style: [r.value, e.style]
      }, [g("div", {
        ref: l,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ge(f.value),
          paddingBottom: ge(d.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function lk(e, t) {
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
    var c, f;
    if (s.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(s.key)) return;
    const a = (f = e.value) == null ? void 0 : f.$el;
    if (!a) return;
    (s.key === "Home" || s.key === "End") && a.scrollTo({
      top: s.key === "Home" ? 0 : a.scrollHeight,
      behavior: "smooth"
    }), await o();
    const u = a.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (s.key === "PageDown" || s.key === "Home") {
      const d = a.getBoundingClientRect().top;
      for (const h of u)
        if (h.getBoundingClientRect().top >= d) {
          h.focus();
          break;
        }
    } else {
      const d = a.getBoundingClientRect().bottom;
      for (const h of [...u].reverse())
        if (h.getBoundingClientRect().bottom <= d) {
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
const sk = X({
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
  ...fm({
    itemChildren: !1
  })
}, "Select"), ak = X({
  ...sk(),
  ...Dt(vm({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...Jr({
    transition: {
      component: Ja
    }
  })
}, "VSelect"), yE = fe()({
  name: "VSelect",
  props: ak(),
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
    } = Kr(), r = Q(), o = Q(), l = Q(), s = $e(e, "menu"), a = k({
      get: () => s.value,
      set: (A) => {
        var F;
        s.value && !A && ((F = o.value) != null && F.ΨopenChildren) || (s.value = A);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: f
    } = zC(e), d = $e(e, "modelValue", [], (A) => c(A === null ? [null] : vn(A)), (A) => {
      const F = f(A);
      return e.multiple ? F : F[0] ?? null;
    }), h = k(() => typeof e.counterValue == "function" ? e.counterValue(d.value) : typeof e.counterValue == "number" ? e.counterValue : d.value.length), v = Rv(), m = k(() => d.value.map((A) => A.value)), p = pe(!1), y = k(() => a.value ? e.closeText : e.openText);
    let w = "", x;
    const b = k(() => e.hideSelected ? u.value.filter((A) => !d.value.some((F) => F === A)) : u.value), _ = k(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = k(() => {
      var A;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((A = e.menuProps) == null ? void 0 : A.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), S = Q(), {
      onListScroll: I,
      onListKeydown: $
    } = lk(S, r);
    function R(A) {
      e.openOnClear && (a.value = !0);
    }
    function H() {
      _.value || (a.value = !a.value);
    }
    function L(A) {
      var ee, ce;
      if (!A.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(A.key) && A.preventDefault(), ["Enter", "ArrowDown", " "].includes(A.key) && (a.value = !0), ["Escape", "Tab"].includes(A.key) && (a.value = !1), A.key === "Home" ? (ee = S.value) == null || ee.focus("first") : A.key === "End" && ((ce = S.value) == null || ce.focus("last"));
      const F = 1e3;
      function O(me) {
        const J = me.key.length === 1, ue = !me.ctrlKey && !me.metaKey && !me.altKey;
        return J && ue;
      }
      if (e.multiple || !O(A)) return;
      const D = performance.now();
      D - x > F && (w = ""), w += A.key.toLowerCase(), x = D;
      const Y = u.value.find((me) => me.title.toLowerCase().startsWith(w));
      Y !== void 0 && (d.value = [Y]);
    }
    function N(A) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!A.props.disabled)
        if (e.multiple) {
          const O = d.value.findIndex((Y) => e.valueComparator(Y.value, A.value)), D = F ?? !~O;
          if (~O) {
            const Y = D ? [...d.value, A] : [...d.value];
            Y.splice(O, 1), d.value = Y;
          } else D && (d.value = [...d.value, A]);
        } else {
          const O = F !== !1;
          d.value = O ? [A] : [], qe(() => {
            a.value = !1;
          });
        }
    }
    function C(A) {
      var F;
      (F = S.value) != null && F.$el.contains(A.relatedTarget) || (a.value = !1);
    }
    function B() {
      var A;
      p.value && ((A = r.value) == null || A.focus());
    }
    function M(A) {
      p.value = !0;
    }
    function z(A) {
      if (A == null) d.value = [];
      else if (Jo(r.value, ":autofill") || Jo(r.value, ":-webkit-autofill")) {
        const F = u.value.find((O) => O.title === A);
        F && N(F);
      } else r.value && (r.value.value = "");
    }
    return be(a, () => {
      if (!e.hideSelected && a.value && d.value.length) {
        const A = b.value.findIndex((F) => d.value.some((O) => e.valueComparator(O.value, F.value)));
        Re && window.requestAnimationFrame(() => {
          var F;
          A >= 0 && ((F = l.value) == null || F.scrollToIndex(A));
        });
      }
    }), be(() => e.items, (A, F) => {
      a.value || p.value && !F.length && A.length && (a.value = !0);
    }), he(() => {
      const A = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), O = d.value.length > 0, D = If.filterProps(e), Y = O || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return g(If, de({
        ref: r
      }, D, {
        modelValue: d.value.map((ee) => ee.props.value).join(", "),
        "onUpdate:modelValue": z,
        focused: p.value,
        "onUpdate:focused": (ee) => p.value = ee,
        validationValue: d.externalValue,
        counterValue: h.value,
        dirty: O,
        class: ["v-select", {
          "v-select--active-menu": a.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": d.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: Y,
        "onClick:clear": R,
        "onMousedown:control": H,
        onBlur: C,
        onKeydown: L,
        "aria-label": i(y.value),
        title: i(y.value)
      }), {
        ...n,
        default: () => g(Ve, null, [g(KC, de({
          ref: o,
          modelValue: a.value,
          "onUpdate:modelValue": (ee) => a.value = ee,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: _.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: B
        }, E.value), {
          default: () => [F && g(qC, de({
            ref: S,
            selected: m.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ee) => ee.preventDefault(),
            onKeydown: $,
            onFocusin: M,
            onScrollPassive: I,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var ee, ce, me;
              return [(ee = n["prepend-item"]) == null ? void 0 : ee.call(n), !b.value.length && !e.hideNoData && (((ce = n["no-data"]) == null ? void 0 : ce.call(n)) ?? g(sl, {
                title: i(e.noDataText)
              }, null)), g(ok, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var zt;
                  let {
                    item: ue,
                    index: ke,
                    itemRef: Ke
                  } = J;
                  const lt = de(ue.props, {
                    ref: Ke,
                    key: ke,
                    onClick: () => N(ue, null)
                  });
                  return ((zt = n.item) == null ? void 0 : zt.call(n, {
                    item: ue,
                    index: ke,
                    props: lt
                  })) ?? g(sl, de(lt, {
                    role: "option"
                  }), {
                    prepend: (an) => {
                      let {
                        isSelected: V
                      } = an;
                      return g(Ve, null, [e.multiple && !e.hideSelected ? g(Zs, {
                        key: ue.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && g(yi, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && g(De, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (me = n["append-item"]) == null ? void 0 : me.call(n)];
            }
          })]
        }), d.value.map((ee, ce) => {
          function me(Ke) {
            Ke.stopPropagation(), Ke.preventDefault(), N(ee, !1);
          }
          const J = {
            "onClick:close": me,
            onMousedown(Ke) {
              Ke.preventDefault(), Ke.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ue = A ? !!n.chip : !!n.selection, ke = ue ? $h(A ? n.chip({
            item: ee,
            index: ce,
            props: J
          }) : n.selection({
            item: ee,
            index: ce
          })) : void 0;
          if (!(ue && !ke))
            return g("div", {
              key: ee.value,
              class: "v-select__selection"
            }, [A ? n.chip ? g(Je, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ee.title
                }
              }
            }, {
              default: () => [ke]
            }) : g(Mv, de({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ee.title,
              disabled: ee.props.disabled
            }, J), null) : ke ?? g("span", {
              class: "v-select__selection-text"
            }, [ee.title, e.multiple && ce < d.value.length - 1 && g("span", {
              class: "v-select__selection-comma"
            }, [Xe(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var ee = arguments.length, ce = new Array(ee), me = 0; me < ee; me++)
            ce[me] = arguments[me];
          return g(Ve, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...ce), e.menuIcon ? g(De, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Xn({
      isFocused: p,
      menu: a,
      select: N
    }, r);
  }
}), uk = X({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Ci(),
  ...Fl()
}, "VSwitch"), ar = fe()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: uk(),
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
    } = Pl(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = er(e), c = Q(), f = k(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = bt(), h = k(() => e.id || `switch-${d}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(p) {
      var y, w;
      p.stopPropagation(), p.preventDefault(), (w = (y = c.value) == null ? void 0 : y.input) == null || w.click();
    }
    return he(() => {
      const [p, y] = Xi(n), w = Ft.filterProps(e), x = qi.filterProps(e);
      return g(Ft, de({
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
            id: _,
            messagesId: E,
            isDisabled: S,
            isReadonly: I,
            isValid: $
          } = b;
          const R = {
            model: o,
            isValid: $
          };
          return g(qi, de({
            ref: c
          }, x, {
            modelValue: o.value,
            "onUpdate:modelValue": [(H) => o.value = H, v],
            id: _.value,
            "aria-describedby": E.value,
            type: "checkbox",
            "aria-checked": r.value ? "mixed" : void 0,
            disabled: S.value,
            readonly: I.value,
            onFocus: a,
            onBlur: u
          }, y), {
            ...i,
            default: (H) => {
              let {
                backgroundColorClasses: L,
                backgroundColorStyles: N
              } = H;
              return g("div", {
                class: ["v-switch__track", ...L.value],
                style: N.value,
                onClick: m
              }, [i["track-true"] && g("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [i["track-true"](R)]), i["track-false"] && g("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [i["track-false"](R)])]);
            },
            input: (H) => {
              let {
                inputNode: L,
                icon: N,
                backgroundColorClasses: C,
                backgroundColorStyles: B
              } = H;
              return g(Ve, null, [L, g("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": N || e.loading
                }, e.inset ? void 0 : C.value],
                style: e.inset ? void 0 : B.value
              }, [i.thumb ? g(Je, {
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
              }) : g(_v, null, {
                default: () => [e.loading ? g(Xa, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : f.value
                }, {
                  default: (M) => i.loader ? i.loader(M) : g(nv, {
                    active: M.isActive,
                    color: M.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && g(De, {
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
}), ck = /* @__PURE__ */ Ki({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = Q(n.isWelcome), r = Q(n.config.showNodeLabels), o = Q(n.config.nodePhysicsEnabled), l = Q(n.config.showLinkLabels), s = Q(n.config.fixedLinkDistanceEnabled), a = Q(n.config.zoomEnabled), u = Q(String(n.config.nodeRadius)), c = Q(""), f = Q("black"), d = Q(""), h = Q(n.config.persistSettingsLocalStorage), v = t;
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
    return (y, w) => (Ct(), dn(tu, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (x) => i.value = x),
      persistent: ""
    }, {
      activator: ae(({ props: x }) => [
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: ae(({ props: b }) => [
            g(rt, de({
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
      default: ae(({ isActive: x }) => [
        g(Za, { class: "pa-3" }, {
          default: ae(() => [
            n.isWelcome ? (Ct(), dn(Or, { key: 0 }, {
              default: ae(() => [
                Xe("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (Ct(), dn(Or, { key: 1 }, {
              default: ae(() => [
                Xe("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (Ct(), dn(dr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ae(() => [
                Xe(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Ut("", !0),
            g(br, null, {
              default: ae(() => [
                g(mt, null, {
                  default: ae(() => [
                    g(Ti, { cols: "5" }, {
                      default: ae(() => [
                        g(mt, null, {
                          default: ae(() => [
                            g(dr, { class: "py-5" }, {
                              default: ae(() => [
                                Xe("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, null, {
                          default: ae(() => [
                            g(Vf, null, {
                              default: ae(() => [
                                Ut("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, null, {
                          default: ae(() => [
                            g(Ti, { class: "mx-0 px-0" }, {
                              default: ae(() => [
                                g(ar, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            g(Ti, { class: "mx-0 px-0" }, {
                              default: ae(() => [
                                Ut("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            g(ar, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            Ut("", !0)
                          ]),
                          _: 1
                        }),
                        g(mt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            Ut("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    g(ll),
                    g(Ti, { cols: "5" }, {
                      default: ae(() => [
                        g(mt, null, {
                          default: ae(() => [
                            g(dr, { class: "py-5" }, {
                              default: ae(() => [
                                Xe("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, null, {
                          default: ae(() => [
                            g(Vf, null, {
                              default: ae(() => [
                                Ut("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, null, {
                          default: ae(() => [
                            g(ar, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": w[6] || (w[6] = (b) => l.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        g(mt, null, {
                          default: ae(() => [
                            g(ar, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            Ut("", !0)
                          ]),
                          _: 1
                        }),
                        g(mt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            g(dr, { class: "px-0" }, {
                              default: ae(() => [
                                Xe("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(mt, { class: "py-0 my-0" }, {
                          default: ae(() => [
                            g(ar, {
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
            g(Nl, null, {
              default: ae(() => [
                g(_S, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                g(ll),
                g(rt, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: ae(() => [
                    Xe("Save")
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
}), fk = /* @__PURE__ */ Ne("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), dk = /* @__PURE__ */ Ne("div", { class: "graph-host uninitialised" }, null, -1), hk = {
  key: 0,
  class: "button-container"
}, vk = { class: "info-text text-h5 text-grey" }, mk = /* @__PURE__ */ Ki({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = k(() => {
      const T = document.querySelectorAll("graph-editor");
      let G;
      for (let W = 0; W < T.length; W++) {
        const U = T[W], Me = qt(U.shadowRoot).select(".graph-host.uninitialised");
        if (!Me.empty()) {
          Me.classed("uninitialised", !1), G = Me;
          break;
        }
      }
      return G === void 0 && (G = qt(".graph-host.uninitialised"), G.classed("uninitialised", !1)), G;
    });
    gl(() => {
      z();
    }), tn(() => {
      A(), window.addEventListener("resize", we);
    }), yl(() => {
      window.removeEventListener("resize", we);
    });
    const i = Q(!1), r = Q(!1), o = Q(""), l = Q(""), s = Q(new xc()), a = Q(!1), u = Qt(new Iw());
    let c, f = 400, d = 400, h, v, m, p, y, w, x, b, _, E = 0, S = 0, I = 1;
    t({
      getGraph: $,
      setGraph: R,
      printGraph: H,
      setNodeColor: L,
      setLinkColor: N,
      deleteNode: C,
      deleteLink: B,
      toggleNodeLabels: te,
      toggleLinkLabels: re,
      toggleZoom: ie,
      toggleNodePhysics: K,
      toggleFixedLinkDistance: ne,
      toggleGraphEditingInGUI: M,
      resetView: we
    });
    function $(T = "json") {
      if (T.toLowerCase() === "json")
        return JSON.parse(
          s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
        );
      if (T.toLowerCase() === "tgf")
        return s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function R(T) {
      typeof T == "object" || typeof T == "string" ? le(T) : Le();
    }
    function H(T = "json") {
      T.toLowerCase() === "json" ? console.log(
        s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
      ) : console.log(s.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function L(T, G) {
      if (G !== void 0) {
        const U = (Array.isArray(G) ? G : [G]).map(Number);
        for (const se of U)
          y.selectAll("circle").filter((Me) => Me.id === se).each((Me) => Me.color = T).style("fill", T);
      } else
        y.selectAll("circle").each((W) => W.color = T).style("fill", T);
    }
    function N(T, G) {
      if (G) {
        const W = Array.isArray(G) ? G : [G];
        ve(W);
        for (const U of W)
          p.selectAll(".link").filter((se) => se.id === U).each((se) => se.color = T).style("stroke", T);
      } else
        ve(s.value.links.map((W) => W.id)), p.selectAll(".link").each((W) => W.color = T).style("stroke", T);
      Os(m, u, T);
    }
    function C(T) {
      const G = Array.isArray(T) ? T : [T];
      for (const W of G)
        y.selectAll("circle").filter((U) => U.id === W).each(function(U) {
          let se = s.value.removeNode(U);
          if (se !== void 0) {
            let [Me, et] = se;
            ts(Me, n.value), et.forEach((Ge) => {
              lr(Ge, n.value);
            });
          }
        });
      a.value = s.value.nodes.length > 0;
    }
    function B(T) {
      const G = Array.isArray(T) ? T : [T];
      for (const W of G)
        p.selectAll("path").filter((U) => U.id === W).each(function(U) {
          let se = s.value.removeLink(U);
          se !== void 0 && lr(se, n.value);
        });
    }
    function M(T) {
      u.isGraphEditableInGUI = T;
    }
    function z() {
      const T = (G) => G === "false" ? !1 : !!G;
      localStorage.wasHere && (i.value = T(localStorage.wasHere)), localStorage.showNodeLabels && (u.showNodeLabels = T(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (u.nodePhysicsEnabled = T(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (u.showLinkLabels = T(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (u.fixedLinkDistanceEnabled = T(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (u.zoomEnabled = T(localStorage.enableZoom)), localStorage.persistSettings && (u.persistSettingsLocalStorage = T(localStorage.persistSettings));
    }
    function A() {
      f = n.value.node().clientWidth, d = n.value.node().clientHeight, h = vw(
        (T) => F(T, u.zoomEnabled),
        u.zoomEnabled
      ), m = _w(
        n.value,
        h,
        (T) => u.isGraphEditableInGUI ? zt(T) : null,
        (T) => u.isGraphEditableInGUI ? lt(T) : null,
        (T) => {
          u.isGraphEditableInGUI && D(
            Mt(T, m.node())[0],
            Mt(T, m.node())[1]
          );
        }
      ), kw(m, u, s.value.getNonDefaultLinkColors()), w = Ew(m), p = Sw(m), y = Cw(m), c = Vw(s.value, u, f, d, () => Y()), v = xw(c, f, d, u.nodeRadius), ke();
    }
    function F(T, G = !0) {
      G && (E = T.transform.x, S = T.transform.y, I = T.transform.k, m.attr("transform", `translate(${E},${S})scale(${I})`));
    }
    function O(T, G, W, U) {
      let se = s.value.createLink(T.id, G.id, W, U);
      se !== void 0 && yw(se, n.value), ke();
    }
    function D(T, G, W, U, se) {
      let Me = s.value.createNode(
        T ?? f / 2,
        G ?? d / 2,
        W,
        U,
        se
      );
      gw(Me, n.value), a.value = !0, ke();
    }
    function Y() {
      y.attr("transform", (T) => `translate(${T.x},${T.y})`), p.selectAll("path").attr("d", (T) => ee(T)), ue(), ke();
    }
    function ee(T) {
      switch (ce(T), T.pathType) {
        case _t.REFLEXIVE:
          return kc(T.source, [f / 2, d / 2], u);
        case _t.ARC:
          return rs(T.source, T.target, u);
        case _t.ARCREVERSE:
          return Vc.reverse(rs(T.source, T.target, u));
        case _t.LINE:
          return is(T.source, T.target, u);
        case _t.LINEREVERSE:
          return Vc.reverse(is(T.source, T.target, u));
        default:
          return "";
      }
    }
    function ce(T) {
      T.source.id === T.target.id ? T.pathType = _t.REFLEXIVE : me(T.source, T.target) ? T.pathType = J(T.source, T.target) ? _t.ARCREVERSE : _t.ARC : T.pathType = J(T.source, T.target) ? _t.LINEREVERSE : _t.LINE;
    }
    function me(T, G) {
      return T.id !== G.id && s.value.links.some((W) => W.target.id === T.id && W.source.id === G.id) && s.value.links.some((W) => W.target.id === G.id && W.source.id === T.id);
    }
    function J(T, G) {
      return T.x > G.x;
    }
    function ue() {
      const T = x;
      if (T !== void 0) {
        const G = b;
        if (G !== void 0)
          w.attr("d", () => T.id === G.id ? kc(T, [f / 2, d / 2], u) : me(T, G) ? is(T, G, u) : rs(T, G, u));
        else if (_ !== void 0) {
          const W = [T.x, T.y];
          w.attr("d", Ec(W, _));
        }
      }
    }
    function ke(T = 0.5) {
      p = p.data(s.value.links, (G) => G.id).join(
        (G) => {
          const W = G.append("g");
          return W.append("path").classed("link", !0).style("stroke", (U) => U.color ? U.color : "").attr("id", (U) => U.id).attr(
            "marker-end",
            (U) => U.color ? "url(#link-arrow-" + U.color : "url(#link-arrow)"
          ), W.append("path").classed("clickbox", !0).on("pointerdown", (U, se) => {
            bw(se, U.button, n.value);
            let Me = se.color;
            if (U.button === 1 && (ri(U), u.isGraphEditableInGUI)) {
              let et = s.value.removeLink(se);
              et !== void 0 && lr(et, n.value), Me && (s.value.hasNonDefaultLinkColor(Me) || ns(m, Me));
            }
          }), W.append("text").append("textPath").attr(
            "class",
            (U) => U.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (U) => `#${U.id}`).attr("startOffset", "50%").text((U) => U.label ? U.label : "add label").on("click", (U, se) => {
            u.isGraphEditableInGUI && V(U, se);
          }), W;
        },
        (G) => (G.selectChild("path").attr("marker-start", function(W) {
          var U;
          if ((U = W.pathType) != null && U.includes("REVERSE")) {
            let se = "url(#link-arrow-reverse";
            return W.color && (se += "-" + Tr(W.color)), se += ")", se;
          } else
            return null;
        }).attr("marker-end", function(W) {
          var U;
          if ((U = W.pathType) != null && U.includes("REVERSE"))
            return null;
          {
            let se = "url(#link-arrow";
            return W.color && (se += "-" + Tr(W.color)), se += ")", se;
          }
        }), G.selectChild("text").attr("class", (W) => {
          var U;
          return `${(U = W.pathType) == null ? void 0 : U.toLowerCase()}-path-text`;
        }).attr("dy", (W) => {
          var U;
          return W.pathType === _t.REFLEXIVE ? 15 : W.pathType == _t.LINEREVERSE ? -10 : (U = W.pathType) != null && U.includes("REVERSE") ? 20 : -10;
        }), G.selectChild("text").selectChild("textPath").classed("hidden", !u.showLinkLabels).classed("not-editable", !u.isGraphEditableInGUI).attr("startOffset", (W) => {
          var U;
          return (U = W.pathType) != null && U.includes("REVERSE") ? "46%" : "50%";
        }), G)
      ), y = y.data(s.value.nodes, (G) => G.id).join(
        (G) => {
          const W = G.append("g").call(v).on("pointerdown", (U, se) => {
            if (U.button === 1 && (ri(U), u.isGraphEditableInGUI)) {
              let Me = s.value.removeNode(se);
              if (Me !== void 0) {
                let [et, Ge] = Me;
                ts(et, n.value), Ge.forEach((st) => {
                  lr(st, n.value);
                });
              }
              a.value = s.value.nodes.length > 0, Z(), ke();
            }
          });
          return W.append("circle").classed("node", !0).attr("id", (U) => U.id).attr("r", u.nodeRadius).style("fill", (U) => U.color ? U.color : "").on("mouseenter", (U, se) => b = se).on("mouseout", () => b = void 0).on("pointerdown", (U, se) => {
            pw(se, U.button, n.value), u.isGraphEditableInGUI && Ke(U, se);
          }).on("pointerup", (U) => {
            u.isGraphEditableInGUI && lt(U);
          }), W.append("text").attr(
            "class",
            (U) => U.label ? "node-label" : "node-label-placeholder"
          ).text((U) => U.label ? U.label : "add label").attr("dy", "0.33em").on("click", (U, se) => {
            u.isGraphEditableInGUI && an(U, se);
          }).on("mouseenter", (U, se) => b = se).on("mouseout", () => b = void 0), W;
        },
        (G) => (G.selectChild("text").classed("hidden", !u.showNodeLabels).classed("not-editable", !u.isGraphEditableInGUI), G)
      ), c.nodes(s.value.nodes), c.alpha(T).restart();
    }
    function Ke(T, G) {
      if (T.button !== 0)
        return;
      ri(T);
      const W = [G.x, G.y];
      _ = W, x = G, w.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Ec(W, W)), ke();
    }
    function lt(T) {
      const G = x, W = b;
      Z(), !(G === void 0 || W === void 0) && (ri(T), O(G, W));
    }
    function zt(T) {
      if (ri(T), x !== void 0) {
        const G = Ip(T, n.value.node())[0], W = [
          (G[0] - E) / I,
          (G[1] - S) / I
        ];
        T.pointerType === "touch" && (W[1] = W[1] - 4 * u.nodeRadius, b = s.value.nodes.find(
          (U) => Math.sqrt(Math.pow(U.x - W[0], 2) + Math.pow(U.y - W[1], 2)) < u.nodeRadius
        )), _ = W, ue();
      }
    }
    function an(T, G) {
      const W = T == null ? void 0 : T.target;
      P(G, W, [G.x, G.y]);
    }
    function V(T, G) {
      const W = T.target;
      let U = j(W);
      P(G, W, U);
    }
    function P(T, G, W) {
      var st;
      let U = T instanceof bh ? "node" : "link";
      const se = document.createElement("input");
      se.setAttribute("class", "label-input"), T.label == null ? se.value = "" : se.value = T.label, se.placeholder = `Enter ${U} label`;
      let Me = !1;
      se.onkeyup = function(tr) {
        tr.key === "Enter" ? (ww(T, se.value, n.value), Me = !0, se.blur()) : tr.key === "Escape" && (se.value = "", se.blur());
      }, se.onblur = function() {
        Me && (se.value === "" ? (G.setAttribute("class", `${U}-label-placeholder`), G.textContent = "add label", T.label = void 0) : (G.setAttribute("class", `${U}-label`), G.textContent = se.value.trim(), T.label = G.textContent)), et.remove();
      };
      const et = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      et.setAttribute("width", "100%"), et.setAttribute("height", "100%"), et.setAttribute("x", `${W[0] - 80}`), et.setAttribute("y", `${W[1] - 12}`), et.append(se);
      const Ge = G.closest("svg");
      (st = Ge == null ? void 0 : Ge.querySelector("g")) == null || st.append(et), se.focus();
    }
    function j(T) {
      let G = n.value.select("svg").node().getBoundingClientRect(), W = T.getBoundingClientRect(), U = (W.x - G.x - E) / I, se = (W.y - G.y - S) / I;
      return [U, se];
    }
    function q(T) {
      te(T.showNodeLabels), K(T.nodePhysicsEnabled), re(T.showLinkLabels), ne(T.fixedLinkDistanceEnabled), ie(T.zoomEnabled), u.persistSettingsLocalStorage = T.persistEnabled;
    }
    function K(T) {
      u.nodePhysicsEnabled = T, wh(c, T, f, d);
    }
    function ne(T) {
      u.fixedLinkDistanceEnabled = T, xh(c, s.value, u, T);
    }
    function re(T) {
      u.showLinkLabels = T;
    }
    function te(T) {
      u.showNodeLabels = T;
    }
    function ie(T) {
      u.zoomEnabled = T, we();
    }
    function Z() {
      w == null || w.classed("hidden", !0).attr("marker-end", "null"), x = void 0, b = void 0, _ = void 0;
    }
    function le(T) {
      let G, W;
      try {
        if (typeof T == "string")
          [G, W] = rx(T);
        else if (typeof T == "object")
          [G, W] = ox(T);
        else {
          Ae("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (U) {
        Ae("Error during parsing:", `Invalid data format:
` + U);
        return;
      }
      Le(), ye(G, W);
    }
    function ye(T, G) {
      for (let U of T)
        D(
          U.x,
          U.y,
          U.idImported,
          U.label,
          U.color
        );
      const W = (U) => s.value.nodes.find((se) => se.idImported === U);
      for (let U of G) {
        let se = W(U.sourceIdImported), Me = W(U.targetIdImported);
        se && Me && (O(se, Me, U.label, U.color), U.color && Os(m, u, U.color));
      }
    }
    function ve(T) {
      for (let G of T) {
        const W = s.value.links.filter((U) => U.id === G).map((U) => U.color).shift();
        W && (s.value.hasNonDefaultLinkColor(W, G) ? s.value.getLinkIdsWithNonDefaultLinkColors(
          W,
          G
        ).every(
          (Me) => T.includes(Me)
        ) && ns(m, W) : ns(m, W));
      }
    }
    function we() {
      c.stop(), n.value.selectChildren().remove(), h = void 0, E = 0, S = 0, I = 1, m = void 0, w = void 0, p = void 0, y = void 0, c = void 0, Z(), z(), A();
    }
    function Le() {
      s.value.links.forEach((T) => lr(T, n.value)), s.value.nodes.forEach((T) => ts(T, n.value)), s.value = new xc(), a.value = !1, we();
    }
    function Ae(T, G) {
      console.error(T + `
` + G), r.value = !0, o.value = T, l.value = G.toString(), window.setInterval(() => r.value = !1, 6e3);
    }
    return (T, G) => (Ct(), ks(Ve, null, [
      fk,
      dk,
      u.hasToolbar ? (Ct(), ks("div", hk, [
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ae(({ props: W }) => [
            u.isGraphEditableInGUI ? (Ct(), dn(rt, de({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, W, {
              variant: "plain",
              onClick: G[0] || (G[0] = (U) => D())
            }), null, 16)) : Ut("", !0)
          ]),
          _: 1
        }),
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ae(({ props: W }) => [
            u.isGraphEditableInGUI ? (Ct(), dn(rt, de({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, W, {
              variant: "plain",
              onClick: G[1] || (G[1] = (U) => Le())
            }), null, 16)) : Ut("", !0)
          ]),
          _: 1
        }),
        g(Di, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ae(({ props: W }) => [
            u.zoomEnabled ? (Ct(), dn(rt, de({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, W, {
              variant: "plain",
              onClick: G[2] || (G[2] = (U) => we())
            }), null, 16)) : Ut("", !0)
          ]),
          _: 1
        }),
        g(dS, {
          "graph-as-tgf": s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !1, !1),
          "graph-as-json": s.value.toJSON(u.showNodeLabels, u.showLinkLabels, !0, !0, !0),
          onFileImported: le
        }, null, 8, ["graph-as-tgf", "graph-as-json"]),
        g(wS),
        g(ck, {
          config: u,
          "is-welcome": !i.value,
          onUpdateSettings: q
        }, null, 8, ["config", "is-welcome"])
      ])) : Ut("", !0),
      ze(Ne("div", vk, "Graph is empty", 512), [
        [Bt, !a.value]
      ]),
      g(Ks, {
        modelValue: r.value,
        "onUpdate:modelValue": G[3] || (G[3] = (W) => r.value = W),
        color: "error",
        variant: "tonal"
      }, {
        default: ae(() => [
          g(mt, { align: "center" }, {
            default: ae(() => [
              g(De, {
                icon: "$error",
                class: "ml-2"
              }),
              g(Ti, null, {
                default: ae(() => [
                  Ne("h4", null, At(o.value), 1),
                  Ne("p", null, At(l.value), 1)
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
}), gk = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label.not-editable,.arc-path-text .link-label.not-editable,.line-reverse-path-text .link-label.not-editable,.arc-reverse-path-text .link-label.not-editable,.reflexive-path-text .link-label.not-editable{cursor:pointer}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder.not-editable,.arc-path-text .link-label-placeholder.not-editable,.line-reverse-path-text .link-label-placeholder.not-editable,.arc-reverse-path-text .link-label-placeholder.not-editable,.reflexive-path-text .link-label-placeholder.not-editable{cursor:pointer}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.node-label{fill:#000;stroke:none;font-size:1rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label.not-editable{cursor:pointer}.node-label-placeholder{fill:#696969;font-style:oblique;stroke:none;font-size:.85rem;opacity:1;text-anchor:middle;pointer-events:all;cursor:text}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder.not-editable{cursor:pointer}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", yk = /* @__PURE__ */ uu(mk, [["styles", [gk]]]), na = {
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
function pk(e, t) {
  const n = [];
  let i = [];
  const r = mm(e), o = gm(e), l = (r.getDay() - na[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - na[t.slice(-2).toUpperCase()] + 7) % 7;
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
function bk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function wk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function mm(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function gm(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function xk(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const _k = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ym(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (_k.test(e))
      return xk(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const Pf = new Date(2e3, 0, 2);
function Sk(e) {
  const t = na[e.slice(-2).toUpperCase()];
  return Fa(7).map((n) => {
    const i = new Date(Pf);
    return i.setDate(Pf.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function Ck(e, t, n, i) {
  const r = ym(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function kk(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Ac(String(n.getMonth() + 1), 2, "0"), o = Ac(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function Ek(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function Vk(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function Lk(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function Ik(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Pk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Tk(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function Mk(e) {
  return e.getFullYear();
}
function Ak(e) {
  return e.getMonth();
}
function $k(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function Nk(e) {
  return e.getHours();
}
function Rk(e) {
  return e.getMinutes();
}
function Ok(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Bk(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Fk(e, t) {
  return ia(e, t[0]) && Hk(e, t[1]);
}
function Dk(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function ia(e, t) {
  return e.getTime() > t.getTime();
}
function Hk(e, t) {
  return e.getTime() < t.getTime();
}
function Tf(e, t) {
  return e.getTime() === t.getTime();
}
function zk(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function jk(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Gk(e, t, n) {
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
function Uk(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Wk(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function qk(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Yk(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function Kk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Xk(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Zk {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return ym(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return kk(this, t);
  }
  parseISO(t) {
    return Ek(t);
  }
  addMinutes(t, n) {
    return Vk(t, n);
  }
  addHours(t, n) {
    return Lk(t, n);
  }
  addDays(t, n) {
    return Ik(t, n);
  }
  addWeeks(t, n) {
    return Pk(t, n);
  }
  addMonths(t, n) {
    return Tk(t, n);
  }
  getWeekArray(t) {
    return pk(t, this.locale);
  }
  startOfWeek(t) {
    return bk(t);
  }
  endOfWeek(t) {
    return wk(t);
  }
  startOfMonth(t) {
    return mm(t);
  }
  endOfMonth(t) {
    return gm(t);
  }
  format(t, n) {
    return Ck(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Tf(t, n);
  }
  isValid(t) {
    return Dk(t);
  }
  isWithinRange(t, n) {
    return Fk(t, n);
  }
  isAfter(t, n) {
    return ia(t, n);
  }
  isBefore(t, n) {
    return !ia(t, n) && !Tf(t, n);
  }
  isSameDay(t, n) {
    return zk(t, n);
  }
  isSameMonth(t, n) {
    return jk(t, n);
  }
  setMinutes(t, n) {
    return Wk(t, n);
  }
  setHours(t, n) {
    return Uk(t, n);
  }
  setMonth(t, n) {
    return qk(t, n);
  }
  setYear(t, n) {
    return Yk(t, n);
  }
  getDiff(t, n, i) {
    return Gk(t, n, i);
  }
  getWeekdays() {
    return Sk(this.locale);
  }
  getYear(t) {
    return Mk(t);
  }
  getMonth(t) {
    return Ak(t);
  }
  getNextMonth(t) {
    return $k(t);
  }
  getHours(t) {
    return Nk(t);
  }
  getMinutes(t) {
    return Rk(t);
  }
  startOfDay(t) {
    return Kk(t);
  }
  endOfDay(t) {
    return Xk(t);
  }
  startOfYear(t) {
    return Ok(t);
  }
  endOfYear(t) {
    return Bk(t);
  }
}
const Jk = Symbol.for("vuetify:date-options"), Mf = Symbol.for("vuetify:date-adapter");
function Qk(e, t) {
  const n = Vt({
    adapter: Zk,
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
    instance: eE(n, t)
  };
}
function eE(e, t) {
  const n = Qt(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return be(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const tE = Symbol.for("vuetify:goto");
function nE() {
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
function iE(e, t) {
  return {
    rtl: t.isRtl,
    options: Vt(nE(), e)
  };
}
function pm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = Vt(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = Dx(i.defaults), a = e2(i.display, i.ssr), u = Xx(i.theme), c = o_(i.icons), f = h_(i.locale), d = Qk(i.date, f), h = iE(i.goTo, f);
  return {
    install: (m) => {
      for (const p in l)
        m.directive(p, l[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in r)
        m.component(p, on({
          ...r[p],
          name: p,
          aliasName: r[p].name
        }));
      if (u.install(m), m.provide(Ui, s), m.provide(Ys, a), m.provide(tl, u), m.provide(zs, c), m.provide(nl, f), m.provide(Jk, d.options), m.provide(Mf, d.instance), m.provide(tE, h), Re && i.ssr)
        if (m.$nuxt)
          m.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: p
          } = m;
          m.mount = function() {
            const y = p(...arguments);
            return qe(() => a.update()), m.mount = p, y;
          };
        }
      bt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return Qt({
              defaults: Li.call(this, Ui),
              display: Li.call(this, Ys),
              theme: Li.call(this, tl),
              icons: Li.call(this, zs),
              locale: Li.call(this, nl),
              date: Li.call(this, Mf)
            });
          }
        }
      });
    },
    defaults: s,
    display: a,
    theme: u,
    icons: c,
    locale: f,
    date: d,
    goTo: h
  };
}
const rE = "3.5.9";
pm.version = rE;
function Li(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const oE = {
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
}, lE = {
  component: Ya
};
var sE = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", aE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", uE = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", cE = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", fE = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", dE = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", hE = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
pm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...oE,
      addNode: hE,
      deleteGraph: aE,
      help: cE,
      importExport: uE,
      resetView: dE,
      settings: sE,
      helpCircle: fE
    },
    sets: {
      mdi: lE
    }
  }
});
customElements.define(
  "graph-editor",
  // GUI Version
  // defineCustomElementWrapped(GraphEditor, { plugins: [vuetify] })
  // CLI Version
  /* @__PURE__ */ F0(yk)
);
