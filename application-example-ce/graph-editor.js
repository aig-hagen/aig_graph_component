var vl = Object.defineProperty
var xl = (t, e, r) =>
    e in t ? vl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)
var Pt = (t, e, r) => (xl(t, typeof e != 'symbol' ? e + '' : e, r), r)
/**
 * @vue/shared v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function ri(t, e) {
    const r = new Set(t.split(','))
    return e ? (n) => r.has(n.toLowerCase()) : (n) => r.has(n)
}
const dt = {},
    ze = [],
    zt = () => {},
    bl = () => !1,
    rr = (t) =>
        t.charCodeAt(0) === 111 &&
        t.charCodeAt(1) === 110 && // uppercase letter
        (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
    ii = (t) => t.startsWith('onUpdate:'),
    mt = Object.assign,
    si = (t, e) => {
        const r = t.indexOf(e)
        r > -1 && t.splice(r, 1)
    },
    El = Object.prototype.hasOwnProperty,
    ut = (t, e) => El.call(t, e),
    J = Array.isArray,
    nn = (t) => sr(t) === '[object Map]',
    Sl = (t) => sr(t) === '[object Set]',
    nt = (t) => typeof t == 'function',
    vt = (t) => typeof t == 'string',
    ir = (t) => typeof t == 'symbol',
    gt = (t) => t !== null && typeof t == 'object',
    Hs = (t) => (gt(t) || nt(t)) && nt(t.then) && nt(t.catch),
    Ml = Object.prototype.toString,
    sr = (t) => Ml.call(t),
    Rl = (t) => sr(t).slice(8, -1),
    $l = (t) => sr(t) === '[object Object]',
    oi = (t) => vt(t) && t !== 'NaN' && t[0] !== '-' && '' + parseInt(t, 10) === t,
    rn = /* @__PURE__ */ ri(
        // the leading comma is intentional so empty string "" is also included
        ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
    ),
    or = (t) => {
        const e = /* @__PURE__ */ Object.create(null)
        return (r) => e[r] || (e[r] = t(r))
    },
    Nl = /-(\w)/g,
    ie = or((t) => t.replace(Nl, (e, r) => (r ? r.toUpperCase() : ''))),
    Tl = /\B([A-Z])/g,
    Bt = or((t) => t.replace(Tl, '-$1').toLowerCase()),
    Bs = or((t) => t.charAt(0).toUpperCase() + t.slice(1)),
    vr = or((t) => (t ? `on${Bs(t)}` : '')),
    _e = (t, e) => !Object.is(t, e),
    xr = (t, e) => {
        for (let r = 0; r < t.length; r++) t[r](e)
    },
    qn = (t, e, r) => {
        Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !1,
            value: r
        })
    },
    Cl = (t) => {
        const e = parseFloat(t)
        return isNaN(e) ? t : e
    },
    Oi = (t) => {
        const e = vt(t) ? Number(t) : NaN
        return isNaN(e) ? t : e
    }
let Fi
const qs = () =>
    Fi ||
    (Fi =
        typeof globalThis < 'u'
            ? globalThis
            : typeof self < 'u'
              ? self
              : typeof window < 'u'
                ? window
                : typeof global < 'u'
                  ? global
                  : {})
function li(t) {
    if (J(t)) {
        const e = {}
        for (let r = 0; r < t.length; r++) {
            const n = t[r],
                i = vt(n) ? jl(n) : li(n)
            if (i) for (const s in i) e[s] = i[s]
        }
        return e
    } else if (vt(t) || gt(t)) return t
}
const kl = /;(?![^(]*\))/g,
    Il = /:([^]+)/,
    Pl = /\/\*[^]*?\*\//g
function jl(t) {
    const e = {}
    return (
        t
            .replace(Pl, '')
            .split(kl)
            .forEach((r) => {
                if (r) {
                    const n = r.split(Il)
                    n.length > 1 && (e[n[0].trim()] = n[1].trim())
                }
            }),
        e
    )
}
function ui(t) {
    let e = ''
    if (vt(t)) e = t
    else if (J(t))
        for (let r = 0; r < t.length; r++) {
            const n = ui(t[r])
            n && (e += n + ' ')
        }
    else if (gt(t)) for (const r in t) t[r] && (e += r + ' ')
    return e.trim()
}
const Ll = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    Ol = /* @__PURE__ */ ri(Ll)
function Us(t) {
    return !!t || t === ''
}
/**
 * @vue/reactivity v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let Vt
class Fl {
    constructor(e = !1) {
        ;(this.detached = e),
            (this._active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = Vt),
            !e && Vt && (this.index = (Vt.scopes || (Vt.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(e) {
        if (this._active) {
            const r = Vt
            try {
                return (Vt = this), e()
            } finally {
                Vt = r
            }
        }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
        Vt = this
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
        Vt = this.parent
    }
    stop(e) {
        if (this._active) {
            let r, n
            for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop()
            for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]()
            if (this.scopes) for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0)
            if (!this.detached && this.parent && !e) {
                const i = this.parent.scopes.pop()
                i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index))
            }
            ;(this.parent = void 0), (this._active = !1)
        }
    }
}
function zl(t, e = Vt) {
    e && e.active && e.effects.push(t)
}
function Al() {
    return Vt
}
let $e
class fi {
    constructor(e, r, n, i) {
        ;(this.fn = e),
            (this.trigger = r),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            (this._dirtyLevel = 4),
            (this._trackId = 0),
            (this._runnings = 0),
            (this._shouldSchedule = !1),
            (this._depsLength = 0),
            zl(this, i)
    }
    get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
            ;(this._dirtyLevel = 1), ke()
            for (let e = 0; e < this._depsLength; e++) {
                const r = this.deps[e]
                if (r.computed && (Vl(r.computed), this._dirtyLevel >= 4)) break
            }
            this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ie()
        }
        return this._dirtyLevel >= 4
    }
    set dirty(e) {
        this._dirtyLevel = e ? 4 : 0
    }
    run() {
        if (((this._dirtyLevel = 0), !this.active)) return this.fn()
        let e = we,
            r = $e
        try {
            return (we = !0), ($e = this), this._runnings++, zi(this), this.fn()
        } finally {
            Ai(this), this._runnings--, ($e = r), (we = e)
        }
    }
    stop() {
        var e
        this.active &&
            (zi(this), Ai(this), (e = this.onStop) == null || e.call(this), (this.active = !1))
    }
}
function Vl(t) {
    return t.value
}
function zi(t) {
    t._trackId++, (t._depsLength = 0)
}
function Ai(t) {
    if (t.deps.length > t._depsLength) {
        for (let e = t._depsLength; e < t.deps.length; e++) Ks(t.deps[e], t)
        t.deps.length = t._depsLength
    }
}
function Ks(t, e) {
    const r = t.get(e)
    r !== void 0 && e._trackId !== r && (t.delete(e), t.size === 0 && t.cleanup())
}
let we = !0,
    Or = 0
const Xs = []
function ke() {
    Xs.push(we), (we = !1)
}
function Ie() {
    const t = Xs.pop()
    we = t === void 0 ? !0 : t
}
function ci() {
    Or++
}
function ai() {
    for (Or--; !Or && Fr.length; ) Fr.shift()()
}
function Ws(t, e, r) {
    if (e.get(t) !== t._trackId) {
        e.set(t, t._trackId)
        const n = t.deps[t._depsLength]
        n !== e ? (n && Ks(n, t), (t.deps[t._depsLength++] = e)) : t._depsLength++
    }
}
const Fr = []
function Ys(t, e, r) {
    ci()
    for (const n of t.keys()) {
        let i
        n._dirtyLevel < e &&
            (i ?? (i = t.get(n) === n._trackId)) &&
            (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0), (n._dirtyLevel = e)),
            n._shouldSchedule &&
                (i ?? (i = t.get(n) === n._trackId)) &&
                (n.trigger(),
                (!n._runnings || n.allowRecurse) &&
                    n._dirtyLevel !== 2 &&
                    ((n._shouldSchedule = !1), n.scheduler && Fr.push(n.scheduler)))
    }
    ai()
}
const Gs = (t, e) => {
        const r = /* @__PURE__ */ new Map()
        return (r.cleanup = t), (r.computed = e), r
    },
    zr = /* @__PURE__ */ new WeakMap(),
    Ne = Symbol(''),
    Ar = Symbol('')
function Tt(t, e, r) {
    if (we && $e) {
        let n = zr.get(t)
        n || zr.set(t, (n = /* @__PURE__ */ new Map()))
        let i = n.get(r)
        i || n.set(r, (i = Gs(() => n.delete(r)))), Ws($e, i)
    }
}
function se(t, e, r, n, i, s) {
    const o = zr.get(t)
    if (!o) return
    let l = []
    if (e === 'clear') l = [...o.values()]
    else if (r === 'length' && J(t)) {
        const u = Number(n)
        o.forEach((f, c) => {
            ;(c === 'length' || (!ir(c) && c >= u)) && l.push(f)
        })
    } else
        switch ((r !== void 0 && l.push(o.get(r)), e)) {
            case 'add':
                J(t)
                    ? oi(r) && l.push(o.get('length'))
                    : (l.push(o.get(Ne)), nn(t) && l.push(o.get(Ar)))
                break
            case 'delete':
                J(t) || (l.push(o.get(Ne)), nn(t) && l.push(o.get(Ar)))
                break
            case 'set':
                nn(t) && l.push(o.get(Ne))
                break
        }
    ci()
    for (const u of l) u && Ys(u, 4)
    ai()
}
const Dl = /* @__PURE__ */ ri('__proto__,__v_isRef,__isVue'),
    Zs = new Set(
        /* @__PURE__ */ Object.getOwnPropertyNames(Symbol)
            .filter((t) => t !== 'arguments' && t !== 'caller')
            .map((t) => Symbol[t])
            .filter(ir)
    ),
    Vi = /* @__PURE__ */ Hl()
function Hl() {
    const t = {}
    return (
        ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
            t[e] = function (...r) {
                const n = ft(this)
                for (let s = 0, o = this.length; s < o; s++) Tt(n, 'get', s + '')
                const i = n[e](...r)
                return i === -1 || i === !1 ? n[e](...r.map(ft)) : i
            }
        }),
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
            t[e] = function (...r) {
                ke(), ci()
                const n = ft(this)[e].apply(this, r)
                return ai(), Ie(), n
            }
        }),
        t
    )
}
function Bl(t) {
    const e = ft(this)
    return Tt(e, 'has', t), e.hasOwnProperty(t)
}
class Qs {
    constructor(e = !1, r = !1) {
        ;(this._isReadonly = e), (this._isShallow = r)
    }
    get(e, r, n) {
        const i = this._isReadonly,
            s = this._isShallow
        if (r === '__v_isReactive') return !i
        if (r === '__v_isReadonly') return i
        if (r === '__v_isShallow') return s
        if (r === '__v_raw')
            return n === (i ? (s ? nu : no) : s ? eo : to).get(e) || // receiver is not the reactive proxy, but has the same prototype
                // this means the reciever is a user proxy of the reactive proxy
                Object.getPrototypeOf(e) === Object.getPrototypeOf(n)
                ? e
                : void 0
        const o = J(e)
        if (!i) {
            if (o && ut(Vi, r)) return Reflect.get(Vi, r, n)
            if (r === 'hasOwnProperty') return Bl
        }
        const l = Reflect.get(e, r, n)
        return (ir(r) ? Zs.has(r) : Dl(r)) || (i || Tt(e, 'get', r), s)
            ? l
            : Ct(l)
              ? o && oi(r)
                  ? l
                  : l.value
              : gt(l)
                ? i
                    ? ro(l)
                    : pi(l)
                : l
    }
}
class Js extends Qs {
    constructor(e = !1) {
        super(!1, e)
    }
    set(e, r, n, i) {
        let s = e[r]
        if (!this._isShallow) {
            const u = qe(s)
            if ((!Un(n) && !qe(n) && ((s = ft(s)), (n = ft(n))), !J(e) && Ct(s) && !Ct(n)))
                return u ? !1 : ((s.value = n), !0)
        }
        const o = J(e) && oi(r) ? Number(r) < e.length : ut(e, r),
            l = Reflect.set(e, r, n, i)
        return e === ft(i) && (o ? _e(n, s) && se(e, 'set', r, n) : se(e, 'add', r, n)), l
    }
    deleteProperty(e, r) {
        const n = ut(e, r)
        e[r]
        const i = Reflect.deleteProperty(e, r)
        return i && n && se(e, 'delete', r, void 0), i
    }
    has(e, r) {
        const n = Reflect.has(e, r)
        return (!ir(r) || !Zs.has(r)) && Tt(e, 'has', r), n
    }
    ownKeys(e) {
        return Tt(e, 'iterate', J(e) ? 'length' : Ne), Reflect.ownKeys(e)
    }
}
class ql extends Qs {
    constructor(e = !1) {
        super(!0, e)
    }
    set(e, r) {
        return !0
    }
    deleteProperty(e, r) {
        return !0
    }
}
const Ul = /* @__PURE__ */ new Js(),
    Kl = /* @__PURE__ */ new ql(),
    Xl = /* @__PURE__ */ new Js(!0),
    hi = (t) => t,
    lr = (t) => Reflect.getPrototypeOf(t)
function bn(t, e, r = !1, n = !1) {
    t = t.__v_raw
    const i = ft(t),
        s = ft(e)
    r || (_e(e, s) && Tt(i, 'get', e), Tt(i, 'get', s))
    const { has: o } = lr(i),
        l = n ? hi : r ? mi : un
    if (o.call(i, e)) return l(t.get(e))
    if (o.call(i, s)) return l(t.get(s))
    t !== i && t.get(e)
}
function En(t, e = !1) {
    const r = this.__v_raw,
        n = ft(r),
        i = ft(t)
    return (
        e || (_e(t, i) && Tt(n, 'has', t), Tt(n, 'has', i)),
        t === i ? r.has(t) : r.has(t) || r.has(i)
    )
}
function Sn(t, e = !1) {
    return (t = t.__v_raw), !e && Tt(ft(t), 'iterate', Ne), Reflect.get(t, 'size', t)
}
function Di(t) {
    t = ft(t)
    const e = ft(this)
    return lr(e).has.call(e, t) || (e.add(t), se(e, 'add', t, t)), this
}
function Hi(t, e) {
    e = ft(e)
    const r = ft(this),
        { has: n, get: i } = lr(r)
    let s = n.call(r, t)
    s || ((t = ft(t)), (s = n.call(r, t)))
    const o = i.call(r, t)
    return r.set(t, e), s ? _e(e, o) && se(r, 'set', t, e) : se(r, 'add', t, e), this
}
function Bi(t) {
    const e = ft(this),
        { has: r, get: n } = lr(e)
    let i = r.call(e, t)
    i || ((t = ft(t)), (i = r.call(e, t))), n && n.call(e, t)
    const s = e.delete(t)
    return i && se(e, 'delete', t, void 0), s
}
function qi() {
    const t = ft(this),
        e = t.size !== 0,
        r = t.clear()
    return e && se(t, 'clear', void 0, void 0), r
}
function Mn(t, e) {
    return function (n, i) {
        const s = this,
            o = s.__v_raw,
            l = ft(o),
            u = e ? hi : t ? mi : un
        return !t && Tt(l, 'iterate', Ne), o.forEach((f, c) => n.call(i, u(f), u(c), s))
    }
}
function Rn(t, e, r) {
    return function (...n) {
        const i = this.__v_raw,
            s = ft(i),
            o = nn(s),
            l = t === 'entries' || (t === Symbol.iterator && o),
            u = t === 'keys' && o,
            f = i[t](...n),
            c = r ? hi : e ? mi : un
        return (
            !e && Tt(s, 'iterate', u ? Ar : Ne),
            {
                // iterator protocol
                next() {
                    const { value: a, done: h } = f.next()
                    return h
                        ? { value: a, done: h }
                        : {
                              value: l ? [c(a[0]), c(a[1])] : c(a),
                              done: h
                          }
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this
                }
            }
        )
    }
}
function ce(t) {
    return function (...e) {
        return t === 'delete' ? !1 : t === 'clear' ? void 0 : this
    }
}
function Wl() {
    const t = {
            get(s) {
                return bn(this, s)
            },
            get size() {
                return Sn(this)
            },
            has: En,
            add: Di,
            set: Hi,
            delete: Bi,
            clear: qi,
            forEach: Mn(!1, !1)
        },
        e = {
            get(s) {
                return bn(this, s, !1, !0)
            },
            get size() {
                return Sn(this)
            },
            has: En,
            add: Di,
            set: Hi,
            delete: Bi,
            clear: qi,
            forEach: Mn(!1, !0)
        },
        r = {
            get(s) {
                return bn(this, s, !0)
            },
            get size() {
                return Sn(this, !0)
            },
            has(s) {
                return En.call(this, s, !0)
            },
            add: ce('add'),
            set: ce('set'),
            delete: ce('delete'),
            clear: ce('clear'),
            forEach: Mn(!0, !1)
        },
        n = {
            get(s) {
                return bn(this, s, !0, !0)
            },
            get size() {
                return Sn(this, !0)
            },
            has(s) {
                return En.call(this, s, !0)
            },
            add: ce('add'),
            set: ce('set'),
            delete: ce('delete'),
            clear: ce('clear'),
            forEach: Mn(!0, !0)
        }
    return (
        ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
            ;(t[s] = Rn(s, !1, !1)),
                (r[s] = Rn(s, !0, !1)),
                (e[s] = Rn(s, !1, !0)),
                (n[s] = Rn(s, !0, !0))
        }),
        [t, r, e, n]
    )
}
const [Yl, Gl, Zl, Ql] = /* @__PURE__ */ Wl()
function di(t, e) {
    const r = e ? (t ? Ql : Zl) : t ? Gl : Yl
    return (n, i, s) =>
        i === '__v_isReactive'
            ? !t
            : i === '__v_isReadonly'
              ? t
              : i === '__v_raw'
                ? n
                : Reflect.get(ut(r, i) && i in n ? r : n, i, s)
}
const Jl = {
        get: /* @__PURE__ */ di(!1, !1)
    },
    tu = {
        get: /* @__PURE__ */ di(!1, !0)
    },
    eu = {
        get: /* @__PURE__ */ di(!0, !1)
    },
    to = /* @__PURE__ */ new WeakMap(),
    eo = /* @__PURE__ */ new WeakMap(),
    no = /* @__PURE__ */ new WeakMap(),
    nu = /* @__PURE__ */ new WeakMap()
function ru(t) {
    switch (t) {
        case 'Object':
        case 'Array':
            return 1
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2
        default:
            return 0
    }
}
function iu(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : ru(Rl(t))
}
function pi(t) {
    return qe(t) ? t : gi(t, !1, Ul, Jl, to)
}
function su(t) {
    return gi(t, !1, Xl, tu, eo)
}
function ro(t) {
    return gi(t, !0, Kl, eu, no)
}
function gi(t, e, r, n, i) {
    if (!gt(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t
    const s = i.get(t)
    if (s) return s
    const o = iu(t)
    if (o === 0) return t
    const l = new Proxy(t, o === 2 ? n : r)
    return i.set(t, l), l
}
function Ae(t) {
    return qe(t) ? Ae(t.__v_raw) : !!(t && t.__v_isReactive)
}
function qe(t) {
    return !!(t && t.__v_isReadonly)
}
function Un(t) {
    return !!(t && t.__v_isShallow)
}
function io(t) {
    return Ae(t) || qe(t)
}
function ft(t) {
    const e = t && t.__v_raw
    return e ? ft(e) : t
}
function so(t) {
    return Object.isExtensible(t) && qn(t, '__v_skip', !0), t
}
const un = (t) => (gt(t) ? pi(t) : t),
    mi = (t) => (gt(t) ? ro(t) : t)
class oo {
    constructor(e, r, n, i) {
        ;(this.getter = e),
            (this._setter = r),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this.__v_isReadonly = !1),
            (this.effect = new fi(
                () => e(this._value),
                () => Ln(this, this.effect._dirtyLevel === 2 ? 2 : 3)
            )),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !i),
            (this.__v_isReadonly = n)
    }
    get value() {
        const e = ft(this)
        return (
            (!e._cacheable || e.effect.dirty) &&
                _e(e._value, (e._value = e.effect.run())) &&
                Ln(e, 4),
            lo(e),
            e.effect._dirtyLevel >= 2 && Ln(e, 2),
            e._value
        )
    }
    set value(e) {
        this._setter(e)
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
        return this.effect.dirty
    }
    set _dirty(e) {
        this.effect.dirty = e
    }
    // #endregion
}
function ou(t, e, r = !1) {
    let n, i
    const s = nt(t)
    return s ? ((n = t), (i = zt)) : ((n = t.get), (i = t.set)), new oo(n, i, s || !i, r)
}
function lo(t) {
    var e
    we &&
        $e &&
        ((t = ft(t)),
        Ws(
            $e,
            (e = t.dep) != null
                ? e
                : (t.dep = Gs(() => (t.dep = void 0), t instanceof oo ? t : void 0))
        ))
}
function Ln(t, e = 4, r) {
    t = ft(t)
    const n = t.dep
    n && Ys(n, e)
}
function Ct(t) {
    return !!(t && t.__v_isRef === !0)
}
function lu(t) {
    return uu(t, !1)
}
function uu(t, e) {
    return Ct(t) ? t : new fu(t, e)
}
class fu {
    constructor(e, r) {
        ;(this.__v_isShallow = r),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = r ? e : ft(e)),
            (this._value = r ? e : un(e))
    }
    get value() {
        return lo(this), this._value
    }
    set value(e) {
        const r = this.__v_isShallow || Un(e) || qe(e)
        ;(e = r ? e : ft(e)),
            _e(e, this._rawValue) &&
                ((this._rawValue = e), (this._value = r ? e : un(e)), Ln(this, 4))
    }
}
function uo(t) {
    return Ct(t) ? t.value : t
}
const cu = {
    get: (t, e, r) => uo(Reflect.get(t, e, r)),
    set: (t, e, r, n) => {
        const i = t[e]
        return Ct(i) && !Ct(r) ? ((i.value = r), !0) : Reflect.set(t, e, r, n)
    }
}
function fo(t) {
    return Ae(t) ? t : new Proxy(t, cu)
}
/**
 * @vue/runtime-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function ye(t, e, r, n) {
    try {
        return n ? t(...n) : t()
    } catch (i) {
        ur(i, e, r)
    }
}
function Kt(t, e, r, n) {
    if (nt(t)) {
        const s = ye(t, e, r, n)
        return (
            s &&
                Hs(s) &&
                s.catch((o) => {
                    ur(o, e, r)
                }),
            s
        )
    }
    const i = []
    for (let s = 0; s < t.length; s++) i.push(Kt(t[s], e, r, n))
    return i
}
function ur(t, e, r, n = !0) {
    const i = e ? e.vnode : null
    if (e) {
        let s = e.parent
        const o = e.proxy,
            l = `https://vuejs.org/error-reference/#runtime-${r}`
        for (; s; ) {
            const f = s.ec
            if (f) {
                for (let c = 0; c < f.length; c++) if (f[c](t, o, l) === !1) return
            }
            s = s.parent
        }
        const u = e.appContext.config.errorHandler
        if (u) {
            ye(u, null, 10, [t, o, l])
            return
        }
    }
    au(t, r, i, n)
}
function au(t, e, r, n = !0) {
    console.error(t)
}
let fn = !1,
    Vr = !1
const xt = []
let Qt = 0
const Ve = []
let he = null,
    Ee = 0
const co = /* @__PURE__ */ Promise.resolve()
let wi = null
function ao(t) {
    const e = wi || co
    return t ? e.then(this ? t.bind(this) : t) : e
}
function hu(t) {
    let e = Qt + 1,
        r = xt.length
    for (; e < r; ) {
        const n = (e + r) >>> 1,
            i = xt[n],
            s = cn(i)
        s < t || (s === t && i.pre) ? (e = n + 1) : (r = n)
    }
    return e
}
function yi(t) {
    ;(!xt.length || !xt.includes(t, fn && t.allowRecurse ? Qt + 1 : Qt)) &&
        (t.id == null ? xt.push(t) : xt.splice(hu(t.id), 0, t), ho())
}
function ho() {
    !fn && !Vr && ((Vr = !0), (wi = co.then(go)))
}
function du(t) {
    const e = xt.indexOf(t)
    e > Qt && xt.splice(e, 1)
}
function pu(t) {
    J(t) ? Ve.push(...t) : (!he || !he.includes(t, t.allowRecurse ? Ee + 1 : Ee)) && Ve.push(t),
        ho()
}
function Ui(t, e, r = fn ? Qt + 1 : 0) {
    for (; r < xt.length; r++) {
        const n = xt[r]
        if (n && n.pre) {
            if (t && n.id !== t.uid) continue
            xt.splice(r, 1), r--, n()
        }
    }
}
function po(t) {
    if (Ve.length) {
        const e = [...new Set(Ve)].sort((r, n) => cn(r) - cn(n))
        if (((Ve.length = 0), he)) {
            he.push(...e)
            return
        }
        for (he = e, Ee = 0; Ee < he.length; Ee++) he[Ee]()
        ;(he = null), (Ee = 0)
    }
}
const cn = (t) => (t.id == null ? 1 / 0 : t.id),
    gu = (t, e) => {
        const r = cn(t) - cn(e)
        if (r === 0) {
            if (t.pre && !e.pre) return -1
            if (e.pre && !t.pre) return 1
        }
        return r
    }
function go(t) {
    ;(Vr = !1), (fn = !0), xt.sort(gu)
    try {
        for (Qt = 0; Qt < xt.length; Qt++) {
            const e = xt[Qt]
            e && e.active !== !1 && ye(e, null, 14)
        }
    } finally {
        ;(Qt = 0), (xt.length = 0), po(), (fn = !1), (wi = null), (xt.length || Ve.length) && go()
    }
}
function mu(t, e, ...r) {
    if (t.isUnmounted) return
    const n = t.vnode.props || dt
    let i = r
    const s = e.startsWith('update:'),
        o = s && e.slice(7)
    if (o && o in n) {
        const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
            { number: a, trim: h } = n[c] || dt
        h && (i = r.map((g) => (vt(g) ? g.trim() : g))), a && (i = r.map(Cl))
    }
    let l,
        u =
            n[(l = vr(e))] || // also try camelCase event handler (#2249)
            n[(l = vr(ie(e)))]
    !u && s && (u = n[(l = vr(Bt(e)))]), u && Kt(u, t, 6, i)
    const f = n[l + 'Once']
    if (f) {
        if (!t.emitted) t.emitted = {}
        else if (t.emitted[l]) return
        ;(t.emitted[l] = !0), Kt(f, t, 6, i)
    }
}
function mo(t, e, r = !1) {
    const n = e.emitsCache,
        i = n.get(t)
    if (i !== void 0) return i
    const s = t.emits
    let o = {},
        l = !1
    if (!nt(t)) {
        const u = (f) => {
            const c = mo(f, e, !0)
            c && ((l = !0), mt(o, c))
        }
        !r && e.mixins.length && e.mixins.forEach(u),
            t.extends && u(t.extends),
            t.mixins && t.mixins.forEach(u)
    }
    return !s && !l
        ? (gt(t) && n.set(t, null), null)
        : (J(s) ? s.forEach((u) => (o[u] = null)) : mt(o, s), gt(t) && n.set(t, o), o)
}
function fr(t, e) {
    return !t || !rr(e)
        ? !1
        : ((e = e.slice(2).replace(/Once$/, '')),
          ut(t, e[0].toLowerCase() + e.slice(1)) || ut(t, Bt(e)) || ut(t, e))
}
let Lt = null,
    wo = null
function Kn(t) {
    const e = Lt
    return (Lt = t), (wo = (t && t.type.__scopeId) || null), e
}
function wu(t, e = Lt, r) {
    if (!e || t._n) return t
    const n = (...i) => {
        n._d && es(-1)
        const s = Kn(e)
        let o
        try {
            o = t(...i)
        } finally {
            Kn(s), n._d && es(1)
        }
        return o
    }
    return (n._n = !0), (n._c = !0), (n._d = !0), n
}
function br(t) {
    const {
        type: e,
        vnode: r,
        proxy: n,
        withProxy: i,
        props: s,
        propsOptions: [o],
        slots: l,
        attrs: u,
        emit: f,
        render: c,
        renderCache: a,
        data: h,
        setupState: g,
        ctx: w,
        inheritAttrs: y
    } = t
    let _, d
    const M = Kn(t)
    try {
        if (r.shapeFlag & 4) {
            const m = i || n,
                S = m
            ;(_ = Zt(c.call(S, m, a, s, g, h, w))), (d = u)
        } else {
            const m = e
            ;(_ = Zt(
                m.length > 1
                    ? m(s, { attrs: u, slots: l, emit: f })
                    : m(
                          s,
                          null
                          /* we know it doesn't need it */
                      )
            )),
                (d = e.props ? u : yu(u))
        }
    } catch (m) {
        ;(ln.length = 0), ur(m, t, 1), (_ = oe(an))
    }
    let $ = _
    if (d && y !== !1) {
        const m = Object.keys(d),
            { shapeFlag: S } = $
        m.length && S & 7 && (o && m.some(ii) && (d = _u(d, o)), ($ = Ue($, d)))
    }
    return (
        r.dirs && (($ = Ue($)), ($.dirs = $.dirs ? $.dirs.concat(r.dirs) : r.dirs)),
        r.transition && ($.transition = r.transition),
        (_ = $),
        Kn(M),
        _
    )
}
const yu = (t) => {
        let e
        for (const r in t) (r === 'class' || r === 'style' || rr(r)) && ((e || (e = {}))[r] = t[r])
        return e
    },
    _u = (t, e) => {
        const r = {}
        for (const n in t) (!ii(n) || !(n.slice(9) in e)) && (r[n] = t[n])
        return r
    }
function vu(t, e, r) {
    const { props: n, children: i, component: s } = t,
        { props: o, children: l, patchFlag: u } = e,
        f = s.emitsOptions
    if (e.dirs || e.transition) return !0
    if (r && u >= 0) {
        if (u & 1024) return !0
        if (u & 16) return n ? Ki(n, o, f) : !!o
        if (u & 8) {
            const c = e.dynamicProps
            for (let a = 0; a < c.length; a++) {
                const h = c[a]
                if (o[h] !== n[h] && !fr(f, h)) return !0
            }
        }
    } else
        return (i || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? (o ? Ki(n, o, f) : !0) : !!o
    return !1
}
function Ki(t, e, r) {
    const n = Object.keys(e)
    if (n.length !== Object.keys(t).length) return !0
    for (let i = 0; i < n.length; i++) {
        const s = n[i]
        if (e[s] !== t[s] && !fr(r, s)) return !0
    }
    return !1
}
function xu({ vnode: t, parent: e }, r) {
    for (; e; ) {
        const n = e.subTree
        if ((n.suspense && n.suspense.activeBranch === t && (n.el = t.el), n === t))
            ((t = e.vnode).el = r), (e = e.parent)
        else break
    }
}
const bu = Symbol.for('v-ndc'),
    Eu = (t) => t.__isSuspense
function Su(t, e) {
    e && e.pendingBranch ? (J(t) ? e.effects.push(...t) : e.effects.push(t)) : pu(t)
}
const Mu = Symbol.for('v-scx'),
    Ru = () => Fn(Mu),
    $n = {}
function Er(t, e, r) {
    return yo(t, e, r)
}
function yo(t, e, { immediate: r, deep: n, flush: i, once: s, onTrack: o, onTrigger: l } = dt) {
    if (e && s) {
        const T = e
        e = (...z) => {
            T(...z), S()
        }
    }
    const u = Et,
        f = (T) =>
            n === !0
                ? T
                : // for deep: false, only traverse root-level properties
                  Me(T, n === !1 ? 1 : void 0)
    let c,
        a = !1,
        h = !1
    if (
        (Ct(t)
            ? ((c = () => t.value), (a = Un(t)))
            : Ae(t)
              ? ((c = () => f(t)), (a = !0))
              : J(t)
                ? ((h = !0),
                  (a = t.some((T) => Ae(T) || Un(T))),
                  (c = () =>
                      t.map((T) => {
                          if (Ct(T)) return T.value
                          if (Ae(T)) return f(T)
                          if (nt(T)) return ye(T, u, 2)
                      })))
                : nt(t)
                  ? e
                      ? (c = () => ye(t, u, 2))
                      : (c = () => (g && g(), Kt(t, u, 3, [w])))
                  : (c = zt),
        e && n)
    ) {
        const T = c
        c = () => Me(T())
    }
    let g,
        w = (T) => {
            g = $.onStop = () => {
                ye(T, u, 4), (g = $.onStop = void 0)
            }
        },
        y
    if (pr)
        if (((w = zt), e ? r && Kt(e, u, 3, [c(), h ? [] : void 0, w]) : c(), i === 'sync')) {
            const T = Ru()
            y = T.__watcherHandles || (T.__watcherHandles = [])
        } else return zt
    let _ = h ? new Array(t.length).fill($n) : $n
    const d = () => {
        if (!(!$.active || !$.dirty))
            if (e) {
                const T = $.run()
                ;(n || a || (h ? T.some((z, H) => _e(z, _[H])) : _e(T, _))) &&
                    (g && g(),
                    Kt(e, u, 3, [
                        T,
                        // pass undefined as the old value when it's changed for the first time
                        _ === $n ? void 0 : h && _[0] === $n ? [] : _,
                        w
                    ]),
                    (_ = T))
            } else $.run()
    }
    d.allowRecurse = !!e
    let M
    i === 'sync'
        ? (M = d)
        : i === 'post'
          ? (M = () => $t(d, u && u.suspense))
          : ((d.pre = !0), u && (d.id = u.uid), (M = () => yi(d)))
    const $ = new fi(c, zt, M),
        m = Al(),
        S = () => {
            $.stop(), m && si(m.effects, $)
        }
    return (
        e ? (r ? d() : (_ = $.run())) : i === 'post' ? $t($.run.bind($), u && u.suspense) : $.run(),
        y && y.push(S),
        S
    )
}
function $u(t, e, r) {
    const n = this.proxy,
        i = vt(t) ? (t.includes('.') ? _o(n, t) : () => n[t]) : t.bind(n, n)
    let s
    nt(e) ? (s = e) : ((s = e.handler), (r = e))
    const o = yn(this),
        l = yo(i, s.bind(n), r)
    return o(), l
}
function _o(t, e) {
    const r = e.split('.')
    return () => {
        let n = t
        for (let i = 0; i < r.length && n; i++) n = n[r[i]]
        return n
    }
}
function Me(t, e, r = 0, n) {
    if (!gt(t) || t.__v_skip) return t
    if (e && e > 0) {
        if (r >= e) return t
        r++
    }
    if (((n = n || /* @__PURE__ */ new Set()), n.has(t))) return t
    if ((n.add(t), Ct(t))) Me(t.value, e, r, n)
    else if (J(t)) for (let i = 0; i < t.length; i++) Me(t[i], e, r, n)
    else if (Sl(t) || nn(t))
        t.forEach((i) => {
            Me(i, e, r, n)
        })
    else if ($l(t)) for (const i in t) Me(t[i], e, r, n)
    return t
}
function Nu(t, e) {
    if (Lt === null) return t
    const r = gr(Lt) || Lt.proxy,
        n = t.dirs || (t.dirs = [])
    for (let i = 0; i < e.length; i++) {
        let [s, o, l, u = dt] = e[i]
        s &&
            (nt(s) &&
                (s = {
                    mounted: s,
                    updated: s
                }),
            s.deep && Me(o),
            n.push({
                dir: s,
                instance: r,
                value: o,
                oldValue: void 0,
                arg: l,
                modifiers: u
            }))
    }
    return t
}
function ve(t, e, r, n) {
    const i = t.dirs,
        s = e && e.dirs
    for (let o = 0; o < i.length; o++) {
        const l = i[o]
        s && (l.oldValue = s[o].value)
        let u = l.dir[n]
        u && (ke(), Kt(u, r, 8, [t.el, l, t, e]), Ie())
    }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function vo(t, e) {
    return nt(t)
        ? // #8326: extend call and options.name access are considered side-effects
          // by Rollup, so we have to wrap it in a pure-annotated IIFE.
          mt({ name: t.name }, e, { setup: t })
        : t
}
const On = (t) => !!t.type.__asyncLoader,
    xo = (t) => t.type.__isKeepAlive
function Tu(t, e) {
    bo(t, 'a', e)
}
function Cu(t, e) {
    bo(t, 'da', e)
}
function bo(t, e, r = Et) {
    const n =
        t.__wdc ||
        (t.__wdc = () => {
            let i = r
            for (; i; ) {
                if (i.isDeactivated) return
                i = i.parent
            }
            return t()
        })
    if ((cr(e, n, r), r)) {
        let i = r.parent
        for (; i && i.parent; ) xo(i.parent.vnode) && ku(n, e, r, i), (i = i.parent)
    }
}
function ku(t, e, r, n) {
    const i = cr(
        e,
        t,
        n,
        !0
        /* prepend */
    )
    _i(() => {
        si(n[e], i)
    }, r)
}
function cr(t, e, r = Et, n = !1) {
    if (r) {
        const i = r[t] || (r[t] = []),
            s =
                e.__weh ||
                (e.__weh = (...o) => {
                    if (r.isUnmounted) return
                    ke()
                    const l = yn(r),
                        u = Kt(e, r, t, o)
                    return l(), Ie(), u
                })
        return n ? i.unshift(s) : i.push(s), s
    }
}
const ue =
        (t) =>
        (e, r = Et) =>
            // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
            (!pr || t === 'sp') && cr(t, (...n) => e(...n), r),
    Iu = ue('bm'),
    Eo = ue('m'),
    Pu = ue('bu'),
    ju = ue('u'),
    Lu = ue('bum'),
    _i = ue('um'),
    Ou = ue('sp'),
    Fu = ue('rtg'),
    zu = ue('rtc')
function Au(t, e = Et) {
    cr('ec', t, e)
}
const Dr = (t) => (t ? (jo(t) ? gr(t) || t.proxy : Dr(t.parent)) : null),
    sn =
        // Move PURE marker to new line to workaround compiler discarding it
        // due to type annotation
        /* @__PURE__ */ mt(/* @__PURE__ */ Object.create(null), {
            $: (t) => t,
            $el: (t) => t.vnode.el,
            $data: (t) => t.data,
            $props: (t) => t.props,
            $attrs: (t) => t.attrs,
            $slots: (t) => t.slots,
            $refs: (t) => t.refs,
            $parent: (t) => Dr(t.parent),
            $root: (t) => Dr(t.root),
            $emit: (t) => t.emit,
            $options: (t) => vi(t),
            $forceUpdate: (t) =>
                t.f ||
                (t.f = () => {
                    ;(t.effect.dirty = !0), yi(t.update)
                }),
            $nextTick: (t) => t.n || (t.n = ao.bind(t.proxy)),
            $watch: (t) => $u.bind(t)
        }),
    Sr = (t, e) => t !== dt && !t.__isScriptSetup && ut(t, e),
    Vu = {
        get({ _: t }, e) {
            const {
                ctx: r,
                setupState: n,
                data: i,
                props: s,
                accessCache: o,
                type: l,
                appContext: u
            } = t
            let f
            if (e[0] !== '$') {
                const g = o[e]
                if (g !== void 0)
                    switch (g) {
                        case 1:
                            return n[e]
                        case 2:
                            return i[e]
                        case 4:
                            return r[e]
                        case 3:
                            return s[e]
                    }
                else {
                    if (Sr(n, e)) return (o[e] = 1), n[e]
                    if (i !== dt && ut(i, e)) return (o[e] = 2), i[e]
                    if (
                        // only cache other properties when instance has declared (thus stable)
                        // props
                        (f = t.propsOptions[0]) &&
                        ut(f, e)
                    )
                        return (o[e] = 3), s[e]
                    if (r !== dt && ut(r, e)) return (o[e] = 4), r[e]
                    Hr && (o[e] = 0)
                }
            }
            const c = sn[e]
            let a, h
            if (c) return e === '$attrs' && Tt(t, 'get', e), c(t)
            if (
                // css module (injected by vue-loader)
                (a = l.__cssModules) &&
                (a = a[e])
            )
                return a
            if (r !== dt && ut(r, e)) return (o[e] = 4), r[e]
            if (
                // global properties
                ((h = u.config.globalProperties), ut(h, e))
            )
                return h[e]
        },
        set({ _: t }, e, r) {
            const { data: n, setupState: i, ctx: s } = t
            return Sr(i, e)
                ? ((i[e] = r), !0)
                : n !== dt && ut(n, e)
                  ? ((n[e] = r), !0)
                  : ut(t.props, e) || (e[0] === '$' && e.slice(1) in t)
                    ? !1
                    : ((s[e] = r), !0)
        },
        has(
            {
                _: {
                    data: t,
                    setupState: e,
                    accessCache: r,
                    ctx: n,
                    appContext: i,
                    propsOptions: s
                }
            },
            o
        ) {
            let l
            return (
                !!r[o] ||
                (t !== dt && ut(t, o)) ||
                Sr(e, o) ||
                ((l = s[0]) && ut(l, o)) ||
                ut(n, o) ||
                ut(sn, o) ||
                ut(i.config.globalProperties, o)
            )
        },
        defineProperty(t, e, r) {
            return (
                r.get != null
                    ? (t._.accessCache[e] = 0)
                    : ut(r, 'value') && this.set(t, e, r.value, null),
                Reflect.defineProperty(t, e, r)
            )
        }
    }
function Xi(t) {
    return J(t) ? t.reduce((e, r) => ((e[r] = null), e), {}) : t
}
let Hr = !0
function Du(t) {
    const e = vi(t),
        r = t.proxy,
        n = t.ctx
    ;(Hr = !1), e.beforeCreate && Wi(e.beforeCreate, t, 'bc')
    const {
        // state
        data: i,
        computed: s,
        methods: o,
        watch: l,
        provide: u,
        inject: f,
        // lifecycle
        created: c,
        beforeMount: a,
        mounted: h,
        beforeUpdate: g,
        updated: w,
        activated: y,
        deactivated: _,
        beforeDestroy: d,
        beforeUnmount: M,
        destroyed: $,
        unmounted: m,
        render: S,
        renderTracked: T,
        renderTriggered: z,
        errorCaptured: H,
        serverPrefetch: G,
        // public API
        expose: X,
        inheritAttrs: tt,
        // assets
        components: ct,
        directives: it,
        filters: x
    } = e
    if ((f && Hu(f, n, null), o))
        for (const I in o) {
            const P = o[I]
            nt(P) && (n[I] = P.bind(r))
        }
    if (i) {
        const I = i.call(r, r)
        gt(I) && (t.data = pi(I))
    }
    if (((Hr = !0), s))
        for (const I in s) {
            const P = s[I],
                U = nt(P) ? P.bind(r, r) : nt(P.get) ? P.get.bind(r, r) : zt,
                K = !nt(P) && nt(P.set) ? P.set.bind(r) : zt,
                et = Oo({
                    get: U,
                    set: K
                })
            Object.defineProperty(n, I, {
                enumerable: !0,
                configurable: !0,
                get: () => et.value,
                set: (rt) => (et.value = rt)
            })
        }
    if (l) for (const I in l) So(l[I], n, r, I)
    if (u) {
        const I = nt(u) ? u.call(r) : u
        Reflect.ownKeys(I).forEach((P) => {
            Wu(P, I[P])
        })
    }
    c && Wi(c, t, 'c')
    function b(I, P) {
        J(P) ? P.forEach((U) => I(U.bind(r))) : P && I(P.bind(r))
    }
    if (
        (b(Iu, a),
        b(Eo, h),
        b(Pu, g),
        b(ju, w),
        b(Tu, y),
        b(Cu, _),
        b(Au, H),
        b(zu, T),
        b(Fu, z),
        b(Lu, M),
        b(_i, m),
        b(Ou, G),
        J(X))
    )
        if (X.length) {
            const I = t.exposed || (t.exposed = {})
            X.forEach((P) => {
                Object.defineProperty(I, P, {
                    get: () => r[P],
                    set: (U) => (r[P] = U)
                })
            })
        } else t.exposed || (t.exposed = {})
    S && t.render === zt && (t.render = S),
        tt != null && (t.inheritAttrs = tt),
        ct && (t.components = ct),
        it && (t.directives = it)
}
function Hu(t, e, r = zt) {
    J(t) && (t = Br(t))
    for (const n in t) {
        const i = t[n]
        let s
        gt(i)
            ? 'default' in i
                ? (s = Fn(i.from || n, i.default, !0))
                : (s = Fn(i.from || n))
            : (s = Fn(i)),
            Ct(s)
                ? Object.defineProperty(e, n, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => s.value,
                      set: (o) => (s.value = o)
                  })
                : (e[n] = s)
    }
}
function Wi(t, e, r) {
    Kt(J(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, r)
}
function So(t, e, r, n) {
    const i = n.includes('.') ? _o(r, n) : () => r[n]
    if (vt(t)) {
        const s = e[t]
        nt(s) && Er(i, s)
    } else if (nt(t)) Er(i, t.bind(r))
    else if (gt(t))
        if (J(t)) t.forEach((s) => So(s, e, r, n))
        else {
            const s = nt(t.handler) ? t.handler.bind(r) : e[t.handler]
            nt(s) && Er(i, s, t)
        }
}
function vi(t) {
    const e = t.type,
        { mixins: r, extends: n } = e,
        {
            mixins: i,
            optionsCache: s,
            config: { optionMergeStrategies: o }
        } = t.appContext,
        l = s.get(e)
    let u
    return (
        l
            ? (u = l)
            : !i.length && !r && !n
              ? (u = e)
              : ((u = {}), i.length && i.forEach((f) => Xn(u, f, o, !0)), Xn(u, e, o)),
        gt(e) && s.set(e, u),
        u
    )
}
function Xn(t, e, r, n = !1) {
    const { mixins: i, extends: s } = e
    s && Xn(t, s, r, !0), i && i.forEach((o) => Xn(t, o, r, !0))
    for (const o in e)
        if (!(n && o === 'expose')) {
            const l = Bu[o] || (r && r[o])
            t[o] = l ? l(t[o], e[o]) : e[o]
        }
    return t
}
const Bu = {
    data: Yi,
    props: Gi,
    emits: Gi,
    // objects
    methods: Je,
    computed: Je,
    // lifecycle
    beforeCreate: bt,
    created: bt,
    beforeMount: bt,
    mounted: bt,
    beforeUpdate: bt,
    updated: bt,
    beforeDestroy: bt,
    beforeUnmount: bt,
    destroyed: bt,
    unmounted: bt,
    activated: bt,
    deactivated: bt,
    errorCaptured: bt,
    serverPrefetch: bt,
    // assets
    components: Je,
    directives: Je,
    // watch
    watch: Uu,
    // provide / inject
    provide: Yi,
    inject: qu
}
function Yi(t, e) {
    return e
        ? t
            ? function () {
                  return mt(nt(t) ? t.call(this, this) : t, nt(e) ? e.call(this, this) : e)
              }
            : e
        : t
}
function qu(t, e) {
    return Je(Br(t), Br(e))
}
function Br(t) {
    if (J(t)) {
        const e = {}
        for (let r = 0; r < t.length; r++) e[t[r]] = t[r]
        return e
    }
    return t
}
function bt(t, e) {
    return t ? [...new Set([].concat(t, e))] : e
}
function Je(t, e) {
    return t ? mt(/* @__PURE__ */ Object.create(null), t, e) : e
}
function Gi(t, e) {
    return t
        ? J(t) && J(e)
            ? [.../* @__PURE__ */ new Set([...t, ...e])]
            : mt(/* @__PURE__ */ Object.create(null), Xi(t), Xi(e ?? {}))
        : e
}
function Uu(t, e) {
    if (!t) return e
    if (!e) return t
    const r = mt(/* @__PURE__ */ Object.create(null), t)
    for (const n in e) r[n] = bt(t[n], e[n])
    return r
}
function Mo() {
    return {
        app: null,
        config: {
            isNativeTag: bl,
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
    }
}
let Ku = 0
function Xu(t, e) {
    return function (n, i = null) {
        nt(n) || (n = mt({}, n)), i != null && !gt(i) && (i = null)
        const s = Mo(),
            o = /* @__PURE__ */ new WeakSet()
        let l = !1
        const u = (s.app = {
            _uid: Ku++,
            _component: n,
            _props: i,
            _container: null,
            _context: s,
            _instance: null,
            version: Ef,
            get config() {
                return s.config
            },
            set config(f) {},
            use(f, ...c) {
                return (
                    o.has(f) ||
                        (f && nt(f.install)
                            ? (o.add(f), f.install(u, ...c))
                            : nt(f) && (o.add(f), f(u, ...c))),
                    u
                )
            },
            mixin(f) {
                return s.mixins.includes(f) || s.mixins.push(f), u
            },
            component(f, c) {
                return c ? ((s.components[f] = c), u) : s.components[f]
            },
            directive(f, c) {
                return c ? ((s.directives[f] = c), u) : s.directives[f]
            },
            mount(f, c, a) {
                if (!l) {
                    const h = oe(n, i)
                    return (
                        (h.appContext = s),
                        a === !0 ? (a = 'svg') : a === !1 && (a = void 0),
                        c && e ? e(h, f) : t(h, f, a),
                        (l = !0),
                        (u._container = f),
                        (f.__vue_app__ = u),
                        gr(h.component) || h.component.proxy
                    )
                }
            },
            unmount() {
                l && (t(null, u._container), delete u._container.__vue_app__)
            },
            provide(f, c) {
                return (s.provides[f] = c), u
            },
            runWithContext(f) {
                const c = on
                on = u
                try {
                    return f()
                } finally {
                    on = c
                }
            }
        })
        return u
    }
}
let on = null
function Wu(t, e) {
    if (Et) {
        let r = Et.provides
        const n = Et.parent && Et.parent.provides
        n === r && (r = Et.provides = Object.create(n)), (r[t] = e)
    }
}
function Fn(t, e, r = !1) {
    const n = Et || Lt
    if (n || on) {
        const i = n
            ? n.parent == null
                ? n.vnode.appContext && n.vnode.appContext.provides
                : n.parent.provides
            : on._context.provides
        if (i && t in i) return i[t]
        if (arguments.length > 1) return r && nt(e) ? e.call(n && n.proxy) : e
    }
}
function Yu(t, e, r, n = !1) {
    const i = {},
        s = {}
    qn(s, hr, 1), (t.propsDefaults = /* @__PURE__ */ Object.create(null)), Ro(t, e, i, s)
    for (const o in t.propsOptions[0]) o in i || (i[o] = void 0)
    r ? (t.props = n ? i : su(i)) : t.type.props ? (t.props = i) : (t.props = s), (t.attrs = s)
}
function Gu(t, e, r, n) {
    const {
            props: i,
            attrs: s,
            vnode: { patchFlag: o }
        } = t,
        l = ft(i),
        [u] = t.propsOptions
    let f = !1
    if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
        (n || o > 0) &&
        !(o & 16)
    ) {
        if (o & 8) {
            const c = t.vnode.dynamicProps
            for (let a = 0; a < c.length; a++) {
                let h = c[a]
                if (fr(t.emitsOptions, h)) continue
                const g = e[h]
                if (u)
                    if (ut(s, h)) g !== s[h] && ((s[h] = g), (f = !0))
                    else {
                        const w = ie(h)
                        i[w] = qr(u, l, w, g, t, !1)
                    }
                else g !== s[h] && ((s[h] = g), (f = !0))
            }
        }
    } else {
        Ro(t, e, i, s) && (f = !0)
        let c
        for (const a in l)
            (!e || // for camelCase
                (!ut(e, a) && // it's possible the original props was passed in as kebab-case
                    // and converted to camelCase (#955)
                    ((c = Bt(a)) === a || !ut(e, c)))) &&
                (u
                    ? r && // for camelCase
                      (r[a] !== void 0 || // for kebab-case
                          r[c] !== void 0) &&
                      (i[a] = qr(u, l, a, void 0, t, !0))
                    : delete i[a])
        if (s !== l) for (const a in s) (!e || !ut(e, a)) && (delete s[a], (f = !0))
    }
    f && se(t, 'set', '$attrs')
}
function Ro(t, e, r, n) {
    const [i, s] = t.propsOptions
    let o = !1,
        l
    if (e)
        for (let u in e) {
            if (rn(u)) continue
            const f = e[u]
            let c
            i && ut(i, (c = ie(u)))
                ? !s || !s.includes(c)
                    ? (r[c] = f)
                    : ((l || (l = {}))[c] = f)
                : fr(t.emitsOptions, u) || ((!(u in n) || f !== n[u]) && ((n[u] = f), (o = !0)))
        }
    if (s) {
        const u = ft(r),
            f = l || dt
        for (let c = 0; c < s.length; c++) {
            const a = s[c]
            r[a] = qr(i, u, a, f[a], t, !ut(f, a))
        }
    }
    return o
}
function qr(t, e, r, n, i, s) {
    const o = t[r]
    if (o != null) {
        const l = ut(o, 'default')
        if (l && n === void 0) {
            const u = o.default
            if (o.type !== Function && !o.skipFactory && nt(u)) {
                const { propsDefaults: f } = i
                if (r in f) n = f[r]
                else {
                    const c = yn(i)
                    ;(n = f[r] = u.call(null, e)), c()
                }
            } else n = u
        }
        o[0] &&
        /* shouldCast */
            (s && !l
                ? (n = !1)
                : o[1] &&
                  /* shouldCastTrue */
                  (n === '' || n === Bt(r)) &&
                  (n = !0))
    }
    return n
}
function $o(t, e, r = !1) {
    const n = e.propsCache,
        i = n.get(t)
    if (i) return i
    const s = t.props,
        o = {},
        l = []
    let u = !1
    if (!nt(t)) {
        const c = (a) => {
            u = !0
            const [h, g] = $o(a, e, !0)
            mt(o, h), g && l.push(...g)
        }
        !r && e.mixins.length && e.mixins.forEach(c),
            t.extends && c(t.extends),
            t.mixins && t.mixins.forEach(c)
    }
    if (!s && !u) return gt(t) && n.set(t, ze), ze
    if (J(s))
        for (let c = 0; c < s.length; c++) {
            const a = ie(s[c])
            Zi(a) && (o[a] = dt)
        }
    else if (s)
        for (const c in s) {
            const a = ie(c)
            if (Zi(a)) {
                const h = s[c],
                    g = (o[a] = J(h) || nt(h) ? { type: h } : mt({}, h))
                if (g) {
                    const w = ts(Boolean, g.type),
                        y = ts(String, g.type)
                    ;(g[0] = w > -1),
                    /* shouldCast */
                        (g[1] = y < 0 || w < y),
                        /* shouldCastTrue */
                        (w > -1 || ut(g, 'default')) && l.push(a)
                }
            }
        }
    const f = [o, l]
    return gt(t) && n.set(t, f), f
}
function Zi(t) {
    return t[0] !== '$' && !rn(t)
}
function Qi(t) {
    return t === null
        ? 'null'
        : typeof t == 'function'
          ? t.name || ''
          : (typeof t == 'object' && t.constructor && t.constructor.name) || ''
}
function Ji(t, e) {
    return Qi(t) === Qi(e)
}
function ts(t, e) {
    return J(e) ? e.findIndex((r) => Ji(r, t)) : nt(e) && Ji(e, t) ? 0 : -1
}
const No = (t) => t[0] === '_' || t === '$stable',
    xi = (t) => (J(t) ? t.map(Zt) : [Zt(t)]),
    Zu = (t, e, r) => {
        if (e._n) return e
        const n = wu((...i) => xi(e(...i)), r)
        return (n._c = !1), n
    },
    To = (t, e, r) => {
        const n = t._ctx
        for (const i in t) {
            if (No(i)) continue
            const s = t[i]
            if (nt(s)) e[i] = Zu(i, s, n)
            else if (s != null) {
                const o = xi(s)
                e[i] = () => o
            }
        }
    },
    Co = (t, e) => {
        const r = xi(e)
        t.slots.default = () => r
    },
    Qu = (t, e) => {
        if (t.vnode.shapeFlag & 32) {
            const r = e._
            r ? ((t.slots = ft(e)), qn(e, '_', r)) : To(e, (t.slots = {}))
        } else (t.slots = {}), e && Co(t, e)
        qn(t.slots, hr, 1)
    },
    Ju = (t, e, r) => {
        const { vnode: n, slots: i } = t
        let s = !0,
            o = dt
        if (n.shapeFlag & 32) {
            const l = e._
            l
                ? r && l === 1
                    ? (s = !1)
                    : (mt(i, e), !r && l === 1 && delete i._)
                : ((s = !e.$stable), To(e, i)),
                (o = e)
        } else e && (Co(t, e), (o = { default: 1 }))
        if (s) for (const l in i) !No(l) && o[l] == null && delete i[l]
    }
function Ur(t, e, r, n, i = !1) {
    if (J(t)) {
        t.forEach((h, g) => Ur(h, e && (J(e) ? e[g] : e), r, n, i))
        return
    }
    if (On(n) && !i) return
    const s = n.shapeFlag & 4 ? gr(n.component) || n.component.proxy : n.el,
        o = i ? null : s,
        { i: l, r: u } = t,
        f = e && e.r,
        c = l.refs === dt ? (l.refs = {}) : l.refs,
        a = l.setupState
    if (
        (f != null &&
            f !== u &&
            (vt(f) ? ((c[f] = null), ut(a, f) && (a[f] = null)) : Ct(f) && (f.value = null)),
        nt(u))
    )
        ye(u, l, 12, [o, c])
    else {
        const h = vt(u),
            g = Ct(u)
        if (h || g) {
            const w = () => {
                if (t.f) {
                    const y = h ? (ut(a, u) ? a[u] : c[u]) : u.value
                    i
                        ? J(y) && si(y, s)
                        : J(y)
                          ? y.includes(s) || y.push(s)
                          : h
                            ? ((c[u] = [s]), ut(a, u) && (a[u] = c[u]))
                            : ((u.value = [s]), t.k && (c[t.k] = u.value))
                } else
                    h
                        ? ((c[u] = o), ut(a, u) && (a[u] = o))
                        : g && ((u.value = o), t.k && (c[t.k] = o))
            }
            o ? ((w.id = -1), $t(w, r)) : w()
        }
    }
}
const $t = Su
function tf(t) {
    return ef(t)
}
function ef(t, e) {
    const r = qs()
    r.__VUE__ = !0
    const {
            insert: n,
            remove: i,
            patchProp: s,
            createElement: o,
            createText: l,
            createComment: u,
            setText: f,
            setElementText: c,
            parentNode: a,
            nextSibling: h,
            setScopeId: g = zt,
            insertStaticContent: w
        } = t,
        y = (
            p,
            v,
            E,
            N = null,
            C = null,
            L = null,
            V = void 0,
            j = null,
            F = !!v.dynamicChildren
        ) => {
            if (p === v) return
            p && !Ye(p, v) && ((N = A(p)), rt(p, C, L, !0), (p = null)),
                v.patchFlag === -2 && ((F = !1), (v.dynamicChildren = null))
            const { type: k, ref: q, shapeFlag: Y } = v
            switch (k) {
                case ar:
                    _(p, v, E, N)
                    break
                case an:
                    d(p, v, E, N)
                    break
                case Rr:
                    p == null && M(v, E, N, V)
                    break
                case Gt:
                    ct(p, v, E, N, C, L, V, j, F)
                    break
                default:
                    Y & 1
                        ? S(p, v, E, N, C, L, V, j, F)
                        : Y & 6
                          ? it(p, v, E, N, C, L, V, j, F)
                          : (Y & 64 || Y & 128) && k.process(p, v, E, N, C, L, V, j, F, ot)
            }
            q != null && C && Ur(q, p && p.ref, L, v || p, !v)
        },
        _ = (p, v, E, N) => {
            if (p == null) n((v.el = l(v.children)), E, N)
            else {
                const C = (v.el = p.el)
                v.children !== p.children && f(C, v.children)
            }
        },
        d = (p, v, E, N) => {
            p == null ? n((v.el = u(v.children || '')), E, N) : (v.el = p.el)
        },
        M = (p, v, E, N) => {
            ;[p.el, p.anchor] = w(p.children, v, E, N, p.el, p.anchor)
        },
        $ = ({ el: p, anchor: v }, E, N) => {
            let C
            for (; p && p !== v; ) (C = h(p)), n(p, E, N), (p = C)
            n(v, E, N)
        },
        m = ({ el: p, anchor: v }) => {
            let E
            for (; p && p !== v; ) (E = h(p)), i(p), (p = E)
            i(v)
        },
        S = (p, v, E, N, C, L, V, j, F) => {
            v.type === 'svg' ? (V = 'svg') : v.type === 'math' && (V = 'mathml'),
                p == null ? T(v, E, N, C, L, V, j, F) : G(p, v, C, L, V, j, F)
        },
        T = (p, v, E, N, C, L, V, j) => {
            let F, k
            const { props: q, shapeFlag: Y, transition: W, dirs: Z } = p
            if (
                ((F = p.el = o(p.type, L, q && q.is, q)),
                Y & 8 ? c(F, p.children) : Y & 16 && H(p.children, F, null, N, C, Mr(p, L), V, j),
                Z && ve(p, null, N, 'created'),
                z(F, p, p.scopeId, V, N),
                q)
            ) {
                for (const at in q)
                    at !== 'value' && !rn(at) && s(F, at, null, q[at], L, p.children, N, C, R)
                'value' in q && s(F, 'value', null, q.value, L),
                    (k = q.onVnodeBeforeMount) && Yt(k, N, p)
            }
            Z && ve(p, null, N, 'beforeMount')
            const lt = nf(C, W)
            lt && W.beforeEnter(F),
                n(F, v, E),
                ((k = q && q.onVnodeMounted) || lt || Z) &&
                    $t(() => {
                        k && Yt(k, N, p), lt && W.enter(F), Z && ve(p, null, N, 'mounted')
                    }, C)
        },
        z = (p, v, E, N, C) => {
            if ((E && g(p, E), N)) for (let L = 0; L < N.length; L++) g(p, N[L])
            if (C) {
                let L = C.subTree
                if (v === L) {
                    const V = C.vnode
                    z(p, V, V.scopeId, V.slotScopeIds, C.parent)
                }
            }
        },
        H = (p, v, E, N, C, L, V, j, F = 0) => {
            for (let k = F; k < p.length; k++) {
                const q = (p[k] = j ? de(p[k]) : Zt(p[k]))
                y(null, q, v, E, N, C, L, V, j)
            }
        },
        G = (p, v, E, N, C, L, V) => {
            const j = (v.el = p.el)
            let { patchFlag: F, dynamicChildren: k, dirs: q } = v
            F |= p.patchFlag & 16
            const Y = p.props || dt,
                W = v.props || dt
            let Z
            if (
                (E && xe(E, !1),
                (Z = W.onVnodeBeforeUpdate) && Yt(Z, E, v, p),
                q && ve(v, p, E, 'beforeUpdate'),
                E && xe(E, !0),
                k
                    ? X(p.dynamicChildren, k, j, E, N, Mr(v, C), L)
                    : V || P(p, v, j, null, E, N, Mr(v, C), L, !1),
                F > 0)
            ) {
                if (F & 16) tt(j, v, Y, W, E, N, C)
                else if (
                    (F & 2 && Y.class !== W.class && s(j, 'class', null, W.class, C),
                    F & 4 && s(j, 'style', Y.style, W.style, C),
                    F & 8)
                ) {
                    const lt = v.dynamicProps
                    for (let at = 0; at < lt.length; at++) {
                        const pt = lt[at],
                            yt = Y[pt],
                            At = W[pt]
                        ;(At !== yt || pt === 'value') && s(j, pt, yt, At, C, p.children, E, N, R)
                    }
                }
                F & 1 && p.children !== v.children && c(j, v.children)
            } else !V && k == null && tt(j, v, Y, W, E, N, C)
            ;((Z = W.onVnodeUpdated) || q) &&
                $t(() => {
                    Z && Yt(Z, E, v, p), q && ve(v, p, E, 'updated')
                }, N)
        },
        X = (p, v, E, N, C, L, V) => {
            for (let j = 0; j < v.length; j++) {
                const F = p[j],
                    k = v[j],
                    q =
                        // oldVNode may be an errored async setup() component inside Suspense
                        // which will not have a mounted element
                        F.el && // - In the case of a Fragment, we need to provide the actual parent
                        // of the Fragment itself so it can move its children.
                        (F.type === Gt || // - In the case of different nodes, there is going to be a replacement
                            // which also requires the correct parent container
                            !Ye(F, k) || // - In the case of a component, it could contain anything.
                            F.shapeFlag & 70)
                            ? a(F.el)
                            : // In other cases, the parent container is not actually used so we
                              // just pass the block element here to avoid a DOM parentNode call.
                              E
                y(F, k, q, null, N, C, L, V, !0)
            }
        },
        tt = (p, v, E, N, C, L, V) => {
            if (E !== N) {
                if (E !== dt)
                    for (const j in E)
                        !rn(j) && !(j in N) && s(p, j, E[j], null, V, v.children, C, L, R)
                for (const j in N) {
                    if (rn(j)) continue
                    const F = N[j],
                        k = E[j]
                    F !== k && j !== 'value' && s(p, j, k, F, V, v.children, C, L, R)
                }
                'value' in N && s(p, 'value', E.value, N.value, V)
            }
        },
        ct = (p, v, E, N, C, L, V, j, F) => {
            const k = (v.el = p ? p.el : l('')),
                q = (v.anchor = p ? p.anchor : l(''))
            let { patchFlag: Y, dynamicChildren: W, slotScopeIds: Z } = v
            Z && (j = j ? j.concat(Z) : Z),
                p == null
                    ? (n(k, E, N),
                      n(q, E, N),
                      H(
                          // #10007
                          // such fragment like `<></>` will be compiled into
                          // a fragment which doesn't have a children.
                          // In this case fallback to an empty array
                          v.children || [],
                          E,
                          q,
                          C,
                          L,
                          V,
                          j,
                          F
                      ))
                    : Y > 0 &&
                        Y & 64 &&
                        W && // #2715 the previous fragment could've been a BAILed one as a result
                        // of renderSlot() with no valid children
                        p.dynamicChildren
                      ? (X(p.dynamicChildren, W, E, C, L, V, j), // #2080 if the stable fragment has a key, it's a <template v-for> that may
                        //  get moved around. Make sure all root level vnodes inherit el.
                        // #2134 or if it's a component root, it may also get moved around
                        // as the component is being moved.
                        (v.key != null || (C && v === C.subTree)) &&
                            ko(
                                p,
                                v,
                                !0
                                /* shallow */
                            ))
                      : P(p, v, E, q, C, L, V, j, F)
        },
        it = (p, v, E, N, C, L, V, j, F) => {
            ;(v.slotScopeIds = j),
                p == null
                    ? v.shapeFlag & 512
                        ? C.ctx.activate(v, E, N, V, F)
                        : x(v, E, N, C, L, V, F)
                    : O(p, v, F)
        },
        x = (p, v, E, N, C, L, V) => {
            const j = (p.component = wf(p, N, C))
            if ((xo(p) && (j.ctx.renderer = ot), yf(j), j.asyncDep)) {
                if ((C && C.registerDep(j, b), !p.el)) {
                    const F = (j.subTree = oe(an))
                    d(null, F, v, E)
                }
            } else b(j, p, v, E, C, L, V)
        },
        O = (p, v, E) => {
            const N = (v.component = p.component)
            if (vu(p, v, E))
                if (N.asyncDep && !N.asyncResolved) {
                    I(N, v, E)
                    return
                } else (N.next = v), du(N.update), (N.effect.dirty = !0), N.update()
            else (v.el = p.el), (N.vnode = v)
        },
        b = (p, v, E, N, C, L, V) => {
            const j = () => {
                    if (p.isMounted) {
                        let { next: q, bu: Y, u: W, parent: Z, vnode: lt } = p
                        {
                            const Pe = Io(p)
                            if (Pe) {
                                q && ((q.el = lt.el), I(p, q, V)),
                                    Pe.asyncDep.then(() => {
                                        p.isUnmounted || j()
                                    })
                                return
                            }
                        }
                        let at = q,
                            pt
                        xe(p, !1),
                            q ? ((q.el = lt.el), I(p, q, V)) : (q = lt),
                            Y && xr(Y),
                            (pt = q.props && q.props.onVnodeBeforeUpdate) && Yt(pt, Z, q, lt),
                            xe(p, !0)
                        const yt = br(p),
                            At = p.subTree
                        ;(p.subTree = yt),
                            y(
                                At,
                                yt,
                                // parent may have changed if it's in a teleport
                                a(At.el),
                                // anchor may have changed if it's in a fragment
                                A(At),
                                p,
                                C,
                                L
                            ),
                            (q.el = yt.el),
                            at === null && xu(p, yt.el),
                            W && $t(W, C),
                            (pt = q.props && q.props.onVnodeUpdated) &&
                                $t(() => Yt(pt, Z, q, lt), C)
                    } else {
                        let q
                        const { el: Y, props: W } = v,
                            { bm: Z, m: lt, parent: at } = p,
                            pt = On(v)
                        if (
                            (xe(p, !1),
                            Z && xr(Z),
                            !pt && (q = W && W.onVnodeBeforeMount) && Yt(q, at, v),
                            xe(p, !0),
                            Y && kt)
                        ) {
                            const yt = () => {
                                ;(p.subTree = br(p)), kt(Y, p.subTree, p, C, null)
                            }
                            pt
                                ? v.type.__asyncLoader().then(
                                      // note: we are moving the render call into an async callback,
                                      // which means it won't track dependencies - but it's ok because
                                      // a server-rendered async wrapper is already in resolved state
                                      // and it will never need to change.
                                      () => !p.isUnmounted && yt()
                                  )
                                : yt()
                        } else {
                            const yt = (p.subTree = br(p))
                            y(null, yt, E, N, p, C, L), (v.el = yt.el)
                        }
                        if ((lt && $t(lt, C), !pt && (q = W && W.onVnodeMounted))) {
                            const yt = v
                            $t(() => Yt(q, at, yt), C)
                        }
                        ;(v.shapeFlag & 256 || (at && On(at.vnode) && at.vnode.shapeFlag & 256)) &&
                            p.a &&
                            $t(p.a, C),
                            (p.isMounted = !0),
                            (v = E = N = null)
                    }
                },
                F = (p.effect = new fi(
                    j,
                    zt,
                    () => yi(k),
                    p.scope
                    // track it in component's effect scope
                )),
                k = (p.update = () => {
                    F.dirty && F.run()
                })
            ;(k.id = p.uid), xe(p, !0), k()
        },
        I = (p, v, E) => {
            v.component = p
            const N = p.vnode.props
            ;(p.vnode = v),
                (p.next = null),
                Gu(p, v.props, N, E),
                Ju(p, v.children, E),
                ke(),
                Ui(p),
                Ie()
        },
        P = (p, v, E, N, C, L, V, j, F = !1) => {
            const k = p && p.children,
                q = p ? p.shapeFlag : 0,
                Y = v.children,
                { patchFlag: W, shapeFlag: Z } = v
            if (W > 0) {
                if (W & 128) {
                    K(k, Y, E, N, C, L, V, j, F)
                    return
                } else if (W & 256) {
                    U(k, Y, E, N, C, L, V, j, F)
                    return
                }
            }
            Z & 8
                ? (q & 16 && R(k, C, L), Y !== k && c(E, Y))
                : q & 16
                  ? Z & 16
                      ? K(k, Y, E, N, C, L, V, j, F)
                      : R(k, C, L, !0)
                  : (q & 8 && c(E, ''), Z & 16 && H(Y, E, N, C, L, V, j, F))
        },
        U = (p, v, E, N, C, L, V, j, F) => {
            ;(p = p || ze), (v = v || ze)
            const k = p.length,
                q = v.length,
                Y = Math.min(k, q)
            let W
            for (W = 0; W < Y; W++) {
                const Z = (v[W] = F ? de(v[W]) : Zt(v[W]))
                y(p[W], Z, E, null, C, L, V, j, F)
            }
            k > q ? R(p, C, L, !0, !1, Y) : H(v, E, N, C, L, V, j, F, Y)
        },
        K = (p, v, E, N, C, L, V, j, F) => {
            let k = 0
            const q = v.length
            let Y = p.length - 1,
                W = q - 1
            for (; k <= Y && k <= W; ) {
                const Z = p[k],
                    lt = (v[k] = F ? de(v[k]) : Zt(v[k]))
                if (Ye(Z, lt)) y(Z, lt, E, null, C, L, V, j, F)
                else break
                k++
            }
            for (; k <= Y && k <= W; ) {
                const Z = p[Y],
                    lt = (v[W] = F ? de(v[W]) : Zt(v[W]))
                if (Ye(Z, lt)) y(Z, lt, E, null, C, L, V, j, F)
                else break
                Y--, W--
            }
            if (k > Y) {
                if (k <= W) {
                    const Z = W + 1,
                        lt = Z < q ? v[Z].el : N
                    for (; k <= W; )
                        y(null, (v[k] = F ? de(v[k]) : Zt(v[k])), E, lt, C, L, V, j, F), k++
                }
            } else if (k > W) for (; k <= Y; ) rt(p[k], C, L, !0), k++
            else {
                const Z = k,
                    lt = k,
                    at = /* @__PURE__ */ new Map()
                for (k = lt; k <= W; k++) {
                    const It = (v[k] = F ? de(v[k]) : Zt(v[k]))
                    It.key != null && at.set(It.key, k)
                }
                let pt,
                    yt = 0
                const At = W - lt + 1
                let Pe = !1,
                    Pi = 0
                const We = new Array(At)
                for (k = 0; k < At; k++) We[k] = 0
                for (k = Z; k <= Y; k++) {
                    const It = p[k]
                    if (yt >= At) {
                        rt(It, C, L, !0)
                        continue
                    }
                    let Wt
                    if (It.key != null) Wt = at.get(It.key)
                    else
                        for (pt = lt; pt <= W; pt++)
                            if (We[pt - lt] === 0 && Ye(It, v[pt])) {
                                Wt = pt
                                break
                            }
                    Wt === void 0
                        ? rt(It, C, L, !0)
                        : ((We[Wt - lt] = k + 1),
                          Wt >= Pi ? (Pi = Wt) : (Pe = !0),
                          y(It, v[Wt], E, null, C, L, V, j, F),
                          yt++)
                }
                const ji = Pe ? rf(We) : ze
                for (pt = ji.length - 1, k = At - 1; k >= 0; k--) {
                    const It = lt + k,
                        Wt = v[It],
                        Li = It + 1 < q ? v[It + 1].el : N
                    We[k] === 0
                        ? y(null, Wt, E, Li, C, L, V, j, F)
                        : Pe && (pt < 0 || k !== ji[pt] ? et(Wt, E, Li, 2) : pt--)
                }
            }
        },
        et = (p, v, E, N, C = null) => {
            const { el: L, type: V, transition: j, children: F, shapeFlag: k } = p
            if (k & 6) {
                et(p.component.subTree, v, E, N)
                return
            }
            if (k & 128) {
                p.suspense.move(v, E, N)
                return
            }
            if (k & 64) {
                V.move(p, v, E, ot)
                return
            }
            if (V === Gt) {
                n(L, v, E)
                for (let Y = 0; Y < F.length; Y++) et(F[Y], v, E, N)
                n(p.anchor, v, E)
                return
            }
            if (V === Rr) {
                $(p, v, E)
                return
            }
            if (N !== 2 && k & 1 && j)
                if (N === 0) j.beforeEnter(L), n(L, v, E), $t(() => j.enter(L), C)
                else {
                    const { leave: Y, delayLeave: W, afterLeave: Z } = j,
                        lt = () => n(L, v, E),
                        at = () => {
                            Y(L, () => {
                                lt(), Z && Z()
                            })
                        }
                    W ? W(L, lt, at) : at()
                }
            else n(L, v, E)
        },
        rt = (p, v, E, N = !1, C = !1) => {
            const {
                type: L,
                props: V,
                ref: j,
                children: F,
                dynamicChildren: k,
                shapeFlag: q,
                patchFlag: Y,
                dirs: W
            } = p
            if ((j != null && Ur(j, null, E, p, !0), q & 256)) {
                v.ctx.deactivate(p)
                return
            }
            const Z = q & 1 && W,
                lt = !On(p)
            let at
            if ((lt && (at = V && V.onVnodeBeforeUnmount) && Yt(at, v, p), q & 6))
                wt(p.component, E, N)
            else {
                if (q & 128) {
                    p.suspense.unmount(E, N)
                    return
                }
                Z && ve(p, null, v, 'beforeUnmount'),
                    q & 64
                        ? p.type.remove(p, v, E, C, ot, N)
                        : k && // #1153: fast path should not be taken for non-stable (v-for) fragments
                            (L !== Gt || (Y > 0 && Y & 64))
                          ? R(k, v, E, !1, !0)
                          : ((L === Gt && Y & 384) || (!C && q & 16)) && R(F, v, E),
                    N && _t(p)
            }
            ;((lt && (at = V && V.onVnodeUnmounted)) || Z) &&
                $t(() => {
                    at && Yt(at, v, p), Z && ve(p, null, v, 'unmounted')
                }, E)
        },
        _t = (p) => {
            const { type: v, el: E, anchor: N, transition: C } = p
            if (v === Gt) {
                ht(E, N)
                return
            }
            if (v === Rr) {
                m(p)
                return
            }
            const L = () => {
                i(E), C && !C.persisted && C.afterLeave && C.afterLeave()
            }
            if (p.shapeFlag & 1 && C && !C.persisted) {
                const { leave: V, delayLeave: j } = C,
                    F = () => V(E, L)
                j ? j(p.el, L, F) : F()
            } else L()
        },
        ht = (p, v) => {
            let E
            for (; p !== v; ) (E = h(p)), i(p), (p = E)
            i(v)
        },
        wt = (p, v, E) => {
            const { bum: N, scope: C, update: L, subTree: V, um: j } = p
            N && xr(N),
                C.stop(),
                L && ((L.active = !1), rt(V, p, v, E)),
                j && $t(j, v),
                $t(() => {
                    p.isUnmounted = !0
                }, v),
                v &&
                    v.pendingBranch &&
                    !v.isUnmounted &&
                    p.asyncDep &&
                    !p.asyncResolved &&
                    p.suspenseId === v.pendingId &&
                    (v.deps--, v.deps === 0 && v.resolve())
        },
        R = (p, v, E, N = !1, C = !1, L = 0) => {
            for (let V = L; V < p.length; V++) rt(p[V], v, E, N, C)
        },
        A = (p) =>
            p.shapeFlag & 6
                ? A(p.component.subTree)
                : p.shapeFlag & 128
                  ? p.suspense.next()
                  : h(p.anchor || p.el)
    let D = !1
    const B = (p, v, E) => {
            p == null
                ? v._vnode && rt(v._vnode, null, null, !0)
                : y(v._vnode || null, p, v, null, null, null, E),
                D || ((D = !0), Ui(), po(), (D = !1)),
                (v._vnode = p)
        },
        ot = {
            p: y,
            um: rt,
            m: et,
            r: _t,
            mt: x,
            mc: H,
            pc: P,
            pbc: X,
            n: A,
            o: t
        }
    let fe, kt
    return (
        e && ([fe, kt] = e(ot)),
        {
            render: B,
            hydrate: fe,
            createApp: Xu(B, fe)
        }
    )
}
function Mr({ type: t, props: e }, r) {
    return (r === 'svg' && t === 'foreignObject') ||
        (r === 'mathml' && t === 'annotation-xml' && e && e.encoding && e.encoding.includes('html'))
        ? void 0
        : r
}
function xe({ effect: t, update: e }, r) {
    t.allowRecurse = e.allowRecurse = r
}
function nf(t, e) {
    return (!t || (t && !t.pendingBranch)) && e && !e.persisted
}
function ko(t, e, r = !1) {
    const n = t.children,
        i = e.children
    if (J(n) && J(i))
        for (let s = 0; s < n.length; s++) {
            const o = n[s]
            let l = i[s]
            l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = i[s] = de(i[s])), (l.el = o.el)),
                r || ko(o, l)),
                l.type === ar && (l.el = o.el)
        }
}
function rf(t) {
    const e = t.slice(),
        r = [0]
    let n, i, s, o, l
    const u = t.length
    for (n = 0; n < u; n++) {
        const f = t[n]
        if (f !== 0) {
            if (((i = r[r.length - 1]), t[i] < f)) {
                ;(e[n] = i), r.push(n)
                continue
            }
            for (s = 0, o = r.length - 1; s < o; )
                (l = (s + o) >> 1), t[r[l]] < f ? (s = l + 1) : (o = l)
            f < t[r[s]] && (s > 0 && (e[n] = r[s - 1]), (r[s] = n))
        }
    }
    for (s = r.length, o = r[s - 1]; s-- > 0; ) (r[s] = o), (o = e[o])
    return r
}
function Io(t) {
    const e = t.subTree.component
    if (e) return e.asyncDep && !e.asyncResolved ? e : Io(e)
}
const sf = (t) => t.__isTeleport,
    Gt = Symbol.for('v-fgt'),
    ar = Symbol.for('v-txt'),
    an = Symbol.for('v-cmt'),
    Rr = Symbol.for('v-stc'),
    ln = []
let Ut = null
function of(t = !1) {
    ln.push((Ut = t ? null : []))
}
function lf() {
    ln.pop(), (Ut = ln[ln.length - 1] || null)
}
let hn = 1
function es(t) {
    hn += t
}
function uf(t) {
    return (t.dynamicChildren = hn > 0 ? Ut || ze : null), lf(), hn > 0 && Ut && Ut.push(t), t
}
function ff(t, e, r, n, i, s) {
    return uf(dr(t, e, r, n, i, s, !0))
}
function cf(t) {
    return t ? t.__v_isVNode === !0 : !1
}
function Ye(t, e) {
    return t.type === e.type && t.key === e.key
}
const hr = '__vInternal',
    Po = ({ key: t }) => t ?? null,
    zn = ({ ref: t, ref_key: e, ref_for: r }) => (
        typeof t == 'number' && (t = '' + t),
        t != null ? (vt(t) || Ct(t) || nt(t) ? { i: Lt, r: t, k: e, f: !!r } : t) : null
    )
function dr(t, e = null, r = null, n = 0, i = null, s = t === Gt ? 0 : 1, o = !1, l = !1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: t,
        props: e,
        key: e && Po(e),
        ref: e && zn(e),
        scopeId: wo,
        slotScopeIds: null,
        children: r,
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
        shapeFlag: s,
        patchFlag: n,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
        ctx: Lt
    }
    return (
        l ? (bi(u, r), s & 128 && t.normalize(u)) : r && (u.shapeFlag |= vt(r) ? 8 : 16),
        hn > 0 && // avoid a block node from tracking itself
            !o && // has current parent block
            Ut && // presence of a patch flag indicates this node needs patching on updates.
            // component nodes also should always be patched, because even if the
            // component doesn't need to update, it needs to persist the instance on to
            // the next vnode so that it can be properly unmounted later.
            (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
            // vnode should not be considered dynamic due to handler caching.
            u.patchFlag !== 32 &&
            Ut.push(u),
        u
    )
}
const oe = af
function af(t, e = null, r = null, n = 0, i = null, s = !1) {
    if (((!t || t === bu) && (t = an), cf(t))) {
        const l = Ue(
            t,
            e,
            !0
            /* mergeRef: true */
        )
        return (
            r && bi(l, r),
            hn > 0 && !s && Ut && (l.shapeFlag & 6 ? (Ut[Ut.indexOf(t)] = l) : Ut.push(l)),
            (l.patchFlag |= -2),
            l
        )
    }
    if ((bf(t) && (t = t.__vccOpts), e)) {
        e = hf(e)
        let { class: l, style: u } = e
        l && !vt(l) && (e.class = ui(l)),
            gt(u) && (io(u) && !J(u) && (u = mt({}, u)), (e.style = li(u)))
    }
    const o = vt(t) ? 1 : Eu(t) ? 128 : sf(t) ? 64 : gt(t) ? 4 : nt(t) ? 2 : 0
    return dr(t, e, r, n, i, o, s, !0)
}
function hf(t) {
    return t ? (io(t) || hr in t ? mt({}, t) : t) : null
}
function Ue(t, e, r = !1) {
    const { props: n, ref: i, patchFlag: s, children: o } = t,
        l = e ? pf(n || {}, e) : n
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: t.type,
        props: l,
        key: l && Po(l),
        ref:
            e && e.ref
                ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                  // if the vnode itself already has a ref, cloneVNode will need to merge
                  // the refs so the single vnode can be set on multiple refs
                  r && i
                    ? J(i)
                        ? i.concat(zn(e))
                        : [i, zn(e)]
                    : zn(e)
                : i,
        scopeId: t.scopeId,
        slotScopeIds: t.slotScopeIds,
        children: o,
        target: t.target,
        targetAnchor: t.targetAnchor,
        staticCount: t.staticCount,
        shapeFlag: t.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: e && t.type !== Gt ? (s === -1 ? 16 : s | 16) : s,
        dynamicProps: t.dynamicProps,
        dynamicChildren: t.dynamicChildren,
        appContext: t.appContext,
        dirs: t.dirs,
        transition: t.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: t.component,
        suspense: t.suspense,
        ssContent: t.ssContent && Ue(t.ssContent),
        ssFallback: t.ssFallback && Ue(t.ssFallback),
        el: t.el,
        anchor: t.anchor,
        ctx: t.ctx,
        ce: t.ce
    }
}
function df(t = ' ', e = 0) {
    return oe(ar, null, t, e)
}
function Zt(t) {
    return t == null || typeof t == 'boolean'
        ? oe(an)
        : J(t)
          ? oe(
                Gt,
                null,
                // #3666, avoid reference pollution when reusing vnode
                t.slice()
            )
          : typeof t == 'object'
            ? de(t)
            : oe(ar, null, String(t))
}
function de(t) {
    return (t.el === null && t.patchFlag !== -1) || t.memo ? t : Ue(t)
}
function bi(t, e) {
    let r = 0
    const { shapeFlag: n } = t
    if (e == null) e = null
    else if (J(e)) r = 16
    else if (typeof e == 'object')
        if (n & 65) {
            const i = e.default
            i && (i._c && (i._d = !1), bi(t, i()), i._c && (i._d = !0))
            return
        } else {
            r = 32
            const i = e._
            !i && !(hr in e)
                ? (e._ctx = Lt)
                : i === 3 &&
                  Lt &&
                  (Lt.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)))
        }
    else
        nt(e)
            ? ((e = { default: e, _ctx: Lt }), (r = 32))
            : ((e = String(e)), n & 64 ? ((r = 16), (e = [df(e)])) : (r = 8))
    ;(t.children = e), (t.shapeFlag |= r)
}
function pf(...t) {
    const e = {}
    for (let r = 0; r < t.length; r++) {
        const n = t[r]
        for (const i in n)
            if (i === 'class') e.class !== n.class && (e.class = ui([e.class, n.class]))
            else if (i === 'style') e.style = li([e.style, n.style])
            else if (rr(i)) {
                const s = e[i],
                    o = n[i]
                o && s !== o && !(J(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o)
            } else i !== '' && (e[i] = n[i])
    }
    return e
}
function Yt(t, e, r, n = null) {
    Kt(t, e, 7, [r, n])
}
const gf = Mo()
let mf = 0
function wf(t, e, r) {
    const n = t.type,
        i = (e ? e.appContext : t.appContext) || gf,
        s = {
            uid: mf++,
            vnode: t,
            type: n,
            parent: e,
            appContext: i,
            root: null,
            // to be immediately set
            next: null,
            subTree: null,
            // will be set synchronously right after creation
            effect: null,
            update: null,
            // will be set synchronously right after creation
            scope: new Fl(
                !0
                /* detached */
            ),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: e ? e.provides : Object.create(i.provides),
            accessCache: null,
            renderCache: [],
            // local resolved assets
            components: null,
            directives: null,
            // resolved props and emits options
            propsOptions: $o(n, i),
            emitsOptions: mo(n, i),
            // emit
            emit: null,
            // to be set immediately
            emitted: null,
            // props default value
            propsDefaults: dt,
            // inheritAttrs
            inheritAttrs: n.inheritAttrs,
            // state
            ctx: dt,
            data: dt,
            props: dt,
            attrs: dt,
            slots: dt,
            refs: dt,
            setupState: dt,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            // suspense related
            suspense: r,
            suspenseId: r ? r.pendingId : 0,
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
        }
    return (
        (s.ctx = { _: s }),
        (s.root = e ? e.root : s),
        (s.emit = mu.bind(null, s)),
        t.ce && t.ce(s),
        s
    )
}
let Et = null,
    Wn,
    Kr
{
    const t = qs(),
        e = (r, n) => {
            let i
            return (
                (i = t[r]) || (i = t[r] = []),
                i.push(n),
                (s) => {
                    i.length > 1 ? i.forEach((o) => o(s)) : i[0](s)
                }
            )
        }
    ;(Wn = e('__VUE_INSTANCE_SETTERS__', (r) => (Et = r))),
        (Kr = e('__VUE_SSR_SETTERS__', (r) => (pr = r)))
}
const yn = (t) => {
        const e = Et
        return (
            Wn(t),
            t.scope.on(),
            () => {
                t.scope.off(), Wn(e)
            }
        )
    },
    ns = () => {
        Et && Et.scope.off(), Wn(null)
    }
function jo(t) {
    return t.vnode.shapeFlag & 4
}
let pr = !1
function yf(t, e = !1) {
    e && Kr(e)
    const { props: r, children: n } = t.vnode,
        i = jo(t)
    Yu(t, r, i, e), Qu(t, n)
    const s = i ? _f(t, e) : void 0
    return e && Kr(!1), s
}
function _f(t, e) {
    const r = t.type
    ;(t.accessCache = /* @__PURE__ */ Object.create(null)), (t.proxy = so(new Proxy(t.ctx, Vu)))
    const { setup: n } = r
    if (n) {
        const i = (t.setupContext = n.length > 1 ? xf(t) : null),
            s = yn(t)
        ke()
        const o = ye(n, t, 0, [t.props, i])
        if ((Ie(), s(), Hs(o))) {
            if ((o.then(ns, ns), e))
                return o
                    .then((l) => {
                        rs(t, l, e)
                    })
                    .catch((l) => {
                        ur(l, t, 0)
                    })
            t.asyncDep = o
        } else rs(t, o, e)
    } else Lo(t, e)
}
function rs(t, e, r) {
    nt(e)
        ? t.type.__ssrInlineRender
            ? (t.ssrRender = e)
            : (t.render = e)
        : gt(e) && (t.setupState = fo(e)),
        Lo(t, r)
}
let is
function Lo(t, e, r) {
    const n = t.type
    if (!t.render) {
        if (!e && is && !n.render) {
            const i = n.template || vi(t).template
            if (i) {
                const { isCustomElement: s, compilerOptions: o } = t.appContext.config,
                    { delimiters: l, compilerOptions: u } = n,
                    f = mt(
                        mt(
                            {
                                isCustomElement: s,
                                delimiters: l
                            },
                            o
                        ),
                        u
                    )
                n.render = is(i, f)
            }
        }
        t.render = n.render || zt
    }
    {
        const i = yn(t)
        ke()
        try {
            Du(t)
        } finally {
            Ie(), i()
        }
    }
}
function vf(t) {
    return (
        t.attrsProxy ||
        (t.attrsProxy = new Proxy(t.attrs, {
            get(e, r) {
                return Tt(t, 'get', '$attrs'), e[r]
            }
        }))
    )
}
function xf(t) {
    const e = (r) => {
        t.exposed = r || {}
    }
    return {
        get attrs() {
            return vf(t)
        },
        slots: t.slots,
        emit: t.emit,
        expose: e
    }
}
function gr(t) {
    if (t.exposed)
        return (
            t.exposeProxy ||
            (t.exposeProxy = new Proxy(fo(so(t.exposed)), {
                get(e, r) {
                    if (r in e) return e[r]
                    if (r in sn) return sn[r](t)
                },
                has(e, r) {
                    return r in e || r in sn
                }
            }))
        )
}
function bf(t) {
    return nt(t) && '__vccOpts' in t
}
const Oo = (t, e) => ou(t, e, pr),
    Ef = '3.4.21'
/*! (c) Andrea Giammarchi - ISC */
const Sf = (() => {
    const t = 'DOMContentLoaded',
        e = /* @__PURE__ */ new WeakMap(),
        r = [],
        n = (o) => {
            do if (o.nextSibling) return !0
            while ((o = o.parentNode))
            return !1
        },
        i = () => {
            r.splice(0).forEach((o) => {
                e.get(o[0]) !== !0 && (e.set(o[0], !0), o[0][o[1]]())
            })
        }
    document.addEventListener(t, i)
    class s extends HTMLElement {
        static withParsedCallback(l, u = 'parsed') {
            const { prototype: f } = l,
                { connectedCallback: c } = f,
                a = u + 'Callback',
                h = (w, y, _, d) => {
                    y.disconnect(), _.removeEventListener(t, d), g(w)
                },
                g = (w) => {
                    r.length || requestAnimationFrame(i), r.push([w, a])
                }
            return (
                Object.defineProperties(f, {
                    connectedCallback: {
                        configurable: !0,
                        writable: !0,
                        value() {
                            if ((c && c.apply(this, arguments), a in this && !e.has(this))) {
                                const w = this,
                                    { ownerDocument: y } = w
                                if ((e.set(w, !1), y.readyState === 'complete' || n(w))) g(w)
                                else {
                                    const _ = () => h(w, d, y, _)
                                    y.addEventListener(t, _)
                                    const d = new MutationObserver(() => {
                                        n(w) && h(w, d, y, _)
                                    })
                                    d.observe(w.parentNode, { childList: !0, subtree: !0 })
                                }
                            }
                        }
                    },
                    [u]: {
                        configurable: !0,
                        get() {
                            return e.get(this) === !0
                        }
                    }
                }),
                l
            )
        }
    }
    return s.withParsedCallback(s)
})()
/**
 * @vue/runtime-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
const Mf = 'http://www.w3.org/2000/svg',
    Rf = 'http://www.w3.org/1998/Math/MathML',
    pe = typeof document < 'u' ? document : null,
    ss = pe && /* @__PURE__ */ pe.createElement('template'),
    $f = {
        insert: (t, e, r) => {
            e.insertBefore(t, r || null)
        },
        remove: (t) => {
            const e = t.parentNode
            e && e.removeChild(t)
        },
        createElement: (t, e, r, n) => {
            const i =
                e === 'svg'
                    ? pe.createElementNS(Mf, t)
                    : e === 'mathml'
                      ? pe.createElementNS(Rf, t)
                      : pe.createElement(t, r ? { is: r } : void 0)
            return (
                t === 'select' && n && n.multiple != null && i.setAttribute('multiple', n.multiple),
                i
            )
        },
        createText: (t) => pe.createTextNode(t),
        createComment: (t) => pe.createComment(t),
        setText: (t, e) => {
            t.nodeValue = e
        },
        setElementText: (t, e) => {
            t.textContent = e
        },
        parentNode: (t) => t.parentNode,
        nextSibling: (t) => t.nextSibling,
        querySelector: (t) => pe.querySelector(t),
        setScopeId(t, e) {
            t.setAttribute(e, '')
        },
        // __UNSAFE__
        // Reason: innerHTML.
        // Static content here can only come from compiled templates.
        // As long as the user only uses trusted templates, this is safe.
        insertStaticContent(t, e, r, n, i, s) {
            const o = r ? r.previousSibling : e.lastChild
            if (i && (i === s || i.nextSibling))
                for (; e.insertBefore(i.cloneNode(!0), r), !(i === s || !(i = i.nextSibling)); );
            else {
                ss.innerHTML =
                    n === 'svg' ? `<svg>${t}</svg>` : n === 'mathml' ? `<math>${t}</math>` : t
                const l = ss.content
                if (n === 'svg' || n === 'mathml') {
                    const u = l.firstChild
                    for (; u.firstChild; ) l.appendChild(u.firstChild)
                    l.removeChild(u)
                }
                e.insertBefore(l, r)
            }
            return [
                // first
                o ? o.nextSibling : e.firstChild,
                // last
                r ? r.previousSibling : e.lastChild
            ]
        }
    },
    Nf = Symbol('_vtc')
function Tf(t, e, r) {
    const n = t[Nf]
    n && (e = (e ? [e, ...n] : [...n]).join(' ')),
        e == null ? t.removeAttribute('class') : r ? t.setAttribute('class', e) : (t.className = e)
}
const Yn = Symbol('_vod'),
    Fo = Symbol('_vsh'),
    Cf = {
        beforeMount(t, { value: e }, { transition: r }) {
            ;(t[Yn] = t.style.display === 'none' ? '' : t.style.display),
                r && e ? r.beforeEnter(t) : Ge(t, e)
        },
        mounted(t, { value: e }, { transition: r }) {
            r && e && r.enter(t)
        },
        updated(t, { value: e, oldValue: r }, { transition: n }) {
            !e != !r &&
                (n
                    ? e
                        ? (n.beforeEnter(t), Ge(t, !0), n.enter(t))
                        : n.leave(t, () => {
                              Ge(t, !1)
                          })
                    : Ge(t, e))
        },
        beforeUnmount(t, { value: e }) {
            Ge(t, e)
        }
    }
function Ge(t, e) {
    ;(t.style.display = e ? t[Yn] : 'none'), (t[Fo] = !e)
}
const kf = Symbol(''),
    If = /(^|;)\s*display\s*:/
function Pf(t, e, r) {
    const n = t.style,
        i = vt(r)
    let s = !1
    if (r && !i) {
        if (e)
            if (vt(e))
                for (const o of e.split(';')) {
                    const l = o.slice(0, o.indexOf(':')).trim()
                    r[l] == null && An(n, l, '')
                }
            else for (const o in e) r[o] == null && An(n, o, '')
        for (const o in r) o === 'display' && (s = !0), An(n, o, r[o])
    } else if (i) {
        if (e !== r) {
            const o = n[kf]
            o && (r += ';' + o), (n.cssText = r), (s = If.test(r))
        }
    } else e && t.removeAttribute('style')
    Yn in t && ((t[Yn] = s ? n.display : ''), t[Fo] && (n.display = 'none'))
}
const os = /\s*!important$/
function An(t, e, r) {
    if (J(r)) r.forEach((n) => An(t, e, n))
    else if ((r == null && (r = ''), e.startsWith('--'))) t.setProperty(e, r)
    else {
        const n = jf(t, e)
        os.test(r) ? t.setProperty(Bt(n), r.replace(os, ''), 'important') : (t[n] = r)
    }
}
const ls = ['Webkit', 'Moz', 'ms'],
    $r = {}
function jf(t, e) {
    const r = $r[e]
    if (r) return r
    let n = ie(e)
    if (n !== 'filter' && n in t) return ($r[e] = n)
    n = Bs(n)
    for (let i = 0; i < ls.length; i++) {
        const s = ls[i] + n
        if (s in t) return ($r[e] = s)
    }
    return e
}
const us = 'http://www.w3.org/1999/xlink'
function Lf(t, e, r, n, i) {
    if (n && e.startsWith('xlink:'))
        r == null ? t.removeAttributeNS(us, e.slice(6, e.length)) : t.setAttributeNS(us, e, r)
    else {
        const s = Ol(e)
        r == null || (s && !Us(r)) ? t.removeAttribute(e) : t.setAttribute(e, s ? '' : r)
    }
}
function Of(t, e, r, n, i, s, o) {
    if (e === 'innerHTML' || e === 'textContent') {
        n && o(n, i, s), (t[e] = r ?? '')
        return
    }
    const l = t.tagName
    if (
        e === 'value' &&
        l !== 'PROGRESS' && // custom elements may use _value internally
        !l.includes('-')
    ) {
        const f = l === 'OPTION' ? t.getAttribute('value') || '' : t.value,
            c = r ?? ''
        ;(f !== c || !('_value' in t)) && (t.value = c),
            r == null && t.removeAttribute(e),
            (t._value = r)
        return
    }
    let u = !1
    if (r === '' || r == null) {
        const f = typeof t[e]
        f === 'boolean'
            ? (r = Us(r))
            : r == null && f === 'string'
              ? ((r = ''), (u = !0))
              : f === 'number' && ((r = 0), (u = !0))
    }
    try {
        t[e] = r
    } catch {}
    u && t.removeAttribute(e)
}
function Ff(t, e, r, n) {
    t.addEventListener(e, r, n)
}
function zf(t, e, r, n) {
    t.removeEventListener(e, r, n)
}
const fs = Symbol('_vei')
function Af(t, e, r, n, i = null) {
    const s = t[fs] || (t[fs] = {}),
        o = s[e]
    if (n && o) o.value = n
    else {
        const [l, u] = Vf(e)
        if (n) {
            const f = (s[e] = Bf(n, i))
            Ff(t, l, f, u)
        } else o && (zf(t, l, o, u), (s[e] = void 0))
    }
}
const cs = /(?:Once|Passive|Capture)$/
function Vf(t) {
    let e
    if (cs.test(t)) {
        e = {}
        let n
        for (; (n = t.match(cs)); )
            (t = t.slice(0, t.length - n[0].length)), (e[n[0].toLowerCase()] = !0)
    }
    return [t[2] === ':' ? t.slice(3) : Bt(t.slice(2)), e]
}
let Nr = 0
const Df = /* @__PURE__ */ Promise.resolve(),
    Hf = () => Nr || (Df.then(() => (Nr = 0)), (Nr = Date.now()))
function Bf(t, e) {
    const r = (n) => {
        if (!n._vts) n._vts = Date.now()
        else if (n._vts <= r.attached) return
        Kt(qf(n, r.value), e, 5, [n])
    }
    return (r.value = t), (r.attached = Hf()), r
}
function qf(t, e) {
    if (J(e)) {
        const r = t.stopImmediatePropagation
        return (
            (t.stopImmediatePropagation = () => {
                r.call(t), (t._stopped = !0)
            }),
            e.map((n) => (i) => !i._stopped && n && n(i))
        )
    } else return e
}
const as = (t) =>
        t.charCodeAt(0) === 111 &&
        t.charCodeAt(1) === 110 && // lowercase letter
        t.charCodeAt(2) > 96 &&
        t.charCodeAt(2) < 123,
    Uf = (t, e, r, n, i, s, o, l, u) => {
        const f = i === 'svg'
        e === 'class'
            ? Tf(t, n, f)
            : e === 'style'
              ? Pf(t, r, n)
              : rr(e)
                ? ii(e) || Af(t, e, r, n, o)
                : (
                        e[0] === '.'
                            ? ((e = e.slice(1)), !0)
                            : e[0] === '^'
                              ? ((e = e.slice(1)), !1)
                              : Kf(t, e, n, f)
                    )
                  ? Of(t, e, n, s, o, l, u)
                  : (e === 'true-value'
                        ? (t._trueValue = n)
                        : e === 'false-value' && (t._falseValue = n),
                    Lf(t, e, n, f))
    }
function Kf(t, e, r, n) {
    if (n) return !!(e === 'innerHTML' || e === 'textContent' || (e in t && as(e) && nt(r)))
    if (
        e === 'spellcheck' ||
        e === 'draggable' ||
        e === 'translate' ||
        e === 'form' ||
        (e === 'list' && t.tagName === 'INPUT') ||
        (e === 'type' && t.tagName === 'TEXTAREA')
    )
        return !1
    if (e === 'width' || e === 'height') {
        const i = t.tagName
        if (i === 'IMG' || i === 'VIDEO' || i === 'CANVAS' || i === 'SOURCE') return !1
    }
    return as(e) && vt(r) ? !1 : e in t
}
const Xf = /* @__PURE__ */ mt({ patchProp: Uf }, $f)
let hs
function Wf() {
    return hs || (hs = tf(Xf))
}
const ds = (...t) => {
    Wf().render(...t)
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Yf(t, e, r) {
    const n = /* @__PURE__ */ vo(t)
    class i extends Ei {
        constructor(o) {
            super(n, o, e, r)
        }
    }
    return Pt(i, 'def', n), i
}
const Gf = typeof HTMLElement < 'u' ? Sf : class {}
class Ei extends Gf {
    constructor(r, n = {}, i = {}, s) {
        super()
        /**
         * @internal
         */
        Pt(this, '_instance', null)
        Pt(this, '_connected', !1)
        Pt(this, '_resolved', !1)
        Pt(this, '_numberProps', null)
        Pt(this, '_styles')
        Pt(this, '_slots')
        Pt(this, '_ob', null)
        ;(this._def = r),
            (this._props = n),
            (this._config = i),
            (this._config = mt(
                {
                    shadowRoot: !0
                },
                this._config
            )),
            this._config.shadowRoot
                ? this.shadowRoot && s
                    ? s(this._createVNode(), this._root)
                    : (this.attachShadow({ mode: 'open' }),
                      this._def.__asyncLoader || this._resolveProps(this._def))
                : s && s(this._createVNode(), this._root)
    }
    get _root() {
        return this._config.shadowRoot ? this.shadowRoot : this
    }
    connectedCallback() {
        this._config.shadowRoot ? this._connect() : super.connectedCallback()
    }
    // use of parsedCallback when shadowRoot is disabled
    // to wait for slots to be parsed
    // see https://stackoverflow.com/a/52884370
    parsedCallback() {
        this._config.shadowRoot || this._connect()
    }
    _connect() {
        ;(this._connected = !0),
            this._instance || (this._resolved ? this._update() : this._resolveDef())
    }
    disconnectedCallback() {
        ;(this._connected = !1),
            this._ob && (this._ob.disconnect(), (this._ob = null)),
            ao(() => {
                this._connected || (ds(null, this._root), (this._instance = null))
            })
    }
    /**
     * resolve inner component definition (handle possible async component)
     */
    _resolveDef() {
        this._resolved = !0
        for (let i = 0; i < this.attributes.length; i++) this._setAttr(this.attributes[i].name)
        ;(this._ob = new MutationObserver((i) => {
            for (const s of i) this._setAttr(s.attributeName)
        })),
            this._ob.observe(this, { attributes: !0 })
        const r = (i, s = !1) => {
                const { props: o, styles: l } = i
                let u
                if (o && !J(o))
                    for (const f in o) {
                        const c = o[f]
                        ;(c === Number || (c && c.type === Number)) &&
                            (f in this._props && (this._props[f] = Oi(this._props[f])),
                            ((u || (u = /* @__PURE__ */ Object.create(null)))[ie(f)] = !0))
                    }
                ;(this._numberProps = u),
                    s && this._resolveProps(i),
                    this._config.shadowRoot ||
                        ((this._slots = Array.from(this.children).map((f) => f.cloneNode(!0))),
                        this.replaceChildren()),
                    this._applyStyles(l),
                    this._update()
            },
            n = this._def.__asyncLoader
        n ? n().then((i) => r(i, !0)) : r(this._def)
    }
    _resolveProps(r) {
        const { props: n } = r,
            i = J(n) ? n : Object.keys(n || {})
        for (const s of Object.keys(this))
            s[0] !== '_' && i.includes(s) && this._setProp(s, this[s], !0, !1)
        for (const s of i.map(ie))
            Object.defineProperty(this, s, {
                get() {
                    return this._getProp(s)
                },
                set(o) {
                    this._setProp(s, o)
                }
            })
    }
    _setAttr(r) {
        let n = this.getAttribute(r)
        const i = ie(r)
        this._numberProps && this._numberProps[i] && (n = Oi(n)), this._setProp(i, n, !1)
    }
    /**
     * @internal
     */
    _getProp(r) {
        return this._props[r]
    }
    /**
     * @internal
     */
    _setProp(r, n, i = !0, s = !0) {
        n !== this._props[r] &&
            ((this._props[r] = n),
            s && this._instance && this._update(),
            i &&
                (n === !0
                    ? this.setAttribute(Bt(r), '')
                    : typeof n == 'string' || typeof n == 'number'
                      ? this.setAttribute(Bt(r), n + '')
                      : n || this.removeAttribute(Bt(r))))
    }
    _update() {
        ds(this._createVNode(), this._root)
    }
    _createVNode() {
        let r = null
        this._config.shadowRoot ||
            (r = () => {
                const i = (s) => {
                    const o = {}
                    for (let l = 0, u = s.length; l < u; l++) {
                        const f = s[l]
                        o[f.nodeName] = f.nodeValue
                    }
                    return o
                }
                return this._slots.map((s) => {
                    const o = s.attributes ? i(s.attributes) : {}
                    return (o.innerHTML = s.innerHTML), oe(s.tagName, o, null)
                })
            })
        const n = oe(this._def, mt({}, this._props), r)
        return (
            this._instance ||
                (n.ce = (i) => {
                    ;(this._instance = i), this._config.shadowRoot && (i.isCE = !0)
                    const s = (l, u) => {
                        this.dispatchEvent(
                            new CustomEvent(l, {
                                detail: u
                            })
                        )
                    }
                    i.emit = (l, ...u) => {
                        s(l, u), Bt(l) !== l && s(Bt(l), u)
                    }
                    let o = this
                    for (; (o = o && (o.parentNode || o.host)); )
                        if (o instanceof Ei) {
                            ;(i.parent = o._instance), (i.provides = o._instance.provides)
                            break
                        }
                }),
            n
        )
    }
    _applyStyles(r) {
        r &&
            r.forEach((n) => {
                const i = document.createElement('style')
                ;(i.textContent = n), this._root.appendChild(i)
            })
    }
}
var Zf = { value: () => {} }
function _n() {
    for (var t = 0, e = arguments.length, r = {}, n; t < e; ++t) {
        if (!(n = arguments[t] + '') || n in r || /[\s.]/.test(n))
            throw new Error('illegal type: ' + n)
        r[n] = []
    }
    return new Vn(r)
}
function Vn(t) {
    this._ = t
}
function Qf(t, e) {
    return t
        .trim()
        .split(/^|\s+/)
        .map(function (r) {
            var n = '',
                i = r.indexOf('.')
            if ((i >= 0 && ((n = r.slice(i + 1)), (r = r.slice(0, i))), r && !e.hasOwnProperty(r)))
                throw new Error('unknown type: ' + r)
            return { type: r, name: n }
        })
}
Vn.prototype = _n.prototype = {
    constructor: Vn,
    on: function (t, e) {
        var r = this._,
            n = Qf(t + '', r),
            i,
            s = -1,
            o = n.length
        if (arguments.length < 2) {
            for (; ++s < o; ) if ((i = (t = n[s]).type) && (i = Jf(r[i], t.name))) return i
            return
        }
        if (e != null && typeof e != 'function') throw new Error('invalid callback: ' + e)
        for (; ++s < o; )
            if ((i = (t = n[s]).type)) r[i] = ps(r[i], t.name, e)
            else if (e == null) for (i in r) r[i] = ps(r[i], t.name, null)
        return this
    },
    copy: function () {
        var t = {},
            e = this._
        for (var r in e) t[r] = e[r].slice()
        return new Vn(t)
    },
    call: function (t, e) {
        if ((i = arguments.length - 2) > 0)
            for (var r = new Array(i), n = 0, i, s; n < i; ++n) r[n] = arguments[n + 2]
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
        for (s = this._[t], n = 0, i = s.length; n < i; ++n) s[n].value.apply(e, r)
    },
    apply: function (t, e, r) {
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
        for (var n = this._[t], i = 0, s = n.length; i < s; ++i) n[i].value.apply(e, r)
    }
}
function Jf(t, e) {
    for (var r = 0, n = t.length, i; r < n; ++r) if ((i = t[r]).name === e) return i.value
}
function ps(t, e, r) {
    for (var n = 0, i = t.length; n < i; ++n)
        if (t[n].name === e) {
            ;(t[n] = Zf), (t = t.slice(0, n).concat(t.slice(n + 1)))
            break
        }
    return r != null && t.push({ name: e, value: r }), t
}
var Xr = 'http://www.w3.org/1999/xhtml'
const gs = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: Xr,
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/'
}
function mr(t) {
    var e = (t += ''),
        r = e.indexOf(':')
    return (
        r >= 0 && (e = t.slice(0, r)) !== 'xmlns' && (t = t.slice(r + 1)),
        gs.hasOwnProperty(e) ? { space: gs[e], local: t } : t
    )
}
function tc(t) {
    return function () {
        var e = this.ownerDocument,
            r = this.namespaceURI
        return r === Xr && e.documentElement.namespaceURI === Xr
            ? e.createElement(t)
            : e.createElementNS(r, t)
    }
}
function ec(t) {
    return function () {
        return this.ownerDocument.createElementNS(t.space, t.local)
    }
}
function zo(t) {
    var e = mr(t)
    return (e.local ? ec : tc)(e)
}
function nc() {}
function Si(t) {
    return t == null
        ? nc
        : function () {
              return this.querySelector(t)
          }
}
function rc(t) {
    typeof t != 'function' && (t = Si(t))
    for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
        for (var s = e[i], o = s.length, l = (n[i] = new Array(o)), u, f, c = 0; c < o; ++c)
            (u = s[c]) &&
                (f = t.call(u, u.__data__, c, s)) &&
                ('__data__' in u && (f.__data__ = u.__data__), (l[c] = f))
    return new Ot(n, this._parents)
}
function ic(t) {
    return t == null ? [] : Array.isArray(t) ? t : Array.from(t)
}
function sc() {
    return []
}
function Ao(t) {
    return t == null
        ? sc
        : function () {
              return this.querySelectorAll(t)
          }
}
function oc(t) {
    return function () {
        return ic(t.apply(this, arguments))
    }
}
function lc(t) {
    typeof t == 'function' ? (t = oc(t)) : (t = Ao(t))
    for (var e = this._groups, r = e.length, n = [], i = [], s = 0; s < r; ++s)
        for (var o = e[s], l = o.length, u, f = 0; f < l; ++f)
            (u = o[f]) && (n.push(t.call(u, u.__data__, f, o)), i.push(u))
    return new Ot(n, i)
}
function Vo(t) {
    return function () {
        return this.matches(t)
    }
}
function Do(t) {
    return function (e) {
        return e.matches(t)
    }
}
var uc = Array.prototype.find
function fc(t) {
    return function () {
        return uc.call(this.children, t)
    }
}
function cc() {
    return this.firstElementChild
}
function ac(t) {
    return this.select(t == null ? cc : fc(typeof t == 'function' ? t : Do(t)))
}
var hc = Array.prototype.filter
function dc() {
    return Array.from(this.children)
}
function pc(t) {
    return function () {
        return hc.call(this.children, t)
    }
}
function gc(t) {
    return this.selectAll(t == null ? dc : pc(typeof t == 'function' ? t : Do(t)))
}
function mc(t) {
    typeof t != 'function' && (t = Vo(t))
    for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
        for (var s = e[i], o = s.length, l = (n[i] = []), u, f = 0; f < o; ++f)
            (u = s[f]) && t.call(u, u.__data__, f, s) && l.push(u)
    return new Ot(n, this._parents)
}
function Ho(t) {
    return new Array(t.length)
}
function wc() {
    return new Ot(this._enter || this._groups.map(Ho), this._parents)
}
function Gn(t, e) {
    ;(this.ownerDocument = t.ownerDocument),
        (this.namespaceURI = t.namespaceURI),
        (this._next = null),
        (this._parent = t),
        (this.__data__ = e)
}
Gn.prototype = {
    constructor: Gn,
    appendChild: function (t) {
        return this._parent.insertBefore(t, this._next)
    },
    insertBefore: function (t, e) {
        return this._parent.insertBefore(t, e)
    },
    querySelector: function (t) {
        return this._parent.querySelector(t)
    },
    querySelectorAll: function (t) {
        return this._parent.querySelectorAll(t)
    }
}
function yc(t) {
    return function () {
        return t
    }
}
function _c(t, e, r, n, i, s) {
    for (var o = 0, l, u = e.length, f = s.length; o < f; ++o)
        (l = e[o]) ? ((l.__data__ = s[o]), (n[o] = l)) : (r[o] = new Gn(t, s[o]))
    for (; o < u; ++o) (l = e[o]) && (i[o] = l)
}
function vc(t, e, r, n, i, s, o) {
    var l,
        u,
        f = /* @__PURE__ */ new Map(),
        c = e.length,
        a = s.length,
        h = new Array(c),
        g
    for (l = 0; l < c; ++l)
        (u = e[l]) &&
            ((h[l] = g = o.call(u, u.__data__, l, e) + ''), f.has(g) ? (i[l] = u) : f.set(g, u))
    for (l = 0; l < a; ++l)
        (g = o.call(t, s[l], l, s) + ''),
            (u = f.get(g))
                ? ((n[l] = u), (u.__data__ = s[l]), f.delete(g))
                : (r[l] = new Gn(t, s[l]))
    for (l = 0; l < c; ++l) (u = e[l]) && f.get(h[l]) === u && (i[l] = u)
}
function xc(t) {
    return t.__data__
}
function bc(t, e) {
    if (!arguments.length) return Array.from(this, xc)
    var r = e ? vc : _c,
        n = this._parents,
        i = this._groups
    typeof t != 'function' && (t = yc(t))
    for (
        var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), f = 0;
        f < s;
        ++f
    ) {
        var c = n[f],
            a = i[f],
            h = a.length,
            g = Ec(t.call(c, c && c.__data__, f, n)),
            w = g.length,
            y = (l[f] = new Array(w)),
            _ = (o[f] = new Array(w)),
            d = (u[f] = new Array(h))
        r(c, a, y, _, d, g, e)
        for (var M = 0, $ = 0, m, S; M < w; ++M)
            if ((m = y[M])) {
                for (M >= $ && ($ = M + 1); !(S = _[$]) && ++$ < w; );
                m._next = S || null
            }
    }
    return (o = new Ot(o, n)), (o._enter = l), (o._exit = u), o
}
function Ec(t) {
    return typeof t == 'object' && 'length' in t ? t : Array.from(t)
}
function Sc() {
    return new Ot(this._exit || this._groups.map(Ho), this._parents)
}
function Mc(t, e, r) {
    var n = this.enter(),
        i = this,
        s = this.exit()
    return (
        typeof t == 'function' ? ((n = t(n)), n && (n = n.selection())) : (n = n.append(t + '')),
        e != null && ((i = e(i)), i && (i = i.selection())),
        r == null ? s.remove() : r(s),
        n && i ? n.merge(i).order() : i
    )
}
function Rc(t) {
    for (
        var e = t.selection ? t.selection() : t,
            r = this._groups,
            n = e._groups,
            i = r.length,
            s = n.length,
            o = Math.min(i, s),
            l = new Array(i),
            u = 0;
        u < o;
        ++u
    )
        for (var f = r[u], c = n[u], a = f.length, h = (l[u] = new Array(a)), g, w = 0; w < a; ++w)
            (g = f[w] || c[w]) && (h[w] = g)
    for (; u < i; ++u) l[u] = r[u]
    return new Ot(l, this._parents)
}
function $c() {
    for (var t = this._groups, e = -1, r = t.length; ++e < r; )
        for (var n = t[e], i = n.length - 1, s = n[i], o; --i >= 0; )
            (o = n[i]) &&
                (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), (s = o))
    return this
}
function Nc(t) {
    t || (t = Tc)
    function e(a, h) {
        return a && h ? t(a.__data__, h.__data__) : !a - !h
    }
    for (var r = this._groups, n = r.length, i = new Array(n), s = 0; s < n; ++s) {
        for (var o = r[s], l = o.length, u = (i[s] = new Array(l)), f, c = 0; c < l; ++c)
            (f = o[c]) && (u[c] = f)
        u.sort(e)
    }
    return new Ot(i, this._parents).order()
}
function Tc(t, e) {
    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}
function Cc() {
    var t = arguments[0]
    return (arguments[0] = this), t.apply(null, arguments), this
}
function kc() {
    return Array.from(this)
}
function Ic() {
    for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
        for (var n = t[e], i = 0, s = n.length; i < s; ++i) {
            var o = n[i]
            if (o) return o
        }
    return null
}
function Pc() {
    let t = 0
    for (const e of this) ++t
    return t
}
function jc() {
    return !this.node()
}
function Lc(t) {
    for (var e = this._groups, r = 0, n = e.length; r < n; ++r)
        for (var i = e[r], s = 0, o = i.length, l; s < o; ++s)
            (l = i[s]) && t.call(l, l.__data__, s, i)
    return this
}
function Oc(t) {
    return function () {
        this.removeAttribute(t)
    }
}
function Fc(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local)
    }
}
function zc(t, e) {
    return function () {
        this.setAttribute(t, e)
    }
}
function Ac(t, e) {
    return function () {
        this.setAttributeNS(t.space, t.local, e)
    }
}
function Vc(t, e) {
    return function () {
        var r = e.apply(this, arguments)
        r == null ? this.removeAttribute(t) : this.setAttribute(t, r)
    }
}
function Dc(t, e) {
    return function () {
        var r = e.apply(this, arguments)
        r == null
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, r)
    }
}
function Hc(t, e) {
    var r = mr(t)
    if (arguments.length < 2) {
        var n = this.node()
        return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r)
    }
    return this.each(
        (e == null
            ? r.local
                ? Fc
                : Oc
            : typeof e == 'function'
              ? r.local
                  ? Dc
                  : Vc
              : r.local
                ? Ac
                : zc)(r, e)
    )
}
function Bo(t) {
    return (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView
}
function Bc(t) {
    return function () {
        this.style.removeProperty(t)
    }
}
function qc(t, e, r) {
    return function () {
        this.style.setProperty(t, e, r)
    }
}
function Uc(t, e, r) {
    return function () {
        var n = e.apply(this, arguments)
        n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, r)
    }
}
function Kc(t, e, r) {
    return arguments.length > 1
        ? this.each((e == null ? Bc : typeof e == 'function' ? Uc : qc)(t, e, r ?? ''))
        : Ke(this.node(), t)
}
function Ke(t, e) {
    return t.style.getPropertyValue(e) || Bo(t).getComputedStyle(t, null).getPropertyValue(e)
}
function Xc(t) {
    return function () {
        delete this[t]
    }
}
function Wc(t, e) {
    return function () {
        this[t] = e
    }
}
function Yc(t, e) {
    return function () {
        var r = e.apply(this, arguments)
        r == null ? delete this[t] : (this[t] = r)
    }
}
function Gc(t, e) {
    return arguments.length > 1
        ? this.each((e == null ? Xc : typeof e == 'function' ? Yc : Wc)(t, e))
        : this.node()[t]
}
function qo(t) {
    return t.trim().split(/^|\s+/)
}
function Mi(t) {
    return t.classList || new Uo(t)
}
function Uo(t) {
    ;(this._node = t), (this._names = qo(t.getAttribute('class') || ''))
}
Uo.prototype = {
    add: function (t) {
        var e = this._names.indexOf(t)
        e < 0 && (this._names.push(t), this._node.setAttribute('class', this._names.join(' ')))
    },
    remove: function (t) {
        var e = this._names.indexOf(t)
        e >= 0 &&
            (this._names.splice(e, 1), this._node.setAttribute('class', this._names.join(' ')))
    },
    contains: function (t) {
        return this._names.indexOf(t) >= 0
    }
}
function Ko(t, e) {
    for (var r = Mi(t), n = -1, i = e.length; ++n < i; ) r.add(e[n])
}
function Xo(t, e) {
    for (var r = Mi(t), n = -1, i = e.length; ++n < i; ) r.remove(e[n])
}
function Zc(t) {
    return function () {
        Ko(this, t)
    }
}
function Qc(t) {
    return function () {
        Xo(this, t)
    }
}
function Jc(t, e) {
    return function () {
        ;(e.apply(this, arguments) ? Ko : Xo)(this, t)
    }
}
function ta(t, e) {
    var r = qo(t + '')
    if (arguments.length < 2) {
        for (var n = Mi(this.node()), i = -1, s = r.length; ++i < s; )
            if (!n.contains(r[i])) return !1
        return !0
    }
    return this.each((typeof e == 'function' ? Jc : e ? Zc : Qc)(r, e))
}
function ea() {
    this.textContent = ''
}
function na(t) {
    return function () {
        this.textContent = t
    }
}
function ra(t) {
    return function () {
        var e = t.apply(this, arguments)
        this.textContent = e ?? ''
    }
}
function ia(t) {
    return arguments.length
        ? this.each(t == null ? ea : (typeof t == 'function' ? ra : na)(t))
        : this.node().textContent
}
function sa() {
    this.innerHTML = ''
}
function oa(t) {
    return function () {
        this.innerHTML = t
    }
}
function la(t) {
    return function () {
        var e = t.apply(this, arguments)
        this.innerHTML = e ?? ''
    }
}
function ua(t) {
    return arguments.length
        ? this.each(t == null ? sa : (typeof t == 'function' ? la : oa)(t))
        : this.node().innerHTML
}
function fa() {
    this.nextSibling && this.parentNode.appendChild(this)
}
function ca() {
    return this.each(fa)
}
function aa() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
}
function ha() {
    return this.each(aa)
}
function da(t) {
    var e = typeof t == 'function' ? t : zo(t)
    return this.select(function () {
        return this.appendChild(e.apply(this, arguments))
    })
}
function pa() {
    return null
}
function ga(t, e) {
    var r = typeof t == 'function' ? t : zo(t),
        n = e == null ? pa : typeof e == 'function' ? e : Si(e)
    return this.select(function () {
        return this.insertBefore(r.apply(this, arguments), n.apply(this, arguments) || null)
    })
}
function ma() {
    var t = this.parentNode
    t && t.removeChild(this)
}
function wa() {
    return this.each(ma)
}
function ya() {
    var t = this.cloneNode(!1),
        e = this.parentNode
    return e ? e.insertBefore(t, this.nextSibling) : t
}
function _a() {
    var t = this.cloneNode(!0),
        e = this.parentNode
    return e ? e.insertBefore(t, this.nextSibling) : t
}
function va(t) {
    return this.select(t ? _a : ya)
}
function xa(t) {
    return arguments.length ? this.property('__data__', t) : this.node().__data__
}
function ba(t) {
    return function (e) {
        t.call(this, e, this.__data__)
    }
}
function Ea(t) {
    return t
        .trim()
        .split(/^|\s+/)
        .map(function (e) {
            var r = '',
                n = e.indexOf('.')
            return n >= 0 && ((r = e.slice(n + 1)), (e = e.slice(0, n))), { type: e, name: r }
        })
}
function Sa(t) {
    return function () {
        var e = this.__on
        if (e) {
            for (var r = 0, n = -1, i = e.length, s; r < i; ++r)
                (s = e[r]),
                    (!t.type || s.type === t.type) && s.name === t.name
                        ? this.removeEventListener(s.type, s.listener, s.options)
                        : (e[++n] = s)
            ++n ? (e.length = n) : delete this.__on
        }
    }
}
function Ma(t, e, r) {
    return function () {
        var n = this.__on,
            i,
            s = ba(e)
        if (n) {
            for (var o = 0, l = n.length; o < l; ++o)
                if ((i = n[o]).type === t.type && i.name === t.name) {
                    this.removeEventListener(i.type, i.listener, i.options),
                        this.addEventListener(i.type, (i.listener = s), (i.options = r)),
                        (i.value = e)
                    return
                }
        }
        this.addEventListener(t.type, s, r),
            (i = { type: t.type, name: t.name, value: e, listener: s, options: r }),
            n ? n.push(i) : (this.__on = [i])
    }
}
function Ra(t, e, r) {
    var n = Ea(t + ''),
        i,
        s = n.length,
        o
    if (arguments.length < 2) {
        var l = this.node().__on
        if (l) {
            for (var u = 0, f = l.length, c; u < f; ++u)
                for (i = 0, c = l[u]; i < s; ++i)
                    if ((o = n[i]).type === c.type && o.name === c.name) return c.value
        }
        return
    }
    for (l = e ? Ma : Sa, i = 0; i < s; ++i) this.each(l(n[i], e, r))
    return this
}
function Wo(t, e, r) {
    var n = Bo(t),
        i = n.CustomEvent
    typeof i == 'function'
        ? (i = new i(e, r))
        : ((i = n.document.createEvent('Event')),
          r
              ? (i.initEvent(e, r.bubbles, r.cancelable), (i.detail = r.detail))
              : i.initEvent(e, !1, !1)),
        t.dispatchEvent(i)
}
function $a(t, e) {
    return function () {
        return Wo(this, t, e)
    }
}
function Na(t, e) {
    return function () {
        return Wo(this, t, e.apply(this, arguments))
    }
}
function Ta(t, e) {
    return this.each((typeof e == 'function' ? Na : $a)(t, e))
}
function* Ca() {
    for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
        for (var n = t[e], i = 0, s = n.length, o; i < s; ++i) (o = n[i]) && (yield o)
}
var Yo = [null]
function Ot(t, e) {
    ;(this._groups = t), (this._parents = e)
}
function vn() {
    return new Ot([[document.documentElement]], Yo)
}
function ka() {
    return this
}
Ot.prototype = vn.prototype = {
    constructor: Ot,
    select: rc,
    selectAll: lc,
    selectChild: ac,
    selectChildren: gc,
    filter: mc,
    data: bc,
    enter: wc,
    exit: Sc,
    join: Mc,
    merge: Rc,
    selection: ka,
    order: $c,
    sort: Nc,
    call: Cc,
    nodes: kc,
    node: Ic,
    size: Pc,
    empty: jc,
    each: Lc,
    attr: Hc,
    style: Kc,
    property: Gc,
    classed: ta,
    text: ia,
    html: ua,
    raise: ca,
    lower: ha,
    append: da,
    insert: ga,
    remove: wa,
    clone: va,
    datum: xa,
    on: Ra,
    dispatch: Ta,
    [Symbol.iterator]: Ca
}
function Jt(t) {
    return typeof t == 'string'
        ? new Ot([[document.querySelector(t)]], [document.documentElement])
        : new Ot([[t]], Yo)
}
function Go(t) {
    let e
    for (; (e = t.sourceEvent); ) t = e
    return t
}
function Ft(t, e) {
    if (((t = Go(t)), e === void 0 && (e = t.currentTarget), e)) {
        var r = e.ownerSVGElement || e
        if (r.createSVGPoint) {
            var n = r.createSVGPoint()
            return (
                (n.x = t.clientX),
                (n.y = t.clientY),
                (n = n.matrixTransform(e.getScreenCTM().inverse())),
                [n.x, n.y]
            )
        }
        if (e.getBoundingClientRect) {
            var i = e.getBoundingClientRect()
            return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop]
        }
    }
    return [t.pageX, t.pageY]
}
function Ia(t, e) {
    return (
        t.target && ((t = Go(t)), e === void 0 && (e = t.currentTarget), (t = t.touches || [t])),
        Array.from(t, (r) => Ft(r, e))
    )
}
const Pa = { passive: !1 },
    dn = { capture: !0, passive: !1 }
function Tr(t) {
    t.stopImmediatePropagation()
}
function De(t) {
    t.preventDefault(), t.stopImmediatePropagation()
}
function Zo(t) {
    var e = t.document.documentElement,
        r = Jt(t).on('dragstart.drag', De, dn)
    'onselectstart' in e
        ? r.on('selectstart.drag', De, dn)
        : ((e.__noselect = e.style.MozUserSelect), (e.style.MozUserSelect = 'none'))
}
function Qo(t, e) {
    var r = t.document.documentElement,
        n = Jt(t).on('dragstart.drag', null)
    e &&
        (n.on('click.drag', De, dn),
        setTimeout(function () {
            n.on('click.drag', null)
        }, 0)),
        'onselectstart' in r
            ? n.on('selectstart.drag', null)
            : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect)
}
const Nn = (t) => () => t
function Wr(
    t,
    {
        sourceEvent: e,
        subject: r,
        target: n,
        identifier: i,
        active: s,
        x: o,
        y: l,
        dx: u,
        dy: f,
        dispatch: c
    }
) {
    Object.defineProperties(this, {
        type: { value: t, enumerable: !0, configurable: !0 },
        sourceEvent: { value: e, enumerable: !0, configurable: !0 },
        subject: { value: r, enumerable: !0, configurable: !0 },
        target: { value: n, enumerable: !0, configurable: !0 },
        identifier: { value: i, enumerable: !0, configurable: !0 },
        active: { value: s, enumerable: !0, configurable: !0 },
        x: { value: o, enumerable: !0, configurable: !0 },
        y: { value: l, enumerable: !0, configurable: !0 },
        dx: { value: u, enumerable: !0, configurable: !0 },
        dy: { value: f, enumerable: !0, configurable: !0 },
        _: { value: c }
    })
}
Wr.prototype.on = function () {
    var t = this._.on.apply(this._, arguments)
    return t === this._ ? this : t
}
function ja(t) {
    return !t.ctrlKey && !t.button
}
function La() {
    return this.parentNode
}
function Oa(t, e) {
    return e ?? { x: t.x, y: t.y }
}
function Fa() {
    return navigator.maxTouchPoints || 'ontouchstart' in this
}
function za() {
    var t = ja,
        e = La,
        r = Oa,
        n = Fa,
        i = {},
        s = _n('start', 'drag', 'end'),
        o = 0,
        l,
        u,
        f,
        c,
        a = 0
    function h(m) {
        m.on('mousedown.drag', g)
            .filter(n)
            .on('touchstart.drag', _)
            .on('touchmove.drag', d, Pa)
            .on('touchend.drag touchcancel.drag', M)
            .style('touch-action', 'none')
            .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
    }
    function g(m, S) {
        if (!(c || !t.call(this, m, S))) {
            var T = $(this, e.call(this, m, S), m, S, 'mouse')
            T &&
                (Jt(m.view).on('mousemove.drag', w, dn).on('mouseup.drag', y, dn),
                Zo(m.view),
                Tr(m),
                (f = !1),
                (l = m.clientX),
                (u = m.clientY),
                T('start', m))
        }
    }
    function w(m) {
        if ((De(m), !f)) {
            var S = m.clientX - l,
                T = m.clientY - u
            f = S * S + T * T > a
        }
        i.mouse('drag', m)
    }
    function y(m) {
        Jt(m.view).on('mousemove.drag mouseup.drag', null), Qo(m.view, f), De(m), i.mouse('end', m)
    }
    function _(m, S) {
        if (t.call(this, m, S)) {
            var T = m.changedTouches,
                z = e.call(this, m, S),
                H = T.length,
                G,
                X
            for (G = 0; G < H; ++G)
                (X = $(this, z, m, S, T[G].identifier, T[G])) && (Tr(m), X('start', m, T[G]))
        }
    }
    function d(m) {
        var S = m.changedTouches,
            T = S.length,
            z,
            H
        for (z = 0; z < T; ++z) (H = i[S[z].identifier]) && (De(m), H('drag', m, S[z]))
    }
    function M(m) {
        var S = m.changedTouches,
            T = S.length,
            z,
            H
        for (
            c && clearTimeout(c),
                c = setTimeout(function () {
                    c = null
                }, 500),
                z = 0;
            z < T;
            ++z
        )
            (H = i[S[z].identifier]) && (Tr(m), H('end', m, S[z]))
    }
    function $(m, S, T, z, H, G) {
        var X = s.copy(),
            tt = Ft(G || T, S),
            ct,
            it,
            x
        if (
            (x = r.call(
                m,
                new Wr('beforestart', {
                    sourceEvent: T,
                    target: h,
                    identifier: H,
                    active: o,
                    x: tt[0],
                    y: tt[1],
                    dx: 0,
                    dy: 0,
                    dispatch: X
                }),
                z
            )) != null
        )
            return (
                (ct = x.x - tt[0] || 0),
                (it = x.y - tt[1] || 0),
                function O(b, I, P) {
                    var U = tt,
                        K
                    switch (b) {
                        case 'start':
                            ;(i[H] = O), (K = o++)
                            break
                        case 'end':
                            delete i[H], --o
                        case 'drag':
                            ;(tt = Ft(P || I, S)), (K = o)
                            break
                    }
                    X.call(
                        b,
                        m,
                        new Wr(b, {
                            sourceEvent: I,
                            subject: x,
                            target: h,
                            identifier: H,
                            active: K,
                            x: tt[0] + ct,
                            y: tt[1] + it,
                            dx: tt[0] - U[0],
                            dy: tt[1] - U[1],
                            dispatch: X
                        }),
                        z
                    )
                }
            )
    }
    return (
        (h.filter = function (m) {
            return arguments.length ? ((t = typeof m == 'function' ? m : Nn(!!m)), h) : t
        }),
        (h.container = function (m) {
            return arguments.length ? ((e = typeof m == 'function' ? m : Nn(m)), h) : e
        }),
        (h.subject = function (m) {
            return arguments.length ? ((r = typeof m == 'function' ? m : Nn(m)), h) : r
        }),
        (h.touchable = function (m) {
            return arguments.length ? ((n = typeof m == 'function' ? m : Nn(!!m)), h) : n
        }),
        (h.on = function () {
            var m = s.on.apply(s, arguments)
            return m === s ? h : m
        }),
        (h.clickDistance = function (m) {
            return arguments.length ? ((a = (m = +m) * m), h) : Math.sqrt(a)
        }),
        h
    )
}
function Ri(t, e, r) {
    ;(t.prototype = e.prototype = r), (r.constructor = t)
}
function Jo(t, e) {
    var r = Object.create(t.prototype)
    for (var n in e) r[n] = e[n]
    return r
}
function xn() {}
var pn = 0.7,
    Zn = 1 / pn,
    He = '\\s*([+-]?\\d+)\\s*',
    gn = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
    te = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
    Aa = /^#([0-9a-f]{3,8})$/,
    Va = new RegExp(`^rgb\\(${He},${He},${He}\\)$`),
    Da = new RegExp(`^rgb\\(${te},${te},${te}\\)$`),
    Ha = new RegExp(`^rgba\\(${He},${He},${He},${gn}\\)$`),
    Ba = new RegExp(`^rgba\\(${te},${te},${te},${gn}\\)$`),
    qa = new RegExp(`^hsl\\(${gn},${te},${te}\\)$`),
    Ua = new RegExp(`^hsla\\(${gn},${te},${te},${gn}\\)$`),
    ms = {
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
    }
Ri(xn, mn, {
    copy(t) {
        return Object.assign(new this.constructor(), this, t)
    },
    displayable() {
        return this.rgb().displayable()
    },
    hex: ws,
    // Deprecated! Use color.formatHex.
    formatHex: ws,
    formatHex8: Ka,
    formatHsl: Xa,
    formatRgb: ys,
    toString: ys
})
function ws() {
    return this.rgb().formatHex()
}
function Ka() {
    return this.rgb().formatHex8()
}
function Xa() {
    return tl(this).formatHsl()
}
function ys() {
    return this.rgb().formatRgb()
}
function mn(t) {
    var e, r
    return (
        (t = (t + '').trim().toLowerCase()),
        (e = Aa.exec(t))
            ? ((r = e[1].length),
              (e = parseInt(e[1], 16)),
              r === 6
                  ? _s(e)
                  : r === 3
                    ? new Nt(
                          ((e >> 8) & 15) | ((e >> 4) & 240),
                          ((e >> 4) & 15) | (e & 240),
                          ((e & 15) << 4) | (e & 15),
                          1
                      )
                    : r === 8
                      ? Tn((e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, (e & 255) / 255)
                      : r === 4
                        ? Tn(
                              ((e >> 12) & 15) | ((e >> 8) & 240),
                              ((e >> 8) & 15) | ((e >> 4) & 240),
                              ((e >> 4) & 15) | (e & 240),
                              (((e & 15) << 4) | (e & 15)) / 255
                          )
                        : null)
            : (e = Va.exec(t))
              ? new Nt(e[1], e[2], e[3], 1)
              : (e = Da.exec(t))
                ? new Nt((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
                : (e = Ha.exec(t))
                  ? Tn(e[1], e[2], e[3], e[4])
                  : (e = Ba.exec(t))
                    ? Tn((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, e[4])
                    : (e = qa.exec(t))
                      ? bs(e[1], e[2] / 100, e[3] / 100, 1)
                      : (e = Ua.exec(t))
                        ? bs(e[1], e[2] / 100, e[3] / 100, e[4])
                        : ms.hasOwnProperty(t)
                          ? _s(ms[t])
                          : t === 'transparent'
                            ? new Nt(NaN, NaN, NaN, 0)
                            : null
    )
}
function _s(t) {
    return new Nt((t >> 16) & 255, (t >> 8) & 255, t & 255, 1)
}
function Tn(t, e, r, n) {
    return n <= 0 && (t = e = r = NaN), new Nt(t, e, r, n)
}
function Wa(t) {
    return (
        t instanceof xn || (t = mn(t)),
        t ? ((t = t.rgb()), new Nt(t.r, t.g, t.b, t.opacity)) : new Nt()
    )
}
function Yr(t, e, r, n) {
    return arguments.length === 1 ? Wa(t) : new Nt(t, e, r, n ?? 1)
}
function Nt(t, e, r, n) {
    ;(this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +n)
}
Ri(
    Nt,
    Yr,
    Jo(xn, {
        brighter(t) {
            return (
                (t = t == null ? Zn : Math.pow(Zn, t)),
                new Nt(this.r * t, this.g * t, this.b * t, this.opacity)
            )
        },
        darker(t) {
            return (
                (t = t == null ? pn : Math.pow(pn, t)),
                new Nt(this.r * t, this.g * t, this.b * t, this.opacity)
            )
        },
        rgb() {
            return this
        },
        clamp() {
            return new Nt(Te(this.r), Te(this.g), Te(this.b), Qn(this.opacity))
        },
        displayable() {
            return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
            )
        },
        hex: vs,
        // Deprecated! Use color.formatHex.
        formatHex: vs,
        formatHex8: Ya,
        formatRgb: xs,
        toString: xs
    })
)
function vs() {
    return `#${Re(this.r)}${Re(this.g)}${Re(this.b)}`
}
function Ya() {
    return `#${Re(this.r)}${Re(this.g)}${Re(this.b)}${Re((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
}
function xs() {
    const t = Qn(this.opacity)
    return `${t === 1 ? 'rgb(' : 'rgba('}${Te(this.r)}, ${Te(this.g)}, ${Te(this.b)}${t === 1 ? ')' : `, ${t})`}`
}
function Qn(t) {
    return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}
function Te(t) {
    return Math.max(0, Math.min(255, Math.round(t) || 0))
}
function Re(t) {
    return (t = Te(t)), (t < 16 ? '0' : '') + t.toString(16)
}
function bs(t, e, r, n) {
    return (
        n <= 0 ? (t = e = r = NaN) : r <= 0 || r >= 1 ? (t = e = NaN) : e <= 0 && (t = NaN),
        new qt(t, e, r, n)
    )
}
function tl(t) {
    if (t instanceof qt) return new qt(t.h, t.s, t.l, t.opacity)
    if ((t instanceof xn || (t = mn(t)), !t)) return new qt()
    if (t instanceof qt) return t
    t = t.rgb()
    var e = t.r / 255,
        r = t.g / 255,
        n = t.b / 255,
        i = Math.min(e, r, n),
        s = Math.max(e, r, n),
        o = NaN,
        l = s - i,
        u = (s + i) / 2
    return (
        l
            ? (e === s
                  ? (o = (r - n) / l + (r < n) * 6)
                  : r === s
                    ? (o = (n - e) / l + 2)
                    : (o = (e - r) / l + 4),
              (l /= u < 0.5 ? s + i : 2 - s - i),
              (o *= 60))
            : (l = u > 0 && u < 1 ? 0 : o),
        new qt(o, l, u, t.opacity)
    )
}
function Ga(t, e, r, n) {
    return arguments.length === 1 ? tl(t) : new qt(t, e, r, n ?? 1)
}
function qt(t, e, r, n) {
    ;(this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +n)
}
Ri(
    qt,
    Ga,
    Jo(xn, {
        brighter(t) {
            return (
                (t = t == null ? Zn : Math.pow(Zn, t)),
                new qt(this.h, this.s, this.l * t, this.opacity)
            )
        },
        darker(t) {
            return (
                (t = t == null ? pn : Math.pow(pn, t)),
                new qt(this.h, this.s, this.l * t, this.opacity)
            )
        },
        rgb() {
            var t = (this.h % 360) + (this.h < 0) * 360,
                e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                r = this.l,
                n = r + (r < 0.5 ? r : 1 - r) * e,
                i = 2 * r - n
            return new Nt(
                Cr(t >= 240 ? t - 240 : t + 120, i, n),
                Cr(t, i, n),
                Cr(t < 120 ? t + 240 : t - 120, i, n),
                this.opacity
            )
        },
        clamp() {
            return new qt(Es(this.h), Cn(this.s), Cn(this.l), Qn(this.opacity))
        },
        displayable() {
            return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
            )
        },
        formatHsl() {
            const t = Qn(this.opacity)
            return `${t === 1 ? 'hsl(' : 'hsla('}${Es(this.h)}, ${Cn(this.s) * 100}%, ${Cn(this.l) * 100}%${t === 1 ? ')' : `, ${t})`}`
        }
    })
)
function Es(t) {
    return (t = (t || 0) % 360), t < 0 ? t + 360 : t
}
function Cn(t) {
    return Math.max(0, Math.min(1, t || 0))
}
function Cr(t, e, r) {
    return (
        (t < 60
            ? e + ((r - e) * t) / 60
            : t < 180
              ? r
              : t < 240
                ? e + ((r - e) * (240 - t)) / 60
                : e) * 255
    )
}
const el = (t) => () => t
function Za(t, e) {
    return function (r) {
        return t + r * e
    }
}
function Qa(t, e, r) {
    return (
        (t = Math.pow(t, r)),
        (e = Math.pow(e, r) - t),
        (r = 1 / r),
        function (n) {
            return Math.pow(t + n * e, r)
        }
    )
}
function Ja(t) {
    return (t = +t) == 1
        ? nl
        : function (e, r) {
              return r - e ? Qa(e, r, t) : el(isNaN(e) ? r : e)
          }
}
function nl(t, e) {
    var r = e - t
    return r ? Za(t, r) : el(isNaN(t) ? e : t)
}
const Ss = (function t(e) {
    var r = Ja(e)
    function n(i, s) {
        var o = r((i = Yr(i)).r, (s = Yr(s)).r),
            l = r(i.g, s.g),
            u = r(i.b, s.b),
            f = nl(i.opacity, s.opacity)
        return function (c) {
            return (i.r = o(c)), (i.g = l(c)), (i.b = u(c)), (i.opacity = f(c)), i + ''
        }
    }
    return (n.gamma = t), n
})(1)
function ge(t, e) {
    return (
        (t = +t),
        (e = +e),
        function (r) {
            return t * (1 - r) + e * r
        }
    )
}
var Gr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    kr = new RegExp(Gr.source, 'g')
function th(t) {
    return function () {
        return t
    }
}
function eh(t) {
    return function (e) {
        return t(e) + ''
    }
}
function nh(t, e) {
    var r = (Gr.lastIndex = kr.lastIndex = 0),
        n,
        i,
        s,
        o = -1,
        l = [],
        u = []
    for (t = t + '', e = e + ''; (n = Gr.exec(t)) && (i = kr.exec(e)); )
        (s = i.index) > r && ((s = e.slice(r, s)), l[o] ? (l[o] += s) : (l[++o] = s)),
            (n = n[0]) === (i = i[0])
                ? l[o]
                    ? (l[o] += i)
                    : (l[++o] = i)
                : ((l[++o] = null), u.push({ i: o, x: ge(n, i) })),
            (r = kr.lastIndex)
    return (
        r < e.length && ((s = e.slice(r)), l[o] ? (l[o] += s) : (l[++o] = s)),
        l.length < 2
            ? u[0]
                ? eh(u[0].x)
                : th(e)
            : ((e = u.length),
              function (f) {
                  for (var c = 0, a; c < e; ++c) l[(a = u[c]).i] = a.x(f)
                  return l.join('')
              })
    )
}
var Ms = 180 / Math.PI,
    Zr = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
    }
function rl(t, e, r, n, i, s) {
    var o, l, u
    return (
        (o = Math.sqrt(t * t + e * e)) && ((t /= o), (e /= o)),
        (u = t * r + e * n) && ((r -= t * u), (n -= e * u)),
        (l = Math.sqrt(r * r + n * n)) && ((r /= l), (n /= l), (u /= l)),
        t * n < e * r && ((t = -t), (e = -e), (u = -u), (o = -o)),
        {
            translateX: i,
            translateY: s,
            rotate: Math.atan2(e, t) * Ms,
            skewX: Math.atan(u) * Ms,
            scaleX: o,
            scaleY: l
        }
    )
}
var kn
function rh(t) {
    const e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(t + '')
    return e.isIdentity ? Zr : rl(e.a, e.b, e.c, e.d, e.e, e.f)
}
function ih(t) {
    return t == null ||
        (kn || (kn = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
        kn.setAttribute('transform', t),
        !(t = kn.transform.baseVal.consolidate()))
        ? Zr
        : ((t = t.matrix), rl(t.a, t.b, t.c, t.d, t.e, t.f))
}
function il(t, e, r, n) {
    function i(f) {
        return f.length ? f.pop() + ' ' : ''
    }
    function s(f, c, a, h, g, w) {
        if (f !== a || c !== h) {
            var y = g.push('translate(', null, e, null, r)
            w.push({ i: y - 4, x: ge(f, a) }, { i: y - 2, x: ge(c, h) })
        } else (a || h) && g.push('translate(' + a + e + h + r)
    }
    function o(f, c, a, h) {
        f !== c
            ? (f - c > 180 ? (c += 360) : c - f > 180 && (f += 360),
              h.push({ i: a.push(i(a) + 'rotate(', null, n) - 2, x: ge(f, c) }))
            : c && a.push(i(a) + 'rotate(' + c + n)
    }
    function l(f, c, a, h) {
        f !== c
            ? h.push({ i: a.push(i(a) + 'skewX(', null, n) - 2, x: ge(f, c) })
            : c && a.push(i(a) + 'skewX(' + c + n)
    }
    function u(f, c, a, h, g, w) {
        if (f !== a || c !== h) {
            var y = g.push(i(g) + 'scale(', null, ',', null, ')')
            w.push({ i: y - 4, x: ge(f, a) }, { i: y - 2, x: ge(c, h) })
        } else (a !== 1 || h !== 1) && g.push(i(g) + 'scale(' + a + ',' + h + ')')
    }
    return function (f, c) {
        var a = [],
            h = []
        return (
            (f = t(f)),
            (c = t(c)),
            s(f.translateX, f.translateY, c.translateX, c.translateY, a, h),
            o(f.rotate, c.rotate, a, h),
            l(f.skewX, c.skewX, a, h),
            u(f.scaleX, f.scaleY, c.scaleX, c.scaleY, a, h),
            (f = c = null),
            function (g) {
                for (var w = -1, y = h.length, _; ++w < y; ) a[(_ = h[w]).i] = _.x(g)
                return a.join('')
            }
        )
    }
}
var sh = il(rh, 'px, ', 'px)', 'deg)'),
    oh = il(ih, ', ', ')', ')'),
    lh = 1e-12
function Rs(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2
}
function uh(t) {
    return ((t = Math.exp(t)) - 1 / t) / 2
}
function fh(t) {
    return ((t = Math.exp(2 * t)) - 1) / (t + 1)
}
const ch = (function t(e, r, n) {
    function i(s, o) {
        var l = s[0],
            u = s[1],
            f = s[2],
            c = o[0],
            a = o[1],
            h = o[2],
            g = c - l,
            w = a - u,
            y = g * g + w * w,
            _,
            d
        if (y < lh)
            (d = Math.log(h / f) / e),
                (_ = function (z) {
                    return [l + z * g, u + z * w, f * Math.exp(e * z * d)]
                })
        else {
            var M = Math.sqrt(y),
                $ = (h * h - f * f + n * y) / (2 * f * r * M),
                m = (h * h - f * f - n * y) / (2 * h * r * M),
                S = Math.log(Math.sqrt($ * $ + 1) - $),
                T = Math.log(Math.sqrt(m * m + 1) - m)
            ;(d = (T - S) / e),
                (_ = function (z) {
                    var H = z * d,
                        G = Rs(S),
                        X = (f / (r * M)) * (G * fh(e * H + S) - uh(S))
                    return [l + X * g, u + X * w, (f * G) / Rs(e * H + S)]
                })
        }
        return (_.duration = (d * 1e3 * e) / Math.SQRT2), _
    }
    return (
        (i.rho = function (s) {
            var o = Math.max(1e-3, +s),
                l = o * o,
                u = l * l
            return t(o, l, u)
        }),
        i
    )
})(Math.SQRT2, 2, 4)
var Xe = 0,
    tn = 0,
    Ze = 0,
    sl = 1e3,
    Jn,
    en,
    tr = 0,
    Ce = 0,
    wr = 0,
    wn = typeof performance == 'object' && performance.now ? performance : Date,
    ol =
        typeof window == 'object' && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                  setTimeout(t, 17)
              }
function $i() {
    return Ce || (ol(ah), (Ce = wn.now() + wr))
}
function ah() {
    Ce = 0
}
function er() {
    this._call = this._time = this._next = null
}
er.prototype = Ni.prototype = {
    constructor: er,
    restart: function (t, e, r) {
        if (typeof t != 'function') throw new TypeError('callback is not a function')
        ;(r = (r == null ? $i() : +r) + (e == null ? 0 : +e)),
            !this._next && en !== this && (en ? (en._next = this) : (Jn = this), (en = this)),
            (this._call = t),
            (this._time = r),
            Qr()
    },
    stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Qr())
    }
}
function Ni(t, e, r) {
    var n = new er()
    return n.restart(t, e, r), n
}
function hh() {
    $i(), ++Xe
    for (var t = Jn, e; t; ) (e = Ce - t._time) >= 0 && t._call.call(void 0, e), (t = t._next)
    --Xe
}
function $s() {
    ;(Ce = (tr = wn.now()) + wr), (Xe = tn = 0)
    try {
        hh()
    } finally {
        ;(Xe = 0), ph(), (Ce = 0)
    }
}
function dh() {
    var t = wn.now(),
        e = t - tr
    e > sl && ((wr -= e), (tr = t))
}
function ph() {
    for (var t, e = Jn, r, n = 1 / 0; e; )
        e._call
            ? (n > e._time && (n = e._time), (t = e), (e = e._next))
            : ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (Jn = r)))
    ;(en = t), Qr(n)
}
function Qr(t) {
    if (!Xe) {
        tn && (tn = clearTimeout(tn))
        var e = t - Ce
        e > 24
            ? (t < 1 / 0 && (tn = setTimeout($s, t - wn.now() - wr)),
              Ze && (Ze = clearInterval(Ze)))
            : (Ze || ((tr = wn.now()), (Ze = setInterval(dh, sl))), (Xe = 1), ol($s))
    }
}
function Ns(t, e, r) {
    var n = new er()
    return (
        (e = e == null ? 0 : +e),
        n.restart(
            (i) => {
                n.stop(), t(i + e)
            },
            e,
            r
        ),
        n
    )
}
var gh = _n('start', 'end', 'cancel', 'interrupt'),
    mh = [],
    ll = 0,
    Ts = 1,
    Jr = 2,
    Dn = 3,
    Cs = 4,
    ti = 5,
    Hn = 6
function yr(t, e, r, n, i, s) {
    var o = t.__transition
    if (!o) t.__transition = {}
    else if (r in o) return
    wh(t, r, {
        name: e,
        index: n,
        // For context during callback.
        group: i,
        // For context during callback.
        on: gh,
        tween: mh,
        time: s.time,
        delay: s.delay,
        duration: s.duration,
        ease: s.ease,
        timer: null,
        state: ll
    })
}
function Ti(t, e) {
    var r = Xt(t, e)
    if (r.state > ll) throw new Error('too late; already scheduled')
    return r
}
function ee(t, e) {
    var r = Xt(t, e)
    if (r.state > Dn) throw new Error('too late; already running')
    return r
}
function Xt(t, e) {
    var r = t.__transition
    if (!r || !(r = r[e])) throw new Error('transition not found')
    return r
}
function wh(t, e, r) {
    var n = t.__transition,
        i
    ;(n[e] = r), (r.timer = Ni(s, 0, r.time))
    function s(f) {
        ;(r.state = Ts), r.timer.restart(o, r.delay, r.time), r.delay <= f && o(f - r.delay)
    }
    function o(f) {
        var c, a, h, g
        if (r.state !== Ts) return u()
        for (c in n)
            if (((g = n[c]), g.name === r.name)) {
                if (g.state === Dn) return Ns(o)
                g.state === Cs
                    ? ((g.state = Hn),
                      g.timer.stop(),
                      g.on.call('interrupt', t, t.__data__, g.index, g.group),
                      delete n[c])
                    : +c < e &&
                      ((g.state = Hn),
                      g.timer.stop(),
                      g.on.call('cancel', t, t.__data__, g.index, g.group),
                      delete n[c])
            }
        if (
            (Ns(function () {
                r.state === Dn && ((r.state = Cs), r.timer.restart(l, r.delay, r.time), l(f))
            }),
            (r.state = Jr),
            r.on.call('start', t, t.__data__, r.index, r.group),
            r.state === Jr)
        ) {
            for (r.state = Dn, i = new Array((h = r.tween.length)), c = 0, a = -1; c < h; ++c)
                (g = r.tween[c].value.call(t, t.__data__, r.index, r.group)) && (i[++a] = g)
            i.length = a + 1
        }
    }
    function l(f) {
        for (
            var c =
                    f < r.duration
                        ? r.ease.call(null, f / r.duration)
                        : (r.timer.restart(u), (r.state = ti), 1),
                a = -1,
                h = i.length;
            ++a < h;

        )
            i[a].call(t, c)
        r.state === ti && (r.on.call('end', t, t.__data__, r.index, r.group), u())
    }
    function u() {
        ;(r.state = Hn), r.timer.stop(), delete n[e]
        for (var f in n) return
        delete t.__transition
    }
}
function Bn(t, e) {
    var r = t.__transition,
        n,
        i,
        s = !0,
        o
    if (r) {
        e = e == null ? null : e + ''
        for (o in r) {
            if ((n = r[o]).name !== e) {
                s = !1
                continue
            }
            ;(i = n.state > Jr && n.state < ti),
                (n.state = Hn),
                n.timer.stop(),
                n.on.call(i ? 'interrupt' : 'cancel', t, t.__data__, n.index, n.group),
                delete r[o]
        }
        s && delete t.__transition
    }
}
function yh(t) {
    return this.each(function () {
        Bn(this, t)
    })
}
function _h(t, e) {
    var r, n
    return function () {
        var i = ee(this, t),
            s = i.tween
        if (s !== r) {
            n = r = s
            for (var o = 0, l = n.length; o < l; ++o)
                if (n[o].name === e) {
                    ;(n = n.slice()), n.splice(o, 1)
                    break
                }
        }
        i.tween = n
    }
}
function vh(t, e, r) {
    var n, i
    if (typeof r != 'function') throw new Error()
    return function () {
        var s = ee(this, t),
            o = s.tween
        if (o !== n) {
            i = (n = o).slice()
            for (var l = { name: e, value: r }, u = 0, f = i.length; u < f; ++u)
                if (i[u].name === e) {
                    i[u] = l
                    break
                }
            u === f && i.push(l)
        }
        s.tween = i
    }
}
function xh(t, e) {
    var r = this._id
    if (((t += ''), arguments.length < 2)) {
        for (var n = Xt(this.node(), r).tween, i = 0, s = n.length, o; i < s; ++i)
            if ((o = n[i]).name === t) return o.value
        return null
    }
    return this.each((e == null ? _h : vh)(r, t, e))
}
function Ci(t, e, r) {
    var n = t._id
    return (
        t.each(function () {
            var i = ee(this, n)
            ;(i.value || (i.value = {}))[e] = r.apply(this, arguments)
        }),
        function (i) {
            return Xt(i, n).value[e]
        }
    )
}
function ul(t, e) {
    var r
    return (typeof e == 'number' ? ge : e instanceof mn ? Ss : (r = mn(e)) ? ((e = r), Ss) : nh)(
        t,
        e
    )
}
function bh(t) {
    return function () {
        this.removeAttribute(t)
    }
}
function Eh(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local)
    }
}
function Sh(t, e, r) {
    var n,
        i = r + '',
        s
    return function () {
        var o = this.getAttribute(t)
        return o === i ? null : o === n ? s : (s = e((n = o), r))
    }
}
function Mh(t, e, r) {
    var n,
        i = r + '',
        s
    return function () {
        var o = this.getAttributeNS(t.space, t.local)
        return o === i ? null : o === n ? s : (s = e((n = o), r))
    }
}
function Rh(t, e, r) {
    var n, i, s
    return function () {
        var o,
            l = r(this),
            u
        return l == null
            ? void this.removeAttribute(t)
            : ((o = this.getAttribute(t)),
              (u = l + ''),
              o === u ? null : o === n && u === i ? s : ((i = u), (s = e((n = o), l))))
    }
}
function $h(t, e, r) {
    var n, i, s
    return function () {
        var o,
            l = r(this),
            u
        return l == null
            ? void this.removeAttributeNS(t.space, t.local)
            : ((o = this.getAttributeNS(t.space, t.local)),
              (u = l + ''),
              o === u ? null : o === n && u === i ? s : ((i = u), (s = e((n = o), l))))
    }
}
function Nh(t, e) {
    var r = mr(t),
        n = r === 'transform' ? oh : ul
    return this.attrTween(
        t,
        typeof e == 'function'
            ? (r.local ? $h : Rh)(r, n, Ci(this, 'attr.' + t, e))
            : e == null
              ? (r.local ? Eh : bh)(r)
              : (r.local ? Mh : Sh)(r, n, e)
    )
}
function Th(t, e) {
    return function (r) {
        this.setAttribute(t, e.call(this, r))
    }
}
function Ch(t, e) {
    return function (r) {
        this.setAttributeNS(t.space, t.local, e.call(this, r))
    }
}
function kh(t, e) {
    var r, n
    function i() {
        var s = e.apply(this, arguments)
        return s !== n && (r = (n = s) && Ch(t, s)), r
    }
    return (i._value = e), i
}
function Ih(t, e) {
    var r, n
    function i() {
        var s = e.apply(this, arguments)
        return s !== n && (r = (n = s) && Th(t, s)), r
    }
    return (i._value = e), i
}
function Ph(t, e) {
    var r = 'attr.' + t
    if (arguments.length < 2) return (r = this.tween(r)) && r._value
    if (e == null) return this.tween(r, null)
    if (typeof e != 'function') throw new Error()
    var n = mr(t)
    return this.tween(r, (n.local ? kh : Ih)(n, e))
}
function jh(t, e) {
    return function () {
        Ti(this, t).delay = +e.apply(this, arguments)
    }
}
function Lh(t, e) {
    return (
        (e = +e),
        function () {
            Ti(this, t).delay = e
        }
    )
}
function Oh(t) {
    var e = this._id
    return arguments.length
        ? this.each((typeof t == 'function' ? jh : Lh)(e, t))
        : Xt(this.node(), e).delay
}
function Fh(t, e) {
    return function () {
        ee(this, t).duration = +e.apply(this, arguments)
    }
}
function zh(t, e) {
    return (
        (e = +e),
        function () {
            ee(this, t).duration = e
        }
    )
}
function Ah(t) {
    var e = this._id
    return arguments.length
        ? this.each((typeof t == 'function' ? Fh : zh)(e, t))
        : Xt(this.node(), e).duration
}
function Vh(t, e) {
    if (typeof e != 'function') throw new Error()
    return function () {
        ee(this, t).ease = e
    }
}
function Dh(t) {
    var e = this._id
    return arguments.length ? this.each(Vh(e, t)) : Xt(this.node(), e).ease
}
function Hh(t, e) {
    return function () {
        var r = e.apply(this, arguments)
        if (typeof r != 'function') throw new Error()
        ee(this, t).ease = r
    }
}
function Bh(t) {
    if (typeof t != 'function') throw new Error()
    return this.each(Hh(this._id, t))
}
function qh(t) {
    typeof t != 'function' && (t = Vo(t))
    for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
        for (var s = e[i], o = s.length, l = (n[i] = []), u, f = 0; f < o; ++f)
            (u = s[f]) && t.call(u, u.__data__, f, s) && l.push(u)
    return new le(n, this._parents, this._name, this._id)
}
function Uh(t) {
    if (t._id !== this._id) throw new Error()
    for (
        var e = this._groups,
            r = t._groups,
            n = e.length,
            i = r.length,
            s = Math.min(n, i),
            o = new Array(n),
            l = 0;
        l < s;
        ++l
    )
        for (var u = e[l], f = r[l], c = u.length, a = (o[l] = new Array(c)), h, g = 0; g < c; ++g)
            (h = u[g] || f[g]) && (a[g] = h)
    for (; l < n; ++l) o[l] = e[l]
    return new le(o, this._parents, this._name, this._id)
}
function Kh(t) {
    return (t + '')
        .trim()
        .split(/^|\s+/)
        .every(function (e) {
            var r = e.indexOf('.')
            return r >= 0 && (e = e.slice(0, r)), !e || e === 'start'
        })
}
function Xh(t, e, r) {
    var n,
        i,
        s = Kh(e) ? Ti : ee
    return function () {
        var o = s(this, t),
            l = o.on
        l !== n && (i = (n = l).copy()).on(e, r), (o.on = i)
    }
}
function Wh(t, e) {
    var r = this._id
    return arguments.length < 2 ? Xt(this.node(), r).on.on(t) : this.each(Xh(r, t, e))
}
function Yh(t) {
    return function () {
        var e = this.parentNode
        for (var r in this.__transition) if (+r !== t) return
        e && e.removeChild(this)
    }
}
function Gh() {
    return this.on('end.remove', Yh(this._id))
}
function Zh(t) {
    var e = this._name,
        r = this._id
    typeof t != 'function' && (t = Si(t))
    for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o)
        for (var l = n[o], u = l.length, f = (s[o] = new Array(u)), c, a, h = 0; h < u; ++h)
            (c = l[h]) &&
                (a = t.call(c, c.__data__, h, l)) &&
                ('__data__' in c && (a.__data__ = c.__data__),
                (f[h] = a),
                yr(f[h], e, r, h, f, Xt(c, r)))
    return new le(s, this._parents, e, r)
}
function Qh(t) {
    var e = this._name,
        r = this._id
    typeof t != 'function' && (t = Ao(t))
    for (var n = this._groups, i = n.length, s = [], o = [], l = 0; l < i; ++l)
        for (var u = n[l], f = u.length, c, a = 0; a < f; ++a)
            if ((c = u[a])) {
                for (
                    var h = t.call(c, c.__data__, a, u), g, w = Xt(c, r), y = 0, _ = h.length;
                    y < _;
                    ++y
                )
                    (g = h[y]) && yr(g, e, r, y, h, w)
                s.push(h), o.push(c)
            }
    return new le(s, o, e, r)
}
var Jh = vn.prototype.constructor
function td() {
    return new Jh(this._groups, this._parents)
}
function ed(t, e) {
    var r, n, i
    return function () {
        var s = Ke(this, t),
            o = (this.style.removeProperty(t), Ke(this, t))
        return s === o ? null : s === r && o === n ? i : (i = e((r = s), (n = o)))
    }
}
function fl(t) {
    return function () {
        this.style.removeProperty(t)
    }
}
function nd(t, e, r) {
    var n,
        i = r + '',
        s
    return function () {
        var o = Ke(this, t)
        return o === i ? null : o === n ? s : (s = e((n = o), r))
    }
}
function rd(t, e, r) {
    var n, i, s
    return function () {
        var o = Ke(this, t),
            l = r(this),
            u = l + ''
        return (
            l == null && (u = l = (this.style.removeProperty(t), Ke(this, t))),
            o === u ? null : o === n && u === i ? s : ((i = u), (s = e((n = o), l)))
        )
    }
}
function id(t, e) {
    var r,
        n,
        i,
        s = 'style.' + e,
        o = 'end.' + s,
        l
    return function () {
        var u = ee(this, t),
            f = u.on,
            c = u.value[s] == null ? l || (l = fl(e)) : void 0
        ;(f !== r || i !== c) && (n = (r = f).copy()).on(o, (i = c)), (u.on = n)
    }
}
function sd(t, e, r) {
    var n = (t += '') == 'transform' ? sh : ul
    return e == null
        ? this.styleTween(t, ed(t, n)).on('end.style.' + t, fl(t))
        : typeof e == 'function'
          ? this.styleTween(t, rd(t, n, Ci(this, 'style.' + t, e))).each(id(this._id, t))
          : this.styleTween(t, nd(t, n, e), r).on('end.style.' + t, null)
}
function od(t, e, r) {
    return function (n) {
        this.style.setProperty(t, e.call(this, n), r)
    }
}
function ld(t, e, r) {
    var n, i
    function s() {
        var o = e.apply(this, arguments)
        return o !== i && (n = (i = o) && od(t, o, r)), n
    }
    return (s._value = e), s
}
function ud(t, e, r) {
    var n = 'style.' + (t += '')
    if (arguments.length < 2) return (n = this.tween(n)) && n._value
    if (e == null) return this.tween(n, null)
    if (typeof e != 'function') throw new Error()
    return this.tween(n, ld(t, e, r ?? ''))
}
function fd(t) {
    return function () {
        this.textContent = t
    }
}
function cd(t) {
    return function () {
        var e = t(this)
        this.textContent = e ?? ''
    }
}
function ad(t) {
    return this.tween(
        'text',
        typeof t == 'function' ? cd(Ci(this, 'text', t)) : fd(t == null ? '' : t + '')
    )
}
function hd(t) {
    return function (e) {
        this.textContent = t.call(this, e)
    }
}
function dd(t) {
    var e, r
    function n() {
        var i = t.apply(this, arguments)
        return i !== r && (e = (r = i) && hd(i)), e
    }
    return (n._value = t), n
}
function pd(t) {
    var e = 'text'
    if (arguments.length < 1) return (e = this.tween(e)) && e._value
    if (t == null) return this.tween(e, null)
    if (typeof t != 'function') throw new Error()
    return this.tween(e, dd(t))
}
function gd() {
    for (
        var t = this._name, e = this._id, r = cl(), n = this._groups, i = n.length, s = 0;
        s < i;
        ++s
    )
        for (var o = n[s], l = o.length, u, f = 0; f < l; ++f)
            if ((u = o[f])) {
                var c = Xt(u, e)
                yr(u, t, r, f, o, {
                    time: c.time + c.delay + c.duration,
                    delay: 0,
                    duration: c.duration,
                    ease: c.ease
                })
            }
    return new le(n, this._parents, t, r)
}
function md() {
    var t,
        e,
        r = this,
        n = r._id,
        i = r.size()
    return new Promise(function (s, o) {
        var l = { value: o },
            u = {
                value: function () {
                    --i === 0 && s()
                }
            }
        r.each(function () {
            var f = ee(this, n),
                c = f.on
            c !== t &&
                ((e = (t = c).copy()), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)),
                (f.on = e)
        }),
            i === 0 && s()
    })
}
var wd = 0
function le(t, e, r, n) {
    ;(this._groups = t), (this._parents = e), (this._name = r), (this._id = n)
}
function cl() {
    return ++wd
}
var ne = vn.prototype
le.prototype = {
    constructor: le,
    select: Zh,
    selectAll: Qh,
    selectChild: ne.selectChild,
    selectChildren: ne.selectChildren,
    filter: qh,
    merge: Uh,
    selection: td,
    transition: gd,
    call: ne.call,
    nodes: ne.nodes,
    node: ne.node,
    size: ne.size,
    empty: ne.empty,
    each: ne.each,
    on: Wh,
    attr: Nh,
    attrTween: Ph,
    style: sd,
    styleTween: ud,
    text: ad,
    textTween: pd,
    remove: Gh,
    tween: xh,
    delay: Oh,
    duration: Ah,
    ease: Dh,
    easeVarying: Bh,
    end: md,
    [Symbol.iterator]: ne[Symbol.iterator]
}
function yd(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}
var _d = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: yd
}
function vd(t, e) {
    for (var r; !(r = t.__transition) || !(r = r[e]); )
        if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`)
    return r
}
function xd(t) {
    var e, r
    t instanceof le
        ? ((e = t._id), (t = t._name))
        : ((e = cl()), ((r = _d).time = $i()), (t = t == null ? null : t + ''))
    for (var n = this._groups, i = n.length, s = 0; s < i; ++s)
        for (var o = n[s], l = o.length, u, f = 0; f < l; ++f)
            (u = o[f]) && yr(u, t, e, f, o, r || vd(u, e))
    return new le(n, this._parents, t, e)
}
vn.prototype.interrupt = yh
vn.prototype.transition = xd
const ei = Math.PI,
    ni = 2 * ei,
    be = 1e-6,
    bd = ni - be
function al(t) {
    this._ += t[0]
    for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
}
function Ed(t) {
    let e = Math.floor(t)
    if (!(e >= 0)) throw new Error(`invalid digits: ${t}`)
    if (e > 15) return al
    const r = 10 ** e
    return function (n) {
        this._ += n[0]
        for (let i = 1, s = n.length; i < s; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
    }
}
class Sd {
    constructor(e) {
        ;(this._x0 =
            this._y0 = // start of current subpath
            this._x1 =
            this._y1 =
                null),
            (this._ = ''),
            (this._append = e == null ? al : Ed(e))
    }
    moveTo(e, r) {
        this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +r)}`
    }
    closePath() {
        this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`)
    }
    lineTo(e, r) {
        this._append`L${(this._x1 = +e)},${(this._y1 = +r)}`
    }
    quadraticCurveTo(e, r, n, i) {
        this._append`Q${+e},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`
    }
    bezierCurveTo(e, r, n, i, s, o) {
        this._append`C${+e},${+r},${+n},${+i},${(this._x1 = +s)},${(this._y1 = +o)}`
    }
    arcTo(e, r, n, i, s) {
        if (((e = +e), (r = +r), (n = +n), (i = +i), (s = +s), s < 0))
            throw new Error(`negative radius: ${s}`)
        let o = this._x1,
            l = this._y1,
            u = n - e,
            f = i - r,
            c = o - e,
            a = l - r,
            h = c * c + a * a
        if (this._x1 === null) this._append`M${(this._x1 = e)},${(this._y1 = r)}`
        else if (h > be)
            if (!(Math.abs(a * u - f * c) > be) || !s)
                this._append`L${(this._x1 = e)},${(this._y1 = r)}`
            else {
                let g = n - o,
                    w = i - l,
                    y = u * u + f * f,
                    _ = g * g + w * w,
                    d = Math.sqrt(y),
                    M = Math.sqrt(h),
                    $ = s * Math.tan((ei - Math.acos((y + h - _) / (2 * d * M))) / 2),
                    m = $ / M,
                    S = $ / d
                Math.abs(m - 1) > be && this._append`L${e + m * c},${r + m * a}`,
                    this
                        ._append`A${s},${s},0,0,${+(a * g > c * w)},${(this._x1 = e + S * u)},${(this._y1 = r + S * f)}`
            }
    }
    arc(e, r, n, i, s, o) {
        if (((e = +e), (r = +r), (n = +n), (o = !!o), n < 0))
            throw new Error(`negative radius: ${n}`)
        let l = n * Math.cos(i),
            u = n * Math.sin(i),
            f = e + l,
            c = r + u,
            a = 1 ^ o,
            h = o ? i - s : s - i
        this._x1 === null
            ? this._append`M${f},${c}`
            : (Math.abs(this._x1 - f) > be || Math.abs(this._y1 - c) > be) &&
              this._append`L${f},${c}`,
            n &&
                (h < 0 && (h = (h % ni) + ni),
                h > bd
                    ? this
                          ._append`A${n},${n},0,1,${a},${e - l},${r - u}A${n},${n},0,1,${a},${(this._x1 = f)},${(this._y1 = c)}`
                    : h > be &&
                      this
                          ._append`A${n},${n},0,${+(h >= ei)},${a},${(this._x1 = e + n * Math.cos(s))},${(this._y1 = r + n * Math.sin(s))}`)
    }
    rect(e, r, n, i) {
        this
            ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`
    }
    toString() {
        return this._
    }
}
function Md(t) {
    const e = +this._x.call(null, t),
        r = +this._y.call(null, t)
    return hl(this.cover(e, r), e, r, t)
}
function hl(t, e, r, n) {
    if (isNaN(e) || isNaN(r)) return t
    var i,
        s = t._root,
        o = { data: n },
        l = t._x0,
        u = t._y0,
        f = t._x1,
        c = t._y1,
        a,
        h,
        g,
        w,
        y,
        _,
        d,
        M
    if (!s) return (t._root = o), t
    for (; s.length; )
        if (
            ((y = e >= (a = (l + f) / 2)) ? (l = a) : (f = a),
            (_ = r >= (h = (u + c) / 2)) ? (u = h) : (c = h),
            (i = s),
            !(s = s[(d = (_ << 1) | y)]))
        )
            return (i[d] = o), t
    if (((g = +t._x.call(null, s.data)), (w = +t._y.call(null, s.data)), e === g && r === w))
        return (o.next = s), i ? (i[d] = o) : (t._root = o), t
    do
        (i = i ? (i[d] = new Array(4)) : (t._root = new Array(4))),
            (y = e >= (a = (l + f) / 2)) ? (l = a) : (f = a),
            (_ = r >= (h = (u + c) / 2)) ? (u = h) : (c = h)
    while ((d = (_ << 1) | y) === (M = ((w >= h) << 1) | (g >= a)))
    return (i[M] = s), (i[d] = o), t
}
function Rd(t) {
    var e,
        r,
        n = t.length,
        i,
        s,
        o = new Array(n),
        l = new Array(n),
        u = 1 / 0,
        f = 1 / 0,
        c = -1 / 0,
        a = -1 / 0
    for (r = 0; r < n; ++r)
        isNaN((i = +this._x.call(null, (e = t[r])))) ||
            isNaN((s = +this._y.call(null, e))) ||
            ((o[r] = i),
            (l[r] = s),
            i < u && (u = i),
            i > c && (c = i),
            s < f && (f = s),
            s > a && (a = s))
    if (u > c || f > a) return this
    for (this.cover(u, f).cover(c, a), r = 0; r < n; ++r) hl(this, o[r], l[r], t[r])
    return this
}
function $d(t, e) {
    if (isNaN((t = +t)) || isNaN((e = +e))) return this
    var r = this._x0,
        n = this._y0,
        i = this._x1,
        s = this._y1
    if (isNaN(r)) (i = (r = Math.floor(t)) + 1), (s = (n = Math.floor(e)) + 1)
    else {
        for (var o = i - r || 1, l = this._root, u, f; r > t || t >= i || n > e || e >= s; )
            switch (
                ((f = ((e < n) << 1) | (t < r)),
                (u = new Array(4)),
                (u[f] = l),
                (l = u),
                (o *= 2),
                f)
            ) {
                case 0:
                    ;(i = r + o), (s = n + o)
                    break
                case 1:
                    ;(r = i - o), (s = n + o)
                    break
                case 2:
                    ;(i = r + o), (n = s - o)
                    break
                case 3:
                    ;(r = i - o), (n = s - o)
                    break
            }
        this._root && this._root.length && (this._root = l)
    }
    return (this._x0 = r), (this._y0 = n), (this._x1 = i), (this._y1 = s), this
}
function Nd() {
    var t = []
    return (
        this.visit(function (e) {
            if (!e.length)
                do t.push(e.data)
                while ((e = e.next))
        }),
        t
    )
}
function Td(t) {
    return arguments.length
        ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
        : isNaN(this._x0)
          ? void 0
          : [
                [this._x0, this._y0],
                [this._x1, this._y1]
            ]
}
function St(t, e, r, n, i) {
    ;(this.node = t), (this.x0 = e), (this.y0 = r), (this.x1 = n), (this.y1 = i)
}
function Cd(t, e, r) {
    var n,
        i = this._x0,
        s = this._y0,
        o,
        l,
        u,
        f,
        c = this._x1,
        a = this._y1,
        h = [],
        g = this._root,
        w,
        y
    for (
        g && h.push(new St(g, i, s, c, a)),
            r == null
                ? (r = 1 / 0)
                : ((i = t - r), (s = e - r), (c = t + r), (a = e + r), (r *= r));
        (w = h.pop());

    )
        if (
            !(!(g = w.node) || (o = w.x0) > c || (l = w.y0) > a || (u = w.x1) < i || (f = w.y1) < s)
        )
            if (g.length) {
                var _ = (o + u) / 2,
                    d = (l + f) / 2
                h.push(
                    new St(g[3], _, d, u, f),
                    new St(g[2], o, d, _, f),
                    new St(g[1], _, l, u, d),
                    new St(g[0], o, l, _, d)
                ),
                    (y = ((e >= d) << 1) | (t >= _)) &&
                        ((w = h[h.length - 1]),
                        (h[h.length - 1] = h[h.length - 1 - y]),
                        (h[h.length - 1 - y] = w))
            } else {
                var M = t - +this._x.call(null, g.data),
                    $ = e - +this._y.call(null, g.data),
                    m = M * M + $ * $
                if (m < r) {
                    var S = Math.sqrt((r = m))
                    ;(i = t - S), (s = e - S), (c = t + S), (a = e + S), (n = g.data)
                }
            }
    return n
}
function kd(t) {
    if (isNaN((c = +this._x.call(null, t))) || isNaN((a = +this._y.call(null, t)))) return this
    var e,
        r = this._root,
        n,
        i,
        s,
        o = this._x0,
        l = this._y0,
        u = this._x1,
        f = this._y1,
        c,
        a,
        h,
        g,
        w,
        y,
        _,
        d
    if (!r) return this
    if (r.length)
        for (;;) {
            if (
                ((w = c >= (h = (o + u) / 2)) ? (o = h) : (u = h),
                (y = a >= (g = (l + f) / 2)) ? (l = g) : (f = g),
                (e = r),
                !(r = r[(_ = (y << 1) | w)]))
            )
                return this
            if (!r.length) break
            ;(e[(_ + 1) & 3] || e[(_ + 2) & 3] || e[(_ + 3) & 3]) && ((n = e), (d = _))
        }
    for (; r.data !== t; ) if (((i = r), !(r = r.next))) return this
    return (
        (s = r.next) && delete r.next,
        i
            ? (s ? (i.next = s) : delete i.next, this)
            : e
              ? (s ? (e[_] = s) : delete e[_],
                (r = e[0] || e[1] || e[2] || e[3]) &&
                    r === (e[3] || e[2] || e[1] || e[0]) &&
                    !r.length &&
                    (n ? (n[d] = r) : (this._root = r)),
                this)
              : ((this._root = s), this)
    )
}
function Id(t) {
    for (var e = 0, r = t.length; e < r; ++e) this.remove(t[e])
    return this
}
function Pd() {
    return this._root
}
function jd() {
    var t = 0
    return (
        this.visit(function (e) {
            if (!e.length)
                do ++t
                while ((e = e.next))
        }),
        t
    )
}
function Ld(t) {
    var e = [],
        r,
        n = this._root,
        i,
        s,
        o,
        l,
        u
    for (n && e.push(new St(n, this._x0, this._y0, this._x1, this._y1)); (r = e.pop()); )
        if (!t((n = r.node), (s = r.x0), (o = r.y0), (l = r.x1), (u = r.y1)) && n.length) {
            var f = (s + l) / 2,
                c = (o + u) / 2
            ;(i = n[3]) && e.push(new St(i, f, c, l, u)),
                (i = n[2]) && e.push(new St(i, s, c, f, u)),
                (i = n[1]) && e.push(new St(i, f, o, l, c)),
                (i = n[0]) && e.push(new St(i, s, o, f, c))
        }
    return this
}
function Od(t) {
    var e = [],
        r = [],
        n
    for (
        this._root && e.push(new St(this._root, this._x0, this._y0, this._x1, this._y1));
        (n = e.pop());

    ) {
        var i = n.node
        if (i.length) {
            var s,
                o = n.x0,
                l = n.y0,
                u = n.x1,
                f = n.y1,
                c = (o + u) / 2,
                a = (l + f) / 2
            ;(s = i[0]) && e.push(new St(s, o, l, c, a)),
                (s = i[1]) && e.push(new St(s, c, l, u, a)),
                (s = i[2]) && e.push(new St(s, o, a, c, f)),
                (s = i[3]) && e.push(new St(s, c, a, u, f))
        }
        r.push(n)
    }
    for (; (n = r.pop()); ) t(n.node, n.x0, n.y0, n.x1, n.y1)
    return this
}
function Fd(t) {
    return t[0]
}
function zd(t) {
    return arguments.length ? ((this._x = t), this) : this._x
}
function Ad(t) {
    return t[1]
}
function Vd(t) {
    return arguments.length ? ((this._y = t), this) : this._y
}
function ki(t, e, r) {
    var n = new Ii(e ?? Fd, r ?? Ad, NaN, NaN, NaN, NaN)
    return t == null ? n : n.addAll(t)
}
function Ii(t, e, r, n, i, s) {
    ;(this._x = t),
        (this._y = e),
        (this._x0 = r),
        (this._y0 = n),
        (this._x1 = i),
        (this._y1 = s),
        (this._root = void 0)
}
function ks(t) {
    for (var e = { data: t.data }, r = e; (t = t.next); ) r = r.next = { data: t.data }
    return e
}
var Rt = (ki.prototype = Ii.prototype)
Rt.copy = function () {
    var t = new Ii(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        e = this._root,
        r,
        n
    if (!e) return t
    if (!e.length) return (t._root = ks(e)), t
    for (r = [{ source: e, target: (t._root = new Array(4)) }]; (e = r.pop()); )
        for (var i = 0; i < 4; ++i)
            (n = e.source[i]) &&
                (n.length
                    ? r.push({ source: n, target: (e.target[i] = new Array(4)) })
                    : (e.target[i] = ks(n)))
    return t
}
Rt.add = Md
Rt.addAll = Rd
Rt.cover = $d
Rt.data = Nd
Rt.extent = Td
Rt.find = Cd
Rt.remove = kd
Rt.removeAll = Id
Rt.root = Pd
Rt.size = jd
Rt.visit = Ld
Rt.visitAfter = Od
Rt.x = zd
Rt.y = Vd
function Mt(t) {
    return function () {
        return t
    }
}
function me(t) {
    return (t() - 0.5) * 1e-6
}
function Dd(t) {
    return t.x + t.vx
}
function Hd(t) {
    return t.y + t.vy
}
function Bd(t) {
    var e,
        r,
        n,
        i = 1,
        s = 1
    typeof t != 'function' && (t = Mt(t == null ? 1 : +t))
    function o() {
        for (var f, c = e.length, a, h, g, w, y, _, d = 0; d < s; ++d)
            for (a = ki(e, Dd, Hd).visitAfter(l), f = 0; f < c; ++f)
                (h = e[f]),
                    (y = r[h.index]),
                    (_ = y * y),
                    (g = h.x + h.vx),
                    (w = h.y + h.vy),
                    a.visit(M)
        function M($, m, S, T, z) {
            var H = $.data,
                G = $.r,
                X = y + G
            if (H) {
                if (H.index > h.index) {
                    var tt = g - H.x - H.vx,
                        ct = w - H.y - H.vy,
                        it = tt * tt + ct * ct
                    it < X * X &&
                        (tt === 0 && ((tt = me(n)), (it += tt * tt)),
                        ct === 0 && ((ct = me(n)), (it += ct * ct)),
                        (it = ((X - (it = Math.sqrt(it))) / it) * i),
                        (h.vx += (tt *= it) * (X = (G *= G) / (_ + G))),
                        (h.vy += (ct *= it) * X),
                        (H.vx -= tt * (X = 1 - X)),
                        (H.vy -= ct * X))
                }
                return
            }
            return m > g + X || T < g - X || S > w + X || z < w - X
        }
    }
    function l(f) {
        if (f.data) return (f.r = r[f.data.index])
        for (var c = (f.r = 0); c < 4; ++c) f[c] && f[c].r > f.r && (f.r = f[c].r)
    }
    function u() {
        if (e) {
            var f,
                c = e.length,
                a
            for (r = new Array(c), f = 0; f < c; ++f) (a = e[f]), (r[a.index] = +t(a, f, e))
        }
    }
    return (
        (o.initialize = function (f, c) {
            ;(e = f), (n = c), u()
        }),
        (o.iterations = function (f) {
            return arguments.length ? ((s = +f), o) : s
        }),
        (o.strength = function (f) {
            return arguments.length ? ((i = +f), o) : i
        }),
        (o.radius = function (f) {
            return arguments.length ? ((t = typeof f == 'function' ? f : Mt(+f)), u(), o) : t
        }),
        o
    )
}
function qd(t) {
    return t.index
}
function Is(t, e) {
    var r = t.get(e)
    if (!r) throw new Error('node not found: ' + e)
    return r
}
function Ud(t) {
    var e = qd,
        r = a,
        n,
        i = Mt(30),
        s,
        o,
        l,
        u,
        f,
        c = 1
    t == null && (t = [])
    function a(_) {
        return 1 / Math.min(l[_.source.index], l[_.target.index])
    }
    function h(_) {
        for (var d = 0, M = t.length; d < c; ++d)
            for (var $ = 0, m, S, T, z, H, G, X; $ < M; ++$)
                (m = t[$]),
                    (S = m.source),
                    (T = m.target),
                    (z = T.x + T.vx - S.x - S.vx || me(f)),
                    (H = T.y + T.vy - S.y - S.vy || me(f)),
                    (G = Math.sqrt(z * z + H * H)),
                    (G = ((G - s[$]) / G) * _ * n[$]),
                    (z *= G),
                    (H *= G),
                    (T.vx -= z * (X = u[$])),
                    (T.vy -= H * X),
                    (S.vx += z * (X = 1 - X)),
                    (S.vy += H * X)
    }
    function g() {
        if (o) {
            var _,
                d = o.length,
                M = t.length,
                $ = new Map(o.map((S, T) => [e(S, T, o), S])),
                m
            for (_ = 0, l = new Array(d); _ < M; ++_)
                (m = t[_]),
                    (m.index = _),
                    typeof m.source != 'object' && (m.source = Is($, m.source)),
                    typeof m.target != 'object' && (m.target = Is($, m.target)),
                    (l[m.source.index] = (l[m.source.index] || 0) + 1),
                    (l[m.target.index] = (l[m.target.index] || 0) + 1)
            for (_ = 0, u = new Array(M); _ < M; ++_)
                (m = t[_]), (u[_] = l[m.source.index] / (l[m.source.index] + l[m.target.index]))
            ;(n = new Array(M)), w(), (s = new Array(M)), y()
        }
    }
    function w() {
        if (o) for (var _ = 0, d = t.length; _ < d; ++_) n[_] = +r(t[_], _, t)
    }
    function y() {
        if (o) for (var _ = 0, d = t.length; _ < d; ++_) s[_] = +i(t[_], _, t)
    }
    return (
        (h.initialize = function (_, d) {
            ;(o = _), (f = d), g()
        }),
        (h.links = function (_) {
            return arguments.length ? ((t = _), g(), h) : t
        }),
        (h.id = function (_) {
            return arguments.length ? ((e = _), h) : e
        }),
        (h.iterations = function (_) {
            return arguments.length ? ((c = +_), h) : c
        }),
        (h.strength = function (_) {
            return arguments.length ? ((r = typeof _ == 'function' ? _ : Mt(+_)), w(), h) : r
        }),
        (h.distance = function (_) {
            return arguments.length ? ((i = typeof _ == 'function' ? _ : Mt(+_)), y(), h) : i
        }),
        h
    )
}
const Kd = 1664525,
    Xd = 1013904223,
    Ps = 4294967296
function Wd() {
    let t = 1
    return () => (t = (Kd * t + Xd) % Ps) / Ps
}
function Yd(t) {
    return t.x
}
function Gd(t) {
    return t.y
}
var Zd = 10,
    Qd = Math.PI * (3 - Math.sqrt(5))
function Jd(t) {
    var e,
        r = 1,
        n = 1e-3,
        i = 1 - Math.pow(n, 1 / 300),
        s = 0,
        o = 0.6,
        l = /* @__PURE__ */ new Map(),
        u = Ni(a),
        f = _n('tick', 'end'),
        c = Wd()
    t == null && (t = [])
    function a() {
        h(), f.call('tick', e), r < n && (u.stop(), f.call('end', e))
    }
    function h(y) {
        var _,
            d = t.length,
            M
        y === void 0 && (y = 1)
        for (var $ = 0; $ < y; ++$)
            for (
                r += (s - r) * i,
                    l.forEach(function (m) {
                        m(r)
                    }),
                    _ = 0;
                _ < d;
                ++_
            )
                (M = t[_]),
                    M.fx == null ? (M.x += M.vx *= o) : ((M.x = M.fx), (M.vx = 0)),
                    M.fy == null ? (M.y += M.vy *= o) : ((M.y = M.fy), (M.vy = 0))
        return e
    }
    function g() {
        for (var y = 0, _ = t.length, d; y < _; ++y) {
            if (
                ((d = t[y]),
                (d.index = y),
                d.fx != null && (d.x = d.fx),
                d.fy != null && (d.y = d.fy),
                isNaN(d.x) || isNaN(d.y))
            ) {
                var M = Zd * Math.sqrt(0.5 + y),
                    $ = y * Qd
                ;(d.x = M * Math.cos($)), (d.y = M * Math.sin($))
            }
            ;(isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0)
        }
    }
    function w(y) {
        return y.initialize && y.initialize(t, c), y
    }
    return (
        g(),
        (e = {
            tick: h,
            restart: function () {
                return u.restart(a), e
            },
            stop: function () {
                return u.stop(), e
            },
            nodes: function (y) {
                return arguments.length ? ((t = y), g(), l.forEach(w), e) : t
            },
            alpha: function (y) {
                return arguments.length ? ((r = +y), e) : r
            },
            alphaMin: function (y) {
                return arguments.length ? ((n = +y), e) : n
            },
            alphaDecay: function (y) {
                return arguments.length ? ((i = +y), e) : +i
            },
            alphaTarget: function (y) {
                return arguments.length ? ((s = +y), e) : s
            },
            velocityDecay: function (y) {
                return arguments.length ? ((o = 1 - y), e) : 1 - o
            },
            randomSource: function (y) {
                return arguments.length ? ((c = y), l.forEach(w), e) : c
            },
            force: function (y, _) {
                return arguments.length > 1
                    ? (_ == null ? l.delete(y) : l.set(y, w(_)), e)
                    : l.get(y)
            },
            find: function (y, _, d) {
                var M = 0,
                    $ = t.length,
                    m,
                    S,
                    T,
                    z,
                    H
                for (d == null ? (d = 1 / 0) : (d *= d), M = 0; M < $; ++M)
                    (z = t[M]),
                        (m = y - z.x),
                        (S = _ - z.y),
                        (T = m * m + S * S),
                        T < d && ((H = z), (d = T))
                return H
            },
            on: function (y, _) {
                return arguments.length > 1 ? (f.on(y, _), e) : f.on(y)
            }
        })
    )
}
function tp() {
    var t,
        e,
        r,
        n,
        i = Mt(-30),
        s,
        o = 1,
        l = 1 / 0,
        u = 0.81
    function f(g) {
        var w,
            y = t.length,
            _ = ki(t, Yd, Gd).visitAfter(a)
        for (n = g, w = 0; w < y; ++w) (e = t[w]), _.visit(h)
    }
    function c() {
        if (t) {
            var g,
                w = t.length,
                y
            for (s = new Array(w), g = 0; g < w; ++g) (y = t[g]), (s[y.index] = +i(y, g, t))
        }
    }
    function a(g) {
        var w = 0,
            y,
            _,
            d = 0,
            M,
            $,
            m
        if (g.length) {
            for (M = $ = m = 0; m < 4; ++m)
                (y = g[m]) &&
                    (_ = Math.abs(y.value)) &&
                    ((w += y.value), (d += _), (M += _ * y.x), ($ += _ * y.y))
            ;(g.x = M / d), (g.y = $ / d)
        } else {
            ;(y = g), (y.x = y.data.x), (y.y = y.data.y)
            do w += s[y.data.index]
            while ((y = y.next))
        }
        g.value = w
    }
    function h(g, w, y, _) {
        if (!g.value) return !0
        var d = g.x - e.x,
            M = g.y - e.y,
            $ = _ - w,
            m = d * d + M * M
        if (($ * $) / u < m)
            return (
                m < l &&
                    (d === 0 && ((d = me(r)), (m += d * d)),
                    M === 0 && ((M = me(r)), (m += M * M)),
                    m < o && (m = Math.sqrt(o * m)),
                    (e.vx += (d * g.value * n) / m),
                    (e.vy += (M * g.value * n) / m)),
                !0
            )
        if (g.length || m >= l) return
        ;(g.data !== e || g.next) &&
            (d === 0 && ((d = me(r)), (m += d * d)),
            M === 0 && ((M = me(r)), (m += M * M)),
            m < o && (m = Math.sqrt(o * m)))
        do g.data !== e && (($ = (s[g.data.index] * n) / m), (e.vx += d * $), (e.vy += M * $))
        while ((g = g.next))
    }
    return (
        (f.initialize = function (g, w) {
            ;(t = g), (r = w), c()
        }),
        (f.strength = function (g) {
            return arguments.length ? ((i = typeof g == 'function' ? g : Mt(+g)), c(), f) : i
        }),
        (f.distanceMin = function (g) {
            return arguments.length ? ((o = g * g), f) : Math.sqrt(o)
        }),
        (f.distanceMax = function (g) {
            return arguments.length ? ((l = g * g), f) : Math.sqrt(l)
        }),
        (f.theta = function (g) {
            return arguments.length ? ((u = g * g), f) : Math.sqrt(u)
        }),
        f
    )
}
function ep(t) {
    var e = Mt(0.1),
        r,
        n,
        i
    typeof t != 'function' && (t = Mt(t == null ? 0 : +t))
    function s(l) {
        for (var u = 0, f = r.length, c; u < f; ++u) (c = r[u]), (c.vx += (i[u] - c.x) * n[u] * l)
    }
    function o() {
        if (r) {
            var l,
                u = r.length
            for (n = new Array(u), i = new Array(u), l = 0; l < u; ++l)
                n[l] = isNaN((i[l] = +t(r[l], l, r))) ? 0 : +e(r[l], l, r)
        }
    }
    return (
        (s.initialize = function (l) {
            ;(r = l), o()
        }),
        (s.strength = function (l) {
            return arguments.length ? ((e = typeof l == 'function' ? l : Mt(+l)), o(), s) : e
        }),
        (s.x = function (l) {
            return arguments.length ? ((t = typeof l == 'function' ? l : Mt(+l)), o(), s) : t
        }),
        s
    )
}
function np(t) {
    var e = Mt(0.1),
        r,
        n,
        i
    typeof t != 'function' && (t = Mt(t == null ? 0 : +t))
    function s(l) {
        for (var u = 0, f = r.length, c; u < f; ++u) (c = r[u]), (c.vy += (i[u] - c.y) * n[u] * l)
    }
    function o() {
        if (r) {
            var l,
                u = r.length
            for (n = new Array(u), i = new Array(u), l = 0; l < u; ++l)
                n[l] = isNaN((i[l] = +t(r[l], l, r))) ? 0 : +e(r[l], l, r)
        }
    }
    return (
        (s.initialize = function (l) {
            ;(r = l), o()
        }),
        (s.strength = function (l) {
            return arguments.length ? ((e = typeof l == 'function' ? l : Mt(+l)), o(), s) : e
        }),
        (s.y = function (l) {
            return arguments.length ? ((t = typeof l == 'function' ? l : Mt(+l)), o(), s) : t
        }),
        s
    )
}
function je(t) {
    return function () {
        return t
    }
}
function rp(t) {
    let e = 3
    return (
        (t.digits = function (r) {
            if (!arguments.length) return e
            if (r == null) e = null
            else {
                const n = Math.floor(r)
                if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`)
                e = n
            }
            return t
        }),
        () => new Sd(e)
    )
}
function ip(t) {
    return typeof t == 'object' && 'length' in t ? t : Array.from(t)
}
function dl(t) {
    this._context = t
}
dl.prototype = {
    areaStart: function () {
        this._line = 0
    },
    areaEnd: function () {
        this._line = NaN
    },
    lineStart: function () {
        this._point = 0
    },
    lineEnd: function () {
        ;(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
            (this._line = 1 - this._line)
    },
    point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
            case 0:
                ;(this._point = 1),
                    this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e)
                break
            case 1:
                this._point = 2
            default:
                this._context.lineTo(t, e)
                break
        }
    }
}
function sp(t) {
    return new dl(t)
}
function op(t) {
    return t[0]
}
function lp(t) {
    return t[1]
}
function up(t, e) {
    var r = je(!0),
        n = null,
        i = sp,
        s = null,
        o = rp(l)
    ;(t = typeof t == 'function' ? t : t === void 0 ? op : je(t)),
        (e = typeof e == 'function' ? e : e === void 0 ? lp : je(e))
    function l(u) {
        var f,
            c = (u = ip(u)).length,
            a,
            h = !1,
            g
        for (n == null && (s = i((g = o()))), f = 0; f <= c; ++f)
            !(f < c && r((a = u[f]), f, u)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()),
                h && s.point(+t(a, f, u), +e(a, f, u))
        if (g) return (s = null), g + '' || null
    }
    return (
        (l.x = function (u) {
            return arguments.length ? ((t = typeof u == 'function' ? u : je(+u)), l) : t
        }),
        (l.y = function (u) {
            return arguments.length ? ((e = typeof u == 'function' ? u : je(+u)), l) : e
        }),
        (l.defined = function (u) {
            return arguments.length ? ((r = typeof u == 'function' ? u : je(!!u)), l) : r
        }),
        (l.curve = function (u) {
            return arguments.length ? ((i = u), n != null && (s = i(n)), l) : i
        }),
        (l.context = function (u) {
            return arguments.length ? (u == null ? (n = s = null) : (s = i((n = u))), l) : n
        }),
        l
    )
}
const In = (t) => () => t
function fp(t, { sourceEvent: e, target: r, transform: n, dispatch: i }) {
    Object.defineProperties(this, {
        type: { value: t, enumerable: !0, configurable: !0 },
        sourceEvent: { value: e, enumerable: !0, configurable: !0 },
        target: { value: r, enumerable: !0, configurable: !0 },
        transform: { value: n, enumerable: !0, configurable: !0 },
        _: { value: i }
    })
}
function re(t, e, r) {
    ;(this.k = t), (this.x = e), (this.y = r)
}
re.prototype = {
    constructor: re,
    scale: function (t) {
        return t === 1 ? this : new re(this.k * t, this.x, this.y)
    },
    translate: function (t, e) {
        return (t === 0) & (e === 0)
            ? this
            : new re(this.k, this.x + this.k * t, this.y + this.k * e)
    },
    apply: function (t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y]
    },
    applyX: function (t) {
        return t * this.k + this.x
    },
    applyY: function (t) {
        return t * this.k + this.y
    },
    invert: function (t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
    },
    invertX: function (t) {
        return (t - this.x) / this.k
    },
    invertY: function (t) {
        return (t - this.y) / this.k
    },
    rescaleX: function (t) {
        return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
    },
    rescaleY: function (t) {
        return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
    },
    toString: function () {
        return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')'
    }
}
var pl = new re(1, 0, 0)
re.prototype
function Ir(t) {
    t.stopImmediatePropagation()
}
function Qe(t) {
    t.preventDefault(), t.stopImmediatePropagation()
}
function cp(t) {
    return (!t.ctrlKey || t.type === 'wheel') && !t.button
}
function ap() {
    var t = this
    return t instanceof SVGElement
        ? ((t = t.ownerSVGElement || t),
          t.hasAttribute('viewBox')
              ? ((t = t.viewBox.baseVal),
                [
                    [t.x, t.y],
                    [t.x + t.width, t.y + t.height]
                ])
              : [
                    [0, 0],
                    [t.width.baseVal.value, t.height.baseVal.value]
                ])
        : [
              [0, 0],
              [t.clientWidth, t.clientHeight]
          ]
}
function js() {
    return this.__zoom || pl
}
function hp(t) {
    return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1)
}
function dp() {
    return navigator.maxTouchPoints || 'ontouchstart' in this
}
function pp(t, e, r) {
    var n = t.invertX(e[0][0]) - r[0][0],
        i = t.invertX(e[1][0]) - r[1][0],
        s = t.invertY(e[0][1]) - r[0][1],
        o = t.invertY(e[1][1]) - r[1][1]
    return t.translate(
        i > n ? (n + i) / 2 : Math.min(0, n) || Math.max(0, i),
        o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
    )
}
function gp() {
    var t = cp,
        e = ap,
        r = pp,
        n = hp,
        i = dp,
        s = [0, 1 / 0],
        o = [
            [-1 / 0, -1 / 0],
            [1 / 0, 1 / 0]
        ],
        l = 250,
        u = ch,
        f = _n('start', 'zoom', 'end'),
        c,
        a,
        h,
        g = 500,
        w = 150,
        y = 0,
        _ = 10
    function d(x) {
        x.property('__zoom', js)
            .on('wheel.zoom', H, { passive: !1 })
            .on('mousedown.zoom', G)
            .on('dblclick.zoom', X)
            .filter(i)
            .on('touchstart.zoom', tt)
            .on('touchmove.zoom', ct)
            .on('touchend.zoom touchcancel.zoom', it)
            .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
    }
    ;(d.transform = function (x, O, b, I) {
        var P = x.selection ? x.selection() : x
        P.property('__zoom', js),
            x !== P
                ? S(x, O, b, I)
                : P.interrupt().each(function () {
                      T(this, arguments)
                          .event(I)
                          .start()
                          .zoom(null, typeof O == 'function' ? O.apply(this, arguments) : O)
                          .end()
                  })
    }),
        (d.scaleBy = function (x, O, b, I) {
            d.scaleTo(
                x,
                function () {
                    var P = this.__zoom.k,
                        U = typeof O == 'function' ? O.apply(this, arguments) : O
                    return P * U
                },
                b,
                I
            )
        }),
        (d.scaleTo = function (x, O, b, I) {
            d.transform(
                x,
                function () {
                    var P = e.apply(this, arguments),
                        U = this.__zoom,
                        K =
                            b == null
                                ? m(P)
                                : typeof b == 'function'
                                  ? b.apply(this, arguments)
                                  : b,
                        et = U.invert(K),
                        rt = typeof O == 'function' ? O.apply(this, arguments) : O
                    return r($(M(U, rt), K, et), P, o)
                },
                b,
                I
            )
        }),
        (d.translateBy = function (x, O, b, I) {
            d.transform(
                x,
                function () {
                    return r(
                        this.__zoom.translate(
                            typeof O == 'function' ? O.apply(this, arguments) : O,
                            typeof b == 'function' ? b.apply(this, arguments) : b
                        ),
                        e.apply(this, arguments),
                        o
                    )
                },
                null,
                I
            )
        }),
        (d.translateTo = function (x, O, b, I, P) {
            d.transform(
                x,
                function () {
                    var U = e.apply(this, arguments),
                        K = this.__zoom,
                        et =
                            I == null ? m(U) : typeof I == 'function' ? I.apply(this, arguments) : I
                    return r(
                        pl
                            .translate(et[0], et[1])
                            .scale(K.k)
                            .translate(
                                typeof O == 'function' ? -O.apply(this, arguments) : -O,
                                typeof b == 'function' ? -b.apply(this, arguments) : -b
                            ),
                        U,
                        o
                    )
                },
                I,
                P
            )
        })
    function M(x, O) {
        return (O = Math.max(s[0], Math.min(s[1], O))), O === x.k ? x : new re(O, x.x, x.y)
    }
    function $(x, O, b) {
        var I = O[0] - b[0] * x.k,
            P = O[1] - b[1] * x.k
        return I === x.x && P === x.y ? x : new re(x.k, I, P)
    }
    function m(x) {
        return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2]
    }
    function S(x, O, b, I) {
        x.on('start.zoom', function () {
            T(this, arguments).event(I).start()
        })
            .on('interrupt.zoom end.zoom', function () {
                T(this, arguments).event(I).end()
            })
            .tween('zoom', function () {
                var P = this,
                    U = arguments,
                    K = T(P, U).event(I),
                    et = e.apply(P, U),
                    rt = b == null ? m(et) : typeof b == 'function' ? b.apply(P, U) : b,
                    _t = Math.max(et[1][0] - et[0][0], et[1][1] - et[0][1]),
                    ht = P.__zoom,
                    wt = typeof O == 'function' ? O.apply(P, U) : O,
                    R = u(ht.invert(rt).concat(_t / ht.k), wt.invert(rt).concat(_t / wt.k))
                return function (A) {
                    if (A === 1) A = wt
                    else {
                        var D = R(A),
                            B = _t / D[2]
                        A = new re(B, rt[0] - D[0] * B, rt[1] - D[1] * B)
                    }
                    K.zoom(null, A)
                }
            })
    }
    function T(x, O, b) {
        return (!b && x.__zooming) || new z(x, O)
    }
    function z(x, O) {
        ;(this.that = x),
            (this.args = O),
            (this.active = 0),
            (this.sourceEvent = null),
            (this.extent = e.apply(x, O)),
            (this.taps = 0)
    }
    z.prototype = {
        event: function (x) {
            return x && (this.sourceEvent = x), this
        },
        start: function () {
            return ++this.active === 1 && ((this.that.__zooming = this), this.emit('start')), this
        },
        zoom: function (x, O) {
            return (
                this.mouse && x !== 'mouse' && (this.mouse[1] = O.invert(this.mouse[0])),
                this.touch0 && x !== 'touch' && (this.touch0[1] = O.invert(this.touch0[0])),
                this.touch1 && x !== 'touch' && (this.touch1[1] = O.invert(this.touch1[0])),
                (this.that.__zoom = O),
                this.emit('zoom'),
                this
            )
        },
        end: function () {
            return --this.active === 0 && (delete this.that.__zooming, this.emit('end')), this
        },
        emit: function (x) {
            var O = Jt(this.that).datum()
            f.call(
                x,
                this.that,
                new fp(x, {
                    sourceEvent: this.sourceEvent,
                    target: d,
                    type: x,
                    transform: this.that.__zoom,
                    dispatch: f
                }),
                O
            )
        }
    }
    function H(x, ...O) {
        if (!t.apply(this, arguments)) return
        var b = T(this, O).event(x),
            I = this.__zoom,
            P = Math.max(s[0], Math.min(s[1], I.k * Math.pow(2, n.apply(this, arguments)))),
            U = Ft(x)
        if (b.wheel)
            (b.mouse[0][0] !== U[0] || b.mouse[0][1] !== U[1]) &&
                (b.mouse[1] = I.invert((b.mouse[0] = U))),
                clearTimeout(b.wheel)
        else {
            if (I.k === P) return
            ;(b.mouse = [U, I.invert(U)]), Bn(this), b.start()
        }
        Qe(x),
            (b.wheel = setTimeout(K, w)),
            b.zoom('mouse', r($(M(I, P), b.mouse[0], b.mouse[1]), b.extent, o))
        function K() {
            ;(b.wheel = null), b.end()
        }
    }
    function G(x, ...O) {
        if (h || !t.apply(this, arguments)) return
        var b = x.currentTarget,
            I = T(this, O, !0).event(x),
            P = Jt(x.view).on('mousemove.zoom', rt, !0).on('mouseup.zoom', _t, !0),
            U = Ft(x, b),
            K = x.clientX,
            et = x.clientY
        Zo(x.view), Ir(x), (I.mouse = [U, this.__zoom.invert(U)]), Bn(this), I.start()
        function rt(ht) {
            if ((Qe(ht), !I.moved)) {
                var wt = ht.clientX - K,
                    R = ht.clientY - et
                I.moved = wt * wt + R * R > y
            }
            I.event(ht).zoom(
                'mouse',
                r($(I.that.__zoom, (I.mouse[0] = Ft(ht, b)), I.mouse[1]), I.extent, o)
            )
        }
        function _t(ht) {
            P.on('mousemove.zoom mouseup.zoom', null),
                Qo(ht.view, I.moved),
                Qe(ht),
                I.event(ht).end()
        }
    }
    function X(x, ...O) {
        if (t.apply(this, arguments)) {
            var b = this.__zoom,
                I = Ft(x.changedTouches ? x.changedTouches[0] : x, this),
                P = b.invert(I),
                U = b.k * (x.shiftKey ? 0.5 : 2),
                K = r($(M(b, U), I, P), e.apply(this, O), o)
            Qe(x),
                l > 0
                    ? Jt(this).transition().duration(l).call(S, K, I, x)
                    : Jt(this).call(d.transform, K, I, x)
        }
    }
    function tt(x, ...O) {
        if (t.apply(this, arguments)) {
            var b = x.touches,
                I = b.length,
                P = T(this, O, x.changedTouches.length === I).event(x),
                U,
                K,
                et,
                rt
            for (Ir(x), K = 0; K < I; ++K)
                (et = b[K]),
                    (rt = Ft(et, this)),
                    (rt = [rt, this.__zoom.invert(rt), et.identifier]),
                    P.touch0
                        ? !P.touch1 && P.touch0[2] !== rt[2] && ((P.touch1 = rt), (P.taps = 0))
                        : ((P.touch0 = rt), (U = !0), (P.taps = 1 + !!c))
            c && (c = clearTimeout(c)),
                U &&
                    (P.taps < 2 &&
                        ((a = rt[0]),
                        (c = setTimeout(function () {
                            c = null
                        }, g))),
                    Bn(this),
                    P.start())
        }
    }
    function ct(x, ...O) {
        if (this.__zooming) {
            var b = T(this, O).event(x),
                I = x.changedTouches,
                P = I.length,
                U,
                K,
                et,
                rt
            for (Qe(x), U = 0; U < P; ++U)
                (K = I[U]),
                    (et = Ft(K, this)),
                    b.touch0 && b.touch0[2] === K.identifier
                        ? (b.touch0[0] = et)
                        : b.touch1 && b.touch1[2] === K.identifier && (b.touch1[0] = et)
            if (((K = b.that.__zoom), b.touch1)) {
                var _t = b.touch0[0],
                    ht = b.touch0[1],
                    wt = b.touch1[0],
                    R = b.touch1[1],
                    A = (A = wt[0] - _t[0]) * A + (A = wt[1] - _t[1]) * A,
                    D = (D = R[0] - ht[0]) * D + (D = R[1] - ht[1]) * D
                ;(K = M(K, Math.sqrt(A / D))),
                    (et = [(_t[0] + wt[0]) / 2, (_t[1] + wt[1]) / 2]),
                    (rt = [(ht[0] + R[0]) / 2, (ht[1] + R[1]) / 2])
            } else if (b.touch0) (et = b.touch0[0]), (rt = b.touch0[1])
            else return
            b.zoom('touch', r($(K, et, rt), b.extent, o))
        }
    }
    function it(x, ...O) {
        if (this.__zooming) {
            var b = T(this, O).event(x),
                I = x.changedTouches,
                P = I.length,
                U,
                K
            for (
                Ir(x),
                    h && clearTimeout(h),
                    h = setTimeout(function () {
                        h = null
                    }, g),
                    U = 0;
                U < P;
                ++U
            )
                (K = I[U]),
                    b.touch0 && b.touch0[2] === K.identifier
                        ? delete b.touch0
                        : b.touch1 && b.touch1[2] === K.identifier && delete b.touch1
            if ((b.touch1 && !b.touch0 && ((b.touch0 = b.touch1), delete b.touch1), b.touch0))
                b.touch0[1] = this.__zoom.invert(b.touch0[0])
            else if (
                (b.end(),
                b.taps === 2 && ((K = Ft(K, this)), Math.hypot(a[0] - K[0], a[1] - K[1]) < _))
            ) {
                var et = Jt(this).on('dblclick.zoom')
                et && et.apply(this, arguments)
            }
        }
    }
    return (
        (d.wheelDelta = function (x) {
            return arguments.length ? ((n = typeof x == 'function' ? x : In(+x)), d) : n
        }),
        (d.filter = function (x) {
            return arguments.length ? ((t = typeof x == 'function' ? x : In(!!x)), d) : t
        }),
        (d.touchable = function (x) {
            return arguments.length ? ((i = typeof x == 'function' ? x : In(!!x)), d) : i
        }),
        (d.extent = function (x) {
            return arguments.length
                ? ((e =
                      typeof x == 'function'
                          ? x
                          : In([
                                [+x[0][0], +x[0][1]],
                                [+x[1][0], +x[1][1]]
                            ])),
                  d)
                : e
        }),
        (d.scaleExtent = function (x) {
            return arguments.length ? ((s[0] = +x[0]), (s[1] = +x[1]), d) : [s[0], s[1]]
        }),
        (d.translateExtent = function (x) {
            return arguments.length
                ? ((o[0][0] = +x[0][0]),
                  (o[1][0] = +x[1][0]),
                  (o[0][1] = +x[0][1]),
                  (o[1][1] = +x[1][1]),
                  d)
                : [
                      [o[0][0], o[0][1]],
                      [o[1][0], o[1][1]]
                  ]
        }),
        (d.constrain = function (x) {
            return arguments.length ? ((r = x), d) : r
        }),
        (d.duration = function (x) {
            return arguments.length ? ((l = +x), d) : l
        }),
        (d.interpolate = function (x) {
            return arguments.length ? ((u = x), d) : u
        }),
        (d.on = function () {
            var x = f.on.apply(f, arguments)
            return x === f ? d : x
        }),
        (d.clickDistance = function (x) {
            return arguments.length ? ((y = (x = +x) * x), d) : Math.sqrt(y)
        }),
        (d.tapDistance = function (x) {
            return arguments.length ? ((_ = +x), d) : _
        }),
        d
    )
}
class gl {
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
    constructor(e, r, n, i, s, o, l) {
        ;(this.id = e),
            (this.idImported = r),
            (this.x = n),
            (this.y = i),
            (this.fx = s),
            (this.fy = o),
            (this.label = l)
    }
}
var jt = /* @__PURE__ */ ((t) => (
    (t.LINE = 'LINE'),
    (t.LINEREVERSE = 'LINE-REVERSE'),
    (t.ARC = 'ARC'),
    (t.ARCREVERSE = 'ARC-REVERSE'),
    (t.REFLEXIVE = 'REFLEXIVE'),
    t
))(jt || {})
class mp {
    // eslint-disable-next-line no-useless-constructor
    constructor(e, r, n, i) {
        Pt(this, 'id')
        ;(this.source = e),
            (this.target = r),
            (this.pathType = n),
            (this.label = i),
            (this.id = `${e.id}-${r.id}`)
    }
}
class wp {
    constructor() {
        Pt(this, 'nodeIdCounter', 0)
        Pt(this, 'nodes', [])
        Pt(this, 'links', [])
    }
    unlockNodes() {
        this.nodes.forEach((e) => {
            ;(e.fx = void 0), (e.fy = void 0)
        })
    }
    createNode(e, r, n, i) {
        const s = new gl(this.nodeIdCounter++, n, e, r, void 0, void 0, i)
        return this.nodes.push(s), s
    }
    createLink(e, r, n) {
        if (this.links.find((u) => u.source.id === e && u.target.id === r) !== void 0) return
        const s = this.nodes.find((u) => u.id === e)
        if (s === void 0) return
        const o = this.nodes.find((u) => u.id === r)
        if (o === void 0) return
        const l = new mp(s, o, void 0, n)
        return this.links.push(l), l
    }
    removeNode(e) {
        const r = this.nodes.findIndex((i) => i.id === e.id)
        if (r === -1) return
        this.nodes.splice(r, 1)
        const n = this.links.filter((i) => i.source.id === e.id || i.target.id === e.id)
        return (
            n.forEach((i) => {
                const s = this.links.indexOf(i, 0)
                this.links.splice(s, 1)
            }),
            [e, n]
        )
    }
    removeLink(e) {
        const r = this.links.findIndex(
            (n) => n.source.id === e.source.id && n.target.id === e.target.id
        )
        if (r !== -1) return this.links.splice(r, 1), e
    }
    // formats the graph in Trivial Graph Format
    toTGF(e, r) {
        if (this.nodes.length === 0 && this.links.length === 0) return 'Graph is empty'
        let n, i
        return (
            e
                ? (n = this.nodes.map((s) => `${s.id} ${s.label !== void 0 ? `${s.label}` : ''}`)
                      .join(`
`))
                : (n = this.nodes.map((s) => `${s.id}`).join(`
`)),
            r
                ? (i = this.links.map(
                      (s) =>
                          `${s.source.id} ${s.target.id} ${s.label !== void 0 ? `${s.label}` : ''}`
                  ).join(`
`))
                : (i = this.links.map((s) => `${s.source.id} ${s.target.id}`).join(`
`)),
            `${n}${
                i
                    ? `
#
`
                    : ''
            }${i}`
        )
    }
}
function yp(t) {
    return gp()
        .scaleExtent([0.5, 5])
        .filter((e) => {
            var r
            return e.button === 0 || ((r = e.touches) == null ? void 0 : r.length) >= 2
        })
        .on('zoom', (e) => t(e))
}
function Se(t) {
    t.preventDefault(), t.stopPropagation()
}
function _p(t, e, r, n) {
    return za()
        .filter((i) => i.button === 2)
        .on('start', (i, s) => {
            Se(i.sourceEvent),
                i.active === 0 && t.alphaTarget(0.5).restart(),
                (s.fx = s.x),
                (s.fy = s.y)
        })
        .on('drag', (i, s) => {
            ;(s.fx = Math.max(n, Math.min(e - n, i.x))), (s.fy = Math.max(n, Math.min(r - n, i.y)))
        })
        .on('end', (i, s) => {
            i.active === 0 && t.alphaTarget(0), (s.fx = void 0), (s.fy = void 0)
        })
}
function vp(t, e, r, n, i) {
    const s = t
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .on('pointermove', (o) => r(o))
        .on('pointerup', (o) => n(o))
        .on('contextmenu', (o) => Se(o))
        .on('dblclick', (o) => i(o))
        .call(e)
        .on('dblclick.zoom', null)
        .append('g')
    return s.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'white'), s
}
function xp(t) {
    return t.append('g').classed('links', !0).selectAll('path')
}
function bp(t) {
    return t.append('g').classed('nodes', !0).selectAll('circle')
}
function Ep(t, e) {
    Pr(t, e, 'link-arrow', 'arrow', !1),
        Pr(t, e, 'link-arrow-reverse', 'arrow', !0),
        Pr(t, e, 'draggable-link-arrow', 'arrow draggable', !1)
}
function Pr(t, e, r, n, i) {
    t.append('defs')
        .append('marker')
        .attr('id', r)
        .attr('viewBox', e.markerPath)
        .attr('refX', e.markerRef)
        .attr('refY', e.markerRef)
        .attr('markerWidth', e.markerBoxSize)
        .attr('markerHeight', e.markerBoxSize)
        .attr('orient', i ? 'auto-start-reverse' : 'auto')
        .classed(n, !0)
        .append('path')
        .attr('d', `${up()(e.arrowPoints)}`)
}
function Sp(t) {
    return t.append('path').classed('link draggable hidden', !0).attr('d', 'M0,0L0,0')
}
function Mp(t, e, r, n, i) {
    let s = Jd(t.nodes)
        .on('tick', () => i())
        .force(
            'collision',
            Bd().radius(e.nodeRadius)
            //stop overlapping
        )
    return (
        (s = Rp(t, s, r, n, e)),
        (s = Np(s, t, e, e.fixedLinkDistanceEnabled)),
        (s = $p(s, e.nodePhysicsEnabled, r, n)),
        s
    )
}
function Rp(t, e, r, n, i) {
    return e.force('bounds', () => {
        for (const s of t.nodes)
            (s.x = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, s.x))),
                (s.y = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, s.y)))
    })
}
function $p(t, e, r, n) {
    return e
        ? t
              .force('charge', tp().strength(-500))
              .force('x', ep(r / 2).strength(0.05))
              .force('y', np(n / 2).strength(0.05))
        : t.force('charge', null).force('x', null).force('y', null)
}
function Np(t, e, r, n) {
    return n
        ? t.force(
              'link',
              Ud()
                  .links(e.links)
                  .id((i) => i.id)
                  .distance(r.nodeRadius * 10)
          )
        : t.force('link', null)
}
const Tp = !0,
    Ls = 24,
    Cp = !0,
    kp = !1,
    Ip = !0,
    Pp = !1,
    ae = 4,
    jp = {
        hasToolbar: Tp,
        nodeRadius: Ls,
        showNodeLabels: Cp,
        nodePhysicsEnabled: kp,
        showLinkLabels: Ip,
        fixedLinkDistanceEnabled: Pp,
        markerBoxSize: ae,
        markerPadding: Ls + 2 * ae,
        markerRef: ae / 2,
        arrowPoints: [
            [0, 0],
            [0, ae],
            [ae, ae / 2]
        ],
        markerPath: [0, 0, ae, ae].join(',')
    },
    Lp = Object.prototype.toString
function nr(t) {
    const e = Lp.call(t)
    return e.endsWith('Array]') && !e.includes('Big')
}
function Op(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (!nr(t)) throw new TypeError('input must be an array')
    if (t.length === 0) throw new TypeError('input must not be empty')
    var r = e.fromIndex,
        n = r === void 0 ? 0 : r,
        i = e.toIndex,
        s = i === void 0 ? t.length : i
    if (n < 0 || n >= t.length || !Number.isInteger(n))
        throw new Error('fromIndex must be a positive integer smaller than length')
    if (s <= n || s > t.length || !Number.isInteger(s))
        throw new Error(
            'toIndex must be an integer greater than fromIndex and at most equal to length'
        )
    for (var o = t[n], l = n + 1; l < s; l++) t[l] > o && (o = t[l])
    return o
}
function Fp(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (!nr(t)) throw new TypeError('input must be an array')
    if (t.length === 0) throw new TypeError('input must not be empty')
    var r = e.fromIndex,
        n = r === void 0 ? 0 : r,
        i = e.toIndex,
        s = i === void 0 ? t.length : i
    if (n < 0 || n >= t.length || !Number.isInteger(n))
        throw new Error('fromIndex must be a positive integer smaller than length')
    if (s <= n || s > t.length || !Number.isInteger(s))
        throw new Error(
            'toIndex must be an integer greater than fromIndex and at most equal to length'
        )
    for (var o = t[n], l = n + 1; l < s; l++) t[l] < o && (o = t[l])
    return o
}
function Os(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (nr(t)) {
        if (t.length === 0) throw new TypeError('input must not be empty')
    } else throw new TypeError('input must be an array')
    var r
    if (e.output !== void 0) {
        if (!nr(e.output)) throw new TypeError('output option must be an array if specified')
        r = e.output
    } else r = new Array(t.length)
    var n = Fp(t),
        i = Op(t)
    if (n === i)
        throw new RangeError(
            'minimum and maximum input values are equal. Cannot rescale a constant array'
        )
    var s = e.min,
        o = s === void 0 ? (e.autoMinMax ? n : 0) : s,
        l = e.max,
        u = l === void 0 ? (e.autoMinMax ? i : 1) : l
    if (o >= u) throw new RangeError('min option must be smaller than max option')
    for (var f = (u - o) / (i - n), c = 0; c < t.length; c++) r[c] = (t[c] - n) * f + o
    return r
}
const Pn = ' '.repeat(2),
    ml = ' '.repeat(4)
function zp() {
    return wl(this)
}
function wl(t, e = {}) {
    const { maxRows: r = 15, maxColumns: n = 10, maxNumSize: i = 8 } = e
    return `${t.constructor.name} {
${Pn}[
${ml}${Ap(t, r, n, i)}
${Pn}]
${Pn}rows: ${t.rows}
${Pn}columns: ${t.columns}
}`
}
function Ap(t, e, r, n) {
    const { rows: i, columns: s } = t,
        o = Math.min(i, e),
        l = Math.min(s, r),
        u = []
    for (let f = 0; f < o; f++) {
        let c = []
        for (let a = 0; a < l; a++) c.push(Vp(t.get(f, a), n))
        u.push(`${c.join(' ')}`)
    }
    return (
        l !== s && (u[u.length - 1] += ` ... ${s - r} more columns`),
        o !== i && u.push(`... ${i - e} more rows`),
        u.join(`
${ml}`)
    )
}
function Vp(t, e) {
    const r = String(t)
    if (r.length <= e) return r.padEnd(e, ' ')
    const n = t.toPrecision(e - 2)
    if (n.length <= e) return n
    const i = t.toExponential(e - 2),
        s = i.indexOf('e'),
        o = i.slice(s)
    return i.slice(0, e - o.length) + o
}
function Dp(t, e) {
    ;(t.prototype.add = function (n) {
        return typeof n == 'number' ? this.addS(n) : this.addM(n)
    }),
        (t.prototype.addS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) + n)
            return this
        }),
        (t.prototype.addM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) + n.get(i, s))
            return this
        }),
        (t.add = function (n, i) {
            return new e(n).add(i)
        }),
        (t.prototype.sub = function (n) {
            return typeof n == 'number' ? this.subS(n) : this.subM(n)
        }),
        (t.prototype.subS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) - n)
            return this
        }),
        (t.prototype.subM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) - n.get(i, s))
            return this
        }),
        (t.sub = function (n, i) {
            return new e(n).sub(i)
        }),
        (t.prototype.subtract = t.prototype.sub),
        (t.prototype.subtractS = t.prototype.subS),
        (t.prototype.subtractM = t.prototype.subM),
        (t.subtract = t.sub),
        (t.prototype.mul = function (n) {
            return typeof n == 'number' ? this.mulS(n) : this.mulM(n)
        }),
        (t.prototype.mulS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) * n)
            return this
        }),
        (t.prototype.mulM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) * n.get(i, s))
            return this
        }),
        (t.mul = function (n, i) {
            return new e(n).mul(i)
        }),
        (t.prototype.multiply = t.prototype.mul),
        (t.prototype.multiplyS = t.prototype.mulS),
        (t.prototype.multiplyM = t.prototype.mulM),
        (t.multiply = t.mul),
        (t.prototype.div = function (n) {
            return typeof n == 'number' ? this.divS(n) : this.divM(n)
        }),
        (t.prototype.divS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) / n)
            return this
        }),
        (t.prototype.divM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) / n.get(i, s))
            return this
        }),
        (t.div = function (n, i) {
            return new e(n).div(i)
        }),
        (t.prototype.divide = t.prototype.div),
        (t.prototype.divideS = t.prototype.divS),
        (t.prototype.divideM = t.prototype.divM),
        (t.divide = t.div),
        (t.prototype.mod = function (n) {
            return typeof n == 'number' ? this.modS(n) : this.modM(n)
        }),
        (t.prototype.modS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) % n)
            return this
        }),
        (t.prototype.modM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) % n.get(i, s))
            return this
        }),
        (t.mod = function (n, i) {
            return new e(n).mod(i)
        }),
        (t.prototype.modulus = t.prototype.mod),
        (t.prototype.modulusS = t.prototype.modS),
        (t.prototype.modulusM = t.prototype.modM),
        (t.modulus = t.mod),
        (t.prototype.and = function (n) {
            return typeof n == 'number' ? this.andS(n) : this.andM(n)
        }),
        (t.prototype.andS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) & n)
            return this
        }),
        (t.prototype.andM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) & n.get(i, s))
            return this
        }),
        (t.and = function (n, i) {
            return new e(n).and(i)
        }),
        (t.prototype.or = function (n) {
            return typeof n == 'number' ? this.orS(n) : this.orM(n)
        }),
        (t.prototype.orS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) | n)
            return this
        }),
        (t.prototype.orM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) | n.get(i, s))
            return this
        }),
        (t.or = function (n, i) {
            return new e(n).or(i)
        }),
        (t.prototype.xor = function (n) {
            return typeof n == 'number' ? this.xorS(n) : this.xorM(n)
        }),
        (t.prototype.xorS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) ^ n)
            return this
        }),
        (t.prototype.xorM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) ^ n.get(i, s))
            return this
        }),
        (t.xor = function (n, i) {
            return new e(n).xor(i)
        }),
        (t.prototype.leftShift = function (n) {
            return typeof n == 'number' ? this.leftShiftS(n) : this.leftShiftM(n)
        }),
        (t.prototype.leftShiftS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) << n)
            return this
        }),
        (t.prototype.leftShiftM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) << n.get(i, s))
            return this
        }),
        (t.leftShift = function (n, i) {
            return new e(n).leftShift(i)
        }),
        (t.prototype.signPropagatingRightShift = function (n) {
            return typeof n == 'number'
                ? this.signPropagatingRightShiftS(n)
                : this.signPropagatingRightShiftM(n)
        }),
        (t.prototype.signPropagatingRightShiftS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) >> n)
            return this
        }),
        (t.prototype.signPropagatingRightShiftM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) >> n.get(i, s))
            return this
        }),
        (t.signPropagatingRightShift = function (n, i) {
            return new e(n).signPropagatingRightShift(i)
        }),
        (t.prototype.rightShift = function (n) {
            return typeof n == 'number' ? this.rightShiftS(n) : this.rightShiftM(n)
        }),
        (t.prototype.rightShiftS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, this.get(i, s) >>> n)
            return this
        }),
        (t.prototype.rightShiftM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++)
                    this.set(i, s, this.get(i, s) >>> n.get(i, s))
            return this
        }),
        (t.rightShift = function (n, i) {
            return new e(n).rightShift(i)
        }),
        (t.prototype.zeroFillRightShift = t.prototype.rightShift),
        (t.prototype.zeroFillRightShiftS = t.prototype.rightShiftS),
        (t.prototype.zeroFillRightShiftM = t.prototype.rightShiftM),
        (t.zeroFillRightShift = t.rightShift),
        (t.prototype.not = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, ~this.get(n, i))
            return this
        }),
        (t.not = function (n) {
            return new e(n).not()
        }),
        (t.prototype.abs = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.abs(this.get(n, i)))
            return this
        }),
        (t.abs = function (n) {
            return new e(n).abs()
        }),
        (t.prototype.acos = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.acos(this.get(n, i)))
            return this
        }),
        (t.acos = function (n) {
            return new e(n).acos()
        }),
        (t.prototype.acosh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.acosh(this.get(n, i)))
            return this
        }),
        (t.acosh = function (n) {
            return new e(n).acosh()
        }),
        (t.prototype.asin = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.asin(this.get(n, i)))
            return this
        }),
        (t.asin = function (n) {
            return new e(n).asin()
        }),
        (t.prototype.asinh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.asinh(this.get(n, i)))
            return this
        }),
        (t.asinh = function (n) {
            return new e(n).asinh()
        }),
        (t.prototype.atan = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.atan(this.get(n, i)))
            return this
        }),
        (t.atan = function (n) {
            return new e(n).atan()
        }),
        (t.prototype.atanh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.atanh(this.get(n, i)))
            return this
        }),
        (t.atanh = function (n) {
            return new e(n).atanh()
        }),
        (t.prototype.cbrt = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.cbrt(this.get(n, i)))
            return this
        }),
        (t.cbrt = function (n) {
            return new e(n).cbrt()
        }),
        (t.prototype.ceil = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.ceil(this.get(n, i)))
            return this
        }),
        (t.ceil = function (n) {
            return new e(n).ceil()
        }),
        (t.prototype.clz32 = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.clz32(this.get(n, i)))
            return this
        }),
        (t.clz32 = function (n) {
            return new e(n).clz32()
        }),
        (t.prototype.cos = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.cos(this.get(n, i)))
            return this
        }),
        (t.cos = function (n) {
            return new e(n).cos()
        }),
        (t.prototype.cosh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.cosh(this.get(n, i)))
            return this
        }),
        (t.cosh = function (n) {
            return new e(n).cosh()
        }),
        (t.prototype.exp = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.exp(this.get(n, i)))
            return this
        }),
        (t.exp = function (n) {
            return new e(n).exp()
        }),
        (t.prototype.expm1 = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.expm1(this.get(n, i)))
            return this
        }),
        (t.expm1 = function (n) {
            return new e(n).expm1()
        }),
        (t.prototype.floor = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.floor(this.get(n, i)))
            return this
        }),
        (t.floor = function (n) {
            return new e(n).floor()
        }),
        (t.prototype.fround = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.fround(this.get(n, i)))
            return this
        }),
        (t.fround = function (n) {
            return new e(n).fround()
        }),
        (t.prototype.log = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.log(this.get(n, i)))
            return this
        }),
        (t.log = function (n) {
            return new e(n).log()
        }),
        (t.prototype.log1p = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.log1p(this.get(n, i)))
            return this
        }),
        (t.log1p = function (n) {
            return new e(n).log1p()
        }),
        (t.prototype.log10 = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.log10(this.get(n, i)))
            return this
        }),
        (t.log10 = function (n) {
            return new e(n).log10()
        }),
        (t.prototype.log2 = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.log2(this.get(n, i)))
            return this
        }),
        (t.log2 = function (n) {
            return new e(n).log2()
        }),
        (t.prototype.round = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.round(this.get(n, i)))
            return this
        }),
        (t.round = function (n) {
            return new e(n).round()
        }),
        (t.prototype.sign = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.sign(this.get(n, i)))
            return this
        }),
        (t.sign = function (n) {
            return new e(n).sign()
        }),
        (t.prototype.sin = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.sin(this.get(n, i)))
            return this
        }),
        (t.sin = function (n) {
            return new e(n).sin()
        }),
        (t.prototype.sinh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.sinh(this.get(n, i)))
            return this
        }),
        (t.sinh = function (n) {
            return new e(n).sinh()
        }),
        (t.prototype.sqrt = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.sqrt(this.get(n, i)))
            return this
        }),
        (t.sqrt = function (n) {
            return new e(n).sqrt()
        }),
        (t.prototype.tan = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.tan(this.get(n, i)))
            return this
        }),
        (t.tan = function (n) {
            return new e(n).tan()
        }),
        (t.prototype.tanh = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.tanh(this.get(n, i)))
            return this
        }),
        (t.tanh = function (n) {
            return new e(n).tanh()
        }),
        (t.prototype.trunc = function () {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) this.set(n, i, Math.trunc(this.get(n, i)))
            return this
        }),
        (t.trunc = function (n) {
            return new e(n).trunc()
        }),
        (t.pow = function (n, i) {
            return new e(n).pow(i)
        }),
        (t.prototype.pow = function (n) {
            return typeof n == 'number' ? this.powS(n) : this.powM(n)
        }),
        (t.prototype.powS = function (n) {
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++) this.set(i, s, Math.pow(this.get(i, s), n))
            return this
        }),
        (t.prototype.powM = function (n) {
            if (((n = e.checkMatrix(n)), this.rows !== n.rows || this.columns !== n.columns))
                throw new RangeError('Matrices dimensions must be equal')
            for (let i = 0; i < this.rows; i++)
                for (let s = 0; s < this.columns; s++)
                    this.set(i, s, Math.pow(this.get(i, s), n.get(i, s)))
            return this
        })
}
function Dt(t, e, r) {
    let n = r ? t.rows : t.rows - 1
    if (e < 0 || e > n) throw new RangeError('Row index out of range')
}
function Ht(t, e, r) {
    let n = r ? t.columns : t.columns - 1
    if (e < 0 || e > n) throw new RangeError('Column index out of range')
}
function Oe(t, e) {
    if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.columns))
        throw new RangeError('vector size must be the same as the number of columns')
    return e
}
function Fe(t, e) {
    if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.rows))
        throw new RangeError('vector size must be the same as the number of rows')
    return e
}
function Hp(t, e, r) {
    return {
        row: Bp(t, e),
        column: qp(t, r)
    }
}
function Bp(t, e) {
    if (typeof e != 'object') throw new TypeError('unexpected type for row indices')
    if (e.some((n) => n < 0 || n >= t.rows)) throw new RangeError('row indices are out of range')
    return Array.isArray(e) || (e = Array.from(e)), e
}
function qp(t, e) {
    if (typeof e != 'object') throw new TypeError('unexpected type for column indices')
    if (e.some((n) => n < 0 || n >= t.columns))
        throw new RangeError('column indices are out of range')
    return Array.isArray(e) || (e = Array.from(e)), e
}
function Fs(t, e, r, n, i) {
    if (arguments.length !== 5) throw new RangeError('expected 4 arguments')
    if (
        (jn('startRow', e),
        jn('endRow', r),
        jn('startColumn', n),
        jn('endColumn', i),
        e > r ||
            n > i ||
            e < 0 ||
            e >= t.rows ||
            r < 0 ||
            r >= t.rows ||
            n < 0 ||
            n >= t.columns ||
            i < 0 ||
            i >= t.columns)
    )
        throw new RangeError('Submatrix indices are out of range')
}
function _r(t, e = 0) {
    let r = []
    for (let n = 0; n < t; n++) r.push(e)
    return r
}
function jn(t, e) {
    if (typeof e != 'number') throw new TypeError(`${t} must be a number`)
}
function Le(t) {
    if (t.isEmpty()) throw new Error('Empty matrix has no elements to index')
}
function Up(t) {
    let e = _r(t.rows)
    for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[r] += t.get(r, n)
    return e
}
function Kp(t) {
    let e = _r(t.columns)
    for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[n] += t.get(r, n)
    return e
}
function Xp(t) {
    let e = 0
    for (let r = 0; r < t.rows; r++) for (let n = 0; n < t.columns; n++) e += t.get(r, n)
    return e
}
function Wp(t) {
    let e = _r(t.rows, 1)
    for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[r] *= t.get(r, n)
    return e
}
function Yp(t) {
    let e = _r(t.columns, 1)
    for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[n] *= t.get(r, n)
    return e
}
function Gp(t) {
    let e = 1
    for (let r = 0; r < t.rows; r++) for (let n = 0; n < t.columns; n++) e *= t.get(r, n)
    return e
}
function Zp(t, e, r) {
    const n = t.rows,
        i = t.columns,
        s = []
    for (let o = 0; o < n; o++) {
        let l = 0,
            u = 0,
            f = 0
        for (let c = 0; c < i; c++) (f = t.get(o, c) - r[o]), (l += f), (u += f * f)
        e ? s.push((u - (l * l) / i) / (i - 1)) : s.push((u - (l * l) / i) / i)
    }
    return s
}
function Qp(t, e, r) {
    const n = t.rows,
        i = t.columns,
        s = []
    for (let o = 0; o < i; o++) {
        let l = 0,
            u = 0,
            f = 0
        for (let c = 0; c < n; c++) (f = t.get(c, o) - r[o]), (l += f), (u += f * f)
        e ? s.push((u - (l * l) / n) / (n - 1)) : s.push((u - (l * l) / n) / n)
    }
    return s
}
function Jp(t, e, r) {
    const n = t.rows,
        i = t.columns,
        s = n * i
    let o = 0,
        l = 0,
        u = 0
    for (let f = 0; f < n; f++)
        for (let c = 0; c < i; c++) (u = t.get(f, c) - r), (o += u), (l += u * u)
    return e ? (l - (o * o) / s) / (s - 1) : (l - (o * o) / s) / s
}
function t0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e[r])
}
function e0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e[n])
}
function n0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e)
}
function r0(t) {
    const e = []
    for (let r = 0; r < t.rows; r++) {
        let n = 0
        for (let i = 0; i < t.columns; i++) n += Math.pow(t.get(r, i), 2) / (t.columns - 1)
        e.push(Math.sqrt(n))
    }
    return e
}
function i0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e[r])
}
function s0(t) {
    const e = []
    for (let r = 0; r < t.columns; r++) {
        let n = 0
        for (let i = 0; i < t.rows; i++) n += Math.pow(t.get(i, r), 2) / (t.rows - 1)
        e.push(Math.sqrt(n))
    }
    return e
}
function o0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e[n])
}
function l0(t) {
    const e = t.size - 1
    let r = 0
    for (let n = 0; n < t.columns; n++)
        for (let i = 0; i < t.rows; i++) r += Math.pow(t.get(i, n), 2) / e
    return Math.sqrt(r)
}
function u0(t, e) {
    for (let r = 0; r < t.rows; r++)
        for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e)
}
class st {
    static from1DArray(e, r, n) {
        if (e * r !== n.length) throw new RangeError('data length does not match given dimensions')
        let s = new Q(e, r)
        for (let o = 0; o < e; o++) for (let l = 0; l < r; l++) s.set(o, l, n[o * r + l])
        return s
    }
    static rowVector(e) {
        let r = new Q(1, e.length)
        for (let n = 0; n < e.length; n++) r.set(0, n, e[n])
        return r
    }
    static columnVector(e) {
        let r = new Q(e.length, 1)
        for (let n = 0; n < e.length; n++) r.set(n, 0, e[n])
        return r
    }
    static zeros(e, r) {
        return new Q(e, r)
    }
    static ones(e, r) {
        return new Q(e, r).fill(1)
    }
    static rand(e, r, n = {}) {
        if (typeof n != 'object') throw new TypeError('options must be an object')
        const { random: i = Math.random } = n
        let s = new Q(e, r)
        for (let o = 0; o < e; o++) for (let l = 0; l < r; l++) s.set(o, l, i())
        return s
    }
    static randInt(e, r, n = {}) {
        if (typeof n != 'object') throw new TypeError('options must be an object')
        const { min: i = 0, max: s = 1e3, random: o = Math.random } = n
        if (!Number.isInteger(i)) throw new TypeError('min must be an integer')
        if (!Number.isInteger(s)) throw new TypeError('max must be an integer')
        if (i >= s) throw new RangeError('min must be smaller than max')
        let l = s - i,
            u = new Q(e, r)
        for (let f = 0; f < e; f++)
            for (let c = 0; c < r; c++) {
                let a = i + Math.round(o() * l)
                u.set(f, c, a)
            }
        return u
    }
    static eye(e, r, n) {
        r === void 0 && (r = e), n === void 0 && (n = 1)
        let i = Math.min(e, r),
            s = this.zeros(e, r)
        for (let o = 0; o < i; o++) s.set(o, o, n)
        return s
    }
    static diag(e, r, n) {
        let i = e.length
        r === void 0 && (r = i), n === void 0 && (n = r)
        let s = Math.min(i, r, n),
            o = this.zeros(r, n)
        for (let l = 0; l < s; l++) o.set(l, l, e[l])
        return o
    }
    static min(e, r) {
        ;(e = this.checkMatrix(e)), (r = this.checkMatrix(r))
        let n = e.rows,
            i = e.columns,
            s = new Q(n, i)
        for (let o = 0; o < n; o++)
            for (let l = 0; l < i; l++) s.set(o, l, Math.min(e.get(o, l), r.get(o, l)))
        return s
    }
    static max(e, r) {
        ;(e = this.checkMatrix(e)), (r = this.checkMatrix(r))
        let n = e.rows,
            i = e.columns,
            s = new this(n, i)
        for (let o = 0; o < n; o++)
            for (let l = 0; l < i; l++) s.set(o, l, Math.max(e.get(o, l), r.get(o, l)))
        return s
    }
    static checkMatrix(e) {
        return st.isMatrix(e) ? e : new Q(e)
    }
    static isMatrix(e) {
        return e != null && e.klass === 'Matrix'
    }
    get size() {
        return this.rows * this.columns
    }
    apply(e) {
        if (typeof e != 'function') throw new TypeError('callback must be a function')
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) e.call(this, r, n)
        return this
    }
    to1DArray() {
        let e = []
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) e.push(this.get(r, n))
        return e
    }
    to2DArray() {
        let e = []
        for (let r = 0; r < this.rows; r++) {
            e.push([])
            for (let n = 0; n < this.columns; n++) e[r].push(this.get(r, n))
        }
        return e
    }
    toJSON() {
        return this.to2DArray()
    }
    isRowVector() {
        return this.rows === 1
    }
    isColumnVector() {
        return this.columns === 1
    }
    isVector() {
        return this.rows === 1 || this.columns === 1
    }
    isSquare() {
        return this.rows === this.columns
    }
    isEmpty() {
        return this.rows === 0 || this.columns === 0
    }
    isSymmetric() {
        if (this.isSquare()) {
            for (let e = 0; e < this.rows; e++)
                for (let r = 0; r <= e; r++) if (this.get(e, r) !== this.get(r, e)) return !1
            return !0
        }
        return !1
    }
    isEchelonForm() {
        let e = 0,
            r = 0,
            n = -1,
            i = !0,
            s = !1
        for (; e < this.rows && i; ) {
            for (r = 0, s = !1; r < this.columns && s === !1; )
                this.get(e, r) === 0
                    ? r++
                    : this.get(e, r) === 1 && r > n
                      ? ((s = !0), (n = r))
                      : ((i = !1), (s = !0))
            e++
        }
        return i
    }
    isReducedEchelonForm() {
        let e = 0,
            r = 0,
            n = -1,
            i = !0,
            s = !1
        for (; e < this.rows && i; ) {
            for (r = 0, s = !1; r < this.columns && s === !1; )
                this.get(e, r) === 0
                    ? r++
                    : this.get(e, r) === 1 && r > n
                      ? ((s = !0), (n = r))
                      : ((i = !1), (s = !0))
            for (let o = r + 1; o < this.rows; o++) this.get(e, o) !== 0 && (i = !1)
            e++
        }
        return i
    }
    echelonForm() {
        let e = this.clone(),
            r = 0,
            n = 0
        for (; r < e.rows && n < e.columns; ) {
            let i = r
            for (let s = r; s < e.rows; s++) e.get(s, n) > e.get(i, n) && (i = s)
            if (e.get(i, n) === 0) n++
            else {
                e.swapRows(r, i)
                let s = e.get(r, n)
                for (let o = n; o < e.columns; o++) e.set(r, o, e.get(r, o) / s)
                for (let o = r + 1; o < e.rows; o++) {
                    let l = e.get(o, n) / e.get(r, n)
                    e.set(o, n, 0)
                    for (let u = n + 1; u < e.columns; u++)
                        e.set(o, u, e.get(o, u) - e.get(r, u) * l)
                }
                r++, n++
            }
        }
        return e
    }
    reducedEchelonForm() {
        let e = this.echelonForm(),
            r = e.columns,
            n = e.rows,
            i = n - 1
        for (; i >= 0; )
            if (e.maxRow(i) === 0) i--
            else {
                let s = 0,
                    o = !1
                for (; s < n && o === !1; ) e.get(i, s) === 1 ? (o = !0) : s++
                for (let l = 0; l < i; l++) {
                    let u = e.get(l, s)
                    for (let f = s; f < r; f++) {
                        let c = e.get(l, f) - u * e.get(i, f)
                        e.set(l, f, c)
                    }
                }
                i--
            }
        return e
    }
    set() {
        throw new Error('set method is unimplemented')
    }
    get() {
        throw new Error('get method is unimplemented')
    }
    repeat(e = {}) {
        if (typeof e != 'object') throw new TypeError('options must be an object')
        const { rows: r = 1, columns: n = 1 } = e
        if (!Number.isInteger(r) || r <= 0) throw new TypeError('rows must be a positive integer')
        if (!Number.isInteger(n) || n <= 0)
            throw new TypeError('columns must be a positive integer')
        let i = new Q(this.rows * r, this.columns * n)
        for (let s = 0; s < r; s++)
            for (let o = 0; o < n; o++) i.setSubMatrix(this, this.rows * s, this.columns * o)
        return i
    }
    fill(e) {
        for (let r = 0; r < this.rows; r++) for (let n = 0; n < this.columns; n++) this.set(r, n, e)
        return this
    }
    neg() {
        return this.mulS(-1)
    }
    getRow(e) {
        Dt(this, e)
        let r = []
        for (let n = 0; n < this.columns; n++) r.push(this.get(e, n))
        return r
    }
    getRowVector(e) {
        return Q.rowVector(this.getRow(e))
    }
    setRow(e, r) {
        Dt(this, e), (r = Oe(this, r))
        for (let n = 0; n < this.columns; n++) this.set(e, n, r[n])
        return this
    }
    swapRows(e, r) {
        Dt(this, e), Dt(this, r)
        for (let n = 0; n < this.columns; n++) {
            let i = this.get(e, n)
            this.set(e, n, this.get(r, n)), this.set(r, n, i)
        }
        return this
    }
    getColumn(e) {
        Ht(this, e)
        let r = []
        for (let n = 0; n < this.rows; n++) r.push(this.get(n, e))
        return r
    }
    getColumnVector(e) {
        return Q.columnVector(this.getColumn(e))
    }
    setColumn(e, r) {
        Ht(this, e), (r = Fe(this, r))
        for (let n = 0; n < this.rows; n++) this.set(n, e, r[n])
        return this
    }
    swapColumns(e, r) {
        Ht(this, e), Ht(this, r)
        for (let n = 0; n < this.rows; n++) {
            let i = this.get(n, e)
            this.set(n, e, this.get(n, r)), this.set(n, r, i)
        }
        return this
    }
    addRowVector(e) {
        e = Oe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) + e[n])
        return this
    }
    subRowVector(e) {
        e = Oe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) - e[n])
        return this
    }
    mulRowVector(e) {
        e = Oe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) * e[n])
        return this
    }
    divRowVector(e) {
        e = Oe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) / e[n])
        return this
    }
    addColumnVector(e) {
        e = Fe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) + e[r])
        return this
    }
    subColumnVector(e) {
        e = Fe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) - e[r])
        return this
    }
    mulColumnVector(e) {
        e = Fe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) * e[r])
        return this
    }
    divColumnVector(e) {
        e = Fe(this, e)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) / e[r])
        return this
    }
    mulRow(e, r) {
        Dt(this, e)
        for (let n = 0; n < this.columns; n++) this.set(e, n, this.get(e, n) * r)
        return this
    }
    mulColumn(e, r) {
        Ht(this, e)
        for (let n = 0; n < this.rows; n++) this.set(n, e, this.get(n, e) * r)
        return this
    }
    max() {
        if (this.isEmpty()) return NaN
        let e = this.get(0, 0)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.get(r, n) > e && (e = this.get(r, n))
        return e
    }
    maxIndex() {
        Le(this)
        let e = this.get(0, 0),
            r = [0, 0]
        for (let n = 0; n < this.rows; n++)
            for (let i = 0; i < this.columns; i++)
                this.get(n, i) > e && ((e = this.get(n, i)), (r[0] = n), (r[1] = i))
        return r
    }
    min() {
        if (this.isEmpty()) return NaN
        let e = this.get(0, 0)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) this.get(r, n) < e && (e = this.get(r, n))
        return e
    }
    minIndex() {
        Le(this)
        let e = this.get(0, 0),
            r = [0, 0]
        for (let n = 0; n < this.rows; n++)
            for (let i = 0; i < this.columns; i++)
                this.get(n, i) < e && ((e = this.get(n, i)), (r[0] = n), (r[1] = i))
        return r
    }
    maxRow(e) {
        if ((Dt(this, e), this.isEmpty())) return NaN
        let r = this.get(e, 0)
        for (let n = 1; n < this.columns; n++) this.get(e, n) > r && (r = this.get(e, n))
        return r
    }
    maxRowIndex(e) {
        Dt(this, e), Le(this)
        let r = this.get(e, 0),
            n = [e, 0]
        for (let i = 1; i < this.columns; i++)
            this.get(e, i) > r && ((r = this.get(e, i)), (n[1] = i))
        return n
    }
    minRow(e) {
        if ((Dt(this, e), this.isEmpty())) return NaN
        let r = this.get(e, 0)
        for (let n = 1; n < this.columns; n++) this.get(e, n) < r && (r = this.get(e, n))
        return r
    }
    minRowIndex(e) {
        Dt(this, e), Le(this)
        let r = this.get(e, 0),
            n = [e, 0]
        for (let i = 1; i < this.columns; i++)
            this.get(e, i) < r && ((r = this.get(e, i)), (n[1] = i))
        return n
    }
    maxColumn(e) {
        if ((Ht(this, e), this.isEmpty())) return NaN
        let r = this.get(0, e)
        for (let n = 1; n < this.rows; n++) this.get(n, e) > r && (r = this.get(n, e))
        return r
    }
    maxColumnIndex(e) {
        Ht(this, e), Le(this)
        let r = this.get(0, e),
            n = [0, e]
        for (let i = 1; i < this.rows; i++) this.get(i, e) > r && ((r = this.get(i, e)), (n[0] = i))
        return n
    }
    minColumn(e) {
        if ((Ht(this, e), this.isEmpty())) return NaN
        let r = this.get(0, e)
        for (let n = 1; n < this.rows; n++) this.get(n, e) < r && (r = this.get(n, e))
        return r
    }
    minColumnIndex(e) {
        Ht(this, e), Le(this)
        let r = this.get(0, e),
            n = [0, e]
        for (let i = 1; i < this.rows; i++) this.get(i, e) < r && ((r = this.get(i, e)), (n[0] = i))
        return n
    }
    diag() {
        let e = Math.min(this.rows, this.columns),
            r = []
        for (let n = 0; n < e; n++) r.push(this.get(n, n))
        return r
    }
    norm(e = 'frobenius') {
        let r = 0
        if (e === 'max') return this.max()
        if (e === 'frobenius') {
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++) r = r + this.get(n, i) * this.get(n, i)
            return Math.sqrt(r)
        } else throw new RangeError(`unknown norm type: ${e}`)
    }
    cumulativeSum() {
        let e = 0
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) (e += this.get(r, n)), this.set(r, n, e)
        return this
    }
    dot(e) {
        st.isMatrix(e) && (e = e.to1DArray())
        let r = this.to1DArray()
        if (r.length !== e.length) throw new RangeError('vectors do not have the same size')
        let n = 0
        for (let i = 0; i < r.length; i++) n += r[i] * e[i]
        return n
    }
    mmul(e) {
        e = Q.checkMatrix(e)
        let r = this.rows,
            n = this.columns,
            i = e.columns,
            s = new Q(r, i),
            o = new Float64Array(n)
        for (let l = 0; l < i; l++) {
            for (let u = 0; u < n; u++) o[u] = e.get(u, l)
            for (let u = 0; u < r; u++) {
                let f = 0
                for (let c = 0; c < n; c++) f += this.get(u, c) * o[c]
                s.set(u, l, f)
            }
        }
        return s
    }
    strassen2x2(e) {
        e = Q.checkMatrix(e)
        let r = new Q(2, 2)
        const n = this.get(0, 0),
            i = e.get(0, 0),
            s = this.get(0, 1),
            o = e.get(0, 1),
            l = this.get(1, 0),
            u = e.get(1, 0),
            f = this.get(1, 1),
            c = e.get(1, 1),
            a = (n + f) * (i + c),
            h = (l + f) * i,
            g = n * (o - c),
            w = f * (u - i),
            y = (n + s) * c,
            _ = (l - n) * (i + o),
            d = (s - f) * (u + c),
            M = a + w - y + d,
            $ = g + y,
            m = h + w,
            S = a - h + g + _
        return r.set(0, 0, M), r.set(0, 1, $), r.set(1, 0, m), r.set(1, 1, S), r
    }
    strassen3x3(e) {
        e = Q.checkMatrix(e)
        let r = new Q(3, 3)
        const n = this.get(0, 0),
            i = this.get(0, 1),
            s = this.get(0, 2),
            o = this.get(1, 0),
            l = this.get(1, 1),
            u = this.get(1, 2),
            f = this.get(2, 0),
            c = this.get(2, 1),
            a = this.get(2, 2),
            h = e.get(0, 0),
            g = e.get(0, 1),
            w = e.get(0, 2),
            y = e.get(1, 0),
            _ = e.get(1, 1),
            d = e.get(1, 2),
            M = e.get(2, 0),
            $ = e.get(2, 1),
            m = e.get(2, 2),
            S = (n + i + s - o - l - c - a) * _,
            T = (n - o) * (-g + _),
            z = l * (-h + g + y - _ - d - M + m),
            H = (-n + o + l) * (h - g + _),
            G = (o + l) * (-h + g),
            X = n * h,
            tt = (-n + f + c) * (h - w + d),
            ct = (-n + f) * (w - d),
            it = (f + c) * (-h + w),
            x = (n + i + s - l - u - f - c) * d,
            O = c * (-h + w + y - _ - d - M + $),
            b = (-s + c + a) * (_ + M - $),
            I = (s - a) * (_ - $),
            P = s * M,
            U = (c + a) * (-M + $),
            K = (-s + l + u) * (d + M - m),
            et = (s - u) * (d - m),
            rt = (l + u) * (-M + m),
            _t = i * y,
            ht = u * $,
            wt = o * w,
            R = f * g,
            A = a * m,
            D = X + P + _t,
            B = S + H + G + X + b + P + U,
            ot = X + tt + it + x + P + K + rt,
            fe = T + z + H + X + P + K + et,
            kt = T + H + G + X + ht,
            p = P + K + et + rt + wt,
            v = X + tt + ct + O + b + I + P,
            E = b + I + P + U + R,
            N = X + tt + ct + it + A
        return (
            r.set(0, 0, D),
            r.set(0, 1, B),
            r.set(0, 2, ot),
            r.set(1, 0, fe),
            r.set(1, 1, kt),
            r.set(1, 2, p),
            r.set(2, 0, v),
            r.set(2, 1, E),
            r.set(2, 2, N),
            r
        )
    }
    mmulStrassen(e) {
        e = Q.checkMatrix(e)
        let r = this.clone(),
            n = r.rows,
            i = r.columns,
            s = e.rows,
            o = e.columns
        i !== s &&
            console.warn(`Multiplying ${n} x ${i} and ${s} x ${o} matrix: dimensions do not match.`)
        function l(a, h, g) {
            let w = a.rows,
                y = a.columns
            if (w === h && y === g) return a
            {
                let _ = st.zeros(h, g)
                return (_ = _.setSubMatrix(a, 0, 0)), _
            }
        }
        let u = Math.max(n, s),
            f = Math.max(i, o)
        ;(r = l(r, u, f)), (e = l(e, u, f))
        function c(a, h, g, w) {
            if (g <= 512 || w <= 512) return a.mmul(h)
            g % 2 === 1 && w % 2 === 1
                ? ((a = l(a, g + 1, w + 1)), (h = l(h, g + 1, w + 1)))
                : g % 2 === 1
                  ? ((a = l(a, g + 1, w)), (h = l(h, g + 1, w)))
                  : w % 2 === 1 && ((a = l(a, g, w + 1)), (h = l(h, g, w + 1)))
            let y = parseInt(a.rows / 2, 10),
                _ = parseInt(a.columns / 2, 10),
                d = a.subMatrix(0, y - 1, 0, _ - 1),
                M = h.subMatrix(0, y - 1, 0, _ - 1),
                $ = a.subMatrix(0, y - 1, _, a.columns - 1),
                m = h.subMatrix(0, y - 1, _, h.columns - 1),
                S = a.subMatrix(y, a.rows - 1, 0, _ - 1),
                T = h.subMatrix(y, h.rows - 1, 0, _ - 1),
                z = a.subMatrix(y, a.rows - 1, _, a.columns - 1),
                H = h.subMatrix(y, h.rows - 1, _, h.columns - 1),
                G = c(st.add(d, z), st.add(M, H), y, _),
                X = c(st.add(S, z), M, y, _),
                tt = c(d, st.sub(m, H), y, _),
                ct = c(z, st.sub(T, M), y, _),
                it = c(st.add(d, $), H, y, _),
                x = c(st.sub(S, d), st.add(M, m), y, _),
                O = c(st.sub($, z), st.add(T, H), y, _),
                b = st.add(G, ct)
            b.sub(it), b.add(O)
            let I = st.add(tt, it),
                P = st.add(X, ct),
                U = st.sub(G, X)
            U.add(tt), U.add(x)
            let K = st.zeros(2 * b.rows, 2 * b.columns)
            return (
                (K = K.setSubMatrix(b, 0, 0)),
                (K = K.setSubMatrix(I, b.rows, 0)),
                (K = K.setSubMatrix(P, 0, b.columns)),
                (K = K.setSubMatrix(U, b.rows, b.columns)),
                K.subMatrix(0, g - 1, 0, w - 1)
            )
        }
        return c(r, e, u, f)
    }
    scaleRows(e = {}) {
        if (typeof e != 'object') throw new TypeError('options must be an object')
        const { min: r = 0, max: n = 1 } = e
        if (!Number.isFinite(r)) throw new TypeError('min must be a number')
        if (!Number.isFinite(n)) throw new TypeError('max must be a number')
        if (r >= n) throw new RangeError('min must be smaller than max')
        let i = new Q(this.rows, this.columns)
        for (let s = 0; s < this.rows; s++) {
            const o = this.getRow(s)
            o.length > 0 && Os(o, { min: r, max: n, output: o }), i.setRow(s, o)
        }
        return i
    }
    scaleColumns(e = {}) {
        if (typeof e != 'object') throw new TypeError('options must be an object')
        const { min: r = 0, max: n = 1 } = e
        if (!Number.isFinite(r)) throw new TypeError('min must be a number')
        if (!Number.isFinite(n)) throw new TypeError('max must be a number')
        if (r >= n) throw new RangeError('min must be smaller than max')
        let i = new Q(this.rows, this.columns)
        for (let s = 0; s < this.columns; s++) {
            const o = this.getColumn(s)
            o.length &&
                Os(o, {
                    min: r,
                    max: n,
                    output: o
                }),
                i.setColumn(s, o)
        }
        return i
    }
    flipRows() {
        const e = Math.ceil(this.columns / 2)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < e; n++) {
                let i = this.get(r, n),
                    s = this.get(r, this.columns - 1 - n)
                this.set(r, n, s), this.set(r, this.columns - 1 - n, i)
            }
        return this
    }
    flipColumns() {
        const e = Math.ceil(this.rows / 2)
        for (let r = 0; r < this.columns; r++)
            for (let n = 0; n < e; n++) {
                let i = this.get(n, r),
                    s = this.get(this.rows - 1 - n, r)
                this.set(n, r, s), this.set(this.rows - 1 - n, r, i)
            }
        return this
    }
    kroneckerProduct(e) {
        e = Q.checkMatrix(e)
        let r = this.rows,
            n = this.columns,
            i = e.rows,
            s = e.columns,
            o = new Q(r * i, n * s)
        for (let l = 0; l < r; l++)
            for (let u = 0; u < n; u++)
                for (let f = 0; f < i; f++)
                    for (let c = 0; c < s; c++)
                        o.set(i * l + f, s * u + c, this.get(l, u) * e.get(f, c))
        return o
    }
    kroneckerSum(e) {
        if (((e = Q.checkMatrix(e)), !this.isSquare() || !e.isSquare()))
            throw new Error('Kronecker Sum needs two Square Matrices')
        let r = this.rows,
            n = e.rows,
            i = this.kroneckerProduct(Q.eye(n, n)),
            s = Q.eye(r, r).kroneckerProduct(e)
        return i.add(s)
    }
    transpose() {
        let e = new Q(this.columns, this.rows)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) e.set(n, r, this.get(r, n))
        return e
    }
    sortRows(e = zs) {
        for (let r = 0; r < this.rows; r++) this.setRow(r, this.getRow(r).sort(e))
        return this
    }
    sortColumns(e = zs) {
        for (let r = 0; r < this.columns; r++) this.setColumn(r, this.getColumn(r).sort(e))
        return this
    }
    subMatrix(e, r, n, i) {
        Fs(this, e, r, n, i)
        let s = new Q(r - e + 1, i - n + 1)
        for (let o = e; o <= r; o++)
            for (let l = n; l <= i; l++) s.set(o - e, l - n, this.get(o, l))
        return s
    }
    subMatrixRow(e, r, n) {
        if (
            (r === void 0 && (r = 0),
            n === void 0 && (n = this.columns - 1),
            r > n || r < 0 || r >= this.columns || n < 0 || n >= this.columns)
        )
            throw new RangeError('Argument out of range')
        let i = new Q(e.length, n - r + 1)
        for (let s = 0; s < e.length; s++)
            for (let o = r; o <= n; o++) {
                if (e[s] < 0 || e[s] >= this.rows)
                    throw new RangeError(`Row index out of range: ${e[s]}`)
                i.set(s, o - r, this.get(e[s], o))
            }
        return i
    }
    subMatrixColumn(e, r, n) {
        if (
            (r === void 0 && (r = 0),
            n === void 0 && (n = this.rows - 1),
            r > n || r < 0 || r >= this.rows || n < 0 || n >= this.rows)
        )
            throw new RangeError('Argument out of range')
        let i = new Q(n - r + 1, e.length)
        for (let s = 0; s < e.length; s++)
            for (let o = r; o <= n; o++) {
                if (e[s] < 0 || e[s] >= this.columns)
                    throw new RangeError(`Column index out of range: ${e[s]}`)
                i.set(o - r, s, this.get(o, e[s]))
            }
        return i
    }
    setSubMatrix(e, r, n) {
        if (((e = Q.checkMatrix(e)), e.isEmpty())) return this
        let i = r + e.rows - 1,
            s = n + e.columns - 1
        Fs(this, r, i, n, s)
        for (let o = 0; o < e.rows; o++)
            for (let l = 0; l < e.columns; l++) this.set(r + o, n + l, e.get(o, l))
        return this
    }
    selection(e, r) {
        let n = Hp(this, e, r),
            i = new Q(e.length, r.length)
        for (let s = 0; s < n.row.length; s++) {
            let o = n.row[s]
            for (let l = 0; l < n.column.length; l++) {
                let u = n.column[l]
                i.set(s, l, this.get(o, u))
            }
        }
        return i
    }
    trace() {
        let e = Math.min(this.rows, this.columns),
            r = 0
        for (let n = 0; n < e; n++) r += this.get(n, n)
        return r
    }
    clone() {
        let e = new Q(this.rows, this.columns)
        for (let r = 0; r < this.rows; r++)
            for (let n = 0; n < this.columns; n++) e.set(r, n, this.get(r, n))
        return e
    }
    sum(e) {
        switch (e) {
            case 'row':
                return Up(this)
            case 'column':
                return Kp(this)
            case void 0:
                return Xp(this)
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    product(e) {
        switch (e) {
            case 'row':
                return Wp(this)
            case 'column':
                return Yp(this)
            case void 0:
                return Gp(this)
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    mean(e) {
        const r = this.sum(e)
        switch (e) {
            case 'row': {
                for (let n = 0; n < this.rows; n++) r[n] /= this.columns
                return r
            }
            case 'column': {
                for (let n = 0; n < this.columns; n++) r[n] /= this.rows
                return r
            }
            case void 0:
                return r / this.size
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    variance(e, r = {}) {
        if ((typeof e == 'object' && ((r = e), (e = void 0)), typeof r != 'object'))
            throw new TypeError('options must be an object')
        const { unbiased: n = !0, mean: i = this.mean(e) } = r
        if (typeof n != 'boolean') throw new TypeError('unbiased must be a boolean')
        switch (e) {
            case 'row': {
                if (!Array.isArray(i)) throw new TypeError('mean must be an array')
                return Zp(this, n, i)
            }
            case 'column': {
                if (!Array.isArray(i)) throw new TypeError('mean must be an array')
                return Qp(this, n, i)
            }
            case void 0: {
                if (typeof i != 'number') throw new TypeError('mean must be a number')
                return Jp(this, n, i)
            }
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    standardDeviation(e, r) {
        typeof e == 'object' && ((r = e), (e = void 0))
        const n = this.variance(e, r)
        if (e === void 0) return Math.sqrt(n)
        for (let i = 0; i < n.length; i++) n[i] = Math.sqrt(n[i])
        return n
    }
    center(e, r = {}) {
        if ((typeof e == 'object' && ((r = e), (e = void 0)), typeof r != 'object'))
            throw new TypeError('options must be an object')
        const { center: n = this.mean(e) } = r
        switch (e) {
            case 'row': {
                if (!Array.isArray(n)) throw new TypeError('center must be an array')
                return t0(this, n), this
            }
            case 'column': {
                if (!Array.isArray(n)) throw new TypeError('center must be an array')
                return e0(this, n), this
            }
            case void 0: {
                if (typeof n != 'number') throw new TypeError('center must be a number')
                return n0(this, n), this
            }
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    scale(e, r = {}) {
        if ((typeof e == 'object' && ((r = e), (e = void 0)), typeof r != 'object'))
            throw new TypeError('options must be an object')
        let n = r.scale
        switch (e) {
            case 'row': {
                if (n === void 0) n = r0(this)
                else if (!Array.isArray(n)) throw new TypeError('scale must be an array')
                return i0(this, n), this
            }
            case 'column': {
                if (n === void 0) n = s0(this)
                else if (!Array.isArray(n)) throw new TypeError('scale must be an array')
                return o0(this, n), this
            }
            case void 0: {
                if (n === void 0) n = l0(this)
                else if (typeof n != 'number') throw new TypeError('scale must be a number')
                return u0(this, n), this
            }
            default:
                throw new Error(`invalid option: ${e}`)
        }
    }
    toString(e) {
        return wl(this, e)
    }
}
st.prototype.klass = 'Matrix'
typeof Symbol < 'u' && (st.prototype[Symbol.for('nodejs.util.inspect.custom')] = zp)
function zs(t, e) {
    return t - e
}
st.random = st.rand
st.randomInt = st.randInt
st.diagonal = st.diag
st.prototype.diagonal = st.prototype.diag
st.identity = st.eye
st.prototype.negate = st.prototype.neg
st.prototype.tensorProduct = st.prototype.kroneckerProduct
class Q extends st {
    constructor(e, r) {
        if ((super(), Q.isMatrix(e))) return e.clone()
        if (Number.isInteger(e) && e >= 0)
            if (((this.data = []), Number.isInteger(r) && r >= 0))
                for (let n = 0; n < e; n++) this.data.push(new Float64Array(r))
            else throw new TypeError('nColumns must be a positive integer')
        else if (Array.isArray(e)) {
            const n = e
            if (((e = n.length), (r = e ? n[0].length : 0), typeof r != 'number'))
                throw new TypeError('Data must be a 2D array with at least one element')
            this.data = []
            for (let i = 0; i < e; i++) {
                if (n[i].length !== r) throw new RangeError('Inconsistent array dimensions')
                this.data.push(Float64Array.from(n[i]))
            }
        } else throw new TypeError('First argument must be a positive number or an array')
        ;(this.rows = e), (this.columns = r)
    }
    set(e, r, n) {
        return (this.data[e][r] = n), this
    }
    get(e, r) {
        return this.data[e][r]
    }
    removeRow(e) {
        return Dt(this, e), this.data.splice(e, 1), (this.rows -= 1), this
    }
    addRow(e, r) {
        return (
            r === void 0 && ((r = e), (e = this.rows)),
            Dt(this, e, !0),
            (r = Float64Array.from(Oe(this, r))),
            this.data.splice(e, 0, r),
            (this.rows += 1),
            this
        )
    }
    removeColumn(e) {
        Ht(this, e)
        for (let r = 0; r < this.rows; r++) {
            const n = new Float64Array(this.columns - 1)
            for (let i = 0; i < e; i++) n[i] = this.data[r][i]
            for (let i = e + 1; i < this.columns; i++) n[i - 1] = this.data[r][i]
            this.data[r] = n
        }
        return (this.columns -= 1), this
    }
    addColumn(e, r) {
        typeof r > 'u' && ((r = e), (e = this.columns)), Ht(this, e, !0), (r = Fe(this, r))
        for (let n = 0; n < this.rows; n++) {
            const i = new Float64Array(this.columns + 1)
            let s = 0
            for (; s < e; s++) i[s] = this.data[n][s]
            for (i[s++] = r[n]; s < this.columns + 1; s++) i[s] = this.data[n][s - 1]
            this.data[n] = i
        }
        return (this.columns += 1), this
    }
}
Dp(st, Q)
function jr(t, e, r) {
    const n = e.x - t.x,
        i = e.y - t.y,
        s = Math.sqrt(n * n + i * i),
        o = n / s,
        l = i / s,
        u = t.x + (r.nodeRadius - 1) * o,
        f = t.y + (r.nodeRadius - 1) * l,
        c = e.x - r.markerPadding * o,
        a = e.y - r.markerPadding * l
    return `M${u},${f}
          L${c},${a}`
}
function Lr(t, e, r) {
    const n = new Q([[t.x, t.y]]),
        i = new Q([[e.x, e.y]]),
        s = Q.subtract(i, n),
        o = s.norm('frobenius'),
        l = s.divide(o),
        u = yl(10),
        f = Be(l, -u)
            .multiply(r.nodeRadius - 1)
            .add(n),
        c = Q.multiply(l, -1),
        a = Be(c, u)
            .multiply(r.nodeRadius)
            .add(i)
            .add(Be(c, u).multiply(2 * r.markerBoxSize)),
        h = 1.2 * o
    return `M${f.get(0, 0)},${f.get(0, 1)}
          A${h},${h},0,0,1,${a.get(0, 0)},${a.get(0, 1)}`
}
function As(t, e, r) {
    const n = new Q([[t.x, t.y]]),
        i = new Q([e])
    n.get(0, 0) === i.get(0, 0) && n.get(0, 1) === i.get(0, 1) && i.add([[0, 1]])
    const s = Q.subtract(n, i),
        o = s.divide(s.norm('frobenius')),
        l = yl(40),
        u = Be(o, l)
            .multiply(r.nodeRadius - 1)
            .add(n),
        f = Be(o, -l)
            .multiply(r.nodeRadius)
            .add(n)
            .add(Be(o, -l).multiply(2 * r.markerBoxSize))
    return `M${u.get(0, 0)},${u.get(0, 1)}
          A${r.nodeRadius},${r.nodeRadius},0,1,0,${f.get(0, 0)},${f.get(0, 1)}`
}
function Vs(t, e) {
    return `M${t[0]},${t[1]}
          L${e[0]},${e[1]}`
}
function yl(t) {
    return t * (Math.PI / 180)
}
function Be(t, e) {
    const r = t.get(0, 0),
        n = t.get(0, 1)
    return new Q([[r * Math.cos(e) - n * Math.sin(e), r * Math.sin(e) + n * Math.cos(e)]])
}
var f0 =
    typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : typeof self < 'u'
              ? self
              : {}
function c0(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
}
var _l = { exports: {} }
;(function (t, e) {
    ;(function (r, n) {
        t.exports = n()
    })(f0, function () {
        function r(o) {
            o = o
                .replace(/,/g, ' ')
                .replace(/([^eE])-/g, '$1 -')
                .replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, ' $1 ')
                .replace(/\s+/g, ' ')
                .replace(
                    /(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g,
                    (b, I, P, U) => I + U.replaceAll('.', ' .')
                )
            var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, '|$1').split('|'),
                u = l.length,
                f,
                c,
                a,
                h,
                g,
                w = [],
                y = [],
                _,
                d,
                M = 0,
                $ = 0,
                m = 0,
                S = 0,
                T = 0,
                z = 0,
                H = 0,
                G = 0,
                X = 0,
                tt = 0,
                ct = 0,
                it = 0,
                x = 0,
                O = ''
            for (f = 1; f < u; f++) {
                if (
                    ((c = l[f]),
                    (a = c.substring(0, 1)),
                    (h = a.toLowerCase()),
                    (w = c
                        .replace(a, '')
                        .trim()
                        .split(' ')
                        .filter(function (b) {
                            return b !== ''
                        })),
                    (y = w),
                    (w = w.map(parseFloat)),
                    (_ = w.length),
                    h === 'm')
                ) {
                    if (
                        ((O += 'M '),
                        a === 'm' ? ((m += w[0]), (S += w[1])) : ((m = w[0]), (S = w[1])),
                        (M = m),
                        ($ = S),
                        (O += m + ' ' + S + ' '),
                        _ > 2)
                    )
                        for (d = 0; d < _; d += 2)
                            a === 'm'
                                ? ((m += w[d]), (S += w[d + 1]))
                                : ((m = w[d]), (S = w[d + 1])),
                                (O += 'L ' + m + ' ' + S + ' ')
                } else if (h === 'l')
                    for (d = 0; d < _; d += 2)
                        a === 'l' ? ((m += w[d]), (S += w[d + 1])) : ((m = w[d]), (S = w[d + 1])),
                            (O += 'L ' + m + ' ' + S + ' ')
                else if (h === 'h')
                    for (d = 0; d < _; d++)
                        a === 'h' ? (m += w[d]) : (m = w[d]), (O += 'L ' + m + ' ' + S + ' ')
                else if (h === 'v')
                    for (d = 0; d < _; d++)
                        a === 'v' ? (S += w[d]) : (S = w[d]), (O += 'L ' + m + ' ' + S + ' ')
                else if (h === 'q')
                    for (d = 0; d < _; d += 4)
                        a === 'q'
                            ? ((T = m + w[d]), (z = S + w[d + 1]), (m += w[d + 2]), (S += w[d + 3]))
                            : ((T = w[d]), (z = w[d + 1]), (m = w[d + 2]), (S = w[d + 3])),
                            (O += 'Q ' + T + ' ' + z + ' ' + m + ' ' + S + ' ')
                else if (h === 't')
                    for (d = 0; d < _; d += 2)
                        ['t', 'q'].indexOf(g) > -1
                            ? ((T = m + (m - T)), (z = S + (S - z)))
                            : ((T = m), (z = S)),
                            a === 't'
                                ? ((m += w[d]), (S += w[d + 1]))
                                : ((m = w[d]), (S = w[d + 1])),
                            (O += 'Q ' + T + ' ' + z + ' ' + m + ' ' + S + ' '),
                            (g = h)
                else if (h === 'c')
                    for (d = 0; d < _; d += 6)
                        a === 'c'
                            ? ((T = m + w[d]),
                              (z = S + w[d + 1]),
                              (H = m + w[d + 2]),
                              (G = S + w[d + 3]),
                              (m += w[d + 4]),
                              (S += w[d + 5]))
                            : ((T = w[d]),
                              (z = w[d + 1]),
                              (H = w[d + 2]),
                              (G = w[d + 3]),
                              (m = w[d + 4]),
                              (S = w[d + 5])),
                            (O += 'C ' + T + ' ' + z + ' ' + H + ' ' + G + ' ' + m + ' ' + S + ' ')
                else if (h === 's')
                    for (d = 0; d < _; d += 4)
                        (T = m),
                            (z = S),
                            ['s', 'c'].indexOf(g) > -1 && ((T += m - H), (z += S - G)),
                            a === 's'
                                ? ((H = m + w[d]),
                                  (G = S + w[d + 1]),
                                  (m += w[d + 2]),
                                  (S += w[d + 3]))
                                : ((H = w[d]), (G = w[d + 1]), (m = w[d + 2]), (S = w[d + 3])),
                            (O += 'C ' + T + ' ' + z + ' ' + H + ' ' + G + ' ' + m + ' ' + S + ' ')
                else if (h === 'a')
                    for (d = 0; d < _; d += 7) {
                        ;(X = w[d]), (tt = w[d + 1]), (ct = w[d + 2]), (it = y[d + 3])
                        let b = !1
                        if (it.length > 1) {
                            let I = parseInt(it[0]),
                                P = parseInt(it[1]),
                                U
                            it.length > 2 && (U = parseFloat(it.substring(2))),
                                (w[d + 3] = I),
                                w.splice(d + 4, 0, P),
                                y.splice(d + 4, 0, '+'),
                                U !== void 0 && w.splice(d + 5, 0, U),
                                (b = !0)
                        }
                        ;(it = w[d + 3]),
                            (x = b ? w[d + 4] : y[d + 4]),
                            !b &&
                                x.length > 1 &&
                                ((w[d + 4] = parseInt(x[0])),
                                w.splice(d + 5, 0, parseFloat(x.substring(1)))),
                            (x = w[d + 4]),
                            a === 'a'
                                ? ((m += w[d + 5]), (S += w[d + 6]))
                                : ((m = w[d + 5]), (S = w[d + 6])),
                            (O +=
                                'A ' +
                                X +
                                ' ' +
                                tt +
                                ' ' +
                                ct +
                                ' ' +
                                it +
                                ' ' +
                                x +
                                ' ' +
                                m +
                                ' ' +
                                S +
                                ' ')
                    }
                else h === 'z' && ((O += 'Z '), (m = M), (S = $))
                g = h
            }
            return O.trim()
        }
        function n(o) {
            var l = o.trim().split(' '),
                u,
                f = l.length,
                c = f - 1,
                a,
                h = [],
                g,
                w,
                y,
                _,
                d,
                M = new RegExp('[QAZLCM]', ''),
                $ = l.slice(-1)[0].toUpperCase() === 'Z'
            for (a = 0; a < f; a++)
                if (((u = l[a]), M.test(u))) {
                    if (u === 'A') {
                        h.push(l[a + 5] === '0' ? '1' : '0'),
                            h.push(l[a + 4]),
                            h.push(l[a + 3]),
                            h.push(l[a + 2]),
                            h.push(l[a + 1]),
                            h.push(u),
                            h.push(l[a + 7]),
                            h.push(l[a + 6]),
                            (a += 7)
                        continue
                    } else if (u === 'C') (_ = 3), (d = 2)
                    else if (u === 'Q') (_ = 2), (d = 1)
                    else if (u === 'L') (_ = 1), (d = 1)
                    else if (u === 'M') (_ = 1), (d = 0)
                    else continue
                    for (_ === d && h.push(u), y = 0; y < _; y++)
                        y === d && h.push(u), (g = l[++a]), (w = l[++a]), h.push(w), h.push(g)
                } else {
                    var m = l.slice(Math.max(a - 3, 0), 3).join(' ')
                    throw (
                        ((post = l.slice(a + 1, Math.min(a + 4, c)).join(' ')),
                        (range = m + ' [' + u + '] ' + post),
                        'Error while trying to reverse normalized SVG path, at position ' +
                            a +
                            ' (' +
                            range +
                            `).
Either the path is not normalised, or it's malformed.`)
                    )
                }
            h.push('M')
            var S = '',
                T = h.length - 1,
                z
            for (z = T; z > 0; z--) S += h[z] + ' '
            return $ && (S += 'Z'), (S = S.replace(/M M/g, 'Z M')), S
        }
        function i(u, l) {
            l = parseInt(l) == l ? l : !1
            var u = r(u),
                f = u.replace(/M/g, '|M').split('|'),
                c
            if ((f.splice(0, 1), l !== !1 && l >= f.length)) return u
            if (l === !1)
                f = f.map(function (h) {
                    return n(h.trim())
                })
            else {
                var a = f[l]
                a && ((c = n(a.trim())), (f[l] = c))
            }
            return f.reverse().join(' ').replace(/ +/g, ' ').trim()
        }
        var s = {
            normalize: r,
            reverseNormalized: n,
            reverse: i
        }
        return s
    })
})(_l)
var a0 = _l.exports
const Ds = /* @__PURE__ */ c0(a0),
    h0 = /* @__PURE__ */ dr('div', { class: 'graph-host' }, null, -1),
    d0 = { class: 'info-text text-h5 text--secondary' },
    p0 = /* @__PURE__ */ vo({
        __name: 'GraphEditor',
        setup(t, { expose: e }) {
            const r = Oo(() => Jt('.graph-host'))
            Eo(() => {
                T(), window.addEventListener('resize', wt)
            }),
                _i(() => {
                    window.removeEventListener('resize', wt)
                })
            let n = new wp(),
                i = lu(!1),
                s = 400,
                o = 400,
                l,
                u,
                f,
                c,
                a,
                h,
                g,
                w,
                y,
                _,
                d = 0,
                M = 0,
                $ = 1
            const m = jp
            e({ testingExposedFunctionCall: S })
            function S() {
                console.log('Hi from inside the function')
            }
            function T() {
                ;(s = r.value.node().clientWidth),
                    (o = r.value.node().clientHeight),
                    (u = yp((R) => z(R))),
                    (c = vp(
                        r.value,
                        u,
                        (R) => U(R),
                        (R) => P(R),
                        (R) => {
                            G(Ft(R, c.node())[0], Ft(R, c.node())[1])
                        }
                    )),
                    Ep(c, m),
                    (g = Sp(c)),
                    (a = xp(c)),
                    (h = bp(c)),
                    (l = Mp(n, m, s, o, () => X())),
                    (f = _p(l, s, o, m.nodeRadius)),
                    b()
            }
            function z(R) {
                ;(d = R.transform.x),
                    (M = R.transform.y),
                    ($ = R.transform.k),
                    c.attr('transform', `translate(${d},${M})scale(${$})`)
            }
            function H(R, A, D) {
                n.createLink(R.id, A.id, D), b()
            }
            function G(R, A, D, B) {
                n.createNode(R ?? s / 2, A ?? o / 2, D, B), (i.value = !0), b()
            }
            function X() {
                h.attr('transform', (R) => `translate(${R.x},${R.y})`),
                    a.selectAll('path').attr('d', (R) => tt(R)),
                    O(),
                    b()
            }
            function tt(R) {
                switch ((ct(R), R.pathType)) {
                    case jt.REFLEXIVE:
                        return As(R.source, [s / 2, o / 2], m)
                    case jt.ARC:
                        return Lr(R.source, R.target, m)
                    case jt.ARCREVERSE:
                        return Ds.reverse(Lr(R.source, R.target, m))
                    case jt.LINE:
                        return jr(R.source, R.target, m)
                    case jt.LINEREVERSE:
                        return Ds.reverse(jr(R.source, R.target, m))
                    default:
                        return ''
                }
            }
            function ct(R) {
                R.source.id === R.target.id
                    ? (R.pathType = jt.REFLEXIVE)
                    : it(R.source, R.target)
                      ? (R.pathType = x(R.source, R.target) ? jt.ARCREVERSE : jt.ARC)
                      : (R.pathType = x(R.source, R.target) ? jt.LINEREVERSE : jt.LINE)
            }
            function it(R, A) {
                return (
                    R.id !== A.id &&
                    n.links.some((D) => D.target.id === R.id && D.source.id === A.id) &&
                    n.links.some((D) => D.target.id === A.id && D.source.id === R.id)
                )
            }
            function x(R, A) {
                return R.x > A.x
            }
            function O() {
                const R = w
                if (R !== void 0) {
                    const A = y
                    if (A !== void 0)
                        g.attr('d', () =>
                            R.id === A.id
                                ? As(R, [s / 2, o / 2], m)
                                : it(R, A)
                                  ? jr(R, A, m)
                                  : Lr(R, A, m)
                        )
                    else if (_ !== void 0) {
                        const D = [R.x, R.y]
                        g.attr('d', Vs(D, _))
                    }
                }
            }
            function b(R = 0.5) {
                ;(a = a
                    .data(n.links, (A) => A.id)
                    .join(
                        (A) => {
                            const D = A.append('g')
                            return (
                                D.append('path')
                                    .classed('link', !0)
                                    .attr('id', (B) => B.id)
                                    .attr('marker-end', 'url(#link-arrow)'),
                                D.append('path')
                                    .classed('clickbox', !0)
                                    .on('pointerdown', (B, ot) => {
                                        B.button === 1 && (Se(B), n.removeLink(ot), b())
                                    }),
                                D.append('text')
                                    .append('textPath')
                                    .attr('class', (B) =>
                                        B.label ? 'link-label' : 'link-label-placeholder'
                                    )
                                    .attr('href', (B) => `#${B.id}`)
                                    .attr('startOffset', '50%')
                                    .text((B) => (B.label ? B.label : 'add label'))
                                    .on('click', (B, ot) => {
                                        et(B, ot)
                                    }),
                                D
                            )
                        },
                        (A) => (
                            A.selectChild('path')
                                .attr('marker-start', (D) => {
                                    var B
                                    return (B = D.pathType) != null && B.includes('REVERSE')
                                        ? 'url(#link-arrow-reverse)'
                                        : null
                                })
                                .attr('marker-end', (D) => {
                                    var B
                                    return (B = D.pathType) != null && B.includes('REVERSE')
                                        ? null
                                        : 'url(#link-arrow)'
                                }),
                            A.selectChild('text')
                                .attr('class', (D) => {
                                    var B
                                    return `${(B = D.pathType) == null ? void 0 : B.toLowerCase()}-path-text`
                                })
                                .attr('dy', (D) => {
                                    var B
                                    return D.pathType === jt.REFLEXIVE
                                        ? 15
                                        : D.pathType == jt.LINEREVERSE
                                          ? -10
                                          : (B = D.pathType) != null && B.includes('REVERSE')
                                            ? 20
                                            : -10
                                }),
                            A.selectChild('text')
                                .selectChild('textPath')
                                .classed('hidden', !m.showLinkLabels)
                                .attr('startOffset', (D) => {
                                    var B
                                    return (B = D.pathType) != null && B.includes('REVERSE')
                                        ? '46%'
                                        : '50%'
                                }),
                            A
                        )
                    )),
                    (h = h
                        .data(n.nodes, (A) => A.id)
                        .join(
                            (A) => {
                                const D = A.append('g')
                                    .call(f)
                                    .on('pointerdown', (B, ot) => {
                                        B.button === 1 &&
                                            (Se(B),
                                            n.removeNode(ot),
                                            (i.value = n.nodes.length > 0),
                                            ht(),
                                            b())
                                    })
                                return (
                                    D.append('circle')
                                        .classed('node', !0)
                                        .attr('r', m.nodeRadius)
                                        .on('mouseenter', (B, ot) => (y = ot))
                                        .on('mouseout', () => (y = void 0))
                                        .on('pointerdown', (B, ot) => {
                                            I(B, ot)
                                        })
                                        .on('pointerup', (B) => {
                                            P(B)
                                        }),
                                    D.append('text')
                                        .attr('class', (B) =>
                                            B.label ? 'node-label' : 'node-label-placeholder'
                                        )
                                        .text((B) => (B.label !== void 0 ? B.label : 'add label'))
                                        .attr('dy', '0.33em')
                                        .on('click', (B, ot) => {
                                            K(B, ot)
                                        })
                                        .on('mouseenter', (B, ot) => (y = ot))
                                        .on('mouseout', () => (y = void 0)),
                                    D
                                )
                            },
                            (A) => (A.selectChild('text').classed('hidden', !m.showNodeLabels), A)
                        )),
                    l.nodes(n.nodes),
                    l.alpha(R).restart()
            }
            function I(R, A) {
                if (R.button !== 0) return
                Se(R)
                const D = [A.x, A.y]
                ;(_ = D),
                    (w = A),
                    g
                        .attr('marker-end', 'url(#draggable-link-arrow)')
                        .classed('hidden', !1)
                        .attr('d', Vs(D, D)),
                    b()
            }
            function P(R) {
                const A = w,
                    D = y
                ht(), !(A === void 0 || D === void 0) && (Se(R), H(A, D))
            }
            function U(R) {
                if ((Se(R), w !== void 0)) {
                    const A = Ia(R, r.value.node())[0],
                        D = [(A[0] - d) / $, (A[1] - M) / $]
                    R.pointerType === 'touch' &&
                        ((D[1] = D[1] - 4 * m.nodeRadius),
                        (y = n.nodes.find(
                            (B) =>
                                Math.sqrt(Math.pow(B.x - D[0], 2) + Math.pow(B.y - D[1], 2)) <
                                m.nodeRadius
                        ))),
                        (_ = D),
                        O()
                }
            }
            function K(R, A) {
                const D = R == null ? void 0 : R.target
                rt(A, D, [A.x, A.y])
            }
            function et(R, A) {
                const D = R.target
                let B = _t(D)
                rt(A, D, B)
            }
            function rt(R, A, D) {
                var v
                let B = R instanceof gl ? 'node' : 'link'
                const ot = document.createElement('input')
                ot.setAttribute('class', 'label-input'),
                    R.label == null ? (ot.value = '') : (ot.value = R.label),
                    (ot.placeholder = `Enter ${B} label`)
                let fe = !1
                ;(ot.onkeyup = function (E) {
                    E.key === 'Enter'
                        ? ((fe = !0), ot.blur())
                        : E.key === 'Escape' && ((ot.value = ''), ot.blur())
                }),
                    (ot.onblur = function () {
                        fe &&
                            (ot.value === ''
                                ? (A.setAttribute('class', `${B}-label-placeholder`),
                                  (A.textContent = 'add label'),
                                  (R.label = void 0))
                                : (A.setAttribute('class', `${B}-label`),
                                  (A.textContent = ot.value.trim()),
                                  (R.label = A.textContent))),
                            kt.remove()
                    })
                const kt = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
                kt.setAttribute('width', '100%'),
                    kt.setAttribute('height', '100%'),
                    kt.setAttribute('x', `${D[0] - 80}`),
                    kt.setAttribute('y', `${D[1] - 12}`),
                    kt.append(ot)
                const p = A.closest('svg')
                ;(v = p == null ? void 0 : p.querySelector('g')) == null || v.append(kt), ot.focus()
            }
            function _t(R) {
                let A = R.getBoundingClientRect(),
                    D = (A.x - d) / $,
                    B = (A.y - M) / $
                return [D, B]
            }
            function ht() {
                g == null || g.classed('hidden', !0).attr('marker-end', 'null'),
                    (w = void 0),
                    (y = void 0),
                    (_ = void 0)
            }
            function wt() {
                l.stop(),
                    r.value.selectChildren().remove(),
                    (u = void 0),
                    (d = 0),
                    (M = 0),
                    ($ = 1),
                    (c = void 0),
                    (g = void 0),
                    (a = void 0),
                    (h = void 0),
                    (l = void 0),
                    ht(),
                    T()
            }
            return (R, A) => (
                of(),
                ff(Gt, null, [h0, Nu(dr('div', d0, 'Graph is empty', 512), [[Cf, !uo(i)]])], 64)
            )
        }
    })
customElements.define('graph-editor', /* @__PURE__ */ Yf(p0, { shadowRoot: !1 }))
