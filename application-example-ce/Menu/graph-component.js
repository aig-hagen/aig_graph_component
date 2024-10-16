var nm = Object.defineProperty;
var rm = (e, t, n) => t in e ? nm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var tt = (e, t, n) => rm(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Va(e, t) {
  const n = new Set(e.split(","));
  return (r) => n.has(r);
}
const De = {}, qr = [], Ut = () => {
}, om = () => !1, Vl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), La = (e) => e.startsWith("onUpdate:"), Ke = Object.assign, Pa = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, im = Object.prototype.hasOwnProperty, Te = (e, t) => im.call(e, t), _e = Array.isArray, Yr = (e) => Ll(e) === "[object Map]", dd = (e) => Ll(e) === "[object Set]", Ve = (e) => typeof e == "function", Ge = (e) => typeof e == "string", ao = (e) => typeof e == "symbol", Be = (e) => e !== null && typeof e == "object", hd = (e) => (Be(e) || Ve(e)) && Ve(e.then) && Ve(e.catch), vd = Object.prototype.toString, Ll = (e) => vd.call(e), lm = (e) => Ll(e).slice(8, -1), gd = (e) => Ll(e) === "[object Object]", Ia = (e) => Ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Lo = /* @__PURE__ */ Va(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Pl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, sm = /-(\w)/g, yt = Pl((e) => e.replace(sm, (t, n) => n ? n.toUpperCase() : "")), am = /\B([A-Z])/g, tn = Pl(
  (e) => e.replace(am, "-$1").toLowerCase()
), Fn = Pl((e) => e.charAt(0).toUpperCase() + e.slice(1)), us = Pl((e) => e ? `on${Fn(e)}` : ""), nr = (e, t) => !Object.is(e, t), cs = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Ki = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, um = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Bs = (e) => {
  const t = Ge(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let zu;
const md = () => zu || (zu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ta(e) {
  if (_e(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Ge(r) ? hm(r) : Ta(r);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (Ge(e) || Be(e))
    return e;
}
const cm = /;(?![^(]*\))/g, fm = /:([^]+)/, dm = /\/\*[^]*?\*\//g;
function hm(e) {
  const t = {};
  return e.replace(dm, "").split(cm).forEach((n) => {
    if (n) {
      const r = n.split(fm);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ma(e) {
  let t = "";
  if (Ge(e))
    t = e;
  else if (_e(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ma(e[n]);
      r && (t += r + " ");
    }
  else if (Be(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const vm = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gm = /* @__PURE__ */ Va(vm);
function pd(e) {
  return !!e || e === "";
}
const ht = (e) => Ge(e) ? e : e == null ? "" : _e(e) || Be(e) && (e.toString === vd || !Ve(e.toString)) ? JSON.stringify(e, yd, 2) : String(e), yd = (e, t) => t && t.__v_isRef ? yd(e, t.value) : Yr(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], i) => (n[fs(r, i) + " =>"] = o, n),
    {}
  )
} : dd(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => fs(n))
} : ao(t) ? fs(t) : Be(t) && !_e(t) && !gd(t) ? String(t) : t, fs = (e, t = "") => {
  var n;
  return ao(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Rt;
class bd {
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
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Aa(e) {
  return new bd(e);
}
function mm(e, t = Rt) {
  t && t.active && t.effects.push(e);
}
function pm() {
  return Rt;
}
function wt(e) {
  Rt && Rt.cleanups.push(e);
}
let wr;
class $a {
  constructor(t, n, r, o) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, mm(this, o);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ir();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (ym(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Tr();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = er, n = wr;
    try {
      return er = !0, wr = this, this._runnings++, Gu(this), this.fn();
    } finally {
      Uu(this), this._runnings--, wr = n, er = t;
    }
  }
  stop() {
    var t;
    this.active && (Gu(this), Uu(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function ym(e) {
  return e.value;
}
function Gu(e) {
  e._trackId++, e._depsLength = 0;
}
function Uu(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      wd(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function wd(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let er = !0, Fs = 0;
const _d = [];
function Ir() {
  _d.push(er), er = !1;
}
function Tr() {
  const e = _d.pop();
  er = e === void 0 ? !0 : e;
}
function Na() {
  Fs++;
}
function Ra() {
  for (Fs--; !Fs && Ds.length; )
    Ds.shift()();
}
function xd(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && wd(r, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Ds = [];
function kd(e, t, n) {
  Na();
  for (const r of e.keys()) {
    let o;
    r._dirtyLevel < t && (o ?? (o = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (o ?? (o = e.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Ds.push(r.scheduler)));
  }
  Ra();
}
const Sd = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Xi = /* @__PURE__ */ new WeakMap(), _r = Symbol(""), Hs = Symbol("");
function Vt(e, t, n) {
  if (er && wr) {
    let r = Xi.get(e);
    r || Xi.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = Sd(() => r.delete(n))), xd(
      wr,
      o
    );
  }
}
function $n(e, t, n, r, o, i) {
  const l = Xi.get(e);
  if (!l)
    return;
  let s = [];
  if (t === "clear")
    s = [...l.values()];
  else if (n === "length" && _e(e)) {
    const a = Number(r);
    l.forEach((u, c) => {
      (c === "length" || !ao(c) && c >= a) && s.push(u);
    });
  } else
    switch (n !== void 0 && s.push(l.get(n)), t) {
      case "add":
        _e(e) ? Ia(n) && s.push(l.get("length")) : (s.push(l.get(_r)), Yr(e) && s.push(l.get(Hs)));
        break;
      case "delete":
        _e(e) || (s.push(l.get(_r)), Yr(e) && s.push(l.get(Hs)));
        break;
      case "set":
        Yr(e) && s.push(l.get(_r));
        break;
    }
  Na();
  for (const a of s)
    a && kd(
      a,
      4
    );
  Ra();
}
function bm(e, t) {
  var n;
  return (n = Xi.get(e)) == null ? void 0 : n.get(t);
}
const wm = /* @__PURE__ */ Va("__proto__,__v_isRef,__isVue"), Cd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ao)
), Wu = /* @__PURE__ */ _m();
function _m() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = xe(this);
      for (let i = 0, l = this.length; i < l; i++)
        Vt(r, "get", i + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(xe)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ir(), Na();
      const r = xe(this)[t].apply(this, n);
      return Ra(), Tr(), r;
    };
  }), e;
}
function xm(e) {
  const t = xe(this);
  return Vt(t, "has", e), t.hasOwnProperty(e);
}
class Ed {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const o = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (o ? i ? Nm : Id : i ? Pd : Ld).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = _e(t);
    if (!o) {
      if (l && Te(Wu, n))
        return Reflect.get(Wu, n, r);
      if (n === "hasOwnProperty")
        return xm;
    }
    const s = Reflect.get(t, n, r);
    return (ao(n) ? Cd.has(n) : wm(n)) || (o || Vt(t, "get", n), i) ? s : Ue(s) ? l && Ia(n) ? s : s.value : Be(s) ? o ? ti(s) : un(s) : s;
  }
}
class Vd extends Ed {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let i = t[n];
    if (!this._isShallow) {
      const a = to(i);
      if (!Zi(r) && !to(r) && (i = xe(i), r = xe(r)), !_e(t) && Ue(i) && !Ue(r))
        return a ? !1 : (i.value = r, !0);
    }
    const l = _e(t) && Ia(n) ? Number(n) < t.length : Te(t, n), s = Reflect.set(t, n, r, o);
    return t === xe(o) && (l ? nr(r, i) && $n(t, "set", n, r) : $n(t, "add", n, r)), s;
  }
  deleteProperty(t, n) {
    const r = Te(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && $n(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ao(n) || !Cd.has(n)) && Vt(t, "has", n), r;
  }
  ownKeys(t) {
    return Vt(
      t,
      "iterate",
      _e(t) ? "length" : _r
    ), Reflect.ownKeys(t);
  }
}
class km extends Ed {
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
const Sm = /* @__PURE__ */ new Vd(), Cm = /* @__PURE__ */ new km(), Em = /* @__PURE__ */ new Vd(
  !0
), Oa = (e) => e, Il = (e) => Reflect.getPrototypeOf(e);
function pi(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = xe(e), i = xe(t);
  n || (nr(t, i) && Vt(o, "get", t), Vt(o, "get", i));
  const { has: l } = Il(o), s = r ? Oa : n ? Da : No;
  if (l.call(o, t))
    return s(e.get(t));
  if (l.call(o, i))
    return s(e.get(i));
  e !== o && e.get(t);
}
function yi(e, t = !1) {
  const n = this.__v_raw, r = xe(n), o = xe(e);
  return t || (nr(e, o) && Vt(r, "has", e), Vt(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function bi(e, t = !1) {
  return e = e.__v_raw, !t && Vt(xe(e), "iterate", _r), Reflect.get(e, "size", e);
}
function qu(e) {
  e = xe(e);
  const t = xe(this);
  return Il(t).has.call(t, e) || (t.add(e), $n(t, "add", e, e)), this;
}
function Yu(e, t) {
  t = xe(t);
  const n = xe(this), { has: r, get: o } = Il(n);
  let i = r.call(n, e);
  i || (e = xe(e), i = r.call(n, e));
  const l = o.call(n, e);
  return n.set(e, t), i ? nr(t, l) && $n(n, "set", e, t) : $n(n, "add", e, t), this;
}
function Ku(e) {
  const t = xe(this), { has: n, get: r } = Il(t);
  let o = n.call(t, e);
  o || (e = xe(e), o = n.call(t, e)), r && r.call(t, e);
  const i = t.delete(e);
  return o && $n(t, "delete", e, void 0), i;
}
function Xu() {
  const e = xe(this), t = e.size !== 0, n = e.clear();
  return t && $n(e, "clear", void 0, void 0), n;
}
function wi(e, t) {
  return function(r, o) {
    const i = this, l = i.__v_raw, s = xe(l), a = t ? Oa : e ? Da : No;
    return !e && Vt(s, "iterate", _r), l.forEach((u, c) => r.call(o, a(u), a(c), i));
  };
}
function _i(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, i = xe(o), l = Yr(i), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, u = o[e](...r), c = n ? Oa : t ? Da : No;
    return !t && Vt(
      i,
      "iterate",
      a ? Hs : _r
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
function Vm() {
  const e = {
    get(i) {
      return pi(this, i);
    },
    get size() {
      return bi(this);
    },
    has: yi,
    add: qu,
    set: Yu,
    delete: Ku,
    clear: Xu,
    forEach: wi(!1, !1)
  }, t = {
    get(i) {
      return pi(this, i, !1, !0);
    },
    get size() {
      return bi(this);
    },
    has: yi,
    add: qu,
    set: Yu,
    delete: Ku,
    clear: Xu,
    forEach: wi(!1, !0)
  }, n = {
    get(i) {
      return pi(this, i, !0);
    },
    get size() {
      return bi(this, !0);
    },
    has(i) {
      return yi.call(this, i, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: wi(!0, !1)
  }, r = {
    get(i) {
      return pi(this, i, !0, !0);
    },
    get size() {
      return bi(this, !0);
    },
    has(i) {
      return yi.call(this, i, !0);
    },
    add: Wn("add"),
    set: Wn("set"),
    delete: Wn("delete"),
    clear: Wn("clear"),
    forEach: wi(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = _i(
      i,
      !1,
      !1
    ), n[i] = _i(
      i,
      !0,
      !1
    ), t[i] = _i(
      i,
      !1,
      !0
    ), r[i] = _i(
      i,
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
  Lm,
  Pm,
  Im,
  Tm
] = /* @__PURE__ */ Vm();
function Ba(e, t) {
  const n = t ? e ? Tm : Im : e ? Pm : Lm;
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    Te(n, o) && o in r ? n : r,
    o,
    i
  );
}
const Mm = {
  get: /* @__PURE__ */ Ba(!1, !1)
}, Am = {
  get: /* @__PURE__ */ Ba(!1, !0)
}, $m = {
  get: /* @__PURE__ */ Ba(!0, !1)
}, Ld = /* @__PURE__ */ new WeakMap(), Pd = /* @__PURE__ */ new WeakMap(), Id = /* @__PURE__ */ new WeakMap(), Nm = /* @__PURE__ */ new WeakMap();
function Rm(e) {
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
function Om(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Rm(lm(e));
}
function un(e) {
  return to(e) ? e : Fa(
    e,
    !1,
    Sm,
    Mm,
    Ld
  );
}
function Bm(e) {
  return Fa(
    e,
    !1,
    Em,
    Am,
    Pd
  );
}
function ti(e) {
  return Fa(
    e,
    !0,
    Cm,
    $m,
    Id
  );
}
function Fa(e, t, n, r, o) {
  if (!Be(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = Om(e);
  if (l === 0)
    return e;
  const s = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, s), s;
}
function Kr(e) {
  return to(e) ? Kr(e.__v_raw) : !!(e && e.__v_isReactive);
}
function to(e) {
  return !!(e && e.__v_isReadonly);
}
function Zi(e) {
  return !!(e && e.__v_isShallow);
}
function Td(e) {
  return Kr(e) || to(e);
}
function xe(e) {
  const t = e && e.__v_raw;
  return t ? xe(t) : e;
}
function Md(e) {
  return Object.isExtensible(e) && Ki(e, "__v_skip", !0), e;
}
const No = (e) => Be(e) ? un(e) : e, Da = (e) => Be(e) ? ti(e) : e;
class Ad {
  constructor(t, n, r, o) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new $a(
      () => t(this._value),
      () => Oi(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = xe(this);
    return (!t._cacheable || t.effect.dirty) && nr(t._value, t._value = t.effect.run()) && Oi(t, 4), $d(t), t.effect._dirtyLevel >= 2 && Oi(t, 2), t._value;
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
function Fm(e, t, n = !1) {
  let r, o;
  const i = Ve(e);
  return i ? (r = e, o = Ut) : (r = e.get, o = e.set), new Ad(r, o, i || !o, n);
}
function $d(e) {
  var t;
  er && wr && (e = xe(e), xd(
    wr,
    (t = e.dep) != null ? t : e.dep = Sd(
      () => e.dep = void 0,
      e instanceof Ad ? e : void 0
    )
  ));
}
function Oi(e, t = 4, n) {
  e = xe(e);
  const r = e.dep;
  r && kd(
    r,
    t
  );
}
function Ue(e) {
  return !!(e && e.__v_isRef === !0);
}
function te(e) {
  return Nd(e, !1);
}
function be(e) {
  return Nd(e, !0);
}
function Nd(e, t) {
  return Ue(e) ? e : new Dm(e, t);
}
class Dm {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : xe(t), this._value = n ? t : No(t);
  }
  get value() {
    return $d(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Zi(t) || to(t);
    t = n ? t : xe(t), nr(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : No(t), Oi(this, 4));
  }
}
function rn(e) {
  return Ue(e) ? e.value : e;
}
const Hm = {
  get: (e, t, n) => rn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Ue(o) && !Ue(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Rd(e) {
  return Kr(e) ? e : new Proxy(e, Hm);
}
function Ha(e) {
  const t = _e(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Od(e, n);
  return t;
}
class jm {
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
    return bm(xe(this._object), this._key);
  }
}
class zm {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function ae(e, t, n) {
  return Ue(e) ? e : Ve(e) ? new zm(e) : Be(e) && arguments.length > 1 ? Od(e, t, n) : te(e);
}
function Od(e, t, n) {
  const r = e[t];
  return Ue(r) ? r : new jm(e, t, n);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function tr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Tl(o, t, n);
  }
}
function qt(e, t, n, r) {
  if (Ve(e)) {
    const i = tr(e, t, n, r);
    return i && hd(i) && i.catch((l) => {
      Tl(l, t, n);
    }), i;
  }
  const o = [];
  for (let i = 0; i < e.length; i++)
    o.push(qt(e[i], t, n, r));
  return o;
}
function Tl(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const l = t.proxy, s = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](e, l, s) === !1)
            return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      tr(
        a,
        null,
        10,
        [e, l, s]
      );
      return;
    }
  }
  Gm(e, n, o, r);
}
function Gm(e, t, n, r = !0) {
  console.error(e);
}
let Ro = !1, js = !1;
const at = [];
let xn = 0;
const Xr = [];
let Kn = null, vr = 0;
const Bd = /* @__PURE__ */ Promise.resolve();
let ja = null;
function Xe(e) {
  const t = ja || Bd;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Um(e) {
  let t = xn + 1, n = at.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = at[r], i = Oo(o);
    i < e || i === e && o.pre ? t = r + 1 : n = r;
  }
  return t;
}
function za(e) {
  (!at.length || !at.includes(
    e,
    Ro && e.allowRecurse ? xn + 1 : xn
  )) && (e.id == null ? at.push(e) : at.splice(Um(e.id), 0, e), Fd());
}
function Fd() {
  !Ro && !js && (js = !0, ja = Bd.then(Hd));
}
function Wm(e) {
  const t = at.indexOf(e);
  t > xn && at.splice(t, 1);
}
function qm(e) {
  _e(e) ? Xr.push(...e) : (!Kn || !Kn.includes(
    e,
    e.allowRecurse ? vr + 1 : vr
  )) && Xr.push(e), Fd();
}
function Zu(e, t, n = Ro ? xn + 1 : 0) {
  for (; n < at.length; n++) {
    const r = at[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid)
        continue;
      at.splice(n, 1), n--, r();
    }
  }
}
function Dd(e) {
  if (Xr.length) {
    const t = [...new Set(Xr)].sort(
      (n, r) => Oo(n) - Oo(r)
    );
    if (Xr.length = 0, Kn) {
      Kn.push(...t);
      return;
    }
    for (Kn = t, vr = 0; vr < Kn.length; vr++)
      Kn[vr]();
    Kn = null, vr = 0;
  }
}
const Oo = (e) => e.id == null ? 1 / 0 : e.id, Ym = (e, t) => {
  const n = Oo(e) - Oo(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Hd(e) {
  js = !1, Ro = !0, at.sort(Ym);
  try {
    for (xn = 0; xn < at.length; xn++) {
      const t = at[xn];
      t && t.active !== !1 && tr(t, null, 14);
    }
  } finally {
    xn = 0, at.length = 0, Dd(), Ro = !1, ja = null, (at.length || Xr.length) && Hd();
  }
}
function Km(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || De;
  let o = n;
  const i = t.startsWith("update:"), l = i && t.slice(7);
  if (l && l in r) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`, { number: d, trim: f } = r[c] || De;
    f && (o = n.map((h) => Ge(h) ? h.trim() : h)), d && (o = n.map(um));
  }
  let s, a = r[s = us(t)] || // also try camelCase event handler (#2249)
  r[s = us(yt(t))];
  !a && i && (a = r[s = us(tn(t))]), a && qt(
    a,
    e,
    6,
    o
  );
  const u = r[s + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[s])
      return;
    e.emitted[s] = !0, qt(
      u,
      e,
      6,
      o
    );
  }
}
function jd(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let l = {}, s = !1;
  if (!Ve(e)) {
    const a = (u) => {
      const c = jd(u, t, !0);
      c && (s = !0, Ke(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !s ? (Be(e) && r.set(e, null), null) : (_e(i) ? i.forEach((a) => l[a] = null) : Ke(l, i), Be(e) && r.set(e, l), l);
}
function Ml(e, t) {
  return !e || !Vl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, tn(t)) || Te(e, t));
}
let mt = null, zd = null;
function Ji(e) {
  const t = mt;
  return mt = e, zd = e && e.type.__scopeId || null, t;
}
function ce(e, t = mt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && dc(-1);
    const i = Ji(t);
    let l;
    try {
      l = e(...o);
    } finally {
      Ji(i), r._d && dc(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ds(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: i,
    propsOptions: [l],
    slots: s,
    attrs: a,
    emit: u,
    render: c,
    renderCache: d,
    data: f,
    setupState: h,
    ctx: v,
    inheritAttrs: g
  } = e;
  let p, m;
  const w = Ji(e);
  try {
    if (n.shapeFlag & 4) {
      const b = o || r, x = b;
      p = wn(
        c.call(
          x,
          b,
          d,
          i,
          h,
          f,
          v
        )
      ), m = a;
    } else {
      const b = t;
      p = wn(
        b.length > 1 ? b(
          i,
          { attrs: a, slots: s, emit: u }
        ) : b(
          i,
          null
          /* we know it doesn't need it */
        )
      ), m = t.props ? a : Xm(a);
    }
  } catch (b) {
    Mo.length = 0, Tl(b, e, 1), p = y(Yt);
  }
  let _ = p;
  if (m && g !== !1) {
    const b = Object.keys(m), { shapeFlag: x } = _;
    b.length && x & 7 && (l && b.some(La) && (m = Zm(
      m,
      l
    )), _ = Nn(_, m));
  }
  return n.dirs && (_ = Nn(_), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition && (_.transition = n.transition), p = _, Ji(w), p;
}
const Xm = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Zm = (e, t) => {
  const n = {};
  for (const r in e)
    (!La(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Jm(e, t, n) {
  const { props: r, children: o, component: i } = e, { props: l, children: s, patchFlag: a } = t, u = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Ju(r, l, u) : !!l;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        if (l[f] !== r[f] && !Ml(u, f))
          return !0;
      }
    }
  } else
    return (o || s) && (!s || !s.$stable) ? !0 : r === l ? !1 : r ? l ? Ju(r, l, u) : !0 : !!l;
  return !1;
}
function Ju(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !Ml(n, i))
      return !0;
  }
  return !1;
}
function Qm({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Gd = "components", ep = "directives", tp = Symbol.for("v-ndc");
function np(e) {
  return Ge(e) && Ud(Gd, e, !1) || e;
}
function cn(e) {
  return Ud(ep, e);
}
function Ud(e, t, n = !0, r = !1) {
  const o = mt || it;
  if (o) {
    const i = o.type;
    if (e === Gd) {
      const s = Kp(
        i,
        !1
      );
      if (s && (s === t || s === yt(t) || s === Fn(yt(t))))
        return i;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Qu(o[e] || i[e], t) || // global registration
      Qu(o.appContext[e], t)
    );
    return !l && r ? i : l;
  }
}
function Qu(e, t) {
  return e && (e[t] || e[yt(t)] || e[Fn(yt(t))]);
}
const rp = (e) => e.__isSuspense;
function op(e, t) {
  t && t.pendingBranch ? _e(e) ? t.effects.push(...e) : t.effects.push(e) : qm(e);
}
const ip = Symbol.for("v-scx"), lp = () => je(ip);
function Cn(e, t) {
  return Ga(e, null, t);
}
const xi = {};
function we(e, t, n) {
  return Ga(e, t, n);
}
function Ga(e, t, {
  immediate: n,
  deep: r,
  flush: o,
  once: i,
  onTrack: l,
  onTrigger: s
} = De) {
  if (t && i) {
    const E = t;
    t = (...S) => {
      E(...S), x();
    };
  }
  const a = it, u = (E) => r === !0 ? E : (
    // for deep: false, only traverse root-level properties
    mr(E, r === !1 ? 1 : void 0)
  );
  let c, d = !1, f = !1;
  if (Ue(e) ? (c = () => e.value, d = Zi(e)) : Kr(e) ? (c = () => u(e), d = !0) : _e(e) ? (f = !0, d = e.some((E) => Kr(E) || Zi(E)), c = () => e.map((E) => {
    if (Ue(E))
      return E.value;
    if (Kr(E))
      return u(E);
    if (Ve(E))
      return tr(E, a, 2);
  })) : Ve(e) ? t ? c = () => tr(e, a, 2) : c = () => (h && h(), qt(
    e,
    a,
    3,
    [v]
  )) : c = Ut, t && r) {
    const E = c;
    c = () => mr(E());
  }
  let h, v = (E) => {
    h = _.onStop = () => {
      tr(E, a, 4), h = _.onStop = void 0;
    };
  }, g;
  if (Fl)
    if (v = Ut, t ? n && qt(t, a, 3, [
      c(),
      f ? [] : void 0,
      v
    ]) : c(), o === "sync") {
      const E = lp();
      g = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return Ut;
  let p = f ? new Array(e.length).fill(xi) : xi;
  const m = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const E = _.run();
        (r || d || (f ? E.some((S, T) => nr(S, p[T])) : nr(E, p))) && (h && h(), qt(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          p === xi ? void 0 : f && p[0] === xi ? [] : p,
          v
        ]), p = E);
      } else
        _.run();
  };
  m.allowRecurse = !!t;
  let w;
  o === "sync" ? w = m : o === "post" ? w = () => St(m, a && a.suspense) : (m.pre = !0, a && (m.id = a.uid), w = () => za(m));
  const _ = new $a(c, Ut, w), b = pm(), x = () => {
    _.stop(), b && Pa(b.effects, _);
  };
  return t ? n ? m() : p = _.run() : o === "post" ? St(
    _.run.bind(_),
    a && a.suspense
  ) : _.run(), g && g.push(x), x;
}
function sp(e, t, n) {
  const r = this.proxy, o = Ge(e) ? e.includes(".") ? Wd(r, e) : () => r[e] : e.bind(r, r);
  let i;
  Ve(t) ? i = t : (i = t.handler, n = t);
  const l = ri(this), s = Ga(o, i.bind(r), n);
  return l(), s;
}
function Wd(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function mr(e, t, n = 0, r) {
  if (!Be(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(e))
    return e;
  if (r.add(e), Ue(e))
    mr(e.value, t, n, r);
  else if (_e(e))
    for (let o = 0; o < e.length; o++)
      mr(e[o], t, n, r);
  else if (dd(e) || Yr(e))
    e.forEach((o) => {
      mr(o, t, n, r);
    });
  else if (gd(e))
    for (const o in e)
      mr(e[o], t, n, r);
  return e;
}
function He(e, t) {
  if (mt === null)
    return e;
  const n = Dl(mt) || mt.proxy, r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, s, a = De] = t[o];
    i && (Ve(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && mr(l), r.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: s,
      modifiers: a
    }));
  }
  return e;
}
function ar(e, t, n, r) {
  const o = e.dirs, i = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const s = o[l];
    i && (s.oldValue = i[l].value);
    let a = s.dir[r];
    a && (Ir(), qt(a, n, 8, [
      e.el,
      s,
      e,
      t
    ]), Tr());
  }
}
const Xn = Symbol("_leaveCb"), ki = Symbol("_enterCb");
function qd() {
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
const zt = [Function, Array], Yd = {
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
}, ap = {
  name: "BaseTransition",
  props: Yd,
  setup(e, { slots: t }) {
    const n = Bl(), r = qd();
    return () => {
      const o = t.default && Ua(t.default(), !0);
      if (!o || !o.length)
        return;
      let i = o[0];
      if (o.length > 1) {
        for (const f of o)
          if (f.type !== Yt) {
            i = f;
            break;
          }
      }
      const l = xe(e), { mode: s } = l;
      if (r.isLeaving)
        return hs(i);
      const a = ec(i);
      if (!a)
        return hs(i);
      const u = Bo(
        a,
        l,
        r,
        n
      );
      Fo(a, u);
      const c = n.subTree, d = c && ec(c);
      if (d && d.type !== Yt && !gr(a, d)) {
        const f = Bo(
          d,
          l,
          r,
          n
        );
        if (Fo(d, f), s === "out-in")
          return r.isLeaving = !0, f.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, hs(i);
        s === "in-out" && a.type !== Yt && (f.delayLeave = (h, v, g) => {
          const p = Kd(
            r,
            d
          );
          p[String(d.key)] = d, h[Xn] = () => {
            v(), h[Xn] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = g;
        });
      }
      return i;
    };
  }
}, up = ap;
function Kd(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Bo(e, t, n, r) {
  const {
    appear: o,
    mode: i,
    persisted: l = !1,
    onBeforeEnter: s,
    onEnter: a,
    onAfterEnter: u,
    onEnterCancelled: c,
    onBeforeLeave: d,
    onLeave: f,
    onAfterLeave: h,
    onLeaveCancelled: v,
    onBeforeAppear: g,
    onAppear: p,
    onAfterAppear: m,
    onAppearCancelled: w
  } = t, _ = String(e.key), b = Kd(n, e), x = (T, A) => {
    T && qt(
      T,
      r,
      9,
      A
    );
  }, E = (T, A) => {
    const R = A[1];
    x(T, A), _e(T) ? T.every((D) => D.length <= 1) && R() : T.length <= 1 && R();
  }, S = {
    mode: i,
    persisted: l,
    beforeEnter(T) {
      let A = s;
      if (!n.isMounted)
        if (o)
          A = g || s;
        else
          return;
      T[Xn] && T[Xn](
        !0
        /* cancelled */
      );
      const R = b[_];
      R && gr(e, R) && R.el[Xn] && R.el[Xn](), x(A, [T]);
    },
    enter(T) {
      let A = a, R = u, D = c;
      if (!n.isMounted)
        if (o)
          A = p || a, R = m || u, D = w || c;
        else
          return;
      let L = !1;
      const I = T[ki] = (k) => {
        L || (L = !0, k ? x(D, [T]) : x(R, [T]), S.delayedLeave && S.delayedLeave(), T[ki] = void 0);
      };
      A ? E(A, [T, I]) : I();
    },
    leave(T, A) {
      const R = String(e.key);
      if (T[ki] && T[ki](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return A();
      x(d, [T]);
      let D = !1;
      const L = T[Xn] = (I) => {
        D || (D = !0, A(), I ? x(v, [T]) : x(h, [T]), T[Xn] = void 0, b[R] === e && delete b[R]);
      };
      b[R] = e, f ? E(f, [T, L]) : L();
    },
    clone(T) {
      return Bo(T, t, n, r);
    }
  };
  return S;
}
function hs(e) {
  if (Al(e))
    return e = Nn(e), e.children = null, e;
}
function ec(e) {
  return Al(e) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    e.children ? e.children[0] : void 0
  ) : e;
}
function Fo(e, t) {
  e.shapeFlag & 6 && e.component ? Fo(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ua(e, t = !1, n) {
  let r = [], o = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const s = n == null ? l.key : String(n) + String(l.key != null ? l.key : i);
    l.type === Le ? (l.patchFlag & 128 && o++, r = r.concat(
      Ua(l.children, t, s)
    )) : (t || l.type !== Yt) && r.push(s != null ? Nn(l, { key: s }) : l);
  }
  if (o > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
  return Ve(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ke({ name: e.name }, t, { setup: e })
  ) : e;
}
const Bi = (e) => !!e.type.__asyncLoader, Al = (e) => e.type.__isKeepAlive;
function cp(e, t) {
  Xd(e, "a", t);
}
function fp(e, t) {
  Xd(e, "da", t);
}
function Xd(e, t, n = it) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if ($l(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Al(o.parent.vnode) && dp(r, t, n, o), o = o.parent;
  }
}
function dp(e, t, n, r) {
  const o = $l(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Rl(() => {
    Pa(r[t], o);
  }, n);
}
function $l(e, t, n = it, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      Ir();
      const s = ri(n), a = qt(t, n, e, l);
      return s(), Tr(), a;
    });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const Dn = (e) => (t, n = it) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Fl || e === "sp") && $l(e, (...r) => t(...r), n)
), Nl = Dn("bm"), fn = Dn("m"), hp = Dn("bu"), Zd = Dn("u"), dn = Dn("bum"), Rl = Dn("um"), vp = Dn("sp"), gp = Dn(
  "rtg"
), mp = Dn(
  "rtc"
);
function pp(e, t = it) {
  $l("ec", e, t);
}
function tc(e, t, n, r) {
  let o;
  const i = n;
  if (_e(e) || Ge(e)) {
    o = new Array(e.length);
    for (let l = 0, s = e.length; l < s; l++)
      o[l] = t(e[l], l, void 0, i);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, i);
  } else if (Be(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, s) => t(l, s, void 0, i)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let s = 0, a = l.length; s < a; s++) {
        const u = l[s];
        o[s] = t(e[u], u, s, i);
      }
    }
  else
    o = [];
  return o;
}
const zs = (e) => e ? uh(e) ? Dl(e) || e.proxy : zs(e.parent) : null, Po = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ke(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => Wa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, za(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Xe.bind(e.proxy)),
    $watch: (e) => sp.bind(e)
  })
), vs = (e, t) => e !== De && !e.__isScriptSetup && Te(e, t), yp = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: i, accessCache: l, type: s, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const h = l[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (vs(r, t))
          return l[t] = 1, r[t];
        if (o !== De && Te(o, t))
          return l[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Te(u, t)
        )
          return l[t] = 3, i[t];
        if (n !== De && Te(n, t))
          return l[t] = 4, n[t];
        Gs && (l[t] = 0);
      }
    }
    const c = Po[t];
    let d, f;
    if (c)
      return t === "$attrs" && Vt(e, "get", t), c(e);
    if (
      // css module (injected by vue-loader)
      (d = s.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== De && Te(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, Te(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: i } = e;
    return vs(o, t) ? (o[t] = n, !0) : r !== De && Te(r, t) ? (r[t] = n, !0) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i }
  }, l) {
    let s;
    return !!n[l] || e !== De && Te(e, l) || vs(t, l) || (s = i[0]) && Te(s, l) || Te(r, l) || Te(Po, l) || Te(o.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function nc(e) {
  return _e(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Gs = !0;
function bp(e) {
  const t = Wa(e), n = e.proxy, r = e.ctx;
  Gs = !1, t.beforeCreate && rc(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
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
    activated: g,
    deactivated: p,
    beforeDestroy: m,
    beforeUnmount: w,
    destroyed: _,
    unmounted: b,
    render: x,
    renderTracked: E,
    renderTriggered: S,
    errorCaptured: T,
    serverPrefetch: A,
    // public API
    expose: R,
    inheritAttrs: D,
    // assets
    components: L,
    directives: I,
    filters: k
  } = t;
  if (u && wp(u, r, null), l)
    for (const j in l) {
      const N = l[j];
      Ve(N) && (r[j] = N.bind(n));
    }
  if (o) {
    const j = o.call(n, n);
    Be(j) && (e.data = un(j));
  }
  if (Gs = !0, i)
    for (const j in i) {
      const N = i[j], F = Ve(N) ? N.bind(n, n) : Ve(N.get) ? N.get.bind(n, n) : Ut, B = !Ve(N) && Ve(N.set) ? N.set.bind(n) : Ut, H = C({
        get: F,
        set: B
      });
      Object.defineProperty(r, j, {
        enumerable: !0,
        configurable: !0,
        get: () => H.value,
        set: (Y) => H.value = Y
      });
    }
  if (s)
    for (const j in s)
      Jd(s[j], r, n, j);
  if (a) {
    const j = Ve(a) ? a.call(n) : a;
    Reflect.ownKeys(j).forEach((N) => {
      ct(N, j[N]);
    });
  }
  c && rc(c, e, "c");
  function M(j, N) {
    _e(N) ? N.forEach((F) => j(F.bind(n))) : N && j(N.bind(n));
  }
  if (M(Nl, d), M(fn, f), M(hp, h), M(Zd, v), M(cp, g), M(fp, p), M(pp, T), M(mp, E), M(gp, S), M(dn, w), M(Rl, b), M(vp, A), _e(R))
    if (R.length) {
      const j = e.exposed || (e.exposed = {});
      R.forEach((N) => {
        Object.defineProperty(j, N, {
          get: () => n[N],
          set: (F) => n[N] = F
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === Ut && (e.render = x), D != null && (e.inheritAttrs = D), L && (e.components = L), I && (e.directives = I);
}
function wp(e, t, n = Ut) {
  _e(e) && (e = Us(e));
  for (const r in e) {
    const o = e[r];
    let i;
    Be(o) ? "default" in o ? i = je(
      o.from || r,
      o.default,
      !0
    ) : i = je(o.from || r) : i = je(o), Ue(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[r] = i;
  }
}
function rc(e, t, n) {
  qt(
    _e(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Jd(e, t, n, r) {
  const o = r.includes(".") ? Wd(n, r) : () => n[r];
  if (Ge(e)) {
    const i = t[e];
    Ve(i) && we(o, i);
  } else if (Ve(e))
    we(o, e.bind(n));
  else if (Be(e))
    if (_e(e))
      e.forEach((i) => Jd(i, t, n, r));
    else {
      const i = Ve(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ve(i) && we(o, i, e);
    }
}
function Wa(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, s = i.get(t);
  let a;
  return s ? a = s : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (u) => Qi(a, u, l, !0)
  ), Qi(a, t, l)), Be(t) && i.set(t, a), a;
}
function Qi(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && Qi(e, i, n, !0), o && o.forEach(
    (l) => Qi(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const s = _p[l] || n && n[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
  return e;
}
const _p = {
  data: oc,
  props: ic,
  emits: ic,
  // objects
  methods: So,
  computed: So,
  // lifecycle
  beforeCreate: dt,
  created: dt,
  beforeMount: dt,
  mounted: dt,
  beforeUpdate: dt,
  updated: dt,
  beforeDestroy: dt,
  beforeUnmount: dt,
  destroyed: dt,
  unmounted: dt,
  activated: dt,
  deactivated: dt,
  errorCaptured: dt,
  serverPrefetch: dt,
  // assets
  components: So,
  directives: So,
  // watch
  watch: kp,
  // provide / inject
  provide: oc,
  inject: xp
};
function oc(e, t) {
  return t ? e ? function() {
    return Ke(
      Ve(e) ? e.call(this, this) : e,
      Ve(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xp(e, t) {
  return So(Us(e), Us(t));
}
function Us(e) {
  if (_e(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function dt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function So(e, t) {
  return e ? Ke(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ic(e, t) {
  return e ? _e(e) && _e(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ke(
    /* @__PURE__ */ Object.create(null),
    nc(e),
    nc(t ?? {})
  ) : t;
}
function kp(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ke(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = dt(e[r], t[r]);
  return n;
}
function Qd() {
  return {
    app: null,
    config: {
      isNativeTag: om,
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
let Sp = 0;
function Cp(e, t) {
  return function(r, o = null) {
    Ve(r) || (r = Ke({}, r)), o != null && !Be(o) && (o = null);
    const i = Qd(), l = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const a = i.app = {
      _uid: Sp++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Zp,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return l.has(u) || (u && Ve(u.install) ? (l.add(u), u.install(a, ...c)) : Ve(u) && (l.add(u), u(a, ...c))), a;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), a;
      },
      component(u, c) {
        return c ? (i.components[u] = c, a) : i.components[u];
      },
      directive(u, c) {
        return c ? (i.directives[u] = c, a) : i.directives[u];
      },
      mount(u, c, d) {
        if (!s) {
          const f = y(r, o);
          return f.appContext = i, d === !0 ? d = "svg" : d === !1 && (d = void 0), c && t ? t(f, u) : e(f, u, d), s = !0, a._container = u, u.__vue_app__ = a, Dl(f.component) || f.component.proxy;
        }
      },
      unmount() {
        s && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return i.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Io;
        Io = a;
        try {
          return u();
        } finally {
          Io = c;
        }
      }
    };
    return a;
  };
}
let Io = null;
function ct(e, t) {
  if (it) {
    let n = it.provides;
    const r = it.parent && it.parent.provides;
    r === n && (n = it.provides = Object.create(r)), n[e] = t;
  }
}
function je(e, t, n = !1) {
  const r = it || mt;
  if (r || Io) {
    const o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Io._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && Ve(t) ? t.call(r && r.proxy) : t;
  }
}
function Ep(e, t, n, r = !1) {
  const o = {}, i = {};
  Ki(i, Ol, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), eh(e, t, o, i);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : Bm(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function Vp(e, t, n, r) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, s = xe(o), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const c = e.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let f = c[d];
        if (Ml(e.emitsOptions, f))
          continue;
        const h = t[f];
        if (a)
          if (Te(i, f))
            h !== i[f] && (i[f] = h, u = !0);
          else {
            const v = yt(f);
            o[v] = Ws(
              a,
              s,
              v,
              h,
              e,
              !1
            );
          }
        else
          h !== i[f] && (i[f] = h, u = !0);
      }
    }
  } else {
    eh(e, t, o, i) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !Te(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = tn(d)) === d || !Te(t, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (o[d] = Ws(
        a,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete o[d]);
    if (i !== s)
      for (const d in i)
        (!t || !Te(t, d)) && (delete i[d], u = !0);
  }
  u && $n(e, "set", "$attrs");
}
function eh(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let l = !1, s;
  if (t)
    for (let a in t) {
      if (Lo(a))
        continue;
      const u = t[a];
      let c;
      o && Te(o, c = yt(a)) ? !i || !i.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : Ml(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, l = !0);
    }
  if (i) {
    const a = xe(n), u = s || De;
    for (let c = 0; c < i.length; c++) {
      const d = i[c];
      n[d] = Ws(
        o,
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
function Ws(e, t, n, r, o, i) {
  const l = e[n];
  if (l != null) {
    const s = Te(l, "default");
    if (s && r === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && Ve(a)) {
        const { propsDefaults: u } = o;
        if (n in u)
          r = u[n];
        else {
          const c = ri(o);
          r = u[n] = a.call(
            null,
            t
          ), c();
        }
      } else
        r = a;
    }
    l[
      0
      /* shouldCast */
    ] && (i && !s ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === tn(n)) && (r = !0));
  }
  return r;
}
function th(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const i = e.props, l = {}, s = [];
  let a = !1;
  if (!Ve(e)) {
    const c = (d) => {
      a = !0;
      const [f, h] = th(d, t, !0);
      Ke(l, f), h && s.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !a)
    return Be(e) && r.set(e, qr), qr;
  if (_e(i))
    for (let c = 0; c < i.length; c++) {
      const d = yt(i[c]);
      lc(d) && (l[d] = De);
    }
  else if (i)
    for (const c in i) {
      const d = yt(c);
      if (lc(d)) {
        const f = i[c], h = l[d] = _e(f) || Ve(f) ? { type: f } : Ke({}, f);
        if (h) {
          const v = uc(Boolean, h.type), g = uc(String, h.type);
          h[
            0
            /* shouldCast */
          ] = v > -1, h[
            1
            /* shouldCastTrue */
          ] = g < 0 || v < g, (v > -1 || Te(h, "default")) && s.push(d);
        }
      }
    }
  const u = [l, s];
  return Be(e) && r.set(e, u), u;
}
function lc(e) {
  return e[0] !== "$" && !Lo(e);
}
function sc(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function ac(e, t) {
  return sc(e) === sc(t);
}
function uc(e, t) {
  return _e(t) ? t.findIndex((n) => ac(n, e)) : Ve(t) && ac(t, e) ? 0 : -1;
}
const nh = (e) => e[0] === "_" || e === "$stable", qa = (e) => _e(e) ? e.map(wn) : [wn(e)], Lp = (e, t, n) => {
  if (t._n)
    return t;
  const r = ce((...o) => qa(t(...o)), n);
  return r._c = !1, r;
}, rh = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (nh(o))
      continue;
    const i = e[o];
    if (Ve(i))
      t[o] = Lp(o, i, r);
    else if (i != null) {
      const l = qa(i);
      t[o] = () => l;
    }
  }
}, oh = (e, t) => {
  const n = qa(t);
  e.slots.default = () => n;
}, Pp = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = xe(t), Ki(t, "_", n)) : rh(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && oh(e, t);
  Ki(e.slots, Ol, 1);
}, Ip = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let i = !0, l = De;
  if (r.shapeFlag & 32) {
    const s = t._;
    s ? n && s === 1 ? i = !1 : (Ke(o, t), !n && s === 1 && delete o._) : (i = !t.$stable, rh(t, o)), l = t;
  } else t && (oh(e, t), l = { default: 1 });
  if (i)
    for (const s in o)
      !nh(s) && l[s] == null && delete o[s];
};
function qs(e, t, n, r, o = !1) {
  if (_e(e)) {
    e.forEach(
      (f, h) => qs(
        f,
        t && (_e(t) ? t[h] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Bi(r) && !o)
    return;
  const i = r.shapeFlag & 4 ? Dl(r.component) || r.component.proxy : r.el, l = o ? null : i, { i: s, r: a } = e, u = t && t.r, c = s.refs === De ? s.refs = {} : s.refs, d = s.setupState;
  if (u != null && u !== a && (Ge(u) ? (c[u] = null, Te(d, u) && (d[u] = null)) : Ue(u) && (u.value = null)), Ve(a))
    tr(a, s, 12, [l, c]);
  else {
    const f = Ge(a), h = Ue(a);
    if (f || h) {
      const v = () => {
        if (e.f) {
          const g = f ? Te(d, a) ? d[a] : c[a] : a.value;
          o ? _e(g) && Pa(g, i) : _e(g) ? g.includes(i) || g.push(i) : f ? (c[a] = [i], Te(d, a) && (d[a] = c[a])) : (a.value = [i], e.k && (c[e.k] = a.value));
        } else f ? (c[a] = l, Te(d, a) && (d[a] = l)) : h && (a.value = l, e.k && (c[e.k] = l));
      };
      l ? (v.id = -1, St(v, n)) : v();
    }
  }
}
const St = op;
function Tp(e) {
  return Mp(e);
}
function Mp(e, t) {
  const n = md();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: i,
    createElement: l,
    createText: s,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: d,
    nextSibling: f,
    setScopeId: h = Ut,
    insertStaticContent: v
  } = e, g = (V, $, U, K = null, X = null, re = null, ie = void 0, ne = null, oe = !!$.dynamicChildren) => {
    if (V === $)
      return;
    V && !gr(V, $) && (K = se(V), Y(V, X, re, !0), V = null), $.patchFlag === -2 && (oe = !1, $.dynamicChildren = null);
    const { type: Q, ref: ue, shapeFlag: ye } = $;
    switch (Q) {
      case ni:
        p(V, $, U, K);
        break;
      case Yt:
        m(V, $, U, K);
        break;
      case ms:
        V == null && w($, U, K, ie);
        break;
      case Le:
        L(
          V,
          $,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe
        );
        break;
      default:
        ye & 1 ? x(
          V,
          $,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe
        ) : ye & 6 ? I(
          V,
          $,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe
        ) : (ye & 64 || ye & 128) && Q.process(
          V,
          $,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe,
          ot
        );
    }
    ue != null && X && qs(ue, V && V.ref, re, $ || V, !$);
  }, p = (V, $, U, K) => {
    if (V == null)
      r(
        $.el = s($.children),
        U,
        K
      );
    else {
      const X = $.el = V.el;
      $.children !== V.children && u(X, $.children);
    }
  }, m = (V, $, U, K) => {
    V == null ? r(
      $.el = a($.children || ""),
      U,
      K
    ) : $.el = V.el;
  }, w = (V, $, U, K) => {
    [V.el, V.anchor] = v(
      V.children,
      $,
      U,
      K,
      V.el,
      V.anchor
    );
  }, _ = ({ el: V, anchor: $ }, U, K) => {
    let X;
    for (; V && V !== $; )
      X = f(V), r(V, U, K), V = X;
    r($, U, K);
  }, b = ({ el: V, anchor: $ }) => {
    let U;
    for (; V && V !== $; )
      U = f(V), o(V), V = U;
    o($);
  }, x = (V, $, U, K, X, re, ie, ne, oe) => {
    $.type === "svg" ? ie = "svg" : $.type === "math" && (ie = "mathml"), V == null ? E(
      $,
      U,
      K,
      X,
      re,
      ie,
      ne,
      oe
    ) : A(
      V,
      $,
      X,
      re,
      ie,
      ne,
      oe
    );
  }, E = (V, $, U, K, X, re, ie, ne) => {
    let oe, Q;
    const { props: ue, shapeFlag: ye, transition: me, dirs: Se } = V;
    if (oe = V.el = l(
      V.type,
      re,
      ue && ue.is,
      ue
    ), ye & 8 ? c(oe, V.children) : ye & 16 && T(
      V.children,
      oe,
      null,
      K,
      X,
      gs(V, re),
      ie,
      ne
    ), Se && ar(V, null, K, "created"), S(oe, V, V.scopeId, ie, K), ue) {
      for (const $e in ue)
        $e !== "value" && !Lo($e) && i(
          oe,
          $e,
          null,
          ue[$e],
          re,
          V.children,
          K,
          X,
          J
        );
      "value" in ue && i(oe, "value", null, ue.value, re), (Q = ue.onVnodeBeforeMount) && yn(Q, K, V);
    }
    Se && ar(V, null, K, "beforeMount");
    const Pe = Ap(X, me);
    Pe && me.beforeEnter(oe), r(oe, $, U), ((Q = ue && ue.onVnodeMounted) || Pe || Se) && St(() => {
      Q && yn(Q, K, V), Pe && me.enter(oe), Se && ar(V, null, K, "mounted");
    }, X);
  }, S = (V, $, U, K, X) => {
    if (U && h(V, U), K)
      for (let re = 0; re < K.length; re++)
        h(V, K[re]);
    if (X) {
      let re = X.subTree;
      if ($ === re) {
        const ie = X.vnode;
        S(
          V,
          ie,
          ie.scopeId,
          ie.slotScopeIds,
          X.parent
        );
      }
    }
  }, T = (V, $, U, K, X, re, ie, ne, oe = 0) => {
    for (let Q = oe; Q < V.length; Q++) {
      const ue = V[Q] = ne ? Zn(V[Q]) : wn(V[Q]);
      g(
        null,
        ue,
        $,
        U,
        K,
        X,
        re,
        ie,
        ne
      );
    }
  }, A = (V, $, U, K, X, re, ie) => {
    const ne = $.el = V.el;
    let { patchFlag: oe, dynamicChildren: Q, dirs: ue } = $;
    oe |= V.patchFlag & 16;
    const ye = V.props || De, me = $.props || De;
    let Se;
    if (U && ur(U, !1), (Se = me.onVnodeBeforeUpdate) && yn(Se, U, $, V), ue && ar($, V, U, "beforeUpdate"), U && ur(U, !0), Q ? R(
      V.dynamicChildren,
      Q,
      ne,
      U,
      K,
      gs($, X),
      re
    ) : ie || N(
      V,
      $,
      ne,
      null,
      U,
      K,
      gs($, X),
      re,
      !1
    ), oe > 0) {
      if (oe & 16)
        D(
          ne,
          $,
          ye,
          me,
          U,
          K,
          X
        );
      else if (oe & 2 && ye.class !== me.class && i(ne, "class", null, me.class, X), oe & 4 && i(ne, "style", ye.style, me.style, X), oe & 8) {
        const Pe = $.dynamicProps;
        for (let $e = 0; $e < Pe.length; $e++) {
          const Re = Pe[$e], qe = ye[Re], Tt = me[Re];
          (Tt !== qe || Re === "value") && i(
            ne,
            Re,
            qe,
            Tt,
            X,
            V.children,
            U,
            K,
            J
          );
        }
      }
      oe & 1 && V.children !== $.children && c(ne, $.children);
    } else !ie && Q == null && D(
      ne,
      $,
      ye,
      me,
      U,
      K,
      X
    );
    ((Se = me.onVnodeUpdated) || ue) && St(() => {
      Se && yn(Se, U, $, V), ue && ar($, V, U, "updated");
    }, K);
  }, R = (V, $, U, K, X, re, ie) => {
    for (let ne = 0; ne < $.length; ne++) {
      const oe = V[ne], Q = $[ne], ue = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oe.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oe.type === Le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !gr(oe, Q) || // - In the case of a component, it could contain anything.
        oe.shapeFlag & 70) ? d(oe.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          U
        )
      );
      g(
        oe,
        Q,
        ue,
        null,
        K,
        X,
        re,
        ie,
        !0
      );
    }
  }, D = (V, $, U, K, X, re, ie) => {
    if (U !== K) {
      if (U !== De)
        for (const ne in U)
          !Lo(ne) && !(ne in K) && i(
            V,
            ne,
            U[ne],
            null,
            ie,
            $.children,
            X,
            re,
            J
          );
      for (const ne in K) {
        if (Lo(ne))
          continue;
        const oe = K[ne], Q = U[ne];
        oe !== Q && ne !== "value" && i(
          V,
          ne,
          Q,
          oe,
          ie,
          $.children,
          X,
          re,
          J
        );
      }
      "value" in K && i(V, "value", U.value, K.value, ie);
    }
  }, L = (V, $, U, K, X, re, ie, ne, oe) => {
    const Q = $.el = V ? V.el : s(""), ue = $.anchor = V ? V.anchor : s("");
    let { patchFlag: ye, dynamicChildren: me, slotScopeIds: Se } = $;
    Se && (ne = ne ? ne.concat(Se) : Se), V == null ? (r(Q, U, K), r(ue, U, K), T(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      $.children || [],
      U,
      ue,
      X,
      re,
      ie,
      ne,
      oe
    )) : ye > 0 && ye & 64 && me && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    V.dynamicChildren ? (R(
      V.dynamicChildren,
      me,
      U,
      X,
      re,
      ie,
      ne
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    ($.key != null || X && $ === X.subTree) && Ya(
      V,
      $,
      !0
      /* shallow */
    )) : N(
      V,
      $,
      U,
      ue,
      X,
      re,
      ie,
      ne,
      oe
    );
  }, I = (V, $, U, K, X, re, ie, ne, oe) => {
    $.slotScopeIds = ne, V == null ? $.shapeFlag & 512 ? X.ctx.activate(
      $,
      U,
      K,
      ie,
      oe
    ) : k(
      $,
      U,
      K,
      X,
      re,
      ie,
      oe
    ) : O(V, $, oe);
  }, k = (V, $, U, K, X, re, ie) => {
    const ne = V.component = Gp(
      V,
      K,
      X
    );
    if (Al(V) && (ne.ctx.renderer = ot), Up(ne), ne.asyncDep) {
      if (X && X.registerDep(ne, M), !V.el) {
        const oe = ne.subTree = y(Yt);
        m(null, oe, $, U);
      }
    } else
      M(
        ne,
        V,
        $,
        U,
        X,
        re,
        ie
      );
  }, O = (V, $, U) => {
    const K = $.component = V.component;
    if (Jm(V, $, U))
      if (K.asyncDep && !K.asyncResolved) {
        j(K, $, U);
        return;
      } else
        K.next = $, Wm(K.update), K.effect.dirty = !0, K.update();
    else
      $.el = V.el, K.vnode = $;
  }, M = (V, $, U, K, X, re, ie) => {
    const ne = () => {
      if (V.isMounted) {
        let { next: ue, bu: ye, u: me, parent: Se, vnode: Pe } = V;
        {
          const Un = ih(V);
          if (Un) {
            ue && (ue.el = Pe.el, j(V, ue, ie)), Un.asyncDep.then(() => {
              V.isUnmounted || ne();
            });
            return;
          }
        }
        let $e = ue, Re;
        ur(V, !1), ue ? (ue.el = Pe.el, j(V, ue, ie)) : ue = Pe, ye && cs(ye), (Re = ue.props && ue.props.onVnodeBeforeUpdate) && yn(Re, Se, ue, Pe), ur(V, !0);
        const qe = ds(V), Tt = V.subTree;
        V.subTree = qe, g(
          Tt,
          qe,
          // parent may have changed if it's in a teleport
          d(Tt.el),
          // anchor may have changed if it's in a fragment
          se(Tt),
          V,
          X,
          re
        ), ue.el = qe.el, $e === null && Qm(V, qe.el), me && St(me, X), (Re = ue.props && ue.props.onVnodeUpdated) && St(
          () => yn(Re, Se, ue, Pe),
          X
        );
      } else {
        let ue;
        const { el: ye, props: me } = $, { bm: Se, m: Pe, parent: $e } = V, Re = Bi($);
        if (ur(V, !1), Se && cs(Se), !Re && (ue = me && me.onVnodeBeforeMount) && yn(ue, $e, $), ur(V, !0), ye && pn) {
          const qe = () => {
            V.subTree = ds(V), pn(
              ye,
              V.subTree,
              V,
              X,
              null
            );
          };
          Re ? $.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !V.isUnmounted && qe()
          ) : qe();
        } else {
          const qe = V.subTree = ds(V);
          g(
            null,
            qe,
            U,
            K,
            V,
            X,
            re
          ), $.el = qe.el;
        }
        if (Pe && St(Pe, X), !Re && (ue = me && me.onVnodeMounted)) {
          const qe = $;
          St(
            () => yn(ue, $e, qe),
            X
          );
        }
        ($.shapeFlag & 256 || $e && Bi($e.vnode) && $e.vnode.shapeFlag & 256) && V.a && St(V.a, X), V.isMounted = !0, $ = U = K = null;
      }
    }, oe = V.effect = new $a(
      ne,
      Ut,
      () => za(Q),
      V.scope
      // track it in component's effect scope
    ), Q = V.update = () => {
      oe.dirty && oe.run();
    };
    Q.id = V.uid, ur(V, !0), Q();
  }, j = (V, $, U) => {
    $.component = V;
    const K = V.vnode.props;
    V.vnode = $, V.next = null, Vp(V, $.props, K, U), Ip(V, $.children, U), Ir(), Zu(V), Tr();
  }, N = (V, $, U, K, X, re, ie, ne, oe = !1) => {
    const Q = V && V.children, ue = V ? V.shapeFlag : 0, ye = $.children, { patchFlag: me, shapeFlag: Se } = $;
    if (me > 0) {
      if (me & 128) {
        B(
          Q,
          ye,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe
        );
        return;
      } else if (me & 256) {
        F(
          Q,
          ye,
          U,
          K,
          X,
          re,
          ie,
          ne,
          oe
        );
        return;
      }
    }
    Se & 8 ? (ue & 16 && J(Q, X, re), ye !== Q && c(U, ye)) : ue & 16 ? Se & 16 ? B(
      Q,
      ye,
      U,
      K,
      X,
      re,
      ie,
      ne,
      oe
    ) : J(Q, X, re, !0) : (ue & 8 && c(U, ""), Se & 16 && T(
      ye,
      U,
      K,
      X,
      re,
      ie,
      ne,
      oe
    ));
  }, F = (V, $, U, K, X, re, ie, ne, oe) => {
    V = V || qr, $ = $ || qr;
    const Q = V.length, ue = $.length, ye = Math.min(Q, ue);
    let me;
    for (me = 0; me < ye; me++) {
      const Se = $[me] = oe ? Zn($[me]) : wn($[me]);
      g(
        V[me],
        Se,
        U,
        null,
        X,
        re,
        ie,
        ne,
        oe
      );
    }
    Q > ue ? J(
      V,
      X,
      re,
      !0,
      !1,
      ye
    ) : T(
      $,
      U,
      K,
      X,
      re,
      ie,
      ne,
      oe,
      ye
    );
  }, B = (V, $, U, K, X, re, ie, ne, oe) => {
    let Q = 0;
    const ue = $.length;
    let ye = V.length - 1, me = ue - 1;
    for (; Q <= ye && Q <= me; ) {
      const Se = V[Q], Pe = $[Q] = oe ? Zn($[Q]) : wn($[Q]);
      if (gr(Se, Pe))
        g(
          Se,
          Pe,
          U,
          null,
          X,
          re,
          ie,
          ne,
          oe
        );
      else
        break;
      Q++;
    }
    for (; Q <= ye && Q <= me; ) {
      const Se = V[ye], Pe = $[me] = oe ? Zn($[me]) : wn($[me]);
      if (gr(Se, Pe))
        g(
          Se,
          Pe,
          U,
          null,
          X,
          re,
          ie,
          ne,
          oe
        );
      else
        break;
      ye--, me--;
    }
    if (Q > ye) {
      if (Q <= me) {
        const Se = me + 1, Pe = Se < ue ? $[Se].el : K;
        for (; Q <= me; )
          g(
            null,
            $[Q] = oe ? Zn($[Q]) : wn($[Q]),
            U,
            Pe,
            X,
            re,
            ie,
            ne,
            oe
          ), Q++;
      }
    } else if (Q > me)
      for (; Q <= ye; )
        Y(V[Q], X, re, !0), Q++;
    else {
      const Se = Q, Pe = Q, $e = /* @__PURE__ */ new Map();
      for (Q = Pe; Q <= me; Q++) {
        const ft = $[Q] = oe ? Zn($[Q]) : wn($[Q]);
        ft.key != null && $e.set(ft.key, Q);
      }
      let Re, qe = 0;
      const Tt = me - Pe + 1;
      let Un = !1, mi = 0;
      const sr = new Array(Tt);
      for (Q = 0; Q < Tt; Q++)
        sr[Q] = 0;
      for (Q = Se; Q <= ye; Q++) {
        const ft = V[Q];
        if (qe >= Tt) {
          Y(ft, X, re, !0);
          continue;
        }
        let Mt;
        if (ft.key != null)
          Mt = $e.get(ft.key);
        else
          for (Re = Pe; Re <= me; Re++)
            if (sr[Re - Pe] === 0 && gr(ft, $[Re])) {
              Mt = Re;
              break;
            }
        Mt === void 0 ? Y(ft, X, re, !0) : (sr[Mt - Pe] = Q + 1, Mt >= mi ? mi = Mt : Un = !0, g(
          ft,
          $[Mt],
          U,
          null,
          X,
          re,
          ie,
          ne,
          oe
        ), qe++);
      }
      const go = Un ? $p(sr) : qr;
      for (Re = go.length - 1, Q = Tt - 1; Q >= 0; Q--) {
        const ft = Pe + Q, Mt = $[ft], mo = ft + 1 < ue ? $[ft + 1].el : K;
        sr[Q] === 0 ? g(
          null,
          Mt,
          U,
          mo,
          X,
          re,
          ie,
          ne,
          oe
        ) : Un && (Re < 0 || Q !== go[Re] ? H(Mt, U, mo, 2) : Re--);
      }
    }
  }, H = (V, $, U, K, X = null) => {
    const { el: re, type: ie, transition: ne, children: oe, shapeFlag: Q } = V;
    if (Q & 6) {
      H(V.component.subTree, $, U, K);
      return;
    }
    if (Q & 128) {
      V.suspense.move($, U, K);
      return;
    }
    if (Q & 64) {
      ie.move(V, $, U, ot);
      return;
    }
    if (ie === Le) {
      r(re, $, U);
      for (let ye = 0; ye < oe.length; ye++)
        H(oe[ye], $, U, K);
      r(V.anchor, $, U);
      return;
    }
    if (ie === ms) {
      _(V, $, U);
      return;
    }
    if (K !== 2 && Q & 1 && ne)
      if (K === 0)
        ne.beforeEnter(re), r(re, $, U), St(() => ne.enter(re), X);
      else {
        const { leave: ye, delayLeave: me, afterLeave: Se } = ne, Pe = () => r(re, $, U), $e = () => {
          ye(re, () => {
            Pe(), Se && Se();
          });
        };
        me ? me(re, Pe, $e) : $e();
      }
    else
      r(re, $, U);
  }, Y = (V, $, U, K = !1, X = !1) => {
    const {
      type: re,
      props: ie,
      ref: ne,
      children: oe,
      dynamicChildren: Q,
      shapeFlag: ue,
      patchFlag: ye,
      dirs: me
    } = V;
    if (ne != null && qs(ne, null, U, V, !0), ue & 256) {
      $.ctx.deactivate(V);
      return;
    }
    const Se = ue & 1 && me, Pe = !Bi(V);
    let $e;
    if (Pe && ($e = ie && ie.onVnodeBeforeUnmount) && yn($e, $, V), ue & 6)
      fe(V.component, U, K);
    else {
      if (ue & 128) {
        V.suspense.unmount(U, K);
        return;
      }
      Se && ar(V, null, $, "beforeUnmount"), ue & 64 ? V.type.remove(
        V,
        $,
        U,
        X,
        ot,
        K
      ) : Q && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (re !== Le || ye > 0 && ye & 64) ? J(
        Q,
        $,
        U,
        !1,
        !0
      ) : (re === Le && ye & 384 || !X && ue & 16) && J(oe, $, U), K && ee(V);
    }
    (Pe && ($e = ie && ie.onVnodeUnmounted) || Se) && St(() => {
      $e && yn($e, $, V), Se && ar(V, null, $, "unmounted");
    }, U);
  }, ee = (V) => {
    const { type: $, el: U, anchor: K, transition: X } = V;
    if ($ === Le) {
      le(U, K);
      return;
    }
    if ($ === ms) {
      b(V);
      return;
    }
    const re = () => {
      o(U), X && !X.persisted && X.afterLeave && X.afterLeave();
    };
    if (V.shapeFlag & 1 && X && !X.persisted) {
      const { leave: ie, delayLeave: ne } = X, oe = () => ie(U, re);
      ne ? ne(V.el, re, oe) : oe();
    } else
      re();
  }, le = (V, $) => {
    let U;
    for (; V !== $; )
      U = f(V), o(V), V = U;
    o($);
  }, fe = (V, $, U) => {
    const { bum: K, scope: X, update: re, subTree: ie, um: ne } = V;
    K && cs(K), X.stop(), re && (re.active = !1, Y(ie, V, $, U)), ne && St(ne, $), St(() => {
      V.isUnmounted = !0;
    }, $), $ && $.pendingBranch && !$.isUnmounted && V.asyncDep && !V.asyncResolved && V.suspenseId === $.pendingId && ($.deps--, $.deps === 0 && $.resolve());
  }, J = (V, $, U, K = !1, X = !1, re = 0) => {
    for (let ie = re; ie < V.length; ie++)
      Y(V[ie], $, U, K, X);
  }, se = (V) => V.shapeFlag & 6 ? se(V.component.subTree) : V.shapeFlag & 128 ? V.suspense.next() : f(V.anchor || V.el);
  let Ee = !1;
  const Fe = (V, $, U) => {
    V == null ? $._vnode && Y($._vnode, null, null, !0) : g(
      $._vnode || null,
      V,
      $,
      null,
      null,
      null,
      U
    ), Ee || (Ee = !0, Zu(), Dd(), Ee = !1), $._vnode = V;
  }, ot = {
    p: g,
    um: Y,
    m: H,
    r: ee,
    mt: k,
    mc: T,
    pc: N,
    pbc: R,
    n: se,
    o: e
  };
  let et, pn;
  return {
    render: Fe,
    hydrate: et,
    createApp: Cp(Fe, et)
  };
}
function gs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ur({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ap(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ya(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (_e(r) && _e(o))
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let s = o[i];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = o[i] = Zn(o[i]), s.el = l.el), n || Ya(l, s)), s.type === ni && (s.el = l.el);
    }
}
function $p(e) {
  const t = e.slice(), n = [0];
  let r, o, i, l, s;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[r] = o, n.push(r);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        s = i + l >> 1, e[n[s]] < u ? i = s + 1 : l = s;
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function ih(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ih(t);
}
const Np = (e) => e.__isTeleport, To = (e) => e && (e.disabled || e.disabled === ""), cc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, fc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ys = (e, t) => {
  const n = e && e.to;
  return Ge(n) ? t ? t(n) : null : n;
}, Rp = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, o, i, l, s, a, u) {
    const {
      mc: c,
      pc: d,
      pbc: f,
      o: { insert: h, querySelector: v, createText: g, createComment: p }
    } = u, m = To(t.props);
    let { shapeFlag: w, children: _, dynamicChildren: b } = t;
    if (e == null) {
      const x = t.el = g(""), E = t.anchor = g("");
      h(x, n, r), h(E, n, r);
      const S = t.target = Ys(t.props, v), T = t.targetAnchor = g("");
      S && (h(T, S), l === "svg" || cc(S) ? l = "svg" : (l === "mathml" || fc(S)) && (l = "mathml"));
      const A = (R, D) => {
        w & 16 && c(
          _,
          R,
          D,
          o,
          i,
          l,
          s,
          a
        );
      };
      m ? A(n, E) : S && A(S, T);
    } else {
      t.el = e.el;
      const x = t.anchor = e.anchor, E = t.target = e.target, S = t.targetAnchor = e.targetAnchor, T = To(e.props), A = T ? n : E, R = T ? x : S;
      if (l === "svg" || cc(E) ? l = "svg" : (l === "mathml" || fc(E)) && (l = "mathml"), b ? (f(
        e.dynamicChildren,
        b,
        A,
        o,
        i,
        l,
        s
      ), Ya(e, t, !0)) : a || d(
        e,
        t,
        A,
        R,
        o,
        i,
        l,
        s,
        !1
      ), m)
        T ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Si(
          t,
          n,
          x,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const D = t.target = Ys(
          t.props,
          v
        );
        D && Si(
          t,
          D,
          null,
          u,
          0
        );
      } else T && Si(
        t,
        E,
        S,
        u,
        1
      );
    }
    lh(t);
  },
  remove(e, t, n, r, { um: o, o: { remove: i } }, l) {
    const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e;
    if (d && i(c), l && i(u), s & 16) {
      const h = l || !To(f);
      for (let v = 0; v < a.length; v++) {
        const g = a[v];
        o(
          g,
          t,
          n,
          h,
          !!g.dynamicChildren
        );
      }
    }
  },
  move: Si,
  hydrate: Op
};
function Si(e, t, n, { o: { insert: r }, m: o }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e, d = i === 2;
  if (d && r(l, t, n), (!d || To(c)) && a & 16)
    for (let f = 0; f < u.length; f++)
      o(
        u[f],
        t,
        n,
        2
      );
  d && r(s, t, n);
}
function Op(e, t, n, r, o, i, {
  o: { nextSibling: l, parentNode: s, querySelector: a }
}, u) {
  const c = t.target = Ys(
    t.props,
    a
  );
  if (c) {
    const d = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (To(t.props))
        t.anchor = u(
          l(e),
          t,
          s(e),
          n,
          r,
          o,
          i
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
          r,
          o,
          i
        );
      }
    lh(t);
  }
  return t.anchor && l(t.anchor);
}
const Bp = Rp;
function lh(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Le = Symbol.for("v-fgt"), ni = Symbol.for("v-txt"), Yt = Symbol.for("v-cmt"), ms = Symbol.for("v-stc"), Mo = [];
let on = null;
function vt(e = !1) {
  Mo.push(on = e ? null : []);
}
function Fp() {
  Mo.pop(), on = Mo[Mo.length - 1] || null;
}
let Do = 1;
function dc(e) {
  Do += e;
}
function sh(e) {
  return e.dynamicChildren = Do > 0 ? on || qr : null, Fp(), Do > 0 && on && on.push(e), e;
}
function el(e, t, n, r, o, i) {
  return sh(
    Ae(
      e,
      t,
      n,
      r,
      o,
      i,
      !0
    )
  );
}
function ln(e, t, n, r, o) {
  return sh(
    y(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function tl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function gr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ol = "__vInternal", ah = ({ key: e }) => e ?? null, Fi = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ge(e) || Ue(e) || Ve(e) ? { i: mt, r: e, k: t, f: !!n } : e : null);
function Ae(e, t = null, n = null, r = 0, o = null, i = e === Le ? 0 : 1, l = !1, s = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ah(t),
    ref: t && Fi(t),
    scopeId: zd,
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
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: mt
  };
  return s ? (Ka(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ge(n) ? 8 : 16), Do > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  on && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && on.push(a), a;
}
const y = Dp;
function Dp(e, t = null, n = null, r = 0, o = null, i = !1) {
  if ((!e || e === tp) && (e = Yt), tl(e)) {
    const s = Nn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ka(s, n), Do > 0 && !i && on && (s.shapeFlag & 6 ? on[on.indexOf(e)] = s : on.push(s)), s.patchFlag |= -2, s;
  }
  if (Xp(e) && (e = e.__vccOpts), t) {
    t = Hp(t);
    let { class: s, style: a } = t;
    s && !Ge(s) && (t.class = Ma(s)), Be(a) && (Td(a) && !_e(a) && (a = Ke({}, a)), t.style = Ta(a));
  }
  const l = Ge(e) ? 1 : rp(e) ? 128 : Np(e) ? 64 : Be(e) ? 4 : Ve(e) ? 2 : 0;
  return Ae(
    e,
    t,
    n,
    r,
    o,
    l,
    i,
    !0
  );
}
function Hp(e) {
  return e ? Td(e) || Ol in e ? Ke({}, e) : e : null;
}
function Nn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: l } = e, s = t ? he(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && ah(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? _e(o) ? o.concat(Fi(t)) : [o, Fi(t)] : Fi(t)
    ) : o,
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
    patchFlag: t && e.type !== Le ? i === -1 ? 16 : i | 16 : i,
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
function Qe(e = " ", t = 0) {
  return y(ni, null, e, t);
}
function en(e = "", t = !1) {
  return t ? (vt(), ln(Yt, null, e)) : y(Yt, null, e);
}
function wn(e) {
  return e == null || typeof e == "boolean" ? y(Yt) : _e(e) ? y(
    Le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Zn(e) : y(ni, null, String(e));
}
function Zn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Nn(e);
}
function Ka(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (_e(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ka(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Ol in t) ? t._ctx = mt : o === 3 && mt && (mt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ve(t) ? (t = { default: t, _ctx: mt }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Qe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function he(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ma([t.class, r.class]));
      else if (o === "style")
        t.style = Ta([t.style, r.style]);
      else if (Vl(o)) {
        const i = t[o], l = r[o];
        l && i !== l && !(_e(i) && i.includes(l)) && (t[o] = i ? [].concat(i, l) : l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function yn(e, t, n, r = null) {
  qt(e, t, 7, [
    n,
    r
  ]);
}
const jp = Qd();
let zp = 0;
function Gp(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || jp, i = {
    uid: zp++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new bd(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: th(r, o),
    emitsOptions: jd(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: De,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Km.bind(null, i), e.ce && e.ce(i), i;
}
let it = null;
const Bl = () => it || mt;
let nl, Ks;
{
  const e = md(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (i) => {
      o.length > 1 ? o.forEach((l) => l(i)) : o[0](i);
    };
  };
  nl = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => it = n
  ), Ks = t(
    "__VUE_SSR_SETTERS__",
    (n) => Fl = n
  );
}
const ri = (e) => {
  const t = it;
  return nl(e), e.scope.on(), () => {
    e.scope.off(), nl(t);
  };
}, hc = () => {
  it && it.scope.off(), nl(null);
};
function uh(e) {
  return e.vnode.shapeFlag & 4;
}
let Fl = !1;
function Up(e, t = !1) {
  t && Ks(t);
  const { props: n, children: r } = e.vnode, o = uh(e);
  Ep(e, n, o, t), Pp(e, r);
  const i = o ? Wp(e, t) : void 0;
  return t && Ks(!1), i;
}
function Wp(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Md(new Proxy(e.ctx, yp));
  const { setup: r } = n;
  if (r) {
    const o = e.setupContext = r.length > 1 ? Yp(e) : null, i = ri(e);
    Ir();
    const l = tr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    );
    if (Tr(), i(), hd(l)) {
      if (l.then(hc, hc), t)
        return l.then((s) => {
          vc(e, s, t);
        }).catch((s) => {
          Tl(s, e, 0);
        });
      e.asyncDep = l;
    } else
      vc(e, l, t);
  } else
    ch(e, t);
}
function vc(e, t, n) {
  Ve(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Be(t) && (e.setupState = Rd(t)), ch(e, n);
}
let gc;
function ch(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && gc && !r.render) {
      const o = r.template || Wa(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: s, compilerOptions: a } = r, u = Ke(
          Ke(
            {
              isCustomElement: i,
              delimiters: s
            },
            l
          ),
          a
        );
        r.render = gc(o, u);
      }
    }
    e.render = r.render || Ut;
  }
  {
    const o = ri(e);
    Ir();
    try {
      bp(e);
    } finally {
      Tr(), o();
    }
  }
}
function qp(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return Vt(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Yp(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return qp(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Dl(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Rd(Md(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Po)
          return Po[n](e);
      },
      has(t, n) {
        return n in t || n in Po;
      }
    }));
}
function Kp(e, t = !0) {
  return Ve(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Xp(e) {
  return Ve(e) && "__vccOpts" in e;
}
const C = (e, t) => Fm(e, t, Fl);
function Hn(e, t, n) {
  const r = arguments.length;
  return r === 2 ? Be(t) && !_e(t) ? tl(t) ? y(e, null, [t]) : y(e, t) : y(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && tl(n) && (n = [n]), y(e, t, n));
}
const Zp = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Jp = "http://www.w3.org/2000/svg", Qp = "http://www.w3.org/1998/Math/MathML", Jn = typeof document < "u" ? document : null, mc = Jn && /* @__PURE__ */ Jn.createElement("template"), e0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Jn.createElementNS(Jp, e) : t === "mathml" ? Jn.createElementNS(Qp, e) : Jn.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
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
  insertStaticContent(e, t, n, r, o, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      mc.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
      const s = mc.content;
      if (r === "svg" || r === "mathml") {
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
}, qn = "transition", po = "animation", no = Symbol("_vtc"), Rn = (e, { slots: t }) => Hn(up, dh(e), t);
Rn.displayName = "Transition";
const fh = {
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
}, t0 = Rn.props = /* @__PURE__ */ Ke(
  {},
  Yd,
  fh
), cr = (e, t = []) => {
  _e(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, pc = (e) => e ? _e(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function dh(e) {
  const t = {};
  for (const L in e)
    L in fh || (t[L] = e[L]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: r,
    duration: o,
    enterFromClass: i = `${n}-enter-from`,
    enterActiveClass: l = `${n}-enter-active`,
    enterToClass: s = `${n}-enter-to`,
    appearFromClass: a = i,
    appearActiveClass: u = l,
    appearToClass: c = s,
    leaveFromClass: d = `${n}-leave-from`,
    leaveActiveClass: f = `${n}-leave-active`,
    leaveToClass: h = `${n}-leave-to`
  } = e, v = n0(o), g = v && v[0], p = v && v[1], {
    onBeforeEnter: m,
    onEnter: w,
    onEnterCancelled: _,
    onLeave: b,
    onLeaveCancelled: x,
    onBeforeAppear: E = m,
    onAppear: S = w,
    onAppearCancelled: T = _
  } = t, A = (L, I, k) => {
    Yn(L, I ? c : s), Yn(L, I ? u : l), k && k();
  }, R = (L, I) => {
    L._isLeaving = !1, Yn(L, d), Yn(L, h), Yn(L, f), I && I();
  }, D = (L) => (I, k) => {
    const O = L ? S : w, M = () => A(I, L, k);
    cr(O, [I, M]), yc(() => {
      Yn(I, L ? a : i), In(I, L ? c : s), pc(O) || bc(I, r, g, M);
    });
  };
  return Ke(t, {
    onBeforeEnter(L) {
      cr(m, [L]), In(L, i), In(L, l);
    },
    onBeforeAppear(L) {
      cr(E, [L]), In(L, a), In(L, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave(L, I) {
      L._isLeaving = !0;
      const k = () => R(L, I);
      In(L, d), vh(), In(L, f), yc(() => {
        L._isLeaving && (Yn(L, d), In(L, h), pc(b) || bc(L, r, p, k));
      }), cr(b, [L, k]);
    },
    onEnterCancelled(L) {
      A(L, !1), cr(_, [L]);
    },
    onAppearCancelled(L) {
      A(L, !0), cr(T, [L]);
    },
    onLeaveCancelled(L) {
      R(L), cr(x, [L]);
    }
  });
}
function n0(e) {
  if (e == null)
    return null;
  if (Be(e))
    return [ps(e.enter), ps(e.leave)];
  {
    const t = ps(e);
    return [t, t];
  }
}
function ps(e) {
  return Bs(e);
}
function In(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[no] || (e[no] = /* @__PURE__ */ new Set())).add(t);
}
function Yn(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[no];
  n && (n.delete(t), n.size || (e[no] = void 0));
}
function yc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let r0 = 0;
function bc(e, t, n, r) {
  const o = e._endId = ++r0, i = () => {
    o === e._endId && r();
  };
  if (n)
    return setTimeout(i, n);
  const { type: l, timeout: s, propCount: a } = hh(e, t);
  if (!l)
    return r();
  const u = l + "end";
  let c = 0;
  const d = () => {
    e.removeEventListener(u, f), i();
  }, f = (h) => {
    h.target === e && ++c >= a && d();
  };
  setTimeout(() => {
    c < a && d();
  }, s + 1), e.addEventListener(u, f);
}
function hh(e, t) {
  const n = window.getComputedStyle(e), r = (v) => (n[v] || "").split(", "), o = r(`${qn}Delay`), i = r(`${qn}Duration`), l = wc(o, i), s = r(`${po}Delay`), a = r(`${po}Duration`), u = wc(s, a);
  let c = null, d = 0, f = 0;
  t === qn ? l > 0 && (c = qn, d = l, f = i.length) : t === po ? u > 0 && (c = po, d = u, f = a.length) : (d = Math.max(l, u), c = d > 0 ? l > u ? qn : po : null, f = c ? c === qn ? i.length : a.length : 0);
  const h = c === qn && /\b(transform|all)(,|$)/.test(
    r(`${qn}Property`).toString()
  );
  return {
    type: c,
    timeout: d,
    propCount: f,
    hasTransform: h
  };
}
function wc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => _c(n) + _c(e[r])));
}
function _c(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function vh() {
  return document.body.offsetHeight;
}
function o0(e, t, n) {
  const r = e[no];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const rl = Symbol("_vod"), gh = Symbol("_vsh"), bt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[rl] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : yo(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), yo(e, !0), r.enter(e)) : r.leave(e, () => {
      yo(e, !1);
    }) : yo(e, t));
  },
  beforeUnmount(e, { value: t }) {
    yo(e, t);
  }
};
function yo(e, t) {
  e.style.display = t ? e[rl] : "none", e[gh] = !t;
}
const i0 = Symbol(""), l0 = /(^|;)\s*display\s*:/;
function s0(e, t, n) {
  const r = e.style, o = Ge(n);
  let i = !1;
  if (n && !o) {
    if (t)
      if (Ge(t))
        for (const l of t.split(";")) {
          const s = l.slice(0, l.indexOf(":")).trim();
          n[s] == null && Di(r, s, "");
        }
      else
        for (const l in t)
          n[l] == null && Di(r, l, "");
    for (const l in n)
      l === "display" && (i = !0), Di(r, l, n[l]);
  } else if (o) {
    if (t !== n) {
      const l = r[i0];
      l && (n += ";" + l), r.cssText = n, i = l0.test(n);
    }
  } else t && e.removeAttribute("style");
  rl in e && (e[rl] = i ? r.display : "", e[gh] && (r.display = "none"));
}
const xc = /\s*!important$/;
function Di(e, t, n) {
  if (_e(n))
    n.forEach((r) => Di(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = a0(e, t);
    xc.test(n) ? e.setProperty(
      tn(r),
      n.replace(xc, ""),
      "important"
    ) : e[r] = n;
  }
}
const kc = ["Webkit", "Moz", "ms"], ys = {};
function a0(e, t) {
  const n = ys[t];
  if (n)
    return n;
  let r = yt(t);
  if (r !== "filter" && r in e)
    return ys[t] = r;
  r = Fn(r);
  for (let o = 0; o < kc.length; o++) {
    const i = kc[o] + r;
    if (i in e)
      return ys[t] = i;
  }
  return t;
}
const Sc = "http://www.w3.org/1999/xlink";
function u0(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Sc, t.slice(6, t.length)) : e.setAttributeNS(Sc, t, n);
  else {
    const i = gm(t);
    n == null || i && !pd(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function c0(e, t, n, r, o, i, l) {
  if (t === "innerHTML" || t === "textContent") {
    r && l(r, o, i), e[t] = n ?? "";
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
    u === "boolean" ? n = pd(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function f0(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function d0(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Cc = Symbol("_vei");
function h0(e, t, n, r, o = null) {
  const i = e[Cc] || (e[Cc] = {}), l = i[t];
  if (r && l)
    l.value = r;
  else {
    const [s, a] = v0(t);
    if (r) {
      const u = i[t] = p0(r, o);
      f0(e, s, u, a);
    } else l && (d0(e, s, l, a), i[t] = void 0);
  }
}
const Ec = /(?:Once|Passive|Capture)$/;
function v0(e) {
  let t;
  if (Ec.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Ec); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : tn(e.slice(2)), t];
}
let bs = 0;
const g0 = /* @__PURE__ */ Promise.resolve(), m0 = () => bs || (g0.then(() => bs = 0), bs = Date.now());
function p0(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    qt(
      y0(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = m0(), n;
}
function y0(e, t) {
  if (_e(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const Vc = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, b0 = (e, t, n, r, o, i, l, s, a) => {
  const u = o === "svg";
  t === "class" ? o0(e, r, u) : t === "style" ? s0(e, n, r) : Vl(t) ? La(t) || h0(e, t, n, r, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : w0(e, t, r, u)) ? c0(
    e,
    t,
    r,
    i,
    l,
    s,
    a
  ) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), u0(e, t, r, u));
};
function w0(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Vc(t) && Ve(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Vc(t) && Ge(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function _0(e, t) {
  const n = /* @__PURE__ */ Mr(e);
  class r extends Xa {
    constructor(i) {
      super(n, i, t);
    }
  }
  return r.def = n, r;
}
const x0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Xa extends x0 {
  constructor(t, n = {}, r) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Xe(() => {
      this._connected || (Ic(null, this.shadowRoot), this._instance = null);
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
    const t = (r, o = !1) => {
      const { props: i, styles: l } = r;
      let s;
      if (i && !_e(i))
        for (const a in i) {
          const u = i[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = Bs(this._props[a])), (s || (s = /* @__PURE__ */ Object.create(null)))[yt(a)] = !0);
        }
      this._numberProps = s, o && this._resolveProps(r), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, r = _e(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(yt))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(i) {
          this._setProp(o, i);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const r = yt(t);
    this._numberProps && this._numberProps[r] && (n = Bs(n)), this._setProp(r, n, !1);
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
  _setProp(t, n, r = !0, o = !0) {
    n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), r && (n === !0 ? this.setAttribute(tn(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(tn(t), n + "") : n || this.removeAttribute(tn(t))));
  }
  _update() {
    Ic(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = y(this._def, Ke({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const r = (i, l) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: l
          })
        );
      };
      n.emit = (i, ...l) => {
        r(i, l), tn(i) !== i && r(tn(i), l);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Xa) {
          n.parent = o._instance, n.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const r = document.createElement("style");
      r.textContent = n, this.shadowRoot.appendChild(r);
    });
  }
}
const mh = /* @__PURE__ */ new WeakMap(), ph = /* @__PURE__ */ new WeakMap(), ol = Symbol("_moveCb"), Lc = Symbol("_enterCb"), yh = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ke({}, t0, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Bl(), r = qd();
    let o, i;
    return Zd(() => {
      if (!o.length)
        return;
      const l = e.moveClass || `${e.name || "v"}-move`;
      if (!V0(
        o[0].el,
        n.vnode.el,
        l
      ))
        return;
      o.forEach(S0), o.forEach(C0);
      const s = o.filter(E0);
      vh(), s.forEach((a) => {
        const u = a.el, c = u.style;
        In(u, l), c.transform = c.webkitTransform = c.transitionDuration = "";
        const d = u[ol] = (f) => {
          f && f.target !== u || (!f || /transform$/.test(f.propertyName)) && (u.removeEventListener("transitionend", d), u[ol] = null, Yn(u, l));
        };
        u.addEventListener("transitionend", d);
      });
    }), () => {
      const l = xe(e), s = dh(l);
      let a = l.tag || Le;
      o = i, i = t.default ? Ua(t.default()) : [];
      for (let u = 0; u < i.length; u++) {
        const c = i[u];
        c.key != null && Fo(
          c,
          Bo(c, s, r, n)
        );
      }
      if (o)
        for (let u = 0; u < o.length; u++) {
          const c = o[u];
          Fo(
            c,
            Bo(c, s, r, n)
          ), mh.set(c, c.el.getBoundingClientRect());
        }
      return y(a, null, i);
    };
  }
}, k0 = (e) => delete e.mode;
yh.props;
const bh = yh;
function S0(e) {
  const t = e.el;
  t[ol] && t[ol](), t[Lc] && t[Lc]();
}
function C0(e) {
  ph.set(e, e.el.getBoundingClientRect());
}
function E0(e) {
  const t = mh.get(e), n = ph.get(e), r = t.left - n.left, o = t.top - n.top;
  if (r || o) {
    const i = e.el.style;
    return i.transform = i.webkitTransform = `translate(${r}px,${o}px)`, i.transitionDuration = "0s", e;
  }
}
function V0(e, t, n) {
  const r = e.cloneNode(), o = e[no];
  o && o.forEach((s) => {
    s.split(/\s+/).forEach((a) => a && r.classList.remove(a));
  }), n.split(/\s+/).forEach((s) => s && r.classList.add(s)), r.style.display = "none";
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(r);
  const { hasTransform: l } = hh(r);
  return i.removeChild(r), l;
}
const L0 = /* @__PURE__ */ Ke({ patchProp: b0 }, e0);
let Pc;
function wh() {
  return Pc || (Pc = Tp(L0));
}
const Ic = (...e) => {
  wh().render(...e);
}, P0 = (...e) => {
  const t = wh().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = T0(r);
    if (!o)
      return;
    const i = t._component;
    !Ve(i) && !i.render && !i.template && (i.template = o.innerHTML), o.innerHTML = "";
    const l = n(o, !1, I0(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function I0(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function T0(e) {
  return Ge(e) ? document.querySelector(e) : e;
}
const M0 = (e, { plugins: t = [] } = {}) => /* @__PURE__ */ _0({
  styles: e.styles,
  render: () => Hn(e),
  setup() {
    const n = P0();
    t.forEach(n.use), n.use(t[0]);
    const r = Bl();
    Object.assign(r.appContext, n._context), Object.assign(r.provides, n._context.provides);
  }
}), Oe = typeof window < "u", Za = Oe && "IntersectionObserver" in window, A0 = Oe && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), Tc = Oe && "EyeDropper" in window;
function _h(e, t, n) {
  const r = t.length - 1;
  if (r < 0) return e === void 0 ? n : e;
  for (let o = 0; o < r; o++) {
    if (e == null)
      return n;
    e = e[t[o]];
  }
  return e == null || e[t[r]] === void 0 ? n : e[t[r]];
}
function Ar(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((r) => Ar(e[r], t[r]));
}
function Xs(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), _h(e, t.split("."), n));
}
function Tn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const o = t(e, n);
    return typeof o > "u" ? n : o;
  }
  if (typeof t == "string") return Xs(e, t, n);
  if (Array.isArray(t)) return _h(e, t, n);
  if (typeof t != "function") return n;
  const r = t(e, n);
  return typeof r > "u" ? n : r;
}
function Ja(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, r) => t + r);
}
function pe(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function il(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Ho(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Mc = Object.freeze({
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
}), $0 = Object.freeze({
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
function xh(e) {
  return Object.keys(e);
}
function pr(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function kh(e, t) {
  const n = {}, r = new Set(Object.keys(e));
  for (const o of t)
    r.has(o) && (n[o] = e[o]);
  return n;
}
function Ac(e, t, n) {
  const r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((l) => l instanceof RegExp ? l.test(i) : l === i) && !(n != null && n.some((l) => l === i)) ? r[i] = e[i] : o[i] = e[i];
  return [r, o];
}
function Xt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((r) => delete n[r]), n;
}
const Sh = /^on[^a-z]/, Qa = (e) => Sh.test(e), N0 = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function uo(e) {
  const [t, n] = Ac(e, [Sh]), r = Xt(t, N0), [o, i] = Ac(n, ["class", "style", "id", /^data-/]);
  return Object.assign(o, t), Object.assign(i, r), [o, i];
}
function kn(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function R0(e, t) {
  let n = 0;
  const r = function() {
    for (var o = arguments.length, i = new Array(o), l = 0; l < o; l++)
      i[l] = arguments[l];
    clearTimeout(n), n = setTimeout(() => e(...i), rn(t));
  };
  return r.clear = () => {
    clearTimeout(n);
  }, r.immediate = e, r;
}
function Bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function $c(e) {
  const t = e.toString().trim();
  return t.includes(".") ? t.length - t.indexOf(".") - 1 : 0;
}
function Nc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Rc(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function O0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let r = 0;
  for (; r < e.length; )
    n.push(e.substr(r, t)), r += t;
  return n;
}
function Oc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (e < t)
    return `${e} B`;
  const n = t === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let r = -1;
  for (; Math.abs(e) >= t && r < n.length - 1; )
    e /= t, ++r;
  return `${e.toFixed(1)} ${n[r]}B`;
}
function Ft() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const r = {};
  for (const o in e)
    r[o] = e[o];
  for (const o in t) {
    const i = e[o], l = t[o];
    if (il(i) && il(l)) {
      r[o] = Ft(i, l, n);
      continue;
    }
    if (Array.isArray(i) && Array.isArray(l) && n) {
      r[o] = n(i, l);
      continue;
    }
    r[o] = l;
  }
  return r;
}
function Ch(e) {
  return e.map((t) => t.type === Le ? Ch(t.children) : t).flat();
}
function xr() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (xr.cache.has(e)) return xr.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return xr.cache.set(e, t), t;
}
xr.cache = /* @__PURE__ */ new Map();
function Hi(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Hi(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Hi(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Hi(e, t.component.subTree).flat(1);
  }
  return [];
}
function B0(e) {
  return "touches" in e ? {
    clientX: e.touches[0].clientX,
    clientY: e.touches[0].clientY
  } : {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function eu(e) {
  const t = un({}), n = C(e);
  return Cn(() => {
    for (const r in n.value)
      t[r] = n.value[r];
  }, {
    flush: "sync"
  }), Ha(t);
}
function ll(e, t) {
  return e.includes(t);
}
function Eh(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const sn = () => [Function, Array];
function Bc(e, t) {
  return t = "on" + Fn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Vh(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (Array.isArray(e))
    for (const o of e)
      o(...n);
  else typeof e == "function" && e(...n);
}
function jo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((r) => `${r}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Lh(e, t, n) {
  let r, o = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    o += i, r = e[o];
  while ((!r || r.offsetParent == null || !((n == null ? void 0 : n(r)) ?? !0)) && o < e.length && o >= 0);
  return r;
}
function sl(e, t) {
  var r, o, i, l;
  const n = jo(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((r = n[0]) == null || r.focus());
  else if (t === "first")
    (o = n[0]) == null || o.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (l = n[t]) == null || l.focus();
  else {
    const s = Lh(n, t);
    s ? s.focus() : sl(e, t === "next" ? "first" : "last");
  }
}
function al(e, t) {
  if (!(Oe && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Ph(e) {
  return e.some((t) => tl(t) ? t.type === Yt ? !1 : t.type !== Le || Ph(t.children) : !0) ? e : null;
}
function F0(e, t) {
  if (!Oe || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function D0(e, t) {
  const n = e.clientX, r = e.clientY, o = t.getBoundingClientRect(), i = o.left, l = o.top, s = o.right, a = o.bottom;
  return n >= i && n <= s && r >= l && r <= a;
}
const Ih = ["top", "bottom"], H0 = ["start", "end", "left", "right"];
function Zs(e, t) {
  let [n, r] = e.split(" ");
  return r || (r = ll(Ih, n) ? "start" : ll(H0, n) ? "top" : "center"), {
    side: Fc(n, t),
    align: Fc(r, t)
  };
}
function Fc(e, t) {
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
function _s(e) {
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
function Dc(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Hc(e) {
  return ll(Ih, e.side) ? "y" : "x";
}
class kr {
  constructor(t) {
    let {
      x: n,
      y: r,
      width: o,
      height: i
    } = t;
    this.x = n, this.y = r, this.width = o, this.height = i;
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
function jc(e, t) {
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
function Th(e) {
  return Array.isArray(e) ? new kr({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function tu(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), r = n.transform;
  if (r) {
    let o, i, l, s, a;
    if (r.startsWith("matrix3d("))
      o = r.slice(9, -1).split(/, /), i = +o[0], l = +o[5], s = +o[12], a = +o[13];
    else if (r.startsWith("matrix("))
      o = r.slice(7, -1).split(/, /), i = +o[0], l = +o[3], s = +o[4], a = +o[5];
    else
      return new kr(t);
    const u = n.transformOrigin, c = t.x - s - (1 - i) * parseFloat(u), d = t.y - a - (1 - l) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = i ? t.width / i : e.offsetWidth + 1, h = l ? t.height / l : e.offsetHeight + 1;
    return new kr({
      x: c,
      y: d,
      width: f,
      height: h
    });
  } else
    return new kr(t);
}
function yr(e, t, n) {
  if (typeof e.animate > "u") return {
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
  return typeof r.finished > "u" && (r.finished = new Promise((o) => {
    r.onfinish = () => {
      o(r);
    };
  })), r;
}
const ji = /* @__PURE__ */ new WeakMap();
function j0(e, t) {
  Object.keys(t).forEach((n) => {
    if (Qa(n)) {
      const r = Eh(n), o = ji.get(e);
      if (t[n] == null)
        o == null || o.forEach((i) => {
          const [l, s] = i;
          l === r && (e.removeEventListener(r, s), o.delete(i));
        });
      else if (!o || ![...o].some((i) => i[0] === r && i[1] === t[n])) {
        e.addEventListener(r, t[n]);
        const i = o || /* @__PURE__ */ new Set();
        i.add([r, t[n]]), ji.has(e) || ji.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function z0(e, t) {
  Object.keys(t).forEach((n) => {
    if (Qa(n)) {
      const r = Eh(n), o = ji.get(e);
      o == null || o.forEach((i) => {
        const [l, s] = i;
        l === r && (e.removeEventListener(r, s), o.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const Fr = 2.4, zc = 0.2126729, Gc = 0.7151522, Uc = 0.072175, G0 = 0.55, U0 = 0.58, W0 = 0.57, q0 = 0.62, Ci = 0.03, Wc = 1.45, Y0 = 5e-4, K0 = 1.25, X0 = 1.25, qc = 0.078, Yc = 12.82051282051282, Ei = 0.06, Kc = 1e-3;
function Xc(e, t) {
  const n = (e.r / 255) ** Fr, r = (e.g / 255) ** Fr, o = (e.b / 255) ** Fr, i = (t.r / 255) ** Fr, l = (t.g / 255) ** Fr, s = (t.b / 255) ** Fr;
  let a = n * zc + r * Gc + o * Uc, u = i * zc + l * Gc + s * Uc;
  if (a <= Ci && (a += (Ci - a) ** Wc), u <= Ci && (u += (Ci - u) ** Wc), Math.abs(u - a) < Y0) return 0;
  let c;
  if (u > a) {
    const d = (u ** G0 - a ** U0) * K0;
    c = d < Kc ? 0 : d < qc ? d - d * Yc * Ei : d - Ei;
  } else {
    const d = (u ** q0 - a ** W0) * X0;
    c = d > -Kc ? 0 : d > -qc ? d - d * Yc * Ei : d + Ei;
  }
  return c * 100;
}
function Z0(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`;
}
const ul = 0.20689655172413793, J0 = (e) => e > ul ** 3 ? Math.cbrt(e) : e / (3 * ul ** 2) + 4 / 29, Q0 = (e) => e > ul ? e ** 3 : 3 * ul ** 2 * (e - 4 / 29);
function Mh(e) {
  const t = J0, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Ah(e) {
  const t = Q0, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const ey = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], ty = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, ny = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], ry = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function $h(e) {
  const t = Array(3), n = ty, r = ey;
  for (let o = 0; o < 3; ++o)
    t[o] = Math.round(Bt(n(r[o][0] * e[0] + r[o][1] * e[1] + r[o][2] * e[2])) * 255);
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
    b: r
  } = e;
  const o = [0, 0, 0], i = ry, l = ny;
  t = i(t / 255), n = i(n / 255), r = i(r / 255);
  for (let s = 0; s < 3; ++s)
    o[s] = l[s][0] * t + l[s][1] * n + l[s][2] * r;
  return o;
}
function Js(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function oy(e) {
  return Js(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Zc = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, iy = {
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
  hsl: (e, t, n, r) => Jc({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsla: (e, t, n, r) => Jc({
    h: e,
    s: t,
    l: n,
    a: r
  }),
  hsv: (e, t, n, r) => On({
    h: e,
    s: t,
    v: n,
    a: r
  }),
  hsva: (e, t, n, r) => On({
    h: e,
    s: t,
    v: n,
    a: r
  })
};
function Wt(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Zc.test(e)) {
    const {
      groups: t
    } = e.match(Zc), {
      fn: n,
      values: r
    } = t, o = r.split(/,\s*/).map((i) => i.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return iy[n](...o);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((n) => n + n).join("") : [6, 8].includes(t.length), Fh(t);
  } else if (typeof e == "object") {
    if (pr(e, ["r", "g", "b"]))
      return e;
    if (pr(e, ["h", "s", "l"]))
      return On(ru(e));
    if (pr(e, ["h", "s", "v"]))
      return On(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function On(e) {
  const {
    h: t,
    s: n,
    v: r,
    a: o
  } = e, i = (s) => {
    const a = (s + t / 60) % 6;
    return r - r * n * Math.max(Math.min(a, 4 - a, 1), 0);
  }, l = [i(5), i(3), i(1)].map((s) => Math.round(s * 255));
  return {
    r: l[0],
    g: l[1],
    b: l[2],
    a: o
  };
}
function Jc(e) {
  return On(ru(e));
}
function Hl(e) {
  if (!e) return {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  };
  const t = e.r / 255, n = e.g / 255, r = e.b / 255, o = Math.max(t, n, r), i = Math.min(t, n, r);
  let l = 0;
  o !== i && (o === t ? l = 60 * (0 + (n - r) / (o - i)) : o === n ? l = 60 * (2 + (r - t) / (o - i)) : o === r && (l = 60 * (4 + (t - n) / (o - i)))), l < 0 && (l = l + 360);
  const s = o === 0 ? 0 : (o - i) / o, a = [l, s, o];
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
    v: r,
    a: o
  } = e, i = r - r * n / 2, l = i === 1 || i === 0 ? 0 : (r - i) / Math.min(i, 1 - i);
  return {
    h: t,
    s: l,
    l: i,
    a: o
  };
}
function ru(e) {
  const {
    h: t,
    s: n,
    l: r,
    a: o
  } = e, i = r + n * Math.min(r, 1 - r), l = i === 0 ? 0 : 2 - 2 * r / i;
  return {
    h: t,
    s: l,
    v: i,
    a: o
  };
}
function Rh(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: o
  } = e;
  return o === void 0 ? `rgb(${t}, ${n}, ${r})` : `rgba(${t}, ${n}, ${r}, ${o})`;
}
function Oh(e) {
  return Rh(On(e));
}
function Vi(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Bh(e) {
  let {
    r: t,
    g: n,
    b: r,
    a: o
  } = e;
  return `#${[Vi(t), Vi(n), Vi(r), o !== void 0 ? Vi(Math.round(o * 255)) : ""].join("")}`;
}
function Fh(e) {
  e = ly(e);
  let [t, n, r, o] = O0(e, 2).map((i) => parseInt(i, 16));
  return o = o === void 0 ? o : o / 255, {
    r: t,
    g: n,
    b: r,
    a: o
  };
}
function Dh(e) {
  const t = Fh(e);
  return Hl(t);
}
function Hh(e) {
  return Bh(On(e));
}
function ly(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Nc(Nc(e, 6), 8, "F")), e;
}
function sy(e, t) {
  const n = Mh(nu(e));
  return n[0] = n[0] + t * 10, $h(Ah(n));
}
function ay(e, t) {
  const n = Mh(nu(e));
  return n[0] = n[0] - t * 10, $h(Ah(n));
}
function Qs(e) {
  const t = Wt(e);
  return nu(t)[1];
}
function uy(e, t) {
  const n = Qs(e), r = Qs(t), o = Math.max(n, r), i = Math.min(n, r);
  return (o + 0.05) / (i + 0.05);
}
function jh(e) {
  const t = Math.abs(Xc(Wt(0), Wt(e)));
  return Math.abs(Xc(Wt(16777215), Wt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Z(e, t) {
  return (n) => Object.keys(e).reduce((r, o) => {
    const l = typeof e[o] == "object" && e[o] != null && !Array.isArray(e[o]) ? e[o] : {
      type: e[o]
    };
    return n && o in n ? r[o] = {
      ...l,
      default: n[o]
    } : r[o] = l, t && !r[o].source && (r[o].source = t), r;
  }, {});
}
const ke = Z({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), ro = Symbol.for("vuetify:defaults");
function cy(e) {
  return te(e);
}
function ou() {
  const e = je(ro);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function En(e, t) {
  const n = ou(), r = te(e), o = C(() => {
    if (rn(t == null ? void 0 : t.disabled)) return n.value;
    const l = rn(t == null ? void 0 : t.scoped), s = rn(t == null ? void 0 : t.reset), a = rn(t == null ? void 0 : t.root);
    if (r.value == null && !(l || s || a)) return n.value;
    let u = Ft(r.value, {
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
  return ct(ro, o), o;
}
function fy(e, t) {
  var n, r;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((r = e.props) == null ? void 0 : r[xr(t)]) < "u";
}
function dy() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ou();
  const r = lt("useDefaults");
  if (t = t ?? r.type.name ?? r.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const o = C(() => {
    var a;
    return (a = n.value) == null ? void 0 : a[e._as ?? t];
  }), i = new Proxy(e, {
    get(a, u) {
      var d, f, h, v;
      const c = Reflect.get(a, u);
      return u === "class" || u === "style" ? [(d = o.value) == null ? void 0 : d[u], c].filter((g) => g != null) : typeof u == "string" && !fy(r.vnode, u) ? ((f = o.value) == null ? void 0 : f[u]) ?? ((v = (h = n.value) == null ? void 0 : h.global) == null ? void 0 : v[u]) ?? c : c;
    }
  }), l = be();
  Cn(() => {
    if (o.value) {
      const a = Object.entries(o.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      l.value = a.length ? Object.fromEntries(a) : void 0;
    } else
      l.value = void 0;
  });
  function s() {
    const a = my(ro, r);
    ct(ro, C(() => l.value ? Ft((a == null ? void 0 : a.value) ?? {}, l.value) : a == null ? void 0 : a.value));
  }
  return {
    props: i,
    provideSubDefaults: s
  };
}
function hn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = Z(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(r) {
      return kh(r, t);
    }, e.props._as = String, e.setup = function(r, o) {
      const i = ou();
      if (!i.value) return e._setup(r, o);
      const {
        props: l,
        provideSubDefaults: s
      } = dy(r, r._as ?? e.name, i), a = e._setup(l, o);
      return s(), a;
    };
  }
  return e;
}
function de() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? hn : Mr)(t);
}
function co(e) {
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
    setup(r, o) {
      let {
        slots: i
      } = o;
      return () => {
        var l;
        return Hn(r.tag, {
          class: [e, r.class],
          style: r.style
        }, (l = i.default) == null ? void 0 : l.call(i));
      };
    }
  });
}
function zh(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const zo = "cubic-bezier(0.4, 0, 0.2, 1)", hy = "cubic-bezier(0.0, 0, 0.2, 1)", vy = "cubic-bezier(0.4, 0, 1, 1)";
function lt(e, t) {
  const n = Bl();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Vn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = lt(e).type;
  return xr((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Gh = 0, zi = /* @__PURE__ */ new WeakMap();
function Lt() {
  const e = lt("getUid");
  if (zi.has(e)) return zi.get(e);
  {
    const t = Gh++;
    return zi.set(e, t), t;
  }
}
Lt.reset = () => {
  Gh = 0, zi = /* @__PURE__ */ new WeakMap();
};
function Uh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? gy(e) : iu(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function cl(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (iu(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function iu(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function gy(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function my(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : lt("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function py(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ve(e) {
  const t = lt("useRender");
  t.render = e;
}
const $r = Z({
  border: [Boolean, Number, String]
}, "border");
function Nr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    borderClasses: C(() => {
      const r = Ue(e) ? e.value : e.border, o = [];
      if (r === !0 || r === "")
        o.push(`${t}--border`);
      else if (typeof r == "string" || r === 0)
        for (const i of String(r).split(" "))
          o.push(`border-${i}`);
      return o;
    })
  };
}
const yy = [null, "default", "comfortable", "compact"], Zt = Z({
  density: {
    type: String,
    default: "default",
    validator: (e) => yy.includes(e)
  }
}, "density");
function vn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    densityClasses: C(() => `${t}--density-${e.density}`)
  };
}
const jn = Z({
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
function zn(e) {
  return {
    elevationClasses: C(() => {
      const n = Ue(e) ? e.value : e.elevation, r = [];
      return n == null || r.push(`elevation-${n}`), r;
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
      const r = Ue(e) ? e.value : e.rounded, o = Ue(e) ? e.value : e.tile, i = [];
      if (r === !0 || r === "")
        i.push(`${t}--rounded`);
      else if (typeof r == "string" || r === 0)
        for (const l of String(r).split(" "))
          i.push(`rounded-${l}`);
      else o && i.push("rounded-0");
      return i;
    })
  };
}
const We = Z({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), fl = Symbol.for("vuetify:theme"), Ze = Z({
  theme: String
}, "theme");
function Qc() {
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
function by() {
  var r, o;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Qc();
  const t = Qc();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [i, l] of Object.entries(e.themes ?? {})) {
    const s = l.dark || i === "dark" ? (r = t.themes) == null ? void 0 : r.dark : (o = t.themes) == null ? void 0 : o.light;
    n[i] = Ft(s, l);
  }
  return Ft(t, {
    ...e,
    themes: n
  });
}
function wy(e) {
  const t = by(e), n = te(t.defaultTheme), r = te(t.themes), o = C(() => {
    const c = {};
    for (const [d, f] of Object.entries(r.value)) {
      const h = c[d] = {
        ...f,
        colors: {
          ...f.colors
        }
      };
      if (t.variations)
        for (const v of t.variations.colors) {
          const g = h.colors[v];
          if (g)
            for (const p of ["lighten", "darken"]) {
              const m = p === "lighten" ? sy : ay;
              for (const w of Ja(t.variations[p], 1))
                h.colors[`${v}-${p}-${w}`] = Bh(m(Wt(g), w));
            }
        }
      for (const v of Object.keys(h.colors)) {
        if (/^on-[a-z]/.test(v) || h.colors[`on-${v}`]) continue;
        const g = `on-${v}`, p = Wt(h.colors[v]);
        h.colors[g] = jh(p);
      }
    }
    return c;
  }), i = C(() => o.value[n.value]), l = C(() => {
    const c = [];
    i.value.dark && fr(c, ":root", ["color-scheme: dark"]), fr(c, ":root", ef(i.value));
    for (const [v, g] of Object.entries(o.value))
      fr(c, `.v-theme--${v}`, [`color-scheme: ${g.dark ? "dark" : "normal"}`, ...ef(g)]);
    const d = [], f = [], h = new Set(Object.values(o.value).flatMap((v) => Object.keys(v.colors)));
    for (const v of h)
      /^on-[a-z]/.test(v) ? fr(f, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`]) : (fr(d, `.bg-${v}`, [`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${v})) !important`, `color: rgb(var(--v-theme-on-${v})) !important`]), fr(f, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]), fr(f, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
    return c.push(...d, ...f), c.map((v, g) => g === 0 ? v : `    ${v}`).join("");
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
        Oe && we(l, () => {
          h.patch(s);
        });
      } else
        Oe ? (d.addHeadObjs(C(s)), Cn(() => d.updateDOM())) : d.addHeadObjs(s());
    else {
      let v = function() {
        if (typeof document < "u" && !h) {
          const g = document.createElement("style");
          g.type = "text/css", g.id = "vuetify-theme-stylesheet", t.cspNonce && g.setAttribute("nonce", t.cspNonce), h = g, document.head.appendChild(h);
        }
        h && (h.innerHTML = l.value);
      };
      var f = v;
      let h = Oe ? document.getElementById("vuetify-theme-stylesheet") : null;
      Oe ? we(l, v, {
        immediate: !0
      }) : v();
    }
  }
  const u = C(() => t.isDisabled ? void 0 : `v-theme--${n.value}`);
  return {
    install: a,
    isDisabled: t.isDisabled,
    name: n,
    themes: r,
    current: i,
    computedThemes: o,
    themeClasses: u,
    styles: l,
    global: {
      name: n,
      current: i
    }
  };
}
function rt(e) {
  lt("provideTheme");
  const t = je(fl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = C(() => e.theme ?? t.name.value), r = C(() => t.themes.value[n.value]), o = C(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), i = {
    ...t,
    name: n,
    current: r,
    themeClasses: o
  };
  return ct(fl, i), i;
}
function fr(e, t, n) {
  e.push(`${t} {
`, ...n.map((r) => `  ${r};
`), `}
`);
}
function ef(e) {
  const t = e.dark ? 2 : 1, n = e.dark ? 1 : 2, r = [];
  for (const [o, i] of Object.entries(e.colors)) {
    const l = Wt(i);
    r.push(`--v-theme-${o}: ${l.r},${l.g},${l.b}`), o.startsWith("on-") || r.push(`--v-theme-${o}-overlay-multiplier: ${Qs(i) > 0.18 ? t : n}`);
  }
  for (const [o, i] of Object.entries(e.variables)) {
    const l = typeof i == "string" && i.startsWith("#") ? Wt(i) : void 0, s = l ? `${l.r}, ${l.g}, ${l.b}` : void 0;
    r.push(`--v-${o}: ${s ?? i}`);
  }
  return r;
}
function lu(e) {
  return eu(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Js(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && oy(e.value.background)) {
          const r = Wt(e.value.background);
          if (r.a == null || r.a === 1) {
            const o = jh(r);
            n.color = o, n.caretColor = o;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Js(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function an(e, t) {
  const n = C(() => ({
    text: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: o
  } = lu(n);
  return {
    textColorClasses: r,
    textColorStyles: o
  };
}
function Dt(e, t) {
  const n = C(() => ({
    background: Ue(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: r,
    colorStyles: o
  } = lu(n);
  return {
    backgroundColorClasses: r,
    backgroundColorStyles: o
  };
}
const _y = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function fo(e, t) {
  return y(Le, null, [e && y("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), y("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Gn = Z({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => _y.includes(e)
  }
}, "variant");
function ho(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = C(() => {
    const {
      variant: i
    } = rn(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: r,
    colorStyles: o
  } = lu(C(() => {
    const {
      variant: i,
      color: l
    } = rn(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: l
    };
  }));
  return {
    colorClasses: r,
    colorStyles: o,
    variantClasses: n
  };
}
const Wh = Z({
  divided: Boolean,
  ...$r(),
  ...ke(),
  ...Zt(),
  ...jn(),
  ...Pt(),
  ...We(),
  ...Ze(),
  ...Gn()
}, "VBtnGroup"), tf = de()({
  name: "VBtnGroup",
  props: Wh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      densityClasses: o
    } = vn(e), {
      borderClasses: i
    } = Nr(e), {
      elevationClasses: l
    } = zn(e), {
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
      }, r.value, i.value, o.value, l.value, s.value, e.class],
      style: e.style
    }, n));
  }
});
function Er(e, t) {
  let n;
  function r() {
    n = Aa(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), r();
    }) : t());
  }
  we(e, (o) => {
    o && !n ? r() : o || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), wt(() => {
    n == null || n.stop();
  });
}
function Ne(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const i = lt("useProxiedModel"), l = te(e[t] !== void 0 ? e[t] : n), s = xr(t), u = C(s !== t ? () => {
    var d, f, h, v;
    return e[t], !!(((d = i.vnode.props) != null && d.hasOwnProperty(t) || (f = i.vnode.props) != null && f.hasOwnProperty(s)) && ((h = i.vnode.props) != null && h.hasOwnProperty(`onUpdate:${t}`) || (v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${s}`)));
  } : () => {
    var d, f;
    return e[t], !!((d = i.vnode.props) != null && d.hasOwnProperty(t) && ((f = i.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  Er(() => !u.value, () => {
    we(() => e[t], (d) => {
      l.value = d;
    });
  });
  const c = C({
    get() {
      const d = e[t];
      return r(u.value ? d : l.value);
    },
    set(d) {
      const f = o(d), h = xe(u.value ? e[t] : l.value);
      h === f || r(h) === d || (l.value = f, i == null || i.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : l.value
  }), c;
}
const jl = Z({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), zl = Z({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Gl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const r = lt("useGroupItem");
  if (!r)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const o = Lt();
  ct(Symbol.for(`${t.description}:id`), o);
  const i = je(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const l = ae(e, "value"), s = C(() => !!(i.disabled.value || e.disabled));
  i.register({
    id: o,
    value: l,
    disabled: s
  }, r), dn(() => {
    i.unregister(o);
  });
  const a = C(() => i.isSelected(o)), u = C(() => a.value && [i.selectedClass.value, e.selectedClass]);
  return we(a, (c) => {
    r.emit("group:selected", {
      value: c
    });
  }, {
    flush: "sync"
  }), {
    id: o,
    isSelected: a,
    toggle: () => i.select(o, !a.value),
    select: (c) => i.select(o, c),
    selectedClass: u,
    value: l,
    disabled: s,
    group: i
  };
}
function oi(e, t) {
  let n = !1;
  const r = un([]), o = Ne(e, "modelValue", [], (f) => f == null ? [] : qh(r, kn(f)), (f) => {
    const h = ky(r, f);
    return e.multiple ? h : h[0];
  }), i = lt("useGroup");
  function l(f, h) {
    const v = f, g = Symbol.for(`${t.description}:id`), m = Hi(g, i == null ? void 0 : i.vnode).indexOf(h);
    rn(v.value) == null && (v.value = m), m > -1 ? r.splice(m, 0, v) : r.push(v);
  }
  function s(f) {
    if (n) return;
    a();
    const h = r.findIndex((v) => v.id === f);
    r.splice(h, 1);
  }
  function a() {
    const f = r.find((h) => !h.disabled);
    f && e.mandatory === "force" && !o.value.length && (o.value = [f.id]);
  }
  fn(() => {
    a();
  }), dn(() => {
    n = !0;
  });
  function u(f, h) {
    const v = r.find((g) => g.id === f);
    if (!(h && (v != null && v.disabled)))
      if (e.multiple) {
        const g = o.value.slice(), p = g.findIndex((w) => w === f), m = ~p;
        if (h = h ?? !m, m && e.mandatory && g.length <= 1 || !m && e.max != null && g.length + 1 > e.max) return;
        p < 0 && h ? g.push(f) : p >= 0 && !h && g.splice(p, 1), o.value = g;
      } else {
        const g = o.value.includes(f);
        if (e.mandatory && g) return;
        o.value = h ?? !g ? [f] : [];
      }
  }
  function c(f) {
    if (e.multiple, o.value.length) {
      const h = o.value[0], v = r.findIndex((m) => m.id === h);
      let g = (v + f) % r.length, p = r[g];
      for (; p.disabled && g !== v; )
        g = (g + f) % r.length, p = r[g];
      if (p.disabled) return;
      o.value = [r[g].id];
    } else {
      const h = r.find((v) => !v.disabled);
      h && (o.value = [h.id]);
    }
  }
  const d = {
    register: l,
    unregister: s,
    selected: o,
    select: u,
    disabled: ae(e, "disabled"),
    prev: () => c(r.length - 1),
    next: () => c(1),
    isSelected: (f) => o.value.includes(f),
    selectedClass: C(() => e.selectedClass),
    items: C(() => r),
    getItemIndex: (f) => xy(r, f)
  };
  return ct(t, d), d;
}
function xy(e, t) {
  const n = qh(e, [t]);
  return n.length ? e.findIndex((r) => r.id === n[0]) : -1;
}
function qh(e, t) {
  const n = [];
  return t.forEach((r) => {
    const o = e.find((l) => Ar(r, l.value)), i = e[r];
    (o == null ? void 0 : o.value) != null ? n.push(o.id) : i != null && n.push(i.id);
  }), n;
}
function ky(e, t) {
  const n = [];
  return t.forEach((r) => {
    const o = e.findIndex((i) => i.id === r);
    if (~o) {
      const i = e[o];
      n.push(i.value != null ? i.value : o);
    }
  }), n;
}
const Yh = Symbol.for("vuetify:v-btn-toggle"), Sy = Z({
  ...Wh(),
  ...jl()
}, "VBtnToggle");
de()({
  name: "VBtnToggle",
  props: Sy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: r,
      next: o,
      prev: i,
      select: l,
      selected: s
    } = oi(e, Yh);
    return ve(() => {
      const a = tf.filterProps(e);
      return y(tf, he({
        class: ["v-btn-toggle", e.class]
      }, a, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: r,
            next: o,
            prev: i,
            select: l,
            selected: s
          })];
        }
      });
    }), {
      next: o,
      prev: i,
      select: l
    };
  }
});
const Cy = Z({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), nt = de(!1)({
  name: "VDefaultsProvider",
  props: Cy(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: r,
      disabled: o,
      reset: i,
      root: l,
      scoped: s
    } = Ha(e);
    return En(r, {
      reset: i,
      root: l,
      scoped: s,
      disabled: o
    }), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), Ey = {
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
}, Vy = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => Hn(Kh, {
    ...e,
    class: "mdi"
  })
}, Me = [String, Function, Object, Array], ea = Symbol.for("vuetify:icons"), Ul = Z({
  icon: {
    type: Me
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), nf = de()({
  name: "VComponentIcon",
  props: Ul(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const r = e.icon;
      return y(e.tag, null, {
        default: () => {
          var o;
          return [e.icon ? y(r, null, null) : (o = n.default) == null ? void 0 : o.call(n)];
        }
      });
    };
  }
}), su = hn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Ul(),
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
      }, [Array.isArray(e.icon) ? e.icon.map((r) => Array.isArray(r) ? y("path", {
        d: r[0],
        "fill-opacity": r[1]
      }, null) : y("path", {
        d: r
      }, null)) : y("path", {
        d: e.icon
      }, null)])]
    });
  }
});
hn({
  name: "VLigatureIcon",
  props: Ul(),
  setup(e) {
    return () => y(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Kh = hn({
  name: "VClassIcon",
  props: Ul(),
  setup(e) {
    return () => y(e.tag, {
      class: e.icon
    }, null);
  }
});
function Ly() {
  return {
    svg: {
      component: su
    },
    class: {
      component: Kh
    }
  };
}
function Py(e) {
  const t = Ly(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = Vy), Ft({
    defaultSet: n,
    sets: t,
    aliases: {
      ...Ey,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"
      /* eslint-enable max-len */
    }
  }, e);
}
const Iy = (e) => {
  const t = je(ea);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: C(() => {
      var a;
      const r = rn(e);
      if (!r) return {
        component: nf
      };
      let o = r;
      if (typeof o == "string" && (o = o.trim(), o.startsWith("$") && (o = (a = t.aliases) == null ? void 0 : a[o.slice(1)])), !o) throw new Error(`Could not find aliased icon "${r}"`);
      if (Array.isArray(o))
        return {
          component: su,
          icon: o
        };
      if (typeof o != "string")
        return {
          component: nf,
          icon: o
        };
      const i = Object.keys(t.sets).find((u) => typeof o == "string" && o.startsWith(`${u}:`)), l = i ? o.slice(i.length + 1) : o;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: l
      };
    })
  };
}, Ty = ["x-small", "small", "default", "large", "x-large"], ii = Z({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function li(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return eu(() => {
    let n, r;
    return ll(Ty, e.size) ? n = `${t}--size-${e.size}` : e.size && (r = {
      width: pe(e.size),
      height: pe(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: r
    };
  });
}
const My = Z({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: Me,
  ...ke(),
  ...ii(),
  ...We({
    tag: "i"
  }),
  ...Ze()
}, "VIcon"), ze = de()({
  name: "VIcon",
  props: My(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const o = te(), {
      themeClasses: i
    } = rt(e), {
      iconData: l
    } = Iy(C(() => o.value || e.icon)), {
      sizeClasses: s
    } = li(e), {
      textColorClasses: a,
      textColorStyles: u
    } = an(ae(e, "color"));
    return ve(() => {
      var d, f;
      const c = (d = r.default) == null ? void 0 : d.call(r);
      return c && (o.value = (f = Ch(c).filter((h) => h.type === ni && h.children && typeof h.children == "string")[0]) == null ? void 0 : f.children), y(l.value.component, {
        tag: e.tag,
        icon: l.value.icon,
        class: ["v-icon", "notranslate", i.value, s.value, a.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [s.value ? void 0 : {
          fontSize: pe(e.size),
          height: pe(e.size),
          width: pe(e.size)
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
  const n = te(), r = be(!1);
  if (Za) {
    const o = new IntersectionObserver((i) => {
      r.value = !!i.find((l) => l.isIntersecting);
    }, t);
    dn(() => {
      o.disconnect();
    }), we(n, (i, l) => {
      l && (o.unobserve(l), r.value = !1), i && o.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: r
  };
}
function oo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = te(), r = te();
  if (Oe) {
    const o = new ResizeObserver((i) => {
      e == null || e(i, o), i.length && (t === "content" ? r.value = i[0].contentRect : r.value = i[0].target.getBoundingClientRect());
    });
    dn(() => {
      o.disconnect();
    }), we(n, (i, l) => {
      l && (o.unobserve(Ho(l)), r.value = void 0), i && o.observe(Ho(i));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: ti(r)
  };
}
const Ay = Z({
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
  ...ii(),
  ...We({
    tag: "div"
  }),
  ...Ze()
}, "VProgressCircular"), Zh = de()({
  name: "VProgressCircular",
  props: Ay(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = 20, o = 2 * Math.PI * r, i = te(), {
      themeClasses: l
    } = rt(e), {
      sizeClasses: s,
      sizeStyles: a
    } = li(e), {
      textColorClasses: u,
      textColorStyles: c
    } = an(ae(e, "color")), {
      textColorClasses: d,
      textColorStyles: f
    } = an(ae(e, "bgColor")), {
      intersectionRef: h,
      isIntersecting: v
    } = Xh(), {
      resizeRef: g,
      contentRect: p
    } = oo(), m = C(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = C(() => Number(e.width)), _ = C(() => a.value ? Number(e.size) : p.value ? p.value.width : Math.max(w.value, 32)), b = C(() => r / (1 - w.value / _.value) * 2), x = C(() => w.value / _.value * b.value), E = C(() => pe((100 - m.value) / 100 * o));
    return Cn(() => {
      h.value = i.value, g.value = i.value;
    }), ve(() => y(e.tag, {
      ref: i,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": v.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, l.value, s.value, u.value, e.class],
      style: [a.value, c.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : m.value
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
        r,
        "stroke-width": x.value,
        "stroke-dasharray": o,
        "stroke-dashoffset": 0
      }, null), y("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r,
        "stroke-width": x.value,
        "stroke-dasharray": o,
        "stroke-dashoffset": E.value
      }, null)]), n.default && y("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: m.value
      })])]
    })), {};
  }
}), or = Z({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function ir(e) {
  return {
    dimensionStyles: C(() => ({
      height: pe(e.height),
      maxHeight: pe(e.maxHeight),
      maxWidth: pe(e.maxWidth),
      minHeight: pe(e.minHeight),
      minWidth: pe(e.minWidth),
      width: pe(e.width)
    }))
  };
}
const $y = {
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
}, rf = "$vuetify.", of = (e, t) => e.replace(/\{(\d+)\}/g, (n, r) => String(t[+r])), Jh = (e, t, n) => function(r) {
  for (var o = arguments.length, i = new Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++)
    i[l - 1] = arguments[l];
  if (!r.startsWith(rf))
    return of(r, i);
  const s = r.replace(rf, ""), a = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = Xs(a, s, null);
  return c || (`${r}${e.value}`, c = Xs(u, s, null)), c || (c = r), typeof c != "string" && (c = r), of(c, i);
};
function Qh(e, t) {
  return (n, r) => new Intl.NumberFormat([e.value, t.value], r).format(n);
}
function xs(e, t, n) {
  const r = Ne(e, t, e[t] ?? n.value);
  return r.value = e[t] ?? n.value, we(n, (o) => {
    e[t] == null && (r.value = n.value);
  }), r;
}
function ev(e) {
  return (t) => {
    const n = xs(t, "locale", e.current), r = xs(t, "fallback", e.fallback), o = xs(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: r,
      messages: o,
      t: Jh(n, r, o),
      n: Qh(n, r),
      provide: ev({
        current: n,
        fallback: r,
        messages: o
      })
    };
  };
}
function Ny(e) {
  const t = be((e == null ? void 0 : e.locale) ?? "en"), n = be((e == null ? void 0 : e.fallback) ?? "en"), r = te({
    en: $y,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: r,
    t: Jh(t, n, r),
    n: Qh(t, n),
    provide: ev({
      current: t,
      fallback: n,
      messages: r
    })
  };
}
const dl = Symbol.for("vuetify:locale");
function Ry(e) {
  return e.name != null;
}
function Oy(e) {
  const t = e != null && e.adapter && Ry(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Ny(e), n = Fy(t, e);
  return {
    ...t,
    ...n
  };
}
function si() {
  const e = je(dl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function By() {
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
function Fy(e, t) {
  const n = te((t == null ? void 0 : t.rtl) ?? By()), r = C(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: r,
    rtl: n,
    rtlClasses: C(() => `v-locale--is-${r.value ? "rtl" : "ltr"}`)
  };
}
function gn() {
  const e = je(dl);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const lf = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, ai = Z({
  location: String
}, "location");
function ui(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: r
  } = gn();
  return {
    locationStyles: C(() => {
      if (!e.location) return {};
      const {
        side: i,
        align: l
      } = Zs(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, r.value);
      function s(u) {
        return n ? n(u) : 0;
      }
      const a = {};
      return i !== "center" && (t ? a[lf[i]] = `calc(100% - ${s(i)}px)` : a[i] = 0), l !== "center" ? t ? a[lf[l]] = `calc(100% - ${s(l)}px)` : a[l] = 0 : (i === "center" ? a.top = a.left = "50%" : a[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", a.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), a;
    })
  };
}
const Dy = Z({
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
  ...ai({
    location: "top"
  }),
  ...Pt(),
  ...We(),
  ...Ze()
}, "VProgressLinear"), tv = de()({
  name: "VProgressLinear",
  props: Dy(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), {
      isRtl: o,
      rtlClasses: i
    } = gn(), {
      themeClasses: l
    } = rt(e), {
      locationStyles: s
    } = ui(e), {
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
      intersectionRef: g,
      isIntersecting: p
    } = Xh(), m = C(() => parseInt(e.max, 10)), w = C(() => parseInt(e.height, 10)), _ = C(() => parseFloat(e.bufferValue) / m.value * 100), b = C(() => parseFloat(r.value) / m.value * 100), x = C(() => o.value !== e.reverse), E = C(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), S = C(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function T(A) {
      if (!g.value) return;
      const {
        left: R,
        right: D,
        width: L
      } = g.value.getBoundingClientRect(), I = x.value ? L - A.clientX + (D - L) : A.clientX - R;
      r.value = Math.round(I / L * m.value);
    }
    return ve(() => y(e.tag, {
      ref: g,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && p.value,
        "v-progress-linear--reverse": x.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, v.value, l.value, i.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? pe(w.value) : 0,
        "--v-progress-linear-height": pe(w.value),
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
          [x.value ? "left" : "right"]: pe(-w.value),
          borderTop: `${pe(w.value / 2)} dotted`,
          opacity: S.value,
          top: `calc(50% - ${pe(w.value / 4)})`,
          width: pe(100 - _.value, "%"),
          "--v-progress-linear-stream-to": pe(w.value * (x.value ? 1 : -1))
        }
      }, null), y("div", {
        class: ["v-progress-linear__background", c.value],
        style: [d.value, {
          opacity: S.value,
          width: pe(e.stream ? _.value : 100, "%")
        }]
      }, null), y(Rn, {
        name: E.value
      }, {
        default: () => [e.indeterminate ? y("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((A) => y("div", {
          key: A,
          class: ["v-progress-linear__indeterminate", A, f.value],
          style: h.value
        }, null))]) : y("div", {
          class: ["v-progress-linear__determinate", f.value],
          style: [h.value, {
            width: pe(b.value, "%")
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
}), au = Z({
  loading: [Boolean, String]
}, "loader");
function Wl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    loaderClasses: C(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function uu(e, t) {
  var r;
  let {
    slots: n
  } = t;
  return y("div", {
    class: `${e.name}__loader`
  }, [((r = n.default) == null ? void 0 : r.call(n, {
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
const Hy = ["static", "relative", "fixed", "absolute", "sticky"], ql = Z({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Hy.includes(e)
    )
  }
}, "position");
function Yl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  return {
    positionClasses: C(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function jy() {
  const e = lt("useRoute");
  return C(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function zy() {
  var e, t;
  return (t = (e = lt("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Kl(e, t) {
  const n = np("RouterLink"), r = C(() => !!(e.href || e.to)), o = C(() => (r == null ? void 0 : r.value) || Bc(t, "click") || Bc(e, "click"));
  if (typeof n == "string")
    return {
      isLink: r,
      isClickable: o,
      href: ae(e, "href")
    };
  const i = e.to ? n.useLink(e) : void 0, l = jy();
  return {
    isLink: r,
    isClickable: o,
    route: i == null ? void 0 : i.route,
    navigate: i == null ? void 0 : i.navigate,
    isActive: i && C(() => {
      var s, a, u;
      return e.exact ? l.value ? ((u = i.isExactActive) == null ? void 0 : u.value) && Ar(i.route.value.query, l.value.query) : (a = i.isExactActive) == null ? void 0 : a.value : (s = i.isActive) == null ? void 0 : s.value;
    }),
    href: C(() => e.to ? i == null ? void 0 : i.route.value.href : e.href)
  };
}
const Xl = Z({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let ks = !1;
function Gy(e, t) {
  let n = !1, r, o;
  Oe && (Xe(() => {
    window.addEventListener("popstate", i), r = e == null ? void 0 : e.beforeEach((l, s, a) => {
      ks ? n ? t(a) : a() : setTimeout(() => n ? t(a) : a()), ks = !0;
    }), o = e == null ? void 0 : e.afterEach(() => {
      ks = !1;
    });
  }), wt(() => {
    window.removeEventListener("popstate", i), r == null || r(), o == null || o();
  }));
  function i(l) {
    var s;
    (s = l.state) != null && s.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Uy(e, t) {
  we(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && Xe(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const ta = Symbol("rippleStop"), Wy = 80;
function sf(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function na(e) {
  return e.constructor.name === "TouchEvent";
}
function nv(e) {
  return e.constructor.name === "KeyboardEvent";
}
const qy = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = 0, o = 0;
  if (!nv(e)) {
    const f = t.getBoundingClientRect(), h = na(e) ? e.touches[e.touches.length - 1] : e;
    r = h.clientX - f.left, o = h.clientY - f.top;
  }
  let i = 0, l = 0.3;
  (d = t._ripple) != null && d.circle ? (l = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((r - i) ** 2 + (o - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const s = `${(t.clientWidth - i * 2) / 2}px`, a = `${(t.clientHeight - i * 2) / 2}px`, u = n.center ? s : `${r - i}px`, c = n.center ? a : `${o - i}px`;
  return {
    radius: i,
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
    const r = document.createElement("span"), o = document.createElement("span");
    r.appendChild(o), r.className = "v-ripple__container", n.class && (r.className += ` ${n.class}`);
    const {
      radius: i,
      scale: l,
      x: s,
      y: a,
      centerX: u,
      centerY: c
    } = qy(e, t, n), d = `${i * 2}px`;
    o.className = "v-ripple__animation", o.style.width = d, o.style.height = d, t.appendChild(r);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), o.classList.add("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--visible"), sf(o, `translate(${s}, ${a}) scale3d(${l},${l},${l})`), o.dataset.activated = String(performance.now()), setTimeout(() => {
      o.classList.remove("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--in"), sf(o, `translate(${u}, ${c}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var i;
    if (!((i = e == null ? void 0 : e._ripple) != null && i.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const r = performance.now() - Number(n.dataset.activated), o = Math.max(250 - r, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var s;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((s = n.parentNode) == null ? void 0 : s.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, o);
  }
};
function rv(e) {
  return typeof e > "u" || !!e;
}
function Go(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[ta])) {
    if (e[ta] = !0, na(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || nv(e), n._ripple.class && (t.class = n._ripple.class), na(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        hl.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var r;
        (r = n == null ? void 0 : n._ripple) != null && r.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Wy);
    } else
      hl.show(e, n, t);
  }
}
function af(e) {
  e[ta] = !0;
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
function ov(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Uo = !1;
function iv(e) {
  !Uo && (e.keyCode === Mc.enter || e.keyCode === Mc.space) && (Uo = !0, Go(e));
}
function lv(e) {
  Uo = !1, Ot(e);
}
function sv(e) {
  Uo && (Uo = !1, Ot(e));
}
function av(e, t, n) {
  const {
    value: r,
    modifiers: o
  } = t, i = rv(r);
  if (i || hl.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = o.center, e._ripple.circle = o.circle, il(r) && r.class && (e._ripple.class = r.class), i && !n) {
    if (o.stop) {
      e.addEventListener("touchstart", af, {
        passive: !0
      }), e.addEventListener("mousedown", af);
      return;
    }
    e.addEventListener("touchstart", Go, {
      passive: !0
    }), e.addEventListener("touchend", Ot, {
      passive: !0
    }), e.addEventListener("touchmove", ov, {
      passive: !0
    }), e.addEventListener("touchcancel", Ot), e.addEventListener("mousedown", Go), e.addEventListener("mouseup", Ot), e.addEventListener("mouseleave", Ot), e.addEventListener("keydown", iv), e.addEventListener("keyup", lv), e.addEventListener("blur", sv), e.addEventListener("dragstart", Ot, {
      passive: !0
    });
  } else !i && n && uv(e);
}
function uv(e) {
  e.removeEventListener("mousedown", Go), e.removeEventListener("touchstart", Go), e.removeEventListener("touchend", Ot), e.removeEventListener("touchmove", ov), e.removeEventListener("touchcancel", Ot), e.removeEventListener("mouseup", Ot), e.removeEventListener("mouseleave", Ot), e.removeEventListener("keydown", iv), e.removeEventListener("keyup", lv), e.removeEventListener("dragstart", Ot), e.removeEventListener("blur", sv);
}
function Yy(e, t) {
  av(e, t, !1);
}
function Ky(e) {
  delete e._ripple, uv(e);
}
function Xy(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = rv(t.oldValue);
  av(e, t, n);
}
const Rr = {
  mounted: Yy,
  unmounted: Ky,
  updated: Xy
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
  ...$r(),
  ...ke(),
  ...Zt(),
  ...or(),
  ...jn(),
  ...zl(),
  ...au(),
  ...ai(),
  ...ql(),
  ...Pt(),
  ...Xl(),
  ...ii(),
  ...We({
    tag: "button"
  }),
  ...Ze(),
  ...Gn({
    variant: "elevated"
  })
}, "VBtn"), ut = de()({
  name: "VBtn",
  directives: {
    Ripple: Rr
  },
  props: cv(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: o
    } = rt(e), {
      borderClasses: i
    } = Nr(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = ho(e), {
      densityClasses: u
    } = vn(e), {
      dimensionStyles: c
    } = ir(e), {
      elevationClasses: d
    } = zn(e), {
      loaderClasses: f
    } = Wl(e), {
      locationStyles: h
    } = ui(e), {
      positionClasses: v
    } = Yl(e), {
      roundedClasses: g
    } = It(e), {
      sizeClasses: p,
      sizeStyles: m
    } = li(e), w = Gl(e, e.symbol, !1), _ = Kl(e, n), b = C(() => {
      var A;
      return e.active !== void 0 ? e.active : _.isLink.value ? (A = _.isActive) == null ? void 0 : A.value : w == null ? void 0 : w.isSelected.value;
    }), x = C(() => (w == null ? void 0 : w.disabled.value) || e.disabled), E = C(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), S = C(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function T(A) {
      var R;
      x.value || _.isLink.value && (A.metaKey || A.ctrlKey || A.shiftKey || A.button !== 0 || n.target === "_blank") || ((R = _.navigate) == null || R.call(_, A), w == null || w.toggle());
    }
    return Uy(_, w == null ? void 0 : w.select), ve(() => {
      var k, O;
      const A = _.isLink.value ? "a" : e.tag, R = !!(e.prependIcon || r.prepend), D = !!(e.appendIcon || r.append), L = !!(e.icon && e.icon !== !0), I = (w == null ? void 0 : w.isSelected.value) && (!_.isLink.value || ((k = _.isActive) == null ? void 0 : k.value)) || !w || ((O = _.isActive) == null ? void 0 : O.value);
      return He(y(A, {
        type: A === "a" ? void 0 : "button",
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
        }, o.value, i.value, I ? l.value : void 0, u.value, d.value, f.value, v.value, g.value, p.value, a.value, e.class],
        style: [I ? s.value : void 0, c.value, h.value, m.value, e.style],
        disabled: x.value || void 0,
        href: _.href.value,
        onClick: T,
        value: S.value
      }, {
        default: () => {
          var M;
          return [fo(!0, "v-btn"), !e.icon && R && y("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [r.prepend ? y(nt, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, r.prepend) : y(ze, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), y("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!r.default && L ? y(ze, {
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
              return [((j = r.default) == null ? void 0 : j.call(r)) ?? e.text];
            }
          })]), !e.icon && D && y("span", {
            key: "append",
            class: "v-btn__append"
          }, [r.append ? y(nt, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, r.append) : y(ze, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && y("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = r.loader) == null ? void 0 : M.call(r)) ?? y(Zh, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[cn("ripple"), !x.value && e.ripple, null]]);
    }), {
      group: w
    };
  }
}), Zl = de()({
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
      var r;
      return y("div", {
        class: ["v-card-actions", e.class],
        style: e.style
      }, [(r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), Co = co("v-card-subtitle"), Wo = co("v-card-title");
function Zy(e) {
  return {
    aspectStyles: C(() => {
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
  ...ke(),
  ...or()
}, "VResponsive"), uf = de()({
  name: "VResponsive",
  props: fv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: r
    } = Zy(e), {
      dimensionStyles: o
    } = ir(e);
    return ve(() => {
      var i;
      return y("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [o.value, e.style]
      }, [y("div", {
        class: "v-responsive__sizer",
        style: r.value
      }, null), (i = n.additional) == null ? void 0 : i.call(n), n.default && y("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), ci = Z({
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
    transition: r,
    disabled: o,
    group: i,
    ...l
  } = e, {
    component: s = i ? bh : Rn,
    ...a
  } = typeof r == "object" ? r : {};
  return Hn(s, he(typeof r == "string" ? {
    name: o ? "" : r
  } : a, typeof r == "string" ? {} : {
    disabled: o,
    group: i
  }, l), n);
};
function Jy(e, t) {
  if (!Za) return;
  const n = t.modifiers || {}, r = t.value, {
    handler: o,
    options: i
  } = typeof r == "object" ? r : {
    handler: r,
    options: {}
  }, l = new IntersectionObserver(function() {
    var d;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = arguments.length > 1 ? arguments[1] : void 0;
    const u = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!u) return;
    const c = s.some((f) => f.isIntersecting);
    o && (!n.quiet || u.init) && (!n.once || c || u.init) && o(c, s, a), c && n.once ? dv(e, t) : u.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: l
  }, l.observe(e);
}
function dv(e, t) {
  var r;
  const n = (r = e._observe) == null ? void 0 : r[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const hv = {
  mounted: Jy,
  unmounted: dv
}, Qy = Z({
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
  ...ke(),
  ...Pt(),
  ...ci()
}, "VImg"), vv = de()({
  name: "VImg",
  directives: {
    intersect: hv
  },
  props: Qy(),
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
      backgroundColorClasses: o,
      backgroundColorStyles: i
    } = Dt(ae(e, "color")), {
      roundedClasses: l
    } = It(e), s = lt("VImg"), a = be(""), u = te(), c = be(e.eager ? "loading" : "idle"), d = be(), f = be(), h = C(() => e.src && typeof e.src == "object" ? {
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
      g(c.value !== "idle");
    }), we(v, (L, I) => {
      !L && I && u.value && b(u.value);
    }), Nl(() => g());
    function g(L) {
      if (!(e.eager && L) && !(Za && !L && !e.eager)) {
        if (c.value = "loading", h.value.lazySrc) {
          const I = new Image();
          I.src = h.value.lazySrc, b(I, null);
        }
        h.value.src && Xe(() => {
          var I;
          n("loadstart", ((I = u.value) == null ? void 0 : I.currentSrc) || h.value.src), setTimeout(() => {
            var k;
            if (!s.isUnmounted)
              if ((k = u.value) != null && k.complete) {
                if (u.value.naturalWidth || m(), c.value === "error") return;
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
    function m() {
      var L;
      s.isUnmounted || (c.value = "error", n("error", ((L = u.value) == null ? void 0 : L.currentSrc) || h.value.src));
    }
    function w() {
      const L = u.value;
      L && (a.value = L.currentSrc || L.src);
    }
    let _ = -1;
    dn(() => {
      clearTimeout(_);
    });
    function b(L) {
      let I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const k = () => {
        if (clearTimeout(_), s.isUnmounted) return;
        const {
          naturalHeight: O,
          naturalWidth: M
        } = L;
        O || M ? (d.value = M, f.value = O) : !L.complete && c.value === "loading" && I != null ? _ = window.setTimeout(k, I) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      k();
    }
    const x = C(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), E = () => {
      var k;
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
        onError: m
      }, null), I = (k = r.sources) == null ? void 0 : k.call(r);
      return y(Mn, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [He(I ? y("picture", {
          class: "v-img__picture"
        }, [I, L]) : L, [[bt, c.value === "loaded"]])]
      });
    }, S = () => y(Mn, {
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
    }), T = () => r.placeholder ? y(Mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !r.error) && y("div", {
        class: "v-img__placeholder"
      }, [r.placeholder()])]
    }) : null, A = () => r.error ? y(Mn, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && y("div", {
        class: "v-img__error"
      }, [r.error()])]
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
      const L = uf.filterProps(e);
      return He(y(uf, he({
        class: ["v-img", {
          "v-img--booting": !D.value
        }, o.value, l.value, e.class],
        style: [{
          width: pe(e.width === "auto" ? d.value : e.width)
        }, i.value, e.style]
      }, L, {
        aspectRatio: v.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => y(Le, null, [y(E, null, null), y(S, null, null), y(R, null, null), y(T, null, null), y(A, null, null)]),
        default: r.default
      }), [[cn("intersect"), {
        handler: g,
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
}), e1 = Z({
  start: Boolean,
  end: Boolean,
  icon: Me,
  image: String,
  text: String,
  ...ke(),
  ...Zt(),
  ...Pt(),
  ...ii(),
  ...We(),
  ...Ze(),
  ...Gn({
    variant: "flat"
  })
}, "VAvatar"), Vr = de()({
  name: "VAvatar",
  props: e1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      colorClasses: o,
      colorStyles: i,
      variantClasses: l
    } = ho(e), {
      densityClasses: s
    } = vn(e), {
      roundedClasses: a
    } = It(e), {
      sizeClasses: u,
      sizeStyles: c
    } = li(e);
    return ve(() => y(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, r.value, o.value, s.value, a.value, u.value, l.value, e.class],
      style: [i.value, c.value, e.style]
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
      }) : e.image ? y(vv, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? y(ze, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, fo(!1, "v-avatar")]
    })), {};
  }
}), t1 = Z({
  appendAvatar: String,
  appendIcon: Me,
  prependAvatar: String,
  prependIcon: Me,
  subtitle: [String, Number],
  title: [String, Number],
  ...ke(),
  ...Zt()
}, "VCardItem"), n1 = de()({
  name: "VCardItem",
  props: t1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => {
      var u;
      const r = !!(e.prependAvatar || e.prependIcon), o = !!(r || n.prepend), i = !!(e.appendAvatar || e.appendIcon), l = !!(i || n.append), s = !!(e.title != null || n.title), a = !!(e.subtitle != null || n.subtitle);
      return y("div", {
        class: ["v-card-item", e.class],
        style: e.style
      }, [o && y("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? y(nt, {
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
      }, n.prepend) : y(Le, null, [e.prependAvatar && y(Vr, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && y(ze, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), y("div", {
        class: "v-card-item__content"
      }, [s && y(Wo, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? e.title];
        }
      }), a && y(Co, {
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
        disabled: !i,
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
      }, n.append) : y(Le, null, [e.appendIcon && y(ze, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && y(Vr, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), Ao = co("v-card-text"), r1 = Z({
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
  ...$r(),
  ...ke(),
  ...Zt(),
  ...or(),
  ...jn(),
  ...au(),
  ...ai(),
  ...ql(),
  ...Pt(),
  ...Xl(),
  ...We(),
  ...Ze(),
  ...Gn({
    variant: "elevated"
  })
}, "VCard"), cu = de()({
  name: "VCard",
  directives: {
    Ripple: Rr
  },
  props: r1(),
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      themeClasses: o
    } = rt(e), {
      borderClasses: i
    } = Nr(e), {
      colorClasses: l,
      colorStyles: s,
      variantClasses: a
    } = ho(e), {
      densityClasses: u
    } = vn(e), {
      dimensionStyles: c
    } = ir(e), {
      elevationClasses: d
    } = zn(e), {
      loaderClasses: f
    } = Wl(e), {
      locationStyles: h
    } = ui(e), {
      positionClasses: v
    } = Yl(e), {
      roundedClasses: g
    } = It(e), p = Kl(e, n), m = C(() => e.link !== !1 && p.isLink.value), w = C(() => !e.disabled && e.link !== !1 && (e.link || p.isClickable.value));
    return ve(() => {
      const _ = m.value ? "a" : e.tag, b = !!(r.title || e.title != null), x = !!(r.subtitle || e.subtitle != null), E = b || x, S = !!(r.append || e.appendAvatar || e.appendIcon), T = !!(r.prepend || e.prependAvatar || e.prependIcon), A = !!(r.image || e.image), R = E || T || S, D = !!(r.text || e.text != null);
      return He(y(_, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": w.value
        }, o.value, i.value, l.value, u.value, d.value, f.value, v.value, g.value, a.value, e.class],
        style: [s.value, c.value, h.value, e.style],
        href: p.href.value,
        onClick: w.value && p.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, {
        default: () => {
          var L;
          return [A && y("div", {
            key: "image",
            class: "v-card__image"
          }, [r.image ? y(nt, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, r.image) : y(vv, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), y(uu, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: r.loader
          }), R && y(n1, {
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
          }), D && y(Ao, {
            key: "text"
          }, {
            default: () => {
              var I;
              return [((I = r.text) == null ? void 0 : I.call(r)) ?? e.text];
            }
          }), (L = r.default) == null ? void 0 : L.call(r), r.actions && y(Zl, null, {
            default: r.actions
          }), fo(w.value, "v-card")];
        }
      }), [[cn("ripple"), w.value && e.ripple]]);
    }), {};
  }
}), o1 = Z({
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
    props: o1({
      mode: n,
      origin: t
    }),
    setup(r, o) {
      let {
        slots: i
      } = o;
      const l = {
        onBeforeEnter(s) {
          r.origin && (s.style.transformOrigin = r.origin);
        },
        onLeave(s) {
          if (r.leaveAbsolute) {
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
          r.hideOnLeave && s.style.setProperty("display", "none", "important");
        },
        onAfterLeave(s) {
          if (r.leaveAbsolute && (s != null && s._transitionInitialStyles)) {
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
        const s = r.group ? bh : Rn;
        return Hn(s, {
          name: r.disabled ? "" : e,
          css: !r.disabled,
          ...r.group ? void 0 : {
            mode: r.mode
          },
          ...r.disabled ? {} : l
        }, i.default);
      };
    }
  });
}
function gv(e, t) {
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
    setup(r, o) {
      let {
        slots: i
      } = o;
      return () => Hn(Rn, {
        name: r.disabled ? "" : e,
        css: !r.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...r.disabled ? {} : t
      }, i.default);
    }
  });
}
function mv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", r = yt(`offset-${n}`);
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
      const a = `${l[r]}px`;
      l.style[n] = "0", l.offsetHeight, l.style.transition = s.transition, e && l._parent && l._parent.classList.add(e), requestAnimationFrame(() => {
        l.style[n] = a;
      });
    },
    onAfterEnter: i,
    onEnterCancelled: i,
    onLeave(l) {
      l._initialStyle = {
        transition: "",
        overflow: l.style.overflow,
        [n]: l.style[n]
      }, l.style.overflow = "hidden", l.style[n] = `${l[r]}px`, l.offsetHeight, requestAnimationFrame(() => l.style[n] = "0");
    },
    onAfterLeave: o,
    onLeaveCancelled: o
  };
  function o(l) {
    e && l._parent && l._parent.classList.remove(e), i(l);
  }
  function i(l) {
    const s = l._initialStyle[n];
    l.style.overflow = l._initialStyle.overflow, s != null && (l.style[n] = s), delete l._initialStyle;
  }
}
const i1 = Z({
  target: [Object, Array]
}, "v-dialog-transition"), fu = de()({
  name: "VDialogTransition",
  props: i1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = {
      onBeforeEnter(o) {
        o.style.pointerEvents = "none", o.style.visibility = "hidden";
      },
      async onEnter(o, i) {
        var f;
        await new Promise((h) => requestAnimationFrame(h)), await new Promise((h) => requestAnimationFrame(h)), o.style.visibility = "";
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = ff(e.target, o), d = yr(o, [{
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }, {}], {
          duration: 225 * c,
          easing: hy
        });
        (f = cf(o)) == null || f.forEach((h) => {
          yr(h, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * c,
            easing: zo
          });
        }), d.finished.then(() => i());
      },
      onAfterEnter(o) {
        o.style.removeProperty("pointer-events");
      },
      onBeforeLeave(o) {
        o.style.pointerEvents = "none";
      },
      async onLeave(o, i) {
        var f;
        await new Promise((h) => requestAnimationFrame(h));
        const {
          x: l,
          y: s,
          sx: a,
          sy: u,
          speed: c
        } = ff(e.target, o);
        yr(o, [{}, {
          transform: `translate(${l}px, ${s}px) scale(${a}, ${u})`,
          opacity: 0
        }], {
          duration: 125 * c,
          easing: vy
        }).finished.then(() => i()), (f = cf(o)) == null || f.forEach((h) => {
          yr(h, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * c,
            easing: zo
          });
        });
      },
      onAfterLeave(o) {
        o.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? y(Rn, he({
      name: "dialog-transition"
    }, r, {
      css: !1
    }), n) : y(Rn, {
      name: "dialog-transition"
    }, n);
  }
});
function cf(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function ff(e, t) {
  const n = Th(e), r = tu(t), [o, i] = getComputedStyle(t).transformOrigin.split(" ").map((m) => parseFloat(m)), [l, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let a = n.left + n.width / 2;
  l === "left" || s === "left" ? a -= n.width / 2 : (l === "right" || s === "right") && (a += n.width / 2);
  let u = n.top + n.height / 2;
  l === "top" || s === "top" ? u -= n.height / 2 : (l === "bottom" || s === "bottom") && (u += n.height / 2);
  const c = n.width / r.width, d = n.height / r.height, f = Math.max(1, c, d), h = c / f || 0, v = d / f || 0, g = r.width * r.height / (window.innerWidth * window.innerHeight), p = g > 0.12 ? Math.min(1.5, (g - 0.12) * 10 + 1) : 1;
  return {
    x: a - (o + r.left),
    y: u - (i + r.top),
    sx: h,
    sy: v,
    speed: p
  };
}
jt("fab-transition", "center center", "out-in");
jt("dialog-bottom-transition");
jt("dialog-top-transition");
const df = jt("fade-transition"), pv = jt("scale-transition");
jt("scroll-x-transition");
jt("scroll-x-reverse-transition");
jt("scroll-y-transition");
jt("scroll-y-reverse-transition");
jt("slide-x-transition");
jt("slide-x-reverse-transition");
const yv = jt("slide-y-transition");
jt("slide-y-reverse-transition");
const bv = gv("expand-transition", mv()), wv = gv("expand-x-transition", mv("", !0));
function Ss(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function l1(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function hf(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: r
    } = e, o = r === "left" ? 0 : r === "center" ? t.width / 2 : r === "right" ? t.width : r, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Ss({
      x: o,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: r
    } = e, o = n === "left" ? 0 : n === "right" ? t.width : n, i = r === "top" ? 0 : r === "center" ? t.height / 2 : r === "bottom" ? t.height : r;
    return Ss({
      x: o,
      y: i
    }, t);
  }
  return Ss({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const _v = {
  static: u1,
  // specific viewport position, usually centered
  connected: f1
  // connected to a certain element
}, s1 = Z({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in _v
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
function a1(e, t) {
  const n = te({}), r = te();
  Oe && Er(() => !!(t.isActive.value && e.locationStrategy), (i) => {
    var l, s;
    we(() => e.locationStrategy, i), wt(() => {
      window.removeEventListener("resize", o), r.value = void 0;
    }), window.addEventListener("resize", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? r.value = (l = e.locationStrategy(t, e, n)) == null ? void 0 : l.updateLocation : r.value = (s = _v[e.locationStrategy](t, e, n)) == null ? void 0 : s.updateLocation;
  });
  function o(i) {
    var l;
    (l = r.value) == null || l.call(r, i);
  }
  return {
    contentStyles: n,
    updateLocation: r
  };
}
function u1() {
}
function c1(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = tu(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function f1(e, t, n) {
  (Array.isArray(e.target.value) || py(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: o,
    preferredOrigin: i
  } = eu(() => {
    const v = Zs(t.location, e.isRtl.value), g = t.origin === "overlap" ? v : t.origin === "auto" ? ws(v) : Zs(t.origin, e.isRtl.value);
    return v.side === g.side && v.align === _s(g).align ? {
      preferredAnchor: Dc(v),
      preferredOrigin: Dc(g)
    } : {
      preferredAnchor: v,
      preferredOrigin: g
    };
  }), [l, s, a, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((v) => C(() => {
    const g = parseFloat(t[v]);
    return isNaN(g) ? 1 / 0 : g;
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
  we([e.target, e.contentEl], (v, g) => {
    let [p, m] = v, [w, _] = g;
    w && !Array.isArray(w) && f.unobserve(w), p && !Array.isArray(p) && f.observe(p), _ && f.unobserve(_), m && f.observe(m);
  }, {
    immediate: !0
  }), wt(() => {
    f.disconnect();
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const v = Th(e.target.value), g = c1(e.contentEl.value, e.isRtl.value), p = cl(e.contentEl.value), m = 12;
    p.length || (p.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (g.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), g.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = p.reduce((D, L) => {
      const I = L.getBoundingClientRect(), k = new kr({
        x: L === document.documentElement ? 0 : I.x,
        y: L === document.documentElement ? 0 : I.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return D ? new kr({
        x: Math.max(D.left, k.left),
        y: Math.max(D.top, k.top),
        width: Math.min(D.right, k.right) - Math.max(D.left, k.left),
        height: Math.min(D.bottom, k.bottom) - Math.max(D.top, k.top)
      }) : k;
    }, void 0);
    w.x += m, w.y += m, w.width -= m * 2, w.height -= m * 2;
    let _ = {
      anchor: o.value,
      origin: i.value
    };
    function b(D) {
      const L = new kr(g), I = hf(D.anchor, v), k = hf(D.origin, L);
      let {
        x: O,
        y: M
      } = l1(I, k);
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
        overflows: jc(L, w),
        x: O,
        y: M
      };
    }
    let x = 0, E = 0;
    const S = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let A = -1;
    for (; !(A++ > 10); ) {
      const {
        x: D,
        y: L,
        overflows: I
      } = b(_);
      x += D, E += L, g.x += D, g.y += L;
      {
        const k = Hc(_.anchor), O = I.x.before || I.x.after, M = I.y.before || I.y.after;
        let j = !1;
        if (["x", "y"].forEach((N) => {
          if (N === "x" && O && !T.x || N === "y" && M && !T.y) {
            const F = {
              anchor: {
                ..._.anchor
              },
              origin: {
                ..._.origin
              }
            }, B = N === "x" ? k === "y" ? _s : ws : k === "y" ? ws : _s;
            F.anchor = B(F.anchor), F.origin = B(F.origin);
            const {
              overflows: H
            } = b(F);
            (H[N].before <= I[N].before && H[N].after <= I[N].after || H[N].before + H[N].after < (I[N].before + I[N].after) / 2) && (_ = F, j = T[N] = !0);
          }
        }), j) continue;
      }
      I.x.before && (x += I.x.before, g.x += I.x.before), I.x.after && (x -= I.x.after, g.x -= I.x.after), I.y.before && (E += I.y.before, g.y += I.y.before), I.y.after && (E -= I.y.after, g.y -= I.y.after);
      {
        const k = jc(g, w);
        S.x = w.width - k.x.before - k.x.after, S.y = w.height - k.y.before - k.y.after, x += k.x.before, g.x += k.x.before, E += k.y.before, g.y += k.y.before;
      }
      break;
    }
    const R = Hc(_.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
      transformOrigin: `${_.origin.side} ${_.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: pe(Cs(E)),
      left: e.isRtl.value ? void 0 : pe(Cs(x)),
      right: e.isRtl.value ? pe(Cs(-x)) : void 0,
      minWidth: pe(R === "y" ? Math.min(l.value, v.width) : l.value),
      maxWidth: pe(vf(Bt(S.x, l.value === 1 / 0 ? 0 : l.value, a.value))),
      maxHeight: pe(vf(Bt(S.y, s.value === 1 / 0 ? 0 : s.value, u.value)))
    }), {
      available: S,
      contentBox: g
    };
  }
  return we(() => [o.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), Xe(() => {
    const v = h();
    if (!v) return;
    const {
      available: g,
      contentBox: p
    } = v;
    p.height > g.y && requestAnimationFrame(() => {
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
function vf(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ra = !0;
const vl = [];
function d1(e) {
  !ra || vl.length ? (vl.push(e), oa()) : (ra = !1, e(), oa());
}
let gf = -1;
function oa() {
  cancelAnimationFrame(gf), gf = requestAnimationFrame(() => {
    const e = vl.shift();
    e && e(), vl.length ? oa() : ra = !0;
  });
}
const Gi = {
  none: null,
  close: g1,
  block: m1,
  reposition: p1
}, h1 = Z({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Gi
  }
}, "VOverlay-scroll-strategies");
function v1(e, t) {
  if (!Oe) return;
  let n;
  Cn(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Aa(), await Xe(), n.active && n.run(() => {
      var r;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (r = Gi[e.scrollStrategy]) == null || r.call(Gi, t, e, n);
    }));
  }), wt(() => {
    n == null || n.stop();
  });
}
function g1(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  xv(e.targetEl.value ?? e.contentEl.value, t);
}
function m1(e, t) {
  var l;
  const n = (l = e.root.value) == null ? void 0 : l.offsetParent, r = [.../* @__PURE__ */ new Set([...cl(e.targetEl.value, t.contained ? n : void 0), ...cl(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), o = window.innerWidth - document.documentElement.offsetWidth, i = ((s) => iu(s) && s)(n || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), r.forEach((s, a) => {
    s.style.setProperty("--v-body-scroll-x", pe(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", pe(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", pe(o)), s.classList.add("v-overlay-scroll-blocked");
  }), wt(() => {
    r.forEach((s, a) => {
      const u = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), d = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -u, s.scrollTop = -c, s.style.scrollBehavior = d;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function p1(e, t, n) {
  let r = !1, o = -1, i = -1;
  function l(s) {
    d1(() => {
      var c, d;
      const a = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, s), r = (performance.now() - a) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (s) => s() : requestIdleCallback)(() => {
    n.run(() => {
      xv(e.targetEl.value ?? e.contentEl.value, (s) => {
        r ? (cancelAnimationFrame(o), o = requestAnimationFrame(() => {
          o = requestAnimationFrame(() => {
            l(s);
          });
        })) : l(s);
      });
    });
  }), wt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(o);
  });
}
function xv(e, t) {
  const n = [document, ...cl(e)];
  n.forEach((r) => {
    r.addEventListener("scroll", t, {
      passive: !0
    });
  }), wt(() => {
    n.forEach((r) => {
      r.removeEventListener("scroll", t);
    });
  });
}
const ia = Symbol.for("vuetify:v-menu"), y1 = Z({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function b1(e, t) {
  let n = () => {
  };
  function r(l) {
    n == null || n();
    const s = Number(l ? e.openDelay : e.closeDelay);
    return new Promise((a) => {
      n = F0(s, () => {
        t == null || t(l), a(l);
      });
    });
  }
  function o() {
    return r(!0);
  }
  function i() {
    return r(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: o,
    runCloseDelay: i
  };
}
const w1 = Z({
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
  ...y1()
}, "VOverlay-activator");
function _1(e, t) {
  let {
    isActive: n,
    isTop: r
  } = t;
  const o = lt("useActivator"), i = te();
  let l = !1, s = !1, a = !0;
  const u = C(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), c = C(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: d,
    runCloseDelay: f
  } = b1(e, (S) => {
    S === (e.openOnHover && l || u.value && s) && !(e.openOnHover && n.value && !r.value) && (n.value !== S && (a = !0), n.value = S);
  }), h = te(), v = {
    onClick: (S) => {
      S.stopPropagation(), i.value = S.currentTarget || S.target, n.value || (h.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      var T;
      (T = S.sourceCapabilities) != null && T.firesTouchEvents || (l = !0, i.value = S.currentTarget || S.target, d());
    },
    onMouseleave: (S) => {
      l = !1, f();
    },
    onFocus: (S) => {
      al(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), i.value = S.currentTarget || S.target, d());
    },
    onBlur: (S) => {
      s = !1, S.stopPropagation(), f();
    }
  }, g = C(() => {
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
      const T = je(ia, null);
      S.onClick = () => {
        n.value = !1, T == null || T.closeParents();
      };
    }
    return S;
  }), m = C(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      a && (l = !0, a = !1, d());
    }, S.onMouseleave = () => {
      l = !1, f();
    }), S;
  });
  we(r, (S) => {
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
    w.value && Xe(() => {
      i.value = Ho(w.value);
    });
  });
  const _ = te(), b = C(() => e.target === "cursor" && h.value ? h.value : _.value ? Ho(_.value) : kv(e.target, o) || i.value), x = C(() => Array.isArray(b.value) ? void 0 : b.value);
  let E;
  return we(() => !!e.activator, (S) => {
    S && Oe ? (E = Aa(), E.run(() => {
      x1(e, o, {
        activatorEl: i,
        activatorEvents: g
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), wt(() => {
    E == null || E.stop();
  }), {
    activatorEl: i,
    activatorRef: w,
    target: b,
    targetEl: x,
    targetRef: _,
    activatorEvents: g,
    contentEvents: p,
    scrimEvents: m
  };
}
function x1(e, t, n) {
  let {
    activatorEl: r,
    activatorEvents: o
  } = n;
  we(() => e.activator, (a, u) => {
    if (u && a !== u) {
      const c = s(u);
      c && l(c);
    }
    a && Xe(() => i());
  }, {
    immediate: !0
  }), we(() => e.activatorProps, () => {
    i();
  }), wt(() => {
    l();
  });
  function i() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && j0(a, he(o.value, u));
  }
  function l() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    a && z0(a, he(o.value, u));
  }
  function s() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = kv(a, t);
    return r.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, r.value;
  }
}
function kv(e, t) {
  var r, o;
  if (!e) return;
  let n;
  if (e === "parent") {
    let i = (o = (r = t == null ? void 0 : t.proxy) == null ? void 0 : r.$el) == null ? void 0 : o.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    n = i;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
const Jl = ["sm", "md", "lg", "xl", "xxl"], la = Symbol.for("vuetify:display"), mf = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, k1 = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mf;
  return Ft(mf, e);
};
function pf(e) {
  return Oe && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function yf(e) {
  return Oe && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function bf(e) {
  const t = Oe && !e ? window.navigator.userAgent : "ssr";
  function n(v) {
    return !!t.match(v);
  }
  const r = n(/android/i), o = n(/iphone|ipad|ipod/i), i = n(/cordova/i), l = n(/electron/i), s = n(/chrome/i), a = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), d = n(/win/i), f = n(/mac/i), h = n(/linux/i);
  return {
    android: r,
    ios: o,
    cordova: i,
    electron: l,
    chrome: s,
    edge: a,
    firefox: u,
    opera: c,
    win: d,
    mac: f,
    linux: h,
    touch: A0,
    ssr: t === "ssr"
  };
}
function S1(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: r
  } = k1(e), o = be(yf(t)), i = be(bf(t)), l = un({}), s = be(pf(t));
  function a() {
    o.value = yf(), s.value = pf();
  }
  function u() {
    a(), i.value = bf();
  }
  return Cn(() => {
    const c = s.value < n.sm, d = s.value < n.md && !c, f = s.value < n.lg && !(d || c), h = s.value < n.xl && !(f || d || c), v = s.value < n.xxl && !(h || f || d || c), g = s.value >= n.xxl, p = c ? "xs" : d ? "sm" : f ? "md" : h ? "lg" : v ? "xl" : "xxl", m = typeof r == "number" ? r : n[r], w = s.value < m;
    l.xs = c, l.sm = d, l.md = f, l.lg = h, l.xl = v, l.xxl = g, l.smAndUp = !c, l.mdAndUp = !(c || d), l.lgAndUp = !(c || d || f), l.xlAndUp = !(c || d || f || h), l.smAndDown = !(f || h || v || g), l.mdAndDown = !(h || v || g), l.lgAndDown = !(v || g), l.xlAndDown = !g, l.name = p, l.height = o.value, l.width = s.value, l.mobile = w, l.mobileBreakpoint = r, l.platform = i.value, l.thresholds = n;
  }), Oe && window.addEventListener("resize", a, {
    passive: !0
  }), {
    ...Ha(l),
    update: u,
    ssr: !!t
  };
}
const C1 = Z({
  mobileBreakpoint: [Number, String]
}, "display");
function du() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = je(la);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const r = C(() => {
    if (!e.mobileBreakpoint) return n.mobile.value;
    const i = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < i;
  }), o = C(() => t ? {
    [`${t}--mobile`]: r.value
  } : {});
  return {
    ...n,
    displayClasses: o,
    mobile: r
  };
}
function E1() {
  if (!Oe) return be(!1);
  const {
    ssr: e
  } = du();
  if (e) {
    const t = be(!1);
    return fn(() => {
      t.value = !0;
    }), t;
  } else
    return be(!0);
}
const Ql = Z({
  eager: Boolean
}, "lazy");
function hu(e, t) {
  const n = be(!1), r = C(() => n.value || e.eager || t.value);
  we(t, () => n.value = !0);
  function o() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: r,
    onAfterLeave: o
  };
}
function fi() {
  const t = lt("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const wf = Symbol.for("vuetify:stack"), bo = un([]);
function V1(e, t, n) {
  const r = lt("useStack"), o = !n, i = je(wf, void 0), l = un({
    activeChildren: /* @__PURE__ */ new Set()
  });
  ct(wf, l);
  const s = be(+t.value);
  Er(e, () => {
    var d;
    const c = (d = bo.at(-1)) == null ? void 0 : d[1];
    s.value = c ? c + 10 : +t.value, o && bo.push([r.uid, s.value]), i == null || i.activeChildren.add(r.uid), wt(() => {
      if (o) {
        const f = xe(bo).findIndex((h) => h[0] === r.uid);
        bo.splice(f, 1);
      }
      i == null || i.activeChildren.delete(r.uid);
    });
  });
  const a = be(!0);
  o && Cn(() => {
    var d;
    const c = ((d = bo.at(-1)) == null ? void 0 : d[0]) === r.uid;
    setTimeout(() => a.value = c);
  });
  const u = C(() => !l.activeChildren.size);
  return {
    globalTop: ti(a),
    localTop: u,
    stackStyles: C(() => ({
      zIndex: s.value
    }))
  };
}
function L1(e) {
  return {
    teleportTarget: C(() => {
      const n = e.value;
      if (n === !0 || !Oe) return;
      const r = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (r == null)
        return;
      let o = r.querySelector(":scope > .v-overlay-container");
      return o || (o = document.createElement("div"), o.className = "v-overlay-container", r.appendChild(o)), o;
    })
  };
}
function P1() {
  return !0;
}
function Sv(e, t, n) {
  if (!e || Cv(e, n) === !1) return !1;
  const r = zh(t);
  if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && r.host === e.target) return !1;
  const o = (typeof n.value == "object" && n.value.include || (() => []))();
  return o.push(t), !o.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Cv(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || P1)(e);
}
function I1(e, t, n) {
  const r = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Sv(e, t, n) && setTimeout(() => {
    Cv(e, n) && r && r(e);
  }, 0);
}
function _f(e, t) {
  const n = zh(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const T1 = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (o) => I1(o, e, t), r = (o) => {
      e._clickOutside.lastMousedownWasOutside = Sv(o, e, t);
    };
    _f(e, (o) => {
      o.addEventListener("click", n, !0), o.addEventListener("mousedown", r, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: r
    };
  },
  unmounted(e, t) {
    e._clickOutside && (_f(e, (n) => {
      var i;
      if (!n || !((i = e._clickOutside) != null && i[t.instance.$.uid])) return;
      const {
        onClick: r,
        onMousedown: o
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", r, !0), n.removeEventListener("mousedown", o, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function M1(e) {
  const {
    modelValue: t,
    color: n,
    ...r
  } = e;
  return y(Rn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && y("div", he({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, r), null)]
  });
}
const di = Z({
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
  ...w1(),
  ...ke(),
  ...or(),
  ...Ql(),
  ...s1(),
  ...h1(),
  ...Ze(),
  ...ci()
}, "VOverlay"), rr = de()({
  name: "VOverlay",
  directives: {
    ClickOutside: T1
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...di()
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
      emit: o
    } = t;
    const i = Ne(e, "modelValue"), l = C({
      get: () => i.value,
      set: (ee) => {
        ee && e.disabled || (i.value = ee);
      }
    }), {
      teleportTarget: s
    } = L1(C(() => e.attach || e.contained)), {
      themeClasses: a
    } = rt(e), {
      rtlClasses: u,
      isRtl: c
    } = gn(), {
      hasContent: d,
      onAfterLeave: f
    } = hu(e, l), h = Dt(C(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: v,
      localTop: g,
      stackStyles: p
    } = V1(l, ae(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: m,
      activatorRef: w,
      target: _,
      targetEl: b,
      targetRef: x,
      activatorEvents: E,
      contentEvents: S,
      scrimEvents: T
    } = _1(e, {
      isActive: l,
      isTop: g
    }), {
      dimensionStyles: A
    } = ir(e), R = E1(), {
      scopeId: D
    } = fi();
    we(() => e.disabled, (ee) => {
      ee && (l.value = !1);
    });
    const L = te(), I = te(), {
      contentStyles: k,
      updateLocation: O
    } = a1(e, {
      isRtl: c,
      contentEl: I,
      target: _,
      isActive: l
    });
    v1(e, {
      root: L,
      contentEl: I,
      targetEl: b,
      isActive: l,
      updateLocation: O
    });
    function M(ee) {
      o("click:outside", ee), e.persistent ? H() : l.value = !1;
    }
    function j() {
      return l.value && v.value;
    }
    Oe && we(l, (ee) => {
      ee ? window.addEventListener("keydown", N) : window.removeEventListener("keydown", N);
    }, {
      immediate: !0
    }), dn(() => {
      Oe && window.removeEventListener("keydown", N);
    });
    function N(ee) {
      var le, fe;
      ee.key === "Escape" && v.value && (e.persistent ? H() : (l.value = !1, (le = I.value) != null && le.contains(document.activeElement) && ((fe = m.value) == null || fe.focus())));
    }
    const F = zy();
    Er(() => e.closeOnBack, () => {
      Gy(F, (ee) => {
        v.value && l.value ? (ee(!1), e.persistent ? H() : l.value = !1) : ee();
      });
    });
    const B = te();
    we(() => l.value && (e.absolute || e.contained) && s.value == null, (ee) => {
      if (ee) {
        const le = Uh(L.value);
        le && le !== document.scrollingElement && (B.value = le.scrollTop);
      }
    });
    function H() {
      e.noClickAnimation || I.value && yr(I.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: zo
      });
    }
    function Y() {
      f(), o("afterLeave");
    }
    return ve(() => {
      var ee;
      return y(Le, null, [(ee = n.activator) == null ? void 0 : ee.call(n, {
        isActive: l.value,
        props: he({
          ref: w,
          targetRef: x
        }, E.value, e.activatorProps)
      }), R.value && d.value && y(Bp, {
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
            top: pe(B.value)
          }, e.style],
          ref: L
        }, D, r), [y(M1, he({
          color: h,
          modelValue: l.value && !!e.scrim
        }, T.value), null), y(Mn, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: _.value,
          onAfterLeave: Y
        }, {
          default: () => {
            var le;
            return [He(y("div", he({
              ref: I,
              class: ["v-overlay__content", e.contentClass],
              style: [A.value, k.value]
            }, S.value, e.contentProps), [(le = n.default) == null ? void 0 : le.call(n, {
              isActive: l
            })]), [[bt, l.value], [cn("click-outside"), {
              handler: M,
              closeConditional: j,
              include: () => [m.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: m,
      target: _,
      animateClick: H,
      contentEl: I,
      globalTop: v,
      localTop: g,
      updateLocation: O
    };
  }
}), Es = Symbol("Forwarded refs");
function Vs(e, t) {
  let n = e;
  for (; n; ) {
    const r = Reflect.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Object.getPrototypeOf(n);
  }
}
function lr(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return e[Es] = n, new Proxy(e, {
    get(o, i) {
      if (Reflect.has(o, i))
        return Reflect.get(o, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const l of n)
          if (l.value && Reflect.has(l.value, i)) {
            const s = Reflect.get(l.value, i);
            return typeof s == "function" ? s.bind(l.value) : s;
          }
      }
    },
    has(o, i) {
      if (Reflect.has(o, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, i))
          return !0;
      return !1;
    },
    set(o, i, l) {
      if (Reflect.has(o, i))
        return Reflect.set(o, i, l);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const s of n)
        if (s.value && Reflect.has(s.value, i))
          return Reflect.set(s.value, i, l);
      return !1;
    },
    getOwnPropertyDescriptor(o, i) {
      var s;
      const l = Reflect.getOwnPropertyDescriptor(o, i);
      if (l) return l;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const a of n) {
          if (!a.value) continue;
          const u = Vs(a.value, i) ?? ("_" in a.value ? Vs((s = a.value._) == null ? void 0 : s.setupState, i) : void 0);
          if (u) return u;
        }
        for (const a of n) {
          const u = a.value && a.value[Es];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = Vs(d.value, i);
            if (f) return f;
            const h = d.value && d.value[Es];
            h && c.push(...h);
          }
        }
      }
    }
  });
}
const A1 = Z({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...di({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: fu
    },
    zIndex: 2400
  })
}, "VDialog"), vu = de()({
  name: "VDialog",
  props: A1(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), {
      scopeId: o
    } = fi(), i = te();
    function l(a) {
      var d, f;
      const u = a.relatedTarget, c = a.target;
      if (u !== c && ((d = i.value) != null && d.contentEl) && // We're the topmost dialog
      ((f = i.value) != null && f.globalTop) && // It isn't the document or the dialog body
      ![document, i.value.contentEl].includes(c) && // It isn't inside the dialog body
      !i.value.contentEl.contains(c)) {
        const h = jo(i.value.contentEl);
        if (!h.length) return;
        const v = h[0], g = h[h.length - 1];
        u === v ? g.focus() : v.focus();
      }
    }
    Oe && we(() => r.value && e.retainFocus, (a) => {
      a ? document.addEventListener("focusin", l) : document.removeEventListener("focusin", l);
    }, {
      immediate: !0
    }), we(r, async (a) => {
      var u, c;
      await Xe(), a ? (u = i.value.contentEl) == null || u.focus({
        preventScroll: !0
      }) : (c = i.value.activatorEl) == null || c.focus({
        preventScroll: !0
      });
    });
    const s = C(() => he({
      "aria-haspopup": "dialog",
      "aria-expanded": String(r.value)
    }, e.activatorProps));
    return ve(() => {
      const a = rr.filterProps(e);
      return y(rr, he({
        ref: i,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, a, {
        modelValue: r.value,
        "onUpdate:modelValue": (u) => r.value = u,
        "aria-modal": "true",
        activatorProps: s.value,
        role: "dialog"
      }, o), {
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
    }), lr({}, i);
  }
});
function xf(e) {
  const n = Math.abs(e);
  return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function kf(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: r,
    isRtl: o,
    currentScrollOffset: i,
    isHorizontal: l
  } = e;
  const s = l ? t.clientWidth : t.clientHeight, a = l ? t.offsetLeft : t.offsetTop, u = o && l ? r - a - s : a, c = n + i, d = s + u, f = s * 0.4;
  return u <= i ? i = Math.max(u - f, 0) : c <= d && (i = Math.min(i - (c - d - f), r - n)), i;
}
function $1(e) {
  let {
    selectedElement: t,
    containerSize: n,
    contentSize: r,
    isRtl: o,
    isHorizontal: i
  } = e;
  const l = i ? t.clientWidth : t.clientHeight, s = i ? t.offsetLeft : t.offsetTop, a = o && i ? r - s - l / 2 - n / 2 : s + l / 2 - n / 2;
  return Math.min(r - n, Math.max(0, a));
}
const N1 = Symbol.for("vuetify:v-slide-group"), gu = Z({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: N1
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
  ...C1(),
  ...We(),
  ...jl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), gl = de()({
  name: "VSlideGroup",
  props: gu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: r
    } = gn(), {
      displayClasses: o,
      mobile: i
    } = du(e), l = oi(e, e.symbol), s = be(!1), a = be(0), u = be(0), c = be(0), d = C(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: h
    } = oo(), {
      resizeRef: v,
      contentRect: g
    } = oo(), p = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[0]) : -1), m = C(() => l.selected.value.length ? l.items.value.findIndex((H) => H.id === l.selected.value[l.selected.value.length - 1]) : -1);
    if (Oe) {
      let H = -1;
      we(() => [l.selected.value, h.value, g.value, d.value], () => {
        cancelAnimationFrame(H), H = requestAnimationFrame(() => {
          if (h.value && g.value) {
            const Y = d.value ? "width" : "height";
            u.value = h.value[Y], c.value = g.value[Y], s.value = u.value + 1 < c.value;
          }
          if (p.value >= 0 && v.value) {
            const Y = v.value.children[m.value];
            p.value === 0 || !s.value ? a.value = 0 : e.centerActive ? a.value = $1({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              isHorizontal: d.value
            }) : s.value && (a.value = kf({
              selectedElement: Y,
              containerSize: u.value,
              contentSize: c.value,
              isRtl: r.value,
              currentScrollOffset: a.value,
              isHorizontal: d.value
            }));
          }
        });
      });
    }
    const w = be(!1);
    let _ = 0, b = 0;
    function x(H) {
      const Y = d.value ? "clientX" : "clientY";
      b = (r.value && d.value ? -1 : 1) * a.value, _ = H.touches[0][Y], w.value = !0;
    }
    function E(H) {
      if (!s.value) return;
      const Y = d.value ? "clientX" : "clientY", ee = r.value && d.value ? -1 : 1;
      a.value = ee * (b + _ - H.touches[0][Y]);
    }
    function S(H) {
      const Y = c.value - u.value;
      a.value < 0 || !s.value ? a.value = 0 : a.value >= Y && (a.value = Y), w.value = !1;
    }
    function T() {
      f.value && (f.value[d.value ? "scrollLeft" : "scrollTop"] = 0);
    }
    const A = be(!1);
    function R(H) {
      if (A.value = !0, !(!s.value || !v.value)) {
        for (const Y of H.composedPath())
          for (const ee of v.value.children)
            if (ee === Y) {
              a.value = kf({
                selectedElement: ee,
                containerSize: u.value,
                contentSize: c.value,
                isRtl: r.value,
                currentScrollOffset: a.value,
                isHorizontal: d.value
              });
              return;
            }
      }
    }
    function D(H) {
      A.value = !1;
    }
    function L(H) {
      var Y;
      !A.value && !(H.relatedTarget && ((Y = v.value) != null && Y.contains(H.relatedTarget))) && k();
    }
    function I(H) {
      v.value && (d.value ? H.key === "ArrowRight" ? k(r.value ? "prev" : "next") : H.key === "ArrowLeft" && k(r.value ? "next" : "prev") : H.key === "ArrowDown" ? k("next") : H.key === "ArrowUp" && k("prev"), H.key === "Home" ? k("first") : H.key === "End" && k("last"));
    }
    function k(H) {
      var Y, ee, le, fe, J;
      if (v.value)
        if (!H)
          (Y = jo(v.value)[0]) == null || Y.focus();
        else if (H === "next") {
          const se = (ee = v.value.querySelector(":focus")) == null ? void 0 : ee.nextElementSibling;
          se ? se.focus() : k("first");
        } else if (H === "prev") {
          const se = (le = v.value.querySelector(":focus")) == null ? void 0 : le.previousElementSibling;
          se ? se.focus() : k("last");
        } else H === "first" ? (fe = v.value.firstElementChild) == null || fe.focus() : H === "last" && ((J = v.value.lastElementChild) == null || J.focus());
    }
    function O(H) {
      const Y = a.value + (H === "prev" ? -1 : 1) * u.value;
      a.value = Bt(Y, 0, c.value - u.value);
    }
    const M = C(() => {
      let H = a.value > c.value - u.value ? -(c.value - u.value) + xf(c.value - u.value - a.value) : -a.value;
      a.value <= 0 && (H = xf(-a.value));
      const Y = r.value && d.value ? -1 : 1;
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
          return !i.value;
        case !0:
          return s.value || Math.abs(a.value) > 0;
        case "mobile":
          return i.value || s.value || Math.abs(a.value) > 0;
        default:
          return !i.value && (s.value || Math.abs(a.value) > 0);
      }
    }), F = C(() => Math.abs(a.value) > 0), B = C(() => c.value > Math.abs(a.value) + u.value);
    return ve(() => y(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": N.value,
        "v-slide-group--is-overflowing": s.value
      }, o.value, e.class],
      style: e.style,
      tabindex: A.value || l.selected.value.length ? -1 : 0,
      onFocus: L
    }, {
      default: () => {
        var H, Y, ee;
        return [N.value && y("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !F.value
          }],
          onClick: () => F.value && O("prev")
        }, [((H = n.prev) == null ? void 0 : H.call(n, j.value)) ?? y(df, null, {
          default: () => [y(ze, {
            icon: r.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), y("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: T
        }, [y("div", {
          ref: v,
          class: "v-slide-group__content",
          style: M.value,
          onTouchstartPassive: x,
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
        }, [((ee = n.next) == null ? void 0 : ee.call(n, j.value)) ?? y(df, null, {
          default: () => [y(ze, {
            icon: r.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: l.selected,
      scrollTo: O,
      scrollOffset: a,
      focus: k
    };
  }
}), Ev = Symbol.for("vuetify:v-chip-group"), R1 = Z({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ar
  },
  ...gu(),
  ...ke(),
  ...jl({
    selectedClass: "v-chip--selected"
  }),
  ...We(),
  ...Ze(),
  ...Gn({
    variant: "tonal"
  })
}, "VChipGroup");
de()({
  name: "VChipGroup",
  props: R1(),
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
      isSelected: o,
      select: i,
      next: l,
      prev: s,
      selected: a
    } = oi(e, Ev);
    return En({
      VChip: {
        color: ae(e, "color"),
        disabled: ae(e, "disabled"),
        filter: ae(e, "filter"),
        variant: ae(e, "variant")
      }
    }), ve(() => {
      const u = gl.filterProps(e);
      return y(gl, he(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, r.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: o,
            select: i,
            next: l,
            prev: s,
            selected: a.value
          })];
        }
      });
    }), {};
  }
});
const O1 = Z({
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
  ...$r(),
  ...ke(),
  ...Zt(),
  ...jn(),
  ...zl(),
  ...Pt(),
  ...Xl(),
  ...ii(),
  ...We({
    tag: "span"
  }),
  ...Ze(),
  ...Gn({
    variant: "tonal"
  })
}, "VChip"), Vv = de()({
  name: "VChip",
  directives: {
    Ripple: Rr
  },
  props: O1(),
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
      slots: o
    } = t;
    const {
      t: i
    } = si(), {
      borderClasses: l
    } = Nr(e), {
      colorClasses: s,
      colorStyles: a,
      variantClasses: u
    } = ho(e), {
      densityClasses: c
    } = vn(e), {
      elevationClasses: d
    } = zn(e), {
      roundedClasses: f
    } = It(e), {
      sizeClasses: h
    } = li(e), {
      themeClasses: v
    } = rt(e), g = Ne(e, "modelValue"), p = Gl(e, Ev, !1), m = Kl(e, n), w = C(() => e.link !== !1 && m.isLink.value), _ = C(() => !e.disabled && e.link !== !1 && (!!p || e.link || m.isClickable.value)), b = C(() => ({
      "aria-label": i(e.closeLabel),
      onClick(S) {
        S.stopPropagation(), g.value = !1, r("click:close", S);
      }
    }));
    function x(S) {
      var T;
      r("click", S), _.value && ((T = m.navigate) == null || T.call(m, S), p == null || p.toggle());
    }
    function E(S) {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), x(S));
    }
    return () => {
      const S = m.isLink.value ? "a" : e.tag, T = !!(e.appendIcon || e.appendAvatar), A = !!(T || o.append), R = !!(o.close || e.closable), D = !!(o.filter || e.filter) && p, L = !!(e.prependIcon || e.prependAvatar), I = !!(L || o.prepend), k = !p || p.isSelected.value;
      return g.value && He(y(S, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": _.value,
          "v-chip--filter": D,
          "v-chip--pill": e.pill
        }, v.value, l.value, k ? s.value : void 0, c.value, d.value, f.value, h.value, u.value, p == null ? void 0 : p.selectedClass.value, e.class],
        style: [k ? a.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: m.href.value,
        tabindex: _.value ? 0 : void 0,
        onClick: x,
        onKeydown: _.value && !w.value && E
      }, {
        default: () => {
          var O;
          return [fo(_.value, "v-chip"), D && y(wv, {
            key: "filter"
          }, {
            default: () => [He(y("div", {
              class: "v-chip__filter"
            }, [o.filter ? y(nt, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, o.filter) : y(ze, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[bt, p.isSelected.value]])]
          }), I && y("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [o.prepend ? y(nt, {
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
          }, o.prepend) : y(Le, null, [e.prependIcon && y(ze, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && y(Vr, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), y("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((O = o.default) == null ? void 0 : O.call(o, {
            isSelected: p == null ? void 0 : p.isSelected.value,
            selectedClass: p == null ? void 0 : p.selectedClass.value,
            select: p == null ? void 0 : p.select,
            toggle: p == null ? void 0 : p.toggle,
            value: p == null ? void 0 : p.value.value,
            disabled: e.disabled
          })) ?? e.text]), A && y("div", {
            key: "append",
            class: "v-chip__append"
          }, [o.append ? y(nt, {
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
          }, o.append) : y(Le, null, [e.appendIcon && y(ze, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(Vr, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), R && y("button", he({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, b.value), [o.close ? y(nt, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, o.close) : y(ze, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[cn("ripple"), _.value && e.ripple, null]]);
    };
  }
}), B1 = Z({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ke(),
  ...ci({
    transition: {
      component: yv
    }
  })
}, "VCounter"), Lv = de()({
  name: "VCounter",
  functional: !0,
  props: B1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = C(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ve(() => y(Mn, {
      transition: e.transition
    }, {
      default: () => [He(y("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: r.value,
        max: e.max,
        value: e.value
      }) : r.value]), [[bt, e.active]])]
    })), {};
  }
}), F1 = Z({
  text: String,
  onClick: sn(),
  ...ke(),
  ...Ze()
}, "VLabel"), es = de()({
  name: "VLabel",
  props: F1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => {
      var r;
      return y("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (r = n.default) == null ? void 0 : r.call(n)]);
    }), {};
  }
}), D1 = Z({
  floating: Boolean,
  ...ke()
}, "VFieldLabel"), Li = de()({
  name: "VFieldLabel",
  props: D1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(es, {
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
  } = si();
  function n(r) {
    let {
      name: o
    } = r;
    const i = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[o], l = e[`onClick:${o}`], s = l && i ? t(`$vuetify.input.${i}`, e.label ?? "") : void 0;
    return y(ze, {
      icon: e[`${o}Icon`],
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
function vo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn();
  const n = Ne(e, "focused"), r = C(() => ({
    [`${t}--focused`]: n.value
  }));
  function o() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: r,
    isFocused: n,
    focus: o,
    blur: i
  };
}
const H1 = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], pu = Z({
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
    validator: (e) => H1.includes(e)
  },
  "onClick:clear": sn(),
  "onClick:appendInner": sn(),
  "onClick:prependInner": sn(),
  ...ke(),
  ...au(),
  ...Pt(),
  ...Ze()
}, "VField"), yu = de()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...mu(),
    ...pu()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: o
    } = t;
    const {
      themeClasses: i
    } = rt(e), {
      loaderClasses: l
    } = Wl(e), {
      focusClasses: s,
      isFocused: a,
      focus: u,
      blur: c
    } = vo(e), {
      InputIcon: d
    } = Pv(e), {
      roundedClasses: f
    } = It(e), {
      rtlClasses: h
    } = gn(), v = C(() => e.dirty || e.active), g = C(() => !e.singleLine && !!(e.label || o.label)), p = Lt(), m = C(() => e.id || `input-${p}`), w = C(() => `${m.value}-messages`), _ = te(), b = te(), x = te(), E = C(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: S,
      backgroundColorStyles: T
    } = Dt(ae(e, "bgColor")), {
      textColorClasses: A,
      textColorStyles: R
    } = an(C(() => e.error || e.disabled ? void 0 : v.value && a.value ? e.color : e.baseColor));
    we(v, (I) => {
      if (g.value) {
        const k = _.value.$el, O = b.value.$el;
        requestAnimationFrame(() => {
          const M = tu(k), j = O.getBoundingClientRect(), N = j.x - M.x, F = j.y - M.y - (M.height / 2 - j.height / 2), B = j.width / 0.75, H = Math.abs(B - M.width) > 1 ? {
            maxWidth: pe(B)
          } : void 0, Y = getComputedStyle(k), ee = getComputedStyle(O), le = parseFloat(Y.transitionDuration) * 1e3 || 150, fe = parseFloat(ee.getPropertyValue("--v-field-label-scale")), J = ee.getPropertyValue("color");
          k.style.visibility = "visible", O.style.visibility = "hidden", yr(k, {
            transform: `translate(${N}px, ${F}px) scale(${fe})`,
            color: J,
            ...H
          }, {
            duration: le,
            easing: zo,
            direction: I ? "normal" : "reverse"
          }).finished.then(() => {
            k.style.removeProperty("visibility"), O.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const D = C(() => ({
      isActive: v,
      isFocused: a,
      controlRef: x,
      blur: c,
      focus: u
    }));
    function L(I) {
      I.target !== document.activeElement && I.preventDefault();
    }
    return ve(() => {
      var N, F, B;
      const I = e.variant === "outlined", k = o["prepend-inner"] || e.prependInnerIcon, O = !!(e.clearable || o.clear), M = !!(o["append-inner"] || e.appendInnerIcon || O), j = () => o.label ? o.label({
        ...D.value,
        label: e.label,
        props: {
          for: m.value
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
          "v-field--prepended": k,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !j(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, S.value, s.value, l.value, f.value, h.value, e.class],
        style: [T.value, e.style],
        onClick: L
      }, n), [y("div", {
        class: "v-field__overlay"
      }, null), y(uu, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: o.loader
      }), k && y("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && y(d, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (N = o["prepend-inner"]) == null ? void 0 : N.call(o, D.value)]), y("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && g.value && y(Li, {
        key: "floating-label",
        ref: b,
        class: [A.value],
        floating: !0,
        for: m.value,
        style: R.value
      }, {
        default: () => [j()]
      }), y(Li, {
        ref: _,
        for: m.value
      }, {
        default: () => [j()]
      }), (F = o.default) == null ? void 0 : F.call(o, {
        ...D.value,
        props: {
          id: m.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: u,
        blur: c
      })]), O && y(wv, {
        key: "clear"
      }, {
        default: () => [He(y("div", {
          class: "v-field__clearable",
          onMousedown: (H) => {
            H.preventDefault(), H.stopPropagation();
          }
        }, [o.clear ? o.clear() : y(d, {
          name: "clear"
        }, null)]), [[bt, e.dirty]])]
      }), M && y("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(B = o["append-inner"]) == null ? void 0 : B.call(o, D.value), e.appendInnerIcon && y(d, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), y("div", {
        class: ["v-field__outline", A.value],
        style: R.value
      }, [I && y(Le, null, [y("div", {
        class: "v-field__outline__start"
      }, null), g.value && y("div", {
        class: "v-field__outline__notch"
      }, [y(Li, {
        ref: b,
        floating: !0,
        for: m.value
      }, {
        default: () => [j()]
      })]), y("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && g.value && y(Li, {
        ref: b,
        floating: !0,
        for: m.value
      }, {
        default: () => [j()]
      })])]);
    }), {
      controlRef: x
    };
  }
});
function Iv(e) {
  const t = Object.keys(yu.props).filter((n) => !Qa(n) && n !== "class" && n !== "style");
  return kh(e, t);
}
const j1 = Z({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ke(),
  ...ci({
    transition: {
      component: yv,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), z1 = de()({
  name: "VMessages",
  props: j1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = C(() => kn(e.messages)), {
      textColorClasses: o,
      textColorStyles: i
    } = an(C(() => e.color));
    return ve(() => y(Mn, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", o.value, e.class],
      style: [i.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && r.value.map((l, s) => y("div", {
        class: "v-messages__message",
        key: `${s}-${r.value}`
      }, [n.message ? n.message({
        message: l
      }) : l]))]
    })), {};
  }
}), G1 = Symbol.for("vuetify:form");
function Tv() {
  return je(G1, null);
}
const U1 = Z({
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
function W1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lt();
  const r = Ne(e, "modelValue"), o = C(() => e.validationValue === void 0 ? r.value : e.validationValue), i = Tv(), l = te([]), s = be(!0), a = C(() => !!(kn(r.value === "" ? null : r.value).length || kn(o.value === "" ? null : o.value).length)), u = C(() => !!(e.disabled ?? (i == null ? void 0 : i.isDisabled.value))), c = C(() => !!(e.readonly ?? (i == null ? void 0 : i.isReadonly.value))), d = C(() => {
    var b;
    return (b = e.errorMessages) != null && b.length ? kn(e.errorMessages).concat(l.value).slice(0, Math.max(0, +e.maxErrors)) : l.value;
  }), f = C(() => {
    let b = (e.validateOn ?? (i == null ? void 0 : i.validateOn.value)) || "input";
    b === "lazy" && (b = "input lazy");
    const x = new Set((b == null ? void 0 : b.split(" ")) ?? []);
    return {
      blur: x.has("blur") || x.has("input"),
      input: x.has("input"),
      submit: x.has("submit"),
      lazy: x.has("lazy")
    };
  }), h = C(() => {
    var b;
    return e.error || (b = e.errorMessages) != null && b.length ? !1 : e.rules.length ? s.value ? l.value.length || f.value.lazy ? null : !0 : !l.value.length : !0;
  }), v = be(!1), g = C(() => ({
    [`${t}--error`]: h.value === !1,
    [`${t}--dirty`]: a.value,
    [`${t}--disabled`]: u.value,
    [`${t}--readonly`]: c.value
  })), p = C(() => e.name ?? rn(n));
  Nl(() => {
    i == null || i.register({
      id: p.value,
      validate: _,
      reset: m,
      resetValidation: w
    });
  }), dn(() => {
    i == null || i.unregister(p.value);
  }), fn(async () => {
    f.value.lazy || await _(!0), i == null || i.update(p.value, h.value, d.value);
  }), Er(() => f.value.input, () => {
    we(o, () => {
      if (o.value != null)
        _();
      else if (e.focused) {
        const b = we(() => e.focused, (x) => {
          x || _(), b();
        });
      }
    });
  }), Er(() => f.value.blur, () => {
    we(() => e.focused, (b) => {
      b || _();
    });
  }), we([h, d], () => {
    i == null || i.update(p.value, h.value, d.value);
  });
  function m() {
    r.value = null, Xe(w);
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
      const T = await (typeof E == "function" ? E : () => E)(o.value);
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
    reset: m,
    resetValidation: w,
    validate: _,
    validationClasses: g
  };
}
const Or = Z({
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
  ...U1()
}, "VInput"), Kt = de()({
  name: "VInput",
  props: {
    ...Or()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r,
      emit: o
    } = t;
    const {
      densityClasses: i
    } = vn(e), {
      rtlClasses: l
    } = gn(), {
      InputIcon: s
    } = Pv(e), a = Lt(), u = C(() => e.id || `input-${a}`), c = C(() => `${u.value}-messages`), {
      errorMessages: d,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: g,
      isValid: p,
      isValidating: m,
      reset: w,
      resetValidation: _,
      validate: b,
      validationClasses: x
    } = W1(e, "v-input", u), E = C(() => ({
      id: u,
      messagesId: c,
      isDirty: f,
      isDisabled: h,
      isReadonly: v,
      isPristine: g,
      isValid: p,
      isValidating: m,
      reset: w,
      resetValidation: _,
      validate: b
    })), S = C(() => {
      var T;
      return (T = e.errorMessages) != null && T.length || !g.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ve(() => {
      var L, I, k, O;
      const T = !!(r.prepend || e.prependIcon), A = !!(r.append || e.appendIcon), R = S.value.length > 0, D = !e.hideDetails || e.hideDetails === "auto" && (R || !!r.details);
      return y("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, l.value, x.value, e.class],
        style: e.style
      }, [T && y("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(L = r.prepend) == null ? void 0 : L.call(r, E.value), e.prependIcon && y(s, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), r.default && y("div", {
        class: "v-input__control"
      }, [(I = r.default) == null ? void 0 : I.call(r, E.value)]), A && y("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && y(s, {
        key: "append-icon",
        name: "append"
      }, null), (k = r.append) == null ? void 0 : k.call(r, E.value)]), D && y("div", {
        class: "v-input__details"
      }, [y(z1, {
        id: c.value,
        active: R,
        messages: S.value
      }, {
        message: r.message
      }), (O = r.details) == null ? void 0 : O.call(r, E.value)])]);
    }), {
      reset: w,
      resetValidation: _,
      validate: b,
      isValid: p,
      errorMessages: d
    };
  }
}), q1 = Z({
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
  ...Or({
    prependIcon: "$file"
  }),
  modelValue: {
    type: Array,
    default: () => [],
    validator: (e) => kn(e).every((t) => t != null && typeof t == "object")
  },
  ...pu({
    clearable: !0
  })
}, "VFileInput"), Y1 = de()({
  name: "VFileInput",
  inheritAttrs: !1,
  props: q1(),
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
      slots: o
    } = t;
    const {
      t: i
    } = si(), l = Ne(e, "modelValue"), {
      isFocused: s,
      focus: a,
      blur: u
    } = vo(e), c = C(() => typeof e.showSize != "boolean" ? e.showSize : void 0), d = C(() => (l.value ?? []).reduce((A, R) => {
      let {
        size: D = 0
      } = R;
      return A + D;
    }, 0)), f = C(() => Oc(d.value, c.value)), h = C(() => (l.value ?? []).map((A) => {
      const {
        name: R = "",
        size: D = 0
      } = A;
      return e.showSize ? `${R} (${Oc(D, c.value)})` : R;
    })), v = C(() => {
      var R;
      const A = ((R = l.value) == null ? void 0 : R.length) ?? 0;
      return e.showSize ? i(e.counterSizeString, A, f.value) : i(e.counterString, A);
    }), g = te(), p = te(), m = te(), w = C(() => s.value || e.active), _ = C(() => ["plain", "underlined"].includes(e.variant));
    function b() {
      var A;
      m.value !== document.activeElement && ((A = m.value) == null || A.focus()), s.value || a();
    }
    function x(A) {
      var R;
      (R = m.value) == null || R.click();
    }
    function E(A) {
      r("mousedown:control", A);
    }
    function S(A) {
      var R;
      (R = m.value) == null || R.click(), r("click:control", A);
    }
    function T(A) {
      A.stopPropagation(), b(), Xe(() => {
        l.value = [], Vh(e["onClick:clear"], A);
      });
    }
    return we(l, (A) => {
      (!Array.isArray(A) || !A.length) && m.value && (m.value.value = "");
    }), ve(() => {
      const A = !!(o.counter || e.counter), R = !!(A || o.details), [D, L] = uo(n), {
        modelValue: I,
        ...k
      } = Kt.filterProps(e), O = Iv(e);
      return y(Kt, he({
        ref: g,
        modelValue: l.value,
        "onUpdate:modelValue": (M) => l.value = M,
        class: ["v-file-input", {
          "v-file-input--chips": !!e.chips,
          "v-input--plain-underlined": _.value
        }, e.class],
        style: e.style,
        "onClick:prepend": x
      }, D, k, {
        centerAffix: !_.value,
        focused: s.value
      }), {
        ...o,
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
            "onClick:clear": T,
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
            ...o,
            default: (Y) => {
              var fe;
              let {
                props: {
                  class: ee,
                  ...le
                }
              } = Y;
              return y(Le, null, [y("input", he({
                ref: m,
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
                  const se = J.target;
                  l.value = [...se.files ?? []];
                },
                onFocus: b,
                onBlur: u
              }, le, L), null), y("div", {
                class: ee
              }, [!!((fe = l.value) != null && fe.length) && (o.selection ? o.selection({
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
        details: R ? (M) => {
          var j, N;
          return y(Le, null, [(j = o.details) == null ? void 0 : j.call(o, M), A && y(Le, null, [y("span", null, null), y(Lv, {
            active: !!((N = l.value) != null && N.length),
            value: v.value
          }, o.counter)])]);
        } : void 0
      });
    }), lr({}, g, p, m);
  }
}), Mv = Jl.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), Av = Jl.reduce((e, t) => {
  const n = "offset" + Fn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), $v = Jl.reduce((e, t) => {
  const n = "order" + Fn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Sf = {
  col: Object.keys(Mv),
  offset: Object.keys(Av),
  order: Object.keys($v)
};
function K1(e, t, n) {
  let r = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const o = t.replace(e, "");
      r += `-${o}`;
    }
    return e === "col" && (r = "v-" + r), e === "col" && (n === "" || n === !0) || (r += `-${n}`), r.toLowerCase();
  }
}
const X1 = ["auto", "start", "end", "center", "baseline", "stretch"], Z1 = Z({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Mv,
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
    validator: (e) => X1.includes(e)
  },
  ...ke(),
  ...We()
}, "VCol"), Gr = de()({
  name: "VCol",
  props: Z1(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = C(() => {
      const o = [];
      let i;
      for (i in Sf)
        Sf[i].forEach((s) => {
          const a = e[s], u = K1(i, s, a);
          u && o.push(u);
        });
      const l = o.some((s) => s.startsWith("v-col-"));
      return o.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !l || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), o;
    });
    return () => {
      var o;
      return Hn(e.tag, {
        class: [r.value, e.class],
        style: e.style
      }, (o = n.default) == null ? void 0 : o.call(n));
    };
  }
}), bu = ["start", "end", "center"], Nv = ["space-between", "space-around", "space-evenly"];
function wu(e, t) {
  return Jl.reduce((n, r) => {
    const o = e + Fn(r);
    return n[o] = t(), n;
  }, {});
}
const J1 = [...bu, "baseline", "stretch"], Rv = (e) => J1.includes(e), Ov = wu("align", () => ({
  type: String,
  default: null,
  validator: Rv
})), Q1 = [...bu, ...Nv], Bv = (e) => Q1.includes(e), Fv = wu("justify", () => ({
  type: String,
  default: null,
  validator: Bv
})), eb = [...bu, ...Nv, "stretch"], Dv = (e) => eb.includes(e), Hv = wu("alignContent", () => ({
  type: String,
  default: null,
  validator: Dv
})), Cf = {
  align: Object.keys(Ov),
  justify: Object.keys(Fv),
  alignContent: Object.keys(Hv)
}, tb = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function nb(e, t, n) {
  let r = tb[e];
  if (n != null) {
    if (t) {
      const o = t.replace(e, "");
      r += `-${o}`;
    }
    return r += `-${n}`, r.toLowerCase();
  }
}
const rb = Z({
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
  ...ke(),
  ...We()
}, "VRow"), kt = de()({
  name: "VRow",
  props: rb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = C(() => {
      const o = [];
      let i;
      for (i in Cf)
        Cf[i].forEach((l) => {
          const s = e[l], a = nb(i, l, s);
          a && o.push(a);
        });
      return o.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), o;
    });
    return () => {
      var o;
      return Hn(e.tag, {
        class: ["v-row", r.value, e.class],
        style: e.style
      }, (o = n.default) == null ? void 0 : o.call(n));
    };
  }
}), ml = co("v-spacer", "div", "VSpacer"), jv = Symbol.for("vuetify:selection-control-group"), _u = Z({
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
    default: Ar
  },
  ...ke(),
  ...Zt(),
  ...Ze()
}, "SelectionControlGroup"), ob = Z({
  ..._u({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup"), ib = de()({
  name: "VSelectionControlGroup",
  props: ob(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), o = Lt(), i = C(() => e.id || `v-selection-control-group-${o}`), l = C(() => e.name || i.value), s = /* @__PURE__ */ new Set();
    return ct(jv, {
      modelValue: r,
      forceUpdate: () => {
        s.forEach((a) => a());
      },
      onForceUpdate: (a) => {
        s.add(a), wt(() => {
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
        modelValue: r,
        multiple: C(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)),
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
}), ts = Z({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ke(),
  ..._u()
}, "VSelectionControl");
function lb(e) {
  const t = je(jv, void 0), {
    densityClasses: n
  } = vn(e), r = Ne(e, "modelValue"), o = C(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = C(() => e.falseValue !== void 0 ? e.falseValue : !1), l = C(() => !!e.multiple || e.multiple == null && Array.isArray(r.value)), s = C({
    get() {
      const h = t ? t.modelValue.value : r.value;
      return l.value ? kn(h).some((v) => e.valueComparator(v, o.value)) : e.valueComparator(h, o.value);
    },
    set(h) {
      if (e.readonly) return;
      const v = h ? o.value : i.value;
      let g = v;
      l.value && (g = h ? [...kn(r.value), v] : kn(r.value).filter((p) => !e.valueComparator(p, o.value))), t ? t.modelValue.value = g : r.value = g;
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
    trueValue: o,
    falseValue: i,
    model: s,
    textColorClasses: a,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: f
  };
}
const io = de()({
  name: "VSelectionControl",
  directives: {
    Ripple: Rr
  },
  inheritAttrs: !1,
  props: ts(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const {
      group: o,
      densityClasses: i,
      icon: l,
      model: s,
      textColorClasses: a,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: f
    } = lb(e), h = Lt(), v = be(!1), g = be(!1), p = te(), m = C(() => e.id || `input-${h}`), w = C(() => !e.disabled && !e.readonly);
    o == null || o.onForceUpdate(() => {
      p.value && (p.value.checked = s.value);
    });
    function _(S) {
      w.value && (v.value = !0, al(S.target, ":focus-visible") !== !1 && (g.value = !0));
    }
    function b() {
      v.value = !1, g.value = !1;
    }
    function x(S) {
      S.stopPropagation();
    }
    function E(S) {
      w.value && (e.readonly && o && Xe(() => o.forceUpdate()), s.value = S.target.checked);
    }
    return ve(() => {
      var D, L;
      const S = r.label ? r.label({
        label: e.label,
        props: {
          for: m.value
        }
      }) : e.label, [T, A] = uo(n), R = y("input", he({
        ref: p,
        checked: s.value,
        disabled: !!e.disabled,
        id: m.value,
        onBlur: b,
        onFocus: _,
        onInput: E,
        "aria-disabled": !!e.disabled,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? s.value : void 0
      }, A), null);
      return y("div", he({
        class: ["v-selection-control", {
          "v-selection-control--dirty": s.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": v.value,
          "v-selection-control--focus-visible": g.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, T, {
        style: e.style
      }), [y("div", {
        class: ["v-selection-control__wrapper", a.value],
        style: u.value
      }, [(D = r.default) == null ? void 0 : D.call(r, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), He(y("div", {
        class: ["v-selection-control__input"]
      }, [((L = r.input) == null ? void 0 : L.call(r, {
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
          id: m.value
        }
      })) ?? y(Le, null, [l.value && y(ze, {
        key: "icon",
        icon: l.value
      }, null), R])]), [[cn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), S && y(es, {
        for: m.value,
        onClick: x
      }, {
        default: () => [S]
      })]);
    }), {
      isFocused: v,
      input: p
    };
  }
}), sb = Z({
  ...ts({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio"), Ef = de()({
  name: "VRadio",
  props: sb(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => y(io, he(e, {
      class: ["v-radio", e.class],
      style: e.style,
      type: "radio"
    }), n)), {};
  }
}), ab = Z({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...Or(),
  ...Xt(_u(), ["multiple"]),
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
}, "VRadioGroup"), ub = de()({
  name: "VRadioGroup",
  inheritAttrs: !1,
  props: ab(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const o = Lt(), i = C(() => e.id || `radio-group-${o}`), l = Ne(e, "modelValue");
    return ve(() => {
      const [s, a] = uo(n), u = Kt.filterProps(e), c = io.filterProps(e), d = r.label ? r.label({
        label: e.label,
        props: {
          for: i.value
        }
      }) : e.label;
      return y(Kt, he({
        class: ["v-radio-group", e.class],
        style: e.style
      }, s, u, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        id: i.value
      }), {
        ...r,
        default: (f) => {
          let {
            id: h,
            messagesId: v,
            isDisabled: g,
            isReadonly: p
          } = f;
          return y(Le, null, [d && y(es, {
            id: h.value
          }, {
            default: () => [d]
          }), y(ib, he(c, {
            id: h.value,
            "aria-describedby": v.value,
            defaultsTarget: "VRadio",
            trueIcon: e.trueIcon,
            falseIcon: e.falseIcon,
            type: e.type,
            disabled: g.value,
            readonly: p.value,
            "aria-labelledby": d ? h.value : void 0,
            multiple: !1
          }, a, {
            modelValue: l.value,
            "onUpdate:modelValue": (m) => l.value = m
          }), r)]);
        }
      });
    }), {};
  }
});
function cb(e) {
  const t = be(e);
  let n = -1;
  function r() {
    clearInterval(n);
  }
  function o() {
    r(), Xe(() => t.value = e);
  }
  function i(l) {
    const s = l ? getComputedStyle(l) : {
      transitionDuration: 0.2
    }, a = parseFloat(s.transitionDuration) * 1e3 || 200;
    if (r(), t.value <= 0) return;
    const u = performance.now();
    n = window.setInterval(() => {
      const c = performance.now() - u + a;
      t.value = Math.max(e - c, 0), t.value <= 0 && r();
    }, a);
  }
  return wt(r), {
    clear: r,
    time: t,
    start: i,
    reset: o
  };
}
const fb = Z({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...ai({
    location: "bottom"
  }),
  ...ql(),
  ...Pt(),
  ...Gn(),
  ...Ze(),
  ...Xt(di({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar"), sa = de()({
  name: "VSnackbar",
  props: fb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), {
      locationStyles: o
    } = ui(e), {
      positionClasses: i
    } = Yl(e), {
      scopeId: l
    } = fi(), {
      themeClasses: s
    } = rt(e), {
      colorClasses: a,
      colorStyles: u,
      variantClasses: c
    } = ho(e), {
      roundedClasses: d
    } = It(e), f = cb(Number(e.timeout)), h = te(), v = te(), g = be(!1);
    we(r, m), we(() => e.timeout, m), fn(() => {
      r.value && m();
    });
    let p = -1;
    function m() {
      f.reset(), window.clearTimeout(p);
      const x = Number(e.timeout);
      if (!r.value || x === -1) return;
      const E = Ho(v.value);
      f.start(E), p = window.setTimeout(() => {
        r.value = !1;
      }, x);
    }
    function w() {
      f.reset(), window.clearTimeout(p);
    }
    function _() {
      g.value = !0, w();
    }
    function b() {
      g.value = !1, m();
    }
    return ve(() => {
      const x = rr.filterProps(e), E = !!(n.default || n.text || e.text);
      return y(rr, he({
        ref: h,
        class: ["v-snackbar", {
          "v-snackbar--active": r.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, i.value, e.class],
        style: e.style
      }, x, {
        modelValue: r.value,
        "onUpdate:modelValue": (S) => r.value = S,
        contentProps: he({
          class: ["v-snackbar__wrapper", s.value, a.value, d.value, c.value],
          style: [o.value, u.value],
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
          var S, T;
          return [fo(!1, "v-snackbar"), e.timer && !g.value && y("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [y(tv, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            "model-value": f.time.value
          }, null)]), E && y("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((S = n.text) == null ? void 0 : S.call(n)) ?? e.text, (T = n.default) == null ? void 0 : T.call(n)]), n.actions && y(nt, {
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
    }), lr({}, h);
  }
}), zv = Symbol.for("vuetify:v-tabs"), db = Z({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Xt(cv({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), aa = de()({
  name: "VTab",
  props: db(),
  setup(e, t) {
    let {
      slots: n,
      attrs: r
    } = t;
    const {
      textColorClasses: o,
      textColorStyles: i
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
        const g = (v = (h = l.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : v.querySelector(".v-tab--selected .v-tab__slider"), p = s.value;
        if (!g || !p) return;
        const m = getComputedStyle(g).color, w = g.getBoundingClientRect(), _ = p.getBoundingClientRect(), b = a.value ? "x" : "y", x = a.value ? "X" : "Y", E = a.value ? "right" : "bottom", S = a.value ? "width" : "height", T = w[b], A = _[b], R = T > A ? w[E] - _[E] : w[b] - _[b], D = Math.sign(R) > 0 ? a.value ? "right" : "bottom" : Math.sign(R) < 0 ? a.value ? "left" : "top" : "center", I = (Math.abs(R) + (Math.sign(R) < 0 ? w[S] : _[S])) / Math.max(w[S], _[S]) || 0, k = w[S] / _[S] || 0, O = 1.5;
        yr(p, {
          backgroundColor: [m, "currentcolor"],
          transform: [`translate${x}(${R}px) scale${x}(${k})`, `translate${x}(${R / O}px) scale${x}(${(I - 1) / O + 1})`, "none"],
          transformOrigin: Array(3).fill(D)
        }, {
          duration: 225,
          easing: zo
        });
      }
    }
    return ve(() => {
      const d = ut.filterProps(e);
      return y(ut, he({
        symbol: zv,
        ref: l,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: u.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(u.value),
        active: !1
      }, d, r, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": c
      }), {
        ...n,
        default: () => {
          var f;
          return y(Le, null, [((f = n.default) == null ? void 0 : f.call(n)) ?? e.text, !e.hideSlider && y("div", {
            ref: s,
            class: ["v-tab__slider", o.value],
            style: i.value
          }, null)]);
        }
      });
    }), lr({}, l);
  }
});
function hb(e) {
  return e ? e.map((t) => il(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const vb = Z({
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
  ...gu({
    mandatory: "force"
  }),
  ...Zt(),
  ...We()
}, "VTabs"), gb = de()({
  name: "VTabs",
  props: vb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), o = C(() => hb(e.items)), {
      densityClasses: i
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
      const a = gl.filterProps(e);
      return y(gl, he(a, {
        modelValue: r.value,
        "onUpdate:modelValue": (u) => r.value = u,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, l.value, e.class],
        style: [{
          "--v-tabs-height": pe(e.height)
        }, s.value, e.style],
        role: "tablist",
        symbol: zv
      }), {
        default: () => [n.default ? n.default() : o.value.map((u) => y(aa, he(u, {
          key: u.text
        }), null))]
      });
    }), {};
  }
}), mb = Z({
  id: String,
  text: String,
  ...Xt(di({
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
}, "VTooltip"), Zr = de()({
  name: "VTooltip",
  props: mb(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), {
      scopeId: o
    } = fi(), i = Lt(), l = C(() => e.id || `v-tooltip-${i}`), s = te(), a = C(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = C(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), c = C(() => e.transition ? e.transition : r.value ? "scale-transition" : "fade-transition"), d = C(() => he({
      "aria-describedby": l.value
    }, e.activatorProps));
    return ve(() => {
      const f = rr.filterProps(e);
      return y(rr, he({
        ref: s,
        class: ["v-tooltip", e.class],
        style: e.style,
        id: l.value
      }, f, {
        modelValue: r.value,
        "onUpdate:modelValue": (h) => r.value = h,
        transition: c.value,
        absolute: !0,
        location: a.value,
        origin: u.value,
        persistent: !0,
        role: "tooltip",
        activatorProps: d.value,
        _disableGlobalStack: !0
      }, o), {
        activator: n.activator,
        default: function() {
          var p;
          for (var h = arguments.length, v = new Array(h), g = 0; g < h; g++)
            v[g] = arguments[g];
          return ((p = n.default) == null ? void 0 : p.call(n, ...v)) ?? e.text;
        }
      });
    }), lr({}, s);
  }
}), pb = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: r,
    touchendY: o
  } = e, i = 0.5, l = 16;
  e.offsetX = n - t, e.offsetY = o - r, Math.abs(e.offsetY) < i * Math.abs(e.offsetX) && (e.left && n < t - l && e.left(e), e.right && n > t + l && e.right(e)), Math.abs(e.offsetX) < i * Math.abs(e.offsetY) && (e.up && o < r - l && e.up(e), e.down && o > r + l && e.down(e));
};
function yb(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (r = t.start) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function bb(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (r = t.end) == null || r.call(t, {
    originalEvent: e,
    ...t
  }), pb(t);
}
function wb(e, t) {
  var r;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (r = t.move) == null || r.call(t, {
    originalEvent: e,
    ...t
  });
}
function _b() {
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
    touchstart: (n) => yb(n, t),
    touchend: (n) => bb(n, t),
    touchmove: (n) => wb(n, t)
  };
}
function xb(e, t) {
  var s;
  const n = t.value, r = n != null && n.parent ? e.parentElement : e, o = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, i = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!r || !i) return;
  const l = _b(t.value);
  r._touchHandlers = r._touchHandlers ?? /* @__PURE__ */ Object.create(null), r._touchHandlers[i] = l, xh(l).forEach((a) => {
    r.addEventListener(a, l[a], o);
  });
}
function kb(e, t) {
  var i, l;
  const n = (i = t.value) != null && i.parent ? e.parentElement : e, r = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!(n != null && n._touchHandlers) || !r) return;
  const o = n._touchHandlers[r];
  xh(o).forEach((s) => {
    n.removeEventListener(s, o[s]);
  }), delete n._touchHandlers[r];
}
const Gv = {
  mounted: xb,
  unmounted: kb
}, Uv = Symbol.for("vuetify:v-window"), Wv = Symbol.for("vuetify:v-window-group"), Sb = Z({
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
  ...We(),
  ...Ze()
}, "VWindow"), Cb = de()({
  name: "VWindow",
  directives: {
    Touch: Gv
  },
  props: Sb(),
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
      isRtl: o
    } = gn(), {
      t: i
    } = si(), l = oi(e, Wv), s = te(), a = C(() => o.value ? !e.reverse : e.reverse), u = be(!1), c = C(() => {
      const b = e.direction === "vertical" ? "y" : "x", E = (a.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${b}${E}-transition`;
    }), d = be(0), f = te(void 0), h = C(() => l.items.value.findIndex((b) => l.selected.value.includes(b.id)));
    we(h, (b, x) => {
      const E = l.items.value.length, S = E - 1;
      E <= 2 ? u.value = b < x : b === S && x === 0 ? u.value = !0 : b === 0 && x === S ? u.value = !1 : u.value = b < x;
    }), ct(Uv, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: f,
      rootRef: s
    });
    const v = C(() => e.continuous || h.value !== 0), g = C(() => e.continuous || h.value !== l.items.value.length - 1);
    function p() {
      v.value && l.prev();
    }
    function m() {
      g.value && l.next();
    }
    const w = C(() => {
      const b = [], x = {
        icon: o.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${a.value ? "right" : "left"}`,
        onClick: l.prev,
        "aria-label": i("$vuetify.carousel.prev")
      };
      b.push(v.value ? n.prev ? n.prev({
        props: x
      }) : y(ut, x, null) : y("div", null, null));
      const E = {
        icon: o.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${a.value ? "left" : "right"}`,
        onClick: l.next,
        "aria-label": i("$vuetify.carousel.next")
      };
      return b.push(g.value ? n.next ? n.next({
        props: E
      }) : y(ut, E, null) : y("div", null, null)), b;
    }), _ = C(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          a.value ? p() : m();
        },
        right: () => {
          a.value ? m() : p();
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
    return ve(() => He(y(e.tag, {
      ref: s,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, r.value, e.class],
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
    }), [[cn("touch"), _.value]])), {
      group: l
    };
  }
});
function qv() {
  const e = be(!1);
  return fn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: C(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ti(e)
  };
}
const Eb = Z({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ke(),
  ...zl(),
  ...Ql()
}, "VWindowItem"), Vf = de()({
  name: "VWindowItem",
  directives: {
    Touch: Gv
  },
  props: Eb(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = je(Uv), o = Gl(e, Wv), {
      isBooted: i
    } = qv();
    if (!r || !o) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const l = be(!1), s = C(() => i.value && (r.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function a() {
      !l.value || !r || (l.value = !1, r.transitionCount.value > 0 && (r.transitionCount.value -= 1, r.transitionCount.value === 0 && (r.transitionHeight.value = void 0)));
    }
    function u() {
      var v;
      l.value || !r || (l.value = !0, r.transitionCount.value === 0 && (r.transitionHeight.value = pe((v = r.rootRef.value) == null ? void 0 : v.clientHeight)), r.transitionCount.value += 1);
    }
    function c() {
      a();
    }
    function d(v) {
      l.value && Xe(() => {
        !s.value || !l.value || !r || (r.transitionHeight.value = pe(v.clientHeight));
      });
    }
    const f = C(() => {
      const v = r.isReversed.value ? e.reverseTransition : e.transition;
      return s.value ? {
        name: typeof v != "string" ? r.transition.value : v,
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
    } = hu(e, o.isSelected);
    return ve(() => y(Mn, {
      transition: f.value,
      disabled: !i.value
    }, {
      default: () => {
        var v;
        return [He(y("div", {
          class: ["v-window-item", o.selectedClass.value, e.class],
          style: e.style
        }, [h.value && ((v = n.default) == null ? void 0 : v.call(n))]), [[bt, o.isSelected.value]])];
      }
    })), {
      groupItem: o
    };
  }
}), Vb = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Select File", -1), Lb = /* @__PURE__ */ Ae("p", null, " Files in a specific JSON format or trivial graph format are supported. ", -1), Pb = /* @__PURE__ */ Ae("p", null, [
  /* @__PURE__ */ Qe("Importing will "),
  /* @__PURE__ */ Ae("strong", null, "replace"),
  /* @__PURE__ */ Qe(" your current graph.")
], -1), Ib = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Select Format", -1), Tb = /* @__PURE__ */ Ae("h3", { class: "heading" }, "Preview", -1), Mb = /* @__PURE__ */ Ae("strong", null, "copy", -1), Ab = /* @__PURE__ */ Mr({
  __name: "ImportExport",
  props: {
    graphAsTgf: { type: null },
    graphAsJson: { type: null }
  },
  emits: ["file-imported"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = te(!1), i = te(0), l = te(), s = te("JSON"), a = te(!1), u = te(!1), c = te(""), d = te(""), f = C(
      () => {
        var w, _;
        return i.value === 0 && (l == null ? void 0 : l.value) && (((w = l == null ? void 0 : l.value[0]) == null ? void 0 : w.name.toLowerCase().endsWith(".tgf")) || ((_ = l == null ? void 0 : l.value[0]) == null ? void 0 : _.name.toLowerCase().endsWith(".json"))) || i.value === 1 && n.graphAsTgf !== "";
      }
    ), h = [
      (w) => !!w[0] || "File is required",
      (w) => {
        var _;
        return !w || /\.(tgf|TGF|json|JSON)$/.test((_ = w[0]) == null ? void 0 : _.name) || "Invalid file format. Please select a .tgf or .json file.";
      }
    ];
    function v() {
      var w;
      if (l != null && l.value)
        for (let _ of l.value) {
          const b = (w = _.name.split(".").pop()) == null ? void 0 : w.toLowerCase();
          _.text().then((x) => {
            b === "tgf" ? r("file-imported", x) : b === "json" ? r("file-imported", JSON.parse(x)) : m("No valid file extension.", ""), p();
          }).catch((x) => {
            m(`Error reading the imported file ${_.name}`, x);
          });
        }
    }
    function g() {
      i.value === 0 ? v() : i.value === 1 && navigator.clipboard.writeText(
        s.value === "TGF" ? n.graphAsTgf.toString() : n.graphAsJson.toString()
      ).then(
        () => a.value = !0,
        (w) => {
          m("Copy unsuccessful", w);
        }
      );
    }
    function p() {
      u.value = !1, c.value = "", d.value = "", o.value = !1, i.value = 0, l.value = void 0, a.value = !1;
    }
    function m(w, _) {
      console.error(w + `
` + _), u.value = !0, c.value = w, d.value = _.toString(), window.setInterval(() => u.value = !1, 5e3);
    }
    return (w, _) => (vt(), ln(vu, {
      modelValue: o.value,
      "onUpdate:modelValue": _[8] || (_[8] = (b) => o.value = b),
      "max-width": "800px"
    }, {
      activator: ce(({ props: b }) => [
        y(Zr, {
          location: "bottom",
          "open-delay": 750,
          text: "Import/Export"
        }, {
          activator: ce(({ props: x }) => [
            y(ut, he({
              "aria-label": "Import",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$importExport"
            }, { ...b, ...x }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(() => [
        y(cu, null, {
          default: ce(() => [
            y(Wo, null, {
              default: ce(() => [
                y(gb, {
                  modelValue: i.value,
                  "onUpdate:modelValue": _[0] || (_[0] = (b) => i.value = b)
                }, {
                  default: ce(() => [
                    y(aa, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ce(() => [
                        Qe("Import")
                      ]),
                      _: 1
                    }),
                    y(aa, {
                      color: "secondary",
                      density: "compact",
                      variant: "elevated"
                    }, {
                      default: ce(() => [
                        Qe("Export")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            y(Ao, null, {
              default: ce(() => [
                y(Cb, {
                  modelValue: i.value,
                  "onUpdate:modelValue": _[3] || (_[3] = (b) => i.value = b),
                  class: "ml-4"
                }, {
                  default: ce(() => [
                    y(Vf, null, {
                      default: ce(() => [
                        Vb,
                        y(Y1, {
                          modelValue: l.value,
                          "onUpdate:modelValue": _[1] || (_[1] = (b) => l.value = b),
                          accept: ".tgf, .json",
                          density: "compact",
                          label: "Graph Format File",
                          rules: h,
                          type: "file",
                          variant: "solo"
                        }, null, 8, ["modelValue"]),
                        y(Ao, null, {
                          default: ce(() => [
                            Lb,
                            Pb
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    y(Vf, null, {
                      default: ce(() => [
                        Ib,
                        y(ub, {
                          inline: "",
                          modelValue: s.value,
                          "onUpdate:modelValue": _[2] || (_[2] = (b) => s.value = b)
                        }, {
                          default: ce(() => [
                            y(Ef, {
                              label: "JSON",
                              value: "JSON"
                            }),
                            y(Ef, {
                              label: "TGF",
                              value: "TGF"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        Tb,
                        He(Ae("pre", null, ht(n.graphAsJson), 513), [
                          [bt, s.value === "JSON"]
                        ]),
                        He(Ae("pre", null, ht(n.graphAsTgf), 513), [
                          [bt, s.value === "TGF"]
                        ]),
                        y(Ao, null, {
                          default: ce(() => [
                            Qe("This export action will "),
                            Mb,
                            Qe(" the graph as JSON or in trivial graph format to your clipboard.")
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
            y(Zl, null, {
              default: ce(() => [
                y(ml),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  disabled: !f.value,
                  onClick: _[4] || (_[4] = (b) => g())
                }, {
                  default: ce(() => [
                    Qe("Ok")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  onClick: _[5] || (_[5] = (b) => p())
                }, {
                  default: ce(() => [
                    Qe("Close")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        y(sa, {
          modelValue: u.value,
          "onUpdate:modelValue": _[6] || (_[6] = (b) => u.value = b),
          color: "error",
          variant: "tonal"
        }, {
          default: ce(() => [
            y(kt, { align: "center" }, {
              default: ce(() => [
                y(ze, {
                  icon: "$error",
                  class: "ml-2"
                }),
                y(Gr, null, {
                  default: ce(() => [
                    Ae("h4", null, ht(c.value), 1),
                    Ae("p", null, ht(d.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        y(sa, {
          modelValue: a.value,
          "onUpdate:modelValue": _[7] || (_[7] = (b) => a.value = b),
          timeout: 1500
        }, {
          default: ce(() => [
            y(ze, {
              color: "secondary",
              icon: "$success"
            }),
            Qe(" Copied successful.")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), $b = ".heading{margin-top:10px;margin-bottom:10px}", xu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Nb = /* @__PURE__ */ xu(Ab, [["styles", [$b]]]), Rb = Z({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...ke(),
  ...Zt(),
  ...We(),
  ...Ze()
}, "VTable"), Ob = de()({
  name: "VTable",
  props: Rb(),
  setup(e, t) {
    let {
      slots: n,
      emit: r
    } = t;
    const {
      themeClasses: o
    } = rt(e), {
      densityClasses: i
    } = vn(e);
    return ve(() => y(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover
      }, o.value, i.value, e.class],
      style: e.style
    }, {
      default: () => {
        var l, s, a;
        return [(l = n.top) == null ? void 0 : l.call(n), n.default ? y("div", {
          class: "v-table__wrapper",
          style: {
            height: pe(e.height)
          }
        }, [y("table", null, [n.default()])]) : (s = n.wrapper) == null ? void 0 : s.call(n), (a = n.bottom) == null ? void 0 : a.call(n)];
      }
    })), {};
  }
}), Bb = { class: "text-left" }, Fb = { class: "text-left" }, Db = { class: "text-left" }, Yv = /* @__PURE__ */ Mr({
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
    ], r = [
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
    ], o = ["Action", "Desktop", "Mobile"];
    return (i, l) => (vt(), ln(Ob, {
      density: "comfortable",
      "fixed-header": ""
    }, {
      default: ce(() => [
        He(Ae("thead", null, [
          Ae("tr", null, [
            Ae("th", Bb, ht(o[0]), 1),
            Ae("th", Fb, ht(o[1]), 1),
            Ae("th", Db, ht(o[2]), 1)
          ])
        ], 512), [
          [bt, t.showHeader]
        ]),
        Ae("tbody", null, [
          (vt(), el(Le, null, tc(n, (s) => He(Ae("tr", {
            key: s.action
          }, [
            Ae("td", null, ht(s.action), 1),
            Ae("td", null, ht(s.desktop), 1),
            Ae("td", null, ht(s.mobile), 1)
          ]), [
            [bt, t.showControlsGraph]
          ])), 64)),
          (vt(), el(Le, null, tc(r, (s) => He(Ae("tr", {
            key: s.action
          }, [
            Ae("td", null, ht(s.action), 1),
            Ae("td", null, ht(s.desktop), 1),
            Ae("td", null, ht(s.mobile), 1)
          ]), [
            [bt, t.showControlsEnvironment]
          ])), 64))
        ])
      ]),
      _: 1
    }));
  }
}), Hb = /* @__PURE__ */ Mr({
  __name: "GraphHelp",
  setup(e) {
    const t = te(!1);
    return (n, r) => (vt(), ln(vu, {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (o) => t.value = o),
      "max-width": "800px"
    }, {
      activator: ce(({ props: o }) => [
        y(Zr, {
          location: "bottom",
          "open-delay": 750,
          text: "Help"
        }, {
          activator: ce(({ props: i }) => [
            y(ut, he({
              "aria-label": "Help",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              icon: "$help",
              elevation: "6"
            }, { ...o, ...i }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(() => [
        y(cu, null, {
          default: ce(() => [
            y(Wo, { class: "card-header" }, {
              default: ce(() => [
                Qe("Controls")
              ]),
              _: 1
            }),
            y(Yv, {
              "show-controls-environment": "",
              "show-header": "",
              "show-controls-graph": "",
              "show-latex-info": ""
            }),
            y(Zl, null, {
              default: ce(() => [
                y(ml),
                y(ut, {
                  "aria-label": "Close",
                  color: "secondary",
                  density: "compact",
                  variant: "text",
                  onClick: r[0] || (r[0] = (o) => t.value = !1)
                }, {
                  default: ce(() => [
                    Qe(" Close ")
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
}), jb = ".v-data-table-header-mobile tr:first-child th[data-v-0a71b4f5]{height:0!important}", zb = /* @__PURE__ */ xu(Hb, [["styles", [jb]], ["__scopeId", "data-v-0a71b4f5"]]), Kv = Z({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Me,
    default: "$checkboxIndeterminate"
  },
  ...ts({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), ua = de()({
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
    const r = Ne(e, "indeterminate"), o = Ne(e, "modelValue");
    function i(a) {
      r.value && (r.value = !1);
    }
    const l = C(() => r.value ? e.indeterminateIcon : e.falseIcon), s = C(() => r.value ? e.indeterminateIcon : e.trueIcon);
    return ve(() => {
      const a = Xt(io.filterProps(e), ["modelValue"]);
      return y(io, he(a, {
        modelValue: o.value,
        "onUpdate:modelValue": [(u) => o.value = u, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: l.value,
        trueIcon: s.value,
        "aria-checked": r.value ? "mixed" : void 0
      }), n);
    }), {};
  }
}), Gb = Z({
  ...Or(),
  ...Xt(Kv(), ["inline"])
}, "VCheckbox"), Ub = de()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Gb(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r
    } = t;
    const o = Ne(e, "modelValue"), {
      isFocused: i,
      focus: l,
      blur: s
    } = vo(e), a = Lt(), u = C(() => e.id || `checkbox-${a}`);
    return ve(() => {
      const [c, d] = uo(n), f = Kt.filterProps(e), h = ua.filterProps(e);
      return y(Kt, he({
        class: ["v-checkbox", e.class]
      }, c, f, {
        modelValue: o.value,
        "onUpdate:modelValue": (v) => o.value = v,
        id: u.value,
        focused: i.value,
        style: e.style
      }), {
        ...r,
        default: (v) => {
          let {
            id: g,
            messagesId: p,
            isDisabled: m,
            isReadonly: w,
            isValid: _
          } = v;
          return y(ua, he(h, {
            id: g.value,
            "aria-describedby": p.value,
            disabled: m.value,
            readonly: w.value
          }, d, {
            error: _.value === !1,
            modelValue: o.value,
            "onUpdate:modelValue": (b) => o.value = b,
            onFocus: l,
            onBlur: s
          }), r);
        }
      });
    }), {};
  }
}), Wb = Z({
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
}, "VColorPickerCanvas"), qb = hn({
  name: "VColorPickerCanvas",
  props: Wb(),
  emits: {
    "update:color": (e) => !0,
    "update:position": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const r = be(!1), o = te(), i = be(parseFloat(e.width)), l = be(parseFloat(e.height)), s = te({
      x: 0,
      y: 0
    }), a = C({
      get: () => s.value,
      set(p) {
        var _, b;
        if (!o.value) return;
        const {
          x: m,
          y: w
        } = p;
        s.value = p, n("update:color", {
          h: ((_ = e.color) == null ? void 0 : _.h) ?? 0,
          s: Bt(m, 0, i.value) / i.value,
          v: 1 - Bt(w, 0, l.value) / l.value,
          a: ((b = e.color) == null ? void 0 : b.a) ?? 1
        });
      }
    }), u = C(() => {
      const {
        x: p,
        y: m
      } = a.value, w = parseInt(e.dotSize, 10) / 2;
      return {
        width: pe(e.dotSize),
        height: pe(e.dotSize),
        transform: `translate(${pe(p - w)}, ${pe(m - w)})`
      };
    }), {
      resizeRef: c
    } = oo((p) => {
      var _;
      if (!((_ = c.value) != null && _.offsetParent)) return;
      const {
        width: m,
        height: w
      } = p[0].contentRect;
      i.value = m, l.value = w;
    });
    function d(p, m, w) {
      const {
        left: _,
        top: b,
        width: x,
        height: E
      } = w;
      a.value = {
        x: Bt(p - _, 0, x),
        y: Bt(m - b, 0, E)
      };
    }
    function f(p) {
      p.type === "mousedown" && p.preventDefault(), !e.disabled && (h(p), window.addEventListener("mousemove", h), window.addEventListener("mouseup", v), window.addEventListener("touchmove", h), window.addEventListener("touchend", v));
    }
    function h(p) {
      if (e.disabled || !o.value) return;
      r.value = !0;
      const m = B0(p);
      d(m.clientX, m.clientY, o.value.getBoundingClientRect());
    }
    function v() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", v);
    }
    function g() {
      var b;
      if (!o.value) return;
      const p = o.value, m = p.getContext("2d");
      if (!m) return;
      const w = m.createLinearGradient(0, 0, p.width, 0);
      w.addColorStop(0, "hsla(0, 0%, 100%, 1)"), w.addColorStop(1, `hsla(${((b = e.color) == null ? void 0 : b.h) ?? 0}, 100%, 50%, 1)`), m.fillStyle = w, m.fillRect(0, 0, p.width, p.height);
      const _ = m.createLinearGradient(0, 0, 0, p.height);
      _.addColorStop(0, "hsla(0, 0%, 0%, 0)"), _.addColorStop(1, "hsla(0, 0%, 0%, 1)"), m.fillStyle = _, m.fillRect(0, 0, p.width, p.height);
    }
    return we(() => {
      var p;
      return (p = e.color) == null ? void 0 : p.h;
    }, g, {
      immediate: !0
    }), we(() => [i.value, l.value], (p, m) => {
      g(), s.value = {
        x: a.value.x * p[0] / m[0],
        y: a.value.y * p[1] / m[1]
      };
    }, {
      flush: "post"
    }), we(() => e.color, () => {
      if (r.value) {
        r.value = !1;
        return;
      }
      s.value = e.color ? {
        x: e.color.s * i.value,
        y: (1 - e.color.v) * l.value
      } : {
        x: 0,
        y: 0
      };
    }, {
      deep: !0,
      immediate: !0
    }), fn(() => g()), ve(() => y("div", {
      ref: c,
      class: ["v-color-picker-canvas", e.class],
      style: e.style,
      onMousedown: f,
      onTouchstartPassive: f
    }, [y("canvas", {
      ref: o,
      width: i.value,
      height: l.value
    }, null), e.color && y("div", {
      class: ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": e.disabled
      }],
      style: u.value
    }, null)])), {};
  }
});
function Yb(e, t) {
  if (t) {
    const {
      a: n,
      ...r
    } = e;
    return r;
  }
  return e;
}
function Kb(e, t) {
  if (t == null || typeof t == "string") {
    const n = Hh(e);
    return e.a === 1 ? n.slice(0, 7) : n;
  }
  if (typeof t == "object") {
    let n;
    return pr(t, ["r", "g", "b"]) ? n = On(e) : pr(t, ["h", "s", "l"]) ? n = Nh(e) : pr(t, ["h", "s", "v"]) && (n = e), Yb(n, !pr(t, ["a"]) && e.a === 1);
  }
  return e;
}
const Ur = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
}, ca = {
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
  from: Hl
};
var fd;
const Xb = {
  ...ca,
  inputs: (fd = ca.inputs) == null ? void 0 : fd.slice(0, 3)
}, fa = {
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
  from: ru
}, Zb = {
  ...fa,
  inputs: fa.inputs.slice(0, 3)
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
}, Jb = {
  ...Xv,
  inputs: [{
    label: "HEX",
    getValue: (e) => e.slice(0, 7),
    getColor: (e, t) => t
  }]
}, Sr = {
  rgb: Xb,
  rgba: ca,
  hsl: Zb,
  hsla: fa,
  hex: Jb,
  hexa: Xv
}, Qb = (e) => {
  let {
    label: t,
    ...n
  } = e;
  return y("div", {
    class: "v-color-picker-edit__input"
  }, [y("input", n, null), y("span", null, [t])]);
}, ew = Z({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: "rgba",
    validator: (e) => Object.keys(Sr).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(Sr),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Sr).includes(t))
  },
  ...ke()
}, "VColorPickerEdit"), tw = hn({
  name: "VColorPickerEdit",
  props: ew(),
  emits: {
    "update:color": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const r = C(() => e.modes.map((i) => ({
      ...Sr[i],
      name: i
    }))), o = C(() => {
      var s;
      const i = r.value.find((a) => a.name === e.mode);
      if (!i) return [];
      const l = e.color ? i.to(e.color) : null;
      return (s = i.inputs) == null ? void 0 : s.map((a) => {
        let {
          getValue: u,
          getColor: c,
          ...d
        } = a;
        return {
          ...i.inputProps,
          ...d,
          disabled: e.disabled,
          value: l && u(l),
          onChange: (f) => {
            const h = f.target;
            h && n("update:color", i.from(c(l ?? i.to(Ur), h.value)));
          }
        };
      });
    });
    return ve(() => {
      var i;
      return y("div", {
        class: ["v-color-picker-edit", e.class],
        style: e.style
      }, [(i = o.value) == null ? void 0 : i.map((l) => y(Qb, l, null)), r.value.length > 1 && y(ut, {
        icon: "$unfold",
        size: "x-small",
        variant: "plain",
        onClick: () => {
          const l = r.value.findIndex((s) => s.name === e.mode);
          n("update:mode", r.value[(l + 1) % r.value.length].name);
        }
      }, null)]);
    }), {};
  }
}), ku = Symbol.for("vuetify:v-slider");
function nw(e, t, n) {
  const r = n === "vertical", o = t.getBoundingClientRect(), i = "touches" in e ? e.touches[0] : e;
  return r ? i.clientY - (o.top + o.height / 2) : i.clientX - (o.left + o.width / 2);
}
function rw(e, t) {
  return "touches" in e && e.touches.length ? e.touches[0][t] : "changedTouches" in e && e.changedTouches.length ? e.changedTouches[0][t] : e[t];
}
const ow = Z({
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
  ...jn({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: !0
  }
}, "Slider"), iw = (e) => {
  const t = C(() => parseFloat(e.min)), n = C(() => parseFloat(e.max)), r = C(() => +e.step > 0 ? parseFloat(e.step) : 0), o = C(() => Math.max($c(r.value), $c(t.value)));
  function i(l) {
    if (l = parseFloat(l), r.value <= 0) return l;
    const s = Bt(l, t.value, n.value), a = t.value % r.value, u = Math.round((s - a) / r.value) * r.value + a;
    return parseFloat(Math.min(u, n.value).toFixed(o.value));
  }
  return {
    min: t,
    max: n,
    step: r,
    decimals: o,
    roundValue: i
  };
}, lw = (e) => {
  let {
    props: t,
    steps: n,
    onSliderStart: r,
    onSliderMove: o,
    onSliderEnd: i,
    getActiveThumb: l
  } = e;
  const {
    isRtl: s
  } = gn(), a = ae(t, "reverse"), u = C(() => t.direction === "vertical"), c = C(() => u.value !== a.value), {
    min: d,
    max: f,
    step: h,
    decimals: v,
    roundValue: g
  } = n, p = C(() => parseInt(t.thumbSize, 10)), m = C(() => parseInt(t.tickSize, 10)), w = C(() => parseInt(t.trackSize, 10)), _ = C(() => (f.value - d.value) / h.value), b = ae(t, "disabled"), x = C(() => t.error || t.disabled ? void 0 : t.thumbColor ?? t.color), E = C(() => t.error || t.disabled ? void 0 : t.trackColor ?? t.color), S = C(() => t.error || t.disabled ? void 0 : t.trackFillColor ?? t.color), T = be(!1), A = be(0), R = te(), D = te();
  function L(J) {
    var U;
    const se = t.direction === "vertical", Ee = se ? "top" : "left", Fe = se ? "height" : "width", ot = se ? "clientY" : "clientX", {
      [Ee]: et,
      [Fe]: pn
    } = (U = R.value) == null ? void 0 : U.$el.getBoundingClientRect(), V = rw(J, ot);
    let $ = Math.min(Math.max((V - et - A.value) / pn, 0), 1) || 0;
    return (se ? c.value : c.value !== s.value) && ($ = 1 - $), g(d.value + $ * (f.value - d.value));
  }
  const I = (J) => {
    i({
      value: L(J)
    }), T.value = !1, A.value = 0;
  }, k = (J) => {
    D.value = l(J), D.value && (D.value.focus(), T.value = !0, D.value.contains(J.target) ? A.value = nw(J, D.value, t.direction) : (A.value = 0, o({
      value: L(J)
    })), r({
      value: L(J)
    }));
  }, O = {
    passive: !0,
    capture: !0
  };
  function M(J) {
    o({
      value: L(J)
    });
  }
  function j(J) {
    J.stopPropagation(), J.preventDefault(), I(J), window.removeEventListener("mousemove", M, O), window.removeEventListener("mouseup", j);
  }
  function N(J) {
    var se;
    I(J), window.removeEventListener("touchmove", M, O), (se = J.target) == null || se.removeEventListener("touchend", N);
  }
  function F(J) {
    var se;
    k(J), window.addEventListener("touchmove", M, O), (se = J.target) == null || se.addEventListener("touchend", N, {
      passive: !1
    });
  }
  function B(J) {
    J.preventDefault(), k(J), window.addEventListener("mousemove", M, O), window.addEventListener("mouseup", j, {
      passive: !1
    });
  }
  const H = (J) => {
    const se = (J - d.value) / (f.value - d.value) * 100;
    return Bt(isNaN(se) ? 0 : se, 0, 100);
  }, Y = ae(t, "showTicks"), ee = C(() => Y.value ? t.ticks ? Array.isArray(t.ticks) ? t.ticks.map((J) => ({
    value: J,
    position: H(J),
    label: J.toString()
  })) : Object.keys(t.ticks).map((J) => ({
    value: parseFloat(J),
    position: H(parseFloat(J)),
    label: t.ticks[J]
  })) : _.value !== 1 / 0 ? Ja(_.value + 1).map((J) => {
    const se = d.value + J * h.value;
    return {
      value: se,
      position: H(se)
    };
  }) : [] : []), le = C(() => ee.value.some((J) => {
    let {
      label: se
    } = J;
    return !!se;
  })), fe = {
    activeThumbRef: D,
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
    onSliderMousedown: B,
    onSliderTouchstart: F,
    parsedTicks: ee,
    parseMouseMove: L,
    position: H,
    readonly: ae(t, "readonly"),
    rounded: ae(t, "rounded"),
    roundValue: g,
    showTicks: Y,
    startOffset: A,
    step: h,
    thumbSize: p,
    thumbColor: x,
    thumbLabel: ae(t, "thumbLabel"),
    ticks: ae(t, "ticks"),
    tickSize: m,
    trackColor: E,
    trackContainerRef: R,
    trackFillColor: S,
    trackSize: w,
    vertical: u
  };
  return ct(ku, fe), fe;
}, sw = Z({
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
}, "VSliderThumb"), aw = de()({
  name: "VSliderThumb",
  directives: {
    Ripple: Rr
  },
  props: sw(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: r
    } = t;
    const o = je(ku), {
      isRtl: i,
      rtlClasses: l
    } = gn();
    if (!o) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor: s,
      step: a,
      disabled: u,
      thumbSize: c,
      thumbLabel: d,
      direction: f,
      isReversed: h,
      vertical: v,
      readonly: g,
      elevation: p,
      mousePressed: m,
      decimals: w,
      indexFromEnd: _
    } = o, b = C(() => u.value ? void 0 : p.value), {
      elevationClasses: x
    } = zn(b), {
      textColorClasses: E,
      textColorStyles: S
    } = an(s), {
      pageup: T,
      pagedown: A,
      end: R,
      home: D,
      left: L,
      right: I,
      down: k,
      up: O
    } = $0, M = [T, A, R, D, L, I, k, O], j = C(() => a.value ? [1, 2, 3] : [1, 5, 10]);
    function N(B, H) {
      if (!M.includes(B.key)) return;
      B.preventDefault();
      const Y = a.value || 0.1, ee = (e.max - e.min) / Y;
      if ([L, I, k, O].includes(B.key)) {
        const fe = (v.value ? [i.value ? L : I, h.value ? k : O] : _.value !== i.value ? [L, O] : [I, O]).includes(B.key) ? 1 : -1, J = B.shiftKey ? 2 : B.ctrlKey ? 1 : 0;
        H = H + fe * Y * j.value[J];
      } else if (B.key === D)
        H = e.min;
      else if (B.key === R)
        H = e.max;
      else {
        const le = B.key === A ? 1 : -1;
        H = H - le * Y * (ee > 100 ? ee / 10 : 10);
      }
      return Math.max(e.min, Math.min(e.max, H));
    }
    function F(B) {
      const H = N(B, e.modelValue);
      H != null && r("update:modelValue", H);
    }
    return ve(() => {
      const B = pe(_.value ? 100 - e.position : e.position, "%");
      return y("div", {
        class: ["v-slider-thumb", {
          "v-slider-thumb--focused": e.focused,
          "v-slider-thumb--pressed": e.focused && m.value
        }, e.class, l.value],
        style: [{
          "--v-slider-thumb-position": B,
          "--v-slider-thumb-size": pe(c.value)
        }, e.style],
        role: "slider",
        tabindex: u.value ? -1 : 0,
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.modelValue,
        "aria-readonly": !!g.value,
        "aria-orientation": f.value,
        onKeydown: g.value ? void 0 : F
      }, [y("div", {
        class: ["v-slider-thumb__surface", E.value, x.value],
        style: {
          ...S.value
        }
      }, null), He(y("div", {
        class: ["v-slider-thumb__ripple", E.value],
        style: S.value
      }, null), [[cn("ripple"), e.ripple, null, {
        circle: !0,
        center: !0
      }]]), y(pv, {
        origin: "bottom center"
      }, {
        default: () => {
          var H;
          return [He(y("div", {
            class: "v-slider-thumb__label-container"
          }, [y("div", {
            class: ["v-slider-thumb__label"]
          }, [y("div", null, [((H = n["thumb-label"]) == null ? void 0 : H.call(n, {
            modelValue: e.modelValue
          })) ?? e.modelValue.toFixed(a.value ? w.value : 1)])])]), [[bt, d.value && e.focused || d.value === "always"]])];
        }
      })]);
    }), {};
  }
}), uw = Z({
  start: {
    type: Number,
    required: !0
  },
  stop: {
    type: Number,
    required: !0
  },
  ...ke()
}, "VSliderTrack"), cw = de()({
  name: "VSliderTrack",
  props: uw(),
  emits: {},
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = je(ku);
    if (!r) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color: o,
      parsedTicks: i,
      rounded: l,
      showTicks: s,
      tickSize: a,
      trackColor: u,
      trackFillColor: c,
      trackSize: d,
      vertical: f,
      min: h,
      max: v,
      indexFromEnd: g
    } = r, {
      roundedClasses: p
    } = It(l), {
      backgroundColorClasses: m,
      backgroundColorStyles: w
    } = Dt(c), {
      backgroundColorClasses: _,
      backgroundColorStyles: b
    } = Dt(u), x = C(() => `inset-${f.value ? "block" : "inline"}-${g.value ? "end" : "start"}`), E = C(() => f.value ? "height" : "width"), S = C(() => ({
      [x.value]: "0%",
      [E.value]: "100%"
    })), T = C(() => e.stop - e.start), A = C(() => ({
      [x.value]: pe(e.start, "%"),
      [E.value]: pe(T.value, "%")
    })), R = C(() => s.value ? (f.value ? i.value.slice().reverse() : i.value).map((L, I) => {
      var O;
      const k = L.value !== h.value && L.value !== v.value ? pe(L.position, "%") : void 0;
      return y("div", {
        key: L.value,
        class: ["v-slider-track__tick", {
          "v-slider-track__tick--filled": L.position >= e.start && L.position <= e.stop,
          "v-slider-track__tick--first": L.value === h.value,
          "v-slider-track__tick--last": L.value === v.value
        }],
        style: {
          [x.value]: k
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
        "--v-slider-track-size": pe(d.value),
        "--v-slider-tick-size": pe(a.value)
      }, e.style]
    }, [y("div", {
      class: ["v-slider-track__background", _.value, {
        "v-slider-track__background--opacity": !!o.value || !c.value
      }],
      style: {
        ...S.value,
        ...b.value
      }
    }, null), y("div", {
      class: ["v-slider-track__fill", m.value],
      style: {
        ...A.value,
        ...w.value
      }
    }, null), s.value && y("div", {
      class: ["v-slider-track__ticks", {
        "v-slider-track__ticks--always-show": s.value === "always"
      }]
    }, [R.value])])), {};
  }
}), fw = Z({
  ...mu(),
  ...ow(),
  ...Or(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider"), Lf = de()({
  name: "VSlider",
  props: fw(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    start: (e) => !0,
    end: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: r
    } = t;
    const o = te(), {
      rtlClasses: i
    } = gn(), l = iw(e), s = Ne(e, "modelValue", void 0, (E) => l.roundValue(E ?? l.min.value)), {
      min: a,
      max: u,
      mousePressed: c,
      roundValue: d,
      onSliderMousedown: f,
      onSliderTouchstart: h,
      trackContainerRef: v,
      position: g,
      hasLabels: p,
      readonly: m
    } = lw({
      props: e,
      steps: l,
      onSliderStart: () => {
        r("start", s.value);
      },
      onSliderEnd: (E) => {
        let {
          value: S
        } = E;
        const T = d(S);
        s.value = T, r("end", T);
      },
      onSliderMove: (E) => {
        let {
          value: S
        } = E;
        return s.value = d(S);
      },
      getActiveThumb: () => {
        var E;
        return (E = o.value) == null ? void 0 : E.$el;
      }
    }), {
      isFocused: w,
      focus: _,
      blur: b
    } = vo(e), x = C(() => g(s.value));
    return ve(() => {
      const E = Kt.filterProps(e), S = !!(e.label || n.label || n.prepend);
      return y(Kt, he({
        class: ["v-slider", {
          "v-slider--has-labels": !!n["tick-label"] || p.value,
          "v-slider--focused": w.value,
          "v-slider--pressed": c.value,
          "v-slider--disabled": e.disabled
        }, i.value, e.class],
        style: e.style
      }, E, {
        focused: w.value
      }), {
        ...n,
        prepend: S ? (T) => {
          var A, R;
          return y(Le, null, [((A = n.label) == null ? void 0 : A.call(n, T)) ?? (e.label ? y(es, {
            id: T.id.value,
            class: "v-slider__label",
            text: e.label
          }, null) : void 0), (R = n.prepend) == null ? void 0 : R.call(n, T)]);
        } : void 0,
        default: (T) => {
          let {
            id: A,
            messagesId: R
          } = T;
          return y("div", {
            class: "v-slider__container",
            onMousedown: m.value ? void 0 : f,
            onTouchstartPassive: m.value ? void 0 : h
          }, [y("input", {
            id: A.value,
            name: e.name || A.value,
            disabled: !!e.disabled,
            readonly: !!e.readonly,
            tabindex: "-1",
            value: s.value
          }, null), y(cw, {
            ref: v,
            start: 0,
            stop: x.value
          }, {
            "tick-label": n["tick-label"]
          }), y(aw, {
            ref: o,
            "aria-describedby": R.value,
            focused: w.value,
            min: a.value,
            max: u.value,
            modelValue: s.value,
            "onUpdate:modelValue": (D) => s.value = D,
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
}), dw = Z({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  ...ke()
}, "VColorPickerPreview"), hw = hn({
  name: "VColorPickerPreview",
  props: dw(),
  emits: {
    "update:color": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n
    } = t;
    const r = new AbortController();
    Rl(() => r.abort());
    async function o() {
      if (!Tc) return;
      const i = new window.EyeDropper();
      try {
        const l = await i.open({
          signal: r.signal
        }), s = Dh(l.sRGBHex);
        n("update:color", {
          ...e.color ?? Ur,
          ...s
        });
      } catch {
      }
    }
    return ve(() => {
      var i, l;
      return y("div", {
        class: ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": e.hideAlpha
        }, e.class],
        style: e.style
      }, [Tc && y("div", {
        class: "v-color-picker-preview__eye-dropper",
        key: "eyeDropper"
      }, [y(ut, {
        onClick: o,
        icon: "$eyeDropper",
        variant: "plain",
        density: "comfortable"
      }, null)]), y("div", {
        class: "v-color-picker-preview__dot"
      }, [y("div", {
        style: {
          background: Oh(e.color ?? Ur)
        }
      }, null)]), y("div", {
        class: "v-color-picker-preview__sliders"
      }, [y(Lf, {
        class: "v-color-picker-preview__track v-color-picker-preview__hue",
        modelValue: (i = e.color) == null ? void 0 : i.h,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ur,
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
      }, null), !e.hideAlpha && y(Lf, {
        class: "v-color-picker-preview__track v-color-picker-preview__alpha",
        modelValue: ((l = e.color) == null ? void 0 : l.a) ?? 1,
        "onUpdate:modelValue": (s) => n("update:color", {
          ...e.color ?? Ur,
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
}), vw = {
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
}, gw = {
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
}, mw = {
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
}, pw = {
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
}, yw = {
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
}, bw = {
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
}, ww = {
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
}, _w = {
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
}, xw = {
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
}, kw = {
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
}, Sw = {
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
}, Cw = {
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
}, Ew = {
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
}, Vw = {
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
}, Lw = {
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
}, Pw = {
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
}, Iw = {
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
}, Tw = {
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
}, Mw = {
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
}, Aw = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
}, $w = {
  red: vw,
  pink: gw,
  purple: mw,
  deepPurple: pw,
  indigo: yw,
  blue: bw,
  lightBlue: ww,
  cyan: _w,
  teal: xw,
  green: kw,
  lightGreen: Sw,
  lime: Cw,
  yellow: Ew,
  amber: Vw,
  orange: Lw,
  deepOrange: Pw,
  brown: Iw,
  blueGrey: Tw,
  grey: Mw,
  shades: Aw
}, Nw = Z({
  swatches: {
    type: Array,
    default: () => Rw($w)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...ke()
}, "VColorPickerSwatches");
function Rw(e) {
  return Object.keys(e).map((t) => {
    const n = e[t];
    return n.base ? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5] : [n.black, n.white, n.transparent];
  });
}
const Ow = hn({
  name: "VColorPickerSwatches",
  props: Nw(),
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
        maxHeight: pe(e.maxHeight)
      }, e.style]
    }, [y("div", null, [e.swatches.map((r) => y("div", {
      class: "v-color-picker-swatches__swatch"
    }, [r.map((o) => {
      const i = Wt(o), l = Hl(i), s = Rh(i);
      return y("div", {
        class: "v-color-picker-swatches__color",
        onClick: () => l && n("update:color", l)
      }, [y("div", {
        style: {
          background: s
        }
      }, [e.color && Ar(e.color, l) ? y(ze, {
        size: "x-small",
        icon: "$success",
        color: uy(o, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])])), {};
  }
}), Zv = Z({
  color: String,
  ...$r(),
  ...ke(),
  ...or(),
  ...jn(),
  ...ai(),
  ...ql(),
  ...Pt(),
  ...We(),
  ...Ze()
}, "VSheet"), Pf = de()({
  name: "VSheet",
  props: Zv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      backgroundColorClasses: o,
      backgroundColorStyles: i
    } = Dt(ae(e, "color")), {
      borderClasses: l
    } = Nr(e), {
      dimensionStyles: s
    } = ir(e), {
      elevationClasses: a
    } = zn(e), {
      locationStyles: u
    } = ui(e), {
      positionClasses: c
    } = Yl(e), {
      roundedClasses: d
    } = It(e);
    return ve(() => y(e.tag, {
      class: ["v-sheet", r.value, o.value, l.value, a.value, c.value, d.value, e.class],
      style: [i.value, s.value, u.value, e.style]
    }, n)), {};
  }
}), Bw = Z({
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
    validator: (e) => Object.keys(Sr).includes(e)
  },
  modes: {
    type: Array,
    default: () => Object.keys(Sr),
    validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Sr).includes(t))
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
  ...Xt(Zv({
    width: 300
  }), ["height", "location", "minHeight", "maxHeight", "minWidth", "maxWidth"])
}, "VColorPicker"), hV = hn({
  name: "VColorPicker",
  props: Bw(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:mode": (e) => !0
  },
  setup(e) {
    const t = Ne(e, "mode"), n = te(null), r = Ne(e, "modelValue", void 0, (a) => {
      if (a == null || a === "") return null;
      let u;
      try {
        u = Hl(Wt(a));
      } catch {
        return null;
      }
      return u;
    }, (a) => a ? Kb(a, e.modelValue) : null), o = C(() => r.value ? {
      ...r.value,
      h: n.value ?? r.value.h
    } : null), {
      rtlClasses: i
    } = gn();
    let l = !0;
    we(r, (a) => {
      if (!l) {
        l = !0;
        return;
      }
      a && (n.value = a.h);
    }, {
      immediate: !0
    });
    const s = (a) => {
      l = !1, n.value = a.h, r.value = a;
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
      const a = Pf.filterProps(e);
      return y(Pf, he({
        rounded: e.rounded,
        elevation: e.elevation,
        theme: e.theme,
        class: ["v-color-picker", i.value, e.class],
        style: [{
          "--v-color-picker-color-hsv": Oh({
            ...o.value ?? Ur,
            a: 1
          })
        }, e.style]
      }, a, {
        maxWidth: e.width
      }), {
        default: () => [!e.hideCanvas && y(qb, {
          key: "canvas",
          color: o.value,
          "onUpdate:color": s,
          disabled: e.disabled,
          dotSize: e.dotSize,
          width: e.width,
          height: e.canvasHeight
        }, null), (!e.hideSliders || !e.hideInputs) && y("div", {
          key: "controls",
          class: "v-color-picker__controls"
        }, [!e.hideSliders && y(hw, {
          key: "preview",
          color: o.value,
          "onUpdate:color": s,
          hideAlpha: !t.value.endsWith("a"),
          disabled: e.disabled
        }, null), !e.hideInputs && y(tw, {
          key: "edit",
          modes: e.modes,
          mode: t.value,
          "onUpdate:mode": (u) => t.value = u,
          color: o.value,
          "onUpdate:color": s,
          disabled: e.disabled
        }, null)]), e.showSwatches && y(Ow, {
          key: "swatches",
          color: o.value,
          "onUpdate:color": s,
          maxHeight: e.swatchesMaxHeight,
          swatches: e.swatches,
          disabled: e.disabled
        }, null)]
      });
    }), {};
  }
}), qo = Symbol.for("vuetify:v-expansion-panel"), Fw = ["default", "accordion", "inset", "popout"], Dw = Z({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (e) => Fw.includes(e)
  },
  readonly: Boolean,
  ...ke(),
  ...jl(),
  ...We(),
  ...Ze()
}, "VExpansionPanels"), If = de()({
  name: "VExpansionPanels",
  props: Dw(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    oi(e, qo);
    const {
      themeClasses: r
    } = rt(e), o = C(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
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
      }, r.value, o.value, e.class],
      style: e.style
    }, n)), {};
  }
}), Hw = Z({
  ...ke(),
  ...Ql()
}, "VExpansionPanelText"), jw = de()({
  name: "VExpansionPanelText",
  props: Hw(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = je(qo);
    if (!r) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent: o,
      onAfterLeave: i
    } = hu(e, r.isSelected);
    return ve(() => y(bv, {
      onAfterLeave: i
    }, {
      default: () => {
        var l;
        return [He(y("div", {
          class: ["v-expansion-panel-text", e.class],
          style: e.style
        }, [n.default && o.value && y("div", {
          class: "v-expansion-panel-text__wrapper"
        }, [(l = n.default) == null ? void 0 : l.call(n)])]), [[bt, r.isSelected.value]])];
      }
    })), {};
  }
}), Jv = Z({
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
}, "VExpansionPanelTitle"), zw = de()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple: Rr
  },
  props: Jv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = je(qo);
    if (!r) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses: o,
      backgroundColorStyles: i
    } = Dt(e, "color"), l = C(() => ({
      collapseIcon: e.collapseIcon,
      disabled: r.disabled.value,
      expanded: r.isSelected.value,
      expandIcon: e.expandIcon,
      readonly: e.readonly
    }));
    return ve(() => {
      var s;
      return He(y("button", {
        class: ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": r.isSelected.value,
          "v-expansion-panel-title--focusable": e.focusable,
          "v-expansion-panel-title--static": e.static
        }, o.value, e.class],
        style: [i.value, e.style],
        type: "button",
        tabindex: r.disabled.value ? -1 : void 0,
        disabled: r.disabled.value,
        "aria-expanded": r.isSelected.value,
        onClick: e.readonly ? void 0 : r.toggle
      }, [y("span", {
        class: "v-expansion-panel-title__overlay"
      }, null), (s = n.default) == null ? void 0 : s.call(n, l.value), !e.hideActions && y("span", {
        class: "v-expansion-panel-title__icon"
      }, [n.actions ? n.actions(l.value) : y(ze, {
        icon: r.isSelected.value ? e.collapseIcon : e.expandIcon
      }, null)])]), [[cn("ripple"), e.ripple]]);
    }), {};
  }
}), Gw = Z({
  title: String,
  text: String,
  bgColor: String,
  ...ke(),
  ...jn(),
  ...zl(),
  ...Ql(),
  ...Pt(),
  ...We(),
  ...Jv()
}, "VExpansionPanel"), vV = de()({
  name: "VExpansionPanel",
  props: Gw(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Gl(e, qo), {
      backgroundColorClasses: o,
      backgroundColorStyles: i
    } = Dt(e, "bgColor"), {
      elevationClasses: l
    } = zn(e), {
      roundedClasses: s
    } = It(e), a = C(() => (r == null ? void 0 : r.disabled.value) || e.disabled), u = C(() => r.group.items.value.reduce((f, h, v) => (r.group.selected.value.includes(h.id) && f.push(v), f), [])), c = C(() => {
      const f = r.group.items.value.findIndex((h) => h.id === r.id);
      return !r.isSelected.value && u.value.some((h) => h - f === 1);
    }), d = C(() => {
      const f = r.group.items.value.findIndex((h) => h.id === r.id);
      return !r.isSelected.value && u.value.some((h) => h - f === -1);
    });
    return ct(qo, r), En({
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
          "v-expansion-panel--active": r.isSelected.value,
          "v-expansion-panel--before-active": c.value,
          "v-expansion-panel--after-active": d.value,
          "v-expansion-panel--disabled": a.value
        }, s.value, o.value, e.class],
        style: [i.value, e.style]
      }, {
        default: () => {
          var v;
          return [y("div", {
            class: ["v-expansion-panel__shadow", ...l.value]
          }, null), h && y(zw, {
            key: "title",
            collapseIcon: e.collapseIcon,
            color: e.color,
            expandIcon: e.expandIcon,
            hideActions: e.hideActions,
            ripple: e.ripple
          }, {
            default: () => [n.title ? n.title() : e.title]
          }), f && y(jw, {
            key: "text"
          }, {
            default: () => [n.text ? n.text() : e.text]
          }), (v = n.default) == null ? void 0 : v.call(n)];
        }
      });
    }), {};
  }
}), da = Symbol.for("vuetify:list");
function Qv() {
  const e = je(da, {
    hasPrepend: be(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: be(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return ct(da, t), e;
}
function eg() {
  return je(da, null);
}
const Su = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: r,
        value: o,
        activated: i
      } = n;
      return r = xe(r), e && !o && i.size === 1 && i.has(r) || (o ? i.add(r) : i.delete(r)), i;
    },
    in: (n, r, o) => {
      let i = /* @__PURE__ */ new Set();
      for (const l of n || [])
        i = t.activate({
          id: l,
          value: !0,
          activated: new Set(i),
          children: r,
          parents: o
        });
      return i;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, tg = (e) => {
  const t = Su(e);
  return {
    activate: (r) => {
      let {
        activated: o,
        id: i,
        ...l
      } = r;
      i = xe(i);
      const s = o.has(i) ? /* @__PURE__ */ new Set([i]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...l,
        id: i,
        activated: s
      });
    },
    in: (r, o, i) => {
      let l = /* @__PURE__ */ new Set();
      return r != null && r.length && (l = t.in(r.slice(0, 1), o, i)), l;
    },
    out: (r, o, i) => t.out(r, o, i)
  };
}, Uw = (e) => {
  const t = Su(e);
  return {
    activate: (r) => {
      let {
        id: o,
        activated: i,
        children: l,
        ...s
      } = r;
      return o = xe(o), l.has(o) ? i : t.activate({
        id: o,
        activated: i,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Ww = (e) => {
  const t = tg(e);
  return {
    activate: (r) => {
      let {
        id: o,
        activated: i,
        children: l,
        ...s
      } = r;
      return o = xe(o), l.has(o) ? i : t.activate({
        id: o,
        activated: i,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, qw = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: r,
      parents: o
    } = e;
    if (n) {
      const i = /* @__PURE__ */ new Set();
      i.add(t);
      let l = o.get(t);
      for (; l != null; )
        i.add(l), l = o.get(l);
      return i;
    } else
      return r.delete(t), r;
  },
  select: () => null
}, ng = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: r,
      parents: o
    } = e;
    if (n) {
      let i = o.get(t);
      for (r.add(t); i != null && i !== t; )
        r.add(i), i = o.get(i);
      return r;
    } else
      r.delete(t);
    return r;
  },
  select: () => null
}, Yw = {
  open: ng.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: r,
      parents: o
    } = e;
    if (!n) return r;
    const i = [];
    let l = o.get(t);
    for (; l != null; )
      i.push(l), l = o.get(l);
    return new Set(i);
  }
}, Cu = (e) => {
  const t = {
    select: (n) => {
      let {
        id: r,
        value: o,
        selected: i
      } = n;
      if (r = xe(r), e && !o) {
        const l = Array.from(i.entries()).reduce((s, a) => {
          let [u, c] = a;
          return c === "on" && s.push(u), s;
        }, []);
        if (l.length === 1 && l[0] === r) return i;
      }
      return i.set(r, o ? "on" : "off"), i;
    },
    in: (n, r, o) => {
      let i = /* @__PURE__ */ new Map();
      for (const l of n || [])
        i = t.select({
          id: l,
          value: !0,
          selected: new Map(i),
          children: r,
          parents: o
        });
      return i;
    },
    out: (n) => {
      const r = [];
      for (const [o, i] of n.entries())
        i === "on" && r.push(o);
      return r;
    }
  };
  return t;
}, rg = (e) => {
  const t = Cu(e);
  return {
    select: (r) => {
      let {
        selected: o,
        id: i,
        ...l
      } = r;
      i = xe(i);
      const s = o.has(i) ? /* @__PURE__ */ new Map([[i, o.get(i)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...l,
        id: i,
        selected: s
      });
    },
    in: (r, o, i) => {
      let l = /* @__PURE__ */ new Map();
      return r != null && r.length && (l = t.in(r.slice(0, 1), o, i)), l;
    },
    out: (r, o, i) => t.out(r, o, i)
  };
}, Kw = (e) => {
  const t = Cu(e);
  return {
    select: (r) => {
      let {
        id: o,
        selected: i,
        children: l,
        ...s
      } = r;
      return o = xe(o), l.has(o) ? i : t.select({
        id: o,
        selected: i,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Xw = (e) => {
  const t = rg(e);
  return {
    select: (r) => {
      let {
        id: o,
        selected: i,
        children: l,
        ...s
      } = r;
      return o = xe(o), l.has(o) ? i : t.select({
        id: o,
        selected: i,
        children: l,
        ...s
      });
    },
    in: t.in,
    out: t.out
  };
}, Zw = (e) => {
  const t = {
    select: (n) => {
      let {
        id: r,
        value: o,
        selected: i,
        children: l,
        parents: s
      } = n;
      r = xe(r);
      const a = new Map(i), u = [r];
      for (; u.length; ) {
        const d = u.shift();
        i.set(d, o ? "on" : "off"), l.has(d) && u.push(...l.get(d));
      }
      let c = s.get(r);
      for (; c; ) {
        const d = l.get(c), f = d.every((v) => i.get(v) === "on"), h = d.every((v) => !i.has(v) || i.get(v) === "off");
        i.set(c, f ? "on" : h ? "off" : "indeterminate"), c = s.get(c);
      }
      return e && !o && Array.from(i.entries()).reduce((f, h) => {
        let [v, g] = h;
        return g === "on" && f.push(v), f;
      }, []).length === 0 ? a : i;
    },
    in: (n, r, o) => {
      let i = /* @__PURE__ */ new Map();
      for (const l of n || [])
        i = t.select({
          id: l,
          value: !0,
          selected: new Map(i),
          children: r,
          parents: o
        });
      return i;
    },
    out: (n, r) => {
      const o = [];
      for (const [i, l] of n.entries())
        l === "on" && !r.has(i) && o.push(i);
      return o;
    }
  };
  return t;
}, Yo = Symbol.for("vuetify:nested"), og = {
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
}, Jw = Z({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function],
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  activated: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), Qw = (e) => {
  let t = !1;
  const n = te(/* @__PURE__ */ new Map()), r = te(/* @__PURE__ */ new Map()), o = Ne(e, "opened", e.opened, (h) => new Set(h), (h) => [...h.values()]), i = C(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    switch (e.activeStrategy) {
      case "leaf":
        return Uw(e.mandatory);
      case "single-leaf":
        return Ww(e.mandatory);
      case "independent":
        return Su(e.mandatory);
      case "single-independent":
      default:
        return tg(e.mandatory);
    }
  }), l = C(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return Xw(e.mandatory);
      case "leaf":
        return Kw(e.mandatory);
      case "independent":
        return Cu(e.mandatory);
      case "single-independent":
        return rg(e.mandatory);
      case "classic":
      default:
        return Zw(e.mandatory);
    }
  }), s = C(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Yw;
      case "single":
        return qw;
      case "multiple":
      default:
        return ng;
    }
  }), a = Ne(e, "activated", e.activated, (h) => i.value.in(h, n.value, r.value), (h) => i.value.out(h, n.value, r.value)), u = Ne(e, "selected", e.selected, (h) => l.value.in(h, n.value, r.value), (h) => l.value.out(h, n.value, r.value));
  dn(() => {
    t = !0;
  });
  function c(h) {
    const v = [];
    let g = h;
    for (; g != null; )
      v.unshift(g), g = r.value.get(g);
    return v;
  }
  const d = lt("nested"), f = {
    id: be(),
    root: {
      opened: o,
      activatable: ae(e, "activatable"),
      selectable: ae(e, "selectable"),
      activated: a,
      selected: u,
      selectedValues: C(() => {
        const h = [];
        for (const [v, g] of u.value.entries())
          g === "on" && h.push(v);
        return h;
      }),
      register: (h, v, g) => {
        v && h !== v && r.value.set(h, v), g && n.value.set(h, []), v != null && n.value.set(v, [...n.value.get(v) || [], h]);
      },
      unregister: (h) => {
        if (t) return;
        n.value.delete(h);
        const v = r.value.get(h);
        if (v) {
          const g = n.value.get(v) ?? [];
          n.value.set(v, g.filter((p) => p !== h));
        }
        r.value.delete(h), o.value.delete(h);
      },
      open: (h, v, g) => {
        d.emit("click:open", {
          id: h,
          value: v,
          path: c(h),
          event: g
        });
        const p = s.value.open({
          id: h,
          value: v,
          opened: new Set(o.value),
          children: n.value,
          parents: r.value,
          event: g
        });
        p && (o.value = p);
      },
      openOnSelect: (h, v, g) => {
        const p = s.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          opened: new Set(o.value),
          children: n.value,
          parents: r.value,
          event: g
        });
        p && (o.value = p);
      },
      select: (h, v, g) => {
        d.emit("click:select", {
          id: h,
          value: v,
          path: c(h),
          event: g
        });
        const p = l.value.select({
          id: h,
          value: v,
          selected: new Map(u.value),
          children: n.value,
          parents: r.value,
          event: g
        });
        p && (u.value = p), f.root.openOnSelect(h, v, g);
      },
      activate: (h, v, g) => {
        if (!e.activatable)
          return f.root.select(h, !0, g);
        d.emit("click:activate", {
          id: h,
          value: v,
          path: c(h),
          event: g
        });
        const p = i.value.activate({
          id: h,
          value: v,
          activated: new Set(a.value),
          children: n.value,
          parents: r.value,
          event: g
        });
        p && (a.value = p);
      },
      children: n,
      parents: r
    }
  };
  return ct(Yo, f), f.root;
}, ig = (e, t) => {
  const n = je(Yo, og), r = Symbol(Lt()), o = C(() => e.value !== void 0 ? e.value : r), i = {
    ...n,
    id: o,
    open: (l, s) => n.root.open(o.value, l, s),
    openOnSelect: (l, s) => n.root.openOnSelect(o.value, l, s),
    isOpen: C(() => n.root.opened.value.has(o.value)),
    parent: C(() => n.root.parents.value.get(o.value)),
    activate: (l, s) => n.root.activate(o.value, l, s),
    isActivated: C(() => n.root.activated.value.has(xe(o.value))),
    select: (l, s) => n.root.select(o.value, l, s),
    isSelected: C(() => n.root.selected.value.get(xe(o.value)) === "on"),
    isIndeterminate: C(() => n.root.selected.value.get(o.value) === "indeterminate"),
    isLeaf: C(() => !n.root.children.value.get(o.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(o.value, n.id.value, t), dn(() => {
    !n.isGroupActivator && n.root.unregister(o.value);
  }), t && ct(Yo, i), i;
}, e_ = () => {
  const e = je(Yo, og);
  ct(Yo, {
    ...e,
    isGroupActivator: !0
  });
}, t_ = hn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return e_(), () => {
      var r;
      return (r = n.default) == null ? void 0 : r.call(n);
    };
  }
}), n_ = Z({
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
  ...We()
}, "VListGroup"), Tf = de()({
  name: "VListGroup",
  props: n_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: r,
      open: o,
      id: i
    } = ig(ae(e, "value"), !0), l = C(() => `v-list-group--id-${String(i.value)}`), s = eg(), {
      isBooted: a
    } = qv();
    function u(h) {
      o(!r.value, h);
    }
    const c = C(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: l.value
    })), d = C(() => r.value ? e.collapseIcon : e.expandIcon), f = C(() => ({
      VListItem: {
        active: r.value,
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
        "v-list-group--open": r.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && y(nt, {
        defaults: f.value
      }, {
        default: () => [y(t_, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: r.value
          })]
        })]
      }), y(Mn, {
        transition: {
          component: bv
        },
        disabled: !a.value
      }, {
        default: () => {
          var h;
          return [He(y("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": l.value
          }, [(h = n.default) == null ? void 0 : h.call(n)]), [[bt, r.value]])];
        }
      })]
    })), {
      isOpen: r
    };
  }
}), r_ = co("v-list-item-subtitle"), o_ = co("v-list-item-title"), i_ = Z({
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
  ...$r(),
  ...ke(),
  ...Zt(),
  ...or(),
  ...jn(),
  ...Pt(),
  ...Xl(),
  ...We(),
  ...Ze(),
  ...Gn({
    variant: "text"
  })
}, "VListItem"), pl = de()({
  name: "VListItem",
  directives: {
    Ripple: Rr
  },
  props: i_(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: r,
      emit: o
    } = t;
    const i = Kl(e, n), l = C(() => e.value === void 0 ? i.href.value : e.value), {
      activate: s,
      isActivated: a,
      select: u,
      isSelected: c,
      isIndeterminate: d,
      isGroupActivator: f,
      root: h,
      parent: v,
      openOnSelect: g
    } = ig(l, !1), p = eg(), m = C(() => {
      var B;
      return e.active !== !1 && (e.active || ((B = i.isActive) == null ? void 0 : B.value) || (h.activatable.value ? a.value : c.value));
    }), w = C(() => e.link !== !1 && i.isLink.value), _ = C(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || !!p && (h.selectable.value || h.activatable.value || e.value != null))), b = C(() => e.rounded || e.nav), x = C(() => e.color ?? e.activeColor), E = C(() => ({
      color: m.value ? x.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    we(() => {
      var B;
      return (B = i.isActive) == null ? void 0 : B.value;
    }, (B) => {
      B && v.value != null && h.open(v.value, !0), B && g(B);
    }, {
      immediate: !0
    });
    const {
      themeClasses: S
    } = rt(e), {
      borderClasses: T
    } = Nr(e), {
      colorClasses: A,
      colorStyles: R,
      variantClasses: D
    } = ho(E), {
      densityClasses: L
    } = vn(e), {
      dimensionStyles: I
    } = ir(e), {
      elevationClasses: k
    } = zn(e), {
      roundedClasses: O
    } = It(b), M = C(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), j = C(() => ({
      isActive: m.value,
      select: u,
      isSelected: c.value,
      isIndeterminate: d.value
    }));
    function N(B) {
      var H;
      o("click", B), !(f || !_.value) && ((H = i.navigate) == null || H.call(i, B), h.activatable ? s(!a.value, B) : (h.selectable || e.value != null) && u(!c.value, B));
    }
    function F(B) {
      (B.key === "Enter" || B.key === " ") && (B.preventDefault(), N(B));
    }
    return ve(() => {
      const B = w.value ? "a" : e.tag, H = r.title || e.title != null, Y = r.subtitle || e.subtitle != null, ee = !!(e.appendAvatar || e.appendIcon), le = !!(ee || r.append), fe = !!(e.prependAvatar || e.prependIcon), J = !!(fe || r.prepend);
      return p == null || p.updateHasPrepend(J), e.activeColor && Z0("active-color", ["color", "base-color"]), He(y(B, {
        class: ["v-list-item", {
          "v-list-item--active": m.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": _.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !J && (p == null ? void 0 : p.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && m.value
        }, S.value, T.value, A.value, L.value, k.value, M.value, O.value, D.value, e.class],
        style: [R.value, I.value, e.style],
        href: i.href.value,
        tabindex: _.value ? p ? -2 : 0 : void 0,
        onClick: N,
        onKeydown: _.value && !w.value && F
      }, {
        default: () => {
          var se;
          return [fo(_.value || m.value, "v-list-item"), J && y("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [r.prepend ? y(nt, {
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
              return [(Ee = r.prepend) == null ? void 0 : Ee.call(r, j.value)];
            }
          }) : y(Le, null, [e.prependAvatar && y(Vr, {
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
          }, [H && y(o_, {
            key: "title"
          }, {
            default: () => {
              var Ee;
              return [((Ee = r.title) == null ? void 0 : Ee.call(r, {
                title: e.title
              })) ?? e.title];
            }
          }), Y && y(r_, {
            key: "subtitle"
          }, {
            default: () => {
              var Ee;
              return [((Ee = r.subtitle) == null ? void 0 : Ee.call(r, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (se = r.default) == null ? void 0 : se.call(r, j.value)]), le && y("div", {
            key: "append",
            class: "v-list-item__append"
          }, [r.append ? y(nt, {
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
              var Ee;
              return [(Ee = r.append) == null ? void 0 : Ee.call(r, j.value)];
            }
          }) : y(Le, null, [e.appendIcon && y(ze, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && y(Vr, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), y("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[cn("ripple"), _.value && e.ripple]]);
    }), {
      isGroupActivator: f,
      isSelected: c,
      list: p,
      select: u
    };
  }
}), l_ = Z({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...ke(),
  ...We()
}, "VListSubheader"), s_ = de()({
  name: "VListSubheader",
  props: l_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: r,
      textColorStyles: o
    } = an(ae(e, "color"));
    return ve(() => {
      const i = !!(n.default || e.title);
      return y(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, r.value, e.class],
        style: [{
          textColorStyles: o
        }, e.style]
      }, {
        default: () => {
          var l;
          return [i && y("div", {
            class: "v-list-subheader__text"
          }, [((l = n.default) == null ? void 0 : l.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), a_ = Z({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...ke(),
  ...Ze()
}, "VDivider"), u_ = de()({
  name: "VDivider",
  props: a_(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: r
    } = rt(e), {
      textColorClasses: o,
      textColorStyles: i
    } = an(ae(e, "color")), l = C(() => {
      const s = {};
      return e.length && (s[e.vertical ? "maxHeight" : "maxWidth"] = pe(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = pe(e.thickness)), s;
    });
    return ve(() => y("hr", {
      class: [{
        "v-divider": !0,
        "v-divider--inset": e.inset,
        "v-divider--vertical": e.vertical
      }, r.value, o.value, e.class],
      style: [l.value, i.value, e.style],
      "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
      role: `${n.role || "separator"}`
    }, null)), {};
  }
}), c_ = Z({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), lg = de()({
  name: "VListChildren",
  props: c_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Qv(), () => {
      var r, o;
      return ((r = n.default) == null ? void 0 : r.call(n)) ?? ((o = e.items) == null ? void 0 : o.map((i) => {
        var f, h;
        let {
          children: l,
          props: s,
          type: a,
          raw: u
        } = i;
        if (a === "divider")
          return ((f = n.divider) == null ? void 0 : f.call(n, {
            props: s
          })) ?? y(u_, s, null);
        if (a === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: s
          })) ?? y(s_, s, null);
        const c = {
          subtitle: n.subtitle ? (v) => {
            var g;
            return (g = n.subtitle) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (v) => {
            var g;
            return (g = n.prepend) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          append: n.append ? (v) => {
            var g;
            return (g = n.append) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0,
          title: n.title ? (v) => {
            var g;
            return (g = n.title) == null ? void 0 : g.call(n, {
              ...v,
              item: u
            });
          } : void 0
        }, d = Tf.filterProps(s);
        return l ? y(Tf, he({
          value: s == null ? void 0 : s.value
        }, d), {
          activator: (v) => {
            let {
              props: g
            } = v;
            const p = {
              ...s,
              ...g,
              value: e.returnObject ? u : s.value
            };
            return n.header ? n.header({
              props: p
            }) : y(pl, p, c);
          },
          default: () => y(lg, {
            items: l
          }, n)
        }) : n.item ? n.item({
          props: s
        }) : y(pl, he(s, {
          value: e.returnObject ? u : s.value
        }), c);
      }));
    };
  }
}), sg = Z({
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
    default: Ar
  }
}, "list-items");
function ha(e, t) {
  const n = Tn(t, e.itemTitle, t), r = Tn(t, e.itemValue, n), o = Tn(t, e.itemChildren), i = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Xt(t, ["children"]) : t : void 0 : Tn(t, e.itemProps), l = {
    title: n,
    value: r,
    ...i
  };
  return {
    title: String(l.title ?? ""),
    value: l.value,
    props: l,
    children: Array.isArray(o) ? ag(e, o) : void 0,
    raw: t
  };
}
function ag(e, t) {
  const n = [];
  for (const r of t)
    n.push(ha(e, r));
  return n;
}
function f_(e) {
  const t = C(() => ag(e, e.items)), n = C(() => t.value.some((i) => i.value === null));
  function r(i) {
    return n.value || (i = i.filter((l) => l !== null)), i.map((l) => e.returnObject && typeof l == "string" ? ha(e, l) : t.value.find((s) => e.valueComparator(l, s.value)) || ha(e, l));
  }
  function o(i) {
    return e.returnObject ? i.map((l) => {
      let {
        raw: s
      } = l;
      return s;
    }) : i.map((l) => {
      let {
        value: s
      } = l;
      return s;
    });
  }
  return {
    items: t,
    transformIn: r,
    transformOut: o
  };
}
function d_(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function h_(e, t) {
  const n = Tn(t, e.itemType, "item"), r = d_(t) ? t : Tn(t, e.itemTitle), o = Tn(t, e.itemValue, void 0), i = Tn(t, e.itemChildren), l = e.itemProps === !0 ? Xt(t, ["children"]) : Tn(t, e.itemProps), s = {
    title: r,
    value: o,
    ...l
  };
  return {
    type: n,
    title: s.title,
    value: s.value,
    props: s,
    children: n === "item" && i ? ug(e, i) : void 0,
    raw: t
  };
}
function ug(e, t) {
  const n = [];
  for (const r of t)
    n.push(h_(e, r));
  return n;
}
function v_(e) {
  return {
    items: C(() => ug(e, e.items))
  };
}
const g_ = Z({
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
  ...Jw({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...$r(),
  ...ke(),
  ...Zt(),
  ...or(),
  ...jn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...sg(),
  ...Pt(),
  ...We(),
  ...Ze(),
  ...Gn({
    variant: "text"
  })
}, "VList"), m_ = de()({
  name: "VList",
  props: g_(),
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
      items: r
    } = v_(e), {
      themeClasses: o
    } = rt(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: l
    } = Dt(ae(e, "bgColor")), {
      borderClasses: s
    } = Nr(e), {
      densityClasses: a
    } = vn(e), {
      dimensionStyles: u
    } = ir(e), {
      elevationClasses: c
    } = zn(e), {
      roundedClasses: d
    } = It(e), {
      children: f,
      open: h,
      parents: v,
      select: g
    } = Qw(e), p = C(() => e.lines ? `v-list--${e.lines}-line` : void 0), m = ae(e, "activeColor"), w = ae(e, "baseColor"), _ = ae(e, "color");
    Qv(), En({
      VListGroup: {
        activeColor: m,
        baseColor: w,
        color: _,
        expandIcon: ae(e, "expandIcon"),
        collapseIcon: ae(e, "collapseIcon")
      },
      VListItem: {
        activeClass: ae(e, "activeClass"),
        activeColor: m,
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
    const b = be(!1), x = te();
    function E(L) {
      b.value = !0;
    }
    function S(L) {
      b.value = !1;
    }
    function T(L) {
      var I;
      !b.value && !(L.relatedTarget && ((I = x.value) != null && I.contains(L.relatedTarget))) && D();
    }
    function A(L) {
      if (x.value) {
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
      if (x.value)
        return sl(x.value, L);
    }
    return ve(() => y(e.tag, {
      ref: x,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, o.value, i.value, s.value, a.value, c.value, p.value, d.value, e.class],
      style: [l.value, u.value, e.style],
      tabindex: e.disabled || b.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: E,
      onFocusout: S,
      onFocus: T,
      onKeydown: A,
      onMousedown: R
    }, {
      default: () => [y(lg, {
        items: r.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: h,
      select: g,
      focus: D,
      children: f,
      parents: v
    };
  }
}), p_ = Z({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...Xt(di({
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
}, "VMenu"), y_ = de()({
  name: "VMenu",
  props: p_(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = Ne(e, "modelValue"), {
      scopeId: o
    } = fi(), i = Lt(), l = C(() => e.id || `v-menu-${i}`), s = te(), a = je(ia, null), u = be(0);
    ct(ia, {
      register() {
        ++u.value;
      },
      unregister() {
        --u.value;
      },
      closeParents(g) {
        setTimeout(() => {
          !u.value && (g == null || g && !D0(g, s.value.contentEl)) && (r.value = !1, a == null || a.closeParents());
        }, 40);
      }
    });
    async function c(g) {
      var w, _, b;
      const p = g.relatedTarget, m = g.target;
      await Xe(), r.value && p !== m && ((w = s.value) != null && w.contentEl) && // We're the topmost menu
      ((_ = s.value) != null && _.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(m) && // It isn't inside the menu body
      !s.value.contentEl.contains(m) && ((b = jo(s.value.contentEl)[0]) == null || b.focus());
    }
    we(r, (g) => {
      g ? (a == null || a.register(), document.addEventListener("focusin", c, {
        once: !0
      })) : (a == null || a.unregister(), document.removeEventListener("focusin", c));
    });
    function d(g) {
      a == null || a.closeParents(g);
    }
    function f(g) {
      var p, m, w;
      e.disabled || g.key === "Tab" && (Lh(jo((p = s.value) == null ? void 0 : p.contentEl, !1), g.shiftKey ? "prev" : "next", (b) => b.tabIndex >= 0) || (r.value = !1, (w = (m = s.value) == null ? void 0 : m.activatorEl) == null || w.focus()));
    }
    function h(g) {
      var m;
      if (e.disabled) return;
      const p = (m = s.value) == null ? void 0 : m.contentEl;
      p && r.value ? g.key === "ArrowDown" ? (g.preventDefault(), sl(p, "next")) : g.key === "ArrowUp" && (g.preventDefault(), sl(p, "prev")) : ["ArrowDown", "ArrowUp"].includes(g.key) && (r.value = !0, g.preventDefault(), setTimeout(() => setTimeout(() => h(g))));
    }
    const v = C(() => he({
      "aria-haspopup": "menu",
      "aria-expanded": String(r.value),
      "aria-owns": l.value,
      onKeydown: h
    }, e.activatorProps));
    return ve(() => {
      const g = rr.filterProps(e);
      return y(rr, he({
        ref: s,
        id: l.value,
        class: ["v-menu", e.class],
        style: e.style
      }, g, {
        modelValue: r.value,
        "onUpdate:modelValue": (p) => r.value = p,
        absolute: !0,
        activatorProps: v.value,
        "onClick:outside": d,
        onKeydown: f
      }, o), {
        activator: n.activator,
        default: function() {
          for (var p = arguments.length, m = new Array(p), w = 0; w < p; w++)
            m[w] = arguments[w];
          return y(nt, {
            root: "VMenu"
          }, {
            default: () => {
              var _;
              return [(_ = n.default) == null ? void 0 : _.call(n, ...m)];
            }
          });
        }
      });
    }), lr({
      id: l,
      ΨopenChildren: u
    }, s);
  }
}), b_ = ["color", "file", "time", "date", "datetime-local", "week", "month"], cg = Z({
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
  ...Or(),
  ...pu()
}, "VTextField"), Mf = de()({
  name: "VTextField",
  directives: {
    Intersect: hv
  },
  inheritAttrs: !1,
  props: cg(),
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
      slots: o
    } = t;
    const i = Ne(e, "modelValue"), {
      isFocused: l,
      focus: s,
      blur: a
    } = vo(e), u = C(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), c = C(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), d = C(() => ["plain", "underlined"].includes(e.variant));
    function f(E, S) {
      var T, A;
      !e.autofocus || !E || (A = (T = S[0].target) == null ? void 0 : T.focus) == null || A.call(T);
    }
    const h = te(), v = te(), g = te(), p = C(() => b_.includes(e.type) || e.persistentPlaceholder || l.value || e.active);
    function m() {
      var E;
      g.value !== document.activeElement && ((E = g.value) == null || E.focus()), l.value || s();
    }
    function w(E) {
      r("mousedown:control", E), E.target !== g.value && (m(), E.preventDefault());
    }
    function _(E) {
      m(), r("click:control", E);
    }
    function b(E) {
      E.stopPropagation(), m(), Xe(() => {
        i.value = null, Vh(e["onClick:clear"], E);
      });
    }
    function x(E) {
      var T;
      const S = E.target;
      if (i.value = S.value, (T = e.modelModifiers) != null && T.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const A = [S.selectionStart, S.selectionEnd];
        Xe(() => {
          S.selectionStart = A[0], S.selectionEnd = A[1];
        });
      }
    }
    return ve(() => {
      const E = !!(o.counter || e.counter !== !1 && e.counter != null), S = !!(E || o.details), [T, A] = uo(n), {
        modelValue: R,
        ...D
      } = Kt.filterProps(e), L = Iv(e);
      return y(Kt, he({
        ref: h,
        modelValue: i.value,
        "onUpdate:modelValue": (I) => i.value = I,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": d.value
        }, e.class],
        style: e.style
      }, T, D, {
        centerAffix: !d.value,
        focused: l.value
      }), {
        ...o,
        default: (I) => {
          let {
            id: k,
            isDisabled: O,
            isDirty: M,
            isReadonly: j,
            isValid: N
          } = I;
          return y(yu, he({
            ref: v,
            onMousedown: w,
            onClick: _,
            "onClick:clear": b,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: k.value,
            active: p.value || M.value,
            dirty: M.value || e.dirty,
            disabled: O.value,
            focused: l.value,
            error: N.value === !1
          }), {
            ...o,
            default: (F) => {
              let {
                props: {
                  class: B,
                  ...H
                }
              } = F;
              const Y = He(y("input", he({
                ref: g,
                value: i.value,
                onInput: x,
                autofocus: e.autofocus,
                readonly: j.value,
                disabled: O.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: m,
                onBlur: a
              }, H, A), null), [[cn("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return y(Le, null, [e.prefix && y("span", {
                class: "v-text-field__prefix"
              }, [y("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), o.default ? y("div", {
                class: B,
                "data-no-activator": ""
              }, [o.default(), Y]) : Nn(Y, {
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
          var k;
          return y(Le, null, [(k = o.details) == null ? void 0 : k.call(o, I), E && y(Le, null, [y("span", null, null), y(Lv, {
            active: e.persistentCounter || l.value,
            value: u.value,
            max: c.value
          }, o.counter)])]);
        } : void 0
      });
    }), lr({}, h, v, g);
  }
}), w_ = Z({
  renderless: Boolean,
  ...ke()
}, "VVirtualScrollItem"), __ = de()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: w_(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: r,
      slots: o
    } = t;
    const {
      resizeRef: i,
      contentRect: l
    } = oo(void 0, "border");
    we(() => {
      var s;
      return (s = l.value) == null ? void 0 : s.height;
    }, (s) => {
      s != null && r("update:height", s);
    }), ve(() => {
      var s, a;
      return e.renderless ? y(Le, null, [(s = o.default) == null ? void 0 : s.call(o, {
        itemRef: i
      })]) : y("div", he({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(a = o.default) == null ? void 0 : a.call(o)]);
    });
  }
}), x_ = -1, k_ = 1, Ls = 100, S_ = Z({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function C_(e, t) {
  const n = du(), r = be(0);
  Cn(() => {
    r.value = parseFloat(e.itemHeight || 0);
  });
  const o = be(0), i = be(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (r.value || 16)
  ) || 1), l = be(0), s = be(0), a = te(), u = te();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = oo();
  Cn(() => {
    d.value = a.value;
  });
  const h = C(() => {
    var F;
    return a.value === document.documentElement ? n.height.value : ((F = f.value) == null ? void 0 : F.height) || parseInt(e.height) || 0;
  }), v = C(() => !!(a.value && u.value && h.value && r.value));
  let g = Array.from({
    length: t.value.length
  }), p = Array.from({
    length: t.value.length
  });
  const m = be(0);
  let w = -1;
  function _(F) {
    return g[F] || r.value;
  }
  const b = R0(() => {
    const F = performance.now();
    p[0] = 0;
    const B = t.value.length;
    for (let H = 1; H <= B - 1; H++)
      p[H] = (p[H - 1] || 0) + _(H - 1);
    m.value = Math.max(m.value, performance.now() - F);
  }, m), x = we(v, (F) => {
    F && (x(), c = u.value.offsetTop, b.immediate(), O(), ~w && Xe(() => {
      Oe && window.requestAnimationFrame(() => {
        j(w), w = -1;
      });
    }));
  });
  wt(() => {
    b.clear();
  });
  function E(F, B) {
    const H = g[F], Y = r.value;
    r.value = Y ? Math.min(r.value, B) : B, (H !== B || Y !== r.value) && (g[F] = B, b());
  }
  function S(F) {
    return F = Bt(F, 0, t.value.length - 1), p[F] || 0;
  }
  function T(F) {
    return E_(p, F);
  }
  let A = 0, R = 0, D = 0;
  we(h, (F, B) => {
    B && (O(), F < B && requestAnimationFrame(() => {
      R = 0, O();
    }));
  });
  function L() {
    if (!a.value || !u.value) return;
    const F = a.value.scrollTop, B = performance.now();
    B - D > 500 ? (R = Math.sign(F - A), c = u.value.offsetTop) : R = F - A, A = F, D = B, O();
  }
  function I() {
    !a.value || !u.value || (R = 0, D = 0, O());
  }
  let k = -1;
  function O() {
    cancelAnimationFrame(k), k = requestAnimationFrame(M);
  }
  function M() {
    if (!a.value || !h.value) return;
    const F = A - c, B = Math.sign(R), H = Math.max(0, F - Ls), Y = Bt(T(H), 0, t.value.length), ee = F + h.value + Ls, le = Bt(T(ee) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (B !== x_ || Y < o.value) && (B !== k_ || le > i.value)
    ) {
      const fe = S(o.value) - S(Y), J = S(le) - S(i.value);
      Math.max(fe, J) > Ls ? (o.value = Y, i.value = le) : (Y <= 0 && (o.value = Y), le >= t.value.length && (i.value = le));
    }
    l.value = S(o.value), s.value = S(t.value.length) - S(i.value);
  }
  function j(F) {
    const B = S(F);
    !a.value || F && !B ? w = F : a.value.scrollTop = B;
  }
  const N = C(() => t.value.slice(o.value, i.value).map((F, B) => ({
    raw: F,
    index: B + o.value
  })));
  return we(t, () => {
    g = Array.from({
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
function E_(e, t) {
  let n = e.length - 1, r = 0, o = 0, i = null, l = -1;
  if (e[n] < t)
    return n;
  for (; r <= n; )
    if (o = r + n >> 1, i = e[o], i > t)
      n = o - 1;
    else if (i < t)
      l = o, r = o + 1;
    else return i === t ? o : r;
  return l;
}
const V_ = Z({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...S_(),
  ...ke(),
  ...or()
}, "VVirtualScroll"), L_ = de()({
  name: "VVirtualScroll",
  props: V_(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const r = lt("VVirtualScroll"), {
      dimensionStyles: o
    } = ir(e), {
      containerRef: i,
      markerRef: l,
      handleScroll: s,
      handleScrollend: a,
      handleItemResize: u,
      scrollToIndex: c,
      paddingTop: d,
      paddingBottom: f,
      computedItems: h
    } = C_(e, ae(e, "items"));
    return Er(() => e.renderless, () => {
      function v() {
        var m, w;
        const p = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[p]("scroll", s, {
          passive: !0
        }), document[p]("scrollend", a)) : ((m = i.value) == null || m[p]("scroll", s, {
          passive: !0
        }), (w = i.value) == null || w[p]("scrollend", a));
      }
      fn(() => {
        i.value = Uh(r.vnode.el, !0), v(!0);
      }), wt(v);
    }), ve(() => {
      const v = h.value.map((g) => y(__, {
        key: g.index,
        renderless: e.renderless,
        "onUpdate:height": (p) => u(g.index, p)
      }, {
        default: (p) => {
          var m;
          return (m = n.default) == null ? void 0 : m.call(n, {
            item: g.raw,
            index: g.index,
            ...p
          });
        }
      }));
      return e.renderless ? y(Le, null, [y("div", {
        ref: l,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: pe(d.value)
        }
      }, null), v, y("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: pe(f.value)
        }
      }, null)]) : y("div", {
        ref: i,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: a,
        style: [o.value, e.style]
      }, [y("div", {
        ref: l,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: pe(d.value),
          paddingBottom: pe(f.value)
        }
      }, [v])]);
    }), {
      scrollToIndex: c
    };
  }
});
function P_(e, t) {
  const n = be(!1);
  let r;
  function o(s) {
    cancelAnimationFrame(r), n.value = !0, r = requestAnimationFrame(() => {
      r = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function i() {
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
    }), await i();
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
    onListScroll: o,
    onListKeydown: l
  };
}
const I_ = Z({
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
  ...sg({
    itemChildren: !1
  })
}, "Select"), T_ = Z({
  ...I_(),
  ...Xt(cg({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...ci({
    transition: {
      component: fu
    }
  })
}, "VSelect"), gV = de()({
  name: "VSelect",
  props: T_(),
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
      t: r
    } = si(), o = te(), i = te(), l = te(), s = Ne(e, "menu"), a = C({
      get: () => s.value,
      set: (N) => {
        var F;
        s.value && !N && ((F = i.value) != null && F.ΨopenChildren) || (s.value = N);
      }
    }), {
      items: u,
      transformIn: c,
      transformOut: d
    } = f_(e), f = Ne(e, "modelValue", [], (N) => c(N === null ? [null] : kn(N)), (N) => {
      const F = d(N);
      return e.multiple ? F : F[0] ?? null;
    }), h = C(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), v = Tv(), g = C(() => f.value.map((N) => N.value)), p = be(!1), m = C(() => a.value ? e.closeText : e.openText);
    let w = "", _;
    const b = C(() => e.hideSelected ? u.value.filter((N) => !f.value.some((F) => F === N)) : u.value), x = C(() => e.hideNoData && !b.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = C(() => {
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
      onListScroll: T,
      onListKeydown: A
    } = P_(S, o);
    function R(N) {
      e.openOnClear && (a.value = !0);
    }
    function D() {
      x.value || (a.value = !a.value);
    }
    function L(N) {
      var ee, le;
      if (!N.key || e.readonly || v != null && v.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(N.key) && N.preventDefault(), ["Enter", "ArrowDown", " "].includes(N.key) && (a.value = !0), ["Escape", "Tab"].includes(N.key) && (a.value = !1), N.key === "Home" ? (ee = S.value) == null || ee.focus("first") : N.key === "End" && ((le = S.value) == null || le.focus("last"));
      const F = 1e3;
      function B(fe) {
        const J = fe.key.length === 1, se = !fe.ctrlKey && !fe.metaKey && !fe.altKey;
        return J && se;
      }
      if (e.multiple || !B(N)) return;
      const H = performance.now();
      H - _ > F && (w = ""), w += N.key.toLowerCase(), _ = H;
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
          f.value = B ? [N] : [], Xe(() => {
            a.value = !1;
          });
        }
    }
    function k(N) {
      var F;
      (F = S.value) != null && F.$el.contains(N.relatedTarget) || (a.value = !1);
    }
    function O() {
      var N;
      p.value && ((N = o.value) == null || N.focus());
    }
    function M(N) {
      p.value = !0;
    }
    function j(N) {
      if (N == null) f.value = [];
      else if (al(o.value, ":autofill") || al(o.value, ":-webkit-autofill")) {
        const F = u.value.find((B) => B.title === N);
        F && I(F);
      } else o.value && (o.value.value = "");
    }
    return we(a, () => {
      if (!e.hideSelected && a.value && f.value.length) {
        const N = b.value.findIndex((F) => f.value.some((B) => e.valueComparator(B.value, F.value)));
        Oe && window.requestAnimationFrame(() => {
          var F;
          N >= 0 && ((F = l.value) == null || F.scrollToIndex(N));
        });
      }
    }), we(() => e.items, (N, F) => {
      a.value || p.value && !F.length && N.length && (a.value = !0);
    }), ve(() => {
      const N = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), B = f.value.length > 0, H = Mf.filterProps(e), Y = B || !p.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return y(Mf, he({
        ref: o
      }, H, {
        modelValue: f.value.map((ee) => ee.props.value).join(", "),
        "onUpdate:modelValue": j,
        focused: p.value,
        "onUpdate:focused": (ee) => p.value = ee,
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
        onBlur: k,
        onKeydown: L,
        "aria-label": r(m.value),
        title: r(m.value)
      }), {
        ...n,
        default: () => y(Le, null, [y(y_, he({
          ref: i,
          modelValue: a.value,
          "onUpdate:modelValue": (ee) => a.value = ee,
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
          default: () => [F && y(m_, he({
            ref: S,
            selected: g.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (ee) => ee.preventDefault(),
            onKeydown: A,
            onFocusin: M,
            onScrollPassive: T,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, e.listProps), {
            default: () => {
              var ee, le, fe;
              return [(ee = n["prepend-item"]) == null ? void 0 : ee.call(n), !b.value.length && !e.hideNoData && (((le = n["no-data"]) == null ? void 0 : le.call(n)) ?? y(pl, {
                title: r(e.noDataText)
              }, null)), y(L_, {
                ref: l,
                renderless: !0,
                items: b.value
              }, {
                default: (J) => {
                  var et;
                  let {
                    item: se,
                    index: Ee,
                    itemRef: Fe
                  } = J;
                  const ot = he(se.props, {
                    ref: Fe,
                    key: Ee,
                    onClick: () => I(se, null)
                  });
                  return ((et = n.item) == null ? void 0 : et.call(n, {
                    item: se,
                    index: Ee,
                    props: ot
                  })) ?? y(pl, he(ot, {
                    role: "option"
                  }), {
                    prepend: (pn) => {
                      let {
                        isSelected: V
                      } = pn;
                      return y(Le, null, [e.multiple && !e.hideSelected ? y(ua, {
                        key: se.value,
                        modelValue: V,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, se.props.prependAvatar && y(Vr, {
                        image: se.props.prependAvatar
                      }, null), se.props.prependIcon && y(ze, {
                        icon: se.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (fe = n["append-item"]) == null ? void 0 : fe.call(n)];
            }
          })]
        }), f.value.map((ee, le) => {
          function fe(Fe) {
            Fe.stopPropagation(), Fe.preventDefault(), I(ee, !1);
          }
          const J = {
            "onClick:close": fe,
            onMousedown(Fe) {
              Fe.preventDefault(), Fe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, se = N ? !!n.chip : !!n.selection, Ee = se ? Ph(N ? n.chip({
            item: ee,
            index: le,
            props: J
          }) : n.selection({
            item: ee,
            index: le
          })) : void 0;
          if (!(se && !Ee))
            return y("div", {
              key: ee.value,
              class: "v-select__selection"
            }, [N ? n.chip ? y(nt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: ee.title
                }
              }
            }, {
              default: () => [Ee]
            }) : y(Vv, he({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: ee.title,
              disabled: ee.props.disabled
            }, J), null) : Ee ?? y("span", {
              class: "v-select__selection-text"
            }, [ee.title, e.multiple && le < f.value.length - 1 && y("span", {
              class: "v-select__selection-comma"
            }, [Qe(",")])])]);
        })]),
        "append-inner": function() {
          var J;
          for (var ee = arguments.length, le = new Array(ee), fe = 0; fe < ee; fe++)
            le[fe] = arguments[fe];
          return y(Le, null, [(J = n["append-inner"]) == null ? void 0 : J.call(n, ...le), e.menuIcon ? y(ze, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), lr({
      isFocused: p,
      menu: a,
      select: I
    }, o);
  }
}), M_ = Z({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: !1
  },
  ...Or(),
  ...ts()
}, "VSwitch"), wo = de()({
  name: "VSwitch",
  inheritAttrs: !1,
  props: M_(),
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
    const o = Ne(e, "indeterminate"), i = Ne(e, "modelValue"), {
      loaderClasses: l
    } = Wl(e), {
      isFocused: s,
      focus: a,
      blur: u
    } = vo(e), c = te(), d = C(() => typeof e.loading == "string" && e.loading !== "" ? e.loading : e.color), f = Lt(), h = C(() => e.id || `switch-${f}`);
    function v() {
      o.value && (o.value = !1);
    }
    function g(p) {
      var m, w;
      p.stopPropagation(), p.preventDefault(), (w = (m = c.value) == null ? void 0 : m.input) == null || w.click();
    }
    return ve(() => {
      const [p, m] = uo(n), w = Kt.filterProps(e), _ = io.filterProps(e);
      return y(Kt, he({
        class: ["v-switch", {
          "v-switch--flat": e.flat
        }, {
          "v-switch--inset": e.inset
        }, {
          "v-switch--indeterminate": o.value
        }, l.value, e.class]
      }, p, w, {
        modelValue: i.value,
        "onUpdate:modelValue": (b) => i.value = b,
        id: h.value,
        focused: s.value,
        style: e.style
      }), {
        ...r,
        default: (b) => {
          let {
            id: x,
            messagesId: E,
            isDisabled: S,
            isReadonly: T,
            isValid: A
          } = b;
          const R = {
            model: i,
            isValid: A
          };
          return y(io, he({
            ref: c
          }, _, {
            modelValue: i.value,
            "onUpdate:modelValue": [(D) => i.value = D, v],
            id: x.value,
            "aria-describedby": E.value,
            type: "checkbox",
            "aria-checked": o.value ? "mixed" : void 0,
            disabled: S.value,
            readonly: T.value,
            onFocus: a,
            onBlur: u
          }, m), {
            ...r,
            default: (D) => {
              let {
                backgroundColorClasses: L,
                backgroundColorStyles: I
              } = D;
              return y("div", {
                class: ["v-switch__track", ...L.value],
                style: I.value,
                onClick: g
              }, [r["track-true"] && y("div", {
                key: "prepend",
                class: "v-switch__track-true"
              }, [r["track-true"](R)]), r["track-false"] && y("div", {
                key: "append",
                class: "v-switch__track-false"
              }, [r["track-false"](R)])]);
            },
            input: (D) => {
              let {
                inputNode: L,
                icon: I,
                backgroundColorClasses: k,
                backgroundColorStyles: O
              } = D;
              return y(Le, null, [L, y("div", {
                class: ["v-switch__thumb", {
                  "v-switch__thumb--filled": I || e.loading
                }, e.inset ? void 0 : k.value],
                style: e.inset ? void 0 : O.value
              }, [r.thumb ? y(nt, {
                defaults: {
                  VIcon: {
                    icon: I,
                    size: "x-small"
                  }
                }
              }, {
                default: () => [r.thumb({
                  ...R,
                  icon: I
                })]
              }) : y(pv, null, {
                default: () => [e.loading ? y(uu, {
                  name: "v-switch",
                  active: !0,
                  color: A.value === !1 ? void 0 : d.value
                }, {
                  default: (M) => r.loader ? r.loader(M) : y(Zh, {
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
}), A_ = /* @__PURE__ */ Mr({
  __name: "GraphSettings",
  props: {
    config: { type: Object },
    isWelcome: { type: Boolean }
  },
  emits: ["update-settings"],
  setup(e, { emit: t }) {
    const n = e, r = te(n.isWelcome), o = te(n.config.showNodeLabels), i = te(n.config.nodePhysicsEnabled), l = te(n.config.showLinkLabels), s = te(n.config.fixedLinkDistanceEnabled), a = te(n.config.zoomEnabled), u = te(String(n.config.nodeRadius)), c = te(""), d = te("black"), f = te(""), h = te(n.config.persistSettingsLocalStorage), v = t;
    function g() {
      h.value ? (localStorage.showNodeLabels = o.value, localStorage.enableNodePhysics = i.value, localStorage.showLinkLabels = l.value, localStorage.enableFixedLinkDistance = s.value, localStorage.enableZoom = a.value, localStorage.persistSettings = h.value) : localStorage.clear(), localStorage.wasHere = !0;
    }
    function p() {
      g(), v("update-settings", {
        showNodeLabels: o.value,
        nodePhysicsEnabled: i.value,
        showLinkLabels: l.value,
        fixedLinkDistanceEnabled: s.value,
        zoomEnabled: a.value,
        persistEnabled: h.value
      }), r.value = !1;
    }
    return (m, w) => (vt(), ln(vu, {
      "max-width": "900",
      "max-height": "550",
      scrollable: "",
      modelValue: r.value,
      "onUpdate:modelValue": w[10] || (w[10] = (_) => r.value = _),
      persistent: ""
    }, {
      activator: ce(({ props: _ }) => [
        y(Zr, {
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
            }, { ..._, ...b }, { variant: "plain" }), null, 16)
          ]),
          _: 2
        }, 1024)
      ]),
      default: ce(({ isActive: _ }) => [
        y(cu, { class: "pa-3" }, {
          default: ce(() => [
            n.isWelcome ? (vt(), ln(Wo, { key: 0 }, {
              default: ce(() => [
                Qe("Welcome to the Graph Tool!")
              ]),
              _: 1
            })) : (vt(), ln(Wo, { key: 1 }, {
              default: ce(() => [
                Qe("Settings")
              ]),
              _: 1
            })),
            n.isWelcome ? (vt(), ln(Co, {
              key: 2,
              class: "px-6 pb-1",
              "aria-describedby": "Welcome to the Graph Tool! You can proceed with the default settings or change them if you wish."
            }, {
              default: ce(() => [
                Qe(" You can proceed with the default settings or change them if you wish. ")
              ]),
              _: 1
            })) : en("", !0),
            y(Ao, null, {
              default: ce(() => [
                y(kt, null, {
                  default: ce(() => [
                    y(Gr, { cols: "5" }, {
                      default: ce(() => [
                        y(kt, null, {
                          default: ce(() => [
                            y(Co, { class: "py-5" }, {
                              default: ce(() => [
                                Qe("Node Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(If, null, {
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
                            y(Gr, { class: "mx-0 px-0" }, {
                              default: ce(() => [
                                y(wo, {
                                  label: "Labels",
                                  color: "secondary",
                                  modelValue: o.value,
                                  "onUpdate:modelValue": w[1] || (w[1] = (b) => o.value = b)
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            y(Gr, { class: "mx-0 px-0" }, {
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
                            y(wo, {
                              label: "Physics",
                              color: "secondary",
                              variant: "text",
                              modelValue: i.value,
                              "onUpdate:modelValue": w[3] || (w[3] = (b) => i.value = b)
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
                    y(ml),
                    y(Gr, { cols: "5" }, {
                      default: ce(() => [
                        y(kt, null, {
                          default: ce(() => [
                            y(Co, { class: "py-5" }, {
                              default: ce(() => [
                                Qe("Link Settings")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, null, {
                          default: ce(() => [
                            y(If, null, {
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
                            y(wo, {
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
                            y(wo, {
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
                            y(Co, { class: "px-0" }, {
                              default: ce(() => [
                                Qe("Miscellaneous")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        y(kt, { class: "py-0 my-0" }, {
                          default: ce(() => [
                            y(wo, {
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
            y(Zl, null, {
              default: ce(() => [
                y(Ub, {
                  label: "Set as Default",
                  color: "secondary",
                  modelValue: h.value,
                  "onUpdate:modelValue": w[9] || (w[9] = (b) => h.value = b)
                }, null, 8, ["modelValue"]),
                y(ml),
                y(ut, {
                  color: "secondary",
                  variant: "text",
                  onClick: p
                }, {
                  default: ce(() => [
                    Qe("Save")
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
var $_ = { value: () => {
} };
function hi() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ui(n);
}
function Ui(e) {
  this._ = e;
}
function N_(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", o = n.indexOf(".");
    if (o >= 0 && (r = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ui.prototype = hi.prototype = {
  constructor: Ui,
  on: function(e, t) {
    var n = this._, r = N_(e + "", n), o, i = -1, l = r.length;
    if (arguments.length < 2) {
      for (; ++i < l; ) if ((o = (e = r[i]).type) && (o = R_(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++i < l; )
      if (o = (e = r[i]).type) n[o] = Af(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = Af(n[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Ui(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), r = 0, o, i; r < o; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (i = this._[e], r = 0, o = i.length; r < o; ++r) i[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], o = 0, i = r.length; o < i; ++o) r[o].value.apply(t, n);
  }
};
function R_(e, t) {
  for (var n = 0, r = e.length, o; n < r; ++n)
    if ((o = e[n]).name === t)
      return o.value;
}
function Af(e, t, n) {
  for (var r = 0, o = e.length; r < o; ++r)
    if (e[r].name === t) {
      e[r] = $_, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var va = "http://www.w3.org/1999/xhtml";
const $f = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: va,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ns(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), $f.hasOwnProperty(t) ? { space: $f[t], local: e } : e;
}
function O_(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === va && t.documentElement.namespaceURI === va ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function B_(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function fg(e) {
  var t = ns(e);
  return (t.local ? B_ : O_)(t);
}
function F_() {
}
function Eu(e) {
  return e == null ? F_ : function() {
    return this.querySelector(e);
  };
}
function D_(e) {
  typeof e != "function" && (e = Eu(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], l = i.length, s = r[o] = new Array(l), a, u, c = 0; c < l; ++c)
      (a = i[c]) && (u = e.call(a, a.__data__, c, i)) && ("__data__" in a && (u.__data__ = a.__data__), s[c] = u);
  return new Ht(r, this._parents);
}
function H_(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function j_() {
  return [];
}
function dg(e) {
  return e == null ? j_ : function() {
    return this.querySelectorAll(e);
  };
}
function z_(e) {
  return function() {
    return H_(e.apply(this, arguments));
  };
}
function G_(e) {
  typeof e == "function" ? e = z_(e) : e = dg(e);
  for (var t = this._groups, n = t.length, r = [], o = [], i = 0; i < n; ++i)
    for (var l = t[i], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && (r.push(e.call(a, a.__data__, u, l)), o.push(a));
  return new Ht(r, o);
}
function hg(e) {
  return function() {
    return this.matches(e);
  };
}
function vg(e) {
  return function(t) {
    return t.matches(e);
  };
}
var U_ = Array.prototype.find;
function W_(e) {
  return function() {
    return U_.call(this.children, e);
  };
}
function q_() {
  return this.firstElementChild;
}
function Y_(e) {
  return this.select(e == null ? q_ : W_(typeof e == "function" ? e : vg(e)));
}
var K_ = Array.prototype.filter;
function X_() {
  return Array.from(this.children);
}
function Z_(e) {
  return function() {
    return K_.call(this.children, e);
  };
}
function J_(e) {
  return this.selectAll(e == null ? X_ : Z_(typeof e == "function" ? e : vg(e)));
}
function Q_(e) {
  typeof e != "function" && (e = hg(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], l = i.length, s = r[o] = [], a, u = 0; u < l; ++u)
      (a = i[u]) && e.call(a, a.__data__, u, i) && s.push(a);
  return new Ht(r, this._parents);
}
function gg(e) {
  return new Array(e.length);
}
function ex() {
  return new Ht(this._enter || this._groups.map(gg), this._parents);
}
function yl(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
yl.prototype = {
  constructor: yl,
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
function tx(e) {
  return function() {
    return e;
  };
}
function nx(e, t, n, r, o, i) {
  for (var l = 0, s, a = t.length, u = i.length; l < u; ++l)
    (s = t[l]) ? (s.__data__ = i[l], r[l] = s) : n[l] = new yl(e, i[l]);
  for (; l < a; ++l)
    (s = t[l]) && (o[l] = s);
}
function rx(e, t, n, r, o, i, l) {
  var s, a, u = /* @__PURE__ */ new Map(), c = t.length, d = i.length, f = new Array(c), h;
  for (s = 0; s < c; ++s)
    (a = t[s]) && (f[s] = h = l.call(a, a.__data__, s, t) + "", u.has(h) ? o[s] = a : u.set(h, a));
  for (s = 0; s < d; ++s)
    h = l.call(e, i[s], s, i) + "", (a = u.get(h)) ? (r[s] = a, a.__data__ = i[s], u.delete(h)) : n[s] = new yl(e, i[s]);
  for (s = 0; s < c; ++s)
    (a = t[s]) && u.get(f[s]) === a && (o[s] = a);
}
function ox(e) {
  return e.__data__;
}
function ix(e, t) {
  if (!arguments.length) return Array.from(this, ox);
  var n = t ? rx : nx, r = this._parents, o = this._groups;
  typeof e != "function" && (e = tx(e));
  for (var i = o.length, l = new Array(i), s = new Array(i), a = new Array(i), u = 0; u < i; ++u) {
    var c = r[u], d = o[u], f = d.length, h = lx(e.call(c, c && c.__data__, u, r)), v = h.length, g = s[u] = new Array(v), p = l[u] = new Array(v), m = a[u] = new Array(f);
    n(c, d, g, p, m, h, t);
    for (var w = 0, _ = 0, b, x; w < v; ++w)
      if (b = g[w]) {
        for (w >= _ && (_ = w + 1); !(x = p[_]) && ++_ < v; ) ;
        b._next = x || null;
      }
  }
  return l = new Ht(l, r), l._enter = s, l._exit = a, l;
}
function lx(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sx() {
  return new Ht(this._exit || this._groups.map(gg), this._parents);
}
function ax(e, t, n) {
  var r = this.enter(), o = this, i = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), n == null ? i.remove() : n(i), r && o ? r.merge(o).order() : o;
}
function ux(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, o = n.length, i = r.length, l = Math.min(o, i), s = new Array(o), a = 0; a < l; ++a)
    for (var u = n[a], c = r[a], d = u.length, f = s[a] = new Array(d), h, v = 0; v < d; ++v)
      (h = u[v] || c[v]) && (f[v] = h);
  for (; a < o; ++a)
    s[a] = n[a];
  return new Ht(s, this._parents);
}
function cx() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], o = r.length - 1, i = r[o], l; --o >= 0; )
      (l = r[o]) && (i && l.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(l, i), i = l);
  return this;
}
function fx(e) {
  e || (e = dx);
  function t(d, f) {
    return d && f ? e(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, r = n.length, o = new Array(r), i = 0; i < r; ++i) {
    for (var l = n[i], s = l.length, a = o[i] = new Array(s), u, c = 0; c < s; ++c)
      (u = l[c]) && (a[c] = u);
    a.sort(t);
  }
  return new Ht(o, this._parents).order();
}
function dx(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function hx() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function vx() {
  return Array.from(this);
}
function gx() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length; o < i; ++o) {
      var l = r[o];
      if (l) return l;
    }
  return null;
}
function mx() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function px() {
  return !this.node();
}
function yx(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var o = t[n], i = 0, l = o.length, s; i < l; ++i)
      (s = o[i]) && e.call(s, s.__data__, i, o);
  return this;
}
function bx(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function wx(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function _x(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function xx(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function kx(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Sx(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Cx(e, t) {
  var n = ns(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? wx : bx : typeof t == "function" ? n.local ? Sx : kx : n.local ? xx : _x)(n, t));
}
function mg(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ex(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Vx(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Lx(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function Px(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Ex : typeof t == "function" ? Lx : Vx)(e, t, n ?? "")) : lo(this.node(), e);
}
function lo(e, t) {
  return e.style.getPropertyValue(t) || mg(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ix(e) {
  return function() {
    delete this[e];
  };
}
function Tx(e, t) {
  return function() {
    this[e] = t;
  };
}
function Mx(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Ax(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ix : typeof t == "function" ? Mx : Tx)(e, t)) : this.node()[e];
}
function pg(e) {
  return e.trim().split(/^|\s+/);
}
function Vu(e) {
  return e.classList || new yg(e);
}
function yg(e) {
  this._node = e, this._names = pg(e.getAttribute("class") || "");
}
yg.prototype = {
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
function bg(e, t) {
  for (var n = Vu(e), r = -1, o = t.length; ++r < o; ) n.add(t[r]);
}
function wg(e, t) {
  for (var n = Vu(e), r = -1, o = t.length; ++r < o; ) n.remove(t[r]);
}
function $x(e) {
  return function() {
    bg(this, e);
  };
}
function Nx(e) {
  return function() {
    wg(this, e);
  };
}
function Rx(e, t) {
  return function() {
    (t.apply(this, arguments) ? bg : wg)(this, e);
  };
}
function Ox(e, t) {
  var n = pg(e + "");
  if (arguments.length < 2) {
    for (var r = Vu(this.node()), o = -1, i = n.length; ++o < i; ) if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Rx : t ? $x : Nx)(n, t));
}
function Bx() {
  this.textContent = "";
}
function Fx(e) {
  return function() {
    this.textContent = e;
  };
}
function Dx(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Hx(e) {
  return arguments.length ? this.each(e == null ? Bx : (typeof e == "function" ? Dx : Fx)(e)) : this.node().textContent;
}
function jx() {
  this.innerHTML = "";
}
function zx(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Gx(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ux(e) {
  return arguments.length ? this.each(e == null ? jx : (typeof e == "function" ? Gx : zx)(e)) : this.node().innerHTML;
}
function Wx() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function qx() {
  return this.each(Wx);
}
function Yx() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Kx() {
  return this.each(Yx);
}
function Xx(e) {
  var t = typeof e == "function" ? e : fg(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Zx() {
  return null;
}
function Jx(e, t) {
  var n = typeof e == "function" ? e : fg(e), r = t == null ? Zx : typeof t == "function" ? t : Eu(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Qx() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function e2() {
  return this.each(Qx);
}
function t2() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function n2() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function r2(e) {
  return this.select(e ? n2 : t2);
}
function o2(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function i2(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function l2(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function s2(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, o = t.length, i; n < o; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++r] = i;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function a2(e, t, n) {
  return function() {
    var r = this.__on, o, i = i2(t);
    if (r) {
      for (var l = 0, s = r.length; l < s; ++l)
        if ((o = r[l]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = i, o.options = n), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, i, n), o = { type: e.type, name: e.name, value: t, listener: i, options: n }, r ? r.push(o) : this.__on = [o];
  };
}
function u2(e, t, n) {
  var r = l2(e + ""), o, i = r.length, l;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var a = 0, u = s.length, c; a < u; ++a)
        for (o = 0, c = s[a]; o < i; ++o)
          if ((l = r[o]).type === c.type && l.name === c.name)
            return c.value;
    }
    return;
  }
  for (s = t ? a2 : s2, o = 0; o < i; ++o) this.each(s(r[o], t, n));
  return this;
}
function _g(e, t, n) {
  var r = mg(e), o = r.CustomEvent;
  typeof o == "function" ? o = new o(t, n) : (o = r.document.createEvent("Event"), n ? (o.initEvent(t, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function c2(e, t) {
  return function() {
    return _g(this, e, t);
  };
}
function f2(e, t) {
  return function() {
    return _g(this, e, t.apply(this, arguments));
  };
}
function d2(e, t) {
  return this.each((typeof t == "function" ? f2 : c2)(e, t));
}
function* h2() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length, l; o < i; ++o)
      (l = r[o]) && (yield l);
}
var xg = [null];
function Ht(e, t) {
  this._groups = e, this._parents = t;
}
function vi() {
  return new Ht([[document.documentElement]], xg);
}
function v2() {
  return this;
}
Ht.prototype = vi.prototype = {
  constructor: Ht,
  select: D_,
  selectAll: G_,
  selectChild: Y_,
  selectChildren: J_,
  filter: Q_,
  data: ix,
  enter: ex,
  exit: sx,
  join: ax,
  merge: ux,
  selection: v2,
  order: cx,
  sort: fx,
  call: hx,
  nodes: vx,
  node: gx,
  size: mx,
  empty: px,
  each: yx,
  attr: Cx,
  style: Px,
  property: Ax,
  classed: Ox,
  text: Hx,
  html: Ux,
  raise: qx,
  lower: Kx,
  append: Xx,
  insert: Jx,
  remove: e2,
  clone: r2,
  datum: o2,
  on: u2,
  dispatch: d2,
  [Symbol.iterator]: h2
};
function Ye(e) {
  return typeof e == "string" ? new Ht([[document.querySelector(e)]], [document.documentElement]) : new Ht([[e]], xg);
}
function kg(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Gt(e, t) {
  if (e = kg(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
function g2(e, t) {
  return e.target && (e = kg(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => Gt(n, t));
}
const m2 = { passive: !1 }, Ko = { capture: !0, passive: !1 };
function Ps(e) {
  e.stopImmediatePropagation();
}
function Jr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Sg(e) {
  var t = e.document.documentElement, n = Ye(e).on("dragstart.drag", Jr, Ko);
  "onselectstart" in t ? n.on("selectstart.drag", Jr, Ko) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Cg(e, t) {
  var n = e.document.documentElement, r = Ye(e).on("dragstart.drag", null);
  t && (r.on("click.drag", Jr, Ko), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Pi = (e) => () => e;
function ga(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: o,
  active: i,
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
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: o, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: l, enumerable: !0, configurable: !0 },
    y: { value: s, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
ga.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function p2(e) {
  return !e.ctrlKey && !e.button;
}
function y2() {
  return this.parentNode;
}
function b2(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function w2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _2() {
  var e = p2, t = y2, n = b2, r = w2, o = {}, i = hi("start", "drag", "end"), l = 0, s, a, u, c, d = 0;
  function f(b) {
    b.on("mousedown.drag", h).filter(r).on("touchstart.drag", p).on("touchmove.drag", m, m2).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, x) {
    if (!(c || !e.call(this, b, x))) {
      var E = _(this, t.call(this, b, x), b, x, "mouse");
      E && (Ye(b.view).on("mousemove.drag", v, Ko).on("mouseup.drag", g, Ko), Sg(b.view), Ps(b), u = !1, s = b.clientX, a = b.clientY, E("start", b));
    }
  }
  function v(b) {
    if (Jr(b), !u) {
      var x = b.clientX - s, E = b.clientY - a;
      u = x * x + E * E > d;
    }
    o.mouse("drag", b);
  }
  function g(b) {
    Ye(b.view).on("mousemove.drag mouseup.drag", null), Cg(b.view, u), Jr(b), o.mouse("end", b);
  }
  function p(b, x) {
    if (e.call(this, b, x)) {
      var E = b.changedTouches, S = t.call(this, b, x), T = E.length, A, R;
      for (A = 0; A < T; ++A)
        (R = _(this, S, b, x, E[A].identifier, E[A])) && (Ps(b), R("start", b, E[A]));
    }
  }
  function m(b) {
    var x = b.changedTouches, E = x.length, S, T;
    for (S = 0; S < E; ++S)
      (T = o[x[S].identifier]) && (Jr(b), T("drag", b, x[S]));
  }
  function w(b) {
    var x = b.changedTouches, E = x.length, S, T;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), S = 0; S < E; ++S)
      (T = o[x[S].identifier]) && (Ps(b), T("end", b, x[S]));
  }
  function _(b, x, E, S, T, A) {
    var R = i.copy(), D = Gt(A || E, x), L, I, k;
    if ((k = n.call(b, new ga("beforestart", {
      sourceEvent: E,
      target: f,
      identifier: T,
      active: l,
      x: D[0],
      y: D[1],
      dx: 0,
      dy: 0,
      dispatch: R
    }), S)) != null)
      return L = k.x - D[0] || 0, I = k.y - D[1] || 0, function O(M, j, N) {
        var F = D, B;
        switch (M) {
          case "start":
            o[T] = O, B = l++;
            break;
          case "end":
            delete o[T], --l;
          case "drag":
            D = Gt(N || j, x), B = l;
            break;
        }
        R.call(
          M,
          b,
          new ga(M, {
            sourceEvent: j,
            subject: k,
            target: f,
            identifier: T,
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
    return arguments.length ? (e = typeof b == "function" ? b : Pi(!!b), f) : e;
  }, f.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : Pi(b), f) : t;
  }, f.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : Pi(b), f) : n;
  }, f.touchable = function(b) {
    return arguments.length ? (r = typeof b == "function" ? b : Pi(!!b), f) : r;
  }, f.on = function() {
    var b = i.on.apply(i, arguments);
    return b === i ? f : b;
  }, f.clickDistance = function(b) {
    return arguments.length ? (d = (b = +b) * b, f) : Math.sqrt(d);
  }, f;
}
function Lu(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Eg(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function gi() {
}
var Xo = 0.7, bl = 1 / Xo, Qr = "\\s*([+-]?\\d+)\\s*", Zo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Sn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", x2 = /^#([0-9a-f]{3,8})$/, k2 = new RegExp(`^rgb\\(${Qr},${Qr},${Qr}\\)$`), S2 = new RegExp(`^rgb\\(${Sn},${Sn},${Sn}\\)$`), C2 = new RegExp(`^rgba\\(${Qr},${Qr},${Qr},${Zo}\\)$`), E2 = new RegExp(`^rgba\\(${Sn},${Sn},${Sn},${Zo}\\)$`), V2 = new RegExp(`^hsl\\(${Zo},${Sn},${Sn}\\)$`), L2 = new RegExp(`^hsla\\(${Zo},${Sn},${Sn},${Zo}\\)$`), Nf = {
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
Lu(gi, Lr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Rf,
  // Deprecated! Use color.formatHex.
  formatHex: Rf,
  formatHex8: P2,
  formatHsl: I2,
  formatRgb: Of,
  toString: Of
});
function Rf() {
  return this.rgb().formatHex();
}
function P2() {
  return this.rgb().formatHex8();
}
function I2() {
  return Vg(this).formatHsl();
}
function Of() {
  return this.rgb().formatRgb();
}
function Lr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = x2.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Bf(t) : n === 3 ? new Et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ii(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ii(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = k2.exec(e)) ? new Et(t[1], t[2], t[3], 1) : (t = S2.exec(e)) ? new Et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = C2.exec(e)) ? Ii(t[1], t[2], t[3], t[4]) : (t = E2.exec(e)) ? Ii(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = V2.exec(e)) ? Hf(t[1], t[2] / 100, t[3] / 100, 1) : (t = L2.exec(e)) ? Hf(t[1], t[2] / 100, t[3] / 100, t[4]) : Nf.hasOwnProperty(e) ? Bf(Nf[e]) : e === "transparent" ? new Et(NaN, NaN, NaN, 0) : null;
}
function Bf(e) {
  return new Et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ii(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Et(e, t, n, r);
}
function T2(e) {
  return e instanceof gi || (e = Lr(e)), e ? (e = e.rgb(), new Et(e.r, e.g, e.b, e.opacity)) : new Et();
}
function ma(e, t, n, r) {
  return arguments.length === 1 ? T2(e) : new Et(e, t, n, r ?? 1);
}
function Et(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Lu(Et, ma, Eg(gi, {
  brighter(e) {
    return e = e == null ? bl : Math.pow(bl, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xo : Math.pow(Xo, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Et(Cr(this.r), Cr(this.g), Cr(this.b), wl(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ff,
  // Deprecated! Use color.formatHex.
  formatHex: Ff,
  formatHex8: M2,
  formatRgb: Df,
  toString: Df
}));
function Ff() {
  return `#${br(this.r)}${br(this.g)}${br(this.b)}`;
}
function M2() {
  return `#${br(this.r)}${br(this.g)}${br(this.b)}${br((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Df() {
  const e = wl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Cr(this.r)}, ${Cr(this.g)}, ${Cr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function wl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Cr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function br(e) {
  return e = Cr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Hf(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new nn(e, t, n, r);
}
function Vg(e) {
  if (e instanceof nn) return new nn(e.h, e.s, e.l, e.opacity);
  if (e instanceof gi || (e = Lr(e)), !e) return new nn();
  if (e instanceof nn) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, o = Math.min(t, n, r), i = Math.max(t, n, r), l = NaN, s = i - o, a = (i + o) / 2;
  return s ? (t === i ? l = (n - r) / s + (n < r) * 6 : n === i ? l = (r - t) / s + 2 : l = (t - n) / s + 4, s /= a < 0.5 ? i + o : 2 - i - o, l *= 60) : s = a > 0 && a < 1 ? 0 : l, new nn(l, s, a, e.opacity);
}
function A2(e, t, n, r) {
  return arguments.length === 1 ? Vg(e) : new nn(e, t, n, r ?? 1);
}
function nn(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Lu(nn, A2, Eg(gi, {
  brighter(e) {
    return e = e == null ? bl : Math.pow(bl, e), new nn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xo : Math.pow(Xo, e), new nn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - r;
    return new Et(
      Is(e >= 240 ? e - 240 : e + 120, o, r),
      Is(e, o, r),
      Is(e < 120 ? e + 240 : e - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new nn(jf(this.h), Ti(this.s), Ti(this.l), wl(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = wl(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${jf(this.h)}, ${Ti(this.s) * 100}%, ${Ti(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function jf(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ti(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Is(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Pu = (e) => () => e;
function $2(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function N2(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function R2(e) {
  return (e = +e) == 1 ? Lg : function(t, n) {
    return n - t ? N2(t, n, e) : Pu(isNaN(t) ? n : t);
  };
}
function Lg(e, t) {
  var n = t - e;
  return n ? $2(e, n) : Pu(isNaN(e) ? t : e);
}
const _l = function e(t) {
  var n = R2(t);
  function r(o, i) {
    var l = n((o = ma(o)).r, (i = ma(i)).r), s = n(o.g, i.g), a = n(o.b, i.b), u = Lg(o.opacity, i.opacity);
    return function(c) {
      return o.r = l(c), o.g = s(c), o.b = a(c), o.opacity = u(c), o + "";
    };
  }
  return r.gamma = e, r;
}(1);
function O2(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), o;
  return function(i) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - i) + t[o] * i;
    return r;
  };
}
function B2(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function F2(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, o = new Array(r), i = new Array(n), l;
  for (l = 0; l < r; ++l) o[l] = Iu(e[l], t[l]);
  for (; l < n; ++l) i[l] = t[l];
  return function(s) {
    for (l = 0; l < r; ++l) i[l] = o[l](s);
    return i;
  };
}
function D2(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function _n(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function H2(e, t) {
  var n = {}, r = {}, o;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (o in t)
    o in e ? n[o] = Iu(e[o], t[o]) : r[o] = t[o];
  return function(i) {
    for (o in n) r[o] = n[o](i);
    return r;
  };
}
var pa = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ts = new RegExp(pa.source, "g");
function j2(e) {
  return function() {
    return e;
  };
}
function z2(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Pg(e, t) {
  var n = pa.lastIndex = Ts.lastIndex = 0, r, o, i, l = -1, s = [], a = [];
  for (e = e + "", t = t + ""; (r = pa.exec(e)) && (o = Ts.exec(t)); )
    (i = o.index) > n && (i = t.slice(n, i), s[l] ? s[l] += i : s[++l] = i), (r = r[0]) === (o = o[0]) ? s[l] ? s[l] += o : s[++l] = o : (s[++l] = null, a.push({ i: l, x: _n(r, o) })), n = Ts.lastIndex;
  return n < t.length && (i = t.slice(n), s[l] ? s[l] += i : s[++l] = i), s.length < 2 ? a[0] ? z2(a[0].x) : j2(t) : (t = a.length, function(u) {
    for (var c = 0, d; c < t; ++c) s[(d = a[c]).i] = d.x(u);
    return s.join("");
  });
}
function Iu(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? Pu(t) : (n === "number" ? _n : n === "string" ? (r = Lr(t)) ? (t = r, _l) : Pg : t instanceof Lr ? _l : t instanceof Date ? D2 : B2(t) ? O2 : Array.isArray(t) ? F2 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? H2 : _n)(e, t);
}
var zf = 180 / Math.PI, ya = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ig(e, t, n, r, o, i) {
  var l, s, a;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (a = e * n + t * r) && (n -= e * a, r -= t * a), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, a /= s), e * r < t * n && (e = -e, t = -t, a = -a, l = -l), {
    translateX: o,
    translateY: i,
    rotate: Math.atan2(t, e) * zf,
    skewX: Math.atan(a) * zf,
    scaleX: l,
    scaleY: s
  };
}
var Mi;
function G2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ya : Ig(t.a, t.b, t.c, t.d, t.e, t.f);
}
function U2(e) {
  return e == null || (Mi || (Mi = document.createElementNS("http://www.w3.org/2000/svg", "g")), Mi.setAttribute("transform", e), !(e = Mi.transform.baseVal.consolidate())) ? ya : (e = e.matrix, Ig(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Tg(e, t, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function i(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var g = h.push("translate(", null, t, null, n);
      v.push({ i: g - 4, x: _n(u, d) }, { i: g - 2, x: _n(c, f) });
    } else (d || f) && h.push("translate(" + d + t + f + n);
  }
  function l(u, c, d, f) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), f.push({ i: d.push(o(d) + "rotate(", null, r) - 2, x: _n(u, c) })) : c && d.push(o(d) + "rotate(" + c + r);
  }
  function s(u, c, d, f) {
    u !== c ? f.push({ i: d.push(o(d) + "skewX(", null, r) - 2, x: _n(u, c) }) : c && d.push(o(d) + "skewX(" + c + r);
  }
  function a(u, c, d, f, h, v) {
    if (u !== d || c !== f) {
      var g = h.push(o(h) + "scale(", null, ",", null, ")");
      v.push({ i: g - 4, x: _n(u, d) }, { i: g - 2, x: _n(c, f) });
    } else (d !== 1 || f !== 1) && h.push(o(h) + "scale(" + d + "," + f + ")");
  }
  return function(u, c) {
    var d = [], f = [];
    return u = e(u), c = e(c), i(u.translateX, u.translateY, c.translateX, c.translateY, d, f), l(u.rotate, c.rotate, d, f), s(u.skewX, c.skewX, d, f), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, d, f), u = c = null, function(h) {
      for (var v = -1, g = f.length, p; ++v < g; ) d[(p = f[v]).i] = p.x(h);
      return d.join("");
    };
  };
}
var W2 = Tg(G2, "px, ", "px)", "deg)"), q2 = Tg(U2, ", ", ")", ")"), Y2 = 1e-12;
function Gf(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function K2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function X2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Z2 = function e(t, n, r) {
  function o(i, l) {
    var s = i[0], a = i[1], u = i[2], c = l[0], d = l[1], f = l[2], h = c - s, v = d - a, g = h * h + v * v, p, m;
    if (g < Y2)
      m = Math.log(f / u) / t, p = function(S) {
        return [
          s + S * h,
          a + S * v,
          u * Math.exp(t * S * m)
        ];
      };
    else {
      var w = Math.sqrt(g), _ = (f * f - u * u + r * g) / (2 * u * n * w), b = (f * f - u * u - r * g) / (2 * f * n * w), x = Math.log(Math.sqrt(_ * _ + 1) - _), E = Math.log(Math.sqrt(b * b + 1) - b);
      m = (E - x) / t, p = function(S) {
        var T = S * m, A = Gf(x), R = u / (n * w) * (A * X2(t * T + x) - K2(x));
        return [
          s + R * h,
          a + R * v,
          u * A / Gf(t * T + x)
        ];
      };
    }
    return p.duration = m * 1e3 * t / Math.SQRT2, p;
  }
  return o.rho = function(i) {
    var l = Math.max(1e-3, +i), s = l * l, a = s * s;
    return e(l, s, a);
  }, o;
}(Math.SQRT2, 2, 4);
var so = 0, Eo = 0, _o = 0, Mg = 1e3, xl, Vo, kl = 0, Pr = 0, rs = 0, Jo = typeof performance == "object" && performance.now ? performance : Date, Ag = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Tu() {
  return Pr || (Ag(J2), Pr = Jo.now() + rs);
}
function J2() {
  Pr = 0;
}
function Sl() {
  this._call = this._time = this._next = null;
}
Sl.prototype = Mu.prototype = {
  constructor: Sl,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Tu() : +n) + (t == null ? 0 : +t), !this._next && Vo !== this && (Vo ? Vo._next = this : xl = this, Vo = this), this._call = e, this._time = n, ba();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ba());
  }
};
function Mu(e, t, n) {
  var r = new Sl();
  return r.restart(e, t, n), r;
}
function Q2() {
  Tu(), ++so;
  for (var e = xl, t; e; )
    (t = Pr - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --so;
}
function Uf() {
  Pr = (kl = Jo.now()) + rs, so = Eo = 0;
  try {
    Q2();
  } finally {
    so = 0, tk(), Pr = 0;
  }
}
function ek() {
  var e = Jo.now(), t = e - kl;
  t > Mg && (rs -= t, kl = e);
}
function tk() {
  for (var e, t = xl, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : xl = n);
  Vo = e, ba(r);
}
function ba(e) {
  if (!so) {
    Eo && (Eo = clearTimeout(Eo));
    var t = e - Pr;
    t > 24 ? (e < 1 / 0 && (Eo = setTimeout(Uf, e - Jo.now() - rs)), _o && (_o = clearInterval(_o))) : (_o || (kl = Jo.now(), _o = setInterval(ek, Mg)), so = 1, Ag(Uf));
  }
}
function Wf(e, t, n) {
  var r = new Sl();
  return t = t == null ? 0 : +t, r.restart((o) => {
    r.stop(), e(o + t);
  }, t, n), r;
}
var nk = hi("start", "end", "cancel", "interrupt"), rk = [], $g = 0, qf = 1, wa = 2, Wi = 3, Yf = 4, _a = 5, qi = 6;
function os(e, t, n, r, o, i) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  ok(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: nk,
    tween: rk,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: $g
  });
}
function Au(e, t) {
  var n = mn(e, t);
  if (n.state > $g) throw new Error("too late; already scheduled");
  return n;
}
function Ln(e, t) {
  var n = mn(e, t);
  if (n.state > Wi) throw new Error("too late; already running");
  return n;
}
function mn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function ok(e, t, n) {
  var r = e.__transition, o;
  r[t] = n, n.timer = Mu(i, 0, n.time);
  function i(u) {
    n.state = qf, n.timer.restart(l, n.delay, n.time), n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, d, f, h;
    if (n.state !== qf) return a();
    for (c in r)
      if (h = r[c], h.name === n.name) {
        if (h.state === Wi) return Wf(l);
        h.state === Yf ? (h.state = qi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[c]) : +c < t && (h.state = qi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[c]);
      }
    if (Wf(function() {
      n.state === Wi && (n.state = Yf, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = wa, n.on.call("start", e, e.__data__, n.index, n.group), n.state === wa) {
      for (n.state = Wi, o = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (o[++d] = h);
      o.length = d + 1;
    }
  }
  function s(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = _a, 1), d = -1, f = o.length; ++d < f; )
      o[d].call(e, c);
    n.state === _a && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = qi, n.timer.stop(), delete r[t];
    for (var u in r) return;
    delete e.__transition;
  }
}
function Yi(e, t) {
  var n = e.__transition, r, o, i = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((r = n[l]).name !== t) {
        i = !1;
        continue;
      }
      o = r.state > wa && r.state < _a, r.state = qi, r.timer.stop(), r.on.call(o ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[l];
    }
    i && delete e.__transition;
  }
}
function ik(e) {
  return this.each(function() {
    Yi(this, e);
  });
}
function lk(e, t) {
  var n, r;
  return function() {
    var o = Ln(this, e), i = o.tween;
    if (i !== n) {
      r = n = i;
      for (var l = 0, s = r.length; l < s; ++l)
        if (r[l].name === t) {
          r = r.slice(), r.splice(l, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function sk(e, t, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = Ln(this, e), l = i.tween;
    if (l !== r) {
      o = (r = l).slice();
      for (var s = { name: t, value: n }, a = 0, u = o.length; a < u; ++a)
        if (o[a].name === t) {
          o[a] = s;
          break;
        }
      a === u && o.push(s);
    }
    i.tween = o;
  };
}
function ak(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = mn(this.node(), n).tween, o = 0, i = r.length, l; o < i; ++o)
      if ((l = r[o]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? lk : sk)(n, e, t));
}
function $u(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var o = Ln(this, r);
    (o.value || (o.value = {}))[t] = n.apply(this, arguments);
  }), function(o) {
    return mn(o, r).value[t];
  };
}
function Ng(e, t) {
  var n;
  return (typeof t == "number" ? _n : t instanceof Lr ? _l : (n = Lr(t)) ? (t = n, _l) : Pg)(e, t);
}
function uk(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ck(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function fk(e, t, n) {
  var r, o = n + "", i;
  return function() {
    var l = this.getAttribute(e);
    return l === o ? null : l === r ? i : i = t(r = l, n);
  };
}
function dk(e, t, n) {
  var r, o = n + "", i;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === o ? null : l === r ? i : i = t(r = l, n);
  };
}
function hk(e, t, n) {
  var r, o, i;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), a = s + "", l === a ? null : l === r && a === o ? i : (o = a, i = t(r = l, s)));
  };
}
function vk(e, t, n) {
  var r, o, i;
  return function() {
    var l, s = n(this), a;
    return s == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), a = s + "", l === a ? null : l === r && a === o ? i : (o = a, i = t(r = l, s)));
  };
}
function gk(e, t) {
  var n = ns(e), r = n === "transform" ? q2 : Ng;
  return this.attrTween(e, typeof t == "function" ? (n.local ? vk : hk)(n, r, $u(this, "attr." + e, t)) : t == null ? (n.local ? ck : uk)(n) : (n.local ? dk : fk)(n, r, t));
}
function mk(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function pk(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function yk(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return i !== r && (n = (r = i) && pk(e, i)), n;
  }
  return o._value = t, o;
}
function bk(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return i !== r && (n = (r = i) && mk(e, i)), n;
  }
  return o._value = t, o;
}
function wk(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = ns(e);
  return this.tween(n, (r.local ? yk : bk)(r, t));
}
function _k(e, t) {
  return function() {
    Au(this, e).delay = +t.apply(this, arguments);
  };
}
function xk(e, t) {
  return t = +t, function() {
    Au(this, e).delay = t;
  };
}
function kk(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _k : xk)(t, e)) : mn(this.node(), t).delay;
}
function Sk(e, t) {
  return function() {
    Ln(this, e).duration = +t.apply(this, arguments);
  };
}
function Ck(e, t) {
  return t = +t, function() {
    Ln(this, e).duration = t;
  };
}
function Ek(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Sk : Ck)(t, e)) : mn(this.node(), t).duration;
}
function Vk(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ln(this, e).ease = t;
  };
}
function Lk(e) {
  var t = this._id;
  return arguments.length ? this.each(Vk(t, e)) : mn(this.node(), t).ease;
}
function Pk(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ln(this, e).ease = n;
  };
}
function Ik(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Pk(this._id, e));
}
function Tk(e) {
  typeof e != "function" && (e = hg(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], l = i.length, s = r[o] = [], a, u = 0; u < l; ++u)
      (a = i[u]) && e.call(a, a.__data__, u, i) && s.push(a);
  return new Bn(r, this._parents, this._name, this._id);
}
function Mk(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, o = n.length, i = Math.min(r, o), l = new Array(r), s = 0; s < i; ++s)
    for (var a = t[s], u = n[s], c = a.length, d = l[s] = new Array(c), f, h = 0; h < c; ++h)
      (f = a[h] || u[h]) && (d[h] = f);
  for (; s < r; ++s)
    l[s] = t[s];
  return new Bn(l, this._parents, this._name, this._id);
}
function Ak(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function $k(e, t, n) {
  var r, o, i = Ak(t) ? Au : Ln;
  return function() {
    var l = i(this, e), s = l.on;
    s !== r && (o = (r = s).copy()).on(t, n), l.on = o;
  };
}
function Nk(e, t) {
  var n = this._id;
  return arguments.length < 2 ? mn(this.node(), n).on.on(e) : this.each($k(n, e, t));
}
function Rk(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Ok() {
  return this.on("end.remove", Rk(this._id));
}
function Bk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Eu(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var s = r[l], a = s.length, u = i[l] = new Array(a), c, d, f = 0; f < a; ++f)
      (c = s[f]) && (d = e.call(c, c.__data__, f, s)) && ("__data__" in c && (d.__data__ = c.__data__), u[f] = d, os(u[f], t, n, f, u, mn(c, n)));
  return new Bn(i, this._parents, t, n);
}
function Fk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = dg(e));
  for (var r = this._groups, o = r.length, i = [], l = [], s = 0; s < o; ++s)
    for (var a = r[s], u = a.length, c, d = 0; d < u; ++d)
      if (c = a[d]) {
        for (var f = e.call(c, c.__data__, d, a), h, v = mn(c, n), g = 0, p = f.length; g < p; ++g)
          (h = f[g]) && os(h, t, n, g, f, v);
        i.push(f), l.push(c);
      }
  return new Bn(i, l, t, n);
}
var Dk = vi.prototype.constructor;
function Hk() {
  return new Dk(this._groups, this._parents);
}
function jk(e, t) {
  var n, r, o;
  return function() {
    var i = lo(this, e), l = (this.style.removeProperty(e), lo(this, e));
    return i === l ? null : i === n && l === r ? o : o = t(n = i, r = l);
  };
}
function Rg(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function zk(e, t, n) {
  var r, o = n + "", i;
  return function() {
    var l = lo(this, e);
    return l === o ? null : l === r ? i : i = t(r = l, n);
  };
}
function Gk(e, t, n) {
  var r, o, i;
  return function() {
    var l = lo(this, e), s = n(this), a = s + "";
    return s == null && (a = s = (this.style.removeProperty(e), lo(this, e))), l === a ? null : l === r && a === o ? i : (o = a, i = t(r = l, s));
  };
}
function Uk(e, t) {
  var n, r, o, i = "style." + t, l = "end." + i, s;
  return function() {
    var a = Ln(this, e), u = a.on, c = a.value[i] == null ? s || (s = Rg(t)) : void 0;
    (u !== n || o !== c) && (r = (n = u).copy()).on(l, o = c), a.on = r;
  };
}
function Wk(e, t, n) {
  var r = (e += "") == "transform" ? W2 : Ng;
  return t == null ? this.styleTween(e, jk(e, r)).on("end.style." + e, Rg(e)) : typeof t == "function" ? this.styleTween(e, Gk(e, r, $u(this, "style." + e, t))).each(Uk(this._id, e)) : this.styleTween(e, zk(e, r, t), n).on("end.style." + e, null);
}
function qk(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function Yk(e, t, n) {
  var r, o;
  function i() {
    var l = t.apply(this, arguments);
    return l !== o && (r = (o = l) && qk(e, l, n)), r;
  }
  return i._value = t, i;
}
function Kk(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, Yk(e, t, n ?? ""));
}
function Xk(e) {
  return function() {
    this.textContent = e;
  };
}
function Zk(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Jk(e) {
  return this.tween("text", typeof e == "function" ? Zk($u(this, "text", e)) : Xk(e == null ? "" : e + ""));
}
function Qk(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function eS(e) {
  var t, n;
  function r() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && Qk(o)), t;
  }
  return r._value = e, r;
}
function tS(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, eS(e));
}
function nS() {
  for (var e = this._name, t = this._id, n = Og(), r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var l = r[i], s = l.length, a, u = 0; u < s; ++u)
      if (a = l[u]) {
        var c = mn(a, t);
        os(a, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Bn(r, this._parents, e, n);
}
function rS() {
  var e, t, n = this, r = n._id, o = n.size();
  return new Promise(function(i, l) {
    var s = { value: l }, a = { value: function() {
      --o === 0 && i();
    } };
    n.each(function() {
      var u = Ln(this, r), c = u.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(a)), u.on = t;
    }), o === 0 && i();
  });
}
var oS = 0;
function Bn(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Og() {
  return ++oS;
}
var Pn = vi.prototype;
Bn.prototype = {
  constructor: Bn,
  select: Bk,
  selectAll: Fk,
  selectChild: Pn.selectChild,
  selectChildren: Pn.selectChildren,
  filter: Tk,
  merge: Mk,
  selection: Hk,
  transition: nS,
  call: Pn.call,
  nodes: Pn.nodes,
  node: Pn.node,
  size: Pn.size,
  empty: Pn.empty,
  each: Pn.each,
  on: Nk,
  attr: gk,
  attrTween: wk,
  style: Wk,
  styleTween: Kk,
  text: Jk,
  textTween: tS,
  remove: Ok,
  tween: ak,
  delay: kk,
  duration: Ek,
  ease: Lk,
  easeVarying: Ik,
  end: rS,
  [Symbol.iterator]: Pn[Symbol.iterator]
};
const iS = (e) => +e;
function lS(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var sS = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: lS
};
function aS(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function uS(e) {
  var t, n;
  e instanceof Bn ? (t = e._id, e = e._name) : (t = Og(), (n = sS).time = Tu(), e = e == null ? null : e + "");
  for (var r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var l = r[i], s = l.length, a, u = 0; u < s; ++u)
      (a = l[u]) && os(a, e, t, u, l, n || aS(a, t));
  return new Bn(r, this._parents, e, t);
}
vi.prototype.interrupt = ik;
vi.prototype.transition = uS;
const xa = Math.PI, ka = 2 * xa, hr = 1e-6, cS = ka - hr;
function Bg(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function fS(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Bg;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let o = 1, i = r.length; o < i; ++o)
      this._ += Math.round(arguments[o] * n) / n + r[o];
  };
}
class dS {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Bg : fS(t);
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
  quadraticCurveTo(t, n, r, o) {
    this._append`Q${+t},${+n},${this._x1 = +r},${this._y1 = +o}`;
  }
  bezierCurveTo(t, n, r, o, i, l) {
    this._append`C${+t},${+n},${+r},${+o},${this._x1 = +i},${this._y1 = +l}`;
  }
  arcTo(t, n, r, o, i) {
    if (t = +t, n = +n, r = +r, o = +o, i = +i, i < 0) throw new Error(`negative radius: ${i}`);
    let l = this._x1, s = this._y1, a = r - t, u = o - n, c = l - t, d = s - n, f = c * c + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (f > hr) if (!(Math.abs(d * a - u * c) > hr) || !i)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let h = r - l, v = o - s, g = a * a + u * u, p = h * h + v * v, m = Math.sqrt(g), w = Math.sqrt(f), _ = i * Math.tan((xa - Math.acos((g + f - p) / (2 * m * w))) / 2), b = _ / w, x = _ / m;
      Math.abs(b - 1) > hr && this._append`L${t + b * c},${n + b * d}`, this._append`A${i},${i},0,0,${+(d * h > c * v)},${this._x1 = t + x * a},${this._y1 = n + x * u}`;
    }
  }
  arc(t, n, r, o, i, l) {
    if (t = +t, n = +n, r = +r, l = !!l, r < 0) throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(o), a = r * Math.sin(o), u = t + s, c = n + a, d = 1 ^ l, f = l ? o - i : i - o;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > hr || Math.abs(this._y1 - c) > hr) && this._append`L${u},${c}`, r && (f < 0 && (f = f % ka + ka), f > cS ? this._append`A${r},${r},0,1,${d},${t - s},${n - a}A${r},${r},0,1,${d},${this._x1 = u},${this._y1 = c}` : f > hr && this._append`A${r},${r},0,${+(f >= xa)},${d},${this._x1 = t + r * Math.cos(i)},${this._y1 = n + r * Math.sin(i)}`);
  }
  rect(t, n, r, o) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+o}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function hS(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Fg(this.cover(t, n), t, n, e);
}
function Fg(e, t, n, r) {
  if (isNaN(t) || isNaN(n)) return e;
  var o, i = e._root, l = { data: r }, s = e._x0, a = e._y0, u = e._x1, c = e._y1, d, f, h, v, g, p, m, w;
  if (!i) return e._root = l, e;
  for (; i.length; )
    if ((g = t >= (d = (s + u) / 2)) ? s = d : u = d, (p = n >= (f = (a + c) / 2)) ? a = f : c = f, o = i, !(i = i[m = p << 1 | g])) return o[m] = l, e;
  if (h = +e._x.call(null, i.data), v = +e._y.call(null, i.data), t === h && n === v) return l.next = i, o ? o[m] = l : e._root = l, e;
  do
    o = o ? o[m] = new Array(4) : e._root = new Array(4), (g = t >= (d = (s + u) / 2)) ? s = d : u = d, (p = n >= (f = (a + c) / 2)) ? a = f : c = f;
  while ((m = p << 1 | g) === (w = (v >= f) << 1 | h >= d));
  return o[w] = i, o[m] = l, e;
}
function vS(e) {
  var t, n, r = e.length, o, i, l = new Array(r), s = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(o = +this._x.call(null, t = e[n])) || isNaN(i = +this._y.call(null, t)) || (l[n] = o, s[n] = i, o < a && (a = o), o > c && (c = o), i < u && (u = i), i > d && (d = i));
  if (a > c || u > d) return this;
  for (this.cover(a, u).cover(c, d), n = 0; n < r; ++n)
    Fg(this, l[n], s[n], e[n]);
  return this;
}
function gS(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, r = this._y0, o = this._x1, i = this._y1;
  if (isNaN(n))
    o = (n = Math.floor(e)) + 1, i = (r = Math.floor(t)) + 1;
  else {
    for (var l = o - n || 1, s = this._root, a, u; n > e || e >= o || r > t || t >= i; )
      switch (u = (t < r) << 1 | e < n, a = new Array(4), a[u] = s, s = a, l *= 2, u) {
        case 0:
          o = n + l, i = r + l;
          break;
        case 1:
          n = o - l, i = r + l;
          break;
        case 2:
          o = n + l, r = i - l;
          break;
        case 3:
          n = o - l, r = i - l;
          break;
      }
    this._root && this._root.length && (this._root = s);
  }
  return this._x0 = n, this._y0 = r, this._x1 = o, this._y1 = i, this;
}
function mS() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function pS(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function gt(e, t, n, r, o) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = o;
}
function yS(e, t, n) {
  var r, o = this._x0, i = this._y0, l, s, a, u, c = this._x1, d = this._y1, f = [], h = this._root, v, g;
  for (h && f.push(new gt(h, o, i, c, d)), n == null ? n = 1 / 0 : (o = e - n, i = t - n, c = e + n, d = t + n, n *= n); v = f.pop(); )
    if (!(!(h = v.node) || (l = v.x0) > c || (s = v.y0) > d || (a = v.x1) < o || (u = v.y1) < i))
      if (h.length) {
        var p = (l + a) / 2, m = (s + u) / 2;
        f.push(
          new gt(h[3], p, m, a, u),
          new gt(h[2], l, m, p, u),
          new gt(h[1], p, s, a, m),
          new gt(h[0], l, s, p, m)
        ), (g = (t >= m) << 1 | e >= p) && (v = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - g], f[f.length - 1 - g] = v);
      } else {
        var w = e - +this._x.call(null, h.data), _ = t - +this._y.call(null, h.data), b = w * w + _ * _;
        if (b < n) {
          var x = Math.sqrt(n = b);
          o = e - x, i = t - x, c = e + x, d = t + x, r = h.data;
        }
      }
  return r;
}
function bS(e) {
  if (isNaN(c = +this._x.call(null, e)) || isNaN(d = +this._y.call(null, e))) return this;
  var t, n = this._root, r, o, i, l = this._x0, s = this._y0, a = this._x1, u = this._y1, c, d, f, h, v, g, p, m;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((v = c >= (f = (l + a) / 2)) ? l = f : a = f, (g = d >= (h = (s + u) / 2)) ? s = h : u = h, t = n, !(n = n[p = g << 1 | v])) return this;
    if (!n.length) break;
    (t[p + 1 & 3] || t[p + 2 & 3] || t[p + 3 & 3]) && (r = t, m = p);
  }
  for (; n.data !== e; ) if (o = n, !(n = n.next)) return this;
  return (i = n.next) && delete n.next, o ? (i ? o.next = i : delete o.next, this) : t ? (i ? t[p] = i : delete t[p], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[m] = n : this._root = n), this) : (this._root = i, this);
}
function wS(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function _S() {
  return this._root;
}
function xS() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function kS(e) {
  var t = [], n, r = this._root, o, i, l, s, a;
  for (r && t.push(new gt(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, i = n.x0, l = n.y0, s = n.x1, a = n.y1) && r.length) {
      var u = (i + s) / 2, c = (l + a) / 2;
      (o = r[3]) && t.push(new gt(o, u, c, s, a)), (o = r[2]) && t.push(new gt(o, i, c, u, a)), (o = r[1]) && t.push(new gt(o, u, l, s, c)), (o = r[0]) && t.push(new gt(o, i, l, u, c));
    }
  return this;
}
function SS(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new gt(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var o = r.node;
    if (o.length) {
      var i, l = r.x0, s = r.y0, a = r.x1, u = r.y1, c = (l + a) / 2, d = (s + u) / 2;
      (i = o[0]) && t.push(new gt(i, l, s, c, d)), (i = o[1]) && t.push(new gt(i, c, s, a, d)), (i = o[2]) && t.push(new gt(i, l, d, c, u)), (i = o[3]) && t.push(new gt(i, c, d, a, u));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function CS(e) {
  return e[0];
}
function ES(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function VS(e) {
  return e[1];
}
function LS(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Nu(e, t, n) {
  var r = new Ru(t ?? CS, n ?? VS, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function Ru(e, t, n, r, o, i) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = o, this._y1 = i, this._root = void 0;
}
function Kf(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var _t = Nu.prototype = Ru.prototype;
_t.copy = function() {
  var e = new Ru(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t) return e;
  if (!t.length) return e._root = Kf(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var o = 0; o < 4; ++o)
      (r = t.source[o]) && (r.length ? n.push({ source: r, target: t.target[o] = new Array(4) }) : t.target[o] = Kf(r));
  return e;
};
_t.add = hS;
_t.addAll = vS;
_t.cover = gS;
_t.data = mS;
_t.extent = pS;
_t.find = yS;
_t.remove = bS;
_t.removeAll = wS;
_t.root = _S;
_t.size = xS;
_t.visit = kS;
_t.visitAfter = SS;
_t.x = ES;
_t.y = LS;
function pt(e) {
  return function() {
    return e;
  };
}
function Qn(e) {
  return (e() - 0.5) * 1e-6;
}
function PS(e) {
  return e.x + e.vx;
}
function IS(e) {
  return e.y + e.vy;
}
function TS(e) {
  var t, n, r, o = 1, i = 1;
  typeof e != "function" && (e = pt(e == null ? 1 : +e));
  function l() {
    for (var u, c = t.length, d, f, h, v, g, p, m = 0; m < i; ++m)
      for (d = Nu(t, PS, IS).visitAfter(s), u = 0; u < c; ++u)
        f = t[u], g = n[f.index], p = g * g, h = f.x + f.vx, v = f.y + f.vy, d.visit(w);
    function w(_, b, x, E, S) {
      var T = _.data, A = _.r, R = g + A;
      if (T) {
        if (T.index > f.index) {
          var D = h - T.x - T.vx, L = v - T.y - T.vy, I = D * D + L * L;
          I < R * R && (D === 0 && (D = Qn(r), I += D * D), L === 0 && (L = Qn(r), I += L * L), I = (R - (I = Math.sqrt(I))) / I * o, f.vx += (D *= I) * (R = (A *= A) / (p + A)), f.vy += (L *= I) * R, T.vx -= D * (R = 1 - R), T.vy -= L * R);
        }
        return;
      }
      return b > h + R || E < h - R || x > v + R || S < v - R;
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
    t = u, r = c, a();
  }, l.iterations = function(u) {
    return arguments.length ? (i = +u, l) : i;
  }, l.strength = function(u) {
    return arguments.length ? (o = +u, l) : o;
  }, l.radius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : pt(+u), a(), l) : e;
  }, l;
}
function MS(e) {
  return e.index;
}
function Xf(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function AS(e) {
  var t = MS, n = d, r, o = pt(30), i, l, s, a, u, c = 1;
  e == null && (e = []);
  function d(p) {
    return 1 / Math.min(s[p.source.index], s[p.target.index]);
  }
  function f(p) {
    for (var m = 0, w = e.length; m < c; ++m)
      for (var _ = 0, b, x, E, S, T, A, R; _ < w; ++_)
        b = e[_], x = b.source, E = b.target, S = E.x + E.vx - x.x - x.vx || Qn(u), T = E.y + E.vy - x.y - x.vy || Qn(u), A = Math.sqrt(S * S + T * T), A = (A - i[_]) / A * p * r[_], S *= A, T *= A, E.vx -= S * (R = a[_]), E.vy -= T * R, x.vx += S * (R = 1 - R), x.vy += T * R;
  }
  function h() {
    if (l) {
      var p, m = l.length, w = e.length, _ = new Map(l.map((x, E) => [t(x, E, l), x])), b;
      for (p = 0, s = new Array(m); p < w; ++p)
        b = e[p], b.index = p, typeof b.source != "object" && (b.source = Xf(_, b.source)), typeof b.target != "object" && (b.target = Xf(_, b.target)), s[b.source.index] = (s[b.source.index] || 0) + 1, s[b.target.index] = (s[b.target.index] || 0) + 1;
      for (p = 0, a = new Array(w); p < w; ++p)
        b = e[p], a[p] = s[b.source.index] / (s[b.source.index] + s[b.target.index]);
      r = new Array(w), v(), i = new Array(w), g();
    }
  }
  function v() {
    if (l)
      for (var p = 0, m = e.length; p < m; ++p)
        r[p] = +n(e[p], p, e);
  }
  function g() {
    if (l)
      for (var p = 0, m = e.length; p < m; ++p)
        i[p] = +o(e[p], p, e);
  }
  return f.initialize = function(p, m) {
    l = p, u = m, h();
  }, f.links = function(p) {
    return arguments.length ? (e = p, h(), f) : e;
  }, f.id = function(p) {
    return arguments.length ? (t = p, f) : t;
  }, f.iterations = function(p) {
    return arguments.length ? (c = +p, f) : c;
  }, f.strength = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : pt(+p), v(), f) : n;
  }, f.distance = function(p) {
    return arguments.length ? (o = typeof p == "function" ? p : pt(+p), g(), f) : o;
  }, f;
}
const $S = 1664525, NS = 1013904223, Zf = 4294967296;
function RS() {
  let e = 1;
  return () => (e = ($S * e + NS) % Zf) / Zf;
}
function OS(e) {
  return e.x;
}
function BS(e) {
  return e.y;
}
var FS = 10, DS = Math.PI * (3 - Math.sqrt(5));
function HS(e) {
  var t, n = 1, r = 1e-3, o = 1 - Math.pow(r, 1 / 300), i = 0, l = 0.6, s = /* @__PURE__ */ new Map(), a = Mu(d), u = hi("tick", "end"), c = RS();
  e == null && (e = []);
  function d() {
    f(), u.call("tick", t), n < r && (a.stop(), u.call("end", t));
  }
  function f(g) {
    var p, m = e.length, w;
    g === void 0 && (g = 1);
    for (var _ = 0; _ < g; ++_)
      for (n += (i - n) * o, s.forEach(function(b) {
        b(n);
      }), p = 0; p < m; ++p)
        w = e[p], w.fx == null ? w.x += w.vx *= l : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= l : (w.y = w.fy, w.vy = 0);
    return t;
  }
  function h() {
    for (var g = 0, p = e.length, m; g < p; ++g) {
      if (m = e[g], m.index = g, m.fx != null && (m.x = m.fx), m.fy != null && (m.y = m.fy), isNaN(m.x) || isNaN(m.y)) {
        var w = FS * Math.sqrt(0.5 + g), _ = g * DS;
        m.x = w * Math.cos(_), m.y = w * Math.sin(_);
      }
      (isNaN(m.vx) || isNaN(m.vy)) && (m.vx = m.vy = 0);
    }
  }
  function v(g) {
    return g.initialize && g.initialize(e, c), g;
  }
  return h(), t = {
    tick: f,
    restart: function() {
      return a.restart(d), t;
    },
    stop: function() {
      return a.stop(), t;
    },
    nodes: function(g) {
      return arguments.length ? (e = g, h(), s.forEach(v), t) : e;
    },
    alpha: function(g) {
      return arguments.length ? (n = +g, t) : n;
    },
    alphaMin: function(g) {
      return arguments.length ? (r = +g, t) : r;
    },
    alphaDecay: function(g) {
      return arguments.length ? (o = +g, t) : +o;
    },
    alphaTarget: function(g) {
      return arguments.length ? (i = +g, t) : i;
    },
    velocityDecay: function(g) {
      return arguments.length ? (l = 1 - g, t) : 1 - l;
    },
    randomSource: function(g) {
      return arguments.length ? (c = g, s.forEach(v), t) : c;
    },
    force: function(g, p) {
      return arguments.length > 1 ? (p == null ? s.delete(g) : s.set(g, v(p)), t) : s.get(g);
    },
    find: function(g, p, m) {
      var w = 0, _ = e.length, b, x, E, S, T;
      for (m == null ? m = 1 / 0 : m *= m, w = 0; w < _; ++w)
        S = e[w], b = g - S.x, x = p - S.y, E = b * b + x * x, E < m && (T = S, m = E);
      return T;
    },
    on: function(g, p) {
      return arguments.length > 1 ? (u.on(g, p), t) : u.on(g);
    }
  };
}
function jS() {
  var e, t, n, r, o = pt(-30), i, l = 1, s = 1 / 0, a = 0.81;
  function u(h) {
    var v, g = e.length, p = Nu(e, OS, BS).visitAfter(d);
    for (r = h, v = 0; v < g; ++v) t = e[v], p.visit(f);
  }
  function c() {
    if (e) {
      var h, v = e.length, g;
      for (i = new Array(v), h = 0; h < v; ++h) g = e[h], i[g.index] = +o(g, h, e);
    }
  }
  function d(h) {
    var v = 0, g, p, m = 0, w, _, b;
    if (h.length) {
      for (w = _ = b = 0; b < 4; ++b)
        (g = h[b]) && (p = Math.abs(g.value)) && (v += g.value, m += p, w += p * g.x, _ += p * g.y);
      h.x = w / m, h.y = _ / m;
    } else {
      g = h, g.x = g.data.x, g.y = g.data.y;
      do
        v += i[g.data.index];
      while (g = g.next);
    }
    h.value = v;
  }
  function f(h, v, g, p) {
    if (!h.value) return !0;
    var m = h.x - t.x, w = h.y - t.y, _ = p - v, b = m * m + w * w;
    if (_ * _ / a < b)
      return b < s && (m === 0 && (m = Qn(n), b += m * m), w === 0 && (w = Qn(n), b += w * w), b < l && (b = Math.sqrt(l * b)), t.vx += m * h.value * r / b, t.vy += w * h.value * r / b), !0;
    if (h.length || b >= s) return;
    (h.data !== t || h.next) && (m === 0 && (m = Qn(n), b += m * m), w === 0 && (w = Qn(n), b += w * w), b < l && (b = Math.sqrt(l * b)));
    do
      h.data !== t && (_ = i[h.data.index] * r / b, t.vx += m * _, t.vy += w * _);
    while (h = h.next);
  }
  return u.initialize = function(h, v) {
    e = h, n = v, c();
  }, u.strength = function(h) {
    return arguments.length ? (o = typeof h == "function" ? h : pt(+h), c(), u) : o;
  }, u.distanceMin = function(h) {
    return arguments.length ? (l = h * h, u) : Math.sqrt(l);
  }, u.distanceMax = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.theta = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u;
}
function zS(e) {
  var t = pt(0.1), n, r, o;
  typeof e != "function" && (e = pt(e == null ? 0 : +e));
  function i(s) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vx += (o[a] - c.x) * r[a] * s;
  }
  function l() {
    if (n) {
      var s, a = n.length;
      for (r = new Array(a), o = new Array(a), s = 0; s < a; ++s)
        r[s] = isNaN(o[s] = +e(n[s], s, n)) ? 0 : +t(n[s], s, n);
    }
  }
  return i.initialize = function(s) {
    n = s, l();
  }, i.strength = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : pt(+s), l(), i) : t;
  }, i.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : pt(+s), l(), i) : e;
  }, i;
}
function GS(e) {
  var t = pt(0.1), n, r, o;
  typeof e != "function" && (e = pt(e == null ? 0 : +e));
  function i(s) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vy += (o[a] - c.y) * r[a] * s;
  }
  function l() {
    if (n) {
      var s, a = n.length;
      for (r = new Array(a), o = new Array(a), s = 0; s < a; ++s)
        r[s] = isNaN(o[s] = +e(n[s], s, n)) ? 0 : +t(n[s], s, n);
    }
  }
  return i.initialize = function(s) {
    n = s, l();
  }, i.strength = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : pt(+s), l(), i) : t;
  }, i.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : pt(+s), l(), i) : e;
  }, i;
}
function Ct(e) {
  return function() {
    return e;
  };
}
const Jf = Math.abs, st = Math.atan2, dr = Math.cos, US = Math.max, Ms = Math.min, bn = Math.sin, Wr = Math.sqrt, xt = 1e-12, Qo = Math.PI, Cl = Qo / 2, WS = 2 * Qo;
function qS(e) {
  return e > 1 ? 0 : e < -1 ? Qo : Math.acos(e);
}
function Qf(e) {
  return e >= 1 ? Cl : e <= -1 ? -Cl : Math.asin(e);
}
function Dg(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = r;
    }
    return e;
  }, () => new dS(t);
}
function YS(e) {
  return e.innerRadius;
}
function KS(e) {
  return e.outerRadius;
}
function XS(e) {
  return e.startAngle;
}
function ZS(e) {
  return e.endAngle;
}
function JS(e) {
  return e && e.padAngle;
}
function QS(e, t, n, r, o, i, l, s) {
  var a = n - e, u = r - t, c = l - o, d = s - i, f = d * a - c * u;
  if (!(f * f < xt))
    return f = (c * (t - i) - d * (e - o)) / f, [e + f * a, t + f * u];
}
function Ai(e, t, n, r, o, i, l) {
  var s = e - n, a = t - r, u = (l ? i : -i) / Wr(s * s + a * a), c = u * a, d = -u * s, f = e + c, h = t + d, v = n + c, g = r + d, p = (f + v) / 2, m = (h + g) / 2, w = v - f, _ = g - h, b = w * w + _ * _, x = o - i, E = f * g - v * h, S = (_ < 0 ? -1 : 1) * Wr(US(0, x * x * b - E * E)), T = (E * _ - w * S) / b, A = (-E * w - _ * S) / b, R = (E * _ + w * S) / b, D = (-E * w + _ * S) / b, L = T - p, I = A - m, k = R - p, O = D - m;
  return L * L + I * I > k * k + O * O && (T = R, A = D), {
    cx: T,
    cy: A,
    x01: -c,
    y01: -d,
    x11: T * (o / x - 1),
    y11: A * (o / x - 1)
  };
}
function eC() {
  var e = YS, t = KS, n = Ct(0), r = null, o = XS, i = ZS, l = JS, s = null, a = Dg(u);
  function u() {
    var c, d, f = +e.apply(this, arguments), h = +t.apply(this, arguments), v = o.apply(this, arguments) - Cl, g = i.apply(this, arguments) - Cl, p = Jf(g - v), m = g > v;
    if (s || (s = c = a()), h < f && (d = h, h = f, f = d), !(h > xt)) s.moveTo(0, 0);
    else if (p > WS - xt)
      s.moveTo(h * dr(v), h * bn(v)), s.arc(0, 0, h, v, g, !m), f > xt && (s.moveTo(f * dr(g), f * bn(g)), s.arc(0, 0, f, g, v, m));
    else {
      var w = v, _ = g, b = v, x = g, E = p, S = p, T = l.apply(this, arguments) / 2, A = T > xt && (r ? +r.apply(this, arguments) : Wr(f * f + h * h)), R = Ms(Jf(h - f) / 2, +n.apply(this, arguments)), D = R, L = R, I, k;
      if (A > xt) {
        var O = Qf(A / f * bn(T)), M = Qf(A / h * bn(T));
        (E -= O * 2) > xt ? (O *= m ? 1 : -1, b += O, x -= O) : (E = 0, b = x = (v + g) / 2), (S -= M * 2) > xt ? (M *= m ? 1 : -1, w += M, _ -= M) : (S = 0, w = _ = (v + g) / 2);
      }
      var j = h * dr(w), N = h * bn(w), F = f * dr(x), B = f * bn(x);
      if (R > xt) {
        var H = h * dr(_), Y = h * bn(_), ee = f * dr(b), le = f * bn(b), fe;
        if (p < Qo)
          if (fe = QS(j, N, ee, le, H, Y, F, B)) {
            var J = j - fe[0], se = N - fe[1], Ee = H - fe[0], Fe = Y - fe[1], ot = 1 / bn(qS((J * Ee + se * Fe) / (Wr(J * J + se * se) * Wr(Ee * Ee + Fe * Fe))) / 2), et = Wr(fe[0] * fe[0] + fe[1] * fe[1]);
            D = Ms(R, (f - et) / (ot - 1)), L = Ms(R, (h - et) / (ot + 1));
          } else
            D = L = 0;
      }
      S > xt ? L > xt ? (I = Ai(ee, le, j, N, h, L, m), k = Ai(H, Y, F, B, h, L, m), s.moveTo(I.cx + I.x01, I.cy + I.y01), L < R ? s.arc(I.cx, I.cy, L, st(I.y01, I.x01), st(k.y01, k.x01), !m) : (s.arc(I.cx, I.cy, L, st(I.y01, I.x01), st(I.y11, I.x11), !m), s.arc(0, 0, h, st(I.cy + I.y11, I.cx + I.x11), st(k.cy + k.y11, k.cx + k.x11), !m), s.arc(k.cx, k.cy, L, st(k.y11, k.x11), st(k.y01, k.x01), !m))) : (s.moveTo(j, N), s.arc(0, 0, h, w, _, !m)) : s.moveTo(j, N), !(f > xt) || !(E > xt) ? s.lineTo(F, B) : D > xt ? (I = Ai(F, B, H, Y, f, -D, m), k = Ai(j, N, ee, le, f, -D, m), s.lineTo(I.cx + I.x01, I.cy + I.y01), D < R ? s.arc(I.cx, I.cy, D, st(I.y01, I.x01), st(k.y01, k.x01), !m) : (s.arc(I.cx, I.cy, D, st(I.y01, I.x01), st(I.y11, I.x11), !m), s.arc(0, 0, f, st(I.cy + I.y11, I.cx + I.x11), st(k.cy + k.y11, k.cx + k.x11), m), s.arc(k.cx, k.cy, D, st(k.y11, k.x11), st(k.y01, k.x01), !m))) : s.arc(0, 0, f, x, b, m);
    }
    if (s.closePath(), c) return s = null, c + "" || null;
  }
  return u.centroid = function() {
    var c = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, d = (+o.apply(this, arguments) + +i.apply(this, arguments)) / 2 - Qo / 2;
    return [dr(d) * c, bn(d) * c];
  }, u.innerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ct(+c), u) : e;
  }, u.outerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ct(+c), u) : t;
  }, u.cornerRadius = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : Ct(+c), u) : n;
  }, u.padRadius = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : Ct(+c), u) : r;
  }, u.startAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : Ct(+c), u) : o;
  }, u.endAngle = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Ct(+c), u) : i;
  }, u.padAngle = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : Ct(+c), u) : l;
  }, u.context = function(c) {
    return arguments.length ? (s = c ?? null, u) : s;
  }, u;
}
function tC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Hg(e) {
  this._context = e;
}
Hg.prototype = {
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
function nC(e) {
  return new Hg(e);
}
function rC(e) {
  return e[0];
}
function oC(e) {
  return e[1];
}
function iC(e, t) {
  var n = Ct(!0), r = null, o = nC, i = null, l = Dg(s);
  e = typeof e == "function" ? e : e === void 0 ? rC : Ct(e), t = typeof t == "function" ? t : t === void 0 ? oC : Ct(t);
  function s(a) {
    var u, c = (a = tC(a)).length, d, f = !1, h;
    for (r == null && (i = o(h = l())), u = 0; u <= c; ++u)
      !(u < c && n(d = a[u], u, a)) === f && ((f = !f) ? i.lineStart() : i.lineEnd()), f && i.point(+e(d, u, a), +t(d, u, a));
    if (h) return i = null, h + "" || null;
  }
  return s.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Ct(+a), s) : e;
  }, s.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Ct(+a), s) : t;
  }, s.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Ct(!!a), s) : n;
  }, s.curve = function(a) {
    return arguments.length ? (o = a, r != null && (i = o(r)), s) : o;
  }, s.context = function(a) {
    return arguments.length ? (a == null ? r = i = null : i = o(r = a), s) : r;
  }, s;
}
const $i = (e) => () => e;
function lC(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: o }
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
var jg = new An(1, 0, 0);
An.prototype;
function As(e) {
  e.stopImmediatePropagation();
}
function xo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function sC(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function aC() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ed() {
  return this.__zoom || jg;
}
function uC(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function cC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fC(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], o = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o),
    l > i ? (i + l) / 2 : Math.min(0, i) || Math.max(0, l)
  );
}
function dC() {
  var e = sC, t = aC, n = fC, r = uC, o = cC, i = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, a = Z2, u = hi("start", "zoom", "end"), c, d, f, h = 500, v = 150, g = 0, p = 10;
  function m(k) {
    k.property("__zoom", ed).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", A).on("dblclick.zoom", R).filter(o).on("touchstart.zoom", D).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", I).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(k, O, M, j) {
    var N = k.selection ? k.selection() : k;
    N.property("__zoom", ed), k !== N ? x(k, O, M, j) : N.interrupt().each(function() {
      E(this, arguments).event(j).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, m.scaleBy = function(k, O, M, j) {
    m.scaleTo(k, function() {
      var N = this.__zoom.k, F = typeof O == "function" ? O.apply(this, arguments) : O;
      return N * F;
    }, M, j);
  }, m.scaleTo = function(k, O, M, j) {
    m.transform(k, function() {
      var N = t.apply(this, arguments), F = this.__zoom, B = M == null ? b(N) : typeof M == "function" ? M.apply(this, arguments) : M, H = F.invert(B), Y = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(_(w(F, Y), B, H), N, l);
    }, M, j);
  }, m.translateBy = function(k, O, M, j) {
    m.transform(k, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), l);
    }, null, j);
  }, m.translateTo = function(k, O, M, j, N) {
    m.transform(k, function() {
      var F = t.apply(this, arguments), B = this.__zoom, H = j == null ? b(F) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(jg.translate(H[0], H[1]).scale(B.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), F, l);
    }, j, N);
  };
  function w(k, O) {
    return O = Math.max(i[0], Math.min(i[1], O)), O === k.k ? k : new An(O, k.x, k.y);
  }
  function _(k, O, M) {
    var j = O[0] - M[0] * k.k, N = O[1] - M[1] * k.k;
    return j === k.x && N === k.y ? k : new An(k.k, j, N);
  }
  function b(k) {
    return [(+k[0][0] + +k[1][0]) / 2, (+k[0][1] + +k[1][1]) / 2];
  }
  function x(k, O, M, j) {
    k.on("start.zoom", function() {
      E(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var N = this, F = arguments, B = E(N, F).event(j), H = t.apply(N, F), Y = M == null ? b(H) : typeof M == "function" ? M.apply(N, F) : M, ee = Math.max(H[1][0] - H[0][0], H[1][1] - H[0][1]), le = N.__zoom, fe = typeof O == "function" ? O.apply(N, F) : O, J = a(le.invert(Y).concat(ee / le.k), fe.invert(Y).concat(ee / fe.k));
      return function(se) {
        if (se === 1) se = fe;
        else {
          var Ee = J(se), Fe = ee / Ee[2];
          se = new An(Fe, Y[0] - Ee[0] * Fe, Y[1] - Ee[1] * Fe);
        }
        B.zoom(null, se);
      };
    });
  }
  function E(k, O, M) {
    return !M && k.__zooming || new S(k, O);
  }
  function S(k, O) {
    this.that = k, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(k, O), this.taps = 0;
  }
  S.prototype = {
    event: function(k) {
      return k && (this.sourceEvent = k), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(k, O) {
      return this.mouse && k !== "mouse" && (this.mouse[1] = O.invert(this.mouse[0])), this.touch0 && k !== "touch" && (this.touch0[1] = O.invert(this.touch0[0])), this.touch1 && k !== "touch" && (this.touch1[1] = O.invert(this.touch1[0])), this.that.__zoom = O, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(k) {
      var O = Ye(this.that).datum();
      u.call(
        k,
        this.that,
        new lC(k, {
          sourceEvent: this.sourceEvent,
          target: m,
          type: k,
          transform: this.that.__zoom,
          dispatch: u
        }),
        O
      );
    }
  };
  function T(k, ...O) {
    if (!e.apply(this, arguments)) return;
    var M = E(this, O).event(k), j = this.__zoom, N = Math.max(i[0], Math.min(i[1], j.k * Math.pow(2, r.apply(this, arguments)))), F = Gt(k);
    if (M.wheel)
      (M.mouse[0][0] !== F[0] || M.mouse[0][1] !== F[1]) && (M.mouse[1] = j.invert(M.mouse[0] = F)), clearTimeout(M.wheel);
    else {
      if (j.k === N) return;
      M.mouse = [F, j.invert(F)], Yi(this), M.start();
    }
    xo(k), M.wheel = setTimeout(B, v), M.zoom("mouse", n(_(w(j, N), M.mouse[0], M.mouse[1]), M.extent, l));
    function B() {
      M.wheel = null, M.end();
    }
  }
  function A(k, ...O) {
    if (f || !e.apply(this, arguments)) return;
    var M = k.currentTarget, j = E(this, O, !0).event(k), N = Ye(k.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", ee, !0), F = Gt(k, M), B = k.clientX, H = k.clientY;
    Sg(k.view), As(k), j.mouse = [F, this.__zoom.invert(F)], Yi(this), j.start();
    function Y(le) {
      if (xo(le), !j.moved) {
        var fe = le.clientX - B, J = le.clientY - H;
        j.moved = fe * fe + J * J > g;
      }
      j.event(le).zoom("mouse", n(_(j.that.__zoom, j.mouse[0] = Gt(le, M), j.mouse[1]), j.extent, l));
    }
    function ee(le) {
      N.on("mousemove.zoom mouseup.zoom", null), Cg(le.view, j.moved), xo(le), j.event(le).end();
    }
  }
  function R(k, ...O) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, j = Gt(k.changedTouches ? k.changedTouches[0] : k, this), N = M.invert(j), F = M.k * (k.shiftKey ? 0.5 : 2), B = n(_(w(M, F), j, N), t.apply(this, O), l);
      xo(k), s > 0 ? Ye(this).transition().duration(s).call(x, B, j, k) : Ye(this).call(m.transform, B, j, k);
    }
  }
  function D(k, ...O) {
    if (e.apply(this, arguments)) {
      var M = k.touches, j = M.length, N = E(this, O, k.changedTouches.length === j).event(k), F, B, H, Y;
      for (As(k), B = 0; B < j; ++B)
        H = M[B], Y = Gt(H, this), Y = [Y, this.__zoom.invert(Y), H.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== Y[2] && (N.touch1 = Y, N.taps = 0) : (N.touch0 = Y, F = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), F && (N.taps < 2 && (d = Y[0], c = setTimeout(function() {
        c = null;
      }, h)), Yi(this), N.start());
    }
  }
  function L(k, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(k), j = k.changedTouches, N = j.length, F, B, H, Y;
      for (xo(k), F = 0; F < N; ++F)
        B = j[F], H = Gt(B, this), M.touch0 && M.touch0[2] === B.identifier ? M.touch0[0] = H : M.touch1 && M.touch1[2] === B.identifier && (M.touch1[0] = H);
      if (B = M.that.__zoom, M.touch1) {
        var ee = M.touch0[0], le = M.touch0[1], fe = M.touch1[0], J = M.touch1[1], se = (se = fe[0] - ee[0]) * se + (se = fe[1] - ee[1]) * se, Ee = (Ee = J[0] - le[0]) * Ee + (Ee = J[1] - le[1]) * Ee;
        B = w(B, Math.sqrt(se / Ee)), H = [(ee[0] + fe[0]) / 2, (ee[1] + fe[1]) / 2], Y = [(le[0] + J[0]) / 2, (le[1] + J[1]) / 2];
      } else if (M.touch0) H = M.touch0[0], Y = M.touch0[1];
      else return;
      M.zoom("touch", n(_(B, H, Y), M.extent, l));
    }
  }
  function I(k, ...O) {
    if (this.__zooming) {
      var M = E(this, O).event(k), j = k.changedTouches, N = j.length, F, B;
      for (As(k), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < N; ++F)
        B = j[F], M.touch0 && M.touch0[2] === B.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === B.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (B = Gt(B, this), Math.hypot(d[0] - B[0], d[1] - B[1]) < p)) {
        var H = Ye(this).on("dblclick.zoom");
        H && H.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(k) {
    return arguments.length ? (r = typeof k == "function" ? k : $i(+k), m) : r;
  }, m.filter = function(k) {
    return arguments.length ? (e = typeof k == "function" ? k : $i(!!k), m) : e;
  }, m.touchable = function(k) {
    return arguments.length ? (o = typeof k == "function" ? k : $i(!!k), m) : o;
  }, m.extent = function(k) {
    return arguments.length ? (t = typeof k == "function" ? k : $i([[+k[0][0], +k[0][1]], [+k[1][0], +k[1][1]]]), m) : t;
  }, m.scaleExtent = function(k) {
    return arguments.length ? (i[0] = +k[0], i[1] = +k[1], m) : [i[0], i[1]];
  }, m.translateExtent = function(k) {
    return arguments.length ? (l[0][0] = +k[0][0], l[1][0] = +k[1][0], l[0][1] = +k[0][1], l[1][1] = +k[1][1], m) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, m.constrain = function(k) {
    return arguments.length ? (n = k, m) : n;
  }, m.duration = function(k) {
    return arguments.length ? (s = +k, m) : s;
  }, m.interpolate = function(k) {
    return arguments.length ? (a = k, m) : a;
  }, m.on = function() {
    var k = u.on.apply(u, arguments);
    return k === u ? m : k;
  }, m.clickDistance = function(k) {
    return arguments.length ? (g = (k = +k) * k, m) : Math.sqrt(g);
  }, m.tapDistance = function(k) {
    return arguments.length ? (p = +k, m) : p;
  }, m;
}
function hC(e, t) {
  let n = dC().filter((r) => {
    var o;
    return r.button === 0 || ((o = r.touches) == null ? void 0 : o.length) >= 2;
  });
  return vC(n, e, t);
}
function vC(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (r) => t(r, !0)) : e.scaleExtent([1, 1]).on("zoom", (r) => t(r, !1));
}
class zg {
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
  constructor(t, n, r, o, i, l, s, a) {
    this.id = t, this.idImported = n, this.x = r, this.y = o, this.fx = i, this.fy = l, this.label = s, this.color = a;
  }
}
function gC(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function mC(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function pC(e, t, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(r);
}
function yC(e, t, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(r);
}
function $s(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function ko(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function bC(e, t, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(r);
}
function Nt(e) {
  e.preventDefault(), e.stopPropagation();
}
function wC(e, t, n, r) {
  return _2().filter((o) => o.button === 0).on("start", (o, i) => {
    Nt(o.sourceEvent), o.active === 0 && e.alphaTarget(0.5).restart(), i.fx = i.x, i.fy = i.y;
  }).on("drag", (o, i) => {
    i.fx = Math.max(r, Math.min(t - r, o.x)), i.fy = Math.max(r, Math.min(n - r, o.y));
  }).on("end", (o, i) => {
    o.active === 0 && e.alphaTarget(0), i.fx = void 0, i.fy = void 0;
  });
}
function _C(e, t, n, r, o) {
  const i = e.append("svg").attr("width", "100%").attr("height", "100%").on("pointermove", (l) => n(l)).on("pointerup", (l) => r(l)).on("contextmenu", (l) => Nt(l)).on("dblclick", (l) => o(l)).call(t).on("dblclick.zoom", null).append("g");
  return i.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), i;
}
var $t = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))($t || {});
class xC {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source
   * @param target
   * @param pathType
   * @param label
   * @param color The color of the node which was set (for default color this is empty)
   */
  constructor(t, n, r, o, i) {
    tt(this, "id");
    this.source = t, this.target = n, this.pathType = r, this.label = o, this.color = i, this.id = `${t.id}-${n.id}`;
  }
}
function kC(e) {
  return e.append("g").classed("links", !0).selectAll("path");
}
function SC(e) {
  return e.append("g").classed("nodes", !0).selectAll("circle");
}
function ei(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function CC(e, t, n, r) {
  if ($o(e, n, t + "-link-arrow", "graph-controller__arrow", !1), $o(
    e,
    n,
    t + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), $o(
    e,
    n,
    t + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let o of r)
      Sa(e, t, n, o);
}
function Sa(e, t, n, r) {
  e.select(`#${t}-link-arrow-` + ei(r)).empty() && ($o(
    e,
    n,
    t + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), $o(
    e,
    n,
    t + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function Ns(e, t, n) {
  e.select(`#${t}-link-arrow-` + ei(n)).select(function() {
    return this.parentNode;
  }).remove(), e.select(`#${t}-link-arrow-reverse-` + ei(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function $o(e, t, n, r, o, i) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", o ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${iC()(t.arrowPoints)}`).style("fill", i || "");
}
function EC(e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class td {
  constructor() {
    tt(this, "nodeIdCounter", 0);
    tt(this, "nodes", []);
    tt(this, "links", []);
  }
  unlockNodes() {
    this.nodes.forEach((t) => {
      t.fx = void 0, t.fy = void 0;
    });
  }
  createNode(t, n, r, o, i) {
    const l = new zg(
      this.nodeIdCounter++,
      r,
      t,
      n,
      void 0,
      void 0,
      o,
      i
    );
    return this.nodes.push(l), l;
  }
  createLink(t, n, r, o) {
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
    const a = new xC(l, s, void 0, r, o);
    return this.links.push(a), a;
  }
  removeNode(t) {
    const n = this.nodes.findIndex((o) => o.id === t.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const r = this.links.filter(
      (o) => o.source.id === t.id || o.target.id === t.id
    );
    return r.forEach((o) => {
      const i = this.links.indexOf(o, 0);
      this.links.splice(i, 1);
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
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(t, n = "") {
    return this.links.some((r) => r.color === t && r.id !== n);
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
    return this.links.filter((r) => r.color === t && r.id !== n).map((r) => r.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, r = !1, o = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let i, l;
    return i = this.nodes.map((s) => {
      let a = `${s.id}`;
      return t && s.label !== void 0 && (a += ` ${s.label}`), r && s.color !== void 0 && (a += ` /COLOR:/${s.color}`), a;
    }).join(`
`), l = this.links.map((s) => {
      let a = `${s.source.id} ${s.target.id}`;
      return n && s.label !== void 0 && (a += ` ${s.label}`), o && s.color !== void 0 && (a += ` /COLOR:/${s.color}`), a;
    }).join(`
`), `${i}${l ? `
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
  toJSON(t = !0, n = !0, r = !0, o = !0, i = !0) {
    let l = this.nodes.map((a) => {
      let u = ["id"];
      return t && a.label !== void 0 && u.push("label"), r && a.color !== void 0 && u.push("color"), i && a.x !== void 0 && (u.push("x"), u.push("y")), JSON.stringify(a, u);
    }).join(`,
		`), s = this.links.map((a) => {
      let u = ["sourceId", "targetId"];
      n && a.label !== void 0 && u.push("label"), o && a.color !== void 0 && u.push("color");
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
function VC(e, t, n, r, o) {
  let i = HS(e.nodes).on("tick", () => o()).force(
    "collision",
    TS().radius(t.nodeRadius)
    //stop overlapping
  );
  return i = LC(e, i, n, r, t), i = Ug(i, e, t, t.fixedLinkDistanceEnabled), i = Gg(i, t.nodePhysicsEnabled, n, r), i;
}
function LC(e, t, n, r, o) {
  return t.force("bounds", () => {
    for (const i of e.nodes)
      i.x = Math.max(o.nodeRadius, Math.min(n - o.nodeRadius, i.x)), i.y = Math.max(o.nodeRadius, Math.min(r - o.nodeRadius, i.y));
  });
}
function Gg(e, t, n, r) {
  return t ? e.force("charge", jS().strength(-500)).force("x", zS(n / 2).strength(0.05)).force("y", GS(r / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function Ug(e, t, n, r) {
  return r ? e.force(
    "link",
    AS().links(t.links).id((o) => o.id).distance(n.nodeRadius * 10)
  ) : e.force("link", null);
}
const PC = Object.prototype.toString;
function El(e) {
  const t = PC.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function IC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!El(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, o = t.toIndex, i = o === void 0 ? e.length : o;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (i <= r || i > e.length || !Number.isInteger(i))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var l = e[r], s = r + 1; s < i; s++)
    e[s] > l && (l = e[s]);
  return l;
}
function TC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!El(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, o = t.toIndex, i = o === void 0 ? e.length : o;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (i <= r || i > e.length || !Number.isInteger(i))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var l = e[r], s = r + 1; s < i; s++)
    e[s] < l && (l = e[s]);
  return l;
}
function nd(e) {
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
  var r = TC(e), o = IC(e);
  if (r === o)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var i = t.min, l = i === void 0 ? t.autoMinMax ? r : 0 : i, s = t.max, a = s === void 0 ? t.autoMinMax ? o : 1 : s;
  if (l >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - l) / (o - r), c = 0; c < e.length; c++)
    n[c] = (e[c] - r) * u + l;
  return n;
}
const Ni = " ".repeat(2), Wg = " ".repeat(4);
function MC() {
  return qg(this);
}
function qg(e, t = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: o = 8 } = t;
  return `${e.constructor.name} {
${Ni}[
${Wg}${AC(e, n, r, o)}
${Ni}]
${Ni}rows: ${e.rows}
${Ni}columns: ${e.columns}
}`;
}
function AC(e, t, n, r) {
  const { rows: o, columns: i } = e, l = Math.min(o, t), s = Math.min(i, n), a = [];
  for (let u = 0; u < l; u++) {
    let c = [];
    for (let d = 0; d < s; d++)
      c.push($C(e.get(u, d), r));
    a.push(`${c.join(" ")}`);
  }
  return s !== i && (a[a.length - 1] += ` ... ${i - n} more columns`), l !== o && a.push(`... ${o - t} more rows`), a.join(`
${Wg}`);
}
function $C(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const r = e.toPrecision(t - 2);
  if (r.length <= t)
    return r;
  const o = e.toExponential(t - 2), i = o.indexOf("e"), l = o.slice(i);
  return o.slice(0, t - l.length) + l;
}
function NC(e, t) {
  e.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, e.prototype.addS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) + r);
    return this;
  }, e.prototype.addM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) + r.get(o, i));
    return this;
  }, e.add = function(r, o) {
    return new t(r).add(o);
  }, e.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, e.prototype.subS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) - r);
    return this;
  }, e.prototype.subM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) - r.get(o, i));
    return this;
  }, e.sub = function(r, o) {
    return new t(r).sub(o);
  }, e.prototype.subtract = e.prototype.sub, e.prototype.subtractS = e.prototype.subS, e.prototype.subtractM = e.prototype.subM, e.subtract = e.sub, e.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, e.prototype.mulS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) * r);
    return this;
  }, e.prototype.mulM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) * r.get(o, i));
    return this;
  }, e.mul = function(r, o) {
    return new t(r).mul(o);
  }, e.prototype.multiply = e.prototype.mul, e.prototype.multiplyS = e.prototype.mulS, e.prototype.multiplyM = e.prototype.mulM, e.multiply = e.mul, e.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, e.prototype.divS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) / r);
    return this;
  }, e.prototype.divM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) / r.get(o, i));
    return this;
  }, e.div = function(r, o) {
    return new t(r).div(o);
  }, e.prototype.divide = e.prototype.div, e.prototype.divideS = e.prototype.divS, e.prototype.divideM = e.prototype.divM, e.divide = e.div, e.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, e.prototype.modS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) % r);
    return this;
  }, e.prototype.modM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) % r.get(o, i));
    return this;
  }, e.mod = function(r, o) {
    return new t(r).mod(o);
  }, e.prototype.modulus = e.prototype.mod, e.prototype.modulusS = e.prototype.modS, e.prototype.modulusM = e.prototype.modM, e.modulus = e.mod, e.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, e.prototype.andS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) & r);
    return this;
  }, e.prototype.andM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) & r.get(o, i));
    return this;
  }, e.and = function(r, o) {
    return new t(r).and(o);
  }, e.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, e.prototype.orS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) | r);
    return this;
  }, e.prototype.orM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) | r.get(o, i));
    return this;
  }, e.or = function(r, o) {
    return new t(r).or(o);
  }, e.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, e.prototype.xorS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) ^ r);
    return this;
  }, e.prototype.xorM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) ^ r.get(o, i));
    return this;
  }, e.xor = function(r, o) {
    return new t(r).xor(o);
  }, e.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, e.prototype.leftShiftS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) << r);
    return this;
  }, e.prototype.leftShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) << r.get(o, i));
    return this;
  }, e.leftShift = function(r, o) {
    return new t(r).leftShift(o);
  }, e.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, e.prototype.signPropagatingRightShiftS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) >> r);
    return this;
  }, e.prototype.signPropagatingRightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) >> r.get(o, i));
    return this;
  }, e.signPropagatingRightShift = function(r, o) {
    return new t(r).signPropagatingRightShift(o);
  }, e.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, e.prototype.rightShiftS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) >>> r);
    return this;
  }, e.prototype.rightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, this.get(o, i) >>> r.get(o, i));
    return this;
  }, e.rightShift = function(r, o) {
    return new t(r).rightShift(o);
  }, e.prototype.zeroFillRightShift = e.prototype.rightShift, e.prototype.zeroFillRightShiftS = e.prototype.rightShiftS, e.prototype.zeroFillRightShiftM = e.prototype.rightShiftM, e.zeroFillRightShift = e.rightShift, e.prototype.not = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, ~this.get(r, o));
    return this;
  }, e.not = function(r) {
    return new t(r).not();
  }, e.prototype.abs = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.abs(this.get(r, o)));
    return this;
  }, e.abs = function(r) {
    return new t(r).abs();
  }, e.prototype.acos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.acos(this.get(r, o)));
    return this;
  }, e.acos = function(r) {
    return new t(r).acos();
  }, e.prototype.acosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.acosh(this.get(r, o)));
    return this;
  }, e.acosh = function(r) {
    return new t(r).acosh();
  }, e.prototype.asin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.asin(this.get(r, o)));
    return this;
  }, e.asin = function(r) {
    return new t(r).asin();
  }, e.prototype.asinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.asinh(this.get(r, o)));
    return this;
  }, e.asinh = function(r) {
    return new t(r).asinh();
  }, e.prototype.atan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.atan(this.get(r, o)));
    return this;
  }, e.atan = function(r) {
    return new t(r).atan();
  }, e.prototype.atanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.atanh(this.get(r, o)));
    return this;
  }, e.atanh = function(r) {
    return new t(r).atanh();
  }, e.prototype.cbrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.cbrt(this.get(r, o)));
    return this;
  }, e.cbrt = function(r) {
    return new t(r).cbrt();
  }, e.prototype.ceil = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.ceil(this.get(r, o)));
    return this;
  }, e.ceil = function(r) {
    return new t(r).ceil();
  }, e.prototype.clz32 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.clz32(this.get(r, o)));
    return this;
  }, e.clz32 = function(r) {
    return new t(r).clz32();
  }, e.prototype.cos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.cos(this.get(r, o)));
    return this;
  }, e.cos = function(r) {
    return new t(r).cos();
  }, e.prototype.cosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.cosh(this.get(r, o)));
    return this;
  }, e.cosh = function(r) {
    return new t(r).cosh();
  }, e.prototype.exp = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.exp(this.get(r, o)));
    return this;
  }, e.exp = function(r) {
    return new t(r).exp();
  }, e.prototype.expm1 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.expm1(this.get(r, o)));
    return this;
  }, e.expm1 = function(r) {
    return new t(r).expm1();
  }, e.prototype.floor = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.floor(this.get(r, o)));
    return this;
  }, e.floor = function(r) {
    return new t(r).floor();
  }, e.prototype.fround = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.fround(this.get(r, o)));
    return this;
  }, e.fround = function(r) {
    return new t(r).fround();
  }, e.prototype.log = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.log(this.get(r, o)));
    return this;
  }, e.log = function(r) {
    return new t(r).log();
  }, e.prototype.log1p = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.log1p(this.get(r, o)));
    return this;
  }, e.log1p = function(r) {
    return new t(r).log1p();
  }, e.prototype.log10 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.log10(this.get(r, o)));
    return this;
  }, e.log10 = function(r) {
    return new t(r).log10();
  }, e.prototype.log2 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.log2(this.get(r, o)));
    return this;
  }, e.log2 = function(r) {
    return new t(r).log2();
  }, e.prototype.round = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.round(this.get(r, o)));
    return this;
  }, e.round = function(r) {
    return new t(r).round();
  }, e.prototype.sign = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.sign(this.get(r, o)));
    return this;
  }, e.sign = function(r) {
    return new t(r).sign();
  }, e.prototype.sin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.sin(this.get(r, o)));
    return this;
  }, e.sin = function(r) {
    return new t(r).sin();
  }, e.prototype.sinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.sinh(this.get(r, o)));
    return this;
  }, e.sinh = function(r) {
    return new t(r).sinh();
  }, e.prototype.sqrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.sqrt(this.get(r, o)));
    return this;
  }, e.sqrt = function(r) {
    return new t(r).sqrt();
  }, e.prototype.tan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.tan(this.get(r, o)));
    return this;
  }, e.tan = function(r) {
    return new t(r).tan();
  }, e.prototype.tanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.tanh(this.get(r, o)));
    return this;
  }, e.tanh = function(r) {
    return new t(r).tanh();
  }, e.prototype.trunc = function() {
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.set(r, o, Math.trunc(this.get(r, o)));
    return this;
  }, e.trunc = function(r) {
    return new t(r).trunc();
  }, e.pow = function(r, o) {
    return new t(r).pow(o);
  }, e.prototype.pow = function(r) {
    return typeof r == "number" ? this.powS(r) : this.powM(r);
  }, e.prototype.powS = function(r) {
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, Math.pow(this.get(o, i), r));
    return this;
  }, e.prototype.powM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let o = 0; o < this.rows; o++)
      for (let i = 0; i < this.columns; i++)
        this.set(o, i, Math.pow(this.get(o, i), r.get(o, i)));
    return this;
  };
}
function Jt(e, t, n) {
  let r = n ? e.rows : e.rows - 1;
  if (t < 0 || t > r)
    throw new RangeError("Row index out of range");
}
function Qt(e, t, n) {
  let r = n ? e.columns : e.columns - 1;
  if (t < 0 || t > r)
    throw new RangeError("Column index out of range");
}
function jr(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function zr(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function RC(e, t, n) {
  return {
    row: OC(e, t),
    column: BC(e, n)
  };
}
function OC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((r) => r < 0 || r >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function BC(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((r) => r < 0 || r >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function rd(e, t, n, r, o) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Ri("startRow", t), Ri("endRow", n), Ri("startColumn", r), Ri("endColumn", o), t > n || r > o || t < 0 || t >= e.rows || n < 0 || n >= e.rows || r < 0 || r >= e.columns || o < 0 || o >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function is(e, t = 0) {
  let n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
function Ri(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function Dr(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function FC(e) {
  let t = is(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] += e.get(n, r);
  return t;
}
function DC(e) {
  let t = is(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] += e.get(n, r);
  return t;
}
function HC(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t += e.get(n, r);
  return t;
}
function jC(e) {
  let t = is(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] *= e.get(n, r);
  return t;
}
function zC(e) {
  let t = is(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] *= e.get(n, r);
  return t;
}
function GC(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t *= e.get(n, r);
  return t;
}
function UC(e, t, n) {
  const r = e.rows, o = e.columns, i = [];
  for (let l = 0; l < r; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < o; c++)
      u = e.get(l, c) - n[l], s += u, a += u * u;
    t ? i.push((a - s * s / o) / (o - 1)) : i.push((a - s * s / o) / o);
  }
  return i;
}
function WC(e, t, n) {
  const r = e.rows, o = e.columns, i = [];
  for (let l = 0; l < o; l++) {
    let s = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = e.get(c, l) - n[l], s += u, a += u * u;
    t ? i.push((a - s * s / r) / (r - 1)) : i.push((a - s * s / r) / r);
  }
  return i;
}
function qC(e, t, n) {
  const r = e.rows, o = e.columns, i = r * o;
  let l = 0, s = 0, a = 0;
  for (let u = 0; u < r; u++)
    for (let c = 0; c < o; c++)
      a = e.get(u, c) - n, l += a, s += a * a;
  return t ? (s - l * l / i) / (i - 1) : (s - l * l / i) / i;
}
function YC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[n]);
}
function KC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[r]);
}
function XC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t);
}
function ZC(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let r = 0;
    for (let o = 0; o < e.columns; o++)
      r += Math.pow(e.get(n, o), 2) / (e.columns - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function JC(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[n]);
}
function QC(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let r = 0;
    for (let o = 0; o < e.rows; o++)
      r += Math.pow(e.get(o, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function eE(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[r]);
}
function tE(e) {
  const t = e.size - 1;
  let n = 0;
  for (let r = 0; r < e.columns; r++)
    for (let o = 0; o < e.rows; o++)
      n += Math.pow(e.get(o, r), 2) / t;
  return Math.sqrt(n);
}
function nE(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t);
}
class Ie {
  static from1DArray(t, n, r) {
    if (t * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let i = new Ce(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        i.set(l, s, r[l * n + s]);
    return i;
  }
  static rowVector(t) {
    let n = new Ce(1, t.length);
    for (let r = 0; r < t.length; r++)
      n.set(0, r, t[r]);
    return n;
  }
  static columnVector(t) {
    let n = new Ce(t.length, 1);
    for (let r = 0; r < t.length; r++)
      n.set(r, 0, t[r]);
    return n;
  }
  static zeros(t, n) {
    return new Ce(t, n);
  }
  static ones(t, n) {
    return new Ce(t, n).fill(1);
  }
  static rand(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: o = Math.random } = r;
    let i = new Ce(t, n);
    for (let l = 0; l < t; l++)
      for (let s = 0; s < n; s++)
        i.set(l, s, o());
    return i;
  }
  static randInt(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: o = 0, max: i = 1e3, random: l = Math.random } = r;
    if (!Number.isInteger(o)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(i)) throw new TypeError("max must be an integer");
    if (o >= i) throw new RangeError("min must be smaller than max");
    let s = i - o, a = new Ce(t, n);
    for (let u = 0; u < t; u++)
      for (let c = 0; c < n; c++) {
        let d = o + Math.round(l() * s);
        a.set(u, c, d);
      }
    return a;
  }
  static eye(t, n, r) {
    n === void 0 && (n = t), r === void 0 && (r = 1);
    let o = Math.min(t, n), i = this.zeros(t, n);
    for (let l = 0; l < o; l++)
      i.set(l, l, r);
    return i;
  }
  static diag(t, n, r) {
    let o = t.length;
    n === void 0 && (n = o), r === void 0 && (r = n);
    let i = Math.min(o, n, r), l = this.zeros(n, r);
    for (let s = 0; s < i; s++)
      l.set(s, s, t[s]);
    return l;
  }
  static min(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, o = t.columns, i = new Ce(r, o);
    for (let l = 0; l < r; l++)
      for (let s = 0; s < o; s++)
        i.set(l, s, Math.min(t.get(l, s), n.get(l, s)));
    return i;
  }
  static max(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, o = t.columns, i = new this(r, o);
    for (let l = 0; l < r; l++)
      for (let s = 0; s < o; s++)
        i.set(l, s, Math.max(t.get(l, s), n.get(l, s)));
    return i;
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
    let t = 0, n = 0, r = -1, o = !0, i = !1;
    for (; t < this.rows && o; ) {
      for (n = 0, i = !1; n < this.columns && i === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (i = !0, r = n) : (o = !1, i = !0);
      t++;
    }
    return o;
  }
  isReducedEchelonForm() {
    let t = 0, n = 0, r = -1, o = !0, i = !1;
    for (; t < this.rows && o; ) {
      for (n = 0, i = !1; n < this.columns && i === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (i = !0, r = n) : (o = !1, i = !0);
      for (let l = n + 1; l < this.rows; l++)
        this.get(t, l) !== 0 && (o = !1);
      t++;
    }
    return o;
  }
  echelonForm() {
    let t = this.clone(), n = 0, r = 0;
    for (; n < t.rows && r < t.columns; ) {
      let o = n;
      for (let i = n; i < t.rows; i++)
        t.get(i, r) > t.get(o, r) && (o = i);
      if (t.get(o, r) === 0)
        r++;
      else {
        t.swapRows(n, o);
        let i = t.get(n, r);
        for (let l = r; l < t.columns; l++)
          t.set(n, l, t.get(n, l) / i);
        for (let l = n + 1; l < t.rows; l++) {
          let s = t.get(l, r) / t.get(n, r);
          t.set(l, r, 0);
          for (let a = r + 1; a < t.columns; a++)
            t.set(l, a, t.get(l, a) - t.get(n, a) * s);
        }
        n++, r++;
      }
    }
    return t;
  }
  reducedEchelonForm() {
    let t = this.echelonForm(), n = t.columns, r = t.rows, o = r - 1;
    for (; o >= 0; )
      if (t.maxRow(o) === 0)
        o--;
      else {
        let i = 0, l = !1;
        for (; i < r && l === !1; )
          t.get(o, i) === 1 ? l = !0 : i++;
        for (let s = 0; s < o; s++) {
          let a = t.get(s, i);
          for (let u = i; u < n; u++) {
            let c = t.get(s, u) - a * t.get(o, u);
            t.set(s, u, c);
          }
        }
        o--;
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
    let o = new Ce(this.rows * n, this.columns * r);
    for (let i = 0; i < n; i++)
      for (let l = 0; l < r; l++)
        o.setSubMatrix(this, this.rows * i, this.columns * l);
    return o;
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
    Jt(this, t);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(t, r));
    return n;
  }
  getRowVector(t) {
    return Ce.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    Jt(this, t), n = jr(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, n[r]);
    return this;
  }
  swapRows(t, n) {
    Jt(this, t), Jt(this, n);
    for (let r = 0; r < this.columns; r++) {
      let o = this.get(t, r);
      this.set(t, r, this.get(n, r)), this.set(n, r, o);
    }
    return this;
  }
  getColumn(t) {
    Qt(this, t);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, t));
    return n;
  }
  getColumnVector(t) {
    return Ce.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    Qt(this, t), n = zr(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, n[r]);
    return this;
  }
  swapColumns(t, n) {
    Qt(this, t), Qt(this, n);
    for (let r = 0; r < this.rows; r++) {
      let o = this.get(r, t);
      this.set(r, t, this.get(r, n)), this.set(r, n, o);
    }
    return this;
  }
  addRowVector(t) {
    t = jr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[r]);
    return this;
  }
  subRowVector(t) {
    t = jr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[r]);
    return this;
  }
  mulRowVector(t) {
    t = jr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[r]);
    return this;
  }
  divRowVector(t) {
    t = jr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[r]);
    return this;
  }
  addColumnVector(t) {
    t = zr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = zr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = zr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = zr(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[n]);
    return this;
  }
  mulRow(t, n) {
    Jt(this, t);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, this.get(t, r) * n);
    return this;
  }
  mulColumn(t, n) {
    Qt(this, t);
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
    Dr(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.get(r, o) > t && (t = this.get(r, o), n[0] = r, n[1] = o);
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
    Dr(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let o = 0; o < this.columns; o++)
        this.get(r, o) < t && (t = this.get(r, o), n[0] = r, n[1] = o);
    return n;
  }
  maxRow(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r));
    return n;
  }
  maxRowIndex(t) {
    Jt(this, t), Dr(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let o = 1; o < this.columns; o++)
      this.get(t, o) > n && (n = this.get(t, o), r[1] = o);
    return r;
  }
  minRow(t) {
    if (Jt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r));
    return n;
  }
  minRowIndex(t) {
    Jt(this, t), Dr(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let o = 1; o < this.columns; o++)
      this.get(t, o) < n && (n = this.get(t, o), r[1] = o);
    return r;
  }
  maxColumn(t) {
    if (Qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t));
    return n;
  }
  maxColumnIndex(t) {
    Qt(this, t), Dr(this);
    let n = this.get(0, t), r = [0, t];
    for (let o = 1; o < this.rows; o++)
      this.get(o, t) > n && (n = this.get(o, t), r[0] = o);
    return r;
  }
  minColumn(t) {
    if (Qt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) < n && (n = this.get(r, t));
    return n;
  }
  minColumnIndex(t) {
    Qt(this, t), Dr(this);
    let n = this.get(0, t), r = [0, t];
    for (let o = 1; o < this.rows; o++)
      this.get(o, t) < n && (n = this.get(o, t), r[0] = o);
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
        for (let o = 0; o < this.columns; o++)
          n = n + this.get(r, o) * this.get(r, o);
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
    Ie.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let o = 0; o < n.length; o++)
      r += n[o] * t[o];
    return r;
  }
  mmul(t) {
    t = Ce.checkMatrix(t);
    let n = this.rows, r = this.columns, o = t.columns, i = new Ce(n, o), l = new Float64Array(r);
    for (let s = 0; s < o; s++) {
      for (let a = 0; a < r; a++)
        l[a] = t.get(a, s);
      for (let a = 0; a < n; a++) {
        let u = 0;
        for (let c = 0; c < r; c++)
          u += this.get(a, c) * l[c];
        i.set(a, s, u);
      }
    }
    return i;
  }
  strassen2x2(t) {
    t = Ce.checkMatrix(t);
    let n = new Ce(2, 2);
    const r = this.get(0, 0), o = t.get(0, 0), i = this.get(0, 1), l = t.get(0, 1), s = this.get(1, 0), a = t.get(1, 0), u = this.get(1, 1), c = t.get(1, 1), d = (r + u) * (o + c), f = (s + u) * o, h = r * (l - c), v = u * (a - o), g = (r + i) * c, p = (s - r) * (o + l), m = (i - u) * (a + c), w = d + v - g + m, _ = h + g, b = f + v, x = d - f + h + p;
    return n.set(0, 0, w), n.set(0, 1, _), n.set(1, 0, b), n.set(1, 1, x), n;
  }
  strassen3x3(t) {
    t = Ce.checkMatrix(t);
    let n = new Ce(3, 3);
    const r = this.get(0, 0), o = this.get(0, 1), i = this.get(0, 2), l = this.get(1, 0), s = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), d = this.get(2, 2), f = t.get(0, 0), h = t.get(0, 1), v = t.get(0, 2), g = t.get(1, 0), p = t.get(1, 1), m = t.get(1, 2), w = t.get(2, 0), _ = t.get(2, 1), b = t.get(2, 2), x = (r + o + i - l - s - c - d) * p, E = (r - l) * (-h + p), S = s * (-f + h + g - p - m - w + b), T = (-r + l + s) * (f - h + p), A = (l + s) * (-f + h), R = r * f, D = (-r + u + c) * (f - v + m), L = (-r + u) * (v - m), I = (u + c) * (-f + v), k = (r + o + i - s - a - u - c) * m, O = c * (-f + v + g - p - m - w + _), M = (-i + c + d) * (p + w - _), j = (i - d) * (p - _), N = i * w, F = (c + d) * (-w + _), B = (-i + s + a) * (m + w - b), H = (i - a) * (m - b), Y = (s + a) * (-w + b), ee = o * g, le = a * _, fe = l * v, J = u * h, se = d * b, Ee = R + N + ee, Fe = x + T + A + R + M + N + F, ot = R + D + I + k + N + B + Y, et = E + S + T + R + N + B + H, pn = E + T + A + R + le, V = N + B + H + Y + fe, $ = R + D + L + O + M + j + N, U = M + j + N + F + J, K = R + D + L + I + se;
    return n.set(0, 0, Ee), n.set(0, 1, Fe), n.set(0, 2, ot), n.set(1, 0, et), n.set(1, 1, pn), n.set(1, 2, V), n.set(2, 0, $), n.set(2, 1, U), n.set(2, 2, K), n;
  }
  mmulStrassen(t) {
    t = Ce.checkMatrix(t);
    let n = this.clone(), r = n.rows, o = n.columns, i = t.rows, l = t.columns;
    o !== i && console.warn(
      `Multiplying ${r} x ${o} and ${i} x ${l} matrix: dimensions do not match.`
    );
    function s(d, f, h) {
      let v = d.rows, g = d.columns;
      if (v === f && g === h)
        return d;
      {
        let p = Ie.zeros(f, h);
        return p = p.setSubMatrix(d, 0, 0), p;
      }
    }
    let a = Math.max(r, i), u = Math.max(o, l);
    n = s(n, a, u), t = s(t, a, u);
    function c(d, f, h, v) {
      if (h <= 512 || v <= 512)
        return d.mmul(f);
      h % 2 === 1 && v % 2 === 1 ? (d = s(d, h + 1, v + 1), f = s(f, h + 1, v + 1)) : h % 2 === 1 ? (d = s(d, h + 1, v), f = s(f, h + 1, v)) : v % 2 === 1 && (d = s(d, h, v + 1), f = s(f, h, v + 1));
      let g = parseInt(d.rows / 2, 10), p = parseInt(d.columns / 2, 10), m = d.subMatrix(0, g - 1, 0, p - 1), w = f.subMatrix(0, g - 1, 0, p - 1), _ = d.subMatrix(0, g - 1, p, d.columns - 1), b = f.subMatrix(0, g - 1, p, f.columns - 1), x = d.subMatrix(g, d.rows - 1, 0, p - 1), E = f.subMatrix(g, f.rows - 1, 0, p - 1), S = d.subMatrix(g, d.rows - 1, p, d.columns - 1), T = f.subMatrix(g, f.rows - 1, p, f.columns - 1), A = c(
        Ie.add(m, S),
        Ie.add(w, T),
        g,
        p
      ), R = c(Ie.add(x, S), w, g, p), D = c(m, Ie.sub(b, T), g, p), L = c(S, Ie.sub(E, w), g, p), I = c(Ie.add(m, _), T, g, p), k = c(
        Ie.sub(x, m),
        Ie.add(w, b),
        g,
        p
      ), O = c(
        Ie.sub(_, S),
        Ie.add(E, T),
        g,
        p
      ), M = Ie.add(A, L);
      M.sub(I), M.add(O);
      let j = Ie.add(D, I), N = Ie.add(R, L), F = Ie.sub(A, R);
      F.add(D), F.add(k);
      let B = Ie.zeros(2 * M.rows, 2 * M.columns);
      return B = B.setSubMatrix(M, 0, 0), B = B.setSubMatrix(j, M.rows, 0), B = B.setSubMatrix(N, 0, M.columns), B = B.setSubMatrix(F, M.rows, M.columns), B.subMatrix(0, h - 1, 0, v - 1);
    }
    return c(n, t, a, u);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let o = new Ce(this.rows, this.columns);
    for (let i = 0; i < this.rows; i++) {
      const l = this.getRow(i);
      l.length > 0 && nd(l, { min: n, max: r, output: l }), o.setRow(i, l);
    }
    return o;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let o = new Ce(this.rows, this.columns);
    for (let i = 0; i < this.columns; i++) {
      const l = this.getColumn(i);
      l.length && nd(l, {
        min: n,
        max: r,
        output: l
      }), o.setColumn(i, l);
    }
    return o;
  }
  flipRows() {
    const t = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < t; r++) {
        let o = this.get(n, r), i = this.get(n, this.columns - 1 - r);
        this.set(n, r, i), this.set(n, this.columns - 1 - r, o);
      }
    return this;
  }
  flipColumns() {
    const t = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < t; r++) {
        let o = this.get(r, n), i = this.get(this.rows - 1 - r, n);
        this.set(r, n, i), this.set(this.rows - 1 - r, n, o);
      }
    return this;
  }
  kroneckerProduct(t) {
    t = Ce.checkMatrix(t);
    let n = this.rows, r = this.columns, o = t.rows, i = t.columns, l = new Ce(n * o, r * i);
    for (let s = 0; s < n; s++)
      for (let a = 0; a < r; a++)
        for (let u = 0; u < o; u++)
          for (let c = 0; c < i; c++)
            l.set(o * s + u, i * a + c, this.get(s, a) * t.get(u, c));
    return l;
  }
  kroneckerSum(t) {
    if (t = Ce.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = t.rows, o = this.kroneckerProduct(Ce.eye(r, r)), i = Ce.eye(n, n).kroneckerProduct(t);
    return o.add(i);
  }
  transpose() {
    let t = new Ce(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(r, n, this.get(n, r));
    return t;
  }
  sortRows(t = od) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = od) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, r, o) {
    rd(this, t, n, r, o);
    let i = new Ce(
      n - t + 1,
      o - r + 1
    );
    for (let l = t; l <= n; l++)
      for (let s = r; s <= o; s++)
        i.set(l - t, s - r, this.get(l, s));
    return i;
  }
  subMatrixRow(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let o = new Ce(t.length, r - n + 1);
    for (let i = 0; i < t.length; i++)
      for (let l = n; l <= r; l++) {
        if (t[i] < 0 || t[i] >= this.rows)
          throw new RangeError(`Row index out of range: ${t[i]}`);
        o.set(i, l - n, this.get(t[i], l));
      }
    return o;
  }
  subMatrixColumn(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let o = new Ce(r - n + 1, t.length);
    for (let i = 0; i < t.length; i++)
      for (let l = n; l <= r; l++) {
        if (t[i] < 0 || t[i] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[i]}`);
        o.set(l - n, i, this.get(l, t[i]));
      }
    return o;
  }
  setSubMatrix(t, n, r) {
    if (t = Ce.checkMatrix(t), t.isEmpty())
      return this;
    let o = n + t.rows - 1, i = r + t.columns - 1;
    rd(this, n, o, r, i);
    for (let l = 0; l < t.rows; l++)
      for (let s = 0; s < t.columns; s++)
        this.set(n + l, r + s, t.get(l, s));
    return this;
  }
  selection(t, n) {
    let r = RC(this, t, n), o = new Ce(t.length, n.length);
    for (let i = 0; i < r.row.length; i++) {
      let l = r.row[i];
      for (let s = 0; s < r.column.length; s++) {
        let a = r.column[s];
        o.set(i, s, this.get(l, a));
      }
    }
    return o;
  }
  trace() {
    let t = Math.min(this.rows, this.columns), n = 0;
    for (let r = 0; r < t; r++)
      n += this.get(r, r);
    return n;
  }
  clone() {
    let t = new Ce(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(n, r, this.get(n, r));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return FC(this);
      case "column":
        return DC(this);
      case void 0:
        return HC(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return jC(this);
      case "column":
        return zC(this);
      case void 0:
        return GC(this);
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
    const { unbiased: r = !0, mean: o = this.mean(t) } = n;
    if (typeof r != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (t) {
      case "row": {
        if (!Array.isArray(o))
          throw new TypeError("mean must be an array");
        return UC(this, r, o);
      }
      case "column": {
        if (!Array.isArray(o))
          throw new TypeError("mean must be an array");
        return WC(this, r, o);
      }
      case void 0: {
        if (typeof o != "number")
          throw new TypeError("mean must be a number");
        return qC(this, r, o);
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
    for (let o = 0; o < r.length; o++)
      r[o] = Math.sqrt(r[o]);
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
        return YC(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return KC(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return XC(this, r), this;
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
          r = ZC(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return JC(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = QC(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return eE(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = tE(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return nE(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return qg(this, t);
  }
}
Ie.prototype.klass = "Matrix";
typeof Symbol < "u" && (Ie.prototype[Symbol.for("nodejs.util.inspect.custom")] = MC);
function od(e, t) {
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
      for (let o = 0; o < t; o++) {
        if (r[o].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(r[o]));
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
    return Jt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), Jt(this, t, !0), n = Float64Array.from(jr(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    Qt(this, t);
    for (let n = 0; n < this.rows; n++) {
      const r = new Float64Array(this.columns - 1);
      for (let o = 0; o < t; o++)
        r[o] = this.data[n][o];
      for (let o = t + 1; o < this.columns; o++)
        r[o - 1] = this.data[n][o];
      this.data[n] = r;
    }
    return this.columns -= 1, this;
  }
  addColumn(t, n) {
    typeof n > "u" && (n = t, t = this.columns), Qt(this, t, !0), n = zr(this, n);
    for (let r = 0; r < this.rows; r++) {
      const o = new Float64Array(this.columns + 1);
      let i = 0;
      for (; i < t; i++)
        o[i] = this.data[r][i];
      for (o[i++] = n[r]; i < this.columns + 1; i++)
        o[i] = this.data[r][i - 1];
      this.data[r] = o;
    }
    return this.columns += 1, this;
  }
}
NC(Ie, Ce);
function Rs(e, t, n) {
  const r = t.x - e.x, o = t.y - e.y, i = Math.sqrt(r * r + o * o), l = r / i, s = o / i, a = e.x + (n.nodeRadius - 1) * l, u = e.y + (n.nodeRadius - 1) * s, c = t.x - n.markerPadding * l, d = t.y - n.markerPadding * s;
  return `M${a},${u}
          L${c},${d}`;
}
function Os(e, t, n) {
  const r = new Ce([[e.x, e.y]]), o = new Ce([[t.x, t.y]]), i = Ce.subtract(o, r), l = i.norm("frobenius"), s = i.divide(l), a = Yg(10), u = eo(s, -a).multiply(n.nodeRadius - 1).add(r), c = Ce.multiply(s, -1), d = eo(c, a).multiply(n.nodeRadius).add(o).add(eo(c, a).multiply(2 * n.markerBoxSize)), f = 1.2 * l;
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${f},${f},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
}
function id(e, t, n) {
  const r = new Ce([[e.x, e.y]]), o = new Ce([t]);
  r.get(0, 0) === o.get(0, 0) && r.get(0, 1) === o.get(0, 1) && o.add([[0, 1]]);
  const i = Ce.subtract(r, o), l = i.divide(i.norm("frobenius")), s = Yg(40), a = eo(l, s).multiply(n.nodeRadius - 1).add(r), u = eo(l, -s).multiply(n.nodeRadius).add(r).add(eo(l, -s).multiply(2 * n.markerBoxSize));
  return `M${a.get(0, 0)},${a.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
}
function ld(e, t) {
  return `M${e[0]},${e[1]}
          L${t[0]},${t[1]}`;
}
function Yg(e) {
  return e * (Math.PI / 180);
}
function eo(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new Ce([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
class rE {
  constructor() {
    tt(this, "persistSettingsLocalStorage", !1);
    tt(this, "hasToolbar", !0);
    tt(this, "nodeRadius", 24);
    tt(this, "showNodeLabels", !0);
    tt(this, "nodePhysicsEnabled", !1);
    tt(this, "isGraphEditableInGUI", !0);
    tt(this, "zoomEnabled", !1);
    tt(this, "showLinkLabels", !0);
    tt(this, "fixedLinkDistanceEnabled", !1);
    tt(this, "markerBoxSize", 4);
    tt(this, "markerPadding", this.nodeRadius + 2 * this.markerBoxSize);
    tt(this, "markerRef", this.markerBoxSize / 2);
    tt(this, "arrowPoints", [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ]);
    tt(this, "markerPath", [0, 0, this.markerBoxSize, this.markerBoxSize].join(","));
  }
}
function oE(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((s) => s.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, o = n !== -1 ? t.slice(n + 1) : [], i = [];
  if (r.length)
    for (const s of r) {
      let [, a, u, c] = (s.match(/(\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (.*)/) || s.match(/(\w+)/) || []).map((d) => d.trim());
      u != null && u.includes("/COLOR:/") && (c = u, u = ""), a && i.push({
        idImported: a,
        label: u,
        color: c == null ? void 0 : c.replace("/COLOR:/", "")
      });
    }
  const l = [];
  if (o.length)
    for (const s of o) {
      let [, a, u, c, d] = (s.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || s.match(/(\w+) (\w+) (.*)/) || s.match(/(\w+) (\w+)/) || []).map((f) => f.trim());
      c != null && c.includes("/COLOR:/") && (d = c, c = ""), a && u && l.push({
        sourceIdImported: a,
        targetIdImported: u,
        label: c,
        color: d == null ? void 0 : d.replace("/COLOR:/", "")
      });
    }
  return [i, l];
}
function iE(e) {
  const t = [];
  for (let r of e.nodes)
    t.push({
      idImported: r.id,
      x: r.x,
      y: r.y,
      label: r.label,
      color: r.color
    });
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
var lE = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function sE(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Kg = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(lE, function() {
    function n(l) {
      l = l.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (M, j, N, F) => j + F.replaceAll(".", " ."));
      var s = l.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = s.length, u, c, d, f, h, v = [], g = [], p, m, w = 0, _ = 0, b = 0, x = 0, E = 0, S = 0, T = 0, A = 0, R = 0, D = 0, L = 0, I = 0, k = 0, O = "";
      for (u = 1; u < a; u++) {
        if (c = s[u], d = c.substring(0, 1), f = d.toLowerCase(), v = c.replace(d, "").trim().split(" ").filter(function(M) {
          return M !== "";
        }), g = v, v = v.map(parseFloat), p = v.length, f === "m") {
          if (O += "M ", d === "m" ? (b += v[0], x += v[1]) : (b = v[0], x = v[1]), w = b, _ = x, O += b + " " + x + " ", p > 2)
            for (m = 0; m < p; m += 2)
              d === "m" ? (b += v[m], x += v[m + 1]) : (b = v[m], x = v[m + 1]), O += "L " + b + " " + x + " ";
        } else if (f === "l")
          for (m = 0; m < p; m += 2)
            d === "l" ? (b += v[m], x += v[m + 1]) : (b = v[m], x = v[m + 1]), O += "L " + b + " " + x + " ";
        else if (f === "h")
          for (m = 0; m < p; m++)
            d === "h" ? b += v[m] : b = v[m], O += "L " + b + " " + x + " ";
        else if (f === "v")
          for (m = 0; m < p; m++)
            d === "v" ? x += v[m] : x = v[m], O += "L " + b + " " + x + " ";
        else if (f === "q")
          for (m = 0; m < p; m += 4)
            d === "q" ? (E = b + v[m], S = x + v[m + 1], b += v[m + 2], x += v[m + 3]) : (E = v[m], S = v[m + 1], b = v[m + 2], x = v[m + 3]), O += "Q " + E + " " + S + " " + b + " " + x + " ";
        else if (f === "t")
          for (m = 0; m < p; m += 2)
            ["t", "q"].indexOf(h) > -1 ? (E = b + (b - E), S = x + (x - S)) : (E = b, S = x), d === "t" ? (b += v[m], x += v[m + 1]) : (b = v[m], x = v[m + 1]), O += "Q " + E + " " + S + " " + b + " " + x + " ", h = f;
        else if (f === "c")
          for (m = 0; m < p; m += 6)
            d === "c" ? (E = b + v[m], S = x + v[m + 1], T = b + v[m + 2], A = x + v[m + 3], b += v[m + 4], x += v[m + 5]) : (E = v[m], S = v[m + 1], T = v[m + 2], A = v[m + 3], b = v[m + 4], x = v[m + 5]), O += "C " + E + " " + S + " " + T + " " + A + " " + b + " " + x + " ";
        else if (f === "s")
          for (m = 0; m < p; m += 4)
            E = b, S = x, ["s", "c"].indexOf(h) > -1 && (E += b - T, S += x - A), d === "s" ? (T = b + v[m], A = x + v[m + 1], b += v[m + 2], x += v[m + 3]) : (T = v[m], A = v[m + 1], b = v[m + 2], x = v[m + 3]), O += "C " + E + " " + S + " " + T + " " + A + " " + b + " " + x + " ";
        else if (f === "a")
          for (m = 0; m < p; m += 7) {
            R = v[m], D = v[m + 1], L = v[m + 2], I = g[m + 3];
            let M = !1;
            if (I.length > 1) {
              let j = parseInt(I[0]), N = parseInt(I[1]), F;
              I.length > 2 && (F = parseFloat(I.substring(2))), v[m + 3] = j, v.splice(m + 4, 0, N), g.splice(m + 4, 0, "+"), F !== void 0 && v.splice(m + 5, 0, F), M = !0;
            }
            I = v[m + 3], k = M ? v[m + 4] : g[m + 4], !M && k.length > 1 && (v[m + 4] = parseInt(k[0]), v.splice(m + 5, 0, parseFloat(k.substring(1)))), k = v[m + 4], d === "a" ? (b += v[m + 5], x += v[m + 6]) : (b = v[m + 5], x = v[m + 6]), O += "A " + R + " " + D + " " + L + " " + I + " " + k + " " + b + " " + x + " ";
          }
        else f === "z" && (O += "Z ", b = w, x = _);
        h = f;
      }
      return O.trim();
    }
    function r(l) {
      var s = l.trim().split(" "), a, u = s.length, c = u - 1, d, f = [], h, v, g, p, m, w = new RegExp("[QAZLCM]", ""), _ = s.slice(-1)[0].toUpperCase() === "Z";
      for (d = 0; d < u; d++)
        if (a = s[d], w.test(a)) {
          if (a === "A") {
            f.push(s[d + 5] === "0" ? "1" : "0"), f.push(s[d + 4]), f.push(s[d + 3]), f.push(s[d + 2]), f.push(s[d + 1]), f.push(a), f.push(s[d + 7]), f.push(s[d + 6]), d += 7;
            continue;
          } else if (a === "C")
            p = 3, m = 2;
          else if (a === "Q")
            p = 2, m = 1;
          else if (a === "L")
            p = 1, m = 1;
          else if (a === "M")
            p = 1, m = 0;
          else
            continue;
          for (p === m && f.push(a), g = 0; g < p; g++)
            g === m && f.push(a), h = s[++d], v = s[++d], f.push(v), f.push(h);
        } else {
          var b = s.slice(Math.max(d - 3, 0), 3).join(" ");
          throw post = s.slice(d + 1, Math.min(d + 4, c)).join(" "), range = b + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + d + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      f.push("M");
      var x = "", E = f.length - 1, S;
      for (S = E; S > 0; S--)
        x += f[S] + " ";
      return _ && (x += "Z"), x = x.replace(/M M/g, "Z M"), x;
    }
    function o(a, s) {
      s = parseInt(s) == s ? s : !1;
      var a = n(a), u = a.replace(/M/g, "|M").split("|"), c;
      if (u.splice(0, 1), s !== !1 && s >= u.length)
        return a;
      if (s === !1)
        u = u.map(function(f) {
          return r(f.trim());
        });
      else {
        var d = u[s];
        d && (c = r(d.trim()), u[s] = c);
      }
      return u.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var i = {
      normalize: n,
      reverseNormalized: r,
      reverse: o
    };
    return i;
  });
})(Kg);
var aE = Kg.exports;
const sd = /* @__PURE__ */ sE(aE), uE = /* @__PURE__ */ Ae("link", {
  rel: "stylesheet",
  type: "text/css",
  href: "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css"
}, null, -1), cE = /* @__PURE__ */ Ae("div", { class: "graph-controller__graph-host uninitialised" }, null, -1), fE = {
  key: 0,
  class: "graph-controller__button-container"
}, dE = /* @__PURE__ */ Mr({
  __name: "GraphEditor",
  setup(e, { expose: t }) {
    const n = C(() => {
      const P = document.querySelectorAll("graph-component");
      let z;
      for (let W = 0; W < P.length; W++) {
        const q = P[W], G = Ye(q.shadowRoot);
        let ge;
        if (G.empty() ? ge = Ye(
          ".graph-controller__graph-host.uninitialised"
        ) : ge = G.select(
          ".graph-controller__graph-host.uninitialised"
        ), !ge.empty()) {
          ge.classed("uninitialised", !1), z = ge;
          break;
        }
      }
      return z === void 0 && (z = Ye(
        ".graph-controller__graph-host.uninitialised"
      ), z.classed("uninitialised", !1)), z;
    }), r = C(() => {
      let P = n.value.node().parentElement;
      P || (P = n.value.node().getRootNode().host);
      let z = P.getAttribute("id");
      return z || "gc";
    });
    Nl(() => {
      B();
    }), fn(() => {
      H(), window.addEventListener("resize", Br);
    }), Rl(() => {
      window.removeEventListener("resize", Br);
    });
    const o = te(!1), i = te(!1), l = te(""), s = te(""), a = te(new td()), u = te(!1), c = un(new rE());
    let d, f = 400, h = 400, v, g, p, m, w, _, b, x, E, S = 0, T = 0, A = 1, R, D;
    t({
      getGraph: L,
      setGraph: I,
      printGraph: k,
      setNodeColor: O,
      setLinkColor: M,
      deleteNode: j,
      deleteLink: N,
      toggleNodeLabels: Bu,
      toggleLinkLabels: Ou,
      toggleZoom: Fu,
      toggleNodePhysics: Mt,
      toggleFixedLinkDistance: mo,
      toggleGraphEditingInGUI: F,
      resetView: Br
    });
    function L(P = "json") {
      if (P.toLowerCase() === "json")
        return JSON.parse(
          a.value.toJSON(c.showLinkLabels, c.showLinkLabels, !0, !0, !0)
        );
      if (P.toLowerCase() === "tgf")
        return a.value.toTGF(c.showNodeLabels, c.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function I(P) {
      typeof P == "object" || typeof P == "string" ? Du(P) : ss();
    }
    function k(P = "json") {
      P.toLowerCase() === "json" ? console.log(
        a.value.toJSON(c.showLinkLabels, c.showLinkLabels, !0, !0, !0)
      ) : console.log(a.value.toTGF(c.showNodeLabels, c.showLinkLabels));
    }
    function O(P, z) {
      if (z !== void 0) {
        const q = (Array.isArray(z) ? z : [z]).map(Number);
        for (const G of q)
          w.selectAll("circle").filter((ge) => ge.id === G).each((ge) => ge.color = P).style("fill", P);
      } else
        w.selectAll("circle").each((W) => W.color = P).style("fill", P);
    }
    function M(P, z) {
      if (z) {
        const W = Array.isArray(z) ? z : [z];
        Hu(W);
        for (const q of W)
          m.selectAll(".graph-controller__link").filter((G) => G.id === q).each((G) => G.color = P).style("stroke", P);
      } else
        Hu(a.value.links.map((W) => W.id)), m.selectAll(".graph-controller__link").each((W) => W.color = P).style("stroke", P);
      Sa(p, r.value, c, P);
    }
    function j(P) {
      const z = Array.isArray(P) ? P : [P];
      for (const W of z)
        w.selectAll("circle").filter((q) => q.id === W).each(function(q) {
          let G = a.value.removeNode(q);
          if (G !== void 0) {
            let [ge, Je] = G;
            $s(ge, n.value), Je.forEach((At) => {
              ko(At, n.value);
            });
          }
        });
      u.value = a.value.nodes.length > 0;
    }
    function N(P) {
      const z = Array.isArray(P) ? P : [P];
      for (const W of z)
        m.selectAll("path").filter((q) => q.id === W).each(function(q) {
          let G = a.value.removeLink(q);
          G !== void 0 && ko(G, n.value);
        });
    }
    function F(P) {
      c.isGraphEditableInGUI = P;
    }
    function B() {
      const P = (z) => z === "false" ? !1 : !!z;
      localStorage.wasHere && (o.value = P(localStorage.wasHere)), localStorage.showNodeLabels && (c.showNodeLabels = P(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (c.nodePhysicsEnabled = P(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (c.showLinkLabels = P(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (c.fixedLinkDistanceEnabled = P(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (c.zoomEnabled = P(localStorage.enableZoom)), localStorage.persistSettings && (c.persistSettingsLocalStorage = P(localStorage.persistSettings));
    }
    function H() {
      f = n.value.node().clientWidth, h = n.value.node().clientHeight, v = hC(
        (P) => Y(P, c.zoomEnabled),
        c.zoomEnabled
      ), p = _C(
        n.value,
        v,
        (P) => c.isGraphEditableInGUI ? ie(P) : null,
        (P) => c.isGraphEditableInGUI ? K(P) : null,
        (P) => {
          c.isGraphEditableInGUI && le(
            Gt(P, p.node())[0],
            Gt(P, p.node())[1]
          );
        }
      ), CC(p, r.value, c, a.value.getNonDefaultLinkColors()), _ = EC(p), m = kC(p), w = SC(p), d = VC(a.value, c, f, h, () => fe()), g = wC(d, f, h, c.nodeRadius), et();
    }
    function Y(P, z = !0) {
      z && (S = P.transform.x, T = P.transform.y, A = P.transform.k, p.attr("transform", `translate(${S},${T})scale(${A})`));
    }
    function ee(P, z, W, q) {
      let G = a.value.createLink(P.id, z.id, W, q);
      G !== void 0 && mC(G, n.value), et();
    }
    function le(P, z, W, q, G) {
      let ge = a.value.createNode(
        P ?? f / 2,
        z ?? h / 2,
        W,
        q,
        G
      );
      gC(ge, n.value), u.value = !0, et();
    }
    function fe() {
      w.attr("transform", (P) => `translate(${P.x},${P.y})`), m.selectAll("path").attr("d", (P) => J(P)), ot(), et();
    }
    function J(P) {
      switch (se(P), P.pathType) {
        case $t.REFLEXIVE:
          return id(P.source, [f / 2, h / 2], c);
        case $t.ARC:
          return Os(P.source, P.target, c);
        case $t.ARCREVERSE:
          return sd.reverse(Os(P.source, P.target, c));
        case $t.LINE:
          return Rs(P.source, P.target, c);
        case $t.LINEREVERSE:
          return sd.reverse(Rs(P.source, P.target, c));
        default:
          return "";
      }
    }
    function se(P) {
      P.source.id === P.target.id ? P.pathType = $t.REFLEXIVE : Ee(P.source, P.target) ? P.pathType = Fe(P.source, P.target) ? $t.ARCREVERSE : $t.ARC : P.pathType = Fe(P.source, P.target) ? $t.LINEREVERSE : $t.LINE;
    }
    function Ee(P, z) {
      return P.id !== z.id && a.value.links.some((W) => W.target.id === P.id && W.source.id === z.id) && a.value.links.some((W) => W.target.id === z.id && W.source.id === P.id);
    }
    function Fe(P, z) {
      return P.x > z.x;
    }
    function ot() {
      const P = b;
      if (P !== void 0) {
        const z = x;
        if (z !== void 0)
          _.attr("d", () => P.id === z.id ? id(P, [f / 2, h / 2], c) : Ee(P, z) ? Rs(P, z, c) : Os(P, z, c));
        else if (E !== void 0) {
          const W = [P.x, P.y];
          _.attr("d", ld(W, E));
        }
      }
    }
    function et(P = 0.5) {
      var z;
      m = m.data(a.value.links, (W) => W.id).join(
        (W) => {
          const q = W.append("g").classed("graph-controller__link-container", !0);
          return q.append("path").classed("graph-controller__link", !0).style("stroke", (G) => G.color ? G.color : "").attr("id", (G) => r.value + "-link-" + G.id).attr(
            "marker-end",
            (G) => G.color ? `url(#${r.value}-link-arrow-` + G.color : `url(#${r.value}-link-arrow)`
          ), q.append("path").classed("graph-controller__click-box", !0).on("dblclick", (G) => {
            Nt(G);
          }).on("pointerout", (G) => Q(G)).on("pointerdown", (G, ge) => {
            yC(ge, G.button, n.value), c.isGraphEditableInGUI && ye(G, ge);
          }).on("pointerup", (G, ge) => {
            ue(G, ge);
          }), q.append("text").append("textPath").attr(
            "class",
            (G) => G.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
          ).attr("href", (G) => `#${r.value + "-link-" + G.id}`).attr("startOffset", "50%").text((G) => G.label ? G.label : "add label").on("click", (G, ge) => {
            c.isGraphEditableInGUI && Re(G, ge);
          }).on("dblclick", (G) => {
            Nt(G);
          }), q.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
            (G) => `<div class=${G.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}>
                            </div>`
          ).on("click", (G, ge) => {
            c.isGraphEditableInGUI && Re(G, ge);
          }).on("dblclick", (G) => {
            Nt(G);
          }), q;
        },
        (W) => (W.selectChild("path").attr("marker-start", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE")) {
            let ge = `url(#${r.value}-link-arrow-reverse`;
            return q.color && (ge += "-" + ei(q.color)), ge += ")", ge;
          } else
            return null;
        }).attr("marker-end", function(q) {
          var G;
          if ((G = q.pathType) != null && G.includes("REVERSE"))
            return null;
          {
            let ge = `url(#${r.value}-link-arrow`;
            return q.color && (ge += "-" + ei(q.color)), ge += ")", ge;
          }
        }), W.selectChild("text").attr("class", (q) => {
          var G;
          return `graph-controller__${(G = q.pathType) == null ? void 0 : G.toLowerCase()}-path-text`;
        }).attr("dy", (q) => {
          var G;
          return q.pathType === $t.REFLEXIVE ? 15 : q.pathType == $t.LINEREVERSE ? -10 : (G = q.pathType) != null && G.includes("REVERSE") ? 20 : -10;
        }), W.selectChild("text").selectChild("textPath").classed("hidden", !c.showLinkLabels).classed("not-editable", !c.isGraphEditableInGUI).attr("startOffset", (q) => {
          var G;
          return (G = q.pathType) != null && G.includes("REVERSE") ? "46%" : "50%";
        }), W.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function() {
          const q = Ye(
            this.parentNode.parentNode.parentNode
          ).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed("hidden", !c.showLinkLabels).node(), G = Ye(this).remove().node();
          q == null || q.appendChild(G);
        }), W.selectChild("text").selectChild("textPath").each(function() {
          const q = this;
          let G = !1;
          q.childNodes.forEach((Je) => {
            var At;
            (Je == null ? void 0 : Je.nodeType) === Node.TEXT_NODE && ((At = Je == null ? void 0 : Je.textContent) == null ? void 0 : At.trim()) !== "" && (G = !0);
          }), G || Ye(q).text("I").attr(
            "class",
            "graph-controller__link-label-placeholder mjx-hidden"
          );
        }), W.selectChild("text").selectChild("textPath").each(function() {
          const q = this, [G, ge] = go(q);
          Ye(q.parentNode.parentNode).select("foreignObject").attr("x", G).attr("y", ge);
        }), W)
      ), w = w.data(a.value.nodes, (W) => W.id).join(
        (W) => {
          const q = W.append("g").classed("graph-controller__node-container", !0).call(g).on("dblclick", (G) => {
            Nt(G);
          });
          return q.append("circle").classed("graph-controller__node", !0).attr("id", (G) => `${r.value + "-node-" + G.id}`).attr("r", c.nodeRadius).style("fill", (G) => G.color ? G.color : "").on("mouseenter", (G, ge) => ne(ge)).on("mouseout", (G, ge) => oe(ge)).on("pointerdown", (G, ge) => {
            pC(ge, G.button, n.value), c.isGraphEditableInGUI && pn(G, ge);
          }).on("pointerup", (G, ge) => {
            c.isGraphEditableInGUI && K(G, ge);
          }), q.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).attr("y", -0.5 * c.nodeRadius).html(
            (G) => `<div class=${G.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"}>
                                ${G.label ? G.label : "add label"}
                            </div>`
          ).on("click", (G, ge) => {
            c.isGraphEditableInGUI && $e(G, ge);
          }).on("dblclick", (G) => {
            Nt(G);
          }).on("mouseenter", (G, ge) => x = ge).on("mouseout", () => x = void 0), q;
        },
        (W) => (W.selectChild("foreignObject").selectChild("div").classed("hidden", !c.showNodeLabels).classed("not-editable", !c.isGraphEditableInGUI), W)
      ), (z = window.MathJax) != null && z.version && window.MathJax.typeset(), d.nodes(a.value.nodes), d.alpha(P).restart();
    }
    function pn(P, z) {
      P.button === 2 && (U(z), R = setTimeout(() => {
        x = void 0, V(z);
      }, 250));
    }
    function V(P) {
      let z = n.value.node().querySelector(`#${r.value + "-node-" + P.id}`);
      Ye(z).classed("on-deletion", !0);
      let W = Ye(z.parentElement);
      W.select("g.arc").remove();
      let q = eC().outerRadius(c.nodeRadius + 4).innerRadius(c.nodeRadius), G = [{ startAngle: 0, endAngle: 0 }];
      W.append("g").attr("class", "arc").selectAll("path.arc").data(G).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(iS).attrTween("d", function(Je) {
        let At = { startAngle: 0, endAngle: 2 * Math.PI }, as = Iu(Je, At);
        return function(tm) {
          return q(as(tm));
        };
      }).on("end", () => $(P));
    }
    function $(P) {
      if (c.isGraphEditableInGUI) {
        let z = a.value.removeNode(P);
        if (z !== void 0) {
          let [W, q] = z;
          $s(W, n.value), q.forEach((G) => {
            ko(G, n.value);
          });
        }
        u.value = a.value.nodes.length > 0, ls(), et();
      }
    }
    function U(P) {
      const z = [P.x, P.y];
      E = z, b = P, _.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", ld(z, z)), et();
    }
    function K(P, z = void 0) {
      Nt(P), clearTimeout(R), z && X(z), re();
    }
    function X(P) {
      let z = n.value.node().querySelector(`#${r.value + "-node-" + P.id}`).parentElement, W = Ye(z);
      W.select("circle").classed("on-deletion", !1), W.select("g.arc").select("path.arc").interrupt().remove();
    }
    function re() {
      const P = b, z = x;
      ls(), !(P === void 0 || z === void 0) && ee(P, z);
    }
    function ie(P) {
      if (Nt(P), b !== void 0) {
        const z = g2(P, n.value.node())[0], W = [
          (z[0] - S) / A,
          (z[1] - T) / A
        ];
        P.pointerType === "touch" && (W[1] = W[1] - 4 * c.nodeRadius, x = a.value.nodes.find(
          (q) => Math.sqrt(Math.pow(q.x - W[0], 2) + Math.pow(q.y - W[1], 2)) < c.nodeRadius
        )), E = W, ot();
      }
    }
    function ne(P) {
      x = P;
    }
    function oe(P) {
      P && X(P), x = void 0, clearTimeout(R);
    }
    function Q(P) {
      Nt(P), clearTimeout(D);
    }
    function ue(P, z) {
      Nt(P), clearTimeout(D), P.button === 2 && Pe(z);
    }
    function ye(P, z) {
      P.button === 2 && (Nt(P), D = setTimeout(() => {
        me(z);
      }, 250));
    }
    function me(P) {
      let z = n.value.node().querySelector(`#${r.value + "-link-" + P.id}`);
      if (z instanceof SVGPathElement) {
        let W = Ye(z), q = z.getTotalLength(), G = z.parentElement.querySelector("text"), ge = Array.from(G.classList).some(
          (as) => as.includes("reverse")
        ), Je = 0, At = ge ? q : -q;
        W.attr("stroke-dasharray", q).attr("stroke-dashoffset", Je).transition().duration(750).attr("stroke-dashoffset", At).on("end", () => Se(P));
      }
    }
    function Se(P) {
      let z = P.color;
      if (c.isGraphEditableInGUI) {
        let W = a.value.removeLink(P);
        W !== void 0 && ko(W, n.value), z && (a.value.hasNonDefaultLinkColor(z) || Ns(p, r.value, z));
      }
    }
    function Pe(P) {
      let z = n.value.node().querySelector(`#${r.value + "-link-" + P.id}`);
      if (z instanceof SVGPathElement) {
        let W = Ye(z), q = z.getTotalLength();
        W.attr("stroke-dasharray", q).attr("stroke-dashoffset", q).transition().attr("stroke-dashoffset", 0).on("end", () => {
          W.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
    }
    function $e(P, z) {
      const q = (P == null ? void 0 : P.target).closest("div");
      qe(z, q, [z.x, z.y]);
    }
    function Re(P, z) {
      let W = P.target, q;
      W.nodeName === "textPath" ? q = W : q = W.closest(".link-container").querySelector("textPath");
      let G = go(q);
      qe(z, q, G);
    }
    function qe(P, z, W) {
      let q = P instanceof zg ? "node" : "link";
      const G = document.createElement("input");
      G.setAttribute("class", "graph-controller__label-input"), G.setAttribute("id", `${q}-label-input-field`), P.label == null ? G.value = "" : G.value = P.label, G.placeholder = `Enter ${q} label`, G.ondblclick = function(At) {
        Nt(At);
      };
      let ge = !1;
      G.onkeyup = function(At) {
        At.key === "Enter" ? (bC(P, G.value, n.value), ge = !0, G.blur()) : At.key === "Escape" && (G.value = "", G.blur());
      }, G.onblur = function() {
        ge && (q === "link" && Tt(z), G.value === "" ? mi(z, P, q) : (sr(G, z, P, q), q === "node" && Un(z))), Je.remove();
      };
      const Je = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      Je.setAttribute("width", "100%"), Je.setAttribute("height", "100%"), Je.setAttribute("x", `${W[0] - 80}`), Je.setAttribute("y", `${W[1] - 12}`), Je.append(G), n.value.select("svg").select("g").node().append(Je), G.focus();
    }
    function Tt(P) {
      var W;
      const z = P.closest(".graph-controller__link-container");
      (W = z.querySelector("mjx-container")) == null || W.remove(), z.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder");
    }
    function Un(P) {
      let z = P.closest(
        ".graph-controller__node-container"
      );
      const W = z.parentElement;
      z.remove(), W.append(z);
    }
    function mi(P, z, W) {
      P.setAttribute(
        "class",
        `graph-controller__${W}-label-placeholder`
      ), P.textContent = "add label", z.label = void 0;
    }
    function sr(P, z, W, q) {
      z.setAttribute("class", `graph-controller__${q}-label`), z.textContent = P.value.trim(), W.label = z.textContent;
    }
    function go(P) {
      let z = n.value.select("svg").node().getBoundingClientRect(), W = P.getBoundingClientRect(), q = (W.x - z.x - S) / A, G = (W.y - z.y - T) / A;
      return [q, G];
    }
    function ft(P) {
      Bu(P.showNodeLabels), Mt(P.nodePhysicsEnabled), Ou(P.showLinkLabels), mo(P.fixedLinkDistanceEnabled), Fu(P.zoomEnabled), c.persistSettingsLocalStorage = P.persistEnabled;
    }
    function Mt(P) {
      c.nodePhysicsEnabled = P, Gg(d, P, f, h);
    }
    function mo(P) {
      c.fixedLinkDistanceEnabled = P, Ug(d, a.value, c, P);
    }
    function Ou(P) {
      c.showLinkLabels = P;
    }
    function Bu(P) {
      c.showNodeLabels = P;
    }
    function Fu(P) {
      c.zoomEnabled = P, Br();
    }
    function ls() {
      _ == null || _.classed("hidden", !0).attr("marker-end", "null"), b = void 0, x = void 0, E = void 0;
    }
    function Du(P) {
      let z, W;
      try {
        if (typeof P == "string")
          [z, W] = oE(P);
        else if (typeof P == "object")
          [z, W] = iE(P);
        else {
          ju("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (q) {
        ju("Error during parsing:", `Invalid data format:
` + q);
        return;
      }
      ss(), em(z, W);
    }
    function em(P, z) {
      for (let q of P)
        le(
          q.x,
          q.y,
          q.idImported,
          q.label,
          q.color
        );
      const W = (q) => a.value.nodes.find((G) => G.idImported === q);
      for (let q of z) {
        let G = W(q.sourceIdImported), ge = W(q.targetIdImported);
        G && ge && (ee(G, ge, q.label, q.color), q.color && Sa(p, r.value, c, q.color));
      }
    }
    function Hu(P) {
      for (let z of P) {
        const W = a.value.links.filter((q) => q.id === z).map((q) => q.color).shift();
        W && (a.value.hasNonDefaultLinkColor(W, z) ? a.value.getLinkIdsWithNonDefaultLinkColors(
          W,
          z
        ).every(
          (ge) => P.includes(ge)
        ) && Ns(p, r.value, W) : Ns(p, r.value, W));
      }
    }
    function Br() {
      d.stop(), n.value.selectChildren().remove(), v = void 0, S = 0, T = 0, A = 1, p = void 0, _ = void 0, m = void 0, w = void 0, d = void 0, ls(), B(), H();
    }
    function ss() {
      a.value.links.forEach((P) => ko(P, n.value)), a.value.nodes.forEach((P) => $s(P, n.value)), a.value = new td(), u.value = !1, Br();
    }
    function ju(P, z) {
      console.error(P + `
` + z), i.value = !0, l.value = P, s.value = z.toString(), window.setInterval(() => i.value = !1, 6e3);
    }
    return (P, z) => (vt(), el(Le, null, [
      uE,
      cE,
      c.hasToolbar ? (vt(), el("div", fE, [
        y(Zr, {
          location: "bottom",
          "open-delay": 750,
          text: "Create Node"
        }, {
          activator: ce(({ props: W }) => [
            c.isGraphEditableInGUI ? (vt(), ln(ut, he({
              key: 0,
              "aria-label": "Create Node",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$addNode"
            }, W, {
              variant: "plain",
              onClick: z[0] || (z[0] = (q) => le())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Zr, {
          location: "bottom",
          "open-delay": 750,
          text: "Delete Graph"
        }, {
          activator: ce(({ props: W }) => [
            c.isGraphEditableInGUI ? (vt(), ln(ut, he({
              key: 0,
              "aria-label": "Delete Graph",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$deleteGraph"
            }, W, {
              variant: "plain",
              onClick: z[1] || (z[1] = (q) => ss())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Zr, {
          location: "bottom",
          "open-delay": 750,
          text: "Reset View"
        }, {
          activator: ce(({ props: W }) => [
            c.zoomEnabled ? (vt(), ln(ut, he({
              key: 0,
              "aria-label": "Reset View",
              class: "mx-1",
              color: "grey",
              density: "comfortable",
              elevation: "6",
              icon: "$resetView"
            }, W, {
              variant: "plain",
              onClick: z[2] || (z[2] = (q) => Br())
            }), null, 16)) : en("", !0)
          ]),
          _: 1
        }),
        y(Nb, {
          "graph-as-tgf": a.value.toTGF(c.showNodeLabels, c.showLinkLabels, !1, !1),
          "graph-as-json": a.value.toJSON(c.showNodeLabels, c.showLinkLabels, !0, !0, !0),
          onFileImported: Du
        }, null, 8, ["graph-as-tgf", "graph-as-json"]),
        y(zb),
        y(A_, {
          config: c,
          "is-welcome": !o.value,
          onUpdateSettings: ft
        }, null, 8, ["config", "is-welcome"])
      ])) : en("", !0),
      He(Ae("div", null, [
        y(Yv, {
          class: "graph-controller__info-text-background text-subtitle-1 text-grey",
          "show-controls-graph": "",
          "show-latex-info": !1,
          "show-controls-environment": !1,
          "show-header": !1
        })
      ], 512), [
        [bt, !u.value]
      ]),
      y(sa, {
        modelValue: i.value,
        "onUpdate:modelValue": z[3] || (z[3] = (W) => i.value = W),
        color: "error",
        variant: "tonal"
      }, {
        default: ce(() => [
          y(kt, { align: "center" }, {
            default: ce(() => [
              y(ze, {
                icon: "$error",
                class: "ml-2"
              }),
              y(Gr, null, {
                default: ce(() => [
                  Ae("h4", null, ht(l.value), 1),
                  Ae("p", null, ht(s.value), 1)
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
}), hE = ".graph-controller__graph-host{position:absolute;width:100%;height:100%;touch-action:none;background-color:#d3d3d3}.graph-controller__link{stroke:#004c97;stroke-width:4px;fill:none}.graph-controller__link.hidden{stroke-width:0}.graph-controller__link.draggable{stroke:#007dae;stroke-dasharray:8px 2px;pointer-events:none}.graph-controller__click-box{stroke:#0000;stroke-width:16px;fill:none;cursor:pointer}.graph-controller__arrow{fill:#004c97}.graph-controller__arrow.draggable{fill:#007dae}.graph-controller__line-path-text,.graph-controller__arc-path-text,.graph-controller__line-reverse-path-text,.graph-controller__arc-reverse-path-text,.graph-controller__reflexive-path-text,.graph-controller__link-label-mathjax-container{text-anchor:middle;pointer-events:all;cursor:text;opacity:1;stroke:none}.graph-controller__line-path-text .graph-controller__link-label,.graph-controller__arc-path-text .graph-controller__link-label,.graph-controller__line-reverse-path-text .graph-controller__link-label,.graph-controller__arc-reverse-path-text .graph-controller__link-label,.graph-controller__reflexive-path-text .graph-controller__link-label,.graph-controller__link-label-mathjax-container .graph-controller__link-label{fill:#000;stroke:none;font-size:1rem}.graph-controller__line-path-text .graph-controller__link-label.hidden,.graph-controller__arc-path-text .graph-controller__link-label.hidden,.graph-controller__line-reverse-path-text .graph-controller__link-label.hidden,.graph-controller__arc-reverse-path-text .graph-controller__link-label.hidden,.graph-controller__reflexive-path-text .graph-controller__link-label.hidden,.graph-controller__link-label-mathjax-container .graph-controller__link-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.graph-controller__line-path-text .graph-controller__link-label.not-editable,.graph-controller__arc-path-text .graph-controller__link-label.not-editable,.graph-controller__line-reverse-path-text .graph-controller__link-label.not-editable,.graph-controller__arc-reverse-path-text .graph-controller__link-label.not-editable,.graph-controller__reflexive-path-text .graph-controller__link-label.not-editable,.graph-controller__link-label-mathjax-container .graph-controller__link-label.not-editable{cursor:pointer}.graph-controller__line-path-text .graph-controller__link-label-placeholder,.graph-controller__arc-path-text .graph-controller__link-label-placeholder,.graph-controller__line-reverse-path-text .graph-controller__link-label-placeholder,.graph-controller__arc-reverse-path-text .graph-controller__link-label-placeholder,.graph-controller__reflexive-path-text .graph-controller__link-label-placeholder,.graph-controller__link-label-mathjax-container .graph-controller__link-label-placeholder{fill:#696969;font-style:oblique;font-size:.85rem}.graph-controller__line-path-text .graph-controller__link-label-placeholder.hidden,.graph-controller__arc-path-text .graph-controller__link-label-placeholder.hidden,.graph-controller__line-reverse-path-text .graph-controller__link-label-placeholder.hidden,.graph-controller__arc-reverse-path-text .graph-controller__link-label-placeholder.hidden,.graph-controller__reflexive-path-text .graph-controller__link-label-placeholder.hidden,.graph-controller__link-label-mathjax-container .graph-controller__link-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.graph-controller__line-path-text .graph-controller__link-label-placeholder.not-editable,.graph-controller__arc-path-text .graph-controller__link-label-placeholder.not-editable,.graph-controller__line-reverse-path-text .graph-controller__link-label-placeholder.not-editable,.graph-controller__arc-reverse-path-text .graph-controller__link-label-placeholder.not-editable,.graph-controller__reflexive-path-text .graph-controller__link-label-placeholder.not-editable,.graph-controller__link-label-mathjax-container .graph-controller__link-label-placeholder.not-editable{cursor:pointer}.graph-controller__line-path-text .graph-controller__link-label-placeholder.mjx-hidden,.graph-controller__arc-path-text .graph-controller__link-label-placeholder.mjx-hidden,.graph-controller__line-reverse-path-text .graph-controller__link-label-placeholder.mjx-hidden,.graph-controller__arc-reverse-path-text .graph-controller__link-label-placeholder.mjx-hidden,.graph-controller__reflexive-path-text .graph-controller__link-label-placeholder.mjx-hidden,.graph-controller__link-label-mathjax-container .graph-controller__link-label-placeholder.mjx-hidden{visibility:hidden;cursor:pointer;pointer-events:none}.graph-controller__node{fill:#eb9850;stroke:none;cursor:pointer}.graph-controller__node:not(.on-deletion):hover{stroke:#006597;stroke-dasharray:8,3;stroke-width:2;filter:grayscale(30%)}.graph-controller__link-label-mathjax-container,.graph-controller__node-label-container{overflow:visible}.graph-controller__node-label{display:flex;justify-content:center;align-items:center;font-size:1rem;opacity:1;text-align:center;pointer-events:all;cursor:text}.graph-controller__node-label.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.graph-controller__node-label.not-editable{cursor:pointer}.graph-controller__node-label-placeholder{color:#696969;display:flex;justify-content:center;font-style:oblique;font-size:.85rem;opacity:1;pointer-events:all;cursor:text;position:relative;top:-6px}.graph-controller__node-label-placeholder.hidden{visibility:hidden;cursor:pointer;pointer-events:none}.graph-controller__node-label-placeholder.not-editable{cursor:pointer}.graph-controller__label-input{background-color:#ffffffe6}.graph-controller__button-container{position:absolute;top:1rem;left:1rem;margin-top:-6px}.graph-controller__button-container>*{margin-top:6px}*:not(input):not(.selectable){-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.graph-controller__info-text-background{width:50%;height:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}", vE = /* @__PURE__ */ xu(dE, [["styles", [hE]]]), Ca = {
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
function gE(e, t) {
  const n = [];
  let r = [];
  const o = Xg(e), i = Zg(e), l = (o.getDay() - Ca[t.slice(-2).toUpperCase()] + 7) % 7, s = (i.getDay() - Ca[t.slice(-2).toUpperCase()] + 7) % 7;
  for (let a = 0; a < l; a++) {
    const u = new Date(o);
    u.setDate(u.getDate() - (l - a)), r.push(u);
  }
  for (let a = 1; a <= i.getDate(); a++) {
    const u = new Date(e.getFullYear(), e.getMonth(), a);
    r.push(u), r.length === 7 && (n.push(r), r = []);
  }
  for (let a = 1; a < 7 - s; a++) {
    const u = new Date(i);
    u.setDate(u.getDate() + a), r.push(u);
  }
  return r.length > 0 && n.push(r), n;
}
function mE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 0; )
    t.setDate(t.getDate() - 1);
  return t;
}
function pE(e) {
  const t = new Date(e);
  for (; t.getDay() !== 6; )
    t.setDate(t.getDate() + 1);
  return t;
}
function Xg(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Zg(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function yE(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const bE = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Jg(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (bE.test(e))
      return yE(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const ad = new Date(2e3, 0, 2);
function wE(e) {
  const t = Ca[e.slice(-2).toUpperCase()];
  return Ja(7).map((n) => {
    const r = new Date(ad);
    return r.setDate(ad.getDate() + t + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(r);
  });
}
function _E(e, t, n, r) {
  const o = Jg(e) ?? /* @__PURE__ */ new Date(), i = r == null ? void 0 : r[t];
  if (typeof i == "function")
    return i(o, t, n);
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
      return new Intl.NumberFormat(n).format(o.getDate());
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
      l = i ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, l).format(o);
}
function xE(e, t) {
  const n = e.toJsDate(t), r = n.getFullYear(), o = Rc(String(n.getMonth() + 1), 2, "0"), i = Rc(String(n.getDate()), 2, "0");
  return `${r}-${o}-${i}`;
}
function kE(e) {
  const [t, n, r] = e.split("-").map(Number);
  return new Date(t, n - 1, r);
}
function SE(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function CE(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function EE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function VE(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function LE(e, t) {
  const n = new Date(e);
  return n.setMonth(n.getMonth() + t), n;
}
function PE(e) {
  return e.getFullYear();
}
function IE(e) {
  return e.getMonth();
}
function TE(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function ME(e) {
  return e.getHours();
}
function AE(e) {
  return e.getMinutes();
}
function $E(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function NE(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function RE(e, t) {
  return Ea(e, t[0]) && BE(e, t[1]);
}
function OE(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Ea(e, t) {
  return e.getTime() > t.getTime();
}
function BE(e, t) {
  return e.getTime() < t.getTime();
}
function ud(e, t) {
  return e.getTime() === t.getTime();
}
function FE(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function DE(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function HE(e, t, n) {
  const r = new Date(e), o = new Date(t);
  switch (n) {
    case "years":
      return r.getFullYear() - o.getFullYear();
    case "quarters":
      return Math.floor((r.getMonth() - o.getMonth() + (r.getFullYear() - o.getFullYear()) * 12) / 4);
    case "months":
      return r.getMonth() - o.getMonth() + (r.getFullYear() - o.getFullYear()) * 12;
    case "weeks":
      return Math.floor((r.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((r.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((r.getTime() - o.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((r.getTime() - o.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((r.getTime() - o.getTime()) / 1e3);
    default:
      return r.getTime() - o.getTime();
  }
}
function jE(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function zE(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function GE(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function UE(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function WE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function qE(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class YE {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return Jg(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return xE(this, t);
  }
  parseISO(t) {
    return kE(t);
  }
  addMinutes(t, n) {
    return SE(t, n);
  }
  addHours(t, n) {
    return CE(t, n);
  }
  addDays(t, n) {
    return EE(t, n);
  }
  addWeeks(t, n) {
    return VE(t, n);
  }
  addMonths(t, n) {
    return LE(t, n);
  }
  getWeekArray(t) {
    return gE(t, this.locale);
  }
  startOfWeek(t) {
    return mE(t);
  }
  endOfWeek(t) {
    return pE(t);
  }
  startOfMonth(t) {
    return Xg(t);
  }
  endOfMonth(t) {
    return Zg(t);
  }
  format(t, n) {
    return _E(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return ud(t, n);
  }
  isValid(t) {
    return OE(t);
  }
  isWithinRange(t, n) {
    return RE(t, n);
  }
  isAfter(t, n) {
    return Ea(t, n);
  }
  isBefore(t, n) {
    return !Ea(t, n) && !ud(t, n);
  }
  isSameDay(t, n) {
    return FE(t, n);
  }
  isSameMonth(t, n) {
    return DE(t, n);
  }
  setMinutes(t, n) {
    return zE(t, n);
  }
  setHours(t, n) {
    return jE(t, n);
  }
  setMonth(t, n) {
    return GE(t, n);
  }
  setYear(t, n) {
    return UE(t, n);
  }
  getDiff(t, n, r) {
    return HE(t, n, r);
  }
  getWeekdays() {
    return wE(this.locale);
  }
  getYear(t) {
    return PE(t);
  }
  getMonth(t) {
    return IE(t);
  }
  getNextMonth(t) {
    return TE(t);
  }
  getHours(t) {
    return ME(t);
  }
  getMinutes(t) {
    return AE(t);
  }
  startOfDay(t) {
    return WE(t);
  }
  endOfDay(t) {
    return qE(t);
  }
  startOfYear(t) {
    return $E(t);
  }
  endOfYear(t) {
    return NE(t);
  }
}
const KE = Symbol.for("vuetify:date-options"), cd = Symbol.for("vuetify:date-adapter");
function XE(e, t) {
  const n = Ft({
    adapter: YE,
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
    instance: ZE(n, t)
  };
}
function ZE(e, t) {
  const n = un(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return we(t.current, (r) => {
    n.locale = e.locale[r] ?? r ?? n.locale;
  }), n;
}
const JE = Symbol.for("vuetify:goto");
function QE() {
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
function eV(e, t) {
  return {
    rtl: t.isRtl,
    options: Ft(QE(), e)
  };
}
function Qg() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, r = Ft(t, n), {
    aliases: o = {},
    components: i = {},
    directives: l = {}
  } = r, s = cy(r.defaults), a = S1(r.display, r.ssr), u = wy(r.theme), c = Py(r.icons), d = Oy(r.locale), f = XE(r.date, d), h = eV(r.goTo, d);
  return {
    install: (g) => {
      for (const p in l)
        g.directive(p, l[p]);
      for (const p in i)
        g.component(p, i[p]);
      for (const p in o)
        g.component(p, hn({
          ...o[p],
          name: p,
          aliasName: o[p].name
        }));
      if (u.install(g), g.provide(ro, s), g.provide(la, a), g.provide(fl, u), g.provide(ea, c), g.provide(dl, d), g.provide(KE, f.options), g.provide(cd, f.instance), g.provide(JE, h), Oe && r.ssr)
        if (g.$nuxt)
          g.$nuxt.hook("app:suspense:resolve", () => {
            a.update();
          });
        else {
          const {
            mount: p
          } = g;
          g.mount = function() {
            const m = p(...arguments);
            return Xe(() => a.update()), g.mount = p, m;
          };
        }
      Lt.reset(), g.mixin({
        computed: {
          $vuetify() {
            return un({
              defaults: Hr.call(this, ro),
              display: Hr.call(this, la),
              theme: Hr.call(this, fl),
              icons: Hr.call(this, ea),
              locale: Hr.call(this, dl),
              date: Hr.call(this, cd)
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
const tV = "3.5.9";
Qg.version = tV;
function Hr(e) {
  var r, o;
  const t = this.$, n = ((r = t.parent) == null ? void 0 : r.provides) ?? ((o = t.vnode.appContext) == null ? void 0 : o.provides);
  if (n && e in n)
    return n[e];
}
const nV = {
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
}, rV = {
  component: su
};
var oV = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", iV = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", lV = "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M15 11.93V19H7.93L10.05 16.88L7.22 14.05L10.05 11.22L12.88 14.05L15 11.93Z", sV = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z", aV = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z", uV = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", cV = "M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z";
const fV = Qg({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...nV,
      addNode: cV,
      deleteGraph: iV,
      help: sV,
      importExport: lV,
      resetView: uV,
      settings: oV,
      helpCircle: aV
    },
    sets: {
      mdi: rV
    }
  }
});
/*! (c) Andrea Giammarchi - ISC */
(() => {
  const e = "DOMContentLoaded", t = /* @__PURE__ */ new WeakMap(), n = [], r = (l) => {
    do
      if (l.nextSibling)
        return !0;
    while (l = l.parentNode);
    return !1;
  }, o = () => {
    n.splice(0).forEach((l) => {
      t.get(l[0]) !== !0 && (t.set(l[0], !0), l[0][l[1]]());
    });
  };
  document.addEventListener(e, o);
  class i extends HTMLElement {
    static withParsedCallback(s, a = "parsed") {
      const { prototype: u } = s, { connectedCallback: c } = u, d = a + "Callback", f = (v, g, p, m) => {
        g.disconnect(), p.removeEventListener(e, m), h(v);
      }, h = (v) => {
        n.length || requestAnimationFrame(o), n.push([v, d]);
      };
      return Object.defineProperties(
        u,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (c && c.apply(this, arguments), d in this && !t.has(this)) {
                const v = this, { ownerDocument: g } = v;
                if (t.set(v, !1), g.readyState === "complete" || r(v))
                  h(v);
                else {
                  const p = () => f(v, m, g, p);
                  g.addEventListener(e, p);
                  const m = new MutationObserver(() => {
                    r(v) && f(v, m, g, p);
                  });
                  m.observe(v.parentNode, { childList: !0, subtree: !0 });
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
  return i.withParsedCallback(i);
})();
customElements.define(
  "graph-component",
  // Menu Version without CLI or LaTeX functionality
  M0(vE, { plugins: [fV] })
  // CLI Version with ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  // CLI Version with LaTeX without ShadowRoot for MathJax to work
  // defineCustomElementToggleShadowRootOption(GraphEditor, { shadowRoot: false })
);
