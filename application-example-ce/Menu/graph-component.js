var Cm = Object.defineProperty;
var km = (e, t, n) => t in e ? Cm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Qe = (e, t, n) => km(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function sa(e, t) {
  const n = new Set(e.split(","));
  return (i) => n.has(i);
}
const De = {}, Ri = [], Ot = () => {
}, Em = () => !1, cl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), aa = (e) => e.startsWith("onUpdate:"), Ye = Object.assign, ua = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Vm = Object.prototype.hasOwnProperty, Te = (e, t) => Vm.call(e, t), xe = Array.isArray, Oi = (e) => fl(e) === "[object Map]", Rf = (e) => fl(e) === "[object Set]", Ve = (e) => typeof e == "function", Ge = (e) => typeof e == "string", Zi = (e) => typeof e == "symbol", Be = (e) => e !== null && typeof e == "object", Of = (e) => (Be(e) || Ve(e)) && Ve(e.then) && Ve(e.catch), Bf = Object.prototype.toString, fl = (e) => Bf.call(e), Lm = (e) => fl(e).slice(8, -1), Ff = (e) => fl(e) === "[object Object]", ca = (e) => Ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, mr = /* @__PURE__ */ sa(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), dl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Im = /-(\w)/g, vt = dl((e) => e.replace(Im, (t, n) => n ? n.toUpperCase() : "")), Pm = /\B([A-Z])/g, Kt = dl(
  (e) => e.replace(Pm, "-$1").toLowerCase()
), Mn = dl((e) => e.charAt(0).toUpperCase() + e.slice(1)), zl = dl((e) => e ? `on${Mn(e)}` : ""), Kn = (e, t) => !Object.is(e, t), Gl = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, No = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Tm = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ys = (e) => {
  const t = Ge(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let mu;
const Df = () => mu || (mu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function fa(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], r = Ge(i) ? Nm(i) : fa(i);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Ge(e) || Be(e))
    return e;
}
const Mm = /;(?![^(]*\))/g, Am = /:([^]+)/, $m = /\/\*[^]*?\*\//g;
function Nm(e) {
  const t = {};
  return e.replace($m, "").split(Mm).forEach((n) => {
    if (n) {
      const i = n.split(Am);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function da(e) {
  let t = "";
  if (Ge(e))
    t = e;
  else if (xe(e))
    for (let n = 0; n < e.length; n++) {
      const i = da(e[n]);
      i && (t += i + " ");
    }
  else if (Be(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Rm = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Om = /* @__PURE__ */ sa(Rm);
function Hf(e) {
  return !!e || e === "";
}
const Rt = (e) => Ge(e) ? e : e == null ? "" : xe(e) || Be(e) && (e.toString === Bf || !Ve(e.toString)) ? JSON.stringify(e, jf, 2) : String(e), jf = (e, t) => t && t.__v_isRef ? jf(e, t.value) : Oi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, r], o) => (n[Ul(i, o) + " =>"] = r, n),
    {}
  )
} : Rf(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ul(n))
} : Zi(t) ? Ul(t) : Be(t) && !xe(t) && !Ff(t) ? String(t) : t, Ul = (e, t = "") => {
  var n;
  return Zi(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let kt;
class zf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = kt, !t && kt && (this.index = (kt.scopes || (kt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = kt;
      try {
        return kt = this, t();
      } finally {
        kt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    kt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    kt = this.parent;
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
function ha(e) {
  return new zf(e);
}
function Bm(e, t = kt) {
  t && t.active && t.effects.push(e);
}
function Fm() {
  return kt;
}
function mt(e) {
  kt && kt.cleanups.push(e);
}
let di;
class va {
  constructor(t, n, i, r) {
    this.fn = t, this.trigger = n, this.scheduler = i, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Bm(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, xi();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Dm(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), _i();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = qn, n = di;
    try {
      return qn = !0, di = this, this._runnings++, gu(this), this.fn();
    } finally {
      yu(this), this._runnings--, di = n, qn = t;
    }
  }
  stop() {
    var t;
    this.active && (gu(this), yu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Dm(e) {
  return e.value;
}
function gu(e) {
  e._trackId++, e._depsLength = 0;
}
function yu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Gf(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Gf(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let qn = !0, ps = 0;
const Uf = [];
function xi() {
  Uf.push(qn), qn = !1;
}
function _i() {
  const e = Uf.pop();
  qn = e === void 0 ? !0 : e;
}
function ma() {
  ps++;
}
function ga() {
  for (ps--; !ps && bs.length; )
    bs.shift()();
}
function Wf(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && Gf(i, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const bs = [];
function qf(e, t, n) {
  ma();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && bs.push(i.scheduler)));
  }
  ga();
}
const Yf = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Ro = /* @__PURE__ */ new WeakMap(), hi = Symbol(""), ws = Symbol("");
function wt(e, t, n) {
  if (qn && di) {
    let i = Ro.get(e);
    i || Ro.set(e, i = /* @__PURE__ */ new Map());
    let r = i.get(n);
    r || i.set(n, r = Yf(() => i.delete(n))), Wf(
      di,
      r
    );
  }
}
function Vn(e, t, n, i, r, o) {
  const l = Ro.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && xe(e)) {
    const a = Number(i);
    l.forEach((u, c) => {
      (c === "length" || !Zi(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        xe(e) ? ca(n) && s.push(l.get("length")) : (s.push(l.get(hi)), Oi(e) && s.push(l.get(ws)));
        break;
      case "delete":
        xe(e) || (s.push(l.get(hi)), Oi(e) && s.push(l.get(ws)));
        break;
      case "set":
        Oi(e) && s.push(l.get(hi));
        break;
    }
  ma();
  for (const a of s)
    a && qf(
      a,
      4
    );
  ga();
}
function Hm(e, t) {
  var n;
  return (n = Ro.get(e)) == null ? void 0 : n.get(t);
}
const jm = /* @__PURE__ */ sa("__proto__,__v_isRef,__isVue"), Kf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Zi)
), pu = /* @__PURE__ */ zm();
function zm() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = Se(this);
      for (let o = 0, l = this.length; o < l; o++)
        wt(i, "get", o + "");
      const r = i[t](...n);
      return r === -1 || r === !1 ? i[t](...n.map(Se)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      xi(), ma();
      const i = Se(this)[t].apply(this, n);
      return ga(), _i(), i;
    };
  }), e;
}
function Gm(e) {
  const t = Se(this);
  return wt(t, "has", e), t.hasOwnProperty(e);
}
class Xf {
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
      return i === (r ? o ? ig : ed : o ? Qf : Jf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const l = xe(t);
    if (!r) {
      if (l && Te(pu, n))
        return Reflect.get(pu, n, i);
      if (n === "hasOwnProperty")
        return Gm;
    }
    const s = Reflect.get(t, n, i);
    return (Zi(n) ? Kf.has(n) : jm(n)) || (r || wt(t, "get", n), o) ? s : Ue(s) ? l && ca(n) ? s : s.value : Be(s) ? r ? jr(s) : tn(s) : s;
  }
}
class Zf extends Xf {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = Gi(o);
      if (!Oo(i) && !Gi(i) && (o = Se(o), i = Se(i)), !xe(t) && Ue(o) && !Ue(i))
        return a ? !1 : (o.value = i, !0);
    }
    const l = xe(t) && ca(n) ? Number(n) < t.length : Te(t, n), s = Reflect.set(t, n, i, r);
    return t === Se(r) && (l ? Kn(i, o) && Vn(t, "set", n, i) : Vn(t, "add", n, i)), s;
  }
  deleteProperty(t, n) {
    const i = Te(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && i && Vn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!Zi(n) || !Kf.has(n)) && wt(t, "has", n), i;
  }
  ownKeys(t) {
    return wt(
      t,
      "iterate",
      xe(t) ? "length" : hi
    ), Reflect.ownKeys(t);
  }
}
class Um extends Xf {
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
const Wm = /* @__PURE__ */ new Zf(), qm = /* @__PURE__ */ new Um(), Ym = /* @__PURE__ */ new Zf(
  !0
), ya = (e) => e, hl = (e) => Reflect.getPrototypeOf(e);
function io(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = Se(e), o = Se(t);
  n || (Kn(t, o) && wt(r, "get", t), wt(r, "get", o));
  const { has: l } = hl(r), s = i ? ya : n ? wa : _r;
  if (l.call(r, t))
    return s(e.get(t));
  if (l.call(r, o))
    return s(e.get(o));
  e !== r && e.get(t);
}
function ro(e, t = !1) {
  const n = this.__v_raw, i = Se(n), r = Se(e);
  return t || (Kn(e, r) && wt(i, "has", e), wt(i, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function oo(e, t = !1) {
  return e = e.__v_raw, !t && wt(Se(e), "iterate", hi), Reflect.get(e, "size", e);
}
function bu(e) {
  e = Se(e);
  const t = Se(this);
  return hl(t).has.call(t, e) || (t.add(e), Vn(t, "add", e, e)), this;
}
function wu(e, t) {
  t = Se(t);
  const n = Se(this), { has: i, get: r } = hl(n);
  let o = i.call(n, e);
  o || (e = Se(e), o = i.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), o ? Kn(t, l) && Vn(n, "set", e, t) : Vn(n, "add", e, t), this;
}
function xu(e) {
  const t = Se(this), { has: n, get: i } = hl(t);
  let r = n.call(t, e);
  r || (e = Se(e), r = n.call(t, e)), i && i.call(t, e);
  const o = t.delete(e);
  return r && Vn(t, "delete", e, void 0), o;
}
function _u() {
  const e = Se(this), t = e.size !== 0, n = e.clear();
  return t && Vn(e, "clear", void 0, void 0), n;
}
function lo(e, t) {
  return function(i, r) {
    const o = this, l = o.__v_raw, s = Se(l), a = t ? ya : e ? wa : _r;
    return !e && wt(s, "iterate", hi), l.forEach((u, c) => i.call(r, a(u), a(c), o));
  };
}
function so(e, t, n) {
  return function(...i) {
    const r = this.__v_raw, o = Se(r), l = Oi(o), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = r[e](...i), c = n ? ya : t ? wa : _r;
    return !t && wt(
      o,
      "iterate",
      a ? ws : hi
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
function Bn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Km() {
  const e = {
    get(o) {
      return io(this, o);
    },
    get size() {
      return oo(this);
    },
    has: ro,
    add: bu,
    set: wu,
    delete: xu,
    clear: _u,
    forEach: lo(!1, !1)
  }, t = {
    get(o) {
      return io(this, o, !1, !0);
    },
    get size() {
      return oo(this);
    },
    has: ro,
    add: bu,
    set: wu,
    delete: xu,
    clear: _u,
    forEach: lo(!1, !0)
  }, n = {
    get(o) {
      return io(this, o, !0);
    },
    get size() {
      return oo(this, !0);
    },
    has(o) {
      return ro.call(this, o, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: lo(!0, !1)
  }, i = {
    get(o) {
      return io(this, o, !0, !0);
    },
    get size() {
      return oo(this, !0);
    },
    has(o) {
      return ro.call(this, o, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: lo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = so(
      o,
      !1,
      !1
    ), n[o] = so(
      o,
      !0,
      !1
    ), t[o] = so(
      o,
      !1,
      !0
    ), i[o] = so(
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
  Xm,
  Zm,
  Jm,
  Qm
] = /* @__PURE__ */ Km();
function pa(e, t) {
  const n = t ? e ? Qm : Jm : e ? Zm : Xm;
  return (i, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? i : Reflect.get(
    Te(n, r) && r in i ? n : i,
    r,
    o
  );
}
const eg = {
  get: /* @__PURE__ */ pa(!1, !1)
}, tg = {
  get: /* @__PURE__ */ pa(!1, !0)
}, ng = {
  get: /* @__PURE__ */ pa(!0, !1)
}, Jf = /* @__PURE__ */ new WeakMap(), Qf = /* @__PURE__ */ new WeakMap(), ed = /* @__PURE__ */ new WeakMap(), ig = /* @__PURE__ */ new WeakMap();
function rg(e) {
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
function og(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : rg(Lm(e));
}
function tn(e) {
  return Gi(e) ? e : ba(
    e,
    !1,
    Wm,
    eg,
    Jf
  );
}
function lg(e) {
  return ba(
    e,
    !1,
    Ym,
    tg,
    Qf
  );
}
function jr(e) {
  return ba(
    e,
    !0,
    qm,
    ng,
    ed
  );
}
function ba(e, t, n, i, r) {
  if (!Be(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = og(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? i : n
  );
  return r.set(e, s), s;
}
function Bi(e) {
  return Gi(e) ? Bi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Gi(e) {
  return !!(e && e.__v_isReadonly);
}
function Oo(e) {
  return !!(e && e.__v_isShallow);
}
function td(e) {
  return Bi(e) || Gi(e);
}
function Se(e) {
  const t = e && e.__v_raw;
  return t ? Se(t) : e;
}
function nd(e) {
  return Object.isExtensible(e) && No(e, "__v_skip", !0), e;
}
const _r = (e) => Be(e) ? tn(e) : e, wa = (e) => Be(e) ? jr(e) : e;
class id {
  constructor(t, n, i, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new va(
      () => t(this._value),
      () => So(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = i;
  }
  get value() {
    const t = Se(this);
    return (!t._cacheable || t.effect.dirty) && Kn(t._value, t._value = t.effect.run()) && So(t, 4), rd(t), t.effect._dirtyLevel >= 2 && So(t, 2), t._value;
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
function sg(e, t, n = !1) {
  let i, r;
  const o = Ve(e);
  return o ? (i = e, r = Ot) : (i = e.get, r = e.set), new id(i, r, o || !r, n);
}
function rd(e) {
  var t;
  qn && di && (e = Se(e), Wf(
    di,
    (t = e.dep) != null ? t : e.dep = Yf(
      () => e.dep = void 0,
      e instanceof id ? e : void 0
    )
  ));
}
function So(e, t = 4, n) {
  e = Se(e);
  const i = e.dep;
  i && qf(
    i,
    t
  );
}
function Ue(e) {
  return !!(e && e.__v_isRef === !0);
}
function ee(e) {
  return od(e, !1);
}
function be(e) {
  return od(e, !0);
}
function od(e, t) {
  return Ue(e) ? e : new ag(e, t);
}
class ag {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : Se(t), this._value = n ? t : _r(t);
  }
  get value() {
    return rd(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Oo(t) || Gi(t);
    t = n ? t : Se(t), Kn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : _r(t), So(this, 4));
  }
}
function Zt(e) {
  return Ue(e) ? e.value : e;
}
const ug = {
  get: (e, t, n) => Zt(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return Ue(r) && !Ue(n) ? (r.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function ld(e) {
  return Bi(e) ? e : new Proxy(e, ug);
}
function xa(e) {
  const t = xe(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = sd(e, n);
  return t;
}
class cg {
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
    return Hm(Se(this._object), this._key);
  }
}
class fg {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function le(e, t, n) {
  return Ue(e) ? e : Ve(e) ? new fg(e) : Be(e) && arguments.length > 1 ? sd(e, t, n) : ee(e);
}
function sd(e, t, n) {
  const i = e[t];
  return Ue(i) ? i : new cg(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Yn(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (r) {
    vl(r, t, n);
  }
}
function Ft(e, t, n, i) {
  if (Ve(e)) {
    const o = Yn(e, t, n, i);
    return o && Of(o) && o.catch((l) => {
      vl(l, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Ft(e[o], t, n, i));
  return r;
}
function vl(e, t, n, i = !0) {
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
      Yn(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  dg(e, n, r, i);
}
function dg(e, t, n, i = !0) {
  console.error(e);
}
let Sr = !1, xs = !1;
const rt = [];
let hn = 0;
const Fi = [];
let Hn = null, oi = 0;
const ad = /* @__PURE__ */ Promise.resolve();
let _a = null;
function Ke(e) {
  const t = _a || ad;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hg(e) {
  let t = hn + 1, n = rt.length;
  for (; t < n; ) {
    const i = t + n >>> 1, r = rt[i], o = Cr(r);
    o < e || o === e && r.pre ? t = i + 1 : n = i;
  }
  return t;
}
function Sa(e) {
  (!rt.length || !rt.includes(
    e,
    Sr && e.allowRecurse ? hn + 1 : hn
  )) && (e.id == null ? rt.push(e) : rt.splice(hg(e.id), 0, e), ud());
}
function ud() {
  !Sr && !xs && (xs = !0, _a = ad.then(fd));
}
function vg(e) {
  const t = rt.indexOf(e);
  t > hn && rt.splice(t, 1);
}
function mg(e) {
  xe(e) ? Fi.push(...e) : (!Hn || !Hn.includes(
    e,
    e.allowRecurse ? oi + 1 : oi
  )) && Fi.push(e), ud();
}
function Su(e, t, n = Sr ? hn + 1 : 0) {
  for (; n < rt.length; n++) {
    const i = rt[n];
    if (i && i.pre) {
      if (e && i.id !== e.uid)
        continue;
      rt.splice(n, 1), n--, i();
    }
  }
}
function cd(e) {
  if (Fi.length) {
    const t = [...new Set(Fi)].sort(
      (n, i) => Cr(n) - Cr(i)
    );
    if (Fi.length = 0, Hn) {
      Hn.push(...t);
      return;
    }
    for (Hn = t, oi = 0; oi < Hn.length; oi++)
      Hn[oi]();
    Hn = null, oi = 0;
  }
}
const Cr = (e) => e.id == null ? 1 / 0 : e.id, gg = (e, t) => {
  const n = Cr(e) - Cr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function fd(e) {
  xs = !1, Sr = !0, rt.sort(gg);
  try {
    for (hn = 0; hn < rt.length; hn++) {
      const t = rt[hn];
      t && t.active !== !1 && Yn(t, null, 14);
    }
  } finally {
    hn = 0, rt.length = 0, cd(), Sr = !1, _a = null, (rt.length || Fi.length) && fd();
  }
}
function yg(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || De;
  let r = n;
  const o = t.startsWith("update:"), l = o && t.slice(7);
  if (l && l in i) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: f, trim: d } = i[c] || De;
    d && (r = n.map((h) => Ge(h) ? h.trim() : h)), f && (r = n.map(Tm));
  }
  let s, a = i[s = zl(t)] || // also try camelCase event handler (#2249)
  i[s = zl(vt(t))];
  !a && o && (a = i[s = zl(Kt(t))]), a && Ft(
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
    e.emitted[s] = !0, Ft(
      u,
      e,
      6,
      r
    );
  }
}
function dd(e, t, n = !1) {
  const i = t.emitsCache, r = i.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let l = {}, s = !1;
  if (!Ve(e)) {
    const a = (u) => {
      const c = dd(u, t, !0);
      c && (s = !0, Ye(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !s ? (Be(e) && i.set(e, null), null) : (xe(o) ? o.forEach((a) => l[a] = null) : Ye(l, o), Be(e) && i.set(e, l), l);
}
function ml(e, t) {
  return !e || !cl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, Kt(t)) || Te(e, t));
}
let dt = null, hd = null;
function Bo(e) {
  const t = dt;
  return dt = e, hd = e && e.type.__scopeId || null, t;
}
function ae(e, t = dt, n) {
  if (!t || e._n)
    return e;
  const i = (...r) => {
    i._d && Ou(-1);
    const o = Bo(t);
    let l;
    try {
      l = e(...r);
    } finally {
      Bo(o), i._d && Ou(1);
    }
    return l;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function Wl(e) {
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
  const w = Bo(e);
  try {
    if (n.shapeFlag & 4) {
      const b = r || i, _ = b;
      p = dn(
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
      p = dn(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: s, emit: u }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), y = t.props ? a : pg(a);
    }
  } catch (b) {
    br.length = 0, vl(b, e, 1), p = g(Dt);
  }
  let x = p;
  if (y && m !== !1) {
    const b = Object.keys(y), { shapeFlag: _ } = x;
    b.length && _ & 7 && (l && b.some(aa) && (y = bg(
      y,
      l
    )), x = Ln(x, y));
  }
  return n.dirs && (x = Ln(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), p = x, Bo(w), p;
}
const pg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || cl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, bg = (e, t) => {
  const n = {};
  for (const i in e)
    (!aa(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function wg(e, t, n) {
  const { props: i, children: r, component: o } = e, { props: l, children: s, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? Cu(i, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (l[d] !== i[d] && !ml(u, d))
          return !0;
      }
    }
  } else
    return (r || s) && (!s || !s.$stable) ? !0 : i === l ? !1 : i ? l ? Cu(i, l, u) : !0 : !!l;
  return !1;
}
function Cu(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (t[o] !== e[o] && !ml(n, o))
      return !0;
  }
  return !1;
}
function xg({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const vd = "components", _g = "directives", Sg = Symbol.for("v-ndc");
function Cg(e) {
  return Ge(e) && md(vd, e, !1) || e;
}
function nn(e) {
  return md(_g, e);
}
function md(e, t, n = !0, i = !1) {
  const r = dt || nt;
  if (r) {
    const o = r.type;
    if (e === vd) {
      const s = p0(
        o,
        !1
      );
      if (s && (s === t || s === vt(t) || s === Mn(vt(t))))
        return o;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      ku(r[e] || o[e], t) || // global registration
      ku(r.appContext[e], t)
    );
    return !l && i ? o : l;
  }
}
function ku(e, t) {
  return e && (e[t] || e[vt(t)] || e[Mn(vt(t))]);
}
const kg = (e) => e.__isSuspense;
function Eg(e, t) {
  t && t.pendingBranch ? xe(e) ? t.effects.push(...e) : t.effects.push(e) : mg(e);
}
const Vg = Symbol.for("v-scx"), Lg = () => He(Vg);
function yn(e, t) {
  return Ca(e, null, t);
}
const ao = {};
function we(e, t, n) {
  return Ca(e, t, n);
}
function Ca(e, t, {
  immediate: n,
  deep: i,
  flush: r,
  once: o,
  onTrack: l,
  onTrigger: s
} = De) {
  if (t && o) {
    const E = t;
    t = (...S) => {
      E(...S), _();
    };
  }
  const a = nt, u = (E) => i === !0 ? E : (
    // for deep: false, only traverse root-level properties
    ai(E, i === !1 ? 1 : void 0)
  );
  let c, f = !1, d = !1;
  if (Ue(e) ? (c = () => e.value, f = Oo(e)) : Bi(e) ? (c = () => u(e), f = !0) : xe(e) ? (d = !0, f = e.some((E) => Bi(E) || Oo(E)), c = () => e.map((E) => {
    if (Ue(E))
      return E.value;
    if (Bi(E))
      return u(E);
    if (Ve(E))
      return Yn(E, a, 2);
  })) : Ve(e) ? t ? c = () => Yn(e, a, 2) : c = () => (h && h(), Ft(
    e,
    a,
    3,
    [v]
  )) : c = Ot, t && i) {
    const E = c;
    c = () => ai(E());
  }
  let h, v = (E) => {
    h = x.onStop = () => {
      Yn(E, a, 4), h = x.onStop = void 0;
    };
  }, m;
  if (_l)
    if (v = Ot, t ? n && Ft(t, a, 3, [
      c(),
      d ? [] : void 0,
      v
    ]) : c(), r === "sync") {
      const E = Lg();
      m = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return Ot;
  let p = d ? new Array(e.length).fill(ao) : ao;
  const y = () => {
    if (!(!x.active || !x.dirty))
      if (t) {
        const E = x.run();
        (i || f || (d ? E.some((S, I) => Kn(S, p[I])) : Kn(E, p))) && (h && h(), Ft(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          p === ao ? void 0 : d && p[0] === ao ? [] : p,
          v
        ]), p = E);
      } else
        x.run();
  };
  y.allowRecurse = !!t;
  let w;
  r === "sync" ? w = y : r === "post" ? w = () => pt(y, a && a.suspense) : (y.pre = !0, a && (y.id = a.uid), w = () => Sa(y));
  const x = new va(c, Ot, w), b = Fm(), _ = () => {
    x.stop(), b && ua(b.effects, x);
  };
  return t ? n ? y() : p = x.run() : r === "post" ? pt(
    x.run.bind(x),
    a && a.suspense
  ) : x.run(), m && m.push(_), _;
}
function Ig(e, t, n) {
  const i = this.proxy, r = Ge(e) ? e.includes(".") ? gd(i, e) : () => i[e] : e.bind(i, i);
  let o;
  Ve(t) ? o = t : (o = t.handler, n = t);
  const l = Gr(this), s = Ca(r, o.bind(i), n);
  return l(), s;
}
function gd(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++)
      i = i[n[r]];
    return i;
  };
}
function ai(e, t, n = 0, i) {
  if (!Be(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (i = i || /* @__PURE__ */ new Set(), i.has(e))
    return e;
  if (i.add(e), Ue(e))
    ai(e.value, t, n, i);
  else if (xe(e))
    for (let r = 0; r < e.length; r++)
      ai(e[r], t, n, i);
  else if (Rf(e) || Oi(e))
    e.forEach((r) => {
      ai(r, t, n, i);
    });
  else if (Ff(e))
    for (const r in e)
      ai(e[r], t, n, i);
  return e;
}
function We(e, t) {
  if (dt === null)
    return e;
  const n = Sl(dt) || dt.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, l, s, a = De] = t[r];
    o && (Ve(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ai(l), i.push({
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
function ei(e, t, n, i) {
  const r = e.dirs, o = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    o && (s.oldValue = o[l].value);
    let a = s.dir[i];
    a && (xi(), Ft(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), _i());
  }
}
const jn = Symbol("_leaveCb"), uo = Symbol("_enterCb");
function yd() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return rn(() => {
    e.isMounted = !0;
  }), on(() => {
    e.isUnmounting = !0;
  }), e;
}
const $t = [Function, Array], pd = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: $t,
  onEnter: $t,
  onAfterEnter: $t,
  onEnterCancelled: $t,
  // leave
  onBeforeLeave: $t,
  onLeave: $t,
  onAfterLeave: $t,
  onLeaveCancelled: $t,
  // appear
  onBeforeAppear: $t,
  onAppear: $t,
  onAfterAppear: $t,
  onAppearCancelled: $t
}, Pg = {
  name: "BaseTransition",
  props: pd,
  setup(e, { slots: t }) {
    const n = xl(), i = yd();
    return () => {
      const r = t.default && ka(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const d of r)
          if (d.type !== Dt) {
            o = d;
            break;
          }
      }
      const l = Se(e), { mode: s } = l;
      if (i.isLeaving)
        return ql(o);
      const a = Eu(o);
      if (!a)
        return ql(o);
      const u = kr(
        a,
        l,
        i,
        n
      );
      Er(a, u);
      const c = n.subTree, f = c && Eu(c);
      if (f && f.type !== Dt && !li(a, f)) {
        const d = kr(
          f,
          l,
          i,
          n
        );
        if (Er(f, d), s === "out-in")
          return i.isLeaving = !0, d.afterLeave = () => {
            i.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, ql(o);
        s === "in-out" && a.type !== Dt && (d.delayLeave = (h, v, m) => {
          const p = bd(
            i,
            f
          );
          p[String(f.key)] = f, h[jn] = () => {
            v(), h[jn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = m;
        });
      }
      return o;
    };
  }
}, Tg = Pg;
function bd(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || (i = /* @__PURE__ */ Object.create(null), n.set(t.type, i)), i;
}
function kr(e, t, n, i) {
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
  } = t, x = String(e.key), b = bd(n, e), _ = (I, $) => {
    I && Ft(
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
      I[jn] && I[jn](
        !0
        /* cancelled */
      );
      const R = b[x];
      R && li(e, R) && R.el[jn] && R.el[jn](), _($, [I]);
    },
    enter(I) {
      let $ = a, R = u, H = c;
      if (!n.isMounted)
        if (r)
          $ = p || a, R = y || u, H = w || c;
        else
          return;
      let L = !1;
      const N = I[uo] = (C) => {
        L || (L = !0, C ? _(H, [I]) : _(R, [I]), S.delayedLeave && S.delayedLeave(), I[uo] = void 0);
      };
      $ ? E($, [I, N]) : N();
    },
    leave(I, $) {
      const R = String(e.key);
      if (I[uo] && I[uo](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return $();
      _(f, [I]);
      let H = !1;
      const L = I[jn] = (N) => {
        H || (H = !0, $(), N ? _(v, [I]) : _(h, [I]), I[jn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, d ? E(d, [I, L]) : L();
    },
    clone(I) {
      return kr(I, t, n, i);
    }
  };
  return S;
}
function ql(e) {
  if (gl(e))
    return e = Ln(e), e.children = null, e;
}
function Eu(e) {
  return gl(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Er(e, t) {
  e.shapeFlag & 6 && e.component ? Er(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ka(e, t = !1, n) {
  let i = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let l = e[o];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : o);
    l.type === Le ? (l.patchFlag & 128 && r++, i = i.concat(
      ka(l.children, t, s)
    )) : (t || l.type !== Dt) && i.push(s != null ? Ln(l, { key: s }) : l);
  }
  if (r > 1)
    for (let o = 0; o < i.length; o++)
      i[o].patchFlag = -2;
  return i;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ji(e, t) {
  return Ve(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ye({ name: e.name }, t, { setup: e })
  ) : e;
}
const Co = (e) => !!e.type.__asyncLoader, gl = (e) => e.type.__isKeepAlive;
function Mg(e, t) {
  wd(e, "a", t);
}
function Ag(e, t) {
  wd(e, "da", t);
}
function wd(e, t, n = nt) {
  const i = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (yl(t, i, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      gl(r.parent.vnode) && $g(i, t, n, r), r = r.parent;
  }
}
function $g(e, t, n, i) {
  const r = yl(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  bl(() => {
    ua(i[t], r);
  }, n);
}
function yl(e, t, n = nt, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      xi();
      const s = Gr(n), a = Ft(t, n, e, l);
      return s(), _i(), a;
    });
    return i ? r.unshift(o) : r.push(o), o;
  }
}
const An = (e) => (t, n = nt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!_l || e === "sp") && yl(e, (...i) => t(...i), n)
), pl = An("bm"), rn = An("m"), Ng = An("bu"), xd = An("u"), on = An("bum"), bl = An("um"), Rg = An("sp"), Og = An(
  "rtg"
), Bg = An(
  "rtc"
);
function Fg(e, t = nt) {
  yl("ec", e, t);
}
function Dg(e, t, n, i) {
  let r;
  const o = n;
  if (xe(e) || Ge(e)) {
    r = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      r[l] = t(e[l], l, void 0, o);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (Be(e))
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
const _s = (e) => e ? Ad(e) ? Sl(e) || e.proxy : _s(e.parent) : null, gr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _s(e.parent),
    $root: (e) => _s(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ea(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Sa(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ke.bind(e.proxy)),
    $watch: (e) => Ig.bind(e)
  })
), Yl = (e, t) => e !== De && !e.__isScriptSetup && Te(e, t), Hg = {
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
        if (Yl(i, t))
          return l[t] = 1, i[t];
        if (r !== De && Te(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Te(u, t)
        )
          return l[t] = 3, o[t];
        if (n !== De && Te(n, t))
          return l[t] = 4, n[t];
        Ss && (l[t] = 0);
      }
    }
    const c = gr[t];
    let f, d;
    if (c)
      return t === "$attrs" && wt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (f = s.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== De && Te(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, Te(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: r, ctx: o } = e;
    return Yl(r, t) ? (r[t] = n, !0) : i !== De && Te(i, t) ? (i[t] = n, !0) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: r, propsOptions: o }
  }, l) {
    let s;
    return !!n[l] || e !== De && Te(e, l) || Yl(t, l) || (s = o[0]) && Te(s, l) || Te(i, l) || Te(gr, l) || Te(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Vu(e) {
  return xe(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ss = !0;
function jg(e) {
  const t = Ea(e), n = e.proxy, i = e.ctx;
  Ss = !1, t.beforeCreate && Lu(t.beforeCreate, e, "bc");
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
  if (u && zg(u, i, null), l)
    for (const j in l) {
      const M = l[j];
      Ve(M) && (i[j] = M.bind(n));
    }
  if (r) {
    const j = r.call(n, n);
    Be(j) && (e.data = tn(j));
  }
  if (Ss = !0, o)
    for (const j in o) {
      const M = o[j], F = Ve(M) ? M.bind(n, n) : Ve(M.get) ? M.get.bind(n, n) : Ot, O = !Ve(M) && Ve(M.set) ? M.set.bind(n) : Ot, D = k({
        get: F,
        set: O
      });
      Object.defineProperty(i, j, {
        enumerable: !0,
        configurable: !0,
        get: () => D.value,
        set: (K) => D.value = K
      });
    }
  if (s)
    for (const j in s)
      _d(s[j], i, n, j);
  if (a) {
    const j = Ve(a) ? a.call(n) : a;
    Reflect.ownKeys(j).forEach((M) => {
      lt(M, j[M]);
    });
  }
  c && Lu(c, e, "c");
  function T(j, M) {
    xe(M) ? M.forEach((F) => j(F.bind(n))) : M && j(M.bind(n));
  }
  if (T(pl, f), T(rn, d), T(Ng, h), T(xd, v), T(Mg, m), T(Ag, p), T(Fg, I), T(Bg, E), T(Og, S), T(on, w), T(bl, b), T(Rg, $), xe(R))
    if (R.length) {
      const j = e.exposed || (e.exposed = {});
      R.forEach((M) => {
        Object.defineProperty(j, M, {
          get: () => n[M],
          set: (F) => n[M] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  _ && e.render === Ot && (e.render = _), H != null && (e.inheritAttrs = H), L && (e.components = L), N && (e.directives = N);
}
function zg(e, t, n = Ot) {
  xe(e) && (e = Cs(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Be(r) ? "default" in r ? o = He(
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
function Lu(e, t, n) {
  Ft(
    xe(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function _d(e, t, n, i) {
  const r = i.includes(".") ? gd(n, i) : () => n[i];
  if (Ge(e)) {
    const o = t[e];
    Ve(o) && we(r, o);
  } else if (Ve(e))
    we(r, e.bind(n));
  else if (Be(e))
    if (xe(e))
      e.forEach((o) => _d(o, t, n, i));
    else {
      const o = Ve(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ve(o) && we(r, o, e);
    }
}
function Ea(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = o.get(t);
  let a;
  return s ? a = s : !r.length && !n && !i ? a = t : (a = {}, r.length && r.forEach(
    (u) => Fo(a, u, l, !0)
  ), Fo(a, t, l)), Be(t) && o.set(t, a), a;
}
function Fo(e, t, n, i = !1) {
  const { mixins: r, extends: o } = t;
  o && Fo(e, o, n, !0), r && r.forEach(
    (l) => Fo(e, l, n, !0)
  );
  for (const l in t)
    if (!(i && l === "expose")) {
      const s = Gg[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const Gg = {
  data: Iu,
  props: Pu,
  emits: Pu,
  // objects
  methods: fr,
  computed: fr,
  // lifecycle
  beforeCreate: ut,
  created: ut,
  beforeMount: ut,
  mounted: ut,
  beforeUpdate: ut,
  updated: ut,
  beforeDestroy: ut,
  beforeUnmount: ut,
  destroyed: ut,
  unmounted: ut,
  activated: ut,
  deactivated: ut,
  errorCaptured: ut,
  serverPrefetch: ut,
  // assets
  components: fr,
  directives: fr,
  // watch
  watch: Wg,
  // provide / inject
  provide: Iu,
  inject: Ug
};
function Iu(e, t) {
  return t ? e ? function() {
    return Ye(
      Ve(e) ? e.call(this, this) : e,
      Ve(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ug(e, t) {
  return fr(Cs(e), Cs(t));
}
function Cs(e) {
  if (xe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ut(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fr(e, t) {
  return e ? Ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Pu(e, t) {
  return e ? xe(e) && xe(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ye(
    /* @__PURE__ */ Object.create(null),
    Vu(e),
    Vu(t ?? {})
  ) : t;
}
function Wg(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ye(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = ut(e[i], t[i]);
  return n;
}
function Sd() {
  return {
    app: null,
    config: {
      isNativeTag: Em,
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
let qg = 0;
function Yg(e, t) {
  return function(i, r = null) {
    Ve(i) || (i = Ye({}, i)), r != null && !Be(r) && (r = null);
    const o = Sd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = o.app = {
      _uid: qg++,
      _component: i,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: w0,
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
      mount(u, c, f) {
        if (!s) {
          const d = g(i, r);
          return d.appContext = o, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && t ? t(d, u) : e(d, u, f), s = !0, a._container = u, u.__vue_app__ = a, Sl(d.component) || d.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return o.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = yr;
        yr = a;
        try {
          return u();
        } finally {
          yr = c;
        }
      }
    };
    return a;
  };
}
let yr = null;
function lt(e, t) {
  if (nt) {
    let n = nt.provides;
    const i = nt.parent && nt.parent.provides;
    i === n && (n = nt.provides = Object.create(i)), n[e] = t;
  }
}
function He(e, t, n = !1) {
  const i = nt || dt;
  if (i || yr) {
    const r = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : yr._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Ve(t) ? t.call(i && i.proxy) : t;
  }
}
function Kg(e, t, n, i = !1) {
  const r = {}, o = {};
  No(o, wl, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Cd(e, t, r, o);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  n ? e.props = i ? r : lg(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Xg(e, t, n, i) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: l }
  } = e, s = Se(r), [a] = e.propsOptions;
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
        if (ml(e.emitsOptions, d))
          continue;
        const h = t[d];
        if (a)
          if (Te(o, d))
            h !== o[d] && (o[d] = h, u = !0);
          else {
            const v = vt(d);
            r[v] = ks(
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
    Cd(e, t, r, o) && (u = !0);
    let c;
    for (const f in s)
      (!t || // for camelCase
      !Te(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Kt(f)) === f || !Te(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[f] = ks(
        a,
        s,
        f,
        void 0,
        e,
        !0
      )) : delete r[f]);
    if (o !== s)
      for (const f in o)
        (!t || !Te(t, f)) && (delete o[f], u = !0);
  }
  u && Vn(e, "set", "$attrs");
}
function Cd(e, t, n, i) {
  const [r, o] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (mr(a))
        continue;
      const u = t[a];
      let c;
      r && Te(r, c = vt(a)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : ml(e.emitsOptions, a) || (!(a in i) || u !== i[a]) && (i[a] = u, l = !0);
    }
  if (o) {
    const a = Se(n), u = s || De;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = ks(
        r,
        a,
        f,
        u[f],
        e,
        !Te(u, f)
      );
    }
  }
  return l;
}
function ks(e, t, n, i, r, o) {
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
          const c = Gr(r);
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
    ] && (i === "" || i === Kt(n)) && (i = !0));
  }
  return i;
}
function kd(e, t, n = !1) {
  const i = t.propsCache, r = i.get(e);
  if (r)
    return r;
  const o = e.props, l = {}, s = [];
  let a = !1;
  if (!Ve(e)) {
    const c = (f) => {
      a = !0;
      const [d, h] = kd(f, t, !0);
      Ye(l, d), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return Be(e) && i.set(e, Ri), Ri;
  if (xe(o))
    for (let c = 0; c < o.length; c++) {
      const f = vt(o[c]);
      Tu(f) && (l[f] = De);
    }
  else if (o)
    for (const c in o) {
      const f = vt(c);
      if (Tu(f)) {
        const d = o[c], h = l[f] = xe(d) || Ve(d) ? { type: d } : Ye({}, d);
        if (h) {
          const v = $u(Boolean, h.type), m = $u(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = m < 0 || v < m, (v > -1 || Te(h, "default")) && s.push(f);
        }
      }
    }
  const u = [l, s];
  return Be(e) && i.set(e, u), u;
}
function Tu(e) {
  return e[0] !== "$" && !mr(e);
}
function Mu(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Au(e, t) {
  return Mu(e) === Mu(t);
}
function $u(e, t) {
  return xe(t) ? t.findIndex((n) => Au(n, e)) : Ve(t) && Au(t, e) ? 0 : -1;
}
const Ed = (e) => e[0] === "_" || e === "$stable", Va = (e) => xe(e) ? e.map(dn) : [dn(e)], Zg = (e, t, n) => {
  if (t._n)
    return t;
  const i = ae((...r) => Va(t(...r)), n);
  return i._c = !1, i;
}, Vd = (e, t, n) => {
  const i = e._ctx;
  for (const r in e) {
    if (Ed(r))
      continue;
    const o = e[r];
    if (Ve(o))
      t[r] = Zg(r, o, i);
    else if (o != null) {
      const l = Va(o);
      t[r] = () => l;
    }
  }
}, Ld = (e, t) => {
  const n = Va(t);
  e.slots.default = () => n;
}, Jg = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = Se(t), No(t, "_", n)) : Vd(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Ld(e, t);
  No(e.slots, wl, 1);
}, Qg = (e, t, n) => {
  const { vnode: i, slots: r } = e;
  let o = !0, l = De;
  if (i.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? o = !1 : (Ye(r, t), !n && s === 1 && delete r._) : (o = !t.$stable, Vd(t, r)), l = t;
  } else t && (Ld(e, t), l = { default: 1 });
  if (o)
    for (const s in r)
      !Ed(s) && l[s] == null && delete r[s];
};
function Es(e, t, n, i, r = !1) {
  if (xe(e)) {
    e.forEach(
      (d, h) => Es(
        d,
        t && (xe(t) ? t[h] : t),
        n,
        i,
        r
      )
    );
    return;
  }
  if (Co(i) && !r)
    return;
  const o = i.shapeFlag & 4 ? Sl(i.component) || i.component.proxy : i.el, l = r ? null : o, { i: s, r: a } = e, u = t && t.r, c = s.refs === De ? s.refs = {} : s.refs, f = s.setupState;
  if (u != null && u !== a && (Ge(u) ? (c[u] = null, Te(f, u) && (f[u] = null)) : Ue(u) && (u.value = null)), Ve(a))
    Yn(a, s, 12, [l, c]);
  else {
    const d = Ge(a), h = Ue(a);
    if (d || h) {
      const v = () => {
        if (e.f) {
          const m = d ? Te(f, a) ? f[a] : c[a] : a.value;
          r ? xe(m) && ua(m, o) : xe(m) ? m.includes(o) || m.push(o) : d ? (c[a] = [o], Te(f, a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else d ? (c[a] = l, Te(f, a) && (f[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, pt(v, n)) : v();
    }
  }
}
const pt = Eg;
function e0(e) {
  return t0(e);
}
function t0(e, t) {
  const n = Df();
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
    setScopeId: h = Ot,
    insertStaticContent: v
  } = e, m = (V, P, z, q = null, X = null, ie = null, oe = void 0, ne = null, re = !!P.dynamicChildren) => {
    if (V === P)
      return;
    V && !li(V, P) && (q = ue(V), K(V, X, ie, !0), V = null), P.patchFlag === -2 && (re = !1, P.dynamicChildren = null);
    const { type: J, ref: se, shapeFlag: ye } = P;
    switch (J) {
      case zr:
        p(V, P, z, q);
        break;
      case Dt:
        y(V, P, z, q);
        break;
      case Xl:
        V == null && w(P, z, q, oe);
        break;
      case Le:
        L(
          V,
          P,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re
        );
        break;
      default:
        ye & 1 ? _(
          V,
          P,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re
        ) : ye & 6 ? N(
          V,
          P,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re
        ) : (ye & 64 || ye & 128) && J.process(
          V,
          P,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re,
          st
        );
    }
    se != null && X && Es(se, V && V.ref, ie, P || V, !P);
  }, p = (V, P, z, q) => {
    if (V == null)
      i(
        P.el = s(P.children),
        z,
        q
      );
    else {
      const X = P.el = V.el;
      P.children !== V.children && u(X, P.children);
    }
  }, y = (V, P, z, q) => {
    V == null ? i(
      P.el = a(P.children || ""),
      z,
      q
    ) : P.el = V.el;
  }, w = (V, P, z, q) => {
    [V.el, V.anchor] = v(
      V.children,
      P,
      z,
      q,
      V.el,
      V.anchor
    );
  }, x = ({ el: V, anchor: P }, z, q) => {
    let X;
    for (; V && V !== P; )
      X = d(V), i(V, z, q), V = X;
    i(P, z, q);
  }, b = ({ el: V, anchor: P }) => {
    let z;
    for (; V && V !== P; )
      z = d(V), r(V), V = z;
    r(P);
  }, _ = (V, P, z, q, X, ie, oe, ne, re) => {
    P.type === "svg" ? oe = "svg" : P.type === "math" && (oe = "mathml"), V == null ? E(
      P,
      z,
      q,
      X,
      ie,
      oe,
      ne,
      re
    ) : $(
      V,
      P,
      X,
      ie,
      oe,
      ne,
      re
    );
  }, E = (V, P, z, q, X, ie, oe, ne) => {
    let re, J;
    const { props: se, shapeFlag: ye, transition: ve, dirs: _e } = V;
    if (re = V.el = l(
      V.type,
      ie,
      se && se.is,
      se
    ), ye & 8 ? c(re, V.children) : ye & 16 && I(
      V.children,
      re,
      null,
      q,
      X,
      Kl(V, ie),
      oe,
      ne
    ), _e && ei(V, null, q, "created"), S(re, V, V.scopeId, oe, q), se) {
      for (const Ae in se)
        Ae !== "value" && !mr(Ae) && o(
          re,
          Ae,
          null,
          se[Ae],
          ie,
          V.children,
          q,
          X,
          Q
        );
      "value" in se && o(re, "value", null, se.value, ie), (J = se.onVnodeBeforeMount) && fn(J, q, V);
    }
    _e && ei(V, null, q, "beforeMount");
    const Ie = n0(X, ve);
    Ie && ve.beforeEnter(re), i(re, P, z), ((J = se && se.onVnodeMounted) || Ie || _e) && pt(() => {
      J && fn(J, q, V), Ie && ve.enter(re), _e && ei(V, null, q, "mounted");
    }, X);
  }, S = (V, P, z, q, X) => {
    if (z && h(V, z), q)
      for (let ie = 0; ie < q.length; ie++)
        h(V, q[ie]);
    if (X) {
      let ie = X.subTree;
      if (P === ie) {
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
  }, I = (V, P, z, q, X, ie, oe, ne, re = 0) => {
    for (let J = re; J < V.length; J++) {
      const se = V[J] = ne ? zn(V[J]) : dn(V[J]);
      m(
        null,
        se,
        P,
        z,
        q,
        X,
        ie,
        oe,
        ne
      );
    }
  }, $ = (V, P, z, q, X, ie, oe) => {
    const ne = P.el = V.el;
    let { patchFlag: re, dynamicChildren: J, dirs: se } = P;
    re |= V.patchFlag & 16;
    const ye = V.props || De, ve = P.props || De;
    let _e;
    if (z && ti(z, !1), (_e = ve.onVnodeBeforeUpdate) && fn(_e, z, P, V), se && ei(P, V, z, "beforeUpdate"), z && ti(z, !0), J ? R(
      V.dynamicChildren,
      J,
      ne,
      z,
      q,
      Kl(P, X),
      ie
    ) : oe || M(
      V,
      P,
      ne,
      null,
      z,
      q,
      Kl(P, X),
      ie,
      !1
    ), re > 0) {
      if (re & 16)
        H(
          ne,
          P,
          ye,
          ve,
          z,
          q,
          X
        );
      else if (re & 2 && ye.class !== ve.class && o(ne, "class", null, ve.class, X), re & 4 && o(ne, "style", ye.style, ve.style, X), re & 8) {
        const Ie = P.dynamicProps;
        for (let Ae = 0; Ae < Ie.length; Ae++) {
          const Re = Ie[Ae], Fe = ye[Re], at = ve[Re];
          (at !== Fe || Re === "value") && o(
            ne,
            Re,
            Fe,
            at,
            X,
            V.children,
            z,
            q,
            Q
          );
        }
      }
      re & 1 && V.children !== P.children && c(ne, P.children);
    } else !oe && J == null && H(
      ne,
      P,
      ye,
      ve,
      z,
      q,
      X
    );
    ((_e = ve.onVnodeUpdated) || se) && pt(() => {
      _e && fn(_e, z, P, V), se && ei(P, V, z, "updated");
    }, q);
  }, R = (V, P, z, q, X, ie, oe) => {
    for (let ne = 0; ne < P.length; ne++) {
      const re = V[ne], J = P[ne], se = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        re.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (re.type === Le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !li(re, J) || // - In the case of a component, it could contain anything.
        re.shapeFlag & 70) ? f(re.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          z
        )
      );
      m(
        re,
        J,
        se,
        null,
        q,
        X,
        ie,
        oe,
        !0
      );
    }
  }, H = (V, P, z, q, X, ie, oe) => {
    if (z !== q) {
      if (z !== De)
        for (const ne in z)
          !mr(ne) && !(ne in q) && o(
            V,
            ne,
            z[ne],
            null,
            oe,
            P.children,
            X,
            ie,
            Q
          );
      for (const ne in q) {
        if (mr(ne))
          continue;
        const re = q[ne], J = z[ne];
        re !== J && ne !== "value" && o(
          V,
          ne,
          J,
          re,
          oe,
          P.children,
          X,
          ie,
          Q
        );
      }
      "value" in q && o(V, "value", z.value, q.value, oe);
    }
  }, L = (V, P, z, q, X, ie, oe, ne, re) => {
    const J = P.el = V ? V.el : s(""), se = P.anchor = V ? V.anchor : s("");
    let { patchFlag: ye, dynamicChildren: ve, slotScopeIds: _e } = P;
    _e && (ne = ne ? ne.concat(_e) : _e), V == null ? (i(J, z, q), i(se, z, q), I(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      P.children || [],
      z,
      se,
      X,
      ie,
      oe,
      ne,
      re
    )) : ye > 0 && ye & 64 && ve && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      ve,
      z,
      X,
      ie,
      oe,
      ne
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (P.key != null || X && P === X.subTree) && La(
      V,
      P,
      !0
      /* shallow */
    )) : M(
      V,
      P,
      z,
      se,
      X,
      ie,
      oe,
      ne,
      re
    );
  }, N = (V, P, z, q, X, ie, oe, ne, re) => {
    P.slotScopeIds = ne, V == null ? P.shapeFlag & 512 ? X.ctx.activate(
      P,
      z,
      q,
      oe,
      re
    ) : C(
      P,
      z,
      q,
      X,
      ie,
      oe,
      re
    ) : B(V, P, re);
  }, C = (V, P, z, q, X, ie, oe) => {
    const ne = V.component = h0(
      V,
      q,
      X
    );
    if (gl(V) && (ne.ctx.renderer = st), v0(ne), ne.asyncDep) {
      if (X && X.registerDep(ne, T), !V.el) {
        const re = ne.subTree = g(Dt);
        y(null, re, P, z);
      }
    } else
      T(
        ne,
        V,
        P,
        z,
        X,
        ie,
        oe
      );
  }, B = (V, P, z) => {
    const q = P.component = V.component;
    if (wg(V, P, z))
      if (q.asyncDep && !q.asyncResolved) {
        j(q, P, z);
        return;
      } else
        q.next = P, vg(q.update), q.effect.dirty = !0, q.update();
    else
      P.el = V.el, q.vnode = P;
  }, T = (V, P, z, q, X, ie, oe) => {
    const ne = () => {
      if (V.isMounted) {
        let { next: se, bu: ye, u: ve, parent: _e, vnode: Ie } = V;
        {
          const xn = Id(V);
          if (xn) {
            se && (se.el = Ie.el, j(V, se, oe)), xn.asyncDep.then(() => {
              V.isUnmounted || ne();
            });
            return;
          }
        }
        let Ae = se, Re;
        ti(V, !1), se ? (se.el = Ie.el, j(V, se, oe)) : se = Ie, ye && Gl(ye), (Re = se.props && se.props.onVnodeBeforeUpdate) && fn(Re, _e, se, Ie), ti(V, !0);
        const Fe = Wl(V), at = V.subTree;
        V.subTree = Fe, m(
          at,
          Fe,
          // parent may have changed if it's in a teleport
          f(at.el),
          // anchor may have changed if it's in a fragment
          ue(at),
          V,
          X,
          ie
        ), se.el = Fe.el, Ae === null && xg(V, Fe.el), ve && pt(ve, X), (Re = se.props && se.props.onVnodeUpdated) && pt(
          () => fn(Re, _e, se, Ie),
          X
        );
      } else {
        let se;
        const { el: ye, props: ve } = P, { bm: _e, m: Ie, parent: Ae } = V, Re = Co(P);
        if (ti(V, !1), _e && Gl(_e), !Re && (se = ve && ve.onVnodeBeforeMount) && fn(se, Ae, P), ti(V, !0), ye && cn) {
          const Fe = () => {
            V.subTree = Wl(V), cn(
              ye,
              V.subTree,
              V,
              X,
              null
            );
          };
          Re ? P.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && Fe()
          ) : Fe();
        } else {
          const Fe = V.subTree = Wl(V);
          m(
            null,
            Fe,
            z,
            q,
            V,
            X,
            ie
          ), P.el = Fe.el;
        }
        if (Ie && pt(Ie, X), !Re && (se = ve && ve.onVnodeMounted)) {
          const Fe = P;
          pt(
            () => fn(se, Ae, Fe),
            X
          );
        }
        (P.shapeFlag & 256 || Ae && Co(Ae.vnode) && Ae.vnode.shapeFlag & 256) && V.a && pt(V.a, X), V.isMounted = !0, P = z = q = null;
      }
    }, re = V.effect = new va(
      ne,
      Ot,
      () => Sa(J),
      V.scope
      // track it in component's effect scope
    ), J = V.update = () => {
      re.dirty && re.run();
    };
    J.id = V.uid, ti(V, !0), J();
  }, j = (V, P, z) => {
    P.component = V;
    const q = V.vnode.props;
    V.vnode = P, V.next = null, Xg(V, P.props, q, z), Qg(V, P.children, z), xi(), Su(V), _i();
  }, M = (V, P, z, q, X, ie, oe, ne, re = !1) => {
    const J = V && V.children, se = V ? V.shapeFlag : 0, ye = P.children, { patchFlag: ve, shapeFlag: _e } = P;
    if (ve > 0) {
      if (ve & 128) {
        O(
          J,
          ye,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re
        );
        return;
      } else if (ve & 256) {
        F(
          J,
          ye,
          z,
          q,
          X,
          ie,
          oe,
          ne,
          re
        );
        return;
      }
    }
    _e & 8 ? (se & 16 && Q(J, X, ie), ye !== J && c(z, ye)) : se & 16 ? _e & 16 ? O(
      J,
      ye,
      z,
      q,
      X,
      ie,
      oe,
      ne,
      re
    ) : Q(J, X, ie, !0) : (se & 8 && c(z, ""), _e & 16 && I(
      ye,
      z,
      q,
      X,
      ie,
      oe,
      ne,
      re
    ));
  }, F = (V, P, z, q, X, ie, oe, ne, re) => {
    V = V || Ri, P = P || Ri;
    const J = V.length, se = P.length, ye = Math.min(J, se);
    let ve;
    for (ve = 0; ve < ye; ve++) {
      const _e = P[ve] = re ? zn(P[ve]) : dn(P[ve]);
      m(
        V[ve],
        _e,
        z,
        null,
        X,
        ie,
        oe,
        ne,
        re
      );
    }
    J > se ? Q(
      V,
      X,
      ie,
      !0,
      !1,
      ye
    ) : I(
      P,
      z,
      q,
      X,
      ie,
      oe,
      ne,
      re,
      ye
    );
  }, O = (V, P, z, q, X, ie, oe, ne, re) => {
    let J = 0;
    const se = P.length;
    let ye = V.length - 1, ve = se - 1;
    for (; J <= ye && J <= ve; ) {
      const _e = V[J], Ie = P[J] = re ? zn(P[J]) : dn(P[J]);
      if (li(_e, Ie))
        m(
          _e,
          Ie,
          z,
          null,
          X,
          ie,
          oe,
          ne,
          re
        );
      else
        break;
      J++;
    }
    for (; J <= ye && J <= ve; ) {
      const _e = V[ye], Ie = P[ve] = re ? zn(P[ve]) : dn(P[ve]);
      if (li(_e, Ie))
        m(
          _e,
          Ie,
          z,
          null,
          X,
          ie,
          oe,
          ne,
          re
        );
      else
        break;
      ye--, ve--;
    }
    if (J > ye) {
      if (J <= ve) {
        const _e = ve + 1, Ie = _e < se ? P[_e].el : q;
        for (; J <= ve; )
          m(
            null,
            P[J] = re ? zn(P[J]) : dn(P[J]),
            z,
            Ie,
            X,
            ie,
            oe,
            ne,
            re
          ), J++;
      }
    } else if (J > ve)
      for (; J <= ye; )
        K(V[J], X, ie, !0), J++;
    else {
      const _e = J, Ie = J, Ae = /* @__PURE__ */ new Map();
      for (J = Ie; J <= ve; J++) {
        const U = P[J] = re ? zn(P[J]) : dn(P[J]);
        U.key != null && Ae.set(U.key, J);
      }
      let Re, Fe = 0;
      const at = ve - Ie + 1;
      let xn = !1, A = 0;
      const W = new Array(at);
      for (J = 0; J < at; J++)
        W[J] = 0;
      for (J = _e; J <= ye; J++) {
        const U = V[J];
        if (Fe >= at) {
          K(U, X, ie, !0);
          continue;
        }
        let G;
        if (U.key != null)
          G = Ae.get(U.key);
        else
          for (Re = Ie; Re <= ve; Re++)
            if (W[Re - Ie] === 0 && li(U, P[Re])) {
              G = Re;
              break;
            }
        G === void 0 ? K(U, X, ie, !0) : (W[G - Ie] = J + 1, G >= A ? A = G : xn = !0, m(
          U,
          P[G],
          z,
          null,
          X,
          ie,
          oe,
          ne,
          re
        ), Fe++);
      }
      const Y = xn ? i0(W) : Ri;
      for (Re = Y.length - 1, J = at - 1; J >= 0; J--) {
        const U = Ie + J, G = P[U], pe = U + 1 < se ? P[U + 1].el : q;
        W[J] === 0 ? m(
          null,
          G,
          z,
          pe,
          X,
          ie,
          oe,
          ne,
          re
        ) : xn && (Re < 0 || J !== Y[Re] ? D(G, z, pe, 2) : Re--);
      }
    }
  }, D = (V, P, z, q, X = null) => {
    const { el: ie, type: oe, transition: ne, children: re, shapeFlag: J } = V;
    if (J & 6) {
      D(V.component.subTree, P, z, q);
      return;
    }
    if (J & 128) {
      V.suspense.move(P, z, q);
      return;
    }
    if (J & 64) {
      oe.move(V, P, z, st);
      return;
    }
    if (oe === Le) {
      i(ie, P, z);
      for (let ye = 0; ye < re.length; ye++)
        D(re[ye], P, z, q);
      i(V.anchor, P, z);
      return;
    }
    if (oe === Xl) {
      x(V, P, z);
      return;
    }
    if (q !== 2 && J & 1 && ne)
      if (q === 0)
        ne.beforeEnter(ie), i(ie, P, z), pt(() => ne.enter(ie), X);
      else {
        const { leave: ye, delayLeave: ve, afterLeave: _e } = ne, Ie = () => i(ie, P, z), Ae = () => {
          ye(ie, () => {
            Ie(), _e && _e();
          });
        };
        ve ? ve(ie, Ie, Ae) : Ae();
      }
    else
      i(ie, P, z);
  }, K = (V, P, z, q = !1, X = !1) => {
    const {
      type: ie,
      props: oe,
      ref: ne,
      children: re,
      dynamicChildren: J,
      shapeFlag: se,
      patchFlag: ye,
      dirs: ve
    } = V;
    if (ne != null && Es(ne, null, z, V, !0), se & 256) {
      P.ctx.deactivate(V);
      return;
    }
    const _e = se & 1 && ve, Ie = !Co(V);
    let Ae;
    if (Ie && (Ae = oe && oe.onVnodeBeforeUnmount) && fn(Ae, P, V), se & 6)
      me(V.component, z, q);
    else {
      if (se & 128) {
        V.suspense.unmount(z, q);
        return;
      }
      _e && ei(V, null, P, "beforeUnmount"), se & 64 ? V.type.remove(
        V,
        P,
        z,
        X,
        st,
        q
      ) : J && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ie !== Le || ye > 0 && ye & 64) ? Q(
        J,
        P,
        z,
        !1,
        !0
      ) : (ie === Le && ye & 384 || !X && se & 16) && Q(re, P, z), q && te(V);
    }
    (Ie && (Ae = oe && oe.onVnodeUnmounted) || _e) && pt(() => {
      Ae && fn(Ae, P, V), _e && ei(V, null, P, "unmounted");
    }, z);
  }, te = (V) => {
    const { type: P, el: z, anchor: q, transition: X } = V;
    if (P === Le) {
      ce(z, q);
      return;
    }
    if (P === Xl) {
      b(V);
      return;
    }
    const ie = () => {
      r(z), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (V.shapeFlag & 1 && X && !X.persisted) {
      const { leave: oe, delayLeave: ne } = X, re = () => oe(z, ie);
      ne ? ne(V.el, ie, re) : re();
    } else
      ie();
  }, ce = (V, P) => {
    let z;
    for (; V !== P; )
      z = d(V), r(V), V = z;
    r(P);
  }, me = (V, P, z) => {
    const { bum: q, scope: X, update: ie, subTree: oe, um: ne } = V;
    q && Gl(q), X.stop(), ie && (ie.active = !1, K(oe, V, P, z)), ne && pt(ne, P), pt(() => {
      V.isUnmounted = !0;
    }, P), P && P.pendingBranch && !P.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === P.pendingId && (P.deps--, P.deps === 0 && P.resolve());
  }, Q = (V, P, z, q = !1, X = !1, ie = 0) => {
    for (let oe = ie; oe < V.length; oe++)
      K(V[oe], P, z, q, X);
  }, ue = (V) => V.shapeFlag & 6 ? ue(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : d(V.anchor || V.el);
  let Ee = !1;
  const Ze = (V, P, z) => {
    V == null ? P._vnode && K(P._vnode, null, null, !0) : m(
      P._vnode || null,
      V,
      P,
      null,
      null,
      null,
      z
    ), Ee || (Ee = !0, Su(), cd(), Ee = !1), P._vnode = V;
  }, st = {
    p: m,
    um: K,
    m: D,
    r: te,
    mt: C,
    mc: I,
    pc: M,
    pbc: R,
    n: ue,
    o: e
  };
  let Ut, cn;
  return {
    render: Ze,
    hydrate: Ut,
    createApp: Yg(Ze, Ut)
  };
}
function Kl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ti({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function n0(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function La(e, t, n = !1) {
  const i = e.children, r = t.children;
  if (xe(i) && xe(r))
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      let s = r[o];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = r[o] = zn(r[o]), s.el = l.el), n || La(l, s)), s.type === zr && (s.el = l.el);
    }
}
function i0(e) {
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
function Id(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Id(t);
}
const r0 = (e) => e.__isTeleport, pr = (e) => e && (e.disabled || e.disabled === ""), Nu = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ru = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Vs = (e, t) => {
  const n = e && e.to;
  return Ge(n) ? t ? t(n) : null : n;
}, o0 = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, r, o, l, s, a, u) {
    const {
      mc: c,
      pc: f,
      pbc: d,
      o: { insert: h, querySelector: v, createText: m, createComment: p }
    } = u, y = pr(t.props);
    let { shapeFlag: w, children: x, dynamicChildren: b } = t;
    if (e == null) {
      const _ = t.el = m(""), E = t.anchor = m("");
      h(_, n, i), h(E, n, i);
      const S = t.target = Vs(t.props, v), I = t.targetAnchor = m("");
      S && (h(I, S), l === "svg" || Nu(S) ? l = "svg" : (l === "mathml" || Ru(S)) && (l = "mathml"));
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
      const _ = t.anchor = e.anchor, E = t.target = e.target, S = t.targetAnchor = e.targetAnchor, I = pr(e.props), $ = I ? n : E, R = I ? _ : S;
      if (l === "svg" || Nu(E) ? l = "svg" : (l === "mathml" || Ru(E)) && (l = "mathml"), b ? (d(
        e.dynamicChildren,
        b,
        $,
        r,
        o,
        l,
        s
      ), La(e, t, !0)) : a || f(
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
        I ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : co(
          t,
          n,
          _,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const H = t.target = Vs(
          t.props,
          v
        );
        H && co(
          t,
          H,
          null,
          u,
          0
        );
      } else I && co(
        t,
        E,
        S,
        u,
        1
      );
    }
    Pd(t);
  },
  remove(e, t, n, i, { um: r, o: { remove: o } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: f, props: d } = e;
    if (f && o(c), l && o(u), s & 16) {
      const h = l || !pr(d);
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
  move: co,
  hydrate: l0
};
function co(e, t, n, { o: { insert: i }, m: r }, o = 2) {
  o === 0 && i(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, f = o === 2;
  if (f && i(l, t, n), (!f || pr(c)) && a & 16)
    for (let d = 0; d < u.length; d++)
      r(
        u[d],
        t,
        n,
        2
      );
  f && i(s, t, n);
}
function l0(e, t, n, i, r, o, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = Vs(
    t.props,
    a
  );
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (pr(t.props))
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
    Pd(t);
  }
  return t.anchor && l(t.anchor);
}
const s0 = o0;
function Pd(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Le = Symbol.for("v-fgt"), zr = Symbol.for("v-txt"), Dt = Symbol.for("v-cmt"), Xl = Symbol.for("v-stc"), br = [];
let Jt = null;
function Et(e = !1) {
  br.push(Jt = e ? null : []);
}
function a0() {
  br.pop(), Jt = br[br.length - 1] || null;
}
let Vr = 1;
function Ou(e) {
  Vr += e;
}
function Td(e) {
  return e.dynamicChildren = Vr > 0 ? Jt || Ri : null, a0(), Vr > 0 && Jt && Jt.push(e), e;
}
function Ls(e, t, n, i, r, o) {
  return Td(
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
function vn(e, t, n, i, r) {
  return Td(
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
function Do(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function li(e, t) {
  return e.type === t.type && e.key === t.key;
}
const wl = "__vInternal", Md = ({ key: e }) => e ?? null, ko = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ge(e) || Ue(e) || Ve(e) ? { i: dt, r: e, k: t, f: !!n } : e : null);
function Ne(e, t = null, n = null, i = 0, r = null, o = e === Le ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Md(t),
    ref: t && ko(t),
    scopeId: hd,
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
    ctx: dt
  };
  return s ? (Ia(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ge(n) ? 8 : 16), Vr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Jt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Jt.push(a), a;
}
const g = u0;
function u0(e, t = null, n = null, i = 0, r = null, o = !1) {
  if ((!e || e === Sg) && (e = Dt), Do(e)) {
    const s = Ln(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ia(s, n), Vr > 0 && !o && Jt && (s.shapeFlag & 6 ? Jt[Jt.indexOf(e)] = s : Jt.push(s)), s.patchFlag |= -2, s;
  }
  if (b0(e) && (e = e.__vccOpts), t) {
    t = c0(t);
    let { class: s, style: a } = t;
    s && !Ge(s) && (t.class = da(s)), Be(a) && (td(a) && !xe(a) && (a = Ye({}, a)), t.style = fa(a));
  }
  const l = Ge(e) ? 1 : kg(e) ? 128 : r0(e) ? 64 : Be(e) ? 4 : Ve(e) ? 2 : 0;
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
function c0(e) {
  return e ? td(e) || wl in e ? Ye({}, e) : e : null;
}
function Ln(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l } = e, s = t ? de(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && Md(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? xe(r) ? r.concat(ko(t)) : [r, ko(t)] : ko(t)
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
    ssContent: e.ssContent && Ln(e.ssContent),
    ssFallback: e.ssFallback && Ln(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Je(e = " ", t = 0) {
  return g(zr, null, e, t);
}
function Yt(e = "", t = !1) {
  return t ? (Et(), vn(Dt, null, e)) : g(Dt, null, e);
}
function dn(e) {
  return e == null || typeof e == "boolean" ? g(Dt) : xe(e) ? g(
    Le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? zn(e) : g(zr, null, String(e));
}
function zn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ln(e);
}
function Ia(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (xe(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ia(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(wl in t) ? t._ctx = dt : r === 3 && dt && (dt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ve(t) ? (t = { default: t, _ctx: dt }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Je(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function de(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = da([t.class, i.class]));
      else if (r === "style")
        t.style = fa([t.style, i.style]);
      else if (cl(r)) {
        const o = t[r], l = i[r];
        l && o !== l && !(xe(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function fn(e, t, n, i = null) {
  Ft(e, t, 7, [
    n,
    i
  ]);
}
const f0 = Sd();
let d0 = 0;
function h0(e, t, n) {
  const i = e.type, r = (t ? t.appContext : e.appContext) || f0, o = {
    uid: d0++,
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
    scope: new zf(
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
    propsOptions: kd(i, r),
    emitsOptions: dd(i, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: De,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: De,
    data: De,
    props: De,
    attrs: De,
    slots: De,
    refs: De,
    setupState: De,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = yg.bind(null, o), e.ce && e.ce(o), o;
}
let nt = null;
const xl = () => nt || dt;
let Ho, Is;
{
  const e = Df(), t = (n, i) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(i), (o) => {
      r.length > 1 ? r.forEach((l) => l(o)) : r[0](o);
    };
  };
  Ho = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => nt = n
  ), Is = t(
    "__VUE_SSR_SETTERS__",
    (n) => _l = n
  );
}
const Gr = (e) => {
  const t = nt;
  return Ho(e), e.scope.on(), () => {
    e.scope.off(), Ho(t);
  };
}, Bu = () => {
  nt && nt.scope.off(), Ho(null);
};
function Ad(e) {
  return e.vnode.shapeFlag & 4;
}
let _l = !1;
function v0(e, t = !1) {
  t && Is(t);
  const { props: n, children: i } = e.vnode, r = Ad(e);
  Kg(e, n, r, t), Jg(e, i);
  const o = r ? m0(e, t) : void 0;
  return t && Is(!1), o;
}
function m0(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = nd(new Proxy(e.ctx, Hg));
  const { setup: i } = n;
  if (i) {
    const r = e.setupContext = i.length > 1 ? y0(e) : null, o = Gr(e);
    xi();
    const l = Yn(
      i,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (_i(), o(), Of(l)) {
      if (l.then(Bu, Bu), t)
        return l.then((s) => {
          Fu(e, s, t);
        }).catch((s) => {
          vl(s, e, 0);
        });
      e.asyncDep = l;
    } else
      Fu(e, l, t);
  } else
    $d(e, t);
}
function Fu(e, t, n) {
  Ve(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Be(t) && (e.setupState = ld(t)), $d(e, n);
}
let Du;
function $d(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Du && !i.render) {
      const r = i.template || Ea(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = i, u = Ye(
          Ye(
            {
              isCustomElement: o,
              delimiters: s
            },
            l
          ),
          a
        );
        i.render = Du(r, u);
      }
    }
    e.render = i.render || Ot;
  }
  {
    const r = Gr(e);
    xi();
    try {
      jg(e);
    } finally {
      _i(), r();
    }
  }
}
function g0(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return wt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function y0(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return g0(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Sl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ld(nd(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in gr)
          return gr[n](e);
      },
      has(t, n) {
        return n in t || n in gr;
      }
    }));
}
function p0(e, t = !0) {
  return Ve(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function b0(e) {
  return Ve(e) && "__vccOpts" in e;
}
const k = (e, t) => sg(e, t, _l);
function $n(e, t, n) {
  const i = arguments.length;
  return i === 2 ? Be(t) && !xe(t) ? Do(t) ? g(e, null, [t]) : g(e, t) : g(e, null, t) : (i > 3 ? n = Array.prototype.slice.call(arguments, 2) : i === 3 && Do(n) && (n = [n]), g(e, t, n));
}
const w0 = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const x0 = "http://www.w3.org/2000/svg", _0 = "http://www.w3.org/1998/Math/MathML", Gn = typeof document < "u" ? document : null, Hu = Gn && /* @__PURE__ */ Gn.createElement("template"), S0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const r = t === "svg" ? Gn.createElementNS(x0, e) : t === "mathml" ? Gn.createElementNS(_0, e) : Gn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && r.setAttribute("multiple", i.multiple), r;
  },
  createText: (e) => Gn.createTextNode(e),
  createComment: (e) => Gn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Gn.querySelector(e),
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
      Hu.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
      const s = Hu.content;
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
}, Fn = "transition", rr = "animation", Ui = Symbol("_vtc"), In = (e, { slots: t }) => $n(Tg, Rd(e), t);
In.displayName = "Transition";
const Nd = {
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
}, C0 = In.props = /* @__PURE__ */ Ye(
  {},
  pd,
  Nd
), ni = (e, t = []) => {
  xe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, ju = (e) => e ? xe(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Rd(e) {
  const t = {};
  for (const L in e)
    L in Nd || (t[L] = e[L]);
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
  } = e, v = k0(r), m = v && v[0], p = v && v[1], {
    onBeforeEnter: y,
    onEnter: w,
    onEnterCancelled: x,
    onLeave: b,
    onLeaveCancelled: _,
    onBeforeAppear: E = y,
    onAppear: S = w,
    onAppearCancelled: I = x
  } = t, $ = (L, N, C) => {
    Dn(L, N ? c : s), Dn(L, N ? u : l), C && C();
  }, R = (L, N) => {
    L._isLeaving = !1, Dn(L, f), Dn(L, h), Dn(L, d), N && N();
  }, H = (L) => (N, C) => {
    const B = L ? S : w, T = () => $(N, L, C);
    ni(B, [N, T]), zu(() => {
      Dn(N, L ? a : o), Sn(N, L ? c : s), ju(B) || Gu(N, i, m, T);
    });
  };
  return Ye(t, {
    onBeforeEnter(L) {
      ni(y, [L]), Sn(L, o), Sn(L, l);
    },
    onBeforeAppear(L) {
      ni(E, [L]), Sn(L, a), Sn(L, u);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(L, N) {
      L._isLeaving = !0;
      const C = () => R(L, N);
      Sn(L, f), Bd(), Sn(L, d), zu(() => {
        L._isLeaving && (Dn(L, f), Sn(L, h), ju(b) || Gu(L, i, p, C));
      }), ni(b, [L, C]);
    },
    onEnterCancelled(L) {
      $(L, !1), ni(x, [L]);
    },
    onAppearCancelled(L) {
      $(L, !0), ni(I, [L]);
    },
    onLeaveCancelled(L) {
      R(L), ni(_, [L]);
    }
  });
}
function k0(e) {
  if (e == null)
    return null;
  if (Be(e))
    return [Zl(e.enter), Zl(e.leave)];
  {
    const t = Zl(e);
    return [t, t];
  }
}
function Zl(e) {
  return ys(e);
}
function Sn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Ui] || (e[Ui] = /* @__PURE__ */ new Set())).add(t);
}
function Dn(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const n = e[Ui];
  n && (n.delete(t), n.size || (e[Ui] = void 0));
}
function zu(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let E0 = 0;
function Gu(e, t, n, i) {
  const r = e._endId = ++E0, o = () => {
    r === e._endId && i();
  };
  if (n)
    return setTimeout(o, n);
  const { type: l, timeout: s, propCount: a } = Od(e, t);
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
function Od(e, t) {
  const n = window.getComputedStyle(e), i = (v) => (n[v] || "").split(", "), r = i(`${Fn}Delay`), o = i(`${Fn}Duration`), l = Uu(r, o), s = i(`${rr}Delay`), a = i(`${rr}Duration`), u = Uu(s, a);
  let c = null, f = 0, d = 0;
  t === Fn ? l > 0 && (c = Fn, f = l, d = o.length) : t === rr ? u > 0 && (c = rr, f = u, d = a.length) : (f = Math.max(l, u), c = f > 0 ? l > u ? Fn : rr : null, d = c ? c === Fn ? o.length : a.length : 0);
  const h = c === Fn && /\b(transform|all)(,|$)/.test(
    i(`${Fn}Property`).toString()
  );
  return {
    type: c,
    timeout: f,
    propCount: d,
    hasTransform: h
  };
}
function Uu(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, i) => Wu(n) + Wu(e[i])));
}
function Wu(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Bd() {
  return document.body.offsetHeight;
}
function V0(e, t, n) {
  const i = e[Ui];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const jo = Symbol("_vod"), Fd = Symbol("_vsh"), Ht = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[jo] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : or(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: i }) {
    !t != !n && (i ? t ? (i.beforeEnter(e), or(e, !0), i.enter(e)) : i.leave(e, () => {
      or(e, !1);
    }) : or(e, t));
  },
  beforeUnmount(e, { value: t }) {
    or(e, t);
  }
};
function or(e, t) {
  e.style.display = t ? e[jo] : "none", e[Fd] = !t;
}
const L0 = Symbol(""), I0 = /(^|;)\s*display\s*:/;
function P0(e, t, n) {
  const i = e.style, r = Ge(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Ge(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && Eo(i, s, "");
        }
      else
        for (const l in t)
          n[l] == null && Eo(i, l, "");
    for (const l in n)
      l === "display" && (o = !0), Eo(i, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = i[L0];
      l && (n += ";" + l), i.cssText = n, o = I0.test(n);
    }
  } else t && e.removeAttribute("style");
  jo in e && (e[jo] = o ? i.display : "", e[Fd] && (i.display = "none"));
}
const qu = /\s*!important$/;
function Eo(e, t, n) {
  if (xe(n))
    n.forEach((i) => Eo(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = T0(e, t);
    qu.test(n) ? e.setProperty(
      Kt(i),
      n.replace(qu, ""),
      "important"
    ) : e[i] = n;
  }
}
const Yu = ["Webkit", "Moz", "ms"], Jl = {};
function T0(e, t) {
  const n = Jl[t];
  if (n)
    return n;
  let i = vt(t);
  if (i !== "filter" && i in e)
    return Jl[t] = i;
  i = Mn(i);
  for (let r = 0; r < Yu.length; r++) {
    const o = Yu[r] + i;
    if (o in e)
      return Jl[t] = o;
  }
  return t;
}
const Ku = "http://www.w3.org/1999/xlink";
function M0(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Ku, t.slice(6, t.length)) : e.setAttributeNS(Ku, t, n);
  else {
    const o = Om(t);
    n == null || o && !Hf(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function A0(e, t, n, i, r, o, l) {
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
    u === "boolean" ? n = Hf(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function $0(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function N0(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const Xu = Symbol("_vei");
function R0(e, t, n, i, r = null) {
  const o = e[Xu] || (e[Xu] = {}), l = o[t];
  if (i && l)
    l.value = i;
  else {
    const [s, a] = O0(t);
    if (i) {
      const u = o[t] = D0(i, r);
      $0(e, s, u, a);
    } else l && (N0(e, s, l, a), o[t] = void 0);
  }
}
const Zu = /(?:Once|Passive|Capture)$/;
function O0(e) {
  let t;
  if (Zu.test(e)) {
    t = {};
    let i;
    for (; i = e.match(Zu); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Kt(e.slice(2)), t];
}
let Ql = 0;
const B0 = /* @__PURE__ */ Promise.resolve(), F0 = () => Ql || (B0.then(() => Ql = 0), Ql = Date.now());
function D0(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    Ft(
      H0(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = F0(), n;
}
function H0(e, t) {
  if (xe(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (r) => !r._stopped && i && i(r));
  } else
    return t;
}
const Ju = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, j0 = (e, t, n, i, r, o, l, s, a) => {
  const u = r === "svg";
  t === "class" ? V0(e, i, u) : t === "style" ? P0(e, n, i) : cl(t) ? aa(t) || R0(e, t, n, i, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : z0(e, t, i, u)) ? A0(
    e,
    t,
    i,
    o,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), M0(e, t, i, u));
};
function z0(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ju(t) && Ve(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Ju(t) && Ge(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function G0(e, t) {
  const n = /* @__PURE__ */ Ji(e);
  class i extends Pa {
    constructor(o) {
      super(n, o, t);
    }
  }
  return i.def = n, i;
}
const U0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Pa extends U0 {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Ke(() => {
      this._connected || (tc(null, this.shadowRoot), this._instance = null);
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
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = ys(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[vt(a)] = !0);
        }
      this._numberProps = s, r && this._resolveProps(i), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = xe(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && i.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of i.map(vt))
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
    const i = vt(t);
    this._numberProps && this._numberProps[i] && (n = ys(n)), this._setProp(i, n, !1);
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
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), i && (n === !0 ? this.setAttribute(Kt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Kt(t), n + "") : n || this.removeAttribute(Kt(t))));
  }
  _update() {
    tc(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = g(this._def, Ye({}, this._props));
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
        i(o, l), Kt(o) !== o && i(Kt(o), l);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof Pa) {
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
const Dd = /* @__PURE__ */ new WeakMap(), Hd = /* @__PURE__ */ new WeakMap(), zo = Symbol("_moveCb"), Qu = Symbol("_enterCb"), jd = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ye({}, C0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = xl(), i = yd();
    let r, o;
    return xd(() => {
      if (!r.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!X0(
        r[0].el,
        n.vnode.el,
        l
      ))
        return;
      r.forEach(q0), r.forEach(Y0);
      const s = r.filter(K0);
      Bd(), s.forEach((a) => {
        const u = a.el, c = u.style;
        Sn(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const f = u[zo] = (d) => {
          d && d.target !== u || (!d || /transform$/.test(d.propertyName)) && (u.removeEventListener("transitionend", f), u[zo] = null, Dn(u, l));
        };
        u.addEventListener("transitionend", f);
      });
    }), () => {
      const l = Se(e), s = Rd(l);
      let a = l.tag || Le;
      r = o, o = t.default ? ka(t.default()) : [];
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        c.key != null && Er(
          c,
          kr(c, s, i, n)
        );
      }
      if (r)
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          Er(
            c,
            kr(c, s, i, n)
          ), Dd.set(c, c.el.getBoundingClientRect());
        }
      return g(a, null, o);
    };
  }
}, W0 = (e) => delete e.mode;
jd.props;
const zd = jd;
function q0(e) {
  const t = e.el;
  t[zo] && t[zo](), t[Qu] && t[Qu]();
}
function Y0(e) {
  Hd.set(e, e.el.getBoundingClientRect());
}
function K0(e) {
  const t = Dd.get(e), n = Hd.get(e), i = t.left - n.left, r = t.top - n.top;
  if (i || r) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${i}px,${r}px)`, o.transitionDuration = "0s", e;
  }
}
function X0(e, t, n) {
  const i = e.cloneNode(), r = e[Ui];
  r && r.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && i.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && i.classList.add(s)), i.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(i);
  const { hasTransform: l } = Od(i);
  return o.removeChild(i), l;
}
const Z0 = /* @__PURE__ */ Ye({ patchProp: j0 }, S0);
let ec;
function Gd() {
  return ec || (ec = e0(Z0));
}
const tc = (...e) => {
  Gd().render(...e);
}, J0 = (...e) => {
  const t = Gd().createApp(...e), { mount: n } = t;
  return t.mount = (i) => {
    const r = ey(i);
    if (!r)
      return;
    const o = t._component;
    !Ve(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const l = n(r, !1, Q0(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), l;
  }, t;
};
function Q0(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ey(e) {
  return Ge(e) ? document.querySelector(e) : e;
}
const ty = (e, { plugins: t = [] } = {}) => /* @__PURE__ */ G0({
  styles: e.styles,
  render: () => $n(e),
  setup() {
    const n = J0();
    t.forEach(n.use), n.use(t[0]);
    const i = xl();
    Object.assign(i.appContext, n._context), Object.assign(i.provides, n._context.provides);
  }
});
var ny = { value: () => {
} };
function Ur() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Vo(n);
}
function Vo(e) {
  this._ = e;
}
function iy(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Vo.prototype = Ur.prototype = {
  constructor: Vo,
  on: function(e, t) {
    var n = this._, i = iy(e + "", n), r, o = -1, l = i.length;
    if (arguments.length < 2) {
      for (; ++o < l; ) if ((r = (e = i[o]).type) && (r = ry(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < l; )
      if (r = (e = i[o]).type) n[r] = nc(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = nc(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Vo(e);
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
function ry(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function nc(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = ny, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Ps = "http://www.w3.org/1999/xhtml";
const ic = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ps,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Cl(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), ic.hasOwnProperty(t) ? { space: ic[t], local: e } : e;
}
function oy(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Ps && t.documentElement.namespaceURI === Ps ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ly(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ud(e) {
  var t = Cl(e);
  return (t.local ? ly : oy)(t);
}
function sy() {
}
function Ta(e) {
  return e == null ? sy : function() {
    return this.querySelector(e);
  };
}
function ay(e) {
  typeof e != "function" && (e = Ta(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = o[c]) && (u = e.call(a, a.__data__, c, o)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new Pt(i, this._parents);
}
function uy(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function cy() {
  return [];
}
function Wd(e) {
  return e == null ? cy : function() {
    return this.querySelectorAll(e);
  };
}
function fy(e) {
  return function() {
    return uy(e.apply(this, arguments));
  };
}
function dy(e) {
  typeof e == "function" ? e = fy(e) : e = Wd(e);
  for (var t = this._groups, n = t.length, i = [], r = [], o = 0; o < n; ++o)
    for (var l = t[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (i.push(e.call(a, a.__data__, u, l)), r.push(a));
  return new Pt(i, r);
}
function qd(e) {
  return function() {
    return this.matches(e);
  };
}
function Yd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var hy = Array.prototype.find;
function vy(e) {
  return function() {
    return hy.call(this.children, e);
  };
}
function my() {
  return this.firstElementChild;
}
function gy(e) {
  return this.select(e == null ? my : vy(typeof e == "function" ? e : Yd(e)));
}
var yy = Array.prototype.filter;
function py() {
  return Array.from(this.children);
}
function by(e) {
  return function() {
    return yy.call(this.children, e);
  };
}
function wy(e) {
  return this.selectAll(e == null ? py : by(typeof e == "function" ? e : Yd(e)));
}
function xy(e) {
  typeof e != "function" && (e = qd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Pt(i, this._parents);
}
function Kd(e) {
  return new Array(e.length);
}
function _y() {
  return new Pt(this._enter || this._groups.map(Kd), this._parents);
}
function Go(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Go.prototype = {
  constructor: Go,
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
function Sy(e) {
  return function() {
    return e;
  };
}
function Cy(e, t, n, i, r, o) {
  for (var l = 0, s, a = t.length, u = o.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = o[l], i[l] = s) : n[l] = new Go(e, o[l]);
  for (; l < a; ++l)
    (s = t[l]) && (r[l] = s);
}
function ky(e, t, n, i, r, o, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, f = o.length, d = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (d[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? r[s] = a : u.set(h, a));
  for (s = 0; s < f; ++s)
    h = l.call(e, o[s], s, o) + "", (a = u.get(h)) ? (i[s] = a, a.__data__ = o[s], u.delete(h)) : n[s] = new Go(e, o[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(d[s]) === a && (r[s] = a);
}
function Ey(e) {
  return e.__data__;
}
function Vy(e, t) {
  if (!arguments.length) return Array.from(this, Ey);
  var n = t ? ky : Cy, i = this._parents, r = this._groups;
  typeof e != "function" && (e = Sy(e));
  for (var o = r.length, l = new Array(o), s = new Array(o), a = new Array(o), u = 0; u < o; ++u) {
    var c = i[u], f = r[u], d = f.length, h = Ly(e.call(c, c && c.__data__, u, i)), v = h.length, m = s[u] = new Array(v), p = l[u] = new Array(v), y = a[u] = new Array(d);
    n(c, f, m, p, y, h, t);
    for (var w = 0, x = 0, b, _; w < v; ++w)
      if (b = m[w]) {
        for (w >= x && (x = w + 1); !(_ = p[x]) && ++x < v; ) ;
        b._next = _ || null;
      }
  }
  return l = new Pt(l, i), l._enter = s, l._exit = a, l;
}
function Ly(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Iy() {
  return new Pt(this._exit || this._groups.map(Kd), this._parents);
}
function Py(e, t, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function Ty(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, o = i.length, l = Math.min(r, o), s = new Array(r), a = 0; a < l; ++a)
    for (var u = n[a], c = i[a], f = u.length, d = s[a] = new Array(f), h, v = 0; v < f; ++v)
      (h = u[v] || c[v]) && (d[v] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new Pt(s, this._parents);
}
function My() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, o = i[r], l; --r >= 0; )
      (l = i[r]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
  return this;
}
function Ay(e) {
  e || (e = $y);
  function t(f, d) {
    return f && d ? e(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var l = n[o], s = l.length, a = r[o] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new Pt(r, this._parents).order();
}
function $y(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ny() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ry() {
  return Array.from(this);
}
function Oy() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length; r < o; ++r) {
      var l = i[r];
      if (l) return l;
    }
  return null;
}
function By() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Fy() {
  return !this.node();
}
function Dy(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], o = 0, l = r.length, s; o < l; ++o)
      (s = r[o]) && e.call(s, s.__data__, o, r);
  return this;
}
function Hy(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function jy(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function zy(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Gy(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Uy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Wy(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function qy(e, t) {
  var n = Cl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? jy : Hy : typeof t == "function" ? n.local ? Wy : Uy : n.local ? Gy : zy)(n, t));
}
function Xd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Yy(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ky(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Xy(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Zy(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Yy : typeof t == "function" ? Xy : Ky)(e, t, n ?? "")) : Wi(this.node(), e);
}
function Wi(e, t) {
  return e.style.getPropertyValue(t) || Xd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Jy(e) {
  return function() {
    delete this[e];
  };
}
function Qy(e, t) {
  return function() {
    this[e] = t;
  };
}
function ep(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function tp(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Jy : typeof t == "function" ? ep : Qy)(e, t)) : this.node()[e];
}
function Zd(e) {
  return e.trim().split(/^|\s+/);
}
function Ma(e) {
  return e.classList || new Jd(e);
}
function Jd(e) {
  this._node = e, this._names = Zd(e.getAttribute("class") || "");
}
Jd.prototype = {
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
function Qd(e, t) {
  for (var n = Ma(e), i = -1, r = t.length; ++i < r; ) n.add(t[i]);
}
function eh(e, t) {
  for (var n = Ma(e), i = -1, r = t.length; ++i < r; ) n.remove(t[i]);
}
function np(e) {
  return function() {
    Qd(this, e);
  };
}
function ip(e) {
  return function() {
    eh(this, e);
  };
}
function rp(e, t) {
  return function() {
    (t.apply(this, arguments) ? Qd : eh)(this, e);
  };
}
function op(e, t) {
  var n = Zd(e + "");
  if (arguments.length < 2) {
    for (var i = Ma(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? rp : t ? np : ip)(n, t));
}
function lp() {
  this.textContent = "";
}
function sp(e) {
  return function() {
    this.textContent = e;
  };
}
function ap(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function up(e) {
  return arguments.length ? this.each(e == null ? lp : (typeof e == "function" ? ap : sp)(e)) : this.node().textContent;
}
function cp() {
  this.innerHTML = "";
}
function fp(e) {
  return function() {
    this.innerHTML = e;
  };
}
function dp(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function hp(e) {
  return arguments.length ? this.each(e == null ? cp : (typeof e == "function" ? dp : fp)(e)) : this.node().innerHTML;
}
function vp() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function mp() {
  return this.each(vp);
}
function gp() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function yp() {
  return this.each(gp);
}
function pp(e) {
  var t = typeof e == "function" ? e : Ud(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function bp() {
  return null;
}
function wp(e, t) {
  var n = typeof e == "function" ? e : Ud(e), i = t == null ? bp : typeof t == "function" ? t : Ta(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function xp() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function _p() {
  return this.each(xp);
}
function Sp() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cp() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function kp(e) {
  return this.select(e ? Cp : Sp);
}
function Ep(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Vp(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Lp(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Ip(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, o; n < r; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Pp(e, t, n) {
  return function() {
    var i = this.__on, r, o = Vp(t);
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
function Tp(e, t, n) {
  var i = Lp(e + ""), r, o = i.length, l;
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
  for (s = t ? Pp : Ip, r = 0; r < o; ++r) this.each(s(i[r], t, n));
  return this;
}
function th(e, t, n) {
  var i = Xd(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Mp(e, t) {
  return function() {
    return th(this, e, t);
  };
}
function Ap(e, t) {
  return function() {
    return th(this, e, t.apply(this, arguments));
  };
}
function $p(e, t) {
  return this.each((typeof t == "function" ? Ap : Mp)(e, t));
}
function* Np() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, o = i.length, l; r < o; ++r)
      (l = i[r]) && (yield l);
}
var nh = [null];
function Pt(e, t) {
  this._groups = e, this._parents = t;
}
function Wr() {
  return new Pt([[document.documentElement]], nh);
}
function Rp() {
  return this;
}
Pt.prototype = Wr.prototype = {
  constructor: Pt,
  select: ay,
  selectAll: dy,
  selectChild: gy,
  selectChildren: wy,
  filter: xy,
  data: Vy,
  enter: _y,
  exit: Iy,
  join: Py,
  merge: Ty,
  selection: Rp,
  order: My,
  sort: Ay,
  call: Ny,
  nodes: Ry,
  node: Oy,
  size: By,
  empty: Fy,
  each: Dy,
  attr: qy,
  style: Zy,
  property: tp,
  classed: op,
  text: up,
  html: hp,
  raise: mp,
  lower: yp,
  append: pp,
  insert: wp,
  remove: _p,
  clone: kp,
  datum: Ep,
  on: Tp,
  dispatch: $p,
  [Symbol.iterator]: Np
};
function ct(e) {
  return typeof e == "string" ? new Pt([[document.querySelector(e)]], [document.documentElement]) : new Pt([[e]], nh);
}
function ih(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Nt(e, t) {
  if (e = ih(e), t === void 0 && (t = e.currentTarget), t) {
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
function Op(e, t) {
  return e.target && (e = ih(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Nt(n, t));
}
const Bp = { passive: !1 }, Lr = { capture: !0, passive: !1 };
function es(e) {
  e.stopImmediatePropagation();
}
function Di(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function rh(e) {
  var t = e.document.documentElement, n = ct(e).on("dragstart.drag", Di, Lr);
  "onselectstart" in t ? n.on("selectstart.drag", Di, Lr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function oh(e, t) {
  var n = e.document.documentElement, i = ct(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Di, Lr), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const fo = (e) => () => e;
function Ts(e, {
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
Ts.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Fp(e) {
  return !e.ctrlKey && !e.button;
}
function Dp() {
  return this.parentNode;
}
function Hp(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function jp() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zp() {
  var e = Fp, t = Dp, n = Hp, i = jp, r = {}, o = Ur("start", "drag", "end"), l = 0, s, a, u, c, f = 0;
  function d(b) {
    b.on("mousedown.drag", h).filter(i).on("touchstart.drag", p).on("touchmove.drag", y, Bp).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, _) {
    if (!(c || !e.call(this, b, _))) {
      var E = x(this, t.call(this, b, _), b, _, "mouse");
      E && (ct(b.view).on("mousemove.drag", v, Lr).on("mouseup.drag", m, Lr), rh(b.view), es(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if (Di(b), !u) {
      var _ = b.clientX - s, E = b.clientY - a;
      u = _ * _ + E * E > f;
    }
    r.mouse("drag", b);
  }
  function m(b) {
    ct(b.view).on("mousemove.drag mouseup.drag", null), oh(b.view, u), Di(b), r.mouse("end", b);
  }
  function p(b, _) {
    if (e.call(this, b, _)) {
      var E = b.changedTouches, S = t.call(this, b, _), I = E.length, $, R;
      for ($ = 0; $ < I; ++$)
        (R = x(this, S, b, _, E[$].identifier, E[$])) && (es(b), R("start", b, E[$]));
    }
  }
  function y(b) {
    var _ = b.changedTouches, E = _.length, S, I;
    for (S = 0; S < E; ++S)
      (I = r[_[S].identifier]) && (Di(b), I("drag", b, _[S]));
  }
  function w(b) {
    var _ = b.changedTouches, E = _.length, S, I;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), S = 0; S < E; ++S)
      (I = r[_[S].identifier]) && (es(b), I("end", b, _[S]));
  }
  function x(b, _, E, S, I, $) {
    var R = o.copy(), H = Nt($ || E, _), L, N, C;
    if ((C = n.call(b, new Ts("beforestart", {
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
      return L = C.x - H[0] || 0, N = C.y - H[1] || 0, function B(T, j, M) {
        var F = H, O;
        switch (T) {
          case "start":
            r[I] = B, O = l++;
            break;
          case "end":
            delete r[I], --l;
          case "drag":
            H = Nt(M || j, _), O = l;
            break;
        }
        R.call(
          T,
          b,
          new Ts(T, {
            sourceEvent: j,
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
    return arguments.length ? (e = typeof b == "function" ? b : fo(!!b), d) : e;
  }, d.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : fo(b), d) : t;
  }, d.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : fo(b), d) : n;
  }, d.touchable = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : fo(!!b), d) : i;
  }, d.on = function() {
    var b = o.on.apply(o, arguments);
    return b === o ? d : b;
  }, d.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, d) : Math.sqrt(f);
  }, d;
}
function Aa(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function lh(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function qr() {
}
var Ir = 0.7, Uo = 1 / Ir, Hi = "\\s*([+-]?\\d+)\\s*", Pr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Gp = /^#([0-9a-f]{3,8})$/, Up = new RegExp(`^rgb\\(${Hi},${Hi},${Hi}\\)$`), Wp = new RegExp(`^rgb\\(${mn},${mn},${mn}\\)$`), qp = new RegExp(`^rgba\\(${Hi},${Hi},${Hi},${Pr}\\)$`), Yp = new RegExp(`^rgba\\(${mn},${mn},${mn},${Pr}\\)$`), Kp = new RegExp(`^hsl\\(${Pr},${mn},${mn}\\)$`), Xp = new RegExp(`^hsla\\(${Pr},${mn},${mn},${Pr}\\)$`), rc = {
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
Aa(qr, Tr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: oc,
  // Deprecated! Use color.formatHex.
  formatHex: oc,
  formatHex8: Zp,
  formatHsl: Jp,
  formatRgb: lc,
  toString: lc
});
function oc() {
  return this.rgb().formatHex();
}
function Zp() {
  return this.rgb().formatHex8();
}
function Jp() {
  return sh(this).formatHsl();
}
function lc() {
  return this.rgb().formatRgb();
}
function Tr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Gp.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? sc(t) : n === 3 ? new bt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ho(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ho(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Up.exec(e)) ? new bt(t[1], t[2], t[3], 1) : (t = Wp.exec(e)) ? new bt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = qp.exec(e)) ? ho(t[1], t[2], t[3], t[4]) : (t = Yp.exec(e)) ? ho(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Kp.exec(e)) ? cc(t[1], t[2] / 100, t[3] / 100, 1) : (t = Xp.exec(e)) ? cc(t[1], t[2] / 100, t[3] / 100, t[4]) : rc.hasOwnProperty(e) ? sc(rc[e]) : e === "transparent" ? new bt(NaN, NaN, NaN, 0) : null;
}
function sc(e) {
  return new bt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ho(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new bt(e, t, n, i);
}
function Qp(e) {
  return e instanceof qr || (e = Tr(e)), e ? (e = e.rgb(), new bt(e.r, e.g, e.b, e.opacity)) : new bt();
}
function Ms(e, t, n, i) {
  return arguments.length === 1 ? Qp(e) : new bt(e, t, n, i ?? 1);
}
function bt(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Aa(bt, Ms, lh(qr, {
  brighter(e) {
    return e = e == null ? Uo : Math.pow(Uo, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ir : Math.pow(Ir, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new bt(vi(this.r), vi(this.g), vi(this.b), Wo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ac,
  // Deprecated! Use color.formatHex.
  formatHex: ac,
  formatHex8: e1,
  formatRgb: uc,
  toString: uc
}));
function ac() {
  return `#${ui(this.r)}${ui(this.g)}${ui(this.b)}`;
}
function e1() {
  return `#${ui(this.r)}${ui(this.g)}${ui(this.b)}${ui((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function uc() {
  const e = Wo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${vi(this.r)}, ${vi(this.g)}, ${vi(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Wo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function vi(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ui(e) {
  return e = vi(e), (e < 16 ? "0" : "") + e.toString(16);
}
function cc(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Xt(e, t, n, i);
}
function sh(e) {
  if (e instanceof Xt) return new Xt(e.h, e.s, e.l, e.opacity);
  if (e instanceof qr || (e = Tr(e)), !e) return new Xt();
  if (e instanceof Xt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(t, n, i), o = Math.max(t, n, i), l = NaN, s = o - r, a = (o + r) / 2;
  return s ? (t === o ? l = (n - i) / s + (n < i) * 6 : n === o ? l = (i - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? o + r : 2 - o - r, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new Xt(l, s, a, e.opacity);
}
function t1(e, t, n, i) {
  return arguments.length === 1 ? sh(e) : new Xt(e, t, n, i ?? 1);
}
function Xt(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Aa(Xt, t1, lh(qr, {
  brighter(e) {
    return e = e == null ? Uo : Math.pow(Uo, e), new Xt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ir : Math.pow(Ir, e), new Xt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - i;
    return new bt(
      ts(e >= 240 ? e - 240 : e + 120, r, i),
      ts(e, r, i),
      ts(e < 120 ? e + 240 : e - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Xt(fc(this.h), vo(this.s), vo(this.l), Wo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Wo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${fc(this.h)}, ${vo(this.s) * 100}%, ${vo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function fc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function vo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ts(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ah = (e) => () => e;
function n1(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function i1(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function r1(e) {
  return (e = +e) == 1 ? uh : function(t, n) {
    return n - t ? i1(t, n, e) : ah(isNaN(t) ? n : t);
  };
}
function uh(e, t) {
  var n = t - e;
  return n ? n1(e, n) : ah(isNaN(e) ? t : e);
}
const dc = function e(t) {
  var n = r1(t);
  function i(r, o) {
    var l = n((r = Ms(r)).r, (o = Ms(o)).r), s = n(r.g, o.g), a = n(r.b, o.b), u = uh(r.opacity, o.opacity);
    return function(c) {
      return r.r = l(c), r.g = s(c), r.b = a(c), r.opacity = u(c), r + "";
    };
  }
  return i.gamma = e, i;
}(1);
function Un(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var As = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ns = new RegExp(As.source, "g");
function o1(e) {
  return function() {
    return e;
  };
}
function l1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function s1(e, t) {
  var n = As.lastIndex = ns.lastIndex = 0, i, r, o, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (i = As.exec(e)) && (r = ns.exec(t)); )
    (o = r.index) > n && (o = t.slice(n, o), s[l] ? s[l] += o : s[++l] = o), (i = i[0]) === (r = r[0]) ? s[l] ? s[l] += r : s[++l] = r : (s[++l] = null, a.push({ i: l, x: Un(i, r) })), n = ns.lastIndex;
  return n < t.length && (o = t.slice(n), s[l] ? s[l] += o : s[++l] = o), s.length < 2 ? a[0] ? l1(a[0].x) : o1(t) : (t = a.length, function(u) {
    for (var c = 0, f; c < t; ++c) s[(f = a[c]).i] = f.x(u);
    return s.join("");
  });
}
var hc = 180 / Math.PI, $s = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ch(e, t, n, i, r, o) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * i) && (n -= e * a, i -= t * a), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, a /= s), e * i < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(t, e) * hc,
    skewX: Math.atan(a) * hc,
    scaleX: l,
    scaleY: s
  };
}
var mo;
function a1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? $s : ch(t.a, t.b, t.c, t.d, t.e, t.f);
}
function u1(e) {
  return e == null || (mo || (mo = document.createElementNS("http://www.w3.org/2000/svg", "g")), mo.setAttribute("transform", e), !(e = mo.transform.baseVal.consolidate())) ? $s : (e = e.matrix, ch(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fh(e, t, n, i) {
  function r(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, c, f, d, h, v) {
    if (u !== f || c !== d) {
      var m = h.push("translate(", null, t, null, n);
      v.push({ i: m - 4, x: Un(u, f) }, { i: m - 2, x: Un(c, d) });
    } else (f || d) && h.push("translate(" + f + t + d + n);
  }
  function l(u, c, f, d) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), d.push({ i: f.push(r(f) + "rotate(", null, i) - 2, x: Un(u, c) })) : c && f.push(r(f) + "rotate(" + c + i);
  }
  function s(u, c, f, d) {
    u !== c ? d.push({ i: f.push(r(f) + "skewX(", null, i) - 2, x: Un(u, c) }) : c && f.push(r(f) + "skewX(" + c + i);
  }
  function a(u, c, f, d, h, v) {
    if (u !== f || c !== d) {
      var m = h.push(r(h) + "scale(", null, ",", null, ")");
      v.push({ i: m - 4, x: Un(u, f) }, { i: m - 2, x: Un(c, d) });
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
var c1 = fh(a1, "px, ", "px)", "deg)"), f1 = fh(u1, ", ", ")", ")"), d1 = 1e-12;
function vc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function h1(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function v1(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const m1 = function e(t, n, i) {
  function r(o, l) {
    var s = o[0], a = o[1], u = o[2], c = l[0], f = l[1], d = l[2], h = c - s, v = f - a, m = h * h + v * v, p, y;
    if (m < d1)
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
        var I = S * y, $ = vc(_), R = u / (n * w) * ($ * v1(t * I + _) - h1(_));
        return [
          s + R * h,
          a + R * v,
          u * $ / vc(t * I + _)
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
var qi = 0, dr = 0, lr = 0, dh = 1e3, qo, hr, Yo = 0, pi = 0, kl = 0, Mr = typeof performance == "object" && performance.now ? performance : Date, hh = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function $a() {
  return pi || (hh(g1), pi = Mr.now() + kl);
}
function g1() {
  pi = 0;
}
function Ko() {
  this._call = this._time = this._next = null;
}
Ko.prototype = Na.prototype = {
  constructor: Ko,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? $a() : +n) + (t == null ? 0 : +t), !this._next && hr !== this && (hr ? hr._next = this : qo = this, hr = this), this._call = e, this._time = n, Ns();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ns());
  }
};
function Na(e, t, n) {
  var i = new Ko();
  return i.restart(e, t, n), i;
}
function y1() {
  $a(), ++qi;
  for (var e = qo, t; e; )
    (t = pi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --qi;
}
function mc() {
  pi = (Yo = Mr.now()) + kl, qi = dr = 0;
  try {
    y1();
  } finally {
    qi = 0, b1(), pi = 0;
  }
}
function p1() {
  var e = Mr.now(), t = e - Yo;
  t > dh && (kl -= t, Yo = e);
}
function b1() {
  for (var e, t = qo, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : qo = n);
  hr = e, Ns(i);
}
function Ns(e) {
  if (!qi) {
    dr && (dr = clearTimeout(dr));
    var t = e - pi;
    t > 24 ? (e < 1 / 0 && (dr = setTimeout(mc, e - Mr.now() - kl)), lr && (lr = clearInterval(lr))) : (lr || (Yo = Mr.now(), lr = setInterval(p1, dh)), qi = 1, hh(mc));
  }
}
function gc(e, t, n) {
  var i = new Ko();
  return t = t == null ? 0 : +t, i.restart((r) => {
    i.stop(), e(r + t);
  }, t, n), i;
}
var w1 = Ur("start", "end", "cancel", "interrupt"), x1 = [], vh = 0, yc = 1, Rs = 2, Lo = 3, pc = 4, Os = 5, Io = 6;
function El(e, t, n, i, r, o) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  _1(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: w1,
    tween: x1,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: vh
  });
}
function Ra(e, t) {
  var n = ln(e, t);
  if (n.state > vh) throw new Error("too late; already scheduled");
  return n;
}
function pn(e, t) {
  var n = ln(e, t);
  if (n.state > Lo) throw new Error("too late; already running");
  return n;
}
function ln(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function _1(e, t, n) {
  var i = e.__transition, r;
  i[t] = n, n.timer = Na(o, 0, n.time);
  function o(u) {
    n.state = yc, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, f, d, h;
    if (n.state !== yc) return a();
    for (c in i)
      if (h = i[c], h.name === n.name) {
        if (h.state === Lo) return gc(l);
        h.state === pc ? (h.state = Io, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete i[c]) : +c < t && (h.state = Io, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete i[c]);
      }
    if (gc(function() {
      n.state === Lo && (n.state = pc, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = Rs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Rs) {
      for (n.state = Lo, r = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (r[++f] = h);
      r.length = f + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = Os, 1), f = -1, d = r.length; ++f < d; )
      r[f].call(e, c);
    n.state === Os && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Io, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function Po(e, t) {
  var n = e.__transition, i, r, o = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((i = n[l]).name !== t) {
        o = !1;
        continue;
      }
      r = i.state > Rs && i.state < Os, i.state = Io, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[l];
    }
    o && delete e.__transition;
  }
}
function S1(e) {
  return this.each(function() {
    Po(this, e);
  });
}
function C1(e, t) {
  var n, i;
  return function() {
    var r = pn(this, e), o = r.tween;
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
function k1(e, t, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = pn(this, e), l = o.tween;
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
function E1(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = ln(this.node(), n).tween, r = 0, o = i.length, l; r < o; ++r)
      if ((l = i[r]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? C1 : k1)(n, e, t));
}
function Oa(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var r = pn(this, i);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return ln(r, i).value[t];
  };
}
function mh(e, t) {
  var n;
  return (typeof t == "number" ? Un : t instanceof Tr ? dc : (n = Tr(t)) ? (t = n, dc) : s1)(e, t);
}
function V1(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function L1(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function I1(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttribute(e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function P1(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function T1(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function M1(e, t, n) {
  var i, r, o;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s)));
  };
}
function A1(e, t) {
  var n = Cl(e), i = n === "transform" ? f1 : mh;
  return this.attrTween(e, typeof t == "function" ? (n.local ? M1 : T1)(n, i, Oa(this, "attr." + e, t)) : t == null ? (n.local ? L1 : V1)(n) : (n.local ? P1 : I1)(n, i, t));
}
function $1(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function N1(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function R1(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && N1(e, o)), n;
  }
  return r._value = t, r;
}
function O1(e, t) {
  var n, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && $1(e, o)), n;
  }
  return r._value = t, r;
}
function B1(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = Cl(e);
  return this.tween(n, (i.local ? R1 : O1)(i, t));
}
function F1(e, t) {
  return function() {
    Ra(this, e).delay = +t.apply(this, arguments);
  };
}
function D1(e, t) {
  return t = +t, function() {
    Ra(this, e).delay = t;
  };
}
function H1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? F1 : D1)(t, e)) : ln(this.node(), t).delay;
}
function j1(e, t) {
  return function() {
    pn(this, e).duration = +t.apply(this, arguments);
  };
}
function z1(e, t) {
  return t = +t, function() {
    pn(this, e).duration = t;
  };
}
function G1(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? j1 : z1)(t, e)) : ln(this.node(), t).duration;
}
function U1(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    pn(this, e).ease = t;
  };
}
function W1(e) {
  var t = this._id;
  return arguments.length ? this.each(U1(t, e)) : ln(this.node(), t).ease;
}
function q1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    pn(this, e).ease = n;
  };
}
function Y1(e) {
  if (typeof e != "function") throw new Error();
  return this.each(q1(this._id, e));
}
function K1(e) {
  typeof e != "function" && (e = qd(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = t[r], l = o.length, s = i[r] = [], a, u = 0; u < l; ++u)
      (a = o[u]) && e.call(a, a.__data__, u, o) && s.push(a);
  return new Pn(i, this._parents, this._name, this._id);
}
function X1(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, r = n.length, o = Math.min(i, r), l = new Array(i), s = 0; s < o; ++s)
    for (var a = t[s], u = n[s], c = a.length, f = l[s] = new Array(c), d, h = 0; h < c; ++h)
      (d = a[h] || u[h]) && (f[h] = d);
  for (; s < i; ++s)
    l[s] = t[s];
  return new Pn(l, this._parents, this._name, this._id);
}
function Z1(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function J1(e, t, n) {
  var i, r, o = Z1(t) ? Ra : pn;
  return function() {
    var l = o(this, e), s = l.on;
    s !== i && (r = (i = s).copy()).on(t, n), l.on = r;
  };
}
function Q1(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ln(this.node(), n).on.on(e) : this.each(J1(n, e, t));
}
function eb(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function tb() {
  return this.on("end.remove", eb(this._id));
}
function nb(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ta(e));
  for (var i = this._groups, r = i.length, o = new Array(r), l = 0; l < r; ++l)
    for (var s = i[l], a = s.length, u = o[l] = new Array(a), c, f, d = 0; d < a; ++d)
      (c = s[d]) && (f = e.call(c, c.__data__, d, s)) && ("__data__" in c && (f.__data__ = c.__data__), u[d] = f, El(u[d], t, n, d, u, ln(c, n)));
  return new Pn(o, this._parents, t, n);
}
function ib(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Wd(e));
  for (var i = this._groups, r = i.length, o = [], l = [], s = 0; s < r; ++s)
    for (var a = i[s], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var d = e.call(c, c.__data__, f, a), h, v = ln(c, n), m = 0, p = d.length; m < p; ++m)
          (h = d[m]) && El(h, t, n, m, d, v);
        o.push(d), l.push(c);
      }
  return new Pn(o, l, t, n);
}
var rb = Wr.prototype.constructor;
function ob() {
  return new rb(this._groups, this._parents);
}
function lb(e, t) {
  var n, i, r;
  return function() {
    var o = Wi(this, e), l = (this.style.removeProperty(e), Wi(this, e));
    return o === l ? null : o === n && l === i ? r : r = t(n = o, i = l);
  };
}
function gh(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function sb(e, t, n) {
  var i, r = n + "", o;
  return function() {
    var l = Wi(this, e);
    return l === r ? null : l === i ? o : o = t(i = l, n);
  };
}
function ab(e, t, n) {
  var i, r, o;
  return function() {
    var l = Wi(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), Wi(this, e))), l === a ? null : l === i && a === r ? o : (r = a, o = t(i = l, s));
  };
}
function ub(e, t) {
  var n, i, r, o = "style." + t, l = "end." + o, s;
  return function() {
    var a = pn(this, e), u = a.on, c = a.value[o] == null ? s || (s = gh(t)) : void 0;
    (u !== n || r !== c) && (i = (n = u).copy()).on(l, r = c), a.on = i;
  };
}
function cb(e, t, n) {
  var i = (e += "") == "transform" ? c1 : mh;
  return t == null ? this.styleTween(e, lb(e, i)).on("end.style." + e, gh(e)) : typeof t == "function" ? this.styleTween(e, ab(e, i, Oa(this, "style." + e, t))).each(ub(this._id, e)) : this.styleTween(e, sb(e, i, t), n).on("end.style." + e, null);
}
function fb(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function db(e, t, n) {
  var i, r;
  function o() {
    var l = t.apply(this, arguments);
    return l !== r && (i = (r = l) && fb(e, l, n)), i;
  }
  return o._value = t, o;
}
function hb(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, db(e, t, n ?? ""));
}
function vb(e) {
  return function() {
    this.textContent = e;
  };
}
function mb(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function gb(e) {
  return this.tween("text", typeof e == "function" ? mb(Oa(this, "text", e)) : vb(e == null ? "" : e + ""));
}
function yb(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function pb(e) {
  var t, n;
  function i() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && yb(r)), t;
  }
  return i._value = e, i;
}
function bb(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, pb(e));
}
function wb() {
  for (var e = this._name, t = this._id, n = yh(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = ln(a, t);
        El(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Pn(i, this._parents, e, n);
}
function xb() {
  var e, t, n = this, i = n._id, r = n.size();
  return new Promise(function(o, l) {
    var s = { value: l }, a = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var u = pn(this, i), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), r === 0 && o();
  });
}
var _b = 0;
function Pn(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function yh() {
  return ++_b;
}
var _n = Wr.prototype;
Pn.prototype = {
  constructor: Pn,
  select: nb,
  selectAll: ib,
  selectChild: _n.selectChild,
  selectChildren: _n.selectChildren,
  filter: K1,
  merge: X1,
  selection: ob,
  transition: wb,
  call: _n.call,
  nodes: _n.nodes,
  node: _n.node,
  size: _n.size,
  empty: _n.empty,
  each: _n.each,
  on: Q1,
  attr: A1,
  attrTween: B1,
  style: cb,
  styleTween: hb,
  text: gb,
  textTween: bb,
  remove: tb,
  tween: E1,
  delay: H1,
  duration: G1,
  ease: W1,
  easeVarying: Y1,
  end: xb,
  [Symbol.iterator]: _n[Symbol.iterator]
};
function Sb(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Cb = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Sb
};
function kb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Eb(e) {
  var t, n;
  e instanceof Pn ? (t = e._id, e = e._name) : (t = yh(), (n = Cb).time = $a(), e = e == null ? null : e + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var l = i[o], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && El(a, e, t, u, l, n || kb(a, t));
  return new Pn(i, this._parents, e, t);
}
Wr.prototype.interrupt = S1;
Wr.prototype.transition = Eb;
const Bs = Math.PI, Fs = 2 * Bs, ri = 1e-6, Vb = Fs - ri;
function ph(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function Lb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return ph;
  const n = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let r = 1, o = i.length; r < o; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Ib {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? ph : Lb(t);
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
    else if (d > ri) if (!(Math.abs(f * a - u * c) > ri) || !o)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = i - l, v = r - s, m = a * a + u * u, p = h * h + v * v, y = Math.sqrt(m), w = Math.sqrt(d), x = o * Math.tan((Bs - Math.acos((m + d - p) / (2 * y * w))) / 2), b = x / w, _ = x / y;
      Math.abs(b - 1) > ri && this._append`L${t + b * c},${n + b * f}`, this._append`A${o},${o},0,0,${+(f * h > c * v)},${this._x1 = t + _ * a},${this._y1 = n + _ * u}`;
    }
  }
  arc(t, n, i, r, o, l) {
    if (t = +t, n = +n, i = +i, l = !!l, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), a = i * Math.sin(r), u = t + s, c = n + a, f = 1 ^ l, d = l ? r - o : o - r;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > ri || Math.abs(this._y1 - c) > ri) && this._append`L${u},${c}`, i && (d < 0 && (d = d % Fs + Fs), d > Vb ? this._append`A${i},${i},0,1,${f},${t - s},${n - a}A${i},${i},0,1,${f},${this._x1 = u},${this._y1 = c}` : d > ri && this._append`A${i},${i},0,${+(d >= Bs)},${f},${this._x1 = t + i * Math.cos(o)},${this._y1 = n + i * Math.sin(o)}`);
  }
  rect(t, n, i, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function Pb(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return bh(this.cover(t, n), t, n, e);
}
function bh(e, t, n, i) {
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
function Tb(e) {
  var t, n, i = e.length, r, o, l = new Array(i), s = new Array(i), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(r = +this._x.call(null, t = e[n])) || isNaN(o = +this._y.call(null, t)) || (l[n] = r, s[n] = o, r < a && (a = r), r > c && (c = r), o < u && (u = o), o > f && (f = o));
  if (a > c || u > f) return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < i; ++n)
    bh(this, l[n], s[n], e[n]);
  return this;
}
function Mb(e, t) {
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
function Ab() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function $b(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function ft(e, t, n, i, r) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = r;
}
function Nb(e, t, n) {
  var i, r = this._x0, o = this._y0, l, s, a, u, c = this._x1, f = this._y1, d = [], h = this._root, v, m;
  for (h && d.push(new ft(h, r, o, c, f)), n == null ? n = 1 / 0 : (r = e - n, o = t - n, c = e + n, f = t + n, n *= n); v = d.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > f || (a = v.x1) < r || (u = v.y1) < o))
      if (h.length) {
        var p = (l + a) / 2, y = (s + u) / 2;
        d.push(
          new ft(h[3], p, y, a, u),
          new ft(h[2], l, y, p, u),
          new ft(h[1], p, s, a, y),
          new ft(h[0], l, s, p, y)
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
function Rb(e) {
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
function Ob(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Bb() {
  return this._root;
}
function Fb() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Db(e) {
  var t = [], n, i = this._root, r, o, l, s, a;
  for (i && t.push(new ft(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(i = n.node, o = n.x0, l = n.y0, s = n.x1, a = n.y1) && i.length) {
      var u = (o + s) / 2, c = (l + a) / 2;
      (r = i[3]) && t.push(new ft(r, u, c, s, a)), (r = i[2]) && t.push(new ft(r, o, c, u, a)), (r = i[1]) && t.push(new ft(r, u, l, s, c)), (r = i[0]) && t.push(new ft(r, o, l, u, c));
    }
  return this;
}
function Hb(e) {
  var t = [], n = [], i;
  for (this._root && t.push(new ft(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop(); ) {
    var r = i.node;
    if (r.length) {
      var o, l = i.x0, s = i.y0, a = i.x1, u = i.y1, c = (l + a) / 2, f = (s + u) / 2;
      (o = r[0]) && t.push(new ft(o, l, s, c, f)), (o = r[1]) && t.push(new ft(o, c, s, a, f)), (o = r[2]) && t.push(new ft(o, l, f, c, u)), (o = r[3]) && t.push(new ft(o, c, f, a, u));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function jb(e) {
  return e[0];
}
function zb(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Gb(e) {
  return e[1];
}
function Ub(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ba(e, t, n) {
  var i = new Fa(t ?? jb, n ?? Gb, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Fa(e, t, n, i, r, o) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0;
}
function bc(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var gt = Ba.prototype = Fa.prototype;
gt.copy = function() {
  var e = new Fa(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
  if (!t) return e;
  if (!t.length) return e._root = bc(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var r = 0; r < 4; ++r)
      (i = t.source[r]) && (i.length ? n.push({ source: i, target: t.target[r] = new Array(4) }) : t.target[r] = bc(i));
  return e;
};
gt.add = Pb;
gt.addAll = Tb;
gt.cover = Mb;
gt.data = Ab;
gt.extent = $b;
gt.find = Nb;
gt.remove = Rb;
gt.removeAll = Ob;
gt.root = Bb;
gt.size = Fb;
gt.visit = Db;
gt.visitAfter = Hb;
gt.x = zb;
gt.y = Ub;
function ht(e) {
  return function() {
    return e;
  };
}
function Wn(e) {
  return (e() - 0.5) * 1e-6;
}
function Wb(e) {
  return e.x + e.vx;
}
function qb(e) {
  return e.y + e.vy;
}
function Yb(e) {
  var t, n, i, r = 1, o = 1;
  typeof e != "function" && (e = ht(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, f, d, h, v, m, p, y = 0; y < o; ++y)
      for (f = Ba(t, Wb, qb).visitAfter(s), u = 0; u < c; ++u)
        d = t[u], m = n[d.index], p = m * m, h = d.x + d.vx, v = d.y + d.vy, f.visit(w);
    function w(x, b, _, E, S) {
      var I = x.data, $ = x.r, R = m + $;
      if (I) {
        if (I.index > d.index) {
          var H = h - I.x - I.vx, L = v - I.y - I.vy, N = H * H + L * L;
          N < R * R && (H === 0 && (H = Wn(i), N += H * H), L === 0 && (L = Wn(i), N += L * L), N = (R - (N = Math.sqrt(N))) / N * r, d.vx += (H *= N) * (R = ($ *= $) / (p + $)), d.vy += (L *= N) * R, I.vx -= H * (R = 1 - R), I.vy -= L * R);
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
    return arguments.length ? (e = typeof u == "function" ? u : ht(+u), a(), l) : e;
  }, l;
}
function Kb(e) {
  return e.index;
}
function wc(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Xb(e) {
  var t = Kb, n = f, i, r = ht(30), o, l, s, a, u, c = 1;
  e == null && (e = []);
  function f(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function d(p) {
    for (var y = 0, w = e.length; y < c; ++y)
      for (var x = 0, b, _, E, S, I, $, R; x < w; ++x)
        b = e[x], _ = b.source, E = b.target, S = E.x + E.vx - _.x - _.vx || Wn(u), I = E.y + E.vy - _.y - _.vy || Wn(u), $ = Math.sqrt(S * S + I * I), $ = ($ - o[x]) / $ * p * i[x], S *= $, I *= $, E.vx -= S * (R = a[x]), E.vy -= I * R, _.vx += S * (R = 1 - R), _.vy += I * R;
  }
  function h() {
    if (l) {
      var p, y = l.length, w = e.length, x = new Map(l.map((_, E) => [t(_, E, l), _])), b;
      for (p = 0, s = new Array(y); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = wc(x, b.source)), typeof b.target != "object" && (b.target = wc(x, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
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
    return arguments.length ? (n = typeof p == "function" ? p : ht(+p), v(), d) : n;
  }, d.distance = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : ht(+p), m(), d) : r;
  }, d;
}
const Zb = 1664525, Jb = 1013904223, xc = 4294967296;
function Qb() {
  let e = 1;
  return () => (e = (Zb * e + Jb) % xc) / xc;
}
function ew(e) {
  return e.x;
}
function tw(e) {
  return e.y;
}
var nw = 10, iw = Math.PI * (3 - Math.sqrt(5));
function rw(e) {
  var t, n = 1, i = 1e-3, r = 1 - Math.pow(i, 1 / 300), o = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Na(f), u = Ur("tick", "end"), c = Qb();
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
        var w = nw * Math.sqrt(0.5 + m), x = m * iw;
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
function ow() {
  var e, t, n, i, r = ht(-30), o, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, m = e.length, p = Ba(e, ew, tw).visitAfter(f);
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
      return b < s && (y === 0 && (y = Wn(n), b += y * y), w === 0 && (w = Wn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += y * h.value * i / b, t.vy += w * h.value * i / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (y === 0 && (y = Wn(n), b += y * y), w === 0 && (w = Wn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (x = o[h.data.index] * i / b, t.vx += y * x, t.vy += w * x);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : ht(+h), c(), u) : r;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function lw(e) {
  var t = ht(0.1), n, i, r;
  typeof e != "function" && (e = ht(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ht(+s), l(), o) : t;
  }, o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ht(+s), l(), o) : e;
  }, o;
}
function sw(e) {
  var t = ht(0.1), n, i, r;
  typeof e != "function" && (e = ht(e == null ? 0 : +e));
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
    return arguments.length ? (t = typeof s == "function" ? s : ht(+s), l(), o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ht(+s), l(), o) : e;
  }, o;
}
function Li(e) {
  return function() {
    return e;
  };
}
function aw(e) {
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
  }, () => new Ib(t);
}
function uw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function wh(e) {
  this._context = e;
}
wh.prototype = {
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
function cw(e) {
  return new wh(e);
}
function fw(e) {
  return e[0];
}
function dw(e) {
  return e[1];
}
function hw(e, t) {
  var n = Li(!0), i = null, r = cw, o = null, l = aw(s);
  e = typeof e == "function" ? e : e === void 0 ? fw : Li(e), t = typeof t == "function" ? t : t === void 0 ? dw : Li(t);
  function s(a) {
    var u, c = (a = uw(a)).length, f, d = !1, h;
    for (i == null && (o = r(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(f = a[u], u, a)) === d && ((d = !d) ? o.lineStart() : o.lineEnd()), d && o.point(+e(f, u, a), +t(f, u, a));
    if (h) return o = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Li(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Li(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Li(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (r = a, i != null && (o = r(i)), s) : r;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? i = o = null : o = r(i = a), s) : i;
  }, s;
}
const go = (e) => () => e;
function vw(e, {
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
function kn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
kn.prototype = {
  constructor: kn,
  scale: function(e) {
    return e === 1 ? this : new kn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new kn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var xh = new kn(1, 0, 0);
kn.prototype;
function is(e) {
  e.stopImmediatePropagation();
}
function sr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function mw(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function gw() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function _c() {
  return this.__zoom || xh;
}
function yw(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function pw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function bw(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l)
  );
}
function ww() {
  var e = mw, t = gw, n = bw, i = yw, r = pw, o = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = m1, u = Ur("start", "zoom", "end"), c, f, d, h = 500, v = 150, m = 0, p = 10;
  function y(C) {
    C.property("__zoom", _c).on("wheel.zoom", I, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", R).filter(r).on("touchstart.zoom", H).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(C, B, T, j) {
    var M = C.selection ? C.selection() : C;
    M.property("__zoom", _c), C !== M ? _(C, B, T, j) : M.interrupt().each(function() {
      E(this, arguments).event(j).start().zoom(null, typeof B == "function" ? B.apply(this, arguments) : B).end();
    });
  }, y.scaleBy = function(C, B, T, j) {
    y.scaleTo(C, function() {
      var M = this.__zoom.k, F = typeof B == "function" ? B.apply(this, arguments) : B;
      return M * F;
    }, T, j);
  }, y.scaleTo = function(C, B, T, j) {
    y.transform(C, function() {
      var M = t.apply(this, arguments), F = this.__zoom, O = T == null ? b(M) : typeof T == "function" ? T.apply(this, arguments) : T, D = F.invert(O), K = typeof B == "function" ? B.apply(this, arguments) : B;
      return n(x(w(F, K), O, D), M, l);
    }, T, j);
  }, y.translateBy = function(C, B, T, j) {
    y.transform(C, function() {
      return n(this.__zoom.translate(
        typeof B == "function" ? B.apply(this, arguments) : B,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), t.apply(this, arguments), l);
    }, null, j);
  }, y.translateTo = function(C, B, T, j, M) {
    y.transform(C, function() {
      var F = t.apply(this, arguments), O = this.__zoom, D = j == null ? b(F) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(xh.translate(D[0], D[1]).scale(O.k).translate(
        typeof B == "function" ? -B.apply(this, arguments) : -B,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), F, l);
    }, j, M);
  };
  function w(C, B) {
    return B = Math.max(o[0], Math.min(o[1], B)), B === C.k ? C : new kn(B, C.x, C.y);
  }
  function x(C, B, T) {
    var j = B[0] - T[0] * C.k, M = B[1] - T[1] * C.k;
    return j === C.x && M === C.y ? C : new kn(C.k, j, M);
  }
  function b(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function _(C, B, T, j) {
    C.on("start.zoom", function() {
      E(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var M = this, F = arguments, O = E(M, F).event(j), D = t.apply(M, F), K = T == null ? b(D) : typeof T == "function" ? T.apply(M, F) : T, te = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ce = M.__zoom, me = typeof B == "function" ? B.apply(M, F) : B, Q = a(ce.invert(K).concat(te / ce.k), me.invert(K).concat(te / me.k));
      return function(ue) {
        if (ue === 1) ue = me;
        else {
          var Ee = Q(ue), Ze = te / Ee[2];
          ue = new kn(Ze, K[0] - Ee[0] * Ze, K[1] - Ee[1] * Ze);
        }
        O.zoom(null, ue);
      };
    });
  }
  function E(C, B, T) {
    return !T && C.__zooming || new S(C, B);
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
      var B = ct(this.that).datum();
      u.call(
        C,
        this.that,
        new vw(C, {
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
    var T = E(this, B).event(C), j = this.__zoom, M = Math.max(o[0], Math.min(o[1], j.k * Math.pow(2, i.apply(this, arguments)))), F = Nt(C);
    if (T.wheel)
      (T.mouse[0][0] !== F[0] || T.mouse[0][1] !== F[1]) && (T.mouse[1] = j.invert(T.mouse[0] = F)), clearTimeout(T.wheel);
    else {
      if (j.k === M) return;
      T.mouse = [F, j.invert(F)], Po(this), T.start();
    }
    sr(C), T.wheel = setTimeout(O, v), T.zoom("mouse", n(x(w(j, M), T.mouse[0], T.mouse[1]), T.extent, l));
    function O() {
      T.wheel = null, T.end();
    }
  }
  function $(C, ...B) {
    if (d || !e.apply(this, arguments)) return;
    var T = C.currentTarget, j = E(this, B, !0).event(C), M = ct(C.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", te, !0), F = Nt(C, T), O = C.clientX, D = C.clientY;
    rh(C.view), is(C), j.mouse = [F, this.__zoom.invert(F)], Po(this), j.start();
    function K(ce) {
      if (sr(ce), !j.moved) {
        var me = ce.clientX - O, Q = ce.clientY - D;
        j.moved = me * me + Q * Q > m;
      }
      j.event(ce).zoom("mouse", n(x(j.that.__zoom, j.mouse[0] = Nt(ce, T), j.mouse[1]), j.extent, l));
    }
    function te(ce) {
      M.on("mousemove.zoom mouseup.zoom", null), oh(ce.view, j.moved), sr(ce), j.event(ce).end();
    }
  }
  function R(C, ...B) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, j = Nt(C.changedTouches ? C.changedTouches[0] : C, this), M = T.invert(j), F = T.k * (C.shiftKey ? 0.5 : 2), O = n(x(w(T, F), j, M), t.apply(this, B), l);
      sr(C), s > 0 ? ct(this).transition().duration(s).call(_, O, j, C) : ct(this).call(y.transform, O, j, C);
    }
  }
  function H(C, ...B) {
    if (e.apply(this, arguments)) {
      var T = C.touches, j = T.length, M = E(this, B, C.changedTouches.length === j).event(C), F, O, D, K;
      for (is(C), O = 0; O < j; ++O)
        D = T[O], K = Nt(D, this), K = [K, this.__zoom.invert(K), D.identifier], M.touch0 ? !M.touch1 && M.touch0[2] !== K[2] && (M.touch1 = K, M.taps = 0) : (M.touch0 = K, F = !0, M.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (M.taps < 2 && (f = K[0], c = setTimeout(function() {
        c = null;
      }, h)), Po(this), M.start());
    }
  }
  function L(C, ...B) {
    if (this.__zooming) {
      var T = E(this, B).event(C), j = C.changedTouches, M = j.length, F, O, D, K;
      for (sr(C), F = 0; F < M; ++F)
        O = j[F], D = Nt(O, this), T.touch0 && T.touch0[2] === O.identifier ? T.touch0[0] = D : T.touch1 && T.touch1[2] === O.identifier && (T.touch1[0] = D);
      if (O = T.that.__zoom, T.touch1) {
        var te = T.touch0[0], ce = T.touch0[1], me = T.touch1[0], Q = T.touch1[1], ue = (ue = me[0] - te[0]) * ue + (ue = me[1] - te[1]) * ue, Ee = (Ee = Q[0] - ce[0]) * Ee + (Ee = Q[1] - ce[1]) * Ee;
        O = w(O, Math.sqrt(ue / Ee)), D = [(te[0] + me[0]) / 2, (te[1] + me[1]) / 2], K = [(ce[0] + Q[0]) / 2, (ce[1] + Q[1]) / 2];
      } else if (T.touch0) D = T.touch0[0], K = T.touch0[1];
      else return;
      T.zoom("touch", n(x(O, D, K), T.extent, l));
    }
  }
  function N(C, ...B) {
    if (this.__zooming) {
      var T = E(this, B).event(C), j = C.changedTouches, M = j.length, F, O;
      for (is(C), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), F = 0; F < M; ++F)
        O = j[F], T.touch0 && T.touch0[2] === O.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === O.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (O = Nt(O, this), Math.hypot(f[0] - O[0], f[1] - O[1]) < p)) {
        var D = ct(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : go(+C), y) : i;
  }, y.filter = function(C) {
    return arguments.length ? (e = typeof C == "function" ? C : go(!!C), y) : e;
  }, y.touchable = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : go(!!C), y) : r;
  }, y.extent = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : go([[+C[0][0], +C[0][1]], [+C[1][0], +C[1][1]]]), y) : t;
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
class _h {
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
var Ct = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(Ct || {});
class xw {
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
class Sc {
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
    const l = new _h(
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
    const a = new xw(l, s, void 0, i, r);
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
function _w(e, t) {
  let n = ww().filter((i) => {
    var r;
    return i.button === 0 || ((r = i.touches) == null ? void 0 : r.length) >= 2;
  });
  return Sw(n, e, t);
}
function Sw(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (i) => t(i, !0)) : e.scaleExtent([1, 1]).on("zoom", (i) => t(i, !1));
}
function Cw(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function kw(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function Ew(e, t, n) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function Vw(e, t, n) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(i);
}
function rs(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function ar(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function Lw(e, t, n) {
  const i = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(i);
}
function si(e) {
  e.preventDefault(), e.stopPropagation();
}
function Iw(e, t, n, i) {
  return zp().filter((r) => r.button === 2).on("start", (r, o) => {
    si(r.sourceEvent), r.active === 0 && e.alphaTarget(0.5).restart(), o.fx = o.x, o.fy = o.y;
  }).on("drag", (r, o) => {
    o.fx = Math.max(i, Math.min(t - i, r.x)), o.fy = Math.max(i, Math.min(n - i, r.y));
  }).on("end", (r, o) => {
    r.active === 0 && e.alphaTarget(0), o.fx = void 0, o.fy = void 0;
  });
}
function Pw(e, t, n, i, r) {
  const o = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => i(l)).on("contextmenu", (l) => si(l)).on("dblclick", (l) => r(l)).call(t).on("dblclick.zoom", null).append("g");
  return o.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), o;
}
function Tw(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function Mw(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function Ar(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function Aw(e, t, n) {
  if (wr(e, t, "link-arrow", "arrow", !1), wr(e, t, "link-arrow-reverse", "arrow", !0), wr(e, t, "draggable-link-arrow", "arrow draggable", !1), n)
    for (let i of n)
      Ds(e, t, i);
}
function Ds(e, t, n) {
  e.select("#link-arrow-" + Ar(n)).empty() && (wr(e, t, "link-arrow-" + n, "arrow " + n, !1, n), wr(
    e,
    t,
    "link-arrow-reverse-" + n,
    "arrow colored",
    !0,
    n
  ));
}
function os(e, t) {
  e.select("#link-arrow-" + Ar(t)).select(function() {
    return this.parentNode;
  }).remove(), e.select("#link-arrow-reverse-" + Ar(t)).select(function() {
    return this.parentNode;
  }).remove();
}
function wr(e, t, n, i, r, o) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", r ? "auto-start-reverse" : "auto").classed(i, !0).append("path").attr("d", `${hw()(t.arrowPoints)}`).style("fill", o || "");
}
function $w(e) {
  return e.append("path").classed("link draggable hidden", !0).attr("d", "M0,0L0,0");
}
function Nw(e, t, n, i, r) {
  let o = rw(e.nodes).on("tick", () => r()).force(
    "collision",
    Yb().radius(t.nodeRadius)
    //stop overlapping
  );
  return o = Rw(e, o, n, i, t), o = Ch(o, e, t, t.fixedLinkDistanceEnabled), o = Sh(o, t.nodePhysicsEnabled, n, i), o;
}
function Rw(e, t, n, i, r) {
  return t.force("bounds", () => {
    for (const o of e.nodes)
      o.x = Math.max(r.nodeRadius, Math.min(n - r.nodeRadius, o.x)), o.y = Math.max(r.nodeRadius, Math.min(i - r.nodeRadius, o.y));
  });
}
function Sh(e, t, n, i) {
  return t ? e.force("charge", ow().strength(-500)).force("x", lw(n / 2).strength(0.05)).force("y", sw(i / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function Ch(e, t, n, i) {
  return i ? e.force(
    "link",
    Xb().links(t.links).id((r) => r.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
class Ow {
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
const Bw = Object.prototype.toString;
function Xo(e) {
  const t = Bw.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function Fw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Xo(e))
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
function Dw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Xo(e))
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
function Cc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (Xo(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!Xo(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var i = Dw(e), r = Fw(e);
  if (i === r)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = t.min, l = o === void 0 ? t.autoMinMax ? i : 0 : o, s = t.max, a = s === void 0 ? t.autoMinMax ? r : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (r - i), c = 0; c < e.length; c++)
    n[c] = (e[c] - i) * u + l;
  return n;
}
const yo = " ".repeat(2), kh = " ".repeat(4);
function Hw() {
  return Eh(this);
}
function Eh(e, t = {}) {
  const { maxRows: n = 15, maxColumns: i = 10, maxNumSize: r = 8 } = t;
  return `${e.constructor.name} {
${yo}[
${kh}${jw(e, n, i, r)}
${yo}]
${yo}rows: ${e.rows}
${yo}columns: ${e.columns}
}`;
}
function jw(e, t, n, i) {
  const { rows: r, columns: o } = e, l = Math.min(r, t), s = Math.min(o, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let f = 0; f < s; f++)
      c.push(zw(e.get(u, f), i));
    a.push(`${c.join(" ")}`);
  }
  return s !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), l !== r && a.push(`... ${r - t} more rows`), a.join(`
${kh}`);
}
function zw(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const i = e.toPrecision(t - 2);
  if (i.length <= t)
    return i;
  const r = e.toExponential(t - 2), o = r.indexOf("e"), l = r.slice(o);
  return r.slice(0, t - l.length) + l;
}
function Gw(e, t) {
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
function Wt(e, t, n) {
  let i = n ? e.rows : e.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function qt(e, t, n) {
  let i = n ? e.columns : e.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function Mi(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function Ai(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Uw(e, t, n) {
  return {
    row: Ww(e, t),
    column: qw(e, n)
  };
}
function Ww(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((i) => i < 0 || i >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function qw(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((i) => i < 0 || i >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function kc(e, t, n, i, r) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (po("startRow", t), po("endRow", n), po("startColumn", i), po("endColumn", r), t > n || i > r || t < 0 || t >= e.rows || n < 0 || n >= e.rows || i < 0 || i >= e.columns || r < 0 || r >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Vl(e, t = 0) {
  let n = [];
  for (let i = 0; i < e; i++)
    n.push(t);
  return n;
}
function po(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Ii(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function Yw(e) {
  let t = Vl(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] += e.get(n, i);
  return t;
}
function Kw(e) {
  let t = Vl(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] += e.get(n, i);
  return t;
}
function Xw(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t += e.get(n, i);
  return t;
}
function Zw(e) {
  let t = Vl(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[n] *= e.get(n, i);
  return t;
}
function Jw(e) {
  let t = Vl(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let i = 0; i < e.columns; ++i)
      t[i] *= e.get(n, i);
  return t;
}
function Qw(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      t *= e.get(n, i);
  return t;
}
function ex(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < i; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / r) / (r - 1)) : o.push((a - s * s / r) / r);
  }
  return o;
}
function tx(e, t, n) {
  const i = e.rows, r = e.columns, o = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? o.push((a - s * s / i) / (i - 1)) : o.push((a - s * s / i) / i);
  }
  return o;
}
function nx(e, t, n) {
  const i = e.rows, r = e.columns, o = i * r;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < i; u++)
    for (let c = 0; c < r; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / o) / (o - 1) : (s - l * l / o) / o;
}
function ix(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[n]);
}
function rx(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t[i]);
}
function ox(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) - t);
}
function lx(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let i = 0;
    for (let r = 0; r < e.columns; r++)
      i += Math.pow(e.get(n, r), 2) / (e.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function sx(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[n]);
}
function ax(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let i = 0;
    for (let r = 0; r < e.rows; r++)
      i += Math.pow(e.get(r, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function ux(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let i = 0; i < e.columns; i++)
      e.set(n, i, e.get(n, i) / t[i]);
}
function cx(e) {
  const t = e.size - 1;
  let n = 0;
  for (let i = 0; i < e.columns; i++)
    for (let r = 0; r < e.rows; r++)
      n += Math.pow(e.get(r, i), 2) / t;
  return Math.sqrt(n);
}
function fx(e, t) {
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
    Wt(this, t);
    let n = [];
    for (let i = 0; i < this.columns; i++)
      n.push(this.get(t, i));
    return n;
  }
  getRowVector(t) {
    return ke.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Wt(this, t), n = Mi(this, n);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, n[i]);
    return this;
  }
  swapRows(t, n) {
    Wt(this, t), Wt(this, n);
    for (let i = 0; i < this.columns; i++) {
      let r = this.get(t, i);
      this.set(t, i, this.get(n, i)), this.set(n, i, r);
    }
    return this;
  }
  getColumn(t) {
    qt(this, t);
    let n = [];
    for (let i = 0; i < this.rows; i++)
      n.push(this.get(i, t));
    return n;
  }
  getColumnVector(t) {
    return ke.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    qt(this, t), n = Ai(this, n);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, n[i]);
    return this;
  }
  swapColumns(t, n) {
    qt(this, t), qt(this, n);
    for (let i = 0; i < this.rows; i++) {
      let r = this.get(i, t);
      this.set(i, t, this.get(i, n)), this.set(i, n, r);
    }
    return this;
  }
  addRowVector(t) {
    t = Mi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = Mi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = Mi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = Mi(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = Ai(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = Ai(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = Ai(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = Ai(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let i = 0; i < this.columns; i++)
        this.set(n, i, this.get(n, i) / t[n]);
    return this;
  }
  mulRow(t, n) {
    Wt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * n);
    return this;
  }
  mulColumn(t, n) {
    qt(this, t);
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
    Ii(this);
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
    Ii(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let r = 0; r < this.columns; r++)
        this.get(i, r) < t && (t = this.get(i, r), n[0] = i, n[1] = r);
    return n;
  }
  maxRow(t) {
    if (Wt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i));
    return n;
  }
  maxRowIndex(t) {
    Wt(this, t), Ii(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  minRow(t) {
    if (Wt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i));
    return n;
  }
  minRowIndex(t) {
    Wt(this, t), Ii(this);
    let n = this.get(t, 0), i = [t, 0];
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r), i[1] = r);
    return i;
  }
  maxColumn(t) {
    if (qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t));
    return n;
  }
  maxColumnIndex(t) {
    qt(this, t), Ii(this);
    let n = this.get(0, t), i = [0, t];
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t), i[0] = r);
    return i;
  }
  minColumn(t) {
    if (qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t));
    return n;
  }
  minColumnIndex(t) {
    qt(this, t), Ii(this);
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
    const i = this.get(0, 0), r = t.get(0, 0), o = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), f = (i + u) * (r + c), d = (s + u) * r, h = i * (l - c), v = u * (a - r), m = (i + o) * c, p = (s - i) * (r + l), y = (o - u) * (a + c), w = f + v - m + y, x = h + m, b = d + v, _ = f - d + h + p;
    return n.set(0, 0, w), n.set(0, 1, x), n.set(1, 0, b), n.set(1, 1, _), n;
  }
  strassen3x3(t) {
    t = ke.checkMatrix(t);
    let n = new ke(3, 3);
    const i = this.get(0, 0), r = this.get(0, 1), o = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), d = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), m = t.get(1, 0), p = t.get(1, 1), y = t.get(1, 2), w = t.get(2, 0), x = t.get(2, 1), b = t.get(2, 2), _ = (i + r + o - l - s - c - f) * p, E = (i - l) * (-h + p), S = s * (-d + h + m - p - y - w + b), I = (-i + l + s) * (d - h + p), $ = (l + s) * (-d + h), R = i * d, H = (-i + u + c) * (d - v + y), L = (-i + u) * (v - y), N = (u + c) * (-d + v), C = (i + r + o - s - a - u - c) * y, B = c * (-d + v + m - p - y - w + x), T = (-o + c + f) * (p + w - x), j = (o - f) * (p - x), M = o * w, F = (c + f) * (-w + x), O = (-o + s + a) * (y + w - b), D = (o - a) * (y - b), K = (s + a) * (-w + b), te = r * m, ce = a * x, me = l * v, Q = u * h, ue = f * b, Ee = R + M + te, Ze = _ + I + $ + R + T + M + F, st = R + H + N + C + M + O + K, Ut = E + S + I + R + M + O + D, cn = E + I + $ + R + ce, V = M + O + D + K + me, P = R + H + L + B + T + j + M, z = T + j + M + F + Q, q = R + H + L + N + ue;
    return n.set(0, 0, Ee), n.set(0, 1, Ze), n.set(0, 2, st), n.set(1, 0, Ut), n.set(1, 1, cn), n.set(1, 2, V), n.set(2, 0, P), n.set(2, 1, z), n.set(2, 2, q), n;
  }
  mmulStrassen(t) {
    t = ke.checkMatrix(t);
    let n = this.clone(), i = n.rows, r = n.columns, o = t.rows, l = t.columns;
    r !== o && console.warn(
      `Multiplying ${i} x ${r} and ${o} x ${l} matrix: dimensions do not match.`
    );
    function s(f, d, h) {
      let v = f.rows, m = f.columns;
      if (v === d && m === h)
        return f;
      {
        let p = Pe.zeros(d, h);
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
        Pe.add(y, S),
        Pe.add(w, I),
        m,
        p
      ), R = c(Pe.add(_, S), w, m, p), H = c(y, Pe.sub(b, I), m, p), L = c(S, Pe.sub(E, w), m, p), N = c(Pe.add(y, x), I, m, p), C = c(
        Pe.sub(_, y),
        Pe.add(w, b),
        m,
        p
      ), B = c(
        Pe.sub(x, S),
        Pe.add(E, I),
        m,
        p
      ), T = Pe.add($, L);
      T.sub(N), T.add(B);
      let j = Pe.add(H, N), M = Pe.add(R, L), F = Pe.sub($, R);
      F.add(H), F.add(C);
      let O = Pe.zeros(2 * T.rows, 2 * T.columns);
      return O = O.setSubMatrix(T, 0, 0), O = O.setSubMatrix(j, T.rows, 0), O = O.setSubMatrix(M, 0, T.columns), O = O.setSubMatrix(F, T.rows, T.columns), O.subMatrix(0, h - 1, 0, v - 1);
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
      l.length > 0 && Cc(l, { min: n, max: i, output: l }), r.setRow(o, l);
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
      l.length && Cc(l, {
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
  sortRows(t = Ec) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = Ec) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, i, r) {
    kc(this, t, n, i, r);
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
    kc(this, n, r, i, o);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, i + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let i = Uw(this, t, n), r = new ke(t.length, n.length);
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
        return Yw(this);
      case "column":
        return Kw(this);
      case void 0:
        return Xw(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return Zw(this);
      case "column":
        return Jw(this);
      case void 0:
        return Qw(this);
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
        return ex(this, i, r);
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("mean must be an array");
        return tx(this, i, r);
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("mean must be a number");
        return nx(this, i, r);
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
        return ix(this, i), this;
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("center must be an array");
        return rx(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return ox(this, i), this;
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
          i = lx(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return sx(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = ax(this);
        else if (!Array.isArray(i))
          throw new TypeError("scale must be an array");
        return ux(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = cx(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return fx(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return Eh(this, t);
  }
}
Pe.prototype.klass = "Matrix";
typeof Symbol < "u" && (Pe.prototype[Symbol.for("nodejs.util.inspect.custom")] = Hw);
function Ec(e, t) {
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
    return Wt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Wt(this, t, !0), n = Float64Array.from(Mi(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    qt(this, t);
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
    typeof n > "u" && (n = t, t = this.columns), qt(this, t, !0), n = Ai(this, n);
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
Gw(Pe, ke);
function ls(e, t, n) {
  const i = t.x - e.x, r = t.y - e.y, o = Math.sqrt(i * i + r * r), l = i / o, s = r / o, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, f = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${f}`;
}
function ss(e, t, n) {
  const i = new ke([[e.x, e.y]]), r = new ke([[t.x, t.y]]), o = ke.subtract(r, i), l = o.norm("frobenius"), s = o.divide(l), a = Vh(10), u = ji(s, -a).multiply(n.nodeRadius - 1).add(i), c = ke.multiply(s, -1), f = ji(c, a).multiply(n.nodeRadius).add(r).add(ji(c, a).multiply(2 * n.markerBoxSize)), d = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${d},${d},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Vc(e, t, n) {
  const i = new ke([[e.x, e.y]]), r = new ke([t]);
  i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
  const o = ke.subtract(i, r), l = o.divide(o.norm("frobenius")), s = Vh(40), a = ji(l, s).multiply(n.nodeRadius - 1).add(i), u = ji(l, -s).multiply(n.nodeRadius).add(i).add(ji(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function Lc(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Vh(e) {
  return e * (Math.PI / 180);
}
function ji(e, t) {
  const n = e.get(0, 0), i = e.get(0, 1);
  return new ke([
    [
      n * Math.cos(t) - i * Math.sin(t),
      n * Math.sin(t) + i * Math.cos(t)
    ]
  ]);
}
function dx(e) {
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
function hx(e) {
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
var vx = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mx(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Lh = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(vx, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (T, j, M, F) => j + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, f, d, h, v = [], m = [], p, y, w = 0, x = 0, b = 0, _ = 0, E = 0, S = 0, I = 0, $ = 0, R = 0, H = 0, L = 0, N = 0, C = 0, B = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], f = c.substring(0, 1), d = f.toLowerCase(), v = c.replace(f, "").trim().split(" ").filter(function(T) {
          return T !== "";
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
            let T = !1;
            if (N.length > 1) {
              let j = parseInt(N[0]), M = parseInt(N[1]), F;
              N.length > 2 && (F = parseFloat(N.substring(2))), v[y + 3] = j, v.splice(y + 4, 0, M), m.splice(y + 4, 0, "+"), F !== void 0 && v.splice(y + 5, 0, F), T = !0;
            }
            N = v[y + 3], C = T ? v[y + 4] : m[y + 4], !T && C.length > 1 && (v[y + 4] = parseInt(C[0]), v.splice(y + 5, 0, parseFloat(C.substring(1)))), C = v[y + 4], f === "a" ? (b += v[y + 5], _ += v[y + 6]) : (b = v[y + 5], _ = v[y + 6]), B += "A " + R + " " + H + " " + L + " " + N + " " + C + " " + b + " " + _ + " ";
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
})(Lh);
var gx = Lh.exports;
const Ic = /* @__PURE__ */ mx(gx), Oe = typeof window < "u", Da = Oe && "IntersectionObserver" in window, yx = Oe && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Pc = Oe && "EyeDropper" in window;
function Ih(e, t, n) {
  const i = t.length - 1;
  if (i < 0) return e === void 0 ? n : e;
  for (let r = 0; r < i; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[i]] === void 0 ? n : e[t[i]];
}
function Si(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((i) => Si(e[i], t[i]));
}
function Hs(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Ih(e, t.split("."), n));
}
function Cn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Hs(e, t, n);
  if (Array.isArray(t)) return Ih(e, t, n);
  if (typeof t != "function") return n;
  const i = t(e, n);
  return typeof i > "u" ? n : i;
}
function Ha(e) {
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
function Zo(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function $r(e) {
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
}), px = Object.freeze({
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
function Ph(e) {
  return Object.keys(e);
}
function ci(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Th(e, t) {
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
function zt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((i) => delete n[i]), n;
}
const Mh = /^on[^a-z]/, ja = (e) => Mh.test(e), bx = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Qi(e) {
  const [t, n] = Mc(e, [Mh]), i = zt(t, bx), [r, o] = Mc(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(o, i), [r, o];
}
function gn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function wx(e, t) {
  let n = 0;
  const i = function() {
    for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
      o[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...o), Zt(t));
  };
  return i.clear = () => {
    clearTimeout(n);
  }, i.immediate = e, i;
}
function Lt(e) {
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
function xx(e) {
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
function It() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const i = {};
  for (const r in e)
    i[r] = e[r];
  for (const r in t) {
    const o = e[r], l = t[r];
    if (Zo(o) && Zo(l)) {
      i[r] = It(o, l, n);
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
function Ah(e) {
  return e.map((t) => t.type === Le ? Ah(t.children) : t).flat();
}
function mi() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (mi.cache.has(e)) return mi.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return mi.cache.set(e, t), t;
}
mi.cache = /* @__PURE__ */ new Map();
function To(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => To(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => To(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return To(e, t.component.subTree).flat(1);
  }
  return [];
}
function _x(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function za(e) {
  const t = tn({}), n = k(e);
  return yn(() => {
    for (const i in n.value)
      t[i] = n.value[i];
  }, {
    flush: "sync"
  }), xa(t);
}
function Jo(e, t) {
  return e.includes(t);
}
function $h(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Qt = () => [Function, Array];
function Oc(e, t) {
  return t = "on" + Mn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Nh(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function Nr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((i) => `${i}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Rh(e, t, n) {
  let i, r = e.indexOf(document.activeElement);
  const o = t === "next" ? 1 : -1;
  do
    r += o, i = e[r];
  while ((!i || i.offsetParent == null || !((n == null ? void 0 : n(i)) ?? !0)) && r < e.length && r >= 0);
  return i;
}
function Qo(e, t) {
  var i, r, o, l;
  const n = Nr(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((i = n[0]) == null || i.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (o = n.at(-1)) == null || o.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Rh(n, t);
    s ? s.focus() : Qo(e, t === "next" ? "first" : "last");
  }
}
function el(e, t) {
  if (!(Oe && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Oh(e) {
  return e.some((t) => Do(t) ? t.type === Dt ? !1 : t.type !== Le || Oh(t.children) : !0) ? e : null;
}
function Sx(e, t) {
  if (!Oe || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Cx(e, t) {
  const n = e.clientX, i = e.clientY, r = t.getBoundingClientRect(), o = r.left, l = r.top, s = r.right, a = r.bottom;
  return n >= o && n <= s && i >= l && i <= a;
}
const Bh = ["top", "bottom"], kx = ["start", "end", "left", "right"];
function js(e, t) {
  let [n, i] = e.split(" ");
  return i || (i = Jo(Bh, n) ? "start" : Jo(kx, n) ? "top" : "center"), {
    side: Bc(n, t),
    align: Bc(i, t)
  };
}
function Bc(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function as(e) {
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
function us(e) {
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
  return Jo(Bh, e.side) ? "y" : "x";
}
class gi {
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
function Fh(e) {
  return Array.isArray(e) ? new gi({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Ga(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), i = n.transform;
  if (i) {
    let r, o, l, s, a;
    if (i.startsWith("matrix3d("))
      r = i.slice(9, -1).split(/, /), o = +r[0], l = +r[5], s = +r[12], a = +r[13];
    else if (i.startsWith("matrix("))
      r = i.slice(7, -1).split(/, /), o = +r[0], l = +r[3], s = +r[4], a = +r[5];
    else
      return new gi(t);
    const u = n.transformOrigin, c = t.x - s - (1 - o) * parseFloat(u), f = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), d = o ? t.width / o : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new gi({
      x: c,
      y: f,
      width: d,
      height: h
    });
  } else
    return new gi(t);
}
function fi(e, t, n) {
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
const Mo = /* @__PURE__ */ new WeakMap();
function Ex(e, t) {
  Object.keys(t).forEach((n) => {
    if (ja(n)) {
      const i = $h(n), r = Mo.get(e);
      if (t[n] == null)
        r == null || r.forEach((o) => {
          const [l, s] = o;
          l === i && (e.removeEventListener(i, s), r.delete(o));
        });
      else if (!r || ![...r].some((o) => o[0] === i && o[1] === t[n])) {
        e.addEventListener(i, t[n]);
        const o = r || /* @__PURE__ */ new Set();
        o.add([i, t[n]]), Mo.has(e) || Mo.set(e, o);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Vx(e, t) {
  Object.keys(t).forEach((n) => {
    if (ja(n)) {
      const i = $h(n), r = Mo.get(e);
      r == null || r.forEach((o) => {
        const [l, s] = o;
        l === i && (e.removeEventListener(i, s), r.delete(o));
      });
    } else
      e.removeAttribute(n);
  });
}
const Pi = 2.4, jc = 0.2126729, zc = 0.7151522, Gc = 0.072175, Lx = 0.55, Ix = 0.58, Px = 0.57, Tx = 0.62, bo = 0.03, Uc = 1.45, Mx = 5e-4, Ax = 1.25, $x = 1.25, Wc = 0.078, qc = 12.82051282051282, wo = 0.06, Yc = 1e-3;
function Kc(e, t) {
  const n = (e.r / 255) ** Pi, i = (e.g / 255) ** Pi, r = (e.b / 255) ** Pi, o = (t.r / 255) ** Pi, l = (t.g / 255) ** Pi, s = (t.b / 255) ** Pi;
  let a = n * jc + i * zc + r * Gc, u = o * jc + l * zc + s * Gc;
  if (a <= bo && (a += (bo - a) ** Uc), u <= bo && (u += (bo - u) ** Uc), Math.abs(u - a) < Mx) return 0;
  let c;
  if (u > a) {
    const f = (u ** Lx - a ** Ix) * Ax;
    c = f < Yc ? 0 : f < Wc ? f - f * qc * wo : f - wo;
  } else {
    const f = (u ** Tx - a ** Px) * $x;
    c = f > -Yc ? 0 : f > -Wc ? f - f * qc * wo : f + wo;
  }
  return c * 100;
}
function Nx(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const tl = 0.20689655172413793, Rx = (e) => e > tl ** 3 ? Math.cbrt(e) : e / (3 * tl ** 2) + 4 / 29, Ox = (e) => e > tl ? e ** 3 : 3 * tl ** 2 * (e - 4 / 29);
function Dh(e) {
  const t = Rx, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Hh(e) {
  const t = Ox, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Bx = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Fx = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Dx = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Hx = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function jh(e) {
  const t = Array(3), n = Fx, i = Bx;
  for (let r = 0; r < 3; ++r)
    t[r] = Math.round(Lt(n(i[r][0] * e[0] + i[r][1] * e[1] + i[r][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function Ua(e) {
  let {
    r: t,
    g: n,
    b: i
  } = e;
  const r = [0, 0, 0], o = Hx, l = Dx;
  t = o(t / 255), n = o(n / 255), i = o(i / 255);
  for (let s = 0; s < 3; ++s)
    r[s] = l[s][0] * t + l[s][1] * n + l[s][2] * i;
  return r;
}
function zs(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function jx(e) {
  return zs(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Xc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, zx = {
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
  hsv: (e, t, n, i) => Tn({
    h: e,
    s: t,
    v: n,
    a: i
  }),
  hsva: (e, t, n, i) => Tn({
    h: e,
    s: t,
    v: n,
    a: i
  })
};
function Bt(e) {
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
    return zx[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), qh(t);
  } else if (typeof e == "object") {
    if (ci(e, ["r", "g", "b"]))
      return e;
    if (ci(e, ["h", "s", "l"]))
      return Tn(Wa(e));
    if (ci(e, ["h", "s", "v"]))
      return Tn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Tn(e) {
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
  return Tn(Wa(e));
}
function Ll(e) {
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
function zh(e) {
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
function Wa(e) {
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
function Gh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return r === void 0 ? `rgb(${t}, ${n}, ${i})` : `rgba(${t}, ${n}, ${i}, ${r})`;
}
function Uh(e) {
  return Gh(Tn(e));
}
function xo(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Wh(e) {
  let {
    r: t,
    g: n,
    b: i,
    a: r
  } = e;
  return `#${[xo(t), xo(n), xo(i), r !== void 0 ? xo(Math.round(r * 255)) : ""].join("")}`;
}
function qh(e) {
  e = Gx(e);
  let [t, n, i, r] = xx(e, 2).map((o) => parseInt(o, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: i,
    a: r
  };
}
function Yh(e) {
  const t = qh(e);
  return Ll(t);
}
function Kh(e) {
  return Wh(Tn(e));
}
function Gx(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = $c($c(e, 6), 8, "F")), e;
}
function Ux(e, t) {
  const n = Dh(Ua(e));
  return n[0] = n[0] + t * 10, jh(Hh(n));
}
function Wx(e, t) {
  const n = Dh(Ua(e));
  return n[0] = n[0] - t * 10, jh(Hh(n));
}
function Gs(e) {
  const t = Bt(e);
  return Ua(t)[1];
}
function qx(e, t) {
  const n = Gs(e), i = Gs(t), r = Math.max(n, i), o = Math.min(n, i);
  return (r + 0.05) / (o + 0.05);
}
function Xh(e) {
  const t = Math.abs(Kc(Bt(0), Bt(e)));
  return Math.abs(Kc(Bt(16777215), Bt(e))) > Math.min(t, 50) ? "#fff" : "#000";
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
const Ce = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Yi = Symbol.for("vuetify:defaults");
function Yx(e) {
  return ee(e);
}
function qa() {
  const e = He(Yi);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function bn(e, t) {
  const n = qa(), i = ee(e), r = k(() => {
    if (Zt(t == null ? void 0 : t.disabled)) return n.value;
    const l = Zt(t == null ? void 0 : t.scoped), s = Zt(t == null ? void 0 : t.reset), a = Zt(t == null ? void 0 : t.root);
    if (i.value == null && !(l || s || a)) return n.value;
    let u = It(i.value, {
      prev: n.value
    });
    if (l) return u;
    if (s || a) {
      const c = Number(s || 1 / 0);
      for (let f = 0; f <= c && !(!u || !("prev" in u)); f++)
        u = u.prev;
      return u && typeof a == "string" && a in u && (u = It(It(u, {
        prev: u
      }), u[a])), u;
    }
    return u.prev ? It(u.prev, u) : u;
  });
  return lt(Yi, r), r;
}
function Kx(e, t) {
  var n, i;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((i = e.props) == null ? void 0 : i[mi(t)]) < "u";
}
function Xx() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : qa();
  const i = it("useDefaults");
  if (t = t ?? i.type.name ?? i.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = k(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), o = new Proxy(e, {
    get(a, u) {
      var f, d, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(f = r.value) == null ? void 0 : f[u], c].filter((m) => m != null) : typeof u == "string" && !Kx(i.vnode, u) ? ((d = r.value) == null ? void 0 : d[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = be();
  yn(() => {
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
    const a = e_(Yi, i);
    lt(Yi, k(() => l.value ? It((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: o,
    provideSubDefaults: s
  };
}
function sn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(i) {
      return Th(i, t);
    }, e.props._as = String, e.setup = function(i, r) {
      const o = qa();
      if (!o.value) return e._setup(i, r);
      const {
        props: l,
        provideSubDefaults: s
      } = Xx(i, i._as ?? e.name, o), a = e._setup(l, r);
      return s(), a;
    };
  }
  return e;
}
function fe() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? sn : Ji)(t);
}
function er(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return fe()({
    name: n ?? Mn(vt(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...Ce()
    },
    setup(i, r) {
      let {
        slots: o
      } = r;
      return () => {
        var l;
        return $n(i.tag, {
          class: [e, i.class],
          style: i.style
        }, (l = o.default) == null ? void 0 : l.call(o));
      };
    }
  });
}
function Zh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Rr = "cubic-bezier(0.4, 0, 0.2, 1)", Zx = "cubic-bezier(0.0, 0, 0.2, 1)", Jx = "cubic-bezier(0.4, 0, 1, 1)";
function it(e, t) {
  const n = xl();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function wn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = it(e).type;
  return mi((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Jh = 0, Ao = /* @__PURE__ */ new WeakMap();
function xt() {
  const e = it("getUid");
  if (Ao.has(e)) return Ao.get(e);
  {
    const t = Jh++;
    return Ao.set(e, t), t;
  }
}
xt.reset = () => {
  Jh = 0, Ao = /* @__PURE__ */ new WeakMap();
};
function Qh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Qx(e) : Ya(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function nl(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Ya(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Ya(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Qx(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function e_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : it("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function t_(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function he(e) {
  const t = it("useRender");
  t.render = e;
}
const Ci = Z({
  border: [Boolean, Number, String]
}, "border");
function ki(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return {
    borderClasses: k(() => {
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
const n_ = [null, "default", "comfortable", "compact"], Gt = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => n_.includes(e)
  }
}, "density");
function an(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return {
    densityClasses: k(() => `${t}--density-${e.density}`)
  };
}
const Nn = Z({
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
function Rn(e) {
  return {
    elevationClasses: k(() => {
      const n = Ue(e) ? e.value : e.elevation, i = [];
      return n == null || i.push(`elevation-${n}`), i;
    })
  };
}
const _t = Z({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function St(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return {
    roundedClasses: k(() => {
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
const qe = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), il = Symbol.for("vuetify:theme"), Xe = Z({
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
function i_() {
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
    n[o] = It(s, l);
  }
  return It(t, {
    ...e,
    themes: n
  });
}
function r_(e) {
  const t = i_(e), n = ee(t.defaultTheme), i = ee(t.themes), r = k(() => {
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
              const y = p === "lighten" ? Ux : Wx;
              for (const w of Ha(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = Wh(y(Bt(m), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const m = `on-${v}`, p = Bt(h.colors[v]);
        h.colors[m] = Xh(p);
      }
    }
    return c;
  }), o = k(() => r.value[n.value]), l = k(() => {
    const c = [];
    o.value.dark && ii(c, ":root", ["color-scheme: dark"]), ii(c, ":root", Qc(o.value));
    for (const [v, m] of Object.entries(r.value))
      ii(c, `.v-theme--${v}`, [`color-scheme: ${m.dark ? "dark" : "normal"}`, ...Qc(m)]);
    const f = [], d = [], h = new Set(Object.values(r.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? ii(d, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (ii(f, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), ii(d, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), ii(d, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
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
        Oe && we(l, () => {
          h.patch(s);
        });
      } else
        Oe ? (f.addHeadObjs(k(s)), yn(() => f.updateDOM())) : f.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const m = document.createElement("style");
          m.type = "text/css", m.id = "vuetify-theme-stylesheet", t.cspNonce && m.setAttribute("nonce", t.cspNonce), h = m, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var d = v;
      let h = Oe ? document.getElementById("vuetify-theme-stylesheet") : null;
      Oe ? we(l, v, {
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
function tt(e) {
  it("provideTheme");
  const t = He(il, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = k(() => e.theme ?? t.name.value), i = k(() => t.themes.value[n.value]), r = k(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), o = {
    ...t,
    name: n,
    current: i,
    themeClasses: r
  };
  return lt(il, o), o;
}
function ii(e, t, n) {
  e.push(`${t} {
`, ...n.map((i) => `  ${i};
`), `}
`);
}
function Qc(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, i = [];
  for (const [r, o] of Object.entries(e.colors)) {
    const l = Bt(o);
    i.push(`--v-theme-${r}: ${l.r},${l.g},${l.b}`), r.startsWith("on-") || i.push(`--v-theme-${r}-overlay-multiplier: ${Gs(o) > 0.18 ? t : n}`);
  }
  for (const [r, o] of Object.entries(e.variables)) {
    const l = typeof o == "string" && o.startsWith("#") ? Bt(o) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    i.push(`--v-${r}: ${s ?? o}`);
  }
  return i;
}
function Ka(e) {
  return za(() => {
    const t = [], n = {};
    if (e.value.background)
      if (zs(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && jx(e.value.background)) {
          const i = Bt(e.value.background);
          if (i.a == null || i.a === 1) {
            const r = Xh(i);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (zs(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function en(e, t) {
  const n = k(() => ({
    text: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Ka(n);
  return {
    textColorClasses: i,
    textColorStyles: r
  };
}
function Tt(e, t) {
  const n = k(() => ({
    background: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: i,
    colorStyles: r
  } = Ka(n);
  return {
    backgroundColorClasses: i,
    backgroundColorStyles: r
  };
}
const o_ = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function tr(e, t) {
  return g(Le, null, [e && g("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), g("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const On = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => o_.includes(e)
  }
}, "variant");
function nr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  const n = k(() => {
    const {
      variant: o
    } = Zt(e);
    return `${t}--variant-${o}`;
  }), {
    colorClasses: i,
    colorStyles: r
  } = Ka(k(() => {
    const {
      variant: o,
      color: l
    } = Zt(e);
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
const ev = Z({
  divided: Boolean,
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Nn(),
  ..._t(),
  ...qe(),
  ...Xe(),
  ...On()
}, "VBtnGroup"), ef = fe()({
  name: "VBtnGroup",
  props: ev(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      densityClasses: r
    } = an(e), {
      borderClasses: o
    } = ki(e), {
      elevationClasses: l
    } = Rn(e), {
      roundedClasses: s
    } = St(e);
    bn({
      VBtn: {
        height: "auto",
        color: le(e, "color"),
        density: le(e, "density"),
        flat: !0,
        variant: le(e, "variant")
      }
    }), he(() => g(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, i.value, o.value, r.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function bi(e, t) {
  let n;
  function i() {
    n = ha(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), i();
    }) : t());
  }
  we(e, (r) => {
    r && !n ? i() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), mt(() => {
    n == null || n.stop();
  });
}
function $e(e, t, n) {
  let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const o = it("useProxiedModel"), l = ee(e[t] !== void 0 ? e[t] : n), s = mi(t), u = k(s !== t ? () => {
    var f, d, h, v;
    return e[t], !!(((f = o.vnode.props) != null && f.hasOwnProperty(t) || (d = o.vnode.props) != null && d.hasOwnProperty(s)) && ((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var f, d;
    return e[t], !!((f = o.vnode.props) != null && f.hasOwnProperty(t) && ((d = o.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`)));
  });
  bi(() => !u.value, () => {
    we(() => e[t], (f) => {
      l.value = f;
    });
  });
  const c = k({
    get() {
      const f = e[t];
      return i(u.value ? f : l.value);
    },
    set(f) {
      const d = r(f), h = Se(u.value ? e[t] : l.value);
      h === d || i(h) === f || (l.value = d, o == null || o.emit(`update:${t}`, d));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const Il = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Pl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Tl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const i = it("useGroupItem");
  if (!i)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = xt();
  lt(Symbol.for(`${t.description}:id`), r);
  const o = He(t, null);
  if (!o) {
    if (!n) return o;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = le(e, "value"), s = k(() => !!(o.disabled.value || e.disabled));
  o.register({
    id: r,
    value: l,
    disabled: s
  }, i), on(() => {
    o.unregister(r);
  });
  const a = k(() => o.isSelected(r)), u = k(() => a.value && [o.selectedClass.value, e.selectedClass]);
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
function Yr(e, t) {
  let n = !1;
  const i = tn([]), r = $e(e, "modelValue", [], (d) => d == null ? [] : tv(i, gn(d)), (d) => {
    const h = s_(i, d);
    return e.multiple ? h : h[0];
  }), o = it("useGroup");
  function l(d, h) {
    const v = d, m = Symbol.for(`${t.description}:id`), y = To(m, o == null ? void 0 : o.vnode).indexOf(h);
    Zt(v.value) == null && (v.value = y), y > -1 ? i.splice(y, 0, v) : i.push(v);
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
  rn(() => {
    a();
  }), on(() => {
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
    disabled: le(e, "disabled"),
    prev: () => c(i.length - 1),
    next: () => c(1),
    isSelected: (d) => r.value.includes(d),
    selectedClass: k(() => e.selectedClass),
    items: k(() => i),
    getItemIndex: (d) => l_(i, d)
  };
  return lt(t, f), f;
}
function l_(e, t) {
  const n = tv(e, [t]);
  return n.length ? e.findIndex((i) => i.id === n[0]) : -1;
}
function tv(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.find((l) => Si(i, l.value)), o = e[i];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : o != null && n.push(o.id);
  }), n;
}
function s_(e, t) {
  const n = [];
  return t.forEach((i) => {
    const r = e.findIndex((o) => o.id === i);
    if (~r) {
      const o = e[r];
      n.push(o.value != null ? o.value : r);
    }
  }), n;
}
const nv = Symbol.for("vuetify:v-btn-toggle"), a_ = Z({
  ...ev(),
  ...Il()
}, "VBtnToggle");
fe()({
  name: "VBtnToggle",
  props: a_(),
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
    } = Yr(e, nv);
    return he(() => {
      const a = ef.filterProps(e);
      return g(ef, de({
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
const u_ = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), et = fe(!1)({
  name: "VDefaultsProvider",
  props: u_(),
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
    } = xa(e);
    return bn(i, {
      reset: o,
      root: l,
      scoped: s,
      disabled: r
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), c_ = {
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
}, f_ = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => $n(iv, {
    ...e,
    class: "mdi"
  })
}, Me = [String, Function, Object, Array], Us = Symbol.for("vuetify:icons"), Ml = Z({
  icon: {
    type: Me
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), tf = fe()({
  name: "VComponentIcon",
  props: Ml(),
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
}), Xa = sn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Ml(),
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
sn({
  name: "VLigatureIcon",
  props: Ml(),
  setup(e) {
    return () => g(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const iv = sn({
  name: "VClassIcon",
  props: Ml(),
  setup(e) {
    return () => g(e.tag, {
      class: e.icon
    }, null);
  }
});
function d_() {
  return {
    svg: {
      component: Xa
    },
    class: {
      component: iv
    }
  };
}
function h_(e) {
  const t = d_(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = f_), It({
    defaultSet: n,
    sets: t,
    aliases: {
      ...c_,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const v_ = (e) => {
  const t = He(Us);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: k(() => {
      var a;
      const i = Zt(e);
      if (!i) return {
        component: tf
      };
      let r = i;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (a = t.aliases) == null ? void 0 : a[r.slice(1)])), !r) throw new Error(`Could not find aliased icon "${i}"`);
      if (Array.isArray(r))
        return {
          component: Xa,
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
}, m_ = ["x-small", "small", "default", "large", "x-large"], Kr = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Xr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return za(() => {
    let n, i;
    return Jo(m_, e.size) ? n = `${t}--size-${e.size}` : e.size && (i = {
      width: ge(e.size),
      height: ge(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: i
    };
  });
}
const g_ = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Me,
  ...Ce(),
  ...Kr(),
  ...qe({
    tag: "i"
  }),
  ...Xe()
}, "VIcon"), je = fe()({
  name: "VIcon",
  props: g_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = ee(), {
      themeClasses: o
    } = tt(e), {
      iconData: l
    } = v_(k(() => r.value || e.icon)), {
      sizeClasses: s
    } = Xr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = en(le(e, "color"));
    return he(() => {
      var f, d;
      const c = (f = i.default) == null ? void 0 : f.call(i);
      return c && (r.value = (d = Ah(c).filter((h) => h.type === zr && h.children && typeof h.children == "string")[0]) == null ? void 0 : d.children), g(l.value.component, {
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
function rv(e, t) {
  const n = ee(), i = be(!1);
  if (Da) {
    const r = new IntersectionObserver((o) => {
      i.value = !!o.find((l) => l.isIntersecting);
    }, t);
    on(() => {
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
function Ki(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = ee(), i = ee();
  if (Oe) {
    const r = new ResizeObserver((o) => {
      e == null || e(o, r), o.length && (t === "content" ? i.value = o[0].contentRect : i.value = o[0].target.getBoundingClientRect());
    });
    on(() => {
      r.disconnect();
    }), we(n, (o, l) => {
      l && (r.unobserve($r(l)), i.value = void 0), o && r.observe($r(o));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: jr(i)
  };
}
const y_ = Z({
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
  ...Ce(),
  ...Kr(),
  ...qe({
    tag: "div"
  }),
  ...Xe()
}, "VProgressCircular"), ov = fe()({
  name: "VProgressCircular",
  props: y_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = 20, r = 2 * Math.PI * i, o = ee(), {
      themeClasses: l
    } = tt(e), {
      sizeClasses: s,
      sizeStyles: a
    } = Xr(e), {
      textColorClasses: u,
      textColorStyles: c
    } = en(le(e, "color")), {
      textColorClasses: f,
      textColorStyles: d
    } = en(le(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = rv(), {
      resizeRef: m,
      contentRect: p
    } = Ki(), y = k(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = k(() => Number(e.width)), x = k(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = k(() => i / (1 - w.value / x.value) * 2), _ = k(() => w.value / x.value * b.value), E = k(() => ge((100 - y.value) / 100 * r));
    return yn(() => {
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
}), Zn = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Jn(e) {
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
const p_ = {
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
}, nf = "$vuetify.", rf = (e, t) => e.replace(/\{(\d+)\}/g, (n, i) => String(t[+i])), lv = (e, t, n) => function(i) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
    o[l - 1] = arguments[l];
  if (!i.startsWith(nf))
    return rf(i, o);
  const s = i.replace(nf, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Hs(a, s, null);
  return c || (`${i}${e.value}`, c = Hs(u, s, null)), c || (c = i), typeof c != "string" && (c = i), rf(c, o);
};
function sv(e, t) {
  return (n, i) => new Intl.NumberFormat([e.value, t.value], i).format(n);
}
function cs(e, t, n) {
  const i = $e(e, t, e[t] ?? n.value);
  return i.value = e[t] ?? n.value, we(n, (r) => {
    e[t] == null && (i.value = n.value);
  }), i;
}
function av(e) {
  return (t) => {
    const n = cs(t, "locale", e.current), i = cs(t, "fallback", e.fallback), r = cs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: i,
      messages: r,
      t: lv(n, i, r),
      n: sv(n, i),
      provide: av({
        current: n,
        fallback: i,
        messages: r
      })
    };
  };
}
function b_(e) {
  const t = be((e == null ? void 0 : e.locale) ?? "en"), n = be((e == null ? void 0 : e.fallback) ?? "en"), i = ee({
    en: p_,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: i,
    t: lv(t, n, i),
    n: sv(t, n),
    provide: av({
      current: t,
      fallback: n,
      messages: i
    })
  };
}
const rl = Symbol.for("vuetify:locale");
function w_(e) {
  return e.name != null;
}
function x_(e) {
  const t = e != null && e.adapter && w_(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : b_(e), n = S_(t, e);
  return {
    ...t,
    ...n
  };
}
function Zr() {
  const e = He(rl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function __() {
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
function S_(e, t) {
  const n = ee((t == null ? void 0 : t.rtl) ?? __()), i = k(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: i,
    rtl: n,
    rtlClasses: k(() => `v-locale--is-${i.value ? "rtl" : "ltr"}`)
  };
}
function un() {
  const e = He(rl);
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
}, Jr = Z({
  location: String
}, "location");
function Qr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: i
  } = un();
  return {
    locationStyles: k(() => {
      if (!e.location) return {};
      const {
        side: o,
        align: l
      } = js(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, i.value);
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
const C_ = Z({
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
  ...Ce(),
  ...Jr({
    location: "top"
  }),
  ..._t(),
  ...qe(),
  ...Xe()
}, "VProgressLinear"), uv = fe()({
  name: "VProgressLinear",
  props: C_(),
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
    } = un(), {
      themeClasses: l
    } = tt(e), {
      locationStyles: s
    } = Qr(e), {
      textColorClasses: a,
      textColorStyles: u
    } = en(e, "color"), {
      backgroundColorClasses: c,
      backgroundColorStyles: f
    } = Tt(k(() => e.bgColor || e.color)), {
      backgroundColorClasses: d,
      backgroundColorStyles: h
    } = Tt(e, "color"), {
      roundedClasses: v
    } = St(e), {
      intersectionRef: m,
      isIntersecting: p
    } = rv(), y = k(() => parseInt(e.max, 10)), w = k(() => parseInt(e.height, 10)), x = k(() => parseFloat(e.bufferValue) / y.value * 100), b = k(() => parseFloat(i.value) / y.value * 100), _ = k(() => r.value !== e.reverse), E = k(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), S = k(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
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
      }, null), g(In, {
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
}), Za = Z({
  loading: [Boolean, String]
}, "loader");
function Al(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return {
    loaderClasses: k(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Ja(e, t) {
  var i;
  let {
    slots: n
  } = t;
  return g("div", {
    class: `${e.name}__loader`
  }, [((i = n.default) == null ? void 0 : i.call(n, {
    color: e.color,
    isActive: e.active
  })) || g(uv, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const k_ = ["static", "relative", "fixed", "absolute", "sticky"], $l = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => k_.includes(e)
    )
  }
}, "position");
function Nl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  return {
    positionClasses: k(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function E_() {
  const e = it("useRoute");
  return k(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function V_() {
  var e, t;
  return (t = (e = it("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Rl(e, t) {
  const n = Cg("RouterLink"), i = k(() => !!(e.href || e.to)), r = k(() => (i == null ? void 0 : i.value) || Oc(t, "click") || Oc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: i,
      isClickable: r,
      href: le(e, "href")
    };
  const o = e.to ? n.useLink(e) : void 0, l = E_();
  return {
    isLink: i,
    isClickable: r,
    route: o == null ? void 0 : o.route,
    navigate: o == null ? void 0 : o.navigate,
    isActive: o && k(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = o.isExactActive) == null ? void 0 : u.value) && Si(o.route.value.query, l.value.query) : (a = o.isExactActive) == null ? void 0 : a.value : (s = o.isActive) == null ? void 0 : s.value;
    }),
    href: k(() => e.to ? o == null ? void 0 : o.route.value.href : e.href)
  };
}
const Ol = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let fs = !1;
function L_(e, t) {
  let n = !1, i, r;
  Oe && (Ke(() => {
    window.addEventListener("popstate", o), i = e == null ? void 0 : e.beforeEach((l, s, a) => {
      fs ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), fs = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      fs = !1;
    });
  }), mt(() => {
    window.removeEventListener("popstate", o), i == null || i(), r == null || r();
  }));
  function o(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function I_(e, t) {
  we(() => {
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
const Ws = Symbol("rippleStop"), P_ = 80;
function lf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function qs(e) {
  return e.constructor.name === "TouchEvent";
}
function cv(e) {
  return e.constructor.name === "KeyboardEvent";
}
const T_ = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = 0, r = 0;
  if (!cv(e)) {
    const d = t.getBoundingClientRect(), h = qs(e) ? e.touches[e.touches.length - 1] : e;
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
}, ol = {
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
    } = T_(e, t, n), f = `${o * 2}px`;
    r.className = "v-ripple__animation", r.style.width = f, r.style.height = f, t.appendChild(i);
    const d = window.getComputedStyle(t);
    d && d.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), lf(r, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
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
function fv(e) {
  return typeof e > "u" || !!e;
}
function Or(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Ws])) {
    if (e[Ws] = !0, qs(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || cv(e), n._ripple.class && (t.class = n._ripple.class), qs(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        ol.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var i;
        (i = n == null ? void 0 : n._ripple) != null && i.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, P_);
    } else
      ol.show(e, n, t);
  }
}
function sf(e) {
  e[Ws] = !0;
}
function Vt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Vt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), ol.hide(t);
  }
}
function dv(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Br = !1;
function hv(e) {
  !Br && (e.keyCode === Tc.enter || e.keyCode === Tc.space) && (Br = !0, Or(e));
}
function vv(e) {
  Br = !1, Vt(e);
}
function mv(e) {
  Br && (Br = !1, Vt(e));
}
function gv(e, t, n) {
  const {
    value: i,
    modifiers: r
  } = t, o = fv(i);
  if (o || ol.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = o, e._ripple.centered = r.center, e._ripple.circle = r.circle, Zo(i) && i.class && (e._ripple.class = i.class), o && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", sf, {
        passive: !0
      }), e.addEventListener("mousedown", sf);
      return;
    }
    e.addEventListener("touchstart", Or, {
      passive: !0
    }), e.addEventListener("touchend", Vt, {
      passive: !0
    }), e.addEventListener("touchmove", dv, {
      passive: !0
    }), e.addEventListener("touchcancel", Vt), e.addEventListener("mousedown", Or), e.addEventListener("mouseup", Vt), e.addEventListener("mouseleave", Vt), e.addEventListener("keydown", hv), e.addEventListener("keyup", vv), e.addEventListener("blur", mv), e.addEventListener("dragstart", Vt, {
      passive: !0
    });
  } else !o && n && yv(e);
}
function yv(e) {
  e.removeEventListener("mousedown", Or), e.removeEventListener("touchstart", Or), e.removeEventListener("touchend", Vt), e.removeEventListener("touchmove", dv), e.removeEventListener("touchcancel", Vt), e.removeEventListener("mouseup", Vt), e.removeEventListener("mouseleave", Vt), e.removeEventListener("keydown", hv), e.removeEventListener("keyup", vv), e.removeEventListener("dragstart", Vt), e.removeEventListener("blur", mv);
}
function M_(e, t) {
  gv(e, t, !1);
}
function A_(e) {
  delete e._ripple, yv(e);
}
function $_(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = fv(t.oldValue);
  gv(e, t, n);
}
const Ei = {
  mounted: M_,
  unmounted: A_,
  updated: $_
}, pv = Z({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: nv
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
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Zn(),
  ...Nn(),
  ...Pl(),
  ...Za(),
  ...Jr(),
  ...$l(),
  ..._t(),
  ...Ol(),
  ...Kr(),
  ...qe({
    tag: "button"
  }),
  ...Xe(),
  ...On({
    variant: "elevated"
  })
}, "VBtn"), ot = fe()({
  name: "VBtn",
  directives: {
    Ripple: Ei
  },
  props: pv(),
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
    } = ki(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = nr(e), {
      densityClasses: u
    } = an(e), {
      dimensionStyles: c
    } = Jn(e), {
      elevationClasses: f
    } = Rn(e), {
      loaderClasses: d
    } = Al(e), {
      locationStyles: h
    } = Qr(e), {
      positionClasses: v
    } = Nl(e), {
      roundedClasses: m
    } = St(e), {
      sizeClasses: p,
      sizeStyles: y
    } = Xr(e), w = Tl(e, e.symbol, !1), x = Rl(e, n), b = k(() => {
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
    return I_(x, w == null ? void 0 : w.select), he(() => {
      var C, B;
      const $ = x.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || i.prepend), H = !!(e.appendIcon || i.append), L = !!(e.icon && e.icon !== !0), N = (w == null ? void 0 : w.isSelected.value) && (!x.isLink.value || ((C = x.isActive) == null ? void 0 : C.value)) || !w || ((B = x.isActive) == null ? void 0 : B.value);
      return We(g($, {
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
          var T;
          return [tr(!0, "v-btn"), !e.icon && R && g("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [i.prepend ? g(et, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, i.prepend) : g(je, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), g("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!i.default && L ? g(je, {
            key: "content-icon",
            icon: e.icon
          }, null) : g(et, {
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
          })]), !e.icon && H && g("span", {
            key: "append",
            class: "v-btn__append"
          }, [i.append ? g(et, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, i.append) : g(je, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && g("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((T = i.loader) == null ? void 0 : T.call(i)) ?? g(ov, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[nn("ripple"), !_.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Bl = fe()({
  name: "VCardActions",
  props: Ce(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return bn({
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
}), vr = er("v-card-subtitle"), Fr = er("v-card-title");
function N_(e) {
  return {
    aspectStyles: k(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const bv = Z({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...Ce(),
  ...Zn()
}, "VResponsive"), af = fe()({
  name: "VResponsive",
  props: bv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: i
    } = N_(e), {
      dimensionStyles: r
    } = Jn(e);
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
}), eo = Z({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), En = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: i,
    disabled: r,
    group: o,
    ...l
  } = e, {
    component: s = o ? zd : In,
    ...a
  } = typeof i == "object" ? i : {};
  return $n(s, de(typeof i == "string" ? {
    name: r ? "" : i
  } : a, typeof i == "string" ? {} : {
    disabled: r,
    group: o
  }, l), n);
};
function R_(e, t) {
  if (!Da) return;
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
    r && (!n.quiet || u.init) && (!n.once || c || u.init) && r(c, s, a), c && n.once ? wv(e, t) : u.init = !0;
  }, o);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function wv(e, t) {
  var i;
  const n = (i = e._observe) == null ? void 0 : i[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const xv = {
  mounted: R_,
  unmounted: wv
}, O_ = Z({
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
  ...bv(),
  ...Ce(),
  ..._t(),
  ...eo()
}, "VImg"), _v = fe()({
  name: "VImg",
  directives: {
    intersect: xv
  },
  props: O_(),
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
    } = Tt(le(e, "color")), {
      roundedClasses: l
    } = St(e), s = it("VImg"), a = be(""), u = ee(), c = be(e.eager ? "loading" : "idle"), f = be(), d = be(), h = k(() => e.src && typeof e.src == "object" ? {
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
    we(() => e.src, () => {
      m(c.value !== "idle");
    }), we(v, (L, N) => {
      !L && N && u.value && b(u.value);
    }), pl(() => m());
    function m(L) {
      if (!(e.eager && L) && !(Da && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const N = new Image();
          N.src = h.value.lazySrc, b(N, null);
        }
        h.value.src && Ke(() => {
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
    on(() => {
      clearTimeout(x);
    });
    function b(L) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const C = () => {
        if (clearTimeout(x), s.isUnmounted) return;
        const {
          naturalHeight: B,
          naturalWidth: T
        } = L;
        B || T ? (f.value = T, d.value = B) : !L.complete && c.value === "loading" && N != null ? x = window.setTimeout(C, N) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, d.value = 1);
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
      return g(En, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [We(N ? g("picture", {
          class: "v-img__picture"
        }, [N, L]) : L, [[Ht, c.value === "loaded"]])]
      });
    }, S = () => g(En, {
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
    }), I = () => i.placeholder ? g(En, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !i.error) && g("div", {
        class: "v-img__placeholder"
      }, [i.placeholder()])]
    }) : null, $ = () => i.error ? g(En, {
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
    }, null) : null, H = be(!1);
    {
      const L = we(v, (N) => {
        N && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            H.value = !0;
          });
        }), L());
      });
    }
    return he(() => {
      const L = af.filterProps(e);
      return We(g(af, de({
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
        additional: () => g(Le, null, [g(E, null, null), g(S, null, null), g(R, null, null), g(I, null, null), g($, null, null)]),
        default: i.default
      }), [[nn("intersect"), {
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
}), B_ = Z({
  start: Boolean,
  end: Boolean,
  icon: Me,
  image: String,
  text: String,
  ...Ce(),
  ...Gt(),
  ..._t(),
  ...Kr(),
  ...qe(),
  ...Xe(),
  ...On({
    variant: "flat"
  })
}, "VAvatar"), wi = fe()({
  name: "VAvatar",
  props: B_(),
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
    } = nr(e), {
      densityClasses: s
    } = an(e), {
      roundedClasses: a
    } = St(e), {
      sizeClasses: u,
      sizeStyles: c
    } = Xr(e);
    return he(() => g(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, i.value, r.value, s.value, a.value, u.value, l.value, e.class],
      style: [o.value, c.value, e.style]
    }, {
      default: () => [n.default ? g(et, {
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
      }) : e.image ? g(_v, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? g(je, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, tr(!1, "v-avatar")]
    })), {};
  }
}), F_ = Z({
  appendAvatar: String,
  appendIcon: Me,
  prependAvatar: String,
  prependIcon: Me,
  subtitle: [String, Number],
  title: [String, Number],
  ...Ce(),
  ...Gt()
}, "VCardItem"), D_ = fe()({
  name: "VCardItem",
  props: F_(),
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
      }, [n.prepend ? g(et, {
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
      }, n.prepend) : g(Le, null, [e.prependAvatar && g(wi, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && g(je, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), g("div", {
        class: "v-card-item__content"
      }, [s && g(Fr, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && g(vr, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? e.subtitle];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), l && g("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? g(et, {
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
      }, n.append) : g(Le, null, [e.appendIcon && g(je, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && g(wi, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), xr = er("v-card-text"), H_ = Z({
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
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Zn(),
  ...Nn(),
  ...Za(),
  ...Jr(),
  ...$l(),
  ..._t(),
  ...Ol(),
  ...qe(),
  ...Xe(),
  ...On({
    variant: "elevated"
  })
}, "VCard"), Qa = fe()({
  name: "VCard",
  directives: {
    Ripple: Ei
  },
  props: H_(),
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const {
      themeClasses: r
    } = tt(e), {
      borderClasses: o
    } = ki(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = nr(e), {
      densityClasses: u
    } = an(e), {
      dimensionStyles: c
    } = Jn(e), {
      elevationClasses: f
    } = Rn(e), {
      loaderClasses: d
    } = Al(e), {
      locationStyles: h
    } = Qr(e), {
      positionClasses: v
    } = Nl(e), {
      roundedClasses: m
    } = St(e), p = Rl(e, n), y = k(() => e.link !== !1 && p.isLink.value), w = k(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return he(() => {
      const x = y.value ? "a" : e.tag, b = !!(i.title || e.title != null), _ = !!(i.subtitle || e.subtitle != null), E = b || _, S = !!(i.append || e.appendAvatar || e.appendIcon), I = !!(i.prepend || e.prependAvatar || e.prependIcon), $ = !!(i.image || e.image), R = E || I || S, H = !!(i.text || e.text != null);
      return We(g(x, {
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
          }, [i.image ? g(et, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, i.image) : g(_v, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), g(Ja, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: i.loader
          }), R && g(D_, {
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
          }), H && g(xr, {
            key: "text"
          }, {
            default: () => {
              var N;
              return [((N = i.text) == null ? void 0 : N.call(i)) ?? e.text];
            }
          }), (L = i.default) == null ? void 0 : L.call(i), i.actions && g(Bl, null, {
            default: i.actions
          }), tr(w.value, "v-card")];
        }
      }), [[nn("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), j_ = Z({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Mt(e, t, n) {
  return fe()({
    name: e,
    props: j_({
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
        const s = i.group ? zd : In;
        return $n(s, {
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
function Sv(e, t) {
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
      return () => $n(In, {
        name: i.disabled ? "" : e,
        css: !i.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...i.disabled ? {} : t
      }, o.default);
    }
  });
}
function Cv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", i = vt(`offset-${n}`);
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
const z_ = Z({
  target: [Object, Array]
}, "v-dialog-transition"), eu = fe()({
  name: "VDialogTransition",
  props: z_(),
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
        } = cf(e.target, r), f = fi(r, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: Zx
        });
        (d = uf(r)) == null || d.forEach((h) => {
          fi(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: Rr
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
        } = cf(e.target, r);
        fi(r, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: Jx
        }).finished.then(() => o()), (d = uf(r)) == null || d.forEach((h) => {
          fi(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: Rr
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? g(In, de({
      name: "dialog-transition"
    }, i, {
      css: !1
    }), n) : g(In, {
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
  const n = Fh(e), i = Ga(t), [r, o] = getComputedStyle(t).transformOrigin.split(" ").map((y) => parseFloat(y)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
Mt("fab-transition", "center center", "out-in");
Mt("dialog-bottom-transition");
Mt("dialog-top-transition");
const ff = Mt("fade-transition"), kv = Mt("scale-transition");
Mt("scroll-x-transition");
Mt("scroll-x-reverse-transition");
Mt("scroll-y-transition");
Mt("scroll-y-reverse-transition");
Mt("slide-x-transition");
Mt("slide-x-reverse-transition");
const Ev = Mt("slide-y-transition");
Mt("slide-y-reverse-transition");
const Vv = Sv("expand-transition", Cv()), Lv = Sv("expand-x-transition", Cv("", !0));
function ds(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function G_(e, t) {
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
    return ds({
      x: r,
      y: o
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: i
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, o = i === "top" ? 0 : i === "center" ? t.height / 2 : i === "bottom" ? t.height : i;
    return ds({
      x: r,
      y: o
    }, t);
  }
  return ds({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Iv = {
  static: q_,
  // specific viewport position, usually centered
  connected: K_
  // connected to a certain element
}, U_ = Z({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Iv
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
function W_(e, t) {
  const n = ee({}), i = ee();
  Oe && bi(() => !!(t.isActive.value && e.locationStrategy), (o) => {
    var l, s;
    we(() => e.locationStrategy, o), mt(() => {
      window.removeEventListener("resize", r), i.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? i.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : i.value = (s = Iv[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
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
function q_() {
}
function Y_(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = Ga(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function K_(e, t, n) {
  (Array.isArray(e.target.value) || t_(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: o
  } = za(() => {
    const v = js(t.location, e.isRtl.value), m = t.origin === "overlap" ? v : t.origin === "auto" ? as(v) : js(t.origin, e.isRtl.value);
    return v.side === m.side && v.align === us(m).align ? {
      preferredAnchor: Fc(v),
      preferredOrigin: Fc(m)
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
  we([e.target, e.contentEl], (v, m) => {
    let [p, y] = v, [w, x] = m;
    w && !Array.isArray(w) && d.unobserve(w), p && !Array.isArray(p) && d.observe(p), x && d.unobserve(x), y && d.observe(y);
  }, {
    immediate: !0
  }), mt(() => {
    d.disconnect();
  });
  function h() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value) return;
    const v = Fh(e.target.value), m = Y_(e.contentEl.value, e.isRtl.value), p = nl(e.contentEl.value), y = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (m.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), m.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((H, L) => {
      const N = L.getBoundingClientRect(), C = new gi({
        x: L === document.documentElement ? 0 : N.x,
        y: L === document.documentElement ? 0 : N.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return H ? new gi({
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
      const L = new gi(m), N = df(H.anchor, v), C = df(H.origin, L);
      let {
        x: B,
        y: T
      } = G_(N, C);
      switch (H.anchor.side) {
        case "top":
          T -= c.value[0];
          break;
        case "bottom":
          T += c.value[0];
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
          T -= c.value[1];
          break;
        case "bottom":
          T += c.value[1];
          break;
        case "left":
          B -= c.value[1];
          break;
        case "right":
          B += c.value[1];
          break;
      }
      return L.x += B, L.y += T, L.width = Math.min(L.width, a.value), L.height = Math.min(L.height, u.value), {
        overflows: Hc(L, w),
        x: B,
        y: T
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
        const C = Dc(x.anchor), B = N.x.before || N.x.after, T = N.y.before || N.y.after;
        let j = !1;
        if (["x", "y"].forEach((M) => {
          if (M === "x" && B && !I.x || M === "y" && T && !I.y) {
            const F = {
              anchor: {
                ...x.anchor
              },
              origin: {
                ...x.origin
              }
            }, O = M === "x" ? C === "y" ? us : as : C === "y" ? as : us;
            F.anchor = O(F.anchor), F.origin = O(F.origin);
            const {
              overflows: D
            } = b(F);
            (D[M].before <= N[M].before && D[M].after <= N[M].after || D[M].before + D[M].after < (N[M].before + N[M].after) / 2) && (x = F, j = I[M] = !0);
          }
        }), j) continue;
      }
      N.x.before && (_ += N.x.before, m.x += N.x.before), N.x.after && (_ -= N.x.after, m.x -= N.x.after), N.y.before && (E += N.y.before, m.y += N.y.before), N.y.after && (E -= N.y.after, m.y -= N.y.after);
      {
        const C = Hc(m, w);
        S.x = w.width - C.x.before - C.x.after, S.y = w.height - C.y.before - C.y.after, _ += C.x.before, m.x += C.x.before, E += C.y.before, m.y += C.y.before;
      }
      break;
    }
    const R = Dc(x.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${x.anchor.side} ${x.anchor.align}`,
      transformOrigin: `${x.origin.side} ${x.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ge(hs(E)),
      left: e.isRtl.value ? void 0 : ge(hs(_)),
      right: e.isRtl.value ? ge(hs(-_)) : void 0,
      minWidth: ge(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: ge(hf(Lt(S.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: ge(hf(Lt(S.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: S,
      contentBox: m
    };
  }
  return we(() => [r.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), Ke(() => {
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
function hs(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function hf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Ys = !0;
const ll = [];
function X_(e) {
  !Ys || ll.length ? (ll.push(e), Ks()) : (Ys = !1, e(), Ks());
}
let vf = -1;
function Ks() {
  cancelAnimationFrame(vf), vf = requestAnimationFrame(() => {
    const e = ll.shift();
    e && e(), ll.length ? Ks() : Ys = !0;
  });
}
const $o = {
  none: null,
  close: Q_,
  block: e2,
  reposition: t2
}, Z_ = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in $o
  }
}, "VOverlay-scroll-strategies");
function J_(e, t) {
  if (!Oe) return;
  let n;
  yn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = ha(), await Ke(), n.active && n.run(() => {
      var i;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (i = $o[e.scrollStrategy]) == null || i.call($o, t, e, n);
    }));
  }), mt(() => {
    n == null || n.stop();
  });
}
function Q_(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Pv(e.targetEl.value ?? e.contentEl.value, t);
}
function e2(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, i = [.../* @__PURE__ */ new Set([...nl(e.targetEl.value, t.contained ? n : void 0), ...nl(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Ya(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", ge(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", ge(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", ge(r)), s.classList.add("v-overlay-scroll-blocked");
  }), mt(() => {
    i.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), f = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function t2(e, t, n) {
  let i = !1, r = -1, o = -1;
  function l(s) {
    X_(() => {
      var c, f;
      const a = performance.now();
      (f = (c = e.updateLocation).value) == null || f.call(c, s), i = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  o = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      Pv(e.targetEl.value ?? e.contentEl.value, (s) => {
        i ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), mt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(o), cancelAnimationFrame(r);
  });
}
function Pv(e, t) {
  const n = [document, ...nl(e)];
  n.forEach((i) => {
    i.addEventListener("scroll", t, {
      passive: !0
    });
  }), mt(() => {
    n.forEach((i) => {
      i.removeEventListener("scroll", t);
    });
  });
}
const Xs = Symbol.for("vuetify:v-menu"), n2 = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function i2(e, t) {
  let n = () => {
  };
  function i(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = Sx(s, () => {
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
const r2 = Z({
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
  ...n2()
}, "VOverlay-activator");
function o2(e, t) {
  let {
    isActive: n,
    isTop: i
  } = t;
  const r = it("useActivator"), o = ee();
  let l = !1, s = !1, a = !0;
  const u = k(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = k(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = i2(e, (S) => {
    S === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !i.value) && (n.value !== S && (a = !0), n.value = S);
  }), h = ee(), v = {
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
      el(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), o.value = S.currentTarget || S.target, f());
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
      const I = He(Xs, null);
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
  we(i, (S) => {
    S && (e.openOnHover && !l && (!u.value || !s) || u.value && !s && (!e.openOnHover || !l)) && (n.value = !1);
  }), we(n, (S) => {
    S || setTimeout(() => {
      h.value = void 0;
    });
  }, {
    flush: "post"
  });
  const w = ee();
  yn(() => {
    w.value && Ke(() => {
      o.value = $r(w.value);
    });
  });
  const x = ee(), b = k(() => e.target === "cursor" && h.value ? h.value : x.value ? $r(x.value) : Tv(e.target, r) || o.value), _ = k(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return we(() => !!e.activator, (S) => {
    S && Oe ? (E = ha(), E.run(() => {
      l2(e, r, {
        activatorEl: o,
        activatorEvents: m
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), mt(() => {
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
function l2(e, t, n) {
  let {
    activatorEl: i,
    activatorEvents: r
  } = n;
  we(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && Ke(() => o());
  }, {
    immediate: !0
  }), we(() => e.activatorProps, () => {
    o();
  }), mt(() => {
    l();
  });
  function o() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Ex(a, de(r.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && Vx(a, de(r.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Tv(a, t);
    return i.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, i.value;
  }
}
function Tv(e, t) {
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
const Fl = ["sm", "md", "lg", "xl", "xxl"], Zs = Symbol.for("vuetify:display"), mf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, s2 = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mf;
  return It(mf, e);
};
function gf(e) {
  return Oe && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function yf(e) {
  return Oe && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function pf(e) {
  const t = Oe && !e ? window.navigator.userAgent : "ssr";
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
    touch: yx,
    ssr: t === "ssr"
  };
}
function a2(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: i
  } = s2(e), r = be(yf(t)), o = be(pf(t)), l = tn({}), s = be(gf(t));
  function a() {
    r.value = yf(), s.value = gf();
  }
  function u() {
    a(), o.value = pf();
  }
  return yn(() => {
    const c = s.value < n.sm, f = s.value < n.md && !c, d = s.value < n.lg && !(f || c), h = s.value < n.xl && !(d || f || c), v = s.value < n.xxl && !(h || d || f || c), m = s.value >= n.xxl, p = c ? "xs" : f ? "sm" : d ? "md" : h ? "lg" : v ? "xl" : "xxl", y = typeof i == "number" ? i : n[i], w = s.value < y;
    l.xs = c, l.sm = f, l.md = d, l.lg = h, l.xl = v, l.xxl = m, l.smAndUp = !c, l.mdAndUp = !(c || f), l.lgAndUp = !(c || f || d), l.xlAndUp = !(c || f || d || h), l.smAndDown = !(d || h || v || m), l.mdAndDown = !(h || v || m), l.lgAndDown = !(v || m), l.xlAndDown = !m, l.name = p, l.height = r.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = i, l.platform = o.value, l.thresholds = n;
  }), Oe && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...xa(l),
    update: u,
    ssr: !!t
  };
}
const u2 = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function tu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
  const n = He(Zs);
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
function c2() {
  if (!Oe) return be(!1);
  const {
    ssr: e
  } = tu();
  if (e) {
    const t = be(!1);
    return rn(() => {
      t.value = !0;
    }), t;
  } else
    return be(!0);
}
const Dl = Z({
  eager: Boolean
}, "lazy");
function nu(e, t) {
  const n = be(!1), i = k(() => n.value || e.eager || t.value);
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
function to() {
  const t = it("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const bf = Symbol.for("vuetify:stack"), ur = tn([]);
function f2(e, t, n) {
  const i = it("useStack"), r = !n, o = He(bf, void 0), l = tn({
    activeChildren: /* @__PURE__ */ new Set()
  });
  lt(bf, l);
  const s = be(+t.value);
  bi(e, () => {
    var f;
    const c = (f = ur.at(-1)) == null ? void 0 : f[1];
    s.value = c ? c + 10 : +t.value, r && ur.push([i.uid, s.value]), o == null || o.activeChildren.add(i.uid), mt(() => {
      if (r) {
        const d = Se(ur).findIndex((h) => h[0] === i.uid);
        ur.splice(d, 1);
      }
      o == null || o.activeChildren.delete(i.uid);
    });
  });
  const a = be(!0);
  r && yn(() => {
    var f;
    const c = ((f = ur.at(-1)) == null ? void 0 : f[0]) === i.uid;
    setTimeout(() => a.value = c);
  });
  const u = k(() => !l.activeChildren.size);
  return {
    globalTop: jr(a),
    localTop: u,
    stackStyles: k(() => ({
      zIndex: s.value
    }))
  };
}
function d2(e) {
  return {
    teleportTarget: k(() => {
      const n = e.value;
      if (n === !0 || !Oe) return;
      const i = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (i == null)
        return;
      let r = i.querySelector(":scope > .v-overlay-container");
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", i.appendChild(r)), r;
    })
  };
}
function h2() {
  return !0;
}
function Mv(e, t, n) {
  if (!e || Av(e, n) === !1) return !1;
  const i = Zh(t);
  if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((o) => o == null ? void 0 : o.contains(e.target));
}
function Av(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || h2)(e);
}
function v2(e, t, n) {
  const i = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Mv(e, t, n) && setTimeout(() => {
    Av(e, n) && i && i(e);
  }, 0);
}
function wf(e, t) {
  const n = Zh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const m2 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => v2(r, e, t), i = (r) => {
      e._clickOutside.lastMousedownWasOutside = Mv(r, e, t);
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
function g2(e) {
  const {
    modelValue: t,
    color: n,
    ...i
  } = e;
  return g(In, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && g("div", de({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, i), null)]
  });
}
const no = Z({
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
  ...r2(),
  ...Ce(),
  ...Zn(),
  ...Dl(),
  ...U_(),
  ...Z_(),
  ...Xe(),
  ...eo()
}, "VOverlay"), Xn = fe()({
  name: "VOverlay",
  directives: {
    ClickOutside: m2
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...no()
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
      set: (te) => {
        te && e.disabled || (o.value = te);
      }
    }), {
      teleportTarget: s
    } = d2(k(() => e.attach || e.contained)), {
      themeClasses: a
    } = tt(e), {
      rtlClasses: u,
      isRtl: c
    } = un(), {
      hasContent: f,
      onAfterLeave: d
    } = nu(e, l), h = Tt(k(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: m,
      stackStyles: p
    } = f2(l, le(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: y,
      activatorRef: w,
      target: x,
      targetEl: b,
      targetRef: _,
      activatorEvents: E,
      contentEvents: S,
      scrimEvents: I
    } = o2(e, {
      isActive: l,
      isTop: m
    }), {
      dimensionStyles: $
    } = Jn(e), R = c2(), {
      scopeId: H
    } = to();
    we(() => e.disabled, (te) => {
      te && (l.value = !1);
    });
    const L = ee(), N = ee(), {
      contentStyles: C,
      updateLocation: B
    } = W_(e, {
      isRtl: c,
      contentEl: N,
      target: x,
      isActive: l
    });
    J_(e, {
      root: L,
      contentEl: N,
      targetEl: b,
      isActive: l,
      updateLocation: B
    });
    function T(te) {
      r("click:outside", te), e.persistent ? D() : l.value = !1;
    }
    function j() {
      return l.value && v.value;
    }
    Oe && we(l, (te) => {
      te ? window.addEventListener("keydown", M) : window.removeEventListener("keydown", M);
    }, {
      immediate: !0
    }), on(() => {
      Oe && window.removeEventListener("keydown", M);
    });
    function M(te) {
      var ce, me;
      te.key === "Escape" && v.value && (e.persistent ? D() : (l.value = !1, (ce = N.value) != null && ce.contains(document.activeElement) && ((me = y.value) == null || me.focus())));
    }
    const F = V_();
    bi(() => e.closeOnBack, () => {
      L_(F, (te) => {
        v.value && l.value ? (te(!1), e.persistent ? D() : l.value = !1) : te();
      });
    });
    const O = ee();
    we(() => l.value && (e.absolute || e.contained) && s.value == null, (te) => {
      if (te) {
        const ce = Qh(L.value);
        ce && ce !== document.scrollingElement && (O.value = ce.scrollTop);
      }
    });
    function D() {
      e.noClickAnimation || N.value && fi(N.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Rr
      });
    }
    function K() {
      d(), r("afterLeave");
    }
    return he(() => {
      var te;
      return g(Le, null, [(te = n.activator) == null ? void 0 : te.call(n, {
        isActive: l.value,
        props: de({
          ref: w,
          targetRef: _
        }, E.value, e.activatorProps)
      }), R.value && f.value && g(s0, {
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
        }, H, i), [g(g2, de({
          color: h,
          modelValue: l.value && !!e.scrim
        }, I.value), null), g(En, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterLeave: K
        }, {
          default: () => {
            var ce;
            return [We(g("div", de({
              ref: N,
              class: ["v-overlay__content", e.contentClass],
              style: [$.value, C.value]
            }, S.value, e.contentProps), [(ce = n.default) == null ? void 0 : ce.call(n, {
              isActive: l
            })]), [[Ht, l.value], [nn("click-outside"), {
              handler: T,
              closeConditional: j,
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
}), vs = Symbol("Forwarded refs");
function ms(e, t) {
  let n = e;
  for (; n; ) {
    const i = Reflect.getOwnPropertyDescriptor(n, t);
    if (i) return i;
    n = Object.getPrototypeOf(n);
  }
}
function Qn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return e[vs] = n, new Proxy(e, {
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
          const u = ms(a.value, o) ?? ("_" in a.value ? ms((s = a.value._) == null ? void 0 : s.setupState, o) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[vs];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const f = c.shift(), d = ms(f.value, o);
            if (d) return d;
            const h = f.value && f.value[vs];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const y2 = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...no({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: eu
    },
    zIndex: 2400
  })
}, "VDialog"), iu = fe()({
  name: "VDialog",
  props: y2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = to(), o = ee();
    function l(a) {
      var f, d;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((f = o.value) != null && f.contentEl) && // We're the topmost dialog
      ((d = o.value) != null && d.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(c) && // It isn't inside the dialog body
      !o.value.contentEl.contains(c)) {
        const h = Nr(o.value.contentEl);
        if (!h.length) return;
        const v = h[0], m = h[h.length - 1];
        u === v ? m.focus() : v.focus();
      }
    }
    Oe && we(() => i.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), we(i, async (a) => {
      var u, c;
      await Ke(), a ? (u = o.value.contentEl) == null || u.focus({
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
      const a = Xn.filterProps(e);
      return g(Xn, de({
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
          return g(et, {
            root: "VDialog"
          }, {
            default: () => {
              var d;
              return [(d = n.default) == null ? void 0 : d.call(n, ...c)];
            }
          });
        }
      });
    }), Qn({}, o);
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
  const s = l ? t.clientWidth : t.clientHeight, a = l ? t.offsetLeft : t.offsetTop, u = r && l ? i - a - s : a, c = n + o, f = s + u, d = s * 0.4;
  return u <= o ? o = Math.max(u - d, 0) : c <= f && (o = Math.min(o - (c - f - d), i - n)), o;
}
function p2(e) {
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
const b2 = Symbol.for("vuetify:v-slide-group"), ru = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: b2
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
  ...Ce(),
  ...u2(),
  ...qe(),
  ...Il({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), sl = fe()({
  name: "VSlideGroup",
  props: ru(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: i
    } = un(), {
      displayClasses: r,
      mobile: o
    } = tu(e), l = Yr(e, e.symbol), s = be(!1), a = be(0), u = be(0), c = be(0), f = k(() => e.direction === "horizontal"), {
      resizeRef: d,
      contentRect: h
    } = Ki(), {
      resizeRef: v,
      contentRect: m
    } = Ki(), p = k(() => l.selected.value.length ? l.items.value.findIndex((D) => D.id === l.selected.value[0]) : -1), y = k(() => l.selected.value.length ? l.items.value.findIndex((D) => D.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Oe) {
      let D = -1;
      we(() => [l.selected.value, h.value, m.value, f.value], () => {
        cancelAnimationFrame(D), D = requestAnimationFrame(() => {
          if (h.value && m.value) {
            const K = f.value ? "width" : "height";
            u.value = h.value[K], c.value = m.value[K], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const K = v.value.children[y.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = p2({
              selectedElement: K,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: i.value,
              isHorizontal: f.value
            }) : s.value && (a.value = _f({
              selectedElement: K,
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
    const w = be(!1);
    let x = 0, b = 0;
    function _(D) {
      const K = f.value ? "clientX" : "clientY";
      b = (i.value && f.value ? -1 : 1) * a.value, x = D.touches[0][K], w.value = !0;
    }
    function E(D) {
      if (!s.value) return;
      const K = f.value ? "clientX" : "clientY", te = i.value && f.value ? -1 : 1;
      a.value = te * (b + x - D.touches[0][K]);
    }
    function S(D) {
      const K = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= K && (a.value = K), w.value = !1;
    }
    function I() {
      d.value && (d.value[f.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const $ = be(!1);
    function R(D) {
      if ($.value = !0, !(!s.value || !v.value)) {
        for (const K of D.composedPath())
          for (const te of v.value.children)
            if (te === K) {
              a.value = _f({
                selectedElement: te,
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
      var K;
      !$.value && !(D.relatedTarget && ((K = v.value) != null && K.contains(D.relatedTarget))) && C();
    }
    function N(D) {
      v.value && (f.value ? D.key === "ArrowRight" ? C(i.value ? "prev" : "next") : D.key === "ArrowLeft" && C(i.value ? "next" : "prev") : D.key === "ArrowDown" ? C("next") : D.key === "ArrowUp" && C("prev"), D.key === "Home" ? C("first") : D.key === "End" && C("last"));
    }
    function C(D) {
      var K, te, ce, me, Q;
      if (v.value)
        if (!D)
          (K = Nr(v.value)[0]) == null || K.focus();
        else if (D === "next") {
          const ue = (te = v.value.querySelector(":focus")) == null ? void 0 : te.nextElementSibling;
          ue ? ue.focus() : C("first");
        } else if (D === "prev") {
          const ue = (ce = v.value.querySelector(":focus")) == null ? void 0 : ce.previousElementSibling;
          ue ? ue.focus() : C("last");
        } else D === "first" ? (me = v.value.firstElementChild) == null || me.focus() : D === "last" && ((Q = v.value.lastElementChild) == null || Q.focus());
    }
    function B(D) {
      const K = a.value + (D === "prev" ? -1 : 1) * u.value;
      a.value = Lt(K, 0, c.value - u.value);
    }
    const T = k(() => {
      let D = a.value > c.value - u.value ? -(c.value - u.value) + xf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (D = xf(-a.value));
      const K = i.value && f.value ? -1 : 1;
      return {
        transform: `translate${f.value ? "X" : "Y"}(${K * D}px)`,
        transition: w.value ? "none" : "",
        willChange: w.value ? "transform" : ""
      };
    }), j = k(() => ({
      next: l.next,
      prev: l.prev,
      select: l.select,
      isSelected: l.isSelected
    })), M = k(() => {
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
        "v-slide-group--has-affixes": M.value,
        "v-slide-group--is-overflowing": s.value
      }, r.value, e.class],
      style: e.style,
      tabindex: $.value || l.selected.value.length ? -1 : 0,
      onFocus: L
    }, {
      default: () => {
        var D, K, te;
        return [M.value && g("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && B("prev")
        }, [((D = n.prev) == null ? void 0 : D.call(n, j.value)) ?? g(ff, null, {
          default: () => [g(je, {
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
          style: T.value,
          onTouchstartPassive: _,
          onTouchmovePassive: E,
          onTouchendPassive: S,
          onFocusin: R,
          onFocusout: H,
          onKeydown: N
        }, [(K = n.default) == null ? void 0 : K.call(n, j.value)])]), M.value && g("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !O.value
          }],
          onClick: () => O.value && B("next")
        }, [((te = n.next) == null ? void 0 : te.call(n, j.value)) ?? g(ff, null, {
          default: () => [g(je, {
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
}), $v = Symbol.for("vuetify:v-chip-group"), w2 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Si
  },
  ...ru(),
  ...Ce(),
  ...Il({
    selectedClass: "v-chip--selected"
  }),
  ...qe(),
  ...Xe(),
  ...On({
    variant: "tonal"
  })
}, "VChipGroup");
fe()({
  name: "VChipGroup",
  props: w2(),
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
    } = Yr(e, $v);
    return bn({
      VChip: {
        color: le(e, "color"),
        disabled: le(e, "disabled"),
        filter: le(e, "filter"),
        variant: le(e, "variant")
      }
    }), he(() => {
      const u = sl.filterProps(e);
      return g(sl, de(u, {
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
const x2 = Z({
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
  onClick: Qt(),
  onClickOnce: Qt(),
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Nn(),
  ...Pl(),
  ..._t(),
  ...Ol(),
  ...Kr(),
  ...qe({
    tag: "span"
  }),
  ...Xe(),
  ...On({
    variant: "tonal"
  })
}, "VChip"), Nv = fe()({
  name: "VChip",
  directives: {
    Ripple: Ei
  },
  props: x2(),
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
    } = Zr(), {
      borderClasses: l
    } = ki(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = nr(e), {
      densityClasses: c
    } = an(e), {
      elevationClasses: f
    } = Rn(e), {
      roundedClasses: d
    } = St(e), {
      sizeClasses: h
    } = Xr(e), {
      themeClasses: v
    } = tt(e), m = $e(e, "modelValue"), p = Tl(e, $v, !1), y = Rl(e, n), w = k(() => e.link !== !1 && y.isLink.value), x = k(() => !e.disabled && e.link !== !1 && (!!p || e.link || y.isClickable.value)), b = k(() => ({
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
      return m.value && We(g(S, {
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
          return [tr(x.value, "v-chip"), H && g(Lv, {
            key: "filter"
          }, {
            default: () => [We(g("div", {
              class: "v-chip__filter"
            }, [r.filter ? g(et, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : g(je, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Ht, p.isSelected.value]])]
          }), N && g("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? g(et, {
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
          }, r.prepend) : g(Le, null, [e.prependIcon && g(je, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && g(wi, {
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
          }, [r.append ? g(et, {
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
          }, r.append) : g(Le, null, [e.appendIcon && g(je, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(wi, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && g("button", de({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [r.close ? g(et, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : g(je, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[nn("ripple"), x.value && e.ripple, null]]);
    };
  }
}), _2 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Ce(),
  ...eo({
    transition: {
      component: Ev
    }
  })
}, "VCounter"), Rv = fe()({
  name: "VCounter",
  functional: !0,
  props: _2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return he(() => g(En, {
      transition: e.transition
    }, {
      default: () => [We(g("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: i.value,
        max: e.max,
        value: e.value
      }) : i.value]), [[Ht, e.active]])]
    })), {};
  }
}), S2 = Z({
  text: String,
  onClick: Qt(),
  ...Ce(),
  ...Xe()
}, "VLabel"), Hl = fe()({
  name: "VLabel",
  props: S2(),
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
}), C2 = Z({
  floating: Boolean,
  ...Ce()
}, "VFieldLabel"), _o = fe()({
  name: "VFieldLabel",
  props: C2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => g(Hl, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function Ov(e) {
  const {
    t
  } = Zr();
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
    return g(je, {
      icon: e[`${r}Icon`],
      "aria-label": s,
      onClick: l
    }, null);
  }
  return {
    InputIcon: n
  };
}
const ou = Z({
  focused: Boolean,
  "onUpdate:focused": Qt()
}, "focus");
function ir(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn();
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
const k2 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], lu = Z({
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
    validator: (e) => k2.includes(e)
  },
  "onClick:clear": Qt(),
  "onClick:appendInner": Qt(),
  "onClick:prependInner": Qt(),
  ...Ce(),
  ...Za(),
  ..._t(),
  ...Xe()
}, "VField"), su = fe()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...ou(),
    ...lu()
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
    } = Al(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = ir(e), {
      InputIcon: f
    } = Ov(e), {
      roundedClasses: d
    } = St(e), {
      rtlClasses: h
    } = un(), v = k(() => e.dirty || e.active), m = k(() => !e.singleLine && !!(e.label || r.label)), p = xt(), y = k(() => e.id || `input-${p}`), w = k(() => `${y.value}-messages`), x = ee(), b = ee(), _ = ee(), E = k(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: S,
      backgroundColorStyles: I
    } = Tt(le(e, "bgColor")), {
      textColorClasses: $,
      textColorStyles: R
    } = en(k(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    we(v, (N) => {
      if (m.value) {
        const C = x.value.$el, B = b.value.$el;
        requestAnimationFrame(() => {
          const T = Ga(C), j = B.getBoundingClientRect(), M = j.x - T.x, F = j.y - T.y - (T.height / 2 - j.height / 2), O = j.width / 0.75, D = Math.abs(O - T.width) > 1 ? {
            maxWidth: ge(O)
          } : void 0, K = getComputedStyle(C), te = getComputedStyle(B), ce = parseFloat(K.transitionDuration) * 1e3 || 150, me = parseFloat(te.getPropertyValue("--v-field-label-scale")), Q = te.getPropertyValue("color");
          C.style.visibility = "visible", B.style.visibility = "hidden", fi(C, {
            transform: `translate(${M}px, ${F}px) scale(${me})`,
            color: Q,
            ...D
          }, {
            duration: ce,
            easing: Rr,
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
      var M, F, O;
      const N = e.variant === "outlined", C = r["prepend-inner"] || e.prependInnerIcon, B = !!(e.clearable || r.clear), T = !!(r["append-inner"] || e.appendInnerIcon || B), j = () => r.label ? r.label({
        ...H.value,
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label;
      return g("div", de({
        class: ["v-field", {
          "v-field--active": v.value,
          "v-field--appended": T,
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
          "v-field--no-label": !j(),
          [`v-field--variant-${e.variant}`]: !0
        }, o.value, S.value, s.value, l.value, d.value, h.value, e.class],
        style: [I.value, e.style],
        onClick: L
      }, n), [g("div", {
        class: "v-field__overlay"
      }, null), g(Ja, {
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
      }, null), (M = r["prepend-inner"]) == null ? void 0 : M.call(r, H.value)]), g("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && m.value && g(_o, {
        key: "floating-label",
        ref: b,
        class: [$.value],
        floating: !0,
        for: y.value,
        style: R.value
      }, {
        default: () => [j()]
      }), g(_o, {
        ref: x,
        for: y.value
      }, {
        default: () => [j()]
      }), (F = r.default) == null ? void 0 : F.call(r, {
        ...H.value,
        props: {
          id: y.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), B && g(Lv, {
        key: "clear"
      }, {
        default: () => [We(g("div", {
          class: "v-field__clearable",
          onMousedown: (D) => {
            D.preventDefault(), D.stopPropagation();
          }
        }, [r.clear ? r.clear() : g(f, {
          name: "clear"
        }, null)]), [[Ht, e.dirty]])]
      }), T && g("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(O = r["append-inner"]) == null ? void 0 : O.call(r, H.value), e.appendInnerIcon && g(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), g("div", {
        class: ["v-field__outline", $.value],
        style: R.value
      }, [N && g(Le, null, [g("div", {
        class: "v-field__outline__start"
      }, null), m.value && g("div", {
        class: "v-field__outline__notch"
      }, [g(_o, {
        ref: b,
        floating: !0,
        for: y.value
      }, {
        default: () => [j()]
      })]), g("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && m.value && g(_o, {
        ref: b,
        floating: !0,
        for: y.value
      }, {
        default: () => [j()]
      })])]);
    }), {
      controlRef: _
    };
  }
});
function Bv(e) {
  const t = Object.keys(su.props).filter((n) => !ja(n) && n !== "class" && n !== "style");
  return Th(e, t);
}
const E2 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Ce(),
  ...eo({
    transition: {
      component: Ev,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), V2 = fe()({
  name: "VMessages",
  props: E2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => gn(e.messages)), {
      textColorClasses: r,
      textColorStyles: o
    } = en(k(() => e.color));
    return he(() => g(En, {
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
}), L2 = Symbol.for("vuetify:form");
function Fv() {
  return He(L2, null);
}
const I2 = Z({
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
  ...ou()
}, "validation");
function P2(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : wn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : xt();
  const i = $e(e, "modelValue"), r = k(() => e.validationValue === void 0 ? i.value : e.validationValue), o = Fv(), l = ee([]), s = be(!0), a = k(() => !!(gn(i.value === "" ? null : i.value).length || gn(r.value === "" ? null : r.value).length)), u = k(() => !!(e.disabled ?? (o == null ? void 0 : o.isDisabled.value))), c = k(() => !!(e.readonly ?? (o == null ? void 0 : o.isReadonly.value))), f = k(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? gn(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
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
  }), v = be(!1), m = k(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = k(() => e.name ?? Zt(n));
  pl(() => {
    o == null || o.register({
      id: p.value,
      validate: x,
      reset: y,
      resetValidation: w
    });
  }), on(() => {
    o == null || o.unregister(p.value);
  }), rn(async () => {
    d.value.lazy || await x(!0), o == null || o.update(p.value, h.value, f.value);
  }), bi(() => d.value.input, () => {
    we(r, () => {
      if (r.value != null)
        x();
      else if (e.focused) {
        const b = we(() => e.focused, (_) => {
          _ || x(), b();
        });
      }
    });
  }), bi(() => d.value.blur, () => {
    we(() => e.focused, (b) => {
      b || x();
    });
  }), we([h, f], () => {
    o == null || o.update(p.value, h.value, f.value);
  });
  function y() {
    i.value = null, Ke(w);
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
const Vi = Z({
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
  "onClick:prepend": Qt(),
  "onClick:append": Qt(),
  ...Ce(),
  ...Gt(),
  ...I2()
}, "VInput"), jt = fe()({
  name: "VInput",
  props: {
    ...Vi()
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
    } = an(e), {
      rtlClasses: l
    } = un(), {
      InputIcon: s
    } = Ov(e), a = xt(), u = k(() => e.id || `input-${a}`), c = k(() => `${u.value}-messages`), {
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
    } = P2(e, "v-input", u), E = k(() => ({
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
      }, [g(V2, {
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
}), T2 = Z({
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
  ...Vi({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => gn(e).every((t) => t != null && typeof t == "object")
  },
  ...lu({
    clearable: !0
  })
}, "VFileInput"), M2 = fe()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: T2(),
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
    } = Zr(), l = $e(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = ir(e), c = k(() => typeof e.showSize != "boolean" ? e.showSize : void 0), f = k(() => (l.value ?? []).reduce(($, R) => {
      let {
        size: H = 0
      } = R;
      return $ + H;
    }, 0)), d = k(() => Rc(f.value, c.value)), h = k(() => (l.value ?? []).map(($) => {
      const {
        name: R = "",
        size: H = 0
      } = $;
      return e.showSize ? `${R} (${Rc(H, c.value)})` : R;
    })), v = k(() => {
      var R;
      const $ = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? o(e.counterSizeString, $, d.value) : o(e.counterString, $);
    }), m = ee(), p = ee(), y = ee(), w = k(() => s.value || e.active), x = k(() => ["plain", "underlined"].includes(e.variant));
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
      $.stopPropagation(), b(), Ke(() => {
        l.value = [], Nh(e["onClick:clear"], $);
      });
    }
    return we(l, ($) => {
      (!Array.isArray($) || !$.length) && y.value && (y.value.value = "");
    }), he(() => {
      const $ = !!(r.counter || e.counter), R = !!($ || r.details), [H, L] = Qi(n), {
        modelValue: N,
        ...C
      } = jt.filterProps(e), B = Bv(e);
      return g(jt, de({
        ref: m,
        modelValue: l.value,
        "onUpdate:modelValue": (T) => l.value = T,
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
        default: (T) => {
          let {
            id: j,
            isDisabled: M,
            isDirty: F,
            isReadonly: O,
            isValid: D
          } = T;
          return g(su, de({
            ref: p,
            "prepend-icon": e.prependIcon,
            onMousedown: E,
            onClick: S,
            "onClick:clear": I,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, B, {
            id: j.value,
            active: w.value || F.value,
            dirty: F.value,
            disabled: M.value,
            focused: s.value,
            error: D.value === !1
          }), {
            ...r,
            default: (K) => {
              var me;
              let {
                props: {
                  class: te,
                  ...ce
                }
              } = K;
              return g(Le, null, [g("input", de({
                ref: y,
                type: "file",
                readonly: O.value,
                disabled: M.value,
                multiple: e.multiple,
                name: e.name,
                onClick: (Q) => {
                  Q.stopPropagation(), O.value && Q.preventDefault(), b();
                },
                onChange: (Q) => {
                  if (!Q.target) return;
                  const ue = Q.target;
                  l.value = [...ue.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, ce, L), null), g("div", {
                class: te
              }, [!!((me = l.value) != null && me.length) && (r.selection ? r.selection({
                fileNames: h.value,
                totalBytes: f.value,
                totalBytesReadable: d.value
              }) : e.chips ? h.value.map((Q) => g(Nv, {
                key: Q,
                size: "small",
                color: e.color
              }, {
                default: () => [Q]
              })) : h.value.join(", "))])]);
            }
          });
        },
        details: R ? (T) => {
          var j, M;
          return g(Le, null, [(j = r.details) == null ? void 0 : j.call(r, T), $ && g(Le, null, [g("span", null, null), g(Rv, {
            active: !!((M = l.value) != null && M.length),
            value: v.value
          }, r.counter)])]);
        } : void 0
      });
    }), Qn({}, m, p, y);
  }
}), Dv = Fl.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Hv = Fl.reduce((e, t) => {
  const n = "offset" + Mn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), jv = Fl.reduce((e, t) => {
  const n = "order" + Mn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Sf = {
  col: Object.keys(Dv),
  offset: Object.keys(Hv),
  order: Object.keys(jv)
};
function A2(e, t, n) {
  let i = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return e === "col" && (i = "v-" + i), e === "col" && (n === "" || n === !0) || (i += `-${n}`), i.toLowerCase();
  }
}
const $2 = ["auto", "start", "end", "center", "baseline", "stretch"], N2 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Dv,
  offset: {
    type: [String, Number],
    default: null
  },
  ...Hv,
  order: {
    type: [String, Number],
    default: null
  },
  ...jv,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => $2.includes(e)
  },
  ...Ce(),
  ...qe()
}, "VCol"), $i = fe()({
  name: "VCol",
  props: N2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in Sf)
        Sf[o].forEach((s) => {
          const a = e[s], u = A2(o, s, a);
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
      return $n(e.tag, {
        class: [i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), au = ["start", "end", "center"], zv = ["space-between", "space-around", "space-evenly"];
function uu(e, t) {
  return Fl.reduce((n, i) => {
    const r = e + Mn(i);
    return n[r] = t(), n;
  }, {});
}
const R2 = [...au, "baseline", "stretch"], Gv = (e) => R2.includes(e), Uv = uu("align", () => ({
  type: String,
  default: null,
  validator: Gv
})), O2 = [...au, ...zv], Wv = (e) => O2.includes(e), qv = uu("justify", () => ({
  type: String,
  default: null,
  validator: Wv
})), B2 = [...au, ...zv, "stretch"], Yv = (e) => B2.includes(e), Kv = uu("alignContent", () => ({
  type: String,
  default: null,
  validator: Yv
})), Cf = {
  align: Object.keys(Uv),
  justify: Object.keys(qv),
  alignContent: Object.keys(Kv)
}, F2 = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function D2(e, t, n) {
  let i = F2[e];
  if (n != null) {
    if (t) {
      const r = t.replace(e, "");
      i += `-${r}`;
    }
    return i += `-${n}`, i.toLowerCase();
  }
}
const H2 = Z({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Gv
  },
  ...Uv,
  justify: {
    type: String,
    default: null,
    validator: Wv
  },
  ...qv,
  alignContent: {
    type: String,
    default: null,
    validator: Yv
  },
  ...Kv,
  ...Ce(),
  ...qe()
}, "VRow"), yt = fe()({
  name: "VRow",
  props: H2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = k(() => {
      const r = [];
      let o;
      for (o in Cf)
        Cf[o].forEach((l) => {
          const s = e[l], a = D2(o, l, s);
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
      return $n(e.tag, {
        class: ["v-row", i.value, e.class],
        style: e.style
      }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), al = er("v-spacer", "div", "VSpacer"), Xv = Symbol.for("vuetify:selection-control-group"), cu = Z({
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
    default: Si
  },
  ...Ce(),
  ...Gt(),
  ...Xe()
}, "SelectionControlGroup"), j2 = Z({
  ...cu({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup"), z2 = fe()({
  name: "VSelectionControlGroup",
  props: j2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = xt(), o = k(() => e.id || `v-selection-control-group-${r}`), l = k(() => e.name || o.value), s = /* @__PURE__ */ new Set();
    return lt(Xv, {
      modelValue: i,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), mt(() => {
          s.delete(a);
        });
      }
    }), bn({
      [e.defaultsTarget]: {
        color: le(e, "color"),
        disabled: le(e, "disabled"),
        density: le(e, "density"),
        error: le(e, "error"),
        inline: le(e, "inline"),
        modelValue: i,
        multiple: k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)),
        name: l,
        falseIcon: le(e, "falseIcon"),
        trueIcon: le(e, "trueIcon"),
        readonly: le(e, "readonly"),
        ripple: le(e, "ripple"),
        type: le(e, "type"),
        valueComparator: le(e, "valueComparator")
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
}), jl = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Ce(),
  ...cu()
}, "VSelectionControl");
function G2(e) {
  const t = He(Xv, void 0), {
    densityClasses: n
  } = an(e), i = $e(e, "modelValue"), r = k(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), o = k(() => e.falseValue !== void 0 ? e.falseValue : !1), l = k(() => !!e.multiple || e.multiple == null && Array.isArray(i.value)), s = k({
    get() {
      const h = t ? t.modelValue.value : i.value;
      return l.value ? gn(h).some((v) => e.valueComparator(v, r.value)) : e.valueComparator(h, r.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? r.value : o.value;
      let m = v;
      l.value && (m = h ? [...gn(i.value), v] : gn(i.value).filter((p) => !e.valueComparator(p, r.value))), t ? t.modelValue.value = m : i.value = m;
    }
  }), {
    textColorClasses: a,
    textColorStyles: u
  } = en(k(() => {
    if (!(e.error || e.disabled))
      return s.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: c,
    backgroundColorStyles: f
  } = Tt(k(() => s.value && !e.error && !e.disabled ? e.color : void 0)), d = k(() => s.value ? e.trueIcon : e.falseIcon);
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
const Xi = fe()({
  name: "VSelectionControl",
  directives: {
    Ripple: Ei
  },
  inheritAttrs: !1,
  props: jl(),
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
    } = G2(e), h = xt(), v = be(!1), m = be(!1), p = ee(), y = k(() => e.id || `input-${h}`), w = k(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function x(S) {
      w.value && (v.value = !0, el(S.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function b() {
      v.value = !1, m.value = !1;
    }
    function _(S) {
      S.stopPropagation();
    }
    function E(S) {
      w.value && (e.readonly && r && Ke(() => r.forceUpdate()), s.value = S.target.checked);
    }
    return he(() => {
      var H, L;
      const S = i.label ? i.label({
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label, [I, $] = Qi(n), R = g("input", de({
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
      }), We(g("div", {
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
      })) ?? g(Le, null, [l.value && g(je, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[nn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), S && g(Hl, {
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
}), U2 = Z({
  ...jl({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio"), kf = fe()({
  name: "VRadio",
  props: U2(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return he(() => g(Xi, de(e, {
      class: ["v-radio", e.class],
      style: e.style,
      type: "radio"
    }), n)), {};
  }
}), W2 = Z({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...Vi(),
  ...zt(cu(), ["multiple"]),
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
}, "VRadioGroup"), q2 = fe()({
  name: "VRadioGroup",
  inheritAttrs: !1,
  props: W2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i
    } = t;
    const r = xt(), o = k(() => e.id || `radio-group-${r}`), l = $e(e, "modelValue");
    return he(() => {
      const [s, a] = Qi(n), u = jt.filterProps(e), c = Xi.filterProps(e), f = i.label ? i.label({
        label: e.label,
        props: {
          for: o.value
        }
      }) : e.label;
      return g(jt, de({
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
          return g(Le, null, [f && g(Hl, {
            id: h.value
          }, {
            default: () => [f]
          }), g(z2, de(c, {
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
function Y2(e) {
  const t = be(e);
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
  return mt(i), {
    clear: i,
    time: t,
    start: o,
    reset: r
  };
}
const K2 = Z({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...Jr({
    location: "bottom"
  }),
  ...$l(),
  ..._t(),
  ...On(),
  ...Xe(),
  ...zt(no({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), Js = fe()({
  name: "VSnackbar",
  props: K2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      locationStyles: r
    } = Qr(e), {
      positionClasses: o
    } = Nl(e), {
      scopeId: l
    } = to(), {
      themeClasses: s
    } = tt(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = nr(e), {
      roundedClasses: f
    } = St(e), d = Y2(Number(e.timeout)), h = ee(), v = ee(), m = be(!1);
    we(i, y), we(() => e.timeout, y), rn(() => {
      i.value && y();
    });
    let p = -1;
    function y() {
      d.reset(), window.clearTimeout(p);
      const _ = Number(e.timeout);
      if (!i.value || _ === -1) return;
      const E = $r(v.value);
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
      const _ = Xn.filterProps(e), E = !!(n.default || n.text || e.text);
      return g(Xn, de({
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
          return [tr(!1, "v-snackbar"), e.timer && !m.value && g("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [g(uv, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": d.time.value
          }, null)]), E && g("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((S = n.text) == null ? void 0 : S.call(n)) ?? e.text, (I = n.default) == null ? void 0 : I.call(n)]), n.actions && g(et, {
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
    }), Qn({}, h);
  }
}), Zv = Symbol.for("vuetify:v-tabs"), X2 = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...zt(pv({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Qs = fe()({
  name: "VTab",
  props: X2(),
  setup(e, t) {
    let {
      slots: n,
      attrs: i
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = en(e, "sliderColor"), l = ee(), s = ee(), a = k(() => e.direction === "horizontal"), u = k(() => {
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
        fi(p, {
          backgroundColor: [y, "currentcolor"],
          transform: [`translate${_}(${R}px) scale${_}(${C})`, `translate${_}(${R / B}px) scale${_}(${(N - 1) / B + 1})`, "none"],
          transformOrigin: Array(3).fill(H)
        }, {
          duration: 225,
          easing: Rr
        });
      }
    }
    return he(() => {
      const f = ot.filterProps(e);
      return g(ot, de({
        symbol: Zv,
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
          return g(Le, null, [((d = n.default) == null ? void 0 : d.call(n)) ?? e.text, !e.hideSlider && g("div", {
            ref: s,
            class: ["v-tab__slider", r.value],
            style: o.value
          }, null)]);
        }
      });
    }), Qn({}, l);
  }
});
function Z2(e) {
  return e ? e.map((t) => Zo(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const J2 = Z({
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
  ...ru({
    mandatory: "force"
  }),
  ...Gt(),
  ...qe()
}, "VTabs"), Q2 = fe()({
  name: "VTabs",
  props: J2(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), r = k(() => Z2(e.items)), {
      densityClasses: o
    } = an(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: s
    } = Tt(le(e, "bgColor"));
    return bn({
      VTab: {
        color: le(e, "color"),
        direction: le(e, "direction"),
        stacked: le(e, "stacked"),
        fixed: le(e, "fixedTabs"),
        sliderColor: le(e, "sliderColor"),
        hideSlider: le(e, "hideSlider")
      }
    }), he(() => {
      const a = sl.filterProps(e);
      return g(sl, de(a, {
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
        symbol: Zv
      }), {
        default: () => [n.default ? n.default() : r.value.map((u) => g(Qs, de(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), eS = Z({
  id: String,
  text: String,
  ...zt(no({
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
}, "VTooltip"), zi = fe()({
  name: "VTooltip",
  props: eS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = to(), o = xt(), l = k(() => e.id || `v-tooltip-${o}`), s = ee(), a = k(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = k(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = k(() => e.transition ? e.transition : i.value ? "scale-transition" : "fade-transition"), f = k(() => de({
      "aria-describedby": l.value
    }, e.activatorProps));
    return he(() => {
      const d = Xn.filterProps(e);
      return g(Xn, de({
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
    }), Qn({}, s);
  }
}), tS = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: i,
    touchendY: r
  } = e, o = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = r - i, Math.abs(e.offsetY) < o * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && r < i - l && e.up(e), e.down && r > i + l && e.down(e));
};
function nS(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (i = t.start) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function iS(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (i = t.end) == null || i.call(t, {
    originalEvent: e,
    ...t
  }), tS(t);
}
function rS(e, t) {
  var i;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (i = t.move) == null || i.call(t, {
    originalEvent: e,
    ...t
  });
}
function oS() {
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
    touchstart: (n) => nS(n, t),
    touchend: (n) => iS(n, t),
    touchmove: (n) => rS(n, t)
  };
}
function lS(e, t) {
  var s;
  const n = t.value, i = n != null && n.parent ? e.parentElement : e, r = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, o = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!i || !o) return;
  const l = oS(t.value);
  i._touchHandlers = i._touchHandlers ?? /* @__PURE__ */ Object.create(null), i._touchHandlers[o] = l, Ph(l).forEach((a) => {
    i.addEventListener(a, l[a], r);
  });
}
function sS(e, t) {
  var o, l;
  const n = (o = t.value) != null && o.parent ? e.parentElement : e, i = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !i) return;
  const r = n._touchHandlers[i];
  Ph(r).forEach((s) => {
    n.removeEventListener(s, r[s]);
  }), delete n._touchHandlers[i];
}
const Jv = {
  mounted: lS,
  unmounted: sS
}, aS = Jv, Qv = Symbol.for("vuetify:v-window"), em = Symbol.for("vuetify:v-window-group"), uS = Z({
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
  ...Ce(),
  ...qe(),
  ...Xe()
}, "VWindow"), cS = fe()({
  name: "VWindow",
  directives: {
    Touch: Jv
  },
  props: uS(),
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
    } = un(), {
      t: o
    } = Zr(), l = Yr(e, em), s = ee(), a = k(() => r.value ? !e.reverse : e.reverse), u = be(!1), c = k(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), f = be(0), d = ee(void 0), h = k(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    we(h, (b, _) => {
      const E = l.items.value.length, S = E - 1;
      E <= 2 ? u.value = b < _ : b === S && _ === 0 ? u.value = !0 : b === 0 && _ === S ? u.value = !1 : u.value = b < _;
    }), lt(Qv, {
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
      }) : g(ot, _, null) : g("div", null, null));
      const E = {
        icon: r.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": o("$vuetify.carousel.next")
      };
      return b.push(m.value ? n.next ? n.next({
        props: E
      }) : g(ot, E, null) : g("div", null, null)), b;
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
    return he(() => We(g(e.tag, {
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
    }), [[nn("touch"), x.value]])), {
      group: l
    };
  }
});
function tm() {
  const e = be(!1);
  return rn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: k(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: jr(e)
  };
}
const fS = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...Ce(),
  ...Pl(),
  ...Dl()
}, "VWindowItem"), Ef = fe()({
  name: "VWindowItem",
  directives: {
    Touch: aS
  },
  props: fS(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Qv), r = Tl(e, em), {
      isBooted: o
    } = tm();
    if (!i || !r) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = be(!1), s = k(() => o.value && (i.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
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
      l.value && Ke(() => {
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
    } = nu(e, r.isSelected);
    return he(() => g(En, {
      transition: d.value,
      disabled: !o.value
    }, {
      default: () => {
        var v;
        return [We(g("div", {
          class: ["v-window-item", r.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[Ht, r.isSelected.value]])];
      }
    })), {
      groupItem: r
    };
  }
}), dS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Select File", -1), hS = /* @__PURE__ */ Ne("p", null, " Files in a specific JSON format or trivial graph format are supported. ", -1), vS = /* @__PURE__ */ Ne("p", null, [
  /* @__PURE__ */ Je("Importing will "),
  /* @__PURE__ */ Ne("strong", null, "replace"),
  /* @__PURE__ */ Je(" your current graph.")
], -1), mS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Select Format", -1), gS = /* @__PURE__ */ Ne("h3", { class: "heading" }, "Preview", -1), yS = /* @__PURE__ */ Ne("strong", null, "copy", -1), pS = /* @__PURE__ */ Ji({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null },
    graphAsJson: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = ee(!1), o = ee(0), l = ee(), s = ee("JSON"), a = ee(!1), u = ee(!1), c = ee(""), f = ee(""), d = k(
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
    return (w, x) => (Et(), vn(iu, {
      modelValue: r.value,
      "onUpdate:modelValue": x[8] || (x[8] = (b) => r.value = b),
      "max-width": "800px"
    }, {
      activator: ae(({ props: b }) => [
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ae(({ props: _ }) => [
            g(ot, de({
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
        g(Qa, null, {
          default: ae(() => [
            g(Fr, null, {
              default: ae(() => [
                g(Q2, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[0] || (x[0] = (b) => o.value = b)
                }, {
                  default: ae(() => [
                    g(Qs, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ae(() => [
                        Je("Import")
                      ]),
                      _: 1
                    }),
                    g(Qs, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ae(() => [
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
            g(xr, null, {
              default: ae(() => [
                g(cS, {
                  modelValue: o.value,
                  "onUpdate:modelValue": x[3] || (x[3] = (b) => o.value = b),
                  class: "ml-4"
                }, {
                  default: ae(() => [
                    g(Ef, null, {
                      default: ae(() => [
                        dS,
                        g(M2, {
                          modelValue: l.value,
                          "onUpdate:modelValue": x[1] || (x[1] = (b) => l.value = b),
                          accept: ".tgf, .json",
                          density: "compact",
                          label: "Graph Format File",
                          rules: h,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        g(xr, null, {
                          default: ae(() => [
                            hS,
                            vS
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    g(Ef, null, {
                      default: ae(() => [
                        mS,
                        g(q2, {
                          inline: "",
                          modelValue: s.value,
                          "onUpdate:modelValue": x[2] || (x[2] = (b) => s.value = b)
                        }, {
                          default: ae(() => [
                            g(kf, {
                              label: "JSON",
                              value: "JSON"
                            }),
                            g(kf, {
                              label: "TGF",
                              value: "TGF"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        gS,
                        We(Ne("pre", null, Rt(n.graphAsJson), 513), [
                          [Ht, s.value === "JSON"]
                        ]),
                        We(Ne("pre", null, Rt(n.graphAsTgf), 513), [
                          [Ht, s.value === "TGF"]
                        ]),
                        g(xr, null, {
                          default: ae(() => [
                            Je("This export action will "),
                            yS,
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
            g(Bl, null, {
              default: ae(() => [
                g(al),
                g(ot, {
                  color: "secondary",
                  variant: "text",
                  disabled: !d.value,
                  onClick: x[4] || (x[4] = (b) => m())
                }, {
                  default: ae(() => [
                    Je("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                g(ot, {
                  color: "secondary",
                  variant: "text",
                  onClick: x[5] || (x[5] = (b) => p())
                }, {
                  default: ae(() => [
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
        g(Js, {
          modelValue: u.value,
          "onUpdate:modelValue": x[6] || (x[6] = (b) => u.value = b),
          color: "error",
          variant: "tonal"
        }, {
          default: ae(() => [
            g(yt, { align: "center" }, {
              default: ae(() => [
                g(je, {
                  icon: "$error",
                  class: "ml-2"
                }),
                g($i, null, {
                  default: ae(() => [
                    Ne("h4", null, Rt(c.value), 1),
                    Ne("p", null, Rt(f.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        g(Js, {
          modelValue: a.value,
          "onUpdate:modelValue": x[7] || (x[7] = (b) => a.value = b),
          timeout: 1500
        }, {
          default: ae(() => [
            g(je, {
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
}), bS = ".heading{margin-top:10px;margin-bottom:10px}", fu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, wS = /* @__PURE__ */ fu(pS, [["styles", [bS]]]), xS = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...Ce(),
  ...Gt(),
  ...qe(),
  ...Xe()
}, "VTable"), _S = fe()({
  name: "VTable",
  props: xS(),
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const {
      themeClasses: r
    } = tt(e), {
      densityClasses: o
    } = an(e);
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
}), SS = { class: "text-left" }, CS = { class: "text-left" }, kS = { class: "text-left" }, ES = /* @__PURE__ */ Ji({
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
    ], n = ee(!1), i = ["Action", "Desktop", "Mobile"];
    return (r, o) => (Et(), vn(iu, {
      modelValue: n.value,
      "onUpdate:modelValue": o[1] || (o[1] = (l) => n.value = l),
      "max-width": "800px"
    }, {
      activator: ae(({ props: l }) => [
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ae(({ props: s }) => [
            g(ot, de({
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
        g(Qa, null, {
          default: ae(() => [
            g(Fr, { class: "card-header" }, {
              default: ae(() => [
                Je("Controls")
              ]),
              _: 1
            }),
            g(_S, {
              density: "comfortable",
              "fixed-header": ""
            }, {
              default: ae(() => [
                Ne("thead", null, [
                  Ne("tr", null, [
                    Ne("th", SS, Rt(i[0]), 1),
                    Ne("th", CS, Rt(i[1]), 1),
                    Ne("th", kS, Rt(i[2]), 1)
                  ])
                ]),
                Ne("tbody", null, [
                  (Et(), Ls(Le, null, Dg(t, (l) => Ne("tr", {
                    key: l.action
                  }, [
                    Ne("td", null, Rt(l.action), 1),
                    Ne("td", null, Rt(l.desktop), 1),
                    Ne("td", null, Rt(l.mobile), 1)
                  ])), 64))
                ])
              ]),
              _: 1
            }),
            g(Bl, null, {
              default: ae(() => [
                g(al),
                g(ot, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: o[0] || (o[0] = (l) => n.value = !1)
                }, {
                  default: ae(() => [
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
}), VS = ".v-data-table-header-mobile tr:first-child th[data-v-6c8401af]{height:0!important}", LS = /* @__PURE__ */ fu(ES, [["styles", [VS]], ["__scopeId", "data-v-6c8401af"]]), nm = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Me,
    default: "$checkboxIndeterminate"
  },
  ...jl({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), ea = fe()({
  name: "VCheckboxBtn",
  props: nm(),
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
      const a = zt(Xi.filterProps(e), ["modelValue"]);
      return g(Xi, de(a, {
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
}), IS = Z({
  ...Vi(),
  ...zt(nm(), ["inline"])
}, "VCheckbox"), PS = fe()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: IS(),
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
    } = ir(e), a = xt(), u = k(() => e.id || `checkbox-${a}`);
    return he(() => {
      const [c, f] = Qi(n), d = jt.filterProps(e), h = ea.filterProps(e);
      return g(jt, de({
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
          return g(ea, de(h, {
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
}), TS = Z({
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
  ...Ce()
}, "VColorPickerCanvas"), MS = sn({
  name: "VColorPickerCanvas",
  props: TS(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = be(!1), r = ee(), o = be(parseFloat(e.width)), l = be(parseFloat(e.height)), s = ee({
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
          s: Lt(y, 0, o.value) / o.value,
          v: 1 - Lt(w, 0, l.value) / l.value,
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
    } = Ki((p) => {
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
        x: Lt(p - x, 0, _),
        y: Lt(y - b, 0, E)
      };
    }
    function d(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !r.value) return;
      i.value = !0;
      const y = _x(p);
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
    return we(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, m, {
      immediate: !0
    }), we(() => [o.value, l.value], (p, y) => {
      m(), s.value = {
        x: a.value.x * p[0] / y[0],
        y: a.value.y * p[1] / y[1]
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
    }), rn(() => m()), he(() => g("div", {
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
function AS(e, t) {
  if (t) {
    const {
      a: n,
      ...i
    } = e;
    return i;
  }
  return e;
}
function $S(e, t) {
  if (t == null || typeof t == "string") {
    const n = Kh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return ci(t, ["r", "g", "b"]) ? n = Tn(e) : ci(t, ["h", "s", "l"]) ? n = zh(e) : ci(t, ["h", "s", "v"]) && (n = e), AS(n, !ci(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Ni = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, ta = {
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
  to: Tn,
  from: Ll
};
var Nf;
const NS = {
  ...ta,
  inputs: (Nf = ta.inputs) == null ? void 0 : Nf.slice(0, 3)
}, na = {
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
  to: zh,
  from: Wa
}, RS = {
  ...na,
  inputs: na.inputs.slice(0, 3)
}, im = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (e) => e,
    getColor: (e, t) => t
  }],
  to: Kh,
  from: Yh
}, OS = {
  ...im,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, yi = {
  rgb: NS,
  rgba: ta,
  hsl: RS,
  hsla: na,
  hex: OS,
  hexa: im
}, BS = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return g("div", {
    class: "v-color-picker-edit__input"
  }, [g("input", n, null), g("span", null, [t])]);
}, FS = Z({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(yi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(yi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(yi).includes(t))
  },
  ...Ce()
}, "VColorPickerEdit"), DS = sn({
  name: "VColorPickerEdit",
  props: FS(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = k(() => e.modes.map((o) => ({
      ...yi[o],
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
            h && n("update:color", o.from(c(l ?? o.to(Ni), h.value)));
          }
        };
      });
    });
    return he(() => {
      var o;
      return g("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(o = r.value) == null ? void 0 : o.map((l) => g(BS, l, null)), i.value.length > 1 && g(ot, {
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
}), du = Symbol.for("vuetify:v-slider");
function HS(e, t, n) {
  const i = n === "vertical", r = t.getBoundingClientRect(), o = "touches" in e ? e.touches[0] : e;
  return i ? o.clientY - (r.top + r.height / 2) : o.clientX - (r.left + r.width / 2);
}
function jS(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const zS = Z({
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
  ..._t(),
  ...Nn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), GS = (e) => {
  const t = k(() => parseFloat(e.min)), n = k(() => parseFloat(e.max)), i = k(() => +e.step > 0 ? parseFloat(e.step) : 0), r = k(() => Math.max(Ac(i.value), Ac(t.value)));
  function o(l) {
    if (l = parseFloat(l), i.value <= 0) return l;
    const s = Lt(l, t.value, n.value), a = t.value % i.value, u = Math.round((s - a) / i.value) * i.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(r.value));
  }
  return {
    min: t,
    max: n,
    step: i,
    decimals: r,
    roundValue: o
  };
}, US = (e) => {
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
  } = un(), a = le(t, "reverse"), u = k(() => t.direction === "vertical"), c = k(() => u.value !== a.value), {
    min: f,
    max: d,
    step: h,
    decimals: v,
    roundValue: m
  } = n, p = k(() => parseInt(t.thumbSize, 10)), y = k(() => parseInt(t.tickSize, 10)), w = k(() => parseInt(t.trackSize, 10)), x = k(() => (d.value - f.value) / h.value), b = le(t, "disabled"), _ = k(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = k(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), S = k(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), I = be(!1), $ = be(0), R = ee(), H = ee();
  function L(Q) {
    var z;
    const ue = t.direction === "vertical", Ee = ue ? "top" : "left", Ze = ue ? "height" : "width", st = ue ? "clientY" : "clientX", {
      [Ee]: Ut,
      [Ze]: cn
    } = (z = R.value) == null ? void 0 : z.$el.getBoundingClientRect(), V = jS(Q, st);
    let P = Math.min(Math.max((V - Ut - $.value) / cn, 0), 1) || 0;
    return (ue ? c.value : c.value !== s.value) && (P = 1 - P), m(f.value + P * (d.value - f.value));
  }
  const N = (Q) => {
    o({
      value: L(Q)
    }), I.value = !1, $.value = 0;
  }, C = (Q) => {
    H.value = l(Q), H.value && (H.value.focus(), I.value = !0, H.value.contains(Q.target) ? $.value = HS(Q, H.value, t.direction) : ($.value = 0, r({
      value: L(Q)
    })), i({
      value: L(Q)
    }));
  }, B = {
    passive: !0,
    capture: !0
  };
  function T(Q) {
    r({
      value: L(Q)
    });
  }
  function j(Q) {
    Q.stopPropagation(), Q.preventDefault(), N(Q), window.removeEventListener("mousemove", T, B), window.removeEventListener("mouseup", j);
  }
  function M(Q) {
    var ue;
    N(Q), window.removeEventListener("touchmove", T, B), (ue = Q.target) == null || ue.removeEventListener("touchend", M);
  }
  function F(Q) {
    var ue;
    C(Q), window.addEventListener("touchmove", T, B), (ue = Q.target) == null || ue.addEventListener("touchend", M, {
      passive: !1
    });
  }
  function O(Q) {
    Q.preventDefault(), C(Q), window.addEventListener("mousemove", T, B), window.addEventListener("mouseup", j, {
      passive: !1
    });
  }
  const D = (Q) => {
    const ue = (Q - f.value) / (d.value - f.value) * 100;
    return Lt(isNaN(ue) ? 0 : ue, 0, 100);
  }, K = le(t, "showTicks"), te = k(() => K.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((Q) => ({
    value: Q,
    position: D(Q),
    label: Q.toString()
  })) : Object.keys(t.ticks).map((Q) => ({
    value: parseFloat(Q),
    position: D(parseFloat(Q)),
    label: t.ticks[Q]
  })) : x.value !== 1 / 0 ? Ha(x.value + 1).map((Q) => {
    const ue = f.value + Q * h.value;
    return {
      value: ue,
      position: D(ue)
    };
  }) : [] : []), ce = k(() => te.value.some((Q) => {
    let {
      label: ue
    } = Q;
    return !!ue;
  })), me = {
    activeThumbRef: H,
    color: le(t, "color"),
    decimals: v,
    disabled: b,
    direction: le(t, "direction"),
    elevation: le(t, "elevation"),
    hasLabels: ce,
    isReversed: a,
    indexFromEnd: c,
    min: f,
    max: d,
    mousePressed: I,
    numTicks: x,
    onSliderMousedown: O,
    onSliderTouchstart: F,
    parsedTicks: te,
    parseMouseMove: L,
    position: D,
    readonly: le(t, "readonly"),
    rounded: le(t, "rounded"),
    roundValue: m,
    showTicks: K,
    startOffset: $,
    step: h,
    thumbSize: p,
    thumbColor: _,
    thumbLabel: le(t, "thumbLabel"),
    ticks: le(t, "ticks"),
    tickSize: y,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: S,
    trackSize: w,
    vertical: u
  };
  return lt(du, me), me;
}, WS = Z({
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
  ...Ce()
}, "VSliderThumb"), qS = fe()({
  name: "VSliderThumb",
  directives: {
    Ripple: Ei
  },
  props: WS(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: i
    } = t;
    const r = He(du), {
      isRtl: o,
      rtlClasses: l
    } = un();
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
    } = Rn(b), {
      textColorClasses: E,
      textColorStyles: S
    } = en(s), {
      pageup: I,
      pagedown: $,
      end: R,
      home: H,
      left: L,
      right: N,
      down: C,
      up: B
    } = px, T = [I, $, R, H, L, N, C, B], j = k(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function M(O, D) {
      if (!T.includes(O.key)) return;
      O.preventDefault();
      const K = a.value || 0.1, te = (e.max - e.min) / K;
      if ([L, N, C, B].includes(O.key)) {
        const me = (v.value ? [o.value ? L : N, h.value ? C : B] : x.value !== o.value ? [L, B] : [N, B]).includes(O.key) ? 1 : -1, Q = O.shiftKey ? 2 : O.ctrlKey ? 1 : 0;
        D = D + me * K * j.value[Q];
      } else if (O.key === H)
        D = e.min;
      else if (O.key === R)
        D = e.max;
      else {
        const ce = O.key === $ ? 1 : -1;
        D = D - ce * K * (te > 100 ? te / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, D));
    }
    function F(O) {
      const D = M(O, e.modelValue);
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
      }, null), We(g("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: S.value
      }, null), [[nn("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), g(kv, {
        origin: "bottom center"
      }, {
        default: () => {
          var D;
          return [We(g("div", {
            class: "v-slider-thumb__label-container"
          }, [g("div", {
            class: ["v-slider-thumb__label"]
          }, [g("div", null, [((D = n["thumb-label"]) == null ? void 0 : D.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[Ht, f.value && e.focused || f.value === "always"]])];
        }
      })]);
    }), {};
  }
}), YS = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...Ce()
}, "VSliderTrack"), KS = fe()({
  name: "VSliderTrack",
  props: YS(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(du);
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
    } = St(l), {
      backgroundColorClasses: y,
      backgroundColorStyles: w
    } = Tt(c), {
      backgroundColorClasses: x,
      backgroundColorStyles: b
    } = Tt(u), _ = k(() => `inset-${d.value ? "block" : "inline"}-${m.value ? "end" : "start"}`), E = k(() => d.value ? "height" : "width"), S = k(() => ({
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
}), XS = Z({
  ...ou(),
  ...zS(),
  ...Vi(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), Vf = fe()({
  name: "VSlider",
  props: XS(),
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
    } = un(), l = GS(e), s = $e(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
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
    } = US({
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
    } = ir(e), _ = k(() => m(s.value));
    return he(() => {
      const E = jt.filterProps(e), S = !!(e.label || n.label || n.prepend);
      return g(jt, de({
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
          return g(Le, null, [(($ = n.label) == null ? void 0 : $.call(n, I)) ?? (e.label ? g(Hl, {
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
          }, null), g(KS, {
            ref: v,
            start: 0,
            stop: _.value
          }, {
            "tick-label": n["tick-label"]
          }), g(qS, {
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
}), ZS = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...Ce()
}, "VColorPickerPreview"), JS = sn({
  name: "VColorPickerPreview",
  props: ZS(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const i = new AbortController();
    bl(() => i.abort());
    async function r() {
      if (!Pc) return;
      const o = new window.EyeDropper();
      try {
        const l = await o.open({
          signal: i.signal
        }), s = Yh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Ni,
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
      }, [Pc && g("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [g(ot, {
        onClick: r,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), g("div", {
        class: "v-color-picker-preview__dot"
      }, [g("div", {
        style: {
          background: Uh(e.color ?? Ni)
        }
      }, null)]), g("div", {
        class: "v-color-picker-preview__sliders"
      }, [g(Vf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (o = e.color) == null ? void 0 : o.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ni,
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
      }, null), !e.hideAlpha && g(Vf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ni,
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
}), QS = {
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
}, eC = {
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
}, tC = {
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
}, nC = {
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
}, iC = {
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
}, rC = {
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
}, oC = {
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
}, lC = {
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
}, sC = {
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
}, aC = {
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
}, uC = {
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
}, cC = {
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
}, fC = {
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
}, dC = {
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
}, hC = {
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
}, vC = {
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
}, mC = {
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
}, gC = {
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
}, yC = {
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
}, pC = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, bC = {
  red: QS,
  pink: eC,
  purple: tC,
  deepPurple: nC,
  indigo: iC,
  blue: rC,
  lightBlue: oC,
  cyan: lC,
  teal: sC,
  green: aC,
  lightGreen: uC,
  lime: cC,
  yellow: fC,
  amber: dC,
  orange: hC,
  deepOrange: vC,
  brown: mC,
  blueGrey: gC,
  grey: yC,
  shades: pC
}, wC = Z({
  swatches: {
    type: Array,
    default: () => xC(bC)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...Ce()
}, "VColorPickerSwatches");
function xC(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const _C = sn({
  name: "VColorPickerSwatches",
  props: wC(),
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
      const o = Bt(r), l = Ll(o), s = Gh(o);
      return g("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [g("div", {
        style: {
          background: s
        }
      }, [e.color && Si(e.color, l) ? g(je, {
        size: "x-small",
        icon: "$success",
        color: qx(r, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), rm = Z({
  color: String,
  ...Ci(),
  ...Ce(),
  ...Zn(),
  ...Nn(),
  ...Jr(),
  ...$l(),
  ..._t(),
  ...qe(),
  ...Xe()
}, "VSheet"), Lf = fe()({
  name: "VSheet",
  props: rm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Tt(le(e, "color")), {
      borderClasses: l
    } = ki(e), {
      dimensionStyles: s
    } = Jn(e), {
      elevationClasses: a
    } = Rn(e), {
      locationStyles: u
    } = Qr(e), {
      positionClasses: c
    } = Nl(e), {
      roundedClasses: f
    } = St(e);
    return he(() => g(e.tag, {
      class: ["v-sheet", i.value, r.value, l.value, a.value, c.value, f.value, e.class],
      style: [o.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), SC = Z({
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
    validator: (e) => Object.keys(yi).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(yi),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(yi).includes(t))
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
  ...zt(rm({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), CE = sn({
  name: "VColorPicker",
  props: SC(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = $e(e, "mode"), n = ee(null), i = $e(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = Ll(Bt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? $S(a, e.modelValue) : null), r = k(() => i.value ? {
      ...i.value,
      h: n.value ?? i.value.h
    } : null), {
      rtlClasses: o
    } = un();
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
    return rn(() => {
      e.modes.includes(t.value) || (t.value = e.modes[0]);
    }), bn({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    }), he(() => {
      const a = Lf.filterProps(e);
      return g(Lf, de({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", o.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Uh({
            ...r.value ?? Ni,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && g(MS, {
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
        }, [!e.hideSliders && g(JS, {
          key: "preview",
          color: r.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && g(DS, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: r.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && g(_C, {
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
}), Dr = Symbol.for("vuetify:v-expansion-panel"), CC = ["default", "accordion", "inset", "popout"], kC = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => CC.includes(e)
  },
  readonly: Boolean,
  ...Ce(),
  ...Il(),
  ...qe(),
  ...Xe()
}, "VExpansionPanels"), If = fe()({
  name: "VExpansionPanels",
  props: kC(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    Yr(e, Dr);
    const {
      themeClasses: i
    } = tt(e), r = k(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
    return bn({
      VExpansionPanel: {
        color: le(e, "color"),
        readonly: le(e, "readonly")
      },
      VExpansionPanelTitle: {
        focusable: le(e, "focusable"),
        static: le(e, "static")
      }
    }), he(() => g(e.tag, {
      class: ["v-expansion-panels", {
        "v-expansion-panels--flat": e.flat,
        "v-expansion-panels--tile": e.tile
      }, i.value, r.value, e.class],
      style: e.style
    }, n)), {};
  }
}), EC = Z({
  ...Ce(),
  ...Dl()
}, "VExpansionPanelText"), VC = fe()({
  name: "VExpansionPanelText",
  props: EC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Dr);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: r,
      onAfterLeave: o
    } = nu(e, i.isSelected);
    return he(() => g(Vv, {
      onAfterLeave: o
    }, {
      default: () => {
        var l;
        return [We(g("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && r.value && g("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[Ht, i.isSelected.value]])];
      }
    })), {};
  }
}), om = Z({
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
  ...Ce()
}, "VExpansionPanelTitle"), LC = fe()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Ei
  },
  props: om(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = He(Dr);
    if (!i) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Tt(e, "color"), l = k(() => ({
      collapseIcon: e.collapseIcon,
      disabled: i.disabled.value,
      expanded: i.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return he(() => {
      var s;
      return We(g("button", {
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
      }, [n.actions ? n.actions(l.value) : g(je, {
        icon: i.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[nn("ripple"), e.ripple]]);
    }), {};
  }
}), IC = Z({
  title: String,
  text: String,
  bgColor: String,
  ...Ce(),
  ...Nn(),
  ...Pl(),
  ...Dl(),
  ..._t(),
  ...qe(),
  ...om()
}, "VExpansionPanel"), kE = fe()({
  name: "VExpansionPanel",
  props: IC(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = Tl(e, Dr), {
      backgroundColorClasses: r,
      backgroundColorStyles: o
    } = Tt(e, "bgColor"), {
      elevationClasses: l
    } = Rn(e), {
      roundedClasses: s
    } = St(e), a = k(() => (i == null ? void 0 : i.disabled.value) || e.disabled), u = k(() => i.group.items.value.reduce((d, h, v) => (i.group.selected.value.includes(h.id) && d.push(v), d), [])), c = k(() => {
      const d = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - d === 1);
    }), f = k(() => {
      const d = i.group.items.value.findIndex((h) => h.id === i.id);
      return !i.isSelected.value && u.value.some((h) => h - d === -1);
    });
    return lt(Dr, i), bn({
      VExpansionPanelText: {
        eager: le(e, "eager")
      },
      VExpansionPanelTitle: {
        readonly: le(e, "readonly")
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
          }, null), h && g(LC, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), d && g(VC, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), ia = Symbol.for("vuetify:list");
function lm() {
  const e = He(ia, {
    hasPrepend: be(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: be(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return lt(ia, t), e;
}
function sm() {
  return He(ia, null);
}
const hu = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: i,
        value: r,
        activated: o
      } = n;
      return i = Se(i), e && !r && o.size === 1 && o.has(i) || (r ? o.add(i) : o.delete(i)), o;
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
}, am = (e) => {
  const t = hu(e);
  return {
    activate: (i) => {
      let {
        activated: r,
        id: o,
        ...l
      } = i;
      o = Se(o);
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
}, PC = (e) => {
  const t = hu(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = Se(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, TC = (e) => {
  const t = am(e);
  return {
    activate: (i) => {
      let {
        id: r,
        activated: o,
        children: l,
        ...s
      } = i;
      return r = Se(r), l.has(r) ? o : t.activate({
        id: r,
        activated: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, MC = {
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
}, um = {
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
}, AC = {
  open: um.open,
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
}, vu = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o
      } = n;
      if (i = Se(i), e && !r) {
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
}, cm = (e) => {
  const t = vu(e);
  return {
    select: (i) => {
      let {
        selected: r,
        id: o,
        ...l
      } = i;
      o = Se(o);
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
}, $C = (e) => {
  const t = vu(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = Se(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, NC = (e) => {
  const t = cm(e);
  return {
    select: (i) => {
      let {
        id: r,
        selected: o,
        children: l,
        ...s
      } = i;
      return r = Se(r), l.has(r) ? o : t.select({
        id: r,
        selected: o,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, RC = (e) => {
  const t = {
    select: (n) => {
      let {
        id: i,
        value: r,
        selected: o,
        children: l,
        parents: s
      } = n;
      i = Se(i);
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
}, Hr = Symbol.for("vuetify:nested"), fm = {
  id: be(),
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
}, OC = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), BC = (e) => {
  let t = !1;
  const n = ee(/* @__PURE__ */ new Map()), i = ee(/* @__PURE__ */ new Map()), r = $e(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), o = k(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return PC(e.mandatory);
      case "single-leaf":
        return TC(e.mandatory);
      case "independent":
        return hu(e.mandatory);
      case "single-independent":
      default:
        return am(e.mandatory);
    }
  }), l = k(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return NC(e.mandatory);
      case "leaf":
        return $C(e.mandatory);
      case "independent":
        return vu(e.mandatory);
      case "single-independent":
        return cm(e.mandatory);
      case "classic":
      default:
        return RC(e.mandatory);
    }
  }), s = k(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return AC;
      case "single":
        return MC;
      case "multiple":
      default:
        return um;
    }
  }), a = $e(e, "activated", e.activated, (h) => o.value.in(h, n.value, i.value), (h) => o.value.out(h, n.value, i.value)), u = $e(e, "selected", e.selected, (h) => l.value.in(h, n.value, i.value), (h) => l.value.out(h, n.value, i.value));
  on(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let m = h;
    for (; m != null; )
      v.unshift(m), m = i.value.get(m);
    return v;
  }
  const f = it("nested"), d = {
    id: be(),
    root: {
      opened: r,
      activatable: le(e, "activatable"),
      selectable: le(e, "selectable"),
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
  return lt(Hr, d), d.root;
}, dm = (e, t) => {
  const n = He(Hr, fm), i = Symbol(xt()), r = k(() => e.value !== void 0 ? e.value : i), o = {
    ...n,
    id: r,
    open: (l, s) => n.root.open(r.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(r.value, l, s),
    isOpen: k(() => n.root.opened.value.has(r.value)),
    parent: k(() => n.root.parents.value.get(r.value)),
    activate: (l, s) => n.root.activate(r.value, l, s),
    isActivated: k(() => n.root.activated.value.has(Se(r.value))),
    select: (l, s) => n.root.select(r.value, l, s),
    isSelected: k(() => n.root.selected.value.get(Se(r.value)) === "on"),
    isIndeterminate: k(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: k(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), on(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && lt(Hr, o), o;
}, FC = () => {
  const e = He(Hr, fm);
  lt(Hr, {
    ...e,
    isGroupActivator: !0
  });
}, DC = sn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return FC(), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), HC = Z({
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
  ...Ce(),
  ...qe()
}, "VListGroup"), Pf = fe()({
  name: "VListGroup",
  props: HC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: i,
      open: r,
      id: o
    } = dm(le(e, "value"), !0), l = k(() => `v-list-group--id-${String(o.value)}`), s = sm(), {
      isBooted: a
    } = tm();
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
      default: () => [n.activator && g(et, {
        defaults: d.value
      }, {
        default: () => [g(DC, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: i.value
          })]
        })]
      }), g(En, {
        transition: {
          component: Vv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [We(g("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[Ht, i.value]])];
        }
      })]
    })), {
      isOpen: i
    };
  }
}), jC = er("v-list-item-subtitle"), zC = er("v-list-item-title"), GC = Z({
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
  onClick: Qt(),
  onClickOnce: Qt(),
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Zn(),
  ...Nn(),
  ..._t(),
  ...Ol(),
  ...qe(),
  ...Xe(),
  ...On({
    variant: "text"
  })
}, "VListItem"), ul = fe()({
  name: "VListItem",
  directives: {
    Ripple: Ei
  },
  props: GC(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: i,
      emit: r
    } = t;
    const o = Rl(e, n), l = k(() => e.value === void 0 ? o.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: f,
      isGroupActivator: d,
      root: h,
      parent: v,
      openOnSelect: m
    } = dm(l, !1), p = sm(), y = k(() => {
      var O;
      return e.active !== !1 && (e.active || ((O = o.isActive) == null ? void 0 : O.value) || (h.activatable.value ? a.value : c.value));
    }), w = k(() => e.link !== !1 && o.isLink.value), x = k(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = k(() => e.rounded || e.nav), _ = k(() => e.color ?? e.activeColor), E = k(() => ({
      color: y.value ? _.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    we(() => {
      var O;
      return (O = o.isActive) == null ? void 0 : O.value;
    }, (O) => {
      O && v.value != null && h.open(v.value, !0), O && m(O);
    }, {
      immediate: !0
    });
    const {
      themeClasses: S
    } = tt(e), {
      borderClasses: I
    } = ki(e), {
      colorClasses: $,
      colorStyles: R,
      variantClasses: H
    } = nr(E), {
      densityClasses: L
    } = an(e), {
      dimensionStyles: N
    } = Jn(e), {
      elevationClasses: C
    } = Rn(e), {
      roundedClasses: B
    } = St(b), T = k(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), j = k(() => ({
      isActive: y.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: f.value
    }));
    function M(O) {
      var D;
      r("click", O), !(d || !x.value) && ((D = o.navigate) == null || D.call(o, O), h.activatable ? s(!a.value, O) : (h.selectable || e.value != null) && u(!c.value, O));
    }
    function F(O) {
      (O.key === "Enter" || O.key === " ") && (O.preventDefault(), M(O));
    }
    return he(() => {
      const O = w.value ? "a" : e.tag, D = i.title || e.title != null, K = i.subtitle || e.subtitle != null, te = !!(e.appendAvatar || e.appendIcon), ce = !!(te || i.append), me = !!(e.prependAvatar || e.prependIcon), Q = !!(me || i.prepend);
      return p == null || p.updateHasPrepend(Q), e.activeColor && Nx("active-color", ["color", "base-color"]), We(g(O, {
        class: ["v-list-item", {
          "v-list-item--active": y.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": x.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !Q && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && y.value
        }, S.value, I.value, $.value, L.value, C.value, T.value, B.value, H.value, e.class],
        style: [R.value, N.value, e.style],
        href: o.href.value,
        tabindex: x.value ? p ? -2 : 0 : void 0,
        onClick: M,
        onKeydown: x.value && !w.value && F
      }, {
        default: () => {
          var ue;
          return [tr(x.value || y.value, "v-list-item"), Q && g("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [i.prepend ? g(et, {
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
              var Ee;
              return [(Ee = i.prepend) == null ? void 0 : Ee.call(i, j.value)];
            }
          }) : g(Le, null, [e.prependAvatar && g(wi, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && g(je, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)]), g("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [D && g(zC, {
            key: "title"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.title) == null ? void 0 : Ee.call(i, {
                title: e.title
              })) ?? e.title];
            }
          }), K && g(jC, {
            key: "subtitle"
          }, {
            default: () => {
              var Ee;
              return [((Ee = i.subtitle) == null ? void 0 : Ee.call(i, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (ue = i.default) == null ? void 0 : ue.call(i, j.value)]), ce && g("div", {
            key: "append",
            class: "v-list-item__append"
          }, [i.append ? g(et, {
            key: "append-defaults",
            disabled: !te,
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
          }) : g(Le, null, [e.appendIcon && g(je, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(wi, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[nn("ripple"), x.value && e.ripple]]);
    }), {
      isGroupActivator: d,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), UC = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...Ce(),
  ...qe()
}, "VListSubheader"), WC = fe()({
  name: "VListSubheader",
  props: UC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: i,
      textColorStyles: r
    } = en(le(e, "color"));
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
}), qC = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...Ce(),
  ...Xe()
}, "VDivider"), YC = fe()({
  name: "VDivider",
  props: qC(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: i
    } = tt(e), {
      textColorClasses: r,
      textColorStyles: o
    } = en(le(e, "color")), l = k(() => {
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
}), KC = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), hm = fe()({
  name: "VListChildren",
  props: KC(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return lm(), () => {
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
          })) ?? g(YC, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? g(WC, s, null);
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
        }, f = Pf.filterProps(s);
        return l ? g(Pf, de({
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
            }) : g(ul, p, c);
          },
          default: () => g(hm, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : g(ul, de(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), vm = Z({
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
    default: Si
  }
}, "list-items");
function ra(e, t) {
  const n = Cn(t, e.itemTitle, t), i = Cn(t, e.itemValue, n), r = Cn(t, e.itemChildren), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? zt(t, ["children"]) : t : void 0 : Cn(t, e.itemProps), l = {
    title: n,
    value: i,
    ...o
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(r) ? mm(e, r) : void 0,
    raw: t
  };
}
function mm(e, t) {
  const n = [];
  for (const i of t)
    n.push(ra(e, i));
  return n;
}
function XC(e) {
  const t = k(() => mm(e, e.items)), n = k(() => t.value.some((o) => o.value === null));
  function i(o) {
    return n.value || (o = o.filter((l) => l !== null)), o.map((l) => e.returnObject && typeof l == "string" ? ra(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || ra(e, l));
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
function ZC(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function JC(e, t) {
  const n = Cn(t, e.itemType, "item"), i = ZC(t) ? t : Cn(t, e.itemTitle), r = Cn(t, e.itemValue, void 0), o = Cn(t, e.itemChildren), l = e.itemProps === !0 ? zt(t, ["children"]) : Cn(t, e.itemProps), s = {
    title: i,
    value: r,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && o ? gm(e, o) : void 0,
    raw: t
  };
}
function gm(e, t) {
  const n = [];
  for (const i of t)
    n.push(JC(e, i));
  return n;
}
function QC(e) {
  return {
    items: k(() => gm(e, e.items))
  };
}
const ek = Z({
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
  ...OC({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...Ci(),
  ...Ce(),
  ...Gt(),
  ...Zn(),
  ...Nn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...vm(),
  ..._t(),
  ...qe(),
  ...Xe(),
  ...On({
    variant: "text"
  })
}, "VList"), tk = fe()({
  name: "VList",
  props: ek(),
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
    } = QC(e), {
      themeClasses: r
    } = tt(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: l
    } = Tt(le(e, "bgColor")), {
      borderClasses: s
    } = ki(e), {
      densityClasses: a
    } = an(e), {
      dimensionStyles: u
    } = Jn(e), {
      elevationClasses: c
    } = Rn(e), {
      roundedClasses: f
    } = St(e), {
      children: d,
      open: h,
      parents: v,
      select: m
    } = BC(e), p = k(() => e.lines ? `v-list--${e.lines}-line` : void 0), y = le(e, "activeColor"), w = le(e, "baseColor"), x = le(e, "color");
    lm(), bn({
      VListGroup: {
        activeColor: y,
        baseColor: w,
        color: x,
        expandIcon: le(e, "expandIcon"),
        collapseIcon: le(e, "collapseIcon")
      },
      VListItem: {
        activeClass: le(e, "activeClass"),
        activeColor: y,
        baseColor: w,
        color: x,
        density: le(e, "density"),
        disabled: le(e, "disabled"),
        lines: le(e, "lines"),
        nav: le(e, "nav"),
        slim: le(e, "slim"),
        variant: le(e, "variant")
      }
    });
    const b = be(!1), _ = ee();
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
        return Qo(_.value, L);
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
      default: () => [g(hm, {
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
}), nk = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...zt(no({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: eu
    }
  }), ["absolute"])
}, "VMenu"), ik = fe()({
  name: "VMenu",
  props: nk(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = $e(e, "modelValue"), {
      scopeId: r
    } = to(), o = xt(), l = k(() => e.id || `v-menu-${o}`), s = ee(), a = He(Xs, null), u = be(0);
    lt(Xs, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(m) {
        setTimeout(() => {
          !u.value && (m == null || m && !Cx(m, s.value.contentEl)) && (i.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(m) {
      var w, x, b;
      const p = m.relatedTarget, y = m.target;
      await Ke(), i.value && p !== y && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((x = s.value) != null && x.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(y) && // It isn't inside the menu body
      !s.value.contentEl.contains(y) && ((b = Nr(s.value.contentEl)[0]) == null || b.focus());
    }
    we(i, (m) => {
      m ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function f(m) {
      a == null || a.closeParents(m);
    }
    function d(m) {
      var p, y, w;
      e.disabled || m.key === "Tab" && (Rh(Nr((p = s.value) == null ? void 0 : p.contentEl, !1), m.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (i.value = !1, (w = (y = s.value) == null ? void 0 : y.activatorEl) == null || w.focus()));
    }
    function h(m) {
      var y;
      if (e.disabled) return;
      const p = (y = s.value) == null ? void 0 : y.contentEl;
      p && i.value ? m.key === "ArrowDown" ? (m.preventDefault(), Qo(p, "next")) : m.key === "ArrowUp" && (m.preventDefault(), Qo(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(m.key) && (i.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => h(m))));
    }
    const v = k(() => de({
      "aria-haspopup": "menu",
      "aria-expanded": String(i.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return he(() => {
      const m = Xn.filterProps(e);
      return g(Xn, de({
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
          return g(et, {
            root: "VMenu"
          }, {
            default: () => {
              var x;
              return [(x = n.default) == null ? void 0 : x.call(n, ...y)];
            }
          });
        }
      });
    }), Qn({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), rk = ["color", "file", "time", "date", "datetime-local", "week", "month"], ym = Z({
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
  ...Vi(),
  ...lu()
}, "VTextField"), Tf = fe()({
  name: "VTextField",
  directives: {
    Intersect: xv
  },
  inheritAttrs: !1,
  props: ym(),
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
    } = ir(e), u = k(() => typeof e.counterValue == "function" ? e.counterValue(o.value) : typeof e.counterValue == "number" ? e.counterValue : (o.value ?? "").toString().length), c = k(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = k(() => ["plain", "underlined"].includes(e.variant));
    function d(E, S) {
      var I, $;
      !e.autofocus || !E || ($ = (I = S[0].target) == null ? void 0 : I.focus) == null || $.call(I);
    }
    const h = ee(), v = ee(), m = ee(), p = k(() => rk.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
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
      E.stopPropagation(), y(), Ke(() => {
        o.value = null, Nh(e["onClick:clear"], E);
      });
    }
    function _(E) {
      var I;
      const S = E.target;
      if (o.value = S.value, (I = e.modelModifiers) != null && I.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const $ = [S.selectionStart, S.selectionEnd];
        Ke(() => {
          S.selectionStart = $[0], S.selectionEnd = $[1];
        });
      }
    }
    return he(() => {
      const E = !!(r.counter || e.counter !== !1 && e.counter != null), S = !!(E || r.details), [I, $] = Qi(n), {
        modelValue: R,
        ...H
      } = jt.filterProps(e), L = Bv(e);
      return g(jt, de({
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
            isDirty: T,
            isReadonly: j,
            isValid: M
          } = N;
          return g(su, de({
            ref: v,
            onMousedown: w,
            onClick: x,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: C.value,
            active: p.value || T.value,
            dirty: T.value || e.dirty,
            disabled: B.value,
            focused: l.value,
            error: M.value === !1
          }), {
            ...r,
            default: (F) => {
              let {
                props: {
                  class: O,
                  ...D
                }
              } = F;
              const K = We(g("input", de({
                ref: m,
                value: o.value,
                onInput: _,
                autofocus: e.autofocus,
                readonly: j.value,
                disabled: B.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: y,
                onBlur: a
              }, D, $), null), [[nn("intersect"), {
                handler: d
              }, null, {
                once: !0
              }]]);
              return g(Le, null, [e.prefix && g("span", {
                class: "v-text-field__prefix"
              }, [g("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? g("div", {
                class: O,
                "data-no-activator": ""
              }, [r.default(), K]) : Ln(K, {
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
          return g(Le, null, [(C = r.details) == null ? void 0 : C.call(r, N), E && g(Le, null, [g("span", null, null), g(Rv, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, r.counter)])]);
        } : void 0
      });
    }), Qn({}, h, v, m);
  }
}), ok = Z({
  renderless: Boolean,
  ...Ce()
}, "VVirtualScrollItem"), lk = fe()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: ok(),
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
    } = Ki(void 0, "border");
    we(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && i("update:height", s);
    }), he(() => {
      var s, a;
      return e.renderless ? g(Le, null, [(s = r.default) == null ? void 0 : s.call(r, {
        itemRef: o
      })]) : g("div", de({
        ref: o,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = r.default) == null ? void 0 : a.call(r)]);
    });
  }
}), sk = -1, ak = 1, gs = 100, uk = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function ck(e, t) {
  const n = tu(), i = be(0);
  yn(() => {
    i.value = parseFloat(e.itemHeight || 0);
  });
  const r = be(0), o = be(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (i.value || 16)
  ) || 1), l = be(0), s = be(0), a = ee(), u = ee();
  let c = 0;
  const {
    resizeRef: f,
    contentRect: d
  } = Ki();
  yn(() => {
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
  const y = be(0);
  let w = -1;
  function x(F) {
    return m[F] || i.value;
  }
  const b = wx(() => {
    const F = performance.now();
    p[0] = 0;
    const O = t.value.length;
    for (let D = 1; D <= O - 1; D++)
      p[D] = (p[D - 1] || 0) + x(D - 1);
    y.value = Math.max(y.value, performance.now() - F);
  }, y), _ = we(v, (F) => {
    F && (_(), c = u.value.offsetTop, b.immediate(), B(), ~w && Ke(() => {
      Oe && window.requestAnimationFrame(() => {
        j(w), w = -1;
      });
    }));
  });
  mt(() => {
    b.clear();
  });
  function E(F, O) {
    const D = m[F], K = i.value;
    i.value = K ? Math.min(i.value, O) : O, (D !== O || K !== i.value) && (m[F] = O, b());
  }
  function S(F) {
    return F = Lt(F, 0, t.value.length - 1), p[F] || 0;
  }
  function I(F) {
    return fk(p, F);
  }
  let $ = 0, R = 0, H = 0;
  we(h, (F, O) => {
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
    cancelAnimationFrame(C), C = requestAnimationFrame(T);
  }
  function T() {
    if (!a.value || !h.value) return;
    const F = $ - c, O = Math.sign(R), D = Math.max(0, F - gs), K = Lt(I(D), 0, t.value.length), te = F + h.value + gs, ce = Lt(I(te) + 1, K + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (O !== sk || K < r.value) && (O !== ak || ce > o.value)
    ) {
      const me = S(r.value) - S(K), Q = S(ce) - S(o.value);
      Math.max(me, Q) > gs ? (r.value = K, o.value = ce) : (K <= 0 && (r.value = K), ce >= t.value.length && (o.value = ce));
    }
    l.value = S(r.value), s.value = S(t.value.length) - S(o.value);
  }
  function j(F) {
    const O = S(F);
    !a.value || F && !O ? w = F : a.value.scrollTop = O;
  }
  const M = k(() => t.value.slice(r.value, o.value).map((F, O) => ({
    raw: F,
    index: O + r.value
  })));
  return we(t, () => {
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
    computedItems: M,
    paddingTop: l,
    paddingBottom: s,
    scrollToIndex: j,
    handleScroll: L,
    handleScrollend: N,
    handleItemResize: E
  };
}
function fk(e, t) {
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
const dk = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...uk(),
  ...Ce(),
  ...Zn()
}, "VVirtualScroll"), hk = fe()({
  name: "VVirtualScroll",
  props: dk(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const i = it("VVirtualScroll"), {
      dimensionStyles: r
    } = Jn(e), {
      containerRef: o,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: f,
      paddingBottom: d,
      computedItems: h
    } = ck(e, le(e, "items"));
    return bi(() => e.renderless, () => {
      function v() {
        var y, w;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", a)) : ((y = o.value) == null || y[p]("scroll", s, {
          passive: !0
        }), (w = o.value) == null || w[p]("scrollend", a));
      }
      rn(() => {
        o.value = Qh(i.vnode.el, !0), v(!0);
      }), mt(v);
    }), he(() => {
      const v = h.value.map((m) => g(lk, {
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
      return e.renderless ? g(Le, null, [g("div", {
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
function vk(e, t) {
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
const mk = Z({
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
  ...vm({
    itemChildren: !1
  })
}, "Select"), gk = Z({
  ...mk(),
  ...zt(ym({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...eo({
    transition: {
      component: eu
    }
  })
}, "VSelect"), EE = fe()({
  name: "VSelect",
  props: gk(),
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
    } = Zr(), r = ee(), o = ee(), l = ee(), s = $e(e, "menu"), a = k({
      get: () => s.value,
      set: (M) => {
        var F;
        s.value && !M && ((F = o.value) != null && F.ΨopenChildren) || (s.value = M);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: f
    } = XC(e), d = $e(e, "modelValue", [], (M) => c(M === null ? [null] : gn(M)), (M) => {
      const F = f(M);
      return e.multiple ? F : F[0] ?? null;
    }), h = k(() => typeof e.counterValue == "function" ? e.counterValue(d.value) : typeof e.counterValue == "number" ? e.counterValue : d.value.length), v = Fv(), m = k(() => d.value.map((M) => M.value)), p = be(!1), y = k(() => a.value ? e.closeText : e.openText);
    let w = "", x;
    const b = k(() => e.hideSelected ? u.value.filter((M) => !d.value.some((F) => F === M)) : u.value), _ = k(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = k(() => {
      var M;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((M = e.menuProps) == null ? void 0 : M.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), S = ee(), {
      onListScroll: I,
      onListKeydown: $
    } = vk(S, r);
    function R(M) {
      e.openOnClear && (a.value = !0);
    }
    function H() {
      _.value || (a.value = !a.value);
    }
    function L(M) {
      var te, ce;
      if (!M.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(M.key) && M.preventDefault(), ["Enter", "ArrowDown", " "].includes(M.key) && (a.value = !0), ["Escape", "Tab"].includes(M.key) && (a.value = !1), M.key === "Home" ? (te = S.value) == null || te.focus("first") : M.key === "End" && ((ce = S.value) == null || ce.focus("last"));
      const F = 1e3;
      function O(me) {
        const Q = me.key.length === 1, ue = !me.ctrlKey && !me.metaKey && !me.altKey;
        return Q && ue;
      }
      if (e.multiple || !O(M)) return;
      const D = performance.now();
      D - x > F && (w = ""), w += M.key.toLowerCase(), x = D;
      const K = u.value.find((me) => me.title.toLowerCase().startsWith(w));
      K !== void 0 && (d.value = [K]);
    }
    function N(M) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!M.props.disabled)
        if (e.multiple) {
          const O = d.value.findIndex((K) => e.valueComparator(K.value, M.value)), D = F ?? !~O;
          if (~O) {
            const K = D ? [...d.value, M] : [...d.value];
            K.splice(O, 1), d.value = K;
          } else D && (d.value = [...d.value, M]);
        } else {
          const O = F !== !1;
          d.value = O ? [M] : [], Ke(() => {
            a.value = !1;
          });
        }
    }
    function C(M) {
      var F;
      (F = S.value) != null && F.$el.contains(M.relatedTarget) || (a.value = !1);
    }
    function B() {
      var M;
      p.value && ((M = r.value) == null || M.focus());
    }
    function T(M) {
      p.value = !0;
    }
    function j(M) {
      if (M == null) d.value = [];
      else if (el(r.value, ":autofill") || el(r.value, ":-webkit-autofill")) {
        const F = u.value.find((O) => O.title === M);
        F && N(F);
      } else r.value && (r.value.value = "");
    }
    return we(a, () => {
      if (!e.hideSelected && a.value && d.value.length) {
        const M = b.value.findIndex((F) => d.value.some((O) => e.valueComparator(O.value, F.value)));
        Oe && window.requestAnimationFrame(() => {
          var F;
          M >= 0 && ((F = l.value) == null || F.scrollToIndex(M));
        });
      }
    }), we(() => e.items, (M, F) => {
      a.value || p.value && !F.length && M.length && (a.value = !0);
    }), he(() => {
      const M = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), O = d.value.length > 0, D = Tf.filterProps(e), K = O || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return g(Tf, de({
        ref: r
      }, D, {
        modelValue: d.value.map((te) => te.props.value).join(", "),
        "onUpdate:modelValue": j,
        focused: p.value,
        "onUpdate:focused": (te) => p.value = te,
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
        placeholder: K,
        "onClick:clear": R,
        "onMousedown:control": H,
        onBlur: C,
        onKeydown: L,
        "aria-label": i(y.value),
        title: i(y.value)
      }), {
        ...n,
        default: () => g(Le, null, [g(ik, de({
          ref: o,
          modelValue: a.value,
          "onUpdate:modelValue": (te) => a.value = te,
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
          default: () => [F && g(tk, de({
            ref: S,
            selected: m.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (te) => te.preventDefault(),
            onKeydown: $,
            onFocusin: T,
            onScrollPassive: I,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var te, ce, me;
              return [(te = n["prepend-item"]) == null ? void 0 : te.call(n), !b.value.length && !e.hideNoData && (((ce = n["no-data"]) == null ? void 0 : ce.call(n)) ?? g(ul, {
                title: i(e.noDataText)
              }, null)), g(hk, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (Q) => {
                  var Ut;
                  let {
                    item: ue,
                    index: Ee,
                    itemRef: Ze
                  } = Q;
                  const st = de(ue.props, {
                    ref: Ze,
                    key: Ee,
                    onClick: () => N(ue, null)
                  });
                  return ((Ut = n.item) == null ? void 0 : Ut.call(n, {
                    item: ue,
                    index: Ee,
                    props: st
                  })) ?? g(ul, de(st, {
                    role: "option"
                  }), {
                    prepend: (cn) => {
                      let {
                        isSelected: V
                      } = cn;
                      return g(Le, null, [e.multiple && !e.hideSelected ? g(ea, {
                        key: ue.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && g(wi, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && g(je, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (me = n["append-item"]) == null ? void 0 : me.call(n)];
            }
          })]
        }), d.value.map((te, ce) => {
          function me(Ze) {
            Ze.stopPropagation(), Ze.preventDefault(), N(te, !1);
          }
          const Q = {
            "onClick:close": me,
            onMousedown(Ze) {
              Ze.preventDefault(), Ze.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ue = M ? !!n.chip : !!n.selection, Ee = ue ? Oh(M ? n.chip({
            item: te,
            index: ce,
            props: Q
          }) : n.selection({
            item: te,
            index: ce
          })) : void 0;
          if (!(ue && !Ee))
            return g("div", {
              key: te.value,
              class: "v-select__selection"
            }, [M ? n.chip ? g(et, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: te.title
                }
              }
            }, {
              default: () => [Ee]
            }) : g(Nv, de({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: te.title,
              disabled: te.props.disabled
            }, Q), null) : Ee ?? g("span", {
              class: "v-select__selection-text"
            }, [te.title, e.multiple && ce < d.value.length - 1 && g("span", {
              class: "v-select__selection-comma"
            }, [Je(",")])])]);
        })]),
        "append-inner": function() {
          var Q;
          for (var te = arguments.length, ce = new Array(te), me = 0; me < te; me++)
            ce[me] = arguments[me];
          return g(Le, null, [(Q = n["append-inner"]) == null ? void 0 : Q.call(n, ...ce), e.menuIcon ? g(je, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Qn({
      isFocused: p,
      menu: a,
      select: N
    }, r);
  }
}), yk = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Vi(),
  ...jl()
}, "VSwitch"), cr = fe()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: yk(),
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
    } = Al(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = ir(e), c = ee(), f = k(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), d = xt(), h = k(() => e.id || `switch-${d}`);
    function v() {
      r.value && (r.value = !1);
    }
    function m(p) {
      var y, w;
      p.stopPropagation(), p.preventDefault(), (w = (y = c.value) == null ? void 0 : y.input) == null || w.click();
    }
    return he(() => {
      const [p, y] = Qi(n), w = jt.filterProps(e), x = Xi.filterProps(e);
      return g(jt, de({
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
          return g(Xi, de({
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
              return g(Le, null, [L, g("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": N || e.loading
                }, e.inset ? void 0 : C.value],
                style: e.inset ? void 0 : B.value
              }, [i.thumb ? g(et, {
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
              }) : g(kv, null, {
                default: () => [e.loading ? g(Ja, {
                  name: "v-switch",
                  active: !0,
                  color: $.value === !1 ? void 0 : f.value
                }, {
                  default: (T) => i.loader ? i.loader(T) : g(ov, {
                    active: T.isActive,
                    color: T.color,
                    indeterminate: !0,
                    size: "16",
                    width: "2"
                  }, null)
                }) : N && g(je, {
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
}), pk = /* @__PURE__ */ Ji({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, i = ee(n.isWelcome), r = ee(n.config.showNodeLabels), o = ee(n.config.nodePhysicsEnabled), l = ee(n.config.showLinkLabels), s = ee(n.config.fixedLinkDistanceEnabled), a = ee(n.config.zoomEnabled), u = ee(String(n.config.nodeRadius)), c = ee(""), f = ee("black"), d = ee(""), h = ee(n.config.persistSettingsLocalStorage), v = t;
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
    return (y, w) => (Et(), vn(iu, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: i.value,
      "onUpdate:modelValue": w[10] || (w[10] = (x) => i.value = x),
      persistent: ""
    }, {
      activator: ae(({ props: x }) => [
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Settings"
        }, {
          activator: ae(({ props: b }) => [
            g(ot, de({
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
        g(Qa, { class: "pa-3" }, {
          default: ae(() => [
            n.isWelcome ? (Et(), vn(Fr, { key: 0 }, {
              default: ae(() => [
                Je("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (Et(), vn(Fr, { key: 1 }, {
              default: ae(() => [
                Je("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (Et(), vn(vr, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ae(() => [
                Je(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : Yt("", !0),
            g(xr, null, {
              default: ae(() => [
                g(yt, null, {
                  default: ae(() => [
                    g($i, { cols: "5" }, {
                      default: ae(() => [
                        g(yt, null, {
                          default: ae(() => [
                            g(vr, { class: "py-5" }, {
                              default: ae(() => [
                                Je("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, null, {
                          default: ae(() => [
                            g(If, null, {
                              default: ae(() => [
                                Yt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, null, {
                          default: ae(() => [
                            g($i, { class: "mx-0 px-0" }, {
                              default: ae(() => [
                                g(cr, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: r.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => r.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            g($i, { class: "mx-0 px-0" }, {
                              default: ae(() => [
                                Yt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            g(cr, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: o.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => o.value = b)
                            }, null, 8, ["modelValue"]),
                            Yt("", !0)
                          ]),
                          _: 1
                        }),
                        g(yt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            Yt("", !0)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    g(al),
                    g($i, { cols: "5" }, {
                      default: ae(() => [
                        g(yt, null, {
                          default: ae(() => [
                            g(vr, { class: "py-5" }, {
                              default: ae(() => [
                                Je("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, null, {
                          default: ae(() => [
                            g(If, null, {
                              default: ae(() => [
                                Yt("", !0)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, null, {
                          default: ae(() => [
                            g(cr, {
                              label: "Labels",
                              class: "pt-3 mx-0 px-0",
                              color: "secondary",
                              modelValue: l.value,
                              "onUpdate:modelValue": w[6] || (w[6] = (b) => l.value = b)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        g(yt, null, {
                          default: ae(() => [
                            g(cr, {
                              label: "Fixed Distance",
                              color: "secondary",
                              modelValue: s.value,
                              "onUpdate:modelValue": w[7] || (w[7] = (b) => s.value = b)
                            }, null, 8, ["modelValue"]),
                            Yt("", !0)
                          ]),
                          _: 1
                        }),
                        g(yt, { class: "my-0 py-0" }, {
                          default: ae(() => [
                            g(vr, { class: "px-0" }, {
                              default: ae(() => [
                                Je("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(yt, { class: "py-0 my-0" }, {
                          default: ae(() => [
                            g(cr, {
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
            g(Bl, null, {
              default: ae(() => [
                g(PS, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                g(al),
                g(ot, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: ae(() => [
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
}), bk = /* @__PURE__ */ Ne("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), wk = /* @__PURE__ */ Ne("div", { class: "graph-host uninitialised" }, null, -1), xk = {
  key: 0,
  class: "button-container"
}, _k = { class: "info-text text-h5 text-grey" }, Sk = /* @__PURE__ */ Ji({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = k(() => {
      const A = document.querySelectorAll("graph-component");
      let W;
      for (let Y = 0; Y < A.length; Y++) {
        const U = A[Y], pe = ct(U.shadowRoot).select(".graph-host.uninitialised");
        if (!pe.empty()) {
          pe.classed("uninitialised", !1), W = pe;
          break;
        }
      }
      return W === void 0 && (W = ct(".graph-host.uninitialised"), W.classed("uninitialised", !1)), W;
    });
    pl(() => {
      j();
    }), rn(() => {
      M(), window.addEventListener("resize", Fe);
    }), bl(() => {
      window.removeEventListener("resize", Fe);
    });
    const i = ee(!1), r = ee(!1), o = ee(""), l = ee(""), s = ee(new Sc()), a = ee(!1), u = tn(new Ow());
    let c, f = 400, d = 400, h, v, m, p, y, w, x, b, _, E = 0, S = 0, I = 1;
    t({
      getGraph: $,
      setGraph: R,
      printGraph: H,
      setNodeColor: L,
      setLinkColor: N,
      deleteNode: C,
      deleteLink: B,
      toggleNodeLabels: ye,
      toggleLinkLabels: se,
      toggleZoom: ve,
      toggleNodePhysics: re,
      toggleFixedLinkDistance: J,
      toggleGraphEditingInGUI: T,
      resetView: Fe
    });
    function $(A = "json") {
      if (A.toLowerCase() === "json")
        return JSON.parse(
          s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
        );
      if (A.toLowerCase() === "tgf")
        return s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function R(A) {
      typeof A == "object" || typeof A == "string" ? Ie(A) : at();
    }
    function H(A = "json") {
      A.toLowerCase() === "json" ? console.log(
        s.value.toJSON(u.showLinkLabels, u.showLinkLabels, !0, !0, !0)
      ) : console.log(s.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function L(A, W) {
      if (W !== void 0) {
        const U = (Array.isArray(W) ? W : [W]).map(Number);
        for (const G of U)
          y.selectAll("circle").filter((pe) => pe.id === G).each((pe) => pe.color = A).style("fill", A);
      } else
        y.selectAll("circle").each((Y) => Y.color = A).style("fill", A);
    }
    function N(A, W) {
      if (W) {
        const Y = Array.isArray(W) ? W : [W];
        Re(Y);
        for (const U of Y)
          p.selectAll(".link").filter((G) => G.id === U).each((G) => G.color = A).style("stroke", A);
      } else
        Re(s.value.links.map((Y) => Y.id)), p.selectAll(".link").each((Y) => Y.color = A).style("stroke", A);
      Ds(m, u, A);
    }
    function C(A) {
      const W = Array.isArray(A) ? A : [A];
      for (const Y of W)
        y.selectAll("circle").filter((U) => U.id === Y).each(function(U) {
          let G = s.value.removeNode(U);
          if (G !== void 0) {
            let [pe, ze] = G;
            rs(pe, n.value), ze.forEach((At) => {
              ar(At, n.value);
            });
          }
        });
      a.value = s.value.nodes.length > 0;
    }
    function B(A) {
      const W = Array.isArray(A) ? A : [A];
      for (const Y of W)
        p.selectAll("path").filter((U) => U.id === Y).each(function(U) {
          let G = s.value.removeLink(U);
          G !== void 0 && ar(G, n.value);
        });
    }
    function T(A) {
      u.isGraphEditableInGUI = A;
    }
    function j() {
      const A = (W) => W === "false" ? !1 : !!W;
      localStorage.wasHere && (i.value = A(localStorage.wasHere)), localStorage.showNodeLabels && (u.showNodeLabels = A(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (u.nodePhysicsEnabled = A(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (u.showLinkLabels = A(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (u.fixedLinkDistanceEnabled = A(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (u.zoomEnabled = A(localStorage.enableZoom)), localStorage.persistSettings && (u.persistSettingsLocalStorage = A(localStorage.persistSettings));
    }
    function M() {
      f = n.value.node().clientWidth, d = n.value.node().clientHeight, h = _w(
        (A) => F(A, u.zoomEnabled),
        u.zoomEnabled
      ), m = Pw(
        n.value,
        h,
        (A) => u.isGraphEditableInGUI ? Ut(A) : null,
        (A) => u.isGraphEditableInGUI ? st(A) : null,
        (A) => {
          u.isGraphEditableInGUI && D(
            Nt(A, m.node())[0],
            Nt(A, m.node())[1]
          );
        }
      ), Aw(m, u, s.value.getNonDefaultLinkColors()), w = $w(m), p = Tw(m), y = Mw(m), c = Nw(s.value, u, f, d, () => K()), v = Iw(c, f, d, u.nodeRadius), Ee();
    }
    function F(A, W = !0) {
      W && (E = A.transform.x, S = A.transform.y, I = A.transform.k, m.attr("transform", `translate(${E},${S})scale(${I})`));
    }
    function O(A, W, Y, U) {
      let G = s.value.createLink(A.id, W.id, Y, U);
      G !== void 0 && kw(G, n.value), Ee();
    }
    function D(A, W, Y, U, G) {
      let pe = s.value.createNode(
        A ?? f / 2,
        W ?? d / 2,
        Y,
        U,
        G
      );
      Cw(pe, n.value), a.value = !0, Ee();
    }
    function K() {
      y.attr("transform", (A) => `translate(${A.x},${A.y})`), p.selectAll("path").attr("d", (A) => te(A)), ue(), Ee();
    }
    function te(A) {
      switch (ce(A), A.pathType) {
        case Ct.REFLEXIVE:
          return Vc(A.source, [f / 2, d / 2], u);
        case Ct.ARC:
          return ss(A.source, A.target, u);
        case Ct.ARCREVERSE:
          return Ic.reverse(ss(A.source, A.target, u));
        case Ct.LINE:
          return ls(A.source, A.target, u);
        case Ct.LINEREVERSE:
          return Ic.reverse(ls(A.source, A.target, u));
        default:
          return "";
      }
    }
    function ce(A) {
      A.source.id === A.target.id ? A.pathType = Ct.REFLEXIVE : me(A.source, A.target) ? A.pathType = Q(A.source, A.target) ? Ct.ARCREVERSE : Ct.ARC : A.pathType = Q(A.source, A.target) ? Ct.LINEREVERSE : Ct.LINE;
    }
    function me(A, W) {
      return A.id !== W.id && s.value.links.some((Y) => Y.target.id === A.id && Y.source.id === W.id) && s.value.links.some((Y) => Y.target.id === W.id && Y.source.id === A.id);
    }
    function Q(A, W) {
      return A.x > W.x;
    }
    function ue() {
      const A = x;
      if (A !== void 0) {
        const W = b;
        if (W !== void 0)
          w.attr("d", () => A.id === W.id ? Vc(A, [f / 2, d / 2], u) : me(A, W) ? ls(A, W, u) : ss(A, W, u));
        else if (_ !== void 0) {
          const Y = [A.x, A.y];
          w.attr("d", Lc(Y, _));
        }
      }
    }
    function Ee(A = 0.5) {
      var W;
      p = p.data(s.value.links, (Y) => Y.id).join(
        (Y) => {
          const U = Y.append("g").classed("link-container", !0);
          return U.append("path").classed("link", !0).style("stroke", (G) => G.color ? G.color : "").attr("id", (G) => G.id).attr(
            "marker-end",
            (G) => G.color ? "url(#link-arrow-" + G.color : "url(#link-arrow)"
          ), U.append("path").classed("clickbox", !0).on("pointerdown", (G, pe) => {
            Vw(pe, G.button, n.value);
            let ze = pe.color;
            if (G.button === 1 && (si(G), u.isGraphEditableInGUI)) {
              let At = s.value.removeLink(pe);
              At !== void 0 && ar(At, n.value), ze && (s.value.hasNonDefaultLinkColor(ze) || os(m, ze));
            }
          }), U.append("text").append("textPath").attr(
            "class",
            (G) => G.label ? "link-label" : "link-label-placeholder"
          ).attr("href", (G) => `#${G.id}`).attr("startOffset", "50%").text((G) => G.label ? G.label : "add label").on("click", (G, pe) => {
            u.isGraphEditableInGUI && V(G, pe);
          }), U.append("foreignObject").classed("link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
            (G) => `<div class=${G.label ? "link-label" : "link-label-placeholder"}>
                            </div>`
          ).on("click", (G, pe) => {
            u.isGraphEditableInGUI && V(G, pe);
          }), U;
        },
        (Y) => (Y.selectChild("path").attr("marker-start", function(U) {
          var G;
          if ((G = U.pathType) != null && G.includes("REVERSE")) {
            let pe = "url(#link-arrow-reverse";
            return U.color && (pe += "-" + Ar(U.color)), pe += ")", pe;
          } else
            return null;
        }).attr("marker-end", function(U) {
          var G;
          if ((G = U.pathType) != null && G.includes("REVERSE"))
            return null;
          {
            let pe = "url(#link-arrow";
            return U.color && (pe += "-" + Ar(U.color)), pe += ")", pe;
          }
        }), Y.selectChild("text").attr("class", (U) => {
          var G;
          return `${(G = U.pathType) == null ? void 0 : G.toLowerCase()}-path-text`;
        }).attr("dy", (U) => {
          var G;
          return U.pathType === Ct.REFLEXIVE ? 15 : U.pathType == Ct.LINEREVERSE ? -10 : (G = U.pathType) != null && G.includes("REVERSE") ? 20 : -10;
        }), Y.selectChild("text").selectChild("textPath").classed("hidden", !u.showLinkLabels).attr("startOffset", (U) => {
          var G;
          return (G = U.pathType) != null && G.includes("REVERSE") ? "46%" : "50%";
        }), Y.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function() {
          const U = ct(
            this.parentNode.parentNode.parentNode
          ).selectChild("foreignObject").selectChild("div").attr("class", "link-label").classed("hidden", !u.showLinkLabels).node(), G = ct(this).remove().node();
          U == null || U.appendChild(G);
        }), Y.selectChild("text").selectChild("textPath").each(function() {
          const U = this;
          let G = !1;
          U.childNodes.forEach((ze) => {
            var At;
            (ze == null ? void 0 : ze.nodeType) === Node.TEXT_NODE && ((At = ze == null ? void 0 : ze.textContent) == null ? void 0 : At.trim()) !== "" && (G = !0);
          }), G || ct(U).text("I").attr("class", "link-label-placeholder mjxhidden");
        }), Y.selectChild("text").selectChild("textPath").each(function() {
          const U = this, [G, pe] = oe(U);
          ct(U.parentNode.parentNode).select("foreignObject").attr("x", G).attr("y", pe);
        }), Y)
      ), y = y.data(s.value.nodes, (Y) => Y.id).join(
        (Y) => {
          const U = Y.append("g").classed("node-container", !0).call(v).on("pointerdown", (G, pe) => {
            if (G.button === 1 && (si(G), u.isGraphEditableInGUI)) {
              let ze = s.value.removeNode(pe);
              if (ze !== void 0) {
                let [At, _m] = ze;
                rs(At, n.value), _m.forEach((Sm) => {
                  ar(Sm, n.value);
                });
              }
              a.value = s.value.nodes.length > 0, _e(), Ee();
            }
          });
          return U.append("circle").classed("node", !0).attr("id", (G) => G.id).attr("r", u.nodeRadius).style("fill", (G) => G.color ? G.color : "").on("mouseenter", (G, pe) => b = pe).on("mouseout", () => b = void 0).on("pointerdown", (G, pe) => {
            Ew(pe, G.button, n.value), u.isGraphEditableInGUI && Ze(G, pe);
          }).on("pointerup", (G) => {
            u.isGraphEditableInGUI && st(G);
          }), U.append("foreignObject").classed("node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).attr("y", -0.5 * u.nodeRadius).html(
            (G) => `<div class=${G.label ? "node-label" : "node-label-placeholder"}>
                                ${G.label ? G.label : "add label"}
                            </div>`
          ).on("click", (G, pe) => {
            u.isGraphEditableInGUI && cn(G, pe);
          }).on("mouseenter", (G, pe) => b = pe).on("mouseout", () => b = void 0), U;
        },
        (Y) => (Y.selectChild("foreignObject").selectChild("div").classed("hidden", !u.showNodeLabels), Y)
      ), (W = window.MathJax) != null && W.version && window.MathJax.typeset(), c.nodes(s.value.nodes), c.alpha(A).restart();
    }
    function Ze(A, W) {
      if (A.button !== 0)
        return;
      si(A);
      const Y = [W.x, W.y];
      _ = Y, x = W, w.attr("marker-end", "url(#draggable-link-arrow)").classed("hidden", !1).attr("d", Lc(Y, Y)), Ee();
    }
    function st(A) {
      const W = x, Y = b;
      _e(), !(W === void 0 || Y === void 0) && (si(A), O(W, Y));
    }
    function Ut(A) {
      if (si(A), x !== void 0) {
        const W = Op(A, n.value.node())[0], Y = [
          (W[0] - E) / I,
          (W[1] - S) / I
        ];
        A.pointerType === "touch" && (Y[1] = Y[1] - 4 * u.nodeRadius, b = s.value.nodes.find(
          (U) => Math.sqrt(Math.pow(U.x - Y[0], 2) + Math.pow(U.y - Y[1], 2)) < u.nodeRadius
        )), _ = Y, ue();
      }
    }
    function cn(A, W) {
      const U = (A == null ? void 0 : A.target).closest("div");
      P(W, U, [W.x, W.y]);
    }
    function V(A, W) {
      let Y = A.target, U;
      Y.nodeName === "textPath" ? U = Y : U = Y.closest(".link-container").querySelector("textPath");
      let G = oe(U);
      P(W, U, G);
    }
    function P(A, W, Y) {
      let U = A instanceof _h ? "node" : "link";
      const G = document.createElement("input");
      G.setAttribute("class", "label-input"), G.setAttribute("id", `${U}-label-input-field`), A.label == null ? G.value = "" : G.value = A.label, G.placeholder = `Enter ${U} label`;
      let pe = !1;
      G.onkeyup = function(At) {
        At.key === "Enter" ? (Lw(A, G.value, n.value), pe = !0, G.blur()) : At.key === "Escape" && (G.value = "", G.blur());
      }, G.onblur = function() {
        pe && (U === "link" && z(W), G.value === "" ? X(W, A, U) : (ie(G, W, A, U), U === "node" && q(W))), ze.remove();
      };
      const ze = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      ze.setAttribute("width", "100%"), ze.setAttribute("height", "100%"), ze.setAttribute("x", `${Y[0] - 80}`), ze.setAttribute("y", `${Y[1] - 12}`), ze.append(G), n.value.select("svg").select("g").node().append(ze), G.focus();
    }
    function z(A) {
      var Y;
      const W = A.closest(".link-container");
      (Y = W.querySelector("mjx-container")) == null || Y.remove(), W.querySelector("div").setAttribute("class", "link-label-placeholder");
    }
    function q(A) {
      let W = A.closest(".node-container");
      const Y = W.parentElement;
      W.remove(), Y.append(W);
    }
    function X(A, W, Y) {
      A.setAttribute("class", `${Y}-label-placeholder`), A.textContent = "add label", W.label = void 0;
    }
    function ie(A, W, Y, U) {
      W.setAttribute("class", `${U}-label`), W.textContent = A.value.trim(), Y.label = W.textContent;
    }
    function oe(A) {
      let W = n.value.select("svg").node().getBoundingClientRect(), Y = A.getBoundingClientRect(), U = (Y.x - W.x - E) / I, G = (Y.y - W.y - S) / I;
      return [U, G];
    }
    function ne(A) {
      ye(A.showNodeLabels), re(A.nodePhysicsEnabled), se(A.showLinkLabels), J(A.fixedLinkDistanceEnabled), ve(A.zoomEnabled), u.persistSettingsLocalStorage = A.persistEnabled;
    }
    function re(A) {
      u.nodePhysicsEnabled = A, Sh(c, A, f, d);
    }
    function J(A) {
      u.fixedLinkDistanceEnabled = A, Ch(c, s.value, u, A);
    }
    function se(A) {
      u.showLinkLabels = A;
    }
    function ye(A) {
      u.showNodeLabels = A;
    }
    function ve(A) {
      u.zoomEnabled = A, Fe();
    }
    function _e() {
      w == null || w.classed("hidden", !0).attr("marker-end", "null"), x = void 0, b = void 0, _ = void 0;
    }
    function Ie(A) {
      let W, Y;
      try {
        if (typeof A == "string")
          [W, Y] = dx(A);
        else if (typeof A == "object")
          [W, Y] = hx(A);
        else {
          xn("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (U) {
        xn("Error during parsing:", `Invalid data format:
` + U);
        return;
      }
      at(), Ae(W, Y);
    }
    function Ae(A, W) {
      for (let U of A)
        D(
          U.x,
          U.y,
          U.idImported,
          U.label,
          U.color
        );
      const Y = (U) => s.value.nodes.find((G) => G.idImported === U);
      for (let U of W) {
        let G = Y(U.sourceIdImported), pe = Y(U.targetIdImported);
        G && pe && (O(G, pe, U.label, U.color), U.color && Ds(m, u, U.color));
      }
    }
    function Re(A) {
      for (let W of A) {
        const Y = s.value.links.filter((U) => U.id === W).map((U) => U.color).shift();
        Y && (s.value.hasNonDefaultLinkColor(Y, W) ? s.value.getLinkIdsWithNonDefaultLinkColors(
          Y,
          W
        ).every(
          (pe) => A.includes(pe)
        ) && os(m, Y) : os(m, Y));
      }
    }
    function Fe() {
      c.stop(), n.value.selectChildren().remove(), h = void 0, E = 0, S = 0, I = 1, m = void 0, w = void 0, p = void 0, y = void 0, c = void 0, _e(), j(), M();
    }
    function at() {
      s.value.links.forEach((A) => ar(A, n.value)), s.value.nodes.forEach((A) => rs(A, n.value)), s.value = new Sc(), a.value = !1, Fe();
    }
    function xn(A, W) {
      console.error(A + `
` + W), r.value = !0, o.value = A, l.value = W.toString(), window.setInterval(() => r.value = !1, 6e3);
    }
    return (A, W) => (Et(), Ls(Le, null, [
      bk,
      wk,
      u.hasToolbar ? (Et(), Ls("div", xk, [
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ae(({ props: Y }) => [
            u.isGraphEditableInGUI ? (Et(), vn(ot, de({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, Y, {
              variant: "plain",
              onClick: W[0] || (W[0] = (U) => D())
            }), null, 16)) : Yt("", !0)
          ]),
          _: 1
        }),
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ae(({ props: Y }) => [
            u.isGraphEditableInGUI ? (Et(), vn(ot, de({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, Y, {
              variant: "plain",
              onClick: W[1] || (W[1] = (U) => at())
            }), null, 16)) : Yt("", !0)
          ]),
          _: 1
        }),
        g(zi, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ae(({ props: Y }) => [
            u.zoomEnabled ? (Et(), vn(ot, de({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, Y, {
              variant: "plain",
              onClick: W[2] || (W[2] = (U) => Fe())
            }), null, 16)) : Yt("", !0)
          ]),
          _: 1
        }),
        g(wS, {
          "graph-as-tgf": s.value.toTGF(u.showNodeLabels, u.showLinkLabels, !1, !1),
          "graph-as-json": s.value.toJSON(u.showNodeLabels, u.showLinkLabels, !0, !0, !0),
          onFileImported: Ie
        }, null, 8, ["graph-as-tgf", "graph-as-json"]),
        g(LS),
        g(pk, {
          config: u,
          "is-welcome": !i.value,
          onUpdateSettings: ne
        }, null, 8, ["config", "is-welcome"])
      ])) : Yt("", !0),
      We(Ne("div", _k, "Graph is empty", 512), [
        [Ht, !a.value]
      ]),
      g(Js, {
        modelValue: r.value,
        "onUpdate:modelValue": W[3] || (W[3] = (Y) => r.value = Y),
        color: "error",
        variant: "tonal"
      }, {
        default: ae(() => [
          g(yt, { align: "center" }, {
            default: ae(() => [
              g(je, {
                icon: "$error",
                class: "ml-2"
              }),
              g($i, null, {
                default: ae(() => [
                  Ne("h4", null, Rt(o.value), 1),
                  Ne("p", null, Rt(l.value), 1)
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
}), Ck = ".graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.link{stroke:#004c97;stroke-width:4px;fill:none}.link.hidden{stroke-width:0}.link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.clickbox{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.arrow{fill:#004c97}.arrow.draggable{fill:#007dae}.line-path-text,.arc-path-text,.line-reverse-path-text,.arc-reverse-path-text,.reflexive-path-text,.link-label-mathjax-container{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.line-path-text .link-label,.arc-path-text .link-label,.line-reverse-path-text .link-label,.arc-reverse-path-text .link-label,.reflexive-path-text .link-label,.link-label-mathjax-container .link-label{fill:#000;stroke:none;font-size:1rem}.line-path-text .link-label.hidden,.arc-path-text .link-label.hidden,.line-reverse-path-text .link-label.hidden,.arc-reverse-path-text .link-label.hidden,.reflexive-path-text .link-label.hidden,.link-label-mathjax-container .link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.line-path-text .link-label-placeholder,.arc-path-text .link-label-placeholder,.line-reverse-path-text .link-label-placeholder,.arc-reverse-path-text .link-label-placeholder,.reflexive-path-text .link-label-placeholder,.link-label-mathjax-container .link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.line-path-text .link-label-placeholder.hidden,.arc-path-text .link-label-placeholder.hidden,.line-reverse-path-text .link-label-placeholder.hidden,.arc-reverse-path-text .link-label-placeholder.hidden,.reflexive-path-text .link-label-placeholder.hidden,.link-label-mathjax-container .link-label-placeholder.hidden,.line-path-text .link-label-placeholder.mjxhidden,.arc-path-text .link-label-placeholder.mjxhidden,.line-reverse-path-text .link-label-placeholder.mjxhidden,.arc-reverse-path-text .link-label-placeholder.mjxhidden,.reflexive-path-text .link-label-placeholder.mjxhidden,.link-label-mathjax-container .link-label-placeholder.mjxhidden{visibility:hidden;cursor:pointer;pointer-events:none}.node{fill:#eb9850;stroke:none;cursor:pointer}.node:hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.link-label-mathjax-container,.node-label-container{overflow:visible}.node-label{display:flex;justify-content:center;align-items:center;font-size:1rem;opacity:1;text-align:center;pointer-events:all;cursor:text}.node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.node-label-placeholder{color:#696969;display:flex;justify-content:center;font-style:oblique;font-size:.85rem;text-align:center;opacity:1;pointer-events:all;cursor:text;position:relative;top:-6px}.node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.label-input{background-color:#ffffffe6}.button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.info-text{position:absolute;left:1rem;right:1rem;top:1rem;bottom:1rem;display:inline-flex;justify-content:center;align-items:center;pointer-events:none}", kk = /* @__PURE__ */ fu(Sk, [["styles", [Ck]]]), oa = {
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
function Ek(e, t) {
  const n = [];
  let i = [];
  const r = pm(e), o = bm(e), l = (r.getDay() - oa[t.slice(-2).toUpperCase()] + 7) % 7, s = (o.getDay() - oa[t.slice(-2).toUpperCase()] + 7) % 7;
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
function Vk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function Lk(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function pm(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function bm(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Ik(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const Pk = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function wm(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (Pk.test(e))
      return Ik(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const Mf = new Date(2e3, 0, 2);
function Tk(e) {
  const t = oa[e.slice(-2).toUpperCase()];
  return Ha(7).map((n) => {
    const i = new Date(Mf);
    return i.setDate(Mf.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(i);
  });
}
function Mk(e, t, n, i) {
  const r = wm(e) ?? /* @__PURE__ */ new Date(), o = i == null ? void 0 : i[t];
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
function Ak(e, t) {
  const n = e.toJsDate(t), i = n.getFullYear(), r = Nc(String(n.getMonth() + 1), 2, "0"), o = Nc(String(n.getDate()), 2, "0");
  return `${i}-${r}-${o}`;
}
function $k(e) {
  const [t, n, i] = e.split("-").map(Number);
  return new Date(t, n - 1, i);
}
function Nk(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function Rk(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function Ok(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Bk(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Fk(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function Dk(e) {
  return e.getFullYear();
}
function Hk(e) {
  return e.getMonth();
}
function jk(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function zk(e) {
  return e.getHours();
}
function Gk(e) {
  return e.getMinutes();
}
function Uk(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Wk(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function qk(e, t) {
  return la(e, t[0]) && Kk(e, t[1]);
}
function Yk(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function la(e, t) {
  return e.getTime() > t.getTime();
}
function Kk(e, t) {
  return e.getTime() < t.getTime();
}
function Af(e, t) {
  return e.getTime() === t.getTime();
}
function Xk(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Zk(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Jk(e, t, n) {
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
function Qk(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function eE(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function tE(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function nE(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function iE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function rE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class oE {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return wm(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return Ak(this, t);
  }
  parseISO(t) {
    return $k(t);
  }
  addMinutes(t, n) {
    return Nk(t, n);
  }
  addHours(t, n) {
    return Rk(t, n);
  }
  addDays(t, n) {
    return Ok(t, n);
  }
  addWeeks(t, n) {
    return Bk(t, n);
  }
  addMonths(t, n) {
    return Fk(t, n);
  }
  getWeekArray(t) {
    return Ek(t, this.locale);
  }
  startOfWeek(t) {
    return Vk(t);
  }
  endOfWeek(t) {
    return Lk(t);
  }
  startOfMonth(t) {
    return pm(t);
  }
  endOfMonth(t) {
    return bm(t);
  }
  format(t, n) {
    return Mk(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Af(t, n);
  }
  isValid(t) {
    return Yk(t);
  }
  isWithinRange(t, n) {
    return qk(t, n);
  }
  isAfter(t, n) {
    return la(t, n);
  }
  isBefore(t, n) {
    return !la(t, n) && !Af(t, n);
  }
  isSameDay(t, n) {
    return Xk(t, n);
  }
  isSameMonth(t, n) {
    return Zk(t, n);
  }
  setMinutes(t, n) {
    return eE(t, n);
  }
  setHours(t, n) {
    return Qk(t, n);
  }
  setMonth(t, n) {
    return tE(t, n);
  }
  setYear(t, n) {
    return nE(t, n);
  }
  getDiff(t, n, i) {
    return Jk(t, n, i);
  }
  getWeekdays() {
    return Tk(this.locale);
  }
  getYear(t) {
    return Dk(t);
  }
  getMonth(t) {
    return Hk(t);
  }
  getNextMonth(t) {
    return jk(t);
  }
  getHours(t) {
    return zk(t);
  }
  getMinutes(t) {
    return Gk(t);
  }
  startOfDay(t) {
    return iE(t);
  }
  endOfDay(t) {
    return rE(t);
  }
  startOfYear(t) {
    return Uk(t);
  }
  endOfYear(t) {
    return Wk(t);
  }
}
const lE = Symbol.for("vuetify:date-options"), $f = Symbol.for("vuetify:date-adapter");
function sE(e, t) {
  const n = It({
    adapter: oE,
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
    instance: aE(n, t)
  };
}
function aE(e, t) {
  const n = tn(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return we(t.current, (i) => {
    n.locale = e.locale[i] ?? i ?? n.locale;
  }), n;
}
const uE = Symbol.for("vuetify:goto");
function cE() {
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
function fE(e, t) {
  return {
    rtl: t.isRtl,
    options: It(cE(), e)
  };
}
function xm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, i = It(t, n), {
    aliases: r = {},
    components: o = {},
    directives: l = {}
  } = i, s = Yx(i.defaults), a = a2(i.display, i.ssr), u = r_(i.theme), c = h_(i.icons), f = x_(i.locale), d = sE(i.date, f), h = fE(i.goTo, f);
  return {
    install: (m) => {
      for (const p in l)
        m.directive(p, l[p]);
      for (const p in o)
        m.component(p, o[p]);
      for (const p in r)
        m.component(p, sn({
          ...r[p],
          name: p,
          aliasName: r[p].name
        }));
      if (u.install(m), m.provide(Yi, s), m.provide(Zs, a), m.provide(il, u), m.provide(Us, c), m.provide(rl, f), m.provide(lE, d.options), m.provide($f, d.instance), m.provide(uE, h), Oe && i.ssr)
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
            return Ke(() => a.update()), m.mount = p, y;
          };
        }
      xt.reset(), m.mixin({
        computed: {
          $vuetify() {
            return tn({
              defaults: Ti.call(this, Yi),
              display: Ti.call(this, Zs),
              theme: Ti.call(this, il),
              icons: Ti.call(this, Us),
              locale: Ti.call(this, rl),
              date: Ti.call(this, $f)
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
const dE = "3.5.9";
xm.version = dE;
function Ti(e) {
  var i, r;
  const t = this.$, n = ((i = t.parent) == null ? void 0 : i.provides) ?? ((r = t.vnode.appContext) == null ? void 0 : r.provides);
  if (n && e in n)
    return n[e];
}
const hE = {
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
}, vE = {
  component: Xa
};
var mE = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", gE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", yE = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", pE = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", bE = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", wE = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", xE = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
const _E = xm({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...hE,
      addNode: xE,
      deleteGraph: gE,
      help: pE,
      importExport: yE,
      resetView: wE,
      settings: mE,
      helpCircle: bE
    },
    sets: {
      mdi: vE
    }
  }
});
/*! (c) Andrea Giammarchi - ISC */
(() => {
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
      const { prototype: u } = s, { connectedCallback: c } = u, f = a + "Callback", d = (v, m, p, y) => {
        m.disconnect(), p.removeEventListener(e, y), h(v);
      }, h = (v) => {
        n.length || requestAnimationFrame(r), n.push([v, f]);
      };
      return Object.defineProperties(
        u,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (c && c.apply(this, arguments), f in this && !t.has(this)) {
                const v = this, { ownerDocument: m } = v;
                if (t.set(v, !1), m.readyState === "complete" || i(v))
                  h(v);
                else {
                  const p = () => d(v, y, m, p);
                  m.addEventListener(e, p);
                  const y = new MutationObserver(() => {
                    i(v) && d(v, y, m, p);
                  });
                  y.observe(v.parentNode, { childList: !0, subtree: !0 });
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
customElements.define(
  "graph-component",
  // GUI Version
  ty(kk, { plugins: [_E] })
  // CLI Version
  // defineCustomElement(GraphEditor)
  // Without ShadowRoot for MathJax to work
  // defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })
);
