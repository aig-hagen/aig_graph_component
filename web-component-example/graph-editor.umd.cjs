;(function (Ft) {
    typeof define == 'function' && define.amd ? define(Ft) : Ft()
})(function () {
    'use strict'
    var b0 = Object.defineProperty
    var E0 = (Ft, ut, zt) =>
        ut in Ft
            ? b0(Ft, ut, { enumerable: !0, configurable: !0, writable: !0, value: zt })
            : (Ft[ut] = zt)
    var Ot = (Ft, ut, zt) => (E0(Ft, typeof ut != 'symbol' ? ut + '' : ut, zt), zt)
    /**
     * @vue/shared v3.4.21
     * (c) 2018-present Yuxi (Evan) You and Vue contributors
     * @license MIT
     **/ function Ft(t, e) {
        const r = new Set(t.split(','))
        return e ? (n) => r.has(n.toLowerCase()) : (n) => r.has(n)
    }
    const ut = {},
        zt = [],
        At = () => {},
        El = () => !1,
        Sn = (t) =>
            t.charCodeAt(0) === 111 &&
            t.charCodeAt(1) === 110 &&
            (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
        br = (t) => t.startsWith('onUpdate:'),
        mt = Object.assign,
        Er = (t, e) => {
            const r = t.indexOf(e)
            r > -1 && t.splice(r, 1)
        },
        Sl = Object.prototype.hasOwnProperty,
        ft = (t, e) => Sl.call(t, e),
        J = Array.isArray,
        Ye = (t) => Rn(t) === '[object Map]',
        Ml = (t) => Rn(t) === '[object Set]',
        tt = (t) => typeof t == 'function',
        wt = (t) => typeof t == 'string',
        Mn = (t) => typeof t == 'symbol',
        gt = (t) => t !== null && typeof t == 'object',
        ji = (t) => (gt(t) || tt(t)) && tt(t.then) && tt(t.catch),
        Rl = Object.prototype.toString,
        Rn = (t) => Rl.call(t),
        $l = (t) => Rn(t).slice(8, -1),
        Nl = (t) => Rn(t) === '[object Object]',
        Sr = (t) => wt(t) && t !== 'NaN' && t[0] !== '-' && '' + parseInt(t, 10) === t,
        Ge = Ft(
            ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
        ),
        $n = (t) => {
            const e = Object.create(null)
            return (r) => e[r] || (e[r] = t(r))
        },
        Tl = /-(\w)/g,
        ie = $n((t) => t.replace(Tl, (e, r) => (r ? r.toUpperCase() : ''))),
        Cl = /\B([A-Z])/g,
        Dt = $n((t) => t.replace(Cl, '-$1').toLowerCase()),
        Li = $n((t) => t.charAt(0).toUpperCase() + t.slice(1)),
        Mr = $n((t) => (t ? `on${Li(t)}` : '')),
        he = (t, e) => !Object.is(t, e),
        Rr = (t, e) => {
            for (let r = 0; r < t.length; r++) t[r](e)
        },
        Nn = (t, e, r) => {
            Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: r })
        },
        kl = (t) => {
            const e = parseFloat(t)
            return isNaN(e) ? t : e
        },
        Oi = (t) => {
            const e = wt(t) ? Number(t) : NaN
            return isNaN(e) ? t : e
        }
    let Fi
    const zi = () =>
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
    function $r(t) {
        if (J(t)) {
            const e = {}
            for (let r = 0; r < t.length; r++) {
                const n = t[r],
                    i = wt(n) ? Ll(n) : $r(n)
                if (i) for (const s in i) e[s] = i[s]
            }
            return e
        } else if (wt(t) || gt(t)) return t
    }
    const Il = /;(?![^(]*\))/g,
        Pl = /:([^]+)/,
        jl = /\/\*[^]*?\*\//g
    function Ll(t) {
        const e = {}
        return (
            t
                .replace(jl, '')
                .split(Il)
                .forEach((r) => {
                    if (r) {
                        const n = r.split(Pl)
                        n.length > 1 && (e[n[0].trim()] = n[1].trim())
                    }
                }),
            e
        )
    }
    function Nr(t) {
        let e = ''
        if (wt(t)) e = t
        else if (J(t))
            for (let r = 0; r < t.length; r++) {
                const n = Nr(t[r])
                n && (e += n + ' ')
            }
        else if (gt(t)) for (const r in t) t[r] && (e += r + ' ')
        return e.trim()
    }
    const Ol = Ft('itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly')
    function Ai(t) {
        return !!t || t === ''
    }
    /**
     * @vue/reactivity v3.4.21
     * (c) 2018-present Yuxi (Evan) You and Vue contributors
     * @license MIT
     **/ let Ht
    class Fl {
        constructor(e = !1) {
            ;(this.detached = e),
                (this._active = !0),
                (this.effects = []),
                (this.cleanups = []),
                (this.parent = Ht),
                !e && Ht && (this.index = (Ht.scopes || (Ht.scopes = [])).push(this) - 1)
        }
        get active() {
            return this._active
        }
        run(e) {
            if (this._active) {
                const r = Ht
                try {
                    return (Ht = this), e()
                } finally {
                    Ht = r
                }
            }
        }
        on() {
            Ht = this
        }
        off() {
            Ht = this.parent
        }
        stop(e) {
            if (this._active) {
                let r, n
                for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop()
                for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]()
                if (this.scopes)
                    for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0)
                if (!this.detached && this.parent && !e) {
                    const i = this.parent.scopes.pop()
                    i &&
                        i !== this &&
                        ((this.parent.scopes[this.index] = i), (i.index = this.index))
                }
                ;(this.parent = void 0), (this._active = !1)
            }
        }
    }
    function zl(t, e = Ht) {
        e && e.active && e.effects.push(t)
    }
    function Al() {
        return Ht
    }
    let Se
    class Tr {
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
                ;(this._dirtyLevel = 1), pe()
                for (let e = 0; e < this._depsLength; e++) {
                    const r = this.deps[e]
                    if (r.computed && (Vl(r.computed), this._dirtyLevel >= 4)) break
                }
                this._dirtyLevel === 1 && (this._dirtyLevel = 0), ge()
            }
            return this._dirtyLevel >= 4
        }
        set dirty(e) {
            this._dirtyLevel = e ? 4 : 0
        }
        run() {
            if (((this._dirtyLevel = 0), !this.active)) return this.fn()
            let e = de,
                r = Se
            try {
                return (de = !0), (Se = this), this._runnings++, Vi(this), this.fn()
            } finally {
                Di(this), this._runnings--, (Se = r), (de = e)
            }
        }
        stop() {
            var e
            this.active &&
                (Vi(this), Di(this), (e = this.onStop) == null || e.call(this), (this.active = !1))
        }
    }
    function Vl(t) {
        return t.value
    }
    function Vi(t) {
        t._trackId++, (t._depsLength = 0)
    }
    function Di(t) {
        if (t.deps.length > t._depsLength) {
            for (let e = t._depsLength; e < t.deps.length; e++) Hi(t.deps[e], t)
            t.deps.length = t._depsLength
        }
    }
    function Hi(t, e) {
        const r = t.get(e)
        r !== void 0 && e._trackId !== r && (t.delete(e), t.size === 0 && t.cleanup())
    }
    let de = !0,
        Cr = 0
    const Bi = []
    function pe() {
        Bi.push(de), (de = !1)
    }
    function ge() {
        const t = Bi.pop()
        de = t === void 0 ? !0 : t
    }
    function kr() {
        Cr++
    }
    function Ir() {
        for (Cr--; !Cr && Pr.length; ) Pr.shift()()
    }
    function qi(t, e, r) {
        if (e.get(t) !== t._trackId) {
            e.set(t, t._trackId)
            const n = t.deps[t._depsLength]
            n !== e ? (n && Hi(n, t), (t.deps[t._depsLength++] = e)) : t._depsLength++
        }
    }
    const Pr = []
    function Ui(t, e, r) {
        kr()
        for (const n of t.keys()) {
            let i
            n._dirtyLevel < e &&
                (i ?? (i = t.get(n) === n._trackId)) &&
                (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0),
                (n._dirtyLevel = e)),
                n._shouldSchedule &&
                    (i ?? (i = t.get(n) === n._trackId)) &&
                    (n.trigger(),
                    (!n._runnings || n.allowRecurse) &&
                        n._dirtyLevel !== 2 &&
                        ((n._shouldSchedule = !1), n.scheduler && Pr.push(n.scheduler)))
        }
        Ir()
    }
    const Ki = (t, e) => {
            const r = new Map()
            return (r.cleanup = t), (r.computed = e), r
        },
        jr = new WeakMap(),
        Me = Symbol(''),
        Lr = Symbol('')
    function Nt(t, e, r) {
        if (de && Se) {
            let n = jr.get(t)
            n || jr.set(t, (n = new Map()))
            let i = n.get(r)
            i || n.set(r, (i = Ki(() => n.delete(r)))), qi(Se, i)
        }
    }
    function se(t, e, r, n, i, s) {
        const o = jr.get(t)
        if (!o) return
        let l = []
        if (e === 'clear') l = [...o.values()]
        else if (r === 'length' && J(t)) {
            const u = Number(n)
            o.forEach((f, c) => {
                ;(c === 'length' || (!Mn(c) && c >= u)) && l.push(f)
            })
        } else
            switch ((r !== void 0 && l.push(o.get(r)), e)) {
                case 'add':
                    J(t)
                        ? Sr(r) && l.push(o.get('length'))
                        : (l.push(o.get(Me)), Ye(t) && l.push(o.get(Lr)))
                    break
                case 'delete':
                    J(t) || (l.push(o.get(Me)), Ye(t) && l.push(o.get(Lr)))
                    break
                case 'set':
                    Ye(t) && l.push(o.get(Me))
                    break
            }
        kr()
        for (const u of l) u && Ui(u, 4)
        Ir()
    }
    const Dl = Ft('__proto__,__v_isRef,__isVue'),
        Xi = new Set(
            Object.getOwnPropertyNames(Symbol)
                .filter((t) => t !== 'arguments' && t !== 'caller')
                .map((t) => Symbol[t])
                .filter(Mn)
        ),
        Wi = Hl()
    function Hl() {
        const t = {}
        return (
            ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
                t[e] = function (...r) {
                    const n = ct(this)
                    for (let s = 0, o = this.length; s < o; s++) Nt(n, 'get', s + '')
                    const i = n[e](...r)
                    return i === -1 || i === !1 ? n[e](...r.map(ct)) : i
                }
            }),
            ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
                t[e] = function (...r) {
                    pe(), kr()
                    const n = ct(this)[e].apply(this, r)
                    return Ir(), ge(), n
                }
            }),
            t
        )
    }
    function Bl(t) {
        const e = ct(this)
        return Nt(e, 'has', t), e.hasOwnProperty(t)
    }
    class Yi {
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
                return n === (i ? (s ? nu : rs) : s ? ns : es).get(e) ||
                    Object.getPrototypeOf(e) === Object.getPrototypeOf(n)
                    ? e
                    : void 0
            const o = J(e)
            if (!i) {
                if (o && ft(Wi, r)) return Reflect.get(Wi, r, n)
                if (r === 'hasOwnProperty') return Bl
            }
            const l = Reflect.get(e, r, n)
            return (Mn(r) ? Xi.has(r) : Dl(r)) || (i || Nt(e, 'get', r), s)
                ? l
                : bt(l)
                  ? o && Sr(r)
                      ? l
                      : l.value
                  : gt(l)
                    ? i
                        ? is(l)
                        : zr(l)
                    : l
        }
    }
    class Gi extends Yi {
        constructor(e = !1) {
            super(!1, e)
        }
        set(e, r, n, i) {
            let s = e[r]
            if (!this._isShallow) {
                const u = Oe(s)
                if ((!Ln(n) && !Oe(n) && ((s = ct(s)), (n = ct(n))), !J(e) && bt(s) && !bt(n)))
                    return u ? !1 : ((s.value = n), !0)
            }
            const o = J(e) && Sr(r) ? Number(r) < e.length : ft(e, r),
                l = Reflect.set(e, r, n, i)
            return e === ct(i) && (o ? he(n, s) && se(e, 'set', r, n) : se(e, 'add', r, n)), l
        }
        deleteProperty(e, r) {
            const n = ft(e, r)
            e[r]
            const i = Reflect.deleteProperty(e, r)
            return i && n && se(e, 'delete', r, void 0), i
        }
        has(e, r) {
            const n = Reflect.has(e, r)
            return (!Mn(r) || !Xi.has(r)) && Nt(e, 'has', r), n
        }
        ownKeys(e) {
            return Nt(e, 'iterate', J(e) ? 'length' : Me), Reflect.ownKeys(e)
        }
    }
    class ql extends Yi {
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
    const Ul = new Gi(),
        Kl = new ql(),
        Xl = new Gi(!0),
        Or = (t) => t,
        Tn = (t) => Reflect.getPrototypeOf(t)
    function Cn(t, e, r = !1, n = !1) {
        t = t.__v_raw
        const i = ct(t),
            s = ct(e)
        r || (he(e, s) && Nt(i, 'get', e), Nt(i, 'get', s))
        const { has: o } = Tn(i),
            l = n ? Or : r ? Vr : Ze
        if (o.call(i, e)) return l(t.get(e))
        if (o.call(i, s)) return l(t.get(s))
        t !== i && t.get(e)
    }
    function kn(t, e = !1) {
        const r = this.__v_raw,
            n = ct(r),
            i = ct(t)
        return (
            e || (he(t, i) && Nt(n, 'has', t), Nt(n, 'has', i)),
            t === i ? r.has(t) : r.has(t) || r.has(i)
        )
    }
    function In(t, e = !1) {
        return (t = t.__v_raw), !e && Nt(ct(t), 'iterate', Me), Reflect.get(t, 'size', t)
    }
    function Zi(t) {
        t = ct(t)
        const e = ct(this)
        return Tn(e).has.call(e, t) || (e.add(t), se(e, 'add', t, t)), this
    }
    function Qi(t, e) {
        e = ct(e)
        const r = ct(this),
            { has: n, get: i } = Tn(r)
        let s = n.call(r, t)
        s || ((t = ct(t)), (s = n.call(r, t)))
        const o = i.call(r, t)
        return r.set(t, e), s ? he(e, o) && se(r, 'set', t, e) : se(r, 'add', t, e), this
    }
    function Ji(t) {
        const e = ct(this),
            { has: r, get: n } = Tn(e)
        let i = r.call(e, t)
        i || ((t = ct(t)), (i = r.call(e, t))), n && n.call(e, t)
        const s = e.delete(t)
        return i && se(e, 'delete', t, void 0), s
    }
    function ts() {
        const t = ct(this),
            e = t.size !== 0,
            r = t.clear()
        return e && se(t, 'clear', void 0, void 0), r
    }
    function Pn(t, e) {
        return function (n, i) {
            const s = this,
                o = s.__v_raw,
                l = ct(o),
                u = e ? Or : t ? Vr : Ze
            return !t && Nt(l, 'iterate', Me), o.forEach((f, c) => n.call(i, u(f), u(c), s))
        }
    }
    function jn(t, e, r) {
        return function (...n) {
            const i = this.__v_raw,
                s = ct(i),
                o = Ye(s),
                l = t === 'entries' || (t === Symbol.iterator && o),
                u = t === 'keys' && o,
                f = i[t](...n),
                c = r ? Or : e ? Vr : Ze
            return (
                !e && Nt(s, 'iterate', u ? Lr : Me),
                {
                    next() {
                        const { value: a, done: h } = f.next()
                        return h
                            ? { value: a, done: h }
                            : { value: l ? [c(a[0]), c(a[1])] : c(a), done: h }
                    },
                    [Symbol.iterator]() {
                        return this
                    }
                }
            )
        }
    }
    function me(t) {
        return function (...e) {
            return t === 'delete' ? !1 : t === 'clear' ? void 0 : this
        }
    }
    function Wl() {
        const t = {
                get(s) {
                    return Cn(this, s)
                },
                get size() {
                    return In(this)
                },
                has: kn,
                add: Zi,
                set: Qi,
                delete: Ji,
                clear: ts,
                forEach: Pn(!1, !1)
            },
            e = {
                get(s) {
                    return Cn(this, s, !1, !0)
                },
                get size() {
                    return In(this)
                },
                has: kn,
                add: Zi,
                set: Qi,
                delete: Ji,
                clear: ts,
                forEach: Pn(!1, !0)
            },
            r = {
                get(s) {
                    return Cn(this, s, !0)
                },
                get size() {
                    return In(this, !0)
                },
                has(s) {
                    return kn.call(this, s, !0)
                },
                add: me('add'),
                set: me('set'),
                delete: me('delete'),
                clear: me('clear'),
                forEach: Pn(!0, !1)
            },
            n = {
                get(s) {
                    return Cn(this, s, !0, !0)
                },
                get size() {
                    return In(this, !0)
                },
                has(s) {
                    return kn.call(this, s, !0)
                },
                add: me('add'),
                set: me('set'),
                delete: me('delete'),
                clear: me('clear'),
                forEach: Pn(!0, !0)
            }
        return (
            ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
                ;(t[s] = jn(s, !1, !1)),
                    (r[s] = jn(s, !0, !1)),
                    (e[s] = jn(s, !1, !0)),
                    (n[s] = jn(s, !0, !0))
            }),
            [t, r, e, n]
        )
    }
    const [Yl, Gl, Zl, Ql] = Wl()
    function Fr(t, e) {
        const r = e ? (t ? Ql : Zl) : t ? Gl : Yl
        return (n, i, s) =>
            i === '__v_isReactive'
                ? !t
                : i === '__v_isReadonly'
                  ? t
                  : i === '__v_raw'
                    ? n
                    : Reflect.get(ft(r, i) && i in n ? r : n, i, s)
    }
    const Jl = { get: Fr(!1, !1) },
        tu = { get: Fr(!1, !0) },
        eu = { get: Fr(!0, !1) },
        es = new WeakMap(),
        ns = new WeakMap(),
        rs = new WeakMap(),
        nu = new WeakMap()
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
        return t.__v_skip || !Object.isExtensible(t) ? 0 : ru($l(t))
    }
    function zr(t) {
        return Oe(t) ? t : Ar(t, !1, Ul, Jl, es)
    }
    function su(t) {
        return Ar(t, !1, Xl, tu, ns)
    }
    function is(t) {
        return Ar(t, !0, Kl, eu, rs)
    }
    function Ar(t, e, r, n, i) {
        if (!gt(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t
        const s = i.get(t)
        if (s) return s
        const o = iu(t)
        if (o === 0) return t
        const l = new Proxy(t, o === 2 ? n : r)
        return i.set(t, l), l
    }
    function Le(t) {
        return Oe(t) ? Le(t.__v_raw) : !!(t && t.__v_isReactive)
    }
    function Oe(t) {
        return !!(t && t.__v_isReadonly)
    }
    function Ln(t) {
        return !!(t && t.__v_isShallow)
    }
    function ss(t) {
        return Le(t) || Oe(t)
    }
    function ct(t) {
        const e = t && t.__v_raw
        return e ? ct(e) : t
    }
    function os(t) {
        return Object.isExtensible(t) && Nn(t, '__v_skip', !0), t
    }
    const Ze = (t) => (gt(t) ? zr(t) : t),
        Vr = (t) => (gt(t) ? is(t) : t)
    class ls {
        constructor(e, r, n, i) {
            ;(this.getter = e),
                (this._setter = r),
                (this.dep = void 0),
                (this.__v_isRef = !0),
                (this.__v_isReadonly = !1),
                (this.effect = new Tr(
                    () => e(this._value),
                    () => On(this, this.effect._dirtyLevel === 2 ? 2 : 3)
                )),
                (this.effect.computed = this),
                (this.effect.active = this._cacheable = !i),
                (this.__v_isReadonly = n)
        }
        get value() {
            const e = ct(this)
            return (
                (!e._cacheable || e.effect.dirty) &&
                    he(e._value, (e._value = e.effect.run())) &&
                    On(e, 4),
                us(e),
                e.effect._dirtyLevel >= 2 && On(e, 2),
                e._value
            )
        }
        set value(e) {
            this._setter(e)
        }
        get _dirty() {
            return this.effect.dirty
        }
        set _dirty(e) {
            this.effect.dirty = e
        }
    }
    function ou(t, e, r = !1) {
        let n, i
        const s = tt(t)
        return s ? ((n = t), (i = At)) : ((n = t.get), (i = t.set)), new ls(n, i, s || !i, r)
    }
    function us(t) {
        var e
        de &&
            Se &&
            ((t = ct(t)),
            qi(
                Se,
                (e = t.dep) != null
                    ? e
                    : (t.dep = Ki(() => (t.dep = void 0), t instanceof ls ? t : void 0))
            ))
    }
    function On(t, e = 4, r) {
        t = ct(t)
        const n = t.dep
        n && Ui(n, e)
    }
    function bt(t) {
        return !!(t && t.__v_isRef === !0)
    }
    function lu(t) {
        return uu(t, !1)
    }
    function uu(t, e) {
        return bt(t) ? t : new fu(t, e)
    }
    class fu {
        constructor(e, r) {
            ;(this.__v_isShallow = r),
                (this.dep = void 0),
                (this.__v_isRef = !0),
                (this._rawValue = r ? e : ct(e)),
                (this._value = r ? e : Ze(e))
        }
        get value() {
            return us(this), this._value
        }
        set value(e) {
            const r = this.__v_isShallow || Ln(e) || Oe(e)
            ;(e = r ? e : ct(e)),
                he(e, this._rawValue) &&
                    ((this._rawValue = e), (this._value = r ? e : Ze(e)), On(this, 4))
        }
    }
    function fs(t) {
        return bt(t) ? t.value : t
    }
    const cu = {
        get: (t, e, r) => fs(Reflect.get(t, e, r)),
        set: (t, e, r, n) => {
            const i = t[e]
            return bt(i) && !bt(r) ? ((i.value = r), !0) : Reflect.set(t, e, r, n)
        }
    }
    function cs(t) {
        return Le(t) ? t : new Proxy(t, cu)
    }
    /**
     * @vue/runtime-core v3.4.21
     * (c) 2018-present Yuxi (Evan) You and Vue contributors
     * @license MIT
     **/ const Qe = []
    function M0(t, ...e) {
        pe()
        const r = Qe.length ? Qe[Qe.length - 1].component : null,
            n = r && r.appContext.config.warnHandler,
            i = au()
        if (n)
            oe(n, r, 11, [
                t +
                    e
                        .map((s) => {
                            var o, l
                            return (l = (o = s.toString) == null ? void 0 : o.call(s)) != null
                                ? l
                                : JSON.stringify(s)
                        })
                        .join(''),
                r && r.proxy,
                i.map(({ vnode: s }) => `at <${Zs(r, s.type)}>`).join(`
`),
                i
            ])
        else {
            const s = [`[Vue warn]: ${t}`, ...e]
            i.length &&
                s.push(
                    `
`,
                    ...hu(i)
                ),
                console.warn(...s)
        }
        ge()
    }
    function au() {
        let t = Qe[Qe.length - 1]
        if (!t) return []
        const e = []
        for (; t; ) {
            const r = e[0]
            r && r.vnode === t ? r.recurseCount++ : e.push({ vnode: t, recurseCount: 0 })
            const n = t.component && t.component.parent
            t = n && n.vnode
        }
        return e
    }
    function hu(t) {
        const e = []
        return (
            t.forEach((r, n) => {
                e.push(
                    ...(n === 0
                        ? []
                        : [
                              `
`
                          ]),
                    ...du(r)
                )
            }),
            e
        )
    }
    function du({ vnode: t, recurseCount: e }) {
        const r = e > 0 ? `... (${e} recursive calls)` : '',
            n = t.component ? t.component.parent == null : !1,
            i = ` at <${Zs(t.component, t.type, n)}`,
            s = '>' + r
        return t.props ? [i, ...pu(t.props), s] : [i + s]
    }
    function pu(t) {
        const e = [],
            r = Object.keys(t)
        return (
            r.slice(0, 3).forEach((n) => {
                e.push(...as(n, t[n]))
            }),
            r.length > 3 && e.push(' ...'),
            e
        )
    }
    function as(t, e, r) {
        return wt(e)
            ? ((e = JSON.stringify(e)), r ? e : [`${t}=${e}`])
            : typeof e == 'number' || typeof e == 'boolean' || e == null
              ? r
                  ? e
                  : [`${t}=${e}`]
              : bt(e)
                ? ((e = as(t, ct(e.value), !0)), r ? e : [`${t}=Ref<`, e, '>'])
                : tt(e)
                  ? [`${t}=fn${e.name ? `<${e.name}>` : ''}`]
                  : ((e = ct(e)), r ? e : [`${t}=`, e])
    }
    function oe(t, e, r, n) {
        try {
            return n ? t(...n) : t()
        } catch (i) {
            Fn(i, e, r)
        }
    }
    function Bt(t, e, r, n) {
        if (tt(t)) {
            const s = oe(t, e, r, n)
            return (
                s &&
                    ji(s) &&
                    s.catch((o) => {
                        Fn(o, e, r)
                    }),
                s
            )
        }
        const i = []
        for (let s = 0; s < t.length; s++) i.push(Bt(t[s], e, r, n))
        return i
    }
    function Fn(t, e, r, n = !0) {
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
                oe(u, null, 10, [t, o, l])
                return
            }
        }
        gu(t, r, i, n)
    }
    function gu(t, e, r, n = !0) {
        console.error(t)
    }
    let Je = !1,
        Dr = !1
    const xt = []
    let Gt = 0
    const Fe = []
    let we = null,
        Re = 0
    const hs = Promise.resolve()
    let Hr = null
    function ds(t) {
        const e = Hr || hs
        return t ? e.then(this ? t.bind(this) : t) : e
    }
    function mu(t) {
        let e = Gt + 1,
            r = xt.length
        for (; e < r; ) {
            const n = (e + r) >>> 1,
                i = xt[n],
                s = tn(i)
            s < t || (s === t && i.pre) ? (e = n + 1) : (r = n)
        }
        return e
    }
    function Br(t) {
        ;(!xt.length || !xt.includes(t, Je && t.allowRecurse ? Gt + 1 : Gt)) &&
            (t.id == null ? xt.push(t) : xt.splice(mu(t.id), 0, t), ps())
    }
    function ps() {
        !Je && !Dr && ((Dr = !0), (Hr = hs.then(ws)))
    }
    function wu(t) {
        const e = xt.indexOf(t)
        e > Gt && xt.splice(e, 1)
    }
    function yu(t) {
        J(t) ? Fe.push(...t) : (!we || !we.includes(t, t.allowRecurse ? Re + 1 : Re)) && Fe.push(t),
            ps()
    }
    function gs(t, e, r = Je ? Gt + 1 : 0) {
        for (; r < xt.length; r++) {
            const n = xt[r]
            if (n && n.pre) {
                if (t && n.id !== t.uid) continue
                xt.splice(r, 1), r--, n()
            }
        }
    }
    function ms(t) {
        if (Fe.length) {
            const e = [...new Set(Fe)].sort((r, n) => tn(r) - tn(n))
            if (((Fe.length = 0), we)) {
                we.push(...e)
                return
            }
            for (we = e, Re = 0; Re < we.length; Re++) we[Re]()
            ;(we = null), (Re = 0)
        }
    }
    const tn = (t) => (t.id == null ? 1 / 0 : t.id),
        _u = (t, e) => {
            const r = tn(t) - tn(e)
            if (r === 0) {
                if (t.pre && !e.pre) return -1
                if (e.pre && !t.pre) return 1
            }
            return r
        }
    function ws(t) {
        ;(Dr = !1), (Je = !0), xt.sort(_u)
        try {
            for (Gt = 0; Gt < xt.length; Gt++) {
                const e = xt[Gt]
                e && e.active !== !1 && oe(e, null, 14)
            }
        } finally {
            ;(Gt = 0),
                (xt.length = 0),
                ms(),
                (Je = !1),
                (Hr = null),
                (xt.length || Fe.length) && ws()
        }
    }
    function vu(t, e, ...r) {
        if (t.isUnmounted) return
        const n = t.vnode.props || ut
        let i = r
        const s = e.startsWith('update:'),
            o = s && e.slice(7)
        if (o && o in n) {
            const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
                { number: a, trim: h } = n[c] || ut
            h && (i = r.map((g) => (wt(g) ? g.trim() : g))), a && (i = r.map(kl))
        }
        let l,
            u = n[(l = Mr(e))] || n[(l = Mr(ie(e)))]
        !u && s && (u = n[(l = Mr(Dt(e)))]), u && Bt(u, t, 6, i)
        const f = n[l + 'Once']
        if (f) {
            if (!t.emitted) t.emitted = {}
            else if (t.emitted[l]) return
            ;(t.emitted[l] = !0), Bt(f, t, 6, i)
        }
    }
    function ys(t, e, r = !1) {
        const n = e.emitsCache,
            i = n.get(t)
        if (i !== void 0) return i
        const s = t.emits
        let o = {},
            l = !1
        if (!tt(t)) {
            const u = (f) => {
                const c = ys(f, e, !0)
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
    function zn(t, e) {
        return !t || !Sn(e)
            ? !1
            : ((e = e.slice(2).replace(/Once$/, '')),
              ft(t, e[0].toLowerCase() + e.slice(1)) || ft(t, Dt(e)) || ft(t, e))
    }
    let kt = null,
        _s = null
    function An(t) {
        const e = kt
        return (kt = t), (_s = (t && t.type.__scopeId) || null), e
    }
    function xu(t, e = kt, r) {
        if (!e || t._n) return t
        const n = (...i) => {
            n._d && qs(-1)
            const s = An(e)
            let o
            try {
                o = t(...i)
            } finally {
                An(s), n._d && qs(1)
            }
            return o
        }
        return (n._n = !0), (n._c = !0), (n._d = !0), n
    }
    function R0() {}
    function qr(t) {
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
        const M = An(t)
        try {
            if (r.shapeFlag & 4) {
                const m = i || n,
                    S = m
                ;(_ = Qt(c.call(S, m, a, s, g, h, w))), (d = u)
            } else {
                const m = e
                ;(_ = Qt(m.length > 1 ? m(s, { attrs: u, slots: l, emit: f }) : m(s, null))),
                    (d = e.props ? u : bu(u))
            }
        } catch (m) {
            ;(on.length = 0), Fn(m, t, 1), (_ = ue(sn))
        }
        let $ = _
        if (d && y !== !1) {
            const m = Object.keys(d),
                { shapeFlag: S } = $
            m.length && S & 7 && (o && m.some(br) && (d = Eu(d, o)), ($ = ze($, d)))
        }
        return (
            r.dirs && (($ = ze($)), ($.dirs = $.dirs ? $.dirs.concat(r.dirs) : r.dirs)),
            r.transition && ($.transition = r.transition),
            (_ = $),
            An(M),
            _
        )
    }
    const bu = (t) => {
            let e
            for (const r in t)
                (r === 'class' || r === 'style' || Sn(r)) && ((e || (e = {}))[r] = t[r])
            return e
        },
        Eu = (t, e) => {
            const r = {}
            for (const n in t) (!br(n) || !(n.slice(9) in e)) && (r[n] = t[n])
            return r
        }
    function Su(t, e, r) {
        const { props: n, children: i, component: s } = t,
            { props: o, children: l, patchFlag: u } = e,
            f = s.emitsOptions
        if (e.dirs || e.transition) return !0
        if (r && u >= 0) {
            if (u & 1024) return !0
            if (u & 16) return n ? vs(n, o, f) : !!o
            if (u & 8) {
                const c = e.dynamicProps
                for (let a = 0; a < c.length; a++) {
                    const h = c[a]
                    if (o[h] !== n[h] && !zn(f, h)) return !0
                }
            }
        } else
            return (i || l) && (!l || !l.$stable)
                ? !0
                : n === o
                  ? !1
                  : n
                    ? o
                        ? vs(n, o, f)
                        : !0
                    : !!o
        return !1
    }
    function vs(t, e, r) {
        const n = Object.keys(e)
        if (n.length !== Object.keys(t).length) return !0
        for (let i = 0; i < n.length; i++) {
            const s = n[i]
            if (e[s] !== t[s] && !zn(r, s)) return !0
        }
        return !1
    }
    function Mu({ vnode: t, parent: e }, r) {
        for (; e; ) {
            const n = e.subTree
            if ((n.suspense && n.suspense.activeBranch === t && (n.el = t.el), n === t))
                ((t = e.vnode).el = r), (e = e.parent)
            else break
        }
    }
    const Ru = Symbol.for('v-ndc'),
        $u = (t) => t.__isSuspense
    function Nu(t, e) {
        e && e.pendingBranch ? (J(t) ? e.effects.push(...t) : e.effects.push(t)) : yu(t)
    }
    const Tu = Symbol.for('v-scx'),
        Cu = () => qn(Tu),
        Vn = {}
    function Ur(t, e, r) {
        return xs(t, e, r)
    }
    function xs(t, e, { immediate: r, deep: n, flush: i, once: s, onTrack: o, onTrigger: l } = ut) {
        if (e && s) {
            const T = e
            e = (...z) => {
                T(...z), S()
            }
        }
        const u = St,
            f = (T) => (n === !0 ? T : $e(T, n === !1 ? 1 : void 0))
        let c,
            a = !1,
            h = !1
        if (
            (bt(t)
                ? ((c = () => t.value), (a = Ln(t)))
                : Le(t)
                  ? ((c = () => f(t)), (a = !0))
                  : J(t)
                    ? ((h = !0),
                      (a = t.some((T) => Le(T) || Ln(T))),
                      (c = () =>
                          t.map((T) => {
                              if (bt(T)) return T.value
                              if (Le(T)) return f(T)
                              if (tt(T)) return oe(T, u, 2)
                          })))
                    : tt(t)
                      ? e
                          ? (c = () => oe(t, u, 2))
                          : (c = () => (g && g(), Bt(t, u, 3, [w])))
                      : (c = At),
            e && n)
        ) {
            const T = c
            c = () => $e(T())
        }
        let g,
            w = (T) => {
                g = $.onStop = () => {
                    oe(T, u, 4), (g = $.onStop = void 0)
                }
            },
            y
        if (Gn)
            if (((w = At), e ? r && Bt(e, u, 3, [c(), h ? [] : void 0, w]) : c(), i === 'sync')) {
                const T = Cu()
                y = T.__watcherHandles || (T.__watcherHandles = [])
            } else return At
        let _ = h ? new Array(t.length).fill(Vn) : Vn
        const d = () => {
            if (!(!$.active || !$.dirty))
                if (e) {
                    const T = $.run()
                    ;(n || a || (h ? T.some((z, H) => he(z, _[H])) : he(T, _))) &&
                        (g && g(),
                        Bt(e, u, 3, [T, _ === Vn ? void 0 : h && _[0] === Vn ? [] : _, w]),
                        (_ = T))
                } else $.run()
        }
        d.allowRecurse = !!e
        let M
        i === 'sync'
            ? (M = d)
            : i === 'post'
              ? (M = () => Tt(d, u && u.suspense))
              : ((d.pre = !0), u && (d.id = u.uid), (M = () => Br(d)))
        const $ = new Tr(c, At, M),
            m = Al(),
            S = () => {
                $.stop(), m && Er(m.effects, $)
            }
        return (
            e
                ? r
                    ? d()
                    : (_ = $.run())
                : i === 'post'
                  ? Tt($.run.bind($), u && u.suspense)
                  : $.run(),
            y && y.push(S),
            S
        )
    }
    function ku(t, e, r) {
        const n = this.proxy,
            i = wt(t) ? (t.includes('.') ? bs(n, t) : () => n[t]) : t.bind(n, n)
        let s
        tt(e) ? (s = e) : ((s = e.handler), (r = e))
        const o = fn(this),
            l = xs(i, s.bind(n), r)
        return o(), l
    }
    function bs(t, e) {
        const r = e.split('.')
        return () => {
            let n = t
            for (let i = 0; i < r.length && n; i++) n = n[r[i]]
            return n
        }
    }
    function $e(t, e, r = 0, n) {
        if (!gt(t) || t.__v_skip) return t
        if (e && e > 0) {
            if (r >= e) return t
            r++
        }
        if (((n = n || new Set()), n.has(t))) return t
        if ((n.add(t), bt(t))) $e(t.value, e, r, n)
        else if (J(t)) for (let i = 0; i < t.length; i++) $e(t[i], e, r, n)
        else if (Ml(t) || Ye(t))
            t.forEach((i) => {
                $e(i, e, r, n)
            })
        else if (Nl(t)) for (const i in t) $e(t[i], e, r, n)
        return t
    }
    function Iu(t, e) {
        if (kt === null) return t
        const r = Zn(kt) || kt.proxy,
            n = t.dirs || (t.dirs = [])
        for (let i = 0; i < e.length; i++) {
            let [s, o, l, u = ut] = e[i]
            s &&
                (tt(s) && (s = { mounted: s, updated: s }),
                s.deep && $e(o),
                n.push({ dir: s, instance: r, value: o, oldValue: void 0, arg: l, modifiers: u }))
        }
        return t
    }
    function Ne(t, e, r, n) {
        const i = t.dirs,
            s = e && e.dirs
        for (let o = 0; o < i.length; o++) {
            const l = i[o]
            s && (l.oldValue = s[o].value)
            let u = l.dir[n]
            u && (pe(), Bt(u, r, 8, [t.el, l, t, e]), ge())
        }
    }
    /*! #__NO_SIDE_EFFECTS__ */ function Es(t, e) {
        return tt(t) ? mt({ name: t.name }, e, { setup: t }) : t
    }
    const Dn = (t) => !!t.type.__asyncLoader,
        Ss = (t) => t.type.__isKeepAlive
    function Pu(t, e) {
        Ms(t, 'a', e)
    }
    function ju(t, e) {
        Ms(t, 'da', e)
    }
    function Ms(t, e, r = St) {
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
        if ((Hn(e, n, r), r)) {
            let i = r.parent
            for (; i && i.parent; ) Ss(i.parent.vnode) && Lu(n, e, r, i), (i = i.parent)
        }
    }
    function Lu(t, e, r, n) {
        const i = Hn(e, t, n, !0)
        Kr(() => {
            Er(n[e], i)
        }, r)
    }
    function Hn(t, e, r = St, n = !1) {
        if (r) {
            const i = r[t] || (r[t] = []),
                s =
                    e.__weh ||
                    (e.__weh = (...o) => {
                        if (r.isUnmounted) return
                        pe()
                        const l = fn(r),
                            u = Bt(e, r, t, o)
                        return l(), ge(), u
                    })
            return n ? i.unshift(s) : i.push(s), s
        }
    }
    const le =
            (t) =>
            (e, r = St) =>
                (!Gn || t === 'sp') && Hn(t, (...n) => e(...n), r),
        Ou = le('bm'),
        Rs = le('m'),
        Fu = le('bu'),
        zu = le('u'),
        Au = le('bum'),
        Kr = le('um'),
        Vu = le('sp'),
        Du = le('rtg'),
        Hu = le('rtc')
    function Bu(t, e = St) {
        Hn('ec', t, e)
    }
    const Xr = (t) => (t ? (Xs(t) ? Zn(t) || t.proxy : Xr(t.parent)) : null),
        en = mt(Object.create(null), {
            $: (t) => t,
            $el: (t) => t.vnode.el,
            $data: (t) => t.data,
            $props: (t) => t.props,
            $attrs: (t) => t.attrs,
            $slots: (t) => t.slots,
            $refs: (t) => t.refs,
            $parent: (t) => Xr(t.parent),
            $root: (t) => Xr(t.root),
            $emit: (t) => t.emit,
            $options: (t) => Gr(t),
            $forceUpdate: (t) =>
                t.f ||
                (t.f = () => {
                    ;(t.effect.dirty = !0), Br(t.update)
                }),
            $nextTick: (t) => t.n || (t.n = ds.bind(t.proxy)),
            $watch: (t) => ku.bind(t)
        }),
        Wr = (t, e) => t !== ut && !t.__isScriptSetup && ft(t, e),
        qu = {
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
                        if (Wr(n, e)) return (o[e] = 1), n[e]
                        if (i !== ut && ft(i, e)) return (o[e] = 2), i[e]
                        if ((f = t.propsOptions[0]) && ft(f, e)) return (o[e] = 3), s[e]
                        if (r !== ut && ft(r, e)) return (o[e] = 4), r[e]
                        Yr && (o[e] = 0)
                    }
                }
                const c = en[e]
                let a, h
                if (c) return e === '$attrs' && Nt(t, 'get', e), c(t)
                if ((a = l.__cssModules) && (a = a[e])) return a
                if (r !== ut && ft(r, e)) return (o[e] = 4), r[e]
                if (((h = u.config.globalProperties), ft(h, e))) return h[e]
            },
            set({ _: t }, e, r) {
                const { data: n, setupState: i, ctx: s } = t
                return Wr(i, e)
                    ? ((i[e] = r), !0)
                    : n !== ut && ft(n, e)
                      ? ((n[e] = r), !0)
                      : ft(t.props, e) || (e[0] === '$' && e.slice(1) in t)
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
                    (t !== ut && ft(t, o)) ||
                    Wr(e, o) ||
                    ((l = s[0]) && ft(l, o)) ||
                    ft(n, o) ||
                    ft(en, o) ||
                    ft(i.config.globalProperties, o)
                )
            },
            defineProperty(t, e, r) {
                return (
                    r.get != null
                        ? (t._.accessCache[e] = 0)
                        : ft(r, 'value') && this.set(t, e, r.value, null),
                    Reflect.defineProperty(t, e, r)
                )
            }
        }
    function $s(t) {
        return J(t) ? t.reduce((e, r) => ((e[r] = null), e), {}) : t
    }
    let Yr = !0
    function Uu(t) {
        const e = Gr(t),
            r = t.proxy,
            n = t.ctx
        ;(Yr = !1), e.beforeCreate && Ns(e.beforeCreate, t, 'bc')
        const {
            data: i,
            computed: s,
            methods: o,
            watch: l,
            provide: u,
            inject: f,
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
            expose: X,
            inheritAttrs: et,
            components: at,
            directives: st,
            filters: x
        } = e
        if ((f && Ku(f, n, null), o))
            for (const I in o) {
                const P = o[I]
                tt(P) && (n[I] = P.bind(r))
            }
        if (i) {
            const I = i.call(r, r)
            gt(I) && (t.data = zr(I))
        }
        if (((Yr = !0), s))
            for (const I in s) {
                const P = s[I],
                    U = tt(P) ? P.bind(r, r) : tt(P.get) ? P.get.bind(r, r) : At,
                    K = !tt(P) && tt(P.set) ? P.set.bind(r) : At,
                    nt = Qs({ get: U, set: K })
                Object.defineProperty(n, I, {
                    enumerable: !0,
                    configurable: !0,
                    get: () => nt.value,
                    set: (rt) => (nt.value = rt)
                })
            }
        if (l) for (const I in l) Ts(l[I], n, r, I)
        if (u) {
            const I = tt(u) ? u.call(r) : u
            Reflect.ownKeys(I).forEach((P) => {
                Qu(P, I[P])
            })
        }
        c && Ns(c, t, 'c')
        function b(I, P) {
            J(P) ? P.forEach((U) => I(U.bind(r))) : P && I(P.bind(r))
        }
        if (
            (b(Ou, a),
            b(Rs, h),
            b(Fu, g),
            b(zu, w),
            b(Pu, y),
            b(ju, _),
            b(Bu, H),
            b(Hu, T),
            b(Du, z),
            b(Au, M),
            b(Kr, m),
            b(Vu, G),
            J(X))
        )
            if (X.length) {
                const I = t.exposed || (t.exposed = {})
                X.forEach((P) => {
                    Object.defineProperty(I, P, { get: () => r[P], set: (U) => (r[P] = U) })
                })
            } else t.exposed || (t.exposed = {})
        S && t.render === At && (t.render = S),
            et != null && (t.inheritAttrs = et),
            at && (t.components = at),
            st && (t.directives = st)
    }
    function Ku(t, e, r = At) {
        J(t) && (t = Zr(t))
        for (const n in t) {
            const i = t[n]
            let s
            gt(i)
                ? 'default' in i
                    ? (s = qn(i.from || n, i.default, !0))
                    : (s = qn(i.from || n))
                : (s = qn(i)),
                bt(s)
                    ? Object.defineProperty(e, n, {
                          enumerable: !0,
                          configurable: !0,
                          get: () => s.value,
                          set: (o) => (s.value = o)
                      })
                    : (e[n] = s)
        }
    }
    function Ns(t, e, r) {
        Bt(J(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, r)
    }
    function Ts(t, e, r, n) {
        const i = n.includes('.') ? bs(r, n) : () => r[n]
        if (wt(t)) {
            const s = e[t]
            tt(s) && Ur(i, s)
        } else if (tt(t)) Ur(i, t.bind(r))
        else if (gt(t))
            if (J(t)) t.forEach((s) => Ts(s, e, r, n))
            else {
                const s = tt(t.handler) ? t.handler.bind(r) : e[t.handler]
                tt(s) && Ur(i, s, t)
            }
    }
    function Gr(t) {
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
                  : ((u = {}), i.length && i.forEach((f) => Bn(u, f, o, !0)), Bn(u, e, o)),
            gt(e) && s.set(e, u),
            u
        )
    }
    function Bn(t, e, r, n = !1) {
        const { mixins: i, extends: s } = e
        s && Bn(t, s, r, !0), i && i.forEach((o) => Bn(t, o, r, !0))
        for (const o in e)
            if (!(n && o === 'expose')) {
                const l = Xu[o] || (r && r[o])
                t[o] = l ? l(t[o], e[o]) : e[o]
            }
        return t
    }
    const Xu = {
        data: Cs,
        props: ks,
        emits: ks,
        methods: nn,
        computed: nn,
        beforeCreate: Et,
        created: Et,
        beforeMount: Et,
        mounted: Et,
        beforeUpdate: Et,
        updated: Et,
        beforeDestroy: Et,
        beforeUnmount: Et,
        destroyed: Et,
        unmounted: Et,
        activated: Et,
        deactivated: Et,
        errorCaptured: Et,
        serverPrefetch: Et,
        components: nn,
        directives: nn,
        watch: Yu,
        provide: Cs,
        inject: Wu
    }
    function Cs(t, e) {
        return e
            ? t
                ? function () {
                      return mt(tt(t) ? t.call(this, this) : t, tt(e) ? e.call(this, this) : e)
                  }
                : e
            : t
    }
    function Wu(t, e) {
        return nn(Zr(t), Zr(e))
    }
    function Zr(t) {
        if (J(t)) {
            const e = {}
            for (let r = 0; r < t.length; r++) e[t[r]] = t[r]
            return e
        }
        return t
    }
    function Et(t, e) {
        return t ? [...new Set([].concat(t, e))] : e
    }
    function nn(t, e) {
        return t ? mt(Object.create(null), t, e) : e
    }
    function ks(t, e) {
        return t
            ? J(t) && J(e)
                ? [...new Set([...t, ...e])]
                : mt(Object.create(null), $s(t), $s(e ?? {}))
            : e
    }
    function Yu(t, e) {
        if (!t) return e
        if (!e) return t
        const r = mt(Object.create(null), t)
        for (const n in e) r[n] = Et(t[n], e[n])
        return r
    }
    function Is() {
        return {
            app: null,
            config: {
                isNativeTag: El,
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
            provides: Object.create(null),
            optionsCache: new WeakMap(),
            propsCache: new WeakMap(),
            emitsCache: new WeakMap()
        }
    }
    let Gu = 0
    function Zu(t, e) {
        return function (n, i = null) {
            tt(n) || (n = mt({}, n)), i != null && !gt(i) && (i = null)
            const s = Is(),
                o = new WeakSet()
            let l = !1
            const u = (s.app = {
                _uid: Gu++,
                _component: n,
                _props: i,
                _container: null,
                _context: s,
                _instance: null,
                version: Cf,
                get config() {
                    return s.config
                },
                set config(f) {},
                use(f, ...c) {
                    return (
                        o.has(f) ||
                            (f && tt(f.install)
                                ? (o.add(f), f.install(u, ...c))
                                : tt(f) && (o.add(f), f(u, ...c))),
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
                        const h = ue(n, i)
                        return (
                            (h.appContext = s),
                            a === !0 ? (a = 'svg') : a === !1 && (a = void 0),
                            c && e ? e(h, f) : t(h, f, a),
                            (l = !0),
                            (u._container = f),
                            (f.__vue_app__ = u),
                            Zn(h.component) || h.component.proxy
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
                    const c = rn
                    rn = u
                    try {
                        return f()
                    } finally {
                        rn = c
                    }
                }
            })
            return u
        }
    }
    let rn = null
    function Qu(t, e) {
        if (St) {
            let r = St.provides
            const n = St.parent && St.parent.provides
            n === r && (r = St.provides = Object.create(n)), (r[t] = e)
        }
    }
    function qn(t, e, r = !1) {
        const n = St || kt
        if (n || rn) {
            const i = n
                ? n.parent == null
                    ? n.vnode.appContext && n.vnode.appContext.provides
                    : n.parent.provides
                : rn._context.provides
            if (i && t in i) return i[t]
            if (arguments.length > 1) return r && tt(e) ? e.call(n && n.proxy) : e
        }
    }
    function Ju(t, e, r, n = !1) {
        const i = {},
            s = {}
        Nn(s, Kn, 1), (t.propsDefaults = Object.create(null)), Ps(t, e, i, s)
        for (const o in t.propsOptions[0]) o in i || (i[o] = void 0)
        r ? (t.props = n ? i : su(i)) : t.type.props ? (t.props = i) : (t.props = s), (t.attrs = s)
    }
    function tf(t, e, r, n) {
        const {
                props: i,
                attrs: s,
                vnode: { patchFlag: o }
            } = t,
            l = ct(i),
            [u] = t.propsOptions
        let f = !1
        if ((n || o > 0) && !(o & 16)) {
            if (o & 8) {
                const c = t.vnode.dynamicProps
                for (let a = 0; a < c.length; a++) {
                    let h = c[a]
                    if (zn(t.emitsOptions, h)) continue
                    const g = e[h]
                    if (u)
                        if (ft(s, h)) g !== s[h] && ((s[h] = g), (f = !0))
                        else {
                            const w = ie(h)
                            i[w] = Qr(u, l, w, g, t, !1)
                        }
                    else g !== s[h] && ((s[h] = g), (f = !0))
                }
            }
        } else {
            Ps(t, e, i, s) && (f = !0)
            let c
            for (const a in l)
                (!e || (!ft(e, a) && ((c = Dt(a)) === a || !ft(e, c)))) &&
                    (u
                        ? r &&
                          (r[a] !== void 0 || r[c] !== void 0) &&
                          (i[a] = Qr(u, l, a, void 0, t, !0))
                        : delete i[a])
            if (s !== l) for (const a in s) (!e || !ft(e, a)) && (delete s[a], (f = !0))
        }
        f && se(t, 'set', '$attrs')
    }
    function Ps(t, e, r, n) {
        const [i, s] = t.propsOptions
        let o = !1,
            l
        if (e)
            for (let u in e) {
                if (Ge(u)) continue
                const f = e[u]
                let c
                i && ft(i, (c = ie(u)))
                    ? !s || !s.includes(c)
                        ? (r[c] = f)
                        : ((l || (l = {}))[c] = f)
                    : zn(t.emitsOptions, u) || ((!(u in n) || f !== n[u]) && ((n[u] = f), (o = !0)))
            }
        if (s) {
            const u = ct(r),
                f = l || ut
            for (let c = 0; c < s.length; c++) {
                const a = s[c]
                r[a] = Qr(i, u, a, f[a], t, !ft(f, a))
            }
        }
        return o
    }
    function Qr(t, e, r, n, i, s) {
        const o = t[r]
        if (o != null) {
            const l = ft(o, 'default')
            if (l && n === void 0) {
                const u = o.default
                if (o.type !== Function && !o.skipFactory && tt(u)) {
                    const { propsDefaults: f } = i
                    if (r in f) n = f[r]
                    else {
                        const c = fn(i)
                        ;(n = f[r] = u.call(null, e)), c()
                    }
                } else n = u
            }
            o[0] && (s && !l ? (n = !1) : o[1] && (n === '' || n === Dt(r)) && (n = !0))
        }
        return n
    }
    function js(t, e, r = !1) {
        const n = e.propsCache,
            i = n.get(t)
        if (i) return i
        const s = t.props,
            o = {},
            l = []
        let u = !1
        if (!tt(t)) {
            const c = (a) => {
                u = !0
                const [h, g] = js(a, e, !0)
                mt(o, h), g && l.push(...g)
            }
            !r && e.mixins.length && e.mixins.forEach(c),
                t.extends && c(t.extends),
                t.mixins && t.mixins.forEach(c)
        }
        if (!s && !u) return gt(t) && n.set(t, zt), zt
        if (J(s))
            for (let c = 0; c < s.length; c++) {
                const a = ie(s[c])
                Ls(a) && (o[a] = ut)
            }
        else if (s)
            for (const c in s) {
                const a = ie(c)
                if (Ls(a)) {
                    const h = s[c],
                        g = (o[a] = J(h) || tt(h) ? { type: h } : mt({}, h))
                    if (g) {
                        const w = zs(Boolean, g.type),
                            y = zs(String, g.type)
                        ;(g[0] = w > -1),
                            (g[1] = y < 0 || w < y),
                            (w > -1 || ft(g, 'default')) && l.push(a)
                    }
                }
            }
        const f = [o, l]
        return gt(t) && n.set(t, f), f
    }
    function Ls(t) {
        return t[0] !== '$' && !Ge(t)
    }
    function Os(t) {
        return t === null
            ? 'null'
            : typeof t == 'function'
              ? t.name || ''
              : (typeof t == 'object' && t.constructor && t.constructor.name) || ''
    }
    function Fs(t, e) {
        return Os(t) === Os(e)
    }
    function zs(t, e) {
        return J(e) ? e.findIndex((r) => Fs(r, t)) : tt(e) && Fs(e, t) ? 0 : -1
    }
    const As = (t) => t[0] === '_' || t === '$stable',
        Jr = (t) => (J(t) ? t.map(Qt) : [Qt(t)]),
        ef = (t, e, r) => {
            if (e._n) return e
            const n = xu((...i) => Jr(e(...i)), r)
            return (n._c = !1), n
        },
        Vs = (t, e, r) => {
            const n = t._ctx
            for (const i in t) {
                if (As(i)) continue
                const s = t[i]
                if (tt(s)) e[i] = ef(i, s, n)
                else if (s != null) {
                    const o = Jr(s)
                    e[i] = () => o
                }
            }
        },
        Ds = (t, e) => {
            const r = Jr(e)
            t.slots.default = () => r
        },
        nf = (t, e) => {
            if (t.vnode.shapeFlag & 32) {
                const r = e._
                r ? ((t.slots = ct(e)), Nn(e, '_', r)) : Vs(e, (t.slots = {}))
            } else (t.slots = {}), e && Ds(t, e)
            Nn(t.slots, Kn, 1)
        },
        rf = (t, e, r) => {
            const { vnode: n, slots: i } = t
            let s = !0,
                o = ut
            if (n.shapeFlag & 32) {
                const l = e._
                l
                    ? r && l === 1
                        ? (s = !1)
                        : (mt(i, e), !r && l === 1 && delete i._)
                    : ((s = !e.$stable), Vs(e, i)),
                    (o = e)
            } else e && (Ds(t, e), (o = { default: 1 }))
            if (s) for (const l in i) !As(l) && o[l] == null && delete i[l]
        }
    function ti(t, e, r, n, i = !1) {
        if (J(t)) {
            t.forEach((h, g) => ti(h, e && (J(e) ? e[g] : e), r, n, i))
            return
        }
        if (Dn(n) && !i) return
        const s = n.shapeFlag & 4 ? Zn(n.component) || n.component.proxy : n.el,
            o = i ? null : s,
            { i: l, r: u } = t,
            f = e && e.r,
            c = l.refs === ut ? (l.refs = {}) : l.refs,
            a = l.setupState
        if (
            (f != null &&
                f !== u &&
                (wt(f) ? ((c[f] = null), ft(a, f) && (a[f] = null)) : bt(f) && (f.value = null)),
            tt(u))
        )
            oe(u, l, 12, [o, c])
        else {
            const h = wt(u),
                g = bt(u)
            if (h || g) {
                const w = () => {
                    if (t.f) {
                        const y = h ? (ft(a, u) ? a[u] : c[u]) : u.value
                        i
                            ? J(y) && Er(y, s)
                            : J(y)
                              ? y.includes(s) || y.push(s)
                              : h
                                ? ((c[u] = [s]), ft(a, u) && (a[u] = c[u]))
                                : ((u.value = [s]), t.k && (c[t.k] = u.value))
                    } else
                        h
                            ? ((c[u] = o), ft(a, u) && (a[u] = o))
                            : g && ((u.value = o), t.k && (c[t.k] = o))
                }
                o ? ((w.id = -1), Tt(w, r)) : w()
            }
        }
    }
    const Tt = Nu
    function sf(t) {
        return of(t)
    }
    function of(t, e) {
        const r = zi()
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
                setScopeId: g = At,
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
                p && !un(p, v) && ((N = A(p)), rt(p, C, L, !0), (p = null)),
                    v.patchFlag === -2 && ((F = !1), (v.dynamicChildren = null))
                const { type: k, ref: q, shapeFlag: Y } = v
                switch (k) {
                    case Un:
                        _(p, v, E, N)
                        break
                    case sn:
                        d(p, v, E, N)
                        break
                    case ni:
                        p == null && M(v, E, N, V)
                        break
                    case Zt:
                        at(p, v, E, N, C, L, V, j, F)
                        break
                    default:
                        Y & 1
                            ? S(p, v, E, N, C, L, V, j, F)
                            : Y & 6
                              ? st(p, v, E, N, C, L, V, j, F)
                              : (Y & 64 || Y & 128) && k.process(p, v, E, N, C, L, V, j, F, ot)
                }
                q != null && C && ti(q, p && p.ref, L, v || p, !v)
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
                const { props: q, shapeFlag: Y, transition: W, dirs: Q } = p
                if (
                    ((F = p.el = o(p.type, L, q && q.is, q)),
                    Y & 8
                        ? c(F, p.children)
                        : Y & 16 && H(p.children, F, null, N, C, ei(p, L), V, j),
                    Q && Ne(p, null, N, 'created'),
                    z(F, p, p.scopeId, V, N),
                    q)
                ) {
                    for (const ht in q)
                        ht !== 'value' && !Ge(ht) && s(F, ht, null, q[ht], L, p.children, N, C, R)
                    'value' in q && s(F, 'value', null, q.value, L),
                        (k = q.onVnodeBeforeMount) && Jt(k, N, p)
                }
                Q && Ne(p, null, N, 'beforeMount')
                const lt = lf(C, W)
                lt && W.beforeEnter(F),
                    n(F, v, E),
                    ((k = q && q.onVnodeMounted) || lt || Q) &&
                        Tt(() => {
                            k && Jt(k, N, p), lt && W.enter(F), Q && Ne(p, null, N, 'mounted')
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
                    const q = (p[k] = j ? ye(p[k]) : Qt(p[k]))
                    y(null, q, v, E, N, C, L, V, j)
                }
            },
            G = (p, v, E, N, C, L, V) => {
                const j = (v.el = p.el)
                let { patchFlag: F, dynamicChildren: k, dirs: q } = v
                F |= p.patchFlag & 16
                const Y = p.props || ut,
                    W = v.props || ut
                let Q
                if (
                    (E && Te(E, !1),
                    (Q = W.onVnodeBeforeUpdate) && Jt(Q, E, v, p),
                    q && Ne(v, p, E, 'beforeUpdate'),
                    E && Te(E, !0),
                    k
                        ? X(p.dynamicChildren, k, j, E, N, ei(v, C), L)
                        : V || P(p, v, j, null, E, N, ei(v, C), L, !1),
                    F > 0)
                ) {
                    if (F & 16) et(j, v, Y, W, E, N, C)
                    else if (
                        (F & 2 && Y.class !== W.class && s(j, 'class', null, W.class, C),
                        F & 4 && s(j, 'style', Y.style, W.style, C),
                        F & 8)
                    ) {
                        const lt = v.dynamicProps
                        for (let ht = 0; ht < lt.length; ht++) {
                            const pt = lt[ht],
                                _t = Y[pt],
                                Yt = W[pt]
                            ;(Yt !== _t || pt === 'value') &&
                                s(j, pt, _t, Yt, C, p.children, E, N, R)
                        }
                    }
                    F & 1 && p.children !== v.children && c(j, v.children)
                } else !V && k == null && et(j, v, Y, W, E, N, C)
                ;((Q = W.onVnodeUpdated) || q) &&
                    Tt(() => {
                        Q && Jt(Q, E, v, p), q && Ne(v, p, E, 'updated')
                    }, N)
            },
            X = (p, v, E, N, C, L, V) => {
                for (let j = 0; j < v.length; j++) {
                    const F = p[j],
                        k = v[j],
                        q = F.el && (F.type === Zt || !un(F, k) || F.shapeFlag & 70) ? a(F.el) : E
                    y(F, k, q, null, N, C, L, V, !0)
                }
            },
            et = (p, v, E, N, C, L, V) => {
                if (E !== N) {
                    if (E !== ut)
                        for (const j in E)
                            !Ge(j) && !(j in N) && s(p, j, E[j], null, V, v.children, C, L, R)
                    for (const j in N) {
                        if (Ge(j)) continue
                        const F = N[j],
                            k = E[j]
                        F !== k && j !== 'value' && s(p, j, k, F, V, v.children, C, L, R)
                    }
                    'value' in N && s(p, 'value', E.value, N.value, V)
                }
            },
            at = (p, v, E, N, C, L, V, j, F) => {
                const k = (v.el = p ? p.el : l('')),
                    q = (v.anchor = p ? p.anchor : l(''))
                let { patchFlag: Y, dynamicChildren: W, slotScopeIds: Q } = v
                Q && (j = j ? j.concat(Q) : Q),
                    p == null
                        ? (n(k, E, N), n(q, E, N), H(v.children || [], E, q, C, L, V, j, F))
                        : Y > 0 && Y & 64 && W && p.dynamicChildren
                          ? (X(p.dynamicChildren, W, E, C, L, V, j),
                            (v.key != null || (C && v === C.subTree)) && Hs(p, v, !0))
                          : P(p, v, E, q, C, L, V, j, F)
            },
            st = (p, v, E, N, C, L, V, j, F) => {
                ;(v.slotScopeIds = j),
                    p == null
                        ? v.shapeFlag & 512
                            ? C.ctx.activate(v, E, N, V, F)
                            : x(v, E, N, C, L, V, F)
                        : O(p, v, F)
            },
            x = (p, v, E, N, C, L, V) => {
                const j = (p.component = xf(p, N, C))
                if ((Ss(p) && (j.ctx.renderer = ot), bf(j), j.asyncDep)) {
                    if ((C && C.registerDep(j, b), !p.el)) {
                        const F = (j.subTree = ue(sn))
                        d(null, F, v, E)
                    }
                } else b(j, p, v, E, C, L, V)
            },
            O = (p, v, E) => {
                const N = (v.component = p.component)
                if (Su(p, v, E))
                    if (N.asyncDep && !N.asyncResolved) {
                        I(N, v, E)
                        return
                    } else (N.next = v), wu(N.update), (N.effect.dirty = !0), N.update()
                else (v.el = p.el), (N.vnode = v)
            },
            b = (p, v, E, N, C, L, V) => {
                const j = () => {
                        if (p.isMounted) {
                            let { next: q, bu: Y, u: W, parent: Q, vnode: lt } = p
                            {
                                const We = Bs(p)
                                if (We) {
                                    q && ((q.el = lt.el), I(p, q, V)),
                                        We.asyncDep.then(() => {
                                            p.isUnmounted || j()
                                        })
                                    return
                                }
                            }
                            let ht = q,
                                pt
                            Te(p, !1),
                                q ? ((q.el = lt.el), I(p, q, V)) : (q = lt),
                                Y && Rr(Y),
                                (pt = q.props && q.props.onVnodeBeforeUpdate) && Jt(pt, Q, q, lt),
                                Te(p, !0)
                            const _t = qr(p),
                                Yt = p.subTree
                            ;(p.subTree = _t),
                                y(Yt, _t, a(Yt.el), A(Yt), p, C, L),
                                (q.el = _t.el),
                                ht === null && Mu(p, _t.el),
                                W && Tt(W, C),
                                (pt = q.props && q.props.onVnodeUpdated) &&
                                    Tt(() => Jt(pt, Q, q, lt), C)
                        } else {
                            let q
                            const { el: Y, props: W } = v,
                                { bm: Q, m: lt, parent: ht } = p,
                                pt = Dn(v)
                            if (
                                (Te(p, !1),
                                Q && Rr(Q),
                                !pt && (q = W && W.onVnodeBeforeMount) && Jt(q, ht, v),
                                Te(p, !0),
                                Y && jt)
                            ) {
                                const _t = () => {
                                    ;(p.subTree = qr(p)), jt(Y, p.subTree, p, C, null)
                                }
                                pt
                                    ? v.type.__asyncLoader().then(() => !p.isUnmounted && _t())
                                    : _t()
                            } else {
                                const _t = (p.subTree = qr(p))
                                y(null, _t, E, N, p, C, L), (v.el = _t.el)
                            }
                            if ((lt && Tt(lt, C), !pt && (q = W && W.onVnodeMounted))) {
                                const _t = v
                                Tt(() => Jt(q, ht, _t), C)
                            }
                            ;(v.shapeFlag & 256 ||
                                (ht && Dn(ht.vnode) && ht.vnode.shapeFlag & 256)) &&
                                p.a &&
                                Tt(p.a, C),
                                (p.isMounted = !0),
                                (v = E = N = null)
                        }
                    },
                    F = (p.effect = new Tr(j, At, () => Br(k), p.scope)),
                    k = (p.update = () => {
                        F.dirty && F.run()
                    })
                ;(k.id = p.uid), Te(p, !0), k()
            },
            I = (p, v, E) => {
                v.component = p
                const N = p.vnode.props
                ;(p.vnode = v),
                    (p.next = null),
                    tf(p, v.props, N, E),
                    rf(p, v.children, E),
                    pe(),
                    gs(p),
                    ge()
            },
            P = (p, v, E, N, C, L, V, j, F = !1) => {
                const k = p && p.children,
                    q = p ? p.shapeFlag : 0,
                    Y = v.children,
                    { patchFlag: W, shapeFlag: Q } = v
                if (W > 0) {
                    if (W & 128) {
                        K(k, Y, E, N, C, L, V, j, F)
                        return
                    } else if (W & 256) {
                        U(k, Y, E, N, C, L, V, j, F)
                        return
                    }
                }
                Q & 8
                    ? (q & 16 && R(k, C, L), Y !== k && c(E, Y))
                    : q & 16
                      ? Q & 16
                          ? K(k, Y, E, N, C, L, V, j, F)
                          : R(k, C, L, !0)
                      : (q & 8 && c(E, ''), Q & 16 && H(Y, E, N, C, L, V, j, F))
            },
            U = (p, v, E, N, C, L, V, j, F) => {
                ;(p = p || zt), (v = v || zt)
                const k = p.length,
                    q = v.length,
                    Y = Math.min(k, q)
                let W
                for (W = 0; W < Y; W++) {
                    const Q = (v[W] = F ? ye(v[W]) : Qt(v[W]))
                    y(p[W], Q, E, null, C, L, V, j, F)
                }
                k > q ? R(p, C, L, !0, !1, Y) : H(v, E, N, C, L, V, j, F, Y)
            },
            K = (p, v, E, N, C, L, V, j, F) => {
                let k = 0
                const q = v.length
                let Y = p.length - 1,
                    W = q - 1
                for (; k <= Y && k <= W; ) {
                    const Q = p[k],
                        lt = (v[k] = F ? ye(v[k]) : Qt(v[k]))
                    if (un(Q, lt)) y(Q, lt, E, null, C, L, V, j, F)
                    else break
                    k++
                }
                for (; k <= Y && k <= W; ) {
                    const Q = p[Y],
                        lt = (v[W] = F ? ye(v[W]) : Qt(v[W]))
                    if (un(Q, lt)) y(Q, lt, E, null, C, L, V, j, F)
                    else break
                    Y--, W--
                }
                if (k > Y) {
                    if (k <= W) {
                        const Q = W + 1,
                            lt = Q < q ? v[Q].el : N
                        for (; k <= W; )
                            y(null, (v[k] = F ? ye(v[k]) : Qt(v[k])), E, lt, C, L, V, j, F), k++
                    }
                } else if (k > W) for (; k <= Y; ) rt(p[k], C, L, !0), k++
                else {
                    const Q = k,
                        lt = k,
                        ht = new Map()
                    for (k = lt; k <= W; k++) {
                        const Lt = (v[k] = F ? ye(v[k]) : Qt(v[k]))
                        Lt.key != null && ht.set(Lt.key, k)
                    }
                    let pt,
                        _t = 0
                    const Yt = W - lt + 1
                    let We = !1,
                        vl = 0
                    const En = new Array(Yt)
                    for (k = 0; k < Yt; k++) En[k] = 0
                    for (k = Q; k <= Y; k++) {
                        const Lt = p[k]
                        if (_t >= Yt) {
                            rt(Lt, C, L, !0)
                            continue
                        }
                        let re
                        if (Lt.key != null) re = ht.get(Lt.key)
                        else
                            for (pt = lt; pt <= W; pt++)
                                if (En[pt - lt] === 0 && un(Lt, v[pt])) {
                                    re = pt
                                    break
                                }
                        re === void 0
                            ? rt(Lt, C, L, !0)
                            : ((En[re - lt] = k + 1),
                              re >= vl ? (vl = re) : (We = !0),
                              y(Lt, v[re], E, null, C, L, V, j, F),
                              _t++)
                    }
                    const xl = We ? uf(En) : zt
                    for (pt = xl.length - 1, k = Yt - 1; k >= 0; k--) {
                        const Lt = lt + k,
                            re = v[Lt],
                            bl = Lt + 1 < q ? v[Lt + 1].el : N
                        En[k] === 0
                            ? y(null, re, E, bl, C, L, V, j, F)
                            : We && (pt < 0 || k !== xl[pt] ? nt(re, E, bl, 2) : pt--)
                    }
                }
            },
            nt = (p, v, E, N, C = null) => {
                const { el: L, type: V, transition: j, children: F, shapeFlag: k } = p
                if (k & 6) {
                    nt(p.component.subTree, v, E, N)
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
                if (V === Zt) {
                    n(L, v, E)
                    for (let Y = 0; Y < F.length; Y++) nt(F[Y], v, E, N)
                    n(p.anchor, v, E)
                    return
                }
                if (V === ni) {
                    $(p, v, E)
                    return
                }
                if (N !== 2 && k & 1 && j)
                    if (N === 0) j.beforeEnter(L), n(L, v, E), Tt(() => j.enter(L), C)
                    else {
                        const { leave: Y, delayLeave: W, afterLeave: Q } = j,
                            lt = () => n(L, v, E),
                            ht = () => {
                                Y(L, () => {
                                    lt(), Q && Q()
                                })
                            }
                        W ? W(L, lt, ht) : ht()
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
                if ((j != null && ti(j, null, E, p, !0), q & 256)) {
                    v.ctx.deactivate(p)
                    return
                }
                const Q = q & 1 && W,
                    lt = !Dn(p)
                let ht
                if ((lt && (ht = V && V.onVnodeBeforeUnmount) && Jt(ht, v, p), q & 6))
                    yt(p.component, E, N)
                else {
                    if (q & 128) {
                        p.suspense.unmount(E, N)
                        return
                    }
                    Q && Ne(p, null, v, 'beforeUnmount'),
                        q & 64
                            ? p.type.remove(p, v, E, C, ot, N)
                            : k && (L !== Zt || (Y > 0 && Y & 64))
                              ? R(k, v, E, !1, !0)
                              : ((L === Zt && Y & 384) || (!C && q & 16)) && R(F, v, E),
                        N && vt(p)
                }
                ;((lt && (ht = V && V.onVnodeUnmounted)) || Q) &&
                    Tt(() => {
                        ht && Jt(ht, v, p), Q && Ne(p, null, v, 'unmounted')
                    }, E)
            },
            vt = (p) => {
                const { type: v, el: E, anchor: N, transition: C } = p
                if (v === Zt) {
                    dt(E, N)
                    return
                }
                if (v === ni) {
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
            dt = (p, v) => {
                let E
                for (; p !== v; ) (E = h(p)), i(p), (p = E)
                i(v)
            },
            yt = (p, v, E) => {
                const { bum: N, scope: C, update: L, subTree: V, um: j } = p
                N && Rr(N),
                    C.stop(),
                    L && ((L.active = !1), rt(V, p, v, E)),
                    j && Tt(j, v),
                    Tt(() => {
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
                    D || ((D = !0), gs(), ms(), (D = !1)),
                    (v._vnode = p)
            },
            ot = { p: y, um: rt, m: nt, r: vt, mt: x, mc: H, pc: P, pbc: X, n: A, o: t }
        let Ee, jt
        return e && ([Ee, jt] = e(ot)), { render: B, hydrate: Ee, createApp: Zu(B, Ee) }
    }
    function ei({ type: t, props: e }, r) {
        return (r === 'svg' && t === 'foreignObject') ||
            (r === 'mathml' &&
                t === 'annotation-xml' &&
                e &&
                e.encoding &&
                e.encoding.includes('html'))
            ? void 0
            : r
    }
    function Te({ effect: t, update: e }, r) {
        t.allowRecurse = e.allowRecurse = r
    }
    function lf(t, e) {
        return (!t || (t && !t.pendingBranch)) && e && !e.persisted
    }
    function Hs(t, e, r = !1) {
        const n = t.children,
            i = e.children
        if (J(n) && J(i))
            for (let s = 0; s < n.length; s++) {
                const o = n[s]
                let l = i[s]
                l.shapeFlag & 1 &&
                    !l.dynamicChildren &&
                    ((l.patchFlag <= 0 || l.patchFlag === 32) &&
                        ((l = i[s] = ye(i[s])), (l.el = o.el)),
                    r || Hs(o, l)),
                    l.type === Un && (l.el = o.el)
            }
    }
    function uf(t) {
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
    function Bs(t) {
        const e = t.subTree.component
        if (e) return e.asyncDep && !e.asyncResolved ? e : Bs(e)
    }
    const ff = (t) => t.__isTeleport,
        Zt = Symbol.for('v-fgt'),
        Un = Symbol.for('v-txt'),
        sn = Symbol.for('v-cmt'),
        ni = Symbol.for('v-stc'),
        on = []
    let qt = null
    function cf(t = !1) {
        on.push((qt = t ? null : []))
    }
    function af() {
        on.pop(), (qt = on[on.length - 1] || null)
    }
    let ln = 1
    function qs(t) {
        ln += t
    }
    function hf(t) {
        return (t.dynamicChildren = ln > 0 ? qt || zt : null), af(), ln > 0 && qt && qt.push(t), t
    }
    function df(t, e, r, n, i, s) {
        return hf(Wn(t, e, r, n, i, s, !0))
    }
    function pf(t) {
        return t ? t.__v_isVNode === !0 : !1
    }
    function un(t, e) {
        return t.type === e.type && t.key === e.key
    }
    const Kn = '__vInternal',
        Us = ({ key: t }) => t ?? null,
        Xn = ({ ref: t, ref_key: e, ref_for: r }) => (
            typeof t == 'number' && (t = '' + t),
            t != null ? (wt(t) || bt(t) || tt(t) ? { i: kt, r: t, k: e, f: !!r } : t) : null
        )
    function Wn(t, e = null, r = null, n = 0, i = null, s = t === Zt ? 0 : 1, o = !1, l = !1) {
        const u = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: t,
            props: e,
            key: e && Us(e),
            ref: e && Xn(e),
            scopeId: _s,
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
            ctx: kt
        }
        return (
            l ? (ri(u, r), s & 128 && t.normalize(u)) : r && (u.shapeFlag |= wt(r) ? 8 : 16),
            ln > 0 && !o && qt && (u.patchFlag > 0 || s & 6) && u.patchFlag !== 32 && qt.push(u),
            u
        )
    }
    const ue = gf
    function gf(t, e = null, r = null, n = 0, i = null, s = !1) {
        if (((!t || t === Ru) && (t = sn), pf(t))) {
            const l = ze(t, e, !0)
            return (
                r && ri(l, r),
                ln > 0 && !s && qt && (l.shapeFlag & 6 ? (qt[qt.indexOf(t)] = l) : qt.push(l)),
                (l.patchFlag |= -2),
                l
            )
        }
        if ((Tf(t) && (t = t.__vccOpts), e)) {
            e = mf(e)
            let { class: l, style: u } = e
            l && !wt(l) && (e.class = Nr(l)),
                gt(u) && (ss(u) && !J(u) && (u = mt({}, u)), (e.style = $r(u)))
        }
        const o = wt(t) ? 1 : $u(t) ? 128 : ff(t) ? 64 : gt(t) ? 4 : tt(t) ? 2 : 0
        return Wn(t, e, r, n, i, o, s, !0)
    }
    function mf(t) {
        return t ? (ss(t) || Kn in t ? mt({}, t) : t) : null
    }
    function ze(t, e, r = !1) {
        const { props: n, ref: i, patchFlag: s, children: o } = t,
            l = e ? yf(n || {}, e) : n
        return {
            __v_isVNode: !0,
            __v_skip: !0,
            type: t.type,
            props: l,
            key: l && Us(l),
            ref: e && e.ref ? (r && i ? (J(i) ? i.concat(Xn(e)) : [i, Xn(e)]) : Xn(e)) : i,
            scopeId: t.scopeId,
            slotScopeIds: t.slotScopeIds,
            children: o,
            target: t.target,
            targetAnchor: t.targetAnchor,
            staticCount: t.staticCount,
            shapeFlag: t.shapeFlag,
            patchFlag: e && t.type !== Zt ? (s === -1 ? 16 : s | 16) : s,
            dynamicProps: t.dynamicProps,
            dynamicChildren: t.dynamicChildren,
            appContext: t.appContext,
            dirs: t.dirs,
            transition: t.transition,
            component: t.component,
            suspense: t.suspense,
            ssContent: t.ssContent && ze(t.ssContent),
            ssFallback: t.ssFallback && ze(t.ssFallback),
            el: t.el,
            anchor: t.anchor,
            ctx: t.ctx,
            ce: t.ce
        }
    }
    function wf(t = ' ', e = 0) {
        return ue(Un, null, t, e)
    }
    function Qt(t) {
        return t == null || typeof t == 'boolean'
            ? ue(sn)
            : J(t)
              ? ue(Zt, null, t.slice())
              : typeof t == 'object'
                ? ye(t)
                : ue(Un, null, String(t))
    }
    function ye(t) {
        return (t.el === null && t.patchFlag !== -1) || t.memo ? t : ze(t)
    }
    function ri(t, e) {
        let r = 0
        const { shapeFlag: n } = t
        if (e == null) e = null
        else if (J(e)) r = 16
        else if (typeof e == 'object')
            if (n & 65) {
                const i = e.default
                i && (i._c && (i._d = !1), ri(t, i()), i._c && (i._d = !0))
                return
            } else {
                r = 32
                const i = e._
                !i && !(Kn in e)
                    ? (e._ctx = kt)
                    : i === 3 &&
                      kt &&
                      (kt.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)))
            }
        else
            tt(e)
                ? ((e = { default: e, _ctx: kt }), (r = 32))
                : ((e = String(e)), n & 64 ? ((r = 16), (e = [wf(e)])) : (r = 8))
        ;(t.children = e), (t.shapeFlag |= r)
    }
    function yf(...t) {
        const e = {}
        for (let r = 0; r < t.length; r++) {
            const n = t[r]
            for (const i in n)
                if (i === 'class') e.class !== n.class && (e.class = Nr([e.class, n.class]))
                else if (i === 'style') e.style = $r([e.style, n.style])
                else if (Sn(i)) {
                    const s = e[i],
                        o = n[i]
                    o && s !== o && !(J(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o)
                } else i !== '' && (e[i] = n[i])
        }
        return e
    }
    function Jt(t, e, r, n = null) {
        Bt(t, e, 7, [r, n])
    }
    const _f = Is()
    let vf = 0
    function xf(t, e, r) {
        const n = t.type,
            i = (e ? e.appContext : t.appContext) || _f,
            s = {
                uid: vf++,
                vnode: t,
                type: n,
                parent: e,
                appContext: i,
                root: null,
                next: null,
                subTree: null,
                effect: null,
                update: null,
                scope: new Fl(!0),
                render: null,
                proxy: null,
                exposed: null,
                exposeProxy: null,
                withProxy: null,
                provides: e ? e.provides : Object.create(i.provides),
                accessCache: null,
                renderCache: [],
                components: null,
                directives: null,
                propsOptions: js(n, i),
                emitsOptions: ys(n, i),
                emit: null,
                emitted: null,
                propsDefaults: ut,
                inheritAttrs: n.inheritAttrs,
                ctx: ut,
                data: ut,
                props: ut,
                attrs: ut,
                slots: ut,
                refs: ut,
                setupState: ut,
                setupContext: null,
                attrsProxy: null,
                slotsProxy: null,
                suspense: r,
                suspenseId: r ? r.pendingId : 0,
                asyncDep: null,
                asyncResolved: !1,
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
            (s.emit = vu.bind(null, s)),
            t.ce && t.ce(s),
            s
        )
    }
    let St = null,
        Yn,
        ii
    {
        const t = zi(),
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
        ;(Yn = e('__VUE_INSTANCE_SETTERS__', (r) => (St = r))),
            (ii = e('__VUE_SSR_SETTERS__', (r) => (Gn = r)))
    }
    const fn = (t) => {
            const e = St
            return (
                Yn(t),
                t.scope.on(),
                () => {
                    t.scope.off(), Yn(e)
                }
            )
        },
        Ks = () => {
            St && St.scope.off(), Yn(null)
        }
    function Xs(t) {
        return t.vnode.shapeFlag & 4
    }
    let Gn = !1
    function bf(t, e = !1) {
        e && ii(e)
        const { props: r, children: n } = t.vnode,
            i = Xs(t)
        Ju(t, r, i, e), nf(t, n)
        const s = i ? Ef(t, e) : void 0
        return e && ii(!1), s
    }
    function Ef(t, e) {
        const r = t.type
        ;(t.accessCache = Object.create(null)), (t.proxy = os(new Proxy(t.ctx, qu)))
        const { setup: n } = r
        if (n) {
            const i = (t.setupContext = n.length > 1 ? Mf(t) : null),
                s = fn(t)
            pe()
            const o = oe(n, t, 0, [t.props, i])
            if ((ge(), s(), ji(o))) {
                if ((o.then(Ks, Ks), e))
                    return o
                        .then((l) => {
                            Ws(t, l, e)
                        })
                        .catch((l) => {
                            Fn(l, t, 0)
                        })
                t.asyncDep = o
            } else Ws(t, o, e)
        } else Gs(t, e)
    }
    function Ws(t, e, r) {
        tt(e)
            ? t.type.__ssrInlineRender
                ? (t.ssrRender = e)
                : (t.render = e)
            : gt(e) && (t.setupState = cs(e)),
            Gs(t, r)
    }
    let Ys
    function Gs(t, e, r) {
        const n = t.type
        if (!t.render) {
            if (!e && Ys && !n.render) {
                const i = n.template || Gr(t).template
                if (i) {
                    const { isCustomElement: s, compilerOptions: o } = t.appContext.config,
                        { delimiters: l, compilerOptions: u } = n,
                        f = mt(mt({ isCustomElement: s, delimiters: l }, o), u)
                    n.render = Ys(i, f)
                }
            }
            t.render = n.render || At
        }
        {
            const i = fn(t)
            pe()
            try {
                Uu(t)
            } finally {
                ge(), i()
            }
        }
    }
    function Sf(t) {
        return (
            t.attrsProxy ||
            (t.attrsProxy = new Proxy(t.attrs, {
                get(e, r) {
                    return Nt(t, 'get', '$attrs'), e[r]
                }
            }))
        )
    }
    function Mf(t) {
        const e = (r) => {
            t.exposed = r || {}
        }
        return {
            get attrs() {
                return Sf(t)
            },
            slots: t.slots,
            emit: t.emit,
            expose: e
        }
    }
    function Zn(t) {
        if (t.exposed)
            return (
                t.exposeProxy ||
                (t.exposeProxy = new Proxy(cs(os(t.exposed)), {
                    get(e, r) {
                        if (r in e) return e[r]
                        if (r in en) return en[r](t)
                    },
                    has(e, r) {
                        return r in e || r in en
                    }
                }))
            )
    }
    const Rf = /(?:^|[-_])(\w)/g,
        $f = (t) => t.replace(Rf, (e) => e.toUpperCase()).replace(/[-_]/g, '')
    function Nf(t, e = !0) {
        return tt(t) ? t.displayName || t.name : t.name || (e && t.__name)
    }
    function Zs(t, e, r = !1) {
        let n = Nf(e)
        if (!n && e.__file) {
            const i = e.__file.match(/([^/\\]+)\.\w+$/)
            i && (n = i[1])
        }
        if (!n && t && t.parent) {
            const i = (s) => {
                for (const o in s) if (s[o] === e) return o
            }
            n = i(t.components || t.parent.type.components) || i(t.appContext.components)
        }
        return n ? $f(n) : r ? 'App' : 'Anonymous'
    }
    function Tf(t) {
        return tt(t) && '__vccOpts' in t
    }
    const Qs = (t, e) => ou(t, e, Gn),
        Cf = '3.4.21'
    /*! (c) Andrea Giammarchi - ISC */ const kf = (() => {
        const t = 'DOMContentLoaded',
            e = new WeakMap(),
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
     **/ const If = 'http://www.w3.org/2000/svg',
        Pf = 'http://www.w3.org/1998/Math/MathML',
        _e = typeof document < 'u' ? document : null,
        Js = _e && _e.createElement('template'),
        jf = {
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
                        ? _e.createElementNS(If, t)
                        : e === 'mathml'
                          ? _e.createElementNS(Pf, t)
                          : _e.createElement(t, r ? { is: r } : void 0)
                return (
                    t === 'select' &&
                        n &&
                        n.multiple != null &&
                        i.setAttribute('multiple', n.multiple),
                    i
                )
            },
            createText: (t) => _e.createTextNode(t),
            createComment: (t) => _e.createComment(t),
            setText: (t, e) => {
                t.nodeValue = e
            },
            setElementText: (t, e) => {
                t.textContent = e
            },
            parentNode: (t) => t.parentNode,
            nextSibling: (t) => t.nextSibling,
            querySelector: (t) => _e.querySelector(t),
            setScopeId(t, e) {
                t.setAttribute(e, '')
            },
            insertStaticContent(t, e, r, n, i, s) {
                const o = r ? r.previousSibling : e.lastChild
                if (i && (i === s || i.nextSibling))
                    for (
                        ;
                        e.insertBefore(i.cloneNode(!0), r), !(i === s || !(i = i.nextSibling));

                    );
                else {
                    Js.innerHTML =
                        n === 'svg' ? `<svg>${t}</svg>` : n === 'mathml' ? `<math>${t}</math>` : t
                    const l = Js.content
                    if (n === 'svg' || n === 'mathml') {
                        const u = l.firstChild
                        for (; u.firstChild; ) l.appendChild(u.firstChild)
                        l.removeChild(u)
                    }
                    e.insertBefore(l, r)
                }
                return [o ? o.nextSibling : e.firstChild, r ? r.previousSibling : e.lastChild]
            }
        },
        Lf = Symbol('_vtc')
    function Of(t, e, r) {
        const n = t[Lf]
        n && (e = (e ? [e, ...n] : [...n]).join(' ')),
            e == null
                ? t.removeAttribute('class')
                : r
                  ? t.setAttribute('class', e)
                  : (t.className = e)
    }
    const Qn = Symbol('_vod'),
        to = Symbol('_vsh'),
        Ff = {
            beforeMount(t, { value: e }, { transition: r }) {
                ;(t[Qn] = t.style.display === 'none' ? '' : t.style.display),
                    r && e ? r.beforeEnter(t) : cn(t, e)
            },
            mounted(t, { value: e }, { transition: r }) {
                r && e && r.enter(t)
            },
            updated(t, { value: e, oldValue: r }, { transition: n }) {
                !e != !r &&
                    (n
                        ? e
                            ? (n.beforeEnter(t), cn(t, !0), n.enter(t))
                            : n.leave(t, () => {
                                  cn(t, !1)
                              })
                        : cn(t, e))
            },
            beforeUnmount(t, { value: e }) {
                cn(t, e)
            }
        }
    function cn(t, e) {
        ;(t.style.display = e ? t[Qn] : 'none'), (t[to] = !e)
    }
    const zf = Symbol(''),
        Af = /(^|;)\s*display\s*:/
    function Vf(t, e, r) {
        const n = t.style,
            i = wt(r)
        let s = !1
        if (r && !i) {
            if (e)
                if (wt(e))
                    for (const o of e.split(';')) {
                        const l = o.slice(0, o.indexOf(':')).trim()
                        r[l] == null && Jn(n, l, '')
                    }
                else for (const o in e) r[o] == null && Jn(n, o, '')
            for (const o in r) o === 'display' && (s = !0), Jn(n, o, r[o])
        } else if (i) {
            if (e !== r) {
                const o = n[zf]
                o && (r += ';' + o), (n.cssText = r), (s = Af.test(r))
            }
        } else e && t.removeAttribute('style')
        Qn in t && ((t[Qn] = s ? n.display : ''), t[to] && (n.display = 'none'))
    }
    const eo = /\s*!important$/
    function Jn(t, e, r) {
        if (J(r)) r.forEach((n) => Jn(t, e, n))
        else if ((r == null && (r = ''), e.startsWith('--'))) t.setProperty(e, r)
        else {
            const n = Df(t, e)
            eo.test(r) ? t.setProperty(Dt(n), r.replace(eo, ''), 'important') : (t[n] = r)
        }
    }
    const no = ['Webkit', 'Moz', 'ms'],
        si = {}
    function Df(t, e) {
        const r = si[e]
        if (r) return r
        let n = ie(e)
        if (n !== 'filter' && n in t) return (si[e] = n)
        n = Li(n)
        for (let i = 0; i < no.length; i++) {
            const s = no[i] + n
            if (s in t) return (si[e] = s)
        }
        return e
    }
    const ro = 'http://www.w3.org/1999/xlink'
    function Hf(t, e, r, n, i) {
        if (n && e.startsWith('xlink:'))
            r == null ? t.removeAttributeNS(ro, e.slice(6, e.length)) : t.setAttributeNS(ro, e, r)
        else {
            const s = Ol(e)
            r == null || (s && !Ai(r)) ? t.removeAttribute(e) : t.setAttribute(e, s ? '' : r)
        }
    }
    function Bf(t, e, r, n, i, s, o) {
        if (e === 'innerHTML' || e === 'textContent') {
            n && o(n, i, s), (t[e] = r ?? '')
            return
        }
        const l = t.tagName
        if (e === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
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
                ? (r = Ai(r))
                : r == null && f === 'string'
                  ? ((r = ''), (u = !0))
                  : f === 'number' && ((r = 0), (u = !0))
        }
        try {
            t[e] = r
        } catch {}
        u && t.removeAttribute(e)
    }
    function qf(t, e, r, n) {
        t.addEventListener(e, r, n)
    }
    function Uf(t, e, r, n) {
        t.removeEventListener(e, r, n)
    }
    const io = Symbol('_vei')
    function Kf(t, e, r, n, i = null) {
        const s = t[io] || (t[io] = {}),
            o = s[e]
        if (n && o) o.value = n
        else {
            const [l, u] = Xf(e)
            if (n) {
                const f = (s[e] = Gf(n, i))
                qf(t, l, f, u)
            } else o && (Uf(t, l, o, u), (s[e] = void 0))
        }
    }
    const so = /(?:Once|Passive|Capture)$/
    function Xf(t) {
        let e
        if (so.test(t)) {
            e = {}
            let n
            for (; (n = t.match(so)); )
                (t = t.slice(0, t.length - n[0].length)), (e[n[0].toLowerCase()] = !0)
        }
        return [t[2] === ':' ? t.slice(3) : Dt(t.slice(2)), e]
    }
    let oi = 0
    const Wf = Promise.resolve(),
        Yf = () => oi || (Wf.then(() => (oi = 0)), (oi = Date.now()))
    function Gf(t, e) {
        const r = (n) => {
            if (!n._vts) n._vts = Date.now()
            else if (n._vts <= r.attached) return
            Bt(Zf(n, r.value), e, 5, [n])
        }
        return (r.value = t), (r.attached = Yf()), r
    }
    function Zf(t, e) {
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
    const oo = (t) =>
            t.charCodeAt(0) === 111 &&
            t.charCodeAt(1) === 110 &&
            t.charCodeAt(2) > 96 &&
            t.charCodeAt(2) < 123,
        Qf = (t, e, r, n, i, s, o, l, u) => {
            const f = i === 'svg'
            e === 'class'
                ? Of(t, n, f)
                : e === 'style'
                  ? Vf(t, r, n)
                  : Sn(e)
                    ? br(e) || Kf(t, e, r, n, o)
                    : (
                            e[0] === '.'
                                ? ((e = e.slice(1)), !0)
                                : e[0] === '^'
                                  ? ((e = e.slice(1)), !1)
                                  : Jf(t, e, n, f)
                        )
                      ? Bf(t, e, n, s, o, l, u)
                      : (e === 'true-value'
                            ? (t._trueValue = n)
                            : e === 'false-value' && (t._falseValue = n),
                        Hf(t, e, n, f))
        }
    function Jf(t, e, r, n) {
        if (n) return !!(e === 'innerHTML' || e === 'textContent' || (e in t && oo(e) && tt(r)))
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
        return oo(e) && wt(r) ? !1 : e in t
    }
    const tc = mt({ patchProp: Qf }, jf)
    let lo
    function ec() {
        return lo || (lo = sf(tc))
    }
    const uo = (...t) => {
        ec().render(...t)
    }
    /*! #__NO_SIDE_EFFECTS__ */ function nc(t, e, r) {
        const n = Es(t)
        class i extends li {
            constructor(o) {
                super(n, o, e, r)
            }
        }
        return Ot(i, 'def', n), i
    }
    const rc = typeof HTMLElement < 'u' ? kf : class {}
    class li extends rc {
        constructor(r, n = {}, i = {}, s) {
            super()
            Ot(this, '_instance', null)
            Ot(this, '_connected', !1)
            Ot(this, '_resolved', !1)
            Ot(this, '_numberProps', null)
            Ot(this, '_styles')
            Ot(this, '_slots')
            Ot(this, '_ob', null)
            ;(this._def = r),
                (this._props = n),
                (this._config = i),
                (this._config = mt({ shadowRoot: !0 }, this._config)),
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
                ds(() => {
                    this._connected || (uo(null, this._root), (this._instance = null))
                })
        }
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
                                ((u || (u = Object.create(null)))[ie(f)] = !0))
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
        _getProp(r) {
            return this._props[r]
        }
        _setProp(r, n, i = !0, s = !0) {
            n !== this._props[r] &&
                ((this._props[r] = n),
                s && this._instance && this._update(),
                i &&
                    (n === !0
                        ? this.setAttribute(Dt(r), '')
                        : typeof n == 'string' || typeof n == 'number'
                          ? this.setAttribute(Dt(r), n + '')
                          : n || this.removeAttribute(Dt(r))))
        }
        _update() {
            uo(this._createVNode(), this._root)
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
                        return (o.innerHTML = s.innerHTML), ue(s.tagName, o, null)
                    })
                })
            const n = ue(this._def, mt({}, this._props), r)
            return (
                this._instance ||
                    (n.ce = (i) => {
                        ;(this._instance = i), this._config.shadowRoot && (i.isCE = !0)
                        const s = (l, u) => {
                            this.dispatchEvent(new CustomEvent(l, { detail: u }))
                        }
                        i.emit = (l, ...u) => {
                            s(l, u), Dt(l) !== l && s(Dt(l), u)
                        }
                        let o = this
                        for (; (o = o && (o.parentNode || o.host)); )
                            if (o instanceof li) {
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
    var ic = { value: () => {} }
    function an() {
        for (var t = 0, e = arguments.length, r = {}, n; t < e; ++t) {
            if (!(n = arguments[t] + '') || n in r || /[\s.]/.test(n))
                throw new Error('illegal type: ' + n)
            r[n] = []
        }
        return new tr(r)
    }
    function tr(t) {
        this._ = t
    }
    function sc(t, e) {
        return t
            .trim()
            .split(/^|\s+/)
            .map(function (r) {
                var n = '',
                    i = r.indexOf('.')
                if (
                    (i >= 0 && ((n = r.slice(i + 1)), (r = r.slice(0, i))),
                    r && !e.hasOwnProperty(r))
                )
                    throw new Error('unknown type: ' + r)
                return { type: r, name: n }
            })
    }
    tr.prototype = an.prototype = {
        constructor: tr,
        on: function (t, e) {
            var r = this._,
                n = sc(t + '', r),
                i,
                s = -1,
                o = n.length
            if (arguments.length < 2) {
                for (; ++s < o; ) if ((i = (t = n[s]).type) && (i = oc(r[i], t.name))) return i
                return
            }
            if (e != null && typeof e != 'function') throw new Error('invalid callback: ' + e)
            for (; ++s < o; )
                if ((i = (t = n[s]).type)) r[i] = fo(r[i], t.name, e)
                else if (e == null) for (i in r) r[i] = fo(r[i], t.name, null)
            return this
        },
        copy: function () {
            var t = {},
                e = this._
            for (var r in e) t[r] = e[r].slice()
            return new tr(t)
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
    function oc(t, e) {
        for (var r = 0, n = t.length, i; r < n; ++r) if ((i = t[r]).name === e) return i.value
    }
    function fo(t, e, r) {
        for (var n = 0, i = t.length; n < i; ++n)
            if (t[n].name === e) {
                ;(t[n] = ic), (t = t.slice(0, n).concat(t.slice(n + 1)))
                break
            }
        return r != null && t.push({ name: e, value: r }), t
    }
    var ui = 'http://www.w3.org/1999/xhtml'
    const co = {
        svg: 'http://www.w3.org/2000/svg',
        xhtml: ui,
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/'
    }
    function er(t) {
        var e = (t += ''),
            r = e.indexOf(':')
        return (
            r >= 0 && (e = t.slice(0, r)) !== 'xmlns' && (t = t.slice(r + 1)),
            co.hasOwnProperty(e) ? { space: co[e], local: t } : t
        )
    }
    function lc(t) {
        return function () {
            var e = this.ownerDocument,
                r = this.namespaceURI
            return r === ui && e.documentElement.namespaceURI === ui
                ? e.createElement(t)
                : e.createElementNS(r, t)
        }
    }
    function uc(t) {
        return function () {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
    }
    function ao(t) {
        var e = er(t)
        return (e.local ? uc : lc)(e)
    }
    function fc() {}
    function fi(t) {
        return t == null
            ? fc
            : function () {
                  return this.querySelector(t)
              }
    }
    function cc(t) {
        typeof t != 'function' && (t = fi(t))
        for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
            for (var s = e[i], o = s.length, l = (n[i] = new Array(o)), u, f, c = 0; c < o; ++c)
                (u = s[c]) &&
                    (f = t.call(u, u.__data__, c, s)) &&
                    ('__data__' in u && (f.__data__ = u.__data__), (l[c] = f))
        return new It(n, this._parents)
    }
    function ac(t) {
        return t == null ? [] : Array.isArray(t) ? t : Array.from(t)
    }
    function hc() {
        return []
    }
    function ho(t) {
        return t == null
            ? hc
            : function () {
                  return this.querySelectorAll(t)
              }
    }
    function dc(t) {
        return function () {
            return ac(t.apply(this, arguments))
        }
    }
    function pc(t) {
        typeof t == 'function' ? (t = dc(t)) : (t = ho(t))
        for (var e = this._groups, r = e.length, n = [], i = [], s = 0; s < r; ++s)
            for (var o = e[s], l = o.length, u, f = 0; f < l; ++f)
                (u = o[f]) && (n.push(t.call(u, u.__data__, f, o)), i.push(u))
        return new It(n, i)
    }
    function po(t) {
        return function () {
            return this.matches(t)
        }
    }
    function go(t) {
        return function (e) {
            return e.matches(t)
        }
    }
    var gc = Array.prototype.find
    function mc(t) {
        return function () {
            return gc.call(this.children, t)
        }
    }
    function wc() {
        return this.firstElementChild
    }
    function yc(t) {
        return this.select(t == null ? wc : mc(typeof t == 'function' ? t : go(t)))
    }
    var _c = Array.prototype.filter
    function vc() {
        return Array.from(this.children)
    }
    function xc(t) {
        return function () {
            return _c.call(this.children, t)
        }
    }
    function bc(t) {
        return this.selectAll(t == null ? vc : xc(typeof t == 'function' ? t : go(t)))
    }
    function Ec(t) {
        typeof t != 'function' && (t = po(t))
        for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
            for (var s = e[i], o = s.length, l = (n[i] = []), u, f = 0; f < o; ++f)
                (u = s[f]) && t.call(u, u.__data__, f, s) && l.push(u)
        return new It(n, this._parents)
    }
    function mo(t) {
        return new Array(t.length)
    }
    function Sc() {
        return new It(this._enter || this._groups.map(mo), this._parents)
    }
    function nr(t, e) {
        ;(this.ownerDocument = t.ownerDocument),
            (this.namespaceURI = t.namespaceURI),
            (this._next = null),
            (this._parent = t),
            (this.__data__ = e)
    }
    nr.prototype = {
        constructor: nr,
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
    function Mc(t) {
        return function () {
            return t
        }
    }
    function Rc(t, e, r, n, i, s) {
        for (var o = 0, l, u = e.length, f = s.length; o < f; ++o)
            (l = e[o]) ? ((l.__data__ = s[o]), (n[o] = l)) : (r[o] = new nr(t, s[o]))
        for (; o < u; ++o) (l = e[o]) && (i[o] = l)
    }
    function $c(t, e, r, n, i, s, o) {
        var l,
            u,
            f = new Map(),
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
                    : (r[l] = new nr(t, s[l]))
        for (l = 0; l < c; ++l) (u = e[l]) && f.get(h[l]) === u && (i[l] = u)
    }
    function Nc(t) {
        return t.__data__
    }
    function Tc(t, e) {
        if (!arguments.length) return Array.from(this, Nc)
        var r = e ? $c : Rc,
            n = this._parents,
            i = this._groups
        typeof t != 'function' && (t = Mc(t))
        for (
            var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), f = 0;
            f < s;
            ++f
        ) {
            var c = n[f],
                a = i[f],
                h = a.length,
                g = Cc(t.call(c, c && c.__data__, f, n)),
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
        return (o = new It(o, n)), (o._enter = l), (o._exit = u), o
    }
    function Cc(t) {
        return typeof t == 'object' && 'length' in t ? t : Array.from(t)
    }
    function kc() {
        return new It(this._exit || this._groups.map(mo), this._parents)
    }
    function Ic(t, e, r) {
        var n = this.enter(),
            i = this,
            s = this.exit()
        return (
            typeof t == 'function'
                ? ((n = t(n)), n && (n = n.selection()))
                : (n = n.append(t + '')),
            e != null && ((i = e(i)), i && (i = i.selection())),
            r == null ? s.remove() : r(s),
            n && i ? n.merge(i).order() : i
        )
    }
    function Pc(t) {
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
            for (
                var f = r[u], c = n[u], a = f.length, h = (l[u] = new Array(a)), g, w = 0;
                w < a;
                ++w
            )
                (g = f[w] || c[w]) && (h[w] = g)
        for (; u < i; ++u) l[u] = r[u]
        return new It(l, this._parents)
    }
    function jc() {
        for (var t = this._groups, e = -1, r = t.length; ++e < r; )
            for (var n = t[e], i = n.length - 1, s = n[i], o; --i >= 0; )
                (o = n[i]) &&
                    (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s),
                    (s = o))
        return this
    }
    function Lc(t) {
        t || (t = Oc)
        function e(a, h) {
            return a && h ? t(a.__data__, h.__data__) : !a - !h
        }
        for (var r = this._groups, n = r.length, i = new Array(n), s = 0; s < n; ++s) {
            for (var o = r[s], l = o.length, u = (i[s] = new Array(l)), f, c = 0; c < l; ++c)
                (f = o[c]) && (u[c] = f)
            u.sort(e)
        }
        return new It(i, this._parents).order()
    }
    function Oc(t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }
    function Fc() {
        var t = arguments[0]
        return (arguments[0] = this), t.apply(null, arguments), this
    }
    function zc() {
        return Array.from(this)
    }
    function Ac() {
        for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
            for (var n = t[e], i = 0, s = n.length; i < s; ++i) {
                var o = n[i]
                if (o) return o
            }
        return null
    }
    function Vc() {
        let t = 0
        for (const e of this) ++t
        return t
    }
    function Dc() {
        return !this.node()
    }
    function Hc(t) {
        for (var e = this._groups, r = 0, n = e.length; r < n; ++r)
            for (var i = e[r], s = 0, o = i.length, l; s < o; ++s)
                (l = i[s]) && t.call(l, l.__data__, s, i)
        return this
    }
    function Bc(t) {
        return function () {
            this.removeAttribute(t)
        }
    }
    function qc(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }
    function Uc(t, e) {
        return function () {
            this.setAttribute(t, e)
        }
    }
    function Kc(t, e) {
        return function () {
            this.setAttributeNS(t.space, t.local, e)
        }
    }
    function Xc(t, e) {
        return function () {
            var r = e.apply(this, arguments)
            r == null ? this.removeAttribute(t) : this.setAttribute(t, r)
        }
    }
    function Wc(t, e) {
        return function () {
            var r = e.apply(this, arguments)
            r == null
                ? this.removeAttributeNS(t.space, t.local)
                : this.setAttributeNS(t.space, t.local, r)
        }
    }
    function Yc(t, e) {
        var r = er(t)
        if (arguments.length < 2) {
            var n = this.node()
            return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r)
        }
        return this.each(
            (e == null
                ? r.local
                    ? qc
                    : Bc
                : typeof e == 'function'
                  ? r.local
                      ? Wc
                      : Xc
                  : r.local
                    ? Kc
                    : Uc)(r, e)
        )
    }
    function wo(t) {
        return (
            (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView
        )
    }
    function Gc(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }
    function Zc(t, e, r) {
        return function () {
            this.style.setProperty(t, e, r)
        }
    }
    function Qc(t, e, r) {
        return function () {
            var n = e.apply(this, arguments)
            n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, r)
        }
    }
    function Jc(t, e, r) {
        return arguments.length > 1
            ? this.each((e == null ? Gc : typeof e == 'function' ? Qc : Zc)(t, e, r ?? ''))
            : Ae(this.node(), t)
    }
    function Ae(t, e) {
        return t.style.getPropertyValue(e) || wo(t).getComputedStyle(t, null).getPropertyValue(e)
    }
    function ta(t) {
        return function () {
            delete this[t]
        }
    }
    function ea(t, e) {
        return function () {
            this[t] = e
        }
    }
    function na(t, e) {
        return function () {
            var r = e.apply(this, arguments)
            r == null ? delete this[t] : (this[t] = r)
        }
    }
    function ra(t, e) {
        return arguments.length > 1
            ? this.each((e == null ? ta : typeof e == 'function' ? na : ea)(t, e))
            : this.node()[t]
    }
    function yo(t) {
        return t.trim().split(/^|\s+/)
    }
    function ci(t) {
        return t.classList || new _o(t)
    }
    function _o(t) {
        ;(this._node = t), (this._names = yo(t.getAttribute('class') || ''))
    }
    _o.prototype = {
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
    function vo(t, e) {
        for (var r = ci(t), n = -1, i = e.length; ++n < i; ) r.add(e[n])
    }
    function xo(t, e) {
        for (var r = ci(t), n = -1, i = e.length; ++n < i; ) r.remove(e[n])
    }
    function ia(t) {
        return function () {
            vo(this, t)
        }
    }
    function sa(t) {
        return function () {
            xo(this, t)
        }
    }
    function oa(t, e) {
        return function () {
            ;(e.apply(this, arguments) ? vo : xo)(this, t)
        }
    }
    function la(t, e) {
        var r = yo(t + '')
        if (arguments.length < 2) {
            for (var n = ci(this.node()), i = -1, s = r.length; ++i < s; )
                if (!n.contains(r[i])) return !1
            return !0
        }
        return this.each((typeof e == 'function' ? oa : e ? ia : sa)(r, e))
    }
    function ua() {
        this.textContent = ''
    }
    function fa(t) {
        return function () {
            this.textContent = t
        }
    }
    function ca(t) {
        return function () {
            var e = t.apply(this, arguments)
            this.textContent = e ?? ''
        }
    }
    function aa(t) {
        return arguments.length
            ? this.each(t == null ? ua : (typeof t == 'function' ? ca : fa)(t))
            : this.node().textContent
    }
    function ha() {
        this.innerHTML = ''
    }
    function da(t) {
        return function () {
            this.innerHTML = t
        }
    }
    function pa(t) {
        return function () {
            var e = t.apply(this, arguments)
            this.innerHTML = e ?? ''
        }
    }
    function ga(t) {
        return arguments.length
            ? this.each(t == null ? ha : (typeof t == 'function' ? pa : da)(t))
            : this.node().innerHTML
    }
    function ma() {
        this.nextSibling && this.parentNode.appendChild(this)
    }
    function wa() {
        return this.each(ma)
    }
    function ya() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }
    function _a() {
        return this.each(ya)
    }
    function va(t) {
        var e = typeof t == 'function' ? t : ao(t)
        return this.select(function () {
            return this.appendChild(e.apply(this, arguments))
        })
    }
    function xa() {
        return null
    }
    function ba(t, e) {
        var r = typeof t == 'function' ? t : ao(t),
            n = e == null ? xa : typeof e == 'function' ? e : fi(e)
        return this.select(function () {
            return this.insertBefore(r.apply(this, arguments), n.apply(this, arguments) || null)
        })
    }
    function Ea() {
        var t = this.parentNode
        t && t.removeChild(this)
    }
    function Sa() {
        return this.each(Ea)
    }
    function Ma() {
        var t = this.cloneNode(!1),
            e = this.parentNode
        return e ? e.insertBefore(t, this.nextSibling) : t
    }
    function Ra() {
        var t = this.cloneNode(!0),
            e = this.parentNode
        return e ? e.insertBefore(t, this.nextSibling) : t
    }
    function $a(t) {
        return this.select(t ? Ra : Ma)
    }
    function Na(t) {
        return arguments.length ? this.property('__data__', t) : this.node().__data__
    }
    function Ta(t) {
        return function (e) {
            t.call(this, e, this.__data__)
        }
    }
    function Ca(t) {
        return t
            .trim()
            .split(/^|\s+/)
            .map(function (e) {
                var r = '',
                    n = e.indexOf('.')
                return n >= 0 && ((r = e.slice(n + 1)), (e = e.slice(0, n))), { type: e, name: r }
            })
    }
    function ka(t) {
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
    function Ia(t, e, r) {
        return function () {
            var n = this.__on,
                i,
                s = Ta(e)
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
    function Pa(t, e, r) {
        var n = Ca(t + ''),
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
        for (l = e ? Ia : ka, i = 0; i < s; ++i) this.each(l(n[i], e, r))
        return this
    }
    function bo(t, e, r) {
        var n = wo(t),
            i = n.CustomEvent
        typeof i == 'function'
            ? (i = new i(e, r))
            : ((i = n.document.createEvent('Event')),
              r
                  ? (i.initEvent(e, r.bubbles, r.cancelable), (i.detail = r.detail))
                  : i.initEvent(e, !1, !1)),
            t.dispatchEvent(i)
    }
    function ja(t, e) {
        return function () {
            return bo(this, t, e)
        }
    }
    function La(t, e) {
        return function () {
            return bo(this, t, e.apply(this, arguments))
        }
    }
    function Oa(t, e) {
        return this.each((typeof e == 'function' ? La : ja)(t, e))
    }
    function* Fa() {
        for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
            for (var n = t[e], i = 0, s = n.length, o; i < s; ++i) (o = n[i]) && (yield o)
    }
    var Eo = [null]
    function It(t, e) {
        ;(this._groups = t), (this._parents = e)
    }
    function hn() {
        return new It([[document.documentElement]], Eo)
    }
    function za() {
        return this
    }
    It.prototype = hn.prototype = {
        constructor: It,
        select: cc,
        selectAll: pc,
        selectChild: yc,
        selectChildren: bc,
        filter: Ec,
        data: Tc,
        enter: Sc,
        exit: kc,
        join: Ic,
        merge: Pc,
        selection: za,
        order: jc,
        sort: Lc,
        call: Fc,
        nodes: zc,
        node: Ac,
        size: Vc,
        empty: Dc,
        each: Hc,
        attr: Yc,
        style: Jc,
        property: ra,
        classed: la,
        text: aa,
        html: ga,
        raise: wa,
        lower: _a,
        append: va,
        insert: ba,
        remove: Sa,
        clone: $a,
        datum: Na,
        on: Pa,
        dispatch: Oa,
        [Symbol.iterator]: Fa
    }
    function te(t) {
        return typeof t == 'string'
            ? new It([[document.querySelector(t)]], [document.documentElement])
            : new It([[t]], Eo)
    }
    function So(t) {
        let e
        for (; (e = t.sourceEvent); ) t = e
        return t
    }
    function Vt(t, e) {
        if (((t = So(t)), e === void 0 && (e = t.currentTarget), e)) {
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
    function Aa(t, e) {
        return (
            t.target &&
                ((t = So(t)), e === void 0 && (e = t.currentTarget), (t = t.touches || [t])),
            Array.from(t, (r) => Vt(r, e))
        )
    }
    const Va = { passive: !1 },
        dn = { capture: !0, passive: !1 }
    function ai(t) {
        t.stopImmediatePropagation()
    }
    function Ve(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }
    function Mo(t) {
        var e = t.document.documentElement,
            r = te(t).on('dragstart.drag', Ve, dn)
        'onselectstart' in e
            ? r.on('selectstart.drag', Ve, dn)
            : ((e.__noselect = e.style.MozUserSelect), (e.style.MozUserSelect = 'none'))
    }
    function Ro(t, e) {
        var r = t.document.documentElement,
            n = te(t).on('dragstart.drag', null)
        e &&
            (n.on('click.drag', Ve, dn),
            setTimeout(function () {
                n.on('click.drag', null)
            }, 0)),
            'onselectstart' in r
                ? n.on('selectstart.drag', null)
                : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect)
    }
    const rr = (t) => () => t
    function hi(
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
    hi.prototype.on = function () {
        var t = this._.on.apply(this._, arguments)
        return t === this._ ? this : t
    }
    function Da(t) {
        return !t.ctrlKey && !t.button
    }
    function Ha() {
        return this.parentNode
    }
    function Ba(t, e) {
        return e ?? { x: t.x, y: t.y }
    }
    function qa() {
        return navigator.maxTouchPoints || 'ontouchstart' in this
    }
    function Ua() {
        var t = Da,
            e = Ha,
            r = Ba,
            n = qa,
            i = {},
            s = an('start', 'drag', 'end'),
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
                .on('touchmove.drag', d, Va)
                .on('touchend.drag touchcancel.drag', M)
                .style('touch-action', 'none')
                .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
        }
        function g(m, S) {
            if (!(c || !t.call(this, m, S))) {
                var T = $(this, e.call(this, m, S), m, S, 'mouse')
                T &&
                    (te(m.view).on('mousemove.drag', w, dn).on('mouseup.drag', y, dn),
                    Mo(m.view),
                    ai(m),
                    (f = !1),
                    (l = m.clientX),
                    (u = m.clientY),
                    T('start', m))
            }
        }
        function w(m) {
            if ((Ve(m), !f)) {
                var S = m.clientX - l,
                    T = m.clientY - u
                f = S * S + T * T > a
            }
            i.mouse('drag', m)
        }
        function y(m) {
            te(m.view).on('mousemove.drag mouseup.drag', null),
                Ro(m.view, f),
                Ve(m),
                i.mouse('end', m)
        }
        function _(m, S) {
            if (t.call(this, m, S)) {
                var T = m.changedTouches,
                    z = e.call(this, m, S),
                    H = T.length,
                    G,
                    X
                for (G = 0; G < H; ++G)
                    (X = $(this, z, m, S, T[G].identifier, T[G])) && (ai(m), X('start', m, T[G]))
            }
        }
        function d(m) {
            var S = m.changedTouches,
                T = S.length,
                z,
                H
            for (z = 0; z < T; ++z) (H = i[S[z].identifier]) && (Ve(m), H('drag', m, S[z]))
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
                (H = i[S[z].identifier]) && (ai(m), H('end', m, S[z]))
        }
        function $(m, S, T, z, H, G) {
            var X = s.copy(),
                et = Vt(G || T, S),
                at,
                st,
                x
            if (
                (x = r.call(
                    m,
                    new hi('beforestart', {
                        sourceEvent: T,
                        target: h,
                        identifier: H,
                        active: o,
                        x: et[0],
                        y: et[1],
                        dx: 0,
                        dy: 0,
                        dispatch: X
                    }),
                    z
                )) != null
            )
                return (
                    (at = x.x - et[0] || 0),
                    (st = x.y - et[1] || 0),
                    function O(b, I, P) {
                        var U = et,
                            K
                        switch (b) {
                            case 'start':
                                ;(i[H] = O), (K = o++)
                                break
                            case 'end':
                                delete i[H], --o
                            case 'drag':
                                ;(et = Vt(P || I, S)), (K = o)
                                break
                        }
                        X.call(
                            b,
                            m,
                            new hi(b, {
                                sourceEvent: I,
                                subject: x,
                                target: h,
                                identifier: H,
                                active: K,
                                x: et[0] + at,
                                y: et[1] + st,
                                dx: et[0] - U[0],
                                dy: et[1] - U[1],
                                dispatch: X
                            }),
                            z
                        )
                    }
                )
        }
        return (
            (h.filter = function (m) {
                return arguments.length ? ((t = typeof m == 'function' ? m : rr(!!m)), h) : t
            }),
            (h.container = function (m) {
                return arguments.length ? ((e = typeof m == 'function' ? m : rr(m)), h) : e
            }),
            (h.subject = function (m) {
                return arguments.length ? ((r = typeof m == 'function' ? m : rr(m)), h) : r
            }),
            (h.touchable = function (m) {
                return arguments.length ? ((n = typeof m == 'function' ? m : rr(!!m)), h) : n
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
    function di(t, e, r) {
        ;(t.prototype = e.prototype = r), (r.constructor = t)
    }
    function $o(t, e) {
        var r = Object.create(t.prototype)
        for (var n in e) r[n] = e[n]
        return r
    }
    function pn() {}
    var gn = 0.7,
        ir = 1 / gn,
        De = '\\s*([+-]?\\d+)\\s*',
        mn = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
        ee = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
        Ka = /^#([0-9a-f]{3,8})$/,
        Xa = new RegExp(`^rgb\\(${De},${De},${De}\\)$`),
        Wa = new RegExp(`^rgb\\(${ee},${ee},${ee}\\)$`),
        Ya = new RegExp(`^rgba\\(${De},${De},${De},${mn}\\)$`),
        Ga = new RegExp(`^rgba\\(${ee},${ee},${ee},${mn}\\)$`),
        Za = new RegExp(`^hsl\\(${mn},${ee},${ee}\\)$`),
        Qa = new RegExp(`^hsla\\(${mn},${ee},${ee},${mn}\\)$`),
        No = {
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
    di(pn, wn, {
        copy(t) {
            return Object.assign(new this.constructor(), this, t)
        },
        displayable() {
            return this.rgb().displayable()
        },
        hex: To,
        formatHex: To,
        formatHex8: Ja,
        formatHsl: th,
        formatRgb: Co,
        toString: Co
    })
    function To() {
        return this.rgb().formatHex()
    }
    function Ja() {
        return this.rgb().formatHex8()
    }
    function th() {
        return Lo(this).formatHsl()
    }
    function Co() {
        return this.rgb().formatRgb()
    }
    function wn(t) {
        var e, r
        return (
            (t = (t + '').trim().toLowerCase()),
            (e = Ka.exec(t))
                ? ((r = e[1].length),
                  (e = parseInt(e[1], 16)),
                  r === 6
                      ? ko(e)
                      : r === 3
                        ? new Ct(
                              ((e >> 8) & 15) | ((e >> 4) & 240),
                              ((e >> 4) & 15) | (e & 240),
                              ((e & 15) << 4) | (e & 15),
                              1
                          )
                        : r === 8
                          ? sr((e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, (e & 255) / 255)
                          : r === 4
                            ? sr(
                                  ((e >> 12) & 15) | ((e >> 8) & 240),
                                  ((e >> 8) & 15) | ((e >> 4) & 240),
                                  ((e >> 4) & 15) | (e & 240),
                                  (((e & 15) << 4) | (e & 15)) / 255
                              )
                            : null)
                : (e = Xa.exec(t))
                  ? new Ct(e[1], e[2], e[3], 1)
                  : (e = Wa.exec(t))
                    ? new Ct((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
                    : (e = Ya.exec(t))
                      ? sr(e[1], e[2], e[3], e[4])
                      : (e = Ga.exec(t))
                        ? sr((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, e[4])
                        : (e = Za.exec(t))
                          ? jo(e[1], e[2] / 100, e[3] / 100, 1)
                          : (e = Qa.exec(t))
                            ? jo(e[1], e[2] / 100, e[3] / 100, e[4])
                            : No.hasOwnProperty(t)
                              ? ko(No[t])
                              : t === 'transparent'
                                ? new Ct(NaN, NaN, NaN, 0)
                                : null
        )
    }
    function ko(t) {
        return new Ct((t >> 16) & 255, (t >> 8) & 255, t & 255, 1)
    }
    function sr(t, e, r, n) {
        return n <= 0 && (t = e = r = NaN), new Ct(t, e, r, n)
    }
    function eh(t) {
        return (
            t instanceof pn || (t = wn(t)),
            t ? ((t = t.rgb()), new Ct(t.r, t.g, t.b, t.opacity)) : new Ct()
        )
    }
    function pi(t, e, r, n) {
        return arguments.length === 1 ? eh(t) : new Ct(t, e, r, n ?? 1)
    }
    function Ct(t, e, r, n) {
        ;(this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +n)
    }
    di(
        Ct,
        pi,
        $o(pn, {
            brighter(t) {
                return (
                    (t = t == null ? ir : Math.pow(ir, t)),
                    new Ct(this.r * t, this.g * t, this.b * t, this.opacity)
                )
            },
            darker(t) {
                return (
                    (t = t == null ? gn : Math.pow(gn, t)),
                    new Ct(this.r * t, this.g * t, this.b * t, this.opacity)
                )
            },
            rgb() {
                return this
            },
            clamp() {
                return new Ct(Ce(this.r), Ce(this.g), Ce(this.b), or(this.opacity))
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
            hex: Io,
            formatHex: Io,
            formatHex8: nh,
            formatRgb: Po,
            toString: Po
        })
    )
    function Io() {
        return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}`
    }
    function nh() {
        return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}${ke((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
    }
    function Po() {
        const t = or(this.opacity)
        return `${t === 1 ? 'rgb(' : 'rgba('}${Ce(this.r)}, ${Ce(this.g)}, ${Ce(this.b)}${t === 1 ? ')' : `, ${t})`}`
    }
    function or(t) {
        return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
    }
    function Ce(t) {
        return Math.max(0, Math.min(255, Math.round(t) || 0))
    }
    function ke(t) {
        return (t = Ce(t)), (t < 16 ? '0' : '') + t.toString(16)
    }
    function jo(t, e, r, n) {
        return (
            n <= 0 ? (t = e = r = NaN) : r <= 0 || r >= 1 ? (t = e = NaN) : e <= 0 && (t = NaN),
            new Ut(t, e, r, n)
        )
    }
    function Lo(t) {
        if (t instanceof Ut) return new Ut(t.h, t.s, t.l, t.opacity)
        if ((t instanceof pn || (t = wn(t)), !t)) return new Ut()
        if (t instanceof Ut) return t
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
            new Ut(o, l, u, t.opacity)
        )
    }
    function rh(t, e, r, n) {
        return arguments.length === 1 ? Lo(t) : new Ut(t, e, r, n ?? 1)
    }
    function Ut(t, e, r, n) {
        ;(this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +n)
    }
    di(
        Ut,
        rh,
        $o(pn, {
            brighter(t) {
                return (
                    (t = t == null ? ir : Math.pow(ir, t)),
                    new Ut(this.h, this.s, this.l * t, this.opacity)
                )
            },
            darker(t) {
                return (
                    (t = t == null ? gn : Math.pow(gn, t)),
                    new Ut(this.h, this.s, this.l * t, this.opacity)
                )
            },
            rgb() {
                var t = (this.h % 360) + (this.h < 0) * 360,
                    e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                    r = this.l,
                    n = r + (r < 0.5 ? r : 1 - r) * e,
                    i = 2 * r - n
                return new Ct(
                    gi(t >= 240 ? t - 240 : t + 120, i, n),
                    gi(t, i, n),
                    gi(t < 120 ? t + 240 : t - 120, i, n),
                    this.opacity
                )
            },
            clamp() {
                return new Ut(Oo(this.h), lr(this.s), lr(this.l), or(this.opacity))
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
                const t = or(this.opacity)
                return `${t === 1 ? 'hsl(' : 'hsla('}${Oo(this.h)}, ${lr(this.s) * 100}%, ${lr(this.l) * 100}%${t === 1 ? ')' : `, ${t})`}`
            }
        })
    )
    function Oo(t) {
        return (t = (t || 0) % 360), t < 0 ? t + 360 : t
    }
    function lr(t) {
        return Math.max(0, Math.min(1, t || 0))
    }
    function gi(t, e, r) {
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
    const Fo = (t) => () => t
    function ih(t, e) {
        return function (r) {
            return t + r * e
        }
    }
    function sh(t, e, r) {
        return (
            (t = Math.pow(t, r)),
            (e = Math.pow(e, r) - t),
            (r = 1 / r),
            function (n) {
                return Math.pow(t + n * e, r)
            }
        )
    }
    function oh(t) {
        return (t = +t) == 1
            ? zo
            : function (e, r) {
                  return r - e ? sh(e, r, t) : Fo(isNaN(e) ? r : e)
              }
    }
    function zo(t, e) {
        var r = e - t
        return r ? ih(t, r) : Fo(isNaN(t) ? e : t)
    }
    const Ao = (function t(e) {
        var r = oh(e)
        function n(i, s) {
            var o = r((i = pi(i)).r, (s = pi(s)).r),
                l = r(i.g, s.g),
                u = r(i.b, s.b),
                f = zo(i.opacity, s.opacity)
            return function (c) {
                return (i.r = o(c)), (i.g = l(c)), (i.b = u(c)), (i.opacity = f(c)), i + ''
            }
        }
        return (n.gamma = t), n
    })(1)
    function ve(t, e) {
        return (
            (t = +t),
            (e = +e),
            function (r) {
                return t * (1 - r) + e * r
            }
        )
    }
    var mi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        wi = new RegExp(mi.source, 'g')
    function lh(t) {
        return function () {
            return t
        }
    }
    function uh(t) {
        return function (e) {
            return t(e) + ''
        }
    }
    function fh(t, e) {
        var r = (mi.lastIndex = wi.lastIndex = 0),
            n,
            i,
            s,
            o = -1,
            l = [],
            u = []
        for (t = t + '', e = e + ''; (n = mi.exec(t)) && (i = wi.exec(e)); )
            (s = i.index) > r && ((s = e.slice(r, s)), l[o] ? (l[o] += s) : (l[++o] = s)),
                (n = n[0]) === (i = i[0])
                    ? l[o]
                        ? (l[o] += i)
                        : (l[++o] = i)
                    : ((l[++o] = null), u.push({ i: o, x: ve(n, i) })),
                (r = wi.lastIndex)
        return (
            r < e.length && ((s = e.slice(r)), l[o] ? (l[o] += s) : (l[++o] = s)),
            l.length < 2
                ? u[0]
                    ? uh(u[0].x)
                    : lh(e)
                : ((e = u.length),
                  function (f) {
                      for (var c = 0, a; c < e; ++c) l[(a = u[c]).i] = a.x(f)
                      return l.join('')
                  })
        )
    }
    var Vo = 180 / Math.PI,
        yi = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 }
    function Do(t, e, r, n, i, s) {
        var o, l, u
        return (
            (o = Math.sqrt(t * t + e * e)) && ((t /= o), (e /= o)),
            (u = t * r + e * n) && ((r -= t * u), (n -= e * u)),
            (l = Math.sqrt(r * r + n * n)) && ((r /= l), (n /= l), (u /= l)),
            t * n < e * r && ((t = -t), (e = -e), (u = -u), (o = -o)),
            {
                translateX: i,
                translateY: s,
                rotate: Math.atan2(e, t) * Vo,
                skewX: Math.atan(u) * Vo,
                scaleX: o,
                scaleY: l
            }
        )
    }
    var ur
    function ch(t) {
        const e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(t + '')
        return e.isIdentity ? yi : Do(e.a, e.b, e.c, e.d, e.e, e.f)
    }
    function ah(t) {
        return t == null ||
            (ur || (ur = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
            ur.setAttribute('transform', t),
            !(t = ur.transform.baseVal.consolidate()))
            ? yi
            : ((t = t.matrix), Do(t.a, t.b, t.c, t.d, t.e, t.f))
    }
    function Ho(t, e, r, n) {
        function i(f) {
            return f.length ? f.pop() + ' ' : ''
        }
        function s(f, c, a, h, g, w) {
            if (f !== a || c !== h) {
                var y = g.push('translate(', null, e, null, r)
                w.push({ i: y - 4, x: ve(f, a) }, { i: y - 2, x: ve(c, h) })
            } else (a || h) && g.push('translate(' + a + e + h + r)
        }
        function o(f, c, a, h) {
            f !== c
                ? (f - c > 180 ? (c += 360) : c - f > 180 && (f += 360),
                  h.push({ i: a.push(i(a) + 'rotate(', null, n) - 2, x: ve(f, c) }))
                : c && a.push(i(a) + 'rotate(' + c + n)
        }
        function l(f, c, a, h) {
            f !== c
                ? h.push({ i: a.push(i(a) + 'skewX(', null, n) - 2, x: ve(f, c) })
                : c && a.push(i(a) + 'skewX(' + c + n)
        }
        function u(f, c, a, h, g, w) {
            if (f !== a || c !== h) {
                var y = g.push(i(g) + 'scale(', null, ',', null, ')')
                w.push({ i: y - 4, x: ve(f, a) }, { i: y - 2, x: ve(c, h) })
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
    var hh = Ho(ch, 'px, ', 'px)', 'deg)'),
        dh = Ho(ah, ', ', ')', ')'),
        ph = 1e-12
    function Bo(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }
    function gh(t) {
        return ((t = Math.exp(t)) - 1 / t) / 2
    }
    function mh(t) {
        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
    }
    const wh = (function t(e, r, n) {
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
            if (y < ph)
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
                            G = Bo(S),
                            X = (f / (r * M)) * (G * mh(e * H + S) - gh(S))
                        return [l + X * g, u + X * w, (f * G) / Bo(e * H + S)]
                    })
            }
            return (_.duration = (d * 1e3 * e) / Math.SQRT2), _
        }
        return (
            (i.rho = function (s) {
                var o = Math.max(0.001, +s),
                    l = o * o,
                    u = l * l
                return t(o, l, u)
            }),
            i
        )
    })(Math.SQRT2, 2, 4)
    var He = 0,
        yn = 0,
        _n = 0,
        qo = 1e3,
        fr,
        vn,
        cr = 0,
        Ie = 0,
        ar = 0,
        xn = typeof performance == 'object' && performance.now ? performance : Date,
        Uo =
            typeof window == 'object' && window.requestAnimationFrame
                ? window.requestAnimationFrame.bind(window)
                : function (t) {
                      setTimeout(t, 17)
                  }
    function _i() {
        return Ie || (Uo(yh), (Ie = xn.now() + ar))
    }
    function yh() {
        Ie = 0
    }
    function hr() {
        this._call = this._time = this._next = null
    }
    hr.prototype = vi.prototype = {
        constructor: hr,
        restart: function (t, e, r) {
            if (typeof t != 'function') throw new TypeError('callback is not a function')
            ;(r = (r == null ? _i() : +r) + (e == null ? 0 : +e)),
                !this._next && vn !== this && (vn ? (vn._next = this) : (fr = this), (vn = this)),
                (this._call = t),
                (this._time = r),
                xi()
        },
        stop: function () {
            this._call && ((this._call = null), (this._time = 1 / 0), xi())
        }
    }
    function vi(t, e, r) {
        var n = new hr()
        return n.restart(t, e, r), n
    }
    function _h() {
        _i(), ++He
        for (var t = fr, e; t; ) (e = Ie - t._time) >= 0 && t._call.call(void 0, e), (t = t._next)
        --He
    }
    function Ko() {
        ;(Ie = (cr = xn.now()) + ar), (He = yn = 0)
        try {
            _h()
        } finally {
            ;(He = 0), xh(), (Ie = 0)
        }
    }
    function vh() {
        var t = xn.now(),
            e = t - cr
        e > qo && ((ar -= e), (cr = t))
    }
    function xh() {
        for (var t, e = fr, r, n = 1 / 0; e; )
            e._call
                ? (n > e._time && (n = e._time), (t = e), (e = e._next))
                : ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (fr = r)))
        ;(vn = t), xi(n)
    }
    function xi(t) {
        if (!He) {
            yn && (yn = clearTimeout(yn))
            var e = t - Ie
            e > 24
                ? (t < 1 / 0 && (yn = setTimeout(Ko, t - xn.now() - ar)),
                  _n && (_n = clearInterval(_n)))
                : (_n || ((cr = xn.now()), (_n = setInterval(vh, qo))), (He = 1), Uo(Ko))
        }
    }
    function Xo(t, e, r) {
        var n = new hr()
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
    var bh = an('start', 'end', 'cancel', 'interrupt'),
        Eh = [],
        Wo = 0,
        Yo = 1,
        bi = 2,
        dr = 3,
        Go = 4,
        Ei = 5,
        pr = 6
    function gr(t, e, r, n, i, s) {
        var o = t.__transition
        if (!o) t.__transition = {}
        else if (r in o) return
        Sh(t, r, {
            name: e,
            index: n,
            group: i,
            on: bh,
            tween: Eh,
            time: s.time,
            delay: s.delay,
            duration: s.duration,
            ease: s.ease,
            timer: null,
            state: Wo
        })
    }
    function Si(t, e) {
        var r = Kt(t, e)
        if (r.state > Wo) throw new Error('too late; already scheduled')
        return r
    }
    function ne(t, e) {
        var r = Kt(t, e)
        if (r.state > dr) throw new Error('too late; already running')
        return r
    }
    function Kt(t, e) {
        var r = t.__transition
        if (!r || !(r = r[e])) throw new Error('transition not found')
        return r
    }
    function Sh(t, e, r) {
        var n = t.__transition,
            i
        ;(n[e] = r), (r.timer = vi(s, 0, r.time))
        function s(f) {
            ;(r.state = Yo), r.timer.restart(o, r.delay, r.time), r.delay <= f && o(f - r.delay)
        }
        function o(f) {
            var c, a, h, g
            if (r.state !== Yo) return u()
            for (c in n)
                if (((g = n[c]), g.name === r.name)) {
                    if (g.state === dr) return Xo(o)
                    g.state === Go
                        ? ((g.state = pr),
                          g.timer.stop(),
                          g.on.call('interrupt', t, t.__data__, g.index, g.group),
                          delete n[c])
                        : +c < e &&
                          ((g.state = pr),
                          g.timer.stop(),
                          g.on.call('cancel', t, t.__data__, g.index, g.group),
                          delete n[c])
                }
            if (
                (Xo(function () {
                    r.state === dr && ((r.state = Go), r.timer.restart(l, r.delay, r.time), l(f))
                }),
                (r.state = bi),
                r.on.call('start', t, t.__data__, r.index, r.group),
                r.state === bi)
            ) {
                for (r.state = dr, i = new Array((h = r.tween.length)), c = 0, a = -1; c < h; ++c)
                    (g = r.tween[c].value.call(t, t.__data__, r.index, r.group)) && (i[++a] = g)
                i.length = a + 1
            }
        }
        function l(f) {
            for (
                var c =
                        f < r.duration
                            ? r.ease.call(null, f / r.duration)
                            : (r.timer.restart(u), (r.state = Ei), 1),
                    a = -1,
                    h = i.length;
                ++a < h;

            )
                i[a].call(t, c)
            r.state === Ei && (r.on.call('end', t, t.__data__, r.index, r.group), u())
        }
        function u() {
            ;(r.state = pr), r.timer.stop(), delete n[e]
            for (var f in n) return
            delete t.__transition
        }
    }
    function mr(t, e) {
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
                ;(i = n.state > bi && n.state < Ei),
                    (n.state = pr),
                    n.timer.stop(),
                    n.on.call(i ? 'interrupt' : 'cancel', t, t.__data__, n.index, n.group),
                    delete r[o]
            }
            s && delete t.__transition
        }
    }
    function Mh(t) {
        return this.each(function () {
            mr(this, t)
        })
    }
    function Rh(t, e) {
        var r, n
        return function () {
            var i = ne(this, t),
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
    function $h(t, e, r) {
        var n, i
        if (typeof r != 'function') throw new Error()
        return function () {
            var s = ne(this, t),
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
    function Nh(t, e) {
        var r = this._id
        if (((t += ''), arguments.length < 2)) {
            for (var n = Kt(this.node(), r).tween, i = 0, s = n.length, o; i < s; ++i)
                if ((o = n[i]).name === t) return o.value
            return null
        }
        return this.each((e == null ? Rh : $h)(r, t, e))
    }
    function Mi(t, e, r) {
        var n = t._id
        return (
            t.each(function () {
                var i = ne(this, n)
                ;(i.value || (i.value = {}))[e] = r.apply(this, arguments)
            }),
            function (i) {
                return Kt(i, n).value[e]
            }
        )
    }
    function Zo(t, e) {
        var r
        return (
            typeof e == 'number' ? ve : e instanceof wn ? Ao : (r = wn(e)) ? ((e = r), Ao) : fh
        )(t, e)
    }
    function Th(t) {
        return function () {
            this.removeAttribute(t)
        }
    }
    function Ch(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }
    function kh(t, e, r) {
        var n,
            i = r + '',
            s
        return function () {
            var o = this.getAttribute(t)
            return o === i ? null : o === n ? s : (s = e((n = o), r))
        }
    }
    function Ih(t, e, r) {
        var n,
            i = r + '',
            s
        return function () {
            var o = this.getAttributeNS(t.space, t.local)
            return o === i ? null : o === n ? s : (s = e((n = o), r))
        }
    }
    function Ph(t, e, r) {
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
    function jh(t, e, r) {
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
    function Lh(t, e) {
        var r = er(t),
            n = r === 'transform' ? dh : Zo
        return this.attrTween(
            t,
            typeof e == 'function'
                ? (r.local ? jh : Ph)(r, n, Mi(this, 'attr.' + t, e))
                : e == null
                  ? (r.local ? Ch : Th)(r)
                  : (r.local ? Ih : kh)(r, n, e)
        )
    }
    function Oh(t, e) {
        return function (r) {
            this.setAttribute(t, e.call(this, r))
        }
    }
    function Fh(t, e) {
        return function (r) {
            this.setAttributeNS(t.space, t.local, e.call(this, r))
        }
    }
    function zh(t, e) {
        var r, n
        function i() {
            var s = e.apply(this, arguments)
            return s !== n && (r = (n = s) && Fh(t, s)), r
        }
        return (i._value = e), i
    }
    function Ah(t, e) {
        var r, n
        function i() {
            var s = e.apply(this, arguments)
            return s !== n && (r = (n = s) && Oh(t, s)), r
        }
        return (i._value = e), i
    }
    function Vh(t, e) {
        var r = 'attr.' + t
        if (arguments.length < 2) return (r = this.tween(r)) && r._value
        if (e == null) return this.tween(r, null)
        if (typeof e != 'function') throw new Error()
        var n = er(t)
        return this.tween(r, (n.local ? zh : Ah)(n, e))
    }
    function Dh(t, e) {
        return function () {
            Si(this, t).delay = +e.apply(this, arguments)
        }
    }
    function Hh(t, e) {
        return (
            (e = +e),
            function () {
                Si(this, t).delay = e
            }
        )
    }
    function Bh(t) {
        var e = this._id
        return arguments.length
            ? this.each((typeof t == 'function' ? Dh : Hh)(e, t))
            : Kt(this.node(), e).delay
    }
    function qh(t, e) {
        return function () {
            ne(this, t).duration = +e.apply(this, arguments)
        }
    }
    function Uh(t, e) {
        return (
            (e = +e),
            function () {
                ne(this, t).duration = e
            }
        )
    }
    function Kh(t) {
        var e = this._id
        return arguments.length
            ? this.each((typeof t == 'function' ? qh : Uh)(e, t))
            : Kt(this.node(), e).duration
    }
    function Xh(t, e) {
        if (typeof e != 'function') throw new Error()
        return function () {
            ne(this, t).ease = e
        }
    }
    function Wh(t) {
        var e = this._id
        return arguments.length ? this.each(Xh(e, t)) : Kt(this.node(), e).ease
    }
    function Yh(t, e) {
        return function () {
            var r = e.apply(this, arguments)
            if (typeof r != 'function') throw new Error()
            ne(this, t).ease = r
        }
    }
    function Gh(t) {
        if (typeof t != 'function') throw new Error()
        return this.each(Yh(this._id, t))
    }
    function Zh(t) {
        typeof t != 'function' && (t = po(t))
        for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
            for (var s = e[i], o = s.length, l = (n[i] = []), u, f = 0; f < o; ++f)
                (u = s[f]) && t.call(u, u.__data__, f, s) && l.push(u)
        return new fe(n, this._parents, this._name, this._id)
    }
    function Qh(t) {
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
            for (
                var u = e[l], f = r[l], c = u.length, a = (o[l] = new Array(c)), h, g = 0;
                g < c;
                ++g
            )
                (h = u[g] || f[g]) && (a[g] = h)
        for (; l < n; ++l) o[l] = e[l]
        return new fe(o, this._parents, this._name, this._id)
    }
    function Jh(t) {
        return (t + '')
            .trim()
            .split(/^|\s+/)
            .every(function (e) {
                var r = e.indexOf('.')
                return r >= 0 && (e = e.slice(0, r)), !e || e === 'start'
            })
    }
    function td(t, e, r) {
        var n,
            i,
            s = Jh(e) ? Si : ne
        return function () {
            var o = s(this, t),
                l = o.on
            l !== n && (i = (n = l).copy()).on(e, r), (o.on = i)
        }
    }
    function ed(t, e) {
        var r = this._id
        return arguments.length < 2 ? Kt(this.node(), r).on.on(t) : this.each(td(r, t, e))
    }
    function nd(t) {
        return function () {
            var e = this.parentNode
            for (var r in this.__transition) if (+r !== t) return
            e && e.removeChild(this)
        }
    }
    function rd() {
        return this.on('end.remove', nd(this._id))
    }
    function id(t) {
        var e = this._name,
            r = this._id
        typeof t != 'function' && (t = fi(t))
        for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o)
            for (var l = n[o], u = l.length, f = (s[o] = new Array(u)), c, a, h = 0; h < u; ++h)
                (c = l[h]) &&
                    (a = t.call(c, c.__data__, h, l)) &&
                    ('__data__' in c && (a.__data__ = c.__data__),
                    (f[h] = a),
                    gr(f[h], e, r, h, f, Kt(c, r)))
        return new fe(s, this._parents, e, r)
    }
    function sd(t) {
        var e = this._name,
            r = this._id
        typeof t != 'function' && (t = ho(t))
        for (var n = this._groups, i = n.length, s = [], o = [], l = 0; l < i; ++l)
            for (var u = n[l], f = u.length, c, a = 0; a < f; ++a)
                if ((c = u[a])) {
                    for (
                        var h = t.call(c, c.__data__, a, u), g, w = Kt(c, r), y = 0, _ = h.length;
                        y < _;
                        ++y
                    )
                        (g = h[y]) && gr(g, e, r, y, h, w)
                    s.push(h), o.push(c)
                }
        return new fe(s, o, e, r)
    }
    var od = hn.prototype.constructor
    function ld() {
        return new od(this._groups, this._parents)
    }
    function ud(t, e) {
        var r, n, i
        return function () {
            var s = Ae(this, t),
                o = (this.style.removeProperty(t), Ae(this, t))
            return s === o ? null : s === r && o === n ? i : (i = e((r = s), (n = o)))
        }
    }
    function Qo(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }
    function fd(t, e, r) {
        var n,
            i = r + '',
            s
        return function () {
            var o = Ae(this, t)
            return o === i ? null : o === n ? s : (s = e((n = o), r))
        }
    }
    function cd(t, e, r) {
        var n, i, s
        return function () {
            var o = Ae(this, t),
                l = r(this),
                u = l + ''
            return (
                l == null && (u = l = (this.style.removeProperty(t), Ae(this, t))),
                o === u ? null : o === n && u === i ? s : ((i = u), (s = e((n = o), l)))
            )
        }
    }
    function ad(t, e) {
        var r,
            n,
            i,
            s = 'style.' + e,
            o = 'end.' + s,
            l
        return function () {
            var u = ne(this, t),
                f = u.on,
                c = u.value[s] == null ? l || (l = Qo(e)) : void 0
            ;(f !== r || i !== c) && (n = (r = f).copy()).on(o, (i = c)), (u.on = n)
        }
    }
    function hd(t, e, r) {
        var n = (t += '') == 'transform' ? hh : Zo
        return e == null
            ? this.styleTween(t, ud(t, n)).on('end.style.' + t, Qo(t))
            : typeof e == 'function'
              ? this.styleTween(t, cd(t, n, Mi(this, 'style.' + t, e))).each(ad(this._id, t))
              : this.styleTween(t, fd(t, n, e), r).on('end.style.' + t, null)
    }
    function dd(t, e, r) {
        return function (n) {
            this.style.setProperty(t, e.call(this, n), r)
        }
    }
    function pd(t, e, r) {
        var n, i
        function s() {
            var o = e.apply(this, arguments)
            return o !== i && (n = (i = o) && dd(t, o, r)), n
        }
        return (s._value = e), s
    }
    function gd(t, e, r) {
        var n = 'style.' + (t += '')
        if (arguments.length < 2) return (n = this.tween(n)) && n._value
        if (e == null) return this.tween(n, null)
        if (typeof e != 'function') throw new Error()
        return this.tween(n, pd(t, e, r ?? ''))
    }
    function md(t) {
        return function () {
            this.textContent = t
        }
    }
    function wd(t) {
        return function () {
            var e = t(this)
            this.textContent = e ?? ''
        }
    }
    function yd(t) {
        return this.tween(
            'text',
            typeof t == 'function' ? wd(Mi(this, 'text', t)) : md(t == null ? '' : t + '')
        )
    }
    function _d(t) {
        return function (e) {
            this.textContent = t.call(this, e)
        }
    }
    function vd(t) {
        var e, r
        function n() {
            var i = t.apply(this, arguments)
            return i !== r && (e = (r = i) && _d(i)), e
        }
        return (n._value = t), n
    }
    function xd(t) {
        var e = 'text'
        if (arguments.length < 1) return (e = this.tween(e)) && e._value
        if (t == null) return this.tween(e, null)
        if (typeof t != 'function') throw new Error()
        return this.tween(e, vd(t))
    }
    function bd() {
        for (
            var t = this._name, e = this._id, r = Jo(), n = this._groups, i = n.length, s = 0;
            s < i;
            ++s
        )
            for (var o = n[s], l = o.length, u, f = 0; f < l; ++f)
                if ((u = o[f])) {
                    var c = Kt(u, e)
                    gr(u, t, r, f, o, {
                        time: c.time + c.delay + c.duration,
                        delay: 0,
                        duration: c.duration,
                        ease: c.ease
                    })
                }
        return new fe(n, this._parents, t, r)
    }
    function Ed() {
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
                var f = ne(this, n),
                    c = f.on
                c !== t &&
                    ((e = (t = c).copy()),
                    e._.cancel.push(l),
                    e._.interrupt.push(l),
                    e._.end.push(u)),
                    (f.on = e)
            }),
                i === 0 && s()
        })
    }
    var Sd = 0
    function fe(t, e, r, n) {
        ;(this._groups = t), (this._parents = e), (this._name = r), (this._id = n)
    }
    function Jo() {
        return ++Sd
    }
    var ce = hn.prototype
    fe.prototype = {
        constructor: fe,
        select: id,
        selectAll: sd,
        selectChild: ce.selectChild,
        selectChildren: ce.selectChildren,
        filter: Zh,
        merge: Qh,
        selection: ld,
        transition: bd,
        call: ce.call,
        nodes: ce.nodes,
        node: ce.node,
        size: ce.size,
        empty: ce.empty,
        each: ce.each,
        on: ed,
        attr: Lh,
        attrTween: Vh,
        style: hd,
        styleTween: gd,
        text: yd,
        textTween: xd,
        remove: rd,
        tween: Nh,
        delay: Bh,
        duration: Kh,
        ease: Wh,
        easeVarying: Gh,
        end: Ed,
        [Symbol.iterator]: ce[Symbol.iterator]
    }
    function Md(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
    }
    var Rd = { time: null, delay: 0, duration: 250, ease: Md }
    function $d(t, e) {
        for (var r; !(r = t.__transition) || !(r = r[e]); )
            if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`)
        return r
    }
    function Nd(t) {
        var e, r
        t instanceof fe
            ? ((e = t._id), (t = t._name))
            : ((e = Jo()), ((r = Rd).time = _i()), (t = t == null ? null : t + ''))
        for (var n = this._groups, i = n.length, s = 0; s < i; ++s)
            for (var o = n[s], l = o.length, u, f = 0; f < l; ++f)
                (u = o[f]) && gr(u, t, e, f, o, r || $d(u, e))
        return new fe(n, this._parents, t, e)
    }
    ;(hn.prototype.interrupt = Mh), (hn.prototype.transition = Nd)
    const Ri = Math.PI,
        $i = 2 * Ri,
        Pe = 1e-6,
        Td = $i - Pe
    function tl(t) {
        this._ += t[0]
        for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
    }
    function Cd(t) {
        let e = Math.floor(t)
        if (!(e >= 0)) throw new Error(`invalid digits: ${t}`)
        if (e > 15) return tl
        const r = 10 ** e
        return function (n) {
            this._ += n[0]
            for (let i = 1, s = n.length; i < s; ++i)
                this._ += Math.round(arguments[i] * r) / r + n[i]
        }
    }
    class kd {
        constructor(e) {
            ;(this._x0 = this._y0 = this._x1 = this._y1 = null),
                (this._ = ''),
                (this._append = e == null ? tl : Cd(e))
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
            else if (h > Pe)
                if (!(Math.abs(a * u - f * c) > Pe) || !s)
                    this._append`L${(this._x1 = e)},${(this._y1 = r)}`
                else {
                    let g = n - o,
                        w = i - l,
                        y = u * u + f * f,
                        _ = g * g + w * w,
                        d = Math.sqrt(y),
                        M = Math.sqrt(h),
                        $ = s * Math.tan((Ri - Math.acos((y + h - _) / (2 * d * M))) / 2),
                        m = $ / M,
                        S = $ / d
                    Math.abs(m - 1) > Pe && this._append`L${e + m * c},${r + m * a}`,
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
                : (Math.abs(this._x1 - f) > Pe || Math.abs(this._y1 - c) > Pe) &&
                  this._append`L${f},${c}`,
                n &&
                    (h < 0 && (h = (h % $i) + $i),
                    h > Td
                        ? this
                              ._append`A${n},${n},0,1,${a},${e - l},${r - u}A${n},${n},0,1,${a},${(this._x1 = f)},${(this._y1 = c)}`
                        : h > Pe &&
                          this
                              ._append`A${n},${n},0,${+(h >= Ri)},${a},${(this._x1 = e + n * Math.cos(s))},${(this._y1 = r + n * Math.sin(s))}`)
        }
        rect(e, r, n, i) {
            this
                ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`
        }
        toString() {
            return this._
        }
    }
    function Id(t) {
        const e = +this._x.call(null, t),
            r = +this._y.call(null, t)
        return el(this.cover(e, r), e, r, t)
    }
    function el(t, e, r, n) {
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
    function Pd(t) {
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
        for (this.cover(u, f).cover(c, a), r = 0; r < n; ++r) el(this, o[r], l[r], t[r])
        return this
    }
    function jd(t, e) {
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
    function Ld() {
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
    function Od(t) {
        return arguments.length
            ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
            : isNaN(this._x0)
              ? void 0
              : [
                    [this._x0, this._y0],
                    [this._x1, this._y1]
                ]
    }
    function Mt(t, e, r, n, i) {
        ;(this.node = t), (this.x0 = e), (this.y0 = r), (this.x1 = n), (this.y1 = i)
    }
    function Fd(t, e, r) {
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
            g && h.push(new Mt(g, i, s, c, a)),
                r == null
                    ? (r = 1 / 0)
                    : ((i = t - r), (s = e - r), (c = t + r), (a = e + r), (r *= r));
            (w = h.pop());

        )
            if (
                !(
                    !(g = w.node) ||
                    (o = w.x0) > c ||
                    (l = w.y0) > a ||
                    (u = w.x1) < i ||
                    (f = w.y1) < s
                )
            )
                if (g.length) {
                    var _ = (o + u) / 2,
                        d = (l + f) / 2
                    h.push(
                        new Mt(g[3], _, d, u, f),
                        new Mt(g[2], o, d, _, f),
                        new Mt(g[1], _, l, u, d),
                        new Mt(g[0], o, l, _, d)
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
    function zd(t) {
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
    function Ad(t) {
        for (var e = 0, r = t.length; e < r; ++e) this.remove(t[e])
        return this
    }
    function Vd() {
        return this._root
    }
    function Dd() {
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
    function Hd(t) {
        var e = [],
            r,
            n = this._root,
            i,
            s,
            o,
            l,
            u
        for (n && e.push(new Mt(n, this._x0, this._y0, this._x1, this._y1)); (r = e.pop()); )
            if (!t((n = r.node), (s = r.x0), (o = r.y0), (l = r.x1), (u = r.y1)) && n.length) {
                var f = (s + l) / 2,
                    c = (o + u) / 2
                ;(i = n[3]) && e.push(new Mt(i, f, c, l, u)),
                    (i = n[2]) && e.push(new Mt(i, s, c, f, u)),
                    (i = n[1]) && e.push(new Mt(i, f, o, l, c)),
                    (i = n[0]) && e.push(new Mt(i, s, o, f, c))
            }
        return this
    }
    function Bd(t) {
        var e = [],
            r = [],
            n
        for (
            this._root && e.push(new Mt(this._root, this._x0, this._y0, this._x1, this._y1));
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
                ;(s = i[0]) && e.push(new Mt(s, o, l, c, a)),
                    (s = i[1]) && e.push(new Mt(s, c, l, u, a)),
                    (s = i[2]) && e.push(new Mt(s, o, a, c, f)),
                    (s = i[3]) && e.push(new Mt(s, c, a, u, f))
            }
            r.push(n)
        }
        for (; (n = r.pop()); ) t(n.node, n.x0, n.y0, n.x1, n.y1)
        return this
    }
    function qd(t) {
        return t[0]
    }
    function Ud(t) {
        return arguments.length ? ((this._x = t), this) : this._x
    }
    function Kd(t) {
        return t[1]
    }
    function Xd(t) {
        return arguments.length ? ((this._y = t), this) : this._y
    }
    function Ni(t, e, r) {
        var n = new Ti(e ?? qd, r ?? Kd, NaN, NaN, NaN, NaN)
        return t == null ? n : n.addAll(t)
    }
    function Ti(t, e, r, n, i, s) {
        ;(this._x = t),
            (this._y = e),
            (this._x0 = r),
            (this._y0 = n),
            (this._x1 = i),
            (this._y1 = s),
            (this._root = void 0)
    }
    function nl(t) {
        for (var e = { data: t.data }, r = e; (t = t.next); ) r = r.next = { data: t.data }
        return e
    }
    var Rt = (Ni.prototype = Ti.prototype)
    ;(Rt.copy = function () {
        var t = new Ti(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
            e = this._root,
            r,
            n
        if (!e) return t
        if (!e.length) return (t._root = nl(e)), t
        for (r = [{ source: e, target: (t._root = new Array(4)) }]; (e = r.pop()); )
            for (var i = 0; i < 4; ++i)
                (n = e.source[i]) &&
                    (n.length
                        ? r.push({ source: n, target: (e.target[i] = new Array(4)) })
                        : (e.target[i] = nl(n)))
        return t
    }),
        (Rt.add = Id),
        (Rt.addAll = Pd),
        (Rt.cover = jd),
        (Rt.data = Ld),
        (Rt.extent = Od),
        (Rt.find = Fd),
        (Rt.remove = zd),
        (Rt.removeAll = Ad),
        (Rt.root = Vd),
        (Rt.size = Dd),
        (Rt.visit = Hd),
        (Rt.visitAfter = Bd),
        (Rt.x = Ud),
        (Rt.y = Xd)
    function $t(t) {
        return function () {
            return t
        }
    }
    function xe(t) {
        return (t() - 0.5) * 1e-6
    }
    function Wd(t) {
        return t.x + t.vx
    }
    function Yd(t) {
        return t.y + t.vy
    }
    function Gd(t) {
        var e,
            r,
            n,
            i = 1,
            s = 1
        typeof t != 'function' && (t = $t(t == null ? 1 : +t))
        function o() {
            for (var f, c = e.length, a, h, g, w, y, _, d = 0; d < s; ++d)
                for (a = Ni(e, Wd, Yd).visitAfter(l), f = 0; f < c; ++f)
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
                        var et = g - H.x - H.vx,
                            at = w - H.y - H.vy,
                            st = et * et + at * at
                        st < X * X &&
                            (et === 0 && ((et = xe(n)), (st += et * et)),
                            at === 0 && ((at = xe(n)), (st += at * at)),
                            (st = ((X - (st = Math.sqrt(st))) / st) * i),
                            (h.vx += (et *= st) * (X = (G *= G) / (_ + G))),
                            (h.vy += (at *= st) * X),
                            (H.vx -= et * (X = 1 - X)),
                            (H.vy -= at * X))
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
                return arguments.length ? ((t = typeof f == 'function' ? f : $t(+f)), u(), o) : t
            }),
            o
        )
    }
    function Zd(t) {
        return t.index
    }
    function rl(t, e) {
        var r = t.get(e)
        if (!r) throw new Error('node not found: ' + e)
        return r
    }
    function Qd(t) {
        var e = Zd,
            r = a,
            n,
            i = $t(30),
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
                        (z = T.x + T.vx - S.x - S.vx || xe(f)),
                        (H = T.y + T.vy - S.y - S.vy || xe(f)),
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
                        typeof m.source != 'object' && (m.source = rl($, m.source)),
                        typeof m.target != 'object' && (m.target = rl($, m.target)),
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
                return arguments.length ? ((r = typeof _ == 'function' ? _ : $t(+_)), w(), h) : r
            }),
            (h.distance = function (_) {
                return arguments.length ? ((i = typeof _ == 'function' ? _ : $t(+_)), y(), h) : i
            }),
            h
        )
    }
    const Jd = 1664525,
        tp = 1013904223,
        il = 4294967296
    function ep() {
        let t = 1
        return () => (t = (Jd * t + tp) % il) / il
    }
    function np(t) {
        return t.x
    }
    function rp(t) {
        return t.y
    }
    var ip = 10,
        sp = Math.PI * (3 - Math.sqrt(5))
    function op(t) {
        var e,
            r = 1,
            n = 0.001,
            i = 1 - Math.pow(n, 1 / 300),
            s = 0,
            o = 0.6,
            l = new Map(),
            u = vi(a),
            f = an('tick', 'end'),
            c = ep()
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
                    var M = ip * Math.sqrt(0.5 + y),
                        $ = y * sp
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
    function lp() {
        var t,
            e,
            r,
            n,
            i = $t(-30),
            s,
            o = 1,
            l = 1 / 0,
            u = 0.81
        function f(g) {
            var w,
                y = t.length,
                _ = Ni(t, np, rp).visitAfter(a)
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
                        (d === 0 && ((d = xe(r)), (m += d * d)),
                        M === 0 && ((M = xe(r)), (m += M * M)),
                        m < o && (m = Math.sqrt(o * m)),
                        (e.vx += (d * g.value * n) / m),
                        (e.vy += (M * g.value * n) / m)),
                    !0
                )
            if (g.length || m >= l) return
            ;(g.data !== e || g.next) &&
                (d === 0 && ((d = xe(r)), (m += d * d)),
                M === 0 && ((M = xe(r)), (m += M * M)),
                m < o && (m = Math.sqrt(o * m)))
            do g.data !== e && (($ = (s[g.data.index] * n) / m), (e.vx += d * $), (e.vy += M * $))
            while ((g = g.next))
        }
        return (
            (f.initialize = function (g, w) {
                ;(t = g), (r = w), c()
            }),
            (f.strength = function (g) {
                return arguments.length ? ((i = typeof g == 'function' ? g : $t(+g)), c(), f) : i
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
    function up(t) {
        var e = $t(0.1),
            r,
            n,
            i
        typeof t != 'function' && (t = $t(t == null ? 0 : +t))
        function s(l) {
            for (var u = 0, f = r.length, c; u < f; ++u)
                (c = r[u]), (c.vx += (i[u] - c.x) * n[u] * l)
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
                return arguments.length ? ((e = typeof l == 'function' ? l : $t(+l)), o(), s) : e
            }),
            (s.x = function (l) {
                return arguments.length ? ((t = typeof l == 'function' ? l : $t(+l)), o(), s) : t
            }),
            s
        )
    }
    function fp(t) {
        var e = $t(0.1),
            r,
            n,
            i
        typeof t != 'function' && (t = $t(t == null ? 0 : +t))
        function s(l) {
            for (var u = 0, f = r.length, c; u < f; ++u)
                (c = r[u]), (c.vy += (i[u] - c.y) * n[u] * l)
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
                return arguments.length ? ((e = typeof l == 'function' ? l : $t(+l)), o(), s) : e
            }),
            (s.y = function (l) {
                return arguments.length ? ((t = typeof l == 'function' ? l : $t(+l)), o(), s) : t
            }),
            s
        )
    }
    function Be(t) {
        return function () {
            return t
        }
    }
    function cp(t) {
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
            () => new kd(e)
        )
    }
    function ap(t) {
        return typeof t == 'object' && 'length' in t ? t : Array.from(t)
    }
    function sl(t) {
        this._context = t
    }
    sl.prototype = {
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
    function hp(t) {
        return new sl(t)
    }
    function dp(t) {
        return t[0]
    }
    function pp(t) {
        return t[1]
    }
    function gp(t, e) {
        var r = Be(!0),
            n = null,
            i = hp,
            s = null,
            o = cp(l)
        ;(t = typeof t == 'function' ? t : t === void 0 ? dp : Be(t)),
            (e = typeof e == 'function' ? e : e === void 0 ? pp : Be(e))
        function l(u) {
            var f,
                c = (u = ap(u)).length,
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
                return arguments.length ? ((t = typeof u == 'function' ? u : Be(+u)), l) : t
            }),
            (l.y = function (u) {
                return arguments.length ? ((e = typeof u == 'function' ? u : Be(+u)), l) : e
            }),
            (l.defined = function (u) {
                return arguments.length ? ((r = typeof u == 'function' ? u : Be(!!u)), l) : r
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
    const wr = (t) => () => t
    function mp(t, { sourceEvent: e, target: r, transform: n, dispatch: i }) {
        Object.defineProperties(this, {
            type: { value: t, enumerable: !0, configurable: !0 },
            sourceEvent: { value: e, enumerable: !0, configurable: !0 },
            target: { value: r, enumerable: !0, configurable: !0 },
            transform: { value: n, enumerable: !0, configurable: !0 },
            _: { value: i }
        })
    }
    function ae(t, e, r) {
        ;(this.k = t), (this.x = e), (this.y = r)
    }
    ae.prototype = {
        constructor: ae,
        scale: function (t) {
            return t === 1 ? this : new ae(this.k * t, this.x, this.y)
        },
        translate: function (t, e) {
            return (t === 0) & (e === 0)
                ? this
                : new ae(this.k, this.x + this.k * t, this.y + this.k * e)
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
    var ol = new ae(1, 0, 0)
    ae.prototype
    function Ci(t) {
        t.stopImmediatePropagation()
    }
    function bn(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }
    function wp(t) {
        return (!t.ctrlKey || t.type === 'wheel') && !t.button
    }
    function yp() {
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
    function ll() {
        return this.__zoom || ol
    }
    function _p(t) {
        return (
            -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 0.002) * (t.ctrlKey ? 10 : 1)
        )
    }
    function vp() {
        return navigator.maxTouchPoints || 'ontouchstart' in this
    }
    function xp(t, e, r) {
        var n = t.invertX(e[0][0]) - r[0][0],
            i = t.invertX(e[1][0]) - r[1][0],
            s = t.invertY(e[0][1]) - r[0][1],
            o = t.invertY(e[1][1]) - r[1][1]
        return t.translate(
            i > n ? (n + i) / 2 : Math.min(0, n) || Math.max(0, i),
            o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
        )
    }
    function bp() {
        var t = wp,
            e = yp,
            r = xp,
            n = _p,
            i = vp,
            s = [0, 1 / 0],
            o = [
                [-1 / 0, -1 / 0],
                [1 / 0, 1 / 0]
            ],
            l = 250,
            u = wh,
            f = an('start', 'zoom', 'end'),
            c,
            a,
            h,
            g = 500,
            w = 150,
            y = 0,
            _ = 10
        function d(x) {
            x.property('__zoom', ll)
                .on('wheel.zoom', H, { passive: !1 })
                .on('mousedown.zoom', G)
                .on('dblclick.zoom', X)
                .filter(i)
                .on('touchstart.zoom', et)
                .on('touchmove.zoom', at)
                .on('touchend.zoom touchcancel.zoom', st)
                .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
        }
        ;(d.transform = function (x, O, b, I) {
            var P = x.selection ? x.selection() : x
            P.property('__zoom', ll),
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
                            nt = U.invert(K),
                            rt = typeof O == 'function' ? O.apply(this, arguments) : O
                        return r($(M(U, rt), K, nt), P, o)
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
                            nt =
                                I == null
                                    ? m(U)
                                    : typeof I == 'function'
                                      ? I.apply(this, arguments)
                                      : I
                        return r(
                            ol
                                .translate(nt[0], nt[1])
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
            return (O = Math.max(s[0], Math.min(s[1], O))), O === x.k ? x : new ae(O, x.x, x.y)
        }
        function $(x, O, b) {
            var I = O[0] - b[0] * x.k,
                P = O[1] - b[1] * x.k
            return I === x.x && P === x.y ? x : new ae(x.k, I, P)
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
                        nt = e.apply(P, U),
                        rt = b == null ? m(nt) : typeof b == 'function' ? b.apply(P, U) : b,
                        vt = Math.max(nt[1][0] - nt[0][0], nt[1][1] - nt[0][1]),
                        dt = P.__zoom,
                        yt = typeof O == 'function' ? O.apply(P, U) : O,
                        R = u(dt.invert(rt).concat(vt / dt.k), yt.invert(rt).concat(vt / yt.k))
                    return function (A) {
                        if (A === 1) A = yt
                        else {
                            var D = R(A),
                                B = vt / D[2]
                            A = new ae(B, rt[0] - D[0] * B, rt[1] - D[1] * B)
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
                return (
                    ++this.active === 1 && ((this.that.__zooming = this), this.emit('start')), this
                )
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
                var O = te(this.that).datum()
                f.call(
                    x,
                    this.that,
                    new mp(x, {
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
                U = Vt(x)
            if (b.wheel)
                (b.mouse[0][0] !== U[0] || b.mouse[0][1] !== U[1]) &&
                    (b.mouse[1] = I.invert((b.mouse[0] = U))),
                    clearTimeout(b.wheel)
            else {
                if (I.k === P) return
                ;(b.mouse = [U, I.invert(U)]), mr(this), b.start()
            }
            bn(x),
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
                P = te(x.view).on('mousemove.zoom', rt, !0).on('mouseup.zoom', vt, !0),
                U = Vt(x, b),
                K = x.clientX,
                nt = x.clientY
            Mo(x.view), Ci(x), (I.mouse = [U, this.__zoom.invert(U)]), mr(this), I.start()
            function rt(dt) {
                if ((bn(dt), !I.moved)) {
                    var yt = dt.clientX - K,
                        R = dt.clientY - nt
                    I.moved = yt * yt + R * R > y
                }
                I.event(dt).zoom(
                    'mouse',
                    r($(I.that.__zoom, (I.mouse[0] = Vt(dt, b)), I.mouse[1]), I.extent, o)
                )
            }
            function vt(dt) {
                P.on('mousemove.zoom mouseup.zoom', null),
                    Ro(dt.view, I.moved),
                    bn(dt),
                    I.event(dt).end()
            }
        }
        function X(x, ...O) {
            if (t.apply(this, arguments)) {
                var b = this.__zoom,
                    I = Vt(x.changedTouches ? x.changedTouches[0] : x, this),
                    P = b.invert(I),
                    U = b.k * (x.shiftKey ? 0.5 : 2),
                    K = r($(M(b, U), I, P), e.apply(this, O), o)
                bn(x),
                    l > 0
                        ? te(this).transition().duration(l).call(S, K, I, x)
                        : te(this).call(d.transform, K, I, x)
            }
        }
        function et(x, ...O) {
            if (t.apply(this, arguments)) {
                var b = x.touches,
                    I = b.length,
                    P = T(this, O, x.changedTouches.length === I).event(x),
                    U,
                    K,
                    nt,
                    rt
                for (Ci(x), K = 0; K < I; ++K)
                    (nt = b[K]),
                        (rt = Vt(nt, this)),
                        (rt = [rt, this.__zoom.invert(rt), nt.identifier]),
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
                        mr(this),
                        P.start())
            }
        }
        function at(x, ...O) {
            if (this.__zooming) {
                var b = T(this, O).event(x),
                    I = x.changedTouches,
                    P = I.length,
                    U,
                    K,
                    nt,
                    rt
                for (bn(x), U = 0; U < P; ++U)
                    (K = I[U]),
                        (nt = Vt(K, this)),
                        b.touch0 && b.touch0[2] === K.identifier
                            ? (b.touch0[0] = nt)
                            : b.touch1 && b.touch1[2] === K.identifier && (b.touch1[0] = nt)
                if (((K = b.that.__zoom), b.touch1)) {
                    var vt = b.touch0[0],
                        dt = b.touch0[1],
                        yt = b.touch1[0],
                        R = b.touch1[1],
                        A = (A = yt[0] - vt[0]) * A + (A = yt[1] - vt[1]) * A,
                        D = (D = R[0] - dt[0]) * D + (D = R[1] - dt[1]) * D
                    ;(K = M(K, Math.sqrt(A / D))),
                        (nt = [(vt[0] + yt[0]) / 2, (vt[1] + yt[1]) / 2]),
                        (rt = [(dt[0] + R[0]) / 2, (dt[1] + R[1]) / 2])
                } else if (b.touch0) (nt = b.touch0[0]), (rt = b.touch0[1])
                else return
                b.zoom('touch', r($(K, nt, rt), b.extent, o))
            }
        }
        function st(x, ...O) {
            if (this.__zooming) {
                var b = T(this, O).event(x),
                    I = x.changedTouches,
                    P = I.length,
                    U,
                    K
                for (
                    Ci(x),
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
                    b.taps === 2 && ((K = Vt(K, this)), Math.hypot(a[0] - K[0], a[1] - K[1]) < _))
                ) {
                    var nt = te(this).on('dblclick.zoom')
                    nt && nt.apply(this, arguments)
                }
            }
        }
        return (
            (d.wheelDelta = function (x) {
                return arguments.length ? ((n = typeof x == 'function' ? x : wr(+x)), d) : n
            }),
            (d.filter = function (x) {
                return arguments.length ? ((t = typeof x == 'function' ? x : wr(!!x)), d) : t
            }),
            (d.touchable = function (x) {
                return arguments.length ? ((i = typeof x == 'function' ? x : wr(!!x)), d) : i
            }),
            (d.extent = function (x) {
                return arguments.length
                    ? ((e =
                          typeof x == 'function'
                              ? x
                              : wr([
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
    class ul {
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
    var Pt = ((t) => (
        (t.LINE = 'LINE'),
        (t.LINEREVERSE = 'LINE-REVERSE'),
        (t.ARC = 'ARC'),
        (t.ARCREVERSE = 'ARC-REVERSE'),
        (t.REFLEXIVE = 'REFLEXIVE'),
        t
    ))(Pt || {})
    class Ep {
        constructor(e, r, n, i) {
            Ot(this, 'id')
            ;(this.source = e),
                (this.target = r),
                (this.pathType = n),
                (this.label = i),
                (this.id = `${e.id}-${r.id}`)
        }
    }
    class Sp {
        constructor() {
            Ot(this, 'nodeIdCounter', 0)
            Ot(this, 'nodes', [])
            Ot(this, 'links', [])
        }
        unlockNodes() {
            this.nodes.forEach((e) => {
                ;(e.fx = void 0), (e.fy = void 0)
            })
        }
        createNode(e, r, n, i) {
            const s = new ul(this.nodeIdCounter++, n, e, r, void 0, void 0, i)
            return this.nodes.push(s), s
        }
        createLink(e, r, n) {
            if (this.links.find((u) => u.source.id === e && u.target.id === r) !== void 0) return
            const s = this.nodes.find((u) => u.id === e)
            if (s === void 0) return
            const o = this.nodes.find((u) => u.id === r)
            if (o === void 0) return
            const l = new Ep(s, o, void 0, n)
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
        toTGF(e, r) {
            if (this.nodes.length === 0 && this.links.length === 0) return 'Graph is empty'
            let n, i
            return (
                e
                    ? (n = this.nodes.map(
                          (s) => `${s.id} ${s.label !== void 0 ? `${s.label}` : ''}`
                      ).join(`
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
    function Mp(t) {
        return bp()
            .scaleExtent([0.5, 5])
            .filter((e) => {
                var r
                return e.button === 0 || ((r = e.touches) == null ? void 0 : r.length) >= 2
            })
            .on('zoom', (e) => t(e))
    }
    function je(t) {
        t.preventDefault(), t.stopPropagation()
    }
    function Rp(t, e, r, n) {
        return Ua()
            .filter((i) => i.button === 2)
            .on('start', (i, s) => {
                je(i.sourceEvent),
                    i.active === 0 && t.alphaTarget(0.5).restart(),
                    (s.fx = s.x),
                    (s.fy = s.y)
            })
            .on('drag', (i, s) => {
                ;(s.fx = Math.max(n, Math.min(e - n, i.x))),
                    (s.fy = Math.max(n, Math.min(r - n, i.y)))
            })
            .on('end', (i, s) => {
                i.active === 0 && t.alphaTarget(0), (s.fx = void 0), (s.fy = void 0)
            })
    }
    function $p(t, e, r, n, i) {
        const s = t
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .on('pointermove', (o) => r(o))
            .on('pointerup', (o) => n(o))
            .on('contextmenu', (o) => je(o))
            .on('dblclick', (o) => i(o))
            .call(e)
            .on('dblclick.zoom', null)
            .append('g')
        return (
            s.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'white'), s
        )
    }
    function Np(t) {
        return t.append('g').classed('links', !0).selectAll('path')
    }
    function Tp(t) {
        return t.append('g').classed('nodes', !0).selectAll('circle')
    }
    function Cp(t, e) {
        ki(t, e, 'link-arrow', 'arrow', !1),
            ki(t, e, 'link-arrow-reverse', 'arrow', !0),
            ki(t, e, 'draggable-link-arrow', 'arrow draggable', !1)
    }
    function ki(t, e, r, n, i) {
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
            .attr('d', `${gp()(e.arrowPoints)}`)
    }
    function kp(t) {
        return t.append('path').classed('link draggable hidden', !0).attr('d', 'M0,0L0,0')
    }
    function Ip(t, e, r, n, i) {
        let s = op(t.nodes)
            .on('tick', () => i())
            .force('collision', Gd().radius(e.nodeRadius))
        return (
            (s = Pp(t, s, r, n, e)),
            (s = Lp(s, t, e, e.fixedLinkDistanceEnabled)),
            (s = jp(s, e.nodePhysicsEnabled, r, n)),
            s
        )
    }
    function Pp(t, e, r, n, i) {
        return e.force('bounds', () => {
            for (const s of t.nodes)
                (s.x = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, s.x))),
                    (s.y = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, s.y)))
        })
    }
    function jp(t, e, r, n) {
        return e
            ? t
                  .force('charge', lp().strength(-500))
                  .force('x', up(r / 2).strength(0.05))
                  .force('y', fp(n / 2).strength(0.05))
            : t.force('charge', null).force('x', null).force('y', null)
    }
    function Lp(t, e, r, n) {
        return n
            ? t.force(
                  'link',
                  Qd()
                      .links(e.links)
                      .id((i) => i.id)
                      .distance(r.nodeRadius * 10)
              )
            : t.force('link', null)
    }
    const Op = !0,
        fl = 24,
        Fp = !0,
        zp = !1,
        Ap = !0,
        Vp = !1,
        be = 4,
        Dp = {
            hasToolbar: Op,
            nodeRadius: fl,
            showNodeLabels: Fp,
            nodePhysicsEnabled: zp,
            showLinkLabels: Ap,
            fixedLinkDistanceEnabled: Vp,
            markerBoxSize: be,
            markerPadding: fl + 2 * be,
            markerRef: be / 2,
            arrowPoints: [
                [0, 0],
                [0, be],
                [be, be / 2]
            ],
            markerPath: [0, 0, be, be].join(',')
        },
        Hp = Object.prototype.toString
    function yr(t) {
        const e = Hp.call(t)
        return e.endsWith('Array]') && !e.includes('Big')
    }
    function Bp(t) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
        if (!yr(t)) throw new TypeError('input must be an array')
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
    function qp(t) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
        if (!yr(t)) throw new TypeError('input must be an array')
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
    function cl(t) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
        if (yr(t)) {
            if (t.length === 0) throw new TypeError('input must not be empty')
        } else throw new TypeError('input must be an array')
        var r
        if (e.output !== void 0) {
            if (!yr(e.output)) throw new TypeError('output option must be an array if specified')
            r = e.output
        } else r = new Array(t.length)
        var n = qp(t),
            i = Bp(t)
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
    const _r = ' '.repeat(2),
        al = ' '.repeat(4)
    function Up() {
        return hl(this)
    }
    function hl(t, e = {}) {
        const { maxRows: r = 15, maxColumns: n = 10, maxNumSize: i = 8 } = e
        return `${t.constructor.name} {
${_r}[
${al}${Kp(t, r, n, i)}
${_r}]
${_r}rows: ${t.rows}
${_r}columns: ${t.columns}
}`
    }
    function Kp(t, e, r, n) {
        const { rows: i, columns: s } = t,
            o = Math.min(i, e),
            l = Math.min(s, r),
            u = []
        for (let f = 0; f < o; f++) {
            let c = []
            for (let a = 0; a < l; a++) c.push(Xp(t.get(f, a), n))
            u.push(`${c.join(' ')}`)
        }
        return (
            l !== s && (u[u.length - 1] += ` ... ${s - r} more columns`),
            o !== i && u.push(`... ${i - e} more rows`),
            u.join(`
${al}`)
        )
    }
    function Xp(t, e) {
        const r = String(t)
        if (r.length <= e) return r.padEnd(e, ' ')
        const n = t.toPrecision(e - 2)
        if (n.length <= e) return n
        const i = t.toExponential(e - 2),
            s = i.indexOf('e'),
            o = i.slice(s)
        return i.slice(0, e - o.length) + o
    }
    function Wp(t, e) {
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) + n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) - n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) * n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) / n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) % n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) & n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) | n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) ^ n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) << n.get(i, s))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, this.get(i, s) >> n.get(i, s))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.acosh(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.asinh(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.atanh(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.clz32(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.expm1(this.get(n, i)))
                return this
            }),
            (t.expm1 = function (n) {
                return new e(n).expm1()
            }),
            (t.prototype.floor = function () {
                for (let n = 0; n < this.rows; n++)
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.floor(this.get(n, i)))
                return this
            }),
            (t.floor = function (n) {
                return new e(n).floor()
            }),
            (t.prototype.fround = function () {
                for (let n = 0; n < this.rows; n++)
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.fround(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.log1p(this.get(n, i)))
                return this
            }),
            (t.log1p = function (n) {
                return new e(n).log1p()
            }),
            (t.prototype.log10 = function () {
                for (let n = 0; n < this.rows; n++)
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.log10(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.round(this.get(n, i)))
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
                    for (let i = 0; i < this.columns; i++)
                        this.set(n, i, Math.trunc(this.get(n, i)))
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
                    for (let s = 0; s < this.columns; s++)
                        this.set(i, s, Math.pow(this.get(i, s), n))
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
    function Xt(t, e, r) {
        let n = r ? t.rows : t.rows - 1
        if (e < 0 || e > n) throw new RangeError('Row index out of range')
    }
    function Wt(t, e, r) {
        let n = r ? t.columns : t.columns - 1
        if (e < 0 || e > n) throw new RangeError('Column index out of range')
    }
    function qe(t, e) {
        if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.columns))
            throw new RangeError('vector size must be the same as the number of columns')
        return e
    }
    function Ue(t, e) {
        if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.rows))
            throw new RangeError('vector size must be the same as the number of rows')
        return e
    }
    function Yp(t, e, r) {
        return { row: Gp(t, e), column: Zp(t, r) }
    }
    function Gp(t, e) {
        if (typeof e != 'object') throw new TypeError('unexpected type for row indices')
        if (e.some((n) => n < 0 || n >= t.rows))
            throw new RangeError('row indices are out of range')
        return Array.isArray(e) || (e = Array.from(e)), e
    }
    function Zp(t, e) {
        if (typeof e != 'object') throw new TypeError('unexpected type for column indices')
        if (e.some((n) => n < 0 || n >= t.columns))
            throw new RangeError('column indices are out of range')
        return Array.isArray(e) || (e = Array.from(e)), e
    }
    function dl(t, e, r, n, i) {
        if (arguments.length !== 5) throw new RangeError('expected 4 arguments')
        if (
            (xr('startRow', e),
            xr('endRow', r),
            xr('startColumn', n),
            xr('endColumn', i),
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
    function vr(t, e = 0) {
        let r = []
        for (let n = 0; n < t; n++) r.push(e)
        return r
    }
    function xr(t, e) {
        if (typeof e != 'number') throw new TypeError(`${t} must be a number`)
    }
    function Ke(t) {
        if (t.isEmpty()) throw new Error('Empty matrix has no elements to index')
    }
    function Qp(t) {
        let e = vr(t.rows)
        for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[r] += t.get(r, n)
        return e
    }
    function Jp(t) {
        let e = vr(t.columns)
        for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[n] += t.get(r, n)
        return e
    }
    function t0(t) {
        let e = 0
        for (let r = 0; r < t.rows; r++) for (let n = 0; n < t.columns; n++) e += t.get(r, n)
        return e
    }
    function e0(t) {
        let e = vr(t.rows, 1)
        for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[r] *= t.get(r, n)
        return e
    }
    function n0(t) {
        let e = vr(t.columns, 1)
        for (let r = 0; r < t.rows; ++r) for (let n = 0; n < t.columns; ++n) e[n] *= t.get(r, n)
        return e
    }
    function r0(t) {
        let e = 1
        for (let r = 0; r < t.rows; r++) for (let n = 0; n < t.columns; n++) e *= t.get(r, n)
        return e
    }
    function i0(t, e, r) {
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
    function s0(t, e, r) {
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
    function o0(t, e, r) {
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
    function l0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e[r])
    }
    function u0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e[n])
    }
    function f0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) - e)
    }
    function c0(t) {
        const e = []
        for (let r = 0; r < t.rows; r++) {
            let n = 0
            for (let i = 0; i < t.columns; i++) n += Math.pow(t.get(r, i), 2) / (t.columns - 1)
            e.push(Math.sqrt(n))
        }
        return e
    }
    function a0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e[r])
    }
    function h0(t) {
        const e = []
        for (let r = 0; r < t.columns; r++) {
            let n = 0
            for (let i = 0; i < t.rows; i++) n += Math.pow(t.get(i, r), 2) / (t.rows - 1)
            e.push(Math.sqrt(n))
        }
        return e
    }
    function d0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e[n])
    }
    function p0(t) {
        const e = t.size - 1
        let r = 0
        for (let n = 0; n < t.columns; n++)
            for (let i = 0; i < t.rows; i++) r += Math.pow(t.get(i, n), 2) / e
        return Math.sqrt(r)
    }
    function g0(t, e) {
        for (let r = 0; r < t.rows; r++)
            for (let n = 0; n < t.columns; n++) t.set(r, n, t.get(r, n) / e)
    }
    class it {
        static from1DArray(e, r, n) {
            if (e * r !== n.length)
                throw new RangeError('data length does not match given dimensions')
            let s = new Z(e, r)
            for (let o = 0; o < e; o++) for (let l = 0; l < r; l++) s.set(o, l, n[o * r + l])
            return s
        }
        static rowVector(e) {
            let r = new Z(1, e.length)
            for (let n = 0; n < e.length; n++) r.set(0, n, e[n])
            return r
        }
        static columnVector(e) {
            let r = new Z(e.length, 1)
            for (let n = 0; n < e.length; n++) r.set(n, 0, e[n])
            return r
        }
        static zeros(e, r) {
            return new Z(e, r)
        }
        static ones(e, r) {
            return new Z(e, r).fill(1)
        }
        static rand(e, r, n = {}) {
            if (typeof n != 'object') throw new TypeError('options must be an object')
            const { random: i = Math.random } = n
            let s = new Z(e, r)
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
                u = new Z(e, r)
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
                s = new Z(n, i)
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
            return it.isMatrix(e) ? e : new Z(e)
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
            if (!Number.isInteger(r) || r <= 0)
                throw new TypeError('rows must be a positive integer')
            if (!Number.isInteger(n) || n <= 0)
                throw new TypeError('columns must be a positive integer')
            let i = new Z(this.rows * r, this.columns * n)
            for (let s = 0; s < r; s++)
                for (let o = 0; o < n; o++) i.setSubMatrix(this, this.rows * s, this.columns * o)
            return i
        }
        fill(e) {
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, e)
            return this
        }
        neg() {
            return this.mulS(-1)
        }
        getRow(e) {
            Xt(this, e)
            let r = []
            for (let n = 0; n < this.columns; n++) r.push(this.get(e, n))
            return r
        }
        getRowVector(e) {
            return Z.rowVector(this.getRow(e))
        }
        setRow(e, r) {
            Xt(this, e), (r = qe(this, r))
            for (let n = 0; n < this.columns; n++) this.set(e, n, r[n])
            return this
        }
        swapRows(e, r) {
            Xt(this, e), Xt(this, r)
            for (let n = 0; n < this.columns; n++) {
                let i = this.get(e, n)
                this.set(e, n, this.get(r, n)), this.set(r, n, i)
            }
            return this
        }
        getColumn(e) {
            Wt(this, e)
            let r = []
            for (let n = 0; n < this.rows; n++) r.push(this.get(n, e))
            return r
        }
        getColumnVector(e) {
            return Z.columnVector(this.getColumn(e))
        }
        setColumn(e, r) {
            Wt(this, e), (r = Ue(this, r))
            for (let n = 0; n < this.rows; n++) this.set(n, e, r[n])
            return this
        }
        swapColumns(e, r) {
            Wt(this, e), Wt(this, r)
            for (let n = 0; n < this.rows; n++) {
                let i = this.get(n, e)
                this.set(n, e, this.get(n, r)), this.set(n, r, i)
            }
            return this
        }
        addRowVector(e) {
            e = qe(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) + e[n])
            return this
        }
        subRowVector(e) {
            e = qe(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) - e[n])
            return this
        }
        mulRowVector(e) {
            e = qe(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) * e[n])
            return this
        }
        divRowVector(e) {
            e = qe(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) / e[n])
            return this
        }
        addColumnVector(e) {
            e = Ue(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) + e[r])
            return this
        }
        subColumnVector(e) {
            e = Ue(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) - e[r])
            return this
        }
        mulColumnVector(e) {
            e = Ue(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) * e[r])
            return this
        }
        divColumnVector(e) {
            e = Ue(this, e)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) this.set(r, n, this.get(r, n) / e[r])
            return this
        }
        mulRow(e, r) {
            Xt(this, e)
            for (let n = 0; n < this.columns; n++) this.set(e, n, this.get(e, n) * r)
            return this
        }
        mulColumn(e, r) {
            Wt(this, e)
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
            Ke(this)
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
            Ke(this)
            let e = this.get(0, 0),
                r = [0, 0]
            for (let n = 0; n < this.rows; n++)
                for (let i = 0; i < this.columns; i++)
                    this.get(n, i) < e && ((e = this.get(n, i)), (r[0] = n), (r[1] = i))
            return r
        }
        maxRow(e) {
            if ((Xt(this, e), this.isEmpty())) return NaN
            let r = this.get(e, 0)
            for (let n = 1; n < this.columns; n++) this.get(e, n) > r && (r = this.get(e, n))
            return r
        }
        maxRowIndex(e) {
            Xt(this, e), Ke(this)
            let r = this.get(e, 0),
                n = [e, 0]
            for (let i = 1; i < this.columns; i++)
                this.get(e, i) > r && ((r = this.get(e, i)), (n[1] = i))
            return n
        }
        minRow(e) {
            if ((Xt(this, e), this.isEmpty())) return NaN
            let r = this.get(e, 0)
            for (let n = 1; n < this.columns; n++) this.get(e, n) < r && (r = this.get(e, n))
            return r
        }
        minRowIndex(e) {
            Xt(this, e), Ke(this)
            let r = this.get(e, 0),
                n = [e, 0]
            for (let i = 1; i < this.columns; i++)
                this.get(e, i) < r && ((r = this.get(e, i)), (n[1] = i))
            return n
        }
        maxColumn(e) {
            if ((Wt(this, e), this.isEmpty())) return NaN
            let r = this.get(0, e)
            for (let n = 1; n < this.rows; n++) this.get(n, e) > r && (r = this.get(n, e))
            return r
        }
        maxColumnIndex(e) {
            Wt(this, e), Ke(this)
            let r = this.get(0, e),
                n = [0, e]
            for (let i = 1; i < this.rows; i++)
                this.get(i, e) > r && ((r = this.get(i, e)), (n[0] = i))
            return n
        }
        minColumn(e) {
            if ((Wt(this, e), this.isEmpty())) return NaN
            let r = this.get(0, e)
            for (let n = 1; n < this.rows; n++) this.get(n, e) < r && (r = this.get(n, e))
            return r
        }
        minColumnIndex(e) {
            Wt(this, e), Ke(this)
            let r = this.get(0, e),
                n = [0, e]
            for (let i = 1; i < this.rows; i++)
                this.get(i, e) < r && ((r = this.get(i, e)), (n[0] = i))
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
            it.isMatrix(e) && (e = e.to1DArray())
            let r = this.to1DArray()
            if (r.length !== e.length) throw new RangeError('vectors do not have the same size')
            let n = 0
            for (let i = 0; i < r.length; i++) n += r[i] * e[i]
            return n
        }
        mmul(e) {
            e = Z.checkMatrix(e)
            let r = this.rows,
                n = this.columns,
                i = e.columns,
                s = new Z(r, i),
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
            e = Z.checkMatrix(e)
            let r = new Z(2, 2)
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
            e = Z.checkMatrix(e)
            let r = new Z(3, 3)
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
                et = (-n + f + c) * (h - w + d),
                at = (-n + f) * (w - d),
                st = (f + c) * (-h + w),
                x = (n + i + s - l - u - f - c) * d,
                O = c * (-h + w + y - _ - d - M + $),
                b = (-s + c + a) * (_ + M - $),
                I = (s - a) * (_ - $),
                P = s * M,
                U = (c + a) * (-M + $),
                K = (-s + l + u) * (d + M - m),
                nt = (s - u) * (d - m),
                rt = (l + u) * (-M + m),
                vt = i * y,
                dt = u * $,
                yt = o * w,
                R = f * g,
                A = a * m,
                D = X + P + vt,
                B = S + H + G + X + b + P + U,
                ot = X + et + st + x + P + K + rt,
                Ee = T + z + H + X + P + K + nt,
                jt = T + H + G + X + dt,
                p = P + K + nt + rt + yt,
                v = X + et + at + O + b + I + P,
                E = b + I + P + U + R,
                N = X + et + at + st + A
            return (
                r.set(0, 0, D),
                r.set(0, 1, B),
                r.set(0, 2, ot),
                r.set(1, 0, Ee),
                r.set(1, 1, jt),
                r.set(1, 2, p),
                r.set(2, 0, v),
                r.set(2, 1, E),
                r.set(2, 2, N),
                r
            )
        }
        mmulStrassen(e) {
            e = Z.checkMatrix(e)
            let r = this.clone(),
                n = r.rows,
                i = r.columns,
                s = e.rows,
                o = e.columns
            i !== s &&
                console.warn(
                    `Multiplying ${n} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
                )
            function l(a, h, g) {
                let w = a.rows,
                    y = a.columns
                if (w === h && y === g) return a
                {
                    let _ = it.zeros(h, g)
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
                    G = c(it.add(d, z), it.add(M, H), y, _),
                    X = c(it.add(S, z), M, y, _),
                    et = c(d, it.sub(m, H), y, _),
                    at = c(z, it.sub(T, M), y, _),
                    st = c(it.add(d, $), H, y, _),
                    x = c(it.sub(S, d), it.add(M, m), y, _),
                    O = c(it.sub($, z), it.add(T, H), y, _),
                    b = it.add(G, at)
                b.sub(st), b.add(O)
                let I = it.add(et, st),
                    P = it.add(X, at),
                    U = it.sub(G, X)
                U.add(et), U.add(x)
                let K = it.zeros(2 * b.rows, 2 * b.columns)
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
            let i = new Z(this.rows, this.columns)
            for (let s = 0; s < this.rows; s++) {
                const o = this.getRow(s)
                o.length > 0 && cl(o, { min: r, max: n, output: o }), i.setRow(s, o)
            }
            return i
        }
        scaleColumns(e = {}) {
            if (typeof e != 'object') throw new TypeError('options must be an object')
            const { min: r = 0, max: n = 1 } = e
            if (!Number.isFinite(r)) throw new TypeError('min must be a number')
            if (!Number.isFinite(n)) throw new TypeError('max must be a number')
            if (r >= n) throw new RangeError('min must be smaller than max')
            let i = new Z(this.rows, this.columns)
            for (let s = 0; s < this.columns; s++) {
                const o = this.getColumn(s)
                o.length && cl(o, { min: r, max: n, output: o }), i.setColumn(s, o)
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
            e = Z.checkMatrix(e)
            let r = this.rows,
                n = this.columns,
                i = e.rows,
                s = e.columns,
                o = new Z(r * i, n * s)
            for (let l = 0; l < r; l++)
                for (let u = 0; u < n; u++)
                    for (let f = 0; f < i; f++)
                        for (let c = 0; c < s; c++)
                            o.set(i * l + f, s * u + c, this.get(l, u) * e.get(f, c))
            return o
        }
        kroneckerSum(e) {
            if (((e = Z.checkMatrix(e)), !this.isSquare() || !e.isSquare()))
                throw new Error('Kronecker Sum needs two Square Matrices')
            let r = this.rows,
                n = e.rows,
                i = this.kroneckerProduct(Z.eye(n, n)),
                s = Z.eye(r, r).kroneckerProduct(e)
            return i.add(s)
        }
        transpose() {
            let e = new Z(this.columns, this.rows)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) e.set(n, r, this.get(r, n))
            return e
        }
        sortRows(e = pl) {
            for (let r = 0; r < this.rows; r++) this.setRow(r, this.getRow(r).sort(e))
            return this
        }
        sortColumns(e = pl) {
            for (let r = 0; r < this.columns; r++) this.setColumn(r, this.getColumn(r).sort(e))
            return this
        }
        subMatrix(e, r, n, i) {
            dl(this, e, r, n, i)
            let s = new Z(r - e + 1, i - n + 1)
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
            let i = new Z(e.length, n - r + 1)
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
            let i = new Z(n - r + 1, e.length)
            for (let s = 0; s < e.length; s++)
                for (let o = r; o <= n; o++) {
                    if (e[s] < 0 || e[s] >= this.columns)
                        throw new RangeError(`Column index out of range: ${e[s]}`)
                    i.set(o - r, s, this.get(o, e[s]))
                }
            return i
        }
        setSubMatrix(e, r, n) {
            if (((e = Z.checkMatrix(e)), e.isEmpty())) return this
            let i = r + e.rows - 1,
                s = n + e.columns - 1
            dl(this, r, i, n, s)
            for (let o = 0; o < e.rows; o++)
                for (let l = 0; l < e.columns; l++) this.set(r + o, n + l, e.get(o, l))
            return this
        }
        selection(e, r) {
            let n = Yp(this, e, r),
                i = new Z(e.length, r.length)
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
            let e = new Z(this.rows, this.columns)
            for (let r = 0; r < this.rows; r++)
                for (let n = 0; n < this.columns; n++) e.set(r, n, this.get(r, n))
            return e
        }
        sum(e) {
            switch (e) {
                case 'row':
                    return Qp(this)
                case 'column':
                    return Jp(this)
                case void 0:
                    return t0(this)
                default:
                    throw new Error(`invalid option: ${e}`)
            }
        }
        product(e) {
            switch (e) {
                case 'row':
                    return e0(this)
                case 'column':
                    return n0(this)
                case void 0:
                    return r0(this)
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
                    return i0(this, n, i)
                }
                case 'column': {
                    if (!Array.isArray(i)) throw new TypeError('mean must be an array')
                    return s0(this, n, i)
                }
                case void 0: {
                    if (typeof i != 'number') throw new TypeError('mean must be a number')
                    return o0(this, n, i)
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
                    return l0(this, n), this
                }
                case 'column': {
                    if (!Array.isArray(n)) throw new TypeError('center must be an array')
                    return u0(this, n), this
                }
                case void 0: {
                    if (typeof n != 'number') throw new TypeError('center must be a number')
                    return f0(this, n), this
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
                    if (n === void 0) n = c0(this)
                    else if (!Array.isArray(n)) throw new TypeError('scale must be an array')
                    return a0(this, n), this
                }
                case 'column': {
                    if (n === void 0) n = h0(this)
                    else if (!Array.isArray(n)) throw new TypeError('scale must be an array')
                    return d0(this, n), this
                }
                case void 0: {
                    if (n === void 0) n = p0(this)
                    else if (typeof n != 'number') throw new TypeError('scale must be a number')
                    return g0(this, n), this
                }
                default:
                    throw new Error(`invalid option: ${e}`)
            }
        }
        toString(e) {
            return hl(this, e)
        }
    }
    ;(it.prototype.klass = 'Matrix'),
        typeof Symbol < 'u' && (it.prototype[Symbol.for('nodejs.util.inspect.custom')] = Up)
    function pl(t, e) {
        return t - e
    }
    ;(it.random = it.rand),
        (it.randomInt = it.randInt),
        (it.diagonal = it.diag),
        (it.prototype.diagonal = it.prototype.diag),
        (it.identity = it.eye),
        (it.prototype.negate = it.prototype.neg),
        (it.prototype.tensorProduct = it.prototype.kroneckerProduct)
    class Z extends it {
        constructor(e, r) {
            if ((super(), Z.isMatrix(e))) return e.clone()
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
            return Xt(this, e), this.data.splice(e, 1), (this.rows -= 1), this
        }
        addRow(e, r) {
            return (
                r === void 0 && ((r = e), (e = this.rows)),
                Xt(this, e, !0),
                (r = Float64Array.from(qe(this, r))),
                this.data.splice(e, 0, r),
                (this.rows += 1),
                this
            )
        }
        removeColumn(e) {
            Wt(this, e)
            for (let r = 0; r < this.rows; r++) {
                const n = new Float64Array(this.columns - 1)
                for (let i = 0; i < e; i++) n[i] = this.data[r][i]
                for (let i = e + 1; i < this.columns; i++) n[i - 1] = this.data[r][i]
                this.data[r] = n
            }
            return (this.columns -= 1), this
        }
        addColumn(e, r) {
            typeof r > 'u' && ((r = e), (e = this.columns)), Wt(this, e, !0), (r = Ue(this, r))
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
    Wp(it, Z)
    function Ii(t, e, r) {
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
    function Pi(t, e, r) {
        const n = new Z([[t.x, t.y]]),
            i = new Z([[e.x, e.y]]),
            s = Z.subtract(i, n),
            o = s.norm('frobenius'),
            l = s.divide(o),
            u = wl(10),
            f = Xe(l, -u)
                .multiply(r.nodeRadius - 1)
                .add(n),
            c = Z.multiply(l, -1),
            a = Xe(c, u)
                .multiply(r.nodeRadius)
                .add(i)
                .add(Xe(c, u).multiply(2 * r.markerBoxSize)),
            h = 1.2 * o
        return `M${f.get(0, 0)},${f.get(0, 1)}
          A${h},${h},0,0,1,${a.get(0, 0)},${a.get(0, 1)}`
    }
    function gl(t, e, r) {
        const n = new Z([[t.x, t.y]]),
            i = new Z([e])
        n.get(0, 0) === i.get(0, 0) && n.get(0, 1) === i.get(0, 1) && i.add([[0, 1]])
        const s = Z.subtract(n, i),
            o = s.divide(s.norm('frobenius')),
            l = wl(40),
            u = Xe(o, l)
                .multiply(r.nodeRadius - 1)
                .add(n),
            f = Xe(o, -l)
                .multiply(r.nodeRadius)
                .add(n)
                .add(Xe(o, -l).multiply(2 * r.markerBoxSize))
        return `M${u.get(0, 0)},${u.get(0, 1)}
          A${r.nodeRadius},${r.nodeRadius},0,1,0,${f.get(0, 0)},${f.get(0, 1)}`
    }
    function ml(t, e) {
        return `M${t[0]},${t[1]}
          L${e[0]},${e[1]}`
    }
    function wl(t) {
        return t * (Math.PI / 180)
    }
    function Xe(t, e) {
        const r = t.get(0, 0),
            n = t.get(0, 1)
        return new Z([[r * Math.cos(e) - n * Math.sin(e), r * Math.sin(e) + n * Math.cos(e)]])
    }
    var m0 =
        typeof globalThis < 'u'
            ? globalThis
            : typeof window < 'u'
              ? window
              : typeof global < 'u'
                ? global
                : typeof self < 'u'
                  ? self
                  : {}
    function w0(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
            ? t.default
            : t
    }
    var yl = { exports: {} }
    ;(function (t, e) {
        ;(function (r, n) {
            t.exports = n()
        })(m0, function () {
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
                    et = 0,
                    at = 0,
                    st = 0,
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
                            a === 'l'
                                ? ((m += w[d]), (S += w[d + 1]))
                                : ((m = w[d]), (S = w[d + 1])),
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
                                ? ((T = m + w[d]),
                                  (z = S + w[d + 1]),
                                  (m += w[d + 2]),
                                  (S += w[d + 3]))
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
                                (O +=
                                    'C ' +
                                    T +
                                    ' ' +
                                    z +
                                    ' ' +
                                    H +
                                    ' ' +
                                    G +
                                    ' ' +
                                    m +
                                    ' ' +
                                    S +
                                    ' ')
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
                                (O +=
                                    'C ' +
                                    T +
                                    ' ' +
                                    z +
                                    ' ' +
                                    H +
                                    ' ' +
                                    G +
                                    ' ' +
                                    m +
                                    ' ' +
                                    S +
                                    ' ')
                    else if (h === 'a')
                        for (d = 0; d < _; d += 7) {
                            ;(X = w[d]), (et = w[d + 1]), (at = w[d + 2]), (st = y[d + 3])
                            let b = !1
                            if (st.length > 1) {
                                let I = parseInt(st[0]),
                                    P = parseInt(st[1]),
                                    U
                                st.length > 2 && (U = parseFloat(st.substring(2))),
                                    (w[d + 3] = I),
                                    w.splice(d + 4, 0, P),
                                    y.splice(d + 4, 0, '+'),
                                    U !== void 0 && w.splice(d + 5, 0, U),
                                    (b = !0)
                            }
                            ;(st = w[d + 3]),
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
                                    et +
                                    ' ' +
                                    at +
                                    ' ' +
                                    st +
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
            var s = { normalize: r, reverseNormalized: n, reverse: i }
            return s
        })
    })(yl)
    var y0 = yl.exports
    const _l = w0(y0),
        _0 = Wn('div', { class: 'graph-host' }, null, -1),
        v0 = { class: 'info-text text-h5 text--secondary' },
        x0 = Es({
            __name: 'GraphEditor',
            setup(t, { expose: e }) {
                const r = Qs(() => te('.graph-host'))
                Rs(() => {
                    T(), window.addEventListener('resize', yt)
                }),
                    Kr(() => {
                        window.removeEventListener('resize', yt)
                    })
                let n = new Sp(),
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
                const m = Dp
                e({ testingExposedFunctionCall: S })
                function S() {
                    console.log('Hi from inside the function')
                }
                function T() {
                    ;(s = r.value.node().clientWidth),
                        (o = r.value.node().clientHeight),
                        (u = Mp((R) => z(R))),
                        (c = $p(
                            r.value,
                            u,
                            (R) => U(R),
                            (R) => P(R),
                            (R) => {
                                G(Vt(R, c.node())[0], Vt(R, c.node())[1])
                            }
                        )),
                        Cp(c, m),
                        (g = kp(c)),
                        (a = Np(c)),
                        (h = Tp(c)),
                        (l = Ip(n, m, s, o, () => X())),
                        (f = Rp(l, s, o, m.nodeRadius)),
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
                        a.selectAll('path').attr('d', (R) => et(R)),
                        O(),
                        b()
                }
                function et(R) {
                    switch ((at(R), R.pathType)) {
                        case Pt.REFLEXIVE:
                            return gl(R.source, [s / 2, o / 2], m)
                        case Pt.ARC:
                            return Pi(R.source, R.target, m)
                        case Pt.ARCREVERSE:
                            return _l.reverse(Pi(R.source, R.target, m))
                        case Pt.LINE:
                            return Ii(R.source, R.target, m)
                        case Pt.LINEREVERSE:
                            return _l.reverse(Ii(R.source, R.target, m))
                        default:
                            return ''
                    }
                }
                function at(R) {
                    R.source.id === R.target.id
                        ? (R.pathType = Pt.REFLEXIVE)
                        : st(R.source, R.target)
                          ? (R.pathType = x(R.source, R.target) ? Pt.ARCREVERSE : Pt.ARC)
                          : (R.pathType = x(R.source, R.target) ? Pt.LINEREVERSE : Pt.LINE)
                }
                function st(R, A) {
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
                                    ? gl(R, [s / 2, o / 2], m)
                                    : st(R, A)
                                      ? Ii(R, A, m)
                                      : Pi(R, A, m)
                            )
                        else if (_ !== void 0) {
                            const D = [R.x, R.y]
                            g.attr('d', ml(D, _))
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
                                            B.button === 1 && (je(B), n.removeLink(ot), b())
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
                                            nt(B, ot)
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
                                        return D.pathType === Pt.REFLEXIVE
                                            ? 15
                                            : D.pathType == Pt.LINEREVERSE
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
                                                (je(B),
                                                n.removeNode(ot),
                                                (i.value = n.nodes.length > 0),
                                                dt(),
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
                                            .text((B) =>
                                                B.label !== void 0 ? B.label : 'add label'
                                            )
                                            .attr('dy', '0.33em')
                                            .on('click', (B, ot) => {
                                                K(B, ot)
                                            })
                                            .on('mouseenter', (B, ot) => (y = ot))
                                            .on('mouseout', () => (y = void 0)),
                                        D
                                    )
                                },
                                (A) => (
                                    A.selectChild('text').classed('hidden', !m.showNodeLabels), A
                                )
                            )),
                        l.nodes(n.nodes),
                        l.alpha(R).restart()
                }
                function I(R, A) {
                    if (R.button !== 0) return
                    je(R)
                    const D = [A.x, A.y]
                    ;(_ = D),
                        (w = A),
                        g
                            .attr('marker-end', 'url(#draggable-link-arrow)')
                            .classed('hidden', !1)
                            .attr('d', ml(D, D)),
                        b()
                }
                function P(R) {
                    const A = w,
                        D = y
                    dt(), !(A === void 0 || D === void 0) && (je(R), H(A, D))
                }
                function U(R) {
                    if ((je(R), w !== void 0)) {
                        const A = Aa(R, r.value.node())[0],
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
                function nt(R, A) {
                    const D = R.target
                    let B = vt(D)
                    rt(A, D, B)
                }
                function rt(R, A, D) {
                    var v
                    let B = R instanceof ul ? 'node' : 'link'
                    const ot = document.createElement('input')
                    ot.setAttribute('class', 'label-input'),
                        R.label == null ? (ot.value = '') : (ot.value = R.label),
                        (ot.placeholder = `Enter ${B} label`)
                    let Ee = !1
                    ;(ot.onkeyup = function (E) {
                        E.key === 'Enter'
                            ? ((Ee = !0), ot.blur())
                            : E.key === 'Escape' && ((ot.value = ''), ot.blur())
                    }),
                        (ot.onblur = function () {
                            Ee &&
                                (ot.value === ''
                                    ? (A.setAttribute('class', `${B}-label-placeholder`),
                                      (A.textContent = 'add label'),
                                      (R.label = void 0))
                                    : (A.setAttribute('class', `${B}-label`),
                                      (A.textContent = ot.value.trim()),
                                      (R.label = A.textContent))),
                                jt.remove()
                        })
                    const jt = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'foreignObject'
                    )
                    jt.setAttribute('width', '100%'),
                        jt.setAttribute('height', '100%'),
                        jt.setAttribute('x', `${D[0] - 80}`),
                        jt.setAttribute('y', `${D[1] - 12}`),
                        jt.append(ot)
                    const p = A.closest('svg')
                    ;(v = p == null ? void 0 : p.querySelector('g')) == null || v.append(jt),
                        ot.focus()
                }
                function vt(R) {
                    let A = R.getBoundingClientRect(),
                        D = (A.x - d) / $,
                        B = (A.y - M) / $
                    return [D, B]
                }
                function dt() {
                    g == null || g.classed('hidden', !0).attr('marker-end', 'null'),
                        (w = void 0),
                        (y = void 0),
                        (_ = void 0)
                }
                function yt() {
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
                        dt(),
                        T()
                }
                return (R, A) => (
                    cf(),
                    df(Zt, null, [_0, Iu(Wn('div', v0, 'Graph is empty', 512), [[Ff, !fs(i)]])], 64)
                )
            }
        })
    customElements.define('graph-editor', nc(x0, { shadowRoot: !1 }))
})
